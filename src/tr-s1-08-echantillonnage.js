/* ===================== STA001 · Fluctuations d’échantillonnage ===================== */
Object.assign(ANA_ERR,{
  's1ec-se':{label:'Écart-type d’une moyenne',tip:'Une moyenne de n valeurs a pour écart-type σ/√n (une somme : σ√n). On centre-réduit avec cet écart-type, pas avec σ.'},
  's1ec-fluct':{label:'Intervalle de fluctuation',tip:'p ± 1,96 √(p(1 − p)/n), avec la proportion SUPPOSÉE p ; si f est dehors, on rejette l’hypothèse au risque de 5 %.'},
  's1ec-biais':{label:'Variance sans biais',tip:'Pour estimer σ², on divise la somme des carrés des écarts par n − 1, pas par n.'},
  's1ec-vocab':{label:'Paramètre ou statistique',tip:'Un paramètre décrit la population (μ, p, σ) ; une statistique est calculée sur l’échantillon (x̄, f, s) et fluctue.'}});
/** Deux cloches : une valeur isolée (σ) et la moyenne (σ/√n) ; aire facultative sous la seconde */
const S1EC_two=(mu,s,se,o={})=>{const x0=mu-3.5*s,x1=mu+3.5*s,f=(m,sd)=>x=>Math.exp(-(((x-m)/sd)**2)/2)/(sd*Math.sqrt(2*Math.PI)),top=1/(se*Math.sqrt(2*Math.PI));
  const g=gp({W:300,H:170,x0,x1,y0:-top*.15,y1:top*1.12,pd:8,N:300});
  if(o.aire)g.area(f(mu,se),()=>0,Math.max(o.aire[0],x0),Math.min(o.aire[1],x1),'var(--t-c)',.45);
  g.seg(x0,0,x1,0,'var(--muted)',1.2).fn(f(mu,s),'var(--muted)',2,'5 4').fn(f(mu,se),'var(--t-sq)',2.4);
  for(let k=-3;k<=3;k++){const x=mu+k*s;g.seg(x,0,x,-top*.03,'var(--muted)',1);g.text(x,0,num(+x.toFixed(3)),'var(--muted)','middle',0,13,9,false)}
  (o.v||[]).forEach(([x,l])=>{g.seg(x,0,x,top*1.02,'var(--t-x)',1.4,'4 3');if(l)g.text(x,top*1.02,l,'var(--t-x)','middle',0,-2,10)});
  return`<div class="qfig">${g.done('Loi d’une valeur isolée (pointillés) et loi de la moyenne (trait plein)')}</div><p class="stxt" style="font-size:.85em;color:var(--muted)">Pointillés : une valeur isolée. Trait plein : la moyenne de l’échantillon.</p>`};
/** Segment de fluctuation [a ; b] sur l’axe des fréquences, avec la fréquence observée f */
const S1EC_seg=(a,b,f,p)=>{const lo=Math.max(0,Math.min(a,f)-.08),hi=Math.min(1,Math.max(b,f)+.08),g=gp({W:300,H:70,x0:lo,x1:hi,y0:-1,y1:1,pd:10});
  g.seg(lo,0,hi,0,'var(--ink)',1.5).seg(a,0,b,0,'var(--t-sq)',7);[a,b].forEach(x=>g.text(x,0,dec(x,3),'var(--t-sq)','middle',0,20,10));
  g.seg(p,-.35,p,.35,'var(--muted)',1.5).text(p,0,'p','var(--muted)','middle',0,-12,10).dot(f,0,'var(--t-x)',6).text(f,0,'f','var(--t-x)','middle',0,-12,12);
  return`<div class="qfig">${g.done('Intervalle de fluctuation et fréquence observée')}</div>`};
const S1EC_N=[[16,4],[25,5],[36,6],[49,7],[64,8],[100,10],[144,12],[400,20]];

