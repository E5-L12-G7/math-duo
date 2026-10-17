# Chapitre : Trigonométrie dans le triangle rectangle
Source : Ttrigt.pdf « Trigonométrie dans le triangle » (Yvan Monka), p. 1-5 : vocabulaire, cosinus, calculatrice (cos et arccos), calcul d’un angle (cos B̂ = 3/7), calcul d’une longueur (JK = 6 cos 53°), formules CAH SOH TOA, angle par la tangente (tan Â = 3/7), longueur par le sinus dans un triangle avec hauteur (AC = 3,4 / sin 29°).
Niveau visé : Nommer les côtés d’un triangle rectangle par rapport à un angle aigu, choisir le bon rapport (cosinus, sinus ou tangente) et calculer une longueur ou un angle, y compris en enchaînant deux triangles.
Prérequis : triangle rectangle, théorème de Pythagore, produit en croix, utiliser une calculatrice.

## Explication pour un novice
Tu veux connaître la hauteur d’un arbre sans y grimper, ou la longueur d’une rampe dont tu connais la pente. Tu sais mesurer une distance au sol et un angle de visée, mais pas la hauteur. Il te faut un pont entre les **angles** et les **longueurs** : c’est exactement le rôle de la trigonométrie (le mot veut dire « mesure des triangles »).

L’idée clé est simple. Deux triangles rectangles qui ont le même angle aigu ont la même forme : l’un est un agrandissement de l’autre, comme deux photos d’une même rampe prises de plus ou moins près. Leurs côtés sont donc **proportionnels**, et les **rapports** entre deux côtés ne dépendent que de l’angle. On a donné un nom à ces rapports : cosinus, sinus et tangente.

Pour les utiliser, il faut d’abord bien nommer les côtés. L’**hypoténuse** est le côté en face de l’angle droit : c’est toujours le plus long. Par rapport à un angle aigu choisi, le **côté opposé** est celui qui lui fait face, et le **côté adjacent** est celui qui le touche sans être l’hypoténuse. Attention : opposé et adjacent changent quand tu changes d’angle, l’hypoténuse jamais.

Ensuite viennent trois formules, résumées par le moyen mnémotechnique « CAH SOH TOA » : Cosinus = Adjacent / Hypoténuse, Sinus = Opposé / Hypoténuse, Tangente = Opposé / Adjacent. Avec un angle et un côté, on trouve un autre côté ; avec deux côtés, on trouve l’angle grâce aux touches arccos, arcsin, arctan de la calculatrice (souvent notées cos⁻¹, sin⁻¹, tan⁻¹), réglée en **degrés**.

Enfin, un réflexe de bon sens : l’hypoténuse est le plus grand côté, donc un cosinus ou un sinus d’angle aigu est toujours strictement entre 0 et 1. Si tu trouves cos Â = 1,3, ce n’est pas un angle bizarre : c’est une erreur.

## Notions (dans l'ordre d'apprentissage)
- Hypoténuse : le côté en face de l’angle droit, le plus long du triangle rectangle. | Dans ABC rectangle en B, l’hypoténuse est `[AC]`.
- Côté opposé : par rapport à un angle aigu, le côté qui lui fait face. | Dans ABC rectangle en B, le côté opposé à Â est `[BC]`.
- Côté adjacent : par rapport à un angle aigu, le côté qui le touche et qui n’est pas l’hypoténuse. | Dans ABC rectangle en B, le côté adjacent à Â est `[AB]`.
- Cosinus : rapport adjacent sur hypoténuse. | `cos(angle) = adjacent / hypoténuse`
- Sinus : rapport opposé sur hypoténuse. | `sin(angle) = opposé / hypoténuse`
- Tangente : rapport opposé sur adjacent. | `tan(angle) = opposé / adjacent`
- Rapport sans unité : un cosinus, un sinus ou une tangente est un quotient de deux longueurs, donc un nombre sans unité. | Pour un angle aigu : `0 < cos < 1` et `0 < sin < 1`, la tangente est positive et peut dépasser 1.
- Fonctions réciproques de la calculatrice : arccos, arcsin, arctan donnent l’angle connaissant le rapport. | `cos Â = 3/7 ⟺ Â = arccos(3/7) ≈ 64,6°` (mode degré)

## Méthodes
### Calculer une longueur
1. Repère l’angle droit, puis l’hypoténuse (en face).
2. Par rapport à l’angle connu, nomme le côté connu et le côté cherché (opposé, adjacent ou hypoténuse).
3. Choisis le rapport qui contient ces deux côtés : CAH, SOH ou TOA.
4. Écris l’égalité avec les noms des côtés, remplace par les valeurs connues.
5. Isole l’inconnue : si elle est au numérateur, on multiplie ; si elle est au dénominateur, on divise.
6. Calcule en mode degré et n’arrondis qu’à la fin.

### Calculer un angle
1. Nomme les deux côtés connus par rapport à l’angle cherché.
2. Choisis le rapport qui les contient (CAH, SOH ou TOA).
3. Écris le rapport sous forme de fraction : par exemple `tan Â = 3/7`.
4. Utilise arccos, arcsin ou arctan en mode degré.
5. Contrôle : un angle aigu est strictement entre 0° et 90°.

### Enchaîner deux triangles
1. Cherche un triangle rectangle où tu connais un angle et un côté, et qui contient le côté cherché.
2. Calcule ce côté, en gardant la valeur exacte dans la calculatrice.
3. Utilise-le dans le second triangle comme côté connu.

