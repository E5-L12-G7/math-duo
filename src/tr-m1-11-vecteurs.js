/* ===================== MVA911 · Vecteurs et produit scalaire ===================== */
Object.assign(ANA_ERR,{
  'vec-sens':{label:'Sens du vecteur inversé',tip:'Le vecteur AB va de A vers B : ses coordonnées sont (arrivée − départ), soit (x_B − x_A ; y_B − y_A).'},
  'vec-coord':{label:'Coordonnées échangées',tip:'La première coordonnée est le déplacement horizontal, la seconde le déplacement vertical.'},
  'vec-norme':{label:'Norme mal calculée',tip:'‖(x ; y)‖ = √(x² + y²) : c’est Pythagore, pas la somme des coordonnées.'},
  'vec-scal':{label:'Produit scalaire mal calculé',tip:'u · v = xx′ + yy′ : on multiplie les abscisses entre elles, les ordonnées entre elles, puis on additionne. Le résultat est un nombre.'}});
const M1VE_C=['var(--t-sq)','var(--t-c)','var(--t-x)'];
/** Figure : {x, y, pts:[[x,y,'A']], v:[[x,y,'u',ox,oy]], segs:[[x1,y1,x2,y2]], poly:[[x,y]…]} */
const m1VeFig=(o={})=>{const[x0,x1]=o.x||[-5,5],[y0,y1]=o.y||[-4,4],g=gp({W:280,H:Math.round(280*(y1-y0)/(x1-x0)),x0,x1,y0,y1});g.axes(1,1,o.et||2,o.et||2);
  if(o.poly)g.raw(`<polygon points="${o.poly.map(([x,y])=>`${g.X(x).toFixed(1)},${g.Y(y).toFixed(1)}`).join(' ')}" fill="var(--soft)" fill-opacity=".7" stroke="var(--ink)" stroke-width="1.6"/>`);
  (o.segs||[]).forEach(([a,b,c,d])=>g.seg(a,b,c,d,'var(--muted)',1.5,'5 3'));
  (o.v||[]).forEach(([x,y,l,ox=0,oy=0],i)=>{g.arrow(ox,oy,ox+x,oy+y,M1VE_C[i%3]);if(l)g.text(ox+x/2,oy+y/2,l,M1VE_C[i%3],'start',6,-6,13)});
  (o.pts||[]).forEach(([x,y,l])=>{g.dot(x,y,'var(--ink)',4);if(l)g.text(x,y,l,'var(--ink)','start',6,-6,13)});
  return`<div class="qfig">${g.done(o.titre||'Vecteurs')}</div>`};
const m1VePar=n=>n<0?`(${num(n)})`:num(n);
const m1VeP=(x,y)=>`(${num(x)} ; ${num(y)})`;
const m1VeSq=n=>{const r=Math.round(Math.sqrt(n));return r*r===n?num(r):`√${n}`};
const m1VeNz=(a,b)=>{let v;do v=R(a,b);while(!v);return v};

/* 1. Lire les coordonnées d'un vecteur */
const gM1VeLire=()=>{const x=m1VeNz(-4,4),y=m1VeNz(-3,3),ox=x>0?R(-4,4-x):R(-4-x,4),oy=y>0?R(-3,3-y):R(-3-y,3);
  return nq({instr:'Lis les coordonnées du vecteur u.',prompt:m1VeFig({v:[[x,y,'u',ox,oy]],pts:[[ox,oy,'']],et:1}),labels:['x =','y ='],t:[x,y],
    explain:`Du début à la pointe de la flèche, on se déplace de ${num(x)} horizontalement (${x>0?'vers la droite':'vers la gauche'}) et de ${num(y)} verticalement (${y>0?'vers le haut':'vers le bas'}) : u${m1VeP(x,y)}.`,
    hint:'Compte les carreaux de l’origine de la flèche jusqu’à sa pointe : d’abord horizontalement, puis verticalement.',
    diag:([a,b])=>near(a,y)&&near(b,x)?'vec-coord':near(a,-x)&&near(b,-y)?'vec-sens':null})};

