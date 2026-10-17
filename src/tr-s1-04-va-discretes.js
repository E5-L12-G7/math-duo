/* ===================== STA001 · Variables aléatoires discrètes ===================== */
Object.assign(ANA_ERR,{
  's1-loi':{label:'Loi de probabilité',tip:'Les probabilités d’une loi sont positives et leur somme vaut 1. P(X ≤ k) additionne toutes les valeurs inférieures ou égales à k.'},
  's1-rep':{label:'Fonction de répartition',tip:'F(x) = P(X ≤ x). Elle est en escalier : le saut en une valeur xᵢ vaut P(X = xᵢ).'},
  's1-mise':{label:'Gain net et mise',tip:'Le gain net retranche la mise de ce qu’on reçoit, dans tous les cas, y compris quand on perd.'}});
/** Loi aléatoire : k valeurs (xs donné ou entiers), probabilités multiples de 0,05 */
const s1VdLaw=(xs)=>{const k=xs.length,w=Array(k).fill(1);for(let i=0;i<20-k;i++)w[R(0,k-1)]++;const ps=w.map(v=>v/20);
  const E=sumA(xs.map((x,i)=>x*ps[i])),E2=sumA(xs.map((x,i)=>x*x*ps[i]));return{xs,ps,E,E2,V:E2-E*E}};
const s1P=v=>num(+v.toFixed(4));
const s1VdTab=L=>dtab([['xᵢ',...L.xs.map(num)],['P(X = xᵢ)',...L.ps.map(s1P)]]);
/** Graphe de la fonction de répartition en escalier (points pleins à gauche des paliers, creux à droite) */
const S1VD_F=(L,o={})=>{const xs=L.xs,lo=xs[0]-1,hi=xs[xs.length-1]+1,g=gp({W:300,H:200,x0:lo-.3,x1:hi+.3,y0:-.12,y1:1.12,pd:10});g.axes(1,.2,1,.2);
  let F=0;const pts=[[lo-.3,0]];xs.forEach((x,i)=>{g.seg(pts[pts.length-1][0],F,x,F,'var(--t-sq)',2.6);if(i||F)g.dot(x,F,'var(--t-sq)',4,true);F+=L.ps[i];g.dot(x,F,'var(--t-sq)',4);pts.push([x,F])});
  g.seg(xs[xs.length-1],1,hi+.3,1,'var(--t-sq)',2.6);
  return`<div class="qfig">${g.done('Fonction de répartition en escalier')}</div>`};

/* 1. Probabilité manquante */
const gS1VdLoi=()=>{const x0=R(-2,1),L=s1VdLaw(Array.from({length:R(4,5)},(_,i)=>x0+i)),i=R(0,L.xs.length-1),miss=L.ps[i];
  return nq({instr:'Trouve la probabilité manquante.',prompt:stx('Voici la loi de probabilité d’une variable aléatoire X, sous forme de diagramme en bâtons. Une probabilité est effacée.')+S1DE_bars(L.xs,L.ps,{hide:i,top:p=>s1P(p),yl:'P(X = xᵢ)'}),
    labels:[`P(X = ${num(L.xs[i])}) =`],t:[miss],dp:2,
    explain:`La somme des probabilités d’une loi vaut 1 : P(X = ${num(L.xs[i])}) = 1 − (${L.ps.filter((_,j)=>j!==i).map(s1P).join(' + ')}) = ${s1P(miss)}.`,
    hint:'Toutes les probabilités d’une loi ont pour somme 1.',diag:([v])=>near(v,1-miss)||near(v,sumA(L.ps.filter((_,j)=>j!==i)))?'s1-loi':null})};
/* 2. Lire une probabilité sur le diagramme */
const gS1VdLire=()=>{const L=s1VdLaw([0,1,2,3,4,5]),k=R(1,4),v=R(0,3),ps=L.ps;
  const T=[[`P(X ≤ ${k})`,sumA(ps.slice(0,k+1))],[`P(X &lt; ${k})`,sumA(ps.slice(0,k))],[`P(X ≥ ${k})`,sumA(ps.slice(k))],[`P(X &gt; ${k})`,sumA(ps.slice(k+1))]][v];
  return nq({instr:'Calcule la probabilité.',prompt:stx('X est le nombre de clients servis en une minute à un guichet. Sa loi est représentée ci-dessous.')+S1DE_bars(L.xs,ps,{top:p=>s1P(p),yl:'P(X = k)'})+mx(T[0]+' ?'),labels:[T[0].replace('&lt;','<').replace('&gt;','>')+' ='],t:[T[1]],dp:2,
    explain:`On additionne les bâtons concernés : ${T[0]} = ${s1P(T[1])}. ${v===1||v===3?'L’inégalité est stricte : la valeur '+k+' n’est pas comptée.':'L’inégalité est large : la valeur '+k+' est comptée.'}`,
    hint:'Repère les valeurs concernées (attention à < ou ≤), puis additionne leurs probabilités.',
    diag:([x])=>near(x,ps[k])||near(x,T[1]+ps[k])||near(x,T[1]-ps[k])?'s1-loi':null})};
