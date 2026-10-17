# Plan du parcours

Document analysé : « MVA 005 cours 2014.pdf » — *Calcul différentiel et intégral, cours et exercices*, N. Assaad, Le Cnam-Liban, 2014 (242 pages PDF).

Convention de pagination utilisée dans tout ce fichier : « p. » = numéro imprimé dans le cours ; « PDF » = numéro de page du fichier (PDF = p. + 6). Le cours note l'unité imaginaire **j** (notation des physiciens) : c'est le **i** des mathématiciens (j² = −1). L'application peut afficher l'une ou l'autre.

Ordre pédagogique conseillé pour un novice complet, du débutant à l'expert. Les deux chapitres « Bases » sont ajoutés : le cours les suppose acquis.

| Étape | Chapitre | Source dans le cours | Prérequis | Palier |
|---|---|---|---|---|
| 1 | Bases 1 — Nombres, puissances et calcul algébrique | ajouté (appui : §2.1, p. 15-19) | aucun | Débutant |
| 2 | Bases 2 — Fonctions et trigonométrie de référence | ajouté (appui : §2.2, p. 19-34 ; annexe A, p. 214-220) | Bases 1 | Débutant |
| 3 | Fonctions usuelles, réciproques et hyperboliques | §2.2.2 e-g, §2.5 (p. 24-27, 48-53), annexe A.2.7-A.2.9 | Bases 2 | Débutant + |
| 4 | Limites et continuité | §2.3-2.4 (p. 34-48), exercices 2.6-2.27 | Fonctions usuelles | Intermédiaire |
| 5 | Dérivées | §3.1-3.3 (p. 61-74), exercices 3.1-3.9 | Limites | Intermédiaire |
| 6 | Étude de fonctions et optimisation | §3.4, §3.5.1 (p. 74-87), exercices 3.10-3.23 | Dérivées | Intermédiaire + |
| 7 | Développements limités | §3.5.2-3.5.4 (p. 87-103), exercices 3.24-3.45 | Dérivées, étude de fonctions (L'Hospital) | Avancé |
| 8 | Suites numériques | §6.1 (p. 192-200), exercices 6.1-6.2 | Limites, L'Hospital | Intermédiaire + |
| 9 | Primitives et intégrales | §4.1-4.3 (p. 113-138), exercices 4.1-4.8, 4.17-4.25 | Dérivées, fonctions usuelles | Avancé |
| 10 | Applications des intégrales | §4.4 (p. 138-149), exercices 4.9-4.16 | Primitives et intégrales | Avancé |
| 11 | Séries numériques et séries entières | §6.2-6.3 (p. 201-211), exercices 6.3-6.8 | Suites, intégrales (test intégral), DL (Taylor) | Avancé + |
| 12 | Nombres complexes | Chapitre 1 (p. 1-14), exercices 1.1-1.7 | Bases 2 (trigonométrie), exponentielle | Avancé |
| 13 | Équations différentielles du premier ordre | §5.1, §5.3.1-5.3.2 (p. 155-170, 181-184), exercices 5.1-5.9, 5.12-5.15, 5.17 | Primitives, exp et ln | Expert |
| 14 | Équations différentielles du second ordre | §5.2, §5.3.3 (p. 171-186), exercices 5.10-5.11, 5.16, 5.18-5.19 | ED du 1er ordre, nombres complexes, second degré | Expert |

Pourquoi cet ordre (différent de celui du cours) :
- Le cours commence par les nombres complexes ; pour un novice, ils sont plus faciles **après** la trigonométrie et l'exponentielle, et ils ne servent vraiment qu'aux équations différentielles du second ordre (racines complexes de l'équation caractéristique). On les place donc juste avant les équations différentielles.
- Les suites sont placées après les dérivées, car le cours utilise la règle de L'Hospital pour leurs limites (ln n / n, (1 + x/n)ⁿ).
- Les séries viennent après les intégrales (test de comparaison à une intégrale) et les développements limités (séries de Taylor).

Volume prévu par chapitre : 15 à 22 flashcards et 8 à 10 types d'exercices générables (détail en fin de fichier, section « Notes pour l'intégration »).

---

# Plan du cours (structure du document source)

- **Avant-propos** — p. v (PDF 6)
- **Chapitre 1 — Les nombres complexes** — p. 1-14 (PDF 7-20)
  - 1.1 Généralités (p. 1) · 1.2 Définition et propriétés (p. 3) : 1.2.1 Représentations cartésienne, polaire, exponentielle (p. 3) ; 1.2.2 Module et argument (p. 4) ; 1.2.3 Nombres complexes particuliers (p. 5)
  - 1.3 Opérations (p. 5) : 1.3.1 Égalité (p. 6) ; 1.3.2 Multiplication par un réel (p. 6) ; 1.3.3 Addition et soustraction (p. 6) ; 1.3.4 Multiplication et division (p. 7) ; 1.3.5 Rotation (p. 9) ; 1.3.6 Conjugué (p. 10)
  - 1.4 Formule de De Moivre (p. 11) · 1.5 Racines d'un nombre complexe (p. 11) · 1.6 Exercices 1.1-1.7 (p. 12-14)
- **Chapitre 2 — Fonctions d'une variable réelle** — p. 15-60 (PDF 21-66)
  - 2.1 Notion de variable (p. 15) : ensembles de nombres, valeur absolue (p. 17), constantes et variables, intervalles (p. 18)
  - 2.2 Fonction (p. 19) : représentations (p. 20) ; représentation analytique : polynômes, rationnelles, irrationnelles, trigonométriques, exponentielles, logarithmes, hyperboliques (p. 21-27) ; classification : paires/impaires, périodiques, convexes, monotones, bornées, extremums (p. 27-31) ; construction : opérations, composition, translation, fonctions par morceaux (p. 32-34)
  - 2.3 Notion de limite (p. 34) : voisinage (p. 35), tangente (p. 36), limite en un point, limites à gauche/à droite (p. 36-38), extensions et asymptotes (p. 38-41), limites usuelles (p. 42), formes indéterminées et techniques (p. 43-45)
  - 2.4 Continuité (p. 45) : en un point (p. 46), théorèmes (p. 46), prolongement par continuité (p. 47), continuité sur un segment, valeurs intermédiaires (p. 47-48)
  - 2.5 Fonction réciproque (p. 48) : arcsin, arccos, arctan (p. 49-51) ; argch, argsh, argth (p. 51-53)
  - 2.6 Exercices 2.1-2.31 (p. 53-60)
- **Chapitre 3 — Dérivée et différentielle** — p. 61-112 (PDF 67-118)
  - 3.1 Taux de variation (p. 61) : croissance de bactéries (p. 62), vitesse instantanée (p. 63), tangente (p. 64)
  - 3.2 Dérivée (p. 65) : fonction dérivable (p. 68), dérivées usuelles (p. 69), opérations (p. 70-72), réciproques (p. 73), dérivées d'ordre supérieur (p. 73)
  - 3.3 Différentielle (p. 73) : interprétation géométrique (p. 74), ordre supérieur (p. 74)
  - 3.4 Applications (p. 74) : tangente et normale (p. 75-77), analyse des fonctions : extremums, variations, concavité, inflexion (p. 77-82), optimisation (p. 82-83)
  - 3.5 Développement limité (p. 83) : Rolle, accroissements finis, Cauchy, L'Hospital (p. 84-87) ; formules de Taylor (p. 87-88) ; DL usuels et opérations (p. 89-95) ; utilisations : équivalents, limites, position tangente/asymptote (p. 95-103)
  - 3.6 Exercices 3.1-3.45 (p. 103-112)
- **Chapitre 4 — Calcul intégral** — p. 113-154 (PDF 119-160)
  - 4.1 Primitive, intégrale indéfinie, primitives usuelles (p. 113-116)
  - 4.2 Méthodes (p. 116) : changement de variable (p. 116), intégration par parties (p. 118), fractions rationnelles (p. 120-127), irrationnelles et substitutions trigonométriques (p. 127-128), fonctions trigonométriques (p. 129-132)
  - 4.3 Intégrales définies (p. 132) : sommes de Riemann, propriétés (p. 134), théorème de la moyenne (p. 135), Newton-Leibniz, changement de variable, IPP (p. 136-138)
  - 4.4 Applications (p. 138) : aires (p. 138), longueur d'arc (p. 140), volumes et surfaces de révolution (p. 142), centre de gravité (p. 145), moment d'inertie (p. 148)
  - 4.5 Exercices 4.1-4.25 (p. 149-154)
- **Chapitre 5 — Équations différentielles** — p. 155-191 (PDF 161-197)
  - 5.1 Premier ordre (p. 156) : définitions (p. 156), variables séparables (p. 158), homogènes (p. 159), se ramenant aux homogènes (p. 161), linéaires (p. 162), types spéciaux : Bernoulli, Riccati, Lagrange, Clairaut (p. 166-170)
  - 5.2 Second ordre (p. 171) : se ramenant au 1er ordre (p. 171), linéaires à coefficients variables (p. 172), linéaires à coefficients constants (p. 176-181)
  - 5.3 Applications (p. 181) : température (p. 181), circuit RL (p. 183), oscillateurs et RLC (p. 185)
  - 5.4 Exercices 5.1-5.19 (p. 187-191)
- **Chapitre 6 — Suites et séries numériques** — p. 192-213 (PDF 198-219)
  - 6.1 Suites (p. 192) : limite (p. 193), récurrence (p. 197), suites bornées (p. 198), monotones (p. 198), limites usuelles (p. 199)
  - 6.2 Séries (p. 201) : géométrique (p. 202), théorèmes généraux (p. 203), tests de convergence (p. 204), séries alternées (p. 207)
  - 6.3 Fonctions en série (p. 207) : séries entières (p. 208), série de Taylor et de Mac Laurin (p. 209-211)
  - 6.4 Exercices 6.1-6.8 (p. 211-213)
- **Annexe A — Fonctions trigonométriques** (p. 214-220) · **Annexe B — Dérivées** (p. 221-223) · **Annexe C — Table des intégrales** (p. 224-229) · **Annexe D — Longueurs, surfaces, volumes** (p. 230-235)

---

# Chapitre : Bases 1 — Nombres, puissances et calcul algébrique
Source : chapitre ajouté (prérequis implicites). Appuis dans le cours : §2.1.1-2.1.4 (p. 15-19, PDF 21-25), exercice 2.1 (p. 53).
Niveau visé : tu sais calculer avec des fractions et des puissances, utiliser la valeur absolue, lire un intervalle et résoudre une équation du 1er et du 2e degré.
Prérequis : les quatre opérations sur les nombres entiers.

## Explication pour un novice
Les nombres se rangent sur une règle infinie (la droite des réels) : zéro au milieu, les positifs à droite, les négatifs à gauche. Il y a des familles de nombres : les entiers (0, 1, 2…), les entiers avec signe (−3, 5…), les fractions (3/4) et tous les autres, comme √2 ou π, qu'on ne peut pas écrire en fraction (les irrationnels). Ensemble, ils forment les réels, notés ℝ.

Une puissance, c'est une multiplication répétée : 2³ = 2 × 2 × 2 = 8. Imagine une feuille que tu plies en deux : à chaque pliage, l'épaisseur double ; après 3 pliages, elle est 2³ = 8 fois plus épaisse. D'où les règles : multiplier 2³ par 2⁴, c'est faire 3 + 4 = 7 pliages, donc 2⁷.

La valeur absolue d'un nombre, notée |x|, c'est sa distance à zéro, sans tenir compte du côté. Le cours prend l'image d'un point à 2 m sous le sol et d'un autre à 2 m au-dessus : les deux sont à 2 m du sol, |−2| = |2| = 2.

Un intervalle, c'est un morceau de la droite. [a ; b] contient a et b (crochets tournés vers les nombres), ]a ; b[ les exclut. Dire « |x − a| ≤ r », c'est dire « x est à une distance au plus r de a », donc x ∈ [a − r ; a + r].

Enfin, résoudre une équation, c'est trouver le nombre caché. Pour ax² + bx + c = 0 (second degré), on calcule le discriminant Δ = b² − 4ac : s'il est positif il y a deux solutions, nul une seule, négatif aucune solution réelle.

## Notions (dans l'ordre d'apprentissage)
- Nombre réel : n'importe quel point de la droite graduée | ℝ = ensemble des rationnels et des irrationnels (déf. 2.3, p. 16).
- Nombre rationnel : un nombre qui s'écrit comme une fraction | x = a/b avec a ∈ ℤ, b ∈ ℤ* (déf. 2.1).
- Nombre irrationnel : un nombre dont les décimales ne se répètent jamais | développement décimal illimité non périodique (ex. √2, π).
- Puissance : multiplication répétée d'un nombre par lui-même | aⁿ = a × a × … × a (n facteurs), a⁰ = 1, a⁻ⁿ = 1/aⁿ.
- Racine carrée : le nombre positif dont le carré donne x | √x ≥ 0 et (√x)² = x pour x ≥ 0.
- Valeur absolue : la distance à zéro | |x| = x si x ≥ 0, |x| = −x si x < 0 (déf. 2.4).
- Intervalle : un morceau continu de la droite | [a ; b] = {x : a ≤ x ≤ b}, ]a ; b[ = {x : a < x < b}.
- Équation du 1er degré : une égalité avec un x à la puissance 1 | ax + b = c, solution x = (c − b)/a si a ≠ 0.
- Identités remarquables : raccourcis de développement | (a + b)² = a² + 2ab + b², (a − b)² = a² − 2ab + b², (a + b)(a − b) = a² − b².
- Discriminant : le nombre qui dit combien de solutions a une équation du second degré | Δ = b² − 4ac ; si Δ > 0, x = (−b ± √Δ)/(2a).

## Méthodes
### Calculer avec des puissances
1. Repère la base commune (le nombre qu'on multiplie).
2. Produit : on additionne les exposants (aᵐ × aⁿ = aᵐ⁺ⁿ).
3. Quotient : on soustrait (aᵐ / aⁿ = aᵐ⁻ⁿ).
4. Puissance de puissance : on multiplie ((aᵐ)ⁿ = aᵐⁿ).

### Résoudre ax + b = c
1. Enlève b des deux côtés : ax = c − b.
2. Divise par a (a ≠ 0) : x = (c − b)/a.
3. Vérifie en remplaçant x dans l'équation.

### Résoudre ax² + bx + c = 0
1. Calcule Δ = b² − 4ac.
2. Si Δ > 0 : deux solutions x = (−b − √Δ)/(2a) et x = (−b + √Δ)/(2a).
3. Si Δ = 0 : une solution x = −b/(2a). Si Δ < 0 : aucune solution réelle.
4. Raccourci : si les solutions sont r₁ et r₂, alors r₁ + r₂ = −b/a et r₁ × r₂ = c/a.

### Traduire une inégalité avec valeur absolue
1. |x − a| ≤ r signifie « x est à distance ≤ r de a ».
2. Donc a − r ≤ x ≤ a + r, c'est-à-dire x ∈ [a − r ; a + r].
3. Avec une inégalité stricte (<), les crochets sont ouverts.

## Exemples résolus
### Calculer 2³ × 2⁴
- 2³ × 2⁴ = 2³⁺⁴ — on additionne les exposants car on compte les facteurs 2.
- = 2⁷ = 128 — on multiplie 2 sept fois.

### Résoudre |x − 1| ≤ 4 (exercice 2.1.3)
- La distance entre x et 1 est au plus 4 — lecture de la valeur absolue.
- 1 − 4 ≤ x ≤ 1 + 4 — on part de 1 et on recule ou avance de 4.
- x ∈ [−3 ; 5] — crochets fermés car l'inégalité est large.

### Résoudre x² − 5x + 6 = 0
- Δ = (−5)² − 4 × 1 × 6 = 25 − 24 = 1 — calcul du discriminant.
- Δ > 0, donc deux solutions : x = (5 − 1)/2 = 2 et x = (5 + 1)/2 = 3.
- Contrôle : 2 + 3 = 5 = −b/a et 2 × 3 = 6 = c/a.

## Pièges fréquents
- Écrire (a + b)² = a² + b² → n'oublie jamais le double produit 2ab.
- Confondre −3² et (−3)² → −3² = −9 (le carré passe avant le signe), (−3)² = 9.
- Écrire aᵐ × aⁿ = aᵐⁿ → au produit on additionne les exposants, on ne les multiplie pas.
- Additionner des fractions « numérateur + numérateur, dénominateur + dénominateur » → mets d'abord au même dénominateur.
- Diviser une inégalité par un nombre négatif sans changer le sens → le sens s'inverse : −2x < 6 donne x > −3.
- Croire que |a + b| = |a| + |b| → on a seulement |a + b| ≤ |a| + |b| (théorème 2.1, p. 18).

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Que vaut aᵐ × aⁿ ? | aᵐ⁺ⁿ : on additionne les exposants. |
| Que vaut (aᵐ)ⁿ ? | aᵐⁿ : on multiplie les exposants. |
| Que vaut aᵐ / aⁿ ? | aᵐ⁻ⁿ (avec a ≠ 0). |
| Que vaut a⁰ pour a ≠ 0 ? | 1. |
| Que vaut a⁻ⁿ ? | 1/aⁿ. |
| Développe (a + b)². | a² + 2ab + b². |
| Développe (a − b)². | a² − 2ab + b². |
| Développe (a + b)(a − b). | a² − b². |
| Qu'est-ce qu'un nombre rationnel ? | Un nombre qui s'écrit a/b avec a, b entiers et b ≠ 0. |
| Donne deux nombres irrationnels. | √2 et π (décimales infinies non périodiques). |
| Définis \|x\| en mots. | La distance entre x et 0 sur la droite. |
| \|x\| si x < 0 ? | −x (donc un nombre positif). |
| \|x − a\| ≤ r équivaut à ? | x ∈ [a − r ; a + r]. |
| Différence entre [a ; b] et ]a ; b[ ? | [a ; b] contient a et b ; ]a ; b[ les exclut. |
| Solution de ax + b = c ? | x = (c − b)/a, si a ≠ 0. |
| Formule du discriminant ? | Δ = b² − 4ac. |
| Si Δ < 0, combien de solutions réelles ? | Aucune. |
| Solutions si Δ > 0 ? | x = (−b ± √Δ)/(2a). |
| Somme et produit des racines de ax² + bx + c ? | Somme −b/a, produit c/a. |
| Que devient −2x < 6 ? | x > −3 : diviser par un négatif inverse le sens. |

## Exercices générables
### b1-puiss-produit — Produit de puissances
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Écris {a}^{m} × {a}^{n} sous la forme {a}^k. Que vaut k ?
- Paramètres : a ∈ {2, 3, 5, 10} ; m, n entiers de 1 à 9.
- Réponse : k = m + n
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : m × n → « exposants multipliés » ; a^(m+n) (valeur calculée) → « confusion exposant / résultat ».
- Explication de la solution : {a}^{m} × {a}^{n}, c'est {m} facteurs {a} suivis de {n} facteurs {a}, soit {m}+{n} facteurs : k = m + n.
- Inspiré de : propriétés des puissances, §2.2.2 e) p. 24 (aˣ aʸ = aˣ⁺ʸ).

### b1-puiss-puissance — Puissance d'une puissance
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Écris ({a}^{m})^{n} sous la forme {a}^k. Que vaut k ?
- Paramètres : a ∈ {2, 3, 10} ; m, n entiers de 2 à 6.
- Réponse : k = m × n
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : m + n → « confusion avec le produit de puissances ».
- Explication de la solution : on répète {n} fois le bloc {a}^{m}, soit {n} × {m} facteurs {a}.
- Inspiré de : §2.2.2 e) p. 24 ((aˣ)ʸ = aˣʸ).

### b1-fraction — Somme de deux fractions
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule {a}/{b} + {c}/{d} (réponse décimale arrondie à 0,01).
- Paramètres : a, c entiers de 1 à 9 ; b, d ∈ {2, 3, 4, 5, 6}.
- Réponse : (a × d + c × b)/(b × d)
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : (a + c)/(b + d) → « addition des numérateurs et des dénominateurs ».
- Explication de la solution : on met au même dénominateur {b}×{d} : ({a}×{d} + {c}×{b})/({b}×{d}).
- Inspiré de : nombres rationnels, §2.1.1 p. 15.

### b1-valabs — Distance entre deux nombres
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule |{a} − {b}|.
- Paramètres : a, b entiers de −20 à 20, a ≠ b.
- Réponse : |a − b|
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a − b (négatif) → « oubli de la valeur absolue » ; |a| − |b| → « valeur absolue appliquée terme à terme ».
- Explication de la solution : on calcule {a} − {b} puis on prend sa distance à 0 (on enlève le signe moins éventuel).
- Inspiré de : définition 2.4 et exemple 2.4, p. 17.

### b1-eq1 — Équation du premier degré
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Résous {a}x + {b} = {c}.
- Paramètres : x₀ entier de −10 à 10 ; a ∈ {−9…−2} ∪ {2…9} ; b entier de −20 à 20 ; c = a·x₀ + b.
- Réponse : x = (c − b)/a (= x₀)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : (c + b)/a → « erreur de signe en passant b » ; c/a − b → « division avant soustraction ».
- Explication de la solution : {a}x = {c} − {b} donc x = ({c} − {b})/{a}.
- Inspiré de : prérequis de tout le cours (résolution des systèmes, §1.3.4 p. 8).

### b1-identite — Double produit
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Développe (x + {a})². Quel est le coefficient de x ?
- Paramètres : a entier de −9 à 9, a ≠ 0.
- Réponse : 2a
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a → « double produit oublié à moitié » ; 0 → « (x + a)² = x² + a² ».
- Explication de la solution : (x + {a})² = x² + 2×{a}×x + {a}², donc le coefficient de x est 2×{a}.
- Inspiré de : calculs de développements, exemple 3.3 p. 67.

