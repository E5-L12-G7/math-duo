/* ===================== MVA912 · Équations différentielles du premier ordre ===================== */
Object.assign(ANA_ERR,{
  'm2e1-eq':{label:'Solution d’équilibre',tip:'Pour y′ + ay = b, la solution constante s’obtient en posant y′ = 0 : a·y = b, donc y = b/a (et non a/b, ni b).'},
  'm2e1-norm':{label:'Forme normalisée',tip:'Avant d’appliquer y = C e^(−ax) + b/a, divise tout par le coefficient de y′ pour obtenir y′ + ay = b.'},
  'm2e1-stab':{label:'Stable ou instable',tip:'Pour y′ + ay = b : si a > 0, les solutions rejoignent l’équilibre ; si a < 0, elles s’en éloignent.'},
  'm2e1-lin':{label:'Décroissance exponentielle',tip:'L’écart à l’équilibre est multiplié par le même nombre sur chaque durée égale : il ne diminue pas de façon linéaire.'}});
/* Outils d'écriture */
const m2E1F=v=>v instanceof Fr?v:new Fr(v,1);
/** nombre ou fraction en HTML */
const m2E1Q=v=>{const f=m2E1F(v);return f.d===1?num(f.n):(f.n<0?MINUS:'')+fr(Math.abs(f.n),f.d)};
/** exposant k·x écrit en ligne : −2x, x/2, −x */
const m2E1Ex=v=>{const f=m2E1F(v),s=f.n<0?MINUS:'',a=Math.abs(f.n);return`${s}${a===1?'':a}x${f.d===1?'':'/'+f.d}`};
const m2E1E=v=>`e<sup>${m2E1Ex(v)}</sup>`;
/** « + 3 » ou « − 3/2 » (rien si nul) */
const m2E1Pl=v=>{const f=m2E1F(v);return f.n===0?'':(f.n<0?' − ':' + ')+m2E1Q(new Fr(Math.abs(f.n),f.d))};
/** coefficient devant une lettre : 1 → rien, −1 → − */
const m2E1Co=v=>{const f=m2E1F(v);return f.n===f.d?'':f.n===-f.d?MINUS:m2E1Q(f)};
/** équation y′ + ay = b (a, b entiers) */
const m2E1Eq=(a,b)=>mx(`y′ ${a<0?'−':'+'} ${Math.abs(a)===1?'':Math.abs(a)}y = ${num(b)}`);
/** y = C e^(kx) + E en HTML */
const m2E1Sol=(C,k,E)=>{const c=m2E1F(C);return mx(`y = ${c.n===0?m2E1Q(E):m2E1Co(c)+m2E1E(k)+m2E1Pl(E)}`)};
const m2E1Gen=(k,E,lab='C')=>mx(`y = ${lab}${m2E1E(k)}${m2E1Pl(E)}`);

/* 1. Reconnaître une solution */
const gM2E1Verif=()=>{const a=pick([-4,-3,-2,-1,1,2,3,4]),q=nz(-5,5),b=a*q;let C;do C=R(2,4);while(C===q);
  return mcq('Laquelle de ces fonctions est solution de l’équation ?',m2E1Eq(a,b),[
    {h:m2E1Sol(C,-a,q),ok:true},{h:m2E1Sol(C,a,q),tag:'signe'},{h:m2E1Sol(C,-a,-q),tag:'m2e1-eq'},
    {h:m2E1Sol(q,-a,C),tag:'ed-ci'},{h:m2E1Sol(C,-a,b),tag:'m2e1-eq'}],
    `Si y = ${C}${m2E1E(-a)}${m2E1Pl(q)}, alors y′ = ${num(-a*C)}${m2E1E(-a)}, et y′ ${a<0?'−':'+'} ${Math.abs(a)===1?'':Math.abs(a)}y = ${num(-a*C)}${m2E1E(-a)}${m2E1Pl(a*C)}${m2E1E(-a)}${m2E1Pl(a*q)} = ${num(b)}. Les exponentielles s’annulent : l’égalité est vraie pour tout x. La constante ${num(q)} = ${num(b)}/${num(a)} est l’équilibre.`,
    'Dérive chaque fonction, remplace dans y′ + ay et compare au second membre.')};
