/* ===================== STA001 · Tests d’hypothèses ===================== */
Object.assign(ANA_ERR,{
  's1te-hyp':{label:'Hypothèses mal posées',tip:'H0 contient toujours l’égalité (μ = μ0) ; H1 traduit le soupçon : ≠, > ou < selon l’énoncé.'},
  's1te-cote':{label:'Mauvais côté',tip:'Le sens de H1 fixe le côté de la région critique : H1 : μ > μ0 → rejet pour Z grand ; μ < μ0 → Z très négatif ; ≠ → les deux côtés.'},
  's1te-h0':{label:'« H0 est vraie »',tip:'Ne pas rejeter H0 ne prouve pas qu’elle est vraie : les données sont seulement compatibles avec elle.'},
  's1te-sqrtn':{label:'Oubli de √n',tip:'La statistique compare l’écart x̄ − μ0 à l’écart-type de X̄, qui vaut σ/√n.'},
  's1te-quant':{label:'Mauvais seuil critique',tip:'À 5 % : 1,96 en bilatéral (2,5 % de chaque côté), 1,645 en unilatéral (5 % d’un seul côté).'},
  's1te-risque':{label:'Risques confondus',tip:'α = P(rejeter H0 alors qu’elle est vraie) ; β = P(ne pas rejeter H0 alors qu’elle est fausse) ; puissance = 1 − β.'},
  's1te-pval':{label:'Calcul de la p-valeur',tip:'Bilatéral : p = 2(1 − Φ(|z|)) ; à droite : 1 − Φ(z) ; à gauche : Φ(z).'}});
const S1TE_phi=x=>Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);
const S1TE_C={0:{.05:1.96,.01:2.576,.1:1.645},1:{.05:1.645,.01:2.326,.1:1.282}};
const S1TE_QTXT='Quantiles de N(0 ; 1) : u<sub>0,90</sub> = 1,282 ; u<sub>0,95</sub> = 1,645 ; u<sub>0,975</sub> = 1,96 ; u<sub>0,99</sub> = 2,326 ; u<sub>0,995</sub> = 2,576.';
/** Loi N(0 ; 1) sous H0 : région critique en rouge, statistique z (facultative), p-valeur */
const S1TE_fig=(side,al,z,pv)=>{const g=gp({W:300,H:150,x0:-4,x1:4,y0:-.07,y1:.46,pd:8}),c=S1TE_C[side===0?0:1][al],f=S1TE_phi;
  if(side!==1)g.area(f,()=>0,-4,-c,'var(--bad)',.3);if(side!==2)g.area(f,()=>0,c,4,'var(--bad)',.3);
  if(pv&&z!=null){if(side===0)g.area(f,()=>0,Math.abs(z),4,'var(--t-sq)',.45).area(f,()=>0,-4,-Math.abs(z),'var(--t-sq)',.45);else if(side===1)g.area(f,()=>0,z,4,'var(--t-sq)',.45);else g.area(f,()=>0,-4,z,'var(--t-sq)',.45)}
  g.seg(-4,0,4,0,'var(--muted)',1.2).fn(f,'var(--ink)',2);
  if(side!==1)g.text(-c,0,MINUS+num(c),'var(--bad)','middle',0,13,10);if(side!==2)g.text(c,0,num(c),'var(--bad)','middle',0,13,10);
  if(z!=null&&Math.abs(z)<4)g.seg(z,0,z,.41,'var(--t-sq)',2.4).text(z,.41,'z','var(--t-sq)','middle',0,-2,11);
  g.text(-3.9,.43,'Sous H0 : Z suit N(0 ; 1)','var(--muted)','start',0,0,9,false);
  return`<div class="qfig">${g.done('Loi de Z sous H0 et région critique')}</div>`};
const S1TE_SIDE=['μ ≠','μ >','μ <'];
const S1TE_CTX=[['La masse moyenne des paquets doit être de {m} g. On veut détecter un déréglage de la machine dans un sens ou dans l’autre.',0,'g',500,[6,8,10,12]],
  ['Un fabricant annonce que ses ampoules durent en moyenne {m} h. Une association soupçonne qu’elles durent moins longtemps.',2,'h',1000,[60,80,100,120]],
  ['Le temps d’attente moyen annoncé au guichet est de {m} min. Des usagers se plaignent qu’il est plus long.',1,'min',12,[3,4,5,6]],
  ['Une pièce doit mesurer en moyenne {m} mm. On contrôle la production pour repérer tout écart.',0,'mm',80,[2,3,4]],
  ['Un engrais est censé augmenter le rendement moyen, habituellement de {m} q/ha.',1,'q/ha',70,[8,10,12]]];
