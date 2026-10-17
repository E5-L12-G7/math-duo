/* ===================== STA001 · Séries statistiques ===================== */
Object.assign(ANA_ERR,{
  's1-nature':{label:'Nature de la variable',tip:'Qualitative : des catégories (même codées par des nombres). Quantitative discrète : des valeurs isolées que l’on compte. Quantitative continue : des mesures qui peuvent prendre toute valeur d’un intervalle.'},
  's1-freq':{label:'Fréquence mal calculée',tip:'Fréquence = effectif de la valeur ÷ effectif total N. Multiplie par 100 seulement pour l’écrire en %.'},
  's1-cum':{label:'Fréquences cumulées',tip:'La fréquence cumulée croissante en x additionne les fréquences de toutes les valeurs inférieures ou égales à x.'},
  's1-dens':{label:'Hauteur d’histogramme',tip:'Avec des classes d’amplitudes différentes, la hauteur est la densité : effectif ÷ amplitude. C’est l’aire du rectangle qui représente l’effectif.'}});

/* ---------- Figures partagées par le parcours STA001 (SVG statiques) ---------- */
/** Diagramme en bâtons. xs : valeurs, ns : hauteurs. o.hide : indice du bâton masqué (« ? »), o.hl : indice surligné, o.top : texte au-dessus (fonction), o.yl : titre de l'axe */
const S1DE_bars=(xs,ns,o={})=>{const top=Math.max(...ns.map(Math.abs))*1.22||1,lo=Math.min(...xs),hi=Math.max(...xs),sp=(hi-lo)||1,m=Math.max(.6,sp*.1);
  const g=gp({W:300,H:180,x0:lo-m,x1:hi+m,y0:-top*.16,y1:top,pd:10}),bw=Math.min(.32,sp/xs.length*.3);
  g.seg(lo-m,0,hi+m,0,'var(--muted)',1.2);
  xs.forEach((x,i)=>{const h=i===o.hide;if(!h)g.rect(x-bw,0,x+bw,ns[i],i===o.hl?'var(--t-x)':'var(--t-sq)',i===o.hl?.85:.75);
    else g.rect(x-bw,0,x+bw,top*.55,'var(--muted)',.12,'var(--muted)');
    g.text(x,0,o.xf?o.xf(x):num(x),'var(--muted)','middle',0,13,10,false);
    g.text(x,h?top*.55:ns[i],h?'?':(o.top?o.top(ns[i],i):num(ns[i])),h?'var(--t-x)':'var(--ink)','middle',0,-4,h?13:10)});
  if(o.yl)g.text(lo-m,top,o.yl,'var(--muted)','start',4,4,9,false);
  return`<div class="qfig">${g.done(o.titre||'Diagramme en bâtons')}</div>`};
/** Histogramme. C : [[a,b,n],…]. o.dens : hauteur = n/(b−a) ; o.hide : classe masquée ; o.lab(c,i) : texte au-dessus ; o.line : abscisse d'un trait */
const S1DE_hist=(C,o={})=>{const H=c=>o.dens?c[2]/(c[1]-c[0]):c[2],top=Math.max(...C.map(H))*1.25||1,x0=C[0][0],x1=C[C.length-1][1],sp=x1-x0;
  const g=gp({W:300,H:180,x0:x0-sp*.05,x1:x1+sp*.05,y0:-top*.15,y1:top,pd:10});
  C.forEach((c,i)=>{const hid=i===o.hide;if(hid){g.rect(c[0],0,c[1],top*.45,'var(--muted)',.1,'var(--muted)');g.text((c[0]+c[1])/2,top*.45,'?','var(--t-x)','middle',0,-4,13);return}
    g.rect(c[0],0,c[1],H(c),i===o.hl?'var(--t-x)':'var(--t-sq)',i===o.hl?.45:.3,i===o.hl?'var(--t-x)':'var(--t-sq)');
    const t=o.lab?o.lab(c,i):num(c[2]);if(t!=='')g.text((c[0]+c[1])/2,H(c),t,'var(--ink)','middle',0,-4,10)});
  g.seg(x0-sp*.05,0,x1+sp*.05,0,'var(--muted)',1.2);
  [...new Set(C.flatMap(c=>[c[0],c[1]]))].forEach(v=>g.text(v,0,num(v),'var(--muted)','middle',0,13,9,false));
  if(o.line!=null)g.seg(o.line,0,o.line,top*.95,'var(--t-x)',2,'5 4');
  return`<div class="qfig">${g.done(o.titre||'Histogramme')}</div>`};
