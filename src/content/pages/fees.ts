import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import type { StateRec } from '../../lib/engine/states';

const total = (s: StateRec) => (s.permitFee == null && s.licenseFee == null ? null : (s.permitFee ?? 0) + (s.licenseFee ?? 0));
const complete = (s: StateRec) => (s.permitFee != null && s.licenseFee != null ? s.permitFee + s.licenseFee : null);
const F = (h: Helpers) => {
  const both = h.STATES.filter((s) => complete(s) != null);
  const cheapest = h.rank(complete)[0];
  const dearest = h.rank(complete, -1)[0];
  const cheapP = h.rank((s) => s.permitFee)[0];
  const dearP = h.rank((s) => s.permitFee, -1)[0];
  const dearL = h.rank((s) => s.licenseFee, -1)[0];
  const tots = both.map((s) => complete(s) as number).sort((a, b) => a - b);
  const median = tots.length ? (tots.length % 2 ? tots[(tots.length - 1) / 2] : (tots[tots.length / 2 - 1] + tots[tots.length / 2]) / 2) : null;
  const same = both.filter((s) => s.permitFee === s.licenseFee).length;
  const noted = h.STATES.filter((s) => s.feeNote);
  const silent = h.STATES.filter((s) => total(s) == null);
  return { both, cheapest, dearest, cheapP, dearP, dearL, median, same, noted, silent };
};

