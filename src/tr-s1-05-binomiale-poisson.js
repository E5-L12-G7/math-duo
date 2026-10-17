/* ===================== STA001 · Lois binomiale et de Poisson ===================== */
Object.assign(ANA_ERR,{
  's1bp-param':{label:'Paramètres de la loi binomiale',tip:'n est le nombre d’essais, p la probabilité du succès sur UN essai (cas favorables ÷ cas possibles).'},
  's1bp-var':{label:'Variance binomiale',tip:'Pour B(n ; p) : V(X) = np(1 − p). C’est la loi de Poisson qui a V = E.'},
  's1bp-lambda':{label:'Paramètre λ',tip:'λ est le nombre moyen d’événements sur la période observée : il est proportionnel à sa durée. Pour approcher B(n ; p), λ = np.'},
  's1bp-poi':{label:'Formule de Poisson',tip:'P(X = k) = e^(−λ) × λ^k / k! : n’oublie ni le facteur e^(−λ), ni la factorielle.'}});
/** Diagramme en bâtons d’une loi discrète : P(k) pour k = 0…K ; o.hl(k) surligne, o.mean trace l’espérance, o.P2 ajoute des points (autre loi) */
const S1BP_bars=(P,K,o={})=>{const ks=[...Array(K+1).keys()],top=Math.max(...ks.map(P),...(o.P2?ks.map(o.P2):[0]))*1.18||1,
  g=gp({W:300,H:180,x0:-.9,x1:K+.9,y0:-top*.12,y1:top,pd:8});
  ks.forEach(k=>{const h=o.hl&&o.hl(k);g.rect(k-.34,0,k+.34,P(k),h?'var(--t-c)':'var(--t-sq)',h?.95:.45)});
  if(o.P2)ks.forEach(k=>g.dot(k,o.P2(k),'var(--t-x)',3.5));
  g.seg(-.9,0,K+.9,0,'var(--muted)',1.2);const st=K>24?5:K>12?2:1;ks.filter(k=>k%st===0).forEach(k=>g.text(k,0,k,'var(--muted)','middle',0,13,9,false));
  if(o.mean!=null)g.seg(o.mean,0,o.mean,top*.97,'var(--t-x)',2,'5 4');
  return`<div class="qfig">${g.done(o.titre||'Diagramme en bâtons de la loi')}</div>`};
const S1BP_leg=t=>`<p class="stxt" style="font-size:.85em;color:var(--muted)">${t}</p>`;
const S1BP_f=v=>v>=1e5?num(Math.round(v)):v<5e-5?'≈ 0,0000':dec(v,4);   // probabilité (ou valeur aberrante) écrite à 4 décimales
const S1BP_sci=v=>{if(v>=1e-4||v===0)return dec(v,4);const e=Math.floor(Math.log10(v)),m=v/10**e;return`${dec(m,2)} × 10<sup>−${-e}</sup>`};
const S1BP_P=[.1,.2,.25,.3,.4,.5,.6,.7,.75,.8];

