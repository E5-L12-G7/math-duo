/* ===================== STA001 · Corrélation et régression linéaire ===================== */
Object.assign(ANA_ERR,{
  's1rg-cov':{label:'Calcul de la covariance',tip:'cov(x ; y) = (1/n) Σ xᵢyᵢ − x̄ȳ : n’oublie pas de retrancher le produit des moyennes.'},
  's1rg-ab':{label:'Coefficients de la droite',tip:'a = cov(x ; y)/V(x) (variance de x, la variable explicative), puis b = ȳ − a x̄.'},
  's1rg-r':{label:'Coefficient de corrélation',tip:'r = cov(x ; y)/(σₓ σᵧ) : on divise par le produit des écarts-types, pas des variances.'},
  's1rg-caus':{label:'Corrélation ≠ causalité',tip:'Deux grandeurs peuvent varier ensemble à cause d’un troisième facteur : une corrélation ne prouve pas un lien de cause à effet.'},
  's1rg-ln':{label:'Retour après changement de variable',tip:'Si z = ln y = αx + β, alors y = e^β × e^(αx) : on revient avec l’exponentielle.'},
  's1rg-res':{label:'Résidu',tip:'Résidu = valeur observée − valeur prédite par la droite : eᵢ = yᵢ − ŷᵢ.'}});
const S1RG_st=(xs,ys)=>{const n=xs.length,xm=meanA(xs),ym=meanA(ys),vx=xs.reduce((s,x)=>s+x*x,0)/n-xm*xm,vy=ys.reduce((s,y)=>s+y*y,0)/n-ym*ym,cv=xs.reduce((s,x,i)=>s+x*ys[i],0)/n-xm*ym;
  return{n,xm,ym,vx,vy,cv,a:cv/vx,b:ym-cv/vx*xm,r:cv/Math.sqrt(vx*vy)}};
/** Petite série (x entiers distincts, y entiers) à lien linéaire bruité */
const S1RG_data=(n,mx0=10)=>{for(let it=0;it<200;it++){const xs=shuffle(Array.from({length:mx0},(_,i)=>i+1)).slice(0,n).sort((a,b)=>a-b),sl=pick([-1,-.8,-.6,.5,.7,1,1.2]),c=sl>0?R(0,3):R(7,10);
    const ys=xs.map(x=>Math.round(c+sl*x+R(-15,15)/10));if(ys.every(y=>y>=0&&y<=10)){const S=S1RG_st(xs,ys);if(S.vy>0&&Math.abs(S.r)>.3)return{xs,ys,S}}}return{xs:[1,2,3,4,5],ys:[2,3,5,4,6],S:S1RG_st([1,2,3,4,5],[2,3,5,4,6])}};
/** Nuage de points (avec, en option, droite et point moyen) */
const S1RG_sc=(xs,ys,o={})=>{const x0=o.x?o.x[0]:0,x1=o.x?o.x[1]:Math.max(10,...xs)+.5,y0=o.y?o.y[0]:0,y1=o.y?o.y[1]:Math.max(10,...ys)+.5,g=gp({W:300,H:o.H||210,x0,x1,y0,y1,pd:8});
  g.axes(o.px||1,o.py||1,o.lx||2,o.ly||2);if(o.ab)g.fn(x=>o.ab[0]*x+o.ab[1],'var(--t-sq)',2.2);
  xs.forEach((x,i)=>g.dot(x,ys[i],'var(--t-c)',4.5));if(o.G)g.dot(o.G[0],o.G[1],'var(--ink)',6).text(o.G[0],o.G[1],'G','var(--ink)','start',8,-8);
  (o.pts||[]).forEach(([x,y,l])=>{g.dot(x,y,'var(--t-x)',6);if(l)g.text(x,y,l,'var(--t-x)','start',8,-6)});
  return`<div class="qfig">${g.done(o.titre||'Nuage de points')}</div>`};
