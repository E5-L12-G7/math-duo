# Chapitre : Suites numériques
Source : « TD suite numérique.pdf » (CNAM Liban, MVA005, Dr N. Assaad), 16 pages — formulaire de limites (p. 1), exercices 1 à 14 (p. 1 à 16).
Niveau visé : calculer les termes d'une suite arithmétique, géométrique ou récurrente ; trouver son sens de variation ; calculer une limite (fractions rationnelles, limites de référence, encadrement) ; trouver la limite d'une suite récurrente grâce à l'équation du point fixe ; résoudre un problème concret de seuil (pourcentage d'évolution).
Prérequis : opérations sur les fractions et les puissances ; notion de fonction ; pourcentages ; fonctions exponentielle et logarithme (`e^x`, `ln x`) ; sinus et cosinus ; résolution d'une équation du second degré.

## Explication pour un novice
Une suite, c'est une liste de nombres rangés dans un ordre précis : un premier, un deuxième, un troisième… et cela ne s'arrête jamais. On note `u_0` le premier terme (on lit « u indice zéro »), `u_1` le suivant, et `u_n` le terme numéro n (le terme général). Imagine un escalier : chaque marche porte un numéro n, et `u_n` est la hauteur de la marche n.

Il y a deux façons de fabriquer une suite. Soit on donne une formule directe, comme `u_n = 2n + 1` : pour connaître la marche 10, on remplace n par 10 (formule explicite). Soit on donne une règle pour passer d'une marche à la suivante, comme « chaque marche est 3 cm plus haute que la précédente » : `u_{n+1} = u_n + 3` (relation de récurrence). Avec une récurrence, il faut aussi connaître la première marche, sinon on ne peut pas démarrer.

Deux familles sont les plus simples. Quand on **ajoute** toujours le même nombre r, la suite est arithmétique (comme un salaire augmenté de 50 € chaque année). Quand on **multiplie** toujours par le même nombre q, elle est géométrique (comme une épargne qui gagne 2 % par an, donc multipliée par 1,02). La pression de l'air qui baisse de 1,5 % tous les 100 m est une suite géométrique de raison 0,985.

On regarde ensuite comment la suite se comporte. Monte-t-elle toujours (croissante), descend-elle toujours (décroissante) ? Et surtout : où va-t-elle quand n devient immense ? Si les termes se rapprochent autant qu'on veut d'un nombre ℓ, on dit que la suite converge vers ℓ (ℓ est sa limite). Sinon elle diverge : soit elle part vers l'infini, soit elle hésite sans jamais se fixer (comme `(−1)^n` qui saute entre −1 et 1).

Un outil puissant : une suite qui monte toujours mais qui ne peut pas dépasser un plafond finit forcément par se stabiliser (théorème de la limite monotone). Et pour une suite récurrente `u_{n+1} = f(u_n)` qui converge, sa limite ℓ vérifie `ℓ = f(ℓ)` : si l'escalier finit par être plat, la marche suivante a la même hauteur que la précédente.

## Notions (dans l'ordre d'apprentissage)
- Suite : une liste infinie et ordonnée de nombres, numérotés par des entiers | une application `u : ℕ → ℝ`, `n ↦ u_n`.
- Terme général / indice : `u_n` est le terme de numéro n ; n est l'indice (le rang) | `u_n` = image de n par u.
- Formule explicite : on calcule `u_n` directement à partir de n | `u_n = g(n)` pour une fonction g donnée.
- Relation de récurrence : on calcule un terme à partir du précédent | `u_0` donné et `u_{n+1} = f(u_n)` pour tout n.
- Suite arithmétique : on ajoute toujours le même nombre r (la raison) | `u_{n+1} = u_n + r`, donc `u_n = u_0 + n·r`.
- Suite géométrique : on multiplie toujours par le même nombre q (la raison) | `u_{n+1} = q·u_n`, donc `u_n = u_0·q^n`.
- Évolution en pourcentage : baisser de t % revient à multiplier par `1 − t/100` | suite géométrique de raison `q = 1 − t/100`.
- Somme des termes : addition des premiers termes d'une suite | `1 + 2 + … + n = n(n+1)/2` ; `u_0 + … + u_n = u_0·(1 − q^{n+1})/(1 − q)` si `q ≠ 1`.
- Suite croissante / décroissante : chaque terme est plus grand (plus petit) que le précédent | croissante si `u_{n+1} − u_n ≥ 0` pour tout n ; décroissante si `≤ 0`.
- Suite monotone : soit toujours croissante, soit toujours décroissante | croissante ou décroissante.
- Suite majorée / minorée / bornée : il existe un plafond / un plancher / les deux | `∃M, ∀n, u_n ≤ M` ; `∃m, ∀n, u_n ≥ m` ; bornée ⟺ `∃a ≥ 0, ∀n, |u_n| ≤ a`.
- Limite finie (convergence) : les termes finissent par rester aussi près qu'on veut de ℓ | `∀ε > 0, ∃N, ∀n > N, |u_n − ℓ| ≤ ε`.
- Divergence : la suite n'a pas de limite finie (elle part à l'infini ou oscille) | `u_n → ±∞` ou pas de limite.
- Opérations sur les limites : limite d'une somme, d'un produit, d'un quotient = somme, produit, quotient des limites (hors formes indéterminées) | formes indéterminées : `∞ − ∞`, `0 × ∞`, `∞/∞`, `0/0`, `1^∞`.
- Fraction rationnelle en n : seuls les termes de plus haut degré comptent à l'infini | `lim (a n^p + …)/(b n^q + …)` vaut `a/b` si p = q, 0 si p < q, ±∞ si p > q.
- Théorème d'encadrement (des gendarmes) : coincée entre deux suites qui ont la même limite, la suite a aussi cette limite | `v_n ≤ u_n ≤ w_n` et `v_n, w_n → ℓ` ⇒ `u_n → ℓ`.
- Limites de référence (formulaire du TD) : à retenir par cœur | `(1 + a/n)^n → e^a` ; `ln n / n → 0` ; `n·sin(1/n) → 1` ; `n²(1 − cos(1/n)) → 1/2` ; `n·ln(1 + 1/n) → 1` ; `n(a^{1/n} − 1) → ln a`.
- Suites extraites : la sous-suite des indices pairs, celle des impairs | si elles n'ont pas la même limite, la suite n'a pas de limite.
- Théorème de la limite monotone : croissante + majorée ⇒ converge ; décroissante + minorée ⇒ converge | une suite croissante non majorée tend vers +∞.
- Point fixe : nombre ℓ qui ne bouge pas quand on applique la règle | si `u_{n+1} = f(u_n)`, f continue et `u_n → ℓ`, alors `ℓ = f(ℓ)`.
- Suites adjacentes : une monte, l'autre descend, et leur écart tend vers 0 | `(u_n)` croissante, `(v_n)` décroissante, `v_n − u_n → 0` ⇒ même limite.

## Méthodes
### Calculer un terme d'une suite arithmétique ou géométrique
1. Repère le premier terme (souvent `u_0`) et la raison (r ajoutée ou q multipliée).
2. Arithmétique : `u_n = u_0 + n·r`. Géométrique : `u_n = u_0·q^n`.
3. Si le premier terme est `u_1`, remplace n par `n − 1` : `u_n = u_1 + (n−1)r` ou `u_1·q^{n−1}`.

### Reconnaître une suite géométrique
1. Calcule les quotients `u_1/u_0`, `u_2/u_1`, `u_3/u_2`.
2. S'ils sont tous égaux à un même q, la suite est (probablement) géométrique de raison q ; on le prouve en écrivant `u_{n+1} = q·u_n`.

### Étudier le sens de variation
1. Calcule la différence `u_{n+1} − u_n` et simplifie-la (mettre au même dénominateur, factoriser).
2. Étudie son signe : positif pour tout n ⇒ croissante ; négatif ⇒ décroissante.
3. Pour une suite géométrique à termes positifs : q > 1 ⇒ croissante ; 0 < q < 1 ⇒ décroissante.

