/* ===================== MVA911 · Géométrie du triangle : Pythagore, Thalès, trigonométrie ===================== */
Object.assign(ANA_ERR,{
  'tri-hyp':{label:'Hypoténuse mal placée',tip:'Dans BC² = AB² + AC², le carré isolé est toujours celui de l’hypoténuse, le côté en face de l’angle droit (le plus long).'},
  'tri-racine':{label:'Racine carrée oubliée',tip:'Pythagore donne le carré de la longueur : termine par une racine carrée.'},
  'tri-thales':{label:'Rapports de Thalès mal écrits',tip:'Avec (MN) ∥ (BC), AM/AB = AN/AC = MN/BC : chaque rapport compare un côté du petit triangle AMN au côté correspondant du grand ABC.'},
  'tri-recip':{label:'Réciproque de Pythagore',tip:'Compare le carré du plus grand côté à la somme des carrés des deux autres : égalité exacte ⟺ triangle rectangle, et l’angle droit est en face du plus grand côté.'}});
const M1TRI_TRP=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[20,21,29],[9,40,41]];
/** Figure de Thalès : A en haut, M sur [AB], N sur [AC], (MN) ∥ (BC) ; L = étiquettes {AM, AB, AN, AC, MN, BC} */
const m1TriThFig=(k,L={},noms='AMNBC')=>{const A=[150,22],B=[30,200],C=[275,200],M=[A[0]+(B[0]-A[0])*k,A[1]+(B[1]-A[1])*k],N=[A[0]+(C[0]-A[0])*k,A[1]+(C[1]-A[1])*k];
  const[nA,nM,nN,nB,nC]=noms.split(''),P={[nA]:A,[nB]:B,[nC]:C,[nM]:M,[nN]:N},col=t=>t==='?'?'var(--t-c)':'var(--t-sq)';
  let s=`<polygon points="${[A,B,C].map(q=>q.join(',')).join(' ')}" fill="var(--soft)" stroke="var(--ink)" stroke-width="2"/><line x1="${M[0].toFixed(1)}" y1="${M[1].toFixed(1)}" x2="${N[0].toFixed(1)}" y2="${N[1].toFixed(1)}" stroke="var(--t-x)" stroke-width="2.6"/>`;
  [[A,nA,-5,-6],[B,nB,-14,14],[C,nC,6,14],[M,nM,-16,2],[N,nN,8,2]].forEach(([q,l,dx,dy])=>s+=`<text x="${(q[0]+dx).toFixed(1)}" y="${(q[1]+dy).toFixed(1)}" font-size="14" font-weight="700" fill="var(--ink)">${l}</text>`);
  const lab=(p,q,t,off)=>{const mx2=(p[0]+q[0])/2,my=(p[1]+q[1])/2;s+=`<text x="${(mx2+off[0]).toFixed(1)}" y="${(my+off[1]).toFixed(1)}" font-size="11" font-weight="700" text-anchor="middle" fill="${col(t)}">${t}</text>`};
  if(L.AM)lab(A,M,L.AM,[-30,0]);if(L.AB)lab(A,B,L.AB,[-48,26]);if(L.AN)lab(A,N,L.AN,[30,0]);if(L.AC)lab(A,C,L.AC,[52,26]);
  if(L.MN)lab(M,N,L.MN,[0,-6]);if(L.BC)lab(B,C,L.BC,[0,18]);
  return`<div class="qfig"><svg viewBox="0 0 300 225" role="img" aria-label="Triangle ${nA}${nB}${nC} et parallèle (${nM}${nN})">${s}</svg></div>`};
const m1TriN=v=>num(+v.toFixed(2));

