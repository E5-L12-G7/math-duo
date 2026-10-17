/* ===================== MVA912 · Équations différentielles du second ordre ===================== */
Object.assign(ANA_ERR,{
  'm2e2-omega':{label:'Diviser par ω',tip:'Pour y = A cos ωx + B sin ωx, y′(0) = Bω : B = y′(0)/ω, pas y′(0).'},
  'm2e2-forme':{label:'Forme selon Δ',tip:'Δ > 0 : deux exponentielles ; Δ = 0 : (A + Bx)e^(rx) ; Δ < 0 : e^(αx)(A cos βx + B sin βx).'},
  'm2e2-double':{label:'Racine double',tip:'Avec une racine double r, la solution est (A + Bx)e^(rx) : A e^(rx) + B e^(rx) ne contient qu’une constante.'},
  'm2e2-cst':{label:'Second membre constant',tip:'Pour y″ + ay′ + by = c, la solution constante est c/b (y′ et y″ sont nuls), à ajouter à la solution homogène.'}});
/** polynôme c2·v² + c1·v + c0 écrit proprement (v = 'r' ou 'y') */
const m2E2Pol=(c1,c0,v='r')=>{let s=`${v}²`;if(c1)s+=` ${c1<0?'−':'+'} ${Math.abs(c1)===1?'':num(Math.abs(c1))}${v}`;if(c0)s+=` ${c0<0?'−':'+'} ${num(Math.abs(c0))}`;return s+' = 0'};
/** équation y″ + p y′ + q y = c */
const m2E2Eq=(p,q,c=0)=>{let s='y″';if(p)s+=` ${p<0?'−':'+'} ${Math.abs(p)===1?'':num(Math.abs(p))}y′`;if(q)s+=` ${q<0?'−':'+'} ${Math.abs(q)===1?'':num(Math.abs(q))}y`;return mx(s+` = ${num(c)}`)};
/** e^(k x) pour k nombre ou texte */
const m2E2E=k=>typeof k==='string'?`e<sup>${k}x</sup>`:k===0?'':m2E1E(k);
const m2E2Trig=(a,b)=>`A cos ${m2E2B(b)} + B sin ${m2E2B(b)}`;
const m2E2B=b=>typeof b==='string'?`(${b})x`:`${b===1?'':num(b)}x`;
/** forme e^(αx)(A cos βx + B sin βx) */
const m2E2Cx=(al,be)=>al===0?m2E2Trig(0,be):`${m2E2E(al)}(${m2E2Trig(0,be)})`;

/* 1. Écrire l'équation caractéristique */
const gM2E2Carac=()=>{const p=nz(-6,6),q=nz(-9,9),m=Math.random()<.3?R(2,3):1;
  const eq=mx(`${m===1?'':m}y″ ${p<0?'−':'+'} ${Math.abs(m*p)===1?'':num(Math.abs(m*p))}y′ ${q<0?'−':'+'} ${num(Math.abs(m*q))}y = 0`);
  const P=(a,b)=>mx(`${m===1?'':m}${m2E2Pol(m*a,m*b)}`);
  return mcq('Quelle est l’équation caractéristique ?',eq,[{h:P(p,q),ok:true},{h:P(-p,q),tag:'ed-carac'},{h:P(p,-q),tag:'ed-carac'},{h:P(q,p),tag:'ed-carac'}],
    `On remplace y″ par r², y′ par r et y par 1, en gardant les coefficients et leurs signes : ${P(p,q)}.`,'y″ → r², y′ → r, y → 1 (on cherche y = e^(rx)).')};
