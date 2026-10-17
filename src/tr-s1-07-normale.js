/* ===================== STA001 · La loi normale ===================== */
Object.assign(ANA_ERR,{
  's1no-sigma':{label:'σ ou σ² ?',tip:'Dans N(μ ; σ²), le second paramètre est la variance : on divise par σ = √(variance) pour centrer-réduire.'},
  's1no-phi':{label:'Lecture de Φ',tip:'Φ(z) = P(Z ≤ z) est l’aire à GAUCHE de z. À droite : 1 − Φ(z). Symétrie : Φ(−z) = 1 − Φ(z).'},
  's1no-quant':{label:'Quantile de la loi normale',tip:'1,645 : 5 % dans une queue (90 % au centre) ; 1,96 : 95 % au centre ; 2,576 : 99 % au centre.'},
  's1no-cont':{label:'Correction de continuité',tip:'P(X ≤ k) ≈ Φ((k + 0,5 − μ)/σ) et P(X ≥ k) ≈ 1 − Φ((k − 0,5 − μ)/σ).'}});
const S1NO_TOL=.0011,S1NO_R=' Arrondis au millième.';
/** Cloche de N(μ ; σ²), graduée en μ + kσ ; o.aires : [[a,b],…] colorées ; o.v : [[x,'étiquette']] ; o.infl : points d’inflexion */
const S1NO_plot=(mu,s,o={})=>{const x0=mu-3.8*s,x1=mu+3.8*s,top=1/(s*Math.sqrt(2*Math.PI)),f=x=>top*Math.exp(-(((x-mu)/s)**2)/2),
  g=gp({W:300,H:170,x0,x1,y0:-top*.2,y1:top*1.18,pd:8,N:300});
  (o.aires||[]).forEach(([a,b])=>g.area(f,()=>0,Math.max(a,x0),Math.min(b,x1),'var(--t-c)',.45));
  g.seg(x0,0,x1,0,'var(--muted)',1.2).fn(f,'var(--t-sq)',2.4);
  if(o.grad!==false)for(let k=-3;k<=3;k++){const x=mu+k*s;g.seg(x,0,x,-top*.04,'var(--muted)',1.2);g.text(x,0,o.zlab?num(k):num(+x.toFixed(3)),'var(--muted)','middle',0,13,9,false)}
  if(o.infl)[-1,1].forEach(k=>g.dot(mu+k*s,f(mu+k*s),'var(--ink)',4));
  (o.v||[]).forEach(([x,l])=>{g.seg(x,0,x,top*1.05,'var(--t-x)',1.4,'4 3');if(l)g.text(x,top*1.05,l,'var(--t-x)','middle',0,-2,10)});
  return`<div class="qfig">${g.done(o.titre||'Courbe en cloche de la loi normale')}</div>`};
const S1NO_d4=v=>dec(v,4);
const S1NO_tab=zs=>dtab([['z',...zs.map(z=>dec(z,2))],['Φ(z)',...zs.map(z=>dec(Phi(z),4))]]);
const S1NO_SIG=[2,4,5,10,20,25];

/* 1. Lire μ et σ sur la cloche */
const gS1NoLire=()=>{const s=pick([2,3,4,5,10]),mu=pick([10,20,50,60,100,150]);
  return mcq('Quelle loi normale cette courbe représente-t-elle ?',stx('Les deux points noirs sont les points d’inflexion de la courbe (là où elle change de courbure).')+S1NO_plot(mu,s,{infl:true}),
    [{h:`N(${mu} ; ${s*s})`,ok:true},{h:`N(${mu} ; ${4*s*s})`,tag:'s1no-sigma'},{h:`N(${mu+s} ; ${s*s})`},{h:`N(${s} ; ${mu*mu})`}],
    `Le sommet (centre de symétrie) est en μ = ${mu}. Les points d’inflexion sont en μ ± σ, donc σ = ${s} et la variance vaut σ² = ${s*s} : N(${mu} ; ${s*s}).`,
    'μ se lit au sommet ; σ est la distance entre le sommet et un point d’inflexion. Le second paramètre est σ².')};