/* 1. Pythagore : l'hypoténuse */
const gM1TriPyth=()=>{const[n0,n1,n2]=shuffle(pick(TG_TRI).slice()),a=R(2,12),b=R(2,12),c2=a*a+b*b,c=Math.sqrt(c2),ex=Number.isInteger(c);
  return nq({instr:`Calcule l’hypoténuse ${n0}${n2}${ex?'':' (valeur exacte ou arrondie au centième)'}.`,prompt:stx(`Le triangle ${n0}${n1}${n2} est rectangle en ${n1}.`)+FIG.triangle({noms:[n0,n1,n2],cotes:{[n0+n1]:`${a} cm`,[n1+n2]:`${b} cm`,[n2+n0]:'?'}}),
    labels:[`${n0}${n2} =`],t:[c],tol:ex?0:.005,
    explain:`${n0}${n2} est l’hypoténuse (en face de l’angle droit ${n1}). Pythagore : ${n0}${n2}² = ${n0}${n1}² + ${n1}${n2}² = ${a*a} + ${b*b} = ${c2}, donc ${n0}${n2} = √${c2}${ex?` = ${c}`:` ≈ ${dec(c,2)}`} cm.`,
    hint:'Le carré de l’hypoténuse est la somme des carrés des deux autres côtés.',diag:([v])=>near(v,c2,.01)?'tri-racine':near(v,a+b,.01)?'tri-racine':null})};

/* 2. Pythagore : un côté de l'angle droit */
const gM1TriPyth2=()=>{const[n0,n1,n2]=shuffle(pick(TG_TRI).slice()),[p,q,r]=pick(M1TRI_TRP),sw=Math.random()<.5,a=sw?p:q,b=sw?q:p,h=r,first=Math.random()<.5;
  const known=first?n1+n2:n0+n1,ask=first?n0+n1:n1+n2;
  return nq({instr:`Calcule la longueur ${ask}.`,prompt:stx(`Le triangle ${n0}${n1}${n2} est rectangle en ${n1}.`)+FIG.triangle({noms:[n0,n1,n2],cotes:{[known]:`${a} cm`,[n2+n0]:`${h} cm`,[ask]:'?'}}),
    labels:[`${ask} =`],t:[b],
    explain:`L’hypoténuse est ${n0}${n2} = ${h} cm. Pythagore : ${n0}${n2}² = ${known}² + ${ask}², donc ${ask}² = ${h}² − ${a}² = ${h*h} − ${a*a} = ${b*b}, et ${ask} = √${b*b} = ${b} cm.`,
    hint:'Isole le carré cherché : on soustrait, car l’hypoténuse est la plus longue.',diag:([v])=>near(v,Math.sqrt(h*h+a*a),.01)?'tri-hyp':near(v,b*b,.01)?'tri-racine':null})};

/* 3. Réciproque de Pythagore */
const gM1TriRecip=()=>{const[A,B,C]=shuffle(pick(TG_TRI).slice()),[p,q,r]=pick(M1TRI_TRP),k=pick([1,1,2]),rect=Math.random()<.6,R2=rect?r*k:r*k-1>q*k&&Math.random()<.5?r*k-1:r*k+1;
    return mcq('Ce triangle est-il rectangle ?',stx(`Dans le triangle ${A}${B}${C} : ${A}${B} = ${p*k} cm, ${B}${C} = ${q*k} cm, ${A}${C} = ${R2} cm.`),
    [{h:`Oui, rectangle en ${B}`,ok:rect,tag:'tri-recip'},{h:`Oui, rectangle en ${A}`,tag:'tri-recip'},{h:`Oui, rectangle en ${C}`,tag:'tri-recip'},{h:'Non, il n’est pas rectangle',ok:!rect,tag:'tri-recip'}],
    `Le plus grand côté est [${A}${C}]. On compare : ${A}${C}² = ${R2*R2} et ${A}${B}² + ${B}${C}² = ${p*p*k*k} + ${q*q*k*k} = ${(p*p+q*q)*k*k}. ${rect?`Égalité : d’après la réciproque de Pythagore, le triangle est rectangle en ${B}, le sommet opposé au plus grand côté.`:`Pas d’égalité : le triangle n’est pas rectangle (sinon Pythagore serait vérifié).`}`,
    'Compare le carré du plus grand côté avec la somme des carrés des deux autres.',true)};

