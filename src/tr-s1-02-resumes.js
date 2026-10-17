/* ===================== STA001 · Résumés numériques ===================== */
Object.assign(ANA_ERR,{
  's1-centre':{label:'Centre de classe',tip:'Pour une série en classes, chaque classe [a ; b[ est représentée par son centre (a + b)/2, pondéré par l’effectif.'},
  's1-mode':{label:'Mode ou classe modale',tip:'Le mode est la valeur la plus fréquente (pas son effectif). À classes inégales, la classe modale est celle de plus grande densité.'},
  's1-aff':{label:'Transformation affine',tip:'Si y = ax + b : ȳ = a x̄ + b, mais σ_y = |a| σ_x et V(y) = a² V(x). Ajouter b ne change pas la dispersion.'},
  's1-out':{label:'Valeurs aberrantes',tip:'Bornes : Q1 − 1,5 × (Q3 − Q1) et Q3 + 1,5 × (Q3 − Q1). Est aberrante toute valeur en dehors de cet intervalle.'}});

/** Boîte à moustaches : v = {min, q1, me, q3, max}, o.x : fenêtre, o.pts : points isolés, o.f : bornes [lo, hi] tracées en pointillés, o.lab : étiquettes */
const S1RE_box=(v,o={})=>{const[x0,x1]=o.x||[v.min-(v.max-v.min)*.1,v.max+(v.max-v.min)*.1],g=gp({W:300,H:120,x0,x1,y0:-.35,y1:1.15,pd:10}),pas=o.pas||((x1-x0)>60?10:(x1-x0)>25?5:(x1-x0)>12?2:1);
  g.seg(x0,0,x1,0,'var(--muted)',1.2);for(let t=Math.ceil(x0/pas)*pas;t<=x1;t+=pas){g.seg(t,-.05,t,.05,'var(--muted)',1);g.text(t,0,num(t),'var(--muted)','middle',0,13,9,false)}
  const lo=o.wl??v.min,hi=o.wh??v.max;
  g.seg(lo,.55,v.q1,.55,'var(--ink)',1.8).seg(v.q3,.55,hi,.55,'var(--ink)',1.8).seg(lo,.42,lo,.68,'var(--ink)',1.8).seg(hi,.42,hi,.68,'var(--ink)',1.8);
  g.rect(v.q1,.3,v.q3,.8,'var(--t-sq)',.25,'var(--t-sq)').seg(v.me,.3,v.me,.8,'var(--t-x)',2.6);
  (o.pts||[]).forEach(x=>g.dot(x,.55,'var(--bad)',4));
  if(o.f)o.f.forEach(x=>g.seg(x,.2,x,.95,'var(--t-c)',1.5,'4 3'));
  if(o.lab!==false){g.text(v.q1,.8,'Q1','var(--ink)','end',2,-4,10).text(v.me,.3,'Me','var(--t-x)','middle',0,11,10).text(v.q3,.8,'Q3','var(--ink)','start',-2,-4,10)}
  return`<div class="qfig">${g.done('Boîte à moustaches')}</div>`};
const s1ReKH=(xs,ns)=>{const N=sumA(ns),S=sumA(xs.map((x,i)=>x*ns[i])),S2=sumA(xs.map((x,i)=>x*x*ns[i])),m=S/N,q=S2/N;return{N,S,S2,m,q,V:q-m*m}};

