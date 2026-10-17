/* ===================== MVA912 · Dérivée et règles de dérivation ===================== */
Object.assign(ANA_ERR,{
  'm2der-prod':{label:'Dérivée d’un produit',tip:'(uv)′ = u′v + uv′ : deux termes, jamais u′v′.'},
  'm2der-graphe':{label:'Courbe de la dérivée',tip:'La hauteur de la courbe de f′ en x est la pente de la tangente à la courbe de f en x.'}});
const M2DER_P=n=>`(${n})`;
const M2DER_SG=v=>v<0?MINUS:'+';
/** « ax + b » écrit joliment */
const M2DER_LIN=(a,b)=>`${a===1?'':a===-1?MINUS:num(a)}x${b?` ${M2DER_SG(b)} ${Math.abs(b)}`:''}`;
/** a·xⁿ écrit joliment */
const M2DER_MON=(a,n)=>n===0?num(a):`${a===1?'':a===-1?MINUS:num(a)}x${n>1?`<sup>${n}</sup>`:''}`;
/* 1. Dériver a·xⁿ */
const gM2DerPow=()=>{const v=R(0,9);
  if(v===0){const k=nz(-9,9);return exprQ('Dérive la fonction.',mx(`f(x) = ${num(k)}`),'f ′(x) =','0',`Une constante ne varie pas : sa dérivée est 0 (la courbe est une droite horizontale).`,'Quelle est la pente d’une droite horizontale ?',false,([u])=>eqv(u,String(k))?'derivee':null)}
  if(v===1){const a=nz(-9,9);return exprQ('Dérive la fonction.',mx(`f(x) = ${M2DER_MON(a,1)}`),'f ′(x) =',String(a),`(a x)′ = a : la droite y = ${num(a)}x a pour pente ${num(a)} partout.`,'Pense à la pente de la droite.',false,([u])=>eqv(u,`${a}x`)?'derivee':null)}
  const a=pick([1,1,-1,2,3,-2,4,5,-3]),n=R(2,7);
  return exprQ('Dérive la fonction.',mx(`f(x) = ${M2DER_MON(a,n)}`),'f ′(x) =',`${a*n}x^${n-1}`,`(xⁿ)′ = n xⁿ⁻¹ : l’exposant ${n} descend devant et diminue de 1. f′(x) = ${num(a)} × ${n}x${n-1>1?`<sup>${n-1}</sup>`:''} = ${M2DER_MON(a*n,n-1)}.`,
    'L’exposant descend devant (on multiplie), puis il diminue de 1.',false,([u])=>eqv(u,`${a*n}x^${n}`)||eqv(u,`${a}x^${n-1}`)||eqv(u,`${a*(n-1)}x^${n-1}`)?'derivee':null)};
/* 2. Dériver un polynôme */
const gM2DerPoly=()=>{const d=R(2,4),cs=[nz(-5,5),...Array.from({length:d},()=>R(-6,6))],der=cs.slice(0,-1).map((c,i)=>c*(d-i));
  return exprQ('Dérive la fonction polynôme.',fsFx(poly(cs)),'f ′(x) =',poly(der)||'0',`On dérive terme à terme : chaque a xⁿ devient n a xⁿ⁻¹ et la constante disparaît. f′(x) = ${M(poly(der)||'0')}.`,
    'Traite chaque terme séparément : coefficient × exposant, puis exposant − 1.',false,([u])=>cs[d]&&eqv(u,`${poly(der)}+${M2DER_P(cs[d])}`)?'derivee':null)};
/* 3. Dérivées usuelles (avec la courbe) */
const M2DER_US=[['1/x','1/x',[-3,3,-4,4],`−${fr(1,'x<sup>2</sup>')}`,[fr(1,'x<sup>2</sup>'),'ln x',`−${fr(1,'x')}`]],['√x','sqrt(x)',[-.5,5,-.5,3],fr(1,'2√x'),[fr(1,'√x'),'2√x',`−${fr(1,'2√x')}`]],
  ['e<sup>x</sup>','exp(x)',[-3,2,-.5,5],'e<sup>x</sup>',['x e<sup>x−1</sup>','ln x',`−e<sup>x</sup>`]],['ln x','ln(x)',[-.5,5,-3,2],fr(1,'x'),[`−${fr(1,'x<sup>2</sup>')}`,'e<sup>x</sup>','x ln x − x']],
  ['sin x','sin(x)',[-4,4,-2,2],'cos x',['−cos x','sin x','−sin x']],['cos x','cos(x)',[-4,4,-2,2],'−sin x',['sin x','−cos x','cos x']]];
