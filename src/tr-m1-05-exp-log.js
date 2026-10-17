/* ===================== MVA911 · Exponentielles et logarithmes : premiers pas ===================== */
Object.assign(ANA_ERR,{
  'xl-lin':{label:'Croissance prise pour linéaire',tip:'Une hausse de t % par période multiplie par (1 + t/100) à chaque période : après n périodes, × (1 + t/100)ⁿ, et non + n × t %.'},
  'xl-seuil':{label:'Arrondi d’un seuil',tip:'Pour dépasser un seuil, il faut un nombre entier de périodes : on prend l’entier immédiatement supérieur.'}});
/** Écrit 10^n en décimal (avec espaces) */
const m1xlP=n=>{const s=n>=0?'1'+'0'.repeat(n):'0,'+'0'.repeat(-n-1)+'1';const[i,d]=s.split(',');return i.replace(/\B(?=(\d{3})+(?!\d))/g,' ')+(d?','+d.replace(/(\d{3})(?=\d)/g,'$1 '):'')};
/** Échelle logarithmique de 10^k0 à 10^k1, avec éventuellement une valeur marquée */
const M1XL_SCALE=(k0,k1,mark,lab='?')=>{const W=300,X=v=>20+(v-k0)/(k1-k0)*(W-40);let s=`<line x1="14" x2="${W-14}" y1="44" y2="44" stroke="var(--ink)" stroke-width="1.6"/>`;
  for(let k=k0;k<=k1;k++){s+=`<line x1="${X(k).toFixed(1)}" x2="${X(k).toFixed(1)}" y1="37" y2="51" stroke="var(--ink)"/><text x="${X(k).toFixed(1)}" y="28" font-size="10" text-anchor="middle" fill="var(--t-sq)">10<tspan dy="-4" font-size="8">${k<0?MINUS+(-k):k}</tspan></text><text x="${X(k).toFixed(1)}" y="68" font-size="11" text-anchor="middle" fill="var(--muted)">${num(k)}</text>`;
    if(k<k1)for(let m=2;m<10;m++)s+=`<line x1="${X(k+Math.log10(m)).toFixed(1)}" x2="${X(k+Math.log10(m)).toFixed(1)}" y1="41" y2="47" stroke="var(--muted)"/>`}
  if(mark!=null){const x=X(Math.log10(mark));s+=`<circle cx="${x.toFixed(1)}" cy="44" r="5" fill="var(--t-c)"/><text x="${x.toFixed(1)}" y="86" font-size="12" font-weight="700" text-anchor="middle" fill="var(--t-c)">${lab}</text>`}
  s+=`<text x="${W-14}" y="10" font-size="9" text-anchor="end" fill="var(--muted)">en haut : le nombre · en bas : son log</text>`;
  return`<div class="qfig"><svg viewBox="0 0 ${W} ${mark!=null?92:74}" role="img" aria-label="Échelle logarithmique">${s}</svg></div>`};
