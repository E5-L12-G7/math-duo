/* ===================== STA001 · Estimation ===================== */
Object.assign(ANA_ERR,{
  's1es-sqrtn':{label:'σ au lieu de σ/√n',tip:'Une moyenne d’échantillon fluctue moins qu’un individu : son écart-type est σ/√n. N’oublie pas de diviser par √n.'},
  's1es-quant':{label:'Mauvais quantile',tip:'Intervalle bilatéral au niveau 1 − α : quantile d’ordre 1 − α/2. 1,645 à 90 %, 1,96 à 95 %, 2,576 à 99 %.'},
  's1es-student':{label:'Student ou loi normale ?',tip:'σ inconnu, population normale, petit échantillon : loi de Student à n − 1 degrés de liberté.'},
  's1es-biais':{label:'Variance non corrigée',tip:'L’estimateur sans biais de σ² divise la somme des carrés des écarts par n − 1, pas par n.'},
  's1es-interp':{label:'Interprétation de l’intervalle',tip:'Le niveau 95 % qualifie la méthode : 95 % des intervalles construits ainsi contiennent la vraie valeur.'},
  's1es-arr':{label:'Arrondi de la taille',tip:'La taille d’échantillon doit être au moins égale à la valeur trouvée : on arrondit toujours à l’entier supérieur.'}});
/* Quantiles de Student t_{0,95}, t_{0,975}, t_{0,995} selon le nombre de degrés de liberté ν */
const S1ES_T95={3:2.353,4:2.132,5:2.015,6:1.943,7:1.895,8:1.86,9:1.833,10:1.812,11:1.796,12:1.782,13:1.771,14:1.761,15:1.753,16:1.746,17:1.74,18:1.734,19:1.729,20:1.725,21:1.721,22:1.717,23:1.714,24:1.711,25:1.708,26:1.706,27:1.703,28:1.701,29:1.699,30:1.697};
const S1ES_T975={3:3.182,4:2.776,5:2.571,6:2.447,7:2.365,8:2.306,9:2.262,10:2.228,11:2.201,12:2.179,13:2.16,14:2.145,15:2.131,16:2.12,17:2.11,18:2.101,19:2.093,20:2.086,21:2.08,22:2.074,23:2.069,24:2.064,25:2.06,26:2.056,27:2.052,28:2.048,29:2.045,30:2.042};
const S1ES_T995={3:5.841,4:4.604,5:4.032,6:3.707,7:3.499,8:3.355,9:3.25,10:3.169,11:3.106,12:3.055,13:3.012,14:2.977,15:2.947,16:2.921,17:2.898,18:2.878,19:2.861,20:2.845,21:2.831,22:2.819,23:2.807,24:2.797,25:2.787,26:2.779,27:2.771,28:2.763,29:2.756,30:2.75};
const S1ES_Z={90:1.645,95:1.96,99:2.576};
const S1ES_ZTXT='Quantiles de N(0 ; 1) : u<sub>0,95</sub> = 1,645 ; u<sub>0,975</sub> = 1,96 ; u<sub>0,995</sub> = 2,576.';
const S1ES_CTX=[['la durée d’un trajet domicile-travail','min',35,[6,8,10]],['la masse d’un paquet de café','g',250,[4,5,6]],
  ['la taille d’un adulte','cm',170,[6,7,8]],['le temps de réponse d’un serveur','ms',120,[15,20,25]],['la consommation d’une voiture','L/100 km',6,[1,2]]];
const S1ES_phi=x=>Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);
/** Densité de Student à ν ddl (normalisée numériquement) */
const S1ES_tf=nu=>{const g=x=>(1+x*x/nu)**(-(nu+1)/2);let s=0;const N=4000,a=-60,h=120/N;for(let i=0;i<=N;i++)s+=(i===0||i===N?1:i%2?4:2)*g(a+i*h);const c=1/(s*h/3);return x=>c*g(x)};
/** Loi N(0 ; 1) : aire centrale = niveau de confiance, queues = α/2 */
const S1ES_norm=(cf,lab='u')=>{const z=S1ES_Z[cf],g=gp({W:300,H:150,x0:-4,x1:4,y0:-.07,y1:.46,pd:8});
  g.area(S1ES_phi,()=>0,-z,z,'var(--t-sq)',.3).area(S1ES_phi,()=>0,-4,-z,'var(--t-x)',.3).area(S1ES_phi,()=>0,z,4,'var(--t-x)',.3);
  g.seg(-4,0,4,0,'var(--muted)',1.2).fn(S1ES_phi,'var(--ink)',2).seg(-z,0,-z,S1ES_phi(z),'var(--t-sq)',1.5).seg(z,0,z,S1ES_phi(z),'var(--t-sq)',1.5);
  g.text(0,.14,`${cf} %`,'var(--t-sq)','middle').text(-3.2,.07,`${num((100-cf)/2)} %`,'var(--t-x)','middle',0,0,10).text(3.2,.07,`${num((100-cf)/2)} %`,'var(--t-x)','middle',0,0,10)
    .text(-z,0,MINUS+lab,'var(--muted)','middle',0,13,11).text(z,0,lab,'var(--muted)','middle',0,13,11);
  return`<div class="qfig">${g.done('Loi normale centrée réduite : aire centrale égale au niveau de confiance')}</div>`};
