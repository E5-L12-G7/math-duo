# Chapitre : Suites arithmétiques et géométriques
Source : Tsag.pdf (Y. Monka, « Suites arithmétiques, suites géométriques », parties 1 à 4 : définitions, forme explicite, sens de variation, sommes de termes consécutifs, limite de `q^n`, suite auxiliaire `v_n = u_n + 10 000`)
Niveau visé : reconnaître une suite arithmétique ou géométrique, écrire son terme général, étudier son sens de variation, calculer la somme de termes consécutifs et la limite de `q^n`, et ramener une suite `u_{n+1} = a u_n + b` à une suite géométrique.
Prérequis : calcul avec les fractions et les puissances, pourcentages, notion de fonction

## Explication pour un novice
Une suite, c'est une liste de nombres numérotés : le premier, le deuxième, le troisième… On note `u_0` le premier (ou `u_1` si on commence à 1), `u_1` le suivant, et `u_n` celui qui porte le numéro `n`. Le numéro s'appelle le **rang** (ou l'indice).

Deux façons de fabriquer une liste reviennent sans arrêt dans la vie. La première : **ajouter toujours la même quantité**. Tu mets 5 € de côté chaque semaine : 3, 8, 13, 18… C'est une suite **arithmétique**, et la quantité ajoutée (ici 5) s'appelle la **raison**. La seconde : **multiplier toujours par le même nombre**. Ton épargne rapporte 4 % par an : chaque année le capital est multiplié par 1,04. C'est une suite **géométrique**, et le multiplicateur (ici 1,04) est sa **raison**.

Pourquoi distinguer ces deux familles ? Parce qu'elles grandissent de façons radicalement différentes. Une suite arithmétique avance d'un pas fixe : ses points sont alignés, c'est une croissance **linéaire**. Une suite géométrique de raison supérieure à 1 accélère : plus elle est grande, plus elle grandit vite, c'est une croissance **exponentielle**. Une dette à intérêts, une épidémie à ses débuts ou une population de bactéries suivent ce second modèle, et c'est pour cela qu'elles surprennent.

Pour chacune des deux familles, on dispose de formules qui évitent de tout calculer pas à pas : le terme de rang `n` directement (`u_n = u_0 + nr` ou `u_n = u_0 × q^n`), la somme de nombreux termes consécutifs, et le comportement de la suite quand `n` devient très grand.

Enfin, beaucoup de situations réelles mélangent les deux : un placement à 3 % auquel on ajoute 300 € chaque année donne `u_{n+1} = 1,03 u_n + 300`. Ce n'est ni arithmétique ni géométrique, mais une astuce (la suite auxiliaire) permet de se ramener à une suite géométrique et de tout calculer.

## Notions (dans l'ordre d'apprentissage)
- Suite numérique : une liste de nombres numérotés par les entiers naturels | `n ↦ u_n`, définie sur ℕ (ou à partir d'un rang)
- Suite arithmétique : on passe d'un terme au suivant en ajoutant toujours le même nombre `r`, la raison | `u_{n+1} = u_n + r` pour tout `n`
- Terme général arithmétique : formule qui donne directement `u_n` | `u_n = u_0 + nr`, ou `u_n = u_p + (n − p)r`
- Sens de variation arithmétique : le signe de la raison décide de tout | `u_{n+1} − u_n = r` : croissante si `r > 0`, décroissante si `r < 0`
- Suite géométrique : on passe d'un terme au suivant en multipliant toujours par le même nombre non nul `q`, la raison | `u_{n+1} = q × u_n` pour tout `n`
- Terme général géométrique : formule qui donne directement `u_n` | `u_n = u_0 × q^n`, ou `u_n = u_p × q^{n − p}`
- Sens de variation géométrique : il dépend de `q` et du signe de `u_0` | pour `u_0 > 0` : croissante si `q > 1`, décroissante si `0 < q < 1` ; pour `u_0 < 0` c'est l'inverse ; si `q < 0`, ni croissante ni décroissante
- Somme des premiers entiers : la formule de Gauss | `1 + 2 + … + n = n(n + 1)/2`
- Somme de termes arithmétiques consécutifs : nombre de termes multiplié par la moyenne du premier et du dernier | `S = (nombre de termes) × (premier + dernier)/2`
- Somme géométrique : formule pour `q ≠ 1` | `1 + q + q^2 + … + q^n = (1 − q^{n+1})/(1 − q)`
- Limite de `q^n` : ce que devient `q^n` quand `n` devient très grand | si `q > 1`, `q^n → +∞` ; si `−1 < q < 1`, `q^n → 0` ; si `q = 1`, `q^n = 1` ; si `q ≤ −1`, pas de limite
- Suite arithmético-géométrique : suite du type `u_{n+1} = a u_n + b`, ni arithmétique ni géométrique en général | on pose `v_n = u_n − ℓ` avec `ℓ = b/(1 − a)` ; alors `(v_n)` est géométrique de raison `a`

## Méthodes
### Démontrer qu'une suite est arithmétique ou géométrique
1. Pour l'arithmétique : calcule `u_{n+1} − u_n` pour un `n` quelconque (en remplaçant `n` par `n + 1` dans la formule, avec des parenthèses).
2. Si le résultat est un nombre qui ne dépend pas de `n`, la suite est arithmétique et ce nombre est la raison. S'il dépend de `n`, elle ne l'est pas.
3. Pour le géométrique (termes non nuls) : calcule `u_{n+1}/u_n` ; s'il est constant, c'est la raison.
4. Deux ou trois termes calculés ne prouvent rien « pour tout `n` » : ils servent seulement à conjecturer, ou à prouver qu'une suite **n'est pas** arithmétique (un contre-exemple suffit).

### Écrire le terme général
1. Repère le type (on ajoute ou on multiplie), la raison et le premier terme.
2. Arithmétique : `u_n = u_0 + nr`. Géométrique : `u_n = u_0 × q^n`.
3. Si la suite commence à `u_1`, utilise `u_n = u_1 + (n − 1)r` ou `u_n = u_1 × q^{n − 1}`, ou bien reviens « en marche arrière » à `u_0`.

### Retrouver la raison à partir de deux termes
1. Arithmétique : entre `u_p` et `u_m`, il y a `m − p` pas, donc `r = (u_m − u_p)/(m − p)`.
2. Géométrique : `q^{m − p} = u_m/u_p`, puis on prend la racine (racine cubique si `m − p = 3`…), en tenant compte du signe si `m − p` est pair.
3. On en déduit le premier terme : `u_0 = u_p − pr` ou `u_0 = u_p/q^p`.

### Calculer une somme de termes consécutifs
1. Compte les termes : de `u_p` à `u_m`, il y a `m − p + 1` termes.
2. Arithmétique : `S = (nombre de termes) × (premier + dernier)/2`. Pour `15 + 16 + … + 88`, on peut aussi faire `(1 + … + 88) − (1 + … + 14)`.
3. Géométrique : `S = (premier terme) × (1 − q^{nombre de termes})/(1 − q)`.

### Étudier une suite `u_{n+1} = a u_n + b` (suite auxiliaire)
1. Cherche le nombre `ℓ` qui ne bouge pas : `ℓ = aℓ + b`, soit `ℓ = b/(1 − a)`.
2. Pose `v_n = u_n − ℓ` et calcule `v_{n+1} = a u_n + b − ℓ = a(v_n + ℓ) + b − ℓ = a v_n`.
3. `(v_n)` est géométrique de raison `a` et de premier terme `v_0 = u_0 − ℓ`, donc `v_n = (u_0 − ℓ)a^n`.
4. On revient à `u_n = v_n + ℓ = ℓ + (u_0 − ℓ)a^n`.

## Exemples résolus
### La suite définie par `u_n = 7 − 9n` est-elle arithmétique ?
- `u_{n+1} − u_n = 7 − 9(n + 1) − (7 − 9n)` — on remplace `n` par `n + 1`, avec des parenthèses
- `= 7 − 9n − 9 − 7 + 9n = −9` — le résultat ne dépend pas de `n`
- La suite est arithmétique de raison `−9` — on passe d'un terme au suivant en ajoutant `−9`

### `u_1 = 5` et `u_{n+1} = 2u_n` : expression de `u_n`
- La suite est géométrique de raison 2 — on multiplie par 2 à chaque étape
- `u_0 = u_1/2 = 2,5` — marche arrière : on divise par la raison
- `u_n = 2,5 × 2^n` — formule `u_n = u_0 × q^n` (ou `u_n = 5 × 2^{n − 1}`, c'est la même)

### Suite arithmétique avec `u_5 = 7` et `u_9 = 19`
- Entre `u_5` et `u_9`, il y a 4 pas : `4r = 19 − 7 = 12`, donc `r = 3` — on soustrait membre à membre
- `u_0 = u_5 − 5r = 7 − 15 = −8` — on recule de 5 pas
- `u_n = −8 + 3n` — terme général

### Suite géométrique avec `u_4 = 8` et `u_7 = 512`
- `q^3 = 512/8 = 64`, donc `q = 4` — racine cubique de 64
- `u_0 = 8/4^4 = 8/256 = 1/32` — on divise 4 fois par 4
- `u_n = (1/32) × 4^n` — terme général

### Calculer `33 + 36 + 39 + … + 267`
- `= 3 × (11 + 12 + … + 89)` — on met 3 en facteur
- `11 + … + 89` compte `89 − 11 + 1 = 79` termes, de moyenne `(11 + 89)/2 = 50` — nombre de termes × moyenne des extrêmes
- `S = 3 × 79 × 50 = 11 850` — même résultat que la méthode « différence de deux sommes de Gauss »

### Investissement qui baisse de 30 % par mois, 20 000 € le premier mois : total sur 12 mois
- Baisser de 30 %, c'est multiplier par 0,7 : `u_n = 20 000 × 0,7^n` — suite géométrique de raison 0,7
- De `u_0` à `u_{11}`, il y a 12 termes — 12 mois
- `S = 20 000 × (1 − 0,7^{12})/(1 − 0,7) ≈ 65 744` € — formule de la somme géométrique

### Placement : `u_0 = 5 000` et `u_{n+1} = 1,03u_n + 300`
- Point fixe : `ℓ = 1,03ℓ + 300` donne `ℓ = −10 000` — c'est pourquoi on pose `v_n = u_n + 10 000`
- `v_{n+1} = 1,03u_n + 10 300 = 1,03(u_n + 10 000) = 1,03v_n` — `(v_n)` est géométrique de raison 1,03
- `v_0 = 15 000`, donc `u_n = 15 000 × 1,03^n − 10 000` et `u_{10} ≈ 10 158,75` — on revient à `u_n`

## Pièges fréquents
- Confondre les deux familles : ajouter la raison ou multiplier par la raison → arithmétique : `u_0 + nr` ; géométrique : `u_0 × q^n`.
- Oublier le décalage quand la suite commence à `u_1` → l'exposant (ou le facteur de `r`) devient `n − 1`.
- Compter les termes d'une somme de travers → de `u_0` à `u_n`, il y a `n + 1` termes ; de `u_p` à `u_m`, il y en a `m − p + 1`.
- Écrire « baisser de 30 % » comme « multiplier par 0,3 » → c'est multiplier par `1 − 0,3 = 0,7`.
- Conclure « croissante » dès que `q > 1` → c'est vrai seulement si `u_0 > 0` ; si `u_0 < 0`, la suite décroît.
- Croire que `q^n` tend vers 0 dès que `q < 1` → il faut `−1 < q < 1` ; pour `q ≤ −1`, `q^n` oscille et n'a pas de limite.
- Prouver qu'une suite est arithmétique avec deux ou trois termes → il faut un calcul valable pour tout `n`.
- Dans `u_{n+1} − u_n`, oublier les parenthèses autour de `u_n` → le signe moins porte sur toute l'expression.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Définition d'une suite arithmétique ? | `u_{n+1} = u_n + r` pour tout `n` |
| Terme général d'une suite arithmétique ? | `u_n = u_0 + nr` |
| Définition d'une suite géométrique ? | `u_{n+1} = q × u_n` pour tout `n`, avec `q ≠ 0` |
| Terme général d'une suite géométrique ? | `u_n = u_0 × q^n` |
| Que vaut `1 + 2 + … + n` ? | `n(n + 1)/2` |
| Que vaut `1 + q + … + q^n` (q ≠ 1) ? | `(1 − q^{n+1})/(1 − q)` |
| Limite de `q^n` si `−1 < q < 1` ? | 0 |
| Limite de `q^n` si `q > 1` ? | `+∞` |
| Baisser de 30 %, c'est multiplier par ? | 0,7 |
| Combien de termes de `u_0` à `u_n` ? | `n + 1` |

## Notes pour l'intégration
Les figures du document (nuages de points, résumé graphique) ne sont pas reproductibles ; elles sont décrites par la phrase « les points sont alignés / la croissance est exponentielle ». Les programmes Python (algorithme de somme) sont remplacés par le calcul direct. Dans la remarque du document sur le sens de variation géométrique, « si q est négatif, la suite n'est pas monotone » vise le cas `q < 0` strictement.

# Chapitre : Suites : récurrence et limites
Source : Tsui.pdf (Y. Monka, « Généralités sur les suites » : parties 1 à 8 — forme explicite et récurrente, sens de variation, notion de limite, raisonnement par récurrence, inégalité de Bernoulli, limites et opérations, comparaison et gendarmes, suites majorées et convergence monotone)
Niveau visé : calculer des termes, étudier les variations d'une suite, rédiger un raisonnement par récurrence, déterminer une limite par opérations, par factorisation, par comparaison ou par encadrement, et prouver qu'une suite converge grâce au théorème de convergence monotone.
Prérequis : suites arithmétiques et géométriques, factorisation, inégalités, dérivée et sens de variation d'une fonction

## Explication pour un novice
Une suite peut être donnée de deux façons. Soit par une **formule explicite** : `u_n = 3n^2 − 1`, et on calcule n'importe quel terme d'un coup (`u_{100}` directement). Soit **par récurrence** : on donne le premier terme et une règle pour passer au suivant, comme `u_{n+1} = 4u_n − 6`. Là, pour connaître `u_{100}`, il faut en principe calculer tous les termes avant : c'est le sens du mot latin *recurrere*, « revenir en arrière ».

Première question naturelle : la suite monte-t-elle ou descend-elle ? On compare deux termes voisins en regardant le signe de `u_{n+1} − u_n`. Positif : la suite **croît** ; négatif : elle **décroît**. Parfois ce n'est vrai qu'à partir d'un certain rang.

Deuxième question : que se passe-t-il quand `n` devient immense ? Les termes peuvent se rapprocher d'un nombre (la suite **converge** vers sa **limite**), grandir sans fin (limite `+∞`), ou ne se fixer nulle part, comme `(−1)^n` qui saute entre −1 et 1 (la suite **diverge** sans limite). Pour trouver une limite, on combine des limites connues (`1/n → 0`, `n^2 → +∞`…) avec des règles d'opérations. Quatre situations restent bloquées, les **formes indéterminées** : « `∞ − ∞` », « `0 × ∞` », « `∞/∞` » et « `0/0` ». Il faut alors transformer l'écriture, le plus souvent en factorisant par le terme dominant.

Troisième outil, le plus célèbre : le **raisonnement par récurrence**. Imagine une file infinie de dominos. Si le premier tombe, et si chaque domino qui tombe fait tomber le suivant, alors tous tombent. En maths : on vérifie qu'une propriété est vraie au départ (**initialisation**), puis on montre que « si elle est vraie à un rang `k`, elle l'est au rang `k + 1` » (**hérédité**). On conclut qu'elle est vraie pour tous les rangs. C'est l'outil idéal pour les suites définies par récurrence.

Enfin, deux théorèmes donnent des limites sans calcul direct. Le **théorème des gendarmes** : si une suite est coincée entre deux suites qui ont la même limite, elle a cette limite aussi. Le **théorème de convergence monotone** : une suite croissante et majorée (qui monte mais ne dépasse jamais un plafond) converge forcément.

## Notions (dans l'ordre d'apprentissage)
- Rang et terme : `n` est le rang, `u_n` le terme de rang `n` | une suite est une fonction `ℕ → ℝ`, `n ↦ u_n`
- Forme explicite : `u_n` est donné directement en fonction de `n` | `u_n = f(n)`
- Forme récurrente : on donne le premier terme et la règle pour passer au suivant | `u_0` donné et `u_{n+1} = f(u_n)`
- Suite croissante : chaque terme est au moins égal au précédent | `u_{n+1} ≥ u_n` pour tout `n` (à partir d'un rang)
- Suite décroissante : chaque terme est au plus égal au précédent | `u_{n+1} ≤ u_n` pour tout `n` (à partir d'un rang)
- Raisonnement par récurrence : initialisation + hérédité ⇒ propriété vraie pour tous les rangs | si `P(n_0)` est vraie et si `P(k) ⇒ P(k + 1)` pour tout `k ≥ n_0`, alors `P(n)` est vraie pour tout `n ≥ n_0`
- Inégalité de Bernoulli : une minoration utile des puissances | pour `a ≥ 0` et tout `n` : `(1 + a)^n ≥ 1 + na`
- Limite `+∞` : les termes finissent par dépasser n'importe quel nombre | tout intervalle `]A ; +∞[` contient tous les termes à partir d'un certain rang
- Limite finie `ℓ` : les termes finissent par être aussi proches de `ℓ` qu'on veut | tout intervalle ouvert contenant `ℓ` contient tous les termes à partir d'un certain rang
- Suite divergente : suite qui ne converge pas (limite infinie ou pas de limite) | exemple : `(−1)^n` n'a pas de limite
- Formes indéterminées : situations où les règles ne permettent pas de conclure | `∞ − ∞`, `0 × ∞`, `∞/∞`, `0/0`
- Théorème de comparaison : une suite plus grande qu'une suite qui tend vers `+∞` tend vers `+∞` | si `u_n ≤ v_n` à partir d'un rang et `u_n → +∞`, alors `v_n → +∞`
- Théorème des gendarmes : une suite coincée entre deux suites de même limite a cette limite | si `v_n ≤ u_n ≤ w_n` à partir d'un rang et `v_n → ℓ`, `w_n → ℓ`, alors `u_n → ℓ`
- Suite majorée, minorée, bornée : sous un plafond, au-dessus d'un plancher, ou les deux | `u_n ≤ M` pour tout `n` ; `u_n ≥ m` pour tout `n`
- Convergence monotone : croissante et majorée, ou décroissante et minorée ⇒ convergente | le théorème ne donne pas la valeur de la limite

## Méthodes
### Étudier le sens de variation
1. Calcule `u_{n+1} − u_n` et simplifie.
2. Étudie son signe (éventuellement seulement à partir d'un rang : `2n − 3 ≥ 0` pour `n ≥ 2`).
3. Si les termes sont strictement positifs, tu peux aussi comparer `u_{n+1}/u_n` à 1.
4. Si `u_n = f(n)` avec `f` monotone sur `[0 ; +∞[`, la suite a le même sens de variation (la réciproque est fausse).

### Rédiger une récurrence
1. Énonce la propriété `P(n)` à démontrer.
2. Initialisation : vérifie `P(n_0)` au premier rang concerné.
3. Hérédité : suppose `P(k)` vraie **pour un certain** `k ≥ n_0` (hypothèse de récurrence) et démontre `P(k + 1)` en utilisant cette hypothèse.
4. Conclusion : `P` est vraie au rang `n_0` et héréditaire, donc vraie pour tout `n ≥ n_0`.

### Calculer une limite
1. Applique les règles d'opérations (somme, produit, quotient) avec les limites de référence (`n`, `n^2`, `√n → +∞` ; `1/n`, `1/n^2`, `1/√n → 0`).
2. Si tu tombes sur une forme indéterminée, factorise par le terme de plus haut degré (en haut et en bas pour un quotient), ou multiplie par l'expression conjuguée pour les différences de racines.
3. Si la suite contient un terme qui oscille (`(−1)^n`, `sin n`, `cos n`), encadre-le : comparaison pour une limite infinie, gendarmes pour une limite finie.

### Prouver qu'une suite récurrente converge
1. Montre par récurrence qu'elle est majorée (ou minorée).
2. Montre qu'elle est croissante (ou décroissante), par le signe de `u_{n+1} − u_n` ou par récurrence.
3. Conclus avec le théorème de convergence monotone.
4. Si la suite est définie par `u_{n+1} = f(u_n)` avec `f` continue, sa limite `ℓ` vérifie `ℓ = f(ℓ)`.

## Exemples résolus
### `u_0 = 3` et `u_{n+1} = 4u_n − 6` : premiers termes
- `u_1 = 4 × 3 − 6 = 6` — on remplace `u_0` par sa valeur
- `u_2 = 4 × 6 − 6 = 18` — on utilise le terme qu'on vient de calculer
- `u_3 = 4 × 18 − 6 = 66` — une étape à la fois

### `u_n = n^2 − 4n + 4` est croissante à partir de quel rang ?
- `u_{n+1} − u_n = (n + 1)^2 − 4(n + 1) + 4 − (n^2 − 4n + 4) = 2n − 3` — développement soigneux
- `2n − 3 ≥ 0` pour `n ≥ 1,5`, donc pour `n ≥ 2` — `n` est un entier
- La suite est croissante à partir du rang 2 — `u_{n+1} ≥ u_n` dès que `n ≥ 2`

### Démontrer par récurrence que `u_n = (n + 1)^2` si `u_0 = 1` et `u_{n+1} = u_n + 2n + 3`
- Initialisation : `(0 + 1)^2 = 1 = u_0` — la propriété est vraie au rang 0
- Hérédité : on suppose `u_k = (k + 1)^2` pour un certain `k` — hypothèse de récurrence
- `u_{k+1} = u_k + 2k + 3 = (k + 1)^2 + 2k + 3 = k^2 + 4k + 4 = (k + 2)^2` — on utilise la définition puis l'hypothèse
- Conclusion : vraie pour tout `n ≥ 0` — initialisation et hérédité

### Limite de `(5n^2 + 4)/(4n^2 + 3n)`
- Forme `∞/∞` — on ne peut pas conclure directement
- `= (5 + 4/n^2)/(4 + 3/n)` — on divise en haut et en bas par `n^2`
- La limite vaut `5/4` — `4/n^2 → 0` et `3/n → 0`

### Limite de `1 + sin(n)/n`
- `−1/n ≤ sin(n)/n ≤ 1/n` pour `n ≥ 1` — car `−1 ≤ sin n ≤ 1` et `n > 0`
- `−1/n → 0` et `1/n → 0`, donc `sin(n)/n → 0` — théorème des gendarmes
- La limite vaut 1 — limite d'une somme

### `u_0 = 2`, `u_{n+1} = (1/3)u_n + 2` converge
- Récurrence : si `u_k < 3`, alors `(1/3)u_k + 2 < 1 + 2 = 3` — la suite est majorée par 3
- Récurrence : `u_1 = 8/3 ≥ u_0`, et si `u_{k+1} ≥ u_k` alors `u_{k+2} ≥ u_{k+1}` — la suite est croissante
- Croissante et majorée : elle converge, et sa limite vérifie `ℓ = ℓ/3 + 2`, soit `ℓ = 3` — convergence monotone, puis point fixe

## Pièges fréquents
- Supposer la propriété « pour tout `k` » dans l'hérédité → on suppose seulement « pour un certain `k` » ; sinon on admet ce qu'on veut démontrer.
- Oublier l'initialisation → une propriété héréditaire peut être toujours fausse, comme « `2^n` est divisible par 3 ».
- Conclure avec quelques termes calculés → quelques valeurs donnent une conjecture, jamais une preuve pour tout `n`.
- Voir une forme indéterminée partout → `+∞ + ∞ = +∞`, `+∞ × (−∞) = −∞`, `k/∞ = 0` ne sont pas indéterminés.
- Croire qu'une suite majorée converge → il faut aussi qu'elle soit croissante (ou décroissante et minorée).
- Croire que le majorant est la limite → le théorème donne l'existence de la limite, pas sa valeur.
- Utiliser les gendarmes pour une limite infinie → pour `+∞`, une minoration suffit (théorème de comparaison).
- Penser qu'une suite décroissante vient forcément d'une fonction décroissante → la réciproque de la méthode est fausse.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Comment étudier le sens de variation ? | Signe de `u_{n+1} − u_n` |
| Deux étapes d'une récurrence ? | Initialisation et hérédité |
| Inégalité de Bernoulli ? | `(1 + a)^n ≥ 1 + na` pour `a ≥ 0` |
| Les quatre formes indéterminées ? | `∞ − ∞`, `0 × ∞`, `∞/∞`, `0/0` |
| Théorème des gendarmes ? | Encadrée par deux suites de même limite ℓ ⇒ limite ℓ |
| Croissante et majorée ⇒ ? | Convergente |
| Limite de `1/n` ? | 0 |

## Notes pour l'intégration
Les programmes Python et les captures de calculatrice du document ne sont pas reproduits ; l'algorithme de seuil est traité par des exercices de calcul. Les figures (nuages de points, gendarmes) sont décrites en mots. Dans l'exemple de convergence monotone, la phrase du document « décroissante et minorée par 2 » vise une autre suite que celle de l'exemple (qui est croissante et majorée par 3) ; on a gardé l'idée : le minorant n'est pas forcément la limite.

# Chapitre : Primitives et intégrales
Source : Tintfct.pdf (Y. Monka, « Intégration », parties 1 à 6 : primitives, primitives usuelles et composées, intégrale et aire, fonction définie par une intégrale, calcul avec une primitive, linéarité, positivité, intégration par parties, aire entre deux courbes, valeur moyenne, suite d'intégrales)
Niveau visé : trouver une primitive (usuelle ou de forme composée), calculer une intégrale avec une primitive ou avec des aires, utiliser la relation de Chasles, la linéarité et la positivité, intégrer par parties, calculer l'aire entre deux courbes et la valeur moyenne d'une fonction.
Prérequis : dérivées usuelles et dérivée d'une composée, exponentielle et logarithme, aires des figures simples

## Explication pour un novice
Dériver, c'est passer d'une fonction à sa vitesse de variation. Mais on a souvent besoin du chemin inverse : on connaît la vitesse d'une voiture à chaque instant et on veut la distance parcourue ; on connaît un débit et on veut le volume rempli. Une fonction `F` dont la dérivée est `f` s'appelle une **primitive** de `f`. Chercher une primitive, c'est « dériver à l'envers ».

Il n'y a jamais une seule primitive : si `F` convient, `F + 5` convient aussi, puisque la dérivée d'une constante est nulle. Sur un intervalle, toutes les primitives d'une même fonction diffèrent d'une constante. Pour en choisir une, on impose une condition, comme `F(1) = 0`.

Deuxième idée, qui semble d'abord n'avoir aucun rapport : l'**aire sous une courbe**. Pour une fonction positive `f` sur `[a ; b]`, l'intégrale `∫_a^b f(x) dx` est l'aire comprise entre la courbe, l'axe des abscisses et les droites `x = a` et `x = b`, mesurée en unités d'aire (u.a.). Le symbole `∫` est un S allongé : celui d'une **somme** d'une infinité de rectangles très fins.

Le miracle, découvert au XVIIᵉ siècle, c'est que les deux idées sont liées : pour calculer une aire, il suffit de connaître une primitive. C'est le **théorème fondamental** : `∫_a^b f(x) dx = F(b) − F(a)`. Au lieu d'additionner des millions de rectangles, on fait une soustraction.

Ensuite, l'intégrale s'étend aux fonctions de signe quelconque (une partie sous l'axe compte négativement), et devient un outil polyvalent : aire entre deux courbes, valeur moyenne d'une grandeur sur une période (le nombre moyen de malades par jour pendant une épidémie, par exemple), et une technique de calcul puissante, l'**intégration par parties**, qui transforme un produit difficile à intégrer en une intégrale plus simple.

## Notions (dans l'ordre d'apprentissage)
- Primitive : fonction dont la dérivée est la fonction donnée | `F` est une primitive de `f` sur `I` si `F′ = f` sur `I`
- Primitives d'une même fonction : elles diffèrent d'une constante | si `F` est une primitive de `f` sur un intervalle, les primitives sont les `F + C`, `C` réel
- Existence : toute fonction continue sur un intervalle a des primitives | même si on ne sait pas toujours les écrire, comme pour `e^{−x^2}`
- Primitives usuelles : le tableau des dérivées lu à l'envers | `x^n → x^{n+1}/(n + 1)` (n ≠ −1), `1/x → ln x` (x > 0), `1/√x → 2√x`, `e^x → e^x`, `sin x → −cos x`, `cos x → sin x`
- Primitives composées : reconnaître la dérivée d'une composée | `u′u^n → u^{n+1}/(n + 1)`, `u′/√u → 2√u`, `u′/u → ln u` (u > 0), `u′e^u → e^u`
- Linéarité des primitives : on traite chaque terme séparément | une primitive de `f + g` est `F + G` ; de `kf`, `kF`
- Intégrale d'une fonction positive : aire sous la courbe en unités d'aire | `∫_a^b f(x) dx` pour `f` continue positive sur `[a ; b]`
- Intégrale et primitive : théorème fondamental | `∫_a^b f(x) dx = F(b) − F(a) = [F(x)]_a^b`
- Fonction définie par une intégrale : l'aire depuis `a` jusqu'à `x` | `x ↦ ∫_a^x f(t) dt` est la primitive de `f` qui s'annule en `a`
- Signe : une partie sous l'axe compte négativement | si `f ≤ 0` sur `[a ; b]`, l'aire vaut `−∫_a^b f(x) dx`
- Relation de Chasles : on peut couper l'intervalle | `∫_a^c f + ∫_c^b f = ∫_a^b f`, et `∫_b^a f = −∫_a^b f`
- Positivité et comparaison : intégrer conserve les inégalités (bornes dans l'ordre) | si `a ≤ b` et `f ≤ g` sur `[a ; b]`, alors `∫_a^b f ≤ ∫_a^b g`
- Intégration par parties : transforme l'intégrale d'un produit | `∫_a^b u′v = [uv]_a^b − ∫_a^b uv′`, `u` et `v` dérivables à dérivées continues
- Aire entre deux courbes : intégrale de « haut moins bas » | si `f ≤ g` sur `[a ; b]`, aire `= ∫_a^b (g(x) − f(x)) dx`
- Valeur moyenne : hauteur du rectangle de même aire | `μ = (1/(b − a)) ∫_a^b f(x) dx`

## Méthodes
### Trouver une primitive
1. Découpe la fonction en termes (linéarité) et sors les constantes multiplicatives.
2. Pour chaque terme, cherche dans le tableau des primitives usuelles ou reconnais une forme composée (`u′u^n`, `u′/u`, `u′e^u`, `u′/√u`) ; ajuste le coefficient (par exemple `x^2e^{x^3} = (1/3) × 3x^2e^{x^3}`).
3. Vérifie toujours en dérivant ton résultat : tu dois retrouver exactement `f`.

### Trouver la primitive qui vérifie une condition
1. Écris une primitive quelconque `G`, puis `F = G + C`.
2. Traduis la condition (par exemple `F(1) = 0`) en une équation d'inconnue `C`.
3. Résous et écris `F`.

### Calculer une intégrale
1. Trouve une primitive `F` de `f` sur `[a ; b]`.
2. Calcule `F(b) − F(a)`, dans cet ordre, en mettant des parenthèses autour de `F(a)`.
3. Pour une fonction affine, tu peux aussi calculer des aires de triangles et de trapèzes, comptées négativement sous l'axe (Chasles).

### Intégrer par parties
1. Repère un produit : un facteur facile à dériver qui se simplifie (`x`, `ln x`) et un facteur facile à intégrer (`e^x`, `sin x`).
2. Pose `u` = le facteur qui se simplifie en dérivant, `v′` = celui qu'on sait intégrer ; calcule `u′` et `v`.
3. Applique `∫ uv′ = [uv] − ∫ u′v` et calcule l'intégrale qui reste.
4. Pour `∫ ln x dx`, écris `ln x = 1 × ln x` avec `v′ = 1`.

### Aire entre deux courbes et valeur moyenne
1. Détermine quelle courbe est au-dessus sur l'intervalle (étudie le signe de `g − f`).
2. Aire `= ∫_a^b (g − f)`, avec `g` au-dessus ; simplifie `g − f` avant d'intégrer.
3. Valeur moyenne : calcule l'intégrale puis divise par la longueur `b − a` de l'intervalle.

## Exemples résolus
### `F(x) = x e^x` est-elle une primitive de `f(x) = e^x(x + 1)` ?
- `F′(x) = 1 × e^x + x × e^x` — dérivée d'un produit
- `= e^x(x + 1) = f(x)` — on factorise
- Oui, `F` est une primitive de `f` — car `F′ = f`

### Une primitive de `f(x) = (2x − 5)(x^2 − 5x + 4)^2`
- `u(x) = x^2 − 5x + 4` et `u′(x) = 2x − 5` — on reconnaît `u′u^2`
- Une primitive de `u′u^2` est `u^3/3` — formule `u′u^n → u^{n+1}/(n + 1)`
- `F(x) = (1/3)(x^2 − 5x + 4)^3` — on vérifie en dérivant

### Calculer `∫_1^4 3/x^2 dx`
- Une primitive de `3/x^2 = 3x^{−2}` est `−3/x` — puissance `−2 → −1`
- `[−3/x]_1^4 = −3/4 − (−3) = 9/4` — `F(4) − F(1)`
- `I = 9/4` — la fonction est positive : c'est une aire

### `∫_2^5 (3 − x) dx` par des aires
- La droite coupe l'axe en `x = 3` : positive sur `[2 ; 3]`, négative sur `[3 ; 5]` — étude du signe
- Triangle au-dessus : `1 × 1/2 = 0,5` ; triangle en dessous : `2 × 2/2 = 2` — aires des triangles
- `∫_2^5 (3 − x) dx = 0,5 − 2 = −1,5` — la partie sous l'axe compte négativement (Chasles)

### Calculer `∫_0^{π/2} x sin x dx` par parties
- `u = x`, `u′ = 1` ; `v′ = sin x`, `v = −cos x` — on dérive `x` pour le faire disparaître
- `= [−x cos x]_0^{π/2} + ∫_0^{π/2} cos x dx` — formule d'intégration par parties
- `= 0 + [sin x]_0^{π/2} = 1` — l'intégrale restante est usuelle

### Aire entre `f(x) = x^2 + 1` et `g(x) = −x^2 + 2x + 5` sur `[−1 ; 2]`
- `g(x) − f(x) = −2x^2 + 2x + 4 ≥ 0` sur `[−1 ; 2]` — `g` est au-dessus
- Une primitive est `−(2/3)x^3 + x^2 + 4x` — linéarité
- Aire `= (−16/3 + 4 + 8) − (2/3 + 1 − 4) = 9` u.a. — `F(2) − F(−1)`

### Valeur moyenne de `f(x) = 3x^2 − 4x + 5` sur `[1 ; 10]`
- Une primitive est `x^3 − 2x^2 + 5x` — on intègre terme à terme
- `∫_1^{10} f = 850 − 4 = 846` — `F(10) − F(1)`
- `μ = 846/9 = 94` — on divise par `10 − 1 = 9`

## Pièges fréquents
- Dériver au lieu d'intégrer → pour `x^n`, on monte la puissance et on divise : `x^{n+1}/(n + 1)`.
- Oublier le coefficient d'une composée → une primitive de `e^{2x}` est `e^{2x}/2`, pas `e^{2x}` ; vérifie en dérivant.
- Calculer `F(a) − F(b)` → c'est toujours `F(b) − F(a)`, borne du haut moins borne du bas.
- Confondre intégrale et aire quand la fonction change de signe → l'aire additionne les morceaux en valeur absolue ; l'intégrale les compte avec leur signe.
- Une intégrale nulle ne veut pas dire fonction nulle → `∫_{−2}^2 x^3 dx = 0` par symétrie.
- Mal choisir `u` dans une intégration par parties → on dérive le facteur qui se simplifie (`x`, `ln x`), on intègre l'autre.
- Oublier de diviser par `b − a` pour une valeur moyenne → l'intégrale seule est une aire, pas une moyenne.
- Écrire `ln x` comme primitive de `1/x` sur un intervalle où `x < 0` → `ln x` n'est défini que pour `x > 0`.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu'est-ce qu'une primitive de `f` ? | Une fonction `F` telle que `F′ = f` |
| Une primitive de `x^n` (n ≠ −1) ? | `x^{n+1}/(n + 1)` |
| Une primitive de `1/x` sur `]0 ; +∞[` ? | `ln x` |
| Théorème fondamental ? | `∫_a^b f = F(b) − F(a)` |
| Intégration par parties ? | `∫ u′v = [uv] − ∫ uv′` |
| Valeur moyenne de `f` sur `[a ; b]` ? | `(1/(b − a)) ∫_a^b f` |

## Notes pour l'intégration
Les programmes Python (méthode des rectangles, suite d'intégrales) et les captures de calculatrice ne sont pas reproduits. Les figures (aires colorées) sont décrites en mots. Dans la partie 6, le document conjecture que la suite `I_n = ∫_1^e x(ln x)^n dx` tend vers `+∞`, puis signale lui-même que cette conjecture est fausse : on ne l'a pas reprise.

# Chapitre : Équations différentielles
Source : Ted.pdf (Y. Monka, « Équations différentielles », parties 1 à 5 : définition, `y′ = f`, `y′ = ay`, `y′ = ay + b`, `y′ = ay + f`)
Niveau visé : vérifier qu'une fonction est solution, résoudre `y′ = f`, `y′ = ay` et `y′ = ay + b` (avec une condition initiale), et résoudre `y′ = ay + f` quand une solution particulière est donnée.
Prérequis : dérivées, primitives, fonction exponentielle

## Explication pour un novice
D'habitude, une équation a pour inconnue un **nombre** : `2x + 3 = 7`. Une **équation différentielle** a pour inconnue une **fonction**, et elle relie cette fonction à sa dérivée. Par exemple `y′ = 0,05y` dit : « la vitesse à laquelle `y` grandit est proportionnelle à `y` lui-même ».

Pourquoi est-ce si important ? Parce que la nature parle souvent en vitesses. On ne sait pas directement combien il y aura de bactéries demain, mais on sait que plus il y en a, plus elles se multiplient vite. On ne connaît pas la température du café dans dix minutes, mais on sait qu'il refroidit d'autant plus vite qu'il est plus chaud que la pièce. Ces lois « locales » s'écrivent naturellement comme des équations différentielles, et les résoudre permet de prévoir l'avenir.

Le cas le plus simple est `y′ = f` : on connaît la dérivée, on cherche la fonction. Ce sont exactement les primitives ! Ensuite vient `y′ = ay`, l'équation de la croissance (ou de la décroissance) exponentielle : ses solutions sont les fonctions `Ce^{ax}`. Puis `y′ = ay + b`, qui modélise un refroidissement ou un remplissage avec fuite : ses solutions sont `Ce^{ax} − b/a`.

Il y a toujours une infinité de solutions, à cause de la constante `C`. C'est normal : connaître la loi d'évolution ne suffit pas, il faut aussi savoir d'où l'on part. Une **condition initiale**, comme `y(0) = 5`, fixe la constante et désigne une seule solution.

Enfin, une idée qui servira très loin : pour `y′ = ay + f`, toutes les solutions s'obtiennent en ajoutant **une** solution particulière aux solutions de `y′ = ay`. « Solution générale = solution de l'équation sans second membre + une solution particulière ».

## Notions (dans l'ordre d'apprentissage)
- Équation différentielle : équation dont l'inconnue est une fonction et qui fait intervenir ses dérivées | par exemple `y′ = 2x^2 − 3`, `y′ = ay`
- Solution : une fonction dérivable qui vérifie l'égalité pour tout `x` de l'intervalle | `f` est solution de `y′ = ay` si `f′(x) = af(x)` pour tout `x`
- Équation `y′ = f` : ses solutions sont les primitives de `f` | `y = F + C`, `F` primitive de `f`
- Équation `y′ = ay` : croissance ou décroissance exponentielle | solutions `x ↦ Ce^{ax}`, `C` réel quelconque
- Superposition : on peut additionner des solutions de `y′ = ay` et les multiplier par une constante | si `f` et `g` sont solutions de `y′ = ay`, alors `f + g` et `kf` aussi
- Solution particulière constante : la fonction qui ne bouge pas | pour `y′ = ay + b` (a ≠ 0), c'est `x ↦ −b/a`
- Équation `y′ = ay + b` : solutions de l'homogène plus la constante | `x ↦ Ce^{ax} − b/a`, `C` réel
- Équation `y′ = ay + f` : solutions de l'homogène plus une solution particulière | `x ↦ Ce^{ax} + g(x)`, où `g` est une solution particulière
- Condition initiale : valeur imposée en un point, qui fixe la constante | `y(x_0) = y_0` donne une unique solution

## Méthodes
### Vérifier qu'une fonction est solution
1. Calcule la dérivée de la fonction proposée.
2. Remplace `y` et `y′` dans l'équation.
3. Vérifie que l'égalité est vraie pour tout `x` (pas seulement pour une valeur).

### Résoudre `y′ = ay` ou `y′ = ay + b`
1. Mets l'équation sous la forme `y′ = ay + b` : isole `y′` et divise tout par son coefficient (`3y′ + 5y = 0` devient `y′ = −(5/3)y`).
2. Solutions de `y′ = ay` : `Ce^{ax}`.
3. Solution particulière constante : `−b/a`.
4. Solution générale : `y = Ce^{ax} − b/a`.

### Utiliser une condition initiale
1. Écris la solution générale avec sa constante `C`.
2. Remplace `x` par `x_0` et égale à `y_0` : tu obtiens une équation d'inconnue `C`.
3. Résous, puis écris la solution trouvée sans `C`.

### Résoudre `y′ = ay + f` avec une solution particulière donnée
1. Vérifie que la solution particulière `g` proposée convient (dérive, remplace).
2. Écris les solutions de l'équation homogène `y′ = ay` : `Ce^{ax}`.
3. Solution générale : `y = Ce^{ax} + g(x)`.

## Exemples résolus
### `f(x) = 3x^2 + ln x` est-elle solution de `y′ = 6x + 1/x` sur `]0 ; +∞[` ?
- `f′(x) = 6x + 1/x` — dérivées usuelles
- C'est exactement le second membre — l'égalité est vraie pour tout `x > 0`
- Oui, `f` est solution — c'est une primitive de `6x + 1/x`

### Résoudre `3y′ + 5y = 0` avec `y(1) = 2`
- `y′ = −(5/3)y` — on isole `y′`
- Solutions : `y = Ce^{−5x/3}` — forme `Ce^{ax}`
- `Ce^{−5/3} = 2`, donc `C = 2e^{5/3}` — condition initiale en `x = 1`
- `f(x) = 2e^{5/3}e^{−5x/3} = 2e^{5(1 − x)/3}` — on regroupe les exponentielles

### Résoudre `2y′ − y = 3` avec `y(0) = −1`
- `y′ = (1/2)y + 3/2` — on divise par 2
- Solution particulière constante : `−(3/2)/(1/2) = −3` — formule `−b/a`
- Solutions : `y = Ce^{x/2} − 3` ; `y(0) = C − 3 = −1` donne `C = 2` — condition initiale
- `f(x) = 2e^{x/2} − 3` — solution unique

### Résoudre `y′ − 2y = x^2`, sachant que `g(x) = −x^2/2 − x/2 − 1/4` est solution
- `g′(x) − 2g(x) = −x − 1/2 + x^2 + x + 1/2 = x^2` — `g` est bien une solution particulière
- Solutions de `y′ = 2y` : `Ce^{2x}` — équation homogène
- Solutions : `y = Ce^{2x} − x^2/2 − x/2 − 1/4` — homogène + particulière

## Pièges fréquents
- Oublier de diviser par le coefficient de `y′` → `3y′ + 5y = 0` donne `a = −5/3`, pas `−5` ni `−3/5`.
- Se tromper de signe en isolant `y′` → `y′ − y = 3` donne `y′ = y + 3`.
- Écrire la solution particulière `b/a` au lieu de `−b/a` → vérifie : la constante doit annuler `ay + b`.
- Remplacer `C` par `y(0)` sans réfléchir → avec `y = Ce^{ax} − b/a`, on a `y(0) = C − b/a`, pas `C`.
- Écrire `e^{ax} + C` au lieu de `Ce^{ax}` → la constante multiplie l'exponentielle.
- Multiplier toute la solution par `C` → seule la partie `e^{ax}` est multipliée : `Ce^{ax} + g(x)`.
- Vérifier une solution pour une seule valeur de `x` → l'égalité doit tenir pour tout `x` de l'intervalle.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Solutions de `y′ = ay` ? | `Ce^{ax}`, `C` réel |
| Solution constante de `y′ = ay + b` ? | `−b/a` |
| Solutions de `y′ = ay + b` ? | `Ce^{ax} − b/a` |
| Solutions de `y′ = f` ? | Les primitives de `f` |
| Rôle d'une condition initiale ? | Fixer la constante `C` |

## Notes pour l'intégration
Les courbes tracées à la calculatrice (famille de solutions) ne sont pas reproduites ; le champ de directions interactif les remplace. Dans la correction de la méthode `y′ = ay + b`, le document écrit « `C = 3 − 1` » pour résoudre `C − 3 = −1` : le résultat `C = 2` est juste, l'écriture plus naturelle est `C = −1 + 3`.
