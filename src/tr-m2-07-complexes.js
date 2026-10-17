/* ===================== MVA912 · Nombres complexes (forme algébrique) ===================== */
Object.assign(ANA_ERR,{
  'm2ca-reim':{label:'Partie réelle et partie imaginaire',tip:'Pour z = a + bi, a est la partie réelle (horizontale) et b la partie imaginaire (verticale) ; b est un réel, sans le i.'},
  'm2ca-plan':{label:'Transformation dans le plan',tip:'z̄ : miroir sur l’axe horizontal ; −z : demi-tour autour de l’origine ; iz : quart de tour dans le sens inverse des aiguilles d’une montre.'}});
/** a + bi écrit proprement (zéros et ±1 gérés) */
const M2CA_z=(a,b)=>{const I='<i>i</i>',B=Math.abs(b)===1?I:`${num(Math.abs(b))}${I}`;if(!b)return num(a);if(!a)return(b<0?MINUS:'')+B;return`${num(a)} ${b<0?MINUS:'+'} ${B}`};
/** p/D + (q/D) i avec fractions simplifiées */
const M2CA_zf=(p,q,D)=>{const P=new Fr(p,D),Q=new Fr(q,D),f=F=>F.d===1?num(Math.abs(F.n)):fr(Math.abs(F.n),F.d),I='<i>i</i>';
  if(!Q.n)return(P.n<0?MINUS:'')+f(P);const im=(Q.d===1&&Math.abs(Q.n)===1?'':f(Q))+I;if(!P.n)return(Q.n<0?MINUS:'')+im;return`${P.n<0?MINUS:''}${f(P)} ${Q.n<0?MINUS:'+'} ${im}`};
const M2CA_BOX={x:[-5,5],y:[-4,4]};
/* 1. Placer un complexe */
const gM2CaPlace=()=>{let a,b;do{a=R(-4,4);b=R(-3,3)}while(!a&&!b);
  return pointQ({instr:'Place le point qui représente z dans le plan complexe.',prompt:mx(`z = ${M2CA_z(a,b)}`),nom:'z',...M2CA_BOX,snap:1,tol:.4,cible:[a,b],
    explain:`Partie réelle ${num(a)} : on va ${a>0?'à droite':a<0?'à gauche':'nulle part horizontalement'}${a?` de ${Math.abs(a)}`:''}. Partie imaginaire ${num(b)} : on ${b>0?'monte':b<0?'descend':'ne bouge pas verticalement'}${b?` de ${Math.abs(b)}`:''}. Le point est (${num(a)} ; ${num(b)}).`,
    hint:'Partie réelle sur l’axe horizontal, partie imaginaire sur l’axe vertical.',diag:([x,y])=>near(x,b,.1)&&near(y,a,.1)?'m2ca-reim':null})};
/* 2. Conjugué, opposé, i × z dans le plan */
const gM2CaSym=()=>{let a,b;do{a=nz(-4,4);b=nz(-3,3)}while(Math.abs(a)>3&&Math.abs(b)>3);
  const C=pick([['z̄ (le conjugué de z)',[a,-b],'Le conjugué garde la partie réelle et change le signe de la partie imaginaire : c’est le reflet de z par rapport à l’axe horizontal.'],
    ['−z (l’opposé de z)',[-a,-b],'L’opposé change les deux signes : c’est le symétrique de z par rapport à l’origine (un demi-tour).'],
    ['−z̄',[-a,b],'−z̄ = −a + bi : c’est le reflet de z par rapport à l’axe vertical.'],
    ['iz',[-b,a],'i(a + bi) = ai + bi² = −b + ai : multiplier par i fait tourner z d’un quart de tour dans le sens direct.']]);
  if(Math.abs(C[1][0])>4||Math.abs(C[1][1])>3)return gM2CaSym();
  return pointQ({instr:`Le point z est placé. Place le point ${C[0]}.`,prompt:mx(`z = ${M2CA_z(a,b)}`),nom:'P',...M2CA_BOX,snap:1,tol:.4,cible:C[1],fond:{v:[[a,b,'z']]},
    explain:`${C[2]} Ici : ${M2CA_z(C[1][0],C[1][1])}, au point (${num(C[1][0])} ; ${num(C[1][1])}).`,hint:'Conjugué : miroir horizontal. Opposé : demi-tour. Multiplier par i : quart de tour.',
    diag:([x,y])=>[[a,-b],[-a,-b],[-a,b],[-b,a]].some(([u,v])=>near(x,u,.1)&&near(y,v,.1))?'m2ca-plan':null})};