/* 1. Vocabulaire : paramètre ou statistique */
const gS1EcVocab=()=>{const[t,ok,ex]=pick([
  ['Dans une usine, la masse moyenne μ de TOUTES les pièces produites',0,'C’est une caractéristique de toute la population : un paramètre, en général inconnu.'],
  ['La masse moyenne x̄ des 50 pièces prélevées ce matin',1,'Elle est calculée sur l’échantillon : c’est une statistique, elle changerait avec un autre prélèvement.'],
  ['La proportion p de tous les électeurs qui votent pour une candidate',0,'Elle porte sur toute la population : c’est un paramètre.'],
  ['La fréquence f = 0,52 obtenue dans un sondage de 1 000 personnes',1,'Calculée sur les 1 000 sondés : c’est une statistique, qui fluctue d’un sondage à l’autre.'],
  ['L’écart-type s des tailles de 30 élèves tirés au hasard dans un lycée',1,'Calculé sur un échantillon : c’est une statistique.'],
  ['L’écart-type σ des tailles de tous les élèves du lycée',0,'Il décrit toute la population : c’est un paramètre.']]);
  return mcq('Est-ce un paramètre ou une statistique ?',stx(t+'.'),[{h:'Un paramètre de la population',ok:ok===0,tag:'s1ec-vocab'},{h:'Une statistique de l’échantillon',ok:ok===1,tag:'s1ec-vocab'},{h:'Ni l’un ni l’autre : c’est une probabilité'}],
    ex,'Calculé sur les individus observés : statistique. Défini sur toute la population : paramètre.',true)};

/* 2. Loi des grands nombres : vrai ou faux */
const gS1EcLgn=()=>{const[t,ok,ex]=pick([
  ['Plus on lance une pièce équilibrée, plus la fréquence de « pile » a tendance à se rapprocher de 0,5.',true,'C’est exactement la loi des grands nombres.'],
  ['Après 6 « pile » consécutifs, « face » est plus probable au lancer suivant.',false,'Les lancers sont indépendants : la probabilité reste 1/2. La loi des grands nombres dilue les écarts, elle ne les compense pas.'],
  ['Sur 1 000 lancers d’une pièce équilibrée, on obtient exactement 500 « pile ».',false,'La fréquence est proche de 0,5, mais le nombre exact fluctue (l’écart-type du nombre de piles vaut environ 16).'],
  ['La moyenne d’un échantillon de 400 personnes fluctue deux fois moins que celle d’un échantillon de 100 personnes.',true,'σ(X̄) = σ/√n : √400 = 2 × √100.'],
  ['Pour diviser par 2 la fluctuation d’une moyenne, il suffit de doubler la taille de l’échantillon.',false,'Il faut la multiplier par 4, car σ(X̄) = σ/√n.'],
  ['Un très grand échantillon de volontaires donne forcément une estimation fiable.',false,'La loi des grands nombres suppose un échantillon aléatoire ; un biais de sélection ne disparaît pas avec la taille.']]);
  return mcq('Vrai ou faux ?',stx(t),[{h:'Vrai',ok:ok},{h:'Faux',ok:!ok}],ex,'Loi des grands nombres : la moyenne se stabilise, en 1/√n, sans « compensation » des écarts passés.',true)};

/* 3. Espérance et écart-type de la moyenne */
const gS1EcMoy=()=>{const[n,r]=pick(S1EC_N),se=pick([.5,1,1.5,2,2.5,3]),s=se*r,mu=pick([20,50,100,250,500]);
  return nq({instr:'Donne l’espérance et l’écart-type de la moyenne X̄.',prompt:stx(`Une grandeur a pour moyenne μ = ${mu} et écart-type σ = ${num(s)} dans la population. On prélève un échantillon aléatoire de n = ${n} individus.`)+S1EC_two(mu,s,se),
    labels:['E(X̄) =','σ(X̄) ='],t:[mu,se],dp:2,
    explain:`E(X̄) = μ = ${mu}. σ(X̄) = σ/√n = ${num(s)}/√${n} = ${num(s)}/${r} = ${num(se)} : la cloche de la moyenne est ${r} fois plus étroite.`,
    hint:'La moyenne garde le même centre μ, mais son écart-type est divisé par √n.',diag:([e,v])=>near(v,s/n,.011)?'s1ec-se':near(v,s,.011)?'s1ec-se':null})};