const gM2DerUs=()=>{const[F,e,w,ok,bad]=pick(M2DER_US);
  return mcq('Quelle est la dérivée ?',mx(`f(x) = ${F}`)+FIG.plot({x:[w[0],w[1]],y:[w[2],w[3]],f:[e]}),[{h:mx(ok),ok:true},...bad.map(h=>({h:mx(h),tag:'derivee'}))],
    `Dérivée de référence : (${F})′ = ${ok}. Contrôle sur la courbe : ${{'1/x':'la courbe descend partout, la dérivée est négative','√x':'la courbe monte de moins en moins vite : dérivée positive qui diminue','e<sup>x</sup>':'la pente est égale à la hauteur en chaque point','ln x':'la courbe monte de moins en moins vite : 1/x positive qui diminue','sin x':'en 0 la pente vaut 1 = cos 0','cos x':'en 0 la tangente est horizontale : −sin 0 = 0'}[F]}.`,
    'Révise la table des dérivées usuelles, puis contrôle le signe avec la courbe.')};
/* 4. Placer un point de la courbe de f′ */
const gM2DerGraphe=()=>{for(let i=0;i<60;i++){const k=pick([.5,-.5,1,-1]),s=R(-2,2),t=R(-3,3),a=R(-4,4),m=2*k*(a-s);if(Math.abs(m)>5.5||a===s)continue;
    const e=`${M2DER_P(k)}*(x-${M2DER_P(s)})^2+${M2DER_P(t)}`,ya=k*(a-s)**2+t;
    return pointQ({instr:`Place le point de la courbe de f′ d’abscisse ${num(a)}.`,prompt:stx(`La courbe de f (une parabole) est tracée, avec son sommet d’abscisse ${num(s)}. Le point A est sur la courbe de f.`),nom:'P',x:[-5,5],y:[-6,6],snap:.5,tol:.24,cible:[a,m],
      fond:{f:[e],pts:[[a,ya,'A']],pas:1,etiq:2},
      explain:`La hauteur de f′ en ${num(a)} est la pente de la tangente à f en A. Ici f(x) = ${k===1?'':k===-1?MINUS:num(k)}(${M2DER_LIN(1,-s)})²${t?` ${M2DER_SG(t)} ${Math.abs(t)}`:''}, donc f′(x) = ${2*k===1?'':2*k===-1?MINUS:num(2*k)}(${M2DER_LIN(1,-s)}) et f′(${num(a)}) = ${num(m)} : P(${num(a)} ; ${num(m)}).`+
        FIG.plot({x:[-5,5],y:[-6,6],f:[e,{f:`${M2DER_P(2*k)}*(x-${M2DER_P(s)})`,c:3,dash:true},{f:`${M2DER_P(ya)}+${M2DER_P(m)}*(x-${M2DER_P(a)})`,c:2,dash:true}],pts:[[a,ya,'A'],[a,m,'P']],etiq:2}),
      hint:'Estime la pente de la tangente en A (avance de 1, de combien monte-t-on ?) : c’est l’ordonnée du point cherché.',diag:pt=>Math.abs(pt[1]-ya)<.3?'m2der-graphe':Math.abs(pt[1]+m)<.3&&m?'signe':null})}
  return gM2DerVal()};