/* 2. Placer la valeur initiale */
const gM2E2Dep=()=>{let A,B,c;do{A=nz(-4,4);B=nz(-4,4);c=R(-3,3)}while(Math.abs(A+B+c)>6||Math.abs(A+c)>6);const om=R(2,4),v=Math.random()<.5;
  const y0=v?A+c:A+B+c,r1=nz(-3,3);let r2;do r2=nz(-3,3);while(r2===r1);
  const h=v?mx(`y = ${m2E1Co(A)}cos ${om}x ${B<0?'−':'+'} ${Math.abs(B)===1?'':Math.abs(B)}sin ${om}x${m2E1Pl(c)}`)
    :mx(`y = ${m2E1Co(A)}${m2E2E(r1)} ${B<0?'−':'+'} ${Math.abs(B)===1?'':Math.abs(B)}${m2E2E(r2)}${m2E1Pl(c)}`);
  return pointQ({instr:'Place le point de départ de la courbe (son point d’abscisse 0).',prompt:stx('La solution est ')+h,nom:'A',x:[-2,4],y:[-7,7],snap:1,tol:.4,cible:[0,y0],fond:{pas:1},
    explain:v?`cos 0 = 1 et sin 0 = 0 : y(0) = ${num(A)}${m2E1Pl(c)} = ${num(y0)}.`:`Toute exponentielle vaut 1 en 0 : y(0) = ${num(A)}${m2E1Pl(B)}${m2E1Pl(c)} = ${num(y0)}.`,
    hint:v?'Que valent cos 0 et sin 0 ?':'Que vaut e⁰ ?',diag:pt=>v&&Math.abs(pt[1]-(A+B+c))<.3?'calc':null})};
/* 3. Oscillateur avec conditions initiales (figure : départ et pente) */
const gM2E2Osc=()=>{const om=R(1,4),A=nz(-4,4),B=nz(-3,3),v=B*om,d=Math.min(.6,1.6/Math.abs(v));
  return exprQ('Trouve la solution qui vérifie les deux conditions initiales.',mx(`y″ + ${om*om===1?'':om*om}y = 0`)+stx(` avec y(0) = ${num(A)} et y′(0) = ${num(v)}`)+
    FIG.plot({x:[-1,4],y:[-6,6],segs:[[-d,A-d*v,d,A+d*v,'var(--t-c)']],pts:[[0,A,'départ']]}),'y =',`${A}*cos(${om}x)+(${B})*sin(${om}x)`,
    `ω² = ${om*om}, donc ω = ${om} et y = A cos ${om}x + B sin ${om}x. y(0) = A = ${num(A)}. y′ = −${om}A sin ${om}x + ${om}B cos ${om}x, donc y′(0) = ${om}B = ${num(v)} et B = ${num(B)}. Solution : y = ${m2E1Co(A)}cos ${om}x ${B<0?'−':'+'} ${Math.abs(B)===1?'':Math.abs(B)}sin ${om}x. Sur la figure, le trait donne la pente de départ y′(0).`,
    'A = y(0) et B = y′(0)/ω. Écris cos(…) et sin(…) avec des parenthèses.',false,
    ([u])=>om>1&&eqv(u,`${A}*cos(${om}x)+(${v})*sin(${om}x)`)?'m2e2-omega':eqv(u,`${A}*exp(${om}x)+(${B})*exp(${-om}x)`)?'m2e2-forme':null)};