/* 4. Fréquence d’un échantillon */
const gS1EcProp=()=>{const p=pick([.1,.2,.25,.3,.4,.5,.6]),n=pick([50,100,200,400,500,1000]),sd=Math.sqrt(p*(1-p)/n);
  return nq({instr:'Donne l’espérance et l’écart-type de la fréquence F.',prompt:stx(`Dans une population, une proportion p = ${num(p)} des individus a un caractère. On tire un échantillon aléatoire de n = ${n} individus ; F est la fréquence du caractère dans l’échantillon.`),
    labels:['E(F) =','σ(F) ='],t:[p,sd],dp:4,
    explain:`E(F) = p = ${num(p)} et σ(F) = √(p(1 − p)/n) = √(${num(p)} × ${num(+(1-p).toFixed(2))}/${n}) ≈ ${dec(sd,4)}.`,
    hint:'σ(F) = √(p(1 − p)/n).',diag:([e,v])=>near(v,p*(1-p)/n,.00006)||near(v,Math.sqrt(p*(1-p)*n),.01)?'s1ec-se':null})};

/* 5. Placer μ + 2σ(X̄) (point à placer) */
const gS1EcPlace=()=>{const[n,r]=pick(S1EC_N.slice(0,6)),se=pick([1,2,5]),s=se*r,mu=se*R(5,20),k=pick([-2,-1,1,2]),x=mu+k*se;
  return pointQ({instr:`Place la valeur μ ${k<0?'−':'+'} ${Math.abs(k)} σ(X̄) sur l’axe des moyennes.`,prompt:stx(`Population : μ = ${mu}, σ = ${s}. Échantillon de n = ${n}. ${Math.abs(k)===2?'Environ 2,5 % des moyennes d’échantillon tombent au-delà de ce point.':'Environ 16 % des moyennes d’échantillon tombent au-delà de ce point.'}`),nom:'M',
    x:[mu-4*se,mu+4*se],y:[-.6,.6],snap:se/2,tol:se*.24,cible:[x,0],fond:{ligne:true,pas:se/2,etiq:se},
    explain:`σ(X̄) = ${s}/√${n} = ${s}/${r} = ${se}. μ ${k<0?'−':'+'} ${Math.abs(k)} × ${se} = ${num(x)}.`,
    hint:'Calcule d’abord σ(X̄) = σ/√n.',diag:pt=>Math.abs(pt[0]-(mu+k*s))<se*.3?'s1ec-se':null})};

/* 6. Variance empirique et estimateur sans biais */
const gS1EcVar=()=>{let a;do{const n=R(4,6);a=Array.from({length:n},()=>R(2,20))}while(new Set(a).size<3);const n=a.length,m=meanA(a),SS=a.reduce((t,x)=>t+(x-m)**2,0);
  return nq({instr:'Calcule la variance empirique s² et l’estimation sans biais s*² de σ².',prompt:stx('Échantillon observé :')+dtab([['xᵢ',...a.map(num)]]),labels:['s² =','s*² ='],t:[SS/n,SS/(n-1)],dp:2,
    explain:`x̄ = ${num(a.reduce((t,x)=>t+x,0))}/${n} ${Number.isInteger(m*100)?'=':'≈'} ${dec(m,2)}. Σ (xᵢ − x̄)² ≈ ${dec(SS,2)}. s² = ${dec(SS,2)}/${n} ≈ ${dec(SS/n,2)} et s*² = ${dec(SS,2)}/${n-1} ≈ ${dec(SS/(n-1),2)}.`,
    hint:'Somme des carrés des écarts à la moyenne, divisée par n (s²) puis par n − 1 (s*²).',diag:([u,v])=>near(v,SS/n,.011)&&near(u,SS/(n-1),.011)?'s1ec-biais':null})};

