/* ===================== Parcours « Fonctions et suites », partie 1 : les fonctions =====================
   Chapitres fs-ref, fs-d23, fs-der, fs-lim, fs-cvx, fs-exp, fs-ln (cours dans analyse/fs-1.md, pédagogie dans peda/fs-1.json, cartes dans cards/fs-1.json).
   Tous les noms sont préfixés par gFs / fs / FS_ pour éviter les collisions. */
Object.assign(ANA_ERR,{
  'fs-ordre':{label:'Fonction et ordre',tip:'Une fonction croissante conserve l’ordre, une fonction décroissante le renverse (inverse sur ]0 ; +∞[, carré sur ]−∞ ; 0]).'},
  'fs-carre':{label:'Inéquation avec un carré',tip:'x² ≤ k² ⟺ −k ≤ x ≤ k : la fonction carré n’est pas monotone sur ℝ, on ne « prend pas la racine » des deux côtés.'},
  'fs-coefdir':{label:'Coefficient directeur',tip:'a = (f(m) − f(n)) ÷ (m − n) : écart des images divisé par l’écart des abscisses, pris dans le même ordre.'},
  'fs-sommet':{label:'Sommet de la parabole',tip:'f(x) = a(x − α)² + β : le sommet est (α ; β). Attention, dans (x + 3)², α = −3.'},
  'fs-delta':{label:'Discriminant et racines',tip:'Δ = b² − 4ac ; si Δ > 0, x = (−b ± √Δ) ÷ (2a). Le −b et le 2a sont les pièges habituels.'},
  'fs-signe-tri':{label:'Signe d’un trinôme',tip:'Un trinôme est du signe de a à l’extérieur des racines et du signe contraire entre les racines.'},
  'fs-lim-signe':{label:'Limite en 0⁺ ou 0⁻',tip:'L ÷ 0 donne ±∞ : applique la règle des signes au numérateur et au signe du 0 (0⁺ ou 0⁻).'},
  'fs-cc':{label:'Croissances comparées',tip:'En +∞, eˣ l’emporte sur toute puissance de x, et toute puissance de x l’emporte sur ln x.'},
  'fs-tvi':{label:'Théorème des valeurs intermédiaires',tip:'Continuité + changement de signe : au moins une solution. Il faut en plus la stricte monotonie pour l’unicité.'},
  'fs-convexe':{label:'Convexité',tip:'f″ ≥ 0 : convexe (courbe au-dessus de ses tangentes) ; f″ ≤ 0 : concave (en dessous). Point d’inflexion : f″ s’annule en changeant de signe.'},
});
/* --- outils communs --- */
const fsQ=(n,d=1)=>frH(new Fr(n,d));
const fsT=(n,d=1)=>{const f=new Fr(n,d);return f.d===1?num(f.n):`${f.n<0?MINUS:''}${Math.abs(f.n)}/${f.d}`};
const fsE=(n,d=1)=>{const f=new Fr(n,d);return f.d===1?String(f.n):`${f.n}/${f.d}`};
const fsFH=f=>f.d===1?num(f.n):(f.n<0?MINUS:'')+fr(Math.abs(f.n),f.d);
const fsFx=(s,n='f')=>`<span class="m"><i>${n}</i>(<i>x</i>) = </span>`+M(s);
const fsNq=o=>{const q=nq(o.ex?Object.assign({tol:1e-6},o):o);if(o.ex)q.ans=o.ex.map(String);return q};
const fsS=v=>v<0?'−':'+';
const fsXa=a=>a?`x ${fsS(a)} ${Math.abs(a)}`:'x';
const fsLin=(a,b)=>{a=F(a);b=F(b);const ah=a.n===a.d?'':a.n===-a.d?MINUS:fsFH(a);return mx(`${ah}x${b.n===0?'':` ${fsS(b.n)} ${fsFH(new Fr(Math.abs(b.n),b.d))}`}`)};
/* racines (B ± √D) ÷ A, simplifiées ; renvoie [{t,v}] trié */
function fsRG(B,D,A){if(D<0)return[];const s=Math.round(Math.sqrt(D));
  if(s*s===D){const vs=D===0?[[B,A]]:[[B-s,A],[B+s,A]];return vs.map(([n,d])=>({t:fsT(n,d),v:n/d})).sort((p,q)=>p.v-q.v)}
  let k=1,r=D;for(let i=2;i*i<=r;i++)while(r%(i*i)===0){r/=i*i;k*=i}
  const g=gcd(gcd(B,k),A);let b=B/g,K=k/g,a=A/g;if(a<0){a=-a;b=-b}
  const one=m=>{const sq=`${K===1?'':K}√${r}`,top=b?`${num(b)} ${m?'+':'−'} ${sq}`:(m?'':MINUS)+sq;return a===1?top:`(${top})/${a}`};
  return[{t:one(0),v:(b-K*Math.sqrt(r))/a},{t:one(1),v:(b+K*Math.sqrt(r))/a}]}
const fsRoots=(a,b,c)=>{const D=b*b-4*a*c,rs=fsRG(-b,D,2*a);rs.D=D;return rs};
const fsRtxt=rs=>!rs.length?'aucune racine (Δ &lt; 0)':rs.length===1?`une racine double : ${rs[0].t}`:`${rs[0].t} et ${rs[1].t}`;
/* options « racines du trinôme » : la bonne suite est toujours le calcul exact sur le trinôme choisi */
function fsRootOpts(a,b,c){const T=fsRoots(a,b,c),o=[{h:'Racines : '+fsRtxt(T),ok:true,rs:T}];
  if(T.length){o.push({h:'Racines : '+fsRtxt(fsRoots(a,-b,c)),rs:fsRoots(a,-b,c),why:'Erreur de signe : les racines valent (−b ± √Δ) ÷ (2a), avec −b.',tag:'fs-delta'});
    o.push({h:'Racines : '+fsRtxt([]),rs:[],why:`Ici Δ = ${num(T.D)} ${T.D>0?'&gt;':'='} 0 : le trinôme a ${T.D>0?'deux racines':'une racine'}.`,tag:'fs-delta'})}
  else{const W=fsRG(-b,-T.D,2*a);o.push({h:'Racines : '+fsRtxt(W),rs:W,why:`Δ = ${num(T.D)} &lt; 0 : √Δ n’existe pas, on ne peut pas prendre √|Δ| à la place.`,tag:'fs-delta'})}
  return o}
const fsInt=(lo,hi,lc,rc)=>`${lc?'[':']'}${lo} ; ${hi}${rc?']':'['}`;

/* ===================== Chapitre fs-ref : fonctions de référence ===================== */
const gFsRefImg=()=>{const v=R(0,3);
  if(v===0){const x0=-R(11,35)/10,t=+(x0*x0).toFixed(4);
    return fsNq({instr:`Calcule f(${num(x0)}).`,prompt:stx('f est la fonction carré :')+mx('f(x) = x<sup>2</sup>'),labels:[`f(${num(x0)}) =`],t:[t],
      explain:`On remplace x par ${num(x0)}, entre parenthèses : (${num(x0)})² = (${num(x0)}) × (${num(x0)}) = ${num(t)}. Un carré n’est jamais négatif.`,
      hint:'Mets le nombre négatif entre parenthèses avant de l’élever au carré.',diag:([w])=>near(w,-t,1e-6)?'carre-neg':null})}
  if(v===1){const x0=pick([-4,-3,-2,-1,1,2,3,4,6]),k=nz(-5,5),b=x0*k,a=nz(-5,5),t=a+k;
    return fsNq({instr:`Calcule f(${num(x0)}).`,prompt:mx(`f(x) = ${num(a)} ${fsS(b)} ${fr(Math.abs(b),'x')}`),labels:[`f(${num(x0)}) =`],t:[t],
      explain:`f(${num(x0)}) = ${num(a)} ${fsS(b)} ${Math.abs(b)} ÷ ${x0<0?`(${num(x0)})`:x0} = ${num(a)} ${k<0?'−':'+'} ${Math.abs(k)} = ${num(t)}.`,
      hint:'Calcule d’abord la fraction, puis ajoute le nombre.',diag:([w])=>near(w,a+b*x0,1e-6)?'calc':near(w,a-k,1e-6)?'signe':null})}
  if(v===2){const x0=-R(2,5),t=x0**3;
    return fsNq({instr:`Calcule f(${num(x0)}).`,prompt:stx('f est la fonction cube :')+mx('f(x) = x<sup>3</sup>'),labels:[`f(${num(x0)}) =`],t:[t],
      explain:`(${num(x0)})³ = (${num(x0)}) × (${num(x0)}) × (${num(x0)}) = ${num(t)} : trois facteurs négatifs donnent un résultat négatif.`,
      hint:'Un nombre négatif au cube reste négatif.',diag:([w])=>near(w,-t,1e-6)?'signe':near(w,3*x0,1e-6)?'puiss':null})}
  const k=R(2,12),x0=k*k;
  return fsNq({instr:`Calcule f(${x0}).`,prompt:stx('f est la fonction racine carrée :')+mx('f(x) = √x'),labels:[`f(${x0}) =`],t:[k],
    explain:`√${x0} = ${k}, car ${k} est positif et ${k}² = ${x0}.`,hint:'Cherche le nombre positif dont le carré vaut ce nombre.',diag:([w])=>near(w,x0/2,1e-6)?'calc':null})};
const gFsRefAnt=()=>{let a,b,y0;do{a=R(-4,5);b=nz(-9,9);y0=R(-6,9)}while(y0===a);const d=y0-a;
  return fsNq({instr:`Calcule l’antécédent de ${num(y0)} par f.`,prompt:mx(`f(x) = ${a?num(a)+' '+fsS(b)+' ':b<0?MINUS:''}${fr(Math.abs(b),'x')}`)+stx('pour x ≠ 0.'),labels:['x ='],t:[b/d],ex:[fsE(b,d)],
    explain:`On résout f(x) = ${num(y0)} : ${num(b)}/x = ${num(y0)} ${a<0?'+':'−'} ${Math.abs(a)} = ${num(d)}, donc x = ${num(b)} ÷ ${d<0?`(${num(d)})`:d} = ${fsQ(b,d)}. Vérifie : f(${fsT(b,d)}) = ${num(y0)}.`,
    hint:'Isole la fraction, puis retourne-la : si b/x = c (c ≠ 0), alors x = b/c.',diag:([w])=>near(w,d/b,1e-6)?'calc':near(w,b/(y0+a),1e-6)?'signe':null})};
const FS_REF=[['carré','x<sup>2</sup>',x=>x*x],['inverse',fr(1,'x'),x=>1/x],['cube','x<sup>3</sup>',x=>x**3],['racine carrée','√x',x=>Math.sqrt(x)]];
const gFsRefCmp=()=>{const i=R(0,3),[nm,ex,f]=FS_REF[i];let u,v,I,inc;
  if(i===0){const neg=Math.random()<.6;u=R(5,30)/10;do v=R(5,30)/10;while(v===u);if(neg){u=-u;v=-v}I=neg?']−∞ ; 0]':'[0 ; +∞[';inc=!neg}
  else if(i===1){const neg=Math.random()<.5;u=R(2,40)/10;do v=R(2,40)/10;while(v===u);if(neg){u=-u;v=-v}I=neg?']−∞ ; 0[':']0 ; +∞[';inc=false}
  else if(i===2){u=R(-30,30)/10;do v=R(-30,30)/10;while(v===u);I='ℝ';inc=true}
  else{u=R(1,90)/10;do v=R(1,90)/10;while(v===u);I='[0 ; +∞[';inc=true}
  const c=f(u)<f(v)?0:1,O=[`f(${num(u)}) &lt; f(${num(v)})`,`f(${num(u)}) &gt; f(${num(v)})`,`f(${num(u)}) = f(${num(v)})`];
  return mcq('Compare sans calculer.',stx(`f est la fonction ${nm} : `)+mx(`f(x) = ${ex}`),O.map((h,j)=>j===c?{h:mx(h),ok:true}:{h:mx(h),tag:'fs-ordre'}),
    `${num(u)} et ${num(v)} sont dans ${I}, où la fonction ${nm} est ${inc?'croissante : elle conserve':'décroissante : elle renverse'} l’ordre. Donc ${O[c]}. Contrôle : f(${num(u)}) ≈ ${dec(f(u),3)} et f(${num(v)}) ≈ ${dec(f(v),3)}.`,
    'Repère l’intervalle où sont les deux nombres, puis le sens de variation de la fonction sur cet intervalle.',true)};
const gFsRefAffA=()=>{const a=pick([-5,-4,-3,-2,-1,1,2,3,4,5]),b=R(-9,9),m=R(-4,6);let n;do n=R(-4,6);while(n===m);const p=a*m+b,q=a*n+b;
  return fsNq({instr:'Calcule le coefficient directeur a.',prompt:stx(`f est une fonction affine telle que f(${num(m)}) = ${num(p)} et f(${num(n)}) = ${num(q)}.`),labels:['a ='],t:[a],
    explain:`a = (f(${num(m)}) − f(${num(n)})) ÷ (${num(m)} − ${n<0?`(${num(n)})`:n}) = ${num(p-q)} ÷ ${num(m-n)} = ${num(a)}.`,
    hint:'a = (f(m) − f(n)) ÷ (m − n) : l’écart des images divisé par l’écart des abscisses.',diag:([w])=>(Math.abs(a)>1&&near(w,1/a,1e-6))||near(w,-a,1e-6)?'fs-coefdir':null})};
const gFsRefAffX=()=>{const a=nz(-5,5),b=R(-9,9),m=R(-3,5);let n;do n=R(-3,5);while(n===m);const p=a*m+b,q=a*n+b;
  return exprQ('Détermine l’expression de la fonction affine f.',stx(`f est affine, f(${num(m)}) = ${num(p)} et f(${num(n)}) = ${num(q)}.`),'f(x) =',poly([a,b]),
    `a = (${num(p)} − ${q<0?`(${num(q)})`:q}) ÷ (${num(m)} − ${n<0?`(${num(n)})`:n}) = ${num(a)}. Puis f(${num(n)}) = ${num(q)} donne ${num(a)} × ${n<0?`(${num(n)})`:n} + b = ${num(q)}, soit b = ${num(b)}. Donc f(x) = ${fsLin(a,b)}.`,
    'Calcule d’abord a avec les accroissements, puis b avec l’un des deux points.',true,([u])=>eqv(u,poly([b,a]))?'calc':eqv(u,poly([-a,b]))?'fs-coefdir':null)};
const gFsRefDom=()=>{let a,b,c,d;do{a=nz(-5,5);b=R(-9,9);c=nz(-4,4);d=R(-9,9)}while(a*d-b*c===0);
  return fsNq({instr:'Quelle valeur de x est interdite ?',prompt:fsFx(`(${poly([a,b])})/(${poly([c,d])})`),labels:['x ='],t:[-d/c],ex:[fsE(-d,c)],
    explain:`Le dénominateur ne doit pas s’annuler : ${M(poly([c,d]))} = 0 ⟺ x = ${fsQ(-d,c)}. L’ensemble de définition est ]−∞ ; ${fsQ(-d,c)}[ ∪ ]${fsQ(-d,c)} ; +∞[.`,
    hint:'Résous « dénominateur = 0 ».',diag:([w])=>d&&near(w,d/c,1e-6)?'signe':near(w,-b/a,1e-6)?'domaine':null})};
const gFsRefPos=()=>{const x0=pick([.2,.3,.5,.6,.8,.9,1,1.5,2,2.5,3]),c=x0<1?0:x0>1?1:3,O=['x<sup>3</sup> &lt; x<sup>2</sup> &lt; x','x &lt; x<sup>2</sup> &lt; x<sup>3</sup>','x<sup>2</sup> &lt; x &lt; x<sup>3</sup>','x = x<sup>2</sup> = x<sup>3</sup>'];
  return mcq('Range x, x² et x³ dans l’ordre croissant.',mx(`x = ${num(x0)}`),O.map((h,j)=>j===c?{h:mx(h),ok:true}:{h:mx(h),tag:'fs-ordre'}),
    `${c===3?'Pour x = 1, les trois valent 1.':c===0?'Entre 0 et 1, multiplier par x fait diminuer :':'Au-delà de 1, multiplier par x fait augmenter :'} x = ${num(x0)}, x² = ${dec(x0*x0,4)}, x³ = ${dec(x0**3,4)}. ${c===0?'La courbe de x³ est sous celle de x², elle-même sous la droite y = x.':c===1?'La courbe de x³ est au-dessus de celle de x², elle-même au-dessus de y = x.':''}`,
    'Compare x à 1 : multiplier par un nombre entre 0 et 1 fait diminuer.',true)};
const gFsRefVar=()=>{const v=R(0,3),a=R(2,9),b=R(-9,9);let e,c;
  if(v===0){e=`${num(b)} − ${a}x`;c=1}else if(v===1){e=`${a}x ${fsS(b)} ${Math.abs(b)}`;c=0}else if(v===2){e=pick(['−x','−x + 1']);c=1}else{e=`${num(b)}`;c=2}
  const O=['Croissante sur ℝ','Décroissante sur ℝ','Constante sur ℝ'];
  return mcq('Quel est le sens de variation de f ?',mx(`f(x) = ${e}`),O.map((h,j)=>j===c?{h,ok:true}:{h,tag:'signe'}),
    `On écrit f(x) = ax + b : ${['a = '+a+' &gt; 0, donc f est croissante.','a = −'+a+' &lt; 0 (le coefficient de x, pas le premier nombre écrit), donc f est décroissante.','a = −1 &lt; 0, donc f est décroissante.','a = 0 : f est constante.'][[1,0,2,3][v]]}`,
    'Repère le coefficient de x, avec son signe : c’est lui qui décide.',true)};
/* raisonnements */
const gFsRefR1=()=>{const a=R(2,9),b=R(1,6);let k;do k=R(1,9);while(k===a);const c=b+k;
  return chain({instr:'Résous l’inéquation pour x > 0, en construisant ton raisonnement.',prompt:mx(`${fr(a,'x')} + ${b} &lt; ${c}`)+stx(' avec x &gt; 0.'),
    steps:[
      {q:'D’abord, on isole le terme qui contient x :',o:[
        {h:mx(`${fr(a,'x')} &lt; ${k}`),ok:true,K:k,s:'<'},
        {h:mx(`${fr(a,'x')} &lt; ${c+b}`),K:c+b,s:'<',why:`On retire ${b} des deux côtés : ${c} − ${b} = ${k}. On n’ajoute pas.`,tag:'signe'},
        {h:mx(`${fr(a,'x')} &gt; ${k}`),K:k,s:'>',why:'Soustraire un même nombre des deux côtés ne change jamais le sens de l’inégalité.',tag:'ineq-flip'}]},
      {q:'On passe à l’inverse (tous les nombres en jeu sont positifs) :',o:prev=>{const{K,s}=prev[0],fl=s==='<'?'&gt;':'&lt;',sa=s==='<'?'&lt;':'&gt;';
        return[{h:mx(`x ${fl} ${fsQ(a,K)}`),ok:true,s:fl,V:[a,K]},
          {h:mx(`x ${sa} ${fsQ(a,K)}`),s:sa,V:[a,K],why:'Sur ]0 ; +∞[, la fonction inverse est décroissante : elle renverse l’ordre, le sens de l’inégalité doit changer.',tag:'fs-ordre'},
          {h:mx(`x ${fl} ${fsQ(K,a)}`),s:fl,V:[K,a],why:`De ${a}/x ${sa} ${K}, on tire 1/x ${sa} ${K}/${a}, puis x ${fl} ${a}/${K} : c’est toute la fraction qui se retourne.`,tag:'calc'}]}},
      {q:'L’ensemble des solutions est :',o:prev=>{const{s,V}=prev[1],v=fsQ(V[0],V[1]),gt=s==='&gt;';
        return[{h:mx(gt?`]${v} ; +∞[`:`]0 ; ${v}[`),ok:true},
          {h:mx(gt?`[${v} ; +∞[`:`]0 ; ${v}]`),why:'L’inégalité est stricte : la borne n’est pas solution, le crochet doit être tourné vers l’extérieur.',tag:'bracket'},
          {h:mx(gt?`]0 ; ${v}[`:`]${v} ; +∞[`),why:'Tu as gardé la mauvaise partie de la droite : relis le sens de l’inégalité obtenue.',tag:'ineq-flip'}]}}],
    explain:`${a}/x + ${b} &lt; ${c} ⟺ ${a}/x &lt; ${k} ⟺ 1/x &lt; ${k}/${a}. Sur ]0 ; +∞[, la fonction inverse est décroissante et renverse l’ordre : x &gt; ${fsT(a,k)}. S = ]${fsQ(a,k)} ; +∞[.`})};