/** Diagramme circulaire. labs : modalités, ns : effectifs */
const S1DE_pie=(labs,ns,o={})=>{const N=sumA(ns),cols=['var(--t-sq)','var(--t-c)','var(--t-x)','var(--good)','var(--muted)','var(--bad)'];let a=-Math.PI/2,s='';
  const cx=90,cy=90,r=72;
  ns.forEach((n,i)=>{const b=a+2*Math.PI*n/N,large=b-a>Math.PI?1:0,p=t=>`${(cx+r*Math.cos(t)).toFixed(1)},${(cy+r*Math.sin(t)).toFixed(1)}`;
    s+=n===N?`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${cols[i%6]}" fill-opacity=".7"/>`:`<path d="M${cx},${cy}L${p(a)}A${r},${r} 0 ${large} 1 ${p(b)}Z" fill="${cols[i%6]}" fill-opacity="${i===o.hl?.95:.55}" stroke="var(--surface)" stroke-width="2"/>`;
    s+=`<rect x="190" y="${18+i*24}" width="14" height="14" rx="3" fill="${cols[i%6]}" fill-opacity=".7"/><text x="210" y="${30+i*24}" font-size="11" fill="var(--ink)">${labs[i]}${o.eff===false?'':` (${n})`}</text>`;a=b});
  return`<div class="qfig"><svg viewBox="0 0 300 ${Math.max(180,30+labs.length*24)}" role="img" aria-label="Diagramme circulaire">${s}</svg></div>`};
/** Polygone des fréquences cumulées (en %). B : bornes, F : fréquences cumulées en % (même longueur). o.upto : nombre de points tracés ; o.x : trait vertical ; o.lab : valeurs affichées */
const S1DE_poly=(B,F,o={})=>{const x0=B[0],x1=B[B.length-1],sp=x1-x0,k=o.upto??B.length;
  const g=gp({W:300,H:200,x0:x0-sp*.06,x1:x1+sp*.06,y0:-12,y1:108,pd:10});g.axes(o.pasx||sp/(B.length-1),20,o.pasx||sp/(B.length-1),20);
  for(let i=1;i<k;i++)g.seg(B[i-1],F[i-1],B[i],F[i],'var(--t-sq)',2.5);
  for(let i=0;i<k;i++){g.dot(B[i],F[i],'var(--t-sq)',4);if(o.lab!==false)g.text(B[i],F[i],num(F[i])+' %','var(--ink)','end',-4,-6,9)}
  if(o.x!=null)g.seg(o.x,0,o.x,104,'var(--t-x)',1.8,'5 4');
  if(o.h!=null)g.seg(x0-sp*.06,o.h,x1+sp*.06,o.h,'var(--t-x)',1.8,'5 4');
  return`<div class="qfig">${g.done(o.titre||'Polygone des fréquences cumulées croissantes')}</div>`};
const s1Pct=v=>dec(v,1)+' %';

