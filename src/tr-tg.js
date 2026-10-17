/* ===== Parcours Trigonométrie (tg) — d’après Ttrigt.pdf, Tct.pdf, Tft.pdf (Yvan Monka, maths-et-tiques.fr) =====
   Chapitres : tg-tri (triangle rectangle) · tg-cer (radians, cercle, mesure principale) · tg-val (cos et sin d’un réel)
   · tg-eq (équations et inéquations) · tg-fct (fonctions cosinus et sinus) · tg-plus (pour aller plus loin, hors documents). */
Object.assign(ANA_ERR,{
  'tg-exact':{label:'Valeur exacte demandée',tip:'On attend la valeur exacte : écris π, √ et des fractions (par exemple 2π/3 ou −√3/2), pas une valeur approchée.'},
  'tg-quadrant':{label:'Signe selon le quadrant',tip:'Place le point sur le cercle : cos est négatif à gauche de l’axe vertical, sin est négatif sous l’axe horizontal.'},
  'tg-ref':{label:'Angle de référence',tip:'π/6 et π/3 échangent leurs valeurs : sin(π/6) = 1/2 mais sin(π/3) = √3/2. Redessine le petit cercle pour les retrouver.'},
  'tg-tour':{label:'Tour complet',tip:'Un tour complet vaut 2π, pas π : retirer π envoie au point diamétralement opposé.'},
  'tg-princ':{label:'Mesure principale',tip:'La mesure principale est dans ]−π ; π] : si ton résultat dépasse π, retire encore 2π ; s’il vaut −π ou moins, ajoute 2π.'},
  'tg-conv':{label:'Conversion degrés-radians',tip:'π rad = 180°. Degrés → radians : multiplie par π/180. Radians → degrés : multiplie par 180/π.'},
  'tg-sol2':{label:'Deuxième solution oubliée',tip:'Sur un tour, une droite coupe le cercle en deux points (sauf pour les valeurs ±1) : cherche toujours la deuxième solution.'},
  'tg-regle':{label:'Règle cos / sin confondue',tip:'cos x = cos a donne x = a ou x = −a (symétrie par l’axe horizontal) ; sin x = sin a donne x = a ou x = π − a (symétrie par l’axe vertical).'},
  'tg-2kpi':{label:'Période après division',tip:'Si 2x = a + 2kπ, alors x = a/2 + kπ : on divise aussi le 2kπ par 2.'},
  'tg-arc':{label:'Mauvais arc du cercle',tip:'sin x ≤ c : partie du cercle sous la droite y = c ; cos x ≥ c : partie à droite de la droite x = c.'},
  'tg-pyth':{label:'Relation cos² + sin² = 1',tip:'cos²x = 1 − sin²x : élève bien au carré, puis prends la racine et choisis le signe grâce à l’intervalle.'},
  'tg-periode':{label:'Période',tip:'cos(ax + b) et sin(ax + b) ont pour période 2π/|a| : on divise 2π par a.'},
  'tg-ordre':{label:'Ordre des solutions',tip:'Range les solutions dans l’ordre croissant : la plus petite d’abord.'},
  'tg-add':{label:'Formule d’addition',tip:'cos(a + b) = cos a cos b − sin a sin b ; sin(a + b) = sin a cos b + cos a sin b. Attention : cos(a + b) n’est pas cos a + cos b.'}});

/* ---------- Outils communs ---------- */
const TG_g=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1};
const tgPi=(k,d)=>{if(!k)return'0';const g=TG_g(k,d),n=k/g,m=d/g,s=n<0?MINUS:'',a=Math.abs(n),t=(a===1?'':a)+'π';return s+(m===1?t:fr(t,m))}; // HTML
const tgPiT=(k,d)=>piFrac(k,d);                                                                               // texte
const tgPiE=(k,d)=>{if(!k)return'0';const g=TG_g(k,d),n=k/g,m=d/g;return(n===1?'':n===-1?'-':n)+'pi'+(m===1?'':'/'+m)}; // moteur
const tgM=h=>`<span class="m">${h}</span>`;
const tgD=d=>tgPi(d,180),tgDT=d=>piFrac(d,180);                // angle donné en degrés, affiché en radians
const tgVH=s=>{const neg=s[0]===MINUS,b=neg?s.slice(1):s;return(neg?MINUS:'')+(b.includes('/')?fr(...b.split('/')):b)};
const tgVE=s=>s.replace(MINUS,'-').replace(/√(\d)/g,'sqrt($1)');
const tgVN=s=>{const neg=s[0]===MINUS,b=neg?s.slice(1):s,[p,q]=b.split('/'),v=(p[0]==='√'?Math.sqrt(+p.slice(1)):+p)/(q?+q:1);return neg?-v:v};
const tgNeg=s=>s==='0'?'0':s[0]===MINUS?s.slice(1):MINUS+s;
const tgEx=(f,deg)=>f==='cos'?cosEx(deg):sinEx(deg);
const tgFr=(p,q)=>frH(new Fr(p,q));
const tgHat=L=>L+'̂';
const tgN=d=>((d%360)+360)%360;
const tgQd=deg=>{const m=tgN(deg);return m<90?0:m<180?1:m<270?2:3};          // quart de tour (hors axes)
const tgRef=deg=>{const m=tgN(deg);return m<=90?m:m<=180?180-m:m<=270?m-180:360-m};
const tgNorm=d=>{let r=tgN(d);if(r>180)r-=360;return r};                      // dans ]−180 ; 180]
const TG_QN=['en haut à droite (1er quart de tour)','en haut à gauche (2e quart de tour)','en bas à gauche (3e quart de tour)','en bas à droite (4e quart de tour)'];
const TG_QB=['entre 0 et π/2','entre π/2 et π','entre π et 3π/2','entre 3π/2 et 2π'];
/* Question numérique exacte : tolérance très fine, réponse attendue écrite pour le moteur */
const tgX=o=>{const q=nq(Object.assign({tol:1e-6},o)),d0=q.diag;q.diag=v=>{const r=d0(v);return r==='arrondi'?'tg-exact':r};if(o.ans)q.ans=o.ans;return q};
const tgSet=L=>tgM('{'+L.map(d=>tgD(d)).join(' ; ')+'}');

/* ---------- Figures ---------- */
const tgTri=(P,Q,Rr,L={})=>`<svg viewBox="0 0 300 146" style="width:100%;max-width:300px;display:block;margin:6px auto" role="img" aria-label="Triangle ${P}${Q}${Rr} rectangle en ${Rr}">
<polygon points="30,118 250,118 250,22" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
<polyline points="238,118 238,106 250,106" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
<path d="M66,118 A36,36 0 0 0 63,103.6" fill="none" stroke="var(--t-x)" stroke-width="2"/>
<text x="14" y="128" font-size="14" font-weight="700" fill="var(--ink)">${P}</text><text x="256" y="130" font-size="14" font-weight="700" fill="var(--ink)">${Rr}</text><text x="256" y="22" font-size="14" font-weight="700" fill="var(--ink)">${Q}</text>
${L.adj?`<text x="140" y="138" text-anchor="middle" font-size="13" font-weight="700" fill="var(--t-sq)">${L.adj}</text>`:''}${L.opp?`<text x="258" y="74" font-size="13" font-weight="700" fill="var(--t-sq)">${L.opp}</text>`:''}${L.hyp?`<text x="132" y="58" text-anchor="end" font-size="13" font-weight="700" fill="var(--t-sq)">${L.hyp}</text>`:''}${L.ang?`<text x="72" y="112" font-size="12" fill="var(--t-x)">${L.ang}</text>`:''}</svg>`;
const tgCirc=(k,q)=>{const cx=100,cy=100,r=72,P=t=>[cx+r*Math.cos(t),cy-r*Math.sin(t)];let s='';
  for(let i=0;i<2*q;i++){const [x,y]=P(i*Math.PI/q);s+=`<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--muted)" stroke-dasharray="3 3" stroke-width="1"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2" fill="var(--muted)"/>`}
  const t=k*Math.PI/q,[px,py]=P(t),lx=cx+(r+15)*Math.cos(t),ly=cy-(r+15)*Math.sin(t);
  return`<svg viewBox="0 0 200 200" style="width:100%;max-width:220px;display:block;margin:6px auto" role="img" aria-label="Cercle trigonométrique et point M">
<line x1="8" y1="100" x2="192" y2="100" stroke="var(--line)" stroke-width="1.2"/><line x1="100" y1="8" x2="100" y2="192" stroke="var(--line)" stroke-width="1.2"/>
<circle cx="100" cy="100" r="72" fill="none" stroke="var(--ink)" stroke-width="1.6"/>${s}
<line x1="100" y1="100" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" stroke="var(--t-x)" stroke-width="2.5"/><circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4.5" fill="var(--t-x)"/>
<text x="${lx.toFixed(1)}" y="${(ly+5).toFixed(1)}" text-anchor="middle" font-size="14" font-weight="700" fill="var(--t-x)">M</text>
<text x="104" y="114" font-size="11" fill="var(--muted)">O</text><text x="176" y="114" font-size="11" fill="var(--muted)">1</text></svg>`};

/* =====================================================================
   Chapitre 1 · tg-tri : trigonométrie dans le triangle rectangle
   ===================================================================== */
const TG_TRI=[['A','B','C'],['E','F','G'],['I','J','K'],['R','S','T'],['L','M','N']];
const TG_F={cos:['adj','hyp'],sin:['opp','hyp'],tan:['opp','adj']};
const TG_RN={hyp:'l’hypoténuse',adj:'le côté adjacent',opp:'le côté opposé'};
const TG_FN={cos:'le cosinus (CAH : adjacent / hypoténuse)',sin:'le sinus (SOH : opposé / hypoténuse)',tan:'la tangente (TOA : opposé / adjacent)'};
const tgLink=(a,b)=>Object.keys(TG_F).find(f=>a!==b&&TG_F[f].includes(a)&&TG_F[f].includes(b));
const tgSides=(P,Q,Rr)=>({hyp:P+Q,adj:P+Rr,opp:Q+Rr});
const tgWhyRole=(r,S,P)=>r==='hyp'?`L’hypoténuse est le côté en face de l’angle droit : c’est [${S.hyp}].`:r==='adj'?`Le côté adjacent touche ${tgHat(P)} sans être l’hypoténuse : c’est [${S.adj}].`:`Le côté opposé est en face de ${tgHat(P)} : c’est [${S.opp}].`;

const gTgVoc=()=>{const [P,Q,Rr]=shuffle(pick(TG_TRI).slice()),S=tgSides(P,Q,Rr),fig=tgTri(P,Q,Rr),pr=stx(`Le triangle ${P}${Q}${Rr} est rectangle en ${Rr}.`)+fig;
  const ex=`L’hypoténuse est en face de l’angle droit ${tgHat(Rr)} : [${S.hyp}]. Le côté adjacent à ${tgHat(P)} touche ${tgHat(P)} sans être l’hypoténuse : [${S.adj}]. Le côté opposé à ${tgHat(P)} lui fait face : [${S.opp}].`;
  const hint='Repère d’abord l’angle droit : l’hypoténuse est le côté qui lui fait face.';
  if(Math.random()<.5){const r=pick(['hyp','adj','opp']);
    return mcq(`Par rapport à l’angle ${tgHat(P)}, que représente le côté [${S[r]}] ?`,pr,['hyp','adj','opp'].map(x=>({h:TG_RN[x].replace(/^./,c=>c.toUpperCase()),ok:x===r,tag:'rapport'})),ex,hint)}
  const r=pick(['adj','opp']);
  return mcq(`Quel est ${TG_RN[r]} à l’angle ${tgHat(P)} ?`,pr,['hyp','adj','opp'].map(x=>({h:`[${S[x]}]`,ok:x===r,tag:'rapport'})),ex,hint)};

const gTgImp=()=>{const [bf,bv]=pick([['cos','1,3'],['sin','1,2'],['cos','1,05'],['sin','2']]),[tf,tv]=pick([['tan','2,5'],['tan','1,4'],['tan','3']]);
  const others=shuffle([['cos','0,42'],['sin','0,8'],['cos','0,1'],['sin','0,35'],['tan','0,6']]).slice(0,2);
  const A=Math.atan(parseFloat(tv.replace(',','.')))*180/Math.PI;
  return mcq('Lequel de ces résultats est impossible pour un angle aigu Â d’un triangle rectangle ?','',
    [{h:mx(`${bf} Â = ${bv}`),ok:true},{h:mx(`${tf} Â = ${tv}`),tag:'rapport'},...others.map(([f,v])=>({h:mx(`${f} Â = ${v}`),tag:'rapport'}))],
    `${bf} Â = ${bv} est impossible : cos Â = adjacent / hypoténuse et sin Â = opposé / hypoténuse, or l’hypoténuse est le plus long côté, donc ces deux rapports sont strictement compris entre 0 et 1. La tangente (opposé / adjacent) peut, elle, dépasser 1 : tan Â = ${tv} donne Â ≈ ${dec(A,1)}°.`,
    'Compare chaque côté à l’hypoténuse, le plus long côté du triangle.')};

