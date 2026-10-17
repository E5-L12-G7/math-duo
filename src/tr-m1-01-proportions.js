/* ===================== MVA911 · Proportions, pourcentages et approximations ===================== */
Object.assign(ANA_ERR,{
  'prop-add':{label:'Pourcentages additionnés',tip:'Des évolutions successives se multiplient : on multiplie les coefficients, on n’additionne pas les pourcentages.'},
  'prop-coef':{label:'Coefficient multiplicateur',tip:'Hausse de t % : × (1 + t/100). Baisse de t % : × (1 − t/100). Le coefficient d’une baisse est plus petit que 1.'},
  'prop-init':{label:'Retour à la valeur initiale',tip:'Pour revenir à la valeur de départ, on divise par le coefficient ; on ne retire pas le pourcentage à la valeur finale.'}});
const m1pR=v=>+(+v).toFixed(6);
/** Diagramme en barres : it = [{v, t (texte), l (légende), q (inconnue), col}], ar = textes des flèches entre barres */
const M1PROP_BARS=(it,ar=[])=>{const W=300,H=170,n=it.length,bw=58,gap=n>1?(W-20-n*bw)/(n-1):0,mxv=Math.max(...it.map(o=>o.v))*1.15;let s='';
  it.forEach((o,i)=>{const h=Math.max(4,o.v/mxv*(H-50)),x=10+i*(bw+gap),y=H-20-h;
    s+=`<rect x="${x}" y="${y.toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" rx="5" fill="${o.q?'var(--surface)':o.col||'var(--t-sq)'}" stroke="${o.q?'var(--ink)':'none'}" stroke-width="1.5" ${o.q?'stroke-dasharray="5 4"':''}/>`
      +`<text x="${x+bw/2}" y="${(y-6).toFixed(1)}" font-size="12" font-weight="700" text-anchor="middle" fill="var(--ink)">${o.q?'?':o.t}</text>`
      +`<text x="${x+bw/2}" y="${H-5}" font-size="10" text-anchor="middle" fill="var(--muted)">${o.l}</text>`;
    if(i<n-1&&ar[i])s+=`<text x="${x+bw+gap/2}" y="14" font-size="12" font-weight="700" text-anchor="middle" fill="var(--t-c)">${ar[i]}</text><path d="M${x+bw+6},22 L${x+bw+gap-6},22" stroke="var(--t-c)" stroke-width="1.6" marker-end="none"/><path d="M${x+bw+gap-11},18 L${x+bw+gap-6},22 L${x+bw+gap-11},26" fill="none" stroke="var(--t-c)" stroke-width="1.6"/>`});
  return`<div class="qfig"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Diagramme en barres d’une évolution">${s}</svg></div>`};
/** Bande de 100 % dont t % est colorié */
const M1PROP_PCT=t=>{const W=300;let s=`<rect x="10" y="14" width="280" height="30" rx="4" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.2"/><rect x="10" y="14" width="${(280*t/100).toFixed(1)}" height="30" rx="4" fill="var(--t-sq)"/>`;
  for(let i=1;i<10;i++)s+=`<line x1="${10+28*i}" x2="${10+28*i}" y1="14" y2="44" stroke="var(--ink)" stroke-width=".6" opacity=".5"/>`;
  s+=`<text x="10" y="60" font-size="10" fill="var(--muted)">0 %</text><text x="290" y="60" font-size="10" text-anchor="end" fill="var(--muted)">100 %</text><text x="${(10+280*t/100).toFixed(1)}" y="10" font-size="11" font-weight="700" text-anchor="middle" fill="var(--t-sq)">${num(t)} %</text>`;
  return`<div class="qfig"><svg viewBox="0 0 ${W} 66" role="img" aria-label="${num(t)} % d’une bande">${s}</svg></div>`};