const gFsRefR2=()=>{const A=pick([-5,-4,-3,-2,2,3,4,5]),b=R(-9,9),m=R(-3,6);let n;do n=pick([-3,-2,-1,2,3,4,5,6]);while(n===m);const p=A*m+b,q=A*n+b;
  const P=v=>v<0?`(${num(v)})`:num(v);
  return chain({instr:'Détermine la fonction affine f, en construisant ton raisonnement.',prompt:stx(`f est affine, f(${num(m)}) = ${num(p)} et f(${num(n)}) = ${num(q)}. On cherche a et b tels que f(x) = ax + b.`),
    steps:[
      {q:'Le coefficient directeur se calcule par :',o:[
        {h:mx(`a = ${fr(`f(${num(m)}) − f(${num(n)})`,`${num(m)} − ${P(n)}`)}`),ok:true,a:new Fr(A)},
        {h:mx(`a = ${fr(`${num(m)} − ${P(n)}`,`f(${num(m)}) − f(${num(n)})`)}`),a:new Fr(1,A),why:'C’est l’inverse : on divise l’écart des images (vertical) par l’écart des abscisses (horizontal).',tag:'fs-coefdir'},
        {h:mx(`a = ${fr(`f(${num(m)}) − f(${num(n)})`,`${P(n)} − ${num(m)}`)}`),a:new Fr(-A),why:'Le numérateur et le dénominateur doivent être pris dans le même ordre, sinon le signe s’inverse.',tag:'fs-coefdir'}]},
      {q:'Donc a vaut :',o:prev=>[new Fr(A),new Fr(1,A),new Fr(-A)].map((f,i)=>({h:mx('a = '+fsFH(f)),a:f,ok:f.n===prev[0].a.n&&f.d===prev[0].a.d,
        why:['C’est la vraie valeur de a, mais elle ne découle pas de la formule choisie à l’étape précédente.','Tu as divisé l’écart des abscisses par l’écart des images : c’est l’inverse du coefficient directeur.','Erreur de signe : écarts pris dans des ordres différents.'][i],tag:'fs-coefdir'}))},
      {q:`On trouve b avec f(${num(n)}) = ${num(q)} :`,o:prev=>{const a=prev[1].a,an=a.mul(new Fr(n)),B=new Fr(q).sub(an),aP=a.n<0?`(${fsFH(a)})`:fsFH(a);
        return[{h:mx(`b = ${num(q)} − ${aP} × ${P(n)} = ${fsFH(B)}`),ok:true,b:B,a},
          {h:mx(`b = ${num(q)} + ${aP} × ${P(n)} = ${fsFH(new Fr(q).add(an))}`),b:new Fr(q).add(an),a,why:`a × ${P(n)} + b = ${num(q)} : on retire a × ${P(n)} des deux côtés, on ne l’ajoute pas.`,tag:'signe'},
          {h:mx(`b = ${num(q)} − ${aP} = ${fsFH(new Fr(q).sub(a))}`),b:new Fr(q).sub(a),a,why:`Il faut multiplier a par l’abscisse ${num(n)} : f(${num(n)}) = a × ${P(n)} + b.`,tag:'calc'}]}},
      {q:'Conclusion :',o:prev=>{const{a,b:B}=prev[2];return[{h:fsLin(a,B),ok:true},{h:fsLin(B,a),why:'a est le coefficient de x et b la constante : tu les as échangés.',tag:'calc'},
        {h:fsLin(a,B.neg()),why:'Le signe de b a changé en route : reprends la valeur trouvée.',tag:'signe'}]}}],
    explain:`a = (${num(p)} − ${P(q)}) ÷ (${num(m)} − ${P(n)}) = ${num(A)}. Puis ${num(A)} × ${P(n)} + b = ${num(q)}, donc b = ${num(b)}. f(x) = ${fsLin(A,b)}. Vérification : f(${num(m)}) = ${num(p)}.`})};
const gFsRefR3=()=>{const k=R(2,9),K=k*k,s=pick(['≤','&lt;','≥','&gt;']),le=s==='≤'||s==='&lt;',st=s==='&lt;'||s==='&gt;';
  const L=st?']':'[',Rb=st?'[':']',ok=le?`${L}−${k} ; ${k}${Rb}`:`]−∞ ; −${k}${Rb} ∪ ${L}${k} ; +∞[`;
  const root=le?`]−∞ ; ${k}${Rb}`:`${L}${k} ; +∞[`,comp=le?`]−∞ ; −${k}${st?']':'['} ∪ ${st?'[':']'}${k} ; +∞[`:`${st?'[':']'}−${k} ; ${k}${st?']':'['}`,
    brk=le?`${st?'[':']'}−${k} ; ${k}${st?']':'['}`:`]−∞ ; −${k}${st?']':'['} ∪ ${st?'[':']'}${k} ; +∞[`;
  return chain({instr:'Résous l’inéquation sur ℝ, en construisant ton raisonnement.',prompt:mx(`x<sup>2</sup> ${s} ${K}`),
    steps:[
      {q:'Quelle méthode est correcte ?',o:[
        {h:`Tout passer à gauche et factoriser : ${mx(`x<sup>2</sup> − ${K} = (x − ${k})(x + ${k})`)}`,ok:true},
        {h:`Prendre la racine des deux côtés : ${mx(`x ${s} ${k}`)}`,why:`La fonction carré n’est pas monotone sur ℝ : par exemple x = −${k+5} vérifie x ≤ ${k}, mais (−${k+5})² = ${(k+5)**2} &gt; ${K}.`,tag:'fs-carre'},
        {h:`Diviser les deux côtés par x : ${mx(`x ${s} ${fr(K,'x')}`)}`,why:'x peut être négatif ou nul : diviser par x est interdit tant qu’on ne connaît pas son signe.',tag:'ineq-flip'}]},
      {q:`Signe du produit ${mx(`(x − ${k})(x + ${k})`)} :`,o:[
        {h:`Négatif entre −${k} et ${k}, positif à l’extérieur`,ok:true},
        {h:`Positif entre −${k} et ${k}, négatif à l’extérieur`,why:`Teste x = 0 : (0 − ${k})(0 + ${k}) = −${K} &lt; 0. Le trinôme est du signe de a = 1 à l’extérieur des racines.`,tag:'fs-signe-tri'},
        {h:`Positif dès que x &gt; −${k}`,why:`Pour −${k} &lt; x &lt; ${k}, le facteur x − ${k} est négatif : le produit est négatif.`,tag:'signe'}]},
      {q:'L’ensemble des solutions est :',o:[
        {h:mx(ok),ok:true},
        {h:mx(root),why:`C’est le résultat de « la racine des deux côtés » : il oublie les nombres négatifs (x = −${k+5} par exemple).`,tag:'fs-carre'},
        {h:mx(comp),why:'Tu as gardé la zone où le produit a le mauvais signe.',tag:'fs-signe-tri'},
        {h:mx(brk),why:st?'Inégalité stricte : ±'+k+' (où x² = '+K+') ne sont pas solutions.':'Inégalité large : ±'+k+' (où x² = '+K+') sont solutions, crochets fermés.',tag:'bracket'}]}],
    explain:`x² ${s} ${K} ⟺ (x − ${k})(x + ${k}) ${s} 0. Le produit est négatif entre −${k} et ${k}, positif à l’extérieur. Donc S = ${ok}.`})};

/* ===================== Chapitre fs-d23 : second degré ===================== */
const fsCan=(a,al,be)=>mx(`f(x) = ${a===1?'':a===-1?MINUS:num(a)}(${fsXa(-al)})<sup>2</sup>${be?` ${fsS(be)} ${Math.abs(be)}`:''}`);
const gFsD2Som=()=>{const a=pick([-3,-2,-1,1,2,3]),al=nz(-6,6),be=R(-9,9);
  return fsNq({instr:'Donne les coordonnées (α ; β) du sommet de la parabole.',prompt:fsCan(a,al,be),labels:['α =','β ='],t:[al,be],
    explain:`La forme canonique a(x − α)² + β se lit directement : ${fsXa(-al)} = x − (${num(al)}), donc α = ${num(al)} et β = ${num(be)}. Le sommet est (${num(al)} ; ${num(be)}), c’est un ${a>0?'minimum':'maximum'} car a ${a>0?'&gt;':'&lt;'} 0.`,
    hint:'Dans a(x − α)² + β, attention au signe : x + 3 = x − (−3).',diag:([u])=>near(u,-al,1e-6)?'fs-sommet':null})};
const gFsD2Ext=()=>{const a=pick([-3,-2,-1,1,2,3]),al=nz(-6,6);let be;do be=nz(-9,9);while(Math.abs(be)===Math.abs(al));const mn=a>0?'minimum':'maximum',ot=a>0?'maximum':'minimum';
  return mcq('Que peut-on dire de f ?',fsCan(a,al,be),[{h:`f admet un ${mn} égal à ${num(be)}, atteint en x = ${num(al)}`,ok:true},
    {h:`f admet un ${ot} égal à ${num(be)}, atteint en x = ${num(al)}`,tag:'signe'},{h:`f admet un ${mn} égal à ${num(be)}, atteint en x = ${num(-al)}`,tag:'fs-sommet'},
    {h:`f admet un ${mn} égal à ${num(al)}, atteint en x = ${num(be)}`,tag:'fs-sommet'}],
    `Un carré est positif ou nul : ${a}(${fsXa(-al)})² est ${a>0?'≥':'≤'} 0 et vaut 0 en x = ${num(al)}. Donc f(x) ${a>0?'≥':'≤'} ${num(be)} = f(${num(al)}) : ${mn} ${num(be)} en ${num(al)} (a ${a>0?'&gt;':'&lt;'} 0).`,
    'Le signe de a dit si la parabole est tournée vers le haut (minimum) ou vers le bas (maximum).')};
const gFsD2Can=()=>{const a=pick([2,3,-1,-2]),al=nz(-5,5),be=R(-12,12),b=-2*a*al,c=a*al*al+be;
  return fsNq({instr:'Écris f sous forme canonique a(x − α)² + β : donne α et β.',prompt:fsFx(poly([a,b,c])),labels:['α =','β ='],t:[al,be],
    explain:`f(x) = ${num(a)}[x² ${fsS(b/a)} ${Math.abs(b/a)}x] ${fsS(c)} ${Math.abs(c)}. Or x² ${fsS(b/a)} ${Math.abs(b/a)}x = (${fsXa(-al)})² − ${al*al}. Donc f(x) = ${num(a)}(${fsXa(-al)})² ${fsS(-a*al*al)} ${Math.abs(a*al*al)} ${fsS(c)} ${Math.abs(c)} = ${num(a)}(${fsXa(-al)})² ${fsS(be)} ${Math.abs(be)}. Contrôle : α = −b/(2a) = ${num(al)} et β = f(α) = ${num(be)}.`,
    hint:'α = −b ÷ (2a), puis β = f(α).',diag:([u,v])=>near(u,-al,1e-6)?'fs-sommet':near(v,c,1e-6)?'calc':null})};
const gFsD2Rac=()=>{let a,b,c,rs;do{const a0=pick([1,1,2,3]),p=nz(-7,7),r=nz(-6,6),sg0=pick([1,-1]);a=sg0*a0;b=-sg0*(a0*r+p);c=sg0*p*r;rs=fsRoots(a,b,c)}while(rs.length!==2);
  const ex=rs.map(o=>{const f=new Fr(Math.round(o.v*600),600);return fsE(f.n,f.d)});
  return fsNq({instr:'Résous l’équation (x₁ < x₂).',prompt:M(poly([a,b,c]))+mx(' = 0'),labels:['x₁ =','x₂ ='],t:rs.map(o=>o.v),ex,
    explain:`a = ${num(a)}, b = ${num(b)}, c = ${num(c)}. Δ = b² − 4ac = ${b*b} ${fsS(-4*a*c)} ${Math.abs(4*a*c)} = ${rs.D} &gt; 0, √Δ = ${Math.round(Math.sqrt(rs.D))}. x = (−b ± √Δ) ÷ (2a) donne x₁ = ${rs[0].t} et x₂ = ${rs[1].t}.`,
    hint:'Δ = b² − 4ac, puis x = (−b ± √Δ) ÷ (2a). Range les solutions dans l’ordre croissant.',diag:([u,v])=>near(u,-rs[1].v,1e-6)||near(v,-rs[0].v,1e-6)?'fs-delta':null})};
const gFsD2SP=()=>{let a,r,p;do{a=pick([-3,-2,2,3,4]);r=pick([1,-1,2]);p=nz(-6,6)}while(p===a*r);const b=-(a*r+p),c=r*p;
  return fsNq({instr:`Vérifie que ${num(r)} est racine, puis trouve l’autre racine x₂ grâce au produit des racines.`,prompt:fsFx(poly([a,b,c])),labels:['x₂ ='],t:[p/a],ex:[fsE(p,a)],
    explain:`f(${num(r)}) = 0, donc ${num(r)} est racine. Le produit des racines vaut P = c/a = ${num(c)}/${num(a)}. Donc ${num(r)} × x₂ = ${fsQ(c,a)}, soit x₂ = ${fsQ(p,a)}. (Contrôle avec la somme : −b/a = ${fsQ(-b,a)} = ${num(r)} + ${fsQ(p,a)}.)`,
    hint:'Produit des racines : P = c/a. Somme : S = −b/a.',diag:([w])=>near(w,c/a,1e-6)&&r!==1?'calc':near(w,-p/a,1e-6)?'signe':null})};
const fsXr=f=>`(x ${f.n<0?'+':'−'} ${fsFH(new Fr(Math.abs(f.n),f.d))})`;
const gFsD2Fac=()=>{if(Math.random()<.25){const q=pick([2,3]),a=q*q,p=nz(-5,5),r=new Fr(p,q);if(r.d===1)return gFsD2Fac();
    return mcq('Quelle est la forme factorisée ?',M(poly([a,-2*q*p,p*p])),[{h:mx(`${a}${fsXr(r)}<sup>2</sup>`),ok:true},{h:mx(`${fsXr(r)}<sup>2</sup>`),tag:'fs-delta'},
      {h:mx(`${a}${fsXr(r.neg())}<sup>2</sup>`),tag:'signe'},{h:mx(`${a}${fsXr(r)}${fsXr(r.neg())}`),tag:'fs-delta'}],
      `Δ = ${(2*q*p)**2} − 4 × ${a} × ${p*p} = 0 : une racine double x₀ = −b/(2a) = ${fsT(p,q)}. Donc f(x) = a(x − x₀)² = ${a}${fsXr(r)}².`,'Si Δ = 0 : f(x) = a(x − x₀)². N’oublie pas le coefficient a.')}
  let a,r1,p,r2;do{a=pick([2,3,4,-2]);r1=nz(-6,6);p=nz(-6,6);r2=new Fr(p,a)}while(r2.d===1||r2.val()===r1);
  const b=-(a*r1+p),c=r1*p,R1=new Fr(r1);
  return mcq('Quelle est la forme factorisée ?',M(poly([a,b,c])),[{h:mx(`${num(a)}${fsXr(R1)}${fsXr(r2)}`),ok:true},{h:mx(`${fsXr(R1)}${fsXr(r2)}`),tag:'fs-delta'},
    {h:mx(`${num(a)}${fsXr(R1.neg())}${fsXr(r2.neg())}`),tag:'signe'},{h:mx(`${num(a)}${fsXr(R1)}${fsXr(r2.neg())}`),tag:'signe'}],
    `Δ = ${b*b-4*a*c} &gt; 0 ; les racines sont ${num(r1)} et ${fsT(p,a)}. Donc f(x) = a(x − x₁)(x − x₂) = ${num(a)}${fsXr(R1)}${fsXr(r2)}.`,'f(x) = a(x − x₁)(x − x₂) : garde le coefficient a et soigne les signes.')};
const gFsD2Ineq=()=>{const r1=R(-6,4),r2=R(r1+1,6),a=pick([1,-1,2,-2]),s=pick(['&lt;','&gt;','≤','≥']),neg=s==='&lt;'||s==='≤',st=s==='&lt;'||s==='&gt;';
  const between=(a>0)===neg,bet=fsInt(num(r1),num(r2),!st,!st),out=`]−∞ ; ${num(r1)}${st?'[':']'} ∪ ${st?']':'['}${num(r2)} ; +∞[`;
  const okS=between?bet:out,wr=between?out:bet,br=between?fsInt(num(r1),num(r2),st,st):`]−∞ ; ${num(r1)}${st?']':'['} ∪ ${st?'[':']'}${num(r2)} ; +∞[`,
    sg=between?fsInt(num(-r2),num(-r1),!st,!st):`]−∞ ; ${num(-r2)}${st?'[':']'} ∪ ${st?']':'['}${num(-r1)} ; +∞[`;
  return mcq('Résous l’inéquation.',M(poly([a,-a*(r1+r2),a*r1*r2]))+mx(` ${s} 0`),[{h:mx(okS),ok:true},{h:mx(wr),tag:'fs-signe-tri'},{h:mx(br),tag:'bracket'},{h:mx(sg),tag:'signe'}],
    `Les racines sont ${num(r1)} et ${num(r2)} (forme factorisée ${num(a)}(${fsXa(-r1)})(${fsXa(-r2)})). Le trinôme est du signe de a = ${num(a)} à l’extérieur des racines et du signe contraire entre elles. On veut qu’il soit ${neg?'négatif':'positif'}${st?' strictement':' ou nul'} : S = ${okS}.`,
    'Cherche les racines, puis applique la règle : signe de a à l’extérieur des racines.')};
const gFsD2Det=()=>{const r1=R(-5,3),r2=R(r1+1,6);let x0;do x0=R(-4,7);while(x0===r1||x0===r2);const P=(x0-r1)*(x0-r2),y0=nz(-9,9);
  return fsNq({instr:'Détermine le coefficient a.',prompt:stx(`f est une fonction polynôme du second degré qui s’annule en ${num(r1)} et ${num(r2)}, et f(${num(x0)}) = ${num(y0)}.`),labels:['a ='],t:[y0/P],ex:[fsE(y0,P)],
    explain:`f s’annule en ${num(r1)} et ${num(r2)}, donc f(x) = a(${fsXa(-r1)})(${fsXa(-r2)}). Avec x = ${num(x0)} : a × ${num(x0-r1)} × ${num(x0-r2)} = ${num(y0)}, soit a × ${num(P)} = ${num(y0)} et a = ${fsQ(y0,P)}.`,
    hint:'Écris f(x) = a(x − x₁)(x − x₂), puis utilise le point connu.',diag:([w])=>near(w,P/y0,1e-6)?'calc':near(w,y0/((x0+r1)*(x0+r2)),1e-6)?'signe':null})};
