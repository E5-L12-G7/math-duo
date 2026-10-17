/* --- Parcours Analyse : nombres complexes, intégrales, équations différentielles --- */
Object.assign(ANA_ERR,{
  'cx-conj':{label:'Conjugué',tip:'Le conjugué de a + bi est a − bi : on garde la partie réelle et on change seulement le signe de la partie imaginaire.'},
  'cx-module':{label:'Module',tip:'|a + bi| = √(a² + b²) : c’est une distance (Pythagore), pas une somme.'},
  'cx-arg':{label:'Argument',tip:'cos θ = a/r et sin θ = b/r : place le point dans le bon quart du plan avant de choisir l’angle.'},
  'cx-quot':{label:'Quotient de complexes',tip:'Multiplie en haut et en bas par le conjugué du dénominateur : le bas devient c² + d², un réel.'},
  'cx-racine':{label:'Racines d’un complexe',tip:'Pour ωⁿ = e<sup>iα</sup>, les solutions sont e<sup>i(α + 2kπ)/n</sup> : on divise l’angle, et on ajoute des tours complets de 2π.'},
  'prim':{label:'Primitive ou dérivée',tip:'Intégrer, c’est faire le chemin inverse de la dérivée : xⁿ → xⁿ⁺¹/(n + 1). Vérifie en dérivant ta réponse.'},
  'int-bornes':{label:'Bornes de l’intégrale',tip:'∫ₐᵇ f = F(b) − F(a) : calcule les deux valeurs et soustrais dans cet ordre.'},
  'ipp':{label:'Intégration par parties',tip:'∫ u dv = [uv] − ∫ v du : n’oublie ni le crochet évalué aux deux bornes, ni l’intégrale qui reste.'},
  'ed-ci':{label:'Condition initiale',tip:'Écris la solution générale avec sa constante, puis remplace x par 0 pour trouver la constante.'},
  'ed-carac':{label:'Équation caractéristique',tip:'Pour y″ + py′ + qy = 0, on résout λ² + pλ + q = 0 : attention aux signes de p et q.'},
});
const PYTH=[[3,4],[4,3],[6,8],[8,6],[5,12],[12,5],[8,15],[15,8],[9,12],[12,9]];
const angP=k=>{k=((k%24)+24)%24;if(k>12)k-=24;if(!k)return'0';const g=gcd(k,12),n=k/g,d=12/g;return(n<0?'−':'')+(Math.abs(n)===1?'':Math.abs(n))+'π'+(d===1?'':'/'+d)};

/* Nombres complexes */
const gCxPow=()=>{const n=R(2,40),r=n%4,V=['1','<i>i</i>','−1','−<i>i</i>'];
  return mcq('Calcule la puissance.',mx(`<i>i</i><sup>${n}</sup>`),V.map((h,i)=>({h:mx(h),ok:i===r,tag:'i-cycle'})),
    `i¹ = i, i² = −1, i³ = −i, i⁴ = 1, puis ça recommence. ${n} = 4 × ${Math.floor(n/4)} + ${r}, donc i<sup>${n}</sup> = i<sup>${r}</sup> = ${V[r]}.`,'Regarde le reste de la division de n par 4.',true)};
const gCxConj=()=>{const a=nz(-9,9),b=nz(-9,9);
  return mcq('Quel est le conjugué de z ?',mx(`z = ${cx(a,b)}`),[{h:mx(cx(a,-b)),ok:true},{h:mx(cx(-a,b)),tag:'cx-conj'},{h:mx(cx(-a,-b)),tag:'cx-conj'},{h:mx(cx(b,a)),tag:'cx-conj'}].filter((o,i,arr)=>arr.findIndex(x=>x.h===o.h)===i),
    `Le conjugué garde la partie réelle ${num(a)} et change le signe de la partie imaginaire : z̄ = ${cx(a,-b)}. C’est le symétrique de z par rapport à l’axe horizontal.`,'On change seulement le signe devant i.')};
const gCxMod=()=>{const[p,q]=pick(PYTH),a=p*pick([-1,1]),b=q*pick([-1,1]),t=Math.hypot(a,b);
  return nq({instr:'Calcule le module.',prompt:mx(`z = ${cx(a,b)}`),labels:['|z| ='],t:[t],
    explain:`|z| = √(${num(a)}² + ${num(b)}²) = √${a*a+b*b} = ${t}. C’est la distance de l’origine au point (${num(a)} ; ${num(b)}).`,hint:'|a + bi| = √(a² + b²).',
    diag:([v])=>near(v,a*a+b*b,1e-6)||near(v,Math.abs(a)+Math.abs(b),1e-6)?'cx-module':null})};