/** Student (trait plein) contre loi normale (pointillés) */
const S1ES_stud=nu=>{const f=S1ES_tf(nu),g=gp({W:300,H:150,x0:-4.5,x1:4.5,y0:-.07,y1:.46,pd:8});
  g.seg(-4.5,0,4.5,0,'var(--muted)',1.2).fn(S1ES_phi,'var(--muted)',1.6,'5 4').fn(f,'var(--t-c)',2.4);
  g.text(-4.3,.42,`Student à ${nu} ddl`,'var(--t-c)','start',0,0,10).text(-4.3,.36,'N(0 ; 1) en pointillés','var(--muted)','start',0,0,10);
  return`<div class="qfig">${g.done('Densité de Student comparée à la loi normale')}</div>`};
/** Nuage de points sur un axe (valeurs égales empilées) */
const S1ES_dots=xs=>{const lo=Math.min(...xs),hi=Math.max(...xs),pad=Math.max(1,(hi-lo)*.12),g=gp({W:300,H:100,x0:lo-pad,x1:hi+pad,y0:-1.6,y1:4,pd:8});
  const st=[1,2,5,10,20,50].find(s=>(hi-lo+2*pad)/s<=8)||100,cnt={};g.seg(lo-pad,0,hi+pad,0,'var(--muted)',1.2);
  for(let v=Math.ceil((lo-pad)/st)*st;v<=hi+pad;v+=st)g.seg(v,-.25,v,.25,'var(--muted)',1).text(v,0,num(v),'var(--muted)','middle',0,14,10,false);
  xs.forEach(x=>{cnt[x]=(cnt[x]||0)+1;g.dot(x,.35+.9*cnt[x],'var(--t-sq)',5)});
  return`<div class="qfig">${g.done('Valeurs de l’échantillon sur un axe')}</div>`};
/** Barre de proportion k sur n */
const S1ES_bar=(k,n,lab)=>{const f=k/n;return`<div class="qfig"><svg viewBox="0 0 300 54" role="img" aria-label="Proportion observée"><rect x="10" y="8" width="280" height="24" rx="4" fill="var(--surface)" stroke="var(--ink)"/><rect x="10" y="8" width="${(280*f).toFixed(1)}" height="24" rx="4" fill="var(--t-sq)" opacity=".75"/><text x="${(10+140*f).toFixed(1)}" y="24" font-size="11" font-weight="700" text-anchor="middle" fill="var(--ink)">${k}</text><text x="150" y="48" font-size="11" text-anchor="middle" fill="var(--muted)">${lab} : ${k} sur ${n}</text></svg></div>`};
/** Un intervalle tracé sur un axe */
const S1ES_iv=(lo,hi,c,d=2)=>{const w=hi-lo,g=gp({W:300,H:70,x0:lo-w*.6,x1:hi+w*.6,y0:-1.2,y1:1.2,pd:8});
  g.seg(lo-w*.6,0,hi+w*.6,0,'var(--muted)',1.2).seg(lo,0,hi,0,'var(--t-sq)',6).dot(c,0,'var(--ink)',4);
  g.text(lo,0,`[${dec(lo,d)}`,'var(--t-sq)','middle',0,-10,10).text(hi,0,`${dec(hi,d)}]`,'var(--t-sq)','middle',0,-10,10).text(c,0,dec(c,d),'var(--ink)','middle',0,16,10);
  return`<div class="qfig">${g.done('Intervalle de confiance')}</div>`};

/* 1. Estimations ponctuelles de μ et σ² */
const gS1EsPonct=()=>{const c=pick(S1ES_CTX.slice(0,4)),n=R(5,8),xs=Array.from({length:n},()=>c[2]+R(-c[3][0],c[3][0]));
  const m=meanA(xs),ss=xs.reduce((s,x)=>s+(x-m)**2,0),s2=ss/(n-1);if(ss===0)return gS1EsPonct();
  return nq({instr:'Donne les estimations ponctuelles de la moyenne μ et de la variance σ² (estimateur sans biais).',
    prompt:stx(`On mesure ${c[0]} (en ${c[1]}) sur ${n} individus tirés au hasard :`)+serie(xs)+S1ES_dots(xs),labels:['x̄ =','s² ='],t:[m,s2],dp:2,
    explain:`x̄ = (${xs.map(num).join(' + ')}) / ${n} ≈ ${dec(m,3)}. Somme des carrés des écarts à x̄ : Σ(xᵢ − x̄)² ≈ ${dec(ss,3)}. Estimateur sans biais : s² = ${dec(ss,3)} / ${n-1} ≈ ${dec(s2,2)}. Diviser par ${n} donnerait ${dec(ss/n,2)}, une estimation biaisée (trop petite en moyenne).`,
    hint:'x̄ = somme / n, puis s² = Σ(xᵢ − x̄)² / (n − 1).',diag:([a,b])=>near(b,ss/n,.006)?'s1es-biais':null})};