/* raisonnements second degré */
const gFsD2R1=()=>{let a,b,c;const ty=Math.random();
  do{if(ty<.7){const a0=pick([1,2,3]),p=nz(-6,6),r=nz(-5,5),g=pick([1,-1]);a=g*a0;b=-g*(a0*r+p);c=g*p*r}
    else if(ty<.85){const q=pick([1,2,3]),p=nz(-5,5),g=pick([1,-1]);a=g*q*q;b=-g*2*q*p;c=g*p*p}
    else{a=pick([1,2,3,-1,-2]);b=nz(-6,6);c=Math.sign(a)*(Math.floor(b*b/(4*Math.abs(a)))+R(1,5))}}while(!b||!c||a===c);
  const S=(A,B,C)=>mx(`a = ${num(A)}, b = ${num(B)}, c = ${num(C)}`),txt=rs=>!rs.length?'Aucune solution réelle':rs.length===1?`Une solution : x₀ = ${rs[0].t}`:`x₁ = ${rs[0].t} et x₂ = ${rs[1].t}`;
  const T=fsRoots(a,b,c);
  return chain({instr:'Résous l’équation, en construisant ton raisonnement.',prompt:M(poly([a,b,c]))+mx(' = 0'),
    steps:[
      {q:'On lit les coefficients :',o:[{h:S(a,b,c),ok:true,A:a,B:b,C:c},
        {h:S(a,-b,c),A:a,B:-b,C:c,why:`Le signe fait partie du coefficient : b = ${num(b)}.`,tag:'signe'},
        {h:S(c,b,a),A:c,B:b,C:a,why:'a est le coefficient de x² et c le terme constant (sans x).',tag:'calc'}]},
      {q:'On calcule le discriminant :',o:prev=>{const{A,B,C}=prev[0];return[{h:mx(`Δ = ${num(B*B-4*A*C)}`),ok:true,D:B*B-4*A*C},
        {h:mx(`Δ = ${num(B*B+4*A*C)}`),D:B*B+4*A*C,why:'Δ = b² − 4ac : avec a et c, attention au signe de −4ac.',tag:'delta-formula'},
        {h:mx(`Δ = ${num(B*B-2*A*C)}`),D:B*B-2*A*C,why:'Le coefficient est 4ac. Le 2a apparaît dans la formule des racines, pas dans Δ.',tag:'fs-delta'}]}},
      {q:'Nombre de solutions réelles :',o:prev=>{const D=prev[1].D,k=D>0?0:D===0?1:2;return['Deux solutions','Une seule solution','Aucune solution réelle'].map((h,i)=>({h,ok:i===k,
        why:`Avec Δ = ${num(D)} : Δ &gt; 0 donne deux solutions, Δ = 0 une seule, Δ &lt; 0 aucune.`,tag:'fs-delta'}))}},
      {q:'Les solutions sont :',o:prev=>{const{A,B}=prev[0],D=prev[1].D,o=[];
        if(D>=0){o.push({h:txt(fsRG(-B,D,2*A)),ok:true},{h:txt(fsRG(B,D,2*A)),why:'La formule commence par −b, pas par b.',tag:'fs-delta'},{h:txt(fsRG(-B,D,A)),why:'On divise par 2a, pas par a.',tag:'fs-delta'},
          {h:'Aucune solution réelle',why:`Δ = ${num(D)} ≥ 0 : il y a des solutions.`,tag:'fs-delta'})}
        else o.push({h:'Aucune solution réelle',ok:true},{h:txt(fsRG(-B,-D,2*A)),why:'Δ &lt; 0 : √Δ n’existe pas, on ne peut pas utiliser √|Δ|.',tag:'fs-delta'},{h:txt(fsRG(B,-D,2*A)),why:'Δ &lt; 0 : un carré ne peut pas être négatif, pas de solution.',tag:'fs-delta'});
        return o}}],
    explain:`a = ${num(a)}, b = ${num(b)}, c = ${num(c)}, Δ = ${num(T.D)}. ${T.D<0?'Δ &lt; 0 : aucune solution réelle.':T.D===0?`Δ = 0 : une solution x₀ = −b/(2a) = ${T[0].t}.`:`Δ &gt; 0 : x = (−b ± √Δ)/(2a), soit ${T[0].t} et ${T[1].t}.`}`})};
const fsSetOpts=(rs,T,s,rule)=>{/* s : '<' ou '>' ; rule : 'neg' (négatif entre), 'pos' (positif entre), 'plus' (positif ou nul partout) */
  const rr=rs.length===2?rs:T,R1=rr[0].t,R2=rr[1].t,bet=`]${R1} ; ${R2}[`,out=`]−∞ ; ${R1}[ ∪ ]${R2} ; +∞[`,lt=s==='<';
  let ok;if(rule==='plus')ok=lt?'∅':rs.length===1?`]−∞ ; ${rs[0].t}[ ∪ ]${rs[0].t} ; +∞[`:'ℝ';else ok=(rule==='neg')===lt?bet:out;
  const C=[[ok,null],[bet,'Entre les racines, le trinôme est du signe contraire de a.'],[out,'À l’extérieur des racines, le trinôme est du signe de a.'],[lt?'∅':'ℝ','Le trinôme change de signe : l’ensemble n’est ni vide ni ℝ tout entier.'],
    [`[${R1} ; ${R2}]`,'Inégalité stricte : les racines (où le trinôme vaut 0) sont exclues.']],seen=new Set,o=[];
  C.forEach(([h,why],i)=>{if(seen.has(h)||o.length>=4)return;seen.add(h);o.push(i?{h:mx(h),why,tag:i===4?'bracket':'fs-signe-tri'}:{h:mx(h),ok:true})});return o};
const fsRuleOpts=(rs,a)=>{const k=rs.length===2?0:2;return[['Négatif entre les racines, positif à l’extérieur','neg'],['Positif entre les racines, négatif à l’extérieur','pos'],['Positif ou nul pour tout x','plus']].map(([h,c],i)=>({h,c,ok:i===k,
  why:i===k?'':rs.length===2?'Le trinôme est du signe de a = 1 à l’extérieur des racines, du signe contraire entre elles.':'Sans deux racines distinctes, le trinôme garde le signe de a = 1 (il peut seulement s’annuler).',tag:'fs-signe-tri'}))};
const gFsD2R2=()=>{const r1=R(-6,4),r2=R(r1+1,6),m=nz(-5,5),n=nz(-6,6),Tb=-(r1+r2),Tc=r1*r2,s=pick(['<','>']),sh=s==='<'?'&lt;':'&gt;',T=fsRoots(1,Tb,Tc);
  return chain({instr:'Résous l’inéquation, en construisant ton raisonnement.',prompt:M(poly([1,Tb+m,Tc+n]))+mx(` ${sh} `)+M(poly([m,n])),
    steps:[
      {q:'On rassemble tout dans le membre de gauche :',o:[
        {h:M(poly([1,Tb,Tc]))+mx(` ${sh} 0`),ok:true,cs:[1,Tb,Tc]},
        {h:M(poly([1,Tb+2*m,Tc+2*n]))+mx(` ${sh} 0`),cs:[1,Tb+2*m,Tc+2*n],why:'Faire passer un terme de l’autre côté, c’est le soustraire des deux membres : son signe change.',tag:'signe'},
        {h:M(poly([1,Tb,Tc+2*n]))+mx(` ${sh} 0`),cs:[1,Tb,Tc+2*n],why:`Le terme en x est bien passé, mais pas la constante : ${num(n)} doit être soustrait.`,tag:'signe'}]},
      {q:'Racines du trinôme obtenu :',o:prev=>fsRootOpts(...prev[0].cs)},
      {q:'Signe du trinôme (a = 1 > 0) :',o:prev=>fsRuleOpts(prev[1].rs)},
      {q:'L’ensemble des solutions est :',o:prev=>fsSetOpts(prev[1].rs,T,s,prev[2].c)}],
    explain:`On se ramène à ${M(poly([1,Tb,Tc]))} ${sh} 0. Δ = ${T.D}, racines ${num(r1)} et ${num(r2)}. Le trinôme (a = 1 &gt; 0) est négatif entre les racines, positif à l’extérieur. S = ${s==='<'?`]${num(r1)} ; ${num(r2)}[`:`]−∞ ; ${num(r1)}[ ∪ ]${num(r2)} ; +∞[`}.`})};
const gFsD2R3=()=>{const r1=R(-3,4),r2=R(r1+1,7),m=nz(-4,4),n=nz(-6,6),be=r1+r2+m,ga=-r1*r2+n,T=fsRoots(-1,r1+r2,-r1*r2);
  return chain({instr:'Étudie la position relative des deux courbes, en construisant ton raisonnement.',prompt:fsFx(poly([-1,be,ga]))+stx(' et ')+fsFx(poly([m,n]),'g'),
    steps:[
      {q:'Pour comparer les courbes C<sub>f</sub> et C<sub>g</sub>, on étudie :',o:[{h:'le signe de f(x) − g(x)',ok:true},
        {h:'le signe de f(x), puis celui de g(x)',why:'Deux nombres positifs peuvent être rangés dans n’importe quel ordre : seul le signe de la différence compare f(x) et g(x).',tag:'raisonnement'},
        {h:'les variations de f et de g',why:'Une courbe peut monter plus vite sans être au-dessus : la position dépend du signe de f(x) − g(x).',tag:'raisonnement'}]},
      {q:'f(x) − g(x) =',o:[{h:M(poly([-1,r1+r2,-r1*r2])),ok:true,cs:[-1,r1+r2,-r1*r2]},
        {h:M(poly([-1,be+m,ga+n])),cs:[-1,be+m,ga+n],why:'On soustrait toute l’expression de g : −(mx + n) = −mx − n.',tag:'signe'},
        {h:M(poly([-1,be-m,ga+n])),cs:[-1,be-m,ga+n],why:`La constante de g doit aussi être soustraite : ${num(ga)} − ${n<0?`(${num(n)})`:n}.`,tag:'signe'}]},
      {q:'Racines de f(x) − g(x) :',o:prev=>fsRootOpts(...prev[1].cs)},
      {q:'Conclusion (a = −1 < 0) :',o:prev=>{const rs=prev[2].rs,rr=rs.length===2?rs:T,I=`[${rr[0].t} ; ${rr[1].t}]`,k=rs.length===2?0:2;
        return[`C<sub>f</sub> est au-dessus de C<sub>g</sub> sur ${I}, en dessous ailleurs`,`C<sub>f</sub> est en dessous de C<sub>g</sub> sur ${I}, au-dessus ailleurs`,'C<sub>f</sub> est en dessous de C<sub>g</sub> sur ℝ'].map((h,i)=>({h:mx(h),ok:i===k,
          why:k===0?'a = −1 &lt; 0 : f(x) − g(x) est négatif à l’extérieur des racines et positif entre elles.':'Sans deux racines, f(x) − g(x) garde le signe de a = −1 : négatif (ou nul).',tag:'fs-signe-tri'}))}}],
    explain:`f(x) − g(x) = ${M(poly([-1,r1+r2,-r1*r2]))}, de racines ${num(r1)} et ${num(r2)}. Avec a = −1 &lt; 0, la différence est positive entre les racines : C<sub>f</sub> est au-dessus de C<sub>g</sub> sur [${num(r1)} ; ${num(r2)}] et en dessous ailleurs.`})};

/* ===================== Chapitre fs-der : dérivation ===================== */
const gFsDerLect=()=>{const a=R(-3,4),ya=R(-5,6),m=nz(-4,4),d=R(1,3);
  return fsNq({instr:`Que vaut f′(${num(a)}) ?`,prompt:stx(`La tangente à la courbe de f au point A(${num(a)} ; ${num(ya)}) passe aussi par le point B(${num(a+d)} ; ${num(ya+m*d)}).`),labels:[`f′(${num(a)}) =`],t:[m],
    explain:`f′(${num(a)}) est la pente de la tangente : (y<sub>B</sub> − y<sub>A</sub>) ÷ (x<sub>B</sub> − x<sub>A</sub>) = ${num(m*d)} ÷ ${d} = ${num(m)}.`,
    hint:'Le nombre dérivé est la pente de la tangente : « on avance de 1, on monte de f′(a) ».',diag:([w])=>near(w,ya,1e-6)?'tangente':d>1&&near(w,m*d,1e-6)?'taux':null})};
const gFsDerUs=()=>{const n=R(2,7),a=nz(-9,9),k=R(2,6),v=R(0,6);
  const L=[[`${a}`,'0','la dérivée d’une constante est nulle'],[`${a}x`,`${a}`,'(ax)′ = a'],[`x<sup>${n}</sup>`,`${n}x^${n-1}`,`(xⁿ)′ = n xⁿ⁻¹ : ${n}x<sup>${n-1}</sup>`],
    [fr(1,'x'),'-1/x^2','(1/x)′ = −1/x²'],[fr(1,`x<sup>${k}</sup>`),`-${k}/x^${k+1}`,`(1/xⁿ)′ = −n/xⁿ⁺¹ : −${k}/x<sup>${k+1}</sup>`],['√x','1/(2sqrt(x))','(√x)′ = 1/(2√x)'],
    [`${a}x<sup>${n}</sup>`,`${a*n}x^${n-1}`,`(a xⁿ)′ = a n xⁿ⁻¹ : ${a*n}x<sup>${n-1}</sup>`]][v];
  return exprQ('Dérive la fonction.',mx(`f(x) = ${L[0]}`),'f ′(x) =',L[1],`D’après le tableau des dérivées usuelles, ${L[2]}.`,'Utilise le tableau des dérivées usuelles.',false,
    ([u])=>v===2&&eqv(u,`${n}x^${n}`)||v===4&&eqv(u,`-1/x^${k+1}`)||v===3&&eqv(u,'1/x^2')?'derivee':null)};
const gFsDerOps=()=>{const v=R(0,3),a=pick([-5,-4,-3,-2,2,3,4,5]),b=pick([-6,-5,-4,-3,-2,2,3,4,5,6]),c=nz(-4,4),d=R(-5,5);let F,t,e;
  if(v===0){F=`${a}x<sup>2</sup> ${fsS(b)} ${Math.abs(b)}√x`;t=`${2*a}x${sg(b)}/(2sqrt(x))`;e=`(${num(a)}x²)′ = ${num(2*a)}x et (${num(b)}√x)′ = ${num(b)} × 1/(2√x).`}
  else if(v===1){F=`${a}x<sup>3</sup> ${fsS(b)} ${Math.abs(b)}x<sup>2</sup> ${fsS(d)} ${Math.abs(d)}`;t=`${3*a}x^2${sg(2*b)}x`;e=`On dérive terme à terme : ${3*a}x² ${fsS(2*b)} ${Math.abs(2*b)}x, la constante disparaît.`}
  else if(v===2){F=`(${a}x<sup>2</sup> ${fsS(b)} ${Math.abs(b)}x)(${c}x ${fsS(d)} ${Math.abs(d)})`;t=`(${2*a}x${sg(b)})(${c}x${sg(d)})+(${a}x^2${sg(b)}x)*${c}`;
    e=`Produit u × v avec u = ${a}x² ${fsS(b)} ${Math.abs(b)}x (u′ = ${2*a}x ${fsS(b)} ${Math.abs(b)}) et v = ${c}x ${fsS(d)} ${Math.abs(d)} (v′ = ${c}) : f′ = u′v + uv′, soit ${M(poly([3*a*c,2*a*d+2*b*c,b*d]))}.`}
  else{F=`${fr(a,'x')} ${fsS(b)} ${Math.abs(b)}x<sup>2</sup>`;t=`${-a}/x^2${sg(2*b)}x`;e=`(${num(a)}/x)′ = ${num(a)} × (−1/x²) et (${num(b)}x²)′ = ${num(2*b)}x.`}
  return exprQ('Dérive la fonction.',mx(`f(x) = ${F}`),'f ′(x) =',t,e,'Somme : on dérive terme à terme. Produit : (uv)′ = u′v + uv′.',false,
    ([u])=>v===2&&eqv(u,`(${2*a}x${sg(b)})*${c}`)?'derivee':null)};
const gFsDerComp=()=>{const v=R(0,4),a=R(2,6),b=R(1,9),n=R(2,5),c=R(1,9);let F,t,e,w;
  if(v===0){F=`√(${a}x + ${b})`;t=`${a}/(2sqrt(${a}x+${b}))`;w=`1/(2sqrt(${a}x+${b}))`;e=`(√u)′ = u′/(2√u) avec u = ${a}x + ${b}, u′ = ${a}.`}
  else if(v===1){F=`(${a}x ${fsS(-b)} ${b})<sup>${n}</sup>`;t=`${n*a}(${a}x-${b})^${n-1}`;w=`${n}(${a}x-${b})^${n-1}`;e=`(uⁿ)′ = n u′ uⁿ⁻¹ avec u = ${a}x − ${b}, u′ = ${a} : ${n} × ${a} = ${n*a}.`}
  else if(v===2){F=`(x<sup>2</sup> + ${c})<sup>${n}</sup>`;t=`${2*n}x(x^2+${c})^${n-1}`;w=`${n}(x^2+${c})^${n-1}`;e=`(uⁿ)′ = n u′ uⁿ⁻¹ avec u = x² + ${c}, u′ = 2x.`}
  else if(v===3){F=fr(1,`${a}x + ${b}`);t=`-${a}/(${a}x+${b})^2`;w=`-1/(${a}x+${b})^2`;e=`(1/u)′ = −u′/u² avec u = ${a}x + ${b}, u′ = ${a}.`}
  else{F=`√(x<sup>2</sup> + ${c})`;t=`x/sqrt(x^2+${c})`;w=`1/(2sqrt(x^2+${c}))`;e=`(√u)′ = u′/(2√u) avec u′ = 2x : 2x/(2√(x² + ${c})) = x/√(x² + ${c}).`}
  return exprQ('Dérive la fonction composée.',mx(`f(x) = ${F}`),'f ′(x) =',t,e,'Repère la fonction « intérieure » u, et n’oublie pas de multiplier par u′.',false,([u])=>eqv(u,w)?'chaine':null)};
const gFsDerTab=()=>{const c=R(-4,5),vv=R(-9,9),t=R(0,2),S=[['−','+'],['+','−'],['+','+']][t],O=[`f admet un minimum égal à ${num(vv)}, atteint en x = ${num(c)}`,`f admet un maximum égal à ${num(vv)}, atteint en x = ${num(c)}`,`f n’admet pas d’extremum en ${num(c)}`];
  return mcq('Que peut-on en déduire ?',dtab([['x','−∞',num(c),'+∞'],['signe de f′(x)',S[0],'0',S[1]]])+stx(`et f(${num(c)}) = ${num(vv)}.`),O.map((h,i)=>i===t?{h,ok:true}:{h,tag:'extremum'}),
    t===2?`f′ s’annule en ${num(c)} sans changer de signe : f est croissante de part et d’autre, il n’y a pas d’extremum (comme x³ en 0).`:`f′ s’annule en ${num(c)} et change de signe (${S[0]} puis ${S[1]}) : f ${t?'monte puis descend':'descend puis remonte'}, d’où un ${t?'maximum':'minimum'} égal à f(${num(c)}) = ${num(vv)}.`,
    'Un extremum : f′ s’annule ET change de signe.')};