const S1TE_PCTX=[['Avec l’ancien traitement, {p} % des malades guérissent. On teste un nouveau traitement censé faire mieux.',1],
  ['Un fournisseur garantit au plus {p} % de pièces défectueuses. Le client soupçonne davantage.',1],
  ['On se demande si une pièce de monnaie est truquée (proportion de « pile » différente de {p} %).',0],
  ['Un candidat affirmait avoir {p} % d’opinions favorables ; un adversaire pense que c’est moins.',2],
  ['Dans une région, {p} % des foyers avaient la fibre. On se demande si la proportion a changé.',0]];
/* 1. Formuler les hypothèses */
const gS1TeHyp=()=>{const prop=Math.random()<.45;let txt,side,P,v;
  if(prop){const c=pick(S1TE_PCTX);v=c[0].includes('pile')?50:pick([20,30,40,60]);txt=c[0].replace('{p}',v);side=c[1];P='p';v=num(v/100)}
  else{const c=pick(S1TE_CTX);v=c[3];txt=c[0].replace('{m}',v);side=c[1];P='μ'}
  const H=(s)=>`H₀ : ${P} = ${v} contre H₁ : ${P} ${['≠','>','<'][s]} ${v}`;
  return mcq('Quelles hypothèses poser ?',stx(txt),[0,1,2].map(s=>({h:H(s),ok:s===side,tag:'s1te-cote'})).concat([{h:`H₀ : ${P} ${['≠','>','<'][side]} ${v} contre H₁ : ${P} = ${v}`,tag:'s1te-hyp'}]),
    `H₀ est l’hypothèse « rien ne change », avec l’égalité : ${P} = ${v}. H₁ traduit le soupçon : ${['un écart dans un sens ou dans l’autre (test bilatéral)','une augmentation (test unilatéral à droite)','une diminution (test unilatéral à gauche)'][side]}.`,'Cherche dans l’énoncé le sens du soupçon : plus, moins, ou simplement différent ?')};
/* 2. Les deux risques */
const gS1TeRisk=()=>{if(Math.random()<.3){const v=R(0,1);return mcq('Que devient le risque β ?',stx(v?'À taille d’échantillon fixée, on diminue le risque α (on passe de 5 % à 1 %).':'À risque α fixé, on augmente la taille de l’échantillon.'),
    [{h:'β augmente',ok:v===1},{h:'β diminue',ok:v===0},{h:'β ne change pas',tag:'s1te-risque'}],
    v?'En exigeant plus de preuves pour rejeter H0, on rejette moins souvent, y compris quand H0 est fausse : β augmente. α et β varient en sens contraire.':'Avec plus de données, la statistique distingue mieux H1 de H0 : β diminue, la puissance 1 − β augmente.','Rejeter moins souvent, c’est aussi rater plus souvent un vrai effet.',true)}
  const i=R(0,1),j=R(0,1),lab=[['Bonne décision (probabilité 1 − α)','Erreur de 2ᵉ espèce (risque β)'],['Erreur de 1ʳᵉ espèce (risque α)','Bonne décision : la puissance 1 − β']];
  const cell=(r,c)=>`<rect x="${110+c*95}" y="${32+r*40}" width="95" height="40" fill="${r===i&&c===j?'var(--t-sq)':'var(--surface)'}" fill-opacity="${r===i&&c===j?.6:1}" stroke="var(--ink)"/><text x="${157+c*95}" y="${57+r*40}" font-size="18" font-weight="700" text-anchor="middle" fill="var(--ink)">${r===i&&c===j?'?':''}</text>`;
  const svg=`<div class="qfig"><svg viewBox="0 0 310 118" role="img" aria-label="Tableau décision et réalité"><text x="157" y="24" font-size="11" font-weight="700" text-anchor="middle" fill="var(--muted)">H₀ vraie</text><text x="252" y="24" font-size="11" font-weight="700" text-anchor="middle" fill="var(--muted)">H₀ fausse</text><text x="104" y="56" font-size="11" font-weight="700" text-anchor="end" fill="var(--muted)">On ne rejette pas H₀</text><text x="104" y="96" font-size="11" font-weight="700" text-anchor="end" fill="var(--muted)">On rejette H₀</text>${cell(0,0)}${cell(0,1)}${cell(1,0)}${cell(1,1)}</svg></div>`;
  return mcq('Que représente la case colorée ?',stx('Colonnes : la réalité (inconnue). Lignes : la décision prise à partir de l’échantillon.')+svg,
    [0,1].flatMap(r=>[0,1].map(c=>({h:lab[r][c],ok:r===i&&c===j,tag:'s1te-risque'}))),
    'Rejeter H₀ alors qu’elle est vraie : erreur de 1ʳᵉ espèce, de probabilité α (fixée par nous). Ne pas rejeter H₀ alors qu’elle est fausse : erreur de 2ᵉ espèce, de probabilité β. Rejeter H₀ à raison : puissance 1 − β.','Croise la ligne (décision) et la colonne (réalité).',true)};
