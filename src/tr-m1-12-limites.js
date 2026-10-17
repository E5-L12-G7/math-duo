/* ===================== MVA911 · Limites et continuité ===================== */
Object.assign(ANA_ERR,{
  'm1lim-asy':{label:'Asymptote horizontale ou verticale',tip:'Limite finie L en ±∞ : asymptote horizontale y = L. Limite infinie quand x → a : asymptote verticale x = a.'},
  'm1lim-cont':{label:'Ensemble de continuité',tip:'Une fonction usuelle est continue là où elle est définie : enlève les valeurs qui annulent un dénominateur, garde ce qui est ≥ 0 sous une racine.'},
  'm1lim-tvi':{label:'Hypothèses du TVI',tip:'Il faut que f soit continue sur [a ; b] et que f(a) et f(b) soient de signes contraires ; on obtient alors au moins une solution.'}});
const M1LIM_S=v=>v<0?MINUS:'+';
const M1LIM_X=(a,v='x')=>a?`${v} ${M1LIM_S(-a)} ${Math.abs(a)}`:v;   // « x − a »
/* 1. Lire une limite ou une asymptote sur une courbe (placer un point) */
const gM1LimLire=()=>{const L=nz(-3,3),p=pick([-3,-2,-1,1,2]),k=pick([-2,-1,1,2]),f=`${L}+${k}/(x-(${p}))`,v=Math.random()<.6,inf=pick(['+∞','−∞']);
  return pointQ({instr:v?`Place, sur l’axe des ordonnées, la valeur vers laquelle tend f(x) quand x → ${inf}.`:'Place, sur l’axe des abscisses, la valeur a où la courbe a une asymptote verticale.',
    prompt:stx('La courbe de f est tracée ci-dessous. Suis-la loin vers '+(v?(inf==='+∞'?'la droite':'la gauche'):'le haut ou le bas')+'.'),nom:v?'L':'a',
    x:[-6,6],y:[-6,6],snap:.5,tol:.24,cible:v?[0,L]:[p,0],fond:{f:[f],pas:1,etiq:2},
    explain:v?`Loin vers ${inf==='+∞'?'la droite':'la gauche'}, la courbe se colle à la droite horizontale y = ${num(L)} : lim f(x) = ${num(L)} quand x → ${inf}. C’est une asymptote horizontale.`
      :`Quand x s’approche de ${num(p)}, la courbe part vers ±∞ : la droite x = ${num(p)} est une asymptote verticale (f n’est pas définie en ${num(p)}).`,
    hint:v?'Repère la hauteur de la droite horizontale que la courbe frôle sans la toucher.':'Cherche la droite verticale près de laquelle la courbe s’envole.',
    diag:pt=>v&&Math.abs(pt[0]-L)<.3?'m1lim-asy':!v&&Math.abs(pt[1]-p)<.3?'m1lim-asy':null})};
/* 2. Limites de référence, avec la courbe */
const M1LIM_REF=()=>{const n=R(2,4);return[[`x<sup>${n}</sup>`,`x^${n}`,'+∞',0],[`x<sup>${n}</sup>`,`x^${n}`,'−∞',n%2?1:0],['√x','sqrt(x)','+∞',0],[fr(1,'x'),'1/x','+∞',2],[fr(1,'x'),'1/x','−∞',2],
  [fr(1,'x'),'1/x','0<sup>+</sup>',0],[fr(1,'x'),'1/x','0<sup>−</sup>',1],[fr(1,'x<sup>2</sup>'),'1/x^2','0',0],[fr(1,'√x'),'1/sqrt(x)','+∞',2],['−x<sup>2</sup>','-x^2','+∞',1]]};
