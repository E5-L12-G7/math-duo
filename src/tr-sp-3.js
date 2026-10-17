/* ===== Parcours Statistiques et probabilités (sp), partie 3 : lois discrètes, lois à densité, échantillonnage =====
   Sources : Y. Monka, « Lois discrètes », « Lois à densité », « Échantillonnage » (maths-et-tiques.fr).
   Préfixe des noms : gSp3… / SP3_… ; étiquettes d'erreur : sp3-… */
Object.assign(ANA_ERR,{
  'sp3-ordre':{label:'Ordre des issues oublié',tip:'« Une blanche et une rouge » regroupe deux chemins de l’arbre : (B ; R) et (R ; B).'},
  'sp3-unif':{label:'Loi uniforme',tip:'Discrète : E(X) = (n + 1)/2. Continue sur [a ; b] : P = longueur/(b − a), E = (a + b)/2, V = (b − a)²/12.'},
  'sp3-geo':{label:'Loi géométrique',tip:'P(X = k) = (1 − p)^(k − 1) × p : k − 1 échecs puis le succès. P(X > k) = (1 − p)^k et E(X) = 1/p.'},
  'sp3-memo':{label:'Absence de mémoire',tip:'Sachant X > s, seule compte la durée (ou le nombre d’essais) en plus : P_{X>s}(X > s + t) = P(X > t).'},
  'sp3-dens':{label:'Densité de probabilité',tip:'Une densité est continue, positive, et l’aire totale sous sa courbe vaut 1.'},
  'sp3-expo':{label:'Loi exponentielle',tip:'P(X ≤ t) = 1 − e^(−λt), P(X > t) = e^(−λt), E(X) = 1/λ.'},
  'sp3-cond':{label:'Conditions d’application',tip:'Il faut n ≥ 30, np ≥ 5 et n(1 − p) ≥ 5 (avec f à la place de p si p est inconnue).'},
  'sp3-if-ic':{label:'Fluctuation ou confiance',tip:'p connue ou supposée : fluctuation p ± 1,96√(p(1 − p)/n). p inconnue : confiance f ± 1/√n.'},
  'sp3-taille':{label:'Taille d’échantillon',tip:'Amplitude 2/√n ≤ a ⟺ n ≥ 4/a² ; on arrondit à l’entier supérieur.'}
});

/* ---------- outils ---------- */
const SP3_d=(v,d=3)=>dec(v,d);                         // nombre arrondi écrit à la française
const SP3_pw=(b,e)=>`${b}<sup>${e}</sup>`;               // puissance écrite
const SP3_ans=(q,a)=>{q.ans=a;return q};                 // réponse attendue écrite exactement (chaîne du moteur)
const SP3_P=[.1,.2,.25,.3,.4,.6,.75,.8];

/* =================== Chapitre 1 : lois discrètes =================== */
const gSp3Unif=()=>{const n=pick([4,6,8,10,12,20]),v=R(0,2),k=R(2,n-1);
  const ctx=`On lance un dé équilibré à ${n} faces numérotées de 1 à ${n}. X est le numéro obtenu.`;
  if(v===0)return nq({instr:'Calcule l’espérance de X.',prompt:stx(ctx),labels:['E(X) ='],t:[(n+1)/2],dp:1,
    explain:`X suit la loi uniforme sur {1, …, ${n}}, donc E(X) = (n + 1)/2 = ${n+1}/2 = ${num((n+1)/2)}.`,
    hint:'Pour la loi uniforme sur {1, …, n}, E(X) = (n + 1)/2.',diag:([u])=>near(u,n/2)?'sp3-unif':null});
  if(v===1)return nq({instr:`Calcule P(X ≤ ${k}).`,prompt:stx(ctx),labels:[`P(X ≤ ${k}) =`],t:[k/n],dp:3,
    explain:`Chaque face a la probabilité 1/${n}. Les faces 1 à ${k} sont ${k}, donc P(X ≤ ${k}) = ${k}/${n} ≈ ${SP3_d(k/n)}.`,
    hint:'Compte les valeurs favorables, chacune vaut 1/n.',diag:([u])=>near(u,(k-1)/n,.0011)||near(u,1/n,.0011)?'sp3-unif':null});
  return nq({instr:`Calcule P(X > ${k}).`,prompt:stx(ctx),labels:[`P(X > ${k}) =`],t:[(n-k)/n],dp:3,
    explain:`Les faces strictement supérieures à ${k} sont ${k+1}, …, ${n} : il y en a ${n-k}. P(X > ${k}) = ${n-k}/${n} ≈ ${SP3_d((n-k)/n)}.`,
    hint:'« Strictement supérieur » : la valeur elle-même n’est pas comptée.',diag:([u])=>near(u,(n-k+1)/n,.0011)?'sp3-unif':near(u,k/n,.0011)?'proba-compl':null})};

const gSp3Rep=()=>{const T=pick([4,5,8,10]),a=R(1,T-1),b=T-a,p=a/T,q=b/T,v=R(0,2);
  const pr=stx(`Une urne contient ${a} boule${a>1?'s':''} blanche${a>1?'s':''} et ${b} boule${b>1?'s':''} rouge${b>1?'s':''}. On tire une boule, on la remet, puis on tire une deuxième boule.`);
  if(v===0)return nq({instr:'Calcule la probabilité d’obtenir deux boules blanches.',prompt:pr,labels:['P ='],t:[p*p],dp:3,
    explain:`P(B) = ${a}/${T} = ${num(p)}. Les tirages sont indépendants (avec remise) : P(B ; B) = ${num(p)} × ${num(p)} = ${SP3_d(p*p,4)}.`,
    hint:'Avec remise, les tirages sont indépendants : on multiplie les probabilités le long du chemin.',diag:([u])=>near(u,2*p,.0011)?'calc':null});
  if(v===1)return nq({instr:'Calcule la probabilité d’obtenir une boule blanche et une boule rouge.',prompt:pr,labels:['P ='],t:[2*p*q],dp:3,
    explain:`Deux chemins : (B ; R) et (R ; B). P = ${num(p)} × ${num(q)} + ${num(q)} × ${num(p)} = ${SP3_d(2*p*q,4)}.`,
    hint:'Dessine l’arbre : combien de chemins donnent une blanche et une rouge ?',diag:([u])=>near(u,p*q,.0011)?'sp3-ordre':null});
  return nq({instr:'Calcule la probabilité d’obtenir au moins une boule blanche.',prompt:pr,labels:['P ='],t:[1-q*q],dp:3,
    explain:`Le contraire de « au moins une blanche » est « deux rouges », de probabilité ${num(q)}² = ${SP3_d(q*q,4)}. Donc P = 1 − ${SP3_d(q*q,4)} = ${SP3_d(1-q*q,4)}.`,
    hint:'Passe par l’événement contraire.',diag:([u])=>near(u,p*p,.0011)||near(u,2*p*q,.0011)?'proba-compl':null})};

const gSp3Bern=()=>{const c=pick([['On lance une pièce équilibrée ; succès : « pile ».',1,2],['On lance un dé équilibré ; succès : « obtenir 6 ».',1,6],['On lance un dé équilibré ; succès : « obtenir 5 ou 6 ».',1,3],['On tire une carte d’un jeu de 32 ; succès : « tirer un cœur ».',1,4],['Une pièce est défectueuse avec la probabilité 0,1 ; succès : « pièce défectueuse ».',1,10],['Un tireur atteint la cible avec la probabilité 0,7 ; succès : « cible atteinte ».',7,10]]);
  const p=c[1]/c[2],V=p*(1-p);
  return nq({instr:'X vaut 1 en cas de succès, 0 sinon. Calcule E(X) et V(X).',prompt:stx(c[0]),labels:['E(X) =','V(X) ='],t:[p,V],dp:3,
    explain:`X suit la loi de Bernoulli de paramètre p = ${c[1]}/${c[2]}. E(X) = p ≈ ${SP3_d(p)} et V(X) = p(1 − p) ≈ ${SP3_d(p)} × ${SP3_d(1-p)} ≈ ${SP3_d(V,4)}.`,
    hint:'Loi de Bernoulli : E(X) = p et V(X) = p(1 − p). Tu peux écrire une fraction.',diag:([u,w])=>near(w,p*p,.0011)||near(w,p,.0011)||near(w,Math.sqrt(V),.0011)?'stat-var':null})};

const gSp3Coef=()=>{const v=R(0,2);
  if(v===0){const n=R(12,40),k=pick([n-1,n-2]);const t=Cnk(n,k);
    return nq({instr:'Calcule ce coefficient binomial sans calculatrice.',prompt:mx(`C(${n} ; ${k})`),labels:['='],t:[t],
      explain:`Par symétrie, C(${n} ; ${k}) = C(${n} ; ${n-k})${n-k===1?` = ${n}`:` = ${n} × ${n-1}/2 = ${t}`} (${n-k===1?'1 succès parmi '+n+' : '+n+' chemins':'nombre de paires parmi '+n}).`,
      hint:'Symétrie : C(n ; k) = C(n ; n − k). Choisir les succès revient à choisir les échecs.',diag:([u])=>near(u,k,1e-6)||near(u,n*k,1e-6)?'binom-coef':null})}
  if(v===1){const n=R(6,14),k=R(1,n-2),a=Cnk(n,k),b=Cnk(n,k+1);
    return nq({instr:'Utilise la relation du triangle de Pascal.',prompt:mx(`C(${n} ; ${k}) = ${a} et C(${n} ; ${k+1}) = ${b}. Que vaut C(${n+1} ; ${k+1}) ?`),labels:[`C(${n+1} ; ${k+1}) =`],t:[a+b],
      explain:`Relation de Pascal : C(n ; k) + C(n ; k + 1) = C(n + 1 ; k + 1), donc C(${n+1} ; ${k+1}) = ${a} + ${b} = ${a+b}.`,
      hint:'Dans le triangle de Pascal, chaque nombre est la somme des deux nombres au-dessus de lui.',diag:([u])=>near(u,a*b,1e-6)?'binom-coef':null})}
  const n=R(4,7),k=R(2,n-2),t=Cnk(n,k);
  return nq({instr:'Combien de chemins de l’arbre mènent à ce nombre de succès ?',prompt:stx(`On répète ${n} fois une épreuve de Bernoulli. Combien de chemins comportent exactement ${k} succès ?`),labels:[`C(${n} ; ${k}) =`],t:[t],
    explain:`C’est le coefficient binomial C(${n} ; ${k}) = ${t}, qu’on lit à la ligne ${n}, colonne ${k} du triangle de Pascal.`,
    hint:'Construis le triangle de Pascal jusqu’à la ligne n.',diag:([u])=>near(u,n*k,1e-6)||near(u,Ank(n,k),1e-6)?'comb-order':null})};