const gTgR1=()=>{const [P,Q,Rr]=shuffle(pick(TG_TRI).slice()),S=tgSides(P,Q,Rr),H=tgHat(P);
  const [G,U]=pick([['hyp','adj'],['hyp','opp'],['opp','hyp'],['adj','hyp'],['opp','adj'],['adj','opp']]);
  const al=R(20,70),g=R(3,15)+(Math.random()<.5?R(1,9)/10:0),rad=al*Math.PI/180,ft=tgLink(U,G),numT=TG_F[ft][0]===U;
  const tv=numT?g*Math[ft](rad):g/Math[ft](rad);
  return chain({instr:'Calcule la longueur demandée, en construisant ton raisonnement.',
    prompt:stx(`Le triangle ${P}${Q}${Rr} est rectangle en ${Rr}, avec ${H} = ${al}° et ${S[G]} = ${num(g)} cm. On cherche ${S[U]}, arrondi au centième.`)+tgTri(P,Q,Rr,{ang:al+'°',[G]:num(g)+' cm',[U]:'?'}),
    steps:[
      {q:`Par rapport à l’angle ${H}, le côté cherché [${S[U]}] est…`,o:['hyp','adj','opp'].map(r=>({h:TG_RN[r],ok:r===U,c:r,why:tgWhyRole(U,S,P),tag:'rapport'}))},
      {q:`Quel rapport contient à la fois [${S[U]}] et le côté connu [${S[G]}] (${TG_RN[G]}) ?`,o:prev=>{const c=prev[0].c,okf=c!==G?tgLink(c,G):ft;
        return['cos','sin','tan'].map(f=>({h:TG_FN[f],ok:f===okf,f,why:`CAH SOH TOA : le rapport qui relie ${TG_RN[c===G?U:c]} et ${TG_RN[G]} est ${TG_FN[okf].split(' (')[0]}.`,tag:'rapport'}))}},
      {q:`On écrit l’égalité et on isole ${S[U]} :`,o:prev=>{const c=prev[0].c,f=prev[1].f;let isNum;
        if(c!==G&&TG_F[f].includes(c))isNum=TG_F[f][0]===c;else isNum=numT;
        const fx=`${f}(${al}°)`;
        return[{h:`${S[U]} = ${num(g)} × ${fx}`,ok:isNum,op:'mul',f,why:`Ici ${S[U]} est au dénominateur du rapport : ${fx} = ${num(g)} / ${S[U]}, donc ${S[U]} = ${num(g)} ÷ ${fx}.`,tag:'mult-div'},
          {h:`${S[U]} = ${num(g)} ÷ ${fx}`,ok:!isNum,op:'div',f,why:`Ici ${S[U]} est au numérateur : ${fx} = ${S[U]} / ${num(g)}, donc on multiplie : ${S[U]} = ${num(g)} × ${fx}.`,tag:'mult-div'},
          {h:`${S[U]} = ${fx} ÷ ${num(g)}`,ok:false,op:'inv',f,why:'L’égalité a été renversée : on isole l’inconnue par un produit en croix, sans inverser le rapport.',tag:'mult-div'}]}},
      {q:'À la calculatrice, on obtient…',o:prev=>{const {f,op}=prev[2],V=x=>op==='mul'?g*x:op==='div'?g/x:x/g;
        const v=V(Math[f](rad)),vr=V(Math[f](al)),vc=V(Math[f]((90-al)*Math.PI/180));const dd=Math.abs(v)<1?4:2,D=x=>dec(x,dd);
        return[{h:`${S[U]} ≈ ${D(v)} cm`,ok:true},{h:`${S[U]} ≈ ${D(vr)} cm`,why:`La calculatrice était en radians : ${f}(${al}) n’est pas ${f}(${al}°). Passe en mode degré.`,tag:'radian'},
          {h:`${S[U]} ≈ ${D(vc)} cm`,why:`Tu as utilisé l’autre angle aigu (${90-al}°) au lieu de ${H} = ${al}°.`,tag:'complementaire'}]}}],
    explain:`Par rapport à ${H}, [${S[U]}] est ${TG_RN[U]} et [${S[G]}] est ${TG_RN[G]} : on utilise ${TG_FN[ft]}. ${numT?`${ft}(${al}°) = ${S[U]} / ${num(g)}, donc ${S[U]} = ${num(g)} × ${ft}(${al}°)`:`${ft}(${al}°) = ${num(g)} / ${S[U]}, donc ${S[U]} = ${num(g)} ÷ ${ft}(${al}°)`} ≈ ${dec(tv,2)} cm (calculatrice en degrés).`});};

const gTgR2=()=>{const [P,Q,Rr]=shuffle(pick(TG_TRI).slice()),S=tgSides(P,Q,Rr),H=tgHat(P),ft=pick(['cos','sin','tan']);
  let u,v;if(ft==='tan'){u=R(1,12);do v=R(1,12);while(v===u)}else{v=R(4,15);u=R(1,v-1)}
  const [rn,rd]=TG_F[ft],A=(ft==='cos'?Math.acos(u/v):ft==='sin'?Math.asin(u/v):Math.atan(u/v))*180/Math.PI;
  const lab={ang:'?'};lab[rn]=u+' cm';lab[rd]=v+' cm';
  const pair={cos:'l’adjacent et l’hypoténuse',sin:'l’opposé et l’hypoténuse',tan:'l’opposé et l’adjacent'};
  const arc=(f,x)=>(f==='cos'?Math.acos(x):f==='sin'?Math.asin(x):Math.atan(x));
  return chain({instr:'Calcule l’angle, en construisant ton raisonnement.',
    prompt:stx(`Le triangle ${P}${Q}${Rr} est rectangle en ${Rr}, avec ${S[rn]} = ${u} cm et ${S[rd]} = ${v} cm. On cherche ${H}, au dixième de degré.`)+tgTri(P,Q,Rr,lab),
    steps:[
      {q:`Par rapport à ${H}, les côtés connus [${S[rn]}] et [${S[rd]}] sont…`,o:['cos','sin','tan'].map(f=>({h:pair[f],ok:f===ft,c:f,why:`[${S[rn]}] est ${TG_RN[rn]} et [${S[rd]}] est ${TG_RN[rd]} (l’hypoténuse fait face à l’angle droit ${tgHat(Rr)}).`,tag:'rapport'}))},
      {q:'Quel rapport utiliser ?',o:prev=>['cos','sin','tan'].map(f=>({h:TG_FN[f],ok:f===prev[0].c,f,why:`CAH SOH TOA : ${pair[prev[0].c]}, c’est ${TG_FN[prev[0].c].split(' (')[0]}.`,tag:'rapport'}))},
      {q:'On écrit l’égalité :',o:prev=>{const f=prev[1].f;return[{h:mx(`${f} ${H} = ${u}/${v}`),ok:true,f,r:u/v},
        {h:mx(`${f} ${H} = ${v}/${u}`),f,r:v/u,why:`Le rapport est inversé : ${TG_RN[rn]} (${u} cm) va au numérateur, ${TG_RN[rd]} (${v} cm) au dénominateur.`,tag:'rapport'}]}},
      {q:'Donc, calculatrice en mode degré…',o:prev=>{const {f,r}=prev[2];
        if(f!=='tan'&&r>1)return[{h:`Aucun angle ne convient : un ${f==='cos'?'cosinus':'sinus'} d’angle aigu est inférieur à 1, il y a une erreur plus haut`,ok:true},
          {h:`${H} ≈ ${dec(Math.atan(r)*180/Math.PI,1)}°`,why:`On ne peut pas changer de touche en cours de route : ${f} ${H} = ${dec(r,2)} > 1 est impossible.`,tag:'rapport'},
          {h:`${H} ≈ 90°`,why:`Un angle aigu d’un triangle rectangle est strictement inférieur à 90°, et ${f} ${H} = ${dec(r,2)} > 1 est impossible.`,tag:'rapport'}];
        const a=arc(f,r)*180/Math.PI;
        return[{h:`${H} ≈ ${dec(a,1)}°`,ok:true},{h:`${H} ≈ ${dec(arc(f,r),1)}°`,why:'Ce nombre est la mesure en radians : la calculatrice n’était pas en mode degré.',tag:'radian'},
          {h:`${H} ≈ ${dec(90-a,1)}°`,why:'C’est l’autre angle aigu du triangle : les deux angles aigus font 90° à eux deux.',tag:'complementaire'}]}}],
    explain:`[${S[rn]}] est ${TG_RN[rn]} à ${H} et [${S[rd]}] est ${TG_RN[rd]} : on utilise ${TG_FN[ft]}. ${ft} ${H} = ${u}/${v}, donc ${H} = arc${ft}(${u}/${v}) ≈ ${dec(A,1)}°. Contrôle : un angle aigu est entre 0° et 90°.`});};

const gTgR3=()=>{const al=R(20,40),h=R(20,60)/10,r=al*Math.PI/180,AC=h/Math.sin(r),AB=AC/Math.cos(r);
  const Cx=250,Cy=200,Ax=20,Bx=250,By=200-230*Math.tan(r),ah=230*Math.cos(r),Hx=Ax+ah*Math.cos(r),Hy=200-ah*Math.sin(r);
  const fig=`<svg viewBox="0 0 300 215" style="width:100%;max-width:300px;display:block;margin:6px auto" role="img" aria-label="Triangle ABC rectangle en C et hauteur CH">
<polygon points="${Ax},200 ${Cx},${Cy} ${Bx},${By.toFixed(1)}" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
<line x1="${Cx}" y1="${Cy}" x2="${Hx.toFixed(1)}" y2="${Hy.toFixed(1)}" stroke="var(--t-sq)" stroke-width="2"/>
<polyline points="238,200 238,188 250,188" fill="none" stroke="var(--ink)" stroke-width="1.3"/>
<path d="M58,200 A38,38 0 0 0 ${(Ax+38*Math.cos(r)).toFixed(1)},${(200-38*Math.sin(r)).toFixed(1)}" fill="none" stroke="var(--t-x)" stroke-width="2"/>
<text x="64" y="194" font-size="12" fill="var(--t-x)">${al}°</text><text x="6" y="210" font-size="14" font-weight="700" fill="var(--ink)">A</text>
<text x="256" y="212" font-size="14" font-weight="700" fill="var(--ink)">C</text><text x="256" y="${(By+6).toFixed(1)}" font-size="14" font-weight="700" fill="var(--ink)">B</text>
<text x="${(Hx-16).toFixed(1)}" y="${(Hy-6).toFixed(1)}" font-size="14" font-weight="700" fill="var(--ink)">H</text>
<text x="${((Cx+Hx)/2+6).toFixed(1)}" y="${((Cy+Hy)/2+14).toFixed(1)}" font-size="12" font-weight="700" fill="var(--t-sq)">${num(h)} cm</text></svg>`;
  const fn={sin:'sin',cos:'cos',tan:'tan'};
  return chain({instr:'Calcule AC puis AB, en construisant ton raisonnement.',
    prompt:stx(`ABC est rectangle en C et H est le pied de la hauteur issue de C. On sait que Â = ${al}° et HC = ${num(h)} cm. Arrondis au dixième.`)+fig,
    steps:[
      {q:'Pour calculer AC, dans quel triangle rectangle travailler ?',o:[{h:'Dans AHC, rectangle en H',ok:true},
        {h:'Dans ABC, rectangle en C',why:'Dans ABC on ne connaît encore aucun côté : [HC] n’est pas un côté de ABC.'},
        {h:'Dans BHC, rectangle en H',why:'[AC] n’est pas un côté du triangle BHC, et l’angle Â n’y apparaît pas.'}]},
      {q:'Dans AHC, par rapport à Â, [HC] et [AC] sont…',o:[{h:'l’opposé et l’hypoténuse',ok:true,f:'sin'},
        {h:'l’adjacent et l’hypoténuse',f:'cos',why:'[HC] est en face de Â : c’est le côté opposé.',tag:'rapport'},
        {h:'l’opposé et l’adjacent',f:'tan',why:'[AC] est en face de l’angle droit en H : c’est l’hypoténuse de AHC.',tag:'rapport'}]},
      {q:'Donc AC vaut…',o:prev=>{const f=prev[1].f,f2=f==='sin'?'cos':'sin',v=h/Math[f](r);
        return[{h:`AC = ${num(h)} ÷ ${fn[f]}(${al}°) ≈ ${dec(v,1)} cm`,ok:true,v},
          {h:`AC = ${num(h)} × ${fn[f]}(${al}°) ≈ ${dec(h*Math[f](r),1)} cm`,v:h*Math[f](r),why:`AC est au dénominateur : ${f}(${al}°) = ${num(h)} / AC, donc AC = ${num(h)} ÷ ${f}(${al}°).`,tag:'mult-div'},
          {h:`AC = ${num(h)} ÷ ${fn[f2]}(${al}°) ≈ ${dec(h/Math[f2](r),1)} cm`,v:h/Math[f2](r),why:`Ce n’est pas le rapport choisi à l’étape précédente.`,tag:'rapport'}]}},
      {q:'Enfin, dans ABC rectangle en C, AB vaut…',o:prev=>{const v=prev[2].v;
        return[{h:`AB = AC ÷ cos(${al}°) ≈ ${dec(v/Math.cos(r),1)} cm`,ok:true},
          {h:`AB = AC × cos(${al}°) ≈ ${dec(v*Math.cos(r),1)} cm`,why:'Dans ABC, AB est l’hypoténuse : cos Â = AC / AB, donc AB = AC ÷ cos Â.',tag:'mult-div'},
          {h:`AB = AC ÷ sin(${al}°) ≈ ${dec(v/Math.sin(r),1)} cm`,why:'Dans ABC, [AC] touche Â : c’est le côté adjacent, pas l’opposé.',tag:'rapport'}]}}],
    explain:`Dans AHC rectangle en H, [HC] est opposé à Â et [AC] est l’hypoténuse : sin(${al}°) = ${num(h)} / AC, donc AC = ${num(h)} ÷ sin(${al}°) ≈ ${dec(AC,1)} cm. Dans ABC rectangle en C, [AC] est adjacent à Â et [AB] est l’hypoténuse : AB = AC ÷ cos(${al}°) ≈ ${dec(AB,1)} cm. Garde la valeur exacte de AC dans la calculatrice pour ne pas cumuler les arrondis.`});};

/* =====================================================================
   Chapitre 2 · tg-cer : radians, cercle trigonométrique, mesure principale
   ===================================================================== */
const gTgD2R=()=>{const d=pick([10,15,18,20,33,36,40,45,50,60,72,75,80,100,108,120,135,140,150,210,225,240,270,300,315,330]),g=TG_g(d,180);
  return tgX({instr:'Convertis en radians (valeur exacte).',prompt:mx(`${d}°`),labels:['angle (rad) ='],t:[d*Math.PI/180],ans:[tgPiE(d,180)],
    explain:`180° correspondent à π rad : on multiplie par π/180. ${d} × π/180 = ${d}π/180 = ${tgDT(d)}${g>1?` (on simplifie par ${g})`:''}.`,
    hint:'Degrés et radians sont proportionnels : 180° ↔ π rad.',diag:([v])=>near(v,d*180/Math.PI,.5)||near(v,d/180,1e-3)?'tg-conv':null})};

