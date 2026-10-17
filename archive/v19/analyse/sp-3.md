# Chapitre : Lois discrètes : Bernoulli, binomiale, géométrique
Source : « Lois discrètes » (Yvan Monka, maths-et-tiques.fr, 17 pages) — loi uniforme discrète (p. 1), répétition d'expériences indépendantes (p. 1-3), épreuve et loi de Bernoulli (p. 3-4), schéma de Bernoulli et loi binomiale (p. 4-11), intervalle I tel que P(X ∈ I) ≥ 0,95 (p. 12-13), loi géométrique et absence de mémoire (p. 13-17).
Niveau visé : Reconnaître une loi uniforme, de Bernoulli, binomiale ou géométrique ; calculer un coefficient binomial avec le triangle de Pascal ou la symétrie ; calculer P(X = k), P(X ≤ k), P(X ≥ k) et l'espérance de ces lois ; utiliser le passage au contraire et la propriété d'absence de mémoire de la loi géométrique.
Prérequis : probabilités d'un événement et de son contraire ; arbres de probabilités ; variable aléatoire, loi de probabilité, espérance et variance ; dénombrement (combinaisons `C(n ; k)`) ; puissances et suites géométriques ; logarithme népérien pour les questions de seuil.

## Explication pour un novice
Dans le chapitre précédent, tu as appris qu'une variable aléatoire X associe un nombre à chaque issue d'une expérience, et que sa loi dit avec quelle probabilité elle prend chaque valeur. Le problème : pour chaque nouvelle situation, il faudrait refaire tout le tableau. Bonne nouvelle : beaucoup de situations de la vie ont **la même structure**, et donc la même loi. On leur donne un nom, on calcule les formules une fois pour toutes, et ensuite on n'a plus qu'à reconnaître la structure. C'est comme les recettes de base en cuisine : une fois qu'on sait faire une pâte brisée, on fait cent tartes différentes.

La plus simple est la **loi uniforme** : toutes les valeurs ont la même chance, comme les faces d'un dé équilibré. Vient ensuite l'**épreuve de Bernoulli** : une expérience qui n'a que deux issues, qu'on appelle « succès » et « échec » (pile ou face, guérir ou pas, pièce défectueuse ou pas). On code le succès par 1 et l'échec par 0 : la variable vaut 1 avec la probabilité p.

Si on **répète** cette épreuve n fois, de façon identique et indépendante (on remet la boule dans l'urne, les lancers ne s'influencent pas), on obtient un **schéma de Bernoulli**. Le nombre de succès X suit alors la **loi binomiale** `B(n ; p)`. Pour calculer `P(X = k)`, on compte les chemins de l'arbre qui donnent k succès (c'est le coefficient binomial `C(n ; k)`), et on multiplie par la probabilité d'un seul de ces chemins, `p^k (1 − p)^{n−k}`.

Enfin, si au lieu de fixer le nombre d'essais on **attend le premier succès**, le rang de ce premier succès suit la **loi géométrique**. Elle a une propriété étonnante : elle n'a « pas de mémoire ». Avoir raté dix fois ne rend pas le succès plus probable au onzième essai : le dé ne se souvient de rien.

L'idée à retenir : avant tout calcul, on **identifie la structure** (combien d'issues ? essais indépendants ? nombre d'essais fixé ou attente d'un succès ?). Une fois la loi reconnue, les formules font le reste.

## Notions (dans l'ordre d'apprentissage)
- Loi uniforme discrète : toutes les valeurs 1, 2, …, n ont la même probabilité | `P(X = k) = 1/n` pour k ∈ {1, …, n} et `E(X) = (n + 1)/2`.
- Expériences identiques et indépendantes : mêmes issues, mêmes probabilités, aucune influence d'un essai sur l'autre | la probabilité d'une suite d'issues est le produit `P(A_1) × P(A_2) × … × P(A_n)`.
- Épreuve de Bernoulli : expérience à deux issues, succès ou échec | succès de probabilité p, échec de probabilité `1 − p`.
- Loi de Bernoulli : la variable vaut 1 en cas de succès, 0 sinon | `P(X = 1) = p`, `P(X = 0) = 1 − p`, `E(X) = p`, `V(X) = p(1 − p)`.
- Schéma de Bernoulli : n épreuves de Bernoulli identiques et indépendantes | univers `{0 ; 1}^n`.
- Coefficient binomial : nombre de chemins de l'arbre qui mènent à k succès parmi n épreuves | `C(n ; 0) = C(n ; n) = 1`, `C(n ; 1) = n`, `C(n ; k) = C(n ; n − k)`.
- Triangle de Pascal : chaque coefficient est la somme des deux coefficients situés au-dessus | `C(n ; k) + C(n ; k + 1) = C(n + 1 ; k + 1)`.
- Loi binomiale : loi du nombre de succès dans un schéma de Bernoulli | `X ~ B(n ; p)` : `P(X = k) = C(n ; k) p^k (1 − p)^{n−k}` pour 0 ≤ k ≤ n.
- Espérance et variance binomiales : en moyenne np succès | `E(X) = np`, `V(X) = np(1 − p)`.
- Intervalle de fluctuation : intervalle [a ; b] qui contient X avec une probabilité d'au moins 0,95 | a : plus petit entier tel que `P(X ≤ a) > 0,025` ; b : plus petit entier tel que `P(X ≤ b) ≥ 0,975`.
- Loi géométrique : rang du premier succès quand on répète une épreuve de Bernoulli | `P(X = k) = (1 − p)^{k−1} p` pour k ≥ 1.
- Espérance de la loi géométrique : en moyenne, il faut 1/p essais | `E(X) = 1/p`.
- Absence de mémoire : les échecs passés ne changent rien aux probabilités futures | `P_{X>m}(X > m + n) = P(X > n)`.