/* 4. Forme des solutions selon Δ (figure : la parabole caractéristique) */
const gM2E2Delta=()=>{const k=R(0,2);let p,q,opts,ex;
  if(k===0){const r1=R(-4,3),r2=R(r1+1,4);p=-(r1+r2);q=r1*r2;
    opts=[{h:mx(`y = A${m2E2E(r1)||''} + B${m2E2E(r2)}`).replace('A + ',r1===0?'A + ':'A + '),ok:true},{h:mx(`y = A${m2E2E(-r1)} + B${m2E2E(-r2)}`),tag:'signe'},
      {h:mx(`y = (A + Bx)${m2E2E(r2)}`),tag:'m2e2-double'},{h:mx(`y = ${m2E2Cx(r1,Math.abs(r2)||1)}`),tag:'m2e2-forme'}];
    ex=`Δ = ${p*p-4*q} &gt; 0 : la parabole coupe l’axe en ${num(r1)} et ${num(r2)}, deux racines réelles. Une exponentielle par racine.`}
  else if(k===1){const r=nz(-3,3);p=-2*r;q=r*r;
    opts=[{h:mx(`y = (A + Bx)${m2E2E(r)}`),ok:true},{h:mx(`y = A${m2E2E(r)} + Bx`),tag:'m2e2-double'},{h:mx(`y = (A + Bx)${m2E2E(-r)}`),tag:'signe'},{h:mx(`y = ${m2E2Trig(0,Math.abs(r))}`),tag:'m2e2-forme'}];
    ex=`Δ = 0 : la parabole touche l’axe en un seul point, r = ${num(r)} (racine double). La solution est (A + Bx)e<sup>${m2E1Ex(r)}</sup>.`}
  else{const al=R(-2,2),be=R(1,3);p=-2*al;q=al*al+be*be;
    opts=[{h:mx(`y = ${m2E2Cx(al,be)}`),ok:true},{h:mx(`y = A${m2E2E(al)||''} + B${m2E2E(be)}`),tag:'m2e2-forme'},{h:mx(`y = ${m2E2Cx(be,al||1)}`),tag:'m2e2-forme'},{h:mx(`y = ${m2E2Cx(-al,be)}`),tag:'signe'}];
    ex=`Δ = ${p*p-4*q} &lt; 0 : la parabole ne coupe pas l’axe. Racines complexes ${num(al)} ± ${be===1?'':be}i : α = ${num(al)} (amortissement), β = ${be} (pulsation).`}
  const c=-p/2,mn=q-p*p/4,y1=Math.max(8,mn+5);
  return mcq('Quelle est la forme des solutions ? La figure montre la parabole de l’équation caractéristique.',m2E2Eq(p,q)+FIG.plot({x:[c-4,c+4],y:[Math.min(-4,mn-1),y1],f:[`x^2+(${p})*x+(${q})`],pas:1,pasy:y1>10?2:1}),opts,
    `Équation caractéristique : ${mx(m2E2Pol(p,q))}. ${ex}`,'Écris r² + pr + q = 0 et regarde si la parabole coupe l’axe en 2, 1 ou 0 points.')};
/* 5. Reconnaître le régime sur une courbe */
const gM2E2Graph=()=>{const be=pick([2,3]),om=pick([2,3]),k=R(0,3);
  const E=[{h:m2E2Eq(0,om*om),f:`2*cos(${om}*x)`,t:'oscillation pure : racines ±'+om+'i, pas de frottement'},
    {h:m2E2Eq(2,1+be*be),f:`exp(-x)*(2*cos(${be}*x)+${2/be}*sin(${be}*x))`,t:`oscillation amortie : racines −1 ± ${be}i`},
    {h:m2E2Eq(3,2),f:'4*exp(-x)-2*exp(-2*x)',t:'retour sans osciller : racines réelles −1 et −2'},
    {h:m2E2Eq(-3,2),f:'4*exp(x)-2*exp(2*x)',t:'explosion : racines réelles positives 1 et 2'}];
  return mcq('Cette courbe est la solution avec y(0) = 2 et y′(0) = 0 de l’une de ces équations. Laquelle ?',FIG.plot({x:[0,8],y:[-4,4],f:[E[k].f],pts:[[0,2]]}),
    E.map((e,i)=>({h:e.h,ok:i===k,tag:'m2e2-forme'})),
    `La courbe montre une ${E[k].t}. Racines complexes ⇒ oscillation ; partie réelle négative ⇒ amortie ; racines réelles négatives ⇒ retour sans osciller ; racine positive ⇒ la solution s’envole.`,
    'Oscille-t-elle ? Son amplitude diminue-t-elle ? Cherche le signe et la nature des racines de chaque équation caractéristique.')};
/* 6. Placer une racine complexe de l'équation caractéristique */
const gM2E2Cplx=()=>{const al=R(-3,3),be=R(1,3),p=-2*al,q=al*al+be*be;
  return pointQ({instr:'Place dans le plan complexe la racine de partie imaginaire positive de l’équation caractéristique.',prompt:m2E2Eq(p,q),nom:'r',x:[-4,4],y:[-4,4],snap:1,tol:.4,cible:[al,be],fond:{pas:1},
    explain:`Équation caractéristique ${mx(m2E2Pol(p,q))} : Δ = ${p*p} − ${4*q} = ${p*p-4*q} = (${2*be}i)². Racines (${num(-p)} ± ${2*be}i)/2 = ${num(al)} ± ${be===1?'':be}i. On place r = ${num(al)} + ${be===1?'':be}i au point (${num(al)} ; ${be}). Les solutions sont ${mx(`y = ${m2E2Cx(al,be)}`)}.`,
    hint:'Racines (−p ± i√(−Δ))/2 : la partie réelle se lit en abscisse, la partie imaginaire en ordonnée.',
    diag:pt=>Math.abs(pt[0]+al)<.3&&al?'signe':Math.abs(pt[1]+be)<.3?'signe':null})};