const m1pEvo=t=>`${t>0?'+':MINUS}${num(Math.abs(t))} %`;
/* 1. Prendre un pourcentage */
const gM1PropPct=()=>{const t=pick([5,10,15,20,25,30,40,50,60,75,12,35]),Q=R(2,48)*10,ctx=pick([['€','d’une facture de'],['personnes','d’un groupe de'],['km','d’un trajet de'],['g','d’un paquet de']]),v=m1pR(Q*t/100);
  return nq({instr:'Calcule ce pourcentage.',prompt:stx(`Combien font ${num(t)} % ${ctx[1]} ${Q} ${ctx[0]} ?`)+M1PROP_PCT(t),labels:[`Résultat (${ctx[0]}) =`],t:[v],
    explain:`${num(t)} % = ${num(t)}/100 = ${dec(t/100,2)}. Donc ${Q} × ${dec(t/100,2)} = ${num(v)} ${ctx[0]}.`,hint:`Prendre ${num(t)} %, c’est multiplier par ${num(t)}/100.`,
    diag:([x])=>near(x,Q*(1+t/100),1e-6)||near(x,Q*(1-t/100),1e-6)?'prop-coef':null})};
/* 2. Coefficient multiplicateur */
const gM1PropCoef=()=>{const t=R(1,19)*5+pick([0,0,0,-2,3]),up=Math.random()<.5,c=m1pR(1+(up?t:-t)/100);
  return nq({instr:'Donne le coefficient multiplicateur.',prompt:stx(`Une quantité ${up?'augmente':'baisse'} de ${num(t)} %. Par quel nombre est-elle multipliée ?`)+M1PROP_BARS([{v:100,t:'100',l:'avant',col:'var(--line)'},{v:100*c,t:'',l:'après',q:true}],['× ?']),
    labels:['Coefficient ='],t:[c],
    explain:`${up?'Hausse':'Baisse'} de ${num(t)} % : × (1 ${up?'+':MINUS} ${num(t)}/100) = × ${num(c)}. Contrôle : 100 devient ${num(m1pR(100*c))}.`,
    hint:'Hausse de t % : 1 + t/100 ; baisse de t % : 1 − t/100.',
    diag:([x])=>near(x,t/100,1e-9)||near(x,1+(up?-t:t)/100,1e-9)?'prop-coef':null})};
/* 3. Règle de trois (graphique) */
const gM1PropR3=()=>{const u=pick([1.2,1.5,2.5,0.8,3.5,4,2.25,1.75,0.6]),a=R(2,6);let b;do b=R(2,12);while(b===a);const ctx=pick([['kg de pommes','kg'],['litres de jus','L'],['mètres de tissu','m']]);
  const xm=Math.max(a,b)+1,ym=Math.ceil(u*xm*1.1),py=ym>24?5:ym>10?2:1;
  return nq({instr:'Calcule le prix demandé (situation proportionnelle).',prompt:stx(`${a} ${ctx[0]} coûtent ${dec(a*u,2)} €. Combien coûtent ${b} ${ctx[1]} ?`)+FIG.plot({x:[0,xm],y:[0,ym],f:[`${u}*x`],pts:[[a,a*u,'A']],segs:[[b,0,b,b*u],[0,b*u,b,b*u]],pas:1,pasy:py,etiq:2,etiqy:py*2}),
    labels:['Prix (€) ='],t:[m1pR(b*u)],
    explain:`Prix d’une unité : ${dec(a*u,2)} ÷ ${a} = ${dec(u,2)} €. Pour ${b} ${ctx[1]} : ${dec(u,2)} × ${b} = ${dec(b*u,2)} €. Sur le graphique, la droite passe par l’origine : c’est la marque de la proportionnalité.`,
    hint:'Ramène-toi à une unité (divise), puis multiplie.',diag:([x])=>near(x,a*u*a/b,1e-6)?'rapport':null})};
/* 4. Placer un point d'une situation proportionnelle */
const gM1PropLire=()=>{const k=pick([0.5,1,1.5,2]),xs=[1,2,3,4,5,6,7,8].filter(v=>k*v<=10);const a=pick(xs);let b;do b=pick(xs);while(b===a);
  return pointQ({instr:'Place le point qui correspond à la nouvelle quantité.',prompt:stx(`Le prix (en €) est proportionnel à la masse (en kg). Le point A montre que ${a} kg coûtent ${num(k*a)} €. Place le point M correspondant à ${b} kg.`),
    nom:'M',x:[-.5,8.5],y:[-.5,10.5],snap:.5,tol:.24,cible:[b,k*b],fond:{pts:[[0,0,'O'],[a,k*a,'A']],pas:1,etiq:2},
    explain:`Prix d’un kilo : ${num(k*a)} ÷ ${a} = ${num(k)} €. Pour ${b} kg : ${num(k)} × ${b} = ${num(k*b)} €. M(${b} ; ${num(k*b)}) est sur la droite (OA).`,
    hint:'Les points d’une situation proportionnelle sont alignés avec l’origine O : calcule d’abord le prix d’un kilo.'})};
