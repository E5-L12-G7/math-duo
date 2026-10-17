# Chapitre : Combinatoire et dénombrement
Source : Tcombi.pdf (Yvan Monka, « Combinatoire et dénombrement », 12 pages : principes additif et multiplicatif, k-uplets, arrangements, permutations, combinaisons, triangle de Pascal, parties d’un ensemble)
Niveau visé : Reconnaître le bon modèle de dénombrement (avec ou sans ordre, avec ou sans répétition), calculer n!, A(n ; k), C(n ; k), utiliser la symétrie et la relation de Pascal, et décomposer un problème de comptage en étapes.
Prérequis : multiplication et puissances, notion d’ensemble, fractions

## Explication pour un novice
Dénombrer, c’est compter sans oublier personne et sans compter deux fois la même chose. Ça paraît facile quand il y a cinq objets ; ça devient un vrai casse-tête quand il y en a des milliards, comme les codes d’un digicode ou les mains possibles au poker. Le dénombrement fournit des méthodes pour compter sans faire la liste.

Première idée, le **principe additif** : si tu ranges les objets dans des tiroirs qui ne se chevauchent pas (des ensembles disjoints), le total est la somme des tiroirs. Si les tiroirs se chevauchent, ceux qui sont dans deux tiroirs sont comptés deux fois : il faut corriger, et un diagramme aide beaucoup.

Deuxième idée, le **principe multiplicatif** : quand tu fais des choix successifs (une entrée, puis un plat, puis un dessert), le nombre total de possibilités est le produit des nombres de choix. 3 entrées, 4 plats et 2 desserts font 3 × 4 × 2 = 24 menus. Tout le reste du chapitre découle de cette idée.

Ensuite, presque tous les problèmes se ramènent à deux questions. **L’ordre compte-t-il ?** (un podium : oui ; une équipe : non.) **Un élément peut-il revenir ?** (un code : oui ; un tirage sans remise : non.) Les réponses te donnent la formule : nᵏ pour les listes avec répétition, n × (n − 1) × … pour les listes sans répétition (arrangements, permutations), et C(n ; k) quand l’ordre ne compte pas (combinaisons).

Pas de panique si tu hésites au début : même les mathématiciens recomptent sur un petit exemple quand ils doutent. Prendre n = 3 et écrire toutes les possibilités à la main est le meilleur moyen de vérifier une formule.

## Notions (dans l’ordre d’apprentissage)
- Cardinal : le nombre d’éléments d’un ensemble fini | `Card(E)` ou `|E|`
- Ensembles disjoints : deux ensembles sans élément commun | `A ∩ B = ∅`
- Principe additif : pour des ensembles deux à deux disjoints, on additionne les cardinaux | `Card(E_1 ∪ … ∪ E_p) = Card(E_1) + … + Card(E_p)`
- Produit cartésien : l’ensemble des listes (a₁, a₂, …) formées d’un élément de chaque ensemble | `E_1 × E_2 × … × E_p`
- Principe multiplicatif : pour des choix successifs, on multiplie | `Card(E_1 × … × E_p) = Card(E_1) × … × Card(E_p)`
- k-uplet : une liste ordonnée de k éléments, répétitions permises | il y en a `n^k` dans un ensemble à n éléments
- Factorielle : le produit des entiers de 1 à n, avec 0! = 1 par convention | `n! = 1 × 2 × … × n`
- Arrangement : une liste ordonnée de k éléments tous distincts | `A(n ; k) = n × (n − 1) × … × (n − k + 1) = n!/(n − k)!`
- Permutation : un rangement de tous les éléments, c’est un arrangement avec k = n | il y en a `n!`
- Combinaison : un sous-ensemble de k éléments, sans ordre | `C(n ; k) = n!/(k!(n − k)!)`
- Symétrie : choisir les k éléments gardés revient à choisir les n − k laissés | `C(n ; n − k) = C(n ; k)`
- Relation de Pascal : chaque coefficient est la somme des deux au-dessus | `C(n ; k) + C(n ; k + 1) = C(n + 1 ; k + 1)`
- Parties d’un ensemble : un ensemble à n éléments a 2ⁿ sous-ensembles, partie vide comprise | `C(n ; 0) + C(n ; 1) + … + C(n ; n) = 2^n`

## Méthodes
### Dénombrer avec un diagramme (ensembles qui se chevauchent)
1. Nomme les ensembles (par exemple L : latin, T : théâtre).
2. Place d’abord l’intersection au centre du diagramme.
3. Complète chaque partie « seulement L », « seulement T » en retirant l’intersection.
4. Ajoute les éléments qui ne sont dans aucun ensemble, puis additionne les parties disjointes.

### Choisir le bon modèle
1. L’ordre compte-t-il ? (places, rangs, postes différents, tirages successifs : oui ; groupe, main de cartes, tirage simultané : non.)
2. Les répétitions sont-elles possibles ? (avec remise, chiffres d’un code : oui ; personnes, tirage sans remise : non.)
3. Ordre et répétition : `n^k`. Ordre sans répétition : `A(n ; k) = n!/(n − k)!` (et `n!` si on range tout). Sans ordre ni répétition : `C(n ; k)`.
4. Vérifie sur un petit cas (n = 3) en écrivant toutes les possibilités.