/* 4. Trigonométrie : calculer une longueur (figure) */
const gM1TriLong=()=>{const[n0,n1,n2]=shuffle(pick(TG_TRI).slice()),al=R(15,75),g=R(3,15),r=al*Math.PI/180,H=tgHat(n0);
  const hyp=n0+n2,adj=n0+n1,opp=n1+n2,[G,U,v,how,wrong]=pick([
    [hyp,adj,g*Math.cos(r),`cos ${H} = ${adj} / ${hyp}, donc ${adj} = ${g} × cos ${al}°`,g/Math.cos(r)],
    [hyp,opp,g*Math.sin(r),`sin ${H} = ${opp} / ${hyp}, donc ${opp} = ${g} × sin ${al}°`,g/Math.sin(r)],
    [adj,opp,g*Math.tan(r),`tan ${H} = ${opp} / ${adj}, donc ${opp} = ${g} × tan ${al}°`,g/Math.tan(r)],
    [adj,hyp,g/Math.cos(r),`cos ${H} = ${adj} / ${hyp}, donc ${hyp} = ${g} ÷ cos ${al}°`,g*Math.cos(r)],
    [opp,hyp,g/Math.sin(r),`sin ${H} = ${opp} / ${hyp}, donc ${hyp} = ${g} ÷ sin ${al}°`,g*Math.sin(r)]]);
  const rad=(()=>{const R0=al;return U===adj&&G===hyp?g*Math.cos(R0):U===opp&&G===hyp?g*Math.sin(R0):U===opp?g*Math.tan(R0):U===hyp&&G===adj?g/Math.cos(R0):g/Math.sin(R0)})();
  return nq({instr:`Calcule ${U}.`,prompt:stx(`Le triangle ${n0}${n1}${n2} est rectangle en ${n1}, ${H} = ${al}° et ${G} = ${g} cm.`)+FIG.triangle({noms:[n0,n1,n2],cotes:{[G]:`${g} cm`,[U]:'?'},angle:n0,angleTxt:`${al}°`}),
    labels:[`${U} =`],t:[v],dp:2,explain:`${how} ≈ ${dec(v,2)} cm (calculatrice en degrés).`,hint:'Repère, par rapport à l’angle, le côté connu et le côté cherché, puis choisis entre CAH, SOH et TOA.',
    diag:([w])=>near(w,rad,.01)?'radian':near(w,wrong,.01)?'mult-div':null})};

/* 5. Trigonométrie : calculer un angle (figure) */
const gM1TriAngle=()=>{const[n0,n1,n2]=shuffle(pick(TG_TRI).slice()),f=pick(['cos','sin','tan']),hyp=n0+n2,adj=n0+n1,opp=n1+n2,H=tgHat(n0);
  const v=R(4,15),u=f==='tan'?R(2,15):R(2,v-1),[sn,sd]=f==='cos'?[adj,hyp]:f==='sin'?[opp,hyp]:[opp,adj],q=u/v,A=(f==='cos'?Math.acos(q):f==='sin'?Math.asin(q):Math.atan(q))*180/Math.PI;
  return nq({instr:`Calcule l’angle ${H} en degrés.`,prompt:stx(`Le triangle ${n0}${n1}${n2} est rectangle en ${n1}, ${sn} = ${u} cm et ${sd} = ${v} cm.`)+FIG.triangle({noms:[n0,n1,n2],cotes:{[sn]:`${u} cm`,[sd]:`${v} cm`},angle:n0,angleTxt:'?'}),
    labels:[`${H} =`],t:[A],dp:1,explain:`Par rapport à ${H}, [${sn}] est ${f==='cos'?'le côté adjacent':'le côté opposé'} et [${sd}] ${f==='tan'?'le côté adjacent':'l’hypoténuse'} : ${f} ${H} = ${u}/${v}, donc ${H} = ${f}⁻¹(${u}/${v}) ≈ ${dec(A,1)}°.`,
    hint:`Écris le rapport, puis utilise la touche ${f}⁻¹ de la calculatrice, en degrés.`,diag:([w])=>near(w,90-A,.06)?'complementaire':near(w,A*Math.PI/180,.06)?'radian':null})};

