/* ===================== STA001 · Calcul des probabilités ===================== */
Object.assign(ANA_ERR,{
  's1-event':{label:'Opérations sur les événements',tip:'A ∩ B : A et B à la fois. A ∪ B : A ou B (ou les deux). Ā : le contraire de A.'},
  's1-bayes':{label:'Conditionnement inversé',tip:'P_B(A) n’est pas P_A(B) : P_B(A) = P(A ∩ B) ÷ P(B), avec P(B) calculée par la formule des probabilités totales.'}});
let S1PB_ID=0;
/** Diagramme de Venn : s = régions coloriées parmi 'a' (A seul), 'ab' (A et B), 'b' (B seul), 'o' (hors de A et B) ; o.lab : textes {a, ab, b, o} */
const S1PB_venn=(s,o={})=>{const id='s1v'+(++S1PB_ID),cA='<circle cx="115" cy="85" r="62"/>',cB='<circle cx="185" cy="85" r="62"/>';
  const M={a:`<rect width="300" height="170" fill="black"/><circle cx="115" cy="85" r="62" fill="white"/><circle cx="185" cy="85" r="62" fill="black"/>`,
    b:`<rect width="300" height="170" fill="black"/><circle cx="185" cy="85" r="62" fill="white"/><circle cx="115" cy="85" r="62" fill="black"/>`,
    ab:`<rect width="300" height="170" fill="black"/><circle cx="115" cy="85" r="62" fill="white"/>`,
    o:`<rect width="300" height="170" fill="white"/><circle cx="115" cy="85" r="62" fill="black"/><circle cx="185" cy="85" r="62" fill="black"/>`};
  let d='',b='';s.forEach(r=>{d+=`<mask id="${id}${r}">${M[r]}</mask>`;if(r==='ab')d+=`<clipPath id="${id}cb">${cB}</clipPath>`;
    b+=r==='ab'?`<g clip-path="url(#${id}cb)"><rect width="300" height="170" fill="var(--t-sq)" fill-opacity=".5" mask="url(#${id}ab)"/></g>`:`<rect x="1" y="1" width="298" height="168" fill="var(--t-sq)" fill-opacity=".5" mask="url(#${id}${r})"/>`});
  const L=o.lab||{},t=(x,y,v)=>v!=null?`<text x="${x}" y="${y}" font-size="12" font-weight="700" text-anchor="middle" fill="var(--ink)">${v}</text>`:'';
  return`<div class="qfig"><svg viewBox="0 0 300 170" role="img" aria-label="Diagramme de Venn"><defs>${d}</defs><rect x="1" y="1" width="298" height="168" rx="6" fill="none" stroke="var(--muted)"/>${b}
    <circle cx="115" cy="85" r="62" fill="none" stroke="var(--ink)" stroke-width="1.8"/><circle cx="185" cy="85" r="62" fill="none" stroke="var(--ink)" stroke-width="1.8"/>
    <text x="62" y="30" font-size="14" font-weight="700" fill="var(--ink)">A</text><text x="232" y="30" font-size="14" font-weight="700" fill="var(--ink)">B</text><text x="285" y="160" font-size="12" text-anchor="end" fill="var(--muted)">Ω</text>
    ${t(88,90,L.a)}${t(150,90,L.ab)}${t(212,90,L.b)}${t(40,155,L.o)}</svg></div>`};
