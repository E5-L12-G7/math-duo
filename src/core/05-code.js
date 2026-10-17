const UNITS=[
  {id:'lang',name:'Le langage des maths',sub:'Symboles, ensembles, intervalles, rédaction',glyph:'∀∈',tone:'c',skills:[
    S('lang.ens','Ensembles de nombres',gSet),S('lang.int','Écrire un intervalle',gIntv),S('lang.int2','Lire un intervalle',gIntv2),
    S('lang.sol','Ensemble des solutions',gSol),S('lang.logic','Implication et quantificateurs',gLogic)]},
  {id:'lin',name:'Équations et inéquations',sub:'Équilibrer, développer, inverser le sens',glyph:'a<i>x</i>+b',tone:'x',skills:[
    S('lin.simple','Isoler x',gLin1),S('lin.both','x des deux côtés',gLin2),S('lin.paren','Développer puis résoudre',gLin4),
    S('lin.frac','Coefficient fractionnaire',gLin3),S('ineq.lin','Inéquations',gIneq),S('lin.r','Raisonner : résoudre une équation',gLinR),S('ineq.r','Raisonner : résoudre une inéquation',gIneqR)]},
  {id:'exp',name:'Puissances',sub:'Règles des exposants',glyph:'<i>x</i><sup>n</sup>',tone:'sq',skills:[
    S('exp.prod','Produit de puissances',gE1),S('exp.pow','Puissance de puissance',gE2),S('exp.quot','Quotient de puissances',gE3),
    S('exp.neg','Exposants négatifs',gE4),S('exp.mix','Règles combinées',gE5),S('exp.coef','Puissance d’un monôme',gE6),S('exp.r','Raisonner : enchaîner les règles',gPowR)]},
  {id:'poly',name:'Polynômes',sub:'Développer et factoriser',glyph:'(<i>x</i>+a)<sup>2</sup>',tone:'c',skills:[
    S('dev.prod','Développer un produit',gDev1),S('dev.sq','Identités remarquables',gDev2),S('dev.coef','Développer avec coefficient',gDev3),
    S('fac.tri','Factoriser un trinôme',gFac1),S('fac.diff','Différence de deux carrés',gFac2),S('fac.coef','Factoriser avec coefficient',gFac3),S('fac.r','Raisonner : reconnaître une identité',gFacR)]},
  {id:'quad',name:'Second degré',sub:'Racines, discriminant, sommet',glyph:'Δ',tone:'x',skills:[
    S('q.roots','Résoudre par factorisation',gQ1),S('q.delta','Calculer le discriminant',gQ2),S('q.count','Nombre de solutions',gQ3),S('q.vertex','Sommet d’une parabole',gQ4),S('q.r','Raisonner : résoudre avec Δ',gQuadR)]},
  {id:'cplx',name:'Radicaux et complexes',sub:'Racines carrées, nombre i',glyph:'a+b<i>i</i>',tone:'sq',skills:[
    S('rad.simp','Simplifier une racine',gC1),S('i.pow','Puissances de i',gC2),S('c.mul','Produit de complexes',gC3),S('c.add','Somme de complexes',gC4)]},
  {id:'log',name:'Exponentielles et logarithmes',sub:'Résoudre avec des logs',glyph:'log',tone:'c',skills:[
    S('log.eval','Calculer un logarithme',gL1),S('log.solve','Résoudre log(x) = k',gL2),S('exp.eq','Équation exponentielle',gL3),
    S('log.sum','Log d’un produit',gL4),S('log.diff','Log d’un quotient',gL5),S('log.r','Raisonner : équation exponentielle',gExpEqR)]},
  {id:'fn',name:'Fonctions',sub:'Composée, réciproque, image',glyph:'<i>f</i>∘<i>g</i>',tone:'x',skills:[
    S('f.comp','Composition de fonctions',gF1),S('f.inv','Fonction réciproque',gF2),S('f.eval','Image d’un nombre',gF3)]},
];
