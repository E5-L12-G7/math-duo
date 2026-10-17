/* ---- Paquets de flashcards produits par l'agent createur-flashcards (cards/*.json) ----
   Clé = identifiant du chapitre. Quand un chapitre a son paquet de questions, il remplace l'ancien paquet. */
Object.entries(CARDS_SRC).forEach(([uid,list])=>{if(!UNITS.some(u=>u.id===uid)||!list.length)return;
  DECKS[uid]=list.filter(c=>c&&c.id&&c.q&&c.a).map(c=>({id:'q:'+c.id,q:inl(c.q),a:inl(c.a),why:c.pourquoi?inl(c.pourquoi):'',tag:c.tag,lv:c.niveau||1}))});