/* 3. Placer un point de la fonction de répartition (pointQ) */
const gS1VdRep=()=>{const L=s1VdLaw([0,10,20,30,40,50].slice(0,R(4,6))),x0=pick([...L.xs,5,15,25,35].filter(x=>x<=L.xs[L.xs.length-1])),F=sumA(L.ps.filter((_,i)=>L.xs[i]<=x0))*100;
  return pointQ({instr:`Place le point de la courbe de F d’abscisse ${x0}, avec F en %.`,prompt:stx('X est le gain (en €) à un jeu. F(x) = P(X ≤ x), exprimée ici en pourcentage.')+s1VdTab(L),
    nom:'M',x:[-10,60],y:[-5,105],snap:5,tol:2.4,cible:[x0,Math.round(F)],fond:{pas:10,etiq:20},
    explain:`F(${x0}) = P(X ≤ ${x0}) = ${L.ps.filter((_,i)=>L.xs[i]<=x0).map(s1P).join(' + ')} = ${s1P(F/100)}, soit ${num(Math.round(F))} %. Le point est (${x0} ; ${num(Math.round(F))}).`,
    hint:'Additionne les probabilités de toutes les valeurs inférieures ou égales à x (entre deux valeurs, F reste constante).'})};
/* 4. Espérance */
const gS1VdEsp=()=>{const x0=R(-3,2),st=pick([1,1,2]),L=s1VdLaw(Array.from({length:R(4,5)},(_,i)=>x0+i*st));
  return nq({instr:'Calcule l’espérance E(X).',prompt:stx('Loi de probabilité de X :')+S1DE_bars(L.xs,L.ps,{top:p=>s1P(p),yl:'P(X = xᵢ)'}),labels:['E(X) ='],t:[L.E],dp:2,
    explain:`E(X) = Σ xᵢ P(X = xᵢ) = ${L.xs.map((x,i)=>`${num(x)} × ${s1P(L.ps[i])}`).join(' + ')} = ${dec(L.E,2)}. C’est le « centre de gravité » du diagramme.`,
    hint:'Multiplie chaque valeur par sa probabilité, puis additionne.',diag:([v])=>near(v,meanA(L.xs))?'stat-weight':null})};
/* 5. Variance et écart-type */
const gS1VdVar=()=>{const x0=R(-2,2),st=pick([1,2]),L=s1VdLaw(Array.from({length:R(3,4)},(_,i)=>x0+i*st)),sd=Math.sqrt(L.V);
  return nq({instr:'Calcule la variance et l’écart-type de X.',prompt:s1VdTab(L),labels:['V(X) =','σ(X) ='],t:[L.V,sd],dp:2,
    explain:`E(X) = ${dec(L.E,4)}. E(X²) = Σ xᵢ² P(X = xᵢ) = ${dec(L.E2,4)}. V(X) = E(X²) − E(X)² ≈ ${dec(L.V,2)} et σ(X) = √V(X) ≈ ${dec(sd,2)}.`,
    hint:'Formule de König-Huygens : V(X) = E(X²) − E(X)².',diag:([v,s])=>near(v,L.E2)||near(v,L.E2-L.E)||near(s,L.V)?'stat-var':null})};