/* 3. Puissances de i sur le cercle */
const gM2CaPowI=()=>{const n=R(2,40),r=n%4,P=[[1,0],[0,1],[-1,0],[0,-1]][r],V=['1','i','−1','−i'];
  return pointQ({instr:'Place le point qui représente cette puissance de i.',prompt:mx(`<i>i</i><sup>${n}</sup>`),nom:'P',x:[-1.5,1.5],y:[-1.5,1.5],snap:.5,tol:.24,cible:P,fond:{cercle:1,pas:.5,etiq:1},
    explain:`Chaque multiplication par i est un quart de tour : i, −1, −i, 1, puis ça recommence. ${n} = 4 × ${Math.floor(n/4)} + ${r}, donc i<sup>${n}</sup> = i<sup>${r}</sup> = ${V[r]}.`,
    hint:'Cherche le reste de la division de n par 4.',diag:()=>'i-cycle'})};
/* 4. Lire un complexe sur la figure */
const gM2CaRead=()=>{let a,b;do{a=nz(-4,4);b=nz(-3,3)}while(Math.abs(a)===Math.abs(b));
  return mcq('Quel nombre complexe est représenté par le point z ?',FIG.complexe({x:[-5,5],y:[-4,4],z:[[a,b,'z']]}),
    [{h:mx(M2CA_z(a,b)),ok:true},{h:mx(M2CA_z(b,a)),tag:'m2ca-reim'},{h:mx(M2CA_z(a,-b)),tag:'cx-conj'},{h:mx(M2CA_z(-a,b)),tag:'signe'}],
    `Abscisse ${num(a)} : partie réelle. Ordonnée ${num(b)} : partie imaginaire. Donc z = ${M2CA_z(a,b)}.`,'L’abscisse donne la partie réelle, l’ordonnée la partie imaginaire.')};
/* 5. Somme et différence (figure) */
const gM2CaSum=()=>{let a,b,c,d,s;do{a=R(-3,3);b=nz(-3,3);c=R(-3,3);d=nz(-3,3);s=Math.random()<.6?1:-1}while(Math.abs(a+s*c)>9);
  return nq({instr:`Calcule ${s>0?'la somme':'la différence'} z ${s>0?'+':MINUS} w.`,prompt:mx(`z = ${M2CA_z(a,b)}    w = ${M2CA_z(c,d)}`)+FIG.complexe({x:[-5,5],y:[-4,4],z:[[a,b,'z'],[c,d,'w']]}),
    labels:['Re =','Im ='],t:[a+s*c,b+s*d],
    explain:`On ${s>0?'additionne':'soustrait'} les parties réelles entre elles et les parties imaginaires entre elles : (${num(a)} ${s>0?'+':MINUS} ${c<0?`(${num(c)})`:num(c)}) + (${num(b)} ${s>0?'+':MINUS} ${d<0?`(${num(d)})`:num(d)})i = ${M2CA_z(a+s*c,b+s*d)}.${s>0?' Sur la figure, c’est le quatrième sommet du parallélogramme construit sur z et w.':''}`,
    hint:'Réel avec réel, imaginaire avec imaginaire.',diag:([u,v])=>near(u,b+s*d,1e-6)&&near(v,a+s*c,1e-6)?'m2ca-reim':s<0&&near(u,a+c,1e-6)?'signe':null})};