### Décomposer en étapes successives
1. Découpe la construction d’un résultat en choix successifs (où placer un bloc ? dans quel ordre à l’intérieur ? comment placer le reste ?).
2. Compte les possibilités de chaque étape.
3. Multiplie (principe multiplicatif). N’additionne que pour des cas disjoints.

### Compter par le complémentaire
1. Quand la contrainte est « pas ceci », compte d’abord tout, sans contrainte.
2. Compte les cas interdits (souvent plus simples).
3. Soustrais : autorisés = total − interdits.

## Exemples résolus
### Dans une classe, 16 élèves font du latin, 14 du théâtre, 5 font les deux et 8 aucun. Combien d’élèves ?
- On ne peut pas additionner 16 et 14 directement — les 5 élèves des deux options seraient comptés deux fois.
- Seulement latin : 16 − 5 = 11 ; seulement théâtre : 14 − 5 = 9 — on découpe en parties disjointes.
- Total : 11 + 5 + 9 + 8 = 33 — principe additif sur des parties disjointes.

### Un digicode : 2 lettres puis 10 chiffres. Combien de codes ?
- Lettres : `26^2 = 676` couples — l’ordre compte et une lettre peut se répéter.
- Chiffres : `10^10` listes — même raisonnement.
- Total : 676 × 10¹⁰ = 6 760 000 000 000 — principe multiplicatif ; bien plus que les « 4 milliards » d’une chanson connue.

### Fred rebranche au hasard 3 câbles de couleurs différentes sur 12 positions. Probabilité de retrouver le bon branchement ?
- 12 choix pour le premier câble, 11 pour le deuxième, 10 pour le troisième — l’ordre compte (les câbles sont de couleurs différentes) et une position ne sert qu’une fois.
- 12 × 11 × 10 = 1 320 = `12!/9!` — c’est l’arrangement A(12 ; 3).
- Une seule configuration est la bonne : probabilité 1/1 320 — toutes les configurations sont équiprobables.

### 12 scientifiques sur 12 sièges, les 3 physiciens côte à côte. Combien de placements ?
- Le bloc des physiciens peut commencer aux sièges 1 à 10 : 10 positions — sièges 1-2-3, 2-3-4, …, 10-11-12.
- Dans le bloc : 3! = 6 ordres — permutation des physiciens.
- Les 9 autres : 9! = 362 880 — permutation sur les sièges restants.
- Total : 10 × 6 × 362 880 = 21 772 800 — principe multiplicatif.

### On élit 4 délégués parmi 34 élèves ; Emma refuse d’être élue avec Bastien. Combien de résultats ?
- Sans contrainte : `C(34 ; 4) = 46 376` — les délégués ne sont pas distingués, l’ordre ne compte pas.
- Groupes interdits (Emma et Bastien élus) : il reste 2 délégués à choisir parmi 32, `C(32 ; 2) = 496`.
- Résultats possibles : 46 376 − 496 = 45 880 — on compte par le complémentaire.

### Calculer C(25 ; 24) et C(4 ; 2)
- `C(25 ; 24) = C(25 ; 1) = 25` — symétrie : choisir 24 élèves revient à choisir celui qu’on laisse.
- `C(4 ; 2) = C(3 ; 1) + C(3 ; 2) = 3 + 3 = 6` — relation de Pascal.

## Pièges fréquents
- Additionner les effectifs de deux ensembles qui se chevauchent → retire l’intersection (ou fais un diagramme).
- Additionner des choix successifs → pour des choix successifs, on multiplie ; on additionne seulement des cas disjoints.
- Utiliser A(n ; k) pour une équipe ou une main de cartes → si l’ordre ne compte pas, c’est C(n ; k) = A(n ; k) ÷ k!.
- Utiliser n × (n − 1) × … pour un code → si les répétitions sont permises, c’est nᵏ.
- Oublier que 0! = 1 → c’est une convention qui rend la formule n!/(k!(n − k)!) valable pour k = 0 et k = n.
- Compter (n − g + 1)! pour les autres personnes en plus des positions du bloc → soit on compte les positions du bloc, soit on traite le bloc comme une personne de plus, mais pas les deux.
- Oublier la partie vide → un ensemble à n éléments a 2ⁿ parties, dont ∅ et l’ensemble lui-même.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu’est-ce que dénombrer ? | Compter les éléments d’un ensemble fini (son cardinal). |
| Quand peut-on additionner des cardinaux ? | Quand les ensembles sont deux à deux disjoints. |
| Que dit le principe multiplicatif ? | Pour des choix successifs, on multiplie les nombres de choix. |
| Combien de k-uplets dans un ensemble à n éléments ? | `n^k` |
| Que vaut 5! ? | 120 |
| Que vaut 0! ? | 1, par convention. |
| Combien d’arrangements de k parmi n ? | `n!/(n − k)!` |
| Combien de permutations de n éléments ? | `n!` |
| Formule de C(n ; k) ? | `n!/(k!(n − k)!)` |
| Ordre compté, sans répétition : quel modèle ? | Arrangements (ou permutations si k = n). |
| Sans ordre, sans répétition : quel modèle ? | Combinaisons C(n ; k). |
| Que vaut C(n ; n − k) ? | C(n ; k) (symétrie). |
| Relation de Pascal ? | `C(n ; k) + C(n ; k + 1) = C(n + 1 ; k + 1)` |
| Combien de parties a un ensemble à n éléments ? | `2^n` |