const gM1LimRef=()=>{const[e,f,p,c]=pick(M1LIM_REF()),O=['+∞','−∞','0','1'];
  return mcq('Quelle est la limite ? Aide-toi de la courbe.',fsLim(mx(e),p)+FIG.plot({x:[-4,4],y:[-4,4],f:[f]}),
    O.map((h,i)=>i===c?{h:mx(h),ok:true}:{h:mx(h),tag:p.startsWith('0')?'fs-lim-signe':'signe'}),
    `Limite de référence : ${fsLim(mx(e),p)} = ${O[c]}. Sur la courbe, ${c===2?'les valeurs se rapprochent de l’axe horizontal (0)':c===0?'la courbe monte sans limite':'la courbe descend sans limite'} ${p.startsWith('0')?'quand x s’approche de 0':p==='+∞'?'vers la droite':'vers la gauche'}.`,
    'Regarde la courbe dans la bonne direction : à droite pour +∞, à gauche pour −∞, près de l’axe vertical pour 0.',true)};
/* 3. Limite en un point où la fonction est continue */
const gM1LimPt=()=>{if(Math.random()<.7){const a=pick([-1,1]),b=R(-3,3),c=R(-3,3),x0=R(-2,2),P=x=>a*x*x+b*x+c,v=P(x0);
    let lo=Infinity,hi=-Infinity;for(let x=x0-2.5;x<=x0+2.5;x+=.1){lo=Math.min(lo,P(x));hi=Math.max(hi,P(x))}const ps=hi-lo>12?4:hi-lo>6?2:1;
    return nq({instr:'Calcule la limite.',prompt:`<span class="m">lim<sub>x→${num(x0)}</sub></span> `+M(poly([a,b,c]))+FIG.plot({x:[x0-2.5,x0+2.5],y:[Math.floor(lo)-1,Math.ceil(hi)+1],pasy:ps,f:[poly([a,b,c])],pts:[[x0,v,'M']]}),
      labels:['Limite ='],t:[v],explain:`Un polynôme est continu : la limite en ${num(x0)} est sa valeur, ${a<0?MINUS:''}(${num(x0)})² ${M1LIM_S(b*x0)} ${Math.abs(b*x0)} ${M1LIM_S(c)} ${Math.abs(c)} = ${num(v)}. C’est l’ordonnée du point M.`,
      hint:'La fonction est continue en ce point : remplace simplement x par la valeur.',diag:([w])=>near(w,-v,1e-6)&&v?'signe':null})}
  const k=R(1,3),c=R(-3,3),x0=k*k-c;
  return nq({instr:'Calcule la limite.',prompt:fsLim(mx(`√(${M1LIM_X(-c)})`),num(x0))+FIG.plot({x:[-4,10],y:[-1,4],f:[`sqrt(x+${c})`],pts:[[x0,k,'M']],pas:2}),labels:['Limite ='],t:[k],
    explain:`La racine carrée est continue là où elle est définie : on remplace x par ${num(x0)}, √(${num(x0)} ${M1LIM_S(c)} ${Math.abs(c)}) = √${k*k} = ${k}.`,hint:'Remplace x par la valeur, puis calcule la racine.',diag:([w])=>near(w,k*k,1e-6)?'calc':null})};
/* 4. Asymptotes d'une fonction homographique : placer leur point d'intersection */
const gM1LimAsy=()=>{let a,b,c;do{a=nz(-3,3);b=R(-6,6);c=R(-3,3)}while(a*c+b===0);
  const fx=`(${poly([a,b])})/(${poly([1,-c])})`;
  return pointQ({instr:'Place le point où se coupent l’asymptote verticale et l’asymptote horizontale de la courbe.',prompt:fsFx(fx),nom:'Ω',x:[-5,5],y:[-5,5],snap:.5,tol:.24,cible:[c,a],fond:{pas:1,etiq:1},
    explain:`Le dénominateur s’annule en x = ${num(c)} (pas le numérateur) : asymptote verticale x = ${num(c)}. En ±∞, on garde les termes dominants : ${a===1?'':num(a)}x/x = ${num(a)} : asymptote horizontale y = ${num(a)}. Elles se coupent en Ω(${num(c)} ; ${num(a)}).`+
      FIG.plot({x:[-6,6],y:[-6,6],f:[fx],pts:[[c,a,'Ω',1]],segs:[[c,-6,c,6,'var(--bad)'],[-6,a,6,a,'var(--bad)']],pas:1,etiq:2}),
    hint:'Verticale : la valeur qui annule le dénominateur. Horizontale : le quotient des coefficients de x.',diag:pt=>near(pt[0],a,.3)&&near(pt[1],c,.3)?'m1lim-asy':near(pt[0],-c,.3)&&c?'signe':null})};