const gFsDerOpt=()=>{const k=pick([.1,.2,.5,.25]),xs=k===.25?pick([10,20]):pick([5,10,15,20,25]),c1=R(5,30),p=c1+2*k*xs,top=k*xs*xs,c0=R(5,Math.max(6,Math.floor(top)-1)),Bm=+(top-c0).toFixed(4);
  return fsNq({instr:'Trouve la quantité qui rend le bénéfice maximal, et ce bénéfice.',prompt:stx(`Pour x milliers de pièces (0 ≤ x ≤ 30), le coût est C(x) = ${num(k)}x² + ${c1}x + ${c0} et la recette R(x) = ${num(+p.toFixed(4))}x (en milliers d’euros).`),
    labels:['x =','B max ='],t:[xs,Bm],
    explain:`B(x) = R(x) − C(x) = −${num(k)}x² + ${num(+(p-c1).toFixed(4))}x − ${c0}. B′(x) = −${num(2*k)}x + ${num(+(p-c1).toFixed(4))}, qui s’annule en x = ${xs} et passe de + à − : maximum B(${xs}) = ${num(Bm)} milliers d’euros.`,
    hint:'Bénéfice = recette − coût. Dérive B, cherche où B′ s’annule en changeant de signe.',diag:([u,w])=>near(w,top,1e-6)?'signe':null})};
/* raisonnements dérivation */
const gFsDerR1=()=>{let r1,r2;do{r1=R(-5,3);r2=r1+2*R(1,3)}while(r1+r2===0);const B=-3*(r1+r2)/2,C=3*r1*r2,d=R(-5,5),f=x=>x**3+B*x*x+C*x+d,T=fsRoots(3,2*B,C);
  return chain({instr:'Étudie les variations de f, en construisant ton raisonnement.',prompt:fsFx(poly([1,B,C,d])),
    steps:[
      {q:'La dérivée est :',o:[{h:mx('f′(x) = ')+M(poly([3,2*B,C])),ok:true,cs:[3,2*B,C]},
        {h:mx('f′(x) = ')+M(poly([3,B,C])),cs:[3,B,C],why:`(${B}x²)′ = ${2*B}x : on multiplie aussi par l’exposant 2.`,tag:'derivee'},
        {h:mx('f′(x) = ')+M(poly([1,2*B,C])),cs:[1,2*B,C],why:'(x³)′ = 3x² et non x².',tag:'derivee'}]},
      {q:'f′ est un trinôme. Ses racines :',o:prev=>fsRootOpts(...prev[0].cs)},
      {q:'Signe de f′ (son coefficient de x² est positif) :',o:prev=>{const rs=prev[1].rs,k=rs.length===2?0:2;
        return['+ puis − puis + (positive à l’extérieur des racines)','− puis + puis − (négative à l’extérieur des racines)','Positive ou nulle partout'].map((h,i)=>({h,c:i,ok:i===k,
          why:k===0?'Un trinôme est du signe de a à l’extérieur de ses racines : ici a &gt; 0.':'Sans deux racines distinctes, le trinôme garde le signe de a &gt; 0.',tag:'fs-signe-tri'}))}},
      {q:'Donc f admet :',o:prev=>{const rs=prev[1].rs,rr=rs.length===2?rs:T,k=prev[2].c;
        return[`un maximum local en x = ${rr[0].t} et un minimum local en x = ${rr[1].t}`,`un minimum local en x = ${rr[0].t} et un maximum local en x = ${rr[1].t}`,'aucun extremum : f est croissante sur ℝ'].map((h,i)=>({h:mx(h),ok:i===k,
          why:'Quand f′ passe de + à −, f monte puis descend : maximum. De − à + : minimum.',tag:'extremum'}))}}],
    explain:`f′(x) = ${M(poly([3,2*B,C]))} = 3(${fsXa(-r1)})(${fsXa(-r2)}). f′ est positive avant ${num(r1)}, négative entre ${num(r1)} et ${num(r2)}, positive après. f admet un maximum local f(${num(r1)}) = ${num(f(r1))} et un minimum local f(${num(r2)}) = ${num(f(r2))}.`})};
const gFsDerR2=()=>{let a,b;do{a=R(-5,5);b=R(-4,5)}while(a+b===0);
  const Nf=(fo,up,vp)=>{const U=[1,a],V=[-1,b],t1=[up*V[0],up*V[1]],t2=[vp*U[0],vp*U[1]];return fo==='q'?[t1[0]-t2[0],t1[1]-t2[1]]:fo==='p'?[t1[0]+t2[0],t1[1]+t2[1]]:[t2[0]-t1[0],t2[1]-t1[1]]};
  const Nh=N=>mx('f′(x) = ')+M(`(${poly(N)||'0'})/(${poly([-1,b])})^2`);
  return chain({instr:'Étudie les variations de f, en construisant ton raisonnement.',prompt:fsFx(`(${poly([1,a])})/(${poly([-1,b])})`)+stx(` sur ℝ ∖ {${num(b)}}.`),
    steps:[
      {q:`f = u/v avec u(x) = ${fsXa(a)} et v(x) = ${num(b)} − x. On applique :`,o:[
        {h:mx(`f′ = ${fr('u′v − uv′','v<sup>2</sup>')}`),ok:true,fo:'q'},{h:mx(`f′ = ${fr('u′v + uv′','v<sup>2</sup>')}`),fo:'p',why:'u′v + uv′ est la dérivée d’un produit. Pour un quotient, c’est u′v − uv′ au numérateur.',tag:'derivee'},
        {h:mx(`f′ = ${fr('uv′ − u′v','v<sup>2</sup>')}`),fo:'r',why:'L’ordre compte : u′v − uv′ (on commence par u′). L’ordre inverse change le signe.',tag:'derivee'}]},
      {q:'Les dérivées de u et v :',o:[{h:mx('u′(x) = 1 et v′(x) = −1'),ok:true,up:1,vp:-1},{h:mx('u′(x) = 1 et v′(x) = 1'),up:1,vp:1,why:`v(x) = ${num(b)} − x : la dérivée de −x est −1.`,tag:'signe'},
        {h:mx('u′(x) = 0 et v′(x) = −1'),up:0,vp:-1,why:`u(x) = ${fsXa(a)} : la dérivée de x vaut 1 (seule la constante disparaît).`,tag:'derivee'}]},
      {q:'On obtient :',o:prev=>{const N=Nf(prev[0].fo,prev[1].up,prev[1].vp),key=String(N),o=[{h:Nh(N),ok:true,N}],seen=new Set([key]);
        [[Nf('q',1,-1),'C’est la bonne dérivée, mais elle ne découle pas de tes choix précédents.'],[Nf('p',1,-1),'Numérateur de la forme u′v + uv′ : formule du produit.'],[Nf('q',1,1),'Avec v′ = 1 au lieu de −1.'],[Nf('r',1,-1),'Numérateur dans l’ordre uv′ − u′v.']]
          .forEach(([M2,why])=>{if(o.length<4&&!seen.has(String(M2))){seen.add(String(M2));o.push({h:Nh(M2),N:M2,why,tag:'derivee'})}});return o}},
      {q:'Conclusion :',o:prev=>{const N=prev[2].N,cst=N[0]===0,k=cst?(N[1]>0?0:N[1]<0?1:2):3,z=cst?0:-N[1]/N[0];
        const o=[`f est croissante sur ]−∞ ; ${num(b)}[ et sur ]${num(b)} ; +∞[`,`f est décroissante sur ]−∞ ; ${num(b)}[ et sur ]${num(b)} ; +∞[`,'f est croissante sur ℝ'].map((h,i)=>({h:mx(h),ok:i===k,
          why:i===2?`f n’est pas définie en ${num(b)} : on étudie chaque intervalle séparément.`:'Le dénominateur (un carré) est positif : f′ a le signe du numérateur.',tag:'signe'}));
        if(!cst)o.push({h:mx(`f change de sens de variation en x = ${fsT(Math.round(-N[1]*100),Math.round(N[0]*100))}`),ok:true});return o}}],
    explain:`f′(x) = (1 × (${num(b)} − x) − (${fsXa(a)}) × (−1)) ÷ (${num(b)} − x)² = ${num(a+b)}/(${num(b)} − x)². Un carré est positif, donc f′ a le signe de ${num(a+b)} : f est ${a+b>0?'croissante':'décroissante'} sur ]−∞ ; ${num(b)}[ et sur ]${num(b)} ; +∞[.`})};
const gFsDerR3=()=>{const p=R(1,6),r=pick([1,2,-1]),q=r**3+p*r;
  return chain({instr:'Étudie le signe de f, en construisant ton raisonnement.',prompt:fsFx(poly([1,0,p,-q])),
    steps:[
      {q:'La dérivée est :',o:[{h:mx(`f′(x) = 3x<sup>2</sup> + ${p}`),ok:true},{h:mx(`f′(x) = x<sup>2</sup> + ${p}`),why:'(x³)′ = 3x².',tag:'derivee'},
        {h:mx(`f′(x) = 3x<sup>2</sup> + ${p} ${fsS(-q)} ${Math.abs(q)}`),why:'La dérivée d’une constante est nulle.',tag:'derivee'}]},
      {q:'Signe de f′ et variations :',o:[{h:'f′(x) &gt; 0 pour tout x : f est strictement croissante sur ℝ',ok:true},
        {h:'f′(x) &lt; 0 pour x &lt; 0 : f décroît puis croît',why:'x² est positif même quand x est négatif : 3x² + '+p+' &gt; 0 partout.',tag:'signe'},
        {h:'f′ s’annule en 0 : f admet un extremum en 0',why:`f′(0) = ${p} ≠ 0.`,tag:'extremum'}]},
      {q:'Une racine évidente de f :',o:[{h:mx(`x = ${num(r)}, car f(${num(r)}) = 0`),ok:true,R:r},{h:mx(`x = ${num(-r)}, car f(${num(-r)}) = 0`),R:-r,why:`f(${num(-r)}) = ${num((-r)**3-p*r-q)} ≠ 0.`,tag:'calc'},
        {h:mx('x = 0, car f(0) = 0'),R:0,why:`f(0) = ${num(-q)} ≠ 0.`,tag:'calc'}]},
      {q:'Donc :',o:prev=>{const R0=num(prev[2].R);return[{h:mx(`f(x) &lt; 0 sur ]−∞ ; ${R0}[ et f(x) &gt; 0 sur ]${R0} ; +∞[`),ok:true},
        {h:mx(`f(x) &gt; 0 sur ]−∞ ; ${R0}[ et f(x) &lt; 0 sur ]${R0} ; +∞[`),why:'f est croissante : avant la racine elle est plus petite que 0, après elle est plus grande.',tag:'fs-ordre'},
        {h:mx('f(x) &gt; 0 sur ℝ'),why:'f s’annule en la racine trouvée et elle est croissante : elle est négative avant.',tag:'signe'}]}}],
    explain:`f′(x) = 3x² + ${p} &gt; 0 : f est strictement croissante sur ℝ. f(${num(r)}) = 0. Donc f(x) &lt; 0 pour x &lt; ${num(r)} et f(x) &gt; 0 pour x &gt; ${num(r)}.`})};

/* ===================== Chapitre fs-lim : limites ===================== */
const fsLim=(e,a)=>`<span class="m">lim<sub>x→${a}</sub> ${e}</span>`;
const gFsLimRef=()=>{const n=R(2,5),L=[[`x<sup>${n}</sup>`,'+∞',0],[`x<sup>${n}</sup>`,'−∞',n%2?1:0],['√x','+∞',0],[fr(1,'x'),pick(['+∞','−∞']),2],[fr(1,'x'),'0<sup>+</sup>',0],[fr(1,'x'),'0<sup>−</sup>',1],
    [fr(1,'x<sup>2</sup>'),'0',0],[fr(1,'√x'),'+∞',2],[fr(1,'x<sup>3</sup>'),'0<sup>−</sup>',1]],[e,p,c]=pick(L),O=['+∞','−∞','0','1'];
  return mcq('Quelle est la limite ?',fsLim(mx(e),p),O.map((h,i)=>i===c?{h:mx(h),ok:true}:{h:mx(h),tag:p.startsWith('0')?'fs-lim-signe':'signe'}),
    `C’est une limite de référence : ${fsLim(mx(e),p)} = ${O[c]}.${p==='−∞'&&e.includes('sup')&&!e.includes('frac')?` Avec x négatif, une puissance ${n%2?'impaire reste négative':'paire est positive'}.`:''}${p.startsWith('0<sup>')?' Le signe du 0 décide du signe de l’infini.':''}`,
    'Pense à la courbe de la fonction de référence.',true)};
const gFsLimOps=()=>{const op=R(0,2),r=()=>nz(-6,6);let A,B,ans,sym;
  const I=v=>v==='p'?'+∞':v==='m'?'−∞':v==='z+'?'0<sup>+</sup>':v==='z-'?'0<sup>−</sup>':num(v);
  if(op===0){sym='f(x) + g(x)';const S=pick([['r','p'],['r','m'],['p','p'],['m','m'],['p','m'],['r','r']]);A=S[0]==='r'?r():S[0];B=S[1]==='r'?r():S[1];
    ans=typeof A==='number'&&typeof B==='number'?A+B:A===B||typeof A==='number'?B:typeof B==='number'?A:'FI'}
  else if(op===1){sym='f(x) × g(x)';const S=pick([['r','p'],['r','m'],['p','m'],['m','m'],['z','p'],['r','r']]);A=S[0]==='r'?r():S[0]==='z'?0:S[0];B=S[1]==='r'?r():S[1];
    if(A===0)ans='FI';else if(typeof A==='number'&&typeof B==='number')ans=A*B;else{const s=(typeof A==='number'?Math.sign(A):A==='p'?1:-1)*(typeof B==='number'?Math.sign(B):B==='p'?1:-1);ans=s>0?'p':'m'}}
  else{sym=fr('f(x)','g(x)');const S=pick([['r','p'],['r','z+'],['r','z-'],['p','r'],['p','p'],['r','r']]);A=S[0]==='r'?r():S[0];B=S[1]==='r'?r():S[1];
    if(A==='p'&&B==='p')ans='FI';else if(typeof A==='number'&&(B==='p'||B==='m'))ans=0;else if(typeof A==='number'&&B==='z+')ans=A>0?'p':'m';else if(typeof A==='number'&&B==='z-')ans=A>0?'m':'p';
    else if(A==='p')ans=B>0?'p':'m';else ans={t:fsT(A,B)}}
  const okH=ans==='FI'?'forme indéterminée':ans.t?ans.t:I(ans),O=[...new Set([okH,'+∞','−∞','0','forme indéterminée'])].slice(0,5);
  return mcq('Quelle est la limite ?',stx(`On sait que lim f(x) = ${I(A)} et lim g(x) = ${I(B)} (en un même point).`)+mx(`lim ${sym} = ?`),O.map(h=>h===okH?{h:mx(h),ok:true}:{h:mx(h),tag:h==='forme indéterminée'||okH==='forme indéterminée'?'fi':'fs-lim-signe'}),
    okH==='forme indéterminée'?'C’est l’une des quatre formes indéterminées (∞ − ∞, 0 × ∞, ∞/∞, 0/0) : on ne peut pas conclure sans transformer l’expression.':`D’après les règles d’opérations sur les limites (et la règle des signes), la limite vaut ${okH}.`,
    'Repère la forme : « nombre + ∞ », « nombre ÷ 0⁺ »… Les formes ∞ − ∞, 0 × ∞, ∞/∞ et 0/0 sont indéterminées.',true)};
const gFsLimPoly=()=>{const n=R(2,5),a=nz(-5,5),b=R(-9,9),c=R(-9,9),pt=pick(['+∞','−∞']),s=Math.sign(a)*(pt==='−∞'&&n%2?-1:1),c0=s>0?0:1,O=['+∞','−∞','0','forme indéterminée'];
  return mcq('Quelle est la limite ?',`<span class="m">lim<sub>x→${pt}</sub></span> `+M(poly([a,...Array(n-2).fill(0),b,c])),O.map((h,i)=>i===c0?{h:mx(h),ok:true}:{h:mx(h),tag:i===3?'fi':'signe'}),
    `On factorise par le terme de plus haut degré : ${num(a)}x<sup>${n}</sup>(1 + …), la parenthèse tend vers 1. Or ${num(a)}x<sup>${n}</sup> tend vers ${O[c0]} (x<sup>${n}</sup> → ${n%2&&pt==='−∞'?'−∞':'+∞'}, multiplié par ${num(a)}).`,
    'En ±∞, un polynôme a la même limite que son terme de plus haut degré.',true)};
const gFsLimAsy=()=>{let a,b,c,d;do{a=nz(-6,6);b=R(-9,9);c=nz(-4,4);d=R(-9,9)}while(a*d-b*c===0);
  return fsNq({instr:'Donne les équations des asymptotes de la courbe : x = … (verticale) et y = … (horizontale).',prompt:fsFx(`(${poly([a,b])})/(${poly([c,d])})`),labels:['x =','y ='],t:[-d/c,a/c],ex:[fsE(-d,c),fsE(a,c)],
    explain:`Le dénominateur s’annule en ${fsQ(-d,c)} (pas le numérateur) : la limite y est infinie, asymptote verticale x = ${fsQ(-d,c)}. En ±∞, on garde les termes dominants : ${a}x/(${c}x) → ${fsQ(a,c)}, asymptote horizontale y = ${fsQ(a,c)}.`,
    hint:'Verticale : valeur interdite. Horizontale : limite en ±∞ (quotient des coefficients de x).',diag:([u,v])=>near(u,d/c,1e-6)&&d?'signe':near(v,b/d,1e-6)?'limite-dom':null})};
const gFsLimComp=()=>{const a=pick([2,3,5,6,7,10]),b=nz(-9,9),v=R(0,1);
  return fsNq({instr:'Calcule la limite (valeur exacte).',prompt:fsLim(mx(v?`√(${a} ${fsS(b)} ${fr(Math.abs(b),'x<sup>2</sup>')})`:`√(${a} ${fsS(b)} ${fr(Math.abs(b),'x')})`),'+∞'),labels:['Limite ='],t:[Math.sqrt(a)],ex:[`sqrt(${a})`],
    explain:`${num(b)}/${v?'x²':'x'} → 0, donc X = ${a} ${fsS(b)} ${Math.abs(b)}/${v?'x²':'x'} → ${a}. Comme √X → √${a} quand X → ${a}, la limite vaut √${a} (limite d’une fonction composée).`,
    hint:'Cherche d’abord la limite de ce qui est sous la racine.',diag:([w])=>near(w,a,1e-6)?'calc':null})};
const FS_GEN=[['x + sin x',1,'sin x ≥ −1, donc x + sin x ≥ x − 1, qui tend vers +∞ : théorème de comparaison.'],[fr('x cos x','x<sup>2</sup> + 1'),0,'−x/(x² + 1) ≤ (x cos x)/(x² + 1) ≤ x/(x² + 1) pour x &gt; 0, et les deux bornes tendent vers 0 : théorème des gendarmes.'],
  [fr('sin x','x'),0,'−1/x ≤ sin x/x ≤ 1/x pour x &gt; 0, et ±1/x → 0 : théorème des gendarmes.'],['x<sup>2</sup> − cos x',1,'−cos x ≥ −1, donc x² − cos x ≥ x² − 1 → +∞ : comparaison.'],
  ['−x + 2 sin x',2,'2 sin x ≤ 2, donc −x + 2 sin x ≤ −x + 2 → −∞ : comparaison.'],[fr('3 + cos x','x'),0,'2/x ≤ (3 + cos x)/x ≤ 4/x pour x &gt; 0, et les deux bornes tendent vers 0 : gendarmes.'],['x(2 + sin x)',1,'2 + sin x ≥ 1, donc x(2 + sin x) ≥ x → +∞ pour x &gt; 0 : comparaison.']];
