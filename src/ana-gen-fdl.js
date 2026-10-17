/* --- Parcours Analyse : fonctions et limites, dérivées, développements limités --- */
Object.assign(ANA_ERR,{
  'pe':{label:'Partie entière',tip:'⌊x⌋ est le plus grand entier inférieur ou égal à x. Pour un négatif, ⌊−2,3⌋ = −3 (et non −2).'},
  'domaine':{label:'Domaine de définition',tip:'On ne divise jamais par 0 et on ne prend la racine que d’un nombre positif ou nul : résous « dénominateur = 0 » ou « sous la racine ≥ 0 ».'},
  'parite':{label:'Parité',tip:'Calcule f(−x) : (−x)<sup>k</sup> = x<sup>k</sup> si k est pair, −x<sup>k</sup> si k est impair. f paire si f(−x) = f(x), impaire si f(−x) = −f(x).'},
  'fi':{label:'Forme indéterminée',tip:'0/0, ∞/∞, ∞ − ∞ ou 1<sup>∞</sup> ne valent ni 0 ni 1 : il faut transformer l’expression (factoriser, conjuguer, DL…).'},
  'lim-coef':{label:'Coefficient oublié',tip:'Fais apparaître exactement le motif connu : sin(ax)/x = a × sin(ax)/(ax) → a. Le coefficient a reste dans le résultat.'},
  'taux':{label:'Taux d’accroissement',tip:'τ = (f(b) − f(a)) ÷ (b − a) : c’est une pente moyenne, n’oublie pas de diviser.'},
  'derivee':{label:'Règle de dérivation',tip:'(xⁿ)′ = n xⁿ⁻¹ : on multiplie par l’exposant et on le diminue de 1. Quotient : (u′v − uv′) ÷ v².'},
  'chaine':{label:'Dérivée d’une composée',tip:'(g(u))′ = u′ × g′(u) : n’oublie pas de multiplier par la dérivée de l’intérieur.'},
  'tangente':{label:'Équation de la tangente',tip:'y = f(a) + f′(a)(x − a) : la pente est f′(a), pas f(a).'},
  'dl-coef':{label:'Coefficient d’un DL',tip:'Le coefficient de x<sup>k</sup> vaut f<sup>(k)</sup>(0) ÷ k!. Attention aux factorielles et à l’alternance des signes.'},
  'dl-ordre':{label:'DL arrêté trop tôt',tip:'Développe jusqu’au premier terme qui ne s’annule pas, et garde tous les produits qui donnent la puissance cherchée.'},
  'dl-pos':{label:'Position par rapport à la tangente',tip:'f(x) − tangente ≈ c x² près de 0 : c &gt; 0 au-dessus, c &lt; 0 au-dessous, c = 0 on regarde le terme suivant.'},
});
const fdec=(p,q)=>frH(new Fr(p,q));
const lim0=(e,a='0')=>`<span class="m">lim<sub>x→${a}</sub> ${e}</span>`;

/* Fonctions et limites */
const gFlIneq=()=>{if(Math.random()<.5){const a=R(2,9),s=R(-9,9),b=R(-9,9),c=a*s+b;
    return nq({instr:'Résous l’inéquation.',prompt:mx(`${a}x ${b<0?'−':'+'} ${Math.abs(b)} ≥ ${num(c)}`)+stx('Les solutions forment l’intervalle [s ; +∞[. Que vaut s ?'),labels:['s ='],t:[s],
      explain:`On isole x : ${a}x ≥ ${num(c)} ${b<0?'+':'−'} ${Math.abs(b)} = ${num(c-b)}. On divise par ${a}, positif : le sens ne change pas, x ≥ ${num(s)}.`,hint:'Passe le nombre de l’autre côté, puis divise par le coefficient de x.',
      diag:([v])=>near(v,(c+b)/a,1e-6)?'signe':null})}
  const m=R(-9,9),r=R(1,9);
  return nq({instr:'Lis l’intervalle.',prompt:mx(`|x ${m<0?'+':'−'} ${Math.abs(m)}| ≤ ${r}`)+stx('L’ensemble des solutions est un intervalle [u ; v]. Que vaut v ?'),labels:['v ='],t:[m+r],
    explain:`|x − ${num(m)}| ≤ ${r} : x est à distance au plus ${r} de ${num(m)}. Donc ${num(m-r)} ≤ x ≤ ${num(m+r)}.`,hint:'|x − m| est la distance entre x et m.',diag:([v])=>near(v,m-r,1e-6)||near(v,r-m,1e-6)?'signe':null})};
const gFlPE=()=>{const n=Math.random()<.5?R(-9,-1):R(0,9),d=R(1,9),x=n+d/10;
  return nq({instr:'Calcule la partie entière.',prompt:mx(`⌊${num(+x.toFixed(1))}⌋`),labels:['⌊x⌋ ='],t:[n],
    explain:`⌊x⌋ est le plus grand entier inférieur ou égal à x. ${num(+x.toFixed(1))} est entre ${n} et ${n+1} : l’entier juste en dessous est ${num(n)}.`,hint:'Place le nombre sur la droite graduée et prends l’entier juste à sa gauche.',diag:([v])=>near(v,n+1,1e-6)?'pe':null})};