/* 1. Mode ou classe modale */
const gS1ReMode=()=>{if(Math.random()<.5){const xs=[0,1,2,3,4,5];let ns;do ns=xs.map(()=>R(1,15));while(ns.filter(n=>n===Math.max(...ns)).length>1);
    const m=ns.indexOf(Math.max(...ns)),o2=ns.map((n,i)=>[n,i]).filter(([,i])=>i!==m).sort((a,b)=>b[0]-a[0])[0][1];
    const O=[{h:`La valeur ${m}`,ok:true},{h:`La valeur ${o2}`,tag:'s1-mode'},{h:`${ns[m]}, la hauteur du plus haut bâton`,tag:'s1-mode'}];if(m!==5)O.push({h:'La valeur 5, la plus grande',tag:'s1-mode'});
    return mcq('Quel est le mode de cette série ?',stx('Nombre de jours d’arrêt maladie pris dans l’année par les salariés d’une agence.')+S1DE_bars(xs,ns,{yl:'effectif'}),O,
      `Le mode est la valeur qui a le plus grand effectif : la valeur ${m} (effectif ${ns[m]}). L’effectif ${ns[m]} n’est pas le mode, c’est le nombre de salariés concernés.`,'Cherche le plus haut bâton, puis lis la valeur sous ce bâton.')}
  let t,C,iD,iN;do{({t,C}=s1DeGenCls());const D=C.map(c=>c[2]/(c[1]-c[0])),Nn=C.map(c=>c[2]);iD=D.indexOf(Math.max(...D));iN=Nn.indexOf(Math.max(...Nn));
    if(D.filter(d=>d===D[iD]).length>1||Nn.filter(n=>n===Nn[iN]).length>1)iN=iD}while(iN===iD);
  return mcq('Quelle est la classe modale ?',stx(`${t}. Les classes n’ont pas la même amplitude.`)+dtab([['Classe',...C.map(c=>`[${c[0]} ; ${c[1]}[`)],['Effectif',...C.map(c=>c[2])]])+S1DE_hist(C,{dens:true,lab:()=>''}),
    C.map((c,i)=>({h:`[${num(c[0])} ; ${num(c[1])}[`,ok:i===iD,tag:i===iN?'s1-mode':undefined})),
    `À classes inégales, on compare les densités (effectif ÷ amplitude) : ${C.map(c=>dec(c[2]/(c[1]-c[0]),2)).join(' ; ')}. La plus grande est celle de [${C[iD][0]} ; ${C[iD][1]}[, le plus haut rectangle de l’histogramme. La classe [${C[iN][0]} ; ${C[iN][1]}[ a le plus grand effectif, mais elle est large.`,
    'Classe modale = plus grande densité, c’est-à-dire le rectangle le plus haut d’un histogramme correctement tracé.',true)};
/* 2. Moyenne pondérée */
const gS1ReMoy=()=>{const x0=pick([0,8]),xs=Array.from({length:R(4,6)},(_,i)=>x0+i),ns=xs.map(()=>R(1,12)),{N,S,m}=s1ReKH(xs,ns);
  return nq({instr:'Calcule la moyenne de la série.',prompt:stx(x0?'Notes obtenues à un contrôle.':'Nombre de séances de sport par semaine.')+S1DE_bars(xs,ns,{yl:'effectif'}),labels:['x̄ ='],t:[m],dp:2,
    explain:`N = ${ns.join(' + ')} = ${N}. Σ nᵢxᵢ = ${xs.map((x,i)=>`${ns[i]} × ${x}`).join(' + ')} = ${S}. x̄ = ${S} ÷ ${N} ≈ ${dec(m,2)}.`,
    hint:'Chaque valeur compte autant de fois que son effectif : x̄ = Σ nᵢxᵢ ÷ N.',diag:([v])=>near(v,meanA(xs))||near(v,S/xs.length)?'stat-weight':null})};
/* 3. Placer la médiane (pointQ) */
const gS1ReMedPt=()=>{const n=R(6,9),a=shuffle([0,1,2,3,4,5,6,7,8,9,10]).slice(0,n),me=medA(a),t=sortA(a);
  return pointQ({instr:'Place la médiane de la série sur la droite graduée.',prompt:serie(a)+stx('Chaque valeur est représentée par un point gris.'),nom:'Me',
    x:[-.5,10.5],y:[-2,2],snap:.5,tol:.24,cible:[me,0],fond:{ligne:true,pas:.5,etiq:1,pts:a.map(v=>[v,0,''])},
    explain:`Série rangée : ${t.map(num).join(' ; ')}. ${n%2?`n = ${n} impair : la médiane est la valeur de rang ${(n+1)/2}, soit ${num(me)}.`:`n = ${n} pair : la médiane est la moyenne des valeurs de rangs ${n/2} et ${n/2+1} : (${t[n/2-1]} + ${t[n/2]}) ÷ 2 = ${num(me)}.`} Il y a autant de points de chaque côté.`,
    hint:'Compte les points depuis la gauche : la médiane laisse autant de points à sa gauche qu’à sa droite.'})};