const S1RG_tab=(xs,ys,lx='xᵢ',ly='yᵢ')=>dtab([[lx,...xs.map(num)],[ly,...ys.map(num)]]);
/* 1. Placer le point moyen */
const gS1RgG=()=>{let d;for(let it=0;it<100;it++){d=S1RG_data(pick([4,6]));if(Math.abs(2*d.S.xm-Math.round(2*d.S.xm))<1e-9&&Math.abs(2*d.S.ym-Math.round(2*d.S.ym))<1e-9)break}
  if(Math.abs(2*d.S.xm-Math.round(2*d.S.xm))>1e-9||Math.abs(2*d.S.ym-Math.round(2*d.S.ym))>1e-9)d={xs:[1,3,5,7],ys:[2,4,5,7],S:S1RG_st([1,3,5,7],[2,4,5,7])};
  const{xs,ys,S}=d,xm=Math.round(2*S.xm)/2,ym=Math.round(2*S.ym)/2;
  return pointQ({instr:'Place le point moyen G du nuage.',prompt:S1RG_tab(xs,ys),nom:'G',x:[0,11],y:[0,11],snap:.5,tol:.2,cible:[xm,ym],fond:{pts:xs.map((x,i)=>[x,ys[i]]),pas:1,etiq:2},
    explain:`x̄ = (${xs.join(' + ')})/${xs.length} = ${num(xm)} et ȳ = (${ys.join(' + ')})/${ys.length} = ${num(ym)} : G(${num(xm)} ; ${num(ym)}). La droite des moindres carrés passe toujours par G.`,
    hint:'G a pour coordonnées la moyenne des x et la moyenne des y.',diag:([a,b])=>near(a,ym,.3)&&near(b,xm,.3)?'stat-2var':null})};
/* 2. Reconnaître r sur un nuage */
const gS1RgRint=()=>{const V=[-.95,-.6,0,.6,.95],tg=pick(V),n=30;let xs,ys,r;for(let it=0;it<60;it++){const E=Array.from({length:n},()=>S1KH_g()),F=Array.from({length:n},()=>S1KH_g());xs=E.map(e=>5+1.5*e);ys=E.map((e,i)=>5+1.5*(tg*e+Math.sqrt(1-tg*tg)*F[i]));r=S1RG_st(xs,ys).r;if(Math.abs(r-tg)<.1)break}
  return mcq('Quelle est la valeur la plus plausible du coefficient de corrélation r ?',S1RG_sc(xs,ys,{x:[0,10],y:[0,10]}),V.map(v=>({h:`r ≈ ${num(v)}`,ok:v===tg,tag:'s1rg-r'})),
    `Ici r ≈ ${dec(r,2)}. ${tg===0?'Aucune tendance : r proche de 0.':`Le nuage ${tg>0?'monte':'descend'} : r est ${tg>0?'positif':'négatif'} ; il est ${Math.abs(tg)>.9?'très proche de ± 1 car les points sont presque alignés':'modéré car les points sont dispersés autour de la tendance'}.`}`,'Signe : le nuage monte ou descend ? Valeur : les points sont-ils serrés autour d’une droite ?',true)};
/* 3. Corrélation et causalité */
const S1RG_CAUS=[['Dans les villes, le nombre de pharmacies et le nombre de naissances sont fortement corrélés.','La taille de la population fait augmenter les deux'],
  ['Les ventes de glaces et le nombre de noyades sont fortement corrélés au cours de l’année.','La chaleur fait augmenter les deux'],
  ['Le nombre de pompiers envoyés sur un incendie et le montant des dégâts sont corrélés.','La gravité de l’incendie fait augmenter les deux'],
  ['Dans les pays, la consommation de chocolat par habitant et le nombre de prix Nobel sont corrélés.','La richesse du pays influe sur les deux'],
  ['Chez les enfants, la pointure et la qualité de l’écriture sont corrélées.','L’âge fait augmenter les deux']];
const gS1RgCaus=()=>{const[t,ok]=pick(S1RG_CAUS);
  return mcq('Que conclure de cette corrélation ?',stx(t+' Le coefficient r est proche de 0,8.'),[{h:ok,ok:true},{h:'La première grandeur cause la seconde',tag:'s1rg-caus'},{h:'La seconde grandeur cause la première',tag:'s1rg-caus'},{h:'La corrélation est forcément due au hasard',tag:'s1rg-caus'}],
    'Une corrélation forte dit que les deux grandeurs varient ensemble, pas que l’une agit sur l’autre. Ici un facteur caché (une troisième variable) explique les deux : c’est le piège classique « corrélation n’est pas causalité ».','Cherche une troisième grandeur qui pourrait faire varier les deux.')};
