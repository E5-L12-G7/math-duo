/* --- Parcours Analyse : chapitres tirés du cours complet (fonctions usuelles, étude de fonctions, applications des intégrales) --- */
Object.assign(ANA_ERR,{
  'explog':{label:'Exponentielle et logarithme',tip:'ln(ab) = ln a + ln b, e<sup>a</sup> = e<sup>b</sup> ⟺ a = b, et ln(e<sup>x</sup>) = x : ln « défait » l’exponentielle.'},
  'recip':{label:'Fonction réciproque',tip:'f⁻¹ défait f : si y = ax + b, alors x = (y − b)/a. Ce n’est pas 1/f.'},
  'arc':{label:'Fonctions circulaires réciproques',tip:'arcsin et arctan donnent un angle de [−π/2 ; π/2], arccos un angle de [0 ; π].'},
  'hyper':{label:'Fonctions hyperboliques',tip:'ch x = (eˣ + e⁻ˣ)/2, sh x = (eˣ − e⁻ˣ)/2 et ch²x − sh²x = 1 (avec un moins, contrairement à cos² + sin² = 1).'},
  'extremum':{label:'Nature d’un point critique',tip:'f′(c) = 0 et f″(c) &gt; 0 : minimum (courbe en bol) ; f″(c) &lt; 0 : maximum ; f″(c) = 0 : on ne peut pas conclure.'},
  'aire':{label:'Aire et intégrale',tip:'Une aire est toujours positive : quand la courbe passe sous l’axe, on prend la valeur absolue de chaque morceau.'},
  'volume':{label:'Volume de révolution',tip:'V = π ∫ y² dx : on élève y au carré avant d’intégrer.'},
});
/* Fonctions usuelles, réciproques et hyperboliques */
const gFuExp=()=>{const a=nz(-5,5),t=R(-6,6),b=a*t;
  return nq({instr:'Résous l’équation.',prompt:mx(`e<sup>${a}x</sup> = e<sup>${num(b)}</sup>`),labels:['x ='],t:[t],
    explain:`L’exponentielle est strictement croissante : deux exponentielles égales ont le même exposant. ${a}x = ${num(b)}, donc x = ${num(t)}.`,hint:'e<sup>A</sup> = e<sup>B</sup> ⟺ A = B.',diag:([v])=>near(v,b-a,1e-6)||near(v,a*b,1e-6)?'explog':null})};
const gFuLn=()=>{const a=R(2,12),b=R(2,12);
  return nq({instr:'Écris sous la forme ln(k). Que vaut k ?',prompt:mx(`ln ${a} + ln ${b}`),labels:['k ='],t:[a*b],
    explain:`Le logarithme transforme les produits en sommes : ln ${a} + ln ${b} = ln(${a} × ${b}) = ln ${a*b}.`,hint:'ln a + ln b = ln(ab).',diag:([v])=>near(v,a+b,1e-6)?'explog':null})};
const gFuLog=()=>{const a=pick([2,3,10]),n=R(0,6),x=a**n;
  return nq({instr:'Calcule.',prompt:mx(`log<sub>${a}</sub>(${x})`),labels:['Résultat ='],t:[n],
    explain:`log<sub>${a}</sub>(${x}) est l’exposant k tel que ${a}<sup>k</sup> = ${x} : k = ${n}.`,hint:'À quelle puissance faut-il élever la base ?',diag:([v])=>near(v,x/a,1e-6)?'log-def':null})};
const gFuExpC=()=>{const a=R(1,3),c=R(2,50),t=Math.log(c)/a;
  return nq({instr:'Résous l’équation.',prompt:mx(`e<sup>${a===1?'':a}x</sup> = ${c}`),labels:['x ='],t:[t],dp:2,
    explain:`On applique ln : ${a===1?'':a}x = ln ${c}, donc x = ln(${c})${a>1?`/${a}`:''} ≈ ${dec(t)}.`,hint:'ln « défait » l’exponentielle : ln(e<sup>u</sup>) = u.',diag:([v])=>near(v,Math.log(c/a),.011)||near(v,c/a,.011)?'explog':null})};