/* 1. Reconnaître la loi d’une variable */
const gS1BpRecon=()=>{const v=R(0,5);let pr,opts,ex;
  if(v===0){const n=R(10,60);pr=`On lance ${n} fois un dé équilibré. X compte le nombre de 6 obtenus.`;
    opts=[{h:`B(${n} ; 1/6)`,ok:true},{h:`B(${n} ; 5/6)`,tag:'s1bp-param'},{h:`P(${num(+(n/6).toFixed(2))})`,tag:'binom-law'},{h:'Ni binomiale, ni Poisson'}];
    ex=`${n} lancers identiques et indépendants, deux issues (6 ou pas 6), X compte les succès : X ~ B(${n} ; 1/6). Le nombre d’essais est fixé et p = 1/6 n’est pas « rare » : on garde la binomiale.`}
  else if(v===1){const n=R(10,30),c=pick([3,4,5]);pr=`Un QCM comporte ${n} questions ayant chacune ${c} réponses proposées, dont une seule juste. Un candidat répond entièrement au hasard. X est son nombre de bonnes réponses.`;
    opts=[{h:`B(${n} ; 1/${c})`,ok:true},{h:`B(${c} ; 1/${n})`,tag:'s1bp-param'},{h:`B(${n} ; ${c-1}/${c})`,tag:'s1bp-param'},{h:'Ni binomiale, ni Poisson'}];
    ex=`${n} questions, réponses au hasard donc indépendantes, succès « bonne réponse » de probabilité 1/${c} : X ~ B(${n} ; 1/${c}).`}
  else if(v===2){const g=R(2,6),l=R(3,9),n=R(3,8);pr=`Une urne contient ${g} boules rouges et ${l} boules noires. On tire ${n} fois une boule <b>avec remise</b>. X compte les boules rouges.`;
    opts=[{h:`B(${n} ; ${g}/${g+l})`,ok:true},{h:`B(${n} ; ${g}/${l})`,tag:'s1bp-param'},{h:`B(${g+l} ; ${g}/${g+l})`,tag:'s1bp-param'},{h:'Ni binomiale, ni Poisson'}];
    ex=`Avec remise, chaque tirage se fait dans la même urne : essais identiques et indépendants. p = ${g}/${g+l} (rouges ÷ total), n = ${n} tirages : X ~ B(${n} ; ${g}/${g+l}).`}
  else if(v===3){const m=pick([.5,1.5,2,3,4]),t=pick([2,3,4,5,10]);pr=`Un standard téléphonique reçoit en moyenne ${num(m)} appel${m>1?'s':''} par minute, au hasard et indépendamment. X est le nombre d’appels reçus en ${t} minutes.`;
    opts=[{h:`P(${num(m*t)})`,ok:true},{h:`P(${num(m)})`,tag:'s1bp-lambda'},{h:`P(${num(m+t)})`,tag:'s1bp-lambda'},{h:'Ni binomiale, ni Poisson'}];
    ex=`Des événements rares, indépendants, sans nombre d’essais fixé : loi de Poisson. Le paramètre est le nombre moyen sur la période : λ = ${num(m)} × ${t} = ${num(m*t)}.`}
  else if(v===4){const n=pick([2,3]),T=pick([5,6,7]),g=R(2,T-2);pr=`Une urne contient ${T} boules dont ${g} rouges. On tire <b>simultanément</b> ${n} boules (donc sans remise). X compte les boules rouges tirées.`;
    opts=[{h:'Ni binomiale, ni Poisson',ok:true},{h:`B(${n} ; ${g}/${T})`,tag:'proba-indep'},{h:`P(${num(+(n*g/T).toFixed(2))})`,tag:'binom-law'}];
    ex=`Sans remise dans une si petite urne, la composition change à chaque tirage : les essais ne sont ni identiques ni indépendants. La loi exacte est hypergéométrique, pas binomiale.`}
  else{const c=pick([['un dé jusqu’à obtenir un 6','1/6',6],['une pièce jusqu’à obtenir « pile »','1/2',2]]);pr=`On lance ${c[0]}. X est le nombre de lancers effectués.`;
    opts=[{h:'Ni binomiale, ni Poisson',ok:true},{h:`B(${c[2]} ; ${c[1]})`,tag:'binom-law'},{h:`P(${c[2]})`,tag:'binom-law'}];
    ex='Le nombre d’essais n’est pas fixé à l’avance et X ne compte pas des succès : c’est un temps d’attente (loi géométrique), ni binomiale ni Poisson.'}
  return mcq('Quelle loi suit X ?',stx(pr),opts,ex,'Binomiale : nombre d’essais fixé, essais identiques et indépendants, X compte les succès. Poisson : événements rares comptés sur une période.')};