/* 4. Prévision et résidu */
const gS1RgPred=()=>{const a=pick([-.8,-.6,-.5,.4,.5,.6,.8,1.2]),b=a>0?pick([.5,1,1.5,2]):pick([8,8.5,9]),xi=R(1,9),yh=a*xi+b,e=pick([-1.5,-1,-.5,.5,1,1.5]),yi=+(yh+e).toFixed(2);
  return nq({instr:'Calcule la valeur prédite ŷ et le résidu e.',prompt:stx(`La droite des moindres carrés est ŷ = ${num(a)}x ${b<0?MINUS:'+'} ${num(Math.abs(b))}. Le point M a pour coordonnées (${xi} ; ${num(yi)}).`)+
      FIG.plot({x:[0,11],y:[0,11],pas:1,etiq:2,f:[`${a}*x+${b}`],pts:[[xi,yi,'M']],segs:[[xi,yh,xi,yi]],titre:'Droite et résidu'}),
    labels:['ŷ =','e ='],t:[yh,e],dp:2,explain:`ŷ = ${num(a)} × ${xi} + ${num(b)} = ${dec(yh,2)}. Résidu : e = y − ŷ = ${num(yi)} − ${dec(yh,2)} = ${dec(e,2)} (${e>0?'le point est au-dessus de la droite':'le point est en dessous de la droite'}).`,
    hint:'ŷ se lit sur la droite ; le résidu est l’écart vertical observé − prédit.',diag:([p,r])=>near(r,-e,.006)?'s1rg-res':null})};
/* 5. Covariance */
const gS1RgCov=()=>{const{xs,ys,S}=S1RG_data(5);
  return nq({instr:'Calcule la covariance de x et y.',prompt:S1RG_tab(xs,ys)+mx('cov(x ; y) = (1/n) Σ xᵢyᵢ − x̄ ȳ')+S1RG_sc(xs,ys),labels:['cov ='],t:[S.cv],dp:2,
    explain:`Σ xᵢyᵢ = ${xs.map((x,i)=>`${x}×${ys[i]}`).join(' + ')} = ${xs.reduce((s,x,i)=>s+x*ys[i],0)}. x̄ = ${dec(S.xm,2)}, ȳ = ${dec(S.ym,2)}. cov = ${xs.reduce((s,x,i)=>s+x*ys[i],0)}/5 − ${dec(S.xm,2)} × ${dec(S.ym,2)} ≈ ${dec(S.cv,2)}. ${S.cv>0?'Positive : le nuage monte.':'Négative : le nuage descend.'}`,
    hint:'Moyenne des produits xᵢyᵢ, moins le produit des moyennes.',diag:([v])=>near(v,xs.reduce((s,x,i)=>s+x*ys[i],0)/5,.006)?'s1rg-cov':near(v,S.cv*5/4,.006)?'s1es-biais':null})};
/* 6. Coefficient de corrélation */
const gS1RgR=()=>{const{xs,ys,S}=S1RG_data(6),cv=+S.cv.toFixed(2),vx=+S.vx.toFixed(2),vy=+S.vy.toFixed(2),r=cv/Math.sqrt(vx*vy);
  return nq({instr:'Calcule le coefficient de corrélation linéaire r.',prompt:stx(`Sur ce nuage, on a calculé : V(x) = ${num(vx)}, V(y) = ${num(vy)}, cov(x ; y) = ${num(cv)}.`)+S1RG_sc(xs,ys)+mx('r = cov(x ; y)/(σₓ σᵧ)'),labels:['r ='],t:[r],dp:3,tol:.002,
    explain:`σₓ = √${num(vx)} ≈ ${dec(Math.sqrt(vx),4)}, σᵧ = √${num(vy)} ≈ ${dec(Math.sqrt(vy),4)}. r = ${num(cv)}/(${dec(Math.sqrt(vx),4)} × ${dec(Math.sqrt(vy),4)}) ≈ ${dec(r,3)}. r² ≈ ${dec(r*r,3)} : environ ${Math.round(r*r*100)} % de la variance de y est « expliquée » par la droite.`,
    hint:'Divise la covariance par le produit des écarts-types (racines des variances).',diag:([v])=>near(v,cv/(vx*vy),.002)?'s1rg-r':near(v,cv/vx,.002)?'s1rg-ab':null})};
