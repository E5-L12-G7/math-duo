# Cours MVA911 / MVA912 / STA001 — cahier des charges

L'appli Équilibre propose trois parcours, centrés sur des UE du Cnam :
- **MVA911** (code `m1`) « Mise à niveau Maths (1) : premiers outils de l'analyse, de l'algèbre et de la géométrie ».
- **MVA912** (code `m2`) « Mise à niveau Maths (2) : dérivation, étude de fonctions, intégration, équations différentielles, nombres complexes ».
- **STA001** (code `s1`) « Techniques de la statistique » (6 ECTS) : statistique descriptive, calcul des probabilités, variables aléatoires, lois usuelles (binomiale, Poisson, uniforme, exponentielle, normale), fluctuations d'échantillonnage, estimation ponctuelle et par intervalle, tests (un échantillon, deux échantillons, khi-deux d'ajustement et de normalité), corrélation et régression linéaire. Sources : `C:/Users/etien/drill-maths/src/content/stats.ts` et `combinatoire.ts`, `archive/v19/analyse/sp-1.md`, `sp-2.md`, `sp-3.md` (+ `archive/v19/peda/sp-*.json`, `archive/v19/cards/sp-*.json`), générateurs `src/tr-sp-1.js`, `tr-sp-2.js`, `tr-sp-3.js`. Outils de calcul : `meanA`, `medA`, `q1A`, `q3A`, `varA`, `Cnk`, `Phi` (fonction de répartition de N(0 ; 1)), `sZq(q)` (quantile de N(0 ; 1)), `sBinP(n,p,k)`, `sPoiP(λ,k)`, `dec(v,d)`. Manipulations statistiques : §3.

Public : adultes en reprise d'études, souvent éloignés des maths depuis longtemps. Exigence de l'utilisateur : **un vrai cours, didactique, comme un prof particulier**, toujours en **trois niveaux (Vulgarisation, Pratique, Expert)**, qui s'appuie **autant que possible sur des manipulations** (animations d'objets mathématiques que l'élève fait bouger), et **un maximum de visualisations dans les exercices**.