const gSp3Geo=()=>{const c=pick([['un dé jusqu’à obtenir un 4',1,6],['une pièce jusqu’à obtenir « pile »',1,2],['un dé jusqu’à obtenir 5 ou 6',1,3],['une fléchette jusqu’à toucher le centre (probabilité 0,2 à chaque lancer)',1,5],['un ticket à gratter jusqu’au premier gagnant (probabilité 0,1)',1,10],['un panier de basket jusqu’à la première réussite (probabilité 0,4)',2,5]]);
  const p=c[1]/c[2],qq=1-p,v=R(0,3),k=R(2,6),pr=stx(`On lance ${c[0]}. X est le nombre d’essais nécessaires pour obtenir le premier succès.`),ps=`${c[1]}/${c[2]}`;
  if(v===0)return nq({instr:`Calcule P(X = ${k}).`,prompt:pr,labels:[`P(X = ${k}) =`],t:[qq**(k-1)*p],dp:3,
    explain:`X suit la loi géométrique de paramètre p = ${ps}. P(X = ${k}) = (1 − p)<sup>${k-1}</sup> × p : ${k-1} échec${k>2?'s':''} puis un succès, soit ≈ ${SP3_d(qq**(k-1)*p,4)}.`,
    hint:'Loi géométrique : P(X = k) = (1 − p)^(k − 1) × p.',diag:([u])=>near(u,qq**k*p,.0011)||near(u,Cnk(k,1)*p*qq**(k-1),.0011)?'sp3-geo':null});
  if(v===1)return nq({instr:`Calcule P(X ≤ ${k}).`,prompt:pr,labels:[`P(X ≤ ${k}) =`],t:[1-qq**k],dp:3,
    explain:`Le contraire de « X ≤ ${k} » est « les ${k} premiers essais sont des échecs », de probabilité (1 − p)<sup>${k}</sup>. Donc P(X ≤ ${k}) = 1 − (${SP3_d(qq)})<sup>${k}</sup> ≈ ${SP3_d(1-qq**k,4)}.`,
    hint:'P(X ≤ k) = 1 − P(X > k) et P(X > k) = (1 − p)^k.',diag:([u])=>near(u,1-qq**(k-1),.0011)?'sp3-geo':near(u,qq**k,.0011)?'proba-compl':null});
  if(v===2)return nq({instr:`Calcule P(X > ${k}).`,prompt:pr,labels:[`P(X > ${k}) =`],t:[qq**k],dp:3,
    explain:`X > ${k} signifie que les ${k} premiers essais sont des échecs : P(X > ${k}) = (1 − p)<sup>${k}</sup> ≈ ${SP3_d(qq**k,4)}.`,
    hint:'« Plus de k essais » = les k premiers sont tous ratés.',diag:([u])=>near(u,qq**(k-1),.0011)?'sp3-geo':near(u,1-qq**k,.0011)?'proba-compl':null});
  return nq({instr:'Combien d’essais faut-il en moyenne ?',prompt:pr,labels:['E(X) ='],t:[1/p],dp:2,
    explain:`Pour la loi géométrique de paramètre p, E(X) = 1/p = ${c[2]}/${c[1]} = ${dec(1/p,2)}.`,
    hint:'E(X) = 1/p : plus le succès est rare, plus il faut attendre.',diag:([u])=>near(u,p,.011)||near(u,1/qq,.011)?'sp3-geo':null})};

/* Raisonnement 1 : loi binomiale complète (d’après la méthode « urne de 5 boules gagnantes et 7 perdantes ») */
const gSp3R1=()=>{const g=R(2,7),l=R(2,8),T=g+l,n=R(3,6),k=R(1,n-1),p=g/T,qq=1-p;
  const val=(f,nn,pp)=>f==='ok'?Cnk(nn,k)*pp**k*(1-pp)**(nn-k):f==='nc'?pp**k*(1-pp)**(nn-k):f==='inv'?Cnk(nn,k)*pp**(nn-k)*(1-pp)**k:Cnk(nn,k)*pp**k;
  const pd=(pp)=>Number.isInteger(pp*1e4)?num(pp):'≈ '+SP3_d(pp);
  return chain({instr:'Calcule la probabilité, en construisant ton raisonnement.',
    prompt:stx(`Une urne contient ${g} boules gagnantes et ${l} boules perdantes. On tire ${n} fois de suite une boule, en la remettant à chaque fois. X est le nombre de boules gagnantes obtenues. On cherche P(X = ${k}).`),
    steps:[
      {q:'Pourquoi X suit-elle une loi binomiale ?',o:[
        {h:`On répète ${n} fois, de façon identique et indépendante, une épreuve à deux issues, et X compte les succès.`,ok:true},
        {h:`On tire ${n} boules et il n’y a que deux sortes de boules : cela suffit.`,why:'Deux issues ne suffisent pas : il faut aussi des épreuves identiques et indépendantes (ici, garanties par la remise).',tag:'binom-law'},
        {h:`Toutes les valeurs de 0 à ${n} ont la même probabilité.`,why:'Ce serait une loi uniforme. Une loi binomiale n’est pas uniforme : les valeurs proches de np sont les plus probables.',tag:'binom-law'},
        {h:'Les tirages dépendent les uns des autres puisqu’on remet la boule.',why:'C’est l’inverse : la remise rend la composition de l’urne identique à chaque tirage, donc les tirages sont indépendants.',tag:'proba-indep'}]},
      {q:'Quels sont ses paramètres ?',o:[
        {h:mx(`B(${n} ; ${g}/${T})`),ok:true,n:n,p:p},
        {h:mx(`B(${n} ; ${g}/${l})`),why:`p est la probabilité du succès sur un tirage : gagnantes ÷ total = ${g}/${T}, pas gagnantes ÷ perdantes.`,tag:'binom-law',n:n,p:g/l<1?g/l:p},
        {h:mx(`B(${T} ; ${g}/${T})`),why:`n est le nombre de tirages (${n}), pas le nombre de boules dans l’urne.`,tag:'binom-law',n:T,p:p},
        {h:mx(`B(${n} ; ${l}/${T})`),why:`Le succès est « boule gagnante » : sa probabilité est ${g}/${T}, pas ${l}/${T}.`,tag:'binom-law',n:n,p:qq}]},
      {q:`Quelle formule donne P(X = ${k}) ?`,o:prev=>{const nn=prev[1].n;return[
        {h:mx(`C(${nn} ; ${k}) × p<sup>${k}</sup> × (1 − p)<sup>${nn-k}</sup>`),ok:true,f:'ok'},
        {h:mx(`p<sup>${k}</sup> × (1 − p)<sup>${nn-k}</sup>`),why:`C’est la probabilité d’un seul chemin. Il y a C(${nn} ; ${k}) chemins avec ${k} succès.`,tag:'binom-coef',f:'nc'},
        {h:mx(`C(${nn} ; ${k}) × p<sup>${nn-k}</sup> × (1 − p)<sup>${k}</sup>`),why:`Exposants inversés : ${k} succès donnent p<sup>${k}</sup>, les ${nn-k} échecs donnent (1 − p)<sup>${nn-k}</sup>.`,tag:'binom-coef',f:'inv'},
        {h:mx(`C(${nn} ; ${k}) × p<sup>${k}</sup>`),why:`Il manque la probabilité des ${nn-k} échecs, (1 − p)<sup>${nn-k}</sup>.`,tag:'binom-coef',f:'ne'}]}},
      {q:'Donc P(X = '+k+') vaut environ…',o:prev=>{const nn=prev[1].n,pp=prev[1].p,f=prev[2].f,v0=val(f,nn,pp);
        const others=['ok','nc','inv','ne'].filter(x=>x!==f).map(x=>({h:SP3_d(val(x,nn,pp),4),why:'Ce nombre ne correspond pas à la formule choisie à l’étape précédente : refais le calcul terme par terme.',tag:'calc'}));
        return[{h:SP3_d(v0,4),ok:true},...others,{h:SP3_d(1-v0,4),why:'Tu as calculé la probabilité de l’événement contraire.',tag:'proba-compl'}].slice(0,5)}}],
    explain:`X ~ B(${n} ; ${g}/${T}). P(X = ${k}) = C(${n} ; ${k}) × (${g}/${T})<sup>${k}</sup> × (${l}/${T})<sup>${n-k}</sup> = ${Cnk(n,k)} × ${pd(p**k)} × ${pd(qq**(n-k))} ≈ ${SP3_d(val('ok',n,p),4)}.`,
    hint:'Identifie n (nombre de tirages) et p (probabilité de succès sur un tirage), puis compte les chemins.'})};