/* 7. Droite des moindres carrés */
const gS1RgAb=()=>{const{xs,ys,S}=S1RG_data(6),xm=+S.xm.toFixed(2),ym=+S.ym.toFixed(2),vx=+S.vx.toFixed(2),cv=+S.cv.toFixed(2),a=cv/vx,b=ym-a*xm;
  return nq({instr:'Détermine la droite des moindres carrés de y en x : ŷ = ax + b.',prompt:stx(`On donne : x̄ = ${num(xm)}, ȳ = ${num(ym)}, V(x) = ${num(vx)}, cov(x ; y) = ${num(cv)}.`)+S1RG_sc(xs,ys,{G:[S.xm,S.ym]}),labels:['a =','b ='],t:[a,b],dp:2,tol:.011,
    explain:`a = cov(x ; y)/V(x) = ${num(cv)}/${num(vx)} ≈ ${dec(a,3)}. La droite passe par G(x̄ ; ȳ) : b = ȳ − a x̄ = ${num(ym)} − ${dec(a,3)} × ${num(xm)} ≈ ${dec(b,2)}.`,
    hint:'a = cov/V(x), puis b = ȳ − a x̄ (la droite passe par G).',diag:([u,v])=>near(v,ym+a*xm,.02)||near(v,xm-a*ym,.02)?'s1rg-ab':near(u,vx/cv,.011)?'s1rg-ab':null})};
/* 8. Ajustement exponentiel par changement de variable */
const gS1RgLn=()=>{const al=pick([.1,.15,.2,.25,.3]),be=pick([1,1.5,2,2.5]),x0=pick([8,10,12,15]),y0=Math.exp(al*x0+be);
  const xs=[0,2,4,6],ys=xs.map(x=>+(Math.exp(al*x+be)*(1+R(-4,4)/100)).toFixed(1));
  return nq({instr:`Prévois y pour x = ${x0}.`,prompt:stx('Le nuage (x ; y) a une allure exponentielle. On pose z = ln y ; la droite des moindres carrés de z en x est :')+`<p class="m">z = ${num(al)}x + ${num(be)}</p>`+S1RG_tab(xs,ys)+
      FIG.plot({x:[-.5,7],y:[0,Math.max(...ys)*1.15],pas:1,pasy:Math.max(1,Math.round(Math.max(...ys)/5)),etiq:1,etiqy:Math.max(1,Math.round(Math.max(...ys)/5)),pts:xs.map((x,i)=>[x,ys[i]]),f:[`exp(${al}x+${be})`],titre:'Ajustement exponentiel'}),
    labels:['y ≈'],t:[y0],dp:1,tol:Math.max(.06,y0*.003),explain:`z = ${num(al)} × ${x0} + ${num(be)} = ${dec(al*x0+be,2)}, donc y = e<sup>z</sup> = e<sup>${dec(al*x0+be,2)}</sup> ≈ ${dec(y0,1)}. Autrement dit y = e<sup>${num(be)}</sup> × e<sup>${num(al)}x</sup> ≈ ${dec(Math.exp(be),2)} × e<sup>${num(al)}x</sup>.`,
    hint:'Calcule d’abord z, puis reviens à y avec y = e^z.',diag:([v])=>near(v,al*x0+be,.06)||near(v,Math.log(al*x0+be),.06)?'s1rg-ln':null})};