### b1-intervalle — Valeur absolue et intervalle
- Niveau : 2
- Forme : `qcm`
- Énoncé gabarit : L'inégalité |x − {a}| ≤ {r} équivaut à :
- Paramètres : a entier de −10 à 10 ; r entier de 1 à 9.
- Réponse : x ∈ [a − r ; a + r]
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : [−r ; r] → « centre oublié » ; ]a − r ; a + r[ → « crochets ouverts pour une inégalité large » ; [a ; a + r] → « un seul côté ».
- Explication de la solution : x est à distance au plus {r} de {a}, donc entre {a} − {r} et {a} + {r}, bornes comprises.
- Inspiré de : exercice 2.1.3 (p. 53).

### b1-discriminant — Calcul du discriminant
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule le discriminant de {a}x² + {b}x + {c}.
- Paramètres : a entier de 1 à 5 ; b, c entiers de −10 à 10.
- Réponse : b² − 4ac
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : b² + 4ac → « erreur de signe » ; b − 4ac → « b non élevé au carré ».
- Explication de la solution : Δ = {b}² − 4 × {a} × {c}.
- Inspiré de : équation caractéristique, §5.2.3 p. 176.

### b1-racines — Plus grande solution d'une équation du second degré
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Résous x² − {S}x + {P} = 0. Donne la plus grande solution.
- Paramètres : r₁ < r₂ entiers de −8 à 8 ; S = r₁ + r₂ ; P = r₁ × r₂.
- Réponse : r₂ = (S + √(S² − 4P))/2
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : r₁ → « mauvaise racine » ; −r₂ → « erreur de signe sur −b ».
- Explication de la solution : Δ = {S}² − 4×{P} ; x = ({S} ± √Δ)/2 ; la plus grande prend le signe +.
- Inspiré de : exercice 1.2 (p. 13) et équations caractéristiques (exemple 5.23, p. 176).

---

# Chapitre : Bases 2 — Fonctions et trigonométrie de référence
Source : chapitre ajouté. Appuis : §2.2 (p. 19-34, PDF 25-40), annexe A (p. 214-220, PDF 220-226), exercices 2.3, 2.15, 2.28.
Niveau visé : tu sais ce qu'est une fonction, calculer une image, trouver un domaine de définition, reconnaître une fonction paire/impaire/périodique, et utiliser le cercle trigonométrique.
Prérequis : Bases 1.

## Explication pour un novice
Une fonction, c'est une machine (ou une recette) : tu mets un nombre x à l'entrée, elle te rend un seul nombre f(x) à la sortie. Par exemple, la machine « f(x) = x² » rend 9 quand on lui donne 3. Le cours cite des exemples concrets : la température de l'eau dépend du temps de chauffe, l'aire d'un disque dépend de son rayon.

Certaines machines refusent certains ingrédients : on ne peut pas diviser par zéro, ni prendre la racine carrée d'un nombre négatif. L'ensemble des x acceptés s'appelle le domaine de définition. On dessine une fonction par sa courbe : l'ensemble des points (x ; f(x)).

Quelques familles reviennent tout le temps : les fonctions affines (ax + b, une droite), les polynômes (x³ + 2x + 2), les fonctions rationnelles (un polynôme divisé par un autre). On classe aussi les fonctions selon leur forme : une fonction paire est symétrique comme un papillon par rapport à l'axe vertical (f(−x) = f(x)) ; une fonction impaire est symétrique par rapport au centre (f(−x) = −f(x)).

La trigonométrie, c'est l'étude d'une roue de rayon 1 (le cercle trigonométrique). Quand tu tournes d'un angle θ, le point atteint a pour abscisse cos θ et pour ordonnée sin θ. Les angles se mesurent en radians : un tour complet vaut 2π, donc 180° = π. Comme la roue revient à sa place après un tour, sin et cos sont périodiques de période 2π.

Enfin, on peut enchaîner deux machines : f(g(x)) signifie « d'abord g, puis f » (la composée).

## Notions (dans l'ordre d'apprentissage)
- Fonction : une règle qui associe à chaque x un seul nombre | x ∈ D ↦ y = f(x) ∈ F (déf. 2.6, p. 19).
- Image : le résultat que rend la fonction | f(x₀) est l'image de x₀.
- Domaine de définition : les x pour lesquels f(x) existe | D = {x : f(x) fini et bien déterminé} (déf. 2.7).
- Courbe représentative : le dessin de la fonction | ensemble des points M(x ; f(x)).
- Fonction polynôme : sommes de puissances entières de x | aₙxⁿ + … + a₁x + a₀, définie sur ℝ.
- Fonction rationnelle : quotient de deux polynômes | P(x)/Q(x), définie si Q(x) ≠ 0.
- Fonction paire : symétrique par rapport à l'axe vertical | f(−x) = f(x) pour tout x de D (déf. 2.15).
- Fonction impaire : symétrique par rapport à l'origine | f(−x) = −f(x) (déf. 2.16).
- Fonction périodique : qui se répète | f(x + T) = f(x) ; sin(ωx) a pour période 2π/ω, tan(ωx) a pour période π/ω.
- Fonction croissante : plus x augmente, plus f(x) augmente | x₂ > x₁ ⇒ f(x₂) ≥ f(x₁) (déf. 2.20).
- Radian : unité d'angle « longueur d'arc sur un cercle de rayon 1 » | 180° = π rad, 1° = π/180 rad.
- Sinus, cosinus, tangente : coordonnées du point sur la roue | cos θ = x/r, sin θ = y/r, tan θ = sin θ / cos θ.
- Relation fondamentale : le point est sur un cercle de rayon 1 | sin² θ + cos² θ = 1.
- Composée : enchaîner deux fonctions | (f ∘ g)(x) = f(g(x)) (déf. 2.28).
- Translation : déplacer une courbe | f(x) + k monte de k ; f(x + h) décale horizontalement de −h.

## Méthodes
### Trouver le domaine de définition
1. Repère les dénominateurs : ils doivent être ≠ 0.
2. Repère les racines carrées : ce qui est dessous doit être ≥ 0.
3. Repère les logarithmes : ce qui est dedans doit être > 0.
4. Combine toutes les conditions.

### Tester la parité
1. Vérifie que le domaine est symétrique (si x y est, −x y est aussi).
2. Calcule f(−x) et simplifie.
3. Si f(−x) = f(x) : paire ; si f(−x) = −f(x) : impaire ; sinon ni l'un ni l'autre.

### Convertir degrés ↔ radians
1. Radians = degrés × π/180.
2. Degrés = radians × 180/π.

### Lire sin et cos d'un angle remarquable
1. Place l'angle sur le cercle.
2. Utilise le tableau : sin 0 = 0, sin(π/6) = 1/2, sin(π/4) = √2/2, sin(π/3) = √3/2, sin(π/2) = 1 ; pour cos, l'ordre est inversé.

## Exemples résolus
### Domaine de f(x) = (2x⁴ − x² + 1)/(x² − 4) (exemple 2.9)
- Dénominateur x² − 4 = 0 pour x = 2 ou x = −2 — on cherche les valeurs interdites.
- D = ℝ \ {−2 ; 2} = ]−∞ ; −2[ ∪ ]−2 ; 2[ ∪ ]2 ; +∞[.

### Domaine de f(x) = √(1 − x²) (exemple 2.6)
- Il faut 1 − x² ≥ 0, donc x² ≤ 1 — sous la racine, positif ou nul.
- D = [−1 ; 1].

### Parité de f(x) = x³
- f(−x) = (−x)³ = −x³ = −f(x) — un cube garde le signe.
- f est impaire : sa courbe est symétrique par rapport à l'origine.

### Composées avec f(x) = √x et g(x) = 1 − x² (exemple 2.15)
- f(g(x)) = √(1 − x²) — on met g(x) dans f.
- g(f(x)) = 1 − (√x)² = 1 − x (pour x ≥ 0) — l'ordre change le résultat.

## Pièges fréquents
- Croire que f(g(x)) = g(f(x)) → l'ordre compte ; calcule toujours la fonction intérieure d'abord.
- Oublier que √ exige un nombre ≥ 0 et que le dénominateur doit être ≠ 0 → vérifie systématiquement les deux.
- Calculatrice en degrés au lieu de radians → en analyse, les angles sont toujours en radians.
- Penser que « non paire » veut dire « impaire » → beaucoup de fonctions ne sont ni paires ni impaires (ex. x + 1).
- Confondre f(x + h) avec un décalage vers la droite → f(x + h) décale la courbe vers la gauche (si h > 0).

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu'est-ce qu'une fonction ? | Une règle qui associe à chaque x autorisé un seul nombre f(x). |
| Qu'est-ce que le domaine de définition ? | L'ensemble des x pour lesquels f(x) existe. |
| Condition pour un dénominateur ? | Il doit être différent de 0. |
| Condition sous une racine carrée ? | L'expression doit être ≥ 0. |
| Définition d'une fonction paire ? | f(−x) = f(x) ; courbe symétrique par rapport à l'axe vertical. |
| Définition d'une fonction impaire ? | f(−x) = −f(x) ; courbe symétrique par rapport à l'origine. |
| x², cos x : paires ou impaires ? | Paires. |
| x³, sin x, tan x : paires ou impaires ? | Impaires. |
| Combien vaut 180° en radians ? | π radians. |
| Période de sin x et cos x ? | 2π. |
| Période de sin(ωx) ? | 2π/ω. |
| Période de tan x ? | π. |
| sin(π/6) ? | 1/2. |
| cos(π/3) ? | 1/2. |
| sin(π/4) et cos(π/4) ? | Tous deux √2/2. |
| sin(π/3) ? | √3/2. |
| Relation fondamentale de trigonométrie ? | sin² x + cos² x = 1. |
| Que signifie f(g(x)) ? | On applique d'abord g, puis f au résultat. |
| Effet de f(x) + k sur la courbe ? | Translation verticale de k. |
| Domaine d'une fonction polynôme ? | Tout ℝ. |

## Exercices générables
### b2-image — Calculer une image
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = {a}x² + {b}x + {c}. Calcule f({x0}).
- Paramètres : a, b, c entiers de −5 à 5 (a ≠ 0) ; x0 entier de −4 à 4.
- Réponse : a·x0² + b·x0 + c
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : −a·x0² + b·x0 + c (quand x0 < 0) → « (−x)² calculé comme −x² ».
- Explication de la solution : on remplace x par {x0} : {a}×({x0})² + {b}×({x0}) + {c}.
- Inspiré de : exemple 2.7 (p. 21) et table de valeurs §3.1.1 (p. 62).

### b2-valeur-interdite — Valeur interdite
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Pour quelle valeur de x la fonction f(x) = {p}/(x − {a}) n'est-elle pas définie ?
- Paramètres : p entier de 1 à 9 ; a entier de −9 à 9.
- Réponse : a
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : −a → « erreur de signe » ; 0 → « confusion avec 1/x ».
- Explication de la solution : le dénominateur x − {a} s'annule pour x = {a}.
- Inspiré de : exemple 2.6 (p. 20), exercice 2.3.

### b2-domaine-racine — Domaine d'une racine
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : Quel est le domaine de définition de f(x) = √(x − {a}) ?
- Paramètres : a entier de −9 à 9.
- Réponse : [a ; +∞[
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : ]a ; +∞[ → « 0 exclu à tort » ; ]−∞ ; a] → « sens de l'inégalité inversé » ; ℝ → « condition oubliée ».
- Explication de la solution : il faut x − {a} ≥ 0, donc x ≥ {a}.
- Inspiré de : exemple 2.10 (p. 23).

### b2-deg-rad — Conversion en radians
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Convertis {d}° en radians. Donne k tel que l'angle vaut k·π.
- Paramètres : d ∈ {30, 45, 60, 90, 120, 135, 150, 180, 270, 360}.
- Réponse : k = d/180
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 180/d → « rapport inversé » ; d/360 → « confusion π / 2π ».
- Explication de la solution : 180° = π rad, donc {d}° = ({d}/180)·π.
- Inspiré de : annexe A, définition A.1 (p. 214).

### b2-trigo-valeur — Valeur remarquable
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : Que vaut {fonction}({angle}) ?
- Paramètres : fonction ∈ {sin, cos} ; angle ∈ {0, π/6, π/4, π/3, π/2}.
- Réponse : valeur du tableau A.1.2 (sin : 0, 1/2, √2/2, √3/2, 1 ; cos : 1, √3/2, √2/2, 1/2, 0).
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : la valeur de l'autre fonction (sin ↔ cos) → « confusion sin/cos » ; les autres valeurs du tableau.
- Explication de la solution : on lit le tableau des angles remarquables ; sin monte de 0 à 1 et cos descend de 1 à 0 entre 0 et π/2.
- Inspiré de : annexe A.1.2 (p. 215).

### b2-parite — Parité d'un monôme
- Niveau : 2
- Forme : `qcm`
- Énoncé gabarit : La fonction f(x) = {a}x^{n} + {b}x^{m} est-elle paire, impaire, ou ni l'un ni l'autre ?
- Paramètres : a, b entiers non nuls de −5 à 5 ; n, m entiers de 1 à 6, n ≠ m.
- Réponse : paire si n et m pairs ; impaire si n et m impairs ; sinon ni l'un ni l'autre.
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : les deux autres options ; « paire » quand un seul exposant est pair → « regarder un seul terme ».
- Explication de la solution : (−x)^k = x^k si k pair, −x^k si k impair ; on compare f(−x) à f(x).
- Inspiré de : exercice 2.3 (p. 54), définitions 2.15-2.16.

### b2-periode — Période d'une fonction sinus
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Quelle est la période T de f(x) = sin({w}x) ? Donne k tel que T = k·π.
- Paramètres : w ∈ {1, 2, 3, 4, 6}.
- Réponse : k = 2/w
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 2w → « multiplier au lieu de diviser » ; 1/w → « confusion avec la période de tan ».
- Explication de la solution : sin(ωx) a pour période 2π/ω = 2π/{w}.
- Inspiré de : définition 2.17 et exemples p. 28.

### b2-composee — Calcul d'une composée
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = {a}x + {b} et g(x) = x². Calcule f(g({x0})).
- Paramètres : a, b entiers de −5 à 5 (a ≠ 0) ; x0 entier de −4 à 4.
- Réponse : a·x0² + b
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : (a·x0 + b)² → « g(f(x)) calculé à la place de f(g(x)) ».
- Explication de la solution : g({x0}) = {x0}², puis f({x0}²) = {a}×{x0}² + {b}.
- Inspiré de : exemple 2.15 (p. 33), exercice 2.28 (p. 59).

---

# Chapitre : Fonctions usuelles, réciproques et hyperboliques
Source : §2.2.2 e)-g) (p. 24-27, PDF 30-33), §2.5 (p. 48-53, PDF 54-59), annexe A.2.7-A.2.9 (p. 219-220) ; exercices 2.29, 2.30.
Niveau visé : tu manipules exp, ln, logarithmes en base a, tu trouves une fonction réciproque, tu connais arcsin, arccos, arctan et les fonctions hyperboliques ch, sh, th.
Prérequis : Bases 1, Bases 2.

## Explication pour un novice
L'exponentielle décrit ce qui grandit « proportionnellement à sa taille », comme une population de bactéries ou un capital placé à intérêts composés. Pour une base a > 0, la fonction x ↦ aˣ transforme les additions en multiplications : aˣ × aʸ = aˣ⁺ʸ. La base la plus utile est e ≈ 2,718 ; on écrit eˣ ou exp(x). Elle est toujours strictement positive.

Le logarithme népérien ln est le « bouton retour » de l'exponentielle : ln(y) répond à la question « à quelle puissance faut-il élever e pour obtenir y ? ». Donc ln(eˣ) = x et e^(ln y) = y (pour y > 0). Il transforme les produits en sommes : ln(ab) = ln a + ln b. Le logarithme en base a se calcule par logₐ(x) = ln x / ln a.

Une fonction réciproque défait ce que fait une fonction, comme une clé qui ferme puis ouvre la même serrure. Pour qu'elle existe, il faut que la fonction ne prenne jamais deux fois la même valeur (par exemple qu'elle soit strictement croissante). Les courbes de f et de sa réciproque f⁻¹ sont symétriques par rapport à la droite y = x.