/* 2. Solution constante (équilibre) */
const gM2E1Cst=()=>{const v=R(0,3),q=nz(-9,9);let pr,ex,diag;
  if(v===0){const a=R(1,9),b=a*q;pr=m2E1Eq(a,b);ex=`Une constante a une dérivée nulle : ${a===1?'':a}y = ${num(b)}, donc y = ${num(q)}.`;diag=w=>near(w,-q,1e-6)?'signe':a>1&&near(w,b,1e-6)?'m2e1-eq':null}
  else if(v===1){const m=R(2,5),a=R(1,4),n=m*a,p=n*q;pr=mx(`${m}y′ + ${n}y = ${num(p)}`);ex=`Avec y′ = 0 : ${n}y = ${num(p)}, donc y = ${num(q)}. (Le coefficient de y′ ne joue aucun rôle pour l’équilibre, mais il compte pour l’exposant.)`;
    diag=w=>near(w,-q,1e-6)?'signe':near(w,p/m,1e-6)?'m2e1-norm':null}
  else if(v===2){const k=pick([0.1,0.2,0.5,2,3]),T=R(5,30);
    return nq({instr:'Vers quelle température (en °C) tend θ ? C’est la solution constante.',prompt:mx(`θ′ = −${num(k)}(θ − ${T})`)+stx(' (loi de refroidissement de Newton)'),labels:['θ ='],t:[T],
      explain:`Si θ est constante, θ′ = 0, donc θ − ${T} = 0 : l’équilibre est ${T} °C, la température de la pièce.`,hint:'Remplace θ′ par 0.',diag:([w])=>near(w,-T,1e-6)?'signe':null})}
  else{const a=pick([-3,-2,-1,1,2,3]),b=-a*q;pr=mx(`y′ = ${a===1?'':a===-1?MINUS:num(a)}y ${b<0?'−':'+'} ${Math.abs(b)}`);ex=`Avec y′ = 0 : ${num(a)}y ${b<0?'−':'+'} ${Math.abs(b)} = 0, donc y = −b/a = ${num(q)}.`;diag=w=>near(w,-q,1e-6)?'signe':null}
  return nq({instr:'Trouve la solution constante de l’équation.',prompt:pr,labels:['y ='],t:[q],explain:ex,hint:'Une fonction constante a une dérivée nulle : remplace y′ par 0.',diag:([w])=>diag(w)})};
/* 3. Placer le point de départ d'une solution */
const gM2E1Place=()=>{let C,q;do{C=nz(-4,4);q=R(-3,3)}while(Math.abs(C+q)>6||C+q===q);const k=pick([-2,-1,1,2,-3]);
  return pointQ({instr:'Place le point de la courbe d’abscisse 0 (la valeur initiale).',prompt:stx('La fonction solution est ')+m2E1Sol(C,k,q),nom:'A',x:[-2,4],y:[-7,7],snap:1,tol:.4,cible:[0,C+q],fond:{pas:1},
    explain:`En x = 0, e<sup>0</sup> = 1, donc y(0) = ${num(C)} × 1${m2E1Pl(q)} = ${num(C+q)}. Le point de départ est A(0 ; ${num(C+q)}).`,
    hint:'Remplace x par 0 : que vaut e⁰ ?',diag:pt=>Math.abs(pt[1]-C)<.3||Math.abs(pt[1]-q)<.3?'ed-ci':null})};
/* 4. Lire l'équilibre sur la courbe */
const gM2E1Lire=()=>{let C,q;do{C=nz(-5,5);q=R(-4,4)}while(Math.abs(C+q)>6||Math.abs(C)<2);const a=pick([1,1.5,2]);
  return pointQ({instr:'Cette courbe est une solution de y′ + ay = b. Place sur l’axe des ordonnées le point E à la hauteur de l’équilibre.',prompt:'',nom:'E',x:[-1,6],y:[-7,7],snap:1,tol:.4,cible:[0,q],
    fond:{f:[`${C}*exp(${-a}*x)+(${q})`],pas:1},
    explain:`La courbe s’aplatit vers la hauteur ${num(q)} quand x grandit : c’est l’équilibre b/a. Ici y = ${num(C)}${m2E1E(new Fr(-2*a,2))}${m2E1Pl(q)} et E(0 ; ${num(q)}). Attention, le point de départ (0 ; ${num(C+q)}) n’est pas l’équilibre.`,
    hint:'Regarde vers quelle hauteur la courbe se stabilise tout à droite.',diag:pt=>Math.abs(pt[1]-(C+q))<.3?'m2e1-eq':null})};
