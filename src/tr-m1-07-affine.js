/* ===================== MVA911 · Fonctions affines et équations de droites ===================== */
Object.assign(ANA_ERR,{
  'm1af-ordre':{label:'Ordre des points',tip:'Même ordre en haut et en bas : a = (y_B − y_A) ÷ (x_B − x_A).'},
  'm1af-xy':{label:'Δx et Δy inversés',tip:'La pente est Δy ÷ Δx : ce que l’on monte, divisé par ce que l’on avance.'},
  'm1af-b':{label:'Ordonnée à l’origine',tip:'De y_A = a × x_A + b, on tire b = y_A − a × x_A (on retranche).'},
  'm1af-perp':{label:'Pente perpendiculaire',tip:'Deux droites perpendiculaires ont des pentes de produit −1 : la pente de l’une est l’inverse opposé de l’autre (2 et −1/2).'}});
const m1AfP=v=>v<0?`(${num(v)})`:num(v);
/** Droite y = (n/d)x + bn/bd écrite avec des fractions exactes */
const m1AfLF=(n,d,bn,bd)=>{const A=new Fr(n,d),B=new Fr(bn,bd);let s='';
  if(A.n){const ab=Math.abs(A.n);s=(A.n<0?MINUS:'')+(A.d===1?(ab===1?'':num(ab)):fr(ab,A.d))+'x'}
  if(B.n||!A.n)s+=s?` ${B.n<0?MINUS:'+'} ${B.d===1?num(Math.abs(B.n)):fr(Math.abs(B.n),B.d)}`:m1EqQ(B.n,B.d);return'y = '+s};
const m1AfF=(a,b)=>`${a}*x${b<0?'-':'+'}${Math.abs(b)}`;
const M1AF_SL=[2,-2,.5,-.5,1,-1,4,-4,.25,-.25];
/* 1. Calculer une image */
const gM1AfImage=()=>{let a,b,k,v;do{a=nz(-3,3);b=R(-4,4);k=nz(-4,4);v=a*k+b}while(Math.abs(v)>7);
  return nq({instr:`Calcule f(${num(k)}).`,prompt:mx(`f(x) = ${m1EqT(a,b)}`)+FIG.plot({x:[-5,5],y:[-8,8],f:[m1AfF(a,b)],segs:[[k,-8,k,8]],pas:1,pasy:2}),labels:[`f(${num(k)}) =`],t:[v],
    explain:`On remplace x par ${num(k)} : f(${num(k)}) = ${num(a)} × ${m1AfP(k)}${b?` ${b<0?MINUS:'+'} ${num(Math.abs(b))}`:''} = ${num(v)}. Sur le graphique, la droite croise le trait pointillé x = ${num(k)} à la hauteur ${num(v)}.`,
    hint:'Remplace x par la valeur, entre parenthèses si elle est négative. Le graphique permet de contrôler.',diag:([w])=>k<0&&near(w,-a*k+b)?'signe':null})};
/* 2. Lire a et b sur un graphique */
const gM1AfLire=()=>{const a=pick([-3,-2,-1,-.5,.5,1,2,3]),b=R(-3,3);
  return nq({instr:'Lis sur le graphique la pente a et l’ordonnée à l’origine b de la droite y = ax + b.',prompt:FIG.plot({x:[-5,5],y:[-6,6],f:[m1AfF(a,b)],pts:[[0,b,'']],pas:1}),labels:['a =','b ='],t:[a,b],
    explain:`La droite coupe l’axe vertical en ${num(b)} : b = ${num(b)}. Quand on avance de ${Math.abs(a)<1?2:1}, elle ${a>0?'monte':'descend'} de ${num(Math.abs(a)*(Math.abs(a)<1?2:1))} : a = ${num(a)}.`,
    hint:'b : là où la droite coupe l’axe vertical. a : de combien elle monte (ou descend) quand on avance de 1 vers la droite.',diag:([u,w])=>near(u,1/a)?'m1af-xy':near(u,-a)?'signe':null})};