/* 2. Score z (point à placer) */
const gS1NoZ=()=>{const s=pick(S1NO_SIG),mu=pick([20,40,50,80,100,120]),z=pick([-2.5,-2,-1.5,-1,-.5,.5,1,1.5,2,2.5]),x=mu+z*s;
  return pointQ({instr:'Place le score z de la valeur x sur l’axe de N(0 ; 1).',prompt:stx(`X ~ N(${mu} ; ${s*s}) et x = ${num(x)}.`)+S1NO_plot(mu,s,{v:[[x,'x']]}),nom:'z',
    x:[-3.5,3.5],y:[-.6,.6],snap:.5,tol:.24,cible:[z,0],fond:{ligne:true,pas:.5,etiq:1},
    explain:`σ = √${s*s} = ${s}. z = (x − μ)/σ = (${num(x)} − ${mu})/${s} = ${num(z)} : x est à ${num(Math.abs(z))} écart${Math.abs(z)>1?'s':''}-type${Math.abs(z)>1?'s':''} ${z>0?'au-dessus':'au-dessous'} de la moyenne.`,
    hint:'z = (x − μ)/σ, avec σ et non σ².',diag:pt=>Math.abs(pt[0]-(x-mu)/(s*s))<.3?'s1no-sigma':Math.abs(pt[0]+z)<.3?'signe':null})};

/* 3. Règle 68-95-99,7 */
const gS1NoRegle=()=>{const s=pick([2,3,5,10,15]),mu=pick([50,100,200,60]),v=R(0,1);
  if(v===0){const k=R(1,3),P=['≈ 0,68','≈ 0,95','≈ 0,997','≈ 0,5'];
    return mcq(`Que vaut P(${mu-k*s} ≤ X ≤ ${mu+k*s}) ?`,stx(`X ~ N(${mu} ; ${s*s}).`)+S1NO_plot(mu,s,{aires:[[mu-k*s,mu+k*s]]}),
      P.map((h,i)=>({h,ok:i===k-1})),`σ = ${s} : l’intervalle est μ ± ${k}σ, qui contient ${['68','95','99,7'][k-1]} % des valeurs.`,'Repère combien d’écarts-types séparent les bornes de μ.')}
  const k=R(1,2),t=k===1?.16:.025;
  return mcq(`Que vaut environ P(X > ${mu+k*s}) ?`,stx(`X ~ N(${mu} ; ${s*s}).`)+S1NO_plot(mu,s,{aires:[[mu+k*s,mu+5*s]]}),
    [{h:'≈ 0,16',ok:k===1},{h:'≈ 0,025',ok:k===2},{h:'≈ 0,32',tag:'s1no-phi'},{h:'≈ 0,05',tag:'s1no-phi'}],
    `${mu+k*s} = μ + ${k}σ. À l’intérieur de μ ± ${k}σ : ${k===1?'68':'95'} %. Il reste ${k===1?'32':'5'} %, partagés également entre les deux queues : ≈ ${num(t)} à droite.`,'Pars de 68 % ou 95 % au centre, puis partage le reste entre les deux queues.')};