/* 9. Raisonner : droite et prévision */
const gS1RgR1=()=>{const{xs,ys,S}=S1RG_data(6),xm=+S.xm.toFixed(2),ym=+S.ym.toFixed(2),vx=+S.vx.toFixed(2),vy=+S.vy.toFixed(2),cv=+S.cv.toFixed(2),x0=pick([11,12,0]);
  return chain({instr:`Trouve la droite des moindres carrés, puis prévois y pour x = ${x0}.`,prompt:stx(`x̄ = ${num(xm)}, ȳ = ${num(ym)}, V(x) = ${num(vx)}, V(y) = ${num(vy)}, cov(x ; y) = ${num(cv)}.`)+S1RG_sc(xs,ys,{x:[-.5,12.5],G:[S.xm,S.ym]}),
    steps:[
      {q:'Le coefficient directeur a vaut…',o:[
        {h:`a = cov/V(x) ≈ ${dec(cv/vx,3)}`,ok:true,a:cv/vx,why:''},
        {h:`a = cov/V(y) ≈ ${dec(cv/vy,3)}`,a:cv/vy,why:'Pour la droite de y en x, on divise par la variance de x, la variable explicative.',tag:'s1rg-ab'},
        {h:`a = cov/(σₓσᵧ) ≈ ${dec(cv/Math.sqrt(vx*vy),3)}`,a:cv/Math.sqrt(vx*vy),why:'C’est le coefficient de corrélation r, pas la pente.',tag:'s1rg-r'}]},
      {q:'L’ordonnée à l’origine b vaut…',o:prev=>{const a=prev[0].a;return[
        {h:`b = ȳ − a x̄ ≈ ${dec(ym-a*xm,3)}`,ok:true,b:ym-a*xm,why:''},
        {h:`b = ȳ + a x̄ ≈ ${dec(ym+a*xm,3)}`,b:ym+a*xm,why:'G est sur la droite : ȳ = a x̄ + b, donc b = ȳ − a x̄.',tag:'s1rg-ab'},
        {h:`b = x̄ − a ȳ ≈ ${dec(xm-a*ym,3)}`,b:xm-a*ym,why:'Les rôles de x et y sont inversés.',tag:'s1rg-ab'}]}},
      {q:`Prévision pour x = ${x0} :`,o:prev=>{const a=prev[0].a,b=prev[1].b;return[
        {h:`ŷ = a × ${x0} + b ≈ ${dec(a*x0+b,2)}`,ok:true,why:''},
        {h:`ŷ = b × ${x0} + a ≈ ${dec(b*x0+a,2)}`,why:'La pente multiplie x : ŷ = ax + b.',tag:'s1rg-ab'},
        {h:`ŷ = a × ${x0} ≈ ${dec(a*x0,2)}`,why:'Il manque l’ordonnée à l’origine b.',tag:'calc'}]}},
      {q:'Cette prévision est…',o:[
        {h:`${x0===0?'une extrapolation (x = 0 est hors du domaine observé)':`une extrapolation (x = ${x0} dépasse les valeurs observées)`} : à prendre avec prudence`,ok:true,why:''},
        {h:'une interpolation : elle est donc sûre',why:`x = ${x0} est en dehors de [${Math.min(...xs)} ; ${Math.max(...xs)}] : rien ne garantit que la tendance continue.`},
        {h:`exacte, puisque r = ${dec(S.r,2)}`,why:'Même avec |r| proche de 1, une prévision reste une estimation, surtout hors du domaine observé.',tag:'s1rg-r'}]}],
    explain:`a = ${num(cv)}/${num(vx)} ≈ ${dec(cv/vx,3)} ; b = ${num(ym)} − a × ${num(xm)} ≈ ${dec(ym-cv/vx*xm,3)} ; ŷ(${x0}) ≈ ${dec(cv/vx*x0+ym-cv/vx*xm,2)}. C’est une extrapolation : prudence.`})};