/* 5. Appliquer une évolution */
const gM1PropEvol=()=>{const t=pick([5,8,10,12,15,20,25,30,35,40,45,60]),up=Math.random()<.5,V=R(4,60)*10,c=1+(up?t:-t)/100,F=m1pR(V*c);
  return nq({instr:`Calcule la nouvelle valeur.`,prompt:stx(`Un prix de ${V} € ${up?'augmente':'baisse'} de ${num(t)} %. Quel est le nouveau prix ?`)+M1PROP_BARS([{v:V,t:`${V} €`,l:'avant',col:'var(--line)'},{v:F,l:'après',q:true}],[m1pEvo(up?t:-t)]),
    labels:['Nouveau prix (€) ='],t:[F],dp:2,
    explain:`Coefficient : 1 ${up?'+':MINUS} ${num(t)}/100 = ${num(m1pR(c))}. Nouveau prix : ${V} × ${num(m1pR(c))} = ${dec(F,2)} €.`,hint:'Multiplie par le coefficient multiplicateur.',
    diag:([x])=>near(x,V*t/100,.006)?'prop-coef':near(x,V*(1+(up?-t:t)/100),.006)?'signe':null})};
/* 6. Évolutions successives */
const gM1PropSucc=()=>{const L=[-50,-40,-30,-25,-20,-15,-10,-5,5,10,15,20,25,30,40,50];const t1=pick(L);let t2;do t2=pick(L);while(t2===-t1&&Math.random()<.5);
  const c1=1+t1/100,c2=1+t2/100,g=m1pR((c1*c2-1)*100);
  return nq({instr:'Calcule l’évolution globale, en %.',prompt:stx(`Une valeur subit une évolution de ${m1pEvo(t1)}, puis une évolution de ${m1pEvo(t2)}. Quelle est l’évolution globale (réponds par un nombre, négatif pour une baisse) ?`)
      +M1PROP_BARS([{v:100,t:'100',l:'départ',col:'var(--line)'},{v:100*c1,t:dec(100*c1,2),l:'étape 1'},{v:100*c1*c2,l:'étape 2',q:true,col:'var(--t-c)'}],[`× ${num(c1)}`,`× ${num(c2)}`]),
    labels:['Évolution globale (%) ='],t:[g],dp:2,
    explain:`Coefficients : ${num(c1)} et ${num(c2)}. Coefficient global : ${num(c1)} × ${num(c2)} = ${num(m1pR(c1*c2))}. Évolution globale : (${num(m1pR(c1*c2))} − 1) × 100 = ${g>0?'+':''}${dec(g,2)} %.`,
    hint:'Multiplie les coefficients multiplicateurs, puis traduis le résultat en pourcentage.',
    diag:([x])=>near(x,t1+t2,.006)?'prop-add':null})};
/* 7. Retrouver la valeur initiale */
const gM1PropInit=()=>{const t=pick([10,20,25,40,50,5,15,30]),up=Math.random()<.5,I=R(4,50)*20,c=1+(up?t:-t)/100,F=m1pR(I*c);
  return nq({instr:'Retrouve la valeur de départ.',prompt:stx(`Après ${up?'une hausse':'une baisse'} de ${num(t)} %, un prix vaut ${dec(F,2)} €. Quel était le prix de départ ?`)
      +M1PROP_BARS([{v:I,l:'avant',q:true},{v:F,t:`${dec(F,2)} €`,l:'après'}],[m1pEvo(up?t:-t)]),
    labels:['Prix de départ (€) ='],t:[I],dp:2,
    explain:`Prix final = prix de départ × ${num(m1pR(c))}. Donc prix de départ = ${dec(F,2)} ÷ ${num(m1pR(c))} = ${num(I)} €. Contrôle : ${num(I)} × ${num(m1pR(c))} = ${dec(F,2)}.`,
    hint:'On a multiplié par le coefficient : pour revenir en arrière, on divise par ce coefficient.',
    diag:([x])=>near(x,F*(1+(up?-t:t)/100),.006)?'prop-init':null})};
