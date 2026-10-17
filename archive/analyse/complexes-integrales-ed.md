# Analyse : Nombres complexes, Intégrales, Équations différentielles (CNAM MVA005)

Fichiers analysés (lus en entier) :
- `TD complexes.pdf` (5 pages, exercices 1 à 8, corrigés)
- `TD integral.pdf` (33 pages, exercices 1 à 27, corrigés)
- `TD equations differentielles.pdf` (27 pages, exercices 1 à 19, corrigés)

Convention de notation : le TD (style ingénieur) note le nombre imaginaire **j**. Dans l'application on écrit **i** et on rappelle une fois que « i = j du TD ». Tous les énoncés ci-dessous utilisent i.

---

# Chapitre : Nombres complexes
Source : `TD complexes.pdf`, pages 1 à 5, exercices 1 à 8
Niveau visé : calculer avec des complexes sous forme algébrique, trigonométrique et exponentielle, trouver module et argument, résoudre une équation du second degré dans ℂ, extraire une racine carrée ou une racine n-ième, reconnaître un lieu géométrique (cercle, médiatrice).
Prérequis : calcul littéral et identités remarquables ; équation du second degré réelle (discriminant Δ) ; théorème de Pythagore ; cosinus et sinus des angles remarquables (π/6, π/4, π/3, π/2) en radians.

## Explication pour un novice
Dans les nombres réels, aucun nombre au carré ne donne −1 : un carré est toujours positif. Les mathématiciens ont décidé d'inventer un nombre, noté i (le TD l'écrit j), dont le carré vaut −1. Avec ce seul ajout, toutes les équations du second degré ont des solutions. C'est comme ajouter une nouvelle direction sur une carte : avant on ne pouvait aller que vers l'est ou l'ouest (la droite des réels), maintenant on peut aussi aller vers le nord ou le sud.

Un nombre complexe s'écrit z = a + ib, avec a et b réels. Le nombre a est la partie réelle (on avance de a vers l'est), b est la partie imaginaire (on monte de b vers le nord). On dessine donc z comme un point de coordonnées (a ; b) dans un plan, le plan complexe. On calcule comme avec des polynômes en i, en remplaçant i² par −1 dès qu'il apparaît.

Un point du plan peut aussi se repérer autrement : par sa distance à l'origine (le module, noté |z|) et par l'angle qu'il fait avec l'axe horizontal (l'argument, noté arg z). C'est la différence entre « 3 pas à l'est puis 4 pas au nord » et « 5 pas en direction du nord-est un peu plus pentu ». Les deux décrivent le même point.

Cette seconde description s'écrit z = r(cos θ + i sin θ) (forme trigonométrique) ou, en plus court, z = r·e^(iθ) (forme exponentielle, grâce à la formule d'Euler e^(iθ) = cos θ + i sin θ). Son grand avantage : pour multiplier deux complexes, on multiplie les modules et on additionne les angles. Élever à la puissance n ou extraire une racine n-ième devient alors très simple.

Enfin, le module mesure une distance : |z − a| est la distance entre les points z et a. Une égalité entre modules décrit donc une figure géométrique : |z − a| = r est un cercle, |z − a| = |z − b| est une médiatrice.