const gCxMul=()=>{const a=R(-6,6),b=nz(-6,6),c=R(-6,6),d=nz(-6,6),re=Math.random()<.5,t=re?a*c-b*d:a*d+b*c;
  return nq({instr:`Donne la partie ${re?'réelle':'imaginaire'} du produit.`,prompt:mx(`z = (${cx(a,b)})(${cx(c,d)})`),labels:[re?'Re(z) =':'Im(z) ='],t:[t],
    explain:`On développe, puis i² = −1 : partie réelle ${num(a)} × ${num(c)} − ${num(b)} × ${num(d)} = ${a*c-b*d} ; partie imaginaire ${num(a)} × ${num(d)} + ${num(b)} × ${num(c)} = ${a*d+b*c}.`,
    hint:'Développe comme d’habitude et remplace i² par −1.',diag:([v])=>re&&near(v,a*c+b*d,1e-6)?'i2':!re&&near(v,a*d-b*c,1e-6)?'signe':null})};
const gCxDiv=()=>{const p=R(-5,5),q=R(-5,5),c=R(-4,4),d=nz(-4,4),A=p*c-q*d,B=p*d+q*c,re=Math.random()<.5;
  return nq({instr:`Donne la partie ${re?'réelle':'imaginaire'} du quotient.`,prompt:`<span class="m">z = ${fr(cx(A,B),cx(c,d))}</span>`,labels:[re?'Re(z) =':'Im(z) ='],t:[re?p:q],
    explain:`On multiplie en haut et en bas par ${cx(c,-d)}. Le bas devient ${c*c+d*d}, le haut ${cx(A*c+B*d,B*c-A*d)}. On divise : z = ${cx(p,q)}.`,hint:'Multiplie par le conjugué du dénominateur.',
    diag:([v])=>re&&c&&near(v,A/c,1e-6)||!re&&near(v,B/d,1e-6)||!re&&near(v,-q,1e-6)&&q?'cx-quot':null})};
const EXPF=[['1 + <i>i</i>',['√2',1,2],3],['1 + <i>i</i>√3',['2',2,4],4],['√3 + <i>i</i>',['2',2,4],2],['<i>i</i>',['1',1,1],6],['−1',['1',1,1],12],['−1 + <i>i</i>',['√2',1,2],9],['−√3 + <i>i</i>',['2',2,4],10],['1 − <i>i</i>',['√2',1,2],-3],['−1 − <i>i</i>√3',['2',2,4],-8],['−<i>i</i>',['1',1,1],-6]];
const gCxExp=()=>{const[u,[rs,rn,r2],k12]=pick(EXPF),k=R(1,3),rStr=rs==='√2'?(k===1?'√2':k+'√2'):String(k*rn),r2s=String(k*k*r2);
  const E=(r,t)=>mx(`${r==='1'?'':r} e<sup><i>i</i>${t}</sup>`);
  const opts=[{h:E(rStr,angP(k12)),ok:true},{h:E(rStr,angP(-k12)),tag:'cx-arg'},{h:E(rStr,angP(6-k12)),tag:'cx-arg'},{h:E(r2s,angP(k12)),tag:'cx-module'}];
  const seen=new Set(),O=opts.filter(o=>{if(seen.has(o.h))return false;seen.add(o.h);return true});
  return mcq('Écris z sous forme exponentielle.',mx(`z = ${k===1?u:`${k}(${u})`}`),O,`Module : r = ${rStr}. L’angle θ vérifie cos θ = a/r et sin θ = b/r, ce qui donne θ = ${angP(k12)}. Donc z = ${rStr==='1'?'':rStr} e<sup>i${angP(k12)}</sup>.`,
    'Calcule d’abord le module, puis cherche l’angle avec cos θ et sin θ.')};
