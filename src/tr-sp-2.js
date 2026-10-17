/* ===================== Parcours Statistiques et probabilités — partie 2 =====================
   Dénombrement (Tcombi), probabilités et conditionnement (Tproba), variables aléatoires (Tva).
   Préfixes : fonctions gSp2…, outils sp2…, constantes SP2_…, étiquettes d’erreur 'sp2-…'. */
Object.assign(ANA_ERR,{
  'sp2-incl':{label:'Éléments comptés deux fois',tip:'Si deux ensembles ne sont pas disjoints, Card(A ∪ B) = Card(A) + Card(B) − Card(A ∩ B) : découpe la situation en parties disjointes (diagramme).'},
  'sp2-pascal':{label:'Coefficients binomiaux',tip:'C(n ; k) = C(n ; n − k), C(n ; k) + C(n ; k + 1) = C(n + 1 ; k + 1), et la somme d’une ligne du triangle vaut 2<sup>n</sup>.'},
  'sp2-parties':{label:'Nombre de parties',tip:'Chaque élément est pris ou laissé : 2 × 2 × … × 2 = 2<sup>n</sup> parties, partie vide comprise.'},
  'sp2-equi':{label:'Issues favorables ÷ issues totales',tip:'En situation d’équiprobabilité, P(A) = nombre d’issues favorables ÷ nombre total d’issues (pas ÷ nombre d’issues défavorables).'},
  'sp2-tree':{label:'Lecture d’un arbre pondéré',tip:'Le long d’un chemin, on multiplie les probabilités ; un événement atteint par plusieurs chemins a pour probabilité la somme de ces chemins.'},
  'sp2-strict':{label:'Inégalité large ou stricte',tip:'P(X ≤ a) contient la valeur a, P(X &lt; a) ne la contient pas : vérifie si la borne compte.'},
  'sp2-sum':{label:'Somme de variables aléatoires',tip:'E(X + Y) = E(X) + E(Y) toujours. V(X + Y) = V(X) + V(Y) seulement si X et Y sont indépendantes ; et alors V(X − Y) = V(X) + V(Y).'},
  'sp2-moy':{label:'Moyenne d’un échantillon',tip:'E(M<sub>n</sub>) = E(X), V(M<sub>n</sub>) = V(X) ÷ n et σ(M<sub>n</sub>) = σ(X) ÷ √n : la racine porte sur n.'},
  'sp2-bt':{label:'Bienaymé-Tchebychev et concentration',tip:'P(|X − E(X)| ≥ δ) ≤ V(X) ÷ δ² et P(|M<sub>n</sub> − E(X)| ≥ δ) ≤ V(X) ÷ (nδ²). N’oublie pas le carré de δ.'}
});

/* ---------- outils ---------- */
const sp2I=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');                       // 479 001 600
const sp2F=(p,q)=>{if(q<0){p=-p;q=-q}const g=gcd(p,q);p/=g;q/=g;return q===1?num(p):(p<0?MINUS:'')+fr(Math.abs(p),q)};  // fraction simplifiée (HTML)
const sp2S=(p,q)=>{if(q<0){p=-p;q=-q}const g=gcd(p,q);p/=g;q/=g;return q===1?String(p):`${p}/${q}`};                   // fraction pour le moteur
const sp2Rat=v=>{for(let d=1;d<=5000;d++){const n=Math.round(v*d);if(Math.abs(v*d-n)<1e-7)return[n,d]}return null};
const sp2Fv=v=>{const r=sp2Rat(v);return r&&r[1]<=1000?sp2F(r[0],r[1]):dec(v,4)};
const sp2p=v=>num(+(+v).toFixed(4));
const sp2N=(o,ans)=>{const q=nq(o);if(ans)q.ans=ans;return q};
/* Dernière étape d’un raisonnement : la bonne suite (t) + des distracteurs {v, why, tag}, formatés par fmt, sans doublon. */
const sp2Pick=(t,cands,fmt,n=4)=>{const out=[{h:fmt(t),ok:true,v:t}],seen=new Set([out[0].h]);
  for(const c of cands){const h=fmt(c.v);if(seen.has(h)||!Number.isFinite(c.v))continue;seen.add(h);out.push({h,v:c.v,why:c.why,tag:c.tag});if(out.length>=n)break}
  return out};

/* =============== Chapitre 1 : combinatoire et dénombrement =============== */
const SP2_VENN=[['élèves','suivent l’option latin','suivent l’option théâtre'],['adolescents','font du sport en club','jouent d’un instrument'],
  ['salariés','parlent anglais','parlent espagnol'],['clients','ont acheté un livre','ont acheté un disque']];
const gSp2Venn=()=>{const[who,A,B]=pick(SP2_VENN),c=R(2,9),a=c+R(3,15),b=c+R(3,15),d=R(1,12),N=a+b-c+d;
  const dec4=`Seulement « ${A.replace(/^\S+ /,'')} » : ${a} − ${c} = ${a-c} ; les deux : ${c} ; seulement « ${B.replace(/^\S+ /,'')} » : ${b} − ${c} = ${b-c}`;
  if(Math.random()<.5)return nq({instr:'Combien de personnes compte le groupe ?',prompt:stx(`Dans un groupe de ${who}, ${a} ${A}, ${b} ${B}, ${c} font les deux et ${d} ne font ni l’un ni l’autre.`),labels:['Effectif total ='],t:[N],
    explain:`Les deux ensembles ne sont pas disjoints : les ${c} personnes qui font les deux sont comptées dans ${a} et dans ${b}. On découpe en parties disjointes. ${dec4} ; aucun des deux : ${d}. Principe additif : ${a-c} + ${c} + ${b-c} + ${d} = ${N}.`,
    hint:'Dessine un diagramme à deux cercles et commence par la partie commune.',diag:([v])=>near(v,a+b+d,1e-6)||near(v,a+b+c+d,1e-6)?'sp2-incl':null});
  return nq({instr:'Combien de personnes ne font ni l’un ni l’autre ?',prompt:stx(`Un groupe compte ${N} ${who}. ${a} ${A}, ${b} ${B} et ${c} font les deux.`),labels:['Aucun des deux ='],t:[d],
    explain:`Personnes qui font au moins l’un des deux : ${a} + ${b} − ${c} = ${a+b-c} (on retire les ${c} comptées deux fois). Il reste ${N} − ${a+b-c} = ${d} personnes.`,
    hint:'Card(A ∪ B) = Card(A) + Card(B) − Card(A ∩ B), puis soustrais du total.',diag:([v])=>near(v,N-a-b,1e-6)||near(v,N-a-b-c,1e-6)?'sp2-incl':null})};

const SP2_SIT=[
  ['On compose un code de 4 chiffres sur un cadenas (un chiffre peut se répéter).','rep','Chaque molette offre 10 choix, l’ordre compte et les répétitions sont permises : 10<sup>4</sup> codes.'],
  ['On forme des « mots » de 3 lettres toutes différentes avec les 26 lettres de l’alphabet.','arr','L’ordre des lettres compte et elles sont toutes distinctes : 26 × 25 × 24 arrangements.'],
  ['On compte les anagrammes du mot « MDR ».','perm','On réordonne toutes les lettres, chacune une fois : 3! = 6 permutations.'],
  ['On tire simultanément 3 jetons parmi 6 jetons marqués de lettres différentes.','comb','Un tirage simultané donne un paquet, sans ordre : C(6 ; 3) = 20 combinaisons.'],
  ['On établit le podium (or, argent, bronze) d’une course de 10 coureurs.','arr','Les trois places sont différentes (l’ordre compte) et un coureur n’occupe qu’une place : 10 × 9 × 8.'],
  ['On distribue une main de 5 cartes d’un jeu de 32 cartes.','comb','Dans une main, l’ordre d’arrivée des cartes ne compte pas : C(32 ; 5).'],
  ['On range 7 livres différents sur une étagère.','perm','On ordonne tous les livres : 7! = 5 040 permutations.'],
  ['On note les résultats de 5 lancers successifs d’un dé.','rep','L’ordre des lancers compte et un résultat peut revenir : 6<sup>5</sup> listes.'],
  ['On élit 4 délégués, sans distinction de poste, parmi 34 élèves.','comb','Les délégués ne sont pas distingués : seul le groupe compte, C(34 ; 4).'],
  ['On élit un président, un trésorier et un secrétaire parmi 12 membres.','arr','Les postes sont différents (l’ordre compte) et une personne n’occupe qu’un poste : 12 × 11 × 10.'],
  ['On tire successivement et avec remise 3 boules parmi 8 boules numérotées.','rep','Avec remise, une boule peut ressortir, et « successivement » fait compter l’ordre : 8<sup>3</sup>.'],
  ['On fait asseoir 5 personnes sur un banc de 5 places.','perm','Chacun a une place : on ordonne les 5 personnes, 5! = 120.']];
const SP2_MLAB={rep:'k-uplets (ordre, répétitions) : n<sup>k</sup>',arr:'Arrangements (ordre, sans répétition) : n! ÷ (n − k)!',perm:'Permutations (on ordonne tout) : n!',comb:'Combinaisons (sans ordre) : C(n ; k)'};
const gSp2Mod=()=>{const[t,c,why]=pick(SP2_SIT);
  return mcq('Quel modèle de dénombrement convient ?',stx(t),Object.keys(SP2_MLAB).map(k=>({h:SP2_MLAB[k],ok:k===c,tag:k==='rep'||c==='rep'?'comb-rep':'comb-order'})),why,
    'Pose-toi deux questions : l’ordre compte-t-il ? Un même élément peut-il revenir ?')};

const gSp2Pasc=()=>{const v=R(0,2);
  if(v===0){const n=R(15,60),j=pick([1,2]),k=n-j,t=Cnk(n,j);
    return nq({instr:'Calcule ce coefficient binomial sans calculatrice.',prompt:mx(`C(${n} ; ${k}) = ?`),labels:[`C(${n} ; ${k}) =`],t:[t],
      explain:`Par symétrie, C(${n} ; ${k}) = C(${n} ; ${n} − ${k}) = C(${n} ; ${j})${j===1?` = ${n}`:` = ${n} × ${n-1} ÷ 2 = ${t}`}. Choisir les ${k} éléments qu’on garde revient à choisir les ${j} qu’on laisse.`,
      hint:'Utilise la symétrie C(n ; k) = C(n ; n − k).',diag:([w])=>near(w,n*k,1e-6)||near(w,Ank(n,j),1e-6)?'sp2-pascal':null})}
  if(v===1){const n=R(4,12),k=R(1,n-2),a=Cnk(n,k),b=Cnk(n,k+1);
    return nq({instr:'Utilise la relation du triangle de Pascal.',prompt:stx(`On sait que C(${n} ; ${k}) = ${a} et C(${n} ; ${k+1}) = ${b}.`)+mx(`C(${n+1} ; ${k+1}) = ?`),labels:[`C(${n+1} ; ${k+1}) =`],t:[a+b],
      explain:`Relation de Pascal : C(n ; k) + C(n ; k + 1) = C(n + 1 ; k + 1). Donc C(${n+1} ; ${k+1}) = ${a} + ${b} = ${a+b}.`,
      hint:'Dans le triangle, chaque nombre est la somme du nombre au-dessus et de son voisin de gauche.',diag:([w])=>near(w,a*b,1e-6)||near(w,b-a,1e-6)?'sp2-pascal':null})}
  const n=R(3,12);
  return nq({instr:'Calcule la somme.',prompt:mx(`C(${n} ; 0) + C(${n} ; 1) + … + C(${n} ; ${n})`),labels:['Somme ='],t:[2**n],
    explain:`Cette somme compte toutes les parties d’un ensemble à ${n} éléments, rangées selon leur taille. Il y en a 2<sup>${n}</sup> = ${2**n} : chaque élément est pris ou laissé.`,
    hint:'Chaque élément est « dedans » ou « dehors » : 2 choix par élément.',diag:([w])=>near(w,n*n,1e-6)||near(w,fact(n),1e-6)||near(w,2*n,1e-6)?'sp2-pascal':null})};

const gSp2Part=()=>{const v=R(0,2),n=R(3,10),pz=Math.random()<.5;
  const ctx=pz?`Une pizzeria propose ${n} garnitures. Chaque client compose sa pizza en choisissant les garnitures qu’il veut, éventuellement aucune.`:`Un ensemble E contient ${n} éléments, dont l’élément a.`;
  const Q=[pz?'Combien de pizzas différentes peut-on composer ?':'Combien E a-t-il de parties (sous-ensembles) ?',
    pz?'Combien de pizzas ont au moins une garniture ?':'Combien E a-t-il de parties non vides ?',
    pz?'Combien de pizzas contiennent du fromage (l’une des garnitures) ?':'Combien de parties de E contiennent l’élément a ?'][v];
  const t=[2**n,2**n-1,2**(n-1)][v];
  return nq({instr:'Dénombre.',prompt:stx(ctx+' '+Q),labels:['Nombre ='],t:[t],
    explain:[`Pour chacun des ${n} éléments, deux choix : le prendre ou non. Principe multiplicatif : 2<sup>${n}</sup> = ${t} (la partie vide comprise).`,
      `Il y a 2<sup>${n}</sup> = ${2**n} parties en tout ; on retire la seule partie vide : ${2**n} − 1 = ${t}.`,
      `L’élément imposé est pris d’office ; pour les ${n-1} autres, deux choix chacun : 2<sup>${n-1}</sup> = ${t}.`][v],
    hint:'Chaque élément est pris ou laissé : 2 choix par élément.',diag:([w])=>near(w,n*n,1e-6)||near(w,2*n,1e-6)||near(w,fact(n),1e-6)||near(w,2**n,1e-6)?'sp2-parties':null})};