/* 4. Lire Φ (extrait de table fourni) */
const gS1NoPhi=()=>{const z=R(10,250)/100,v=R(0,3),zs=shuffle([z,+(z+.01).toFixed(2),+(z+.1).toFixed(2)]).sort((a,b)=>a-b);let ev,t,ar,ex,bad;
  const P=Phi(z),P4=+P.toFixed(4);
  if(v===0){ev=`P(Z ≤ ${dec(z,2)})`;t=P4;ar=[[-5,z]];bad=1-P4;ex=`Lecture directe : Φ(${dec(z,2)}) ≈ ${S1NO_d4(P)}.`}
  else if(v===1){ev=`P(Z > ${dec(z,2)})`;t=1-P4;ar=[[z,5]];bad=P4;ex=`Aire à droite : 1 − Φ(${dec(z,2)}) ≈ 1 − ${S1NO_d4(P)} = ${S1NO_d4(1-P4)}.`}
  else if(v===2){ev=`P(Z ≤ −${dec(z,2)})`;t=1-P4;ar=[[-5,-z]];bad=P4;ex=`Symétrie : Φ(−${dec(z,2)}) = 1 − Φ(${dec(z,2)}) ≈ 1 − ${S1NO_d4(P)} = ${S1NO_d4(1-P4)}.`}
  else{ev=`P(−${dec(z,2)} ≤ Z ≤ ${dec(z,2)})`;t=2*P4-1;ar=[[-z,z]];bad=P4;ex=`P = Φ(${dec(z,2)}) − Φ(−${dec(z,2)}) = 2Φ(${dec(z,2)}) − 1 ≈ 2 × ${S1NO_d4(P)} − 1 = ${S1NO_d4(2*P4-1)}.`}
  return nq({instr:`Calcule ${ev}.${S1NO_R}`,prompt:stx('Z suit la loi normale centrée réduite N(0 ; 1). Extrait de la table de Φ :')+S1NO_tab(zs)+S1NO_plot(0,1,{aires:ar,zlab:true}),
    labels:[`${ev} =`],t:[t],tol:S1NO_TOL,explain:ex,hint:'Φ(z) est l’aire à gauche de z. Dessine la zone cherchée.',diag:([u])=>near(u,bad,.0011)?'s1no-phi':null})};

/* 5. Probabilités pour X ~ N(μ ; σ²) */
const gS1NoProb=()=>{const s=pick(S1NO_SIG),mu=pick([20,50,80,100,150,200]),lo=Math.ceil(mu-2.4*s),hi=Math.floor(mu+2.4*s);let a,b;do{a=R(lo,hi);b=R(lo,hi)}while(b-a<s/2);
  const v=R(0,2),za=(a-mu)/s,zb=(b-mu)/s,F=z=>+Phi(z).toFixed(4),zt=z=>dec(z,2);let ev,t,ar,ex,bad;
  if(v===0){ev=`P(X ≤ ${a})`;t=F(za);ar=[[mu-5*s,a]];bad=Phi((a-mu)/(s*s));ex=`z = (${a} − ${mu})/${s} = ${zt(za)}, donc P(X ≤ ${a}) = Φ(${zt(za)}) ≈ ${S1NO_d4(t)}.`}
  else if(v===1){ev=`P(X > ${a})`;t=1-F(za);ar=[[a,mu+5*s]];bad=F(za);ex=`z = (${a} − ${mu})/${s} = ${zt(za)}, donc P(X > ${a}) = 1 − Φ(${zt(za)}) ≈ ${S1NO_d4(t)}.`}
  else{ev=`P(${a} ≤ X ≤ ${b})`;t=F(zb)-F(za);ar=[[a,b]];bad=F(zb)+F(za)-1;ex=`z₁ = (${a} − ${mu})/${s} = ${zt(za)} et z₂ = (${b} − ${mu})/${s} = ${zt(zb)}. P = Φ(${zt(zb)}) − Φ(${zt(za)}) ≈ ${S1NO_d4(F(zb))} − ${S1NO_d4(F(za))} = ${S1NO_d4(t)}.`}
  return nq({instr:`Calcule ${ev}.${S1NO_R}`,prompt:stx(`X suit la loi normale N(${mu} ; ${s*s}).`)+S1NO_plot(mu,s,{aires:ar}),labels:[`${ev} =`],t:[t],tol:S1NO_TOL,
    explain:`σ = √${s*s} = ${s}. `+ex,hint:'Centre et réduis : z = (x − μ)/σ, puis utilise Φ. Attention, σ = √(variance).',
    diag:([u])=>near(u,bad,.0011)?(v===0?'s1no-sigma':'s1no-phi'):null})};