const gCxEq2=()=>{const p=R(-5,5),q=R(1,6),B=-2*p,C=p*p+q*q,re=Math.random()<.5;
  return nq({instr:`Résous dans ℂ. Donne la partie ${re?'réelle':'imaginaire'} de la solution de partie imaginaire positive.`,prompt:mx(`z<sup>2</sup> ${B<0?'−':'+'} ${Math.abs(B)}z + ${C} = 0`).replace('+ 0z ',''),labels:[re?'Partie réelle =':'Partie imaginaire ='],t:[re?p:q],
    explain:`Δ = ${B}² − 4 × ${C} = ${B*B-4*C} &lt; 0, donc Δ = (${2*q}i)². Les solutions sont (${num(-B)} ± ${2*q}i)/2, soit ${cx(p,q)} et ${cx(p,-q)}.`,hint:'Si Δ &lt; 0, √Δ devient i√(−Δ) et les solutions sont conjuguées.',
    diag:([v])=>re&&near(v,-p,1e-6)&&p?'signe':!re&&(near(v,2*q,1e-6)||near(v,q*q,1e-6))?'calc':null})};
const gCxSqrt=()=>{let p,q;do{p=R(1,6);q=nz(-6,6)}while(Math.abs(q)===p);const a=p*p-q*q,b=2*p*q;
  const pm=(x,y)=>mx(`±(${cx(x,y)})`);
  return mcq('Quelles sont les racines carrées de w ?',mx(`w = ${cx(a,b)}`),[{h:pm(p,q),ok:true},{h:pm(p,-q),tag:'cx-racine'},{h:pm(q,p),tag:'cx-racine'},{h:mx(`±(√${Math.abs(a)} + <i>i</i>√${Math.abs(b)})`),tag:'cx-racine'}],
    `On cherche x + iy avec x² − y² = ${a}, 2xy = ${b} et x² + y² = |w| = ${p*p+q*q}. On trouve x² = ${p*p}, y² = ${q*q}, et x, y ${b>0?'de même signe':'de signes opposés'} : ±(${cx(p,q)}). Vérification : (${cx(p,q)})² = ${cx(a,b)}.`,
    'Élève chaque option au carré : celle qui redonne w est la bonne.')};
const gCxRoot=()=>{let n,al,k,phi;do{n=pick([2,3,4,6]);al=pick([0,6,12,4,-6]);k=R(0,n-1);phi=(al+24*k)/n}while(!Number.isInteger(phi));
  const ok=f=>((n*f-al)%24+24)%24===0,E=f=>mx(`e<sup><i>i</i>${angP(f)}</sup>`);
  const cand=[[n*al,'cx-racine'],[(al+12)/n,'cx-racine'],[-al/n,'cx-racine'],[phi+12/n*(Number.isInteger(12/n)?1:0),'cx-racine'],[al+6,'cx-racine']].filter(([f])=>Number.isInteger(f)&&!ok(f));
  const seen=new Set([angP(phi)]),O=[{h:E(phi),ok:true}];for(const[f,t]of cand){const s0=angP(f);if(!seen.has(s0)&&O.length<4){seen.add(s0);O.push({h:E(f),tag:t})}}
  return mcq('Lequel est une solution ?',mx(`ω<sup>${n}</sup> = e<sup><i>i</i>${angP(al)}</sup>`),O,
    `Si ω = e<sup>iφ</sup>, alors ω<sup>${n}</sup> = e<sup>i${n}φ</sup>. On veut ${n}φ = ${angP(al)} + 2kπ, donc φ = (${angP(al)} + 2kπ)/${n}. Avec k = ${k} : φ = ${angP(phi)}. Il y a ${n} solutions, régulièrement espacées sur le cercle.`,
    'Multiplie l’angle proposé par n : il doit retomber sur α à un multiple de 2π près.')};
const gCxLieu=()=>{const t=R(1,4),a=3*t,rad=Math.random()<.5;
  return nq({instr:`L’ensemble de ces points est un cercle. Donne ${rad?'son rayon':'l’abscisse de son centre'}.`,prompt:mx(`|z − ${a}| = 2|z + ${a}|`),labels:[rad?'Rayon =':'Abscisse ='],t:[rad?4*t:-5*t],
    explain:`Avec z = x + iy et en élevant au carré : (x − ${a})² + y² = 4[(x + ${a})² + y²]. On regroupe : (x + ${5*t})² + y² = ${16*t*t}. Centre (${-5*t} ; 0), rayon ${4*t}.`,
    hint:'Pose z = x + iy, élève au carré, puis mets sous la forme (x − x₀)² + y² = r².',diag:([v])=>rad&&near(v,16*t*t,1e-6)||!rad&&near(v,5*t,1e-6)?'calc':null})};