### Calculer une limite de fraction rationnelle
1. Dans le numérateur et le dénominateur, repère le terme de plus haut degré.
2. Mets-le en facteur (ou garde seulement ces deux termes).
3. Simplifie : même degré ⇒ quotient des coefficients ; dénominateur plus fort ⇒ 0 ; numérateur plus fort ⇒ ±∞ (signe des coefficients).

### Lever une indétermination `∞ − ∞` avec des racines
1. Multiplie et divise par l'expression conjuguée : `(√A − √B) = (A − B)/(√A + √B)`.
2. Simplifie le numérateur, puis conclus.

### Utiliser une limite de référence
1. Transforme l'expression pour faire apparaître exactement la forme de référence (même chose dans le sinus et devant).
2. Exemple : `n·sin(2/n) = 2 · [(n/2)·sin(2/n)]` et le crochet tend vers 1.
3. Pour `(1 + a/n)^{bn}`, écris `[(1 + a/n)^n]^b → (e^a)^b = e^{ab}`.

### Montrer qu'une suite n'a pas de limite
1. Regarde séparément les termes d'indice pair et ceux d'indice impair.
2. Si les deux sous-suites ont des limites différentes, la suite diverge.

### Étudier une suite récurrente `u_{n+1} = f(u_n)`
1. Calcule les premiers termes pour deviner le comportement.
2. Montre par récurrence que tous les termes restent dans un intervalle (par exemple `u_n > 1`).
3. Étudie le signe de `u_{n+1} − u_n` pour obtenir la monotonie.
4. Monotone + bornée ⇒ converge. Trouve ℓ en résolvant `ℓ = f(ℓ)`.
5. Garde seulement la solution compatible avec l'intervalle de l'étape 2. S'il n'y en a aucune, la suite (monotone) tend vers ±∞.

### Trouver un seuil (à partir de quel rang…)
1. Écris l'inégalité, par exemple `P_0·q^n < S`.
2. Divise : `q^n < S/P_0`, puis applique ln : `n·ln q < ln(S/P_0)`.
3. Attention : si `0 < q < 1`, ln q est négatif, donc on inverse le sens en divisant : `n > ln(S/P_0)/ln q`.
4. Prends le premier entier qui convient et vérifie par le calcul de deux termes consécutifs.

## Exemples résolus
### Une suite géométrique lue sur un graphique (Ex. 8) : `u_0 = 8`, `u_1 = 4`, `u_2 = 2`, `u_3 = 1`. Trouver `u_n`, `u_10` et `S_10 = u_0 + … + u_10`.
- `u_1/u_0 = u_2/u_1 = u_3/u_2 = 1/2` — on multiplie toujours par 1/2 : raison q = 1/2.
- `u_n = 8 × (1/2)^n = 2^{3−n}` — formule de la suite géométrique.
- `u_10 = 2^{−7} = 1/128 ≈ 0,0078` — on remplace n par 10.
- `S_10 = 8 × (1 − (1/2)^{11})/(1 − 1/2) = 2047/128 ≈ 15,992` — formule de la somme : 11 termes, de n = 0 à n = 10.

### Pression atmosphérique (Ex. 9) : `P_0 = 1013 hPa`, baisse de 1,5 % tous les 100 m.
- `P_{n+1} = (1 − 0,015)·P_n = 0,985·P_n` — baisser de 1,5 %, c'est multiplier par 0,985 : suite géométrique de raison 0,985.
- `P_n = 1013 × 0,985^n` — formule explicite.
- À 3200 m, n = 32 : `P_32 = 1013 × 0,985^32 ≈ 624,55 hPa`.
- Seuil 600 hPa : `0,985^n < 600/1013 ≈ 0,5923` ⇒ `n > ln(0,5923)/ln(0,985) ≈ 34,65` — on inverse le sens car ln(0,985) < 0.
- Vérification : `P_34 ≈ 605,96 > 600` et `P_35 ≈ 596,87 < 600` — la pression passe sous 600 hPa à partir de 3500 m.

### Limite d'une fraction rationnelle (Ex. 5.2 et 5.5)
- `(n² − n + 5)/(2n + 6)` : plus haut degré n² en haut, n en bas — numérateur plus fort, limite +∞.
- `(1 + 2 + … + n)/n² = [n(n+1)/2]/n² = (n + 1)/(2n)` — on utilise la formule de la somme des entiers.
- `(n + 1)/(2n) → 1/2` — même degré : quotient des coefficients 1/2.

### Une limite de référence (Ex. 5.22) : `lim (1 + 3/n)^{4n}`
- `(1 + 3/n)^{4n} = [(1 + 3/n)^n]^4` — on regroupe la puissance.
- `(1 + 3/n)^n → e^3` — formule `(1 + a/n)^n → e^a` avec a = 3.
- Limite : `(e^3)^4 = e^{12}`.

### Encadrement (Ex. 4) : `a_n = cos n / (e^{3n} + 1)`
- `−1 ≤ cos n ≤ 1` — un cosinus reste toujours entre −1 et 1.
- Donc `−1/(e^{3n}+1) ≤ a_n ≤ 1/(e^{3n}+1)` — on divise par un nombre positif.
- Les deux bornes tendent vers 0, donc `a_n → 0` — théorème des gendarmes.

### Suite récurrente (Ex. 10.11) : `u_0 = 2`, `u_{n+1} = 5 − 4/u_n`
- `u_1 = 5 − 4/2 = 3`, `u_2 = 5 − 4/3 = 11/3` — les termes montent.
- Si `1 < u_n < 4`, alors `1 < u_{n+1} < 4` — la suite reste coincée entre 1 et 4.
- `u_{n+1} − u_n = −(u_n − 1)(u_n − 4)/u_n > 0` — un facteur positif, un négatif, signe moins devant : croissante.
- Croissante et majorée par 4 ⇒ converge vers ℓ avec `ℓ = 5 − 4/ℓ`, soit `ℓ² − 5ℓ + 4 = 0`, donc ℓ = 1 ou ℓ = 4.
- La suite part de 2 et monte : ℓ = 1 est impossible, donc ℓ = 4.

### Suite « moyenne des deux précédents » (Ex. 11) : `u_0 = a`, `u_1 = b`, `u_{n+2} = (u_n + u_{n+1})/2`
- `v_n = u_n − u_{n−1}` vérifie `v_n = −(1/2)·v_{n−1}` — suite géométrique de raison −1/2, qui tend vers 0.
- `v_1 + … + v_N = u_N − u_0` — les termes s'annulent deux à deux (somme télescopique).
- Avec la somme géométrique : `u_N = a + (2(b − a)/3)·(1 − (−1/2)^N)` → `(a + 2b)/3`.

