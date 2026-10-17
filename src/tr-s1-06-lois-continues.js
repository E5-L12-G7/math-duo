/* ===================== STA001 · Variables continues : densité ===================== */
Object.assign(ANA_ERR,{
  's1lc-dens':{label:'Densité',tip:'Une densité est positive et l’aire totale sous sa courbe vaut 1 ; une probabilité est une aire, pas une valeur de f.'},
  's1lc-lambda':{label:'Paramètre de la loi exponentielle',tip:'E(X) = 1/λ : λ est un taux (l’inverse d’une durée moyenne). P(X > t) = e^(−λt).'},
  's1lc-memo':{label:'Absence de mémoire',tip:'Sachant X > s, seule compte la durée supplémentaire : P(X > s + t sachant X > s) = P(X > t).'},
  's1lc-unif':{label:'Loi uniforme',tip:'Sur [a ; b] : P = longueur de l’intervalle ÷ (b − a), E = (a + b)/2, V = (b − a)²/12.'}});
const S1LC_st=r=>[.1,.2,.25,.5,1,2,5,10,20,25,50,100,200,250,500,1000,2000,5000].find(s=>r/s<=10)||10000;
/** Courbe d’une densité (ou d’une fonction de répartition) avec aire colorée entre o.aire[0] et o.aire[1] */
const S1LC_plot=(f,o)=>{const[x0,x1]=o.x,y1=o.y,g=gp({W:300,H:180,x0,x1,y0:-y1*.1,y1,pd:8,N:400}),xs=o.xs||S1LC_st(x1-x0),ys=o.ys||S1LC_st(y1);
  g.axes(xs,ys,o.xl||xs,o.yl||ys);
  if(o.aire)g.area(f,()=>0,o.aire[0],o.aire[1],'var(--t-c)',.45);
  g.fn(f,'var(--t-sq)',2.4);
  (o.v||[]).forEach(([x,l])=>{g.seg(x,0,x,y1*.92,'var(--t-x)',1.4,'4 3');if(l)g.text(x,y1*.92,l,'var(--t-x)','middle',0,-3,10)});
  (o.h||[]).forEach(([y,l])=>{g.seg(x0,y,x1,y,'var(--t-x)',1.4,'4 3');if(l)g.text(x1,y,l,'var(--t-x)','end',-2,-4,10)});
  return`<div class="qfig">${g.done(o.titre||'Courbe de la densité')}</div>`};
const S1LC_u=(a,b)=>x=>x>=a&&x<=b?1/(b-a):0;

/* 1. Probabilité = aire d’un rectangle (loi uniforme) */
const gS1LcAire=()=>{const a=R(0,4)*5,L=pick([10,20,30,40]),b=a+L,c=a+R(0,L/2-1),d=R(c+1,b),t=(d-c)/L;
  return nq({instr:`Calcule P(${c} ≤ X ≤ ${d}), l’aire colorée.`,prompt:stx(`X suit la loi uniforme sur [${a} ; ${b}].`)+S1LC_plot(S1LC_u(a,b),{x:[a-2,b+2],y:1.4/L,aire:[c,d],v:[[c,String(c)],[d,String(d)]]}),
    labels:[`P(${c} ≤ X ≤ ${d}) =`],t:[t],dp:3,
    explain:`L’aire est un rectangle de largeur ${d} − ${c} = ${d-c} et de hauteur 1/${L} : P = ${d-c}/${L} ≈ ${dec(t,4)}.`,
    hint:'Aire d’un rectangle : largeur × hauteur, et la hauteur vaut 1/(b − a).',diag:([u])=>near(u,(d-c)/b,.0011)?'s1lc-unif':null})};