/* Raisonnement 2 : « au moins un » et nombre minimal d’essais */
const gSp3R2=()=>{const c=pick([['un dé équilibré','obtenir un 6',1,6],['un dé équilibré','obtenir un 5 ou un 6',1,3],['une pièce équilibrée','obtenir « pile »',1,2],['un tireur à l’arc','atteindre le centre (probabilité 0,2)',1,5],['un joueur de loterie','gagner (probabilité 0,1)',1,10]]);
  const p=c[2]/c[3],qq=1-p,n=R(3,8),S=pick([.9,.95,.99]);
  const vals={c0:1-qq**n,c1:1-qq**n-n*p*qq**(n-1),d1:n*p*qq**(n-1),s1:qq**n+n*p*qq**(n-1)};
  const N=Math.ceil(Math.log(1-S)/Math.log(qq)-1e-9);
  return chain({instr:'Construis le raisonnement étape par étape.',
    prompt:stx(`On répète ${n} fois, de façon indépendante, l’épreuve : ${c[0]}, succès « ${c[1]} », de probabilité ${c[2]}/${c[3]}. X compte les succès, X ~ B(${n} ; ${c[2]}/${c[3]}). On cherche la probabilité d’au moins un succès.`),
    steps:[
      {q:'« Au moins un succès » se traduit par…',o:[
        {h:mx('X ≥ 1'),ok:true,c:'c0'},
        {h:mx('X &gt; 1'),why:'« X > 1 » exclut le cas d’un seul succès ; or un seul succès, c’est déjà « au moins un ».',tag:'proba-compl',c:'c1'},
        {h:mx('X = 1'),why:'« X = 1 » signifie exactement un succès ; « au moins un » accepte aussi 2, 3… succès.',tag:'proba-compl',c:'d1'},
        {h:mx('X ≤ 1'),why:'« X ≤ 1 » signifie « au plus un ».',tag:'proba-compl',c:'s1'}]},
      {q:'Quelle stratégie de calcul ?',o:prev=>[
        {h:mx('1 − P(X = 0)'),ok:prev[0].c==='c0',c:'c0',why:'C’est la bonne stratégie pour X ≥ 1, mais pas pour l’événement traduit à l’étape précédente.',tag:'proba-compl'},
        {h:mx('1 − P(X ≤ 1)'),ok:prev[0].c==='c1',c:'c1',why:'1 − P(X ≤ 1) = P(X ≥ 2) : le cas d’un seul succès est perdu.',tag:'proba-compl'},
        {h:mx('P(X = 1)'),ok:prev[0].c==='d1',c:'d1',why:'P(X = 1) ne compte que les cas à un seul succès.',tag:'proba-compl'},
        {h:mx('P(X = 0) + P(X = 1)'),ok:prev[0].c==='s1',c:'s1',why:'Cette somme vaut P(X ≤ 1), « au plus un succès ».',tag:'proba-compl'}]},
      {q:'Le calcul donne environ…',o:prev=>{const ch=prev[1].c;return[
        {h:SP3_d(vals[ch],4),ok:true},
        ...['c0','c1','d1','s1'].filter(x=>x!==ch).map(x=>({h:SP3_d(vals[x],4),why:'Ce nombre ne correspond pas à la stratégie choisie à l’étape précédente.',tag:'calc'})),
        {h:SP3_d(1-p**n,4),why:`p<sup>${n}</sup> est la probabilité de ${n} succès sur ${n} ; « aucun succès » a pour probabilité (1 − p)<sup>${n}</sup>.`,tag:'proba-compl'}].slice(0,5)}},
      {q:`Combien d’essais faut-il au minimum pour que P(X ≥ 1) dépasse ${num(S)} ?`,o:[
        {h:`n ≥ ln(${num(+(1-S).toFixed(2))}) ÷ ln(${SP3_d(qq)}), soit ${N} essais`,ok:true},
        {h:`n ≤ ln(${num(+(1-S).toFixed(2))}) ÷ ln(${SP3_d(qq)}), soit au plus ${N-1} essais`,why:'ln(1 − p) est négatif : en divisant, l’inégalité change de sens. Il faut n ≥ …',tag:'ineq-flip'},
        {h:`n ≥ ln(${num(S)}) ÷ ln(${SP3_d(qq)}), soit ${Math.max(1,Math.ceil(Math.log(S)/Math.log(qq)-1e-9))} essai${Math.ceil(Math.log(S)/Math.log(qq)-1e-9)>1?'s':''}`,why:`On veut (1 − p)<sup>n</sup> ≤ 1 − ${num(S)} = ${num(+(1-S).toFixed(2))}, donc c’est ln(${num(+(1-S).toFixed(2))}) qu’il faut utiliser.`,tag:'log-def'},
        {h:`n ≥ ${num(S)} ÷ ${SP3_d(p)}, soit ${Math.ceil(S/p-1e-9)} essais`,why:'La probabilité n’est pas proportionnelle au nombre d’essais : on résout (1 − p)ⁿ ≤ 1 − seuil avec le logarithme.',tag:'calc'}]}],
    explain:`« Au moins un succès » : X ≥ 1, dont le contraire est X = 0. P(X ≥ 1) = 1 − (1 − p)<sup>${n}</sup> = 1 − ${SP3_d(qq)}<sup>${n}</sup> ≈ ${SP3_d(vals.c0,4)}. Pour un nombre n d’essais quelconque : 1 − (1 − p)<sup>n</sup> ≥ ${num(S)} ⟺ n ln(1 − p) ≤ ln(${num(+(1-S).toFixed(2))}) ⟺ n ≥ ln(${num(+(1-S).toFixed(2))}) ÷ ln(${SP3_d(qq)}) ≈ ${dec(Math.log(1-S)/Math.log(qq),2)}, soit au moins ${N} essais.`,
    hint:'« Au moins un » : pense à l’événement contraire « aucun ».'})};

/* Raisonnement 3 : loi géométrique et absence de mémoire (d’après l’exemple de l’enfant gaucher) */
const gSp3R3=()=>{const c=pick([['Un couple a une probabilité {p} d’avoir un enfant gaucher. X est le rang du premier enfant gaucher.','ses {m} premiers enfants sont droitiers','le premier enfant gaucher n’arrive qu’après le {r}ᵉ enfant'],
    ['Un joueur réussit un lancer franc avec la probabilité {p}. X est le rang du premier lancer réussi.','ses {m} premiers lancers sont ratés','sa première réussite n’arrive qu’après le {r}ᵉ lancer'],
    ['Une machine produit une pièce défectueuse avec la probabilité {p}. X est le rang de la première pièce défectueuse.','les {m} premières pièces sont bonnes','la première pièce défectueuse n’arrive qu’après la {r}ᵉ pièce']]);
  const p=pick([.1,.12,.15,.2,.25,.3]),qq=1-p,m=R(1,4),j=R(2,4),r=m+j;
  const F=s=>s.replace('{p}',num(p)).replace('{m}',m).replace('{r}',r);
  const pw=e=>`${num(+qq.toFixed(2))}<sup>${e}</sup>`;
  return chain({instr:'Construis le raisonnement étape par étape.',
    prompt:stx(`${F(c[0])} On sait que ${F(c[1])}. Quelle est la probabilité que ${F(c[2])} ?`),
    steps:[
      {q:'Quelle loi suit X ?',o:[
        {h:`La loi géométrique de paramètre ${num(p)}`,ok:true},
        {h:`La loi binomiale B(${r} ; ${num(p)})`,why:'X n’est pas un nombre de succès sur un nombre fixé d’essais : c’est le rang du premier succès.',tag:'binom-law'},
        {h:`La loi géométrique de paramètre ${num(+qq.toFixed(2))}`,why:`Le paramètre est la probabilité du succès attendu, ${num(p)}.`,tag:'sp3-geo'},
        {h:`La loi uniforme sur {1, …, ${r}}`,why:'Les rangs ne sont pas équiprobables : un succès précoce est plus probable qu’un succès tardif.',tag:'sp3-unif'}]},
      {q:'La probabilité cherchée s’écrit…',o:[
        {h:mx(`P<sub>X&gt;${m}</sub>(X &gt; ${r})`),ok:true,e:j},
        {h:mx(`P(X &gt; ${r})`),why:`L’énoncé donne une information (« ${F(c[1])} ») : c’est une probabilité conditionnelle sachant X > ${m}.`,tag:'proba-cond',e:r},
        {h:mx(`P<sub>X&gt;${r}</sub>(X &gt; ${m})`),why:'Condition et événement sont inversés : ce qu’on sait déjà va en indice.',tag:'proba-cond',e:0},
        {h:mx(`P<sub>X&gt;${m}</sub>(X = ${r})`),why:`« N’arrive qu’après le rang ${r} » signifie X > ${r}, pas X = ${r}.`,tag:'proba-cond',e:-1}]},
      {q:'Grâce à l’absence de mémoire, cette probabilité est égale à…',o:prev=>{const e=prev[1].e;return[
        {h:mx(`P(X &gt; ${j})`),ok:e===j||e===0||e===-1,j:j,why:`Ici la probabilité cherchée n’était pas conditionnelle : P(X > ${r}) se calcule directement.`},
        {h:mx(`P(X &gt; ${r})`),ok:e===r,j:r,why:`Sachant X > ${m}, seuls comptent les ${j} essais en plus : P<sub>X>${m}</sub>(X > ${m} + ${j}) = P(X > ${j}).`,tag:'sp3-memo'},
        {h:mx(`P(X &gt; ${r+m})`),j:r+m,why:'On n’ajoute pas les rangs : on garde seulement la différence entre les deux rangs.',tag:'sp3-memo'},
        {h:mx(`P(X &gt; ${m}) × P(X &gt; ${r})`),j:r+m,why:'Absence de mémoire n’est pas indépendance de ces deux événements : X > r entraîne X > m.',tag:'proba-indep'}]}},
      {q:'Donc la probabilité vaut environ…',o:prev=>{const jj=prev[2].j;return[
        {h:`${pw(jj)} ≈ ${SP3_d(qq**jj,4)}`,ok:true},
        {h:`1 − ${pw(jj)} ≈ ${SP3_d(1-qq**jj,4)}`,why:`1 − (1 − p)<sup>${jj}</sup> = P(X ≤ ${jj}) ; or X > ${jj} signifie ${jj} échecs de suite : (1 − p)<sup>${jj}</sup>.`,tag:'proba-compl'},
        {h:`${pw(jj-1)} × ${num(p)} ≈ ${SP3_d(qq**(jj-1)*p,4)}`,why:`C’est P(X = ${jj}), le premier succès exactement au rang ${jj}.`,tag:'sp3-geo'},
        {h:`${num(p)}<sup>${jj}</sup> ≈ ${SP3_d(p**jj,4)}`,why:`p<sup>${jj}</sup> serait ${jj} succès de suite ; X > ${jj} demande ${jj} échecs.`,tag:'sp3-geo'}]}}],
    explain:`X suit la loi géométrique de paramètre ${num(p)}. On cherche P<sub>X>${m}</sub>(X > ${r}) = P<sub>X>${m}</sub>(X > ${m} + ${j}) = P(X > ${j}) par absence de mémoire. Or P(X > ${j}) = (1 − p)<sup>${j}</sup> = ${pw(j)} ≈ ${SP3_d(qq**j,4)}.`,
    hint:'La loi géométrique est sans mémoire : seuls comptent les essais en plus.'})};