/* 5. Solution générale d'une équation non normalisée */
const gM2E1Gen=()=>{const m=R(2,4),a=pick([-3,-2,-1,1,2,3]),n=m*a,q=nz(-4,4),p=n*q;
  return mcq('Quelle est la solution générale ? (C est une constante réelle.)',mx(`${m}y′ ${n<0?'−':'+'} ${Math.abs(n)}y = ${num(p)}`),[
    {h:m2E1Gen(-a,q),ok:true},{h:m2E1Gen(-n,q),tag:'m2e1-norm'},{h:m2E1Gen(a,q),tag:'signe'},{h:m2E1Gen(-a,p),tag:'m2e1-eq'}],
    `On divise par ${m} : y′ ${a<0?'−':'+'} ${Math.abs(a)===1?'':Math.abs(a)}y = ${num(a*q)}. Équilibre : ${num(a*q)}/${num(a)} = ${num(q)}. Homogène : C${m2E1E(-a)}. Donc y = C${m2E1E(-a)}${m2E1Pl(q)}.`,
    'Divise d’abord tout par le coefficient de y′.')};
/* 6. Mettre sous forme normalisée */
const gM2E1Norm=()=>{const k=R(2,5),a=nz(-4,4),b=nz(-6,6),d=k*a,c=k*b;
  return nq({instr:'Écris l’équation sous la forme y′ + ay = b. Donne a et b.',prompt:mx(`${k}y′ = ${num(c)} ${d<0?'+':'−'} ${Math.abs(d)}y`),labels:['a =','b ='],t:[a,b],
    explain:`On regroupe : ${k}y′ ${d<0?'−':'+'} ${Math.abs(d)}y = ${num(c)}, puis on divise tout par ${k} : y′ ${a<0?'−':'+'} ${Math.abs(a)===1?'':Math.abs(a)}y = ${num(b)}. Donc a = ${num(a)} et b = ${num(b)}.`,
    hint:'Passe le terme en y à gauche (il change de signe), puis divise tout par le coefficient de y′.',
    diag:([u,w])=>near(u,d,1e-6)||near(w,c,1e-6)?'m2e1-norm':near(u,-a,1e-6)?'signe':null})};
/* 7. Résoudre avec une condition initiale */
const gM2E1Ci=()=>{const a=pick([-2,-1,1,2,3]),q=nz(-4,4),b=a*q;let y0;do y0=R(-5,5);while(y0===q);const C=y0-q,t=`${C}*exp(${-a}*x)+(${q})`;
  return exprQ('Trouve la solution qui vérifie la condition initiale.',m2E1Eq(a,b)+stx(` et y(0) = ${num(y0)}`)+FIG.plot({x:[-1,4],y:[-7,7],f:[{f:`${q}+0*x`,c:1,dash:true}],pts:[[0,y0,'départ']]}),'y =',t,
    `Équilibre : ${num(b)}/${num(a)} = ${num(q)} (pointillés). Solution générale : y = C${m2E1E(-a)}${m2E1Pl(q)}. En x = 0 : C${m2E1Pl(q)} = ${num(y0)}, donc C = ${num(C)}. Solution : y = ${m2E1Co(C)}${m2E1E(-a)}${m2E1Pl(q)}. ${a>0?'Elle rejoint l’équilibre.':'Comme a &lt; 0, elle s’en éloigne.'}`,
    'Solution générale C e^(−ax) + b/a, puis y(0) donne C. Écris exp(…) pour l’exponentielle.',false,
    ([u])=>eqv(u,`${y0}*exp(${-a}*x)+(${q})`)?'ed-ci':eqv(u,`${C}*exp(${a}*x)+(${q})`)?'signe':eqv(u,`${C}*exp(${-a}*x)`)?'m2e1-eq':null)};