## Exemples résolus
### Le triangle ABC est rectangle en A, AB = 12, AC = 5 et BC = 13. Calcule cos B̂.
- L’hypoténuse est [BC] = 13 — elle est en face de l’angle droit en A.
- Par rapport à B̂, le côté adjacent est [BA] = 12 — il touche B̂ sans être l’hypoténuse.
- `cos B̂ = BA / BC = 12/13 ≈ 0,92` — CAH.
### Triangle ABC rectangle en A, BA = 3 et BC = 7. Calcule B̂ au dixième de degré.
- [BA] est adjacent à B̂, [BC] est l’hypoténuse — on utilise le cosinus.
- `cos B̂ = 3/7` — on écrit le rapport.
- `B̂ = arccos(3/7) ≈ 64,6°` — calculatrice en mode degré.
### Triangle IJK rectangle en K, JI = 6 cm et Ĵ = 53°. Calcule JK au centième.
- [JI] est l’hypoténuse, [JK] est adjacent à Ĵ — on utilise le cosinus.
- `cos 53° = JK / 6` — l’inconnue est au numérateur.
- `JK = 6 × cos 53° ≈ 3,61` cm — on multiplie.
### Triangle ABC rectangle en C, AC = 7 cm et BC = 3 cm. Calcule Â au degré près.
- [BC] est opposé à Â, [AC] est adjacent — on utilise la tangente (TOA).
- `tan Â = 3/7` — on écrit le rapport.
- `Â = arctan(3/7) ≈ 23°` — mode degré.
### ABC rectangle en C, H pied de la hauteur issue de C, HC = 3,4 cm et Â = 29°. Calcule AC au dixième.
- Dans le triangle AHC rectangle en H, [HC] est opposé à Â et [AC] est l’hypoténuse — on utilise le sinus.
- `sin 29° = 3,4 / AC` — l’inconnue est au dénominateur.
- `AC = 3,4 / sin 29° ≈ 7,0` cm — on divise.

## Pièges fréquents
- Prendre le côté opposé pour le côté adjacent → nomme les côtés par rapport à l’angle utilisé, et recommence si tu changes d’angle.
- Calculer avec la calculatrice en mode radian → en géométrie du triangle, vérifie que DEG est affiché (cos 60 doit donner 0,5).
- Multiplier alors que l’inconnue est au dénominateur → écris d’abord l’égalité complète, puis fais un produit en croix.
- Trouver l’autre angle aigu → les deux angles aigus font 90° à eux deux ; vérifie quel angle est demandé.
- Accepter un cosinus ou un sinus supérieur à 1 → c’est impossible pour un angle aigu : cherche l’erreur (rapport inversé).
- Appliquer le cosinus à l’angle droit → les rapports ne s’utilisent qu’avec un angle aigu.
- Arrondir trop tôt dans un calcul en deux étapes → garde la valeur exacte en mémoire dans la calculatrice.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu’est-ce que l’hypoténuse ? | Le côté en face de l’angle droit, le plus long. |
| Que signifie CAH SOH TOA ? | cos = adj/hyp, sin = opp/hyp, tan = opp/adj. |
| Que vaut cos d’un angle aigu ? | Adjacent / hypoténuse, entre 0 et 1. |
| Quel rapport si on connaît opposé et adjacent ? | La tangente. |
| Quel mode de calculatrice dans le triangle ? | Le mode degré (DEG). |
| Inconnue au dénominateur : multiplier ou diviser ? | Diviser : hyp = opp / sin α. |
| cos Â = 1,3 est-il possible ? | Non : l’adjacent serait plus long que l’hypoténuse. |

## Notes pour l'intégration
- Figures des documents reproduites par des schémas SVG simplifiés (triangle de forme fixe, non à l’échelle).
- Coquilles des sources : Ttrigt p. 2 « Le cosinus est inférieur à 1 » (il faut « inférieur ou égal », et strictement pour un angle aigu) ; cos 20° donné « ≈ 0,94 » alors que l’arrondi au millième est demandé (0,940) ; Ttrigt p. 5 « AC ≈ 7 cm » au lieu de 7,0 cm au dixième.

# Chapitre : Cercle trigonométrique et radians
Source : Tct.pdf « Cercle trigonométrique » (Yvan Monka), p. 1-7 : histoire, sens direct, cercle trigonométrique, enroulement de la droite, radian, correspondance degrés-radians (33° = 11π/60, 3π/8 = 67,5°), lecture et placement de points (5π/4, −3π/4, 9π/4, 8π/3, −9π/2), mesure principale (7π/4 → −π/4, 27π/4 → 3π/4).
Niveau visé : Convertir degrés et radians, placer et lire un point du cercle trigonométrique associé à un réel, reconnaître les réels associés au même point et donner la mesure principale d’un angle.
Prérequis : périmètre d’un cercle, proportionnalité, fractions, repère orthonormé.

## Explication pour un novice
Dans un triangle rectangle, un angle aigu reste entre 0° et 90°. Mais une roue tourne de 120°, de 270°, fait plusieurs tours, dans un sens ou dans l’autre. Pour décrire ces rotations, il faut quitter le triangle et passer au **cercle**.

On choisit le cercle le plus simple possible : centre O, rayon 1, dans un repère orthonormé. C’est le **cercle trigonométrique**. On convient de tourner dans le **sens direct** (ou positif, ou trigonométrique) : le sens inverse des aiguilles d’une montre. On part toujours du point de coordonnées (1 ; 0).

Imagine maintenant une droite graduée, tangente au cercle en ce point de départ, que tu enroules autour du cercle comme un mètre ruban. Chaque nombre réel x vient se poser sur un point M du cercle, et la longueur de l’arc parcouru vaut exactement x. Un nombre négatif s’enroule dans l’autre sens. C’est l’**enroulement de la droite** : il associe à **tout** réel un point du cercle.