/* 3. Placer la statistique de test */
const gS1TeZone=()=>{const c=pick(S1TE_CTX),s=pick([4,6,8,10,12,15,20]),n=pick([16,25,36,64,100]),se=s/Math.sqrt(n),z=R(-12,12)/4,mu0=c[3],xb=+(mu0+z*se).toFixed(3);
  if(Math.abs(z)<.25)return gS1TeZone();
  return pointQ({instr:'Calcule la statistique de test z et place-la sur l’axe.',prompt:stx(`H₀ : μ = ${mu0} ${c[2]}. σ = ${s} ${c[2]} (connu), n = ${n}, moyenne observée x̄ = ${num(xb)} ${c[2]}.`)+mx('z = (x̄ − μ₀)/(σ/√n)'),
    nom:'z',x:[-4,4],y:[-.9,2.3],snap:.25,tol:.12,cible:[z,0],fond:{ligne:true,pas:.25,etiq:1,f:['5*exp(-x^2/2)/sqrt(2pi)']},
    explain:`σ/√n = ${s}/${Math.sqrt(n)} = ${dec(se,4)}. z = (${num(xb)} − ${mu0}) / ${dec(se,4)} = ${num(z)}. ${Math.abs(z)>1.96?'Au risque 5 % en bilatéral, z dépasse ± 1,96 : on rejetterait H₀.':'z reste entre −1,96 et 1,96 : au risque 5 % en bilatéral, on ne rejetterait pas H₀.'}`,
    hint:'Commence par σ/√n, puis divise l’écart x̄ − μ₀ par ce nombre.',diag:([x])=>near(x,(xb-mu0)/s,.13)?'s1te-sqrtn':null})};
/* 4. Statistique de test sur une moyenne */
const gS1TeStat=()=>{const c=pick(S1TE_CTX),s=pick(c[4]),n=pick([30,36,40,50,64,80,100]),side=c[1],al=pick([.05,.01]),zt=(Math.random()*5-2.5),se=s/Math.sqrt(n),xb=+(c[3]+zt*se).toFixed(1),z=(xb-c[3])/se,big=n>=30&&Math.random()<.5;
  return nq({instr:'Calcule la valeur observée de la statistique de test.',prompt:stx(c[0].replace('{m}',c[3])+` Sur n = ${n} unités : x̄ = ${num(xb)} ${c[2]}, ${big?`s = ${s} ${c[2]} (grand échantillon : on remplace σ par s)`:`σ = ${s} ${c[2]} (connu)`}.`)+mx(`z = (x̄ − μ₀)/(${big?'s':'σ'}/√n)`)+S1TE_fig(side,al),
    labels:['z ='],t:[z],dp:2,tol:.011,explain:`${big?'s':'σ'}/√n = ${s}/√${n} ≈ ${dec(se,4)}. z = (${num(xb)} − ${c[3]}) / ${dec(se,4)} ≈ ${dec(z,2)}. La figure montre la région critique au risque ${num(al*100)} % : z ${(side===0?Math.abs(z)>S1TE_C[0][al]:side===1?z>S1TE_C[1][al]:z<-S1TE_C[1][al])?'y tombe : on rejette H₀':'n’y tombe pas : on ne rejette pas H₀'}.`,
    hint:'z = (x̄ − μ₀) divisé par l’écart-type de X̄.',diag:([v])=>near(v,(xb-c[3])/s,.02)?'s1te-sqrtn':near(v,-z,.011)?'signe':null})};
/* 5. p-valeur */
const gS1TeP=()=>{const side=R(0,2),z=+((side===2?-1:side===1?1:pick([-1,1]))*R(80,300)/100).toFixed(2),az=Math.abs(z),F=+Phi(az).toFixed(4),pv=side===0?2*(1-F):side===1?(z>=0?1-F:F):(z<=0?1-F:F);
  return nq({instr:'Calcule la p-valeur du test.',prompt:stx(`Test ${['bilatéral (H₁ : μ ≠ μ₀)','unilatéral à droite (H₁ : μ > μ₀)','unilatéral à gauche (H₁ : μ < μ₀)'][side]}. Valeur observée : z = ${num(z)}. On donne Φ(${num(az)}) = ${num(F)}, où Φ est la fonction de répartition de N(0 ; 1).`)+S1TE_fig(side,.05,z,true),
    labels:['p-valeur ='],t:[pv],dp:4,tol:.00011,explain:`La p-valeur est la probabilité, sous H₀, d’obtenir une valeur au moins aussi extrême que z (zone bleue). ${side===0?`p = 2 × (1 − Φ(${num(az)})) = 2 × ${dec(1-F,4)}`:side===1?`p = P(Z ≥ ${num(z)}) = ${z>=0?`1 − Φ(${num(az)})`:`Φ(${num(az)})`}`:`p = P(Z ≤ ${num(z)}) = ${z<=0?`1 − Φ(${num(az)})`:`Φ(${num(az)})`}`} = ${dec(pv,4)}. ${pv<.05?'p < 0,05 : on rejette H₀ au risque 5 %.':'p ≥ 0,05 : on ne rejette pas H₀ au risque 5 %.'}`,
    hint:'Bilatéral : deux queues. Unilatéral : une seule, du côté de H₁. Par symétrie, P(Z ≤ −a) = 1 − Φ(a).',diag:([v])=>near(v,1-F,.0002)&&side===0?'s1te-pval':near(v,2*(1-F),.0002)&&side>0?'s1te-pval':null})};