/* 2. Trouver la constante d’une densité */
const gS1LcDens=()=>{const v=R(0,2);
  if(v===0){const a=R(0,5),L=pick([2,4,5,8,10,20]);
    return nq({instr:'Trouve la valeur de k pour que f soit une densité.',prompt:stx(`f(x) = k sur [${a} ; ${a+L}] et f(x) = 0 ailleurs.`)+S1LC_plot(S1LC_u(a,a+L),{x:[a-1,a+L+1],y:1.4/L,yl:1e9,ys:1e9,h:[[1/L,'k']]}),
      labels:['k ='],t:[1/L],explain:`L’aire du rectangle vaut ${L} × k = 1, donc k = 1/${L}.`,hint:'L’aire totale sous une densité vaut 1.',diag:([u])=>near(u,L,1e-6)?'s1lc-dens':null})}
  const n=v,c=pick([1,2,3,4]),K=(n+1)/c**(n+1),f=x=>x>=0&&x<=c?K*x**n:0;
  return nq({instr:'Trouve la valeur de k pour que f soit une densité.',prompt:stx(`f(x) = k${mx(n===1?'x':'x²')} sur [0 ; ${c}] et f(x) = 0 ailleurs.`)+S1LC_plot(f,{x:[-.2,c+.4],y:K*c**n*1.2,yl:1e9,ys:1e9}),
    labels:['k ='],t:[K],
    explain:`∫ de 0 à ${c} de kx${n===1?'':'²'} dx = k × ${c}${n===1?'²/2':'³/3'} = k × ${n===1?num(c*c/2):num(c**3/3)} = 1, donc k = ${c===1?n+1:n===1?`2/${c*c}`:`3/${c**3}`}${Number.isInteger(K)||c===1?'':` ≈ ${dec(K,4)}`}.`,
    hint:`Écris « aire totale = 1 » : primitive de x${n===1?'':'²'} = x${n===1?'²/2':'³/3'}.`,diag:([u])=>near(u,1/c,1e-6)?'s1lc-dens':null})};

/* 3. Placer une médiane / un quantile (point à placer) */
const gS1LcQuant=()=>{const a=R(0,6),L=pick([4,6,8,10,12]),b=a+L,q=pick([.25,.5,.75]),x=a+q*L;
  return pointQ({instr:`Place le nombre m tel que P(X ≤ m) = ${num(q)}.`,prompt:stx(`X suit la loi uniforme sur [${a} ; ${b}].`)+S1LC_plot(S1LC_u(a,b),{x:[a-1,b+1],y:1.4/L}),nom:'m',
    x:[a-1,b+1],y:[-.6,.6],snap:.5,tol:.24,cible:[x,0],fond:{ligne:true,pas:.5,etiq:1},
    explain:`L’aire à gauche de m doit valoir ${num(q)} : (m − ${a})/${L} = ${num(q)}, donc m = ${a} + ${num(q)} × ${L} = ${num(x)}.`,
    hint:'Pour la loi uniforme, l’aire à gauche de m est proportionnelle à la longueur m − a.',diag:pt=>Math.abs(pt[0]-q*b)<.3?'s1lc-unif':null})};

/* 4. Loi uniforme en situation */
const gS1LcUnif=()=>{const c=pick([['Un bus passe toutes les {L} minutes ; tu arrives à l’arrêt au hasard. X est ton temps d’attente (en minutes).',0],['Un technicien doit passer entre 14 h et 15 h, à un instant pris au hasard. X est l’heure de passage en minutes après 14 h.',1]]);
  const L=c[1]?60:pick([10,12,15,20,30]),s=R(1,L/2),v=R(0,1);
  if(v===0)return nq({instr:`Calcule P(X > ${s}) et E(X).`,prompt:stx(c[0].replace('{L}',L)),labels:[`P(X > ${s}) =`,'E(X) ='],t:[(L-s)/L,L/2],dp:3,
    explain:`X ~ U([0 ; ${L}]). P(X > ${s}) = (${L} − ${s})/${L} ≈ ${dec((L-s)/L,4)} et E(X) = (0 + ${L})/2 = ${num(L/2)}.`,hint:'Longueur favorable ÷ longueur totale ; l’espérance est le milieu.',
    diag:([p])=>near(p,s/L,.0011)?'proba-compl':null});
  return nq({instr:'Calcule la variance et l’écart-type de X.',prompt:stx(c[0].replace('{L}',L)),labels:['V(X) =','σ(X) ='],t:[L*L/12,L/Math.sqrt(12)],dp:2,
    explain:`X ~ U([0 ; ${L}]) : V(X) = ${L}²/12 = ${dec(L*L/12,2)} et σ(X) = √V ≈ ${dec(L/Math.sqrt(12),2)}.`,hint:'V(X) = (b − a)²/12.',diag:([u])=>near(u,L*L/2,.011)||near(u,L*L/4,.011)?'s1lc-unif':null})};