/* 5. Ensemble de continuité d'une fonction usuelle */
const gM1LimCont=()=>{const a=nz(-3,3),A=num(a),t=R(0,4);
  const T=[[fr(1,M1LIM_X(a)),`1/(x-(${a}))`,1],[`√(${M1LIM_X(a)})`,`sqrt(x-(${a}))`,2],[`x<sup>3</sup> ${M1LIM_S(-a)} ${Math.abs(a)}x`,`x^3-(${a})x`,0],
    [fr('x + 1','x<sup>2</sup> + 1'),'(x+1)/(x^2+1)',0],[fr(`|${M1LIM_X(a)}|`,M1LIM_X(a)),`abs(x-(${a}))/(x-(${a}))`,1]][t];
  const O=['ℝ',`]−∞ ; ${A}[ et ]${A} ; +∞[`,`[${A} ; +∞[`,`]${A} ; +∞[`];
  const W=['Cette fonction n’est pas définie partout : cherche une valeur interdite.','','La racine est définie en '+A+' (√0 = 0) : la borne est incluse.','Ici la fonction n’a aucune contrainte de signe.'];
  return mcq('Sur quel ensemble f est-elle continue ?',`<span class="m"><i>f</i>(<i>x</i>) = </span>`+mx(T[0])+FIG.plot({x:[-5,5],y:[-4,4],f:[T[1]]}),
    O.map((h,i)=>i===T[2]?{h:mx(h),ok:true}:{h:mx(h),tag:'m1lim-cont'}),
    [`Un polynôme ou un quotient dont le dénominateur ne s’annule jamais (x² + 1 ≥ 1) est continu sur ℝ.`,`f n’est pas définie en ${A} (dénominateur nul) : elle est continue sur chacun des intervalles ]−∞ ; ${A}[ et ]${A} ; +∞[. La courbe est en deux morceaux.`,
      `√X n’existe que pour X ≥ 0 : x − ${a<0?`(${A})`:A} ≥ 0 ⟺ x ≥ ${A}. f est continue sur [${A} ; +∞[.`][T[2]],
    'Une fonction usuelle est continue partout où elle est définie : cherche les valeurs interdites.',true)};