/* 2. Coordonnées du vecteur AB */
const gM1VeAB=()=>{let A,B;do{A=[R(-4,4),R(-3,3)];B=[R(-4,4),R(-3,3)]}while(A[0]===B[0]||A[1]===B[1]);const x=B[0]-A[0],y=B[1]-A[1];
  return nq({instr:'Calcule les coordonnées du vecteur AB.',prompt:stx(`A${m1VeP(...A)} et B${m1VeP(...B)}.`)+m1VeFig({v:[[x,y,'',A[0],A[1]]],pts:[[A[0],A[1],'A'],[B[0],B[1],'B']]}),labels:['x =','y ='],t:[x,y],
    explain:`Arrivée moins départ : AB(${num(B[0])} − ${A[0]<0?`(${num(A[0])})`:num(A[0])} ; ${num(B[1])} − ${A[1]<0?`(${num(A[1])})`:num(A[1])}) = ${m1VeP(x,y)}.`,
    hint:'Coordonnées de B moins coordonnées de A.',diag:([a,b])=>near(a,-x)&&near(b,-y)?'vec-sens':null})};

/* 3. Norme d'un vecteur */
const gM1VeNorme=()=>{const x=m1VeNz(-4,4),y=m1VeNz(-3,3),n2=x*x+y*y,n=Math.sqrt(n2);
  return nq({instr:'Calcule la norme du vecteur u (valeur exacte).',prompt:mx(`u${m1VeP(x,y)}`)+m1VeFig({v:[[x,y,'u']],segs:[[0,0,x,0],[x,0,x,y]],et:1}),labels:['‖u‖ ='],t:[n],
    explain:`La flèche est l’hypoténuse d’un triangle rectangle de côtés ${Math.abs(x)} et ${Math.abs(y)} (en pointillés). Pythagore : ‖u‖ = √(${x<0?`(${num(x)})`:x}² + ${y<0?`(${num(y)})`:y}²) = √${n2}${Number.isInteger(n)?` = ${n}`:''}.`,
    hint:'‖(x ; y)‖ = √(x² + y²).',diag:([v])=>near(v,Math.abs(x)+Math.abs(y),1e-6)?'vec-norme':near(v,n2,1e-6)?'tri-racine':null})};

/* 4. Somme de deux vecteurs : placer l'extrémité (pointQ) */
const gM1VeSomme=()=>{let u,v,s;do{u=[m1VeNz(-3,3),R(-3,3)];v=[R(-3,3),m1VeNz(-3,3)];s=[u[0]+v[0],u[1]+v[1]]}while(Math.abs(s[0])>4||Math.abs(s[1])>3||(u[0]*v[1]-u[1]*v[0]===0));
  return pointQ({instr:'Place le point S tel que le vecteur OS soit égal à u + v.',prompt:stx(`u${m1VeP(...u)} et v${m1VeP(...v)} partent de l’origine O.`),nom:'S',x:[-5,5],y:[-4,4],snap:1,tol:.4,cible:s,
    fond:{v:[[u[0],u[1],'u'],[v[0],v[1],'v']]},
    explain:`On met les flèches bout à bout : depuis la pointe de u, on refait le déplacement v. Par le calcul, u + v = (${num(u[0])} + ${v[0]<0?`(${num(v[0])})`:num(v[0])} ; ${num(u[1])} + ${v[1]<0?`(${num(v[1])})`:num(v[1])}) = ${m1VeP(...s)} : c’est le quatrième sommet du parallélogramme construit sur u et v.`,
    hint:'Additionne les abscisses entre elles et les ordonnées entre elles, ou enchaîne les deux déplacements.'})};