# Chapitre : Probabilités et conditionnement
Source : Tproba.pdf (Yvan Monka, « Probabilités », 19 pages : expérience aléatoire, équiprobabilité, événement contraire, loi de probabilité, tableaux et arbres, réunion et intersection, probabilités conditionnelles, arbres pondérés, probabilités totales, indépendance)
Niveau visé : Calculer une probabilité en situation d’équiprobabilité ou à partir d’une loi, manipuler contraire, réunion et intersection, calculer et interpréter une probabilité conditionnelle (tableau, formule, arbre pondéré), appliquer la formule des probabilités totales, inverser un conditionnement et utiliser l’indépendance.
Prérequis : fractions et pourcentages, dénombrement simple, vocabulaire des ensembles (∩, ∪)

## Explication pour un novice
Une **expérience aléatoire** est une expérience dont on connaît les résultats possibles (les **issues**) mais pas celui qui va sortir : lancer un dé, tirer une carte. Une **probabilité** est un nombre entre 0 et 1 qui mesure la chance qu’un événement se produise : 0 pour l’impossible, 1 pour le certain, 0,8 pour « 8 chances sur 10 ».

D’où vient ce nombre ? Si tu lances un dé des milliers de fois, la fréquence de chaque face se stabilise autour de 1/6 ≈ 0,167. La probabilité, c’est cette valeur idéale vers laquelle les fréquences se rapprochent. Quand toutes les issues ont la même chance (on parle d’**équiprobabilité**), il suffit de compter : favorables ÷ total.

On combine ensuite les événements. « A ou B » (la **réunion**) se calcule avec P(A) + P(B) − P(A ∩ B) : on retire l’intersection, comptée deux fois. « Pas A » (le **contraire**) se calcule avec 1 − P(A), ce qui simplifie souvent les « au moins un ».

La grande idée du chapitre est le **conditionnement** : une information change les probabilités. Sachant que la carte tirée est un pique, la probabilité que ce soit un roi n’est plus 4/32 mais 1/8. On note P_A(B), « probabilité de B sachant A », et on la calcule en se restreignant à A : P(A ∩ B) ÷ P(A).

Enfin, l’**arbre pondéré** organise tout cela : on multiplie le long d’un chemin, on additionne les chemins qui mènent au même événement. C’est l’outil qui permet de comprendre un test médical, où un résultat positif ne signifie pas forcément être malade.

## Notions (dans l’ordre d’apprentissage)
- Expérience aléatoire : une expérience dont le résultat n’est pas prévisible | ses résultats possibles sont les issues
- Événement : un ensemble d’issues | par exemple « obtenir 5 ou plus » = {5 ; 6}
- Probabilité : un nombre entre 0 et 1 qui mesure la chance d’un événement | `0 ≤ P(A) ≤ 1`, P(impossible) = 0, P(certain) = 1
- Équiprobabilité : toutes les issues ont la même probabilité | alors `P(A) = favorables/total`
- Loi de probabilité : la liste des probabilités de toutes les issues | leur somme vaut 1
- Événement contraire : les issues qui ne sont pas dans A | `P(Ā) = 1 − P(A)`
- Intersection : « A et B », les deux sont réalisés | `A ∩ B`
- Réunion : « A ou B », au moins l’un des deux | `P(A ∪ B) = P(A) + P(B) − P(A ∩ B)`
- Événements incompatibles : ils ne peuvent pas se produire ensemble | `A ∩ B = ∅` et alors `P(A ∪ B) = P(A) + P(B)`
- Probabilité conditionnelle : probabilité de B quand on sait que A est réalisé, pour P(A) ≠ 0 | `P_A(B) = P(A ∩ B)/P(A)`
- Probabilité d’une intersection : on multiplie le long d’un chemin de l’arbre | `P(A ∩ B) = P(A) × P_A(B)`
- Probabilités totales : on additionne les chemins qui mènent à B | `P(B) = P(A ∩ B) + P(Ā ∩ B)`
- Indépendance : savoir A ne change pas la probabilité de B | `P(A ∩ B) = P(A) × P(B)`, et si P(A) ≠ 0, `P_A(B) = P(B)`
- Indépendance et contraire : si A et B sont indépendants, Ā et B aussi | `P(Ā ∩ B) = P(Ā) × P(B)`

## Méthodes
### Calculer une probabilité par comptage
1. Vérifie l’équiprobabilité (dé équilibré, boules indiscernables, tirage au hasard).
2. Compte les issues favorables, puis le nombre total d’issues.
3. Divise et simplifie la fraction.

### Lire un tableau croisé
1. P(A ∩ B) : la case commune ÷ l’effectif total.
2. P_A(B) : on se restreint à la ligne (ou la colonne) de A ; case commune ÷ total de A.
3. Ne confonds pas P_A(B) et P_B(A) : ce qui est « sachant » donne le dénominateur.

### Construire et exploiter un arbre pondéré
1. Premier niveau : P(A) et P(Ā) = 1 − P(A).
2. Second niveau : des probabilités conditionnelles P_A(B), P_A(B̄) = 1 − P_A(B), etc.
3. Probabilité d’un chemin : produit des branches.
4. Probabilité d’un événement : somme des chemins qui y mènent (probabilités totales).
5. Pour « A sachant B » (le conditionnement inversé) : `P_B(A) = P(A ∩ B)/P(B)`, avec P(B) obtenu à l’étape 4.