/* Intégrales */
const mono=(c,n)=>c.d===1&&Math.abs(c.n)===1?(c.n<0?'−':'')+(n?`x${n>1?`<sup>${n}</sup>`:''}`:'1'):`${frH(c)}${n?`x${n>1?`<sup>${n}</sup>`:''}`:''}`;
const gIPow=()=>{const a=R(1,9),n=R(1,6),o=[{h:mx(mono(new Fr(a,n+1),n+1)),ok:true},{h:mx(mono(new Fr(a*n,1),n-1)),tag:'prim'},{h:mx(mono(new Fr(a,1),n+1)),tag:'prim'},{h:mx(mono(new Fr(a,n),n+1)),tag:'prim'}];
  const seen=new Set,O=o.filter(x=>!seen.has(x.h)&&seen.add(x.h));
  return mcq('Quelle est une primitive de f ?',mx(`f(x) = ${mono(new Fr(a,1),n)}`),O,`On augmente la puissance de 1 et on divise par la nouvelle puissance : x<sup>${n}</sup> → x<sup>${n+1}</sup>/${n+1}. Donc ${mono(new Fr(a,1),n)} → ${mono(new Fr(a,n+1),n+1)}. En dérivant, on retrouve bien f.`,'Vérifie en dérivant chaque option.')};
const gIUs=()=>{const k=R(2,5),v=R(0,3);
  const T=[[`e<sup>${k}x</sup>`,fr(`e<sup>${k}x</sup>`,k),[`${k}e<sup>${k}x</sup>`,`e<sup>${k}x</sup>`,`${k}xe<sup>${k}x</sup>`]],[`cos(${k}x)`,fr(`sin(${k}x)`,k),[`−${k}sin(${k}x)`,`sin(${k}x)`,`−${fr(`sin(${k}x)`,k)}`]],
    [`sin(${k}x)`,`−${fr(`cos(${k}x)`,k)}`,[`${k}cos(${k}x)`,`−cos(${k}x)`,fr(`cos(${k}x)`,k)]],[fr(1,`x + ${k}`),`ln(x + ${k})`,[`−${fr(1,`(x + ${k})<sup>2</sup>`)}`,`${k}ln(x + ${k})`,`ln(${k})`]]][v];
  return mcq('Quelle est une primitive de f ?',mx(`f(x) = ${T[0]}`),[{h:mx(T[1]),ok:true},...T[2].map(h=>({h:mx(h),tag:'prim'}))],`On vérifie en dérivant : (${T[1]})′ = ${T[0]}. Le facteur 1/${k} compense le ${k} qui sort en dérivant la composée.`,'Dérive chaque option : celle qui redonne f est la bonne.')};
const gIAff=()=>{const m=pick([2,4,6]),p=R(0,9),b=R(1,6),t=m*b*b/2+p*b;
  return nq({instr:'Calcule l’intégrale.',prompt:mx(`∫<sub>0</sub><sup>${b}</sup> (${m}x + ${p}) dx`),labels:['I ='],t:[t],
    explain:`Une primitive de ${m}x + ${p} est ${m/2===1?'':m/2}x² + ${p}x. F(${b}) − F(0) = ${m/2} × ${b*b} + ${p} × ${b} = ${t}. C’est l’aire du trapèze sous la droite.`,hint:'Trouve une primitive F, puis calcule F(b) − F(0).',
    diag:([v])=>near(v,m*b+p,1e-6)?'prim':near(v,m*b*b+p*b,1e-6)?'prim':null})};
const gIPoly=()=>{let c,d,e;do{c=R(-2,2);d=R(-3,3);e=R(-5,5)}while(!c&&!d&&!e);const a=R(0,3),b=R(a+1,4),F=x=>c*x**3+d*x*x+e*x,t=F(b)-F(a);
  return nq({instr:'Calcule l’intégrale.',prompt:`<span class="m">∫<sub>${a}</sub><sup>${b}</sup> (</span>`+M(poly([3*c,2*d,e]))+'<span class="m">) d<i>x</i></span>',labels:['I ='],t:[t],
    explain:`Une primitive est F(x) = ${M(poly([c,d,e,0]))}. F(${b}) = ${F(b)} et F(${a}) = ${F(a)}. L’intégrale vaut F(${b}) − F(${a}) = ${t}.`,hint:'Divise chaque coefficient par la nouvelle puissance.',
    diag:([v])=>near(v,-t,1e-6)&&t?'int-bornes':near(v,F(b),1e-6)&&F(a)?'int-bornes':null})};