/** Arbre pondéré à deux niveaux. p = [P(A), P_A(B), P_Ā(B)] (nombres ou textes), o.n = noms ['A','B'], o.hide = indices masqués parmi 0..5 */
const S1PB_tree=(p,o={})=>{const[A,B]=o.n||['A','B'],v=x=>typeof x==='number'?num(+x.toFixed(4)):x,h=o.hide||[];
  const q=[p[0],typeof p[0]==='number'?1-p[0]:'',p[1],typeof p[1]==='number'?1-p[1]:'',p[2],typeof p[2]==='number'?1-p[2]:''].map((x,i)=>h.includes(i)?'?':v(x));
  const br=(x1,y1,x2,y2,l,dy)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--ink)" stroke-width="1.6"/><text x="${(x1+x2)/2}" y="${(y1+y2)/2+dy}" font-size="11" font-weight="700" text-anchor="middle" fill="${l==='?'?'var(--t-x)':'var(--t-sq)'}">${l}</text>`;
  const nd=(x,y,t)=>`<circle cx="${x}" cy="${y}" r="13" fill="var(--surface)" stroke="var(--ink)"/><text x="${x}" y="${y+4}" font-size="11" font-weight="700" text-anchor="middle" fill="var(--ink)">${t}</text>`;
  const s=br(22,100,118,52,q[0],-8)+br(22,100,118,148,q[1],16)+br(118,52,238,22,q[2],-6)+br(118,52,238,80,q[3],14)+br(118,148,238,120,q[4],-6)+br(118,148,238,178,q[5],14)
    +nd(118,52,A)+nd(118,148,A+'̄')+nd(250,22,B)+nd(250,80,B+'̄')+nd(250,120,B)+nd(250,178,B+'̄');
  return`<div class="qfig"><svg viewBox="0 0 300 200" role="img" aria-label="Arbre de probabilités"><circle cx="22" cy="100" r="4" fill="var(--ink)"/>${s}</svg></div>`};
/** Tableau des sommes de deux dés */
const S1PB_dice=()=>{let s='';for(let i=0;i<=6;i++)for(let j=0;j<=6;j++){const x=40+j*34,y=8+i*24;
    if(!i&&!j)s+=`<text x="${x+17}" y="${y+16}" font-size="11" text-anchor="middle" fill="var(--muted)">+</text>`;
    else if(!i||!j)s+=`<rect x="${x}" y="${y}" width="34" height="24" fill="var(--soft)" stroke="var(--line)"/><text x="${x+17}" y="${y+16}" font-size="12" font-weight="700" text-anchor="middle" fill="var(--ink)">${i||j}</text>`;
    else s+=`<rect x="${x}" y="${y}" width="34" height="24" fill="var(--surface)" stroke="var(--line)"/><text x="${x+17}" y="${y+16}" font-size="12" text-anchor="middle" fill="var(--ink)">${i+j}</text>`}
  return`<div class="qfig"><svg viewBox="0 0 300 180" role="img" aria-label="Tableau des 36 issues de deux dés">${s}</svg></div>`};
/** Triangle de Pascal jusqu'à la ligne n, case (n, k) masquée */
const S1PB_pascal=(n,k)=>{const dy=Math.min(24,168/(n+1)),dx=300/(n+2);let s='';
  for(let i=0;i<=n;i++)for(let j=0;j<=i;j++){const x=150+(j-i/2)*dx,y=16+i*dy,hid=i===n&&j===k;
    s+=`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${n>7?10:12}" font-weight="${hid?700:400}" text-anchor="middle" fill="${hid?'var(--t-x)':'var(--ink)'}">${hid?'?':Cnk(i,j)}</text>`}
  return`<div class="qfig"><svg viewBox="0 0 300 ${Math.round(24+n*dy)}" role="img" aria-label="Triangle de Pascal">${s}</svg></div>`};
const s1Pp=v=>num(+v.toFixed(4));

/* 1. Équiprobabilité : somme de deux dés */
const gS1PbUniv=()=>{const ge=Math.random()<.4,s=ge?R(8,11):R(3,11),c=ge?[...Array(36).keys()].filter(i=>(i%6)+Math.floor(i/6)+2>=s).length:6-Math.abs(s-7);
  return nq({instr:'Calcule la probabilité (fraction acceptée).',prompt:stx(`On lance deux dés équilibrés et on note la somme S. Quelle est la probabilité de l’événement « S ${ge?'≥':'='} ${s} » ?`)+S1PB_dice(),
    labels:[`P(S ${ge?'≥':'='} ${s}) =`],t:[c/36],
    explain:`L’univers compte 6 × 6 = 36 issues équiprobables (les cases du tableau). ${c} cases donnent ${ge?`une somme ≥ ${s}`:`la somme ${s}`}. P = ${c}/36${gcd(c,36)>1?` = ${frS(c,36)}`:''}.`,
    hint:'Équiprobabilité : P = nombre de cas favorables ÷ nombre de cas possibles. Compte les cases du tableau.',
    diag:([v])=>near(v,1/11,.001)||near(v,c/11,.001)?'calc':null})};