const gFsLimGen=()=>{const[e,c,w]=pick(FS_GEN),O=['0','+∞','−∞','Elle n’existe pas'];
  return mcq('Quelle est la limite ?',fsLim(mx(e),'+∞'),O.map((h,i)=>i===c?{h:mx(h),ok:true}:{h:mx(h),tag:i===3?'fi':'calc'}),w+' Remarque : sin x et cos x n’ont pas de limite en +∞, mais ils restent entre −1 et 1.',
    'Encadre sin x ou cos x entre −1 et 1, puis utilise la comparaison ou les gendarmes.',true)};
/* raisonnements limites */
const gFsLimR1=()=>{let a,b,c,d,e;do{a=nz(-6,6);b=nz(-9,9);c=R(-9,9);d=R(1,6);e=nz(-9,9)}while(d+e===0||a===d);const pt=pick(['+∞','−∞']),t=(s,v,p)=>v?` ${fsS(v)} ${Math.abs(v)}/${p}`:'';
  const top=`x²(${num(a)}${t(0,b,'x')}${t(0,c,'x²')})`,bot=`x²(${d}${t(0,e,'x²')})`,Q=(n,m)=>fsQ(n,m);
  return chain({instr:'Calcule la limite, en construisant ton raisonnement.',prompt:`<span class="m">lim<sub>x→${pt}</sub></span> `+M(`(${poly([a,b,c])})/(${poly([d,0,e])})`),
    steps:[
      {q:'Si on passe directement à la limite :',o:[{h:'on obtient une forme indéterminée « ∞/∞ »',ok:true},{h:'on obtient 1, car ∞/∞ = 1',why:'∞/∞ n’est pas un nombre : c’est une forme indéterminée, la limite peut valoir n’importe quoi.',tag:'fi'},
        {h:'on obtient ±∞, car le numérateur tend vers l’infini',why:'Le dénominateur tend aussi vers l’infini : on ne peut pas conclure sans transformer.',tag:'fi'}]},
      {q:'On factorise par le terme de plus haut degré :',o:[{h:mx(fr(top,bot)),ok:true,c:'ok'},
        {h:mx(fr(`x(${num(a)}x ${fsS(b)} ${Math.abs(b)}${t(0,c,'x')})`,`x(${d}x${t(0,e,'x')})`)),c:'x',why:'Ce n’est pas faux, mais il reste des termes infinis : l’indétermination demeure.',tag:'fi'},
        {h:mx(fr(`x²(${num(a)} ${fsS(b)} ${Math.abs(b)}${c?` ${fsS(c)} ${Math.abs(c)}`:''})`,`x²(${d} ${fsS(e)} ${Math.abs(e)})`)),c:'sum',why:`${num(b)}x = x² × (${num(b)}/x), et non x² × ${num(b)}.`,tag:'calc'}]},
      {q:`Quand x → ${pt} :`,o:[{h:`les termes en 1/x et 1/x² tendent vers 0`,ok:true},{h:`${num(b)}/x tend vers ${num(b)}`,why:'Un nombre divisé par un nombre de plus en plus grand tend vers 0.',tag:'calc'},
        {h:'1/x² tend vers +∞',why:'x² devient immense, donc 1/x² devient minuscule : il tend vers 0.',tag:'calc'}]},
      {q:'La limite vaut :',o:prev=>{const okv=prev[1].c==='sum'?[a+b+c,d+e]:[a,d],C=[[a,d],[a+b+c,d+e],[d,a],[c,e],[a+b,d]],seen=new Set,o=[];
        [okv,...C].forEach((p,i)=>{const h=Q(p[0],p[1]);if(seen.has(h))return;seen.add(h);o.push(i?{h:mx(h),why:'Après simplification par x², seuls les coefficients dominants restent : '+fsT(a,d)+'.',tag:'limite-dom'}:{h:mx(h),ok:true})});return o}}],
    explain:`Forme ∞/∞. On factorise : ${fr(top,bot)}. Les termes en 1/x et 1/x² tendent vers 0 : la limite vaut ${fsT(a,d)}.`})};
const gFsLimR2=()=>{let A,p,q,N;do{A=nz(-5,5);p=R(-9,9);q=nz(-4,4);N=p-q*A}while(!N||p+q*A===0);const s=pick(['−','+']),sgD=s==='+'?1:-1,ok3=Math.sign(N)*sgD>0?'+∞':'−∞';
  return chain({instr:'Calcule la limite, en construisant ton raisonnement.',prompt:`<span class="m">lim<sub>x→${num(A)}<sup>${s}</sup></sub></span> `+M(`(${poly([-q,p])})/(${poly([1,-A])})`),
    steps:[
      {q:'Limite du numérateur :',o:[{h:mx(num(N)),ok:true,v:N},{h:mx(num(p+q*A)),v:p+q*A,why:`On remplace x par ${num(A)} : ${num(p)} ${fsS(-q)} ${Math.abs(q)} × ${A<0?`(${num(A)})`:A} = ${num(N)}.`,tag:'signe'},
        {h:mx('0'),v:0,why:'Seul le dénominateur s’annule en ce point ; le numérateur, lui, tend vers '+num(N)+'.',tag:'calc'}]},
      {q:`Limite du dénominateur quand x → ${num(A)}<sup>${s}</sup> :`,o:[{h:mx('0<sup>+</sup>'),z:1,ok:s==='+'},{h:mx('0<sup>−</sup>'),z:-1,ok:s==='−'},{h:'0, sans préciser le signe',z:0,why:'Le signe du 0 est indispensable pour conclure.',tag:'fs-lim-signe'}].map(o=>o.ok||o.why?o:Object.assign(o,{why:`x → ${num(A)}<sup>${s}</sup> signifie x ${s==='+'?'&gt;':'&lt;'} ${num(A)}, donc x − ${A<0?`(${num(A)})`:A} ${s==='+'?'&gt;':'&lt;'} 0.`,tag:'fs-lim-signe'}))},
      {q:'Donc la limite est :',o:prev=>{const v=prev[0].v,z=prev[1].z,k=v===0?'fi':z===0?ok3:Math.sign(v)*z>0?'+∞':'−∞';
        return[['+∞','+∞'],['−∞','−∞'],['forme indéterminée','fi'],['0','0']].map(([h,c])=>({h:mx(h),ok:c===k,why:'Forme « nombre non nul ÷ 0 » : la limite est infinie, son signe suit la règle des signes.',tag:'fs-lim-signe'}))}},
      {q:'Interprétation graphique :',o:[{h:mx(`la droite x = ${num(A)} est asymptote verticale`),ok:true},{h:mx(`la droite y = ${num(A)} est asymptote horizontale`),why:'Une limite infinie en un réel A donne une asymptote verticale x = A.',tag:'calc'},
        {h:mx(`la droite y = ${num(N)} est asymptote horizontale`),why:'Une asymptote horizontale vient d’une limite finie en ±∞, pas d’une limite infinie en un réel.',tag:'calc'}]}],
    explain:`Le numérateur tend vers ${num(N)}, le dénominateur vers 0<sup>${s}</sup>. Forme « ${num(N)}/0<sup>${s}</sup> » : la limite vaut ${ok3}. La droite x = ${num(A)} est asymptote verticale.`})};
const gFsLimR3=()=>{const a=R(1,9);
  return chain({instr:'Calcule la limite, en construisant ton raisonnement.',prompt:fsLim(mx(`√(x + ${a}) − √x`),'+∞'),
    steps:[
      {q:'En passant directement à la limite :',o:[{h:'forme « ∞ − ∞ » : indéterminée',ok:true},{h:'0, car ∞ − ∞ = 0',why:'∞ − ∞ est une forme indéterminée : deux quantités infinies peuvent avoir une différence quelconque.',tag:'fi'},
        {h:'+∞, car √(x + '+a+') → +∞',why:'√x tend aussi vers +∞ : on ne peut pas conclure directement.',tag:'fi'}]},
      {q:'Quelle transformation ?',o:[{h:mx(`Multiplier et diviser par l’expression conjuguée √(x + ${a}) + √x`),ok:true,c:'conj'},
        {h:mx(`Écrire √(x + ${a}) = √x + √${a}`),c:'split',why:'La racine d’une somme n’est pas la somme des racines : √(9 + 16) = 5, pas 7.',tag:'calc'},
        {h:'Factoriser par x² comme pour un polynôme',c:'fac',why:'Ce n’est pas un polynôme : la factorisation par le terme dominant ne lève pas cette indétermination.',tag:'fi'}]},
      {q:'On obtient :',o:prev=>{const k=prev[1].c==='split'?1:0;return[[mx(fr(a,`√(x + ${a}) + √x`)),'C’est la bonne expression, mais elle ne découle pas de ton choix précédent.'],[mx(`√${a}`),'Ce résultat vient de l’égalité fausse √(x + a) = √x + √a.'],
        [mx(fr(`x + ${a} − x`,`√(x + ${a}) − √x`)),'Le dénominateur doit être la conjuguée, avec un signe + : (A − B)(A + B) = A² − B².']].map(([h,why],i)=>({h,c:i,ok:i===k,why,tag:'calc'}))}},
      {q:'Donc la limite vaut :',o:prev=>{const k=prev[2].c;return['0','√'+a,'+∞'].map((h,i)=>({h:mx(h),ok:i===k,why:'Relis l’expression obtenue : le numérateur est constant, regarde ce que fait le dénominateur.',tag:'calc'}))}}],
    explain:`√(x + ${a}) − √x = [(√(x + ${a}))² − (√x)²] ÷ (√(x + ${a}) + √x) = ${a}/(√(x + ${a}) + √x). Le dénominateur tend vers +∞, donc la limite vaut 0.`})};

/* ===================== Chapitre fs-cvx : continuité, valeurs intermédiaires, convexité ===================== */
const gFsCvxCont=()=>{const c=R(-3,5),m=nz(-4,4),p=R(-6,6);let n;do n=nz(-4,4);while(n===m);const cont=Math.random()<.5,q=cont?(m-n)*c+p:(m-n)*c+p+nz(-3,3),gl=m*c+p,dr=n*c+q;
  return mcq(`f est-elle continue en ${num(c)} ?`,stx(`f(x) = ${fsLin(m,p)} si x &lt; ${num(c)}, et f(x) = ${fsLin(n,q)} si x ≥ ${num(c)}.`),
    [{h:`Oui, f est continue en ${num(c)}`,ok:cont,tag:'calc'},{h:`Non, f n’est pas continue en ${num(c)}`,ok:!cont,tag:'calc'}],
    `Chaque morceau est affine, donc continu. Au raccord : limite à gauche ${num(m)} × ${c<0?`(${num(c)})`:c} ${fsS(p)} ${Math.abs(p)} = ${num(gl)} et f(${num(c)}) = ${num(dr)}. ${cont?'Les deux valeurs coïncident : f est continue en '+num(c)+'.':'Les deux valeurs diffèrent : la courbe fait un saut, f n’est pas continue en '+num(c)+'.'}`,
    'Compare la limite à gauche (premier morceau) et la valeur f(c) (second morceau).',true)};
const gFsCvxTvi=()=>{const x=[R(-6,-4),R(-3,-1),R(0,2),R(3,5)];let y,k,n;
  do{const y1=R(2,12),y2=R(-10,y1-3);y=[R(y2-3,y1-1),y1,y2,R(y2+1,y2+15)];k=R(Math.min(...y)-2,Math.max(...y)+2)}while(y.includes(k));
  n=[[y[0],y[1]],[y[1],y[2]],[y[2],y[3]]].filter(([u,v])=>(k-u)*(k-v)<0).length;
  return mcq(`Combien de solutions l’équation f(x) = ${num(k)} a-t-elle sur [${num(x[0])} ; ${num(x[3])}] ?`,stx(`f est continue, croissante sur [${num(x[0])} ; ${num(x[1])}], décroissante sur [${num(x[1])} ; ${num(x[2])}], croissante sur [${num(x[2])} ; ${num(x[3])}].`)+dtab([['x',...x.map(num)],['f(x)',...y.map(num)]]),
    ['0','1','2','3'].map((h,i)=>i===n?{h,ok:true}:{h,tag:'fs-tvi'}),
    `Sur chaque intervalle où f est continue et strictement monotone, l’équation a une solution exactement quand ${num(k)} est compris entre les valeurs aux bornes. ${[[y[0],y[1]],[y[1],y[2]],[y[2],y[3]]].map(([u,v],i)=>`[${num(x[i])} ; ${num(x[i+1])}] : de ${num(u)} à ${num(v)}, ${(k-u)*(k-v)<0?'une solution':'aucune'}`).join(' ; ')}. Total : ${n}.`,
    'Regarde chaque flèche du tableau : la valeur k est-elle franchie ?',true)};
const gFsCvxEnc=()=>{const k=R(1,5),n=R(0,2),lo=n**3+k*n,hi=(n+1)**3+k*(n+1);const m=R(lo+1,hi-1),f=x=>x**3+k*x-m;let A=n,B=n+1;for(let i=0;i<60;i++){const c=(A+B)/2;f(c)<0?A=c:B=c}const al=(A+B)/2,l=Math.floor(al*100)/100;
  return fsNq({instr:'À la calculatrice (balayage), donne une valeur approchée de la solution α.',prompt:fsFx(poly([1,0,k,-m]))+stx(` L’équation f(x) = 0 a une unique solution α dans [${n} ; ${n+1}].`),labels:['α ≈'],t:[al],dp:2,
    explain:`f(${num(n)}) = ${num(f(n))} &lt; 0 et f(${n+1}) = ${num(f(n+1))} &gt; 0. En affinant : f(${num(l)}) ≈ ${dec(f(l),3)} &lt; 0 et f(${num(+(l+.01).toFixed(2))}) ≈ ${dec(f(l+.01),3)} &gt; 0, donc ${num(l)} &lt; α &lt; ${num(+(l+.01).toFixed(2))} et α ≈ ${dec(al,2)}.`,
    hint:'Tabule f avec un pas de 0,1 pour trouver le changement de signe, puis avec un pas de 0,01.',diag:([w])=>near(w,Math.floor(al*100)/100,.0011)||near(w,Math.ceil(al*100)/100,.0011)?'arrondi':null})};
const gFsCvxD2=()=>{const a=R(-3,3),b=nz(-5,5),c=R(-6,6),d=R(-9,9),e=R(-9,9);
  return exprQ('Calcule la dérivée seconde.',fsFx(poly([a,b,c,d,e])),'f ″(x) =',poly([12*a,6*b,2*c]),`f′(x) = ${M(poly([4*a,3*b,2*c,d]))}, puis on dérive encore : f″(x) = ${M(poly([12*a,6*b,2*c]))}.`,
    'Dérive une première fois, puis dérive le résultat.',true,([u])=>eqv(u,poly([4*a,3*b,2*c,d]))?'derivee':null)};
const gFsCvxInfl=()=>{let a,b;do{a=nz(-3,3);b=nz(-9,9)}while(false);const c=R(-9,9),d=R(-9,9);
  return fsNq({instr:'Donne l’abscisse du point d’inflexion.',prompt:fsFx(poly([a,b,c,d])),labels:['x ='],t:[-b/(3*a)],ex:[fsE(-b,3*a)],
    explain:`f′(x) = ${M(poly([3*a,2*b,c]))} et f″(x) = ${M(poly([6*a,2*b]))}. f″ est affine : elle s’annule en x = ${fsQ(-b,3*a)} en changeant de signe. La convexité change : c’est l’abscisse du point d’inflexion.`,
    hint:'Point d’inflexion : f″ s’annule en changeant de signe.',diag:([w])=>near(w,-b/(2*a),1e-6)?'fs-convexe':near(w,b/(3*a),1e-6)?'signe':null})};
const FS_CVR=[['x<sup>2</sup>','ℝ',0],['√x','[0 ; +∞[',1],[fr(1,'x'),']0 ; +∞[',0],[fr(1,'x'),']−∞ ; 0[',1],['x<sup>3</sup>','[0 ; +∞[',0],['x<sup>3</sup>',']−∞ ; 0]',1],['x<sup>3</sup>','ℝ',2],['−x<sup>2</sup>','ℝ',1]];
const gFsCvxRef=()=>{const[e,I,c]=pick(FS_CVR),O=['Convexe','Concave','Ni l’un ni l’autre'];
  return mcq(`Sur ${I}, la fonction est :`,mx(`f(x) = ${e}`),O.map((h,i)=>i===c?{h,ok:true}:{h,tag:'fs-convexe'}),
    `${c===2?'x³ est concave sur ]−∞ ; 0] et convexe sur [0 ; +∞[ : sur ℝ elle change de convexité (point d’inflexion en 0).':c===0?'La courbe est au-dessus de ses tangentes (f″ ≥ 0) : convexe.':'La courbe est en dessous de ses tangentes (f″ ≤ 0) : concave.'}`,
    'Imagine la courbe : « en bol » (convexe) ou « en dôme » (concave) ?',true)};
const gFsCvxFix=()=>{const q=pick([.5,.6,.75,.8,.85,.9]),L=R(2,30),r=+(L*(1-q)).toFixed(4),u0=R(0,40);
  return fsNq({instr:'On admet que la suite converge. Calcule sa limite ℓ.',prompt:mx(`u<sub>0</sub> = ${u0} et u<sub>n+1</sub> = ${num(q)}u<sub>n</sub> + ${num(r)}`),labels:['ℓ ='],t:[L],
    explain:`f(x) = ${num(q)}x + ${num(r)} est continue. Si (u<sub>n</sub>) converge vers ℓ, alors ℓ = f(ℓ) : ℓ = ${num(q)}ℓ + ${num(r)}, soit ${num(+(1-q).toFixed(4))}ℓ = ${num(r)} et ℓ = ${L}.`,
    hint:'La limite vérifie ℓ = f(ℓ) (f continue).',diag:([w])=>near(w,u0,1e-6)?'point-fixe':near(w,r,1e-6)?'point-fixe':null})};