const gIAire=()=>{const k=R(1,6),t=k**3/6;
  return nq({instr:'Calcule l’aire du domaine.',prompt:stx(`Domaine compris entre la droite y = ${k===1?'':k}x et la parabole y = x², pour 0 ≤ x ≤ ${k}.`),labels:['Aire ='],t:[t],tol:.01,
    explain:`Les courbes se coupent en x = 0 et x = ${k} ; entre les deux, la droite est au-dessus. A = ∫₀^${k} (${k}x − x²) dx = ${k}³/2 − ${k}³/3 = ${k**3}/6 ≈ ${dec(t)}.`,hint:'Aire = ∫ (courbe du haut − courbe du bas).',
    diag:([v])=>near(v,k**3/2,.01)||near(v,k**3/3,.01)?'int-bornes':near(v,-t,.01)?'signe':null})};
const gIExpLn=()=>{if(Math.random()<.5){const a=R(2,20);return nq({instr:'Calcule l’intégrale.',prompt:mx(`∫<sub>0</sub><sup>ln ${a}</sup> e<sup>x</sup> dx`),labels:['I ='],t:[a-1],
    explain:`Une primitive de e<sup>x</sup> est e<sup>x</sup> : e<sup>ln ${a}</sup> − e<sup>0</sup> = ${a} − 1 = ${a-1}.`,hint:'e<sup>ln a</sup> = a et e⁰ = 1.',diag:([v])=>near(v,a,1e-6)?'int-bornes':null})}
  const n=R(1,6);return nq({instr:'Calcule l’intégrale.',prompt:mx(`∫<sub>1</sub><sup>e<sup>${n}</sup></sup> ${fr(1,'x')} dx`),labels:['I ='],t:[n],
    explain:`Une primitive de 1/x est ln x : ln(e<sup>${n}</sup>) − ln 1 = ${n} − 0 = ${n}.`,hint:'ln(eⁿ) = n et ln 1 = 0.',diag:([v])=>near(v,n-1,1e-6)?'int-bornes':null})};
const gIIpp=()=>{const a=R(1,4),E=s=>mx(s);
  const o=[{h:E(`${a===2?'':a-1}e<sup>${a}</sup> + 1`.replace(/^1e/,'e')),ok:true},{h:E(a===1?'e':`${a-1===1?'':a-1}e<sup>${a}</sup>`),tag:'ipp'},{h:E(a===1?'e − 1':`${a}e<sup>${a}</sup>`),tag:'ipp'},{h:E(`${a+1}e<sup>${a}</sup> − 1`),tag:'ipp'}];
  if(a===1)o[0].h=E('1');
  return mcq('Calcule l’intégrale (par parties).',mx(`I = ∫<sub>0</sub><sup>${a}</sup> x e<sup>x</sup> dx`),o,
    `On pose u = x (du = dx) et dv = e<sup>x</sup>dx (v = e<sup>x</sup>). I = [x e<sup>x</sup>]₀^${a} − ∫₀^${a} e<sup>x</sup> dx = ${a}e<sup>${a}</sup> − (e<sup>${a}</sup> − 1) = ${a===1?'1':`${a-1}e<sup>${a}</sup> + 1`}.`,'∫ u dv = [uv] − ∫ v du, avec u = x.')};
const gIChg=()=>{const a=R(1,3),n=R(1,2),T=a*a+1,t=(T**(n+1)-1)/(n+1);
  return nq({instr:'Calcule l’intégrale (pose t = x² + 1).',prompt:mx(`∫<sub>0</sub><sup>${a}</sup> 2x (x<sup>2</sup> + 1)${n>1?`<sup>${n}</sup>`:''} dx`),labels:['I ='],t:[t],tol:.01,
    explain:`t = x² + 1 donne dt = 2x dx ; x = 0 → t = 1 et x = ${a} → t = ${T}. I = ∫₁^${T} t<sup>${n}</sup> dt = (${T}<sup>${n+1}</sup> − 1)/${n+1} = ${dec(t)}.`,hint:'Change aussi les bornes : elles deviennent des valeurs de t.',
    diag:([v])=>near(v,T**(n+1)/(n+1),.01)||near(v,((a+1)**(n+1)-1)/(n+1),.01)?'int-bornes':near(v,T**(n+1)-1,.01)?'prim':null})};
