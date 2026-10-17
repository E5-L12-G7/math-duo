/* Cinq parcours : Algèbre 2, Trigonométrie, Fonctions et suites, Statistiques et probabilités, Apprendre à prouver */
const TRACKS={m1:{name:'MVA911 · Mise à niveau 1',short:'MVA911',first:1},m2:{name:'MVA912 · Mise à niveau 2',short:'MVA912',first:1},s1:{name:'STA001 · Techniques de la statistique',short:'STA001',first:1}};
const liveTracks=()=>Object.entries(TRACKS).filter(([k])=>UNITS.some(u=>u.tr===k));
const curTrack=()=>TRACKS[ST.track]&&UNITS.some(u=>u.tr===ST.track)?ST.track:(liveTracks()[0]||['m1'])[0];
const TEASE={m1:()=>`<span class="m tbig">a² + b² = c² &nbsp; ${fr('a','b')} + ${fr('c','d')}</span>`,m2:()=>`<span class="m tbig">∫<sub>a</sub><sup>b</sup> <i>f</i> = <i>F</i>(<i>b</i>) − <i>F</i>(<i>a</i>) &nbsp; e<sup>iθ</sup></span>`,s1:()=>`<span class="m tbig"><i>x̄</i> ± 1,96 ${fr('σ','√<i>n</i>')}</span>`};
{const cnt={};UNITS.forEach(u=>{u.tr=u.tr||'alg';cnt[u.tr]=cnt[u.tr]??TRACKS[u.tr].first;u.num=cnt[u.tr]++})}
const UIX=id=>UNITS.findIndex(u=>u.id===id);
const ALLSK=[],SK={};UNITS.forEach((u,ui)=>u.skills.forEach(k=>{k.ui=ui;ALLSK.push(k);SK[k.id]=k}));
/* Niveau de chaque compétence : 1 = une étape, 2 = plusieurs étapes, 3 = notion avancée */
const TIERS={'lang.ens':1,'lang.int':1,'lang.int2':2,'lang.sol':2,'lang.logic':3,
  'lin.simple':1,'lin.both':2,'lin.paren':2,'lin.frac':3,'ineq.lin':3,
  'exp.prod':1,'exp.pow':1,'exp.quot':2,'exp.neg':2,'exp.mix':3,'exp.coef':3,
  'dev.prod':1,'fac.diff':1,'dev.sq':2,'fac.tri':2,'dev.coef':3,'fac.coef':3,
  'q.roots':1,'q.delta':2,'q.count':2,'q.vertex':3,
  'rad.simp':1,'i.pow':1,'c.add':2,'c.mul':3,
  'log.eval':1,'log.solve':2,'exp.eq':2,'log.sum':2,'log.diff':3,
  'f.eval':1,'f.comp':2,'f.inv':3,'lin.r':2,'ineq.r':3,'exp.r':2,'fac.r':2,'q.r':3,'log.r':3};
Object.assign(TIERS,{'st.mean':1,'st.med':1,'st.freq':1,'st.wmean':2,'st.range':1,'st.quart':2,'st.var':2,'st.sd':2,'st.svar':3,
  'st.pred':1,'st.rint':1,'st.cov':2,'st.corr':2,'st.reg':3,'cb.fact':1,'cb.mult':1,'cb.pow':2,'cb.arr':2,'cb.comb':3,
  'pr.compl':1,'pr.union':1,'pr.indep':2,'pr.cond':2,'pr.total':2,'pr.bayes':3,'va.exp':1,'va.binev':1,'va.var':2,'va.lin':2,'va.law':2,'va.binp':3,
  'ln.unif':1,'ln.z':1,'ln.rule':2,'ln.phi':2,'ln.int':3,'es.se':1,'es.tcl':1,'es.icm':2,'es.n':3,'es.icp':3,'es.test':3});
ALLSK.forEach(k=>k.t=TIERS[k.id]||k.t||2);
const DIFFS=[null,
  {n:'Facile',d:'Les bases : des questions en une étape sur chaque notion.',t:[1]},
  {n:'Moyen',d:'Les bases et les questions en plusieurs étapes.',t:[1,2]},
  {n:'Difficile',d:'Questions en plusieurs étapes et notions avancées, sans indice.',t:[2,3]}];
