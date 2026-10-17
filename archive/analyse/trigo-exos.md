# Trigonométrie — exercices générables
Source : Yvan Monka (maths-et-tiques.fr) — Ttrigt.pdf « Trigonométrie dans le triangle » (p. 1-5), Tct.pdf « Cercle trigonométrique » (p. 1-7), Tft.pdf « Fonctions trigonométriques » (p. 1-10).
Cours associé : peda/trigo.json (id `fa-an-b2`, section « Trigonométrie approfondie »).
Doublons évités : `b2-deg-rad` (degrés → radians), `b2-trigo-valeur` (valeurs de 0 à π/2) et `b2-periode` existent déjà dans analyse/cours-mva005.md ; les types ci-dessous les prolongent sans les répéter.

Conventions : π s'affiche « π » ; les fractions de π sont saisies sous la forme k·π/q quand c'est précisé ; les angles du triangle sont en degrés, ceux du cercle en radians.

## Exercices générables

### trig-choix-rapport — Choisir le bon rapport (CAH SOH TOA)
- Niveau : 1
- Forme : `qcm`
- Énoncé gabarit : Dans un triangle rectangle, tu connais un angle aigu et le côté {connu}. Tu cherches le côté {cherche}. Quel rapport utilises-tu ?
- Paramètres : {connu} et {cherche} distincts, tirés dans {opposé, adjacent, hypoténuse} (6 combinaisons).
- Réponse : {adjacent, hypoténuse} → cosinus ; {opposé, hypoténuse} → sinus ; {opposé, adjacent} → tangente.
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : les deux autres rapports → « confusion opposé / adjacent » ; « le théorème de Pythagore » → « Pythagore demande deux côtés, pas un angle et un côté ».
- Explication de la solution : CAH SOH TOA ; le rapport qui contient à la fois le côté {connu} et le côté {cherche} est le bon.
- Inspiré de : Ttrigt p. 4-5 (choix encadré « CAH SOH TOA »).

### trig-rapport — Calculer cos, sin ou tan dans un triangle
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Le triangle ABC est rectangle en C, avec BC = {o}, AC = {a} et AB = {h}. Calcule {f}(Â), arrondi au centième.
- Paramètres : (o ; a ; h) = m × un triplet pythagoricien tiré dans {(3 ; 4 ; 5), (4 ; 3 ; 5), (5 ; 12 ; 13), (12 ; 5 ; 13), (8 ; 15 ; 17), (15 ; 8 ; 17), (7 ; 24 ; 25)}, m ∈ {1, 2, 3} ; f ∈ {cos, sin, tan}.
- Réponse : cos → a/h ; sin → o/h ; tan → o/a.
- Vérification : |saisie − réponse| ≤ 0,005 (accepter aussi la fraction exacte).
- Distracteurs (QCM) ou erreurs typiques (numérique) : o/h pour cos et a/h pour sin → « confusion opposé / adjacent » ; a/o pour tan → « rapport inversé » ; h/a → « hypoténuse au numérateur ».
- Explication de la solution : par rapport à Â, l'hypoténuse est AB = {h}, le côté opposé BC = {o}, le côté adjacent AC = {a}. {f}(Â) = … = {réponse}.
- Inspiré de : Ttrigt p. 1 (exemple 5-12-13).

### trig-longueur — Calculer une longueur
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : (variante V) Dans un triangle rectangle, l'angle aigu mesure {α}° et {donnée} = {d} cm. Calcule {inconnue}, arrondi au centième.
- Paramètres : α entier de 15 à 75 ; d entier de 2 à 20 ou décimal à un chiffre. Variantes : V1 hypoténuse donnée, adjacent cherché ; V2 hypoténuse donnée, opposé cherché ; V3 opposé donné, hypoténuse cherchée ; V4 opposé donné, adjacent cherché.
- Réponse : V1 d·cos α ; V2 d·sin α ; V3 d / sin α ; V4 d / tan α (α converti en radians pour le calcul : α·π/180).
- Vérification : |saisie − réponse| ≤ 0,01.
- Distracteurs (QCM) ou erreurs typiques (numérique) : d·sin α en V1 / d·cos α en V2 → « mauvais rapport » ; d·sin α en V3 et d·tan α en V4 → « multiplier au lieu de diviser » ; même formule avec α lu en radians → « calculatrice en mode radian ».
- Explication de la solution : on choisit le rapport (CAH, SOH ou TOA) qui contient la donnée et l'inconnue, on écrit l'égalité puis on isole l'inconnue. Ex. V3 : sin {α}° = {d} / hyp, donc hyp = {d} / sin {α}° ≈ {réponse}.
- Inspiré de : Ttrigt p. 3 (JK = 6 × cos 53° ≈ 3,61) et p. 5 (AC = 3,4 / sin 29° ≈ 7,0).