/* 5. Parallélogramme : placer D (pointQ) */
const gM1VePara=()=>{let A,B,C,D;do{A=[R(-4,1),R(-3,1)];B=[A[0]+R(2,5),A[1]+R(-2,1)];C=[B[0]+R(-2,1),B[1]+R(2,4)];D=[A[0]+C[0]-B[0],A[1]+C[1]-B[1]]}
  while([B,C,D].some(([x,y])=>Math.abs(x)>4||Math.abs(y)>3)||(B[0]-A[0])*(C[1]-B[1])-(B[1]-A[1])*(C[0]-B[0])===0);
  return pointQ({instr:'Place le point D pour que ABCD soit un parallélogramme.',prompt:stx(`A${m1VeP(...A)}, B${m1VeP(...B)}, C${m1VeP(...C)}.`),nom:'D',x:[-5,5],y:[-4,4],snap:1,tol:.4,cible:D,
    fond:{pts:[[A[0],A[1],'A'],[B[0],B[1],'B'],[C[0],C[1],'C']]},
    explain:`ABCD est un parallélogramme quand AB = DC (vecteurs égaux), autrement dit quand le déplacement de B vers C est le même que celui de A vers D. BC = ${m1VeP(C[0]-B[0],C[1]-B[1])}, donc D = A + BC = ${m1VeP(...D)}.`,
    hint:'Le déplacement qui mène de A à D est le même que celui qui mène de B à C.'})};

/* 6. Signe du produit scalaire (figure) */
const gM1VeSigne=()=>{let u,v,d;do{u=[m1VeNz(-3,3),R(-3,3)];const t=R(0,2);v=t===0?(k=>[-k*u[1],k*u[0]])(pick([1,-1])):[m1VeNz(-3,3),R(-3,3)];d=u[0]*v[0]+u[1]*v[1]}
  while(u[0]*v[1]-u[1]*v[0]===0||Math.hypot(...v)>4.2);
  const th=Math.acos(d/(Math.hypot(...u)*Math.hypot(...v)))*180/Math.PI;
  return mcq('Quel est le signe du produit scalaire u · v ?',m1VeFig({v:[[u[0],u[1],'u'],[v[0],v[1],'v']],et:1}),
    [{h:'Positif',ok:d>0,tag:'vec-scal'},{h:'Négatif',ok:d<0,tag:'vec-scal'},{h:'Nul',ok:d===0,tag:'vec-scal'}],
    `L’angle entre u et v mesure environ ${dec(th,0)}° : ${d===0?'c’est un angle droit, le produit scalaire est nul':d>0?'angle aigu, le produit scalaire est positif':'angle obtus, le produit scalaire est négatif'}. Par le calcul : u${m1VeP(...u)}, v${m1VeP(...v)}, u · v = ${num(u[0]*v[0])} + ${m1VePar(u[1]*v[1])} = ${num(d)}.`,
    'Les flèches forment-elles un angle aigu, droit ou obtus ?',true)};

/* 7. Produit scalaire en coordonnées */
const gM1VeScal=()=>{const u=[m1VeNz(-5,5),m1VeNz(-5,5)],v=[m1VeNz(-5,5),m1VeNz(-5,5)],d=u[0]*v[0]+u[1]*v[1];
  return nq({instr:'Calcule le produit scalaire u · v.',prompt:mx(`u${m1VeP(...u)}  et  v${m1VeP(...v)}`)+(Math.max(...u.map(Math.abs),...v.map(Math.abs))<=4&&Math.abs(u[1])<=3.5&&Math.abs(v[1])<=3.5?m1VeFig({v:[[u[0],u[1],'u'],[v[0],v[1],'v']]}):''),labels:['u · v ='],t:[d],
    explain:`u · v = xx′ + yy′ = ${num(u[0])} × ${v[0]<0?`(${num(v[0])})`:num(v[0])} + ${m1VePar(u[1])} × ${v[1]<0?`(${num(v[1])})`:num(v[1])} = ${num(u[0]*v[0])} + ${m1VePar(u[1]*v[1])} = ${num(d)}.`,
    hint:'Abscisse × abscisse, plus ordonnée × ordonnée.',diag:([w])=>near(w,u[0]*v[1]+u[1]*v[0])||near(w,u[0]*v[0]-u[1]*v[1])?'vec-scal':null})};