### Utiliser ou vérifier l’indépendance
1. Pour vérifier : compare P(A ∩ B) et P(A) × P(B).
2. Pour utiliser : remplace P(A ∩ B) par P(A) × P(B), y compris avec les contraires.
3. Ne confonds pas indépendants (on multiplie) et incompatibles (l’intersection est vide).

## Exemples résolus
### Une roue a 14 secteurs dont 2 jaunes. Probabilité de « jaune » ?
- 2 issues favorables sur 14 issues équiprobables — les secteurs sont identiques.
- P = 2/14 = 1/7 — on simplifie.

### Dé pipé : un chiffre impair est deux fois plus probable qu’un chiffre pair. P(pair) ?
- On note p = P(pair) ; alors P(impair) = 2p — traduction de l’énoncé.
- p + 2p = 1 — pair et impair sont contraires, la somme vaut 1.
- p = 1/3 — on résout 3p = 1.

### Jetons 1 à 5 : P(1) = 1/15, P(2) = 4/15, P(4) = 3/15, P(5) = 4/15. P(3) et P(pair) ?
- P(3) = 1 − 12/15 = 3/15 = 1/5 — la somme des probabilités vaut 1.
- P(pair) = P(2) + P(4) = 7/15 — on additionne les issues de l’événement.
- P(non pair) = 1 − 7/15 = 8/15 — événement contraire.

### Dé : A « impair », B « multiple de 3 ». P(A ∪ B) ?
- P(A) = 3/6 = 1/2, P(B) = 2/6 = 1/3, A ∩ B = {3} donc P(A ∩ B) = 1/6.
- P(A ∪ B) = 1/2 + 1/3 − 1/6 = 2/3 — on retire l’intersection comptée deux fois.

### 800 patients : 674 guéris dont 383 traités par A ; 345 traités par B dont 291 guéris
- P_G(A) = 383/674 ≈ 0,57 — on se restreint à la ligne des guéris.
- P_Ā(G) = 291/345 ≈ 0,84 — on se restreint à la colonne du médicament B.

### Dépistage : 2 % de malades, test positif chez 85 % des malades, négatif chez 95 % des sains
- P(T) = 0,02 × 0,85 + 0,98 × 0,05 = 0,066 — probabilités totales avec les deux chemins vers T.
- P_T(M) = 0,017 ÷ 0,066 ≈ 0,26 — conditionnement inversé.
- Seul un test positif sur quatre environ correspond à un malade — la maladie est rare, les faux positifs dominent.

### Bouchons : P(A) = 0,42 sur l’A6, P(B) = 0,63 sur l’A7, indépendants. Bouchon sur l’A7 mais pas l’A6 ?
- L’événement est Ā ∩ B — « mais pas » donne une intersection avec un contraire.
- Ā et B sont indépendants car A et B le sont.
- P(Ā ∩ B) = 0,58 × 0,63 = 0,3654.

## Pièges fréquents
- Appliquer « favorables ÷ total » sans équiprobabilité → vérifie que les issues ont toutes la même chance (dé pipé : non).
- Oublier de retirer P(A ∩ B) dans P(A ∪ B) → seuls des événements incompatibles permettent d’additionner directement.
- Confondre P_A(B) et P_B(A) → l’événement « sachant » est en indice et fournit le dénominateur.
- Additionner le long d’un chemin de l’arbre → on multiplie le long d’un chemin, on additionne les chemins.
- Oublier un chemin dans les probabilités totales → repère tous les chemins qui finissent sur l’événement.
- Croire qu’un test positif signifie presque sûrement être malade → calcule P_T(M), qui peut être faible si la maladie est rare.
- Confondre indépendants et incompatibles → incompatibles : P(A ∩ B) = 0 ; indépendants : P(A ∩ B) = P(A) × P(B).
- Pour « au moins un », calculer directement → passe par le contraire « aucun ».

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Entre quelles valeurs est une probabilité ? | Entre 0 et 1. |
| Que vaut P(A) en équiprobabilité ? | Favorables ÷ total. |
| Que vaut P(Ā) ? | 1 − P(A) |
| Somme des probabilités d’une loi ? | 1 |
| Formule de P(A ∪ B) ? | P(A) + P(B) − P(A ∩ B) |
| Quand dit-on A et B incompatibles ? | Quand A ∩ B = ∅. |
| Formule de P_A(B) ? | `P(A ∩ B)/P(A)`, avec P(A) ≠ 0. |
| Comment calculer P(A ∩ B) avec un arbre ? | P(A) × P_A(B) |
| Formule des probabilités totales ? | P(B) = P(A ∩ B) + P(Ā ∩ B) |
| Définition de l’indépendance ? | P(A ∩ B) = P(A) × P(B) |
| Que vaut P_A(B) si A et B sont indépendants ? | P(B) |
| Le long d’un chemin, on additionne ou on multiplie ? | On multiplie. |