### trig-angle — Calculer un angle
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Dans un triangle rectangle, pour l'angle aigu Â, {côté1} = {u} et {côté2} = {v}. Calcule Â en degrés, au dixième près.
- Paramètres : variante cos (adjacent u, hypoténuse v), sin (opposé u, hypoténuse v) ou tan (opposé u, adjacent v) ; u, v entiers de 1 à 15 avec u < v pour cos et sin (pas de contrainte pour tan).
- Réponse : arccos(u/v), arcsin(u/v) ou arctan(u/v), converti en degrés (× 180/π).
- Vérification : |saisie − réponse| ≤ 0,1.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 90 − réponse → « angle complémentaire (on a calculé l'autre angle aigu) » ; la valeur en radians → « mode radian » ; arccos à la place d'arcsin (ou l'inverse) → « mauvais rapport » ; arctan(v/u) → « rapport inversé ».
- Explication de la solution : {f}(Â) = {u}/{v}, donc Â = arc{f}({u}/{v}) ≈ {réponse}°. Contrôle : un angle aigu est entre 0° et 90°.
- Inspiré de : Ttrigt p. 2 (cos B̂ = 3/7, B̂ ≈ 64,6°) et p. 4 (tan Â = 3/7, Â ≈ 23°).

### trig-rad-deg — Radians vers degrés
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Convertis {p}π/{q} radians en degrés.
- Paramètres : q ∈ {2, 3, 4, 5, 6, 8, 9, 10, 12, 18} ; p entier de 1 à 2q, premier avec q.
- Réponse : 180·p/q
- Vérification : |saisie − réponse| ≤ 0,01 (réponses entières ou avec une décimale, ex. 67,5).
- Distracteurs (QCM) ou erreurs typiques (numérique) : 360·p/q → « confusion π = 360° » ; 90·p/q → « confusion π = 90° » ; p/q·π·(π/180) → « conversion dans le mauvais sens ».
- Explication de la solution : π rad = 180°, donc {p}π/{q} = {p} × 180/{q} = {réponse}°.
- Inspiré de : Tct p. 2-3 (3π/8 = 67,5°).

### trig-mesure-principale — Mesure principale d'un angle
- Niveau : 2
- Forme : `numerique`
- Énoncé gabarit : Donne la mesure principale de {n}π/{q}. Réponds par l'entier r tel que la mesure principale soit rπ/{q}.
- Paramètres : q ∈ {2, 3, 4, 6} ; n entier de −40 à 40, avec |n| > q (pour qu'il y ait au moins un tour à retirer).
- Réponse : r = n − 2q·⌈(n − q)/(2q)⌉ (unique entier de ]−q ; q] congru à n modulo 2q).
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : r + 2q quand r ≤ 0 → « intervalle [0 ; 2π[ au lieu de ]−π ; π] » ; n mod q → « on a retiré des demi-tours (π) au lieu de tours (2π) » ; −q pour n ≡ q → « borne −π incluse à tort ».
- Explication de la solution : un tour vaut 2{q}π/{q}. On retire autant de tours que nécessaire : {n}π/{q} = {k}×2π + {r}π/{q}, et {r}π/{q} est bien dans ]−π ; π].
- Inspiré de : Tct p. 6-7 (7π/4 → −π/4 ; 27π/4 → 3π/4).

