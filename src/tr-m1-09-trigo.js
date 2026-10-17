/* ===================== MVA911 · Trigonométrie ===================== */
/* Réutilise les outils du parcours tg (tgPi, tgD, tgDT, tgEx, tgVN, tgVE, tgVH, tgX, tgQd, tgRef, tgSet, TG_QN…). */
const M1TG_DEGS=[30,45,60,90,120,135,150,180,210,225,240,270,300,315,330,-30,-45,-60,-90,-120,-135,-150];
const M1TG_AX=[[1,0,'0'],[0,1,'π/2'],[-1,0,'π'],[0,-1,'−π/2']];
/** Cercle trigonométrique avec une droite x = c (cos) ou y = c (sin) et les points d'intersection du demi-cercle supérieur */
const m1TgEqFig=(f,c,sols)=>{const v=tgVN(c),g=gp({W:230,H:230,x0:-1.35,x1:1.35,y0:-1.35,y1:1.35});g.axes(.5,.5,0,0);
  const r=g.X(1)-g.X(0);g.raw(`<circle cx="${g.X(0)}" cy="${g.Y(0)}" r="${r.toFixed(1)}" fill="none" stroke="var(--line)" stroke-width="1.4"/>`);
  g.raw(`<path d="M${g.X(1).toFixed(1)},${g.Y(0).toFixed(1)} A${r.toFixed(1)},${r.toFixed(1)} 0 0,0 ${g.X(-1).toFixed(1)},${g.Y(0).toFixed(1)}" fill="none" stroke="var(--ink)" stroke-width="2.4"/>`);
  if(f==='cos')g.seg(v,-1.3,v,1.3,'var(--t-c)',2,'6 4').text(v,-1.2,`x = ${c}`,'var(--t-c)','start',4,0,11);
  else g.seg(-1.3,v,1.3,v,'var(--t-c)',2,'6 4').text(-1.3,v,`y = ${c}`,'var(--t-c)','start',2,-5,11);
  (sols||[]).forEach(d=>g.dot(Math.cos(d*Math.PI/180),Math.sin(d*Math.PI/180),'var(--t-sq)',5));
  g.text(1,0,'0','var(--muted)','start',4,14,10,false).text(-1,0,'π','var(--muted)','end',-4,14,10,false);
  return`<div class="qfig qsq">${g.done('Cercle trigonométrique et droite')}</div>`};
/** Solutions (en degrés) de cos x = c ou sin x = c sur [0 ; π] */
const m1TgSol=(f,c)=>{const v=tgVN(c);if(Math.abs(v)>1)return[];if(f==='cos')return[Math.round(Math.acos(v)*180/Math.PI)];
  if(v<0)return[];const a=Math.round(Math.asin(v)*180/Math.PI);return[...new Set([a,180-a])].sort((x,y)=>x-y)};

/* 1. Placer le point associé à un angle (pointQ) */
const gM1TgPlace=()=>{const d=pick(M1TG_DEGS),deg=Math.random()<.3,r=d*Math.PI/180,c=Math.cos(r),s=Math.sin(r),A=deg?`${num(d)}°`:tgDT(d);
  return pointQ({instr:`Place sur le cercle trigonométrique le point M associé à l’angle ${A}.`,prompt:stx('Le point de départ est (1 ; 0) ; le sens positif est le sens inverse des aiguilles d’une montre.')+tgM(deg?`${num(d)}°`:tgD(d)),
    nom:'M',x:[-1.4,1.4],y:[-1.4,1.4],snap:.05,tol:.17,cible:[+c.toFixed(4),+s.toFixed(4)],fond:{cercle:1,pas:.5,etiq:1,pts:M1TG_AX},
    explain:`${A}${deg?` = ${tgDT(d)}`:` = ${num(d)}°`} : ${d<0?`on tourne de ${num(-d)}° dans le sens des aiguilles d’une montre`:`on tourne de ${num(d)}° dans le sens inverse des aiguilles d’une montre`}. Le point M a pour coordonnées (cos ; sin) = (${tgEx('cos',d)} ; ${tgEx('sin',d)}).`,
    hint:'Un quart de tour vaut π/2 (90°), un demi-tour π (180°). Repère d’abord le quart de tour, puis la position dans ce quart.'})};