/* 5. Fonction de répartition */
const gS1LcF=()=>{const c=pick([2,3,4,5]),a=+(R(0,c*2-2)/2).toFixed(1),b=+(R(a*2+1,c*2)/2).toFixed(1),F=x=>x<0?0:x>c?1:x*x/(c*c),t=F(b)-F(a);
  return nq({instr:`Calcule P(${num(a)} ≤ X ≤ ${num(b)}).`,prompt:stx(`La fonction de répartition de X est F(x) = x²/${c*c} pour 0 ≤ x ≤ ${c} (0 avant, 1 après).`)+
    S1LC_plot(F,{x:[-.3,c+.5],y:1.2,xs:.5,xl:1,ys:.25,yl:.5,v:[[a,num(a)],[b,num(b)]],titre:'Fonction de répartition'}),
    labels:['P ='],t:[t],dp:3,explain:`P(${num(a)} ≤ X ≤ ${num(b)}) = F(${num(b)}) − F(${num(a)}) = ${dec(F(b),4)} − ${dec(F(a),4)} ≈ ${dec(t,4)}.`,
    hint:'P(a ≤ X ≤ b) = F(b) − F(a) : une soustraction, sans intégrale.',diag:([u])=>near(u,F(b),.0011)||near(u,F(b)+F(a),.0011)?'s1lc-dens':null})};

/* 6. Espérance par intégrale */
const gS1LcEsp=()=>{const n=R(1,3),c=pick([1,2,3]),K=(n+1)/c**(n+1),E=(n+1)*c/(n+2),f=x=>x>=0&&x<=c?K*x**n:0,xn=['x','x²','x³'][n-1];
  const KF=new Fr(n+1,c**(n+1)),Kt=KF.d===1?String(KF.n):`(${KF.n}/${KF.d})`,Ef=new Fr((n+1)*c,n+2),Et=Ef.d===1?String(Ef.n):`${Ef.n}/${Ef.d}`;
  return nq({instr:'Calcule l’espérance de X (valeur exacte ou arrondie au millième).',prompt:stx(`X a pour densité f(x) = ${Kt}${mx(xn)} sur [0 ; ${c}] et 0 ailleurs.`)+S1LC_plot(f,{x:[-.2,c+.4],y:K*c**n*1.2,v:[[E,'E ?']]}),
    labels:['E(X) ='],t:[E],tol:.0006,
    explain:`E(X) = ∫ de 0 à ${c} de x × f(x) dx = ${Kt} × ∫ x${['²','³','⁴'][n-1]} dx = ${Kt} × ${c}${['³','⁴','⁵'][n-1]}/${n+2} = ${(n+1)*c}/${n+2}${Ef.d===n+2?'':` = ${Et}`}${Number.isInteger(E)?'':` ≈ ${dec(E,3)}`}.`,
    hint:'E(X) = ∫ x f(x) dx : multiplie f par x avant d’intégrer.',diag:([u])=>near(u,c/2,.0011)?'s1lc-dens':null})};

/* 7. Loi exponentielle : probabilités */
const gS1LcExp=()=>{const L=pick([.1,.2,.25,.5,.05,.02]),u=pick([1,2,4,5,10]),t1=u/(L*10),v=R(0,2),t2=t1*pick([2,3]);
  let ev,t,ar,ex,bad;
  if(v===0){ev=`P(X ≤ ${num(t1)})`;t=1-Math.exp(-L*t1);ar=[0,t1];bad=Math.exp(-L*t1);ex=`P(X ≤ ${num(t1)}) = 1 − e<sup>−${num(L)} × ${num(t1)}</sup> = 1 − e<sup>−${num(+(L*t1).toFixed(4))}</sup> ≈ ${dec(t,4)}.`}
  else if(v===1){ev=`P(X > ${num(t1)})`;t=Math.exp(-L*t1);ar=[t1,12/L];bad=1-t;ex=`P(X > ${num(t1)}) = e<sup>−${num(L)} × ${num(t1)}</sup> = e<sup>−${num(+(L*t1).toFixed(4))}</sup> ≈ ${dec(t,4)}.`}
  else{ev=`P(${num(t1)} ≤ X ≤ ${num(t2)})`;t=Math.exp(-L*t1)-Math.exp(-L*t2);ar=[t1,t2];bad=Math.exp(-L*t2)-Math.exp(-L*t1);ex=`P = F(${num(t2)}) − F(${num(t1)}) = e<sup>−${num(+(L*t1).toFixed(4))}</sup> − e<sup>−${num(+(L*t2).toFixed(4))}</sup> ≈ ${dec(t,4)}.`}
  return nq({instr:`Calcule ${ev}, l’aire colorée.`,prompt:stx(`La durée de vie X (en années) d’un appareil suit la loi exponentielle de paramètre λ = ${num(L)}.`)+S1LC_plot(x=>x<0?0:L*Math.exp(-L*x),{x:[-.3/L,6/L],y:L*1.2,aire:ar}),
    labels:[`${ev} =`],t:[t],dp:3,explain:ex,hint:'P(X ≤ t) = 1 − e^(−λt) et P(X > t) = e^(−λt).',diag:([w])=>near(w,bad,.0011)?'proba-compl':null})};