/* 4. Quartiles et écart interquartile */
const gS1ReQuart=()=>{const n=R(9,15),a=Array.from({length:n},()=>R(1,40)),t=sortA(a),q1=q1A(a),q3=q3A(a),r1=Math.ceil(n/4),r3=Math.ceil(3*n/4);
  return nq({instr:'Détermine Q1, Q3 et l’écart interquartile.',prompt:serie(a),labels:['Q1 =','Q3 =','Q3 − Q1 ='],t:[q1,q3,q3-q1],
    explain:`Série rangée : ${t.map(num).join(' ; ')}. n = ${n}. Q1 : rang ⌈${n}/4⌉ = ${r1}, Q1 = ${q1}. Q3 : rang ⌈3 × ${n}/4⌉ = ${r3}, Q3 = ${q3}. Écart interquartile : ${q3} − ${q1} = ${q3-q1}.`,
    hint:'Range la série. Q1 est la valeur de rang n/4 arrondi à l’entier supérieur ; Q3 celle de rang 3n/4 arrondi à l’entier supérieur.',
    diag:([u,v])=>near(u,t[Math.floor(n/4)-1]??NaN,1e-6)||near(v,t[Math.floor(3*n/4)-1],1e-6)?'stat-quart':near(u,a[r1-1],1e-6)?'stat-median':null})};
/* 5. Variance et écart-type (König-Huygens) */
const gS1ReVar=()=>{const xs=sortA(shuffle([0,1,2,3,4,5,6,7,8]).slice(0,4)),ns=xs.map(()=>R(1,9)),K=s1ReKH(xs,ns),sd=Math.sqrt(K.V);
  return nq({instr:'Calcule la variance et l’écart-type.',prompt:stx('Nombre d’heures supplémentaires effectuées dans la semaine.')+dtab([['xᵢ',...xs],['nᵢ',...ns]])+S1DE_bars(xs,ns,{yl:'effectif'}),labels:['V =','σ ='],t:[K.V,sd],dp:2,
    explain:`N = ${K.N}, x̄ = ${K.S} ÷ ${K.N} ≈ ${dec(K.m,4)}. Moyenne des carrés : Σ nᵢxᵢ² ÷ N = ${K.S2} ÷ ${K.N} ≈ ${dec(K.q,4)}. König-Huygens : V = ${dec(K.q,4)} − ${dec(K.m,4)}² ≈ ${dec(K.V,2)}, σ = √V ≈ ${dec(sd,2)}.`,
    hint:'V = (moyenne des carrés) − (carré de la moyenne), en pondérant par les effectifs. Puis σ = √V.',
    diag:([v,s])=>near(v,K.q)||near(v,K.q-K.m)||near(v,varA(xs))||near(s,K.V)?'stat-var':null})};
/* 6. Coefficient de variation */
const S1RE_CV=[['Prix de vente des maisons d’une ville','€',[180000,320000,10000],[20000,60000,1000]],['Temps de livraison d’un transporteur','h',[24,72,1],[3,15,1]],['Salaire mensuel net dans une PME','€',[1800,3500,50],[200,900,10]],['Masse des colis expédiés','kg',[2,12,.5],[.4,3,.1]]];
const gS1ReCv=()=>{const[t,u,M,Sd]=pick(S1RE_CV),m=+(R(M[0]/M[2],M[1]/M[2])*M[2]).toFixed(2),s=+(R(Sd[0]/Sd[2],Sd[1]/Sd[2])*Sd[2]).toFixed(2),cv=s/m*100;
  return nq({instr:'Calcule le coefficient de variation (en %).',prompt:stx(`${t} : moyenne x̄ = ${num(m)} ${u}, écart-type σ = ${num(s)} ${u}.`),labels:['CV (en %) ='],t:[cv],dp:1,
    explain:`CV = σ ÷ x̄ = ${num(s)} ÷ ${num(m)} ≈ ${dec(s/m,4)}, soit ${dec(cv,1)} %. Sans unité, il permet de comparer la dispersion de séries de tailles ou d’unités différentes.`,
    hint:'CV = écart-type ÷ moyenne, puis × 100.',diag:([v])=>near(v,m/s*100,.06)||near(v,s/m,.002)?'calc':null})};
