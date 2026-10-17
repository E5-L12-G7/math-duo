/* ===================== Parcours Analyse : exercices générés ===================== */
const uN=(i,v='u')=>`${v}<sub>${i}</sub>`;
const nPoly=cs=>{const s=poly(cs).replace(/x\^(\d)/g,'n<sup>$1</sup>').replace(/x/g,'n').replace(/-/g,' − ').replace(/\+/g,' + ').trim();return s.startsWith('−')?'−'+s.slice(1).trim():s};
const frS=(p,q)=>q===1?num(p):(p<0?'−':'')+fr(Math.abs(p),q);
const ANA_ERR={
  'suite-indice':{label:'Décalage d’indice',tip:'De u<sub>0</sub> à u<sub>n</sub>, il y a n étapes. Si la suite commence à u<sub>1</sub>, l’exposant ou le facteur devient n − 1.'},
  'suite-type':{label:'Arithmétique ou géométrique',tip:'Arithmétique : on ajoute r, u<sub>n</sub> = u<sub>0</sub> + nr. Géométrique : on multiplie par q, u<sub>n</sub> = u<sub>0</sub>q<sup>n</sup>.'},
  'suite-var':{label:'Sens de variation',tip:'Regarde le signe de u<sub>n+1</sub> − u<sub>n</sub>. Géométrique à termes positifs : q &gt; 1 croissante, 0 &lt; q &lt; 1 décroissante, q &lt; 0 signes alternés.'},
  'suite-thm':{label:'Théorèmes sur les suites',tip:'Croissante et majorée ⇒ converge ; décroissante et minorée ⇒ converge. Monotone ne suffit pas, convergente n’implique pas monotone.'},
  'suite-somme':{label:'Nombre de termes d’une somme',tip:'De u<sub>0</sub> à u<sub>n</sub>, il y a n + 1 termes : S = u<sub>0</sub>(1 − q<sup>n+1</sup>) ÷ (1 − q).'},
  'pourcent':{label:'Évolution en pourcentage',tip:'Baisser de t % revient à multiplier par 1 − t/100, à chaque étape : P<sub>n</sub> = P<sub>0</sub>(1 − t/100)<sup>n</sup>.'},
  'limite-dom':{label:'Termes dominants',tip:'À l’infini, seuls les termes de plus haut degré comptent : même degré → quotient des coefficients, dénominateur plus fort → 0.'},
  'limite-fi':{label:'Limite de référence',tip:'(1 + a/n)<sup>n</sup> → e<sup>a</sup>, n·sin(a/n) → a, n²(1 − cos(a/n)) → a²/2. Fais apparaître exactement la forme de référence.'},
  'point-fixe':{label:'Point fixe',tip:'Si u<sub>n+1</sub> = f(u<sub>n</sub>) converge vers ℓ, alors ℓ = f(ℓ) : résous cette équation.'},
  'serie-somme':{label:'Somme d’une série',tip:'Somme géométrique : premier terme ÷ (1 − raison). Somme partielle : additionne tous les termes, sans en oublier.'},
  'serie-cv':{label:'Convergence d’une série',tip:'Si u<sub>n</sub> ne tend pas vers 0, la série diverge. Mais u<sub>n</sub> → 0 ne suffit pas. Géométrique : converge ⟺ |q| &lt; 1.'},
  'serie-riemann':{label:'Séries de Riemann',tip:'∑ 1/n<sup>p</sup> converge exactement quand p &gt; 1 (strictement). √n = n<sup>1/2</sup>.'},
  'dalembert':{label:'Règles de d’Alembert et de Cauchy',tip:'ℓ = lim |u<sub>n+1</sub>/u<sub>n</sub>| (ou lim ⁿ√|u<sub>n</sub>|) : ℓ &lt; 1 converge, ℓ &gt; 1 diverge, ℓ = 1 on ne sait pas.'},
  'rayon':{label:'Rayon de convergence',tip:'R = 1/ℓ, avec ℓ = lim |a<sub>n+1</sub>/a<sub>n</sub>| ou lim ⁿ√|a<sub>n</sub>| : ne confonds pas ℓ et R.'},
};