/* raisonnements */
const gFsCvxR1=()=>{const k=R(1,5),n=R(0,2),lo=n**3+k*n,hi=(n+1)**3+k*(n+1),m=R(lo+1,hi-1),v1=lo-m,v2=hi-m,w1=lo+m,w2=hi+m;
  return chain({instr:'Montre que f(x) = 0 a une unique solution sur l’intervalle, en construisant ton raisonnement.',prompt:fsFx(poly([1,0,k,-m]))+stx(` sur [${n} ; ${n+1}].`),
    steps:[
      {q:'Continuité :',o:[{h:`f est continue sur [${n} ; ${n+1}], car c’est une fonction polynôme`,ok:true},
        {h:`f est continue, car f(${n}) et f(${n+1}) existent`,why:'Être défini aux bornes ne dit rien de ce qui se passe entre elles : il faut une vraie raison (polynôme, dérivable…).',tag:'fs-tvi'},
        {h:'f est continue, car elle est croissante',why:'Une fonction croissante peut faire des sauts : monotone n’implique pas continue.',tag:'fs-tvi'}]},
      {q:'Valeurs aux bornes :',o:[{h:mx(`f(${n}) = ${num(v1)} &lt; 0 et f(${n+1}) = ${num(v2)} &gt; 0 : f change de signe`),ok:true,sc:true},
        {h:mx(`f(${n}) = ${num(w1)} &gt; 0 et f(${n+1}) = ${num(w2)} &gt; 0 : f ne change pas de signe`),sc:false,why:`Attention au signe de la constante : f(x) contient − ${m}.`,tag:'signe'},
        {h:mx(`f(${n}) = ${num(-v1)} &gt; 0 et f(${n+1}) = ${num(-v2)} &lt; 0 : f change de signe`),sc:true,why:`Recalcule : f(${n}) = ${n**3} + ${k*n} − ${m} = ${num(v1)}.`,tag:'calc'}]},
      {q:'Monotonie :',o:[{h:mx(`f′(x) = 3x<sup>2</sup> + ${k} &gt; 0 : f est strictement croissante`),ok:true,mo:true},
        {h:mx(`f′(x) = 3x<sup>2</sup> : f′ s’annule en 0, f n’est pas monotone`),mo:false,why:`(${k}x)′ = ${k} : f′(x) = 3x² + ${k} ne s’annule jamais.`,tag:'derivee'},
        {h:mx(`f′(x) = 3x<sup>2</sup> + ${k} − ${m} : f n’est pas monotone`),mo:false,why:'La dérivée d’une constante est nulle.',tag:'derivee'}]},
      {q:'Conclusion :',o:prev=>{const k2=!prev[1].sc?2:!prev[2].mo?1:0;return[`L’équation f(x) = 0 a une unique solution dans ]${n} ; ${n+1}[`,'Elle a au moins une solution, sans qu’on sache combien','On ne peut rien conclure'].map((h,i)=>({h,ok:i===k2,
        why:['L’unicité exige la stricte monotonie, que tu n’as pas établie.','Continuité, changement de signe et stricte monotonie donnent une solution, et une seule.','Sans changement de signe, le théorème des valeurs intermédiaires ne s’applique pas.'][k2],tag:'fs-tvi'}))}}],
    explain:`f est continue (polynôme), f(${n}) = ${num(v1)} &lt; 0 &lt; f(${n+1}) = ${num(v2)}, et f′(x) = 3x² + ${k} &gt; 0 : f est strictement croissante. D’après le théorème des valeurs intermédiaires (cas strictement monotone), f(x) = 0 a une unique solution dans ]${n} ; ${n+1}[.`})};
const gFsCvxR2=()=>{const k=nz(-4,4),c=R(-9,9);
  return chain({instr:'Étudie la convexité de f, en construisant ton raisonnement.',prompt:fsFx(poly([1,-3*k,0,c])),
    steps:[
      {q:'f′(x) =',o:[{h:M(poly([3,-6*k,0])),ok:true,cs:[6,-6*k]},{h:M(poly([3,-3*k,0])),cs:[6,-3*k],why:`(${-3*k}x²)′ = ${-6*k}x : on multiplie par l’exposant 2.`,tag:'derivee'},
        {h:M(poly([3,-6*k,c])),cs:[6,-6*k],why:'La constante disparaît en dérivant.',tag:'derivee'}]},
      {q:'f″(x) =',o:prev=>{const t=prev[0].cs;return[[6,-6*k],[6,-3*k],[3,-6*k]].map((cs,i)=>({h:M(poly(cs)),cs,ok:cs[0]===t[0]&&cs[1]===t[1],why:i===2?'(3x²)′ = 6x.':'Dérive ta propre expression de f′ : (ax² + bx)′ = 2ax + b.',tag:'derivee'}))}},
      {q:'Signe de f″ :',o:prev=>{const[A,B]=prev[1].cs,z=fsT(-B,A);return[{h:mx(`f″ ≤ 0 sur ]−∞ ; ${z}] et f″ ≥ 0 sur [${z} ; +∞[`),ok:true,d:'nc',z},
        {h:mx(`f″ ≥ 0 sur ]−∞ ; ${z}] et f″ ≤ 0 sur [${z} ; +∞[`),d:'cn',z,why:'f″ est affine de coefficient positif : négative puis positive.',tag:'signe'},
        {h:mx(`f″ ≤ 0 sur ]−∞ ; ${fsT(B,A)}] et f″ ≥ 0 sur [${fsT(B,A)} ; +∞[`),d:'nc',z:fsT(B,A),why:'f″(x) = 0 ⟺ x = −b/a : attention au signe.',tag:'signe'}]}},
      {q:'Conclusion :',o:prev=>{const{d,z}=prev[2];return[[`f est concave sur ]−∞ ; ${z}] et convexe sur [${z} ; +∞[ ; point d’inflexion d’abscisse ${z}`,'nc'],[`f est convexe sur ]−∞ ; ${z}] et concave sur [${z} ; +∞[ ; point d’inflexion d’abscisse ${z}`,'cn'],['f est convexe sur ℝ','x']]
        .map(([h,c2])=>({h:mx(h),ok:c2===d,why:'f″ ≤ 0 : concave ; f″ ≥ 0 : convexe. Le changement de signe de f″ donne le point d’inflexion.',tag:'fs-convexe'}))}}],
    explain:`f′(x) = 3x² ${fsS(-6*k)} ${Math.abs(6*k)}x, f″(x) = 6x ${fsS(-6*k)} ${Math.abs(6*k)}, qui s’annule en ${num(k)} en passant de − à +. f est concave sur ]−∞ ; ${num(k)}], convexe sur [${num(k)} ; +∞[, et la courbe a un point d’inflexion d’abscisse ${num(k)}.`})};
const gFsCvxR3=()=>{const m=pick([1,2]),b=-3*m,a=pick([-1,-2]),P=3*a*a+2*a*b,fa=a**3+b*a*a,Q=fa-a*P;
  return chain({instr:'Démontre une inégalité grâce à la convexité, en construisant ton raisonnement.',prompt:fsFx(poly([1,b,0,0]))+stx(` On veut comparer f(x) à sa tangente au point d’abscisse ${num(a)}, pour x ≤ ${m}.`),
    steps:[
      {q:`Convexité (f″(x) = 6x ${fsS(2*b)} ${Math.abs(2*b)}) :`,o:[{h:mx(`f est concave sur ]−∞ ; ${m}] et convexe sur [${m} ; +∞[`),ok:true,cv:false},
        {h:mx(`f est convexe sur ]−∞ ; ${m}] et concave sur [${m} ; +∞[`),cv:true,why:`f″(x) ≤ 0 pour x ≤ ${m} : f est concave sur cet intervalle.`,tag:'fs-convexe'},
        {h:mx('f est convexe sur ℝ'),cv:true,why:`f″ change de signe en ${m} : la convexité change.`,tag:'fs-convexe'}]},
      {q:`Tangente au point d’abscisse ${num(a)} (f(${num(a)}) = ${num(fa)}, f′(${num(a)}) = ${num(P)}) :`,o:[
        {h:mx('y = ')+fsLin(P,Q),ok:true,A:P,B:Q},{h:mx('y = ')+fsLin(fa,P-a*fa),A:fa,B:P-a*fa,why:'y = f′(a)(x − a) + f(a) : la pente est f′(a), pas f(a).',tag:'tangente'},
        {h:mx('y = ')+fsLin(P,P*a+fa),A:P,B:P*a+fa,why:`x − (${num(a)}) = x + ${-a} : attention au signe dans (x − a).`,tag:'signe'}]},
      {q:`Sur ]−∞ ; ${m}], la courbe de f est :`,o:prev=>{const k=prev[0].cv?1:0;return['en dessous de ses tangentes','au-dessus de ses tangentes','tantôt au-dessus, tantôt en dessous'].map((h,i)=>({h,ok:i===k,why:'Concave : sous ses tangentes ; convexe : au-dessus.',tag:'fs-convexe'}))}},
      {q:`Conclusion, pour tout x ≤ ${m} :`,o:prev=>{const{A,B}=prev[1],k=prev[2].h.startsWith('au-dessus')?1:prev[2].h.startsWith('en')?0:2,T=fsLin(A,B).replace(/^<span class="m">|<\/span>$/g,'');
        return[`f(x) ≤ ${T}`,`f(x) ≥ ${T}`,`f(x) = ${T}`].map((h,i)=>({h:mx(h),ok:i===k,why:'Courbe sous la tangente ⟺ f(x) ≤ (équation de la tangente).',tag:'fs-convexe'}))}}],
    explain:`f″(x) = 6x ${fsS(2*b)} ${Math.abs(2*b)} ≤ 0 pour x ≤ ${m} : f est concave sur ]−∞ ; ${m}], donc sous ses tangentes. La tangente en ${num(a)} est y = ${fsLin(P,Q)}. Donc pour tout x ≤ ${m} : x³ ${fsS(b)} ${Math.abs(b)}x² ≤ ${fsLin(P,Q)}.`})};

/* ===================== Chapitre fs-exp : fonction exponentielle ===================== */
const fsEx=s=>`e<sup>${s}</sup>`;
const gFsExpSimp=()=>{const v=R(0,2),a=nz(-7,9),b=nz(-6,6),c=nz(-6,6);let P,k,e;
  if(v===0){P=fr(`${fsEx(num(a))} × ${fsEx(num(b))}`,fsEx(num(c)));k=a+b-c;e=`On additionne les exposants du produit, puis on soustrait celui du dénominateur : ${num(a)} + ${b<0?`(${num(b)})`:b} − ${c<0?`(${num(c)})`:c} = ${num(k)}.`}
  else if(v===1){P=`(${fsEx(num(a))})<sup>${num(b)}</sup> × ${fsEx(num(c))}`;k=a*b+c;e=`(e<sup>a</sup>)<sup>n</sup> = e<sup>na</sup> : ${num(a)} × ${b<0?`(${num(b)})`:b} = ${num(a*b)}, puis on ajoute ${num(c)} : ${num(k)}.`}
  else{P=fr(1,`(${fsEx(num(a))})<sup>${num(b)}</sup>`);k=-a*b;e=`(e<sup>${num(a)}</sup>)<sup>${num(b)}</sup> = e<sup>${num(a*b)}</sup>, et 1/e<sup>X</sup> = e<sup>−X</sup> : k = ${num(k)}.`}
  return fsNq({instr:'Écris sous la forme e<sup>k</sup>. Que vaut k ?',prompt:mx(P),labels:['k ='],t:[k],explain:e,hint:'e<sup>a</sup>e<sup>b</sup> = e<sup>a+b</sup>, e<sup>a</sup>/e<sup>b</sup> = e<sup>a−b</sup>, (e<sup>a</sup>)<sup>n</sup> = e<sup>na</sup>.',
    diag:([w])=>v===1&&near(w,a+b+c,1e-6)||v===0&&near(w,a+b+c,1e-6)?'puiss':null})};
const gFsExpDer1=()=>{const v=R(0,2),a=nz(-6,6),b=nz(-9,9),k=nz(-5,5);let F,t,e,w;
  if(v===0){F=`${num(a)}${fsEx('x')} ${fsS(b)} ${Math.abs(b)}x`;t=`${a}e^x${sg(b)}`;w=`${a}e^x`;e=`(e<sup>x</sup>)′ = e<sup>x</sup> et (${b}x)′ = ${b}.`}
  else if(v===1){F=`${num(a)}${fsEx(`${num(k)}x`)}`;t=`${a*k}e^(${k}x)`;w=`${a}e^(${k}x)`;e=`(e<sup>kx</sup>)′ = k e<sup>kx</sup> : ${a} × ${k<0?`(${num(k)})`:k} = ${num(a*k)}.`}
  else{F=`${num(a)}${fsEx('x')} ${fsS(-b)} ${Math.abs(b)}x<sup>2</sup>`;t=`${a}e^x${sg(-2*b)}x`;w=`${a}e^x`;e=`(e<sup>x</sup>)′ = e<sup>x</sup> et (x²)′ = 2x.`}
  return exprQ('Dérive la fonction.',mx(`f(x) = ${F}`),'f ′(x) =',t,e,'(eˣ)′ = eˣ et (e<sup>kx</sup>)′ = k e<sup>kx</sup>.',false,([u])=>eqv(u,w)?'derivee':null)};
const gFsExpDer2=()=>{const v=R(0,4),a=R(-4,4),k=nz(-4,4),c=nz(-5,5);let F,t,e,w;
  if(v===0){F=`(${fsXa(a)})${fsEx('x')}`;t=`(x${sg(a+1)})e^x`;w='e^x';e=`(uv)′ = u′v + uv′ = 1 × e<sup>x</sup> + (${fsXa(a)})e<sup>x</sup> = (${fsXa(a+1)})e<sup>x</sup>.`}
  else if(v===1){F=fr(fsEx('x'),'x');t='e^x(x-1)/x^2';w='e^x';e='(u/v)′ = (u′v − uv′)/v² = (x e<sup>x</sup> − e<sup>x</sup>)/x² = e<sup>x</sup>(x − 1)/x².'}
  else if(v===2){F=`x${fsEx(`${k}x`)}`;t=`(1${sg(k)}x)e^(${k}x)`;w=`${k}e^(${k}x)`;e=`(uv)′ = 1 × e<sup>${k}x</sup> + x × ${k}e<sup>${k}x</sup> = (1 ${fsS(k)} ${Math.abs(k)}x)e<sup>${k}x</sup>.`}
  else if(v===3){F=fsEx(`x<sup>2</sup> ${fsS(c)} ${Math.abs(c)}`);t=`2xe^(x^2${sg(c)})`;w=`e^(x^2${sg(c)})`;e=`(e<sup>u</sup>)′ = u′e<sup>u</sup> avec u = x² ${fsS(c)} ${Math.abs(c)}, u′ = 2x.`}
  else{F=fsEx('1/x');t='-e^(1/x)/x^2';w='e^(1/x)';e='(e<sup>u</sup>)′ = u′e<sup>u</sup> avec u = 1/x, u′ = −1/x².'}
  return exprQ('Dérive la fonction.',mx(`f(x) = ${F}`),'f ′(x) =',t,e,'Produit : u′v + uv′ ; composée : (e<sup>u</sup>)′ = u′e<sup>u</sup>.',false,([u])=>eqv(u,w)?(v>=3?'chaine':'derivee'):null)};
const gFsExpEq2=()=>{const r1=R(-6,4),r2=R(r1+1,6),q=r1+r2,p=r1*r2;
  return fsNq({instr:'Résous l’équation (x₁ < x₂).',prompt:mx(`${fsEx(`x<sup>2</sup>${p?` ${fsS(p)} ${Math.abs(p)}`:''}`)} = ${fsEx(`${num(q)}x`)}`),labels:['x₁ =','x₂ ='],t:[r1,r2],
    explain:`e<sup>A</sup> = e<sup>B</sup> ⟺ A = B : x² ${p?`${fsS(p)} ${Math.abs(p)} `:''}= ${num(q)}x, soit ${M(poly([1,-q,p]))} = 0. Δ = ${q*q-4*p}, solutions ${num(r1)} et ${num(r2)}.`,
    hint:'Deux exponentielles sont égales quand leurs exposants le sont.',diag:([u,v])=>near(u,-r2,1e-6)&&near(v,-r1,1e-6)?'signe':null})};
const gFsExpIneq=()=>{const a=nz(-5,5),b=R(-9,9),c=pick([0,0,R(-6,6)]),s=pick(['≥','&lt;']),ge=s==='≥',lim=fsQ(c-b,a),wr=fsQ(b-c,a);const up=ge===(a>0);
  const I=(u,v)=>u?(ge?`[${v} ; +∞[`:`]${v} ; +∞[`):(ge?`]−∞ ; ${v}]`:`]−∞ ; ${v}[`),ok=I(up,lim);
  return mcq('Résous l’inéquation.',mx(`${fsEx(`${num(a)}x ${fsS(b)} ${Math.abs(b)}`)} ${s} ${c?fsEx(num(c)):'1'}`),[{h:mx(ok),ok:true},{h:mx(I(!up,lim)),tag:'ineq-flip'},{h:mx(I(up,wr)),tag:'signe'},{h:mx(ge?(up?`]${lim} ; +∞[`:`]−∞ ; ${lim}[`):(up?`[${lim} ; +∞[`:`]−∞ ; ${lim}]`)),tag:'bracket'}],
    `${c?'':'1 = e<sup>0</sup>. '}e<sup>A</sup> ${s} e<sup>B</sup> ⟺ A ${s} B (exp est strictement croissante) : ${a}x ${fsS(b)} ${Math.abs(b)} ${s} ${num(c)}, soit ${a}x ${s} ${num(c-b)}. ${a<0?'On divise par '+a+' &lt; 0 : le sens change. ':''}S = ${ok}.`,
    'Écris les deux membres comme des exponentielles, compare les exposants. Attention en divisant par un négatif.')};
const FS_EL=[['e<sup>−x</sup>','+∞',0,'−x → −∞ et e<sup>X</sup> → 0 quand X → −∞.'],['e<sup>x</sup>','−∞',0,'Limite de référence.'],['x + e<sup>−3x</sup>','+∞',1,'e<sup>−3x</sup> → 0 et x → +∞ : somme → +∞.'],
  ['e<sup>1 − 1/x</sup>','−∞',4,'1 − 1/x → 1, donc e<sup>1 − 1/x</sup> → e<sup>1</sup> = e (fonction composée).'],[fr('e<sup>x</sup>','x<sup>3</sup>'),'+∞',1,'Croissances comparées : l’exponentielle l’emporte sur toute puissance.'],
  ['x e<sup>x</sup>','−∞',0,'Croissances comparées : lim<sub>x→−∞</sub> x e<sup>x</sup> = 0.'],['x e<sup>−x</sup>','+∞',0,'x e<sup>−x</sup> = x/e<sup>x</sup> → 0 par croissances comparées.'],['e<sup>x</sup> − x','+∞',1,'e<sup>x</sup> − x = x(e<sup>x</sup>/x − 1) et e<sup>x</sup>/x → +∞.'],['e<sup>−x</sup>','−∞',1,'−x → +∞, donc e<sup>−x</sup> → +∞.']];
const gFsExpLim=()=>{const[e,p,c,w]=pick(FS_EL),O=['0','+∞','−∞','1','e'];
  return mcq('Quelle est la limite ?',fsLim(mx(e),p),O.map((h,i)=>i===c?{h:mx(h),ok:true}:{h:mx(h),tag:'fs-cc'}),w,'Limites de référence : eˣ → +∞ en +∞, eˣ → 0 en −∞ ; en cas de conflit, l’exponentielle l’emporte sur les puissances.',true)};
const gFsExpMod=()=>{const A=pick([200,500,1000,2000]),k=pick([.05,.1,.12,.14,-.2,-.1]),t=R(2,10),v=A*Math.exp(k*t);
  return fsNq({instr:'Calcule f(t). Arrondis à l’unité.',prompt:stx(`Une quantité est modélisée par f(t) = ${A} e<sup>${num(k)}t</sup> (t en heures). Que vaut f(${t}) ?`),labels:[`f(${t}) ≈`],t:[v],tol:.5,
    explain:`f(${t}) = ${A} × e<sup>${num(k)} × ${t}</sup> = ${A} × e<sup>${num(+(k*t).toFixed(3))}</sup> ≈ ${dec(v,1)}, soit environ ${Math.round(v)}. La fonction est ${k>0?'croissante (k &gt; 0)':'décroissante (k &lt; 0)'}.`,
    hint:'Remplace t, calcule l’exposant, puis utilise la touche eˣ.',diag:([w])=>near(w,A*Math.exp(k)*t,1)?'calc':null})};
