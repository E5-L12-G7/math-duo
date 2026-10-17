/* ===================== Parcours « Apprendre à prouver » (pr) =====================
   Construit sans document source. Préfixes : gPf… (générateurs), PF_… (données), pf… (outils). */
Object.assign(ANA_ERR,{
  'pr-exemple':{label:'Exemple pris pour une preuve',tip:'Des exemples rendent une affirmation plausible, ils ne la prouvent pas. Un seul contre-exemple suffit à réfuter un « pour tout ».'},
  'pr-ou':{label:'Le « ou » mathématique',tip:'« P ou Q » est vraie dès qu’au moins une des deux est vraie, y compris quand les deux le sont (ou inclusif).'},
  'pr-negation':{label:'Négation mal faite',tip:'non(P et Q) = non P ou non Q ; non(∀x, P) = ∃x, non P ; le contraire de « &gt; » est « ≤ ».'},
  'pr-reciproque':{label:'Réciproque prise pour l’implication',tip:'P ⇒ Q ne dit rien de Q ⇒ P. Une implication vraie peut avoir une réciproque fausse.'},
  'pr-cns':{label:'Nécessaire ou suffisant',tip:'Si A ⇒ B : A est une condition suffisante pour B, et B est une condition nécessaire pour A.'},
  'pr-quantif':{label:'Quantificateurs',tip:'Un exemple prouve un « il existe », jamais un « pour tout ». L’ordre de ∀ et ∃ change le sens.'},
  'pr-redaction':{label:'Rédaction d’une preuve',tip:'Introduis un objet quelconque (« Soit… »), une nouvelle lettre pour chaque objet, ne suppose jamais la conclusion.'},
  'pr-cas':{label:'Cas oubliés',tip:'Les cas doivent couvrir toutes les possibilités : pair et impair, tous les restes, le cas x = 0…'},
  'pr-contrapose':{label:'Contraposée',tip:'La contraposée de P ⇒ Q est non Q ⇒ non P : on échange ET on nie. Elle est équivalente à P ⇒ Q.'},
  'pr-absurde':{label:'Raisonnement par l’absurde',tip:'On suppose la négation exacte de ce qu’on veut prouver, puis on cherche une contradiction précise.'},
  'pr-heredite':{label:'Hérédité',tip:'On suppose P(n) pour un n fixé (pas pour tout n) et on démontre P(n + 1).'},
  'pr-init':{label:'Initialisation oubliée',tip:'Sans initialisation, l’hérédité ne prouve rien : « n = n + 1 » se transmet de n à n + 1 mais n’est jamais vraie.'},
  'pr-unicite':{label:'Existence et unicité',tip:'L’existence (un objet convient) et l’unicité (deux objets qui conviennent sont égaux) sont deux preuves distinctes.'},
  'pr-synthese':{label:'Analyse sans synthèse',tip:'L’analyse ne fournit que des candidats ; la synthèse vérifie qu’ils conviennent vraiment.'},
  'pr-equiv':{label:'Fausse équivalence',tip:'Élever au carré ou diviser par une expression peut-être nulle n’est pas réversible : vérifie les solutions.'},
  'pr-justif':{label:'Justification d’une étape',tip:'Chaque étape doit citer la règle qui l’autorise, avec ses hypothèses (signe, non-nullité…).'}
});

/* ---- outils ---- */
const pfPrime=n=>{if(!Number.isInteger(n)||n<2)return false;for(let d=2;d*d<=n;d++)if(n%d===0)return false;return true};
const pfDiv=n=>{for(let d=2;d*d<=n;d++)if(n%d===0)return d;return n};
const pfVF=(bank,tag,hint)=>{const[s,v,why]=pick(bank);
  return mcq('Vrai ou faux ?',stx(s),[{h:'Vrai',ok:v,tag},{h:'Faux',ok:!v,tag}],(v?'<b>Vrai.</b> ':'<b>Faux.</b> ')+why,hint,true)};
const pfSi=s=>/^il /.test(s)?'S’'+s:'Si '+s;
const pfW=(h,why,tag,x)=>Object.assign({h,why},tag?{tag}:{},x||{});
const pfOK=(h,x)=>Object.assign({h,ok:true},x||{});
const pfM=v=>num(v);

/* ===================== Chapitre 1 : pourquoi prouver ===================== */
const PF_FAMS=[
  ()=>{const c=pick([3,5,11,17,41]);return{t:`n² + n + ${c}`,f:n=>n*n+n+c,s:0}},
  ()=>{const[a,b]=pick([[2,1],[6,-1],[30,1],[4,3],[10,1],[6,1],[12,5],[8,3]]);return{t:`${a}n ${b<0?'−':'+'} ${Math.abs(b)}`,f:n=>a*n+b,s:1}},
  ()=>pick([{t:'n² + 1',f:n=>n*n+1,s:1},{t:'2<sup>n</sup> + 1',f:n=>2**n+1,s:1},{t:'2<sup>n</sup> + 3',f:n=>2**n+3,s:1},
    {t:'2<sup>n</sup> − 1',f:n=>2**n-1,s:2},{t:'n! + 1',f:n=>fact(n)+1,s:1},{t:'3<sup>n</sup> + 2',f:n=>3**n+2,s:0}])];
const gPfCe=()=>{const F=pick(PF_FAMS)();let n=F.s;while(pfPrime(F.f(n)))n++;const v=F.f(n),d=pfDiv(v),ok=[];
  for(let k=F.s;k<n;k++)ok.push(`n = ${k} : ${pfM(F.f(k))}`);
  const list=ok.length>5?ok.slice(0,3).join(' ; ')+' ; … ; '+ok[ok.length-1]:ok.join(' ; ');
  return nq({instr:'Trouve le plus petit contre-exemple.',prompt:stx(`Quelqu’un affirme : « pour tout entier n ≥ ${F.s}, ${F.t} est un nombre premier ». Quel est le plus petit entier n ≥ ${F.s} qui montre que c’est faux ?`),labels:['n ='],t:[n],
    explain:`On teste dans l’ordre. ${list} : ${ok.length>1?'tous premiers':'premier'}. Pour n = ${n} : ${pfM(v)} = ${d} × ${pfM(v/d)}, qui n’est pas premier. Un seul contre-exemple suffit : l’affirmation est fausse.`,
    hint:`Calcule l’expression pour n = ${F.s}, puis ${F.s+1}, … et arrête-toi au premier résultat qui n’est pas premier.`,
    diag:([x])=>Number.isInteger(x)&&x>=F.s&&x<n?'pr-exemple':null})};
const PF_VF1=[
  ['Si une affirmation sur les entiers est vraie pour n = 1, 2, …, 1000, alors elle est vraie pour tout entier n.',false,'n² + n + 41 est premier pour n = 0 à 39, puis échoue à n = 40. Des vérifications, même nombreuses, ne couvrent jamais tous les entiers.'],
  ['Pour montrer qu’une affirmation « pour tout entier n » est fausse, un seul contre-exemple suffit.',true,'Une affirmation générale promet que tous les cas marchent : un seul cas qui échoue rompt la promesse.'],
  ['Une conjecture est une affirmation dont on sait qu’elle est fausse.',false,'Une conjecture est une affirmation qu’on croit vraie mais qu’on n’a pas encore démontrée ; elle peut se révéler vraie ou fausse.'],
  ['Un théorème est vrai dans tous les cas couverts par ses hypothèses, même ceux que personne n’a calculés.',true,'C’est tout l’intérêt d’une démonstration : elle couvre tous les cas d’un coup.'],
  ['Pour réfuter « tout entier impair est premier », on peut citer 9.',true,'9 est impair et 9 = 3 × 3 n’est pas premier : c’est un contre-exemple.'],
  ['L’exemple 3 + 5 = 8 prouve que la somme de deux entiers impairs est toujours paire.',false,'Un exemple rend la propriété plausible. La preuve écrit a = 2k + 1, b = 2m + 1 et calcule a + b = 2(k + m + 1).'],
  ['La conjecture de Goldbach (tout entier pair ≥ 4 est somme de deux nombres premiers) est démontrée.',false,'Elle a été vérifiée par ordinateur sur d’immenses plages de nombres, mais personne ne l’a démontrée : c’est toujours une conjecture.'],
  ['Un contre-exemple à « si P, alors Q » doit vérifier P et ne pas vérifier Q.',true,'Seul un cas où l’hypothèse est vraie et la conclusion fausse rompt la promesse.'],
  ['Si on ne trouve aucun contre-exemple après de longues recherches, l’affirmation est démontrée.',false,'La conjecture de Pólya n’a été réfutée qu’avec un contre-exemple proche du milliard. Ne pas trouver n’est pas démontrer.'],
  ['Une démonstration doit couvrir tous les cas, y compris ceux qu’on n’a pas testés.',true,'C’est la différence entre constater (quelques cas) et démontrer (tous les cas).']];
const gPfVF1=()=>pfVF(PF_VF1,'pr-exemple','Un exemple ne prouve pas un « pour tout » ; un contre-exemple le réfute.');
const PF_STAT={conj:'Une conjecture',thm:'Un théorème',ce:'Un contre-exemple',ex:'Un simple exemple'};
const PF_VOC=[
  ['Un élève remarque que 2 + 4, 6 + 8 et 10 + 12 sont pairs et affirme, sans autre argument, que la somme de deux entiers pairs est toujours paire.','conj','C’est une affirmation générale appuyée sur des exemples, pas encore démontrée : une conjecture (vraie, d’ailleurs, mais il reste à la prouver).'],
  ['Euclide démontre, par un raisonnement valable pour toutes les listes finies de nombres premiers, qu’il existe une infinité de nombres premiers.','thm','Affirmation générale démontrée : c’est un théorème.'],
  ['Pour l’affirmation « tout nombre impair est premier », le nombre 15.','ce','15 est impair mais 15 = 3 × 5 : c’est un cas où l’affirmation échoue, un contre-exemple.'],
  ['Pour l’affirmation « tout multiple de 4 est pair », le nombre 12.','ex','12 est multiple de 4 et pair : il vérifie l’affirmation, c’est un simple exemple (qui ne prouve rien).'],
  ['La conjecture de Goldbach, vérifiée par ordinateur sur d’immenses plages de nombres mais sans démonstration générale.','conj','Tant qu’aucune démonstration n’existe, elle reste une conjecture, même vérifiée des milliards de fois.'],
  ['Le grand théorème de Fermat, énoncé vers 1637 et démontré par Andrew Wiles (preuve achevée en 1994).','thm','Une fois démontrée, l’affirmation est un théorème.'],
  ['Pour l’affirmation « n² + n + 41 est premier pour tout entier n ≥ 0 », la valeur n = 40.','ce','40² + 40 + 41 = 1681 = 41 × 41 : l’affirmation échoue, c’est un contre-exemple.'],
  ['Pour l’affirmation « n² + n + 41 est premier pour tout entier n ≥ 0 », la valeur n = 7.','ex','7² + 7 + 41 = 97, qui est premier : c’est un exemple, qui ne prouve rien.']];
const gPfVoc=()=>{const[s,k,why]=pick(PF_VOC);
  return mcq('De quoi s’agit-il ?',stx(s),Object.entries(PF_STAT).map(([kk,h])=>({h,ok:kk===k,tag:'pr-exemple'})),why,
    'Exemple et contre-exemple sont des cas particuliers ; conjecture et théorème sont des affirmations générales, la seconde démontrée.')};
const gPfR1=()=>{const c=pick([5,11,17,41]),f=n=>n*n+n+c,m=c-1;
  return chain({instr:'Réfute l’affirmation en construisant ton raisonnement.',prompt:stx(`Affirmation : « pour tout entier n ≥ 0, n² + n + ${c} est un nombre premier ».`),
    steps:[
      {q:'Pour montrer que cette affirmation est fausse, il faut…',o:[
        pfOK(`trouver un seul entier n pour lequel n² + n + ${c} n’est pas premier`),
        pfW(`montrer que n² + n + ${c} n’est premier pour aucun entier n`,'C’est beaucoup trop demander : pour nier « pour tout n », un seul n qui échoue suffit.','pr-negation'),
        pfW(`trouver plusieurs entiers n pour lesquels n² + n + ${c} est premier`,'Des cas où l’expression est première confirment l’affirmation : ils ne peuvent pas la réfuter.','pr-exemple'),
        pfW('tester n = 0, 1, 2, 3 et suivre la majorité des résultats','Ce n’est pas un vote : une majorité de succès ne prouve rien, et un seul échec suffit à réfuter.','pr-exemple')]},
      {q:'Quel entier tester en priorité ?',o:[pfOK(`n = ${m}`),...[1,2,3].map(k=>pfW(`n = ${k}`,`Pour n = ${k}, on obtient ${f(k)}, qui est premier : ce n’est pas un contre-exemple.`,'pr-exemple'))]},
      {q:`Pour n = ${m}, que vaut l’expression, et qu’en conclure ?`,o:[
        pfOK(`${m}² + ${m} + ${c} = ${pfM(f(m))} = ${c} × ${c} : ce n’est pas un nombre premier`),
        pfW(`${m}² + ${m} + ${c} = ${pfM(f(m))} : il est impair, donc premier`,`Impair ne veut pas dire premier : ${pfM(f(m))} = ${c} × ${c}.`),
        pfW(`${m}² + ${m} + ${c} = ${pfM(f(m))} = ${c} × ${c}, mais un seul cas ne compte pas`,'Si : un seul cas qui échoue suffit à rendre fausse une affirmation « pour tout ».','pr-exemple')]},
      {q:'Conclusion :',o:[
        pfOK(`L’affirmation est fausse : n = ${m} est un contre-exemple.`),
        pfW('L’affirmation reste vraie, car elle marche pour presque tous les n.','Une affirmation « pour tout » qui échoue une seule fois est fausse.','pr-exemple'),
        pfW('On ne peut rien conclure sans tester d’autres valeurs.','Un contre-exemple vérifié suffit : inutile d’en chercher d’autres.','pr-exemple')]}],
    explain:`Pour réfuter un « pour tout », un seul contre-exemple suffit. Pour n = ${m} : n² + n = n(n + 1) = ${m} × ${c}, donc n² + n + ${c} = ${m} × ${c} + ${c} = ${c} × ${c} = ${pfM(c*c)}, qui n’est pas premier.${c===41?' C’est l’exemple célèbre d’Euler : premier de n = 0 à 39, raté à n = 40.':''}`,
    hint:`Regarde ce que devient n² + n quand n = ${c} − 1.`})};
const PF_CEX=[
  ()=>{const[ce,cv]=pick([['1/2','0,25'],['0,3','0,09'],['0,8','0,64']]);return{s:'Pour tout réel x, x² ≥ x.',ce:`x = ${ce}`,non:['x = 2','x = −1','x = 1'],
    ex:`Pour x = ${ce} : x² = ${cv}, et ${cv} &lt; ${ce}. Les autres valeurs vérifient x² ≥ x : 4 ≥ 2, 1 ≥ −1, 1 ≥ 1.`}},
  ()=>{const a=R(2,9);return{s:'Pour tout réel x, √(x²) = x.',ce:`x = −${a}`,non:[`x = ${a}`,'x = 0',`x = ${a+1}`],ex:`Pour x = −${a} : √((−${a})²) = √${a*a} = ${a} ≠ −${a}. Pour x ≥ 0, l’égalité est vraie ; en fait √(x²) = |x|.`}},
  ()=>{const a=R(2,9);return{s:`Pour tout réel x, si x² = ${a*a}, alors x = ${a}.`,ce:`x = −${a}`,non:[`x = ${a}`,'x = 0',`x = ${2*a}`],ex:`Pour x = −${a}, l’hypothèse x² = ${a*a} est vraie et la conclusion x = ${a} est fausse. Pour x = 0 ou ${2*a}, l’hypothèse est fausse : ces cas ne réfutent rien. Pour x = ${a}, tout est vrai.`}},
  ()=>{const ce=pick([2,3,4]);return{s:'Pour tout entier n ≥ 1, 2<sup>n</sup> &gt; n².',ce:`n = ${ce}`,non:shuffle([1,5,6,7]).slice(0,3).map(k=>`n = ${k}`),ex:`Pour n = ${ce} : 2<sup>${ce}</sup> = ${2**ce} et ${ce}² = ${ce*ce}, donc 2<sup>n</sup> &gt; n² est faux. (Pour n = 1, 5, 6, 7 : 2 &gt; 1, 32 &gt; 25, 64 &gt; 36, 128 &gt; 49.)`}},
  ()=>{const ce=pick([2,3,6,7]);return{s:'Pour tout entier n, n² − n est divisible par 4.',ce:`n = ${ce}`,non:shuffle([4,5,8,9]).slice(0,3).map(k=>`n = ${k}`),ex:`Pour n = ${ce} : n² − n = ${ce*ce-ce}, qui n’est pas divisible par 4. (Pour 4, 5, 8, 9 : 12, 20, 56, 72 sont divisibles par 4.)`}},
  ()=>{const[a,b,s]=pick([[9,16,'√25 = 5 mais √9 + √16 = 7'],[1,1,'√2 ≈ 1,41 mais √1 + √1 = 2'],[4,9,'√13 ≈ 3,61 mais √4 + √9 = 5']]);return{s:'Pour tous réels a ≥ 0 et b ≥ 0, √(a + b) = √a + √b.',ce:`a = ${a} et b = ${b}`,non:['a = 0 et b = 4','a = 9 et b = 0','a = 0 et b = 0'],ex:`Pour a = ${a} et b = ${b} : ${s}. Quand a ou b est nul, l’égalité est vraie, ce qui ne prouve rien.`}},
  ()=>{const ce=pick(['1/2','−2','1']);return{s:'Pour tout réel x non nul, 1/x &lt; x.',ce:`x = ${ce}`,non:shuffle(['2','3','−1/2','5']).slice(0,3).map(v=>`x = ${v}`),ex:`Pour x = ${ce} : 1/x = ${{'1/2':'2','−2':'−1/2','1':'1'}[ce]}, qui n’est pas strictement inférieur à ${ce}. Les autres valeurs proposées vérifient bien 1/x &lt; x.`}}];
const gPfCex=()=>{const T=pick(PF_CEX)();
  return mcq('Lequel est un contre-exemple ?',stx(`Affirmation : « ${T.s} »`),[{h:T.ce,ok:true},...T.non.map(h=>({h,tag:'pr-exemple'}))],T.ex,'Un contre-exemple vérifie toutes les conditions de l’affirmation, mais pas sa conclusion.')};
const PF_CONJ=[
  {s:'Fermat (XVIIᵉ siècle) remarque que 2<sup>2<sup>n</sup></sup> + 1 vaut 3, 5, 17, 257 et 65 537 pour n = 0, 1, 2, 3, 4 : cinq nombres premiers. Il pense que ce nombre est toujours premier.',f:'Euler montre en 1732 que pour n = 5, 2<sup>32</sup> + 1 = 4 294 967 297 = 641 × 6 700 417.'},
  {s:'On constate que n² + n + 41 est un nombre premier pour n = 0, 1, 2, …, 39 : quarante succès d’affilée. On pense que c’est vrai pour tout entier n ≥ 0.',f:'Pour n = 40 : 40² + 40 + 41 = 1681 = 41 × 41.'},
  {s:'On place n points sur un cercle et on trace tous les segments qui les relient (jamais trois segments concourants à l’intérieur). Avec 1, 2, 3, 4, 5 points, on compte 1, 2, 4, 8, 16 régions. On pense qu’avec n points il y a toujours 2<sup>n−1</sup> régions.',f:'Avec 6 points, on compte 31 régions, et non 32.'},
  {s:'On remarque que 2<sup>n</sup> − 1 est premier pour les nombres premiers n = 2, 3, 5, 7 (on obtient 3, 7, 31, 127). On pense que si n est premier, 2<sup>n</sup> − 1 l’est aussi.',f:'Pour n = 11 : 2<sup>11</sup> − 1 = 2047 = 23 × 89.'}];
const gPfR2=()=>{const S=pick(PF_CONJ);
  return chain({instr:'Suis l’histoire de cette conjecture, étape par étape.',prompt:stx(S.s),
    steps:[
      {q:'Après ces vérifications, quel est le statut de l’affirmation ?',o:[
        pfOK('Une conjecture : plausible, mais pas démontrée'),
        pfW('Un théorème : autant de vérifications suffisent','Aucun nombre de vérifications ne couvre une infinité de cas.','pr-exemple'),
        pfW('Une affirmation fausse, puisqu’elle n’est pas démontrée','Ne pas être démontrée ne rend pas fausse : c’est une conjecture, encore non tranchée.')]},
      {q:'Que faudrait-il pour la réfuter ?',o:[
        pfOK('Un seul cas où elle échoue'),
        pfW('Que la majorité des cas échouent','Un seul échec suffit à rendre fausse une affirmation générale.','pr-exemple'),
        pfW('Une démonstration que tous les cas échouent','C’est confondre la négation de « pour tout » avec « pour aucun ».','pr-negation')]},
      {q:`On découvre alors : ${S.f} Que montre ce fait ?`,o:[
        pfOK('C’est un contre-exemple'),
        pfW('C’est une exception qui ne compte pas : la règle reste vraie','En mathématiques, une règle générale n’a pas d’exception : un cas qui échoue la rend fausse.','pr-exemple'),
        pfW('Il faut d’autres contre-exemples pour conclure','Un seul contre-exemple vérifié suffit.','pr-exemple')]},
      {q:'Conclusion :',o:[
        pfOK('L’affirmation générale est fausse, même si elle marche dans beaucoup de cas'),
        pfW('L’affirmation est vraie sauf pour ce cas, donc vraie en général','« Vraie en général » ne veut rien dire pour un « pour tout » : elle est fausse.','pr-exemple'),
        pfW('L’affirmation était un théorème, puis elle est devenue fausse','Un théorème démontré ne devient jamais faux : ce n’était qu’une conjecture.')]}],
    explain:`Les premières vérifications donnent une conjecture. ${S.f} Ce contre-exemple suffit : l’affirmation générale est fausse. Morale : constater n’est pas démontrer.`})};
const PF_PAR=[
  {st:'La somme de deux entiers impairs est paire.',ex:'3 + 5 = 8 et 7 + 11 = 18',who:'a et b deux entiers impairs',nums:'a = 3 et b = 5',
    tr:['a = 2k + 1 et b = 2m + 1, avec k et m entiers','a = 2k + 1 et b = 2k + 1, avec k entier','a = 2k + 1 et b = 2k + 3, avec k entier'],
    calc:['a + b = 2k + 2m + 2 = 2(k + m + 1)','a + b = 4k + 2 = 2(2k + 1)','a + b = 4k + 4 = 4(k + 1)'],err:'a + b = 2k + 2m + 1 = 2(k + m) + 1',errWhy:'Il y a deux « + 1 » : 1 + 1 = 2.',q:'k + m + 1',res:'a + b est pair'},
  {st:'La somme d’un entier pair et d’un entier impair est impaire.',ex:'4 + 7 = 11 et 10 + 3 = 13',who:'a un entier pair et b un entier impair',nums:'a = 4 et b = 7',
    tr:['a = 2k et b = 2m + 1, avec k et m entiers','a = 2k et b = 2k + 1, avec k entier','a = 2k et b = k + 1, avec k entier'],
    calc:['a + b = 2k + 2m + 1 = 2(k + m) + 1','a + b = 4k + 1 = 2(2k) + 1','a + b = 3k + 1'],err:'a + b = 2k + 2m + 1 = 2(k + m + 1)',errWhy:'2(k + m + 1) vaut 2k + 2m + 2, pas 2k + 2m + 1.',q:'k + m',res:'a + b est impair'},
  {st:'Le produit de deux entiers impairs est impair.',ex:'3 × 5 = 15 et 7 × 9 = 63',who:'a et b deux entiers impairs',nums:'a = 3 et b = 5',
    tr:['a = 2k + 1 et b = 2m + 1, avec k et m entiers','a = 2k + 1 et b = 2k + 1, avec k entier','a = 2k + 1 et b = 2k + 3, avec k entier'],
    calc:['ab = 4km + 2k + 2m + 1 = 2(2km + k + m) + 1','ab = 4k² + 4k + 1 = 2(2k² + 2k) + 1','ab = 4k² + 8k + 3 = 2(2k² + 4k + 1) + 1'],err:'ab = 4km + 1 = 2(2km) + 1',errWhy:'En développant (2k + 1)(2m + 1), il ne faut pas oublier les termes 2k et 2m.',errTag:'distrib',q:'2km + k + m',res:'ab est impair'},
  {st:'La somme de deux entiers pairs est paire.',ex:'2 + 6 = 8 et 10 + 14 = 24',who:'a et b deux entiers pairs',nums:'a = 2 et b = 6',
    tr:['a = 2k et b = 2m, avec k et m entiers','a = 2k et b = 2k, avec k entier','a = 2k et b = 2k + 2, avec k entier'],
    calc:['a + b = 2k + 2m = 2(k + m)','a + b = 4k = 2(2k)','a + b = 4k + 2 = 2(2k + 1)'],err:'a + b = 2k + 2m = 4km',errWhy:'2k + 2m est une somme : on factorise par 2, on ne multiplie pas.',q:'k + m',res:'a + b est pair'}];
const PF_TRW=['Avec la même lettre k, les deux nombres sont forcément égaux : tu ne traites que le cas a = b.','Ces deux nombres sont liés (consécutifs ou dépendants l’un de l’autre) : ce n’est qu’un cas particulier.'];
const pfParCalc=(T,stepIdx)=>({q:'Calcule et fais apparaître la forme voulue :',o:prev=>{const i=prev[stepIdx].i??0;
  return[...T.calc.map((h,j)=>j===i?pfOK(h):pfW(h,'Ce calcul ne correspond pas à l’écriture choisie à l’étape précédente.')),pfW(T.err,T.errWhy,T.errTag||'calc')]}});
const gPfR3=()=>{const T=pick(PF_PAR);
  return chain({instr:'Passe de l’exemple à la preuve.',prompt:stx(`Affirmation : « ${T.st} » Un élève vérifie : ${T.ex}.`),
    steps:[
      {q:'Ces exemples prouvent-ils l’affirmation ?',o:[
        pfOK('Non : ils la rendent plausible, mais ne couvrent pas tous les entiers'),
        pfW('Oui : deux exemples différents suffisent','Deux cas, ou mille, ne couvrent pas l’infinité des entiers.','pr-exemple'),
        pfW('Oui, à condition d’en vérifier au moins dix','Le nombre d’exemples ne change rien : il faut un argument général.','pr-exemple')]},
      {q:'Pour couvrir tous les cas, comment écrire les deux entiers ?',o:[pfOK(T.tr[0],{i:0}),pfW(T.tr[1],PF_TRW[0],'pr-redaction',{i:1}),pfW(T.tr[2],PF_TRW[1],'pr-redaction',{i:2})]},
      pfParCalc(T,1),
      {q:'Conclusion :',o:[
        pfOK(`Comme ${T.q} est un entier, ${T.res}, quels que soient a et b.`),
        pfW(`Donc ${T.res}, mais seulement lorsque a = b.`,'Avec deux lettres distinctes k et m, le calcul couvre tous les couples (a ; b).'),
        pfW(`Donc ${T.res}, à condition que ${T.q} soit positif.`,'Le signe ne joue aucun rôle : 2 × (entier) est pair, que l’entier soit positif ou négatif.')]}],
    explain:`Les exemples ne suffisent pas. On écrit ${T.tr[0]} (deux lettres, car a et b sont quelconques). Alors ${T.calc[0]}. Comme ${T.q} est un entier, ${T.res} : c’est démontré pour tous les entiers à la fois.`})};

/* ===================== Chapitre 2 : et, ou, non ===================== */
const gPfProp=()=>{const a=R(2,9),b=R(2,9),p=pick([7,11,13,17,19,23,9,15,21]);
  const[s,v]=pick([[`${a} + ${b} = ${a+b}`,true],[`${a} + ${b} = ${a+b+1}`,false],[`${p} est un nombre premier`,pfPrime(p)],[`${a*b} est un nombre pair`,a*b%2===0],[`${a} × ${b} &gt; ${a+b}`,a*b>a+b]]);
  const non=shuffle([['x + 3 = 7','sa vérité dépend de x'],['Calcule 3 × 4.','c’est un ordre'],['Le nombre n est pair.','sa vérité dépend de n'],['Est-ce que 7 est premier ?','c’est une question'],['2x − 1','c’est une expression, pas une phrase'],['x² ≥ 4','sa vérité dépend de x']]).slice(0,3);
  return mcq('Laquelle de ces phrases est une proposition ?',stx('Une proposition est une phrase qui est soit vraie, soit fausse.'),[{h:`« ${s} »`,ok:true},...non.map(([t])=>({h:`« ${t} »`}))],
    `« ${s} » est une proposition ${v?'vraie':'fausse'}. Les autres n’en sont pas : ${non.map(([t,w])=>`« ${t} » : ${w}`).join(' ; ')}.`,'Peux-tu dire, sans rien ajouter, si la phrase est vraie ou fausse ?')};