/* 6. Transformation affine */
const gS1VdLin=()=>{const m=R(-5,15),v=pick([1,4,9,16,25,2,5]),c=R(0,2);let a,b,ctx;
  if(c===0){a=pick([2,3,5,-2,-3]);b=nz(-10,10);ctx=`Y = ${num(a)}X ${b<0?'−':'+'} ${Math.abs(b)}`}
  else if(c===1){a=pick([10,20,50]);b=-pick([20,50,100]);ctx=`X est le nombre d’objets vendus dans la journée ; chaque objet rapporte ${a} € et les frais fixes sont de ${-b} €. Le bénéfice est Y = ${a}X − ${-b}`}
  else{a=-1;b=pick([10,20]);ctx=`X est le nombre de bonnes réponses à un QCM de ${b} questions ; Y = ${b} − X est le nombre d’erreurs`}
  return nq({instr:'Calcule E(Y) et σ(Y).',prompt:mx(`E(X) = ${num(m)} ; V(X) = ${v}`)+stx(ctx+'.'),labels:['E(Y) =','σ(Y) ='],t:[a*m+b,Math.abs(a)*Math.sqrt(v)],dp:2,
    explain:`E(Y) = a E(X) + b = ${num(a)} × ${num(m)} ${b<0?'−':'+'} ${Math.abs(b)} = ${num(a*m+b)}. V(Y) = a² V(X) = ${a*a} × ${v} = ${a*a*v}, donc σ(Y) = √${a*a*v} = |${num(a)}| × √${v} ≈ ${dec(Math.abs(a)*Math.sqrt(v),2)}.`,
    hint:'E(aX + b) = aE(X) + b ; V(aX + b) = a²V(X) ; σ(aX + b) = |a|σ(X).',
    diag:([u,w])=>near(w,Math.abs(a)*v)||near(w,a*a*v)||near(w,Math.abs(a)*Math.sqrt(v)+b)?'va-lin':near(w,a*Math.sqrt(v))&&a<0?'signe':null})};
/* 7. Loi de Bernoulli */
const gS1VdBern=()=>{const n=pick([4,5,8,10,20]),r=R(1,n-1),p=r/n,c=pick([['une urne de '+n+' boules dont '+r+' rouges','tirer une boule rouge'],['un lot de '+n+' pièces dont '+r+' défectueuses','tirer une pièce défectueuse']]);
  return nq({instr:'Donne l’espérance et la variance de X.',prompt:stx(`On tire au hasard un objet dans ${c[0]}. X vaut 1 si on réussit à ${c[1]}, 0 sinon.`)+S1DE_bars([0,1],[1-p,p],{top:()=>'',yl:'P(X = k)'}),labels:['E(X) =','V(X) ='],t:[p,p*(1-p)],dp:4,
    explain:`X suit la loi de Bernoulli de paramètre p = ${r}/${n} = ${num(p)}. E(X) = 0 × (1 − p) + 1 × p = p = ${num(p)} et V(X) = p(1 − p) = ${num(p)} × ${num(1-p)} = ${s1P(p*(1-p))}.`,
    hint:'Pour une loi de Bernoulli de paramètre p : E(X) = p et V(X) = p(1 − p).',diag:([u,w])=>near(w,p,.0001)||near(w,p*p,.0001)?'stat-var':near(u,1-p,.0001)?'calc':null})};
/* 8. Jeu équitable (roue) */
const gS1VdEqui=()=>{let k1,k2,g1,G,m;do{k1=R(2,4);k2=R(1,2);g1=pick([2,3,4,5]);G=R(5,40);m=(k1*g1+k2*G)/10}while(!Number.isInteger(m)||m<2||G<=m);
  return nq({instr:'Trouve le gain qui rend le jeu équitable.',prompt:stx(`Une roue a 10 secteurs égaux : ${k2} secteur(s) « gros lot », ${k1} secteurs rapportant ${g1} €, les autres ne rapportent rien. La partie coûte ${m} €. Quel montant G doit rapporter le gros lot pour que le jeu soit équitable (espérance du gain net nulle) ?`)+
      S1DE_pie(['Gros lot : G €',`${g1} €`,'0 €'],[k2,k1,10-k1-k2],{eff:false}),labels:['G (€) ='],t:[G],dp:2,
    explain:`Gain net X : G − ${m}, ${g1} − ${m} ou −${m}, de probabilités ${k2}/10, ${k1}/10 et ${10-k1-k2}/10. E(X) = (${k2}G + ${k1} × ${g1})/10 − ${m} = 0, donc ${k2}G = ${10*m} − ${k1*g1} = ${10*m-k1*g1} et G = ${G} €.`,
    hint:'Écris E(gain net) = Σ (gain reçu × probabilité) − mise, puis résous E = 0.',diag:([v])=>near(v,(10*m-k1*g1)/k2+m)||near(v,(m-k1*g1/10)*10/k2+m)?'s1-mise':null})};