/* 2. Reconnaître une loi binomiale à sa forme */
const gS1BpForme=()=>{const n=pick([10,12,15]),ps=[.1,.3,.5,.7,.9],p=pick(ps),oth=shuffle(ps.filter(x=>Math.abs(x-p)>=.35)).slice(0,2);
  return mcq('Quelle loi ce diagramme représente-t-il ?',S1BP_bars(k=>sBinP(n,p,k),n)+S1BP_leg(`Diagramme en bâtons de P(X = k) pour k = 0 à ${n}.`),
    [{h:`B(${n} ; ${num(p)})`,ok:true},...oth.map(q=>({h:`B(${n} ; ${num(q)})`,tag:'binom-law'}))],
    `Le sommet d’une loi binomiale se trouve près de son espérance np. Ici le sommet est vers ${num(+(n*p).toFixed(1))} = ${n} × ${num(p)}${p===.5?' et le diagramme est symétrique':''}.`,
    'Repère où se trouve le sommet : il est près de np.')};

/* 3. Placer l’espérance (point à placer) */
const gS1BpEspPlace=()=>{let n,p;do{n=pick([4,5,6,8,10,12]);p=pick(S1BP_P)}while(!Number.isInteger(+(n*p*2).toFixed(6)));const E=+(n*p).toFixed(6);
  return pointQ({instr:'Place l’espérance E(X) sur l’axe.',prompt:stx(`X suit la loi binomiale B(${n} ; ${num(p)}).`)+S1BP_bars(k=>sBinP(n,p,k),n),nom:'E',
    x:[-.5,n+.5],y:[-.6,.6],snap:.5,tol:.24,cible:[E,0],fond:{ligne:true,pas:.5,etiq:1},
    explain:`E(X) = np = ${n} × ${num(p)} = ${num(E)}. Le point d’équilibre du diagramme est bien sous (ou près de) son sommet.`,
    hint:'Pour B(n ; p), E(X) = n × p.',diag:pt=>Math.abs(pt[0]-n*(1-p))<.3?'s1bp-param':null})};

/* 4. Espérance et variance */
const gS1BpEv=()=>{const n=pick([20,25,40,50,60,80,100,200,500]),p=pick([.02,.05,.1,.2,.25,.4,.5,.6,.8]),E=n*p,V=n*p*(1-p);
  const c=pick([['pièces','Chaque pièce est défectueuse','les pièces défectueuses'],['clients','Chaque client se déclare satisfait','les clients satisfaits'],['graines','Chaque graine germe','les graines qui germent']]);
  return nq({instr:'Calcule l’espérance et la variance de X.',prompt:stx(`On prend au hasard ${n} ${c[0]}, de façon indépendante. ${c[1]} avec la probabilité ${num(p)}. X compte ${c[2]}.`),
    labels:['E(X) =','V(X) ='],t:[E,V],dp:2,
    explain:`X ~ B(${n} ; ${num(p)}). E(X) = np = ${num(+E.toFixed(4))} et V(X) = np(1 − p) = ${num(+E.toFixed(4))} × ${num(+(1-p).toFixed(2))} = ${num(+V.toFixed(4))} (écart-type ≈ ${dec(Math.sqrt(V),2)}).`,
    hint:'Binomiale : E = np et V = np(1 − p).',diag:([e,v])=>near(v,E,.011)||near(v,Math.sqrt(V),.011)?'s1bp-var':near(e,n*(1-p),.011)?'s1bp-param':null})};

/* 5. P(X = k) avec le diagramme */
const gS1BpPk=()=>{const n=R(4,10),p=pick(S1BP_P),k=R(0,n),t=sBinP(n,p,k);
  return nq({instr:`Calcule P(X = ${k}), le bâton orange.`,prompt:stx(`X suit la loi binomiale B(${n} ; ${num(p)}).`)+S1BP_bars(j=>sBinP(n,p,j),n,{hl:j=>j===k}),
    labels:[`P(X = ${k}) =`],t:[t],dp:3,
    explain:`P(X = ${k}) = C(${n} ; ${k}) × ${num(p)}<sup>${k}</sup> × ${num(+(1-p).toFixed(2))}<sup>${n-k}</sup> = ${Cnk(n,k)} × ${S1BP_sci(p**k)} × ${S1BP_sci((1-p)**(n-k))} ≈ ${dec(t,4)}.`,
    hint:'P(X = k) = C(n ; k) × p^k × (1 − p)^(n − k).',
    diag:([u])=>near(u,p**k*(1-p)**(n-k),.0011)&&Cnk(n,k)>1?'binom-coef':near(u,Cnk(n,k)*p**(n-k)*(1-p)**k,.0011)?'binom-coef':null})};