/* 2. Vocabulaire : paramètre, estimateur, estimation, biais, convergence */
const gS1EsVoc=()=>{const v=R(0,3);
  if(v===0){const n=pick([50,80,120,200]),m=dec(R(1180,1260)/100,2);return mcq('Dans cette situation, quelle est l’estimation ponctuelle ?',
    stx(`Une usine fabrique des vis. On mesure la longueur de ${n} vis prises au hasard : leur moyenne vaut ${m} mm. On s’intéresse à la longueur moyenne μ de toute la production.`),
    [{h:`Le nombre ${m} mm`,ok:true},{h:'La moyenne μ de toute la production'},{h:`La variable aléatoire X̄, moyenne de ${n} vis tirées au hasard`},{h:`Le nombre ${n} de vis mesurées`}],
    `μ est le paramètre inconnu ; X̄ (la règle de calcul, aléatoire) est l’estimateur ; sa valeur observée ${m} mm est l’estimation ponctuelle.`,'L’estimation est un nombre calculé sur l’échantillon observé.')}
  if(v===1)return mcq('Quel est l’estimateur sans biais de la variance σ² ?',stx('X₁, …, Xₙ est un échantillon de moyenne X̄.'),
    [{h:mx('S² = (1/(n − 1)) Σ (Xᵢ − X̄)²'),ok:true},{h:mx('Sₙ² = (1/n) Σ (Xᵢ − X̄)²'),tag:'s1es-biais'},{h:mx('(1/(n − 1)) Σ (Xᵢ − X̄)')},{h:mx('(1/n) Σ |Xᵢ − X̄|')}],
    'E(Sₙ²) = (n − 1)/n × σ² < σ² : Sₙ² sous-estime σ² en moyenne. En divisant par n − 1 on corrige ce biais : E(S²) = σ². La somme Σ(Xᵢ − X̄) vaut toujours 0.','Un estimateur T de θ est sans biais si E(T) = θ.');
  if(v===2)return mcq('Que veut dire « Tₙ est un estimateur convergent de θ » ?',stx('Tₙ est calculé sur un échantillon de taille n.'),
    [{h:'Tₙ se rapproche de θ avec une probabilité qui tend vers 1 quand n grandit',ok:true},{h:'E(Tₙ) = θ pour toute taille n'},{h:'Tₙ est égal à θ dès que n ≥ 30'},{h:'La variance de Tₙ augmente avec n'}],
    'Convergent : pour tout ε > 0, P(|Tₙ − θ| > ε) → 0. Une condition suffisante : E(Tₙ) → θ et V(Tₙ) → 0. « E(Tₙ) = θ », c’est « sans biais », une autre propriété.','Pense à la loi des grands nombres : plus on mesure, plus on est près de la vraie valeur.');
  const n=pick([200,400,500,800]),k=R(Math.round(.1*n),Math.round(.5*n));
  return mcq('Quelle est l’estimation ponctuelle de la proportion p ?',stx(`Sur ${n} personnes interrogées au hasard, ${k} pratiquent un sport chaque semaine.`)+S1ES_bar(k,n,'Sportifs'),
    [{h:`f = ${k}/${n} = ${dec(k/n,4)}`,ok:true},{h:`f = ${k}/${n-k} ≈ ${dec(k/(n-k),4)}`},{h:`f = ${n-k}/${n} = ${dec((n-k)/n,4)}`},{h:'p = 0,5, faute d’information'}],
    `La fréquence observée f = ${k}/${n} est l’estimation ponctuelle (sans biais) de p.`,'Fréquence = effectif du caractère / effectif total.')};
/* 3. Placer le centre ou une borne d’un intervalle de confiance */
const gS1EsLire=()=>{const xb=R(12,40)+pick([0,.5]),E=pick([1,1.5,2,2.5,3,3.5]),v=R(0,2),x0=Math.floor(xb)-5,x1=x0+11,lo=xb-E,hi=xb+E,tg=v===0?xb:v===1?hi:lo;
  return pointQ({instr:v===0?'Place l’estimation ponctuelle x̄ : le centre de l’intervalle.':`Place la borne ${v===1?'supérieure':'inférieure'} de l’intervalle de confiance.`,
    prompt:v===0?stx(`Au niveau 95 %, un intervalle de confiance de la moyenne μ est [${num(lo)} ; ${num(hi)}].`):stx(`L’estimation ponctuelle de μ est x̄ = ${num(xb)} et la marge d’erreur au niveau 95 % vaut E = ${num(E)}.`),
    nom:v===0?'x̄':v===1?'B':'A',x:[x0,x1],y:[-2,2],snap:.5,tol:.2,cible:[tg,0],fond:{ligne:true,pas:.5,etiq:1},
    explain:v===0?`L’intervalle est symétrique autour de x̄ : x̄ = (${num(lo)} + ${num(hi)}) / 2 = ${num(xb)}, et la marge vaut E = ${num(E)}.`:`L’intervalle est [x̄ − E ; x̄ + E] = [${num(lo)} ; ${num(hi)}] : la borne ${v===1?'supérieure':'inférieure'} est ${num(tg)}.`,
    hint:v===0?'Le centre est la moyenne des deux bornes.':'Borne = x̄ ± E.'})};
/* 4. IC d’une moyenne, σ connu */
const gS1EsIcz=()=>{const c=pick(S1ES_CTX.slice(0,4)),s=pick(c[3]),n=pick([16,25,36,49,64,100,144]),cf=pick([90,95,95,99]),z=S1ES_Z[cf],xb=+(c[2]+R(-30,30)/40*s).toFixed(1),se=s/Math.sqrt(n),E=z*se;
  return nq({instr:`Calcule l’intervalle de confiance de μ au niveau ${cf} %.`,
    prompt:stx(`On étudie ${c[0]}, de loi normale d’écart-type connu σ = ${s} ${c[1]}. Sur n = ${n} individus, la moyenne observée est x̄ = ${num(xb)} ${c[1]}.`)+stx(S1ES_ZTXT)+S1ES_norm(cf),
    labels:['Borne inf. =','Borne sup. ='],t:[xb-E,xb+E],dp:2,tol:.011,
    explain:`Niveau ${cf} % : on laisse ${num((100-cf)/2)} % de chaque côté, donc u = ${num(z)}. Écart-type de X̄ : σ/√n = ${s}/${Math.sqrt(n)} ≈ ${dec(se,4)}. Marge : E = ${num(z)} × ${dec(se,4)} ≈ ${dec(E,3)}. IC = [${dec(xb-E,2)} ; ${dec(xb+E,2)}].`,
    hint:'IC = [x̄ − u σ/√n ; x̄ + u σ/√n] ; à 95 %, u = 1,96.',
    diag:([a])=>near(a,xb-z*s,.05)?'s1es-sqrtn':Object.values(S1ES_Z).some(u=>u!==z&&near(a,xb-u*se,.011))?'s1es-quant':null})};
