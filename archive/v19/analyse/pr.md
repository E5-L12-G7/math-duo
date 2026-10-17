# Chapitre : Pourquoi prouver : constater n’est pas démontrer
Source : parcours construit sans document source (connaissances générales, niveau lycée à début d’université)
Niveau visé : Distinguer un exemple, une conjecture, un théorème et un contre-exemple, et réfuter une affirmation générale avec un seul contre-exemple.
Prérequis : savoir ce qu’est un nombre premier (divisible seulement par 1 et par lui-même, et différent de 1) ; calcul mental de base.

## Explication pour un novice
Tu as sûrement déjà entendu : « ça marche à tous les coups, j’ai essayé ». En mathématiques, cette phrase ne suffit jamais. Pourquoi ? Parce qu’il y a une infinité de nombres, et qu’on ne pourra jamais tous les essayer. Une propriété peut marcher 40 fois de suite… et rater la 41ᵉ.
Exemple célèbre : la formule `n^2 + n + 41` donne un nombre premier pour n = 0, 1, 2, … jusqu’à 39. Quarante succès d’affilée ! Et pourtant, pour n = 40, on obtient `40^2 + 40 + 41 = 1681 = 41 × 41`, qui n’est pas premier. Quelqu’un qui se serait arrêté à 39 essais aurait cru à une loi générale, et se serait trompé.
Une affirmation qu’on pense vraie mais qu’on n’a pas encore démontrée s’appelle une **conjecture**. Quand on l’a démontrée, elle devient un **théorème** : une vérité définitive, valable pour tous les cas, même ceux que personne n’a jamais calculés. Une démonstration (ou preuve), c’est un raisonnement qui part de choses sûres et avance par étapes justifiées jusqu’à la conclusion, de sorte que personne ne puisse la contester.
Il y a une bonne nouvelle : pour montrer qu’une affirmation générale est **fausse**, c’est beaucoup plus facile. Un seul cas où elle échoue suffit. Ce cas s’appelle un **contre-exemple**. « Tous les cygnes sont blancs » tombe dès qu’on voit un seul cygne noir.
Retiens donc l’asymétrie qui va guider tout ce parcours : **mille exemples ne prouvent pas une affirmation générale, un seul contre-exemple suffit à la démolir.** Prouver, c’est trouver un argument qui couvre d’un coup tous les cas, y compris ceux qu’on n’a pas testés.

## Notions (dans l’ordre d’apprentissage)
- Proposition : une phrase mathématique qui est soit vraie, soit fausse | « 7 est premier », « 2 + 2 = 5 »
- Exemple : un cas particulier où une affirmation se vérifie ; il la rend plausible, il ne la prouve pas | n = 3 vérifie `n^2 + n + 41` premier
- Conjecture : affirmation qu’on croit vraie mais qu’on n’a pas démontrée | conjecture de Goldbach
- Théorème : affirmation démontrée, vraie dans tous les cas couverts par ses hypothèses | théorème de Pythagore
- Contre-exemple : un cas où une affirmation générale est fausse ; un seul suffit à la réfuter | n = 40 pour « `n^2 + n + 41` est toujours premier »
- Démonstration (preuve) : enchaînement d’étapes justifiées qui part d’hypothèses et de résultats connus et aboutit à la conclusion, pour tous les cas à la fois
- Hypothèse : ce qu’on suppose vrai au départ ; conclusion : ce qu’on veut obtenir

## Méthodes
### Réfuter une affirmation « pour tout »
1. Lis l’affirmation et repère ce qu’elle promet pour **tous** les cas.
2. Cherche un cas (souvent petit, ou particulier : 0, 1, un nombre négatif, une fraction entre 0 et 1) où la promesse n’est pas tenue.
3. Vérifie ce cas par un calcul complet et exact.
4. Conclus : « ce cas est un contre-exemple, donc l’affirmation est fausse ». Inutile d’en chercher d’autres.

### Face à une affirmation qui semble vraie
1. Teste quelques cas pour te faire une idée (c’est utile, pas interdit !).
2. Si tous les tests réussissent, dis honnêtement : « c’est une conjecture ».
3. Cherche ensuite un argument qui ne dépend pas d’une valeur particulière (par exemple en écrivant un nombre impair sous la forme `2k + 1` avec k entier quelconque).

## Exemples résolus
### L’affirmation « pour tout entier n ≥ 0, `n^2 + n + 11` est premier » est-elle vraie ?
- n = 0 : 11 ; n = 1 : 13 ; n = 2 : 17 ; n = 3 : 23 — tout est premier : la conjecture semble crédible.
- On teste n = 10 : `100 + 10 + 11 = 121` — on remarque que n = 10 rend l’expression égale à `11^2`.
- `121 = 11 × 11` n’est pas premier — donc n = 10 est un contre-exemple.
- L’affirmation est fausse — un seul contre-exemple suffit.

### Pourquoi 5 vérifications ne prouvent rien : les régions du cercle
- On place des points sur un cercle et on relie toutes les paires par des segments (sans que trois segments se croisent en un même point). 1, 2, 3, 4, 5 points donnent 1, 2, 4, 8, 16 régions — on devine « on double à chaque fois ».
- Avec 6 points, on compte 31 régions, et non 32 — la conjecture « `2^{n−1}` régions » est fausse.
- Morale — une régularité observée sur quelques cas n’est qu’une conjecture.

### Prouver (en avant-première) que la somme de deux entiers impairs est paire
- Les exemples 3 + 5 = 8 et 7 + 9 = 16 — rendent la propriété plausible, sans la prouver.
- Soit a et b deux entiers impairs : on écrit a = 2k + 1 et b = 2m + 1, avec k et m entiers — deux lettres différentes, car a et b ne sont pas forcément égaux.
- a + b = 2k + 2m + 2 = 2(k + m + 1) — on factorise par 2.
- k + m + 1 est un entier, donc a + b est pair — l’argument marche pour tous les impairs à la fois.

## Pièges fréquents
- Croire qu’un grand nombre d’exemples prouve une affirmation générale → les exemples donnent une conjecture ; seule une démonstration couvre tous les cas.
- Penser qu’un contre-exemple « ne compte pas » parce qu’il est rare → un seul contre-exemple suffit à rendre fausse une affirmation « pour tout ».
- Proposer comme contre-exemple un cas où l’affirmation est vraie → vérifie par le calcul que le cas fait vraiment échouer l’affirmation.
- Confondre « impair » et « premier » → 9, 15, 21 ou 1681 sont impairs mais pas premiers.
- Croire qu’une conjecture est fausse parce qu’elle n’est pas démontrée → elle est seulement « non tranchée » (exemple : Goldbach).

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu’est-ce qu’une conjecture ? | Une affirmation crue vraie mais pas encore démontrée. |
| Qu’est-ce qu’un théorème ? | Une affirmation démontrée. |
| Qu’est-ce qu’un contre-exemple ? | Un cas où une affirmation générale est fausse. |
| Combien de contre-exemples faut-il pour réfuter un « pour tout » ? | Un seul. |
| Mille exemples prouvent-ils un « pour tout » ? | Non : ils rendent seulement l’affirmation plausible. |
| Pour quel n la formule `n^2 + n + 41` cesse-t-elle de donner un premier ? | n = 40 : on obtient `1681 = 41^2`. |
| Combien de régions avec 6 points sur un cercle ? | 31, et non 32. |
| Que dit la conjecture de Goldbach ? | Tout entier pair ≥ 4 est somme de deux nombres premiers. |
| Goldbach est-elle démontrée ? | Non, seulement vérifiée par ordinateur sur d’immenses plages. |
| Qu’est-ce qu’une démonstration ? | Un enchaînement d’étapes justifiées valable pour tous les cas. |
| Comment écrire un entier impair quelconque ? | `2k + 1`, avec k entier. |
| Quel est l’ouvrage grec modèle de la démonstration ? | Les Éléments d’Euclide, vers 300 av. J.-C. |
| Que démontra Euler sur `2^{32} + 1` ? | Il est divisible par 641, donc pas premier. |

# Chapitre : Les phrases mathématiques : et, ou, non
Source : parcours construit sans document source (connaissances générales)
Niveau visé : Reconnaître une proposition, trouver la valeur de vérité de « P et Q », « P ou Q », « non P », et nier correctement une phrase composée.
Prérequis : chapitre « Pourquoi prouver » ; inégalités, pair et impair.