const gTgSame=()=>{const q=pick([3,4,6]);let n;do n=R(1,2*q-1);while(TG_g(n,q)!==1);const k=pick([1,-1,2]);
  return mcq('Quel nombre est associé au même point du cercle trigonométrique ?',tgM(tgPi(n,q)),
    [{h:tgM(tgPi(n+2*q*k,q)),ok:true},{h:tgM(tgPi(n+q,q)),tag:'tg-tour'},{h:tgM(tgPi(-n,q)),tag:'tg-quadrant'},{h:tgM(tgPi(q-n,q)),tag:'tg-quadrant'}],
    `Deux réels sont associés au même point quand ils diffèrent d’un nombre entier de tours, c’est-à-dire d’un multiple de 2π : ${tgPiT(n+2*q*k,q)} = ${tgPiT(n,q)} ${k>0?'+':'−'} ${Math.abs(k)===1?'':Math.abs(k)}2π. Ajouter π ne fait qu’un demi-tour (point diamétralement opposé) ; −x et π − x donnent les points symétriques par rapport aux axes.`,
    'Cherche celui qui diffère d’un multiple de 2π.')};

const gTgLire=()=>{const q=pick([3,4,6]),k=R(1,2*q-1),I=Math.random()<.5?0:1,t=I&&k>q?k-2*q:k;
  return tgX({instr:`Lis le nombre associé au point M dans ${I?'l’intervalle ]−π ; π]':'l’intervalle [0 ; 2π['} (valeur exacte).`,
    prompt:stx(`Les pointillés partagent le cercle trigonométrique en ${2*q} parts égales de ${tgPiT(1,q)} chacune. On part du point (1 ; 0).`)+tgCirc(k,q),
    labels:['M est associé à'],t:[t*Math.PI/q],ans:[tgPiE(t,q)],
    explain:`Chaque part vaut ${tgPiT(1,q)}. ${t>0?`Dans le sens direct (inverse des aiguilles d’une montre), on compte ${t} parts : M est associé à ${tgPiT(t,q)}.`:`Dans le sens indirect, on compte ${-t} parts : M est associé à ${tgPiT(t,q)}. (Dans le sens direct on trouverait ${tgPiT(k,q)}, qui n’est pas dans ]−π ; π].)`}`,
    hint:'Le sens direct est le sens inverse des aiguilles d’une montre ; un tour complet vaut 2π.',
    diag:([v])=>near(v,(t+2*q)*Math.PI/q,1e-4)||near(v,(t-2*q)*Math.PI/q,1e-4)?'tg-princ':near(v,-t*Math.PI/q,1e-4)?'tg-quadrant':null})};

const tgPr=(n,q)=>{let r=((n%(2*q))+2*q)%(2*q);if(r>q)r-=2*q;return r};
const gTgPrinc=()=>{const q=pick([2,3,4,6]);let n;do n=R(-7*q,7*q);while(TG_g(n,q)!==1||Math.abs(n)<=q);const r=tgPr(n,q),k=(n-r)/(2*q);
  return tgX({instr:'Donne la mesure principale de cet angle (valeur exacte, dans ]−π ; π]).',prompt:tgM(tgPi(n,q)),labels:['mesure principale ='],t:[r*Math.PI/q],ans:[tgPiE(r,q)],
    explain:`Un tour vaut 2π = ${2*q}π/${q}. On écrit ${tgPiT(n,q)} = ${num(2*k)}π ${r<0?'−':'+'} ${tgPiT(Math.abs(r),q)} : ${num(2*k)}π représente ${Math.abs(k)} tour${Math.abs(k)>1?'s':''} complet${Math.abs(k)>1?'s':''} (sens ${k>0?'direct':'indirect'}), qu’on retire. Il reste ${tgPiT(r,q)}, qui est bien dans ]−π ; π].`,
    hint:`Ajoute ou retire ${2*q} au numérateur (un tour) jusqu’à tomber entre −${q} (exclu) et ${q}.`,
    diag:([v])=>near(v,(r+2*q)*Math.PI/q,1e-4)||near(v,(r-2*q)*Math.PI/q,1e-4)?'tg-princ':near(v,(r+q)*Math.PI/q,1e-4)||near(v,(r-q)*Math.PI/q,1e-4)?'tg-tour':null})};

const gTgR1c=()=>{const q=pick([3,4,6]);let n;do n=R(2*q+1,7*q);while(TG_g(n,q)!==1);const k=Math.floor(n/(2*q)),r=n-2*q*k,fq=Math.floor(n/q);
  const js=[...new Set([k,fq,k+1,k+2,k-1].filter(x=>x>=1))].slice(0,3);
  return chain({instr:'Place le point sur le cercle, en construisant ton raisonnement.',prompt:stx('Où se trouve le point du cercle trigonométrique associé à ')+tgM(tgPi(n,q))+' ?',
    steps:[
      {q:`Combien de tours complets (2π = ${2*q}π/${q}) peut-on retirer, en gardant un reste entre 0 et 2π ?`,o:js.map(j=>({h:`${j} tour${j>1?'s':''}, soit ${2*j}π`,ok:j===k,j,
        why:j===fq&&j!==k?`${j}π ne fait pas ${j} tours : un tour vaut 2π. Il y a ${k} tour${k>1?'s':''} complet${k>1?'s':''}.`:j>k?`${j} tours font ${2*j*q}π/${q}, c’est plus que ${n}π/${q} : le reste serait négatif.`:`Après ${j} tour${j>1?'s':''}, il reste plus de 2π : on peut retirer un tour de plus.`,tag:'tg-tour'}))},
      {q:'Il reste donc…',o:prev=>{const j=prev[0].j,rem=n-2*q*j;return[{h:tgM(tgPi(rem,q)),ok:true,rem},
        {h:tgM(tgPi(n-q*j,q)),rem:n-q*j,why:`Chaque tour retire 2π = ${2*q}π/${q}, pas π.`,tag:'tg-tour'},
        {h:tgM(tgPi(-rem,q)),rem:-rem,why:`On calcule ${n}π/${q} − ${2*j}π, pas l’inverse : attention au signe.`,tag:'signe'}]}},
      {q:'Le point est donc situé…',o:prev=>{const rm=prev[1].rem,okq=tgQd(rm*180/q);
        return TG_QN.map((h,i)=>({h,ok:i===okq,why:`${tgPiT(rm,q)} est associé au ${['1er','2e','3e','4e'][okq]} quart de tour : ${TG_QN[okq]}.`,tag:'tg-quadrant'}))}}],
    explain:`${tgPiT(n,q)} = ${2*k}π + ${tgPiT(r,q)} : on fait ${k} tour${k>1?'s':''} complet${k>1?'s':''}, puis ${tgPiT(r,q)}. Le point est donc le même que celui de ${tgPiT(r,q)}, ${TG_QN[tgQd(r*180/q)]}.`});};

const gTgR2c=()=>{const q=pick([2,3,4,6]);let n;do n=R(-6*q,6*q);while(TG_g(n,q)!==1||Math.abs(n)<=q);
  const rp=tgPr(n,q),kp=(n-rp)/(2*q),rz=((n%(2*q))+2*q)%(2*q),kz=(n-rz)/(2*q);let j=Math.round(n/q);if(j%2===0)j+=n/q>j?1:-1;const s=n-q*j;
  const dcp=(m,rr)=>m===0?`${tgPi(n,q)} est déjà dans l’intervalle`:`${tgPi(n,q)} = ${num(m)}π ${rr<0?MINUS:'+'} ${tgPi(Math.abs(rr),q)}`;
  return chain({instr:'Trouve la mesure principale, en construisant ton raisonnement.',prompt:stx('Mesure principale de l’angle ')+tgM(tgPi(n,q)),
    steps:[
      {q:'La mesure principale est, par définition, la mesure située dans…',o:[{h:tgM(']−π ; π]'),ok:true,c:'p'},
        {h:tgM('[0 ; 2π['),c:'z',why:'C’est un autre repérage possible, mais la mesure principale est, par définition, dans ]−π ; π].',tag:'tg-princ'},
        {h:tgM('[−π/2 ; π/2]'),c:'h',why:'Cet intervalle ne couvre qu’un demi-tour : la moitié des points du cercle n’y auraient aucune mesure.',tag:'tg-princ'}]},
      {q:'On fait apparaître des tours complets :',o:prev=>[{h:tgM(dcp(2*kp,rp)),ok:prev[0].c!=='z',r:rp,why:'Ce reste est dans ]−π ; π], pas dans l’intervalle choisi à l’étape précédente.',tag:'raisonnement'},{h:tgM(dcp(2*kz,rz)),ok:prev[0].c==='z',r:rz,why:'Ce reste est dans [0 ; 2π[, pas dans ]−π ; π].',tag:'tg-princ'},
        {h:tgM(`${tgPi(n,q)} = ${num(j)}π ${s<0?MINUS:'+'} ${tgPi(Math.abs(s),q)}`),r:s,why:`${num(j)}π n’est pas un nombre entier de tours (${j} est impair) : il faut un multiple de 2π.`,tag:'tg-tour'}]},
      {q:'La mesure principale est donc…',o:prev=>{const r=prev[1].r,o2=r>0?r-2*q:r+2*q;return[{h:tgM(tgPi(r,q)),ok:true},
        {h:tgM(tgPi(o2,q)),why:'Ce nombre est associé au même point, mais ce n’est pas le reste qu’on vient de calculer.',tag:'tg-princ'},
        {h:tgM(tgPi(-r,q)),why:'Le signe compte : x et −x sont symétriques par rapport à l’axe horizontal.',tag:'signe'}]}}],
    explain:`Un tour vaut 2π = ${2*q}π/${q}. ${tgPiT(n,q)} = ${num(2*kp)}π ${rp<0?'−':'+'} ${tgPiT(Math.abs(rp),q)} : on retire ${Math.abs(kp)} tour${Math.abs(kp)>1?'s':''}. ${tgPiT(rp,q)} est dans ]−π ; π] : c’est la mesure principale.`});};

const gTgR3c=()=>{const d=pick([33,20,40,50,75,105,110,135,150,160,225,252,300]);
  return chain({instr:'Convertis en radians, en construisant ton raisonnement.',prompt:stx(`Donne la mesure en radians d’un angle de ${d}°.`),
    steps:[
      {q:'Quelle correspondance sert de base ?',o:[{h:'180° ↔ π rad',ok:true,F:180},{h:'360° ↔ π rad',F:360,why:'Un tour complet (360°) vaut 2π rad, pas π.',tag:'tg-conv'},
        {h:'90° ↔ π rad',F:90,why:'π rad est un demi-tour, soit 180° ; 90° vaut π/2.',tag:'tg-conv'}]},
      {q:`Pour convertir ${d}° en radians, on calcule…`,o:prev=>{const F=prev[0].F;return[{h:`${d} × π / ${F}`,ok:true,F,m:1},
        {h:`${d} × ${F} / π`,F,m:0,why:'C’est la conversion dans l’autre sens (radians vers degrés).',tag:'tg-conv'},
        {h:`${d} ÷ ${F}`,F,m:0,why:'Il manque π : une mesure en radians s’exprime ici comme un multiple de π.',tag:'tg-conv'}]}},
      {q:'Après simplification, on obtient…',o:prev=>{const F=prev[1].F,g=TG_g(d,F),p=d/g,qq=F/g;
        return[{h:tgM(tgPi(p,qq)),ok:true},{h:tgM(tgPi(qq,p)),why:'Le numérateur et le dénominateur ont été échangés.',tag:'calc'},
          {h:tgM(qq%2===0?tgPi(p,qq/2):tgPi(p,2*qq)),why:'En simplifiant, on divise le numérateur et le dénominateur par le même nombre.',tag:'calc'}]}}],
    explain:`180° ↔ π rad, donc ${d}° = ${d} × π/180 = ${d}π/180 = ${tgDT(d)} rad.`});};

/* =====================================================================
   Chapitre 3 · tg-val : cosinus et sinus d’un nombre réel
   ===================================================================== */
const TG_DEG=[0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330];
const TG_NAX=[120,135,150,210,225,240,300,315,330,-30,-45,-60,-120,-135,-150];
const gTgV1=()=>{const d=pick([0,30,45,60,90,180]),f=pick(['cos','sin']),s=tgEx(f,d),o=f==='cos'?'sin':'cos';
  return tgX({instr:'Donne la valeur exacte.',prompt:tgM(`${f}(${tgD(d)})`),labels:[`${f}(${tgDT(d)}) =`],t:[tgVN(s)],ans:[tgVE(s)],
    explain:`Tableau des valeurs remarquables : ${f}(${tgDT(d)}) = ${s}. Astuce : de 0 à π/2, sin vaut √0/2, √1/2, √2/2, √3/2, √4/2 et cos lit la même liste à l’envers.`,
    hint:'Sur le cercle, cos est l’abscisse du point et sin son ordonnée.',diag:([v])=>near(v,tgVN(tgEx(o,d)),1e-4)?'trigo':null})};

const gTgSigne=()=>{const d=pick(TG_NAX.concat([30,45,60])),f=pick(['cos','sin']),v=tgVN(tgEx(f,d)),okI=v>0?0:1,Q=tgQd(d);
  return mcq(`Quel est le signe de ${f}(${tgDT(d)}) ?`,tgM(`${f}(${tgD(d)})`),['Positif','Négatif','Nul'].map((h,i)=>({h,ok:i===okI,tag:'tg-quadrant'})),
    `Le point associé à ${tgDT(d)} est ${TG_QN[Q]}. ${f==='cos'?`Son abscisse (le cosinus) est ${v>0?'positive : il est à droite':'négative : il est à gauche'} de l’axe vertical.`:`Son ordonnée (le sinus) est ${v>0?'positive : il est au-dessus':'négative : il est au-dessous'} de l’axe horizontal.`}`,
    'Place le point sur le cercle : cos se lit sur l’axe horizontal, sin sur l’axe vertical.',true)};

const gTgV2=()=>{const d=pick(TG_NAX.concat([180,270,-90,390,405,-210])),f=pick(['cos','sin']),s=tgEx(f,d),v=tgVN(s),rf=tgRef(d);
  const sw=rf===30?60:rf===60?30:null;
  return tgX({instr:'Donne la valeur exacte.',prompt:tgM(`${f}(${tgD(d)})`),labels:[`${f}(${tgDT(d)}) =`],t:[v],ans:[tgVE(s)],
    explain:`Le point associé à ${tgDT(d)} est ${TG_QN[tgQd(d)]}${rf%90?`, avec l’angle de référence ${tgDT(rf)}`:''}. On lit la valeur du premier quart de tour, puis le signe sur le cercle : ${f}(${tgDT(d)}) = ${s}.`,
    hint:'Place le point, trouve l’angle de référence entre 0 et π/2, puis le signe.',
    diag:([w])=>v&&near(w,-v,1e-4)?'tg-quadrant':sw&&(near(w,tgVN(tgEx(f,sw)),1e-4)||near(w,-tgVN(tgEx(f,sw)),1e-4))?'tg-ref':null})};