/* 9. Lire la loi sur la fonction de répartition */
const gS1VdF=()=>{const L=s1VdLaw([0,1,2,3,4].slice(0,R(3,5))),i=R(0,L.xs.length-1),v=Math.random()<.65,Fi=sumA(L.ps.slice(0,i+1));
  return nq({instr:v?`Lis P(X = ${L.xs[i]}) sur le graphe de F.`:`Lis P(X > ${L.xs[i]}) sur le graphe de F.`,prompt:stx('Voici la fonction de répartition F(x) = P(X ≤ x) d’une variable aléatoire X à valeurs entières.')+S1VD_F(L),
    labels:[v?`P(X = ${L.xs[i]}) =`:`P(X > ${L.xs[i]}) =`],t:[v?L.ps[i]:1-Fi],dp:2,
    explain:v?`P(X = ${L.xs[i]}) est la hauteur du saut de F en ${L.xs[i]} : ${s1P(Fi)} − ${s1P(Fi-L.ps[i])} = ${s1P(L.ps[i])}.`:`P(X > ${L.xs[i]}) = 1 − P(X ≤ ${L.xs[i]}) = 1 − F(${L.xs[i]}) = 1 − ${s1P(Fi)} = ${s1P(1-Fi)}.`,
    hint:v?'La probabilité d’une valeur est la hauteur de la marche en cette valeur.':'P(X > k) = 1 − F(k).',diag:([x])=>near(x,Fi)||near(x,1-Fi+L.ps[i])?'s1-rep':null})};
/* 10. Raisonner : la loi d'un jeu de dé */
const gS1VdR1=()=>{const m=pick([1,2,3]),G=R(m+3,m+10),g=R(m+1,G-1),f=v=>dec(v,3);
  return chain({instr:'Étudie ce jeu, en construisant ton raisonnement.',prompt:stx(`On paie ${m} € pour lancer un dé équilibré. Si on obtient 6, on reçoit ${G} € ; si on obtient 5, on reçoit ${g} € ; sinon on ne reçoit rien. X est le gain net du joueur.`),
    steps:[
      {q:'Les valeurs possibles de X sont…',o:[{h:`${G-m} ; ${g-m} ; −${m}`,ok:true,v:[G-m,g-m,-m]},{h:`${G} ; ${g} ; 0`,v:[G,g,0],why:'Le gain net retranche la mise payée.',tag:'s1-mise'},
        {h:`${G-m} ; ${g-m} ; 0`,v:[G-m,g-m,0],why:'Quand on perd, on a quand même payé la mise : le gain net est négatif.',tag:'s1-mise'}]},
      {q:'Leurs probabilités respectives sont…',o:[{h:'1/6 ; 1/6 ; 4/6',ok:true,p:[1,1,4]},{h:'1/3 ; 1/3 ; 1/3',p:[2,2,2],why:'Les trois résultats ne sont pas équiprobables : « ni 5 ni 6 » regroupe 4 faces.',tag:'s1-loi'},
        {h:'1/6 ; 1/6 ; 1/6',p:[1,1,1],why:'La somme des probabilités doit valoir 1 : « ni 5 ni 6 » a 4 chances sur 6.',tag:'s1-loi'}]},
      {q:'L’espérance de X vaut…',o:prev=>{const v=prev[0].v,p=prev[1].p,E=sumA(v.map((x,i)=>x*p[i]))/6;
        return[{h:`E(X) = ${v.map((x,i)=>`${num(x)} × ${p[i]}/6`).join(' + ')} ≈ ${f(E)}`,ok:true,E},{h:`E(X) = (${v.map(num).join(' + ')}) ÷ 3 ≈ ${f(sumA(v)/3)}`,E:sumA(v)/3,why:'Chaque valeur doit être pondérée par sa probabilité.',tag:'stat-weight'},
          {h:`E(X) = (${v.map((x,i)=>`${num(x)} × ${p[i]}/6`).join(' + ')}) ÷ 3 ≈ ${f(E/3)}`,E:E/3,why:'Les probabilités jouent déjà le rôle de poids : on ne divise pas une seconde fois par le nombre de valeurs.',tag:'stat-weight'}]}},
      {q:'Le jeu est…',o:prev=>{const E=prev[2].E,s=Math.abs(E)<1e-9?0:E>0?1:-1;
        return[{h:'favorable au joueur (E > 0)',ok:s===1,why:s===1?'':'Le signe de l’espérance trouvée ne correspond pas.'},{h:'défavorable au joueur (E < 0)',ok:s===-1,why:s===-1?'':'Le signe de l’espérance trouvée ne correspond pas.'},
          {h:'équitable (E = 0)',ok:s===0,why:s===0?'':'L’espérance trouvée n’est pas nulle.'}]}}],
    explain:`X prend les valeurs ${G-m}, ${g-m} et −${m} avec les probabilités 1/6, 1/6 et 4/6. E(X) = (${G-m} + ${g-m} − ${4*m}) / 6 ≈ ${f((G+g-6*m)/6)} : le jeu est ${G+g-6*m>0?'favorable':G+g-6*m<0?'défavorable':'équitable'} au joueur.`})};