Comme le cercle a un rayon 1, son périmètre vaut 2π. Un tour complet correspond donc au nombre 2π : c’est la naissance du **radian**, l’unité d’angle qui mesure un angle par la longueur de l’arc qu’il découpe sur ce cercle. Un tour = 360° = 2π rad, un demi-tour = 180° = π rad. Les conversions se font par proportionnalité.

Dernière idée : puisqu’un tour complet ramène au même endroit, un point du cercle a une infinité de « noms » : x, x + 2π, x − 2π, x + 4π… Parmi eux, on en choisit un, rangé dans ]−π ; π] : la **mesure principale**.

## Notions (dans l'ordre d'apprentissage)
- Sens direct : le sens inverse des aiguilles d’une montre, aussi appelé sens positif ou trigonométrique. | Sens indirect = sens des aiguilles d’une montre.
- Cercle trigonométrique : cercle de centre O et de rayon 1 dans un repère orthonormé orienté dans le sens direct. | Point de départ `I(1 ; 0)`.
- Enroulement de la droite : on associe à chaque réel x un unique point M du cercle, la longueur de l’arc IM valant x. | Arc `IM` de longueur `x`.
- Radian : unité d’angle telle qu’un tour complet mesure 2π radians. | `360° = 2π rad`, `180° = π rad`, `1 rad ≈ 57,3°`
- Conversion : degrés et radians sont proportionnels. | `rad = degrés × π/180` ; `degrés = rad × 180/π`
- Mesures associées au même point : deux réels associés au même point diffèrent d’un nombre entier de tours. | `x` et `x + 2kπ` (`k ∈ ℤ`) donnent le même point.
- Mesure principale : la seule mesure d’un angle orienté située dans ]−π ; π]. | La mesure principale de `27π/4` est `3π/4`.

## Méthodes
### Convertir des degrés en radians (et inversement)
1. Écris la correspondance de base : 180° ↔ π rad.
2. Degrés vers radians : multiplie par π/180 ; radians vers degrés : multiplie par 180/π.
3. Simplifie la fraction obtenue.

### Placer un point associé à un réel kπ/q
1. Écris un tour complet avec le même dénominateur : `2π = 2qπ/q`.
2. Retire (ou ajoute) autant de tours complets que possible pour obtenir un reste entre 0 et 2π.
3. Place le reste en comptant des parts de π/q dans le sens direct.

### Trouver la mesure principale
1. Retire ou ajoute des multiples de 2π jusqu’à tomber dans ]−π ; π].
2. Avec une fraction kπ/q : ajoute ou retire 2q au numérateur jusqu’à obtenir un numérateur entre −q (exclu) et q (inclus).
3. Vérifie que le résultat est bien dans ]−π ; π].

## Exemples résolus
### Convertis 33° en radians.
- 180° ↔ π rad — correspondance de base.
- `33 × π/180 = 33π/180` — on multiplie par π/180.
- `= 11π/60` — on simplifie par 3.
### Convertis 3π/8 radians en degrés.
- `3π/8 × 180/π = 3 × 180/8` — on multiplie par 180/π.
- `= 67,5°` — calcul.
### Place le point associé à 8π/3.
- `8π/3 = 6π/3 + 2π/3 = 2π + 2π/3` — on fait apparaître un tour complet.
- Le point est le même que celui de `2π/3` — un tour ne change rien.
- Il est en haut à gauche du cercle — `2π/3` est entre π/2 et π.
### Place le point associé à −9π/2.
- `−9π/2 = −8π/2 − π/2 = −4π − π/2` — deux tours dans le sens indirect.
- Le point est celui de `−π/2`, en bas du cercle — on retire les tours.
### Donne la mesure principale de 27π/4.
- Un tour vaut `2π = 8π/4` — même dénominateur.
- `27π/4 = 24π/4 + 3π/4 = 6π + 3π/4` — 3 tours complets.
- `3π/4` est dans ]−π ; π] : c’est la mesure principale — vérification.
### Donne la mesure principale de 7π/4.
- `7π/4 − 2π = 7π/4 − 8π/4 = −π/4` — on retire un tour.
- `−π/4` est dans ]−π ; π] — c’est la mesure principale.

## Pièges fréquents
- Croire qu’un tour vaut π → un tour vaut 2π ; retirer π fait un demi-tour (point diamétralement opposé).
- Convertir dans le mauvais sens → vérifie l’ordre de grandeur : 90° doit donner π/2 ≈ 1,57.
- Oublier de simplifier la fraction → 150π/180 se simplifie en 5π/6.
- Donner une mesure dans [0 ; 2π[ quand on demande la mesure principale → la mesure principale est dans ]−π ; π].
- Prendre −π comme mesure principale → −π est exclu : on prend π.
- Tourner dans le mauvais sens → le sens direct est l’inverse des aiguilles d’une montre.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu’est-ce que le cercle trigonométrique ? | Le cercle de centre O, de rayon 1, orienté dans le sens direct. |
| Combien vaut un tour en radians ? | 2π rad. |
| Combien vaut π rad en degrés ? | 180°. |
| Comment convertir des degrés en radians ? | Multiplier par π/180. |
| x et x + 2π donnent-ils le même point ? | Oui : un tour complet. |
| Dans quel intervalle est la mesure principale ? | ]−π ; π]. |

## Notes pour l'intégration
- Tct p. 6-7 : la mesure principale est signalée « non exigible » dans le document ; elle est traitée ici car elle sert dans tous les chapitres suivants.
- Tct p. 4 : coquille « Cela qui donne ». Tct p. 1 : l’attribution à Regiomontanus de l’usage systématique du mot « sinus » est au conditionnel ; le cours reste prudent sur ce point.
- Les figures (enroulement, points placés) sont remplacées par le widget `wCircle` et par des cercles SVG gradués dans l’exercice « Lire un point ».