/* 8. Associer une courbe à son équation */
const gM2E1Graph=()=>{const a=pick([2,3]),q=nz(-3,3);let C;do C=nz(-4,4);while(Math.abs(C+q)>6);
  return mcq('De quelle équation cette courbe est-elle une solution ?',FIG.plot({x:[-.5,5],y:[-7,7],f:[`${C}*exp(${-a}*x)+(${q})`],pts:[[0,C+q]]}),[
    {h:m2E1Eq(a,a*q),ok:true},{h:m2E1Eq(-a,-a*q),tag:'m2e1-stab'},{h:m2E1Eq(a,-a*q),tag:'signe'},{h:m2E1Eq(a,q),tag:'m2e1-eq'}],
    `La courbe se stabilise à la hauteur ${num(q)} : l’équilibre b/a vaut ${num(q)}. Elle s’en rapproche, donc a &gt; 0 (équilibre stable). Seule y′ + ${a}y = ${num(a*q)} convient : ${num(a*q)}/${a} = ${num(q)}. L’équation y′ − ${a}y = ${num(-a*q)} a le même équilibre mais ses solutions s’en éloignent.`,
    'Lis la hauteur où la courbe se stabilise (b/a), puis demande-toi si elle s’en rapproche (a > 0) ou s’en éloigne (a < 0).')};
/* 9. Refroidissement de Newton (avec la courbe) */
const gM2E1Newton=()=>{const T=R(15,25),n=R(1,3),q=R(2,8),th0=T+2**n*q,tau=pick([2,4,5]);
  return nq({instr:`Quelle est la température après ${n*tau} minutes (en °C) ?`,prompt:stx(`Un objet à ${th0} °C refroidit dans une pièce à ${T} °C. L’écart avec la pièce est divisé par 2 toutes les ${tau} minutes.`)+
    FIG.plot({x:[0,(n+1)*tau],y:[0,th0+10],f:[`${T}+${th0-T}*exp(-ln(2)*x/${tau})`,{f:`${T}+0*x`,c:1,dash:true}],pts:[[0,th0,'départ']],pas:tau,pasy:10,etiqy:20}),labels:['θ ='],t:[T+q],
    explain:`θ(t) = ${T} + ${th0-T}e<sup>−kt</sup> : c’est l’écart avec la pièce qui fond. Écart initial ${th0-T} °C, divisé ${n} fois par 2 : ${th0-T} ÷ ${2**n} = ${q} °C. Température : ${T} + ${q} = ${T+q} °C.`,
    hint:'C’est l’écart avec la pièce qui est divisé par 2, pas la température elle-même.',
    diag:([w])=>near(w,th0/2**n,1e-6)||near(w,q,1e-6)?'ed-ci':near(w,th0-n*(th0-T)/2,1e-6)?'m2e1-lin':null})};
