/* Chapitres du parcours Analyse, dans l'ordre pédagogique proposé par l'analyste (du novice à l'expert).
   « src » = titre exact du chapitre dans le Markdown d'analyse (cours et flashcards). */
const SKA=(id,name,gen,t)=>Object.assign(S(id,name,gen),{t});
const ANA_UNITS=[
  {id:'an-b1',tr:'ana',src:'Bases 1 — Nombres, puissances et calcul algébrique',name:'Bases : nombres et calcul',sub:'Puissances, fractions, valeur absolue, équations',glyph:'a<sup>n</sup>',tone:'c',skills:[
    SKA('b1.prod','Produit de puissances',gB1Prod,1),SKA('b1.pow','Puissance d’une puissance',gB1Pow,1),SKA('b1.frac','Somme de fractions',gB1Frac,1),SKA('b1.abs','Distance et valeur absolue',gB1Abs,1),
    SKA('b1.eq','Équation du premier degré',gB1Eq,1),SKA('b1.id','Identité remarquable',gB1Id,1),SKA('b1.int','Valeur absolue et intervalle',gB1Int,2),SKA('b1.disc','Discriminant',gB1Disc,2),SKA('b1.rac','Équation du second degré',gB1Rac,3)]},
  {id:'an-b2',tr:'ana',src:'Bases 2 — Fonctions et trigonométrie de référence',name:'Bases : fonctions et trigonométrie',sub:'Image, domaine, radians, sin et cos',glyph:'<i>f</i>(<i>x</i>)',tone:'x',skills:[
    SKA('b2.img','Calculer une image',gB2Img,1),SKA('b2.int','Valeur interdite',gB2Int,1),SKA('b2.dom','Domaine d’une racine',gB2Dom,1),SKA('b2.rad','Degrés et radians',gB2Rad,1),
    SKA('b2.trig','Valeurs remarquables',gB2Trig,1),SKA('b2.par','Parité',gFlPar,2),SKA('b2.per','Période',gB2Per,2),SKA('b2.comp','Composée',gB2Comp,2),
    SKA('tr.choix','CAH SOH TOA : choisir le rapport',gTrChoix,1),SKA('tr.rap','Rapport dans un triangle rectangle',gTrRap,1),SKA('tr.raddeg','Radians vers degrés',gTrRadDeg,1),SKA('tr.nb','Nombre de solutions sur un tour',gTrNb,1),
    SKA('tr.long','Calculer une longueur',gTrLong,2),SKA('tr.angle','Calculer un angle',gTrAngle,2),SKA('tr.princ','Mesure principale',gTrPrinc,2),SKA('tr.val','Cos et sin sur tout le cercle',gTrValeur,2),SKA('tr.der','Dériver A cos(ax + b)',gTrDer,2),
    SKA('tr.eq','Équation cos x = c ou sin x = c',gTrEq,3),SKA('tr.dup','Formules de duplication',gTrDup,3)]},
  {id:'an-fu',tr:'ana',src:'Fonctions usuelles, réciproques et hyperboliques',name:'Fonctions usuelles',sub:'Exponentielle, logarithme, réciproques, ch et sh',glyph:'e<sup><i>x</i></sup>',tone:'sq',skills:[
    SKA('fu.exp','Égalité d’exponentielles',gFuExp,1),SKA('fu.ln','Somme de logarithmes',gFuLn,1),SKA('fu.log','Logarithme en base a',gFuLog,1),
    SKA('fu.expc','Résoudre e<sup>ax</sup> = c',gFuExpC,2),SKA('fu.rec','Réciproque d’une fonction affine',gFuRec,2),SKA('fu.arc','arcsin, arccos, arctan',gFuArc,2),SKA('fu.ch','Cosinus hyperbolique',gFuCh,2),
    SKA('fu.chsh','Identité ch² − sh² = 1',gFuChSh,3),SKA('fu.argsh','Argument sinus hyperbolique',gFuArgsh,3)]},
  {id:'an-lim',tr:'ana',src:'Fonctions et limites',name:'Fonctions et limites',sub:'Domaines, formes indéterminées, continuité',glyph:'lim',tone:'sq',skills:[
    SKA('fl.ineq','Inéquations et valeur absolue',gFlIneq,1),SKA('fl.pe','Partie entière',gFlPE,1),SKA('fl.dom','Valeur interdite et domaine',gFlDom,1),
    SKA('fl.inf','Limite en +∞ d’une fraction',gFlLimInf,2),SKA('fl.00','Forme 0/0',gFl00,2),SKA('fl.rem','Limites remarquables',gFlRem,2),
    SKA('fl.e','Formes 1<sup>∞</sup> et nombre e',gFlE,3),SKA('fl.conj','Forme ∞ − ∞',gFlConj,3),SKA('fl.cont','Continuité et paramètre',gFlCont,3)]},
  {id:'an-der',tr:'ana',src:'Dérivées',name:'Dérivées',sub:'Taux, règles de calcul, tangente, extremums',glyph:'<i>f</i> ′',tone:'c',skills:[
    SKA('d.taux','Taux d’accroissement',gDTaux,1),SKA('d.pow','Dériver une puissance',gDPow,1),SKA('d.us','Dérivées usuelles',gDUs,1),
    SKA('d.quot','Dérivée d’un quotient',gDQuot,2),SKA('d.comp','Dérivée d’une composée',gDComp,2),SKA('d.tan','Équation de la tangente',gDTan,2),SKA('d.ext','Extremum',gDExt,2),
    SKA('d.opt','Optimisation',gDOpt,3),SKA('d.taf','Accroissements finis',gDTaf,3),SKA('d.hop','Règle de L’Hospital',gDHop,3)]},
  {id:'an-etude',tr:'ana',src:'Étude de fonctions et optimisation',name:'Étude de fonctions',sub:'Tangente, normale, extremums, optimisation',glyph:'max',tone:'x',skills:[
    SKA('et.pente','Pente de la tangente',gEtPente,1),SKA('et.nat','Nature d’un point critique',gEtNat,1),SKA('et.norm','Pente de la normale',gEtNorm,2),
    SKA('et.cub','Minimum local d’une cubique',gEtCub,2),SKA('et.box','Boîte de volume maximal',gEtBox,3)]},
  {id:'an-dl',tr:'ana',src:'Développements limités',name:'Développements limités',sub:'Approcher une fonction par un polynôme',glyph:'o(<i>x</i><sup>n</sup>)',tone:'x',skills:[
    SKA('dl.coef','DL usuels',gDlCoef,1),SKA('dl.eax','DL de e<sup>ax</sup>',gDlEax,1),SKA('dl.der','Lire une dérivée dans un DL',gDlDer,1),
    SKA('dl.tay','Taylor en un point',gDlTay,2),SKA('dl.prod','DL d’un produit',gDlProd,2),SKA('dl.comp','DL d’une composée',gDlComp,2),
    SKA('dl.quot','DL d’un inverse',gDlQuot,3),SKA('dl.lim','Limite par DL',gDlLim,3),SKA('dl.pos','Position / tangente',gDlPos,3),SKA('dl.asy','Asymptote oblique',gDlAsy,3)]},
  {id:'an-suites',tr:'ana',src:'Suites numériques',name:'Suites numériques',sub:'Arithmétiques, géométriques, limites, récurrence',glyph:'u<sub>n</sub>',tone:'sq',skills:[
    SKA('su.arith','Terme d’une suite arithmétique',gSuA,1),SKA('su.geo','Terme d’une suite géométrique',gSuG,1),SKA('su.var','Sens de variation',gSuVar,1),
    SKA('su.vf','Vrai ou faux : théorèmes',gSuVF,2),SKA('su.rec','Suite récurrente : premiers termes',gSuRec,2),SKA('su.limr','Limite d’une fraction en n',gSuLimR,2),
    SKA('su.ref','Limites de référence',gSuRef,2),SKA('su.somg','Somme géométrique',gSuSomG,2),SKA('su.seuil','Pourcentages et seuil',gSuSeuil,3),SKA('su.fix','Limite par point fixe',gSuFix,3)]},
  {id:'an-int',tr:'ana',src:'Intégrales',name:'Intégrales',sub:'Primitives, aires, parties, changement de variable',glyph:'∫',tone:'c',skills:[
    SKA('i.pow','Primitive d’une puissance',gIPow,1),SKA('i.us','Primitives usuelles',gIUs,1),SKA('i.aff','Intégrale d’une fonction affine',gIAff,1),
    SKA('i.poly','Intégrale d’un polynôme',gIPoly,2),SKA('i.aire','Aire entre deux courbes',gIAire,2),SKA('i.expln','Intégrales avec exp et ln',gIExpLn,2),
    SKA('i.ipp','Intégration par parties',gIIpp,3),SKA('i.chg','Changement de variable',gIChg,3),SKA('i.dec','Éléments simples',gIDec,3),SKA('i.vol','Volume de révolution',gIVol,3)]},
  {id:'an-appint',tr:'ana',src:'Applications des intégrales',name:'Applications des intégrales',sub:'Aires, volumes, longueurs, centre de gravité',glyph:'π∫<i>y</i>²',tone:'sq',skills:[
    SKA('ap.par','Aire sous une parabole',gApPar,1),SKA('ap.in','Moment d’inertie',gApIn,1),SKA('ap.sin','Aire et changement de signe',gApSin,2),
    SKA('ap.rac','Volume de révolution',gApRac,2),SKA('ap.long','Longueur d’une courbe',gApLong,2),SKA('ap.pol','Aire en coordonnées polaires',gApPol,3),SKA('ap.grav','Centre de gravité',gApGrav,3)]},
  {id:'an-series',tr:'ana',src:'Séries numériques',name:'Séries numériques',sub:'Sommes infinies, convergence, séries entières',glyph:'∑',tone:'x',skills:[
    SKA('se.sp','Somme partielle',gSeSP,1),SKA('se.gn','Nature d’une série géométrique',gSeGN,1),SKA('se.rie','Séries de Riemann',gSeRie,1),
    SKA('se.gs','Somme d’une série géométrique',gSeGS,2),SKA('se.dg','Divergence grossière',gSeDG,2),SKA('se.da','Règle de d’Alembert',gSeDA,2),
    SKA('se.ca','Règle de Cauchy',gSeCa,3),SKA('se.tel','Série télescopique',gSeTel,3),SKA('se.ray','Rayon de convergence',gSeRay,3),SKA('se.exp','Série exponentielle',gSeExp,3)]},
  {id:'an-cx',tr:'ana',src:'Nombres complexes',name:'Nombres complexes',sub:'Module, argument, forme exponentielle, racines',glyph:'<i>z</i>',tone:'sq',skills:[
    SKA('cx.pow','Puissances de i',gCxPow,1),SKA('cx.conj','Conjugué',gCxConj,1),SKA('cx.mod','Module',gCxMod,1),
    SKA('cx.mul','Produit',gCxMul,2),SKA('cx.div','Quotient',gCxDiv,2),SKA('cx.exp','Forme exponentielle',gCxExp,2),SKA('cx.eq2','Équation du second degré',gCxEq2,2),
    SKA('cx.sqrt','Racines carrées',gCxSqrt,3),SKA('cx.root','Racines n-ièmes',gCxRoot,3),SKA('cx.lieu','Lieu géométrique',gCxLieu,3)]},
  {id:'an-ed',tr:'ana',src:'Équations différentielles',name:'Équations différentielles',sub:'Premier et second ordre, modèles physiques',glyph:'<i>y</i> ″',tone:'c',skills:[
    SKA('ed.exp','Solutions de y′ = ay',gEdExp,1),SKA('ed.prim','y′ = f(x) avec condition initiale',gEdPrim,1),SKA('ed.eq','Solution d’équilibre',gEdEq,1),
    SKA('ed.ci','Premier ordre et condition initiale',gEdCi,2),SKA('ed.newton','Refroidissement de Newton',gEdNewton,2),SKA('ed.sep','Variables séparables',gEdSep,2),SKA('ed.car','Équation caractéristique',gEdCar,2),
    SKA('ed.part','Solution particulière',gEdPart,3),SKA('ed.ci2','Conditions initiales à l’ordre 2',gEdCi2,3),SKA('ed.osc','Oscillateur harmonique',gEdOsc,3)]},
];
