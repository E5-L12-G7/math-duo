# Guide : construire un parcours d'Équilibre

Équilibre est une appli d'apprentissage des maths en français, pour téléphone, sans connexion. Le projet est construit avec Vite : `npm run build` produit un seul fichier, `dist/index.html` (et `dist/equilibre.html`, la version publiable sur claude.ai). Voir `README.md`.
Un **parcours** (track) est une suite de **chapitres** ; chaque chapitre a un **cours**, des **exercices générés au hasard** (des « compétences ») et des **flashcards**.

Parcours (code → nom) : `alg` Algèbre 2 (existant, ne pas toucher) · `tg` Trigonométrie · `fs` Fonctions et suites · `sp` Statistiques et probabilités · `pr` Apprendre à prouver.

## 1. Les fichiers d'un parcours

| Fichier | Contenu | Qui l'écrit |
|---|---|---|
| `analyse/<code>-<sujet>.md` | Les cours, un bloc `# Chapitre : <titre>` par chapitre (format de l'agent analyste-cours) | analyste-cours |
| `peda/<code>.json` | La pédagogie progressive par cours : accroche, pourquoi, histoire, marches, conseils du prof | analyste-cours |
| `src/tr-<code>.js` (ou `tr-<code>-2.js`…) | Les chapitres (unités), les étiquettes d'erreur et les générateurs d'exercices | analyste-cours |
| `cards/<code>.json` | Les flashcards SRS par chapitre | createur-flashcards |

`tools/assemble.mjs` assemble tout dans l'ordre de `src/manifest.json` (le code reste un seul module : une déclaration en double fait échouer le build).

### Tester son travail (obligatoire avant de rendre)

```
npm run build
node tools/check.cjs dist/index.html --track <code> --n 60 --verbose
```

`check.cjs` génère des dizaines de questions par compétence et vérifie : générateur qui ne plante pas, une seule bonne réponse par QCM et par étape de raisonnement, réponse attendue acceptée, aucun « undefined »/« NaN » dans les textes, cours trouvé pour chaque chapitre. Corrige jusqu'à **0 échec**. Les avertissements « option fausse sans explication » doivent aussi disparaître.

## 2. Déclarer les chapitres (`src/tr-<code>.js`)

```js
ANA_UNITS.push(
  {id:'tg-tri', tr:'tg', src:'Trigonométrie dans le triangle rectangle',   // src = titre EXACT après « # Chapitre : » dans le Markdown
   name:'Triangle rectangle', sub:'Cosinus, sinus, tangente d’un angle aigu', glyph:'cos', tone:'c',   // tone : 'c', 'x' ou 'sq' (alterner)
   w:'wCircle',                                                              // facultatif : widget interactif principal (liste §6)
   w2:[['Le cercle et la tangente','wTan','Phrase qui dit quoi manipuler et quoi observer.']],   // facultatif : widgets en plus
   skills:[SKA('tg.tri.rap','Rapport dans un triangle rectangle',gTrRap,1), SKA('tg.tri.r1','Raisonner : calculer une longueur',gTgR1,2), …]},
  …);
```

- `id` de chapitre : `<code>-<mot>` (ex. `tg-tri`, `fs-der`, `sp-loisd`, `pr-impl`). L'id du cours sera `'fa-'+id` (sert dans `peda/<code>.json`).
- `SKA(id, nom, générateur, niveau)` : niveau 1 = une étape, débutant ; 2 = plusieurs étapes ; 3 = niveau des documents / expert.
- Identifiants de compétence **uniques dans toute l'appli**, préfixés par le code du parcours : `tg.…`, `fs.…`, `sp.…`, `pr.…`.
- **6 à 12 compétences par chapitre**, du niveau 1 au niveau 3, dont **au moins 2 exercices de raisonnement à choix** (`chain`, §4) quand le sujet s'y prête.
- Tu peux réutiliser les générateurs déjà testés listés dans `docs/catalogue-generateurs.md` (sous un nouvel id de compétence).
- Préfixe tous tes noms de fonctions et constantes par ton parcours pour éviter les collisions : `gTg…`, `gFs…`, `gSp…`, `gPr…`, `TG_…`. Tout est dans un seul script : **un nom déjà utilisé fait planter l'appli** (vérifie avec Grep dans `equilibre.html` et `src/`).

Étiquettes d'erreur (diagnostic affiché quand l'élève se trompe) :