/* 6. Probabilités cumulées */
const gS1BpCumul=()=>{const n=R(4,8),p=pick(S1BP_P),v=R(0,2),k=R(1,n-1),P=j=>sBinP(n,p,j),S=(a,b)=>{let s=0;for(let j=a;j<=b;j++)s+=P(j);return s};
  let ev,t,hl,ex,bad;
  if(v===0){ev=`P(X ≤ ${k})`;t=S(0,k);hl=j=>j<=k;bad=S(0,k-1);ex=`P(X ≤ ${k}) = P(X = 0) + … + P(X = ${k}) ≈ ${dec(t,4)}.`}
  else if(v===1){ev=`P(X ≥ ${k})`;t=S(k,n);hl=j=>j>=k;bad=1-S(0,k);ex=`Le contraire de X ≥ ${k} est X ≤ ${k-1} : P(X ≥ ${k}) = 1 − P(X ≤ ${k-1}) ≈ 1 − ${dec(S(0,k-1),4)} ≈ ${dec(t,4)}.`}
  else{ev='P(X ≥ 1)';t=1-(1-p)**n;hl=j=>j>=1;bad=p**n;ex=`« Au moins un succès » a pour contraire « aucun » : P(X ≥ 1) = 1 − (1 − p)<sup>${n}</sup> = 1 − ${num(+(1-p).toFixed(2))}<sup>${n}</sup> ≈ ${dec(t,4)}.`}
  return nq({instr:`Calcule ${ev} (somme des bâtons orange).`,prompt:stx(`X suit la loi binomiale B(${n} ; ${num(p)}).`)+S1BP_bars(P,n,{hl}),labels:[`${ev} =`],t:[t],dp:3,
    explain:ex,hint:'Additionne les bâtons concernés, ou passe par l’événement contraire.',diag:([u])=>near(u,bad,.0011)?'proba-compl':null})};

/* 7. Loi de Poisson */
const gS1BpPoi=()=>{const L=pick([.5,1,1.5,2,2.5,3,4,5]),v=R(0,2),k=R(v===2?1:0,Math.min(5,Math.ceil(L+2))),P=j=>sPoiP(L,j),K=Math.max(8,Math.ceil(L+4*Math.sqrt(L)+1));
  const c=pick([['pannes par semaine','pannes cette semaine'],['clients par quart d’heure','clients dans le quart d’heure'],['fautes par page','fautes sur une page']]);
  let ev,t,hl,ex,bad;
  if(v===0){ev=`P(X = ${k})`;t=P(k);hl=j=>j===k;bad=L**k/fact(k);ex=`P(X = ${k}) = e<sup>−${num(L)}</sup> × ${num(L)}<sup>${k}</sup> / ${k}! ≈ ${dec(Math.exp(-L),4)} × ${dec(L**k/fact(k),4)} ≈ ${dec(t,4)}.`}
  else if(v===1){ev=`P(X ≤ ${k})`;t=0;for(let j=0;j<=k;j++)t+=P(j);hl=j=>j<=k;bad=t-P(k);ex=`P(X ≤ ${k}) = ${[...Array(k+1).keys()].map(j=>`P(X = ${j})`).join(' + ')} ≈ ${[...Array(k+1).keys()].map(j=>dec(P(j),4)).join(' + ')} ≈ ${dec(t,4)}.`}
  else{ev=`P(X ≥ ${k})`;let s=0;for(let j=0;j<k;j++)s+=P(j);t=1-s;hl=j=>j>=k;bad=1-s-P(k);ex=`Contraire : P(X ≥ ${k}) = 1 − P(X ≤ ${k-1}) ≈ 1 − ${dec(s,4)} ≈ ${dec(t,4)}.`}
  return nq({instr:`Calcule ${ev}.`,prompt:stx(`Le nombre X de ${c[1]} suit la loi de Poisson de paramètre λ = ${num(L)} (en moyenne ${num(L)} ${c[0]}).`)+S1BP_bars(P,K,{hl}),
    labels:[`${ev} =`],t:[t],dp:3,explain:ex,hint:'P(X = k) = e^(−λ) × λ^k / k!. Pour « au moins », passe par le contraire.',
    diag:([u])=>near(u,bad,.0011)?(v===0?'s1bp-poi':v===1?'calc':'proba-compl'):null})};