/* 7. TCL : probabilité sur une moyenne */
const gS1EcTlc=()=>{const[n,r]=pick(S1EC_N.filter(([n])=>n>=36)),se=pick([.5,1,2,2.5,4,5]),s=se*r,mu=pick([50,100,200,500]),z=pick([-2.4,-2,-1.6,-1.2,-.8,.8,1,1.2,1.5,2,2.5]),x=+(mu+z*se).toFixed(2),up=Math.random()<.5;
  const t=up?1-Phi(z):Phi(z),bad=up?1-Phi(z/r):Phi(z/r);
  return nq({instr:`Calcule P(X̄ ${up?'>':'<'} ${num(x)}) avec le théorème central limite. Arrondis au millième.`,
    prompt:stx(`Dans une population, μ = ${mu} et σ = ${num(s)}. On prélève un échantillon aléatoire de n = ${n} individus ; X̄ est sa moyenne.`)+S1EC_two(mu,s,se,{aire:up?[x,mu+9*s]:[mu-9*s,x],v:[[x,num(x)]]}),
    labels:['P ='],t:[t],tol:.0011,
    explain:`n = ${n} ≥ 30 : X̄ ≈ N(${mu} ; σ²/n) avec σ(X̄) = ${num(s)}/${r} = ${num(se)}. z = (${num(x)} − ${mu})/${num(se)} = ${num(z)}. P = ${up?`1 − Φ(${num(z)})`:`Φ(${num(z)})`} ≈ ${dec(t,4)}.`,
    hint:'Réduis avec σ/√n : c’est une moyenne, pas une valeur isolée.',diag:([u])=>near(u,bad,.0015)?'s1ec-se':near(u,1-t,.0011)?'s1no-phi':null})};

/* 8. Taille d’échantillon et précision */
const gS1EcN=()=>{const v=R(0,1);
  if(v===0){const n=pick([25,50,100,200]),k=pick([2,3,4,5]);
    return nq({instr:'Combien de personnes faut-il interroger ?',prompt:stx(`Avec ${n} personnes, la moyenne fluctue avec un certain écart-type. On veut diviser cet écart-type par ${k}.`),labels:['n ='],t:[n*k*k],
      explain:`σ(X̄) = σ/√n. Diviser par ${k} demande de multiplier √n par ${k}, donc n par ${k}² = ${k*k} : n = ${n*k*k}.`,hint:'σ/√n : pour diviser par k, il faut multiplier n par k².',diag:([u])=>near(u,n*k,1e-6)?'s1ec-se':null})}
  const s=pick([2,5,10,12,15,20]),e=pick([.5,1,2,2.5]),N=Math.ceil((s/e)**2-1e-9);
  return nq({instr:'Quelle taille minimale n garantit σ(X̄) ≤ e ?',prompt:stx(`L’écart-type de la population vaut σ = ${s}. On veut que l’écart-type de la moyenne soit au plus e = ${num(e)}.`),labels:['n ='],t:[N],
    explain:`σ/√n ≤ ${num(e)} ⟺ √n ≥ ${s}/${num(e)} = ${num(s/e)} ⟺ n ≥ ${num(+((s/e)**2).toFixed(2))}. Il faut au moins n = ${N}.`,hint:'Isole √n, puis élève au carré.',diag:([u])=>near(u,s/e,.6)?'s1ec-se':null})};

/* 9. Intervalle de fluctuation */
const gS1EcIF=()=>{const p=pick([.1,.2,.25,.3,.4,.5,.6,.7]),n=pick([50,80,100,200,400,500,1000]),h=1.96*Math.sqrt(p*(1-p)/n);
  if(n*p<5||n*(1-p)<5)return gS1EcIF();
  return nq({instr:'Calcule les bornes de l’intervalle de fluctuation au seuil de 95 %. Arrondis au millième.',prompt:stx(`On suppose qu’une proportion p = ${num(p)} de la population a un caractère. On tire un échantillon de n = ${n} individus.`),
    labels:['Borne inférieure =','Borne supérieure ='],t:[p-h,p+h],tol:.0011,
    explain:`Conditions : n = ${n} ≥ 30, np = ${num(n*p)} ≥ 5, n(1 − p) = ${num(+(n*(1-p)).toFixed(2))} ≥ 5. √(p(1 − p)/n) ≈ ${dec(Math.sqrt(p*(1-p)/n),4)} ; 1,96 × ${dec(Math.sqrt(p*(1-p)/n),4)} ≈ ${dec(h,4)}. I ≈ [${dec(p-h,3)} ; ${dec(p+h,3)}].`,
    hint:'p ± 1,96 √(p(1 − p)/n).',diag:([a,b])=>near(b-p,1.645*Math.sqrt(p*(1-p)/n),.0015)?'s1no-quant':near(b-p,1.96*p*(1-p)/Math.sqrt(n),.0015)?'s1ec-fluct':null})};