/* 11. Raisonner : transformation affine d'une variable aléatoire */
const gS1VdR2=()=>{const m=R(2,20),v=pick([4,9,16,25,36]),a=pick([-3,-2,2,3,4,-4]),b=nz(-12,12),f=x=>num(+x.toFixed(3));
  return chain({instr:'Calcule les caractéristiques de Y, en construisant ton raisonnement.',prompt:mx(`E(X) = ${m} ; V(X) = ${v} ; Y = ${num(a)}X ${b<0?'−':'+'} ${Math.abs(b)}`),
    steps:[
      {q:'E(Y) vaut…',o:[{h:`${num(a)} × ${m} ${b<0?'−':'+'} ${Math.abs(b)} = ${num(a*m+b)}`,ok:true},{h:`${num(a)} × ${m} = ${num(a*m)}`,why:'L’espérance est linéaire : la constante b s’ajoute aussi.',tag:'va-lin'},
        {h:`${m} ${b<0?'−':'+'} ${Math.abs(b)} = ${m+b}`,why:'Il faut aussi multiplier E(X) par a.',tag:'va-lin'}]},
      {q:'V(Y) vaut…',o:[{h:`(${num(a)})² × ${v} = ${a*a*v}`,ok:true,V:a*a*v},{h:`${num(a)} × ${v} = ${num(a*v)}`,V:a*v,why:'La variance est multipliée par a², car c’est une moyenne de carrés d’écarts.',tag:'va-lin'},
        {h:`(${num(a)})² × ${v} ${b<0?'−':'+'} ${Math.abs(b)} = ${a*a*v+b}`,V:a*a*v+b,why:'Ajouter une constante décale les valeurs sans changer la dispersion.',tag:'va-lin'}]},
      {q:'σ(Y) vaut donc…',o:prev=>{const V=prev[1].V;if(!(V>0))return[{h:'Impossible : la variance trouvée est négative ou nulle, il y a une erreur plus haut',ok:true},{h:`σ(Y) = ${f(Math.abs(a)*Math.sqrt(v))}`,why:'C’est la bonne valeur, mais elle ne découle pas de ta variance.'}];
        return[{h:`√${num(V)} ≈ ${f(Math.sqrt(V))}`,ok:true},...(a<0?[{h:`${num(a)} × √${v} = ${num(a*Math.sqrt(v))}`,why:'Un écart-type est toujours positif : σ(Y) = |a| σ(X).',tag:'va-lin'}]:[{h:`${num(a)} × ${v} = ${num(a*v)}`,why:'Il faut prendre la racine carrée de la variance.',tag:'stat-var'}]),
          {h:`${num(V)}`,why:'Il manque la racine carrée.',tag:'stat-var'}]}}],
    explain:`E(Y) = ${num(a)} × ${m} ${b<0?'−':'+'} ${Math.abs(b)} = ${num(a*m+b)}. V(Y) = a² V(X) = ${a*a*v}. σ(Y) = √${a*a*v} = |${num(a)}| × √${v} = ${num(Math.abs(a)*Math.sqrt(v))}.`})};

ANA_UNITS.push({id:'s1-va-discretes',tr:'s1',name:'Variables aléatoires discrètes',sub:'Loi, fonction de répartition, espérance, variance, Bernoulli',glyph:'E(X)',tone:'c',
  skills:[SKA('s1.vd.loi','Compléter une loi',gS1VdLoi,1),SKA('s1.vd.lire','Lire une loi',gS1VdLire,1),SKA('s1.vd.esp','Espérance',gS1VdEsp,1),SKA('s1.vd.bern','Loi de Bernoulli',gS1VdBern,1),
    SKA('s1.vd.rep','Placer un point de F',gS1VdRep,2),SKA('s1.vd.var','Variance et écart-type',gS1VdVar,2),SKA('s1.vd.lin','Transformation affine',gS1VdLin,2),SKA('s1.vd.equi','Jeu équitable',gS1VdEqui,2),
    SKA('s1.vd.r1','Raisonner : la loi d’un jeu',gS1VdR1,2),SKA('s1.vd.f','Lire la fonction de répartition',gS1VdF,3),SKA('s1.vd.r2','Raisonner : Y = aX + b',gS1VdR2,3)]});