/* --- Suites numériques --- */
const gSuA=()=>{const a=R(-20,20),r=nz(-9,9),n=R(2,15),t=a+n*r;
  return nq({instr:'Calcule le terme demandé.',prompt:stx(`La suite (u<sub>n</sub>) est arithmétique, de premier terme u<sub>0</sub> = ${num(a)} et de raison r = ${num(r)}.`)+mx(`${uN(n)} = ?`),labels:[`${uN(n)} =`],t:[t],
    explain:`On ajoute r à chaque étape. De u<sub>0</sub> à ${uN(n)}, il y a ${n} étapes : ${uN(n)} = ${num(a)} + ${n} × (${num(r)}) = ${num(t)}.`,hint:'Suite arithmétique : u<sub>n</sub> = u<sub>0</sub> + n × r.',
    diag:([v])=>near(v,a+(n-1)*r,1e-6)?'suite-indice':near(v,a*r**n,1e-6)?'suite-type':null})};
const gSuG=()=>{let a,q,n,qs;if(Math.random()<.7){a=R(1,10);q=pick([-3,-2,2,3]);n=R(2,6);qs=num(q)}else{const k=R(4,8);a=2**k;q=.5;n=R(2,k);qs=fr(1,2)}const t=a*q**n;
  return nq({instr:'Calcule le terme demandé.',prompt:stx(`La suite (u<sub>n</sub>) est géométrique, de premier terme u<sub>0</sub> = ${num(a)} et de raison q = `)+mx(qs)+mx(`${uN(n)} = ?`),labels:[`${uN(n)} =`],t:[t],
    explain:`On multiplie par q à chaque étape, ${n} fois : ${uN(n)} = ${num(a)} × (${q===.5?'1/2':num(q)})<sup>${n}</sup> = ${num(t)}.`,hint:'Suite géométrique : u<sub>n</sub> = u<sub>0</sub> × q<sup>n</sup>.',
    diag:([v])=>near(v,a+n*q,1e-6)?'suite-type':near(v,a*q**(n-1),1e-6)?'suite-indice':null})};
const gSuVar=()=>{const L2=['Croissante','Décroissante','Constante','Ni croissante ni décroissante'];
  if(Math.random()<.4){const r=R(-9,9),c=r>0?0:r<0?1:2;
    return mcq('Quel est le sens de variation ?',stx(`(u<sub>n</sub>) est arithmétique de raison r = ${num(r)}.`),L2.slice(0,3).map((h,i)=>({h,ok:i===c,tag:'suite-var'})),`u<sub>n+1</sub> − u<sub>n</sub> = r = ${num(r)} : ${['positif, la suite monte','négatif, la suite descend','nul, la suite ne bouge pas'][c]}.`,'Regarde le signe de la raison.',true)}
  const a=R(1,10),q=pick([.5,.985,1,1.02,2,3,-2,-.5]),c=q>1?0:q>0&&q<1?1:q===1?2:3;
  return mcq('Quel est le sens de variation ?',stx(`(u<sub>n</sub>) est géométrique, avec u<sub>0</sub> = ${a} et q = ${num(q)}.`),L2.map((h,i)=>({h,ok:i===c,tag:'suite-var'})),
    `u<sub>n+1</sub> − u<sub>n</sub> = u<sub>n</sub>(q − 1). ${c===3?'Comme q &lt; 0, les termes changent de signe à chaque étape : ni croissante ni décroissante.':c===2?'q = 1 : tous les termes sont égaux.':`Les termes sont positifs et q − 1 ${c===0?'&gt;':'&lt;'} 0 : la suite est ${c===0?'croissante':'décroissante'}.`}`,'Compare q à 0 et à 1.',true)};