/* 5. Nombre dérivé d'un polynôme */
const gM2DerVal=()=>{const a=pick([1,-1]),b=R(-2,2),c=R(-3,3),d=R(-3,3),x0=R(-2,2),f=x=>a*x**3+b*x*x+c*x+d,m=3*a*x0*x0+2*b*x0+c,e=poly([a,b,c,d]);
  let lo=Infinity,hi=-Infinity;for(let x=x0-1.5;x<=x0+1.5;x+=.05){lo=Math.min(lo,f(x));hi=Math.max(hi,f(x))}const ps=hi-lo>16?4:hi-lo>8?2:1;
  return nq({instr:`Calcule f′(${num(x0)}).`,prompt:fsFx(e)+FIG.plot({x:[x0-1.5,x0+1.5],y:[Math.floor(lo)-1,Math.ceil(hi)+1],pas:.5,etiq:1,pasy:ps,f:[e],pts:[[x0,f(x0),'A']]}),labels:[`f′(${num(x0)}) =`],t:[m],
    explain:`f′(x) = ${M(poly([3*a,2*b,c])||'0')}. On remplace x par ${num(x0)}${x0<0?' (entre parenthèses)':''} : f′(${num(x0)}) = ${num(m)}. ${m>0?'La courbe monte en A.':m<0?'La courbe descend en A.':'La tangente est horizontale en A.'}`,
    hint:'Dérive d’abord, puis remplace x par la valeur.',diag:([w])=>near(w,f(x0),1e-6)&&f(x0)!==m?'m1nd-pente':near(w,3*a*x0*x0-2*b*x0+c,1e-6)&&b*x0?'signe':null})};
/* 6. Dérivée d'un produit */
const gM2DerProd=()=>{const v=R(0,4),a=nz(-4,4),b=nz(-5,5);let F,t,e,w;
  if(v===0){const c=nz(-3,3),d=R(-4,4);F=`(${M2DER_LIN(a,b)})(${M2DER_LIN(c,d)})`;t=`${a}(${c}x+${M2DER_P(d)})+${c}(${a}x+${M2DER_P(b)})`;w=String(a*c);
    e=`u = ${M2DER_LIN(a,b)}, u′ = ${num(a)} ; v = ${M2DER_LIN(c,d)}, v′ = ${num(c)}. f′ = u′v + uv′ = ${num(a)}(${M2DER_LIN(c,d)}) ${M2DER_SG(c)} ${Math.abs(c)}(${M2DER_LIN(a,b)}) = ${M(poly([2*a*c,a*d+b*c]))}.`}
  else if(v===1){F=`(${M2DER_LIN(a,b)})e<sup>x</sup>`;t=`(${a}x+${M2DER_P(a+b)})*exp(x)`;w=`${a}*exp(x)`;e=`u = ${M2DER_LIN(a,b)}, u′ = ${num(a)} ; v = eˣ, v′ = eˣ. f′ = ${num(a)}eˣ + (${M2DER_LIN(a,b)})eˣ = (${M2DER_LIN(a,a+b)})eˣ.`}
  else if(v===2){F='x<sup>2</sup> e<sup>x</sup>';t='(x^2+2x)*exp(x)';w='2x*exp(x)';e='u = x², u′ = 2x ; v = eˣ, v′ = eˣ. f′ = 2x eˣ + x² eˣ = (x² + 2x)eˣ.'}
  else if(v===3){F=`${M2DER_MON(a,1)} ln x`;t=`${a}*ln(x)+${M2DER_P(a)}`;w=`${a}/x`;e=`u = ${M2DER_MON(a,1)}, u′ = ${num(a)} ; v = ln x, v′ = 1/x. f′ = ${num(a)} ln x + ${M2DER_MON(a,1)} × 1/x = ${num(a)} ln x ${M2DER_SG(a)} ${Math.abs(a)} (pour x &gt; 0).`}
  else{F='x sin x';t='sin(x)+x*cos(x)';w='cos(x)';e='u = x, u′ = 1 ; v = sin x, v′ = cos x. f′ = sin x + x cos x.'}
  return exprQ('Dérive le produit.',mx(`f(x) = ${F}`),'f ′(x) =',t,e,'(uv)′ = u′v + uv′ : repère u et v, dérive-les séparément, puis assemble.',false,([u])=>eqv(u,w)?'m2der-prod':null)};