# Chapitre : Variables aléatoires et loi binomiale
Source : Tva.pdf, parties 1 à 4 et 6 à 7 (Yvan Monka, « Variables aléatoires », pages 1 à 17 : variable aléatoire et loi, espérance, variance, écart-type, linéarité, variable de transition, épreuve et loi de Bernoulli, schéma de Bernoulli, loi binomiale, espérance et variance de la loi binomiale)
Niveau visé : Définir une variable aléatoire et établir sa loi, calculer et interpréter E(X), V(X), σ(X), utiliser E(aX + b) et V(aX + b), reconnaître et justifier une loi binomiale, calculer P(X = k), E(X) et V(X) pour B(n ; p), et résoudre un problème « au moins un succès ».
Prérequis : probabilités (arbres, indépendance), coefficients binomiaux C(n ; k), moyenne et variance d’une série

## Explication pour un novice
Dans beaucoup de jeux, on ne s’intéresse pas à l’issue elle-même (« roi de cœur ») mais à un nombre qui en dépend : le gain. Une **variable aléatoire** X, c’est exactement ça : une règle qui associe un nombre à chaque issue. On ne sait pas à l’avance quelle valeur elle prendra, mais on sait avec quelles probabilités.

La **loi de probabilité** de X est le tableau des valeurs possibles et de leurs probabilités. Attention aux issues qui vérifient deux conditions à la fois : si un cœur rapporte 2 € et un roi 5 €, le roi de cœur rapporte 7 €, c’est une valeur à part.

L’**espérance** E(X) est la moyenne des valeurs pondérée par leurs probabilités. C’est le gain moyen qu’on obtiendrait sur un très grand nombre de parties : si E(X) = 0,47 €, l’organisateur qui fait payer 0,50 € la partie gagne en moyenne 0,03 € par partie. La **variance** et l’**écart-type** mesurent la dispersion autour de cette moyenne, comme pour une série statistique.

Une expérience à deux issues (succès / échec) s’appelle une **épreuve de Bernoulli**. Si on la répète n fois de façon identique et indépendante, le nombre de succès suit la **loi binomiale** B(n ; p). Sa formule vient de l’arbre : chaque chemin à k succès a pour probabilité pᵏ(1 − p)ⁿ⁻ᵏ, et il y a C(n ; k) tels chemins.

Les résultats sont élégants : pour B(n ; p), l’espérance vaut np (en 30 lancers de pièce, on attend 15 piles) et la variance np(1 − p). C’est le point de départ de toute la statistique des sondages.

## Notions (dans l’ordre d’apprentissage)
- Univers : l’ensemble de toutes les issues d’une expérience | par exemple {1 ; 2 ; 3 ; 4 ; 5 ; 6}
- Variable aléatoire : associe un nombre réel à chaque issue | on note X, et (X = a) est un événement
- Loi de probabilité de X : toutes les probabilités P(X = xᵢ) | leur somme vaut 1
- Espérance : la moyenne pondérée des valeurs | `E(X) = p_1x_1 + p_2x_2 + … + p_nx_n`
- Variance : la moyenne pondérée des carrés des écarts à l’espérance | `V(X) = p_1(x_1 − E(X))^2 + … + p_n(x_n − E(X))^2`
- Écart-type : la racine de la variance, dans l’unité de X | `σ(X) = √V(X)`
- Linéarité : une transformation affine agit simplement | `E(aX + b) = aE(X) + b` et `V(aX + b) = a^2V(X)`
- Épreuve de Bernoulli : une expérience à deux issues, succès ou échec | succès de probabilité p
- Loi de Bernoulli : X vaut 1 (succès) avec probabilité p, 0 sinon | `E(X) = p`, `V(X) = p(1 − p)`
- Schéma de Bernoulli : n épreuves de Bernoulli identiques et indépendantes | univers `{0 ; 1}^n`
- Loi binomiale : la loi du nombre de succès d’un schéma de Bernoulli | `X ~ B(n ; p)`
- Probabilité binomiale : C(n ; k) chemins de probabilité pᵏ(1 − p)ⁿ⁻ᵏ | `P(X = k) = C(n ; k)p^k(1 − p)^{n − k}`
- Espérance et variance binomiales : | `E(X) = np`, `V(X) = np(1 − p)`, `σ(X) = √(np(1 − p))`

## Méthodes
### Établir la loi d’une variable aléatoire
1. Liste toutes les valeurs possibles de X (attention aux issues qui cumulent deux conditions).
2. Pour chaque valeur, compte les issues correspondantes et calcule sa probabilité.
3. Présente le tableau et vérifie que la somme des probabilités vaut 1.

### Calculer et interpréter l’espérance et la variance
1. E(X) = Σ xᵢpᵢ.
2. V(X) = Σ pᵢ(xᵢ − E(X))², ou plus rapidement V(X) = E(X²) − E(X)².
3. σ(X) = √V(X).
4. Interprète E(X) comme une moyenne sur un grand nombre de répétitions (jeu favorable si E(X) > 0).

### Simplifier avec une variable de transition
1. Pose Y = aX + b pour obtenir des valeurs simples (par exemple Y = 1000X − 1300).
2. Calcule E(Y) et V(Y).
3. Reviens à X : E(X) = (E(Y) − b) ÷ a et V(X) = V(Y) ÷ a², donc σ(X) = σ(Y) ÷ |a|.

### Justifier une loi binomiale et l’utiliser
1. Identifie l’épreuve à deux issues et le succès ; donne p.
2. Justifie que les n répétitions sont identiques et indépendantes (tirage avec remise, lancers successifs…).
3. Conclus : X compte les succès, donc X ~ B(n ; p).
4. P(X = k) = C(n ; k)pᵏ(1 − p)ⁿ⁻ᵏ ; pour « au moins un », P(X ≥ 1) = 1 − (1 − p)ⁿ.