/* 2. Valeur exacte dans le premier quart de tour, avec la figure */
const gM1TgVal=()=>{const d=pick([0,30,45,60,90]),f=pick(['cos','sin']),s=tgEx(f,d),o=f==='cos'?'sin':'cos',w=tgVN(tgEx(o,d));
  return tgX({instr:'Donne la valeur exacte.',prompt:tgM(`${f}(${tgD(d)})`)+FIG.cercle({deg:[d],proj:true,noms:['M']}),labels:[`${f}(${tgDT(d)}) =`],t:[tgVN(s)],ans:[tgVE(s)],
    explain:`${tgDT(d)} = ${d}°. ${f==='cos'?'Le cosinus est l’abscisse du point M':'Le sinus est l’ordonnée du point M'} : ${f}(${tgDT(d)}) = ${s}. Astuce : de 0 à π/2, sin vaut √0/2, √1/2, √2/2, √3/2, √4/2, et cos lit la même liste à l’envers.`,
    hint:f==='cos'?'Le cosinus se lit sur l’axe horizontal.':'Le sinus se lit sur l’axe vertical.',diag:([v])=>Math.abs(w-tgVN(s))>1e-6&&near(v,w,1e-4)?'tg-ref':null})};

/* 3. Signe de cos ou sin, avec la figure */
const gM1TgSigne=()=>{const d=pick(TG_NAX),f=pick(['cos','sin']),v=tgVN(tgEx(f,d)),Q=tgQd(d);
  return mcq(`Quel est le signe de ${f}(${tgDT(d)}) ?`,tgM(`${f}(${tgD(d)})`)+FIG.cercle({deg:[d],proj:true,noms:['M']}),
    [{h:'Positif',ok:v>0,tag:'tg-quadrant'},{h:'Négatif',ok:v<0,tag:'tg-quadrant'},{h:'Nul',tag:'tg-quadrant'}],
    `Le point M est ${TG_QN[Q]}. ${f==='cos'?`Son abscisse (le cosinus) est ${v>0?'positive : M est à droite':'négative : M est à gauche'} de l’axe vertical.`:`Son ordonnée (le sinus) est ${v>0?'positive : M est au-dessus':'négative : M est au-dessous'} de l’axe horizontal.`}`,
    'cos : à droite ou à gauche de l’axe vertical ? sin : au-dessus ou au-dessous de l’axe horizontal ?',true)};

/* 4. Valeur exacte sur tout le cercle, avec le point et son angle de référence */
const gM1TgV2=()=>{const d=pick(TG_NAX.concat([180,270,-90])),f=pick(['cos','sin']),s=tgEx(f,d),v=tgVN(s),rf=tgRef(d),sw=rf===30?60:rf===60?30:null;
  const fig=rf%90?FIG.cercle({deg:[d,rf],proj:true,noms:['M','M₀']}):FIG.cercle({deg:[d],proj:true,noms:['M']});
  return tgX({instr:'Donne la valeur exacte.',prompt:tgM(`${f}(${tgD(d)})`)+fig,labels:[`${f}(${tgDT(d)}) =`],t:[v],ans:[tgVE(s)],
    explain:`Le point M est ${TG_QN[tgQd(d)]}${rf%90?`. Son symétrique M₀ dans le premier quart de tour correspond à l’angle de référence ${tgDT(rf)}, dont on connaît les valeurs`:''}. On lit la valeur au signe près, puis le signe sur la figure : ${f}(${tgDT(d)}) = ${s}.`,
    hint:'Cherche l’angle de référence entre 0 et π/2, puis le signe selon la position de M.',
    diag:([w])=>v&&near(w,-v,1e-4)?'tg-quadrant':sw&&(near(w,tgVN(tgEx(f,sw)),1e-4)||near(w,-tgVN(tgEx(f,sw)),1e-4))?'tg-ref':null})};

