/* --- Parcours Analyse : chapitres « Bases » (prérequis ajoutés par l'analyste) --- */
Object.assign(ANA_ERR,{
  'puiss':{label:'Règles des puissances',tip:'aᵐ × aⁿ = aᵐ⁺ⁿ (on additionne) et (aᵐ)ⁿ = aᵐⁿ (on multiplie).'},
  'fraction':{label:'Somme de fractions',tip:'On ne peut additionner que des fractions de même dénominateur : a/b + c/d = (ad + cb)/(bd).'},
  'valabs':{label:'Valeur absolue',tip:'|a − b| est la distance entre a et b : toujours positive ou nulle.'},
  'trigo':{label:'Valeurs remarquables',tip:'Entre 0 et π/2, sin monte de 0 à 1 (0, 1/2, √2/2, √3/2, 1) et cos descend de 1 à 0.'},
  'compo':{label:'Ordre de composition',tip:'f(g(x)) : on calcule d’abord g(x), puis on applique f au résultat.'},
});
/* Bases 1 */
const gB1Prod=()=>{const a=pick([2,3,5,10]),m=R(1,9),n=R(1,9);
  return nq({instr:'Écris sous la forme a<sup>k</sup>. Que vaut k ?',prompt:mx(`${a}<sup>${m}</sup> × ${a}<sup>${n}</sup>`),labels:['k ='],t:[m+n],
    explain:`${a}<sup>${m}</sup> × ${a}<sup>${n}</sup>, c’est ${m} facteurs ${a} suivis de ${n} facteurs ${a}, soit ${m+n} facteurs : k = ${m+n}.`,hint:'Compte le nombre total de facteurs.',diag:([v])=>near(v,m*n,1e-6)?'puiss':null})};
const gB1Pow=()=>{const a=pick([2,3,10]),m=R(2,6),n=R(2,6);
  return nq({instr:'Écris sous la forme a<sup>k</sup>. Que vaut k ?',prompt:mx(`(${a}<sup>${m}</sup>)<sup>${n}</sup>`),labels:['k ='],t:[m*n],
    explain:`On répète ${n} fois le bloc ${a}<sup>${m}</sup> : ${n} × ${m} = ${m*n} facteurs ${a}.`,hint:'Une puissance de puissance : on multiplie les exposants.',diag:([v])=>near(v,m+n,1e-6)?'puiss':null})};
const gB1Frac=()=>{const a=R(1,9),c=R(1,9),b=R(2,6),d=R(2,6),t=(a*d+c*b)/(b*d);
  return nq({instr:'Calcule.',prompt:mx(`${fr(a,b)} + ${fr(c,d)}`),labels:['Résultat ='],t:[t],dp:2,
    explain:`Même dénominateur ${b*d} : (${a} × ${d} + ${c} × ${b})/${b*d} = ${a*d+c*b}/${b*d} ≈ ${dec(t)}.`,hint:'Mets les deux fractions au même dénominateur.',diag:([v])=>near(v,(a+c)/(b+d),.011)?'fraction':null})};
const gB1Abs=()=>{const a=R(-20,20);let b;do b=R(-20,20);while(b===a);
  return nq({instr:'Calcule.',prompt:mx(`|${num(a)} − ${b<0?`(${num(b)})`:b}|`),labels:['Résultat ='],t:[Math.abs(a-b)],
    explain:`${num(a)} − ${b<0?`(${num(b)})`:b} = ${num(a-b)}, et sa distance à 0 vaut ${Math.abs(a-b)}.`,hint:'Calcule la différence, puis enlève le signe moins éventuel.',diag:([v])=>near(v,a-b,1e-6)||near(v,Math.abs(a)-Math.abs(b),1e-6)?'valabs':null})};
const gB1Eq=()=>{const x0=R(-10,10),a=pick([-9,-7,-5,-3,-2,2,3,4,5,6,7,8,9]),b=R(-20,20),c=a*x0+b;
  return nq({instr:'Résous l’équation.',prompt:mx(`${a}x ${b<0?'−':'+'} ${Math.abs(b)} = ${num(c)}`),labels:['x ='],t:[x0],
    explain:`${a}x = ${num(c)} ${b<0?'+':'−'} ${Math.abs(b)} = ${num(c-b)}, donc x = ${num(c-b)} ÷ ${num(a)} = ${num(x0)}.`,hint:'Isole le terme en x, puis divise par son coefficient.',diag:([v])=>near(v,(c+b)/a,1e-6)?'signe':null})};