/* 3. Placer un point d'une droite */
const gM1AfPoint=()=>{let a,b,k,v;do{a=nz(-3,3);b=R(-4,4);k=R(-4,4);v=a*k+b}while(Math.abs(v)>5||k===0);
  return pointQ({instr:`Place le point M de la droite d’abscisse ${num(k)}.`,prompt:mx(`y = ${m1EqT(a,b)}`),nom:'M',x:[-5,5],y:[-6,6],snap:1,tol:.4,cible:[k,v],fond:{pas:1},
    explain:`y = ${num(a)} × ${m1AfP(k)}${b?` ${b<0?MINUS:'+'} ${num(Math.abs(b))}`:''} = ${num(v)} : M(${num(k)} ; ${num(v)}).`,hint:'Calcule y en remplaçant x, puis place le point (x ; y) : d’abord vers la droite ou la gauche, ensuite vers le haut ou le bas.',
    diag:pt=>Math.abs(pt[0]-v)<.1&&Math.abs(pt[1]-k)<.1?'m1af-xy':null})};
/* 4. Pente à partir de deux points */
const gM1AfPente=()=>{let xA,yA,xB,yB;do{xA=R(-4,3);xB=R(-4,4);yA=R(-4,4);yB=R(-4,4)}while(xA===xB||yA===yB||Math.abs(xB-xA)===Math.abs(yB-yA));
  const dx=xB-xA,dy=yB-yA;
  return nq({instr:'Calcule le coefficient directeur (la pente) de la droite (AB). Une valeur exacte est attendue.',prompt:stx(`A(${num(xA)} ; ${num(yA)}) et B(${num(xB)} ; ${num(yB)})`)+FIG.plot({x:[-5,5],y:[-5,5],pts:[[xA,yA,'A'],[xB,yB,'B']],segs:[[xA,yA,xB,yA],[xB,yA,xB,yB]],pas:1}),labels:['a ='],t:[dy/dx],
    explain:`a = (y<sub>B</sub> − y<sub>A</sub>) ÷ (x<sub>B</sub> − x<sub>A</sub>) = (${num(yB)} − ${m1AfP(yA)}) ÷ (${num(xB)} − ${m1AfP(xA)}) = ${num(dy)} ÷ ${m1AfP(dx)} = ${m1EqQ(dy,dx)}. Sur la figure : Δx = ${num(dx)}, Δy = ${num(dy)}.`,
    hint:'Δy ÷ Δx, en gardant le même ordre (B moins A) en haut et en bas.',diag:([v])=>near(v,-dy/dx,1e-6)?'m1af-ordre':near(v,dx/dy,1e-6)?'m1af-xy':null})};
/* 5. Équation de la droite passant par deux points */
const gM1AfEq2=()=>{const a=nz(-3,3),b=R(-3,3);let xA,xB;do{xA=R(-3,3);xB=R(-3,3)}while(xA===xB||Math.abs(a*xA+b)>5||Math.abs(a*xB+b)>5);const yA=a*xA+b,yB=a*xB+b;
  return exprQ('Donne l’équation réduite de la droite (AB).',stx(`A(${num(xA)} ; ${num(yA)}) et B(${num(xB)} ; ${num(yB)})`)+FIG.plot({x:[-5,5],y:[-6,6],pts:[[xA,yA,'A'],[xB,yB,'B']],pas:1}),'y =',poly([a,b]),
    `a = (${num(yB)} − ${m1AfP(yA)}) ÷ (${num(xB)} − ${m1AfP(xA)}) = ${num(yB-yA)} ÷ ${m1AfP(xB-xA)} = ${num(a)}. Puis b = y<sub>A</sub> − a × x<sub>A</sub> = ${num(yA)} − ${m1AfP(a)} × ${m1AfP(xA)} = ${num(b)}. Donc ${mx('y = '+m1EqT(a,b))}. Contrôle avec B : ${num(a)} × ${m1AfP(xB)} ${b<0?MINUS:'+'} ${num(Math.abs(b))} = ${num(yB)}.`,
    'Calcule d’abord la pente a, puis b = y_A − a × x_A.',false,([u])=>eqv(u,poly([a,yA+a*xA]))?'m1af-b':eqv(u,poly([-a,yA+a*xA]))?'m1af-ordre':null)};