**Modèle à suivre absolument** (lis ces trois fichiers en entier avant d'écrire) : l'unité Fractions
- `cours/m1-02-fractions.json` (le cours)
- `src/tr-m1-02-fractions.js` (les exercices)
- `cards/m1-02-fractions.json` (les flashcards)

Sources de contenu :
- `C:\Users\etien\drill-maths\src\content\mva911.ts`, `mva911b.ts`, `mva912.ts`, `mva912b.ts` : le programme officiel découpé en unités, déjà en trois niveaux (novice / pratique / expertise), avec exemples résolus, erreurs fréquentes, points clés et flashcards. **Pars de là, puis développe beaucoup plus** (voir les exigences).
- `C:\Users\etien\drill-maths\src\templates\*.ts` et `src\checks\qgen.ts` : idées d'exercices déjà vérifiés.
- `archive/v19/analyse/*.md` et `archive/v19/peda/*.json` : anciens cours d'Équilibre très riches (trigonométrie `tg.md`, fonctions et suites `fs-1.md`/`fs-2.md`, etc.) — réutilise leurs explications, leur histoire, leurs exemples.
- Générateurs d'exercices déjà écrits et testés, réutilisables tels quels : `docs/catalogue-generateurs.md` et les fichiers `src/tr-tg.js`, `src/tr-fs-*.js`, `src/tr-sp-*.js`, `src/tr-pr.js`, `src/ana-gen*.js` (grep pour trouver `const gXxx=`). On les reprend sous un nouvel identifiant de compétence avec `SKA('m1.xx.yy','Nom',gXxx,niveau)`.

## 1. Fichiers d'une unité

Pour une unité numéro NN du parcours `m1` ou `m2`, de sujet `slug` :
| Fichier | Contenu |
|---|---|
| `cours/<code>-<NN>-<slug>.json` | le cours (format §2) ; son `id` vaut `<code>-<slug>`, par ex. `m1-fractions` |
| `src/tr-<code>-<NN>-<slug>.js` | les exercices et la déclaration du chapitre (§4) ; le chapitre a le même `id` que le cours |
| `cards/<code>-<NN>-<slug>.json` | les flashcards (§5), clé = id du chapitre |

Le numéro NN (deux chiffres) fixe l'ordre des chapitres dans le parcours. Préfixe tous tes noms de fonctions et constantes par `gM1Xx…` / `gM2Xx…` / `M1XX_…` propres à ton unité : tout le code est assemblé dans un seul module, **un nom déjà utilisé fait échouer le build** (vérifie avec Grep dans `src/`).

## 2. Le cours (`cours/….json`)

```json
{
  "id": "m1-slug",
  "titre": "Titre complet",
  "resume": "La notion en une ou deux phrases simples.",
  "objectifs": ["verbe d’action…", "…"],
  "prerequis": ["m1-autre-unite"],
  "niveaux": { "vulgarisation": [blocs], "pratique": [blocs], "expert": [blocs] },
  "exemples": [ {"enonce": "…", "etapes": [["calcul", "justification"], …]} ],
  "pieges": [ {"faux": "…", "juste": "…", "pourquoi": "…"} ],
  "retenir": ["…"]
}
```

### Blocs (une chaîne JSON par bloc)
| Bloc | Rendu |
|---|---|
| `## Titre` / `### Sous-titre` | intertitre |
| `prof: texte` | **la voix du prof particulier** (bulle avec avatar) : il accueille, rassure, annonce le plan, anticipe la question de l'élève, explique le « pourquoi », fait le point |
| `> formule` | formule centrée (`^` et `_` pour exposants et indices, ex. `x^2`, `u_{n+1}` ; ou Unicode ², √, π…) |
| `!! texte` | idée clé encadrée |
| `analogie: texte` | image mentale |
| `attention: texte` | mise en garde |
| `histoire: texte` | mise en perspective historique (faits établis seulement) |
| `ex: ligne1\nligne2` | exemple court, une ligne de calcul par ligne |
| `? question \|\| réponse` | **« À toi »** : question d'auto-vérification, réponse révélée au toucher |
| `- a\n- b` / `1. a\n2. b` | liste / étapes numérotées |
| `@nom {"param":…} \| consigne` | **manipulation interactive** (§3) ; la consigne dit quoi faire et quoi observer |
| sinon | paragraphe ; `**gras**` et `` `formule` `` acceptés |

### Exigences pédagogiques (impératives)
- **Trois niveaux complets** et autonomes. On peut lire uniquement la vulgarisation et avoir compris l'essentiel ; la pratique donne toutes les méthodes de calcul de l'UE ; l'expert donne définitions rigoureuses, démonstrations courtes, conditions de validité, cas limites, liens avec la suite du programme.
  - **Vulgarisation** (≥ 12 blocs) : part de la vie courante, une image par notion, pourquoi la notion existe, aucun symbole non expliqué.
  - **Pratique** (≥ 15 blocs) : chaque méthode en étapes numérotées, appliquée sur un exemple, animée avec `@etapes`, puis un « ? » pour s'entraîner.
  - **Expert** (≥ 10 blocs) : rigueur, hypothèses, preuves ou justifications, « Où ça casse ».
- **Ton de prof particulier** : tutoiement chaleureux, au moins 3 blocs `prof:` par niveau (accueil et plan, explication d'un pourquoi, anticipation d'une erreur, bilan). Le prof parle à l'élève, lui pose des questions, l'encourage, fait des transitions.
- **Manipulations** : au moins **4 manipulations par cours**, réparties dans les trois niveaux, chacune placée au moment où elle éclaire l'explication, avec une consigne active (« fais glisser…, observe que… »). Chaque méthode de calcul a son `@etapes` animé.
- **Au moins 3 « ? » par niveau.**
- 3 exemples résolus, 3 à 5 pièges, 4 à 6 « à retenir », au moins un bloc `histoire:`.
- Notation française (virgule décimale, `]a ; b[`, « − »), tutoiement, pas de LaTeX, pas de HTML dans les blocs.

## 3. Manipulations disponibles (`@nom {params}`)

Formules en syntaxe du moteur : `x`, `+ - * / ^`, `sqrt(`, `exp(`, `ln(`, `log(`, `sin(`, `cos(`, `tan(`, `abs(`, `pi`, `e`. Les lettres `a b c k m n p q r t u v w` dans une formule désignent des **curseurs**.

| Nom | Paramètres | Ce que l'élève manipule |
|---|---|---|
| `courbe` | `f` (formule ou liste `[{"f":"…","nom":"g"}]`), `curseurs` `{"a":[min,max,pas,initial]}`, `x` `[x0,x1]`, `y` `[y0,y1]`, `pas`, `pasy`, `tangente` (true ou x initial), `lecture` (x initial : point mobile qui affiche f(x), sans tangente), `aire` `[a,b]`, `derivee` (true), `asymptotes` `{"v":[…],"h":[…],"o":[[m,p]]}`, `points` `[[x,y,"A"]]` | courbes paramétrées par curseurs ; tangente mobile avec pente ; aire sous la courbe avec valeur de l'intégrale ; courbe dérivée ; asymptotes |
| `etapes` | `etapes` `[["calcul","explication"],…]` | calcul animé étape par étape, lecture automatique |
| `fractions` | `n`, `d` ; ou `"mode":"somme"`, `a`,`b`,`c`,`d` | barres de fractions, fractions égales, somme au même dénominateur |
| `pourcentages` | `v`, `t`, `t2` | évolutions successives, coefficient multiplicateur, réciproque |
| `droite` | `A` `[x,y]`, `B` `[x,y]` | droite par deux points déplaçables : pente, triangle de pente, équation |
| `triangle` | `"mode":"pythagore"` ou `"thales"` ou `"trigo"` | carrés sur les côtés ; parallèle et rapports ; rapports trigonométriques |
| `vecteurs` | `u`, `v` `[x,y]`, `"mode":"scalaire"` | somme (parallélogramme), produit scalaire, projection, orthogonalité |
| `euler` | `r`, `t` (degrés), `"mode":"produit"` | z = r e^(iθ), formes algébrique/exponentielle, produit = rotation + agrandissement |
| `cercle` | — | cercle trigonométrique, cos et sin d'un angle |
| `tangente` | — | sécante qui devient tangente (nombre dérivé) |
| `variations` | — | signe de la dérivée et sens de variation |
| `limite` | — | comportement d'une fonction près d'un point / à l'infini |
| `riemann` | — | intégrale comme somme de rectangles |
| `champ` | — | champ de directions d'une équation différentielle et solutions |
| `oscillateur` | — | oscillateur amorti (équation du 2ᵈ ordre, trois régimes) |
| `parabole`, `racines` | — | parabole, discriminant, racines |
| `logarithme`, `croissance` | — | logarithme ; courbes de bˣ |
| `balance`, `inequation` | — | équation comme une balance ; sens d'une inégalité multipliée par un négatif |
| `puissances`, `racine-carree`, `developper`, `factoriser` | — | règles des puissances ; simplifier √ ; développer (aires) ; factoriser |
| `complexe`, `nombre-i` | — | point du plan complexe ; i comme quart de tour |
| `composition`, `reciproque-affine`, `intervalle`, `valeur-absolue`, `inequation-graphique`, `taylor`, `symboles` | — | voir leur nom |
| `histogramme` | `donnees` [valeurs] + `amplitude`, `amin`, `amax` ; ou `classes` `[[a,b,effectif],…]` (amplitudes inégales → bouton densité), `densite` (true) | histogramme, amplitude des classes réglable, moyenne et médiane tracées, classe modale |
| `loi-discrete` | `loi` `"binomiale"` / `"poisson"` / `"comparer"` (binomiale vs Poisson np), `n`, `p`, `lambda`, `k`, `cumul` (true) | diagramme en bâtons, P(X = k) ou P(X ≤ k) surligné, espérance et variance |
| `loi-continue` | `loi` `"normale"` / `"exponentielle"` / `"uniforme"`, `mu`, `sigma`, `lambda`, `ua`, `ub`, `a`, `b`, `x` [x0,x1], `curseurs` (false : μ, σ fixes) | densité, aire P(a ≤ X ≤ b), espérance, écart-type |
| `test` | `z`, `alpha` (ex. 0.05), `cote` `"bilateral"` / `"droite"` / `"gauche"` | loi N(0 ; 1) sous H0, zone de rejet, p-valeur, décision |
| `nuage` | `r` (lien voulu, −1 à 1), `n` | nuage de points, droite des moindres carrés, r et r², point aberrant à ajouter |
| `boite`, `position`, `dispersion` | — | boîte à moustaches et quartiles ; moyenne vs médiane face à une valeur extrême ; dispersion / écart-type |
| `tlc`, `grands-nombres`, `intervalle-confiance` | — | théorème central limite (moyennes d'échantillons) ; loi des grands nombres ; intervalles de confiance qui « attrapent » ou non la vraie valeur |
| `regression`, `arbre`, `bayes`, `pascal`, `galton`, `normale-simple` | — | régression (pente et bruit) ; arbre pondéré ; formule de Bayes (dépistage) ; triangle de Pascal ; planche de Galton (binomiale) ; loi normale simple |

`courbe` est la plus polyvalente : fonctions de référence, affines, second degré, exp/ln, limites et asymptotes, tangente et nombre dérivé, dérivée, intégrale et aire, primitive, solutions d'équations différentielles (ex. `"f":"k*exp(a*x)"`). Teste toujours que tes formules sont correctes et que la fenêtre `x`/`y` montre l'essentiel.

## 4. Les exercices (`src/tr-….js`)

API complète : `docs/GUIDE-parcours.md` §3 à §5 (`nq`, `mcq`, `exprQ`, `chain`, outils `R`, `pick`, `num`, `fr`, `mx`, `M`, `stx`, `dtab`…). Nouveautés :

- **Figures dans les énoncés** (à mettre dans `prompt`) :
  - `FIG.plot({x:[x0,x1], y:[y0,y1], f:['x^2-1', {f:'2x+1', c:1, dash:true}], pts:[[x,y,'A']], segs:[[x1,y1,x2,y2]], aire:{f:'x^2', a:0, b:1}, pas:1})`
  - `FIG.cercle({deg:[150], proj:true, noms:['M']})`
  - `FIG.triangle({noms:['A','B','C'], cotes:{AB:'5 cm', BC:'?'}, angle:'A', angleTxt:'35°'})` (rectangle en `noms[1]`)
  - `FIG.vecteurs({v:[[3,1,'u'],[1,2,'v']]})`, `FIG.complexe({z:[[2,1,'z']], cercle:2})`, `FIG.droiteNum({min, max, pts:[[x,'a']], intervalle:[a,b,ouvertA,ouvertB]})`
  - ou ton propre SVG (comme `M1_BAR` dans le modèle) : couleurs via `var(--t-sq)`, `var(--t-c)`, `var(--t-x)`, `var(--ink)`, `var(--muted)`, `var(--line)`.
- **Placer un point** : `pointQ({instr, prompt, x:[x0,x1], y:[y0,y1], snap:0.5, tol:0.26, cible:[x,y], nom:'M', fond:{f:['x^2'], pts:[[x,y,'A']], v:[[x,y,'u']], cercle:1, ligne:true, pas, etiq}, explain, hint})`. L'élève touche ou fait glisser le point. `fond.ligne:true` = droite graduée (le point reste sur l'axe). La cible doit être un multiple de `snap` et `tol < snap/2`. Idéal pour : placer un point, un sommet, une image, un nombre complexe, lire graphiquement, placer une fraction ou une solution.

Exigences :
- **8 à 12 compétences par unité**, niveaux 1 à 3, du plus simple au niveau de l'UE.
- **Au moins la moitié des compétences avec une figure** dans l'énoncé ou un `pointQ`. Au moins 1 `pointQ` quand le sujet s'y prête.
- **Au moins 2 raisonnements à choix** (`chain`) avec erreurs réalistes qui se propagent (voir le guide §4 et le modèle).
- Réponses exactes acceptées via le clavier complet (π, √, fractions, ln, e…).
- Le chapitre se déclare en fin de fichier : `ANA_UNITS.push({id:'m1-slug',tr:'m1',name:'Nom court',sub:'sous-titre',glyph:'…',tone:'c'|'x'|'sq',skills:[SKA(…),…]});`

## 5. Flashcards (`cards/….json`)

Règles de `.claude/agents/createur-flashcards.md` : toujours une question, réponse ≤ 15 mots, étiquettes `definition|formule|propriete|methode|piege|valeur|histoire`, niveau 1 à 3, **20 à 30 cartes** par unité, ids préfixés (`m1sl-01`…).

## 6. Tester (obligatoire, jusqu'à 0 échec et 0 avertissement)

```
npm run build
node tools/check.cjs dist/index.html --track m1 --n 120 --verbose
```
(`--track m2` pour MVA912.) Le banc vérifie aussi que chaque manipulation citée existe et que ses paramètres JSON sont valides, et que les trois niveaux du cours sont remplis. Valide tes JSON. Plusieurs agents travaillent en parallèle : si le build échoue à cause du fichier d'un autre agent, attends un peu et réessaie ; ne modifie jamais les fichiers des autres ni `src/core/`, `src/viz.js`, `src/fig.js`, `src/cours.js`, `tools/`, `docs/`.