/* 5. IC d’une moyenne, σ inconnu : Student */
const gS1EsIct=()=>{const c=pick(S1ES_CTX.slice(0,4)),n=R(6,25),nu=n-1,cf=pick([95,95,99]),T=cf===95?S1ES_T975:S1ES_T995,t=T[nu],s=+(pick(c[3])*R(8,12)/10).toFixed(1),xb=+(c[2]+R(-30,30)/40*s).toFixed(1),E=t*s/Math.sqrt(n);
  const o=cf===95?'0,975':'0,995';
  return nq({instr:`Calcule l’intervalle de confiance de μ au niveau ${cf} %.`,
    prompt:stx(`On étudie ${c[0]} (en ${c[1]}), supposée de loi normale, d’écart-type σ inconnu. Sur n = ${n} individus : x̄ = ${num(xb)} et s = ${num(s)} (écart-type corrigé, calculé avec n − 1).`)+
      dtab([['ν (ddl)',nu-1,nu,nu+1],[`t<sub>${o}</sub>(ν)`,num(T[nu-1]),num(T[nu]),num(T[nu+1])]])+stx(`Pour la loi normale : u<sub>${o}</sub> = ${num(S1ES_Z[cf])}.`)+S1ES_stud(nu),
    labels:['Borne inf. =','Borne sup. ='],t:[xb-E,xb+E],dp:2,tol:.02,
    explain:`σ inconnu, population normale, petit échantillon : (X̄ − μ)/(S/√n) suit la loi de Student à n − 1 = ${nu} ddl. t = t<sub>${o}</sub>(${nu}) = ${num(t)}. Marge : E = ${num(t)} × ${num(s)}/√${n} ≈ ${dec(E,3)}. IC = [${dec(xb-E,2)} ; ${dec(xb+E,2)}].`,
    hint:'IC = [x̄ − t s/√n ; x̄ + t s/√n], t lu à n − 1 degrés de liberté.',
    diag:([a])=>near(a,xb-T[nu+1]*s/Math.sqrt(n),.006)||near(a,xb-S1ES_Z[cf]*s/Math.sqrt(n),.006)?'s1es-student':near(a,xb-t*s,.05)?'s1es-sqrtn':null})};
/* 6. IC d’une proportion */
const S1ES_PCTX=[['Sur {n} clients interrogés au hasard, {k} se disent satisfaits.','Satisfaits','des clients satisfaits'],['Sur {n} pièces contrôlées au hasard, {k} sont défectueuses.','Défectueuses','des pièces défectueuses'],
  ['Dans un sondage auprès de {n} électeurs, {k} votent pour la candidate A.','Vote A','des électeurs de A'],['Sur {n} poissons pêchés au hasard dans un lac, {k} sont malades.','Malades','des poissons malades']];
const gS1EsIcp=()=>{const n=pick([100,200,250,400,500,800,1000,1200]),k=R(Math.round(.1*n),Math.round(.6*n)),f=k/n,cf=pick([90,95,95,99]),z=S1ES_Z[cf],se=Math.sqrt(f*(1-f)/n),E=z*se,c=pick(S1ES_PCTX);
  return nq({instr:`Calcule l’intervalle de confiance de la proportion p ${c[2]}, au niveau ${cf} %.`,prompt:stx(c[0].replace('{n}',n).replace('{k}',k))+S1ES_bar(k,n,c[1])+stx(S1ES_ZTXT),
    labels:['Borne inf. =','Borne sup. ='],t:[f-E,f+E],dp:3,tol:.002,
    explain:`f = ${k}/${n} = ${dec(f,4)}. Conditions : n = ${n} ≥ 30, nf = ${k} ≥ 5, n(1 − f) = ${n-k} ≥ 5. Écart-type estimé : √(f(1 − f)/n) ≈ ${dec(se,5)}. Marge : E = ${num(z)} × ${dec(se,5)} ≈ ${dec(E,4)}. IC ≈ [${dec(f-E,3)} ; ${dec(f+E,3)}].`,
    hint:'IC = [f − u √(f(1 − f)/n) ; f + u √(f(1 − f)/n)].',
    diag:([a])=>near(a,f-z*f*(1-f)/n,.003)?'calc':near(a,f-1/Math.sqrt(n),.003)?'ic':Object.values(S1ES_Z).some(u=>u!==z&&near(a,f-u*se,.002))?'s1es-quant':null})};
