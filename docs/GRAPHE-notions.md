# Graphe de notions d'un parcours (fonction « Rappel de cours »)

## À quoi il sert

L'appli affiche une notion (« Dérivée », « Cercle trigonométrique », « Contraposée »…). L'élève tape, de mémoire, tout ce qui s'y rattache : notions voisines, formules, propriétés, méthodes. L'appli compare avec les **voisins de la notion dans le graphe** : trouvés, oubliés (avec la phrase qui explique le lien), notions reconnues mais seulement liées indirectement. Ensuite l'élève peut rebondir sur une notion oubliée : il parcourt le cours comme un réseau de notions reliées.

La qualité du graphe fait tout : des liens justes et explicites, des voisins qu'un bon élève peut réellement citer, et des **alias généreux** pour reconnaître ce que l'élève tape (avec ou sans accent, au singulier ou au pluriel, en symboles ou en mots).

## Fichier : `graph/<code>.json` (UTF-8, JSON valide)

```json
{
  "track": "tg",
  "nodes": [
    {"id": "tg-cos", "label": "Cosinus", "ch": "tg-tri", "kind": "notion",
     "aliases": ["cos", "cos x", "cosinus d'un angle"],
     "def": "Dans un triangle rectangle : côté adjacent ÷ hypoténuse ; sur le cercle : abscisse du point."}
  ],
  "edges": [
    {"a": "tg-cos", "b": "tg-sin", "rel": "cos²x + sin²x = 1 pour tout réel x."}
  ]
}
```

### Nœuds
- `id` : unique, préfixé par le code du parcours (`alg-`, `tg-`, `fs-`, `sp-`, `pr-`), en minuscules et tirets, **stable** (la progression de l'élève y est attachée).
- `label` : le nom usuel, court (1 à 5 mots), avec majuscule initiale. C'est ce qui est affiché comme question.
- `ch` : id du chapitre où la notion est enseignée (voir les chapitres du parcours dans `src/tr-<code>*.js`, ou pour Algèbre 2 : `lang`, `lin`, `exp`, `poly`, `quad`, `cplx`, `log`, `fn`).
- `kind` : `notion`, `formule`, `propriete` (théorème, règle), `methode`, `valeur` ou `objet` (fonction, courbe, ensemble…).
- `aliases` : **tout ce qu'un élève pourrait taper pour désigner ce nœud** : abréviations et symboles (`cos`, `Δ`, `delta`, `f'`, `ln`, `P(A|B)`), formes écrites (`b²-4ac`, `b^2-4ac`), synonymes, singulier/pluriel quand le pluriel change le mot, formulations courantes (« produit en croix », « règle de trois »). 3 à 10 alias. Pas d'alias ambigu partagé par deux nœuds.
- `def` : une phrase (≤ 25 mots) qui définit la notion, rigoureuse.

### Liens (arêtes, non orientées)
- `a`, `b` : ids de nœuds existants, différents.
- `rel` : **une phrase (≤ 18 mots) qui dit pourquoi les deux notions sont liées** (« La dérivée de sin est cos. », « Δ > 0 donne deux racines distinctes. »). Elle est montrée à l'élève quand il a oublié ce lien : elle doit apprendre quelque chose.
- Un lien existe seulement si un élève qui connaît bien le cours pourrait **raisonnablement citer** l'une des notions en pensant à l'autre. Pas de liens faibles du genre « les deux sont des nombres ».

### Taille et forme
- **40 à 90 nœuds** par parcours, couvrant tous les chapitres (notions centrales, formules clés, théorèmes, méthodes, pièges majeurs).
- Chaque nœud a **3 à 8 liens** (degré). Les notions centrales peuvent aller jusqu'à 12.
- Des liens **entre chapitres** : c'est ce qui fait un graphe et pas une liste (la dérivée sert à étudier les variations, l'exponentielle est solution de y′ = y…).
- Le graphe doit être **connexe** (on peut aller de n'importe quel nœud à n'importe quel autre).
- Notation française, signe « − », virgule décimale, symboles Unicode (², √, π, ≤, ∈, ∞). Pas de LaTeX, pas de HTML.

## Contrôle

`node tools/graph-check.cjs graph/<code>.json` vérifie ids, liens, degrés, connexité et alias ambigus (l'agent principal le lance).