const gFuRec=()=>{const a=pick([-5,-4,-3,-2,2,3,4,5]),b=R(-10,10),t=R(-6,6),y0=a*t+b;
  return nq({instr:`Calcule f<sup>−1</sup>(${num(y0)}).`,prompt:mx(`f(x) = ${a}x ${b<0?'−':'+'} ${Math.abs(b)}`),labels:['f⁻¹(y₀) ='],t:[t],
    explain:`y = ${a}x ${b<0?'−':'+'} ${Math.abs(b)} donne x = (y ${b<0?'+':'−'} ${Math.abs(b)})/${a}. Avec y = ${num(y0)} : x = ${num(t)}. Vérification : f(${num(t)}) = ${num(y0)}.`,
    hint:'Cherche le nombre dont l’image par f vaut y₀.',diag:([v])=>near(v,a*y0+b,1e-6)||near(v,1/(a*y0+b),.001)?'recip':null})};
const ARC=[['arcsin',fr(1,2),2,'sin'],['arcsin','√2/2',3,'sin'],['arcsin',`−${fr(1,2)}`,-2,'sin'],['arccos',fr(1,2),4,'cos'],['arccos','0',6,'cos'],['arccos',`−${fr(1,2)}`,8,'cos'],['arctan','1',3,'tan'],['arctan','√3',4,'tan'],['arctan','−1',-3,'tan']];
const gFuArc=()=>{const[f,v,k]=pick(ARC),O=[k,6-k,12-k,-k],H=x=>mx(angP(x));
  return mcq('Que vaut cette expression ?',mx(`${f}(${v})`),O.map((x,i)=>({h:H(x),ok:!i,tag:'arc'})),
    `On cherche l’angle de ${f==='arccos'?'[0 ; π]':'[−π/2 ; π/2]'} dont le ${f.slice(3)} vaut ${v} : c’est ${angP(k)}.`,f==='arccos'?'arccos donne un angle entre 0 et π.':'arcsin et arctan donnent un angle entre −π/2 et π/2.')};
const gFuCh=()=>{const a=pick([2,4,5,10]),t=(a+1/a)/2;
  return nq({instr:'Calcule.',prompt:mx(`ch(ln ${a})`),labels:['Résultat ='],t:[t],tol:.001,
    explain:`e<sup>ln ${a}</sup> = ${a} et e<sup>−ln ${a}</sup> = 1/${a}. ch est la moyenne des deux : (${a} + 1/${a})/2 = ${dec(t,3)}.`,hint:'ch x = (eˣ + e⁻ˣ)/2.',diag:([v])=>near(v,(a-1/a)/2,.001)||near(v,a+1/a,.001)?'hyper':null})};
const gFuChSh=()=>{const[s,t]=pick([[0,1],[.75,1.25],[4/3,5/3],[2.4,2.6]]);
  return nq({instr:'Calcule ch x.',prompt:mx(`sh x = ${s===4/3?fr(4,3):num(s)}`),labels:['ch x ='],t:[t],tol:.001,
    explain:`ch²x − sh²x = 1 et ch x &gt; 0, donc ch x = √(1 + ${s===4/3?'16/9':num(+(s*s).toFixed(4))}) = ${dec(t,3)}.`,hint:'ch²x − sh²x = 1.',diag:([v])=>s&&(near(v,Math.sqrt(Math.abs(1-s*s)),.001)||near(v,1+s*s,.001))?'hyper':null})};
const gFuArgsh=()=>{const[s,t]=pick([[0,0],[.75,Math.log(2)],[2.4,Math.log(5)]]);
  return nq({instr:'Calcule.',prompt:mx(`argsh(${num(s)})`),labels:['Résultat ='],t:[t],dp:3,
    explain:`argsh x = ln(x + √(x² + 1)). Ici √(${num(s)}² + 1) = ${num(Math.sqrt(s*s+1))}, donc argsh(${num(s)}) = ln(${num(s+Math.sqrt(s*s+1))}) ≈ ${dec(t,3)}.`,hint:'argsh x = ln(x + √(x² + 1)).',
    diag:([v])=>s>1&&near(v,Math.log(s+Math.sqrt(s*s-1)),.002)?'hyper':null})};

/* Étude de fonctions et optimisation */
const gEtPente=()=>{const a=nz(-5,5),b=R(-5,5),c=R(-5,5),x0=R(-3,3),m=2*a*x0+b;
  return nq({instr:`Quelle est la pente de la tangente en x = ${num(x0)} ?`,prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(poly([a,b,c])),labels:['Pente ='],t:[m],
    explain:`La pente est f′(${num(x0)}), avec f′(x) = ${2*a}x ${b<0?'−':'+'} ${Math.abs(b)} : f′(${num(x0)}) = ${num(m)}.`,hint:'Pente de la tangente = nombre dérivé.',diag:([v])=>near(v,a*x0*x0+b*x0+c,1e-6)?'tangente':null})};