const VF=[['|u<sub>n</sub>| majorée ⇒ (u<sub>n</sub>) bornée.',1,'Si |u<sub>n</sub>| ≤ a, alors −a ≤ u<sub>n</sub> ≤ a.'],
  ['|u<sub>n</sub>| → 0 ⇒ u<sub>n</sub> → 0.',1,'La distance à 0 tend vers 0 : c’est exactement u<sub>n</sub> → 0.'],
  ['u<sub>n</sub> &gt; 0 et u<sub>n</sub> → ℓ ⇒ ℓ &gt; 0.',0,'Contre-exemple : 1/n &gt; 0 mais tend vers 0. On a seulement ℓ ≥ 0.'],
  ['u<sub>n</sub> → 0 ⇒ u<sub>n</sub>·v<sub>n</sub> → 0 pour toute suite (v<sub>n</sub>).',0,'Contre-exemple : (1/n) × n = 1. Il faut que (v<sub>n</sub>) soit bornée.'],
  ['|u<sub>n</sub> + v<sub>n</sub>| converge ⇒ |u<sub>n</sub>| et |v<sub>n</sub>| convergent.',0,'Contre-exemple : u<sub>n</sub> = n et v<sub>n</sub> = −n.'],
  ['u<sub>n</sub> ≤ v<sub>n</sub> et (v<sub>n</sub>) converge ⇒ (u<sub>n</sub>) converge.',0,'Contre-exemple : u<sub>n</sub> = −n ≤ v<sub>n</sub> = 0.'],
  ['(u<sub>n</sub>) convergente ⇒ (u<sub>n</sub>) monotone.',0,'Contre-exemple : (−1)<sup>n</sup>/n converge vers 0 sans être monotone.'],
  ['(u<sub>n</sub>) monotone ⇒ (u<sub>n</sub>) convergente.',0,'Contre-exemple : u<sub>n</sub> = n est croissante et tend vers +∞.'],
  ['(u<sub>n</sub>) croissante et majorée ⇒ (u<sub>n</sub>) converge.',1,'C’est le théorème de la limite monotone.'],
  ['(u<sub>n</sub>) croissante et minorée ⇒ (u<sub>n</sub>) converge.',0,'Contre-exemple : u<sub>n</sub> = n est croissante, minorée par 0, mais tend vers +∞.'],
  ['(u<sub>n</sub>) décroissante et majorée ⇒ (u<sub>n</sub>) converge.',0,'Contre-exemple : u<sub>n</sub> = −n.'],
  ['(u<sub>n</sub>) décroissante et minorée ⇒ (u<sub>n</sub>) converge.',1,'C’est le théorème de la limite monotone.']];
const gSuVF=()=>{const[s0,v,why]=pick(VF);return mcq('Vrai ou faux ?',stx(s0),[{h:'Vrai',ok:!!v,tag:'suite-thm'},{h:'Faux',ok:!v,tag:'suite-thm'}],why,'Pour montrer qu’une implication est fausse, un contre-exemple suffit.',true)};
const gSuRec=()=>{const a=R(-5,5),c=pick([-2,2,3]),d=nz(-5,5),u=[a];for(let i=0;i<4;i++)u.push(c*u[i]+d);
  return nq({instr:'Calcule le terme demandé.',prompt:mx(`u<sub>0</sub> = ${num(a)} et u<sub>n+1</sub> = ${num(c)}u<sub>n</sub> ${d<0?'−':'+'} ${Math.abs(d)}`)+mx('u<sub>3</sub> = ?'),labels:['u<sub>3</sub> ='],t:[u[3]],
    explain:`u<sub>1</sub> = ${num(u[1])}, u<sub>2</sub> = ${num(c)} × ${num(u[1])} ${d<0?'−':'+'} ${Math.abs(d)} = ${num(u[2])}, u<sub>3</sub> = ${num(c)} × ${num(u[2])} ${d<0?'−':'+'} ${Math.abs(d)} = ${num(u[3])}.`,
    hint:'Applique la règle une étape à la fois : u<sub>1</sub>, puis u<sub>2</sub>, puis u<sub>3</sub>.',diag:([v])=>near(v,u[2],1e-6)||near(v,u[4],1e-6)?'suite-indice':null})};
const gSuLimR=()=>{const a=nz(-9,9),d=pick([1,2,4,5,10]),b=R(-9,9),c=R(-9,9),e=R(-9,9),f=R(1,9);
  if(Math.random()<.6)return nq({instr:'Calcule la limite quand n → +∞.',prompt:`<span class="m">lim ${fr(nPoly([a,b,c]),nPoly([d,e,f]))}</span>`,labels:['Limite ='],t:[a/d],tol:.001,
    explain:`Même degré en haut et en bas : on garde les termes en n<sup>2</sup>. La limite vaut ${num(a)} ÷ ${d} = ${num(a/d)}.`,hint:'Garde seulement le terme de plus haut degré en haut et en bas.',
    diag:([v])=>near(v,c/f,.0011)||near(v,b/(e||1),.0011)?'limite-dom':null});
  const up=Math.random()<.5,num2=up?nPoly([a,0,b,c]):nPoly([a,b]),c2=up?(a*d>0?1:2):0,O=['0','+∞','−∞',frS(a,d)];
  return mcq('Quelle est la limite quand n → +∞ ?',`<span class="m">lim ${fr(num2,nPoly([d,e,f]))}</span>`,O.map((h,i)=>({h:`<span class="m">${h}</span>`,ok:i===c2,tag:'limite-dom'})),
    up?`Le numérateur (degré 3) l’emporte sur le dénominateur (degré 2) : la limite est ${O[c2]}, avec le signe de ${num(a)} ÷ ${d}.`:'Le dénominateur (degré 2) l’emporte sur le numérateur (degré 1) : la limite est 0.','Compare les degrés du numérateur et du dénominateur.',true)};