const TG_AS=[['cos(−x)','cos x','x et −x sont symétriques par rapport à l’axe des abscisses : même abscisse.'],['sin(−x)','−sin x','x et −x sont symétriques par rapport à l’axe des abscisses : ordonnées opposées.'],
  ['cos(π − x)','−cos x','x et π − x sont symétriques par rapport à l’axe des ordonnées : abscisses opposées.'],['sin(π − x)','sin x','x et π − x sont symétriques par rapport à l’axe des ordonnées : même ordonnée.'],
  ['cos(π + x)','−cos x','x et π + x sont symétriques par rapport à l’origine O : les deux coordonnées changent de signe.'],['sin(π + x)','−sin x','x et π + x sont symétriques par rapport à l’origine O : les deux coordonnées changent de signe.'],
  ['cos(π/2 − x)','sin x','x et π/2 − x sont symétriques par rapport à la droite y = x : abscisse et ordonnée s’échangent.'],['sin(π/2 − x)','cos x','x et π/2 − x sont symétriques par rapport à la droite y = x : abscisse et ordonnée s’échangent.']];
const gTgAssoc=()=>{const [e,a,w]=pick(TG_AS);
  return mcq('Pour tout réel x, que vaut cette expression ?',mx(e),['cos x','−cos x','sin x','−sin x'].map(h=>({h:mx(h),ok:h===a,tag:'tg-quadrant'})),
    `${e} = ${a} : ${w} Vérifie avec x = π/6 et un petit dessin.`,'Dessine le point de x et celui de l’autre angle sur le cercle : quelle symétrie les relie ?')};

const TG_TRP=[[3,4,5],[5,12,13],[8,15,17],[7,24,25]];
const TG_IQ=[']0 ; π/2[',']π/2 ; π[',']−π ; −π/2[',']−π/2 ; 0['];
const gTgPyth=()=>{const [p,q,r]=pick(TG_TRP),[a,b]=Math.random()<.5?[p,q]:[q,p],Q=R(0,3),cs=[1,-1,-1,1][Q],ss=[1,1,-1,-1][Q],f=pick(['sin','cos']),o=f==='sin'?'cos':'sin',sf=f==='sin'?ss:cs,so=f==='sin'?cs:ss,t=so*b/r;
  return tgX({instr:`Calcule ${o} x (valeur exacte).`,prompt:mx(`${f} x = ${sf<0?MINUS:''}${fr(a,r)}  et  x ∈ ${TG_IQ[Q]}`),labels:[`${o} x =`],t:[t],ans:[`${so<0?'-':''}${b}/${r}`],
    explain:`cos²x + sin²x = 1, donc ${o}²x = 1 − (${a}/${r})² = ${r*r-a*a}/${r*r}. Ainsi ${o} x = ${b}/${r} ou ${o} x = −${b}/${r}. Sur ${TG_IQ[Q]}, le point est ${TG_QN[Q]} : ${o} x est ${so>0?'positif':'négatif'}, donc ${o} x = ${so<0?'−':''}${b}/${r}.`,
    hint:'Utilise cos²x + sin²x = 1, puis l’intervalle pour choisir le signe.',
    diag:([v])=>near(v,-t,1e-4)?'tg-quadrant':near(v,so*(r-a)/r,1e-4)||near(v,b*b/(r*r),1e-4)||near(v,so*(r*r-a*a)/(r*r),1e-4)?'tg-pyth':null})};

/* options « valeur exacte » à partir d’un signe et d’un angle de référence (degrés) */
const tgValOpts=(f,sgn,rf,whyS)=>{const o=f==='cos'?'sin':'cos',v=tgEx(f,rf),ok=sgn===0?'0':sgn>0?v:tgNeg(v),L=[[ok,true,'']];
  const add=(s,w,tag)=>{if(!L.some(x=>x[0]===s))L.push([s,false,w,tag])};
  add(tgNeg(ok),whyS||'Le signe est faux : regarde dans quel quart de tour se trouve le point.','tg-quadrant');
  const ov=tgEx(o,rf);add(sgn<0?tgNeg(ov):ov,`C’est la valeur du ${o==='cos'?'cosinus':'sinus'} : ${f==='cos'?'le cosinus est l’abscisse':'le sinus est l’ordonnée'}.`,'trigo');
  ['1/2','√2/2','√3/2'].forEach(s=>add(sgn<0?tgNeg(s):s,'Ce n’est pas la valeur associée à l’angle de référence.','tg-ref'));
  return L.slice(0,4).map(([s,ok,why,tag])=>ok?{h:tgM(tgVH(s)),ok:true}:{h:tgM(tgVH(s)),why,tag})};

const gTgR1v=()=>{const d=pick([120,135,150,210,225,240,300,315,330]),f=pick(['cos','sin']),Q=tgQd(d),rf=tgRef(d),A=tgDT(d),s=tgEx(f,d);
  const fm=[`${A}`,`π − ${tgDT(rf)}`,`π + ${tgDT(rf)}`,`2π − ${tgDT(rf)}`][Q];
  return chain({instr:'Calcule la valeur exacte, en construisant ton raisonnement.',prompt:tgM(`${f}(${tgD(d)})`),
    steps:[
      {q:`Où se trouve le point associé à ${A} ?`,o:TG_QN.map((h,i)=>({h,ok:i===Q,i,why:`${A} est ${TG_QB[Q]} : le point est ${TG_QN[Q]}.`,tag:'tg-quadrant'}))},
      {q:`Quel est le signe de ${f}(${A}) ?`,o:prev=>{const i=prev[0].i,sg2=(f==='cos'?[1,-1,-1,1]:[1,1,-1,-1])[i];
        return[{h:'Positif',ok:sg2>0,s:1,why:`Dans ce quart de tour, ${f==='cos'?'l’abscisse':'l’ordonnée'} est négative.`,tag:'tg-quadrant'},{h:'Négatif',ok:sg2<0,s:-1,why:`Dans ce quart de tour, ${f==='cos'?'l’abscisse':'l’ordonnée'} est positive.`,tag:'tg-quadrant'},
          {h:'Nul',s:0,why:`Le ${f==='cos'?'cosinus':'sinus'} n’est nul que sur l’axe ${f==='cos'?'vertical':'horizontal'} : ce point n’y est pas.`,tag:'tg-quadrant'}]}},
      {q:'Quel est l’angle de référence, entre 0 et π/2 ?',o:[30,45,60].map(a=>({h:tgM(tgD(a)),ok:a===rf,a,why:`${A} = ${fm} : l’angle de référence est ${tgDT(rf)}.`,tag:'tg-ref'}))},
      {q:`Donc ${f}(${A}) = …`,o:prev=>tgValOpts(f,prev[1].s,prev[2].a)}],
    explain:`${A} = ${fm} : le point est ${TG_QN[Q]}, donc ${f}(${A}) est ${tgVN(s)>0?'positif':'négatif'}. Avec l’angle de référence ${tgDT(rf)} : ${f}(${A}) = ${s}.`});};

const gTgR2v=()=>{const [p,q,r]=pick(TG_TRP),[a,b]=Math.random()<.5?[p,q]:[q,p],Q=R(0,3),cs=[1,-1,-1,1][Q],ss=[1,1,-1,-1][Q],f=pick(['sin','cos']),o=f==='sin'?'cos':'sin',sf=f==='sin'?ss:cs,so=f==='sin'?cs:ss;
  const given=`${sf<0?MINUS:''}${fr(a,r)}`;
  return chain({instr:`Calcule ${o} x, en construisant ton raisonnement.`,prompt:mx(`${f} x = ${given}  et  x ∈ ${TG_IQ[Q]}`),
    steps:[
      {q:`Quelle relation permet de passer de ${f} x à ${o} x ?`,o:[{h:mx('cos²x + sin²x = 1'),ok:true,c:'p'},
        {h:mx('cos x + sin x = 1'),c:'l',why:'Faux : en π/4, cos x + sin x = √2. C’est la somme des carrés qui vaut 1.',tag:'tg-pyth'},
        {h:mx('tan x = sin x / cos x'),c:'t',why:'Cette égalité est juste, mais elle fait apparaître une nouvelle inconnue, tan x : elle ne permet pas de conclure.',tag:'tg-pyth'}]},
      {q:'On en déduit…',o:prev=>{const c=prev[0].c;return[{h:mx(`${o}²x = 1 − (${a}/${r})² = `)+tgM(fr(r*r-a*a,r*r)),ok:c!=='l',k:'sq',why:'Ce n’est pas ce que donne la relation choisie à l’étape précédente.',tag:'raisonnement'},
        {h:mx(`${o} x = 1 − ${sf<0?'(−'+a+'/'+r+')':a+'/'+r} = `)+tgM(tgFr(r-sf*a,r)),ok:c==='l',k:'lin',why:'On a oublié les carrés : c’est cos²x + sin²x qui vaut 1.',tag:'tg-pyth'},
        {h:mx(`${o}²x = 1 + (${a}/${r})² = `)+tgM(fr(r*r+a*a,r*r)),k:'plus',why:`Pour isoler ${o}²x, on retranche ${f}²x : 1 − ${f}²x.`,tag:'signe'}]}},
      {q:`Sachant que x ∈ ${TG_IQ[Q]}, on conclut :`,o:prev=>{const k=prev[1].k;
        if(k==='lin')return[{h:mx(`${o} x = `)+tgM(tgFr(r-sf*a,r)),ok:true},{h:mx(`${o} x = ${so<0?MINUS:''}${b}/${r}`),why:'Ce n’est pas ce que donne l’égalité de l’étape précédente.',tag:'tg-pyth'},{h:mx(`${o} x = ${b}/${r} ou ${o} x = −${b}/${r}`),why:'Il n’y a qu’une valeur.',tag:'tg-quadrant'}];
        return[{h:mx(`${o} x = ${so<0?MINUS:''}${b}/${r}`),ok:true},{h:mx(`${o} x = ${so>0?MINUS:''}${b}/${r}`),why:`Sur ${TG_IQ[Q]}, ${o} x est ${so>0?'positif':'négatif'}.`,tag:'tg-quadrant'},
          {h:mx(`${o} x = ${b}/${r} ou ${o} x = −${b}/${r}`),why:'L’intervalle donné fixe le signe : il n’y a qu’une valeur possible.',tag:'tg-quadrant'}]}}],
    explain:`cos²x + sin²x = 1 donne ${o}²x = 1 − (${a}/${r})² = ${r*r-a*a}/${r*r} = (${b}/${r})². Sur ${TG_IQ[Q]}, ${o} x est ${so>0?'positif':'négatif'}, donc ${o} x = ${so<0?'−':''}${b}/${r}.`});};

const gTgR3v=()=>{const q=pick([3,4,6]);let n;do n=(Math.random()<.5?-1:1)*R(2*q+1,7*q);while(TG_g(n,q)!==1);
  const f=pick(['cos','sin']),r=tgPr(n,q),o2=r>0?r-2*q:r+2*q;let j=Math.round(n/q);if(j%2===0)j+=n/q>j?1:-1;const s=n-q*j;
  const cand=[[r,true],[o2,false,'Ce nombre est associé au bon point, mais il n’est pas dans ]−π ; π].','tg-princ'],[s,false,`On a retiré ${Math.abs(j)}π : ${Math.abs(j)} est impair, ce n’est pas un nombre entier de tours.`,'tg-tour']];
  const seen=new Set,opts1=cand.filter(([x])=>!seen.has(x)&&seen.add(x)).map(([x,ok,why,tag])=>ok?{h:tgM(tgPi(x,q)),ok:true,m:x}:{h:tgM(tgPi(x,q)),m:x,why,tag});
  const D=r*180/q,A=tgPiT(n,q),val=tgEx(f,D);
  return chain({instr:'Calcule la valeur exacte, en construisant ton raisonnement.',prompt:tgM(`${f}(${tgPi(n,q)})`),
    steps:[
      {q:`Mesure principale de ${A} :`,o:opts1},
      {q:'Le point associé est situé…',o:prev=>{const Qc=tgQd(prev[0].m*180/q);return TG_QN.map((h,i)=>({h,ok:i===Qc,i,why:`${tgPiT(prev[0].m,q)} correspond au ${['1er','2e','3e','4e'][Qc]} quart de tour.`,tag:'tg-quadrant'}))}},
      {q:`Donc ${f}(${A}) = …`,o:prev=>{const i=prev[1].i,sgn=(f==='cos'?[1,-1,-1,1]:[1,1,-1,-1])[i];return tgValOpts(f,sgn,tgRef(prev[0].m*180/q))}}],
    explain:`On retire les tours complets : la mesure principale de ${A} est ${tgPiT(r,q)}, et ${f}(${A}) = ${f}(${tgPiT(r,q)}). Le point est ${TG_QN[tgQd(D)]}, l’angle de référence est ${tgDT(tgRef(D))} : ${f}(${A}) = ${val}.`});};

/* =====================================================================
   Chapitre 4 · tg-eq : équations et inéquations trigonométriques
   ===================================================================== */
const tgArc=(f,s)=>Math.round((f==='cos'?Math.acos(tgVN(s)):Math.asin(tgVN(s)))*180/Math.PI);
const tgSol=(f,s,rule)=>{const a=tgArc(f,s),r=rule||f,L=r==='cos'?[-a,a]:[a,180-a];return[...new Set(L.map(tgNorm))].sort((x,y)=>x-y)};
const TG_CV=['1/2','√2/2','√3/2'];
const tgCPick=(z)=>{const b=pick(z?TG_CV.concat(['0']):TG_CV);return b!=='0'&&Math.random()<.5?MINUS+b:b};
const tgEqH=(f,s)=>mx(`${f} x = ${tgVH(s)}`);