## Exemples résolus
### 32 cartes : cœur +5 €, carreau +2 €, sinon −1 €. P(X = 5), P(X = −1), P(X ≤ 2) ?
- P(X = 5) = 8/32 = 1/4 — 8 cœurs.
- P(X = −1) = 16/32 = 1/2 — ni cœur ni carreau : les 16 piques et trèfles.
- P(X ≤ 2) = P(X = 2) + P(X = −1) = 1/4 + 1/2 = 3/4.

### Deux dés, X = la plus grande des deux valeurs. Loi de X ?
- 36 couples équiprobables — principe multiplicatif 6 × 6.
- P(X = k) = (2k − 1)/36 : 1/36, 3/36, 5/36, 7/36, 9/36, 11/36 — les couples dont le maximum vaut k.
- Vérification : 1 + 3 + 5 + 7 + 9 + 11 = 36 — la somme des probabilités vaut 1.

### 32 cartes : cœur +2 €, roi +5 € (cumulables), sinon −1 €. E(X) ?
- Valeurs : −1 (21 cartes), 2 (7 cœurs), 5 (3 rois), 7 (roi de cœur) — le roi de cœur cumule les deux gains.
- E(X) = (21 × (−1) + 7 × 2 + 3 × 5 + 1 × 7) ÷ 32 = 15/32 ≈ 0,47 — moyenne pondérée.
- Sur un grand nombre de parties, on gagne en moyenne environ 0,47 € par partie ; V(X) ≈ 5,19 et σ(X) ≈ 2,28.

### Billes : diamètres 1,298 à 1,302 cm de probabilités 0,2 ; 0,1 ; 0,2 ; 0,4 ; 0,1
- Y = 1000X − 1300 prend les valeurs −2, −1, 0, 1, 2 — variable de transition.
- E(Y) = 0,1 et V(Y) = 1,69 — calculs sur des entiers.
- E(X) = (0,1 + 1300) ÷ 1000 = 1,3001 cm et σ(X) = √1,69 ÷ 1000 = 0,0013 cm — on inverse la transformation.

### Urne de 5 boules gagnantes et 7 perdantes, 4 tirages avec remise. P(X = 3) ?
- Épreuve à deux issues, succès « gagnante » de probabilité 5/12 ; tirages identiques et indépendants grâce à la remise.
- X ~ B(4 ; 5/12).
- P(X = 3) = C(4 ; 3) × (5/12)³ × (7/12) = 875/5184 ≈ 0,17.

### On lance 5 fois un dé ; succès « 5 ou 6 ». E(S), V(S), σ(S) ?
- S ~ B(5 ; 1/3) — 5 lancers indépendants, succès de probabilité 2/6.
- E(S) = 5/3 ≈ 1,7 ; V(S) = 5 × 1/3 × 2/3 = 10/9 ; σ(S) = √10/3.

## Pièges fréquents
- Oublier une valeur qui cumule deux gains → cherche les issues qui vérifient deux conditions à la fois.
- Calculer la moyenne simple des valeurs au lieu de l’espérance → pondère chaque valeur par sa probabilité.
- Écrire V(aX + b) = aV(X) + b → la constante ne change pas la dispersion et a passe au carré : a²V(X).
- Interpréter E(X) comme le gain de chaque partie → c’est une moyenne sur un grand nombre de parties.
- Appliquer la loi binomiale à un tirage sans remise → sans remise, les tirages ne sont pas indépendants.
- Oublier C(n ; k) dans P(X = k) → pᵏ(1 − p)ⁿ⁻ᵏ n’est la probabilité que d’un seul chemin.
- Prendre n = nombre de boules → n est le nombre de répétitions.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Qu’est-ce qu’une variable aléatoire ? | Une règle qui associe un réel à chaque issue. |
| Formule de E(X) ? | Σ xᵢpᵢ |
| Formule rapide de V(X) ? | E(X²) − E(X)² |
| Que vaut E(aX + b) ? | aE(X) + b |
| Que vaut V(aX + b) ? | a²V(X) |
| Espérance d’une loi de Bernoulli ? | p |
| Variance d’une loi de Bernoulli ? | p(1 − p) |
| Qu’est-ce qu’un schéma de Bernoulli ? | n épreuves de Bernoulli identiques et indépendantes. |
| Formule de P(X = k) pour B(n ; p) ? | `C(n ; k)p^k(1 − p)^{n − k}` |
| Espérance de B(n ; p) ? | np |
| Variance de B(n ; p) ? | np(1 − p) |
| P(au moins un succès) en n essais ? | `1 − (1 − p)^n` |

# Chapitre : Sommes de variables aléatoires et loi des grands nombres
Source : Tva.pdf, parties 5 à 11 (Yvan Monka, « Variables aléatoires », pages 11 à 24 : loi d’une somme, espérance et variance d’une somme, échantillon, somme et moyenne d’un échantillon, inégalité de Bienaymé-Tchebychev, inégalité de concentration, loi des grands nombres)
Niveau visé : Établir la loi de X + Y pour des variables indépendantes, calculer l’espérance et la variance d’une somme et de la moyenne d’un échantillon, appliquer les inégalités de Bienaymé-Tchebychev et de concentration (majorant, minorant, taille d’échantillon) et interpréter la loi des grands nombres.
Prérequis : variables aléatoires, espérance, variance, loi de Bernoulli et loi binomiale, indépendance, valeur absolue et inéquations

