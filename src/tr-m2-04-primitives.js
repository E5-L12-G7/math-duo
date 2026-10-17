/* ===================== MVA912 · Primitives usuelles ===================== */
Object.assign(ANA_ERR,{
  'm2-pr-k':{label:'Coefficient intérieur mal compensé',tip:'Une primitive de eᵏˣ est eᵏˣ/k, de cos(kx) est sin(kx)/k : on divise par k, on ne multiplie pas.'},
  'm2-pr-cst':{label:'Constante mal fixée',tip:'Écris F = G + C, remplace x par la valeur imposée (e⁰ = 1, cos 0 = 1), puis résous l’équation en C.'}});
/** a et b égales à une constante près (pour accepter toute primitive) */
const m2UpToC=(a,bs)=>{try{const b=parse(bs);let d0=null,n=0;for(const x of[-2.3,-1.1,-.4,.6,1.7,2.9,4.2]){const v=ev(b,x);if(!isFinite(v))continue;const u=ev(a,x);if(!isFinite(u))return false;
  const d=u-v;if(d0===null)d0=d;else if(Math.abs(d-d0)>1e-7*Math.max(1,Math.abs(v)))return false;n++}return n>=3}catch(e){return false}};
/** Question « donne une primitive » : toute primitive (à une constante près) est acceptée */
const m2PrimQ=(instr,prompt,label,target,explain,hint,diag)=>({type:'input',instr,prompt,fields:[{label,kind:'expr'}],explain,hint,ans:[target],
  check:([a])=>m2UpToC(a,target),diag:([a])=>{try{return diag?diag(a):null}catch(e){return null}}});
/** c × e^(kx) écrit joliment (c fraction) */
const m2CE=(c,k)=>`${c.n===c.d?'':c.n===-c.d?MINUS:m2F(c)}e<sup>${k===1?'':k}x</sup>`;
const m2Co=c=>c.n===c.d?'':c.n===-c.d?MINUS:m2F(c);
/* 1. Lire f(x₀) comme la pente de la primitive */
const gM2PrPente=()=>{let s,h,k,x0,m,y0;do{s=pick([1,-1,.5,-.5]);h=R(-2,2);k=R(-2,2);x0=R(-3,3);m=s*(x0-h);y0=s*(x0-h)**2/2+k}while(!Number.isInteger(m)||Math.abs(y0)>4||!m);
  const F=`${s}*(x${sg(-h)})^2/2${sg(k)}`,T=`${m}*(x${sg(-x0)})${sg(y0)}`.replace('+-','-');
  return nq({instr:`F est une primitive de f. Lis sur la figure la valeur de f(${num(x0)}).`,prompt:FIG.plot({x:[-5,5],y:[-5,5],f:[F,{f:T,c:1,dash:true}],pts:[[x0,y0,'A']]})+stx(`Courbe de F et sa tangente au point A d’abscisse ${num(x0)}.`),
    labels:[`f(${num(x0)}) =`],t:[m],explain:`Comme F′ = f, f(${num(x0)}) est la pente de la tangente à la courbe de F en A. La tangente monte de ${num(m)} quand on avance de 1 : f(${num(x0)}) = ${num(m)}.`,
    hint:'F′ = f : la valeur de f est la pente de la courbe de F. Mesure la pente de la tangente (montée pour un pas de 1).',diag:([v])=>near(v,y0,1e-6)?'tangente':null})};
/* 2. Vrai ou faux : F est-elle une primitive de f ? */
const gM2PrVerif=()=>{const C=[['x*exp(x)','(x+1)*exp(x)',1,'(xeˣ)′ = 1 × eˣ + x × eˣ = (x + 1)eˣ'],['(x+1)*exp(x)','x*exp(x)',0,'((x + 1)eˣ)′ = eˣ + (x + 1)eˣ = (x + 2)eˣ'],
  ['x*ln(x)-x','ln(x)',1,'(x ln x − x)′ = ln x + x × 1/x − 1 = ln x'],['x*ln(x)','ln(x)',0,'(x ln x)′ = ln x + 1'],['ln(x^2+1)','2x/(x^2+1)',1,'(ln u)′ = u′/u avec u = x² + 1'],
  ['exp(x^2)','exp(x^2)',0,'(e^(x²))′ = 2x e^(x²) : le facteur 2x manque'],['sin(x)^2','2sin(x)*cos(x)',1,'(sin²x)′ = 2 sin x × cos x'],['-cos(2x)','sin(2x)',0,'(−cos(2x))′ = 2 sin(2x)'],['sqrt(x^2+1)','x/sqrt(x^2+1)',1,'(√u)′ = u′/(2√u) = 2x/(2√(x² + 1))']];
  const[F,f,ok,why]=pick(C);
  return mcq('F est-elle une primitive de f ?',`<span class="m"><i>F</i>(<i>x</i>) = </span>`+M(F)+`<br><span class="m"><i>f</i>(<i>x</i>) = </span>`+M(f),
    [{h:'Oui',ok:!!ok},{h:'Non',ok:!ok}],`On dérive F : ${why}. ${ok?'On retrouve f : F est bien une primitive de f.':'On ne retrouve pas f : F n’est pas une primitive de f.'}`,'Dérive F et compare avec f.',true)};