/* Raisonnement 1 : reconnaître le modèle, choisir la formule, compter, puis une probabilité */
const sp2Scen=()=>{const m=pick(['rep','arr','perm','comb']);
  if(m==='rep'){const[n,k,t]=pick([[10,R(3,5),'Un cadenas a {k} molettes portant chacune les chiffres 0 à 9. On cherche le nombre de codes possibles.'],[26,2,'Un code est formé de {k} lettres de l’alphabet, les répétitions étant permises. On cherche le nombre de codes.'],
      [6,R(2,4),'On lance un dé à six faces {k} fois de suite et on note la liste des résultats. On cherche le nombre de listes.'],[2,R(5,8),'Un questionnaire comporte {k} questions auxquelles on répond « oui » ou « non ». On cherche le nombre de façons de remplir le questionnaire.']]);
    return{m,n,k,t:t.replace(/\{k\}/g,k)}}
  if(m==='arr'){const n=R(8,15),k=R(2,4);
    return{m,n,k,t:pick([`Une course réunit ${n} coureurs et on récompense les ${k} premiers dans l’ordre d’arrivée. On cherche le nombre de classements possibles des ${k} premiers.`,`Fred doit rebrancher ${k} câbles de couleurs différentes sur ${n} prises libres, un câble par prise. On cherche le nombre de branchements possibles.`])}}
  if(m==='perm'){const n=R(4,8);return{m,n,k:n,t:pick([`${n} amis s’assoient sur un banc de ${n} places. On cherche le nombre de façons de s’asseoir.`,`On cherche le nombre d’anagrammes d’un mot de ${n} lettres toutes différentes.`])}}
  const n=R(10,30),k=R(2,4);return{m,n,k,t:pick([`Une classe de ${n} élèves élit ${k} délégués, sans distinction de poste. On cherche le nombre de résultats possibles.`,`On tire simultanément ${k} boules dans une urne de ${n} boules numérotées. On cherche le nombre de tirages possibles.`])}};
const sp2Why1=(c,m)=>({rep:'Ici, un même élément ne peut pas apparaître deux fois : il n’y a pas de répétition.',
  arr:m==='rep'?'Ici les répétitions sont possibles : les éléments ne sont pas forcément différents.':m==='perm'?'On range tous les éléments, pas seulement k d’entre eux : c’est le cas particulier k = n, la permutation.':'L’ordre ne compte pas ici : seul le groupe choisi importe.',
  perm:m==='rep'?'On ne range pas tous les éléments une fois chacun : les répétitions sont permises.':m==='arr'?'On ne prend que k éléments parmi n, pas tous.':'On ne range pas tous les éléments, et l’ordre ne compte pas.',
  comb:'L’ordre compte ici : deux listes dans un ordre différent sont deux résultats différents.'})[c];
const gSp2CbR1=()=>{const S0=sp2Scen(),{m,n,k}=S0;
  const val={rep:n**k,arr:Ank(n,k),perm:fact(n),comb:Cnk(n,k)},fml={rep:`${n}<sup>${k}</sup>`,arr:`${n}! ÷ (${n} − ${k})!`,perm:`${n}!`,comb:`C(${n} ; ${k})`},
    desc={rep:'les listes ordonnées avec répétitions',arr:'les listes ordonnées sans répétition',perm:'les rangements de tous les éléments',comb:'les groupes sans ordre'};
  return chain({instr:'Construis ton raisonnement de dénombrement.',prompt:stx(S0.t),
    steps:[
      {q:'Un résultat possible est…',o:[
        {h:'une liste ordonnée où un même élément peut revenir',c:'rep'},{h:`une liste ordonnée de ${k===n?'k':k} éléments tous différents pris parmi ${n}`,c:'arr'},
        {h:`un rangement de tous les ${n} éléments`,c:'perm'},{h:'un groupe sans ordre d’éléments tous différents',c:'comb'}].map(o=>o.c===m?{...o,ok:true}:{...o,why:sp2Why1(o.c,m),tag:o.c==='rep'||m==='rep'?'comb-rep':'comb-order'})},
      {q:'Quelle formule de dénombrement utilises-tu ?',o:prev=>['rep','arr','perm','comb'].map(f=>({h:fml[f],f,ok:f===prev[0].c,why:`Cette formule compte ${desc[f]} : ce n’est pas le modèle retenu à l’étape 1.`,tag:'comb-order'}))},
      {q:'Le nombre de résultats possibles est donc…',o:prev=>['rep','arr','perm','comb'].map(f=>({h:`${fml[f]} = ${sp2I(val[f])}`,v:val[f],ok:f===prev[1].f,why:'Ce calcul n’applique pas la formule choisie à l’étape précédente.',tag:'calc'}))},
      {q:'Si l’on choisit un résultat au hasard, quelle est la probabilité de tomber sur un résultat précis ?',o:prev=>{const N=prev[2].v;return[
        {h:fr(1,sp2I(N)),ok:true},{h:fr(k,sp2I(N)),why:'Un seul résultat est le bon parmi tous les résultats équiprobables : 1 issue favorable.',tag:'sp2-equi'},
        {h:fr(1,n),why:`1/${n} serait la probabilité de deviner un seul élément, pas le résultat complet.`,tag:'sp2-equi'}]}}],
    explain:`Modèle : ${desc[m]}. Formule : ${fml[m]} = ${sp2I(val[m])}. Avec un choix au hasard, chaque résultat a la même probabilité, 1/${sp2I(val[m])}.`,
    hint:'Deux questions décident du modèle : l’ordre compte-t-il ? Un élément peut-il revenir ?'})};

/* Raisonnement 2 : compter par le complémentaire (contrainte « pas les deux ensemble ») */
const gSp2CbR2=()=>{const[E,B]=pick([['Emma','Bastien'],['Léa','Hugo'],['Inès','Malik'],['Chloé','Nathan']]),n=R(20,34),k=pick([3,4]);
  const T=Cnk(n,k),cnt={both:Cnk(n-2,k-2),or:Cnk(n,k)-Cnk(n-2,k),none:Cnk(n-2,k),only:Cnk(n-2,k-1)},
    fm={both:`C(${n-2} ; ${k-2})`,or:`C(${n} ; ${k}) − C(${n-2} ; ${k})`,none:`C(${n-2} ; ${k})`,only:`C(${n-2} ; ${k-1})`},
    what={both:`les groupes qui contiennent ${E} et ${B}`,or:`les groupes qui contiennent ${E} ou ${B} (au moins l’un des deux)`,none:`les groupes sans ${E} ni ${B}`,only:`les groupes avec ${E} mais sans ${B}`};
  return chain({instr:'Construis ton raisonnement.',prompt:stx(`Une classe de ${n} élèves élit ${k} délégués, sans distinction de poste. ${E} refuse d’être élue si ${B} est élu. Combien de résultats respectent ce souhait ?`),
    steps:[
      {q:'Sans contrainte, combien y a-t-il de groupes de délégués ?',o:[
        {h:`C(${n} ; ${k}) = ${sp2I(T)}`,ok:true,v:T},
        {h:`A(${n} ; ${k}) = ${sp2I(Ank(n,k))}`,v:Ank(n,k),why:'Les délégués ne sont pas distingués : l’ordre ne compte pas, on utilise une combinaison.',tag:'comb-order'},
        {h:`${n}<sup>${k}</sup> = ${sp2I(n**k)}`,v:n**k,why:'Un élève ne peut pas être élu deux fois et l’ordre ne compte pas : ce n’est pas n<sup>k</sup>.',tag:'comb-rep'}]},
      {q:'Quels groupes faut-il retirer de ce total ?',o:[
        {h:what.both,c:'both',ok:true},
        {h:what.or,c:'or',why:`${E} peut très bien être élue si ${B} ne l’est pas, et inversement : seuls les groupes avec les deux sont interdits.`},
        {h:what.none,c:'none',why:'Ces groupes respectent la contrainte : il ne faut surtout pas les retirer.'},
        {h:what.only,c:'only',why:`Ces groupes respectent la contrainte, puisque ${B} n’y est pas.`}]},
      {q:'Combien y a-t-il de groupes à retirer ?',o:prev=>['both','or','none','only'].map(c=>({h:`${fm[c]} = ${sp2I(cnt[c])}`,v:cnt[c],ok:c===prev[1].c,
        why:`Ce décompte ne correspond pas à ton choix de l’étape 2 : ${fm[c]} compte ${what[c]}.`,tag:'sp2-pascal'}))},
      {q:'Le nombre de résultats possibles est donc…',o:prev=>{const t=prev[0].v,r=prev[2].v;return[
        {h:`${sp2I(t)} − ${sp2I(r)} = ${sp2I(t-r)}`,ok:true},
        {h:`${sp2I(t)} + ${sp2I(r)} = ${sp2I(t+r)}`,why:'On retire les groupes interdits, on ne les ajoute pas.',tag:'calc'},
        {h:`${sp2I(r)}`,why:'C’est le nombre de groupes interdits, pas celui des groupes autorisés.',tag:'calc'},
        {h:`${sp2I(t)} − 2 × ${sp2I(r)} = ${sp2I(t-2*r)}`,why:'Chaque groupe interdit n’est retiré qu’une seule fois.',tag:'calc'}]}}],
    explain:`Sans contrainte : C(${n} ; ${k}) = ${sp2I(T)} groupes. Les groupes interdits contiennent ${E} et ${B} : on les place, puis on choisit les ${k-2} autres délégués parmi les ${n-2} élèves restants, soit C(${n-2} ; ${k-2}) = ${sp2I(cnt.both)}. Réponse : ${sp2I(T)} − ${sp2I(cnt.both)} = ${sp2I(T-cnt.both)}.`,
    hint:'Il est plus simple de compter les groupes interdits, puis de les retirer du total.'})};

/* Raisonnement 3 : places côte à côte (bloc) */
const gSp2CbR3=()=>{const n=R(6,12),g=R(2,4),[grp,nm]=pick([['physiciens','Les physiciens'],['amis','Les amis'],['frères et sœurs','Les frères et sœurs']]);
  const pos=n-g+1,ins=fact(g),oth=fact(n-g),T=pos*ins*oth;
  return chain({instr:'Construis ton raisonnement de dénombrement.',prompt:stx(`${n} personnes, dont ${g} ${grp}, prennent place sur une rangée de ${n} sièges. ${nm} veulent être assis côte à côte. Combien y a-t-il de façons de s’asseoir ?`),
    steps:[
      {q:`Combien de positions possibles pour le bloc des ${g} ${grp} ?`,o:[
        {h:`${pos} positions`,ok:true,v:pos},
        {h:`${n-g} positions`,v:n-g,why:`Le bloc peut commencer au siège 1, 2, …, jusqu’au siège ${n-g+1} : cela fait ${pos} positions, pas ${n-g}.`,tag:'calc'},
        {h:`${n} positions`,v:n,why:`Le bloc occupe ${g} sièges consécutifs : il ne peut pas commencer aux ${g-1} derniers sièges.`,tag:'calc'},
        {h:`C(${n} ; ${g}) = ${Cnk(n,g)} positions`,v:Cnk(n,g),why:'Les sièges du groupe doivent être consécutifs : on ne choisit pas des sièges quelconques.',tag:'comb-order'}]},
      {q:'À l’intérieur du bloc, combien d’ordres possibles ?',o:[
        {h:`${g}! = ${ins}`,ok:true,v:ins},{h:`${g}`,v:g,why:`On ordonne les ${g} membres du groupe : c’est une permutation, ${g}!.`,tag:'comb-mult'},
        {h:'1',v:1,why:'Les membres du groupe peuvent échanger leurs places dans le bloc.',tag:'comb-order'}]},
      {q:'Et pour les autres personnes ?',o:[
        {h:`(${n} − ${g})! = ${sp2I(oth)}`,ok:true,v:oth},
        {h:`(${n} − ${g} + 1)! = ${sp2I(fact(n-g+1))}`,v:fact(n-g+1),why:'Avec (n − g + 1)!, on traite le bloc comme une personne de plus : la position du bloc serait alors comptée deux fois avec l’étape 1.',tag:'comb-mult'},
        {h:`${n-g}`,v:n-g,why:`Il faut ordonner les ${n-g} autres personnes sur les sièges restants : (${n-g})!.`,tag:'comb-mult'},
        {h:`${n}! = ${sp2I(fact(n))}`,v:fact(n),why:'Les autres personnes n’occupent que les sièges laissés libres par le bloc.',tag:'comb-mult'}]},
      {q:'Le nombre total de façons de s’asseoir est…',o:prev=>{const[a,b,c]=prev.map(p=>p.v);return[
        {h:`${a} × ${sp2I(b)} × ${sp2I(c)} = ${sp2I(a*b*c)}`,ok:true},
        {h:`${a} + ${sp2I(b)} + ${sp2I(c)} = ${sp2I(a+b+c)}`,why:'Les choix sont successifs (position, ordre interne, autres personnes) : principe multiplicatif, on multiplie.',tag:'comb-mult'},
        {h:`${n}! = ${sp2I(fact(n))}`,why:`${n}! compte toutes les façons de s’asseoir, sans tenir compte du souhait du groupe.`,tag:'comb-order'}]}}],
    explain:`Le bloc a ${pos} positions (sièges 1 à ${g}, 2 à ${g+1}, …, ${n-g+1} à ${n}). Dans le bloc : ${g}! = ${ins} ordres. Les ${n-g} autres : (${n-g})! = ${sp2I(oth)}. Principe multiplicatif : ${pos} × ${ins} × ${sp2I(oth)} = ${sp2I(T)}.`,
    hint:'Décompose en choix successifs : où est le bloc ? dans quel ordre à l’intérieur ? comment se placent les autres ?'})};