## Explication pour un novice
Pour raisonner juste, il faut d’abord parler juste. Les maths utilisent des phrases très particulières, appelées **propositions** : des phrases qui sont soit vraies, soit fausses, sans entre-deux. « 7 est premier » est vraie ; « 2 + 2 = 5 » est fausse. « Ferme la porte ! » ou « Quel âge as-tu ? » ne sont pas des propositions : on ne peut pas dire si elles sont vraies. Et « x + 2 = 5 » non plus, tant qu’on ne sait pas qui est x : sa vérité dépend de x.
Avec des propositions, on fabrique des phrases plus grandes grâce à trois petits mots : **et**, **ou**, **non**. « P et Q » est vraie quand les deux sont vraies, et seulement dans ce cas. « non P » est vraie exactement quand P est fausse.
Le mot qui piège tout le monde, c’est **ou**. Dans la vie, « fromage ou dessert » veut souvent dire « l’un ou l’autre, pas les deux ». En maths, « P ou Q » veut dire « **au moins une des deux** », et c’est encore vrai si les deux sont vraies. On dit que le « ou » mathématique est **inclusif**. « 6 est pair ou 6 est multiple de 3 » est vraie, même si les deux parties le sont.
Dernier outil, très utile pour la suite : **nier** une phrase, c’est écrire la phrase qui dit exactement le contraire. Le contraire de « il pleut et il fait froid », ce n’est pas « il ne pleut pas et il ne fait pas froid ». Il suffit qu’une des deux choses manque : « il ne pleut pas **ou** il ne fait pas froid ». Ce sont les **lois de De Morgan** : le « et » devient « ou », le « ou » devient « et », et on nie chaque morceau.
Attention aux inégalités : le contraire de « x > 3 » est « x ≤ 3 » (et pas « x < 3 », car x = 3 rendrait les deux phrases fausses).

## Notions (dans l’ordre d’apprentissage)
- Proposition : phrase qui est soit vraie, soit fausse | « 12 est pair »
- Phrase à variable (prédicat) : phrase dont la vérité dépend d’une lettre | « x + 2 = 5 » est vraie pour x = 3 seulement
- Négation : « non P » est vraie exactement quand P est fausse | non(x > 3) : x ≤ 3
- Conjonction : « P et Q » est vraie quand P et Q sont toutes les deux vraies | table : V seulement pour (V, V)
- Disjonction : « P ou Q » est vraie quand au moins l’une est vraie (ou inclusif) | table : F seulement pour (F, F)
- Lois de De Morgan : non(P et Q) = (non P) ou (non Q) ; non(P ou Q) = (non P) et (non Q)
- Tiers exclu : « P ou non P » est toujours vraie ; « P et non P » est toujours fausse (contradiction)

## Méthodes
### Trouver la valeur de vérité d’une phrase composée
1. Découpe la phrase en morceaux simples P, Q.
2. Détermine la valeur (vrai ou faux) de chaque morceau.
3. Applique la règle du mot de liaison : « et » exige les deux ; « ou » en exige au moins un ; « non » inverse.

### Nier une phrase composée
1. Repère le mot de liaison principal (et / ou).
2. Échange « et » et « ou ».
3. Nie chaque morceau : « pair » devient « impair », « > » devient « ≤ », « ≥ » devient « < », « = » devient « ≠ ».
4. Relis : la nouvelle phrase doit être vraie exactement quand l’ancienne est fausse.

## Exemples résolus
### Pour n = 9, la phrase « n est pair ou n > 5 » est-elle vraie ?
- « 9 est pair » est fausse — 9 = 2 × 4 + 1.
- « 9 > 5 » est vraie — au moins un morceau est vrai.
- Donc la phrase est vraie — c’est un « ou » : un morceau vrai suffit.

### Nier « n est pair et n > 10 »
- Mot principal : « et » — il devient « ou ».
- non(n pair) = « n est impair » ; non(n > 10) = « n ≤ 10 » — on nie chaque morceau, attention au « ≤ ».
- Négation : « n est impair ou n ≤ 10 » — vérification : n = 12 rend la phrase de départ vraie et la négation fausse.

### Nier « 2 ≤ x ≤ 7 »
- « 2 ≤ x ≤ 7 » signifie « x ≥ 2 et x ≤ 7 » — une double inégalité est un « et ».
- Négation : « x < 2 ou x > 7 » — x est en dehors de l’intervalle [2 ; 7].

## Pièges fréquents
- Lire « ou » comme « l’un ou l’autre mais pas les deux » → en maths, le « ou » est inclusif : vrai si au moins une partie est vraie.
- Nier « P et Q » en « non P et non Q » → c’est « non P ou non Q » (De Morgan).
- Nier « x > 3 » en « x < 3 » → c’est « x ≤ 3 » : le cas d’égalité appartient à la négation.
- Croire que « x + 2 = 5 » est fausse → ce n’est pas une proposition tant qu’on ne connaît pas x.
- Nier « n est pair » en « n est négatif » → le contraire de pair est impair, pour un entier.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu’est-ce qu’une proposition ? | Une phrase soit vraie, soit fausse. |
| Quand « P et Q » est-elle vraie ? | Quand P et Q sont toutes les deux vraies. |
| Quand « P ou Q » est-elle vraie ? | Quand au moins l’une des deux est vraie. |
| Le « ou » mathématique est-il exclusif ? | Non, inclusif : vrai aussi si les deux sont vraies. |
| Que vaut non(P et Q) ? | (non P) ou (non Q). |
| Que vaut non(P ou Q) ? | (non P) et (non Q). |
| Quelle est la négation de « x > 3 » ? | x ≤ 3. |
| Quelle est la négation de « 2 ≤ x ≤ 7 » ? | x < 2 ou x > 7. |
| « P ou non P » peut-elle être fausse ? | Non, jamais (tiers exclu). |
| Comment s’appelle « P et non P » ? | Une contradiction : toujours fausse. |
| « x + 2 = 5 » est-elle une proposition ? | Non : sa vérité dépend de x. |
| Qui a donné son nom aux lois de négation de et/ou ? | Augustus De Morgan, au XIXᵉ siècle. |

# Chapitre : L’implication : si… alors
Source : parcours construit sans document source (connaissances générales)
Niveau visé : Lire une implication (hypothèse, conclusion), savoir quand elle est vraie, former sa réciproque, parler de condition nécessaire ou suffisante et d’équivalence.
Prérequis : chapitres « Pourquoi prouver » et « Les phrases mathématiques ».

## Explication pour un novice
Presque tous les théorèmes ont la forme « **si** quelque chose, **alors** autre chose ». « Si un triangle est rectangle, alors le carré de l’hypoténuse est la somme des carrés des deux autres côtés. » La partie après « si » est l’**hypothèse**, la partie après « alors » est la **conclusion**. On écrit P ⇒ Q et on lit « P implique Q ».
Une implication est une **promesse** : « chaque fois que P est vraie, Q l’est aussi ». Comme toute promesse, elle n’est rompue que dans un seul cas : P vraie et Q fausse. Pense au parent qui dit : « Si tu as ton bac, je t’offre un vélo. » Il ment seulement si tu as le bac et pas de vélo. Si tu n’as pas le bac, il n’a rien promis : quoi qu’il fasse, il n’a pas menti.
Le piège numéro un des débutants : retourner la promesse. La **réciproque** de P ⇒ Q est Q ⇒ P. Elles n’ont rien à voir ! « Si n est multiple de 4, alors n est pair » est vraie ; sa réciproque « si n est pair, alors n est multiple de 4 » est fausse (6 est pair). Une implication vraie peut avoir une réciproque fausse.
Le vocabulaire « nécessaire / suffisant » dit la même chose autrement. Si P ⇒ Q : P est une condition **suffisante** pour Q (P suffit pour avoir Q), et Q est une condition **nécessaire** pour P (impossible d’avoir P sans Q). Être multiple de 4 suffit pour être pair ; être pair est nécessaire pour être multiple de 4.
Quand l’implication et sa réciproque sont vraies toutes les deux, on parle d’**équivalence** : P ⟺ Q, « P si et seulement si Q ». Pour prouver une équivalence, il faut donc **deux** preuves : le sens ⇒ et le sens ⇐.

## Notions (dans l’ordre d’apprentissage)
- Implication P ⇒ Q : « si P alors Q » ; fausse seulement quand P est vraie et Q fausse | table : (V,V) V ; (V,F) F ; (F,V) V ; (F,F) V
- Hypothèse : la partie P après « si » ; conclusion : la partie Q après « alors »
- Réciproque : l’implication Q ⇒ P ; elle peut être fausse même si P ⇒ Q est vraie
- Condition suffisante : si P ⇒ Q, P est suffisante pour Q
- Condition nécessaire : si P ⇒ Q, Q est nécessaire pour P
- Équivalence P ⟺ Q : P ⇒ Q et Q ⇒ P ; « P si et seulement si Q », condition nécessaire et suffisante
- Implication fausse : il suffit d’un cas où P est vraie et Q fausse (contre-exemple)

## Méthodes
### Dire si une implication est vraie
1. Si tu cherches à la réfuter : cherche un cas où **l’hypothèse est vraie et la conclusion fausse**. Un seul suffit.
2. Les cas où l’hypothèse est fausse ne disent rien : ils ne peuvent pas réfuter l’implication.
3. Pour la prouver : suppose l’hypothèse vraie (pour un objet quelconque) et déduis la conclusion.

### Prouver une équivalence
1. Écris clairement les deux sens : (⇒) P ⇒ Q et (⇐) Q ⇒ P.
2. Prouve chacun séparément.
3. Conclus « donc P ⟺ Q ».

### Nécessaire ou suffisant ?
1. Écris la flèche vraie entre A et B (A ⇒ B, B ⇒ A, les deux, ou aucune).
2. Si A ⇒ B : A est suffisante pour B. Si B ⇒ A : A est nécessaire pour B. Les deux : nécessaire et suffisante.