/* 8. Durée moyenne et paramètre */
const gS1LcMoy=()=>{const m=pick([2,4,5,8,10,20,50,100,200,500,1000,2000]),v=R(0,1);
  if(v===0)return nq({instr:'Calcule λ, puis la probabilité de dépasser la durée moyenne.',prompt:stx(`La durée de vie X (en heures) d’un composant suit une loi exponentielle ; sa durée de vie moyenne est ${num(m)} heures.`),
    labels:['λ =',`P(X > ${num(m)}) =`],t:[1/m,Math.exp(-1)],tol:.0006,
    explain:`E(X) = 1/λ donc λ = 1/${num(m)} = ${num(1/m)}. P(X > ${num(m)}) = e<sup>−${num(m)}λ</sup> = e<sup>−1</sup> ≈ 0,368, quelle que soit la moyenne !`,
    hint:'E(X) = 1/λ.',diag:([l])=>near(l,m,.01)?'s1lc-lambda':null});
  const L=1/m;return nq({instr:'Calcule l’espérance et l’écart-type de X.',prompt:stx(`X suit la loi exponentielle de paramètre λ = ${num(L)}.`),labels:['E(X) =','σ(X) ='],t:[m,m],tol:.0006,
    explain:`E(X) = 1/λ = ${num(m)} et V(X) = 1/λ², donc σ(X) = 1/λ = ${num(m)} : pour la loi exponentielle, l’écart-type égale la moyenne.`,hint:'E = 1/λ, V = 1/λ².',diag:([e])=>near(e,L,.0001)?'s1lc-lambda':null})};

/* 9. Absence de mémoire */
const gS1LcMem=()=>{const L=pick([.001,.002,.0025,.005,.01]),s=pick([100,200,300,500]),h=pick([100,200,400,500]),t=Math.exp(-L*h);
  return nq({instr:'Calcule cette probabilité conditionnelle.',prompt:stx(`La durée de vie X (en heures) d’un composant suit la loi exponentielle de paramètre λ = ${num(L)}. Il fonctionne déjà depuis ${s} heures. Quelle est la probabilité qu’il fonctionne encore au moins ${h} heures ?`)+
    S1LC_plot(x=>x<0?0:L*Math.exp(-L*x),{x:[-.3/L,4/L],y:L*1.2,aire:[s+h,10/L],v:[[s,String(s)],[s+h,String(s+h)]]}),
    labels:['P ='],t:[t],dp:3,
    explain:`On cherche P(X > ${s+h} sachant X > ${s}). Absence de mémoire : c’est P(X > ${h}) = e<sup>−${num(L)} × ${h}</sup> = e<sup>−${num(+(L*h).toFixed(4))}</sup> ≈ ${dec(t,4)}.`,
    hint:'La loi exponentielle n’a pas de mémoire : seules comptent les heures supplémentaires.',diag:([u])=>near(u,Math.exp(-L*(s+h)),.0011)?'s1lc-memo':null})};

/* 10. Médiane (demi-vie) */
const gS1LcMed=()=>{const L=pick([.1,.2,.25,.5,.05,.02,.01]),m=Math.log(2)/L;
  return nq({instr:'Calcule la médiane m de X (au centième).',prompt:stx(`X suit la loi exponentielle de paramètre λ = ${num(L)}. La médiane m vérifie P(X ≤ m) = 0,5.`)+
    S1LC_plot(x=>x<0?0:1-Math.exp(-L*x),{x:[-.3/L,5/L],y:1.2,ys:.25,yl:.5,h:[[.5,'0,5']],titre:'Fonction de répartition'}),
    labels:['m ='],t:[m],dp:2,explain:`1 − e<sup>−λm</sup> = 0,5 ⟺ e<sup>−λm</sup> = 0,5 ⟺ m = ln 2 / λ = ln 2 / ${num(L)} ≈ ${dec(m,2)}, plus petite que la moyenne 1/λ = ${num(1/L)}.`,
    hint:'Résous 1 − e^(−λm) = 0,5 avec le logarithme.',diag:([u])=>near(u,1/L,.011)?'s1lc-lambda':null})};