/* 8. Orthogonalité : trouver m */
const gM1VeOrtho=()=>{let a,c,d;do{a=m1VeNz(-4,4);c=m1VeNz(-4,4);d=pick([1,-1,2,-2,3,-3])}while((a*c)%d!==0);const m=-a*c/d;
  return nq({instr:'Trouve m pour que les vecteurs u et v soient orthogonaux.',prompt:mx(`u(${num(a)} ; m)  et  v${m1VeP(c,d)}`),labels:['m ='],t:[m],
    explain:`u et v sont orthogonaux ⟺ u · v = 0. Or u · v = ${num(a)} × ${c<0?`(${num(c)})`:num(c)} + m × ${d<0?`(${num(d)})`:num(d)} = ${num(a*c)} ${d<0?MINUS:'+'} ${Math.abs(d)===1?'':Math.abs(d)}m. Il est nul pour m = ${num(m)}.`,
    hint:'Écris u · v = xx′ + yy′ en fonction de m, puis résous u · v = 0.',diag:([w])=>near(w,-m)?'signe':near(w,a*c/1)||near(w,d/(a*c))?'vec-scal':null})};

/* 9. Colinéarité : trouver m */
const gM1VeCol=()=>{let a,b,c;do{a=m1VeNz(-4,4);b=m1VeNz(-4,4);c=m1VeNz(-6,6)}while((b*c)%a!==0||c===a);const m=b*c/a;
  return nq({instr:'Trouve m pour que les vecteurs u et v soient colinéaires.',prompt:mx(`u${m1VeP(a,b)}  et  v(${num(c)} ; m)`),labels:['m ='],t:[m],
    explain:`u et v sont colinéaires ⟺ xy′ − x′y = 0, soit ${num(a)} × m − ${c<0?`(${num(c)})`:num(c)} × ${b<0?`(${num(b)})`:num(b)} = 0, donc m = ${num(b*c)}/${num(a)} = ${num(m)}. Vérification : v = ${num(+(c/a).toFixed(3))} × u.`,
    hint:'Deux vecteurs sont colinéaires quand l’un est un multiple de l’autre : xy′ − x′y = 0.',diag:([w])=>near(w,-a*c/b)?'vec-scal':null})};

/* 10. Angle entre deux vecteurs */
const gM1VeAngle=()=>{let u,v,d;do{u=[R(-4,4),R(-4,4)];v=[R(-4,4),R(-4,4)];d=u[0]*v[0]+u[1]*v[1]}while(!(u[0]||u[1])||!(v[0]||v[1])||u[0]*v[1]-u[1]*v[0]===0||d===0);
  const nu=Math.hypot(...u),nv=Math.hypot(...v),c=d/(nu*nv),th=Math.acos(c)*180/Math.PI;
  return nq({instr:'Calcule l’angle θ entre u et v, en degrés.',prompt:mx(`u${m1VeP(...u)}  et  v${m1VeP(...v)}`)+m1VeFig({v:[[u[0],u[1],'u'],[v[0],v[1],'v']],y:[-4.5,4.5]}),labels:['θ ='],t:[th],dp:1,
    explain:`u · v = ${num(d)}, ‖u‖ = ${m1VeSq(u[0]**2+u[1]**2)} et ‖v‖ = ${m1VeSq(v[0]**2+v[1]**2)}. cos θ = u · v / (‖u‖ × ‖v‖) ≈ ${dec(c,4)}, donc θ = cos⁻¹(${dec(c,4)}) ≈ ${dec(th,1)}°.`,
    hint:'cos θ = u · v / (‖u‖ × ‖v‖), puis la touche cos⁻¹ en mode degrés.',diag:([w])=>near(w,Math.acos(c),.06)?'radian':near(w,180-th,.06)?'signe':null})};