/* 6. Module (figure) */
const gM2CaMod=()=>{const a=nz(-4,4),b=nz(-3,3),m=a*a+b*b;
  return nq({instr:'Calcule le module de z (valeur exacte, par exemple √13).',prompt:mx(`z = ${M2CA_z(a,b)}`)+FIG.complexe({x:[-5,5],y:[-4,4],z:[[a,b,'z']]}),labels:['|z| ='],t:[Math.sqrt(m)],
    explain:`Le module est la distance de l’origine au point (${num(a)} ; ${num(b)}). Par Pythagore : |z| = √(${a<0?`(${num(a)})`:a}² + ${b<0?`(${num(b)})`:b}²) = √${m}${Number.isInteger(Math.sqrt(m))?` = ${Math.sqrt(m)}`:''}.`,
    hint:'|a + bi| = √(a² + b²).',diag:([v])=>near(v,m,1e-6)||near(v,Math.abs(a)+Math.abs(b),1e-6)||near(v,Math.sqrt(Math.abs(a*a-b*b)),1e-6)?'cx-module':null})};
/* 7. Produit */
const gM2CaMul=()=>{const a=R(-6,6),b=nz(-6,6),c=R(-6,6),d=nz(-6,6);
  return nq({instr:'Calcule le produit sous forme algébrique.',prompt:mx(`(${M2CA_z(a,b)})(${M2CA_z(c,d)})`),labels:['Re =','Im ='],t:[a*c-b*d,a*d+b*c],
    explain:`On développe : ${num(a*c)} + ${a*d<0?`(${num(a*d)})`:num(a*d)}i + ${b*c<0?`(${num(b*c)})`:num(b*c)}i + ${b*d<0?`(${num(b*d)})`:num(b*d)}i². Avec i² = −1 : partie réelle ${num(a*c)} ${MINUS} ${b*d<0?`(${num(b*d)})`:num(b*d)} = ${num(a*c-b*d)}, partie imaginaire ${num(a*d+b*c)}. Résultat : ${M2CA_z(a*c-b*d,a*d+b*c)}.`,
    hint:'Développe les quatre produits, puis remplace i² par −1.',diag:([u])=>near(u,a*c+b*d,1e-6)&&b*d?'i2':null})};
/* 8. Placer un produit : i × z ou z × w */
const gM2CaProdP=()=>{const W=[[1,1],[1,-1],[2,0],[-1,0],[0,1],[0,-1],[0,2],[-1,1]];let a,b,c,d,p,q,k=0;
  do{a=R(-2,2);b=R(-2,2);[c,d]=Math.random()<.35?[0,1]:pick(W);p=a*c-b*d;q=a*d+b*c;k++}while((!a&&!b)||Math.abs(p)>5||Math.abs(q)>4||(a===p&&b===q));
  const rz=Math.hypot(a,b),rw=Math.hypot(c,d),geo={'1,1':'tourner de 45° et multiplier la longueur par √2','1,-1':'tourner de −45° et multiplier la longueur par √2','2,0':'doubler la longueur','-1,0':'faire un demi-tour','0,1':'tourner d’un quart de tour (90°)','0,-1':'tourner d’un quart de tour dans le sens des aiguilles d’une montre','0,2':'tourner de 90° et doubler la longueur','-1,1':'tourner de 135° et multiplier la longueur par √2'}[`${c},${d}`];
  return pointQ({instr:`Place le point qui représente le produit ${c===0&&d===1?'i × z':'z × w'}.`,prompt:mx(`z = ${M2CA_z(a,b)}${c===0&&d===1?'':`    w = ${M2CA_z(c,d)}`}`),nom:'P',...M2CA_BOX,snap:1,tol:.4,cible:[p,q],
    fond:{v:c===0&&d===1?[[a,b,'z']]:[[a,b,'z'],[c,d,'w']]},
    explain:`Calcul : (${M2CA_z(a,b)})(${M2CA_z(c,d)}) = ${M2CA_z(p,q)}. Géométriquement, multiplier par ${M2CA_z(c,d)}, c’est ${geo} : le point z devient (${num(p)} ; ${num(q)}).`,
    hint:'Développe le produit et remplace i² par −1 ; ou pense « tourner et agrandir ».',diag:([x,y])=>near(x,a+c,.1)&&near(y,b+d,.1)?'m2ca-plan':near(x,a*c+b*d,.1)&&near(y,q,.1)?'i2':null})};