/* 7. Effet d'une transformation affine */
const gS1ReAff=()=>{const v=R(0,3);let a,b,ctx,m,s;
  if(v===0){m=R(8,24);s=pick([2,2.5,3,4,5]);a=1.8;b=32;ctx=`Températures relevées en °C : moyenne ${num(m)} °C, écart-type ${num(s)} °C. On les convertit en °F avec y = 1,8x + 32.`}
  else if(v===1){m=R(18,32)*100;s=R(2,9)*50;const t=pick([2,3,4,5]);a=1+t/100;b=pick([50,80,100]);ctx=`Salaires d’une équipe : moyenne ${num(m)} €, écart-type ${num(s)} €. Chacun est augmenté de ${t} %, puis reçoit une prime fixe de ${b} € : y = ${num(a)}x + ${b}.`}
  else if(v===2){m=R(8,14);s=pick([2,2.5,3,3.5,4]);a=.8;b=4;ctx=`Notes d’un contrôle : moyenne ${num(m)}, écart-type ${num(s)}. Le professeur remplace chaque note x par y = 0,8x + 4.`}
  else{m=R(6,14);s=pick([2,2.5,3,4]);a=-1;b=20;ctx=`Notes sur 20 : moyenne ${num(m)}, écart-type ${num(s)}. On s’intéresse aux points perdus y = 20 − x.`}
  return nq({instr:'Calcule la moyenne et l’écart-type de la nouvelle série.',prompt:stx(ctx),labels:['ȳ =','σ<sub>y</sub> ='],t:[a*m+b,Math.abs(a)*s],dp:2,
    explain:`ȳ = a x̄ + b = ${num(a)} × ${num(m)} ${b<0?'−':'+'} ${Math.abs(b)} = ${dec(a*m+b,2)}. σ_y = |a| × σ_x = ${num(Math.abs(a))} × ${num(s)} = ${dec(Math.abs(a)*s,2)} : la constante b décale les valeurs sans changer leur dispersion.`,
    hint:'La moyenne suit la transformation ; l’écart-type est seulement multiplié par |a|.',diag:([u,w])=>near(w,a*s+b)||near(w,a*a*s)?'s1-aff':near(w,a*s)&&a<0?'signe':null})};
/* 8. Moyenne d'une série en classes */
const gS1ReCls=()=>{const w=pick([5,10,20]),a0=pick([0,10,20,40]),k=R(4,6),C=Array.from({length:k},(_,i)=>[a0+i*w,a0+(i+1)*w,R(1,12)]),N=sumA(C.map(c=>c[2])),cs=C.map(c=>(c[0]+c[1])/2),S=sumA(cs.map((c,i)=>c*C[i][2])),m=S/N;
  return nq({instr:'Estime la moyenne à l’aide des centres des classes.',prompt:stx('Durée (en minutes) des appels reçus par un service client.')+S1DE_hist(C),labels:['x̄ ≈'],t:[m],dp:2,
    explain:`Centres : ${cs.map(num).join(' ; ')}. N = ${N}. x̄ ≈ (${cs.map((c,i)=>`${C[i][2]} × ${num(c)}`).join(' + ')}) ÷ ${N} = ${num(S)} ÷ ${N} ≈ ${dec(m,2)}. C’est une estimation : on ne connaît plus les valeurs exactes.`,
    hint:'Remplace chaque classe par son centre (a + b)/2, puis fais la moyenne pondérée par les effectifs.',
    diag:([v])=>near(v,meanA(cs))?'stat-weight':near(v,m-w/2)||near(v,m+w/2)?'s1-centre':null})};