/* 10. Raisonner : résoudre y′ + ay = b avec y(0) = y0 (les erreurs se propagent) */
const gM2E1R1=()=>{const a=pick([-3,-2,-1,2,3,4]),q=pick([-3,-2,2,3,4]),b=a*q;let y0;do y0=R(-5,5);while(y0===q||y0===0);
  const A=new Fr(a),B=new Fr(b),Y=new Fr(y0);
  return chain({instr:'Résous l’équation avec sa condition initiale, en construisant ton raisonnement.',prompt:m2E1Eq(a,b)+stx(` et y(0) = ${num(y0)}`)+FIG.plot({x:[-1,3],y:[-7,7],pts:[[0,y0,'départ']]}),
    steps:[
      {q:'La solution constante (l’équilibre) est…',o:[
        {h:mx(`y = ${m2E1Q(B.div(A))}`),ok:true,E:B.div(A)},
        {h:mx(`y = ${m2E1Q(A.div(B))}`),E:A.div(B),why:`Avec y′ = 0 : ${num(a)}y = ${num(b)}, donc y = b/a et non a/b.`,tag:'m2e1-eq'},
        {h:mx(`y = ${m2E1Q(B.div(A).neg())}`),E:B.div(A).neg(),why:'Pas de changement de signe ici : a·y = b donne directement y = b/a.',tag:'signe'},
        {h:mx(`y = ${num(b)}`),E:B,why:`Il faut diviser par a = ${num(a)} : ${num(a)}y = ${num(b)}.`,tag:'m2e1-eq'}]},
      {q:'Les solutions de l’équation homogène y′ + ay = 0 sont…',o:[
        {h:mx(`y = C${m2E1E(-a)}`),ok:true,k:-a},
        {h:mx(`y = C${m2E1E(a)}`),k:a,why:`y′ = ${num(-a)}y : l’exposant est −a·x = ${m2E1Ex(-a)}.`,tag:'signe'},
        {h:mx(`y = C${m2E1E(-b)}`),k:-b,why:'L’exposant ne dépend que de a, le coefficient de y ; le second membre n’y intervient pas.'}]},
      {q:'La solution générale est donc…',o:prev=>{const E=prev[0].E,k=prev[1].k;return[
        {h:m2E1Gen(k,E),ok:true,f:'ok'},
        {h:m2E1Gen(k,0),f:'nop',why:'Il manque la solution constante : générale = homogène + équilibre.',tag:'m2e1-eq'},
        {h:m2E1Gen(k,E.neg()),f:'neg',why:'On ajoute l’équilibre tel quel, sans changer son signe.',tag:'signe'}]}},
      {q:`Avec y(0) = ${num(y0)}, la constante vaut…`,o:prev=>{const E=prev[0].E,f=prev[2].f;const vals={ok:Y.sub(E),nop:Y,neg:Y.add(E)};return[
        {h:mx(`C = ${m2E1Q(vals.ok)}`),ok:f==='ok',V:vals.ok,why:f==='ok'?'':'C’est la bonne valeur pour la vraie solution générale, mais pas pour la forme que tu as choisie.',tag:'ed-ci'},
        {h:mx(`C = ${m2E1Q(vals.nop)}`),ok:f==='nop',V:vals.nop,why:'y(0) = C + (équilibre) : C n’est pas directement y(0).',tag:'ed-ci'},
        {h:mx(`C = ${m2E1Q(vals.neg)}`),ok:f==='neg',V:vals.neg,why:'Erreur de signe en isolant C : on soustrait l’équilibre.',tag:'signe'}]}},
      {q:'Conclusion : la solution est…',o:prev=>{const E=prev[0].E,k=prev[1].k,f=prev[2].f,V=prev[3].V,Ef=f==='ok'?E:f==='neg'?E.neg():new Fr(0);return[
        {h:m2E1Sol(V,k,Ef),ok:true},
        {h:m2E1Sol(V,-k,Ef),why:'L’exposant a changé de signe en route : garde celui de l’homogène.',tag:'signe'},
        {h:m2E1Sol(Y,k,Ef),why:`On remplace C par la valeur trouvée, pas par y(0) = ${num(y0)}.`,tag:'ed-ci'}]}}],
    explain:`Équilibre ${num(b)}/${num(a)} = ${num(q)} ; homogène C${m2E1E(-a)} ; générale y = C${m2E1E(-a)}${m2E1Pl(q)} ; y(0) = C${m2E1Pl(q)} = ${num(y0)} donne C = ${num(y0-q)}. Solution : ${m2E1Sol(y0-q,-a,q)}.`+
      FIG.plot({x:[-1,3],y:[-7,7],f:[`${y0-q}*exp(${-a}*x)+(${q})`,{f:`${q}+0*x`,c:1,dash:true}],pts:[[0,y0]]})})};