```js
Object.assign(ANA_ERR,{'tg-quadrant':{label:'Signe selon le quadrant',tip:'Phrase courte qui explique comment éviter l’erreur.'}});
```

Étiquettes existantes réutilisables : `signe`, `calc`, `arrondi`, `rapport`, `radian`, `complementaire`, `mult-div`, `implication`, `proba-compl`, `proba-union`, `proba-cond`, `proba-indep`, `comb-order`, `comb-rep`, `comb-mult`, `va-lin`, `binom-coef`, `binom-law`, `stat-median`, `stat-weight`, `stat-quart`, `stat-var`, `stat-2var`, `suite-indice`, `suite-type`, `suite-var`, `suite-thm`, `suite-somme`, `pourcent`, `limite-dom`, `limite-fi`, `point-fixe`, `raisonnement`, `log-prod`, `log-quot`, `log-def`, `exp-eq`, `comp-order`, `distrib`, `ineq-flip` (et celles définies dans `src/ana-gen*.js`).

## 3. Outils disponibles dans les générateurs

Hasard : `R(a,b)` entier dans [a ; b] · `nz(a,b)` idem sans 0 · `pick(tab)` · `shuffle(tab)` (sur place).
Nombres et texte : `num(v)` écrit un nombre à la française (virgule, vrai signe moins) · `dec(v,d=2)` arrondi à d décimales puis `num` · `MINUS` = « − » · `sg(n)` = `"+3"` ou `"-3"` (pour construire des chaînes du moteur) · `gcd(a,b)` · `new Fr(n,d)` fraction exacte (`.add .sub .mul .div .neg .val()`), `frH(fr)` son HTML · `fr(hautHTML,basHTML)` fraction affichée · `frS(p,q)` fraction p/q simplifiée affichée.
Formules : `mx('texte')` formule écrite à la main (les x isolés passent en italique ; HTML permis : `<sup>`, `<sub>`, `<i>`) · `M('2x^2-3x+1')` formule du moteur (voir §5) rendue joliment · `poly([a,b,c])` chaîne du moteur pour ax²+bx+c · `stx('texte')` paragraphe d'énoncé · `dtab([['x',1,2],['P(X = x)','0,2','0,8']])` tableau · `serie([..])` série de valeurs.
Maths : `Cnk(n,k)`, `Ank(n,k)`, `fact(n)`, `Phi(z)` (loi normale centrée réduite), `erf`, `sumA meanA varA medA sortA` (tableaux), `piFrac(k,d=12)` écrit kπ/d simplifié, `cosEx(deg)`/`sinEx(deg)` valeurs exactes en texte (`'√3/2'`), `near(v,t,e=.011)`, `uN(i,'u')` = u<sub>i</sub>.

## 4. Les types de questions

Toujours : `instr` (consigne courte), `prompt` (énoncé HTML), `explain` (correction pas à pas, affichée après réponse), `hint` (indice). Textes en **français, tutoiement**, notation française (virgule décimale, `]a ; b[`, « − »).

### Réponse numérique : `nq`
```js
return nq({instr:'Calcule la longueur AB.', prompt:stx('…'), labels:['AB ='], t:[valeurExacte], dp:2,   // dp : arrondi demandé (1, 2, 3…) ; ou tol:0.001 ; rien = valeur exacte
  explain:'…', hint:'…', diag:([v])=>near(v,valeurFausseTypique)?'rapport':null});
```
L'élève tape sa réponse avec un **clavier qui a toutes les touches de la calculatrice** : π, e, √, ∛, ln, log, eˣ, 10ˣ, sin, cos, tan et leurs réciproques, sh/ch/th, |x|, n!, C(n ; k), A(n ; k), %, ×10ⁿ, puissances. La réponse est comparée **par sa valeur** : « 2π/3 », « ln(2) », « √3/2 », « 3,2 × 10⁻⁴ » ou « C(10 ; 3) » sont acceptés si la valeur est bonne. Tu peux donc demander une **valeur exacte** (`t:[Math.PI/3]` sans `dp`, tolérance automatique très fine) : l'élève écrira π/3. Les fonctions trigonométriques sont en radians, sauf si l'élève bascule le bouton DEG (champs numériques seulement).
`labels` peut contenir plusieurs champs (`labels:['x₁ =','x₂ =']`, `t:[a,b]`) : l'ordre compte. Pour un ordre libre, écris ta propre question (voir `numQ` dans le code) **et donne `q.ans`**.