/* 8. Ajuster λ à la période observée */
const gS1BpLam=()=>{const c=pick([['appels','par minute','minutes',[.5,1,2],[2,3,4,5]],['voitures','par minute','minutes',[.2,.5,1],[3,5,10]],['clients','par heure','heures',[1,1.5,2],[2,3]],['défauts','par mètre de tissu','mètres',[.1,.2,.5],[5,10,4]]]);
  const r=pick(c[3]),d=pick(c[4]),L=+(r*d).toFixed(6);
  return nq({instr:'Donne λ, puis calcule P(X = 0).',prompt:stx(`On observe en moyenne ${num(r)} ${c[0]} ${c[1]}. X est le nombre de ${c[0]} sur ${d} ${c[2]} ; on admet que X suit une loi de Poisson.`),
    labels:['λ =','P(X = 0) ='],t:[L,Math.exp(-L)],dp:3,
    explain:`λ est le nombre moyen sur la période : ${num(r)} × ${d} = ${num(L)}. Puis P(X = 0) = e<sup>−λ</sup> = e<sup>−${num(L)}</sup> ≈ ${dec(Math.exp(-L),4)}.`,
    hint:'λ est proportionnel à la durée (ou à la longueur) observée ; P(X = 0) = e^(−λ).',diag:([l])=>near(l,r,.0011)||near(l,d,.0011)?'s1bp-lambda':null})};

/* 9. Approximation de Poisson (figure comparative) */
const gS1BpApprox=()=>{let n,p,L;do{n=pick([60,80,100,150,200,250,300,400,500]);L=pick([1,1.5,2,2.5,3,4,5]);p=L/n}while(p>.05||!Number.isFinite(+(p*1e4).toFixed(6))||Math.abs(p*1e4-Math.round(p*1e4))>1e-6);
  const v=R(0,1),k=R(v?1:0,Math.min(5,Math.ceil(L+1))),K=Math.max(8,Math.ceil(L+4*Math.sqrt(L)+1));
  let t=0,tb=0,ev;if(v===0){ev=`P(X = ${k})`;t=sPoiP(L,k);tb=sBinP(n,p,k)}else{ev=`P(X ≤ ${k})`;for(let j=0;j<=k;j++){t+=sPoiP(L,j);tb+=sBinP(n,p,j)}}
  return nq({instr:`Calcule ${ev} avec l’approximation de Poisson.`,prompt:stx(`Une machine produit ${num(+(p*100).toFixed(2))} % de pièces défectueuses. On prélève ${n} pièces au hasard ; X compte les pièces défectueuses, X ~ B(${n} ; ${num(p)}).`)+
    S1BP_bars(j=>sBinP(n,p,j),K,{P2:j=>sPoiP(L,j),hl:j=>v?j<=k:j===k})+S1BP_leg('Bâtons : binomiale exacte. Points : loi de Poisson de même espérance.'),
    labels:[`${ev} ≈`],t:[t],dp:3,
    explain:`n = ${n} ≥ 30, p = ${num(p)} ≤ 0,1 et np = ${num(L)} ≤ 15 : on approche X par la loi de Poisson P(${num(L)}), λ = np. ${ev} ≈ ${dec(t,4)} (valeur exacte binomiale ≈ ${dec(tb,4)}).`,
    hint:'λ = np, puis formule de Poisson P(X = k) = e^(−λ) λ^k / k!.',diag:([u])=>near(u,sPoiP(n,k),.0011)||near(u,sPoiP(p,k),.0011)?'s1bp-lambda':null})};