const gSuRef=()=>{const v=R(0,2);
  if(v===0){const a=nz(-5,5),b=R(1,5);return nq({instr:'La limite s’écrit e<sup>k</sup>. Donne k.',prompt:mx(`lim (1 ${a<0?'−':'+'} ${fr(Math.abs(a),'n')})<sup>${b===1?'':b}n</sup>`),labels:['k ='],t:[a*b],
    explain:`(1 + ${num(a)}/n)<sup>${b}n</sup> = [(1 + ${num(a)}/n)<sup>n</sup>]<sup>${b}</sup> → (e<sup>${num(a)}</sup>)<sup>${b}</sup> = e<sup>${num(a*b)}</sup>.`,hint:'(1 + a/n)<sup>n</sup> → e<sup>a</sup>, puis regroupe la puissance.',diag:([w])=>near(w,0,1e-6)||near(w,a+b,1e-6)||near(w,a,1e-6)?'limite-fi':null})}
  if(v===1){const a=nz(-5,5);return nq({instr:'Calcule la limite quand n → +∞.',prompt:mx(`lim n · sin(${fr(a,'n')})`),labels:['Limite ='],t:[a],
    explain:`n · sin(${num(a)}/n) = ${num(a)} × [(n/${num(a)}) · sin(${num(a)}/n)] et le crochet tend vers 1 : la limite vaut ${num(a)}.`,hint:'n · sin(1/n) → 1 : fais apparaître la même chose devant et dans le sinus.',diag:([w])=>near(w,1,1e-6)?'limite-fi':null})}
  const a=R(1,6);return nq({instr:'Calcule la limite quand n → +∞.',prompt:mx(`lim n<sup>2</sup>(1 − cos(${fr(a,'n')}))`),labels:['Limite ='],t:[a*a/2],tol:.001,
    explain:`n²(1 − cos(${a}/n)) = ${a}² × [(n/${a})²(1 − cos(${a}/n))] et le crochet tend vers 1/2 : la limite vaut ${a*a}/2 = ${num(a*a/2)}.`,hint:'n²(1 − cos(1/n)) → 1/2.',diag:([w])=>near(w,a/2,.001)||near(w,.5,.001)?'limite-fi':null})};
const gSuSomG=()=>{let a,q,n,qs;if(Math.random()<.6){a=R(1,10);q=pick([2,3]);n=R(2,6);qs=num(q)}else{const k=R(3,6);a=2**k;q=.5;n=R(3,10);qs=fr(1,2)}const t=a*(1-q**(n+1))/(1-q);
  return nq({instr:'Calcule la somme.',prompt:stx(`(u<sub>n</sub>) est géométrique, u<sub>0</sub> = ${a}, raison q = `)+mx(qs)+mx(`S = u<sub>0</sub> + u<sub>1</sub> + … + ${uN(n)}`),labels:['S ='],t:[t],tol:.001,
    explain:`Il y a ${n} + 1 = ${n+1} termes. S = ${a} × (1 − q<sup>${n+1}</sup>) ÷ (1 − q) = ${dec(t,4)}.`,hint:'S = u<sub>0</sub> × (1 − q<sup>n+1</sup>) ÷ (1 − q), avec n + 1 termes.',
    diag:([v])=>near(v,a*(1-q**n)/(1-q),.0011)||near(v,a*q**n,.0011)?'suite-somme':null})};