/* 6. Thalès : calculer une longueur (figure) */
const gM1TriThales=()=>{const[n,d]=pick([[1,2],[1,3],[2,3],[1,4],[3,4],[2,5],[3,5]]),k=n/d,m=R(1,4),AM=n*m,AB=d*m,BC=d*R(2,6),AC=d*R(2,6),typ=R(0,2);
  const MN=BC*k,AN=AC*k,F=x=>m1TriN(x);
  if(typ===0)return nq({instr:'Calcule MN (valeur exacte).',prompt:stx(`(MN) ∥ (BC), M ∈ [AB], N ∈ [AC]. AM = ${F(AM)} cm, AB = ${F(AB)} cm, BC = ${F(BC)} cm.`)+m1TriThFig(k,{AM:F(AM),AB:F(AB),BC:F(BC),MN:'?'}),
    labels:['MN ='],t:[MN],explain:`Thalès : AM/AB = MN/BC, donc MN = BC × AM/AB = ${F(BC)} × ${F(AM)}/${F(AB)} = ${F(MN)} cm.`,hint:'Le petit triangle AMN est une réduction de ABC : même rapport AM/AB pour tous les côtés.',
    diag:([v])=>near(v,BC*AB/AM,.01)||near(v,BC*AM/(AB-AM),.01)?'tri-thales':null});
  if(typ===1)return nq({instr:'Calcule AN (valeur exacte).',prompt:stx(`(MN) ∥ (BC), M ∈ [AB], N ∈ [AC]. AM = ${F(AM)} cm, AB = ${F(AB)} cm, AC = ${F(AC)} cm.`)+m1TriThFig(k,{AM:F(AM),AB:F(AB),AC:F(AC),AN:'?'}),
    labels:['AN ='],t:[AN],explain:`Thalès : AM/AB = AN/AC, donc AN = AC × AM/AB = ${F(AC)} × ${F(AM)}/${F(AB)} = ${F(AN)} cm.`,hint:'Écris AM/AB = AN/AC et fais un produit en croix.',
    diag:([v])=>near(v,AC*AB/AM,.01)?'tri-thales':null});
  return nq({instr:'Calcule AB (valeur exacte).',prompt:stx(`(MN) ∥ (BC), M ∈ [AB], N ∈ [AC]. AM = ${F(AM)} cm, MN = ${F(MN)} cm, BC = ${F(BC)} cm.`)+m1TriThFig(k,{AM:F(AM),MN:F(MN),BC:F(BC),AB:'?'}),
    labels:['AB ='],t:[AB],explain:`Thalès : AM/AB = MN/BC, donc AB = AM × BC/MN = ${F(AM)} × ${F(BC)}/${F(MN)} = ${F(AB)} cm.`,hint:'AB est au dénominateur : produit en croix.',
    diag:([v])=>near(v,AM*MN/BC,.01)?'tri-thales':null})};

/* 7. Thalès : placer le point N (pointQ) */
const gM1TriPlace=()=>{const[n,d]=pick([[1,2],[1,3],[2,3],[1,4],[3,4]]),k=n/d,bx=d*R(Math.ceil(3/d),Math.floor(8/d)),C=[d*R(0,Math.floor(8/d)),d*R(1,Math.floor(6/d))],B=[bx,0],Mx=k*bx,N=[k*C[0],k*C[1]];
  if(C[0]===B[0])return gM1TriPlace();
  const sl=C[1]/(C[0]-B[0]),fAC=C[0]===0?null:`${C[1]/C[0]}*x`;
  return pointQ({instr:'Place le point N sur [AC] pour que (MN) soit parallèle à (BC).',prompt:stx(`A(0 ; 0), B(${num(B[0])} ; 0), C(${num(C[0])} ; ${num(C[1])}) et M(${num(Mx)} ; 0) sur [AB], avec AM/AB = ${n}/${d}.`),
    nom:'N',x:[-1,9],y:[-1,7],snap:.5,tol:.24,cible:N,
    fond:{pts:[[0,0,'A'],[B[0],0,'B'],[C[0],C[1],'C'],[Mx,0,'M']],f:[...(fAC?[{f:fAC,c:0}]:[]),{f:`${sl}*(x-${B[0]})`,c:1,dash:true}]},
    explain:`D’après Thalès, (MN) ∥ (BC) équivaut à AN/AC = AM/AB = ${n}/${d}. N est donc aux ${n}/${d} de [AC] en partant de A : N(${n}/${d} × ${num(C[0])} ; ${n}/${d} × ${num(C[1])}) = (${num(N[0])} ; ${num(N[1])}).`,
    hint:`N doit couper [AC] dans le même rapport que M coupe [AB] : ${n}/${d}.`})};