/* 9. Médiane ou quartile d'une série en classes (interpolation) */
const gS1ReMedCls=()=>{const p=pick([50,50,25,75]),B=[0,20,40,60,80,100];let ns,F,k;
  do{ns=Array.from({length:5},()=>R(1,7));F=[0];ns.forEach(n=>F.push(F[F.length-1]+n*5));k=F.findIndex(f=>f>p)}while(sumA(ns)!==20||F[k-1]===p);
  const nom=p===50?'Me':p===25?'Q1':'Q3',x=B[k-1]+(p-F[k-1])/(F[k]-F[k-1])*20;
  return nq({instr:`Estime ${p===50?'la médiane':p===25?'le premier quartile':'le troisième quartile'} par interpolation linéaire.`,prompt:stx('Notes sur 100 de 20 candidats, regroupées en classes. On lit sur le polygone des fréquences cumulées l’abscisse où il atteint '+p+' %.')+
      dtab([['Classe',...ns.map((_,i)=>`[${B[i]} ; ${B[i+1]}[`)],['Effectif',...ns]])+S1DE_poly(B,F,{h:p}),labels:[`${nom} ≈`],t:[x],dp:2,
    explain:`${p} % est atteint dans la classe [${B[k-1]} ; ${B[k]}[, où F passe de ${F[k-1]} % à ${F[k]} %. ${nom} ≈ ${B[k-1]} + (${p} − ${F[k-1]}) ÷ (${F[k]} − ${F[k-1]}) × 20 ≈ ${dec(x,2)}.`,
    hint:'Repère la classe où la fréquence cumulée franchit le seuil, puis fais une règle de trois sur le segment du polygone.',
    diag:([v])=>near(v,B[k-1])||near(v,B[k])||near(v,(B[k-1]+B[k])/2)?'stat-median':null})};
/* 10. Valeurs aberrantes (règle de Tukey) */
const gS1ReOut=()=>{const n=R(10,13);let a;do{a=Array.from({length:n},()=>R(14,30));const k=R(1,2);for(let i=0;i<k;i++)a[i]=Math.random()<.75?R(42,60):R(0,3)}while(q3A(a)===q1A(a));
  const t=sortA(a),q1=q1A(a),q3=q3A(a),e=q3-q1,lo=q1-1.5*e,hi=q3+1.5*e,out=t.filter(x=>x<lo||x>hi),me=medA(a);
  return nq({instr:'Calcule les bornes de la règle des 1,5 EIQ et compte les valeurs aberrantes.',prompt:stx(`Durées (en jours) de traitement de ${n} dossiers, rangées : ${t.join(' ; ')}.`)+S1RE_box({min:t[0],q1,me,q3,max:t[n-1]},{x:[t[0]-4,t[n-1]+4],pas:t[n-1]-t[0]>40?10:5})+stx(`On a Q1 = ${q1} et Q3 = ${q3}.`),
    labels:['Borne basse =','Borne haute =','Nombre de valeurs aberrantes ='],t:[lo,hi,out.length],dp:1,
    explain:`EIQ = ${q3} − ${q1} = ${e}. Bornes : ${q1} − 1,5 × ${e} = ${num(lo)} et ${q3} + 1,5 × ${e} = ${num(hi)}. Valeurs en dehors de [${num(lo)} ; ${num(hi)}] : ${out.length?out.join(' ; '):'aucune'}, soit ${out.length}. Sur une boîte « de Tukey », elles seraient dessinées comme des points isolés.`,
    hint:'EIQ = Q3 − Q1. Les bornes sont Q1 − 1,5 × EIQ et Q3 + 1,5 × EIQ.',diag:([u,v])=>near(u,q1-e)||near(v,q3+e)||near(v,q3+1.5*q3)?'s1-out':null})};