/* 6. Décision */
const gS1TeDec=()=>{const side=R(0,2),al=pick([.05,.01,.1]),c=S1TE_C[side===0?0:1][al],mag=Math.random()<.5?c+R(5,90)/100:Math.max(.1,c-R(10,120)/100);
  const sg=side===1?(Math.random()<.85?1:-1):side===2?(Math.random()<.85?-1:1):pick([1,-1]),zz=+(sg*mag).toFixed(2),rej=side===0?Math.abs(zz)>c:side===1?zz>c:zz<-c;
  return mcq('Quelle décision prendre ?',stx(`Test ${['bilatéral','unilatéral à droite','unilatéral à gauche'][side]} au risque α = ${num(al*100)} %. Statistique observée : z = ${num(zz)}.`)+stx(S1TE_QTXT)+S1TE_fig(side,al,zz),
    [{h:`On rejette H₀ au risque ${num(al*100)} %`,ok:rej,tag:rej?null:'s1te-quant'},{h:'On ne rejette pas H₀',ok:!rej,tag:'s1te-quant'},{h:'On accepte H₀ : elle est démontrée vraie',tag:'s1te-h0'},{h:'On rejette H₁ : elle est démontrée fausse',tag:'s1te-h0'}],
    `Région critique : ${side===0?`|Z| > ${num(c)}`:side===1?`Z > ${num(c)}`:`Z < ${MINUS}${num(c)}`}. z = ${num(zz)} ${rej?'y est : on rejette H₀':'n’y est pas : on ne rejette pas H₀ — ce qui ne prouve pas qu’elle est vraie'}.`,'Regarde si z tombe dans la zone rouge.')};
/* 7. Statistique de test sur une proportion */
const gS1TeProp=()=>{const c=pick(S1TE_PCTX),p0=c[0].includes('pile')?.5:pick([.2,.3,.4,.6]),n=pick([100,200,400,500,1000]),sd=Math.sqrt(p0*(1-p0)/n),k=Math.round(n*(p0+(Math.random()*5-2.5)*sd)),f=k/n,z=(f-p0)/sd;
  return nq({instr:'Calcule la statistique de test.',prompt:stx(c[0].replace('{p}',Math.round(p0*100))+` Sur n = ${n} cas observés, ${k} présentent le caractère.`)+mx('z = (f − p₀)/√(p₀(1 − p₀)/n)')+S1TE_fig(c[1],.05),
    labels:['z ='],t:[z],dp:2,tol:.011,explain:`f = ${k}/${n} = ${dec(f,4)}. Sous H₀, l’écart-type de F est √(p₀(1 − p₀)/n) = √(${num(p0)} × ${num(+(1-p0).toFixed(2))}/${n}) ≈ ${dec(sd,5)}. z = (${dec(f,4)} − ${num(p0)}) / ${dec(sd,5)} ≈ ${dec(z,2)}.`,
    hint:'Sous H₀, on utilise p₀ (et non f) dans l’écart-type.',diag:([v])=>f>0&&f<1&&near(v,(f-p0)/Math.sqrt(f*(1-f)/n),.011)?'s1te-hyp':near(v,(f-p0)/(p0*(1-p0)/n),.05)?'calc':null})};
/** Deux densités de groupes */
const S1TE_two=(m1,s1,m2,s2,u)=>{const lo=Math.min(m1-3*s1,m2-3*s2),hi=Math.max(m1+3*s1,m2+3*s2),f=(m,s)=>x=>Math.exp(-(((x-m)/s)**2)/2)/(s*Math.sqrt(2*Math.PI)),top=1.25/(Math.min(s1,s2)*Math.sqrt(2*Math.PI));
  const g=gp({W:300,H:130,x0:lo,x1:hi,y0:-top*.12,y1:top,pd:8});g.seg(lo,0,hi,0,'var(--muted)',1.2).fn(f(m1,s1),'var(--t-sq)',2.2).fn(f(m2,s2),'var(--t-c)',2.2,'6 4');
  g.seg(m1,0,m1,f(m1,s1)(m1),'var(--t-sq)',1.2,'3 3').seg(m2,0,m2,f(m2,s2)(m2),'var(--t-c)',1.2,'3 3').text(m1,0,`x̄₁`,'var(--t-sq)','middle',0,13,10).text(m2,0,`x̄₂`,'var(--t-c)','middle',0,13,10);
  return`<div class="qfig">${g.done('Répartition des deux échantillons'+(u?' ('+u+')':''))}</div>`};