### Expression avec x : `exprQ`
```js
return exprQ('Dérive la fonction', mx('f(x) = x²·ln x'), 'f ′(x) =', '2x*ln(x)+x', explain, hint, false /* noPar : true = interdit les parenthèses (développer) */, diag);
```
La cible est une chaîne du **moteur** (§5). La réponse de l'élève est acceptée si elle est **égale à la cible pour plusieurs valeurs de x** (n'importe quelle forme équivalente). Si la fonction n'est définie que pour x > 0 (ln, √), c'est géré : les valeurs hors domaine sont ignorées, il en faut au moins 3 valides parmi −2,3 ; −1,1 ; −0,4 ; 0,6 ; 1,7 ; 2,9 ; 4,2.

### QCM : `mcq`
```js
return mcq('Quel est le signe de cos x ?', prompt,
  [{h:'Positif',ok:true},{h:'Négatif',tag:'tg-quadrant'},{h:'Nul'}], explain, hint /*, keep : true pour garder l'ordre (Vrai/Faux)*/);
```
Une seule option `ok`. Options aux textes tous différents (les doublons sont fusionnés).

### Raisonnement à choix : `chain` (nouveau, à utiliser souvent)
L'élève construit sa démarche **étape par étape** en choisissant parmi plusieurs propositions. **Rien n'est corrigé avant « Vérifier »** : il peut se tromper, poursuivre sur sa lancée, revenir en arrière. À la vérification, l'appli montre l'étape où le raisonnement a déraillé et pourquoi.

```js
const gTgR1=()=>{const al=R(20,70),h=R(4,15),adj=h*Math.cos(al*Math.PI/180);
  return chain({instr:'Calcule le côté adjacent, en construisant ton raisonnement.',
    prompt:stx(`Triangle ABC rectangle en B, Â = ${al}°, hypoténuse AC = ${h} cm. On cherche AB.`),
    steps:[
      {q:'Par rapport à l’angle Â, AB est…',o:[
        {h:'le côté adjacent',ok:true,c:'adj'},
        {h:'le côté opposé',c:'opp',why:'Le côté opposé est en face de Â : c’est BC. AB touche Â.',tag:'rapport'},
        {h:'l’hypoténuse',c:'hyp',why:'L’hypoténuse est en face de l’angle droit : c’est AC.',tag:'rapport'}]},
      {q:'Quelle formule relie ce côté et l’hypoténuse ?',o:prev=>[      // dépend du choix précédent : l'erreur se propage
        {h:mx('cos Â = AB / AC'),ok:prev[0].c==='adj',why:'Pour AB adjacent, c’est le cosinus (CAH).',f:'cos'},
        {h:mx('sin Â = AB / AC'),ok:prev[0].c==='opp',why:'Le sinus relie le côté opposé et l’hypoténuse (SOH).',f:'sin',tag:'rapport'},
        {h:mx('tan Â = AB / AC'),ok:prev[0].c==='hyp',why:'La tangente relie opposé et adjacent, jamais l’hypoténuse (TOA).',f:'tan',tag:'rapport'}]},
      {q:'Donc AB vaut…',o:prev=>{const f=prev[1].f,v=f==='cos'?adj:f==='sin'?h*Math.sin(al*Math.PI/180):h*Math.tan(al*Math.PI/180);
        return[{h:`${f}(${al}°) × ${h} ≈ ${dec(v,2)} cm`,ok:true},
               {h:`${h} ÷ ${f}(${al}°) ≈ ${dec(h/Math[f](al*Math.PI/180),2)} cm`,why:'AB est au numérateur : on multiplie par AC, on ne divise pas.',tag:'mult-div'},
               {h:`${f}(${al}) × ${h} ≈ ${dec(h*Math[f](al),2)} cm`,why:'La calculatrice était en radians : l’angle est en degrés.',tag:'radian'}]}}],
    explain:`AB est adjacent à Â, donc cos Â = AB / AC et AB = AC × cos Â = ${h} × cos ${al}° ≈ ${dec(adj,2)} cm.`});};
```