/* 7. Effet de n et du niveau sur la marge */
const gS1EsMarge=()=>{const n=pick([100,200,400,500,900]),E=pick([.02,.03,.04,.05,.06]),f=pick([.3,.4,.45,.55,.6]),v=R(0,3);
  let txt,ok,bad;if(v===0){const k=pick([4,9,16]);txt=`On interroge maintenant ${k*n} personnes (${k} fois plus), toujours au niveau 95 %.`;ok=E/Math.sqrt(k);bad=[[E/k,'La marge varie comme 1/√n : multiplier n par '+k+' divise E par √'+k+' = '+Math.sqrt(k)+', pas par '+k+'.'],[E*Math.sqrt(k),'Plus d’individus donnent plus d’information : la marge diminue.'],[E,'La marge dépend de n.']]}
  else if(v===1){txt=`On n’interroge plus que ${n/4} personnes (4 fois moins), toujours au niveau 95 %.`;ok=2*E;bad=[[4*E,'E varie comme 1/√n : diviser n par 4 multiplie E par √4 = 2.'],[E/2,'Moins d’individus, c’est moins de précision : la marge augmente.'],[E,'La marge dépend de n.']]}
  else if(v===2){txt=`On garde les ${n} personnes mais on passe au niveau 99 % (u = 2,576 au lieu de 1,96).`;ok=E*2.576/1.96;bad=[[E*1.96/2.576,'Être plus sûr de capturer p demande un intervalle plus large, pas plus étroit.'],[E,'La marge est proportionnelle au quantile u.'],[E*2.576,'On multiplie par le rapport 2,576/1,96, pas par 2,576.']]}
  else{txt=`On garde les ${n} personnes mais on passe au niveau 90 % (u = 1,645 au lieu de 1,96).`;ok=E*1.645/1.96;bad=[[E*1.96/1.645,'Un niveau plus faible donne un intervalle plus étroit.'],[E,'La marge est proportionnelle au quantile u.'],[E*1.645,'On multiplie par le rapport 1,645/1,96, pas par 1,645.']]}
  return mcq('Que devient la marge d’erreur ?',stx(`Sondage de ${n} personnes : f = ${num(f)} et, au niveau 95 %, la marge d’erreur vaut E = ${num(E)}.`)+S1ES_iv(f-E,f+E,f,2)+stx(txt),
    [{h:`E ≈ ${dec(ok,4)}`,ok:true},...bad.map(([x])=>({h:`E ≈ ${dec(x,4)}`,tag:v<2?'s1es-sqrtn':'s1es-quant'}))],
    `E = u × √(f(1 − f)/n) : E est proportionnelle à u et à 1/√n. ${v===0||v===1?'Seul n change':'Seul u change'} : la nouvelle marge vaut ≈ ${dec(ok,4)}.`,'Écris E = u √(f(1 − f)/n) et regarde ce qui change.')};
/* 8. Taille d’échantillon nécessaire */
const gS1EsTaille=()=>{const cf=pick([90,95,99]),z=S1ES_Z[cf];
  if(Math.random()<.5){const c=pick(S1ES_CTX.slice(0,4)),s=pick(c[3]),E=pick([.5,1,1.5,2,2.5]),raw=(z*s/E)**2,N=Math.ceil(raw-1e-9);
    return nq({instr:'Quelle taille d’échantillon minimale faut-il ?',prompt:stx(`On veut estimer la moyenne de ${c[0]} (σ = ${s} ${c[1]}, connu) au niveau ${cf} %, avec une marge d’erreur d’au plus ${num(E)} ${c[1]}.`)+stx(S1ES_ZTXT),
      labels:['n ='],t:[N],explain:`On veut u σ/√n ≤ E, donc √n ≥ u σ/E = ${num(z)} × ${s}/${num(E)} ≈ ${dec(z*s/E,3)}, soit n ≥ (u σ/E)² ≈ ${dec(raw,2)}. Il faut au moins n = ${N}.`,
      hint:'Résous u σ/√n ≤ E, puis arrondis à l’entier supérieur.',diag:([a])=>near(a,Math.floor(raw),1e-6)?'s1es-arr':near(a,Math.ceil(z*s/E),1e-6)?'calc':null})}
  const known=Math.random()<.5,p=known?pick([.1,.15,.2,.3]):.5,E=pick([.02,.025,.03,.04,.05]),raw=z*z*p*(1-p)/(E*E),N=Math.ceil(raw-1e-9);
  return nq({instr:'Quelle taille d’échantillon minimale faut-il ?',prompt:stx(`On veut estimer une proportion au niveau ${cf} % avec une marge d’erreur d’au plus ${num(E)}. ${known?`Une étude pilote indique une proportion voisine de ${num(p)} : utilise cette valeur.`:'On n’a aucune idée de la proportion : on se place dans le pire cas, p = 0,5.'}`)+stx(S1ES_ZTXT),
    labels:['n ='],t:[N],explain:`On veut u √(p(1 − p)/n) ≤ E, donc n ≥ u² p(1 − p)/E² = ${num(z)}² × ${num(p)} × ${num(+(1-p).toFixed(2))} / ${num(E)}² ≈ ${dec(raw,2)}. Il faut au moins n = ${N}.`,
    hint:'n ≥ u² p(1 − p) / E², arrondi à l’entier supérieur.',diag:([a])=>near(a,Math.floor(raw),1e-6)?'s1es-arr':null})};