const PF_PN=[
  {t:'n est pair',f:n=>n%2===0,w:n=>n%2===0?`${n} = 2 × ${n/2}`:`${n} = 2 × ${(n-1)/2} + 1 est impair`},
  {t:'n est multiple de 3',f:n=>n%3===0,w:n=>n%3===0?`${n} = 3 × ${n/3}`:`${n} n’est pas dans la table de 3`},
  {t:'n est multiple de 5',f:n=>n%5===0,w:n=>n%5===0?`${n} = 5 × ${n/5}`:`${n} ne se termine ni par 0 ni par 5`},
  {t:'n est premier',f:pfPrime,w:n=>pfPrime(n)?`${n} n’a pas d’autre diviseur que 1 et lui-même`:`${n} = ${pfDiv(n)} × ${n/pfDiv(n)}`}];
const pfIneqTxt=(op,k)=>`n ${op==='>'?'&gt;':'&lt;'} ${k}`;
const gPfVal=()=>{const P=pick(PF_PN),op=pick(['>','<']),conn=pick(['et','ou']),target=pick(['VV','VV','VF','FV','FF']);let n,k,vp,vq;
  for(let t=0;t<300;t++){n=R(2,40);k=R(4,36);vp=P.f(n);vq=op==='>'?n>k:n<k;if((vp?'V':'F')+(vq?'V':'F')===target)break}
  const v=conn==='et'?vp&&vq:vp||vq,Q=pfIneqTxt(op,k);
  return mcq('Cette phrase est-elle vraie ?',stx(`Pour n = ${n}, la phrase « ${P.t} ${conn} ${Q} » est-elle vraie ?`),
    [{h:'Vraie',ok:v},{h:'Fausse',ok:!v,tag:conn==='ou'&&vp&&vq?'pr-ou':null}],
    `« ${P.t} » est ${vp?'vraie':'fausse'} (${P.w(n)}). « ${Q} » est ${vq?'vraie':'fausse'}. ${conn==='et'?'Avec « et », il faut que les deux soient vraies':'Avec « ou » (inclusif), il suffit qu’au moins une soit vraie'} : la phrase est ${v?'vraie':'fausse'}.`,
    'Évalue chaque morceau séparément, puis applique la règle du mot de liaison.',true)};
const pfNPool=()=>{const k=R(3,20);return{np:[{t:'n est pair',n:'n est impair'},{t:'n est multiple de 3',n:'n n’est pas multiple de 3'},{t:'n est premier',n:'n n’est pas premier'}],
  ineq:[{t:`n &gt; ${k}`,n:`n ≤ ${k}`,s:`n &lt; ${k}`},{t:`n ≥ ${k}`,n:`n &lt; ${k}`,s:`n ≤ ${k}`},{t:`n &lt; ${k}`,n:`n ≥ ${k}`,s:`n &gt; ${k}`},{t:`n ≤ ${k}`,n:`n &gt; ${k}`,s:`n ≥ ${k}`}]}};
const gPfNeg1=()=>{const pool=pfNPool(),A=pick(pool.np),B=pick(pool.ineq),sw=Math.random()<.5,[P,Q]=sw?[B,A]:[A,B],c=pick(['et','ou']),c2=c==='et'?'ou':'et';
  const s1=P.s?`${P.s} ${c2} ${Q.n}`:`${P.n} ${c2} ${Q.s}`;
  return mcq('Quelle est la négation de cette phrase ?',stx(`« ${P.t} ${c} ${Q.t} »`),[
    {h:`${P.n} ${c2} ${Q.n}`,ok:true},{h:`${P.n} ${c} ${Q.n}`,tag:'pr-negation'},{h:s1,tag:'pr-negation'},{h:`${P.t} ${c2} ${Q.n}`,tag:'pr-negation'}],
    `Lois de De Morgan : non(P ${c} Q) = (non P) ${c2} (non Q). On change « ${c} » en « ${c2} » et on nie chaque morceau : « ${P.n} ${c2} ${Q.n} ». Attention, le contraire d’une inégalité stricte est une inégalité large.`,
    'Le « et » devient « ou » (et inversement), puis on nie chaque morceau.')};
const gPfCnt=()=>{const[a,b]=pick([[2,3],[2,5],[3,4],[3,5],[2,7],[4,5]]),N=R(20,60),c=Math.random()<.7?'ou':'et',fa=Math.floor(N/a),fb=Math.floor(N/b),fab=Math.floor(N/(a*b)),t=c==='ou'?fa+fb-fab:fab;
  const m=x=>x===2?'pair':`multiple de ${x}`;
  return nq({instr:'Compte les entiers.',prompt:stx(`Combien d’entiers n compris entre 1 et ${N} (inclus) vérifient « n est ${m(a)} ${c} n est ${m(b)} » ?`),labels:['Nombre ='],t:[t],
    explain:c==='ou'?`Multiples de ${a} : ${fa}. Multiples de ${b} : ${fb}. Ceux qui sont les deux à la fois (multiples de ${a*b}) : ${fab} ; ils ont été comptés deux fois, on les retire une fois : ${fa} + ${fb} − ${fab} = ${t}. Le « ou » est inclusif : les nombres qui vérifient les deux conditions comptent.`
      :`Il faut les deux conditions : n est multiple de ${a} et de ${b}, donc de ${a*b} (${a} et ${b} n’ont pas de diviseur commun autre que 1). Entre 1 et ${N}, il y en a ${t}.`,
    hint:c==='ou'?'Compte les multiples de chacun, puis retire ceux qui ont été comptés deux fois.':'« et » : il faut vérifier les deux conditions à la fois.',
    diag:([v])=>c==='ou'?(v===fa+fb-2*fab?'pr-ou':v===fa+fb?'calc':null):(v===fa+fb-fab?'pr-ou':null)})};
const PF_OP={'>':['≤','<','≥'],'≥':['<','≤','>'],'<':['≥','>','≤'],'≤':['>','≥','<']};
const pfOpH=o=>o==='>'?'&gt;':o==='<'?'&lt;':o;
const pfNegChain=(P,Q,conn,pre)=>{const c2=conn==='et'?'ou':'et',tx=(o,k)=>`x ${pfOpH(o)} ${pfM(k)}`,off=pre?1:0;
  const s1={q:`Dans la négation, que devient le mot « ${conn} » ?`,o:[
    pfOK(`« ${conn} » devient « ${c2} »`,{c:c2}),
    pfW(`« ${conn} » reste « ${conn} »`,`Lois de De Morgan : non(P ${conn} Q) = (non P) ${c2} (non Q).`,'pr-negation',{c:conn}),
    conn==='et'?pfW('« et » devient « ou bien » (l’un ou l’autre, pas les deux)','Le « ou » de la négation est inclusif : les deux morceaux peuvent être faux en même temps.','pr-ou',{c:'ou bien'})
      :pfW('« ou » devient « ou bien » (exclusif)','La négation de « P ou Q » est « non P et non Q » : il faut que les deux soient fausses.','pr-negation',{c:'ou bien'})]};
  const sN=X=>{const[n0,n1,n2]=PF_OP[X.op];return{q:`Négation de « ${tx(X.op,X.k)} » ?`,o:[
    pfOK(tx(n0,X.k),{v:n0}),
    pfW(tx(n1,X.k),`« ${tx(n1,X.k)} » n’est pas le contraire de « ${tx(X.op,X.k)} » : regarde le cas x = ${pfM(X.k)}.`,'pr-negation',{v:n1}),
    pfW(tx(n2,X.k),`Certains x vérifient à la fois « ${tx(n2,X.k)} » et « ${tx(X.op,X.k)} » : ce n’est pas le contraire.`,'pr-negation',{v:n2})]}};
  const s4={q:'La négation complète est donc…',o:prev=>{const c=prev[off].c,a=prev[off+1].v,b=prev[off+2].v,mk=(c1,a1,b1)=>`${tx(a1,P.k)} ${c1} ${tx(b1,Q.k)}`,good=mk(c,a,b),opts=[pfOK(good)];
    [mk(c2,PF_OP[P.op][0],PF_OP[Q.op][0]),mk(conn,PF_OP[P.op][0],PF_OP[Q.op][0]),mk(c2,PF_OP[P.op][1],PF_OP[Q.op][1]),mk(conn,P.op,Q.op)].forEach(h=>{
      if(h!==good&&opts.length<4&&!opts.some(o=>o.h===h))opts.push(pfW(h,'Assemble tes choix précédents : le nouveau mot de liaison, puis la négation de chaque morceau.','pr-negation'))});return opts}};
  return pre?[pre,s1,sN(P),sN(Q),s4]:[s1,sN(P),sN(Q),s4]};
const gPfNegR=()=>{const instr='Écris la négation, étape par étape.';
  if(Math.random()<.4){const a=R(-5,3),b=a+R(2,8);
    const pre={q:`Que signifie « ${pfM(a)} ≤ x ≤ ${pfM(b)} » ?`,o:[pfOK(`x ≥ ${pfM(a)} et x ≤ ${pfM(b)}`),
      pfW(`x ≥ ${pfM(a)} ou x ≤ ${pfM(b)}`,'Une double inégalité impose les deux conditions à la fois : c’est un « et ».','pr-ou'),
      pfW(`x ≤ ${pfM(a)} et x ≥ ${pfM(b)}`,'x est entre les deux nombres : au-dessus du plus petit, en dessous du plus grand.')]};
    return chain({instr,prompt:stx(`Écris la négation de « ${pfM(a)} ≤ x ≤ ${pfM(b)} » (x réel).`),steps:pfNegChain({op:'≥',k:a},{op:'≤',k:b},'et',pre),
      explain:`« ${pfM(a)} ≤ x ≤ ${pfM(b)} » signifie « x ≥ ${pfM(a)} et x ≤ ${pfM(b)} ». Sa négation est « x &lt; ${pfM(a)} ou x &gt; ${pfM(b)} » : x est en dehors de l’intervalle [${pfM(a)} ; ${pfM(b)}].`})}
  const ops=['>','≥','<','≤'],P={op:pick(ops),k:R(-5,10)},Q={op:pick(ops),k:R(-5,10)};if(Q.k===P.k)Q.k=P.k+R(1,4);const conn=pick(['et','ou']),c2=conn==='et'?'ou':'et';
  return chain({instr,prompt:stx(`Écris la négation de « x ${pfOpH(P.op)} ${pfM(P.k)} ${conn} x ${pfOpH(Q.op)} ${pfM(Q.k)} » (x réel).`),steps:pfNegChain(P,Q,conn),
    explain:`non(P ${conn} Q) = (non P) ${c2} (non Q). Négation : « x ${pfOpH(PF_OP[P.op][0])} ${pfM(P.k)} ${c2} x ${pfOpH(PF_OP[Q.op][0])} ${pfM(Q.k)} ».`})};
const pfTVopts=(lab,v,why)=>[pfOK(`« ${lab} » est ${v?'vraie':'fausse'}`,{v}),pfW(`« ${lab} » est ${v?'fausse':'vraie'}`,why,'calc',{v:!v}),pfW('On ne peut pas le savoir sans autre information','La valeur de n est donnée : on peut vérifier.',null,{v:null})];
const gPfOr=()=>{const P=pick(PF_PN.slice(0,3)),op=pick(['>','<']),target=pick(['VV','VV','VF','FV','FF']);let n,k,vp,vq;
  for(let t=0;t<300;t++){n=R(2,40);k=R(4,36);vp=P.f(n);vq=op==='>'?n>k:n<k;if((vp?'V':'F')+(vq?'V':'F')===target)break}
  const Q=pfIneqTxt(op,k);
  return chain({instr:'Décide si la phrase est vraie, étape par étape.',prompt:stx(`Pour n = ${n}, la phrase « ${P.t} ou ${Q} » est-elle vraie ?`),
    steps:[{q:`Premier morceau, pour n = ${n} :`,o:pfTVopts(P.t,vp,P.w(n)+'.')},
      {q:`Second morceau, pour n = ${n} :`,o:pfTVopts(Q,vq,`Compare ${n} et ${k}.`)},
      {q:'Règle : « P ou Q » est vraie quand…',o:[pfOK('au moins une des deux est vraie',{r:'incl'}),
        pfW('exactement une des deux est vraie','C’est le « ou » exclusif de la vie courante. En maths, le « ou » est inclusif : vrai aussi quand les deux sont vraies.','pr-ou',{r:'excl'}),
        pfW('les deux sont vraies','Ça, c’est la règle du « et ».','pr-ou',{r:'and'})]},
      {q:'Donc la phrase est…',o:prev=>{let a=prev[0].v,b=prev[1].v;const r=prev[2].r;if(a===null)a=vp;if(b===null)b=vq;
        const res=r==='excl'?a!==b:r==='and'?a&&b:a||b,why='Applique la règle choisie aux valeurs trouvées.';
        return[{h:'vraie',ok:res,why},{h:'fausse',ok:!res,why},pfW('impossible à déterminer','Les deux morceaux sont connus : la règle du « ou » permet de conclure.')]}}],
    explain:`« ${P.t} » est ${vp?'vraie':'fausse'} et « ${Q} » est ${vq?'vraie':'fausse'} pour n = ${n}. Le « ou » est inclusif : la phrase est ${vp||vq?'vraie':'fausse'}.`})};
const gPfTab=()=>{const n=R(2,30),T=pick([
    {P:'n est pair',Q:'n est multiple de 4',fp:n%2===0,fq:n%4===0},
    {P:'n est multiple de 3',Q:'n est multiple de 6',fp:n%3===0,fq:n%6===0},
    (()=>{const a=R(3,12),b=a+R(2,8);return{P:`n &gt; ${a}`,Q:`n &gt; ${b}`,fp:n>a,fq:n>b}})()]);
  return chain({instr:'Calcule la valeur de vérité, étape par étape.',prompt:stx(`P : « ${T.P} », Q : « ${T.Q} ». Pour n = ${n}, que vaut « (non P) ou Q » ?`),
    steps:[{q:`P pour n = ${n} :`,o:pfTVopts(T.P,T.fp,'Vérifie avec la valeur de n.')},
      {q:'Donc « non P » est…',o:prev=>{const v=prev[0].v===null?T.fp:prev[0].v;return[{h:'vraie',ok:!v,why:'« non P » a la valeur contraire de P.'},{h:'fausse',ok:v,why:'« non P » a la valeur contraire de P.'},pfW('de même valeur que P','« non P » est vraie exactement quand P est fausse.','pr-negation')]}},
      {q:`Q pour n = ${n} :`,o:pfTVopts(T.Q,T.fq,'Vérifie avec la valeur de n.')},
      {q:'Donc « (non P) ou Q » est…',o:prev=>{const np=prev[1].h==='vraie'?true:prev[1].h==='fausse'?false:!T.fp,q=prev[2].v===null?T.fq:prev[2].v,res=np||q,why='Un « ou » est vrai dès qu’un morceau est vrai.';
        return[{h:'vraie',ok:res,why},{h:'fausse',ok:!res,why,tag:'pr-ou'},pfW('impossible à déterminer','Les deux morceaux sont connus.')]}}],
    explain:`P est ${T.fp?'vraie':'fausse'}, donc non P est ${T.fp?'fausse':'vraie'} ; Q est ${T.fq?'vraie':'fausse'}. « (non P) ou Q » est ${!T.fp||T.fq?'vraie':'fausse'}. Remarque : « (non P) ou Q » a exactement la table de vérité de « si P, alors Q » (chapitre suivant) : elle n’est fausse que si P est vraie et Q fausse.`})};
const PF_LAWS=[
  ['non(P ou Q) a la même valeur que (non P) et (non Q).',true,'C’est une loi de De Morgan : « P ou Q » est fausse exactement quand les deux sont fausses.'],
  ['non(P et Q) a la même valeur que (non P) et (non Q).',false,'Il suffit qu’une des deux manque : non(P et Q) = (non P) ou (non Q).'],
  ['« P ou Q » est vraie quand P et Q sont toutes les deux vraies.',true,'Le « ou » mathématique est inclusif.'],
  ['« P ou non P » est vraie quelle que soit P.',true,'C’est le principe du tiers exclu : l’une des deux est forcément vraie.'],
  ['« P et non P » peut être vraie pour une proposition P bien choisie.',false,'C’est une contradiction : P et non P ne sont jamais vraies en même temps.'],
  ['La négation de « x &gt; 5 » est « x &lt; 5 ».',false,'Pour x = 5, les deux phrases sont fausses : la négation est « x ≤ 5 ».'],
  ['La négation de « n est pair et n &gt; 10 » est « n est impair ou n ≤ 10 ».',true,'De Morgan : « et » devient « ou », et on nie chaque morceau.'],
  ['non(non P) a la même valeur que P.',true,'Nier deux fois revient au point de départ.'],
  ['La négation de « 1 ≤ x ≤ 4 » est « x &lt; 1 et x &gt; 4 ».',false,'Aucun x n’est à la fois inférieur à 1 et supérieur à 4 : la négation est « x &lt; 1 ou x &gt; 4 ».'],
  ['« 6 est pair ou 6 est multiple de 3 » est fausse, car les deux parties sont vraies.',false,'Le « ou » est inclusif : la phrase est vraie.']];
const gPfLaws=()=>pfVF(PF_LAWS,'pr-negation','Pense aux lois de De Morgan et au « ou » inclusif.');

/* ===================== Chapitre 3 : l'implication ===================== */
const PF_IMP=[
  ['n est multiple de 6','n est multiple de 3','n n’est pas multiple de 6','n n’est pas multiple de 3'],
  ['le triangle T est équilatéral','T est isocèle','le triangle T n’est pas équilatéral','T n’est pas isocèle'],
  ['x = 3','x² = 9','x ≠ 3','x² ≠ 9'],
  ['n est multiple de 4','n est pair','n n’est pas multiple de 4','n est impair'],
  ['il pleut','le sol est mouillé','il ne pleut pas','le sol n’est pas mouillé'],
  ['le nombre N se termine par 0','N est divisible par 5','le nombre N ne se termine pas par 0','N n’est pas divisible par 5'],
  ['ABCD est un carré','ABCD est un losange','ABCD n’est pas un carré','ABCD n’est pas un losange'],
  ['x &gt; 5','x &gt; 2','x ≤ 5','x ≤ 2']];
const gPfHC=()=>{const[P,Q]=pick(PF_IMP),hyp=Math.random()<.5;
  return mcq(hyp?'Quelle est l’hypothèse ?':'Quelle est la conclusion ?',stx(`« ${pfSi(P)}, alors ${Q}. »`),
    [{h:`« ${P} »`,ok:hyp,tag:'implication'},{h:`« ${Q} »`,ok:!hyp,tag:'implication'},{h:`« ${P} » et « ${Q} »`,tag:'implication'}],
    `L’hypothèse est ce qui suit « si » : « ${P} ». La conclusion est ce qui suit « alors » : « ${Q} ».`,'Hypothèse : après « si ». Conclusion : après « alors ».')};
const gPfRec=()=>{const[P,Q,nP,nQ]=pick(PF_IMP);
  return mcq('Quelle est la réciproque de cette implication ?',stx(`« ${pfSi(P)}, alors ${Q}. »`),[
    {h:`${pfSi(Q)}, alors ${P}.`,ok:true},{h:`${pfSi(nP)}, alors ${nQ}.`,tag:'pr-reciproque'},{h:`${pfSi(nQ)}, alors ${nP}.`,tag:'pr-reciproque'}],
    `La réciproque échange hypothèse et conclusion, sans rien nier : « ${pfSi(Q)}, alors ${P} ». (« ${pfSi(nQ)}, alors ${nP} » est la contraposée, vue au chapitre 7.) Attention : une implication vraie peut avoir une réciproque fausse.`,
    'Réciproque : on échange les deux parties.')};
const gPfImpVF=()=>{const t=R(0,4);let s,v,ex;
  if(t===0){const a=R(1,9);let b=R(1,9);while(b===a)b=R(1,9);s=`Si x &gt; ${a}, alors x &gt; ${b}.`;v=a>b;
    ex=v?`Si x &gt; ${a}, comme ${a} &gt; ${b}, on a x &gt; ${b}.`:`Contre-exemple : x = ${b} vérifie x &gt; ${a}, mais pas x &gt; ${b}. (La réciproque, elle, est vraie.)`}
  else if(t===1){const L=[2,3,4,6,8,9,10,12],a=pick(L);let b=pick(L);while(b===a)b=pick(L);s=`Si n est multiple de ${a}, alors n est multiple de ${b}.`;v=a%b===0;
    ex=v?`Si n = ${a}k, alors n = ${b} × ${a/b}k : n est multiple de ${b}.`:`Contre-exemple : n = ${a} est multiple de ${a}, mais pas de ${b}.`}
  else if(t===2){const a=R(2,9);if(Math.random()<.5){s=`Si x² = ${a*a}, alors x = ${a}.`;v=false;ex=`Contre-exemple : x = −${a} : (−${a})² = ${a*a}, mais −${a} ≠ ${a}.`}
    else{s=`Si x = ${a}, alors x² = ${a*a}.`;v=true;ex=`Si x = ${a}, x² = ${a} × ${a} = ${a*a}. (La réciproque est fausse : x = −${a}.)`}}
  else if(t===3){const a=R(2,9);s=`Si x &lt; ${a}, alors x² &lt; ${a*a}.`;v=false;ex=`Contre-exemple : x = −${2*a} vérifie x &lt; ${a}, mais x² = ${4*a*a} &gt; ${a*a}.`}
  else{const a=R(2,9);s=`Si 0 &lt; x &lt; ${a}, alors x² &lt; ${a*a}.`;v=true;ex=`Pour 0 &lt; x &lt; ${a}, on multiplie par des nombres positifs : x² = x × x &lt; ${a}x &lt; ${a} × ${a} = ${a*a}.`}
  return mcq('Cette implication est-elle vraie ? (x réel, n entier)',stx(s),[{h:'Vraie',ok:v,tag:'implication'},{h:'Fausse',ok:!v,tag:'implication'}],(v?'<b>Vraie.</b> ':'<b>Fausse.</b> ')+ex,
    'Cherche un cas où l’hypothèse est vraie et la conclusion fausse. S’il n’y en a pas, l’implication est vraie.',true)};
const PF_CNS=['nécessaire et suffisante','suffisante, mais pas nécessaire','nécessaire, mais pas suffisante','ni nécessaire, ni suffisante'];
const gPfCns=()=>{let A,B,suf,nec,ex;
  if(Math.random()<.6){const L=[2,3,4,6,8,9,10,12,15],a=pick(L);let b=pick(L);while(b===a)b=pick(L);A=`n est multiple de ${a}`;B=`n est multiple de ${b}`;suf=a%b===0;nec=b%a===0;
    ex=`A ⇒ B ? ${suf?`Oui : n = ${a}k = ${b} × ${a/b}k.`:`Non : n = ${a} vérifie A mais pas B.`} B ⇒ A ? ${nec?`Oui : n = ${b}k = ${a} × ${b/a}k.`:`Non : n = ${b} vérifie B mais pas A.`}`}
  else{const a=R(1,9);let b=R(1,9);while(b===a)b=R(1,9);A=`x &gt; ${a}`;B=`x &gt; ${b}`;suf=a>b;nec=a<b;
    ex=`A ⇒ B ? ${suf?`Oui, car ${a} &gt; ${b}.`:`Non : x = ${b} vérifie A mais pas B.`} B ⇒ A ? ${nec?`Oui, car ${b} &gt; ${a}.`:`Non : x = ${a} vérifie B mais pas A.`}`}
  const key=suf&&nec?0:suf?1:nec?2:3;
  return mcq('Quel type de condition ?',stx(`Pour avoir B : « ${B} », la condition A : « ${A} » est…`),PF_CNS.map((h,i)=>({h,ok:i===key,tag:'pr-cns'})),
    ex+' Rappel : si A ⇒ B, A est suffisante pour B ; si B ⇒ A, A est nécessaire pour B.','Écris d’abord quelles flèches sont vraies : A ⇒ B ? B ⇒ A ?',true)};
const PF_REL=['A ⇒ B, mais pas B ⇒ A','B ⇒ A, mais pas A ⇒ B','A ⟺ B','Aucune des deux implications'];
const gPfSym=()=>{const a=R(2,9),t=R(0,6);let A,B,ab,ba,ex;
  if(t===0){A=`x = ${a}`;B=`x² = ${a*a}`;ab=1;ba=0;ex=`Si x = ${a}, alors x² = ${a*a}. Mais x = −${a} vérifie B sans vérifier A.`}
  else if(t===1){A=`x² = ${a*a}`;B=`x = ${a}`;ab=0;ba=1;ex=`x = −${a} vérifie A sans vérifier B. Mais si x = ${a}, alors x² = ${a*a}.`}
  else if(t===2){A=`x − ${a} = 0`;B=`x = ${a}`;ab=1;ba=1;ex=`On passe de l’une à l’autre en ajoutant ou en retranchant ${a} : c’est réversible.`}
  else if(t===3){A=`x &gt; ${a}`;B=`x ≥ ${a}`;ab=1;ba=0;ex=`Si x &gt; ${a}, alors x ≥ ${a}. Mais x = ${a} vérifie B sans vérifier A.`}
  else if(t===4){const b=a+R(1,5);A=`x &gt; ${a}`;B=`x &lt; ${b}`;ab=0;ba=0;ex=`x = ${b+1} vérifie A sans vérifier B, et x = ${a-1} vérifie B sans vérifier A.`}
  else if(t===5){A=`x(x − ${a}) = 0`;B=`x = ${a}`;ab=0;ba=1;ex=`x = 0 vérifie A sans vérifier B. Mais si x = ${a}, alors x(x − ${a}) = 0.`}
  else{const k=R(2,6);A=`${k}x = ${k*a}`;B=`x = ${a}`;ab=1;ba=1;ex=`On divise ou on multiplie par ${k}, qui est non nul : c’est réversible.`}
  const key=ab&&ba?2:ab?0:ba?1:3;
  return mcq('Quelle relation logique relie A et B ?',stx(`A : « ${A} »<br>B : « ${B} »<br>(x est un nombre réel.)`),PF_REL.map((h,i)=>({h,ok:i===key,tag:'pr-reciproque'})),ex,
    'Teste les deux sens séparément, en cherchant un contre-exemple à chacun.',true)};
const gPfTT=()=>{const p=Math.random()<.5,q=Math.random()<.5,f=pick(['P ⇒ Q','Q ⇒ P','P ⟺ Q']),v=f==='P ⇒ Q'?!p||q:f==='Q ⇒ P'?!q||p:p===q,V=b=>b?'vraie':'fausse';
  return mcq('Quelle est la valeur de vérité ?',stx(`On sait que P est ${V(p)} et que Q est ${V(q)}. Que vaut « ${f} » ?`),
    [{h:'Vraie',ok:v,tag:'implication'},{h:'Fausse',ok:!v,tag:'implication'},{h:'On ne peut pas savoir',tag:'implication'}],
    f==='P ⟺ Q'?`Une équivalence est vraie quand P et Q ont la même valeur. Ici : ${V(v)}.`:`Une implication n’est fausse que si son hypothèse est vraie et sa conclusion fausse. Ici, « ${f} » est ${V(v)}.`,
    'Une implication ne peut être fausse que dans un seul cas : hypothèse vraie, conclusion fausse.',true)};
const PF_FALSE=[
  ()=>{const a=R(2,9);return{s:`Si x² = ${a*a}, alors x = ${a}.`,ce:`x = −${a}`,ok1:`x = ${a}`,hf:'x = 0',chk:`(−${a})² = ${a*a} : l’hypothèse est vraie ; −${a} ≠ ${a} : la conclusion est fausse`}},
  ()=>{const b=pick([2,3,5]),a=b*pick([2,3]);return{s:`Si n est multiple de ${b}, alors n est multiple de ${a}.`,ce:`n = ${b}`,ok1:`n = ${a}`,hf:`n = ${b+1}`,chk:`${b} est multiple de ${b} : l’hypothèse est vraie ; ${b} n’est pas multiple de ${a} : la conclusion est fausse`}},
  ()=>{const a=R(1,6),b=a+R(2,5);return{s:`Si x &gt; ${a}, alors x &gt; ${b}.`,ce:`x = ${b}`,ok1:`x = ${b+1}`,hf:`x = ${a-1}`,chk:`${b} &gt; ${a} : l’hypothèse est vraie ; « ${b} &gt; ${b} » est faux : la conclusion est fausse`}},
  ()=>({s:'Si n est un nombre premier, alors n est impair.',ce:'n = 2',ok1:'n = 7',hf:'n = 9',chk:'2 est premier : l’hypothèse est vraie ; 2 est pair : la conclusion est fausse'})];
const gPfFalse=()=>{const T=pick(PF_FALSE)();
  return chain({instr:'Montre que l’implication est fausse.',prompt:stx(`Implication : « ${T.s} »`),
    steps:[
      {q:'Pour montrer qu’une implication est fausse, il faut trouver…',o:[
        pfOK('un cas où l’hypothèse est vraie et la conclusion fausse'),
        pfW('un cas où l’hypothèse est fausse','Quand l’hypothèse est fausse, l’implication n’a rien promis : ce cas ne la réfute pas.','implication'),
        pfW('un cas où la conclusion est vraie','Une conclusion vraie ne contredit jamais l’implication.','implication'),
        pfW('un cas où la réciproque est fausse','La réciproque est une autre affirmation : son sort ne dit rien de l’implication.','pr-reciproque')]},
      {q:'Quel candidat essayer ?',o:[pfOK(T.ce),
        pfW(T.ok1,`Pour ${T.ok1}, l’hypothèse et la conclusion sont toutes les deux vraies : la promesse est tenue.`,'implication'),
        pfW(T.hf,`Pour ${T.hf}, l’hypothèse est fausse : ce cas ne peut pas réfuter l’implication.`,'implication')]},
      {q:`Pour ${T.ce}, que constate-t-on ?`,o:[pfOK(T.chk),
        pfW('L’hypothèse et la conclusion sont toutes les deux fausses','Recalcule : pour ce candidat, l’hypothèse est vraie.','calc'),
        pfW('L’hypothèse et la conclusion sont toutes les deux vraies','Recalcule : pour ce candidat, la conclusion est fausse.','calc')]},
      {q:'Conclusion :',o:[pfOK('L’implication est fausse : un contre-exemple suffit.'),
        pfW('L’implication reste vraie, car elle marche pour d’autres valeurs.','Une implication doit marcher dans tous les cas : un seul échec la rend fausse.','pr-exemple'),
        pfW('C’est la réciproque qui est fausse, pas l’implication.','Le contre-exemple vérifie l’hypothèse et contredit la conclusion de l’implication elle-même.','pr-reciproque')]}],
    explain:`Une implication n’est fausse que si l’hypothèse est vraie et la conclusion fausse. Avec ${T.ce} : ${T.chk}. C’est un contre-exemple : l’implication est fausse.`})};