/* 7. Solution constante */
const gM2E2Cst=()=>{const k=nz(-5,5),q=nz(1,9),p=R(-4,4),c=k*q;
  return nq({instr:'Trouve la solution constante (l’équilibre).',prompt:m2E2Eq(p,q,c),labels:['y ='],t:[k],
    explain:`Si y est constante, y′ = y″ = 0 : il reste ${q===1?'':q}y = ${num(c)}, donc y = ${num(k)}. La solution générale est la solution homogène + ${num(k)}.`,
    hint:'Remplace y′ et y″ par 0.',diag:([w])=>q>1&&near(w,c,1e-6)?'m2e2-cst':p&&near(w,c/p,1e-6)?'m2e2-cst':near(w,-k,1e-6)?'signe':null})};
/* Racines écrites proprement */
const m2E2Roots=(P0,P1)=>{const D=P0*P0-4*P1,sq=Math.round(Math.sqrt(Math.abs(D))),perf=sq*sq===Math.abs(D);
  if(D===0){const r=new Fr(-P0,2);return{kind:'dbl',D,txt:`r = ${m2E1Q(r)} (racine double)`,s:r}}
  if(D>0){if(perf){const a=new Fr(-P0-sq,2),b=new Fr(-P0+sq,2);return{kind:'re2',D,txt:`r₁ = ${m2E1Q(a)} et r₂ = ${m2E1Q(b)}`,r1:a,r2:b}}
    const t=s=>`(${num(-P0)} ${s} √${D})/2`;return{kind:'re2',D,txt:`r = (${num(-P0)} ± √${D})/2`,r1:t('−'),r2:t('+')}}
  const al=new Fr(-P0,2),be=perf?new Fr(sq,2):`√${-D}/2`;return{kind:'cx',D,txt:`r = ${m2E1Q(al)} ± ${typeof be==='string'?'i'+be:(be.n===be.d?'':m2E1Q(be))+'i'}`,al,be}};