/* 1. Nature d'une variable */
const S1DE_VARS=[['la couleur des yeux de chaque étudiant',0,'Les réponses sont des catégories (bleu, marron…), pas des nombres.'],
  ['le nombre d’enfants de chaque foyer',1,'On compte : 0, 1, 2, 3… des valeurs isolées.'],['la taille (en cm) de chaque salarié',2,'C’est une mesure : entre 170 et 171 cm, toutes les valeurs sont possibles.'],
  ['le temps d’attente de chaque client au guichet',2,'Une durée se mesure et peut prendre n’importe quelle valeur d’un intervalle.'],['le mode de transport utilisé pour venir travailler',0,'Voiture, bus, vélo… ce sont des catégories.'],
  ['le nombre de pièces de chaque logement',1,'On compte des pièces : 1, 2, 3… valeurs entières isolées.'],['le numéro du département de naissance',0,'Ce nombre est un code : faire la moyenne de 75 et de 13 n’a aucun sens. La variable est qualitative.'],
  ['le nombre d’appels reçus par heure par un standard',1,'On compte des appels : valeurs entières isolées.'],['la mention obtenue à l’examen',0,'Passable, assez bien, bien… des catégories (ordonnées, mais des catégories).'],
  ['la masse de chaque nouveau-né',2,'Une masse se mesure : toute valeur d’un intervalle est possible.'],['le nombre de buts marqués par match',1,'On compte des buts : valeurs entières.'],
  ['la consommation électrique annuelle de chaque foyer (en kWh)',2,'Une consommation se mesure sur une échelle continue.'],['le groupe sanguin de chaque donneur',0,'O, A, B, AB : des catégories.']];
const gS1DeType=()=>{const[v,k,why]=pick(S1DE_VARS),L=['Qualitative','Quantitative discrète','Quantitative continue'];
  return mcq('Quelle est la nature de cette variable statistique ?',stx(`On étudie ${v}.`),L.map((h,i)=>({h,ok:i===k,tag:'s1-nature'})),why,
    'Demande-toi : est-ce une catégorie, un nombre que l’on compte, ou une mesure ?',true)};
/* 2. Population, individu, variable */
const S1DE_POP=[['On interroge 400 clients d’une banque sur le nombre de comptes qu’ils détiennent.','les 400 clients interrogés','un client interrogé','le nombre de comptes détenus','400'],
  ['Un hôpital relève la durée de séjour des 250 patients sortis en mars.','les 250 patients sortis en mars','un patient sorti en mars','la durée du séjour','250'],
  ['Une mairie recense le mode de chauffage des 1 200 logements de la commune.','les 1 200 logements de la commune','un logement de la commune','le mode de chauffage','1 200'],
  ['Une usine contrôle le diamètre de 80 pièces prélevées sur la chaîne.','les 80 pièces prélevées','une pièce prélevée','le diamètre de la pièce','80'],
  ['On note le nombre de frères et sœurs des 30 étudiants d’un groupe du Cnam.','les 30 étudiants du groupe','un étudiant du groupe','le nombre de frères et sœurs','30']];
const gS1DePop=()=>{const[t,pop,ind,va,N]=pick(S1DE_POP),w=R(0,2),Q=['Quelle est la population étudiée ?','Qui est un individu (ou unité statistique) ?','Quelle est la variable étudiée ?'][w];
  const O=[{h:pop,k:0},{h:ind,k:1},{h:va,k:2},{h:`le nombre ${N}`,k:3}];
  return mcq(Q,stx(t),O.map(o=>({h:o.h,ok:o.k===w})),`Population : ${pop}. Individu : ${ind}. Variable : ${va}. ${N} est l’effectif total, pas la population elle-même.`,
    'La population est l’ensemble étudié, l’individu un de ses éléments, la variable ce que l’on observe sur chaque individu.')};