const gFlDom=()=>{if(Math.random()<.6){const a=R(1,5),k=R(-6,6),b=a*k,p=R(1,5);let q;do q=R(-9,9);while(p*k+q===0);
    return nq({instr:'Quelle valeur de x est interdite ?',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`(${poly([p,q])})/(${poly([a,-b])})`),labels:['x ='],t:[k],
      explain:`On ne peut pas diviser par 0 : ${a===1?'':a}x ${b<=0?'+':'−'} ${Math.abs(b)} = 0 ⟺ x = ${num(k)}.`,hint:'Résous « dénominateur = 0 ».',diag:([v])=>near(v,-k,1e-6)&&k?'signe':near(v,b,1e-6)||near(v,-q/p,1e-6)?'domaine':null})}
  const k=R(-9,9);return nq({instr:'Trouve la plus petite valeur de x pour laquelle f(x) est définie.',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`sqrt(${poly([1,-k])})`),labels:['x ='],t:[k],
    explain:`Sous la racine, il faut x ${k<0?'+':'−'} ${Math.abs(k)} ≥ 0, donc x ≥ ${num(k)}.`,hint:'Sous une racine carrée, le nombre doit être positif ou nul.',diag:([v])=>near(v,-k,1e-6)&&k?'signe':near(v,0,1e-6)?'domaine':null})};