/* 6. Trouver un seuil (quantile) */
const gS1NoQuant=()=>{const s=pick([2,4,5,8,10,15,20]),mu=pick([50,100,250,500,1000]),[q,z]=pick([[.9,1.2816],[.95,1.6449],[.975,1.96],[.99,2.3263],[.1,-1.2816],[.05,-1.6449],[.025,-1.96]]),t=mu+z*s;
  const up=q>.5,txt=up?`seulement ${num(+((1-q)*100).toFixed(1))} % des valeurs dépassent t`:`seulement ${num(+(q*100).toFixed(1))} % des valeurs sont inférieures à t`;
  return nq({instr:'Calcule le seuil t. Arrondis au dixième.',prompt:stx(`X ~ N(${mu} ; ${s*s}). On cherche t tel que ${txt}.`)+S1NO_plot(mu,s,{aires:up?[[t,mu+5*s]]:[[mu-5*s,t]],v:[[t,'t ?']]}),
    labels:['t ='],t:[t],tol:.0035*s+.05,
    explain:`On veut P(X ≤ t) = ${num(q)}. La table donne Φ(${dec(Math.abs(z),2)}) ≈ ${num(up?q:1-q)}, donc z = ${dec(z,2)}${up?'':' (symétrie)'}. t = μ + zσ = ${mu} ${z<0?'−':'+'} ${dec(Math.abs(z),2)} × ${s} ≈ ${dec(t,1)}.`,
    hint:'Traduis en P(X ≤ t) = q, lis z tel que Φ(z) = q, puis t = μ + zσ.',diag:([u])=>near(u,mu-z*s,.0035*s+.05)?'signe':near(u,mu+z*s*s,.5)?'s1no-sigma':null})};

/* 7. Quantiles usuels */
const gS1NoQz=()=>{const[c,ok,dsc]=pick([['central',0,'90 % au centre'],['central',1,'95 % au centre'],['central',3,'99 % au centre'],['droite',0,'P(Z ≤ z) = 0,95'],['droite',2,'P(Z ≤ z) = 0,99'],['droite',1,'P(Z ≤ z) = 0,975']]);
  const Z=[1.645,1.96,2.326,2.576],z=Z[ok];
  return mcq(`Quelle valeur z vérifie : ${dsc} ?`,stx('Z suit N(0 ; 1). La zone colorée correspond à la probabilité indiquée.')+S1NO_plot(0,1,{aires:c==='central'?[[-z,z]]:[[-5,z]],zlab:true,v:c==='central'?[[-z,'−z'],[z,'z']]:[[z,'z']]}),
    Z.map((v,i)=>({h:num(v),ok:i===ok,tag:'s1no-quant'})),
    c==='central'?`${dsc} laisse ${num(+((1-[.9,.95,.99,.99][ok])/2*100).toFixed(1))} % dans chaque queue : Φ(z) = ${num([.95,.975,.99,.995][ok])}, d’où z = ${num(z)}.`:`On lit directement Φ(z) = ${dsc.slice(-4)} : z = ${num(z)}.`,
    'Pour un intervalle centré, partage ce qui reste entre les deux queues avant de lire la table.')};

/* 8. Symétrie à partir d’une valeur de Φ */
const gS1NoSym=()=>{const a=R(20,240)/100,P=+Phi(a).toFixed(4),v=R(0,2),A=dec(a,2);let ev,t,ar,ex;
  if(v===0){ev=`P(Z ≤ −${A})`;t=1-P;ar=[[-5,-a]];ex=`Par symétrie, l’aire à gauche de −${A} égale l’aire à droite de ${A} : 1 − ${S1NO_d4(P)} = ${S1NO_d4(1-P)}.`}
  else if(v===1){ev=`P(Z ≥ −${A})`;t=P;ar=[[-a,5]];ex=`Par symétrie, l’aire à droite de −${A} égale l’aire à gauche de ${A} : ${S1NO_d4(P)}.`}
  else{ev=`P(−${A} ≤ Z ≤ ${A})`;t=2*P-1;ar=[[-a,a]];ex=`2Φ(${A}) − 1 = 2 × ${S1NO_d4(P)} − 1 = ${S1NO_d4(2*P-1)}.`}
  return nq({instr:`Calcule ${ev} (valeur exacte à partir de la donnée).`,prompt:stx(`Z suit N(0 ; 1) et Φ(${A}) = ${S1NO_d4(P)}.`)+S1NO_plot(0,1,{aires:ar,zlab:true}),labels:[`${ev} =`],t:[t],tol:.00011,
    explain:ex,hint:'La cloche est symétrique autour de 0 : Φ(−a) = 1 − Φ(a).',diag:([u])=>near(u,-P,.001)||near(u,v===0?P:1-P,.0002)?'s1no-phi':null})};