/* 6. Racine : où la droite coupe l'axe des abscisses */
const gM1AfZero=()=>{const r=R(-8,8)/2,a=Number.isInteger(r)?nz(-3,3):pick([2,-2,4]),b=-a*r;if(b===0)return gM1AfZero();
  return pointQ({instr:'Calcule puis place le point où la droite coupe l’axe des abscisses.',prompt:mx(`y = ${m1EqT(a,b)}`),nom:'Z',x:[-5,5],y:[-4,4],snap:.5,tol:.2,cible:[r,0],fond:{pas:1},
    explain:`Sur l’axe des abscisses, y = 0 : ${mx(`${m1EqT(a,b)} = 0`)}, donc ${mx(`x = ${num(-b)} ÷ ${m1AfP(a)} = ${num(r)}`)}. Le point est Z(${num(r)} ; 0).`,
    hint:'Un point de l’axe des abscisses a pour ordonnée 0 : résous ax + b = 0.',diag:pt=>Math.abs(pt[0])<.1&&Math.abs(pt[1]-b)<.1?'m1af-xy':Math.abs(pt[0]+r)<.1&&Math.abs(pt[1])<.1?'signe':null})};
/* 7. Position relative de deux droites */
const gM1AfPos=()=>{const t=R(0,3),a=pick(M1AF_SL),b=R(-3,3);let a2,b2;
  if(t===0){a2=a;do b2=R(-3,3);while(b2===b)}else if(t===1){a2=-1/a;b2=R(-3,3)}else if(t===2){do a2=pick([-3,-2,-1,1,2,3,.5,-.5]);while(a2===a||Math.abs(a*a2+1)<1e-9);b2=R(-3,3)}else{a2=a;b2=b}
  const L=['Parallèles et distinctes','Perpendiculaires','Sécantes, mais pas perpendiculaires','Confondues'];
  return mcq('Quelle est la position de ces deux droites ?',mx(`d : y = ${m1EqT(a,b)}    d′ : y = ${m1EqT(a2,b2)}`)+FIG.plot({x:[-5,5],y:[-5,5],f:[m1AfF(a,b),{f:m1AfF(a2,b2),c:1,dash:t===3}],pas:1}),
    L.map((h,i)=>({h,ok:i===t,tag:i===1||t===1?'m1af-perp':null})),
    t===0?`Même pente ${num(a)} et ordonnées à l’origine différentes : parallèles et distinctes.`:t===3?`Même pente et même ordonnée à l’origine : c’est la même droite.`
      :`Pentes différentes : les droites se coupent. Produit des pentes : ${num(a)} × ${m1AfP(a2)} = ${num(a*a2)}${t===1?' = −1 : elles sont perpendiculaires.':', différent de −1 : pas perpendiculaires.'}`,
    'Compare les pentes. Si elles diffèrent, calcule leur produit : −1 signifie perpendiculaires.',true)};
/* 8. Équation de la perpendiculaire passant par un point */
const gM1AfPerp=()=>{const a=pick([2,-2,.5,-.5,1,-1,4,-4]),c=R(-3,3),ap=-1/a,xA=pick([-4,-2,0,2,4]),yA=R(-3,3),bp=yA-ap*xA;
  return exprQ('Donne l’équation réduite de la perpendiculaire à d passant par A.',mx(`d : y = ${m1EqT(a,c)}`)+stx(` et A(${num(xA)} ; ${num(yA)})`)+FIG.plot({x:[-5,5],y:[-5,5],f:[m1AfF(a,c)],pts:[[xA,yA,'A']],pas:1}),'y =',`(${ap})*x+(${bp})`,
    `La pente a′ vérifie ${num(a)} × a′ = −1, donc a′ = ${num(ap)}. La droite passe par A : y = ${num(ap)}(x ${xA<0?'+':MINUS} ${num(Math.abs(xA))}) ${yA<0?MINUS:'+'} ${num(Math.abs(yA))}, soit ${mx('y = '+m1EqT(ap,bp))}.`,
    'Pente de la perpendiculaire : −1 ÷ a. Puis b = y_A − a′ × x_A.',false,([u])=>eqv(u,`(${-a})*x+(${yA+a*xA})`)||eqv(u,`(${1/a})*x+(${yA-xA/a})`)?'m1af-perp':null)};