# Chapitre : Cosinus et sinus d’un nombre réel
Source : Tft.pdf « Fonctions trigonométriques » (Yvan Monka), p. 1-2 : définition du cosinus et du sinus sur le cercle, encadrement −1 ≤ cos x ≤ 1 et −1 ≤ sin x ≤ 1, relation cos²x + sin²x = 1, tableau des valeurs remarquables ; p. 6 : symétrie de x et −x. Les angles associés π − x, π + x, π/2 − x sont un prolongement par les symétries du cercle.
Niveau visé : Lire le cosinus et le sinus de n’importe quel réel remarquable sur le cercle, donner leur valeur exacte et leur signe, utiliser cos²x + sin²x = 1 pour passer de l’un à l’autre.
Prérequis : cercle trigonométrique, radians, mesure principale, CAH SOH TOA, théorème de Pythagore.

## Explication pour un novice
Au collège, le cosinus n’existait que pour un angle aigu d’un triangle rectangle. Mais une grande roue tourne au-delà de 90° : on a besoin d’un cosinus pour 120°, 300° ou même −45°. Le cercle trigonométrique va nous le donner, sans rien casser de ce qu’on savait.

Prends le point M du cercle associé au réel x. Le **cosinus** de x est l’**abscisse** de M, le **sinus** de x est son **ordonnée** : M a pour coordonnées (cos x ; sin x). Pourquoi est-ce le même cosinus qu’avant ? Si x est entre 0 et π/2, trace la perpendiculaire de M à l’axe horizontal : tu obtiens un triangle rectangle d’hypoténuse OM = 1, donc cos x = adjacent / 1 = abscisse de M. La nouvelle définition prolonge l’ancienne.

Conséquences immédiates : comme M est sur un cercle de rayon 1, ses coordonnées restent entre −1 et 1 ; et Pythagore dans ce petit triangle donne **cos²x + sin²x = 1**. Le cosinus peut maintenant être négatif (point à gauche de l’axe vertical), le sinus aussi (point sous l’axe horizontal).

Pour les angles « remarquables » (π/6, π/4, π/3 et leurs symétriques), on connaît les valeurs exactes avec des racines carrées. Il suffit d’en retenir cinq, entre 0 et π/2, puis de se servir des **symétries du cercle** pour tous les autres : on trouve le quart de cercle (pour le signe) et l’angle de référence (pour la valeur).

## Notions (dans l'ordre d'apprentissage)
- Cosinus d’un réel : abscisse du point M du cercle trigonométrique associé à x. | `M(cos x ; sin x)`
- Sinus d’un réel : ordonnée du point M du cercle trigonométrique associé à x. | `sin x` = ordonnée de M
- Encadrement : cosinus et sinus sont toujours compris entre −1 et 1. | `−1 ≤ cos x ≤ 1` et `−1 ≤ sin x ≤ 1`
- Relation fondamentale : la somme des carrés vaut 1 (Pythagore dans le cercle). | `cos^2 x + sin^2 x = 1`, avec `cos^2 x = (cos x)^2`
- Valeurs remarquables : cos et sin de 0, π/6, π/4, π/3, π/2, π. | `cos(π/6) = √3/2`, `cos(π/4) = √2/2`, `cos(π/3) = 1/2`, `sin(π/6) = 1/2`, `sin(π/3) = √3/2`
- Signe selon le quart de cercle : cos est positif à droite de l’axe vertical, sin au-dessus de l’axe horizontal. | Sur `]π/2 ; π[` : `cos x < 0` et `sin x > 0`
- Angle de référence : l’angle entre 0 et π/2 qui a les mêmes valeurs au signe près. | `5π/6 = π − π/6` : angle de référence `π/6`
- Angles associés : les symétries du cercle relient les valeurs de x, −x, π − x, π + x, π/2 − x. | `cos(−x) = cos x`, `sin(−x) = −sin x`, `cos(π − x) = −cos x`, `sin(π − x) = sin x`, `cos(π + x) = −cos x`, `sin(π + x) = −sin x`, `cos(π/2 − x) = sin x`

## Méthodes
### Calculer cos ou sin d’un angle remarquable
1. Ramène l’angle à sa mesure principale (retire les tours complets).
2. Place le point : dans quel quart de cercle est-il ? Cela donne le signe.
3. Trouve l’angle de référence entre 0 et π/2 (x = π − a, π + a ou −a).
4. Lis la valeur dans le tableau pour l’angle de référence et applique le signe.

### Passer de sin x à cos x (ou l’inverse)
1. Écris `cos^2 x = 1 − sin^2 x`.
2. Calcule, puis prends la racine : deux valeurs opposées sont possibles.
3. Choisis le signe grâce à l’intervalle où se trouve x.

### Retrouver le tableau des valeurs remarquables
1. De 0 à π/2, le sinus vaut `√0/2, √1/2, √2/2, √3/2, √4/2`, c’est-à-dire 0, 1/2, √2/2, √3/2, 1.
2. Le cosinus lit la même liste à l’envers.

