# Brief commun aux agents de contenu (octobre 2026)

Tu travailles sur l'appli Équilibre, dossier `C:\Users\etien\maths-duo`. Avant toute chose, lis en entier :
1. `docs/GUIDE-parcours.md` — comment construire un parcours (fichiers, API des exercices, type « raisonnement à choix », tests). **Obligatoire.**
2. `.claude/agents/analyste-cours.md` — ta posture pédagogique et le format des cours (Markdown) et de la pédagogie progressive (JSON).
3. `.claude/agents/createur-flashcards.md` — les règles et le format des flashcards.
4. `docs/catalogue-generateurs.md` — les générateurs d'exercices déjà écrits et testés, réutilisables.

Ce que veut l'utilisatrice / l'utilisateur, à respecter scrupuleusement :
- Des cours qui partent de la **vulgarisation** et vont vers l'**expertise**, avec un **maximum d'explications**, une **mise en perspective historique** (faits établis seulement), un **ton amical** qui explique **pourquoi** chaque notion existe, puis l'approche d'un **professeur de maths habitué aux explications progressives** (marches successives, chacune s'appuyant sur la précédente). Rigueur intacte : hypothèses des théorèmes toujours dites.
- Des **flashcards** propres à chaque chapitre : toujours une **question**, une **réponse rapide** (≤ 15 mots), un socle de connaissances solide, une étiquette SRS (`definition`, `formule`, `propriete`, `methode`, `piege`, `valeur`, `histoire`) et un niveau 1 à 3. 20 à 40 cartes par chapitre.
- Des **exercices de raisonnement à choix** (`chain`) partout où c'est possible : l'élève construit sa démarche en choisissant à chaque étape parmi plusieurs propositions ; il doit **pouvoir se tromper dans son raisonnement avant de valider** ; les propositions restent **dans le sujet** et **ne sont pas farfelues** (ce sont des erreurs réelles d'élèves). Au moins 2 par chapitre, davantage si le sujet s'y prête.
- Les exercices classiques (`nq`, `mcq`, `exprQ`) restent nécessaires pour l'entraînement : 6 à 12 compétences par chapitre au total, niveaux 1 à 3, du plus simple au niveau des documents.

Méthode :
1. Lis entièrement chaque document source (PDF : par tranches de 20 pages maximum avec le paramètre `pages`, jusqu'à la fin). Ne résume jamais ce que tu n'as pas lu. Note les exercices types.
2. Découpe en chapitres (en général un par document, éventuellement deux si un document est très long), dans un ordre progressif.
3. Écris les cours (`analyse/…md`), puis la pédagogie (`peda/…json`), puis les chapitres et exercices (`src/tr-….js`), puis les flashcards (`cards/…json`, clés = id des chapitres, ids de cartes préfixés par l'id du chapitre, ex. `tg-tri-01`).
4. Teste avec `npm run build` puis `node tools/check.cjs dist/index.html --track <code>` (voir le guide) jusqu'à 0 échec et 0 avertissement. Vérifie aussi que tes JSON sont valides (`python -c "import json;json.load(open(r'…',encoding='utf-8'))"`).

Règles de cohabitation (plusieurs agents travaillent en même temps) :
- N'écris **que tes propres fichiers** (listés dans ta mission). Ne modifie jamais `src/core/`, `src/manifest.json`, `vite.config.ts`, `src/ana-*.js`, `src/chain.js`, `tools/`, `docs/`, ni les fichiers d'un autre parcours. Si tu as besoin d'un outil commun absent, définis-le dans ton fichier avec ton préfixe.
- Si plusieurs agents travaillent en parallèle, le build commun peut échouer à cause du fichier d'un autre : signale-le sans le modifier.

Rapport final (court) : fichiers écrits ; pour chaque chapitre : id, titre, nombre de compétences (dont raisonnements), nombre de flashcards ; résultat du test ; incohérences ou erreurs repérées dans les documents sources ; ce que tu n'as pas pu traiter.