/* 7. Tangente parallèle à une droite donnée (placer le point) */
const gM2DerPar=()=>{for(let i=0;i<60;i++){const b=R(-4,4),c=R(-4,4),x0=R(-3,3),m=2*x0+b,f=x=>x*x+b*x+c,y=f(x0);if(Math.abs(y)>5.5||Math.abs(m)>4)continue;
    const e=poly([1,b,c]);
    return pointQ({instr:`Place le point de la courbe où la tangente est parallèle à la droite d : y = ${m===0?'0':M2DER_MON(m,1)}.`,prompt:fsFx(e),nom:'T',x:[-5,5],y:[-6,6],snap:.5,tol:.24,cible:[x0,y],
      fond:{f:[e,{f:`${M2DER_P(m)}*x`,c:1,dash:true}],pas:1,etiq:2},
      explain:`Parallèle à d signifie même pente : f′(x) = ${num(m)}. Or f′(x) = 2x ${M2DER_SG(b)} ${Math.abs(b)}, donc 2x ${M2DER_SG(b)} ${Math.abs(b)} = ${num(m)} ⟺ x = ${num(x0)}. Le point est T(${num(x0)} ; ${num(y)}).`+
        FIG.plot({x:[-5,5],y:[-6,6],f:[e,{f:`${M2DER_P(m)}*x`,c:1,dash:true},{f:`${M2DER_P(y)}+${M2DER_P(m)}*(x-${M2DER_P(x0)})`,c:2,dash:true}],pts:[[x0,y,'T']],etiq:2}),
      hint:'Deux droites parallèles ont la même pente : résous f′(x) = pente de d.',diag:pt=>Math.abs(pt[0]-m)<.3&&m!==x0?'m1nd-pente':null})}
  return gM2DerVal()};
/* 8. Raisonner : dériver (ax + b)eˣ */
const gM2DerR1=()=>{const a=nz(-3,3),b=nz(-4,4),L=M2DER_LIN(a,b),E='e<sup>x</sup>';
  const res=(F,U,V)=>F==='leib'?(V==='e'?`(${M2DER_LIN(a,b+U)})${E}`:`${num(U)}${E} + (${L}) × x e<sup>x−1</sup>`):F==='sum'?(V==='e'?`${num(U)} + ${E}`:`${num(U)} + x e<sup>x−1</sup>`):(V==='e'?`${num(U)}${E}`:`${num(U)}x e<sup>x−1</sup>`);
  return chain({instr:'Dérive f, en construisant ton raisonnement.',prompt:mx(`f(x) = (${L})${E}`)+FIG.plot({x:[-5,2],y:[-4,4],f:[`(${a}x+${M2DER_P(b)})*exp(x)`]}),
    steps:[
      {q:'f est de la forme :',o:[
        {h:mx(`un produit u × v, avec u = ${L} et v = ${E}`),ok:true,c:'prod'},
        {h:mx(`une somme u + v, avec u = ${L} et v = ${E}`),c:'sum',why:`Les parenthèses sont multipliées par ${E} : c’est un produit, pas une somme.`,tag:'m2der-prod'},
        {h:mx(`une composée e<sup>u</sup>, avec u = ${L}`),c:'comp',why:`${L} n’est pas en exposant : on multiplie par ${E}, ce n’est pas e<sup>${L}</sup>.`,tag:'chaine'}]},
      {q:'Les dérivées utiles sont :',o:[
        {h:mx(`u′ = ${num(a)} et v′ = ${E}`),ok:true,U:a,V:'e'},
        {h:mx(`u′ = ${num(a)} et v′ = x e<sup>x−1</sup>`),U:a,V:'p',why:'eˣ n’est pas une puissance de x : (eˣ)′ = eˣ.',tag:'derivee'},
        {h:mx(`u′ = ${num(b)} et v′ = ${E}`),U:b,V:'e',why:`La dérivée de ${L} est ${num(a)} : la constante ${num(b)} disparaît.`,tag:'derivee'}].filter((o,i,A)=>A.findIndex(z=>z.h===o.h)===i)},
      {q:'On applique la formule :',o:prev=>{const c=prev[0].c;return[
        {h:mx('f′ = u′v + uv′'),ok:c!=='sum',F:'leib',why:'Pour une somme, on dérive terme à terme.'},
        {h:mx('f′ = u′ + v′'),ok:c==='sum',F:'sum',why:'C’est la règle d’une somme ; f est un produit.',tag:'m2der-prod'},
        {h:mx('f′ = u′ × v′'),F:'prod',why:'(uv)′ n’est pas u′v′ : par exemple (x · x)′ = 2x et non 1.',tag:'m2der-prod'}]}},
      {q:'On obtient :',o:prev=>{const F=prev[2].F,U=prev[1].U,V=prev[1].V,seen=new Set,o=[];
        [[res(F,U,V),1],[res('leib',a,'e'),0],[res('prod',a,'e'),0],[`(${L})${E}`,0]].forEach(([h,ok])=>{if(seen.has(h))return;seen.add(h);
          o.push(ok?{h:mx(`f′(x) = ${h}`),ok:true}:{h:mx(`f′(x) = ${h}`),why:`Avec u′v + uv′ : ${num(a)}${E} + (${L})${E} = (${M2DER_LIN(a,a+b)})${E}.`,tag:'m2der-prod'})});return o}}],
    explain:`f = u × v avec u = ${L} (u′ = ${num(a)}) et v = ${E} (v′ = ${E}). f′ = u′v + uv′ = ${num(a)}${E} + (${L})${E} = (${M2DER_LIN(a,a+b)})${E}. Sur la courbe, la tangente est horizontale là où ${M2DER_LIN(a,a+b)} = 0, soit x = ${fsT(-(a+b),a)}.`})};