/* 11. Raisonner : l'angle entre deux vecteurs (l'erreur se propage) */
const gM1VeR1=()=>{let u,v,d;do{u=[m1VeNz(-5,5),m1VeNz(-5,5)];v=[m1VeNz(-5,5),m1VeNz(-5,5)];d=u[0]*v[0]+u[1]*v[1]}while(!d||u[0]*v[1]-u[1]*v[0]===0||u[0]*v[1]+u[1]*v[0]===d||u[0]*v[0]-u[1]*v[1]===d);
  const n2u=u[0]**2+u[1]**2,n2v=v[0]**2+v[1]**2;
  return chain({instr:'Calcule l’angle entre u et v, en construisant ton raisonnement.',prompt:mx(`u${m1VeP(...u)}  et  v${m1VeP(...v)}`),
    steps:[
      {q:'Le produit scalaire u · v vaut…',o:[{h:`${num(u[0])} × ${m1VePar(v[0])} + ${m1VePar(u[1])} × ${m1VePar(v[1])} = ${num(d)}`,ok:true,d},
        {h:`${num(u[0])} × ${m1VePar(v[1])} + ${m1VePar(u[1])} × ${m1VePar(v[0])} = ${num(u[0]*v[1]+u[1]*v[0])}`,d:u[0]*v[1]+u[1]*v[0],why:'On multiplie abscisse par abscisse et ordonnée par ordonnée, pas en croix.',tag:'vec-scal'},
        {h:`${num(u[0])} × ${m1VePar(v[0])} − ${m1VePar(u[1])} × ${m1VePar(v[1])} = ${num(u[0]*v[0]-u[1]*v[1])}`,d:u[0]*v[0]-u[1]*v[1],why:'Les deux produits s’additionnent : u · v = xx′ + yy′.',tag:'vec-scal'}]},
      {q:'Les normes valent…',o:[{h:`‖u‖ = ${m1VeSq(n2u)} et ‖v‖ = ${m1VeSq(n2v)}`,ok:true,nu:Math.sqrt(n2u),nv:Math.sqrt(n2v)},
        {h:`‖u‖ = ${Math.abs(u[0])+Math.abs(u[1])} et ‖v‖ = ${Math.abs(v[0])+Math.abs(v[1])}`,nu:Math.abs(u[0])+Math.abs(u[1]),nv:Math.abs(v[0])+Math.abs(v[1]),why:'La norme vient de Pythagore : √(x² + y²), pas la somme des coordonnées.',tag:'vec-norme'},
        {h:`‖u‖ = ${n2u} et ‖v‖ = ${n2v}`,nu:n2u,nv:n2v,why:'Il manque la racine carrée : x² + y² est le carré de la norme.',tag:'tri-racine'}]},
      {q:'Donc cos θ vaut…',o:prev=>{const D=prev[0].d,a=prev[1].nu,b=prev[1].nv,c=D/(a*b);
        return[{h:`${num(D)} / (${dec(a,3)} × ${dec(b,3)}) ≈ ${dec(c,4)}`,ok:true,c},{h:`(${dec(a,3)} × ${dec(b,3)}) / ${num(D)} ≈ ${dec(a*b/D,4)}`,c:a*b/D,why:'Le produit scalaire est au numérateur : cos θ = u · v / (‖u‖ ‖v‖).',tag:'mult-div'},
          {h:`${num(D)} / (${dec(a,3)} + ${dec(b,3)}) ≈ ${dec(D/(a+b),4)}`,c:D/(a+b),why:'On divise par le produit des normes, pas par leur somme.',tag:'vec-scal'}]}},
      {q:'Et θ, en degrés, vaut environ…',o:prev=>{const c=prev[2].c;
        if(Math.abs(c)>1)return[{h:'Aucun angle : un cosinus est entre −1 et 1, il y a une erreur plus haut',ok:true},{h:'θ ≈ 0°',why:`Un cosinus égal à ${dec(c,3)} est impossible : il faut revoir le calcul.`},{h:'θ ≈ 90°',why:`Un cosinus égal à ${dec(c,3)} est impossible : il faut revoir le calcul.`}];
        const t=Math.acos(c)*180/Math.PI;return[{h:`θ ≈ ${dec(t,1)}°`,ok:true},{h:`θ ≈ ${dec(Math.acos(c),2)}°`,why:'Ce nombre est la mesure en radians : la calculatrice doit être en mode degrés.',tag:'radian'},
          {h:`θ ≈ ${dec(180-t,1)}°`,why:`Le signe de cos θ décide : ${c>0?'positif, donc angle aigu':'négatif, donc angle obtus'}.`,tag:'signe'}]}}],
    explain:`u · v = ${num(d)}, ‖u‖ = ${m1VeSq(n2u)}, ‖v‖ = ${m1VeSq(n2v)}. cos θ = ${num(d)} / (${m1VeSq(n2u)} × ${m1VeSq(n2v)}) ≈ ${dec(d/Math.sqrt(n2u*n2v),4)}, donc θ ≈ ${dec(Math.acos(d/Math.sqrt(n2u*n2v))*180/Math.PI,1)}°.`})};