/* 3. Fréquence lue sur un diagramme en bâtons */
const S1DE_DISC=[['Nombre d’enfants par foyer','foyers','enfant(s)'],['Nombre de pièces par logement','logements','pièce(s)'],['Nombre d’absences dans le mois','salariés','absence(s)'],['Nombre de livres lus cet été','étudiants','livre(s)']];
const gS1DeFreq=()=>{const[t,u,unit]=pick(S1DE_DISC),k=R(4,6),xs=Array.from({length:k},(_,i)=>i),ns=xs.map(()=>R(2,16)),N=sumA(ns),i=R(0,k-2),au=Math.random()<.4;
  const n=au?sumA(ns.slice(i)):ns[i],f=n/N*100;
  return nq({instr:'Calcule la fréquence en pourcentage.',prompt:stx(`${t} (${N} ${u} interrogés). Quelle est la fréquence des ${u} ${au?`ayant au moins ${i} ${unit}`:`ayant exactement ${i} ${unit}`} ?`)+S1DE_bars(xs,ns,{yl:'effectif'}),
    labels:['f (en %) ='],t:[f],dp:1,
    explain:`${au?`On additionne les effectifs des valeurs ≥ ${i} : ${ns.slice(i).join(' + ')} = ${n}.`:`Effectif de la valeur ${i} : ${n}.`} Effectif total : N = ${ns.join(' + ')} = ${N}. f = ${n} ÷ ${N} ≈ ${dec(n/N,4)}, soit ${s1Pct(f)}.`,
    hint:'Fréquence = effectif ÷ effectif total (la somme de tous les bâtons), puis × 100.',
    diag:([v])=>near(v,n)||near(v,n/N,.002)||near(v,n/k*100,.06)?'s1-freq':null})};
/* 4. Fréquence cumulée croissante */
const gS1DeFcum=()=>{const k=R(5,6),x0=R(0,2),xs=Array.from({length:k},(_,i)=>x0+i),ns=xs.map(()=>R(1,15)),N=sumA(ns),i=R(1,k-2),Fc=sumA(ns.slice(0,i+1))/N*100;
  return nq({instr:'Calcule la fréquence cumulée croissante.',prompt:stx(`Nombre de jours de télétravail par semaine déclaré par des salariés. Quelle est la fréquence cumulée croissante en x = ${xs[i]}, c’est-à-dire la part des salariés qui télétravaillent au plus ${xs[i]} jour(s) ?`)+
      dtab([['Valeur x<sub>i</sub>',...xs.map(num)],['Effectif n<sub>i</sub>',...ns.map(num)]]),labels:['F (en %) ='],t:[Fc],dp:1,
    explain:`On cumule les effectifs des valeurs ≤ ${xs[i]} : ${ns.slice(0,i+1).join(' + ')} = ${sumA(ns.slice(0,i+1))}. N = ${N}. F = ${sumA(ns.slice(0,i+1))} ÷ ${N} ≈ ${s1Pct(Fc)}.`,
    hint:'Additionne les effectifs de toutes les valeurs inférieures ou égales à x, puis divise par N.',
    diag:([v])=>near(v,ns[i]/N*100,.06)||near(v,sumA(ns.slice(0,i))/N*100,.06)?'s1-cum':near(v,Fc/100,.002)?'s1-freq':null})};
/* 5. Angle d'un secteur */
const S1DE_CAT=[['Mode de transport',['Voiture','Transports','Vélo','Marche']],['Groupe sanguin',['O','A','B','AB']],['Type de contrat',['CDI','CDD','Intérim','Stage']],['Mode de chauffage',['Gaz','Électrique','Bois','Fioul']]];
const gS1DePie=()=>{const[t,cats]=pick(S1DE_CAT),N=pick([24,36,40,45,60,72,90,120]);let ns;do{ns=cats.map(()=>R(1,10));const s=sumA(ns);ns=ns.map(x=>Math.round(x*N/s))}while(sumA(ns)!==N||ns.some(x=>x<1));
  const i=R(0,3),a=360*ns[i]/N;
  return nq({instr:'Calcule l’angle du secteur (en degrés).',prompt:stx(`${t} de ${N} personnes. Quel angle faut-il donner au secteur « ${cats[i]} » ?`)+S1DE_pie(cats,ns,{hl:i}),labels:['Angle (°) ='],t:[a],dp:Number.isInteger(+a.toFixed(6))?0:1,
    explain:`Les ${N} personnes occupent 360°. Angle = 360 × ${ns[i]} ÷ ${N} = ${dec(a,1)}°.`,hint:'L’angle est proportionnel à l’effectif : 360° pour l’effectif total.',
    diag:([v])=>near(v,ns[i]/N*100,.06)?'s1-freq':null})};