/* raisonnements exponentielle */
const gFsExpR1=()=>{const a=R(-3,3),fc=(c,z)=>c===0?'0':z===0?num(c):`${c===1?'':c===-1?MINUS:num(c)}${fsEx(num(z))}`;
  return chain({instr:'Étudie les variations de f, en construisant ton raisonnement.',prompt:mx(`f(x) = (${fsXa(a)})${fsEx('x')}`),
    steps:[
      {q:'f′(x) =',o:[{h:mx(`${fsEx('x')} + (${fsXa(a)})${fsEx('x')}`),ok:true,c:0},{h:mx(`(${fsXa(a)})${fsEx('x')}`),c:1,why:'Il manque u′v : (uv)′ = u′v + uv′, avec u′ = 1.',tag:'derivee'},
        {h:mx(`${fsEx('x')} − (${fsXa(a)})${fsEx('x')}`),c:2,why:'La dérivée d’un produit est une somme : u′v + uv′.',tag:'derivee'}]},
      {q:'On factorise par eˣ :',o:prev=>[[1,a+1],[1,a],[-1,1-a]].map((L,i)=>({h:mx(`f′(x) = ${fsEx('x')}(`)+M(poly(L))+mx(')'),L,ok:i===prev[0].c,why:'Factorise ta propre expression de f′ : eˣ est en facteur dans chaque terme.',tag:'calc'}))},
      {q:'Signe de f′(x) :',o:prev=>{const[c1,c0]=prev[1].L,z=-c0/c1,np=c1>0;return[{h:mx(`négative sur ]−∞ ; ${num(z)}], positive sur [${num(z)} ; +∞[`),d:'np',z,ok:np},
        {h:mx(`positive sur ]−∞ ; ${num(z)}], négative sur [${num(z)} ; +∞[`),d:'pn',z,ok:!np},{h:'toujours positive, car eˣ > 0',d:'p',z,why:'eˣ &gt; 0, donc f′ a le signe de l’autre facteur, qui change de signe.',tag:'signe'}]
        .map(o=>o.ok||o.why?o:Object.assign(o,{why:'eˣ &gt; 0 : f′(x) a le signe du facteur affine, qui est '+(np?'croissant (négatif puis positif).':'décroissant (positif puis négatif).'),tag:'signe'}))}},
      {q:'Donc f admet :',o:prev=>{const{d,z}=prev[2],V=fc(z+a,z);return[[`un minimum en x = ${num(z)}, égal à ${V}`,'np'],[`un maximum en x = ${num(z)}, égal à ${V}`,'pn'],['aucun extremum : f est croissante sur ℝ','p']]
        .map(([h,c])=>({h:mx(h),ok:c===d,why:'f′ négative puis positive : f descend puis remonte (minimum) ; l’inverse donne un maximum.',tag:'extremum'}))}}],
    explain:`f′(x) = eˣ + (${fsXa(a)})eˣ = eˣ(${fsXa(a+1)}). Comme eˣ &gt; 0, f′ a le signe de ${fsXa(a+1)} : négative avant ${num(-a-1)}, positive après. f admet un minimum f(${num(-a-1)}) = ${fc(-1,-a-1)}.`})};
const gFsExpR2=()=>{const a=R(1,5),b=R(2,4);
  return chain({instr:'Calcule la limite, en construisant ton raisonnement.',prompt:`<span class="m">lim<sub>x→+∞</sub></span> `+mx(fr(`${fsEx('x')} + ${a>1?a:''}x`,`${b}${fsEx('x')} − x<sup>2</sup>`)),
    steps:[
      {q:'En passant directement à la limite :',o:[{h:'le dénominateur donne « ∞ − ∞ » : forme indéterminée',ok:true},{h:'le dénominateur tend vers −∞, car x² l’emporte',why:'C’est l’inverse : en +∞, eˣ l’emporte sur toute puissance de x.',tag:'fs-cc'},
        {h:'« ∞/∞ » vaut 1',why:'∞/∞ est une forme indéterminée, pas 1.',tag:'fi'}]},
      {q:'On factorise par eˣ en haut et en bas :',o:[{h:mx(fr(`1 + ${a>1?a:''}${fr('x',fsEx('x'))}`,`${b} − ${fr('x<sup>2</sup>',fsEx('x'))}`)),ok:true,c:0},
        {h:mx(fr(`1 + ${a>1?a:''}x`,`${b} − x<sup>2</sup>`)),c:1,why:'En factorisant par eˣ, chaque terme est divisé par eˣ : ax devient ax/eˣ.',tag:'calc'}]},
      {q:'Par croissances comparées, quand x → +∞ :',o:[{h:mx(`${fr('x',fsEx('x'))} → 0 et ${fr('x<sup>2</sup>',fsEx('x'))} → 0`),ok:true,c:0},{h:mx(`${fr('x',fsEx('x'))} → 1`),c:1,why:'eˣ devient bien plus grand que x : le quotient tend vers 0.',tag:'fs-cc'},
        {h:mx(`${fr('x<sup>2</sup>',fsEx('x'))} → +∞`),c:2,why:'eˣ l’emporte sur x² : x²/eˣ → 0.',tag:'fs-cc'}]},
      {q:'La limite vaut :',o:prev=>{const k=prev[1].c===1?1:[0,2,1][prev[2].c];return[fsQ(1,b),'0',fsQ(1+a,b),'+∞'].map((h,i)=>({h:mx(h),ok:i===k,why:'Remplace chaque terme par sa limite dans l’expression obtenue.',tag:'fs-cc'}))}}],
    explain:`On factorise par eˣ : (1 + ${a}x/eˣ)/(${b} − x²/eˣ). Par croissances comparées, x/eˣ → 0 et x²/eˣ → 0 : la limite vaut 1/${b}.`})};
const gFsExpR3=()=>{const k=pick([2,3,4,5]),E=fsEx(`−x/${k}`),fc=c=>c===-1/k?`−${fr(1,k)}`:c===1?'':fr(1,k);
  return chain({instr:'Étudie les variations de f, en construisant ton raisonnement.',prompt:mx(`f(x) = x${E}`),
    steps:[
      {q:`Dérivée de ${E} :`,o:[{h:mx(`−${fr(1,k)}${E}`),c:-1/k,ok:true},{h:mx(E),c:1,why:`(e<sup>u</sup>)′ = u′e<sup>u</sup> avec u = −x/${k}, u′ = −1/${k}.`,tag:'chaine'},{h:mx(`${fr(1,k)}${E}`),c:1/k,why:`u = −x/${k} : u′ = −1/${k}, avec le signe moins.`,tag:'signe'}]},
      {q:'Donc f′(x) =',o:prev=>{const c=prev[0].c;return[[-1/k,`(1 − ${fr('x',k)})${E}`],[1,`(1 + x)${E}`],[1/k,`(1 + ${fr('x',k)})${E}`]].map(([cc,h])=>({h:mx(h),c:cc,ok:cc===c,why:'(uv)′ = u′v + uv′ = 1 × e<sup>u</sup> + x × (ta dérivée de e<sup>u</sup>), puis factorise.',tag:'derivee'}))
        .concat([{h:mx(`−${fr(1,k)}${E}`),c:-1/k,why:'Tu as fait u′ × v′ : la dérivée d’un produit est u′v + uv′.',tag:'derivee'}])}},
      {q:'Signe de f′(x) :',o:prev=>{const c=prev[1].c,z=Math.round(-1/c),pn=c<0,Z=num(+z.toFixed(4));return[{h:mx(`positive sur ]−∞ ; ${Z}], négative sur [${Z} ; +∞[`),d:'pn',z,ok:pn},
        {h:mx(`négative sur ]−∞ ; ${Z}], positive sur [${Z} ; +∞[`),d:'np',z,ok:!pn},{h:'toujours positive, car l’exponentielle est positive',d:'p',z,why:'L’exponentielle est positive, mais l’autre facteur change de signe.',tag:'signe'}]
        .map(o=>o.ok||o.why?o:Object.assign(o,{why:'L’exponentielle est positive : f′ a le signe du facteur affine.',tag:'signe'}))}},
      {q:'Donc f admet :',o:prev=>{const{d,z}=prev[2],V=z===k?`${k}/e`:z===-1?`−e<sup>1/${k}</sup>`:`−${k}e`,Z=num(+z.toFixed(4));
        return[[`un maximum en x = ${Z}, égal à ${V}`,'pn'],[`un minimum en x = ${Z}, égal à ${V}`,'np'],['aucun extremum','p']].map(([h,c])=>({h:mx(h),ok:c===d,why:'f′ positive puis négative : f monte puis descend, maximum ; l’inverse donne un minimum.',tag:'extremum'}))}}],
    explain:`f′(x) = e<sup>−x/${k}</sup> + x × (−1/${k})e<sup>−x/${k}</sup> = (1 − x/${k})e<sup>−x/${k}</sup>. f′ est positive avant ${k}, négative après : maximum f(${k}) = ${k}e<sup>−1</sup> = ${k}/e.`})};

/* ===================== Chapitre fs-ln : logarithme népérien ===================== */
const gFsLnVal=()=>{const v=R(0,4),k=nz(-5,7),a=R(2,20);let P,t,ex,e;
  if(v===0){P=`ln(${fsEx(num(k))})`;t=k;ex=String(k);e=`ln(eˣ) = x : ln(e<sup>${num(k)}</sup>) = ${num(k)}.`}
  else if(v===1){P=`${fsEx(`ln ${a}`)}`;t=a;ex=String(a);e=`e<sup>ln a</sup> = a pour a &gt; 0 : le résultat est ${a}.`}
  else if(v===2){P=`ln(${fr(1,fsEx(num(k)))})`;t=-k;ex=String(-k);e=`ln(1/X) = −ln X, donc ln(1/e<sup>${num(k)}</sup>) = −(${num(k)}) = ${num(-k)}.`}
  else if(v===3){P='ln(√e)';t=.5;ex='1/2';e='ln(√e) = ½ ln(e) = ½.'}
  else{const b=nz(-4,4);P=`ln(${fsEx(num(k))} × ${fsEx(num(b))})`;t=k+b;ex=String(k+b);e=`e<sup>${num(k)}</sup> × e<sup>${num(b)}</sup> = e<sup>${num(k+b)}</sup>, et ln(e<sup>${num(k+b)}</sup>) = ${num(k+b)}.`}
  return fsNq({instr:'Calcule (valeur exacte).',prompt:mx(P),labels:['Résultat ='],t:[t],ex:[ex],explain:e,hint:'ln et exp se « défont » : ln(eˣ) = x et e<sup>ln x</sup> = x (x > 0).',diag:([w])=>v===2&&near(w,k,1e-6)?'signe':null})};
const gFsLnSimp=()=>{const v=R(0,2);
  if(v===0){const p=R(1,4),q=R(1,3),B=pick([5,7]),n=2**p*B,d=3**q;
    return fsNq({instr:'Écris sous la forme ln(K). Que vaut K ?',prompt:mx(`${p>1?p+' ':''}ln 2 + ln ${B} − ${q>1?q+' ':''}ln 3`),labels:['K ='],t:[n/d],ex:[fsE(n,d)],
      explain:`n ln a = ln(aⁿ) : ${p>1?`ln(2<sup>${p}</sup>)`:'ln 2'} + ln ${B} − ${q>1?`ln(3<sup>${q}</sup>)`:'ln 3'} = ln(${2**p} × ${B} ÷ ${d}) = ln(${fsT(n,d)}).`,hint:'n ln a = ln(aⁿ), ln a + ln b = ln(ab), ln a − ln b = ln(a/b).',diag:([w])=>near(w,2*p+B-3*q,1e-6)?'log-prod':null})}
  if(v===1){const k=R(1,4),m=pick([2,3,5,7]);
    return fsNq({instr:'Simplifie (valeur exacte, avec ln).',prompt:mx(`ln(${fsEx(k)}) − ln(${fr(m,'e')})`),labels:['Résultat ='],t:[k+1-Math.log(m)],ex:[`${k+1}-ln(${m})`],
      explain:`ln(e<sup>${k}</sup>) = ${k} et ln(${m}/e) = ln ${m} − ln e = ln ${m} − 1. Donc ${k} − (ln ${m} − 1) = ${k+1} − ln ${m}.`,hint:'ln(a/b) = ln a − ln b, et ln e = 1.',diag:([w])=>near(w,k-1-Math.log(m),1e-6)?'log-quot':null})}
  let a,b;do{a=R(2,6);b=pick([2,3,5,6,7])}while(a*a<=b);
  return fsNq({instr:'Écris sous la forme ln(K). Que vaut K ?',prompt:mx(`ln(${a} − √${b}) + ln(${a} + √${b})`),labels:['K ='],t:[a*a-b],
    explain:`ln A + ln B = ln(AB), et (${a} − √${b})(${a} + √${b}) = ${a*a} − ${b} = ${a*a-b}. Donc K = ${a*a-b}.`,hint:'ln A + ln B = ln(AB), puis (a − b)(a + b) = a² − b².',diag:([w])=>near(w,2*a,1e-6)?'log-prod':null})};
const gFsLnEq=()=>{const v=R(0,3);
  if(v===0){const a=nz(-5,5),b=R(2,12);return fsNq({instr:'Résous l’équation (valeur exacte).',prompt:mx(`${fsEx(`x ${fsS(a)} ${Math.abs(a)}`)} = ${b}`),labels:['x ='],t:[Math.log(b)-a],ex:[`ln(${b})${sg(-a)}`],
    explain:`On applique ln : x ${fsS(a)} ${Math.abs(a)} = ln ${b}, donc x = ln ${b} ${fsS(-a)} ${Math.abs(a)}.`,hint:'eᵘ = b ⟺ u = ln b (b > 0).',diag:([w])=>near(w,Math.log(b)+a,1e-6)?'signe':near(w,b-a,1e-6)?'log-def':null})}
  if(v===1){const k=nz(-3,5);return fsNq({instr:'Résous l’équation sur ]0 ; +∞[ (valeur exacte).',prompt:mx(`ln x = ${num(k)}`),labels:['x ='],t:[Math.exp(k)],ex:[`e^(${k})`],
    explain:`ln x = ${num(k)} ⟺ x = e<sup>${num(k)}</sup> (qui est bien positif).`,hint:'ln x = k ⟺ x = eᵏ.',diag:([w])=>near(w,Math.log(Math.abs(k)),1e-6)?'log-def':null})}
  if(v===2){const a=R(2,6),b=R(-9,9);return fsNq({instr:'Résous l’équation.',prompt:mx(`ln(${a}x ${fsS(b)} ${Math.abs(b)}) = 0`),labels:['x ='],t:[(1-b)/a],ex:[fsE(1-b,a)],
    explain:`ln X = 0 ⟺ X = 1 : ${a}x ${fsS(b)} ${Math.abs(b)} = 1, donc x = ${fsQ(1-b,a)} (et alors ${a}x ${fsS(b)} ${Math.abs(b)} = 1 &gt; 0).`,hint:'ln 1 = 0.',diag:([w])=>near(w,-b/a,1e-6)?'log-def':null})}
  const a=R(2,5),c=R(2,30);return fsNq({instr:'Résous l’équation (valeur exacte).',prompt:mx(`${fsEx(`${a}x`)} = ${c}`),labels:['x ='],t:[Math.log(c)/a],ex:[`ln(${c})/${a}`],
    explain:`${a}x = ln ${c}, donc x = ln(${c})/${a}.`,hint:'Applique ln aux deux membres.',diag:([w])=>near(w,Math.log(c/a),1e-6)?'log-quot':null})};
const gFsLnIneq=()=>{if(Math.random()<.5){const c=R(2,9),d=R(2,6),Q=fsQ(c,d-1),Qi=fsQ(d-1,c);
    return mcq('Résous l’inéquation.',mx(`${fsEx('x')} + ${c} &gt; ${d}${fsEx('x')}`),[{h:mx(`]−∞ ; ln(${Q})[`),ok:true},{h:mx(`]ln(${Q}) ; +∞[`),tag:'ineq-flip'},{h:mx(`]−∞ ; ${Q}[`),tag:'log-def'},{h:mx(`]−∞ ; ln(${Qi})[`),tag:'calc'}],
      `eˣ − ${d}eˣ &gt; −${c} ⟺ −${d>2?d-1:''}eˣ &gt; −${c} ⟺ eˣ &lt; ${fsT(c,d-1)} (division par un négatif : le sens change) ⟺ x &lt; ln(${fsT(c,d-1)}). S = ]−∞ ; ln(${Q})[.`,'Regroupe les eˣ, isole eˣ, puis applique ln (croissante).')}
  const a=R(2,6),k=R(1,3),E=fr(`e<sup>${k}</sup> + 1`,a);
  return mcq('Résous l’inéquation sur ]1/'+a+' ; +∞[.',mx(`ln(${a}x − 1) ≥ ${k}`),[{h:mx(`[${E} ; +∞[`),ok:true},{h:mx(`]−∞ ; ${E}]`),tag:'ineq-flip'},{h:mx(`[${fr(`e<sup>${k}</sup> − 1`,a)} ; +∞[`),tag:'signe'},{h:mx(`[${fr(`${k} + 1`,a)} ; +∞[`),tag:'log-def'}],
    `ln(${a}x − 1) ≥ ${k} = ln(e<sup>${k}</sup>) ⟺ ${a}x − 1 ≥ e<sup>${k}</sup> (ln croissante) ⟺ x ≥ (e<sup>${k}</sup> + 1)/${a}. Cet intervalle est bien inclus dans le domaine.`,'Écris k = ln(eᵏ), puis compare ce qui est dans les ln.')};
const gFsLnDer=()=>{const v=R(0,4),a=R(2,5),b=R(1,6),c=R(1,9);let F,t,e,w;
  if(v===0){F=fr('ln x','x');t='(1-ln(x))/x^2';w='1/x';e='(u/v)′ = ((1/x) × x − ln x × 1)/x² = (1 − ln x)/x².'}
  else if(v===1){F='(ln x)<sup>2</sup>';t='2ln(x)/x';w='2ln(x)';e='(u²)′ = 2u′u avec u = ln x, u′ = 1/x : 2 ln(x)/x.'}
  else if(v===2){F='x ln x';t='ln(x)+1';w='1/x';e='(uv)′ = 1 × ln x + x × 1/x = ln x + 1.'}
  else if(v===3){F=`ln(${a}x + ${b})`;t=`${a}/(${a}x+${b})`;w=`1/(${a}x+${b})`;e=`(ln u)′ = u′/u avec u = ${a}x + ${b}, u′ = ${a}.`}
  else{F=`ln(x<sup>2</sup> + ${c})`;t=`2x/(x^2+${c})`;w=`1/(x^2+${c})`;e=`(ln u)′ = u′/u avec u′ = 2x.`}
  return exprQ('Dérive la fonction.',mx(`f(x) = ${F}`),'f ′(x) =',t,e,'(ln x)′ = 1/x et (ln u)′ = u′/u.',false,([u])=>eqv(u,w)?'chaine':null)};
const FS_LL=[[fr('ln x','x'),'+∞',0,'Croissances comparées : x l’emporte sur ln x.'],['x ln x','0<sup>+</sup>',0,'Croissances comparées : lim<sub>x→0</sub> x ln x = 0.'],['x − ln x','+∞',1,'x − ln x = x(1 − ln(x)/x) et ln(x)/x → 0 : la limite vaut +∞.'],
  [fr('ln x','x − 1'),'+∞',0,'On divise par x : (ln(x)/x)/(1 − 1/x) → 0/1 = 0.'],['ln x','0<sup>+</sup>',2,'Limite de référence : ln x → −∞ en 0.'],['x<sup>2</sup> ln x','0<sup>+</sup>',0,'Croissances comparées : xⁿ ln x → 0 en 0.'],
  ['ln x − x','+∞',2,'ln x − x = −x(1 − ln(x)/x) → −∞.'],[fr('x','ln x'),'+∞',1,'C’est l’inverse de ln(x)/x, qui tend vers 0 par valeurs positives : +∞.']];