/* 12. Raisonner : le triangle est-il rectangle en A ? (l'erreur se propage) */
const gM1VeR2=()=>{let A,B,C,p,q;do{A=[R(-3,1),R(-2,1)];p=m1VeNz(-3,3);q=m1VeNz(-3,3);const right=Math.random()<.65,k=pick([1,-1]);B=[A[0]+p,A[1]+q];
    const w=right?[-k*q,k*p]:[-k*q+pick([1,-1]),k*p];C=[A[0]+w[0],A[1]+w[1]]}while([B,C].some(([x,y])=>Math.abs(x)>4||Math.abs(y)>3));
  const V=(P,Q)=>[Q[0]-P[0],Q[1]-P[1]],pts={A,B,C},dot=(a,b)=>a[0]*b[0]+a[1]*b[1],AB=V(A,B),AC=V(A,C),d0=dot(AB,AC);
  const pair={A:['A','B','C'],B:['B','A','C'],C:['C','A','B']};
  return chain({instr:'Le triangle ABC est-il rectangle en A ? Construis ton raisonnement.',prompt:stx(`A${m1VeP(...A)}, B${m1VeP(...B)}, C${m1VeP(...C)}.`)+m1VeFig({poly:[A,B,C],pts:[[A[0],A[1],'A'],[B[0],B[1],'B'],[C[0],C[1],'C']],et:1}),
    steps:[
      {q:'Pour tester l’angle en A, on calcule le produit scalaire de…',o:['A','B','C'].map(S=>{const[s,a,b]=pair[S];return{h:`${s}${a} et ${s}${b}`,ok:S==='A',S,why:`Les deux vecteurs doivent partir du sommet A : ${s}${a} et ${s}${b} testent l’angle en ${s}.`,tag:'raisonnement'}})},
      {q:'Leurs coordonnées sont…',o:prev=>{const[s,a,b]=pair[prev[0].S],U=V(pts[s],pts[a]),W=V(pts[s],pts[b]);
        return[{h:`${s}${a}${m1VeP(...U)} et ${s}${b}${m1VeP(...W)}`,ok:true,U,W},
          {h:`${s}${a}${m1VeP(-U[0],-U[1])} et ${s}${b}${m1VeP(-W[0],-W[1])}`,U:[-U[0],-U[1]],W:[-W[0],-W[1]],ok:false,why:'Arrivée moins départ : les signes sont inversés.',tag:'vec-sens'},
          {h:`${s}${a}${m1VeP(pts[a][0]+pts[s][0],pts[a][1]+pts[s][1])} et ${s}${b}${m1VeP(pts[b][0]+pts[s][0],pts[b][1]+pts[s][1])}`,U:[pts[a][0]+pts[s][0],pts[a][1]+pts[s][1]],W:[pts[b][0]+pts[s][0],pts[b][1]+pts[s][1]],why:'On soustrait les coordonnées du point de départ, on ne les ajoute pas.',tag:'vec-sens'}]}},
      {q:'Le produit scalaire vaut…',o:prev=>{const{U,W}=prev[1];return[{h:`${num(U[0])} × ${m1VePar(W[0])} + ${m1VePar(U[1])} × ${m1VePar(W[1])} = ${num(dot(U,W))}`,ok:true,d:dot(U,W)},
        {h:`${num(U[0])} × ${m1VePar(W[0])} − ${m1VePar(U[1])} × ${m1VePar(W[1])} = ${num(U[0]*W[0]-U[1]*W[1])}`,d:U[0]*W[0]-U[1]*W[1],why:'u · v = xx′ + yy′ : les deux produits s’additionnent.',tag:'vec-scal'},
        {h:`(${num(U[0]*W[0])} ; ${num(U[1]*W[1])})`,d:null,why:'Le produit scalaire est un nombre, pas un vecteur : on additionne les deux produits.',tag:'vec-scal'}]}},
      {q:'Conclusion :',o:prev=>{const S=prev[0].S,d=prev[2].d,zero=d===null?d0===0:d===0;
        return[{h:`Produit nul : le triangle est rectangle en ${S}`,ok:zero,why:d===0||d===null&&d0===0?'':'Le produit scalaire n’est pas nul : les vecteurs ne sont pas orthogonaux.',tag:'raisonnement'},
          {h:`Produit non nul : pas d’angle droit en ${S}`,ok:!zero,why:'Un produit scalaire nul signifie que les vecteurs sont orthogonaux : l’angle est droit.',tag:'raisonnement'},
          {h:`On ne peut pas conclure sans les longueurs`,why:'Le produit scalaire suffit : nul ⟺ orthogonaux. Pas besoin de Pythagore.',tag:'raisonnement'}]}}],
    explain:`AB${m1VeP(...AB)} et AC${m1VeP(...AC)}, donc AB · AC = ${num(AB[0]*AC[0])} + ${m1VePar(AB[1]*AC[1])} = ${num(d0)}. ${d0===0?'Le produit scalaire est nul : AB et AC sont orthogonaux, le triangle est rectangle en A.':'Le produit scalaire n’est pas nul : l’angle en A n’est pas droit.'}`})};