/* 10. Raisonner : contrôle qualité avec une loi binomiale */
const gS1BpR1=()=>{const n=R(5,10),p=pick([.05,.1,.15,.2,.25]),q=+(1-p).toFixed(2),atl=Math.random()<.5;
  const B=(nn,pp,a,b)=>{let s=0;for(let j=a;j<=b;j++)s+=sBinP(nn,pp,j);return s};
  const strat={ok:atl?nn=>pp=>1-B(nn,pp,0,1):nn=>pp=>B(nn,pp,0,1),a:nn=>pp=>atl?1-B(nn,pp,0,2):sBinP(nn,pp,1),b:nn=>pp=>atl?1-sBinP(nn,pp,0):1-sBinP(nn,pp,0),c:nn=>pp=>atl?sBinP(nn,pp,2):B(nn,pp,0,2)};
  const ev=atl?'au moins 2 pièces défectueuses':'au plus 1 pièce défectueuse';
  const st=atl?[['1 − P(X ≤ 1) = 1 − P(X = 0) − P(X = 1)','ok'],['1 − P(X ≤ 2)','a','Le contraire de « X ≥ 2 » est « X ≤ 1 » : la valeur 2 fait partie de l’événement cherché.'],['1 − P(X = 0)','b','1 − P(X = 0) = P(X ≥ 1) : le cas d’une seule pièce défectueuse est compté à tort.'],['P(X = 2)','c','« Au moins 2 » contient aussi 3, 4… pièces défectueuses.']]
    :[['P(X = 0) + P(X = 1)','ok'],['P(X = 1)','a','« Au plus 1 » contient aussi le cas « aucune pièce défectueuse ».'],['1 − P(X = 0)','b','1 − P(X = 0) = P(X ≥ 1), « au moins 1 » : c’est presque le contraire de ce qu’on cherche.'],['P(X = 0) + P(X = 1) + P(X = 2)','c','Cette somme vaut P(X ≤ 2) : la valeur 2 est en trop.']];
  return chain({instr:'Construis le raisonnement étape par étape.',
    prompt:stx(`Une chaîne produit des pièces dont ${num(p*100)} % sont défectueuses, indépendamment les unes des autres. On contrôle ${n} pièces ; X est le nombre de pièces défectueuses. On cherche la probabilité d’avoir ${ev}.`),
    steps:[
      {q:'Pourquoi X suit-elle une loi binomiale ?',o:[
        {h:`${n} contrôles identiques et indépendants, deux issues, et X compte les pièces défectueuses`,ok:true},
        {h:'Il y a deux issues possibles pour chaque pièce, cela suffit',why:'Deux issues ne suffisent pas : il faut aussi des essais identiques, indépendants, en nombre fixé.',tag:'binom-law'},
        {h:'Les pièces défectueuses sont rares, donc c’est une loi binomiale',why:'La rareté fait penser à Poisson ; la binomiale se justifie par la répétition d’essais identiques et indépendants.',tag:'binom-law'},
        {h:`Toutes les valeurs de 0 à ${n} sont équiprobables`,why:'Ce serait une loi uniforme ; une binomiale n’est pas uniforme.',tag:'binom-law'}]},
      {q:'Avec quels paramètres ?',o:[
        {h:`B(${n} ; ${num(p)})`,ok:true,n,p},
        {h:`B(${n} ; ${num(q)})`,why:`Le succès compté est « pièce défectueuse », de probabilité ${num(p)}, pas ${num(q)}.`,tag:'s1bp-param',n,p:q},
        {h:`B(${n} ; ${num(p*100)})`,why:'p est une probabilité, entre 0 et 1 : 5 % s’écrit 0,05.',tag:'s1bp-param',n,p:null},
        {h:`B(100 ; ${num(p)})`,why:`n est le nombre de pièces contrôlées (${n}), pas le 100 du pourcentage.`,tag:'s1bp-param',n:100,p}]},
      {q:`Quelle expression donne la probabilité d’avoir ${ev} ?`,o:st.map(([h,c,why])=>c==='ok'?{h:mx(h),ok:true,c}:{h:mx(h),c,why,tag:'proba-compl'})},
      {q:'Donc cette probabilité vaut environ…',o:prev=>{const{n:nn,p:pp}=prev[1],c=prev[2].c;
        if(pp==null)return[{h:'Impossible : une probabilité ne peut pas dépasser 1',ok:true},{h:dec(strat.ok(n)(p),4),why:'C’est le bon résultat, mais il ne découle pas de tes paramètres : avec p > 1, la formule n’a pas de sens.'}];
        const val=strat[c](nn)(pp);
        return[{h:dec(val,4),ok:true},...['ok','a','b','c'].filter(x=>x!==c).map(x=>({h:dec(strat[x](nn)(pp),4),why:'Ce nombre correspond à une autre expression que celle choisie à l’étape précédente.',tag:'calc'}))].slice(0,4)}}],
    explain:`X ~ B(${n} ; ${num(p)}). ${atl?`P(X ≥ 2) = 1 − P(X = 0) − P(X = 1) = 1 − ${num(q)}<sup>${n}</sup> − ${n} × ${num(p)} × ${num(q)}<sup>${n-1}</sup>`:`P(X ≤ 1) = P(X = 0) + P(X = 1) = ${num(q)}<sup>${n}</sup> + ${n} × ${num(p)} × ${num(q)}<sup>${n-1}</sup>`} ≈ ${dec(strat.ok(n)(p),4)}.`,
    hint:'Justifie la loi, fixe n et p, traduis l’événement avec le bon « bord », puis calcule.'})};