const gFsLnLim=()=>{const[e,p,c,w]=pick(FS_LL),O=['0','+∞','−∞','1'];
  return mcq('Quelle est la limite ?',fsLim(mx(e),p),O.map((h,i)=>i===c?{h:mx(h),ok:true}:{h:mx(h),tag:'fs-cc'}),w,'En +∞, toute puissance de x l’emporte sur ln x ; en 0, xⁿ ln x → 0.',true)};
const gFsLnDom=()=>{const a=nz(-4,4),b=R(-9,9),z=fsQ(-b,a),up=a>0;
  return mcq('Quel est l’ensemble de définition ?',mx(`f(x) = ln(${a===-1?MINUS:num(a)}x ${fsS(b)} ${Math.abs(b)})`),[{h:mx(up?`]${z} ; +∞[`:`]−∞ ; ${z}[`),ok:true},{h:mx(up?`[${z} ; +∞[`:`]−∞ ; ${z}]`),tag:'bracket'},
    {h:mx(up?`]−∞ ; ${z}[`:`]${z} ; +∞[`),tag:'ineq-flip'},{h:mx(']0 ; +∞['),tag:'domaine'}],
    `ln n’est défini que pour un nombre strictement positif : ${num(a)}x ${fsS(b)} ${Math.abs(b)} &gt; 0 ⟺ x ${up?'&gt;':'&lt;'} ${fsT(-b,a)}${up?'':' (division par un négatif : le sens change)'}.`,'Résous « ce qui est dans le ln > 0 ».')};
/* raisonnements logarithme */
const gFsLnR1=()=>{const a=R(-2,4),b=a+R(3,6),T=fsRoots(1,-(a+b),a*b+1);
  return chain({instr:'Résous l’équation, en construisant ton raisonnement.',prompt:mx(`ln(${fsXa(-a)}) + ln(${num(b)} − x) = 0`),
    steps:[
      {q:'Sur quel intervalle résout-on ?',o:[{h:mx(`]${num(a)} ; ${num(b)}[`),ok:true},{h:mx(`]−∞ ; ${num(a)}[ ∪ ]${num(b)} ; +∞[`),why:`Il faut x − ${a<0?`(${num(a)})`:a} &gt; 0 ET ${num(b)} − x &gt; 0, soit x entre ${num(a)} et ${num(b)}.`,tag:'domaine'},
        {h:mx(']0 ; +∞['),why:'Ce n’est pas x qui doit être positif, mais chaque expression placée dans un ln.',tag:'domaine'}]},
      {q:'On transforme l’équation :',o:[{h:mx(`ln((${fsXa(-a)})(${num(b)} − x)) = 0, donc (${fsXa(-a)})(${num(b)} − x) = 1`),ok:true,c:0},
        {h:mx(`(${fsXa(-a)})(${num(b)} − x) = 0`),c:1,why:'ln X = 0 ⟺ X = 1 (car ln 1 = 0), pas X = 0.',tag:'log-def'},
        {h:mx(`(${fsXa(-a)}) + (${num(b)} − x) = 1`),c:2,why:'ln A + ln B = ln(AB), pas ln(A + B).',tag:'log-prod'}]},
      {q:'On résout :',o:prev=>{const k=prev[1].c;return[[mx(`x<sup>2</sup> ${fsS(-(a+b))} ${Math.abs(a+b)}x ${fsS(a*b+1)} ${Math.abs(a*b+1)} = 0 : x = ${T[0].t} ou x = ${T[1].t}`),'C’est le bon calcul, mais il ne découle pas de ta transformation.'],
        [mx(`x = ${num(a)} ou x = ${num(b)}`),'Ce sont les solutions de (x − a)(b − x) = 0, qui n’est pas la bonne équation.'],[mx(`${num(b-a)} = 1 : aucune solution`),'x disparaît car la transformation (somme au lieu de produit) est fausse.']]
        .map(([h,why],i)=>({h,c:i,ok:i===k,why,tag:'calc'}))}},
      {q:'Ensemble des solutions :',o:prev=>{const k=prev[2].c===0?0:2;return[[mx(`S = {${T[0].t} ; ${T[1].t}}`),'Les deux nombres trouvés sont bien dans l’intervalle de résolution.'],[mx(`S = {${num(a)} ; ${num(b)}}`),`${num(a)} et ${num(b)} sont exclus : ln 0 n’existe pas.`],[mx('S = ∅'),'Relis l’étape précédente.']]
        .map(([h,why],i)=>({h,ok:i===k,why,tag:'domaine'}))}}],
    explain:`On résout sur ]${num(a)} ; ${num(b)}[. ln((x − ${a<0?`(${num(a)})`:a})(${num(b)} − x)) = 0 ⟺ (x − ${a<0?`(${num(a)})`:a})(${num(b)} − x) = 1 ⟺ x² ${fsS(-(a+b))} ${Math.abs(a+b)}x ${fsS(a*b+1)} ${Math.abs(a*b+1)} = 0. Δ = ${T.D}, x = ${T[0].t} ou ${T[1].t}, toutes deux dans l’intervalle.`})};
const gFsLnR2=()=>{const k=pick([2,3,5,6]),c=R(-3,5);
  return chain({instr:'Étudie f sur ]0 ; +∞[, en construisant ton raisonnement.',prompt:mx(`f(x) = ${c?num(c)+' − x':'−x'} + ${k} ln x`),
    steps:[
      {q:'f′(x) =',o:[{h:mx(`−1 + ${fr(k,'x')}`),ok:true,c:0},{h:mx(`−x + ${fr(k,'x')}`),c:1,why:'La dérivée de −x est −1.',tag:'derivee'},{h:mx(`−1 + ${k} ln x`),c:2,why:'(ln x)′ = 1/x.',tag:'derivee'}]},
      {q:'Signe de f′ :',o:prev=>{const z=[`${k}`,`√${k}`,`e<sup>1/${k}</sup>`][prev[0].c],pn=prev[0].c<2;return[{h:mx(`positive sur ]0 ; ${z}], négative sur [${z} ; +∞[`),d:'pn',z,ok:pn},
        {h:mx(`négative sur ]0 ; ${z}], positive sur [${z} ; +∞[`),d:'np',z,ok:!pn},{h:'positive sur ]0 ; +∞[',d:'p',z,why:'f′ s’annule et change de signe.',tag:'signe'}].map(o=>o.ok||o.why?o:Object.assign(o,{why:'Mets f′ au même dénominateur : son signe est celui du numérateur (x &gt; 0).',tag:'signe'}))}},
      {q:'Donc f admet :',o:prev=>{const{d,z}=prev[1];return[[`un maximum en x = ${z}`,'pn'],[`un minimum en x = ${z}`,'np'],['aucun extremum','p']].map(([h,cc])=>({h:mx(h),ok:cc===d,why:'f′ positive puis négative : maximum ; négative puis positive : minimum.',tag:'extremum'}))}},
      {q:'Convexité :',o:[{h:mx(`f″(x) = −${fr(k,'x<sup>2</sup>')} &lt; 0 : f est concave sur ]0 ; +∞[`),ok:true},{h:mx(`f″(x) = ${fr(k,'x<sup>2</sup>')} &gt; 0 : f est convexe sur ]0 ; +∞[`),why:'(1/x)′ = −1/x² : le signe moins compte.',tag:'signe'},
        {h:mx(`f″(x) = −1 − ${fr(k,'x<sup>2</sup>')} : f est concave`),why:'La dérivée de la constante −1 est 0.',tag:'derivee'}]}],
    explain:`f′(x) = −1 + ${k}/x = (${k} − x)/x, du signe de ${k} − x : positive sur ]0 ; ${k}], négative ensuite. f admet un maximum f(${k}) = ${num(c-k)} + ${k} ln ${k}. f″(x) = −${k}/x² &lt; 0 : f est concave.`})};
const gFsLnR3=()=>{const a=R(1,6),b=R(1,6),m=fsQ(a-b,2);
  return chain({instr:'Résous l’inéquation, en construisant ton raisonnement.',prompt:mx(`ln(${a} − x) − ln(x + ${b}) ≤ 0`),
    steps:[
      {q:'Sur quel intervalle l’inéquation a-t-elle un sens ?',o:[{h:mx(`]−${b} ; ${a}[`),ok:true,D:[-b,a]},{h:mx(`]−∞ ; ${a}[`),D:[-Infinity,a],why:`Il faut aussi x + ${b} &gt; 0.`,tag:'domaine'},{h:mx(`]−${b} ; +∞[`),D:[-b,Infinity],why:`Il faut aussi ${a} − x &gt; 0.`,tag:'domaine'}]},
      {q:'On transforme :',o:[{h:mx(`ln(${a} − x) ≤ ln(x + ${b}), donc ${a} − x ≤ x + ${b}`),ok:true,c:0},{h:mx(`ln(${a} − x) ≤ ln(x + ${b}), donc ${a} − x ≥ x + ${b}`),c:1,why:'ln est strictement croissante : elle conserve l’ordre.',tag:'ineq-flip'},
        {h:mx(`${fr(`${a} − x`,`x + ${b}`)} ≤ 0`),c:2,why:'ln X ≤ 0 ⟺ 0 &lt; X ≤ 1, et non X ≤ 0.',tag:'log-def'}]},
      {q:'On obtient :',o:prev=>{const k=prev[1].c;return[`x ≥ ${m}`,`x ≤ ${m}`,'aucun x du domaine ne convient'].map((h,i)=>({h:mx(h),c:i,ok:i===k,why:'Résous ta propre inégalité : '+[`${a} − x ≤ x + ${b} donne ${num(a-b)} ≤ 2x.`,`${a} − x ≥ x + ${b} donne x ≤ (${a} − ${b})/2.`,'sur le domaine, un quotient de deux positifs est positif.'][k],tag:'calc'}))}},
      {q:'Ensemble des solutions :',o:prev=>{const[lo,hi]=prev[0].D,c=prev[2].c,L=v=>v===-Infinity?'−∞':num(v),H=v=>v===Infinity?'+∞':num(v);
        const ok=c===2?'∅':c===0?`[${m} ; ${H(hi)}[`:`]${L(lo)} ; ${m}]`,C=[ok,`[${m} ; ${a}[`,`]−${b} ; ${m}]`,`[${m} ; +∞[`,'∅'],seen=new Set,o=[];
        C.forEach((h,i)=>{if(seen.has(h)||o.length>=4)return;seen.add(h);o.push(i?{h:mx(h),why:'Intersecte la condition trouvée avec l’intervalle de résolution choisi.',tag:'domaine'}:{h:mx(h),ok:true})});return o}}],
    explain:`On résout sur ]−${b} ; ${a}[. ln est strictement croissante : ln(${a} − x) ≤ ln(x + ${b}) ⟺ ${a} − x ≤ x + ${b} ⟺ x ≥ ${fsT(a-b,2)}. S = [${m} ; ${a}[.`})};

/* ===================== Déclaration des chapitres ===================== */
ANA_UNITS.push(
  {id:'fs-ref',tr:'fs',src:'Fonctions de référence',name:'Fonctions de référence',sub:'Carré, racine, inverse, cube, affines, homographiques',glyph:'x²',tone:'c',w:'wIneqG',
   w2:[['Réciproque d’une fonction affine','wInv','Fais varier a et b : la droite et sa réciproque sont symétriques par rapport à y = x.']],
   skills:[SKA('fs.ref.img','Image par une fonction de référence',gFsRefImg,1),SKA('fs.ref.var','Variations d’une fonction affine',gFsRefVar,1),SKA('fs.ref.cmp','Comparer des images',gFsRefCmp,1),
     SKA('fs.ref.affa','Coefficient directeur',gFsRefAffA,1),SKA('fs.ref.dom','Valeur interdite',gFsRefDom,1),SKA('fs.ref.ant','Antécédent par a + b/x',gFsRefAnt,2),SKA('fs.ref.pos','Ranger x, x² et x³',gFsRefPos,2),
     SKA('fs.ref.affx','Expression d’une fonction affine',gFsRefAffX,2),SKA('fs.ref.r1','Raisonner : inéquation avec 1/x',gFsRefR1,2),SKA('fs.ref.r2','Raisonner : fonction affine par deux points',gFsRefR2,2),SKA('fs.ref.r3','Raisonner : inéquation x² ≤ k²',gFsRefR3,3)]},
  {id:'fs-d23',tr:'fs',src:'Fonctions polynômes du second degré',name:'Second degré',sub:'Forme canonique, discriminant, signe d’un trinôme',glyph:'Δ',tone:'x',w:'wPar',
   w2:[['Les racines sur la courbe','wRoots','Déplace les racines et le coefficient a : observe la forme factorisée et le signe du trinôme.']],
   skills:[SKA('fs.d2.som','Lire le sommet',gFsD2Som,1),SKA('fs.d2.ext','Minimum ou maximum',gFsD2Ext,1),SKA('fs.d2.disc','Calculer le discriminant',gB1Disc,1),SKA('fs.d2.can','Forme canonique',gFsD2Can,2),
     SKA('fs.d2.rac','Résoudre ax² + bx + c = 0',gFsD2Rac,2),SKA('fs.d2.sp','Somme et produit des racines',gFsD2SP,2),SKA('fs.d2.fac','Factoriser un trinôme',gFsD2Fac,2),SKA('fs.d2.ineq','Inéquation du second degré',gFsD2Ineq,2),
     SKA('fs.d2.det','Retrouver le coefficient a',gFsD2Det,3),SKA('fs.d2.r1','Raisonner : résoudre une équation',gFsD2R1,2),SKA('fs.d2.r2','Raisonner : résoudre une inéquation',gFsD2R2,3),SKA('fs.d2.r3','Raisonner : position de deux courbes',gFsD2R3,3)]},
  {id:'fs-der',tr:'fs',src:'Dérivation',name:'Dérivation',sub:'Nombre dérivé, tangente, dérivées, variations',glyph:'f′',tone:'sq',w:'wTan',
   w2:[['Signe de f′ et variations','wVar','Déplace le point : quand f′ est positive la courbe monte, quand elle est négative elle descend.']],
   skills:[SKA('fs.der.taux','Taux d’accroissement',gDTaux,1),SKA('fs.der.lect','Nombre dérivé et tangente',gFsDerLect,1),SKA('fs.der.us','Dérivées usuelles',gFsDerUs,1),SKA('fs.der.tab','Lire un extremum',gFsDerTab,1),
     SKA('fs.der.ops','Somme et produit',gFsDerOps,2),SKA('fs.der.quot','Dérivée d’un quotient',gDQuot,2),SKA('fs.der.comp','Fonctions composées',gFsDerComp,2),SKA('fs.der.tan','Équation de la tangente',gDTan,2),
     SKA('fs.der.opt','Bénéfice maximal',gFsDerOpt,3),SKA('fs.der.r1','Raisonner : étudier une cubique',gFsDerR1,2),SKA('fs.der.r2','Raisonner : variations d’un quotient',gFsDerR2,2),SKA('fs.der.r3','Raisonner : signe par les variations',gFsDerR3,3)]},
  {id:'fs-lim',tr:'fs',src:'Limites de fonctions',name:'Limites',sub:'Limites à l’infini et en un point, asymptotes',glyph:'lim',tone:'c',w:'wLim',
   skills:[SKA('fs.lim.ref','Limites de référence',gFsLimRef,1),SKA('fs.lim.ops','Opérations sur les limites',gFsLimOps,1),SKA('fs.lim.poly','Limite d’un polynôme',gFsLimPoly,2),SKA('fs.lim.rat','Limite d’une fraction en +∞',gFlLimInf,2),
     SKA('fs.lim.asy','Asymptotes',gFsLimAsy,2),SKA('fs.lim.comp','Limite d’une composée',gFsLimComp,2),SKA('fs.lim.conj','Forme 0/0',gFl00,3),SKA('fs.lim.gen','Comparaison et gendarmes',gFsLimGen,3),
     SKA('fs.lim.r1','Raisonner : lever ∞/∞',gFsLimR1,2),SKA('fs.lim.r2','Raisonner : limite en un point',gFsLimR2,3),SKA('fs.lim.r3','Raisonner : expression conjuguée',gFsLimR3,3)]},
  {id:'fs-cvx',tr:'fs',src:'Continuité et convexité',name:'Continuité et convexité',sub:'Valeurs intermédiaires, dérivée seconde, inflexion',glyph:'∪',tone:'x',w:'wCob',
   skills:[SKA('fs.cvx.cont','Continuité en un point',gFsCvxCont,1),SKA('fs.cvx.ref','Convexité de référence',gFsCvxRef,1),SKA('fs.cvx.d2','Dérivée seconde',gFsCvxD2,1),SKA('fs.cvx.param','Continuité et paramètre',gFlCont,2),
     SKA('fs.cvx.tvi','Nombre de solutions',gFsCvxTvi,2),SKA('fs.cvx.enc','Encadrer une solution',gFsCvxEnc,2),SKA('fs.cvx.infl','Point d’inflexion',gFsCvxInfl,2),SKA('fs.cvx.fix','Limite d’une suite récurrente',gFsCvxFix,2),
     SKA('fs.cvx.r1','Raisonner : valeurs intermédiaires',gFsCvxR1,2),SKA('fs.cvx.r2','Raisonner : étudier la convexité',gFsCvxR2,2),SKA('fs.cvx.r3','Raisonner : inégalité par convexité',gFsCvxR3,3)]},
  {id:'fs-exp',tr:'fs',src:'Fonction exponentielle',name:'Exponentielle',sub:'eˣ, équations, dérivées, croissances comparées',glyph:'eˣ',tone:'sq',w:'wGrow',
   skills:[SKA('fs.exp.simp','Règles de calcul',gFsExpSimp,1),SKA('fs.exp.eq','Égalité d’exponentielles',gFuExp,1),SKA('fs.exp.der1','Dériver eˣ et e^(kx)',gFsExpDer1,1),SKA('fs.exp.der2','Dériver produits et composées',gFsExpDer2,2),
     SKA('fs.exp.eq2','Équation e^A = e^B',gFsExpEq2,2),SKA('fs.exp.ineq','Inéquation exponentielle',gFsExpIneq,2),SKA('fs.exp.lim','Limites avec eˣ',gFsExpLim,2),SKA('fs.exp.mod','Modèle A·e^(kt)',gFsExpMod,2),
     SKA('fs.exp.r1','Raisonner : étudier (x + a)eˣ',gFsExpR1,2),SKA('fs.exp.r2','Raisonner : croissances comparées',gFsExpR2,3),SKA('fs.exp.r3','Raisonner : étudier x e^(−x/k)',gFsExpR3,3)]},
  {id:'fs-ln',tr:'fs',src:'Fonction logarithme népérien',name:'Logarithme népérien',sub:'ln, équations, dérivées, limites',glyph:'ln',tone:'c',w:'wLog',
   skills:[SKA('fs.ln.val','Valeurs exactes',gFsLnVal,1),SKA('fs.ln.prop','Somme de logarithmes',gFuLn,1),SKA('fs.ln.eq','Équations avec ln et exp',gFsLnEq,1),SKA('fs.ln.dom','Ensemble de définition',gFsLnDom,1),
     SKA('fs.ln.simp','Simplifier des logarithmes',gFsLnSimp,2),SKA('fs.ln.ineq','Inéquations avec ln',gFsLnIneq,2),SKA('fs.ln.der','Dériver avec ln',gFsLnDer,2),SKA('fs.ln.lim','Limites et croissances comparées',gFsLnLim,2),
     SKA('fs.ln.r1','Raisonner : équation avec deux ln',gFsLnR1,2),SKA('fs.ln.r2','Raisonner : étudier c − x + k ln x',gFsLnR2,2),SKA('fs.ln.r3','Raisonner : inéquation avec ln',gFsLnR3,3)]});