const m2E2Ex=v=>typeof v==='string'?`e<sup>${v}x</sup>`:(v.n===0?'':m2E1E(v));
const m2E2Bx=v=>typeof v==='string'?`(${v})x`:`${v.n===v.d?'':m2E1Q(v)}x`;
/* 8. Raisonner : résoudre y″ + py′ + qy = 0 */
const gM2E2R1=()=>{const k=R(0,2);let p,q;
  if(k===0){const r1=R(-4,3),r2=R(r1+1,4);p=-(r1+r2);q=r1*r2}else if(k===1){const r=nz(-3,3);p=-2*r;q=r*r}else{const al=nz(-2,2),be=R(1,3);p=-2*al;q=al*al+be*be}
  if(!p||!q)return gM2E2R1();
  const Rt=m2E2Roots(p,q);
  return chain({instr:'Résous l’équation en construisant ton raisonnement.',prompt:m2E2Eq(p,q),
    steps:[
      {q:'L’équation caractéristique est…',o:[
        {h:mx(m2E2Pol(p,q)),ok:true,P:[p,q]},
        {h:mx(m2E2Pol(-p,q)),P:[-p,q],why:'On garde le signe du coefficient de y′ : y′ devient r.',tag:'ed-carac'},
        {h:mx(m2E2Pol(q,p)),P:[q,p],why:'y′ devient r et y devient 1 : les coefficients ne s’échangent pas.',tag:'ed-carac'}]},
      {q:'Son discriminant vaut…',o:prev=>{const[a,b]=prev[0].P,D=a*a-4*b;return[
        {h:`Δ = ${num(a*a)} − ${num(4*b)} = ${num(D)}`.replace('− −','+ '),ok:true,D},
        {h:`Δ = ${num(a*a)} + ${num(4*b)} = ${num(a*a+4*b)}`.replace('+ −','− '),D:a*a+4*b,why:'Δ = b² − 4ac : on soustrait 4 fois le terme constant.',tag:'calc'},
        ...(D?[{h:`Δ = ${num(4*b)} − ${num(a*a)} = ${num(-D)}`.replace('− −','+ '),D:-D,why:'C’est b² − 4ac, pas 4ac − b² : le signe de Δ serait inversé.',tag:'signe'}]:[])]}},
      {q:'Les racines sont…',o:prev=>{const[a,b]=prev[0].P,D=prev[1].D,ok=m2E2Roots(a,b),fake=m2E2Roots(-a,b);
        const opts=[{h:ok.txt,ok:D===a*a-4*b,why:'Ces racines sont justes pour ton équation, mais elles ne correspondent pas au Δ que tu as calculé.',R:ok},
          {h:fake.txt,R:fake,why:'Erreur de signe : les racines valent (−b ± √Δ)/2, avec −b.',tag:'signe'}];
        if(D!==a*a-4*b){const s=D===0?{kind:'dbl',txt:`r = ${m2E1Q(new Fr(-a,2))} (racine double)`,s:new Fr(-a,2)}:D>0?(()=>{const sq=Math.round(Math.sqrt(D));return sq*sq===D?{kind:'re2',txt:`r₁ = ${m2E1Q(new Fr(-a-sq,2))} et r₂ = ${m2E1Q(new Fr(-a+sq,2))}`,r1:new Fr(-a-sq,2),r2:new Fr(-a+sq,2)}:{kind:'re2',txt:`r = (${num(-a)} ± √${D})/2`,r1:`(${num(-a)} − √${D})/2`,r2:`(${num(-a)} + √${D})/2`}})()
            :(()=>{const sq=Math.round(Math.sqrt(-D)),be=sq*sq===-D?new Fr(sq,2):`√${-D}/2`;return{kind:'cx',txt:`r = ${m2E1Q(new Fr(-a,2))} ± ${typeof be==='string'?'i'+be:(be.n===be.d?'':m2E1Q(be))+'i'}`,al:new Fr(-a,2),be}})();
          opts.push({h:s.txt,ok:true,R:s})}
        else if(D<0)opts.push({h:'Aucune racine : l’équation n’a pas de solution',R:null,why:'Avec Δ < 0, les racines sont complexes, et les solutions existent : elles oscillent.',tag:'m2e2-forme'});
        else opts.push({h:`r = ${m2E1Q(new Fr(-a,2))} (racine double)`,R:{kind:'dbl',s:new Fr(-a,2)},why:'Δ ≠ 0 : il y a deux racines distinctes.',tag:'m2e2-forme'});
        return opts}},
      {q:'La solution générale est…',o:prev=>{const Rr=prev[2].R;if(!Rr)return[{h:'On ne peut pas conclure',ok:true},{h:mx(`y = ${m2E2Cx(Rt.al?+Rt.al.n/Rt.al.d:0,1)}`),why:'Les solutions existent bien, mais ton choix précédent ne permet pas de les écrire.'}];
        const base=Rr.kind==='re2'?[Rr.r1,Rr.r2]:Rr.kind==='dbl'?[Rr.s,Rr.s]:[Rr.al,Rr.be];
        const F={re2:mx(`y = A${m2E2Ex(base[0])} + B${m2E2Ex(base[1])}`),dbl:mx(`y = (A + Bx)${m2E2Ex(base[0])}`),
          cx:Rr.kind==='dbl'?mx(`y = A cos ${m2E2Bx(base[0])} + B sin ${m2E2Bx(base[0])}`):mx(`y = ${m2E2Ex(base[0])}(A cos ${m2E2Bx(base[1])} + B sin ${m2E2Bx(base[1])})`)};
        return[{h:F.re2,ok:Rr.kind==='re2',why:'Deux exponentielles réelles seulement quand Δ > 0.',tag:'m2e2-forme'},
          {h:F.dbl,ok:Rr.kind==='dbl',why:'La forme (A + Bx)e^(rx) est réservée à la racine double (Δ = 0).',tag:'m2e2-double'},
          {h:F.cx,ok:Rr.kind==='cx',why:'cos et sin n’apparaissent que pour des racines complexes (Δ < 0).',tag:'m2e2-forme'}]}}],
    explain:`Équation caractéristique ${mx(m2E2Pol(p,q))}, Δ = ${num(Rt.D)}, ${Rt.txt}. ${Rt.kind==='re2'?`Δ &gt; 0 : y = A${m2E2Ex(Rt.r1)} + B${m2E2Ex(Rt.r2)}.`:Rt.kind==='dbl'?`Δ = 0 : y = (A + Bx)${m2E2Ex(Rt.s)}.`:`Δ &lt; 0 : y = ${m2E2Ex(Rt.al)}(A cos ${m2E2Bx(Rt.be)} + B sin ${m2E2Bx(Rt.be)}).`}`})};