export default definePage({
  id: 'fees',
  group: 'rules',
  order: 50,
  tool: { kind: 'mini:fees' },
  related: ['rules-by-state', 'permit-age', 'failed-test', 'state-ny', 'state-wa', 'state-ca'],
  sources: ['handbooks'],
  en: {
    slug: 'permit-and-license-fees',
    nav: 'Permit and license fees',
    card: 'What each state charges for the learner permit and the first license, side by side.',
    title: 'Permit and License Fees by State: What the DMV Charges',
    description: 'Permit and license fees by state: the learner permit fee, the first driver license fee and the total public cost, read on each official fee page, with notes.',
    h1: 'Permit and license fees in every state',
    intro: 'Pick a state: the tool adds the learner permit fee and the first license fee. The table below ranks every state that publishes both, from the lowest total to the highest.',
    resume: (h) => {
      const f = F(h);
      return `What a state charges to get a new driver from permit to license varies widely. Among the ${f.both.length} jurisdictions in our data that publish both the learner permit fee and the first license fee, the combined public cost goes from ${f.cheapest ? `${h.m(complete(f.cheapest) as number)} in ${h.S(f.cheapest.code).nameL}` : h.nc} to ${f.dearest ? `${h.m(complete(f.dearest) as number)} in ${h.S(f.dearest.code).nameL}` : h.nc}, with a median of ${f.median != null ? h.m(f.median) : h.nc}. The permit alone costs between ${f.cheapP ? h.m(f.cheapP.permitFee as number) : h.nc} and ${f.dearP ? h.m(f.dearP.permitFee as number) : h.nc}. In ${f.same} states the two fees are equal, and in some a single application fee covers the permit, the tests and the first license. These are the agency charges only: they leave out driver education, a driving school, insurance and the cost of a car for the road test. Some states add separate charges for each knowledge test attempt, a photo or a county fee, which the agency notes below the table spell out.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Is the knowledge test included in the permit fee?', a: 'Sometimes. In some states the application fee covers the knowledge test, the vision check and one or more road test attempts; in others each test is a separate charge, often a few dollars per attempt. The agency fee page states which. The notes under the table quote what each state adds to its base fees when the agency publishes it.' },
        { q: 'Why does the license cost more than the permit in some states?', a: `A license is valid for years, often four to eight, while a permit lasts months. The license fee covers that longer term. ${f.dearL ? `The highest license fee in our data is ${h.m(f.dearL.licenseFee as number)}, in ${h.S(f.dearL.code).nameL}.` : ''} Where the first license is issued for a short term to a teen, some states charge a reduced fee and the full fee at renewal.` },
        { q: 'How can I pay the DMV fee?', a: 'Most agencies accept cards, checks and money orders at the counter, and cards online; some offices take cash, others do not. Card payments may carry a convenience fee set by the payment processor. Check the payment methods of your office before the visit, especially if a minor is paying alone.' },
        { q: 'Are there fee waivers for low-income applicants?', a: 'A few states waive or reduce fees for some groups, such as youth in foster care, homeless applicants, veterans or seniors for an ID card. Waivers for a first driver license are rarer than for an ID card. If you think you qualify, ask the agency before paying, because refunds after the fact are uncommon.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const ns = 'not stated';
      const rows = h.rank(total).map((s) => [h.sl(s.code), s.permitFee == null ? ns : h.m(s.permitFee), s.licenseFee == null ? ns : h.m(s.licenseFee), complete(s) == null ? `${h.m(total(s) as number)} (partial)` : h.m(complete(s) as number)]);
      return `
<h2>Fees state by state, lowest total first</h2>
<p>The permit fee is what the agency charges to issue the learner permit; the license fee is the charge for the first driver license, usually the provisional one for a teen. The total adds the two. When only one of the two is published, the total is marked as partial and should be read as a floor, not a full cost.</p>
${h.table(['State', 'Learner permit', 'First license', 'Total'], rows, `State agency fees, ${f.both.length} states with both fees published. Amounts in US dollars.`, ['l', 'r', 'r', 'r'])}
<p>${f.silent.length ? `Neither fee appears on the pages we read for ${f.silent.map((s) => h.S(s.code).nameL).join(', ')}.` : 'Every jurisdiction in our data publishes at least one fee.'}</p>
<h2>What the agencies add</h2>
<p>Base fees rarely tell the whole story. Here are the extra charges and conditions that agencies publish next to their fees, quoted from their pages:</p>
<ul>
${f.noted.map((s) => `<li><strong>${h.sl(s.code)}.</strong> ${h.S(s.code).feeNoteL}</li>`).join('\n')}
</ul>
<h2>Reading the gap between states</h2>
<p>${f.cheapest && f.dearest ? `The most expensive state in our data costs ${h.num((complete(f.dearest) as number) / Math.max(1, complete(f.cheapest) as number), 1)} times the cheapest for the same two documents.` : ''} The gap does not reflect the quality of the service; it reflects how each state funds its agency. Some keep fees low and pay for licensing from the general budget, others charge close to cost. A long license term also raises the fee: a state that issues licenses for eight years will charge more at once than one that issues them for four, while costing less per year.</p>
<h2>Costs that are not fees</h2>
<p>The table covers public charges only. Families also budget for driver education in states that require it (see the ${h.a('drivers-ed', 'driver education guide')}), for the time of a supervising adult during the ${h.a('supervised-hours', 'practice hours')}, and for adding a teen to car insurance, often the largest cost of all. A failed knowledge test can also cost a retest fee; the ${h.a('failed-test', 'retake guide')} gives the wait in each state. We do not list or recommend any school or insurer.</p>
<h2>Where the figures come from</h2>
<p>Each fee was read on the agency fee page or in the driver handbook, and the link is stored with it. Fees change with state budgets, often on July 1 or January 1, so confirm the amount on the official page shortly before your visit. This site is independent and does not collect any fee.</p>`;
    },
  },
  es: {
    slug: 'costo-del-permiso-y-la-licencia',
    nav: 'Costo del permiso y la licencia',
    card: 'Lo que cobra cada estado por el permiso de aprendizaje y la primera licencia, lado a lado.',
    title: 'Costo del permiso y la licencia por estado: tarifas del DMV',
    description: 'Costo del permiso y de la licencia de manejo por estado: tarifa del permiso de aprendizaje, de la primera licencia y el total, según cada agencia oficial.',
    h1: 'Costo del permiso y de la licencia en cada estado',
    intro: 'Elija un estado: la herramienta suma la tarifa del permiso y la de la primera licencia. La tabla de abajo ordena los estados que publican ambas, del total más bajo al más alto.',
    resume: (h) => {
      const f = F(h);
      return `Lo que cobra un estado para llevar a un conductor nuevo del permiso a la licencia cambia mucho. Entre las ${f.both.length} jurisdicciones de nuestros datos que publican la tarifa del permiso de aprendizaje y la de la primera licencia, el costo público sumado va de ${f.cheapest ? `${h.m(complete(f.cheapest) as number)} en ${h.S(f.cheapest.code).nameL}` : h.nc} a ${f.dearest ? `${h.m(complete(f.dearest) as number)} en ${h.S(f.dearest.code).nameL}` : h.nc}, con una mediana de ${f.median != null ? h.m(f.median) : h.nc}. Solo el permiso cuesta entre ${f.cheapP ? h.m(f.cheapP.permitFee as number) : h.nc} y ${f.dearP ? h.m(f.dearP.permitFee as number) : h.nc}. En ${f.same} estados las dos tarifas son iguales, y en algunos una sola tarifa de solicitud cubre el permiso, los exámenes y la primera licencia. Son solo los cargos de la agencia: no incluyen la educación vial, una escuela de manejo, el seguro ni el costo del auto para el examen práctico. Algunos estados cobran aparte cada intento del examen teórico, la foto o un cargo del condado, como indica la página de tarifas de cada agencia enlazada en la tabla.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: '¿El examen teórico está incluido en la tarifa del permiso?', a: 'A veces. En algunos estados la tarifa de solicitud cubre el examen teórico, la prueba de la vista y uno o más intentos del examen práctico; en otros cada examen se cobra aparte, a menudo unos pocos dólares por intento. La página de tarifas de la agencia lo aclara. La tabla enlaza esa página para cada estado que publica cargos adicionales.' },
        { q: '¿Por qué la licencia cuesta más que el permiso en algunos estados?', a: `La licencia vale varios años, a menudo de cuatro a ocho, mientras que el permiso dura meses. La tarifa de la licencia cubre ese plazo más largo. ${f.dearL ? `La tarifa de licencia más alta de nuestros datos es de ${h.m(f.dearL.licenseFee as number)}, en ${h.S(f.dearL.code).nameL}.` : ''} Cuando la primera licencia de un joven se emite por poco tiempo, algunos estados cobran menos y el resto al renovar.` },
        { q: '¿Cómo se paga la tarifa en el DMV?', a: 'La mayoría de las agencias aceptan tarjeta, cheque y giro postal en la oficina, y tarjeta en línea; algunas oficinas aceptan efectivo y otras no. El pago con tarjeta puede llevar un cargo por servicio que fija el procesador de pagos. Revise los medios de pago de su oficina antes de ir, sobre todo si un menor va a pagar solo.' },
        { q: '¿Hay exenciones de tarifa para personas de bajos ingresos?', a: 'Algunos estados eximen o reducen las tarifas para ciertos grupos, como jóvenes en hogares de acogida, personas sin hogar, veteranos o adultos mayores en el caso de la identificación. Las exenciones para una primera licencia de manejo son más raras que para la identificación. Si cree que califica, pregunte a la agencia antes de pagar, porque los reembolsos posteriores son poco comunes.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const ns = 'sin dato';
      const rows = h.rank(total).map((s) => [h.sl(s.code), s.permitFee == null ? ns : h.m(s.permitFee), s.licenseFee == null ? ns : h.m(s.licenseFee), complete(s) == null ? `${h.m(total(s) as number)} (parcial)` : h.m(complete(s) as number), s.feeNote ? h.os(s.code, 'licenseFee', 'cargos extra') : '']);
      return `
<h2>Tarifas estado por estado, del total más bajo al más alto</h2>
<p>La tarifa del permiso es lo que cobra la agencia por emitir el permiso de aprendizaje; la de la licencia, lo que cobra por la primera licencia de manejo, normalmente la provisional en el caso de un joven. El total suma las dos. Cuando solo se publica una, el total aparece como parcial y debe leerse como un mínimo, no como el costo completo. La última columna enlaza la página oficial cuando la agencia publica cargos adicionales o condiciones.</p>
${h.table(['Estado', 'Permiso', 'Primera licencia', 'Total', 'Notas'], rows, `Tarifas de las agencias estatales, ${f.both.length} estados con ambas tarifas publicadas. Importes en dólares.`, ['l', 'r', 'r', 'r', 'l'])}
<p>${f.silent.length ? `Ninguna de las dos tarifas aparece en las páginas que leímos para ${f.silent.map((s) => h.S(s.code).nameL).join(', ')}.` : 'Todas las jurisdicciones de nuestros datos publican al menos una tarifa.'}</p>
<h2>Lo que añaden las agencias</h2>
<p>${f.noted.length} agencias publican junto a sus tarifas algún cargo o condición extra: un pago por cada intento del examen, un cargo del condado, una tarifa distinta para cada etapa de la licencia graduada o una vigencia que cambia el precio. Esas notas están en inglés en la fuente oficial, enlazada en la columna de notas. Léalas antes de calcular su presupuesto, porque pueden sumar más que la diferencia entre dos estados.</p>
<h2>Cómo leer la diferencia entre estados</h2>
<p>${f.cheapest && f.dearest ? `El estado más caro de nuestros datos cuesta ${h.num((complete(f.dearest) as number) / Math.max(1, complete(f.cheapest) as number), 1)} veces lo que el más barato por los mismos dos documentos.` : ''} La diferencia no refleja la calidad del servicio, sino cómo financia cada estado a su agencia. Unos mantienen tarifas bajas y pagan las licencias con el presupuesto general; otros cobran cerca del costo real. Una vigencia larga también sube la tarifa: un estado que emite licencias por ocho años cobra más de una vez que uno que las emite por cuatro, aunque salga más barato por año.</p>
<h2>Costos que no son tarifas</h2>
<p>La tabla solo cubre cargos públicos. Las familias también deben prever la educación vial en los estados que la exigen (vea la ${h.a('drivers-ed', 'guía de educación vial')}), el tiempo del adulto supervisor durante las ${h.a('supervised-hours', 'horas de práctica')} y la inclusión del joven en el seguro del auto, a menudo el gasto más grande. Reprobar el examen teórico puede costar un cargo por repetirlo; la ${h.a('failed-test', 'guía para repetir el examen')} da la espera de cada estado. No enumeramos ni recomendamos escuelas ni aseguradoras.</p>
<h2>De dónde salen las cifras</h2>
<p>Cada tarifa se leyó en la página de tarifas de la agencia o en el manual del conductor, y guardamos el enlace. Las tarifas cambian con los presupuestos estatales, a menudo el 1 de julio o el 1 de enero, así que confirme el importe en la página oficial poco antes de ir. Este sitio es independiente y no cobra ninguna tarifa.</p>`;
    },
  },
});