/* Générateur pseudo-aléatoire à graine : un même code redonne exactement les mêmes questions */
function mulberry32(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function withSeed(seed,fn){const r=Math.random;Math.random=mulberry32(seed);try{return fn()}finally{Math.random=r}}
const pPool=c=>ALLSK.filter(k=>c.units.includes(k.ui)&&DIFFS[c.diff].t.includes(k.t));
function practiceQs(c){const pool=pPool(c);
  return withSeed(c.seed,()=>{const out=[];let bag=[];while(out.length<c.n){if(!bag.length)bag=shuffle([...pool]);out.push(mk(bag.pop()))}return out})}
const codeOf=c=>`${c.units.reduce((m,u)=>m|1<<u,0).toString(16).toUpperCase()}-${c.diff}-${c.n}-${c.seed.toString(36).toUpperCase()}`;
function parseCode(str){const p2=str.trim().toUpperCase().replace(/\s+/g,'').split('-');if(p2.length!==4)return null;
  const mask=parseInt(p2[0],16),diff=+p2[1],n=+p2[2],seed=parseInt(p2[3],36);
  if(!(mask>0)||mask>=1<<UNITS.length||![1,2,3].includes(diff)||!(n>=1&&n<=50)||!Number.isFinite(seed))return null;
  const units=UNITS.map((_,i)=>i).filter(i=>mask&1<<i);return{units,diff,n,seed}}
const newSeed=()=>Math.floor(Math.random()*2147483647);
const mk=k=>{const q=typoQ(k.gen());q.skill=k.id;return q};

/* Catalogue des erreurs fréquentes : étiquette + conseil ciblé */
const ERR={
  'signe':{label:'Erreur de signe',tip:'Relis chaque signe moins, surtout quand un terme change de côté ou qu’on retire une parenthèse.'},
  'calc':{label:'Erreur de calcul',tip:'La méthode est peut-être juste. Vérifie tes opérations avec la calculatrice avant de valider.'},
  'exp-mul':{label:'Exposants multipliés au lieu d’additionnés',tip:'Pour <span class="m"><i>x</i><sup>a</sup> · <i>x</i><sup>b</sup></span>, on additionne : <span class="m"><i>x</i><sup>a+b</sup></span>.'},
  'exp-pow-add':{label:'Exposants additionnés au lieu de multipliés',tip:'Une puissance de puissance se multiplie : <span class="m">(<i>x</i><sup>a</sup>)<sup>b</sup> = <i>x</i><sup>ab</sup></span>.'},
  'exp-quot-add':{label:'Quotient : exposants additionnés',tip:'Pour un quotient, on soustrait : <span class="m"><i>x</i><sup>a</sup> ÷ <i>x</i><sup>b</sup> = <i>x</i><sup>a−b</sup></span>.'},
  'exp-neg':{label:'Signe de l’exposant négatif oublié',tip:'Garde le signe : <span class="m"><i>x</i><sup>−3</sup> · <i>x</i><sup>5</sup> = <i>x</i><sup>2</sup></span>.'},
  'coef-pow':{label:'Coefficient multiplié par l’exposant',tip:'Dans <span class="m">(k<i>x</i><sup>a</sup>)<sup>b</sup></span>, le coefficient est élevé à la puissance : k<sup>b</sup>, pas k × b.'},
  'dev-middle':{label:'Terme du milieu oublié',tip:'Un produit de deux binômes donne quatre produits : n’oublie pas les deux termes en <i class="mi">x</i>.'},
  'id-rem':{label:'Identité remarquable mal appliquée',tip:'<span class="m">(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup></span>, jamais a² + b².'},
  'fac-sum':{label:'Somme incorrecte en factorisant',tip:'Les deux nombres doivent avoir pour somme le coefficient de <i class="mi">x</i>.'},
  'fac-prod':{label:'Produit incorrect en factorisant',tip:'Les deux nombres doivent avoir pour produit le terme constant.'},
  'roots-sign':{label:'Signe des solutions inversé',tip:'Si <span class="m"><i>x</i> − 3 = 0</span>, alors <span class="m"><i>x</i> = 3</span> : le signe change.'},
  'delta-formula':{label:'Formule du discriminant',tip:'<span class="m">Δ = b<sup>2</sup> − 4ac</span>, avec un moins devant 4ac.'},
  'carre-neg':{label:'Carré d’un nombre négatif',tip:'<span class="m">(−3)<sup>2</sup> = 9</span> : le carré d’un nombre négatif est positif. Mets les négatifs entre parenthèses.'},
  'delta-sign':{label:'Lecture du signe de Δ',tip:'Δ &gt; 0 : deux solutions. Δ = 0 : une seule. Δ &lt; 0 : aucune solution réelle.'},
  'vertex-sign':{label:'Signe du sommet',tip:'Dans <span class="m">(<i>x</i> − h)<sup>2</sup> + k</span>, l’abscisse du sommet est h, pas −h.'},
  'rad-root':{label:'Simplification de racine',tip:'<span class="m">√(a<sup>2</sup>b) = a√b</span> : on sort la racine du carré, pas le carré lui-même.'},
  'i-cycle':{label:'Cycle des puissances de i',tip:'<i>i</i>, −1, −<i>i</i>, 1, puis ça recommence : regarde le reste de la division par 4.'},
  'i2':{label:'i² = −1 oublié',tip:'Après avoir développé, remplace <span class="m"><i>i</i><sup>2</sup></span> par −1 : la partie réelle devient ac − bd.'},
  'log-def':{label:'Définition du logarithme',tip:'<span class="m">log<sub>b</sub>(<i>x</i>) = k</span> signifie <span class="m">b<sup>k</sup> = <i>x</i></span>.'},
  'exp-eq':{label:'Équation exponentielle',tip:'Écris les deux membres comme puissances de la même base, puis égale les exposants.'},
  'log-prod':{label:'Log d’un produit confondu avec une somme',tip:'<span class="m">log(a) + log(b) = log(a × b)</span>, pas log(a + b).'},
  'log-quot':{label:'Log d’un quotient',tip:'<span class="m">log(a) − log(b) = log(a ÷ b)</span>.'},
  'comp-order':{label:'Ordre de composition inversé',tip:'Dans <i class="mi">f</i>(<i class="mi">g</i>(<i class="mi">x</i>)), on applique <i class="mi">g</i> d’abord, puis <i class="mi">f</i>.'},
  'comp-prod':{label:'Composition confondue avec un produit',tip:'<i class="mi">f</i>(<i class="mi">g</i>(<i class="mi">x</i>)) n’est pas <i class="mi">f</i>(<i class="mi">x</i>) × <i class="mi">g</i>(<i class="mi">x</i>) : on remplace <i class="mi">x</i>.'},
  'distrib':{label:'Distributivité incomplète',tip:'<span class="m">a(<i>x</i> + b) = a<i>x</i> + ab</span> : le facteur multiplie <b>chaque</b> terme de la parenthèse.'},
  'ineq-flip':{label:'Sens de l’inégalité non inversé',tip:'Multiplier ou diviser les deux côtés par un nombre <b>négatif</b> inverse le sens : &lt; devient &gt;, ≤ devient ≥.'},
  'bracket':{label:'Crochets d’un intervalle',tip:'Crochet tourné vers le nombre s’il est inclus (≤, ≥), tourné vers l’extérieur s’il est exclu (&lt;, &gt;). L’infini est toujours exclu.'},
  'interval-dir':{label:'Sens de l’intervalle',tip:'<span class="m"><i>x</i> ≥ a</span> va vers +∞ : [a ; +∞[. <span class="m"><i>x</i> ≤ b</span> va vers −∞ : ]−∞ ; b].'},
  'ensemble':{label:'Ensembles de nombres',tip:'ℕ : entiers positifs. ℤ : entiers relatifs. ℚ : quotients d’entiers. ℝ : tous les nombres de la droite graduée.'},
  'notation-sol':{label:'Écriture de l’ensemble des solutions',tip:'Liste entre accolades S = {…}, aucune solution S = ∅, tous les réels S = ℝ, un intervalle pour une inéquation.'},
  'implication':{label:'Logique et quantificateurs',tip:'A ⇒ B n’entraîne pas B ⇒ A. Un seul contre-exemple suffit à rendre fausse une affirmation « pour tout ».'},
  'arrondi':{label:'Arrondi ou précision',tip:'Ta valeur est proche : garde plus de décimales dans les calculs intermédiaires et n’arrondis qu’à la fin, comme demandé.'},
  'stat-median':{label:'Médiane',tip:'Range d’abord les valeurs. Effectif pair : moyenne des deux valeurs centrales. La médiane n’est pas la moyenne.'},
  'stat-weight':{label:'Pondération oubliée',tip:'Chaque valeur compte autant de fois que son effectif ou selon sa probabilité : Σ nᵢxᵢ ÷ N, ou Σ xᵢpᵢ.'},
  'stat-quart':{label:'Quartiles',tip:'Convention française : Q1 est la valeur de rang n ÷ 4 arrondi à l’entier supérieur, Q3 celle de rang 3n ÷ 4.'},
  'stat-var':{label:'Variance et écart-type',tip:'Variance = moyenne des carrés des écarts à la moyenne = E(X²) − E(X)². L’écart-type est sa racine carrée.'},
  'stat-2var':{label:'Covariance, corrélation, régression',tip:'cov = moyenne des xy − x̄ȳ. r = cov ÷ (σₓσᵧ). Pente a = cov ÷ V(x), puis b = ȳ − a x̄.'},
  'comb-order':{label:'Ordre ou pas ordre',tip:'Si l’ordre compte (podium, bureau) : arrangement A(n ; k). Sinon (équipe, main de cartes) : combinaison C(n ; k) = A(n ; k) ÷ k!.'},
  'comb-rep':{label:'Avec ou sans répétition',tip:'Avec répétition, chaque position a n choix : nᵏ. Sans répétition, les choix diminuent : n(n − 1)(n − 2)…'},
  'comb-mult':{label:'Principe multiplicatif',tip:'Pour des choix successifs, on multiplie les nombres de possibilités (on n’additionne pas).'},
  'proba-compl':{label:'Événement contraire',tip:'P(Ā) = 1 − P(A). Pour « au moins un », passe par le contraire « aucun ».'},
  'proba-union':{label:'Probabilité d’une union',tip:'P(A ∪ B) = P(A) + P(B) − P(A ∩ B) : l’intersection est comptée deux fois.'},
  'proba-cond':{label:'Probabilité conditionnelle',tip:'P<sub>A</sub>(B) = P(A ∩ B) ÷ P(A) : on divise par la probabilité de ce que l’on sait déjà. Ne confonds pas P<sub>A</sub>(B) et P<sub>B</sub>(A).'},
  'proba-indep':{label:'Indépendance',tip:'A et B sont indépendants si P(A ∩ B) = P(A) × P(B). Indépendants ne veut pas dire incompatibles.'},
  'va-lin':{label:'Transformation affine',tip:'E(aX + b) = aE(X) + b mais V(aX + b) = a²V(X) : décaler ne change pas la dispersion.'},
  'binom-coef':{label:'Coefficient binomial oublié',tip:'P(X = k) = C(n ; k) pᵏ(1 − p)ⁿ⁻ᵏ : C(n ; k) compte les façons de placer les k succès.'},
  'binom-law':{label:'Reconnaître une loi binomiale',tip:'n répétitions identiques et indépendantes, deux issues, X compte les succès : B(n ; p). Un tirage sans remise n’est pas binomial.'},
  'loi-normale':{label:'Loi normale',tip:'Centre-réduis : Z = (X − μ) ÷ σ. P(X &gt; x) = 1 − P(X ≤ x), et Φ(−z) = 1 − Φ(z) par symétrie.'},
  'ic':{label:'Erreur-type et intervalle de confiance',tip:'L’erreur-type de la moyenne vaut σ ÷ √n. IC à 95 % : estimation ± 1,96 × erreur-type.'},
  'test':{label:'Décision d’un test',tip:'Au seuil de 5 %, on rejette H₀ si |z| &gt; 1,96. Ne pas rejeter H₀ ne prouve pas qu’elle est vraie.'},
  'inv-recip':{label:'Réciproque confondue avec l’inverse',tip:'<i class="mi">f</i><sup>−1</sup> n’est pas 1 ⁄ <i class="mi">f</i> : on échange les rôles de <i class="mi">x</i> et <i class="mi">y</i>.'},
};

/* ================= stockage, sons ================= */
const KEY='equilibre.v1';
const defST=()=>({xp:0,stars:{},streak:{n:0,last:null},day:{d:null,xp:0},muted:false,skills:{},errors:{},hist:[],log:[]});
const clone=o=>JSON.parse(JSON.stringify(o));
let ST;try{ST=Object.assign(defST(),JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){ST=defST()}
/* Base locale : tout reste dans le navigateur de cet appareil, sans compte ni connexion. */
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(ST))}catch(e){}};
const dkey=(o=0)=>{const d=new Date();d.setDate(d.getDate()-o);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
let AC=null;
function tone(f,d,type='triangle',g=.05,w=0){if(ST.muted)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime+w,o=AC.createOscillator(),v=AC.createGain();o.type=type;o.frequency.value=f;v.gain.setValueAtTime(g,t);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(v).connect(AC.destination);o.start(t);o.stop(t+d)}catch(e){}}
const sfx={tap:()=>tone(700,.04,'triangle',.025),ok:()=>{tone(523,.12);tone(784,.2,'triangle',.05,.09)},ko:()=>tone(150,.28,'sawtooth',.035),
  win:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.22,'triangle',.05,i*.1))};