/* 2. Opérations sur les événements (Venn) */
const S1PB_OPS=[['A ∩ B',['ab']],['A ∪ B',['a','ab','b']],['A ∩ B̄',['a']],['Ā ∩ B',['b']],['Ā ∩ B̄',['o']],['Ā',['b','o']],['B̄',['a','o']],['A ∪ B̄',['a','ab','o']]];
const gS1PbOps=()=>{const T=shuffle(S1PB_OPS.slice()),ok=T[0],o=T.slice(1,4);
  return mcq('Quel événement correspond à la zone coloriée ?',S1PB_venn(ok[1]),[{h:mx(ok[0]),ok:true},...o.map(x=>({h:mx(x[0]),tag:'s1-event'}))],
    `La zone coloriée est ${ok[0]} : ${ok[0]==='A ∩ B'?'les issues dans A et dans B':ok[0]==='A ∪ B'?'les issues dans A ou dans B':ok[0].includes('∩')?'l’intersection des deux événements indiqués':ok[0].includes('∪')?'la réunion des deux événements indiqués':'tout ce qui est hors de '+ok[0][0]}.`,
    '∩ se lit « et » (les deux à la fois), ∪ se lit « ou » (au moins l’un), la barre se lit « non ».')};
/* 3. Placer une probabilité sur l'échelle de 0 à 1 (pointQ) */
const gS1PbEchelle=()=>{const n=pick([4,5,8,10]),r=R(1,n-1),c=pick([['boules rouges','boules blanches','tirer une boule rouge'],['cartes gagnantes','cartes perdantes','tirer une carte gagnante'],['pièces défectueuses','pièces conformes','tirer une pièce défectueuse']]),contr=Math.random()<.4,k=contr?n-r:r;
  return pointQ({instr:'Place la probabilité de l’événement sur l’échelle de 0 à 1.',prompt:stx(`Une urne contient ${r} ${c[0]} et ${n-r} ${c[1]}, indiscernables au toucher. On tire un objet au hasard. Place la probabilité de l’événement « ${contr?'ne pas ':''}${c[2]} ».`),
    nom:'P',x:[-.1,1.1],y:[-.6,.6],snap:1/n,tol:.4/n,cible:[k/n,0],fond:{ligne:true,pas:1/n,etiq:1},
    explain:`${n} issues équiprobables, dont ${k} favorables : P = ${k}/${n}${gcd(k,n)>1?` = ${frS(k,n)}`:''} = ${num(k/n)}.${contr?` C’est aussi 1 − ${r}/${n} (événement contraire).`:''}`,
    hint:`Chaque graduation vaut 1/${n}. Compte les cas favorables.`})};
/* 4. Probabilité d'une réunion (Venn) */
const gS1PbUnion=()=>{const a=R(4,12)*.05,b=R(3,10)*.05,ab=+(R(1,Math.round(Math.min(a,b)*20)-1)*.05).toFixed(2),u=a+b-ab,cpl=Math.random()<.4;
  if(u>1)return gS1PbUnion();
  return nq({instr:'Calcule la probabilité.',prompt:mx(`P(A) = ${s1Pp(a)} ; P(B) = ${s1Pp(b)} ; P(A ∩ B) = ${s1Pp(ab)}`)+S1PB_venn(cpl?['o']:['a','ab','b'],{lab:{ab:s1Pp(ab)}})+stx(`Que vaut ${cpl?'P(Ā ∩ B̄), la probabilité de la zone coloriée':'P(A ∪ B)'} ?`),
    labels:[cpl?'P(Ā ∩ B̄) =':'P(A ∪ B) ='],t:[cpl?1-u:u],dp:2,
    explain:`P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = ${s1Pp(a)} + ${s1Pp(b)} − ${s1Pp(ab)} = ${s1Pp(u)} (l’intersection était comptée deux fois).${cpl?` Ā ∩ B̄ est le contraire de A ∪ B : 1 − ${s1Pp(u)} = ${s1Pp(1-u)}.`:''}`,
    hint:cpl?'« Ni A ni B » est le contraire de « A ou B ».':'On additionne, puis on retire l’intersection comptée deux fois.',
    diag:([v])=>near(v,a+b)||near(v,1-a-b)?'proba-union':cpl&&near(v,u)?'proba-compl':null})};