const gIDec=()=>{let A,B,r,s;do{A=nz(-5,5);B=nz(-5,5);r=R(-4,4);s=R(-4,4)}while(A+B===0||r===s);const P=A+B,Q=-(A*s+B*r),wA=Math.random()<.5;
  const den=`(${poly([1,-r])})(${poly([1,-s])})`;
  return nq({instr:`Donne ${wA?'A':'B'}.`,prompt:`<span class="m">${fr(poly([P,Q]).replace(/-/g,'−'),den.replace(/-/g,'−'))} = ${fr('A',poly([1,-r]).replace(/-/g,'−'))} + ${fr('B',poly([1,-s]).replace(/-/g,'−'))}</span>`.replace(/x/g,'<i>x</i>'),labels:[wA?'A =':'B ='],t:[wA?A:B],
    explain:`Méthode du cache : on multiplie par (x − ${num(r)}) puis on remplace x par ${num(r)} : A = (${P} × ${num(r)} + ${num(Q)})/(${num(r)} − ${num(s)}) = ${A}. De même, B = ${B}.`,hint:'Multiplie par le facteur concerné, puis remplace x par la valeur qui l’annule.',
    diag:([v])=>near(v,wA?-A:-B,1e-6)?'signe':near(v,wA?B:A,1e-6)?'calc':null})};
const gIVol=()=>{let k,L;do{k=R(1,4);L=R(1,4)}while((k*k*L**3)%3);const a=R(0,3),b=a+L,c=k*k*L**3/3;
  return nq({instr:'Le volume s’écrit V = cπ. Donne c.',prompt:stx(`On fait tourner autour de l’axe Ox le segment y = ${k===1?'':k}(x − ${a}) pour ${a} ≤ x ≤ ${b}.`),labels:['c ='],t:[c],
    explain:`V = π ∫ [${k}(x − ${a})]² dx = ${k*k}π [(x − ${a})³/3] de ${a} à ${b} = ${k*k}π × ${L**3}/3 = ${c}π. C’est le volume d’un cône.`,hint:'Volume de révolution : V = π ∫ y² dx.',
    diag:([v])=>near(v,k*k*L**3,1e-6)||near(v,k*L**3/3,1e-6)?'calc':null})};

/* Équations différentielles */
const gEdExp=()=>{const a=pick([-5,-4,-3,-2,2,3,4,5]);
  return mcq('Quelles fonctions sont solutions ?',mx(`y′ = ${a}y`),[{h:mx(`y = C e<sup>${a}x</sup>`),ok:true},{h:mx(`y = C e<sup>${-a}x</sup>`),tag:'signe'},{h:mx(`y = C e<sup>x/${a}</sup>`),tag:'ed-ci'},{h:mx(`y = ${a}x + C`),tag:'ed-ci'}],
    `Si y = C e<sup>${a}x</sup>, alors y′ = ${a} × C e<sup>${a}x</sup> = ${a}y. Ce sont les seules solutions.`,'Dérive chaque option et compare avec ' + a + 'y.')};
const gEdPrim=()=>{const m=R(1,4),p=R(-5,5),c=R(-9,9),t=R(1,4),v=m*t*t+p*t+c;
  return nq({instr:`Calcule y(${t}).`,prompt:mx(`y′ = ${2*m}x ${p<0?'−':'+'} ${Math.abs(p)} ; y(0) = ${num(c)}`),labels:[`y(${t}) =`],t:[v],
    explain:`y est une primitive : y = ${m===1?'':m}x² ${p<0?'−':'+'} ${Math.abs(p)}x + C. Comme y(0) = C = ${num(c)}, y(${t}) = ${m} × ${t*t} ${p<0?'−':'+'} ${Math.abs(p)} × ${t} ${c<0?'−':'+'} ${Math.abs(c)} = ${v}.`,
    hint:'Cherche une primitive, puis utilise y(0) pour la constante.',diag:([w])=>near(w,v-c,1e-6)&&c?'ed-ci':near(w,2*m*t+p,1e-6)?'prim':null})};