/* 9. Approximation normale d’une binomiale */
const gS1NoApprox=()=>{const n=pick([50,100,200,400]),p=pick([.2,.3,.4,.5]),mu=n*p,s=Math.sqrt(n*p*(1-p)),v=R(0,1),k=Math.round(mu+(v?1:-1)*R(2,Math.max(3,Math.round(1.6*s)))*(Math.random()<.5?1:-1));
  const t=v===0?Phi((k+.5-mu)/s):1-Phi((k-.5-mu)/s),ev=v===0?`P(X ≤ ${k})`:`P(X ≥ ${k})`,bad=v===0?Phi((k-mu)/s):1-Phi((k-mu)/s);
  const K0=Math.max(0,Math.floor(mu-3.5*s)),K1=Math.ceil(mu+3.5*s),top=1/(s*Math.sqrt(2*Math.PI))*1.2,g=gp({W:300,H:170,x0:K0-1,x1:K1+1,y0:-top*.12,y1:top,pd:8,N:300});
  for(let j=K0;j<=K1;j++){const h=v===0?j<=k:j>=k;g.rect(j-.5,0,j+.5,sBinP(n,p,j),h?'var(--t-c)':'var(--t-sq)',h?.8:.3)}
  g.fn(x=>Math.exp(-(((x-mu)/s)**2)/2)/(s*Math.sqrt(2*Math.PI)),'var(--t-x)',2.2).seg(K0-1,0,K1+1,0,'var(--muted)',1.2);
  [K0,Math.round(mu),K1].forEach(j=>g.text(j,0,j,'var(--muted)','middle',0,13,9,false));
  return nq({instr:`Calcule ${ev} avec l’approximation normale et la correction de continuité. Arrondis au millième (z arrondi au centième accepté).`,
    prompt:stx(`X suit la loi binomiale B(${n} ; ${num(p)}).`)+`<div class="qfig">${g.done('Binomiale et cloche normale')}</div>`,
    labels:[`${ev} ≈`],t:[t],tol:.003,
    explain:`np = ${num(mu)} ≥ 5 et n(1 − p) = ${num(n-mu)} ≥ 5. μ = ${num(mu)}, σ = √${num(+(n*p*(1-p)).toFixed(2))} ≈ ${dec(s,3)}. ${v===0?`P(X ≤ ${k}) ≈ Φ((${k},5 − ${num(mu)})/${dec(s,3)}) = Φ(${dec((k+.5-mu)/s,2)})`:`P(X ≥ ${k}) ≈ 1 − Φ((${k-1},5 − ${num(mu)})/${dec(s,3)}) = 1 − Φ(${dec((k-.5-mu)/s,2)})`} ≈ ${dec(t,4)}.`.replace(/(\d+),5 − /g,'$1,5 − '),
    hint:'μ = np, σ = √(np(1 − p)) ; chaque entier k devient [k − 0,5 ; k + 0,5].',diag:([u])=>near(u,bad,.003)?'s1no-cont':null})};

