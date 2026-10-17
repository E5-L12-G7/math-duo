# Catalogue des générateurs existants (réutilisables tels quels)

Chaque ligne : `générateur` — nom d’origine (niveau). Ces fonctions sont déjà définies et testées dans l’appli : on peut les réutiliser dans un nouveau chapitre avec `SKA('nouvel.id','Nom',gXxx,niveau)`. Les identifiants de compétence doivent être nouveaux et uniques. Ne réutilise pas les générateurs du parcours Algèbre 2 (il reste en place).

## Ancien parcours Statistiques (générateurs définis dans equilibre.html)
### Indicateurs de position (ancien chapitre st-pos)
- `gStMean` — Moyenne d’une série
- `gStMed` — Médiane
- `gStFreq` — Fréquences
- `gStWMean` — Moyenne pondérée

### Indicateurs de dispersion (ancien chapitre st-disp)
- `gStRange` — Étendue
- `gStQuart` — Quartiles
- `gStVar` — Variance
- `gStSd` — Écart-type
- `gStSvar` — Variance corrigée

### Deux variables (ancien chapitre st-2var)
- `gStPred` — Prédiction et résidu
- `gStRint` — Interpréter r
- `gStCov` — Covariance
- `gStCorr` — Coefficient de corrélation
- `gStReg` — Droite des moindres carrés

### Dénombrement (ancien chapitre st-comb)
- `gCbFact` — Permutations
- `gCbMult` — Principe multiplicatif
- `gCbPow` — Listes avec répétition
- `gCbArr` — Arrangements
- `gCbComb` — Combinaisons

### Probabilités (ancien chapitre st-prob)
- `gPrCompl` — Événement contraire
- `gPrUnion` — Probabilité d’une union
- `gPrCond` — Probabilité conditionnelle
- `gPrIndep` — Indépendance
- `gPrTotal` — Probabilités totales
- `gPrBayes` — Formule de Bayes

### Variables aléatoires (ancien chapitre st-va)
- `gVaExp` — Espérance
- `gVaBinEV` — Espérance et variance binomiales
- `gVaVar` — Variance d’une loi
- `gVaLin` — Transformation affine
- `gVaLaw` — Reconnaître une loi binomiale
- `gVaBinP` — Probabilité binomiale

### Lois continues (ancien chapitre st-cont)
- `gLnUnif` — Loi uniforme
- `gLnZ` — Centrer et réduire
- `gLnRule` — Règle 68-95-99,7
- `gLnPhi` — Utiliser Φ
- `gLnInt` — Probabilité d’un intervalle

### Estimation et tests (ancien chapitre st-est)
- `gEsSe` — Erreur-type
- `gEsTcl` — Théorème central limite
- `gEsIcm` — IC d’une moyenne
- `gEsN` — Taille d’échantillon
- `gEsIcp` — IC d’une proportion
- `gEsTest` — Test sur une moyenne

## Ancien parcours Analyse (générateurs dans src/ana-gen*.js)
### Bases : nombres et calcul (ancien chapitre an-b1)
- `gB1Prod` — Produit de puissances (niveau 1)
- `gB1Pow` — Puissance d’une puissance (niveau 1)
- `gB1Frac` — Somme de fractions (niveau 1)
- `gB1Abs` — Distance et valeur absolue (niveau 1)
- `gB1Eq` — Équation du premier degré (niveau 1)
- `gB1Id` — Identité remarquable (niveau 1)
- `gB1Int` — Valeur absolue et intervalle (niveau 2)
- `gB1Disc` — Discriminant (niveau 2)
- `gB1Rac` — Équation du second degré (niveau 3)

### Bases : fonctions et trigonométrie (ancien chapitre an-b2)
- `gB2Img` — Calculer une image (niveau 1)
- `gB2Int` — Valeur interdite (niveau 1)
- `gB2Dom` — Domaine d’une racine (niveau 1)
- `gB2Rad` — Degrés et radians (niveau 1)
- `gB2Trig` — Valeurs remarquables (niveau 1)
- `gFlPar` — Parité (niveau 2)
- `gB2Per` — Période (niveau 2)
- `gB2Comp` — Composée (niveau 2)
- `gTrChoix` — CAH SOH TOA : choisir le rapport (niveau 1)
- `gTrRap` — Rapport dans un triangle rectangle (niveau 1)
- `gTrRadDeg` — Radians vers degrés (niveau 1)
- `gTrNb` — Nombre de solutions sur un tour (niveau 1)
- `gTrLong` — Calculer une longueur (niveau 2)
- `gTrAngle` — Calculer un angle (niveau 2)
- `gTrPrinc` — Mesure principale (niveau 2)
- `gTrValeur` — Cos et sin sur tout le cercle (niveau 2)
- `gTrDer` — Dériver A cos(ax + b) (niveau 2)
- `gTrEq` — Équation cos x = c ou sin x = c (niveau 3)
- `gTrDup` — Formules de duplication (niveau 3)