/* 10. Décision à partir d’un intervalle de fluctuation (figure) */
const gS1EcDecide=()=>{const p=pick([.2,.3,.4,.5,.6]),n=pick([100,200,400]),h=1.96*Math.sqrt(p*(1-p)/n),a=p-h,b=p+h,inside=Math.random()<.5;
  const f=+(inside?p+(Math.random()<.5?-1:1)*h*R(2,8)/10:p+(Math.random()<.5?-1:1)*h*R(13,18)/10).toFixed(3),k=Math.round(f*n),fo=k/n,isIn=fo>=a&&fo<=b;
  return mcq('Quelle décision prendre au seuil de 95 % ?',stx(`Un fournisseur affirme que la proportion d’un caractère vaut p = ${num(p)}. Sur un échantillon de ${n} individus, on en observe ${k}, soit f = ${num(fo)}. L’intervalle de fluctuation à 95 % est [${dec(a,3)} ; ${dec(b,3)}].`)+S1EC_seg(a,b,fo,p),
    [{h:'On rejette l’affirmation, au risque de 5 %',ok:!isIn,tag:'s1ec-fluct'},{h:'On ne rejette pas l’affirmation',ok:isIn,tag:'s1ec-fluct'},{h:'On a prouvé que l’affirmation est vraie',tag:'s1ec-fluct'}],
    isIn?`f = ${num(fo)} est dans l’intervalle : l’écart avec p est une fluctuation ordinaire. On ne rejette pas l’affirmation — sans pour autant l’avoir prouvée.`:`f = ${num(fo)} est hors de l’intervalle : un tel écart n’arrive que dans moins de 5 % des échantillons si p = ${num(p)}. On rejette l’affirmation au risque de 5 %.`,
    'Regarde si le point f tombe dans le segment bleu.')};