/* 8. Comparer deux moyennes */
const S1TE_2M=[['Deux méthodes d’apprentissage : notes au même examen','points',12,[2,3,4]],['Deux machines remplissent des bouteilles','mL',750,[4,5,6]],['Salaires mensuels dans deux régions','€',2100,[300,400,500]],['Durée de vie de piles de deux marques','h',30,[3,4,5]]];
const gS1TeDeux=()=>{const c=pick(S1TE_2M),n1=R(4,15)*10,n2=R(4,15)*10,s1=pick(c[3]),s2=pick(c[3]),se=Math.sqrt(s1*s1/n1+s2*s2/n2),d=(Math.random()*6-3)*se,m1=+(c[2]+d/2).toFixed(1),m2=+(c[2]-d/2).toFixed(1),z=(m1-m2)/se;
  if(m1===m2)return gS1TeDeux();
  return nq({instr:'Calcule la statistique du test de comparaison des moyennes.',prompt:stx(`${c[0]} (en ${c[1]}).`)+dtab([['','n','x̄','s'],['Échantillon 1',n1,num(m1),s1],['Échantillon 2',n2,num(m2),s2]])+mx('z = (x̄₁ − x̄₂)/√(s₁²/n₁ + s₂²/n₂)')+S1TE_two(m1,s1,m2,s2,c[1]),
    labels:['z ='],t:[z],dp:2,tol:.011,explain:`Grands échantillons indépendants : sous H₀ : μ₁ = μ₂, Z suit approximativement N(0 ; 1). √(${s1}²/${n1} + ${s2}²/${n2}) ≈ ${dec(se,4)}. z = (${num(m1)} − ${num(m2)}) / ${dec(se,4)} ≈ ${dec(z,2)}. ${Math.abs(z)>1.96?'|z| > 1,96 : différence significative au risque 5 %.':'|z| ≤ 1,96 : différence non significative au risque 5 %.'}`,
    hint:'Les variances des deux moyennes s’additionnent : s₁²/n₁ + s₂²/n₂, puis la racine.',diag:([v])=>near(v,(m1-m2)/Math.sqrt(s1*s1+s2*s2),.011)?'s1te-sqrtn':near(v,(m1-m2)/(s1/Math.sqrt(n1)+s2/Math.sqrt(n2)),.011)?'calc':null})};
/* 9. Comparer deux proportions */
const gS1TeDeuxP=()=>{const n1=R(10,40)*10,n2=R(10,40)*10,p=pick([.2,.3,.4,.5]),k1=Math.round(n1*(p+R(-6,6)/100)),k2=Math.round(n2*(p+R(-6,6)/100)),f1=k1/n1,f2=k2/n2,ph=(k1+k2)/(n1+n2),se=Math.sqrt(ph*(1-ph)*(1/n1+1/n2)),z=(f1-f2)/se;
  if(k1*n2===k2*n1)return gS1TeDeuxP();const ctx=pick(['Deux usines : pièces défectueuses','Deux versions d’un site : visiteurs qui achètent','Deux villes : personnes vaccinées']);
  const bar=(k,n,y,col)=>`<rect x="70" y="${y}" width="220" height="18" fill="var(--surface)" stroke="var(--ink)"/><rect x="70" y="${y}" width="${(220*k/n).toFixed(1)}" height="18" fill="${col}" opacity=".75"/>`;
  return nq({instr:'Calcule la statistique du test de comparaison des proportions.',prompt:stx(`${ctx}. Échantillon 1 : ${k1} sur ${n1}. Échantillon 2 : ${k2} sur ${n2}.`)+`<div class="qfig"><svg viewBox="0 0 300 56" role="img" aria-label="Deux proportions"><text x="62" y="18" font-size="11" text-anchor="end" fill="var(--ink)">Éch. 1</text><text x="62" y="46" font-size="11" text-anchor="end" fill="var(--ink)">Éch. 2</text>${bar(k1,n1,5,'var(--t-sq)')}${bar(k2,n2,33,'var(--t-c)')}</svg></div>`+
      mx('p̂ = (k₁ + k₂)/(n₁ + n₂) ; z = (f₁ − f₂)/√(p̂(1 − p̂)(1/n₁ + 1/n₂))'),
    labels:['z ='],t:[z],dp:2,tol:.015,explain:`f₁ = ${dec(f1,4)}, f₂ = ${dec(f2,4)}. Sous H₀ : p₁ = p₂, on estime la proportion commune p̂ = ${k1+k2}/${n1+n2} ≈ ${dec(ph,4)}. √(p̂(1 − p̂)(1/${n1} + 1/${n2})) ≈ ${dec(se,5)}. z ≈ ${dec(z,2)}.`,
    hint:'Commence par la proportion commune p̂ (toutes les observations réunies).',diag:([v])=>near(v,(f1-f2)/Math.sqrt(f1*(1-f1)/n1+f2*(1-f2)/n2),.006)?'s1te-hyp':null})};