## Pièges fréquents
- Confondre ajouter et multiplier → arithmétique : on ajoute r ; géométrique : on multiplie par q.
- Oublier que le premier terme est `u_0` (et non `u_1`) → `u_n = u_0 q^n` ; si l'on part de `u_1`, l'exposant est `n − 1`.
- Compter mal les termes d'une somme → de `u_0` à `u_n`, il y a `n + 1` termes, d'où le `q^{n+1}`.
- Baisse de 1,5 % = multiplier par 0,015 → non : on multiplie par `1 − 0,015 = 0,985`.
- Diviser par ln q sans changer le sens alors que `0 < q < 1` → ln q < 0, il faut inverser l'inégalité.
- Croire que `(1 + 1/n)^n → 1` parce que `1 + 1/n → 1` → forme indéterminée `1^∞` : la limite vaut e.
- Croire que « convergente ⇒ monotone » ou « monotone ⇒ convergente » → faux tous les deux (contre-exemples `(−1)^n/n` et `u_n = n`).
- Croire que « croissante et minorée ⇒ converge » → il faut **majorée** pour une suite croissante (`u_n = n` est minorée par 0).
- Garder toutes les solutions de `ℓ = f(ℓ)` → on élimine celles qui sont hors de l'intervalle où vit la suite ; parfois aucune ne convient et la suite tend vers l'infini.
- Écrire `u_n·v_n → 0` dès que `u_n → 0` → faux si `v_n` est non bornée (`(1/n) × n = 1`) ; vrai si `v_n` est bornée.
- Croire que la limite d'une suite strictement positive est strictement positive → elle est seulement `≥ 0` (`1/n > 0` mais tend vers 0).

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu'est-ce qu'une suite ? | Une liste infinie et ordonnée de nombres `u_0, u_1, u_2, …` |
| Que désigne `u_n` ? | Le terme de rang n (terme général) de la suite. |
| Suite arithmétique : définition ? | On ajoute toujours la même raison r : `u_{n+1} = u_n + r`. |
| Terme général d'une suite arithmétique ? | `u_n = u_0 + n·r` |
| Suite géométrique : définition ? | On multiplie toujours par la même raison q : `u_{n+1} = q·u_n`. |
| Terme général d'une suite géométrique ? | `u_n = u_0·q^n` |
| Baisser de t % revient à multiplier par ? | `1 − t/100` (ex. −1,5 % → × 0,985). |
| Somme `1 + 2 + … + n` ? | `n(n + 1)/2` |
| Somme `u_0 + … + u_n` (géométrique, q ≠ 1) ? | `u_0·(1 − q^{n+1})/(1 − q)` |
| Comment étudier le sens de variation ? | Étudier le signe de `u_{n+1} − u_n`. |
| Suite bornée : définition ? | Il existe a ≥ 0 tel que `|u_n| ≤ a` pour tout n. |
| Que signifie « `u_n` converge vers ℓ » ? | Les termes finissent par rester aussi près qu'on veut de ℓ. |
| Croissante et majorée ⇒ ? | La suite converge. |
| Décroissante et minorée ⇒ ? | La suite converge. |
| Convergente ⇒ monotone ? | Faux : `(−1)^n/n` converge vers 0 sans être monotone. |
| Croissante et non majorée ⇒ ? | Elle tend vers +∞. |
| Limite de `(an^p + …)/(bn^p + …)` (même degré) ? | `a/b` |
| Limite si le degré du dénominateur est plus grand ? | 0 |
| `lim (1 + a/n)^n` ? | `e^a` |
| `lim n·sin(1/n)` ? | 1 |
| `lim n²(1 − cos(1/n))` ? | 1/2 |
| `lim ln(n)/n` ? | 0 |
| Théorème des gendarmes ? | Si `v_n ≤ u_n ≤ w_n` et `v_n, w_n → ℓ`, alors `u_n → ℓ`. |
| `u_n → 0` et `v_n` bornée ⇒ ? | `u_n·v_n → 0` |
| Comment prouver qu'une suite n'a pas de limite ? | Trouver deux sous-suites (pairs/impairs) de limites différentes. |
| Limite ℓ d'une suite `u_{n+1} = f(u_n)` vérifie ? | `ℓ = f(ℓ)` (f continue). |
| Lever `√(n+2) − √n` ? | Multiplier par la quantité conjuguée : `2/(√(n+2) + √n) → 0`. |
| Suite géométrique avec `|q| < 1` : limite ? | 0 |
| Suites adjacentes ? | Une croissante, une décroissante, écart → 0 : même limite. |

## Exercices générables

### suite-arith-terme — Terme d'une suite arithmétique
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : La suite (u_n) est arithmétique, de premier terme u_0 = {a} et de raison r = {r}. Calcule u_{n}.
- Paramètres : a entier dans [−20 ; 20] ; r entier dans [−9 ; 9], r ≠ 0 ; n entier dans [2 ; 15].
- Réponse : `a + n·r`
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : `a + (n−1)·r` → décalage d'indice (comme si le premier terme était u_1) ; `a·r^n` → confusion avec une suite géométrique ; `a + r` → une seule étape.
- Explication de la solution : « On ajoute r à chaque étape. De u_0 à u_{n}, on fait {n} étapes : u_{n} = {a} + {n} × ({r}) = {réponse}. »
- Inspiré de : notion de base (prérequis implicite du TD, Ex. 8 et 9).

### suite-geo-terme — Terme d'une suite géométrique
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : La suite (u_n) est géométrique, de premier terme u_0 = {a} et de raison q = {q}. Calcule u_{n}.
- Paramètres : a entier dans [1 ; 10] ; q dans {−3, −2, 2, 3} ; n entier dans [2 ; 6] (réponse ≤ 7 290 en valeur absolue). Variante « demi » : q = 1/2, a = 2^k avec k dans [4 ; 8], n ≤ k (réponse entière).
- Réponse : `a·q^n`
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : `a + n·q` → confusion avec arithmétique ; `a·q^(n−1)` → décalage d'indice ; `(a·q)^n` → mauvaise priorité de la puissance.
- Explication de la solution : « On multiplie par q à chaque étape, {n} fois : u_{n} = {a} × ({q})^{n} = {réponse}. »
- Inspiré de : Ex. 8 (questions 2 à 4).

### suite-variation-qcm — Sens de variation d'une suite simple
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : Variante A : « (u_n) est arithmétique de raison {r}. Elle est : croissante / décroissante / constante. » Variante B : « (u_n) est géométrique, u_0 = {a} > 0, raison q = {q}. Elle est : croissante / décroissante / constante / ni croissante ni décroissante. »
- Paramètres : r entier dans [−9 ; 9] (0 autorisé) ; a dans [1 ; 10] ; q dans {0,5 ; 0,985 ; 1 ; 1,02 ; 2 ; 3 ; −2 ; −0,5}.
- Réponse : A : croissante si r > 0, décroissante si r < 0, constante si r = 0. B : q > 1 → croissante ; 0 < q < 1 → décroissante ; q = 1 → constante ; q < 0 → ni l'un ni l'autre (signes alternés).
- Vérification : égalité du choix.
- Distracteurs (QCM) ou erreurs typiques (numérique) : « décroissante » pour q = 1,02 → croire qu'il faut q > 2 ; « croissante » pour q = −2 → oublier l'alternance des signes ; « croissante » pour 0 < q < 1 → confondre « positif » et « croissant ».
- Explication de la solution : « u_{n+1} − u_n = r (cas A) ou u_n(q − 1) (cas B) ; on regarde son signe. »
- Inspiré de : Ex. 8 et 9 ; Ex. 1 (questions 11 à 16).

### suite-vrai-faux — Vrai ou faux sur les théorèmes de convergence
- Niveau : 2
- Forme : `qcm` (Vrai / Faux)
- Énoncé gabarit : « Vrai ou faux : {énoncé}. »
- Paramètres : tirage dans la banque de l'Ex. 1 (réponses du corrigé) : (1) |u_n| majorée ⇒ (u_n) bornée : Vrai ; (2) |u_n| → 0 ⇒ u_n → 0 : Vrai ; (3) u_n > 0 et u_n → ℓ ⇒ ℓ > 0 : Faux ; (4) u_n → 0 ⇒ u_n·v_n → 0 pour toute (v_n) : Faux ; (5) |u_n| et |v_n| convergent ⇒ |u_n + v_n| converge : Vrai (selon le corrigé ; voir Notes) ; (6) |u_n + v_n| converge ⇒ |u_n| et |v_n| convergent : Faux ; (7) à (10) u_n ≤ v_n (ou ≥) et l'une converge ⇒ l'autre converge : Faux ; (11) convergente ⇒ monotone : Faux ; (12) monotone ⇒ convergente : Faux ; (13) croissante et majorée ⇒ converge : Vrai ; (14) croissante et minorée ⇒ converge : Faux ; (15) décroissante et majorée ⇒ converge : Faux ; (16) décroissante et minorée ⇒ converge : Vrai.
- Réponse : la valeur de la banque.
- Vérification : égalité du choix.
- Distracteurs (QCM) ou erreurs typiques (numérique) : l'autre choix ; erreurs typiques : confondre majorée et minorée (13/14), croire que l'inégalité transmet la convergence (7–10).
- Explication de la solution : afficher le contre-exemple du corrigé (ex. (14) : u_n = n est croissante, minorée par 0, mais tend vers +∞).
- Inspiré de : Ex. 1.