/* =============== Chapitre 2 : probabilités et conditionnement =============== */
const gSp2Elem=()=>{const v=R(0,2);
  if(v===0){const c=[R(1,9),R(1,9),R(1,9)],noms=['verte','jaune','rouge'],i=R(0,2),T=sumA(c);
    return sp2N({instr:'Calcule la probabilité (valeur exacte).',prompt:stx(`Une urne contient ${c[0]} boules vertes, ${c[1]} boules jaunes et ${c[2]} boules rouges, indiscernables au toucher. On tire une boule au hasard. Quelle est la probabilité qu’elle soit ${noms[i]} ?`),
      labels:['P ='],t:[c[i]/T],explain:`Équiprobabilité : ${c[i]} issues favorables sur ${T} issues en tout. P = ${fr(c[i],T)}${gcd(c[i],T)>1?' = '+sp2F(c[i],T):''}.`,
      hint:'P = nombre d’issues favorables ÷ nombre total d’issues.',diag:([w])=>near(w,c[i]/(T-c[i]),1e-6)?'sp2-equi':null},[sp2S(c[i],T)])}
  if(v===1){const a=R(2,6),[ev,k]=pick([[`un nombre supérieur ou égal à ${a}`,7-a],['un nombre pair',3],['un multiple de 3',2],['un nombre premier',3],['un diviseur de 6',4]]);
    return sp2N({instr:'Calcule la probabilité (valeur exacte).',prompt:stx(`On lance un dé équilibré à six faces. Quelle est la probabilité d’obtenir ${ev} ?`),labels:['P ='],t:[k/6],
      explain:`Les 6 faces sont équiprobables et ${k} d’entre elles conviennent. P = ${fr(k,6)}${gcd(k,6)>1?' = '+sp2F(k,6):''}.`,hint:'Écris la liste des faces favorables, puis compte-les.',
      diag:([w])=>near(w,k/(6-k),1e-6)?'sp2-equi':null},[sp2S(k,6)])}
  const n=pick([8,10,12,14,16]),j=R(1,n-1);
  return sp2N({instr:'Calcule la probabilité (valeur exacte).',prompt:stx(`Une roue de loterie est partagée en ${n} secteurs identiques, dont ${j} sont jaunes. On fait tourner la roue. Quelle est la probabilité qu’elle s’arrête sur un secteur jaune ?`),labels:['P ='],t:[j/n],
    explain:`${j} secteurs favorables sur ${n} secteurs équiprobables : P = ${fr(j,n)}${gcd(j,n)>1?' = '+sp2F(j,n):''}.`,hint:'Les secteurs sont identiques : il y a équiprobabilité.',diag:([w])=>near(w,j/(n-j),1e-6)?'sp2-equi':null},[sp2S(j,n)])};

const gSp2Loi=()=>{const den=pick([12,15,20,24]);let w;do{w=[1,1,1,1,1];for(let s=0;s<den-5;s++)w[R(0,4)]++}while(Math.max(...w)>den/2);
  if(Math.random()<.55){const i=R(0,4),others=den-w[i];
    return sp2N({instr:'Complète la loi de probabilité (valeur exacte).',prompt:stx('On tire au hasard un jeton numéroté de 1 à 5. Voici la loi de probabilité :')+dtab([['Issue',1,2,3,4,5],['Probabilité',...w.map((x,j)=>j===i?'?':fr(x,den))]]),
      labels:[`P(${i+1}) =`],t:[w[i]/den],explain:`La somme des probabilités de toutes les issues vaut 1. Les autres probabilités totalisent ${fr(others,den)}, donc P(${i+1}) = 1 − ${fr(others,den)} = ${fr(w[i],den)}${gcd(w[i],den)>1?' = '+sp2F(w[i],den):''}.`,
      hint:'La somme des probabilités de toutes les issues est égale à 1.',diag:([x])=>near(x,others/den,1e-6)?'calc':null},[sp2S(w[i],den)])}
  const ev=pick([['tirer un numéro pair',[1,3]],['tirer un numéro impair',[0,2,4]],['tirer un numéro supérieur ou égal à 4',[3,4]]]),s=sumA(ev[1].map(j=>w[j]));
  return sp2N({instr:'Calcule la probabilité de l’événement (valeur exacte).',prompt:stx(`On tire au hasard un jeton numéroté de 1 à 5. Loi de probabilité ci-dessous. Quelle est la probabilité de ${ev[0]} ?`)+dtab([['Issue',1,2,3,4,5],['Probabilité',...w.map(x=>fr(x,den))]]),
    labels:['P ='],t:[s/den],explain:`L’événement est formé des issues ${ev[1].map(j=>j+1).join(' et ')} : on additionne leurs probabilités, ${ev[1].map(j=>fr(w[j],den)).join(' + ')} = ${fr(s,den)}${gcd(s,den)>1?' = '+sp2F(s,den):''}.`,
    hint:'La probabilité d’un événement est la somme des probabilités des issues qui le composent.',diag:([x])=>near(x,1-s/den,1e-6)?'proba-compl':null},[sp2S(s,den)])};

const SP2_RK32=['7','8','9','10','valet','dame','roi','as'],SP2_SU=['cœur','carreau','pique','trèfle'];
const SP2_EV=[['un cœur',c=>c.s==='cœur'],['une carte rouge',c=>c.s==='cœur'||c.s==='carreau'],['un pique',c=>c.s==='pique'],['une figure (valet, dame ou roi)',c=>['valet','dame','roi'].includes(c.r)],
  ['un roi',c=>c.r==='roi'],['un as',c=>c.r==='as'],['une carte noire',c=>c.s==='pique'||c.s==='trèfle'],['un valet ou un as',c=>c.r==='valet'||c.r==='as']];
const gSp2CondF=()=>{const big=Math.random()<.4,rk=big?['2','3','4','5','6',...SP2_RK32]:SP2_RK32,deck=[];rk.forEach(r=>SP2_SU.forEach(s=>deck.push({r,s})));const N=deck.length;
  let A,B,a,b,ab;do{A=pick(SP2_EV);B=pick(SP2_EV);a=deck.filter(A[1]).length;b=deck.filter(B[1]).length;ab=deck.filter(c=>A[1](c)&&B[1](c)).length}while(A===B||ab===0||ab===a);
  return sp2N({instr:'Calcule la probabilité conditionnelle (valeur exacte).',prompt:stx(`On tire une carte au hasard dans un jeu de ${N} cartes. A : « on tire ${A[0]} » ; B : « on tire ${B[0]} ».`)+mx('P<sub>A</sub>(B) = ?'),
    labels:['P<sub>A</sub>(B) ='],t:[ab/a],explain:`P(A) = ${fr(a,N)} et P(A ∩ B) = ${fr(ab,N)}. P<sub>A</sub>(B) = P(A ∩ B) ÷ P(A) = ${fr(ab,N)} ÷ ${fr(a,N)} = ${sp2F(ab,a)}. Intuitivement : parmi les ${a} cartes de A, ${ab} sont aussi dans B.`,
    hint:'P<sub>A</sub>(B) = P(A ∩ B) ÷ P(A) : on se restreint aux cartes de A.',diag:([x])=>near(x,ab/N,1e-6)||near(x,ab/b,1e-6)?'proba-cond':null},[sp2S(ab,a)])};

/* Raisonnement 1 : arbre pondéré et probabilités totales */
const SP2_TREE=[['l’élève est interne','l’élève fait du sport le mercredi'],['la pièce vient de l’usine 1','la pièce est défectueuse'],['le client vient en semaine','le client paie par carte'],['le jour est pluvieux','le bus est en retard']];
const gSp2PrR1=()=>{const[An,Bn]=pick(SP2_TREE),a=pick([4,5,6,7,8,9,11,12,13,14,15,16])*.05;let b,c;do{b=R(2,18)*.05;c=R(1,18)*.05}while(Math.abs(b-c)<1e-9||Math.abs(c-.5)<1e-9);
  const ab=a*b,nb=(1-a)*c;
  return chain({instr:'Calcule P(B) en construisant ton raisonnement sur l’arbre.',prompt:stx(`A : « ${An} » ; B : « ${Bn} ».`)+mx(`P(A) = ${sp2p(a)} ; P<sub>A</sub>(B) = ${sp2p(b)} ; P<sub>Ā</sub>(B) = ${sp2p(c)}`),
    steps:[
      {q:'Quels chemins de l’arbre mènent à B ?',o:[
        {h:'Deux chemins : A puis B, et Ā puis B',c:'two',ok:true},
        {h:'Un seul chemin : A puis B',c:'one',why:'B peut aussi se produire quand A ne se produit pas : le chemin Ā → B compte aussi.',tag:'sp2-tree'},
        {h:'Deux chemins : A puis B, et A puis B̄',c:'AB',why:'Le chemin A → B̄ aboutit à B̄, pas à B : on regarde où se terminent les chemins.',tag:'sp2-tree'}]},
      {q:'Probabilité du chemin A → B ?',o:[
        {h:`${sp2p(a)} × ${sp2p(b)} = ${sp2p(ab)}`,v:ab,ok:true},
        {h:`${sp2p(a)} + ${sp2p(b)} = ${sp2p(a+b)}`,v:a+b,why:'Le long d’un chemin, on multiplie : P(A ∩ B) = P(A) × P<sub>A</sub>(B).',tag:'sp2-tree'},
        {h:`${sp2p(b)}`,v:b,why:'P<sub>A</sub>(B) n’est que la probabilité de la seconde branche : il faut la multiplier par P(A).',tag:'proba-cond'}]},
      {q:'Probabilité du chemin Ā → B ?',o:[
        {h:`${sp2p(1-a)} × ${sp2p(c)} = ${sp2p(nb)}`,v:nb,ok:true},
        {h:`${sp2p(a)} × ${sp2p(c)} = ${sp2p(a*c)}`,v:a*c,why:'La première branche est Ā, de probabilité 1 − P(A).',tag:'proba-compl'},
        {h:`${sp2p(1-a)} × ${sp2p(1-c)} = ${sp2p((1-a)*(1-c))}`,v:(1-a)*(1-c),why:'La branche de probabilité 1 − P<sub>Ā</sub>(B) mène à B̄, pas à B.',tag:'sp2-tree'}]},
      {q:'Donc P(B) vaut…',o:prev=>{const u=prev[1].v,w=prev[2].v,k=prev[0].c==='one'?'one':'two',L=[
        {k:'two',h:`${sp2p(u)} + ${sp2p(w)} = ${sp2p(u+w)}`,why:'Tu n’as retenu qu’un chemin à l’étape 1 : ce total n’est pas cohérent avec ce choix.'},
        {k:'one',h:`${sp2p(u)}`,why:'Il manque le chemin Ā → B : B peut se produire sans A.',tag:'sp2-tree'},
        {k:'prod',h:`${sp2p(u)} × ${sp2p(w)} = ${sp2p(u*w)}`,why:'Les deux chemins sont incompatibles : on additionne leurs probabilités, on ne les multiplie pas.',tag:'sp2-tree'},
        {k:'bc',h:`${sp2p(b)} + ${sp2p(c)} = ${sp2p(b+c)}`,why:'On additionne les probabilités des chemins entiers, pas seulement celles des branches du second niveau.',tag:'proba-cond'}];
        return L.map(o=>({...o,ok:o.k===k}))}}],
    explain:`Deux chemins mènent à B. P(A ∩ B) = ${sp2p(a)} × ${sp2p(b)} = ${sp2p(ab)} et P(Ā ∩ B) = ${sp2p(1-a)} × ${sp2p(c)} = ${sp2p(nb)}. Formule des probabilités totales : P(B) = ${sp2p(ab)} + ${sp2p(nb)} = ${sp2p(ab+nb)}.`,
    hint:'On multiplie le long d’un chemin, on additionne les chemins qui mènent au même événement.'})};