### Fonctions usuelles (ancien chapitre an-fu)
- `gFuExp` — Égalité d’exponentielles (niveau 1)
- `gFuLn` — Somme de logarithmes (niveau 1)
- `gFuLog` — Logarithme en base a (niveau 1)
- `gFuExpC` — Résoudre e<sup>ax</sup> = c (niveau 2)
- `gFuRec` — Réciproque d’une fonction affine (niveau 2)
- `gFuArc` — arcsin, arccos, arctan (niveau 2)
- `gFuCh` — Cosinus hyperbolique (niveau 2)
- `gFuChSh` — Identité ch² − sh² = 1 (niveau 3)
- `gFuArgsh` — Argument sinus hyperbolique (niveau 3)

### Fonctions et limites (ancien chapitre an-lim)
- `gFlIneq` — Inéquations et valeur absolue (niveau 1)
- `gFlPE` — Partie entière (niveau 1)
- `gFlDom` — Valeur interdite et domaine (niveau 1)
- `gFlLimInf` — Limite en +∞ d’une fraction (niveau 2)
- `gFl00` — Forme 0/0 (niveau 2)
- `gFlRem` — Limites remarquables (niveau 2)
- `gFlE` — Formes 1<sup>∞</sup> et nombre e (niveau 3)
- `gFlConj` — Forme ∞ − ∞ (niveau 3)
- `gFlCont` — Continuité et paramètre (niveau 3)

### Dérivées (ancien chapitre an-der)
- `gDTaux` — Taux d’accroissement (niveau 1)
- `gDPow` — Dériver une puissance (niveau 1)
- `gDUs` — Dérivées usuelles (niveau 1)
- `gDQuot` — Dérivée d’un quotient (niveau 2)
- `gDComp` — Dérivée d’une composée (niveau 2)
- `gDTan` — Équation de la tangente (niveau 2)
- `gDExt` — Extremum (niveau 2)
- `gDOpt` — Optimisation (niveau 3)
- `gDTaf` — Accroissements finis (niveau 3)
- `gDHop` — Règle de L’Hospital (niveau 3)

### Étude de fonctions (ancien chapitre an-etude)
- `gEtPente` — Pente de la tangente (niveau 1)
- `gEtNat` — Nature d’un point critique (niveau 1)
- `gEtNorm` — Pente de la normale (niveau 2)
- `gEtCub` — Minimum local d’une cubique (niveau 2)
- `gEtBox` — Boîte de volume maximal (niveau 3)

### Développements limités (ancien chapitre an-dl)
- `gDlCoef` — DL usuels (niveau 1)
- `gDlEax` — DL de e<sup>ax</sup> (niveau 1)
- `gDlDer` — Lire une dérivée dans un DL (niveau 1)
- `gDlTay` — Taylor en un point (niveau 2)
- `gDlProd` — DL d’un produit (niveau 2)
- `gDlComp` — DL d’une composée (niveau 2)
- `gDlQuot` — DL d’un inverse (niveau 3)
- `gDlLim` — Limite par DL (niveau 3)
- `gDlPos` — Position / tangente (niveau 3)
- `gDlAsy` — Asymptote oblique (niveau 3)

### Suites numériques (ancien chapitre an-suites)
- `gSuA` — Terme d’une suite arithmétique (niveau 1)
- `gSuG` — Terme d’une suite géométrique (niveau 1)
- `gSuVar` — Sens de variation (niveau 1)
- `gSuVF` — Vrai ou faux : théorèmes (niveau 2)
- `gSuRec` — Suite récurrente : premiers termes (niveau 2)
- `gSuLimR` — Limite d’une fraction en n (niveau 2)
- `gSuRef` — Limites de référence (niveau 2)
- `gSuSomG` — Somme géométrique (niveau 2)
- `gSuSeuil` — Pourcentages et seuil (niveau 3)
- `gSuFix` — Limite par point fixe (niveau 3)

### Intégrales (ancien chapitre an-int)
- `gIPow` — Primitive d’une puissance (niveau 1)
- `gIUs` — Primitives usuelles (niveau 1)
- `gIAff` — Intégrale d’une fonction affine (niveau 1)
- `gIPoly` — Intégrale d’un polynôme (niveau 2)
- `gIAire` — Aire entre deux courbes (niveau 2)
- `gIExpLn` — Intégrales avec exp et ln (niveau 2)
- `gIIpp` — Intégration par parties (niveau 3)
- `gIChg` — Changement de variable (niveau 3)
- `gIDec` — Éléments simples (niveau 3)
- `gIVol` — Volume de révolution (niveau 3)