/* 10. Raisonner : test bilatéral sur une moyenne */
const gS1TeR1=()=>{const c=pick(S1TE_CTX.filter(x=>x[1]===0)),s=pick(c[4]),n=pick([25,36,49,64,100]),rn=Math.sqrt(n),zt=pick([-2.8,-2.3,-1.8,-1.2,-.6,.7,1.3,1.75,2.2,2.9])+R(-5,5)/100,xb=+(c[3]+zt*s/rn).toFixed(2),z=(xb-c[3])/(s/rn);
  return chain({instr:'Mène le test au risque 5 %, étape par étape.',prompt:stx(c[0].replace('{m}',c[3])+` σ = ${s} ${c[2]} (connu). Sur n = ${n} unités, x̄ = ${num(xb)} ${c[2]}.`)+stx(S1TE_QTXT),
    steps:[
      {q:'Hypothèses :',o:[
        {h:`H₀ : μ = ${c[3]} contre H₁ : μ ≠ ${c[3]}`,ok:true,sd:0,why:''},
        {h:`H₀ : μ = ${c[3]} contre H₁ : μ > ${c[3]}`,sd:1,why:'L’énoncé cherche un écart dans un sens ou dans l’autre : test bilatéral.',tag:'s1te-cote'},
        {h:`H₀ : μ ≠ ${c[3]} contre H₁ : μ = ${c[3]}`,sd:0,why:'H₀ contient l’égalité : c’est sous H₀ qu’on sait calculer la loi de la statistique.',tag:'s1te-hyp'}]},
      {q:'Statistique observée :',o:[
        {h:`z = (${num(xb)} − ${c[3]})/(${s}/√${n}) ≈ ${dec(z,2)}`,ok:true,z,why:''},
        {h:`z = (${num(xb)} − ${c[3]})/${s} ≈ ${dec((xb-c[3])/s,2)}`,z:(xb-c[3])/s,why:'On compare l’écart à l’écart-type de X̄, σ/√n, pas à σ.',tag:'s1te-sqrtn'},
        {h:`z = (${num(xb)} − ${c[3]})/(${s}/${n}) ≈ ${dec((xb-c[3])*n/s,2)}`,z:(xb-c[3])*n/s,why:'L’écart-type de X̄ est σ/√n, pas σ/n.',tag:'s1te-sqrtn'}]},
      {q:'Région critique au risque 5 % :',o:prev=>{const sd=prev[0].sd;return[
        {h:'|Z| > 1,96',ok:sd===0,rc:[0,1.96],why:'Le test choisi est unilatéral : toute la zone de rejet est d’un seul côté.',tag:'s1te-cote'},
        {h:'Z > 1,645',ok:sd===1,rc:[1,1.645],why:'Le test est bilatéral : on rejette pour les grandes valeurs de |Z|.',tag:'s1te-cote'},
        {h:'|Z| > 1,645',rc:[0,1.645],why:'En bilatéral, α = 5 % se partage : 2,5 % de chaque côté, d’où 1,96.',tag:'s1te-quant'}]}},
      {q:'Décision :',o:prev=>{const zz=prev[1].z,[t,cc]=prev[2].rc,rej=t===0?Math.abs(zz)>cc:zz>cc;return[
        {h:'On rejette H₀ : la moyenne s’écarte significativement de la norme',ok:rej,why:'z n’est pas dans la région critique choisie.',tag:'s1te-quant'},
        {h:'On ne rejette pas H₀ : l’écart observé peut être dû au hasard',ok:!rej,why:'z est dans la région critique choisie : on doit rejeter H₀.',tag:'s1te-quant'},
        {h:'On accepte H₀ : la moyenne est bien égale à la norme',why:'Ne pas rejeter H₀ ne prouve pas qu’elle est vraie ; et la conclusion doit découler de la région critique.',tag:'s1te-h0'}]}}],
    explain:`H₀ : μ = ${c[3]}, H₁ : μ ≠ ${c[3]}. z = (${num(xb)} − ${c[3]})/(${s}/${rn}) ≈ ${dec(z,2)}. Région critique |Z| > 1,96. ${Math.abs(z)>1.96?'z y est : on rejette H₀ au risque 5 %.':'z n’y est pas : on ne rejette pas H₀ (sans prouver qu’elle est vraie).'}`})};