/* 5. Triangle de Pascal */
const gS1PbPascal=()=>{const n=R(5,8),k=R(1,n-1);
  return nq({instr:'Complète le triangle de Pascal.',prompt:S1PB_pascal(n,k),labels:['? ='],t:[Cnk(n,k)],
    explain:`Chaque nombre est la somme des deux nombres situés au-dessus : ${Cnk(n-1,k-1)} + ${Cnk(n-1,k)} = ${Cnk(n,k)}. C’est C(${n} ; ${k}), le nombre de façons de choisir ${k} objets parmi ${n}.`,
    hint:'Relation de Pascal : C(n ; k) = C(n − 1 ; k − 1) + C(n − 1 ; k).',diag:([v])=>near(v,Cnk(n-1,k))||near(v,Cnk(n-1,k-1))?'calc':null})};
/* 6 et 7. Arbre : probabilités totales, Bayes */
const s1PbT=()=>{const a=R(2,16)*.05,b=R(10,19)*.05,c=R(1,8)*.05;return{a,b,c,pB:a*b+(1-a)*c}};
const S1PB_CTX=[['Une usine a deux machines. A : « la pièce vient de la machine 1 », B : « la pièce est défectueuse ».','A','D'],['A : « le client a vu la publicité », B : « le client achète ».','A','B'],['A : « l’étudiant a suivi le tutorat », B : « l’étudiant réussit l’examen ».','T','R']];
const gS1PbTree=()=>{const T=s1PbT(),[t,n1,n2]=pick(S1PB_CTX);
  return nq({instr:`Calcule P(${n2}) avec la formule des probabilités totales.`,prompt:stx(t.replace(/\bA :/,n1+' :').replace(/\bB :/,n2+' :'))+S1PB_tree([T.a,T.b,T.c],{n:[n1,n2]}),labels:[`P(${n2}) =`],t:[T.pB],dp:4,
    explain:`Deux chemins mènent à ${n2} : P(${n2}) = P(${n1}) × P<sub>${n1}</sub>(${n2}) + P(${n1}̄) × P<sub>${n1}̄</sub>(${n2}) = ${s1Pp(T.a)} × ${s1Pp(T.b)} + ${s1Pp(1-T.a)} × ${s1Pp(T.c)} = ${s1Pp(T.pB)}.`,
    hint:'Multiplie les probabilités le long de chaque chemin qui mène à l’événement, puis additionne les chemins.',
    diag:([v])=>near(v,T.a*T.b,.0006)||near(v,T.b+T.c,.0006)||near(v,(T.b+T.c)/2,.0006)?'proba-cond':null})};
const gS1PbBayes=()=>{const T=s1PbT(),[t,n1,n2]=pick(S1PB_CTX),r=T.a*T.b/T.pB;
  return nq({instr:`Calcule P<sub>${n2}</sub>(${n1}) (formule de Bayes).`,prompt:stx(t.replace(/\bA :/,n1+' :').replace(/\bB :/,n2+' :'))+S1PB_tree([T.a,T.b,T.c],{n:[n1,n2]}),labels:[`P<sub>${n2}</sub>(${n1}) =`],t:[r],dp:3,
    explain:`P(${n1} ∩ ${n2}) = ${s1Pp(T.a)} × ${s1Pp(T.b)} = ${s1Pp(T.a*T.b)}. P(${n2}) = ${s1Pp(T.a*T.b)} + ${s1Pp(1-T.a)} × ${s1Pp(T.c)} = ${s1Pp(T.pB)}. P<sub>${n2}</sub>(${n1}) = ${s1Pp(T.a*T.b)} ÷ ${s1Pp(T.pB)} ≈ ${dec(r,3)}.`,
    hint:`P_${n2}(${n1}) = P(${n1} ∩ ${n2}) ÷ P(${n2}). Calcule d’abord P(${n2}) avec l’arbre.`,
    diag:([v])=>near(v,T.b,.0011)?'s1-bayes':near(v,T.a*T.b,.0011)?'proba-cond':null})};