/* 9. Raisonner : oscillateur avec second membre constant et deux conditions */
const gM2E2R2=()=>{const om=R(1,3),k=nz(-3,3),A=nz(-3,3),B=nz(-3,3),c=k*om*om,y0=A+k,v0=B*om,W=om===1?'':om;
  const sol=(a,b,K)=>mx(`y = ${m2E1Q(a)} cos ${W}x ${m2E1F(b).n<0?'−':'+'} ${m2E1Q(new Fr(Math.abs(m2E1F(b).n),m2E1F(b).d))} sin ${W}x${m2E1Pl(K)}`).replace(/(= |[+−] )1 (cos|sin)/g,'$1$2');
  const solE=(a,b,K)=>mx(`y = ${m2E1Q(a)}e<sup>${W}x</sup> ${m2E1F(b).n<0?'−':'+'} ${m2E1Q(new Fr(Math.abs(m2E1F(b).n),m2E1F(b).d))}e<sup>−${W}x</sup>${m2E1Pl(K)}`);
  const ym=Math.abs(A)+Math.abs(B)+Math.abs(k)+1;
  return chain({instr:'Résous le problème en construisant ton raisonnement.',prompt:m2E2Eq(0,om*om,c)+stx(` avec y(0) = ${num(y0)} et y′(0) = ${num(v0)}`)+
    FIG.plot({x:[0,7],y:[-ym,ym],f:[`${A}*cos(${om}*x)+(${B})*sin(${om}*x)+(${k})`,{f:`${k}+0*x`,c:1,dash:true}],pts:[[0,y0,'départ']],pasy:ym>6?2:1}),
    steps:[
      {q:'Une solution particulière constante est…',o:[
        {h:mx(`y<sub>p</sub> = ${num(k)}`),ok:true,K:k},
        ...(om>1?[{h:mx(`y<sub>p</sub> = ${num(c)}`),K:c,why:`Avec y″ = 0 : ${om*om}y = ${num(c)}, il faut diviser par ${om*om}.`,tag:'m2e2-cst'}]:[]),
        {h:mx(`y<sub>p</sub> = ${num(-k)}`),K:-k,why:'Aucun changement de signe : ω²y = c donne y = c/ω².',tag:'signe'}]},
      {q:'La solution générale est…',o:prev=>{const K=prev[0].K;return[
        {h:mx(`y = A cos ${W}x + B sin ${W}x${m2E1Pl(K)}`),ok:true,f:'ok'},
        {h:mx(`y = A e<sup>${W}x</sup> + B e<sup>−${W}x</sup>${m2E1Pl(K)}`),f:'exp',why:`r² + ${om*om} = 0 a pour racines ±${W}i (complexes) : ce sont des cos et des sin.`,tag:'m2e2-forme'},
        {h:mx(`y = A cos ${W}x + B sin ${W}x`),f:'nop',why:'Il manque la solution particulière : générale = homogène + particulière.',tag:'m2e2-cst'}]}},
      {q:`La condition y(0) = ${num(y0)} donne…`,o:prev=>{const K=prev[0].K,f=prev[1].f;return[
        {h:mx(`A = ${num(y0-K)}`),Av:y0-K,ok:f==='ok',why:f==='nop'?'Avec ta forme sans solution particulière, y(0) = A.':'Avec des exponentielles, y(0) = A + B (+ y_p).',tag:'ed-ci'},
        {h:mx(`A = ${num(y0)}`),Av:y0,ok:f==='nop',why:'y(0) contient aussi la solution particulière : A = y(0) − y_p.',tag:'ed-ci'},
        {h:mx(`A + B = ${num(y0-K)}`),ok:f==='exp',why:'Avec cos et sin, sin 0 = 0 : B disparaît en x = 0.',tag:'ed-ci'},
        {h:mx(`A = ${num(y0+K)}`),Av:y0+K,why:'Erreur de signe : on soustrait la solution particulière.',tag:'signe'}]}},
      {q:`La condition y′(0) = ${num(v0)} donne…`,o:prev=>{const f=prev[1].f;return[
        {h:mx(`B = ${num(v0)}/${om} = ${num(B)}`).replace(`${num(v0)}/1 = `,''),ok:f!=='exp',why:'Avec des exponentielles, y′(0) = ωA − ωB.',Bv:B},
        ...(om>1?[{h:mx(`B = ${num(v0)}`),Bv:v0,why:`y′(0) = ${om}B : il faut diviser par ω = ${om}.`,tag:'m2e2-omega'}]:[]),
        {h:mx(`A − B = ${m2E1Q(new Fr(v0,om))}`),ok:f==='exp',v:'sys',why:'Avec cos et sin, y′(0) = ωB : A n’intervient pas.',tag:'ed-ci'}]}},
      {q:'Conclusion : la solution est…',o:prev=>{const K=prev[0].K,f=prev[1].f,s3=prev[2],s4=prev[3];
        const Kf=f==='nop'?0:K;let Av,Bv;
        if(f==='exp'){const S=new Fr(y0-K),Dd=new Fr(v0,om);Av=S.add(Dd).div(new Fr(2));Bv=S.sub(Dd).div(new Fr(2));
          return[{h:solE(Av,Bv,K),ok:true},{h:solE(Bv,Av,K),why:'A et B ont été échangés en résolvant le système.',tag:'calc'},{h:solE(Av,Bv,-K),why:'Erreur de signe sur la solution particulière.',tag:'signe'}]}
        Av=new Fr(s3.Av??(y0-Kf));Bv=new Fr(s4.Bv??B);
        return[{h:sol(Av,Bv,Kf),ok:true},{h:sol(Bv,Av,Kf),why:'A multiplie le cosinus (position de départ), B le sinus (vitesse de départ).',tag:'calc'},{h:sol(Av,Bv,Kf?-Kf:K),why:'Erreur de signe sur la solution particulière.',tag:'signe'}]}}],
    explain:`y<sub>p</sub> = ${num(c)}/${om*om} = ${num(k)} ; y = A cos ${W}x + B sin ${W}x${m2E1Pl(k)}. y(0) = A${m2E1Pl(k)} = ${num(y0)}, donc A = ${num(A)} ; y′(0) = ${om}B = ${num(v0)}, donc B = ${num(B)}. Solution : ${sol(new Fr(A),new Fr(B),k)}. Elle oscille autour de l’équilibre ${num(k)} (pointillés).`})};