/* 10. Raisonner : changement de variable logarithmique */
const gS1RgR2=()=>{const al=pick([.1,.2,.3,.4]),be=pick([.5,1,1.5,2]),x0=pick([5,6,8,10]),ctx=pick(['Le nombre d’abonnés d’un service (en milliers) selon le rang du mois','La population d’une culture de bactéries (en milliers) selon le temps (en heures)','Le chiffre d’affaires d’une start-up (en k€) selon l’année']);
  return chain({instr:`Ajuste le nuage et prévois y pour x = ${x0}.`,prompt:stx(`${ctx} a une allure exponentielle : on pose z = ln y. La régression de z en x donne z = ${num(al)}x + ${num(be)}.`)+FIG.plot({x:[0,x0+1],y:[0,Math.exp(al*(x0+1)+be)*1.05],pas:1,pasy:Math.max(1,Math.round(Math.exp(al*(x0+1)+be)/5)),etiq:2,etiqy:Math.max(1,Math.round(Math.exp(al*(x0+1)+be)/5)),f:[`exp(${al}x+${be})`],pts:[0,1,2,3].map(x=>[x,+(Math.exp(al*x+be)*(1+R(-5,5)/100)).toFixed(2)]),titre:'Allure exponentielle'}),
    steps:[
      {q:'Pourquoi passer par z = ln y ?',o:[
        {h:'Si y = k e^(αx), alors ln y = αx + ln k : le nuage (x ; z) devient rectiligne',ok:true,why:''},
        {h:'Pour rendre toutes les valeurs de y positives',why:'Les y sont déjà positifs ; le logarithme sert à rendre le lien linéaire.',tag:'s1rg-ln'},
        {h:'Parce que ln y est toujours plus petit que y',why:'Ce n’est pas la raison : on cherche une relation affine entre x et la nouvelle variable.',tag:'s1rg-ln'}]},
      {q:'On revient à y :',o:[
        {h:`y = e^${num(be)} × e^(${num(al)}x) ≈ ${dec(Math.exp(be),3)} e^(${num(al)}x)`,ok:true,f:'ok',why:''},
        {h:`y = ${num(be)} e^(${num(al)}x)`,f:'k',why:`La constante est e^β = e^${num(be)}, pas β.`,tag:'s1rg-ln'},
        {h:`y = ${num(al)}x + ${num(be)}`,f:'lin',why:'C’est l’équation de z = ln y, pas celle de y : il faut prendre l’exponentielle.',tag:'s1rg-ln'}]},
      {q:`Prévision pour x = ${x0} :`,o:prev=>{const f=prev[1].f,v=f==='ok'?Math.exp(al*x0+be):f==='k'?be*Math.exp(al*x0):al*x0+be;return[
        {h:`y ≈ ${dec(v,2)}`,ok:true,why:''},
        {h:`y ≈ ${dec(f==='lin'?Math.exp(al*x0+be):al*x0+be,2)}`,why:'Ce calcul ne découle pas de la formule choisie à l’étape précédente.',tag:'s1rg-ln'},
        {h:`y ≈ ${dec(Math.log(Math.max(al*x0+be,.01)),2)}`,why:'On ne reprend pas le logarithme : on revient à y avec l’exponentielle.',tag:'s1rg-ln'}]}},
      {q:'Interprétation du coefficient α :',o:[
        {h:`Chaque fois que x augmente de 1, y est multiplié par e^${num(al)} ≈ ${dec(Math.exp(al),3)}`,ok:true,why:''},
        {h:`Chaque fois que x augmente de 1, y augmente de ${num(al)}`,why:'C’est z = ln y qui augmente de α ; y, lui, est multiplié par e^α.',tag:'s1rg-ln'},
        {h:`y augmente de ${num(al*100)} % à chaque unité de x, exactement`,why:`L’évolution est de e^α − 1 ≈ ${dec((Math.exp(al)-1)*100,1)} %, pas exactement α.`,tag:'pourcent'}]}],
    explain:`ln y = ${num(al)}x + ${num(be)} ⟺ y = e^${num(be)} e^(${num(al)}x) ≈ ${dec(Math.exp(be),3)} e^(${num(al)}x). Pour x = ${x0} : y ≈ ${dec(Math.exp(al*x0+be),2)}. y est multiplié par e^${num(al)} ≈ ${dec(Math.exp(al),3)} à chaque unité.`})};