/* 6. Placer le sommet d'un bâton (pointQ) */
const gS1DeBar=()=>{const N=pick([20,25]),k=R(5,6),xs=Array.from({length:k},(_,i)=>i);let ns;do{ns=xs.map(()=>R(1,8));}while(sumA(ns)!==N);
  const i=R(0,k-1),f=ns[i]/N*100;
  return pointQ({instr:`Place le sommet du bâton de la valeur ${i}.`,prompt:stx(`On a interrogé ${N} personnes sur leur nombre d’abonnements (presse, sport, streaming…). La valeur ${i} a une fréquence de ${num(f)} %. Les autres bâtons sont déjà placés (points gris).`),
    nom:'S',x:[-1,7],y:[-1,9],snap:1,tol:.45,cible:[i,ns[i]],fond:{pts:xs.filter(x=>x!==i).map(x=>[x,ns[x],''])},
    explain:`Effectif = fréquence × N = ${num(f/100)} × ${N} = ${ns[i]}. Le sommet est donc le point (${i} ; ${ns[i]}).`,hint:'Passe de la fréquence à l’effectif : n = f × N. Le bâton se dresse au-dessus de la valeur.'})};
/* 7. Placer un point du polygone des fréquences cumulées (pointQ) */
const gS1DePoly=()=>{let ns;do ns=Array.from({length:5},()=>R(0,7));while(sumA(ns)!==20||ns[0]===0);const B=[0,20,40,60,80,100],F=[0];ns.forEach(n=>F.push(F[F.length-1]+n*5));
  const k=R(1,4);
  return pointQ({instr:`Place le point du polygone des fréquences cumulées d’abscisse ${B[k]}.`,prompt:stx('Notes sur 100 de 20 candidats, regroupées en classes. Les points déjà placés sont en gris.')+
      dtab([['Classe',...ns.map((_,i)=>`[${B[i]} ; ${B[i+1]}[`)],['Effectif',...ns]]),
    nom:'P',x:[-5,105],y:[-5,105],snap:5,tol:2.4,cible:[B[k],F[k]],fond:{pts:B.slice(0,k).map((b,i)=>[b,F[i],'']),pas:10,etiq:20},
    explain:`À la borne ${B[k]}, on a cumulé les classes situées avant : ${ns.slice(0,k).join(' + ')} = ${F[k]/5} candidats sur 20, soit ${F[k]} %. Le point est (${B[k]} ; ${F[k]}).`,
    hint:'Le polygone se trace aux bornes supérieures des classes : en x = b, on a la part des valeurs strictement inférieures à b.'})};