/* 11. Raisonner : test unilatéral sur une proportion */
const gS1TeR2=()=>{const p0=pick([.05,.08,.1,.15,.2]),n=pick([200,300,400,500]),sd=Math.sqrt(p0*(1-p0)/n),k=Math.round(n*(p0+pick([-.4,.6,1.1,1.5,1.9,2.4,3])*sd)),f=k/n,z=(f-p0)/sd;
  const P=Math.round(p0*100);
  return chain({instr:'Mène le test au risque 5 %, étape par étape.',prompt:stx(`Un fournisseur garantit au plus ${P} % de pièces défectueuses. Le client, qui soupçonne davantage, contrôle ${n} pièces : ${k} sont défectueuses.`)+stx(S1TE_QTXT),
    steps:[
      {q:'Hypothèses :',o:[
        {h:`H₀ : p = ${num(p0)} contre H₁ : p > ${num(p0)}`,ok:true,sd:1,why:''},
        {h:`H₀ : p = ${num(p0)} contre H₁ : p ≠ ${num(p0)}`,sd:0,why:'Le client soupçonne une proportion plus grande : le test est unilatéral à droite.',tag:'s1te-cote'},
        {h:`H₀ : p = ${num(p0)} contre H₁ : p < ${num(p0)}`,sd:2,why:'Mauvais côté : moins de défauts n’inquiète pas le client.',tag:'s1te-cote'}]},
      {q:'Statistique observée :',o:[
        {h:`z = (f − p₀)/√(p₀(1 − p₀)/n) ≈ ${dec(z,2)}`,ok:true,z,why:''},
        {h:`z = (f − p₀)/(p₀(1 − p₀)/n) ≈ ${dec((f-p0)/(p0*(1-p0)/n),2)}`,z:(f-p0)/(p0*(1-p0)/n),why:'Il faut la racine : p₀(1 − p₀)/n est une variance.',tag:'calc'},
        {h:`z = (f − p₀)/√(p₀(1 − p₀)) ≈ ${dec((f-p0)/Math.sqrt(p0*(1-p0)),2)}`,z:(f-p0)/Math.sqrt(p0*(1-p0)),why:'On oublie de diviser par n : c’est l’écart-type d’une seule pièce.',tag:'s1te-sqrtn'}]},
      {q:'Région critique :',o:prev=>{const sd=prev[0].sd;return[
        {h:'Z > 1,645',ok:sd===1,rc:[1,1.645],why:sd===0?'Le test choisi est bilatéral.':'Le test choisi rejette pour les petites valeurs.',tag:'s1te-cote'},
        {h:'|Z| > 1,96',ok:sd===0,rc:[0,1.96],why:'Le test choisi est unilatéral.',tag:'s1te-cote'},
        {h:'Z < −1,645',ok:sd===2,rc:[2,1.645],why:'Le test choisi rejette pour les grandes valeurs de Z.',tag:'s1te-cote'},
        {h:'Z > 1,96',rc:[1,1.96],why:'En unilatéral, tout le risque de 5 % est d’un côté : le seuil est 1,645.',tag:'s1te-quant'}]}},
      {q:'Décision :',o:prev=>{const zz=prev[1].z,[t,cc]=prev[2].rc,rej=t===0?Math.abs(zz)>cc:t===1?zz>cc:zz<-cc;return[
        {h:'On rejette H₀ : il y a significativement plus de défauts que garanti',ok:rej,why:'La statistique n’est pas dans la région critique choisie.',tag:'s1te-quant'},
        {h:'On ne rejette pas H₀ : l’échantillon reste compatible avec la garantie',ok:!rej,why:'La statistique est dans la région critique choisie : on rejette H₀.',tag:'s1te-quant'},
        {h:'On accepte H₀ : le fournisseur a prouvé sa garantie',why:'Un test ne prouve jamais H₀ ; au mieux, il ne trouve pas de preuve contre elle.',tag:'s1te-h0'}]}}],
    explain:`H₁ : p > ${num(p0)} (unilatéral à droite). f = ${dec(f,4)} ; z = (f − p₀)/√(p₀(1 − p₀)/n) ≈ ${dec(z,2)}. Région critique Z > 1,645. ${z>1.645?'On rejette H₀ au risque 5 %.':'On ne rejette pas H₀.'}`})};