/* 3. Primitive d'un polynôme */
const gM2PrPoly=()=>{let a,b,c,d;do{a=R(-2,2);b=R(-3,3);c=R(-4,4);d=R(-5,5)}while(!a&&!b||!c&&!d&&!b);const T=poly([a,b,c,d,0]),f=poly([4*a,3*b,2*c,d]);
  return m2PrimQ('Donne une primitive de f.',`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(f),'F(x) =',T,
    `Terme à terme : on monte chaque puissance de 1 et on divise par la nouvelle puissance. F(x) = ${M(T)} (+ C). Vérification : F′(x) = ${M(f)}.`,
    'xⁿ a pour primitive xⁿ⁺¹/(n + 1) ; une constante d a pour primitive dx.',a=>m2UpToC(a,poly([12*a,6*b,2*c]))?'prim':null)};
/* 4. Primitive vérifiant une condition */
const gM2PrCond=()=>{const v=R(-4,4);let T,f,G,ex,fig;
  if(Math.random()<.5){const k=pick([2,3,-1,-2]),q=nz(-3,3);f=`${k*q}exp(${k}x)`;G=q===1?`exp(${k}x)`:q===-1?`-exp(${k}x)`:`${q}exp(${k}x)`;T=v-q?`${G}${sg(v-q)}`:G;
    ex=`Une primitive de ${M(f)} est ${mx(m2CE(new Fr(q),k))}, car on divise par ${num(k)}. F(x) = ${mx(m2CE(new Fr(q),k))} + C et F(0) = ${num(q)} × e⁰ + C = ${num(q)} + C = ${num(v)}, donc C = ${num(v-q)}.`;
    fig=FIG.plot({x:[-2,2],y:[-6,6],f:[-2,0,2].map(c=>({f:`${G}${sg(c)}`,c:1,dash:true})),pts:[[0,v,'A']]})}
  else{const a=nz(-3,3),b=R(-5,5);f=poly([2*a,b]);G=poly([a,b,0]);T=v?`${G}${sg(v)}`:G;
    ex=`Une primitive de ${M(f)} est ${M(G)}. F(x) = ${M(G)} + C et F(0) = C = ${num(v)}.`;fig=FIG.plot({x:[-4,4],y:[-6,6],f:[-2,0,2].map(c=>({f:`${G}${sg(c)}`,c:1,dash:true})),pts:[[0,v,'A']]})}
  return exprQ('Donne la primitive F de f qui vérifie F(0) = '+num(v)+'.',`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(f)+fig+stx(`En pointillés, quelques primitives de f ; la bonne passe par A(0 ; ${num(v)}).`),
    'F(x) =',T,ex+` Donc F(x) = ${M(T)}.`,'Trouve une primitive, ajoute C, puis traduis F(0) = '+num(v)+' (rappel : e⁰ = 1).',false,([a])=>m2UpToC(a,T)?'m2-pr-cst':null)};
/* 5. Calculer la constante d'après la figure */
const gM2PrCst=()=>{let a,x0,C,y0;do{a=pick([1,-1,.5,-.5]);x0=nz(-2,2);C=R(-3,3);y0=a*x0*x0+C}while(Math.abs(y0)>4.5||!Number.isInteger(y0*2));
  const G=`${a}x^2`.replace(/^1x/,'x').replace(/^-1x/,'-x');
  return nq({instr:'Quelle valeur de C donne la primitive qui passe par le point A ?',prompt:stx('Les primitives de ')+M(`${2*a}x`.replace(/^1x/,'x').replace(/^-1x/,'-x'))+stx(' sont les fonctions ')+M(G)+mx(' + C')+'.'
      +FIG.plot({x:[-4,4],y:[-5,5],f:[-2,0,2].filter(c=>c!==C).map(c=>({f:`${G}${sg(c)}`,c:1,dash:true})),pts:[[x0,y0,`A(${num(x0)} ; ${num(y0)})`]]}),
    labels:['C ='],t:[C],explain:`On veut F(${num(x0)}) = ${num(y0)} : ${num(a)} × (${num(x0)})² + C = ${num(y0)}, soit ${num(a*x0*x0)} + C = ${num(y0)}, donc C = ${num(y0)} − (${num(a*x0*x0)}) = ${num(C)}.`,
    hint:'Remplace x par l’abscisse de A dans F(x), et égale le résultat à l’ordonnée de A.',diag:([v])=>near(v,y0,1e-6)||near(v,y0+a*x0*x0,1e-6)?'m2-pr-cst':null})};