const gTgEq1=()=>{const f=pick(['cos','sin']),s=pick(TG_CV.concat(['0','1'])),c=s!=='0'&&Math.random()<.5?tgNeg(s):s,a=tgArc(f,c),I=f==='cos'?'[0 ; π]':'[−π/2 ; π/2]';
  const sw=tgRef(a)===30?60:tgRef(a)===60?30:null;
  return tgX({instr:`Résous dans ${I} (valeur exacte).`,prompt:tgEqH(f,c)+' '+mx(`avec x ∈ ${I}`),labels:['x ='],t:[a*Math.PI/180],ans:[tgPiE(a,180)],
    explain:`Sur ${I}, la fonction ${f} prend chaque valeur de [−1 ; 1] une seule fois. Comme ${f}(${tgDT(a)}) = ${c}, l’unique solution est x = ${tgDT(a)}.`,
    hint:`Cherche dans le tableau des valeurs remarquables (et sur le cercle si la valeur est négative) l’angle de ${I} qui convient.`,
    diag:([v])=>a&&near(v,-a*Math.PI/180,1e-4)?'signe':sw&&near(Math.abs(v),sw*Math.PI/180,1e-4)?'tg-ref':null})};

const gTgEq2=()=>{const f=pick(['cos','sin']),c=tgCPick(true),S=tgSol(f,c),W=tgSol(f,c,f==='cos'?'sin':'cos'),P=x=>x*Math.PI/180;
  return tgX({instr:'Résous dans ]−π ; π] : donne les deux solutions, de la plus petite à la plus grande (valeurs exactes).',prompt:tgEqH(f,c),labels:['x₁ =','x₂ ='],t:S.map(P),ans:S.map(x=>tgPiE(x,180)),
    explain:`${f}(${tgDT(tgArc(f,c))}) = ${c}. ${f==='cos'?'Deux angles opposés ont le même cosinus : x = a ou x = −a.':'Deux angles supplémentaires ont le même sinus : x = a ou x = π − a (ramené dans ]−π ; π] si besoin).'} Dans ]−π ; π] : x₁ = ${tgDT(S[0])} et x₂ = ${tgDT(S[1])}.`,
    hint:'Trouve une solution avec le tableau, puis la seconde par symétrie sur le cercle.',
    diag:([u,v])=>near(u,P(S[1]),1e-4)&&near(v,P(S[0]),1e-4)?'tg-ordre':W.length===2&&[u,v].every(x=>W.some(w=>near(x,P(w),1e-4)))?'tg-regle':null})};

const gTgEqR=()=>{const f=pick(['cos','sin']),c=tgCPick(false),a=tgArc(f,c),B=f==='cos'?-a:180-a,W=f==='cos'?180-a:-a;
  const F=(x,y,p='2kπ')=>mx(`x = ${tgDT(x)} + ${p}`)+(y===undefined?'':' ou '+mx(`x = ${tgDT(y)} + ${p}`))+', k ∈ ℤ';
  return mcq('Quelles sont les solutions dans ℝ ?',tgEqH(f,c),[{h:F(a,B),ok:true},{h:F(a,W),tag:'tg-regle'},{h:F(a),tag:'tg-sol2'},{h:F(a,undefined,'kπ'),tag:'tg-periode'}],
    `${f}(${tgDT(a)}) = ${c}. ${f==='cos'?'cos x = cos a ⟺ x = a + 2kπ ou x = −a + 2kπ':'sin x = sin a ⟺ x = a + 2kπ ou x = π − a + 2kπ'} (k ∈ ℤ). D’où x = ${tgDT(a)} + 2kπ ou x = ${tgDT(B)} + 2kπ.`,
    'Deux familles de solutions, chacune répétée tous les 2π.')};

/* inéquations sur [−π ; π] : ensembles d’intervalles en degrés */
const tgIneqSet=(f,op,c)=>{const v=tgVN(c);if(f==='cos'){const a=tgArc('cos',c);return op==='≥'?[[-a,a]]:[[-180,-a],[a,180]]}
  const b=tgArc('sin',c),p1=b>=0?b:-180-b,p2=b>=0?180-b:b;const inner=[[p1,p2]],outer=[[-180,p1],[p2,180]];
  return (op==='≥')===(b>=0)?inner:outer};
const tgIH=(L,open)=>tgM(L.map(([a,b])=>`${open&&a!==-180?']':'['}${tgD(a)} ; ${tgD(b)}${open&&b!==180?'[':']'}`).join(' ∪ '));
const tgSwap=s=>{const n=s[0]===MINUS,b=n?s.slice(1):s,w=b==='1/2'?'√3/2':b==='√3/2'?'1/2':null;return w?(n?MINUS+w:w):null};
const gTgIneq=()=>{const f=pick(['cos','sin']),op=pick(['≤','≥']),c=tgCPick(false),fl=op==='≤'?'≥':'≤',o=f==='cos'?'sin':'cos',sw=tgSwap(c);
  const opts=[{h:tgIH(tgIneqSet(f,op,c)),ok:true},{h:tgIH(tgIneqSet(f,fl,c)),tag:'ineq-flip'},{h:tgIH(tgIneqSet(o,op,c)),tag:'tg-regle'}];
  if(sw)opts.push({h:tgIH(tgIneqSet(f,op,sw)),tag:'tg-ref'});else opts.push({h:tgIH(tgIneqSet(f,op,c),true),tag:'tg-arc'});
  const pts=tgSol(f,c);
  return mcq('Résous l’inéquation dans [−π ; π].',mx(`${f} x ${op} ${tgVH(c)}`),opts,
    `On résout d’abord ${f} x = ${c} dans [−π ; π] : x = ${tgDT(pts[0])} ou x = ${tgDT(pts[1])}. Puis on lit sur le cercle la partie où ${f==='cos'?`l’abscisse est ${op==='≤'?'inférieure':'supérieure'} ou égale à ${c} (${op==='≤'?'à gauche':'à droite'} de la droite verticale x = ${c})`:`l’ordonnée est ${op==='≤'?'inférieure':'supérieure'} ou égale à ${c} (${op==='≤'?'sous':'au-dessus de'} la droite horizontale y = ${c})`}. Inégalité large : les bornes sont incluses.`,
    'Résous d’abord l’équation, puis colorie la bonne partie du cercle.')};

const gTgEqC1=()=>{const f=pick(['cos','sin']),base=pick(TG_CV),neg=Math.random()<.5,c=neg?MINUS+base:base,bb={'1/2':'1','√2/2':'√2','√3/2':'√3'}[base];
  const eq=mx(`2 ${f} x ${neg?'+':'−'} ${bb} = 0`),aT=tgArc(f,c),St=tgSol(f,c);
  const angOpts=v=>{const a=tgArc(f,v),L=[[a,true]],add=(x,w,t)=>{if(!L.some(y=>y[0]===x))L.push([x,false,w,t])};
    const sw=tgSwap(v);if(sw)add(tgArc(f,sw),`${f}(${tgDT(tgArc(f,sw))}) = ${sw}, pas ${v}.`,'tg-ref');
    add(tgArc(f,v[0]===MINUS?v.slice(1):v),`${f}(${tgDT(tgArc(f,v[0]===MINUS?v.slice(1):v))}) est positif : le signe ne va pas.`,'tg-quadrant');
    add(f==='cos'?180-a:-a,`${f}(${tgDT(f==='cos'?180-a:-a)}) = ${tgNeg(v)} : c’est l’opposé.`,'tg-quadrant');
    add(tgArc(f==='cos'?'sin':'cos',v[0]===MINUS?v.slice(1):v),'Cette valeur correspond à l’autre fonction trigonométrique.','tg-ref');
    return L.slice(0,3).map(([x,ok,why,tag])=>({h:tgM(`${tgVH(v)} = ${f}(${tgD(x)})`),ok,a:x,why,tag}))};
  return chain({instr:'Résous dans ]−π ; π], en construisant ton raisonnement.',prompt:eq,
    steps:[
      {q:`On isole ${f} x :`,o:[{h:tgEqH(f,c),ok:true,v:c},{h:tgEqH(f,tgNeg(c)),v:tgNeg(c),why:`En passant de l’autre côté, ${bb} change de signe.`,tag:'signe'},
        {h:mx(`${f} x = ${neg?MINUS:''}2${bb==='1'?'':bb}`),v:'imp',why:'Pour isoler, on divise par 2, on ne multiplie pas.',tag:'mult-div'}]},
      {q:'On reconnaît une valeur remarquable :',o:prev=>{const v=prev[0].v;if(v==='imp')return[{h:`Aucun angle : un ${f==='cos'?'cosinus':'sinus'} reste entre −1 et 1`,ok:true,a:null},
          {h:tgM(`${f}(${tgD(aT)})`)+' convient',a:aT,why:'Ce n’est pas la valeur obtenue à l’étape précédente.'},{h:tgM(`${f}(0)`)+' convient',a:0,why:`${f}(0) = ${f==='cos'?1:0}.`}];return angOpts(v)}},
      {q:'Les solutions dans ]−π ; π] sont…',o:prev=>{const a=prev[1].a;if(a===null)return[{h:mx('S = ∅'),ok:true},{h:tgSet(St),why:'Ce n’est pas cohérent avec l’étape précédente.'},{h:tgSet([aT]),why:'Ce n’est pas cohérent avec l’étape précédente.'}];
        const g=(L)=>[...new Set(L.map(tgNorm))].sort((x,y)=>x-y),ok=f==='cos'?g([a,-a]):g([a,180-a]),wr=f==='cos'?g([a,180-a]):g([a,-a]);
        return[{h:mx('S = ')+tgSet(ok),ok:true},{h:mx('S = ')+tgSet(wr),why:f==='cos'?'Deux angles ont le même cosinus quand ils sont opposés : a et −a.':'Deux angles ont le même sinus quand ils sont supplémentaires : a et π − a.',tag:'tg-regle'},
          {h:mx('S = ')+tgSet([a]),why:'Il manque la deuxième solution : sur un tour, la droite coupe le cercle en deux points.',tag:'tg-sol2'}]}}],
    explain:`2 ${f} x ${neg?'+':'−'} ${bb} = 0 ⟺ ${f} x = ${c} = ${f}(${tgDT(aT)}). ${f==='cos'?'Règle du cosinus : x = a ou x = −a.':'Règle du sinus : x = a ou x = π − a.'} Dans ]−π ; π] : S = {${St.map(tgDT).join(' ; ')}}.`});};

const gTgEqC2=()=>{const f=pick(['cos','sin']),i=R(0,2),v=['1/4','1/2','3/4'][i],r=TG_CV[i],o=f==='cos'?'sin':'cos';
  const S4=[...tgSol(f,r),...tgSol(f,MINUS+r)].sort((x,y)=>x-y),Sp=tgSol(f,r),Sm=tgSol(f,MINUS+r),So=[...tgSol(o,r),...tgSol(o,MINUS+r)].sort((x,y)=>x-y);
  return chain({instr:'Résous dans ]−π ; π], en construisant ton raisonnement.',prompt:mx(`${f}²x = `)+tgM(fr(...v.split('/'))),
    steps:[
      {q:`${f}²x = ${v} équivaut à…`,o:[{h:mx(`${f} x = `)+tgM(tgVH(r))+' ou '+mx(`${f} x = `)+tgM(tgVH(MINUS+r)),ok:true,c:'pm'},
        {h:mx(`${f} x = `)+tgM(tgVH(r)),c:'p',why:`Un nombre dont le carré vaut ${v} peut être positif ou négatif (comme X² = 4 donne X = 2 ou X = −2).`,tag:'tg-sol2'},
        {h:mx(`${f} x = `)+tgM(fr(...v.split('/')))+' ou '+mx(`${f} x = −`)+tgM(fr(...v.split('/'))),c:'v',why:`Il faut prendre la racine carrée : √(${v}) = ${r}.`,tag:'calc'}]},
      {q:'Combien de points du cercle trigonométrique conviennent ?',o:prev=>{const c=prev[0].c;return[{h:'4 points',ok:c!=='p',n:4,why:'Une seule équation : la droite coupe le cercle en deux points.'},
        {h:'2 points',ok:c==='p',n:2,why:'Chacune des deux équations donne deux points : 4 en tout.',tag:'tg-sol2'},{h:'1 point',n:1,why:'Une droite qui coupe le cercle (valeur strictement entre −1 et 1) le coupe en deux points.',tag:'tg-sol2'}]}},
      {q:'Dans ]−π ; π], S = …',o:prev=>{const c=prev[0].c;const L=[[S4,c!=='p'],[Sp,c==='p','Il manque les solutions de '+f+' x = −'+r+'.','tg-sol2'],[Sm,false,'Il manque les solutions de '+f+' x = '+r+'.','tg-sol2'],[So,false,`Ce sont les solutions pour ${o}, pas pour ${f}.`,'tg-ref']];
        const seen=new Set;return L.filter(([s])=>{const k=s.join();return!seen.has(k)&&seen.add(k)}).map(([s,ok,why,tag])=>ok?{h:tgSet(s),ok:true}:{h:tgSet(s),why:why||'Ce n’est pas cohérent avec les étapes précédentes.',tag})}}],
    explain:`${f}²x = ${v} ⟺ ${f} x = ${r} ou ${f} x = −${r}. Chacune donne deux points du cercle : S = {${S4.map(tgDT).join(' ; ')}}.`});};