const gEdEq=()=>{const a=R(1,9),q=nz(-9,9),b=a*q;
  return nq({instr:'Trouve la solution constante.',prompt:mx(`y′ + ${a===1?'':a}y = ${num(b)}`),labels:['y ='],t:[q],
    explain:`Une constante a une dérivée nulle : ${a}y = ${num(b)}, donc y = ${num(q)}. Comme ${a} &gt; 0, toutes les solutions s’en rapprochent quand x → +∞.`,hint:'Remplace y′ par 0.',
    diag:([w])=>near(w,-q,1e-6)?'signe':near(w,b,1e-6)&&a>1?'calc':null})};
const gEdCi=()=>{const a=R(1,6),q=R(-6,6),b=a*q;let y0;do y0=R(-10,10);while(y0===q);const wC=Math.random()<.5;
  return nq({instr:`La solution s’écrit y = C e<sup>−${a}x</sup> + D. Donne ${wC?'C':'D'}.`,prompt:mx(`y′ + ${a===1?'':a}y = ${num(b)} ; y(0) = ${num(y0)}`),labels:[wC?'C =':'D ='],t:[wC?y0-q:q],
    explain:`Solution particulière constante : D = ${num(b)}/${a} = ${num(q)}. En x = 0 : C + ${num(q)} = ${num(y0)}, donc C = ${num(y0-q)}.`,hint:'D est la solution constante ; C se trouve avec y(0).',
    diag:([w])=>wC&&(near(w,y0,1e-6)||near(w,y0+q,1e-6))?'ed-ci':!wC&&near(w,-q,1e-6)&&q?'signe':null})};
const gEdNewton=()=>{const T=R(15,25),n=R(1,3),q=R(2,10),th0=T+2**n*q,tau=R(2,10);
  return nq({instr:`Quelle est sa température après ${n*tau} minutes (en °C) ?`,prompt:stx(`Un objet à ${th0} °C est placé dans une pièce à ${T} °C. L’écart de température avec la pièce est divisé par 2 toutes les ${tau} minutes (loi de Newton).`),labels:['θ ='],t:[T+q],
    explain:`θ(t) = ${T} + (${th0} − ${T})e<sup>−kt</sup>. L’écart initial ${th0-T} °C est divisé par 2<sup>${n}</sup> = ${2**n} : il vaut ${q} °C. Température : ${T} + ${q} = ${T+q} °C.`,
    hint:'C’est l’écart avec la pièce qui diminue, pas la température elle-même.',diag:([w])=>near(w,th0/2**n,1e-6)||near(w,q,1e-6)?'calc':null})};
const gEdSep=()=>{const[x1,y0]=pick(PYTH.slice(0,8));
  return nq({instr:`Calcule y(${x1}).`,prompt:mx(`y′ = ${fr('x','y')} ; y(0) = ${y0} ; y &gt; 0`),labels:[`y(${x1}) =`],t:[Math.hypot(x1,y0)],
    explain:`On sépare : y dy = x dx, puis y²/2 = x²/2 + C. Avec y(0) = ${y0} : y² = x² + ${y0*y0}. Donc y(${x1}) = √(${x1*x1} + ${y0*y0}) = ${Math.hypot(x1,y0)}.`,hint:'Mets les y d’un côté, les x de l’autre, puis intègre.',
    diag:([w])=>near(w,x1*x1+y0*y0,1e-6)||near(w,x1+y0,1e-6)?'ed-ci':null})};
const gEdCar=()=>{const r1=R(-6,6);let r2;do r2=R(-6,6);while(r2===r1);const p=-(r1+r2),q=r1*r2;
  return nq({instr:'Les racines de l’équation caractéristique sont λ₁ &lt; λ₂. Donne λ₂.',prompt:mx(`y″ ${p?`${p<0?'−':'+'} ${Math.abs(p)===1?'':Math.abs(p)}y′ `:''}${q<0?'−':'+'} ${Math.abs(q)}y = 0`).replace(' + 0y','').replace(' − 0y',''),labels:['λ₂ ='],t:[Math.max(r1,r2)],
    explain:`Équation caractéristique : λ² ${p<0?'−':'+'} ${Math.abs(p)}λ ${q<0?'−':'+'} ${Math.abs(q)} = 0, soit (λ − ${num(r1)})(λ − ${num(r2)}) = 0. Racines ${num(Math.min(r1,r2))} et ${num(Math.max(r1,r2))}.`,
    hint:'Cherche y = e<sup>λx</sup> : λ² + pλ + q = 0.',diag:([w])=>near(w,-Math.max(r1,r2),1e-6)?'ed-carac':near(w,Math.min(r1,r2),1e-6)?'ed-carac':null})};
