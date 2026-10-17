# Équilibre

Appli d'apprentissage des mathématiques, en français, pour téléphone. Tout reste sur l'appareil : pas de compte, pas de serveur.
Cinq parcours : Algèbre 2, Trigonométrie, Fonctions et suites, Statistiques et probabilités, Apprendre à prouver.

## Commandes

| Commande | Effet |
|---|---|
| `npm install` | Installe les outils (une seule fois) |
| `npm run dev` | Serveur de développement sur http://localhost:8766, rechargement automatique à chaque modification |
| `npm run build` | Produit `dist/index.html` (appli complète en un fichier) et `dist/equilibre.html` (version à publier sur claude.ai) |
| `npm run check` | Build puis contrôle automatique : génère des milliers de questions et vérifie réponses, QCM, raisonnements, cours et cartes |
| `npm run typecheck` | Vérification TypeScript |

## Organisation

- `index.html` : coquille de la page. `src/main.ts` : point d'entrée Vite.
- `src/manifest.json` : **l'ordre d'assemblage** des styles et du code. Le code est concaténé en un seul module par `tools/assemble.mjs` (donc un nom déclaré deux fois fait échouer le build).
- `src/core/` : le cœur de l'appli (utilitaires, moteur d'expressions, écrans, balance, cours interactifs…). `src/styles/` : styles de base.
- `src/*.js` à la racine de `src/` : modules thématiques (calculatrice, brouillon, SRS, raisonnements à choix, widgets…).
- `src/tr-<parcours>*.js` : chapitres et générateurs d'exercices de chaque parcours ; `src/ana-gen*.js` : générateurs réutilisables.
- Contenu : `analyse/*.md` (cours), `peda/*.json` (pédagogie progressive), `cards/*.json` (flashcards).
- `tools/` : assemblage, artefact claude.ai, banc de test (`check.cjs`, `load.cjs`, `ev-test.cjs`).
- `docs/` : guide de création d'un parcours et catalogue des générateurs. `archive/` : anciennes versions et ancienne chaîne de build.

## Feuille de route

1. ✅ Projet Vite + TypeScript, code découpé en fichiers, build en un fichier identique à l'ancien.
2. Tests Vitest (moteur, générateurs) et validation du contenu par schémas Zod.
3. Stockage IndexedDB (Dexie) + export / import de la progression.
4. PWA installable et hors connexion.
5. KaTeX, FSRS, migration progressive des écrans vers Preact et des fichiers vers de vrais modules ES typés.
