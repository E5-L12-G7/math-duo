/* ===================== MVA912 · Intégrale et aire ===================== */
Object.assign(ANA_ERR,{
  'm2-in-ordre':{label:'Bornes inversées',tip:'On calcule toujours F(borne du haut) − F(borne du bas), et F(a) entre parenthèses.'},
  'm2-in-aire':{label:'Intégrale prise pour une aire',tip:'L’intégrale compte en négatif ce qui est sous l’axe ; une aire additionne les morceaux en valeur absolue (on coupe aux zéros de f).'}});
const m2Int=(a,b)=>mx(`∫<sub>${num(a)}</sub><sup>${num(b)}</sup>`);
/* 1. Aire d'un trapèze sous une droite */
const gM2InRect=()=>{let a,b,m,p,fa,fb;do{a=R(0,3);b=R(a+1,5);m=pick([1,-1,2,-2,.5]);p=R(0,6);fa=m*a+p;fb=m*b+p}while(fa<0||fb<0||fa>6||fb>6||!Number.isInteger(fa)||!Number.isInteger(fb));
  const f=poly([m,p]),t=(b-a)*(fa+fb)/2;
  return nq({instr:`Calcule l’intégrale de f entre ${num(a)} et ${num(b)} en utilisant l’aire coloriée.`,prompt:stx('I = ')+m2Int(a,b)+mx(' <i>f</i>(x) d<i>x</i>')+stx(', avec ')+`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(f)+FIG.plot({x:[-1,6],y:[-1,7],f:[f],aire:{f,a,b},pts:[[a,fa],[b,fb]]}),
    labels:['I ='],t:[t],
    explain:`La zone est un trapèze de bases f(${num(a)}) = ${num(fa)} et f(${num(b)}) = ${num(fb)}, de hauteur ${num(b-a)} : aire = ${num(b-a)} × (${num(fa)} + ${num(fb)}) ÷ 2 = ${num(t)}.`,
    hint:'Aire d’un trapèze : hauteur × (petite base + grande base) ÷ 2. Ici les bases sont verticales.',diag:([v])=>near(v,(b-a)*(fa+fb),1e-6)?'aire':null})};
/* 2. Placer la borne qui donne une aire voulue */
const gM2InBorne=()=>{const k=pick([1,2,3,4]),b=pick([1,1.5,2,2.5,3,3.5,4,4.5,5]),A=k*b;
  return pointQ({instr:`Place sur l’axe des abscisses la borne b telle que l’intégrale de 0 à b de f vaut ${num(A)}.`,prompt:`<span class="m"><i>f</i>(<i>x</i>) = ${k}</span>`+stx(` : la zone sous la courbe est un rectangle de hauteur ${k}.`),
    x:[-1,6],y:[-1,5],snap:.5,tol:.2,cible:[b,0],nom:'b',fond:{f:[String(k)]},
    explain:`Le domaine est un rectangle de hauteur ${k} et de largeur b : ${k} × b = ${num(A)}, donc b = ${num(A)} ÷ ${k} = ${num(b)}.`,hint:'Aire d’un rectangle : largeur × hauteur. Ici la hauteur est connue.'})};
/* 3. Relation de Chasles et échange des bornes */
const gM2InChas=()=>{const a=R(-3,0),b=R(a+1,2),c=R(b+1,5),u=nz(-9,9),w=nz(-9,9),t=R(0,2);
  const I=(p,q)=>m2Int(p,q).replace('</span>','')+' <i>f</i>(<i>x</i>) d<i>x</i></span>';
  const C=[[`${I(a,b)} = ${num(u)} et ${I(b,c)} = ${num(w)}`,I(a,c),u+w,`Chasles : ${I(a,c)} = ${num(u)} + (${num(w)}) = ${num(u+w)}.`],
    [`${I(a,c)} = ${num(u)} et ${I(a,b)} = ${num(w)}`,I(b,c),u-w,`Chasles : ${I(a,c)} = ${I(a,b)} + ${I(b,c)}, donc ${I(b,c)} = ${num(u)} − (${num(w)}) = ${num(u-w)}.`],
    [`${I(a,b)} = ${num(u)} et ${I(b,c)} = ${num(w)}`,I(c,a),-(u+w),`${I(a,c)} = ${num(u+w)} (Chasles), et échanger les bornes change le signe : ${I(c,a)} = ${num(-(u+w))}.`]][t];
  return nq({instr:'Calcule l’intégrale I demandée.',prompt:stx('On sait que ')+C[0]+stx('. Calcule I = ')+C[1]+'.'+FIG.droiteNum({min:a-1,max:c+1,pts:[[a,'a'],[b,'b'],[c,'c']]}),labels:['I ='],t:[C[2]],explain:C[3],
    hint:'On peut couper l’intervalle en morceaux et additionner ; échanger les bornes change le signe.',diag:([v])=>near(v,-C[2],1e-6)?'m2-in-ordre':null})};
/* 4. Signe d'une intégrale lu sur la figure */
const gM2InSigne=()=>{let m,r,a,b,t;do{m=pick([1,-1,2,-1.5]);r=R(-1,2);a=R(-3,r-1);b=R(r+1,4);t=m*((b-r)**2-(a-r)**2)/2}while(Math.abs(t)<1&&t!==0);
  const f=`${m}*(x${sg(-r)})`;
  return mcq(`Quel est le signe de l’intégrale de f entre ${num(a)} et ${num(b)} ?`,FIG.plot({x:[-4,5],y:[-5,5],f:[f],aire:{f,a,b}}),
    [{h:'Positive',ok:t>0,tag:'m2-in-aire'},{h:'Négative',ok:t<0,tag:'m2-in-aire'},{h:'Nulle',ok:t===0,tag:'m2-in-aire'}],
    `Au-dessus de l’axe, un triangle d’aire ${num(Math.abs(m)*((m>0?b-r:r-a))**2/2)} ; en dessous, un triangle d’aire ${num(Math.abs(m)*((m>0?r-a:b-r))**2/2)}, compté négativement. Intégrale = ${num(t)} : ${t>0?'positive':t<0?'négative':'nulle'}.`,
    'Compare la partie coloriée au-dessus de l’axe (comptée en plus) et celle en dessous (comptée en moins).',true)};
/* 5. Aire géométrique quand f change de signe */
const gM2InAire=()=>{const m=pick([1,-1,2]),r=R(-1,2),a=R(-3,r-1),b=R(r+1,4),f=`${m}*(x${sg(-r)})`,A=Math.abs(m)*((r-a)**2+(b-r)**2)/2,I=m*((b-r)**2-(a-r)**2)/2;
  return nq({instr:`Calcule l’aire totale de la zone coloriée (entre la droite et l’axe, de ${num(a)} à ${num(b)}).`,prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(poly([m,-m*r]))+FIG.plot({x:[-4,5],y:[-5,6],f:[f],aire:{f,a,b}}),
    labels:['Aire ='],t:[A],explain:`La droite coupe l’axe en x = ${num(r)}. Deux triangles : ${num(Math.abs(m)*(r-a)**2/2)} et ${num(Math.abs(m)*(b-r)**2/2)}. L’aire les additionne : ${num(A)}. (L’intégrale, elle, vaudrait ${num(I)}.)`,
    hint:'Coupe au point où la droite traverse l’axe, calcule l’aire de chaque triangle, puis additionne (une aire est toujours positive).',diag:([v])=>near(v,I,1e-6)?'m2-in-aire':null})};
/* 6. Valeur moyenne */
const gM2InMoy=()=>{const k=pick([1,2,3]),B=pick([1,2,3]),I=k*B**3/3,mu=k*B*B/3,f=`${k}x^2`.replace(/^1x/,'x');
  return nq({instr:`Calcule la valeur moyenne de f sur [0 ; ${B}].`,prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(f)+FIG.plot({x:[-.5,B+.5],y:[-1,k*B*B+1],pas:1,pasy:k*B*B>9?3:1,f:[f,{f:String(mu),c:1,dash:true}],aire:{f,a:0,b:B}})+stx('En pointillés : la hauteur du rectangle de même aire.'),
    labels:['μ ='],t:[mu],explain:`∫₀^${B} ${k===1?'':k}x² dx = [${k===1?'':k}x³/3]₀^${B} = ${m2F(new Fr(k*B**3,3))}. On divise par la longueur ${B} : μ = ${m2F(new Fr(k*B*B,3))}.`,
    hint:'μ = (1/(b − a)) × intégrale de a à b. Calcule l’intégrale, puis divise par la longueur de l’intervalle.',diag:([v])=>near(v,I,1e-6)?'fs2-moy':null})};
/* 7. Raisonner : calculer une intégrale avec une primitive */
const gM2InR1=()=>{let c,d,e;do{c=R(-2,2);d=R(-3,3);e=R(-4,4)}while(!c||!d);const a=R(-1,1),b=R(a+1,3);
  const ev3=(co,x)=>co.reduce((s,k,i)=>s.add(k.mul(new Fr(x**(co.length-1-i)))),new Fr(0)),ps=co=>{const s=co.map(q=>q.d===1?q.n:q.n/q.d);return M(poly(s.map(v=>+v.toFixed(6))))};
  const f=[new Fr(3*c),new Fr(2*d),new Fr(e)],Fok=[new Fr(c),new Fr(d),new Fr(e),new Fr(0)],Fd=[new Fr(6*c),new Fr(2*d)],Fn=[new Fr(3*c),new Fr(2*d),new Fr(e),new Fr(0)];
  return chain({instr:'Calcule l’intégrale en construisant ton raisonnement.',prompt:m2Int(a,b)+' ('+M(poly([3*c,2*d,e]))+') '+mx('d<i>x</i>'),
    steps:[
      {q:'Une primitive de la fonction est…',o:[{h:'F(x) = '+ps(Fok),ok:true,F:Fok},{h:'F(x) = '+ps(Fd),F:Fd,why:'Tu as dérivé au lieu de chercher une primitive.',tag:'prim'},
        {h:'F(x) = '+ps(Fn),F:Fn,why:'On monte la puissance, mais il faut aussi diviser par la nouvelle puissance.',tag:'prim'}]},
      {q:`F(${num(b)}) vaut…`,o:prev=>{const F=prev[0].F,v=ev3(F,b);return m2Uniq([{h:m2F(v),ok:true,v},{h:m2F(v.neg()),v:v.neg(),why:'Attention aux signes en remplaçant x.',tag:'signe'},{h:m2F(v.add(new Fr(1))),v:v.add(new Fr(1)),why:'Erreur de calcul : refais la somme terme à terme.',tag:'calc'}])}},
      {q:`F(${num(a)}) vaut…`,o:prev=>{const F=prev[0].F,v=ev3(F,a);return m2Uniq([{h:m2F(v),ok:true,v},{h:m2F(ev3(F,-a).add(new Fr(a?0:2))),v:ev3(F,-a).add(new Fr(a?0:2)),why:`Remplace x par ${num(a)}, avec ses parenthèses.`,tag:'signe'},{h:m2F(v.add(new Fr(2))),v:v.add(new Fr(2)),why:'Erreur de calcul : refais la somme terme à terme.',tag:'calc'}])}},
      {q:'L’intégrale vaut…',o:prev=>{const B=prev[1].v,A=prev[2].v;return m2Uniq([{h:`${m2F(B)} − (${m2F(A)}) = ${m2F(B.sub(A))}`,ok:true},
        {h:`${m2F(A)} − (${m2F(B)}) = ${m2F(A.sub(B))}`,why:'C’est F(borne du haut) − F(borne du bas), pas l’inverse.',tag:'m2-in-ordre'},{h:`${m2F(B)} + (${m2F(A)}) = ${m2F(B.add(A))}`,why:'On soustrait F(a), on ne l’ajoute pas.',tag:'m2-in-ordre'}])}}],
    explain:`F(x) = ${ps(Fok)}. F(${num(b)}) = ${m2F(ev3(Fok,b))} et F(${num(a)}) = ${m2F(ev3(Fok,a))}. Intégrale : ${m2F(ev3(Fok,b).sub(ev3(Fok,a)))}.`})};
/* 8. Raisonner : aire entre une parabole et l'axe (f change de signe) */
const gM2InR2=()=>{const k=pick([1,2,3]),G=x=>new Fr(x**3,3).sub(new Fr(k*k*x)),f=`x^2-${k*k}`;
  return chain({instr:'Calcule l’aire de la zone coloriée en construisant ton raisonnement.',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(f)+stx(` sur [0 ; ${2*k}]. Une primitive est F(x) = x³/3 − ${k*k}x.`)+FIG.plot({x:[-.5,2*k+.5],y:[-k*k-1,3*k*k+1],pas:k>1?1:.5,pasy:k*k,f:[f],aire:{f,a:0,b:2*k}}),
    steps:[
      {q:'Sur [0 ; '+(2*k)+'], f change de signe en…',o:m2Uniq([{h:`x = ${k}`,ok:true,z:k},{h:`x = ${k*k}`,z:k*k,why:`x² = ${k*k} donne x = ${k}, pas ${k*k}.`,tag:'calc'},{h:'nulle part',z:null,why:`f(0) = ${num(-k*k)} &lt; 0 et f(${2*k}) = ${3*k*k} &gt; 0 : f change de signe.`,tag:'signe'}])},
      {q:'Les intégrales sur chaque morceau valent…',o:prev=>{const z=prev[0].z;if(z===null||z>=2*k)return[{h:`une seule intégrale : ${m2F(G(2*k).sub(G(0)))}`,ok:true,P:null},{h:`${m2F(G(k).sub(G(0)))} puis ${m2F(G(2*k).sub(G(k)))}`,P:null,why:'Sans point de changement de signe, on ne découpe pas.'}];
        const I1=G(z).sub(G(0)),I2=G(2*k).sub(G(z));return m2Uniq([{h:`${m2F(I1)} sur [0 ; ${z}] et ${m2F(I2)} sur [${z} ; ${2*k}]`,ok:true,P:[I1,I2]},
          {h:`${m2F(I1.neg())} sur [0 ; ${z}] et ${m2F(I2)} sur [${z} ; ${2*k}]`,P:[I1.neg(),I2],why:'Sous l’axe, l’intégrale est négative : F(z) − F(0) le confirme.',tag:'m2-in-aire'},
          {h:`${m2F(G(0).sub(G(z)))} sur [0 ; ${z}] et ${m2F(G(z).sub(G(2*k)))} sur [${z} ; ${2*k}]`,P:[G(0).sub(G(z)),G(z).sub(G(2*k))],why:'C’est F(borne du haut) − F(borne du bas).',tag:'m2-in-ordre'}])}},
      {q:'L’aire de la zone vaut…',o:prev=>{const P=prev[1].P;if(!P){const I=G(2*k).sub(G(0));return[{h:m2F(I),ok:true},{h:m2F(new Fr(2*k**3)),why:'Ce résultat suppose un découpage que tu n’as pas fait.'}]}
        const ab=q=>q.n<0?q.neg():q,A=ab(P[0]).add(ab(P[1])),S=P[0].add(P[1]);return m2Uniq([{h:m2F(A),ok:true},{h:m2F(S),why:'C’est l’intégrale totale : l’aire additionne les morceaux en valeur absolue.',tag:'m2-in-aire'},{h:m2F(ab(P[1])),why:'L’aire compte aussi le morceau sous l’axe.',tag:'m2-in-aire'}])}}],
    explain:`f s’annule en ${k}. ∫₀^${k} f = ${m2F(G(k))} (sous l’axe) et ∫_${k}^${2*k} f = ${m2F(G(2*k).sub(G(k)))}. Aire = ${m2F(G(k).neg())} + ${m2F(G(2*k).sub(G(k)))} = ${num(2*k**3)}.`})};
ANA_UNITS.push({id:'m2-integrale',tr:'m2',name:'Intégrale et aire',sub:'Aire sous la courbe, F(b) − F(a), Chasles',glyph:'∫',tone:'sq',
  skills:[SKA('m2.in.rect','Intégrale par une aire de trapèze',gM2InRect,1),SKA('m2.in.borne','Placer une borne',gM2InBorne,1),SKA('m2.in.aff','Intégrale d’une fonction affine',gIAff,1),
    SKA('m2.in.signe','Signe d’une intégrale',gM2InSigne,2),SKA('m2.in.chas','Chasles et bornes',gM2InChas,2),SKA('m2.in.poly','Intégrale d’un polynôme',gIPoly,2),
    SKA('m2.in.aire','Aire quand f change de signe',gM2InAire,2),SKA('m2.in.expln','Intégrales de eˣ et 1/x',gIExpLn,2),SKA('m2.in.moy','Valeur moyenne',gM2InMoy,2),
    SKA('m2.in.r1','Raisonner : F(b) − F(a)',gM2InR1,2),SKA('m2.in.deux','Aire entre deux courbes',gIAire,3),SKA('m2.in.r2','Raisonner : aire et changement de signe',gM2InR2,3)]});