/* =================== Chapitre 2 : lois à densité =================== */
const gSp3Dens=()=>{const v=R(0,2);
  if(v===0){const a=R(0,10),b=a+pick([2,4,5,8,10,20]);
    return nq({instr:'Trouve k pour que f soit une densité.',prompt:mx(`f(x) = k sur [${a} ; ${b}]`),labels:['k ='],t:[1/(b-a)],dp:3,
      explain:`L’aire sous f est un rectangle de base ${b-a} et de hauteur k : k × ${b-a} = 1, donc k = 1/${b-a} ≈ ${SP3_d(1/(b-a))}.`,
      hint:'L’aire totale sous la courbe doit valoir 1.',diag:([u])=>near(u,b-a,.0011)||near(u,1/b,.0011)?'sp3-dens':null})}
  if(v===1){const c=pick([1,2,3,4,5,10]);
    return nq({instr:'Trouve k pour que f soit une densité.',prompt:mx(`f(x) = kx sur [0 ; ${c}]`),labels:['k ='],t:[2/(c*c)],dp:4,
      explain:`∫<sub>0</sub><sup>${c}</sup> kx dx = k × [x²/2]<sub>0</sub><sup>${c}</sup> = k × ${c*c}/2. On veut ${c*c}k/2 = 1, donc k = 2/${c*c} ≈ ${SP3_d(2/(c*c),4)}. (f est bien continue et positive pour k > 0.)`,
      hint:'Calcule l’intégrale de kx avec la primitive kx²/2, puis écris qu’elle vaut 1.',diag:([u])=>near(u,1/(c*c),.00011)||near(u,1/c,.00011)?'sp3-dens':null})}
  const c=pick([1,2,3,5,10]);
  return nq({instr:'Trouve k pour que f soit une densité.',prompt:mx(`f(x) = kx<sup>2</sup> sur [0 ; ${c}]`),labels:['k ='],t:[3/c**3],dp:4,
    explain:`∫<sub>0</sub><sup>${c}</sup> kx² dx = k × ${c**3}/3. On veut ${c**3}k/3 = 1, donc k = 3/${c**3} ≈ ${SP3_d(3/c**3,4)}.`,
    hint:'Une primitive de x² est x³/3.',diag:([u])=>near(u,1/c**3,.00011)||near(u,2/c**2,.00011)?'sp3-dens':null})};

const gSp3UEV=()=>{const a=R(0,20),b=a+pick([2,4,6,10,12,30,60]),ctx=pick([`X suit la loi uniforme sur [${a} ; ${b}].`,`Un bus passe à un instant au hasard entre ${a} et ${b} minutes après 8 h. X est cet instant, de loi uniforme sur [${a} ; ${b}].`]);
  return nq({instr:'Calcule l’espérance et la variance de X.',prompt:stx(ctx),labels:['E(X) =','V(X) ='],t:[(a+b)/2,(b-a)**2/12],dp:2,
    explain:`E(X) = (a + b)/2 = (${a} + ${b})/2 = ${num((a+b)/2)}. V(X) = (b − a)²/12 = ${b-a}²/12 = ${(b-a)**2}/12 ≈ ${dec((b-a)**2/12,2)}.`,
    hint:'Loi uniforme sur [a ; b] : E = (a + b)/2 et V = (b − a)²/12.',diag:([u,w])=>near(u,(b-a)/2)||near(w,(b-a)/12)||near(w,(b-a)**2/2)?'sp3-unif':null})};

const gSp3Exp=()=>{const L=pick([.1,.2,.5,.02,.04,.05]),v=R(0,2),t=pick(L>=.1?[1,2,3,4,5]:[10,20,25,50]),t2=t+pick(L>=.1?[1,2,3]:[10,20,30]);
  const pr=mx(`X suit la loi exponentielle de paramètre λ = ${num(L)}.`),Ls=num(L);
  if(v===0)return SP3_ans(nq({instr:`Calcule P(X ≤ ${t}).`,prompt:pr+stx(' Tu peux écrire la valeur exacte avec e ou exp.'),labels:[`P(X ≤ ${t}) =`],t:[1-Math.exp(-L*t)],dp:3,
    explain:`P(X ≤ t) = 1 − e<sup>−λt</sup> = 1 − e<sup>−${num(+(L*t).toFixed(4))}</sup> ≈ ${SP3_d(1-Math.exp(-L*t),4)}.`,
    hint:'Fonction de répartition : P(X ≤ t) = 1 − e^(−λt).',diag:([u])=>near(u,Math.exp(-L*t),.0011)?'proba-compl':near(u,1-Math.exp(-t/L),.0011)?'sp3-expo':null}),[`1-exp(-${+(L*t).toFixed(4)})`]);
  if(v===1)return SP3_ans(nq({instr:`Calcule P(X > ${t}).`,prompt:pr+stx(' Tu peux écrire la valeur exacte avec e ou exp.'),labels:[`P(X > ${t}) =`],t:[Math.exp(-L*t)],dp:3,
    explain:`P(X > t) = 1 − P(X ≤ t) = e<sup>−λt</sup> = e<sup>−${num(+(L*t).toFixed(4))}</sup> ≈ ${SP3_d(Math.exp(-L*t),4)}.`,
    hint:'P(X > t) = 1 − P(X ≤ t) = e^(−λt).',diag:([u])=>near(u,1-Math.exp(-L*t),.0011)?'proba-compl':near(u,Math.exp(-t/L),.0011)?'sp3-expo':null}),[`exp(-${+(L*t).toFixed(4)})`]);
  const val=Math.exp(-L*t)-Math.exp(-L*t2);
  return SP3_ans(nq({instr:`Calcule P(${t} ≤ X ≤ ${t2}).`,prompt:pr+stx(' Tu peux écrire la valeur exacte avec e ou exp.'),labels:['P ='],t:[val],dp:3,
    explain:`P(${t} ≤ X ≤ ${t2}) = P(X ≤ ${t2}) − P(X < ${t}) = (1 − e<sup>−${num(+(L*t2).toFixed(4))}</sup>) − (1 − e<sup>−${num(+(L*t).toFixed(4))}</sup>) = e<sup>−${num(+(L*t).toFixed(4))}</sup> − e<sup>−${num(+(L*t2).toFixed(4))}</sup> ≈ ${SP3_d(val,4)}.`,
    hint:'P(a ≤ X ≤ b) = e^(−λa) − e^(−λb).',diag:([u])=>near(u,-val,.0011)?'signe':near(u,1-Math.exp(-L*t2),.0011)?'sp3-expo':null}),[`exp(-${+(L*t).toFixed(4)})-exp(-${+(L*t2).toFixed(4)})`])};

const gSp3ExpE=()=>{const v=R(0,1);
  if(v===0){const L=pick([.01,.02,.04,.05,.1,.2,.25,.5,.0025]);
    return nq({instr:'Calcule la durée de vie moyenne E(X), en heures.',prompt:mx(`La durée de vie X d’un composant suit la loi exponentielle de paramètre λ = ${num(L)}.`),labels:['E(X) ='],t:[1/L],dp:1,
      explain:`Pour la loi exponentielle, E(X) = 1/λ = 1/${num(L)} = ${num(+(1/L).toFixed(2))} heures.`,hint:'E(X) = 1/λ.',diag:([u])=>near(u,L,.06)?'sp3-expo':null})}
  const m=pick([50,100,200,500,1000,2000]),t=pick([.5,1,1.5,2]).valueOf()*m,L=1/m;
  return SP3_ans(nq({instr:`Calcule la probabilité que l’appareil fonctionne plus de ${t} heures.`,prompt:stx(`La durée de vie d’un appareil suit une loi exponentielle de durée de vie moyenne ${m} heures. Tu peux écrire la valeur exacte avec e ou exp.`),labels:[`P(X > ${t}) =`],t:[Math.exp(-t/m)],dp:3,
    explain:`E(X) = 1/λ = ${m}, donc λ = 1/${m}. P(X > ${t}) = e<sup>−λt</sup> = e<sup>−${t}/${m}</sup> = e<sup>−${num(t/m)}</sup> ≈ ${SP3_d(Math.exp(-t/m),4)}.`,
    hint:'Retrouve λ = 1/E(X), puis P(X > t) = e^(−λt).',diag:([u])=>near(u,1-Math.exp(-t/m),.0011)?'proba-compl':near(u,Math.exp(-t*m),.0011)?'sp3-expo':null}),[`exp(-${t/m})`])};

/* Raisonnement 4 : absence de mémoire de la loi exponentielle (d’après le composant de carte musicale) */
const gSp3R4=()=>{const L=pick([.001,.002,.0035,.005,.01]),s=pick([100,200,300,500]),h=pick([50,100,150,200]),S=s+h;
  const ex=x=>num(+(L*x).toFixed(4)),V={Fh:1-Math.exp(-L*h),Sh:Math.exp(-L*h),FS:1-Math.exp(-L*S),SS:Math.exp(-L*S)};
  return chain({instr:'Construis le raisonnement étape par étape.',
    prompt:stx(`La durée de vie X (en heures) d’un composant suit la loi exponentielle de paramètre λ = ${num(L)}. Un composant a déjà fonctionné plus de ${s} heures. Quelle est la probabilité qu’il tombe en panne avant ${S} heures ?`),
    steps:[
      {q:'La probabilité cherchée s’écrit…',o:[
        {h:mx(`P<sub>X&gt;${s}</sub>(X ≤ ${S})`),ok:true,c:'ok'},
        {h:mx(`P(X ≤ ${S})`),why:`On sait déjà que X > ${s} : c’est une probabilité conditionnelle.`,tag:'proba-cond',c:'noc'},
        {h:mx(`P<sub>X&gt;${s}</sub>(X &gt; ${S})`),why:`« Tomber en panne avant ${S} h » signifie X ≤ ${S}.`,tag:'proba-compl',c:'gt'},
        {h:mx(`P<sub>X≤${S}</sub>(X &gt; ${s})`),why:'Condition et événement inversés : l’information connue (X > '+s+') va en indice.',tag:'proba-cond',c:'inv'}]},
      {q:'On la transforme en…',o:prev=>{const c=prev[0].c;return[
        {h:mx(`1 − P(X &gt; ${h}) = P(X ≤ ${h})`),ok:c==='ok'||c==='inv',e:'Fh',why:'Bonne transformation pour P<sub>X>'+s+'</sub>(X ≤ '+S+'), mais ce n’est pas ce que tu as écrit à l’étape précédente.',tag:'sp3-memo'},
        {h:mx(`P(X &gt; ${h})`),ok:c==='gt',e:'Sh',why:`Il manque le passage au contraire : P<sub>X>${s}</sub>(X ≤ ${S}) = 1 − P<sub>X>${s}</sub>(X > ${S}).`,tag:'proba-compl'},
        {h:mx(`1 − P(X &gt; ${S}) = P(X ≤ ${S})`),ok:c==='noc',e:'FS',why:`Absence de mémoire : on ne garde que la durée en plus, ${S} − ${s} = ${h} h, pas la durée totale.`,tag:'sp3-memo'},
        {h:mx(`P(X &gt; ${s}) × P(X &gt; ${h})`),e:'SS',why:'L’absence de mémoire remplace la probabilité conditionnelle par P(X > durée en plus) ; on ne multiplie pas.',tag:'sp3-memo'}]}},
      {q:'Le calcul donne environ…',o:prev=>{const e=prev[1].e,F={Fh:`1 − e<sup>−${ex(h)}</sup>`,Sh:`e<sup>−${ex(h)}</sup>`,FS:`1 − e<sup>−${ex(S)}</sup>`,SS:`e<sup>−${ex(S)}</sup>`};
        return['Fh','Sh','FS','SS'].map(x=>({h:`${F[x]} ≈ ${SP3_d(V[x],3)}`,ok:x===e,why:x===e?'':'Ce calcul ne correspond pas à l’expression de l’étape précédente.',tag:'sp3-expo'}))}},
      {q:'Que montre ce résultat ?',o:[
        {h:`Il est le même que pour un composant neuf sur ${h} h : le composant ne vieillit pas.`,ok:true},
        {h:`Le composant a vieilli : la panne est plus probable que pour un composant neuf sur ${h} h.`,why:'La loi exponentielle modélise une durée de vie sans vieillissement : le passé ne change rien.',tag:'sp3-memo'},
        {h:`Le composant a fait ses preuves : la panne est moins probable que pour un neuf sur ${h} h.`,why:'Ni usure ni rodage : avec la loi exponentielle, la probabilité ne dépend que de la durée en plus.',tag:'sp3-memo'},
        {h:`Il dépend des ${s} heures déjà écoulées, qu’il faut multiplier.`,why:`Justement non : le résultat ne dépend que de la durée en plus, ${h} h.`,tag:'sp3-memo'}]}],
    explain:`On cherche P<sub>X>${s}</sub>(X ≤ ${S}) = 1 − P<sub>X>${s}</sub>(X > ${s} + ${h}) = 1 − P(X > ${h}) (absence de mémoire) = 1 − e<sup>−${ex(h)}</sup> ≈ ${SP3_d(V.Fh,3)}. C’est la même probabilité que pour un composant neuf sur ${h} heures.`,
    hint:'Traduis d’abord la phrase, puis ne garde que la durée en plus.'})};