## Exemples résolus
### « Si x² = 9, alors x = 3 » est-elle vraie ?
- Il faut un cas où x² = 9 est vraie et x = 3 fausse — c’est le seul cas qui rompt la promesse.
- x = −3 : (−3)² = 9, mais −3 ≠ 3 — contre-exemple.
- L’implication est fausse ; en revanche sa réciproque « si x = 3 alors x² = 9 » est vraie — implication et réciproque sont indépendantes.

### « Être multiple de 6 » pour « être multiple de 3 »
- Si n = 6k, alors n = 3(2k) — donc « multiple de 6 » ⇒ « multiple de 3 ».
- 3 est multiple de 3 mais pas de 6 — donc la réciproque est fausse.
- Conclusion : « multiple de 6 » est une condition suffisante, non nécessaire, pour être multiple de 3.

### Prouver que x² = 5x ⟺ (x = 0 ou x = 5)
- (⇒) x² = 5x donne x² − 5x = 0, soit x(x − 5) = 0 — un produit est nul si et seulement si l’un des facteurs est nul : x = 0 ou x = 5.
- (⇐) Si x = 0 : 0 = 0. Si x = 5 : 25 = 25 — les deux valeurs vérifient l’équation.
- Les deux sens sont prouvés — donc l’équivalence est vraie.

## Pièges fréquents
- Prendre la réciproque pour l’implication → « si n est multiple de 4 alors pair » ne dit rien sur « si n est pair… ».
- Croire qu’un cas où l’hypothèse est fausse réfute l’implication → seul un cas « hypothèse vraie, conclusion fausse » la réfute.
- Prouver un seul sens d’une équivalence → une équivalence demande les deux sens.
- Inverser nécessaire et suffisant → si A ⇒ B, A suffit pour B ; B est nécessaire pour A.
- Écrire ⟺ entre deux lignes alors que seul ⇒ est vrai (en élevant au carré, par exemple) → vérifie que chaque flèche marche dans les deux sens avant de l’écrire.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Quand P ⇒ Q est-elle fausse ? | Seulement quand P est vraie et Q fausse. |
| Que vaut P ⇒ Q si P est fausse ? | Vrai, quelle que soit Q. |
| Quelle est la réciproque de P ⇒ Q ? | Q ⇒ P. |
| Une implication vraie a-t-elle une réciproque vraie ? | Pas forcément. |
| Si P ⇒ Q, que dit-on de P ? | P est une condition suffisante pour Q. |
| Si P ⇒ Q, que dit-on de Q ? | Q est une condition nécessaire pour P. |
| Que signifie P ⟺ Q ? | P ⇒ Q et Q ⇒ P. |
| Combien de preuves pour une équivalence ? | Deux : le sens ⇒ et le sens ⇐. |
| Comment réfuter une implication ? | Un cas où l’hypothèse est vraie et la conclusion fausse. |
| « Si x² = 4 alors x = 2 » est-elle vraie ? | Non : x = −2 est un contre-exemple. |
| Comment se lit ⟺ ? | « si et seulement si ». |
| Être pair est-il suffisant pour être multiple de 4 ? | Non : 6 est pair, pas multiple de 4. |

# Chapitre : Les quantificateurs : pour tout, il existe
Source : parcours construit sans document source (connaissances générales)
Niveau visé : Lire et écrire des phrases avec ∀ et ∃, comprendre l’importance de leur ordre, nier une phrase quantifiée et utiliser un contre-exemple ou un exemple.
Prérequis : chapitres « Les phrases mathématiques » et « L’implication ».

## Explication pour un novice
Une phrase comme « x² ≥ 0 » parle d’un x qu’on ne connaît pas. Pour en faire une vraie proposition, il faut préciser **de quels x** on parle. Deux mots servent à ça. « **Pour tout** » (symbole ∀, un A renversé, pour « all ») : la propriété doit marcher pour chaque x, sans exception. « **Il existe** » (symbole ∃, un E retourné, pour « exists ») : il suffit d’au moins un x qui marche.
« ∀x ∈ ℝ, x² ≥ 0 » est vraie : tout carré de réel est positif ou nul. « ∃x ∈ ℝ, x² = 2 » est vraie : x = √2 convient. Et « ∀x ∈ ℝ, x² > 0 » est fausse : x = 0 ne marche pas.
Pour prouver un « pour tout », il faut un argument qui marche pour un x **quelconque**. Pour prouver un « il existe », il suffit de **montrer un exemple** (et de le vérifier). Tu vois le lien avec le premier chapitre : un exemple prouve un « il existe », mais jamais un « pour tout ».
Pour **nier**, on échange les quantificateurs et on nie la propriété : le contraire de « tous les élèves ont plus de 10 » est « **il existe** un élève qui a **10 ou moins** ». Le contraire de « ∀x, P(x) » est « ∃x, non P(x) » : c’est exactement l’idée du contre-exemple !
Enfin, **l’ordre compte**. « Tout le monde a une mère » (∀ personne, ∃ mère) est vrai. « Il existe une mère de tout le monde » (∃ mère, ∀ personne) est faux. Même mots, ordre différent, sens complètement différent. Dans « ∀x ∃y », le y peut dépendre de x ; dans « ∃y ∀x », c’est le même y pour tous.

## Notions (dans l’ordre d’apprentissage)
- Quantificateur universel ∀ : « pour tout », « quel que soit » ; la propriété doit marcher sans exception | ∀x ∈ ℝ, x² ≥ 0
- Quantificateur existentiel ∃ : « il existe au moins un » | ∃x ∈ ℝ, x² = 2
- Prouver un ∃ : exhiber un exemple et le vérifier
- Prouver un ∀ : raisonner sur un élément quelconque (« Soit x un réel… »)
- Négation de ∀ : non(∀x, P(x)) = ∃x, non P(x) — c’est un contre-exemple
- Négation de ∃ : non(∃x, P(x)) = ∀x, non P(x)
- Ordre des quantificateurs : ∀x ∃y (y dépend de x) n’a pas le même sens que ∃y ∀x (un même y pour tous) | ∀x ∈ ℝ, ∃y ∈ ℝ, y > x (vrai) ; ∃y ∈ ℝ, ∀x ∈ ℝ, y > x (faux)

## Méthodes
### Nier une phrase quantifiée
1. Remplace chaque ∀ par ∃ et chaque ∃ par ∀, en gardant l’ordre et les ensembles (x ∈ ℝ reste x ∈ ℝ).
2. Nie la propriété finale (« > » devient « ≤ », « = » devient « ≠ », « et » devient « ou »…).
3. Relis à voix haute pour vérifier que c’est bien le contraire.

### Montrer qu’un « pour tout » est faux
1. Écris la négation : « il existe x tel que non P(x) ».
2. Cherche un x qui marche (essaie 0, 1, un négatif, une fraction entre 0 et 1).
3. Vérifie par un calcul et conclus.

## Exemples résolus
### « ∀x ∈ ℝ, x² ≥ x » est-elle vraie ?
- Négation : ∃x ∈ ℝ, x² < x — c’est ce qu’il faut trouver pour réfuter.
- x = 1/2 : x² = 1/4 et 1/4 < 1/2 — contre-exemple trouvé.
- La phrase est fausse — remarque : x = 2 ou x = −1 vérifient x² ≥ x, mais ne prouvent rien.

### Nier « ∀x ∈ ℝ, ∃y ∈ ℝ, x + y = 0 »
- ∀x devient ∃x, ∃y devient ∀y — on garde l’ordre.
- x + y = 0 devient x + y ≠ 0 — on nie la propriété.
- Négation : « ∃x ∈ ℝ, ∀y ∈ ℝ, x + y ≠ 0 » — elle est fausse, donc la phrase de départ est vraie (prendre y = −x).

### Traduire « f est majorée »
- Il existe un nombre M qui dépasse toutes les valeurs de f — M est choisi avant les x.
- ∃M ∈ ℝ, ∀x ∈ ℝ, f(x) ≤ M — l’ordre ∃M ∀x est essentiel : « ∀x ∃M » serait toujours vrai (M = f(x)).

## Pièges fréquents
- Nier « ∀x, P(x) » en « ∀x, non P(x) » → la négation de « tous » est « au moins un ne… pas » : ∃x, non P(x).
- Prouver un « pour tout » avec des exemples → il faut raisonner sur un x quelconque.
- Échanger ∀ et ∃ sans réfléchir → « ∀x ∃y » et « ∃y ∀x » ont des sens différents.
- Oublier l’ensemble (x ∈ ℝ, n ∈ ℕ) → la même phrase peut être vraie dans ℕ et fausse dans ℤ.
- Oublier de nier la propriété en changeant les quantificateurs → on change les quantificateurs ET on nie la propriété.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Comment se lit ∀ ? | « pour tout », « quel que soit ». |
| Comment se lit ∃ ? | « il existe (au moins un) ». |
| Quelle est la négation de « ∀x, P(x) » ? | ∃x, non P(x). |
| Quelle est la négation de « ∃x, P(x) » ? | ∀x, non P(x). |
| Comment prouver un « il existe » ? | Donner un exemple et le vérifier. |
| Comment prouver un « pour tout » ? | Raisonner sur un élément quelconque. |
| « ∀x ∈ ℝ, x² > 0 » est-elle vraie ? | Non : x = 0. |
| « ∀x ∃y, y > x » et « ∃y ∀x, y > x » ont-elles le même sens ? | Non : la première est vraie, la seconde fausse (dans ℝ). |
| Comment traduire « f est majorée » ? | ∃M ∈ ℝ, ∀x ∈ ℝ, f(x) ≤ M. |
| Comment traduire « f s’annule » ? | ∃x ∈ ℝ, f(x) = 0. |
| Quelle est la négation de « tous les élèves ont plus de 10 » ? | Au moins un élève a 10 ou moins. |
| D’où vient le symbole ∀ ? | D’un A renversé, pour « all » (tous). |