/* 8. Densité d'une classe (histogramme à amplitudes inégales) */
const S1DE_CLS=[['Temps de trajet domicile-travail (min)',[0,10,20,30,60,90]],['Âge des adhérents d’un club (ans)',[15,20,25,35,45,65]],['Dépense d’un client (€)',[0,20,40,60,100,200]]];
const s1DeGenCls=()=>{const[t,B]=pick(S1DE_CLS),C=[];for(let i=0;i<B.length-1;i++){const w=B[i+1]-B[i],d=pick(w>=40?[.25,.5,.75]:w>=20?[.5,1,1.5]:[1,1.5,2,3,4]);C.push([B[i],B[i+1],Math.round(d*w)])}return{t,B,C}};
const gS1DeDens=()=>{const{t,C}=s1DeGenCls(),i=R(2,C.length-1),c=C[i],w=c[1]-c[0],d=c[2]/w;
  return nq({instr:'Calcule la densité de la classe (hauteur du rectangle).',prompt:stx(`${t}. Les classes n’ont pas toutes la même amplitude : la hauteur de chaque rectangle est la densité (effectif par unité). La classe [${c[0]} ; ${c[1]}[ contient ${c[2]} individus.`)+
      S1DE_hist(C,{dens:true,hide:i,lab:c=>dec(c[2]/(c[1]-c[0]),2)}),labels:['Densité ='],t:[d],dp:2,
    explain:`Amplitude : ${c[1]} − ${c[0]} = ${w}. Densité = effectif ÷ amplitude = ${c[2]} ÷ ${w} = ${dec(d,2)}. C’est l’aire du rectangle (hauteur × largeur = ${c[2]}) qui représente l’effectif.`,
    hint:'Divise l’effectif de la classe par son amplitude.',diag:([v])=>near(v,c[2])||near(v,w/c[2],.006)?'s1-dens':null})};
/* 9. Effectif lu sur un histogramme (aire) */
const gS1DeHistEff=()=>{const{t,C}=s1DeGenCls(),i=R(0,C.length-1),c=C[i],w=c[1]-c[0],d=c[2]/w,N=sumA(C.map(x=>x[2])),v=Math.random()<.6;
  return nq({instr:v?'Calcule l’effectif de la classe.':'Calcule la fréquence de la classe (en %).',prompt:stx(`${t}. Sur cet histogramme, la hauteur des rectangles est la densité (nombre d’individus par unité).${v?'':` Effectif total : ${N}.`} Que vaut ${v?'l’effectif':'la fréquence'} de la classe [${c[0]} ; ${c[1]}[ ?`)+
      S1DE_hist(C,{dens:true,hl:i,lab:c=>dec(c[2]/(c[1]-c[0]),2)}),labels:[v?'Effectif =':'f (en %) ='],t:[v?c[2]:c[2]/N*100],dp:v?0:1,
    explain:`Effectif = aire du rectangle = densité × amplitude = ${dec(d,2)} × ${w} = ${c[2]}.${v?'':` Fréquence = ${c[2]} ÷ ${N} ≈ ${s1Pct(c[2]/N*100)}.`}`,
    hint:'Dans un histogramme, c’est l’aire (hauteur × largeur) qui compte les individus.',diag:([x])=>near(x,d)||near(x,d/N*100,.06)?'s1-dens':null})};
/* 10. Proportion par interpolation sur le polygone */
const gS1DeInterp=()=>{let ns;do ns=Array.from({length:5},()=>R(1,8));while(sumA(ns)!==20);const B=[0,20,40,60,80,100],F=[0];ns.forEach(n=>F.push(F[F.length-1]+n*5));
  const k=R(1,5),x=B[k-1]+pick([5,10,15]),Fx=F[k-1]+(x-B[k-1])/20*(F[k]-F[k-1]);
  return nq({instr:'Estime la proportion par interpolation linéaire.',prompt:stx(`Notes sur 100 de 20 candidats. Estime le pourcentage de candidats ayant une note inférieure à ${x}, en supposant les notes réparties uniformément dans chaque classe.`)+S1DE_poly(B,F,{x}),
    labels:['Proportion (en %) ='],t:[Fx],dp:2,
    explain:`${x} est dans la classe [${B[k-1]} ; ${B[k]}[. Sur le segment du polygone : F(${x}) = ${F[k-1]} + (${x} − ${B[k-1]}) ÷ 20 × (${F[k]} − ${F[k-1]}) = ${dec(Fx,2)} %.`,
    hint:'Le polygone est formé de segments : lis la valeur sur le segment, en proportion de la distance parcourue dans la classe.',
    diag:([v])=>near(v,F[k-1],.06)||near(v,F[k],.06)?'s1-cum':null})};