const gEtNorm=()=>{const x0=nz(-5,5),t=-1/(2*x0);
  return nq({instr:'Quelle est la pente de la normale ?',prompt:stx(`Courbe y = x², au point d’abscisse ${num(x0)}.`),labels:['Pente ='],t:[t],tol:.001,
    explain:`La tangente a pour pente 2 × ${num(x0)} = ${2*x0}. La normale lui est perpendiculaire : pente −1/${2*x0} = ${fdec(-1,2*x0)}.`,hint:'Deux droites perpendiculaires : le produit des pentes vaut −1.',diag:([v])=>near(v,2*x0,.001)||near(v,-2*x0,.001)?'tangente':null})};
const gEtCub=()=>{const p=R(1,3),q=R(-10,10),k=3*p*p,t=-2*p**3+q;
  return nq({instr:'Quelle est la valeur du minimum local ?',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`x^3-${k}x${q?sg(q):''}`),labels:['Minimum ='],t:[t],
    explain:`f′(x) = 3x² − ${k} = 3(x − ${p})(x + ${p}). f′ passe de − à + en ${p} : minimum local f(${p}) = ${p**3} − ${k*p} ${q<0?'−':'+'} ${Math.abs(q)} = ${t}.`,hint:'Trouve où f′ s’annule en passant de − à +, puis calcule f en ce point.',
    diag:([v])=>near(v,2*p**3+q,1e-6)?'extremum':near(v,p,1e-6)?'calc':null})};
const gEtNat=()=>{const s0=R(-5,5),O=['Minimum local','Maximum local','On ne peut pas conclure'],c=s0>0?0:s0<0?1:2;
  return mcq('Que peut-on dire du point c ?',mx(`f′(c) = 0 et f″(c) = ${num(s0)}`),O.map((h,i)=>({h,ok:i===c,tag:'extremum'})),
    c===2?'f″(c) = 0 : il faut une étude plus fine (x⁴ a un minimum en 0, x³ n’en a pas).':`f″(c) ${s0>0?'&gt;':'&lt;'} 0 : la courbe est en ${s0>0?'bol, c’est un minimum':'dôme, c’est un maximum'} local.`,'Le signe de f″ indique si la courbe est en bol ou en dôme.',true)};
const gEtBox=()=>{const L=pick([6,12,18,24,30]),V=2*L**3/27;
  return nq({instr:'Quel est le volume maximal (en cm³) ?',prompt:stx(`Dans une plaque carrée de côté ${L} cm, on découpe un carré de côté x à chaque coin pour former une boîte ouverte.`),labels:['Volume ='],t:[V],
    explain:`V(x) = x(${L} − 2x)², V′(x) = (${L} − 2x)(${L} − 6x). La racine utile est x = ${L/6} : V = ${L/6} × ${L-L/3}² = ${V}.`,hint:'Exprime le volume en fonction de x, dérive, garde la racine qui donne une vraie boîte.',
    diag:([v])=>near(v,L/6,1e-6)||near(v,0,1e-6)?'calc':null})};
/* Applications des intégrales */
const gApPar=()=>{const b=R(1,6),t=b**3/3;
  return nq({instr:'Calcule l’aire sous la courbe.',prompt:stx(`Courbe y = x², entre x = 0 et x = ${b}.`),labels:['Aire ='],t:[t],tol:.01,
    explain:`∫₀^${b} x² dx = [x³/3]₀^${b} = ${b**3}/3 ≈ ${dec(t)}.`,hint:'Primitive de x² : x³/3.',diag:([v])=>near(v,b*b,.01)||near(v,2*b,.01)?'prim':null})};
const gApSin=()=>{const k=R(1,5);
  return nq({instr:'Calcule l’aire entre la courbe et l’axe Ox.',prompt:stx(`Courbe y = sin x, pour x ∈ [0 ; ${k===1?'':k}π].`),labels:['Aire ='],t:[2*k],
    explain:`Chaque arche [nπ ; (n + 1)π] a une aire 2 (∫₀^π sin x dx = 2). Il y a ${k} arche${k>1?'s':''} : aire ${2*k}. Sans valeurs absolues, les arches sous l’axe se compenseraient.`,
    hint:'Coupe l’intervalle là où sin change de signe et additionne les valeurs absolues.',diag:([v])=>near(v,k%2?2:0,1e-6)?'aire':null})};