const gPfRecR=()=>{const b=pick([2,3,5]),m=pick([2,3,4]),a=b*m;
  return chain({instr:'Étudie l’implication et sa réciproque.',prompt:stx(`Implication : « Si n est multiple de ${a}, alors n est multiple de ${b}. » (n entier)`),
    steps:[
      {q:'L’implication est-elle vraie, et pourquoi ?',o:[
        pfOK(`Oui : si n = ${a}k, alors n = ${b} × ${m}k, multiple de ${b}`),
        pfW(`Oui : par exemple ${2*a} est multiple de ${a} et de ${b}`,'Un exemple ne prouve pas un « pour tout n ».','pr-exemple'),
        pfW(`Non : ${b} est multiple de ${b} sans être multiple de ${a}`,`Ce nombre ne vérifie pas l’hypothèse (il n’est pas multiple de ${a}) : il ne réfute rien.`,'implication')]},
      {q:'Quelle est sa réciproque ?',o:[
        pfOK(`Si n est multiple de ${b}, alors n est multiple de ${a}`),
        pfW(`Si n n’est pas multiple de ${a}, alors n n’est pas multiple de ${b}`,'Ici on a nié sans échanger : ce n’est pas la réciproque.','pr-reciproque'),
        pfW(`Si n n’est pas multiple de ${b}, alors n n’est pas multiple de ${a}`,'C’est la contraposée : on a échangé ET nié.','pr-contrapose')]},
      {q:'La réciproque est-elle vraie ?',o:[
        pfOK(`Non : n = ${b} est multiple de ${b} mais pas de ${a}`),
        pfW('Oui, puisque l’implication de départ est vraie','Une implication vraie peut avoir une réciproque fausse.','pr-reciproque'),
        pfW(`Non : n = ${a} est multiple de ${b} mais pas de ${a}`,`${a} est multiple de ${a} : ce n’est pas un contre-exemple.`,'calc')]},
      {q:'Conclusion en termes de conditions :',o:[
        pfOK(`Être multiple de ${a} est suffisant, mais pas nécessaire, pour être multiple de ${b}`),
        pfW(`Être multiple de ${a} est nécessaire, mais pas suffisant, pour être multiple de ${b}`,'Si A ⇒ B, A est suffisante pour B (pas nécessaire).','pr-cns'),
        pfW(`Être multiple de ${a} est nécessaire et suffisant pour être multiple de ${b}`,'Il faudrait que la réciproque soit vraie aussi.','pr-cns')]}],
    explain:`Si n = ${a}k = ${b}(${m}k), n est multiple de ${b} : l’implication est vraie. Sa réciproque est fausse : ${b} est multiple de ${b}, pas de ${a}. Donc « multiple de ${a} » est une condition suffisante, non nécessaire, pour « multiple de ${b} ».`})};
const gPfEqv=()=>{const a=R(2,9);
  return chain({instr:'Démontre l’équivalence, étape par étape.',prompt:stx(`Montrer que, pour tout réel x : x² = ${a}x ⟺ (x = 0 ou x = ${a}).`),
    steps:[
      {q:'Pour démontrer une équivalence, il faut…',o:[
        pfOK('démontrer le sens ⇒ et le sens ⇐'),
        pfW('démontrer un seul sens : l’autre s’en déduit','Une implication vraie peut avoir une réciproque fausse : il faut les deux sens.','pr-reciproque'),
        pfW(`vérifier que x = 0 et x = ${a} sont solutions`,`Cela ne prouve que le sens ⇐ : il reste à montrer qu’il n’y a pas d’autre solution.`,'pr-reciproque')]},
      {q:`Sens ⇒ : si x² = ${a}x, alors…`,o:[
        pfOK(`x² − ${a}x = 0, soit x(x − ${a}) = 0, donc x = 0 ou x = ${a}`),
        pfW(`on divise par x : x = ${a}`,'Diviser par x suppose x ≠ 0 : on perd la solution x = 0.','pr-equiv'),
        pfW(`x = √(${a}x), donc x = ${a}`,'On tourne en rond, et on oublie x = 0 : factorise plutôt.','pr-equiv')]},
      {q:'Sens ⇐ :',o:[
        pfOK(`si x = 0 : 0 = 0 ; si x = ${a} : ${a*a} = ${a*a} ; les deux vérifient l’équation`),
        pfW('inutile : le sens ⇒ suffit','Le sens ⇒ dit seulement que les solutions sont parmi 0 et a ; il faut vérifier qu’elles conviennent.','pr-reciproque'),
        pfW(`il suffit de vérifier x = ${a}`,'x = 0 doit aussi être vérifié.','pr-cas')]},
      {q:'Conclusion :',o:[
        pfOK(`Les deux sens sont prouvés : x² = ${a}x ⟺ (x = 0 ou x = ${a})`),
        pfW(`Seul le sens ⇒ est vrai`,'Le sens ⇐ vient d’être vérifié.'),
        pfW(`x² = ${a}x ⟺ x = ${a}`,'x = 0 est aussi solution.','pr-cas')]}],
    explain:`(⇒) x² = ${a}x donne x(x − ${a}) = 0 ; un produit est nul si et seulement si l’un des facteurs l’est : x = 0 ou x = ${a}. (⇐) 0 et ${a} vérifient l’équation. Les deux sens donnent l’équivalence.`})};

/* ===================== Chapitre 4 : quantificateurs ===================== */
const PF_QR=[
  ['∀x ∈ ℝ, x² ≥ 0','Pour tout réel x, x² est positif ou nul.',['Il existe un réel x tel que x² est positif ou nul.','Pour tout réel x, x² est strictement positif.']],
  ['∃x ∈ ℝ, x² = 2','Il existe un réel dont le carré vaut 2.',['Tout réel a un carré égal à 2.','Aucun réel n’a un carré égal à 2.']],
  ['∀n ∈ ℕ, ∃m ∈ ℕ, m &gt; n','Pour tout entier naturel n, il existe un entier naturel plus grand que n.',['Il existe un entier naturel plus grand que tous les entiers naturels.','Tout entier naturel est plus grand qu’un autre entier naturel.']],
  ['∃M ∈ ℝ, ∀x ∈ ℝ, f(x) ≤ M','Il existe un réel M supérieur ou égal à toutes les valeurs de f.',['Pour tout réel x, il existe un réel M tel que f(x) ≤ M.','Toutes les valeurs de f sont égales à M.']],
  ['∀x ∈ ℝ, f(x) = 0','La fonction f est nulle en tout point.',['La fonction f s’annule au moins une fois.','La fonction f ne s’annule jamais.']],
  ['∃x ∈ ℝ, f(x) = 0','La fonction f s’annule au moins une fois.',['La fonction f est nulle en tout point.','La fonction f ne s’annule jamais.']],
  ['∀x ∈ ℝ, f(x) ≠ 0','La fonction f ne s’annule jamais.',['La fonction f n’est pas la fonction nulle.','La fonction f s’annule au moins une fois.']]];
const gPfQRead=()=>{const[s,ok,w]=pick(PF_QR);
  return mcq('Comment se lit cette phrase ?',stx(s),[{h:ok,ok:true},...w.map(h=>({h,tag:'pr-quantif'}))],`« ${s} » se lit : ${ok} ∀ signifie « pour tout », ∃ « il existe (au moins un) », et l’ordre des quantificateurs compte.`,
    '∀ : pour tout. ∃ : il existe. Lis de gauche à droite.')};
const gPfQVF=()=>{const t=R(0,7);let s,v,ex;
  if(t===0){const a=R(-9,9);s=`∃x ∈ ℝ, x² = ${pfM(a)}`;v=a>=0;ex=v?`x = √${a} convient.`:'Un carré de réel est toujours positif ou nul.'}
  else if(t===1){s='∀x ∈ ℝ, x² &gt; 0';v=false;ex='x = 0 est un contre-exemple : 0² = 0.'}
  else if(t===2){s='∀x ∈ ℝ, x² ≥ 0';v=true;ex='Un carré de réel est toujours positif ou nul.'}
  else if(t===3){const a=pick([-3,-2,-1,1,2,3,5]);s=`∀x ∈ ℝ, x ${a<0?'−':'+'} ${Math.abs(a)} &gt; x`;v=a>0;ex=v?`On ajoute ${a} &gt; 0 : le résultat est plus grand, pour tout x.`:`Pour tout x, x − ${-a} &lt; x : par exemple x = 0 donne −${-a} &lt; 0.`}
  else if(t===4){const k=R(2,9),m=R(1,12);s=`∃n ∈ ℕ, n + ${k} = ${m}`;v=m>=k;ex=v?`n = ${m-k} convient.`:`Il faudrait n = ${m-k}, qui n’est pas un entier naturel.`}
  else if(t===5){const k=R(0,2);s=`∀n ∈ ℕ, n ≥ ${k}`;v=k===0;ex=v?'Tout entier naturel est positif ou nul.':`n = 0 est un contre-exemple.`}
  else if(t===6){s='∃x ∈ ℝ, x² &lt; 0';v=false;ex='Aucun réel n’a un carré strictement négatif.'}
  else{const m=R(2,50),r=Math.round(Math.sqrt(m));s=`∃n ∈ ℕ, n² = ${m}`;v=r*r===m;ex=v?`n = ${r} convient.`:`${m} est entre ${Math.floor(Math.sqrt(m))**2} et ${(Math.floor(Math.sqrt(m))+1)**2}, deux carrés consécutifs : ce n’est pas un carré.`}
  return mcq('Cette phrase est-elle vraie ?',stx(s),[{h:'Vraie',ok:v,tag:'pr-quantif'},{h:'Fausse',ok:!v,tag:'pr-quantif'}],(v?'<b>Vraie.</b> ':'<b>Fausse.</b> ')+ex,
    'Un « il existe » se prouve avec un exemple ; un « pour tout » se réfute avec un contre-exemple.',true)};
const pfQSw=q=>q==='∀'?'∃':'∀';
const gPfQNeg=()=>{const a=R(1,9),T=pick([
    {Q:'∀',v:'x',S:'ℝ',P:`x² ≥ ${a}`,N:`x² &lt; ${a}`,M:`x² ≤ ${a}`},
    {Q:'∃',v:'n',S:'ℕ',P:`n² = ${a+1}`,N:`n² ≠ ${a+1}`},
    {Q:'∀',v:'x',S:'ℝ',P:`f(x) &gt; ${a}`,N:`f(x) ≤ ${a}`,M:`f(x) &lt; ${a}`},
    {Q:'∃',v:'x',S:'ℝ',P:`f(x) = ${a}`,N:`f(x) ≠ ${a}`},
    {Q:'∀',v:'x',S:`[0 ; ${a}]`,P:`f(x) ≤ ${a+2}`,N:`f(x) &gt; ${a+2}`,M:`f(x) ≥ ${a+2}`},
    {Q:'∀',v:'n',S:'ℕ',P:`n² + n + ${a} est pair`,N:`n² + n + ${a} est impair`},
    {Q:'∃',v:'x',S:'ℝ',P:`x² &lt; ${a}x`,N:`x² ≥ ${a}x`,M:`x² &gt; ${a}x`}]),Q2=pfQSw(T.Q),f=(q,s,p)=>`${q}${T.v} ${s}, ${p}`;
  return mcq('Quelle est la négation ?',stx(f(T.Q,'∈ '+T.S,T.P)),[
    {h:f(Q2,'∈ '+T.S,T.N),ok:true},{h:f(T.Q,'∈ '+T.S,T.N),tag:'pr-negation'},{h:f(Q2,'∈ '+T.S,T.P),tag:'pr-negation'},
    {h:T.M?f(Q2,'∈ '+T.S,T.M):f(Q2,'∉ '+T.S,T.N),tag:'pr-negation'}],
    `On change le quantificateur (${T.Q} devient ${Q2}), on garde l’ensemble, et on nie la propriété : « ${f(Q2,'∈ '+T.S,T.N)} ».`,'Change ∀ en ∃ (ou l’inverse), puis nie la propriété ; l’ensemble ne change pas.')};
const PF_ORD=[
  {r:'y &gt; x',S:'ℝ',ae:true,ea:false,w:['Pour tout x, y = x + 1 convient.','Aucun réel n’est plus grand que tous les réels : pour x = y, on n’a pas y &gt; x.']},
  {r:'x + y = 0',S:'ℝ',ae:true,ea:false,w:['Pour tout x, y = −x convient.','Un même y ne peut pas convenir pour tous les x : x = −y et x = 1 − y ne donnent pas tous deux 0.']},
  {r:'y ≤ x²',S:'ℝ',ae:true,ea:true,w:['Pour tout x, y = x² convient.','y = 0 convient pour tous les x, car x² ≥ 0.']},
  {r:'xy = 1',S:'ℝ',ae:false,ea:false,w:['Pour x = 0, aucun y ne vérifie 0 × y = 1.','Pour x = 0, c’est impossible, quel que soit y.']},
  {r:'y = x²',S:'ℝ',ae:true,ea:false,w:['Pour tout x, y = x² convient.','Un même y ne peut pas être égal à x² pour tous les x (0² ≠ 1²).']},
  {r:'xy = 0',S:'ℝ',ae:true,ea:true,w:['Pour tout x, y = 0 convient.','y = 0 convient pour tous les x.']},
  {r:'y ≤ x',S:'ℕ',ae:true,ea:true,w:['Pour tout x, y = 0 convient.','y = 0 est inférieur ou égal à tous les entiers naturels.']},
  {r:'y &lt; x',S:'ℕ',ae:false,ea:false,w:['Pour x = 0, aucun entier naturel y ne vérifie y &lt; 0.','Pour x = 0, c’est impossible.']}];
const gPfOrd=()=>{const T=pick(PF_ORD),ae=Math.random()<.5,s=ae?`∀x ∈ ${T.S}, ∃y ∈ ${T.S}, ${T.r}`:`∃y ∈ ${T.S}, ∀x ∈ ${T.S}, ${T.r}`,v=ae?T.ae:T.ea;
  return mcq('Cette phrase est-elle vraie ?',stx(s),[{h:'Vraie',ok:v,tag:'pr-quantif'},{h:'Fausse',ok:!v,tag:'pr-quantif'}],
    `« ∀x ∃y » (y peut dépendre de x) : ${T.ae?'vraie':'fausse'}. ${T.w[0]} « ∃y ∀x » (un même y pour tous les x) : ${T.ea?'vraie':'fausse'}. ${T.w[1]} Ici, la phrase est ${v?'vraie':'fausse'}.`,
    'Dans « ∀x ∃y », y peut changer avec x ; dans « ∃y ∀x », c’est le même y pour tous.',true)};
const PF_QCE=[()=>{const k=R(3,8),c=R(0,12);return{t:`n² &lt; ${k}n + ${c}`,f:n=>n*n<k*n+c,v:n=>`${n*n} et ${k*n+c}`}},
  ()=>{const k=pick([2,3]);return{t:`n! &lt; ${k}<sup>n</sup>`,f:n=>fact(n)<k**n,v:n=>`${fact(n)} et ${k**n}`}},
  ()=>({t:'2<sup>n</sup> ≥ n²',f:n=>2**n>=n*n,v:n=>`${2**n} et ${n*n}`}),
  ()=>({t:'3<sup>n</sup> &gt; n³',f:n=>3**n>n**3,v:n=>`${3**n} et ${n**3}`})];
const gPfQCe=()=>{const F=pick(PF_QCE)();let n=1;while(F.f(n))n++;
  return nq({instr:'Trouve le plus petit contre-exemple.',prompt:stx(`Affirmation : « pour tout entier n ≥ 1, ${F.t} ». Quel est le plus petit entier n ≥ 1 pour lequel elle est fausse ?`),labels:['n ='],t:[n],
    explain:`On teste n = 1, 2, 3… L’inégalité est vraie jusqu’à n = ${n-1}. Pour n = ${n}, les deux membres valent ${F.v(n)} : l’inégalité ${F.t} est fausse. La négation de « ∀n, P(n) » est « ∃n, non P(n) » : ce n suffit.`,
    hint:'Calcule les deux membres pour n = 1, 2, 3… jusqu’à ce que l’inégalité soit fausse.',diag:([x])=>Number.isInteger(x)&&x>=1&&x<n?'pr-exemple':null})};
const PF_QNR=()=>{const a=R(8,15),b=R(1,9),c=R(2,7),m=pick([2,3,5,7,8,10,12,15,17,20]);return pick([
  {s:`Tous les élèves de la classe ont eu plus de ${a} au contrôle.`,q1:['Il existe au moins un élève qui…','Aucun élève n’…','Tous les élèves…'],p:[`a eu ${a} ou moins`,`a eu moins de ${a}`,`a eu plus de ${a}`],
    neg:`Il existe au moins un élève qui a eu ${a} ou moins.`,negW:[`Aucun élève n’a eu plus de ${a}.`,`Il existe au moins un élève qui a eu moins de ${a}.`,`Tous les élèves ont eu ${a} ou moins.`],
    fin:[`trouver un élève qui a eu ${a} ou moins`,`montrer que tous les élèves ont eu ${a} ou moins`,`trouver un élève qui a eu plus de ${a}`]},
  {s:`∀x ∈ ℝ, x² + ${b} &gt; ${c}x`,q1:['∃x ∈ ℝ','∀x ∈ ℝ','∃x ∉ ℝ'],p:[`x² + ${b} ≤ ${c}x`,`x² + ${b} &lt; ${c}x`,`x² + ${b} &gt; ${c}x`],
    neg:`∃x ∈ ℝ, x² + ${b} ≤ ${c}x`,negW:[`∀x ∈ ℝ, x² + ${b} ≤ ${c}x`,`∃x ∈ ℝ, x² + ${b} &lt; ${c}x`,`∃x ∉ ℝ, x² + ${b} ≤ ${c}x`],
    fin:[`trouver un réel x tel que x² + ${b} ≤ ${c}x`,`montrer que x² + ${b} ≤ ${c}x pour tout réel x`,`trouver un réel x tel que x² + ${b} &gt; ${c}x`]},
  {s:`∃n ∈ ℕ, n² = ${m}`,q1:['∀n ∈ ℕ','∃n ∈ ℕ','∀n ∉ ℕ'],p:[`n² ≠ ${m}`,`n² &lt; ${m}`,`n² = ${m}`],
    neg:`∀n ∈ ℕ, n² ≠ ${m}`,negW:[`∃n ∈ ℕ, n² ≠ ${m}`,`∀n ∈ ℕ, n² &lt; ${m}`,`∀n ∉ ℕ, n² ≠ ${m}`],
    fin:[`montrer que n² ≠ ${m} pour tout entier naturel n`,`trouver un entier naturel n tel que n² ≠ ${m}`,`vérifier que n² ≠ ${m} pour n = 0, 1, 2 et 3`]}])};
const gPfQNegR=()=>{const T=PF_QNR();
  return chain({instr:'Nie la phrase, étape par étape.',prompt:stx(`Phrase : « ${T.s} »`),
    steps:[
      {q:'Le quantificateur devient…',o:[pfOK(T.q1[0]),pfW(T.q1[1],'Le contraire de « pour tout » est « il existe au moins un… ne… pas », et inversement ; « aucun » dit beaucoup plus.','pr-negation'),
        pfW(T.q1[2],'Dans une négation, chaque quantificateur change ; et l’ensemble, lui, ne change pas.','pr-negation')]},
      {q:'La propriété devient…',o:[pfOK(T.p[0]),pfW(T.p[1],'Le cas d’égalité contredit aussi la phrase de départ : il appartient à la négation.','pr-negation'),pfW(T.p[2],'La propriété doit être niée, elle aussi.','pr-negation')]},
      {q:'La négation complète est…',o:[pfOK(T.neg),...T.negW.map(h=>pfW(h,'Il faut à la fois changer le quantificateur (sans toucher à l’ensemble) et nier exactement la propriété.','pr-negation'))]},
      {q:'Pour prouver que la phrase de départ est fausse, il suffit de…',o:[pfOK(T.fin[0]),
        pfW(T.fin[1],'C’est plus que nécessaire : on prouve la négation, pas une phrase plus forte.','pr-quantif'),pfW(T.fin[2],'Ce cas vérifie la phrase de départ : il ne la réfute pas.','pr-exemple')]}],
    explain:`On change le quantificateur, on garde l’ensemble, on nie la propriété : « ${T.neg} ». Prouver que la phrase est fausse, c’est prouver cette négation.`})};
const PF_Q2=[
  ['∀','x','∃','y','ℝ','y &gt; x','y ≤ x','y &lt; x',true,'Pour tout x, y = x + 1 convient.'],
  ['∀','n','∃','m','ℕ','m &gt; n','m ≤ n','m &lt; n',true,'Pour tout n, m = n + 1 convient.'],
  ['∃','M','∀','x','ℝ','x ≤ M','x &gt; M','x ≥ M',false,'Aucun M ne dépasse tous les réels : x = M + 1 &gt; M.'],
  ['∃','y','∀','x','ℝ','y &gt; x','y ≤ x','y &lt; x',false,'Pour x = y, on n’a pas y &gt; x.'],
  ['∀','x','∃','y','ℝ','y² ≤ x','y² &gt; x','y² ≥ x',false,'Pour x = −1, aucun y ne vérifie y² ≤ −1.'],
  ['∃','m','∀','n','ℕ','m ≤ n','m &gt; n','m ≥ n',true,'m = 0 est inférieur ou égal à tout entier naturel.']];
const gPfQ2Neg=()=>{const[q1,v1,q2,v2,S,P,N,M,tv,j]=pick(PF_Q2),Q=(q,v,s='∈')=>`${q}${v} ${s} ${S}`;
  return chain({instr:'Nie la phrase à deux quantificateurs.',prompt:stx(`Phrase : « ${Q(q1,v1)}, ${Q(q2,v2)}, ${P} »`),
    steps:[
      {q:`Le premier quantificateur « ${Q(q1,v1)} » devient…`,o:[pfOK(Q(pfQSw(q1),v1)),pfW(Q(q1,v1),'Chaque quantificateur change : ∀ devient ∃ et ∃ devient ∀.','pr-negation'),pfW(Q(pfQSw(q1),v1,'∉'),'On ne nie pas l’ensemble : la variable reste dans le même ensemble.','pr-negation')]},
      {q:`Le second quantificateur « ${Q(q2,v2)} » devient…`,o:[pfOK(Q(pfQSw(q2),v2)),pfW(Q(q2,v2),'Les deux quantificateurs changent, pas seulement le premier.','pr-negation'),pfW(Q(pfQSw(q2),v2,'∉'),'On ne nie pas l’ensemble.','pr-negation')]},
      {q:`La propriété « ${P} » devient…`,o:[pfOK(N),pfW(M,'Regarde le cas d’égalité : il contredit la propriété de départ, il doit être dans la négation.','pr-negation'),pfW(P,'La propriété doit être niée aussi.','pr-negation')]},
      {q:'La négation complète est…',o:prev=>{const good=`${prev[0].h}, ${prev[1].h}, ${prev[2].h}`,opts=[pfOK(good)];
        [`${Q(pfQSw(q1),v1)}, ${Q(pfQSw(q2),v2)}, ${N}`,`${Q(pfQSw(q2),v2)}, ${Q(pfQSw(q1),v1)}, ${N}`,`${Q(q1,v1)}, ${Q(pfQSw(q2),v2)}, ${N}`,`${Q(q1,v1)}, ${Q(q2,v2)}, ${N}`].forEach(h=>{
          if(h!==good&&opts.length<4&&!opts.some(o=>o.h===h))opts.push(pfW(h,'Assemble tes choix précédents, dans le même ordre : l’ordre des quantificateurs ne change pas.','pr-quantif'))});return opts}},
      {q:'Laquelle est vraie ?',keep:true,o:[{h:'La phrase de départ',ok:tv,why:j},{h:'Sa négation',ok:!tv,why:j},pfW('Les deux','Une phrase et sa négation ne sont jamais vraies en même temps.','pr-negation')]}],
    explain:`Négation : « ${Q(pfQSw(q1),v1)}, ${Q(pfQSw(q2),v2)}, ${N} » (chaque quantificateur change, l’ordre est gardé, la propriété est niée). ${j} Donc ${tv?'la phrase de départ':'sa négation'} est vraie.`})};
const PF_QREF=[
  ()=>{const[ce,cv]=pick([['1/2','1/4'],['1/3','1/9'],['0,2','0,04']]);return{s:'∀x ∈ ℝ, x² ≥ x',ce:`x = ${ce}`,non:[['x = 2','4 ≥ 2'],['x = −1','1 ≥ −1']],chk:`(${ce})² = ${cv}, et ${cv} &lt; ${ce}`,neg:'∃x ∈ ℝ, x² &lt; x'}},
  ()=>{const a=R(2,9);return{s:'∀x ∈ ℝ, √(x²) = x',ce:`x = −${a}`,non:[[`x = ${a}`,`√${a*a} = ${a}`],['x = 0','√0 = 0']],chk:`√((−${a})²) = √${a*a} = ${a}, et ${a} ≠ −${a}`,neg:'∃x ∈ ℝ, √(x²) ≠ x'}},
  ()=>({s:'∀n ∈ ℕ*, n² + n + 1 est premier',ce:'n = 4',non:[['n = 2','7 est premier'],['n = 3','13 est premier']],chk:'4² + 4 + 1 = 21 = 3 × 7, qui n’est pas premier',neg:'∃n ∈ ℕ*, n² + n + 1 n’est pas premier'}),
  ()=>({s:'∀x ∈ ℝ*, 1/x ≤ 1',ce:'x = 1/2',non:[['x = 2','1/2 ≤ 1'],['x = −1','−1 ≤ 1']],chk:'1/(1/2) = 2, et 2 &gt; 1',neg:'∃x ∈ ℝ*, 1/x &gt; 1'}),
  ()=>({s:'∀n ∈ ℕ, 2<sup>n</sup> ≥ n²',ce:'n = 3',non:[['n = 2','4 ≥ 4'],['n = 5','32 ≥ 25']],chk:'2³ = 8 et 3² = 9, or 8 &lt; 9',neg:'∃n ∈ ℕ, 2<sup>n</sup> &lt; n²'})];
const gPfQRef=()=>{const T=pick(PF_QREF)();
  return chain({instr:'Montre que la phrase est fausse.',prompt:stx(`Phrase : « ${T.s} »`),
    steps:[
      {q:'Pour montrer que cette phrase est fausse, il faut…',o:[pfOK('trouver une valeur qui ne la vérifie pas'),
        pfW('montrer qu’aucune valeur ne la vérifie','La négation de « pour tout » est « il existe au moins un… ne… pas » : une valeur suffit.','pr-negation'),
        pfW('trouver une valeur qui la vérifie','Une valeur qui vérifie la phrase la confirme, elle ne la réfute pas.','pr-exemple')]},
      {q:'Quel candidat essayer ?',o:[pfOK(T.ce),...T.non.map(([h,w])=>pfW(h,`Pour ${h} : ${w}, la phrase est vérifiée. Ce n’est pas un contre-exemple.`,'pr-exemple'))]},
      {q:`Vérification pour ${T.ce} :`,o:[pfOK(T.chk),pfW('La phrase est vérifiée pour cette valeur','Refais le calcul : elle ne l’est pas.','calc'),pfW('On ne peut pas conclure avec une seule valeur','Une seule valeur suffit pour réfuter un « pour tout ».','pr-exemple')]},
      {q:'Conclusion :',o:[pfOK(`La négation « ${T.neg} » est vraie : la phrase est fausse`),
        pfW('La phrase est fausse seulement pour cette valeur : elle reste vraie en général','Un « pour tout » qui échoue une fois est faux.','pr-exemple'),
        pfW('Il faudrait qu’elle échoue pour toutes les valeurs pour conclure','C’est confondre la négation de « pour tout » avec « pour aucun ».','pr-negation')]}],
    explain:`Pour réfuter « ${T.s} », il suffit d’un contre-exemple : ${T.ce}, car ${T.chk}. Donc « ${T.neg} » est vraie, et la phrase est fausse.`})};