/* 9. Inverse */
const gM2CaInv=()=>{const a=nz(-5,5),b=nz(-5,5),D=a*a+b*b;
  return nq({instr:'Calcule l’inverse de z (fractions exactes acceptées).',prompt:mx(`z = ${M2CA_z(a,b)}    ${fr('1','z')} = ?`),labels:['Re =','Im ='],t:[a/D,-b/D],
    explain:`1/z = z̄/|z|² = (${M2CA_z(a,-b)})/${D}, donc 1/z = ${M2CA_zf(a,-b,D)}. Vérification : z × z̄ = ${a*a} + ${b*b} = ${D}.`,
    hint:'Multiplie en haut et en bas par le conjugué : z z̄ = a² + b².',diag:([u,v])=>near(v,b/D,1e-6)?'cx-conj':near(u,1/a,1e-6)||near(u,a/(a*a-b*b||1),1e-6)?'cx-quot':null})};
/* 10. Équation avec z et z̄ */
const gM2CaBar=()=>{let al,be;do{al=R(1,3);be=pick([-2,-1,1,2])}while(al===Math.abs(be));const x=nz(-4,4),y=nz(-4,4),c=(al+be)*x,d=(al-be)*y;
  return nq({instr:'Résous l’équation : donne la partie réelle x et la partie imaginaire y de z.',prompt:mx(`${al===1?'':al}z ${be<0?MINUS:'+'} ${Math.abs(be)===1?'':Math.abs(be)}z̄ = ${M2CA_z(c,d)}`),labels:['x =','y ='],t:[x,y],
    explain:`On pose z = x + iy, donc z̄ = x − iy. Le membre de gauche vaut (${al} ${be<0?MINUS:'+'} ${Math.abs(be)})x + (${al} ${be<0?'+':MINUS} ${Math.abs(be)})iy = ${M2LE_lin(al+be,0)} + ${al-be===1?'':al-be<0?`(${al-be})`:al-be}iy. On identifie : ${M2LE_lin(al+be,0)} = ${num(c)} et ${M2LE_lin(al-be,0,'y')} = ${num(d)}, d’où x = ${num(x)} et y = ${num(y)} : z = ${M2CA_z(x,y)}.`,
    hint:'Pose z = x + iy, puis identifie parties réelles et parties imaginaires.',diag:([u,v])=>near(u,x,1e-6)&&near(v,-y,1e-6)?'cx-conj':null})};