const gSuSeuil=()=>{const P0=pick([500,1000,1013,2000]),t=pick([1,1.5,2,5,10]),q=1-t/100;
  if(Math.random()<.5){const n=R(1,40),v=P0*q**n;return nq({instr:'Calcule la valeur après n étapes.',prompt:stx(`Une grandeur vaut ${P0} au départ et baisse de ${num(t)} % à chaque étape. Valeur après ${n} étapes ?`),labels:['Valeur ='],t:[v],dp:2,
    explain:`Baisser de ${num(t)} %, c’est multiplier par ${num(q)}. Après ${n} étapes : ${P0} × ${num(q)}<sup>${n}</sup> ≈ ${dec(v)}.`,hint:'C’est une suite géométrique de raison 1 − t/100.',diag:([w])=>near(w,P0*(1-t*n/100),.05)?'pourcent':null})}
  const S0=Math.round(P0*(R(20,90)/100));let n=0,v=P0;while(v>=S0){v*=q;n++}
  return nq({instr:'Trouve le premier rang.',prompt:stx(`Une grandeur vaut ${P0} au départ et baisse de ${num(t)} % à chaque étape. Après combien d’étapes devient-elle strictement inférieure à ${S0} pour la première fois ?`),labels:['Étapes ='],t:[n],
    explain:`On cherche le premier n tel que ${P0} × ${num(q)}<sup>n</sup> &lt; ${S0}, soit n &gt; ln(${S0}/${P0}) ÷ ln(${num(q)}) ≈ ${dec(Math.log(S0/P0)/Math.log(q),2)} (on inverse le sens car ln(${num(q)}) &lt; 0). Le premier entier est ${n}.`,
    hint:'Passe au logarithme. Attention : ln q &lt; 0, le sens de l’inégalité s’inverse.',diag:([w])=>near(w,n-1,1e-6)?'suite-indice':null})};
const gSuFix=()=>{const v=R(0,2);
  if(v===0){const m=R(2,5),k=nz(-5,5),b=(m-1)*k,u0=R(-10,10);return nq({instr:'Calcule la limite (on admet que la suite converge).',prompt:mx(`u<sub>0</sub> = ${u0} ; u<sub>n+1</sub> = ${fr(1,m)}u<sub>n</sub> ${b<0?'−':'+'} ${Math.abs(b)}`),labels:['ℓ ='],t:[m*k],
    explain:`La limite vérifie ℓ = ℓ/${m} ${b<0?'−':'+'} ${Math.abs(b)}, donc ℓ(1 − 1/${m}) = ${num(b)} et ℓ = ${num(m*k)}. Elle ne dépend pas de u<sub>0</sub>.`,hint:'Remplace u<sub>n</sub> et u<sub>n+1</sub> par ℓ, puis résous.',diag:([w])=>near(w,b,1e-6)||near(w,u0,1e-6)?'point-fixe':null})}
  if(v===1){const a=pick([2,3,5]);return nq({instr:'Calcule la limite (on admet que la suite converge).',prompt:mx(`u<sub>0</sub> = 1 ; u<sub>n+1</sub> = ${fr(`${a+1} + u<sub>n</sub>`,a)}`),labels:['ℓ ='],t:[(a+1)/(a-1)],tol:.001,
    explain:`ℓ = (${a+1} + ℓ)/${a} ⇒ ${a}ℓ − ℓ = ${a+1} ⇒ ℓ = ${a+1}/${a-1}.`,hint:'Résous ℓ = f(ℓ).'})}
  let a,b;do{a=R(-9,9);b=R(-9,9)}while((a+2*b)%3!==0);
  return nq({instr:'Calcule la limite.',prompt:mx(`u<sub>0</sub> = ${a} ; u<sub>1</sub> = ${b} ; u<sub>n+2</sub> = ${fr('u<sub>n</sub> + u<sub>n+1</sub>',2)}`),labels:['ℓ ='],t:[(a+2*b)/3],
    explain:`Les écarts v<sub>n</sub> = u<sub>n</sub> − u<sub>n−1</sub> forment une suite géométrique de raison −1/2. En les additionnant, u<sub>n</sub> → u<sub>0</sub> + 2(u<sub>1</sub> − u<sub>0</sub>)/3 = (${a} + 2 × ${b})/3 = ${num((a+2*b)/3)}.`,
    hint:'La limite vaut (u<sub>0</sub> + 2u<sub>1</sub>) ÷ 3 : la moyenne penche vers le terme le plus récent.',diag:([w])=>near(w,(a+b)/2,1e-6)?'point-fixe':null})};