/* Raisonnement 5 : retrouver σ ou μ (méthode « Déterminer une espérance ou un écart-type ») */
const SP3_Q=[[.1,-1.2816],[.2,-.8416],[.3,-.5244],[.4,-.2533],[.6,.2533],[.7,.5244],[.8,.8416],[.9,1.2816],[.95,1.6449]];
const gSp3R5=()=>{const [p,z]=pick(SP3_Q),mu=R(10,90),s0=R(3,20),a=mu+(Math.round(z*s0)||(z>0?1:-1)),unkS=Math.random()<.5;
  const d=a-mu,zs=num(z);
  if(unkS){const sig=d/z;
    const F={s:{h:mx(`Z &lt; (${a} − ${mu}) / σ`),z:'s'},s2:{h:mx(`Z &lt; (${a} − ${mu}) / σ<sup>2</sup>`),z:'s2'},d:{h:mx(`Z &lt; ${a} − ${mu}`),z:'d'},fl:{h:mx(`Z &gt; (${a} − ${mu}) / σ`),z:'fl'}};
    return chain({instr:'Trouve l’écart-type, en construisant ton raisonnement.',
      prompt:mx(`X ~ N(${mu} ; σ<sup>2</sup>) et P(X &lt; ${a}) = ${num(p)}.`)+stx(` La calculatrice donne : P(Z &lt; z₀) = ${num(p)} pour z₀ ≈ ${zs}, où Z suit N(0 ; 1).`),
      steps:[
        {q:'Pour se ramener à la loi N(0 ; 1), on pose…',o:[
          {h:mx(`Z = (X − ${mu}) / σ`),ok:true,c:'s'},
          {h:mx(`Z = (X − ${mu}) / σ<sup>2</sup>`),why:'On divise par l’écart-type σ, pas par la variance σ².',tag:'loi-normale',c:'s2'},
          {h:mx(`Z = X − ${mu}`),why:'Centrer ne suffit pas : il faut aussi réduire, en divisant par σ.',tag:'loi-normale',c:'d'},
          {h:mx(`Z = (X + ${mu}) / σ`),why:'Centrer, c’est retrancher la moyenne.',tag:'signe',c:'s'}]},
        {q:`L’événement « X < ${a} » devient…`,o:prev=>{const c=prev[0].c;return[
          {...F.s,ok:c==='s',why:'C’est vrai avec Z = (X − μ)/σ, mais pas avec la variable posée à l’étape précédente.',tag:'loi-normale'},
          {...F.s2,ok:c==='s2',why:'On divise par σ, pas par σ².',tag:'loi-normale'},
          {...F.d,ok:c==='d',why:'Il manque la division par σ.',tag:'loi-normale'},
          {...F.fl,why:'σ est positif : diviser par σ ne change pas le sens de l’inégalité.',tag:'ineq-flip'}]}},
        {q:`Comme P(Z < z₀) = ${num(p)} avec z₀ ≈ ${zs}, on obtient…`,o:prev=>{const f=prev[1].z;const opts=[
          {h:`(${a} − ${mu}) / σ = ${zs}, donc σ ≈ ${SP3_d(sig,2)}`,ok:f==='s'||f==='d'||f==='fl',why:'Ce calcul correspond à Z = (X − μ)/σ, pas à l’inégalité choisie juste avant.'},
          {h:`(${a} − ${mu}) / σ² = ${zs}, donc σ ≈ ${SP3_d(Math.sqrt(d/z),2)}`,ok:f==='s2',why:'L’équation divise par σ² au lieu de σ.',tag:'loi-normale'},
          {h:`(${a} − ${mu}) / σ = ${zs}, donc σ ≈ ${SP3_d(d*z,2)}`,why:`Équation mal résolue : de ${d}/σ = ${zs}, on tire σ = ${d} ÷ ${zs}.`,tag:'mult-div'},
          {h:`(${a} − ${mu}) / σ = ${num(p)}, donc σ ≈ ${SP3_d(d/p,2)}`,why:`${num(p)} est une probabilité ; l’égalité porte sur la borne z₀ ≈ ${zs}.`,tag:'loi-normale'}];
          return opts.filter(o=>!/−|NaN/.test(o.h.split('≈')[1]||''))}}],
      explain:`Z = (X − ${mu})/σ suit N(0 ; 1). P(X < ${a}) = P(Z < (${a} − ${mu})/σ) = ${num(p)}, donc (${a} − ${mu})/σ = z₀ ≈ ${zs} et σ = ${d} ÷ ${zs} ≈ ${SP3_d(sig,2)}.`,
      hint:'Centre-réduis, puis identifie la borne avec z₀.'})}
  const sg=s0,muT=a-z*sg;
  return chain({instr:'Trouve l’espérance, en construisant ton raisonnement.',
    prompt:mx(`X ~ N(μ ; ${sg}<sup>2</sup>) et P(X &lt; ${a}) = ${num(p)}.`)+stx(` La calculatrice donne : P(Z &lt; z₀) = ${num(p)} pour z₀ ≈ ${zs}, où Z suit N(0 ; 1).`),
    steps:[
      {q:'Pour se ramener à la loi N(0 ; 1), on pose…',o:[
        {h:mx(`Z = (X − μ) / ${sg}`),ok:true,c:'s'},
        {h:mx(`Z = (X − μ) / ${sg*sg}`),why:`On divise par l’écart-type ${sg}, pas par la variance ${sg*sg}.`,tag:'loi-normale',c:'s2'},
        {h:mx('Z = X − μ'),why:'Centrer ne suffit pas : il faut aussi réduire, en divisant par σ.',tag:'loi-normale',c:'d'},
        {h:mx(`Z = (X + μ) / ${sg}`),why:'Centrer, c’est retrancher la moyenne.',tag:'signe',c:'s'}]},
      {q:`L’égalité P(X < ${a}) = ${num(p)} donne…`,o:prev=>{const c=prev[0].c;return[
        {h:mx(`(${a} − μ) / ${sg} = ${zs}`),ok:c==='s',m:a-z*sg,why:'Bonne équation pour Z = (X − μ)/σ, mais pas pour la variable posée avant.',tag:'loi-normale'},
        {h:mx(`(${a} − μ) / ${sg*sg} = ${zs}`),ok:c==='s2',m:a-z*sg*sg,why:'On divise par σ, pas par σ².',tag:'loi-normale'},
        {h:mx(`${a} − μ = ${zs}`),ok:c==='d',m:a-z,why:'Il manque la division par σ.',tag:'loi-normale'},
        {h:mx(`(${a} − μ) / ${sg} = ${num(p)}`),m:a-p*sg,why:`${num(p)} est une probabilité ; l’égalité porte sur z₀ ≈ ${zs}.`,tag:'loi-normale'}]}},
      {q:'Donc…',o:prev=>{const m=prev[1].m;return[
        {h:`μ ≈ ${SP3_d(m,2)}`,ok:true},
        {h:`μ ≈ ${SP3_d(2*a-m,2)}`,why:`Erreur de signe en isolant μ : μ = ${a} − σ × z₀.`,tag:'signe'},
        {h:`μ ≈ ${SP3_d(a-z/sg,2)}`,why:'On multiplie z₀ par σ, on ne divise pas.',tag:'mult-div'}]}}],
    explain:`Z = (X − μ)/${sg} suit N(0 ; 1). P(X < ${a}) = P(Z < (${a} − μ)/${sg}) = ${num(p)}, donc (${a} − μ)/${sg} = ${zs} et μ = ${a} − ${sg} × (${zs}) ≈ ${SP3_d(muT,2)}.`,
    hint:'Centre-réduis, puis identifie la borne avec z₀.'})};