/* 11. Raisonner : un quotient */
const gM2CaR1=()=>{let c,d,p,q;do{c=R(-4,4);d=nz(-4,4);p=R(-4,4);q=nz(-4,4)}while(!c||Math.abs(c)===Math.abs(d)||Math.abs(c+d)<=1);const A=p*c-q*d,B=p*d+q*c,D=c*c+d*d;
  return chain({instr:'Écris le quotient sous forme algébrique, en construisant ton raisonnement.',prompt:`<span class="m">z = ${fr(M2CA_z(A,B),M2CA_z(c,d))}</span>`,
    steps:[
      {q:'Comment s’y prendre ?',o:[
        {h:`Multiplier en haut et en bas par ${M2CA_z(c,-d)}, le conjugué du dénominateur`,ok:true,k:'cd'},
        {h:`Multiplier en haut et en bas par ${M2CA_z(A,-B)}, le conjugué du numérateur`,k:'cn',why:'C’est le dénominateur qu’il faut rendre réel : on utilise son conjugué à lui.',tag:'cx-quot'},
        {h:'Diviser la partie réelle par la partie réelle, l’imaginaire par l’imaginaire',k:'pp',why:'Cette règle n’existe pas pour la division : (a + bi)/(c + di) n’est pas a/c + (b/d)i.',tag:'cx-quot'}]},
      {q:'Le dénominateur devient…',o:prev=>prev[0].k!=='cd'?[{h:'Un nombre qui contient encore i : le calcul n’aboutit pas',ok:true,D:0},{h:`${D}`,D,why:'Ce dénominateur réel ne s’obtient qu’avec le conjugué du dénominateur.'}]:[
        {h:`${c*c} + ${d*d} = ${D}`,ok:true,D},{h:`${c*c} ${MINUS} ${d*d} = ${c*c-d*d}`,D:c*c-d*d,why:'(c + di)(c − di) = c² − d²i² = c² + d² : le i² = −1 change le signe.',tag:'i2'},
        {h:`(${num(c)} + ${num(d)})² = ${(c+d)**2}`,D:(c+d)**2,why:'(c + di)(c − di) = c² + d², pas (c + d)².',tag:'calc'}]},
      {q:'Le numérateur devient…',o:prev=>!prev[1].D?[{h:'On ne peut pas conclure avec cette méthode',ok:true,N:null},{h:mx(M2CA_z(A*c+B*d,B*c-A*d)),N:null,why:'Ce numérateur vient de la méthode du conjugué du dénominateur, que tu n’as pas choisie.'}]:[
        {h:mx(`(${M2CA_z(A,B)})(${M2CA_z(c,-d)}) = ${M2CA_z(A*c+B*d,B*c-A*d)}`),ok:true,N:[A*c+B*d,B*c-A*d]},
        {h:mx(`(${M2CA_z(A,B)})(${M2CA_z(c,-d)}) = ${M2CA_z(A*c-B*d,B*c+A*d)}`),N:[A*c-B*d,B*c+A*d],why:`Le terme ${num(B)}i × (${num(-d)}i) donne ${num(-B*d)}i² = ${num(B*d)} : n’oublie pas que i² = −1.`,tag:'i2'},
        {h:mx(`(${M2CA_z(A,B)})(${M2CA_z(c,-d)}) = ${M2CA_z(A*c,-B*d)}`),N:[A*c,-B*d],why:'Le produit de deux sommes donne quatre termes, pas deux.',tag:'calc'}]},
      {q:'Donc z vaut…',o:prev=>{const N=prev[2].N,Dv=prev[1].D;if(!N)return[{h:'Rien de fiable : il faut reprendre la méthode',ok:true},{h:mx(M2CA_z(p,q)),why:'C’est le bon résultat, mais il ne découle pas de ta démarche.'}];
        return[{h:mx(M2CA_zf(N[0],N[1],Dv)),ok:true},{h:mx(`${M2CA_zf(N[0],0,Dv)} ${N[1]<0?MINUS:'+'} ${num(Math.abs(N[1]))}<i>i</i>`),why:'On divise les deux parties par le dénominateur, pas seulement la partie réelle.',tag:'cx-quot'},
          {h:mx(M2CA_zf(N[1],N[0],Dv)),why:'Partie réelle et partie imaginaire inversées.',tag:'m2ca-reim'},{h:mx(M2CA_zf(N[0],-N[1],Dv)),why:'Erreur de signe sur la partie imaginaire.',tag:'signe'}]}}],
    explain:`On multiplie par le conjugué ${M2CA_z(c,-d)} : le dénominateur vaut ${c*c} + ${d*d} = ${D}, le numérateur ${M2CA_z(A*c+B*d,B*c-A*d)}. Donc z = ${M2CA_zf(A*c+B*d,B*c-A*d,D)}. Vérification : (${M2CA_z(p,q)})(${M2CA_z(c,d)}) = ${M2CA_z(A,B)}.`})};