const gFlPar=()=>{const t=R(0,2),O=['Paire','Impaire','Ni paire ni impaire','À la fois paire et impaire'];let n,m;
  if(t===0){n=pick([2,4,6]);do m=pick([2,4,6]);while(m===n)}else if(t===1){n=pick([1,3,5]);do m=pick([1,3,5]);while(m===n)}else{n=pick([2,4]);m=pick([1,3,5])}
  const a=nz(-5,5),b=nz(-5,5),e=`${a}x^${n}${sg(b)}x^${m}`.replace(/\^1(?!\d)/g,'');
  return mcq('Cette fonction est-elle paire ou impaire ?',`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(e),O.map((h,i)=>({h,ok:i===t,tag:'parite'})),
    `On calcule f(−x) : x<sup>${n}</sup> ${n%2?'change':'ne change pas'} de signe, x<sup>${m}</sup> ${m%2?'change':'ne change pas'} de signe. ${['f(−x) = f(x) : f est paire.','f(−x) = −f(x) : f est impaire.','Un terme change de signe et pas l’autre : ni paire ni impaire.'][t]}`,
    'Une puissance paire ne change pas de signe, une puissance impaire si. Le signe du coefficient ne compte pas.',true)};
const gFlLimInf=()=>{const n=R(2,3),a=R(1,9),d=R(1,9),b=R(-9,9),c=R(-9,9),e=R(-9,9),p=Math.random()<.75?n:n+1,t=p===n?a/d:0;
  const top=[a,...Array(n-2).fill(0),b,c],bot=[d,...Array(p-1).fill(0),e];
  return nq({instr:'Calcule la limite.',prompt:`<span class="m">lim<sub>x→+∞</sub></span> `+M(`(${poly(top)})/(${poly(bot)})`),labels:['Limite ='],t:[t],tol:.001,
    explain:p===n?`Même degré ${n} en haut et en bas : on garde les termes dominants, ${a}x<sup>${n}</sup>/(${d}x<sup>${n}</sup>) = ${fdec(a,d)}.`:`Le dénominateur (degré ${p}) l’emporte sur le numérateur (degré ${n}) : la limite est 0.`,
    hint:'En +∞, seuls les termes de plus haut degré comptent.',diag:([v])=>near(v,d/a,.001)||near(v,1,.001)||(e&&near(v,c/e,.001))?'limite-dom':null})};
const gFl00=()=>{if(Math.random()<.6){const a=R(-6,6);let b;do b=R(-6,6);while(b===a);
    return nq({instr:'Lève la forme indéterminée 0/0.',prompt:`<span class="m">lim<sub>x→${num(a)}</sub></span> `+M(`(${poly([1,-(a+b),a*b])})/(${poly([1,-a])})`),labels:['Limite ='],t:[a-b],
      explain:`En x = ${num(a)}, on obtient 0/0. On factorise : ${M(poly([1,-(a+b),a*b]))} = ${M(`(${poly([1,-a])})(${poly([1,-b])})`)}. On simplifie : il reste x ${b<0?'+':'−'} ${Math.abs(b)}, qui tend vers ${num(a-b)}.`,
      hint:'Le numérateur s’annule aussi en ce point : il contient le facteur du dénominateur.',diag:([v])=>near(v,0,1e-6)||near(v,1,1e-6)?'fi':near(v,b-a,1e-6)?'signe':null})}
  const k=R(1,5);return nq({instr:'Lève la forme indéterminée 0/0.',prompt:`<span class="m">lim<sub>x→${k*k}</sub></span> `+M(`(sqrt(x)-${k})/(x-${k*k})`),labels:['Limite ='],t:[1/(2*k)],tol:.001,
    explain:`x − ${k*k} = (√x − ${k})(√x + ${k}). On simplifie : il reste 1/(√x + ${k}) → 1/(2 × ${k}) = ${fdec(1,2*k)}.`,hint:'x − k² est une différence de deux carrés : (√x)² − k².',
    diag:([v])=>near(v,0,1e-6)||near(v,1,1e-6)?'fi':near(v,2*k,1e-6)||near(v,1/k,.001)?'lim-coef':null})};
const gFlRem=()=>{const a=pick([-9,-5,-3,-2,2,3,4,5,7,9]);let b;do b=pick([-6,-3,-2,2,3,5,7]);while(b===a);const v=R(0,4);
  const E=[[fr(`sin(${a}x)`,'x'),a],[fr(`sin(${a}x)`,`sin(${b}x)`),a/b],[fr(`e<sup>${a}x</sup> − 1`,'x'),a],[fr(`ln(1 ${a<0?'−':'+'} ${Math.abs(a)}x)`,'x'),a],[fr(`tan(${a}x)`,'x'),a]][v];
  return nq({instr:'Calcule la limite.',prompt:lim0(mx(E[0])),labels:['Limite ='],t:[E[1]],tol:.001,
    explain:v===1?`sin(${a}x)/sin(${b}x) = [sin(${a}x)/(${a}x)] × [(${b}x)/sin(${b}x)] × ${a}/${b} → ${fdec(a,b)}.`:`On fait apparaître le motif connu avec u = ${a}x → 0 : ${['sin u / u','','(e<sup>u</sup> − 1)/u','ln(1 + u)/u','tan u / u'][v]} → 1. La limite vaut ${num(a)}.`,
    hint:'sin u/u → 1, (e<sup>u</sup> − 1)/u → 1, ln(1 + u)/u → 1, tan u/u → 1 quand u → 0.',diag:([w])=>near(w,1,.001)||near(w,1/a,.001)||(v===1&&near(w,b/a,.001))?'lim-coef':near(w,0,.001)?'fi':null})};
const gFlE=()=>{if(Math.random()<.5){const k=pick([-6,-4,-3,-2,-1,2,3,4,5,6]);
    return nq({instr:'La limite s’écrit e<sup>N</sup>. Donne N.',prompt:`<span class="m">lim<sub>x→+∞</sub> (1 ${k<0?'−':'+'} ${fr(Math.abs(k),'x')})<sup>x</sup></span>`,labels:['N ='],t:[k],
      explain:`(1 + ${num(k)}/x)<sup>x</sup> = exp(x ln(1 + ${num(k)}/x)) et x ln(1 + ${num(k)}/x) → ${num(k)}. La limite vaut e<sup>${num(k)}</sup>.`,hint:'Forme 1<sup>∞</sup> : écris la puissance avec exp et ln.',diag:([w])=>near(w,0,1e-6)||near(w,1/k,.001)?'fi':null})}
  const p=R(-5,5);let q;do q=R(-5,5);while(q===p);
  return nq({instr:'La limite s’écrit e<sup>N</sup>. Donne N.',prompt:`<span class="m">lim<sub>x→+∞</sub> (${fr(`x ${p<0?'−':'+'} ${Math.abs(p)}`,`x ${q<0?'−':'+'} ${Math.abs(q)}`)})<sup>x</sup></span>`,labels:['N ='],t:[p-q],
    explain:`(x + ${num(p)})/(x + ${num(q)}) = (1 + ${num(p)}/x)/(1 + ${num(q)}/x). Puissance x : le haut tend vers e<sup>${num(p)}</sup>, le bas vers e<sup>${num(q)}</sup>. Quotient : e<sup>${num(p-q)}</sup>.`,
    hint:'Sépare le numérateur et le dénominateur, chacun de la forme (1 + a/x)<sup>x</sup>.',diag:([w])=>near(w,0,1e-6)?'fi':near(w,q-p,1e-6)?'signe':null})};
const gFlConj=()=>{const b=nz(-9,9),c=R(-9,9);
  return nq({instr:'Lève la forme ∞ − ∞.',prompt:`<span class="m">lim<sub>x→+∞</sub></span> `+M(`sqrt(${poly([1,b,c])})-x`),labels:['Limite ='],t:[b/2],tol:.001,
    explain:`On multiplie et divise par √(x² ${b<0?'−':'+'} ${Math.abs(b)}x ${c<0?'−':'+'} ${Math.abs(c)}) + x. Le numérateur devient ${num(b)}x ${c<0?'−':'+'} ${Math.abs(c)}, le dénominateur se comporte comme 2x : la limite vaut ${num(b)}/2 = ${num(b/2)}.`,
    hint:'Multiplie par la quantité conjuguée √A + x.',diag:([w])=>near(w,0,.001)?'fi':near(w,b,.001)||near(w,c/2,.001)?'lim-coef':null})};
const gFlCont=()=>{const k=R(-5,5),c=R(-4,4),m=c*c-k*c;
  return nq({instr:'Quelle valeur de m rend f continue ?',prompt:`<span class="stxt">f(x) = ${k}x + m si x &lt; ${num(c)}, et f(x) = x² si x ≥ ${num(c)}.</span>`,labels:['m ='],t:[m],
    explain:`Continuité en ${num(c)} : la limite à gauche ${k} × ${num(c)} + m doit valoir f(${num(c)}) = ${c*c}. Donc m = ${c*c} − (${k*c}) = ${m}.`,hint:'Écris que les deux morceaux donnent la même valeur au point de raccord.',
    diag:([v])=>near(v,c*c+k*c,1e-6)?'signe':near(v,c*c,1e-6)?'calc':null})};

/* Dérivées */
const gDTaux=()=>{const a=R(-5,5),h=R(1,4);
  if(Math.random()<.6)return nq({instr:'Calcule le taux d’accroissement.',prompt:stx(`f(x) = x². Taux d’accroissement entre ${num(a)} et ${num(a+h)} ?`),labels:['τ ='],t:[2*a+h],
    explain:`τ = (f(${num(a+h)}) − f(${num(a)})) ÷ ${h} = (${(a+h)**2} − ${a*a}) ÷ ${h} = ${2*a+h}.`,hint:'τ = (f(b) − f(a)) ÷ (b − a).',diag:([v])=>near(v,(a+h)**2-a*a,1e-6)&&h>1?'taux':null});
  const m=R(-6,6),p=R(-9,9);
  return nq({instr:'Calcule le taux d’accroissement.',prompt:stx(`f(x) = ${m}x ${p<0?'−':'+'} ${Math.abs(p)}. Taux d’accroissement entre ${num(a)} et ${num(a+h)} ?`),labels:['τ ='],t:[m],
    explain:`Pour une fonction affine, la sortie bouge de ${m} × ${h} quand l’entrée bouge de ${h} : τ = ${m}, la pente de la droite.`,hint:'Pour une droite, le taux d’accroissement est la pente.',diag:([v])=>near(v,m*h,1e-6)&&h>1?'taux':near(v,p,1e-6)?'taux':null})};
const gDPow=()=>{const a=R(1,5),n=R(2,5),x0=n===5?R(-2,2):R(-3,3),t=a*n*x0**(n-1);
  return nq({instr:'Calcule le nombre dérivé.',prompt:mx(`f(x) = ${a===1?'':a}x<sup>${n}</sup>`)+mx(`f′(${num(x0)}) = ?`),labels:[`f′(${num(x0)}) =`],t:[t],
    explain:`(x<sup>n</sup>)′ = n x<sup>n−1</sup>, donc f′(x) = ${a*n}x<sup>${n-1}</sup>. En x = ${num(x0)} : ${a*n} × (${num(x0)})<sup>${n-1}</sup> = ${num(t)}.`,hint:'On multiplie par l’exposant, puis on le diminue de 1.',
    diag:([v])=>near(v,a*n*x0**n,1e-6)||near(v,a*x0**(n-1),1e-6)||near(v,a*x0**n,1e-6)?'derivee':null})};
const DUS=[['sin x','cos x',['−cos x','sin x','−sin x']],['cos x','−sin x',['sin x','−cos x','cos x']],['e<sup>x</sup>','e<sup>x</sup>',['x e<sup>x−1</sup>','ln x',fr('e<sup>x</sup>','x')]],
  ['ln x',fr(1,'x'),[`−${fr(1,'x<sup>2</sup>')}`,'e<sup>x</sup>',fr(1,'x<sup>2</sup>')]],['√x',fr(1,'2√x'),[fr(1,'√x'),'2√x',`−${fr(1,'2√x')}`]],[fr(1,'x'),`−${fr(1,'x<sup>2</sup>')}`,[fr(1,'x<sup>2</sup>'),`−${fr(1,'x')}`,'ln x']],
  ['tan x','1 + tan<sup>2</sup>x',[fr(1,'cos x'),`−${fr(1,'cos<sup>2</sup>x')}`,'1 − tan<sup>2</sup>x']],['arctan x',fr(1,'1 + x<sup>2</sup>'),[fr(1,'1 − x<sup>2</sup>'),`−${fr(1,'1 + x<sup>2</sup>')}`,fr(1,'√(1 − x<sup>2</sup>)')]],
  ['arcsin x',fr(1,'√(1 − x<sup>2</sup>)'),[`−${fr(1,'√(1 − x<sup>2</sup>)')}`,fr(1,'1 + x<sup>2</sup>'),'√(1 − x<sup>2</sup>)']]];
const gDUs=()=>{let[F,ok,bad]=pick(DUS);if(Math.random()<.2){const n=R(2,6);F=`x<sup>${n}</sup>`;ok=`${n}x<sup>${n-1}</sup>`;bad=[`${n}x<sup>${n}</sup>`,`x<sup>${n-1}</sup>`,`${n-1}x<sup>${n-1}</sup>`]}
  return mcq('Quelle est la dérivée ?',mx(`f(x) = ${F}`),[{h:mx(ok),ok:true},...bad.map(h=>({h:mx(h),tag:'derivee'}))],`C’est une dérivée de référence à connaître : (${F})′ = ${ok}.`,'Révise la table des dérivées usuelles dans le cours.')};
const gDQuot=()=>{let a,b,c,d,x0;do{a=R(-5,5);b=R(-5,5);c=nz(-3,3);d=R(-5,5);x0=R(-3,3)}while(a*d-b*c===0||Math.abs(c*x0+d)<1||Math.abs(c*x0+d)>3);const D=c*x0+d,t=(a*d-b*c)/(D*D);
  return nq({instr:'Calcule le nombre dérivé.',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`(${poly([a,b])})/(${poly([c,d])})`)+mx(`f′(${num(x0)}) = ?`),labels:[`f′(${num(x0)}) =`],t:[t],tol:.001,
    explain:`u = ${poly([a,b]).replace(/-/g,'−')}, u′ = ${a} ; v = ${poly([c,d]).replace(/-/g,'−')}, v′ = ${c}. f′ = (u′v − uv′)/v² = ${a*d-b*c}/v². En x = ${num(x0)}, v = ${D} : f′ = ${fdec(a*d-b*c,D*D)}.`,
    hint:'(u/v)′ = (u′v − uv′) ÷ v².',diag:([v])=>near(v,-t,.001)&&t?'signe':near(v,(a*d-b*c)/D,.001)||(c&&near(v,a/c,.001))?'derivee':null})};
const gDComp=()=>{const a=R(2,9),b=R(-9,9),n=R(2,5),u=`${a}x ${b<0?'−':'+'} ${Math.abs(b)}`,v=R(0,5);
  const T=[[`sin(${u})`,`${a} cos(${u})`,[`cos(${u})`,`−${a} cos(${u})`,`${a} sin(${u})`]],[`cos(${u})`,`−${a} sin(${u})`,[`−sin(${u})`,`${a} sin(${u})`,`−${a} cos(${u})`]],
    [`e<sup>${u}</sup>`,`${a} e<sup>${u}</sup>`,[`e<sup>${u}</sup>`,`${a} e<sup>${a}</sup>`,`(${u}) e<sup>${u}</sup>`]],[`ln(${u})`,fr(a,u),[fr(1,u),fr(`${a}x`,u),`${a} ln(${u})`]],
    [`(${u})<sup>${n}</sup>`,`${n*a}(${u})<sup>${n-1}</sup>`,[`${n}(${u})<sup>${n-1}</sup>`,`${n*a}(${u})<sup>${n}</sup>`,`${a}(${u})<sup>${n-1}</sup>`]],[`√(${u})`,fr(a,`2√(${u})`),[fr(1,`2√(${u})`),fr(a,`√(${u})`),`${a}√(${u})`]]][v];
  return mcq('Quelle est la dérivée ?',mx(`f(x) = ${T[0]}`),[{h:mx(T[1]),ok:true},...T[2].map(h=>({h:mx(h),tag:'chaine'}))],`On pose u = ${u}, donc u′ = ${a}. Règle de la chaîne : (g(u))′ = u′ × g′(u), d’où ${T[1]}.`,'Dérive l’extérieur, puis multiplie par la dérivée de l’intérieur.')};
const gDTan=()=>{const b=R(-9,9),c=R(-9,9),x0=R(-4,4),fx=x0*x0+b*x0+c,m=2*x0+b,p=c-x0*x0,A=Math.random()<.5;
  return nq({instr:`La tangente en x = ${num(x0)} a pour équation y = mx + p. Que vaut ${A?'m':'p'} ?`,prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(poly([1,b,c])),labels:[A?'m =':'p ='],t:[A?m:p],
    explain:`f(${num(x0)}) = ${num(fx)} et f′(x) = 2x ${b<0?'−':'+'} ${Math.abs(b)}, donc f′(${num(x0)}) = ${num(m)}. Tangente : y = ${num(fx)} + ${num(m)}(x − ${num(x0)}) = ${num(m)}x ${p<0?'−':'+'} ${Math.abs(p)}.`,
    hint:'y = f(a) + f′(a)(x − a).',diag:([v])=>near(v,fx,1e-6)||(!A&&near(v,fx+m*x0,1e-6))?'tangente':null})};
const gDExt=()=>{const v=R(0,2);
  if(v<2){const a=nz(-4,4),s=R(-5,5),b=-2*a*s,c=R(-9,9),val=c-a*s*s;
    return nq({instr:v?'Quelle est la valeur de l’extremum ?':'En quelle valeur de x l’extremum est-il atteint ?',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(poly([a,b,c])),labels:[v?'Valeur =':'x ='],t:[v?val:s],
      explain:`f′(x) = ${2*a}x ${b<0?'−':'+'} ${Math.abs(b)} = 0 ⟺ x = ${num(s)}. C’est un ${a>0?'minimum':'maximum'}, de valeur f(${num(s)}) = ${num(val)}.`,hint:'Résous f′(x) = 0.',
      diag:([w])=>!v&&near(w,-s,1e-6)&&s?'signe':!v&&near(w,-b/a,1e-6)?'derivee':v&&near(w,c,1e-6)?'calc':null})}
  const k=R(1,4);return nq({instr:'En quelle valeur positive de x la dérivée s’annule-t-elle ?',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`x^3-${3*k*k}x`),labels:['x ='],t:[k],
    explain:`f′(x) = 3x² − ${3*k*k} = 3(x² − ${k*k}) = 0 ⟺ x = ±${k}. La valeur positive est ${k}.`,hint:'Dérive, factorise par 3, puis résous x² = k².',diag:([w])=>near(w,3*k*k,1e-6)||near(w,k*k,1e-6)?'derivee':null})};
const gDOpt=()=>{const v=R(0,2);
  if(v===0){const P=4*R(1,10);return nq({instr:'Trouve l’aire maximale.',prompt:stx(`Un rectangle a un périmètre de ${P} cm. Quelle est son aire maximale (en cm²) ?`),labels:['Aire ='],t:[P*P/16],
    explain:`Côtés x et ${P/2} − x : A(x) = x(${P/2} − x), A′(x) = ${P/2} − 2x = 0 ⟺ x = ${P/4}. C’est un carré : A = ${P/4}² = ${P*P/16}.`,hint:'Exprime l’aire avec un seul côté, puis dérive.',diag:([w])=>near(w,P/4,1e-6)||near(w,P*P/4,1e-6)?'calc':null})}
  if(v===1){const Rr=R(1,10);return nq({instr:'Trouve l’aire maximale.',prompt:stx(`On inscrit un rectangle dans un demi-disque de rayon ${Rr}, sa base sur le diamètre. Quelle est son aire maximale ?`),labels:['Aire ='],t:[Rr*Rr],
    explain:`Le coin est en (x ; √(${Rr*Rr} − x²)) : A(x) = 2x√(${Rr*Rr} − x²). A′(x) = 0 ⟺ x = ${Rr}/√2, d’où A = 2 × (${Rr}/√2)² = ${Rr*Rr}.`,hint:'Aire = 2x × √(R² − x²) ; cherche où la dérivée s’annule.',diag:([w])=>near(w,Rr*Rr/2,1e-6)||near(w,2*Rr*Rr,1e-6)?'calc':null})}
  const Rc=3*R(1,20);return nq({instr:'Trouve le rayon optimal.',prompt:stx(`Un cylindre est inscrit dans un cône de rayon de base ${Rc} cm. Quel rayon r (en cm) donne le plus grand volume ?`),labels:['r ='],t:[2*Rc/3],
    explain:`Avec les triangles semblables, h = H(1 − r/${Rc}) et V(r) = πH(r² − r³/${Rc}). V′(r) = πH(2r − 3r²/${Rc}) = 0 ⟺ r = 2 × ${Rc}/3 = ${2*Rc/3}.`,hint:'Exprime la hauteur en fonction de r, puis dérive le volume.',diag:([w])=>near(w,Rc/2,1e-6)||near(w,Rc/3,1e-6)?'calc':null})};
const gDTaf=()=>{if(Math.random()<.5){const s=R(1,5),t=R(s+1,6);
    return nq({instr:'Trouve c (théorème des accroissements finis).',prompt:mx(`f(x) = ${fr(1,'x')} sur [${s*s} ; ${t*t}]`)+stx(`Trouve c tel que f(${t*t}) − f(${s*s}) = (${t*t} − ${s*s}) f′(c).`),labels:['c ='],t:[s*t],
      explain:`Pente moyenne : (1/${t*t} − 1/${s*s}) ÷ (${t*t} − ${s*s}) = −1/(${s*s} × ${t*t}). Comme f′(c) = −1/c², on a c² = ${s*s*t*t}, donc c = ${s*t}.`,hint:'Calcule la pente moyenne, puis résous f′(c) = pente moyenne.',diag:([w])=>near(w,(s*s+t*t)/2,1e-6)?'calc':null})}
  const q=R(-9,9),a=R(-6,4),b=a+2*R(1,4);
  return nq({instr:'Trouve c (théorème des accroissements finis).',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(poly([1,q,0]))+stx(`sur [${num(a)} ; ${num(b)}]. Trouve c tel que f(b) − f(a) = (b − a) f′(c).`),labels:['c ='],t:[(a+b)/2],
    explain:`Pente moyenne : a + b + q = ${a+b+q}. f′(c) = 2c ${q<0?'−':'+'} ${Math.abs(q)}, donc c = (${num(a)} + ${num(b)})/2 = ${num((a+b)/2)} : le milieu.`,hint:'Pour un polynôme de degré 2, c est le milieu de l’intervalle.',diag:([w])=>near(w,b-a,1e-6)||near(w,a+b,1e-6)?'calc':null})};
const gDHop=()=>{const v=R(0,2);
  if(v===0){const a=R(1,3),n=R(2,4);return nq({instr:'Calcule la limite (règle de L’Hospital).',prompt:`<span class="m">lim<sub>x→${a}</sub></span> `+M(`(x^${n}-${a**n})/(x-${a})`),labels:['Limite ='],t:[n*a**(n-1)],
    explain:`Forme 0/0 : on dérive le haut et le bas séparément, ${n}x<sup>${n-1}</sup>/1 → ${n} × ${a}<sup>${n-1}</sup> = ${n*a**(n-1)}.`,hint:'Dérive le numérateur et le dénominateur séparément.',diag:([w])=>near(w,0,1e-6)||near(w,1,1e-6)?'fi':near(w,a**n,1e-6)||near(w,n*a**n,1e-6)?'derivee':null})}
  const p=nz(-6,6),q=nz(-6,6);
  if(v===1)return nq({instr:'Calcule la limite (règle de L’Hospital).',prompt:lim0(mx(fr(`e<sup>${p}x</sup> − 1`,`sin(${q}x)`))),labels:['Limite ='],t:[p/q],tol:.001,
    explain:`Forme 0/0. Dérivées : ${p}e<sup>${p}x</sup> et ${q}cos(${q}x), qui valent ${p} et ${q} en 0 : la limite est ${fdec(p,q)}.`,hint:'Dérive le haut et le bas, puis remplace x par 0.',diag:([w])=>near(w,q/p,.001)?'lim-coef':near(w,0,.001)||near(w,1,.001)?'fi':null});
  return nq({instr:'Calcule la limite (règle de L’Hospital).',prompt:lim0(mx(fr('x',`tan(${q}x)`))),labels:['Limite ='],t:[1/q],tol:.001,
    explain:`Forme 0/0. Dérivées : 1 et ${q}(1 + tan²(${q}x)), qui vaut ${q} en 0 : la limite est ${fdec(1,q)}.`,hint:'(tan u)′ = u′(1 + tan² u).',diag:([w])=>near(w,q,.001)?'lim-coef':null})};

/* Développements limités */
const DLF=[['e<sup>x</sup>',k=>1/fact(k),'1 + x + x²/2 + x³/6 + x⁴/24'],['sin x',k=>k%2?(-1)**((k-1)/2)/fact(k):0,'x − x³/6 + …'],['cos x',k=>k%2?0:(-1)**(k/2)/fact(k),'1 − x²/2 + x⁴/24 − …'],
  ['ln(1 + x)',k=>k?(-1)**(k+1)/k:0,'x − x²/2 + x³/3 − x⁴/4 + …'],[fr(1,'1 − x'),()=>1,'1 + x + x² + x³ + x⁴ + …'],[fr(1,'1 + x'),k=>(-1)**k,'1 − x + x² − x³ + x⁴ − …'],['√(1 + x)',k=>[1,.5,-.125,.0625][k],'1 + x/2 − x²/8 + x³/16 + …']];
const gDlCoef=()=>{const i=R(0,6),[F,f,dl]=DLF[i],k=R(0,i===6?3:4),t=f(k);
  return nq({instr:`Quel est le coefficient de x<sup>${k}</sup> ?`,prompt:stx('Développement limité en 0 de')+mx(F),labels:['Coefficient ='],t:[t],tol:.0001,
    explain:`DL de référence : ${F} = ${dl}. Le coefficient de x<sup>${k}</sup> est ${num(+t.toFixed(4))}.`,hint:'Révise les DL usuels en 0 du cours.',diag:([w])=>k&&(near(w,1/k,.0002)||near(w,-t,.0002)&&t)?'dl-coef':null})};
const gDlEax=()=>{const a=nz(-3,3),k=R(1,3),t=a**k/fact(k);
  return nq({instr:`Quel est le coefficient de x<sup>${k}</sup> ?`,prompt:stx('Développement limité en 0 de')+mx(`e<sup>${a}x</sup>`),labels:['Coefficient ='],t:[t],tol:.0001,
    explain:`On remplace u par ${a}x dans e<sup>u</sup> = 1 + u + u²/2 + u³/6 : le terme en x<sup>${k}</sup> est (${a})<sup>${k}</sup>/${k}! = ${fdec(a**k,fact(k))}.`,hint:'e<sup>u</sup> = 1 + u + u²/2! + u³/3! + …',
    diag:([w])=>near(w,a/fact(k),.0002)||near(w,a**k,.0002)||near(w,Math.abs(a)**k/fact(k),.0002)?'dl-coef':null})};
const gDlDer=()=>{const c=[R(-6,6),nz(-6,6),nz(-6,6),nz(-6,6)],k=R(1,3),t=fact(k)*c[k];
  return nq({instr:`Que vaut ${['','f′(0)','f″(0)','f‴(0)'][k]} ?`,prompt:mx(`f(x) = ${num(c[0])} ${c[1]<0?'−':'+'} ${Math.abs(c[1])}x ${c[2]<0?'−':'+'} ${Math.abs(c[2])}x<sup>2</sup> ${c[3]<0?'−':'+'} ${Math.abs(c[3])}x<sup>3</sup> + o(x<sup>3</sup>)`),labels:['Valeur ='],t:[t],
    explain:`Taylor : le coefficient de x<sup>${k}</sup> vaut f<sup>(${k})</sup>(0)/${k}!. Donc f<sup>(${k})</sup>(0) = ${k}! × ${num(c[k])} = ${num(t)}.`,hint:'Coefficient de x<sup>k</sup> = f<sup>(k)</sup>(0) ÷ k!.',diag:([w])=>k>1&&near(w,c[k],1e-6)||near(w,c[k]/fact(k),.001)?'dl-coef':null})};
const gDlTay=()=>{if(Math.random()<.6){const n=R(2,4),a=nz(-3,3),k=R(1,n),t=Cnk(n,k)*a**(n-k);
    return nq({instr:`Quel est le coefficient de (x − ${num(a)})<sup>${k}</sup> ?`.replace('− −','+ '),prompt:stx(`DL de f(x) = x<sup>${n}</sup> au voisinage de ${num(a)}.`),labels:['Coefficient ='],t:[t],
      explain:`On pose h = x − ${num(a)} : x<sup>${n}</sup> = (${num(a)} + h)<sup>${n}</sup>. Par la formule du binôme, le coefficient de h<sup>${k}</sup> est C(${n} ; ${k}) × ${num(a)}<sup>${n-k}</sup> = ${num(t)}.`,
      hint:'Coefficient = f<sup>(k)</sup>(a) ÷ k!, ou formule du binôme avec h = x − a.',diag:([w])=>near(w,fact(k)*t,1e-6)&&k>1||near(w,a**(n-k),1e-6)?'dl-coef':null})}
  const k=R(1,5),t=(-1)**(k+1)/k;
  return nq({instr:`Quel est le coefficient de (x − 1)<sup>${k}</sup> ?`,prompt:stx('DL de ln x au voisinage de 1.'),labels:['Coefficient ='],t:[t],tol:.0001,
    explain:`On pose h = x − 1 : ln x = ln(1 + h) = h − h²/2 + h³/3 − h⁴/4 + h⁵/5. Le coefficient de h<sup>${k}</sup> est ${fdec((-1)**(k+1),k)}.`,hint:'ln x = ln(1 + h) avec h = x − 1.',diag:([w])=>near(w,1/k,.0002)&&k%2===0||near(w,1/fact(k),.0002)?'dl-coef':null})};
const gDlProd=()=>{if(Math.random()<.5){const a=nz(-4,4),b=nz(-4,4),t=b*b/2+a*b;
    return nq({instr:'Quel est le coefficient de x² ?',prompt:stx('DL en 0 de')+mx(`(1 ${a<0?'−':'+'} ${Math.abs(a)}x) e<sup>${b}x</sup>`),labels:['Coefficient ='],t:[t],tol:.001,
      explain:`e<sup>${b}x</sup> = 1 + ${b}x + (${b}²/2)x² + o(x²). Les termes en x² viennent de 1 × (${b*b}/2)x² et de ${a}x × ${b}x : total ${num(b*b/2)} + ${a*b} = ${num(t)}.`,hint:'Garde tous les produits qui donnent x².',diag:([w])=>near(w,b*b/2,.001)||near(w,a*b,.001)?'dl-ordre':null})}
  const a=R(1,5),t=-1/6-a*a/2;
  return nq({instr:'Quel est le coefficient de x³ ?',prompt:stx('DL en 0 de')+mx(`sin x · cos(${a}x)`),labels:['Coefficient ='],t:[t],tol:.001,
    explain:`sin x = x − x³/6 et cos(${a}x) = 1 − (${a*a}/2)x². Termes en x³ : x × (−${a*a}/2)x² et (−x³/6) × 1. Total : −1/6 − ${a*a}/2 ≈ ${dec(t,4)}.`,hint:'Multiplie les deux DL et garde les termes en x³.',diag:([w])=>near(w,-1/6,.001)||near(w,-a*a/2,.001)?'dl-ordre':null})};
const gDlComp=()=>{const a=pick([-4,-3,-2,2,3,4]),b=R(-3,3),v=R(0,4);
  const T=[[`ln(1 ${a<0?'−':'+'} ${Math.abs(a)}x)`,-a*a/2,`ln(1 + u) = u − u²/2 avec u = ${a}x : coefficient −${a*a}/2.`],[`√(1 ${a<0?'−':'+'} ${Math.abs(a)}x)`,-a*a/8,`√(1 + u) = 1 + u/2 − u²/8 avec u = ${a}x : coefficient −${a*a}/8.`],
    [fr(1,`1 ${a<0?'+':'−'} ${Math.abs(a)}x`),a*a,`1/(1 − u) = 1 + u + u² avec u = ${a}x : coefficient ${a*a}.`],[`√(1 + x ${b<0?'−':'+'} ${Math.abs(b)}x<sup>2</sup>)`,b/2-1/8,`√(1 + u) = 1 + u/2 − u²/8 avec u = x + ${num(b)}x² : u² = x² + o(x²), coefficient ${num(b)}/2 − 1/8.`],
    [`ln(1 ${a<0?'−':'+'} ${Math.abs(a)}x<sup>2</sup>)`,a,`ln(1 + u) = u + o(u) avec u = ${a}x² : coefficient ${a}.`]][v];
  return nq({instr:'Quel est le coefficient de x² ?',prompt:stx('DL en 0 de')+mx(T[0]),labels:['Coefficient ='],t:[T[1]],tol:.001,explain:T[2],hint:'Pose u = …, écris le DL de référence en u, puis remplace u.',
    diag:([w])=>(v===0&&(near(w,-a/2,.001)||near(w,a*a/2,.001)))||(v===1&&near(w,-1/8,.001))||(v===2&&near(w,a,.001))||(v===3&&near(w,b/2,.001))||(v===4&&near(w,-a*a/2,.001))?'dl-coef':null})};
const gDlQuot=()=>{let a,b;do{a=R(-4,4);b=R(-4,4)}while(!a&&!b);const t=a*a-b;
  return nq({instr:'Quel est le coefficient de x² ?',prompt:stx('DL en 0 de')+`<span class="m">${fr(1,`1 ${a<0?'−':'+'} ${Math.abs(a)}x ${b<0?'−':'+'} ${Math.abs(b)}x<sup>2</sup>`)}</span>`,labels:['Coefficient ='],t:[t],
    explain:`On pose u = ${a}x + ${b}x². 1/(1 + u) = 1 − u + u² + o(u²) et u² = ${a*a}x² + o(x²). Coefficient de x² : −(${b}) + ${a*a} = ${t}.`,hint:'1/(1 + u) = 1 − u + u² − …',diag:([w])=>near(w,-b,1e-6)||near(w,a*a+b,1e-6)?'dl-ordre':null})};
const gDlLim=()=>{const a=R(1,4),b=R(1,4),v=R(0,4);
  const T=[[fr(`e<sup>${a}x</sup> − 1 − ${a}x`,'x<sup>2</sup>'),a*a/2,`e<sup>${a}x</sup> = 1 + ${a}x + (${a*a}/2)x² + o(x²) : la limite vaut ${num(a*a/2)}.`],[fr(`1 − cos(${a}x)`,'x<sup>2</sup>'),a*a/2,`cos(${a}x) = 1 − (${a*a}/2)x² + o(x²) : la limite vaut ${num(a*a/2)}.`],
    [fr(`${a}x − sin(${a}x)`,'x<sup>3</sup>'),a**3/6,`sin(${a}x) = ${a}x − (${a**3}/6)x³ + o(x³) : la limite vaut ${a**3}/6.`],[fr(`ln(1 + ${a}x) − ${a}x`,'x<sup>2</sup>'),-a*a/2,`ln(1 + ${a}x) = ${a}x − (${a*a}/2)x² + o(x²) : la limite vaut −${a*a}/2.`],
    [fr(`e<sup>${a}x<sup>2</sup></sup> − cos(${b}x)`,'x<sup>2</sup>'),a+b*b/2,`e<sup>${a}x²</sup> = 1 + ${a}x² et cos(${b}x) = 1 − (${b*b}/2)x² : le numérateur vaut (${a} + ${b*b}/2)x², limite ${num(a+b*b/2)}.`]][v];
  return nq({instr:'Calcule la limite avec un développement limité.',prompt:lim0(mx(T[0])),labels:['Limite ='],t:[T[1]],tol:.001,explain:T[2],hint:'Développe le numérateur jusqu’au premier terme non nul.',
    diag:([w])=>near(w,0,.001)?'dl-ordre':near(w,a,.001)||near(w,a/2,.001)||near(w,-T[1],.001)?'dl-coef':null})};
const gDlPos=()=>{let a,b,s;do{a=nz(-3,3);b=R(-5,5);s=a*a/2+b}while(s===0&&Math.random()<.6);const O=['Au-dessus de sa tangente','Au-dessous de sa tangente','Elle traverse sa tangente','Elle est confondue avec sa tangente'],c=s>0?0:s<0?1:2;
  return mcq('Près de x = 0, où est la courbe par rapport à sa tangente ?',mx(`f(x) = e<sup>${a}x</sup> ${b<0?'−':'+'} ${Math.abs(b)}x<sup>2</sup>`),O.map((h,i)=>({h,ok:i===c,tag:'dl-pos'})),
    `e<sup>${a}x</sup> = 1 + ${a}x + (${a*a}/2)x² + …, donc f(x) − (1 + ${a}x) ≈ (${num(a*a/2)} ${b<0?'−':'+'} ${Math.abs(b)})x² = ${num(s)}x². ${c===0?'Positif : au-dessus.':c===1?'Négatif : au-dessous.':'Nul : le terme suivant en x³ change de signe, la courbe traverse sa tangente.'}`,
    'Compare la courbe et la tangente avec le terme en x² du DL.',true)};
const gDlAsy=()=>{if(Math.random()<.5){const b=nz(-9,9),c=R(-9,9);
    return nq({instr:'L’asymptote en +∞ est y = x + p. Que vaut p ?',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`sqrt(${poly([1,b,c])})`),labels:['p ='],t:[b/2],tol:.001,
      explain:`√(x² + ${b}x + ${c}) = x√(1 + ${b}/x + ${c}/x²) = x(1 + ${b}/(2x) + o(1/x)) = x + ${num(b/2)} + o(1).`,hint:'Mets x² en facteur sous la racine et utilise √(1 + u) ≈ 1 + u/2.',diag:([w])=>near(w,b,.001)||near(w,c/2,.001)||near(w,0,.001)?'lim-coef':null})}
  const p=R(-9,9),q=R(-9,9),r=nz(-5,5);
  return nq({instr:'L’asymptote en +∞ est y = x + m. Que vaut m ?',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`(${poly([1,p,q])})/(${poly([1,r])})`),labels:['m ='],t:[p-r],
    explain:`Avec t = 1/x : f(x) = x(1 + ${p}t + ${q}t²)/(1 + ${r}t) = x(1 + (${p} − ${r})t + o(t)) = x + ${num(p-r)} + o(1).`,hint:'Divise le polynôme du haut par x + r, ou fais un DL en 1/x.',diag:([w])=>near(w,p,1e-6)||near(w,p+r,1e-6)?'lim-coef':null})};