const buzz=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};

/* ================= icônes ================= */
const sv=(p,f=1)=>`<svg class="i" viewBox="0 0 24 24" ${f?'fill="currentColor"':'fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"'} aria-hidden="true">${p}</svg>`;
const I={
  flame:sv('<path d="M12 2c.8 3.6 5.5 6 5.5 11.2a5.5 5.5 0 0 1-11 0c0-2.3 1.2-4 2.3-5 .1 2 1 3.2 2.2 3.4C10.6 8.6 10 5.4 12 2z"/>'),
  bolt:sv('<path d="M13.5 2 4 13.5h7L10 22l9.5-11.8h-7z"/>'),
  heart:sv('<path d="M12 21s-7.3-4.5-9.5-9.2A5.4 5.4 0 0 1 12 6.1a5.4 5.4 0 0 1 9.5 5.7C19.3 16.5 12 21 12 21z"/>'),
  star:sv('<path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z"/>'),
  x:sv('<path d="M6 6l12 12M18 6 6 18"/>',0),
  undo:sv('<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',0),
  bs:sv('<path d="M21 5H9l-6 7 6 7h12z"/><path d="m17 9-6 6M11 9l6 6"/>',0),
  l:sv('<path d="m15 6-6 6 6 6"/>',0), r:sv('<path d="m9 6 6 6-6 6"/>',0),
  sound:sv('<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 8.5a5 5 0 0 1 0 7"/>',0),
  mute:sv('<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="m17 10 4 4m0-4-4 4"/>',0),
  check:sv('<path d="m5 12.5 4.5 4.5L19 7.5"/>',0),
  calc:sv('<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8.5 6.5h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01"/>',0),
  chev:sv('<path d="m9 6 6 6-6 6"/>',0),
  book:sv('<path d="M3 5h6a3 3 0 0 1 3 3v12a2.5 2.5 0 0 0-2.5-2.5H3z"/><path d="M21 5h-6a3 3 0 0 0-3 3v12a2.5 2.5 0 0 1 2.5-2.5H21z"/>',0),
  user:sv('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6"/>',0),
  logo:`<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="7" width="9" height="9" rx="1.5" fill="var(--t-c)"/><rect x="20" y="4" width="9" height="12" rx="1.5" fill="var(--t-x)"/><rect x="2" y="17" width="28" height="3" rx="1.5" fill="var(--ink)"/><path d="M16 20l-5 9h10z" fill="var(--ink)"/></svg>`
};
const starsH=n=>`<span class="stars" aria-label="${n} étoile${n>1?'s':''} sur 3">${[0,1,2].map(i=>I.star.replace('class="i"',`class="i${i<n?' on':''}"`)).join('')}</span>`;