/* 11. Raisonner : modéliser un refroidissement et trouver un temps */
const gM2E1R2=()=>{const T=R(15,25),g0=pick([40,48,56,64,72,80]),th0=T+g0,t1=R(3,10),th1=T+g0/2,n=pick([2,3]),th2=T+g0/2**n;
  const tN=n*t1,tZ=t1*Math.log(th2/th0)/Math.log(th1/th0),tL=t1*(th0-th2)/(th0-th1);
  return chain({instr:'Résous le problème en construisant ton raisonnement.',prompt:stx(`Un plat sort du four à ${th0} °C dans une cuisine à ${T} °C. Après ${t1} min, il est à ${num(th1)} °C. Au bout de combien de temps sera-t-il à ${num(th2)} °C ?`)+
    FIG.plot({x:[0,tN+t1],y:[0,th0+10],f:[{f:`${T}+0*x`,c:1,dash:true}],pts:[[0,th0,'départ'],[t1,th1,'mesure']],pas:t1>5?2:1,pasy:10,etiq:t1>5?4:2,etiqy:20}),
    steps:[
      {q:'Quel modèle choisir pour la température θ(t) ?',o:[
        {h:mx(`θ′ = −k(θ − ${T}), k &gt; 0`),ok:true,m:'n'},
        {h:mx('θ′ = −kθ, k &gt; 0'),m:'z',why:`Ce modèle ferait tendre le plat vers 0 °C ; il doit tendre vers la température de la cuisine, ${T} °C.`},
        {h:mx(`θ′ = k(θ − ${T}), k &gt; 0`),m:'p',why:'Avec ce signe, un plat plus chaud que la pièce se réchaufferait encore : l’équilibre serait instable.',tag:'signe'}]},
      {q:'La solution de ce modèle est…',o:prev=>{const m=prev[0].m;return[
        {h:mx(`θ(t) = ${T} + ${g0}e<sup>−kt</sup>`),ok:m==='n',why:'C’est la bonne solution du bon modèle, mais elle ne découle pas de l’équation que tu as choisie.'},
        {h:mx(`θ(t) = ${th0}e<sup>−kt</sup>`),ok:m==='z',why:'Cette solution suppose un équilibre à 0 °C.'},
        {h:mx(`θ(t) = ${T} + ${g0}e<sup>kt</sup>`),ok:m==='p',why:'L’exponentielle croissante fait s’éloigner de l’équilibre.',tag:'signe'},
        {h:mx(`θ(t) = ${T} + ${th0}e<sup>−kt</sup>`),why:`En t = 0, cela donnerait ${T+th0} °C : le coefficient est l’écart de départ ${th0} − ${T} = ${g0}.`,tag:'ed-ci'}]}},
      {q:`La mesure θ(${t1}) = ${num(th1)} donne…`,o:prev=>{const m=prev[0].m;return[
        {h:mx(`e<sup>−${t1}k</sup> = ${fr(num(th1-T),g0)} = ${fr(1,2)}`),ok:m==='n',why:'C’est la bonne relation, mais pas celle de ton modèle.'},
        {h:mx(`e<sup>−${t1}k</sup> = ${fr(num(th1),th0)}`),ok:m==='z',why:'On doit travailler sur l’écart avec la cuisine, pas sur la température brute.'},
        {h:mx(`e<sup>${t1}k</sup> = ${fr(1,2)}`),ok:m==='p',why:'Avec ce signe, k serait négatif : contradiction avec k > 0.',tag:'signe'},
        {h:mx(`e<sup>−${t1}k</sup> = ${num(th1-T)}`),why:`Il faut diviser par l’écart initial ${g0} pour isoler l’exponentielle.`,tag:'ed-ci'}]}},
      {q:`Donc le plat atteint ${num(th2)} °C au bout de…`,o:prev=>{const m=prev[0].m,okv=m==='z'?tZ:tN;return[
        {h:`${dec(tN,1)} min (l’écart est divisé par 2, ${n} fois)`,ok:okv===tN,why:'C’est le bon résultat, mais il ne découle pas de ton modèle.'},
        {h:`${dec(tZ,1)} min`,ok:okv===tZ,why:'Ce calcul utilise les températures brutes au lieu des écarts avec la cuisine.'},
        {h:`${dec(tL,1)} min (on prolonge la baisse régulière)`,why:'La baisse n’est pas linéaire : l’écart est multiplié par 1/2 tous les '+t1+' min.',tag:'m2e1-lin'}]}}],
    explain:`Modèle θ′ = −k(θ − ${T}), solution θ(t) = ${T} + ${g0}e<sup>−kt</sup>. La mesure donne e<sup>−${t1}k</sup> = 1/2 : l’écart est divisé par 2 toutes les ${t1} min. On veut un écart de ${num(th2-T)} = ${g0}/${2**n} : il faut ${n} divisions par 2, soit ${n} × ${t1} = ${tN} min (avec les logarithmes : t = ln(${2**n})/k).`})};