### trig-valeur-cercle — Cosinus ou sinus d'un angle quelconque
- Niveau : 2
- Forme : `qcm`
- Énoncé gabarit : Que vaut {f}({k}π/{q}) ?
- Paramètres : f ∈ {cos, sin} ; q ∈ {6, 4, 3, 2} ; k entier de −24 à 24, non multiple de 2q (éviter les cas triviaux 0 trop fréquents), avec |k|/q > 1/2 pour sortir du premier quadrant.
- Réponse : la valeur exacte parmi {0, ±1/2, ±√2/2, ±√3/2, ±1} égale à Math.{f}(kπ/q).
- Vérification : choix unique ; côté générateur, sélectionner la forme exacte dont l'écart avec Math.{f}(kπ/q) est < 1e-9.
- Distracteurs (QCM) ou erreurs typiques (numérique) : l'opposé de la réponse (si non nulle) → « erreur de signe / mauvais quadrant » ; la valeur de l'autre fonction pour le même angle → « confusion sin / cos » ; la valeur de l'angle de référence avec l'autre racine (ex. √3/2 au lieu de 1/2) → « confusion π/6 / π/3 ».
- Explication de la solution : 1) mesure principale de {k}π/{q} ; 2) quadrant → signe ; 3) angle de référence dans [0 ; π/2] → valeur du tableau. Ex. cos(5π/4) = cos(π + π/4) = −√2/2.
- Inspiré de : Tct p. 5-6 (placer 9π/4, 8π/3, −9π/2) et Tft p. 2 (tableau des valeurs remarquables).

### trig-nb-solutions — Nombre de solutions sur un tour
- Niveau : 1
- Forme : `numerique`
- Énoncé gabarit : Combien l'équation {f}(x) = {c} a-t-elle de solutions dans [0 ; 2π[ ?
- Paramètres : f ∈ {cos, sin} ; c ∈ {−3/2, −1, −√3/2, −1/2, 0, 1/2, √2/2, 1, 1,3, 2}.
- Réponse : 0 si |c| > 1 ; 1 si c = 1 ou c = −1 ; 2 sinon.
- Vérification : égalité exacte.
- Distracteurs (QCM) ou erreurs typiques (numérique) : 1 au lieu de 2 → « deuxième solution oubliée » ; 2 au lieu de 1 pour c = ±1 → « point de tangence compté deux fois » ; un nombre non nul pour |c| > 1 → « oubli de −1 ≤ cos, sin ≤ 1 » ; « une infinité » → « confusion avec la résolution dans ℝ ».
- Explication de la solution : on trace la droite {horizontale y = c pour sin / verticale x = c pour cos} : elle coupe le cercle en 0, 1 ou 2 points selon que |c| > 1, |c| = 1 ou |c| < 1.
- Inspiré de : Tft p. 2-3 (méthode « Résoudre une équation trigonométrique ») ; Ttrigt p. 2 (cos D̂ = 1,3 impossible).

### trig-equation — Résoudre cos x = c ou sin x = c sur ]−π ; π]
- Niveau : 3
- Forme : `qcm`
- Énoncé gabarit : Résous dans ]−π ; π] l'équation {f}(x) = {c}.
- Paramètres : f ∈ {cos, sin} ; c ∈ {1/2, −1/2, √2/2, −√2/2, √3/2, −√3/2}.
- Réponse : cos : a = arccos c, S = {−a ; a}. sin : a = arcsin c ; si c > 0, S = {a ; π − a} ; si c < 0, S = {−π − a ; a}. (Ex. cos x = −1/2 → {−2π/3 ; 2π/3} ; sin x = −1/2 → {−5π/6 ; −π/6}.)
- Vérification : choix unique ; contrôle générateur : chaque élément s de S vérifie |Math.{f}(s) − c| < 1e-9 et −π < s ≤ π.
- Distracteurs (QCM) ou erreurs typiques (numérique) : {a} seul → « deuxième solution oubliée » ; pour cos : {a ; π − a} → « règle du sinus appliquée au cosinus » ; pour sin : {a ; −a} → « règle du cosinus appliquée au sinus » ; pour sin et c < 0 : {a ; π − a} → « solution hors de ]−π ; π] ».
- Explication de la solution : on écrit {c} = {f}(a) avec a = {a}. Pour cos : x = a + 2kπ ou x = −a + 2kπ ; pour sin : x = a + 2kπ ou x = π − a + 2kπ. On garde les valeurs de ]−π ; π].
- Inspiré de : Tft p. 2-3 (cos² x = 1/2 ; sin x = √3/2 dans [−π ; π]).