## Exemples résolus
### Calcule cos(5π/4).
- `5π/4 = π + π/4` — angle de référence π/4.
- Le point est en bas à gauche — 3e quart de cercle, cos négatif.
- `cos(5π/4) = −√2/2` — valeur de π/4 avec le signe moins.
### Calcule sin(−5π/6).
- `sin(−5π/6) = −sin(5π/6)` — le sinus change de signe avec −x.
- `sin(5π/6) = sin(π − π/6) = sin(π/6) = 1/2` — angle supplémentaire.
- `sin(−5π/6) = −1/2` — conclusion.
### Calcule cos(27π/4).
- La mesure principale de `27π/4` est `3π/4` — on retire 3 tours.
- `3π/4 = π − π/4`, point en haut à gauche — cos négatif.
- `cos(27π/4) = −√2/2` — valeur de π/4 avec le signe.
### Sachant que sin x = 3/5 et x ∈ ]π/2 ; π[, calcule cos x.
- `cos^2 x = 1 − (3/5)^2 = 16/25` — relation fondamentale.
- `cos x = 4/5` ou `cos x = −4/5` — deux valeurs possibles.
- Sur ]π/2 ; π[, cos x est négatif, donc `cos x = −4/5` — le signe vient de l’intervalle.

## Pièges fréquents
- Confondre les valeurs de π/6 et π/3 → retiens que sin monte : sin(π/6) = 1/2 est plus petit que sin(π/3) = √3/2.
- Oublier le signe → place toujours le point sur un petit cercle avant de répondre.
- Écrire cos x + sin x = 1 → c’est la somme des carrés qui vaut 1.
- Garder les deux valeurs ± à la fin → l’intervalle donné fixe le signe.
- Lire le sinus sur l’axe horizontal → cosinus en abscisse, sinus en ordonnée.
- Croire qu’un cosinus est toujours entre 0 et 1 → c’est vrai pour un angle aigu ; sur le cercle, il est entre −1 et 1.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Que représente cos x sur le cercle ? | L’abscisse du point associé à x. |
| Que représente sin x sur le cercle ? | L’ordonnée du point associé à x. |
| Que vaut cos²x + sin²x ? | 1. |
| Que vaut cos(π/3) ? | 1/2. |
| Que vaut sin(π/4) ? | √2/2. |
| Que vaut cos(π) ? | −1. |
| Signe de cos x sur ]π/2 ; π[ ? | Négatif. |

## Notes pour l'intégration
- Le document présente les valeurs remarquables entre 0 et π et la symétrie x ↔ −x ; les autres angles associés (π − x, π + x, π/2 − x) sont ajoutés comme conséquences directes des symétries du cercle.
- Le widget `wCircle` illustre la lecture de cos et sin.

# Chapitre : Équations et inéquations trigonométriques
Source : Tft.pdf « Fonctions trigonométriques » (Yvan Monka), p. 2-3 : méthode « Résoudre une équation et une inéquation trigonométrique » (cos²x = 1/2 dans ℝ, sin x ≤ √3/2 dans [−π ; π]) ; Ttrigt p. 2 (cos D̂ = 1,3 impossible). L’équation cos(2x) = c est un prolongement (Tft p. 9 utilise cos(2x)).
Niveau visé : Résoudre cos x = a et sin x = a sur un intervalle et dans ℝ, résoudre une équation qui s’y ramène (a cos x + b = 0, cos²x = c, cos(2x) = c) et une inéquation sur un tour.
Prérequis : cercle trigonométrique, valeurs remarquables, mesure principale, identités remarquables.

## Explication pour un novice
Résoudre sin x = 1/2, c’est chercher les points du cercle trigonométrique situés à la hauteur 1/2. Trace la droite horizontale y = 1/2 : elle coupe le cercle en **deux** points, associés à π/6 et 5π/6. Une équation trigonométrique, c’est donc une droite qui coupe un cercle : zéro, un ou deux points par tour.

Pour cos x = c, la droite est **verticale** (x = c). Ses deux points d’intersection sont symétriques par rapport à l’axe horizontal : ils correspondent à a et −a. Pour sin x = c, la droite est **horizontale** et les deux points sont symétriques par rapport à l’axe vertical : a et π − a. Retenir ces deux images vaut mieux qu’apprendre deux formules par cœur.

Si |c| > 1, la droite ne touche pas le cercle : pas de solution. Si c = 1 ou c = −1, elle le touche en un seul point. Sinon, il y a deux points par tour.

Et comme chaque point a une infinité de noms (on peut ajouter 2π autant de fois qu’on veut), les solutions dans ℝ s’écrivent avec « + 2kπ, k ∈ ℤ ». Sur un intervalle imposé, on garde seulement les valeurs qui y tombent.

Pour une **inéquation**, on résout d’abord l’équation, puis on regarde quelle **partie du cercle** convient : sous la droite pour sin x ≤ c, à droite de la droite pour cos x ≥ c, etc. On lit enfin les bornes dans l’ordre croissant.

## Notions (dans l'ordre d'apprentissage)
- Nombre de solutions sur un tour : 0 si |c| > 1, 1 si c = ±1, 2 sinon. | `cos x = c` et `sin x = c` avec `−1 < c < 1` : deux solutions par tour.
- Équation cos x = cos a : les solutions sont a et −a, à un tour près. | `cos x = cos a ⟺ x = a + 2kπ ou x = −a + 2kπ, k ∈ ℤ`
- Équation sin x = sin a : les solutions sont a et π − a, à un tour près. | `sin x = sin a ⟺ x = a + 2kπ ou x = π − a + 2kπ, k ∈ ℤ`
- Solution unique sur un demi-tour : sur [0 ; π], cos prend chaque valeur une seule fois ; sur [−π/2 ; π/2], sin aussi. | `cos x = 1/2` sur `[0 ; π]` : `x = π/3`
- Inéquation sur un tour : on résout l’équation, puis on lit un arc de cercle. | `sin x ≤ √3/2` sur `[−π ; π]` : `[−π ; π/3] ∪ [2π/3 ; π]`
- Changement de variable : pour cos(2x) = c, on pose X = 2x puis on divise tout par 2, période comprise. | `2x = a + 2kπ ⟺ x = a/2 + kπ`

## Méthodes
### Résoudre cos x = c ou sin x = c
1. Isole cos x ou sin x.
2. Si |c| > 1, il n’y a pas de solution.
3. Reconnais une valeur remarquable : écris c = cos a ou c = sin a.
4. Applique la règle : a et −a pour le cosinus, a et π − a pour le sinus, plus 2kπ.
5. Si un intervalle est imposé, garde les valeurs qui y tombent ; vérifie sur le cercle.

### Résoudre cos²x = c
1. Écris `cos x = √c` ou `cos x = −√c`.
2. Résous chacune des deux équations.
3. Rassemble les solutions (quatre points par tour en général).

### Résoudre une inéquation sur un tour
1. Résous l’équation associée sur l’intervalle demandé.
2. Repère sur le cercle la partie qui convient (au-dessus ou sous une droite horizontale pour sin, à droite ou à gauche d’une droite verticale pour cos).
3. Écris l’ensemble des solutions avec des intervalles, bornes incluses si l’inégalité est large.

## Exemples résolus
### Résous 2 cos x + 1 = 0 dans ]−π ; π].
- `cos x = −1/2` — on isole cos x.
- `−1/2 = cos(2π/3)` — valeur remarquable.
- `x = 2π/3` ou `x = −2π/3` — règle du cosinus.
### Résous cos²x = 1/2 dans ℝ.
- `cos x = √2/2` ou `cos x = −√2/2` — car `√(1/2) = 1/√2 = √2/2`.
- Points associés à π/4, −π/4, 3π/4, −3π/4 — quatre points, espacés de π/2.
- `S = {π/4 + kπ/2, k ∈ ℤ}` — écriture regroupée.
### Résous sin x ≤ √3/2 dans [−π ; π].
- `sin x = √3/2` donne `x = π/3` ou `x = 2π/3` — on résout d’abord l’équation.
- On garde la partie du cercle sous la droite `y = √3/2` — tout sauf l’arc du haut.
- `S = [−π ; π/3] ∪ [2π/3 ; π]` — lecture dans l’ordre croissant.
### Résous cos(2x) = 1/2 dans [0 ; π].
- `2x = π/3 + 2kπ` ou `2x = −π/3 + 2kπ` — règle du cosinus avec X = 2x.
- `x = π/6 + kπ` ou `x = −π/6 + kπ` — on divise tout par 2, y compris 2kπ.
- `S = {π/6 ; 5π/6}` — valeurs dans [0 ; π].

## Pièges fréquents
- Oublier la deuxième solution → une droite coupe le cercle en deux points (sauf pour ±1).
- Prendre π − a pour un cosinus → pour le cosinus c’est −a ; π − a est la règle du sinus.
- Oublier + 2kπ dans ℝ → chaque point a une infinité de mesures.
- Diviser a par 2 mais pas 2kπ → si 2x = a + 2kπ, alors x = a/2 + kπ.
- Oublier la racine négative dans cos²x = c → cos x = √c ou cos x = −√c.
- Lire le mauvais arc dans une inéquation → dessine la droite et colorie la partie qui vérifie l’inégalité.
- Mettre des crochets ouverts pour une inégalité large → ≤ et ≥ : bornes incluses.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Solutions de cos x = cos a ? | x = a + 2kπ ou x = −a + 2kπ. |
| Solutions de sin x = sin a ? | x = a + 2kπ ou x = π − a + 2kπ. |
| cos x = 1,3 : combien de solutions ? | Aucune. |
| Solutions de sin x = 1/2 dans ]−π ; π] ? | π/6 et 5π/6. |
| Solutions de cos x = −1/2 dans ]−π ; π] ? | −2π/3 et 2π/3. |
| Si 2x = a + 2kπ, que vaut x ? | x = a/2 + kπ. |