/* 9. Raisonner : dériver (x² + c)ⁿ */
const gM2DerR2=()=>{const N=R(2,4),c=R(1,4),U=`(x<sup>2</sup> + ${c})`;
  const pw=(e)=>e===1?U:`${U}<sup>${e}</sup>`,g1=1+c;
  return chain({instr:'Dérive f, puis calcule f′(1), en construisant ton raisonnement.',prompt:mx(`f(x) = ${pw(N)}`),
    steps:[
      {q:'Quelle règle utiliser ?',o:[
        {h:mx('(u<sup>n</sup>)′ = n u′ u<sup>n−1</sup>'),ok:true,r:'ch'},
        {h:mx('(u<sup>n</sup>)′ = n u<sup>n−1</sup>'),r:'nou',why:'Dans une composée, on multiplie par la dérivée de l’intérieur u′.',tag:'chaine'},
        {h:mx('(u<sup>n</sup>)′ = n u′ u<sup>n</sup>'),r:'nod',why:'L’exposant diminue de 1 : u<sup>n−1</sup>.',tag:'derivee'}]},
      {q:`Avec u(x) = x² + ${c}, on a :`,o:[
        {h:mx('u′(x) = 2x'),ok:true,D:'2x',d:x=>2*x},{h:mx(`u′(x) = 2x + ${c}`),D:`(2x + ${c})`,d:x=>2*x+c,why:'La dérivée d’une constante est nulle.',tag:'derivee'},
        {h:mx('u′(x) = x'),D:'x',d:x=>x,why:'(x²)′ = 2x : l’exposant descend devant.',tag:'derivee'}]},
      {q:'Donc f′(x) =',o:prev=>{const r=prev[0].r,D=prev[1].D,d=prev[1].d;
        const mk=(rr,DD,dd)=>rr==='ch'?{t:`${N} × ${DD} × ${pw(N-1)}`,g:x=>N*dd(x)*(x*x+c)**(N-1)}:rr==='nou'?{t:`${N}${pw(N-1)}`,g:x=>N*(x*x+c)**(N-1)}:{t:`${N} × ${DD} × ${pw(N)}`,g:x=>N*dd(x)*(x*x+c)**N};
        const cur=mk(r,D,d),seen=new Set,o=[];
        [[cur,1],[mk('ch','2x',x=>2*x),0],[mk('nou'),0],[mk('nod','2x',x=>2*x),0]].forEach(([z,ok])=>{if(seen.has(z.t))return;seen.add(z.t);
          o.push(ok?{h:mx(z.t),ok:true,g:z.g}:{h:mx(z.t),g:z.g,why:`n u′ u<sup>n−1</sup> avec u′ = 2x : ${N} × 2x × ${pw(N-1)}.`,tag:'chaine'})});return o}},
      {q:'En x = 1, f′(1) vaut :',o:prev=>{const g=prev[2].g,v=g(1),seen=new Set,o=[];
        [[v,1],[N*2*g1**(N-1),0],[N*g1**(N-1),0],[2*N*g1**N,0]].forEach(([w,ok])=>{if(seen.has(w))return;seen.add(w);
          o.push(ok?{h:mx(num(w)),ok:true}:{h:mx(num(w)),why:`On remplace x par 1 dans l’expression précédente : ${N} × 2 × ${g1}${N-1>1?`<sup>${N-1}</sup>`:''} pour la bonne dérivée.`,tag:'calc'})});return o}}],
    explain:`f = u<sup>${N}</sup> avec u = x² + ${c} et u′ = 2x. f′(x) = ${N} × 2x × ${pw(N-1)} = ${2*N}x${pw(N-1)}. En 1 : f′(1) = ${2*N} × ${g1}${N-1>1?`<sup>${N-1}</sup>`:''} = ${num(2*N*g1**(N-1))}.`})};