### suite-recurrence-termes — Calculer les premiers termes d'une suite récurrente
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : u_0 = {a} et, pour tout n, u_{n+1} = {c}·u_n + {d}. Calcule u_3.
- Paramètres : a entier dans [−5 ; 5] ; c entier dans {−2, 2, 3} ; d entier dans [−5 ; 5].
- Réponse : `c³·a + d·(c² + c + 1)`
- Vérification : égalité exacte ; l'application peut aussi calculer en boucle trois fois.
- Distracteurs (QCM) ou erreurs typiques (numérique) : valeur de u_2 → une itération de moins ; valeur de u_4 → une de trop ; `c³·a + d` → ajout de d une seule fois.
- Explication de la solution : « u_1 = {c}×{a} + {d} = …, u_2 = {c}×u_1 + {d} = …, u_3 = {c}×u_2 + {d} = {réponse}. »
- Inspiré de : Ex. 10 (calcul des premiers termes, ex. 10.11 : u_1 = 3, u_2 = 11/3).

### suite-limite-rationnelle — Limite d'une fraction rationnelle en n
- Niveau : 2
- Forme : `numerique` (variante même degré) ou `qcm` (variante degrés différents : choix 0 / +∞ / −∞ / a/b)
- Énoncé gabarit : Calcule lim_{n→+∞} ({a}n² + {b}n + {c}) / ({d}n² + {e}n + {f}).
- Paramètres : a entier non nul dans [−9 ; 9] ; d dans {1, 2, 4, 5, 10} (réponse décimale finie) ; b, c, e, f entiers dans [−9 ; 9] avec le dénominateur non nul pour n ≥ 1. Variante QCM : degré du numérateur 1 ou 3.
- Réponse : `a/d` (même degré) ; 0 si le dénominateur a le plus grand degré ; signe(a/d)·∞ sinon.
- Vérification : tolérance 0,001 sur la valeur décimale.
- Distracteurs (QCM) ou erreurs typiques (numérique) : `c/f` → quotient des termes constants ; `b/e` → mauvais terme ; `1` → « tout tend vers l'infini donc 1 ».
- Explication de la solution : « On met n² en facteur en haut et en bas : ({a} + {b}/n + {c}/n²)/({d} + {e}/n + {f}/n²) → {a}/{d}. »
- Inspiré de : Ex. 5 (1, 2, 5, 6, 8) et Ex. 6.

### suite-limite-reference — Limites de référence
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Variante A : « lim (1 + {a}/n)^{{b}n} = e^k. Donne k. » Variante B : « Calcule lim n·sin({a}/n). » Variante C : « Calcule lim n²(1 − cos({a}/n)). »
- Paramètres : a entier dans [−5 ; 5], a ≠ 0 (variante C : a dans [1 ; 6]) ; b entier dans [1 ; 5].
- Réponse : A : `a·b` ; B : `a` ; C : `a²/2`.
- Vérification : égalité exacte (C : tolérance 0,001).
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : `0` → croire que (1 + a/n) → 1 donc la puissance → 1 ; `a + b` ou `a` → mauvais regroupement. B : `1` → oublier le facteur a. C : `a/2` ou `1/2` → oublier le carré.
- Explication de la solution : A : « [(1 + {a}/n)^n]^{b} → (e^{a})^{b} = e^{ab}. » B : « n·sin(a/n) = a·[(n/a)·sin(a/n)] et le crochet → 1. » C : « n²(1 − cos(a/n)) = a²·[(n/a)²(1 − cos(a/n))] et le crochet → 1/2. »
- Inspiré de : Ex. 5 (10, 14, 18, 22) et formulaire p. 1.

### suite-somme-geometrique — Somme de termes d'une suite géométrique
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : (u_n) est géométrique, u_0 = {a}, raison q = {q}. Calcule S = u_0 + u_1 + … + u_{n}.
- Paramètres : a entier dans [1 ; 10] ; q dans {2, 3} ; n dans [2 ; 6]. Variante : q = 1/2, a = 2^k (k dans [3 ; 6]), n dans [3 ; 10].
- Réponse : `a·(1 − q^{n+1})/(1 − q)`
- Vérification : entier exact pour q ∈ {2, 3} ; tolérance 0,001 pour q = 1/2.
- Distracteurs (QCM) ou erreurs typiques (numérique) : `a(1 − q^n)/(1 − q)` → un terme oublié (n au lieu de n + 1 termes) ; `a·q^n` → dernier terme seulement ; `a/(1 − q)` → somme infinie.
- Explication de la solution : « Il y a {n}+1 termes. S = {a} × (1 − {q}^{n+1})/(1 − {q}) = {réponse}. » Exemple du TD : 8 × (1 − 2^{−11})/(1 − 1/2) = 2047/128 ≈ 15,992.
- Inspiré de : Ex. 8 (question 5).

### suite-seuil-pourcentage — Évolution en pourcentage et seuil
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Une grandeur vaut {P0} au départ et baisse de {t} % à chaque étape. Variante A : « Quelle est sa valeur après {n} étapes ? (arrondi à 0,01) ». Variante B : « Après combien d'étapes devient-elle strictement inférieure à {S} pour la première fois ? »
- Paramètres : P0 dans {500, 1000, 1013, 2000} ; t dans {1 ; 1,5 ; 2 ; 5 ; 10} ; n dans [1 ; 40] ; S entier avec 0,2·P0 ≤ S ≤ 0,9·P0.
- Réponse : A : `P0·(1 − t/100)^n`. B : plus petit entier n tel que `P0·(1 − t/100)^n < S` (calculer en boucle, ce qui évite l'erreur d'arrondi de la formule `n > ln(S/P0)/ln(1 − t/100)`).
- Vérification : A : tolérance 0,01 ; B : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : `P0·(1 − t·n/100)` → baisse appliquée à la valeur initiale (modèle arithmétique) ; `P0·(t/100)^n` → multiplier par t % au lieu de 1 − t %. B : partie entière de ln(S/P0)/ln q sans +1 → un rang trop tôt (le TD écrit « ≃ 34 » alors que le premier rang sous 600 est 35).
- Explication de la solution : « q = 1 − {t}/100. On cherche q^n < {S}/{P0}, soit n > ln({S}/{P0})/ln q (on inverse car ln q < 0) ≈ … ; le premier entier est {réponse}. Vérification : P_{réponse−1} ≥ {S} et P_{réponse} < {S}. »
- Inspiré de : Ex. 9 (P_32 ≈ 624,55 hPa ; passage sous 600 hPa à n = 35, soit 3500 m).

### suite-limite-recurrente — Limite d'une suite récurrente (point fixe)
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Variante A : « u_0 = {u0}, u_{n+1} = (1/{m})·u_n + {b}. On admet que (u_n) converge. Calcule sa limite. » Variante B : « u_0 = 1, u_{n+1} = ({a} + 1 + u_n)/{a}. Calcule lim u_n. » Variante C : « u_0 = {a}, u_1 = {b}, u_{n+2} = (u_n + u_{n+1})/2. Calcule lim u_n. »
- Paramètres : A : m dans {2, 3, 4, 5}, b = (m − 1)·k avec k entier dans [−5 ; 5], u0 dans [−10 ; 10]. B : a dans {2, 3, 5} (a > 1). C : a, b entiers dans [−9 ; 9] avec a + 2b divisible par 3.
- Réponse : A : `b·m/(m − 1)` (= m·k) ; B : `(a + 1)/(a − 1)` ; C : `(a + 2b)/3`.
- Vérification : A et C : égalité exacte ; B : tolérance 0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : `b` → oublier de résoudre ℓ = ℓ/m + b ; `u0` → croire que la limite dépend du départ. C : `(a + b)/2` → moyenne naïve des deux premiers termes.
- Explication de la solution : A : « ℓ = ℓ/{m} + {b} ⇒ ℓ(1 − 1/{m}) = {b} ⇒ ℓ = {réponse}. » B : « ℓ = (a + 1 + ℓ)/a ⇒ aℓ − ℓ = a + 1 ⇒ ℓ = (a+1)/(a−1). » C : « v_n = u_n − u_{n−1} est géométrique de raison −1/2 ; en sommant, u_N → a + 2(b − a)/3 = (a + 2b)/3. »
- Inspiré de : Ex. 10, Ex. 11, Ex. 12 (question 4, cas a > 1).

---