## Méthodes
### Reconnaître une loi binomiale
1. Repère l'épreuve élémentaire et vérifie qu'elle n'a que deux issues ; nomme le succès.
2. Vérifie qu'elle est répétée un nombre fixé n de fois, de façon identique et indépendante (tirage **avec** remise, lancers successifs…).
3. Vérifie que X compte le nombre de succès.
4. Conclus : `X ~ B(n ; p)` avec p la probabilité du succès sur **une** épreuve.

### Calculer P(X = k) pour une loi binomiale
1. Calcule `C(n ; k)` (triangle de Pascal, symétrie ou touche nCr).
2. Calcule `p^k` (les k succès) et `(1 − p)^{n−k}` (les n − k échecs).
3. Multiplie les trois nombres.

### Calculer P(X ≥ k) ou « au moins »
1. Traduis la phrase : « au moins un » donne `X ≥ 1`, « au plus 3 » donne `X ≤ 3`, « plus de 3 » donne `X > 3`.
2. Si l'événement contient beaucoup de valeurs, passe au contraire : `P(X ≥ k) = 1 − P(X ≤ k − 1)`.
3. Cas fréquent : `P(X ≥ 1) = 1 − P(X = 0) = 1 − (1 − p)^n`.

### Trouver un nombre minimal d'essais
1. Écris la condition, par exemple `1 − (1 − p)^n ≥ 0,9`, soit `(1 − p)^n ≤ 0,1`.
2. Applique ln (fonction croissante) : `n ln(1 − p) ≤ ln 0,1`.
3. Divise par `ln(1 − p)`, **négatif** : l'inégalité change de sens, `n ≥ ln 0,1 / ln(1 − p)`.
4. Prends le plus petit entier qui convient.

### Utiliser la loi géométrique
1. Vérifie qu'on répète une épreuve de Bernoulli jusqu'au premier succès et que X est le rang de ce succès.
2. `P(X = k) = (1 − p)^{k−1} p` ; `P(X > k) = (1 − p)^k` (les k premiers essais sont des échecs) ; `P(X ≤ k) = 1 − (1 − p)^k`.
3. Avec une condition « sachant que les m premiers essais ont échoué », utilise l'absence de mémoire : seule compte la différence des rangs.

## Exemples résolus
### Une urne contient 3 boules blanches et 2 rouges ; on tire deux fois avec remise. Probabilité d'obtenir une blanche et une rouge ?
- `P(B) = 3/5 = 0,6` et `P(R) = 0,4` — une seule boule tirée, cas favorables sur cas possibles.
- Deux chemins conviennent : (B ; R) et (R ; B) — l'ordre des issues compte dans l'arbre.
- `P = 0,6 × 0,4 + 0,4 × 0,6 = 0,48` — tirages indépendants : on multiplie le long d'un chemin, on additionne les chemins.

### Une urne contient 5 boules gagnantes et 7 perdantes ; on tire 4 fois avec remise. X compte les boules gagnantes. Calculer P(X = 3).
- On répète 4 fois, de façon identique et indépendante, une épreuve à deux issues — la remise garantit l'indépendance.
- Succès « gagnante », `p = 5/12`, donc `X ~ B(4 ; 5/12)` — n = nombre de tirages, p = probabilité sur un tirage.
- `P(X = 3) = C(4 ; 3) × (5/12)^3 × (7/12)^1` — 3 succès et 1 échec.
- `= 4 × 125/1728 × 7/12 = 875/5184 ≈ 0,169` — `C(4 ; 3) = 4` d'après le triangle de Pascal.

### On lance 7 fois un dé. X compte les résultats supérieurs ou égaux à 3. Calculer P(X ≥ 3).
- `X ~ B(7 ; 2/3)` — succès {3 ; 4 ; 5 ; 6}, soit 4 faces sur 6.
- `P(X ≥ 3) = 1 − P(X ≤ 2)` — passer au contraire évite cinq calculs.
- `P(X ≤ 2) ≈ 0,045` (calculatrice), donc `P(X ≥ 3) ≈ 0,955` — on vérifie que le résultat est plausible : 3 succès sur 7 est peu exigeant.