/* 12. Raisonner : équation du second degré à discriminant négatif */
const gM2CaR2=()=>{const p=R(-4,4),q=R(1,5),B=-2*p,C=p*p+q*q;
  const eq=`z² ${B?`${B<0?MINUS:'+'} ${Math.abs(B)}z `:''}+ ${C} = 0`;
  const sq=k=>{const s=Math.sqrt(k);return Number.isInteger(s)?{v:s,t:num(s)}:{v:s,t:`√${k}`}};
  const sol=(D,cplx)=>{const s=sq(Math.abs(D));if(Number.isInteger(s.v)&&s.v%2===0&&B%2===0)return cplx?`z = ${M2CA_z(-B/2,s.v/2)} ou z = ${M2CA_z(-B/2,-s.v/2)}`:`z = ${num((-B+s.v)/2)} ou z = ${num((-B-s.v)/2)}`;
    return`z = ${fr(`${num(-B)} ± ${cplx?'<i>i</i>':''}${s.t}`,2)}`};
  return chain({instr:'Résous l’équation dans ℂ en construisant ton raisonnement.',prompt:mx(eq),
    steps:[
      {q:'Le discriminant vaut…',o:[
        {h:mx(`Δ = ${B*B} ${MINUS} ${4*C} = ${B*B-4*C}`),ok:true,D:B*B-4*C},
        {h:mx(`Δ = ${B*B} + ${4*C} = ${B*B+4*C}`),D:B*B+4*C,why:'Δ = b² − 4ac : c’est un moins.',tag:'signe'},
        {h:mx(`Δ = ${4*C} ${MINUS} ${B*B} = ${4*C-B*B}`),D:4*C-B*B,why:'Δ = b² − 4ac, dans cet ordre.',tag:'signe'}]},
      {q:'Que peut-on en déduire ?',o:prev=>{const D=prev[0].D;return D<0?[
        {h:'Deux solutions complexes conjuguées : √Δ est remplacé par i√(−Δ)',ok:true,k:'c'},{h:'Aucune solution',k:'n',why:'Dans ℝ, oui ; mais dans ℂ, un discriminant négatif donne deux solutions complexes.'},
        {h:'Deux solutions réelles',k:'r',why:'Δ &lt; 0 : pas de solution réelle.'}]:[
        {h:'Deux solutions réelles',ok:true,k:'r'},{h:'Deux solutions complexes conjuguées : √Δ est remplacé par i√(−Δ)',k:'c',why:'Avec ton Δ positif, les solutions seraient réelles.'},{h:'Aucune solution',k:'n',why:'Avec Δ &gt; 0, il y a deux solutions.'}]}},
      {q:'Les solutions sont…',o:prev=>{const D=prev[0].D,k=prev[1].k;
        if(k==='n')return[{h:'S = ∅',ok:true},{h:mx(sol(B*B-4*C,true)),why:'Ce résultat ne découle pas de ta conclusion précédente.'}];
        const cp=k==='c',T=sol(D,cp);
        return[{h:mx(T),ok:true},{h:mx(`z = ${fr(`${num(B)} ± ${cp?'<i>i</i>':''}${sq(Math.abs(D)).t}`,2)}`),why:'La formule est (−b ± √Δ)/(2a) : attention au signe de −b.',tag:'signe'},
          {h:mx(`z = ${fr(`${num(-B)} ± ${cp?'<i>i</i>':''}${Math.abs(D)}`,2)}`),why:'On prend la racine carrée de |Δ|, pas |Δ| lui-même.',tag:'calc'}]}}],
    explain:`Δ = ${B*B} − ${4*C} = ${num(B*B-4*C)} = (${2*q}<i>i</i>)². Les solutions sont z = (${num(-B)} ± ${2*q}<i>i</i>)/2, soit ${M2CA_z(p,q)} et ${M2CA_z(p,-q)} : deux complexes conjugués.`})};
ANA_UNITS.push({id:'m2-complexes',tr:'m2',name:'Nombres complexes',sub:'Forme algébrique, module, conjugué',glyph:'<i>i</i>',tone:'x',
  skills:[SKA('m2.ca.place','Placer un complexe',gM2CaPlace,1),SKA('m2.ca.read','Lire un complexe',gM2CaRead,1),SKA('m2.ca.powi','Puissances de i',gM2CaPowI,1),
    SKA('m2.ca.sum','Somme et différence',gM2CaSum,1),SKA('m2.ca.sym','Conjugué, opposé, i × z',gM2CaSym,1),SKA('m2.ca.mod','Module',gM2CaMod,1),
    SKA('m2.ca.mul','Produit',gM2CaMul,2),SKA('m2.ca.prodp','Placer un produit',gM2CaProdP,2),SKA('m2.ca.inv','Inverse',gM2CaInv,2),
    SKA('m2.ca.r1','Raisonner : un quotient',gM2CaR1,2),SKA('m2.ca.r2','Raisonner : Δ négatif',gM2CaR2,3),SKA('m2.ca.bar','Équation avec z et z̄',gM2CaBar,3)]});