### trig-inequation — Inéquation sur un tour
- Niveau : 3
- Forme : `qcm`
- Énoncé gabarit : Résous dans {I} l'inéquation {f}(x) {op} {c}.
- Paramètres : c ∈ {1/2, √2/2, √3/2}. Quatre cas :
  - cos x ≥ c sur ]−π ; π] : a = arccos c ;
  - cos x ≤ c sur ]−π ; π] : a = arccos c ;
  - sin x ≥ c sur [−π ; π] : a = arcsin c ;
  - sin x ≤ c sur [−π ; π] : a = arcsin c.
- Réponse : cos ≥ → [−a ; a] ; cos ≤ → ]−π ; −a] ∪ [a ; π] ; sin ≥ → [a ; π − a] ; sin ≤ → [−π ; a] ∪ [π − a ; π]. (Ex. sin x ≤ √3/2 → [−π ; π/3] ∪ [2π/3 ; π].)
- Vérification : choix unique ; contrôle générateur : tester 200 points de I, chaque point vérifie l'inéquation si et seulement s'il est dans l'ensemble proposé.
- Distracteurs (QCM) ou erreurs typiques (numérique) : l'ensemble complémentaire → « sens de l'inégalité inversé » ; [a ; π − a] pour sin ≤ → « arc du haut au lieu du bas » ; [−a ; a] pour un sinus → « règle du cosinus appliquée au sinus » ; crochets ouverts → « inégalité large traitée comme stricte ».
- Explication de la solution : on résout d'abord l'équation {f}(x) = {c} (solutions … ), puis on lit sur le cercle l'arc où {f}(x) {op} {c} ({sous / au-dessus de} la droite horizontale pour sin, {à droite / à gauche de} la droite verticale pour cos).
- Inspiré de : Tft p. 3 (sin x ≤ √3/2 sur [−π ; π]).

### trig-derivee — Dériver A cos(ax + b) ou A sin(ax + b)
- Niveau : 2
- Forme : `qcm`
- Énoncé gabarit : Soit f(x) = {A} {g}({a}x + {b}). Quelle est f′(x) ?
- Paramètres : g ∈ {cos, sin} ; A ∈ {−3, −2, −1, 1, 2, 3} ; a entier de 2 à 5 ; b entier de 0 à 5.
- Réponse : g = cos → −A·a sin(ax + b) ; g = sin → A·a cos(ax + b).
- Vérification : choix unique.
- Distracteurs (QCM) ou erreurs typiques (numérique) : signe opposé → « cos′ = sin au lieu de −sin » ; facteur a oublié (A {g′}(ax + b)) → « dérivée de la fonction intérieure oubliée » ; même fonction (A·a {g}(ax + b)) → « on n'a pas changé cos en sin ».
- Explication de la solution : (cos(ax + b))′ = −a sin(ax + b) et (sin(ax + b))′ = a cos(ax + b) ; on multiplie par la constante {A}.
- Inspiré de : Tft p. 7 (tableau des dérivées) et p. 9 (f′(x) = −2 sin(2x)).