/* 6. Placer un point de la primitive qui passe par A */
const gM2PrPlace=()=>{let a,x1,x2,y1,y2;do{a=pick([1,-1,.5,-.5]);x1=R(-2,2);x2=R(-3,3);y1=R(-3,3);y2=y1+a*(x2*x2-x1*x1)}while(x2===x1||Math.abs(y2)>4.5);
  const G=`${a}x^2`.replace(/^1x/,'x').replace(/^-1x/,'-x');
  return pointQ({instr:`F est la primitive qui passe par A. Place le point de la courbe de F d’abscisse ${num(x2)}.`,
    prompt:stx('Les primitives de ')+M(`${2*a}x`.replace(/^1x/,'x').replace(/^-1x/,'-x'))+stx(' s’écrivent ')+M(G)+mx(' + C')+stx('. La courbe en pointillés est celle de C = 0.'),
    x:[-4,4],y:[-5,5],snap:.5,tol:.2,cible:[x2,y2],nom:'B',fond:{f:[{f:G,dash:true}],pts:[[x1,y1,'A']]},
    explain:`F(${num(x1)}) = ${num(y1)} donne C = ${num(y1)} − (${num(a*x1*x1)}) = ${num(y1-a*x1*x1)}. Donc F(${num(x2)}) = ${num(a*x2*x2)} ${y1-a*x1*x1<0?'−':'+'} ${num(Math.abs(y1-a*x1*x1))} = ${num(y2)} : B(${num(x2)} ; ${num(y2)}). La courbe de F est la courbe pointillée décalée verticalement de ${num(y1-a*x1*x1)}.`,
    hint:'La courbe de F est la courbe pointillée décalée verticalement pour passer par A. Calcule d’abord ce décalage C.'})};
/* 7. Lire les variations d'une primitive sur la courbe de f */
const gM2PrGraph=()=>{const m=pick([1,-1,2,-2,.5]),r=R(-3,3),f=`${m}*(x${sg(-r)})`;
  return mcq(`Que peut-on dire de toute primitive F de f en x = ${num(r)} ?`,FIG.plot({x:[-5,5],y:[-5,5],f:[f]})+stx('La droite tracée est la courbe de f.'),
    [{h:'F admet un minimum local',ok:m>0,tag:'m2-va-sens'},{h:'F admet un maximum local',ok:m<0,tag:'m2-va-sens'},{h:`F(${num(r)}) = 0`},{h:'F n’a pas d’extremum'}],
    `F′ = f. Or f est ${m>0?'négative avant':'positive avant'} ${num(r)} et ${m>0?'positive':'négative'} après : F ${m>0?'décroît puis croît : minimum':'croît puis décroît : maximum'} local en ${num(r)}. On ne sait rien de la valeur F(${num(r)}) : elle dépend de la constante.`,
    'F′ = f : le signe de f donne les variations de F.')};