/* 10. Raisonner : P(X > a) */
const gS1NoR1=()=>{const s=pick([2,4,5,10]),mu=pick([20,40,50,100,120]),a=mu+pick([1,2,3,4,5,6,8])*s/4*(Math.random()<.3?-1:1);const V=s*s;
  return chain({instr:'Construis le raisonnement étape par étape.',prompt:stx(`X suit la loi normale N(${mu} ; ${V}). On cherche P(X > ${num(a)}).`),
    steps:[
      {q:'L’écart-type σ vaut…',o:[{h:`σ = √${V} = ${s}`,ok:true,s},{h:`σ = ${V}`,why:`${V} est la variance σ² ; l’écart-type est sa racine.`,tag:'s1no-sigma',s:V},{h:`σ = ${V}/2 = ${num(V/2)}`,why:'On prend la racine carrée de la variance, pas sa moitié.',tag:'s1no-sigma',s:V/2}]},
      {q:`On centre et on réduit ${num(a)} :`,o:prev=>{const S=prev[0].s;return[
        {h:`z = (${num(a)} − ${mu})/${num(S)} ≈ ${dec((a-mu)/S,2)}`,ok:true,z:(a-mu)/S},
        {h:`z = (${mu} − ${num(a)})/${num(S)} ≈ ${dec((mu-a)/S,2)}`,why:'On calcule (x − μ)/σ : la valeur moins la moyenne, pas l’inverse.',tag:'signe',z:(mu-a)/S},
        {h:`z = ${num(a)}/${num(S)} ≈ ${dec(a/S,2)}`,why:'Il faut d’abord centrer : soustraire la moyenne μ.',tag:'calc',z:a/S}]}},
      {q:'P(X > a) s’écrit alors…',o:[{h:'1 − Φ(z)',ok:true,f:'c'},{h:'Φ(z)',why:'Φ(z) est l’aire à gauche ; on cherche l’aire à droite.',tag:'s1no-phi',f:'d'},{h:'Φ(−z) − 1',why:'Une probabilité ne peut pas être négative : Φ(−z) − 1 ≤ 0. La bonne symétrie donne 1 − Φ(z) = Φ(−z).',tag:'s1no-phi',f:'n'}]},
      {q:'Résultat :',o:prev=>{const z=prev[1].z,f=prev[2].f,val=f==='c'?1-Phi(z):f==='d'?Phi(z):Phi(-z)-1;
        if(f==='n')return[{h:'Une valeur négative : ce n’est pas une probabilité',ok:true},{h:S1NO_d4(1-Phi(z)),why:'C’est 1 − Φ(z), mais ce n’est pas l’expression choisie.'}];
        return[{h:S1NO_d4(val),ok:true},...[1-Phi(z),Phi(z),1-Phi(-z)].filter(x=>Math.abs(x-val)>5e-5).map(x=>({h:S1NO_d4(x),why:'Ce nombre ne correspond pas à l’expression choisie juste avant.',tag:'calc'})),{h:'0,5',why:'0,5 est P(X > μ) ; ici la borne n’est pas la moyenne.',tag:'s1no-phi'},{h:'1',why:'Une probabilité de 1 voudrait dire que X dépasse cette valeur à coup sûr : ce n’est pas ce que donne l’expression choisie.',tag:'calc'}].filter((o,i,A)=>A.findIndex(y=>y.h===o.h)===i).slice(0,4)}}],
    explain:`σ = ${s}, z = (${num(a)} − ${mu})/${s} = ${dec((a-mu)/s,2)}, P(X > ${num(a)}) = 1 − Φ(${dec((a-mu)/s,2)}) ≈ ${S1NO_d4(1-Phi((a-mu)/s))}.`,
    hint:'σ = √(variance), z = (x − μ)/σ, et l’aire à droite vaut 1 − Φ(z).'})};