/* 10. Vitesse d'un objet lancé vers le haut */
const gM2DerVit=()=>{const v0=pick([10,15,20,25]),h0=pick([0,1,2,5]),T=pick([.5,1,1.5,2]),q=Math.random()<.6,h=t=>-5*t*t+v0*t+h0,tm=v0/10,top=h(tm),tf=(v0+Math.sqrt(v0*v0+20*h0))/10;
  return nq({instr:q?`Calcule la vitesse de la balle à l’instant t = ${num(T)} s.`:'À quel instant la vitesse de la balle est-elle nulle ?',
    prompt:stx(`Une balle est lancée vers le haut. Sa hauteur (en m) au bout de t secondes est h(t) = −5t² + ${v0}t${h0?` + ${h0}`:''}. Sa vitesse est v(t) = h′(t).`)+FIG.plot({x:[0,Math.ceil(tf)],y:[0,Math.ceil(top/5)*5+5],pas:.5,etiq:1,pasy:5,f:[`-5x^2+${v0}x+${h0}`],pts:q?[[T,h(T),'B']]:[]}),
    labels:[q?'v (m/s) =':'t (s) ='],t:[q?v0-10*T:tm],
    explain:`v(t) = h′(t) = −10t + ${v0}. ${q?`v(${num(T)}) = −10 × ${num(T)} + ${v0} = ${num(v0-10*T)} m/s ${v0-10*T>0?'(elle monte encore)':v0-10*T<0?'(elle redescend)':'(elle est au sommet)'}.`:`v(t) = 0 ⟺ t = ${v0}/10 = ${num(tm)} s : c’est le sommet de la trajectoire, où la tangente est horizontale (hauteur ${num(top)} m).`}`,
    hint:'Dérive h : (−5t²)′ = −10t, (v₀t)′ = v₀, la constante disparaît.',diag:([w])=>q&&near(w,h(T),1e-6)?'m1nd-pente':q&&near(w,v0-5*T,1e-6)?'derivee':null})};
ANA_UNITS.push({id:'m2-derivation',tr:'m2',name:'Dérivée et règles',sub:'La pente partout : xⁿ, produit, quotient, composée',glyph:'f′',tone:'sq',
  skills:[SKA('m2.der.pow','Dériver a xⁿ',gM2DerPow,1),SKA('m2.der.poly','Dériver un polynôme',gM2DerPoly,1),SKA('m2.der.us','Dérivées usuelles',gM2DerUs,1),SKA('m2.der.val','Calculer f′(a)',gM2DerVal,1),
    SKA('m2.der.graphe','Placer un point de f′',gM2DerGraphe,2),SKA('m2.der.prod','Dérivée d’un produit',gM2DerProd,2),SKA('m2.der.quot','Dérivée d’un quotient',gDQuot,2),SKA('m2.der.comp','Fonctions composées',gFsDerComp,2),
    SKA('m2.der.par','Tangente parallèle à une droite',gM2DerPar,2),SKA('m2.der.r1','Raisonner : dériver un produit',gM2DerR1,2),SKA('m2.der.r2','Raisonner : dériver une composée',gM2DerR2,3),SKA('m2.der.vit','Vitesse instantanée',gM2DerVit,3)]});