/* Raisonnement 2 : dépistage et formule de Bayes */
const gSp2PrR2=()=>{const m=R(1,10)/100,se=R(80,99)/100,sp=R(90,99)/100,fp=+(1-sp).toFixed(2),[pop,mal]=pick([['bovins','porteur de la maladie'],['patients','atteint de la maladie'],['pièces','défectueuse']]);
  const PT=m*se+(1-m)*fp,ans=m*se/PT;
  return chain({instr:'Construis ton raisonnement pour interpréter un test positif.',prompt:stx(`Parmi des ${pop}, ${num(m*100)} % sont dans l’état M (« ${mal} »). Un test est positif (T) dans ${num(se*100)} % des cas quand l’état M est présent, et négatif dans ${num(sp*100)} % des cas quand il est absent. Un test est positif : quelle est la probabilité que l’état M soit présent ?`),
    steps:[
      {q:'Quelle probabilité cherche-t-on ?',o:[
        {h:'P<sub>T</sub>(M)',c:'TM',ok:true},
        {h:'P<sub>M</sub>(T)',c:'MT',why:'P<sub>M</sub>(T) est la probabilité d’un test positif sachant M : c’est une donnée de l’énoncé. On sait ici que le test est positif.',tag:'proba-cond'},
        {h:'P(M ∩ T)',c:'I',why:'P(M ∩ T) se calcule parmi tous les individus ; ici on sait déjà que le test est positif.',tag:'proba-cond'},
        {h:'P(T)',c:'T',why:'P(T) est la probabilité d’un test positif en général : elle servira, mais ce n’est pas la question.',tag:'proba-cond'}]},
      {q:'Que vaut P<sub>M̄</sub>(T), la probabilité d’un test positif sans l’état M ?',o:[
        {h:`1 − ${sp2p(sp)} = ${sp2p(fp)}`,v:fp,ok:true},
        {h:`${sp2p(sp)}`,v:sp,why:`${sp2p(sp)} est P<sub>M̄</sub>(T̄) : sans l’état M, le test est négatif dans ${num(sp*100)} % des cas.`,tag:'proba-compl'},
        {h:`1 − ${sp2p(se)} = ${sp2p(1-se)}`,v:+(1-se).toFixed(2),why:'1 − P<sub>M</sub>(T) est P<sub>M</sub>(T̄), un faux négatif chez un individu dans l’état M.',tag:'proba-cond'}]},
      {q:'Calcule P(T) avec l’arbre.',o:prev=>{const f=prev[1].v;return[
        {h:`${sp2p(m)} × ${sp2p(se)} + ${sp2p(1-m)} × ${sp2p(f)} ≈ ${dec(m*se+(1-m)*f,4)}`,v:m*se+(1-m)*f,ok:true},
        {h:`${sp2p(m)} × ${sp2p(se)} = ${sp2p(m*se)}`,v:m*se,why:'Il manque les faux positifs : des individus sans l’état M peuvent avoir un test positif.',tag:'sp2-tree'},
        {h:`${sp2p(se)} + ${sp2p(f)} = ${sp2p(se+f)}`,v:se+f,why:'Chaque chemin est un produit : il faut pondérer par P(M) et P(M̄).',tag:'sp2-tree'}]}},
      {q:'Donc la réponse à la question posée est…',o:prev=>{const P=prev[2].v,k=prev[0].c;return[
        {k:'TM',h:`P(M ∩ T) ÷ P(T) ≈ ${dec(m*se/P,3)}`,why:'Ce quotient est P<sub>T</sub>(M), mais ce n’est pas la probabilité annoncée à l’étape 1.'},
        {k:'MT',h:`P<sub>M</sub>(T) = ${sp2p(se)}`,why:'P<sub>M</sub>(T) est une donnée (la sensibilité du test) : la question porte sur l’état M sachant le test positif.',tag:'proba-cond'},
        {k:'I',h:`P(M ∩ T) = ${sp2p(m*se)}`,why:'P(M ∩ T) ne tient pas compte de l’information « test positif » : il faut diviser par P(T).',tag:'proba-cond'},
        {k:'T',h:`P(T) ≈ ${dec(P,4)}`,why:'P(T) n’est qu’un intermédiaire du calcul.',tag:'proba-cond'}].map(o=>({...o,ok:o.k===k}))}}],
    explain:`On cherche P<sub>T</sub>(M). P<sub>M̄</sub>(T) = 1 − ${sp2p(sp)} = ${sp2p(fp)}. Probabilités totales : P(T) = ${sp2p(m)} × ${sp2p(se)} + ${sp2p(1-m)} × ${sp2p(fp)} ≈ ${dec(PT,4)}. Donc P<sub>T</sub>(M) = P(M ∩ T) ÷ P(T) = ${sp2p(m*se)} ÷ ${dec(PT,4)} ≈ ${dec(ans,3)}. ${ans<.5?'Quand l’état M est rare, la plupart des tests positifs sont des faux positifs.':'Le test positif rend l’état M probable.'}`,
    hint:'Traduis d’abord la question : ce que l’on sait (le test est positif) se met en indice.'})};

/* Raisonnement 3 : utiliser l’indépendance */
const gSp2PrR3=()=>{
  if(Math.random()<.5){const a=R(1,9)/(pick([100,1000])),b=R(1,20)/100,ab=a*b,u=a+b-ab,f6=v=>num(+v.toFixed(6));
    return chain({instr:'Construis ton raisonnement.',prompt:stx(`Dans une population, un individu a la maladie m avec la probabilité ${f6(a)} et la maladie n avec la probabilité ${f6(b)}. On note M et N ces événements et on les suppose indépendants. Quelle est la probabilité qu’un individu ait au moins une des deux maladies ?`),
      steps:[
        {q:'L’événement « au moins une des deux maladies » s’écrit…',o:[
          {h:'M ∪ N',c:'u',ok:true},{h:'M ∩ N',c:'i',why:'M ∩ N signifie « les deux maladies à la fois ». « Au moins une » se traduit par une réunion.',tag:'proba-union'},
          {h:'M̄ ∩ N̄',c:'n',why:'M̄ ∩ N̄ signifie « aucune des deux maladies » : c’est le contraire de l’événement cherché.',tag:'proba-compl'}]},
        {q:'Quelle formule utilises-tu ?',o:prev=>[
          {f:'u',h:'P(M) + P(N) − P(M ∩ N)',why:'Cette formule calcule P(M ∪ N), pas l’événement choisi à l’étape 1.'},
          {f:'s',h:'P(M) + P(N)',why:'M et N ne sont pas incompatibles : on peut avoir les deux maladies, il faut retirer P(M ∩ N).',tag:'proba-union'},
          {f:'i',h:'P(M) × P(N)',why:'Ce produit donne P(M ∩ N), pas l’événement choisi à l’étape 1.',tag:'proba-indep'},
          {f:'n',h:'(1 − P(M)) × (1 − P(N))',why:'Ce produit donne P(M̄ ∩ N̄), pas l’événement choisi à l’étape 1.',tag:'proba-compl'}].map(o=>({...o,ok:o.f===prev[0].c}))},
        {q:'Que vaut P(M ∩ N) ?',o:[
          {h:`${f6(a)} × ${f6(b)} = ${f6(ab)}`,v:ab,ok:true},
          {h:'0',v:0,why:'Indépendants ne veut pas dire incompatibles : on peut avoir les deux maladies.',tag:'proba-indep'},
          {h:`${f6(Math.min(a,b))}`,v:Math.min(a,b),why:'Rien ne dit qu’une maladie entraîne l’autre : avec l’indépendance, P(M ∩ N) = P(M) × P(N).',tag:'proba-indep'}]},
        {q:'La probabilité cherchée vaut donc…',o:prev=>{const f=prev[1].f,pi=prev[2].v,t=f==='u'?a+b-pi:f==='s'?a+b:f==='i'?pi:(1-a)*(1-b);
          return sp2Pick(t,[{v:u,why:'Ce résultat ne découle pas de la formule et de la valeur choisies aux étapes précédentes.'},{v:a+b,why:'Il manque − P(M ∩ N) : l’intersection est comptée deux fois.',tag:'proba-union'},
            {v:ab,why:'C’est P(M ∩ N), la probabilité d’avoir les deux maladies.',tag:'proba-indep'},{v:(1-a)*(1-b),why:'C’est la probabilité de n’avoir aucune des deux maladies.',tag:'proba-compl'}],f6)}}],
      explain:`« Au moins une » : M ∪ N. P(M ∪ N) = P(M) + P(N) − P(M ∩ N), et par indépendance P(M ∩ N) = ${f6(a)} × ${f6(b)} = ${f6(ab)}. Donc P(M ∪ N) = ${f6(a)} + ${f6(b)} − ${f6(ab)} = ${f6(u)}.`,
      hint:'« Au moins une » se traduit par une réunion ; l’indépendance permet de calculer l’intersection.'})}
  const a=R(20,70)/100,b=R(20,80)/100,t=(1-a)*b,[X,Y]=pick([['l’autoroute A6','l’autoroute A7'],['la ligne 1','la ligne 2'],['le pont nord','le pont sud']]);
  return chain({instr:'Construis ton raisonnement.',prompt:stx(`Un jour de grand départ, il y a ${num(a*100)} % de risque de bouchon sur ${X} (événement A) et ${num(b*100)} % sur ${Y} (événement B). On suppose A et B indépendants. Quelle est la probabilité d’un bouchon sur ${Y} mais pas sur ${X} ?`),
    steps:[
      {q:'L’événement cherché s’écrit…',o:[
        {h:'Ā ∩ B',c:'AbB',ok:true},{h:'A ∩ B̄',c:'ABb',why:`A ∩ B̄ signifie « bouchon sur ${X} mais pas sur ${Y} » : les rôles sont inversés.`},
        {h:'Ā ∪ B',c:'U',why:'« et » (bouchon ici mais pas là) se traduit par une intersection, pas par une réunion.',tag:'proba-union'}]},
      {q:'Pourquoi peut-on calculer cette probabilité par un produit ?',o:[
        {h:'A et B sont indépendants, donc Ā et B le sont aussi',ok:true},
        {h:'Ā et B sont incompatibles',why:'Incompatibles signifierait qu’ils ne peuvent pas se produire ensemble ; ce n’est pas le cas, et on additionnerait alors au lieu de multiplier.',tag:'proba-indep'},
        {h:'Pour tous événements E et F, P(E ∩ F) = P(E) × P(F)',why:'Faux en général : il faut l’indépendance. Sinon P(E ∩ F) = P(E) × P<sub>E</sub>(F).',tag:'proba-indep'}]},
      {q:'La probabilité cherchée vaut…',o:prev=>{const c=prev[0].c,tt=c==='AbB'?t:c==='ABb'?a*(1-b):(1-a)+b-(1-a)*b;
        return sp2Pick(tt,[{v:t,why:'Ce produit correspond à Ā ∩ B, pas à l’événement choisi à l’étape 1.'},{v:a*(1-b),why:'Ce produit correspond à A ∩ B̄ : les rôles des deux routes sont inversés.'},
          {v:b-a,why:'P(Ā ∩ B) n’est pas P(B) − P(A).',tag:'proba-compl'},{v:a*b,why:'C’est P(A ∩ B) : bouchon sur les deux routes.',tag:'proba-indep'}],v=>num(+v.toFixed(4)))}}],
    explain:`On cherche P(Ā ∩ B). A et B indépendants, donc Ā et B aussi : P(Ā ∩ B) = P(Ā) × P(B) = (1 − ${sp2p(a)}) × ${sp2p(b)} = ${sp2p(t)}.`,
    hint:'« Mais pas » : intersection avec un événement contraire. L’indépendance passe aux contraires.'})};

/* =============== Chapitre 3 : variables aléatoires et loi binomiale =============== */
const gSp2Px=()=>{const L2=lawP(),xs=L2.xs,ps=L2.ps,j=R(1,xs.length-2),x=xs[j],typ=R(0,3);
  const sel=[(v)=>v<=x,(v)=>v<x,(v)=>v>=x,(v)=>v>x][typ],sym=['≤','&lt;','≥','&gt;'][typ],t=sumA(xs.map((v,i)=>sel(v)?ps[i]:0));
  const alt=sumA(xs.map((v,i)=>[(w)=>w<x,(w)=>w<=x,(w)=>w>x,(w)=>w>=x][typ](v)?ps[i]:0));
  return nq({instr:'Calcule la probabilité.',prompt:lawTab(L2)+mx(`P(X ${sym} ${num(x)}) = ?`),labels:[`P(X ${sym} ${num(x)}) =`],t:[t],tol:1e-6,
    explain:`On additionne les probabilités des valeurs x<sub>i</sub> ${sym} ${num(x)} : ${xs.map((v,i)=>sel(v)?sp2p(ps[i]):null).filter(Boolean).join(' + ')} = ${sp2p(t)}.`,
    hint:`Repère les valeurs qui vérifient X ${sym} ${num(x)} ; la borne ${num(x)} ${typ%2?'n’est pas':'est'} incluse.`,diag:([v])=>near(v,alt,1e-6)?'sp2-strict':near(v,1-t,1e-6)?'proba-compl':null})};

const gSp2Bern=()=>{const[ctx,a,b]=pick([['On lance une pièce équilibrée ; succès : « pile ».',1,2],['On lance un dé équilibré ; succès : « obtenir 6 ».',1,6],['On lance un dé équilibré ; succès : « obtenir 5 ou 6 ».',1,3],
  ['On tire une carte d’un jeu de 32 ; succès : « tirer un cœur ».',1,4],['On répond au hasard à une question à 5 choix dont un seul est juste ; succès : « bonne réponse ».',1,5],['On tire une boule d’une urne de 3 boules rouges et 5 noires ; succès : « rouge ».',3,8]]);
  const p=a/b,V=a*(b-a)/(b*b);
  return sp2N({instr:'X vaut 1 en cas de succès et 0 sinon. Donne E(X) et V(X) (valeurs exactes).',prompt:stx(ctx),labels:['E(X) =','V(X) ='],t:[p,V],
    explain:`X suit la loi de Bernoulli de paramètre p = ${sp2F(a,b)}. E(X) = 1 × p + 0 × (1 − p) = p = ${sp2F(a,b)} et V(X) = p(1 − p) = ${sp2F(a,b)} × ${sp2F(b-a,b)} = ${sp2F(a*(b-a),b*b)}.`,
    hint:'Loi de Bernoulli de paramètre p : E(X) = p et V(X) = p(1 − p).',diag:([e,v])=>near(v,p*p,1e-6)||near(v,p,1e-6)||near(v,Math.sqrt(V),1e-6)?'stat-var':null},[sp2S(a,b),sp2S(a*(b-a),b*b)])};