## Explication pour un novice
Souvent, un résultat est la somme de plusieurs petits résultats aléatoires : le gain total de deux jeux, la position d’une fourmi après 30 pas, le nombre de pièces défectueuses dans un lot. Ce chapitre explique comment se comportent ces **sommes**, puis ce qui se passe quand on fait la **moyenne** d’un grand nombre de résultats.

Pour l’espérance, c’est simple : l’espérance d’une somme est la somme des espérances, toujours. Pour la variance, il faut une condition : si les variables sont **indépendantes**, les variances s’additionnent. Le hasard ne se compense pas en variance : même V(X − Y) vaut V(X) + V(Y).

Quand on répète n fois la même expérience de façon indépendante, on obtient un **échantillon**. Sa moyenne Mₙ a la même espérance que X, mais sa variance est divisée par n : la moyenne de beaucoup de mesures est bien plus stable qu’une seule mesure. Son écart-type est divisé par √n, pas par n : pour diviser l’incertitude par 2, il faut 4 fois plus de mesures.

Comment dire qu’une valeur s’écarte « rarement » de sa moyenne ? L’**inégalité de Bienaymé-Tchebychev** répond sans connaître la loi : la probabilité de s’écarter d’au moins δ est au plus V(X)/δ². Appliquée à la moyenne, elle devient l’**inégalité de concentration**, qui permet de choisir la taille d’un échantillon.

Conséquence majeure : la **loi des grands nombres**. Quand n grandit, la probabilité que la moyenne s’écarte de l’espérance d’au moins δ tend vers 0. C’est elle qui justifie que les fréquences observées se rapprochent des probabilités, et que les assurances et les sondages fonctionnent.

## Notions (dans l’ordre d’apprentissage)
- Loi d’une somme : on additionne les probabilités des couples qui donnent la somme | `P(X + Y = k) = Σ_{i + j = k} P((X = i) ∩ (Y = j))`
- Variables indépendantes : les événements (X = i) et (Y = j) sont indépendants pour tous i, j | alors `P((X = i) ∩ (Y = j)) = P(X = i) × P(Y = j)`
- Espérance d’une somme : toujours la somme des espérances | `E(X + Y) = E(X) + E(Y)`
- Variance d’une somme : la somme des variances si X et Y sont indépendantes | `V(X + Y) = V(X) + V(Y)`
- Échantillon de taille n : n variables indépendantes de même loi | `(X_1, X_2, …, X_n)`
- Somme d’un échantillon : | `E(S) = nE(X)` et `V(S) = nV(X)`
- Échantillon de Bernoulli : la somme de n variables de Bernoulli de paramètre p suit B(n ; p) | d’où `E = np`, `V = np(1 − p)`
- Moyenne d’un échantillon : | `M_n = (X_1 + … + X_n)/n`
- Espérance et dispersion de la moyenne : | `E(M_n) = E(X)`, `V(M_n) = V(X)/n`, `σ(M_n) = σ(X)/√n`
- Inégalité de Bienaymé-Tchebychev : pour tout δ > 0 | `P(|X − E(X)| ≥ δ) ≤ V(X)/δ^2`
- Inégalité de concentration : pour tout δ > 0 | `P(|M_n − E(X)| ≥ δ) ≤ V(X)/(nδ^2)`
- Loi des grands nombres : pour tout δ > 0, la probabilité d’un écart d’au moins δ tend vers 0 | `lim P(|M_n − E(X)| ≥ δ) = 0` quand n → +∞

## Méthodes
### Établir la loi de X + Y
1. Fais un tableau à double entrée des sommes x + y.
2. Pour chaque valeur k, repère tous les couples qui donnent k.
3. Probabilité d’un couple : produit P(X = x) × P(Y = y) (indépendance).
4. Probabilité de k : somme des couples (ils sont incompatibles).

### Espérance et variance d’une somme ou d’une moyenne
1. Écris la variable comme une somme de variables simples (un pas, une partie, un tirage).
2. Calcule E et V pour une seule de ces variables.
3. Somme de n : E × n et V × n (indépendance). Moyenne : E inchangée, V ÷ n, σ ÷ √n.

### Appliquer Bienaymé-Tchebychev
1. Calcule E(X) et V(X).
2. Écris l’événement sous la forme |X − E(X)| ≥ δ (ou son contraire |X − E(X)| < δ).
3. Majorant : V(X)/δ² ; pour le contraire, minorant 1 − V(X)/δ².

### Trouver une taille d’échantillon (concentration)
1. Écris l’intervalle demandé comme |Mₙ − E(X)| < δ.
2. Passe au contraire : on veut P(|Mₙ − E(X)| ≥ δ) ≤ α.
3. Il suffit que V(X)/(nδ²) ≤ α, soit n ≥ V(X)/(αδ²).
4. Arrondis à l’entier supérieur.

## Exemples résolus
### Pièce (pile 1 €, face 2 €) puis dé (pair 1 €, 3 ou 5 : 2 €, le 1 : −5 €), indépendants. Loi de S = X + Y ?
- Sommes possibles : −4, −3, 2, 3, 4 — tableau à double entrée.
- P(S = 3) = P(X = 1)P(Y = 2) + P(X = 2)P(Y = 1) = 1/6 + 1/4 = 5/12 — deux couples, indépendance.
- Loi : 1/12, 1/12, 1/4, 5/12, 1/6 pour −4, −3, 2, 3, 4 — la somme vaut 1.