/** Barres d'une suite de valeurs (la dernière inconnue) */
const M1XL_BARS=(vals,lbl,q)=>{const W=300,H=150,n=vals.length,bw=Math.min(50,(W-20)/n-8),gap=n>1?(W-20-n*bw)/(n-1):0,mx2=Math.max(...vals)*1.18;let s='';
  vals.forEach((v,i)=>{const h=Math.max(3,v/mx2*(H-40)),x=10+i*(bw+gap),y=H-20-h,last=i===n-1;
    s+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="4" fill="${last?'var(--surface)':'var(--t-sq)'}" stroke="${last?'var(--ink)':'none'}" ${last?'stroke-dasharray="5 4"':''}/>`
      +`<text x="${(x+bw/2).toFixed(1)}" y="${(y-5).toFixed(1)}" font-size="10" font-weight="700" text-anchor="middle" fill="var(--ink)">${last?'?':dec(v,0)}</text><text x="${(x+bw/2).toFixed(1)}" y="${H-5}" font-size="10" text-anchor="middle" fill="var(--muted)">${lbl(i)}</text>`;
    if(i<n-1)s+=`<text x="${(x+bw+gap/2).toFixed(1)}" y="${(H-24).toFixed(1)}" font-size="9" font-weight="700" text-anchor="middle" fill="var(--t-c)">×${num(q)}</text>`});
  return`<div class="qfig"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Valeurs successives">${s}</svg></div>`};
/* 1. Croissance de t % par période */
const gM1XlCroiss=()=>{const t=pick([2,3,4,5,8,10,12,15,20,25]),n=R(2,6),V=pick([1000,2000,500,1500,5000,800]),q=1+t/100,F=V*q**n,ctx=pick([['€','placés à','par an','an'],['bactéries','qui augmentent de','par heure','h']]);
  return nq({instr:'Calcule la valeur finale.',prompt:stx(`${num(V)} ${ctx[0]} ${ctx[1]} ${t} % ${ctx[2]}. Combien après ${n} ${ctx[3]==='an'?'ans':'heures'} ?`)+M1XL_BARS(Array.from({length:n+1},(_,i)=>V*q**i),i=>i?`${i} ${ctx[3]}`:'départ',q),
    labels:[`Valeur (${ctx[0]}) =`],t:[F],dp:2,
    explain:`Coefficient par période : q = 1 + ${t}/100 = ${num(q)}. Après ${n} périodes : ${num(V)} × ${num(q)}<sup>${n}</sup> ≈ ${num(V)} × ${dec(q**n,6)} ≈ ${dec(F,2)}.`,
    hint:'Multiplie la valeur de départ par (1 + t/100) puissance le nombre de périodes.',diag:([x])=>near(x,V*(1+n*t/100),.006)?'xl-lin':null})};
/* 2. Logarithme d'une puissance de 10 */
const gM1XlLog10=()=>{const n=R(-4,6);
  return nq({instr:'Calcule sans calculatrice.',prompt:`<span class="m">log(${m1xlP(n)})</span>`+M1XL_SCALE(-4,6,10**n,m1xlP(n)),labels:['='],t:[n],
    explain:`${m1xlP(n)} = 10<sup>${num(n)}</sup>, donc log(${m1xlP(n)}) = ${num(n)}. ${n<0?'Un nombre entre 0 et 1 a un logarithme négatif.':n===0?'Aucun facteur 10 : log 1 = 0.':'C’est le nombre de zéros.'}`,
    hint:'Écris le nombre comme une puissance de 10 : le log est l’exposant.',diag:([x])=>near(x,-n,1e-9)?'signe':near(x,10**n/10,1e-9)?'log-def':null})};
/* 3. Lire une exponentielle : résoudre graphiquement */
const gM1XlLire=()=>{const half=Math.random()<.4,xs=half?[-2,-1,0,1]:[-1,0,1,2],x=pick(xs),y=half?2**-x:2**x,f=half?'0.5^x':'2^x';
  return pointQ({instr:'Place le point de la courbe qui a cette ordonnée.',prompt:stx(`La courbe est celle de y = ${half?'(1/2)':'2'}<sup><i>x</i></sup>. Résous graphiquement ${half?'(1/2)':'2'}<sup><i>x</i></sup> = ${num(y)} : place le point M de la courbe d’ordonnée ${num(y)}.`),
    nom:'M',x:[-2.5,3.5],y:[-.5,4.5],snap:.5,tol:.24,cible:[x,y],fond:{f:[f],pas:1},
    explain:`${half?'(1/2)':'2'}<sup>${num(x)}</sup> = ${num(y)}, donc M(${num(x)} ; ${num(y)}) et la solution est x = ${num(x)}${half?'':` = log₂(${num(y)})`}. ${x<0?'Un exposant négatif donne l’inverse.':x===0?'Toute base à la puissance 0 vaut 1.':''}`,
    hint:'Pars de la hauteur demandée sur l’axe vertical, va horizontalement jusqu’à la courbe.',diag:([px,py])=>Math.abs(px-y)<.01&&Math.abs(py-x)<.01?'log-def':null})};
/* 4. Règles du logarithme */
const M1XL_PAIRS=[[2,5],[4,25],[2,50],[5,20],[8,125],[25,40],[20,50],[4,250],[5,200],[2,500]];
const gM1XlRules=()=>{const k=R(0,2);
  if(k===0){const[a,b]=pick(M1XL_PAIRS),v=Math.round(Math.log10(a*b));
    return nq({instr:'Calcule sans calculatrice.',prompt:`<span class="m">log ${a} + log ${b}</span>`,labels:['='],t:[v],explain:`log ${a} + log ${b} = log(${a} × ${b}) = log ${m1xlP(v)} = ${v}.`,
      hint:'log a + log b = log(ab).',diag:([x])=>near(x,Math.log10(a+b),.01)?'log-prod':null})}
  if(k===1){const m=pick([2,3,5,7,4,6]),p=R(1,4),N=m*10**p;
    return nq({instr:'Calcule sans calculatrice.',prompt:`<span class="m">log ${m1xlP(p).replace(/^1/,String(m))} ${MINUS} log ${m}</span>`,labels:['='],t:[p],explain:`log ${num(N)} − log ${m} = log(${num(N)} ÷ ${m}) = log ${m1xlP(p)} = ${p}.`,
      hint:'log a − log b = log(a/b).',diag:([x])=>near(x,Math.log10(N-m),.01)?'log-quot':null})}
  const b=pick([2,3,5]),n=R(2,b===2?6:3),a=b**n;
  return nq({instr:'Calcule sans calculatrice.',prompt:`<span class="m">${fr(`log ${a}`,`log ${b}`)}</span>`,labels:['='],t:[n],explain:`${a} = ${b}<sup>${n}</sup>, donc log ${a} = ${n} log ${b}, et le quotient vaut ${n}.`,
    hint:`Écris ${a} comme une puissance de ${b}, puis utilise log(aⁿ) = n log a.`,diag:([x])=>near(x,a/b,1e-9)||near(x,Math.log10(a/b),.01)?'log-quot':null})};
/* 5. Résoudre 10^x = a */
const gM1XlEq=()=>{const m=pick([2,3,4,5,6,7,8,9,1.5,2.5]),k=R(-2,3),a=m*10**k,x=Math.log10(a);
  return nq({instr:'Résous l’équation.',prompt:`<span class="m">10<sup><i>x</i></sup> = ${num(+a.toFixed(6))}</span>`+M1XL_SCALE(-2,4,a,num(+a.toFixed(6))),labels:['x ='],t:[x],dp:2,
    explain:`10<sup>x</sup> = a ⟺ x = log a : x = log ${num(+a.toFixed(6))} ≈ ${dec(x,3)}. Contrôle : ${num(+a.toFixed(6))} est entre 10<sup>${k}</sup> et 10<sup>${k+1}</sup>, donc x est entre ${k} et ${k+1}, comme sur l’échelle.`,
    hint:'Le logarithme décimal est la réciproque de 10ˣ.',diag:([v])=>near(v,a/10,.006)?'log-def':near(v,Math.log(a),.006)?'log-def':null})};
/* 6. Nombre de périodes pour atteindre un seuil */
const gM1XlSeuil=()=>{const t=pick([3,4,5,6,8,10,12,15,20]),c=pick([2,3,1.5]),q=1+t/100,r=Math.log(c)/Math.log(q),n=Math.ceil(r);if(Math.abs(r-Math.round(r))<.02)return gM1XlSeuil();
  return nq({instr:'Donne le nombre entier de périodes.',prompt:stx(`Une quantité augmente de ${t} % par an. Au bout de combien d’années entières aura-t-elle au moins été multipliée par ${num(c)} ?`)
      +FIG.plot({x:[0,n+3],y:[0,c+1],f:[`${q}^x`,{f:`${c}`,c:1,dash:true}],pas:n>12?5:1,pasy:.5,etiq:n>12?5:2,etiqy:1}),
    labels:['Nombre d’années ='],t:[n],
    explain:`On cherche n tel que ${num(q)}<sup>n</sup> ≥ ${num(c)}, soit n ≥ log ${num(c)} / log ${num(q)} ≈ ${dec(r,2)}. Il faut un nombre entier d’années : n = ${n}. Sur le graphique, la courbe croise la droite y = ${num(c)} juste avant x = ${n}.`,
    hint:`Prends le logarithme : n log ${num(q)} ≥ log ${num(c)}.`,diag:([v])=>near(v,n-1,1e-9)?'xl-seuil':near(v,Math.ceil((c-1)*100/t),1e-9)?'xl-lin':null})};
/* 7. Définition du logarithme */
const gM1XlDef=()=>{const T=['log(1) = 0','log(10) = 1','log(0,1) = −1','log(1 000) = 3','10<sup>log 7</sup> = 7','log(100) = 2'],
  F=[['log(0) = 0','log(0) n’existe pas : aucune puissance de 10 ne vaut 0.'],['log(−10) = −1','Le logarithme n’est défini que pour des nombres strictement positifs.'],['log(100) = 10','100 = 10², donc log 100 = 2.'],
    ['log(2 + 3) = log 2 + log 3','log(a + b) ≠ log a + log b : c’est log(ab) qui vaut log a + log b.'],['log(1 000) = 100','Le log compte les facteurs 10 : log 1 000 = 3.'],['log(10) = 0','log 10 = 1, car 10 = 10¹.'],['log(2 × 5) = log 2 × log 5','Le log d’un produit est une somme : log 2 + log 5.']];
  const ok=pick(T),fs=shuffle(F.slice()).slice(0,3);
  return mcq('Quelle égalité est vraie ?','<span class="m">log désigne le logarithme décimal.</span>',[{h:`<span class="m">${ok}</span>`,ok:true},...fs.map(f=>({h:`<span class="m">${f[0]}</span>`,tag:'log-def'}))],
    `Vrai : ${ok}. Les autres sont fausses : ${fs.map(f=>f[1]).join(' ')}`,'log x est l’exposant y tel que 10ʸ = x ; il n’existe que pour x > 0.')};
/* 8. Linéaire ou exponentielle ? */
const gM1XlLin=()=>{const k=R(0,2);let v;const a=R(1,4);
  if(k===0){const r=R(1,3);v=[0,1,2,3,4].map(i=>a+r*i)}else if(k===1){const q=pick([2,1.5]);v=[0,1,2,3,4].map(i=>a*q**i)}else v=[0,1,2,3,4].map(i=>a+i*i/2);
  const ym=Math.ceil(Math.max(...v)+1);
  return mcq('Quel type de croissance ?',dtab([['n',0,1,2,3,4],['valeur',...v.map(x=>num(+x.toFixed(3)))]])+FIG.plot({x:[-.5,4.5],y:[0,ym],pts:v.map((y,i)=>[i,y]),pas:1,pasy:ym>12?2:1,etiq:1,etiqy:ym>12?4:2}),
    [{h:'Linéaire : on ajoute toujours le même nombre',ok:k===0},{h:'Exponentielle : on multiplie toujours par le même nombre',ok:k===1,tag:k===0?'xl-lin':undefined},{h:'Ni l’un ni l’autre',ok:k===2}],
    k===0?`Les écarts sont constants (+${num(v[1]-v[0])}) : croissance linéaire, les points sont alignés.`:k===1?`Les rapports sont constants (× ${num(v[1]/v[0])}) : croissance exponentielle, les points s’incurvent vers le haut.`:`Les écarts (${[1,2,3,4].map(i=>num(v[i]-v[i-1])).join(' ; ')}) ne sont pas constants, et les rapports non plus : ni linéaire ni exponentielle.`,
    'Calcule les écarts entre valeurs successives, puis les rapports.',true)};
/* 9. Raisonner : intérêts composés */
const gM1XlR1=()=>{const t=pick([2,3,4,5,6,8,10]),n=R(3,10),C=pick([1000,2000,5000,1500,3000]),q=1+t/100,eur=v=>`${dec(v,2)} €`;
  return chain({instr:'Calcule la valeur du placement en construisant ton raisonnement.',prompt:stx(`On place ${num(C)} € à ${t} % par an (intérêts composés) pendant ${n} ans.`)+M1XL_BARS(Array.from({length:4},(_,i)=>C*q**i),i=>i?`an ${i}`:'départ',q),
    steps:[
      {q:'Chaque année, le capital est multiplié par…',o:[{h:num(q),ok:true,q},{h:num(t/100),q:t/100,why:`${num(t/100)} est la part ajoutée ; le capital entier est multiplié par 1 + ${num(t/100)}.`,tag:'prop-coef'},{h:num(1+t),q:1+t,why:`${t} % = ${num(t/100)}, pas ${t}.`,tag:'pourcent'}]},
      {q:`Sur ${n} ans, le coefficient global vaut…`,o:prev=>{const Q=prev[0].q;return[{h:`${num(Q)}<sup>${n}</sup>`,ok:true,g:Q**n},{h:`${n} × ${num(Q)}`,g:n*Q,why:'On multiplie '+n+' fois par le coefficient : c’est une puissance, pas un produit par '+n+'.',tag:'exp-mul'},
        {h:`1 + ${n} × ${num(t/100)}`,g:1+n*t/100,why:'Ce serait vrai si les intérêts ne produisaient pas d’intérêts : ici ils sont composés.',tag:'xl-lin'}]}},
      {q:'La valeur finale est…',o:prev=>{const g=prev[1].g;return[{h:eur(C*g),ok:true,g},{h:eur(C+g),g,why:'On multiplie le capital par le coefficient, on ne l’ajoute pas.'},{h:eur(C*g*q),g:g*q,why:`C’est la valeur après ${n+1} ans : compte bien les années.`}]}},
      {q:'L’évolution globale du capital est donc de…',o:prev=>{const g=prev[2].g;return[{h:`+${dec((g-1)*100,1)} %`,ok:true},{h:`+${dec(n*t,1)} %`,why:'Les pourcentages ne s’additionnent pas d’une année sur l’autre.',tag:'xl-lin'},{h:`+${dec(g*100,1)} %`,why:'Le pourcentage d’évolution est (coefficient − 1) × 100.',tag:'prop-coef'}]}}],
    explain:`Coefficient annuel ${num(q)} ; sur ${n} ans : ${num(q)}<sup>${n}</sup> ≈ ${dec(q**n,4)}. Valeur finale : ${num(C)} × ${dec(q**n,4)} ≈ ${eur(C*q**n)}, soit +${dec((q**n-1)*100,1)} % (et non +${n*t} %).`})};
/* 10. Raisonner : résoudre q^n ≥ c ou q^n ≤ c avec le logarithme */
const gM1XlR2=()=>{const up=Math.random()<.5,t=up?pick([5,8,10,15,20,25]):pick([10,20,25,30]),q=up?1+t/100:1-t/100,c=up?pick([2,3]):.5,rel=up?'≥':'≤';
  const L=Math.log10,frm=(s,r,v)=>`n ${s} ${r}`;
  return chain({instr:'Trouve le nombre d’années en construisant ton raisonnement.',prompt:stx(up?`Une quantité augmente de ${t} % par an. Au bout de combien d’années entières a-t-elle été multipliée au moins par ${c} ? On résout ${num(q)}<sup>n</sup> ≥ ${c}.`
      :`Une valeur baisse de ${t} % par an. Au bout de combien d’années entières est-elle passée sous la moitié de sa valeur ? On résout ${num(q)}<sup>n</sup> ≤ 0,5.`),
    steps:[
      {q:'On prend le logarithme des deux membres :',o:[{h:`n × log ${num(q)} ${rel} log ${num(c)}`,ok:true,k:'ok'},{h:`log n + log ${num(q)} ${rel} log ${num(c)}`,k:'prod',why:`log(qⁿ) = n log q : l’exposant passe devant en facteur.`,tag:'log-prod'},
        {h:`n + log ${num(q)} ${rel} log ${num(c)}`,k:'sum',why:'L’exposant devient un facteur de log q, pas un terme ajouté.',tag:'log-prod'}]},
      {q:'On isole n :',o:prev=>{const k=prev[0].k;
        if(k==='ok'){const v=L(c)/L(q);return[{h:`n ≥ log ${num(c)} / log ${num(q)}`,ok:true,v,d:'≥'},{h:`n ≤ log ${num(c)} / log ${num(q)}`,v,d:'≤',why:up?'log '+num(q)+' > 0 : diviser ne change pas le sens.':'log '+num(q)+' < 0 : diviser par un nombre négatif change le sens de l’inégalité.',tag:'ineq-flip'}]}
        if(k==='prod'){const v=c/q;return[{h:`n ${rel} ${num(c)} / ${num(q)}`,ok:true,v,d:rel},{h:`n ≥ log ${num(c)} / log ${num(q)}`,v:L(c)/L(q),d:'≥',why:'C’est la bonne inégalité, mais elle ne découle pas de ton étape précédente.'}]}
        const v=L(c)-L(q);return[{h:`n ${rel} log ${num(c)} ${MINUS} log ${num(q)}`,ok:true,v,d:rel},{h:`n ≥ log ${num(c)} / log ${num(q)}`,v:L(c)/L(q),d:'≥',why:'C’est la bonne inégalité, mais elle ne découle pas de ton étape précédente.'}]}},
      {q:'À la calculatrice :',o:prev=>{const{v,d}=prev[1];return[{h:`n ${d} ${dec(v,2)}`,ok:true,v,d},{h:`n ${d} ${dec(v*2.3026,2)}`,v:v*2.3026,d,why:'Utilise la touche log (base 10), pas ln, ou garde la même touche partout.'}]}},
      {q:'Le nombre entier d’années cherché est…',o:prev=>{const{v,d}=prev[2],up2=Math.ceil(v),dn=Math.floor(v);
        if(d==='≤')return[{h:'Aucun sens : toutes les petites durées conviendraient, il faut revoir le sens',ok:true},{h:`${Math.max(up2,1)} ans`,why:'Avec n ≤ … , ce ne serait pas une durée minimale : l’inégalité est dans le mauvais sens.',tag:'ineq-flip'}];
        return[{h:`${up2} ans`,ok:true},{h:`${dn} ans`,why:`${dn} ans ne suffisent pas : il faut n ≥ ${dec(v,2)}, donc l’entier supérieur.`,tag:'xl-seuil'},{h:`${dec(v,2)} ans`,why:'On demande un nombre entier d’années.',tag:'xl-seuil'}]}}],
    explain:`n log ${num(q)} ${rel} log ${num(c)}. ${up?'':'Comme log '+num(q)+' < 0, diviser change le sens : '}n ≥ log ${num(c)} / log ${num(q)} ≈ ${dec(L(c)/L(q),2)}. Il faut donc ${Math.ceil(L(c)/L(q))} ans.`})};
/* 11. Échelles logarithmiques */
const gM1XlEch=()=>{const k=R(0,2);let p,d,expl;
  if(k===0){const a=R(2,5),b=a+R(1,3);d=b-a;p=`Une solution a un pH de ${a}, une autre un pH de ${b}. Combien de fois la concentration en ions H₃O⁺ est-elle plus grande dans la première ?`;expl=`Une unité de pH en moins, c’est 10 fois plus d’ions : écart ${d}, donc 10<sup>${d}</sup> = ${num(10**d)}.`}
  else if(k===1){d=R(1,4);p=`Un son passe de ${40} dB à ${40+10*d} dB. Par combien son intensité est-elle multipliée ?`;expl=`+10 dB multiplie l’intensité par 10 : +${10*d} dB, c’est × 10<sup>${d}</sup> = ${num(10**d)}.`}
  else{const a=R(3,5);d=R(1,3);p=`Un séisme de magnitude ${a+d} est comparé à un séisme de magnitude ${a}. Combien de fois l’amplitude des ondes est-elle plus grande ?`;expl=`Un point de magnitude multiplie l’amplitude par 10 : écart ${d}, donc × 10<sup>${d}</sup> = ${num(10**d)}.`}
  return nq({instr:'Utilise l’échelle logarithmique.',prompt:stx(p),labels:['Facteur ='],t:[10**d],explain:expl,hint:'Sur une échelle logarithmique, ajouter 1 (ou 10 dB) revient à multiplier par 10.',
    diag:([x])=>near(x,10*d,1e-9)||near(x,d,1e-9)?'xl-lin':null})};
ANA_UNITS.push({id:'m1-exp-log',tr:'m1',name:'Exponentielles et logarithmes',sub:'Croissance exponentielle, logarithme décimal',glyph:'log',tone:'c',
  skills:[SKA('m1.el.lin','Linéaire ou exponentielle',gM1XlLin,1),SKA('m1.el.log10','Logarithme d’une puissance de 10',gM1XlLog10,1),SKA('m1.el.def','Définition du logarithme',gM1XlDef,1),
    SKA('m1.el.croiss','Croissance de t % par période',gM1XlCroiss,2),SKA('m1.el.lire','Résoudre graphiquement bˣ = c',gM1XlLire,2),SKA('m1.el.rules','Règles du logarithme',gM1XlRules,2),
    SKA('m1.el.eq','Résoudre 10ˣ = a',gM1XlEq,2),SKA('m1.el.r1','Raisonner : intérêts composés',gM1XlR1,2),SKA('m1.el.seuil','Atteindre un seuil',gM1XlSeuil,3),
    SKA('m1.el.r2','Raisonner : combien d’années ?',gM1XlR2,3),SKA('m1.el.ech','Échelles logarithmiques',gM1XlEch,3)]});