const gTgEqC3=()=>{const f=pick(['cos','sin']),op=pick(['≤','≥']),c=pick(TG_CV),pts=tgSol(f,c),wr=tgSol(f,c,f==='cos'?'sin':'cos'),a=tgArc(f,c);
  const lo=op==='≤',sideTxt=f==='sin'?['sous la droite horizontale y = '+c,'au-dessus de la droite horizontale y = '+c]:['à gauche de la droite verticale x = '+c,'à droite de la droite verticale x = '+c];
  const setOf=(p,side)=>side==='pts'?null:side==='lo'?[[-180,p[0]],[p[1],180]]:[[p[0],p[1]]];
  /* pour sin : « sous la droite » = arc extérieur ; pour cos : « à gauche » = arc extérieur */
  const tru=setOf(pts,lo?'lo':'hi');
  return chain({instr:'Résous dans [−π ; π], en construisant ton raisonnement.',prompt:mx(`${f} x ${op} ${tgVH(c)}`),
    steps:[
      {q:`On résout d’abord ${f} x = ${c} dans [−π ; π] :`,o:[{h:mx('x = ')+tgM(tgD(pts[0]))+' ou '+mx('x = ')+tgM(tgD(pts[1])),ok:true,p:pts},
        {h:mx('x = ')+tgM(tgD(wr[0]))+' ou '+mx('x = ')+tgM(tgD(wr[1])),p:wr,why:f==='cos'?'Pour le cosinus, les deux solutions sont opposées : a et −a.':'Pour le sinus, les deux solutions sont supplémentaires : a et π − a.',tag:'tg-regle'},
        {h:mx('x = ')+tgM(tgD(a))+' seulement',p:[a],why:'Il y a deux points d’intersection entre la droite et le cercle.',tag:'tg-sol2'}]},
      {q:'Les x qui conviennent correspondent à la partie du cercle…',o:[{h:sideTxt[0],ok:lo,s:'lo',why:`On veut ${f==='sin'?'une ordonnée':'une abscisse'} ${lo?'inférieure':'supérieure'} ou égale à ${c}.`,tag:'tg-arc'},
        {h:sideTxt[1],ok:!lo,s:'hi',why:`On veut ${f==='sin'?'une ordonnée':'une abscisse'} ${lo?'inférieure':'supérieure'} ou égale à ${c}.`,tag:'tg-arc'},
        {h:'située uniquement aux deux points d’intersection',s:'pts',why:'Ce sont les solutions de l’équation ; l’inéquation demande toute une partie du cercle.',tag:'tg-arc'}]},
      {q:'Donc S = …',o:prev=>{const p=prev[0].p,s=prev[1].s,L=[];const add=(set,ok,why,tag,open)=>{const h=Array.isArray(set)?tgIH(set,open):set;if(!L.some(x=>x.h===h))L.push(ok?{h,ok:true}:{h,why,tag})};
        if(p.length<2)add(tgIH(tru),true);else if(s==='pts')add(tgSet(p),true);else add(setOf(p,s),true);
        add(tru,false,'Ce n’est pas cohérent avec tes étapes précédentes.','raisonnement');
        add(setOf(pts,lo?'hi':'lo'),false,'C’est l’arc opposé : il correspond à l’inégalité dans l’autre sens.','ineq-flip');
        add(tru,false,`L’inégalité est large (${op}) : les bornes sont incluses, avec des crochets fermés.`,'tg-arc',true);
        return L.slice(0,4)}}],
    explain:`${f} x = ${c} dans [−π ; π] donne x = ${tgDT(pts[0])} ou x = ${tgDT(pts[1])}. On garde la partie du cercle ${sideTxt[lo?0:1]}, bornes comprises : S = ${tru.map(([u,v])=>`[${tgDT(u)} ; ${tgDT(v)}]`).join(' ∪ ')}.`});};

const gTgEqC4=()=>{const c=tgCPick(false),a=tgArc('cos',c)/7.5,h=a/2,P=k=>tgPi(k,24); // unités : π/24
  const fam=(B,per)=>mx('X = ')+tgM(P(B[0]))+` + ${per} ou `+mx('X = ')+tgM(P(B[1]))+` + ${per}`;
  const famx=(B,per)=>mx('x = ')+tgM(P(B[0]))+` + ${per} ou `+mx('x = ')+tgM(P(B[1]))+` + ${per}`;
  const perT={48:'2kπ',24:'kπ',12:'kπ/2',96:'4kπ'};
  const inI=(B,p)=>{const S=new Set;B.forEach(b=>{for(let k=-6;k<=6;k++){const x=b+k*p;if(x>=0&&x<=24)S.add(x)}});return[...S].sort((x,y)=>x-y)};
  const setH=L=>L.length?tgM('{'+L.map(P).join(' ; ')+'}'):mx('∅');
  return chain({instr:'Résous dans [0 ; π], en construisant ton raisonnement.',prompt:mx(`cos(2x) = ${tgVH(c)}`),
    steps:[
      {q:`On pose X = 2x. L’équation cos X = ${c} donne, pour k ∈ ℤ :`,o:[{h:fam([a,-a],'2kπ'),ok:true,B:[a,-a],p:48},
        {h:fam([a,-a],'kπ'),B:[a,-a],p:24,why:'Le cosinus est 2π-périodique : les solutions reviennent tous les 2π, pas tous les π.',tag:'tg-periode'},
        {h:fam([a,24-a],'2kπ'),B:[a,24-a],p:48,why:'Règle du cosinus : X = a ou X = −a (et non π − a, qui est la règle du sinus).',tag:'tg-regle'}]},
      {q:'On divise par 2 :',o:prev=>{const {B,p}=prev[0];return[{h:famx(B.map(x=>x/2),perT[p/2]),ok:true,B:B.map(x=>x/2),p:p/2},
        {h:famx(B.map(x=>x/2),perT[p]),B:B.map(x=>x/2),p,why:'Tout le membre de droite est divisé par 2, y compris la période : 2kπ devient kπ.',tag:'tg-2kpi'},
        {h:famx(B,perT[p/2]),B,p:p/2,why:'Tout le membre de droite est divisé par 2, y compris les angles.',tag:'calc'}]}},
      {q:'Dans [0 ; π], S = …',o:prev=>{const {B,p}=prev[1],co=inI(B,p),tr=inI([h,-h],24),L=[];const add=(s,ok,why,tag)=>{const k=s.join();if(!L.some(x=>x.k===k))L.push(ok?{h:setH(s),ok:true,k}:{h:setH(s),k,why,tag})};
        add(co,true);add(tr,false,'Ce n’est pas cohérent avec la famille obtenue à l’étape précédente.','raisonnement');add(inI([h,-h],48),false,'Avec une période 2kπ, on perd des solutions : après division par 2, la période est kπ.','tg-2kpi');
        add(inI([a,-a],24),false,'Les angles n’ont pas été divisés par 2.','calc');add([co[0]],false,'Il manque une solution : essaie plusieurs valeurs de k.','tg-sol2');return L.slice(0,4)}}],
    explain:`cos X = ${c} = cos(${tgPiT(a,24)}) donne X = ±${tgPiT(a,24)} + 2kπ. Avec X = 2x : x = ±${tgPiT(h,24)} + kπ. Dans [0 ; π] : S = {${inI([h,-h],24).map(x=>tgPiT(x,24)).join(' ; ')}}.`});};

/* =====================================================================
   Chapitre 5 · tg-fct : fonctions cosinus et sinus
   ===================================================================== */
const gTgPer=()=>{const [n,d]=pick([[2,1],[3,1],[4,1],[5,1],[6,1],[1,2],[1,3]]),f=pick(['cos','sin']),b=pick([0,0,1,-2]),A=pick(['','2','3','−']);
  const arg=(d===1?`${n}x`:`x/${d}`)+(b?(b>0?' + ':' − ')+Math.abs(b):''),T=2*Math.PI*d/n;
  return tgX({instr:'Donne la période (valeur exacte).',prompt:mx(`f(x) = ${A}${f}(${arg})`),labels:['T ='],t:[T],ans:[tgPiE(2*d,n)],
    explain:`${f}(ax + b) a pour période 2π/a. Ici a = ${d===1?n:'1/'+d} : T = 2π ÷ ${d===1?n:'(1/'+d+')'} = ${tgPiT(2*d,n)}. En effet, ajouter T à x ajoute exactement 2π à l’argument. Le coefficient devant ${f} et la constante b ne changent pas la période.`,
    hint:'Cherche de combien il faut augmenter x pour que l’argument augmente de 2π.',
    diag:([v])=>near(v,2*Math.PI*n/d,1e-4)||near(v,Math.PI*d/n,1e-4)||near(v,2*Math.PI,1e-4)?'tg-periode':null})};

const gTgPar1=()=>{const f=pick(['cos','sin']);
  if(Math.random()<.5)return mcq('Pour tout réel x, que vaut cette expression ?',mx(`${f}(−x)`),['cos x','−cos x','sin x','−sin x'].map(h=>({h:mx(h),ok:h===(f==='cos'?'cos x':'−sin x'),tag:'parite'})),
    f==='cos'?'cos(−x) = cos x : les points associés à x et −x sont symétriques par rapport à l’axe des abscisses, ils ont la même abscisse. La fonction cosinus est paire.':'sin(−x) = −sin x : les points associés à x et −x sont symétriques par rapport à l’axe des abscisses, leurs ordonnées sont opposées. La fonction sinus est impaire.',
    'Place x et −x sur le cercle.');
  return mcq(`La fonction ${f==='cos'?'cosinus':'sinus'} est…`,'',[{h:`paire : sa courbe est symétrique par rapport à l’axe des ordonnées`,ok:f==='cos',tag:'parite'},{h:`impaire : sa courbe est symétrique par rapport à l’origine`,ok:f==='sin',tag:'parite'},
    {h:`paire : sa courbe est symétrique par rapport à l’origine`,tag:'parite'},{h:'ni paire ni impaire',tag:'parite'}],
    `${f==='cos'?'cos(−x) = cos x : cosinus est paire, sa courbe est symétrique par rapport à l’axe des ordonnées.':'sin(−x) = −sin x : sinus est impaire, sa courbe est symétrique par rapport à l’origine du repère.'}`,'Compare f(−x) et f(x).',true)};

const TG_VC=[['cos',0,90],['cos',90,180],['cos',0,180],['cos',180,360],['cos',-180,0],['cos',-90,90],['cos',90,270],['sin',0,90],['sin',90,180],['sin',0,180],['sin',-90,90],['sin',90,270],['sin',180,270],['sin',270,360],['sin',-180,0]];
const gTgVar=()=>{const [f,lo,hi]=pick(TG_VC),dv=x=>f==='cos'?-Math.sin(x):Math.cos(x);let pat='';
  for(let i=1;i<200;i++){const s=dv((lo+(hi-lo)*i/200)*Math.PI/180)>0?'+':'−';if(pat[pat.length-1]!==s)pat+=s}
  const O=['croissante','décroissante','croissante puis décroissante','décroissante puis croissante'],okI={'+':0,'−':1,'+−':2,'−+':3}[pat],I=`[${tgDT(lo)} ; ${tgDT(hi)}]`;
  return mcq(`Sur l’intervalle ${I}, la fonction ${f==='cos'?'cosinus':'sinus'} est…`,tgM(`[${tgD(lo)} ; ${tgD(hi)}]`),O.map((h,i)=>({h,ok:i===okI})),
    `${f}′(x) = ${f==='cos'?'−sin x':'cos x'}. Sur ${I}, ${f==='cos'?'−sin x':'cos x'} est ${['positive','négative','positive puis négative','négative puis positive'][okI]} : la fonction est ${O[okI]}. Sur le cercle : quand x parcourt ${I}, ${f==='cos'?'l’abscisse':'l’ordonnée'} du point ${['augmente','diminue','augmente puis diminue','diminue puis augmente'][okI]}.`,
    'Regarde le signe de la dérivée, ou suis le point sur le cercle.',true)};

const gTgDerE=()=>{const A=pick([1,2,3,-1,-2,5]),a=pick([2,3,4,5]),b=pick([0,1,-2,3]),g=pick(['cos','sin']),k=pick([0,0,1,-3,2]);
  const argE=`${a}x${b?sg(b):''}`,argH=`${a}x${b?(b>0?' + ':' − ')+Math.abs(b):''}`,co=A===1?'':A===-1?MINUS:num(A);
  const tgt=(g==='cos'?`${-A*a}*sin(${argE})`:`${A*a}*cos(${argE})`)+(k?sg(k):'');
  const okH=(g==='cos'?`${num(-A*a)} sin(${argH})`:`${num(A*a)} cos(${argH})`)+(k?(k>0?' + ':' − ')+Math.abs(k):'');
  return exprQ('Dérive la fonction f.',mx(`f(x) = ${co}${g}(${argH})${k?(k>0?' + ':' − ')+(Math.abs(k)===1?'':Math.abs(k))+'x':''}`),'f ′(x) =',tgt,
    `(${g}(ax + b))′ = ${g==='cos'?'−a sin(ax + b)':'a cos(ax + b)'} avec a = ${a} ; on multiplie par ${num(A)}${k?` ; la dérivée de ${Math.abs(k)===1?(k<0?'−':''):num(k)}x est ${num(k)}`:''} : f ′(x) = ${okH}.`,
    `${g==='cos'?'cos′ = −sin':'sin′ = cos'}, et n’oublie pas de multiplier par a, la dérivée de ax + b.`,false)};

const TG_PA=[['sin x − sin(2x)',1,'f(−x) = −sin x + sin(2x) = −f(x)'],['cos(2x) − 1/2',0,'f(−x) = cos(−2x) − 1/2 = cos(2x) − 1/2 = f(x)'],['x sin x',0,'f(−x) = (−x)(−sin x) = x sin x = f(x)'],
  ['x cos x',1,'f(−x) = (−x) cos x = −f(x)'],['sin x + cos x',2,'f(−x) = −sin x + cos x : ce n’est ni f(x) ni −f(x) (essaie x = π/4)'],['x + cos x',2,'f(−x) = −x + cos x : ni f(x) ni −f(x) (essaie x = π)'],
  ['x + sin(3x)',1,'f(−x) = −x − sin(3x) = −f(x)'],['x² + cos x',0,'f(−x) = x² + cos x = f(x)'],['sin x cos x',1,'f(−x) = (−sin x)(cos x) = −f(x)'],['1 + sin x',2,'f(−x) = 1 − sin x : ni f(x) ni −f(x) (essaie x = π/2)'],
  ['cos(3x) + x²',0,'f(−x) = cos(3x) + x² = f(x)'],['x³ − sin x',1,'f(−x) = −x³ + sin x = −f(x)']];
const gTgPar=()=>{const [e,t,w]=pick(TG_PA);
  return mcq('Cette fonction, définie sur ℝ, est-elle paire ou impaire ?',mx(`f(x) = ${e}`),['Paire','Impaire','Ni paire ni impaire'].map((h,i)=>({h,ok:i===t,tag:'parite'})),
    `${w}. ${['f est paire : courbe symétrique par rapport à l’axe des ordonnées.','f est impaire : courbe symétrique par rapport à l’origine.','f n’est ni paire ni impaire.'][t]}`,
    'Calcule f(−x) avec cos(−u) = cos u, sin(−u) = −sin u et (−x)² = x².',true)};