const PF_QDEF=[
  ['f est majorée sur ℝ','∃M ∈ ℝ, ∀x ∈ ℝ, f(x) ≤ M',['∀x ∈ ℝ, ∃M ∈ ℝ, f(x) ≤ M','∀M ∈ ℝ, ∃x ∈ ℝ, f(x) ≤ M','∃x ∈ ℝ, ∀M ∈ ℝ, f(x) ≤ M'],'Un même M doit dépasser toutes les valeurs : il est choisi avant les x. « ∀x ∃M » est toujours vrai (M = f(x)).'],
  ['f est minorée sur ℝ','∃m ∈ ℝ, ∀x ∈ ℝ, f(x) ≥ m',['∀x ∈ ℝ, ∃m ∈ ℝ, f(x) ≥ m','∃m ∈ ℝ, ∃x ∈ ℝ, f(x) ≥ m','∀m ∈ ℝ, ∀x ∈ ℝ, f(x) ≥ m'],'Un même m doit être sous toutes les valeurs : ∃m d’abord, puis ∀x.'],
  ['f s’annule sur ℝ','∃x ∈ ℝ, f(x) = 0',['∀x ∈ ℝ, f(x) = 0','∀x ∈ ℝ, f(x) ≠ 0','∃x ∈ ℝ, f(x) ≠ 0'],'S’annuler, c’est valoir 0 en au moins un point.'],
  ['f est la fonction nulle','∀x ∈ ℝ, f(x) = 0',['∃x ∈ ℝ, f(x) = 0','∀x ∈ ℝ, f(x) ≠ 0','∃x ∈ ℝ, f(x) ≠ 0'],'La fonction nulle vaut 0 en tout point.'],
  ['f n’est pas la fonction nulle','∃x ∈ ℝ, f(x) ≠ 0',['∀x ∈ ℝ, f(x) ≠ 0','∃x ∈ ℝ, f(x) = 0','∀x ∈ ℝ, f(x) = 0'],'C’est la négation de « ∀x, f(x) = 0 » : il suffit d’un point où f ne vaut pas 0.'],
  ['f est croissante sur ℝ','∀a ∈ ℝ, ∀b ∈ ℝ, a ≤ b ⇒ f(a) ≤ f(b)',['∃a ∈ ℝ, ∃b ∈ ℝ, a ≤ b et f(a) ≤ f(b)','∀a ∈ ℝ, ∀b ∈ ℝ, f(a) ≤ f(b)','∀a ∈ ℝ, ∀b ∈ ℝ, f(a) ≤ f(b) ⇒ a ≤ b'],'Pour tous a ≤ b, l’ordre est conservé ; la dernière proposition est la réciproque, ce n’est pas la même chose.'],
  ['f est constante sur ℝ','∃c ∈ ℝ, ∀x ∈ ℝ, f(x) = c',['∀x ∈ ℝ, ∃c ∈ ℝ, f(x) = c','∃x ∈ ℝ, ∀c ∈ ℝ, f(x) = c','∀c ∈ ℝ, ∀x ∈ ℝ, f(x) = c'],'Une même valeur c pour tous les x : ∃c d’abord. « ∀x ∃c » est vrai pour toute fonction.'],
  ['f n’est pas majorée sur ℝ','∀M ∈ ℝ, ∃x ∈ ℝ, f(x) &gt; M',['∃M ∈ ℝ, ∀x ∈ ℝ, f(x) &gt; M','∀M ∈ ℝ, ∀x ∈ ℝ, f(x) &gt; M','∃M ∈ ℝ, ∃x ∈ ℝ, f(x) &gt; M'],'Négation de « ∃M ∀x f(x) ≤ M » : chaque quantificateur change et ≤ devient &gt;.']];
const gPfQDef=()=>{const[s,ok,w,why]=pick(PF_QDEF);
  return mcq('Quelle phrase traduit cette propriété ?',stx(`« ${s} »`),[{h:ok,ok:true},...w.map(h=>({h,tag:'pr-quantif'}))],why,'Repère ce qui doit être choisi d’abord (∃…) et ce qui doit marcher pour tous (∀…).')};

/* ===================== Chapitre 5 : preuve directe ===================== */
const gPfWrite=()=>{const a=R(3,9),r=R(1,a-1),t=R(0,3);let p,ok,w;
  if(t===0){p='n est pair';ok='n = 2k, avec k entier';w=['n = 2','n = 2k + 1, avec k entier','n = k + 2, avec k entier']}
  else if(t===1){p='n est impair';ok='n = 2k + 1, avec k entier';w=['n = 2k, avec k entier','n = 3','n = k + 1, avec k entier']}
  else if(t===2){p=`n est un multiple de ${a} (autrement dit ${a}∣n)`;ok=`n = ${a}k, avec k entier`;w=[`n = k + ${a}, avec k entier`,`n = ${a}`,`${a} = kn, avec k entier`]}
  else{p=`le reste de la division de n par ${a} est ${r}`;ok=`n = ${a}k + ${r}, avec k entier`;w=[`n = ${r}k + ${a}, avec k entier`,`n = ${a}k, avec k entier`,`n = ${a} + ${r}`]}
  return mcq('Comment traduire cette propriété en calcul ?',stx(`n est un entier et ${p}.`),[{h:ok,ok:true},...w.map(h=>({h,tag:'pr-redaction'}))],
    `On traduit : ${p} ⟺ ${ok}. La lettre k est un entier quelconque : c’est ce qui permet de couvrir tous les cas. Écrire un nombre particulier (n = 2, n = 3…) ne traiterait qu’un exemple.`,
    'Pair : 2 × (entier). Impair : 2 × (entier) + 1. Multiple de a : a × (entier).')};
const PF_CALC=[
  ['n = 2k + 1, avec k entier. Calcul de n² :','n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1',['n² = 4k² + 1 = 2(2k²) + 1','n² = 4k² + 2k + 1 = 2(2k² + k) + 1','n² = 2k² + 1']],
  ['n = 2k, avec k entier. Calcul de n² :','n² = 4k² = 2(2k²)',['n² = 2k²','n² = 4k = 2(2k)','n² = 2k² + 1']],
  ['a = 2k + 1 et b = 2m + 1, avec k et m entiers. Calcul de a + b :','a + b = 2k + 2m + 2 = 2(k + m + 1)',['a + b = 2k + 2m + 1 = 2(k + m) + 1','a + b = 4km + 1','a + b = 2(k + m)']],
  ['a = 2k + 1 et b = 2m + 1, avec k et m entiers. Calcul de ab :','ab = 4km + 2k + 2m + 1 = 2(2km + k + m) + 1',['ab = 4km + 1 = 2(2km) + 1','ab = 4km + 2 = 2(2km + 1)','ab = 2km + 1']],
  ['n = 3k + 1, avec k entier. Calcul de n² :','n² = 9k² + 6k + 1 = 3(3k² + 2k) + 1',['n² = 9k² + 1 = 3(3k²) + 1','n² = 3k² + 6k + 1','n² = 9k² + 3k + 1 = 3(3k² + k) + 1']]];
const gPfCalc=()=>{const[s,ok,w]=pick(PF_CALC);
  return mcq('Quel calcul est juste ?',stx(s),[{h:ok,ok:true},...w.map(h=>({h,tag:'distrib'}))],`${ok}. On développe complètement (sans oublier le double produit), puis on factorise pour faire apparaître la forme voulue.`,
    'Développe soigneusement : (a + b)² = a² + 2ab + b².')};
const PF_FIRST=[
  {s:'Pour tout entier n, n² + n est pair.',ok:'Soit n un entier quelconque.',w:[['Prenons n = 4.','pr-exemple'],['Supposons que n² + n est pair.','pr-redaction'],['Il existe un entier n tel que n² + n est pair.','pr-quantif']]},
  {s:'Pour tout réel x, x² − 2x + 1 ≥ 0.',ok:'Soit x un réel quelconque.',w:[['Prenons x = 1.','pr-exemple'],['Supposons que x² − 2x + 1 ≥ 0.','pr-redaction'],['Il existe un réel x tel que x² − 2x + 1 ≥ 0.','pr-quantif']]},
  {s:'Si n est multiple de 6, alors n² est multiple de 36.',ok:'Soit n un entier. Supposons que n est multiple de 6.',w:[['Supposons que n² est multiple de 36.','pr-redaction'],['Prenons n = 12, qui est multiple de 6.','pr-exemple'],['Supposons que n n’est pas multiple de 6.','pr-redaction']]},
  {s:'Si a et b sont impairs, alors ab est impair.',ok:'Soit a et b deux entiers. Supposons que a et b sont impairs.',w:[['Supposons que ab est impair.','pr-redaction'],['Prenons a = 3 et b = 5.','pr-exemple'],['Supposons que a ou b est pair.','pr-redaction']]},
  {s:'Pour tous entiers a, b, c : si a∣b et b∣c, alors a∣c.',ok:'Soit a, b, c des entiers. Supposons que a∣b et b∣c.',w:[['Supposons que a∣c.','pr-redaction'],['Prenons a = 2, b = 4 et c = 8.','pr-exemple'],['Il existe des entiers a, b, c tels que a∣b et b∣c.','pr-quantif']]}];
const gPfFirst=()=>{const T=pick(PF_FIRST);
  return mcq('Quelle est la bonne première phrase de la preuve ?',stx(`À démontrer : « ${T.s} »`),[{h:T.ok,ok:true},...T.w.map(([h,tag])=>({h,tag}))],
    `On commence par introduire un objet quelconque (et, pour une implication, par supposer l’hypothèse) : « ${T.ok} ». Prendre une valeur particulière ne prouve qu’un exemple ; supposer la conclusion revient à tricher ; « il existe » ne couvre pas tous les cas.`,
    '« Pour tout » : Soit… quelconque. « Si… alors » : on suppose l’hypothèse, jamais la conclusion.')};
const gPfJust=()=>{const a=R(2,9),b=R(2,6),T=pick([
    [`x &gt; ${a}, donc ${b}x &gt; ${a*b}.`,`On multiplie par ${b}, qui est positif : le sens est conservé.`,[`On multiplie par ${b} ; le sens change toujours quand on multiplie.`,`On ajoute ${b} de chaque côté.`],'ineq-flip'],
    [`x &lt; ${a}, donc −${b}x &gt; −${a*b}.`,`On multiplie par −${b}, qui est négatif : le sens change.`,[`On multiplie par −${b} ; le sens est conservé.`,`On soustrait ${b} de chaque côté.`],'ineq-flip'],
    ['n = 2k avec k entier, donc n² = 2(2k²).','n² = 4k² = 2 × 2k², et 2k² est un entier.',['On élève 2 au carré : 2² = 2.','Le carré d’un nombre pair est égal à son double.'],'calc'],
    ['ab = 0, donc a = 0 ou b = 0.','Un produit est nul si et seulement si l’un au moins de ses facteurs est nul.',['On divise par b.','Un produit est nul si et seulement si ses deux facteurs sont nuls.'],'pr-justif'],
    ['0 &lt; a &lt; b, donc a² &lt; b².','La fonction carré est croissante sur [0 ; +∞[, et a, b y sont.',['Élever au carré conserve toujours l’ordre.','On multiplie par a de chaque côté.'],'pr-justif'],
    [`x² = ${a*a} et x &gt; 0, donc x = ${a}.`,`x² = ${a*a} donne x = ${a} ou x = −${a}, et x &gt; 0 élimine −${a}.`,['On prend la racine : √(x²) = x toujours.',`x² = ${a*a} a une seule solution, ${a}.`],'pr-justif'],
    ['b = ka et c = mb, donc c = (mk)a.','On remplace b par ka dans c = mb.',['On multiplie les deux égalités membre à membre.','On additionne les deux égalités.'],'pr-justif'],
    ['(x − 1)² ≥ 0 pour tout réel x.','Le carré d’un réel est toujours positif ou nul.',['Car x ≥ 1.','Car x − 1 est positif.'],'pr-justif']]);
  return mcq('Quelle justification convient à cette étape ?',stx(T[0]),[{h:T[1],ok:true},...T[2].map(h=>({h,tag:T[3]}))],`Justification : ${T[1]}`,'Quelle règle autorise le passage, et avec quelle hypothèse ?')};
const PF_PAR2=[['a et b deux entiers impairs','a = 3 et b = 5'],['a un entier pair et b un entier impair','a = 4 et b = 7'],['a et b deux entiers impairs','a = 3 et b = 5'],['a et b deux entiers pairs','a = 2 et b = 6']];
const gPfDirR1=()=>{const i=R(0,3),T=PF_PAR[i],[who,nums]=PF_PAR2[i];
  return chain({instr:'Rédige la preuve directe, étape par étape.',prompt:stx(`À démontrer : « ${T.st} »`),
    steps:[
      {q:'Comment commencer ?',o:[pfOK(`Soit ${who}.`),pfW(`Soit ${nums}.`,'Ce sont des nombres particuliers : la preuve ne vaudrait que pour eux.','pr-exemple'),
        pfW(`Supposons que ${T.res}.`,'C’est la conclusion : on ne peut pas la supposer, il faut l’obtenir.','pr-redaction')]},
      {q:'Traduis les hypothèses en calcul :',o:[pfOK(T.tr[0],{i:0}),pfW(T.tr[1],PF_TRW[0],'pr-redaction',{i:1}),pfW(T.tr[2],PF_TRW[1],'pr-redaction',{i:2})]},
      pfParCalc(T,1),
      {q:'Conclusion :',o:[pfOK(`Comme ${T.q} est un entier, ${T.res}.`),
        pfW(`Donc ${T.res}, mais seulement lorsque a = b.`,'Avec deux lettres distinctes k et m, le calcul couvre tous les couples (a ; b).'),
        pfW(`Donc ${T.res}, comme on le voit avec ${nums}.`,'L’exemple n’ajoute rien : c’est le calcul général qui prouve.','pr-exemple')]}],
    explain:`Soit ${who}. On écrit ${T.tr[0]}. Alors ${T.calc[0]}. Comme ${T.q} est un entier, ${T.res}.`})};
const gPfDirR2=()=>{const t=R(0,3),a=R(2,7),p=R(2,7),q=R(2,7);let st,steps,ex;
  if(t===0){st='Pour tous entiers a, b, c : si a∣b et b∣c, alors a∣c.';
    steps=[{q:'Comment commencer ?',o:[pfOK('Soit a, b, c des entiers. On suppose que a∣b et b∣c.'),pfW('Soit a = 2, b = 4 et c = 12.','Des valeurs particulières ne prouvent qu’un exemple.','pr-exemple'),pfW('Soit a, b, c des entiers. On suppose que a∣c.','C’est la conclusion : on ne la suppose pas.','pr-redaction')]},
      {q:'Traduis les hypothèses :',o:[pfOK('Il existe des entiers k et m tels que b = ka et c = mb.',{i:0}),pfW('Il existe un entier k tel que b = ka et c = kb.','Rien ne dit que c’est le même quotient : il faut deux lettres.','pr-redaction',{i:1}),pfW('Il existe des entiers k et m tels que a = kb et b = mc.','a∣b signifie que b est un multiple de a : b = ka, pas a = kb.','pr-redaction',{i:2})]},
      {q:'Calcul :',o:prev=>{const i=prev[1].i;return[['c = m(ka) = (mk)a',0],['c = k(ka) = k²a',1],['a = k(mc) = (km)c',2]].map(([h,j])=>j===i?pfOK(h):pfW(h,'Ce calcul ne correspond pas à la traduction choisie.')).concat([pfW('c = m + ka','On remplace b par ka dans c = mb : c’est un produit, pas une somme.','calc')])}},
      {q:'Conclusion :',o:prev=>{const i=prev[1].i;return[['Comme mk est un entier, a∣c.',0],['Comme k² est un entier, a∣c.',1],['Comme km est un entier, c∣a.',2]].map(([h,j])=>j===i?pfOK(h):pfW(h,'Cette conclusion ne découle pas du calcul obtenu.')).concat([pfW('Donc a∣c seulement quand k = m.','Le calcul c = (mk)a marche pour tous les entiers k et m.')])}}];
    ex='b = ka et c = mb, donc c = m(ka) = (mk)a, et mk est entier : a∣c.'}
  else if(t===1){st=`Pour tous entiers a, b, d : si d∣a et d∣b, alors d∣(${p}a + ${q}b).`;
    steps=[{q:'Comment commencer ?',o:[pfOK('Soit a, b, d des entiers. On suppose que d∣a et d∣b.'),pfW('Soit d = 3, a = 6 et b = 9.','Des valeurs particulières ne prouvent qu’un exemple.','pr-exemple'),pfW(`Soit a, b, d des entiers. On suppose que d∣(${p}a + ${q}b).`,'C’est la conclusion : on ne la suppose pas.','pr-redaction')]},
      {q:'Traduis les hypothèses :',o:[pfOK('Il existe des entiers k et m tels que a = kd et b = md.',{i:0}),pfW('Il existe un entier k tel que a = kd et b = kd.','Avec la même lettre, on impose a = b : il faut deux lettres.','pr-redaction',{i:1}),pfW('Il existe des entiers k et m tels que d = ka et d = mb.','d∣a signifie que a est un multiple de d : a = kd.','pr-redaction',{i:2})]},
      {q:'Calcul :',o:prev=>{const i=prev[1].i===1?1:0;return[[`${p}a + ${q}b = ${p}kd + ${q}md = (${p}k + ${q}m)d`,0],[`${p}a + ${q}b = ${p}kd + ${q}kd = ${p+q}kd`,1]].map(([h,j])=>j===i?pfOK(h):pfW(h,'Ce calcul ne correspond pas à la traduction choisie.')).concat([pfW(`${p}a + ${q}b = (${p}k + ${q}m) + d`,'On factorise par d : c’est un produit, pas une somme.','calc')])}},
      {q:'Conclusion :',o:[pfOK(`Comme ${p}k + ${q}m est un entier, d∣(${p}a + ${q}b).`),pfW(`Donc (${p}a + ${q}b)∣d.`,'C’est le sens inverse : on a montré que le nombre est un multiple de d.','pr-redaction'),pfW(`Donc d∣(${p}a + ${q}b), seulement si a = b.`,'Le calcul marche pour tous a et b multiples de d.')]}];
    ex=`a = kd et b = md, donc ${p}a + ${q}b = (${p}k + ${q}m)d : d le divise.`}
  else if(t===2){st=`Si n est multiple de ${a}, alors n² + ${a}n est multiple de ${a*a}.`;
    steps=[{q:'Comment commencer ?',o:[pfOK(`Soit n un entier multiple de ${a}.`),pfW(`Soit n = ${a}.`,'Un nombre particulier ne prouve qu’un exemple.','pr-exemple'),pfW(`Supposons que n² + ${a}n est multiple de ${a*a}.`,'C’est la conclusion : on ne la suppose pas.','pr-redaction')]},
      {q:'Traduis l’hypothèse :',o:[pfOK(`Il existe un entier k tel que n = ${a}k.`),pfW(`Il existe un entier k tel que ${a} = kn.`,`Multiple de ${a} : n = ${a} × (entier), pas l’inverse.`,'pr-redaction'),pfW(`n = ${a} + k, avec k entier.`,`n = ${a} + k n’est pas forcément un multiple de ${a}.`,'pr-redaction')]},
      {q:'Calcul :',o:[pfOK(`n² + ${a}n = ${a*a}k² + ${a*a}k = ${a*a}(k² + k)`),pfW(`n² + ${a}n = ${a}k² + ${a*a}k`,`(${a}k)² = ${a*a}k², pas ${a}k².`,'calc'),pfW(`n² + ${a}n = ${a*a}k² + ${a}k`,`${a} × ${a}k = ${a*a}k.`,'calc')]},
      {q:'Conclusion :',o:[pfOK(`Comme k² + k est un entier, n² + ${a}n est multiple de ${a*a}.`),pfW(`Donc n² + ${a}n est multiple de ${a*a}, car c’est vrai pour n = ${a}.`,'Un exemple n’ajoute rien : c’est le calcul général qui prouve.','pr-exemple'),pfW(`Donc n² + ${a}n est multiple de ${a*a}, à condition que k soit positif.`,'Le signe de k ne joue aucun rôle.')]}];
    ex=`n = ${a}k donne n² + ${a}n = ${a*a}(k² + k).`}
  else{st='Si n est impair, alors n² − 1 est multiple de 4.';
    steps=[{q:'Comment commencer ?',o:[pfOK('Soit n un entier impair.'),pfW('Soit n = 5.','Un nombre particulier ne prouve qu’un exemple.','pr-exemple'),pfW('Supposons que n² − 1 est multiple de 4.','C’est la conclusion : on ne la suppose pas.','pr-redaction')]},
      {q:'Traduis l’hypothèse :',o:[pfOK('Il existe un entier k tel que n = 2k + 1.'),pfW('Il existe un entier k tel que n = 2k.','C’est l’écriture d’un entier pair.','pr-redaction'),pfW('n = 2k + 1, avec k = 2.','Fixer k revient à prendre un exemple (n = 5).','pr-exemple')]},
      {q:'Calcul :',o:[pfOK('n² − 1 = 4k² + 4k + 1 − 1 = 4(k² + k)'),pfW('n² − 1 = 4k² + 1 − 1 = 4k²','Le double produit manque : (2k + 1)² = 4k² + 4k + 1.','distrib'),pfW('n² − 1 = 4k² + 2k = 2(2k² + k)','Le double produit vaut 2 × 2k × 1 = 4k.','calc')]},
      {q:'Conclusion :',o:[pfOK('Comme k² + k est un entier, n² − 1 est multiple de 4.'),pfW('Donc n² − 1 est multiple de 4 seulement si k est pair.','4(k² + k) est multiple de 4 pour tout entier k.'),pfW('Donc n² − 1 est pair, sans plus.','La forme 4(k² + k) donne mieux : un multiple de 4.')]}];
    ex='n = 2k + 1 donne n² − 1 = 4(k² + k).'}
  return chain({instr:'Rédige la preuve directe, étape par étape.',prompt:stx(`À démontrer : « ${st} »`),steps,explain:`Preuve directe : on introduit les objets, on traduit l’hypothèse avec des lettres entières, on calcule, on conclut. Ici : ${ex}`})};
const PF_INEQ=()=>{const k=R(2,6);return pick([
  {s:'Pour tous réels a et b, a² + b² ≥ 2ab.',A:'a² + b²',B:'2ab',d:'a² + b² − 2ab = (a − b)²',dw:['a² + b² − 2ab = (a + b)²','a² + b² − 2ab = (a − b)(a + b)'],pos:'un carré est toujours positif ou nul',pw:['a ≥ b','a et b sont positifs'],eq:'a = b'},
  {s:`Pour tout réel x, x² + ${k*k} ≥ ${2*k}x.`,A:`x² + ${k*k}`,B:`${2*k}x`,d:`x² − ${2*k}x + ${k*k} = (x − ${k})²`,dw:[`x² − ${2*k}x + ${k*k} = (x + ${k})²`,`x² − ${2*k}x + ${k*k} = (x − ${k})(x + ${k})`],pos:'un carré est toujours positif ou nul',pw:[`x ≥ ${k}`,'x est positif'],eq:`x = ${k}`},
  {s:'Pour tout réel x &gt; 0, x + 1/x ≥ 2.',A:'x + 1/x',B:'2',d:'x + 1/x − 2 = (x² − 2x + 1)/x = (x − 1)²/x',dw:['x + 1/x − 2 = (x − 1)²','x + 1/x − 2 = (x + 1)²/x'],pos:'(x − 1)² ≥ 0 car c’est un carré, et x &gt; 0 par hypothèse',pw:['(x − 1)² ≥ 0, donc le quotient est positif quel que soit le signe de x','x ≥ 1'],eq:'x = 1',hyp:true},
  {s:'Pour tous réels a et b, (a + b)² ≥ 4ab.',A:'(a + b)²',B:'4ab',d:'(a + b)² − 4ab = a² − 2ab + b² = (a − b)²',dw:['(a + b)² − 4ab = a² + b² − 4ab','(a + b)² − 4ab = (a + b − 2)²'],pos:'un carré est toujours positif ou nul',pw:['a ≥ b','a et b sont positifs'],eq:'a = b'},
  {s:`Pour tout réel x &gt; 0, x + ${k*k}/x ≥ ${2*k}.`,A:`x + ${k*k}/x`,B:`${2*k}`,d:`x + ${k*k}/x − ${2*k} = (x² − ${2*k}x + ${k*k})/x = (x − ${k})²/x`,dw:[`x + ${k*k}/x − ${2*k} = (x − ${k})²`,`x + ${k*k}/x − ${2*k} = (x + ${k})²/x`],pos:`(x − ${k})² ≥ 0 car c’est un carré, et x &gt; 0 par hypothèse`,pw:[`(x − ${k})² ≥ 0, donc le quotient est positif quel que soit le signe de x`,`x ≥ ${k}`],eq:`x = ${k}`,hyp:true}])};
const gPfIneqR=()=>{const T=PF_INEQ();
  return chain({instr:'Démontre l’inégalité, étape par étape.',prompt:stx(`À démontrer : « ${T.s} »`),
    steps:[
      {q:'Par quoi commencer ?',o:[pfOK(`Étudier le signe de la différence ${T.A} − ${T.B}`),pfW('Tester avec quelques valeurs bien choisies','Des valeurs ne prouvent qu’un exemple.','pr-exemple'),
        pfW('Partir de l’inégalité à démontrer et arriver à une inégalité vraie','Arriver à quelque chose de vrai ne prouve rien si les étapes ne sont pas des équivalences : on part de ce qu’on sait.','pr-redaction')]},
      {q:'La différence vaut…',o:[pfOK(T.d),...T.dw.map(h=>pfW(h,'Développe pour vérifier : ce n’est pas égal à la différence.','calc'))]},
      {q:'Pourquoi est-elle positive ou nulle ?',o:[pfOK(`Car ${T.pos}`),...T.pw.map((h,j)=>pfW(`Car ${h}`,T.hyp&&j===0?'Si x &lt; 0, le quotient d’un carré non nul par x est négatif : c’est l’hypothèse x &gt; 0 qui permet de conclure.':'Rien ne le garantit : l’inégalité doit être vraie dans tous les cas permis.','pr-justif'))]},
      {q:'Conclusion :',o:[pfOK(`${T.A} − ${T.B} ≥ 0, donc ${T.A} ≥ ${T.B} (égalité pour ${T.eq})`),
        pfW(`${T.A} − ${T.B} &gt; 0 : l’inégalité est toujours stricte`,`Pour ${T.eq}, la différence est nulle : l’égalité est possible.`),
        pfW(`${T.A} ≥ ${T.B} seulement quand ${T.pw[1]}`,'La preuve n’a utilisé aucune condition de ce genre : l’inégalité est vraie dans tous les cas.','pr-justif')]}],
    explain:`On étudie la différence : ${T.d}. Or ${T.pos}. Donc ${T.A} − ${T.B} ≥ 0, c’est-à-dire ${T.A} ≥ ${T.B}, avec égalité pour ${T.eq}.`})};

/* ===================== Chapitre 6 : disjonction de cas ===================== */
const PF_COV=['n pair ; n impair (n entier)','n = 3k ; n = 3k + 1 ; n = 3k + 2 (k entier)','x ≥ 0 ; x &lt; 0 (x réel)','x ≤ 2 ; x ≥ 2 (x réel)','n = 4k ; n = 4k + 1 ; n = 4k + 2 ; n = 4k + 3 (k entier)','x &lt; 1 ; x = 1 ; x &gt; 1 (x réel)'];
const PF_NCOV=[['x &gt; 0 ; x &lt; 0 (x réel)','x = 0'],['n = 3k ; n = 3k + 1 (k entier)','n = 3k + 2'],['n multiple de 4 ; n impair (n entier)','n = 4k + 2, par exemple 6'],['x &gt; 2 ; x &lt; 2 (x réel)','x = 2'],['n = 4k + 1 ; n = 4k + 3 (k entier)','les entiers pairs'],['n premier ; n pair (n entier)','9, impair et non premier'],['x ≥ 1 ; x ≤ 0 (x réel)','les x de ]0 ; 1[']];
const gPfCover=()=>{const ok=pick(PF_COV),w=shuffle(PF_NCOV.slice()).slice(0,3);
  return mcq('Lequel de ces découpages couvre toutes les possibilités ?',stx('Les cas d’une disjonction doivent couvrir tous les nombres possibles.'),[{h:ok,ok:true},...w.map(([h])=>({h,tag:'pr-cas'}))],
    `« ${ok} » couvre tous les cas. Les autres en oublient : ${w.map(([h,m])=>`« ${h} » oublie ${m}`).join(' ; ')}.`,'Cherche un nombre qui n’entre dans aucun des cas.')};
const gPfMod=()=>{const m=R(3,7),r=R(1,m-1),p=pick([2,2,3]),t=r**p%m,e=p===2?'²':'³';
  return nq({instr:'Trouve le reste.',prompt:stx(`n = ${m}k + ${r}, avec k entier. Quel est le reste de la division de n${e} par ${m} ?`),labels:['Reste ='],t:[t],
    explain:`En développant (${m}k + ${r})${e}, tous les termes contenant k sont des multiples de ${m} ; il reste ${r}${e} = ${r**p}. Or ${r**p} = ${m} × ${Math.floor(r**p/m)} + ${t} : le reste est ${t}.`,
    hint:`Seul le terme sans k compte : ${r}${e}. Réduis-le ensuite (un reste est entre 0 et ${m-1}).`,diag:([v])=>v===r**p&&v!==t?'calc':null})};