/* 11. Raisonner : tracer un histogramme à classes inégales */
const gS1DeR1=()=>{let t,C;do({t,C}=s1DeGenCls());while(C[C.length-1][2]===C[C.length-1][1]-C[C.length-1][0]);const i=C.length-1,c=C[i],w=c[1]-c[0],d=c[2]/w;
  return chain({instr:'Prépare la représentation graphique, en construisant ton raisonnement.',prompt:stx(`${t}.`)+dtab([['Classe',...C.map(c=>`[${c[0]} ; ${c[1]}[`)],['Effectif',...C.map(c=>c[2])]]),
    steps:[
      {q:'La variable étudiée est…',o:[{h:'quantitative continue',ok:true,c:'cont'},{h:'quantitative discrète',c:'disc',why:'Ce sont des mesures, qui peuvent prendre toute valeur d’un intervalle : on les a d’ailleurs regroupées en classes.',tag:'s1-nature'},
        {h:'qualitative',c:'qual',why:'Les valeurs sont des nombres mesurés, pas des catégories.',tag:'s1-nature'}]},
      {q:'Le graphique adapté est…',o:prev=>{const c0=prev[0].c,W='C’est bien le graphique adapté ici, mais il ne découle pas de ton choix précédent.';
        return[{h:'un histogramme',ok:c0==='cont',g:'h',why:c0==='cont'?'':W},{h:'un diagramme en bâtons',ok:c0==='disc',g:'b',why:'Les bâtons conviennent à une variable discrète ; ici les valeurs sont regroupées en classes : histogramme.'},
          {h:'un diagramme circulaire',ok:c0==='qual',g:'s',why:'Le diagramme circulaire convient à une variable qualitative ; ici, histogramme.'}]}},
      {q:'Les classes n’ont pas la même amplitude. La hauteur de chaque rectangle doit être…',o:[{h:'l’effectif divisé par l’amplitude (densité)',ok:true,c:'d'},
        {h:'l’effectif de la classe',c:'n',why:'Une classe large paraîtrait trop importante : c’est l’aire qui doit être proportionnelle à l’effectif.',tag:'s1-dens'},
        {h:'l’amplitude de la classe',c:'w',why:'L’amplitude donne la largeur du rectangle, pas sa hauteur.',tag:'s1-dens'}]},
      {q:`Pour la classe [${c[0]} ; ${c[1]}[, la hauteur vaut donc…`,o:prev=>{const k=prev[2].c;
        return[{h:`${c[2]} ÷ ${w} = ${dec(d,2)}`,ok:k==='d',why:k==='d'?'':'C’est la bonne hauteur, mais elle ne découle pas de ton choix précédent.'},
          {h:`${c[2]}`,ok:k==='n',why:'L’effectif seul ne tient pas compte de la largeur de la classe.',tag:'s1-dens'},{h:`${w}`,ok:k==='w',why:'L’amplitude n’est pas une hauteur.',tag:'s1-dens'},
          {h:`${w} ÷ ${c[2]} = ${dec(w/c[2],2)}`,why:'Densité = effectif ÷ amplitude, pas l’inverse.',tag:'s1-dens'}]}}],
    explain:`Mesures regroupées en classes : variable quantitative continue, représentée par un histogramme. Classes d’amplitudes inégales : hauteur = densité = effectif ÷ amplitude. Pour [${c[0]} ; ${c[1]}[ : ${c[2]} ÷ ${w} = ${dec(d,2)}.`})};