/* 11. Raisonner : approcher une binomiale par une loi de Poisson */
const gS1BpR2=()=>{let n,p,L;do{n=pick([50,80,100,120,150,200,300,400,500]);L=pick([1,1.5,2,2.5,3,4]);p=L/n}while(p>.05||Math.abs(p*1e4-Math.round(p*1e4))>1e-6);
  const k=R(0,4),c=pick([['Un vaccin provoque une réaction allergique chez','personnes vaccinées','réactions allergiques'],['Un composant électronique est défectueux dans','composants livrés','composants défectueux'],['Une compagnie constate qu’un passager ne se présente pas à l’embarquement dans','passagers d’un vol','passagers absents']]);
  const fs={ok:l=>sPoiP(l,k),e:l=>l**k/fact(k),f:l=>Math.exp(-l)*l**k,z:l=>1-sPoiP(l,k)};
  return chain({instr:'Construis le raisonnement étape par étape.',
    prompt:stx(`${c[0]} ${num(+(p*100).toFixed(2))} % des cas. On considère ${n} ${c[1]}, indépendamment. X est le nombre de ${c[2]}. On cherche une valeur approchée de P(X = ${k}).`),
    steps:[
      {q:'Quelle est la loi exacte de X ?',o:[
        {h:`B(${n} ; ${num(p)})`,ok:true},
        {h:`B(${n} ; ${num(+(1-p).toFixed(4))})`,why:`Le succès compté est l’événement rare, de probabilité ${num(p)}.`,tag:'s1bp-param'},
        {h:`P(${num(p)})`,why:'Une loi de Poisson n’a pas pour paramètre une probabilité ; et la loi exacte, avec n essais fixés, est binomiale.',tag:'binom-law'}]},
      {q:'Pourquoi peut-on la remplacer par une loi de Poisson ?',o:[
        {h:`n = ${n} ≥ 30, p = ${num(p)} ≤ 0,1 et np = ${num(L)} ≤ 15`,ok:true},
        {h:`Parce que n = ${n} est grand, quelle que soit la valeur de p`,why:'Si p n’est pas petit, c’est la loi normale qui approche la binomiale, pas Poisson.',tag:'binom-law'},
        {h:`Parce que np = ${num(L)} est un petit nombre entier ou demi-entier`,why:'Ce n’est pas une condition : on demande n grand, p petit et np modéré.',tag:'binom-law'},
        {h:'Parce que p < 0,5',why:'p < 0,5 ne suffit pas : il faut p petit (≤ 0,1) avec n grand.',tag:'binom-law'}]},
      {q:'Quel paramètre λ choisir ?',o:[
        {h:`λ = np = ${num(L)}`,ok:true,L},
        {h:`λ = n = ${n}`,why:'λ est le nombre moyen d’événements : np, pas le nombre d’essais.',tag:'s1bp-lambda',L:n},
        {h:`λ = np(1 − p) ≈ ${dec(L*(1-p),3)}`,why:'On égale les espérances : λ = E(X) = np. np(1 − p) est la variance de la binomiale.',tag:'s1bp-lambda',L:L*(1-p)},
        {h:`λ = p = ${num(p)}`,why:'p est la probabilité sur un seul essai ; λ est le nombre moyen sur les n essais.',tag:'s1bp-lambda',L:p}]},
      {q:`P(X = ${k}) vaut alors environ…`,o:prev=>{const l=prev[2].L;return[
        {h:S1BP_f(fs.ok(l)),ok:true},
        {h:S1BP_f(fs.e(l)),why:'Il manque le facteur e^(−λ).',tag:'s1bp-poi'},
        {h:S1BP_f(fs.f(l)),why:`Il manque la division par ${k}!.`,tag:'s1bp-poi'},
        {h:S1BP_f(fs.z(l)),why:'Tu as calculé la probabilité de l’événement contraire.',tag:'proba-compl'}]}}],
    explain:`X ~ B(${n} ; ${num(p)}) ; n ≥ 30, p ≤ 0,1, np = ${num(L)} ≤ 15 donc X ≈ P(${num(L)}). P(X = ${k}) ≈ e<sup>−${num(L)}</sup> × ${num(L)}<sup>${k}</sup> / ${k}! ≈ ${dec(fs.ok(L),4)} (valeur exacte binomiale ≈ ${dec(sBinP(n,p,k),4)}).`,
    hint:'Loi exacte, conditions, paramètre λ = np, puis formule de Poisson.'})};

ANA_UNITS.push({id:'s1-binomiale-poisson',tr:'s1',name:'Binomiale et Poisson',sub:'Compter des succès, compter des événements rares',glyph:'B(n;p)',tone:'c',
  skills:[SKA('s1.bp.recon','Reconnaître la loi',gS1BpRecon,1),SKA('s1.bp.forme','Reconnaître une binomiale à sa forme',gS1BpForme,1),SKA('s1.bp.esp','Placer l’espérance np',gS1BpEspPlace,1),
    SKA('s1.bp.ev','Espérance et variance binomiales',gS1BpEv,1),SKA('s1.bp.lam','Ajuster λ à la période',gS1BpLam,1),SKA('s1.bp.pk','Calculer P(X = k)',gS1BpPk,2),
    SKA('s1.bp.cumul','Probabilités cumulées',gS1BpCumul,2),SKA('s1.bp.poi','Probabilités de Poisson',gS1BpPoi,2),SKA('s1.bp.r1','Raisonner : contrôle qualité',gS1BpR1,2),
    SKA('s1.bp.approx','Approximation de Poisson',gS1BpApprox,3),SKA('s1.bp.r2','Raisonner : approcher par Poisson',gS1BpR2,3)]});