### Applications des intégrales (ancien chapitre an-appint)
- `gApPar` — Aire sous une parabole (niveau 1)
- `gApIn` — Moment d’inertie (niveau 1)
- `gApSin` — Aire et changement de signe (niveau 2)
- `gApRac` — Volume de révolution (niveau 2)
- `gApLong` — Longueur d’une courbe (niveau 2)
- `gApPol` — Aire en coordonnées polaires (niveau 3)
- `gApGrav` — Centre de gravité (niveau 3)

### Séries numériques (ancien chapitre an-series)
- `gSeSP` — Somme partielle (niveau 1)
- `gSeGN` — Nature d’une série géométrique (niveau 1)
- `gSeRie` — Séries de Riemann (niveau 1)
- `gSeGS` — Somme d’une série géométrique (niveau 2)
- `gSeDG` — Divergence grossière (niveau 2)
- `gSeDA` — Règle de d’Alembert (niveau 2)
- `gSeCa` — Règle de Cauchy (niveau 3)
- `gSeTel` — Série télescopique (niveau 3)
- `gSeRay` — Rayon de convergence (niveau 3)
- `gSeExp` — Série exponentielle (niveau 3)

### Nombres complexes (ancien chapitre an-cx)
- `gCxPow` — Puissances de i (niveau 1)
- `gCxConj` — Conjugué (niveau 1)
- `gCxMod` — Module (niveau 1)
- `gCxMul` — Produit (niveau 2)
- `gCxDiv` — Quotient (niveau 2)
- `gCxExp` — Forme exponentielle (niveau 2)
- `gCxEq2` — Équation du second degré (niveau 2)
- `gCxSqrt` — Racines carrées (niveau 3)
- `gCxRoot` — Racines n-ièmes (niveau 3)
- `gCxLieu` — Lieu géométrique (niveau 3)

### Équations différentielles (ancien chapitre an-ed)
- `gEdExp` — Solutions de y′ = ay (niveau 1)
- `gEdPrim` — y′ = f(x) avec condition initiale (niveau 1)
- `gEdEq` — Solution d’équilibre (niveau 1)
- `gEdCi` — Premier ordre et condition initiale (niveau 2)
- `gEdNewton` — Refroidissement de Newton (niveau 2)
- `gEdSep` — Variables séparables (niveau 2)
- `gEdCar` — Équation caractéristique (niveau 2)
- `gEdPart` — Solution particulière (niveau 3)
- `gEdCi2` — Conditions initiales à l’ordre 2 (niveau 3)
- `gEdOsc` — Oscillateur harmonique (niveau 3)

## Parcours Algèbre 2 (toujours en place, pour information seulement)
### Le langage des maths (ancien chapitre lang)
- `gSet` — Ensembles de nombres
- `gIntv` — Écrire un intervalle
- `gIntv2` — Lire un intervalle
- `gSol` — Ensemble des solutions
- `gLogic` — Implication et quantificateurs

### Équations et inéquations (ancien chapitre lin)
- `gLin1` — Isoler x
- `gLin2` — x des deux côtés
- `gLin4` — Développer puis résoudre
- `gLin3` — Coefficient fractionnaire
- `gIneq` — Inéquations

### Puissances (ancien chapitre exp)
- `gE1` — Produit de puissances
- `gE2` — Puissance de puissance
- `gE3` — Quotient de puissances
- `gE4` — Exposants négatifs
- `gE5` — Règles combinées
- `gE6` — Puissance d’un monôme

### Polynômes (ancien chapitre poly)
- `gDev1` — Développer un produit
- `gDev2` — Identités remarquables
- `gDev3` — Développer avec coefficient
- `gFac1` — Factoriser un trinôme
- `gFac2` — Différence de deux carrés
- `gFac3` — Factoriser avec coefficient

### Second degré (ancien chapitre quad)
- `gQ1` — Résoudre par factorisation
- `gQ2` — Calculer le discriminant
- `gQ3` — Nombre de solutions
- `gQ4` — Sommet d’une parabole

### Radicaux et complexes (ancien chapitre cplx)
- `gC1` — Simplifier une racine
- `gC2` — Puissances de i
- `gC3` — Produit de complexes
- `gC4` — Somme de complexes

### Exponentielles et logarithmes (ancien chapitre log)
- `gL1` — Calculer un logarithme
- `gL2` — Résoudre log(x) = k
- `gL3` — Équation exponentielle
- `gL4` — Log d’un produit
- `gL5` — Log d’un quotient

### Fonctions (ancien chapitre fn)
- `gF1` — Composition de fonctions
- `gF2` — Fonction réciproque
- `gF3` — Image d’un nombre