const gTgImg=()=>{let a,x0;do{a=pick([2,3]);x0=pick([15,30,45,60,90,120])}while(!cosEx(a*x0)||a*x0%15);
  const f=pick(['cos','sin']),[cs,cv]=pick([['',0],['− 1/2',-.5],['+ 1',1],['− 1',-1],['+ 1/2',.5],['+ 2',2]]),s=tgEx(f,a*x0),t=tgVN(s)+cv;
  return tgX({instr:`Calcule f(${tgDT(x0)}) (valeur exacte).`,prompt:mx(`f(x) = ${f}(${a}x) ${cs.replace('−',MINUS)}`.trim()),labels:[`f(${tgDT(x0)}) =`],t:[t],ans:[tgVE(s)+(cv?`+(${cv})`:'')],
    explain:`f(${tgDT(x0)}) = ${f}(${a} × ${tgDT(x0)})${cs?' '+cs:''} = ${f}(${tgDT(a*x0)})${cs?' '+cs:''} = ${s}${cs?' '+cs:''}${cv?` ≈ ${dec(t,3)}`:''}.`,
    hint:'Multiplie d’abord l’angle par le coefficient, puis utilise les valeurs remarquables.',diag:([v])=>near(v,tgVN(tgEx(f,x0))+cv,1e-4)?'calc':null})};

/* preuve de parité : termes [coef, type, a] ; type ∈ sin, cos, x, c, xsin */
const TG_PF=[[[1,'sin',1],[-1,'sin',2]],[[1,'cos',2],[-.5,'c']],[[1,'x'],[2,'sin',3]],[[1,'xsin',2]],[[1,'cos',2],[1,'x']],[[1,'sin',1],[1,'cos',2]],[[3,'cos',1],[1,'c']]];
const tgTerm=(k,t,a,first)=>{const sgn=k<0?(first?MINUS:' − '):(first?'':' + '),v=Math.abs(k),arg=a===1?'x':`${a}x`,fu=t==='sin'||t==='xsin'?'sin':'cos';
  if(t==='c')return sgn+(v===.5?'1/2':num(v));const co=v===1?'':num(v)+' ';return sgn+co+(t==='x'?'x':t==='xsin'?`x sin(${arg})`:`${fu}(${arg})`)};
const tgExpr=T=>T.map(([k,t,a],i)=>tgTerm(k,t,a,i===0)).join('');
const tgApply=(T,sR,cR)=>T.map(([k,t,a])=>[k*({sin:sR,cos:cR,x:-1,c:1,xsin:-sR}[t]),t,a]);
const tgPkind=(T,U)=>T.every((x,i)=>x[0]===U[i][0])?0:T.every((x,i)=>x[0]===-U[i][0])?1:2;
const gTgR1f=()=>{const T=pick(TG_PF),fx=tgExpr(T),tru=tgPkind(T,tgApply(T,-1,1));
  const R2=[['sin(−u) = −sin u et cos(−u) = cos u',-1,1,true,''],['sin(−u) = sin u et cos(−u) = −cos u',1,-1,false,'C’est l’inverse : sinus est impaire, cosinus est paire.'],['sin(−u) = −sin u et cos(−u) = −cos u',-1,-1,false,'Le cosinus est pair : cos(−u) = cos u (même abscisse pour u et −u).']];
  const CN=['f(−x) = f(x)','f(−x) = −f(x)','f(−x) n’est égal ni à f(x) ni à −f(x)'];
  return chain({instr:'Étudie la parité de f, en construisant ton raisonnement.',prompt:mx(`f(x) = ${fx}`)+stx(', définie sur ℝ.'),
    steps:[
      {q:'Quelles propriétés vas-tu utiliser ?',o:R2.map(([h,s,c,ok,why])=>({h:mx(h),ok,s,c,why,tag:'parite'}))},
      {q:'On remplace x par −x :',o:prev=>{const {s,c}=prev[0],me=tgApply(T,s,c),L=[];const add=(U,ok,why)=>{const h=mx('f(−x) = '+tgExpr(U));if(!L.some(x=>x.h===h))L.push(ok?{h,ok:true,U}:{h,U,why,tag:'parite'})};
        add(me,true);R2.forEach(([,s2,c2])=>add(tgApply(T,s2,c2),false,'Ce n’est pas ce que donnent les propriétés choisies à l’étape précédente.'));
        add(T.map(([k,t,a],i)=>[i?k:-k,t,a]),false,'Chaque terme doit être transformé, pas seulement le premier.');
        add(T.map(([k,t,a])=>[-k,t,a]),false,'On a changé tous les signes sans appliquer la parité de chaque terme : c’est supposer le résultat.');return L.slice(0,4)}},
      {q:'On compare f(−x) avec f(x) :',o:prev=>{const k=tgPkind(T,prev[1].U);return CN.map((h,i)=>({h:mx(h),ok:i===k,c:i,why:`D’après le calcul précédent, ${CN[k]}.`,tag:'parite'}))}},
      {q:'Conclusion :',o:prev=>{const k=prev[2].c;return[{h:'f est paire : sa courbe est symétrique par rapport à l’axe des ordonnées',ok:k===0,why:'Une fonction paire vérifie f(−x) = f(x).',tag:'parite'},
        {h:'f est impaire : sa courbe est symétrique par rapport à l’origine du repère',ok:k===1,why:'Une fonction impaire vérifie f(−x) = −f(x).',tag:'parite'},
        {h:'f est paire : sa courbe est symétrique par rapport à l’origine du repère',why:'Paire, c’est une symétrie par rapport à l’axe des ordonnées ; la symétrie par rapport à l’origine, c’est impaire.',tag:'parite'},
        {h:'f n’est ni paire ni impaire',ok:k===2,why:'f(−x) s’exprime simplement en fonction de f(x) : relis la comparaison.',tag:'parite'}]}}],
    explain:`Avec sin(−u) = −sin u, cos(−u) = cos u et (−x) = −x : f(−x) = ${tgExpr(tgApply(T,-1,1))}. Donc ${CN[tru]} : ${['f est paire (courbe symétrique par rapport à l’axe des ordonnées)','f est impaire (courbe symétrique par rapport à l’origine)','f n’est ni paire ni impaire'][tru]}.`});};

const tgHT=n=>n%2?(n<0?'−':'')+Math.abs(n)+'/2':num(n/2);
const gTgR2f=()=>{const a=pick([2,3,4]),c2=pick([-1,1,2,-2,0,4]),cH=c2?(c2>0?' + ':' − ')+(Math.abs(c2)%2?fr(Math.abs(c2),2):num(Math.abs(c2)/2)):'',V0=tgFr(2+c2,2),V1=tgFr(c2-2,2),Va=tgFr(c2,2);
  const cT=c2?(c2>0?' + ':' − ')+(Math.abs(c2)%2?Math.abs(c2)+'/2':Math.abs(c2)/2):'',fH=mx(`f(x) = cos(${a}x)`)+tgM(cH),per=k=>tgM(tgPi(k[0],k[1]));
  return chain({instr:'Étudie f, en construisant ton raisonnement.',prompt:fH+stx(`, définie sur ℝ. On veut ses variations sur [0 ; π/${a}].`),
    steps:[
      {q:'f est périodique de période…',o:[{h:per([2,a]),ok:true},{h:per([2*a,1]),why:`Il faut diviser 2π par ${a}, pas multiplier : f(x + 2π/${a}) = cos(${a}x + 2π)${cT} = f(x).`,tag:'tg-periode'},
        {h:per([1,a]),why:`f(x + π/${a}) = cos(${a}x + π) = −cos(${a}x) : ce n’est pas une période.`,tag:'tg-periode'}]},
      {q:'f ′(x) = …',o:[{h:mx(`−${a} sin(${a}x)`),ok:true,s:-1},{h:mx(`−sin(${a}x)`),s:-1,why:`(cos(ax))′ = −a sin(ax) : il manque le facteur ${a}.`,tag:'derivee'},
        {h:mx(`${a} sin(${a}x)`),s:1,why:'cos′ = −sin : attention au signe.',tag:'signe'},{h:mx(`−${a} sin(${a}x)`)+tgM(cH||' + 0'),s:0,why:'La dérivée d’une constante est nulle.',tag:'derivee'}]},
      {q:`Pour x ∈ [0 ; π/${a}], on a ${a}x ∈ [0 ; π], donc sin(${a}x) ≥ 0 et…`,o:prev=>{const s=prev[1].s;return[{h:mx('f ′(x) ≤ 0'),ok:s!==1,c:-1,why:'Avec ta dérivée, f ′(x) est du signe opposé à sin(…).',tag:'signe'},
        {h:mx('f ′(x) ≥ 0'),ok:s===1,c:1,why:`f ′(x) = −${a} sin(${a}x) est du signe de −sin(${a}x).`,tag:'signe'},{h:mx('f ′(x) change de signe'),c:0,why:`sin(${a}x) garde un signe constant quand ${a}x parcourt [0 ; π].`,tag:'signe'}]}},
      {q:`Donc, sur [0 ; π/${a}]…`,o:prev=>{const c=prev[2].c;return[
        {h:`f est décroissante, de f(0) = ${V0} à f(π/${a}) = ${V1}`,ok:c!==1,why:'Ce n’est pas cohérent avec le signe de f ′ choisi à l’étape précédente.',tag:'raisonnement'},
        {h:`f est croissante sur [0 ; π/${a}]`,ok:c===1,why:'Une dérivée négative ou nulle donne une fonction décroissante.',tag:'raisonnement'},
        {h:`f est décroissante, de f(0) = ${Va} à f(π/${a}) = ${V1}`,why:`f(0) = cos 0${cT} = 1${cT}, car cos 0 = 1.`,tag:'calc'}]}}],
    explain:`f est périodique de période 2π/${a} = ${tgPiT(2,a)}. f ′(x) = −${a} sin(${a}x). Pour x ∈ [0 ; π/${a}], ${a}x ∈ [0 ; π] où sin ≥ 0, donc f ′(x) ≤ 0 : f décroît de f(0) = cos 0${cT} = ${tgHT(2+c2)} à f(π/${a}) = cos π${cT} = ${tgHT(c2-2)}.`});};

/* =====================================================================
   Chapitre 6 · tg-plus : pour aller plus loin (HORS DOCUMENTS) — addition et duplication
   ===================================================================== */
const TG_ADF={'cos(a + b)':'cos a cos b − sin a sin b','cos(a − b)':'cos a cos b + sin a sin b','sin(a + b)':'sin a cos b + cos a sin b','sin(a − b)':'sin a cos b − cos a sin b'};
const gTgAddF=()=>{const k=pick(Object.keys(TG_ADF));
  return mcq('Quelle est la formule correcte (pour tous réels a et b) ?',mx(k+' = …'),[...Object.values(TG_ADF).map(v=>({h:mx(v),ok:v===TG_ADF[k],tag:'tg-add'})),{h:mx(k.slice(0,3)+' a '+k[6]+' '+k.slice(0,3)+' b'),tag:'tg-add'}],
    `${k} = ${TG_ADF[k]}. Moyen mnémotechnique : le cosinus « garde les fonctions ensemble et change le signe », le sinus « mélange les fonctions et garde le signe ». Test en b = 0 : on doit retrouver ${k.slice(0,3)} a.`,
    'Teste chaque proposition avec a = π/2 et b = π/2, ou avec b = 0.')};
const TG_DUP=[['sin 2a','2 sin a cos a'],['cos 2a','cos²a − sin²a'],['cos 2a','2cos²a − 1'],['cos 2a','1 − 2sin²a'],['cos²a','(1 + cos 2a)/2'],['sin²a','(1 − cos 2a)/2']];
const gTgDupF=()=>{const [k,v]=pick(TG_DUP),pool=['2 sin a cos a','cos²a − sin²a','(1 + cos 2a)/2','(1 − cos 2a)/2','2 sin a','2 cos a','sin²a − cos²a'];
  const wrong=shuffle(pool.filter(p=>!TG_DUP.some(([kk,vv])=>kk===k&&vv===p))).slice(0,3);
  return mcq('Quelle expression est égale à celle-ci, pour tout réel a ?',mx(k),[{h:mx(v),ok:true},...wrong.map(w=>({h:mx(w),tag:'tg-add'}))],
    `${k} = ${v}. Ces formules viennent des formules d’addition avec b = a (et de cos²a + sin²a = 1). Vérification en a = π/4 ou a = 0.`,'Teste en a = 0 puis en a = π/4.')};

/* valeurs exactes avec radicaux : objet {radicande: coefficient} sur un dénominateur */
const TG_RV={0:{1:2},30:{3:1},45:{2:1},60:{1:1},90:{}};       // cos θ × 2
const tgRc=d=>TG_RV[d],tgRs=d=>TG_RV[90-d];
const tgRMul=(A,B)=>{const O={};for(const i in A)for(const j in B){let r=i*j,c=A[i]*B[j];for(const s of[4,9]){if(r%s===0){r/=s;c*=Math.sqrt(s)}}O[r]=(O[r]||0)+c}return O};
const tgRAdd=(A,B,s=1)=>{const O={...A};for(const k in B)O[k]=(O[k]||0)+s*B[k];return O};
const tgRStr=(A,den)=>{let ks=Object.keys(A).filter(k=>A[k]).map(Number);if(!ks.length)return{h:'0',e:'0',v:0};let g=den;ks.forEach(k=>g=TG_g(g,A[k]));const d=den/g;
  ks.sort((x,y)=>(A[y]>0)-(A[x]>0)||y-x);const v=ks.reduce((s,k)=>s+A[k]*Math.sqrt(k),0)/den;
  const T=ks.map((k,i)=>{const c=A[k]/g,a=Math.abs(c),sgn=c<0?(i?' − ':MINUS):(i?' + ':''),body=(a===1&&k!==1?'':a)+(k===1?'':'√'+k);return{sgn,body,c,k}});
  const num_=T.map(t=>t.sgn+t.body).join(''),e=T.map((t,i)=>(t.c<0?'-':i?'+':'')+(Math.abs(t.c)===1&&t.k!==1?'':Math.abs(t.c)+(t.k===1?'':'*'))+(t.k===1?'':`sqrt(${t.k})`)).join('');
  if(d===1)return{h:num_,e,v};if(T.length===1)return{h:(T[0].c<0?MINUS:'')+fr(T[0].body,d),e:`(${e})/${d}`,v};return{h:fr(num_,d),e:`(${e})/${d}`,v}};