/* 12. Expert : solution particulière d'un second membre non constant */
const gM2E1Part=()=>{const a=nz(-3,3);
  if(Math.random()<.5){let m;do m=nz(-3,3);while(m===-a);const A=nz(-3,3),K=A*(m+a);
    return exprQ(`Trouve la solution particulière de la forme A e<sup>${m2E1Ex(m)}</sup>.`,mx(`y′ ${a<0?'−':'+'} ${Math.abs(a)===1?'':Math.abs(a)}y = ${num(K)}${m2E1E(m)}`),'y_p =',`${A}*exp(${m}*x)`,
      `On pose y = A${m2E1E(m)} : y′ = ${num(m)}A${m2E1E(m)}. En remplaçant : (${num(m)} ${a<0?'−':'+'} ${Math.abs(a)})A${m2E1E(m)} = ${num(K)}${m2E1E(m)}, soit ${num(m+a)}A = ${num(K)}, donc A = ${num(A)} et y<sub>p</sub> = ${m2E1Co(A)}${m2E1E(m)}.`,
      'Remplace y = A e^(mx) dans l’équation, puis divise par l’exponentielle.',false,([u])=>eqv(u,`${K}*exp(${m}*x)`)?'calc':null)}
  const al=nz(-3,3),be=R(-4,4),c=a*al,d=al+a*be;
  return exprQ('Trouve la solution particulière affine (de la forme αx + β).',mx(`y′ ${a<0?'−':'+'} ${Math.abs(a)===1?'':Math.abs(a)}y = ${num(c)}x${d?(d<0?' − ':' + ')+Math.abs(d):''}`),'y_p =',`${al}*x+(${be})`,
    `On pose y = αx + β, donc y′ = α. En remplaçant : α + ${num(a)}(αx + β) = ${num(c)}x${m2E1Pl(d)}. On identifie : ${num(a)}α = ${num(c)}, donc α = ${num(al)} ; α + ${num(a)}β = ${num(d)}, donc β = ${num(be)}. y<sub>p</sub> = ${m2E1Co(al)}x${m2E1Pl(be)}.`,
    'Pose y = αx + β, remplace, puis identifie le coefficient de x et la constante.',false,([u])=>eqv(u,`${al}*x`)&&be?'calc':null)};
ANA_UNITS.push({id:'m2-edo1',tr:'m2',name:'Équations différentielles (1)',sub:'y′ + ay = b, équilibre, condition initiale',glyph:'y′',tone:'c',
  skills:[SKA('m2.ed1.verif','Reconnaître une solution',gM2E1Verif,1),SKA('m2.ed1.cst','Trouver l’équilibre',gM2E1Cst,1),SKA('m2.ed1.place','Placer la valeur initiale',gM2E1Place,1),
    SKA('m2.ed1.lire','Lire l’équilibre sur la courbe',gM2E1Lire,1),SKA('m2.ed1.gen','Solution générale',gM2E1Gen,2),SKA('m2.ed1.norm','Forme normalisée',gM2E1Norm,2),
    SKA('m2.ed1.ci','Résoudre avec y(0)',gM2E1Ci,2),SKA('m2.ed1.graph','Courbe et équation',gM2E1Graph,2),SKA('m2.ed1.newton','Refroidissement de Newton',gM2E1Newton,2),
    SKA('m2.ed1.r1','Raisonner : y′ + ay = b avec y(0)',gM2E1R1,2),SKA('m2.ed1.r2','Raisonner : modéliser un refroidissement',gM2E1R2,3),SKA('m2.ed1.part','Second membre non constant',gM2E1Part,3)]});