/* 11. Raisonner : retrouver μ ou σ */
const gS1NoR2=()=>{const[q,z,alt]=pick([[.95,1.645,1.96],[.975,1.96,1.645],[.99,2.326,2.576],[.9,1.282,1.645]]),findMu=Math.random()<.5,s=pick([2,4,5,10]),mu=pick([20,50,100,200]),a=+(mu+z*s).toFixed(1);
  const solve=(zz,eq)=>findMu?(eq==='ok'?a-zz*s:eq==='inv'?a+zz*s:a-zz*s*s):(eq==='ok'?(a-mu)/zz:eq==='inv'?(mu-a)/zz:Math.sqrt(Math.abs((a-mu)/zz)));
  return chain({instr:'Construis le raisonnement étape par étape.',
    prompt:stx(findMu?`X suit N(μ ; ${s*s}) avec μ inconnue, et P(X ≤ ${num(a)}) = ${num(q)}. Trouve μ.`:`X suit N(${mu} ; σ²) avec σ inconnu, et P(X ≤ ${num(a)}) = ${num(q)}. Trouve σ.`),
    steps:[
      {q:`Quel z vérifie Φ(z) = ${num(q)} ?`,o:[{h:`z ≈ ${num(z)}`,ok:true,z},{h:`z ≈ ${num(alt)}`,why:`Φ(${num(alt)}) ≈ ${dec(Phi(alt),3)}, pas ${num(q)}.`,tag:'s1no-quant',z:alt},{h:`z = ${num(q)}`,why:'q est une probabilité ; z se lit dans la table à l’envers.',tag:'s1no-phi',z:q},{h:`z ≈ −${num(z)}`,why:`q > 0,5, donc z est positif.`,tag:'signe',z:-z}]},
      {q:'Quelle équation écrire ?',o:[{h:mx(`(${num(a)} − μ)/σ = z`),ok:true,e:'ok'},{h:mx(`(μ − ${num(a)})/σ = z`),why:'Centrer, c’est calculer (x − μ), pas (μ − x).',tag:'signe',e:'inv'},{h:mx(`(${num(a)} − μ)/σ² = z`),why:'On réduit en divisant par σ, pas par σ².',tag:'s1no-sigma',e:'sq'}]},
      {q:findMu?'Donc μ vaut environ…':'Donc σ vaut environ…',o:prev=>{const zz=prev[0].z,e=prev[1].e,val=solve(zz,e);
        return[{h:dec(val,2),ok:true},...['ok','inv','sq'].filter(x=>x!==e).map(x=>solve(zz,x)).filter(x=>Math.abs(x-val)>.005).map(x=>({h:dec(x,2),why:'Ce nombre ne découle pas de l’équation choisie.',tag:'calc'})),
          ...(findMu?[]:[{h:dec((a-mu)*zz,2),why:'Pour isoler σ, on divise (x − μ) par z, on ne multiplie pas.',tag:'mult-div'}])].filter((o,i,A)=>A.findIndex(y=>y.h===o.h)===i).slice(0,4)}}],
    explain:`Φ(z) = ${num(q)} donne z ≈ ${num(z)}. (${num(a)} − μ)/σ = ${num(z)} donc ${findMu?`μ = ${num(a)} − ${num(z)} × ${s} ≈ ${dec(a-z*s,2)}`:`σ = (${num(a)} − ${mu})/${num(z)} ≈ ${dec((a-mu)/z,2)}`}.`,
    hint:'Lis z dans la table, écris (a − μ)/σ = z, puis isole l’inconnue.'})};