const gSp2Au=()=>{const[ctx,p,pt]=pick([['On lance un dé équilibré ; succès : « obtenir 6 »',1/6,'1/6'],['On répond au hasard à une question à 4 choix ; succès : « bonne réponse »',.25,'0,25'],['Une pièce produite est défectueuse avec la probabilité 0,05 ; succès : « pièce défectueuse »',.05,'0,05'],['Un tir au but réussit avec la probabilité 0,2',.2,'0,2']]);
  if(Math.random()<.5){const n=R(3,10),t=1-(1-p)**n;
    return nq({instr:'Calcule la probabilité.',prompt:stx(`${ctx}. On répète ${n} fois l’épreuve, de façon identique et indépendante. Probabilité d’obtenir au moins un succès ?`),labels:['P(X ≥ 1) ='],t:[t],dp:3,
      explain:`X ~ B(${n} ; ${pt}). Le contraire de « au moins un succès » est « aucun succès » : P(X = 0) = (1 − p)<sup>${n}</sup> ≈ ${dec((1-p)**n,4)}. Donc P(X ≥ 1) = 1 − (1 − p)<sup>${n}</sup> ≈ ${dec(t,3)}.`,
      hint:'« Au moins un » : passe par le contraire, « aucun ».',diag:([v])=>near(v,n*p,.002)||near(v,(1-p)**n,.002)||near(v,p**n,.002)?'proba-compl':null})}
  const s=pick([.9,.95,.99]);let n=1;while(1-(1-p)**n<s)n++;
  return nq({instr:'Trouve le nombre minimal de répétitions.',prompt:stx(`${ctx}. Combien de répétitions indépendantes faut-il au minimum pour que la probabilité d’au moins un succès atteigne ${num(s)} ?`),labels:['n ='],t:[n],
    explain:`On veut 1 − (1 − p)<sup>n</sup> ≥ ${num(s)}, soit (1 − p)<sup>n</sup> ≤ ${num(+(1-s).toFixed(2))}. En passant au logarithme (ln(1 − p) &lt; 0, le sens change) : n ≥ ln(${num(+(1-s).toFixed(2))}) ÷ ln(1 − p) ≈ ${dec(Math.log(1-s)/Math.log(1-p),2)}. Le premier entier est n = ${n}.`,
    hint:'P(au moins un succès) = 1 − (1 − p)<sup>n</sup>. Teste des valeurs de n ou passe au logarithme.',diag:([v])=>near(v,n-1,1e-6)?'arrondi':near(v,Math.ceil(s/p),1e-6)?'proba-compl':null})};

/* Raisonnement 1 : loi d’un jeu, espérance et interprétation */
const gSp2VaR1=()=>{let g1,g2,l,E4,E3;do{g1=R(1,4);g2=R(3,8);l=R(1,3);E4=(8*g1+4*g2-21*l)/32;E3=(8*g1+3*g2-21*l)/32}while(g1===g2||Math.abs(E4)<1e-9||Math.abs(E3)<1e-9);
  const Eno=(8*g1+4*g2)/32,mean=(-l+g1+g2+g1+g2)/4,fE=v=>{const r=sp2Rat(v);return(r?sp2F(r[0],r[1]):dec(v,3))+` ≈ ${dec(v,2)} €`};
  return chain({instr:'Construis la loi de X, puis interprète son espérance.',prompt:stx(`On tire une carte au hasard dans un jeu de 32 cartes. Un cœur rapporte ${g1} €, un roi rapporte ${g2} € (les gains se cumulent) ; toute autre carte fait perdre ${l} €. X est le gain algébrique.`),
    steps:[
      {q:'Quelles valeurs X peut-il prendre ?',o:[
        {h:`${MINUS}${l} ; ${g1} ; ${g2} ; ${g1+g2}`,c:'4',ok:true},
        {h:`${MINUS}${l} ; ${g1} ; ${g2}`,c:'3',why:`Le roi de cœur est à la fois un cœur et un roi : il rapporte ${g1} + ${g2} = ${g1+g2} €.`},
        {h:`${g1} ; ${g2} ; ${g1+g2}`,c:'no',why:`X est un gain algébrique : une perte de ${l} € donne la valeur ${MINUS}${l}.`,tag:'signe'}]},
      {q:`P(X = ${g1}) = ?`,o:prev=>{const k=prev[0].c==='3'?8:7;return[
        {h:fr(7,32),ok:k===7,why:`Avec les valeurs choisies à l’étape 1, le roi de cœur rapporte ${g1} € comme les autres cœurs : il y a 8 cartes qui donnent ${g1} €.`},
        {h:fr(8,32),ok:k===8,why:`Le roi de cœur rapporte ${g1+g2} €, pas ${g1} € : il ne reste que 7 cœurs qui donnent X = ${g1}.`},
        {h:fr(11,32),why:`11 = 8 cœurs + 3 autres rois : ce sont des cartes qui rapportent des gains différents.`,tag:'calc'}]}},
      {q:`P(X = ${MINUS}${l}) = ?`,o:[
        {h:fr(21,32),ok:true},{h:fr(20,32),why:'Les cœurs et les rois forment 8 + 4 − 1 = 11 cartes (le roi de cœur est compté une seule fois) ; il reste 32 − 11 = 21 cartes.',tag:'sp2-incl'},
        {h:fr(24,32),why:'Les rois autres que le roi de cœur rapportent aussi : il faut les retirer.',tag:'calc'}]},
      {q:'E(X) = ?',o:prev=>{const t=prev[0].c==='3'?E3:prev[0].c==='no'?Eno:E4;return sp2Pick(t,[
        {v:E4,why:'Ce calcul ne correspond pas aux valeurs retenues à l’étape 1.'},{v:E3,why:`Le roi de cœur rapporte ${g1+g2} € : il doit figurer avec sa propre valeur.`},
        {v:Eno,why:`La perte de ${l} € (probabilité 21/32) doit entrer dans la moyenne pondérée.`,tag:'signe'},{v:mean,why:'L’espérance pondère chaque valeur par sa probabilité : ce n’est pas la moyenne simple des valeurs.',tag:'stat-weight'}],fE)}},
      {q:'Comment interpréter ce résultat ?',o:prev=>{const e=prev[3].v,s=e>0;return[
        {h:`Sur un grand nombre de parties, le joueur gagne en moyenne environ ${dec(Math.abs(e),2)} € par partie.`,ok:s,why:'Le signe de l’espérance trouvée indique une perte moyenne, pas un gain.',tag:'signe'},
        {h:`Sur un grand nombre de parties, le joueur perd en moyenne environ ${dec(Math.abs(e),2)} € par partie.`,ok:!s,why:'Le signe de l’espérance trouvée indique un gain moyen, pas une perte.',tag:'signe'},
        {h:`Le joueur gagne ou perd exactement ${dec(Math.abs(e),2)} € à chaque partie.`,why:`À chaque partie, X vaut ${MINUS}${l}, ${g1}, ${g2} ou ${g1+g2} : l’espérance est une moyenne sur un grand nombre de parties.`}]}}],
    explain:`Valeurs : ${MINUS}${l} (21 cartes), ${g1} (7 cœurs hors roi), ${g2} (3 rois hors cœur), ${g1+g2} (roi de cœur). E(X) = (21 × (${MINUS}${l}) + 7 × ${g1} + 3 × ${g2} + 1 × ${g1+g2}) ÷ 32 = ${fE(E4)}. ${E4>0?'En moyenne, le joueur gagne':'En moyenne, le joueur perd'} environ ${dec(Math.abs(E4),2)} € par partie.`,
    hint:'Attention aux cartes qui vérifient deux conditions à la fois : le roi de cœur.'})};

/* Raisonnement 2 : justifier une loi binomiale et calculer P(X = k) */
const gSp2VaR2=()=>{let g,pd;do{g=R(2,7);pd=R(3,9)}while(g>=pd);const T=g+pd,n=R(3,6),k=R(1,n-1),p=g/T,f=v=>dec(v,4);
  const PR={ok:(q)=>Cnk(n,k)*q**k*(1-q)**(n-k),nc:(q)=>q**k*(1-q)**(n-k),ne:(q)=>Cnk(n,k)*q**k};
  return chain({instr:'Justifie la loi de X, puis calcule la probabilité.',prompt:stx(`Une urne contient ${g} boules gagnantes et ${pd} boules perdantes. On tire ${n} fois de suite une boule, en la remettant à chaque fois. X est le nombre de boules gagnantes obtenues. On cherche P(X = ${k}).`),
    steps:[
      {q:'Pourquoi les tirages sont-ils indépendants ?',o:[
        {h:'On remet la boule : l’urne est la même à chaque tirage',ok:true},
        {h:'Les boules sont indiscernables au toucher',why:'Cela justifie l’équiprobabilité de chaque tirage, pas l’indépendance des tirages successifs.',tag:'binom-law'},
        {h:'Il n’y a que deux sortes de boules',why:'Deux issues font une épreuve de Bernoulli, mais l’indépendance vient de la remise.',tag:'binom-law'}]},
      {q:'Quels sont les paramètres de la loi binomiale ?',o:[
        {h:`n = ${n} et p = ${sp2F(g,T)}`,p:p,ok:true},
        {h:`n = ${n} et p = ${sp2F(g,pd)}`,p:g/pd,why:'La probabilité du succès est gagnantes ÷ total des boules, pas gagnantes ÷ perdantes.',tag:'sp2-equi'},
        {h:`n = ${T} et p = ${sp2F(g,T)}`,p:p,why:`n est le nombre de tirages (${n}), pas le nombre de boules.`,tag:'binom-law'}]},
      {q:`Quelle expression donne P(X = ${k}) ?`,o:prev=>{const q=prev[1].p,P=sp2F(...(sp2Rat(q)||[q,1])),Q=sp2F(...(sp2Rat(1-q)||[1-q,1]));return[
        {h:`C(${n} ; ${k}) × (${P})<sup>${k}</sup> × (${Q})<sup>${n-k}</sup>`,f:'ok',ok:true},
        {h:`(${P})<sup>${k}</sup> × (${Q})<sup>${n-k}</sup>`,f:'nc',why:`Cette expression est la probabilité d’un seul chemin ; il y a C(${n} ; ${k}) chemins avec ${k} succès.`,tag:'binom-coef'},
        {h:`C(${n} ; ${k}) × (${P})<sup>${k}</sup>`,f:'ne',why:`Il manque les ${n-k} échecs, de probabilité 1 − p chacun.`,tag:'binom-coef'}]}},
      {q:'On obtient…',o:prev=>{const q=prev[1].p,t=PR[prev[2].f](q);return sp2Pick(t,[{v:PR.ok(p),why:'Ce n’est pas le résultat de l’expression choisie à l’étape précédente.'},
        {v:PR.nc(p),why:'Il manque le coefficient binomial C(n ; k).',tag:'binom-coef'},{v:PR.ne(p),why:'Il manque le facteur des échecs (1 − p)<sup>n − k</sup>.',tag:'binom-coef'},{v:k/n,why:'k ÷ n est une fréquence observée, pas une probabilité calculée.',tag:'binom-law'}],f)}}],
    explain:`On répète ${n} fois, de façon identique et indépendante (grâce à la remise), une épreuve à deux issues : succès « gagnante », de probabilité p = ${sp2F(g,T)}. Donc X ~ B(${n} ; ${sp2F(g,T)}) et P(X = ${k}) = C(${n} ; ${k}) × (${sp2F(g,T)})<sup>${k}</sup> × (${sp2F(pd,T)})<sup>${n-k}</sup> ≈ ${f(PR.ok(p))}.`,
    hint:'Loi binomiale : n répétitions identiques et indépendantes d’une épreuve à deux issues ; P(X = k) = C(n ; k) p<sup>k</sup> (1 − p)<sup>n − k</sup>.'})};