/* 6. Raisonner : le théorème des valeurs intermédiaires */
const gM1LimTvi=()=>{const p=R(1,4),n=R(0,2),lo=n**3+p*n,hi=(n+1)**3+p*(n+1);if(hi-lo<2)return gM1LimTvi();const q=R(lo+1,hi-1),f=x=>x**3+p*x-q;
  const ex=`x^3+${p}x-${q}`,fa=f(n),fb=f(n+1);
  return chain({instr:'Montre que l’équation f(x) = 0 a une solution, en construisant ton raisonnement.',prompt:fsFx(poly([1,0,p,-q]))+stx(` On travaille sur l’intervalle [${n} ; ${n+1}].`)+FIG.plot({x:[n-1,n+2],y:[-8,8],pasy:2,f:[ex]}),
    steps:[
      {q:'Pourquoi peut-on utiliser le théorème des valeurs intermédiaires ?',o:[
        {h:`f est continue sur [${n} ; ${n+1}], car c’est un polynôme`,ok:true},
        {h:`f est croissante sur [${n} ; ${n+1}]`,why:'La monotonie ne suffit pas : une fonction croissante peut faire un saut. L’hypothèse clé est la continuité.',tag:'m1lim-tvi'},
        {h:`f prend des valeurs entières en ${n} et en ${n+1}`,why:'Que les valeurs soient entières ne joue aucun rôle : le TVI demande la continuité.',tag:'m1lim-tvi'}]},
      {q:'Les valeurs aux bornes sont :',o:[
        {h:mx(`f(${n}) = ${num(fa)} et f(${n+1}) = ${num(fb)}`),ok:true,A:fa,B:fb},
        {h:mx(`f(${n}) = ${num(n**3+p*n+q)} et f(${n+1}) = ${num((n+1)**3+p*(n+1)+q)}`),A:n**3+p*n+q,B:(n+1)**3+p*(n+1)+q,why:`Le terme constant est −${q} : on le soustrait.`,tag:'signe'},
        {h:mx(`f(${n}) = ${num(n*n+p*n-q)} et f(${n+1}) = ${num((n+1)**2+p*(n+1)-q)}`),A:n*n+p*n-q,B:(n+1)**2+p*(n+1)-q,why:'x³ et non x² : on élève au cube.',tag:'calc'}].filter((o,i,a)=>a.findIndex(z=>z.h===o.h)===i)},
      {q:'On en déduit :',o:prev=>{const s=prev[1].A*prev[1].B<0;return[
        {h:'f(x) change de signe entre les deux bornes : 0 est compris entre ces valeurs',ok:s,c:1,why:s?'':'Avec ces valeurs, le signe ne change pas.'},
        {h:'f(x) garde le même signe aux deux bornes',ok:!s,c:0,why:s?'Une valeur est négative et l’autre positive : il y a bien un changement de signe.':''},
        {h:'f(x) vaut 0 au milieu de l’intervalle',c:2,why:'Rien ne dit que la solution est au milieu : le TVI ne localise pas précisément la solution.',tag:'m1lim-tvi'}].map(o=>o.ok?o:Object.assign(o,{why:o.why||'Compare les signes des deux valeurs.'}))}},
      {q:'Conclusion :',o:prev=>{const c=prev[2].c;return[
        {h:`l’équation f(x) = 0 a au moins une solution dans [${n} ; ${n+1}]`,ok:c===1,why:'Sans changement de signe, le TVI ne garantit rien.',tag:'m1lim-tvi'},
        {h:`le TVI ne permet pas de conclure sur [${n} ; ${n+1}]`,ok:c!==1,why:'Continuité et changement de signe : le TVI s’applique.',tag:'m1lim-tvi'},
        {h:`l’équation f(x) = 0 n’a aucune solution dans [${n} ; ${n+1}]`,why:'Même sans changement de signe aux bornes, la courbe pourrait couper l’axe deux fois : on ne peut jamais conclure « aucune solution » ainsi.',tag:'m1lim-tvi'}]}}],
    explain:`f est continue sur [${n} ; ${n+1}] (polynôme). f(${n}) = ${num(fa)} &lt; 0 et f(${n+1}) = ${num(fb)} &gt; 0 : 0 est compris entre les deux. D’après le TVI, f(x) = 0 a au moins une solution dans [${n} ; ${n+1}]. Comme f′(x) = 3x² + ${p} &gt; 0, f est strictement croissante : la solution est unique.`})};
ANA_UNITS.push({id:'m1-limites',tr:'m1',name:'Limites et continuité',sub:'Vers où va la fonction ? Asymptotes, formes indéterminées',glyph:'lim',tone:'c',
  skills:[SKA('m1.lim.lire','Lire une limite sur une courbe',gM1LimLire,1),SKA('m1.lim.ref','Limites de référence',gM1LimRef,1),SKA('m1.lim.pt','Limite en un point',gM1LimPt,1),
    SKA('m1.lim.ops','Opérations et formes indéterminées',gFsLimOps,1),SKA('m1.lim.poly','Limite d’un polynôme',gFsLimPoly,2),SKA('m1.lim.rat','Limite d’une fraction en +∞',gFlLimInf,2),
    SKA('m1.lim.asy','Placer le centre des asymptotes',gM1LimAsy,2),SKA('m1.lim.cont','Où une fonction est continue',gM1LimCont,2),SKA('m1.lim.r1','Raisonner : lever ∞/∞',gFsLimR1,2),
    SKA('m1.lim.tvi','Raisonner : valeurs intermédiaires',gM1LimTvi,3),SKA('m1.lim.r2','Raisonner : limite en un point interdit',gFsLimR2,3),SKA('m1.lim.zero','Lever une forme 0/0',gFl00,3)]});
