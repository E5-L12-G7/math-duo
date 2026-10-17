/* ===================== Parcours Statistiques ===================== */
const sumA=a=>a.reduce((t,x)=>t+x,0),meanA=a=>sumA(a)/a.length,sortA=a=>[...a].sort((x,y)=>x-y);
const varA=a=>{const m=meanA(a);return meanA(a.map(x=>(x-m)**2))};
const medA=a=>{const t=sortA(a),n=t.length;return n%2?t[(n-1)/2]:(t[n/2-1]+t[n/2])/2};
const q1A=a=>sortA(a)[Math.ceil(a.length/4)-1],q3A=a=>sortA(a)[Math.ceil(3*a.length/4)-1];
const dec=(v,d=2)=>num(+(+v).toFixed(d));
const serie=a=>`<span class="m">${a.map(num).join(' ; ')}</span>`;
const Cnk=(n,k)=>{if(k<0||k>n)return 0;let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return Math.round(r)};
const Ank=(n,k)=>{let r=1;for(let i=0;i<k;i++)r*=n-i;return r};
const fact=n=>n<=1?1:n*fact(n-1);
function erf(x){const t=1/(1+.3275911*Math.abs(x)),y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-x*x);return x>=0?y:-y}
const Phi=z=>.5*(1+erf(z/Math.SQRT2));
const dtab=rows=>`<div class="tscroll"><table class="dtab"><tbody>${rows.map(([h,...c])=>`<tr><th>${h}</th>${c.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const stx=t=>`<span class="stxt">${t}</span>`;
const RND={1:' Arrondis au dixième.',2:' Arrondis au centième.',3:' Arrondis au millième.',4:' Arrondis au dix-millième.'};
/* Question numérique vérifiée à une tolérance près (arrondi demandé) */
function nq(o){const tol=(o.tol??(o.dp?.5*10**-o.dp:0))+1e-9;
  const q=numQ(o.instr+(o.dp?RND[o.dp]:''),o.prompt,o.labels,
    vals=>vals.every((a,i)=>{const v=ev(a);return Number.isFinite(v)&&Math.abs(v-o.t[i])<=tol}),o.explain,o.hint,
    vals=>{const vs=vals.map(a=>ev(a));if(vs.every((v,i)=>Math.abs(v-o.t[i])<=Math.max(10*tol,.011)))return'arrondi';try{return o.diag?o.diag(vs):null}catch(e){return null}});
  q.ans=o.t.map(t=>o.dp!=null?String(+t.toFixed(o.dp)):t.toFixed(15));return q}
const near=(v,t,e=.011)=>Math.abs(v-t)<e;

/* --- Chapitre 1 : position --- */
const gStMean=()=>{const n=R(5,8),a=Array.from({length:n},()=>R(4,20)),m=meanA(a),dp=Number.isInteger(m)?0:2;
  return nq({instr:'Calcule la moyenne de la série.',prompt:serie(a),labels:['Moyenne ='],t:[m],dp,
    explain:`Somme des valeurs : ${sumA(a)}. Effectif : ${n}. Moyenne : ${sumA(a)} ÷ ${n} ${dp?'≈':'='} ${dec(m)}.`,
    hint:'Additionne toutes les valeurs, puis divise par le nombre de valeurs.',diag:([v])=>near(v,medA(a),1e-6)?'stat-median':null})};
const gStWMean=()=>{const k=R(3,4);let set=new Set;while(set.size<k)set.add(R(5,20));const vals=sortA([...set]),eff=vals.map(()=>R(1,9)),N=sumA(eff),S2=sumA(vals.map((v,i)=>v*eff[i])),m=S2/N;
  return nq({instr:'Calcule la moyenne de cette série.',prompt:dtab([['Valeur',...vals.map(num)],['Effectif',...eff.map(num)]]),labels:['Moyenne ='],t:[m],dp:Number.isInteger(m)?0:2,
    explain:`Moyenne pondérée : (${vals.map((v,i)=>`${eff[i]} × ${v}`).join(' + ')}) ÷ ${N} = ${S2} ÷ ${N} ≈ ${dec(m)}.`,
    hint:'Chaque valeur compte autant de fois que son effectif : Σ nᵢxᵢ ÷ N.',diag:([v])=>near(v,meanA(vals))?'stat-weight':null})};
const gStMed=()=>{const n=R(5,9),a=Array.from({length:n},()=>R(1,30)),me=medA(a);
  return nq({instr:'Détermine la médiane de la série.',prompt:serie(a),labels:['Médiane ='],t:[me],dp:Number.isInteger(me)?0:1,
    explain:`Série rangée : ${sortA(a).map(num).join(' ; ')}. ${n%2?`n = ${n} est impair : valeur de rang ${(n+1)/2}`:`n = ${n} est pair : moyenne des valeurs de rangs ${n/2} et ${n/2+1}`}, donc Me = ${dec(me,1)}.`,
    hint:'Range d’abord les valeurs dans l’ordre croissant.',
    diag:([v])=>{const u=n%2?a[(n-1)/2]:(a[n/2-1]+a[n/2])/2;return near(v,u,1e-6)||near(v,meanA(a))?'stat-median':null}})};
const gStFreq=()=>{const N=pick([20,25,40,50,80,120,150,200]),k=R(1,N-1),f=k/N*100,ctx=pick([['clients','ont noté le service 5 étoiles'],['pièces','sont défectueuses'],['réponses au sondage','sont « oui »'],['visiteurs','ont cliqué sur la publicité']]);
  return nq({instr:'Calcule la fréquence en pourcentage.',prompt:stx(`Sur ${N} ${ctx[0]}, ${k} ${ctx[1]}.`),labels:['f (en %) ='],t:[f],dp:Number.isInteger(f)?0:1,
    explain:`f = ${k} ÷ ${N} = ${dec(k/N,4)}, soit ${dec(f,1)} %.`,hint:'Fréquence = effectif ÷ effectif total, puis × 100 pour l’exprimer en pourcentage.',
    diag:([v])=>near(v,k/N,.0011)?'calc':null})};

/* --- Chapitre 2 : dispersion --- */
const gStRange=()=>{const n=R(6,9),a=Array.from({length:n},()=>R(1,60));
  return nq({instr:'Calcule l’étendue de la série.',prompt:serie(a),labels:['Étendue ='],t:[Math.max(...a)-Math.min(...a)],
    explain:`Étendue = max − min = ${Math.max(...a)} − ${Math.min(...a)} = ${Math.max(...a)-Math.min(...a)}.`,hint:'Étendue = plus grande valeur − plus petite valeur.'})};
const gStQuart=()=>{const n=R(8,13),a=Array.from({length:n},()=>R(1,40)),t=sortA(a),q1=q1A(a),q3=q3A(a),r1=Math.ceil(n/4),r3=Math.ceil(3*n/4);
  return nq({instr:'Détermine le premier et le troisième quartile.',prompt:serie(a),labels:['Q1 =','Q3 ='],t:[q1,q3],
    explain:`Série rangée : ${t.map(num).join(' ; ')}. n = ${n}. Q1 est la valeur de rang ⌈${n} ÷ 4⌉ = ${r1} : ${q1}. Q3 est la valeur de rang ⌈3 × ${n} ÷ 4⌉ = ${r3} : ${q3}.`,
    hint:'Range les valeurs. Q1 : rang n ÷ 4 arrondi à l’entier supérieur. Q3 : rang 3n ÷ 4 arrondi à l’entier supérieur.',
    diag:([u,v])=>{const lo=t.slice(0,Math.floor(n/2)),hi=t.slice(Math.ceil(n/2));return near(u,medA(lo),1e-6)||near(v,medA(hi),1e-6)||near(u,medA(a),1e-6)?'stat-quart':null}})};
const varPrompt=()=>{const n=R(4,6),a=Array.from({length:n},()=>R(1,12));return{n,a,m:meanA(a),V:varA(a),m2:meanA(a.map(x=>x*x))}};
const gStVar=()=>{const{n,a,m,V,m2}=varPrompt(),dp=Number.isInteger(V)?0:2;
  return nq({instr:'Calcule la variance de la série (en divisant par n).',prompt:serie(a),labels:['V ='],t:[V],dp,
    explain:`x̄ = ${dec(m)}. Moyenne des carrés : ${dec(m2)}. V = ${dec(m2)} − ${dec(m)}² ≈ ${dec(V)}.`,
    hint:'V = moyenne des carrés − carré de la moyenne, ou moyenne des (xᵢ − x̄)².',
    diag:([v])=>near(v,Math.sqrt(V))||near(v,V*n/(n-1))||near(v,m2)?'stat-var':null})};
const gStSd=()=>{const{a,m,V}=varPrompt(),sd=Math.sqrt(V);
  return nq({instr:'Calcule l’écart-type de la série (variance en divisant par n).',prompt:serie(a),labels:['σ ='],t:[sd],dp:2,
    explain:`x̄ = ${dec(m)}, V ≈ ${dec(V,4)}, donc σ = √V ≈ ${dec(sd)}.`,hint:'Calcule d’abord la variance, puis prends sa racine carrée.',
    diag:([v])=>near(v,V)?'stat-var':null})};
const gStSvar=()=>{const{n,a,m,V}=varPrompt(),s2=V*n/(n-1);
  return nq({instr:'Calcule la variance corrigée s² (en divisant par n − 1).',prompt:serie(a),labels:['s² ='],t:[s2],dp:2,
    explain:`Somme des carrés des écarts à x̄ = ${dec(m)} : ${dec(V*n,4)}. s² = ${dec(V*n,4)} ÷ ${n-1} ≈ ${dec(s2)}.`,
    hint:'s² = Σ(xᵢ − x̄)² ÷ (n − 1). C’est l’estimateur sans biais de la variance d’une population.',diag:([v])=>near(v,V)?'stat-var':null})};

/* --- Chapitre 3 : deux variables --- */
const lineStr=(a,b)=>mx(`ŷ = ${num(a)}x ${b<0?'−':'+'} ${num(Math.abs(b))}`);
const gStPred=()=>{const a=pick([-2.5,-1.5,-0.8,0.6,1.2,1.5,2.4,3.5]),b=R(-10,30),x=R(2,20),y=+(a*x+b).toFixed(2);
  if(Math.random()<.5)return nq({instr:'Utilise la droite d’ajustement pour prédire.',prompt:stx('Droite d’ajustement :')+lineStr(a,b)+stx(`Valeur prédite pour x = ${x} ?`),labels:['ŷ ='],t:[y],
    explain:`ŷ = ${num(a)} × ${x} ${b<0?'−':'+'} ${Math.abs(b)} = ${num(y)}.`,hint:'Remplace x par sa valeur dans l’équation de la droite.'});
  const yo=Math.round(y+R(-6,6)),e=+(yo-y).toFixed(2);
  return nq({instr:'Calcule le résidu de ce point.',prompt:stx('Droite d’ajustement :')+lineStr(a,b)+stx(`Point observé : x = ${x}, y = ${yo}.`),labels:['e ='],t:[e],
    explain:`ŷ = ${num(a)} × ${x} ${b<0?'−':'+'} ${Math.abs(b)} = ${num(y)}. Résidu e = y − ŷ = ${yo} − ${num(y)} = ${num(e)}.`,
    hint:'Résidu = valeur observée − valeur prédite.',diag:([v])=>near(v,-e)?'signe':null})};
const RINT=[[-0.97,1],[-0.88,1],[-0.55,2],[-0.42,2],[-0.12,3],[0.05,3],[0.21,3],[0.48,2],[0.66,2],[0.91,0],[0.99,0]];
const gStRint=()=>{const[r,c]=pick(RINT),L2=['Lien linéaire fort et croissant','Lien linéaire fort et décroissant','Lien linéaire moyen','Lien linéaire faible ou absent'];
  return mcq('Comment interpréter ce coefficient de corrélation ?',mx(`r = ${num(r)}`),L2.map((h,i)=>({h,ok:i===c,tag:'stat-2var'})),
    `|r| = ${num(Math.abs(r))}. Repères : |r| ≥ 0,8 lien fort, 0,4 ≤ |r| &lt; 0,8 lien moyen, |r| &lt; 0,4 lien faible. Le signe donne le sens : ${r<0?'décroissant':'croissant'}.`,
    'Le signe de r donne le sens du lien, sa valeur absolue sa force.',true)};
const gStCov=()=>{const n=R(4,5),x=Array.from({length:n},()=>R(0,10)),y=x.map(v=>v+R(-4,6)+R(0,4)),mx2=meanA(x),my=meanA(y),mxy=meanA(x.map((v,i)=>v*y[i])),cv=mxy-mx2*my;
  return nq({instr:'Calcule la covariance cov(x, y) (en divisant par n).',prompt:dtab([['x',...x.map(num)],['y',...y.map(num)]]),labels:['cov ='],t:[cv],dp:2,
    explain:`x̄ = ${dec(mx2)}, ȳ = ${dec(my)}. Moyenne des produits xy : ${dec(mxy)}. cov = ${dec(mxy)} − ${dec(mx2)} × ${dec(my)} ≈ ${dec(cv)}.`,
    hint:'cov(x, y) = moyenne des produits xᵢyᵢ − x̄ × ȳ.',diag:([v])=>near(v,mxy)||near(v,cv*n/(n-1))?'stat-2var':null})};
const gStReg=()=>{const xb=R(2,10),yb=R(5,40),vx=pick([2,2.5,4,5,8,10]),a=pick([-2,-1.5,-0.5,0.5,1.2,1.5,2,3]),cv=+(a*vx).toFixed(2),b=+(yb-a*xb).toFixed(2);
  return nq({instr:'Détermine la droite des moindres carrés ŷ = ax + b.',prompt:mx(`x̄ = ${xb} ; ȳ = ${yb} ; V(x) = ${num(vx)} ; cov(x, y) = ${num(cv)}`),labels:['a =','b ='],t:[a,b],dp:2,
    explain:`a = cov(x, y) ÷ V(x) = ${num(cv)} ÷ ${num(vx)} = ${num(a)}. b = ȳ − a x̄ = ${yb} − ${num(a)} × ${xb} = ${num(b)}.`,
    hint:'a = cov(x, y) ÷ V(x), puis la droite passe par le point moyen : b = ȳ − a x̄.',
    diag:([u,v])=>near(u,vx/cv)||near(u,cv)?'stat-2var':near(v,yb+a*xb)?'signe':null})};
const gStCorr=()=>{const r0=pick([-0.9,-0.75,-0.6,-0.3,0.2,0.45,0.7,0.85,0.95]),sx=pick([2,2.5,4,5,10]),sy=pick([1.5,3,6,8,12]),cv=+(r0*sx*sy).toFixed(2),r=cv/(sx*sy);
  return nq({instr:'Calcule le coefficient de corrélation linéaire r.',prompt:mx(`cov(x, y) = ${num(cv)} ; σ<sub>x</sub> = ${num(sx)} ; σ<sub>y</sub> = ${num(sy)}`),labels:['r ='],t:[r],dp:2,
    explain:`r = cov(x, y) ÷ (σₓ × σᵧ) = ${num(cv)} ÷ (${num(sx)} × ${num(sy)}) ≈ ${dec(r)}.`,hint:'r = cov(x, y) ÷ (σₓσᵧ). Il est toujours compris entre −1 et 1.',
    diag:([v])=>near(v,cv/(sx*sx))||near(v,cv/(sx+sy))?'stat-2var':null})};

/* --- Chapitre 4 : dénombrement --- */
const gCbFact=()=>{const n=R(4,8),ctx=pick(['ranger {n} livres différents sur une étagère','faire passer {n} candidats dans un ordre','asseoir {n} personnes sur {n} chaises alignées']);
  return nq({instr:'Combien de possibilités ?',prompt:stx(`De combien de façons peut-on ${ctx.replace(/\{n\}/g,n)} ?`),labels:['Nombre ='],t:[fact(n)],
    explain:`C’est une permutation : ${n}! = ${Array.from({length:n},(_,i)=>n-i).join(' × ')} = ${fact(n)}.`,hint:'Premier choix : n possibilités, puis n − 1, puis n − 2…',
    diag:([v])=>near(v,n*n)||near(v,2**n)?'comb-mult':null})};
const gCbMult=()=>{const e=R(2,6),p2=R(2,8),d=R(2,5);
  return nq({instr:'Combien de menus différents ?',prompt:stx(`Un restaurant propose ${e} entrées, ${p2} plats et ${d} desserts. Un menu comporte une entrée, un plat et un dessert.`),labels:['Menus ='],t:[e*p2*d],
    explain:`Principe multiplicatif : ${e} × ${p2} × ${d} = ${e*p2*d}.`,hint:'Pour des choix successifs, on multiplie les nombres de possibilités.',diag:([v])=>near(v,e+p2+d)?'comb-mult':null})};
const gCbPow=()=>{const[n,what]=pick([[10,'chiffres (0 à 9)'],[26,'lettres'],[2,'bits (0 ou 1)'],[4,'bases ADN (A, C, G, T)']]),k=n===2?R(4,10):n===26?R(2,3):R(3,5);
  return nq({instr:'Combien de codes différents ?',prompt:stx(`Un code est formé de ${k} ${what}, les répétitions étant autorisées.`),labels:['Codes ='],t:[n**k],
    explain:`Chaque position a ${n} possibilités : ${n}<sup>${k}</sup> = ${n**k}.`,hint:'Avec répétition, chaque position offre le même nombre de choix : nᵏ.',
    diag:([v])=>near(v,Ank(n,k))?'comb-rep':near(v,n*k)?'comb-mult':null})};
const gCbArr=()=>{const n=R(5,12),k=R(2,4),ctx=pick([`Une course réunit ${n} coureurs. Combien de podiums (1er, 2e${k>2?', 3e':''}${k>3?', 4e':''}) différents ?`,`Un club de ${n} membres élit un bureau de ${k} postes différents (président, trésorier${k>2?', secrétaire':''}${k>3?', vice-président':''}). Combien de bureaux possibles ?`]);
  return nq({instr:'Compte en tenant compte de l’ordre.',prompt:stx(ctx),labels:['Nombre ='],t:[Ank(n,k)],
    explain:`L’ordre compte et sans répétition : arrangement A(${n} ; ${k}) = ${Array.from({length:k},(_,i)=>n-i).join(' × ')} = ${Ank(n,k)}.`,
    hint:'Ordre important, pas de répétition : n × (n − 1) × … (k facteurs).',diag:([v])=>near(v,Cnk(n,k))?'comb-order':near(v,n**k)?'comb-rep':null})};
const gCbComb=()=>{const n=R(5,15),k=R(2,4),ctx=pick([`Combien d’équipes de ${k} personnes peut-on former avec ${n} personnes ?`,`On choisit ${k} articles parmi ${n} pour une revue. Combien de sélections possibles ?`,`Combien de mains de ${k} cartes peut-on tirer d’un paquet de ${n} cartes ?`]);
  return nq({instr:'Compte sans tenir compte de l’ordre.',prompt:stx(ctx),labels:['Nombre ='],t:[Cnk(n,k)],
    explain:`L’ordre ne compte pas : C(${n} ; ${k}) = A(${n} ; ${k}) ÷ ${k}! = ${Ank(n,k)} ÷ ${fact(k)} = ${Cnk(n,k)}.`,
    hint:'Sans ordre : C(n ; k) = n! ÷ (k!(n − k)!).',diag:([v])=>near(v,Ank(n,k))?'comb-order':null})};

/* --- Chapitre 5 : probabilités --- */
const pp=v=>num(+v.toFixed(4));
const gPrCompl=()=>{if(Math.random()<.5){const p=R(1,19)*.05;
    return nq({instr:'Calcule la probabilité de l’événement contraire.',prompt:mx(`P(A) = ${pp(p)}`)+stx('Que vaut P(Ā) ?'),labels:['P(Ā) ='],t:[1-p],dp:2,
      explain:`P(Ā) = 1 − P(A) = 1 − ${pp(p)} = ${pp(1-p)}.`,hint:'P(Ā) = 1 − P(A).'})}
  const n=R(2,5),t=1-(5/6)**n;
  return nq({instr:'Calcule la probabilité.',prompt:stx(`On lance ${n} dés équilibrés. Quelle est la probabilité d’obtenir au moins un 6 ?`),labels:['P ='],t:[t],dp:3,
    explain:`Contraire : « aucun 6 », de probabilité (5/6)<sup>${n}</sup> ≈ ${dec((5/6)**n,4)}. Donc P = 1 − (5/6)<sup>${n}</sup> ≈ ${dec(t,3)}.`,
    hint:'« Au moins un » : calcule plutôt la probabilité du contraire, « aucun ».',diag:([v])=>near(v,n/6)||near(v,(5/6)**n)?'proba-compl':null})};
const gPrUnion=()=>{const a=R(4,14)*.05,b=R(4,14)*.05,lo=Math.max(0,a+b-1),hi=Math.min(a,b),ab=+(lo+R(0,Math.round((hi-lo)*20))*.05).toFixed(2);
  const u=a+b-ab;
  return nq({instr:'Calcule la probabilité de la réunion.',prompt:mx(`P(A) = ${pp(a)} ; P(B) = ${pp(b)} ; P(A ∩ B) = ${pp(ab)}`),labels:['P(A ∪ B) ='],t:[u],dp:2,
    explain:`P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = ${pp(a)} + ${pp(b)} − ${pp(ab)} = ${pp(u)}.`,hint:'On retire l’intersection, comptée deux fois.',diag:([v])=>near(v,a+b)?'proba-union':null})};
const gPrCond=()=>{const a=R(10,120),b=R(10,120),c=R(10,120),d=R(10,120),ctx=pick([['Abonné','Non abonné','A cliqué','N’a pas cliqué'],['Mobile','Ordinateur','A acheté','N’a pas acheté'],['Vacciné','Non vacciné','Malade','Pas malade']]);
  const t=a/(a+b);
  return nq({instr:`Calcule P(« ${ctx[2]} » sachant « ${ctx[0]} »).`,prompt:dtab([['',ctx[2],ctx[3]],[ctx[0],a,b],[ctx[1],c,d]]),labels:['P ='],t:[t],dp:3,
    explain:`On se restreint à la ligne « ${ctx[0]} » : ${a + b} individus, dont ${a} « ${ctx[2]} ». P = ${a} ÷ ${a+b} ≈ ${dec(t,3)}.`,
    hint:'Sachant A : on ne garde que les individus de A, puis on calcule la proportion qui vérifie B.',diag:([v])=>near(v,a/(a+b+c+d),.0011)||near(v,a/(a+c),.0011)?'proba-cond':null})};
const gPrIndep=()=>{const a=R(2,16)*.05,b=R(2,16)*.05,ind=Math.random()<.5,ab=ind?+(a*b).toFixed(4):+(a*b+pick([-1,1])*R(1,3)*.02).toFixed(4);
  const v=ab<=0?+(a*b).toFixed(4):ab,isI=Math.abs(v-a*b)<1e-9;
  return mcq('Les événements A et B sont-ils indépendants ?',mx(`P(A) = ${pp(a)} ; P(B) = ${pp(b)} ; P(A ∩ B) = ${pp(v)}`),[{h:'Oui, indépendants',ok:isI,tag:'proba-indep'},{h:'Non, pas indépendants',ok:!isI,tag:'proba-indep'}],
    `P(A) × P(B) = ${pp(a)} × ${pp(b)} = ${pp(a*b)}, ${isI?'égal':'différent de'} P(A ∩ B) = ${pp(v)} : ${isI?'indépendants':'pas indépendants'}.`,'Compare P(A ∩ B) avec P(A) × P(B).',true)};
const treeP=()=>{const a=R(2,12)*.05,b=R(12,19)*.05,c=R(1,6)*.05;return{a,b,c,pB:a*b+(1-a)*c}};
const treeTxt=({a,b,c})=>mx(`P(A) = ${pp(a)} ; P<sub>A</sub>(B) = ${pp(b)} ; P<sub>Ā</sub>(B) = ${pp(c)}`);
const gPrTotal=()=>{const T=treeP();
  return nq({instr:'Calcule P(B) avec la formule des probabilités totales.',prompt:treeTxt(T),labels:['P(B) ='],t:[T.pB],dp:3,
    explain:`P(B) = P(A)P<sub>A</sub>(B) + P(Ā)P<sub>Ā</sub>(B) = ${pp(T.a)} × ${pp(T.b)} + ${pp(1-T.a)} × ${pp(T.c)} = ${pp(T.pB)}.`,
    hint:'Additionne les probabilités des deux chemins de l’arbre qui mènent à B.',diag:([v])=>near(v,T.a*T.b,.0011)||near(v,T.b+T.c,.0011)?'proba-cond':null})};
const gPrBayes=()=>{const T=treeP(),t=T.a*T.b/T.pB;
  return nq({instr:'Calcule P<sub>B</sub>(A) avec la formule de Bayes.',prompt:treeTxt(T),labels:['P<sub>B</sub>(A) ='],t:[t],dp:3,
    explain:`P(B) = ${pp(T.pB)}. P<sub>B</sub>(A) = P(A ∩ B) ÷ P(B) = ${pp(T.a*T.b)} ÷ ${pp(T.pB)} ≈ ${dec(t,3)}.`,
    hint:'P_B(A) = P(A)P_A(B) ÷ P(B). Calcule d’abord P(B) avec l’arbre.',diag:([v])=>near(v,T.b,.0011)||near(v,T.a*T.b,.0011)?'proba-cond':null})};