/* 8. Taux réciproque */
const gM1PropRecip=()=>{const t=pick([10,20,25,50,60,30,40,15,100]),up=t===100||Math.random()<.6,c=1+(up?t:-t)/100,r=m1pR((1/c-1)*100);
  return nq({instr:'Calcule le taux réciproque, en %.',prompt:stx(`Un prix ${up?'augmente':'baisse'} de ${num(t)} %. Quelle évolution (en %, négative pour une baisse) le ramène exactement à sa valeur de départ ?`)
      +M1PROP_BARS([{v:100,t:'100',l:'départ',col:'var(--line)'},{v:100*c,t:dec(100*c,2),l:'après'},{v:100,t:'100',l:'retour',col:'var(--line)'}],[m1pEvo(up?t:-t),'?']),
    labels:['Évolution (%) ='],t:[r],dp:2,
    explain:`Coefficient : ${num(m1pR(c))}. Pour revenir, on multiplie par l’inverse : 1 ÷ ${num(m1pR(c))} ≈ ${dec(1/c,4)}. Taux réciproque : (${dec(1/c,4)} − 1) × 100 ≈ ${r>0?'+':''}${dec(r,2)} %, et non ${up?MINUS:'+'}${num(t)} %.`,
    hint:'Calcule l’inverse du coefficient multiplicateur, puis traduis-le en pourcentage.',diag:([x])=>near(x,up?-t:t,.006)?'prop-add':null})};
/* 9. Arrondir, ordre de grandeur */
const gM1PropArr=()=>{if(Math.random()<.5){const a=R(15,94)*100+R(0,99),b=R(11,94)/1000,ra=Math.round(a/1000)*1000,rb=Math.round(b*100)/100,E=m1pR(ra*rb);
    return mcq('Choisis le bon ordre de grandeur.',`<span class="m">${num(a).replace(/(\d)(\d{3})$/,'$1 $2')} × ${num(b)}</span>`,
      [{h:num(E),ok:true},{h:num(m1pR(E*10)),tag:'calc'},{h:num(m1pR(E/10)),tag:'calc'},{h:num(m1pR(E*100)),tag:'calc'}],
      `On arrondit chaque facteur à un chiffre significatif : ${num(a)} ≈ ${num(ra)} et ${num(b)} ≈ ${num(rb)}. Donc ≈ ${num(ra)} × ${num(rb)} = ${num(E)}. (Valeur exacte : ${dec(a*b,2)}.)`,
      'Remplace chaque nombre par une valeur ronde, puis compte les zéros et les décimales.')}
  const ip=R(0,99),d1=R(0,9),d2=R(0,8),d3=R(5,9),x=m1pR(ip+d1/10+d2/100+d3/1000),ok=m1pR(ip+d1/10+(d2+1)/100),tr=m1pR(ip+d1/10+d2/100),t1=m1pR(Math.round(x*10)/10);
  return mcq('Arrondis au centième.',`<span class="m">${num(x)}</span>`,[{h:num(ok),ok:true},{h:num(tr),tag:'arrondi'},{h:num(t1),tag:'arrondi'},{h:num(x)}],
    `Au centième, on garde deux décimales et on regarde la troisième : ${d3} ≥ 5, donc on augmente la deuxième décimale : ${num(x)} ≈ ${num(ok)}.`,'Regarde le troisième chiffre après la virgule : 5 ou plus, on arrondit au-dessus.')};