ANA_UNITS.push({id:'m2-edo2',tr:'m2',name:'Équations différentielles (2)',sub:'y″ + ay′ + by = c, équation caractéristique, oscillations',glyph:'y″',tone:'x',
  skills:[SKA('m2.ed2.carac','Équation caractéristique',gM2E2Carac,1),SKA('m2.ed2.dep','Placer la valeur initiale',gM2E2Dep,1),SKA('m2.ed2.cst','Solution constante',gM2E2Cst,1),
    SKA('m2.ed2.osc','Oscillateur et conditions initiales',gM2E2Osc,2),SKA('m2.ed2.racines','Racines caractéristiques',gEdCar,2),SKA('m2.ed2.delta','Forme selon Δ',gM2E2Delta,2),
    SKA('m2.ed2.graph','Reconnaître un régime',gM2E2Graph,2),SKA('m2.ed2.cplx','Racine complexe dans le plan',gM2E2Cplx,2),SKA('m2.ed2.r1','Raisonner : les trois cas',gM2E2R1,2),
    SKA('m2.ed2.r2','Raisonner : oscillateur et conditions',gM2E2R2,3),SKA('m2.ed2.part','Second membre exponentiel',gEdPart,3),SKA('m2.ed2.amp','Amplitude et période',gEdOsc,3)]});