/* Raisonnement 6 : théorème de Moivre-Laplace */
const gSp3R6=()=>{const n=pick([200,300,400,500,800,1000,1200,1500,2000]),p=pick([.1,.2,.25,.3,.4,.5,.6]),mu=n*p,sd=Math.sqrt(n*p*(1-p)),t=pick([-1.8,-1.2,-.7,.6,1,1.4,2]),k=Math.round(mu+t*sd);
  const z2=x=>+x.toFixed(2);
  return chain({instr:'Approche la loi binomiale par une loi normale, étape par étape.',
    prompt:mx(`X ~ B(${n} ; ${num(p)}). On cherche une valeur approchée de P(X ≤ ${k}).`),
    steps:[
      {q:'Peut-on utiliser le théorème de Moivre-Laplace ?',o:[
        {h:`Oui : n = ${n} ≥ 30, np = ${num(mu)} ≥ 5 et n(1 − p) = ${num(+(n-mu).toFixed(2))} ≥ 5.`,ok:true},
        {h:'Non : X est discrète, on ne peut pas l’approcher par une loi continue.',why:'C’est justement ce que permet le théorème de Moivre-Laplace, pour n grand.',tag:'sp3-cond'},
        {h:`Oui, car n = ${n} ≥ 30 ; les autres conditions sont inutiles.`,why:'Si p est très proche de 0 ou de 1, la loi est très dissymétrique : il faut aussi np ≥ 5 et n(1 − p) ≥ 5.',tag:'sp3-cond'}]},
      {q:'Avec quelle espérance et quel écart-type ?',o:[
        {h:`μ = ${num(mu)} et σ = √(${num(mu)} × ${num(1-p)}) ≈ ${SP3_d(sd,2)}`,ok:true,m:mu,s:sd},
        {h:`μ = ${num(mu)} et σ = ${num(+(mu*(1-p)).toFixed(2))}`,why:'np(1 − p) est la variance ; l’écart-type est sa racine carrée.',tag:'stat-var',m:mu,s:mu*(1-p)},
        {h:`μ = ${num(mu)} et σ = √${num(mu)} ≈ ${SP3_d(Math.sqrt(mu),2)}`,why:'La variance binomiale est np(1 − p), pas np.',tag:'stat-var',m:mu,s:Math.sqrt(mu)},
        {h:`μ = ${num(p)} et σ = √(${num(p)} × ${num(1-p)} / ${n}) ≈ ${SP3_d(Math.sqrt(p*(1-p)/n),3)}`,why:'Ce sont l’espérance et l’écart-type de la fréquence X/n, pas du nombre de succès X.',tag:'ic',m:p,s:Math.sqrt(p*(1-p)/n)}]},
      {q:`P(X ≤ ${k}) est donc proche de…`,o:prev=>{const z=z2((k-prev[1].m)/prev[1].s);return[
        {h:mx(`P(Z ≤ ${num(z)})`),ok:true,z:z,dir:1},
        {h:mx(`P(Z ≥ ${num(z)})`),why:'Centrer et réduire ne change pas le sens de l’inégalité (σ > 0).',tag:'ineq-flip',z:z,dir:-1},
        {h:mx(`P(Z ≤ ${num(z2(-z))})`),why:`z = (k − μ)/σ = (${k} − μ)/σ : attention au signe.`,tag:'signe',z:-z,dir:1}]}},
      {q:'Avec Φ, on obtient environ…',o:prev=>{const z=prev[2].z,dir=prev[2].dir,f=Phi(z),ok=dir>0?f:1-f;
        if(Math.abs(z)>8)return[{h:SP3_d(ok,3),ok:true},{h:SP3_d(1-ok,3),why:'Inégalité ou signe mal lus.',tag:'loi-normale'}];
        return[{h:SP3_d(ok,3),ok:true},{h:SP3_d(1-ok,3),why:'Tu as calculé la probabilité de l’événement contraire.',tag:'proba-compl'},
          {h:SP3_d(Math.abs(f-.5),3),why:'|Φ(z) − 0,5| est l’aire entre 0 et z, pas l’aire à gauche de z.',tag:'loi-normale'},
          {h:SP3_d(Math.abs(2*f-1),3),why:'2Φ(z) − 1 sert pour un intervalle symétrique [−z ; z].',tag:'loi-normale'}]}}],
    explain:`Conditions vérifiées (n ≥ 30, np ≥ 5, n(1 − p) ≥ 5). μ = np = ${num(mu)}, σ = √(np(1 − p)) ≈ ${SP3_d(sd,2)}. P(X ≤ ${k}) ≈ P(Z ≤ (${k} − ${num(mu)})/${SP3_d(sd,2)}) = P(Z ≤ ${num(z2((k-mu)/sd))}) = Φ(${num(z2((k-mu)/sd))}) ≈ ${SP3_d(Phi(z2((k-mu)/sd)),3)}.`,
    hint:'μ = np, σ = √(np(1 − p)), puis z = (k − μ)/σ.'})};

/* =================== Chapitre 3 : échantillonnage et estimation =================== */
const SP3_LLN=[
  ['On lance un dé équilibré et on note la fréquence f des « 1 ou 6 ». Que se passe-t-il quand le nombre n de lancers devient très grand ?','f est le plus souvent proche de 1/3.',['f vaut exactement 1/3 dès que n est assez grand.','f se rapproche de 1/2, car on gagne ou on perd.','f ne se stabilise jamais : le hasard reste le hasard.'],'Loi des grands nombres : pour n grand, la fréquence observée est le plus souvent proche de la probabilité 2/6 = 1/3, sans être forcément égale.'],
  ['Une pièce équilibrée vient de tomber 6 fois de suite sur « face ». Au 7ᵉ lancer…','la probabilité de « pile » vaut toujours 0,5.',['« pile » est plus probable, pour compenser.','« face » est plus probable, la série continue.','la probabilité de « pile » vaut 1 − 0,5⁶.'],'Les lancers sont indépendants : la pièce n’a pas de mémoire. La loi des grands nombres ne « compense » pas les séries ; elle dit seulement que sur un très grand nombre de lancers, la fréquence se stabilise.'],
  ['Pour n assez grand, l’écart entre la fréquence observée f et la probabilité p est inférieur à 1/√n…','dans environ 95 % des échantillons.',['dans tous les échantillons.','dans environ 5 % des échantillons.','seulement si n est un carré parfait.'],'C’est le principe de l’estimation : |f − p| ≤ 1/√n dans environ 95 % des cas. Il reste environ 5 % d’échantillons « malchanceux ».'],
  ['Quand on multiplie par 4 la taille n d’un échantillon, la largeur 2/√n de l’intervalle…','est divisée par 2.',['est divisée par 4.','est multipliée par 2.','ne change pas.'],'√(4n) = 2√n, donc 2/√(4n) = (2/√n)/2 : la précision s’améliore comme √n, pas comme n.']];
const gSp3LLN=()=>{const[q,ok,bad,why]=pick(SP3_LLN);
  return mcq('Choisis la bonne réponse.',stx(q),[{h:ok,ok:true},...bad.map(h=>({h}))],why,'Pense à la loi des grands nombres : « le plus souvent proche », pas « exactement égal ».')};

const gSp3Cond=()=>{const v=R(0,3);let n,p;
  if(v===0){n=R(18,29);p=pick([.3,.4,.5,.6,.7])}
  else if(v===1){n=pick([40,50,60,80,100]);p=pick([.01,.02,.03,.04,.05]);if(n*p>=5)p=.02}
  else if(v===2){n=pick([40,50,60,80,100]);p=pick([.95,.96,.97,.98]);if(n*(1-p)>=4.99)p=.97}
  else{n=pick([50,80,100,200,500]);p=pick([.1,.2,.3,.5,.7,.8])}
  const np=+(n*p).toFixed(2),nq2=+(n*(1-p)).toFixed(2);
  const o=[{h:'Oui, les trois conditions sont vérifiées.',ok:v===3},{h:'Non : n < 30.',ok:v===0},{h:'Non : np < 5.',ok:v===1},{h:'Non : n(1 − p) < 5.',ok:v===2}].map(x=>x.ok?x:Object.assign(x,{tag:'sp3-cond'}));
  return mcq('Peut-on utiliser l’intervalle de fluctuation asymptotique ?',mx(`n = ${n} ; p = ${num(p)}`),o,
    `n = ${n} ${n>=30?'≥':'<'} 30 ; np = ${num(np)} ${np>=5?'≥':'<'} 5 ; n(1 − p) = ${num(nq2)} ${nq2>=5?'≥':'<'} 5. ${v===3?'Tout est vérifié.':'Une condition n’est pas remplie : l’approximation normale n’est pas fiable.'}`,
    'Vérifie les trois conditions : n ≥ 30, np ≥ 5, n(1 − p) ≥ 5.',true)};

const SP3_VS=[
  ['Une urne contient 30 % de boules blanches. On tire 100 boules avec remise. Dans quel intervalle la fréquence de blanches tombera-t-elle avec une probabilité de 0,95 ?','fl'],
  ['Une machine est réglée pour produire 2 % de pièces défectueuses. Sur 400 pièces prélevées, on en trouve 15 défectueuses. La machine est-elle bien réglée ?','dec'],
  ['On interroge 900 clients au hasard : 612 se disent satisfaits. Quelle est la proportion de clients satisfaits dans l’ensemble de la clientèle ?','conf'],
  ['On veut savoir si un dé est équilibré : on le lance 600 fois et on compte les 6.','dec'],
  ['Un institut interroge 1000 électeurs pour connaître les intentions de vote, inconnues, en faveur d’un candidat.','conf'],
  ['On sait que 51 % des naissances sont des garçons. Dans une maternité qui compte 200 naissances, entre quelles fréquences de garçons peut-on s’attendre à se trouver 95 fois sur 100 ?','fl'],
  ['Un laboratoire affirme que son vaccin protège 90 % des personnes. Sur 250 personnes vaccinées, 210 sont protégées. Peut-on mettre en doute cette affirmation ?','dec'],
  ['Sur 500 poissons pêchés au hasard dans un lac, 85 sont malades. On veut estimer la proportion de poissons malades du lac.','conf']];
const gSp3Vs=()=>{const[t,c]=pick(SP3_VS);
  const o=[{h:'Échantillonnage : intervalle de fluctuation, p est connue',ok:c==='fl'},{h:'Prise de décision : on teste une valeur supposée de p',ok:c==='dec'},{h:'Estimation : intervalle de confiance, p est inconnue',ok:c==='conf'}].map(x=>x.ok?x:Object.assign(x,{tag:'sp3-if-ic'}));
  return mcq('Quelle démarche correspond à cette situation ?',stx(t),o,
    c==='fl'?'La proportion p est connue : on prédit la fréquence d’un échantillon avec l’intervalle de fluctuation centré sur p.':c==='dec'?'Une valeur de p est annoncée (supposée) : on calcule l’intervalle de fluctuation autour de cette valeur et on regarde si la fréquence observée y est.':'p est inconnue : on part de la fréquence observée f et on l’estime par l’intervalle de confiance [f − 1/√n ; f + 1/√n].',
    'Demande-toi d’abord : la proportion p de la population est-elle connue, supposée ou inconnue ?',true)};

const gSp3IF=()=>{const p=pick([.1,.2,.25,.3,.4,.45,.5,.6,.7,.75]),n=pick([50,80,100,200,400,500,1000]),m=1.96*Math.sqrt(p*(1-p)/n);
  return nq({instr:'Calcule l’intervalle de fluctuation asymptotique au seuil 0,95 de la fréquence.',prompt:stx(`Dans une population, la proportion d’un caractère est p = ${num(p)}. On prélève un échantillon de taille n = ${n}.`),labels:['Borne inf. =','Borne sup. ='],t:[p-m,p+m],dp:3,tol:.002,
    explain:`Conditions : n = ${n} ≥ 30, np = ${num(+(n*p).toFixed(2))} ≥ 5, n(1 − p) = ${num(+(n*(1-p)).toFixed(2))} ≥ 5. Demi-largeur : 1,96 × √(${num(p)} × ${num(+(1-p).toFixed(2))} / ${n}) ≈ ${SP3_d(m,4)}. I = [${SP3_d(p-m)} ; ${SP3_d(p+m)}].`,
    hint:'I = [p − 1,96 √(p(1 − p)/n) ; p + 1,96 √(p(1 − p)/n)].',
    diag:([u,w])=>near(u,p-1/Math.sqrt(n),.003)?'sp3-if-ic':near(u,p-1.96*p*(1-p)/n,.003)||near(u,p-1.96*Math.sqrt(p*(1-p))/n,.003)?'ic':null})};