/* Raisonnement 3 : variable de transition Y = 1000X − c */
const gSp2VaR3=()=>{const b0=pick([1.3,2.5,0.8,4.2,3.6]),c0=Math.round(b0*1000),w=[1,1,1,1,1];for(let s=0;s<5;s++)w[R(0,4)]++;
  const ys=[-2,-1,0,1,2],ps=w.map(x=>x/10),EY=sumA(ys.map((y,i)=>y*ps[i])),VY=sumA(ys.map((y,i)=>ps[i]*(y-EY)**2)),EX=b0+EY/1000,sX=Math.sqrt(VY)/1000;
  const xs=ys.map(y=>num(+(b0+y/1000).toFixed(3)));
  return chain({instr:'Calcule E(X) et σ(X) en passant par une variable de transition.',prompt:stx('X est le diamètre (en cm) d’une bille prise au hasard dans la production. Sa loi :')+dtab([['x<sub>i</sub>',...xs],['P(X = x<sub>i</sub>)',...ps.map(sp2p)]]),
    steps:[
      {q:'Quelle variable de transition simplifie les calculs ?',o:[
        {h:`Y = 1000X − ${c0}`,ok:true},
        {h:`Y = 1000(X − ${c0})`,why:`X vaut environ ${num(b0)} : X − ${c0} est énorme et négatif. On multiplie d’abord par 1000, puis on soustrait ${c0}.`},
        {h:`Y = X ÷ 1000 − ${c0}`,why:'Diviser par 1000 rendrait les écarts encore plus petits : il faut multiplier par 1000.'},
        {h:`Y = 1000X + ${c0}`,why:`Pour ramener les valeurs autour de 0, on soustrait ${c0}.`,tag:'signe'}]},
      {q:'Y prend les valeurs −2, −1, 0, 1, 2 avec les mêmes probabilités. E(Y) = ?',o:sp2Pick(EY,[{v:0,why:'L’espérance pondère chaque valeur par sa probabilité : ce n’est pas la moyenne simple des valeurs.',tag:'stat-weight'},
        {v:-EY,why:'Erreur de signe : les valeurs négatives de Y comptent négativement.',tag:'signe'},{v:sumA(ys.map((y,i)=>Math.abs(y)*ps[i])),why:'Les valeurs −2 et −1 doivent compter avec leur signe.',tag:'signe'},{v:EY+.1,why:'Reprends la somme des produits y<sub>i</sub> × p<sub>i</sub>.',tag:'calc'}],v=>`E(Y) = ${num(+v.toFixed(2))}`).map(o=>({...o}))},
      {q:'Comment en déduire E(X) ?',o:prev=>{const e=+(prev[1].v);return[
        {h:`E(X) = (E(Y) + ${c0}) ÷ 1000 = ${num(+((e+c0)/1000).toFixed(5))}`,ok:true},
        {h:`E(X) = (E(Y) − ${c0}) ÷ 1000 = ${num(+((e-c0)/1000).toFixed(5))}`,why:`E(Y) = 1000E(X) − ${c0}, donc 1000E(X) = E(Y) + ${c0}.`,tag:'signe'},
        {h:`E(X) = 1000E(Y) + ${c0} = ${num(+(1000*e+c0).toFixed(2))}`,why:'On inverse la transformation : on divise par 1000, on ne multiplie pas.',tag:'va-lin'}]}},
      {q:`On trouve V(Y) = ${num(+VY.toFixed(4))}. Que vaut σ(X) ?`,o:[
        {h:`σ(X) = √V(Y) ÷ 1000 ≈ ${num(+sX.toFixed(5))}`,ok:true},
        {h:`σ(X) = V(Y) ÷ 1000 = ${num(+(VY/1000).toFixed(5))}`,why:'V(Y) = 1000² V(X) : la variance est divisée par 1000², l’écart-type par 1000.',tag:'va-lin'},
        {h:`σ(X) = √V(Y) ÷ 1000² ≈ ${num(+(Math.sqrt(VY)/1e6).toFixed(7))}`,why:'σ(Y) = 1000 σ(X) : on divise l’écart-type par 1000, pas par 1000².',tag:'va-lin'},
        {h:`σ(X) = √(V(Y) ÷ 1000) ≈ ${num(+Math.sqrt(VY/1000).toFixed(5))}`,why:'V(X) = V(Y) ÷ 1000², pas V(Y) ÷ 1000.',tag:'va-lin'}]}],
    explain:`Y = 1000X − ${c0} prend les valeurs −2 à 2. E(Y) = ${num(+EY.toFixed(2))}, donc E(X) = (E(Y) + ${c0}) ÷ 1000 = ${num(+EX.toFixed(5))} cm. V(Y) = 1000² V(X), donc σ(X) = σ(Y) ÷ 1000 = √${num(+VY.toFixed(4))} ÷ 1000 ≈ ${num(+sX.toFixed(5))} cm.`,
    hint:'E(aX + b) = aE(X) + b et V(aX + b) = a²V(X) : on inverse ces relations.'})};