const tgRForm=(f,x,y,op,kind)=>{ // kind : ok, swap, naive ; résultat sur dénominateur 4 (ou 2 pour naive)
  if(kind==='naive')return tgRStr(tgRAdd(f==='cos'?tgRc(x):tgRs(x),f==='cos'?tgRc(y):tgRs(y),op),2);
  const s=kind==='ok'?op:-op;
  return f==='cos'?tgRStr(tgRAdd(tgRMul(tgRc(x),tgRc(y)),tgRMul(tgRs(x),tgRs(y)),-s),4):tgRStr(tgRAdd(tgRMul(tgRs(x),tgRc(y)),tgRMul(tgRc(x),tgRs(y)),s),4)};
const TG_AT=[[15,45,30,-1],[15,60,45,-1],[75,45,30,1],[105,60,45,1]];
const gTgAddV=()=>{const [t,x,y,op]=pick(TG_AT),f=pick(['cos','sin']),R0=tgRForm(f,x,y,op,'ok'),nv=tgRForm(f,x,y,op,'naive').v;
  return tgX({instr:`Calcule la valeur exacte en écrivant ${tgDT(t)} = ${tgDT(x)} ${op>0?'+':'−'} ${tgDT(y)}.`,prompt:tgM(`${f}(${tgD(t)})`),labels:[`${f}(${tgDT(t)}) =`],t:[Math[f](t*Math.PI/180)],ans:[R0.e],
    explain:`${f}(${tgDT(x)} ${op>0?'+':'−'} ${tgDT(y)}) = ${f==='cos'?`cos(${tgDT(x)}) cos(${tgDT(y)}) ${op>0?'−':'+'} sin(${tgDT(x)}) sin(${tgDT(y)})`:`sin(${tgDT(x)}) cos(${tgDT(y)}) ${op>0?'+':'−'} cos(${tgDT(x)}) sin(${tgDT(y)})`} = ${R0.h.replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/,'($1)/$2')} ≈ ${dec(R0.v,4)}. (Complément hors documents.)`,
    hint:f==='cos'?'cos(a ± b) = cos a cos b ∓ sin a sin b.':'sin(a ± b) = sin a cos b ± cos a sin b.',diag:([v])=>near(v,nv,1e-4)?'tg-add':null})};

const gTgAddR1=()=>{const [t,x,y,op]=pick(TG_AT),f=pick(['cos','sin']);
  const W=[];[30,45,60,90].forEach(p=>[30,45,60].forEach(q=>[1,-1].forEach(o=>{const s=p+o*q;if(s>0&&s!==t&&p!==q&&!(p===x&&q===y))W.push([p,q,o])})));
  const dec2=shuffle(W).slice(0,2),D=(p,q,o)=>tgM(`${tgD(t)} = ${tgD(p)} ${o>0?'+':'−'} ${tgD(q)}`);
  const FN=(o,k)=>{const sgn=k==='ok'?o:-o;return f==='cos'?(k==='naive'?`cos a ${o>0?'+':'−'} cos b`:`cos a cos b ${sgn>0?'−':'+'} sin a sin b`):(k==='naive'?`sin a ${o>0?'+':'−'} sin b`:`sin a cos b ${sgn>0?'+':'−'} cos a sin b`)};
  return chain({instr:'Calcule la valeur exacte, en construisant ton raisonnement (complément hors documents).',prompt:tgM(`${f}(${tgD(t)})`),
    steps:[
      {q:`On décompose ${tgDT(t)} en angles remarquables :`,o:[{h:D(x,y,op),ok:true,p:[x,y,op]},...dec2.map(([p,q,o])=>({h:D(p,q,o),p:[p,q,o],why:`${tgDT(p)} ${o>0?'+':'−'} ${tgDT(q)} = ${tgDT(p+o*q)}, pas ${tgDT(t)}.`,tag:'calc'}))]},
      {q:'On applique la formule (avec a et b les deux angles) :',o:prev=>{const o=prev[0].p[2];return['ok','swap','naive'].map(k=>({h:mx(`${f}(a ${o>0?'+':'−'} b) = ${FN(o,k)}`),ok:k==='ok',k,
        why:k==='naive'?`${f} n’est pas additive : ${f}(a + b) ≠ ${f} a + ${f} b (essaie a = b = π/2).`:'Le signe au milieu est faux : vérifie avec b = a = π/4 ou avec b = 0.',tag:'tg-add'}))}},
      {q:`Donc ${f}(${tgDT(t)}) = …`,o:prev=>{const [p,q,o]=prev[0].p,k0=prev[1].k,L=[];['ok','swap','naive'].forEach(k=>{const r=tgRForm(f,p,q,o,k);if(!L.some(z=>z.h===tgM(r.h)))L.push(k===k0?{h:tgM(r.h),ok:true}:{h:tgM(r.h),why:k==='naive'?'C’est le résultat de la formule fausse « somme des '+f+' ».':'Ce n’est pas ce que donne la formule choisie : vérifie les signes et les produits.',tag:'tg-add'})});
        if(!L.some(z=>z.ok))L[0].ok=true;return L}}],
    explain:`${tgDT(t)} = ${tgDT(x)} ${op>0?'+':'−'} ${tgDT(y)}. ${f}(a ${op>0?'+':'−'} b) = ${FN(op,'ok')}, d’où ${f}(${tgDT(t)}) = ${tgRForm(f,x,y,op,'ok').h.replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/,'($1)/$2')} ≈ ${dec(Math[f](t*Math.PI/180),4)}.`});};

const gTgAddR2=()=>{const [p,q,r]=pick(TG_TRP),[a,b]=Math.random()<.5?[p,q]:[q,p],S=new Fr(a,r);
  return chain({instr:'Calcule sin 2x et cos 2x, en construisant ton raisonnement (complément hors documents).',prompt:mx(`sin x = ${fr(a,r)}  et  x ∈ ]0 ; π/2[`),
    steps:[
      {q:'D’abord, cos x = …',o:[{h:tgM(tgFr(b,r)),ok:true,c:new Fr(b,r)},{h:tgM(tgFr(-b,r)),c:new Fr(-b,r),why:'Sur ]0 ; π/2[, cos x est positif.',tag:'tg-quadrant'},
        {h:tgM(tgFr(r-a,r)),c:new Fr(r-a,r),why:'cos x ≠ 1 − sin x : c’est cos²x + sin²x qui vaut 1.',tag:'tg-pyth'}]},
      {q:'Puis sin 2x = …',o:prev=>{const C=prev[0].c;return[{h:mx('2 sin x cos x = ')+tgM(frH(S.mul(C).mul(new Fr(2)))),ok:true,C},
        {h:mx('2 sin x = ')+tgM(frH(S.mul(new Fr(2)))),C,why:'sin 2x ≠ 2 sin x : par exemple sin(2 × π/2) = 0 alors que 2 sin(π/2) = 2.',tag:'tg-add'},
        {h:mx('sin x cos x = ')+tgM(frH(S.mul(C))),C,why:'Il manque le facteur 2 : sin 2x = 2 sin x cos x.',tag:'tg-add'}]}},
      {q:'Enfin cos 2x = …',o:prev=>{const C=prev[1].C,c2=C.mul(C),s2=S.mul(S);return[{h:mx('cos²x − sin²x = ')+tgM(frH(c2.sub(s2))),ok:true},
        {h:mx('sin²x − cos²x = ')+tgM(frH(s2.sub(c2))),why:'Ordre inversé : cos 2x = cos²x − sin²x (en x = 0, on doit trouver 1).',tag:'signe'},
        {h:mx('2 cos x = ')+tgM(frH(C.mul(new Fr(2)))),why:'cos 2x ≠ 2 cos x : en x = 0, cos 0 = 1 mais 2 cos 0 = 2.',tag:'tg-add'}]}}],
    explain:`cos x = √(1 − sin²x) = ${b}/${r} (positif sur ]0 ; π/2[). sin 2x = 2 × ${a}/${r} × ${b}/${r} = ${2*a*b}/${r*r}. cos 2x = (${b}/${r})² − (${a}/${r})² = ${b*b-a*a}/${r*r}. Contrôle : (${2*a*b})² + (${b*b-a*a})² = ${r*r}² ✓.`});};

const gTgLong=()=>{const q=gTrLong();q.instr=q.instr.replace(', arrondi au centième.','.');return q};
const gTgAngle=()=>{const q=gTrAngle();q.instr=q.instr.replace(', au dixième près.','.');return q};
/* ===================================================================== */
ANA_UNITS.push(
  {id:'tg-tri',tr:'tg',src:'Trigonométrie dans le triangle rectangle',name:'Triangle rectangle',sub:'CAH SOH TOA : longueurs et angles',glyph:'cos',tone:'c',
   skills:[SKA('tg.tri.voc','Hypoténuse, opposé, adjacent',gTgVoc,1),SKA('tg.tri.choix','Choisir le bon rapport',gTrChoix,1),SKA('tg.tri.rap','Calculer cos, sin ou tan',gTrRap,1),
     SKA('tg.tri.imp','Rapport possible ou impossible',gTgImp,1),SKA('tg.tri.long','Calculer une longueur',gTgLong,2),SKA('tg.tri.angle','Calculer un angle',gTgAngle,2),
     SKA('tg.tri.r1','Raisonner : une longueur',gTgR1,2),SKA('tg.tri.r2','Raisonner : un angle',gTgR2,3),SKA('tg.tri.r3','Raisonner : deux triangles',gTgR3,3)]},
  {id:'tg-cer',tr:'tg',src:'Cercle trigonométrique et radians',name:'Cercle et radians',sub:'Enroulement, radians, mesure principale',glyph:'π',tone:'x',w:'wCircle',
   skills:[SKA('tg.cer.d2r','Degrés vers radians',gTgD2R,1),SKA('tg.cer.r2d','Radians vers degrés',gTrRadDeg,1),SKA('tg.cer.same','Même point du cercle',gTgSame,1),
     SKA('tg.cer.lire','Lire un point sur le cercle',gTgLire,2),SKA('tg.cer.princ','Mesure principale',gTgPrinc,2),SKA('tg.cer.r3','Raisonner : convertir en radians',gTgR3c,2),
     SKA('tg.cer.r1','Raisonner : placer un point',gTgR1c,2),SKA('tg.cer.r2','Raisonner : la mesure principale',gTgR2c,3)]},
  {id:'tg-val',tr:'tg',src:'Cosinus et sinus d’un nombre réel',name:'Cosinus et sinus d’un réel',sub:'Valeurs remarquables, signes, angles associés',glyph:'√3/2',tone:'sq',w:'wCircle',
   skills:[SKA('tg.val.base','Valeurs remarquables',gB2Trig,1),SKA('tg.val.v1','Valeur exacte (premier quart)',gTgV1,1),SKA('tg.val.signe','Signe selon le quadrant',gTgSigne,1),
     SKA('tg.val.v2','Valeur exacte sur tout le cercle',gTgV2,2),SKA('tg.val.qcm','Cos et sin sur tout le cercle',gTrValeur,2),SKA('tg.val.assoc','Angles associés',gTgAssoc,2),
     SKA('tg.val.pyth','cos² + sin² = 1',gTgPyth,2),SKA('tg.val.r1','Raisonner : cos ou sin d’un angle',gTgR1v,2),SKA('tg.val.r2','Raisonner : de sin x à cos x',gTgR2v,3),
     SKA('tg.val.r3','Raisonner : grand angle',gTgR3v,3)]},
  {id:'tg-eq',tr:'tg',src:'Équations et inéquations trigonométriques',name:'Équations trigonométriques',sub:'cos x = a, sin x = a, inéquations sur un tour',glyph:'=',tone:'c',w:'wCircle',
   skills:[SKA('tg.eq.nb','Nombre de solutions sur un tour',gTrNb,1),SKA('tg.eq.eq1','Une solution sur un demi-tour',gTgEq1,1),SKA('tg.eq.eq2','Les deux solutions dans ]−π ; π]',gTgEq2,2),
     SKA('tg.eq.qcm','Résoudre sur ]−π ; π]',gTrEq,2),SKA('tg.eq.reel','Solutions dans ℝ',gTgEqR,2),SKA('tg.eq.ineq','Inéquation sur [−π ; π]',gTgIneq,3),
     SKA('tg.eq.r1','Raisonner : a cos x + b = 0',gTgEqC1,2),SKA('tg.eq.r2','Raisonner : cos²x = c',gTgEqC2,3),SKA('tg.eq.r3','Raisonner : une inéquation',gTgEqC3,3),
     SKA('tg.eq.r4','Raisonner : cos(2x) = c',gTgEqC4,3)]},
  {id:'tg-fct',tr:'tg',src:'Fonctions cosinus et sinus',name:'Fonctions cosinus et sinus',sub:'Période, parité, dérivées, variations',glyph:'∿',tone:'x',w:'wCircle',
   w2:[['Signe de la dérivée et variations','wVar','Fais varier le point et observe : là où la dérivée est négative, la courbe descend.']],
   skills:[SKA('tg.fct.par1','Parité de cos et sin',gTgPar1,1),SKA('tg.fct.per','Période',gTgPer,1),SKA('tg.fct.var','Variations de cos et sin',gTgVar,1),
     SKA('tg.fct.der','Dériver A cos(ax + b)',gTrDer,2),SKA('tg.fct.derx','Dériver (saisie)',gTgDerE,2),SKA('tg.fct.par','Parité d’une fonction',gTgPar,2),
     SKA('tg.fct.img','Image exacte',gTgImg,2),SKA('tg.fct.r1','Raisonner : prouver une parité',gTgR1f,2),SKA('tg.fct.r2','Raisonner : étudier cos(ax) + c',gTgR2f,3)]},
  {id:'tg-plus',tr:'tg',src:'Pour aller plus loin : formules d’addition et de duplication',name:'Pour aller plus loin',sub:'Hors documents : addition et duplication',glyph:'+',tone:'sq',
   skills:[SKA('tg.plus.add','Formules d’addition',gTgAddF,1),SKA('tg.plus.dupf','Formules de duplication',gTgDupF,1),SKA('tg.plus.dup','Calculer sin 2x et cos 2x',gTrDup,2),
     SKA('tg.plus.val','Valeur exacte par addition',gTgAddV,2),SKA('tg.plus.r1','Raisonner : cos(5π/12)',gTgAddR1,3),SKA('tg.plus.r2','Raisonner : de sin x à sin 2x',gTgAddR2,3)]});