const gSp3IC=()=>{const n=pick([100,400,625,900,1000,1600,2500]),k=R(Math.round(.25*n),Math.round(.75*n)),f=k/n,m=1/Math.sqrt(n);
  return nq({instr:'Calcule l’intervalle de confiance au niveau 0,95 de la proportion, avec la formule f ± 1/√n.',prompt:stx(`Dans un échantillon de ${n} personnes choisies au hasard, ${k} ont le caractère étudié.`),labels:['Borne inf. =','Borne sup. ='],t:[f-m,f+m],dp:3,tol:.002,
    explain:`f = ${k}/${n} ≈ ${SP3_d(f,4)}. Conditions : n ≥ 30, nf = ${k} ≥ 5, n(1 − f) = ${n-k} ≥ 5. 1/√${n} ≈ ${SP3_d(m,4)}. IC = [${SP3_d(f-m)} ; ${SP3_d(f+m)}].`,
    hint:'Calcule f = k/n, puis [f − 1/√n ; f + 1/√n].',diag:([u,w])=>near(u,f-1/n,.003)?'ic':near(u,f-2/Math.sqrt(n),.003)?'sp3-taille':null})};

const gSp3N=()=>{const v=R(0,1),a=pick([.02,.03,.04,.05,.06,.08,.1]);
  if(v===0){const raw=4/(a*a),N=Math.ceil(raw-1e-9);
    return nq({instr:'Combien de personnes faut-il interroger au minimum ?',prompt:stx(`On veut estimer une proportion au niveau de confiance 0,95 par un intervalle d’amplitude (longueur) au plus ${num(a)}.`),labels:['n ='],t:[N],
      explain:`L’amplitude de [f − 1/√n ; f + 1/√n] est 2/√n. 2/√n ≤ ${num(a)} ⟺ √n ≥ ${num(+(2/a).toFixed(3))} ⟺ n ≥ ${dec(raw,2)}. Il faut au moins ${N} personnes.`,
      hint:'Amplitude 2/√n ≤ a, donc n ≥ 4/a² ; arrondis à l’entier supérieur.',diag:([u])=>near(u,Math.ceil(1/(a*a)-1e-9),1e-6)||near(u,Math.ceil(2/(a*a)-1e-9),1e-6)?'sp3-taille':near(u,Math.floor(raw),1e-6)?'arrondi':null})}
  const raw=1/(a*a),N=Math.ceil(raw-1e-9);
  return nq({instr:'Combien de personnes faut-il interroger au minimum ?',prompt:stx(`On veut estimer une proportion au niveau de confiance 0,95 avec une marge d’erreur (demi-amplitude 1/√n) d’au plus ${num(a)}.`),labels:['n ='],t:[N],
    explain:`1/√n ≤ ${num(a)} ⟺ √n ≥ ${num(+(1/a).toFixed(3))} ⟺ n ≥ ${dec(raw,2)}. Il faut au moins ${N} personnes.`,
    hint:'1/√n ≤ e, donc n ≥ 1/e² ; arrondis à l’entier supérieur.',diag:([u])=>near(u,Math.ceil(4/(a*a)-1e-9),1e-6)?'sp3-taille':near(u,Math.floor(raw),1e-6)?'arrondi':null})};

/* Raisonnement 7 : prise de décision (d’après le fabricant d’alarmes) */
const gSp3R7=()=>{const c=pick([['Un fabricant commande autant de composants de type A que de type B. Il contrôle {n} composants livrés et compte ceux de type A.',.5],
    ['Un fournisseur affirme que {P} % de ses graines germent. Sur {n} graines semées, on compte celles qui germent.',null],
    ['Une entreprise annonce que {P} % de ses clients sont satisfaits. On interroge {n} clients au hasard et on compte les satisfaits.',null]]);
  const p0=c[1]||pick([.2,.25,.3,.4,.6,.7,.8]),n=pick([50,80,100,200,400]),sd=Math.sqrt(p0*(1-p0)/n),t=pick([-3,-2.6,-1.4,-.6,.5,1.2,2.5,3.1]),k=Math.min(n-1,Math.max(1,Math.round(n*(p0+t*sd)))),f=k/n,m=1.96*sd;
  const ctx=c[0].replace('{n}',n).replace('{P}',Math.round(p0*100));
  const I=(lo,hi)=>`[${SP3_d(lo)} ; ${SP3_d(hi)}]`;
  return chain({instr:'Prends une décision, en construisant ton raisonnement.',prompt:stx(`${ctx} On en trouve ${k}. Au seuil de 0,95, l’affirmation est-elle compatible avec l’échantillon ?`),
    steps:[
      {q:'Hypothèse et fréquence observée :',o:[
        {h:`p = ${num(p0)} et f = ${k}/${n} = ${num(+f.toFixed(4))}`,ok:true,f:f},
        {h:`p = ${num(+f.toFixed(4))} et f = ${num(p0)}`,why:'L’hypothèse porte sur la population (p) ; la fréquence f est celle observée dans l’échantillon.',tag:'sp3-if-ic',f:p0},
        {h:`p = ${num(p0)} et f = ${k}/${n-k} ≈ ${SP3_d(k/(n-k))}`,why:'La fréquence est k ÷ n (effectif total), pas k ÷ (n − k).',tag:'calc',f:k/(n-k)}]},
      {q:'Les conditions d’application :',o:[
        {h:`n = ${n} ≥ 30, np = ${num(+(n*p0).toFixed(2))} ≥ 5, n(1 − p) = ${num(+(n*(1-p0)).toFixed(2))} ≥ 5 : vérifiées`,ok:true},
        {h:'Inutile de les vérifier : la proportion p est donnée.',why:'Les conditions servent à justifier l’approximation par la loi normale ; on les vérifie toujours.',tag:'sp3-cond'},
        {h:`Non vérifiées, car f est différente de ${num(p0)}.`,why:'Les conditions portent sur n et p, pas sur l’écart entre f et p.',tag:'sp3-cond'}]},
      {q:'L’intervalle de fluctuation asymptotique au seuil 0,95 est…',o:[
        {h:mx(`p ± 1,96√(p(1 − p)/n) ≈ ${I(p0-m,p0+m)}`),ok:true,lo:p0-m,hi:p0+m},
        {h:mx(`f ± 1/√n ≈ ${I(f-1/Math.sqrt(n),f+1/Math.sqrt(n))}`),why:'C’est un intervalle de confiance, centré sur f. Pour tester une hypothèse sur p, on centre sur p.',tag:'sp3-if-ic',lo:f-1/Math.sqrt(n),hi:f+1/Math.sqrt(n)},
        {h:mx(`p ± 1,96 p(1 − p)/n ≈ ${I(p0-1.96*p0*(1-p0)/n,p0+1.96*p0*(1-p0)/n)}`),why:'Il manque la racine carrée : 1,96 × √(p(1 − p)/n).',tag:'ic',lo:p0-1.96*p0*(1-p0)/n,hi:p0+1.96*p0*(1-p0)/n}]},
      {q:'Décision :',o:prev=>{const ff=prev[0].f,lo=prev[2].lo,hi=prev[2].hi,inI=ff>=lo&&ff<=hi;return[
        {h:'f est dans l’intervalle : on accepte l’hypothèse.',ok:inI,why:inI?'':'f n’est pas dans l’intervalle choisi : il faut rejeter l’hypothèse.',tag:'test'},
        {h:'f est hors de l’intervalle : on rejette l’hypothèse (risque d’erreur d’environ 5 %).',ok:!inI,why:'f est dans l’intervalle choisi : on ne peut pas rejeter l’hypothèse.',tag:'test'},
        {h:inI?'f est dans l’intervalle : l’hypothèse est donc prouvée vraie.':'f est hors de l’intervalle, mais de peu : on accepte quand même.',why:inI?'On ne prouve rien : l’échantillon est seulement compatible avec l’hypothèse.':'La règle ne connaît pas « de peu » : hors de l’intervalle, on rejette.',tag:'test'}]}}],
    explain:`Hypothèse p = ${num(p0)} ; f = ${k}/${n} ≈ ${SP3_d(f,4)}. Conditions vérifiées. I = [p − 1,96√(p(1 − p)/n) ; p + 1,96√(p(1 − p)/n)] ≈ ${I(p0-m,p0+m)}. ${f>=p0-m&&f<=p0+m?'f ∈ I : on accepte l’hypothèse (sans l’avoir prouvée).':'f ∉ I : on rejette l’hypothèse, avec un risque d’environ 5 % de se tromper.'}`,
    hint:'Intervalle de fluctuation centré sur la proportion supposée p, puis regarde si f y est.'})};