/* 12. Raisonner : comparer deux moyennes */
const gS1TeR3=()=>{const c=pick(S1TE_2M),n1=R(5,12)*10,n2=R(5,12)*10,s1=pick(c[3]),s2=pick(c[3]),se=Math.sqrt(s1*s1/n1+s2*s2/n2),d=pick([-2.8,-1.5,-.8,.6,1.4,2.3,3.1])*se,m1=+(c[2]+d/2).toFixed(1),m2=+(c[2]-d/2).toFixed(1),z=(m1-m2)/se;
  return chain({instr:'Compare les deux moyennes au risque 5 %, étape par étape.',prompt:stx(`${c[0]} (en ${c[1]}). Les moyennes des deux populations sont-elles différentes ?`)+dtab([['','n','x̄','s'],['Échantillon 1',n1,num(m1),s1],['Échantillon 2',n2,num(m2),s2]])+stx(S1TE_QTXT),
    steps:[
      {q:'Hypothèses :',o:[
        {h:'H₀ : μ₁ = μ₂ contre H₁ : μ₁ ≠ μ₂',ok:true,sd:0,why:''},
        {h:'H₀ : x̄₁ = x̄₂ contre H₁ : x̄₁ ≠ x̄₂',sd:0,why:'Les hypothèses portent sur les populations (μ), pas sur les moyennes observées, qu’on connaît déjà.',tag:'s1te-hyp'},
        {h:`H₀ : μ₁ = μ₂ contre H₁ : μ₁ ${m1>m2?'>':'<'} μ₂`,sd:m1>m2?1:2,why:'La question ne précise pas de sens : choisir le sens d’après les données observées fausse le risque.',tag:'s1te-cote'}]},
      {q:'Statistique observée :',o:[
        {h:`z = (x̄₁ − x̄₂)/√(s₁²/n₁ + s₂²/n₂) ≈ ${dec(z,2)}`,ok:true,z,why:''},
        {h:`z = (x̄₁ − x̄₂)/√(s₁² + s₂²) ≈ ${dec((m1-m2)/Math.sqrt(s1*s1+s2*s2),2)}`,z:(m1-m2)/Math.sqrt(s1*s1+s2*s2),why:'Il faut diviser chaque variance par la taille de son échantillon.',tag:'s1te-sqrtn'},
        {h:`z = (x̄₁ − x̄₂)/(s₁/√n₁ + s₂/√n₂) ≈ ${dec((m1-m2)/(s1/Math.sqrt(n1)+s2/Math.sqrt(n2)),2)}`,z:(m1-m2)/(s1/Math.sqrt(n1)+s2/Math.sqrt(n2)),why:'Pour des variables indépendantes, ce sont les variances qui s’additionnent, pas les écarts-types.',tag:'calc'}]},
      {q:'Région critique :',o:prev=>{const sd=prev[0].sd;return[
        {h:'|Z| > 1,96',ok:sd===0,rc:[0,1.96],why:'Le test choisi est unilatéral.',tag:'s1te-cote'},
        {h:'Z > 1,645',ok:sd===1,rc:[1,1.645],why:'Le test choisi n’est pas unilatéral à droite.',tag:'s1te-cote'},
        {h:'Z < −1,645',ok:sd===2,rc:[2,1.645],why:'Le test choisi n’est pas unilatéral à gauche.',tag:'s1te-cote'},
        {h:'|Z| > 1,645',rc:[0,1.645],why:'En bilatéral : 2,5 % de chaque côté, seuil 1,96.',tag:'s1te-quant'}]}},
      {q:'Conclusion :',o:prev=>{const zz=prev[1].z,[t,cc]=prev[2].rc,rej=t===0?Math.abs(zz)>cc:t===1?zz>cc:zz<-cc;return[
        {h:'Différence significative : on rejette H₀',ok:rej,why:'La statistique n’est pas dans la région critique choisie.',tag:'s1te-quant'},
        {h:'Différence non significative : on ne rejette pas H₀',ok:!rej,why:'La statistique est dans la région critique choisie.',tag:'s1te-quant'},
        {h:'Les deux moyennes sont égales, c’est démontré',why:'Ne pas rejeter H₀ n’est pas la démontrer.',tag:'s1te-h0'}]}}],
    explain:`H₀ : μ₁ = μ₂ contre μ₁ ≠ μ₂. z = (${num(m1)} − ${num(m2)})/√(${s1}²/${n1} + ${s2}²/${n2}) ≈ ${dec(z,2)}. Région critique |Z| > 1,96 : ${Math.abs(z)>1.96?'on rejette H₀, la différence est significative.':'on ne rejette pas H₀, la différence n’est pas significative.'}`})};
ANA_UNITS.push({id:'s1-tests',tr:'s1',name:'Tests d’hypothèses',sub:'H₀ et H₁, risques, région critique, p-valeur',glyph:'H₀',tone:'x',
  skills:[SKA('s1.te.hyp','Poser H₀ et H₁',gS1TeHyp,1),SKA('s1.te.risk','Risques de 1ʳᵉ et 2ᵉ espèce',gS1TeRisk,1),SKA('s1.te.zone','Placer la statistique de test',gS1TeZone,1),
    SKA('s1.te.stat','Statistique de test sur une moyenne',gS1TeStat,2),SKA('s1.te.dec','Décider avec la région critique',gS1TeDec,2),SKA('s1.te.pval','p-valeur',gS1TeP,2),
    SKA('s1.te.prop','Test sur une proportion',gS1TeProp,2),SKA('s1.te.r1','Raisonner : test bilatéral',gS1TeR1,2),SKA('s1.te.deux','Comparer deux moyennes',gS1TeDeux,3),
    SKA('s1.te.deuxp','Comparer deux proportions',gS1TeDeuxP,3),SKA('s1.te.r2','Raisonner : test unilatéral',gS1TeR2,3),SKA('s1.te.r3','Raisonner : deux échantillons',gS1TeR3,3)]});