/* --- Séries numériques --- */
const gSeSP=()=>{const v=R(0,2);
  if(v===0){const a=nz(-9,9),b=R(-9,9);return nq({instr:'Calcule la somme partielle.',prompt:mx(`u<sub>n</sub> = ${nPoly([a,b])}`)+mx('S<sub>3</sub> = u<sub>1</sub> + u<sub>2</sub> + u<sub>3</sub>'),labels:['S<sub>3</sub> ='],t:[6*a+3*b],
    explain:`u<sub>1</sub> = ${a+b}, u<sub>2</sub> = ${2*a+b}, u<sub>3</sub> = ${3*a+b}. S<sub>3</sub> = ${6*a+3*b}.`,hint:'Calcule chaque terme, puis additionne.',diag:([w])=>near(w,3*a+b,1e-6)?'serie-somme':null})}
  if(v===1){const N=R(1,5),t=2-(N+2)/2**N;return nq({instr:'Calcule la somme partielle.',prompt:mx(`u<sub>n</sub> = ${fr('n','2<sup>n</sup>')}`)+mx(`S<sub>${N}</sub> = u<sub>1</sub> + … + u<sub>${N}</sub>`),labels:[`S<sub>${N}</sub> =`],t:[t],dp:4,
    explain:`On additionne : ${Array.from({length:N},(_,i)=>`${i+1}/${2**(i+1)}`).join(' + ')} = ${dec(t,4)}.`,hint:'Calcule u<sub>1</sub>, u<sub>2</sub>… puis additionne au fur et à mesure.',diag:([w])=>near(w,N/2**N,.0002)?'serie-somme':null})}
  const N=pick([1,3,4,9,19,24,49,99]);return nq({instr:'Calcule la somme partielle.',prompt:mx(`u<sub>n</sub> = ${fr(1,'n(n + 1)')}`)+mx(`S<sub>${N}</sub> = u<sub>1</sub> + … + u<sub>${N}</sub>`),labels:[`S<sub>${N}</sub> =`],t:[N/(N+1)],dp:4,
    explain:`1/(n(n+1)) = 1/n − 1/(n+1) : tout s’annule sauf le premier et le dernier morceau. S<sub>${N}</sub> = 1 − 1/${N+1} = ${dec(N/(N+1),4)}.`,hint:'Décompose 1/(n(n + 1)) en 1/n − 1/(n + 1).',diag:([w])=>near(w,1/(N*(N+1)),.0002)?'serie-somme':null})};
const QS=[[-3,1],[-2,1],[-1,1],[-1,2],[-1,3],[9,10],[1,2],[2,3],[1,1],[11,10],[3,2],[2,1]];
const gSeGN=()=>{const[p,q]=pick(QS),cv=Math.abs(p/q)<1;
  return mcq('Cette série converge-t-elle ?',`<span class="m">∑<sub>n≥0</sub> (${frS(p,q)})<sup>n</sup></span>`,[{h:'Elle converge',ok:cv,tag:'serie-cv'},{h:'Elle diverge',ok:!cv,tag:'serie-cv'}],
    `Une série géométrique converge exactement quand |q| &lt; 1. Ici |q| = ${num(Math.abs(p/q).toFixed(3)*1)} ${cv?'&lt;':'≥'} 1 : elle ${cv?'converge':'diverge'}.`,'Compare |q| à 1 (valeur absolue !).',true)};
const RIE=[['1/n<sup>2</sup>',2],['1/n<sup>3</sup>',3],['1/n',1],['1/√n',.5],['1/∛(n<sup>2</sup>)',2/3],['1/(n√n)',1.5],['5/n<sup>2</sup>',2],['3/n',1],['1/n<sup>1/3</sup>',1/3]];
const gSeRie=()=>{const[e,p]=pick(RIE),cv=p>1;
  return mcq('Cette série converge-t-elle ?',`<span class="m">∑<sub>n≥1</sub> ${e}</span>`,[{h:'Elle converge',ok:cv,tag:'serie-riemann'},{h:'Elle diverge',ok:!cv,tag:'serie-riemann'}],
    `On écrit le terme sous la forme c/n<sup>p</sup> avec p = ${num(+p.toFixed(3))}. Riemann : convergence ⟺ p &gt; 1. Elle ${cv?'converge':'diverge'}.`,'Réécris le terme avec une puissance de n : √n = n<sup>1/2</sup>.',true)};