const gB1Id=()=>{const a=nz(-9,9);
  return nq({instr:'Développe. Quel est le coefficient de x ?',prompt:M(`(x${sg(a)})^2`),labels:['Coefficient ='],t:[2*a],
    explain:`(x ${a<0?'−':'+'} ${Math.abs(a)})² = x² ${a<0?'−':'+'} 2 × ${Math.abs(a)} × x + ${a*a} : le coefficient de x est ${2*a}.`,hint:'(a + b)² = a² + 2ab + b².',diag:([v])=>near(v,a,1e-6)||near(v,0,1e-6)?'id-rem':null})};
const gB1Int=()=>{const a=R(-10,10),r=R(1,9),I=(l,x,y,h)=>mx(`x ∈ ${l}${num(x)} ; ${num(y)}${h}`);
  return mcq('Cette inégalité équivaut à :',mx(`|x ${a<0?'+':'−'} ${Math.abs(a)}| ≤ ${r}`),[{h:I('[',a-r,a+r,']'),ok:true},{h:I('[',-r,r,']'),tag:'valabs'},{h:I(']',a-r,a+r,'['),tag:'bracket'},{h:I('[',a,a+r,']'),tag:'valabs'}],
    `x est à distance au plus ${r} de ${num(a)}, donc entre ${num(a-r)} et ${num(a+r)}, bornes comprises.`,'|x − a| ≤ r : x est à distance au plus r de a.')};
const gB1Disc=()=>{const a=R(1,5),b=R(-10,10),c=R(-10,10);
  return nq({instr:'Calcule le discriminant.',prompt:M(poly([a,b,c])),labels:['Δ ='],t:[b*b-4*a*c],
    explain:`Δ = b² − 4ac = ${num(b)}² − 4 × ${a} × ${num(c)} = ${b*b-4*a*c}.`,hint:'Δ = b² − 4ac.',diag:([v])=>near(v,b*b+4*a*c,1e-6)?'delta-formula':near(v,b-4*a*c,1e-6)?'carre-neg':null})};
const gB1Rac=()=>{const r1=R(-8,7),r2=R(r1+1,8),S2=r1+r2,P=r1*r2;
  return nq({instr:'Donne la plus grande solution.',prompt:M(poly([1,-S2,P]))+mx(' = 0'),labels:['x ='],t:[r2],
    explain:`Δ = ${S2*S2-4*P} = ${r2-r1}². x = (${num(S2)} ± ${r2-r1})/2, soit ${num(r1)} et ${num(r2)}. La plus grande est ${num(r2)}.`,hint:'x = (−b ± √Δ)/2a ; la plus grande prend le signe +.',diag:([v])=>near(v,r1,1e-6)||near(v,-r2,1e-6)&&r2?'roots-sign':null})};
/* Bases 2 */
const gB2Img=()=>{const a=nz(-5,5),b=R(-5,5),c=R(-5,5),x0=R(-4,4),t=a*x0*x0+b*x0+c;
  return nq({instr:`Calcule f(${num(x0)}).`,prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(poly([a,b,c])),labels:[`f(${num(x0)}) =`],t:[t],
    explain:`On remplace x par ${num(x0)}, avec des parenthèses : ${a} × (${num(x0)})² ${b<0?'−':'+'} ${Math.abs(b)} × (${num(x0)}) ${c<0?'−':'+'} ${Math.abs(c)} = ${num(t)}.`,hint:'Mets la valeur entre parenthèses avant de calculer le carré.',
    diag:([v])=>x0<0&&near(v,-a*x0*x0+b*x0+c,1e-6)?'carre-neg':null})};