/* 8. Raisonner : Pythagore (l'erreur se propage) */
const gM1TriRPyth=()=>{const[P,Q,Rr]=shuffle(pick(TG_TRI).slice()),[a0,b0,c0]=pick(M1TRI_TRP),S={[P+Rr]:a0,[Q+Rr]:b0,[P+Q]:c0},sides=[P+Q,P+Rr,Q+Rr],U=pick(sides);
  const known=sides.filter(s=>s!==U),cotes={};known.forEach(s=>cotes[s]=`${S[s]} cm`);cotes[U]='?';
  const fig=FIG.triangle({noms:[P,Rr,Q],cotes});
  return chain({instr:`Calcule ${U}, en construisant ton raisonnement.`,prompt:stx(`Le triangle ${P}${Q}${Rr} est rectangle en ${Rr} ; ${known.map(s=>`${s} = ${S[s]} cm`).join(', ')}.`)+fig,
    steps:[
      {q:'L’hypoténuse de ce triangle est…',o:sides.map(s=>({h:`[${s}]`,ok:s===P+Q,s,why:`L’hypoténuse est en face de l’angle droit ${tgHat(Rr)} : c’est [${P}${Q}].`,tag:'tri-hyp'}))},
      {q:'L’égalité de Pythagore s’écrit…',o:prev=>sides.map(X=>{const[Y,Z]=sides.filter(s=>s!==X);return{h:`${X}² = ${Y}² + ${Z}²`,ok:X===prev[0].s,X,why:'Le carré isolé doit être celui de l’hypoténuse.',tag:'tri-hyp'}})},
      {q:`On isole ${U} et on calcule…`,o:prev=>{const X=prev[1].X,[Y,Z]=sides.filter(s=>s!==X),L=[];let good,wr,sq;
        if(U===X){const v=S[Y]**2+S[Z]**2;good=`${U} = √(${S[Y]}² + ${S[Z]}²) = √${v}${Number.isInteger(Math.sqrt(v))?` = ${Math.sqrt(v)}`:` ≈ ${dec(Math.sqrt(v),2)}`} cm`;
          wr=`${U} = √(${S[Y]}² − ${S[Z]}²) ≈ ${dec(Math.sqrt(Math.abs(S[Y]**2-S[Z]**2)),2)} cm`;sq=`${U} = ${S[Y]}² + ${S[Z]}² = ${v} cm`}
        else{const o=U===Y?Z:Y,v=S[X]**2-S[o]**2;good=v>0?`${U} = √(${S[X]}² − ${S[o]}²) = √${v}${Number.isInteger(Math.sqrt(v))?` = ${Math.sqrt(v)}`:` ≈ ${dec(Math.sqrt(v),2)}`} cm`:`Impossible : ${S[X]}² − ${S[o]}² est négatif`;
          wr=`${U} = √(${S[X]}² + ${S[o]}²) ≈ ${dec(Math.sqrt(S[X]**2+S[o]**2),2)} cm`;sq=`${U} = ${S[X]}² − ${S[o]}² = ${v} cm`}
        return[{h:good,ok:true},{h:wr,why:'Pour isoler le carré d’un côté de l’angle droit, on soustrait ; pour l’hypoténuse, on additionne.',tag:'tri-hyp'},{h:sq,why:'On a obtenu le carré de la longueur : il manque la racine carrée.',tag:'tri-racine'}]}}],
    explain:`[${P}${Q}] est l’hypoténuse : ${P}${Q}² = ${P}${Rr}² + ${Q}${Rr}², soit ${c0}² = ${a0}² + ${b0}². ${U===P+Q?`${U} = √(${a0*a0} + ${b0*b0}) = ${c0} cm.`:`${U} = √(${c0*c0} − ${(U===P+Rr?b0:a0)**2}) = ${S[U]} cm.`}`})};