const gPfAbs=()=>{const a=R(1,9),neg=Math.random()<.5,big=Math.random()<.5;let s,c,ok,w;
  if(!neg){s=`|x − ${a}|`;c=big?`x ≥ ${a}`:`x &lt; ${a}`;ok=big?`x − ${a}`:`${a} − x`;w=big?[`${a} − x`,`x + ${a}`,`−x − ${a}`]:[`x − ${a}`,`−x − ${a}`,`x + ${a}`]}
  else{s=`|x + ${a}|`;c=big?`x ≥ −${a}`:`x &lt; −${a}`;ok=big?`x + ${a}`:`−x − ${a}`;w=big?[`−x − ${a}`,`x − ${a}`,`${a} − x`]:[`x + ${a}`,`x − ${a}`,`${a} − x`]}
  return mcq('Simplifie la valeur absolue.',stx(`Pour ${c}, à quoi est égal ${s} ?`),[{h:ok,ok:true},...w.map(h=>({h,tag:'signe'}))],
    `|X| = X si X ≥ 0, et |X| = −X si X &lt; 0. Ici X = ${s.slice(1,-1)} ; pour ${c}, X est ${big?'positif ou nul':'négatif'} : ${s} = ${ok}.`,'Regarde le signe de ce qui est à l’intérieur de la valeur absolue.')};
const gPfCasR1=()=>{const b=pick([1,3,5]),d=R(1,9),par=d%2?'impair':'pair',bt=b===1?'n':`${b}n`,bk=b===1?'k':`${b}k`,E=`n² + ${bt} + ${d}`;
  return chain({instr:'Démontre la propriété par disjonction de cas.',prompt:stx(`À démontrer : « pour tout entier n, ${E} est ${par} ».`),
    steps:[
      {q:'Quels cas étudier ?',o:[pfOK('n pair, puis n impair'),pfW('n &gt; 0, puis n &lt; 0','Ce découpage oublie n = 0, et le signe ne dit rien de la parité.','pr-cas'),pfW('n = 0, puis n = 1','Deux valeurs ne sont pas deux cas : il faut des familles qui couvrent tous les entiers.','pr-exemple')]},
      {q:'Cas n pair, n = 2k (k entier) :',o:[pfOK(`${E} = 4k² + ${2*b}k + ${d} = 2(2k² + ${bk}) + ${d}`),
        pfW(`${E} = 2k² + ${2*b}k + ${d} = 2(k² + ${bk}) + ${d}`,'(2k)² = 4k², pas 2k².','calc'),
        pfW(`${E} = 4k² + ${bk} + ${d}`,`${bt} = ${b===1?'':b+' × '}2k = ${2*b}k : le facteur 2 a été oublié.`,'calc')]},
      {q:'Cas n impair, n = 2k + 1 (k entier) :',o:[pfOK(`${E} = 4k² + ${4+2*b}k + ${b+1+d} = 2(2k² + ${2+b}k + ${(b+1)/2}) + ${d}`),
        pfW(`${E} = 4k² + 1 + ${2*b}k + ${b} + ${d}`,'(2k + 1)² = 4k² + 4k + 1 : le double produit 4k manque.','distrib'),
        pfW(`${E} = 4k² + ${4+2*b}k + ${b+1+d}, qui n’a pas de parité définie`,`${b+1} est pair : on peut regrouper 4k² + ${4+2*b}k + ${b+1} = 2(…).`,'calc')]},
      {q:'Conclusion :',o:[pfOK(`Dans tous les cas, ${E} = 2 × (entier) + ${d} : il est ${par}`),
        pfW(`${E} est ${par} quand n est pair ; on ne peut rien dire sinon`,'Le cas impair a été traité : il donne la même forme.','pr-cas'),
        pfW(`${E} est ${par}, car c’est vrai pour n = 0 et n = 1`,'Ce sont deux exemples ; ce sont les deux cas généraux qui prouvent.','pr-exemple')]}],
    explain:`Tout entier est pair ou impair. Si n = 2k : ${E} = 2(2k² + ${bk}) + ${d}. Si n = 2k + 1 : ${E} = 2(2k² + ${2+b}k + ${(b+1)/2}) + ${d}. Dans tous les cas c’est 2 × (entier) + ${d}, donc ${par}.`})};
const gPfCasR2=()=>{if(Math.random()<.55)return chain({instr:'Démontre la propriété par disjonction de cas.',prompt:stx('À démontrer : « pour tout entier n, le reste de la division de n² par 3 est 0 ou 1 ».'),
    steps:[
      {q:'Quels cas étudier ?',o:[pfOK('n = 3k, n = 3k + 1, n = 3k + 2 (k entier)'),pfW('n pair, puis n impair','La parité ne renseigne pas sur le reste dans la division par 3.','pr-cas'),pfW('n = 3k, puis n = 3k + 1 (k entier)','Il manque n = 3k + 2 (par exemple n = 2 ou 5).','pr-cas')]},
      {q:'Cas n = 3k + 1 :',o:[pfOK('n² = 9k² + 6k + 1 = 3(3k² + 2k) + 1 : reste 1'),pfW('n² = 9k² + 1 = 3(3k²) + 1 : reste 1','Le double produit 6k manque (même si le reste est juste, le calcul est faux).','distrib'),pfW('n² = 9k² + 6k + 1 : reste 6k + 1','Un reste est un nombre entre 0 et 2, sans k : regroupe les multiples de 3.','calc')]},
      {q:'Cas n = 3k + 2 :',o:[pfOK('n² = 9k² + 12k + 4 = 3(3k² + 4k + 1) + 1 : reste 1'),pfW('n² = 9k² + 12k + 4 = 3(3k² + 4k) + 4 : reste 4','4 n’est pas un reste possible : 4 = 3 + 1, le reste est 1.','calc'),pfW('n² = 9k² + 12k + 4 : reste 2','Le terme constant 4 = 3 × 1 + 1 donne un reste 1.','calc')]},
      {q:'Conclusion (le cas n = 3k donne n² = 3(3k²), reste 0) :',o:[pfOK('Dans tous les cas, le reste de n² est 0 ou 1'),pfW('Le reste est toujours 1','Pour n = 3k, le reste est 0.','pr-cas'),pfW('Le reste peut être 0, 1 ou 2','Aucun des trois cas ne donne 2.','calc')]}],
    explain:'n = 3k : n² = 3(3k²), reste 0. n = 3k + 1 : n² = 3(3k² + 2k) + 1, reste 1. n = 3k + 2 : n² = 3(3k² + 4k + 1) + 1, reste 1. Dans tous les cas : 0 ou 1. Conséquence : un carré n’est jamais de la forme 3k + 2.'});
  return chain({instr:'Démontre la propriété par disjonction de cas.',prompt:stx('À démontrer : « pour tout entier n, le reste de la division de n² par 4 est 0 ou 1 ».'),
    steps:[
      {q:'Quels cas étudier ?',o:[pfOK('n pair, puis n impair'),pfW('n &gt; 0, puis n &lt; 0','Ce découpage oublie n = 0, et le signe ne dit rien du reste.','pr-cas'),pfW('n = 4k, puis n = 4k + 1 (k entier)','Il manque n = 4k + 2 et n = 4k + 3.','pr-cas')]},
      {q:'Cas n = 2k :',o:[pfOK('n² = 4k² : reste 0'),pfW('n² = 2k² : reste 0 ou 2','(2k)² = 4k², pas 2k².','calc'),pfW('n² = 4k : reste 0','(2k)² = 4k², pas 4k (même si le reste est juste).','calc')]},
      {q:'Cas n = 2k + 1 :',o:[pfOK('n² = 4k² + 4k + 1 = 4(k² + k) + 1 : reste 1'),pfW('n² = 4k² + 1 : reste 1','Le double produit 4k manque : (2k + 1)² = 4k² + 4k + 1.','distrib'),pfW('n² = 2(2k² + 2k) + 1 : reste 1 dans la division par 4','Cette écriture montre seulement que n² est impair, pas son reste dans la division par 4.','calc')]},
      {q:'Conclusion :',o:[pfOK('Dans tous les cas, le reste de n² dans la division par 4 est 0 ou 1'),pfW('Le reste est toujours 0','Pour n impair, le reste est 1.','pr-cas'),pfW('Le reste peut être 0, 1, 2 ou 3','Les deux cas ne donnent que 0 ou 1.','calc')]}],
    explain:'n = 2k : n² = 4k², reste 0. n = 2k + 1 : n² = 4(k² + k) + 1, reste 1. Dans tous les cas : 0 ou 1. Conséquence : n² + 2 n’est jamais divisible par 4, et une somme de deux carrés n’est jamais de la forme 4k + 3.'})};
const gPfCasR3=()=>{const a=R(1,9);let b=R(1,9);while(b===a)b=R(1,9);
  return chain({instr:'Résous par disjonction de cas.',prompt:stx(`Résoudre dans ℝ : |x − ${a}| = ${b}.`),
    steps:[
      {q:'Quels cas distinguer ?',o:[pfOK(`x ≥ ${a}, puis x &lt; ${a}`),pfW('x ≥ 0, puis x &lt; 0',`Ce qui compte est le signe de x − ${a}, pas celui de x.`,'pr-cas'),pfW(`x &gt; ${a}, puis x &lt; ${a}`,`Ce découpage oublie x = ${a}.`,'pr-cas')]},
      {q:`Cas x ≥ ${a} :`,o:[pfOK(`x − ${a} = ${b}, donc x = ${a+b}, qui vérifie bien x ≥ ${a}`),pfW(`${a} − x = ${b}, donc x = ${pfM(a-b)}`,`Pour x ≥ ${a}, x − ${a} ≥ 0, donc |x − ${a}| = x − ${a}.`,'signe'),pfW(`x + ${a} = ${b}, donc x = ${pfM(b-a)}`,`La valeur absolue ne change pas − ${a} en + ${a}.`,'signe')]},
      {q:`Cas x &lt; ${a} :`,o:[pfOK(`${a} − x = ${b}, donc x = ${pfM(a-b)}, qui vérifie bien x &lt; ${a}`),pfW(`x − ${a} = ${b}, donc x = ${a+b}`,`Pour x &lt; ${a}, x − ${a} &lt; 0 : |x − ${a}| = ${a} − x.`,'signe'),pfW(`−x − ${a} = ${b}, donc x = ${pfM(-a-b)}`,`−(x − ${a}) = −x + ${a}, pas −x − ${a}.`,'signe')]},
      {q:'Ensemble des solutions :',o:[pfOK(`S = {${pfM(a-b)} ; ${a+b}}`),pfW(`S = {${a+b}}`,`Le cas x &lt; ${a} donne aussi une solution.`,'pr-cas'),pfW(`S = {${pfM(b-a)} ; ${a+b}}`,`Dans le second cas, x = ${a} − ${b}.`,'signe')]}],
    explain:`Si x ≥ ${a} : x − ${a} = ${b}, x = ${a+b} (valable). Si x &lt; ${a} : ${a} − x = ${b}, x = ${pfM(a-b)} (valable). S = {${pfM(a-b)} ; ${a+b}} : les deux nombres à distance ${b} de ${a}.`})};
const PF_CASVF=[
  ['Un carré d’entier peut se terminer par le chiffre 7.',false,'En testant les 10 derniers chiffres possibles de n, le carré se termine par 0, 1, 4, 5, 6 ou 9, jamais par 7.'],
  ['Pour tout entier n, n³ − n est divisible par 3.',true,'n³ − n = (n − 1)n(n + 1) : trois entiers consécutifs, dont l’un est multiple de 3 (cas n = 3k, 3k + 1, 3k + 2).'],
  ['Pour tout entier n, n² + 1 n’est pas divisible par 3.',true,'n² a pour reste 0 ou 1 dans la division par 3, donc n² + 1 a pour reste 1 ou 2, jamais 0.'],
  ['Il existe un entier n tel que n² + 2 soit divisible par 4.',false,'n² a pour reste 0 ou 1 dans la division par 4 (cas pair, impair), donc n² + 2 a pour reste 2 ou 3.'],
  ['Le produit de deux entiers consécutifs est toujours pair.',true,'L’un des deux est pair (cas n pair, n impair).'],
  ['Pour tout entier n impair, n² − 1 est divisible par 8.',true,'n = 2k + 1 : n² − 1 = 4k(k + 1), et k(k + 1) est pair, donc 8 divise n² − 1.'],
  ['Une somme de deux carrés d’entiers peut avoir pour reste 3 dans la division par 4.',false,'Chaque carré a pour reste 0 ou 1 : la somme a pour reste 0, 1 ou 2.'],
  ['Pour tout réel x, |x| ≥ x.',true,'Si x ≥ 0, |x| = x ; si x &lt; 0, |x| = −x &gt; 0 &gt; x.'],
  ['Pour tout réel x, |x| = x.',false,'Pour x &lt; 0, |x| = −x ≠ x : par exemple |−3| = 3.'],
  ['Les cas « x &lt; 0 » et « x &gt; 0 » couvrent tous les réels.',false,'Ils oublient x = 0.']];
const gPfCasVF=()=>pfVF(PF_CASVF,'pr-cas','Découpe selon la parité, le reste ou le signe, et vérifie chaque cas.');
const gPfLast=()=>{const d=R(2,9),p=R(2,5),t=d**p%10;
  return nq({instr:'Trouve le chiffre des unités.',prompt:stx(`Un entier n se termine par le chiffre ${d}. Par quel chiffre se termine n<sup>${p}</sup> ?`),labels:['Chiffre ='],t:[t],
    explain:`On écrit n = 10k + ${d}. Dans le développement de n<sup>${p}</sup>, tous les termes contenant 10k sont des multiples de 10 : seul ${d}<sup>${p}</sup> = ${d**p} compte. Son chiffre des unités est ${t}.`,
    hint:`Seul le dernier chiffre compte : calcule ${d}<sup>${p}</sup>, ou multiplie ${p} fois en ne gardant que le chiffre des unités.`,diag:([v])=>v===d**p?'calc':null})};

/* ===================== Chapitre 7 : contraposée ===================== */
const PF_CP=[
  ['n² est pair','n est pair','n² est impair','n est impair'],
  ['n² est multiple de 3','n est multiple de 3','n² n’est pas multiple de 3','n n’est pas multiple de 3'],
  ['ab est impair','a et b sont impairs','ab est pair','a est pair ou b est pair'],
  ['a + b est impair','a ≠ b','a + b est pair','a = b'],
  ['x² ≠ 1','x ≠ 1','x² = 1','x = 1'],
  ['n² + 2n est impair','n est impair','n² + 2n est pair','n est pair'],
  ['x³ ≠ 8','x ≠ 2','x³ = 8','x = 2'],
  ...PF_IMP];
const gPfCpForm=()=>{const[P,Q,nP,nQ]=pick(PF_CP);
  return mcq('Quelle est la contraposée de cette implication ?',stx(`« ${pfSi(P)}, alors ${Q}. »`),[
    {h:`${pfSi(nQ)}, alors ${nP}.`,ok:true},{h:`${pfSi(Q)}, alors ${P}.`,tag:'pr-reciproque'},{h:`${pfSi(nP)}, alors ${nQ}.`,tag:'pr-contrapose'},{h:`${pfSi(nQ)}, alors ${P}.`,tag:'pr-contrapose'}],
    `La contraposée de « si P, alors Q » est « si non Q, alors non P » : on échange ET on nie. Ici : « ${pfSi(nQ)}, alors ${nP} ». Elle est équivalente à l’implication de départ, contrairement à la réciproque « ${pfSi(Q)}, alors ${P} ».`,
    'Échange les deux parties et nie chacune.')};
const gPfCpStart=()=>{const[P,Q,nP,nQ]=pick(PF_CP.slice(0,7));
  return mcq('Par quoi commence une preuve par contraposée ?',stx(`À démontrer par contraposée : « ${pfSi(P)}, alors ${Q}. »`),[
    {h:`Supposons que ${nQ}.`,ok:true},{h:`Supposons que ${P}.`,tag:'pr-contrapose'},{h:`Supposons que ${Q}.`,tag:'pr-reciproque'},{h:`Supposons que ${P} et que ${nQ}.`,tag:'pr-absurde'}],
    `Par contraposée, on démontre « si non Q, alors non P » : on suppose « ${nQ} » et on vise « ${nP} ». Supposer P, c’est une preuve directe ; supposer P et non Q, c’est l’absurde.`,
    'Contraposée : on part de la négation de la conclusion.')};
const PF_CPVF=[
  ['Une implication et sa contraposée ont toujours la même valeur de vérité.',true,'« Si P alors Q » est fausse exactement quand P est vraie et Q fausse, c’est-à-dire quand non Q est vraie et non P fausse.'],
  ['Une implication et sa réciproque ont toujours la même valeur de vérité.',false,'« Si n est multiple de 4, n est pair » est vraie, sa réciproque est fausse (6).'],
  ['La contraposée de la contraposée est l’implication de départ.',true,'non(non P) = P et non(non Q) = Q.'],
  ['La contraposée de « si P, alors Q » est « si Q, alors P ».',false,'Ça, c’est la réciproque. La contraposée est « si non Q, alors non P ».'],
  ['« Si non P, alors non Q » est équivalente à la réciproque « si Q, alors P ».',true,'C’est la contraposée de la réciproque : elles ont la même valeur de vérité.'],
  ['Pour démontrer « si P, alors Q » par contraposée, on suppose non Q et on démontre non P.',true,'C’est exactement la définition.'],
  ['Par contraposée, on suppose P et non Q, puis on cherche une contradiction.',false,'Ça, c’est le raisonnement par l’absurde.'],
  ['La contraposée de « si n² est pair, alors n est pair » est « si n est pair, alors n² est pair ».',false,'C’est la réciproque. La contraposée est « si n est impair, alors n² est impair ».']];
const gPfCpVF=()=>pfVF(PF_CPVF,'pr-contrapose','Contraposée : on échange ET on nie.');
const PF_CPR=[
  {P:'n² est pair',Q:'n est pair',c:'Si n est impair, alors n² est impair',r:'Si n est pair, alors n² est pair',i:'Si n² est impair, alors n est impair',pr:'Soit n impair : n = 2k + 1, donc n² = 2(2k² + 2k) + 1 est impair',pw:[['Soit n pair : n = 2k, donc n² = 4k² est pair','Cela démontre la réciproque, pas la contraposée.','pr-reciproque'],['Soit n impair : n² = 2k + 1, donc n = √(2k + 1)','On part de n et on calcule n², pas l’inverse.','pr-redaction']]},
  {P:'n² est impair',Q:'n est impair',c:'Si n est pair, alors n² est pair',r:'Si n est impair, alors n² est impair',i:'Si n² est pair, alors n est pair',pr:'Soit n pair : n = 2k, donc n² = 2(2k²) est pair',pw:[['Soit n impair : n = 2k + 1, donc n² = 2(2k² + 2k) + 1 est impair','Cela démontre la réciproque, pas la contraposée.','pr-reciproque'],['Soit n pair : n = 2k, donc n² = 2k² est pair','(2k)² = 4k².','calc']]},
  {P:'ab est impair',Q:'a et b sont impairs',c:'Si a est pair ou b est pair, alors ab est pair',r:'Si a et b sont impairs, alors ab est impair',i:'Si ab est pair, alors a est pair ou b est pair',pr:'Si a = 2k, ab = 2(kb) ; si b = 2m, ab = 2(am) : dans les deux cas ab est pair',pw:[['Si a = 2k et b = 2m, ab = 4km est pair','La négation de « a et b impairs » est « a pair OU b pair » : il ne faut pas supposer les deux pairs.','pr-negation'],['Si a = 2k + 1 et b = 2m + 1, ab est impair','Cela démontre la réciproque.','pr-reciproque']]},
  {P:'a + b est impair',Q:'a ≠ b',c:'Si a = b, alors a + b est pair',r:'Si a ≠ b, alors a + b est impair',i:'Si a + b est pair, alors a = b',pr:'Si a = b, alors a + b = 2a, qui est pair',pw:[['Si a ≠ b, par exemple a = 1 et b = 2, a + b = 3 est impair','C’est un exemple de la réciproque, qui est d’ailleurs fausse (1 et 3).','pr-reciproque'],['Si a = b, alors a + b = a², qui est pair','a + a = 2a, pas a².','calc']]}];
const gPfCpR1=()=>{const T=PF_CPR[R(0,3)];
  return chain({instr:'Démontre l’implication par contraposée.',prompt:stx(`À démontrer : « Si ${T.P}, alors ${T.Q}. » (a, b, n entiers)`),
    steps:[
      {q:'Quelle stratégie ?',o:[pfOK('Démontrer la contraposée : si non Q, alors non P'),pfW('Démontrer que si Q, alors P','C’est la réciproque : elle n’est pas équivalente à l’implication.','pr-reciproque'),pfW('Vérifier sur plusieurs exemples','Des exemples ne démontrent pas une implication.','pr-exemple')]},
      {q:'Écris la contraposée :',o:[pfOK(T.c),pfW(T.r,'C’est la réciproque : on a échangé sans nier.','pr-reciproque'),pfW(T.i,'On a nié sans échanger : c’est l’inverse, équivalent à la réciproque.','pr-contrapose')]},
      {q:'Démontre-la :',o:[pfOK(T.pr),...T.pw.map(([h,w,t])=>pfW(h,w,t))]},
      {q:'Conclusion :',o:[pfOK('La contraposée est vraie, donc l’implication de départ est vraie'),pfW('On a prouvé la réciproque, donc l’implication est vraie','La réciproque n’est pas équivalente à l’implication.','pr-reciproque'),pfW('La contraposée est vraie, mais cela ne dit rien de l’implication de départ','Une implication et sa contraposée sont toujours équivalentes.','pr-contrapose')]}],
    explain:`Contraposée : « ${T.c} ». Preuve : ${T.pr}. Comme la contraposée est équivalente à l’implication, « si ${T.P}, alors ${T.Q} » est démontrée.`})};
const gPfCpR2=()=>{const p=pick([3,5]);
  return chain({instr:'Démontre par contraposée (avec des cas).',prompt:stx(`À démontrer : « pour tout entier n, si n² est multiple de ${p}, alors n est multiple de ${p} ».`),
    steps:[
      {q:'Contraposée :',o:[pfOK(`Si n n’est pas multiple de ${p}, alors n² n’est pas multiple de ${p}`),pfW(`Si n est multiple de ${p}, alors n² est multiple de ${p}`,'C’est la réciproque (vraie, mais ce n’est pas ce qu’on veut).','pr-reciproque'),pfW(`Si n² n’est pas multiple de ${p}, alors n n’est pas multiple de ${p}`,'On a nié sans échanger.','pr-contrapose')]},
      {q:`Comment traduire « n n’est pas multiple de ${p} » ?`,o:p===3?[pfOK('n = 3k + 1 ou n = 3k + 2, avec k entier'),pfW('n = 3k + 1, avec k entier','Il manque le cas n = 3k + 2.','pr-cas'),pfW('n = 3k, avec k entier','C’est l’écriture d’un multiple de 3.','pr-negation')]
        :[pfOK('n = 5k + r avec k entier et r ∈ {1, 2, 3, 4}'),pfW('n = 5k + 1, avec k entier','Il manque les restes 2, 3 et 4.','pr-cas'),pfW('n = 5k + 2 ou n = 5k + 3, avec k entier','Il manque les restes 1 et 4.','pr-cas')]},
      {q:'Calcul de n² :',o:p===3?[pfOK('n² = 3(3k² + 2k) + 1 ou n² = 3(3k² + 4k + 1) + 1'),pfW('n² = 9k² + 1 ou n² = 9k² + 4','Les doubles produits 6k et 12k manquent.','distrib'),pfW('n² = 3(3k² + 2k) + 1 ou n² = 3(3k² + 4k) + 2','(3k + 2)² = 9k² + 12k + 4 = 3(3k² + 4k + 1) + 1.','calc')]
        :[pfOK('n² = 5(5k² + 2rk) + r², avec r² ∈ {1, 4, 9, 16}'),pfW('n² = 25k² + r², avec r² ∈ {1, 4, 9, 16}','Le double produit 10rk manque.','distrib'),pfW('n² = 5(5k² + 2rk) + r, avec r ∈ {1, 2, 3, 4}','Le terme constant est r², pas r.','calc')]},
      {q:'Conclusion :',o:[pfOK(`Dans tous les cas, n² n’est pas multiple de ${p} : la contraposée, donc l’implication, est prouvée`),
        pfW(`On a prouvé que si n est multiple de ${p}, n² l’est aussi : c’est ce qu’on voulait`,'Non : c’est la réciproque.','pr-reciproque'),
        pfW('On ne peut pas conclure : un seul cas a été traité','Tous les restes non nuls ont été traités.','pr-cas')]}],
    explain:p===3?'Contraposée : si n = 3k + 1, n² = 3(3k² + 2k) + 1 ; si n = 3k + 2, n² = 3(3k² + 4k + 1) + 1. Dans les deux cas, n² n’est pas multiple de 3. L’implication est donc vraie (c’est la clé de l’irrationalité de √3).'
      :'Contraposée : si n = 5k + r avec r ∈ {1, 2, 3, 4}, n² = 5(5k² + 2rk) + r², et r² vaut 1, 4, 9 ou 16 : aucun n’est multiple de 5 (restes 1, 4, 4, 1). Donc n² n’est pas multiple de 5, et l’implication est vraie.'})};
const gPfCpR3=()=>{const V=Math.random()<.5;
  const T=V?{s:'Soit x un réel. Si |x| ≤ ε pour tout réel ε &gt; 0, alors x = 0.',c:'Si x ≠ 0, alors il existe un réel ε &gt; 0 tel que |x| &gt; ε',cw:['Si x ≠ 0, alors pour tout réel ε &gt; 0, |x| &gt; ε','Si x = 0, alors |x| ≤ ε pour tout réel ε &gt; 0'],
      e:'ε = |x|/2',ew:[['ε = |x|','« |x| &gt; |x| » est faux : il faut un ε strictement plus petit que |x|.'],['ε = 1','Si |x| = 0,1, alors |x| &gt; 1 est faux : ε doit dépendre de x.'],['ε = −|x|','ε doit être strictement positif.']],
      v:'ε = |x|/2 &gt; 0 car x ≠ 0, et |x| &gt; |x|/2',vw:[['|x|/2 &gt; 0 pour tout réel x','Pour x = 0, |x|/2 = 0 : c’est l’hypothèse x ≠ 0 qui donne ε &gt; 0.'],['|x|/2 ≥ |x|, donc ε convient','C’est l’inverse : |x|/2 &lt; |x| quand x ≠ 0.']]}
    :{s:'Soit a et b deux réels. Si a ≤ b + ε pour tout réel ε &gt; 0, alors a ≤ b.',c:'Si a &gt; b, alors il existe un réel ε &gt; 0 tel que a &gt; b + ε',cw:['Si a &gt; b, alors pour tout réel ε &gt; 0, a &gt; b + ε','Si a ≤ b, alors a ≤ b + ε pour tout réel ε &gt; 0'],
      e:'ε = (a − b)/2',ew:[['ε = a − b','b + (a − b) = a, et « a &gt; a » est faux.'],['ε = 1','Si a − b = 0,1, alors a &gt; b + 1 est faux : ε doit dépendre de a et b.'],['ε = b − a','b − a &lt; 0 : ε doit être strictement positif.']],
      v:'ε &gt; 0 car a &gt; b, et b + ε = (a + b)/2 &lt; a',vw:[['ε &gt; 0 pour tous réels a et b','C’est l’hypothèse a &gt; b qui donne ε &gt; 0.'],['b + ε = a, donc ε convient','b + (a − b)/2 = (a + b)/2, qui est strictement inférieur à a.']]};
  return chain({instr:'Démontre par contraposée (niveau université).',prompt:stx(`À démontrer : « ${T.s} »`),
    steps:[
      {q:'Contraposée :',o:[pfOK(T.c),pfW(T.cw[0],'La négation de « pour tout ε » est « il existe ε » : un seul ε suffit.','pr-negation'),pfW(T.cw[1],'C’est la réciproque.','pr-reciproque')]},
      {q:'Quel ε choisir ?',o:[pfOK(T.e),...T.ew.map(([h,w])=>pfW(h,w,'pr-justif'))]},
      {q:'Vérification :',o:[pfOK(T.v),...T.vw.map(([h,w])=>pfW(h,w,'pr-justif'))]},
      {q:'Conclusion :',o:[pfOK('La contraposée est vraie, donc l’implication l’est aussi'),pfW('On a seulement trouvé un ε : ce n’est qu’un exemple','La contraposée demande « il existe ε » : un ε bien choisi la prouve.','pr-quantif'),pfW('On a prouvé la réciproque','On a supposé la négation de la conclusion et obtenu la négation de l’hypothèse : c’est la contraposée.','pr-contrapose')]}],
    explain:`Contraposée : « ${T.c} ». On choisit ${T.e} : ${T.v}. La contraposée est donc vraie, et l’implication aussi. (Un « il existe » se prouve en exhibant l’objet.)`})};