/* 11. Raisonner : médiane et premier quartile */
const gS1ReR1=()=>{const n=pick([10,14]);let a;do a=Array.from({length:n},()=>R(2,40));while(new Set(a).size<n-1||medA(a)===(a[n/2-1]+a[n/2])/2);
  const s=sortA(a),rule=(L,r)=>r==='ok'?(L[n/2-1]+L[n/2])/2:r==='lo'?L[n/2-1]:L[n/2],rk=Math.ceil(n/4),rf=Math.floor(n/4);
  return chain({instr:'Détermine la médiane puis Q1, en construisant ton raisonnement.',prompt:serie(a),
    steps:[
      {q:'Première étape :',o:[{h:'ranger les valeurs dans l’ordre croissant',ok:true,c:'tri'},{h:'garder les valeurs dans l’ordre de l’énoncé',c:'brut',why:'Médiane et quartiles se lisent sur la série rangée : l’ordre de l’énoncé est arbitraire.',tag:'stat-median'},
        {h:'calculer d’abord la moyenne',c:'moy',why:'La médiane ne se déduit pas de la moyenne : elle se lit au milieu de la série rangée.',tag:'stat-median'}]},
      {q:`n = ${n} est pair. La médiane est…`,o:[{h:`la moyenne des valeurs de rangs ${n/2} et ${n/2+1}`,ok:true,r:'ok'},{h:`la valeur de rang ${n/2}`,r:'lo',why:'Avec n pair, il y a deux valeurs centrales : on prend leur moyenne.',tag:'stat-median'},
        {h:`la valeur de rang ${n/2+1}`,r:'hi',why:'Avec n pair, il y a deux valeurs centrales : on prend leur moyenne.',tag:'stat-median'}]},
      {q:'Donc…',o:prev=>{const L=prev[0].c==='brut'?a:s,r=prev[1].r;
        return[...['ok','lo','hi'].map(x=>({h:`Me = ${num(rule(L,x))}`,ok:x===r,why:x===r?'':'Ce n’est pas la valeur donnée par la règle choisie à l’étape précédente.'})),
          {h:`Me = ${dec(meanA(a),2)}`,why:'C’est la moyenne, pas la médiane.',tag:'stat-median'},
          {h:`Me = ${num(L[n/2-1]+L[n/2])}`,why:'Il manque la division par 2 : on fait la moyenne des deux valeurs centrales.',tag:'stat-median'}]}},
      {q:'Premier quartile :',o:prev=>{const L=prev[0].c==='brut'?a:s;
        return[{h:`rang ⌈${n}/4⌉ = ${rk} : Q1 = ${L[rk-1]}`,ok:true},{h:`rang ⌊${n}/4⌋ = ${rf} : Q1 = ${L[rf-1]}`,why:'Le rang de Q1 est n/4 arrondi à l’entier supérieur.',tag:'stat-quart'},
          {h:`Q1 = ${n}/4 = ${num(n/4)}`,why:`${num(n/4)} est un rang (une position), pas une valeur de la série.`,tag:'stat-quart'}]}}],
    explain:`Série rangée : ${s.join(' ; ')}. n = ${n} pair : Me = (${s[n/2-1]} + ${s[n/2]}) ÷ 2 = ${num(medA(a))}. Q1 : rang ⌈${n}/4⌉ = ${rk}, Q1 = ${s[rk-1]}.`})};