/* 12. Raisonner : quelle part en dessous d'un seuil ? */
const gS1DeR2=()=>{const{t,B,C}=s1DeGenCls(),k=R(2,C.length-1),x=B[k],N=sumA(C.map(c=>c[2])),lo=sumA(C.slice(0,k).map(c=>c[2])),one=C[k-1][2],nxt=C[k][2];
  const st=v=>`${v} ÷ ${N} ≈ ${s1Pct(v/N*100)}`;
  return chain({instr:'Réponds à la question en construisant ton raisonnement.',prompt:stx(`${t}. Quelle part des individus a une valeur strictement inférieure à ${x} ?`)+dtab([['Classe',...C.map(c=>`[${c[0]} ; ${c[1]}[`)],['Effectif',...C.map(c=>c[2])]]),
    steps:[
      {q:'L’outil adapté est…',o:[{h:'la fréquence cumulée croissante en '+x,ok:true,c:'cc'},{h:`la fréquence de la seule classe [${B[k-1]} ; ${x}[`,c:'one',why:`« Inférieure à ${x} » concerne toutes les classes situées avant ${x}, pas seulement la dernière.`,tag:'s1-cum'},
        {h:'la fréquence cumulée décroissante en '+x,c:'cd',why:`Les fréquences cumulées décroissantes comptent les valeurs supérieures ou égales à ${x}.`,tag:'s1-cum'}]},
      {q:'On compte donc…',o:prev=>{const c0=prev[0].c;
        return[{h:`${C.slice(0,k).map(c=>c[2]).join(' + ')} = ${lo} individus`,ok:c0==='cc',v:lo,why:c0==='cc'?'':'C’est le bon décompte, mais il ne découle pas de ton choix précédent.'},
          {h:`${C.slice(0,k+1).map(c=>c[2]).join(' + ')} = ${lo+nxt} individus`,v:lo+nxt,why:`La classe [${x} ; ${B[k+1]}[ commence à ${x} : ses valeurs ne sont pas inférieures à ${x}.`,tag:'s1-cum'},
          {h:`${one} individus`,ok:c0==='one',v:one,why:c0==='one'?'':'Il faut toutes les classes avant le seuil, pas une seule.',tag:'s1-cum'},
          {h:`${N} − ${lo} = ${N-lo} individus`,ok:c0==='cd',v:N-lo,why:c0==='cd'?'':`Ce sont les individus à ${x} ou plus : le contraire de ce qu’on cherche.`,tag:'s1-cum'}]}},
      {q:'La part cherchée est…',o:prev=>{const v=prev[1].v;return[{h:st(v),ok:true},{h:`${v} ÷ ${C.length} ≈ ${dec(v/C.length,1)} %`,why:'On divise par l’effectif total N, pas par le nombre de classes.',tag:'s1-freq'},
        {h:`${N} ÷ ${v} ≈ ${dec(N/v,2)} %`,why:'La fréquence est effectif ÷ effectif total, pas l’inverse.',tag:'s1-freq'}]}}],
    explain:`On cumule les classes situées avant ${x} : ${lo} individus sur ${N}, soit ${s1Pct(lo/N*100)} : c’est la fréquence cumulée croissante en ${x}.`})};

ANA_UNITS.push({id:'s1-descriptive',tr:'s1',name:'Séries statistiques',sub:'Variables, effectifs, fréquences, diagrammes, histogrammes',glyph:'▥',tone:'c',
  skills:[SKA('s1.de.type','Nature d’une variable',gS1DeType,1),SKA('s1.de.pop','Population, individu, variable',gS1DePop,1),SKA('s1.de.freq','Fréquence sur un diagramme',gS1DeFreq,1),
    SKA('s1.de.pie','Diagramme circulaire',gS1DePie,1),SKA('s1.de.bar','Placer un bâton',gS1DeBar,1),SKA('s1.de.fcum','Fréquence cumulée',gS1DeFcum,2),
    SKA('s1.de.poly','Placer un point du polygone cumulé',gS1DePoly,2),SKA('s1.de.dens','Densité d’une classe',gS1DeDens,2),SKA('s1.de.histeff','Lire un histogramme',gS1DeHistEff,2),
    SKA('s1.de.r1','Raisonner : tracer un histogramme',gS1DeR1,2),SKA('s1.de.interp','Interpoler sur le polygone',gS1DeInterp,3),SKA('s1.de.r2','Raisonner : part sous un seuil',gS1DeR2,3)]});