/* 9. Raisonner : Thalès (l'erreur se propage) */
const gM1TriRThales=()=>{const[n,d]=pick([[1,3],[2,3],[1,4],[3,4],[2,5],[3,5]]),m=R(1,3),AM=n*m,AB=d*m,MB=AB-AM,BC=d*R(2,5),MN=BC*n/d,F=m1TriN;
  return chain({instr:'Calcule MN, en construisant ton raisonnement.',prompt:stx(`M ∈ [AB], N ∈ [AC] et (MN) ∥ (BC). AM = ${AM} cm, MB = ${MB} cm, BC = ${BC} cm.`)+m1TriThFig(n/d,{AM:`${AM}`,BC:`${BC}`,MN:'?'}),
    steps:[
      {q:'Peut-on utiliser le théorème de Thalès ?',o:[{h:'Oui : M ∈ [AB], N ∈ [AC] et (MN) ∥ (BC)',ok:true},
        {h:'Oui, il suffit que M et N soient sur les côtés',why:'Sans le parallélisme, les rapports ne sont pas égaux : c’est l’hypothèse essentielle.',tag:'tri-thales'},
        {h:'Non, il faut un triangle rectangle',why:'Thalès ne demande aucun angle droit : c’est Pythagore qui en a besoin.',tag:'tri-thales'}]},
      {q:'D’abord, AB vaut…',o:[{h:`AB = AM + MB = ${AB} cm`,ok:true,ab:AB},{h:`AB = MB = ${MB} cm`,ab:MB,why:'AB est le côté entier, de A jusqu’à B : il contient AM et MB.',tag:'tri-thales'},{h:`AB = MB − AM = ${Math.abs(MB-AM)||MB+1} cm`,ab:Math.abs(MB-AM)||MB+1,why:'M est entre A et B : les longueurs s’ajoutent.',tag:'calc'}]},
      {q:'Les rapports égaux sont…',o:[{h:'AM/AB = AN/AC = MN/BC',ok:true,k:'ok'},{h:'AM/MB = AN/NC = MN/BC',k:'mb',why:'MN/BC compare le petit triangle AMN au grand ABC : il faut AM/AB, pas AM/MB.',tag:'tri-thales'},
        {h:'AB/AM = AN/AC = MN/BC',k:'inv',why:'Un rapport est renversé : on compare toujours petit triangle / grand triangle.',tag:'tri-thales'}]},
      {q:'Donc MN vaut…',o:prev=>{const ab=prev[1].ab,k=prev[2].k,v=k==='ok'?BC*AM/ab:k==='mb'?BC*AM/MB:BC*ab/AM;
        const opts=[{h:`MN = ${F(v)} cm`,ok:true},{h:`MN = ${F(BC*ab/AM)} cm`,why:'Le rapport a été inversé dans le produit en croix : MN = BC × AM/AB.',tag:'mult-div'},
          {h:`MN = ${F(BC-AM)} cm`,why:'Thalès conserve les rapports, pas les différences de longueurs.',tag:'tri-thales'},{h:`MN = ${F(BC*AM/MB)} cm`,why:'Il faut le rapport AM/AB, pas AM/MB.',tag:'tri-thales'}];
        return opts.filter((o,i)=>i===0||Math.abs(parseFloat(o.h.replace(/[^\d,−-]/g,'').replace(',','.'))-v)>1e-6)}}],
    explain:`Les hypothèses de Thalès sont réunies. AB = ${AM} + ${MB} = ${AB} cm, et AM/AB = MN/BC, donc MN = BC × AM/AB = ${BC} × ${AM}/${AB} = ${F(MN)} cm.`})};

ANA_UNITS.push({id:'m1-triangle',tr:'m1',name:'Géométrie du triangle',sub:'Pythagore, Thalès, trigonométrie',glyph:'△',tone:'sq',
  skills:[SKA('m1.tri.voc','Hypoténuse, opposé, adjacent',gTgVoc,1),SKA('m1.tri.pyth','Pythagore : l’hypoténuse',gM1TriPyth,1),SKA('m1.tri.pyth2','Pythagore : un autre côté',gM1TriPyth2,1),
    SKA('m1.tri.thales','Thalès : une longueur',gM1TriThales,2),SKA('m1.tri.place','Thalès : placer un point',gM1TriPlace,2),SKA('m1.tri.long','Trigonométrie : une longueur',gM1TriLong,2),
    SKA('m1.tri.angle','Trigonométrie : un angle',gM1TriAngle,2),SKA('m1.tri.recip','Rectangle ou pas ?',gM1TriRecip,2),SKA('m1.tri.r1','Raisonner : Pythagore',gM1TriRPyth,2),
    SKA('m1.tri.r2','Raisonner : Thalès',gM1TriRThales,2),SKA('m1.tri.r3','Raisonner : une longueur par trigonométrie',gTgR1,2),SKA('m1.tri.r4','Raisonner : deux triangles',gTgR3,3)]});