const gB2Int=()=>{const p=R(1,9),a=R(-9,9);
  return nq({instr:'Quelle valeur de x est interdite ?',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`${p}/(${poly([1,-a])})`),labels:['x ='],t:[a],
    explain:`Le dénominateur x ${a<0?'+':'−'} ${Math.abs(a)} s’annule pour x = ${num(a)}.`,hint:'On ne peut pas diviser par 0.',diag:([v])=>near(v,-a,1e-6)&&a?'signe':near(v,0,1e-6)&&a?'domaine':null})};
const gB2Dom=()=>{const a=R(-9,9),I=(l,x,y,h)=>mx(`${l}${x} ; ${y}${h}`);
  return mcq('Quel est le domaine de définition ?',`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`sqrt(${poly([1,-a])})`),[{h:I('[',num(a),'+∞','['),ok:true},{h:I(']',num(a),'+∞','['),tag:'bracket'},{h:I(']','−∞',num(a),']'),tag:'interval-dir'},{h:mx('ℝ'),tag:'domaine'}],
    `Il faut x ${a<0?'+':'−'} ${Math.abs(a)} ≥ 0, donc x ≥ ${num(a)} : le domaine est [${num(a)} ; +∞[.`,'Sous une racine, le nombre doit être positif ou nul.')};
const gB2Rad=()=>{const d=pick([30,45,60,90,120,135,150,180,270,360]);
  return nq({instr:'Convertis en radians : l’angle vaut k·π. Donne k.',prompt:mx(`${d}°`),labels:['k ='],t:[d/180],tol:.001,
    explain:`180° = π rad, donc ${d}° = (${d}/180)π = ${fdec(d,180)}π.`,hint:'180° correspond à π radians.',diag:([v])=>near(v,180/d,.001)||near(v,d/360,.001)?'calc':null})};
const TRV=[['0','0','1'],['π/6','1/2','√3/2'],['π/4','√2/2','√2/2'],['π/3','√3/2','1/2'],['π/2','1','0']];
const gB2Trig=()=>{const i=R(0,4),f=pick(['sin','cos']),[ang,s0,c0]=TRV[i],ok=f==='sin'?s0:c0,all=['0','1/2','√2/2','√3/2','1'];
  const H=v=>v.includes('/')?fr(...v.split('/')):v,O=[ok,...shuffle(all.filter(v=>v!==ok)).slice(0,3)];
  return mcq('Que vaut cette expression ?',mx(`${f}(${ang.includes('/')?fr(...ang.split('/')):ang})`),O.map((v,j)=>({h:mx(H(v)),ok:!j,tag:'trigo'})),
    `D’après le tableau des valeurs remarquables, ${f}(${ang}) = ${ok}. Entre 0 et π/2, sin monte de 0 à 1 et cos descend de 1 à 0.`,'Révise le tableau des angles remarquables.')};
const gB2Per=()=>{const w=pick([1,2,3,4,6]);
  return nq({instr:'La période vaut T = k·π. Donne k.',prompt:mx(`f(x) = sin(${w===1?'':w}x)`),labels:['k ='],t:[2/w],tol:.001,
    explain:`sin(ωx) a pour période 2π/ω = 2π/${w} = ${fdec(2,w)}π.`,hint:'Période de sin(ωx) : 2π ÷ ω.',diag:([v])=>near(v,2*w,.001)||near(v,1/w,.001)&&w>1?'calc':null})};
const gB2Comp=()=>{const a=nz(-5,5),b=R(-5,5),x0=R(-4,4),t=a*x0*x0+b;
  return nq({instr:`Calcule f(g(${num(x0)})).`,prompt:mx(`f(x) = ${a}x ${b<0?'−':'+'} ${Math.abs(b)} ; g(x) = x<sup>2</sup>`),labels:['f(g(x₀)) ='],t:[t],
    explain:`g(${num(x0)}) = ${x0*x0}, puis f(${x0*x0}) = ${a} × ${x0*x0} ${b<0?'−':'+'} ${Math.abs(b)} = ${num(t)}.`,hint:'Calcule d’abord g, puis applique f au résultat.',diag:([v])=>near(v,(a*x0+b)**2,1e-6)&&(a*x0+b)**2!==t?'compo':null})};
