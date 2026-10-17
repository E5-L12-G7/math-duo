/* --- Chapitre 6 : variables aléatoires discrètes --- */
const lawP=()=>{const k=R(3,4);let set=new Set;while(set.size<k)set.add(R(-10,20));const xs=sortA([...set]);let w=Array.from({length:k},()=>1);for(let i=0;i<20-k;i++)w[R(0,k-1)]++;
  const ps=w.map(v=>v/20),E=sumA(xs.map((x,i)=>x*ps[i])),E2=sumA(xs.map((x,i)=>x*x*ps[i]));return{xs,ps,E,E2,V:E2-E*E}};
const lawTab=L2=>dtab([['x<sub>i</sub>',...L2.xs.map(num)],['P(X = x<sub>i</sub>)',...L2.ps.map(pp)]]);
const gVaExp=()=>{const L2=lawP();
  return nq({instr:'Calcule l’espérance E(X).',prompt:lawTab(L2),labels:['E(X) ='],t:[L2.E],dp:2,
    explain:`E(X) = Σ xᵢ pᵢ = ${L2.xs.map((x,i)=>`${num(x)} × ${pp(L2.ps[i])}`).join(' + ')} = ${dec(L2.E)}.`,hint:'Multiplie chaque valeur par sa probabilité, puis additionne.',
    diag:([v])=>near(v,meanA(L2.xs))?'stat-weight':null})};
const gVaVar=()=>{const L2=lawP();
  return nq({instr:'Calcule la variance V(X).',prompt:lawTab(L2),labels:['V(X) ='],t:[L2.V],dp:2,
    explain:`E(X) = ${dec(L2.E,4)} et E(X²) = Σ xᵢ² pᵢ = ${dec(L2.E2,4)}. V(X) = E(X²) − E(X)² ≈ ${dec(L2.V)}.`,hint:'V(X) = E(X²) − E(X)².',
    diag:([v])=>near(v,L2.E2)||near(v,Math.sqrt(L2.V))?'stat-var':null})};
const gVaLin=()=>{const m=R(-5,12),v=R(1,16),a=nz(-4,4)*(Math.random()<.5?1:-1)||2,b=nz(-10,10);
  return nq({instr:'Calcule l’espérance et la variance de Y.',prompt:mx(`E(X) = ${num(m)} ; V(X) = ${v} ; Y = ${num(a)}X ${b<0?'−':'+'} ${Math.abs(b)}`),labels:['E(Y) =','V(Y) ='],t:[a*m+b,a*a*v],
    explain:`E(Y) = ${num(a)} × ${num(m)} ${b<0?'−':'+'} ${Math.abs(b)} = ${num(a*m+b)}. V(Y) = (${num(a)})² × ${v} = ${a*a*v} : la constante ne change pas la variance.`,
    hint:'E(aX + b) = aE(X) + b et V(aX + b) = a²V(X).',diag:([u,w])=>near(w,a*v)||near(w,a*a*v+b)||near(w,Math.abs(a)*v)?'va-lin':null})};
const gVaBinEV=()=>{const n=pick([5,8,10,12,20,25,40,50,100]),p=pick([.1,.2,.25,.3,.4,.5,.6,.75,.8]);
  return nq({instr:'Calcule l’espérance et la variance de X.',prompt:mx(`X ~ B(${n} ; ${num(p)})`),labels:['E(X) =','V(X) ='],t:[n*p,n*p*(1-p)],dp:2,
    explain:`E(X) = np = ${n} × ${num(p)} = ${dec(n*p)}. V(X) = np(1 − p) = ${dec(n*p)} × ${num(1-p)} = ${dec(n*p*(1-p))}.`,hint:'Pour B(n ; p) : E = np et V = np(1 − p).',
    diag:([u,w])=>near(w,n*p)||near(w,Math.sqrt(n*p*(1-p)))?'stat-var':null})};
const gVaBinP=()=>{const n=R(4,10),k=R(0,n),p=pick([.1,.2,.25,.3,.4,.5,.6,.7]),t=Cnk(n,k)*p**k*(1-p)**(n-k);
  return nq({instr:'Calcule la probabilité.',prompt:mx(`X ~ B(${n} ; ${num(p)}). P(X = ${k}) ?`),labels:[`P(X = ${k}) =`],t:[t],dp:3,
    explain:`P(X = ${k}) = C(${n} ; ${k}) × ${num(p)}<sup>${k}</sup> × ${num(1-p)}<sup>${n-k}</sup> = ${Cnk(n,k)} × ${dec(p**k,5)} × ${dec((1-p)**(n-k),5)} ≈ ${dec(t,3)}.`,
    hint:'P(X = k) = C(n ; k) pᵏ (1 − p)ⁿ⁻ᵏ.',diag:([v])=>near(v,p**k*(1-p)**(n-k),.0011)?'binom-coef':null})};