/* 9. Biais et variance d’un estimateur */
const gS1EsBiais=()=>{const mu=R(5,30),s2=pick([4,9,16,25,36]);
  if(Math.random()<.55){const[a,b,c,d]=pick([[1,1,1,3],[1,2,1,4],[1,1,0,2],[2,1,1,4],[1,2,3,6],[1,1,1,2],[1,1,2,4],[2,2,1,4]]),E=(a+b+c)/d*mu,V=(a*a+b*b+c*c)/(d*d)*s2;
    const T=`T = (${[[a,'X₁'],[b,'X₂'],[c,'X₃']].filter(x=>x[0]).map(([k,x])=>(k===1?'':k)+x).join(' + ')}) / ${d}`;
    return nq({instr:'Calcule l’espérance et la variance de l’estimateur T.',prompt:stx(`X₁, X₂, X₃ sont indépendantes, de même loi, d’espérance μ = ${mu} et de variance σ² = ${s2}. On propose l’estimateur de μ :`)+`<p class="m">${T}</p>`,
      labels:['E(T) =','V(T) ='],t:[E,V],dp:2,explain:`E(T) = (${a} + ${b} + ${c}) / ${d} × μ = ${dec(E,2)} : ${a+b+c===d?'T est sans biais (E(T) = μ).':`T est biaisé, biais = E(T) − μ = ${dec(E-mu,2)}.`} Par indépendance, V(T) = (${a}² + ${b}² + ${c}²) / ${d}² × σ² = ${dec(V,2)} (comparer à V(X̄) = σ²/3 ≈ ${dec(s2/3,2)}).`,
      hint:'E est linéaire : E(aX) = a E(X). Pour des variables indépendantes : V(aX + bY) = a² V(X) + b² V(Y).',diag:([e,v])=>near(v,(a*a+b*b+c*c)/d*s2,.006)||near(v,(a+b+c)/d*s2,.006)?'va-lin':null})}
  const n=R(4,12),E=(n-1)/n*s2;
  return nq({instr:'Calcule l’espérance de Sₙ² et son biais.',prompt:stx(`On estime σ² = ${s2} par la variance non corrigée Sₙ² = (1/n) Σ (Xᵢ − X̄)², sur un échantillon de taille n = ${n}. On rappelle E(Sₙ²) = (n − 1)/n × σ².`),
    labels:['E(Sₙ²) =','biais ='],t:[E,E-s2],dp:2,explain:`E(Sₙ²) = ${n-1}/${n} × ${s2} ≈ ${dec(E,2)}. Biais = E(Sₙ²) − σ² = −σ²/n ≈ ${dec(E-s2,2)} : Sₙ² sous-estime σ² en moyenne. Le biais tend vers 0 quand n grandit, et S² = n/(n − 1) × Sₙ² le supprime.`,
    hint:'Biais = E(estimateur) − valeur estimée.',diag:([e,b])=>near(b,s2-E,.006)?'signe':null})};
/* 10. Raisonner : IC d’une moyenne, σ connu */
const gS1EsR1=()=>{const c=pick(S1ES_CTX.slice(0,4)),s=pick(c[3]),n=pick([16,25,36,64,100]),rn=Math.sqrt(n),cf=pick([95,99]),xb=+(c[2]+R(-30,30)/40*s).toFixed(1);
  const zz=S1ES_Z[cf],I=(E)=>`[${dec(xb-E,2)} ; ${dec(xb+E,2)}]`;
  return chain({instr:'Construis l’intervalle de confiance, étape par étape.',
    prompt:stx(`${c[0][0].toUpperCase()+c[0].slice(1)} suit une loi normale d’écart-type connu σ = ${s} ${c[1]}. Sur un échantillon de n = ${n} individus, x̄ = ${num(xb)} ${c[1]}. On veut un intervalle de confiance de μ au niveau ${cf} %.`)+stx(S1ES_ZTXT)+S1ES_norm(cf),
    steps:[
      {q:'Quel est l’écart-type de la moyenne X̄ ?',o:[
        {h:`σ/√n = ${s}/${rn} = ${dec(s/rn,4)}`,ok:true,se:s/rn},
        {h:`σ = ${s}`,se:s,why:'X̄ fluctue moins qu’un individu : son écart-type est σ/√n, pas σ.',tag:'s1es-sqrtn'},
        {h:`σ/n = ${s}/${n} = ${dec(s/n,4)}`,se:s/n,why:'C’est la variance qui est divisée par n ; l’écart-type est divisé par √n.',tag:'s1es-sqrtn'}]},
      {q:`Quel quantile pour le niveau ${cf} % ?`,o:[
        {h:`u = ${num(zz)}`,ok:true,u:zz,why:''},
        {h:`u = ${num(cf===95?1.645:1.96)}`,u:cf===95?1.645:1.96,why:`${num(cf===95?1.645:1.96)} laisse ${cf===95?'5 %':'2,5 %'} dans chaque queue : c’est le niveau ${cf===95?'90':'95'} %. Ici on laisse ${num((100-cf)/2)} % de chaque côté.`,tag:'s1es-quant'},
        {h:`u = ${num(cf===95?2.576:2.326)}`,u:cf===95?2.576:2.326,why:cf===95?'2,576 correspond au niveau 99 %.':'2,326 laisse 1 % d’un seul côté : c’est un quantile unilatéral. L’intervalle est bilatéral : 0,5 % de chaque côté.',tag:'s1es-quant'}]},
      {q:'La marge d’erreur vaut…',o:prev=>{const se=prev[0].se,u=prev[1].u;return[
        {h:`E = ${num(u)} × ${dec(se,4)} ≈ ${dec(u*se,3)}`,ok:true,E:u*se,why:''},
        {h:`E = 2 × ${num(u)} × ${dec(se,4)} ≈ ${dec(2*u*se,3)}`,E:2*u*se,why:'La marge est la demi-largeur : on ne multiplie pas par 2.'},
        {h:`E = ${num(u)} × ${dec(se,4)} / √${n} ≈ ${dec(u*se/rn,3)}`,E:u*se/rn,why:'On ne divise par √n qu’une seule fois, en passant de σ à σ/√n.',tag:'s1es-sqrtn'}]}},
      {q:'Conclusion :',o:prev=>{const E=prev[2].E;return[
        {h:`IC = ${I(E)} : cette méthode capture μ dans ${cf} % des échantillons`,ok:true,why:''},
        {h:`IC = ${I(E)} : ${cf} % des individus ont une valeur dans cet intervalle`,why:'L’intervalle concerne la moyenne μ, pas les valeurs individuelles, bien plus dispersées.',tag:'s1es-interp'},
        {h:`IC = ${I(E)} : x̄ a ${cf} % de chances d’être dans cet intervalle`,why:'x̄ est le centre de l’intervalle : il y est toujours. C’est μ, inconnu, qui est visé.',tag:'s1es-interp'}]}}],
    explain:`σ/√n = ${dec(s/rn,4)} ; u = ${num(zz)} ; E = ${num(zz)} × ${dec(s/rn,4)} ≈ ${dec(zz*s/rn,3)}. IC = ${I(zz*s/rn)}. Le niveau ${cf} % est une propriété de la méthode : sur un grand nombre d’échantillons, ${cf} % des intervalles obtenus contiennent μ.`})};
