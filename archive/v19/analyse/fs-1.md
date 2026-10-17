# Chapitre : Fonctions de référence
Source : Treffct.pdf (Y. Monka, « Fonctions de référence », parties 1 à 6, 18 pages)
Niveau visé : Connaître par cœur les fonctions carré, racine carrée, inverse, cube, affines et homographiques (ensemble de définition, courbe, variations, symétries) et s'en servir pour comparer des nombres et résoudre des inéquations.
Prérequis : calcul avec les fractions et les puissances, intervalles, repère du plan, notion d'image et d'antécédent

## Explication pour un novice
Une fonction, c'est une machine : tu lui donnes un nombre `x`, elle te rend un seul nombre `f(x)`, son image. Le prix d'un trajet en taxi en fonction des kilomètres, la surface d'un carré en fonction de son côté, la vitesse en fonction du temps… Partout où une grandeur dépend d'une autre, il y a une fonction.

Avant d'étudier des fonctions compliquées, on apprend une petite famille de fonctions « de référence », un peu comme on apprend l'alphabet avant de lire. Elles sont très simples : `x^2` (le carré), `√x` (la racine carrée), `1/x` (l'inverse), `x^3` (le cube) et `ax + b` (les fonctions affines). Presque toutes les fonctions que tu rencontreras sont fabriquées à partir d'elles.

Pour chacune, on retient quatre choses : où elle est définie (on ne peut pas diviser par 0, ni prendre la racine d'un négatif), l'allure de sa courbe (parabole, hyperbole, demi-parabole couchée…), ses variations (est-ce qu'elle monte ou descend ?) et ses symétries (paire, impaire).

Les variations servent à comparer sans calculer. Une fonction croissante « conserve l'ordre » : si `a < b` alors `f(a) < f(b)`. Une fonction décroissante « renverse l'ordre » : si `a < b` alors `f(a) > f(b)`. C'est exactement l'outil qu'il faut pour résoudre une inéquation comme `4/x + 2 < 5`.

Enfin, les fonctions affines `x ↦ ax + b` décrivent toutes les situations « à taux constant » : un abonnement plus un prix par entrée, une température qui monte de 2 degrés par heure. Leur courbe est une droite ; `a` est la pente (coefficient directeur), `b` l'ordonnée à l'origine.

## Notions (dans l'ordre d'apprentissage)
- Image et antécédent : l'image de `x` est `f(x)` ; un antécédent de `y` est un `x` tel que `f(x) = y`. | `f(18) = 112` : 112 est l'image de 18, 18 est un antécédent de 112.
- Fonction carré : définie sur ℝ par `f(x) = x^2`, courbe en parabole, paire. | décroissante sur `]−∞ ; 0]`, croissante sur `[0 ; +∞[`
- Fonction racine carrée : définie sur `[0 ; +∞[` par `f(x) = √x`. | strictement croissante sur `[0 ; +∞[` ; pour `a, b ≥ 0` : `a < b ⟺ √a < √b`
- Fonction inverse : définie sur `ℝ ∖ {0}` par `f(x) = 1/x`, courbe en hyperbole, impaire. | décroissante sur `]−∞ ; 0[` et sur `]0 ; +∞[` ; pour `a, b` de même signe : `a < b ⟺ 1/a > 1/b`
- Fonction cube : définie sur ℝ par `f(x) = x^3`, impaire. | strictement croissante sur ℝ : `a < b ⟺ a^3 < b^3`
- Positions de `x`, `x^2`, `x^3` : pour `0 ≤ x ≤ 1`, `x^3 ≤ x^2 ≤ x` ; pour `x ≥ 1`, `x ≤ x^2 ≤ x^3`. | se démontre avec le signe de `x^2 − x = x(x − 1)` et de `x^3 − x^2 = x^2(x − 1)`
- Fonction affine : `x ↦ ax + b` ; linéaire si `b = 0` (proportionnalité), constante si `a = 0`. | représentée par une droite ; `a` coefficient directeur, `b` ordonnée à l'origine
- Accroissements : pour une fonction affine et `m ≠ n`, `a = (f(m) − f(n))/(m − n)`. | « on avance de 1, on monte de a »
- Variations d'une fonction affine : croissante si `a > 0`, décroissante si `a < 0`, constante si `a = 0`. | `f(p) − f(m) = a(p − m)`
- Fonction homographique : `f(x) = (ax + b)/(cx + d)` avec `c ≠ 0`, définie pour `x ≠ −d/c`. | courbe en hyperbole, en deux morceaux

## Méthodes
### Comparer deux images sans calculer
1. Repère l'intervalle qui contient les deux nombres.
2. Cherche le sens de variation de la fonction sur cet intervalle.
3. Croissante : l'ordre est conservé. Décroissante : l'ordre est renversé.
4. Contrôle éventuellement avec la calculatrice.

### Résoudre une inéquation avec la fonction inverse
1. Isole le terme `1/x` (ou `a/x`).
2. Vérifie que les deux membres sont de même signe (ici positifs).
3. Passe à l'inverse en renversant le sens de l'inégalité.
4. Écris l'ensemble des solutions en tenant compte de la condition `x > 0`.

### Déterminer une fonction affine à partir de deux points
1. Calcule `a = (f(m) − f(n))/(m − n)`.
2. Remplace dans `f(n) = an + b` pour trouver `b`.
3. Vérifie avec l'autre point.

### Résoudre `x^2 ≤ k^2`
1. Tout passer à gauche : `x^2 − k^2 ≤ 0`.
2. Factoriser : `(x − k)(x + k) ≤ 0`.
3. Le produit est négatif entre `−k` et `k` : `S = [−k ; k]`.

## Exemples résolus
### Comparer `f(−1,5)` et `f(−1)` pour la fonction carré
- `−1,5 < −1` et les deux sont dans `]−∞ ; 0]` — on se place sur un intervalle où le sens de variation est connu.
- La fonction carré y est décroissante — elle renverse l'ordre.
- Donc `f(−1,5) > f(−1)` — contrôle : `2,25 > 1`.

### Antécédent de 7 par `f(x) = 2 + 3/x`
- `2 + 3/x = 7` — on résout `f(x) = 7`.
- `3/x = 5` — on retire 2.
- `x = 3/5` — si `3/x = 5`, alors `x = 3/5`.

### Résoudre `4/x + 2 < 5` pour `x > 0`
- `4/x < 3` puis `1/x < 3/4` — on isole `1/x`.
- `x > 4/3` — l'inverse est décroissante sur `]0 ; +∞[`, on renverse.
- `S = ]4/3 ; +∞[` — inégalité stricte, crochet ouvert.

### Fonction affine telle que `f(2) = 4` et `f(5) = 1`
- `a = (4 − 1)/(2 − 5) = −1` — propriété des accroissements.
- `f(5) = −5 + b = 1`, donc `b = 6` — on utilise un point.
- `f(x) = −x + 6` — vérification : `f(2) = 4`.

### Ensemble de définition de `f(x) = x/(3x − 6)`
- `3x − 6 = 0 ⟺ x = 2` — le dénominateur ne doit pas s'annuler.
- `D = ]−∞ ; 2[ ∪ ]2 ; +∞[` — tous les réels sauf 2.

## Pièges fréquents
- Écrire `(−3)^2 = −9` → mets toujours le nombre négatif entre parenthèses : `(−3)^2 = 9`.
- Croire que `x^2 ≤ 9 ⟺ x ≤ 3` → la fonction carré n'est pas monotone sur ℝ : `S = [−3 ; 3]`.
- Oublier de renverser l'inégalité en passant à l'inverse → l'inverse est décroissante sur chaque intervalle.
- Dire que l'inverse est décroissante sur `ℝ ∖ {0}` → c'est faux : `−1 < 1` et pourtant `1/(−1) = −1 < 1/1 = 1` ; elle est décroissante sur chacun des deux intervalles séparément, et on ne compare que des nombres de même signe.
- Lire `a` comme le premier nombre écrit dans `7 − 6x` → `a` est le coefficient de `x` : ici `a = −6`.
- Inverser numérateur et dénominateur dans `a = (f(m) − f(n))/(m − n)` → « vertical sur horizontal ».

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Sur quel ensemble la fonction racine carrée est-elle définie ? | `[0 ; +∞[` |
| Variations de la fonction carré ? | Décroissante sur `]−∞ ; 0]`, croissante sur `[0 ; +∞[` |
| Variations de la fonction inverse ? | Décroissante sur `]−∞ ; 0[` et sur `]0 ; +∞[` |
| La fonction cube est-elle paire ou impaire ? | Impaire : symétrique par rapport à l'origine |
| Si `0 < x < 1`, comment se rangent `x`, `x^2`, `x^3` ? | `x^3 < x^2 < x` |
| Formule du coefficient directeur ? | `a = (f(m) − f(n))/(m − n)` |
| Sens de variation de `x ↦ ax + b` si `a < 0` ? | Décroissante |
| Valeur interdite de `(ax + b)/(cx + d)` ? | `x = −d/c` |
| Que fait une fonction décroissante à l'ordre ? | Elle le renverse |
| Solutions de `x^2 ≤ 9` ? | `[−3 ; 3]` |
| Comment s'appelle la courbe de la fonction inverse ? | Une hyperbole |
| Une fonction linéaire traduit quelle situation ? | Une situation de proportionnalité |

## Notes pour l'intégration
- Le document lit souvent des valeurs sur des graphiques (droites, hyperboles à la calculatrice) : les exercices le remplacent par des calculs ou des choix.
- Petite imprécision du document (démonstration de la décroissance de l'inverse) : on obtient `f(b) − f(a) < 0` (strict), le document écrit `≤ 0`.

# Chapitre : Fonctions polynômes du second degré
Source : Td23fct.pdf (Y. Monka, « Fonctions du second degré », parties 1 à 5, 12 pages) ; compléments sur le degré 3 dans les chapitres « Fonctions de référence » et « Dérivation »
Niveau visé : Mettre un trinôme sous forme canonique, trouver son sommet, résoudre une équation du second degré avec le discriminant, factoriser, étudier le signe d'un trinôme et résoudre une inéquation ou une question de position de courbes.
Prérequis : identités remarquables, fonction carré, résolution d'équations du premier degré, intervalles

## Explication pour un novice
Lance une balle : sa trajectoire monte, atteint un sommet, puis redescend. Cette courbe est une parabole, et la fonction qui la décrit s'écrit `f(x) = ax^2 + bx + c` : c'est un trinôme, ou fonction polynôme du second degré (avec `a ≠ 0`, sinon il n'y a plus de `x^2`).

Le nombre `a` décide de l'allure : si `a > 0`, la parabole est « souriante » (tournée vers le haut) et possède un minimum ; si `a < 0`, elle « fait la tête » et possède un maximum. Ce point extrême s'appelle le sommet.

Pour trouver le sommet, on réécrit `f` sous forme canonique : `f(x) = a(x − α)^2 + β`. Comme un carré est toujours positif ou nul, on voit tout de suite que `f(x) ≥ β` quand `a > 0`, avec égalité en `x = α`. Le sommet est le point `(α ; β)`, et la droite `x = α` est un axe de symétrie.

Résoudre `ax^2 + bx + c = 0`, c'est chercher où la parabole coupe l'axe des abscisses. Un seul nombre, le discriminant `Δ = b^2 − 4ac`, dit combien il y a de solutions : deux si `Δ > 0`, une si `Δ = 0`, aucune si `Δ < 0`. Ensuite une formule donne les solutions.

Enfin, le signe du trinôme suit une règle très simple à retenir : il est du signe de `a` partout, sauf entre les racines où il prend le signe contraire. Avec cette règle, on résout les inéquations et on compare des courbes.

## Notions (dans l'ordre d'apprentissage)
- Trinôme : fonction définie sur ℝ par `f(x) = ax^2 + bx + c` avec `a ≠ 0`. | `(x − 4)(5 − 2x)` en est un (après développement)
- Forme canonique : écriture `f(x) = a(x − α)^2 + β`. | `α = −b/(2a)` et `β = f(α) = −(b^2 − 4ac)/(4a)`
- Variations : si `a > 0`, décroissante puis croissante ; si `a < 0`, croissante puis décroissante. | changement de sens en `x = α`
- Extremum : si `a > 0`, minimum `β` atteint en `α` ; si `a < 0`, maximum `β` atteint en `α`. | vient de `a(x − α)^2 ≥ 0` (ou `≤ 0`)
- Parabole et sommet : la courbe d'un trinôme est une parabole de sommet `(α ; β)`. | axe de symétrie : la droite d'équation `x = α`
- Discriminant : `Δ = b^2 − 4ac`. | il « discrimine » les cas
- Solutions de `ax^2 + bx + c = 0` : aucune si `Δ < 0`, une `x_0 = −b/(2a)` si `Δ = 0`, deux `x_1 = (−b − √Δ)/(2a)` et `x_2 = (−b + √Δ)/(2a)` si `Δ > 0`. | démonstration par la forme canonique
- Racines : solutions de `f(x) = 0` ; la courbe coupe l'axe des abscisses en ces points. | somme `S = −b/a`, produit `P = c/a`
- Forme factorisée : `f(x) = a(x − x_1)(x − x_2)` si `Δ > 0`, `a(x − x_0)^2` si `Δ = 0`. | pas de forme factorisée si `Δ < 0`
- Signe d'un trinôme : du signe de `a` à l'extérieur des racines, du signe contraire entre elles. | si `Δ < 0`, toujours du signe de `a`

## Méthodes
### Mettre sous forme canonique
1. Factorise par `a` les termes en `x` : `a[x^2 + (b/a)x] + c`.
2. Reconnais le début d'un carré : `x^2 − 10x = (x − 5)^2 − 25`.
3. Développe et regroupe les constantes.
4. Contrôle : `α = −b/(2a)` et `β = f(α)`.

### Résoudre une équation du second degré
1. Lis `a`, `b`, `c` avec leurs signes.
2. Calcule `Δ = b^2 − 4ac`.
3. Conclus sur le nombre de solutions.
4. Applique la formule et simplifie.

### Résoudre une inéquation du second degré
1. Ramène tout dans un membre : `ax^2 + bx + c < 0`.
2. Cherche les racines.
3. Applique la règle du signe (signe de `a` à l'extérieur).
4. Lis l'ensemble des solutions, avec des crochets adaptés.

### Étudier la position de deux courbes
1. Calcule `f(x) − g(x)` (attention aux parenthèses).
2. Étudie son signe.
3. Là où `f(x) − g(x) ≥ 0`, `C_f` est au-dessus de `C_g`.

## Exemples résolus
### Forme canonique de `f(x) = 2x^2 − 20x + 10`
- `f(x) = 2[x^2 − 10x] + 10` — on factorise par `a = 2`.
- `= 2[(x − 5)^2 − 25] + 10` — début du carré `(x − 5)^2`.
- `= 2(x − 5)^2 − 40` — minimum `−40` atteint en `x = 5`.

### Sommet de la parabole de `f(x) = 2x^2 − 12x + 1`
- `α = −b/(2a) = 12/4 = 3` — formule du sommet.
- `β = f(3) = 18 − 36 + 1 = −17` — on calcule l'image.
- Sommet `(3 ; −17)`, axe `x = 3`, minimum car `a > 0` — interprétation.

### Résoudre `2x^2 − x − 6 = 0`
- `Δ = (−1)^2 − 4 × 2 × (−6) = 49` — discriminant positif.
- `x_1 = (1 − 7)/4 = −3/2` et `x_2 = (1 + 7)/4 = 2` — formule des racines.

### Résoudre `x^2 + 3x − 5 < −x + 2`
- `x^2 + 4x − 7 < 0` — on passe tout à gauche.
- `Δ = 44`, racines `−2 − √11` et `−2 + √11` — `√44 = 2√11`.
- `S = ]−2 − √11 ; −2 + √11[` — `a > 0` : négatif entre les racines.

### Position de `f(x) = −x^2 + 8x − 11` et `g(x) = x − 1`
- `f(x) − g(x) = −x^2 + 7x − 10` — on soustrait toute l'expression de `g`.
- Racines 2 et 5 — `Δ = 9`.
- `C_f` au-dessus de `C_g` sur `[2 ; 5]`, en dessous ailleurs — `a = −1 < 0`.

## Pièges fréquents
- Lire `α = 3` dans `(x + 3)^2` → `x + 3 = x − (−3)` : `α = −3`.
- Calculer `−4ac` sans tenir compte des signes de `a` et `c` → écris les parenthèses : `−4 × 2 × (−6) = +48`.
- Oublier le `2` de `2a` ou le signe de `−b` → récite la formule en entier : `(−b ± √Δ)/(2a)`.
- Oublier le coefficient `a` dans la forme factorisée → `4x^2 + 19x − 5 = 4(x + 5)(x − 1/4)`.
- Inverser la règle du signe → teste une valeur entre les racines (souvent 0).
- Mal soustraire `g(x)` → `f(x) − (x − 1)` : le signe de chaque terme de `g` change.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Formule du discriminant ? | `Δ = b^2 − 4ac` |
| Solutions si `Δ > 0` ? | `(−b − √Δ)/(2a)` et `(−b + √Δ)/(2a)` |
| Solution si `Δ = 0` ? | `x_0 = −b/(2a)` |
| Abscisse du sommet ? | `α = −b/(2a)` |
| Forme canonique ? | `a(x − α)^2 + β` |
| Si `a > 0`, la parabole a un… ? | Minimum (tournée vers le haut) |
| Signe du trinôme à l'extérieur des racines ? | Le signe de `a` |
| Produit des racines ? | `c/a` |
| Somme des racines ? | `−b/a` |
| Forme factorisée si `Δ > 0` ? | `a(x − x_1)(x − x_2)` |
| Axe de symétrie de la parabole ? | La droite `x = α` |
| Comment comparer deux courbes ? | Étudier le signe de `f(x) − g(x)` |

## Notes pour l'intégration
- Le document fourni (Td23fct.pdf) ne traite que le second degré, malgré l'intitulé « degré 2 et 3 » de la demande. La fonction cube est vue dans « Fonctions de référence », l'étude d'une fonction de degré 3 dans « Dérivation » et « Continuité et convexité ».
- Les représentations graphiques à tracer sont remplacées par des questions sur le sommet, le signe et les solutions.

# Chapitre : Dérivation
Source : Tderfct.pdf (Y. Monka, « Dérivation », parties 1 à 9, 24 pages)
Niveau visé : Calculer un nombre dérivé, écrire l'équation d'une tangente, dériver sommes, produits, quotients et composées, étudier les variations et les extremums d'une fonction, et résoudre un problème d'optimisation.
Prérequis : fonctions de référence, second degré (signe d'un trinôme), notion de limite intuitive, coefficient directeur d'une droite

## Explication pour un novice
Sur l'autoroute, ton compteur affiche ta vitesse « à cet instant ». Pourtant une vitesse, c'est une distance divisée par une durée… Comment parler de vitesse à un instant précis, sur une durée nulle ? La dérivée répond exactement à cette question.

Commence par une vitesse moyenne : entre deux instants `a` et `a + h`, elle vaut `(f(a + h) − f(a))/h`, c'est le taux d'accroissement. Sur la courbe, c'est la pente de la droite qui relie deux points (une sécante). Puis rapproche les deux instants : `h` tend vers 0. Si ces taux se rapprochent d'un nombre, ce nombre est la vitesse instantanée : le nombre dérivé `f′(a)`.

Géométriquement, la sécante se rapproche d'une droite qui « touche » la courbe : la tangente. Sa pente est `f′(a)`, et son équation est `y = f′(a)(x − a) + f(a)`.

Calculer des limites à chaque fois serait épuisant. Heureusement, on démontre une fois pour toutes les dérivées des fonctions usuelles (`(x^2)′ = 2x`, `(1/x)′ = −1/x^2`, `(√x)′ = 1/(2√x)`…) et des règles pour les sommes, produits, quotients et composées.

Et voici la récompense : le signe de la dérivée donne le sens de variation. Si `f′ ≥ 0`, la fonction monte ; si `f′ ≤ 0`, elle descend. Là où `f′` s'annule en changeant de signe, la fonction atteint un maximum ou un minimum. C'est l'outil universel pour optimiser : bénéfice maximal, coût minimal, boîte de volume maximal.

## Notions (dans l'ordre d'apprentissage)
- Taux d'accroissement : pente de la sécante entre les points d'abscisses `a` et `a + h`. | `(f(a + h) − f(a))/h`, `h ≠ 0`
- Nombre dérivé : limite du taux d'accroissement quand `h` tend vers 0, s'il existe et est un réel. | `f′(a) = lim_{h→0} (f(a + h) − f(a))/h`
- Valeur absolue : `|x| = x` si `x ≥ 0`, `−x` si `x ≤ 0`. | pas dérivable en 0 (taux égal à 1 à droite, −1 à gauche)
- Tangente : droite passant par `A(a ; f(a))` de pente `f′(a)`. | `y = f′(a)(x − a) + f(a)`
- Fonction dérivée : `f′ : x ↦ f′(x)` sur un intervalle où `f` est dérivable. | le mot vient du latin « derivare », introduit par Lagrange
- Dérivées usuelles : `(k)′ = 0`, `(ax)′ = a`, `(x^n)′ = nx^{n−1}`, `(1/x)′ = −1/x^2`, `(1/x^n)′ = −n/x^{n+1}`, `(√x)′ = 1/(2√x)`. | `√x` dérivable sur `]0 ; +∞[` seulement
- Opérations : `(u + v)′ = u′ + v′`, `(ku)′ = ku′`, `(uv)′ = u′v + uv′`, `(1/u)′ = −u′/u^2`, `(u/v)′ = (u′v − uv′)/v^2`. | `v` ne s'annule pas
- Composée : `(v∘u)(x) = v(u(x))` ; sa dérivée est `v′(u(x)) × u′(x)`. | cas utiles : `(√u)′ = u′/(2√u)`, `(u^n)′ = nu′u^{n−1}`
- Signe de la dérivée et variations : sur un intervalle, `f′ ≥ 0` ⟹ `f` croissante ; `f′ ≤ 0` ⟹ `f` décroissante. | `f′ > 0` sauf en quelques points ⟹ strictement croissante
- Extremum : si `f′` s'annule en changeant de signe en `c` (intervalle ouvert), `f` a un extremum en `c`. | `f′(c) = 0` seul ne suffit pas (exemple `x^3` en 0)

## Méthodes
### Calculer un nombre dérivé par la définition
1. Calcule `f(a + h) − f(a)` et développe.
2. Divise par `h` (factorise `h`).
3. Fais tendre `h` vers 0.

### Écrire l'équation d'une tangente
1. Calcule `f(a)` et `f′(a)`.
2. Écris `y = f′(a)(x − a) + f(a)`.
3. Développe pour obtenir `y = mx + p`.

### Étudier les variations d'une fonction
1. Calcule `f′(x)` et factorise-la le plus possible.
2. Étudie le signe de `f′` (tableau de signes).
3. Dresse le tableau de variations, calcule les valeurs aux points clés.

### Résoudre un problème d'optimisation
1. Exprime la grandeur à optimiser en fonction d'une seule variable.
2. Dérive, étudie le signe de la dérivée.
3. Lis le maximum (ou le minimum) dans le tableau et réponds dans le contexte.

## Exemples résolus
### Nombre dérivé en 2 de `f(x) = x^2 + 2x − 3`
- `(f(2 + h) − f(2))/h = (6h + h^2)/h = 6 + h` — on développe et simplifie.
- `f′(2) = lim_{h→0}(6 + h) = 6` — passage à la limite.

### Tangente en 1 à la courbe de `f(x) = x^2 − 5x + 2`
- `f(1) = −2` et `f′(1) = −3` — par la définition ou `f′(x) = 2x − 5`.
- `y = −3(x − 1) − 2 = −3x + 1` — formule de la tangente.

### Dériver `f(x) = (3x^2 + 4x)(5x − 1)`
- `u′ = 6x + 4`, `v′ = 5` — on identifie `u` et `v`.
- `f′(x) = (6x + 4)(5x − 1) + (3x^2 + 4x) × 5 = 45x^2 + 34x − 4` — règle du produit.

### Variations de `f(x) = x^3 + 4,5x^2 − 12x + 5`
- `f′(x) = 3x^2 + 9x − 12`, `Δ = 225`, racines `−4` et `1` — trinôme.
- `f′` positive, négative, positive — `a = 3 > 0`.
- Maximum `f(−4) = 61`, minimum local `f(1) = −1,5` — tableau de variations.

### Bénéfice maximal : `B(x) = −0,2x^2 + 6x − 20`
- `B′(x) = −0,4x + 6`, nul en `x = 15` — dérivée.
- `B′` positive puis négative : maximum `B(15) = 25` — soit 25 000 € pour 15 000 pièces.

## Pièges fréquents
- Confondre `f(a)` et `f′(a)` dans l'équation de la tangente → la pente est `f′(a)`.
- Écrire `(uv)′ = u′v′` → c'est `u′v + uv′`.
- Se tromper d'ordre dans le quotient → `(u′v − uv′)/v^2`, en commençant par `u′`.
- Oublier `u′` dans une composée → `(√(3x^2 + 4x − 1))′ = (6x + 4)/(2√(3x^2 + 4x − 1))`.
- Conclure à un extremum dès que `f′(c) = 0` → il faut aussi un changement de signe.
- Dériver `5x^3` en `15x^3` → on diminue l'exposant : `15x^2`.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Définition du nombre dérivé ? | `lim_{h→0} (f(a + h) − f(a))/h` |
| Équation de la tangente en `a` ? | `y = f′(a)(x − a) + f(a)` |
| Dérivée de `x^n` ? | `nx^{n−1}` |
| Dérivée de `1/x` ? | `−1/x^2` |
| Dérivée de `√x` ? | `1/(2√x)` |
| Dérivée d'un produit ? | `u′v + uv′` |
| Dérivée d'un quotient ? | `(u′v − uv′)/v^2` |
| Dérivée de `v(u(x))` ? | `v′(u(x)) × u′(x)` |
| `f′ > 0` sur un intervalle : conclusion ? | `f` strictement croissante sur cet intervalle |
| Condition d'extremum en `c` ? | `f′` s'annule et change de signe en `c` |
| La valeur absolue est-elle dérivable en 0 ? | Non |
| Dérivée de `(u(x))^n` ? | `nu′(x)(u(x))^{n−1}` |

## Notes pour l'intégration
- Les lectures graphiques de nombres dérivés et les tracés de tangentes sont remplacés par des calculs de pente à partir de deux points.
- Les exemples avec l'exponentielle (`e^{x^2+1}`, `xe^{−x/2}`) sont repris dans le chapitre « Fonction exponentielle », qui vient après dans le parcours.
- Coquille de numérotation dans le document : deux sous-parties « 2) » dans la partie 6.

# Chapitre : Limites de fonctions
Source : Tlccfct.pdf (Y. Monka, « Limites, continuité, convexité », parties 1 à 5, pages 1 à 14)
Niveau visé : Lire et calculer des limites en l'infini et en un réel, appliquer les règles d'opérations, lever les formes indéterminées (factorisation, expression conjuguée), utiliser comparaison et gendarmes, et en déduire des asymptotes.
Prérequis : fonctions de référence, dérivation, calcul littéral, racines carrées

## Explication pour un novice
Que devient `1/x` quand `x` devient gigantesque ? Il devient minuscule, sans jamais atteindre 0. Que devient `x^2` ? Il grandit sans fin. Les limites décrivent ce comportement « au bout » : quand `x` part vers l'infini, ou quand `x` s'approche d'une valeur interdite.

Il y a quatre situations : une limite infinie en l'infini (la courbe s'envole), une limite finie en l'infini (la courbe se stabilise près d'une droite horizontale, une asymptote), une limite infinie en un réel (la courbe longe une droite verticale), et une limite finie en un réel. Chacune a une définition précise avec des intervalles : « toutes les valeurs finissent par rester dans n'importe quel intervalle choisi ».

Pour calculer, on combine des limites connues avec des règles : « un nombre plus l'infini, c'est l'infini », « un nombre non nul divisé par 0⁺, c'est l'infini avec la règle des signes »… Mais quatre situations résistent : `∞ − ∞`, `0 × ∞`, `∞/∞` et `0/0`. Ce sont les formes indéterminées : la limite peut valoir n'importe quoi, il faut transformer l'expression.

Les outils pour lever une indétermination sont peu nombreux : factoriser par le terme le plus fort (pour les polynômes et les fractions), multiplier par l'expression conjuguée (pour les racines), ou encadrer (théorème des gendarmes) quand des fonctions comme `sin x` oscillent.

## Notions (dans l'ordre d'apprentissage)
- Limite `+∞` en `+∞` : `f(x)` dépasse n'importe quel nombre dès que `x` est assez grand. | tout `]A ; +∞[` contient les `f(x)` pour `x` assez grand
- Limite finie `L` en `+∞` : `f(x)` aussi proche de `L` qu'on veut pour `x` assez grand. | asymptote horizontale `y = L`
- Limites de référence : `x^n → +∞` en `+∞` ; en `−∞`, `x^n → +∞` si `n` pair, `−∞` si `n` impair ; `√x → +∞` ; `1/x → 0` en `±∞`. | `e^x → +∞` en `+∞`, `0` en `−∞` (chapitre exponentielle)
- Limite infinie en un réel `A` : `f(x)` aussi grand qu'on veut pour `x` assez proche de `A`. | asymptote verticale `x = A`
- Limite à gauche, à droite : on s'approche de `A` par valeurs inférieures (`A^−`) ou supérieures (`A^+`). | `lim_{x→0^+} 1/x = +∞`, `lim_{x→0^−} 1/x = −∞`
- Opérations : somme, produit, quotient de limites, avec la règle des signes. | `L/0^+ = ±∞` si `L ≠ 0`, `L/∞ = 0`
- Formes indéterminées : `∞ − ∞`, `0 × ∞`, `∞/∞`, `0/0`. | il faut transformer l'expression
- Limite d'une fonction composée : si `u(x) → B` et `v(X) → L` quand `X → B`, alors `v(u(x)) → L`. | `√(2 − 1/x) → √2`
- Théorèmes de comparaison : `f ≤ g` et `f → +∞` donnent `g → +∞` ; `f ≤ g` et `g → −∞` donnent `f → −∞`. | « f pousse g vers +∞ »
- Théorème des gendarmes : `f ≤ g ≤ h` et `f, h → L` donnent `g → L`. | aussi appelé théorème du sandwich

## Méthodes
### Lever `∞/∞` pour une fraction rationnelle
1. Factorise numérateur et dénominateur par leur terme de plus haut degré.
2. Simplifie les puissances de `x`.
3. Les termes en `1/x`, `1/x^2`… tendent vers 0 : conclus.

### Limite en un réel où le dénominateur s'annule
1. Calcule la limite du numérateur (un nombre `L ≠ 0`).
2. Détermine le signe du dénominateur près du point : `0^+` ou `0^−`.
3. Applique la règle des signes : la limite est `+∞` ou `−∞`, asymptote verticale.

### Lever `∞ − ∞` ou `0/0` avec des racines
1. Multiplie et divise par l'expression conjuguée.
2. Utilise `(A − B)(A + B) = A^2 − B^2` pour faire disparaître les racines.
3. Simplifie, puis passe à la limite.

### Encadrer avec sinus ou cosinus
1. Écris `−1 ≤ sin x ≤ 1` (ou cos).
2. Transforme l'encadrement pour obtenir celui de l'expression.
3. Conclus par comparaison ou par les gendarmes.

## Exemples résolus
### `lim_{x→−∞} (x − 5)(3 + x^2)`
- `x − 5 → −∞` et `3 + x^2 → +∞` — limites des facteurs.
- Produit : `−∞` — règle des signes.

### `lim_{x→3^−} (1 − 2x)/(x − 3)`
- Numérateur → `−5`, dénominateur → `0^−` — car `x < 3`.
- Forme `−5/0^−` : la limite vaut `+∞` — règle des signes.

### `lim_{x→+∞} (2x^2 − 5x + 1)/(6x^2 − 5)`
- `= (2 − 5/x + 1/x^2)/(6 − 5/x^2)` — on factorise par `x^2`.
- Limite `2/6 = 1/3` — les autres termes tendent vers 0.

### `lim_{x→5} (√(x − 1) − 2)/(x − 5)`
- Forme `0/0` — numérateur et dénominateur s'annulent.
- `= 1/(√(x − 1) + 2)` — expression conjuguée.
- Limite `1/4` — on remplace `x` par 5.

### `lim_{x→+∞} x cos x/(x^2 + 1)`
- `−x/(x^2 + 1) ≤ x cos x/(x^2 + 1) ≤ x/(x^2 + 1)` — car `−1 ≤ cos x ≤ 1` et `x > 0`.
- Les deux bornes tendent vers 0 : limite 0 — théorème des gendarmes.

## Pièges fréquents
- Croire que `∞/∞ = 1` ou `∞ − ∞ = 0` → ce sont des formes indéterminées.
- Oublier le signe du 0 au dénominateur → précise `0^+` ou `0^−`.
- Factoriser par le mauvais terme → on factorise par le terme de plus haut degré.
- Écrire `√(x + 1) = √x + 1` → la racine d'une somme n'est pas la somme des racines.
- Confondre asymptote verticale et horizontale → limite infinie en `A` : verticale `x = A` ; limite `L` en `±∞` : horizontale `y = L`.
- Dire que `sin x` tend vers une valeur en `+∞` → elle oscille, il faut encadrer.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Les quatre formes indéterminées ? | `∞ − ∞`, `0 × ∞`, `∞/∞`, `0/0` |
| `lim_{x→−∞} x^3` ? | `−∞` |
| `lim_{x→0^−} 1/x` ? | `−∞` |
| `lim f = L` en `+∞` donne quelle asymptote ? | Horizontale `y = L` |
| `lim f = ±∞` en `A` donne quelle asymptote ? | Verticale `x = A` |
| Limite en `±∞` d'une fraction rationnelle ? | Celle du quotient des termes de plus haut degré |
| Outil contre `∞ − ∞` avec des racines ? | L'expression conjuguée |
| Théorème des gendarmes ? | `f ≤ g ≤ h`, `f, h → L` ⟹ `g → L` |
| `L/0^+` avec `L < 0` ? | `−∞` |
| `lim_{x→+∞} x + sin x` ? | `+∞` (comparaison avec `x − 1`) |

## Notes pour l'intégration
- Le document de 30 pages (« Limites, continuité, convexité ») est découpé en deux chapitres : « Limites de fonctions » (parties 1 à 5) et « Continuité et convexité » (parties 6 à 10).
- Les lectures graphiques de limites sur une courbe donnée sont remplacées par des calculs.

# Chapitre : Continuité et convexité
Source : Tlccfct.pdf (Y. Monka, « Limites, continuité, convexité », parties 6 à 10, pages 14 à 30)
Niveau visé : Justifier la continuité, appliquer le théorème des valeurs intermédiaires (existence et unicité d'une solution, encadrement), trouver la limite d'une suite récurrente par point fixe, calculer une dérivée seconde, étudier la convexité, trouver un point d'inflexion et démontrer une inégalité par convexité.
Prérequis : limites, dérivation, signe d'un trinôme, suites (notion de convergence)

## Explication pour un novice
Une fonction continue, c'est une courbe qu'on peut tracer sans lever le crayon : pas de saut, pas de trou. Ta taille au fil des années est continue ; le prix d'un timbre selon le poids de la lettre ne l'est pas (il saute d'un palier à l'autre).

Pourquoi c'est important ? Parce qu'une fonction continue ne peut pas passer d'une valeur négative à une valeur positive sans passer par 0. C'est le théorème des valeurs intermédiaires : si tu marches de la rive gauche à la rive droite d'une rivière sans sauter, tu as forcément les pieds dans l'eau à un moment. Il sert à prouver qu'une équation a une solution, même quand on ne sait pas la calculer, puis à l'approcher à la calculatrice.

La convexité décrit la courbure. Une fonction convexe a une courbe « en bol » : elle est au-dessus de ses tangentes et en dessous de ses cordes. Une fonction concave est « en dôme ». On la détecte avec la dérivée seconde `f″`, la dérivée de la dérivée : `f″ ≥ 0` signifie que la pente augmente (convexe), `f″ ≤ 0` qu'elle diminue (concave).

Le point où la courbure change s'appelle un point d'inflexion : la courbe y traverse sa tangente. En économie, c'est le moment où un coût qui augmentait de moins en moins vite se met à augmenter de plus en plus vite.

## Notions (dans l'ordre d'apprentissage)
- Continuité (intuitive) : la courbe se trace sans lever le crayon. | précisément : `f` continue en `a` si `lim_{x→a} f(x) = f(a)`
- Dérivable implique continue : une fonction dérivable sur `I` est continue sur `I`. | la réciproque est fausse : `|x|` est continue en 0 sans y être dérivable
- Fonctions continues usuelles : polynômes, `|x|`, `e^x`, `sin`, `cos` sur ℝ ; `√x` sur `[0 ; +∞[` ; `1/x` sur chaque intervalle de `ℝ ∖ {0}`. | sommes, produits, quotients (dénominateur non nul) restent continus
- Théorème des valeurs intermédiaires : `f` continue sur `[a ; b]`, `k` entre `f(a)` et `f(b)` : `f(x) = k` a au moins une solution dans `[a ; b]`. | si de plus `f` est strictement monotone, la solution est unique
- Suite `u_{n+1} = f(u_n)` : si `f` est continue et `(u_n)` converge vers `L`, alors `f(L) = L`. | « point fixe »
- Dérivée seconde : `f″ = (f′)′`. | `(3x^3 − 5x^2 + 1)″ = 18x − 10`
- Corde : segment reliant deux points de la courbe. | convexe : courbe sous ses cordes
- Fonction convexe : courbe au-dessus de ses tangentes ; concave : en dessous. | `x^2` convexe, `√x` concave, `x^3` concave sur `]−∞ ; 0]` et convexe sur `[0 ; +∞[`
- Critère : `f` convexe sur `I` ⟺ `f′` croissante ⟺ `f″ ≥ 0` ; concave ⟺ `f″ ≤ 0`. | pour `f` deux fois dérivable
- Point d'inflexion : point où la courbe traverse sa tangente ; la convexité y change. | souvent là où `f″` s'annule en changeant de signe

## Méthodes
### Prouver qu'une équation `f(x) = 0` a une unique solution sur `[a ; b]`
1. `f` est continue sur `[a ; b]` (polynôme, somme de fonctions continues…).
2. `f(a)` et `f(b)` sont de signes contraires.
3. `f` est strictement monotone sur `[a ; b]` (signe de `f′`).
4. Conclus avec le théorème des valeurs intermédiaires.

### Encadrer la solution par balayage
1. Tabule `f` avec un pas de 0,1 et repère le changement de signe.
2. Recommence avec un pas de 0,01 entre les deux valeurs trouvées.

### Étudier la convexité
1. Calcule `f′` puis `f″`.
2. Étudie le signe de `f″`.
3. `f″ ≥ 0` : convexe ; `f″ ≤ 0` : concave ; changement de signe : point d'inflexion.

### Démontrer une inégalité par convexité
1. Établis la convexité (ou concavité) sur l'intervalle.
2. Écris l'équation de la tangente choisie.
3. Concave : `f(x) ≤` tangente ; convexe : `f(x) ≥` tangente.

## Exemples résolus
### Continuité de la fonction par morceaux `−x + 2` (x < 3), `x − 4` (3 ≤ x < 5), `−2x + 13` (x ≥ 5)
- En 3 : limites à gauche et à droite égales à `−1 = f(3)` — continue en 3.
- En 5 : limite à gauche 1, valeur `f(5) = 3` — pas continue en 5.

### `x^3 − x^2 − 1 = 0` sur `[1 ; 2]`
- Continue (polynôme), `f(1) = −1 < 0`, `f(2) = 3 > 0` — changement de signe.
- `f′(x) = x(3x − 2) > 0` sur `[1 ; 2]` — strictement croissante.
- Unique solution `α`, et `1,46 < α < 1,47` — balayage.

### Suite `u_{n+1} = 0,85u_n + 1,8`, `u_0 = 8`
- `f(x) = 0,85x + 1,8` est continue — on applique le théorème du point fixe.
- `L = 0,85L + 1,8 ⟺ 0,15L = 1,8 ⟺ L = 12` — la limite est 12.

### Convexité de `f(x) = x^3/3 − 9x^2 + 4`
- `f′(x) = x^2 − 18x`, `f″(x) = 2x − 18` — dérivée seconde.
- Concave sur `]−∞ ; 9]`, convexe sur `[9 ; +∞[` — signe de `f″`.

### Inégalité `x^3 − 2x^2 ≤ 7x + 4` pour `x ≤ 0`
- `f″(x) = 6x − 4 ≤ 0` sur `]−∞ ; 2/3]` — `f` concave.
- Tangente en `−1` : `y = 7x + 4` — `f(−1) = −3`, `f′(−1) = 7`.
- Concave donc sous ses tangentes : `f(x) ≤ 7x + 4` — en particulier pour `x ≤ 0`.

## Pièges fréquents
- Conclure à l'unicité sans la stricte monotonie → le théorème seul donne « au moins une » solution.
- Justifier la continuité par « `f(a)` et `f(b)` existent » → il faut une raison sur tout l'intervalle.
- Croire que monotone implique continue → une fonction en escalier est croissante mais pas continue.
- Inverser convexe et concave → convexe = « en bol », `f″ ≥ 0`, au-dessus des tangentes.
- Croire qu'un point où `f″(x) = 0` est toujours un point d'inflexion → il faut un changement de signe.
- Confondre « sous les cordes » et « sous les tangentes » → convexe : sous ses cordes mais au-dessus de ses tangentes.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Définition de « f continue en a » ? | `lim_{x→a} f(x) = f(a)` |
| Dérivable implique… ? | Continue |
| Que garantit le TVI pour f continue ? | Au moins une solution à `f(x) = k` |
| Que faut-il en plus pour l'unicité ? | La stricte monotonie |
| Limite d'une suite `u_{n+1} = f(u_n)` convergente, f continue ? | Une solution de `f(L) = L` |
| `f″ ≥ 0` sur `I` : conclusion ? | `f` convexe sur `I` |
| Position d'une courbe convexe par rapport à ses tangentes ? | Au-dessus |
| Qu'est-ce qu'un point d'inflexion ? | Un point où la courbe traverse sa tangente |
| Convexité de `√x` ? | Concave sur `[0 ; +∞[` |
| Convexité de `1/x` sur `]0 ; +∞[` ? | Convexe |

## Notes pour l'intégration
- La partie 8 du document (suites récurrentes et point fixe) recoupe le chapitre « Suites » de la partie 2 du parcours ; elle est gardée ici car elle illustre la continuité.
- Les reconnaissances graphiques de continuité, de convexité et de points d'inflexion sont remplacées par des calculs et des choix.

# Chapitre : Fonction exponentielle
Source : Texplog.pdf (Y. Monka, « Fonction exponentielle et fonction logarithme », parties 1 à 5, pages 1 à 13)
Niveau visé : Connaître la définition et les propriétés algébriques de l'exponentielle, résoudre équations et inéquations, dériver des fonctions contenant `e^x` et `e^{u}`, étudier leurs variations, calculer des limites (croissances comparées) et utiliser le modèle `A e^{kt}`.
Prérequis : dérivation, limites, puissances, second degré

## Explication pour un novice
Imagine une colonie de bactéries qui grandit d'autant plus vite qu'elle est nombreuse : 100 bactéries en fabriquent 10 par minute, 1000 en fabriquent 100. La vitesse de croissance est proportionnelle à la quantité. Les mathématiciens ont cherché la fonction la plus simple avec cette propriété : celle qui est égale à sa propre dérivée et qui vaut 1 en 0. Elle existe et elle est unique : c'est l'exponentielle, notée `exp`.

Sa propriété fondamentale transforme une somme en produit : `exp(a + b) = exp(a) × exp(b)`. C'est exactement le comportement des puissances (`2^{3+4} = 2^3 × 2^4`). D'ailleurs, en notant `e = exp(1) ≈ 2,718`, on écrit `exp(x) = e^x`, et toutes les règles des puissances s'appliquent.

L'exponentielle est toujours strictement positive et strictement croissante. Sa croissance est explosive : `e^{21}` dépasse le milliard. À l'inverse, en `−∞`, elle s'écrase vers 0 sans jamais l'atteindre.

En cas de « match » à l'infini, l'exponentielle gagne toujours contre les puissances : `e^x/x^{100}` finit par tendre vers `+∞`. Ce sont les croissances comparées. Enfin, les fonctions `t ↦ A e^{kt}` modélisent les croissances (k > 0) et décroissances (k < 0) exponentielles : populations, intérêts composés, refroidissement, radioactivité.

## Notions (dans l'ordre d'apprentissage)
- Définition : unique fonction `f` dérivable sur ℝ telle que `f′ = f` et `f(0) = 1`. | notée `exp`, `exp(0) = 1`
- Relation fonctionnelle : `exp(x + y) = exp(x) exp(y)`. | conséquences : `exp(−x) = 1/exp(x)`, `exp(x − y) = exp(x)/exp(y)`, `exp(nx) = (exp x)^n`
- Nombre `e` : `e = exp(1) ≈ 2,718`, irrationnel et transcendant. | on note `exp(x) = e^x`
- Règles de calcul : `e^{x+y} = e^x e^y`, `e^{x−y} = e^x/e^y`, `e^{−x} = 1/e^x`, `(e^x)^n = e^{nx}`. | `e^x > 0` pour tout `x`
- Équations et inéquations : `e^a = e^b ⟺ a = b` et `e^a < e^b ⟺ a < b`. | car exp est strictement croissante
- Dérivée : `(e^x)′ = e^x` ; `(e^{kx})′ = ke^{kx}` ; `(e^{u})′ = u′e^{u}`. | exp est strictement croissante sur ℝ
- Fonctions `t ↦ e^{kt}` : croissantes si `k > 0`, décroissantes si `k < 0`. | modèle `f(t) = A e^{kt}` avec `f(0) = A`, solution de `f′ = kf`
- Limites : `lim_{x→+∞} e^x = +∞` et `lim_{x→−∞} e^x = 0`. | asymptote horizontale `y = 0` en `−∞`
- Croissances comparées : `e^x/x → +∞` et `e^x/x^n → +∞` en `+∞` ; `xe^x → 0` et `x^n e^x → 0` en `−∞`. | l'exponentielle impose sa limite

## Méthodes
### Simplifier une expression avec des exponentielles
1. Transforme produits et quotients en sommes et différences d'exposants.
2. Applique `(e^a)^n = e^{na}` aux puissances.
3. Regroupe en une seule exponentielle.

### Résoudre `e^{A} = e^{B}` ou `e^{A} < e^{B}`
1. Écris chaque membre comme une exponentielle (`1 = e^0`).
2. Compare les exposants (même sens, exp est croissante).
3. Résous l'équation ou l'inéquation obtenue.

### Étudier une fonction du type `(ax + b)e^x`
1. Dérive avec la règle du produit.
2. Factorise par `e^x`.
3. Comme `e^x > 0`, le signe de `f′` est celui de l'autre facteur.

### Lever une indétermination avec `e^x`
1. Factorise par `e^x` (le terme dominant).
2. Utilise les croissances comparées : `x^n/e^x → 0`.
3. Conclus avec les règles d'opérations.

## Exemples résolus
### Simplifier `A = e^7 × e^{−4}/e^{−5}`
- `= e^{7−4}/e^{−5} = e^3/e^{−5}` — produit : on additionne.
- `= e^{3+5} = e^8` — quotient : on soustrait.

### Résoudre `e^{x^2 − 3} = e^{−2x}`
- `x^2 − 3 = −2x` — exp est strictement croissante.
- `x^2 + 2x − 3 = 0`, `Δ = 16` — second degré.
- `S = {−3 ; 1}` — formule des racines.

### Variations de `f(x) = (x + 1)e^x`
- `f′(x) = e^x + (x + 1)e^x = (x + 2)e^x` — produit puis factorisation.
- `f′` a le signe de `x + 2` — car `e^x > 0`.
- Minimum `f(−2) = −e^{−2}` ; tangente en 0 : `y = 2x + 1` — tableau.

### Bactéries : `f(t) = 50 000 e^{0,14t}`
- `f(3) = 50 000 e^{0,42} ≈ 76 000` — à la calculatrice.
- Doublement vers `t ≈ 5` h — quand `f(t)` atteint 100 000.

### `lim_{x→+∞} (e^x + x)/(e^x − x^2)`
- `= (1 + x/e^x)/(1 − x^2/e^x)` — on factorise par `e^x`.
- `x/e^x → 0` et `x^2/e^x → 0` : limite 1 — croissances comparées.

## Pièges fréquents
- Écrire `e^a × e^b = e^{ab}` → c'est `e^{a+b}`.
- Croire que `e^x` peut être négatif ou nul → `e^x > 0` toujours.
- Oublier `u′` en dérivant `e^{u}` → `(e^{−3t})′ = −3e^{−3t}`.
- Dire que `x^2` l'emporte sur `e^x` en `+∞` → c'est l'inverse.
- Oublier de changer le sens en divisant par un négatif après avoir comparé les exposants.
- Confondre `e^{−x}` et `−e^x` → le premier est positif, le second négatif.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Définition de exp ? | `f′ = f` et `f(0) = 1` |
| `e^{a+b}` ? | `e^a × e^b` |
| `e^{−x}` ? | `1/e^x` |
| Dérivée de `e^{kx}` ? | `ke^{kx}` |
| Dérivée de `e^{u}` ? | `u′e^{u}` |
| `lim_{x→−∞} e^x` ? | 0 |
| `lim_{x→+∞} e^x/x^n` ? | `+∞` |
| `lim_{x→−∞} xe^x` ? | 0 |
| Valeur approchée de `e` ? | 2,718 |
| Sens de variation de `t ↦ e^{kt}` si `k < 0` ? | Strictement décroissante |

## Notes pour l'intégration
- Le document de 27 pages est découpé en deux chapitres : « Fonction exponentielle » (parties 1 à 5) et « Fonction logarithme népérien » (parties 6 à 10).
- Imprécision du document (partie 4) : on y lit « pour tout entier relatif k non nul », alors que la propriété vaut pour tout réel `k`.
- Le « divertissement » sur une approximation de `e` (Richard Sabey, 2004) n'est pas repris.

# Chapitre : Fonction logarithme népérien
Source : Texplog.pdf (Y. Monka, « Fonction exponentielle et fonction logarithme », parties 6 à 10, pages 13 à 27)
Niveau visé : Définir `ln` comme réciproque de l'exponentielle, utiliser ses propriétés algébriques, résoudre équations et inéquations (en déterminant l'ensemble de résolution), dériver `ln u`, connaître limites et croissances comparées, et étudier des fonctions contenant `ln`.
Prérequis : fonction exponentielle, théorème des valeurs intermédiaires, dérivation, second degré

## Explication pour un novice
L'exponentielle répond à la question « que vaut `e` puissance `x` ? ». Le logarithme répond à la question inverse : « à quelle puissance faut-il élever `e` pour obtenir `a` ? ». Par exemple, `e^2 ≈ 7,39`, donc `ln(7,39) ≈ 2`. Le logarithme « défait » l'exponentielle : `ln(e^x) = x` et `e^{ln a} = a`.

Comme l'exponentielle ne prend que des valeurs strictement positives, on ne peut prendre le logarithme que d'un nombre strictement positif : `ln` est définie sur `]0 ; +∞[`. Ses courbes et celles de l'exponentielle sont symétriques par rapport à la droite `y = x`.

La grande propriété du logarithme est de transformer les produits en sommes : `ln(ab) = ln a + ln b`. Avant les calculatrices, c'était une révolution : pour multiplier deux grands nombres, on lisait leurs logarithmes dans une table, on les additionnait, puis on relisait la table à l'envers. Astronomes, navigateurs et banquiers ont gagné des années de calcul.

Le logarithme croît, mais très lentement : il faut `x ≈ 22 000` pour que `ln x` dépasse 10. Toute puissance de `x` finit par l'écraser : `ln(x)/x → 0`. Sa dérivée est remarquablement simple : `(ln x)′ = 1/x`.

## Notions (dans l'ordre d'apprentissage)
- Définition : pour `a > 0`, `ln a` est l'unique solution de `e^x = a`. | existence et unicité par le théorème des valeurs intermédiaires
- Réciprocité : pour `x > 0`, `x = e^y ⟺ y = ln x` ; `ln(e^x) = x` ; `e^{ln x} = x`. | courbes symétriques par rapport à `y = x`
- Valeurs : `ln 1 = 0`, `ln e = 1`, `ln(1/e) = −1`. | `ln x < 0` pour `0 < x < 1`
- Relation fonctionnelle : `ln(xy) = ln x + ln y` pour `x, y > 0`. | transforme les produits en sommes
- Conséquences : `ln(1/x) = −ln x`, `ln(x/y) = ln x − ln y`, `ln(√x) = (1/2)ln x`, `ln(x^n) = n ln x`. | `n` entier relatif
- Équations et inéquations : `ln x = ln y ⟺ x = y` et `ln x < ln y ⟺ x < y` (x, y > 0). | toujours déterminer d'abord l'ensemble de résolution
- Logarithme décimal : `log x = ln x/ln 10`. | utilisé en sciences (pH, décibels)
- Dérivée : `(ln x)′ = 1/x` sur `]0 ; +∞[` ; `(ln u)′ = u′/u` pour `u > 0`. | ln est strictement croissante et concave
- Limites : `lim_{x→0} ln x = −∞` et `lim_{x→+∞} ln x = +∞`. | asymptote verticale `x = 0`
- Tangentes : en 1, `y = x − 1` ; en `e`, `y = x/e`. | `ln x ≤ x − 1` par concavité
- Croissances comparées : `ln(x)/x → 0` et `ln(x)/x^n → 0` en `+∞` ; `x ln x → 0` et `x^n ln x → 0` en 0. | les puissances imposent leur limite

## Méthodes
### Résoudre une équation avec des logarithmes
1. Détermine l'ensemble de résolution : tout ce qui est dans un `ln` doit être strictement positif.
2. Regroupe en un seul logarithme de chaque côté (`ln a + ln b = ln(ab)`).
3. Utilise `ln A = ln B ⟺ A = B` (ou `ln A = k ⟺ A = e^k`).
4. Garde seulement les solutions de l'ensemble de résolution.

### Résoudre `e^{u} = b` ou `ln u = k`
1. `e^{u} = b` (b > 0) ⟺ `u = ln b`.
2. `ln u = k` ⟺ `u = e^k`.

### Résoudre une inéquation avec des logarithmes
1. Ensemble de résolution.
2. `ln A ≤ ln B ⟺ A ≤ B` (ln est croissante, le sens est conservé).
3. Intersecte avec l'ensemble de résolution.

### Étudier une fonction contenant `ln x`
1. Dérive : `(ln x)′ = 1/x`, mets au même dénominateur.
2. Comme `x > 0`, le signe de `f′` est celui du numérateur.
3. Dresse le tableau de variations.

## Exemples résolus
### Simplifier `B = 3 ln 2 + ln 5 − 2 ln 3`
- `= ln(2^3) + ln 5 − ln(3^2)` — `n ln a = ln(a^n)`.
- `= ln(8 × 5/9) = ln(40/9)` — produit et quotient.

### Résoudre `ln(x − 3) + ln(9 − x) = 0`
- Ensemble de résolution : `]3 ; 9[` — `x − 3 > 0` et `9 − x > 0`.
- `(x − 3)(9 − x) = 1` — car `ln 1 = 0`.
- `−x^2 + 12x − 28 = 0` : `x = 6 − 2√2` ou `x = 6 + 2√2` — `Δ = 32`, les deux sont dans `]3 ; 9[`.

### Résoudre `ln(3 − x) − ln(x + 1) ≤ 0`
- Ensemble : `]−1 ; 3[` — conditions d'existence.
- `3 − x ≤ x + 1 ⟺ x ≥ 1` — ln est croissante.
- `S = [1 ; 3[` — intersection.

### Dériver `f(x) = (ln x)^2/x`
- `u = (ln x)^2`, `u′ = 2 × (1/x) × ln x` — dérivée de `u^2`.
- `f′(x) = ln x (2 − ln x)/x^2` — règle du quotient puis factorisation.

### Étudier `f(x) = 3 − x + 2 ln x`
- `f′(x) = −1 + 2/x = (2 − x)/x` — même dénominateur.
- Maximum `f(2) = 1 + 2 ln 2` — `f′` positive puis négative.
- `f″(x) = −2/x^2 < 0` : f concave — dérivée seconde.

## Pièges fréquents
- Écrire `ln(a + b) = ln a + ln b` → c'est `ln(ab) = ln a + ln b`.
- Oublier l'ensemble de résolution → vérifie que chaque expression dans un `ln` est strictement positive.
- Résoudre `ln X = 0` par `X = 0` → `ln X = 0 ⟺ X = 1`.
- Prendre `ln` d'un nombre négatif ou nul → `ln` n'est définie que sur `]0 ; +∞[`.
- Oublier `u′` dans `(ln u)′` → `(ln(2x − x^2))′ = (2 − 2x)/(2x − x^2)`.
- Croire que `ln x` reste borné → il tend vers `+∞`, mais lentement.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Ensemble de définition de ln ? | `]0 ; +∞[` |
| `ln(e^x)` ? | `x` |
| `ln(ab)` ? | `ln a + ln b` |
| `ln(a^n)` ? | `n ln a` |
| `ln 1` ? | 0 |
| Dérivée de `ln x` ? | `1/x` |
| Dérivée de `ln u` ? | `u′/u` |
| `lim_{x→+∞} ln(x)/x` ? | 0 |
| `lim_{x→0} x ln x` ? | 0 |
| `ln X = 0` équivaut à ? | `X = 1` |
| Tangente à ln en 1 ? | `y = x − 1` |
| Qui a publié les logarithmes en 1614 ? | John Napier (Neper) |

## Notes pour l'intégration
- Imprécision historique du document : « logarithme » vient des mots grecs logos (rapport, raison) et arithmos (nombre) ; le document traduit logos par « logique ».
- La table de logarithmes décimaux du document (exemple 36 × 62) est reprise dans la pédagogie, pas dans les exercices.