const LAWS=[['On lance 12 fois un dé équilibré. X est le nombre de 6 obtenus.',`B(12 ; ${fr(1,6)})`,[`B(6 ; ${fr(1,12)})`,'B(12 ; 0,5)','Pas une loi binomiale'],'12 lancers identiques et indépendants, succès « obtenir 6 » de probabilité 1/6.'],
  ['On lance 20 fois une pièce équilibrée. X est le nombre de « pile ».','B(20 ; 0,5)',['B(0,5 ; 20)','B(20 ; 0,25)','Pas une loi binomiale'],'20 répétitions indépendantes, succès « pile » de probabilité 0,5. On écrit B(n ; p) : le nombre d’essais d’abord.'],
  ['Un QCM a 10 questions à 4 choix. Un élève répond au hasard. X est le nombre de bonnes réponses.','B(10 ; 0,25)',['B(10 ; 0,4)','B(4 ; 0,1)','Pas une loi binomiale'],'10 questions indépendantes, chacune réussie avec probabilité 1/4.'],
  ['On tire successivement et sans remise 3 boules d’une urne de 5 boules dont 2 rouges. X est le nombre de rouges.','Pas une loi binomiale',['B(3 ; 0,4)','B(5 ; 0,4)',`B(3 ; ${fr(2,3)})`],'Sans remise, les tirages ne sont pas indépendants : la probabilité change à chaque tirage (loi hypergéométrique).'],
  ['Sur un site, 3 % des visiteurs achètent. On observe 200 visiteurs indépendants. X est le nombre d’acheteurs.','B(200 ; 0,03)',['B(3 ; 0,2)','B(200 ; 3)','Pas une loi binomiale'],'200 visiteurs indépendants, succès « achète » de probabilité 0,03.'],
  ['On mesure la taille de 50 personnes. X est la taille moyenne.','Pas une loi binomiale',['B(50 ; 0,5)','B(50 ; 1)','B(1 ; 50)'],'X n’est pas un nombre de succès : c’est une moyenne de mesures continues.']];
const gVaLaw=()=>{const[t,ok,bad,why]=pick(LAWS);
  return mcq('Quelle est la loi de X ?',stx(t),[{h:mx(ok),ok:true},...bad.map(h=>({h:mx(h),tag:'binom-law'}))],why,
    'Loi binomiale : n répétitions identiques et indépendantes d’une épreuve à deux issues, X compte les succès.')};

/* --- Chapitre 7 : lois continues --- */
const gLnUnif=()=>{const a=R(0,10),b=a+R(4,20),c=R(a,b-2),d=R(c+1,b),t=(d-c)/(b-a);
  return nq({instr:'Calcule la probabilité.',prompt:mx(`X ~ U([${a} ; ${b}]). P(${c} ≤ X ≤ ${d}) ?`),labels:['P ='],t:[t],dp:Number.isInteger(t*1000)?null:3,
    explain:`Pour une loi uniforme, P(c ≤ X ≤ d) = (d − c) ÷ (b − a) = ${d-c} ÷ ${b-a} ≈ ${dec(t,3)}.`,hint:'Rapport des longueurs : longueur de l’intervalle demandé ÷ longueur totale.',
    diag:([v])=>near(v,(d-c)/b,.0011)?'calc':null})};
const gLnZ=()=>{const mu=R(20,200),sg2=R(2,25),x=R(mu-3*sg2,mu+3*sg2),z=(x-mu)/sg2;
  return nq({instr:'Centre et réduis : calcule z.',prompt:mx(`X ~ N(${mu} ; ${sg2}<sup>2</sup>) ; x = ${x}`),labels:['z ='],t:[z],dp:2,
    explain:`z = (x − μ) ÷ σ = (${x} − ${mu}) ÷ ${sg2} ≈ ${dec(z)}.`,hint:'z = (x − μ) ÷ σ. Attention : dans N(μ ; σ²), le second paramètre est la variance.',
    diag:([v])=>near(v,-z)?'signe':near(v,(x-mu)/(sg2*sg2))?'loi-normale':null})};
const gLnRule=()=>{const mu=R(10,200),sg2=R(2,20),k=R(1,3),P=['≈ 0,68','≈ 0,95','≈ 0,997','≈ 0,5'];
  return mcq('Estime la probabilité avec la règle 68-95-99,7.',mx(`X ~ N(${mu} ; ${sg2}<sup>2</sup>). P(${mu-k*sg2} ≤ X ≤ ${mu+k*sg2}) ?`),P.map((h,i)=>({h:mx(h),ok:i===k-1,tag:'loi-normale'})),
    `L’intervalle est [μ − ${k}σ ; μ + ${k}σ] : il contient environ ${['68 %','95 %','99,7 %'][k-1]} des valeurs.`,'Exprime les bornes sous la forme μ ± kσ.',true)};