/* 8. Formes composées */
const gM2PrComp=()=>{const b=R(1,5),c=b*b+R(1,4),k=R(2,4);
  const T=[[`2x*exp(x^2${sg(b)})`,`exp(x^2${sg(b)})`,'u′eᵘ avec u = x² '+(b>0?'+ ':'− ')+Math.abs(b)+' : primitive eᵘ'],
    [`(2x+${b})/(x^2+${b}x+${c})`,`ln(x^2+${b}x+${c})`,`u′/u avec u = x² + ${b}x + ${c} > 0 : primitive ln u`],
    [`3x^2*(x^3+${b})^2`,`(x^3+${b})^3/3`,`u′u² avec u = x³ + ${b} : primitive u³/3`],
    [`cos(x)*exp(sin(x))`,`exp(sin(x))`,'u′eᵘ avec u = sin x : primitive eᵘ'],
    [`${2*k}x*exp(x^2)`,`${k}*exp(x^2)`,`${k} × 2x e^(x²), de la forme ${k}u′eᵘ avec u = x² : primitive ${k}eᵘ`]][R(0,4)];
  return m2PrimQ('Donne une primitive de f (forme composée).',`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(T[0]),'F(x) =',T[1],`On reconnaît ${T[2]}. F(x) = ${M(T[1])} (+ C). Vérification : en dérivant, on retrouve f.`,
    'Cherche dans f une fonction u et sa dérivée u′ : u′eᵘ → eᵘ, u′/u → ln u, u′uⁿ → uⁿ⁺¹/(n + 1).')};
/* 9. Raisonner : primitive de m·eᵏˣ + b avec condition F(0) = v */
const gM2PrR1=()=>{const k=pick([2,3,-2,4]),q=nz(-3,3),m=k*q,b=nz(-5,5),v=R(-5,5),one=new Fr(1);
  const Ftxt=(c,C,bx=true)=>mx(`${m2CE(c,k)}${bx?` ${b<0?'−':'+'} ${Math.abs(b)===1?'':Math.abs(b)}x`:''}${C===null||C.n===0?'':` ${C.n<0?'−':'+'} ${m2F(new Fr(Math.abs(C.n),C.d))}`}`);
  return chain({instr:'Trouve la primitive demandée en construisant ton raisonnement.',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`${m}exp(${k}x)${sg(b)}`)+stx(` On veut la primitive F telle que F(0) = ${num(v)}.`),
    steps:[
      {q:`Une primitive de e<sup>${k}x</sup> est…`,o:[{h:mx(m2CE(new Fr(1,k),k)),ok:true,f:new Fr(1,k)},{h:mx(m2CE(new Fr(k),k)),f:new Fr(k),why:`(e<sup>${k}x</sup>)′ = ${k}e<sup>${k}x</sup> : pour compenser, on divise par ${k}.`,tag:'m2-pr-k'},
        {h:mx(m2CE(one,k)),f:one,why:`(e<sup>${k}x</sup>)′ = ${k}e<sup>${k}x</sup>, pas e<sup>${k}x</sup> : il faut diviser par ${k}.`,tag:'m2-pr-k'}]},
      {q:'Toutes les primitives de f s’écrivent…',o:prev=>{const c=new Fr(m).mul(prev[0].f);return[
        {h:Ftxt(c,null)+mx(' + C'),ok:true,c,C:1,bx:1},{h:mx(`${m2CE(c,k)} + C`),c,C:1,bx:0,why:`La constante ${num(b)} a pour primitive ${num(b)}x.`,tag:'prim'},
        {h:Ftxt(c,null),c,C:0,bx:1,why:'Sans la constante C, on ne pourra pas imposer F(0).',tag:'m2-pr-cst'}]}},
      {q:'La condition F(0) = '+num(v)+' donne…',o:prev=>{const{c,C}=prev[1];if(!C)return[{h:'aucune constante à ajuster : impossible de conclure',ok:true,K:null},{h:`C = ${m2F(new Fr(v).sub(c))}`,K:null,why:'Ta forme précédente ne contenait pas de constante C.'}];
        return m2Uniq([{h:`C = ${m2F(new Fr(v).sub(c))}`,ok:true,K:new Fr(v).sub(c)},{h:`C = ${num(v)}`,K:new Fr(v),why:`e⁰ = 1, pas 0 : F(0) = ${m2F(c)} + C.`,tag:'m2-pr-cst'},
          {h:`C = ${m2F(new Fr(v).add(c))}`,K:new Fr(v).add(c),why:`${m2F(c)} + C = ${num(v)} donne C = ${num(v)} − (${m2F(c)}).`,tag:'signe'}])}},
      {q:'Donc F(x) = …',o:prev=>{const{c,bx}=prev[1],K=prev[2].K;if(K===null)return[{h:'On ne peut pas trouver F ainsi',ok:true},{h:Ftxt(new Fr(q),new Fr(v-q)),why:'Il fallait garder la constante C.'}];
        return m2Uniq([{h:Ftxt(c,K,!!bx),ok:true},{h:Ftxt(c,K.neg(),!!bx),why:'Le signe de la constante a changé en recopiant.',tag:'signe'},{h:Ftxt(c.mul(new Fr(k)),K,!!bx),why:'Le coefficient devant l’exponentielle a changé en recopiant.',tag:'calc'}])}}],
    explain:`Une primitive de e<sup>${k}x</sup> est e<sup>${k}x</sup>/${k}. Donc F(x) = ${Ftxt(new Fr(q),null)} + C. F(0) = ${num(q)} + C = ${num(v)}, d’où C = ${num(v-q)} et F(x) = ${Ftxt(new Fr(q),new Fr(v-q))}.`})};
/* 10. Raisonner : primitive trigonométrique, et vérification par la dérivée */
const gM2PrR2=()=>{const k=pick([2,3,4]),a=pick([2,3,4,6,-2,-3,-6]),cs=Math.random()<.5,fn=cs?'cos':'sin',other=cs?'sin':'cos';
  const T=(c,g)=>mx(`${m2Co(c)}${g}(${k}x)`),f=T(new Fr(a),fn);
  return chain({instr:'Trouve une primitive de f et vérifie-la, en construisant ton raisonnement.',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+f+FIG.plot({x:[-3.2,3.2],y:[-7,7],pas:1,f:[`${a}${fn}(${k}x)`]}),
    steps:[
      {q:`Une primitive de ${fn}(${k}x) est…`,o:[{h:T(new Fr(cs?1:-1,k),other),ok:true,s:new Fr(cs?1:-1,k)},{h:T(new Fr(cs?-1:1,k),other),s:new Fr(cs?-1:1,k),why:`(${other}(${k}x))′ = ${cs?'':'−'}${k}${fn}(${k}x) : ${cs?'pas de signe moins':'il faut un signe moins'}.`,tag:'signe'},
        {h:T(new Fr(cs?k:-k),other),s:new Fr(cs?k:-k),why:`On divise par ${k}, on ne multiplie pas : la dérivée fait sortir un facteur ${k} qu’il faut compenser.`,tag:'m2-pr-k'}]},
      {q:'Avec le coefficient, une primitive de f est…',o:prev=>{const s=prev[0].s;return m2Uniq([{h:'F(x) = '+T(s.mul(new Fr(a)),other),ok:true,c:s.mul(new Fr(a))},
        {h:'F(x) = '+T(s,other),c:s,why:`Le coefficient ${num(a)} se garde : une primitive de ${num(a)}g est ${num(a)}G.`,tag:'prim'},{h:'F(x) = '+T(s.div(new Fr(a)),other),c:s.div(new Fr(a)),why:`On multiplie par ${num(a)}, on ne divise pas.`,tag:'prim'}])}},
      {q:'Vérification : F′(x) = …',o:prev=>{const c=prev[1].c,d=c.mul(new Fr(cs?k:-k));return m2Uniq([{h:T(d,fn),ok:true,d},{h:T(c,fn),d:c,why:`La dérivée de ${other}(${k}x) fait sortir le facteur ${k}.`,tag:'chaine'},
        {h:T(d.neg(),fn),d:d.neg(),why:`(${other} u)′ = ${cs?'':'−'}u′ ${fn} u : attention au signe.`,tag:'signe'}])}},
      {q:'Conclusion :',o:prev=>{const good=prev[2].d.n===a&&prev[2].d.d===1;return[{h:'F′ = f : F est bien une primitive de f',ok:good,why:'F′ n’est pas égale à f : il faut corriger F.'},
        {h:'F′ ≠ f : F n’est pas une primitive, il faut la corriger',ok:!good,why:'F′ est exactement f : F est bien une primitive.'},{h:'On ne peut pas vérifier une primitive',why:'On peut toujours vérifier en dérivant.'}]}}],
    explain:`Une primitive de ${fn}(${k}x) est ${T(new Fr(cs?1:-1,k),other)}. Avec le coefficient ${num(a)} : F(x) = ${T(new Fr(cs?a:-a,k),other)}. Vérification : F′(x) = ${f}.`})};
ANA_UNITS.push({id:'m2-primitives',tr:'m2',name:'Primitives',sub:'Dériver à l’envers, constante, formes usuelles',glyph:'F′=f',tone:'x',
  skills:[SKA('m2.pr.pente','f(x₀), pente de la primitive',gM2PrPente,1),SKA('m2.pr.pow','Primitive d’une puissance',gIPow,1),SKA('m2.pr.verif','Vérifier une primitive',gM2PrVerif,1),
    SKA('m2.pr.poly','Primitive d’un polynôme',gM2PrPoly,2),SKA('m2.pr.us','Primitives eᵏˣ, cos, sin, 1/x',gIUs,2),SKA('m2.pr.graph','Variations d’une primitive',gM2PrGraph,2),
    SKA('m2.pr.cst','Fixer la constante (figure)',gM2PrCst,2),SKA('m2.pr.place','Placer un point d’une primitive',gM2PrPlace,2),SKA('m2.pr.cond','Primitive avec condition',gM2PrCond,2),
    SKA('m2.pr.r1','Raisonner : eᵏˣ et condition',gM2PrR1,2),SKA('m2.pr.r2','Raisonner : cos, sin et vérification',gM2PrR2,3),SKA('m2.pr.comp','Formes composées',gM2PrComp,3)]});