/* 12. Raisonner : variance par König-Huygens */
const gS1ReR2=()=>{const xs=sortA(shuffle([0,1,2,3,4,5,6,7,8,9,10]).slice(0,4)),ns=xs.map(()=>R(1,8)),K=s1ReKH(xs,ns),p=xs.length,f=v=>dec(v,3);
  const mu=sumA(xs)/p,qx=sumA(xs.map(x=>x*x))/p;
  return chain({instr:'Calcule l’écart-type, en construisant ton raisonnement.',prompt:dtab([['xᵢ',...xs],['nᵢ',...ns]])+stx(`N = ${K.N}.`),
    steps:[
      {q:'La moyenne vaut…',o:[{h:`Σnᵢxᵢ ÷ N = ${K.S} ÷ ${K.N} ≈ ${f(K.m)}`,ok:true,m:K.m},{h:`Σxᵢ ÷ ${p} = ${sumA(xs)} ÷ ${p} ≈ ${f(mu)}`,m:mu,why:'Chaque valeur doit compter autant de fois que son effectif.',tag:'stat-weight'},
        {h:`Σnᵢxᵢ ÷ ${p} = ${K.S} ÷ ${p} ≈ ${f(K.S/p)}`,m:K.S/p,why:'On divise par l’effectif total N, pas par le nombre de valeurs distinctes.',tag:'stat-weight'}]},
      {q:'La moyenne des carrés vaut…',o:[{h:`Σnᵢxᵢ² ÷ N = ${K.S2} ÷ ${K.N} ≈ ${f(K.q)}`,ok:true,q:K.q},{h:`Σxᵢ² ÷ ${p} ≈ ${f(qx)}`,q:qx,why:'Les carrés aussi doivent être pondérés par les effectifs.',tag:'stat-weight'},
        {h:`(Σnᵢxᵢ ÷ N)² ≈ ${f(K.m*K.m)}`,q:K.m*K.m,why:'C’est le carré de la moyenne, pas la moyenne des carrés.',tag:'stat-var'}]},
      {q:'La variance vaut…',o:prev=>{const m=prev[0].m,q=prev[1].q;
        return[{h:`V = ${f(q)} − ${f(m)}² ≈ ${f(q-m*m)}`,ok:true,V:q-m*m},{h:`V = ${f(q)} − ${f(m)} ≈ ${f(q-m)}`,V:q-m,why:'König-Huygens : on retranche le carré de la moyenne.',tag:'stat-var'},
          {h:`V = ${f(m)}² − ${f(q)} ≈ ${f(m*m-q)}`,V:m*m-q,why:'C’est la moyenne des carrés moins le carré de la moyenne, pas l’inverse.',tag:'stat-var'}]}},
      {q:'L’écart-type vaut…',o:prev=>{const V=prev[2].V;if(!(V>1e-9))return[{h:'Impossible : la variance trouvée n’est pas positive, il y a une erreur plus haut',ok:true},{h:`σ = ${f(Math.abs(V))}`,why:'Une variance est toujours positive : reprends les étapes précédentes.'}];
        return[{h:`σ = √V ≈ ${f(Math.sqrt(V))}`,ok:true},{h:`σ = V ≈ ${f(V)}`,why:'Il manque la racine carrée : σ est dans l’unité des données.',tag:'stat-var'},
          {h:`σ = √(V ÷ N) ≈ ${f(Math.sqrt(V/K.N))}`,why:'V est déjà une moyenne : on ne divise pas une seconde fois par N.',tag:'stat-var'}]}}],
    explain:`x̄ = ${K.S} ÷ ${K.N} ≈ ${f(K.m)} ; moyenne des carrés ${K.S2} ÷ ${K.N} ≈ ${f(K.q)} ; V = ${f(K.q)} − ${f(K.m)}² ≈ ${f(K.V)} ; σ = √V ≈ ${f(Math.sqrt(K.V))}.`})};

ANA_UNITS.push({id:'s1-resumes',tr:'s1',name:'Résumés numériques',sub:'Moyenne, médiane, quartiles, variance, boîte à moustaches',glyph:'<i>x̄</i>',tone:'x',
  skills:[SKA('s1.re.mode','Mode et classe modale',gS1ReMode,1),SKA('s1.re.moy','Moyenne pondérée',gS1ReMoy,1),SKA('s1.re.medpt','Placer la médiane',gS1ReMedPt,1),
    SKA('s1.re.quart','Quartiles et écart interquartile',gS1ReQuart,2),SKA('s1.re.var','Variance et écart-type',gS1ReVar,2),SKA('s1.re.cv','Coefficient de variation',gS1ReCv,2),
    SKA('s1.re.aff','Transformation affine',gS1ReAff,2),SKA('s1.re.cls','Moyenne d’une série en classes',gS1ReCls,2),SKA('s1.re.r1','Raisonner : médiane et quartile',gS1ReR1,2),
    SKA('s1.re.medcls','Médiane d’une série en classes',gS1ReMedCls,3),SKA('s1.re.out','Valeurs aberrantes',gS1ReOut,3),SKA('s1.re.r2','Raisonner : variance',gS1ReR2,3)]});