const ZS=[0.5,0.75,1,1.25,1.5,1.64,1.96,2,2.33,2.5];
const gLnPhi=()=>{const z=pick(ZS),f=+Phi(z).toFixed(4),mu=R(20,150),sg2=pick([2,4,5,10,15,20]),v=R(0,3),xh=+(mu+z*sg2).toFixed(2),xl=+(mu-z*sg2).toFixed(2);
  const V2=[[`P(X &gt; ${num(xh)})`,1-f],[`P(X &lt; ${num(xl)})`,1-f],[`P(X ≤ ${num(xh)})`,f],[`P(X ≥ ${num(xl)})`,f]][v];
  return nq({instr:'Calcule la probabilité avec la valeur de Φ donnée.',prompt:mx(`X ~ N(${mu} ; ${sg2}<sup>2</sup>) ; Φ(${num(z)}) = ${num(f)}`)+mx(V2[0]+' ?'),labels:['P ='],t:[V2[1]],dp:4,
    explain:`On centre et réduit : z = ±${num(z)}. ${v===0?`P(X > μ + zσ) = 1 − Φ(${num(z)})`:v===1?`Par symétrie, P(X < μ − zσ) = 1 − Φ(${num(z)})`:v===2?`P(X ≤ μ + zσ) = Φ(${num(z)})`:`Par symétrie, P(X ≥ μ − zσ) = Φ(${num(z)})`} = ${num(+V2[1].toFixed(4))}.`,
    hint:'Centre-réduis, puis utilise P(Z > z) = 1 − Φ(z) et la symétrie Φ(−z) = 1 − Φ(z).',diag:([u])=>near(u,1-V2[1],.00011)?'loi-normale':null})};
const gLnInt=()=>{const z=pick(ZS),f=+Phi(z).toFixed(4),mu=R(20,150),sg2=pick([2,4,5,10,15,20]),t=2*f-1;
  return nq({instr:'Calcule la probabilité avec la valeur de Φ donnée.',prompt:mx(`X ~ N(${mu} ; ${sg2}<sup>2</sup>) ; Φ(${num(z)}) = ${num(f)}`)+mx(`P(${num(+(mu-z*sg2).toFixed(2))} ≤ X ≤ ${num(+(mu+z*sg2).toFixed(2))}) ?`),labels:['P ='],t:[t],dp:4,
    explain:`Les bornes valent μ ± ${num(z)}σ. P = Φ(${num(z)}) − Φ(−${num(z)}) = 2Φ(${num(z)}) − 1 = ${num(+t.toFixed(4))}.`,
    hint:'P(−z ≤ Z ≤ z) = 2Φ(z) − 1.',diag:([u])=>near(u,f,.00011)||near(u,1-f,.00011)?'loi-normale':null})};

/* --- Chapitre 8 : estimation et tests --- */
const SQ=[16,25,36,49,64,100,144,225,400];
const gEsSe=()=>{const sg2=R(2,40),n=pick(SQ),t=sg2/Math.sqrt(n);
  return nq({instr:'Calcule l’erreur-type de la moyenne σ ÷ √n.',prompt:mx(`σ = ${sg2} ; n = ${n}`),labels:['σ<sub>x̄</sub> ='],t:[t],dp:2,
    explain:`σ ÷ √n = ${sg2} ÷ √${n} = ${sg2} ÷ ${Math.sqrt(n)} ≈ ${dec(t)}.`,hint:'Plus l’échantillon est grand, plus la moyenne observée est précise : on divise par √n.',
    diag:([v])=>near(v,sg2/n)?'ic':null})};
const gEsTcl=()=>{const mu=R(10,200),sg2=pick([5,10,12,20,30]),n=pick([25,36,100,400]),se=sg2/Math.sqrt(n);
  return mcq('D’après le théorème central limite, X̄ suit approximativement :',stx(`X̄ est la moyenne d’un échantillon de taille ${n} tiré d’une population de moyenne ${mu} et d’écart-type ${sg2}.`),
    [{h:mx(`N(${mu} ; ${num(se)}<sup>2</sup>)`),ok:true},{h:mx(`N(${mu} ; ${sg2}<sup>2</sup>)`),tag:'ic'},{h:mx(`N(${num(+(mu/n).toFixed(2))} ; ${sg2}<sup>2</sup>)`),tag:'ic'},{h:mx(`N(${mu} ; ${num(+(sg2/n).toFixed(3))}<sup>2</sup>)`),tag:'ic'}],
    `X̄ a la même moyenne μ = ${mu} et un écart-type σ ÷ √n = ${sg2} ÷ ${Math.sqrt(n)} = ${num(se)}.`,'La moyenne ne change pas ; l’écart-type est divisé par √n.')};