### Au jeu du « 4 », on lance un dé jusqu'à obtenir un 4. Calculer P(X = 3), P(X ≤ 8) et E(X).
- X suit la loi géométrique de paramètre `p = 1/6` — on attend le premier succès « obtenir 4 ».
- `P(X = 3) = (5/6)^2 × 1/6 = 25/216 ≈ 0,116` — deux échecs puis un succès.
- `P(X ≤ 8) = 1 − (5/6)^8 ≈ 0,767` — le contraire de « 8 échecs d'affilée ».
- `E(X) = 1/p = 6` — en moyenne, il faut 6 lancers.

### Un couple a 12 % de chances d'avoir un enfant gaucher. Il a déjà un enfant droitier : probabilité que le premier gaucher arrive au plus tôt au 4ᵉ enfant ?
- X : rang du premier enfant gaucher, loi géométrique de paramètre 0,12 — chaque naissance est une épreuve de Bernoulli.
- On cherche `P_{X>1}(X > 3)` — « déjà un droitier » donne X > 1 ; « à partir du 4ᵉ » donne X > 3.
- Absence de mémoire : `P_{X>1}(X > 3) = P(X > 2)` — seuls comptent les 2 enfants « en plus ».
- `P(X > 2) = 0,88^2 = 0,7744` — deux échecs de suite.

## Pièges fréquents
- Appliquer la loi binomiale à des tirages **sans remise** → sans remise, la composition de l'urne change : les tirages ne sont pas indépendants, ce n'est pas une loi binomiale.
- Oublier le coefficient `C(n ; k)` → `p^k (1 − p)^{n−k}` est la probabilité d'**un seul** chemin ; il y a `C(n ; k)` chemins.
- Inverser les exposants → k succès donnent `p^k`, les n − k échecs donnent `(1 − p)^{n−k}`.
- Écrire `B(p ; n)` ou prendre p = succès ÷ échecs → on écrit `B(n ; p)`, et p = cas favorables ÷ cas possibles.
- Traduire « au moins un » par `X > 1` → « au moins un » signifie `X ≥ 1`, dont le contraire est `X = 0`.
- Écrire `(1 − p)^k p` pour la loi géométrique → avant le succès au rang k, il y a seulement k − 1 échecs.
- Croire qu'après plusieurs échecs le succès « doit » arriver → loi sans mémoire : les essais passés ne changent rien.
- Diviser par `ln(1 − p)` sans changer le sens de l'inégalité → `ln(1 − p) < 0`, le sens change.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu'est-ce qu'une épreuve de Bernoulli ? | Une expérience à deux issues : succès (probabilité p) ou échec. |
| Espérance et variance d'une loi de Bernoulli ? | `E = p` et `V = p(1 − p)`. |
| Qu'est-ce qu'un schéma de Bernoulli ? | n épreuves de Bernoulli identiques et indépendantes. |
| Que compte une loi binomiale `B(n ; p)` ? | Le nombre de succès dans un schéma de Bernoulli. |
| Formule de `P(X = k)` pour `B(n ; p)` ? | `C(n ; k) p^k (1 − p)^{n−k}` |
| Que vaut `C(n ; n − k)` ? | `C(n ; k)` (symétrie). |
| Relation du triangle de Pascal ? | `C(n ; k) + C(n ; k + 1) = C(n + 1 ; k + 1)` |
| Espérance d'une loi binomiale ? | `E(X) = np` |
| Variance d'une loi binomiale ? | `V(X) = np(1 − p)` |
| `P(X ≥ 1)` pour `B(n ; p)` ? | `1 − (1 − p)^n` |
| Loi géométrique : `P(X = k)` ? | `(1 − p)^{k−1} p` |
| Loi géométrique : `P(X > k)` ? | `(1 − p)^k` |
| Espérance de la loi géométrique ? | `1/p` |
| Absence de mémoire (loi géométrique) ? | `P_{X>m}(X > m + n) = P(X > n)` |
| Tirage sans remise : loi binomiale ? | Non, les tirages ne sont pas indépendants. |

# Chapitre : Lois à densité : uniforme, exponentielle, normale
Source : « Lois à densité » (Yvan Monka, maths-et-tiques.fr, 16 pages) — variables continues et fonction de densité (p. 1-4), loi uniforme (p. 4-6), loi exponentielle et absence de mémoire (p. 7-8), loi normale centrée réduite (p. 9-11), loi normale `N(μ ; σ^2)` et intervalles à 1, 2, 3 sigmas (p. 11-15), théorème de Moivre-Laplace (p. 15-16).
Niveau visé : Vérifier qu'une fonction est une densité ; calculer des probabilités, l'espérance et la variance pour les lois uniforme et exponentielle ; utiliser l'absence de mémoire ; centrer-réduire une loi normale, utiliser Φ et la règle 68-95-99,7 ; retrouver μ ou σ à partir d'une probabilité ; approcher une loi binomiale par une loi normale (Moivre-Laplace).
Prérequis : lois discrètes, en particulier la loi binomiale ; intégrales et primitives ; fonction exponentielle et logarithme ; probabilités conditionnelles.