/* 11. Raisonner : décision avec un intervalle de fluctuation */
const gS1EcR1=()=>{const c=pick([['Une entreprise affirme que {p} % de ses clients sont satisfaits.','clients interrogés','satisfaits'],['Un fabricant affirme que {p} % de ses ampoules durent plus de 1 000 heures.','ampoules testées','durent plus de 1 000 heures'],['Selon l’INSEE, {p} % des habitants d’une région ont plus de 60 ans.','habitants tirés au hasard','ont plus de 60 ans']]);
  const p=pick([.2,.25,.3,.4,.5,.6,.75]),n=pick([100,200,400,500]),sd=Math.sqrt(p*(1-p)/n),off=pick([.6,.8,1.4,1.6,2.2]),k=Math.round(n*(p+(Math.random()<.5?-1:1)*off*1.96*sd)),f=k/n;
  const H={ok:1.96*sd,q:1.645*sd,n:1.96*p*(1-p)/Math.sqrt(n),f:1.96*Math.sqrt(f*(1-f)/n)};
  return chain({instr:'Construis le raisonnement étape par étape.',prompt:stx(`${c[0].replace('{p}',num(p*100))} Sur ${n} ${c[1]}, ${k} ${c[2]}. Cette affirmation est-elle crédible au seuil de 95 % ?`),
    steps:[
      {q:'Avec quelle proportion construit-on l’intervalle de fluctuation ?',o:[
        {h:`p = ${num(p)}, la proportion affirmée`,ok:true},
        {h:`f = ${num(f)}, la fréquence observée`,why:'L’intervalle de fluctuation se construit avec la proportion supposée p ; c’est f qu’on compare ensuite. (Avec f, on ferait un intervalle de confiance.)',tag:'s1ec-fluct'},
        {h:`La moyenne de p et f, ${num(+((p+f)/2).toFixed(4))}`,why:'Aucune règle ne mélange p et f : on teste l’affirmation p.',tag:'s1ec-fluct'}]},
      {q:'Quelle demi-largeur ?',o:[
        {h:`1,96 × √(${num(p)} × ${num(+(1-p).toFixed(2))}/${n}) ≈ ${dec(H.ok,4)}`,ok:true,k:'ok'},
        {h:`1,645 × √(${num(p)} × ${num(+(1-p).toFixed(2))}/${n}) ≈ ${dec(H.q,4)}`,why:'1,645 correspond à 90 % au centre ; pour 95 %, c’est 1,96.',tag:'s1no-quant',k:'q'},
        {h:`1,96 × ${num(p)} × ${num(+(1-p).toFixed(2))}/√${n} ≈ ${dec(H.n,4)}`,why:'La racine porte sur tout p(1 − p)/n, pas seulement sur n.',tag:'s1ec-fluct',k:'n'}].map(o=>({...o,w:H[o.k]}))},
      {q:'La fréquence observée est…',o:prev=>{const w=prev[1].w,inI=Math.abs(f-p)<=w;return[
        {h:`f = ${num(f)}, dans l’intervalle [${dec(p-w,3)} ; ${dec(p+w,3)}]`,ok:inI,why:inI?'':`|f − p| = ${dec(Math.abs(f-p),3)} dépasse la demi-largeur ${dec(w,3)}.`,tag:'calc'},
        {h:`f = ${num(f)}, hors de l’intervalle [${dec(p-w,3)} ; ${dec(p+w,3)}]`,ok:!inI,why:!inI?'':`|f − p| = ${dec(Math.abs(f-p),3)} ne dépasse pas la demi-largeur ${dec(w,3)}.`,tag:'calc'}]}},
      {q:'Conclusion :',o:prev=>{const inI=prev[2].h.includes('dans');return[
        {h:'On rejette l’affirmation, au risque de 5 % de se tromper',ok:!inI,why:'f est dans l’intervalle : l’écart est une fluctuation ordinaire.',tag:'s1ec-fluct'},
        {h:'On ne rejette pas l’affirmation',ok:inI,why:'f est hors de l’intervalle : on rejette l’affirmation.',tag:'s1ec-fluct'},
        {h:'L’affirmation est prouvée vraie',why:'Ne pas rejeter n’est pas prouver : un échantillon ne démontre jamais qu’une proportion vaut exactement p.',tag:'s1ec-fluct'}]}}],
    explain:`I = ${num(p)} ± 1,96 √(${num(p)} × ${num(+(1-p).toFixed(2))}/${n}) ≈ [${dec(p-H.ok,3)} ; ${dec(p+H.ok,3)}]. f = ${num(f)} ${Math.abs(f-p)<=H.ok?'∈ I : on ne rejette pas l’affirmation.':'∉ I : on rejette l’affirmation au risque de 5 %.'}`,
    hint:'Intervalle construit avec p, demi-largeur 1,96 √(p(1 − p)/n), puis comparaison de f.'})};