# Chapitre : Séries numériques
Source : « TD MVA005 serie.pdf » (CNAM Liban, MVA005, Dr N. Assaad), 11 pages — formulaire (p. 1), exercices 1 à 11 (p. 1 à 11). Le TD couvre aussi les séries entières (Ex. 3 à 8, 10) et l'intégration par développement en série (Ex. 11). Ex. 2 du TD « Suites » (somme télescopique) est repris ici.
Niveau visé : calculer des sommes partielles ; reconnaître et sommer une série géométrique ; décider de la nature d'une série (divergence grossière, Riemann, comparaison, d'Alembert, Cauchy) ; calculer un rayon de convergence simple ; utiliser la série exponentielle pour calculer une somme.
Prérequis : chapitre « Suites numériques » (limites, suites géométriques, somme géométrique finie) ; factorielle `n! = 1 × 2 × … × n` ; fonction exponentielle ; racine n-ième `ⁿ√x = x^{1/n}`.

## Explication pour un novice
Une série, c'est ce qu'on obtient quand on additionne les termes d'une suite, les uns après les autres, sans jamais s'arrêter : `u_0 + u_1 + u_2 + …`. Imagine que tu marches vers un mur : tu fais un pas d'1 m, puis un pas de 1/2 m, puis 1/4 m, puis 1/8 m… Tu fais une infinité de pas, mais tu ne dépasses jamais 2 m. Additionner une infinité de nombres peut donc donner un résultat fini.