## Notes pour l'intégration
- Les inéquations sont proposées sur [−π ; π] comme dans le document, avec des inégalités larges uniquement.
- cos(2x) = c n’est pas un exercice du document ; il prépare l’étude de cos(2x) − 1/2 (Tft p. 9).

# Chapitre : Fonctions cosinus et sinus
Source : Tft.pdf « Fonctions trigonométriques » (Yvan Monka), p. 4-10 : définition des fonctions cosinus et sinus, courbes, périodicité, parité (sin x − sin 2x est impaire), compléter une courbe par parité et périodicité, dérivées (cos, sin, cos(ax + b), sin(ax + b)), tableaux de variations sur [0 ; π], étude complète de f(x) = cos(2x) − 1/2.
Niveau visé : Connaître la période, la parité, les dérivées et les variations de cos et sin, démontrer la parité ou la période d’une fonction trigonométrique et étudier une fonction du type cos(ax) + c.
Prérequis : cosinus et sinus d’un réel, dérivée d’une fonction composée x ↦ g(ax + b), tableau de variations, fonction paire et impaire.

## Explication pour un novice
Quand la grande roue tourne, la hauteur de ta nacelle monte, redescend, remonte… Si tu traces cette hauteur en fonction de l’angle parcouru, tu obtiens une vague régulière : c’est la courbe de la fonction **sinus**. La largeur horizontale, elle, dessine la courbe du **cosinus**. Ces deux fonctions modélisent tout ce qui oscille : son, lumière, courant alternatif, marées.

La fonction cosinus associe à tout réel x le nombre cos x, la fonction sinus lui associe sin x. Toutes deux sont définies sur ℝ et prennent leurs valeurs entre −1 et 1.

Première propriété : comme x et x + 2π donnent le même point du cercle, cos(x + 2π) = cos x et sin(x + 2π) = sin x. Les fonctions sont **périodiques de période 2π** : la même portion de courbe se répète sur chaque intervalle de longueur 2π. Il suffit donc de connaître la courbe sur un seul intervalle de longueur 2π.