## Explication pour un novice
Combien de temps dure une ampoule ? Combien mesure un adulte pris au hasard ? Ces grandeurs ne prennent pas quelques valeurs isolées comme un dé : elles peuvent valoir n'importe quel nombre d'un intervalle (1 h 12 min 3,7 s…). On parle de **variable aléatoire continue**. Problème : il y a tellement de valeurs possibles que la probabilité d'en obtenir une **exactement** est nulle. Personne ne mesure exactement 1,750000… m.

L'idée géniale est de ne plus parler de valeurs mais d'**intervalles**, et de représenter les probabilités par des **aires**. On dessine une courbe, la **densité** f, et la probabilité que X tombe entre a et b est l'aire sous la courbe entre a et b, c'est-à-dire l'intégrale `∫_a^b f(x) dx`. Pense à un tas de sable étalé sur une règle : là où le tas est haut, il y a beaucoup de chances de tomber. Toute la masse de sable vaut 1 : c'est pourquoi l'aire totale sous une densité vaut 1.

Trois lois reviennent partout. La **loi uniforme** : le tas de sable est plat, toutes les zones de même longueur ont la même chance (un technicien qui rappelle « au hasard entre 14 h et 15 h »). La **loi exponentielle** : le tas est haut au début puis s'affaisse ; elle modélise les durées de vie sans usure, comme la désintégration d'un noyau radioactif. La **loi normale** : la célèbre courbe en cloche, symétrique autour de la moyenne, qui décrit les tailles, les erreurs de mesure et une multitude de phénomènes.

La loi normale a un rôle à part grâce au **théorème de Moivre-Laplace** : quand on répète un très grand nombre de fois une épreuve de Bernoulli, la loi binomiale prend elle-même la forme d'une cloche. C'est ce qui permettra, au chapitre suivant, de juger un sondage.

Comme pour les lois discrètes, la démarche est toujours la même : reconnaître la loi, traduire l'événement (≤, >, entre…), puis appliquer la bonne formule ou la calculatrice.