/* 11. Raisonner : densité kx, constante puis probabilité */
const gS1LcR1=()=>{const c=pick([2,3,4,5,6]),d=R(1,c-1);const P=k=>k*d*d/2;
  return chain({instr:'Construis le raisonnement étape par étape.',
    prompt:stx(`f(x) = kx sur [0 ; ${c}] et f(x) = 0 ailleurs. On veut que f soit la densité d’une variable X, puis calculer P(X ≤ ${d}).`)+S1LC_plot(x=>x>=0&&x<=c?2*x/(c*c):0,{x:[-.2,c+.5],y:2.4/c,yl:1e9,ys:1e9,aire:[0,d]}),
    steps:[
      {q:'Quelle condition détermine k ?',o:[
        {h:`L’aire totale sous la courbe vaut 1 : ∫ de 0 à ${c} de kx dx = 1`,ok:true,c:'aire'},
        {h:`La plus grande valeur de f vaut 1 : f(${c}) = 1`,why:'Une densité peut dépasser 1 : c’est l’aire qui vaut 1, pas la hauteur.',tag:'s1lc-dens',c:'max'},
        {h:'f doit être positive, ce qui suffit à trouver k',why:'La positivité impose seulement k ≥ 0 ; c’est la condition d’aire qui fixe k.',tag:'s1lc-dens',c:'pos'}]},
      {q:'Donc k vaut…',o:prev=>[
        {h:`k = 2/${c*c}`,ok:prev[0].c==='aire',k:2/(c*c),why:prev[0].c==='aire'?'':'Ce serait la bonne valeur avec la condition d’aire, mais pas avec la condition choisie.'},
        {h:`k = 1/${c}`,ok:prev[0].c==='max',k:1/c,why:prev[0].c==='max'?'':'k = 1/'+c+' rend f('+c+') = 1, mais l’aire vaut alors '+num(c/2)+'.',tag:'s1lc-dens'},
        {h:`k = 1/${c*c}`,ok:false,k:1/(c*c),why:`Primitive oubliée : ∫ kx dx = k × ${c}²/2, d’où k = 2/${c*c}.`,tag:'calc'},
        ...(prev[0].c==='pos'?[{h:'k n’est pas déterminé (tout k ≥ 0 convient)',ok:true,k:null}]:[])].map(o=>o.ok?o:{...o,ok:false})},
      {q:`P(X ≤ ${d}) se calcule par…`,o:[
        {h:`∫ de 0 à ${d} de kx dx = k × ${d}²/2`,ok:true,m:'int'},
        {h:`f(${d}) = k × ${d}`,why:'f(d) est une densité, pas une probabilité : il faut l’aire à gauche de d.',tag:'s1lc-dens',m:'f'},
        {h:`∫ de ${d} à ${c} de kx dx`,why:`C’est P(X ≥ ${d}), l’aire à droite.`,tag:'proba-compl',m:'right'}]},
      {q:'Résultat :',o:prev=>{const k=prev[1].k,m=prev[2].m;if(k==null)return[{h:'Impossible de conclure sans valeur de k',ok:true},{h:`${new Fr(d*d,c*c).n}/${new Fr(d*d,c*c).d}`,why:'Il fallait d’abord déterminer k grâce à l’aire totale.'}];
        const val=m==='int'?P(k):m==='f'?k*d:k*(c*c-d*d)/2,fmt=v=>dec(v,4);
        return[{h:fmt(val),ok:true},...[P(k),k*d,k*(c*c-d*d)/2].filter(x=>Math.abs(x-val)>1e-9).map(x=>({h:fmt(x),why:'Ce nombre ne correspond pas à la méthode choisie à l’étape précédente.',tag:'calc'}))]}}],
    explain:`Aire totale : k × ${c}²/2 = 1 donc k = 2/${c*c}. Puis P(X ≤ ${d}) = ∫ de 0 à ${d} de (2/${c*c}) x dx = ${d*d}/${c*c} ≈ ${dec(d*d/(c*c),4)}.`,
    hint:'Aire totale = 1 pour trouver k, puis aire à gauche de d.'})};