Pour le savoir, on regarde les sommes partielles (on s'arrête après N termes) : `S_N = u_0 + u_1 + … + u_N`. C'est une nouvelle suite. Si `S_N` se rapproche d'un nombre S quand N grandit, la série converge et S est sa somme. Sinon, elle diverge. Étudier une série, c'est donc étudier la suite de ses sommes partielles.

Premier réflexe : si les pas ne deviennent pas minuscules (si `u_n` ne tend pas vers 0), la somme part forcément à l'infini (divergence grossière). Attention, la réciproque est fausse : les pas `1, 1/2, 1/3, 1/4, …` deviennent minuscules, mais leur somme (la série harmonique) dépasse quand même n'importe quel mur.

Pour décider, on compare à des séries de référence. La série géométrique `1 + q + q² + …` converge exactement quand `|q| < 1`, et vaut alors `1/(1 − q)`. La série de Riemann `∑ 1/n^p` converge exactement quand `p > 1`. Deux tests pratiques regardent comment les termes rétrécissent : le rapport `u_{n+1}/u_n` (règle de d'Alembert) ou la racine n-ième `ⁿ√u_n` (règle de Cauchy). Si cette limite est inférieure à 1, les termes rétrécissent « au moins comme une suite géométrique » : la série converge.

Enfin, quand les termes contiennent une puissance `x^n`, on parle de série entière : elle se comporte comme un polynôme infini. Elle converge pour les x assez proches de 0 : pour `|x| < R`, où R est le rayon de convergence. La plus célèbre est `∑ x^n/n! = e^x`.

## Notions (dans l'ordre d'apprentissage)
- Série de terme général `u_n` : l'addition sans fin des termes d'une suite | notée `∑ u_n`.
- Somme partielle : la somme des premiers termes, jusqu'au rang N | `S_N = ∑_{n=n_0}^{N} u_n`.
- Série convergente / somme : les sommes partielles ont une limite finie S | `S = lim_{N→∞} S_N = ∑_{n=n_0}^{∞} u_n`.
- Série divergente : les sommes partielles n'ont pas de limite finie | `S_N → ±∞` ou pas de limite.
- Série télescopique : chaque terme est une différence, les termes intermédiaires s'annulent | `∑_{n=1}^{N} (a_n − a_{n+1}) = a_1 − a_{N+1}`.
- Série géométrique : on additionne les puissances d'un même nombre | `∑_{n≥0} x^n` converge ⟺ `|x| < 1`, somme `1/(1 − x)` ; `S_n = (1 − x^{n+1})/(1 − x)`.
- Divergence grossière : si le terme général ne tend pas vers 0, la série diverge | `u_n ↛ 0 ⇒ ∑ u_n` diverge (réciproque fausse).
- Série harmonique : `1 + 1/2 + 1/3 + …`, elle diverge | `∑ 1/n` diverge alors que `1/n → 0`.
- Série de Riemann : référence pour les puissances de n | `∑ 1/n^p` converge ⟺ `p > 1`.
- Comparaison (termes positifs) : plus petit qu'une série convergente ⇒ converge ; plus grand qu'une série divergente ⇒ diverge | `0 ≤ u_n ≤ v_n` ; même conclusion si `u_n ~ v_n` (équivalents).
- Convergence absolue : si la série des valeurs absolues converge, la série converge | `∑ |u_n|` converge ⇒ `∑ u_n` converge.
- Règle de d'Alembert : on regarde le rapport de deux termes consécutifs | `ℓ = lim |u_{n+1}/u_n|` ; ℓ < 1 ⇒ converge ; ℓ > 1 ⇒ diverge ; ℓ = 1 ⇒ on ne peut pas conclure.
- Règle de Cauchy : on regarde la racine n-ième | `ℓ = lim ⁿ√|u_n|` ; mêmes conclusions.
- Série alternée : les signes alternent ; si `|u_n|` décroît vers 0, elle converge | `∑ (−1)^n a_n`, `a_n ↘ 0`.
- Série exponentielle : la somme des `x^n/n!` vaut `e^x` pour tout x | `∑_{n≥0} x^n/n! = e^x`.
- Série entière et rayon de convergence : série de la forme `∑ a_n x^n` ; elle converge si `|x| < R` et diverge si `|x| > R` | `R = 1/ℓ` avec `ℓ = lim |a_{n+1}/a_n|` ou `lim ⁿ√|a_n|` (1/0 = ∞, 1/∞ = 0).
- Domaine de convergence : l'ensemble des x où la série converge ; il faut étudier à part les bords `x = ±R` | `]−R ; R[ ⊂ D ⊂ [−R ; R]`.

## Méthodes
### Calculer une somme partielle
1. Écris les premiers termes `u_{n_0}, u_{n_0+1}, …` en remplaçant n.
2. Additionne-les un par un : `S_{n_0} = u_{n_0}`, puis `S_{n_0+1} = S_{n_0} + u_{n_0+1}`, etc.
3. Attention au premier indice : la série peut commencer à n = 0, 1 ou 2 (là où le terme est défini).

### Sommer une série télescopique
1. Décompose le terme : par exemple `1/(n(n+1)) = 1/n − 1/(n+1)`.
2. Écris la somme partielle : tout s'annule sauf le premier et le dernier morceau, `S_N = 1 − 1/(N+1)`.
3. Passe à la limite : `S = 1`.

### Sommer une série géométrique
1. Repère le premier terme A et la raison q (le rapport entre deux termes consécutifs).
2. Vérifie `|q| < 1` ; sinon la série diverge.
3. Somme = `A/(1 − q)` (premier terme divisé par « 1 moins la raison »).

### Décider de la nature d'une série (arbre de décision)
1. Le terme général tend-il vers 0 ? Sinon : divergence grossière.
2. Est-ce une série de référence (géométrique, Riemann) ? Conclus directement.
3. Le terme contient une puissance n-ième ou une factorielle ? Essaie d'Alembert (rapport) ou Cauchy (racine n-ième).
4. C'est une fraction de polynômes en n ? Garde les termes dominants : `(n + 3)/n² ~ 1/n` (diverge), `1/(n² + 4n − 5) ~ 1/n²` (converge).
5. Termes de signe variable ? Étudie d'abord `∑ |u_n|` (convergence absolue).

### Calculer un rayon de convergence
1. Isole le coefficient `a_n` devant `x^n`.
2. Calcule `ℓ = lim |a_{n+1}/a_n|` ou `ℓ = lim ⁿ√|a_n|`.
3. `R = 1/ℓ` (R = +∞ si ℓ = 0 ; R = 0 si ℓ = +∞).
4. Pour le domaine : étudie séparément `x = R` et `x = −R`.

### Utiliser la série exponentielle
1. Décompose le polynôme en n sur la base `1, n, n(n−1), n(n−1)(n−2)` : par exemple `n² = n(n−1) + n`.
2. Simplifie avec la factorielle : `n(n−1)/n! = 1/(n−2)!`.
3. Reconnais `∑ x^{n−k}/(n−k)! = e^x` : par exemple `∑ n x^n/n! = x e^x` et `∑ n² x^n/n! = (x² + x)e^x`.

## Exemples résolus
### Sommes partielles de `∑_{n≥1} 1/(n(n+1))` (Ex. 1.1)
- `u_1 = 1/2`, `u_2 = 1/6`, `u_3 = 1/12`, `u_4 = 1/20` — on remplace n par 1, 2, 3, 4.
- `S_1 = 1/2`, `S_2 = 2/3`, `S_3 = 3/4`, `S_4 = 4/5` — on additionne au fur et à mesure ; on devine `S_N = N/(N+1)`.
- `1/(n(n+1)) = 1/n − 1/(n+1)` donc `S_N = 1 − 1/(N+1)` — somme télescopique.
- `S = lim S_N = 1` — la série converge et sa somme vaut 1.

### Série géométrique (Ex. 9)
- `(1 − x)S_n = (1 + x + … + x^n) − (x + … + x^{n+1}) = 1 − x^{n+1}` — presque tout s'annule.
- `S_n = (1 − x^{n+1})/(1 − x)` pour x ≠ 1.
- Si `|x| < 1`, `x^{n+1} → 0` donc `S = 1/(1 − x)` ; si x = 1, `S_n = n + 1 → ∞` ; si `|x| > 1`, divergence.

### d'Alembert sur `∑ n/2^n` (Ex. 2.2)
- `u_{n+1}/u_n = [(n+1)/2^{n+1}] × [2^n/n] = (n+1)/(2n)` — on simplifie les puissances de 2.
- Limite : `1/2 < 1` — la série converge (sa somme vaut 2).

### Comparaison (Ex. 2.3 et 2.7)
- `(n + 3)/n² = 1/n + 3/n²` — la série harmonique diverge, donc la série diverge.
- `1/∛(n²) = 1/n^{2/3}` — Riemann avec p = 2/3 < 1 : divergente.

### Cauchy (Ex. 2.6, version réelle) : `u_n = n·(5/4)^n`
- `ⁿ√u_n = ⁿ√n × 5/4` — on sépare les deux facteurs.
- `ⁿ√n → 1` donc `ⁿ√u_n → 5/4 > 1` — la série diverge.

### Rayon de convergence de `∑ x^n/3^{3n}` (Ex. 3.3)
- `ⁿ√(1/3^{3n}) = 1/3³ = 1/27` — racine n-ième d'une puissance n-ième.
- `R = 27` ; en `x = ±27`, `|u_n| = 1` ne tend pas vers 0 : divergence. Domaine `]−27 ; 27[`.
- C'est une série géométrique de raison x/27 : somme `27/(27 − x)`.

### Somme avec l'exponentielle (Ex. 10) : `∑ (an² + bn + c) x^n/n!`
- `∑ x^n/n! = e^x`, `∑ n x^n/n! = x e^x`, `∑ n² x^n/n! = (x² + x)e^x`.
- Total : `(a x² + (a + b)x + c)·e^x`.

## Pièges fréquents
- Croire que `u_n → 0` suffit pour converger → la série harmonique `∑ 1/n` diverge alors que `1/n → 0`.
- Confondre la suite `(u_n)` et la série `∑ u_n` → la suite `1/n` converge (vers 0), la série `∑ 1/n` diverge.
- Écrire la somme géométrique `1/(1 − q)` quand le premier terme n'est pas 1 → c'est `premier terme/(1 − q)`.
- Oublier la condition `|q| < 1` (et pas seulement q < 1) → avec q = −2, la série diverge.
- Conclure avec d'Alembert ou Cauchy quand la limite vaut 1 → on ne peut rien dire (ex. `∑ 1/n` et `∑ 1/n²` donnent tous deux 1).
- Inverser Riemann → converge pour p > 1 (strictement) ; p = 1 (harmonique) diverge.
- Comparer sans vérifier les signes → la comparaison et les équivalents ne valent que pour des termes positifs (à partir d'un certain rang).
- Oublier le premier indice → `∑_{n≥2} n²/(n−1)` ne peut pas commencer à n = 1 ; `∑ (−1)^n x^n/n!` commence à n = 0 avec le terme 1.
- Prendre ℓ pour le rayon → le rayon est `R = 1/ℓ`, pas ℓ.
- Oublier d'étudier les bords `x = ±R` → la série peut converger d'un côté et pas de l'autre (Ex. 3.8 : `[−1 ; 1[`).

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu'est-ce qu'une série ? | L'addition sans fin des termes d'une suite : `u_0 + u_1 + u_2 + …` |
| Somme partielle `S_N` ? | La somme des termes jusqu'au rang N. |
| Quand dit-on qu'une série converge ? | Quand la suite des sommes partielles a une limite finie. |
| Somme `1 + x + … + x^n` (x ≠ 1) ? | `(1 − x^{n+1})/(1 − x)` |
| Série géométrique `∑ x^n` : quand converge-t-elle ? | Exactement quand `|x| < 1`. |
| Somme de `∑_{n≥0} x^n` si `|x| < 1` ? | `1/(1 − x)` |
| Somme d'une géométrique de premier terme A et raison q ? | `A/(1 − q)` si `|q| < 1`. |
| `u_n` ne tend pas vers 0 ⇒ ? | La série diverge (divergence grossière). |
| `u_n → 0` ⇒ la série converge ? | Non : contre-exemple `∑ 1/n`. |
| Nature de la série harmonique `∑ 1/n` ? | Divergente. |
| Série de Riemann `∑ 1/n^p` converge quand ? | Exactement quand `p > 1`. |
| Nature de `∑ 1/n²` ? | Convergente (Riemann, p = 2). |
| Nature de `∑ 1/√n` ? | Divergente (Riemann, p = 1/2 ≤ 1). |
| `1/(n(n+1))` se décompose en ? | `1/n − 1/(n+1)` (somme télescopique). |
| `∑_{n≥1} 1/(n(n+1))` vaut ? | 1 |
| Règle de d'Alembert ? | `ℓ = lim |u_{n+1}/u_n|` : ℓ < 1 converge, ℓ > 1 diverge, ℓ = 1 on ne sait pas. |
| Règle de Cauchy ? | `ℓ = lim ⁿ√|u_n|` : ℓ < 1 converge, ℓ > 1 diverge, ℓ = 1 on ne sait pas. |
| `lim ⁿ√n` ? | 1 |
| Convergence absolue ⇒ ? | Si `∑ |u_n|` converge, alors `∑ u_n` converge. |
| Termes positifs et `u_n ~ v_n` ⇒ ? | Les deux séries ont la même nature. |
| `∑_{n≥0} x^n/n!` vaut ? | `e^x`, pour tout x. |
| `∑_{n≥1} n/2^n` vaut ? | 2 |
| Rayon de convergence de `∑ a_n x^n` ? | `R = 1/ℓ`, avec `ℓ = lim |a_{n+1}/a_n|` ou `lim ⁿ√|a_n|`. |
| Que se passe-t-il pour `|x| < R` ? `|x| > R` ? | Converge (absolument) ; diverge. |
| Que faut-il étudier à part pour le domaine ? | Les bords `x = R` et `x = −R`. |
| Série alternée `∑ (−1)^n a_n` avec `a_n ↘ 0` ? | Elle converge (ex. `∑ (−1)^n/n`). |

## Exercices générables

### serie-somme-partielle — Calculer une somme partielle
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Variante A : « u_n = {a}n + {b}. Calcule S_3 = u_1 + u_2 + u_3. » Variante B : « u_n = n/2^n. Calcule S_{N} = u_1 + … + u_{N} (valeur décimale). » Variante C : « u_n = 1/(n(n+1)). Calcule S_{N} = u_1 + … + u_{N}. »
- Paramètres : A : a, b entiers dans [−9 ; 9]. B : N dans [1 ; 5]. C : N dans {1, 3, 4, 9, 19, 24, 49, 99} (N/(N+1) décimal fini).
- Réponse : A : `6a + 3b` ; B : `2 − (N + 2)/2^N` ; C : `N/(N + 1)`.
- Vérification : A : exacte ; B et C : tolérance 0,0001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : u_N seul → confondre terme et somme ; somme jusqu'à N − 1 → un terme oublié ; A : `3a + 3b` → oubli que n varie.
- Explication de la solution : « On calcule chaque terme puis on additionne : S_1 = u_1, S_2 = S_1 + u_2, … » (TD : S_1 = 1/2, S_2 = 1, S_3 = 11/8, S_4 = 13/8 pour n/2^n).
- Inspiré de : Ex. 1 (1 et 6).

### serie-geometrique-nature — Nature d'une série géométrique
- Niveau : 1
- Forme : `qcm` (Converge / Diverge)
- Énoncé gabarit : La série ∑_{n≥0} ({q})^n converge-t-elle ?
- Paramètres : q dans {−3, −2, −1, −1/2, −1/3, 0,9, 1/2, 2/3, 1, 1,1, 3/2, 2}.
- Réponse : Converge si `|q| < 1`, sinon Diverge.
- Vérification : égalité du choix.
- Distracteurs (QCM) ou erreurs typiques (numérique) : « Converge » pour q = −2 → tester q < 1 au lieu de |q| < 1 ; « Converge » pour q = 1 → oublier que 1 + 1 + 1 + … → ∞ ; « Diverge » pour q = −1/2 → croire qu'un q négatif fait diverger.
- Explication de la solution : « Une série géométrique converge exactement quand |q| < 1. Ici |q| = {|q|}. »
- Inspiré de : Ex. 9.

### serie-riemann — Série de Riemann
- Niveau : 1
- Forme : `qcm` (Converge / Diverge)
- Énoncé gabarit : La série ∑_{n≥1} {expression} converge-t-elle ? (expression parmi 1/n^{p}, 1/√n, 1/∛(n²), 1/(n√n), {c}/n^{p})
- Paramètres : p dans {1/3, 1/2, 2/3, 1, 3/2, 2, 3} ; c entier non nul dans [1 ; 9].
- Réponse : Converge ⟺ exposant `p > 1` (1/√n : p = 1/2 ; 1/∛(n²) : p = 2/3 ; 1/(n√n) : p = 3/2).
- Vérification : égalité du choix.
- Distracteurs (QCM) ou erreurs typiques (numérique) : « Converge » pour p = 1 → croire « p ≥ 1 » ; « Converge » pour p = 1/2 → « le terme tend vers 0 donc ça converge ».
- Explication de la solution : « On réécrit le terme sous la forme 1/n^p avec p = {p}. Riemann : convergence ⟺ p > 1. »
- Inspiré de : Ex. 2 (1 et 7).

### serie-geometrique-somme — Somme d'une série géométrique
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule la somme ∑_{n≥0} {A}·({q})^n.
- Paramètres : A entier dans [1 ; 12] ; q dans {1/2, 1/3, 1/4, 1/5, −1/2, −1/3, 2/3, 3/4}.
- Réponse : `A/(1 − q)`
- Vérification : tolérance 0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : `1/(1 − q)` → oubli du premier terme ; `A/(1 + q)` → erreur de signe ; `A·q/(1 − q)` → somme démarrée à n = 1.
- Explication de la solution : « Premier terme {A}, raison {q}, |q| < 1 donc la série converge : somme = {A}/(1 − {q}) = {réponse}. »
- Inspiré de : Ex. 9 ; Ex. 3.3 (somme 27/(27 − x)) ; Ex. 5.

### serie-divergence-grossiere — Le terme général tend-il vers 0 ?
- Niveau : 2
- Forme : `qcm`
- Énoncé gabarit : u_n = ({a}n + {b})/({c}n + {d}). Que peut-on dire de ∑ u_n ? Choix : « diverge grossièrement » / « converge » / « on ne peut pas conclure avec ce seul test ». Variante numérique : « Calcule lim u_n. »
- Paramètres : a, c entiers non nuls dans [1 ; 9] ; b, d entiers dans [0 ; 9]. Variante piège : u_n = {a}/({c}n + {d}) (limite 0).
- Réponse : si a ≠ 0, `lim u_n = a/c ≠ 0` ⇒ diverge grossièrement. Variante piège : limite 0 ⇒ « on ne peut pas conclure avec ce seul test » (en fait elle diverge par comparaison avec 1/n).
- Vérification : égalité du choix ; variante numérique : tolérance 0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : « converge » pour la variante piège → croire que `u_n → 0` suffit ; « on ne peut pas conclure » quand la limite vaut a/c ≠ 0.
- Explication de la solution : « lim u_n = {a}/{c} ≠ 0 : les termes ne deviennent pas petits, la somme ne peut pas se stabiliser. »
- Inspiré de : Ex. 1.2 (`∑ n²/(n−1) = ∞`), Ex. 3 (bords des domaines : « la série diverge grossièrement »).

### serie-dalembert — Règle de d'Alembert
- Niveau : 2
- Forme : `numerique` (puis question liée en `qcm` : converge / diverge / on ne peut pas conclure)
- Énoncé gabarit : u_n = n^{k}/{c}^n (variante : u_n = {c}^n/n^{k} ; variante : u_n = {c}^n/n!). Calcule ℓ = lim u_{n+1}/u_n.
- Paramètres : k entier dans [1 ; 4] ; c entier dans [2 ; 5].
- Réponse : `1/c` (première variante) ; `c` (deuxième) ; `0` (troisième). Nature : converge si ℓ < 1, diverge si ℓ > 1.
- Vérification : tolérance 0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : `c` au lieu de `1/c` → rapport inversé u_n/u_{n+1} ; `1` → croire que (n+1)^k/n^k ne tend pas vers 1 ou s'arrêter au facteur polynomial.
- Explication de la solution : « u_{n+1}/u_n = ((n+1)/n)^{k} × 1/{c} → 1 × 1/{c}. ℓ = {réponse} < 1 : la série converge. »
- Inspiré de : Ex. 2.2 (`n/2^n`), Ex. 1.4, Ex. 10.1.

### serie-cauchy — Règle de Cauchy
- Niveau : 3
- Forme : `numerique` (puis `qcm` sur la nature)
- Énoncé gabarit : u_n = (({a}n + {b})/({c}n + {d}))^n. Calcule ℓ = lim ⁿ√u_n. Variante : u_n = n·({p}/{q})^n.
- Paramètres : a, c entiers dans [1 ; 9] avec a ≠ c ; b, d entiers dans [0 ; 9]. Variante : p, q entiers dans [1 ; 9], p ≠ q.
- Réponse : `a/c` ; variante : `p/q` (car ⁿ√n → 1). Nature : converge si ℓ < 1, diverge si ℓ > 1.
- Vérification : tolérance 0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : `(a/c)^n` → oubli de la racine ; `b/d` → mauvais termes ; `1` → croire que tout tend vers 1.
- Explication de la solution : « ⁿ√u_n = ({a}n + {b})/({c}n + {d}) → {a}/{c}. ℓ {<,>} 1 donc la série {converge, diverge}. »
- Inspiré de : Ex. 2.6 (`n(2 + j)^n/2^n`, ℓ = √5/2 > 1), Ex. 3.9 et 3.10.

### serie-telescopique — Somme d'une série télescopique
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Calcule ∑_{n≥1} {c}/(n(n + {k})).
- Paramètres : c entier dans [1 ; 6] ; k dans {1, 2, 3, 4}.
- Réponse : `(c/k)·(1 + 1/2 + … + 1/k)` (k = 1 : c ; k = 2 : 3c/4 ; k = 3 : 11c/18 ; k = 4 : 25c/48).
- Vérification : tolérance 0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : `c` pour k > 1 → oublier le facteur 1/k ; `c/k` → ne garder que le premier terme non annulé.
- Explication de la solution : « 1/(n(n+k)) = (1/k)·(1/n − 1/(n+k)). Dans la somme, tout s'annule sauf 1 + 1/2 + … + 1/k. Somme = ({c}/{k})(1 + … + 1/{k}). »
- Inspiré de : Ex. 1.1 (séries) et Ex. 2 (suites).

### serie-rayon — Rayon de convergence d'une série entière
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Donne le rayon de convergence R de ∑ a_n x^n avec a_n = {expression}.
- Paramètres : variantes : `1/c^n` (c dans [2 ; 9]) → R = c ; `1/c^{3n}` (c dans {2, 3}) → R = c³ ; `c^n + 1` (c dans [2 ; 5]) → R = 1/c ; `n^k` ou `1/n^k` (k dans [1 ; 4]) → R = 1 ; `((a n + b)/(n + d))^n` (a dans [2 ; 5]) → R = 1/a ; `(2 + 1/n)^n` → R = 1/2.
- Réponse : selon la variante (voir paramètres) ; formule générale `R = 1/ℓ`.
- Vérification : tolérance 0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : ℓ au lieu de 1/ℓ (ex. 1/27 au lieu de 27) ; `c` au lieu de `1/c` pour `c^n + 1`.
- Explication de la solution : « ℓ = lim ⁿ√|a_n| (ou lim |a_{n+1}/a_n|) = … ; R = 1/ℓ = {réponse}. »
- Inspiré de : Ex. 3 (3, 4, 9, 10), Ex. 4.

### serie-exponentielle — Somme d'une série avec n!
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Pour x = {x}, la somme ∑_{n≥0} ({a}n² + {b}n + {c})·x^n/n! s'écrit K·e^{x}. Donne K.
- Paramètres : a, b, c entiers dans [−5 ; 5] (non tous nuls) ; x entier dans [−3 ; 3].
- Réponse : `K = a·x² + (a + b)·x + c`
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : `a x² + b x + c` → oubli que `∑ n²x^n/n! = (x² + x)e^x` ; `a + b + c` → remplacer n par 1.
- Explication de la solution : « ∑ x^n/n! = e^x ; ∑ n x^n/n! = x e^x ; ∑ n² x^n/n! = (x² + x)e^x. Donc K = {a}({x}² + {x}) + {b}·{x} + {c} = {réponse}. »
- Inspiré de : Ex. 10 (et méthode de l'Ex. 6).

## Notes pour l'intégration

**Exercices du TD « Suites » non transformés (démonstrations, rédaction libre) :**
- Ex. 3 (définition ε-N de la limite de 1/n²) : démonstration ; couvert par les notions et flashcards. On pourrait en tirer un exercice « plus petit N tel que 1/n² < ε pour ε = 10^{−k} » (réponse ⌊10^{k/2}⌋ + 1), non retenu pour limiter le nombre de types.
- Ex. 4 (gendarmes avec cos n, sin n) : sert d'exemple résolu ; résultat toujours 0, peu intéressant à générer.
- Ex. 5 : items 3, 4, 7, 9, 11, 12, 13, 15, 16, 17, 19, 20, 21 non générés individuellement (limites ad hoc, Stirling, suites extraites). Les items 13, 17, 21 (« la limite n'existe pas ») pourraient devenir un QCM « limite / pas de limite ».
- Ex. 6 (limite en fonction de α) : réponse par cas (−1/3 si α = 1 ; 0 si α < 1 ; −∞ si α > 1) ; réalisable en QCM, non retenu.
- Ex. 7 (lemme de Cesàro et applications) : démonstrations. Les applications (lim ⁿ√n = 1, lim ⁿ√C(2n,n) = 4, lim ⁿ√(n!)/n = 1/e) peuvent servir de flashcards avancées.
- Ex. 8 : la question 1 demande une lecture de graphique (figure) ; non reproduite, on donne directement les valeurs 8, 4, 2, 1.
- Ex. 10 (13 suites récurrentes) : les preuves par récurrence et de monotonie ne sont pas vérifiables automatiquement. Seuls « premiers termes » et « limite par point fixe » sont repris. Une variante QCM « quelles solutions de ℓ = f(ℓ) sont acceptables / la suite tend vers +∞ » serait possible (cas 3, 4, 7, 8, 9 : divergence vers +∞).
- Ex. 12 : seul le cas a > 1 (limite (a+1)/(a−1)) est repris ; cas 0 < a ≤ 1 → +∞.
- Ex. 13 (suites adjacentes) et Ex. 14 (moyenne arithmético-géométrique) : démonstrations ; seulement en notions et flashcards.

**Exercices du TD « Séries » non transformés :**
- Ex. 1.3, 1.4, 1.5 (premiers termes avec sin n, avec x littéral, avec (n!)²/n^n) : réponses symboliques ; non générés.
- Ex. 2.5, 2.6, 2.8 : termes **complexes** (j désigne l'unité imaginaire, notation d'ingénieur). Exercice 2.6 adapté en version réelle ; les autres demandent le module d'un complexe, à prévoir dans un chapitre « nombres complexes ».
- Ex. 3 : domaines de convergence (étude des bords, réponses sous forme d'intervalle), Ex. 3.2 (cosh n, R = 1/e), 3.5, 3.6 (cas selon le signe de a), 3.7, 3.8 : seul le rayon est généré ; le domaine demanderait un QCM d'intervalles (possible plus tard).
- Ex. 4 (rayon des séries de coefficients P(n), 1/P(n), P(1/n)) : réponse toujours R = 1 ; couvert par la variante `n^k` de `serie-rayon`.
- Ex. 5, 6, 7, 8 (sommes de séries entières avec cosh, polynômes de base x(x−1)…, z^{2n}, (2n)!) : calculs symboliques ; seul l'Ex. 10 a été transformé (serie-exponentielle).
- Ex. 11 (valeurs approchées d'intégrales par développement en série : ∫₀¹ sin x/x ≈ 0,94608 ; ∫₀¹ e^{−x²} ≈ 26/35 ≈ 0,74286 ; ∫₀¹ ln(1+x)/x ≈ 0,83861 ; ∫₀¹ sin(x²) ≈ 0,09627) : demande le chapitre « développements limités / intégrales » ; à placer après.

**Coquilles relevées dans les corrigés (ne pas recopier telles quelles) :**
- Suites, Sol. 2 : la somme vaut `1 − 1/(n+1)` (et non `1 − 1/n`) ; la limite 1 reste juste.
- Suites, Sol. 1 : les énoncés 7 et 9 du TD sont identiques sur le fond (« u_n ≤ v_n, v_n converge ⇒ u_n converge » et sa version avec ≥) ; le point 5 (« |u_n| et |v_n| convergent ⇒ |u_n + v_n| converge ») est annoncé Vrai avec une justification insuffisante : il est en réalité **faux** (u_n = (−1)^n, v_n = 1 : |u_n| = |v_n| = 1 convergent, mais |u_n + v_n| vaut alternativement 2 et 0). Recommandation : exclure l'item 5 de la banque `suite-vrai-faux` ou le marquer Faux après validation par l'enseignant.
- Suites, Sol. 9.5 : le corrigé écrit « n ≃ 34 » mais c'est à partir de n = 35 (3500 m) que P_n < 600 hPa ; l'exercice générable calcule le premier rang exact.
- Suites, Sol. 10.1 b : `u_{n+1} − u_n = −(u_n − 1)²/u_n` (dénominateur u_n, pas 2). Sol. 10.3 a : « u_1 = 5 » suppose u_0 = 2 alors que u_0 > 2 (on a u_1 > 5).
- Séries, Sol. 1.4 : S_1 vaut `1 − x` (le corrigé oublie le terme n = 0). Sol. 2.4 : `n² + 4n − 5 = (n − 1)(n + 5)` s'annule en n = 1, la série doit commencer à n = 2 (le TD écrit n = 0).
- Séries, Sol. 5 : dénominateur correct `1 − 2(cosh a)x + x²` (le corrigé écrit `− x²`).
- Séries, Sol. 9 : la condition de convergence est `|x| < 1`, pas `x < 1` (x = −2 diverge).
- Séries, Sol. 10 : coquille `b·n²/n!` au lieu de `b·n/n!` (le résultat final `(ax² + (a+b)x + c)e^x` est juste).

**Divers :**
- Le formulaire de limites (p. 1 des deux TD) est repris dans les notions et les flashcards.
- Les deux PDF sont lisibles en entier ; aucune page illisible. Seule la figure de l'Ex. 8 (Suites) n'est pas reproduite.