Sinus prend une infinité de fois chaque valeur ; on le « coupe » donc sur [−π/2 ; π/2] pour pouvoir l'inverser : arcsin(x) est l'unique angle de cet intervalle dont le sinus vaut x. De même arccos renvoie un angle de [0 ; π] et arctan un angle de ]−π/2 ; π/2[.

Les fonctions hyperboliques mélangent eˣ et e⁻ˣ : ch x = (eˣ + e⁻ˣ)/2 (la forme d'un câble suspendu, la chaînette) et sh x = (eˣ − e⁻ˣ)/2. Elles vérifient ch² x − sh² x = 1, un cousin de cos² + sin² = 1. Le cours les note cosh, sinh, tanh.

## Notions (dans l'ordre d'apprentissage)
- Exponentielle de base a : une puissance dont l'exposant varie | x ↦ aˣ, a > 0 ; croissante si a > 1, décroissante si 0 < a < 1 (déf. 2.10).
- Règles exponentielles : les puissances s'additionnent | aˣaʸ = aˣ⁺ʸ, aˣ/aʸ = aˣ⁻ʸ, (aˣ)ʸ = aˣʸ, a⁻ˣ = 1/aˣ.
- Nombre e et exp : la base « naturelle » | e ≈ 2,718 ; eˣ > 0 pour tout x.
- Logarithme népérien : la réciproque de exp | y = ln x ⇔ x = eʸ, défini pour x > 0 (déf. 2.11).
- Règles du logarithme : les produits deviennent des sommes | ln(xy) = ln x + ln y, ln(xⁿ) = n ln x, ln(x/y) = ln x − ln y, ln 1 = 0, ln e = 1.
- Logarithme de base a : l'exposant en base a | logₐ x = ln x / ln a ; aˣ = e^(x ln a).
- Fonction réciproque : la fonction qui défait f | y = f(x) ⇔ x = f⁻¹(y) ; f ∘ f⁻¹ = identité (éq. 2.20-2.21).
- Arcsinus : l'angle dont le sinus est x | y = arcsin x ⇔ x = sin y, x ∈ [−1 ; 1], y ∈ [−π/2 ; π/2].
- Arccosinus : l'angle dont le cosinus est x | y = arccos x ⇔ x = cos y, y ∈ [0 ; π].
- Arctangente : l'angle dont la tangente est x | y = arctan x ⇔ x = tan y, y ∈ ]−π/2 ; π/2[.
- Cosinus hyperbolique : partie paire de l'exponentielle | ch x = (eˣ + e⁻ˣ)/2, ch 0 = 1.
- Sinus hyperbolique : partie impaire de l'exponentielle | sh x = (eˣ − e⁻ˣ)/2, sh 0 = 0.
- Tangente hyperbolique : quotient sh/ch | th x = sh x / ch x, à valeurs dans ]−1 ; 1[.
- Identité hyperbolique : cousin de cos² + sin² = 1 | ch² x − sh² x = 1.
- Réciproques hyperboliques : formules avec ln | argsh x = ln(x + √(x² + 1)), argch x = ln(x + √(x² − 1)) (x ≥ 1), argth x = ½ ln((1 + x)/(1 − x)).

## Méthodes
### Résoudre e^(ax) = c (c > 0)
1. Applique ln aux deux membres : ax = ln c.
2. Divise par a : x = ln(c)/a.

### Trouver la réciproque d'une fonction monotone
1. Écris y = f(x).
2. Isole x en fonction de y.
3. La réciproque est f⁻¹(y) = (expression trouvée).
4. Contrôle : f(f⁻¹(y)) = y.

### Évaluer arcsin, arccos, arctan
1. Cherche un angle remarquable dont le sinus (cosinus, tangente) vaut la valeur donnée.
2. Vérifie qu'il est dans le bon intervalle : [−π/2 ; π/2] pour arcsin et arctan, [0 ; π] pour arccos.

### Calculer ch, sh d'un logarithme
1. Remplace : e^(ln a) = a et e^(−ln a) = 1/a.
2. ch(ln a) = (a + 1/a)/2, sh(ln a) = (a − 1/a)/2.

## Exemples résolus
### Résoudre e^(2x) = 5
- 2x = ln 5 — on applique ln, qui défait exp.
- x = ln(5)/2 ≈ 0,80.

### Réciproque de f(x) = 2x + 3
- y = 2x + 3 donc x = (y − 3)/2 — on isole x.
- f⁻¹(y) = (y − 3)/2 ; contrôle : f((y − 3)/2) = y − 3 + 3 = y.

### Calculer arcsin(1/2)
- sin(π/6) = 1/2 et π/6 ∈ [−π/2 ; π/2] — bon intervalle.
- arcsin(1/2) = π/6 (et non 5π/6, qui a le même sinus mais est hors de l'intervalle).

### Calculer ch(ln 2)
- e^(ln 2) = 2 et e^(−ln 2) = 1/2 — exp et ln se défont.
- ch(ln 2) = (2 + 0,5)/2 = 1,25.

## Pièges fréquents
- Écrire ln(a + b) = ln a + ln b → c'est ln(a × b) qui vaut ln a + ln b.
- Prendre ln d'un nombre négatif ou nul → ln x n'existe que pour x > 0.
- Confondre f⁻¹(x) (réciproque) et 1/f(x) (inverse) → ce sont deux objets différents.
- Croire que arcsin(sin x) = x pour tout x → seulement si x ∈ [−π/2 ; π/2].
- Oublier que arccos est à valeurs dans [0 ; π] → arccos(−1/2) = 2π/3, pas −π/3.
- Confondre ch² − sh² = 1 avec cos² + sin² = 1 → en hyperbolique, c'est une différence.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| eᵃ × eᵇ = ? | e^(a+b). |
| ln(ab) = ? | ln a + ln b (a, b > 0). |
| ln(aⁿ) = ? | n ln a. |
| ln 1 et ln e ? | ln 1 = 0, ln e = 1. |
| Domaine de ln ? | ]0 ; +∞[. |
| Signe de eˣ ? | Toujours strictement positif. |
| logₐ(x) avec ln ? | ln x / ln a. |
| aˣ écrit avec e ? | e^(x ln a). |
| Solution de eˣ = c (c > 0) ? | x = ln c. |
| Courbes de f et f⁻¹ : quelle symétrie ? | Symétriques par rapport à la droite y = x. |
| Condition pour qu'une réciproque existe ? | f strictement monotone (ne prend pas deux fois la même valeur). |
| Intervalle des valeurs de arcsin ? | [−π/2 ; π/2]. |
| Intervalle des valeurs de arccos ? | [0 ; π]. |
| arctan(1) ? | π/4. |
| Définition de ch x ? | (eˣ + e⁻ˣ)/2. |
| Définition de sh x ? | (eˣ − e⁻ˣ)/2. |
| ch² x − sh² x = ? | 1. |
| ch 0 et sh 0 ? | ch 0 = 1, sh 0 = 0. |
| argsh x en logarithme ? | ln(x + √(x² + 1)). |
| ch est-elle paire ou impaire ? | Paire (sh et th sont impaires). |

## Exercices générables
### c1-eq-exp-simple — Égalité d'exponentielles
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Résous e^({a}x) = e^({b}).
- Paramètres : a ∈ {−5…−1} ∪ {1…5} ; b = a × t avec t entier de −6 à 6.
- Réponse : x = b/a
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : b − a → « soustraction au lieu de division » ; a × b.
- Explication de la solution : exp est strictement croissante, donc {a}x = {b} et x = {b}/{a}.
- Inspiré de : propriétés (2.4), p. 25.

### c1-ln-produit — Somme de logarithmes
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Écris ln({a}) + ln({b}) sous la forme ln(k). Que vaut k ?
- Paramètres : a, b entiers de 2 à 12.
- Réponse : k = a × b
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a + b → « ln(a + b) ».
- Explication de la solution : ln transforme les produits en sommes : ln {a} + ln {b} = ln({a} × {b}).
- Inspiré de : propriétés (2.6), p. 25.

### c1-log-base — Logarithme en base a
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule log_{a}({x}).
- Paramètres : a ∈ {2, 3, 10} ; n entier de 0 à 6 ; x = aⁿ.
- Réponse : n
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : x/a → « division au lieu d'exposant ».
- Explication de la solution : log_{a}({x}) est l'exposant k tel que {a}^k = {x} ; ici k = n.
- Inspiré de : définition (2.5) et (2.7), p. 25.

### c1-eq-exp — Résoudre eˣ = c
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Résous e^({a}x) = {c} (réponse arrondie à 0,01).
- Paramètres : a ∈ {1, 2, 3} ; c entier de 2 à 50.
- Réponse : ln(c)/a
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : ln(c/a) → « division mal placée » ; c/a.
- Explication de la solution : on applique ln : {a}x = ln {c}, donc x = ln({c})/{a}.
- Inspiré de : définition 2.11, p. 25.

### c1-reciproque-affine — Réciproque d'une fonction affine
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = {a}x + {b}. Calcule f⁻¹({y0}).
- Paramètres : a ∈ {−5…−2} ∪ {2…5} ; b entier de −10 à 10 ; t entier de −6 à 6 ; y0 = a·t + b.
- Réponse : (y0 − b)/a (= t)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a·y0 + b → « f au lieu de f⁻¹ » ; 1/(a·y0 + b) → « réciproque confondue avec inverse ».
- Explication de la solution : y = {a}x + {b} donne x = (y − {b})/{a} ; on remplace y par {y0}.
- Inspiré de : §2.5 (p. 48), exercice 2.30.

### c1-arc — Valeur d'une fonction circulaire réciproque
- Niveau : 2
- Forme : `qcm`
- Énoncé gabarit : Que vaut {fonction}({valeur}) ?
- Paramètres : couples (fonction, valeur, réponse) : (arcsin, 1/2, π/6), (arcsin, √2/2, π/4), (arcsin, −1/2, −π/6), (arccos, 1/2, π/3), (arccos, 0, π/2), (arccos, −1/2, 2π/3), (arctan, 1, π/4), (arctan, √3, π/3), (arctan, −1, −π/4).
- Réponse : l'angle de la liste.
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : l'angle complémentaire (π/2 − réponse) → « confusion arcsin/arccos » ; π − réponse → « mauvais intervalle » ; −réponse → « erreur de signe ».
- Explication de la solution : on cherche l'angle du bon intervalle ([−π/2 ; π/2] pour arcsin/arctan, [0 ; π] pour arccos) dont la valeur trigonométrique est {valeur}.
- Inspiré de : §2.5.1 (p. 49-51).

### c1-ch-ln — Cosinus hyperbolique d'un logarithme
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule ch(ln {a}).
- Paramètres : a ∈ {2, 4, 5, 10}.
- Réponse : (a + 1/a)/2
- Vérification : tolérance ±0,001 (valeurs : 1,25 ; 2,125 ; 2,6 ; 5,05).
- Distracteurs (QCM) ou erreurs typiques (numérique) : (a − 1/a)/2 → « confusion ch/sh » ; a + 1/a → « oubli du /2 ».
- Explication de la solution : e^(ln {a}) = {a} et e^(−ln {a}) = 1/{a} ; ch = moyenne des deux.
- Inspiré de : définition 2.13 (p. 26), exercice 2.29.

### c1-ch-sh — Identité hyperbolique
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : On sait que sh x = {s}. Calcule ch x.
- Paramètres : s ∈ {0 ; 0,75 ; 4/3 ; 2,4}.
- Réponse : √(1 + s²) (valeurs : 1 ; 1,25 ; 5/3 ; 2,6)
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : √(1 − s²) → « confusion avec cos² + sin² = 1 » ; 1 + s².
- Explication de la solution : ch² x = 1 + sh² x et ch x > 0, donc ch x = √(1 + {s}²).
- Inspiré de : identités p. 27, exercice 2.29.1.

### c1-argsh — Argument sinus hyperbolique
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Calcule argsh({s}) (arrondi à 0,001).
- Paramètres : s ∈ {0 ; 0,75 ; 2,4}.
- Réponse : ln(s + √(s² + 1)) (valeurs : 0 ; ln 2 ≈ 0,693 ; ln 5 ≈ 1,609)
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : ln(s + √(s² − 1)) → « confusion avec argch ».
- Explication de la solution : argsh x = ln(x + √(x² + 1)) ; ici √({s}² + 1) se calcule exactement.
- Inspiré de : formule (2.27) p. 52, exercice 2.29.3.

---

# Chapitre : Limites et continuité
Source : §2.3-2.4 (p. 34-48, PDF 40-54) ; exercices 2.6 à 2.27 (p. 55-58).
Niveau visé : tu calcules des limites (en un point, à l'infini), tu lèves les formes indéterminées classiques et tu étudies la continuité d'une fonction.
Prérequis : Fonctions usuelles, réciproques et hyperboliques.

## Explication pour un novice
Chercher une limite, c'est regarder où « va » f(x) quand x s'approche d'une valeur, sans forcément l'atteindre. Imagine que tu marches vers une porte : même si tu ne la franchis jamais, tu sais vers où tu vas. On écrit lim_{x→x₀} f(x) = ℓ.

La définition précise (avec ε et δ) dit : aussi petite que soit la marge ε que tu imposes autour de ℓ, tu peux trouver une zone autour de x₀ où toutes les valeurs f(x) restent dans cette marge. Le cours l'illustre avec deux bandes horizontales (autour de ℓ) et deux bandes verticales (autour de x₀).

On peut arriver de la gauche ou de la droite ; si les deux chemins mènent au même endroit, la limite existe. Par exemple f(x) = 1 + |x|/x vaut 2 à droite de 0 et 0 à gauche : pas de limite en 0. Une limite peut aussi être infinie : la courbe s'envole le long d'une asymptote verticale.

Parfois le calcul direct donne une expression sans sens comme 0/0 ou ∞ − ∞ : c'est une forme indéterminée. On la « lève » par des astuces : factoriser, mettre le terme le plus fort en facteur, multiplier par la quantité conjuguée, ou utiliser une limite connue comme sin x / x → 1.

Une fonction est continue si on peut tracer sa courbe sans lever le crayon : la limite en chaque point est égale à la valeur. Conséquence pratique (théorème des valeurs intermédiaires) : si une fonction continue passe d'une valeur négative à une valeur positive, elle s'annule entre les deux.

## Notions (dans l'ordre d'apprentissage)
- Voisinage : les points très proches d'un point donné | intervalle ]x₀ − δ ; x₀ + δ[ (déf. 2.30).
- Limite finie en un point : f(x) se rapproche de ℓ | ∀ε > 0, ∃δ > 0 : |x − x₀| < δ ⇒ |f(x) − ℓ| < ε (éq. 2.12).
- Limite à gauche / à droite : on arrive d'un seul côté | lim_{x→x₀⁻} et lim_{x→x₀⁺} ; la limite existe si elles sont égales (éq. 2.15).
- Limite infinie : f(x) devient aussi grand qu'on veut | ∀A > 0, ∃δ : |x − x₀| < δ ⇒ f(x) > A (déf. 2.32).
- Asymptote verticale : droite x = a vers laquelle la courbe s'envole | lim_{x→a} f(x) = ±∞.
- Asymptote horizontale : droite y = b approchée à l'infini | lim_{x→±∞} f(x) = b.
- Opérations sur les limites : les limites se combinent | lim(f + g) = ℓ + m, lim(fg) = ℓm, lim(f/g) = ℓ/m si m ≠ 0 (théorème 2.2).
- Théorème des gendarmes : coincée entre deux fonctions de même limite | f ≤ g ≤ h et lim f = lim h = ℓ ⇒ lim g = ℓ.
- Formes indéterminées : calculs sans conclusion directe | ∞ − ∞, 0 × ∞, ∞/∞, 0/0, 1^∞, 0⁰, ∞⁰.
- Limite fondamentale du sinus : sin x ≈ x près de 0 | lim_{x→0} sin x / x = 1 (exemple 2.25).
- Limite exponentielle : intérêts composés | lim_{x→∞} (1 + k/x)ˣ = eᵏ.
- Croissances comparées : l'exponentielle l'emporte sur les puissances, qui l'emportent sur ln | lim x/ln x = +∞, lim x¹⁰⁰/2ˣ = 0.
- Continuité en un point : pas de saut | lim_{x→x₀} f(x) = f(x₀) (déf. 2.33).
- Discontinuité de première espèce : un saut | limites à gauche et à droite finies mais différentes ; saut Δf = f(x₀⁺) − f(x₀⁻).
- Prolongement par continuité : boucher un trou | g(x₀) = lim_{x→x₀} f(x) (déf. 2.34).
- Valeurs intermédiaires : une fonction continue ne saute aucune valeur | f continue sur [a ; b], f(a) < 0 < f(b) ⇒ ∃c : f(c) = 0 (théorème 2.7).

## Méthodes
### Calculer une limite en un point
1. Remplace x par x₀.
2. Si tu obtiens un nombre, c'est la limite (fonction continue).
3. Si tu obtiens 0/0, factorise par (x − x₀) et simplifie, puis remplace à nouveau.

### Limite d'une fraction rationnelle en ±∞
1. Garde le terme de plus haut degré en haut et en bas.
2. Même degré : limite = quotient des coefficients dominants.
3. Degré du haut plus petit : limite 0 ; plus grand : ±∞.

### Quantité conjuguée (formes ∞ − ∞ avec des racines)
1. Multiplie et divise par √A + B quand tu as √A − B.
2. Le numérateur devient A − B².
3. Simplifie puis passe à la limite.

### Utiliser sin x / x → 1
1. Fais apparaître sin(u)/u avec u → 0.
2. Exemple : sin(3x)/x = 3 × sin(3x)/(3x) → 3.

### Étudier la continuité d'une fonction par morceaux
1. Sur chaque morceau, la formule est continue (fonctions usuelles).
2. Au point de raccord x₀, calcule les limites à gauche et à droite et la valeur f(x₀).
3. Continue en x₀ si les trois sont égales ; sinon on lit le saut.

## Exemples résolus
### lim_{x→a} (x³ − a³)/(x − a) (exemple 2.28)
- En x = a on obtient 0/0 — forme indéterminée.
- x³ − a³ = (x − a)(x² + ax + a²) — factorisation.
- Après simplification : x² + ax + a² → 3a².

### lim_{x→3} (3x³ − 10x² + x + 6)/(2x² − x − 15) (exemple 2.29)
- Numérateur et dénominateur s'annulent en 3 — on factorise par (x − 3).
- = (x − 1)(3x + 2)/(2x + 5) — simplification.
- En x = 3 : (2 × 11)/11 = 2.

### lim_{x→+∞} (√(x + 1) − √(x − 1)) (exemple 2.31)
- Forme ∞ − ∞ — on utilise la quantité conjuguée.
- = ((x + 1) − (x − 1))/(√(x + 1) + √(x − 1)) = 2/(√(x + 1) + √(x − 1)).
- Le dénominateur tend vers +∞, donc la limite vaut 0.

### Prolonger sin x / x en 0 (exemple 2.34)
- f(0) n'existe pas mais lim_{x→0} sin x / x = 1.
- On pose g(0) = 1 et g(x) = sin x / x sinon : g est continue en 0.

## Pièges fréquents
- Écrire « 0/0 = 0 » ou « ∞ − ∞ = 0 » → ce sont des formes indéterminées : il faut transformer l'expression.
- Oublier de vérifier les deux côtés → une limite n'existe que si les limites à gauche et à droite coïncident.
- Garder tous les termes d'un polynôme à l'infini → seul le terme de plus haut degré compte.
- Utiliser sin x / x → 1 quand x ne tend pas vers 0 → la formule ne vaut qu'en 0.
- Croire que (1 + 1/x)ˣ → 1 → c'est une forme 1^∞ ; la limite vaut e.
- Confondre « limite = +∞ » avec « la limite existe et vaut un nombre » → +∞ n'est pas un nombre (remarque 2.3).

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Que signifie lim_{x→x₀} f(x) = ℓ ? | f(x) est aussi proche de ℓ qu'on veut dès que x est assez proche de x₀. |
| Quand une limite en x₀ existe-t-elle ? | Quand la limite à gauche et la limite à droite sont égales. |
| lim_{x→0} sin x / x ? | 1. |
| lim_{x→0} (1 − cos x)/x² ? | 1/2. |
| lim_{x→0} (eˣ − 1)/x ? | 1. |
| lim_{x→0} ln(1 + x)/x ? | 1. |
| lim_{x→+∞} (1 + k/x)ˣ ? | eᵏ. |
| Cite les sept formes indéterminées. | ∞ − ∞, 0 × ∞, ∞/∞, 0/0, 1^∞, 0⁰, ∞⁰. |
| Fraction rationnelle à l'infini, même degré ? | Quotient des coefficients dominants. |
| Réflexe devant 0/0 avec des polynômes ? | Factoriser par (x − x₀) et simplifier. |
| Réflexe devant √A − B à l'infini ? | Multiplier par la quantité conjuguée √A + B. |
| Qui gagne : eˣ ou x¹⁰⁰ en +∞ ? | eˣ : lim x¹⁰⁰/eˣ = 0. |
| Qui gagne : x ou ln x en +∞ ? | x : lim ln x / x = 0. |
| Théorème des gendarmes ? | Si f ≤ g ≤ h et f, h → ℓ, alors g → ℓ. |
| Asymptote verticale x = a ? | f(x) → ±∞ quand x → a. |
| Asymptote horizontale y = b ? | f(x) → b quand x → ±∞. |
| Définition de la continuité en x₀ ? | lim_{x→x₀} f(x) = f(x₀). |
| Prolongement par continuité en x₀ ? | Définir f(x₀) comme la limite finie de f en x₀. |
| Théorème des valeurs intermédiaires ? | f continue, f(a) < 0 < f(b) ⇒ f s'annule entre a et b. |
| lim_{x→0} x sin(1/x) ? | 0 (fonction tendant vers 0 × fonction bornée). |

## Exercices générables
### c2-substitution — Limite par substitution
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule lim_{x→{x0}} ({a}x² + {b}x + {c}).
- Paramètres : a, b, c entiers de −5 à 5 ; x0 entier de −3 à 3.
- Réponse : a·x0² + b·x0 + c
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : erreur de signe sur x0² quand x0 < 0.
- Explication de la solution : un polynôme est continu : la limite est sa valeur en {x0}.
- Inspiré de : définition 2.33 (p. 46).

### c2-rationnelle-infini — Fraction rationnelle à l'infini
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule lim_{x→+∞} ({a}x² + {b}x + {c})/({d}x² + {e}x + {f}).
- Paramètres : a, d entiers non nuls de −9 à 9 ; b, c, e, f entiers de −9 à 9.
- Réponse : a/d
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : c/f → « limite en 0 au lieu de l'infini » ; (a + b + c)/(d + e + f) → « remplacement par x = 1 ».
- Explication de la solution : on met x² en facteur en haut et en bas ; les autres termes tendent vers 0 ; il reste {a}/{d}.
- Inspiré de : exercice 2.6 (p. 55), mise en facteur du terme prépondérant (p. 43).

### c2-degres — Comparer les degrés
- Niveau : 2
- Forme : `qcm`
- Énoncé gabarit : Quelle est la limite en +∞ de ({a}x^{n} + 1)/({b}x^{m} + 1) ?
- Paramètres : a, b entiers de 1 à 9 ; n, m entiers de 1 à 4.
- Réponse : 0 si n < m ; a/b si n = m ; +∞ si n > m.
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : les deux autres cas ; 1 → « tout est équivalent ».
- Explication de la solution : seul le terme dominant compte : la fraction se comporte comme ({a}/{b}) x^(n−m).
- Inspiré de : échelle de comparaison (p. 41), forme ∞/∞ (p. 98).

### c2-factorisation — Lever 0/0 par factorisation
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule lim_{x→{a}} (x^{p} − {a}^{p})/(x − {a}).
- Paramètres : a entier de −5 à 5, a ≠ 0 ; p ∈ {2, 3}.
- Réponse : p·a^(p−1) (soit 2a ou 3a²)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 0 → « 0/0 = 0 » ; a^(p−1) → « facteur p oublié ».
- Explication de la solution : x² − a² = (x − a)(x + a) et x³ − a³ = (x − a)(x² + ax + a²) ; on simplifie puis on remplace x par {a}.
- Inspiré de : exemple 2.28 (p. 44), exercice 2.7.

### c2-sinus — Limite avec sin(ax)
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule lim_{x→0} sin({a}x)/({b}x).
- Paramètres : a, b entiers de 1 à 9.
- Réponse : a/b
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 1 → « sin(ax)/(bx) → 1 » ; b/a → « rapport inversé ».
- Explication de la solution : sin({a}x)/({b}x) = ({a}/{b}) × sin({a}x)/({a}x) → {a}/{b} × 1.
- Inspiré de : exercice 2.8.1 et 2.8.3 (p. 55).

### c2-cosinus — Limite avec 1 − cos
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Calcule lim_{x→0} (1 − cos({a}x))/x².
- Paramètres : a entier de 1 à 6.
- Réponse : a²/2
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 1/2 → « paramètre a oublié » ; a/2 → « a non élevé au carré ».
- Explication de la solution : (1 − cos u)/u² → 1/2 avec u = {a}x, et x² = u²/{a}², d'où {a}²/2.
- Inspiré de : exercice 2.8.4 et 2.8.7 (p. 55), limites usuelles 4(c) p. 42.

### c2-puissance-exp — Forme 1^∞
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : La limite lim_{x→+∞} (1 + {k}/x)^x s'écrit e^m. Que vaut m ?
- Paramètres : k entier de −5 à 5, k ≠ 0.
- Réponse : m = k
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 0 (limite 1) → « 1 puissance quelque chose = 1 » ; 1/k.
- Explication de la solution : formule du cours lim (1 + k/x)ˣ = eᵏ (avec ln : x ln(1 + k/x) → k).
- Inspiré de : limites usuelles 1(h)-(i) p. 42, exercice 2.9.

### c2-conjuguee — Quantité conjuguée
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Calcule lim_{x→+∞} (√(x² + {a}x + {b}) − x).
- Paramètres : a entier de −9 à 9, a ≠ 0 ; b entier de 0 à 9.
- Réponse : a/2
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 0 → « ∞ − ∞ = 0 » ; a → « oubli du dénominateur 2x ».
- Explication de la solution : on multiplie par la conjuguée : ({a}x + {b})/(√(x² + {a}x + {b}) + x) ; le dénominateur vaut environ 2x, d'où {a}/2.
- Inspiré de : exemple 2.30 (p. 44), exercice 2.12.4-5, exemple 3.37 (a = 3, résultat 3/2).

### c2-saut — Limites à gauche et à droite
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = {a} + {b}·|x|/x. Calcule le saut f(0⁺) − f(0⁻).
- Paramètres : a entier de −5 à 5 ; b entier non nul de −5 à 5.
- Réponse : 2b
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 0 → « |x|/x = 1 des deux côtés » ; b.
- Explication de la solution : |x|/x = 1 si x > 0 et −1 si x < 0 ; f(0⁺) = {a} + {b}, f(0⁻) = {a} − {b}.
- Inspiré de : exemple 2.20 (p. 38), exemple 2.33 (p. 47).

### c2-continuite-parametre — Raccord continu
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : f(x) = x + m si x < {x0} et f(x) = {a}x² si x ≥ {x0}. Quelle valeur de m rend f continue ?
- Paramètres : x0 entier de −3 à 3 ; a entier de 1 à 5.
- Réponse : m = a·x0² − x0
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a·x0² → « x0 oublié à gauche » ; a·x0² + x0 → « erreur de signe ».
- Explication de la solution : on égalise les deux formules au raccord : {x0} + m = {a}×{x0}².
- Inspiré de : exercice 2.23 (p. 58).

---

# Chapitre : Dérivées
Source : §3.1-3.3 (p. 61-74, PDF 67-80), annexe B (p. 221-223) ; exercices 3.1 à 3.9 (p. 103-104).
Niveau visé : tu calcules le taux de variation, la dérivée d'une fonction avec les règles (somme, produit, quotient, composée), les dérivées d'ordre 2 et la différentielle.
Prérequis : Limites et continuité.

## Explication pour un novice
La dérivée mesure la vitesse à laquelle une quantité change. Sur un trajet en voiture, la vitesse moyenne vaut « distance parcourue / durée ». Mais le compteur affiche la vitesse à l'instant précis : c'est la vitesse moyenne sur une durée de plus en plus courte. La dérivée, c'est exactement cette limite.

Le cours part des bactéries : P(t) = (1 + t)². Entre t = 1 et t = 3, la population gagne 12 bactéries en 2 minutes : taux moyen 6 bactéries/min. À la 4e minute exactement, en faisant tendre l'intervalle vers zéro, on trouve 10 bactéries/min : c'est P'(4).

Géométriquement, la dérivée est la pente de la tangente : la droite qui « frôle » la courbe en un point. Une pente positive veut dire que la fonction monte, négative qu'elle descend.

En pratique, on ne repasse pas par la limite à chaque fois : on apprend un petit catalogue (dérivée de xⁿ, sin, cos, eˣ, ln…) et des règles pour combiner (somme, produit, quotient, composée). C'est comme apprendre les règles de la grammaire plutôt que chaque phrase par cœur.

Enfin, la dérivée de la dérivée (dérivée seconde) mesure si la vitesse elle-même augmente : c'est l'accélération. La différentielle dy = f'(x)·dx donne l'accroissement de y le long de la tangente, une approximation du vrai accroissement Δy pour un petit dx.

## Notions (dans l'ordre d'apprentissage)
- Taux de variation moyen : variation de f divisée par variation de x | T = (f(b) − f(a))/(b − a) (§3.1.1).
- Vitesse instantanée : vitesse moyenne sur un temps infiniment court | v(t) = lim_{Δt→0} (x(t + Δt) − x(t))/Δt (éq. 3.1).
- Dérivée en un point : pente de la tangente | f'(x₀) = lim_{h→0} (f(x₀ + h) − f(x₀))/h (éq. 3.4).
- Notations : différentes écritures de la même chose | f'(x), df/dx, Dₓ(f).
- Fonction dérivable : la limite précédente existe et est finie | déf. 3.3.
- Dérivées à gauche et à droite : point anguleux | |x| a pour dérivées −1 et +1 en 0 (exemple 3.5).
- Dérivable ⇒ continue : la réciproque est fausse | théorème 3.1 ; |x| est continue mais non dérivable en 0.
- Dérivées usuelles : le catalogue | (xⁿ)' = nxⁿ⁻¹, (sin ax)' = a cos ax, (cos ax)' = −a sin ax, (e^(ax))' = a e^(ax), (ln x)' = 1/x, (tan x)' = 1 + tan² x.
- Règle de la somme : on dérive terme à terme | (u + v)' = u' + v'.
- Règle du produit : chacun son tour | (uv)' = u'v + uv'.
- Règle du quotient : | (u/v)' = (u'v − uv')/v².
- Puissance d'une fonction : | (uⁿ)' = n u' uⁿ⁻¹.
- Composée (dérivation en chaîne) : on multiplie les dérivées | (f(u(x)))' = f'(u(x)) × u'(x).
- Dérivée logarithmique : pour u^v | (u^v)' = u^v (v' ln u + v u'/u).
- Dérivée d'une réciproque : | (f⁻¹)'(y) = 1/f'(x) avec y = f(x).
- Dérivée seconde, d'ordre n : on recommence | f'' = (f')' ; (sin x)⁽ⁿ⁾ = sin(x + nπ/2).
- Différentielle : accroissement le long de la tangente | dy = f'(x) dx (éq. 3.15).

## Méthodes
### Dériver avec la définition
1. Écris le taux (f(x + h) − f(x))/h.
2. Développe et simplifie par h.
3. Fais tendre h vers 0.

### Dériver une expression compliquée
1. Repère la structure principale : somme, produit, quotient ou composée.
2. Applique la règle correspondante.
3. Dérive les morceaux avec le catalogue.
4. Simplifie seulement à la fin.

### Dériver une composée f(u(x))
1. Identifie la fonction « extérieure » f et « intérieure » u.
2. Dérive l'extérieure en gardant l'intérieure telle quelle : f'(u(x)).
3. Multiplie par la dérivée de l'intérieure : u'(x).

### Dériver u(x)^v(x)
1. Pose y = u^v, donc ln y = v ln u.
2. Dérive : y'/y = v' ln u + v u'/u.
3. y' = u^v (v' ln u + v u'/u).

## Exemples résolus
### Dérivée de x³ par la définition (exemple 3.3)
- ((x + h)³ − x³)/h = (3x²h + 3xh² + h³)/h — on développe.
- = 3x² + 3xh + h² — on simplifie par h.
- → 3x² quand h → 0.

### Taux de croissance à la 4e minute (§3.1.1)
- (P(t) − P(4))/(t − 4) = ((t + 1)² − 25)/(t − 4) = (t + 6)(t − 4)/(t − 4) — factorisation.
- = t + 6 → 10 bactéries/min quand t → 4.

### Vitesse pour x(t) = 5t² (exemple 3.2)
- x(t + Δt) − x(t) = 5(2tΔt + Δt²) — développement.
- v(t) = lim 5(2t + Δt) = 10t ; v(2) = 20 m/s.

### Dérivée de x^x (exercice 3.6.2)
- ln y = x ln x — dérivée logarithmique.
- y'/y = ln x + 1, donc y' = x^x (ln x + 1).

## Pièges fréquents
- Écrire (uv)' = u'v' → la dérivée d'un produit est u'v + uv'.
- Oublier la dérivée de l'intérieur dans une composée → (sin 3x)' = 3 cos 3x, pas cos 3x.
- Inverser le signe dans le quotient → c'est u'v − uv' (dans cet ordre), divisé par v².
- (cos x)' = sin x → non : (cos x)' = −sin x.
- Dériver x^x comme x·x^(x−1) ou x^x ln x → l'exposant et la base varient tous les deux : passe par ln.
- Croire que « continue » implique « dérivable » → |x| est continue en 0 mais pas dérivable.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Définition de f'(x₀) ? | lim_{h→0} (f(x₀ + h) − f(x₀))/h. |
| Interprétation géométrique de f'(x₀) ? | La pente de la tangente à la courbe en x₀. |
| Interprétation physique de x'(t) ? | La vitesse instantanée. |
| Taux de variation moyen entre a et b ? | (f(b) − f(a))/(b − a). |
| (xⁿ)' ? | n xⁿ⁻¹. |
| (sin x)' et (cos x)' ? | cos x et −sin x. |
| (e^(ax))' ? | a e^(ax). |
| (ln x)' ? | 1/x. |
| (tan x)' ? | 1 + tan² x = 1/cos² x. |
| Dérivée d'une constante ? | 0. |
| (uv)' ? | u'v + uv'. |
| (u/v)' ? | (u'v − uv')/v². |
| (1/u)' ? | −u'/u². |
| (uⁿ)' ? | n u' uⁿ⁻¹. |
| Dérivée de f(u(x)) ? | f'(u(x)) × u'(x). |
| (√x)' ? | 1/(2√x). |
| Dérivable implique continue ? | Oui ; mais continue n'implique pas dérivable. |
| Exemple de fonction continue non dérivable en 0 ? | \|x\| (point anguleux). |
| Définition de la différentielle ? | dy = f'(x) dx. |
| (arctan x)' ? | 1/(1 + x²). |
| (arcsin x)' ? | 1/√(1 − x²). |

## Exercices générables
### c3-taux-moyen — Croissance de bactéries
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Une population vaut P(t) = (1 + t)². Calcule le taux de variation moyen entre t = {a} et t = {b}.
- Paramètres : a, b entiers de 0 à 8, a < b.
- Réponse : (P(b) − P(a))/(b − a) = 2 + a + b
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : P(b) − P(a) → « oubli de la division par la durée ».
- Explication de la solution : ((1 + {b})² − (1 + {a})²)/({b} − {a}).
- Inspiré de : §3.1.1 (p. 62).

### c3-puissance — Dérivée d'un monôme
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = {a}x^{n}. Calcule f'({x0}).
- Paramètres : a entier de −5 à 5 (a ≠ 0) ; n entier de 2 à 5 ; x0 entier de −3 à 3.
- Réponse : a·n·x0^(n−1)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a·x0^(n−1) → « n oublié » ; a·n·x0^n → « exposant non diminué ».
- Explication de la solution : (xⁿ)' = n xⁿ⁻¹, donc f'(x) = {a}×{n}×x^({n}−1).
- Inspiré de : dérivées usuelles p. 69, exercice 3.2.

### c3-polynome — Dérivée d'un polynôme
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = {a}x³ + {b}x² + {c}x + {d}. Calcule f'({x0}).
- Paramètres : a, b, c, d entiers de −5 à 5 ; x0 entier de −3 à 3.
- Réponse : 3a·x0² + 2b·x0 + c
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 3a·x0² + 2b·x0 + c + d → « dérivée de la constante non nulle ».
- Explication de la solution : on dérive terme à terme : f'(x) = 3{a}x² + 2{b}x + {c}.
- Inspiré de : exercice 3.4.1 (p. 103), exemple 3.14.

### c3-vitesse — Vitesse instantanée
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Un mobile a pour position x(t) = {k}t² + {v}t (en m, t en s). Quelle est sa vitesse à t = {t0} s ?
- Paramètres : k entier de 1 à 6 ; v entier de 0 à 10 ; t0 entier de 1 à 5.
- Réponse : 2k·t0 + v
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : x(t0)/t0 = k·t0 + v → « vitesse moyenne depuis 0 ».
- Explication de la solution : v(t) = x'(t) = 2{k}t + {v}.
- Inspiré de : exemple 3.2 (p. 64).

### c3-produit — Règle du produit
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = ({a}x + {b})({c}x + {d}). Calcule f'({x0}).
- Paramètres : a, b, c, d entiers de −5 à 5 (a, c ≠ 0) ; x0 entier de −3 à 3.
- Réponse : a(c·x0 + d) + c(a·x0 + b)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a × c → « (uv)' = u'v' ».
- Explication de la solution : u = {a}x + {b}, v = {c}x + {d} ; (uv)' = u'v + uv' = {a}·v + {c}·u, évalué en {x0}.
- Inspiré de : formule (3.8) p. 70.

### c3-quotient — Règle du quotient
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = ({a}x + {b})/(x + {c}). Calcule f'({x0}) (arrondi à 0,01).
- Paramètres : a, b, c entiers de −5 à 5 ; x0 entier de −3 à 3 avec x0 + c ≠ 0 et a·c − b ≠ 0.
- Réponse : (a·c − b)/(x0 + c)²
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : (b − a·c)/(x0 + c)² → « u'v et uv' inversés » ; a → « dérivée du numérateur seule ».
- Explication de la solution : (u/v)' = (u'v − uv')/v² = ({a}(x + {c}) − ({a}x + {b}))/(x + {c})² = ({a}{c} − {b})/(x + {c})².
- Inspiré de : formule (3.9) p. 71, exercice 3.4.5.

### c3-composee — Puissance d'une fonction affine
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = ({a}x + {b})^{n}. Calcule f'({x0}).
- Paramètres : a ∈ {−3…−1} ∪ {1…3} ; b entier de −3 à 3 ; n ∈ {2, 3} ; x0 entier de −2 à 2.
- Réponse : n·a·(a·x0 + b)^(n−1)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : n·(a·x0 + b)^(n−1) → « dérivée de l'intérieur oubliée ».
- Explication de la solution : (uⁿ)' = n u' uⁿ⁻¹ avec u = {a}x + {b} et u' = {a}.
- Inspiré de : formule (3.11) p. 71, exercice 3.4.

### c3-trig-exp — Sinus et exponentielle en 0
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = sin({a}x) + e^({b}x). Calcule f'(0).
- Paramètres : a, b entiers de −6 à 6.
- Réponse : a + b
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 2 → « cos 0 + e⁰ sans les facteurs a et b » ; a·b.
- Explication de la solution : f'(x) = {a} cos({a}x) + {b} e^({b}x) ; en 0 : {a}×1 + {b}×1.
- Inspiré de : dérivées usuelles 3 et 6 (p. 69).

### c3-seconde — Dérivée seconde
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = {a}x³ + {b}x². Calcule f''({x0}).
- Paramètres : a, b entiers de −5 à 5 ; x0 entier de −3 à 3.
- Réponse : 6a·x0 + 2b
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 3a·x0² + 2b·x0 → « on s'arrête à f' ».
- Explication de la solution : f'(x) = 3{a}x² + 2{b}x puis f''(x) = 6{a}x + 2{b}.
- Inspiré de : §3.2.4 (p. 73).

### c3-differentielle — Différentielle et accroissement
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Pour y = x², calcule la différentielle dy au point x = {x0} pour dx = {dx}.
- Paramètres : x0 entier de 1 à 10 ; dx ∈ {0,01 ; 0,1 ; 0,5}.
- Réponse : 2·x0·dx
- Vérification : tolérance ±0,0001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 2·x0·dx + dx² → « Δy (accroissement exact) au lieu de dy ».
- Explication de la solution : dy = f'(x) dx = 2×{x0}×{dx}. Le vrai accroissement Δy = 2{x0}{dx} + {dx}² en diffère de {dx}², négligeable si dx est petit.
- Inspiré de : §3.3 et §3.3.1 (p. 73-74), exercice 3.9.

---

# Chapitre : Étude de fonctions et optimisation
Source : §3.4 (p. 74-83, PDF 80-89), §3.5.1 (p. 84-87, PDF 90-93) ; exercices 3.10 à 3.23 (p. 104-107).
Niveau visé : tu écris l'équation d'une tangente et d'une normale, tu trouves les variations, extremums, concavité et points d'inflexion, tu résous un problème d'optimisation, et tu utilises Rolle, les accroissements finis et la règle de L'Hospital.
Prérequis : Dérivées.

## Explication pour un novice
Connaître la dérivée, c'est avoir un GPS qui dit à chaque instant si la route monte ou descend. Là où f' > 0, la fonction monte ; là où f' < 0, elle descend. Aux sommets et aux creux, la route est plate un instant : f'(c) = 0. Ces points s'appellent points critiques.

Attention : une route plate n'est pas forcément un sommet. Pour x³ en 0, la pente s'annule mais la fonction continue de monter. Pour savoir si c'est un maximum ou un minimum, on regarde le signe de f' avant et après, ou le signe de f'' : f'' > 0 veut dire « en forme de bol » (minimum), f'' < 0 « en forme de dôme » (maximum). Là où la courbure change de sens, on a un point d'inflexion.

La tangente en x₀ a pour équation y = f'(x₀)(x − x₀) + f(x₀) : c'est la meilleure droite qui colle à la courbe près de ce point. La normale est la droite perpendiculaire à la tangente, de pente −1/f'(x₀).

Optimiser, c'est chercher la meilleure valeur : la plus grande aire avec un fil donné, la boîte de plus grand volume, la canette qui utilise le moins de métal. Méthode : écrire la quantité à optimiser en fonction d'une seule variable, dériver, chercher où la dérivée s'annule, puis vérifier.

Trois théorèmes éclairent tout cela. Rolle : si une fonction régulière revient à la même hauteur, elle a une tangente horizontale entre les deux. Les accroissements finis : sur un trajet, il existe un instant où la vitesse instantanée égale la vitesse moyenne. L'Hospital : pour une forme 0/0, on peut remplacer f/g par f'/g'.

## Notions (dans l'ordre d'apprentissage)
- Tangente : la droite qui colle à la courbe en un point | y = f'(x₀)(x − x₀) + f(x₀) (éq. 3.20).
- Normale : perpendiculaire à la tangente | y − y₀ = −(1/f'(x₀))(x − x₀) (éq. 3.22).
- Sous-tangente, sous-normale : projections sur l'axe Ox | ℓ_ST = |y₀/f'(x₀)|, ℓ_SN = |y₀ f'(x₀)| (éq. 3.23-3.26).
- Sens de variation : monter ou descendre | f' > 0 sur ]a ; b[ ⇒ f strictement croissante (théorème 3.6).
- Nombre critique : candidat extremum | f'(c) = 0 ou f'(c) n'existe pas (déf. 3.11).
- Extremum local : sommet ou creux local | si f a un extremum local en c et est dérivable, f'(c) = 0 (théorème 3.3).
- Extremum absolu : la plus grande (petite) valeur sur tout l'intervalle | une fonction continue sur [a ; b] atteint ses extremums (théorème 3.2).
- Test de la dérivée première : changement de signe | f' passe de + à − : maximum ; de − à + : minimum (théorème 3.5).
- Concavité : forme de bol ou de dôme | f'' > 0 : tournée vers le haut ; f'' < 0 : tournée vers le bas (théorème 3.7).
- Point d'inflexion : la courbure change | f'' change de signe en c (déf. 3.15).
- Optimisation : trouver le meilleur | fonction d'une seule variable, dérivée nulle, vérification.
- Théorème de Rolle : tangente horizontale | f(a) = f(b) ⇒ ∃c ∈ ]a ; b[ : f'(c) = 0 (théorème 3.9).
- Accroissements finis : vitesse moyenne = vitesse instantanée quelque part | f(b) − f(a) = (b − a) f'(c) (théorème 3.10).
- Règle de L'Hospital : remplacer f/g par f'/g' | si f(a) = g(a) = 0, lim f/g = lim f'/g' (théorème 3.12).

## Méthodes
### Équation de la tangente en x₀
1. Calcule f(x₀).
2. Calcule f'(x₀) : c'est la pente m.
3. Écris y = m(x − x₀) + f(x₀) et développe en y = mx + p.

### Étudier les variations et les extremums
1. Domaine de définition.
2. Calcule f'(x) et factorise-la.
3. Trouve les nombres critiques (f' = 0 ou f' non définie).
4. Tableau de signes de f' ; flèches montantes/descendantes.
5. Aux changements de signe : maximum (+ puis −) ou minimum (− puis +).

### Résoudre un problème d'optimisation
1. Nomme les variables et écris les contraintes (périmètre fixé, volume fixé…).
2. Exprime la quantité à optimiser avec une seule variable.
3. Précise l'intervalle de cette variable.
4. Dérive, cherche où la dérivée s'annule.
5. Compare avec les valeurs aux bornes et conclus.

### Appliquer la règle de L'Hospital
1. Vérifie la forme 0/0 (ou ∞/∞).
2. Dérive séparément le numérateur et le dénominateur (pas la fraction !).
3. Calcule la limite de f'/g' ; si c'est encore 0/0, recommence.

## Exemples résolus
### Tangente et normale à y = x² en M₀(1 ; 1) (exemple 3.10)
- f'(x) = 2x, donc f'(1) = 2 — pente de la tangente.
- Tangente : y = 2(x − 1) + 1 = 2x − 1.
- Normale : pente −1/2 ; y = −x/2 + 3/2.

### Variations de f(x) = x³ − 12x − 5 (exemple 3.14)
- f'(x) = 3x² − 12 = 3(x − 2)(x + 2) — factorisation.
- f' > 0 sur ]−∞ ; −2[ et ]2 ; +∞[, f' < 0 sur ]−2 ; 2[.
- Maximum local f(−2) = 11, minimum local f(2) = −21.

### Rectangle d'aire maximale avec un fil de longueur a (exemple 3.16)
- Périmètre 2x + 2y = a donc y = a/2 − x — une seule variable.
- A(x) = x(a/2 − x), A'(x) = a/2 − 2x = 0 pour x = a/4.
- y = a/4 aussi : c'est un carré, d'aire maximale a²/16.

### Boîte ouverte dans une plaque de 12 cm (exemple 3.17)
- V(x) = x(12 − 2x)² avec x ∈ [0 ; 6].
- V'(x) = 12(x − 2)(x − 6) = 0 pour x = 2 (x = 6 donne V = 0).
- Volume maximal V(2) = 2 × 8² = 128 cm³.

### lim_{x→0} (tan x − x)/(x − sin x) par L'Hospital (exemple 3.18)
- Forme 0/0 ; on dérive trois fois haut et bas successivement.
- On obtient la limite 2.

## Pièges fréquents
- Croire que f'(c) = 0 garantit un extremum → contre-exemple x³ en 0 : il faut un changement de signe de f'.
- Oublier les bornes dans une optimisation → l'extremum absolu peut être en a ou b.
- Appliquer L'Hospital en dérivant la fraction (u/v)' → on dérive le numérateur et le dénominateur séparément.
- Appliquer L'Hospital sans forme 0/0 ou ∞/∞ → le résultat est alors faux.
- Pente de la normale = −f'(x₀) → c'est −1/f'(x₀).
- Le cours appelle « concave » une courbe tournée vers le haut (déf. 3.12) → dans beaucoup de livres c'est « convexe » : fie-toi au signe de f''.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Équation de la tangente en x₀ ? | y = f'(x₀)(x − x₀) + f(x₀). |
| Pente de la normale en x₀ ? | −1/f'(x₀). |
| f' > 0 sur un intervalle signifie ? | f est strictement croissante sur cet intervalle. |
| Qu'est-ce qu'un nombre critique ? | Un c où f'(c) = 0 ou f'(c) n'existe pas. |
| f'(c) = 0 implique-t-il un extremum ? | Non (ex. x³ en 0) ; il faut un changement de signe de f'. |
| f' passe de + à − en c ? | Maximum local en c. |
| f'(c) = 0 et f''(c) > 0 ? | Minimum local en c. |
| f'(c) = 0 et f''(c) < 0 ? | Maximum local en c. |
| Point d'inflexion ? | Point où f'' change de signe (la courbure s'inverse). |
| Énoncé du théorème de Rolle ? | f(a) = f(b) ⇒ il existe c dans ]a ; b[ avec f'(c) = 0. |
| Formule des accroissements finis ? | f(b) − f(a) = (b − a) f'(c), avec a < c < b. |
| Sens physique des accroissements finis ? | À un instant, la vitesse instantanée égale la vitesse moyenne. |
| Règle de L'Hospital ? | Si f(a) = g(a) = 0 : lim f/g = lim f'/g'. |
| Première étape d'une optimisation ? | Exprimer la quantité avec une seule variable. |
| Rectangle de périmètre P et d'aire maximale ? | Le carré de côté P/4, aire P²/16. |
| Fonction continue sur [a ; b] : extremums ? | Elle atteint son maximum et son minimum. |
| Abscisse du sommet de ax² + bx + c ? | −b/(2a). |
| Où chercher un extremum absolu sur [a ; b] ? | Aux nombres critiques et aux bornes a et b. |

## Exercices générables
### c4-tangente-pente — Pente de la tangente
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = {a}x² + {b}x + {c}. Quelle est la pente de la tangente en x = {x0} ?
- Paramètres : a, b, c entiers de −5 à 5 (a ≠ 0) ; x0 entier de −3 à 3.
- Réponse : 2a·x0 + b
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : f(x0) → « valeur au lieu de la pente ».
- Explication de la solution : la pente est f'({x0}) avec f'(x) = 2{a}x + {b}.
- Inspiré de : exercice 3.3 (p. 103), §3.4.1.

### c4-tangente-ordonnee — Ordonnée à l'origine de la tangente
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = {a}x² + {b}x + {c}. La tangente en x = {x0} s'écrit y = mx + p. Que vaut p ?
- Paramètres : a, b, c entiers de −5 à 5 (a ≠ 0) ; x0 entier de −3 à 3.
- Réponse : p = f(x0) − f'(x0)·x0 = c − a·x0²
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : f(x0) → « oubli du terme −m·x0 » ; c + a·x0² → « erreur de signe ».
- Explication de la solution : y = f'({x0})(x − {x0}) + f({x0}) ; en développant, p = f({x0}) − f'({x0})×{x0}.
- Inspiré de : exemple 3.10 (p. 76 : y = 2x − 1 pour x² en 1), exercice 3.10.

### c4-normale — Pente de la normale
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Quelle est la pente de la normale à y = x² au point d'abscisse {x0} ? (arrondi à 0,001)
- Paramètres : x0 entier de −5 à 5, x0 ≠ 0.
- Réponse : −1/(2·x0)
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 2·x0 → « pente de la tangente » ; −2·x0 → « opposé sans inverse ».
- Explication de la solution : la tangente a pour pente 2{x0} ; la normale, perpendiculaire, a pour pente −1/(2{x0}).
- Inspiré de : formule (3.22) p. 75, exemple 3.10.

### c4-sommet — Point critique d'une parabole
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : En quelle abscisse la fonction f(x) = {a}x² + {b}x + {c} atteint-elle son extremum ?
- Paramètres : a entier non nul de −5 à 5 ; t entier de −5 à 5 ; b = −2a·t ; c entier de −9 à 9.
- Réponse : −b/(2a) (= t)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : b/(2a) → « signe oublié » ; −b/a → « facteur 2 oublié ».
- Explication de la solution : f'(x) = 2{a}x + {b} = 0 donne x = −{b}/(2{a}).
- Inspiré de : exemple 3.11 (p. 78).

### c4-cubique — Minimum local d'une cubique
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Soit f(x) = x³ − {k}x + {q} avec k = 3p². Quelle est la valeur du minimum local de f ?
- Paramètres : p ∈ {1, 2, 3} ; k = 3p² ; q entier de −10 à 10.
- Réponse : f(p) = −2p³ + q
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 2p³ + q → « valeur du maximum local (en −p) » ; p → « abscisse au lieu de la valeur ».
- Explication de la solution : f'(x) = 3x² − 3p² = 3(x − p)(x + p) ; f' passe de − à + en p, donc minimum f(p) = p³ − 3p³ + {q}.
- Inspiré de : exemple 3.14 (p. 80 : p = 2, q = −5 donne −21).

### c4-nature — Nature d'un point critique
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : On sait que f'(c) = 0 et f''(c) = {s}. Que peut-on dire ?
- Paramètres : s entier de −5 à 5.
- Réponse : s > 0 : minimum local ; s < 0 : maximum local ; s = 0 : on ne peut pas conclure.
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : l'option opposée (min ↔ max) ; « point d'inflexion certain » quand s = 0.
- Explication de la solution : f'' > 0 : courbe en bol, donc minimum ; f'' < 0 : dôme, donc maximum ; f'' = 0 : il faut une étude plus fine (ex. x⁴ et x³ en 0).
- Inspiré de : théorème 3.7 (p. 81), exemple 3.15.

### c4-rectangle — Aire maximale avec un fil
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Avec un fil de {P} cm on forme un rectangle. Quelle est l'aire maximale possible (en cm²) ?
- Paramètres : P multiple de 4 entre 8 et 80.
- Réponse : P²/16
- Vérification : égalité exacte (tolérance ±0,01).
- Distracteurs (QCM) ou erreurs typiques (numérique) : P²/4 → « côté P/2 » ; P/4 → « côté au lieu de l'aire ».
- Explication de la solution : x + y = {P}/2, A = x({P}/2 − x), maximale pour x = {P}/4 : carré d'aire ({P}/4)².
- Inspiré de : exemple 3.16 (p. 82).

### c4-boite — Boîte de volume maximal
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Dans une plaque carrée de côté {L} cm, on découpe un carré de côté x à chaque coin pour former une boîte ouverte. Quel est le volume maximal (en cm³) ?
- Paramètres : L ∈ {6, 12, 18, 24, 30}.
- Réponse : V(L/6) = 2L³/27 (valeurs 16 ; 128 ; 432 ; 1024 ; 2000)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : L/6 → « hauteur au lieu du volume » ; V(L/2) = 0 → « mauvaise racine de V' ».
- Explication de la solution : V(x) = x({L} − 2x)², V'(x) = ({L} − 2x)({L} − 6x) ; la racine utile est x = {L}/6.
- Inspiré de : exemple 3.17 (p. 83).

### c4-hospital — Règle de L'Hospital
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Calcule lim_{x→0} (e^({a}x) − 1)/sin({b}x) (arrondi à 0,01).
- Paramètres : a, b entiers de 1 à 9.
- Réponse : a/b
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 1 → « facteurs oubliés en dérivant » ; b/a.
- Explication de la solution : forme 0/0 ; dérivées : {a}e^({a}x) et {b}cos({b}x), qui valent {a} et {b} en 0.
- Inspiré de : exercice 3.11 (p. 105), théorème 3.12.

### c4-taf — Accroissements finis
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Pour f(x) = x² sur [{a} ; {b}], trouve le réel c tel que f(b) − f(a) = (b − a) f'(c).
- Paramètres : a, b entiers de −6 à 6, a < b.
- Réponse : c = (a + b)/2
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a + b → « oubli de f'(c) = 2c ».
- Explication de la solution : (b² − a²)/(b − a) = a + b = f'(c) = 2c, donc c = ({a} + {b})/2.
- Inspiré de : théorème 3.10 (p. 84), exercice 3.21.

---

# Chapitre : Développements limités
Source : §3.5.2-3.5.4 (p. 87-103, PDF 93-109) ; exercices 3.24 à 3.45 (p. 108-112).
Niveau visé : tu écris les DL usuels en 0, tu les combines (somme, produit, quotient, composée), tu les utilises pour calculer des limites et pour placer une courbe par rapport à sa tangente ou à une asymptote.
Prérequis : Dérivées, Étude de fonctions (L'Hospital).

## Explication pour un novice
Près d'un point, une fonction compliquée ressemble à un polynôme. C'est comme regarder la Terre depuis ton jardin : elle paraît plate (approximation d'ordre 1, la tangente) ; en regardant plus loin, tu vois qu'elle est courbe (ordre 2), et ainsi de suite. Un développement limité (DL) à l'ordre n, c'est le meilleur polynôme de degré n qui colle à la fonction près du point.

La formule de Taylor donne les coefficients : f(x) ≈ f(a) + f'(a)(x − a) + f''(a)(x − a)²/2! + … En 0 (formule de Mac Laurin), on obtient les DL qu'il faut connaître par cœur : eˣ = 1 + x + x²/2 + x³/6 + …, sin x = x − x³/6 + …, cos x = 1 − x²/2 + …, ln(1 + x) = x − x²/2 + x³/3 − …

On n'a pas besoin de dériver à chaque fois : on combine les DL connus comme des briques (additionner, multiplier en coupant au bon degré, remplacer x par 2x, etc.).

L'usage principal : lever les formes indéterminées. Si tu dois calculer (1 − cos x)/x² en 0, tu remplaces 1 − cos x par x²/2 + (reste) et le quotient tend vers 1/2. Un DL dit aussi si la courbe est au-dessus ou au-dessous de sa tangente : c'est le signe du premier terme après la tangente.

## Notions (dans l'ordre d'apprentissage)
- Fonction de classe Cⁿ : dérivable n fois avec dérivées continues | f ∈ Cⁿ(I) (déf. 3.16).
- Formule de Taylor-Lagrange : polynôme + reste exact | f(b) = Σₖ f⁽ᵏ⁾(a)(b − a)ᵏ/k! + f⁽ⁿ⁺¹⁾(c)(b − a)ⁿ⁺¹/(n + 1)! (théorème 3.13).
- Formule de Taylor-Young : polynôme + reste négligeable | f(x) = Σₖ f⁽ᵏ⁾(x₀)(x − x₀)ᵏ/k! + (x − x₀)ⁿ ε(x − x₀) (théorème 3.14).
- Mac Laurin : Taylor en 0 | f(x) = f(0) + f'(0)x + f''(0)x²/2! + …
- Développement limité d'ordre n : approximation polynomiale | f(x) = a₀ + a₁(x − x₀) + … + aₙ(x − x₀)ⁿ + o((x − x₀)ⁿ) (déf. 3.17).
- Unicité du DL : un seul DL par ordre | théorème 3.15.
- DL usuels en 0 : le catalogue | eˣ = Σ xᵏ/k! ; sin x = x − x³/3! + x⁵/5! ; cos x = 1 − x²/2! + x⁴/4! ; ln(1 + x) = x − x²/2 + x³/3 ; (1 + x)ᵐ = 1 + mx + m(m − 1)x²/2 + … ; 1/(1 − x) = 1 + x + x² + …
- Opérations sur les DL : construire de nouveaux DL | somme, produit (tronqué), quotient, composée (si g(0) = 0), dérivation, intégration.
- Parité et DL : | fonction paire : puissances paires seulement ; impaire : puissances impaires.
- DL généralisé et en l'infini : | poser t = 1/x et développer en t → 0.
- Équivalents : même comportement au voisinage | f ~ g si f/g → 1 ; sin x ~ x, ln(1 + x) ~ x, 1 − cos x ~ x²/2.
- Position par rapport à la tangente : signe du terme suivant | f(x) − (tangente) ~ γ(x − a)².
- Asymptote oblique : DL en l'infini | f(x) = ax + b + c/x + … ⇒ asymptote y = ax + b.

## Méthodes
### Obtenir un DL par composition (cas e^(ax), cos(ax)…)
1. Pars du DL usuel en u.
2. Remplace u par ax (ou une autre expression qui tend vers 0).
3. Développe et garde les termes jusqu'à l'ordre voulu.

### Multiplier deux DL
1. Écris chaque DL au même ordre n.
2. Multiplie comme deux polynômes.
3. Supprime tous les termes de degré > n.

### Calculer une limite 0/0 par DL
1. Développe numérateur et dénominateur jusqu'au premier terme non nul.
2. Remplace chacun par ce terme (équivalent).
3. Simplifie le quotient des deux termes.

### Position de la courbe par rapport à sa tangente en a
1. Écris le DL : f(x) = α + β(x − a) + γ(x − a)² + …
2. La tangente est y = α + β(x − a).
3. Si γ > 0 : courbe au-dessus ; γ < 0 : au-dessous ; si γ = 0 et terme suivant en (x − a)³ : point d'inflexion.

## Exemples résolus
### DL₃(0) de eˣ/√(1 + x) (exemple 3.20)
- eˣ = 1 + x + x²/2 + x³/6 + o(x³) — DL usuel.
- 1/√(1 + x) = 1 − x/2 + 3x²/8 − 5x³/16 + o(x³) — (1 + x)ᵐ avec m = −1/2.
- Produit tronqué à l'ordre 3 : 1 + x/2 + 3x²/8 − x³/48 + o(x³).

### DL de tan x à l'ordre 4 (exemple 3.21)
- tan x = sin x / cos x = (x − x³/6)/(1 − x²/2 + x⁴/24) — quotient.
- Par identification : tan x = x + x³/3 + o(x⁴).

### lim_{x→0} (1 − cos ax)/(ch bx − 1) (exemple 3.32)
- 1 − cos ax = a²x²/2 + o(x²) ; ch bx − 1 = b²x²/2 + o(x²).
- Quotient → (a²/2)/(b²/2) = a²/b².

### Position de sin x par rapport à sa tangente en 0 (exemple 3.38)
- sin x = x − x³/6 + o(x⁴) ; tangente y = x.
- sin x − x ~ −x³/6 change de signe en 0 : point d'inflexion ; courbe au-dessus pour x < 0, au-dessous pour x > 0.

## Pièges fréquents
- Mélanger des DL d'ordres différents → mets tous les morceaux au même ordre avant de combiner.
- Composer f(g(x)) avec g(0) ≠ 0 → la substitution n'est valable que si g(0) = 0 (exemple 3.22 : on passe par 1 − cos x).
- Garder des termes de degré trop élevé après un produit → ils ne sont pas fiables : tronque.
- Oublier les factorielles → x³/3! = x³/6, pas x³/3 (sauf pour ln, qui n'a pas de factorielles).
- Additionner des équivalents → f ~ g et f₁ ~ g₁ n'impliquent pas f + f₁ ~ g + g₁ (théorème 3.16).
- Perdre un ordre en divisant par x → recommence avec un DL d'ordre plus élevé.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| DL de eˣ en 0 à l'ordre 3 ? | 1 + x + x²/2 + x³/6 + o(x³). |
| DL de sin x en 0 à l'ordre 3 ? | x − x³/6 + o(x³). |
| DL de cos x en 0 à l'ordre 4 ? | 1 − x²/2 + x⁴/24 + o(x⁴). |
| DL de ln(1 + x) en 0 à l'ordre 3 ? | x − x²/2 + x³/3 + o(x³). |
| DL de 1/(1 − x) en 0 ? | 1 + x + x² + … + xⁿ + o(xⁿ). |
| DL de (1 + x)ᵐ à l'ordre 2 ? | 1 + mx + m(m − 1)x²/2 + o(x²). |
| DL de tan x à l'ordre 3 ? | x + x³/3 + o(x³). |
| DL de arctan x à l'ordre 3 ? | x − x³/3 + o(x³). |
| DL de ch x à l'ordre 2 ? | 1 + x²/2 + o(x²). |
| Formule de Taylor-Young en 0 (Mac Laurin) ? | f(x) = Σ f⁽ᵏ⁾(0)xᵏ/k! + o(xⁿ). |
| Coefficient aₖ d'un DL en x₀ ? | f⁽ᵏ⁾(x₀)/k!. |
| DL d'une fonction paire ? | Seulement des puissances paires. |
| Condition pour composer f(g(x)) en 0 ? | g(0) = 0. |
| Équivalent de 1 − cos x en 0 ? | x²/2. |
| Équivalent de sin x et ln(1 + x) en 0 ? | x tous les deux. |
| Courbe au-dessus de sa tangente si… ? | Le terme γ(x − a)² du DL a γ > 0. |
| Comment faire un DL en +∞ ? | Poser t = 1/x et développer en t → 0. |
| f(x) = ax + b + c/x + o(1/x) en +∞ donne ? | Asymptote y = ax + b, position selon le signe de c. |

## Exercices générables
### c5-coef-exp — Coefficient du DL de e^(ax)
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Quel est le coefficient de x^{k} dans le DL en 0 de e^({a}x) ? (arrondi à 0,001)
- Paramètres : a entier de 1 à 3 ; k entier de 1 à 3.
- Réponse : a^k / k!
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 1/k! → « a oublié » ; a^k → « factorielle oubliée » ; a/k!.
- Explication de la solution : eᵘ = Σ uᵏ/k! avec u = {a}x ; le terme en x^{k} est {a}^{k} x^{k}/{k}!.
- Inspiré de : DL usuel 1 (p. 90), exercice 3.24.

### c5-coef-cos — Coefficient du DL de cos(ax)
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Quel est le coefficient de x² dans le DL en 0 de cos({a}x) ?
- Paramètres : a entier de 1 à 6.
- Réponse : −a²/2
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : −1/2 → « a oublié » ; a²/2 → « signe oublié ».
- Explication de la solution : cos u = 1 − u²/2 + … avec u = {a}x, donc −{a}²x²/2.
- Inspiré de : DL usuel 3 (p. 90).

### c5-coef-ln — Coefficient du DL de ln(1 + ax)
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Quel est le coefficient de x^{k} dans le DL en 0 de ln(1 + {a}x) ? (arrondi à 0,001)
- Paramètres : a entier non nul de −3 à 3 ; k ∈ {2, 3}.
- Réponse : (−1)^(k+1) a^k / k (soit −a²/2 ou a³/3)
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a^k/k! → « factorielle à tort » ; signe opposé → « alternance oubliée ».
- Explication de la solution : ln(1 + u) = u − u²/2 + u³/3 − … avec u = {a}x.
- Inspiré de : DL usuel 4 (p. 90), exercice 3.24.

### c5-binome — Coefficient de (1 + x)ᵐ
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Quel est le coefficient de x² dans le DL en 0 de (1 + x)^{m} ?
- Paramètres : m ∈ {−1 ; −1/2 ; 1/2 ; 2 ; 3}.
- Réponse : m(m − 1)/2 (valeurs 1 ; 3/8 ; −1/8 ; 1 ; 3)
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : m(m − 1) → « oubli du 2! » ; m²/2.
- Explication de la solution : (1 + x)ᵐ = 1 + mx + m(m − 1)x²/2! + … avec m = {m}.
- Inspiré de : DL usuel 7 (p. 90), exemple 3.20.

### c5-produit — Produit de DL
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Quel est le coefficient de x² dans le DL en 0 de eˣ × (1 + {a}x + {b}x²) ?
- Paramètres : a, b entiers de −5 à 5.
- Réponse : 1/2 + a + b
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : b + 1/2 → « terme croisé a·x × x oublié » ; a·b.
- Explication de la solution : (1 + x + x²/2)(1 + {a}x + {b}x²) : les termes en x² sont x²/2, {a}x × x et {b}x².
- Inspiré de : opération 2 (produit) p. 91, exemple 3.20.

### c5-approx — Valeur approchée par DL
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Avec le DL d'ordre 2 de e^h, donne une valeur approchée de e^{h}.
- Paramètres : h ∈ {−0,1 ; 0,05 ; 0,1 ; 0,2}.
- Réponse : 1 + h + h²/2 (valeurs 0,905 ; 1,05125 ; 1,105 ; 1,22)
- Vérification : tolérance ±0,0001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 1 + h → « ordre 1 seulement » ; 1 + h + h² → « factorielle oubliée ».
- Explication de la solution : e^h ≈ 1 + {h} + {h}²/2.
- Inspiré de : §3.5.3 (p. 89), §6.3.2 b) applications.

### c5-limite-cos-ch — Limite par équivalents
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Calcule lim_{x→0} (1 − cos({a}x))/(ch({b}x) − 1) (arrondi à 0,01).
- Paramètres : a, b entiers de 1 à 6.
- Réponse : a²/b²
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a/b → « carrés oubliés » ; −a²/b² → « erreur de signe sur 1 − cos ».
- Explication de la solution : 1 − cos({a}x) ~ {a}²x²/2 et ch({b}x) − 1 ~ {b}²x²/2.
- Inspiré de : exemple 3.32 (p. 98).

### c5-limite-exp — Limite d'ordre 2
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Calcule lim_{x→0} (e^({a}x) − 1 − {a}x)/x².
- Paramètres : a entier de −4 à 4, a ≠ 0.
- Réponse : a²/2
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 0 → « DL à l'ordre 1 seulement » ; a² → « 2! oublié ».
- Explication de la solution : e^({a}x) = 1 + {a}x + {a}²x²/2 + o(x²) ; le numérateur vaut {a}²x²/2 + o(x²).
- Inspiré de : exercice 3.43.8 (p. 112), §3.5.4 b).

### c5-taylor-point — DL en un point x₀ ≠ 0
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : On écrit le DL de f(x) = x³ en x₀ = {a} à l'ordre 2 : f(x) = c₀ + c₁(x − {a}) + c₂(x − {a})² + … Que vaut c₂ ?
- Paramètres : a entier de −4 à 4, a ≠ 0.
- Réponse : f''(a)/2 = 3a
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 6a → « oubli de diviser par 2! » ; 3a² → « c₁ au lieu de c₂ ».
- Explication de la solution : f''(x) = 6x donc c₂ = f''({a})/2! = 6{a}/2.
- Inspiré de : exercice 3.32.2 (p. 109).

### c5-position — Position par rapport à la tangente
- Niveau : 3
- Forme : `qcm`
- Énoncé gabarit : Au voisinage de a, f(x) = {alpha} + {beta}(x − a) + {gamma}(x − a)² + {delta}(x − a)³ + o((x − a)³). Où est la courbe par rapport à sa tangente en a ?
- Paramètres : alpha, beta entiers de −5 à 5 ; gamma entier de −3 à 3 ; delta entier non nul de −3 à 3.
- Réponse : gamma > 0 : au-dessus ; gamma < 0 : au-dessous ; gamma = 0 : point d'inflexion (elle traverse la tangente).
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : la position opposée ; « on regarde le signe de beta » → « confusion pente / courbure ».
- Explication de la solution : f(x) − tangente = {gamma}(x − a)² + … ; si gamma ≠ 0 son signe décide ; sinon le terme en (x − a)³ change de signe : inflexion.
- Inspiré de : §3.5.4 c) (p. 101), exemple 3.38, exercice 3.28.

---

# Chapitre : Suites numériques
Source : §6.1 (p. 192-200, PDF 198-206) ; exercices 6.1, 6.2 (p. 211-212).
Niveau visé : tu calcules des termes, la limite d'une suite (y compris définie par récurrence), tu reconnais une suite bornée, monotone, convergente, et tu connais les limites usuelles.
Prérequis : Limites et continuité ; règle de L'Hospital.

## Explication pour un novice
Une suite, c'est une liste infinie de nombres numérotés : u₀, u₁, u₂… Le cours prend l'image d'une tige de longueur L₀ qu'on coupe en deux, puis encore en deux : les longueurs L₀, L₀/2, L₀/4… forment une suite. On peut la donner par une formule (uₙ = 1/2ⁿ) ou par une règle de passage d'un terme au suivant (récurrence).

La grande question : que se passe-t-il quand n devient immense ? Si les termes s'approchent d'un nombre A, la suite converge vers A ; sinon elle diverge (elle part à l'infini ou oscille, comme (−1)ⁿ).

Pour calculer une limite, on raisonne comme pour les fonctions, avec n à la place de x. Si une fonction f a une limite en +∞, la suite f(n) a la même limite. Attention, la réciproque est fausse : cos(2πn) vaut toujours 1 alors que cos(2πx) oscille.

Pour une suite définie par récurrence uₙ₊₁ = g(uₙ), si elle converge, sa limite ℓ vérifie ℓ = g(ℓ) : c'est un « point fixe », comme une balle qui finit par s'immobiliser au fond d'un bol. Un résultat clé : une suite croissante et majorée converge forcément (elle monte mais ne peut pas dépasser un plafond).

## Notions (dans l'ordre d'apprentissage)
- Suite numérique : une liste infinie numérotée | n ∈ ℕ ↦ uₙ ∈ ℝ (déf. 6.1).
- Terme général : la formule de uₙ | ex. uₙ = 1/2ⁿ.
- Suite convergente : les termes s'approchent d'une limite finie | ∀ε > 0, ∃N : n > N ⇒ |uₙ − A| < ε (déf. 6.2).
- Suite divergente : pas de limite finie | ex. uₙ = n, uₙ = (−1)ⁿ.
- Unicité de la limite : | une suite convergente a une seule limite (théorème 6.4).
- Lien avec les fonctions : | si lim_{x→+∞} f(x) = L, alors lim f(n) = L (théorème 6.1).
- Suite définie par récurrence : chaque terme dépend du précédent | uₙ₊₁ = g(uₙ), u₀ donné.
- Point fixe : limite possible d'une récurrence | si uₙ → ℓ et g continue, ℓ = g(ℓ).
- Suite bornée : coincée entre deux nombres | ∃K > 0 : |uₙ| ≤ K pour tout n.
- Suite monotone : toujours dans le même sens | croissante si uₙ ≤ uₙ₊₁.
- Théorème de convergence monotone : | toute suite monotone et bornée converge.
- Gendarmes pour les suites : | aₙ ≤ cₙ ≤ bₙ et aₙ, bₙ → L ⇒ cₙ → L (théorème 6.6).
- Suite de Cauchy : termes de plus en plus proches entre eux | ∀ε, ∃N : n, m > N ⇒ |uₙ − uₘ| < ε (théorème 6.3).
- Limites usuelles : | ln n / n → 0 ; n^(1/n) → 1 ; x^(1/n) → 1 (x > 0) ; xⁿ → 0 si |x| < 1 ; (1 + x/n)ⁿ → eˣ ; xⁿ/n! → 0.

## Méthodes
### Calculer la limite d'une suite donnée par une formule
1. Repère le terme dominant (puissance la plus haute, exponentielle…).
2. Mets-le en facteur, ou utilise une fonction f avec uₙ = f(n) et ses limites.
3. Pour les formes ∞/∞ difficiles, passe par L'Hospital sur f.

### Étudier une suite récurrente uₙ₊₁ = g(uₙ)
1. Calcule quelques termes pour voir le comportement.
2. Si elle converge vers ℓ, résous l'équation ℓ = g(ℓ).
3. Garde la solution compatible (par exemple positive si tous les termes sont positifs).

### Trouver un rang N pour une précision ε
1. Écris |uₙ − A| < ε.
2. Résous en n : tu obtiens n > (quelque chose).
3. N est ce « quelque chose » (ou sa partie entière).

## Exemples résolus
### Limite de uₙ = (n + 1)/n (exemple 6.2)
- uₙ = 1 + 1/n → 1 — 1/n tend vers 0.
- |uₙ − 1| = 1/n < ε dès que n > 1/ε : pour ε = 0,1, N = 10.

### Limite de (n + 1)/eⁿ (exemple 6.3)
- f(x) = (x + 1)/eˣ, forme ∞/∞ ; L'Hospital : 1/eˣ → 0.
- Donc (n + 1)/eⁿ → 0.

### Suite uₙ₊₁ = √(12 + uₙ) (§6.1.2)
- Si uₙ → ℓ > 0 : ℓ = √(12 + ℓ), donc ℓ² − ℓ − 12 = 0.
- Δ = 49 ; ℓ = (1 + 7)/2 = 4 (on rejette −3, négatif).

### sin(n)/n² → 0 (exemple 6.6)
- −1/n² ≤ sin n / n² ≤ 1/n² — sin est entre −1 et 1.
- Les deux bornes tendent vers 0 : gendarmes.

## Pièges fréquents
- Croire que si uₙ = f(n) converge, alors f(x) converge → faux : cos(2πn) = 1 mais cos(2πx) oscille (exemple 6.4).
- Écrire « borné donc convergent » → (−1)ⁿ est bornée mais diverge ; il faut monotone ET bornée.
- Garder une solution négative du point fixe pour une suite positive → choisis la racine compatible.
- (1 + 1/n)ⁿ → 1 → non, c'est une forme 1^∞ qui tend vers e.
- Oublier que n est un entier → les limites se calculent en n → +∞ uniquement.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu'est-ce qu'une suite ? | Une liste infinie de nombres numérotés u₀, u₁, u₂… |
| Suite convergente ? | Ses termes s'approchent d'une limite finie A. |
| Définition formelle de uₙ → A ? | ∀ε > 0, ∃N : n > N ⇒ \|uₙ − A\| < ε. |
| Une suite peut-elle avoir deux limites ? | Non, la limite est unique. |
| (−1)ⁿ converge-t-elle ? | Non : bornée mais oscillante. |
| Monotone et bornée implique ? | Convergente. |
| Convergente implique ? | Bornée (la réciproque est fausse). |
| Limite d'une récurrence uₙ₊₁ = g(uₙ) ? | Un point fixe ℓ = g(ℓ) (si g continue). |
| lim ln n / n ? | 0. |
| lim n^(1/n) ? | 1. |
| lim xⁿ si \|x\| < 1 ? | 0. |
| lim (1 + x/n)ⁿ ? | eˣ. |
| lim xⁿ / n! ? | 0 pour tout x. |
| lim (1 + 1/n)ⁿ ? | e ≈ 2,718. |
| Limite de 2ⁿ ? | +∞ (suite non bornée). |
| Théorème des gendarmes pour les suites ? | aₙ ≤ cₙ ≤ bₙ avec aₙ, bₙ → L ⇒ cₙ → L. |
| Limite de la suite de Héron uₙ₊₁ = (uₙ + α/uₙ)/2 ? | √α. |

## Exercices générables
### c11-terme — Calcul d'un terme
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Soit uₙ = ({a}n + {b})/(n + {c}). Calcule u_{k} (arrondi à 0,01).
- Paramètres : a, b entiers de −5 à 5 ; c entier de 1 à 5 ; k entier de 0 à 10.
- Réponse : (a·k + b)/(k + c)
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : (a·k + b)/k → « c oublié ».
- Explication de la solution : on remplace n par {k}.
- Inspiré de : exemple 6.1 (p. 193).

### c11-rationnelle — Limite d'une suite rationnelle
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule lim_{n→∞} ({a}n² + {b}n + {c})/({d}n² + {e}) (arrondi à 0,01).
- Paramètres : a, d entiers non nuls de −9 à 9 ; b, c, e entiers de −9 à 9.
- Réponse : a/d
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : c/e → « limite en 0 ».
- Explication de la solution : on factorise n² en haut et en bas : ({a} + …)/({d} + …) → {a}/{d}.
- Inspiré de : exercice 6.2.2 (p. 212).

### c11-geometrique — Limite de qⁿ
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : Quelle est la limite de ({q})ⁿ quand n → ∞ ?
- Paramètres : q ∈ {−2 ; −1 ; −0,5 ; 0,3 ; 0,9 ; 1 ; 1,5 ; 3}.
- Réponse : 0 si |q| < 1 ; 1 si q = 1 ; +∞ si q > 1 ; pas de limite si q ≤ −1.
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : les autres cas ; « +∞ » pour q = −2 → « signe alterné oublié ».
- Explication de la solution : si |q| < 1, les puissances rétrécissent ; si q > 1 elles explosent ; si q ≤ −1 le signe alterne sans se stabiliser.
- Inspiré de : limite usuelle 4 (p. 200), série géométrique (p. 202).

### c11-rang — Rang à partir duquel on est proche
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Pour uₙ = 1/n², à partir de quel rang N a-t-on 1/n² < 10^(−{d}) pour tout n > N ?
- Paramètres : p entier de 1 à 3 ; d = 2p.
- Réponse : N = 10^p
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 10^d → « racine carrée oubliée ».
- Explication de la solution : 1/n² < 10^(−{d}) ⇔ n² > 10^{d} ⇔ n > 10^(d/2).
- Inspiré de : exercice 6.1 (p. 211), exemple 6.2.

### c11-point-fixe — Limite d'une récurrence avec racine
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : La suite u₀ = 0, uₙ₊₁ = √({k} + uₙ) converge. Quelle est sa limite ?
- Paramètres : m entier de 2 à 6 ; k = m(m − 1) (soit 2, 6, 12, 20, 30).
- Réponse : ℓ = (1 + √(1 + 4k))/2 (= m)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : √k → « point fixe mal posé (ℓ = √k) » ; 1 − m → « racine négative ».
- Explication de la solution : ℓ = √({k} + ℓ) ⇒ ℓ² − ℓ − {k} = 0 ⇒ ℓ = (1 + √(1 + 4{k}))/2, la racine positive.
- Inspiré de : §6.1.2 (p. 197, cas k = 12 → 4).

### c11-heron — Suite de Héron
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : La suite u₁ = 1, uₙ₊₁ = (uₙ + {alpha}/uₙ)/2 converge. Quelle est sa limite ? (arrondi à 0,001)
- Paramètres : alpha ∈ {2, 3, 4, 9, 16, 25}.
- Réponse : √alpha
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : alpha/2 → « point fixe mal résolu » ; −√alpha.
- Explication de la solution : L = (L + {alpha}/L)/2 ⇒ 2L² = L² + {alpha} ⇒ L = √{alpha} (positive).
- Inspiré de : §6.1.2 (p. 197).

### c11-exp — Limite (1 + a/n)^(bn)
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : La limite de (1 + {a}/n)^({b}n) s'écrit e^m. Que vaut m ?
- Paramètres : a, b entiers non nuls de −4 à 4.
- Réponse : m = a·b
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a → « exposant b oublié » ; 0 → « 1^∞ = 1 ».
- Explication de la solution : (1 + {a}/n)^({b}n) = ((1 + {a}/n)ⁿ)^{b} → (e^{a})^{b}.
- Inspiré de : limite usuelle 5 (p. 200), exercice 6.2.4.

### c11-usuelles — Limites usuelles
- Niveau : 2
- Forme : `qcm`
- Énoncé gabarit : Quelle est la limite de {suite} quand n → ∞ ?
- Paramètres : suite ∈ {ln n / n → 0 ; n^(1/n) → 1 ; 2^(1/n) → 1 ; 3ⁿ/n! → 0 ; (1 + 1/n)ⁿ → e ; n/2ⁿ → 0}.
- Réponse : la limite associée.
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : +∞, 0, 1, e (les autres valeurs de la liste).
- Explication de la solution : on rappelle la limite usuelle et son argument (ln, L'Hospital, ou factorielle plus forte que l'exponentielle).
- Inspiré de : §6.1.5 (p. 199-200).

---

# Chapitre : Primitives et intégrales
Source : §4.1-4.3 (p. 113-138, PDF 119-144), annexe C (p. 224-229) ; exercices 4.1 à 4.8 et 4.17 à 4.25 (p. 149-154).
Niveau visé : tu trouves des primitives (usuelles, par changement de variable, par parties, fractions rationnelles simples, fonctions trigonométriques) et tu calcules des intégrales définies avec la formule de Newton-Leibniz.
Prérequis : Dérivées ; fonctions usuelles (exp, ln, trigonométrie, arctan).

## Explication pour un novice
Intégrer, c'est faire le chemin inverse de la dérivée. Si la dérivée est le compteur de vitesse, la primitive est le compteur kilométrique : connaissant la vitesse à chaque instant, on retrouve la distance parcourue. Une primitive F de f est une fonction dont la dérivée est f : F' = f.

Il y a toujours une infinité de primitives : x², x² + 5, x² − 405 ont toutes pour dérivée 2x. Elles diffèrent d'une constante C (comme deux compteurs kilométriques qui n'ont pas été remis à zéro le même jour). On écrit ∫ f(x) dx = F(x) + C.

L'intégrale définie ∫ₐᵇ f(x) dx est l'aire sous la courbe entre a et b (comptée négativement sous l'axe). Le cours la construit en découpant l'aire en fines bandes rectangulaires de largeur Δx et en faisant tendre leur largeur vers 0 (sommes de Riemann). Le signe ∫ est un S allongé : une Somme de petits morceaux f(x)·dx.

Le pont entre les deux idées est la formule de Newton-Leibniz : ∫ₐᵇ f(x) dx = F(b) − F(a). Pour calculer une aire, il suffit donc de trouver une primitive.

Quand la primitive n'est pas dans le catalogue, on a deux outils principaux : le changement de variable (on renomme un morceau pour reconnaître une forme connue) et l'intégration par parties (on échange la difficulté entre deux facteurs d'un produit).

## Notions (dans l'ordre d'apprentissage)
- Primitive : une fonction dont la dérivée est f | F'(x) = f(x) sur l'intervalle (déf. 4.1).
- Constante d'intégration : | deux primitives de f diffèrent d'une constante (théorème 4.1).
- Intégrale indéfinie : toutes les primitives | ∫ f(x) dx = F(x) + C (déf. 4.2).
- Primitives usuelles : le catalogue | ∫ xⁿ dx = xⁿ⁺¹/(n + 1) (n ≠ −1) ; ∫ dx/x = ln|x| ; ∫ e^(ax) dx = e^(ax)/a ; ∫ sin ax dx = −cos(ax)/a ; ∫ cos ax dx = sin(ax)/a ; ∫ dx/(a² + x²) = (1/a) arctan(x/a) ; ∫ dx/√(a² − x²) = arcsin(x/a).
- Linéarité : | ∫ (αf + βg) = α∫f + β∫g.
- Primitive de f(αx + β) : | (1/α) F(αx + β) + C.
- Changement de variable : renommer pour simplifier | ∫ f(u(t)) u'(t) dt = ∫ f(x) dx avec x = u(t).
- Intégration par parties : | ∫ u dv = uv − ∫ v du (éq. 4.4).
- Décomposition en éléments simples : couper une fraction rationnelle | P/Q = R + Σ A/(x − a)ᵏ + Σ (Ax + B)/(x² + px + q)ᵏ.
- Changement t = tan(x/2) : fractions en sin, cos | sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²), dx = 2dt/(1 + t²).
- Somme de Riemann : aire approchée par rectangles | Σ f(cᵢ) Δxᵢ (éq. 4.9).
- Intégrale définie : limite des sommes de Riemann | ∫ₐᵇ f(x) dx = lim Σ f(cᵢ)Δxᵢ (déf. 4.4).
- Propriétés : | ∫ₐᵃ f = 0 ; ∫ₐᵇ = −∫ᵦᵃ ; Chasles ∫ₐᵇ = ∫ₐᶜ + ∫꜀ᵇ ; f ≥ 0 ⇒ ∫ ≥ 0.
- Valeur moyenne : hauteur du rectangle de même aire | ⟨f⟩ = (1/(b − a)) ∫ₐᵇ f(x) dx (déf. 4.5).
- Formule de Newton-Leibniz : | ∫ₐᵇ f(x) dx = F(b) − F(a) (éq. 4.20).
- Intégrale fonction de sa borne : | F(x) = ∫ₐˣ f(t) dt est la primitive de f qui s'annule en a.

## Méthodes
### Calculer une intégrale définie
1. Trouve une primitive F de f (sans la constante).
2. Calcule F(b) − F(a).
3. Contrôle le signe : si f ≥ 0 sur [a ; b], le résultat doit être ≥ 0.

### Changement de variable
1. Repère une fonction u(x) dont la dérivée u'(x) apparaît (à une constante près).
2. Pose t = u(x), donc dt = u'(x) dx.
3. Réécris tout en t (et change les bornes pour une intégrale définie).
4. Intègre en t, puis reviens en x si l'intégrale est indéfinie.

### Intégration par parties
1. Choisis u (à dériver) et dv (à intégrer) : u = polynôme ou ln, dv = eˣ, sin, cos…
2. Calcule du = u' dx et v.
3. Applique ∫ u dv = uv − ∫ v du.
4. Si nécessaire, recommence (exemple 4.10 : deux fois).

### Intégrer une fraction rationnelle
1. Si le degré du numérateur ≥ celui du dénominateur, fais la division euclidienne.
2. Factorise le dénominateur.
3. Décompose en éléments simples et identifie les coefficients.
4. Intègre chaque morceau (ln, puissance, arctan).

### Intégrer sinᵐ x cosⁿ x
1. Si une puissance est impaire : sors un facteur et pose t = cos x (ou sin x).
2. Si les deux sont paires et positives : linéarise avec sin² x = (1 − cos 2x)/2, cos² x = (1 + cos 2x)/2.
3. Produits sin mx cos nx : transforme en somme avec les formules de l'annexe A.

## Exemples résolus
### ∫ x/(1 + x²) dx (exemple 4.7)
- Pose t = 1 + x², dt = 2x dx, donc x dx = dt/2 — la dérivée de t apparaît.
- ∫ (1/2) dt/t = (1/2) ln t + C = (1/2) ln(1 + x²) + C.

### ∫ x eˣ dx (exemple 4.9)
- u = x (du = dx), dv = eˣ dx (v = eˣ) — on dérive le polynôme.
- ∫ x eˣ dx = x eˣ − ∫ eˣ dx = (x − 1)eˣ + C.

### ∫₀¹ x eˣ dx (exemple 4.32)
- [(x − 1)eˣ]₀¹ = (0)e − (−1)e⁰ = 1.

### ∫₀ᵃ √(a² − x²) dx (exemple 4.31)
- x = a sin t, dx = a cos t dt ; bornes 0 → 0, a → π/2.
- ∫₀^(π/2) a² cos² t dt = (a²/2)[t + sin(2t)/2]₀^(π/2) = πa²/4 (le quart de l'aire du disque).

### ∫ sin⁴ x dx (exemple 4.27)
- sin⁴ x = ((1 − cos 2x)/2)² = (1/4)(1 − 2cos 2x + (1 + cos 4x)/2) — linéarisation.
- Primitive : (1/4)(3x/2 − sin 2x + sin(4x)/8) + C.

## Pièges fréquents
- Oublier la constante C dans une intégrale indéfinie → toute primitive est définie à une constante près.
- ∫ dx/x = x⁰/0 → la formule xⁿ⁺¹/(n + 1) ne marche pas pour n = −1 : la primitive est ln|x|.
- Changer de variable sans changer les bornes → pour une intégrale définie, les bornes passent en t.
- Mal choisir u et dv en IPP → avec u = cos x et dv = x dx, on obtient une intégrale plus difficile (avertissement p. 119).
- Oublier le facteur 1/a dans ∫ e^(ax) dx ou ∫ cos(ax) dx → dérive ton résultat pour vérifier.
- Confondre aire et intégrale quand f change de signe → l'intégrale compte négativement les parties sous l'axe.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu'est-ce qu'une primitive de f ? | Une fonction F telle que F' = f. |
| Deux primitives de f diffèrent de… ? | Une constante. |
| ∫ xⁿ dx (n ≠ −1) ? | xⁿ⁺¹/(n + 1) + C. |
| ∫ dx/x ? | ln\|x\| + C. |
| ∫ e^(ax) dx ? | e^(ax)/a + C. |
| ∫ sin(ax) dx ? | −cos(ax)/a + C. |
| ∫ cos(ax) dx ? | sin(ax)/a + C. |
| ∫ dx/(1 + x²) ? | arctan x + C. |
| ∫ dx/√(1 − x²) ? | arcsin x + C. |
| ∫ dx/cos² x ? | tan x + C. |
| ∫ u'/u dx ? | ln\|u\| + C. |
| Formule de Newton-Leibniz ? | ∫ₐᵇ f(x) dx = F(b) − F(a). |
| Formule d'intégration par parties ? | ∫ u dv = uv − ∫ v du. |
| En IPP, que prendre pour u avec x eˣ ? | u = x (on dérive le polynôme). |
| Relation de Chasles ? | ∫ₐᵇ f = ∫ₐᶜ f + ∫꜀ᵇ f. |
| ∫ₐᵇ f en fonction de ∫ᵦᵃ f ? | ∫ₐᵇ f = −∫ᵦᵃ f. |
| Valeur moyenne de f sur [a ; b] ? | (1/(b − a)) ∫ₐᵇ f(x) dx. |
| Changement t = tan(x/2) : sin x = ? | 2t/(1 + t²). |
| Linéariser sin² x ? | (1 − cos 2x)/2. |
| Que représente ∫ₐᵇ f si f ≥ 0 ? | L'aire sous la courbe entre a et b. |

## Exercices générables
### c6-puissance — Intégrale d'une puissance
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule ∫₀^{b} x^{n} dx (arrondi à 0,01).
- Paramètres : b entier de 1 à 4 ; n entier de 1 à 4.
- Réponse : b^(n+1)/(n + 1)
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : n·b^(n−1) → « dérivée au lieu de primitive » ; b^(n+1) → « division oubliée ».
- Explication de la solution : primitive x^({n}+1)/({n}+1), évaluée entre 0 et {b}.
- Inspiré de : primitive usuelle 1 (p. 115), exercice 4.1.

### c6-affine — Intégrale d'une fonction affine
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule ∫_{a}^{b} ({p}x + {q}) dx (arrondi à 0,01).
- Paramètres : a, b entiers de −3 à 5, a < b ; p, q entiers de −5 à 5.
- Réponse : p(b² − a²)/2 + q(b − a)
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : p(b − a) → « primitive de px prise égale à p » ; oubli de q(b − a).
- Explication de la solution : primitive {p}x²/2 + {q}x ; on calcule F({b}) − F({a}).
- Inspiré de : exemple 4.30 (p. 137).

### c6-inverse — Intégrale de 1/x
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule ∫₁^(e^{m}) dx/x.
- Paramètres : m entier de 1 à 6.
- Réponse : m
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : e^m − 1 → « primitive x au lieu de ln x ».
- Explication de la solution : [ln x]₁^(e^{m}) = {m} − 0.
- Inspiré de : primitive usuelle 10 (p. 115).

### c6-chasles — Relation de Chasles
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : On sait que ∫ₐᶜ f = {p} et ∫꜀ᵇ f = {q}. Calcule ∫ᵦᵃ f.
- Paramètres : p, q entiers de −10 à 10.
- Réponse : −(p + q)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : p + q → « sens des bornes ignoré » ; p − q.
- Explication de la solution : ∫ₐᵇ f = {p} + {q} (Chasles) et inverser les bornes change le signe.
- Inspiré de : propriétés 4.2 et 4.3 (p. 134-135).

### c6-cos — Intégrale de cos(kx)
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule ∫₀^(π/(2·{k})) cos({k}x) dx (arrondi à 0,001).
- Paramètres : k entier de 1 à 6.
- Réponse : 1/k
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : k → « multiplier par k au lieu de diviser » ; 1 → « facteur 1/k oublié ».
- Explication de la solution : primitive sin({k}x)/{k} ; en x = π/(2{k}) : sin(π/2)/{k} = 1/{k}.
- Inspiré de : primitive usuelle 3 (p. 115), exercice 4.6.1b.

### c6-exp — Intégrale de e^(kx)
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule ∫₀¹ e^({k}x) dx (arrondi à 0,001).
- Paramètres : k entier non nul de −3 à 3.
- Réponse : (e^k − 1)/k
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : e^k − 1 → « facteur 1/k oublié » ; k·(e^k − 1).
- Explication de la solution : primitive e^({k}x)/{k}, évaluée entre 0 et 1.
- Inspiré de : primitive usuelle 8 (p. 115), exercice 4.6.1a.

### c6-changement — Changement de variable
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule ∫₀¹ 2x(x² + 1)^{n} dx (arrondi à 0,01).
- Paramètres : n entier de 1 à 5.
- Réponse : (2^(n+1) − 1)/(n + 1)
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 2^(n+1)/(n + 1) → « borne inférieure oubliée (t = 1 en x = 0) ».
- Explication de la solution : t = x² + 1, dt = 2x dx, bornes 1 → 2 : ∫₁² t^{n} dt = (2^({n}+1) − 1)/({n} + 1).
- Inspiré de : exemple 4.7 (p. 117), exercice 4.6.3.

### c6-ipp — Intégration par parties
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Calcule ∫₀^{a} x eˣ dx (arrondi à 0,01).
- Paramètres : a entier de 1 à 3.
- Réponse : (a − 1)e^a + 1 (valeurs 1 ; 8,39 ; 41,17)
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : (a − 1)e^a → « borne 0 oubliée » ; a·e^a → « ∫ v du oublié ».
- Explication de la solution : u = x, dv = eˣ dx : ∫ x eˣ dx = (x − 1)eˣ ; on évalue entre 0 et {a}.
- Inspiré de : exemple 4.32 (p. 138), exercice 4.6.2.

### c6-moyenne — Valeur moyenne
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule la valeur moyenne de f(x) = x² sur [{a} ; {b}] (arrondi à 0,01).
- Paramètres : a, b entiers de 0 à 6, a < b.
- Réponse : (a² + ab + b²)/3
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : (b³ − a³)/3 → « division par (b − a) oubliée » ; (a² + b²)/2 → « moyenne des valeurs extrêmes ».
- Explication de la solution : (1/({b} − {a})) × ({b}³ − {a}³)/3, et b³ − a³ = (b − a)(a² + ab + b²).
- Inspiré de : définition 4.5 (p. 136).

### c6-arctan — Primitive en arctangente
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Calcule ∫₀^{a} dx/(x² + {a}²) (arrondi à 0,001).
- Paramètres : a entier de 1 à 5.
- Réponse : π/(4a)
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : π/4 → « facteur 1/a oublié » ; ln(2)/a → « confusion avec ∫ u'/u ».
- Explication de la solution : primitive (1/{a}) arctan(x/{a}) ; arctan(1) − arctan(0) = π/4.
- Inspiré de : primitive usuelle 11 (p. 115), exercice 4.6.1g.

---

# Chapitre : Applications des intégrales
Source : §4.4 (p. 138-149, PDF 144-155) ; exercices 4.9 à 4.16 (p. 151-152).
Niveau visé : tu calcules des aires (cartésiennes et polaires), des longueurs de courbes, des volumes et surfaces de révolution, des centres de gravité et des moments d'inertie simples.
Prérequis : Primitives et intégrales.

## Explication pour un novice
L'intégrale est une machine à additionner une infinité de petits morceaux. Pour une aire, on empile de fines bandes verticales de hauteur f(x) et de largeur dx. Pour une longueur de courbe, on additionne de minuscules segments presque droits. Pour un volume, on empile de fines tranches, comme un saucisson coupé en rondelles.

Aire entre deux courbes : on additionne la hauteur entre les deux, |f(x) − g(x)|, sur chaque petite bande. Si la courbe passe sous l'axe, on prend la valeur absolue morceau par morceau, sinon les aires se compensent.

Volume de révolution autour de Ox : en tournant, chaque point de la courbe décrit un cercle de rayon y = f(x). Chaque tranche est un disque d'aire πy² et d'épaisseur dx, d'où V = π ∫ y² dx. Autour de Oy, on utilise plutôt des « tubes » cylindriques : V = 2π ∫ x·y dx.

Le centre de gravité est le point d'équilibre, là où l'on pourrait poser l'objet sur la pointe d'un crayon (idée d'Archimède). C'est une moyenne des positions, pondérée par les masses : X_G = (∫ x dm)/(∫ dm). Le moment d'inertie I = ∫ r² dm mesure la difficulté à faire tourner un objet autour d'un axe : la masse loin de l'axe compte beaucoup plus.

## Notions (dans l'ordre d'apprentissage)
- Aire sous une courbe : | A = ∫ₐᵇ f(x) dx si f ≥ 0 ; sinon somme des valeurs absolues des morceaux.
- Aire entre deux courbes : | A = ∫ₐᵇ |f(x) − g(x)| dx.
- Aire en coordonnées polaires : | A = (1/2) ∫_α^β r(θ)² dθ (éq. 4.23).
- Élément de longueur : | dℓ = √(dx² + dy²) = √(1 + f'(x)²) dx.
- Longueur d'arc (cartésien) : | ℓ = ∫ₐᵇ √(1 + f'(x)²) dx (éq. 4.24).
- Longueur d'arc (polaire) : | ℓ = ∫ √(r'² + r²) dθ (éq. 4.26).
- Volume de révolution autour de Ox : empilement de disques | V = π ∫ₐᵇ y² dx (éq. 4.27).
- Surface de révolution autour de Ox : | S = 2π ∫ₐᵇ y √(1 + y'²) dx (éq. 4.28).
- Volume de révolution autour de Oy : tubes cylindriques | V = 2π ∫ₐᵇ x y dx (éq. 4.29) ou π ∫ x² dy.
- Centre de gravité : point d'équilibre | X_G = (1/m) ∫ x dm, avec m = ∫ dm.
- Plaque homogène sous y = f(x) : | dm = λ y dx, X_G = ∫ x y dx / ∫ y dx.
- Moment d'inertie : | I = Σ mₖ rₖ² (points), I = ∫ r² dm (corps continu).

## Méthodes
### Calculer l'aire entre deux courbes
1. Trouve les abscisses d'intersection (f(x) = g(x)).
2. Repère quelle courbe est au-dessus sur chaque intervalle.
3. Intègre (haut − bas) sur chaque intervalle et additionne.

### Calculer un volume de révolution autour de Ox
1. Exprime le rayon : y = f(x).
2. Écris V = π ∫ₐᵇ f(x)² dx.
3. Développe f(x)² puis intègre.

### Calculer une longueur de courbe y = f(x)
1. Calcule f'(x).
2. Forme √(1 + f'(x)²).
3. Intègre entre a et b (souvent par changement de variable).

### Centre de gravité d'une plaque homogène sous y = f(x)
1. Masse (à λ près) : m = ∫ₐᵇ f(x) dx.
2. Moment : M = ∫ₐᵇ x f(x) dx.
3. X_G = M/m.

## Exemples résolus
### Aire entre sin x et cos x sur [π/4 ; 5π/4] (exemple 4.33)
- Sur cet intervalle sin x ≥ cos x — on vérifie qui est au-dessus.
- A = ∫ (sin x − cos x) dx = [−cos x − sin x] = 2√2.

### Aire de la cardioïde r = 1 + cos θ, θ ∈ [0 ; π] (exemple 4.34)
- A = (1/2) ∫₀^π (1 + cos θ)² dθ = (1/2)(π + 0 + π/2) = 3π/4.

### Volume et surface engendrés par y = 1 + x/3, x ∈ [0 ; 12] (exemple 4.35)
- V = π ∫₀¹² (1 + x/3)² dx = 124π.
- y' = 1/3 donc dℓ = (√10/3) dx ; S = 2π ∫₀¹² (1 + x/3)(√10/3) dx = 24√10 π.

### Volume de y = 4 − x² tournant autour de la droite x = 3 (exemple 4.36)
- On découpe en anneaux de rayons 3 − √(4 − y) et 3 + √(4 − y).
- V = 76π − 12π = 64π.

## Pièges fréquents
- Intégrer directement une fonction qui change de signe pour une aire → coupe aux zéros et prends les valeurs absolues.
- Oublier le carré dans π ∫ y² dx → le volume utilise l'aire du disque πy².
- Oublier le facteur 1/2 en polaire → A = (1/2) ∫ r² dθ.
- Écrire dℓ = dx → sur une courbe, dℓ = √(1 + y'²) dx ≥ dx.
- Confondre rotation autour de Ox et de Oy → autour de Oy, rayon = x : V = 2π ∫ x y dx.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Aire entre deux courbes f et g ? | ∫ₐᵇ \|f(x) − g(x)\| dx. |
| Aire en coordonnées polaires ? | (1/2) ∫ r(θ)² dθ. |
| Élément de longueur dℓ ? | √(1 + f'(x)²) dx. |
| Longueur de y = f(x) sur [a ; b] ? | ∫ₐᵇ √(1 + f'(x)²) dx. |
| Volume de révolution autour de Ox ? | π ∫ₐᵇ y² dx. |
| Surface de révolution autour de Ox ? | 2π ∫ₐᵇ y √(1 + y'²) dx. |
| Volume de révolution autour de Oy (tubes) ? | 2π ∫ₐᵇ x y dx. |
| Abscisse du centre de gravité ? | X_G = (∫ x dm)/(∫ dm). |
| Moment d'inertie d'un point de masse m à distance r ? | m r². |
| Moment d'inertie d'un corps continu ? | I = ∫ r² dm. |
| Aire sous y = x² entre 0 et 1 ? | 1/3. |
| Aire entre y = x et y = x² ? | 1/6. |
| Volume d'un cône de rayon R et hauteur h ? | πR²h/3 (révolution de y = Rx/h). |
| Aire d'un disque de rayon R en polaire ? | (1/2) ∫₀^2π R² dθ = πR². |
| Pourquoi couper aux zéros pour une aire ? | Les parties sous l'axe comptent négativement dans l'intégrale. |

## Exercices générables
### c7-aire-parabole — Aire sous une parabole
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule l'aire sous la courbe y = x² entre x = 0 et x = {b} (arrondi à 0,01).
- Paramètres : b entier de 1 à 6.
- Réponse : b³/3
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : b² → « aire du carré » ; 2b → « dérivée ».
- Explication de la solution : ∫₀^{b} x² dx = [x³/3]₀^{b}.
- Inspiré de : §4.4.1 a) (p. 138), exercice 4.9.

### c7-aire-entre — Aire entre une droite et une parabole
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule l'aire du domaine compris entre y = {k}x et y = x² (arrondi à 0,01).
- Paramètres : k entier de 1 à 6.
- Réponse : k³/6
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : k³/2 → « aire sous la droite seulement » ; −k³/6 → « bas − haut ».
- Explication de la solution : intersections x = 0 et x = {k} ; ∫₀^{k} ({k}x − x²) dx = {k}³/2 − {k}³/3.
- Inspiré de : exercice 4.10 (p. 151, cas k = 1 : 1/6).

### c7-aire-sinus — Aire avec changement de signe
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule l'aire comprise entre la courbe y = sin x et l'axe Ox pour x ∈ [0 ; {k}π].
- Paramètres : k entier de 1 à 5.
- Réponse : 2k
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 0 (si k pair) ou 2 (si k impair) → « intégrale calculée sans valeur absolue ».
- Explication de la solution : chaque arche [nπ ; (n + 1)π] a une aire 2 ; il y a {k} arches.
- Inspiré de : §4.4.1 a) (p. 138, règle des valeurs absolues).

### c7-volume-cone — Volume d'un cône
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Le segment y = {k}x, x ∈ [0 ; {h}], tourne autour de Ox. Le volume s'écrit V = c·π. Que vaut c ? (arrondi à 0,01)
- Paramètres : k entier de 1 à 3 ; h entier de 1 à 6.
- Réponse : c = k²h³/3
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : k·h²/2 → « y au lieu de y² » ; k²h³ → « primitive x² au lieu de x³/3 ».
- Explication de la solution : V = π ∫₀^{h} ({k}x)² dx = π {k}² {h}³/3.
- Inspiré de : formule (4.27) p. 142, exemple 4.35.

### c7-volume-racine — Volume engendré par √x
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : La courbe y = √x, x ∈ [0 ; {b}], tourne autour de Ox. Le volume s'écrit V = c·π. Que vaut c ?
- Paramètres : b entier de 1 à 10.
- Réponse : c = b²/2
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : (2/3)b^(3/2) → « y au lieu de y² ».
- Explication de la solution : V = π ∫₀^{b} (√x)² dx = π ∫₀^{b} x dx = π {b}²/2.
- Inspiré de : formule (4.27) p. 142, exercice 4.15.

### c7-longueur — Longueur d'un segment par intégrale
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule la longueur de la courbe y = {m}x + {p} pour x ∈ [{a} ; {b}].
- Paramètres : m ∈ {0 ; 3/4 ; 4/3} ; p entier de −5 à 5 ; a entier de 0 à 5 ; b = a + 12t avec t ∈ {1, 2}.
- Réponse : (b − a)√(1 + m²)
- Vérification : tolérance ±0,01 (valeurs entières avec ces paramètres).
- Distracteurs (QCM) ou erreurs typiques (numérique) : b − a → « dℓ = dx » ; (b − a)(1 + m) → « racine oubliée ».
- Explication de la solution : y' = {m} constant, donc ℓ = ∫ √(1 + {m}²) dx = ({b} − {a})√(1 + {m}²).
- Inspiré de : formule (4.24) p. 141, exercice 4.12.

### c7-polaire — Aire d'un secteur en polaire
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Calcule l'aire du secteur r = {R}, θ ∈ [0 ; π/{k}]. Elle s'écrit c·π ; donne c (arrondi à 0,01).
- Paramètres : R entier de 1 à 6 ; k ∈ {1, 2, 3, 4, 6}.
- Réponse : c = R²/(2k)
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : R²/k → « facteur 1/2 oublié » ; R/(2k) → « r non élevé au carré ».
- Explication de la solution : A = (1/2) ∫₀^(π/{k}) {R}² dθ = {R}²π/(2{k}).
- Inspiré de : formule (4.23) p. 139, exemple 4.34.

### c7-centre-gravite — Centre de gravité d'un triangle
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Une plaque homogène occupe le domaine sous y = x pour x ∈ [0 ; {b}]. Calcule l'abscisse X_G de son centre de gravité (arrondi à 0,01).
- Paramètres : b entier de 1 à 9.
- Réponse : X_G = 2b/3
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : b/2 → « milieu du segment » ; b/3 → « distance au mauvais côté ».
- Explication de la solution : m ∝ ∫₀^{b} x dx = {b}²/2 ; M ∝ ∫₀^{b} x·x dx = {b}³/3 ; X_G = M/m.
- Inspiré de : formule (4.33) p. 147.

### c7-inertie — Moment d'inertie de deux masses
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Deux masses ponctuelles {m1} kg et {m2} kg sont à {r1} m et {r2} m d'un axe. Calcule le moment d'inertie total (kg·m²).
- Paramètres : m1, m2 entiers de 1 à 10 ; r1, r2 entiers de 1 à 5.
- Réponse : m1·r1² + m2·r2²
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : m1·r1 + m2·r2 → « distance non élevée au carré ».
- Explication de la solution : I = Σ mₖ rₖ² = {m1}×{r1}² + {m2}×{r2}².
- Inspiré de : §4.4.5 (p. 148).

---

# Chapitre : Séries numériques et séries entières
Source : §6.2-6.3 (p. 201-211, PDF 207-217) ; exercices 6.3 à 6.8 (p. 212-213).
Niveau visé : tu calcules la somme d'une série géométrique ou télescopique, tu décides de la convergence avec les tests (terme général, Riemann, comparaison, équivalence, Cauchy, d'Alembert, Leibniz), et tu trouves le rayon de convergence d'une série entière simple.
Prérequis : Suites numériques ; intégrales (test de l'intégrale) ; développements limités (séries de Taylor).

## Explication pour un novice
Une série, c'est une addition qui ne s'arrête jamais : u₀ + u₁ + u₂ + … On ne peut pas tout additionner d'un coup, alors on regarde les sommes partielles Sₙ = u₀ + … + uₙ, et on se demande si elles s'approchent d'un nombre. Si oui, la série converge et ce nombre est sa somme.

Le cours prend un rectangle d'aire 1 qu'on coupe en deux, puis on recoupe une moitié en deux, et ainsi de suite : 1/2 + 1/4 + 1/8 + … = 1. Une infinité de morceaux peut donc avoir une somme finie ! C'est une série géométrique : chaque terme est le précédent multiplié par une raison q ; si |q| < 1, la somme vaut a/(1 − q).

Première vérification obligatoire : si les termes ne tendent pas vers 0, la série diverge (on ajoute sans cesse des morceaux non négligeables). Mais l'inverse est faux : 1 + 1/2 + 1/3 + 1/4 + … diverge alors que 1/n → 0. Les morceaux rétrécissent, mais trop lentement.

Pour décider, on compare à des séries connues : les séries de Riemann Σ 1/n^α convergent si α > 1. Les règles de d'Alembert (rapport uₙ₊₁/uₙ) et de Cauchy (racine n-ième) comparent la série à une série géométrique : limite < 1, convergence ; > 1, divergence ; = 1, on ne sait pas.

Enfin, une série entière Σ aₙ(x − a)ⁿ est un « polynôme infini ». Elle converge pour les x proches de a, à distance inférieure au rayon de convergence. La série de Taylor d'une fonction en est l'exemple le plus important.

## Notions (dans l'ordre d'apprentissage)
- Série : somme infinie | suite des sommes partielles Sₙ = Σₖ₌₀ⁿ uₖ (déf. 6.3).
- Convergence : les sommes partielles ont une limite finie | S = lim Sₙ = Σ uₖ.
- Série géométrique : raison constante | Σ a qⁿ ; Sₙ = a(1 − qⁿ⁺¹)/(1 − q) ; si |q| < 1, somme a/(1 − q).
- Série télescopique : les termes s'annulent en cascade | Σ 1/(k(k + 1)) = Σ (1/k − 1/(k + 1)) = 1.
- Condition nécessaire : | Σ uₙ converge ⇒ uₙ → 0 (théorème 6.8) ; si uₙ ne tend pas vers 0, divergence (théorème 6.9).
- Série harmonique : | Σ 1/n diverge bien que 1/n → 0.
- Test de l'intégrale : | f continue décroissante : Σ f(n) et ∫ f(x) dx sont de même nature (théorème 6.12).
- Séries de Riemann : | Σ 1/n^α converge si α > 1, diverge si α ≤ 1 (théorème 6.13).
- Comparaison : | 0 ≤ uₙ ≤ vₙ : Σ vₙ converge ⇒ Σ uₙ converge ; Σ uₙ diverge ⇒ Σ vₙ diverge (théorème 6.14).
- Équivalence : | vₙ/uₙ → λ ≠ 0 ⇒ même nature (théorème 6.15).
- Règle de Cauchy : | ⁿ√uₙ → ℓ : ℓ < 1 converge, ℓ > 1 diverge, ℓ = 1 on ne peut rien dire (théorème 6.16).
- Règle de d'Alembert : | uₙ₊₁/uₙ → q : q < 1 converge, q > 1 diverge, q = 1 indécis (théorème 6.17).
- Série alternée, théorème de Leibniz : | |uₙ| décroissante vers 0 ⇒ convergence, reste |rₙ| ≤ |uₙ| (théorème 6.18).
- Série entière : polynôme infini | Σ aₙ(x − a)ⁿ ; converge pour |x − a| < r (rayon de convergence).
- Série de Taylor : | f(x) = Σ f⁽ⁿ⁾(a)(x − a)ⁿ/n! ; Mac Laurin si a = 0.

## Méthodes
### Étudier la convergence d'une série à termes positifs
1. Vérifie que uₙ → 0 ; sinon, divergence immédiate.
2. Cherche un équivalent simple de uₙ (souvent 1/n^α) et compare à Riemann.
3. Si uₙ contient des puissances n-ièmes ou des factorielles : d'Alembert (rapport) ou Cauchy (racine).
4. Si le test donne 1, change de méthode.

### Calculer la somme d'une série géométrique
1. Identifie le premier terme a et la raison q (rapport entre deux termes consécutifs).
2. Vérifie |q| < 1.
3. Somme = a/(1 − q).

### Trouver le rayon de convergence de Σ aₙ xⁿ
1. Calcule lim |aₙ₊₁/aₙ| = L (d'Alembert sur les coefficients).
2. Le rayon vaut r = 1/L (r = +∞ si L = 0).
3. La série converge pour |x| < r et diverge pour |x| > r.

## Exemples résolus
### Σₖ≥₁ 1/(k(k + 1)) (exemple 6.9)
- 1/(k(k + 1)) = 1/k − 1/(k + 1) — décomposition.
- Sₙ = 1 − 1/(n + 1) — tous les termes intermédiaires s'annulent.
- Sₙ → 1 : la série converge et sa somme vaut 1.

### 3,333… comme série géométrique (exemple 6.12)
- 3,333… = 3 + 3(0,1) + 3(0,1)² + … — a = 3, q = 0,1.
- Somme = 3/(1 − 0,1) = 3/0,9 = 10/3.

### Σ (−1)ⁿ n/2ⁿ par d'Alembert (exemple 6.18)
- |uₙ₊₁/uₙ| = (n + 1)/(2n) → 1/2 < 1.
- La série converge.

### Σ ((n − 1)/(2n + 6))ⁿ par Cauchy (exemple 6.17)
- ⁿ√uₙ = (n − 1)/(2n + 6) → 1/2 < 1.
- La série converge.

### Σ 1/(1 + n²) par le test de l'intégrale (exemple 6.14)
- f(x) = 1/(1 + x²) est continue et décroissante sur [0 ; +∞[.
- ∫₀^∞ dx/(1 + x²) = π/2, finie : la série converge.

## Pièges fréquents
- Croire que uₙ → 0 suffit pour converger → contre-exemple Σ 1/n (série harmonique) qui diverge.
- Conclure avec d'Alembert ou Cauchy quand la limite vaut 1 → le test ne dit rien, change de méthode.
- Appliquer a/(1 − q) quand |q| ≥ 1 → la série géométrique diverge alors.
- Mal identifier le premier terme d'une série géométrique → si la somme commence à n = 1, le premier terme est aq.
- Comparer des séries de signe quelconque → les tests de comparaison supposent des termes positifs.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu'est-ce que la somme d'une série ? | La limite (si elle existe) des sommes partielles Sₙ. |
| Somme de Σₙ≥₀ a qⁿ si \|q\| < 1 ? | a/(1 − q). |
| Somme partielle géométrique Sₙ ? | a(1 − qⁿ⁺¹)/(1 − q), q ≠ 1. |
| Série géométrique avec \|q\| ≥ 1 ? | Elle diverge. |
| Condition nécessaire de convergence ? | Le terme général tend vers 0. |
| uₙ → 0 suffit-il ? | Non : Σ 1/n diverge. |
| Nature de Σ 1/n^α ? | Converge si α > 1, diverge si α ≤ 1. |
| Σ 1/n² converge-t-elle ? | Oui (Riemann, α = 2 > 1). |
| Règle de d'Alembert ? | uₙ₊₁/uₙ → q : q < 1 converge, q > 1 diverge, q = 1 indécis. |
| Règle de Cauchy ? | ⁿ√uₙ → ℓ : ℓ < 1 converge, ℓ > 1 diverge, ℓ = 1 indécis. |
| Équivalence de séries positives ? | uₙ ~ vₙ ⇒ Σ uₙ et Σ vₙ de même nature. |
| Théorème de Leibniz (séries alternées) ? | \|uₙ\| décroît vers 0 ⇒ la série alternée converge. |
| Somme de Σₖ≥₁ 1/(k(k + 1)) ? | 1 (série télescopique). |
| Somme 1/2 + 1/4 + 1/8 + … ? | 1. |
| Qu'est-ce qu'une série entière ? | Une somme Σ aₙ(x − a)ⁿ, un « polynôme infini ». |
| Domaine de convergence de Σ (x − a)ⁿ ? | ]a − 1 ; a + 1[, rayon 1. |
| Rayon de convergence de Σ xⁿ/n! ? | +∞ (converge pour tout x). |
| Série de Taylor de f en a ? | Σ f⁽ⁿ⁾(a)(x − a)ⁿ/n!. |

## Exercices générables
### c12-geo-somme — Somme d'une série géométrique
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule Σₙ₌₀^∞ {a}/{k}ⁿ (arrondi à 0,01).
- Paramètres : a entier de 1 à 9 ; k entier de 2 à 10.
- Réponse : a·k/(k − 1)
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a/(k − 1) → « premier terme pris égal à a/k » ; a/(1 − k) → « q = k au lieu de 1/k ».
- Explication de la solution : premier terme {a}, raison q = 1/{k} < 1 : somme {a}/(1 − 1/{k}).
- Inspiré de : exemple 6.11 (p. 203), exercice 6.6.

### c12-geo-partielle — Somme partielle géométrique
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule {a} + {a}×2 + {a}×2² + … + {a}×2^{n}.
- Paramètres : a entier de 1 à 9 ; n entier de 2 à 10.
- Réponse : a(2^(n+1) − 1)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a(2^n − 1) → « nombre de termes mal compté (n au lieu de n + 1) ».
- Explication de la solution : Sₙ = a(1 − qⁿ⁺¹)/(1 − q) avec q = 2 : {a}(2^({n}+1) − 1).
- Inspiré de : formule (6.12) p. 202, exercice 6.6.1.

### c12-telescopique — Somme télescopique
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule Σₖ₌₁^{n} 1/(k(k + 1)) (arrondi à 0,001).
- Paramètres : n entier de 2 à 20.
- Réponse : n/(n + 1)
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 1 → « somme infinie au lieu de partielle » ; 1/(n + 1).
- Explication de la solution : 1/(k(k + 1)) = 1/k − 1/(k + 1) ; il reste 1 − 1/({n} + 1).
- Inspiré de : exemple 6.9 (p. 202).

### c12-decimal — Nombre périodique et série
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Le nombre {d},{d}{d}{d}… (le chiffre {d} répété) s'écrit N/9. Que vaut N ?
- Paramètres : d entier de 1 à 8.
- Réponse : N = 10d
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : d → « partie entière oubliée (0,ddd… = d/9) » ; 11d.
- Explication de la solution : {d} + {d}(0,1) + {d}(0,1)² + … = {d}/(1 − 0,1) = 10{d}/9.
- Inspiré de : exemple 6.12 (p. 203 : 3,333… = 10/3).

### c12-riemann — Séries de Riemann
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : La série Σₙ≥₁ 1/n^{alpha} est-elle convergente ?
- Paramètres : alpha ∈ {1/3 ; 1/2 ; 1 ; 3/2 ; 2 ; 3}.
- Réponse : convergente si alpha > 1, divergente sinon.
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : « convergente » pour alpha = 1 → « 1/n → 0 donc ça converge ».
- Explication de la solution : critère de Riemann : convergence si et seulement si α > 1 ; ici α = {alpha}.
- Inspiré de : théorème 6.13 (p. 205), exercice 6.4.

### c12-grossiere — Divergence grossière
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : La série de terme général uₙ = ({a}n + 1)/({b}n + 2) converge-t-elle ?
- Paramètres : a, b entiers de 1 à 9.
- Réponse : non, elle diverge (uₙ → a/b ≠ 0).
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : « oui, vers a/b » → « confusion suite / série ».
- Explication de la solution : uₙ → {a}/{b} ≠ 0 ; une série converge seulement si son terme général tend vers 0.
- Inspiré de : théorème 6.9 et exemple 6.13 (p. 204).

### c12-alembert — Règle de d'Alembert
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Pour uₙ = n^{p}/{a}ⁿ, calcule la limite de uₙ₊₁/uₙ (arrondi à 0,001).
- Paramètres : p entier de 1 à 3 ; a entier de 2 à 5.
- Réponse : 1/a (donc convergence)
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a → « rapport inversé » ; 1 → « seul le facteur polynomial considéré ».
- Explication de la solution : uₙ₊₁/uₙ = ((n + 1)/n)^{p} × 1/{a} → 1/{a} < 1.
- Inspiré de : théorème 6.17 et exemple 6.18 (p. 207).

### c12-cauchy — Règle de Cauchy
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Pour uₙ = (({a}n + {b})/({c}n + {d}))ⁿ, calcule lim ⁿ√uₙ (arrondi à 0,001).
- Paramètres : a, c entiers de 1 à 9 avec a ≠ c ; b, d entiers de 1 à 9.
- Réponse : a/c (convergence si a < c, divergence si a > c)
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : b/d → « termes constants pris pour dominants » ; (a/c)ⁿ.
- Explication de la solution : ⁿ√uₙ = ({a}n + {b})/({c}n + {d}) → {a}/{c}.
- Inspiré de : théorème 6.16 et exemple 6.17 (p. 206).

### c12-rayon — Rayon de convergence
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Quel est le rayon de convergence de la série entière Σₙ≥₀ xⁿ/{a}ⁿ ?
- Paramètres : a entier de 2 à 9.
- Réponse : r = a
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 1/a → « inverse du bon rayon » ; 1.
- Explication de la solution : c'est une série géométrique de raison x/{a} : elle converge si |x/{a}| < 1, soit |x| < {a}.
- Inspiré de : §6.3.1 (p. 208), exemple 6.19, exercice 6.5.3.

---

# Chapitre : Nombres complexes
Source : chapitre 1 (p. 1-14, PDF 7-20) ; exercices 1.1 à 1.7 (p. 12-14).
Niveau visé : tu calcules avec les nombres complexes sous forme algébrique, trigonométrique et exponentielle (somme, produit, quotient, conjugué, module, argument), tu utilises la formule de De Moivre et tu trouves les racines n-ièmes.
Prérequis : Bases 2 (trigonométrie), fonction exponentielle.

## Explication pour un novice
Aucun nombre réel n'a un carré égal à −1. Les mathématiciens italiens du XVIᵉ siècle (Cardan, Bombelli, Tartaglia) ont quand même osé inventer un tel nombre pour résoudre des équations du 3ᵉ degré. Le cours l'appelle j (on le note souvent i) : j² = −1. Un nombre complexe s'écrit z = x + jy, avec x la partie réelle et y la partie imaginaire.

L'idée clé : un complexe est un point du plan. x + jy correspond au point de coordonnées (x ; y). L'axe horizontal porte les réels, l'axe vertical les imaginaires purs. Les opérations deviennent alors des mouvements : additionner, c'est mettre deux flèches bout à bout ; multiplier par j, c'est tourner d'un quart de tour.

On peut aussi repérer un point par sa distance à l'origine (le module r = |z|) et son angle (l'argument θ). C'est comme donner une direction et une distance plutôt que « 3 pas à droite, 4 pas en haut ». On écrit alors z = r(cos θ + j sin θ) = r e^(jθ) (formule d'Euler). Sous cette forme, multiplier devient très simple : on multiplie les modules et on additionne les angles.

Conséquence : (cos θ + j sin θ)ⁿ = cos nθ + j sin nθ (formule de De Moivre), et tout nombre complexe non nul a exactement n racines n-ièmes, réparties régulièrement sur un cercle comme les rayons d'une roue.

Les complexes servent partout en physique : courant alternatif, ondes, oscillations. Dans ce cours, ils réapparaissent pour résoudre les équations différentielles du second ordre.

## Notions (dans l'ordre d'apprentissage)
- Unité imaginaire : le nombre dont le carré vaut −1 | j² = −1 (noté i en mathématiques).
- Nombre complexe (forme algébrique) : | z = x + jy, x = Re(z), y = Im(z) réels (déf. 1.1).
- Plan complexe : | z = x + jy est l'affixe du point M(x ; y).
- Égalité : | z = z' ⇔ Re(z) = Re(z') et Im(z) = Im(z').
- Somme : on additionne séparément | (x₁ + jy₁) + (x₂ + jy₂) = (x₁ + x₂) + j(y₁ + y₂).
- Produit : on développe avec j² = −1 | z₁z₂ = (x₁x₂ − y₁y₂) + j(x₁y₂ + x₂y₁).
- Conjugué : symétrique par rapport à l'axe réel | z̄ = x − jy ; z z̄ = x² + y² = |z|².
- Quotient : on multiplie par le conjugué du dénominateur | z₁/z₂ = z₁ z̄₂ / |z₂|².
- Module : distance à l'origine | |z| = r = √(x² + y²).
- Argument : angle avec l'axe réel | θ = arg z, défini à 2kπ près ; cos θ = x/r, sin θ = y/r.
- Forme trigonométrique : | z = r(cos θ + j sin θ) (éq. 1.5).
- Formule d'Euler et forme exponentielle : | e^(jθ) = cos θ + j sin θ ; z = r e^(jθ) (éq. 1.8).
- Règles module/argument : | |z₁z₂| = |z₁||z₂|, arg(z₁z₂) = arg z₁ + arg z₂ ; |z₁/z₂| = |z₁|/|z₂|.
- Rotation : | multiplier par e^(jα) fait tourner de α ; multiplier par j tourne de π/2.
- Formule de De Moivre : | (cos θ + j sin θ)ⁿ = cos nθ + j sin nθ (éq. 1.13).
- Racines n-ièmes : | ωₖ = ⁿ√r · e^(j(θ + 2kπ)/n), k = 0, 1, …, n − 1 (éq. 1.15).
- Racines de l'unité : | ωₖ = e^(2jkπ/n) ; leur somme est nulle (n ≥ 2).

## Méthodes
### Multiplier deux complexes en forme algébrique
1. Développe comme (a + b)(c + d).
2. Remplace j² par −1.
3. Regroupe partie réelle et partie imaginaire.

### Diviser deux complexes
1. Multiplie le numérateur et le dénominateur par le conjugué du dénominateur.
2. Le dénominateur devient réel : x₂² + y₂².
3. Développe le numérateur et sépare Re et Im.

### Passer de la forme algébrique à la forme exponentielle
1. Module r = √(x² + y²).
2. Argument θ : cos θ = x/r et sin θ = y/r (utilise les deux pour choisir le bon quadrant).
3. z = r e^(jθ).

### Trouver les racines n-ièmes de z
1. Écris z = r e^(jθ).
2. Les racines ont pour module ⁿ√r.
3. Leurs arguments sont (θ + 2kπ)/n pour k = 0, 1, …, n − 1.

## Exemples résolus
### Somme et différence (exemple 1.1)
- (1 − j) + (5 + 3j) = 6 + 2j — on additionne Re et Im séparément.
- (3 + 4j) − (1 + 3j) = 2 + j.

### Formules de trigonométrie par De Moivre (exemple 1.2)
- (cos θ + j sin θ)² = cos² θ − sin² θ + 2j sin θ cos θ — développement avec j² = −1.
- C'est aussi cos 2θ + j sin 2θ, donc cos 2θ = cos² θ − sin² θ et sin 2θ = 2 sin θ cos θ.

### Racines cubiques de 1 (exemple 1.4)
- 1 = 1·e^(j0), donc les racines ont pour module 1 et arguments 2kπ/3.
- ω₀ = 1, ω₁ = −1/2 + j√3/2, ω₂ = −1/2 − j√3/2.

### Module et argument de 1 + j√3
- r = √(1 + 3) = 2 — module.
- cos θ = 1/2 et sin θ = √3/2, donc θ = π/3 ; 1 + j√3 = 2e^(jπ/3).

## Pièges fréquents
- Oublier que j² = −1 en développant → (a + jb)(c + jd) a pour partie réelle ac − bd, pas ac + bd.
- Calculer l'argument avec arctan(y/x) seul → vérifie le quadrant avec les signes de x et y (−1 − j n'a pas pour argument π/4).
- Confondre conjugué et opposé → z̄ = x − jy, alors que −z = −x − jy.
- Oublier des racines → un complexe non nul a exactement n racines n-ièmes, pas une seule.
- Croire que |z₁ + z₂| = |z₁| + |z₂| → c'est vrai pour le produit, pas pour la somme.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Que vaut j² ? | −1 (j est le i des mathématiciens). |
| Forme algébrique d'un complexe ? | z = x + jy, x et y réels. |
| Re(z) et Im(z) pour z = 3 − 2j ? | Re = 3, Im = −2. |
| Produit (a + jb)(c + jd) ? | (ac − bd) + j(ad + bc). |
| Conjugué de x + jy ? | x − jy. |
| z × z̄ = ? | x² + y² = \|z\|². |
| Module de x + jy ? | √(x² + y²). |
| Comment diviser par un complexe ? | Multiplier haut et bas par le conjugué du dénominateur. |
| Formule d'Euler ? | e^(jθ) = cos θ + j sin θ. |
| Forme exponentielle de z ? | z = r e^(jθ), r = \|z\|, θ = arg z. |
| Module et argument d'un produit ? | Modules multipliés, arguments additionnés. |
| Effet de la multiplication par j ? | Rotation d'un quart de tour (π/2). |
| Formule de De Moivre ? | (cos θ + j sin θ)ⁿ = cos nθ + j sin nθ. |
| Combien de racines n-ièmes a z ≠ 0 ? | Exactement n. |
| Arguments des racines n-ièmes de 1 ? | 2kπ/n, k = 0, …, n − 1. |
| Somme des racines n-ièmes de l'unité (n ≥ 2) ? | 0. |
| Argument de j ? | π/2 (à 2kπ près). |
| Argument d'un réel négatif ? | π (à 2kπ près). |
| Module et argument de 1 + j ? | √2 et π/4. |

## Exercices générables
### c8-difference — Partie imaginaire d'une différence
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Soit z₁ = {a} + {b}j et z₂ = {c} + {d}j. Calcule Im(z₁ − z₂).
- Paramètres : a, b, c, d entiers de −9 à 9.
- Réponse : b − d
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a − c → « partie réelle au lieu d'imaginaire » ; b + d → « signe oublié ».
- Explication de la solution : on soustrait séparément : Im = {b} − {d}.
- Inspiré de : exemple 1.1 (p. 7).

### c8-produit — Partie réelle d'un produit
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule la partie réelle de ({a} + {b}j)({c} + {d}j).
- Paramètres : a, b, c, d entiers de −6 à 6.
- Réponse : a·c − b·d
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a·c + b·d → « j² = +1 » ; a·c → « terme jb × jd oublié ».
- Explication de la solution : ({a} + {b}j)({c} + {d}j) = {a}{c} + {a}{d}j + {b}{c}j + {b}{d}j² ; avec j² = −1, Re = {a}{c} − {b}{d}.
- Inspiré de : §1.3.4 (p. 7).

### c8-module — Module
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule le module de z = {x} + {y}j.
- Paramètres : (|x|, |y|) = (3t, 4t), (4t, 3t), (5t, 12t), (6, 8), (8, 15) avec t ∈ {1, 2} et signes quelconques.
- Réponse : √(x² + y²) (entier)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : |x| + |y| → « somme au lieu de Pythagore » ; x² + y² → « racine oubliée ».
- Explication de la solution : |z| = √({x}² + {y}²) (théorème de Pythagore dans le plan).
- Inspiré de : §1.2.2 (p. 5).

### c8-conjugue — Produit par le conjugué
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Soit z = {a} + {b}j. Calcule z × z̄.
- Paramètres : a, b entiers de −9 à 9.
- Réponse : a² + b²
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a² − b² → « j² mal géré ».
- Explication de la solution : ({a} + {b}j)({a} − {b}j) = {a}² − ({b}j)² = {a}² + {b}².
- Inspiré de : propriété 7 du conjugué (p. 10).

### c8-quotient — Partie réelle d'un quotient
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Calcule Re(({a} + {b}j)/({c} + {d}j)) (arrondi à 0,01).
- Paramètres : a, b entiers de −9 à 9 ; c, d entiers de −5 à 5, (c ; d) ≠ (0 ; 0).
- Réponse : (a·c + b·d)/(c² + d²)
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : (a·c − b·d)/(c² + d²) → « conjugué oublié » ; a/c → « division terme à terme ».
- Explication de la solution : on multiplie par {c} − {d}j : numérateur ({a}{c} + {b}{d}) + j({b}{c} − {a}{d}), dénominateur {c}² + {d}².
- Inspiré de : formule (1.9) p. 8.

### c8-argument — Argument d'un complexe remarquable
- Niveau : 2
- Forme : `qcm`
- Énoncé gabarit : Quel est l'argument (dans ]−π ; π]) de z = {z} ?
- Paramètres : z ∈ {1 + j → π/4 ; j → π/2 ; −1 → π ; −j → −π/2 ; 1 + j√3 → π/3 ; √3 + j → π/6 ; −1 + j → 3π/4 ; −1 − j → −3π/4}.
- Réponse : l'angle associé.
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : l'angle donné par arctan(y/x) sans correction de quadrant ; l'angle complémentaire ; l'opposé.
- Explication de la solution : on calcule cos θ = x/r et sin θ = y/r, puis on place le point dans le bon quadrant.
- Inspiré de : §1.2.2-1.2.3 (p. 4-5).

### c8-rotation — Multiplication par j
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Soit z = {a} + {b}j. Quelle est la partie réelle de j × z ?
- Paramètres : a, b entiers de −9 à 9.
- Réponse : −b
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : b → « j² = 1 » ; a → « j ne change rien ».
- Explication de la solution : j({a} + {b}j) = {a}j + {b}j² = −{b} + {a}j : rotation d'un quart de tour.
- Inspiré de : §1.3.5 Rotation (p. 9).

### c8-moivre — Module d'une puissance
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Calcule |(1 + j)^{n}|.
- Paramètres : n entier pair de 2 à 12.
- Réponse : 2^(n/2)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 2ⁿ → « module de 1 + j pris égal à 2 » ; n√2.
- Explication de la solution : |1 + j| = √2 et |zⁿ| = |z|ⁿ, donc (√2)^{n} = 2^({n}/2).
- Inspiré de : §1.3.4 propriété 2 (p. 9), §1.4.

### c8-racines — Argument d'une racine n-ième de l'unité
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Les racines {n}-ièmes de l'unité sont ωₖ = e^(jφₖ). Pour k = {k}, φₖ s'écrit c·π ; donne c (arrondi à 0,001).
- Paramètres : n entier de 2 à 8 ; k entier de 0 à n − 1.
- Réponse : c = 2k/n
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : k/n → « 2 oublié dans 2kπ » ; 2n/k.
- Explication de la solution : φₖ = 2kπ/n = 2×{k}π/{n}.
- Inspiré de : formule (1.16) et exemple 1.4 (p. 12).

### c8-somme-racines — Somme des racines de l'unité
- Niveau : 3
- Forme : `qcm`
- Énoncé gabarit : Que vaut 1 + u + u² + … + u^({n}−1) si u est une racine {n}-ième de l'unité différente de 1 ?
- Paramètres : n entier de 2 à 8.
- Réponse : 0
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : n → « tous les termes valent 1 » ; 1 ; u.
- Explication de la solution : somme géométrique (1 − uⁿ)/(1 − u) avec uⁿ = 1 et u ≠ 1 : elle vaut 0.
- Inspiré de : exercice 1.3 (p. 13).

---

# Chapitre : Équations différentielles du premier ordre
Source : §5.1 (p. 155-170, PDF 161-176), §5.3.1-5.3.2 (p. 181-184, PDF 187-190) ; exercices 5.1-5.9, 5.12-5.15, 5.17 (p. 187-191).
Niveau visé : tu reconnais le type d'une équation du premier ordre et tu résous les équations à variables séparables, linéaires (avec variation de la constante), homogènes et de Bernoulli ; tu modélises refroidissement et circuit RL.
Prérequis : Primitives et intégrales ; fonctions exp et ln.

## Explication pour un novice
Souvent, on ne connaît pas directement une quantité, mais on sait comment elle change. Par exemple : « un café refroidit d'autant plus vite qu'il est plus chaud que la pièce » (loi de Newton). Une équation différentielle relie une fonction inconnue y et ses dérivées. La résoudre, c'est retrouver la fonction.

Exemple simple : y' = ky (la vitesse de croissance est proportionnelle à la taille, comme une population ou des intérêts). Les solutions sont y = C·e^(kx). Il y a une infinité de solutions (une par valeur de C) : c'est la solution générale. Une condition initiale (la valeur au départ) fixe C : c'est la solution particulière.

Premier type : variables séparables. On range tout ce qui contient y d'un côté avec dy, tout ce qui contient x de l'autre avec dx, puis on intègre les deux côtés. C'est comme trier le linge : chaque variable dans son panier.

Deuxième type : équations linéaires a(x)y' + b(x)y = f(x). On résout d'abord sans second membre (f = 0), ce qui donne y = K e^(−P(x)). Puis on fait « varier la constante » : on remplace K par une fonction K(x) pour trouver une solution de l'équation complète.

Les applications du cours : la température d'une tasse de café T(t) = T_ambiante + A e^(kt), le courant dans un circuit RL qui s'installe progressivement vers V/R, la chute d'un objet freiné par l'air qui atteint une vitesse limite.

## Notions (dans l'ordre d'apprentissage)
- Équation différentielle : relation entre x, y et ses dérivées | F(x, y, y', …, y⁽ⁿ⁾) = 0 (déf. 5.1).
- Ordre : la plus haute dérivée présente | y' seule : premier ordre (déf. 5.2).
- Solution générale : toutes les solutions, avec une constante | y = f(x, C) (déf. 5.6).
- Condition initiale, solution particulière : | y(x₀) = y₀ fixe la constante C.
- Existence et unicité (Cauchy) : | si f et ∂f/∂y sont continues, une seule solution passe par (x₀ ; y₀) (théorème 5.1).
- Variables séparables : | y' = f₁(x) f₂(y) ⇒ ∫ dy/f₂(y) = ∫ f₁(x) dx + C (déf. 5.7).
- Équation homogène (sens 1) : y' ne dépend que de y/x | y' = f(1, y/x) ; on pose u = y/x (déf. 5.9).
- Équation linéaire du 1er ordre : | a(x)y' + b(x)y = f(x) (déf. 5.10).
- Équation sans second membre (ESSM, dite aussi « homogène », sens 2) : | a(x)y' + b(x)y = 0 ⇒ y = K e^(−P(x)), P primitive de b/a.
- Structure des solutions : | solution générale = solution générale de l'ESSM + une solution particulière.
- Variation de la constante : | on cherche y = K(x) e^(−P(x)) ; K'(x) = (f(x)/a(x)) e^(P(x)).
- Coefficients constants : | y' + ay = b ⇒ y = K e^(−ax) + b/a.
- Équation de Bernoulli : | y' + P(x)y = Q(x)yⁿ ; on pose z = y^(1−n) pour se ramener à du linéaire (§5.1.6 a).
- Riccati, Lagrange, Clairaut : types spéciaux | traités p. 167-170 (hors exercices générables).
- Loi de refroidissement de Newton : | dT/dt = k(T − T₀) ⇒ T(t) = T₀ + A e^(kt) (éq. 5.37-5.39).
- Circuit RL : | L di/dt + R i = V ⇒ i(t) = V/R + K e^(−Rt/L) ; constante de temps L/R.

## Méthodes
### Résoudre une équation à variables séparables
1. Écris y' = dy/dx.
2. Mets tous les y avec dy d'un côté, tous les x avec dx de l'autre.
3. Intègre chaque côté (une seule constante C suffit).
4. Isole y si possible, puis utilise la condition initiale.

### Résoudre une équation linéaire y' + a(x)y = f(x)
1. ESSM : y' + a(x)y = 0 ⇒ y₁ = K e^(−A(x)), A primitive de a.
2. Variation de la constante : pose y = K(x) e^(−A(x)), remplace dans l'équation.
3. Les termes en K se simplifient : il reste K'(x) e^(−A(x)) = f(x).
4. Intègre pour obtenir K(x), puis écris y = (K(x) + C) e^(−A(x)).

### Cas y' + ay = b (a, b constants)
1. Solution constante (particulière) : y = b/a.
2. Solution générale : y = K e^(−ax) + b/a.
3. Condition initiale : K = y(0) − b/a.

### Équation de Bernoulli y' + P y = Q yⁿ
1. Divise par yⁿ.
2. Pose z = y^(1−n) ; alors z' = (1 − n) y^(−n) y'.
3. Tu obtiens z' + (1 − n)P z = (1 − n)Q, linéaire en z.
4. Résous en z puis reviens à y = z^(1/(1−n)).

## Exemples résolus
### (1 + x) y dx + (1 − y) x dy = 0 (exemple 5.4)
- On divise par xy : ((1 + x)/x) dx + ((1 − y)/y) dy = 0 — séparation.
- On intègre : ln|x| + x + ln|y| − y = C, soit ln|xy| + x − y = C.

### y' − y/x = x² (exemple 5.11)
- ESSM : dy/y = dx/x ⇒ y₁ = Kx.
- Variation : y = K(x)x ⇒ K'x = x² ⇒ K' = x ⇒ K = x²/2.
- Solution générale : y = Kx + x³/2.

### Refroidissement du café (exemple 5.29)
- T(t) = 70 + A e^(kt) ; T(0) = 180 ⇒ A = 110.
- T(2) = 165 ⇒ e^(2k) = 95/110 = 19/22 ⇒ k = ½ ln(19/22) ≈ −0,0733.
- T = 120 °F quand t = ln(50/110)/k ≈ 10,76 min.

### Circuit RL : V = 12 V, R = 600 Ω, L = 6 H, i(0) = 0 (exemple 5.30)
- 6 di/dt + 600 i = 12 ⇒ di/dt + 100 i = 2.
- i(t) = K e^(−100t) + 2/100 ; i(0) = 0 ⇒ K = −1/50.
- i(t) = (1 − e^(−100t))/50 → 0,02 A.

## Pièges fréquents
- Oublier la constante d'intégration → sans C, tu n'as qu'une seule solution au lieu de la solution générale.
- Écrire « ln|y| = P(x) + C donc y = e^P + e^C » → c'est y = K e^P avec K = ±e^C (produit, pas somme).
- Diviser par y sans vérifier y = 0 → y = 0 est souvent aussi une solution.
- Confondre les deux sens de « homogène » → (5.1.3) y' fonction de y/x ; (5.1.5) équation linéaire sans second membre.
- Ajouter la solution particulière avant d'avoir résolu l'ESSM → structure : y = y_ESSM + y_particulière.
- Appliquer la condition initiale sur la solution de l'ESSM seule → applique-la sur la solution générale complète.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu'est-ce qu'une équation différentielle ? | Une équation reliant une fonction inconnue y, ses dérivées et x. |
| Ordre d'une équation différentielle ? | L'ordre de la plus haute dérivée présente. |
| Solutions de y' = ky ? | y = C e^(kx). |
| Rôle d'une condition initiale ? | Fixer la constante : on passe de la solution générale à une solution particulière. |
| Équation à variables séparables ? | y' = f₁(x)f₂(y) : on sépare dy/f₂(y) = f₁(x)dx et on intègre. |
| Forme d'une équation linéaire du 1er ordre ? | a(x)y' + b(x)y = f(x). |
| Solution de l'ESSM a y' + b y = 0 ? | y = K e^(−P(x)), P primitive de b/a. |
| Structure de la solution générale (linéaire) ? | Solution de l'ESSM + une solution particulière. |
| Principe de la variation de la constante ? | Remplacer K par une fonction K(x) dans la solution de l'ESSM. |
| Solutions de y' + ay = b ? | y = K e^(−ax) + b/a. |
| Limite de y si y' + ay = b avec a > 0 ? | b/a (le terme exponentiel s'éteint). |
| Changement de variable pour Bernoulli ? | z = y^(1−n). |
| Équation homogène y' = f(x, y) : changement ? | u = y/x, soit y = ux. |
| Loi de Newton du refroidissement ? | dT/dt = k(T − T_ambiante). |
| Température limite d'un objet qui refroidit ? | La température ambiante. |
| Courant limite dans un circuit RL sous tension V ? | V/R. |
| Constante de temps d'un circuit RL ? | τ = L/R. |
| Vitesse limite d'une chute avec frottement kv ? | mg/k. |

## Exercices générables
### c9-type — Reconnaître le type
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : De quel type est l'équation {equation} ?
- Paramètres : equation ∈ {y' = x²y³ → variables séparables ; y' + 2y = eˣ → linéaire ; y' = (x² + y²)/(xy) → homogène ; y' + xy = x³y³ → Bernoulli ; y' = sin(x)·(1 + y²) → variables séparables}.
- Réponse : le type associé.
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : les autres types de la liste.
- Explication de la solution : séparable si y' = f(x)·g(y) ; linéaire si y et y' au premier degré ; homogène si y' ne dépend que de y/x ; Bernoulli si y' + Py = Qyⁿ avec n ≠ 0, 1.
- Inspiré de : §5.1.1 a) Classification (p. 157), exemple 5.14.

### c9-croissance — Croissance exponentielle
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : y' = {k}y et y(0) = {y0}. Calcule y(1) (arrondi à 0,01).
- Paramètres : k ∈ {−2 ; −1 ; −0,5 ; 0,5 ; 1 ; 2} ; y0 entier de 1 à 10.
- Réponse : y0·e^k
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : y0 + k → « croissance linéaire » ; e^k → « condition initiale oubliée ».
- Explication de la solution : y = C e^({k}x) et y(0) = C = {y0}, donc y(1) = {y0} e^{k}.
- Inspiré de : exemple 5.10 (p. 163), §5.1.5 a).

### c9-limite — Valeur d'équilibre
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Pour y' + {a}y = {b}, quelle est la limite de toute solution quand x → +∞ ? (arrondi à 0,01)
- Paramètres : a entier de 1 à 9 ; b entier de −20 à 20.
- Réponse : b/a
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : b → « a oublié » ; a/b → « rapport inversé ».
- Explication de la solution : y = K e^(−{a}x) + {b}/{a} et e^(−{a}x) → 0.
- Inspiré de : §5.1.5 c) (p. 165), exercices 2.16-2.17 et 5.17.2.

### c9-constante — Fixer la constante
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : y' + {a}y = {b} et y(0) = {y0}. La solution s'écrit y = K e^(−{a}x) + {b}/{a}. Que vaut K ?
- Paramètres : a entier de 1 à 5 ; b = a × s avec s entier de −5 à 5 ; y0 entier de −10 à 10.
- Réponse : K = y0 − b/a
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : y0 → « solution particulière oubliée » ; y0 + b/a → « erreur de signe ».
- Explication de la solution : en x = 0 : K + {b}/{a} = {y0}.
- Inspiré de : exemple 5.13 (p. 166), exemple 5.30.

### c9-newton — Temps de refroidissement
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Un objet à {T0} °C est placé dans une pièce à {Tm} °C. L'écart de température avec la pièce est divisé par 2 toutes les {h} min. Au bout de combien de minutes l'objet est-il à {T} °C ?
- Paramètres : Tm ∈ {15, 20} ; T0 = Tm + 80 ; h entier de 2 à 10 ; m entier de 1 à 4 ; T = Tm + 80/2^m.
- Réponse : t = m·h = h·log₂((T0 − Tm)/(T − Tm))
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : h·(T0 − T)/40 → « refroidissement supposé linéaire ».
- Explication de la solution : T − {Tm} = 80 × (1/2)^(t/{h}) ; l'écart passe de 80 à 80/2^m après m demi-périodes.
- Inspiré de : exemple 5.29 (p. 182), exercice 5.13.

### c9-rl — Courant limite dans un circuit RL
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Un circuit RL (R = {R} Ω, L = {L} H) est soumis à V = {V} V. Quelle est l'intensité limite du courant (en A, arrondi à 0,001) ?
- Paramètres : R ∈ {100, 200, 300, 600} ; L entier de 1 à 10 ; V ∈ {6, 12, 24}.
- Réponse : V/R
- Vérification : tolérance ±0,001.
- Distracteurs (QCM) ou erreurs typiques (numérique) : V/L → « L confondue avec R » ; L/R → « constante de temps ».
- Explication de la solution : i(t) = {V}/{R} + K e^(−{R}t/{L}) → {V}/{R}.
- Inspiré de : exemple 5.30 (p. 184 : 12/600 = 0,02 A), exercice 5.14.

### c9-separable — Variables séparables avec x
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : y' = {a}xy et y(0) = {y0}. Calcule y({x1}) (arrondi à 0,01).
- Paramètres : a ∈ {−2, −1, 1, 2} ; y0 entier de 1 à 5 ; x1 ∈ {1, 2} avec |a|·x1² ≤ 8.
- Réponse : y0·e^(a·x1²/2)
- Vérification : tolérance relative ±0,1 %.
- Distracteurs (QCM) ou erreurs typiques (numérique) : y0·e^(a·x1²) → « primitive de x prise égale à x² » ; y0·e^(a·x1).
- Explication de la solution : dy/y = {a}x dx ⇒ ln|y| = {a}x²/2 + C ⇒ y = {y0} e^({a}x²/2).
- Inspiré de : exemple 5.10 (p. 163 : y' + 2xy = 0).

### c9-variation — Variation de la constante
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Pour x > 0, y' − y/x = x² et y(1) = {c}. Calcule y(2).
- Paramètres : c entier de −10 à 10.
- Réponse : 2c + 3
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 2c → « solution particulière x³/2 oubliée » ; 2c + 4 → « constante K non corrigée de 1/2 ».
- Explication de la solution : y = Kx + x³/2 ; y(1) = K + 1/2 = {c} ⇒ K = {c} − 1/2 ; y(2) = 2K + 4.
- Inspiré de : exemple 5.11 (p. 164).

### c9-bernoulli — Changement de variable de Bernoulli
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Pour l'équation y' + P(x)y = Q(x)y^{n}, on pose z = y^k. Quel exposant k rend l'équation linéaire en z ?
- Paramètres : n ∈ {−1 ; 1/2 ; 2 ; 3 ; 4}.
- Réponse : k = 1 − n
- Vérification : égalité exacte (tolérance ±0,001 pour les fractions).
- Distracteurs (QCM) ou erreurs typiques (numérique) : n − 1 → « signe inversé » ; −n.
- Explication de la solution : en divisant par yⁿ, on fait apparaître y^(1−n) dont la dérivée est (1 − n)y^(−n)y'.
- Inspiré de : §5.1.6 a) (p. 166), exemple 5.14, exercice 5.8.

---

# Chapitre : Équations différentielles du second ordre
Source : §5.2 (p. 171-181, PDF 177-187), §5.3.3 (p. 185-186, PDF 191-192) ; exercices 5.10, 5.11, 5.16, 5.18, 5.19 (p. 189-191).
Niveau visé : tu résous les équations linéaires à coefficients constants ay'' + by' + cy = f(x) (équation caractéristique, trois cas, solution particulière polynomiale, exponentielle ou trigonométrique) et tu interprètes oscillateurs et circuits RLC.
Prérequis : Équations différentielles du premier ordre ; nombres complexes ; second degré.

## Explication pour un novice
Les équations du second ordre font intervenir y'' : l'accélération. Elles décrivent tout ce qui oscille ou vibre : une masse au bout d'un ressort, une balançoire, le courant dans un circuit RLC. La loi de Newton « masse × accélération = force » donne directement M x'' = −kx pour un ressort.

L'idée magique pour ay'' + by' + cy = 0 : chercher des solutions de la forme y = e^(rx), car dériver une exponentielle redonne une exponentielle. En remplaçant, on obtient ar² + br + c = 0 : l'équation caractéristique, une simple équation du second degré.

Trois cas, selon le discriminant Δ. Si Δ > 0, deux racines réelles r₁, r₂ : y = C₁e^(r₁x) + C₂e^(r₂x) (pas d'oscillation, comme une porte qui se referme doucement). Si Δ = 0, une racine double r : y = (C₁x + C₂)e^(rx). Si Δ < 0, deux racines complexes α ± jβ : y = e^(αx)(A cos βx + B sin βx) : ça oscille, avec une amplitude qui grandit ou s'amortit selon le signe de α.

Avec un second membre f(x) (une force extérieure qui pousse), on ajoute une solution particulière qui « ressemble » à f : un polynôme si f est un polynôme, une exponentielle si f est une exponentielle, etc. Il y a deux constantes à fixer, donc il faut deux conditions initiales : la position et la vitesse de départ.

## Notions (dans l'ordre d'apprentissage)
- Équation du second ordre : | F(x, y, y', y'') = 0 ; solution générale avec deux constantes C₁, C₂ (déf. 5.11).
- Conditions initiales : | y(x₀) = y₀ et y'(x₀) = y'₀ (position et vitesse).
- Équations sans y ou sans x : | se ramènent au premier ordre en posant z = y' (§5.2.1).
- Équation linéaire du second ordre : | a(x)y'' + b(x)y' + c(x)y = f(x) (déf. 5.12).
- Wronskien : test d'indépendance de deux solutions | w = y₁y₂' − y₂y₁' ≠ 0.
- Structure des solutions : | y = y_ESSM + y_particulière (théorème 5.2).
- Équation caractéristique : | ay'' + by' + cy = 0 ⇒ ar² + br + c = 0 (éq. 5.29).
- Cas Δ > 0 : | y = C₁e^(r₁x) + C₂e^(r₂x).
- Cas Δ = 0 : | y = (C₁x + C₂)e^(rx), r = −b/(2a).
- Cas Δ < 0 : | r = α ± jβ ⇒ y = e^(αx)(A cos βx + B sin βx) = Y e^(αx) cos(βx − φ).
- Solution particulière, second membre polynôme : | polynôme de même degré si c ≠ 0 (degré + 1 si c = 0, b ≠ 0).
- Second membre P(x)e^(mx) : | y_p = Q(x)e^(mx), deg Q = deg P (+1 si m racine simple, +2 si racine double).
- Second membre trigonométrique : | passer par cos kx = (e^(jkx) + e^(−jkx))/2.
- Variation des constantes (Lagrange) : | c₁'y₁ + c₂'y₂ = 0 et c₁'y₁' + c₂'y₂' = f/a.
- Oscillateur harmonique : | M x'' + kx = 0 ⇒ x = A cos ωt + B sin ωt, ω = √(k/M).
- Circuit RLC : | q'' + 2αq' + ω²q = V/L avec α = R/(2L), ω = 1/√(LC).

## Méthodes
### Résoudre ay'' + by' + cy = 0
1. Écris l'équation caractéristique ar² + br + c = 0.
2. Calcule Δ = b² − 4ac.
3. Δ > 0 : y = C₁e^(r₁x) + C₂e^(r₂x).
4. Δ = 0 : y = (C₁x + C₂)e^(rx).
5. Δ < 0 : racines α ± jβ, y = e^(αx)(A cos βx + B sin βx).

### Trouver une solution particulière (second membre polynôme px + q, c ≠ 0)
1. Cherche y_p = Ax + B.
2. y_p' = A, y_p'' = 0 ; remplace : bA + c(Ax + B) = px + q.
3. Identifie : cA = p et bA + cB = q.

### Utiliser les conditions initiales
1. Écris la solution générale complète (ESSM + particulière).
2. Calcule y'.
3. Remplace x = x₀ dans y et y' : tu obtiens un système en C₁, C₂.
4. Résous et écris la solution unique.

## Exemples résolus
### y'' + y' − 2y = 0 (exemple 5.23)
- r² + r − 2 = 0, Δ = 9 — deux racines réelles.
- r₁ = 1, r₂ = −2 : y = C₁eˣ + C₂e^(−2x).

### y'' − 8y' + 41y = 0, y(0) = 1, y'(0) = −1 (exemple 5.24)
- r² − 8r + 41 = 0, Δ = −100 ⇒ r = 4 ± 5j.
- y = e^(4x)(A cos 5x + B sin 5x) ; y(0) = A = 1.
- y'(0) = 4A + 5B = −1 ⇒ B = −1 : y = e^(4x)(cos 5x − sin 5x) = √2 e^(4x) cos(5x + π/4).

### y'' − 6y' + 9y = 0 (exemple 5.25)
- (r − 3)² = 0 : racine double 3.
- y = (ax + b)e^(3x).

### y'' − 4y' + 3y = 6x + 1 (exercice 5.10.8)
- ESSM : r² − 4r + 3 = 0 ⇒ r = 1, 3 : y = C₁eˣ + C₂e^(3x).
- y_p = Ax + B : −4A + 3Ax + 3B = 6x + 1 ⇒ A = 2, B = 3.
- y = C₁eˣ + C₂e^(3x) + 2x + 3.

## Pièges fréquents
- Oublier la solution particulière → avec un second membre, y = y_ESSM + y_p.
- Prendre une seule exponentielle quand Δ = 0 → il faut (C₁x + C₂)e^(rx).
- Écrire e^(βx) au lieu de cos βx pour des racines complexes → la partie imaginaire β donne l'oscillation, la partie réelle α l'amplitude e^(αx).
- Chercher y_p de même forme que f quand m est racine caractéristique → augmente le degré (multiplie par x).
- Fixer les constantes sur l'ESSM avant d'ajouter y_p → les conditions initiales s'appliquent à la solution complète.
- Confondre ω et la période → T = 2π/ω.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Équation caractéristique de ay'' + by' + cy = 0 ? | ar² + br + c = 0. |
| Pourquoi chercher y = e^(rx) ? | Ses dérivées restent des multiples de e^(rx). |
| Solution si Δ > 0 ? | C₁e^(r₁x) + C₂e^(r₂x). |
| Solution si Δ = 0 ? | (C₁x + C₂)e^(rx), r = −b/(2a). |
| Solution si Δ < 0 (r = α ± jβ) ? | e^(αx)(A cos βx + B sin βx). |
| Combien de constantes pour le 2e ordre ? | Deux. |
| Conditions initiales classiques ? | y(x₀) et y'(x₀) (position et vitesse). |
| Structure de la solution générale ? | Solution de l'ESSM + une solution particulière. |
| y_p pour un second membre constant d (c ≠ 0) ? | y_p = d/c. |
| y_p pour un second membre polynôme (c ≠ 0) ? | Un polynôme de même degré. |
| Équation de l'oscillateur ressort-masse ? | M x'' + kx = 0. |
| Pulsation de l'oscillateur ? | ω = √(k/M). |
| Période d'un oscillateur de pulsation ω ? | T = 2π/ω. |
| Solutions de y'' + ω²y = 0 ? | A cos ωx + B sin ωx. |
| Amplitude de A cos ωt + B sin ωt ? | √(A² + B²). |
| Coefficient d'amortissement d'un RLC série ? | α = R/(2L). |
| Pulsation propre d'un RLC ? | ω₀ = 1/√(LC). |
| Équation sans y : changement de variable ? | z = y' (on se ramène au premier ordre). |

## Exercices générables
### c10-racine — Racine de l'équation caractéristique
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Pour y'' + {b}y' + {c}y = 0, donne la plus grande racine de l'équation caractéristique.
- Paramètres : r₁ < r₂ entiers de −5 à 5 ; b = −(r₁ + r₂) ; c = r₁ r₂.
- Réponse : r₂ = (−b + √(b² − 4c))/2
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : −r₂ → « signe de b oublié » ; r₁.
- Explication de la solution : r² + {b}r + {c} = 0 ; Δ = {b}² − 4{c} ; r = (−{b} ± √Δ)/2.
- Inspiré de : exemple 5.23 (p. 176), exercice 5.10.4.

### c10-cas — Forme de la solution
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : Quelle est la forme des solutions de y'' + {b}y' + {c}y = 0 ?
- Paramètres : b, c entiers de −10 à 10, choisis pour couvrir Δ > 0, Δ = 0, Δ < 0.
- Réponse : Δ > 0 : C₁e^(r₁x) + C₂e^(r₂x) ; Δ = 0 : (C₁x + C₂)e^(rx) ; Δ < 0 : e^(αx)(A cos βx + B sin βx).
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : les deux autres formes ; C e^(rx) seul → « une seule constante ».
- Explication de la solution : on calcule Δ = {b}² − 4{c} et on lit le cas.
- Inspiré de : §5.2.3 a) (p. 176-178).

### c10-complexe — Pulsation d'une solution oscillante
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Les solutions de y'' + {b}y' + {c}y = 0 s'écrivent e^(αx)(A cos βx + B sin βx) avec β > 0. Que vaut β ?
- Paramètres : α entier de −4 à 4 ; β entier de 1 à 6 ; b = −2α ; c = α² + β².
- Réponse : β = √(c − b²/4)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : α → « partie réelle au lieu d'imaginaire » ; β² → « racine oubliée ».
- Explication de la solution : Δ = {b}² − 4{c} < 0, r = (−{b} ± j√(−Δ))/2, donc β = √(−Δ)/2.
- Inspiré de : exemple 5.24 (p. 177 : r = 4 ± 5j), exercice 5.10.3.

### c10-double — Racine double
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : L'équation y'' + {b}y' + {c}y = 0 a une racine caractéristique double r. Que vaut r ?
- Paramètres : r entier de −5 à 5, r ≠ 0 ; b = −2r ; c = r².
- Réponse : r = −b/2
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : b/2 → « signe oublié » ; −b → « facteur 2a oublié ».
- Explication de la solution : Δ = 0 et r = −{b}/(2×1).
- Inspiré de : exemple 5.25 (p. 178), exercice 5.10.6.

### c10-oscillateur — Pulsation d'un ressort
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Une masse M = {M} kg est attachée à un ressort de raideur k = {k} N/m. Quelle est la pulsation ω (en rad/s) ?
- Paramètres : M entier de 1 à 5 ; ω entier de 1 à 6 ; k = M·ω².
- Réponse : ω = √(k/M)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : k/M → « racine oubliée » ; √(M/k) → « rapport inversé ».
- Explication de la solution : M x'' + kx = 0 ⇔ x'' + (k/M)x = 0, donc ω² = {k}/{M}.
- Inspiré de : §5.3.3 a) (p. 185).

### c10-constante — Solution particulière constante
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Trouve la solution particulière constante de y'' + {b}y' + {c}y = {d} (arrondi à 0,01).
- Paramètres : b entier de −5 à 5 ; c entier non nul de −6 à 6 ; d entier de −20 à 20.
- Réponse : y_p = d/c
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : d → « c oublié » ; d/b → « mauvais coefficient ».
- Explication de la solution : pour y constante, y' = y'' = 0, donc {c}y = {d}.
- Inspiré de : exercice 5.10.5 (p. 189 : y'' − 4y' + 2y = 4).

### c10-polynome — Solution particulière affine
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : On cherche y_p = Ax + B solution de y'' + {b}y' + {c}y = {p}x + {q}. Que vaut B ?
- Paramètres : A, B entiers de −5 à 5 ; b entier de −5 à 5 ; c entier non nul de −5 à 5 ; p = c·A ; q = b·A + c·B.
- Réponse : B = (q − b·p/c)/c
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : q/c → « terme b·A oublié » ; A = p/c → « mauvais coefficient demandé ».
- Explication de la solution : y_p' = A, y_p'' = 0 ⇒ {b}A + {c}(Ax + B) = {p}x + {q} ⇒ A = {p}/{c}, puis B = ({q} − {b}A)/{c}.
- Inspiré de : exercice 5.10.8 (p. 189 : A = 2, B = 3).

### c10-amplitude — Amplitude d'une oscillation
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : x'' + {w}²x = 0 avec x(0) = {x0} et x'(0) = {v0}. Quelle est l'amplitude du mouvement ?
- Paramètres : w entier de 1 à 5 ; (x0, B) ∈ {(3, 4), (4, 3), (5, 12), (6, 8), (1, 0)} ; v0 = B·w.
- Réponse : √(x0² + (v0/w)²)
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : √(x0² + v0²) → « division par ω oubliée » ; x0 + v0/w.
- Explication de la solution : x = {x0} cos {w}t + ({v0}/{w}) sin {w}t ; amplitude √(A² + B²).
- Inspiré de : §5.3.3 a) (p. 186 : x(0) = 1, x'(0) = √3 ω donne a = 2), exercice 5.18.

### c10-rlc — Amortissement d'un circuit RLC
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Un circuit RLC série a R = {R} Ω et L = {L} H. Calcule le coefficient d'amortissement α = R/(2L) (en s⁻¹, arrondi à 0,01).
- Paramètres : R entier de 10 à 1000 ; L ∈ {0,1 ; 0,5 ; 1 ; 2 ; 5}.
- Réponse : R/(2L)
- Vérification : tolérance ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : R/L → « facteur 2 oublié » ; 1/√(LC) → « pulsation propre au lieu de α ».
- Explication de la solution : q'' + (R/L)q' + q/(LC) = V/L s'écrit q'' + 2αq' + ω²q = V/L avec 2α = R/L.
- Inspiré de : §5.3.3 b) (p. 186).

---

## Notes pour l'intégration

### Bilan par chapitre (ordre du parcours)
| Étape | Chapitre | Flashcards | Exercices générables |
|---|---|---|---|
| 1 | Bases 1 — Nombres, puissances et calcul algébrique | 20 | 9 |
| 2 | Bases 2 — Fonctions et trigonométrie de référence | 20 | 8 |
| 3 | Fonctions usuelles, réciproques et hyperboliques | 20 | 9 |
| 4 | Limites et continuité | 20 | 10 |
| 5 | Dérivées | 21 | 10 |
| 6 | Étude de fonctions et optimisation | 18 | 10 |
| 7 | Développements limités | 18 | 10 |
| 8 | Suites numériques | 17 | 8 |
| 9 | Primitives et intégrales | 20 | 10 |
| 10 | Applications des intégrales | 15 | 9 |
| 11 | Séries numériques et séries entières | 18 | 9 |
| 12 | Nombres complexes | 19 | 10 |
| 13 | Équations différentielles du premier ordre | 18 | 9 |
| 14 | Équations différentielles du second ordre | 18 | 9 |

### Conditions de lecture du document
- Le PDF n'a pas pu être rendu en images (outil de rendu absent) ; tout le texte a été extrait avec pdftotext. Conséquence : les **figures et graphiques** (courbes des fonctions, schémas de tangente, cercle trigonométrique, circuits RL/RLC, ressort, découpe de boîte, cylindre inscrit, etc.) n'ont pas été vus ; seules leurs légendes sont connues.
- L'extraction a perdu de nombreux symboles (signes moins, barres de fraction, racines, exposants, indices). Les formules ont été reconstituées à partir du contexte et vérifiées par recalcul ; les énoncés d'exercices du TD dont les paramètres étaient illisibles n'ont pas été recopiés tels quels (ex. 2.20, 2.23, 3.33, 4.2, 4.4, 5.1 : seule leur idée a servi).
- Pages PDF 238-241 (annexe D.3 « Autres formes géométriques ») : aucun texte extractible, probablement des figures seules. Non exploitées.
- Le cours numérote ses pages à partir de l'avant-propos : page imprimée = page PDF − 6. La table des matières du PDF est elle-même mal alignée dans l'extraction ; les numéros donnés ici ont été relevés dans le corps du texte.

### Contenus non transformés en exercices vérifiables
- Démonstrations et inégalités à prouver (ex. 2.2, 3.1, 3.5, 3.7, 3.22-3.23, 3.44-3.45, 4.7, 4.23, 6.1 partie « vérifier », 2.29 démonstrations) : utilisées seulement comme sources de flashcards.
- Tracés de graphes et études graphiques (ex. 2.4, 2.5, 2.30, 2.31, 3.28-3.30 partie tracé).
- Équations de Riccati, Lagrange et Clairaut (§5.1.6 b-d) et équations homogènes / se ramenant aux homogènes (§5.1.3-5.1.4) : solutions implicites ou paramétriques, non vérifiables par une formule simple ; présentes dans les notions et flashcards uniquement.
- Méthode de variation des constantes de Lagrange au second ordre (§5.2.2 b, exemple 5.28) et équations à coefficients variables (exemple 5.21) : trop longues pour une réponse courte.
- Intégrales de fractions rationnelles avec décomposition en éléments simples complète, récurrence Jₖ (§4.2.3 d), fonctions irrationnelles et substitutions trigonométriques (§4.2.3 e-f) : la réponse est une expression, pas un nombre ; seule la forme arctan a été retenue (c6-arctan).
- Centre de gravité d'une courbe pesante (exemple 4.37), surfaces de révolution, longueurs d'arcs non triviales (ex. 4.12-4.14) : nécessitent une intégration numérique ; à ajouter seulement si l'application accepte une tolérance et calcule la valeur numériquement.
- Séries de Fourier : annoncées en introduction du chapitre 6 (« traitée dans un autre chapitre ») mais absentes du document.

### Points du cours à signaler (coquilles ou ambiguïtés)
- p. 46 : « f(0) = 0² + 1 = 0 » doit se lire f(0) = 1.
- Exemple 6.16 (p. 206) : la série est écrite avec 7n puis calculée avec 5n ; la conclusion (convergence) reste juste.
- Formule (4.33) p. 147 : Y_G = (1/m) ∫ λ y² dx ; la formule usuelle comporte un facteur 1/2 (Y_G = (1/(2m)) ∫ λ y² dx). L'exercice c7-centre-gravite n'utilise donc que X_G.
- Déf. 3.12-3.13 (p. 81) : le cours appelle « concave » une courbe tournée vers le haut, alors que la définition 2.18 (p. 28) et l'usage courant parlent de « convexe ». Signalé dans les pièges ; les exercices s'appuient seulement sur le signe de f''.
- Le mot « homogène » a deux sens au chapitre 5 (y' fonction de y/x en §5.1.3 ; équation sans second membre en §5.1.5). Signalé dans les pièges.
- Le cours écrit tan(π/2) = +∞ (p. 24) : il s'agit d'une limite, pas d'une valeur ; l'application ne doit pas reprendre cette écriture.

### Conventions pour l'application
- Unité imaginaire : le cours utilise j ; les exercices du chapitre « Nombres complexes » sont écrits avec j. Prévoir un réglage d'affichage j ↔ i.
- Réponses décimales : virgule décimale à l'affichage ; accepter aussi le point en saisie.
- Les gabarits notés « c·π » ou « e^m » demandent le coefficient c ou l'exposant m, pour garder une réponse numérique simple.