### Une fourmi avance de 1 avec probabilité 2/3, recule de 1 sinon. Après n pas ?
- E(X_k) = −1 × 1/3 + 1 × 2/3 = 1/3 et V(X_k) = 8/9 — loi d’un pas.
- E(S_n) = n/3 et V(S_n) = 8n/9 — somme de variables indépendantes.
- E(S_n) = 10 donne n = 30, et σ(S_30) = √(80/3) ≈ 5,2 — la confiture est à l’abscisse 10.

### X prend de façon équiprobable −4, 0, 1, 3, 6. Moyenne M_50 ?
- E(X) = 1,2 et V(X) = 10,96 — calcul direct.
- E(M_50) = 1,2 ; V(M_50) = 10,96 ÷ 50 = 0,2192 ; σ(M_50) ≈ 3,31 ÷ √50 ≈ 0,468.

### X ~ B(20 ; 0,1). Bienaymé-Tchebychev avec δ = 2σ(X)
- E(X) = 2, V(X) = 1,8.
- P(|X − 2| ≥ 2σ) ≤ V(X)/(4V(X)) = 0,25 — et 1/9 pour 3σ, 0,0625 pour 4σ.
- Une simulation donne environ 0,04 : l’inégalité est vraie mais loin d’être optimale.

### Bernoulli de paramètre 0,2 : n pour P(0,03 < M_n < 0,37) ≥ 0,95 ?
- L’événement s’écrit |M_n − 0,2| < 0,17 — on centre sur E(X) = 0,2.
- On veut P(|M_n − 0,2| ≥ 0,17) ≤ 0,05 — événement contraire.
- V(X) = 0,16 ; 0,16 ÷ (n × 0,17²) ≤ 0,05 donne n ≥ 110,7, donc n ≥ 111.

## Pièges fréquents
- Écrire V(X + Y) = V(X) + V(Y) sans indépendance → la formule n’est vraie que pour des variables indépendantes.
- Écrire V(X − Y) = V(X) − V(Y) → c’est V(X) + V(Y) : les dispersions s’ajoutent.
- Confondre V(nX) et V(X₁ + … + Xₙ) → n²V(X) pour un même résultat multiplié par n, nV(X) pour n résultats indépendants.
- Diviser l’écart-type de la moyenne par n → σ(Mₙ) = σ(X)/√n.
- Oublier le carré de δ dans les inégalités → V(X)/δ² et V(X)/(nδ²).
- Croire que Bienaymé-Tchebychev donne la probabilité exacte → c’est un majorant, parfois même supérieur à 1.
- Lire la loi des grands nombres comme « Mₙ = E(X) pour n grand » → c’est la probabilité d’un écart qui tend vers 0.
- Arrondir n à l’entier inférieur → la condition n ≥ … impose l’entier supérieur.

## Flashcards
| Recto (question courte) | Verso (réponse courte) |
|---|---|
| Que vaut E(X + Y) ? | E(X) + E(Y), toujours. |
| Quand a-t-on V(X + Y) = V(X) + V(Y) ? | Quand X et Y sont indépendantes. |
| Que vaut V(X − Y) pour X, Y indépendantes ? | V(X) + V(Y) |
| Qu’est-ce qu’un échantillon de taille n ? | n variables indépendantes de même loi. |
| Que vaut E(Mₙ) ? | E(X) |
| Que vaut V(Mₙ) ? | V(X)/n |
| Que vaut σ(Mₙ) ? | σ(X)/√n |
| Inégalité de Bienaymé-Tchebychev ? | `P(|X − E(X)| ≥ δ) ≤ V(X)/δ^2` |
| Inégalité de concentration ? | `P(|M_n − E(X)| ≥ δ) ≤ V(X)/(nδ^2)` |
| Que dit la loi des grands nombres ? | P(|Mₙ − E(X)| ≥ δ) tend vers 0. |

## Notes pour l'intégration
- Tcombi p. 11 : Zhu Shijie est daté du « XIIe siècle » alors que son ouvrage date de 1303 (fin du XIIIe – début du XIVe siècle) ; le cours reste prudent sur cette date.
- Tproba p. 17 : la propriété « P_A(B) = P(B) » est formulée comme une définition et sans l’hypothèse P(A) ≠ 0, ajoutée ici.
- Tproba p. 19 : la remarque « Comme R et B sont indépendants » porte sur deux couleurs d’un même tirage (incompatibles) ; l’indépendance concerne en fait les deux tirages successifs.
- Tva p. 5 : premier terme de V(Y) écrit (2 − 0,1)² au lieu de (−2 − 0,1)² (corrigé p. 14). Tva p. 14 : « 10 002 V(X) » au lieu de 1000² V(X). Tva p. 16 : renvoi à « la partie 3.1 » au lieu de 7.1.
- Les simulations Python (Tva p. 21 et 24) et la lecture du tableur pour l’intervalle de fluctuation (p. 10-11) ne sont pas transformées en exercices automatiques ; la loi binomiale détaillée (calculatrice, fluctuation) est aussi traitée par la partie 3 du parcours.