/* 10. Raisonner : hausse puis baisse (l'erreur se propage) */
const gM1PropR1=()=>{const t1=pick([10,20,25,30,40,50]),t2=pick([10,20,25,30,40,50]);if(t1===25&&t2===20)return gM1PropR1();const P=R(4,30)*10,c1=1+t1/100,c2=1-t2/100;
  const pf=v=>`${dec(v,2)} €`;
  return chain({instr:'Calcule le prix final et l’évolution globale, en construisant ton raisonnement.',
    prompt:stx(`Un article à ${P} € augmente de ${t1} %, puis baisse de ${t2} %.`)+M1PROP_BARS([{v:P,t:`${P} €`,l:'départ',col:'var(--line)'},{v:P*c1,t:pf(P*c1),l:'après hausse'},{v:P*c1*c2,l:'final',q:true,col:'var(--t-c)'}],[`+${t1} %`,`${MINUS}${t2} %`]),
    steps:[
      {q:'Comment traduire les deux évolutions ?',o:[
        {h:`Coefficients ${num(c1)} puis ${num(c2)}`,ok:true,k:'ok',g:c1*c2},
        {h:`Évolution totale : ${t1} − ${t2} = ${num(t1-t2)} %`,k:'add',g:1+(t1-t2)/100,why:'Les pourcentages ne s’additionnent pas : la baisse porte sur un prix déjà augmenté.',tag:'prop-add'},
        {h:`Coefficients ${num(c1)} puis ${num(t2/100)}`,k:'part',g:c1*t2/100,why:`Baisser de ${t2} %, c’est garder ${100-t2} % : le coefficient est ${num(c2)}, pas ${num(t2/100)}.`,tag:'prop-coef'}]},
      {q:'Le coefficient global vaut…',o:prev=>{const g=prev[0].g,k=prev[0].k;const alt=k==='ok'?m1pR(c1+c2-1):m1pR(c1*c2);
        return[{h:num(m1pR(g)),ok:true,g},{h:num(alt),g:alt,why:k==='ok'?'On multiplie les coefficients, on ne les additionne pas.':'C’est le bon coefficient, mais il ne découle pas de ton choix précédent.',tag:k==='ok'?'prop-add':undefined},
          {h:num(m1pR(g+0.1)),g:g+0.1,why:'Erreur de calcul dans le produit.',tag:'calc'}]}},
      {q:'Le prix final est…',o:prev=>{const g=prev[1].g;return[{h:pf(P*g),ok:true,g},{h:pf(P+g),g,why:'On multiplie le prix par le coefficient, on ne l’ajoute pas.'},{h:pf(P/g),g,why:'Le prix final s’obtient en multipliant par le coefficient, pas en divisant.',tag:'mult-div'}]}},
      {q:'L’évolution globale est donc…',o:prev=>{const g=m1pR(prev[2].g),e=m1pR((g-1)*100);return[{h:Math.abs(e)<1e-9?'0 % : aucune évolution':`${e>=0?'+':MINUS}${dec(Math.abs(e),2)} %`,ok:true},
        Math.abs(e)<1e-9?{h:`+${num(t1)} %`,why:'Le coefficient global vaut 1 : il n’y a aucune évolution au total.'}:{h:`${e>=0?MINUS:'+'}${dec(Math.abs(e),2)} %`,why:'Coefficient plus grand que 1 : hausse ; plus petit que 1 : baisse.',tag:'signe'},
        {h:`${dec(g*100,2)} %`,why:'Le pourcentage d’évolution est (coefficient − 1) × 100, pas coefficient × 100.',tag:'prop-coef'}]}}],
    explain:`Coefficients ${num(c1)} et ${num(c2)} ; coefficient global ${num(c1)} × ${num(c2)} = ${num(m1pR(c1*c2))}. Prix final : ${P} × ${num(m1pR(c1*c2))} = ${pf(P*c1*c2)}. Évolution globale : ${dec((c1*c2-1)*100,2)} %, et non ${num(t1-t2)} %.`})};