const QF=[[1,2],[1,3],[1,4],[1,5],[-1,2],[-1,3],[2,3],[3,4]];
const gSeGS=()=>{const A=R(1,12),[p,q]=pick(QF),r=p/q,t=A/(1-r);
  return nq({instr:'Calcule la somme de la série.',prompt:`<span class="m">∑<sub>n≥0</sub> ${A} × (${frS(p,q)})<sup>n</sup></span>`,labels:['Somme ='],t:[t],tol:.001,
    explain:`Premier terme ${A}, raison ${p}/${q}, |q| &lt; 1 : somme = ${A} ÷ (1 − (${p}/${q})) = ${dec(t,4)}.`,hint:'Somme = premier terme ÷ (1 − raison).',
    diag:([v])=>near(v,1/(1-r),.0011)||near(v,A/(1+r),.0011)||near(v,A*r/(1-r),.0011)?'serie-somme':null})};
const gSeDG=()=>{const a=R(1,9),c=R(1,9),b=R(0,9),d=R(1,9),trap=Math.random()<.4,O=['La série diverge grossièrement','La série converge','Ce test ne permet pas de conclure'];
  const pr=trap?`${fr(a,`${c}n + ${d}`)}`:`${fr(`${a}n + ${b}`,`${c}n + ${d}`)}`;
  return mcq('Que peut-on dire de ∑ u<sub>n</sub> ?',mx(`u<sub>n</sub> = ${pr}`),O.map((h,i)=>({h,ok:i===(trap?2:0),tag:'serie-cv'})),
    trap?`u<sub>n</sub> → 0 : le test de divergence grossière ne conclut pas. (En fait u<sub>n</sub> se comporte comme ${a}/(${c}n), et la série diverge comme la série harmonique.)`:`u<sub>n</sub> → ${a}/${c} ≠ 0 : les termes ne deviennent pas petits, la série diverge grossièrement.`,
    'Calcule d’abord la limite de u<sub>n</sub>.',true)};
const gSeDA=()=>{const k=R(1,4),c=R(2,5),v=R(0,2),pr=[`${fr(`n<sup>${k}</sup>`,`${c}<sup>n</sup>`)}`,`${fr(`${c}<sup>n</sup>`,`n<sup>${k}</sup>`)}`,`${fr(`${c}<sup>n</sup>`,'n!')}`][v],t=[1/c,c,0][v];
  return nq({instr:'Règle de d’Alembert : calcule ℓ = lim u<sub>n+1</sub>/u<sub>n</sub>.',prompt:mx(`u<sub>n</sub> = ${pr}`),labels:['ℓ ='],t:[t],tol:.001,
    explain:v===0?`u<sub>n+1</sub>/u<sub>n</sub> = ((n+1)/n)<sup>${k}</sup> × 1/${c} → 1/${c} &lt; 1 : la série converge.`:v===1?`u<sub>n+1</sub>/u<sub>n</sub> = ${c} × (n/(n+1))<sup>${k}</sup> → ${c} &gt; 1 : la série diverge.`:`u<sub>n+1</sub>/u<sub>n</sub> = ${c}/(n+1) → 0 &lt; 1 : la série converge.`,
    hint:'Écris u<sub>n+1</sub>/u<sub>n</sub>, simplifie les puissances, puis passe à la limite.',diag:([w])=>v<2&&near(w,v===0?c:1/c,.0011)||near(w,1,.0011)?'dalembert':null})};
const gSeCa=()=>{if(Math.random()<.5){let a,c;do{a=R(1,9);c=R(1,9)}while(a===c);const b=R(0,9),d=R(0,9);
    return nq({instr:'Règle de Cauchy : calcule ℓ = lim ⁿ√u<sub>n</sub>.',prompt:mx(`u<sub>n</sub> = (${fr(`${a}n + ${b}`,`${c}n + ${d}`)})<sup>n</sup>`),labels:['ℓ ='],t:[a/c],tol:.001,
      explain:`ⁿ√u<sub>n</sub> = (${a}n + ${b})/(${c}n + ${d}) → ${a}/${c} ${a<c?'&lt;':'&gt;'} 1 : la série ${a<c?'converge':'diverge'}.`,hint:'La racine n-ième « annule » la puissance n.',diag:([w])=>near(w,(b||1)/(d||1),.0011)?'dalembert':null})}
  let p,q;do{p=R(1,9);q=R(1,9)}while(p===q);
  return nq({instr:'Règle de Cauchy : calcule ℓ = lim ⁿ√u<sub>n</sub>.',prompt:mx(`u<sub>n</sub> = n × (${fr(p,q)})<sup>n</sup>`),labels:['ℓ ='],t:[p/q],tol:.001,
    explain:`ⁿ√u<sub>n</sub> = ⁿ√n × ${p}/${q} et ⁿ√n → 1 : ℓ = ${p}/${q} ${p<q?'&lt;':'&gt;'} 1, la série ${p<q?'converge':'diverge'}.`,hint:'ⁿ√n → 1.',diag:([w])=>near(w,1,.0011)?'dalembert':null})};