/* Raisonnement 8 : intervalle de confiance et conclusion (d’après le sondage entre les deux tours) */
const gSp3R8=()=>{const n=pick([400,625,900,1052,1600,2500]),t=pick([-2.6,-1.6,-.5,.4,1.6,2.6]),k=Math.round(n*(.5+t/Math.sqrt(n))),f=k/n,m=1/Math.sqrt(n);
  const I=(lo,hi)=>`[${SP3_d(lo)} ; ${SP3_d(hi)}]`;
  return chain({instr:'Estime la proportion et conclus, en construisant ton raisonnement.',prompt:stx(`Un institut interroge ${n} électeurs choisis au hasard : ${k} déclarent vouloir voter pour la candidate A. Peut-on penser, au niveau de confiance 0,95, qu’elle obtiendra la majorité (plus de 50 % des voix) ?`),
    steps:[
      {q:'Fréquence observée :',o:[
        {h:`f = ${k}/${n} ≈ ${SP3_d(f,4)}`,ok:true,f:f},
        {h:`f = ${k}/${n-k} ≈ ${SP3_d(k/(n-k),4)}`,why:'La fréquence est k ÷ n.',tag:'calc',f:k/(n-k)},
        {h:'f = 0,5',why:'0,5 est le seuil de la majorité, pas la fréquence observée.',tag:'sp3-if-ic',f:.5}]},
      {q:'Conditions d’application :',o:[
        {h:`n = ${n} ≥ 30, nf = ${k} ≥ 5, n(1 − f) = ${n-k} ≥ 5 : vérifiées`,ok:true},
        {h:'Impossible à vérifier puisque p est inconnue : on ne peut pas conclure.',why:'Quand p est inconnue, on vérifie les conditions avec la fréquence observée f.',tag:'sp3-cond'},
        {h:'Il suffit que n ≥ 30.',why:'Il faut aussi nf ≥ 5 et n(1 − f) ≥ 5.',tag:'sp3-cond'}]},
      {q:'Intervalle de confiance au niveau 0,95 :',o:prev=>{const ff=prev[0].f;return[
        {h:mx(`f ± 1/√n ≈ ${I(ff-m,ff+m)}`),ok:true,lo:ff-m,hi:ff+m},
        {h:mx(`f ± 1/n ≈ ${I(ff-1/n,ff+1/n)}`),why:'La marge est 1/√n, pas 1/n : la précision ne croît que comme √n.',tag:'ic',lo:ff-1/n,hi:ff+1/n},
        {h:mx(`0,5 ± 1/√n ≈ ${I(.5-m,.5+m)}`),why:'L’intervalle de confiance est centré sur la fréquence observée f, pas sur une valeur testée.',tag:'sp3-if-ic',lo:.5-m,hi:.5+m}]}},
      {q:'Conclusion :',o:prev=>{const lo=prev[2].lo,hi=prev[2].hi,r=lo>.5?'up':hi<.5?'down':'mid';return[
        {h:'L’intervalle est entièrement au-dessus de 0,5 : la majorité est très probable.',ok:r==='up',why:'Ce n’est pas le cas de l’intervalle obtenu.',tag:'sp3-if-ic'},
        {h:'L’intervalle est entièrement au-dessous de 0,5 : la majorité est peu probable.',ok:r==='down',why:'Ce n’est pas le cas de l’intervalle obtenu.',tag:'sp3-if-ic'},
        {h:'L’intervalle contient 0,5 : on ne peut pas conclure.',ok:r==='mid',why:'0,5 n’est pas dans l’intervalle obtenu : on peut conclure.',tag:'sp3-if-ic'},
        {h:`f ${f>.5?'>':'<'} 0,5 suffit : ${f>.5?'elle est sûre de gagner':'elle est sûre de perdre'}.`,why:'Un seul échantillon ne donne aucune certitude : c’est tout l’intervalle de confiance qu’il faut comparer à 0,5.',tag:'sp3-if-ic'}]}}],
    explain:`f = ${k}/${n} ≈ ${SP3_d(f,4)} ; conditions vérifiées avec f. IC = [f − 1/√n ; f + 1/√n] ≈ ${I(f-m,f+m)}. ${f-m>.5?'Il est entièrement au-dessus de 0,5 : la majorité est très probable (niveau 0,95).':f+m<.5?'Il est entièrement au-dessous de 0,5 : la majorité est peu probable.':'Il contient 0,5 : on ne peut pas conclure.'}`,
    hint:'Construis l’intervalle de confiance autour de f, puis situe 0,5 par rapport à lui.'})};

/* Raisonnement 9 : taille d’échantillon (d’après le constructeur automobile) */
const gSp3R9=()=>{const a=pick([.02,.03,.04,.05,.06,.07,.08,.1]);
  const forms={ok:{L:'2/√n',N:4/(a*a)},h:{L:'1/√n',N:1/(a*a)},n:{L:'2/n',N:2/a},z:{L:'1,96/√n',N:(1.96/a)**2}};
  return chain({instr:'Trouve la taille d’échantillon, en construisant ton raisonnement.',prompt:stx(`Un institut veut estimer la proportion de clients satisfaits au niveau de confiance 0,95, avec un intervalle de confiance d’amplitude (longueur) au plus ${num(a)}. Combien de clients doit-il interroger au minimum ?`),
    steps:[
      {q:'L’amplitude de l’intervalle [f − 1/√n ; f + 1/√n] est…',o:[
        {h:mx('2/√n'),ok:true,c:'ok'},
        {h:mx('1/√n'),why:'1/√n est la demi-amplitude : de f − 1/√n à f + 1/√n, il y a 2/√n.',tag:'sp3-taille',c:'h'},
        {h:mx('2/n'),why:'La marge est en 1/√n, pas en 1/n.',tag:'sp3-taille',c:'n'},
        {h:mx('1,96/√n'),why:'Dans la formule simplifiée f ± 1/√n, la longueur vaut 2/√n.',tag:'sp3-taille',c:'z'}]},
      {q:'On résout l’inéquation…',o:prev=>{const c=prev[0].c;return Object.entries(forms).map(([key,F])=>({h:mx(`${F.L} ≤ ${num(a)} ⟺ n ≥ ${dec(F.N,2)}`),ok:key===c,c:key,why:'Cette inéquation ne correspond pas à l’amplitude choisie à l’étape précédente.',tag:'sp3-taille'}))
        .concat([{h:mx(`${forms[c].L} ≤ ${num(a)} ⟺ n ≤ ${dec(forms[c].N,2)}`),c:c,why:'En passant à l’inverse (nombres positifs), l’inégalité change de sens : n ≥ …',tag:'ineq-flip'}])}},
      {q:'La taille minimale est donc…',o:prev=>{const N=forms[prev[1].c].N,C=Math.ceil(N-1e-9);return[
        {h:`n = ${C}`,ok:true},
        {h:`n = ${C-1}`,why:`${C-1} est trop petit : l’inégalité n ≥ ${dec(N,2)} n’est pas vérifiée.`,tag:'arrondi'},
        {h:`n = ${C+1}`,why:`${C} vérifie déjà l’inégalité : ${C+1} n’est pas le minimum.`,tag:'arrondi'}]}}],
    explain:`Amplitude 2/√n ≤ ${num(a)} ⟺ √n ≥ ${num(+(2/a).toFixed(3))} ⟺ n ≥ 4/${num(a)}² ≈ ${dec(4/(a*a),2)}. L’institut doit interroger au moins ${Math.ceil(4/(a*a)-1e-9)} clients.`,
    hint:'Amplitude = 2/√n ; isole n puis arrondis à l’entier supérieur.'})};

/* =================== Chapitres =================== */
ANA_UNITS.push(
  {id:'sp-loisd',tr:'sp',src:'Lois discrètes : Bernoulli, binomiale, géométrique',name:'Lois discrètes',sub:'Uniforme, Bernoulli, binomiale, géométrique',glyph:'B(n;p)',tone:'c',w:'wBin',
   w2:[['Le triangle de Pascal','wPascal','Fais grandir le triangle : chaque nombre est la somme des deux au-dessus, et la ligne n donne les C(n ; k).'],
       ['Arbre de probabilités','wTree','Modifie les probabilités des branches et observe comment se calcule la probabilité d’un chemin.']],
   skills:[SKA('sp.ld.unif','Loi uniforme discrète',gSp3Unif,1),SKA('sp.ld.rep','Expériences indépendantes répétées',gSp3Rep,1),
     SKA('sp.ld.bern','Loi de Bernoulli',gSp3Bern,1),SKA('sp.ld.coef','Coefficients binomiaux',gSp3Coef,1),
     SKA('sp.ld.law','Reconnaître une loi binomiale',gVaLaw,1),SKA('sp.ld.binp','Calculer P(X = k)',gVaBinP,2),
     SKA('sp.ld.binev','Espérance et variance binomiales',gVaBinEV,2),SKA('sp.ld.geo','Loi géométrique',gSp3Geo,2),
     SKA('sp.ld.r1','Raisonner : loi binomiale complète',gSp3R1,2),SKA('sp.ld.r2','Raisonner : au moins un succès',gSp3R2,3),
     SKA('sp.ld.r3','Raisonner : absence de mémoire',gSp3R3,3)]},
  {id:'sp-loisc',tr:'sp',src:'Lois à densité : uniforme, exponentielle, normale',name:'Lois à densité',sub:'Densité, uniforme, exponentielle, normale, Moivre-Laplace',glyph:'∫f',tone:'x',w:'wNorm',
   w2:[['Théorème central limite','wCLT','Augmente la taille des échantillons : l’histogramme prend la forme d’une cloche, comme le prédit Moivre-Laplace.']],
   skills:[SKA('sp.lc.dens','Trouver une densité',gSp3Dens,1),SKA('sp.lc.unif','Loi uniforme continue',gLnUnif,1),
     SKA('sp.lc.uev','Espérance et variance uniformes',gSp3UEV,1),SKA('sp.lc.z','Centrer et réduire',gLnZ,1),
     SKA('sp.lc.rule','Règle des 1, 2, 3 sigmas',gLnRule,1),SKA('sp.lc.exp','Loi exponentielle',gSp3Exp,2),
     SKA('sp.lc.expe','Durée de vie moyenne',gSp3ExpE,2),SKA('sp.lc.phi','Utiliser Φ',gLnPhi,2),
     SKA('sp.lc.r1','Raisonner : composant sans vieillissement',gSp3R4,3),SKA('sp.lc.r2','Raisonner : retrouver μ ou σ',gSp3R5,3),
     SKA('sp.lc.r3','Raisonner : Moivre-Laplace',gSp3R6,3)]},
  {id:'sp-echa',tr:'sp',src:'Échantillonnage et estimation',name:'Échantillonnage et estimation',sub:'Fluctuation, décision, intervalle de confiance',glyph:'f±',tone:'sq',w:'wCI',
   w2:[['Loi des grands nombres','wLLN','Lance des centaines de fois : la fréquence se stabilise autour de la probabilité, sans jamais être garantie égale.']],
   skills:[SKA('sp.ec.lln','Loi des grands nombres',gSp3LLN,1),SKA('sp.ec.vs','Fluctuation, décision ou confiance ?',gSp3Vs,1),
     SKA('sp.ec.cond','Conditions d’application',gSp3Cond,1),SKA('sp.ec.if','Intervalle de fluctuation',gSp3IF,2),
     SKA('sp.ec.ic','Intervalle de confiance',gSp3IC,2),SKA('sp.ec.n','Taille d’échantillon',gSp3N,2),
     SKA('sp.ec.icp','IC avec 1,96 √(f(1 − f)/n)',gEsIcp,3),
     SKA('sp.ec.r1','Raisonner : prendre une décision',gSp3R7,2),SKA('sp.ec.r2','Raisonner : estimer et conclure',gSp3R8,3),
     SKA('sp.ec.r3','Raisonner : taille d’échantillon',gSp3R9,2)]});