/* 11. Raisonner : retrouver le prix avant remise */
const gM1PropR2=()=>{const t=pick([10,20,25,40,50,30,15]),P=R(5,40)*10,c=1-t/100,F=m1pR(P*c),pf=v=>`${dec(v,2)} €`;
  return chain({instr:'Retrouve le prix avant la remise, en construisant ton raisonnement.',prompt:stx(`Après une remise de ${t} %, un article coûte ${pf(F)}. On note P son prix avant remise.`)
      +M1PROP_BARS([{v:P,l:'avant (P)',q:true},{v:F,t:pf(F),l:'après remise'}],[`${MINUS}${t} %`]),
    steps:[
      {q:'Quelle relation relie P et le prix après remise ?',o:[
        {h:`${pf(F)} = P × ${num(c)}`,ok:true,k:'div',v:F/c},
        {h:`P = ${pf(F)} × ${num(1+t/100)}`,k:'mul',v:F*(1+t/100),why:'La remise de '+t+' % porte sur P, pas sur le prix après remise : on ne peut pas la « rajouter » au prix final.',tag:'prop-init'},
        {h:`P = ${pf(F)} × ${num(c)}`,k:'rev',v:F*c,why:'C’est le prix après remise qui vaut P × '+num(c)+', pas l’inverse.',tag:'prop-init'}]},
      {q:'Donc P se calcule par…',o:prev=>{const k=prev[0].k;
        if(k==='div')return[{h:`P = ${pf(F)} ÷ ${num(c)}`,ok:true,v:F/c},{h:`P = ${pf(F)} × ${num(c)}`,v:F*c,why:'Pour isoler P, on divise par le coefficient.',tag:'mult-div'},{h:`P = ${pf(F)} + ${num(c)}`,v:F+c,why:'P est multiplié par le coefficient : on défait une multiplication par une division.'}];
        return[{h:k==='mul'?`P = ${pf(F)} × ${num(1+t/100)}`:`P = ${pf(F)} × ${num(c)}`,ok:true,v:prev[0].v},{h:`P = ${pf(F)} ÷ ${num(c)}`,v:F/c,why:'C’est le bon calcul, mais il ne découle pas de la relation que tu as choisie.'}]}},
      {q:'On obtient…',o:prev=>{const v=prev[1].v;return[{h:`P = ${pf(v)}`,ok:true,v},{h:`P = ${pf(v*1.1)}`,v:v*1.1,why:'Erreur de calcul : refais l’opération.',tag:'calc'},{h:`P = ${pf(v-F*t/100)}`,v:v-F*t/100,why:'On n’ajoute ni ne retire rien de plus : le calcul est terminé à l’étape précédente.'}]}},
      {q:'Contrôle : on applique la remise de '+t+' % au résultat.',o:prev=>{const v=prev[2].v,back=m1pR(v*c),good=Math.abs(back-F)<.006;
        return[{h:good?`On retrouve ${pf(F)} : c’est juste`:`On trouve ${pf(back)} au lieu de ${pf(F)} : il faut revoir`,ok:true},
          {h:good?`On trouve ${pf(back*1.05)} au lieu de ${pf(F)} : il faut revoir`:`On retrouve ${pf(F)} : c’est juste`,why:`${pf(v)} × ${num(c)} = ${pf(back)} : relis le calcul.`}]}}],
    explain:`Le prix après remise vaut P × ${num(c)}. Donc P = ${pf(F)} ÷ ${num(c)} = ${pf(P)}. Contrôle : ${pf(P)} × ${num(c)} = ${pf(F)}. Ajouter ${t} % à ${pf(F)} aurait donné ${pf(F*(1+t/100))}, ce qui est faux.`})};
ANA_UNITS.push({id:'m1-proportions',tr:'m1',name:'Proportions et pourcentages',sub:'Règle de trois, coefficients, évolutions, arrondis',glyph:'%',tone:'c',
  skills:[SKA('m1.pc.pct','Prendre un pourcentage',gM1PropPct,1),SKA('m1.pc.r3','Règle de trois',gM1PropR3,1),SKA('m1.pc.lire','Placer un point proportionnel',gM1PropLire,1),
    SKA('m1.pc.coef','Coefficient multiplicateur',gM1PropCoef,1),SKA('m1.pc.arr','Arrondir, estimer',gM1PropArr,1),SKA('m1.pc.evol','Appliquer une évolution',gM1PropEvol,2),
    SKA('m1.pc.succ','Évolutions successives',gM1PropSucc,2),SKA('m1.pc.init','Retrouver la valeur initiale',gM1PropInit,2),SKA('m1.pc.r1','Raisonner : hausse puis baisse',gM1PropR1,2),
    SKA('m1.pc.recip','Taux réciproque',gM1PropRecip,3),SKA('m1.pc.r2','Raisonner : prix avant remise',gM1PropR2,3)]});