/* 12. Raisonner : Moivre-Laplace */
const gS1NoR3=()=>{const n=pick([100,200,300,400,500]),p=pick([.1,.2,.3,.4,.5]),mu=n*p,V=n*p*(1-p),s=Math.sqrt(V),k=Math.round(mu+pick([-2,-1,1,2])*s*.8);
  return chain({instr:'Construis le raisonnement étape par étape.',prompt:stx(`X suit la loi binomiale B(${n} ; ${num(p)}). On cherche une valeur approchée de P(X ≤ ${k}).`),
    steps:[
      {q:'Peut-on approcher X par une loi normale ?',o:[
        {h:`Oui : n = ${n} ≥ 30, np = ${num(mu)} ≥ 5 et n(1 − p) = ${num(n-mu)} ≥ 5`,ok:true},
        {h:`Non : p = ${num(p)} n’est pas égal à 0,5`,why:'p = 0,5 n’est pas exigé : il suffit que np et n(1 − p) soient assez grands.',tag:'binom-law'},
        {h:`Oui, mais avec une loi de Poisson de paramètre ${num(mu)}`,why:'Poisson convient pour p petit et np modéré ; ici np est grand, on utilise la loi normale.',tag:'binom-law'}]},
      {q:'Avec quels paramètres ?',o:[
        {h:`μ = ${num(mu)} et σ = √${num(+V.toFixed(2))} ≈ ${dec(s,3)}`,ok:true,s},
        {h:`μ = ${num(mu)} et σ = ${num(+V.toFixed(2))}`,why:'np(1 − p) est la variance ; σ en est la racine.',tag:'s1no-sigma',s:V},
        {h:`μ = ${num(mu)} et σ = √${num(mu)} ≈ ${dec(Math.sqrt(mu),3)}`,why:'σ = √(np(1 − p)) : le facteur (1 − p) manque (c’est l’écart-type de Poisson).',tag:'s1no-sigma',s:Math.sqrt(mu)}]},
      {q:`Avec la correction de continuité, P(X ≤ ${k}) ≈…`,o:prev=>{const S=prev[1].s;return[
        {h:`Φ((${k},5 − ${num(mu)})/${dec(S,3)})`,ok:true,b:k+.5},
        {h:`Φ((${k-1},5 − ${num(mu)})/${dec(S,3)})`,why:`La valeur ${k} est incluse : on va jusqu’à ${k},5.`,tag:'s1no-cont',b:k-.5},
        {h:`Φ((${k} − ${num(mu)})/${dec(S,3)})`,why:'Sans correction de continuité, on perd la moitié du bâton k.',tag:'s1no-cont',b:k}]}},
      {q:'Valeur arrondie :',o:prev=>{const S=prev[1].s,b=prev[2].b,val=Phi((b-mu)/S);
        return[{h:dec(val,3),ok:true},...[k+.5,k-.5,k].filter(x=>x!==b).map(x=>Phi((x-mu)/S)).filter(x=>Math.abs(x-val)>5e-4).map(x=>({h:dec(x,3),why:'Ce nombre correspond à une autre borne que celle choisie.',tag:'calc'})),
          {h:dec(1-val,3),why:'C’est l’aire à droite : P(X ≤ k) est une aire à gauche.',tag:'s1no-phi'}].filter((o,i,A)=>A.findIndex(y=>y.h===o.h)===i).slice(0,4)}}],
    explain:`Conditions vérifiées ; μ = ${num(mu)}, σ ≈ ${dec(s,3)}. P(X ≤ ${k}) ≈ Φ((${k},5 − ${num(mu)})/${dec(s,3)}) = Φ(${dec((k+.5-mu)/s,2)}) ≈ ${dec(Phi((k+.5-mu)/s),3)} (valeur exacte binomiale ≈ ${dec((()=>{let t=0;for(let j=0;j<=k;j++)t+=sBinP(n,p,j);return t})(),3)}).`,
    hint:'Conditions, puis μ = np et σ = √(np(1 − p)), puis correction de continuité.'})};

ANA_UNITS.push({id:'s1-normale',tr:'s1',name:'Loi normale',sub:'La cloche, le score z et la table de Φ',glyph:'±σ',tone:'sq',
  skills:[SKA('s1.no.lire','Lire μ et σ sur la cloche',gS1NoLire,1),SKA('s1.no.z','Placer un score z',gS1NoZ,1),SKA('s1.no.regle','Règle 68-95-99,7',gS1NoRegle,1),
    SKA('s1.no.sym','Symétrie de la cloche',gS1NoSym,1),SKA('s1.no.qz','Quantiles usuels',gS1NoQz,1),SKA('s1.no.phi','Lire la table de Φ',gS1NoPhi,2),
    SKA('s1.no.prob','Probabilités d’une loi normale',gS1NoProb,2),SKA('s1.no.quant','Trouver un seuil',gS1NoQuant,2),SKA('s1.no.r1','Raisonner : une queue de la cloche',gS1NoR1,2),
    SKA('s1.no.approx','Approximation normale d’une binomiale',gS1NoApprox,3),SKA('s1.no.r2','Raisonner : retrouver μ ou σ',gS1NoR2,3),SKA('s1.no.r3','Raisonner : Moivre-Laplace',gS1NoR3,3)]});