# Chapitre : La preuve directe
Source : parcours construit sans document source (connaissances générales)
Niveau visé : Rédiger une preuve directe complète (« Soit… On suppose… Donc… ») sur la parité, la divisibilité et les inégalités, en justifiant chaque étape.
Prérequis : chapitres sur l’implication et les quantificateurs ; développer, factoriser.

## Explication pour un novice
La preuve directe, c’est le chemin le plus naturel : on part de ce qu’on sait (l’hypothèse) et on avance, pas à pas, jusqu’à ce qu’on veut (la conclusion). Comme une recette : chaque étape découle de la précédente, et on dit **pourquoi**.
Le premier geste est toujours le même : **fixer un objet quelconque**. Pour prouver « pour tout entier n impair, n² est impair », on écrit : « Soit n un entier impair. » Ce n n’est pas 3 ni 7 : c’est un impair quelconque, sur lequel on ne sait rien d’autre. Tout ce qu’on va prouver pour lui vaudra donc pour tous les impairs.
Deuxième geste : **traduire les mots en calcul**. « n est pair » signifie « il existe un entier k tel que n = 2k ». « n est impair » : « il existe un entier k tel que n = 2k + 1 ». « a divise b » (on écrit a∣b) : « il existe un entier k tel que b = ka ». Ces traductions sont les briques de toutes les preuves d’arithmétique.
Troisième geste : **calculer** jusqu’à faire apparaître la forme voulue. Pour montrer qu’un nombre est pair, on veut l’écrire 2 × (un entier). Ici n² = (2k + 1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1. Comme 2k² + 2k est un entier, n² est impair.
Dernier geste : **conclure** par une phrase qui répond exactement à la question. Pour les inégalités, l’idée la plus puissante est d’étudier la **différence** : pour montrer A ≥ B, on montre A − B ≥ 0, souvent en reconnaissant un carré, car un carré est toujours positif ou nul.

## Notions (dans l’ordre d’apprentissage)
- Preuve directe : on suppose l’hypothèse et on en déduit la conclusion par étapes justifiées
- « Soit… » : introduit un objet quelconque (pour prouver un « pour tout »)
- Pair : n est pair s’il existe un entier k tel que n = 2k | 14 = 2 × 7
- Impair : n est impair s’il existe un entier k tel que n = 2k + 1 | 15 = 2 × 7 + 1
- Divisibilité : a divise b (a∣b) s’il existe un entier k tel que b = ka | 3∣12 car 12 = 4 × 3
- Méthode de la différence : A ≥ B ⟺ A − B ≥ 0
- Un carré est positif ou nul : pour tout réel t, t² ≥ 0

## Méthodes
### Rédiger une preuve directe
1. « Soit … » : introduis les objets, quelconques.
2. « On suppose que … » : écris l’hypothèse.
3. Traduis l’hypothèse en calcul (n = 2k + 1, b = ka…), avec une **nouvelle lettre** pour chaque objet.
4. Calcule en justifiant chaque passage (développement, factorisation, règle des inégalités).
5. Fais apparaître la forme voulue, puis conclus : « Donc … ».

### Prouver une inégalité A ≥ B
1. Calcule A − B.
2. Mets-la sous une forme dont le signe se voit : un carré, un quotient de quantités positives…
3. Justifie le signe, en citant les hypothèses utiles (par exemple x > 0).
4. Conclus A − B ≥ 0, donc A ≥ B.

## Exemples résolus
### Montrer que le carré d’un entier impair est impair
- Soit n un entier impair — n est quelconque.
- Il existe un entier k tel que n = 2k + 1 — définition d’impair.
- n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1 — on développe, puis on factorise par 2 les premiers termes.
- 2k² + 2k est un entier, donc n² est impair — c’est la forme 2 × (entier) + 1.

### Montrer que si a∣b et b∣c, alors a∣c
- Soit a, b, c des entiers ; on suppose a∣b et b∣c — hypothèses.
- Il existe des entiers k et m tels que b = ka et c = mb — deux lettres différentes.
- c = m(ka) = (mk)a — on remplace b.
- mk est un entier, donc a∣c — définition de la divisibilité.

### Montrer que pour tout réel x > 0, x + 1/x ≥ 2
- x + 1/x − 2 = (x² − 2x + 1)/x = (x − 1)²/x — on réduit au même dénominateur.
- (x − 1)² ≥ 0 car c’est un carré, et x > 0 par hypothèse — un quotient d’un nombre positif ou nul par un nombre strictement positif est positif ou nul.
- Donc x + 1/x − 2 ≥ 0, soit x + 1/x ≥ 2 — l’hypothèse x > 0 était indispensable (x = −1 donne −2).

## Pièges fréquents
- Commencer par « Prenons n = 3 » → c’est un exemple ; écris « Soit n un entier quelconque ».
- Utiliser la même lettre pour deux objets (a = 2k + 1 et b = 2k + 1) → cela impose a = b ; prends k et m.
- Écrire « n = 2k » sans dire que k est un entier → précise toujours « il existe un entier k tel que… ».
- Inverser la divisibilité (a∣b traduit en a = kb) → a∣b signifie b = ka : b est le multiple.
- Partir de la conclusion pour arriver à quelque chose de vrai → ça ne prouve rien si les étapes ne sont pas des équivalences ; pars de l’hypothèse.
- Oublier l’hypothèse de signe dans une inégalité → multiplier ou diviser par un nombre négatif change le sens.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Comment commence une preuve d’un « pour tout » ? | « Soit … quelconque ». |
| Comment traduire « n est pair » ? | Il existe un entier k tel que n = 2k. |
| Comment traduire « n est impair » ? | Il existe un entier k tel que n = 2k + 1. |
| Comment traduire « a divise b » ? | Il existe un entier k tel que b = ka. |
| Que vaut (2k + 1)² ? | 4k² + 4k + 1 = 2(2k² + 2k) + 1. |
| Comment prouver A ≥ B ? | Montrer que A − B ≥ 0. |
| Pourquoi a² + b² ≥ 2ab ? | Car a² + b² − 2ab = (a − b)² ≥ 0. |
| Deux impairs a et b : quelles écritures ? | a = 2k + 1 et b = 2m + 1, deux lettres. |
| Si a∣b et b∣c, que conclut-on ? | a∣c. |
| Si x < 2, que dire de −x ? | −x > −2 : multiplier par −1 change le sens. |
| Comment finit une preuve ? | Par une phrase qui répond exactement à la question. |

# Chapitre : La disjonction de cas
Source : parcours construit sans document source (connaissances générales)
Niveau visé : Découper un problème en cas qui couvrent toutes les possibilités (pair/impair, restes, signe), traiter chaque cas et conclure.
Prérequis : chapitre « La preuve directe » ; le « ou » inclusif.

## Explication pour un novice
Parfois, on ne sait pas traiter tous les cas d’un seul coup, mais on sait les traiter « par paquets ». Par exemple, pour montrer que n(n + 1) est toujours pair : si n est pair, c’est facile ; si n est impair, alors n + 1 est pair, c’est facile aussi. Comme tout entier est pair **ou** impair, on a couvert tous les cas. C’est la **disjonction de cas**.
La règle d’or : les cas doivent **couvrir toutes les possibilités**. « x > 0 ou x < 0 » oublie x = 0. « n = 3k ou n = 3k + 1 » oublie n = 3k + 2. Un cas oublié, et la preuve a un trou. Les cas peuvent se chevaucher (x ≥ 0 et x ≤ 0 partagent 0), ce n’est pas grave ; ce qui est grave, c’est d’en oublier un.
Les découpages les plus courants : **pair / impair** ; les **restes** dans une division (tout entier s’écrit 3k, 3k + 1 ou 3k + 2) ; le **signe** (x ≥ 0 ou x < 0), surtout avec la valeur absolue, qui est elle-même définie par cas : |x| = x si x ≥ 0, et |x| = −x si x < 0.
Pense à un aiguillage de train : à chaque bifurcation, tous les trains passent par une voie ou par l’autre. Si toutes les voies mènent à la même gare, tous les trains y arrivent. La conclusion finale commence donc toujours par « **Dans tous les cas**… ».

## Notions (dans l’ordre d’apprentissage)
- Disjonction de cas : si (A ou B) est toujours vraie, et si A ⇒ C et B ⇒ C, alors C est vraie
- Cas exhaustifs : les cas couvrent toutes les possibilités (aucun oublié)
- Parité : tout entier est pair ou impair
- Division euclidienne par m : tout entier n s’écrit n = mk + r avec r ∈ {0, 1, …, m − 1} | par 3 : 3k, 3k + 1 ou 3k + 2
- Valeur absolue : |x| = x si x ≥ 0 et |x| = −x si x < 0
- Conclusion : « dans tous les cas, … »

## Méthodes
### Raisonner par disjonction de cas
1. Choisis un découpage adapté à la question (pair/impair pour la parité, restes modulo 3 pour la divisibilité par 3, signe pour une valeur absolue).
2. Vérifie que les cas couvrent tout.
3. Traite chaque cas séparément, comme une petite preuve directe.
4. Conclus : « dans tous les cas, … ».

### Trouver le reste d’un carré
1. Écris n = mk + r pour chaque reste r possible.
2. Développe n² et regroupe les multiples de m : n² = m × (entier) + r², puis réduis r² si r² ≥ m.
3. Liste les restes obtenus.

## Exemples résolus
### Montrer que n(n + 1) est pair pour tout entier n
- Cas 1 : n pair, n = 2k — n(n + 1) = 2k(2k + 1) = 2[k(2k + 1)], pair.
- Cas 2 : n impair, n = 2k + 1 — n + 1 = 2k + 2 = 2(k + 1), donc n(n + 1) = 2(2k + 1)(k + 1), pair.
- Tout entier est pair ou impair — les deux cas couvrent tout.
- Dans tous les cas, n(n + 1) est pair.

### Un carré n’est jamais de la forme 3k + 2
- n = 3k : n² = 9k² = 3(3k²) — reste 0.
- n = 3k + 1 : n² = 9k² + 6k + 1 = 3(3k² + 2k) + 1 — reste 1.
- n = 3k + 2 : n² = 9k² + 12k + 4 = 3(3k² + 4k + 1) + 1 — reste 1 (et non 4 : on réduit).
- Dans tous les cas, le reste de n² dans la division par 3 est 0 ou 1 — jamais 2.

### Résoudre |x − 4| = 3
- Cas x ≥ 4 : |x − 4| = x − 4, donc x − 4 = 3 et x = 7 — 7 ≥ 4, la solution est valable.
- Cas x < 4 : |x − 4| = 4 − x, donc 4 − x = 3 et x = 1 — 1 < 4, valable.
- Solutions : 1 et 7 — on rassemble les cas.

## Pièges fréquents
- Oublier un cas (x = 0, le reste 2…) → vérifie que tes cas couvrent tout avant de commencer.
- Découper selon le signe de x alors que la valeur absolue porte sur x − a → découpe selon le signe de ce qui est dans la valeur absolue.
- Laisser un « reste » plus grand que le diviseur (n² = 3q + 4) → réduis : 3q + 4 = 3(q + 1) + 1.
- Garder une solution qui n’appartient pas au cas étudié → vérifie que chaque solution respecte la condition de son cas.
- Conclure après un seul cas → il faut traiter tous les cas avant de conclure.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Quelle est la règle d’or de la disjonction de cas ? | Les cas doivent couvrir toutes les possibilités. |
| Quels cas pour la divisibilité par 3 ? | n = 3k, 3k + 1 ou 3k + 2. |
| Que vaut |x| si x < 0 ? | −x. |
| Quel cas oublie « x > 0 ou x < 0 » ? | x = 0. |
| n(n + 1) est-il toujours pair ? | Oui : l’un des deux facteurs est pair. |
| Quels restes peut avoir un carré modulo 3 ? | 0 ou 1. |
| Quels restes peut avoir un carré modulo 4 ? | 0 ou 1. |
| Par quels chiffres peut finir un carré ? | 0, 1, 4, 5, 6 ou 9. |
| Comment commence la conclusion d’une disjonction de cas ? | « Dans tous les cas… ». |
| Les cas peuvent-ils se chevaucher ? | Oui, l’essentiel est de n’en oublier aucun. |

# Chapitre : La contraposée
Source : parcours construit sans document source (connaissances générales)
Niveau visé : Former la contraposée d’une implication, savoir qu’elle lui est équivalente, et l’utiliser pour prouver une implication difficile à attaquer directement.
Prérequis : chapitres « L’implication », « Les phrases mathématiques » (négations), « La preuve directe », « La disjonction de cas ».

## Explication pour un novice
« S’il pleut, le sol est mouillé. » Si tu vois que le sol est **sec**, tu en déduis qu’il ne pleut **pas**. Tu viens d’utiliser la **contraposée** : « si le sol n’est pas mouillé, alors il ne pleut pas ».
La contraposée de P ⇒ Q est **non Q ⇒ non P** : on échange les deux parties **et** on les nie. Elle dit exactement la même chose que l’implication de départ : elles sont vraies ou fausses en même temps. Ce n’est pas la réciproque (Q ⇒ P), qui, elle, peut être fausse ! « S’il pleut, le sol est mouillé » ne permet pas de dire « si le sol est mouillé, il pleut » (quelqu’un a peut-être arrosé).
Pourquoi c’est utile ? Parce que parfois une implication est difficile à prouver dans un sens, et facile dans l’autre. Exemple : « si n² est pair, alors n est pair ». Directement, on part de n² = 2k… et on est coincé (n = √(2k) ? ce n’est même pas visiblement un entier). La contraposée : « si n est impair, alors n² est impair ». Ça, on sait le faire : n = 2k + 1, n² = 2(2k² + 2k) + 1. Et comme la contraposée est vraie, l’implication de départ l’est aussi.
Pour rédiger : « Raisonnons par contraposée. Supposons non Q. … Donc non P. » Attention à bien nier : la négation de « a et b sont impairs » est « a est pair **ou** b est pair » (De Morgan, chapitre 2), et la négation d’un « pour tout » est un « il existe » (chapitre 4).

## Notions (dans l’ordre d’apprentissage)
- Contraposée de P ⇒ Q : l’implication non Q ⇒ non P
- Équivalence avec l’implication : P ⇒ Q et non Q ⇒ non P ont toujours la même valeur de vérité
- Réciproque Q ⇒ P : à ne pas confondre avec la contraposée ; elle peut être fausse
- Inverse non P ⇒ non Q : c’est la contraposée de la réciproque, donc équivalente à la réciproque, pas à l’implication
- Raisonnement par contraposée : pour prouver P ⇒ Q, on suppose non Q et on démontre non P

## Méthodes
### Prouver P ⇒ Q par contraposée
1. Écris non P et non Q (attention aux négations : et/ou, ∀/∃, inégalités).
2. Annonce : « Raisonnons par contraposée : montrons que non Q ⇒ non P. »
3. Suppose non Q et fais une preuve directe jusqu’à non P.
4. Conclus : « la contraposée est vraie, donc P ⇒ Q est vraie ».

### Quand penser à la contraposée ?
1. Quand l’hypothèse donne peu de prise (n² pair, un produit, « pour tout ε > 0 »…).
2. Quand la négation de la conclusion se traduit facilement en calcul (n impair : n = 2k + 1).

## Exemples résolus
### Montrer que si n² est pair, alors n est pair
- Contraposée : si n est impair, alors n² est impair — on échange et on nie.
- Soit n impair : n = 2k + 1, n² = 2(2k² + 2k) + 1 — n² est impair.
- La contraposée est vraie, donc l’implication aussi — elles sont équivalentes.

### Montrer que si n² est multiple de 3, alors n est multiple de 3
- Contraposée : si n n’est pas multiple de 3, alors n² n’est pas multiple de 3.
- Si n = 3k + 1 : n² = 3(3k² + 2k) + 1 — pas multiple de 3.
- Si n = 3k + 2 : n² = 3(3k² + 4k + 1) + 1 — pas multiple de 3.
- Dans les deux cas, n² n’est pas multiple de 3 — donc l’implication est prouvée (disjonction de cas à l’intérieur d’une contraposée).

### Montrer que si |x| ≤ ε pour tout ε > 0, alors x = 0
- Contraposée : si x ≠ 0, alors il existe ε > 0 tel que |x| > ε — la négation de « pour tout ε » est « il existe ε ».
- On prend ε = |x|/2 : il est > 0 car x ≠ 0, et |x| > |x|/2 — exemple explicite.
- Donc la contraposée est vraie, et l’implication aussi.

## Pièges fréquents
- Confondre contraposée (non Q ⇒ non P) et réciproque (Q ⇒ P) → la contraposée échange ET nie.
- Écrire non P ⇒ non Q (l’inverse) → ce n’est pas équivalent à P ⇒ Q.
- Mal nier « a et b sont impairs » → « a est pair ou b est pair ».
- Prouver la réciproque en croyant prouver l’implication (« si n pair, n² pair ») → vérifie le sens de ta flèche.
- Confondre contraposée et absurde → par contraposée, on suppose seulement non Q et on vise non P.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Quelle est la contraposée de P ⇒ Q ? | non Q ⇒ non P. |
| La contraposée est-elle équivalente à l’implication ? | Oui, toujours. |
| La réciproque est-elle équivalente à l’implication ? | Non. |
| Que suppose-t-on dans une preuve par contraposée de P ⇒ Q ? | non Q. |
| Contraposée de « si n² pair, n pair » ? | Si n impair, alors n² impair. |
| Négation de « a et b impairs » ? | a pair ou b pair. |
| De quoi « non P ⇒ non Q » est-elle la contraposée ? | De la réciproque Q ⇒ P. |
| Contraposée de « s’il pleut, le sol est mouillé » ? | Si le sol est sec, il ne pleut pas. |
| Pourquoi utiliser la contraposée pour « n² pair ⇒ n pair » ? | n impair = 2k + 1 se calcule facilement. |
| Quelle est la contraposée de la contraposée ? | L’implication de départ. |

# Chapitre : Le raisonnement par l’absurde
Source : parcours construit sans document source (connaissances générales)
Niveau visé : Prouver une proposition en supposant son contraire et en aboutissant à une contradiction ; démontrer l’irrationalité de √2 et l’infinité des nombres premiers.
Prérequis : chapitres sur la négation, les quantificateurs, la preuve directe et la contraposée.

## Explication pour un novice
Imagine un détective : « Supposons que le majordome soit coupable. Alors il était dans la bibliothèque à 22 h. Or, à 22 h, il était filmé au marché. C’est impossible. Donc le majordome n’est pas coupable. » C’est exactement le **raisonnement par l’absurde** : pour prouver P, on suppose **non P**, on raisonne correctement, et on tombe sur une **contradiction** (quelque chose d’impossible, du type « A et non A »). Comme un raisonnement correct ne peut pas mener à l’impossible à partir d’une supposition vraie, c’est que la supposition était fausse : non P est fausse, donc P est vraie.
C’est la méthode reine pour les énoncés **négatifs** : « il n’existe pas… », « … n’est pas rationnel », « il n’y a pas de plus grand… ». Ces phrases donnent peu de prise ; leur contraire, lui, donne quelque chose de concret à manipuler. « √2 n’est pas une fraction » : par l’absurde, on suppose √2 = p/q, et on peut calculer avec p et q.
Deux preuves célèbres sont au programme de ce chapitre. **√2 est irrationnel** : si √2 = p/q irréductible, alors p² = 2q², donc p est pair, puis q aussi : p/q n’était pas irréductible. Contradiction. **Il y a une infinité de nombres premiers** : si la liste p₁, …, pₖ était complète, le nombre N = p₁ × … × pₖ + 1 aurait un diviseur premier qui, étant dans la liste, diviserait aussi le produit, donc diviserait 1. Impossible.
Différence avec la contraposée : par contraposée, pour prouver P ⇒ Q, on suppose non Q et on vise **non P**, un objectif précis. Par l’absurde, on suppose **P et non Q** (ou simplement non P pour une proposition seule) et on vise **n’importe quelle contradiction**.

## Notions (dans l’ordre d’apprentissage)
- Contradiction : une proposition toujours fausse, du type « A et non A »
- Raisonnement par l’absurde : pour prouver P, on suppose non P et on déduit une contradiction ; donc P est vraie
- Nombre rationnel : quotient p/q d’entiers (q ≠ 0) ; on peut toujours choisir la fraction irréductible
- Nombre irrationnel : réel qui n’est pas rationnel | √2, π
- Lemme : si p² est pair, alors p est pair (prouvé par contraposée)
- Tout entier N ≥ 2 a au moins un diviseur premier
- Absurde pour une implication P ⇒ Q : on suppose P et non Q, et on cherche une contradiction

## Méthodes
### Rédiger un raisonnement par l’absurde
1. Annonce : « Raisonnons par l’absurde et supposons que … (la négation exacte) ».
2. Traduis cette supposition en objets concrets (une fraction p/q, une liste finie, un plus grand élément…).
3. Déduis, par étapes justifiées, jusqu’à une contradiction (avec une hypothèse, une définition ou un fait connu).
4. Conclus : « C’est absurde, donc la supposition est fausse : … est vraie. »

### Montrer qu’un nombre est irrationnel
1. Suppose qu’il s’écrit p/q, avec p et q entiers, q ≠ 0, fraction irréductible.
2. Élimine les racines (élève au carré) pour obtenir une égalité entre entiers.
3. Montre qu’un même nombre premier divise p et q : contradiction avec « irréductible ».

## Exemples résolus
### Montrer que √2 est irrationnel
- Supposons √2 = p/q, avec p, q entiers, q ≠ 0, et p/q irréductible — négation de « irrationnel ».
- 2 = p²/q², donc p² = 2q² — on élève au carré.
- p² est pair, donc p est pair (contraposée du chapitre précédent) : p = 2k — et non « car si p pair alors p² pair », qui serait la réciproque.
- 4k² = 2q², donc q² = 2k² : q² est pair, donc q est pair — même argument.
- p et q sont tous deux pairs : p/q n’est pas irréductible — contradiction ; donc √2 est irrationnel.

### Montrer qu’il existe une infinité de nombres premiers
- Supposons qu’il n’y en ait qu’un nombre fini : p₁, p₂, …, pₖ — négation de « infinité ».
- Posons N = p₁ × p₂ × … × pₖ + 1 — N ≥ 2.
- N a un diviseur premier p, qui est l’un des pᵢ ; p divise le produit et N, donc divise leur différence 1 — impossible.
- Donc il y a une infinité de nombres premiers — attention : N n’est pas forcément premier (2 × 3 × 5 × 7 × 11 × 13 + 1 = 30 031 = 59 × 509).

### Il n’y a pas de plus petit réel strictement positif
- Supposons qu’il existe un plus petit réel ε > 0 — négation.
- ε/2 est un réel, ε/2 > 0 et ε/2 < ε — on fabrique plus petit.
- Contradiction avec « ε est le plus petit » — donc il n’existe pas de plus petit réel strictement positif.

## Pièges fréquents
- Mal écrire la supposition (supposer la proposition elle-même, ou une négation fausse) → écris la négation exacte, avec les règles des chapitres 2 et 4.
- Oublier « irréductible » dans la preuve de √2 → sans elle, « p et q pairs » n’est pas une contradiction.
- Justifier « p² pair donc p pair » par la réciproque → c’est la contraposée de « p impair ⇒ p² impair ».
- Croire que N = p₁ × … × pₖ + 1 est toujours premier → il a seulement un diviseur premier hors de la liste.
- Conclure sans avoir trouvé de vraie contradiction → nomme précisément les deux affirmations incompatibles.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Que suppose-t-on pour prouver P par l’absurde ? | non P. |
| Qu’est-ce qu’une contradiction ? | Une affirmation du type « A et non A », toujours fausse. |
| Première ligne de la preuve de « √2 irrationnel » ? | Supposons √2 = p/q irréductible. |
| Quelle égalité obtient-on pour √2 = p/q ? | p² = 2q². |
| Quelle est la contradiction pour √2 ? | p et q pairs, alors que p/q est irréductible. |
| Quel nombre construit Euclide ? | Le produit des premiers de la liste, plus 1. |
| 2 × 3 × 5 × 7 × 11 × 13 + 1 est-il premier ? | Non : 30 031 = 59 × 509. |
| Qui a écrit la preuve de l’infinité des premiers ? | Euclide, dans les Éléments (livre IX). |
| Absurde ou contraposée pour P ⇒ Q : que suppose-t-on ? | Absurde : P et non Q ; contraposée : non Q. |
| Rationnel plus irrationnel : quel type de nombre ? | Irrationnel. |

# Chapitre : Le raisonnement par récurrence
Source : parcours construit sans document source (connaissances générales)
Niveau visé : Rédiger une récurrence complète (initialisation, hérédité, conclusion) pour une somme, une divisibilité ou une inégalité, et repérer les fausses récurrences.
Prérequis : chapitres sur l’implication, les quantificateurs et la preuve directe ; suites définies par récurrence.

## Explication pour un novice
Imagine une rangée infinie de dominos. Pour être sûr qu’ils tombent **tous**, il suffit de deux choses : que le **premier** tombe, et que **chaque domino, en tombant, fasse tomber le suivant**. Pas besoin de les surveiller un par un. C’est tout le principe du **raisonnement par récurrence**.
En maths, les dominos sont des propositions P(0), P(1), P(2)… qui dépendent d’un entier n. On prouve : (1) l’**initialisation** : P(0) est vraie (le premier domino tombe) ; (2) l’**hérédité** : pour un n quelconque, **si** P(n) est vraie, **alors** P(n + 1) est vraie (chaque domino fait tomber le suivant). On conclut : P(n) est vraie pour tout n.
Le point délicat est l’hérédité. On **suppose** P(n) vraie pour **un** n fixé (c’est l’hypothèse de récurrence), et on s’en sert pour prouver P(n + 1). On ne suppose surtout pas « P(n) vraie pour tout n » : ce serait supposer ce qu’on veut prouver. L’hérédité est une implication P(n) ⇒ P(n + 1), comme au chapitre 3.
Les deux étapes sont indispensables. Sans initialisation, l’hérédité seule peut « prouver » des faussetés : « n = n + 1 » se transmet parfaitement de n à n + 1… mais n’est jamais vraie. Et une hérédité qui casse à un seul endroit suffit à tout ruiner : c’est le cas du célèbre paradoxe « tous les chevaux ont la même couleur ».
Exemple typique : 1 + 2 + … + n = n(n + 1)/2. Initialisation : pour n = 1, 1 = 1 × 2/2. Hérédité : si 1 + … + n = n(n + 1)/2, alors 1 + … + n + (n + 1) = n(n + 1)/2 + (n + 1) = (n + 1)(n + 2)/2, ce qui est la formule au rang n + 1.

## Notions (dans l’ordre d’apprentissage)
- Propriété P(n) : une proposition qui dépend d’un entier n
- Initialisation : on vérifie P(n₀) au premier rang n₀
- Hypothèse de récurrence : on suppose P(n) vraie pour un entier n ≥ n₀ fixé
- Hérédité : on démontre que P(n) ⇒ P(n + 1) pour tout n ≥ n₀
- Conclusion : P(n) est vraie pour tout entier n ≥ n₀
- Somme des entiers : 1 + 2 + … + n = n(n + 1)/2
- Somme des impairs : 1 + 3 + … + (2n − 1) = n²

## Méthodes
### Rédiger une récurrence
1. Énonce P(n) clairement, et le premier rang n₀.
2. Initialisation : calcule séparément les deux membres pour n = n₀ et constate l’égalité (ou l’inégalité).
3. Hérédité : « Soit n ≥ n₀ fixé. Supposons P(n). Montrons P(n + 1). » Écris ce que tu dois obtenir.
4. Fais apparaître l’expression du rang n dans celle du rang n + 1 (une somme gagne un terme, une puissance gagne un facteur), puis utilise l’hypothèse.
5. Conclusion : « par récurrence, P(n) est vraie pour tout n ≥ n₀ ».

### Vérifier une récurrence (la tienne ou celle d’un autre)
1. L’initialisation est-elle faite, et juste ?
2. L’hérédité suppose-t-elle P(n) pour un seul n (et pas pour tout n) ?
3. Chaque étape de l’hérédité marche-t-elle pour **tous** les n ≥ n₀, y compris le premier ?

## Exemples résolus
### Montrer que 1 + 3 + … + (2n − 1) = n² pour tout n ≥ 1
- Initialisation : pour n = 1, la somme vaut 1 et 1² = 1 — P(1) est vraie.
- Hérédité : soit n ≥ 1 fixé, on suppose 1 + 3 + … + (2n − 1) = n² — hypothèse de récurrence.
- Au rang n + 1, on ajoute le terme suivant 2(n + 1) − 1 = 2n + 1 : la somme vaut n² + 2n + 1 = (n + 1)² — c’est P(n + 1).
- Par récurrence, la formule est vraie pour tout n ≥ 1.

### Montrer que 7ⁿ − 1 est divisible par 6 pour tout n ≥ 0
- Initialisation : 7⁰ − 1 = 0 = 6 × 0 — divisible par 6.
- Hérédité : on suppose 7ⁿ − 1 = 6k avec k entier, donc 7ⁿ = 6k + 1.
- 7ⁿ⁺¹ − 1 = 7 × 7ⁿ − 1 = 7(6k + 1) − 1 = 42k + 6 = 6(7k + 1) — divisible par 6.
- Par récurrence, 7ⁿ − 1 est divisible par 6 pour tout n.

### Où est l’erreur dans « tous les chevaux ont la même couleur » ?
- Hérédité proposée : dans un groupe de n + 1 chevaux, les n premiers ont la même couleur, les n derniers aussi, et les deux groupes se chevauchent.
- Pour n = 1 (passage de 1 à 2 chevaux), les deux groupes d’un cheval n’ont aucun cheval en commun — l’hérédité casse exactement là.
- L’initialisation est juste mais l’hérédité n’est pas valable pour tout n — la « preuve » est fausse.

## Pièges fréquents
- Oublier l’initialisation → l’hérédité seule ne prouve rien (n = n + 1 est héréditaire mais toujours fausse).
- Supposer « P(n) pour tout n » dans l’hérédité → on suppose P(n) pour un n fixé.
- Se tromper de terme ajouté au rang n + 1 → remplace n par n + 1 dans le terme général : 2(n + 1) − 1 = 2n + 1.
- Écrire 7ⁿ⁺¹ = 7ⁿ + 7 → 7ⁿ⁺¹ = 7 × 7ⁿ.
- Une hérédité valable seulement à partir d’un certain rang → vérifie le premier passage (chevaux : de 1 à 2).
- Croire que vérifier les 100 premiers cas suffit → c’est une conjecture, pas une récurrence.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Quelles sont les deux étapes d’une récurrence ? | Initialisation et hérédité. |
| Que montre l’initialisation ? | P(n₀) est vraie au premier rang. |
| Que montre l’hérédité ? | Pour tout n ≥ n₀, P(n) ⇒ P(n + 1). |
| Que suppose-t-on dans l’hérédité ? | P(n) pour un n fixé. |
| Que vaut 1 + 2 + … + n ? | n(n + 1)/2. |
| Que vaut 1 + 3 + … + (2n − 1) ? | n². |
| Quelle image représente la récurrence ? | Une rangée de dominos. |
| L’hérédité seule suffit-elle ? | Non : il faut aussi l’initialisation. |
| Où casse la preuve « tous les chevaux ont la même couleur » ? | Au passage de 1 à 2 chevaux. |
| Comment écrire 7ⁿ⁺¹ à partir de 7ⁿ ? | 7 × 7ⁿ. |
| Qui a utilisé la récurrence dans son traité du triangle arithmétique ? | Blaise Pascal, au XVIIᵉ siècle. |

# Chapitre : Existence, unicité et analyse-synthèse
Source : parcours construit sans document source (connaissances générales)
Niveau visé : Prouver séparément l’existence et l’unicité d’un objet, et utiliser la méthode d’analyse-synthèse pour trouver et justifier toutes les solutions d’un problème.
Prérequis : chapitres sur les quantificateurs, l’implication (équivalence) et la preuve directe ; fonctions paires et impaires.

## Explication pour un novice
« Il existe un unique… » est une phrase qui contient **deux** promesses. **Existence** : il y en a au moins un. **Unicité** : il n’y en a pas deux différents. On écrit ∃! (« il existe un et un seul »). Ce sont deux preuves distinctes, et beaucoup d’erreurs viennent de ce qu’on n’en fait qu’une.
Pour l’existence, on **construit** ou on **montre** l’objet, puis on vérifie qu’il convient. Pour l’unicité, l’astuce classique est de **supposer qu’il y en a deux**, disons x et y, et de prouver que x = y. Exemple : l’équation 3x + 2 = 11. Existence : x = 3 convient (3 × 3 + 2 = 11). Unicité : si 3x + 2 = 11 et 3y + 2 = 11, alors 3x = 3y, donc x = y (on peut diviser par 3 car 3 ≠ 0).
Mais comment **trouver** l’objet, quand on n’a aucune idée ? C’est le rôle de l’**analyse-synthèse**, une méthode vieille de plus de 1 600 ans. **Analyse** : on suppose qu’une solution existe, et on en tire des conditions nécessaires, jusqu’à savoir exactement à quoi elle doit ressembler. Cette étape donne des **candidats** (et souvent l’unicité). **Synthèse** : on vérifie que les candidats trouvés sont vraiment des solutions (c’est l’existence).
Pourquoi la synthèse est-elle obligatoire ? Parce que l’analyse ne prouve que des implications « si c’est une solution, alors c’est forcément tel candidat ». Elle ne dit pas que le candidat marche. C’est comme un détective qui réduit la liste des suspects : encore faut-il vérifier que le suspect restant a bien pu commettre le crime.

## Notions (dans l’ordre d’apprentissage)
- Existence : il existe au moins un objet qui convient | ∃x, P(x)
- Unicité : deux objets qui conviennent sont forcément égaux | si P(x) et P(y), alors x = y
- Existence et unicité : ∃!x, P(x) : il existe un et un seul x tel que P(x)
- Analyse : on suppose qu’une solution existe et on en déduit sa forme (conditions nécessaires)
- Synthèse : on vérifie que les candidats trouvés sont des solutions (conditions suffisantes)
- Fonction paire : g(−x) = g(x) ; fonction impaire : h(−x) = −h(x)

## Méthodes
### Prouver « il existe un unique x tel que P(x) »
1. Existence : propose un x (construit ou deviné) et vérifie P(x).
2. Unicité : suppose P(x) et P(y), et démontre x = y.
3. Signale chaque hypothèse utilisée (par exemple « a ≠ 0, on peut diviser par a »).

### Analyse-synthèse
1. Analyse : « Supposons que … soit une solution. » Déduis-en des conditions jusqu’à obtenir un (ou des) candidat(s) explicite(s).
2. Synthèse : « Réciproquement, vérifions que ce(s) candidat(s) convien(nen)t. »
3. Conclusion : l’analyse donne l’unicité (pas d’autre solution possible), la synthèse donne l’existence.

## Exemples résolus
### Montrer que 3x + 2 = 11 a une unique solution réelle
- Existence : x = 3 convient, car 3 × 3 + 2 = 11 — on vérifie.
- Unicité : si 3x + 2 = 11 et 3y + 2 = 11, alors 3x = 3y — on soustrait.
- Comme 3 ≠ 0, x = y — l’unicité est prouvée.

### Toute fonction f : ℝ → ℝ est somme d’une fonction paire et d’une fonction impaire, de façon unique
- Analyse : supposons f = g + h avec g paire, h impaire — alors f(−x) = g(x) − h(x).
- En additionnant et soustrayant : g(x) = (f(x) + f(−x))/2 et h(x) = (f(x) − f(−x))/2 — g et h sont imposées : unicité.
- Synthèse : ces g et h sont bien paire et impaire, et g + h = f — existence.
- Par exemple, pour f(x) = eˣ, on obtient g = ch et h = sh — les fonctions hyperboliques.

### Trouver les fonctions affines f(x) = ax + b telles que f(f(x)) = 4x + 3
- Analyse : f(f(x)) = a(ax + b) + b = a²x + ab + b — donc a² = 4 et (a + 1)b = 3.
- a = 2 donne b = 1 ; a = −2 donne −b = 3, soit b = −3 — deux candidats : 2x + 1 et −2x − 3.
- Synthèse : 2(2x + 1) + 1 = 4x + 3 et −2(−2x − 3) − 3 = 4x + 3 — les deux conviennent.

## Pièges fréquents
- Prouver l’existence et croire avoir prouvé l’unicité → ce sont deux preuves distinctes.
- Oublier la synthèse → l’analyse ne fournit que des candidats ; il faut les vérifier.
- Oublier une branche de l’analyse (a² = 4 donne a = 2 ou a = −2) → garde tous les cas possibles.
- Diviser par un nombre sans vérifier qu’il est non nul → l’unicité de ax + b = c exige a ≠ 0.
- Confondre « unique » et « existe » : x² = 4 a deux solutions réelles → existence oui, unicité non.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Que signifie ∃! ? | Il existe un et un seul. |
| Comment prouver une unicité ? | Supposer deux solutions x, y et montrer x = y. |
| Comment prouver une existence ? | Construire ou proposer l’objet, puis vérifier. |
| Que donne l’analyse ? | Les candidats possibles (souvent l’unicité). |
| Que donne la synthèse ? | La vérification que les candidats conviennent (l’existence). |
| Peut-on sauter la synthèse ? | Non. |
| Partie paire de f ? | g(x) = (f(x) + f(−x))/2. |
| Partie impaire de f ? | h(x) = (f(x) − f(−x))/2. |
| x² = 4 a-t-elle une unique solution réelle ? | Non : 2 et −2. |
| Quelle hypothèse pour que ax + b = c ait une unique solution ? | a ≠ 0. |
| Quel mathématicien grec décrit l’analyse et la synthèse ? | Pappus d’Alexandrie (IVᵉ siècle). |

# Chapitre : Rédiger et vérifier une preuve
Source : parcours construit sans document source (connaissances générales)
Niveau visé : Choisir la méthode adaptée à un énoncé, rédiger une preuve dans le bon ordre avec les bons connecteurs, et repérer l’étape fausse d’une fausse démonstration.
Prérequis : tous les chapitres précédents du parcours.

## Explication pour un novice
Tu connais maintenant six façons de prouver : la preuve directe, la disjonction de cas, la contraposée, l’absurde, la récurrence, l’analyse-synthèse (sans oublier le contre-exemple pour réfuter). Ce dernier chapitre t’apprend à **choisir** la bonne et à **relire** une preuve comme un correcteur.
Choisir : regarde la forme de l’énoncé. Un « pour tout n » avec une somme ou une puissance de n : pense récurrence. Un énoncé négatif (« n’est pas rationnel », « il n’existe pas ») : pense absurde. Une implication dont l’hypothèse donne peu de prise (« si n² est pair ») : pense contraposée. Un énoncé où les entiers se comportent différemment selon leur parité ou leur reste : pense disjonction de cas. Une affirmation douteuse : cherche un contre-exemple.
Rédiger : une preuve se lit comme un texte. On introduit les objets (« Soit… »), on annonce la méthode (« Raisonnons par l’absurde »), on relie les étapes par des **connecteurs** précis : « donc » (on déduit), « car » (on justifie), « or » (on rappelle un fait), « ⟺ » seulement si l’étape marche dans les deux sens. Et on finit par une conclusion qui répond à la question.
Vérifier : beaucoup de fausses démonstrations ont l’air convaincantes. Le classique « 1 = 2 » cache une division par zéro. D’autres élèvent au carré (ce qui n’est pas une équivalence : −1 ≠ 1 mais (−1)² = 1²), prouvent la réciproque au lieu de l’implication, ou oublient l’initialisation d’une récurrence. Un bon réflexe : pour chaque ligne, demande-toi « pourquoi est-ce vrai ? » et « est-ce que ça marche dans tous les cas ? ».

## Notions (dans l’ordre d’apprentissage)
- Connecteur « donc » : la ligne suivante se déduit de la précédente (⇒)
- Connecteur « car » : on donne la raison de ce qu’on vient d’écrire
- Connecteur « ⟺ » : les deux lignes sont équivalentes (vrai dans les deux sens)
- Étape non réversible : élever au carré, multiplier par 0 : donne ⇒ mais pas ⟺
- Division par zéro : interdite ; diviser par une expression exige de vérifier qu’elle n’est pas nulle
- Racine carrée : √(ab) = √a × √b seulement si a ≥ 0 et b ≥ 0 ; √(x²) = |x|
- Choix de méthode : directe, cas, contraposée, absurde, récurrence, analyse-synthèse, contre-exemple

## Méthodes
### Choisir une méthode
1. Affirmation douteuse ou « pour tout » suspect : cherche d’abord un contre-exemple.
2. Énoncé négatif ou d’impossibilité : absurde.
3. Implication à hypothèse peu maniable : contraposée.
4. Propriété d’un entier n avec somme, puissance ou suite : récurrence.
5. Comportement différent selon la parité, le reste ou le signe : disjonction de cas.
6. Trouver tous les objets qui vérifient une condition : analyse-synthèse.
7. Sinon : preuve directe.

### Relire une preuve comme un correcteur
1. Chaque objet est-il introduit (« soit », « il existe un entier k tel que ») ?
2. Chaque ligne est-elle justifiée ? Chaque division se fait-elle par un nombre non nul ?
3. Les ⟺ sont-ils vraiment réversibles ? Après un passage au carré, vérifie les solutions.
4. La preuve démontre-t-elle bien l’énoncé, et pas sa réciproque ou un cas particulier ?

## Exemples résolus
### La fausse preuve de « 1 = 2 »
- Soit a = b non nul. Alors a² = ab, puis a² − b² = ab − b² — étapes justes.
- (a + b)(a − b) = b(a − b) — factorisation juste.
- On « simplifie » par a − b : a + b = b, donc 2b = b, donc 2 = 1 — erreur : a − b = 0, on a divisé par zéro.

### Résoudre √x = x − 2
- On élève au carré : x = x² − 4x + 4 — cette étape donne seulement ⇒.
- x² − 5x + 4 = 0, donc x = 1 ou x = 4 — ce sont des candidats.
- Vérification : √1 = 1 mais 1 − 2 = −1 : x = 1 est rejeté ; √4 = 2 = 4 − 2 : x = 4 convient — solution unique : 4.

### Une preuve qui démontre la réciproque
- Énoncé : « si n² est pair, alors n est pair ».
- Preuve proposée : « soit n pair, n = 2k, donc n² = 4k² est pair » — elle part de n pair.
- Défaut : elle prouve « si n pair, alors n² pair », la réciproque — il fallait raisonner par contraposée (n impair ⇒ n² impair).

## Pièges fréquents
- Écrire ⟺ partout par habitude → n’écris ⟺ que si l’étape marche dans les deux sens.
- Simplifier par une expression qui peut être nulle → vérifie qu’elle est non nulle, ou traite le cas nul à part.
- Garder toutes les solutions après un passage au carré → vérifie chacune dans l’équation de départ.
- Écrire √(x²) = x → √(x²) = |x|.
- Prouver la réciproque, ou un exemple, au lieu de l’énoncé → relis l’énoncé avant de conclure.
- Utiliser √(ab) = √a √b avec des nombres négatifs → la règle exige a ≥ 0 et b ≥ 0.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Où est l’erreur de la preuve « 1 = 2 » ? | Une division par a − b, qui vaut 0. |
| Élever au carré donne-t-il une équivalence ? | Non, seulement une implication. |
| Que vaut √(x²) ? | |x|. |
| Quand √(ab) = √a √b est-il valable ? | Quand a ≥ 0 et b ≥ 0. |
| Quelle méthode pour un énoncé « il n’existe pas » ? | L’absurde. |
| Quelle méthode pour une formule de somme en n ? | La récurrence. |
| Quelle méthode pour réfuter un « pour tout » ? | Un contre-exemple. |
| Que signifie le connecteur « car » ? | On donne la justification de ce qui précède. |
| Que faire après avoir élevé une équation au carré ? | Vérifier chaque solution dans l’équation de départ. |
| Quelles solutions pour √x = x − 2 ? | Seulement x = 4. |
