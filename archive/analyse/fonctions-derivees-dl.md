# Analyse : Fonctions, limites, dérivées, développements limités (CNAM MVA005)

Documents analysés (lus en entier) :
- `TD fonction limites.pdf` : « Fonctions, limite, continuité », Dr N. Assaad, 27 pages, exercices 1 à 31 avec solutions.
- `TD derivee et DL.pdf` : « Dérivée, différentielle et Développement limité », Dr N. Assaad, 44 pages, exercices 1 à 45 avec solutions.

Conventions d'écriture dans ce fichier :
- Notation française : virgule décimale (0,5), intervalles `[a ; b]`, `]a ; +∞[`.
- Formules en texte simple Unicode : `x²`, `√x`, `e^x`, `lim(x→a) f(x)` se lit « limite de f(x) quand x tend vers a ».
- `⌊x⌋` = partie entière inférieure (plus grand entier ≤ x).
- `o(xⁿ)` = « reste négligeable devant xⁿ » (le TD écrit `O(xⁿ⁺¹)` ou `ε(x)` pour la même idée).
- Paramètres des gabarits entre accolades : `{a}`, `{b}`… Toutes les réponses fractionnaires sont à comparer comme fractions exactes (accepter aussi l'écriture décimale arrondie à 0,01 près).

---

# Chapitre : Fonctions et limites
Source : `TD fonction limites.pdf`, pages 1 à 27, exercices 1 (intervalles), 3 (domaine, parité), 4, 5 et 18 (partie entière, périodicité), 6 à 15 (limites), 16 et 17 (limites en physique), 19 à 28 (continuité, prolongement, valeurs intermédiaires), 25 et 30 (composition, réciproque), 29 (fonctions hyperboliques), 31 (valeurs absolues). Complété par `TD derivee et DL.pdf` exercice 11.2 (croissances comparées).
Niveau visé : trouver le domaine de définition d'une fonction, dire si elle est paire ou impaire, calculer des limites (y compris les formes indéterminées avec factorisation, quantité conjuguée, limites remarquables et le nombre e), étudier la continuité d'une fonction définie par morceaux et la prolonger par continuité.
Prérequis : calcul littéral (développer, factoriser, identités remarquables), puissances et racines, résolution d'équations et d'inéquations du premier degré, notions de base sur sin, cos, exp et ln.

## Explication pour un novice
Une fonction, c'est une machine : tu mets un nombre x à l'entrée, elle te rend un seul nombre f(x) à la sortie. Par exemple, la machine « f(x) = x² » transforme 3 en 9. Certaines machines refusent certains nombres : `1/x` ne peut pas avaler 0 (on ne divise pas par zéro), `√x` refuse les nombres négatifs. L'ensemble des nombres acceptés s'appelle le domaine de définition.

Une limite répond à la question : « vers quoi se rapproche la sortie quand l'entrée se rapproche d'une valeur, sans forcément l'atteindre ? ». Imagine que tu marches vers un mur : même si tu n'as pas le droit de le toucher, tu vois très bien où tu vas arriver. C'est pareil avec `(x² − 1)/(x − 1)` : en x = 1 la formule donne 0/0 (interdit), mais quand x s'approche de 1, le résultat s'approche de 2. La limite vaut 2.

On regarde aussi ce qui se passe « très loin », quand x devient immense (on dit « x tend vers +∞ »). Dans une somme comme `3x² + 5x + 7`, quand x vaut un million, c'est `3x²` qui écrase tout le reste : c'est le terme dominant. Pour une fraction, on compare les termes dominants du haut et du bas.

Parfois le calcul direct donne une expression qui ne veut rien dire, comme 0/0, ∞/∞, ∞ − ∞ ou 1^∞ : on parle de forme indéterminée. Ce n'est pas une réponse, c'est un signal : il faut transformer l'expression (factoriser, multiplier par la quantité conjuguée, utiliser une limite connue) avant de conclure.

Enfin, une fonction est continue en un point si on peut tracer sa courbe à cet endroit sans lever le crayon : la limite en ce point existe et est égale à la valeur de la fonction. Quand une fonction n'est pas définie en un point mais qu'elle y a une limite finie, on peut « boucher le trou » en lui donnant cette valeur : c'est le prolongement par continuité.

## Notions (dans l'ordre d'apprentissage)
- Fonction : une règle qui associe à chaque nombre accepté x un unique nombre f(x) | f : D → ℝ, x ↦ f(x), où D ⊂ ℝ.
- Intervalle : un morceau « sans trou » de la droite des réels | ensemble des x tels que a ≤ x ≤ b (noté [a ; b]), crochet tourné vers l'extérieur si la borne est exclue.
- Valeur absolue : la distance d'un nombre à 0, toujours positive | |x| = x si x ≥ 0, |x| = −x si x < 0 ; |x − a| ≤ r ⇔ a − r ≤ x ≤ a + r.
- Domaine de définition : l'ensemble des x pour lesquels la formule a un sens | pas de division par 0, rien de négatif sous √, rien de négatif ou nul dans ln.
- Fonction paire : courbe symétrique par rapport à l'axe vertical | pour tout x de D (D symétrique), f(−x) = f(x).
- Fonction impaire : courbe symétrique par rapport à l'origine | pour tout x de D (D symétrique), f(−x) = −f(x).
- Partie entière : l'entier juste en dessous (ou égal) | ⌊x⌋ = le plus grand entier n tel que n ≤ x ; ⌊2,3⌋ = 2, ⌊−2,3⌋ = −3.
- Fonction périodique : le dessin se répète à l'identique | il existe T > 0 tel que f(x + T) = f(x) pour tout x (exemple : x − ⌊x⌋, période 1).
- Composition : enchaîner deux machines | (g ∘ f)(x) = g(f(x)) ; attention, en général g ∘ f ≠ f ∘ g.
- Fonction réciproque : la machine qui « défait » f | f⁻¹(y) = x ⇔ f(x) = y ; existe si f est continue et strictement monotone sur un intervalle.
- Limite finie en un point : f(x) se rapproche autant qu'on veut de L quand x se rapproche de a | lim(x→a) f(x) = L.
- Limite à gauche et à droite : on s'approche de a par la gauche (x < a) ou par la droite (x > a) | la limite existe si et seulement si les deux limites existent et sont égales.
- Limite à l'infini : comportement de f quand x devient immense | lim(x→+∞) 1/xⁿ = 0 pour n > 0.
- Terme dominant : le terme de plus haut degré, qui impose sa loi à l'infini | lim(x→±∞) (aₙxⁿ + … )/(bₘxᵐ + …) = lim aₙxⁿ/(bₘxᵐ).
- Forme indéterminée : calcul direct impossible à conclure | 0/0, ∞/∞, ∞ − ∞, 0 × ∞, 1^∞.
- Quantité conjuguée : astuce pour faire disparaître une racine | (√A − B)(√A + B) = A − B².
- Limites remarquables : limites de référence à connaître par cœur | sin x/x → 1, (1 − cos x)/x² → 1/2, ln(1 + x)/x → 1, (e^x − 1)/x → 1 quand x → 0.
- Le nombre e comme limite : | lim(x→+∞) (1 + k/x)^x = e^k.
- Croissances comparées : l'exponentielle l'emporte sur toute puissance | lim(x→+∞) x/e^(ax) = 0 (a > 0) ; lim(x→−∞) x·e^x = 0.
- Continuité en un point : pas de saut, pas de trou | lim(x→a) f(x) = f(a).
- Prolongement par continuité : boucher un trou avec la valeur limite | si f n'est pas définie en a mais lim(x→a) f(x) = L finie, on pose f(a) = L.
- Théorème des valeurs intermédiaires : une courbe continue qui passe de négatif à positif coupe forcément l'axe | f continue sur [a ; b] et f(a)·f(b) < 0 ⇒ il existe c dans ]a ; b[ avec f(c) = 0.
- Fonctions hyperboliques (complément) : | cosh x = (e^x + e^(−x))/2, sinh x = (e^x − e^(−x))/2, cosh²x − sinh²x = 1.

## Méthodes
### Trouver le domaine de définition
1. Repère chaque dénominateur : écris « dénominateur ≠ 0 » et trouve les valeurs interdites.
2. Repère chaque racine carrée : écris « ce qui est dessous ≥ 0 ».
3. Repère chaque logarithme : écris « ce qui est dedans > 0 ».
4. Le domaine est l'ensemble des x qui vérifient toutes ces conditions à la fois.

### Tester la parité
1. Vérifie que le domaine est symétrique (si x est permis, −x aussi).
2. Calcule f(−x) en remplaçant chaque x par (−x).
3. Si tu retrouves f(x) : paire. Si tu retrouves −f(x) : impaire. Sinon : ni l'une ni l'autre.
4. Réflexe pour les polynômes : seulement des puissances paires (constante comprise) → paire ; seulement des puissances impaires → impaire.

### Limite d'une fraction de polynômes en ±∞
1. Dans le numérateur, garde seulement le terme de plus haut degré ; pareil au dénominateur.
2. Simplifie la fraction de ces deux termes.
3. Même degré : la limite est le quotient des coefficients. Degré du haut plus petit : 0. Degré du haut plus grand : ±∞ (le signe se lit sur la fraction simplifiée).

### Lever une forme 0/0 en un point a
1. Remplace x par a : si tu obtiens 0/0, c'est que (x − a) est caché en haut et en bas.
2. Factorise numérateur et dénominateur par (x − a) (identités remarquables, ou changement de variable y⁶ = x pour les racines).
3. Simplifie par (x − a), puis remplace x par a.

### Quantité conjuguée (formes ∞ − ∞ ou 0/0 avec une racine)
1. Repère l'expression √A − B.
2. Multiplie en haut et en bas par √A + B.
3. Le numérateur devient A − B² (la racine disparaît), puis applique la méthode du terme dominant.

### Utiliser une limite remarquable
1. Fais apparaître exactement le motif de référence : par exemple sin(3x)/x = 3 × sin(3x)/(3x).
2. Pose u = 3x : quand x → 0, u → 0, donc sin(u)/u → 1.
3. Conclus en multipliant par le facteur sorti (ici 3).

### Formes 1^∞ : passer par l'exponentielle
1. Écris f(x)^g(x) = exp(g(x) × ln f(x)).
2. Calcule la limite de l'exposant g(x) × ln f(x) avec les limites remarquables (ln(1 + u)/u → 1).
3. La limite cherchée est e puissance cette limite.

### Étudier la continuité d'une fonction définie par morceaux
1. Sur chaque morceau ouvert, la formule est une fonction usuelle : elle est continue là où elle est définie.
2. À chaque point de raccord c, calcule la limite à gauche, la limite à droite et f(c).
3. Si les trois sont égales, f est continue en c. Sinon, il y a une discontinuité (un saut si les deux limites sont finies mais différentes).
4. Pour trouver un paramètre qui rend f continue, écris l'égalité « limite à gauche = limite à droite » et résous.

## Exemples résolus
### Résoudre |x − 1| ≤ 4 (TD 1, ex. 1.3)
- |x − 1| ≤ 4 ⇔ −4 ≤ x − 1 ≤ 4 — « la distance entre x et 1 est au plus 4 ».
- ⇔ −3 ≤ x ≤ 5 — on ajoute 1 aux trois membres.
- Solution : l'intervalle [−3 ; 5].

### Parité de f(x) = x/|x| (TD 1, ex. 3.5)
- Domaine : x ≠ 0, symétrique — on enlève seulement 0.
- f(−x) = (−x)/|−x| = −x/|x| — car |−x| = |x|.
- f(−x) = −f(x) donc f est impaire.

### lim(x→+∞) (2x² − 3x − 4)/√(x⁴ + 1) (TD 1, ex. 6.3)
- En haut, le terme dominant est 2x² — les autres termes deviennent négligeables.
- En bas, √(x⁴ + 1) = x²√(1 + 1/x⁴) ≈ x² — on sort x⁴ de la racine.
- La fraction se comporte comme 2x²/x² = 2. Limite : 2.

### lim(x→4) (x/(x − 4) − 32/(x² − 16)) (TD 1, ex. 12.8)
- Même dénominateur : (x(x + 4) − 32)/((x − 4)(x + 4)) = (x² + 4x − 32)/((x − 4)(x + 4)).
- On factorise : x² + 4x − 32 = (x + 8)(x − 4) — 4 est racine, comme prévu.
- On simplifie par (x − 4) : (x + 8)/(x + 4) → 12/8 = 3/2.

### lim(x→+∞) (√(x² + 3x − 7) − x) (TD 1, ex. 12.5)
- Forme ∞ − ∞ : on multiplie par la quantité conjuguée √(x² + 3x − 7) + x.
- Numérateur : (x² + 3x − 7) − x² = 3x − 7 — la racine a disparu.
- Dénominateur ≈ x + x = 2x — on garde les termes dominants.
- Limite : 3x/(2x) = 3/2.

### lim(x→0) sin(πx)/sin(3πx) (TD 1, ex. 8.3)
- On écrit (sin(πx)/(πx)) × ((3πx)/sin(3πx)) × (πx/(3πx)).
- Les deux premiers facteurs tendent vers 1 (limite remarquable).
- Le dernier vaut 1/3. Limite : 1/3.

### lim(x→+∞) ((x − 1)/(x + 3))^(x + 2) (TD 1, ex. 9.4)
- (x − 1)/(x + 3) = (1 − 1/x)/(1 + 3/x) — on divise haut et bas par x.
- (1 − 1/x)^x → e^(−1) et (1 + 3/x)^x → e^3 — formule (1 + k/x)^x → e^k.
- Le facteur restant (…)² tend vers 1. Limite : e^(−1)/e^3 = e^(−4).

### Trouver a et b pour que f soit continue (TD 1, ex. 23)
f(x) = 0 si x ≤ 2 ; a − b/x si 2 < x ≤ 4 ; 1 si x > 4.
- En 2 : il faut a − b/2 = 0 — limite à droite = valeur en 2.
- En 4 : il faut a − b/4 = 1 — valeur en 4 = limite à droite.
- On soustrait la première égalité de la seconde : (a − b/4) − (a − b/2) = 1 − 0, donc b/4 = 1 et b = 4.
- On reporte dans a − b/2 = 0 : a = 2.

### Montrer que x³ − 3x + 1 = 0 a une solution dans [1 ; 2] (TD 1, ex. 19)
- f(1) = 1 − 3 + 1 = −1 < 0 et f(2) = 8 − 6 + 1 = 3 > 0.
- f est un polynôme, donc continue : elle passe de négatif à positif.
- Par le théorème des valeurs intermédiaires, elle s'annule entre 1 et 2.

## Pièges fréquents
- Croire que 0/0 = 0 ou 0/0 = 1 → 0/0 n'est pas un nombre : c'est un signal qu'il faut factoriser ou transformer.
- Écrire ∞ − ∞ = 0 → c'est une forme indéterminée : utilise la quantité conjuguée ou factorise par le terme dominant.
- Écrire 1^∞ = 1 → (1 + 1/x)^x tend vers e ≈ 2,718, pas vers 1. Passe par exp(x × ln(…)).
- Oublier le coefficient dans sin(ax)/x → la limite vaut a, pas 1 : fais apparaître sin(ax)/(ax).
- Confondre partie entière et « chiffres avant la virgule » pour un négatif → ⌊−2,3⌋ = −3, pas −2.
- Oublier que √(x²) = |x| → pour x → −∞, √(x²) = −x (TD 1, ex. 12.9 : la limite vaut −2 en −∞ et 0 en +∞).
- Conclure qu'une limite existe en regardant un seul côté → avec |x + 1| ou x/|x|, calcule séparément à gauche et à droite.
- Déclarer une fonction paire sans vérifier le domaine → le domaine doit être symétrique (ex. : (1 − x²)/(1 + x) n'est pas définie en −1 mais l'est en 1).
- Penser que g ∘ f = f ∘ g → avec f(x) = √x et g(x) = x², f(g(x)) = |x| alors que g(f(x)) = x (seulement pour x ≥ 0).
- Changer le sens d'une inéquation au mauvais moment → on inverse le sens seulement quand on multiplie ou divise par un nombre négatif.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu'est-ce que le domaine de définition ? | L'ensemble des x pour lesquels la formule de f(x) a un sens. |
| Trois interdits pour le domaine ? | Diviser par 0, prendre √ d'un négatif, prendre ln d'un nombre ≤ 0. |
| \|x − a\| ≤ r équivaut à ? | a − r ≤ x ≤ a + r, c'est-à-dire x ∈ [a − r ; a + r]. |
| Définition d'une fonction paire ? | f(−x) = f(x) pour tout x du domaine (symétrique). Courbe symétrique par rapport à l'axe vertical. |
| Définition d'une fonction impaire ? | f(−x) = −f(x) pour tout x du domaine. Courbe symétrique par rapport à l'origine. |
| x³ + x est-elle paire ou impaire ? | Impaire : uniquement des puissances impaires. |
| Que vaut ⌊−2,3⌋ ? | −3 (le plus grand entier inférieur ou égal à −2,3). |
| Période de x − ⌊x⌋ ? | 1, car ⌊x + 1⌋ = ⌊x⌋ + 1. |
| (g ∘ f)(x) se calcule comment ? | On applique f d'abord, puis g : g(f(x)). |
| Les cinq formes indéterminées ? | 0/0, ∞/∞, ∞ − ∞, 0 × ∞ et 1^∞. |
| lim(x→+∞) 1/xⁿ pour n > 0 ? | 0. |
| Limite en ∞ d'une fraction de polynômes de même degré ? | Le quotient des coefficients des termes de plus haut degré. |
| Limite en ∞ si le degré du haut est plus petit ? | 0. |
| lim(x→0) sin x / x ? | 1. |
| lim(x→0) sin(ax) / x ? | a (écrire a × sin(ax)/(ax)). |
| lim(x→0) (1 − cos x)/x² ? | 1/2. |
| lim(x→0) ln(1 + x)/x ? | 1. |
| lim(x→0) (e^x − 1)/x ? | 1. Plus généralement (e^(ax) − 1)/x → a. |
| lim(x→+∞) (1 + k/x)^x ? | e^k. |
| À quoi sert la quantité conjuguée ? | À supprimer une racine : (√A − B)(√A + B) = A − B². |
| √(x²) vaut toujours x ? | Non : √(x²) = \|x\|, donc −x quand x est négatif. |
| Qui gagne entre x et e^x en +∞ ? | L'exponentielle : x/e^x → 0. |
| f continue en a signifie ? | lim(x→a) f(x) existe et vaut f(a) : pas de saut, pas de trou. |
| Quand peut-on prolonger f par continuité en a ? | Quand f n'est pas définie en a mais a une limite finie L en a ; on pose f(a) = L. |
| x/\|x\| est-elle prolongeable en 0 ? | Non : limite 1 à droite, −1 à gauche, donc pas de limite en 0. |
| Théorème des valeurs intermédiaires ? | f continue sur [a ; b] et f(a), f(b) de signes contraires ⇒ f s'annule entre a et b. |
| Où ⌊x⌋ est-elle discontinue ? | En chaque nombre entier : la courbe fait un saut de 1. |
| cosh²x − sinh²x = ? | 1. |

## Exercices générables

### ch1-inequation — Résoudre une inéquation simple
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Variante A : « Résous {a}x + {b} ≥ {c}. Les solutions forment l'intervalle [s ; +∞[. Que vaut s ? » Variante B : « L'ensemble des x tels que |x − {m}| ≤ {r} est un intervalle [u ; v]. Que vaut v ? »
- Paramètres : A : a ∈ {2, …, 9}, s ∈ {−9, …, 9}, b ∈ {−9, …, 9}, puis c = a·s + b (garantit une réponse entière). B : m ∈ {−9, …, 9}, r ∈ {1, …, 9}.
- Réponse : A : s = (c − b)/a. B : v = m + r.
- Vérification : égalité exacte d'entiers.
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : (c + b)/a → signe de b non changé en passant de l'autre côté ; c − b → oubli de diviser par a ; c/a − b → division appliquée au mauvais terme. B : r − m → confusion de sens ; m − r → donne la borne inférieure ; r → oubli du centre m.
- Explication de la solution : A : « On isole x : {a}x ≥ {c} − {b} = {c−b}. On divise par {a}, qui est positif, donc le sens ne change pas : x ≥ {s}. » B : « |x − {m}| ≤ {r} veut dire : x est à distance au plus {r} de {m}. Donc {m} − {r} ≤ x ≤ {m} + {r}, et v = {m+r}. »
- Inspiré de : TD fonctions-limites, ex. 1.1 et 1.3.

### ch1-partie-entiere — Calculer une partie entière
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : « Que vaut ⌊{x}⌋, la partie entière inférieure de {x} ? »
- Paramètres : n ∈ {−9, …, 9}, d ∈ {1, …, 9} ; x = n + d/10 affiché avec virgule (exemple : n = −3, d = 7 donne x = −2,3). Au moins une fois sur deux, choisir n < 0.
- Réponse : n.
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : n + 1 quand x < 0 → troncature (on a gardé les chiffres avant la virgule) ; n + 1 quand x > 0 → partie entière supérieure ⌈x⌉ ; arrondi au plus proche → confusion avec l'arrondi.
- Explication de la solution : « ⌊x⌋ est le plus grand entier inférieur ou égal à x. Sur la droite graduée, {x} est entre {n} et {n+1} ; l'entier juste en dessous est {n}. »
- Inspiré de : TD fonctions-limites, ex. 4, 5 et 18.

### ch1-valeur-interdite — Trouver une valeur interdite ou une borne du domaine
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Variante A : « f(x) = ({p}x + {q}) / ({a}x − {b}). Quelle valeur de x est interdite ? » Variante B : « f(x) = √(x − {k}). Quelle est la plus petite valeur de x pour laquelle f(x) est définie ? »
- Paramètres : A : a ∈ {1, …, 5}, k ∈ {−6, …, 6}, b = a·k ; p ∈ {1, …, 5}, q ∈ {−9, …, 9} avec p·k + q ≠ 0 (pour éviter une simplification). B : k ∈ {−9, …, 9}.
- Réponse : A : k = b/a. B : k.
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : −k → erreur de signe ; b → oubli de diviser par a ; −q/p → racine du numérateur au lieu du dénominateur. B : −k → erreur de signe ; 0 → réflexe « x ≥ 0 ».
- Explication de la solution : A : « On ne peut pas diviser par 0. On résout {a}x − {b} = 0, donc x = {b}/{a} = {k}. » B : « Sous la racine, il faut x − {k} ≥ 0, donc x ≥ {k}. »
- Inspiré de : TD fonctions-limites, ex. 3 et 20.1.

### ch1-parite — Paire, impaire ou ni l'une ni l'autre
- Niveau : 2
- Forme : `qcm`
- Énoncé gabarit : « La fonction f(x) = {a}x^{n} + {b}x^{m} est-elle paire, impaire, ou ni l'une ni l'autre ? » (variante : « f(x) = {a}x^{n} + {c} »).
- Paramètres : a, b ∈ {−5, …, −1, 1, …, 5} ; n, m ∈ {1, …, 6}, n ≠ m ; c ∈ {−9, …, −1, 1, …, 9}. Équilibrer les trois réponses.
- Réponse : n et m pairs → « paire » ; n et m impairs → « impaire » ; un pair et un impair → « ni paire ni impaire ». Variante : n pair → « paire » (la constante est une puissance paire x⁰) ; n impair → « ni paire ni impaire ».
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : options fixes « paire », « impaire », « ni paire ni impaire », « à la fois paire et impaire » (seule la fonction nulle l'est → piège de vocabulaire). Erreur classique : croire qu'un coefficient négatif rend la fonction impaire.
- Explication de la solution : « On calcule f(−x) : (−x)^k = x^k si k est pair et −x^k si k est impair. Ici f(−x) = … ; on compare avec f(x) et −f(x). »
- Inspiré de : TD fonctions-limites, ex. 3 (f₁ à f₁₅).

### ch1-lim-infini-fraction — Limite en +∞ d'une fraction de polynômes
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : « Calcule lim(x→+∞) ({a}x^{n} + {b}x + {c}) / ({d}x^{p} + {e}). »
- Paramètres : n ∈ {2, 3} ; a, d ∈ {1, …, 9} ; b, c, e ∈ {−9, …, 9} ; p = n dans 3 cas sur 4, p = n + 1 dans 1 cas sur 4.
- Réponse : si p = n : a/d (fraction réduite) ; si p = n + 1 : 0.
- Vérification : égalité de fractions exactes ou décimal à 0,01 près.
- Distracteurs (QCM) ou erreurs typiques (numérique) : d/a → fraction renversée ; c/e → on a regardé les constantes (comme en x → 0) ; 1 → « ∞/∞ = 1 » ; a/d quand p = n + 1 → degrés non comparés.
- Explication de la solution : « En +∞, seuls les termes de plus haut degré comptent : la fraction se comporte comme {a}x^{n}/({d}x^{p}). Même degré : on obtient {a}/{d}. Degré du bas plus grand : il reste un 1/x qui tend vers 0. »
- Inspiré de : TD fonctions-limites, ex. 6.1 à 6.4.

### ch1-lim-0sur0 — Lever une forme 0/0 par factorisation
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Variante A : « Calcule lim(x→{a}) (x² − {s}x + {q}) / (x − {a}). » Variante B : « Calcule lim(x→{k²}) (√x − {k}) / (x − {k²}). »
- Paramètres : A : a, b ∈ {−6, …, 6}, b ≠ a ; s = a + b, q = a·b (afficher proprement les signes). B : k ∈ {1, …, 5}.
- Réponse : A : a − b. B : 1/(2k).
- Vérification : égalité exacte (fraction pour B).
- Distracteurs (QCM) ou erreurs typiques (numérique) : 0 → « 0/0 = 0 » ; 1 → « 0/0 = 1 » ; b − a → erreur de signe dans la factorisation ; B : 2k → fraction renversée ; 1/k → oubli du facteur 2.
- Explication de la solution : A : « En x = {a} on obtient 0/0 : (x − {a}) est caché en haut. x² − {s}x + {q} = (x − {a})(x − {b}). On simplifie : il reste x − {b}, qui tend vers {a} − {b}. » B : « x − {k²} = (√x − {k})(√x + {k}). On simplifie par √x − {k} : il reste 1/(√x + {k}) → 1/(2×{k}). »
- Inspiré de : TD fonctions-limites, ex. 7.2, 12.8, 15.

### ch1-lim-remarquable — Limites remarquables en 0
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : une variante tirée au hasard : (A) lim(x→0) sin({a}x)/x ; (B) lim(x→0) sin({a}x)/sin({b}x) ; (C) lim(x→0) (e^({a}x) − 1)/x ; (D) lim(x→0) ln(1 + {a}x)/x ; (E) lim(x→0) tan({a}x)/x.
- Paramètres : a, b ∈ {−9, …, −1, 2, …, 9} (éviter 1 pour que l'oubli du coefficient se voie), b ≠ a.
- Réponse : A, C, D, E : a. B : a/b (fraction réduite).
- Vérification : égalité exacte (fraction ou décimal à 0,01 près).
- Distracteurs (QCM) ou erreurs typiques (numérique) : 1 → coefficient oublié ; 1/a → fraction renversée ; 0 → « sin 0 = 0 donc la limite est 0 » ; B : b/a → fraction renversée.
- Explication de la solution : « On fait apparaître le motif connu : sin({a}x)/x = {a} × sin({a}x)/({a}x). Quand x → 0, u = {a}x → 0 et sin(u)/u → 1. La limite vaut {a}. » (adapter avec (e^u − 1)/u → 1, ln(1 + u)/u → 1, tan(u)/u → 1 ; pour B, multiplier et diviser par {a}x et {b}x.)
- Inspiré de : TD fonctions-limites, ex. 8.1, 8.3, 10.4, 11.1 ; TD dérivée-DL, ex. 43.1.

### ch1-lim-puissance-e — Formes 1^∞ et nombre e
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Variante A : « lim(x→+∞) (1 + {k}/x)^x s'écrit e^N. Que vaut N ? » Variante B : « lim(x→+∞) ((x + {p})/(x + {q}))^x s'écrit e^N. Que vaut N ? »
- Paramètres : A : k ∈ {−6, …, −1, 2, …, 6}. B : p, q ∈ {−5, …, 5}, p ≠ q.
- Réponse : A : N = k. B : N = p − q.
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 0 → piège « 1^∞ = 1 » (e⁰ = 1) ; 1/k → inversion ; q − p → soustraction dans le mauvais sens ; p + q → produit au lieu de quotient.
- Explication de la solution : A : « On écrit (1 + {k}/x)^x = exp(x·ln(1 + {k}/x)). Avec u = {k}/x → 0, x·ln(1 + u) = {k}·ln(1 + u)/u → {k}. Donc la limite vaut e^{k}. » B : « (x + {p})/(x + {q}) = (1 + {p}/x)/(1 + {q}/x). Le haut puissance x tend vers e^{p}, le bas vers e^{q}. Quotient : e^({p} − {q}). »
- Inspiré de : TD fonctions-limites, ex. 9.1 à 9.4 ; TD dérivée-DL, ex. 43.12.

### ch1-lim-conjuguee — Forme ∞ − ∞ avec une racine
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : « Calcule lim(x→+∞) (√(x² + {b}x + {c}) − x). »
- Paramètres : b ∈ {−9, …, −1, 1, …, 9}, c ∈ {−9, …, 9}.
- Réponse : b/2.
- Vérification : égalité de fractions exactes ou décimal à 0,01 près.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 0 → « ∞ − ∞ = 0 » ; b → oubli du dénominateur 2x ; c/2 → mauvais terme retenu ; b/2 + c → terme constant gardé à tort.
- Explication de la solution : « Forme ∞ − ∞. On multiplie et divise par √(x² + {b}x + {c}) + x. Le numérateur devient (x² + {b}x + {c}) − x² = {b}x + {c}. Le dénominateur se comporte comme x + x = 2x. Limite : {b}x/(2x) = {b}/2. »
- Inspiré de : TD fonctions-limites, ex. 12.5 ; TD dérivée-DL, ex. 37.

### ch1-continuite-parametre — Choisir un paramètre pour rendre f continue
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Variante A : « f(x) = {k}x + m si x < {c}, et f(x) = x² si x ≥ {c}. Quelle valeur de m rend f continue en {c} ? » Variante B : « f(x) = 0 si x ≤ {p} ; a − b/x si {p} < x ≤ {q} ; 1 si x > {q}. Quelle valeur de a rend f continue partout ? »
- Paramètres : A : k ∈ {−5, …, 5}, c ∈ {−4, …, 4}. B : d ∈ {1, 2, 3}, j ∈ {1, …, 4}, p = j·d, q = (j + 1)·d (garantit des entiers).
- Réponse : A : m = c² − k·c. B : a = j + 1 (et b = j(j + 1)d, utilisable comme question bonus).
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : c² → oubli du terme k·c ; c² + k·c → erreur de signe ; k·c − c² → égalité écrite à l'envers. B : b → répond au mauvais paramètre ; 1 → confond avec la valeur à droite.
- Explication de la solution : A : « Continuité en {c} : la limite à gauche {k}×{c} + m doit être égale à f({c}) = {c}². Donc m = {c}² − {k}×{c}. » B : « En {p} : a − b/{p} = 0. En {q} : a − b/{q} = 1. On résout le système : b = {p}{q}/({q} − {p}) et a = b/{p}. »
- Inspiré de : TD fonctions-limites, ex. 20.6, 22, 23, 24.

---

# Chapitre : Dérivées
Source : `TD derivee et DL.pdf`, pages 1 à 19, exercices 1 à 23 (définition, tangente, règles de calcul, dérivées usuelles et composées, différentielle, L'Hospital, Rolle, optimisation, accroissements finis). Complété par `TD fonction limites.pdf` exercice 30 (réciproque, dérivée positive).
Niveau visé : calculer un taux d'accroissement et un nombre dérivé, dériver toute fonction usuelle et composée, écrire l'équation d'une tangente, trouver un extremum, résoudre un petit problème d'optimisation, utiliser la règle de L'Hospital et le théorème des accroissements finis.
Prérequis : chapitre « Fonctions et limites » (limites, formes indéterminées), équations du premier et du second degré, équation de droite y = mx + p.

## Explication pour un novice
Pense à une voiture sur une route. Si elle parcourt 120 km en 2 heures, sa vitesse moyenne est 120/2 = 60 km/h. Pour une fonction, la « vitesse moyenne » entre deux points a et a + h s'appelle le taux d'accroissement : (f(a + h) − f(a))/h. C'est « de combien la sortie a bougé, divisé par de combien l'entrée a bougé ».

Mais le compteur de la voiture indique une vitesse instantanée, à un moment précis. On l'obtient en prenant un intervalle de temps h de plus en plus petit : c'est la limite du taux d'accroissement quand h → 0. Ce nombre s'appelle le nombre dérivé de f en a, noté f'(a). S'il existe, on dit que f est dérivable en a.

Sur le dessin, le taux d'accroissement est la pente d'une corde entre deux points de la courbe. Quand les deux points se rapprochent, la corde devient la tangente : la droite qui « frôle » la courbe en a. Sa pente est f'(a), et son équation est y = f(a) + f'(a)(x − a).

Calculer toutes les limites à la main serait épuisant. Heureusement, on a des résultats tout faits (dérivées usuelles : (x²)' = 2x, (sin x)' = cos x…) et des règles pour combiner : somme, produit, quotient, composition. Avec ça, on dérive presque tout.

À quoi ça sert ? Le signe de f' dit si f monte (f' > 0) ou descend (f' < 0). Là où f' s'annule en changeant de signe, f atteint un sommet ou un creux : un maximum ou un minimum. C'est l'outil pour optimiser : la boîte qui utilise le moins de matière, le rectangle de plus grande aire, le trajet le plus rapide.

## Notions (dans l'ordre d'apprentissage)
- Taux d'accroissement : la vitesse moyenne de f entre a et a + h | τ(h) = (f(a + h) − f(a))/h.
- Nombre dérivé : la vitesse instantanée de f en a | f'(a) = lim(h→0) (f(a + h) − f(a))/h, si cette limite existe et est finie.
- Fonction dérivée : la machine qui donne le nombre dérivé en chaque point | f' : x ↦ f'(x).
- Tangente : la droite qui colle à la courbe en un point | y = f(a) + f'(a)(x − a) ; l'angle α avec l'axe horizontal vérifie tan α = f'(a).
- Normale : la droite perpendiculaire à la tangente au même point | y = f(a) − (x − a)/f'(a) si f'(a) ≠ 0.
- Dérivées usuelles : résultats de référence | (c)' = 0, (xⁿ)' = n·xⁿ⁻¹, (√x)' = 1/(2√x), (1/x)' = −1/x², (e^x)' = e^x, (ln x)' = 1/x, (sin x)' = cos x, (cos x)' = −sin x, (tan x)' = 1 + tan²x.
- Règles de calcul : comment combiner | (u + v)' = u' + v', (k·u)' = k·u', (uv)' = u'v + uv', (u/v)' = (u'v − uv')/v².
- Dérivée d'une composée (règle de la chaîne) : on dérive l'extérieur puis on multiplie par la dérivée de l'intérieur | (g(u(x)))' = u'(x)·g'(u(x)) ; exemples (e^u)' = u'e^u, (ln u)' = u'/u, (uⁿ)' = n·u'·uⁿ⁻¹.
- Puissance variable : | (u^v)' = u^v·(v' ln u + v u'/u), via ln y = v ln u ; exemple (x^x)' = x^x(ln x + 1).
- Dérivées des fonctions trigonométriques réciproques : | (arcsin x)' = 1/√(1 − x²), (arccos x)' = −1/√(1 − x²), (arctan x)' = 1/(1 + x²).
- Différentielle : la petite variation de f provoquée par une petite variation dx | df = f'(x) dx.
- Sens de variation : le signe de f' donne la montée ou la descente | f' > 0 sur un intervalle ⇒ f strictement croissante ; f' < 0 ⇒ strictement décroissante.
- Extremum local : un sommet ou un creux | si f est dérivable et atteint un extremum en un point intérieur c, alors f'(c) = 0 ; c'est un extremum si f' change de signe en c.
- Règle de L'Hospital : pour une forme 0/0, on peut remplacer le quotient par le quotient des dérivées | si f(a) = g(a) = 0, lim f/g = lim f'/g' (quand cette dernière existe).
- Théorème de Rolle : un trajet qui revient au même niveau a forcément un moment « à plat » | f continue sur [a ; b], dérivable sur ]a ; b[, f(a) = f(b) ⇒ il existe c avec f'(c) = 0.
- Théorème des accroissements finis : la vitesse instantanée égale la vitesse moyenne à un certain moment | il existe c dans ]a ; b[ tel que f(b) − f(a) = (b − a)·f'(c).

## Méthodes
### Calculer un nombre dérivé avec la définition
1. Écris le taux d'accroissement (f(a + h) − f(a))/h.
2. Développe f(a + h) et simplifie le numérateur : un facteur h doit apparaître.
3. Simplifie par h, puis fais tendre h vers 0.

### Dériver une expression
1. Repère la structure principale : somme, produit, quotient ou composée.
2. Applique la règle correspondante, en nommant u et v (et u', v').
3. Pour une composée, dérive « l'extérieur » en gardant l'intérieur, puis multiplie par la dérivée de l'intérieur.
4. Simplifie le résultat.

### Écrire l'équation de la tangente en a
1. Calcule f(a) (le point de contact).
2. Calcule f'(a) (la pente).
3. Écris y = f(a) + f'(a)(x − a), puis développe en y = mx + p.

### Trouver un maximum ou un minimum
1. Exprime la quantité à optimiser en fonction d'une seule variable (utilise la contrainte pour éliminer l'autre).
2. Précise l'intervalle des valeurs possibles.
3. Dérive et résous f'(x) = 0.
4. Vérifie le changement de signe de f' (ou compare avec les valeurs aux bornes) et calcule la valeur optimale.

### Utiliser la règle de L'Hospital
1. Vérifie que la forme est bien 0/0 (ou ∞/∞).
2. Dérive le numérateur et le dénominateur séparément (ce n'est pas la dérivée du quotient !).
3. Calcule la limite du nouveau quotient ; si c'est encore 0/0, recommence.

### Trouver le c des accroissements finis
1. Calcule la pente moyenne (f(b) − f(a))/(b − a).
2. Calcule f'(x) et résous f'(c) = pente moyenne.
3. Garde seulement la solution c qui est strictement entre a et b.

## Exemples résolus
### Dérivée de f(x) = x³ avec la définition (TD 2, ex. 2.1)
- (x + h)³ − x³ = 3x²h + 3xh² + h³ — on développe et les x³ s'annulent.
- On divise par h : 3x² + 3xh + h².
- Quand h → 0, il reste 3x². Donc f'(x) = 3x².

### Dérivée de f(x) = √x avec la définition (TD 2, ex. 2.3)
- (√(x + h) − √x)/h : on multiplie par la quantité conjuguée √(x + h) + √x.
- Le numérateur devient (x + h) − x = h — la racine disparaît.
- Il reste 1/(√(x + h) + √x) → 1/(2√x).

### Tangente à y = x³ − 3x² − x + 5 en x₀ = 3 (TD 2, ex. 10.1)
- f(3) = 27 − 27 − 3 + 5 = 2 — point de contact (3 ; 2).
- f'(x) = 3x² − 6x − 1 donc f'(3) = 27 − 18 − 1 = 8 — pente.
- Tangente : y = 2 + 8(x − 3), soit y = 8x − 22.

### Dérivée de (x⁵ + 2x)/(x − 1) (TD 2, ex. 4.1)
- u = x⁵ + 2x, u' = 5x⁴ + 2 ; v = x − 1, v' = 1.
- (u'v − uv')/v² = ((5x⁴ + 2)(x − 1) − (x⁵ + 2x))/(x − 1)².
- On développe : (4x⁵ − 5x⁴ − 2)/(x − 1)².

### Dérivée de ln(cos x) (TD 2, ex. 4.11)
- C'est ln(u) avec u = cos x, et (ln u)' = u'/u.
- u' = −sin x, donc la dérivée vaut −sin x / cos x = −tan x.

### Dérivée de x^x (TD 2, ex. 6.2)
- On écrit x^x = e^(x ln x) — l'exposant variable impose de passer par l'exponentielle.
- (x ln x)' = ln x + 1 — règle du produit.
- Donc (x^x)' = (ln x + 1)·x^x.

### Rectangle d'aire maximale dans un demi-cercle de rayon 2 (TD 2, ex. 14)
- Le coin sur le cercle est (x ; √(4 − x²)) : aire A(x) = 2x√(4 − x²), x ∈ [0 ; 2].
- A'(x) = (8 − 4x²)/√(4 − x²) — dérivée d'un produit.
- A'(x) = 0 ⇔ x = √2, et A(√2) = 2√2 × √2 = 4. Aire maximale : 4.

### Limite par L'Hospital : lim(x→0) x sin x/(1 − cos x) (TD 2, ex. 11.5)
- Forme 0/0. Dérivées : (sin x + x cos x)/sin x — encore 0/0.
- On recommence : (2 cos x − x sin x)/cos x → 2/1 = 2.

### Accroissements finis pour f(x) = x − x³ sur [−2 ; 1] (TD 2, ex. 21)
- Pente moyenne : (f(1) − f(−2))/(1 − (−2)) = (0 − 6)/3 = −2.
- f'(c) = 1 − 3c² = −2 ⇔ c² = 1 ⇔ c = 1 ou c = −1.
- Seul c = −1 est strictement dans ]−2 ; 1[.

## Pièges fréquents
- Croire que (uv)' = u'v' → la bonne règle est u'v + uv'.
- Inverser l'ordre dans le quotient → c'est u'v − uv' (dans cet ordre), divisé par v².
- Oublier la dérivée de l'intérieur → (sin(3x))' = 3 cos(3x), pas cos(3x).
- Dériver xⁿ sans baisser l'exposant → (x⁵)' = 5x⁴, pas 5x⁵.
- Écrire (cos x)' = sin x → c'est −sin x.
- Appliquer L'Hospital en dérivant le quotient entier → on dérive le haut et le bas séparément, et seulement pour une forme 0/0 ou ∞/∞.
- Conclure « extremum » dès que f'(c) = 0 → x³ a une dérivée nulle en 0 sans extremum : vérifie le changement de signe.
- Oublier les bornes dans un problème d'optimisation → le maximum peut être au bord (TD 2, ex. 15 : l'aire est maximale quand tout le fil sert au carré).
- Dériver x^x comme une puissance (x·x^(x−1)) ou comme une exponentielle (x^x·ln x) → il faut les deux : x^x(ln x + 1).
- Confondre tangente et normale → la normale a pour pente −1/f'(a).

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Formule du taux d'accroissement de f entre a et a + h ? | (f(a + h) − f(a))/h : la « vitesse moyenne » de f. |
| Définition du nombre dérivé f'(a) ? | La limite du taux d'accroissement quand h → 0, si elle existe et est finie. |
| Que représente f'(a) sur la courbe ? | La pente de la tangente au point d'abscisse a. |
| Équation de la tangente en a ? | y = f(a) + f'(a)(x − a). |
| (xⁿ)' = ? | n·xⁿ⁻¹. |
| (√x)' = ? | 1/(2√x), pour x > 0. |
| (1/x)' = ? | −1/x². |
| (e^x)' et (ln x)' ? | (e^x)' = e^x et (ln x)' = 1/x. |
| (sin x)' et (cos x)' ? | (sin x)' = cos x et (cos x)' = −sin x. |
| (tan x)' = ? | 1 + tan²x, ou 1/cos²x. |
| (arctan x)' = ? | 1/(1 + x²). |
| (arcsin x)' = ? | 1/√(1 − x²). |
| Dérivée d'un produit uv ? | u'v + uv'. |
| Dérivée d'un quotient u/v ? | (u'v − uv')/v². |
| Dérivée de g(u(x)) ? | u'(x)·g'(u(x)) : dérivée de l'extérieur fois dérivée de l'intérieur. |
| (e^u)' et (ln u)' ? | (e^u)' = u'e^u et (ln u)' = u'/u. |
| (x^x)' = ? | x^x(ln x + 1), en écrivant x^x = e^(x ln x). |
| Que dit le signe de f' ? | f' > 0 : f croissante ; f' < 0 : f décroissante. |
| f'(c) = 0 suffit-il pour un extremum ? | Non : il faut que f' change de signe en c (contre-exemple x³ en 0). |
| Abscisse du sommet de ax² + bx + c ? | x = −b/(2a), là où la dérivée 2ax + b s'annule. |
| Règle de L'Hospital ? | Pour une forme 0/0 : lim f/g = lim f'/g', en dérivant haut et bas séparément. |
| Théorème de Rolle ? | f(a) = f(b), f continue et dérivable ⇒ f'(c) = 0 pour un c entre a et b. |
| Théorème des accroissements finis ? | f(b) − f(a) = (b − a)f'(c) pour un certain c dans ]a ; b[. |
| Différentielle de f ? | df = f'(x) dx : petite variation de f pour une petite variation dx. |
| Angle α de la tangente avec l'axe Ox ? | tan α = f'(a). |
| Pente de la normale en a ? | −1/f'(a), si f'(a) ≠ 0. |

## Exercices générables

### ch2-taux — Taux d'accroissement
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Variante A : « f(x) = x². Calcule le taux d'accroissement de f entre {a} et {a} + {h}. » Variante B : « f(x) = {m}x + {p}. Calcule le taux d'accroissement entre {a} et {a} + {h}. »
- Paramètres : a ∈ {−5, …, 5}, h ∈ {1, …, 4} ; m ∈ {−6, …, 6}, p ∈ {−9, …, 9}.
- Réponse : A : 2a + h. B : m.
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : 2a → confusion avec le nombre dérivé ; (a + h)² − a² → oubli de diviser par h ; (a + h)² → seulement f(a + h). B : m·h → oubli de diviser ; p → confusion pente / ordonnée à l'origine.
- Explication de la solution : A : « τ = (f({a} + {h}) − f({a}))/{h} = (({a+h})² − ({a})²)/{h} = ({(a+h)²} − {a²})/{h} = {2a+h}. » B : « Pour une droite, la sortie bouge de {m}×{h} quand l'entrée bouge de {h} : τ = {m}. »
- Inspiré de : TD dérivée-DL, ex. 2.

### ch2-puissance — Dériver a·xⁿ et évaluer
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : « f(x) = {a}x^{n}. Calcule f'({x0}). »
- Paramètres : a ∈ {1, …, 5}, n ∈ {2, …, 5}, x0 ∈ {−3, …, 3} (si n = 5, x0 ∈ {−2, …, 2}).
- Réponse : a·n·x0^(n − 1).
- Vérification : égalité exacte d'entiers.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a·n·x0^n → exposant non diminué ; a·x0^(n − 1) → oubli du facteur n ; a·x0^n → f(x0) au lieu de f'(x0) ; n·x0^(n − 1) → coefficient a oublié.
- Explication de la solution : « (xⁿ)' = n·xⁿ⁻¹, donc f'(x) = {a}×{n}·x^{n−1} = {a·n}x^{n−1}. En x = {x0} : {a·n}×({x0})^{n−1} = {réponse}. »
- Inspiré de : TD dérivée-DL, ex. 2.1, 2.4, 4.

### ch2-usuelles — Reconnaître une dérivée usuelle
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : « Quelle est la dérivée de f(x) = {F} ? »
- Paramètres : F tiré dans la table : sin x → cos x ; cos x → −sin x ; e^x → e^x ; ln x → 1/x ; √x → 1/(2√x) ; 1/x → −1/x² ; tan x → 1 + tan²x ; arctan x → 1/(1 + x²) ; arcsin x → 1/√(1 − x²) ; x^n (n ∈ {2, …, 6}) → n·x^(n−1).
- Réponse : l'expression associée dans la table.
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : sin x : −cos x, sin x, −sin x ; cos x : sin x, −cos x, cos x ; e^x : x·e^(x−1), ln x, e^x/x ; ln x : −1/x², e^x, 1/x² ; √x : 1/√x, 2√x, −1/(2√x) ; 1/x : 1/x², −1/x, ln x ; tan x : 1/cos x, −1/cos²x, 1 − tan²x ; arctan x : 1/(1 − x²), −1/(1 + x²), 1/√(1 − x²) ; arcsin x : −1/√(1 − x²), 1/(1 + x²), √(1 − x²) ; xⁿ : n·xⁿ, xⁿ⁻¹, (n − 1)·xⁿ⁻¹. Tirer 3 distracteurs dans la liste de la fonction choisie.
- Explication de la solution : « C'est une dérivée de référence à connaître : ({F})' = {réponse}. »
- Inspiré de : TD dérivée-DL, ex. 2 et 7.

### ch2-quotient — Dérivée d'un quotient en un point
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : « f(x) = ({a}x + {b}) / ({c}x + {d}). Calcule f'({x0}). »
- Paramètres : a, b, d ∈ {−5, …, 5} ; c ∈ {−3, …, −1, 1, …, 3} ; contrainte a·d − b·c ≠ 0 ; x0 ∈ {−3, …, 3} avec c·x0 + d ∈ {−3, −2, −1, 1, 2, 3} (dénominateur non nul et petit).
- Réponse : (a·d − b·c)/(c·x0 + d)² (fraction réduite).
- Vérification : égalité de fractions exactes ou décimal à 0,01 près.
- Distracteurs (QCM) ou erreurs typiques (numérique) : (b·c − a·d)/(c·x0 + d)² → ordre u'v − uv' inversé ; (a·d − b·c)/(c·x0 + d) → carré oublié ; a/c → « dérivée du haut sur dérivée du bas ».
- Explication de la solution : « u = {a}x + {b}, u' = {a} ; v = {c}x + {d}, v' = {c}. f' = (u'v − uv')/v² = ({a}({c}x + {d}) − {c}({a}x + {b}))/v² = ({ad − bc})/({c}x + {d})². En x = {x0} : {ad − bc}/({c·x0 + d})² = {réponse}. »
- Inspiré de : TD dérivée-DL, ex. 4.1, 4.2.

### ch2-composee — Dérivée d'une fonction composée
- Niveau : 2
- Forme : `qcm`
- Énoncé gabarit : « Quelle est la dérivée de f(x) = {G} ? »
- Paramètres : a ∈ {2, …, 9}, b ∈ {−9, …, 9}, n ∈ {2, …, 5} ; G tiré parmi : sin({a}x + {b}), cos({a}x + {b}), e^({a}x + {b}), ln({a}x + {b}), ({a}x + {b})^{n}, √({a}x + {b}).
- Réponse : sin → a·cos(ax + b) ; cos → −a·sin(ax + b) ; exp → a·e^(ax + b) ; ln → a/(ax + b) ; puissance → n·a·(ax + b)^(n−1) ; racine → a/(2√(ax + b)).
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : la même formule sans le facteur a → dérivée de l'intérieur oubliée ; mauvaise dérivée extérieure avec le facteur a (ex. −a·cos(ax + b), a·e^a, 1/(ax + b)·a·x) ; n·(ax + b)^(n−1) ; a·(ax + b)^n·n → exposant non diminué.
- Explication de la solution : « On pose u = {a}x + {b}, donc u' = {a}. Règle de la chaîne : (g(u))' = u'·g'(u). Ici g' = …, d'où {réponse}. »
- Inspiré de : TD dérivée-DL, ex. 4 (3, 4, 6, 9, 11, 12), 6.1, 9.

### ch2-tangente — Équation de la tangente
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : « f(x) = x² + {b}x + {c}. La tangente à la courbe en x = {x0} a pour équation y = mx + p. Variante A : que vaut m ? Variante B : que vaut p ? »
- Paramètres : b, c ∈ {−9, …, 9}, x0 ∈ {−4, …, 4}.
- Réponse : A : m = 2·x0 + b. B : p = c − x0².
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : f(x0) → valeur au lieu de pente ; 2x0 → b oublié. B : f(x0) → confond point de contact et ordonnée à l'origine ; f(x0) + f'(x0)·x0 → erreur de signe dans y = f(a) + f'(a)(x − a) ; c → tangente confondue avec la courbe en 0.
- Explication de la solution : « f({x0}) = {f(x0)} et f'(x) = 2x + {b}, donc f'({x0}) = {m}. Tangente : y = {f(x0)} + {m}(x − {x0}) = {m}x + ({f(x0)} − {m}×{x0}) = {m}x + {p}. »
- Inspiré de : TD dérivée-DL, ex. 3 et 10.

### ch2-extremum — Abscisse et valeur d'un extremum
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Variante A : « f(x) = {a}x² + {b}x + {c}. En quelle valeur de x la fonction atteint-elle son extremum ? » Variante B : « Même fonction : quelle est la valeur de cet extremum ? » Variante C : « f(x) = x³ − {3k²}x. En quelle valeur positive de x la dérivée s'annule-t-elle ? »
- Paramètres : a ∈ {−4, …, −1, 1, …, 4}, s ∈ {−5, …, 5}, b = −2·a·s (garantit un sommet entier), c ∈ {−9, …, 9} ; C : k ∈ {1, …, 4}.
- Réponse : A : s = −b/(2a). B : c − a·s². C : k.
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : b/(2a) → signe oublié ; −b/a → facteur 2 oublié. B : c → valeur en 0 ; c + a·s² → erreur de calcul de f(s). C : 3k² → coefficient au lieu de racine ; k² → racine carrée oubliée.
- Explication de la solution : A : « f'(x) = 2×{a}x + {b} = 0 ⇔ x = −{b}/(2×{a}) = {s}. f' change de signe en {s} : minimum si {a} > 0, maximum si {a} < 0. » B : « f({s}) = {a}×{s}² + {b}×{s} + {c} = {réponse}. » C : « f'(x) = 3x² − {3k²} = 3(x² − {k²}) = 0 ⇔ x = ±{k}. »
- Inspiré de : TD dérivée-DL, ex. 12, 21 ; TD fonctions-limites, ex. 30.1.

### ch2-optimisation — Petit problème d'optimisation
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Variante A : « On inscrit un rectangle dans le demi-cercle supérieur de rayon {R} (base sur le diamètre). Quelle est son aire maximale ? » Variante B : « Un cylindre est inscrit dans un cône de rayon de base {R} cm et de hauteur {H} cm. Quel rayon r (en cm) donne le plus grand volume ? » Variante C : « Un rectangle a un périmètre de {P} cm. Quelle est son aire maximale (en cm²) ? »
- Paramètres : A : R ∈ {1, …, 10}. B : R ∈ {3, 6, 9, …, 60}, H ∈ {3, …, 120} (H sert à la question bonus h = H/3, prendre H multiple de 3). C : P ∈ {4, 8, …, 40}.
- Réponse : A : R². B : r = 2R/3. C : P²/16.
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : R²/2 → demi-largeur prise pour largeur ; 2R² → aire du carré circonscrit ; π R²/2 → aire du demi-disque. B : R/2, R/3 → mauvaise racine de V'(r) = 0 ; R → cas extrême (volume nul). C : P²/4 → côté P au lieu de P/4 ; P/4 → côté au lieu d'aire.
- Explication de la solution : A : « Le coin est en (x ; √({R}² − x²)) : A(x) = 2x√({R}² − x²). A'(x) = 2({R}² − 2x²)/√({R}² − x²) = 0 ⇔ x = {R}/√2. A = 2 × ({R}/√2) × ({R}/√2) = {R}². » B : « Triangles semblables : h = {H}(1 − r/{R}). V(r) = πr²h = π{H}(r² − r³/{R}). V'(r) = π{H}(2r − 3r²/{R}) = 0 ⇔ r = 2{R}/3. » C : « Côtés x et {P}/2 − x : A(x) = x({P}/2 − x), A'(x) = {P}/2 − 2x = 0 ⇔ x = {P}/4 : c'est un carré, A = ({P}/4)². »
- Inspiré de : TD dérivée-DL, ex. 13, 14, 18.

### ch2-taf — Valeur c des accroissements finis
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Variante A : « f(x) = 1/x sur [{s²} ; {t²}]. Trouve le c de ]{s²} ; {t²}[ tel que f({t²}) − f({s²}) = ({t²} − {s²})·f'(c). » Variante B : « f(x) = x² + {q}x sur [{a} ; {b}]. Même question. »
- Paramètres : A : s, t ∈ {1, …, 6}, s < t. B : q ∈ {−9, …, 9}, a ∈ {−6, …, 4}, b = a + 2·j avec j ∈ {1, …, 4} (milieu entier).
- Réponse : A : c = s·t. B : c = (a + b)/2.
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : (s² + t²)/2 → réflexe « milieu » ; s² · t² → racine oubliée ; −s·t → mauvaise racine (hors intervalle). B : b − a → longueur au lieu du milieu ; a + b → division oubliée.
- Explication de la solution : A : « Pente moyenne : (1/{t²} − 1/{s²})/({t²} − {s²}) = −1/({s²}{t²}). f'(c) = −1/c², donc c² = {s²}×{t²} et c = {s}×{t} (positif, dans l'intervalle). » B : « Pente moyenne : (b² − a² + q(b − a))/(b − a) = a + b + q. f'(c) = 2c + q. Donc c = (a + b)/2. »
- Inspiré de : TD dérivée-DL, ex. 21, 22.

### ch2-hospital — Limites par L'Hospital
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Variante A : « Calcule lim(x→{a}) (x^{n} − {aⁿ}) / (x − {a}). » Variante B : « Calcule lim(x→0) (e^({p}x) − 1) / sin({q}x). » Variante C : « Calcule lim(x→0) x / tan({q}x). »
- Paramètres : A : a ∈ {1, 2, 3}, n ∈ {2, 3, 4}. B, C : p, q ∈ {−6, …, −1, 1, …, 6}.
- Réponse : A : n·aⁿ⁻¹. B : p/q. C : 1/q.
- Vérification : égalité exacte (fraction pour B et C).
- Distracteurs (QCM) ou erreurs typiques (numérique) : 0 → « 0/0 = 0 » ; 1 → « 0/0 = 1 » ; A : aⁿ → numérateur non dérivé ; n·aⁿ → exposant non diminué ; B : q/p → fraction renversée ; C : q → fraction renversée.
- Explication de la solution : « Forme 0/0. On dérive séparément le haut et le bas. A : (n·xⁿ⁻¹)/1 → {n}×{a}^{n−1}. B : ({p}e^({p}x))/({q}cos({q}x)) → {p}/{q}. C : 1/({q}(1 + tan²({q}x))) → 1/{q}. »
- Inspiré de : TD dérivée-DL, ex. 11 ; TD fonctions-limites, ex. 7.

---

# Chapitre : Développements limités
Source : `TD derivee et DL.pdf`, pages 19 à 44, exercices 24 à 45 (DL en 0, formule de Taylor-Young, opérations, DL en un point a, DL en ±∞ et asymptotes, application aux limites, tangente et position, prolongement). Complété par `TD fonction limites.pdf`, exercices 8.4, 8.7, 10 (limites retrouvées par DL).
Niveau visé : écrire de mémoire les DL usuels en 0, combiner des DL (somme, produit, composition, quotient), écrire un DL en un point a ou en +∞, et s'en servir pour calculer une limite, trouver une tangente et la position de la courbe, ou une asymptote oblique.
Prérequis : chapitre « Dérivées » (dérivées successives), chapitre « Fonctions et limites » (formes indéterminées), calcul avec les polynômes, factorielle n! = 1 × 2 × … × n.

## Explication pour un novice
Les polynômes (comme 1 + x + x²/2) sont les fonctions les plus simples : on les calcule avec des additions et des multiplications. Les fonctions comme e^x, sin x ou ln(1 + x) sont plus mystérieuses. L'idée du développement limité (DL) est de remplacer, près d'un point, une fonction compliquée par un polynôme qui lui ressemble beaucoup.

Analogie : de loin, la Terre est ronde ; mais dans ton jardin, elle paraît plate. La tangente (DL d'ordre 1) est cette approximation « plate ». Si tu veux mieux suivre la courbure, tu ajoutes un terme en x² (une parabole qui épouse la courbe), puis en x³, etc. Plus l'ordre est élevé, plus l'approximation est fidèle près du point.

Par exemple, près de 0 : e^x ≈ 1 + x + x²/2 + x³/6. Pour x = 0,1, ce polynôme donne 1,105167 alors que e^0,1 = 1,105171 : presque parfait ! L'erreur, notée o(x³), est « beaucoup plus petite que x³ » quand x est petit.

La formule de Taylor-Young dit comment trouver les coefficients : le coefficient de xᵏ est f⁽ᵏ⁾(0)/k!, où f⁽ᵏ⁾ est la k-ième dérivée. En pratique, on connaît par cœur une dizaine de DL usuels en 0, puis on les combine comme des polynômes (on additionne, on multiplie, on remplace x par autre chose) en jetant les termes trop petits.

À quoi ça sert ? À calculer des limites difficiles en un clin d'œil (par exemple (x − sin x)/x³ → 1/6), à trouver la tangente et à savoir si la courbe est au-dessus ou au-dessous, et, en posant x = 1/t, à trouver les asymptotes en l'infini.

## Notions (dans l'ordre d'apprentissage)
- Négligeable, o(xⁿ) : une quantité qui devient minuscule devant xⁿ quand x → 0 | g(x) = o(xⁿ) ⇔ g(x)/xⁿ → 0 ; on écrit aussi xⁿε(x) avec ε(x) → 0.
- Développement limité d'ordre n en 0 : un polynôme de degré ≤ n qui colle à f près de 0 | f(x) = a₀ + a₁x + … + aₙxⁿ + o(xⁿ) ; s'il existe, il est unique.
- Partie régulière : le polynôme du DL | a₀ + a₁x + … + aₙxⁿ ; a₀ = lim(x→0) f(x).
- Formule de Taylor-Young : les coefficients viennent des dérivées | si f est n fois dérivable en 0, aₖ = f⁽ᵏ⁾(0)/k!.
- DL usuels en 0 : à connaître par cœur | e^x = 1 + x + x²/2 + x³/6 + … + xⁿ/n! ; sin x = x − x³/6 + x⁵/120 ; cos x = 1 − x²/2 + x⁴/24 ; ln(1 + x) = x − x²/2 + x³/3 − x⁴/4 ; 1/(1 − x) = 1 + x + x² + x³ ; 1/(1 + x) = 1 − x + x² − x³ ; (1 + x)^α = 1 + αx + α(α − 1)x²/2 + … ; √(1 + x) = 1 + x/2 − x²/8 + x³/16 ; arctan x = x − x³/3.
- Parité et DL : une fonction paire n'a que des puissances paires dans son DL, une impaire que des puissances impaires | exemples : cos (paire), sin (impaire).
- Somme et produit de DL : on opère comme sur des polynômes, puis on tronque | on ne garde que les termes de degré ≤ n.
- Composition : remplacer x par une expression u(x) qui tend vers 0 | si u(x) → 0, on injecte u dans le DL de g et on développe.
- Quotient : on se ramène à 1/(1 + u) | 1/(1 + u) = 1 − u + u² − u³ + o(u³), ou division suivant les puissances croissantes.
- Intégration d'un DL : on intègre terme à terme | si f' = b₀ + b₁x + …, alors f = f(0) + b₀x + b₁x²/2 + … (ex. arctan à partir de 1/(1 + x²)).
- DL en un point a : on pose h = x − a | f(x) = f(a) + f'(a)(x − a) + f''(a)(x − a)²/2 + … + o((x − a)ⁿ).
- DL en +∞ (asymptotique) : on pose t = 1/x → 0 | f(x) = ax + b + c/x + o(1/x) ⇒ asymptote y = ax + b, position donnée par le signe de c/x.
- Tangente et position grâce au DL : | si f(x) = a₀ + a₁x + aₖxᵏ + o(xᵏ) (aₖ ≠ 0, premier terme non nul après x), la tangente est y = a₀ + a₁x et le signe de aₖxᵏ donne la position.
- Équivalent : quand f(x) ≈ c·xᵏ près de 0 | le premier terme non nul du DL est un équivalent de f ; il suffit pour une limite de quotient.

## Méthodes
### Écrire un DL usuel à un ordre donné
1. Écris le DL de référence jusqu'au degré demandé.
2. Ajoute « + o(xⁿ) » à la fin pour rappeler que la suite est négligeable.

### DL d'un produit ou d'une somme
1. Écris le DL de chaque facteur au même ordre n.
2. Multiplie (ou additionne) comme des polynômes.
3. Supprime tous les termes de degré > n.

### DL d'une composée g(u(x))
1. Vérifie que u(x) → 0 quand x → 0 (sinon, factorise d'abord).
2. Écris le DL de g(u) en puissances de u.
3. Remplace u par son DL, développe les puissances u², u³… en ne gardant que les degrés ≤ n.

### DL d'un quotient 1/(1 + u)
1. Écris le dénominateur sous la forme c(1 + u) avec u → 0.
2. Utilise 1/(1 + u) = 1 − u + u² − u³ + o(u³).
3. Remplace u et tronque. Variante : division suivant les puissances croissantes.

### Calculer une limite avec un DL
1. Développe le numérateur et le dénominateur jusqu'au premier terme non nul.
2. Garde ces termes dominants c·xᵏ et d·xᵐ.
3. Conclus : k = m → c/d ; k > m → 0 ; k < m → ±∞.

### DL en a ou en +∞
1. En a : pose h = x − a, réécris f en fonction de h, fais un DL en h = 0, puis remplace h par x − a.
2. En +∞ : pose t = 1/x, factorise par la puissance dominante de x, fais un DL en t = 0, puis remplace t par 1/x.
3. Pour une asymptote : écris f(x) = ax + b + c/x + o(1/x) ; l'asymptote est y = ax + b.

## Exemples résolus
### DL d'ordre 3 de sin x · cos(2x) (TD 2, ex. 24.3)
- sin x = x − x³/6 + o(x³) et cos(2x) = 1 − (2x)²/2 + o(x³) = 1 − 2x² + o(x³).
- Produit : (x − x³/6)(1 − 2x²) = x − 2x³ − x³/6 + (termes de degré 5).
- On tronque : x − (13/6)x³ + o(x³).

### DL d'ordre 4 de 1/(1 + x + x²) (TD 2, ex. 24.10)
- On pose u = x + x² → 0 et 1/(1 + u) = 1 − u + u² − u³ + u⁴.
- u² = x² + 2x³ + x⁴, u³ = x³ + 3x⁴ + …, u⁴ = x⁴ + … (degrés ≤ 4).
- Somme : 1 − x − x² + x² + 2x³ + x⁴ − x³ − 3x⁴ + x⁴ = 1 − x + x³ − x⁴ + o(x⁴).

### DL d'ordre 3 de arctan(x/(x + 2)) par intégration (TD 2, ex. 25.3)
- f'(x) = 1/(x² + 2x + 2) = 1/2 − x/2 + x²/4 + o(x²).
- On intègre terme à terme avec f(0) = 0 : f(x) = x/2 − x²/4 + x³/12 + o(x³).

### DL de ln x en 1 à l'ordre 4 (TD 2, ex. 32.5)
- On pose h = x − 1 : ln x = ln(1 + h).
- ln(1 + h) = h − h²/2 + h³/3 − h⁴/4 + o(h⁴).
- Donc ln x = (x − 1) − (x − 1)²/2 + (x − 1)³/3 − (x − 1)⁴/4 + o((x − 1)⁴).

### Limite lim(x→0) (x − x cos x)/(x − sin x) (TD 2, ex. 43.4)
- Haut : x − x(1 − x²/2) = x³/2 + o(x³).
- Bas : x − (x − x³/6) = x³/6 + o(x³).
- Quotient : (1/2)/(1/6) = 3.

### Tangente et position pour f(x) = √(1 + x + x²) en 0 (TD 2, ex. 28)
- u = x + x², √(1 + u) = 1 + u/2 − u²/8 + o(u²).
- 1 + (x + x²)/2 − x²/8 = 1 + x/2 + (3/8)x² + o(x²).
- Tangente : y = 1 + x/2. Comme (3/8)x² > 0, la courbe est au-dessus de la tangente près de 0.

### Asymptote de √(1 + x + x²) en +∞ (TD 2, ex. 28.3)
- Pour x > 0 : √(x² + x + 1) = x·√(1 + 1/x + 1/x²) ; on pose X = 1/x.
- Avec le DL précédent : x(1 + X/2 + (3/8)X² + …) = x + 1/2 + 3/(8x) + o(1/x).
- Asymptote : y = x + 1/2 ; 3/(8x) > 0 donc la courbe est au-dessus.

### Coefficient à partir de Taylor-Young (TD 2, ex. 25.1)
- Pour f(x) = arctan(x/(x + 2)) : f(0) = 0, f'(0) = 1/2, f''(0) = −1/2, f'''(0) = 1/2.
- Coefficients : f'(0) = 1/2, f''(0)/2! = −1/4, f'''(0)/3! = 1/12.
- On retrouve x/2 − x²/4 + x³/12.

## Pièges fréquents
- Oublier les factorielles → le coefficient de x³ dans e^x est 1/3! = 1/6, pas 1/3.
- Confondre les DL de ln(1 + x) et de e^x → ln(1 + x) a des coefficients 1/k avec signes alternés ; e^x a 1/k! tous positifs.
- Mélanger des ordres différents → si un facteur est développé à l'ordre 2, le produit n'est fiable qu'à l'ordre 2.
- Composer avec u qui ne tend pas vers 0 → pour e^(sin x) c'est bon (sin x → 0) ; pour ln(cos x), écris cos x = 1 + u avec u = −x²/2 + x⁴/24.
- Oublier les termes croisés dans un produit ou un carré → (x + x²)² = x² + 2x³ + x⁴, pas x² + x⁴.
- S'arrêter trop tôt pour une limite → pour (x − sin x)/x³, il faut aller jusqu'à x³ (l'ordre 1 donne 0/0).
- Mauvais signe en −∞ → avec t = 1/x < 0, √(x²) = |x| = −x : le TD trouve deux asymptotes différentes en +∞ et en −∞ (ex. 33.2, 40).
- Croire qu'un DL d'ordre 2 implique f''(0) existe → le TD montre le contraire (ex. 44, 45) : Taylor-Young est une condition suffisante, pas nécessaire.
- Garder des o( ) incohérents en divisant par x → diviser un o(x³) par x² donne o(x) : l'ordre baisse.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Idée d'un développement limité ? | Approcher une fonction près d'un point par un polynôme, avec une erreur négligeable. |
| Que signifie o(xⁿ) ? | Une quantité négligeable devant xⁿ : divisée par xⁿ, elle tend vers 0 quand x → 0. |
| Formule de Taylor-Young : coefficient de xᵏ ? | f⁽ᵏ⁾(0)/k!. |
| DL de e^x en 0 ? | 1 + x + x²/2 + x³/6 + … + xⁿ/n! + o(xⁿ). |
| DL de sin x en 0 ? | x − x³/6 + x⁵/120 + o(x⁵) : seulement des puissances impaires. |
| DL de cos x en 0 ? | 1 − x²/2 + x⁴/24 + o(x⁴) : seulement des puissances paires. |
| DL de ln(1 + x) en 0 ? | x − x²/2 + x³/3 − x⁴/4 + o(x⁴). |
| DL de 1/(1 − x) en 0 ? | 1 + x + x² + x³ + … + xⁿ + o(xⁿ). |
| DL de 1/(1 + x) en 0 ? | 1 − x + x² − x³ + o(x³) : signes alternés. |
| DL de (1 + x)^α en 0 ? | 1 + αx + α(α − 1)x²/2 + o(x²). |
| DL de √(1 + x) en 0 ? | 1 + x/2 − x²/8 + x³/16 + o(x³). |
| DL de arctan x en 0 ? | x − x³/3 + o(x³). |
| Coefficient de x² dans e^(ax) ? | a²/2. |
| Le terme constant d'un DL en 0 vaut ? | La limite de f en 0 (et f(0) si f est continue). |
| Comment faire le DL d'un produit ? | Multiplier les DL comme des polynômes, puis supprimer les termes de degré trop élevé. |
| Comment faire le DL de g(u(x)) ? | Vérifier u → 0, injecter le DL de u dans celui de g, tronquer. |
| Astuce pour un quotient 1/(1 + u) ? | 1 − u + u² − u³ + o(u³), avec u → 0. |
| Comment faire un DL en a ? | Poser h = x − a, faire un DL en h = 0, puis remplacer h par x − a. |
| Comment étudier f en +∞ avec un DL ? | Poser t = 1/x → 0 et développer en t. |
| Tangente en 0 à partir du DL ? | y = a₀ + a₁x (les deux premiers termes). |
| Position courbe/tangente avec le DL ? | Signe du premier terme non nul après a₁x : x² positif → courbe au-dessus. |
| Si ce premier terme est en x³ ? | La courbe traverse sa tangente : point d'inflexion. |
| lim(x→0) (x − sin x)/x³ ? | 1/6, car x − sin x = x³/6 + o(x³). |
| lim(x→0) (e^x − 1 − x)/x² ? | 1/2. |
| Asymptote si f(x) = ax + b + c/x + o(1/x) ? | La droite y = ax + b ; le signe de c/x donne la position. |
| Un DL d'ordre 2 garantit-il f''(0) ? | Non : x³sin(1/x) a un DL d'ordre 2 en 0 sans dérivée seconde. |

## Exercices générables

### ch3-coef-usuel — Coefficient d'un DL usuel en 0
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : « Dans le développement limité en 0 de {F}, quel est le coefficient de x^{k} ? »
- Paramètres : F ∈ {e^x, sin x, cos x, ln(1 + x), 1/(1 − x), 1/(1 + x), √(1 + x)} ; k ∈ {0, …, 4} (k ≤ 3 pour √(1 + x)).
- Réponse : e^x : 1/k! ; sin x : 0 si k pair, (−1)^((k−1)/2)/k! si k impair ; cos x : 0 si k impair, (−1)^(k/2)/k! si k pair ; ln(1 + x) : 0 si k = 0, (−1)^(k+1)/k sinon ; 1/(1 − x) : 1 ; 1/(1 + x) : (−1)^k ; √(1 + x) : 1, 1/2, −1/8, 1/16 pour k = 0, 1, 2, 3.
- Vérification : égalité de fractions exactes.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 1/k au lieu de 1/k! → confusion avec ln ; k! → factorielle au numérateur ; signe opposé → alternance oubliée ou mal placée ; non nul pour une puissance de mauvaise parité (sin, cos) → parité oubliée.
- Explication de la solution : « DL de référence : {F} = {DL écrit jusqu'à x⁴}. Le terme en x^{k} est {terme}, son coefficient est {réponse}. »
- Inspiré de : TD dérivée-DL, ex. 24 (solutions qui rappellent ces DL).

### ch3-eax — DL de e^(ax) en 0
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : « Dans le DL en 0 de e^({a}x), quel est le coefficient de x^{k} ? »
- Paramètres : a ∈ {−3, …, −1, 1, …, 3} ; k ∈ {1, 2, 3}.
- Réponse : a^k/k!.
- Vérification : égalité de fractions exactes.
- Distracteurs (QCM) ou erreurs typiques (numérique) : a/k! → puissance de a oubliée ; a^k → factorielle oubliée ; |a|^k/k! → signe perdu pour a < 0 et k impair.
- Explication de la solution : « On remplace x par {a}x dans e^u = 1 + u + u²/2 + u³/6 : le terme en x^{k} est ({a}x)^{k}/{k}! = ({a}^{k}/{k}!)x^{k}. »
- Inspiré de : TD dérivée-DL, ex. 32.3 (e^(2/x) = e^(2t)), 24.1 (e^(−x)).

### ch3-derivee-depuis-dl — Lire une dérivée dans un DL
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : « f admet le DL f(x) = {c0} + {c1}x + {c2}x² + {c3}x³ + o(x³). Que vaut f^({k})(0) ? » (afficher f'(0), f''(0) ou f'''(0)).
- Paramètres : c0, c1, c2, c3 ∈ {−6, …, 6}, c_k ≠ 0 ; k ∈ {1, 2, 3}.
- Réponse : k!·c_k (c1, 2·c2 ou 6·c3).
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : c_k → factorielle oubliée ; c_k/k! → formule appliquée à l'envers ; c0 → confusion avec f(0).
- Explication de la solution : « Taylor-Young : le coefficient de x^{k} vaut f^({k})(0)/{k}!. Donc f^({k})(0) = {k}! × {c_k} = {réponse}. »
- Inspiré de : TD dérivée-DL, ex. 25.1, 32.

### ch3-taylor-en-a — DL d'un polynôme ou de ln en un point a
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Variante A : « Dans le DL de f(x) = x^{n} au voisinage de {a}, quel est le coefficient de (x − {a})^{k} ? » Variante B : « Dans le DL de ln x au voisinage de 1, quel est le coefficient de (x − 1)^{k} ? »
- Paramètres : A : n ∈ {2, 3, 4}, a ∈ {−3, …, −1, 1, …, 3}, k ∈ {1, …, n}. B : k ∈ {1, …, 5}.
- Réponse : A : C(n, k)·a^(n − k), où C(n, k) = n!/(k!(n − k)!) (= f⁽ᵏ⁾(a)/k!). B : (−1)^(k+1)/k.
- Vérification : égalité exacte (fraction pour B).
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : f⁽ᵏ⁾(a) → division par k! oubliée ; a^(n−k) → coefficient binomial oublié ; C(n, k)·a^k → puissance de a mal placée. B : 1/k → signe oublié ; (−1)^k/k → alternance décalée ; 1/k! → confusion avec e^x.
- Explication de la solution : A : « On pose h = x − {a} : x^{n} = ({a} + h)^{n}. Par la formule du binôme (ou Taylor : f⁽ᵏ⁾({a})/{k}!), le coefficient de h^{k} est C({n}, {k})×{a}^{n−k} = {réponse}. » B : « On pose h = x − 1 : ln x = ln(1 + h) = h − h²/2 + h³/3 − h⁴/4 + h⁵/5 ; le coefficient de h^{k} est {réponse}. »
- Inspiré de : TD dérivée-DL, ex. 32.2, 32.3, 32.5.

### ch3-produit — Coefficient dans un DL de produit
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Variante A : « Quel est le coefficient de x² dans le DL en 0 de (1 + {a}x)·e^({b}x) ? » Variante B : « Quel est le coefficient de x³ dans le DL en 0 de sin x · cos({a}x) ? »
- Paramètres : A : a, b ∈ {−4, …, −1, 1, …, 4}. B : a ∈ {1, …, 5}.
- Réponse : A : b²/2 + a·b. B : −1/6 − a²/2.
- Vérification : égalité de fractions exactes.
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : b²/2 → terme croisé a·b oublié ; a·b → terme b²/2 oublié ; b² + a·b → factorielle oubliée. B : −1/6 → terme croisé oublié ; −a²/2 → terme en x³ de sin oublié ; −1/6 − a² → facteur 1/2 de cos oublié.
- Explication de la solution : A : « e^({b}x) = 1 + {b}x + ({b}²/2)x² + o(x²). On multiplie par (1 + {a}x) : les termes en x² viennent de 1 × ({b}²/2)x² et de {a}x × {b}x. Total : {b}²/2 + {a}{b}. » B : « sin x = x − x³/6 et cos({a}x) = 1 − ({a}²/2)x². Termes en x³ : x × (−{a}²/2)x² et (−x³/6) × 1. Total : −1/6 − {a}²/2. »
- Inspiré de : TD dérivée-DL, ex. 24.3, 24.4, 24.5.

### ch3-composition — DL d'une composée
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : « Quel est le coefficient de x² dans le DL en 0 de {G} ? », avec G tiré parmi : (A) ln(1 + {a}x) ; (B) √(1 + {a}x) ; (C) 1/(1 − {a}x) ; (D) √(1 + x + {b}x²) ; (E) ln(1 + {a}x²).
- Paramètres : a ∈ {−4, …, −1, 2, …, 4} ; b ∈ {−3, …, 3}.
- Réponse : A : −a²/2 ; B : −a²/8 ; C : a² ; D : b/2 − 1/8 ; E : a.
- Vérification : égalité de fractions exactes.
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : −a/2 → x remplacé mais pas élevé au carré ; a²/2 → signe oublié. B : −1/8 → coefficient a oublié ; −a/8. C : a → mauvaise puissance. D : b/2 → terme −u²/8 oublié (u² apporte x²) ; b/2 + 1/8 → signe. E : −a²/2 → on a traité ax² comme ax.
- Explication de la solution : « On pose u = … (u → 0), on écrit le DL de référence en u, puis on remplace u. Exemple D : u = x + {b}x², √(1 + u) = 1 + u/2 − u²/8 ; u² = x² + o(x²) ; coefficient de x² : {b}/2 − 1/8. »
- Inspiré de : TD dérivée-DL, ex. 24.2, 24.5, 26, 28.1.

### ch3-quotient — DL d'un inverse
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : « Dans le DL en 0 de 1/(1 + {a}x + {b}x²), quel est le coefficient de x² ? » (variante : coefficient de x, réponse −a).
- Paramètres : a ∈ {−4, …, 4}, b ∈ {−4, …, 4}, (a, b) ≠ (0, 0).
- Réponse : a² − b (variante : −a).
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : −b → terme u² oublié ; a² + b → signe de −u ; b − a² → signes inversés ; −a² − b → 1/(1 + u) écrit 1 − u − u².
- Explication de la solution : « On pose u = {a}x + {b}x² → 0. 1/(1 + u) = 1 − u + u² + o(u²). u² = {a}²x² + o(x²). Coefficient de x² : −{b} + {a}² = {réponse}. »
- Inspiré de : TD dérivée-DL, ex. 24.10, 24.11, 41.2.

### ch3-limite-dl — Calculer une limite avec un DL
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : une variante tirée au hasard : (A) lim(x→0) (e^({a}x) − 1 − {a}x)/x² ; (B) lim(x→0) (1 − cos({a}x))/x² ; (C) lim(x→0) ({a}x − sin({a}x))/x³ ; (D) lim(x→0) (ln(1 + {a}x) − {a}x)/x² ; (E) lim(x→0) (e^({a}x²) − cos({b}x))/x².
- Paramètres : a ∈ {1, …, 4} (C : a ∈ {1, 2, 3}) ; b ∈ {1, …, 4}.
- Réponse : A : a²/2 ; B : a²/2 ; C : a³/6 ; D : −a²/2 ; E : a + b²/2.
- Vérification : égalité de fractions exactes.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 0 → DL arrêté trop tôt (0/0 pris pour 0) ; a ou a/2 → puissance de a oubliée ; signe opposé en D ; E : a − b²/2 → signe du cos ; a + b² → facteur 1/2 oublié.
- Explication de la solution : « On développe le numérateur jusqu'au premier terme non nul. Exemple A : e^({a}x) = 1 + {a}x + ({a}²/2)x² + o(x²), donc le numérateur vaut ({a}²/2)x² + o(x²) et la limite est {a}²/2. »
- Inspiré de : TD dérivée-DL, ex. 26, 27, 43.3, 43.4, 43.5, 43.8 ; TD fonctions-limites, ex. 8.4, 8.7.

### ch3-position-tangente — Position de la courbe par rapport à sa tangente
- Niveau : 3
- Forme : `qcm`
- Énoncé gabarit : « Soit f(x) = e^({a}x) + {b}x². Près de x = 0, comment est la courbe de f par rapport à sa tangente en 0 ? »
- Paramètres : a ∈ {−3, …, −1, 1, …, 3}, b ∈ {−5, …, 5}. Si a²/2 + b = 0 (seulement pour a = ±2, b = −2), la réponse passe au cas « traverse ».
- Réponse : on calcule s = a²/2 + b. s > 0 → « au-dessus de la tangente » ; s < 0 → « au-dessous de la tangente » ; s = 0 → « elle traverse sa tangente (point d'inflexion) » (le terme suivant a³x³/6 change de signe avec x).
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : options fixes « au-dessus », « au-dessous », « elle la traverse », « elle est confondue avec sa tangente ». Erreurs typiques : regarder le signe de b seul (terme a²/2 oublié) ; regarder le signe de a (pente) au lieu du terme d'ordre 2.
- Explication de la solution : « DL : e^({a}x) = 1 + {a}x + ({a}²/2)x² + ({a}³/6)x³ + o(x³). Donc f(x) = 1 + {a}x + ({a}²/2 + {b})x² + … La tangente est y = 1 + {a}x et f(x) − (1 + {a}x) ≈ ({s})x². Ce terme est {signe} près de 0, donc la courbe est {réponse}. »
- Inspiré de : TD dérivée-DL, ex. 28.2, 29.1, 30.3.

### ch3-asymptote — Asymptote oblique en +∞
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : Variante A : « f(x) = √(x² + {b}x + {c}). En +∞, la courbe admet une asymptote y = x + p. Que vaut p ? » Variante B : « f(x) = (x² + {p}x + {q})/(x + {r}). En +∞, l'asymptote est y = x + m. Que vaut m ? »
- Paramètres : A : b ∈ {−9, …, −1, 1, …, 9}, c ∈ {−9, …, 9}. B : p, q ∈ {−9, …, 9}, r ∈ {−5, …, −1, 1, …, 5}.
- Réponse : A : b/2. B : p − r.
- Vérification : égalité de fractions exactes.
- Distracteurs (QCM) ou erreurs typiques (numérique) : A : b → racine oubliée (facteur 1/2) ; c/2 → mauvais terme ; 0 → asymptote prise pour y = x. B : p → division oubliée ; p + r → erreur de signe ; q/r → terme constant mal traité.
- Explication de la solution : A : « Pour x > 0 : √(x² + {b}x + {c}) = x√(1 + {b}/x + {c}/x²). Avec t = 1/x : x(1 + {b}t/2 + o(t)) = x + {b}/2 + o(1). Asymptote : y = x + {b}/2. » B : « Avec t = 1/x : f(x) = x(1 + {p}t + {q}t²)/(1 + {r}t) = x(1 + ({p} − {r})t + o(t)) = x + ({p} − {r}) + o(1). »
- Inspiré de : TD dérivée-DL, ex. 28.3, 33.5, 37, 40.

---

## Notes pour l'intégration

### Ce qui n'a pas pu être transformé en exercice générable (démonstrations, discussions, figures)
TD « Fonctions, limite, continuité » :
- Ex. 1.4 et 1.5 (inéquations avec racine et double valeur absolue) : solution sous forme d'union d'intervalles à bornes irrationnelles (0 ; 1 − √3/2 …) ; seule la variante simple est couverte par `ch1-inequation`.
- Ex. 2 (inégalités classiques (x + y)² ≥ 4xy, (a + b)(b + c)(c + a) ≥ 8abc…) : démonstrations, non vérifiables par une formule.
- Ex. 4.1, 5.3, 31.3 (tracer des graphes) et figures des pages 4 à 6, 18, 21, 27 : graphes non extraits ; seule la partie entière est couverte (`ch1-partie-entiere`). Les questions « période T » (ex. 4.2 et 5.4, T = 1) sont reprises en flashcard.
- Ex. 5.1 et 31.1, 31.5 (expression sans valeur absolue sur chaque intervalle) : réponse = une formule par morceaux ; possible en QCM futur (options : −3x + 3, −x + 3, x + 1, 3x − 3 pour |x| + |x − 1| + |x − 2|), non développé ici.
- Ex. 13.4 et 13.5 (limites trigonométriques avec formules d'addition, résultats 1/√2 et 1) : trop spécifiques pour un gabarit paramétré.
- Ex. 14 (fₘ,ₙ selon m et n) : discussion par cas (limite 1, 0, +∞ ou inexistante) ; pourrait devenir un QCM « m = n / m > n / m < n pair / impair », non développé.
- Ex. 15 (décomposition en éléments simples) : les coefficients A = 1/2, B = −3, C = 7/2 sont calculables, mais la technique sort du programme du chapitre ; non retenu.
- Ex. 16 et 17 (limites en physique : T(t) → Tₘ, v(t) → mg/µ) : interprétation, peu paramétrable ; peuvent servir d'exemples d'introduction.
- Ex. 20 (nature des discontinuités, « première espèce ») et 21, 22 (étude complète de continuité) : réponses rédigées ; couverts partiellement par `ch1-continuite-parametre` et `ch1-lim-0sur0`.
- Ex. 26, 27, 28 (x/|x|, sin(1/x), x sin(1/x) prolongeables ou non) : repris en flashcards uniquement.
- Ex. 25 et 30 (composition, réciproque de x² − 2x − 4 sur [1 ; +∞[, point A(4 ; 4)) : composition seulement en flashcard ; un exercice « calcule g(f(x₀)) » pourrait être ajouté facilement.
- Ex. 29 (fonctions hyperboliques : formules d'addition, argch, argsh, argth) : démonstrations ; une flashcard (cosh² − sinh² = 1).

TD « Dérivée, différentielle et Développement limité » :
- Ex. 1, 44, 45 (dérivabilité de x² sin(1/x), x³ sin(1/x)…) : raisonnements théoriques ; repris en piège et flashcard.
- Ex. 5 et 7 (démonstrations des formules (u^v)' et des dérivées de arcsin, arccos, arctan) : formules reprises en flashcards.
- Ex. 6 et 8 (dérivées de x^ln x, (sin x)^(sin x), arctan((x + 1)/√x)…) : réponses longues ; seul x^x est traité en exemple résolu. Un QCM avec ces fonctions précises (sans paramètres) pourrait être ajouté.
- Ex. 9 (différentielles) : même calcul que la dérivée suivi de « dx » ; couvert par `ch2-composee`.
- Ex. 10 (longueurs de la tangente, sous-tangente, normale, sous-normale) : vocabulaire et formules spécifiques non repris (seules la tangente et la pente de la normale le sont).
- Ex. 12 (vérifier le théorème de Rolle) : le cas y = x² − 3x + 2 sur [1 ; 2] (c = 3/2) est un cas particulier de `ch2-taf` variante B ; le cas cubique donne c = (√43 − 5)/3, irrationnel.
- Ex. 13, 15, 16, 17, 19, 20 (cylindre de 1 litre, fil carré + triangle, tracteur, cylindre dans une sphère, cornet, cône dans une sphère) : réponses irrationnelles (r = ∛(500/π) ≈ 5,42 cm, x = 2π√2/√3…) ou discussions ; possibles en numérique avec tolérance d'arrondi, mais non retenus pour garder des réponses « propres ».
- Ex. 22 et 23 (θ des accroissements finis, somme harmonique Sₙ ~ ln n) : démonstrations ; la limite θₕ → 1/2 et Sₙ/ln n → 1 pourraient devenir des flashcards.
- Ex. 24.7, 24.9, 24.11, 24.12, 25.2, 31, 34, 35, 38, 39, 41, 42 : DL longs (composition à plusieurs étages) ; utiles comme exemples résolus pour un niveau 4 éventuel, non paramétrés.
- Ex. 29 et 33.2, 40 (asymptotes différentes en +∞ et −∞) : couverts partiellement par `ch3-asymptote` (seulement en +∞).
- Ex. 43.11, 43.13, 43.14, 43.16 : limites en 1^∞ ou 0^0 traitées au cas par cas ; la famille (1 + 7/x)^x est couverte par `ch1-lim-puissance-e`.

### Erreurs et coquilles repérées dans les solutions du TD (à ne pas recopier)
- TD dérivée-DL, ex. 9.2 : la différentielle de arctan(x/a) est écrite dx/√(a² − x²) ; la bonne réponse est a·dx/(a² + x²).
- TD dérivée-DL, ex. 4.9 : « 3 cos x cos 5x² » doit se lire 3 cos(3x) cos(5x²) − 10x sin(3x) sin(5x²).
- TD dérivée-DL, ex. 10.2 : la longueur de la normale est donnée égale à 8√2·p ; avec les formules du TD, ℓ_N = |y₀|√(1 + f'(x₀)²) = 8p√(1 + 64p²).
- TD dérivée-DL, ex. 3.2 : f(x) = 1/x n'est pas définie en x₁ = 0, la « tangente en 0 » n'a pas de sens (la solution écrit f'(0) = −∞).
- TD dérivée-DL, ex. 29.2 : f(x) − 2x = −4/(3x) < 0 en +∞, donc la courbe est au-dessous de l'asymptote (la solution dit « au-dessus »).
- TD dérivée-DL, ex. 32.6 : f''(1) vaut −3/4 (la solution écrit 3/4 mais utilise bien −3/8 pour le coefficient) ; ex. 32.1 : « O((−2)⁴) » doit être O((x − 2)⁴).
- TD dérivée-DL, ex. 36 : ln x = ln 2 + (x − 2)/2 − (x − 2)²/8 + … (signe « + » erroné dans la solution ; la limite 1/14 reste juste).
- TD dérivée-DL, ex. 25.2 : arctan u = u − u³/3 (et non u³/3!) ; ex. 41.3 : coquille « 1/(46x³) » pour 1/(48x³) ; ex. 22 : « 2θh » pour 2aθh.
- TD fonctions-limites, ex. 3.2 et 3.4 : « f₁ » et « f₃ » à la place de f₂ et f₄ ; ex. 20.4 : la limite à gauche en 1 est notée « x → 1⁺ ».

### Remarques pour l'application
- Les DL et limites sont écrits avec des notations Unicode ; si l'application affiche du LaTeX, prévoir la conversion (`x²` → `x^2`, `√` → `\sqrt{}`, `o(x³)` → `o(x^3)`).
- Plusieurs gabarits ont des « variantes » (A, B, C…) : chaque variante peut être implémentée comme un sous-type indépendant de même niveau.
- Pour les réponses fractionnaires (`ch1-lim-remarquable` B, `ch1-lim-conjuguee`, `ch2-quotient`, `ch3-*`), accepter « 3/2 », « 1,5 » et « 1.5 ».
- Ordre d'apprentissage conseillé entre chapitres : Fonctions et limites → Dérivées → Développements limités (le chapitre DL réutilise la dérivée pour Taylor-Young et les limites pour les applications).