/* ===================== Chapitre 8 : l'absurde ===================== */
const PF_ABS=[
  ['√2 est irrationnel.','Supposons que √2 est rationnel : √2 = p/q, avec p, q entiers et q ≠ 0.',['Supposons que √2 est irrationnel.','Supposons que √2 ≈ 1,414.','Supposons que tous les réels sont rationnels.']],
  ['Il existe une infinité de nombres premiers.','Supposons qu’il n’existe qu’un nombre fini de nombres premiers.',['Supposons qu’il existe une infinité de nombres premiers.','Supposons qu’il n’existe aucun nombre premier.','Supposons que tous les nombres impairs sont premiers.']],
  ['Il n’existe pas de plus grand entier naturel.','Supposons qu’il existe un plus grand entier naturel N.',['Supposons que tout entier naturel est plus petit qu’un autre.','Supposons qu’il n’existe aucun entier naturel.','Supposons que N + 1 n’est pas un entier.']],
  ['Pour tout entier n, n² + 2 n’est pas divisible par 4.','Supposons qu’il existe un entier n tel que n² + 2 est divisible par 4.',['Supposons que pour tout entier n, n² + 2 est divisible par 4.','Supposons que n² + 2 n’est pas divisible par 4.','Supposons qu’il existe un entier n tel que n² + 2 n’est pas divisible par 4.']],
  ['Aucun réel y ne vérifie 0 × y = 1.','Supposons qu’il existe un réel y tel que 0 × y = 1.',['Supposons que pour tout réel y, 0 × y = 1.','Supposons que 0 × y = 0 pour tout réel y.','Supposons qu’aucun réel y ne vérifie 0 × y = 1.']],
  ['√3 est irrationnel.','Supposons que √3 = p/q, avec p, q entiers, q ≠ 0 et p/q irréductible.',['Supposons que √3 est irrationnel.','Supposons que √3 = 1,732.','Supposons que √3 = p/q pour tous les entiers p et q.']],
  ['L’équation x² = −1 n’a pas de solution réelle.','Supposons qu’il existe un réel x tel que x² = −1.',['Supposons que pour tout réel x, x² = −1.','Supposons que x² = 1.','Supposons qu’aucun réel ne vérifie x² = −1.']]];
const gPfAbStart=()=>{const[s,ok,w]=pick(PF_ABS);
  return mcq('Par quelle supposition commence le raisonnement par l’absurde ?',stx(`À démontrer : « ${s} »`),[{h:ok,ok:true},...w.map(h=>({h,tag:'pr-absurde'}))],
    `Par l’absurde, on suppose la négation exacte de ce qu’on veut prouver : « ${ok} » Puis on cherche une contradiction. Supposer l’énoncé lui-même, ou une négation mal faite (∀ au lieu de ∃), ne mène à rien.`,
    'Écris la négation exacte de l’énoncé (attention aux quantificateurs).')};
const PF_ABVF=[
  ['Une contradiction est une affirmation de la forme « A et non A ».',true,'Elle est toujours fausse : c’est ce qu’on cherche à obtenir dans un raisonnement par l’absurde.'],
  ['Dans un raisonnement par l’absurde pour prouver P, on suppose que P est vraie.',false,'On suppose non P, et on cherche une contradiction.'],
  ['Si en supposant non P on aboutit à une contradiction, alors P est vraie.',true,'Un raisonnement correct ne mène pas à l’impossible à partir d’une supposition vraie : non P était fausse.'],
  ['Le nombre 2 × 3 × 5 × 7 × 11 × 13 + 1 est premier.',false,'Il vaut 30 031 = 59 × 509. La preuve d’Euclide n’affirme pas que ce nombre est premier, seulement qu’il a un diviseur premier hors de la liste.'],
  ['Dans la preuve de l’irrationalité de √2, l’hypothèse « p/q irréductible » est indispensable.',true,'C’est elle qui est contredite quand on trouve p et q tous deux pairs.'],
  ['La somme d’un rationnel et d’un irrationnel est toujours irrationnelle.',true,'Si r + x = s avec r, s rationnels, alors x = s − r serait rationnel : contradiction.'],
  ['Le produit de deux irrationnels est toujours irrationnel.',false,'√2 × √2 = 2 est rationnel.'],
  ['Tout entier N ≥ 2 a au moins un diviseur premier.',true,'Son plus petit diviseur supérieur ou égal à 2 est premier (sinon il aurait un diviseur encore plus petit).'],
  ['Pour prouver « si P, alors Q » par l’absurde, on suppose P et non Q, puis on cherche une contradiction.',true,'C’est la négation de l’implication : P vraie et Q fausse.']];
const gPfAbVF=()=>pfVF(PF_ABVF,'pr-absurde','Absurde : on suppose le contraire et on cherche une contradiction.');
const gPfEucl=()=>{const P=[2,3,5,7,11,13],k=R(2,6),L=P.slice(0,k),pr=L.reduce((a,b)=>a*b,1),N=pr+1;
  return nq({instr:'Calcule le nombre d’Euclide.',prompt:stx(`Dans la preuve d’Euclide, on suppose que la liste des nombres premiers est ${L.join(', ')}. Que vaut N = ${L.join(' × ')} + 1 ?`),labels:['N ='],t:[N],
    explain:`N = ${pfM(pr)} + 1 = ${pfM(N)}. Aucun nombre de la liste ne divise N (le reste de la division par chacun vaut 1). ${N===30031?'Ici N = 30 031 = 59 × 509 n’est pas premier : ses diviseurs premiers, 59 et 509, sont hors de la liste.':'Ici N est premier, mais ce n’est pas toujours le cas (2 × 3 × 5 × 7 × 11 × 13 + 1 = 30 031 = 59 × 509) : ce qui compte est que N a un diviseur premier hors de la liste.'}`,
    hint:'Multiplie tous les nombres de la liste, puis ajoute 1.',diag:([v])=>v===pr?'calc':null})};
const gPfAbR1=()=>{const p=pick([2,3]),M=p===2?'pair':'multiple de 3',Ms=p===2?'pairs':'multiples de 3';
  return chain({instr:`Démontre que √${p} est irrationnel, par l’absurde.`,prompt:stx(`À démontrer : « √${p} est irrationnel ».`),
    steps:[
      {q:'Supposition de départ :',o:[pfOK(`Supposons √${p} = a/b, avec a, b entiers, b ≠ 0 et a/b irréductible`),
        pfW(`Supposons √${p} = a/b, avec a, b entiers quelconques (b ≠ 0)`,'Il faut la forme irréductible : c’est elle qui sera contredite à la fin.','pr-absurde'),
        pfW(`Supposons que √${p} est irrationnel`,'C’est ce qu’on veut démontrer : par l’absurde, on suppose le contraire.','pr-absurde')]},
      {q:'On élève au carré :',o:[pfOK(`${p} = a²/b², donc a² = ${p}b²`),pfW(`${p} = a²/b², donc a = ${p}b²`,'On a a², pas a.','calc'),pfW(`${p} = a²/b, donc a² = ${p}b`,'(a/b)² = a²/b².','calc')]},
      {q:'Que dire de a ?',o:[pfOK(`a² est ${M}, donc a est ${M} (par contraposée : si a ne l’est pas, a² ne l’est pas)`),
        pfW(`a² est ${M}, donc a est ${M}, car si a est ${M}, a² l’est aussi`,'Cette justification est la réciproque : elle ne permet pas de conclure. Il faut la contraposée.','pr-reciproque'),
        pfW(`a² est ${M}, mais on ne peut rien dire de a`,`Si : on a démontré (contraposée) que si a² est ${M}, alors a l’est aussi.`,'pr-justif')]},
      {q:'Et b ?',o:[pfOK(`a = ${p}k, donc ${p*p}k² = ${p}b², soit b² = ${p}k² : b est aussi ${M}`),pfW(`a = ${p}k, donc ${p*p}k² = ${p}b², soit b = ${p}k²`,`On obtient b², pas b.`,'calc'),pfW(`a = ${p}k, donc b = k`,`${p*p}k² = ${p}b² donne b² = ${p}k², pas b = k.`,'calc')]},
      {q:'Conclusion :',o:[pfOK(`a et b sont tous deux ${Ms} : a/b n’est pas irréductible. Contradiction : √${p} est irrationnel`),
        pfW(`Contradiction, car √${p} n’est pas un nombre entier`,'Ce n’est pas la contradiction : un rationnel n’a pas besoin d’être entier.','pr-absurde'),
        pfW(`Donc √${p} = a/b avec a et b ${Ms} : √${p} est rationnel`,'On a trouvé une impossibilité : il faut conclure que la supposition est fausse.','pr-absurde')]}],
    explain:`Supposons √${p} = a/b irréductible. Alors a² = ${p}b², donc a est ${M} (contraposée), a = ${p}k, puis b² = ${p}k², donc b est ${M}. a et b ont le facteur commun ${p} : contradiction avec « irréductible ». Donc √${p} est irrationnel.`})};
const gPfAbR2=()=>{const P=[2,3,5,7,11],k=R(2,5),L=P.slice(0,k),N=L.reduce((a,b)=>a*b,1)+1;
  return chain({instr:'Reconstitue la preuve d’Euclide.',prompt:stx(`À démontrer : « il existe une infinité de nombres premiers ». (Pour t’aider : avec la liste ${L.join(', ')}, on obtiendrait ${L.join(' × ')} + 1 = ${pfM(N)}.)`),
    steps:[
      {q:'Supposition de départ :',o:[pfOK('Supposons qu’il n’y a qu’un nombre fini de nombres premiers : p₁, p₂, …, pₖ'),pfW('Supposons qu’il y a une infinité de nombres premiers','C’est ce qu’on veut prouver : on suppose le contraire.','pr-absurde'),pfW('Supposons que les seuls nombres premiers sont 2, 3, 5 et 7','C’est un cas particulier : il faut supposer une liste finie quelconque.','pr-exemple')]},
      {q:'Quel nombre construire ?',o:[pfOK('N = p₁ × p₂ × … × pₖ + 1'),pfW('N = p₁ × p₂ × … × pₖ','Ce N est divisible par tous les pᵢ : aucune contradiction en vue.'),pfW('N = p₁ + p₂ + … + pₖ','Rien ne permet de contrôler les diviseurs d’une somme.')]},
      {q:'Que sait-on de N ?',o:[pfOK('N ≥ 2 a un diviseur premier p, qui est l’un des pᵢ ; p divise le produit et N, donc il divise 1'),
        pfW('N est premier, et il n’est pas dans la liste','N n’est pas toujours premier : 2 × 3 × 5 × 7 × 11 × 13 + 1 = 30 031 = 59 × 509.','pr-justif'),
        pfW('N n’est divisible par aucun nombre','Tout entier N ≥ 2 a au moins un diviseur premier.','pr-justif')]},
      {q:'Conclusion :',o:[pfOK('Aucun nombre premier ne divise 1 : contradiction. Il y a donc une infinité de nombres premiers'),pfW('Contradiction : la liste contenait un nombre premier de trop','La contradiction porte sur l’hypothèse « la liste est finie et complète ».','pr-absurde'),pfW('Donc N est le plus grand nombre premier','Il n’y a pas de plus grand nombre premier : c’est justement la conclusion.','pr-absurde')]}],
    explain:'Si p₁, …, pₖ étaient tous les nombres premiers, N = p₁ × … × pₖ + 1 aurait un diviseur premier p dans la liste ; p diviserait N et le produit, donc leur différence 1 : impossible. Il y a donc une infinité de nombres premiers (Euclide, Éléments, livre IX).'})};
const PF_ABR3=[
  {s:'Il n’existe pas de plus petit réel strictement positif.',sup:'Supposons qu’il existe un plus petit réel strictement positif, ε',supW:[['Supposons que tout réel strictement positif en a un plus petit','C’est l’énoncé lui-même : on suppose son contraire.'],['Supposons que 0 est le plus petit réel strictement positif','0 n’est pas strictement positif.']],
    c:'Considérons ε/2',cW:[['Considérons ε − 1','ε − 1 peut être négatif (ε = 0,5 donne −0,5).'],['Considérons 2ε','2ε est plus grand que ε : aucune contradiction.']],
    v:'ε/2 &gt; 0 et ε/2 &lt; ε : un réel strictement positif plus petit que ε',vW:[['ε/2 &gt; ε','Pour ε &gt; 0, ε/2 &lt; ε.'],['ε/2 = ε','Seul 0 vérifie x/2 = x.']],
    f:'Contradiction avec le choix de ε : il n’existe pas de plus petit réel strictement positif'},
  {s:'Pour tout rationnel r, r + √2 est irrationnel.',sup:'Supposons qu’il existe un rationnel r tel que r + √2 soit rationnel',supW:[['Supposons r irrationnel et r + √2 rationnel','On garde l’hypothèse (r rationnel) et on nie seulement la conclusion.'],['Supposons que r + √2 est irrationnel','C’est la conclusion : par l’absurde, on la nie.']],
    c:'Alors √2 = (r + √2) − r',cW:[['Alors √2 = r × (r + √2)','Ce n’est pas une égalité vraie.'],['Alors r = √2','Rien ne l’impose.']],
    v:'Une différence de deux rationnels est rationnelle : √2 serait rationnel',vW:[['√2 serait irrationnel : pas de contradiction','(r + √2) − r est une différence de deux rationnels : elle est rationnelle.'],['√2 serait un entier','Une différence de rationnels est rationnelle, pas forcément entière.']],
    f:'Contradiction, car √2 est irrationnel : donc r + √2 est irrationnel'},
  {s:'Il n’existe pas de plus grand entier naturel.',sup:'Supposons qu’il existe un plus grand entier naturel N',supW:[['Supposons que tout entier naturel est plus petit qu’un autre','C’est l’énoncé lui-même : on suppose son contraire.'],['Supposons que 1 000 000 est le plus grand entier naturel','C’est un cas particulier : il faut un N quelconque.']],
    c:'Considérons N + 1',cW:[['Considérons N − 1','N − 1 est plus petit que N : aucune contradiction.'],['Considérons N/2','N/2 n’est pas forcément entier, et il est plus petit que N.']],
    v:'N + 1 est un entier naturel et N + 1 &gt; N',vW:[['N + 1 = N','N + 1 − N = 1 ≠ 0.'],['N + 1 n’est pas un entier','La somme de deux entiers naturels est un entier naturel.']],
    f:'Contradiction avec le choix de N : il n’existe pas de plus grand entier naturel'}];
const gPfAbR3=()=>{const T=pick(PF_ABR3);
  return chain({instr:'Raisonne par l’absurde, étape par étape.',prompt:stx(`À démontrer : « ${T.s} »`),
    steps:[
      {q:'Supposition de départ :',o:[pfOK(T.sup),...T.supW.map(([h,w])=>pfW(h,w,'pr-absurde'))]},
      {q:'Quel objet considérer ?',o:[pfOK(T.c),...T.cW.map(([h,w])=>pfW(h,w))]},
      {q:'Que constate-t-on ?',o:[pfOK(T.v),...T.vW.map(([h,w])=>pfW(h,w,'calc'))]},
      {q:'Conclusion :',o:[pfOK(T.f),pfW('Pas de contradiction : on ne peut rien conclure','La constatation précédente contredit la supposition de départ.','pr-absurde'),pfW('La supposition est vraie, puisqu’on a construit un objet','L’objet construit contredit la supposition : elle est fausse.','pr-absurde')]}],
    explain:`On suppose le contraire : ${T.sup.charAt(0).toLowerCase()+T.sup.slice(1)}. ${T.c} : ${T.v}. ${T.f}.`})};
const PF_METH=['Preuve directe','Disjonction de cas','Contraposée','Raisonnement par l’absurde'];
const PF_METHB=[
  ['On suppose n impair, on écrit n = 2k + 1 et on montre que n² est impair, pour en déduire que si n² est pair, alors n est pair.',2],
  ['On suppose √2 = p/q irréductible et on montre que p et q sont pairs.',3],
  ['On écrit n = 2k et on calcule n² = 2(2k²) pour montrer que le carré d’un pair est pair.',0],
  ['On traite séparément n pair et n impair pour montrer que n(n + 1) est pair.',1],
  ['On suppose qu’il existe un plus grand entier N et on remarque que N + 1 est plus grand.',3],
  ['On suppose a = b et on montre que a + b est pair, pour en déduire que si a + b est impair, alors a ≠ b.',2],
  ['Pour montrer |x| ≥ x, on traite x ≥ 0 puis x &lt; 0.',1],
  ['Soit a et b impairs ; a = 2k + 1, b = 2m + 1, donc a + b = 2(k + m + 1) est pair.',0]];
const gPfMeth=()=>{const[s,k]=pick(PF_METHB);
  return mcq('Quelle méthode est utilisée ?',stx(s),PF_METH.map((h,i)=>({h,ok:i===k,tag:i===2||k===2?'pr-contrapose':'raisonnement'})),
    `Méthode : ${PF_METH[k].toLowerCase()}. Directe : de l’hypothèse à la conclusion. Cas : on découpe en situations qui couvrent tout. Contraposée : on suppose non Q et on montre non P. Absurde : on suppose le contraire et on cherche une contradiction.`,
    'Regarde ce qu’on suppose au départ et ce qu’on cherche à obtenir.')};
const gPfIrr=()=>{const p=pick([2,3,5]),r=pick([1,2,3,4,5,7]),k=pick([2,3]),m=R(2,9);
  return mcq('Lequel de ces nombres est forcément irrationnel ?','',[{h:`${r} + √${p}`,ok:true},{h:`√${p} × √${p*k*k}`},{h:`√${p} − √${p}`},{h:`(√${p})²`},{h:`√${m*m}`}].slice(0,4).concat([]),
    `${r} + √${p} est irrationnel : si ${r} + √${p} = s était rationnel, √${p} = s − ${r} le serait aussi (absurde). En revanche √${p} × √${p*k*k} = √${p*p*k*k} = ${p*k}, √${p} − √${p} = 0 et (√${p})² = ${p} sont rationnels.`,
    'Un produit ou une différence d’irrationnels peut être rationnel ; un rationnel plus un irrationnel, jamais.')};

/* ===================== Chapitre 9 : récurrence ===================== */
const gPfRcTerm=()=>{const u0=R(0,4),q=pick([2,3,-1,2]),r=R(-3,5),k=R(3,5),u=[u0];for(let i=0;i<k;i++)u.push(q*u[i]+r);
  const f=`u<sub>n+1</sub> = ${q===-1?'−':q}u<sub>n</sub>${r?(r<0?' − ':' + ')+Math.abs(r):''}`;
  return nq({instr:'Calcule le terme demandé.',prompt:stx(`La suite (u<sub>n</sub>) est définie par u<sub>0</sub> = ${u0} et ${f}. Pour tester une conjecture, calcule u<sub>${k}</sub>.`),labels:[`u${['₀','₁','₂','₃','₄','₅'][k]} =`],t:[u[k]],
    explain:`On calcule de proche en proche : ${u.map((v,i)=>`u<sub>${i}</sub> = ${pfM(v)}`).join(', ')}. C’est la même idée que la récurrence : chaque terme se déduit du précédent.`,
    hint:'Applique la règle une étape à la fois : u₁, puis u₂, etc.',diag:([v])=>v===u[k-1]||v===u[k+1]?'suite-indice':null})};
const gPfRcSum=()=>{const t=R(0,3);let n,s,v,ex;
  if(t===0){n=R(5,30);s=`1 + 2 + 3 + … + ${n}`;v=n*(n+1)/2;ex=`Formule : n(n + 1)/2 = ${n} × ${n+1}/2 = ${v}.`}
  else if(t===1){n=R(4,20);s=`1 + 3 + 5 + … + ${2*n-1}`;v=n*n;ex=`Il y a ${n} nombres impairs (le dernier est 2 × ${n} − 1). Formule : n² = ${v}.`}
  else if(t===2){n=R(3,9);s=`1 + 2 + 4 + … + 2<sup>${n}</sup>`;v=2**(n+1)-1;ex=`Formule : 2<sup>n+1</sup> − 1 = 2<sup>${n+1}</sup> − 1 = ${v}.`}
  else{n=R(3,10);s=`1² + 2² + … + ${n}²`;v=n*(n+1)*(2*n+1)/6;ex=`Formule : n(n + 1)(2n + 1)/6 = ${n} × ${n+1} × ${2*n+1}/6 = ${v}.`}
  return nq({instr:'Calcule la somme.',prompt:stx(`Calcule S = ${s}. (Une formule démontrée par récurrence permet d’aller vite.)`),labels:['S ='],t:[v],explain:ex+' Ces formules se démontrent par récurrence.',
    hint:'1 + … + n = n(n + 1)/2 ; 1 + 3 + … + (2n − 1) = n² ; 1 + 2 + … + 2ⁿ = 2ⁿ⁺¹ − 1 ; 1² + … + n² = n(n + 1)(2n + 1)/6.',
    diag:([x])=>t===1&&(x===(n+1)**2||x===(n-1)**2)||t===0&&x===n*(n-1)/2?'suite-indice':null})};
const PF_RCP=[
  ['Comment s’appelle l’étape qui vérifie P(n₀) ?','L’initialisation',['L’hérédité','La conclusion','L’hypothèse de récurrence']],
  ['Que suppose-t-on au début de l’hérédité ?','Que P(n) est vraie pour un entier n ≥ n₀ fixé',['Que P(n) est vraie pour tout entier n ≥ n₀','Que P(n + 1) est vraie','Que P(n₀) est fausse']],
  ['Que doit-on démontrer dans l’hérédité ?','Que P(n + 1) est vraie',['Que P(n) est vraie pour tout n','Que P(n₀) est vraie','Que P(n − 1) est vraie']],
  ['Pour démontrer une propriété pour tout entier n ≥ 3, où initialise-t-on ?','En n = 3',['En n = 0','En n = 1','En n = 4']],
  ['Dans l’image des dominos, à quoi correspond l’hérédité ?','Chaque domino qui tombe fait tomber le suivant',['Le premier domino tombe','Tous les dominos tombent en même temps','On compte les dominos tombés']],
  ['Dans l’image des dominos, à quoi correspond l’initialisation ?','Le premier domino tombe',['Chaque domino fait tomber le suivant','Le dernier domino tombe','Tous les dominos sont alignés']],
  ['Quelle étape manque si l’on a seulement prouvé P(n) ⇒ P(n + 1) pour tout n ?','L’initialisation',['L’hérédité','La conclusion','Aucune : c’est suffisant']]];
const gPfRcPart=()=>{const[s,ok,w]=pick(PF_RCP);
  return mcq('Récurrence : choisis la bonne réponse.',stx(s),[{h:ok,ok:true},...w.map(h=>({h,tag:'pr-heredite'}))],
    `Réponse : ${ok}. Une récurrence = initialisation (P(n₀) vraie) + hérédité (pour un n fixé, P(n) ⇒ P(n + 1)), puis conclusion : P(n) vraie pour tout n ≥ n₀.`,'Pense aux dominos : le premier tombe, et chacun fait tomber le suivant.')};
const PF_SUMS=[
  {P:'1 + 2 + … + n = n(n + 1)/2',n0:1,ini:'1 = 1 × 2/2',H:'n(n + 1)/2',nx:'(n + 1)',nxW:'n',Hn1:'(n + 1)(n + 2)/2',res:'(n + 1)(n + 2)/2',resW:['n(n + 2)/2','(n + 1)²/2']},
  {P:'1 + 3 + … + (2n − 1) = n²',n0:1,ini:'1 = 1²',H:'n²',nx:'(2n + 1)',nxW:'(2n − 1)',Hn1:'(n + 1)²',res:'(n + 1)²',resW:['n² + 1','(n + 1)² + 1']},
  {P:'1 + 2 + 4 + … + 2<sup>n</sup> = 2<sup>n+1</sup> − 1',n0:0,ini:'2⁰ = 1 = 2¹ − 1',H:'(2<sup>n+1</sup> − 1)',nx:'2<sup>n+1</sup>',nxW:'2<sup>n</sup>',Hn1:'(2<sup>n+2</sup> − 1)',res:'2 × 2<sup>n+1</sup> − 1 = 2<sup>n+2</sup> − 1',resW:['2<sup>2n+2</sup> − 1','4<sup>n+1</sup> − 1']},
  {P:'2 + 4 + … + 2n = n(n + 1)',n0:1,ini:'2 = 1 × 2',H:'n(n + 1)',nx:'(2n + 2)',nxW:'2n',Hn1:'(n + 1)(n + 2)',res:'(n + 1)(n + 2)',resW:['n(n + 3)','(n + 1)² + 1']}];
const gPfRcR1=()=>{const T=pick(PF_SUMS);
  return chain({instr:'Démontre la formule par récurrence.',prompt:stx(`À démontrer : pour tout entier n ≥ ${T.n0}, P(n) : « ${T.P} ».`),
    steps:[
      {q:'Initialisation :',o:[pfOK(`Pour n = ${T.n0} : ${T.ini}, donc P(${T.n0}) est vraie`),pfW('Inutile : l’hérédité suffit','Sans initialisation, l’hérédité ne prouve rien.','pr-init'),pfW(`On vérifie n = ${T.n0}, ${T.n0+1} et ${T.n0+2} : cela suffit à conclure`,'Quelques vérifications ne couvrent pas tous les n : il faut l’hérédité.','pr-exemple')]},
      {q:'Hérédité : on suppose…',o:[pfOK(`que P(n) est vraie pour un entier n ≥ ${T.n0} fixé`),pfW(`que P(n) est vraie pour tout entier n ≥ ${T.n0}`,'C’est ce qu’on veut démontrer : on ne peut pas le supposer.','pr-heredite'),pfW('que P(n + 1) est vraie','C’est ce qu’on doit démontrer.','pr-heredite')]},
      {q:'Au rang n + 1, la somme vaut…',o:[pfOK(`${T.H} + ${T.nx}`),pfW(`${T.H} + ${T.nxW}`,'Le terme ajouté est le terme général au rang n + 1 : remplace n par n + 1.','suite-indice'),pfW(`${T.Hn1} + ${T.nx}`,'On utilise l’hypothèse au rang n, pas la formule au rang n + 1, qu’on veut démontrer.','pr-heredite')]},
      {q:'On simplifie :',o:[pfOK(`= ${T.res}, c’est-à-dire la formule au rang n + 1`),...T.resW.map(h=>pfW(`= ${h}`,'Développe et factorise soigneusement.','calc'))]},
      {q:'Conclusion :',o:[pfOK(`P(n + 1) est vraie ; par récurrence, P(n) est vraie pour tout n ≥ ${T.n0}`),pfW('P(n + 1) est vraie, donc la formule est vraie pour n et n + 1 seulement','L’hérédité, valable pour tout n, combinée à l’initialisation, couvre tous les entiers.','pr-heredite'),pfW('On a seulement vérifié la formule : il faut encore la démontrer','Initialisation + hérédité constituent la démonstration.','pr-heredite')]}],
    explain:`Initialisation : ${T.ini}. Hérédité : si P(n) est vraie, la somme au rang n + 1 vaut ${T.H} + ${T.nx} = ${T.res}, ce qui est P(n + 1). Par récurrence, P(n) est vraie pour tout n ≥ ${T.n0}.`})};
const gPfRcR2=()=>{const a=pick([3,4,5,7,9,11]),d=a-1;
  return chain({instr:'Démontre la divisibilité par récurrence.',prompt:stx(`À démontrer : pour tout entier n ≥ 0, ${a}<sup>n</sup> − 1 est divisible par ${d}.`),
    steps:[
      {q:'Initialisation :',o:[pfOK(`n = 0 : ${a}⁰ − 1 = 0 = ${d} × 0, divisible par ${d}`),pfW(`n = 0 : ${a}⁰ − 1 = ${a-1}, divisible par ${d}`,`${a}⁰ = 1, pas ${a} (même si la conclusion est juste, le calcul est faux).`,'calc'),pfW('Pas besoin : l’hérédité suffit','Sans initialisation, l’hérédité ne prouve rien.','pr-init')]},
      {q:'Hypothèse de récurrence :',o:[pfOK(`Pour un n ≥ 0 fixé, il existe un entier k tel que ${a}<sup>n</sup> − 1 = ${d}k`),pfW(`Pour tout n ≥ 0, ${a}<sup>n</sup> − 1 = ${d}k`,'On suppose la propriété pour un n fixé, pas pour tous.','pr-heredite'),pfW(`Il existe k tel que ${a}<sup>n+1</sup> − 1 = ${d}k`,'C’est ce qu’on doit démontrer.','pr-heredite')]},
      {q:'Calcul au rang n + 1 :',o:[pfOK(`${a}<sup>n+1</sup> − 1 = ${a} × ${a}<sup>n</sup> − 1 = ${a}(${d}k + 1) − 1 = ${a*d}k + ${d}`),
        pfW(`${a}<sup>n+1</sup> − 1 = ${a}<sup>n</sup> − 1 + ${a} = ${d}k + ${a}`,`${a}<sup>n+1</sup> = ${a} × ${a}<sup>n</sup>, pas ${a}<sup>n</sup> + ${a}.`,'calc'),
        pfW(`${a}<sup>n+1</sup> − 1 = ${a}(${a}<sup>n</sup> − 1) = ${a*d}k`,`${a}(${a}<sup>n</sup> − 1) = ${a}<sup>n+1</sup> − ${a}, pas ${a}<sup>n+1</sup> − 1 : il manque ${d}.`,'calc')]},
      {q:'Conclusion :',o:[pfOK(`= ${d}(${a}k + 1), divisible par ${d} ; par récurrence, c’est vrai pour tout n ≥ 0`),pfW(`= ${d}(${a}k + 1), divisible par ${d}, mais seulement pour n = 0 et n = 1`,'L’hérédité marche pour tout n : avec l’initialisation, tous les n sont couverts.','pr-heredite'),pfW(`${a*d}k + ${d} n’est pas forcément divisible par ${d}`,`${a*d}k + ${d} = ${d}(${a}k + 1).`,'calc')]}],
    explain:`Initialisation : ${a}⁰ − 1 = 0. Hérédité : si ${a}<sup>n</sup> − 1 = ${d}k, alors ${a}<sup>n+1</sup> − 1 = ${a}(${d}k + 1) − 1 = ${d}(${a}k + 1). Par récurrence, ${a}<sup>n</sup> − 1 est divisible par ${d} pour tout n ≥ 0.`})};