const gEsIcm=()=>{const xb=+(R(20,200)+R(0,9)/10).toFixed(1),sg2=R(3,30),n=pick(SQ),m=1.96*sg2/Math.sqrt(n);
  return nq({instr:'Donne l’intervalle de confiance à 95 % de la moyenne.',prompt:mx(`x̄ = ${num(xb)} ; σ = ${sg2} ; n = ${n}`),labels:['Borne inf. =','Borne sup. ='],t:[xb-m,xb+m],dp:2,tol:.02,
    explain:`Marge : 1,96 × ${sg2} ÷ √${n} ≈ ${dec(m)}. IC = [${dec(xb-m)} ; ${dec(xb+m)}].`,hint:'IC à 95 % : x̄ ± 1,96 × σ ÷ √n.',
    diag:([u,v])=>near(u,xb-1.96*sg2,.05)||near(v,xb+1.96*sg2,.05)||near(u,xb-1.96*sg2/n,.05)?'ic':null})};
const gEsIcp=()=>{const n=pick([100,200,400,500,800,1000,1200]),k=R(Math.round(.2*n),Math.round(.8*n)),ph=k/n,m=1.96*Math.sqrt(ph*(1-ph)/n);
  return nq({instr:'Donne l’intervalle de confiance à 95 % de la proportion.',prompt:stx(`Sondage : ${k} réponses favorables sur ${n} personnes.`),labels:['Borne inf. =','Borne sup. ='],t:[ph-m,ph+m],dp:3,tol:.002,
    explain:`p̂ = ${k} ÷ ${n} = ${dec(ph,4)}. Marge : 1,96 × √(${dec(ph,4)} × ${dec(1-ph,4)} ÷ ${n}) ≈ ${dec(m,4)}. IC = [${dec(ph-m,3)} ; ${dec(ph+m,3)}].`,
    hint:'IC à 95 % : p̂ ± 1,96 × √(p̂(1 − p̂) ÷ n).',diag:([u,v])=>near(u,ph-1.96*ph*(1-ph)/n,.003)||near(u,ph-1.96*Math.sqrt(ph*(1-ph)),.01)?'ic':null})};
const gEsN=()=>{const sg2=R(4,30),E=pick([0.5,1,1.5,2,2.5,3]),raw=(1.96*sg2/E)**2,n=Math.ceil(raw-1e-9);
  return nq({instr:'Quelle taille d’échantillon minimale ?',prompt:stx(`On veut estimer une moyenne avec une marge d’erreur d’au plus ${num(E)} au niveau 95 %, sachant que σ = ${sg2}.`),labels:['n ='],t:[n],
    explain:`Il faut 1,96 × σ ÷ √n ≤ E, soit n ≥ (1,96 × ${sg2} ÷ ${num(E)})² ≈ ${dec(raw,2)}. On arrondit à l’entier supérieur : n = ${n}.`,
    hint:'Isole n dans 1,96σ ÷ √n ≤ E, puis arrondis à l’entier supérieur.',diag:([v])=>near(v,Math.floor(raw),1e-6)||near(v,Math.round(raw),1e-6)?'arrondi':near(v,1.96*sg2/E,.6)?'ic':null})};
const gEsTest=()=>{const mu0=R(50,500),sg2=pick([4,5,8,10,12,20]),n=pick([16,25,36,64,100]),se=sg2/Math.sqrt(n),zt=pick([-3,-2.5,-2.2,-1.5,-1,-0.6,0.4,1.2,1.7,2.1,2.6,3.1]),xb=+(mu0+zt*se).toFixed(2),z=(xb-mu0)/se,rej=Math.abs(z)>1.96;
  return mcq('Quelle est la décision au seuil de 5 % ?',stx('Test bilatéral : H₀ « μ = '+mu0+' » contre H₁ « μ ≠ '+mu0+' ».')+mx(`σ = ${sg2} ; n = ${n} ; x̄ = ${num(xb)}`),
    [{h:'On rejette H₀',ok:rej,tag:'test'},{h:'On ne rejette pas H₀',ok:!rej,tag:'test'}],
    `z = (x̄ − μ₀) ÷ (σ ÷ √n) = (${num(xb)} − ${mu0}) ÷ ${num(+se.toFixed(3))} ≈ ${dec(z)}. |z| ${rej?'&gt;':'≤'} 1,96 : ${rej?'on rejette H₀':'on ne rejette pas H₀ (ce qui ne prouve pas qu’elle est vraie)'}.`,
    'Calcule z = (x̄ − μ₀) ÷ (σ ÷ √n) et compare |z| à 1,96.',true)};

const S=(id,name,gen)=>({id,name,gen});