## Notions (dans l'ordre d'apprentissage)
- Nombre i : le nombre dont le carré vaut −1 | i² = −1 (noté j dans le TD)
- Forme algébrique : écrire z comme « réel + réel × i » | z = a + ib, a ∈ ℝ, b ∈ ℝ
- Partie réelle, partie imaginaire : les deux coordonnées du nombre | Re(z) = a, Im(z) = b (Im est un réel, sans le i)
- Égalité de deux complexes : mêmes parties réelles et mêmes parties imaginaires | a + ib = a' + ib' ⇔ a = a' et b = b'
- Somme et produit : on calcule comme avec des lettres et on remplace i² par −1 | (a + ib)(c + id) = (ac − bd) + i(ad + bc)
- Conjugué : le symétrique par rapport à l'axe horizontal | z̄ = a − ib
- Module : la distance du point à l'origine | |z| = √(a² + b²), et z·z̄ = |z|²
- Quotient : on multiplie en haut et en bas par le conjugué du bas | z/w = z·w̄ / |w|²
- Plan complexe : chaque complexe est un point, chaque point est un complexe | z = a + ib ↔ M(a ; b), z est l'affixe de M
- Argument : l'angle entre l'axe horizontal et le segment origine → point | θ tel que cos θ = a/|z| et sin θ = b/|z|, défini à 2π près (z ≠ 0)
- Forme trigonométrique : on décrit z par sa distance et son angle | z = r(cos θ + i sin θ), r = |z|, θ = arg z
- Forme exponentielle : écriture courte de la forme trigonométrique | e^(iθ) = cos θ + i sin θ (Euler), z = r e^(iθ)
- Règles des modules et arguments : multiplier = multiplier les distances et ajouter les angles | |zz'| = |z||z'|, arg(zz') = arg z + arg z' (2π), |1/z| = 1/|z|
- Formule de Moivre : puissance n = module puissance n et angle multiplié par n | (r e^(iθ))^n = r^n e^(inθ)
- Équation du second degré à coefficients réels avec Δ < 0 : deux solutions conjuguées | z = (−b ± i√(−Δ)) / (2a)
- Racine carrée d'un complexe : un nombre dont le carré redonne w | ω = x + iy avec x² − y² = Re w, 2xy = Im w, x² + y² = |w|
- Équation du second degré à coefficients complexes : même formule, avec une racine carrée complexe de Δ | z = (−b ± δ)/(2a), δ² = Δ
- Racines n-ièmes : les n solutions de ω^n = Z | si Z = R e^(iα) : ω_k = R^(1/n) e^(i(α + 2kπ)/n), k = 0, …, n − 1
- Racines n-ièmes de l'unité : n points régulièrement espacés sur le cercle de rayon 1 | u_k = e^(2ikπ/n) ; leur somme vaut 0 (n ≥ 2)
- Lieux géométriques : une égalité de distances dessine une figure | |z − a| = r : cercle ; |z − a| = |z − b| : médiatrice de [a ; b]

## Méthodes
### Calculer un produit ou un quotient
1. Pour un produit, développe comme d'habitude (double distributivité).
2. Remplace chaque i² par −1.
3. Regroupe les termes sans i (partie réelle) et les termes avec i (partie imaginaire).
4. Pour un quotient z/w, multiplie le numérateur et le dénominateur par w̄ : le dénominateur devient |w|², un réel positif.
5. Divise chaque partie du numérateur par ce réel.

### Trouver le module et l'argument
1. Calcule r = √(a² + b²).
2. Calcule cos θ = a/r et sin θ = b/r.
3. Reconnais l'angle dans le tableau des valeurs remarquables (place le point dans le plan pour vérifier le quadrant).
4. Écris z = r e^(iθ).

### Résoudre az² + bz + c = 0 avec a, b, c réels
1. Calcule Δ = b² − 4ac.
2. Si Δ ≥ 0, formule habituelle. Si Δ < 0, écris Δ = (i√(−Δ))².
3. Les solutions sont z = (−b ± i√(−Δ)) / (2a). Elles sont conjuguées l'une de l'autre.

### Trouver les racines carrées de w = a + ib (méthode algébrique, TD ex. 2)
1. Pose ω = x + iy et écris ω² = w : x² − y² = a et 2xy = b.
2. Ajoute l'égalité des modules : x² + y² = |w|.
3. En additionnant et soustrayant les deux équations en x² et y², trouve x² et y².
4. Choisis les signes de x et y grâce à 2xy = b (même signe si b > 0, signes opposés si b < 0).
5. Tu obtiens deux racines opposées : ω et −ω.

### Résoudre ω^n = Z (racines n-ièmes, TD ex. 8.4)
1. Écris Z sous forme exponentielle : Z = R e^(iα).
2. Le module des solutions est R^(1/n).
3. Les arguments sont (α + 2kπ)/n pour k = 0, 1, …, n − 1.
4. Repasse en forme algébrique si on le demande.

### Trouver un lieu géométrique défini par des modules (TD ex. 1 et 7)
1. Pose z = x + iy.
2. Élève au carré les égalités de modules (pour supprimer les racines) : |x + iy|² = x² + y².
3. Développe et simplifie.
4. Reconnais une équation de cercle (x − x₀)² + (y − y₀)² = R² ou de droite.

## Exemples résolus
### Calculer (2 + 3i)(1 − i)
- (2 + 3i)(1 − i) = 2 − 2i + 3i − 3i² — on distribue chaque terme.
- = 2 + i − 3(−1) — on remplace i² par −1.
- = 5 + i — on regroupe : partie réelle 5, partie imaginaire 1.

### Module et forme exponentielle de z = 1 + i√3
- |z| = √(1² + (√3)²) = √4 = 2 — Pythagore.
- cos θ = 1/2 et sin θ = √3/2 — on divise chaque partie par le module.
- θ = π/3 — angle remarquable, le point est en haut à droite.
- z = 2 e^(iπ/3) — on assemble distance et angle.

### Résoudre z² + 2z + 5 = 0
- Δ = 2² − 4 × 1 × 5 = −16 — discriminant négatif, pas de solution réelle.
- −16 = (4i)² — on écrit Δ comme un carré grâce à i.
- z = (−2 ± 4i)/2 = −1 ± 2i — formule habituelle.

### Racines carrées de w = −15 − 8i (TD ex. 2)
- On cherche x + iy avec x² − y² = −15, 2xy = −8, x² + y² = |w| = √(225 + 64) = 17 — les trois équations.
- 2x² = 2 donc x² = 1 ; 2y² = 32 donc y² = 16 — on additionne puis on soustrait.
- xy = −4 < 0, donc x et y de signes opposés : ω = 1 − 4i ou ω = −1 + 4i — on choisit les signes.
- Application : z² + (2i − 3)z + 5 − i = 0 a pour discriminant Δ = −15 − 8i, donc z = (3 − 2i ± (1 − 4i))/2, soit z = 2 − 3i ou z = 1 + i.

### Trouver z tel que z, 1/z et 1 − z ont le même module (TD ex. 4)
- |z| = |1/z| donne |z|² = 1, donc x² + y² = 1 — le point est sur le cercle de rayon 1.
- |z| = |1 − z| donne x² = (1 − x)², donc x = 1/2 — le point est à égale distance de 0 et de 1.
- y² = 1 − 1/4 = 3/4, donc y = ±√3/2 — on reporte.
- z = 1/2 + i√3/2 ou z = 1/2 − i√3/2.

## Pièges fréquents
- Écrire Im(2 + 7i) = 7i → la partie imaginaire est le réel 7, sans le i.
- Oublier que i² = −1 et garder « +bd » dans la partie réelle d'un produit → toujours remplacer i² par −1 avant de regrouper.
- Diviser « partie par partie » : (a + ib)/(c + id) ≠ a/c + i b/d → multiplier par le conjugué du dénominateur.
- Prendre arctan(b/a) sans regarder le quadrant (−1 − i a le même rapport que 1 + i) → placer le point dans le plan avant de conclure.
- Oublier la racine carrée du module : |3 + 4i| = 5, pas 25.
- Pour les racines n-ièmes, écrire α/n + 2kπ au lieu de (α + 2kπ)/n → on divise aussi le 2kπ par n, sinon on ne trouve qu'une seule solution.
- Croire qu'il y a une seule racine carrée : il y en a toujours deux, opposées.
- Confondre conjugué (a − ib) et opposé (−a − ib).

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Que vaut i² ? | −1. Dans le TD, i est noté j. |
| Forme algébrique d'un complexe ? | z = a + ib, avec a et b réels. |
| Partie imaginaire de 3 − 5i ? | −5 (un réel, sans le i). La partie réelle est 3. |
| Conjugué de a + ib ? | a − ib : on change le signe de la partie imaginaire. |
| Que vaut z × z̄ ? | a² + b² = \|z\|², un réel positif. |
| Module de a + ib ? | \|z\| = √(a² + b²) : distance du point à l'origine. |
| Comment diviser par c + id ? | Multiplier en haut et en bas par le conjugué c − id. |
| Qu'est-ce que l'argument de z ? | L'angle entre l'axe des réels et le segment origine → z, défini à 2π près. |
| Forme trigonométrique de z ? | z = r(cos θ + i sin θ), avec r = \|z\| et θ = arg z. |
| Formule d'Euler ? | e^(iθ) = cos θ + i sin θ. |
| Forme exponentielle de 1 + i ? | √2 e^(iπ/4). |
| Forme exponentielle de i ? | e^(iπ/2). |
| Module d'un produit zz' ? | \|z\| × \|z'\|. |
| Argument d'un produit zz' ? | arg z + arg z' (à 2π près). |
| Module de 1/z ? | 1/\|z\|. |
| Formule de Moivre ? | (cos θ + i sin θ)^n = cos nθ + i sin nθ, soit (e^(iθ))^n = e^(inθ). |
| Que vaut i⁴ ? | 1 : les puissances de i se répètent tous les 4 (i, −1, −i, 1). |
| az² + bz + c = 0 réelle, Δ < 0 : solutions ? | z = (−b ± i√(−Δ))/(2a), deux solutions conjuguées. |
| Combien de solutions a ω^n = Z (Z ≠ 0) ? | Exactement n solutions. |
| Arguments des solutions de ω^n = R e^(iα) ? | (α + 2kπ)/n pour k = 0, 1, …, n − 1. |
| Racines n-ièmes de l'unité ? | e^(2ikπ/n), k = 0 à n − 1 : n points réguliers sur le cercle unité. |
| Somme des n racines n-ièmes de l'unité ? | 0 (pour n ≥ 2). C'est le TD ex. 3. |
| Système pour la racine carrée de a + ib ? | x² − y² = a, x² + y² = \|a + ib\|, 2xy = b. |
| Ensemble des z tels que \|z − a\| = r ? | Le cercle de centre a et de rayon r. |
| Ensemble des z tels que \|z − a\| = \|z − b\| ? | La médiatrice du segment [a ; b]. Ex. : \|1 + iz\| = \|1 − iz\| ⇔ z réel (TD ex. 7). |
| Que vaut e^(iφ)/e^(−iφ) ? | e^(2iφ). C'est (1 + i tan φ)/(1 − i tan φ) (TD ex. 6). |
| Valeur de tan(π/8) ? | √2 − 1 (TD ex. 6.3). |

## Exercices générables

### cx-puissance-i — Puissances de i
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : Calcule i^{n}.
- Paramètres : n entier dans [2 ; 40].
- Réponse : selon le reste r de la division de n par 4 : r = 0 → 1 ; r = 1 → i ; r = 2 → −1 ; r = 3 → −i.
- Vérification : égalité exacte avec l'option correcte.
- Distracteurs (QCM) : les trois autres valeurs parmi {1, i, −1, −i} → erreur de cycle (mauvais reste, ou oubli que i² = −1).
- Explication de la solution : i¹ = i, i² = −1, i³ = −i, i⁴ = 1, puis ça recommence. {n} = 4 × {q} + {r}, donc i^{n} = (i⁴)^{q} × i^{r} = i^{r} = {réponse}.
- Inspiré de : prérequis de tout le TD (calculs en j).

### cx-conjugue — Conjugué d'un complexe
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : Quel est le conjugué de z = {a} + {b}i ?
- Paramètres : a et b entiers dans [−9 ; 9], a ≠ 0, b ≠ 0. Afficher proprement les signes (ex. « 3 − 4i »).
- Réponse : {a} − {b}i.
- Vérification : égalité exacte avec l'option correcte.
- Distracteurs (QCM) : −a + bi → signe changé sur la mauvaise partie ; −a − bi → opposé au lieu du conjugué ; b + ai → parties échangées.
- Explication de la solution : Le conjugué garde la partie réelle {a} et change le signe de la partie imaginaire : {b} devient −{b}. Donc z̄ = {a} − {b}i. Géométriquement, c'est le symétrique par rapport à l'axe horizontal.
- Inspiré de : TD complexes, ex. 5 et 8 (usage du conjugué).

### cx-module — Module d'un complexe
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule le module de z = {a} + {b}i.
- Paramètres : (|a| ; |b|) tiré parmi (3 ; 4), (4 ; 3), (6 ; 8), (8 ; 6), (5 ; 12), (12 ; 5), (8 ; 15), (15 ; 8), (9 ; 12), (12 ; 9) ; signes de a et b au hasard.
- Réponse : √(a² + b²) (entier grâce aux triplets pythagoriciens).
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : a² + b² → oubli de la racine ; |a| + |b| → addition des coordonnées ; a + b → signes mal gérés.
- Explication de la solution : |z| = √({a}² + {b}²) = √({a²} + {b²}) = √{a²+b²} = {réponse}. C'est la distance de l'origine au point ({a} ; {b}), par Pythagore.
- Inspiré de : TD complexes, ex. 1, 2 et 4 (calculs de modules).

### cx-produit — Produit de deux complexes
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Soit z = ({a} + {b}i)({c} + {d}i). Donne la {partie demandée} de z.
- Paramètres : a, b, c, d entiers dans [−6 ; 6], b ≠ 0, d ≠ 0 ; partie demandée ∈ {réelle, imaginaire}.
- Réponse : partie réelle = ac − bd ; partie imaginaire = ad + bc.
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : ac + bd → oubli de i² = −1 ; ac (ou bd) → oubli d'un terme du développement ; ad − bc → erreur de signe.
- Explication de la solution : On développe : {a}×{c} + {a}×{d}i + {b}i×{c} + {b}×{d}i². Comme i² = −1 : partie réelle = {a}×{c} − {b}×{d} = {ac−bd} ; partie imaginaire = {a}×{d} + {b}×{c} = {ad+bc}.
- Inspiré de : TD complexes, ex. 2 (calcul de (2j − 3)²) et ex. 8.

### cx-quotient — Quotient de deux complexes
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Mets sous forme algébrique z = ({A} + {B}i) / ({c} + {d}i) et donne sa {partie demandée}.
- Paramètres : choisir d'abord le résultat p + qi avec p, q entiers dans [−5 ; 5] ; choisir c, d entiers dans [−4 ; 4] avec d ≠ 0 ; calculer A = pc − qd et B = pd + qc (ainsi le quotient tombe juste). Partie demandée ∈ {réelle, imaginaire}.
- Réponse : partie réelle = p ; partie imaginaire = q.
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : A/c (ou B/d) → division partie par partie ; (Ac + Bd) sans diviser par c² + d² → oubli du dénominateur ; signe de q inversé → multiplication par w au lieu de w̄.
- Explication de la solution : On multiplie en haut et en bas par le conjugué {c} − {d}i. Le bas devient {c}² + {d}² = {c²+d²}. Le haut devient ({A} + {B}i)({c} − {d}i) = {Ac+Bd} + {Bc−Ad}i. On divise : z = {p} + {q}i.
- Inspiré de : TD complexes, ex. 8.1 (calcul de z_m) et ex. 5.

### cx-forme-exp — Module, argument et forme exponentielle
- Niveau : 2
- Forme : `qcm`
- Énoncé gabarit : Écris z = {forme algébrique} sous forme exponentielle.
- Paramètres : z = k × u, k ∈ {1 ; 2 ; 3}, u tiré dans la table : 1 + i (√2, π/4) ; 1 + i√3 (2, π/3) ; √3 + i (2, π/6) ; i (1, π/2) ; −1 (1, π) ; −1 + i (√2, 3π/4) ; −√3 + i (2, 5π/6) ; 1 − i (√2, −π/4) ; −1 − i√3 (2, −2π/3) ; −i (1, −π/2).
- Réponse : (k × module de u) e^(iθ).
- Vérification : égalité exacte avec l'option correcte.
- Distracteurs (QCM) : r e^(−iθ) → signe de l'angle ; r e^(i(π/2 − θ)) → cos et sin inversés ; (r²) e^(iθ) ou (k × (|a| + |b|)) e^(iθ) → module mal calculé (pas de racine ou somme). Vérifier que chaque distracteur diffère de la bonne réponse modulo 2π.
- Explication de la solution : Module : r = √(a² + b²) = {r}. Puis cos θ = a/r = {cos} et sin θ = b/r = {sin}, ce qui donne θ = {θ}. Donc z = {r} e^(i{θ}).
- Inspiré de : TD complexes, ex. 6.1 et 8.3 (module et argument).

### cx-eq-second-degre — Équation du second degré avec Δ < 0
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Résous dans ℂ l'équation z² + {B}z + {C} = 0. Donne la {partie demandée} de la solution dont la partie imaginaire est positive.
- Paramètres : choisir les solutions p ± qi avec p entier dans [−5 ; 5] et q entier dans [1 ; 6] ; poser B = −2p et C = p² + q². Partie demandée ∈ {réelle, imaginaire}.
- Réponse : partie réelle = p ; partie imaginaire = q.
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : −p → oubli du signe moins dans −B/2 ; q² ou 2q → √(−Δ) non divisé par 2 ou racine oubliée ; B/2 → formule mal appliquée.
- Explication de la solution : Δ = {B}² − 4 × {C} = {Δ} < 0. On écrit Δ = (i × {2q})². Les solutions sont z = (−{B} ± {2q}i)/2, soit {p} + {q}i et {p} − {q}i.
- Inspiré de : TD complexes, ex. 2 (équation du second degré dans ℂ).

### cx-racine-carree — Racines carrées d'un complexe
- Niveau : 3
- Forme : `qcm`
- Énoncé gabarit : Quelles sont les racines carrées de w = {a} + {b}i ?
- Paramètres : choisir p entier dans [1 ; 6] et q entier dans [−6 ; 6], q ≠ 0, |q| ≠ p ; poser a = p² − q² et b = 2pq.
- Réponse : ±(p + qi).
- Vérification : égalité exacte avec l'option correcte ; contrôle possible : (p + qi)² = w.
- Distracteurs (QCM) : ±(p − qi) → signes mal choisis (2xy = b ignoré) ; ±(q + pi) → x et y inversés ; ±(√|a| + i√|b|) → racine prise partie par partie.
- Explication de la solution : On cherche x + iy avec x² − y² = {a}, 2xy = {b} et x² + y² = |w| = {module}. En additionnant : 2x² = {a + module}, donc x² = {p²}. En soustrayant : y² = {q²}. Comme 2xy = {b}, x et y ont {même signe / signes opposés}. Racines : {p} + {q}i et −{p} − {q}i.
- Inspiré de : TD complexes, ex. 2.

### cx-racines-n — Racines n-ièmes d'un complexe de module 1
- Niveau : 3
- Forme : `qcm`
- Énoncé gabarit : Parmi ces nombres, lequel est une solution de ω^{n} = e^(i{α}) ?
- Paramètres : n ∈ {2 ; 3 ; 4 ; 6} ; α ∈ {0 ; π/2 ; π ; π/3 ; −π/2} ; k entier tiré dans [0 ; n − 1].
- Réponse : e^(iφ) avec φ = (α + 2kπ)/n (afficher φ simplifié, ramené dans ]−π ; π]).
- Vérification : une option e^(iφ) est correcte si et seulement si n·φ − α est un multiple entier de 2π. Rejeter tout distracteur qui vérifierait cette condition.
- Distracteurs (QCM) : e^(i n α) → multiplication au lieu de division ; e^(i(α + π)/n) → π au lieu de 2π ; e^(−iα/n) → signe de l'angle.
- Explication de la solution : Si ω = e^(iφ), alors ω^{n} = e^(i{n}φ). On veut {n}φ = {α} + 2kπ, donc φ = ({α} + 2kπ)/{n}. Avec k = {k} : φ = {φ}. Il y a {n} solutions en tout, régulièrement espacées sur le cercle unité.
- Inspiré de : TD complexes, ex. 8.4 (résoudre (z + j)³ = j) et ex. 3 (racines de l'unité).

### cx-lieu-cercle — Lieu géométrique |z − a| = 2|z + a|
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : L'ensemble des points z tels que |z − {a}| = 2|z + {a}| est un cercle. Donne {son rayon / l'abscisse de son centre}.
- Paramètres : a = 3t avec t entier dans [1 ; 4] ; quantité demandée ∈ {rayon, abscisse du centre}.
- Réponse : rayon = 4t = 4a/3 ; abscisse du centre = −5t = −5a/3 (le centre est sur l'axe réel).
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : 16t² → rayon au carré non « déracinée » ; 5t → signe du centre ; 2a → coefficient 2 pris pour le rayon.
- Explication de la solution : Avec z = x + iy et en élevant au carré : (x − {a})² + y² = 4[(x + {a})² + y²]. On développe et on regroupe : 3x² + {10a}x + 3y² + {3a²} = 0, puis x² + {10a/3}x + y² + {a²} = 0. Forme canonique : (x + {5t})² + y² = {16t²}. Centre ({−5t} ; 0), rayon {4t}.
- Inspiré de : TD complexes, ex. 1 (cas a = 3 : centre −5, rayon 4).

---

# Chapitre : Intégrales
Source : `TD integral.pdf`, pages 1 à 33, exercices 1 à 27 (plus TD complexes ex. 6.4 pour le changement t = tan(x/2))
Niveau visé : trouver une primitive des fonctions usuelles, calculer une intégrale définie, une aire (sous une courbe ou entre deux courbes), utiliser l'intégration par parties, le changement de variable, la décomposition en éléments simples, et calculer un volume de révolution.
Prérequis : dérivées des fonctions usuelles (puissances, exp, ln, sin, cos, tan) et règle de dérivation d'une composée ; tableau de valeurs de exp, ln, sin, cos ; factorisation d'un trinôme ; formules trigonométriques cos²x = (1 + cos 2x)/2 et sin²x = (1 − cos 2x)/2.

## Explication pour un novice
Imagine une voiture dont tu connais la vitesse à chaque instant, et tu veux savoir la distance parcourue. Si la vitesse était constante, ce serait « vitesse × durée », l'aire d'un rectangle. Quand la vitesse change, on découpe le temps en tout petits morceaux, on additionne les petites distances, et on obtient l'aire sous la courbe de la vitesse. Cette aire s'appelle l'intégrale de la fonction entre deux instants a et b, notée ∫ₐᵇ f(x) dx.

Le « dx » rappelle les petits morceaux de largeur dx qu'on additionne. Le grand S allongé ∫ est un « S » de « somme ». Si la courbe passe sous l'axe horizontal, ces morceaux comptent négativement.

Calculer une aire morceau par morceau serait interminable. Heureusement, il existe un raccourci : si on connaît une fonction F dont la dérivée est f (une primitive de f), alors l'intégrale vaut simplement F(b) − F(a). Intégrer, c'est donc faire la dérivation « à l'envers ». Par exemple, la dérivée de x³ est 3x², donc une primitive de 3x² est x³.

Une fonction a une infinité de primitives : x³, x³ + 5, x³ − 2… ont toutes pour dérivée 3x². On écrit donc « + C » (une constante quelconque). Pour une intégrale entre a et b, la constante disparaît dans la soustraction F(b) − F(a).

Quand la fonction n'est pas dans le tableau des primitives connues, on dispose d'outils pour la transformer : l'intégration par parties (pour un produit), le changement de variable (pour une fonction « composée »), la décomposition en éléments simples (pour une fraction de polynômes) et la linéarisation (pour les puissances de sin et cos). Enfin, la même idée « découper et additionner » permet de calculer des volumes et des longueurs de courbes.

## Notions (dans l'ordre d'apprentissage)
- Aire sous une courbe : la surface entre la courbe, l'axe horizontal et deux droites verticales | pour f ≥ 0 sur [a ; b], A = ∫ₐᵇ f(x) dx
- Intégrale définie : une aire « avec signe » (négative sous l'axe) | ∫ₐᵇ f(x) dx, limite des sommes Σ f(xₖ) Δx
- Primitive : une fonction dont la dérivée est f | F' = f sur un intervalle
- Constante d'intégration : toutes les primitives diffèrent d'une constante | ∫ f(x) dx = F(x) + C
- Théorème fondamental : l'intégrale se calcule avec une primitive | ∫ₐᵇ f(x) dx = [F(x)]ₐᵇ = F(b) − F(a)
- Primitives usuelles : le tableau des dérivées lu à l'envers | xⁿ → xⁿ⁺¹/(n + 1) ; 1/x → ln|x| ; e^(kx) → e^(kx)/k ; cos kx → sin(kx)/k ; sin kx → −cos(kx)/k ; 1/(1 + x²) → arctan x ; 1/√(1 − x²) → arcsin x ; 1 + tan²x → tan x ; sinh kx → cosh(kx)/k ; cosh kx → sinh(kx)/k
- Formes composées : reconnaître u' à côté d'une fonction de u | u'/u → ln|u| ; u'uⁿ → uⁿ⁺¹/(n + 1) ; u'/√u → 2√u ; u'e^u → e^u
- Linéarité : on peut séparer une somme et sortir les constantes | ∫(αf + βg) = α∫f + β∫g
- Relation de Chasles : on peut couper l'intervalle en morceaux | ∫ₐᵇ f + ∫ᵦᶜ f = ∫ₐᶜ f
- Aire entre deux courbes : aire sous la courbe du haut moins aire sous celle du bas | f ≥ g sur [a ; b] : A = ∫ₐᵇ (f − g) dx
- Intégration par parties (IPP) : transformer l'intégrale d'un produit | ∫ u dv = uv − ∫ v du ; ∫ₐᵇ u v' = [uv]ₐᵇ − ∫ₐᵇ u' v
- Changement de variable : remplacer une expression par une nouvelle lettre | t = φ(x), dt = φ'(x) dx, et les bornes changent : x = a → t = φ(a)
- Décomposition en éléments simples : couper une fraction en fractions faciles | (px + q)/((x − r)(x − s)) = A/(x − r) + B/(x − s)
- Forme canonique d'un trinôme : faire apparaître un carré pour obtenir un arctan | ∫ dx/((x + α)² + β²) = (1/β) arctan((x + α)/β)
- Linéarisation trigonométrique : remplacer les puissances par des cosinus d'angles multiples | cos²x = (1 + cos 2x)/2 ; sin²x = (1 − cos 2x)/2 ; sin a sin b = [cos(a − b) − cos(a + b)]/2
- Changement t = tan(x/2) : transformer une fraction en sin et cos en fraction en t | sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²), dx = 2 dt/(1 + t²)
- Symétries et relations : astuces pour calculer sans primitive | ∫ₐᵇ f(x) dx = ∫ₐᵇ f(a + b − x) dx ; intégrales de Wallis Iₙ = ((n − 1)/n) Iₙ₋₂
- Volume de révolution : on additionne des disques fins | autour de Ox : V = π ∫ₐᵇ f(x)² dx ; autour de Oy : V = 2π ∫ₐᵇ x f(x) dx
- Longueur d'un arc : on additionne de petits segments | L = ∫ₐᵇ √(1 + f'(x)²) dx ; en paramétrique L = ∫ √(x'(t)² + y'(t)²) dt