/* 5. Résoudre cos x = c ou sin x = c sur [0 ; π] (figure) */
const gM1TgEq=()=>{const f=pick(['cos','sin']),c=f==='cos'?pick(['1/2','√2/2','√3/2','0',MINUS+'1/2',MINUS+'√2/2',MINUS+'√3/2']):pick(['1/2','√2/2','√3/2','1','0']),S=m1TgSol(f,c),P=x=>x*Math.PI/180;
  const two=S.length===2;
  return tgX({instr:two?'Résous sur [0 ; π] : donne les deux solutions, de la plus petite à la plus grande (valeurs exactes).':'Résous sur [0 ; π] (valeur exacte).',
    prompt:mx(`${f} x = `)+tgM(tgVH(c))+m1TgEqFig(f,c,S),labels:two?['x₁ =','x₂ =']:['x ='],t:S.map(P),ans:S.map(x=>tgPiE(x,180)),
    explain:f==='cos'?`Sur [0 ; π], le point descend de droite à gauche : la droite verticale x = ${c} coupe le demi-cercle une seule fois. cos(${tgDT(S[0])}) = ${c}, donc x = ${tgDT(S[0])}.`
      :two?`La droite horizontale y = ${c} coupe le demi-cercle supérieur en deux points symétriques par rapport à l’axe vertical : x et π − x. sin(${tgDT(S[0])}) = ${c}, donc S = {${tgDT(S[0])} ; ${tgDT(S[1])}}.`
      :`La droite y = 1 ne touche le cercle qu’en haut : x = π/2 est la seule solution.`,
    hint:'Lis les points d’intersection sur la figure, puis cherche l’angle dans le tableau des valeurs remarquables.',
    diag:(vs)=>two&&near(vs[0],P(S[1]),1e-4)&&near(vs[1],P(S[0]),1e-4)?'tg-ordre':!two&&S[0]&&near(vs[0],-P(S[0]),1e-4)?'signe':null})};