Deuxième propriété : x et −x sont symétriques par rapport à l’axe horizontal. Donc cos(−x) = cos x (la fonction cosinus est **paire**, sa courbe est symétrique par rapport à l’axe des ordonnées) et sin(−x) = −sin x (la fonction sinus est **impaire**, sa courbe est symétrique par rapport à l’origine). Avec la périodicité, il suffit d’étudier [0 ; π] et de compléter par symétrie puis par translation.

Enfin, en radians (et seulement en radians), on a les dérivées très simples : cos′ = −sin et sin′ = cos. Elles donnent les variations : sur [0 ; π], cos décroît de 1 à −1, et sin croît de 0 à 1 jusqu’à π/2 puis décroît jusqu’à 0.

## Notions (dans l'ordre d'apprentissage)
- Fonction cosinus : la fonction définie sur ℝ qui à x associe cos x. | `cos : ℝ → [−1 ; 1]`
- Fonction sinus : la fonction définie sur ℝ qui à x associe sin x. | `sin : ℝ → [−1 ; 1]`
- Périodicité : cos et sin reprennent les mêmes valeurs tous les 2π. | `cos(x + 2kπ) = cos x` et `sin(x + 2kπ) = sin x`, `k ∈ ℤ`
- Période de cos(ax + b) : la période est 2π divisé par a. | Pour `a ≠ 0`, `cos(ax + b)` et `sin(ax + b)` ont pour période `2π/|a|`
- Fonction paire : sa courbe est symétrique par rapport à l’axe des ordonnées. | `f(−x) = f(x)` pour tout x du domaine (symétrique par rapport à 0)
- Fonction impaire : sa courbe est symétrique par rapport à l’origine du repère. | `f(−x) = −f(x)` pour tout x du domaine
- Parité de cos et sin : cosinus est paire, sinus est impaire. | `cos(−x) = cos x`, `sin(−x) = −sin x`
- Dérivées : en radians, la dérivée de sin est cos et celle de cos est −sin. | `cos′(x) = −sin x`, `sin′(x) = cos x`, `(cos(ax + b))′ = −a sin(ax + b)`, `(sin(ax + b))′ = a cos(ax + b)`
- Variations sur [0 ; π] : cos décroît de 1 à −1 ; sin croît de 0 à 1 sur [0 ; π/2] puis décroît de 1 à 0. | Maximum de sin en `π/2`

## Méthodes
### Démontrer qu’une fonction est paire ou impaire
1. Vérifie que le domaine est symétrique par rapport à 0 (ici ℝ).
2. Calcule f(−x) en utilisant cos(−u) = cos u, sin(−u) = −sin u, (−x)² = x².
3. Compare avec f(x) : f(−x) = f(x) (paire), f(−x) = −f(x) (impaire), ou ni l’un ni l’autre.

### Démontrer qu’une fonction est périodique de période T
1. Calcule f(x + T).
2. Fais apparaître un argument augmenté de 2π : cos(2(x + π)) = cos(2x + 2π) = cos(2x).
3. Conclus : f(x + T) = f(x) pour tout x.

### Étudier une fonction trigonométrique
1. Étudie la parité et la période pour réduire l’intervalle d’étude.
2. Calcule la dérivée (formule de cos(ax + b) ou sin(ax + b)).
3. Étudie son signe sur l’intervalle réduit, en suivant où se trouve ax + b.
4. Dresse le tableau de variations avec les valeurs aux bornes.
5. Trace sur l’intervalle réduit, puis complète par symétrie et par translation.

## Exemples résolus
### Montre que f(x) = sin x − sin(2x) est impaire.
- `f(−x) = sin(−x) − sin(−2x)` — on remplace x par −x.
- `= −sin x + sin(2x)` — sinus est impaire.
- `= −(sin x − sin(2x)) = −f(x)` — f est impaire, sa courbe est symétrique par rapport à l’origine.
### Étudie f(x) = cos(2x) − 1/2 sur [0 ; π/2].
- `f(−x) = cos(−2x) − 1/2 = f(x)` — f est paire.
- `f(x + π) = cos(2x + 2π) − 1/2 = f(x)` — f est périodique de période π.
- `f′(x) = −2 sin(2x)` — dérivée de cos(ax + b) avec a = 2.
- Si `x ∈ [0 ; π/2]`, alors `2x ∈ [0 ; π]` et `sin(2x) ≥ 0`, donc `f′(x) ≤ 0` — signe de la dérivée.
- f décroît de `f(0) = 1/2` à `f(π/2) = −3/2` — valeurs aux bornes.
### Complète la courbe d’une fonction impaire de période π connue sur [−π/2 ; 0].
- Par symétrie de centre O, on obtient la courbe sur [0 ; π/2] — f est impaire.
- La portion sur [−π/2 ; π/2] a pour longueur π : on la recopie par translations de π — périodicité.

## Pièges fréquents
- Oublier le facteur a en dérivant cos(ax + b) → la dérivée est −a sin(ax + b).
- Écrire cos′ = sin → la dérivée du cosinus est −sin.
- Multiplier 2π par a pour la période → on divise : la période de cos(3x) est 2π/3.
- Confondre les symétries → paire : axe des ordonnées ; impaire : origine.
- Conclure « paire » sur un exemple numérique → il faut f(−x) = f(x) pour tout x ; un contre-exemple suffit en revanche pour dire « ni paire ni impaire ».
- Dériver en degrés → les formules cos′ = −sin et sin′ = cos ne valent qu’en radians.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Période de cos et sin ? | 2π. |
| La fonction cosinus est-elle paire ou impaire ? | Paire : cos(−x) = cos x. |
| La fonction sinus est-elle paire ou impaire ? | Impaire : sin(−x) = −sin x. |
| Dérivée de sin x ? | cos x. |
| Dérivée de cos x ? | −sin x. |
| Dérivée de cos(ax + b) ? | −a sin(ax + b). |
| Variations de cos sur [0 ; π] ? | Décroissante de 1 à −1. |