const gSeTel=()=>{const c=R(1,6),k=R(1,4),H=[0,1,1.5,11/6,25/12][k],t=c/k*H;
  return nq({instr:'Calcule la somme de la série.',prompt:`<span class="m">∑<sub>n≥1</sub> ${fr(c,`n(n + ${k})`)}</span>`,labels:['Somme ='],t:[t],tol:.001,
    explain:`1/(n(n+${k})) = (1/${k})(1/n − 1/(n+${k})). Dans la somme, tout s’annule sauf ${['','1','1 + 1/2','1 + 1/2 + 1/3','1 + 1/2 + 1/3 + 1/4'][k]}. Somme = (${c}/${k}) × ${dec(H,4)} = ${dec(t,4)}.`,
    hint:'Décompose en différence : les termes s’annulent deux à deux (somme télescopique).',diag:([v])=>k>1&&near(v,c,.0011)||near(v,c/k,.0011)?'serie-somme':null})};
const gSeRay=()=>{const v=R(0,4);let pr,t,ell;
  if(v===0){const c=R(2,9);pr=fr(1,`${c}<sup>n</sup>`);t=c;ell=1/c}
  else if(v===1){const c=pick([2,3]);pr=fr(1,`${c}<sup>3n</sup>`);t=c**3;ell=1/c**3}
  else if(v===2){const c=R(2,5);pr=`${c}<sup>n</sup> + 1`;t=1/c;ell=c}
  else if(v===3){const k=R(1,4);pr=Math.random()<.5?`n<sup>${k}</sup>`:fr(1,`n<sup>${k}</sup>`);t=1;ell=1}
  else{const a=R(2,5),d=R(1,5);pr=`(${fr(`${a}n + 1`,`n + ${d}`)})<sup>n</sup>`;t=1/a;ell=a}
  return nq({instr:'Donne le rayon de convergence R de ∑ a<sub>n</sub>x<sup>n</sup>.',prompt:mx(`a<sub>n</sub> = ${pr}`),labels:['R ='],t:[t],tol:.001,
    explain:`ℓ = lim ⁿ√|a<sub>n</sub>| (ou lim |a<sub>n+1</sub>/a<sub>n</sub>|) = ${dec(ell,4)}. R = 1/ℓ = ${dec(t,4)}.`,hint:'R = 1 ÷ lim ⁿ√|a<sub>n</sub>|.',diag:([w])=>t!==1&&near(w,ell,.0011)?'rayon':null})};
const gSeExp=()=>{let a,b,c;do{a=R(-5,5);b=R(-5,5);c=R(-5,5)}while(!a&&!b&&!c);const x=R(-3,3),K=a*x*x+(a+b)*x+c;
  return nq({instr:'La somme s’écrit K × e<sup>x</sup>. Donne K.',prompt:mx(`x = ${x} ; ∑<sub>n≥0</sub> (${nPoly([a,b,c])}) ${fr('x<sup>n</sup>','n!')}`),labels:['K ='],t:[K],
    explain:`∑ x<sup>n</sup>/n! = e<sup>x</sup>, ∑ n x<sup>n</sup>/n! = x e<sup>x</sup>, ∑ n² x<sup>n</sup>/n! = (x² + x)e<sup>x</sup>. Donc K = ${a}(${x}² + ${x}) + ${b} × ${x} + ${c} = ${K}.`,
    hint:'Écris n² = n(n − 1) + n, puis reconnais la série de l’exponentielle.',diag:([w])=>near(w,a*x*x+b*x+c,1e-6)||near(w,a+b+c,1e-6)?'serie-somme':null})};