/* 9. Placer le point d'intersection de deux droites */
const gM1AfInter=()=>{const x0=R(-3,3),y0=R(-3,3);let a1,a2;do{a1=pick([-2,-1,-.5,.5,1,2,3,-3]);a2=pick([-2,-1,-.5,.5,1,2,3,-3])}while(a1===a2);const b1=y0-a1*x0,b2=y0-a2*x0;
  return pointQ({instr:'Calcule les coordonnées du point d’intersection I des deux droites, puis place-le.',prompt:mx(`d : y = ${m1EqT(a1,b1)}    d′ : y = ${m1EqT(a2,b2)}`),nom:'I',x:[-5,5],y:[-5,5],snap:.5,tol:.2,cible:[x0,y0],fond:{f:[m1AfF(a1,b1),{f:m1AfF(a2,b2),c:1}],pas:1},
    explain:`On égale les y : ${mx(`${m1EqT(a1,b1)} = ${m1EqT(a2,b2)}`)}, donc ${mx(`${m1EqT(a1-a2,0)} = ${num(b2-b1)}`)} et x = ${num(x0)}. Puis y = ${num(a1)} × ${m1AfP(x0)}${b1?` ${b1<0?MINUS:'+'} ${num(Math.abs(b1))}`:''} = ${num(y0)} : I(${num(x0)} ; ${num(y0)}).`,
    hint:'Au point commun, les deux y sont égaux : résous l’équation, puis calcule y. Le dessin te permet de contrôler.',diag:pt=>Math.abs(pt[0]-y0)<.1&&Math.abs(pt[1]-x0)<.1?'m1af-xy':null})};
/* 10. Signe d'une fonction affine */
const gM1AfSigne=()=>{const r=R(-3,3),a=nz(-3,3),b=-a*r,rel=pick(['>','<','≥','≤']),pos=rel==='>'||rel==='≥',strict=rel==='>'||rel==='<',right=(a>0)===pos;
  const S=right?(strict?`]${num(r)} ; +∞[`:`[${num(r)} ; +∞[`):(strict?`]−∞ ; ${num(r)}[`:`]−∞ ; ${num(r)}]`);
  const all=[`]${num(r)} ; +∞[`,`[${num(r)} ; +∞[`,`]−∞ ; ${num(r)}[`,`]−∞ ; ${num(r)}]`];
  return mcq(`Pour quelles valeurs de x a-t-on f(x) ${m1EqRel(rel)} 0 ?`,mx(`f(x) = ${m1EqT(a,b)}`)+FIG.plot({x:[-5,5],y:[-6,6],f:[m1AfF(a,b)],pas:1}),
    all.map(h=>({h:mx('x ∈ '+h),ok:h===S,tag:(h.includes('+∞')===right)?'bracket':'interval-dir'})),
    `f s’annule en x = ${num(r)} (car ${m1EqT(a,b)} = 0 donne x = ${num(r)}). La pente ${num(a)} est ${a>0?'positive : f est croissante, négative avant '+num(r)+' et positive après':'négative : f est décroissante, positive avant '+num(r)+' et négative après'}. Donc f(x) ${m1EqRel(rel)} 0 pour x ∈ ${S}${strict?' (borne exclue : inégalité stricte)':' (borne incluse : inégalité large)'}.`,
    'Trouve où f s’annule, puis regarde sur le graphique de quel côté la droite est au-dessus de l’axe.')};