ANA_UNITS.push({id:'m1-vecteurs',tr:'m1',name:'Vecteurs',sub:'Coordonnées, norme, somme, produit scalaire',glyph:'→',tone:'x',
  skills:[SKA('m1.ve.lire','Lire les coordonnées d’un vecteur',gM1VeLire,1),SKA('m1.ve.ab','Coordonnées du vecteur AB',gM1VeAB,1),SKA('m1.ve.norme','Norme d’un vecteur',gM1VeNorme,1),
    SKA('m1.ve.somme','Construire u + v',gM1VeSomme,1),SKA('m1.ve.signe','Signe du produit scalaire',gM1VeSigne,1),SKA('m1.ve.para','Construire un parallélogramme',gM1VePara,2),
    SKA('m1.ve.scal','Calculer un produit scalaire',gM1VeScal,2),SKA('m1.ve.ortho','Vecteurs orthogonaux',gM1VeOrtho,2),SKA('m1.ve.col','Vecteurs colinéaires',gM1VeCol,2),
    SKA('m1.ve.angle','Angle entre deux vecteurs',gM1VeAngle,3),SKA('m1.ve.r1','Raisonner : un angle',gM1VeR1,3),SKA('m1.ve.r2','Raisonner : un angle droit ?',gM1VeR2,3)]});