/* 8. Raisonner : tirage simultané */
const gS1PbR1=()=>{const r=R(3,7),v=R(3,7),n=r+v,k=pick([2,3]),fav=r*Cnk(v,k-1),C=Cnk(n,k),A=Ank(n,k),P=n**k;
  return chain({instr:'Calcule la probabilité en construisant ton raisonnement.',prompt:stx(`Une urne contient ${r} boules rouges et ${v} boules vertes. On tire simultanément ${k} boules. Quelle est la probabilité d’obtenir exactement une boule rouge ?`),
    steps:[
      {q:'Un tirage possible est…',o:[{h:`une combinaison de ${k} boules parmi ${n}`,ok:true,m:'C'},{h:`un arrangement de ${k} boules parmi ${n}`,m:'A',why:'Le tirage est simultané : les boules sortent ensemble, il n’y a pas d’ordre.',tag:'comb-order'},
        {h:`une liste de ${k} boules avec répétition`,m:'P',why:'Une boule tirée n’est pas remise : pas de répétition possible.',tag:'comb-rep'}]},
      {q:'Nombre de tirages possibles :',o:prev=>{const m=prev[0].m;return[{h:`C(${n} ; ${k}) = ${C}`,ok:m==='C',w:C,why:m==='C'?'':'Ce dénombrement ne correspond pas à ton choix précédent.'},
        {h:`A(${n} ; ${k}) = ${A}`,ok:m==='A',w:A,why:m==='A'?'':'Ce dénombrement ne correspond pas à ton choix précédent.'},{h:`${n}<sup>${k}</sup> = ${P}`,ok:m==='P',w:P,why:m==='P'?'':'Ce dénombrement ne correspond pas à ton choix précédent.'}]}},
      {q:'Nombre de tirages avec exactement une rouge :',o:[{h:`C(${r} ; 1) × C(${v} ; ${k-1}) = ${fav}`,ok:true,f:fav},{h:`C(${r} ; 1) + C(${v} ; ${k-1}) = ${r+Cnk(v,k-1)}`,f:r+Cnk(v,k-1),why:'On choisit la rouge ET les vertes : principe multiplicatif, pas additif.',tag:'comb-mult'},
        {h:`C(${r} ; 1) = ${r}`,f:r,why:`Il faut aussi choisir les ${k-1} autre(s) boule(s) parmi les vertes.`,tag:'comb-mult'}]},
      {q:'La probabilité vaut…',o:prev=>{const w=prev[1].w,f=prev[2].f;return[{h:`${f} ÷ ${w} ≈ ${dec(f/w,4)}`,ok:true},{h:`${w} ÷ ${f} ≈ ${dec(w/f,4)}`,why:'Favorables ÷ possibles, pas l’inverse (une probabilité est entre 0 et 1).',tag:'calc'},
        {h:`${f} ÷ ${n} ≈ ${dec(f/n,4)}`,why:`On divise par le nombre de tirages possibles, pas par le nombre de boules.`,tag:'calc'}]}}],
    explain:`Tirage simultané : combinaisons. |Ω| = C(${n} ; ${k}) = ${C}. Favorables : C(${r} ; 1) × C(${v} ; ${k-1}) = ${fav}. P = ${fav}/${C} ≈ ${dec(fav/C,4)}.`})};