/* 6. Raisonner : résoudre sur [0 ; π] (l'erreur se propage) */
const gM1TgReq=()=>{const f=pick(['cos','sin']),c=f==='cos'?pick(['1/2','√2/2','√3/2',MINUS+'1/2',MINUS+'√2/2',MINUS+'√3/2']):pick(['1/2','√2/2','√3/2']),v=tgVN(c),neg=v<0,ab=neg?c.slice(1):c;
  const ref=Math.round((f==='cos'?Math.acos(Math.abs(v)):Math.asin(Math.abs(v)))*180/Math.PI),S=m1TgSol(f,c),nOk=S.length;
  const line=f==='cos'?`la droite verticale x = ${c}`:`la droite horizontale y = ${c}`;
  return chain({instr:'Résous l’équation sur [0 ; π], en construisant ton raisonnement.',prompt:mx(`${f} x = `)+tgM(tgVH(c))+mx('  avec x ∈ [0 ; π]')+m1TgEqFig(f,c,[]),
    steps:[
      {q:`Sur [0 ; π] (demi-cercle du haut), ${line} coupe le cercle en…`,o:[1,2,0].map(n=>({h:n===0?'aucun point':n===1?'un seul point':'deux points',ok:n===nOk,n,
        why:f==='cos'?'Sur le demi-cercle du haut, l’abscisse passe une seule fois par chaque valeur de [−1 ; 1] : un seul point.':'Pour 0 < c < 1, la droite horizontale coupe le demi-cercle du haut en deux points symétriques.',tag:'tg-sol2'}))},
      {q:`Dans le premier quart de tour, l’angle dont le ${f==='cos'?'cosinus':'sinus'} vaut ${ab} est…`,o:[30,45,60].map(a=>({h:tgM(tgD(a)),ok:a===ref,a,
        why:`${f}(${tgDT(ref)}) = ${ab}${ref!==45?` ; attention, π/6 et π/3 échangent leurs valeurs pour cos et sin`:''}.`,tag:'tg-ref'}))},
      {q:'Les solutions sur [0 ; π] sont donc…',o:prev=>{const n=prev[0].n,a=prev[1].a,W=(L,why,tag)=>({h:tgSet(L),why,tag});
        if(n===0)return[{h:'Aucune solution',ok:true},W([a],'Ce n’est pas cohérent avec ton premier choix (aucun point d’intersection).','raisonnement')];
        if(f==='sin'){const good=n===2?[a,180-a]:[a];
          return[{h:tgSet(good),ok:true},n===2?W([a],'Il manque la deuxième solution π − x : la droite coupe le demi-cercle deux fois.','tg-sol2'):W([a,180-a],'Ce n’est pas cohérent avec ton premier choix (un seul point).','raisonnement'),
            W([-a,a].sort((x,y)=>x-y),'x et −x ont le même cosinus, pas le même sinus ; et −x n’est pas dans [0 ; π].','tg-regle'),W([a,180+a],'π + x est hors de [0 ; π] et son sinus est négatif.','tg-quadrant')]}
        const good=neg?[180-a]:[a];
        if(n===2)return[{h:tgSet([a,180-a]),why:'cos(π − x) = −cos x : π − x n’a pas le même cosinus que x.',tag:'tg-regle'},{h:tgSet(good),ok:true},W([-a,a].sort((x,y)=>x-y),'−x n’est pas dans [0 ; π].','tg-princ')];
        return[{h:tgSet(good),ok:true},W(neg?[a]:[180-a],neg?`Le cosinus de ${tgDT(a)} est positif : pour une valeur négative, le point est à gauche, en π − ${tgDT(a)}.`:`Le cosinus de π − ${tgDT(a)} est négatif.`,'tg-quadrant'),
          W([a,180-a],'cos(π − x) = −cos x : on ne garde qu’un seul des deux angles.','tg-regle'),W([-a],'−x n’est pas dans [0 ; π].','tg-princ')]}}],
    explain:f==='cos'?`Sur [0 ; π], cos x = ${c} a une seule solution. ${neg?`cos(${tgDT(ref)}) = ${ab}, et cos(π − x) = −cos x, donc x = π − ${tgDT(ref)} = ${tgDT(180-ref)}.`:`cos(${tgDT(ref)}) = ${c}, donc x = ${tgDT(ref)}.`}`
      :`sin(${tgDT(ref)}) = ${c}, et sin(π − x) = sin x : sur [0 ; π], S = {${tgDT(ref)} ; ${tgDT(180-ref)}}.`})};

ANA_UNITS.push({id:'m1-trigo',tr:'m1',name:'Trigonométrie',sub:'Cercle, radians, cos et sin, équations',glyph:'cos',tone:'c',
  skills:[SKA('m1.tg.d2r','Degrés vers radians',gTgD2R,1),SKA('m1.tg.r2d','Radians vers degrés',gTrRadDeg,1),SKA('m1.tg.place','Placer un point sur le cercle',gM1TgPlace,1),
    SKA('m1.tg.val','Valeurs remarquables',gM1TgVal,1),SKA('m1.tg.signe','Signe de cos et sin',gM1TgSigne,1),SKA('m1.tg.lire','Lire un angle sur le cercle',gTgLire,2),
    SKA('m1.tg.v2','Valeur exacte sur tout le cercle',gM1TgV2,2),SKA('m1.tg.pyth','cos² + sin² = 1',gTgPyth,2),SKA('m1.tg.eq','Résoudre sur [0 ; π]',gM1TgEq,2),
    SKA('m1.tg.r1','Raisonner : une valeur exacte',gTgR1v,2),SKA('m1.tg.r2','Raisonner : une équation',gM1TgReq,3),SKA('m1.tg.r3','Raisonner : de sin x à cos x',gTgR2v,3)]});