Règles de conception des raisonnements (exigence de l'utilisatrice / l'utilisateur) :
1. **3 à 5 étapes**, chacune une vraie décision de raisonnement (quelle propriété ? quelle méthode ? quel calcul en découle ? quelle conclusion ?), pas un simple calcul isolé.
2. **3 ou 4 propositions par étape**, avec **exactement une** `ok:true`.
3. Les propositions fausses sont des **erreurs réalistes** que fait vraiment un élève (confusion de formule, signe, réciproque prise pour l'implication, oubli d'hypothèse, mauvaise lecture d'énoncé…). Elles restent **dans le sujet**, crédibles, jamais farfelues ni absurdes. Toutes les propositions d'une étape ont la même forme et à peu près la même longueur, pour que la bonne ne se repère pas à sa présentation.
4. Chaque proposition fausse a un `why` : une phrase qui explique **pourquoi** ce choix est faux (affichée après « Vérifier »). Ajoute un `tag` d'erreur quand il y en a un.
5. **Fais propager les erreurs** : quand une étape dépend de la précédente, donne `o` sous forme de fonction `prev=>[…]` (`prev` = les options choisies aux étapes précédentes, tu peux y ranger des données : `c`, `f`, `v`…). L'option `ok` est alors **la bonne suite compte tenu des choix précédents** : un élève qui s'est trompé à l'étape 1 voit des suites cohérentes avec son erreur, et découvre à la vérification que tout part de l'étape 1. Si aucune suite n'est cohérente avec un choix faux, marque la vraie bonne réponse `ok`.
6. `explain` donne le raisonnement correct complet.

## 5. Syntaxe du moteur (cibles d'`exprQ`, chaînes de `M()`, `q.ans`)

`x` (seule variable) · nombres avec point décimal `3.5` · `+ - * / ^` · parenthèses · multiplication implicite (`2x`, `3(x+1)`, `2pi`) · constantes `pi` (ou `π`) et `e` · fonctions `sqrt( cbrt( abs( ln( log( exp( sin( cos( tan( asin( acos( atan( sinh( cosh( tanh(` · `C(n;k)` `A(n;k)` · `5!` · `50%`.
Exemples : `'3*x^2*exp(2x)'`, `'-sin(2x+1)'`, `'1/(x*ln(10))'`, `'2pi/3'`.

## 6. Widgets interactifs disponibles (champ `w` / `w2` d'un chapitre)

Trigonométrie et fonctions : `wCircle` cercle trigonométrique (angle, cos, sin) · `wTan` tangente à une courbe et nombre dérivé · `wVar` signe de la dérivée et variations · `wLim` limites · `wTaylor` approximation polynomiale · `wAbs` valeur absolue comme distance · `wGrow` courbes de bˣ · `wInv` réciproque d'une fonction affine · `wRoots` racines d'une parabole · `wPar` parabole et discriminant · `wIneqG` inéquation résolue graphiquement · `wLog` logarithme · `wFn` composer des fonctions · `wRiem` intégrale comme somme de rectangles · `wRevol` volume de révolution · `wField` champ de directions d'une équation différentielle · `wOsc` oscillateur amorti · `wCob` suite récurrente (escalier / toile) · `wSer` séries.
Statistiques et probabilités : `wPos` moyenne et médiane · `wBox` quartiles, boîte à moustaches · `wSpread` étalement et écart-type · `wReg` nuage de points et régression · `wPascal` triangle de Pascal · `wTree` arbre de probabilités · `wBayes` Bayes avec 1000 personnes · `wBin` loi binomiale · `wNorm` loi normale · `wLLN` loi des grands nombres · `wCLT` théorème central limite · `wCI` intervalles de confiance.
Logique et rédaction : `wSym` symboles mathématiques · `wRed` rédiger une solution · `wInt` intervalles.

## 7. Cours (`analyse/<code>-….md`)

Format de l'agent analyste-cours (`.claude/agents/analyste-cours.md`) : `# Chapitre : <titre>`, puis `Source :`, `Niveau visé :`, `Prérequis :`, et les sections `## Explication pour un novice`, `## Notions (dans l'ordre d'apprentissage)`, `## Méthodes` (avec `### …`), `## Exemples résolus` (avec `### énoncé` et des lignes `- étape — justification`), `## Pièges fréquents` (`- piège → remède`), `## Flashcards` (table). Formules entre accents graves en notation texte : `` `x^2` ``, `` `u_{n+1}` ``. La section `## Exercices générables` n'est plus nécessaire (les exercices sont écrits directement en JS).

## 8. Pédagogie progressive (`peda/<code>.json`)

Tableau JSON, un objet par chapitre : `{"id":"fa-<id du chapitre>","accroche":…,"pourquoi":…,"histoire":…,"niveaux":[{"titre":"Marche 1 · …","html":…},…],"prof":…}` — format décrit dans l'agent analyste-cours (mode enrichissement), HTML restreint, 4 à 6 marches de la découverte à l'expertise.