/* 11. Raisonner : IC de Student */
const gS1EsR2=()=>{const c=pick(S1ES_CTX.slice(0,4)),n=R(6,20),nu=n-1,s=+(pick(c[3])*R(8,12)/10).toFixed(1),xb=+(c[2]+R(-30,30)/40*s).toFixed(1),rn=Math.sqrt(n);
  const L={sn1:[S1ES_T975[nu],S1ES_T95[nu],S1ES_T995[nu],`Student à ${nu} ddl`],sn:[S1ES_T975[n],S1ES_T95[n],S1ES_T995[n],`Student à ${n} ddl`],z:[1.96,1.645,2.576,'N(0 ; 1)']};
  return chain({instr:'Construis l’intervalle de confiance à 95 %, étape par étape.',
    prompt:stx(`On étudie ${c[0]} (en ${c[1]}), de loi normale. σ est inconnu. Sur n = ${n} individus : x̄ = ${num(xb)}, s = ${num(s)} (écart-type corrigé).`)+
      dtab([['ν (ddl)',nu,n],['t<sub>0,95</sub>(ν)',num(S1ES_T95[nu]),num(S1ES_T95[n])],['t<sub>0,975</sub>(ν)',num(S1ES_T975[nu]),num(S1ES_T975[n])],['t<sub>0,995</sub>(ν)',num(S1ES_T995[nu]),num(S1ES_T995[n])]])+stx(S1ES_ZTXT),
    steps:[
      {q:'Quelle loi suit (X̄ − μ)/(S/√n) ?',o:[
        {h:`La loi de Student à ${nu} degrés de liberté`,ok:true,L:'sn1',why:''},
        {h:`La loi de Student à ${n} degrés de liberté`,L:'sn',why:`On a estimé μ par x̄ pour calculer s : on perd un degré de liberté, ν = n − 1 = ${nu}.`,tag:'s1es-student'},
        {h:'La loi normale N(0 ; 1)',L:'z',why:'Avec σ remplacé par s et un petit échantillon, la loi normale sous-estime l’incertitude : c’est Student.',tag:'s1es-student'}]},
      {q:'Quel quantile prendre ?',o:prev=>{const l=L[prev[0].L];return[
        {h:`${num(l[0])} (ordre 0,975 de ${l[3]})`,ok:true,t:l[0],why:''},
        {h:`${num(l[1])} (ordre 0,95 de ${l[3]})`,t:l[1],why:'L’intervalle est bilatéral : 2,5 % de chaque côté, donc l’ordre 0,975.',tag:'s1es-quant'},
        {h:`${num(l[2])} (ordre 0,995 de ${l[3]})`,t:l[2],why:'L’ordre 0,995 correspond au niveau 99 %.',tag:'s1es-quant'}]}},
      {q:'La marge d’erreur vaut…',o:prev=>{const t=prev[1].t;return[
        {h:`E = ${num(t)} × ${num(s)}/√${n} ≈ ${dec(t*s/rn,3)}`,ok:true,E:t*s/rn,why:''},
        {h:`E = ${num(t)} × ${num(s)} ≈ ${dec(t*s,3)}`,E:t*s,why:'On oublie de diviser par √n : c’est l’écart-type d’un individu, pas celui de X̄.',tag:'s1es-sqrtn'},
        {h:`E = ${num(t)} × ${num(s)}/√${nu} ≈ ${dec(t*s/Math.sqrt(nu),3)}`,E:t*s/Math.sqrt(nu),why:'Le n − 1 sert au calcul de s et aux degrés de liberté ; la marge divise par √n.'}]}},
      {q:'L’intervalle de confiance est…',o:prev=>{const E=prev[2].E;return[
        {h:`[${dec(xb-E,2)} ; ${dec(xb+E,2)}]`,ok:true,why:''},
        {h:`[${dec(xb-E/2,2)} ; ${dec(xb+E/2,2)}]`,why:'E est déjà la demi-largeur : l’intervalle est [x̄ − E ; x̄ + E].'},
        {h:`[${dec(xb,2)} ; ${dec(xb+E,2)}]`,why:'L’intervalle est symétrique autour de x̄.'}]}}],
    explain:`σ inconnu, population normale : Student à ${nu} ddl, t = ${num(S1ES_T975[nu])}. E = ${num(S1ES_T975[nu])} × ${num(s)}/√${n} ≈ ${dec(S1ES_T975[nu]*s/rn,3)}. IC ≈ [${dec(xb-S1ES_T975[nu]*s/rn,2)} ; ${dec(xb+S1ES_T975[nu]*s/rn,2)}].`})};