## Méthodes
### Calculer une intégrale définie avec une primitive
1. Simplifie f et sépare-la en somme de termes simples (linéarité).
2. Trouve une primitive F de chaque terme dans le tableau.
3. Calcule F(b) puis F(a).
4. Fais F(b) − F(a), dans cet ordre.

### Calculer une aire
1. Repère sur quel intervalle et quelle courbe est au-dessus (cherche les points d'intersection en résolvant f(x) = g(x)).
2. Écris A = ∫ (courbe du haut − courbe du bas) dx.
3. Calcule et vérifie que le résultat est positif.

### Intégration par parties
1. Écris l'intégrale comme ∫ u dv : choisis u = la partie qui se simplifie en dérivant (ln, arctan, arcsin, puis polynôme) et dv = la partie facile à intégrer (exp, sin, cos, xⁿ).
2. Calcule du = u' dx et v = une primitive de v'.
3. Applique ∫ u dv = uv − ∫ v du (avec les crochets [uv]ₐᵇ pour une intégrale définie).
4. Calcule la nouvelle intégrale ; si besoin, recommence (ex. : x² e^(2x) demande deux IPP).

### Changement de variable
1. Repère une expression u(x) dont la dérivée u'(x) apparaît (à une constante près).
2. Pose t = u(x) et calcule dt = u'(x) dx.
3. Remplace tout : la fonction, le dx et les bornes (x = a devient t = u(a)).
4. Intègre en t. Pour une primitive, reviens à x à la fin ; pour une intégrale définie avec bornes changées, ce n'est pas nécessaire.

### Décomposition en éléments simples (dénominateur à racines simples)
1. Si le degré du numérateur est supérieur ou égal à celui du dénominateur, fais d'abord la division euclidienne.
2. Factorise le dénominateur : (x − r)(x − s).
3. Écris A/(x − r) + B/(x − s).
4. Trouve A en multipliant par (x − r) puis en remplaçant x par r (méthode « du cache ») ; de même pour B.
5. Intègre : A ln|x − r| + B ln|x − s| + C.

### Volume de révolution autour de Ox
1. Chaque tranche verticale d'épaisseur dx tourne et forme un disque de rayon f(x) : volume π f(x)² dx.
2. Écris V = π ∫ₐᵇ f(x)² dx.
3. Développe f(x)² et intègre.

## Exemples résolus
### Aire sous la parabole y = x²/2 entre x = 1 et x = 3 (TD ex. 9)
- A = ∫₁³ x²/2 dx — la courbe est au-dessus de l'axe sur [1 ; 3].
- Une primitive de x²/2 est x³/6 — on augmente la puissance et on divise.
- A = 27/6 − 1/6 = 26/6 = 13/3 — F(3) − F(1).

### Aire entre y = x et y = x² pour 0 ≤ x ≤ 1 (TD ex. 10)
- Sur [0 ; 1], x ≥ x² — la droite est au-dessus de la parabole.
- A = ∫₀¹ (x − x²) dx = [x²/2 − x³/3]₀¹ — primitive terme à terme.
- A = 1/2 − 1/3 = 1/6.

### ∫₀^(π/2) x cos x dx par parties (TD ex. 6.2b)
- u = x, donc du = dx ; dv = cos x dx, donc v = sin x — on dérive x, on intègre cos.
- = [x sin x]₀^(π/2) − ∫₀^(π/2) sin x dx — formule uv − ∫ v du.
- = π/2 − [−cos x]₀^(π/2) = π/2 − (0 + 1) = π/2 − 1.

### ∫₀¹ x e^(x²) dx par changement de variable (TD ex. 6.3a)
- t = x², dt = 2x dx, donc x dx = dt/2 — on repère la dérivée de x².
- x = 0 → t = 0 ; x = 1 → t = 1 — on change les bornes.
- = (1/2) ∫₀¹ e^t dt = (1/2)(e − 1).

### Décomposer (7x + 1)/(6x² + x − 1) (TD ex. 4.3)
- 6x² + x − 1 = 6(x + 1/2)(x − 1/3) — racines −1/2 et 1/3.
- (7x + 1)/(6x² + x − 1) = (1/2)/(x + 1/2) + (2/3)/(x − 1/3) — méthode du cache.
- Primitive : (1/2) ln|x + 1/2| + (2/3) ln|x − 1/3| + C.

## Pièges fréquents
- Calculer F(a) − F(b) au lieu de F(b) − F(a) → toujours « borne du haut moins borne du bas ».
- Oublier le facteur 1/k : une primitive de cos(3x) est sin(3x)/3, pas sin(3x) → dérive ta réponse pour vérifier.
- Dériver au lieu d'intégrer (répondre 3x² pour la primitive de x³) → la primitive a un degré de plus, pas un de moins.
- Oublier de changer les bornes dans un changement de variable → change-les tout de suite, en même temps que dx.
- Croire que ∫(f × g) = ∫f × ∫g → c'est faux ; utilise une IPP ou un changement de variable.
- Écrire ln x pour la primitive de 1/x sur des x négatifs → écrire ln|x|.
- Compter négativement une aire quand la courbe est sous l'axe → une aire se calcule avec (haut − bas), donc toujours positive.
- Oublier le « + C » pour une primitive (sans bornes).
- Dans un volume de révolution, oublier le carré de f(x) ou le facteur π.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Que mesure ∫ₐᵇ f(x) dx si f ≥ 0 ? | L'aire entre la courbe, l'axe des x et les droites x = a et x = b. |
| Qu'est-ce qu'une primitive de f ? | Une fonction F telle que F' = f. |
| Pourquoi écrit-on « + C » ? | Deux primitives diffèrent d'une constante : la dérivée d'une constante est nulle. |
| Comment calculer ∫ₐᵇ f(x) dx avec une primitive F ? | F(b) − F(a). |
| Primitive de xⁿ (n ≠ −1) ? | xⁿ⁺¹/(n + 1). |
| Primitive de 1/x ? | ln\|x\|. |
| Primitive de e^(kx) ? | e^(kx)/k. |
| Primitive de cos(kx) ? | sin(kx)/k. |
| Primitive de sin(kx) ? | −cos(kx)/k. |
| Primitive de 1/(1 + x²) ? | arctan x. |
| Primitive de 1/√(1 − x²) ? | arcsin x. |
| Primitive de 1 + tan²x = 1/cos²x ? | tan x. |
| Primitive de u'/u ? | ln\|u\|. |
| Primitive de u' × uⁿ (n ≠ −1) ? | uⁿ⁺¹/(n + 1). |
| Primitive de u'/√u ? | 2√u. |
| Linéarité de l'intégrale ? | ∫(αf + βg) = α∫f + β∫g. |
| Relation de Chasles ? | ∫ₐᵇ f + ∫ᵦᶜ f = ∫ₐᶜ f. |
| Aire entre deux courbes, f au-dessus de g ? | ∫ₐᵇ (f(x) − g(x)) dx. |
| Formule d'intégration par parties ? | ∫ u dv = uv − ∫ v du. |
| IPP : que choisir comme u (à dériver) ? | ln, arctan, arcsin, puis un polynôme. On intègre exp, sin, cos. |
| Changement de variable : quoi remplacer ? | La fonction, le dx (via dt = u'(x) dx) et les bornes. |
| Linéariser cos²x ? | cos²x = (1 + cos 2x)/2. |
| Linéariser sin²x ? | sin²x = (1 − cos 2x)/2. |
| Avec t = tan(x/2), que valent sin x et dx ? | sin x = 2t/(1 + t²), dx = 2 dt/(1 + t²). |
| Volume de révolution autour de Ox ? | V = π ∫ₐᵇ f(x)² dx. |
| Longueur de la courbe y = f(x) sur [a ; b] ? | L = ∫ₐᵇ √(1 + f'(x)²) dx. |
| Intégrales de Wallis Iₙ = ∫₀^(π/2) sinⁿx dx ? | Iₙ = ((n − 1)/n) Iₙ₋₂, avec I₀ = π/2 et I₁ = 1. |
| ∫ₐᵇ f(x) dx est égale à quelle autre intégrale ? | ∫ₐᵇ f(a + b − x) dx (TD ex. 22 et 25). |

## Exercices générables

### int-primitive-puissance — Primitive d'une puissance
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : Quelle est une primitive de f(x) = {a}x^{n} ?
- Paramètres : a entier dans [1 ; 9] ; n entier dans [1 ; 6].
- Réponse : (a/(n + 1)) x^(n+1), fraction simplifiée (ex. 4x³ → x⁴).
- Vérification : égalité exacte avec l'option correcte (contrôle possible : dériver l'option redonne f).
- Distracteurs (QCM) : a·n·x^(n−1) → dérivée au lieu de primitive ; a·x^(n+1) → oubli de la division par n + 1 ; (a/n) x^(n+1) → division par n au lieu de n + 1.
- Explication de la solution : Pour intégrer xⁿ, on augmente la puissance de 1 et on divise par la nouvelle puissance : x^{n} → x^{n+1}/{n+1}. Avec le coefficient {a} : {a}x^{n+1}/{n+1} = {réponse}. Vérification : la dérivée de {réponse} est bien {a}x^{n}.
- Inspiré de : TD intégrales, ex. 1.1 à 1.5.

### int-primitive-usuelle — Primitives de exp, sin, cos
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : Quelle est une primitive de f(x) = {f} ?
- Paramètres : k entier dans [2 ; 5] ; f tirée parmi : e^(kx), cos(kx), sin(kx), 1/(x + k) (sur x > −k).
- Réponse : e^(kx) → e^(kx)/k ; cos(kx) → sin(kx)/k ; sin(kx) → −cos(kx)/k ; 1/(x + k) → ln(x + k).
- Vérification : égalité exacte avec l'option correcte.
- Distracteurs (QCM) : la dérivée de f (k e^(kx), −k sin(kx), k cos(kx), −1/(x + k)²) → confusion dériver/intégrer ; oubli du 1/k (e^(kx), sin(kx), −cos(kx)) ; mauvais signe (−sin(kx)/k, cos(kx)/k) → signe de la primitive de sin.
- Explication de la solution : On cherche F telle que F' = f. Essayons {réponse} : sa dérivée vaut {calcul de la dérivée} = {f}. Le facteur 1/{k} compense le {k} qui sort en dérivant la composée.
- Inspiré de : TD intégrales, ex. 1.6 et 1.9.

### int-definie-affine — Intégrale d'une fonction affine (aire d'un trapèze)
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Calcule ∫₀^{b} ({m}x + {p}) dx.
- Paramètres : m ∈ {2 ; 4 ; 6} ; p entier dans [0 ; 9] ; b entier dans [1 ; 6].
- Réponse : m b²/2 + p b (entier).
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : m b + p → on a calculé f(b) au lieu de l'intégrale ; m b² + p b → oubli du 1/2 ; m b²/2 → oubli du terme constant.
- Explication de la solution : Une primitive de {m}x + {p} est {m/2}x² + {p}x. On calcule F({b}) − F(0) = {m/2}×{b²} + {p}×{b} − 0 = {réponse}. C'est aussi l'aire du trapèze sous la droite entre 0 et {b}.
- Inspiré de : TD intégrales, ex. 9 (aire sous une courbe) et ex. 1.1.

### int-definie-poly — Intégrale définie d'un polynôme
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule ∫_{a}^{b} ({3c}x² + {2d}x + {e}) dx.
- Paramètres : c entier dans [−2 ; 2], d entier dans [−3 ; 3], e entier dans [−5 ; 5], pas tous nuls ; a et b entiers avec 0 ≤ a < b ≤ 4.
- Réponse : c(b³ − a³) + d(b² − a²) + e(b − a) (entier).
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : l'opposé de la réponse → F(a) − F(b) ; F(b) seul → oubli de soustraire F(a) ; 3c(b³ − a³) + 2d(b² − a²) + e(b − a) → oubli des divisions par 3 et 2.
- Explication de la solution : Une primitive est F(x) = {c}x³ + {d}x² + {e}x. F({b}) = {Fb} et F({a}) = {Fa}. L'intégrale vaut F({b}) − F({a}) = {réponse}.
- Inspiré de : TD intégrales, ex. 6.1e (∫₁² (x³ − 2x) dx = 3/4).

### int-aire-entre-courbes — Aire entre une droite et une parabole
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Calcule l'aire du domaine compris entre la droite y = {k}x et la parabole y = x², pour 0 ≤ x ≤ {k}.
- Paramètres : k entier dans [1 ; 6].
- Réponse : k³/6.
- Vérification : accepter une fraction exacte égale à k³/6 ou un décimal à ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : k³/2 → aire sous la droite seule ; k³/3 → aire sous la parabole seule ; −k³/6 → courbes inversées (bas − haut).
- Explication de la solution : Les courbes se coupent quand {k}x = x², soit x = 0 ou x = {k}. Entre les deux, la droite est au-dessus. A = ∫₀^{k} ({k}x − x²) dx = [{k}x²/2 − x³/3]₀^{k} = {k}³/2 − {k}³/3 = {k}³/6 = {réponse}.
- Inspiré de : TD intégrales, ex. 10 (cas k = 1 : aire 1/6) et ex. 11.

### int-exp-ln — Intégrales avec exponentielle et logarithme
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit (variante 1) : Calcule ∫₀^{ln {a}} e^x dx. Énoncé gabarit (variante 2) : Calcule ∫₁^{e^{n}} (1/x) dx.
- Paramètres : variante 1 : a entier dans [2 ; 20] ; variante 2 : n entier dans [1 ; 6].
- Réponse : variante 1 : a − 1 ; variante 2 : n.
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : variante 1 : a → oubli de e⁰ = 1 ; ln a → confusion exp/ln. Variante 2 : e^n − 1 → primitive de 1/x prise égale à x ; n − 1 → ln 1 pris égal à 1.
- Explication de la solution : Variante 1 : une primitive de e^x est e^x ; e^(ln {a}) − e⁰ = {a} − 1 = {réponse}. Variante 2 : une primitive de 1/x est ln x ; ln(e^{n}) − ln 1 = {n} − 0 = {n}.
- Inspiré de : TD intégrales, ex. 6.1a (∫ e^x) et 6.1c (∫₀² dx/(1 + x) = ln 3).

### int-ipp — Intégration par parties
- Niveau : 3
- Forme : `qcm`
- Énoncé gabarit : Calcule I = ∫₀^{a} x e^x dx.
- Paramètres : a entier dans [1 ; 4].
- Réponse : (a − 1)e^a + 1.
- Vérification : égalité exacte avec l'option correcte (contrôle numérique possible à 10⁻⁶).
- Distracteurs (QCM) : (a − 1)e^a → oubli de F(0) = −1 ; a e^a → oubli du terme − ∫ v du ; (a + 1)e^a − 1 → signe faux dans uv − ∫ v du. Si a = 1, remplacer le distracteur (a − 1)e^a = 0 par « e » (erreur u et v inversés).
- Explication de la solution : On pose u = x (du = dx) et dv = e^x dx (v = e^x). I = [x e^x]₀^{a} − ∫₀^{a} e^x dx = {a}e^{a} − (e^{a} − 1) = ({a} − 1)e^{a} + 1.
- Inspiré de : TD intégrales, ex. 3 et ex. 6.2 (a à f).

### int-changement-variable — Changement de variable
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : En posant t = x² + 1, calcule ∫₀^{a} 2x (x² + 1)^{n} dx.
- Paramètres : a entier dans [1 ; 3] ; n entier dans [1 ; 2].
- Réponse : ((a² + 1)^(n+1) − 1)/(n + 1).
- Vérification : accepter une fraction exacte égale à la réponse ou un décimal à ±0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : (a² + 1)^(n+1)/(n + 1) → oubli de soustraire la valeur en t = 1 ; ((a + 1)^(n+1) − 1)/(n + 1) → bornes non changées (t de 1 à a + 1) ; (a² + 1)^(n+1) − 1 → oubli de la division par n + 1.
- Explication de la solution : t = x² + 1 donne dt = 2x dx. Bornes : x = 0 → t = 1 ; x = {a} → t = {a²+1}. L'intégrale devient ∫₁^{a²+1} t^{n} dt = [t^{n+1}/{n+1}]₁^{a²+1} = ({a²+1}^{n+1} − 1)/{n+1} = {réponse}.
- Inspiré de : TD intégrales, ex. 2 (formes u'uⁿ, items 2, 14, 15, 16, 17) et ex. 6.3.

### int-decomposition — Décomposition en éléments simples
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : On écrit ({P}x + {Q}) / ((x − {r})(x − {s})) = A/(x − {r}) + B/(x − {s}). Donne la valeur de {A ou B}.
- Paramètres : choisir A et B entiers dans [−5 ; 5], non nuls, avec A + B ≠ 0 ; r et s entiers distincts dans [−4 ; 4] ; poser P = A + B et Q = −(A s + B r). Coefficient demandé ∈ {A, B}.
- Réponse : A = (P r + Q)/(r − s) ; B = (P s + Q)/(s − r) (entiers par construction).
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : −A → division par (s − r) au lieu de (r − s) ; B à la place de A → mauvaise racine substituée ; P r + Q → oubli de diviser par (r − s).
- Explication de la solution : Méthode du cache : on multiplie les deux membres par (x − {r}) puis on remplace x par {r}. À gauche : ({P}×{r} + {Q})/({r} − {s}) = {A}. Donc A = {A}. De même, B = ({P}×{s} + {Q})/({s} − {r}) = {B}. Une primitive est alors {A} ln|x − {r}| + {B} ln|x − {s}| + C.
- Inspiré de : TD intégrales, ex. 4.3, 17, 20.1 et 21.1.

### int-volume — Volume d'un cône de révolution
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : On fait tourner autour de l'axe Ox le segment y = {k}(x − {a}) pour {a} ≤ x ≤ {b}. Le volume obtenu s'écrit V = cπ. Donne c.
- Paramètres : k entier dans [1 ; 4] ; a entier dans [0 ; 3] ; L = b − a entier dans [1 ; 4] ; imposer que k² L³ soit divisible par 3 (k multiple de 3 ou L multiple de 3).
- Réponse : c = k² L³/3.
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : k² L³ → oubli de la division par 3 ; k L²/2 → aire du triangle au lieu du volume (oubli du carré et de π) ; k L³/3 → oubli du carré sur k.
- Explication de la solution : V = π ∫_{a}^{b} [{k}(x − {a})]² dx = {k²}π ∫_{a}^{b} (x − {a})² dx = {k²}π [(x − {a})³/3]_{a}^{b} = {k²}π × {L³}/3 = {c}π.
- Inspiré de : TD intégrales, ex. 26.4 (V = 3π + 81π = 84π), ex. 15 et 16.

---

# Chapitre : Équations différentielles
Source : `TD equations differentielles.pdf`, pages 1 à 27, exercices 1 à 19
Niveau visé : vérifier qu'une fonction est solution, résoudre une équation à variables séparables, une équation linéaire du premier ordre (avec condition initiale), une équation du second ordre à coefficients constants (équation caractéristique, solution particulière, conditions initiales), et interpréter ces solutions en physique (refroidissement, chute, oscillateur).
Prérequis : dérivées et primitives (chapitre Intégrales) ; exponentielle et logarithme (e^(a+b) = e^a e^b, ln) ; équation du second degré ; nombres complexes pour Δ < 0 (chapitre Nombres complexes) ; cosinus et sinus.

## Explication pour un novice
D'habitude, une équation a pour inconnue un nombre : « trouve x tel que 2x + 1 = 7 ». Dans une équation différentielle, l'inconnue est une fonction entière, y(x), et l'équation relie cette fonction à ses dérivées (sa vitesse de variation). Par exemple y' = 2y dit : « la fonction grandit à une vitesse égale à deux fois sa valeur ».

Ce genre de phrase décrit énormément de phénomènes. Un café refroidit d'autant plus vite qu'il est plus chaud que la pièce. Une population grandit d'autant plus vite qu'elle est nombreuse. Un ressort tire d'autant plus fort qu'il est étiré. On connaît la règle de variation, et on cherche l'évolution complète au cours du temps.

Une équation différentielle a en général une infinité de solutions, qui diffèrent par une ou plusieurs constantes (comme le « + C » des primitives). Par exemple, toutes les fonctions y = C e^(2x) vérifient y' = 2y. Pour choisir la bonne, on donne une condition initiale : la valeur de départ, comme y(0) = 3. Elle fixe la constante : ici C = 3.

Pour le premier ordre (seulement y'), deux grandes techniques : séparer les variables (mettre tous les y d'un côté, tous les x de l'autre, puis intégrer), et la formule des équations linéaires y' + ay = b, dont les solutions sont y = C e^(−ax) + b/a. Le terme b/a est l'équilibre vers lequel tout se stabilise quand a > 0.

Pour le second ordre à coefficients constants (ay'' + by' + cy = 0), on cherche des solutions de la forme e^(λx). En remplaçant, on obtient une équation du second degré en λ, l'équation caractéristique aλ² + bλ + c = 0. Selon le signe de son discriminant, la solution est une somme d'exponentielles, une exponentielle multipliée par un polynôme, ou une oscillation (cosinus et sinus) quand les racines sont complexes. S'il y a un second membre, on ajoute une solution particulière qui « ressemble » à ce second membre.

## Notions (dans l'ordre d'apprentissage)
- Équation différentielle : une équation dont l'inconnue est une fonction | relation F(x, y, y', y'', …) = 0 vérifiée pour tout x d'un intervalle
- Ordre : la dérivée la plus haute qui apparaît | ordre 1 : y' ; ordre 2 : y''
- Solution : une fonction qui rend l'égalité vraie partout | y solution ⇔ en remplaçant y, y', y'' l'égalité est vraie pour tout x
- Solution générale et constantes : toutes les solutions, avec des constantes libres | ordre 1 : une constante C ; ordre 2 : deux constantes
- Condition initiale : la valeur de départ qui choisit une seule solution | y(x₀) = y₀ (et y'(x₀) = y₁ à l'ordre 2)
- Cas y' = f(x) : il suffit de prendre une primitive | y = F(x) + C
- Variables séparables : on peut mettre les y d'un côté et les x de l'autre | y' = g(x) h(y) ⇒ ∫ dy/h(y) = ∫ g(x) dx
- Équation linéaire du premier ordre : y et y' n'apparaissent qu'à la puissance 1 | y' + a(x) y = b(x)
- Équation homogène associée (ESSM) : la même équation sans second membre | y' + a y = 0 ⇒ y = C e^(−ax) (a constant)
- Principe de superposition : générale = homogène + une particulière | y = y_h + y_p
- Cas a et b constants : solution avec un équilibre | y' + a y = b ⇒ y = C e^(−ax) + b/a
- Variation de la constante : trouver une solution particulière quand le second membre est compliqué | dans y = C e^(−A(x)), remplacer C par C(x), on obtient C'(x) = b(x) e^(A(x))
- Équations qui se ramènent au linéaire : un changement d'inconnue rend l'équation linéaire | Bernoulli y' = a y + b yⁿ : z = y^(1−n) ; homogène y' = F(y/x) : u = y/x
- Équation linéaire du second ordre à coefficients constants : y'', y', y avec des nombres devant | a y'' + b y' + c y = f(x)
- Équation caractéristique : l'équation en λ obtenue en essayant e^(λx) | aλ² + bλ + c = 0
- Trois cas selon Δ : forme de la solution homogène | Δ > 0 : C₁e^(λ₁x) + C₂e^(λ₂x) ; Δ = 0 : (C₁ + C₂x)e^(λx) ; Δ < 0, λ = α ± iβ : e^(αx)(A cos βx + B sin βx)
- Solution particulière : on la cherche de la même forme que le second membre | polynôme → polynôme de même degré ; K e^(mx) → A e^(mx) (× x si m racine simple, × x² si racine double) ; cos ωx → a cos ωx + b sin ωx
- Oscillateur harmonique : y'' + ω² y = 0 décrit une oscillation | y = A cos ωt + B sin ωt = E cos(ωt − φ), amplitude E = √(A² + B²), période T = 2π/ω
- Équation d'Euler : coefficients en x², x, 1 | x² y'' + b x y' + c y = f(x) : poser x = e^t pour retrouver des coefficients constants

## Méthodes
### Vérifier qu'une fonction est solution (TD ex. 1)
1. Calcule y', et y'' si besoin.
2. Remplace y, y', y'' dans le membre de gauche.
3. Simplifie : tu dois retrouver exactement le membre de droite, pour tout x.

### Séparer les variables (TD ex. 2)
1. Remplace y' par dy/dx.
2. Mets tout ce qui contient y avec dy, tout ce qui contient x avec dx.
3. Intègre chaque côté (une seule constante C suffit).
4. Isole y si possible, puis utilise la condition initiale pour trouver C.

### Résoudre y' + a y = b (a, b constants, a ≠ 0)
1. Solution homogène : y_h = C e^(−ax).
2. Solution particulière constante : on pose y' = 0, donc y_p = b/a.
3. Solution générale : y = C e^(−ax) + b/a.
4. Avec y(0) = y₀ : C = y₀ − b/a.

### Variation de la constante (TD ex. 6, 7, 14)
1. Résous l'équation homogène : y_h = C e^(−A(x)), où A est une primitive de a.
2. Cherche y = C(x) e^(−A(x)) et remplace dans l'équation : les termes en C s'annulent.
3. Il reste C'(x) e^(−A(x)) = b(x) : calcule C'(x) puis C(x) par intégration.
4. Solution générale : y = (C(x) + K) e^(−A(x)).

### Résoudre a y'' + b y' + c y = f(x) (TD ex. 10)
1. Écris l'équation caractéristique aλ² + bλ + c = 0 et calcule Δ.
2. Écris la solution homogène selon le signe de Δ (trois cas).
3. Choisis la forme de la solution particulière selon f(x) (polynôme, exponentielle, cos/sin), en multipliant par x si l'exposant est racine.
4. Calcule y_p', y_p'', remplace, identifie les coefficients.
5. Solution générale : y = y_h + y_p.
6. Avec y(0) et y'(0), résous un système de deux équations pour les deux constantes.

## Exemples résolus
### Résoudre y' + y = e^x (TD ex. 6.1)
- Homogène : y' + y = 0 donne y_h = C e^(−x) — la fonction décroît à une vitesse égale à sa valeur.
- Particulière : on essaie y_p = A e^x, alors A e^x + A e^x = e^x, donc A = 1/2 — même forme que le second membre.
- Solution générale : y = C e^(−x) + (1/2) e^x.

### Refroidissement d'un objet (TD ex. 12)
- θ' = −k(θ − T), avec T = 20 °C et θ(0) = 70 °C — l'écart à la température de la pièce diminue.
- θ(t) = 20 + 50 e^(−kt) — forme y = C e^(−kt) + équilibre, avec C = 70 − 20.
- θ(2) = 50 donne e^(−2k) = 30/50 = 3/5, donc k = (1/2) ln(5/3) ≈ 0,255 — on isole k avec le logarithme.
- θ(t) = 25 donne e^(−kt) = 1/10, donc t = ln 10 / k ≈ 9 minutes.

### Résoudre y'' + 3y' − 4y = 0 (TD ex. 10.4)
- Équation caractéristique : λ² + 3λ − 4 = 0, Δ = 9 + 16 = 25 — deux racines réelles.
- λ = (−3 ± 5)/2, soit λ₁ = −4 et λ₂ = 1.
- y = A e^(−4x) + B e^x.

### Résoudre y'' − 4y' + 3y = 6x + 1 (TD ex. 10.8)
- Homogène : λ² − 4λ + 3 = 0, racines 1 et 3, donc y_h = C₁e^x + C₂e^(3x).
- Second membre polynôme de degré 1 : on cherche y_p = ax + b, y_p' = a, y_p'' = 0.
- −4a + 3(ax + b) = 6x + 1 donne 3a = 6 et −4a + 3b = 1, donc a = 2 et b = 3 — on identifie les coefficients.
- y = C₁e^x + C₂e^(3x) + 2x + 3.

### Oscillateur x'' + 4x = 0, x(0) = 1, x'(0) = 2√3 (TD ex. 18.1a)
- λ² + 4 = 0 donne λ = ±2i, donc x(t) = A cos 2t + B sin 2t — racines imaginaires pures : oscillation.
- x(0) = A = 1 ; x'(0) = 2B = 2√3, donc B = √3 — on utilise les deux conditions.
- Amplitude √(1 + 3) = 2 ; période 2π/2 = π ; x(t) = 2 cos(2t − π/3).

## Pièges fréquents
- Oublier la constante C (ou n'en mettre qu'une à l'ordre 2) → ordre n = n constantes.
- Appliquer la condition initiale à la solution homogène seule, avant d'ajouter la solution particulière → ajoute d'abord y_p, puis calcule les constantes.
- Écrire y = C e^(ax) pour y' + a y = 0 → le signe est e^(−ax) (on passe a y de l'autre côté).
- Chercher y_p = A e^(mx) alors que m est racine de l'équation caractéristique → il faut multiplier par x (ou x² si racine double), sinon on trouve 0 = K.
- Avec Δ < 0, écrire des exponentielles complexes sans repasser en cos/sin → la solution réelle est e^(αx)(A cos βx + B sin βx).
- Confondre la pulsation ω et la période : la période est T = 2π/ω.
- Séparer les variables en oubliant de diviser par y (ou en divisant par une quantité qui peut s'annuler sans le signaler).
- Pour les CI d'ordre 2, oublier de dériver la solution générale avant d'utiliser y'(0).

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu'est-ce qu'une équation différentielle ? | Une équation dont l'inconnue est une fonction y, reliant y, y', y''… |
| Ordre d'une équation différentielle ? | L'ordre de la dérivée la plus haute qui apparaît. |
| Comment vérifier qu'une fonction est solution ? | Calculer y', y''…, remplacer dans l'équation : l'égalité doit être vraie pour tout x. |
| Solutions de y' = a y ? | y = C e^(ax), C constante réelle. |
| Solutions de y' + a y = b (a ≠ 0) ? | y = C e^(−ax) + b/a. |
| Solution constante de y' + a y = b ? | y = b/a (on pose y' = 0). |
| À quoi sert une condition initiale ? | À fixer la constante C : il ne reste qu'une solution. |
| Solution générale d'une équation linéaire ? | Solution de l'équation homogène + une solution particulière. |
| Que signifient ESSM et EASM ? | Équation sans second membre (homogène) et équation avec second membre. |
| Principe des variables séparables ? | Les y avec dy, les x avec dx, puis intégrer chaque côté. |
| Principe de la variation de la constante ? | Dans y = C e^(…), remplacer C par C(x) et injecter dans l'équation. |
| Équation de Bernoulli y' = ay + byⁿ : changement ? | Poser z = y^(1−n) : l'équation devient linéaire en z. |
| Équation homogène y' = F(y/x) : changement ? | Poser u = y/x, donc y' = u + x u'. |
| Loi de refroidissement de Newton ? | θ' = −k(θ − T), donc θ(t) = T + (θ₀ − T) e^(−kt). |
| Vitesse limite pour m v' = mg − kv ? | v_lim = mg/k (on pose v' = 0). |
| Équation caractéristique de a y'' + b y' + c y = 0 ? | aλ² + bλ + c = 0. |
| Δ > 0 : solution de l'équation homogène ? | y = C₁ e^(λ₁x) + C₂ e^(λ₂x). |
| Δ = 0 : solution de l'équation homogène ? | y = (C₁ + C₂ x) e^(λx). |
| Δ < 0, λ = α ± iβ : solution ? | y = e^(αx)(A cos βx + B sin βx). |
| Solutions de y'' + ω² y = 0 ? | y = A cos ωt + B sin ωt : oscillation de période 2π/ω. |
| Amplitude de A cos ωt + B sin ωt ? | √(A² + B²). |
| Second membre polynôme de degré n (c ≠ 0) ? | Chercher une solution particulière polynôme de degré n. |
| Second membre K e^(mx), m non racine ? | Chercher A e^(mx). Pour y'' + py' + qy : A = K/(m² + pm + q). |
| Second membre K e^(mx), m racine simple ? | Chercher A x e^(mx) (racine double : A x² e^(mx)). |
| Second membre cos(ωx) ? | Chercher a cos ωx + b sin ωx (si iω n'est pas racine). |
| Combien de conditions initiales à l'ordre 2 ? | Deux, par exemple y(0) et y'(0). |
| Équation d'Euler x²y'' + bxy' + cy = f : changement ? | Poser x = e^t : on obtient des coefficients constants (TD ex. 19). |

## Exercices générables

### ed-reconnaitre-exp — Solutions de y' = a y
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : Quelles fonctions sont solutions de y' = {a}y ? (C désigne une constante réelle.)
- Paramètres : a entier dans [−5 ; 5], a ∉ {−1 ; 0 ; 1}.
- Réponse : y = C e^({a}x).
- Vérification : égalité exacte avec l'option correcte.
- Distracteurs (QCM) : C e^(−{a}x) → signe faux ; C e^(x/{a}) → division au lieu de multiplication ; {a}x + C → confusion avec y' = a.
- Explication de la solution : Si y = C e^({a}x), alors y' = {a} × C e^({a}x) = {a}y. L'égalité est vraie pour tout x, donc ce sont bien des solutions (et ce sont les seules).
- Inspiré de : TD équations différentielles, ex. 1 (vérifier des solutions) et ex. 6 (ESSM).

### ed-primitive-directe — Équation y' = f(x) avec condition initiale
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : La fonction y vérifie y' = {2m}x + {p} et y(0) = {c}. Calcule y({t}).
- Paramètres : m entier dans [1 ; 4] ; p entier dans [−5 ; 5] ; c entier dans [−9 ; 9] ; t entier dans [1 ; 4].
- Réponse : m t² + p t + c.
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : m t² + p t → oubli de la condition initiale ; 2m t + p → on a calculé y'(t) ; 2m t² + p t + c → oubli de la division par 2.
- Explication de la solution : y est une primitive de {2m}x + {p} : y = {m}x² + {p}x + C. Comme y(0) = C = {c}, on a y = {m}x² + {p}x + {c}. Donc y({t}) = {m}×{t²} + {p}×{t} + {c} = {réponse}.
- Inspiré de : TD équations différentielles, ex. 10.1 (après réduction, y' = k/√(1 − x²) s'intègre directement) et ex. 17.3 (distance = primitive de la vitesse).

### ed-equilibre — Solution d'équilibre de y' + a y = b
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Trouve la solution constante de l'équation y' + {a}y = {b}. (Variante : vers quelle valeur tend y(x) quand x → +∞ ?)
- Paramètres : a entier dans [1 ; 9] ; q entier dans [−9 ; 9], q ≠ 0 ; b = a q.
- Réponse : b/a = q.
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : −b/a → erreur de signe ; b → oubli de la division ; a/b → fraction renversée.
- Explication de la solution : Une fonction constante a une dérivée nulle : y' = 0. L'équation devient {a}y = {b}, donc y = {b}/{a} = {q}. Comme a > 0, le terme C e^(−{a}x) tend vers 0 : toutes les solutions se rapprochent de {q}.
- Inspiré de : TD équations différentielles, ex. 14.2 (courant final 2/R), ex. 16.1 (x₂ = F/β) et ex. 17.2 (vitesse limite mg/k).

### ed-ordre1-ci — Équation linéaire du premier ordre avec condition initiale
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : La solution de y' + {a}y = {b} telle que y(0) = {y0} s'écrit y = C e^(−{a}x) + D. Donne la valeur de {C ou D}.
- Paramètres : a entier dans [1 ; 6] ; q entier dans [−6 ; 6] ; b = a q ; y0 entier dans [−10 ; 10] avec y0 ≠ q. Valeur demandée ∈ {C, D}.
- Réponse : D = b/a = q ; C = y0 − q.
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : C = y0 → oubli de soustraire l'équilibre ; C = y0 + q → signe ; D = −q → signe de l'équilibre.
- Explication de la solution : Solution homogène : C e^(−{a}x). Solution particulière constante : y = {b}/{a} = {q}, donc D = {q}. Avec x = 0 : y(0) = C + {q} = {y0}, donc C = {y0} − {q} = {C}.
- Inspiré de : TD équations différentielles, ex. 6.1, 12.1 et 17.1.

### ed-refroidissement — Loi de refroidissement de Newton
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Un objet à {θ0} °C est placé dans une pièce à {T} °C. Sa température vérifie θ' = −k(θ − {T}), et l'écart avec la pièce est divisé par 2 toutes les {τ} minutes. Quelle est sa température après {n×τ} minutes ?
- Paramètres : T entier dans [15 ; 25] ; n entier dans [1 ; 3] ; q entier dans [2 ; 10] ; θ0 = T + 2ⁿ q ; τ entier dans [2 ; 10].
- Réponse : T + (θ0 − T)/2ⁿ = T + q.
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : θ0/2ⁿ → on a divisé la température au lieu de l'écart ; T + (θ0 − T)/(2n) → division par 2n au lieu de 2ⁿ ; (θ0 − T)/2ⁿ → oubli de rajouter T.
- Explication de la solution : La solution est θ(t) = {T} + ({θ0} − {T}) e^(−kt). L'écart initial vaut {θ0 − T} °C. Après {n} demi-périodes, il est divisé par 2^{n} = {2ⁿ} : il vaut {q} °C. La température est donc {T} + {q} = {réponse} °C.
- Inspiré de : TD équations différentielles, ex. 12.

### ed-separable — Variables séparables : y' = x/y
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : La fonction y > 0 vérifie y' = x/y et y(0) = {y0}. Calcule y({x1}).
- Paramètres : (x1 ; y0) tiré parmi (3 ; 4), (4 ; 3), (6 ; 8), (8 ; 6), (5 ; 12), (12 ; 5), (8 ; 15), (15 ; 8).
- Réponse : √(x1² + y0²) (entier).
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : x1² + y0² → oubli de la racine ; x1 + y0 → racine de la somme confondue avec la somme ; √(x1² − y0²) ou y0 + x1²/2 → constante mal placée.
- Explication de la solution : On sépare : y dy = x dx. On intègre : y²/2 = x²/2 + C, donc y² = x² + 2C. Avec y(0) = {y0} : 2C = {y0²}. Donc y = √(x² + {y0²}) et y({x1}) = √({x1²} + {y0²}) = {réponse}.
- Inspiré de : TD équations différentielles, ex. 2 (variables séparables, en particulier 2.1 et 2.10).

### ed-caracteristique — Racines de l'équation caractéristique
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : La solution générale de y'' + {p}y' + {q}y = 0 s'écrit y = C₁ e^(λ₁x) + C₂ e^(λ₂x) avec λ₁ < λ₂. Donne λ₂.
- Paramètres : r1 et r2 entiers distincts dans [−6 ; 6] ; poser p = −(r1 + r2) et q = r1 r2 (afficher proprement « + 0y' » supprimé si p = 0).
- Réponse : max(r1, r2).
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : −max(r1, r2) → racines de λ² − pλ + q (signe) ; min(r1, r2) → mauvaise racine ; p ou q → coefficient pris pour une racine.
- Explication de la solution : On cherche y = e^(λx) : y' = λe^(λx), y'' = λ²e^(λx). L'équation caractéristique est λ² + {p}λ + {q} = 0. Δ = {Δ} = {√Δ}², donc λ = (−{p} ± {√Δ})/2, soit {r1} et {r2}. La plus grande vaut {réponse}.
- Inspiré de : TD équations différentielles, ex. 10.2, 10.4, 10.11, 10.13, 10.14.

### ed-particuliere-exp — Solution particulière pour un second membre exponentiel
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Trouve le nombre A tel que y = A e^({m}x) soit solution de y'' + {p}y' + {q}y = {K}e^({m}x).
- Paramètres : p, q entiers dans [−6 ; 6] ; m entier dans [−3 ; 3], m ≠ 0 ; D = m² + p m + q ≠ 0 (m n'est pas racine) ; A entier dans [−4 ; 4], A ≠ 0 ; K = A D.
- Réponse : A = K/(m² + p m + q).
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : K/q → oubli des termes en y'' et y' ; K/(m² + q) → oubli du terme p m ; K → oubli de la division.
- Explication de la solution : y' = {m}A e^({m}x) et y'' = {m²}A e^({m}x). En remplaçant : ({m²} + {p}×{m} + {q}) A e^({m}x) = {K} e^({m}x), soit {D} A = {K}, donc A = {A}.
- Inspiré de : TD équations différentielles, ex. 10.13 (y'' + y' − 6y = 2e^(3x), A = 1/3) et ex. 18.2.

### ed-ci-2nd — Conditions initiales à l'ordre 2
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Les solutions de y'' + {p}y' + {q}y = 0 sont y = C₁ e^({r1}x) + C₂ e^({r2}x). Trouve {C₁ ou C₂} sachant que y(0) = {y0} et y'(0) = {y1}.
- Paramètres : r1 et r2 entiers distincts dans [−4 ; 4] ; C1 et C2 entiers dans [−5 ; 5] ; p = −(r1 + r2), q = r1 r2 ; y0 = C1 + C2 ; y1 = r1 C1 + r2 C2. Constante demandée ∈ {C₁, C₂}.
- Réponse : C₁ = (y1 − r2 y0)/(r1 − r2) ; C₂ = (y1 − r1 y0)/(r2 − r1).
- Vérification : égalité exacte (entier).
- Distracteurs (QCM) ou erreurs typiques (numérique) : l'autre constante → confusion C₁/C₂ ; y0 → on a pris C₁ = y(0) ; y1 → on a pris C₁ = y'(0).
- Explication de la solution : y(0) = C₁ + C₂ = {y0}. y' = {r1}C₁ e^({r1}x) + {r2}C₂ e^({r2}x), donc y'(0) = {r1}C₁ + {r2}C₂ = {y1}. On résout ce système : C₁ = {C1} et C₂ = {C2}.
- Inspiré de : TD équations différentielles, ex. 18.1b et 19.3.

### ed-oscillateur — Oscillateur harmonique : amplitude et période
- Niveau : 3
- Forme : `numerique` (variante amplitude) ou `qcm` (variante période)
- Énoncé gabarit : Le point x(t) vérifie x'' + {ω²}x = 0, avec x(0) = {A} et x'(0) = {Bω}. Variante 1 : donne l'amplitude du mouvement. Variante 2 : quelle est sa période ?
- Paramètres : ω entier dans [1 ; 5] ; (|A| ; |B|) tiré parmi (3 ; 4), (4 ; 3), (5 ; 12), (12 ; 5), (6 ; 8), (8 ; 6), signes au hasard.
- Réponse : amplitude √(A² + B²) (entier) ; période 2π/ω.
- Vérification : variante 1 : égalité exacte (entier) ; variante 2 : égalité exacte avec l'option correcte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : variante 1 : |A| + |B| → somme au lieu de Pythagore ; √(A² + (Bω)²) → oubli de diviser x'(0) par ω ; A → seule la position initiale. Variante 2 : π/ω, ω/(2π), 2πω → formule de la période mal retenue.
- Explication de la solution : λ² + {ω²} = 0 donne λ = ±{ω}i, donc x(t) = A cos {ω}t + B sin {ω}t. x(0) = A = {A}. x'(t) = −{ω}A sin {ω}t + {ω}B cos {ω}t, donc x'(0) = {ω}B = {Bω} et B = {B}. Amplitude : √({A}² + {B}²) = {réponse}. Période : 2π/{ω}.
- Inspiré de : TD équations différentielles, ex. 18.1a (x'' + 4x = 0 : amplitude 2, période π) et ex. 16.2.

---

## Notes pour l'intégration

### Correspondance exercices du TD → contenu produit

**TD complexes**
| Exercice | Traitement |
|---|---|
| 1 (lieu \|z − 3\|/\|z + 3\| = 2) | `cx-lieu-cercle` (généralisé) |
| 2 (racines carrées de −15 − 8j, équation à coefficients complexes) | `cx-racine-carree`, `cx-eq-second-degre`, exemple résolu. L'équation à coefficients complexes n'est pas générée (difficile à paramétrer proprement) |
| 3 (somme 1 + u + … + uⁿ⁻¹ = 0) | Flashcard « somme des racines n-ièmes » (réponse toujours 0, inutile en exercice) |
| 4 (z, 1/z, 1 − z même module) | Exemple résolu (réponse unique, non paramétrable) |
| 5 ((z + z')/(1 + zz') réel) | Non extrait : démonstration |
| 6 ((1 + j tan φ)/(1 − j tan φ)) | 6.1 et 6.3 en flashcards ; 6.2 non extrait (démonstration de formules) ; 6.4 (intégrale de 1/cos x avec t = tan(x/2), résultat ln(1 + √2)) rattaché au chapitre Intégrales (flashcard t = tan(x/2)) |
| 7 (\|1 + jz\| = \|1 − jz\|) | 7.1 en flashcard (médiatrice) ; 7.2 non extrait (démonstration) |
| 8 (z_m paramétré) | 8.3 → `cx-forme-exp` ; 8.4 → `cx-racines-n` ; 8.1 et 8.2 non générés. Extension possible : exercice numérique « Re(z_m) pour m entier donné » = (1 − m²)/(m² + m + 1) |

**TD intégrales**
| Exercice | Traitement |
|---|---|
| 1 (primitives directes) | `int-primitive-puissance`, `int-primitive-usuelle` (items 1 à 6, 9) ; items 7, 8, 10, 11, 12 en flashcards (tan, linéarisation) |
| 2 (changements de variable) | `int-changement-variable` (items 2, 14, 15, 16, 17) ; items 1, 3, 11, 12, 13, 18, 19 utilisables comme QCM futurs ; items 4 à 10 et 20 (arcsin, argsh, substitutions trigonométriques) non extraits : résultats trop longs pour une réponse courte |
| 3 (intégration par parties) | `int-ipp` (forme x e^x) ; items 1 à 9 non générés individuellement (expressions longues), méthode en flashcard |
| 4 (trinômes, fractions) | 4.3 → `int-decomposition` ; 4.1 (arctan) en notion ; 4.2, 4.4 à 4.8 non extraits (argsh, arcsin, expressions longues) |
| 5 (fonctions trigonométriques) | Linéarisation en flashcards ; non généré (expressions longues) |
| 6 (intégrales définies) | 6.1a, c → `int-exp-ln` ; 6.1e → `int-definie-poly` ; 6.2 → `int-ipp` ; 6.3a → `int-changement-variable` ; autres items utilisables en QCM à valeur fixe (π/2, ln √2, π/2 − 1, 1, (e² + 1)/4…) |
| 7 (Wallis) | Flashcard. Extension possible : exercice numérique « calcule I₃, I₅, I₇ » (2/3, 8/15, 16/35) |
| 8 (Iₙ = ∫₀¹ dx/(1 + x²)ⁿ, récurrence) | Non extrait (récurrence à démontrer). Valeurs I₂ = π/8 + 1/4, I₃ = 3π/32 + 1/4 utilisables en QCM |
| 9, 10 (aires) | `int-definie-poly`, `int-aire-entre-courbes`, exemples résolus |
| 11 (aire limitée par x = 2 − 2y − y², résultat 4√3) | Non généré (intégration en y). Variante possible en QCM |
| 12, 13, 14 (longueurs d'arc) | Flashcard « longueur d'arc » ; non générés (résultats avec ln et √17) |
| 15, 16, 26.4 (volumes de révolution) | `int-volume` ; 26.1 à 26.3 (minimisation d'un trajet, équations de droites) non extraits : hors sujet du chapitre |
| 17 (x³/(1 + x²) = x − x/(1 + x²)) | Rattaché à `int-decomposition` (idée de division) ; non généré tel quel |
| 18, 19, 20, 21, 23, 27 | Non extraits : enchaînements longs (argsh, décompositions à plusieurs termes, encadrements, paramètre a) |
| 22, 25 (symétrie f(a + b − x)) | Flashcard ; résultats π/4, π²/4, (π/8) ln 2 utilisables en QCM |
| 24 (I + J et I − J) | Non extrait (astuce de méthode, réponse sous forme de primitive) |

**TD équations différentielles**
| Exercice | Traitement |
|---|---|
| 1 (vérifier des solutions) | `ed-reconnaitre-exp`, méthode « vérifier une solution » |
| 2 (variables séparables) | `ed-separable`, méthode |
| 3 (vidange de Torricelli) | Non généré. Extension possible : temps de vidange t₁ = 2R²√h/(k r²) (≈ 1946 s avec les données du TD) |
| 4 (lancer avec frottement en v²) | Non extrait : solution en tangente, trop technique |
| 5 (équations homogènes) | Flashcard (u = y/x) |
| 6 (linéaires du 1er ordre) | `ed-ordre1-ci`, `ed-equilibre`, exemple résolu (6.1), méthode variation de la constante |
| 7 (boule de glace qui fond) | Non extrait (énoncé long). Résultats utilisables en QCM : t₁ = m/(2a), v(t₁) = mg/(4a) |
| 8, 9, 11 (Bernoulli) | Flashcard (z = y^(1−n)) ; non générés |
| 10 (2nd ordre, 14 équations) | `ed-caracteristique` (10.2, 10.4, 10.11, 10.13, 10.14), `ed-particuliere-exp` (10.13), exemples résolus (10.4, 10.8) ; 10.1 → `ed-primitive-directe` (idée) ; 10.5 à 10.12 couverts par les flashcards sur les seconds membres |
| 12 (refroidissement) | `ed-refroidissement`, exemple résolu |
| 13 (changement t = sin x) | Non extrait (changement de variable dans une équation du 2nd ordre) |
| 14 (circuit RL) | `ed-equilibre` (courant final E/R) ; partie sinusoïdale non extraite |
| 15 (2xy' + y = 3x + 1) | Non généré (solution en 1/√\|x\| sur deux intervalles). Extension possible : trouver a et b dans y = ax + b (a = b = 1) |
| 16 (oscillateur forcé) | `ed-oscillateur`, `ed-equilibre` (x₂ = F/β) |
| 17 (chute avec frottement linéaire) | Flashcard « vitesse limite », `ed-equilibre`, `ed-ordre1-ci` |
| 18 (oscillateur paramétré) | `ed-oscillateur` (18.1a), `ed-ci-2nd` (18.1b), `ed-particuliere-exp` (18.2) |
| 19 (équation d'Euler) | Flashcard ; non généré |

### Erreurs ou incohérences relevées dans les corrigés (à ne pas reprendre telles quelles)
- TD intégrales, ex. 1.7 : l'énoncé demande ∫(1 + tan²x) dx (= tan x + C) mais le corrigé calcule ∫ tan²x dx = tan x − x + C.
- TD intégrales, ex. 14 : l'énoncé donne 0 ≤ θ ≤ π, le corrigé intègre sur [0 ; 2π].
- TD intégrales, ex. 26.3 : les points sont notés A(3, 0) et B(0, 1) au lieu de A(0, 3) et B(1, 0) ; les équations de droites y = −3(x − 1) et y = 3(x − 1) sont justes.
- TD intégrales, ex. 16 : le résultat est 16π/15 (le PDF affiche « 16/15π », ambigu).
- TD équations différentielles, ex. 10.10 : la solution particulière du corrigé (coefficients 1/10 et −1/8) est fausse. En posant y = e^(−x) u, on obtient u'' + 2u = cos x, donc y_p = e^(−x) cos x.
- TD équations différentielles, ex. 10.11 : l'équation caractéristique est λ² − λ − 2 = 0 (le corrigé écrit « + 2 », mais trouve bien les racines 2 et −1).
- TD équations différentielles, ex. 12.4 : le corrigé arrondit k à 0,255 et trouve 9,03 min ; avec k exact, t = ln 10 / ((1/2) ln(5/3)) ≈ 9,01 min. Prévoir une tolérance si cet exemple sert à un exercice.

### Figures et éléments non extraits
- Graphiques des aires, longueurs et volumes (TD intégrales, ex. 9 à 16 et 26) et schémas physiques (récipient de l'ex. 3, circuit RL de l'ex. 14 du TD équations différentielles) : figures non reprises ; leur contenu est décrit dans le texte. Un schéma « aire sous une courbe » et « disque de révolution » serait utile dans l'application.

### Remarques techniques pour l'implémentation
- Saisie des réponses numériques : prévoir la saisie d'une fraction (ex. « 13/3 ») et d'un décimal avec virgule (« 4,33 ») ; les exercices `int-aire-entre-courbes` et `int-changement-variable` ont une tolérance de ±0,01, tous les autres exercices numériques ont une réponse entière.
- QCM dont les options sont des expressions : prévoir un rendu mathématique (exposants, fractions, racines, e^(iθ)) ; afficher les signes proprement (« 3 − 4i » et non « 3 + −4i », « y'' − 2y' » et non « y'' + −2y' », supprimer les termes de coefficient 0 et les coefficients 1).
- `cx-racines-n` : la vérification doit se faire modulo 2π (plusieurs écritures d'un même angle sont équivalentes) et rejeter tout distracteur qui serait aussi solution.
- `cx-forme-exp` : comparer les angles modulo 2π et présenter l'argument principal dans ]−π ; π].
- Les exercices du chapitre Équations différentielles de niveau 3 utilisent les racines de l'équation caractéristique : il est recommandé de débloquer `ed-caracteristique` avant `ed-ci-2nd` et `ed-particuliere-exp`, et le chapitre Nombres complexes avant `ed-oscillateur`.
- Ordre conseillé des chapitres : Nombres complexes → Intégrales → Équations différentielles (les équations différentielles utilisent les primitives et, pour Δ < 0, les complexes).