/* 12. Raisonner : durée de vie exponentielle et mémoire */
const gS1LcR2=()=>{const m=pick([4,5,8,10,20]),s=R(1,4),h=pick([2,3,5]),L=1/m;
  return chain({instr:'Construis le raisonnement étape par étape.',
    prompt:stx(`La durée de vie X (en années) d’un appareil suit une loi exponentielle de moyenne ${m} ans. Un appareil a déjà ${s} ans. Quelle est la probabilité qu’il fonctionne encore au moins ${h} ans ?`),
    steps:[
      {q:'Quel est le paramètre λ ?',o:[
        {h:`λ = 1/${m} = ${num(L)}`,ok:true,L},
        {h:`λ = ${m}`,why:'E(X) = 1/λ : λ est l’inverse de la durée moyenne.',tag:'s1lc-lambda',L:m},
        {h:`λ = 1/${m*m} = ${num(+(1/(m*m)).toFixed(4))}`,why:'C’est la variance 1/λ² qui ferait intervenir un carré, pas λ.',tag:'s1lc-lambda',L:1/(m*m)}]},
      {q:'Quel événement cherche-t-on ?',o:[
        {h:`X > ${s+h} sachant X > ${s}`,ok:true,c:'cond'},
        {h:`X > ${h}`,why:'C’est le résultat du calcul grâce à l’absence de mémoire, pas la traduction de l’énoncé : l’appareil a déjà '+s+' ans.',tag:'s1lc-memo',c:'h'},
        {h:`X > ${s+h}`,why:'On sait déjà que l’appareil a fonctionné '+s+' ans : la probabilité est conditionnelle.',tag:'proba-cond',c:'tot'},
        {h:`X ≤ ${s+h} sachant X > ${s}`,why:'« Fonctionne encore » signifie que la panne arrive après '+(s+h)+' ans.',tag:'proba-compl',c:'le'}]},
      {q:'On le calcule par…',o:prev=>{const c=prev[1].c;return[
        {h:c==='le'?`1 − P(X > ${h})`:`P(X > ${h})`,ok:c!=='tot',e:c==='le'?'1-h':'h',why:c==='tot'?'Avec l’événement choisi, il n’y a pas de condition : il faut calculer P(X > '+(s+h)+').':''},
        {h:`P(X > ${s+h})`,ok:c==='tot',e:'tot',why:'Absence de mémoire : on ne garde que la durée supplémentaire ('+h+' ans).',tag:'s1lc-memo'},
        {h:`P(X > ${s+h}) × P(X > ${s})`,e:'prod',why:'Une probabilité conditionnelle est un quotient, pas un produit : P(A ∩ B)/P(B).',tag:'proba-cond'}]}},
      {q:'Valeur arrondie :',o:prev=>{const l=prev[0].L,e=prev[2].e,V={h:Math.exp(-l*h),'1-h':1-Math.exp(-l*h),tot:Math.exp(-l*(s+h)),prod:Math.exp(-l*(s+h))*Math.exp(-l*s)},val=V[e];
        return[{h:dec(val,4),ok:true},...Object.entries(V).filter(([k,x])=>k!==e&&Math.abs(x-val)>5e-5).map(([,x])=>({h:dec(x,4),why:'Ce nombre ne correspond pas à l’expression choisie juste avant.',tag:'calc'}))].slice(0,4)}}],
    explain:`λ = 1/${m}. On cherche P(X > ${s+h} sachant X > ${s}) = P(X > ${h}) (absence de mémoire) = e<sup>−${h}/${m}</sup> ≈ ${dec(Math.exp(-h/m),4)}.`,
    hint:'λ = 1/moyenne ; traduis l’énoncé par une probabilité conditionnelle, puis utilise l’absence de mémoire.'})};

ANA_UNITS.push({id:'s1-lois-continues',tr:'s1',name:'Densité',sub:'Uniforme, exponentielle : la probabilité devient une aire',glyph:'∫f',tone:'x',
  skills:[SKA('s1.lc.aire','Probabilité = aire',gS1LcAire,1),SKA('s1.lc.dens','Constante d’une densité',gS1LcDens,1),SKA('s1.lc.quant','Placer une médiane, un quartile',gS1LcQuant,1),
    SKA('s1.lc.unif','Loi uniforme',gS1LcUnif,1),SKA('s1.lc.moy','Durée moyenne et λ',gS1LcMoy,1),SKA('s1.lc.f','Fonction de répartition',gS1LcF,2),
    SKA('s1.lc.exp','Loi exponentielle',gS1LcExp,2),SKA('s1.lc.esp','Espérance par intégrale',gS1LcEsp,2),SKA('s1.lc.r1','Raisonner : trouver k puis une probabilité',gS1LcR1,2),
    SKA('s1.lc.mem','Absence de mémoire',gS1LcMem,3),SKA('s1.lc.med','Médiane, demi-vie',gS1LcMed,3),SKA('s1.lc.r2','Raisonner : durée de vie sans mémoire',gS1LcR2,3)]});