const gApRac=()=>{const b=R(1,10),c=b*b/2;
  return nq({instr:'Le volume s’écrit V = cπ. Donne c.',prompt:stx(`La courbe y = √x, x ∈ [0 ; ${b}], tourne autour de l’axe Ox.`),labels:['c ='],t:[c],tol:.01,
    explain:`V = π ∫₀^${b} (√x)² dx = π ∫₀^${b} x dx = π × ${b*b}/2 : c = ${num(c)}.`,hint:'V = π ∫ y² dx.',diag:([v])=>near(v,2/3*b**1.5,.01)?'volume':null})};
const gApLong=()=>{const[m,f]=pick([[0,1],[.75,1.25],[4/3,5/3]]),p=R(-5,5),a=R(0,5),b=a+12*R(1,2),t=(b-a)*f;
  return nq({instr:'Calcule la longueur de la courbe.',prompt:stx(`y = ${m===4/3?'(4/3)':num(m)}x ${p<0?'−':'+'} ${Math.abs(p)}, pour x ∈ [${a} ; ${b}].`),labels:['Longueur ='],t:[t],tol:.01,
    explain:`y′ = ${m===4/3?'4/3':num(m)} est constant, donc ℓ = ∫ √(1 + y′²) dx = (${b} − ${a}) × √(1 + ${m===4/3?'16/9':num(m*m)}) = ${b-a} × ${num(+f.toFixed(4))} = ${num(+t.toFixed(2))}.`,
    hint:'ℓ = ∫ √(1 + y′²) dx.',diag:([v])=>m&&(near(v,b-a,.01)||near(v,(b-a)*(1+m),.01))?'calc':null})};
const gApPol=()=>{const Rr=R(1,6),k=pick([1,2,3,4,6]),c=Rr*Rr/(2*k);
  return nq({instr:'L’aire s’écrit cπ. Donne c.',prompt:stx(`Secteur r = ${Rr}, θ ∈ [0 ; π${k>1?'/'+k:''}] (coordonnées polaires).`),labels:['c ='],t:[c],tol:.01,
    explain:`A = (1/2) ∫ r² dθ = (1/2) × ${Rr*Rr} × π${k>1?'/'+k:''} = ${num(+c.toFixed(3))}π.`,hint:'En polaire : A = ½ ∫ r² dθ.',diag:([v])=>near(v,Rr*Rr/k,.01)||near(v,Rr/(2*k),.01)?'calc':null})};
const gApGrav=()=>{const b=R(1,9),t=2*b/3;
  return nq({instr:'Calcule l’abscisse X<sub>G</sub> du centre de gravité.',prompt:stx(`Une plaque homogène occupe le domaine sous y = x pour x ∈ [0 ; ${b}].`),labels:['X<sub>G</sub> ='],t:[t],tol:.01,
    explain:`Masse ∝ ∫₀^${b} x dx = ${b*b}/2 ; moment ∝ ∫₀^${b} x · x dx = ${b**3}/3. X<sub>G</sub> = (${b**3}/3) ÷ (${b*b}/2) = 2 × ${b}/3 ≈ ${dec(t)}.`,
    hint:'X<sub>G</sub> = ∫ x · y dx ÷ ∫ y dx.',diag:([v])=>near(v,b/2,.01)||near(v,b/3,.01)?'calc':null})};
const gApIn=()=>{const m1=R(1,10),m2=R(1,10),r1=R(1,5),r2=R(1,5),t=m1*r1*r1+m2*r2*r2;
  return nq({instr:'Calcule le moment d’inertie total (kg·m²).',prompt:stx(`Deux masses ponctuelles de ${m1} kg et ${m2} kg sont à ${r1} m et ${r2} m d’un axe.`),labels:['I ='],t:[t],
    explain:`I = Σ m r² = ${m1} × ${r1}² + ${m2} × ${r2}² = ${t}.`,hint:'Chaque masse compte avec le carré de sa distance à l’axe.',diag:([v])=>near(v,m1*r1+m2*r2,1e-6)?'calc':null})};