const PF_RCI=[
  {P:'2<sup>n</sup> ≥ n + 1',n0:0,ini:'2⁰ = 1 ≥ 0 + 1',iniW:'2⁰ = 2 ≥ 1',st:'2<sup>n+1</sup> = 2 × 2<sup>n</sup> ≥ 2(n + 1), car on multiplie par 2 &gt; 0',stW:['2<sup>n+1</sup> = 2 × 2<sup>n</sup> ≤ 2(n + 1), car on multiplie par 2','2<sup>n+1</sup> = 2<sup>n</sup> + 2 ≥ n + 3'],fin:'2(n + 1) = 2n + 2 ≥ n + 2 car n ≥ 0 : donc 2<sup>n+1</sup> ≥ (n + 1) + 1',finW:['2n + 2 = n + 2 : donc 2<sup>n+1</sup> ≥ n + 2','2n + 2 ≤ n + 2 : on ne peut pas conclure']},
  {P:'3<sup>n</sup> ≥ 2n + 1',n0:0,ini:'3⁰ = 1 ≥ 2 × 0 + 1',iniW:'3⁰ = 3 ≥ 1',st:'3<sup>n+1</sup> = 3 × 3<sup>n</sup> ≥ 3(2n + 1), car on multiplie par 3 &gt; 0',stW:['3<sup>n+1</sup> = 3 × 3<sup>n</sup> ≤ 3(2n + 1), car on multiplie par 3','3<sup>n+1</sup> = 3<sup>n</sup> + 3 ≥ 2n + 4'],fin:'3(2n + 1) = 6n + 3 ≥ 2n + 3 car 4n ≥ 0 : donc 3<sup>n+1</sup> ≥ 2(n + 1) + 1',finW:['6n + 3 = 2n + 3 : donc 3<sup>n+1</sup> ≥ 2n + 3','6n + 3 ≤ 2n + 3 : on ne peut pas conclure']},
  {P:'(1 + x)<sup>n</sup> ≥ 1 + nx, pour un réel x &gt; −1 fixé',n0:0,ini:'(1 + x)⁰ = 1 ≥ 1 + 0 × x',iniW:'(1 + x)⁰ = 1 + x ≥ 1',st:'(1 + x)<sup>n+1</sup> = (1 + x)<sup>n</sup>(1 + x) ≥ (1 + nx)(1 + x), car 1 + x &gt; 0 (puisque x &gt; −1)',stW:['(1 + x)<sup>n+1</sup> ≥ (1 + nx)(1 + x), car on peut toujours multiplier une inégalité par 1 + x','(1 + x)<sup>n+1</sup> = (1 + x)<sup>n</sup> + x ≥ 1 + (n + 1)x'],fin:'(1 + nx)(1 + x) = 1 + (n + 1)x + nx² ≥ 1 + (n + 1)x, car nx² ≥ 0',finW:['(1 + nx)(1 + x) = 1 + (n + 1)x, donc égalité','(1 + nx)(1 + x) = 1 + nx² : on ne peut pas conclure']},
  {P:'n! ≥ 2<sup>n−1</sup>',n0:1,ini:'1! = 1 ≥ 2⁰ = 1',iniW:'1! = 1 ≥ 2¹ = 2',st:'(n + 1)! = (n + 1) × n! ≥ (n + 1) × 2<sup>n−1</sup>, car on multiplie par n + 1 &gt; 0',stW:['(n + 1)! = (n + 1) × n! ≤ (n + 1) × 2<sup>n−1</sup>, car on multiplie par n + 1','(n + 1)! = n! + 1 ≥ 2<sup>n−1</sup> + 1'],fin:'(n + 1) × 2<sup>n−1</sup> ≥ 2 × 2<sup>n−1</sup> = 2<sup>n</sup>, car n + 1 ≥ 2',finW:['(n + 1) × 2<sup>n−1</sup> = 2<sup>n</sup> pour tout n','(n + 1) × 2<sup>n−1</sup> ≤ 2<sup>n</sup> : on ne peut pas conclure']}];
const gPfRcR3=()=>{const T=pick(PF_RCI);
  return chain({instr:'Démontre l’inégalité par récurrence.',prompt:stx(`À démontrer : pour tout entier n ≥ ${T.n0}, ${T.P}.`),
    steps:[
      {q:'Initialisation :',o:[pfOK(`n = ${T.n0} : ${T.ini}`),pfW(`n = ${T.n0} : ${T.iniW}`,'Revois le calcul : une puissance d’exposant 0 vaut 1, et 1! = 1.','calc'),pfW('Inutile : l’hérédité suffit','Sans initialisation, l’hérédité ne prouve rien.','pr-init')]},
      {q:'Hérédité (on suppose la propriété au rang n, pour un n fixé) — étape clé :',o:[pfOK(T.st),pfW(T.stW[0],T.n0===0&&T.P.includes('x')?'On ne multiplie une inégalité par 1 + x sans changer le sens que si 1 + x &gt; 0 : c’est l’hypothèse x &gt; −1 qui le garantit.':'On multiplie par un nombre positif : le sens est conservé.',T.P.includes('x')?'pr-justif':'ineq-flip'),pfW(T.stW[1],'Erreur sur les puissances : on multiplie par la base, on n’ajoute pas.','calc')]},
      {q:'Il reste à comparer :',o:[pfOK(T.fin),...T.finW.map(h=>pfW(h,'Compare soigneusement les deux expressions.','calc'))]},
      {q:'Conclusion :',o:[pfOK(`La propriété est vraie au rang n + 1 ; par récurrence, elle est vraie pour tout n ≥ ${T.n0}`),pfW('La propriété est vraie au rang n + 1 seulement','L’hérédité vaut pour tout n : avec l’initialisation, elle couvre tous les rangs.','pr-heredite'),pfW('On a supposé ce qu’on voulait démontrer : la preuve ne vaut rien','On a supposé P(n) pour un n fixé, ce qui est permis : c’est l’hypothèse de récurrence.','pr-heredite')]}],
    explain:`Initialisation : ${T.ini}. Hérédité : ${T.st} ; puis ${T.fin}. Par récurrence, ${T.P} pour tout n ≥ ${T.n0}.`})};
const PF_TRAP=[
  {P:'P(n) : « 1 + 2 + … + n = (n² + n + 1)/2 », pour n ≥ 1.',her:'Si 1 + … + n = (n² + n + 1)/2, alors 1 + … + (n + 1) = (n² + n + 1)/2 + (n + 1) = (n² + 3n + 3)/2, et ((n + 1)² + (n + 1) + 1)/2 = (n² + 3n + 3)/2.',
    ini:'Pour n = 1 : 1 ≠ 3/2, donc P(1) est fausse',iniW:'Pour n = 1 : 1 = 3/2 à un arrondi près, donc P(1) est vraie',fin:'Rien n’est démontré : sans initialisation vraie, l’hérédité ne transmet rien (P(n) est en fait toujours fausse)',finW:['P(n) est vraie pour tout n ≥ 1, car l’hérédité est juste','P(n) est vraie à partir de n = 2']},
  {P:'P(n) : « n² + n est impair », pour n ≥ 0.',her:'Si n² + n est impair, alors (n + 1)² + (n + 1) = (n² + n) + 2(n + 1), somme d’un impair et d’un pair : impair.',
    ini:'Pour n = 0 : 0² + 0 = 0 est pair, donc P(0) est fausse',iniW:'Pour n = 0 : 0² + 0 = 1 est impair, donc P(0) est vraie',fin:'Rien n’est démontré : sans initialisation vraie, l’hérédité ne transmet rien (n² + n = n(n + 1) est en fait toujours pair)',finW:['P(n) est vraie pour tout n ≥ 0, car l’hérédité est juste','P(n) est vraie à partir de n = 1']}];
const gPfRcTrap=()=>{if(Math.random()<.35)return chain({instr:'Trouve l’erreur de cette fausse récurrence.',prompt:stx('« Tous les chevaux ont la même couleur. » P(n) : « dans tout groupe de n chevaux, tous ont la même couleur ». Initialisation : un cheval seul a une seule couleur. Hérédité : dans un groupe de n + 1 chevaux, les n premiers ont la même couleur, les n derniers aussi ; les deux groupes ont des chevaux en commun, donc tous ont la même couleur.'),
    steps:[
      {q:'L’initialisation (n = 1) est-elle correcte ?',o:[pfOK('Oui : dans un groupe d’un seul cheval, tous ont la même couleur'),pfW('Non : il faut au moins deux chevaux pour parler de couleur commune','Pour n = 1, la phrase est vraie (trivialement).'),pfW('Non : il faut initialiser à n = 0','On peut initialiser à n = 1 si on vise n ≥ 1.')]},
      {q:'Où l’hérédité échoue-t-elle ?',o:[pfOK('Au passage de 1 à 2 chevaux : les deux groupes d’un cheval n’ont aucun cheval en commun'),pfW('Pour les grandes valeurs de n, quand les groupes deviennent trop gros','Pour n ≥ 2, les deux groupes se chevauchent : l’argument marche.','pr-heredite'),pfW('Nulle part : l’hérédité est valable pour tout n','Pour n = 1, il n’y a pas de cheval commun aux deux groupes.','pr-heredite')]},
      {q:'Conclusion :',o:[pfOK('L’hérédité n’est pas valable pour tout n ≥ 1 : la « preuve » est fausse'),pfW('La preuve est juste, mais la propriété est fausse','Une preuve juste ne peut pas démontrer une affirmation fausse.','pr-heredite'),pfW('Il manque l’initialisation','L’initialisation est faite, et juste.','pr-init')]}],
    explain:'L’hérédité doit marcher pour TOUS les n ≥ 1. De 1 à 2 chevaux, les « n premiers » et les « n derniers » sont deux chevaux distincts sans cheval commun : la chaîne de dominos casse dès le premier passage. (Paradoxe attribué à George Pólya.)'});
  const T=pick(PF_TRAP);
  return chain({instr:'Examine cette « récurrence ».',prompt:stx(`${T.P} Un élève écrit l’hérédité suivante : ${T.her}`),
    steps:[
      {q:'L’hérédité est-elle correcte ?',o:[pfOK('Oui, le calcul de l’hérédité est juste'),pfW('Non, le calcul est faux','Refais le calcul : il est juste.','calc'),pfW('On ne peut pas le savoir sans tester des valeurs','On vérifie une hérédité par le calcul littéral, pas par des valeurs.','pr-exemple')]},
      {q:'Et l’initialisation ?',o:[pfOK(T.ini),pfW(T.iniW,'Refais le calcul exact.','calc'),pfW('Inutile, puisque l’hérédité est juste','Sans initialisation, l’hérédité ne prouve rien.','pr-init')]},
      {q:'Conclusion :',o:[pfOK(T.fin),...T.finW.map(h=>pfW(h,'L’hérédité ne fait que transmettre : si aucun rang n’est vrai au départ, rien ne se transmet.','pr-init'))]}],
    explain:`L’hérédité est juste, mais l’initialisation est fausse : ${T.ini}. Une récurrence a besoin des deux. C’est comme une rangée de dominos où chacun ferait tomber le suivant… mais où personne ne pousse le premier.`})};
const PF_RCVF=[
  ['Si P(0) est vraie et si P(n) ⇒ P(n + 1) pour tout n ≥ 0, alors P(n) est vraie pour tout n ≥ 0.',true,'C’est le principe de récurrence.'],
  ['Vérifier P(0), P(1), …, P(100) suffit à prouver P(n) pour tout n.',false,'Cela ne dit rien de P(101) : il faut l’hérédité.'],
  ['L’hérédité seule suffit à prouver P(n) pour tout n.',false,'« n = n + 1 » est héréditaire mais jamais vraie : il faut aussi l’initialisation.'],
  ['Pour prouver une propriété pour tout n ≥ 5, on peut initialiser à n = 5.',true,'L’initialisation se fait au premier rang visé.'],
  ['Dans l’hérédité, on suppose que P(n) est vraie pour tout n.',false,'On la suppose pour un n fixé : sinon, on supposerait ce qu’on veut prouver.'],
  ['L’hérédité doit être valable pour tous les n ≥ n₀, y compris le premier passage de n₀ à n₀ + 1.',true,'C’est là que casse le paradoxe « tous les chevaux ont la même couleur ».'],
  ['On peut démontrer par récurrence que 1 + 2 + … + n = n(n + 1)/2 pour tout n ≥ 1.',true,'Initialisation : 1 = 1. Hérédité : n(n + 1)/2 + (n + 1) = (n + 1)(n + 2)/2.']];
const gPfRcVF=()=>pfVF(PF_RCVF,'pr-heredite','Récurrence = initialisation + hérédité (pour un n fixé).');

/* ===================== Chapitre 10 : existence, unicité, analyse-synthèse ===================== */
const PF_EUV=[
  ['Que signifie « ∃! x ∈ ℝ, P(x) » ?','Il existe un et un seul réel x tel que P(x)',['Il existe au moins un réel x tel que P(x)','Pour tout réel x, P(x) est vraie','Il n’existe aucun réel x tel que P(x)']],
  ['Pour prouver l’unicité d’une solution, on…','suppose que x et y sont deux solutions et on montre que x = y',['trouve une solution et on vérifie qu’elle convient','vérifie plusieurs valeurs qui ne sont pas solutions','suppose qu’il n’y a pas de solution']],
  ['Pour prouver l’existence d’une solution, on…','exhibe (ou construit) une solution et on vérifie qu’elle convient',['suppose deux solutions et on montre qu’elles sont égales','montre qu’il n’y en a pas deux différentes','suppose qu’une solution existe et on en déduit sa forme']],
  ['Dans une analyse-synthèse, que fournit l’analyse ?','La forme que doit avoir toute solution (des candidats)',['La preuve que les candidats sont des solutions','Une solution particulière trouvée par essais','La preuve qu’il existe au moins une solution']],
  ['Dans une analyse-synthèse, que fournit la synthèse ?','La vérification que les candidats sont bien des solutions',['La forme que doit avoir toute solution','La preuve que la solution est unique','Une liste de valeurs testées']],
  ['L’analyse aboutit à un seul candidat, et la synthèse le valide. Que peut-on dire ?','Il existe une unique solution',['Il existe au moins deux solutions','Il n’y a peut-être pas de solution','La solution existe mais n’est peut-être pas unique']]];
const gPfEuVoc=()=>{const[s,ok,w]=pick(PF_EUV);
  return mcq('Existence et unicité : choisis la bonne réponse.',stx(s),[{h:ok,ok:true},...w.map(h=>({h,tag:'pr-unicite'}))],
    `Réponse : ${ok}. Existence : au moins un objet convient (on le montre). Unicité : deux objets qui conviennent sont égaux. Analyse : conditions nécessaires (candidats, unicité). Synthèse : vérification (existence).`,
    'Existence et unicité sont deux preuves séparées.')};
const pfLin=(a,b)=>`${a===1?'':a===-1?'−':pfM(a)}x${b?(b<0?' − ':' + ')+Math.abs(b):''}`;
const pfFr=(p,q)=>{if(q<0){p=-p;q=-q}const g=gcd(p,q);p/=g;q/=g;return q===1?pfM(p):(p<0?'−':'')+Math.abs(p)+'/'+q};
const gPfEuLin=()=>{const a=nz(-9,9),b=R(-12,12),c=R(-12,12);
  const g=gcd(c-b,a),sg=a<0?-1:1,q=nq({instr:'Trouve l’unique solution (valeur exacte).',prompt:stx(`L’équation ${pfLin(a,b)} = ${pfM(c)} a une unique solution réelle, car ${pfM(a)} ≠ 0. Laquelle ?`),labels:['x ='],t:[(c-b)/a],tol:1e-6,
    explain:`Existence : x₀ = (${pfM(c)} − ${b<0?'('+pfM(b)+')':b})/${a<0?'('+pfM(a)+')':a} = ${pfFr(c-b,a)} convient (on le vérifie en remplaçant). Unicité : si deux réels x et y sont solutions, alors ${pfM(a)}x = ${pfM(a)}y, donc ${pfM(a)}(x − y) = 0 et, comme ${pfM(a)} ≠ 0, x = y.`,
    hint:'Isole x : soustrais le terme constant, puis divise par le coefficient (non nul).',diag:([v])=>near(v,(c+b)/a,1e-6)?'signe':null});
  q.ans=[`${sg*(c-b)/g}/${Math.abs(a)/g}`];return q};
const gPfEuR1=()=>{const a=R(2,9),x0=R(-9,9),b=nz(-12,12),c=a*x0+b;
  return chain({instr:'Démontre l’existence et l’unicité de la solution.',prompt:stx(`À démontrer : l’équation ${pfLin(a,b)} = ${pfM(c)} a une unique solution réelle.`),
    steps:[
      {q:'Existence : quel nombre proposer ?',o:[pfOK(`x₀ = ${pfM(x0)}, car ${a} × ${x0<0?'('+pfM(x0)+')':x0} ${b<0?'−':'+'} ${Math.abs(b)} = ${pfM(c)}`),
        pfW(`x₀ = ${pfFr(c+b,a)}`,'Il faut soustraire le terme constant, pas l’ajouter : vérifie en remplaçant.','signe'),
        pfW(`x₀ = ${pfFr(c,a)}`,'Le terme constant a été oublié : vérifie en remplaçant.','calc')]},
      {q:'Unicité : on suppose que x et y sont deux solutions. Alors…',o:[pfOK(`${a}x ${b<0?'−':'+'} ${Math.abs(b)} = ${a}y ${b<0?'−':'+'} ${Math.abs(b)}, donc ${a}(x − y) = 0`),
        pfW(`x = y, puisqu’on a déjà trouvé une solution`,'Avoir trouvé une solution ne dit pas qu’il n’y en a pas d’autre.','pr-unicite'),
        pfW('on teste x = 0, 1, 2 : aucun autre nombre ne convient','Quelques essais ne couvrent pas tous les réels.','pr-exemple')]},
      {q:'Et donc ?',o:[pfOK(`Comme ${a} ≠ 0, x − y = 0, donc x = y`),pfW(`On divise par x − y : ${a} = 0, absurde`,'x − y peut être nul : justement, on veut montrer qu’il l’est.','pr-justif'),pfW(`Donc x − y = ${a}`,`${a}(x − y) = 0 et ${a} ≠ 0 donnent x − y = 0.`,'calc')]},
      {q:'Conclusion :',o:[pfOK(`L’équation a une unique solution : ${pfM(x0)}`),pfW(`Elle a au moins une solution, ${pfM(x0)}, mais peut-être d’autres`,'L’unicité vient d’être démontrée.','pr-unicite'),pfW('La solution est unique, mais il faudrait encore prouver qu’elle existe','L’existence a été prouvée à la première étape.','pr-unicite')]}],
    explain:`Existence : ${pfM(x0)} vérifie l’équation. Unicité : deux solutions x, y donnent ${a}(x − y) = 0, et ${a} ≠ 0 impose x = y. Donc ∃! x ∈ ℝ, ${pfLin(a,b)} = ${pfM(c)}.`})};
const gPfEuVF=()=>{const t=R(0,5);let s,v,ex;
  if(t===0){const a=pick([0,0,1,4,9,16,25,-4,-9]);s=`∃! x ∈ ℝ, x² = ${pfM(a)}`;v=a===0;ex=a===0?'Seul 0 a un carré nul.':a>0?`Deux solutions : ${Math.sqrt(a)} et −${Math.sqrt(a)} ; l’existence est vraie, l’unicité fausse.`:'Aucune solution : un carré n’est jamais négatif.'}
  else if(t===1){const a=pick([8,-8,27,-27,5,-1]);s=`∃! x ∈ ℝ, x³ = ${pfM(a)}`;v=true;ex='La fonction cube est strictement croissante sur ℝ et prend toutes les valeurs : chaque réel a exactement une racine cubique.'}
  else if(t===2){const m=R(1,9);s=`∃! x ∈ ℕ, x² = ${m*m}`;v=true;ex=`Dans ℕ, seul ${m} convient (−${m} n’est pas un entier naturel).`}
  else if(t===3){const m=R(1,9);s=`∃! x ∈ ℤ, x² = ${m*m}`;v=false;ex=`Dans ℤ, ${m} et −${m} conviennent : pas d’unicité.`}
  else if(t===4){const k=R(1,3);s=`∃! n ∈ ℕ, n &lt; ${k}`;v=k===1;ex=k===1?'Seul 0 convient.':`${Array.from({length:k},(_,i)=>i).join(', ')} conviennent : pas d’unicité.`}
  else{const a=pick([2,5,0,-3]);s=`∃! x ∈ ℝ, e<sup>x</sup> = ${pfM(a)}`;v=a>0;ex=a>0?`x = ln ${a} convient, et c’est le seul car exp est strictement croissante.`:'Aucune solution : e<sup>x</sup> &gt; 0 pour tout x.'}
  return mcq('Cette phrase est-elle vraie ?',stx(s),[{h:'Vraie',ok:v,tag:'pr-unicite'},{h:'Fausse',ok:!v,tag:'pr-unicite'}],(v?'<b>Vraie.</b> ':'<b>Fausse.</b> ')+ex,'∃! demande deux choses : au moins une solution, et pas deux différentes.',true)};
const gPfEuR3=()=>{const k=pick([2,3]),m=nz(-4,4),c=(k*k-1)*m,b1=(k-1)*m,b2=-(k+1)*m;
  return chain({instr:'Trouve toutes les solutions par analyse-synthèse.',prompt:stx(`Trouver toutes les fonctions affines f(x) = ax + b (a, b réels) telles que f(f(x)) = ${k*k}x ${c<0?'−':'+'} ${Math.abs(c)} pour tout réel x.`),
    steps:[
      {q:'Analyse : si f convient, f(f(x)) vaut…',o:[pfOK('a(ax + b) + b = a²x + ab + b'),pfW('a²x + b²','f(f(x)) = a × f(x) + b = a(ax + b) + b : développe.','calc'),pfW('(ax + b)²','f ∘ f n’est pas le carré de f.','calc')]},
      {q:'En identifiant les coefficients :',o:[pfOK(`a² = ${k*k} et (a + 1)b = ${pfM(c)}, donc a = ${k} ou a = −${k}`,{c:'both'}),
        pfW(`a² = ${k*k}, donc a = ${k}, et (a + 1)b = ${pfM(c)}`,`a² = ${k*k} a deux solutions : ${k} et −${k}.`,'pr-cas',{c:'pos'}),
        pfW(`a = ${k*k} et b = ${pfM(c)}`,'Le coefficient de x dans f(f(x)) est a², pas a.','calc',{c:'bad'})]},
      {q:'Les candidats sont donc…',o:prev=>{const ch=prev[1].c==='pos'?'pos':'both',both=`f(x) = ${pfLin(k,b1)} ou f(x) = ${pfLin(-k,b2)}`,pos=`f(x) = ${pfLin(k,b1)} seulement`;
        return[ch==='both'?pfOK(both):pfW(both,'Ce n’est pas ce que donne ton identification précédente.'),ch==='pos'?pfOK(pos):pfW(pos,`a = −${k} donne aussi un candidat.`,'pr-cas'),pfW(`f(x) = ${pfLin(k,b1)} ou f(x) = ${pfLin(-k,-b2)}`,`Pour a = −${k} : (1 − ${k})b = ${pfM(c)} donne b = ${pfM(b2)}.`,'signe')]}},
      {q:'Synthèse :',o:[pfOK('On vérifie que chaque candidat convient en calculant f(f(x))'),pfW('Inutile : l’analyse a déjà trouvé les solutions','L’analyse ne donne que des conditions nécessaires : il faut vérifier.','pr-synthese'),pfW('On vérifie seulement pour x = 0','Une seule valeur de x ne suffit pas : il faut l’égalité pour tout x.','pr-exemple')]}],
    explain:`Analyse : f(f(x)) = a²x + (a + 1)b, donc a² = ${k*k} et (a + 1)b = ${pfM(c)}. a = ${k} donne b = ${pfM(b1)} ; a = −${k} donne b = ${pfM(b2)}. Synthèse : ${k}(${pfLin(k,b1)}) ${b1<0?'−':'+'} ${Math.abs(b1)} = ${k*k}x ${c<0?'−':'+'} ${Math.abs(c)} et −${k}(${pfLin(-k,b2)}) ${b2<0?'−':'+'} ${Math.abs(b2)} = ${k*k}x ${c<0?'−':'+'} ${Math.abs(c)}. Les deux fonctions conviennent.`})};
const gPfEuR2=()=>{const a=nz(-5,5),b=nz(-5,5),c=nz(-9,9),sg=v=>v<0?' − ':' + ';
  const g=`${a===1?'':a===-1?'−':pfM(a)}x²${sg(c)}${Math.abs(c)}`,h=`${b===1?'':b===-1?'−':pfM(b)}x`;
  return chain({instr:'Démontre par analyse-synthèse (niveau université).',prompt:stx('À démontrer : toute fonction f : ℝ → ℝ s’écrit de façon unique f = g + h, avec g paire et h impaire.'),
    steps:[
      {q:'Analyse : on commence par…',o:[pfOK('supposer que f = g + h, avec g paire et h impaire'),pfW('tester sur f(x) = x²','Un exemple ne démontre rien pour toutes les fonctions.','pr-exemple'),pfW('poser g(x) = f(x) et h(x) = 0','h = 0 est bien impaire, mais g = f n’est pas paire en général.')]},
      {q:'Alors f(−x) vaut…',o:[pfOK('g(−x) + h(−x) = g(x) − h(x)'),pfW('g(x) + h(x)','h est impaire : h(−x) = −h(x).','calc'),pfW('−g(x) + h(x)','g est paire : g(−x) = g(x), et h impaire : h(−x) = −h(x).','calc')]},
      {q:'On en déduit :',o:[pfOK('g(x) = (f(x) + f(−x))/2 et h(x) = (f(x) − f(−x))/2'),pfW('g(x) = (f(x) − f(−x))/2 et h(x) = (f(x) + f(−x))/2','Additionne f(x) = g + h et f(−x) = g − h : on obtient 2g.','calc'),pfW('g(x) = f(x) + f(−x) et h(x) = f(x) − f(−x)','On obtient 2g et 2h : il faut diviser par 2.','calc')]},
      {q:'Synthèse :',o:[pfOK('On vérifie que ces g et h sont paire et impaire et que g + h = f : l’analyse donne l’unicité, la synthèse l’existence'),pfW('Inutile : l’analyse a trouvé g et h','L’analyse dit « si une décomposition existe, c’est celle-là » ; il faut vérifier qu’elle convient.','pr-synthese'),pfW('La synthèse donne l’unicité, l’analyse l’existence','C’est l’inverse.','pr-unicite')]},
      {q:`Application : pour f(x) = ${a===1?'':a===-1?'−':pfM(a)}x²${sg(b)}${Math.abs(b)===1?'':Math.abs(b)}x${sg(c)}${Math.abs(c)}, la partie paire g est…`,o:[pfOK(`g(x) = ${g}`),pfW(`g(x) = ${h}`,'C’est la partie impaire.'),pfW(`g(x) = ${a===1?'':a===-1?'−':pfM(a)}x²`,'Une constante est une fonction paire : elle fait partie de g.','calc')]}],
    explain:`Analyse : f(x) = g(x) + h(x) et f(−x) = g(x) − h(x) imposent g(x) = (f(x) + f(−x))/2 et h(x) = (f(x) − f(−x))/2 (unicité). Synthèse : ces fonctions sont paire et impaire, de somme f (existence). Ici g(x) = ${g} et h(x) = ${h}. Pour f = exp, on obtient ch et sh.`})};