/* 11. Raisonner : équation d'une droite par deux points (l'erreur se propage) */
const gM1AfR1=()=>{const a=pick([2,3,4,-2,-3,-4]);let xA,xB,b;do{xA=R(-4,3);xB=R(-3,4);b=R(-5,5)}while(xA===xB||Math.abs(a*xA+b)>9||Math.abs(a*xB+b)>9);
  const yA=a*xA+b,yB=a*xB+b,dx=xB-xA,dy=yB-yA;
  return chain({instr:'Trouve l’équation de la droite (AB) en construisant ton raisonnement.',prompt:stx(`A(${num(xA)} ; ${num(yA)}) et B(${num(xB)} ; ${num(yB)})`)+FIG.plot({x:[-5,5],y:[-10,10],pts:[[xA,yA,'A'],[xB,yB,'B']],pas:1,pasy:2}),
    steps:[
      {q:'Le coefficient directeur se calcule par…',o:[
        {h:`(${num(yB)} − ${m1AfP(yA)}) ÷ (${num(xB)} − ${m1AfP(xA)}) = ${num(a)}`,ok:true,n:dy,d:dx},
        {h:`(${num(yB)} − ${m1AfP(yA)}) ÷ (${num(xA)} − ${m1AfP(xB)}) = ${num(-a)}`,n:dy,d:-dx,why:'Il faut le même ordre en haut et en bas (B moins A) : sinon le signe s’inverse.',tag:'m1af-ordre'},
        {h:`(${num(xB)} − ${m1AfP(xA)}) ÷ (${num(yB)} − ${m1AfP(yA)}) = ${m1EqQ(dx,dy)}`,n:dx,d:dy,why:'La pente est Δy ÷ Δx : la différence des ordonnées en haut.',tag:'m1af-xy'}]},
      {q:'On calcule b avec le point A :',o:prev=>{const{n,d}=prev[0],A=m1EqQ(n,d);return[
        {h:`b = ${num(yA)} − ${A} × ${m1AfP(xA)} = ${m1EqQ(yA*d-n*xA,d)}`,ok:true,bn:yA*d-n*xA,bd:d},
        {h:`b = ${num(yA)} + ${A} × ${m1AfP(xA)} = ${m1EqQ(yA*d+n*xA,d)}`,bn:yA*d+n*xA,bd:d,why:'De y_A = a x_A + b, on isole b en retranchant a x_A.',tag:'m1af-b'},
        {h:`b = ${num(xA)} − ${A} × ${m1AfP(yA)} = ${m1EqQ(xA*d-n*yA,d)}`,bn:xA*d-n*yA,bd:d,why:'On a échangé abscisse et ordonnée de A : y_A = a × x_A + b.',tag:'m1af-xy'}]}},
      {q:'L’équation de la droite est…',o:prev=>{const{n,d}=prev[0],{bn,bd}=prev[1];return[
        {h:mx(m1AfLF(n,d,bn,bd)),ok:true,n,d,bn,bd},
        {h:mx(m1AfLF(bn,bd,n,d)),n:bn,d:bd,bn:n,bd:d,why:'a multiplie x, b est le terme constant : on les a échangés.'},
        {h:mx(m1AfLF(n,d,-bn,bd)),n,d,bn:-bn,bd,why:'Erreur de signe en recopiant b.',tag:'signe'}]}},
      {q:'Contrôle avec le point B :',o:prev=>{const{n,d,bn,bd}=prev[2],ok=Math.abs(n/d*xB+bn/bd-yB)<1e-9;return[
        {h:`B vérifie l’équation : la droite est juste`,ok,why:`Avec x = ${num(xB)}, l’équation donne y = ${m1EqQ(n*bd*xB+bn*d,d*bd)}, pas ${num(yB)} : il y a une erreur plus haut.`},
        {h:`B ne vérifie pas l’équation : il y a une erreur`,ok:!ok,why:`Avec x = ${num(xB)}, l’équation donne bien y = ${num(yB)}.`},
        {h:'On ne peut pas contrôler avec B',why:'B est sur la droite : ses coordonnées doivent vérifier l’équation.'}]}}],
    explain:`a = ${num(dy)} ÷ ${m1AfP(dx)} = ${num(a)}, puis b = ${num(yA)} − ${m1AfP(a)} × ${m1AfP(xA)} = ${num(b)}. Donc ${mx('y = '+m1EqT(a,b))} ; contrôle : ${num(a)} × ${m1AfP(xB)} ${b<0?MINUS:'+'} ${num(Math.abs(b))} = ${num(yB)}.`})};