/* 12. Raisonner : TCL sur une somme */
const gS1EcR2=()=>{const[n,r]=pick([[36,6],[49,7],[64,8],[100,10],[144,12]]),mu=pick([2,5,10,20]),s=pick([1,2,3,4]),z=pick([1,1.25,1.5,2,2.5]),T=n*mu+z*s*r;
  const c=pick([['Un ascenseur transporte {n} colis','la masse totale (en kg)','dépasse {T} kg'],['Un magasin vend {n} articles dans la journée','le chiffre d’affaires total (en €)','dépasse {T} €']]);
  const F=t=>t.replace('{n}',n).replace('{T}',num(T));
  return chain({instr:'Construis le raisonnement étape par étape.',prompt:stx(`${F(c[0])}, indépendants, de moyenne ${mu} et d’écart-type ${s} chacun. On cherche la probabilité que ${c[1]} ${F(c[2])}.`),
    steps:[
      {q:'Espérance de la somme S :',o:[{h:`E(S) = ${n} × ${mu} = ${n*mu}`,ok:true},{h:`E(S) = ${mu}`,why:'C’est l’espérance de la moyenne ; une somme de n termes a pour espérance nμ.',tag:'s1ec-se'},{h:`E(S) = ${mu}/${n}`,why:'On additionne n termes : on multiplie par n.',tag:'s1ec-se'}]},
      {q:'Écart-type de S :',o:[{h:`σ(S) = ${s} × √${n} = ${s*r}`,ok:true,sd:s*r},{h:`σ(S) = ${s} × ${n} = ${s*n}`,why:'Ce sont les variances qui s’additionnent : V(S) = nσ², donc σ(S) = σ√n.',tag:'s1ec-se',sd:s*n},{h:`σ(S) = ${s}/√${n} ≈ ${dec(s/r,3)}`,why:'σ/√n est l’écart-type de la moyenne, pas de la somme.',tag:'s1ec-se',sd:s/r}]},
      {q:'On centre et on réduit :',o:prev=>{const sd=prev[1].sd;return[{h:`z = (${num(T)} − ${n*mu})/${num(+sd.toFixed(3))} ≈ ${dec((T-n*mu)/sd,2)}`,ok:true,z:(T-n*mu)/sd},
        {h:`z = (${num(T)} − ${n*mu})/${num(+(sd*sd).toFixed(3))} ≈ ${dec((T-n*mu)/(sd*sd),2)}`,why:'On divise par l’écart-type, pas par la variance.',tag:'s1no-sigma',z:(T-n*mu)/(sd*sd)}]}},
      {q:'La probabilité vaut environ…',o:prev=>{const zz=prev[2].z,val=1-Phi(zz);return[{h:dec(val,4),ok:true},{h:dec(Phi(zz),4),why:'Φ(z) est l’aire à gauche ; « dépasse » demande l’aire à droite.',tag:'s1no-phi'},
        ...(Math.abs(zz-z)>.01?[{h:dec(1-Phi(z),4),why:'C’est le bon résultat, mais il ne découle pas de tes étapes précédentes.'}]:[])]}}],
    explain:`TCL (n = ${n} ≥ 30) : S ≈ N(${n*mu} ; ${n}×${s}²), σ(S) = ${s}√${n} = ${s*r}. z = (${num(T)} − ${n*mu})/${s*r} = ${num(z)}, P(S > ${num(T)}) = 1 − Φ(${num(z)}) ≈ ${dec(1-Phi(z),4)}.`,
    hint:'Somme : E = nμ, σ = σ√n ; puis centrer-réduire et prendre l’aire à droite.'})};

ANA_UNITS.push({id:'s1-echantillonnage',tr:'s1',name:'Échantillonnage',sub:'Moyenne d’échantillon, grands nombres, TCL, fluctuation',glyph:'σ/√n',tone:'c',
  skills:[SKA('s1.ec.vocab','Paramètre ou statistique',gS1EcVocab,1),SKA('s1.ec.lgn','Loi des grands nombres',gS1EcLgn,1),SKA('s1.ec.moy','Loi de la moyenne X̄',gS1EcMoy,1),
    SKA('s1.ec.prop','Loi de la fréquence F',gS1EcProp,1),SKA('s1.ec.place','Placer μ ± kσ/√n',gS1EcPlace,1),SKA('s1.ec.var','Variance sans biais',gS1EcVar,2),
    SKA('s1.ec.tlc','Théorème central limite',gS1EcTlc,2),SKA('s1.ec.n','Taille d’échantillon',gS1EcN,2),SKA('s1.ec.if','Intervalle de fluctuation',gS1EcIF,2),
    SKA('s1.ec.decide','Décider avec la fluctuation',gS1EcDecide,2),SKA('s1.ec.r1','Raisonner : une affirmation crédible ?',gS1EcR1,3),SKA('s1.ec.r2','Raisonner : TCL sur une somme',gS1EcR2,3)]});