const gPfInv=()=>{const add=Math.random()<.5;
  const T=add?{s:'Soit x un réel. Si x + y = 0 et x + z = 0, alors y = z (unicité de l’opposé).',st:'suppose que y et z vérifient x + y = 0 et x + z = 0, et on montre y = z',stW:[['calcule l’opposé : y = −x','Écrire −x suppose déjà qu’il n’y a qu’un seul opposé : c’est ce qu’on veut prouver.'],['vérifie que x + (−x) = 0','Cela prouve l’existence, pas l’unicité.']],
      k:'y = y + 0 = y + (x + z)',kW:[['y = −x = z','Raisonnement circulaire : « −x » n’a de sens que si l’opposé est unique.'],['y + z = 0','Rien ne le donne.']],
      a:'y + (x + z) = (y + x) + z = 0 + z = z',aW:[['y + (x + z) = x + (y + z) = x','Rien ne dit que y + z = 0.'],['(y + x) + z = x + z = 0','y + x = 0, pas x.']],f:'Donc y = z : l’opposé est unique'}
    :{s:'Soit a un réel non nul. Si ay = 1 et az = 1, alors y = z (unicité de l’inverse).',st:'suppose que y et z vérifient ay = 1 et az = 1, et on montre y = z',stW:[['calcule l’inverse : y = 1/a','Écrire 1/a suppose déjà qu’il n’y a qu’un seul inverse : c’est ce qu’on veut prouver.'],['vérifie que a × (1/a) = 1','Cela prouve l’existence, pas l’unicité.']],
      k:'y = y × 1 = y × (az)',kW:[['y = 1/a = z','Raisonnement circulaire : « 1/a » n’a de sens que si l’inverse est unique.'],['y × z = 1','Rien ne le donne.']],
      a:'y × (az) = (ya) × z = 1 × z = z',aW:[['y × (az) = a × (yz) = a','Rien ne dit que yz = 1.'],['(ya) × z = 0 × z = 0','ya = ay = 1, pas 0.']],f:'Donc y = z : l’inverse est unique'};
  return chain({instr:'Démontre l’unicité.',prompt:stx(`À démontrer : « ${T.s} »`),
    steps:[
      {q:'Pour prouver l’unicité, on…',o:[pfOK(T.st),...T.stW.map(([h,w])=>pfW(h,w,'pr-unicite'))]},
      {q:'Point de départ du calcul :',o:[pfOK(T.k),...T.kW.map(([h,w])=>pfW(h,w,'pr-justif'))]},
      {q:'On regroupe autrement (associativité) :',o:[pfOK(T.a),...T.aW.map(([h,w])=>pfW(h,w,'calc'))]},
      {q:'Conclusion :',o:[pfOK(T.f),pfW('Donc y = z = 0, quel que soit le réel de départ','On a montré y = z, pas leur valeur.','calc'),pfW('Donc y = z, mais seulement pour des réels positifs','Aucune hypothèse de signe n’a été utilisée.','pr-justif')]}],
    explain:`Unicité : on prend deux objets qui conviennent et on montre qu’ils sont égaux, sans utiliser de notation qui supposerait l’unicité. ${T.k} ; ${T.a}. ${T.f}.`})};

/* ===================== Chapitre 11 : rédiger et vérifier ===================== */
const gPfConn=()=>{const a=R(2,9),b=R(a+1,a+9),T=pick([
    [`x = ${a}`,`x² = ${a*a}`,1,0],[`x² = ${a*a}`,`x = ${a} ou x = −${a}`,1,1],[`x² = ${a*a}`,`x = ${a}`,0,1],
    ['n est multiple de 6','n est multiple de 3',1,0],['n² est pair','n est pair',1,1],[`x + ${a} = ${b}`,`x = ${b-a}`,1,1],
    [`x &gt; ${a}`,`x &gt; ${a-1}`,1,0],['ab = 0','a = 0 ou b = 0',1,1],[`x ≥ ${a}`,`x &gt; ${a}`,0,1]]),[A,B,ab,ba]=T,key=ab&&ba?2:ab?0:1;
  return mcq('Quel connecteur rend la phrase vraie et la plus précise ?',stx(`« ${A} … ${B} » (x réel, n, a, b réels ou entiers)`),
    [{h:'donc (⇒)',ok:key===0,tag:'pr-equiv'},{h:'car (⇐)',ok:key===1,tag:'pr-equiv'},{h:'si et seulement si (⟺)',ok:key===2,tag:'pr-equiv'}],
    `« ${A} » ⇒ « ${B} » : ${ab?'vrai':'faux'} ; « ${B} » ⇒ « ${A} » : ${ba?'vrai':'faux'}. « donc » annonce une conséquence (⇒), « car » une justification (⇐), « si et seulement si » les deux sens (⟺).`,
    'Teste les deux sens. « A car B » signifie que B entraîne A.',true)};
const gPfErr1=()=>{const a=R(2,9);if(Math.random()<.6)return chain({instr:'Trouve l’erreur de cette fausse démonstration.',
    prompt:stx(`« Démonstration » que 2 = 1. Soit x = ${a}. (1) x = ${a} ; (2) donc x² = ${a}x ; (3) donc x² − ${a*a} = ${a}x − ${a*a} ; (4) donc (x − ${a})(x + ${a}) = ${a}(x − ${a}) ; (5) donc x + ${a} = ${a} ; (6) donc ${2*a} = ${a} ; (7) donc 2 = 1.`),
    steps:[
      {q:'Quel passage est faux ?',o:[pfOK('De (4) à (5)'),pfW('De (1) à (2)','On multiplie les deux membres par x : c’est permis.'),pfW('De (3) à (4)','x² − a² = (x − a)(x + a) est une identité remarquable, et a x − a² = a(x − a).'),pfW('De (6) à (7)',`On divise par ${a} ≠ 0 : c’est permis (mais la ligne (6) était déjà fausse).`)]},
      {q:'Pourquoi est-ce faux ?',o:[pfOK(`On divise par x − ${a}, qui vaut 0 puisque x = ${a}`),pfW(`On ne peut pas factoriser par x − ${a}`,'La factorisation est juste.','calc'),pfW(`On divise par ${a}, qui peut être nul`,`${a} n’est pas nul : le problème est x − ${a}.`)]},
      {q:'Quelle règle aurait évité l’erreur ?',o:[pfOK('Avant de diviser par une expression, vérifier qu’elle n’est pas nulle'),pfW('Ne jamais factoriser des deux côtés','Factoriser est permis ; c’est la simplification qui pose problème.'),pfW('Toujours développer au lieu de factoriser','Développer ou factoriser ne change rien à l’égalité.')]}],
    explain:`De (4) à (5), on « simplifie » par x − ${a}. Or x = ${a}, donc x − ${a} = 0 : on a divisé par zéro. Règle : on ne divise par une expression qu’après avoir vérifié qu’elle n’est pas nulle (sinon, on traite le cas nul à part).`});
  return chain({instr:'Trouve l’erreur de cette fausse démonstration.',prompt:stx(`« Démonstration » que −${a} = ${a}. (1) (−${a})² = ${a*a} ; (2) ${a}² = ${a*a} ; (3) donc (−${a})² = ${a}² ; (4) donc −${a} = ${a}.`),
    steps:[
      {q:'Quel passage est faux ?',o:[pfOK('De (3) à (4)'),pfW('La ligne (1)',`(−${a})² = (−${a}) × (−${a}) = ${a*a}.`,'calc'),pfW('De (2) à (3)','Deux nombres égaux au même troisième sont égaux.')]},
      {q:'Pourquoi est-ce faux ?',o:[pfOK('x² = y² n’entraîne pas x = y, seulement x = y ou x = −y'),pfW('On ne peut pas élever un nombre négatif au carré','C’est permis : le carré d’un négatif est positif.'),pfW(`(−${a})² vaut −${a*a}`,`(−${a})² = ${a*a}.`,'calc')]},
      {q:'Quelle règle retenir ?',o:[pfOK('Prendre la racine d’un carré donne la valeur absolue : √(x²) = |x|'),pfW('Ne jamais élever au carré','C’est permis, mais l’opération n’est pas réversible.','pr-equiv'),pfW('Les carrés de nombres négatifs sont interdits','Ils sont permis.')]}],
    explain:`(−${a})² = ${a}² est vrai, mais x² = y² ⟺ x = y ou x = −y. « Remonter » d’un carré à un nombre fait perdre le signe : √(x²) = |x|.`})};
const PF_DIAG={rec:'Elle démontre la réciproque au lieu de l’énoncé',ex:'Elle se contente d’exemples',ini:'Elle oublie l’initialisation',neg:'Elle nie mal l’affirmation'};
const PF_REM={rec:'Démontrer l’implication dans le bon sens (ici, par contraposée)',ex:'Raisonner sur un entier n quelconque, par exemple par disjonction de cas',ini:'Vérifier le premier rang, ici n = 0',neg:'Chercher un seul x tel que x² &lt; x'};
const PF_BAD=[
  {k:'rec',s:'Énoncé : « si n² est pair, alors n est pair ». Preuve proposée : « Soit n un entier pair : n = 2k. Alors n² = 4k² = 2(2k²) est pair. Donc la propriété est démontrée. »',
    real:'la preuve part de « n pair » et arrive à « n² pair » : c’est la réciproque',tv:[pfOK('Oui : par contraposée, n impair donne n² impair'),pfW('Non : n = 3 est un contre-exemple','3² = 9 est impair : l’hypothèse n’est pas vérifiée.','implication')]},
  {k:'ex',s:'Énoncé : « pour tout entier n, n² + n est pair ». Preuve proposée : « Pour n = 1 : 2 ; n = 2 : 6 ; n = 3 : 12 ; n = 10 : 110. Tous sont pairs, donc la propriété est démontrée. »',
    real:'quatre exemples ne couvrent pas tous les entiers',tv:[pfOK('Oui : n² + n = n(n + 1), produit de deux entiers consécutifs, est pair'),pfW('Non : on n’a testé que quatre valeurs','Que la preuve soit mauvaise ne rend pas l’énoncé faux : n(n + 1) est toujours pair.','pr-exemple')]},
  {k:'ini',s:'Énoncé : « pour tout n ≥ 0, 4<sup>n</sup> + 1 est divisible par 3 ». Preuve proposée : « Supposons 4<sup>n</sup> + 1 = 3k. Alors 4<sup>n+1</sup> + 1 = 4(4<sup>n</sup> + 1) − 3 = 12k − 3 = 3(4k − 1). Donc, par récurrence, c’est vrai pour tout n. »',
    real:'l’hérédité est juste mais le rang 0 n’a pas été vérifié',tv:[pfOK('Non : pour n = 0, 4⁰ + 1 = 2 n’est pas divisible par 3'),pfW('Oui, puisque l’hérédité est juste','Sans initialisation, l’hérédité ne prouve rien ; et ici le rang 0 est faux.','pr-init')]},
  {k:'neg',s:'Énoncé : « l’affirmation “pour tout réel x, x² ≥ x” est fausse ». Preuve proposée : « Montrons que pour tout réel x, x² &lt; x. Or pour x = 2, 4 &lt; 2 est faux. Donc l’affirmation est vraie. »',
    real:'la négation de « pour tout x, x² ≥ x » est « il existe x tel que x² &lt; x »',tv:[pfOK('Oui : x = 1/2 donne x² = 1/4 &lt; 1/2'),pfW('Non : x = 2 vérifie x² ≥ x','Un exemple qui vérifie un « pour tout » ne le prouve pas ; x = 1/2 le réfute.','pr-exemple')]}];
const gPfErr2=()=>{const T=pick(PF_BAD);
  return chain({instr:'Corrige cette preuve comme un professeur.',prompt:stx(T.s),
    steps:[
      {q:'Quel est le défaut principal ?',o:Object.entries(PF_DIAG).map(([k,h])=>k===T.k?pfOK(h,{k}):pfW(h,`Ce n’est pas le problème ici : ${T.real}.`,'raisonnement',{k}))},
      {q:'Que fallait-il faire ?',o:prev=>{const k=prev[0].k;return Object.entries(PF_REM).map(([kk,h])=>kk===k?pfOK(h):pfW(h,'Ce remède ne correspond pas au défaut choisi à l’étape précédente.'))}},
      {q:'L’énoncé de départ est-il vrai ?',o:[...T.tv,pfW('Impossible à savoir','On peut trancher par une preuve correcte ou un contre-exemple.')]}],
    explain:`Défaut : ${PF_DIAG[T.k].toLowerCase()} (${T.real}). Remède : ${PF_REM[T.k].toLowerCase()}. ${T.tv[0].h}.`})};
const PF_ORDER=[
  {st:'Si n est impair, alors n² est impair.',s:['Soit n un entier impair.','Il existe un entier k tel que n = 2k + 1.','Alors n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1.','Comme 2k² + 2k est un entier, n² est impair.']},
  {st:'La somme de trois entiers consécutifs est un multiple de 3.',s:['Soit n un entier.','Trois entiers consécutifs s’écrivent n, n + 1 et n + 2.','Leur somme vaut 3n + 3 = 3(n + 1).','Comme n + 1 est un entier, cette somme est un multiple de 3.']},
  {st:'Si a∣b et b∣c, alors a∣c.',s:['Soit a, b, c des entiers tels que a∣b et b∣c.','Il existe des entiers k et m tels que b = ka et c = mb.','Alors c = m(ka) = (mk)a.','Comme mk est un entier, a∣c.']},
  {st:'Il n’existe pas de plus grand entier naturel.',s:['Raisonnons par l’absurde : supposons qu’il existe un plus grand entier naturel N.','Alors N + 1 est un entier naturel.','Or N + 1 &gt; N.','C’est contradictoire avec le choix de N : il n’existe pas de plus grand entier naturel.']},
  {st:'Pour tout n ≥ 0, 2<sup>n</sup> ≥ n + 1.',s:['Initialisation : pour n = 0, 2⁰ = 1 ≥ 1.','Hérédité : soit n ≥ 0 tel que 2<sup>n</sup> ≥ n + 1.','Alors 2<sup>n+1</sup> = 2 × 2<sup>n</sup> ≥ 2n + 2 ≥ n + 2.','Par récurrence, 2<sup>n</sup> ≥ n + 1 pour tout n ≥ 0.']}];
const gPfOrder=()=>{const T=pick(PF_ORDER),N=['Première','Deuxième','Troisième','Quatrième'];
  return chain({instr:'Remets la preuve dans l’ordre.',prompt:stx(`À démontrer : « ${T.st} » Choisis les phrases de la preuve, dans l’ordre.`),
    steps:N.map((n,i)=>({q:`${n} phrase :`,o:T.s.map((h,j)=>j===i?pfOK(h):pfW(h,j>i?'Trop tôt : cette phrase s’appuie sur ce qui doit être établi avant.':'Cette phrase a déjà sa place plus haut dans la preuve.','pr-redaction'))})),
    explain:`L’ordre logique : ${T.s.map((h,i)=>`(${i+1}) ${h}`).join(' ')} On introduit, on traduit, on calcule, on conclut.`})};
const PF_M2=['Par une preuve directe','Par disjonction de cas','Par contraposée','Par l’absurde','Par récurrence','Par un contre-exemple','Par analyse-synthèse'];
const PF_M2B=[
  ['Montrer qu’il existe une infinité de nombres premiers.',3,[4,5,1]],
  ['Montrer que pour tout n ≥ 1, 1 + 2 + … + n = n(n + 1)/2.',4,[3,5,2]],
  ['Montrer que pour tout entier n, n(n + 1) est pair.',1,[3,5,6]],
  ['Montrer que si n² est pair, alors n est pair.',2,[4,5,6]],
  ['Montrer que la somme de deux entiers pairs est paire.',0,[3,4,5]],
  ['Montrer que « pour tout réel x, x² &gt; x » est faux.',5,[4,2,0]],
  ['Montrer que √3 est irrationnel.',3,[4,5,1]],
  ['Trouver toutes les fonctions affines f telles que f(f(x)) = 9x + 8.',6,[4,5,2]]];
const gPfMeth2=()=>{const[s,k,w]=pick(PF_M2B);
  return mcq('Quelle méthode est la plus naturelle ?',stx(s),[{h:PF_M2[k],ok:true},...w.map(i=>({h:PF_M2[i],tag:'raisonnement'}))],
    `Méthode naturelle : ${PF_M2[k].toLowerCase()}. Repères : énoncé négatif → absurde ; somme ou puissance en n → récurrence ; parité ou reste → cas ; hypothèse peu maniable → contraposée ; « pour tout » douteux → contre-exemple ; trouver tous les objets → analyse-synthèse.`,
    'Regarde la forme de l’énoncé : négatif ? entier n ? implication ? affirmation douteuse ?')};
const PF_REDVF=[
  ['« Soit n un entier pair. Il existe un entier k tel que n = 2k. »',true,'Rédaction correcte : n est introduit, k est introduit comme entier.'],
  ['« x² = 9, donc x = 3. »',false,'x peut aussi valoir −3 : il faut écrire x = 3 ou x = −3.'],
  ['« x² = 9 ⟺ x = 3 ou x = −3. »',true,'Les deux sens sont vrais.'],
  ['« Soit a et b impairs : a = 2k + 1 et b = 2k + 1. »',false,'Même lettre k : on impose a = b. Il faut a = 2k + 1 et b = 2m + 1.'],
  ['« √(x²) = x pour tout réel x. »',false,'√(x²) = |x| ; par exemple √((−3)²) = 3.'],
  ['« x(x − 2) = 3x, donc x − 2 = 3. »',false,'On a divisé par x, qui peut être nul : x = 0 est aussi solution.'],
  ['« Pour x &gt; 0 : x² &gt; 4 ⟺ x &gt; 2. »',true,'Sur ]0 ; +∞[, la fonction carré est strictement croissante.'],
  ['« x &gt; 2, donc x² &gt; 4. »',true,'Pour x &gt; 2 &gt; 0, on peut élever au carré (fonction croissante sur les positifs).'],
  ['« x &lt; 2, donc x² &lt; 4. »',false,'Contre-exemple : x = −3 donne x² = 9.'],
  ['« Supposons P(n) vraie pour tout n ; montrons P(n + 1). »',false,'Dans l’hérédité, on suppose P(n) pour un n fixé, pas pour tout n.']];
const gPfRedVF=()=>{const[s,v,why]=pick(PF_REDVF);
  return mcq('Cette ligne de rédaction est-elle correcte ?',stx(s),[{h:'Correcte',ok:v,tag:'pr-redaction'},{h:'Incorrecte',ok:!v,tag:'pr-redaction'}],(v?'<b>Correcte.</b> ':'<b>Incorrecte.</b> ')+why,
    'Chaque objet est-il introduit ? Chaque flèche est-elle valable dans le sens écrit ? Divise-t-on par zéro ?',true)};
const gPfSqrt=()=>{const m=R(1,4),c=m*(m+1),r1=m*m,r2=(m+1)**2;
  return chain({instr:'Résous en contrôlant chaque étape.',prompt:stx(`Résoudre dans [0 ; +∞[ : √x = x − ${c}.`),
    steps:[
      {q:`On élève au carré : x = (x − ${c})². Cette étape est…`,o:[pfOK('une implication seulement : les solutions trouvées ne sont que des candidates'),pfW('une équivalence, car on fait la même chose des deux côtés','Deux nombres opposés ont le même carré : élever au carré n’est pas réversible.','pr-equiv'),pfW('interdite : on n’a pas le droit d’élever au carré','C’est permis, mais il faudra vérifier les solutions.','pr-equiv')]},
      {q:'On développe et on résout :',o:[pfOK(`x² − ${2*c+1}x + ${c*c} = 0, donc x = ${r1} ou x = ${r2}`),pfW(`x² − ${2*c}x + ${c*c} = 0, donc x = ${c}`,'Il faut aussi passer le x du membre de gauche : −2cx − x.','calc'),pfW(`x² + ${c*c} = 0 : pas de solution`,'Le double produit manque : (x − c)² = x² − 2cx + c².','distrib')]},
      {q:`Vérification de x = ${r1} :`,o:[pfOK(`√${r1} = ${m}, mais ${r1} − ${c} = −${m} : x = ${r1} est rejeté`),pfW(`√${r1} = ${m} et ${r1} − ${c} = ${m} : x = ${r1} convient`,`${r1} − ${c} = −${m}, pas ${m}.`,'calc'),pfW(`Inutile : x = ${r1} vient d’un calcul juste`,'Après un passage au carré, il faut toujours vérifier.','pr-equiv')]},
      {q:'Ensemble des solutions :',o:[pfOK(`S = {${r2}}`),pfW(`S = {${r1} ; ${r2}}`,`x = ${r1} ne vérifie pas l’équation de départ.`,'pr-equiv'),pfW(`S = {${r1}}`,`C’est ${r2} qui convient : √${r2} = ${m+1} = ${r2} − ${c}.`,'calc')]}],
    explain:`Élever au carré donne seulement ⇒ : x = (x − ${c})² fournit les candidats ${r1} et ${r2}. Vérification : √${r1} = ${m} ≠ −${m} (rejeté) ; √${r2} = ${m+1} = ${r2} − ${c} (accepté). S = {${r2}}.`})};

/* ===================== Déclaration des chapitres ===================== */
ANA_UNITS.push(
  {id:'pr-pourquoi',tr:'pr',src:'Pourquoi prouver : constater n’est pas démontrer',name:'Pourquoi prouver ?',sub:'Exemple, conjecture, théorème, contre-exemple',glyph:'?!',tone:'c',
   skills:[SKA('pr.pq.ce','Plus petit contre-exemple',gPfCe,1),SKA('pr.pq.vf','Vrai ou faux : prouver',gPfVF1,1),SKA('pr.pq.voc','Exemple, conjecture ou théorème ?',gPfVoc,1),
     SKA('pr.pq.r1','Raisonner : réfuter une affirmation',gPfR1,1),SKA('pr.pq.cex','Choisir un contre-exemple',gPfCex,2),SKA('pr.pq.r2','Raisonner : vie d’une conjecture',gPfR2,2),SKA('pr.pq.r3','Raisonner : de l’exemple à la preuve',gPfR3,2)]},
  {id:'pr-prop',tr:'pr',src:'Les phrases mathématiques : et, ou, non',name:'Et, ou, non',sub:'Propositions, « ou » inclusif, négation',glyph:'∧∨',tone:'x',w:'wSym',
   skills:[SKA('pr.pp.prop','Reconnaître une proposition',gPfProp,1),SKA('pr.pp.val','Vrai ou faux : et, ou',gPfVal,1),SKA('pr.pp.neg','Nier une phrase composée',gPfNeg1,1),
     SKA('pr.pp.or','Raisonner : le « ou » inclusif',gPfOr,1),SKA('pr.pp.cnt','Compter avec « ou » et « et »',gPfCnt,2),SKA('pr.pp.negr','Raisonner : De Morgan pas à pas',gPfNegR,2),
     SKA('pr.pp.tab','Raisonner : valeur de (non P) ou Q',gPfTab,2),SKA('pr.pp.laws','Vrai ou faux : lois logiques',gPfLaws,2)]},
  {id:'pr-impl',tr:'pr',src:'L’implication : si… alors',name:'L’implication',sub:'Hypothèse, réciproque, nécessaire et suffisant',glyph:'⇒',tone:'sq',
   skills:[SKA('pr.im.hc','Hypothèse et conclusion',gPfHC,1),SKA('pr.im.rec','Former la réciproque',gPfRec,1),SKA('pr.im.vf','Implication vraie ou fausse',gPfImpVF,1),
     SKA('pr.im.false','Raisonner : réfuter une implication',gPfFalse,1),SKA('pr.im.cns','Nécessaire ou suffisant',gPfCns,2),SKA('pr.im.sym','⇒, ⇐ ou ⟺ ?',gPfSym,2),
     SKA('pr.im.tt','Table de vérité',gPfTT,2),SKA('pr.im.recr','Raisonner : implication et réciproque',gPfRecR,2),SKA('pr.im.eqv','Raisonner : prouver une équivalence',gPfEqv,3)]},
  {id:'pr-quant',tr:'pr',src:'Les quantificateurs : pour tout, il existe',name:'Pour tout, il existe',sub:'∀, ∃, ordre, négation',glyph:'∀∃',tone:'c',w:'wSym',
   skills:[SKA('pr.qt.read','Lire ∀ et ∃',gPfQRead,1),SKA('pr.qt.vf','Phrase quantifiée vraie ?',gPfQVF,1),SKA('pr.qt.neg','Nier une phrase quantifiée',gPfQNeg,1),
     SKA('pr.qt.negr','Raisonner : nier « tous »',gPfQNegR,1),SKA('pr.qt.ord','L’ordre des quantificateurs',gPfOrd,2),SKA('pr.qt.ce','Plus petit contre-exemple',gPfQCe,2),
     SKA('pr.qt.q2','Raisonner : nier ∀∃',gPfQ2Neg,2),SKA('pr.qt.ref','Raisonner : réfuter un ∀',gPfQRef,2),SKA('pr.qt.def','Traduire une définition',gPfQDef,3)]},
  {id:'pr-direct',tr:'pr',src:'La preuve directe',name:'La preuve directe',sub:'Soit… On suppose… Donc…',glyph:'2k+1',tone:'x',
   skills:[SKA('pr.di.write','Traduire en calcul',gPfWrite,1),SKA('pr.di.calc','Le bon calcul',gPfCalc,1),SKA('pr.di.first','La première phrase',gPfFirst,1),
     SKA('pr.di.r1','Raisonner : parité',gPfDirR1,1),SKA('pr.di.just','Justifier une étape',gPfJust,2),SKA('pr.di.r2','Raisonner : divisibilité',gPfDirR2,2),SKA('pr.di.ineq','Raisonner : inégalité par la différence',gPfIneqR,3)]},
  {id:'pr-cas',tr:'pr',src:'La disjonction de cas',name:'Disjonction de cas',sub:'Pair et impair, restes, signe',glyph:'⑂',tone:'sq',
   skills:[SKA('pr.ca.cover','Des cas qui couvrent tout',gPfCover,1),SKA('pr.ca.mod','Reste d’un carré',gPfMod,1),SKA('pr.ca.abs','Valeur absolue par cas',gPfAbs,1),
     SKA('pr.ca.r1','Raisonner : parité par cas',gPfCasR1,1),SKA('pr.ca.r2','Raisonner : restes des carrés',gPfCasR2,2),SKA('pr.ca.r3','Raisonner : équation avec |x − a|',gPfCasR3,2),
     SKA('pr.ca.vf','Vrai ou faux : cas',gPfCasVF,2),SKA('pr.ca.last','Chiffre des unités',gPfLast,2)]},
  {id:'pr-contra',tr:'pr',src:'La contraposée',name:'La contraposée',sub:'Si non Q, alors non P',glyph:'¬⇐',tone:'c',
   skills:[SKA('pr.cp.form','Former la contraposée',gPfCpForm,1),SKA('pr.cp.start','Première phrase',gPfCpStart,1),SKA('pr.cp.r1','Raisonner : preuve par contraposée',gPfCpR1,1),
     SKA('pr.cp.vf','Vrai ou faux : contraposée',gPfCpVF,2),SKA('pr.cp.r2','Raisonner : contraposée et cas',gPfCpR2,2),SKA('pr.cp.r3','Raisonner : avec ε',gPfCpR3,3)]},
  {id:'pr-absurde',tr:'pr',src:'Le raisonnement par l’absurde',name:'L’absurde',sub:'√2 irrationnel, infinité des premiers',glyph:'⊥',tone:'x',
   skills:[SKA('pr.ab.start','Supposer le contraire',gPfAbStart,1),SKA('pr.ab.vf','Vrai ou faux : absurde',gPfAbVF,1),SKA('pr.ab.eucl','Le nombre d’Euclide',gPfEucl,1),
     SKA('pr.ab.r1','Raisonner : √2 irrationnel',gPfAbR1,2),SKA('pr.ab.r2','Raisonner : infinité des premiers',gPfAbR2,2),SKA('pr.ab.r3','Raisonner : pas de plus petit, pas de plus grand',gPfAbR3,2),
     SKA('pr.ab.meth','Reconnaître la méthode',gPfMeth,2),SKA('pr.ab.irr','Irrationnel ou pas ?',gPfIrr,3)]},
  {id:'pr-rec',tr:'pr',src:'Le raisonnement par récurrence',name:'La récurrence',sub:'Initialisation, hérédité, dominos',glyph:'n+1',tone:'sq',
   skills:[SKA('pr.rc.term','Calculer des termes',gPfRcTerm,1),SKA('pr.rc.sum','Sommes classiques',gPfRcSum,1),SKA('pr.rc.part','Les étapes d’une récurrence',gPfRcPart,1),
     SKA('pr.rc.r1','Raisonner : formule de somme',gPfRcR1,1),SKA('pr.rc.r2','Raisonner : divisibilité',gPfRcR2,2),SKA('pr.rc.r3','Raisonner : inégalité',gPfRcR3,2),
     SKA('pr.rc.vf','Vrai ou faux : récurrence',gPfRcVF,2),SKA('pr.rc.trap','Raisonner : fausses récurrences',gPfRcTrap,3)]},
  {id:'pr-exun',tr:'pr',src:'Existence, unicité et analyse-synthèse',name:'Existence et unicité',sub:'∃!, analyse puis synthèse',glyph:'∃!',tone:'c',
   skills:[SKA('pr.eu.voc','Existence, unicité : vocabulaire',gPfEuVoc,1),SKA('pr.eu.lin','L’unique solution',gPfEuLin,1),SKA('pr.eu.r1','Raisonner : existence et unicité',gPfEuR1,1),
     SKA('pr.eu.vf','∃! vrai ou faux',gPfEuVF,2),SKA('pr.eu.r3','Raisonner : analyse-synthèse',gPfEuR3,2),SKA('pr.eu.r2','Raisonner : paire + impaire',gPfEuR2,3),SKA('pr.eu.inv','Raisonner : unicité de l’inverse',gPfInv,3)]},
  {id:'pr-verif',tr:'pr',src:'Rédiger et vérifier une preuve',name:'Rédiger et vérifier',sub:'Choisir la méthode, traquer l’erreur',glyph:'∎',tone:'x',w:'wRed',
   skills:[SKA('pr.ve.conn','Donc, car, si et seulement si',gPfConn,1),SKA('pr.ve.err1','Raisonner : la fausse preuve',gPfErr1,1),SKA('pr.ve.err2','Raisonner : corriger une preuve',gPfErr2,2),
     SKA('pr.ve.order','Raisonner : remettre en ordre',gPfOrder,2),SKA('pr.ve.meth','Choisir la méthode',gPfMeth2,2),SKA('pr.ve.red','Rédaction correcte ?',gPfRedVF,2),SKA('pr.ve.sqrt','Raisonner : équation avec racine',gPfSqrt,3)]});