/* =============== Chapitre 4 : sommes de variables aléatoires, loi des grands nombres =============== */
const gSp2Sum=()=>{const a=R(1,3),d=R(1,3),y1=R(1,4),L=R(3,6),y2=y1+d,ev=shuffle([['un nombre pair',.5],['le 3 ou le 5',1/3],['le 1',1/6]]),yv=[y1,y2,-L];
  const PY=v=>ev[yv.indexOf(v)][1],k=a+y2,t=.5*PY(y2)+.5*PY(y1),r=sp2Rat(t);
  return sp2N({instr:'Calcule la probabilité (valeur exacte).',prompt:stx(`Première partie : on lance une pièce équilibrée ; pile rapporte ${a} €, face rapporte ${a+d} € (variable X). Seconde partie, indépendante : on lance un dé équilibré ; ${ev[0][0]} rapporte ${num(yv[0])} €, ${ev[1][0]} rapporte ${num(yv[1])} €, ${ev[2][0]} fait ${yv[2]<0?`perdre ${-yv[2]} €`:''} (variable Y).`.replace(`rapporte ${num(-L)} €`,`fait perdre ${L} €`).replace(/fait perdre (\d+) €, (.*) fait  \(/,'fait perdre $1 €, $2 (')+` On pose S = X + Y. Que vaut P(S = ${k}) ?`),
    labels:[`P(S = ${k}) =`],t:[t],explain:`S = ${k} est obtenu par deux couples : (X = ${a} et Y = ${y2}) ou (X = ${a+d} et Y = ${y1}). Par indépendance, P(S = ${k}) = ${fr(1,2)} × ${sp2Fv(PY(y2))} + ${fr(1,2)} × ${sp2Fv(PY(y1))} = ${sp2Fv(t)}.`,
    hint:'Cherche tous les couples (x ; y) tels que x + y = k, puis additionne leurs probabilités.',diag:([v])=>near(v,.5*PY(y2),1e-6)||near(v,.5*PY(y1),1e-6)?'sp2-sum':null},[sp2S(r[0],r[1])])};

const gSp2ESum=()=>{const m1=R(-5,10),v1=R(1,12),m2=R(-5,10),v2=R(1,12),[a,b]=pick([[1,1],[1,-1],[2,1],[1,3],[2,-1],[3,2]]),E=a*m1+b*m2,V=a*a*v1+b*b*v2;
  const Z=`${a===1?'':a}X ${b<0?'−':'+'} ${Math.abs(b)===1?'':Math.abs(b)}Y`;
  return nq({instr:'Calcule l’espérance et la variance de Z.',prompt:stx('X et Y sont deux variables aléatoires indépendantes.')+mx(`E(X) = ${num(m1)} ; V(X) = ${v1} ; E(Y) = ${num(m2)} ; V(Y) = ${v2}`)+mx(`Z = ${Z}`),labels:['E(Z) =','V(Z) ='],t:[E,V],
    explain:`Linéarité de l’espérance : E(Z) = ${a===1?'':a+' × '}${m1<0&&a!==1?'('+num(m1)+')':num(m1)} ${b<0?'−':'+'} ${Math.abs(b)===1?'':Math.abs(b)+' × '}${m2<0?'('+num(m2)+')':num(m2)} = ${num(E)}. X et Y indépendantes, donc V(Z) = ${a*a===1?'':a*a+' × '}V(X) + ${b*b===1?'':b*b+' × '}V(Y) = ${V}${b<0?' : la variance d’une différence est une somme':''}.`,
    hint:'E(aX + bY) = aE(X) + bE(Y) ; si X et Y sont indépendantes, V(aX + bY) = a²V(X) + b²V(Y).',diag:([e,w])=>near(w,a*v1+b*v2,1e-6)?'va-lin':near(w,a*a*v1-b*b*v2,1e-6)?'sp2-sum':null})};

const gSp2Ech=()=>{const p=pick([.6,.7,.75,.8,.4,.3,.55]),n=pick([10,20,25,50,100]),E1=2*p-1,V1=4*p*(1-p),ctx=Math.random()<.5;
  return nq({instr:'Calcule E(S) et V(S).',prompt:stx(ctx?`Une fourmi part de 0 sur un axe. À chaque pas, elle avance d’une unité avec la probabilité ${num(p)}, ou recule d’une unité sinon, indépendamment des pas précédents. S est sa position après ${n} pas.`:`À chaque partie d’un jeu, on gagne 1 € avec la probabilité ${num(p)} ou on perd 1 € sinon. Les parties sont indépendantes. S est le gain total après ${n} parties.`),
    labels:['E(S) =','V(S) ='],t:[n*E1,n*V1],dp:2,
    explain:`Pour un pas : E(X<sub>1</sub>) = 1 × ${num(p)} + (−1) × ${num(+(1-p).toFixed(2))} = ${num(+E1.toFixed(2))} et V(X<sub>1</sub>) = E(X<sub>1</sub>²) − E(X<sub>1</sub>)² = 1 − ${num(+(E1*E1).toFixed(4))} = ${num(+V1.toFixed(4))}. S = X<sub>1</sub> + … + X<sub>${n}</sub> avec des X<sub>k</sub> indépendants : E(S) = ${n} × ${num(+E1.toFixed(2))} = ${dec(n*E1)} et V(S) = ${n} × ${num(+V1.toFixed(4))} = ${dec(n*V1)}.`,
    hint:'Écris S comme une somme de n variables indépendantes de même loi : E(S) = nE(X<sub>1</sub>), V(S) = nV(X<sub>1</sub>).',diag:([e,v])=>near(v,n*n*V1,.01)||near(v,n*p*(1-p),.01)?'sp2-sum':null})};

const gSp2Moy=()=>{const m=R(-3,12),v=pick([4,9,16,25,2.25,6.25,10.96,0.16]),n=pick([25,50,100,400]);
  return nq({instr:'Donne E(Mₙ), V(Mₙ) et σ(Mₙ).',prompt:stx(`X est une variable aléatoire d’espérance ${num(m)} et de variance ${num(v)}. M<sub>n</sub> est la moyenne d’un échantillon de taille n = ${n} de la loi de X.`),
    labels:['E(M<sub>n</sub>) =','V(M<sub>n</sub>) =','σ(M<sub>n</sub>) ='],t:[m,v/n,Math.sqrt(v/n)],dp:4,
    explain:`E(M<sub>n</sub>) = E(X) = ${num(m)}. V(M<sub>n</sub>) = V(X) ÷ n = ${num(v)} ÷ ${n} = ${dec(v/n,4)}. σ(M<sub>n</sub>) = σ(X) ÷ √n = √${num(v)} ÷ √${n} ≈ ${dec(Math.sqrt(v/n),4)}.`,
    hint:'La moyenne garde la même espérance ; sa variance est divisée par n, son écart-type par √n.',diag:([e,w,s])=>near(w,v/(n*n),1e-4)||near(s,Math.sqrt(v)/n,1e-4)||near(w,v,1e-4)?'sp2-moy':null})};

const gSp2BT=()=>{const t=R(0,3);
  if(t===0){const m=R(5,40),v=pick([1.5,2,2.4,3,4,5,6.4,8]),d=R(Math.ceil(Math.sqrt(v))+1,8),bd=v/(d*d);
    return nq({instr:'Donne le majorant fourni par l’inégalité de Bienaymé-Tchebychev.',prompt:stx(`X a pour espérance ${m} et pour variance ${num(v)}.`)+mx(`P(|X − ${m}| ≥ ${d}) ≤ ?`),labels:['Majorant ='],t:[bd],dp:4,
      explain:`P(|X − E(X)| ≥ δ) ≤ V(X) ÷ δ² avec δ = ${d} : ${num(v)} ÷ ${d*d} ≈ ${dec(bd,4)}.`,hint:'V(X) ÷ δ² : n’oublie pas le carré.',diag:([x])=>near(x,v/d,1e-4)||near(x,Math.sqrt(v)/d,1e-4)?'sp2-bt':null})}
  if(t===1){const n=R(10,60),p=pick([.1,.2,.25,.5]),V=n*p*(1-p),d=R(Math.ceil(Math.sqrt(V))+1,Math.ceil(Math.sqrt(V))+5),bd=V/(d*d);
    return nq({instr:'Donne le majorant fourni par l’inégalité de Bienaymé-Tchebychev.',prompt:mx(`X ~ B(${n} ; ${num(p)})`)+mx(`P(|X − ${num(n*p)}| ≥ ${d}) ≤ ?`),labels:['Majorant ='],t:[bd],dp:4,
      explain:`E(X) = np = ${num(n*p)} et V(X) = np(1 − p) = ${num(+V.toFixed(4))}. Bienaymé-Tchebychev : P(|X − ${num(n*p)}| ≥ ${d}) ≤ ${num(+V.toFixed(4))} ÷ ${d*d} ≈ ${dec(bd,4)}.`,
      hint:'Calcule V(X) = np(1 − p), puis divise par δ².',diag:([x])=>near(x,V/d,1e-4)||near(x,n*p/(d*d),1e-4)?'sp2-bt':null})}
  if(t===2){const k=R(2,5);
    return sp2N({instr:'Donne le majorant (valeur exacte).',prompt:stx('X est une variable aléatoire d’écart-type σ.')+mx(`P(|X − E(X)| ≥ ${k}σ) ≤ ?`),labels:['Majorant ='],t:[1/(k*k)],
      explain:`Avec δ = ${k}σ : V(X) ÷ δ² = σ² ÷ (${k}σ)² = 1/${k*k}. Un écart de plus de ${k} écarts-types a une probabilité au plus 1/${k*k}.`,hint:'V(X) = σ², donc V(X) ÷ (kσ)² = 1/k².',diag:([x])=>near(x,1/k,1e-6)?'sp2-bt':null},[`1/${k*k}`])}
  const m=R(5,40),v=pick([1,2,2.5,3,4]),d=R(Math.ceil(Math.sqrt(v))+1,7),lb=1-v/(d*d);
  return nq({instr:'Donne le minorant obtenu avec l’inégalité de Bienaymé-Tchebychev.',prompt:stx(`X a pour espérance ${m} et pour variance ${num(v)}.`)+mx(`P(${m-d} &lt; X &lt; ${m+d}) ≥ ?`),labels:['Minorant ='],t:[lb],dp:4,
    explain:`L’événement ${m-d} &lt; X &lt; ${m+d} s’écrit |X − ${m}| &lt; ${d} : c’est le contraire de |X − ${m}| ≥ ${d}. Donc P ≥ 1 − ${num(v)} ÷ ${d*d} ≈ ${dec(lb,4)}.`,
    hint:'Passe par l’événement contraire |X − E(X)| ≥ δ.',diag:([x])=>near(x,v/(d*d),1e-4)?'proba-compl':near(x,1-v/d,1e-4)?'sp2-bt':null})};

const gSp2Conc=()=>{const p=pick([.1,.2,.3,.4,.5]),V=p*(1-p),dl=pick([.05,.1,.15,.2].filter(x=>x<p+1e-9&&x<=.2)),al=pick([.05,.1]);
  if(Math.random()<.5){const x=V/(al*dl*dl),n=Math.ceil(x-1e-9);
    return nq({instr:'Trouve la plus petite taille d’échantillon qui convient.',prompt:stx(`X suit la loi de Bernoulli de paramètre ${num(p)} et M<sub>n</sub> est la moyenne d’un échantillon de taille n. À l’aide de l’inégalité de concentration, trouve le plus petit n tel que P(|M<sub>n</sub> − ${num(p)}| ≥ ${num(dl)}) ≤ ${num(al)}.`),labels:['n ='],t:[n],
      explain:`V(X) = p(1 − p) = ${num(+V.toFixed(4))}. Il suffit que V(X) ÷ (nδ²) ≤ ${num(al)}, soit n ≥ ${num(+V.toFixed(4))} ÷ (${num(al)} × ${num(dl)}²) ≈ ${dec(x,2)}. Le plus petit entier est n = ${n}.`,
      hint:'Inégalité de concentration : P(|M<sub>n</sub> − E(X)| ≥ δ) ≤ V(X) ÷ (nδ²). Résous V(X) ÷ (nδ²) ≤ α.',diag:([v])=>near(v,Math.ceil(V/(al*dl)),1e-6)||near(v,Math.ceil(p/(al*dl*dl)),1e-6)?'sp2-bt':near(v,n-1,1e-6)?'arrondi':null})}
  const n=pick([50,100,200,500,1000]),bd=V/(n*dl*dl);
  return nq({instr:'Donne le majorant fourni par l’inégalité de concentration.',prompt:stx(`X suit la loi de Bernoulli de paramètre ${num(p)} et M<sub>n</sub> est la moyenne d’un échantillon de taille n = ${n}.`)+mx(`P(|M<sub>n</sub> − ${num(p)}| ≥ ${num(dl)}) ≤ ?`),labels:['Majorant ='],t:[bd],dp:4,
    explain:`V(X) = ${num(p)} × ${num(+(1-p).toFixed(1))} = ${num(+V.toFixed(4))}. Majorant : V(X) ÷ (nδ²) = ${num(+V.toFixed(4))} ÷ (${n} × ${num(dl)}²) ≈ ${dec(bd,4)}.`,
    hint:'V(X) ÷ (nδ²), avec V(X) = p(1 − p).',diag:([x])=>near(x,V/(dl*dl),1e-4)||near(x,V/(n*dl),1e-4)?'sp2-bt':null})};

const SP2_VF=[['Pour toutes variables aléatoires X et Y : E(X + Y) = E(X) + E(Y).',1,'C’est la linéarité de l’espérance : elle ne demande aucune hypothèse d’indépendance.','sp2-sum'],
  ['Pour toutes variables aléatoires X et Y : V(X + Y) = V(X) + V(Y).',0,'Il faut que X et Y soient indépendantes. Exemple : avec Y = X, V(2X) = 4V(X) et non 2V(X).','sp2-sum'],
  ['Si X et Y sont indépendantes : V(X − Y) = V(X) − V(Y).',0,'V(X − Y) = V(X) + V(−Y) = V(X) + V(Y) : les dispersions s’ajoutent toujours.','sp2-sum'],
  ['Pour toute variable aléatoire X : V(2X) = 2V(X).',0,'V(aX) = a²V(X), donc V(2X) = 4V(X).','va-lin'],
  ['La moyenne Mₙ d’un échantillon a la même espérance que X.',1,'E(Mₙ) = (E(X₁) + … + E(Xₙ)) ÷ n = nE(X) ÷ n = E(X).','sp2-moy'],
  ['L’écart-type de la moyenne Mₙ vaut σ(X) ÷ n.',0,'V(Mₙ) = V(X) ÷ n, donc σ(Mₙ) = σ(X) ÷ √n.','sp2-moy'],
  ['Si l’on multiplie la taille de l’échantillon par 4, l’écart-type de Mₙ est divisé par 2.',1,'σ(Mₙ) = σ(X) ÷ √n et √4 = 2.','sp2-moy'],
  ['L’inégalité de Bienaymé-Tchebychev donne la valeur exacte de P(|X − E(X)| ≥ δ).',0,'Elle ne donne qu’un majorant, souvent large (0,25 au lieu d’environ 0,04 dans l’exemple binomial du cours).','sp2-bt'],
  ['Le majorant V(X) ÷ δ² peut être supérieur à 1.',1,'Oui, quand δ² &lt; V(X) ; l’inégalité est alors vraie mais n’apprend rien.','sp2-bt'],
  ['La loi des grands nombres affirme que Mₙ est égale à E(X) dès que n est assez grand.',0,'Elle affirme que P(|Mₙ − E(X)| ≥ δ) tend vers 0 : un écart reste possible, mais devient de plus en plus improbable.','sp2-bt'],
  ['La somme de n variables de Bernoulli indépendantes de même paramètre p suit la loi B(n ; p).',1,'C’est exactement un schéma de Bernoulli : la somme compte les succès.','binom-law'],
  ['Pour X ~ B(n ; p), on a V(X) = np.',0,'V(X) = np(1 − p) ; c’est l’espérance qui vaut np.','binom-law']];
const gSp2VF=()=>{const[s0,v,why,tag]=pick(SP2_VF);
  return mcq('Vrai ou faux ?',stx(s0),[{h:'Vrai',ok:!!v,tag},{h:'Faux',ok:!v,tag}],why,'Méfie-toi des formules qui demandent l’indépendance, et des racines carrées.',true)};

/* Raisonnement 1 : la fourmi (somme de variables indépendantes) */
const gSp2VsR1=()=>{const[a,b]=pick([[2,3],[3,4],[3,5],[4,5],[5,6]]),mm=R(2,5),D=mm*(2*a-b),n0=mm*b,E=(2*a-b)/b,V=4*a*(b-a)/(b*b),P=sp2F(a,b),Q=sp2F(b-a,b);
  return chain({instr:'Construis ton raisonnement.',prompt:stx(`Une fourmi part de l’origine d’un axe. À chaque déplacement, elle va d’une unité vers la droite avec la probabilité `)+mx(P)+stx(` ou d’une unité vers la gauche sinon, indépendamment des autres déplacements. X<sub>k</sub> vaut 1 ou −1 selon le k-ième déplacement, et S<sub>n</sub> = X<sub>1</sub> + … + X<sub>n</sub> est sa position. Une goutte de confiture l’attend à l’abscisse ${D}.`),
    steps:[
      {q:'E(X<sub>k</sub>) = ?',o:[
        {h:`1 × ${P} + (−1) × ${Q} = ${sp2F(2*a-b,b)}`,k:'ok',v:E,ok:true},
        {h:`1 × ${P} + 0 × ${Q} = ${P}`,k:'p',v:a/b,why:'X<sub>k</sub> vaut 1 ou −1, pas 1 ou 0 : ce n’est pas une variable de Bernoulli.',tag:'signe'},
        {h:'(1 + (−1)) ÷ 2 = 0',k:'z',v:0,why:'Les deux déplacements ne sont pas équiprobables : on pondère chaque valeur par sa probabilité.',tag:'stat-weight'}]},
      {q:'V(X<sub>k</sub>) = ?',o:[
        {h:`E(X<sub>k</sub>²) − E(X<sub>k</sub>)² = 1 − (${sp2F(2*a-b,b)})² = ${sp2F(4*a*(b-a),b*b)}`,ok:true},
        {h:`p(1 − p) = ${sp2F(a*(b-a),b*b)}`,why:'p(1 − p) est la variance d’une variable qui vaut 1 ou 0 ; ici les valeurs sont 1 et −1.',tag:'stat-var'},
        {h:`E(X<sub>k</sub>)² = ${sp2F((2*a-b)**2,b*b)}`,why:'C’est le carré de l’espérance, pas la variance : V = E(X²) − E(X)².',tag:'stat-var'}]},
      {q:'Que valent E(S<sub>n</sub>) et V(S<sub>n</sub>) ?',o:[
        {h:'E(S<sub>n</sub>) = nE(X<sub>1</sub>) et V(S<sub>n</sub>) = nV(X<sub>1</sub>)',ok:true},
        {h:'E(S<sub>n</sub>) = nE(X<sub>1</sub>) et V(S<sub>n</sub>) = n²V(X<sub>1</sub>)',why:'n²V(X<sub>1</sub>) serait V(nX<sub>1</sub>). Ici on additionne n variables indépendantes : les variances s’ajoutent.',tag:'sp2-sum'},
        {h:'E(S<sub>n</sub>) = nE(X<sub>1</sub>) et V(S<sub>n</sub>) = V(X<sub>1</sub>)',why:'Chaque déplacement ajoute sa propre variance : V(S<sub>n</sub>) = V(X<sub>1</sub>) + … + V(X<sub>n</sub>).',tag:'sp2-sum'}]},
      {q:`Au bout de combien de déplacements peut-elle espérer atteindre l’abscisse ${D} ?`,o:prev=>{const k=prev[0].k;return[
        {k:'ok',h:`n = ${D} ÷ ${sp2F(2*a-b,b)} = ${n0}`,why:`Ce calcul utilise E(X<sub>k</sub>) = ${sp2F(2*a-b,b)}, qui n’est pas la valeur trouvée à l’étape 1.`},
        {k:'p',h:`n = ${D} ÷ ${P} ≈ ${dec(D*b/a,1)}`,why:'Ce calcul utilise E(X<sub>k</sub>) = p, qui n’est pas l’espérance d’un déplacement.',tag:'signe'},
        {k:'D',h:`n = ${D}`,why:`En moyenne, la fourmi n’avance pas d’une unité par déplacement mais de E(X<sub>k</sub>) = ${sp2F(2*a-b,b)}.`},
        {k:'z',h:'Jamais : en moyenne elle reste en 0',why:'E(X<sub>k</sub>) n’est pas nulle : la fourmi dérive vers la droite.'}].map(o=>({...o,ok:o.k===k}))}}],
    explain:`E(X<sub>k</sub>) = ${sp2F(2*a-b,b)} et V(X<sub>k</sub>) = 1 − (${sp2F(2*a-b,b)})² = ${sp2F(4*a*(b-a),b*b)}. Par linéarité, E(S<sub>n</sub>) = n × ${sp2F(2*a-b,b)} ; par indépendance, V(S<sub>n</sub>) = n × ${sp2F(4*a*(b-a),b*b)}. E(S<sub>n</sub>) = ${D} donne n = ${n0}, et alors σ(S<sub>${n0}</sub>) = √(${n0} × ${sp2F(4*a*(b-a),b*b)}) ≈ ${dec(Math.sqrt(n0*V),2)}.`,
    hint:'Commence par la loi d’un seul déplacement (valeurs 1 et −1), puis additionne.'})};

/* Raisonnement 2 : taille d’échantillon par l’inégalité de concentration */
const gSp2VsR2=()=>{const p=pick([.2,.3,.4,.5]),dl=pick([.05,.1,.15]),al=pick([.05,.1]),lo=num(+(p-dl).toFixed(2)),hi=num(+(p+dl).toFixed(2)),P=num(p),Dd=num(dl);
  const nFor=(V,den)=>Math.ceil(V/den-1e-9);
  return chain({instr:'Construis ton raisonnement.',prompt:stx(`X suit la loi de Bernoulli de paramètre ${P}. M<sub>n</sub> est la moyenne d’un échantillon de taille n de la loi de X. Quelle taille n suffit, d’après l’inégalité de concentration, pour que P(${lo} &lt; M<sub>n</sub> &lt; ${hi}) ≥ ${num(1-al)} ?`),
    steps:[
      {q:`L’événement ${lo} &lt; M<sub>n</sub> &lt; ${hi} s’écrit…`,o:[
        {h:`|M<sub>n</sub> − ${P}| &lt; ${Dd}`,ok:true},
        {h:`|M<sub>n</sub> − ${P}| ≥ ${Dd}`,why:'C’est l’événement contraire : M<sub>n</sub> est hors de l’intervalle.',tag:'proba-compl'},
        {h:`M<sub>n</sub> &lt; ${hi}`,why:`Il manque la borne ${lo} : il faut encadrer M<sub>n</sub> des deux côtés.`},
        {h:`|M<sub>n</sub> − ${lo}| &lt; ${Dd}`,why:`On centre sur l’espérance E(X) = ${P}, le milieu de l’intervalle.`}]},
      {q:'La condition demandée équivaut à…',o:[
        {h:`P(|M<sub>n</sub> − ${P}| ≥ ${Dd}) ≤ ${num(al)}`,ok:true},
        {h:`P(|M<sub>n</sub> − ${P}| ≥ ${Dd}) ≥ ${num(1-al)}`,why:`En passant au contraire, le sens change : si P(E) ≥ ${num(1-al)}, alors P(Ē) ≤ ${num(al)}.`,tag:'proba-compl'},
        {h:`P(|M<sub>n</sub> − ${P}| &lt; ${Dd}) ≤ ${num(al)}`,why:'On veut que M<sub>n</sub> soit souvent dans l’intervalle, donc que cette probabilité soit grande.',tag:'proba-compl'}]},
      {q:'V(X) = ?',o:[
        {h:`${P} × ${num(+(1-p).toFixed(1))} = ${num(+(p*(1-p)).toFixed(4))}`,v:p*(1-p),ok:true},
        {h:`${P}`,v:p,why:'p est l’espérance d’une variable de Bernoulli ; sa variance est p(1 − p).',tag:'stat-var'},
        {h:`${P}² = ${num(+(p*p).toFixed(4))}`,v:p*p,why:'V(X) = E(X²) − E(X)² = p − p² = p(1 − p).',tag:'stat-var'}]},
      {q:'Il suffit donc de prendre…',o:prev=>{const V=prev[2].v,t=nFor(V,al*dl*dl),fm=v=>`n ≥ ${sp2I(v)}`;return sp2Pick(t,[
        {v:nFor(p*(1-p),al*dl*dl),why:'Ce n’est pas le calcul fait avec la variance retenue à l’étape précédente.'},
        {v:nFor(V,al*dl),why:'Dans l’inégalité de concentration, δ est au carré : V(X) ÷ (nδ²).',tag:'sp2-bt'},
        {v:nFor(V,(1-al)*dl*dl),why:`Le majorant doit être ${num(al)}, la probabilité de l’écart, pas ${num(1-al)}.`,tag:'sp2-bt'},
        {v:Math.floor(V/(al*dl*dl)+1e-9)-1,why:'On arrondit à l’entier supérieur : n doit dépasser la valeur trouvée.',tag:'arrondi'}],fm)}}],
    explain:`${lo} &lt; M<sub>n</sub> &lt; ${hi} ⟺ |M<sub>n</sub> − ${P}| &lt; ${Dd}. On veut donc P(|M<sub>n</sub> − ${P}| ≥ ${Dd}) ≤ ${num(al)}. L’inégalité de concentration donne P(|M<sub>n</sub> − ${P}| ≥ ${Dd}) ≤ V(X) ÷ (n × ${Dd}²) avec V(X) = ${num(+(p*(1-p)).toFixed(4))}. Il suffit que ${num(+(p*(1-p)).toFixed(4))} ÷ (n × ${Dd}²) ≤ ${num(al)}, soit n ≥ ${dec(p*(1-p)/(al*dl*dl),2)} : n ≥ ${sp2I(nFor(p*(1-p),al*dl*dl))}.`,
    hint:'Transforme l’intervalle en écart à l’espérance, puis passe à l’événement contraire.'})};

/* Raisonnement 3 : loi d’une somme de deux variables indépendantes */
const gSp2VsR3=()=>{const a=R(1,3),d=R(1,3),y1=R(1,4),L=R(3,6),y2=y1+d,evs=shuffle([['un nombre pair',1/2],['le 3 ou le 5',1/3],['le 1',1/6]]),yv=[y1,y2,-L];
  const PY=v=>evs[yv.indexOf(v)][1],k=a+y2,f=v=>sp2Fv(v);
  const gain=(i)=>yv[i]<0?`fait perdre ${-yv[i]} €`:`rapporte ${yv[i]} €`;
  const pairs={ok:[[a,y2],[a+d,y1]],one:[[a,y2]],bad:[[a,y2],[a+d,y2]]},ptx=ps=>ps.map(([x,y])=>`(${x} ; ${y})`).join(' et ');
  return chain({instr:'Construis ton raisonnement.',prompt:stx(`Première partie : une pièce équilibrée ; pile rapporte ${a} €, face ${a+d} € (variable X). Seconde partie, indépendante : un dé équilibré ; ${evs[0][0]} ${gain(0)}, ${evs[1][0]} ${gain(1)}, ${evs[2][0]} ${gain(2)} (variable Y). On cherche P(X + Y = ${k}).`),
    steps:[
      {q:`Quels couples (x ; y) donnent X + Y = ${k} ?`,o:[
        {h:ptx(pairs.ok),c:'ok',ok:true},
        {h:ptx(pairs.one),c:'one',why:`Il y a un autre couple : ${a+d} + ${y1} = ${k}.`,tag:'sp2-sum'},
        {h:ptx(pairs.bad),c:'bad',why:`${a+d} + ${y2} = ${a+d+y2}, pas ${k}.`,tag:'calc'}]},
      {q:`P((X = ${a}) ∩ (Y = ${y2})) = ?`,o:[
        {h:`P(X = ${a}) × P(Y = ${y2})`,m:'prod',ok:true},
        {h:`P(X = ${a}) + P(Y = ${y2})`,m:'sum',why:'« et » : on cherche une intersection ; avec l’indépendance, c’est un produit.',tag:'proba-indep'},
        {h:`P(Y = ${y2})`,m:'one',why:'Il faut aussi que la pièce donne X = '+a+' : on multiplie par P(X = '+a+').',tag:'proba-indep'}]},
      {q:'Comment combine-t-on les différents couples ?',o:[
        {h:'On additionne leurs probabilités',m:'add',ok:true},
        {h:'On multiplie leurs probabilités',m:'mul',why:'Les couples sont des événements incompatibles (ils ne peuvent pas se produire ensemble) : on additionne.',tag:'sp2-sum'},
        {h:'On garde la plus grande',m:'max',why:'Chaque couple est une façon différente d’obtenir la somme : toutes comptent.',tag:'sp2-sum'}]},
      {q:`Donc P(X + Y = ${k}) = ?`,o:prev=>{const ps=pairs[prev[0].c],m=prev[1].m,pp2=([x,y])=>m==='prod'?.5*PY(y):m==='sum'?.5+PY(y):PY(y),vs=ps.map(pp2),c=prev[2].m;
        const t=c==='add'?sumA(vs):c==='mul'?vs.reduce((u,w)=>u*w,1):Math.max(...vs),good=.5*PY(y2)+.5*PY(y1);
        return sp2Pick(t,[{v:good,why:'Ce n’est pas la suite des choix faits aux étapes précédentes.'},{v:.5*PY(y2),why:'Il manque le second couple.',tag:'sp2-sum'},
          {v:.25*PY(y2)*PY(y1),why:'On additionne les probabilités des couples, on ne les multiplie pas.',tag:'sp2-sum'},{v:PY(y2)+PY(y1),why:'Il faut multiplier chaque probabilité de Y par P(X = x) = 1/2.',tag:'proba-indep'}],f)}}],
    explain:`X + Y = ${k} pour les couples (${a} ; ${y2}) et (${a+d} ; ${y1}). Par indépendance, P = ${fr(1,2)} × ${f(PY(y2))} + ${fr(1,2)} × ${f(PY(y1))} = ${f(.5*PY(y2)+.5*PY(y1))}.`,
    hint:'Liste tous les couples qui donnent la somme, puis : produit dans chaque couple (indépendance), somme des couples.'})};

/* =============== Déclaration des chapitres =============== */
ANA_UNITS.push(
  {id:'sp-combi',tr:'sp',src:'Combinatoire et dénombrement',name:'Dénombrement',sub:'Principes additif et multiplicatif, arrangements, combinaisons',glyph:'n!',tone:'c',
   w:'wPascal',
   skills:[SKA('sp.cb.venn','Principe additif et diagramme',gSp2Venn,1),SKA('sp.cb.mult','Principe multiplicatif',gCbMult,1),SKA('sp.cb.pow','k-uplets (avec répétition)',gCbPow,1),
     SKA('sp.cb.mod','Choisir le bon modèle',gSp2Mod,1),SKA('sp.cb.perm','Permutations',gCbFact,1),SKA('sp.cb.arr','Arrangements',gCbArr,2),SKA('sp.cb.comb','Combinaisons',gCbComb,2),
     SKA('sp.cb.pasc','Symétrie et triangle de Pascal',gSp2Pasc,2),SKA('sp.cb.part','Parties d’un ensemble',gSp2Part,2),SKA('sp.cb.r1','Raisonner : modèle, formule, probabilité',gSp2CbR1,2),
     SKA('sp.cb.r2','Raisonner : compter par le complémentaire',gSp2CbR2,3),SKA('sp.cb.r3','Raisonner : places côte à côte',gSp2CbR3,3)]},
  {id:'sp-proba',tr:'sp',src:'Probabilités et conditionnement',name:'Probabilités',sub:'Équiprobabilité, réunion, conditionnement, arbres, indépendance',glyph:'P',tone:'x',
   w:'wTree',w2:[['Bayes avec 1000 personnes','wBayes','Fais varier la fréquence de la maladie et la qualité du test : observe combien de tests positifs correspondent vraiment à des malades.']],
   skills:[SKA('sp.pr.elem','Calcul élémentaire de probabilité',gSp2Elem,1),SKA('sp.pr.loi','Loi de probabilité',gSp2Loi,1),SKA('sp.pr.compl','Événement contraire',gPrCompl,1),
     SKA('sp.pr.union','Probabilité d’une réunion',gPrUnion,1),SKA('sp.pr.tab','Conditionnement dans un tableau',gPrCond,2),SKA('sp.pr.cond','Formule de P_A(B)',gSp2CondF,2),
     SKA('sp.pr.indep','Indépendance',gPrIndep,2),SKA('sp.pr.tot','Probabilités totales',gPrTotal,2),SKA('sp.pr.r1','Raisonner : arbre pondéré',gSp2PrR1,2),
     SKA('sp.pr.r3','Raisonner : utiliser l’indépendance',gSp2PrR3,2),SKA('sp.pr.bayes','Inverser un conditionnement',gPrBayes,3),SKA('sp.pr.r2','Raisonner : un test de dépistage',gSp2PrR2,3)]},
  {id:'sp-va',tr:'sp',src:'Variables aléatoires et loi binomiale',name:'Variables aléatoires',sub:'Loi, espérance, variance, Bernoulli, loi binomiale',glyph:'X',tone:'sq',
   w:'wBin',
   skills:[SKA('sp.va.px','Lire une loi de probabilité',gSp2Px,1),SKA('sp.va.exp','Espérance',gVaExp,1),SKA('sp.va.bern','Loi de Bernoulli',gSp2Bern,1),SKA('sp.va.var','Variance',gVaVar,2),
     SKA('sp.va.lin','Transformation affine',gVaLin,2),SKA('sp.va.law','Reconnaître une loi binomiale',gVaLaw,2),SKA('sp.va.binp','Probabilité binomiale',gVaBinP,2),
     SKA('sp.va.binev','Espérance et variance binomiales',gVaBinEV,2),SKA('sp.va.r2','Raisonner : justifier une loi binomiale',gSp2VaR2,2),
     SKA('sp.va.au','Au moins un succès',gSp2Au,3),SKA('sp.va.r1','Raisonner : la loi d’un jeu',gSp2VaR1,3),SKA('sp.va.r3','Raisonner : variable de transition',gSp2VaR3,3)]},
  {id:'sp-va2',tr:'sp',src:'Sommes de variables aléatoires et loi des grands nombres',name:'Sommes et grands nombres',sub:'Somme, moyenne d’un échantillon, Bienaymé-Tchebychev, concentration',glyph:'Mₙ',tone:'c',
   w:'wLLN',
   skills:[SKA('sp.vs.sum','Loi d’une somme',gSp2Sum,1),SKA('sp.vs.esum','Espérance et variance d’une somme',gSp2ESum,1),SKA('sp.vs.vf','Vrai ou faux : sommes et moyennes',gSp2VF,1),
     SKA('sp.vs.ech','Somme d’un échantillon',gSp2Ech,2),SKA('sp.vs.moy','Moyenne d’un échantillon',gSp2Moy,2),SKA('sp.vs.bt','Inégalité de Bienaymé-Tchebychev',gSp2BT,2),
     SKA('sp.vs.r3','Raisonner : la loi d’une somme',gSp2VsR3,2),SKA('sp.vs.conc','Inégalité de concentration',gSp2Conc,3),SKA('sp.vs.r1','Raisonner : la marche de la fourmi',gSp2VsR1,3),
     SKA('sp.vs.r2','Raisonner : taille d’un échantillon',gSp2VsR2,3)]});