const gEdPart=()=>{let p,q,m,D;do{p=R(-6,6);q=R(-6,6);m=nz(-3,3);D=m*m+p*m+q}while(!D);const A=nz(-4,4),K=A*D;
  return nq({instr:`Trouve A tel que y = A e<sup>${m}x</sup> soit solution.`,prompt:mx(`y″ ${p<0?'−':'+'} ${Math.abs(p)}y′ ${q<0?'−':'+'} ${Math.abs(q)}y = ${num(K)}e<sup>${m}x</sup>`),labels:['A ='],t:[A],
    explain:`y′ = ${m}A e<sup>${m}x</sup> et y″ = ${m*m}A e<sup>${m}x</sup>. En remplaçant : (${m*m} ${p*m<0?'−':'+'} ${Math.abs(p*m)} ${q<0?'−':'+'} ${Math.abs(q)})A = ${num(K)}, soit ${D}A = ${num(K)} et A = ${A}.`,
    hint:'Remplace y, y′ et y″ dans l’équation, puis divise par e<sup>mx</sup>.',diag:([w])=>q&&near(w,K/q,1e-6)||near(w,K,1e-6)&&D!==1?'ed-carac':null})};
const gEdCi2=()=>{const r1=R(-4,4);let r2;do r2=R(-4,4);while(r2===r1);const C1=nz(-5,5),C2=nz(-5,5),y0=C1+C2,y1=r1*C1+r2*C2,w1=Math.random()<.5;
  return nq({instr:`Trouve ${w1?'C₁':'C₂'}.`,prompt:mx(`y = C₁ e<sup>${r1}x</sup> + C₂ e<sup>${r2}x</sup> ; y(0) = ${y0} ; y′(0) = ${y1}`),labels:[w1?'C₁ =':'C₂ ='],t:[w1?C1:C2],
    explain:`y(0) = C₁ + C₂ = ${y0} et y′(0) = ${r1}C₁ + ${r2}C₂ = ${y1}. On résout : C₁ = ${C1} et C₂ = ${C2}.`,hint:'Écris y(0) et y′(0), puis résous le système de deux équations.',
    diag:([w])=>near(w,w1?C2:C1,1e-6)||near(w,y0,1e-6)||near(w,y1,1e-6)?'ed-ci':null})};
const gEdOsc=()=>{const om=R(1,5),[p0,q0]=pick(PYTH.slice(0,6)),A=p0*pick([-1,1]),B=q0*pick([-1,1]);
  if(Math.random()<.6)return nq({instr:'Donne l’amplitude du mouvement.',prompt:mx(`x″ + ${om*om}x = 0 ; x(0) = ${A} ; x′(0) = ${B*om}`),labels:['Amplitude ='],t:[Math.hypot(A,B)],
    explain:`λ² + ${om*om} = 0 donne λ = ±${om}i, donc x(t) = A cos ${om}t + B sin ${om}t avec A = ${A} et ${om}B = ${B*om}, soit B = ${B}. Amplitude : √(${A<0?`(${A})`:A}² + ${B<0?`(${B})`:B}²) = ${Math.hypot(A,B)}.`,
    hint:'Divise x′(0) par ω pour trouver B, puis amplitude = √(A² + B²).',diag:([w])=>near(w,Math.abs(A)+Math.abs(B),1e-6)||near(w,Math.hypot(A,B*om),1e-6)&&om>1?'ed-ci':null});
  const P=['2π','π','2π²','2πω'].map((s0,i)=>[s0,i]);
  return mcq('Quelle est la période du mouvement ?',mx(`x″ + ${om*om}x = 0`),[{h:mx(om===1?'2π':om===2?'π':fr('2π',om)),ok:true},{h:mx(fr('π',om)),tag:'calc'},{h:mx(fr(om,'2π')),tag:'calc'},{h:mx(`${2*om}π`),tag:'calc'}].filter((o,i,arr)=>arr.findIndex(x=>x.h===o.h)===i),
    `λ = ±${om}i : x(t) = A cos ${om}t + B sin ${om}t, qui se répète quand ${om}t augmente de 2π. Période : 2π/${om}.`,'Période = 2π ÷ ω, avec ω² le coefficient de x.')};