/* 11. Raisonner : corrélation, r² et causalité */
const gS1RgR3=()=>{const{xs,ys,S}=S1RG_data(6),vx=+S.vx.toFixed(2),vy=+S.vy.toFixed(2),cv=+S.cv.toFixed(2),r=cv/Math.sqrt(vx*vy),ctx=pick([['heures de révision','note à l’examen'],['température extérieure','consommation d’électricité'],['âge d’une voiture','prix de revente']]);
  return chain({instr:'Mesure et interprète la liaison, étape par étape.',prompt:stx(`x : ${ctx[0]} ; y : ${ctx[1]}. V(x) = ${num(vx)}, V(y) = ${num(vy)}, cov(x ; y) = ${num(cv)}.`)+S1RG_sc(xs,ys),
    steps:[
      {q:'Coefficient de corrélation :',o:[
        {h:`r = cov/√(V(x)V(y)) ≈ ${dec(r,3)}`,ok:true,r,why:''},
        {h:`r = cov/(V(x)V(y)) ≈ ${dec(cv/(vx*vy),3)}`,r:cv/(vx*vy),why:'On divise par le produit des écarts-types, donc par la racine du produit des variances.',tag:'s1rg-r'},
        {h:`r = cov/V(x) ≈ ${dec(cv/vx,3)}`,r:cv/vx,why:'C’est la pente a de la droite de régression, pas r.',tag:'s1rg-ab'}]},
      {q:'Part de variance de y expliquée par la droite :',o:prev=>{const rr=prev[0].r;return[
        {h:`r² ≈ ${dec(rr*rr,3)}, soit ${dec(rr*rr*100,1)} %`,ok:true,why:''},
        {h:`|r| ≈ ${dec(Math.abs(rr),3)}, soit ${dec(Math.abs(rr)*100,1)} %`,why:'La part de variance expliquée est r², pas r.',tag:'s1rg-r'},
        {h:`2r ≈ ${dec(2*rr,3)}`,why:'Ce n’est pas une proportion : la part expliquée est r².',tag:'s1rg-r'}]}},
      {q:'Le sens de la liaison :',o:[
        {h:r>0?'y a tendance à augmenter quand x augmente':'y a tendance à diminuer quand x augmente',ok:true,why:''},
        {h:r>0?'y a tendance à diminuer quand x augmente':'y a tendance à augmenter quand x augmente',why:'Le signe de r (et de la covariance) donne le sens de la liaison.',tag:'signe'},
        {h:'Le sens ne peut pas se déduire de r',why:'Le signe de r indique justement le sens.',tag:'s1rg-r'}]},
      {q:'Conclusion :',o:[
        {h:'Il existe une liaison linéaire ; une étude causale est nécessaire pour parler de cause',ok:true,why:''},
        {h:'x est la cause des variations de y, c’est démontré',why:'Une corrélation, même forte, ne prouve pas une causalité.',tag:'s1rg-caus'},
        {h:'r ≠ 1, donc il n’y a aucun lien entre x et y',why:'Une liaison peut être réelle sans que les points soient parfaitement alignés.',tag:'s1rg-r'}]}],
    explain:`r = ${num(cv)}/√(${num(vx)} × ${num(vy)}) ≈ ${dec(r,3)} ; r² ≈ ${dec(r*r,3)}. Liaison ${r>0?'positive':'négative'} ; elle ne prouve pas à elle seule une relation de cause à effet.`})};
ANA_UNITS.push({id:'s1-regression',tr:'s1',name:'Régression linéaire',sub:'Nuage, covariance, corrélation, moindres carrés',glyph:'r',tone:'c',
  skills:[SKA('s1.rg.g','Placer le point moyen',gS1RgG,1),SKA('s1.rg.rint','Lire r sur un nuage',gS1RgRint,1),SKA('s1.rg.caus','Corrélation et causalité',gS1RgCaus,1),
    SKA('s1.rg.pred','Prévision et résidu',gS1RgPred,1),SKA('s1.rg.cov','Covariance',gS1RgCov,2),SKA('s1.rg.r','Coefficient de corrélation',gS1RgR,2),
    SKA('s1.rg.ab','Droite des moindres carrés',gS1RgAb,2),SKA('s1.rg.r1','Raisonner : droite et prévision',gS1RgR1,2),SKA('s1.rg.ln','Ajustement exponentiel',gS1RgLn,3),
    SKA('s1.rg.r2','Raisonner : changement de variable',gS1RgR2,3),SKA('s1.rg.r3','Raisonner : r, r² et causalité',gS1RgR3,3)]});