## Notions (dans l'ordre d'apprentissage)
- Variable aléatoire continue : elle peut prendre toutes les valeurs d'un intervalle | ses probabilités portent sur des intervalles, et `P(X = a) = 0`.
- Densité de probabilité : fonction dont les aires donnent les probabilités | f continue, positive sur I, et `∫_I f(x) dx = 1` ; `P(a ≤ X ≤ b) = ∫_a^b f(x) dx`.
- Inégalités larges ou strictes : pour une loi continue, cela ne change rien | `P(X ≤ a) = P(X < a)`.
- Fonction de répartition : probabilité d'être inférieur ou égal à x | `F(x) = P(X ≤ x) = ∫_a^x f(t) dt`.
- Espérance et variance d'une loi à densité : moyenne pondérée par la densité | `E(X) = ∫_a^b x f(x) dx`, `V(X) = ∫_a^b (x − E(X))^2 f(x) dx`.
- Loi uniforme sur [a ; b] : densité constante | `f(x) = 1/(b − a)`, `P(c ≤ X ≤ d) = (d − c)/(b − a)`, `E(X) = (a + b)/2`, `V(X) = (b − a)^2/12`.
- Loi exponentielle de paramètre λ > 0 : durée de vie sans vieillissement | `f(x) = λe^{−λx}` sur [0 ; +∞[, `P(X ≤ t) = 1 − e^{−λt}`, `P(X > t) = e^{−λt}`, `E(X) = 1/λ`.
- Absence de mémoire (loi exponentielle) : l'âge déjà atteint ne change pas la durée de vie restante | `P_{X≥t}(X ≥ t + h) = P(X ≥ h)`.
- Loi normale centrée réduite : courbe en cloche centrée en 0, d'écart-type 1 | `N(0 ; 1)`, densité `(1/√(2π)) e^{−x^2/2}`, `E = 0`, `V = 1`.
- Fonction Φ : aire à gauche de z sous la cloche | `Φ(z) = P(Z ≤ z)` et `Φ(−z) = 1 − Φ(z)`.
- Seuils usuels : valeurs à connaître | `P(−1,96 ≤ Z ≤ 1,96) ≈ 0,95` et `P(−2,58 ≤ Z ≤ 2,58) ≈ 0,99`.
- Loi normale `N(μ ; σ^2)` : cloche centrée en μ, plus ou moins étalée selon σ | X suit `N(μ ; σ^2)` si `Z = (X − μ)/σ` suit `N(0 ; 1)`.
- Règle des 1, 2, 3 sigmas : proportions autour de la moyenne | `P(μ − σ ≤ X ≤ μ + σ) ≈ 0,683`, à 2σ ≈ 0,954, à 3σ ≈ 0,997.
- Théorème de Moivre-Laplace : la binomiale centrée réduite se rapproche de `N(0 ; 1)` | si `X_n ~ B(n ; p)` et `Z_n = (X_n − np)/√(np(1 − p))`, alors `P(a ≤ Z_n ≤ b) → ∫_a^b (1/√(2π)) e^{−x^2/2} dx`.

## Méthodes
### Vérifier qu'une fonction est une densité sur I
1. Vérifie que f est continue sur I.
2. Vérifie que f est positive sur I (signe d'un trinôme, d'une fonction affine…).
3. Calcule `∫_I f(x) dx` avec une primitive et vérifie qu'elle vaut 1.
4. Pour trouver une constante k inconnue, écris que cette intégrale vaut 1 et résous en k.

### Calculer avec la loi exponentielle
1. Repère λ (ou `λ = 1/E(X)` si on te donne la durée de vie moyenne).
2. `P(X ≤ t) = 1 − e^{−λt}` ; `P(X > t) = e^{−λt}` ; `P(a ≤ X ≤ b) = e^{−λa} − e^{−λb}`.
3. Avec une condition « sachant que X > s », utilise l'absence de mémoire : ne garde que la durée **en plus**.

### Calculer une probabilité avec une loi normale
1. Centre et réduis : `z = (x − μ)/σ` (on divise par σ, pas par `σ^2`).
2. Utilise `Φ(z) = P(Z ≤ z)`, puis `P(Z > z) = 1 − Φ(z)` et la symétrie `Φ(−z) = 1 − Φ(z)`.
3. Pour un intervalle symétrique : `P(−z ≤ Z ≤ z) = 2Φ(z) − 1`.
4. Vérifie avec la règle 68-95-99,7 que l'ordre de grandeur est plausible.

### Retrouver μ ou σ à partir d'une probabilité
1. Écris `P(X < a) = P(Z < (a − μ)/σ)`.
2. Avec la calculatrice (fonction inverse, « invNorm »), trouve `z_0` tel que `P(Z < z_0) = p`.
3. Résous l'équation `(a − μ)/σ = z_0` en l'inconnue.

### Appliquer le théorème de Moivre-Laplace
1. Vérifie que `X ~ B(n ; p)` avec n grand (en pratique `n ≥ 30`, `np ≥ 5`, `n(1 − p) ≥ 5`).
2. Calcule `μ = np` et `σ = √(np(1 − p))`.
3. Écris `P(X ≤ k) ≈ P(Z ≤ (k − μ)/σ)` et conclus avec Φ.

## Exemples résolus
### Montrer que f(x) = 0,5x − 1 est une densité sur [2 ; 4].
- f est affine donc continue ; pour x ≥ 2, `0,5x − 1 ≥ 0` — continuité et positivité.
- `∫_2^4 (0,5x − 1) dx = [0,25x^2 − x]_2^4` — primitive de 0,5x : 0,25x².
- `= (4 − 4) − (1 − 2) = 1` — l'aire totale vaut 1 : c'est bien une densité.

### Un technicien appelle au hasard entre 14 h et 15 h. Probabilité d'attendre entre 15 et 40 minutes ? Attente moyenne ?
- T suit la loi uniforme sur [0 ; 60] — aucun instant n'est privilégié.
- `P(15 ≤ T ≤ 40) = (40 − 15)/60 = 5/12` — longueur favorable sur longueur totale.
- `E(T) = (0 + 60)/2 = 30` minutes — le milieu de l'intervalle.

### X suit la loi exponentielle de paramètre 0,1. Calculer P(1 ≤ X ≤ 3).
- `P(1 ≤ X ≤ 3) = P(X ≤ 3) − P(X < 1)` — différence de deux fonctions de répartition.
- `= (1 − e^{−0,3}) − (1 − e^{−0,1}) = e^{−0,1} − e^{−0,3}` — les 1 se simplifient.
- `≈ 0,164` — calculatrice.

### Un composant de durée de vie exponentielle (λ = 0,0035) a fonctionné 200 h. Probabilité de panne avant 300 h ?
- On cherche `P_{X>200}(X ≤ 300) = 1 − P_{X>200}(X > 300)` — passage au contraire.
- Absence de mémoire : `P_{X>200}(X > 300) = P(X > 100)` — seules comptent les 100 heures en plus.
- `P = 1 − e^{−0,0035 × 100} = 1 − e^{−0,35} ≈ 0,295` — le passé ne compte pas.

### X suit N(80 ; 14²). Calculer P(70 ≤ X ≤ 100) et trouver t tel que P(X ≤ t) = 0,9.
- Calculatrice : `normalcdf(70, 100, 80, 14) ≈ 0,686` — ou en centrant-réduisant : z de −0,71 à 1,43.
- `invNorm(0,9 ; 80 ; 14) ≈ 98` — 90 % des cars parcourent moins de 98 km par jour.

### X suit N(3 ; σ²) avec P(X < 2) = 0,4. Trouver σ.
- `P(X < 2) = P(Z < (2 − 3)/σ) = P(Z < −1/σ)` — on centre-réduit.
- La calculatrice donne `z_0 ≈ −0,253` avec `P(Z < z_0) = 0,4` — fonction inverse de la loi normale.
- `−1/σ = −0,253`, donc `σ ≈ 3,95` — on résout.

### X suit B(1000 ; 0,3). Calculer P(X ≤ 320) avec Moivre-Laplace.
- `μ = 1000 × 0,3 = 300`, `σ = √(1000 × 0,3 × 0,7) ≈ 14,5` — espérance et écart-type binomiaux.
- `P(X ≤ 320) ≈ P(Z ≤ (320 − 300)/14,5) = P(Z ≤ 1,38)` — on centre-réduit.
- `≈ 0,916` — avec Φ.

## Pièges fréquents
- Chercher `P(X = a)` pour une loi continue → elle vaut 0 ; seules les probabilités d'intervalles ont un sens.
- Oublier de vérifier la positivité ou la continuité d'une densité → les trois conditions comptent, pas seulement l'aire 1.
- Confondre `P(X ≤ t) = 1 − e^{−λt}` et `P(X > t) = e^{−λt}` → fais un dessin : `e^{−λt}` est la part qui « survit » après t.
- Écrire `E(X) = λ` pour une loi exponentielle → c'est `1/λ` ; un grand λ signifie des pannes rapides.
- Diviser par la variance `σ^2` en centrant-réduisant → on divise par l'écart-type σ ; dans `N(μ ; σ^2)`, le second paramètre est la variance.
- Calculer `P(Z > z)` avec `Φ(z)` → `P(Z > z) = 1 − Φ(z)`.
- Utiliser l'absence de mémoire avec la durée totale → on ne garde que la durée **en plus** : `P_{X>s}(X > s + t) = P(X > t)`.
- Utiliser Moivre-Laplace avec σ = np(1 − p) → c'est la variance ; l'écart-type est sa racine.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Trois conditions pour qu'une fonction soit une densité sur I ? | Continue, positive, d'intégrale 1 sur I. |
| Que vaut `P(X = a)` pour une loi continue ? | 0 |
| Comment calcule-t-on `P(a ≤ X ≤ b)` avec une densité ? | `∫_a^b f(x) dx`, l'aire sous la courbe. |
| Densité de la loi uniforme sur [a ; b] ? | `1/(b − a)` |
| Espérance de la loi uniforme sur [a ; b] ? | `(a + b)/2` |
| Variance de la loi uniforme sur [a ; b] ? | `(b − a)^2/12` |
| Loi exponentielle : `P(X ≤ t)` ? | `1 − e^{−λt}` |
| Loi exponentielle : `P(X > t)` ? | `e^{−λt}` |
| Espérance d'une loi exponentielle ? | `1/λ` |
| Absence de mémoire (loi exponentielle) ? | `P_{X≥t}(X ≥ t + h) = P(X ≥ h)` |
| Comment centrer-réduire X de loi `N(μ ; σ^2)` ? | `Z = (X − μ)/σ` |
| `P(−1,96 ≤ Z ≤ 1,96)` ? | Environ 0,95. |
| `P(μ − σ ≤ X ≤ μ + σ)` pour une loi normale ? | Environ 0,683. |
| `Φ(−z)` en fonction de `Φ(z)` ? | `1 − Φ(z)` |
| Que dit le théorème de Moivre-Laplace ? | La binomiale centrée réduite tend vers `N(0 ; 1)` quand n grandit. |

# Chapitre : Échantillonnage et estimation
Source : « Échantillonnage » (Yvan Monka, maths-et-tiques.fr, 9 pages) — notion d'échantillon et simulation (p. 1-2), loi des grands nombres (p. 2-3), estimation d'une probabilité (p. 3-4), intervalle de fluctuation asymptotique (p. 5-6), prise de décision (p. 6-7), intervalle de confiance (p. 7-8), taille d'échantillon (p. 9).
Niveau visé : Distinguer échantillonnage, prise de décision et estimation ; vérifier les conditions `n ≥ 30`, `np ≥ 5`, `n(1 − p) ≥ 5` ; calculer un intervalle de fluctuation asymptotique au seuil 0,95 et prendre une décision ; calculer un intervalle de confiance au niveau 0,95 et l'interpréter ; déterminer une taille d'échantillon suffisante.
Prérequis : fréquence et proportion ; loi binomiale ; loi normale centrée réduite et la valeur 1,96 ; théorème de Moivre-Laplace ; racines carrées et inéquations.

## Explication pour un novice
Pour savoir si une soupe est assez salée, tu n'avales pas toute la marmite : tu goûtes **une cuillère**, à condition d'avoir bien remué. Les statistiques font pareil : au lieu d'interroger 50 millions d'électeurs, on en interroge 1 000 tirés au hasard. Ces 1 000 personnes forment un **échantillon** de la **population**. Toute la question est : que peut-on dire de la marmite à partir d'une cuillère ?

Première réponse, la **loi des grands nombres** : quand la taille n de l'échantillon augmente, la fréquence observée se rapproche le plus souvent de la vraie probabilité. Lance un dé 10 fois, tu peux avoir 50 % de « 1 ou 6 » ; lance-le 10 000 fois, tu seras très près de 1/3. Mais attention : « le plus souvent » et « près de » ne veulent pas dire « toujours » ni « exactement ». Il reste une part de hasard, qu'on va mesurer.

Deux situations inverses se présentent. Si on **connaît** (ou si on **suppose**) la proportion p dans la population, on peut prédire dans quel intervalle la fréquence d'un échantillon tombera 95 fois sur 100 : c'est l'**intervalle de fluctuation**. Si la fréquence observée sort de cet intervalle, on doute de l'hypothèse : c'est la **prise de décision** (le fournisseur a-t-il respecté la commande ? le dé est-il truqué ?).

Si au contraire on **ignore** p, on part de la fréquence observée f et on construit un intervalle qui contient p avec un niveau de confiance de 95 % : c'est l'**intervalle de confiance**, l'outil de tous les sondages. On voit au passage que la précision coûte cher : pour diviser la largeur par 2, il faut interroger 4 fois plus de monde.

Retiens la boussole : p connue ou supposée → fluctuation (centrée sur p) ; p inconnue → confiance (centrée sur f).

## Notions (dans l'ordre d'apprentissage)
- Population et échantillon : l'ensemble étudié, et la partie qu'on observe vraiment | un échantillon de taille n est formé des résultats de n répétitions indépendantes de la même expérience.
- Fréquence observée : proportion d'individus de l'échantillon qui ont le caractère | `f = k/n` ; la variable aléatoire fréquence est `F_n = X_n/n` avec `X_n ~ B(n ; p)`.
- Loi des grands nombres : quand n devient grand, la fréquence observée est le plus souvent proche de la probabilité | pour n grand, l'écart `|f − p|` est inférieur à `1/√n` dans environ 95 % des cas.
- Conditions d'application : taille et proportion suffisantes pour approcher par la loi normale | `n ≥ 30`, `np ≥ 5` et `n(1 − p) ≥ 5` (avec f à la place de p si p est inconnue).
- Intervalle de fluctuation asymptotique au seuil 0,95 : intervalle autour de p où tombe la fréquence avec une probabilité proche de 0,95 | `I_n = [p − 1,96 √(p(1 − p)/n) ; p + 1,96 √(p(1 − p)/n)]`.
- Seuil 1 − α : version générale avec le réel `u_α` de la loi normale | `I_n = [p − u_α √(p(1 − p)/n) ; p + u_α √(p(1 − p)/n)]`, `u_{0,05} ≈ 1,96`.
- Prise de décision : on teste une valeur supposée de p | si `f ∈ I_n`, on accepte l'hypothèse ; si `f ∉ I_n`, on la rejette, avec un risque d'erreur d'environ 5 %.
- Estimation : retrouver p inconnue à partir de f | problème inverse de l'échantillonnage.
- Intervalle de confiance au niveau 0,95 : intervalle autour de f qui contient p dans 95 % des cas | `[f − 1/√n ; f + 1/√n]`.
- Amplitude de l'intervalle de confiance : sa longueur | `2/√n` ; pour une amplitude au plus a, il faut `n ≥ 4/a^2`.

## Méthodes
### Prendre une décision avec un intervalle de fluctuation
1. Écris l'hypothèse sur la proportion p de la population et calcule la fréquence observée `f = k/n`.
2. Vérifie les conditions avec p : `n ≥ 30`, `np ≥ 5`, `n(1 − p) ≥ 5`.
3. Calcule `I = [p − 1,96 √(p(1 − p)/n) ; p + 1,96 √(p(1 − p)/n)]` (arrondis la borne inférieure par défaut et la supérieure par excès).
4. Si `f ∈ I`, on accepte l'hypothèse ; sinon on la rejette, au risque de 5 % de se tromper.

### Estimer une proportion par un intervalle de confiance
1. Calcule la fréquence observée `f = k/n`.
2. Vérifie les conditions avec f : `n ≥ 30`, `nf ≥ 5`, `n(1 − f) ≥ 5`.
3. Calcule `[f − 1/√n ; f + 1/√n]`.
4. Interprète : on ne sait pas où est p dans l'intervalle ; on conclut seulement si une valeur seuil (par exemple 0,5) est entièrement d'un côté de l'intervalle.

### Déterminer une taille d'échantillon
1. L'amplitude de l'intervalle de confiance est `2/√n`.
2. Écris `2/√n ≤ a`, soit `√n ≥ 2/a`, soit `n ≥ 4/a^2`.
3. Prends le plus petit entier qui convient (arrondi à l'entier supérieur).

## Exemples résolus
### Urne avec p = 0,3 de boules blanches ; on tire 50 boules avec remise. Intervalle de fluctuation au seuil 0,95 ?
- `n = 50 ≥ 30`, `np = 15 ≥ 5`, `n(1 − p) = 35 ≥ 5` — conditions vérifiées.
- `1,96 × √(0,3 × 0,7/50) ≈ 0,127` — demi-largeur.
- `I_{50} = [0,173 ; 0,427]` ; avec 500 tirages, `I_{500} ≈ [0,26 ; 0,34]` — l'intervalle se resserre quand n augmente.

### Un fabricant commande autant de composants RS017 que P412. Sur 50 composants livrés, 19 sont des RS017. La commande est-elle respectée ?
- Hypothèse `p = 0,5` ; fréquence observée `f = 19/50 = 0,38` — on compare l'échantillon à l'hypothèse.
- `n = 50`, `np = n(1 − p) = 25` — conditions vérifiées.
- `I = [0,5 − 1,96 √(0,25/50) ; 0,5 + 1,96 √(0,25/50)] ≈ [0,361 ; 0,639]` — intervalle de fluctuation.
- `0,38 ∈ I` : on accepte l'hypothèse — l'écart peut s'expliquer par le hasard de l'échantillonnage.

### 614 personnes sur 1052 déclarent voter pour une candidate. Peut-elle croire qu'elle sera élue ?
- `f = 614/1052 ≈ 0,5837` — fréquence observée.
- `nf ≈ 614 ≥ 5`, `n(1 − f) ≈ 438 ≥ 5`, `n ≥ 30` — conditions vérifiées avec f.
- `1/√1052 ≈ 0,031`, donc l'intervalle de confiance est `[0,553 ; 0,615]` — niveau 0,95.
- L'intervalle est entièrement au-dessus de 0,5 : l'élection est envisageable avec un bon niveau de confiance — sans certitude absolue.

### On veut estimer une proportion au niveau 0,95 avec une amplitude d'au plus 0,05. Combien de personnes interroger ?
- Amplitude : `2/√n ≤ 0,05` — longueur de l'intervalle de confiance.
- `√n ≥ 40`, soit `n ≥ 1600` — on élève au carré.
- Il faut interroger au moins 1600 personnes — plus petit entier qui convient.

## Pièges fréquents
- Centrer l'intervalle de fluctuation sur f → la fluctuation se centre sur la proportion p connue ou supposée ; c'est la confiance qui se centre sur f.
- Oublier la racine : `1,96 × p(1 − p)/n` → la demi-largeur est `1,96 × √(p(1 − p)/n)`.
- Dire « p a 95 % de chances d'être dans cet intervalle de confiance » comme si p était aléatoire → c'est la méthode qui réussit dans 95 % des échantillons ; p est fixe, l'intervalle varie.
- Croire que p est au centre de l'intervalle de confiance → on ne sait pas où p se trouve dans l'intervalle.
- Conclure « l'hypothèse est vraie » quand f est dans l'intervalle → on dit seulement qu'on ne la rejette pas : l'échantillon est compatible avec elle.
- Oublier de vérifier les conditions `n ≥ 30`, `np ≥ 5`, `n(1 − p) ≥ 5` → sans elles, l'approximation par la loi normale n'est pas fiable.
- Arrondir la taille d'échantillon à l'entier inférieur → il faut `n ≥ 4/a^2` : on arrondit toujours à l'entier supérieur.
- Confondre amplitude `2/√n` et demi-amplitude `1/√n` → lis bien si l'énoncé parle de la longueur de l'intervalle ou de la marge d'erreur.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu'est-ce qu'un échantillon de taille n ? | Les résultats de n répétitions indépendantes de la même expérience. |
| Que dit la loi des grands nombres ? | Pour n grand, la fréquence observée est le plus souvent proche de la probabilité. |
| Conditions d'application de l'échantillonnage ? | `n ≥ 30`, `np ≥ 5`, `n(1 − p) ≥ 5`. |
| Intervalle de fluctuation au seuil 0,95 ? | `[p − 1,96 √(p(1 − p)/n) ; p + 1,96 √(p(1 − p)/n)]` |
| Règle de décision ? | f dans l'intervalle : on accepte ; sinon on rejette. |
| Risque de rejeter à tort une hypothèse vraie ? | Environ 5 %. |
| Intervalle de confiance au niveau 0,95 ? | `[f − 1/√n ; f + 1/√n]` |
| Amplitude de l'intervalle de confiance ? | `2/√n` |
| Taille minimale pour une amplitude a ? | `n ≥ 4/a^2` |
| p connue : quel intervalle ? | L'intervalle de fluctuation, centré sur p. |
| p inconnue : quel intervalle ? | L'intervalle de confiance, centré sur f. |
| Que vaut `u_{0,05}` ? | Environ 1,96. |

## Notes pour l'intégration
- Tloisd, p. 15 : la question 1 annonce le calcul de `P(X ≤ 3)` puis `P(X ≤ 8)` ; les symboles d'inégalité sont illisibles dans le texte extrait mais les calculs (91/216 ≈ 0,421 et 1 − (5/6)^8 ≈ 0,77) confirment « ≤ ».
- Techa, p. 8 : la fréquence 614/1052 est écrite « ≈ 0,5887 » puis « 0,5837 » ; la bonne valeur est 0,5837. Coquille « [0,44 ; 0; 64] » pour [0,44 ; 0,64], et « 0; 615 » pour 0,615.
- Les figures (arbres, courbes, captures de calculatrice et de tableur) ne sont pas reproduites ; les widgets wBin, wPascal, wTree, wNorm, wLLN et wCI jouent ce rôle.