## Notes pour l'intégration
- Les exercices « compléter un graphique » et « tracer la courbe » (Tft p. 6-7, 10) ne sont pas vérifiables automatiquement : ils sont repris dans le cours et dans les raisonnements sur la parité et l’étude de fonction.
- Widgets : `wCircle` (cercle et courbe du sinus) et `wVar` (signe de la dérivée et variations).

# Chapitre : Pour aller plus loin : formules d’addition et de duplication
Source : complément hors documents. Les trois PDF (Ttrigt, Tct, Tft) ne contiennent ni les formules d’addition ni les formules de duplication ; ce chapitre facultatif les présente pour préparer la suite (dérivées, intégrales, nombres complexes).
Niveau visé : Connaître les formules d’addition et de duplication, les utiliser pour calculer des valeurs exactes (π/12, 5π/12, 7π/12) et calculer sin 2x et cos 2x à partir de sin x.
Prérequis : valeurs remarquables, relation cos²x + sin²x = 1, signe selon le quart de cercle.

## Explication pour un novice
Attention : ce chapitre va **au-delà de tes documents**. Il est facultatif, mais très utile pour la suite des études.

Tu connais cos(π/4) et cos(π/6). Mais que vaut cos(π/4 + π/6) = cos(5π/12) ? Le réflexe « cos(a + b) = cos a + cos b » est faux : avec a = b = π/2, on aurait cos π = 0 + 0 = 0, alors que cos π = −1. Le cosinus n’est pas « additif ». Il existe pourtant des formules exactes, connues depuis l’Antiquité sous une autre forme (Ptolémée les utilisait pour construire ses tables).

Les formules d’addition disent : cos(a + b) = cos a cos b − sin a sin b et sin(a + b) = sin a cos b + cos a sin b. En remplaçant b par −b, on obtient celles de a − b. En prenant b = a, on obtient les formules de **duplication** : sin 2a = 2 sin a cos a et cos 2a = cos²a − sin²a.

Un bon réflexe pour ne pas se tromper de signe : teste toujours la formule avec b = 0 (on doit retrouver cos a ou sin a) ou avec a = b = π/4.

## Notions (dans l'ordre d'apprentissage)
- Formule de cos(a + b) : on garde les mêmes fonctions ensemble et on met un signe moins. | `cos(a + b) = cos a cos b − sin a sin b`
- Formule de cos(a − b) : même chose avec un signe plus. | `cos(a − b) = cos a cos b + sin a sin b`
- Formule de sin(a + b) : on mélange les fonctions et on garde le signe. | `sin(a + b) = sin a cos b + cos a sin b`
- Formule de sin(a − b) : idem avec un signe moins. | `sin(a − b) = sin a cos b − cos a sin b`
- Duplication du sinus : cas b = a. | `sin 2a = 2 sin a cos a`
- Duplication du cosinus : trois écritures équivalentes. | `cos 2a = cos^2 a − sin^2 a = 2cos^2 a − 1 = 1 − 2sin^2 a`
- Linéarisation : on renverse la duplication. | `cos^2 a = (1 + cos 2a)/2` et `sin^2 a = (1 − cos 2a)/2`

## Méthodes
### Calculer une valeur exacte avec une formule d’addition
1. Décompose l’angle en somme ou différence d’angles remarquables (5π/12 = π/4 + π/6).
2. Écris la formule adaptée (cos ou sin, somme ou différence).
3. Remplace par les valeurs remarquables et simplifie les produits de racines.
4. Contrôle avec une valeur approchée.

### Calculer sin 2x et cos 2x connaissant sin x
1. Calcule cos x avec cos²x + sin²x = 1, et choisis le signe grâce à l’intervalle.
2. sin 2x = 2 sin x cos x.
3. cos 2x = cos²x − sin²x.
4. Contrôle : sin²(2x) + cos²(2x) = 1.

## Exemples résolus
### Calcule cos(π/12).
- `π/12 = π/3 − π/4` — décomposition.
- `cos(π/3 − π/4) = cos(π/3) cos(π/4) + sin(π/3) sin(π/4)` — formule de cos(a − b).
- `= (1/2)(√2/2) + (√3/2)(√2/2) = (√2 + √6)/4 ≈ 0,966` — c’est bien cos 15°.
### Sachant que sin x = 3/5 et x ∈ ]0 ; π/2[, calcule sin 2x et cos 2x.
- `cos x = 4/5` — car `cos^2 x = 16/25` et cos x > 0.
- `sin 2x = 2 × 3/5 × 4/5 = 24/25` — duplication.
- `cos 2x = 16/25 − 9/25 = 7/25` — et `(24/25)^2 + (7/25)^2 = 1`.

## Pièges fréquents
- Écrire cos(a + b) = cos a + cos b → teste avec a = b = π/2 : c’est faux.
- Mettre un plus dans cos(a + b) → cos(a + b) a un signe moins.
- Écrire sin 2a = 2 sin a → en a = π/2, sin π = 0 mais 2 sin(π/2) = 2.
- Inverser cos²a − sin²a → en a = 0, cos 0 = 1 : c’est cos² − sin².

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Que vaut cos(a + b) ? | cos a cos b − sin a sin b. |
| Que vaut sin(a + b) ? | sin a cos b + cos a sin b. |
| Que vaut sin 2a ? | 2 sin a cos a. |
| Que vaut cos 2a ? | cos²a − sin²a. |

## Notes pour l'intégration
- Chapitre entièrement hors documents, signalé comme tel dans le titre, le cours, la pédagogie et les consignes des exercices.