/* 12. Raisonner : taille d’échantillon pour une proportion */
const gS1EsR3=()=>{const cf=pick([95,99]),z=S1ES_Z[cf],E=pick([.02,.025,.03,.04,.05]),known=Math.random()<.5,p0=known?pick([.1,.2,.3]):.5;
  return chain({instr:'Détermine la taille d’échantillon, étape par étape.',
    prompt:stx(`Un institut veut estimer une proportion au niveau ${cf} % avec une marge d’erreur d’au plus ${num(E)}. ${known?`Une enquête précédente indique une proportion voisine de ${num(p0)}, à utiliser.`:'On n’a aucune information sur la proportion.'}`)+stx(S1ES_ZTXT),
    steps:[
      {q:'La marge d’erreur s’écrit…',o:[
        {h:mx('E = u √(p(1 − p)/n)'),ok:true,F:'ok',why:''},
        {h:mx('E = u p(1 − p)/n'),F:'nr',why:'Il manque la racine : l’écart-type de F est √(p(1 − p)/n).',tag:'calc'},
        {h:mx('E = u √(p(1 − p))/n'),F:'n',why:'On divise par √n, pas par n.',tag:'s1es-sqrtn'}]},
      {q:'Quelle valeur de p utiliser ?',o:[
        {h:`p = ${num(p0)}`,ok:true,p:p0,why:''},
        {h:known?'p = 0,5':`p = ${num(E)}`,p:known?.5:E,why:known?'0,5 est le cas le plus prudent, mais on dispose ici d’une estimation et la consigne demande de l’utiliser.':'La marge E n’est pas une proportion.'},
        {h:'p = 0, on n’a pas encore de données',p:0,why:'Avec p = 0 la marge serait nulle : absurde. Sans information, on prend le pire cas p = 0,5.'}]},
      {q:'On en déduit…',o:prev=>{const F=prev[0].F,p=prev[1].p,v=p*(1-p),raw=F==='ok'?z*z*v/(E*E):F==='nr'?z*v/E:z*Math.sqrt(v)/E;if(v===0)return[{h:'n ≥ 0 : la marge serait nulle quelle que soit n',ok:true,raw:0,why:''},{h:`n ≥ ${dec(z*z*.25/(E*E),2)}`,raw:z*z*.25/(E*E),why:'Ce calcul suppose p = 0,5, pas la valeur choisie à l’étape précédente.'}];return[
        {h:`n ≥ ${dec(raw,2)}`,ok:true,raw,why:''},
        {h:`n ≥ ${dec(F==='ok'?z*v/(E*E):raw*z,2)}`,raw:F==='ok'?z*v/(E*E):raw*z,why:F==='ok'?'En isolant n, le quantile u apparaît au carré : n ≥ u² p(1 − p)/E².':'Ce calcul ne découle pas de la formule choisie.'},
        {h:`n ≥ ${dec(F==='ok'?z*Math.sqrt(v)/E:raw/z,2)}`,raw:F==='ok'?z*Math.sqrt(v)/E:raw/z,why:F==='ok'?'Il faut élever au carré : √n ≥ u √(p(1 − p))/E donne n ≥ (u √(p(1 − p))/E)².':'Ce calcul ne découle pas de la formule choisie.'}]}},
      {q:'Taille minimale :',o:prev=>{const raw=prev[2].raw,c=Math.ceil(raw-1e-9),f=Math.floor(raw+1e-9);return[
        {h:`n = ${c}`,ok:true,why:''},
        {h:`n = ${f===c?c+1:f}`,why:f===c?'La valeur trouvée est déjà entière : c’est elle, la taille minimale.':'n doit être au moins égal à la valeur trouvée : on arrondit à l’entier supérieur.',tag:'s1es-arr'},
        {h:`n = ${Math.ceil(Math.sqrt(raw))}`,why:'Le calcul donne déjà n, pas √n : inutile de prendre la racine.'}]}}],
    explain:`E = u √(p(1 − p)/n) ≤ ${num(E)} ⟺ n ≥ u² p(1 − p)/E² = ${num(z)}² × ${num(p0)} × ${num(+(1-p0).toFixed(2))} / ${num(E)}² ≈ ${dec(z*z*p0*(1-p0)/(E*E),2)}. Il faut au moins ${Math.ceil(z*z*p0*(1-p0)/(E*E)-1e-9)} personnes.`})};
ANA_UNITS.push({id:'s1-estimation',tr:'s1',name:'Estimation',sub:'Estimateurs, intervalles de confiance, taille d’échantillon',glyph:'IC',tone:'c',
  skills:[SKA('s1.es.voc','Paramètre, estimateur, estimation',gS1EsVoc,1),SKA('s1.es.ponct','Estimer μ et σ²',gS1EsPonct,1),SKA('s1.es.lire','Lire un intervalle de confiance',gS1EsLire,1),
    SKA('s1.es.icz','IC d’une moyenne, σ connu',gS1EsIcz,2),SKA('s1.es.icp','IC d’une proportion',gS1EsIcp,2),SKA('s1.es.marge','Niveau, taille et marge',gS1EsMarge,2),
    SKA('s1.es.taille','Taille d’échantillon',gS1EsTaille,2),SKA('s1.es.r1','Raisonner : IC avec σ connu',gS1EsR1,2),SKA('s1.es.ict','IC de Student',gS1EsIct,3),
    SKA('s1.es.biais','Biais et variance d’un estimateur',gS1EsBiais,3),SKA('s1.es.r2','Raisonner : IC de Student',gS1EsR2,3),SKA('s1.es.r3','Raisonner : taille pour une proportion',gS1EsR3,3)]});