/* 12. Raisonner : intersection de deux droites par le calcul */
const gM1AfR2=()=>{const x0=nz(-4,4),y0=R(-6,6);let a1,a2;do{a1=nz(-4,4);a2=nz(-4,4)}while(a1===a2||a1+a2===0);const b1=y0-a1*x0,b2=y0-a2*x0;
  if(b1===b2)return gM1AfR2();const L1=m1EqT(a1,b1),L2=m1EqT(a2,b2);
  return chain({instr:'Calcule le point d’intersection des deux droites, étape par étape.',prompt:mx(`d : y = ${L1}    d′ : y = ${L2}`),
    steps:[
      {q:'Au point commun des deux droites…',o:[
        {h:mx(`les deux y sont égaux : ${L1} = ${L2}`),ok:true},
        {h:mx(`les pentes sont égales : ${num(a1)} = ${num(a2)}`),why:'Comparer les pentes dit seulement si les droites sont parallèles ; cela ne donne pas le point commun.'},
        {h:mx('on pose x = 0 dans les deux équations'),why:'x = 0 donne les ordonnées à l’origine de chaque droite, pas leur point commun.'}]},
      {q:'On regroupe les x d’un côté :',o:[
        {h:mx(`${m1EqT(a1-a2,0)} = ${num(b2-b1)}`),ok:true,k:a1-a2,r:b2-b1},
        {h:mx(`${m1EqT(a1+a2,0)} = ${num(b2-b1)}`),k:a1+a2,r:b2-b1,why:`Pour enlever ${m1EqT(a2,0)} du membre de droite, on le retranche des deux côtés.`,tag:'signe'},
        {h:mx(`${m1EqT(a1-a2,0)} = ${num(b1-b2)}`),k:a1-a2,r:b1-b2,why:`Pour enlever ${num(b1)} à gauche, on le retranche : ${num(b2)} − ${m1AfP(b1)}.`,tag:'signe'}]},
      {q:'Donc…',o:prev=>{const{k,r}=prev[1];return[
        {h:mx(`x = ${m1EqQ(r,k)}`),ok:true,xn:r,xd:k},
        {h:mx(`x = ${m1EqQ(k,r)}`),xn:k,xd:r,why:'On divise le second membre par le coefficient de x, pas l’inverse.'},
        {h:mx(`x = ${m1EqQ(r-k,1)}`),xn:r-k,xd:1,why:'Pour enlever un coefficient multiplicateur, on divise ; on ne soustrait pas.',tag:'m1eq-coef'}]}},
      {q:'Le point d’intersection est…',o:prev=>{let{xn,xd}=prev[2];if(xd<0){xn=-xn;xd=-xd}const X=m1EqQ(xn,xd),Y=m1EqQ(a1*xn+b1*xd,xd),fb={h:`I(${X} ; ${m1EqQ(a1*xn+b1*xd+xd,xd)})`,why:'Erreur de calcul en remplaçant x dans l’équation de d.',tag:'calc'};return[fb,
        {h:`I(${X} ; ${Y})`,ok:true},
        {h:`I(${Y} ; ${X})`,why:'On écrit d’abord l’abscisse x, puis l’ordonnée y.',tag:'m1af-xy'},
        {h:`I(${X} ; ${num(b1)})`,why:'b est l’ordonnée en x = 0 ; il faut calculer y en remplaçant x dans l’équation.'},
        {h:`I(${X} ; ${m1EqQ(a1*xn-b1*xd,xd)})`,why:`Erreur de signe sur l’ordonnée à l’origine en calculant y avec ${mx('y = '+L1)}.`,tag:'signe'}]}}],
    explain:`${mx(`${L1} = ${L2}`)} donne ${mx(`${m1EqT(a1-a2,0)} = ${num(b2-b1)}`)}, donc x = ${num(x0)}. Puis y = ${num(a1)} × ${m1AfP(x0)}${b1?` ${b1<0?MINUS:'+'} ${num(Math.abs(b1))}`:''} = ${num(y0)}. I(${num(x0)} ; ${num(y0)}) ; contrôle avec d′ : ${num(a2)} × ${m1AfP(x0)}${b2?` ${b2<0?MINUS:'+'} ${num(Math.abs(b2))}`:''} = ${num(y0)}.`})};
ANA_UNITS.push({id:'m1-affine',tr:'m1',name:'Fonctions affines',sub:'Pente, équation de droite, intersection',glyph:'ax+b',tone:'c',
  skills:[SKA('m1.af.image','Calculer une image',gM1AfImage,1),SKA('m1.af.point','Placer un point d’une droite',gM1AfPoint,1),SKA('m1.af.lire','Lire pente et ordonnée à l’origine',gM1AfLire,1),
    SKA('m1.af.pente','Pente à partir de deux points',gM1AfPente,1),SKA('m1.af.zero','Où la droite coupe l’axe',gM1AfZero,2),SKA('m1.af.signe','Signe d’une fonction affine',gM1AfSigne,2),
    SKA('m1.af.eq2','Équation par deux points',gM1AfEq2,2),SKA('m1.af.pos','Parallèles, perpendiculaires',gM1AfPos,2),SKA('m1.af.inter','Placer une intersection',gM1AfInter,2),
    SKA('m1.af.r1','Raisonner : équation de droite',gM1AfR1,2),SKA('m1.af.perp','Équation d’une perpendiculaire',gM1AfPerp,3),SKA('m1.af.r2','Raisonner : intersection',gM1AfR2,3)]});