### trig-duplication — sin 2x et cos 2x (complément hors documents)
- Niveau : 3
- Forme : `numerique`
- Énoncé gabarit : x est un angle de ]0 ; π/2[ tel que sin x = {p}/{r} et cos x = {q}/{r}. Calcule {g}(2x), arrondi au millième.
- Paramètres : (p ; q ; r) ∈ {(3 ; 4 ; 5), (4 ; 3 ; 5), (5 ; 12 ; 13), (12 ; 5 ; 13), (8 ; 15 ; 17), (15 ; 8 ; 17), (7 ; 24 ; 25), (20 ; 21 ; 29)} ; g ∈ {sin, cos}.
- Réponse : sin 2x = 2pq/r² ; cos 2x = (q² − p²)/r².
- Vérification : |saisie − réponse| ≤ 0,001 (accepter la fraction exacte).
- Distracteurs (QCM) ou erreurs typiques (numérique) : 2p/r → « sin 2x = 2 sin x » ; (p² − q²)/r² → « signe inversé dans cos² − sin² » ; 2q/r → « cos 2x = 2 cos x ».
- Explication de la solution : sin 2x = 2 sin x cos x = 2 × {p}/{r} × {q}/{r} ; cos 2x = cos² x − sin² x = ({q}² − {p}²)/{r}². Contrôle : sin²(2x) + cos²(2x) = 1.
- Inspiré de : aucun exercice des documents (formules de duplication absentes des PDF) ; prolongement de Tft p. 9 (fonction cos 2x).

## Notes pour l'intégration
- **Lecture** : les trois PDF ont été lus en entier (Ttrigt 5 pages, Tct 7 pages, Tft 10 pages). L'extraction texte est partiellement brouillée (symboles mathématiques remplacés par des « � ») ; le contenu a été reconstitué à partir des images de pages, toutes lisibles.
- **Figures non reprises** : triangles annotés (Ttrigt p. 1-5), enroulement de la droite sur le cercle (Tct p. 2), cercles avec points placés (Tct p. 3-6, Tft p. 1-3), courbes de cos et sin (Tft p. 4-5, 8), complétion graphique d'une fonction impaire π-périodique (Tft p. 6-7), courbe de cos 2x − 1/2 (Tft p. 10). Le widget `wCircle` existant couvre une partie de ce besoin ; un tracé interactif « placer kπ/q sur le cercle » servirait trig-mesure-principale et trig-valeur-cercle.
- **Exercices non rendus vérifiables** : démonstrations de parité et de périodicité (Tft p. 6, 9), compléter un graphique (Tft p. 6-7), tracer une courbe (Tft p. 10) : repris dans le cours (marches 7-8), pas en exercices.
- **Liens vidéo YouTube** présents à chaque méthode : non repris.
- **Contenu absent des documents** : formules d'addition, de duplication, linéarisation, somme-produit, formules en tan(x/2), fonctions réciproques au sens de l'analyse. Elles figurent dans la marche 9 et le tableau « Complément » de trigo.json, signalées comme hors documents, et dans l'exercice trig-duplication.
- **Errata et imprécisions repérés** :
  - Ttrigt p. 2 : « Le cosinus est inférieur à 1 » → il faut « inférieur ou égal à 1 » (et, pour un angle aigu d'un triangle rectangle, strictement compris entre 0 et 1).
  - Ttrigt p. 2 : on demande l'arrondi au millième, mais cos 20° est donné « ≈ 0,94 » (au millième : 0,940).
  - Ttrigt p. 5 : on demande AC au dixième, le résultat est écrit « ≈ 7 cm » (au dixième : 7,0 cm ; valeur 7,01…).
  - Ttrigt p. 1 : « Le cosinus est un nombre compris entre 0 et 1 » n'est vrai que dans le triangle rectangle ; sur le cercle (Tft), il est entre −1 et 1. À expliciter pour éviter une contradiction apparente (fait dans la marche 5).
  - Ttrigt p. 3 et 5 : écriture « 6 × cos(53°) : 1 » et « 3,4 × 1 : sin(29°) » (produit en croix mécanique) ; reformulé en « 6 cos 53° » et « 3,4 / sin 29° ».
  - Tct p. 4 : coquille « Cela qui donne ».
  - Tct p. 1 : l'attribution à Regiomontanus de « l'usage systématique du terme sinus » est donnée au conditionnel par l'auteur ; le mot sinus vient des traductions latines de l'arabe au XIIᵉ siècle. Non reprise telle quelle dans l'histoire.
  - Aucun calcul faux trouvé : 33° = 11π/60, 3π/8 = 67,5°, 27π/4 → 3π/4, cos² x = 1/2 → π/4 + kπ/2, sin x ≤ √3/2 → [−π ; π/3] ∪ [2π/3 ; π], f(π/2) = −3/2, arccos(3/7) ≈ 64,6°, arctan(3/7) ≈ 23,2°, 6 cos 53° ≈ 3,61 ont tous été vérifiés.
- **Droits** : les trois documents portent la mention de copyright d'Yvan Monka (reproduction interdite hors cadre de la classe). Le contenu de trigo.json est entièrement reformulé ; seuls les exemples numériques (énoncés de calcul) sont repris.