/* 9. Raisonner : test de dépistage (Bayes) */
const gS1PbR2=()=>{const p=pick([.005,.01,.02,.03,.05]),se=pick([.9,.95,.98,.99]),fp=pick([.02,.03,.05,.08,.1]),PT=p*se+(1-p)*fp,f=v=>dec(v,4);
  return chain({instr:'Interprète le test, en construisant ton raisonnement.',prompt:stx(`Une maladie touche ${num(p*100)} % de la population. Le test est positif chez ${num(se*100)} % des malades, et chez ${num(fp*100)} % des personnes saines. Une personne a un test positif (T) : quelle est la probabilité qu’elle soit malade (M) ?`),
    steps:[
      {q:'On cherche…',o:[{h:'P<sub>T</sub>(M)',ok:true,c:'tm'},{h:'P<sub>M</sub>(T)',c:'mt',why:`P_M(T) = ${num(se)} est la probabilité d’être positif quand on est malade : c’est la donnée, pas la question.`,tag:'s1-bayes'},
        {h:'P(M ∩ T)',c:'i',why:'P(M ∩ T) est la probabilité d’être malade ET positif, sans savoir que le test est positif.',tag:'proba-cond'}]},
      {q:'La probabilité d’un test positif vaut…',o:[{h:`P(T) = ${num(p)} × ${num(se)} + ${num(1-p)} × ${num(fp)} = ${f(PT)}`,ok:true,v:PT},{h:`P(T) = ${num(p)} × ${num(se)} = ${f(p*se)}`,v:p*se,why:'Il faut aussi compter les faux positifs (personnes saines au test positif).',tag:'proba-cond'},
        {h:`P(T) = ${num(se)} + ${num(fp)} = ${f(se+fp)}`,v:se+fp,why:'On pondère chaque branche par P(M) et P(M̄) : formule des probabilités totales.',tag:'proba-cond'}]},
      {q:'Donc la probabilité cherchée vaut…',o:prev=>{const c=prev[0].c,T=prev[1].v;return[{h:`${f(p*se)} ÷ ${f(T)} ≈ ${f(p*se/T)}`,ok:c==='tm',v:p*se/T,why:c==='tm'?'':'Ce calcul répond à P_T(M), pas à la probabilité choisie à l’étape 1.'},
        {h:`${num(se)}, donnée par l’énoncé`,ok:c==='mt',v:se,why:c==='mt'?'':'C’est P_M(T), pas P_T(M) : le conditionnement est inversé.',tag:'s1-bayes'},
        {h:`${num(p)} × ${num(se)} = ${f(p*se)}`,ok:c==='i',v:p*se,why:c==='i'?'':'C’est P(M ∩ T) ; il faut encore diviser par P(T).',tag:'proba-cond'}]}},
      {q:'Conclusion :',o:prev=>{const v=prev[2].v;return[{h:'moins de la moitié des positifs sont réellement malades',ok:v<.5,why:v<.5?'':`La valeur trouvée, ${f(v)}, dépasse 0,5.`},
        {h:'plus de la moitié des positifs sont réellement malades',ok:v>=.5,why:v>=.5?'':`La valeur trouvée, ${f(v)}, est inférieure à 0,5.`},{h:`un positif est malade avec probabilité ${num(se)}, la fiabilité du test`,why:'Confusion classique : la fiabilité du test chez les malades n’est pas la probabilité d’être malade quand on est positif.',tag:'s1-bayes'}]}}],
    explain:`P(T) = ${num(p)} × ${num(se)} + ${num(1-p)} × ${num(fp)} = ${f(PT)}. P_T(M) = P(M ∩ T) ÷ P(T) = ${f(p*se)} ÷ ${f(PT)} ≈ ${f(p*se/PT)}. La maladie étant rare, les faux positifs, nombreux, pèsent lourd.`})};

ANA_UNITS.push({id:'s1-probas',tr:'s1',name:'Calcul des probabilités',sub:'Événements, dénombrement, conditionnement, Bayes, indépendance',glyph:'P(A)',tone:'sq',
  skills:[SKA('s1.pb.univ','Équiprobabilité : deux dés',gS1PbUniv,1),SKA('s1.pb.ops','Opérations sur les événements',gS1PbOps,1),SKA('s1.pb.echelle','Placer une probabilité',gS1PbEchelle,1),
    SKA('s1.pb.union','Réunion et contraire',gS1PbUnion,1),SKA('s1.pb.arr','Arrangements',gCbArr,2),SKA('s1.pb.comb','Combinaisons',gCbComb,2),SKA('s1.pb.pascal','Triangle de Pascal',gS1PbPascal,2),
    SKA('s1.pb.tree','Arbre et probabilités totales',gS1PbTree,2),SKA('s1.pb.indep','Indépendance',gPrIndep,2),SKA('s1.pb.r1','Raisonner : tirage simultané',gS1PbR1,2),
    SKA('s1.pb.bayes','Formule de Bayes',gS1PbBayes,3),SKA('s1.pb.r2','Raisonner : test de dépistage',gS1PbR2,3)]});
