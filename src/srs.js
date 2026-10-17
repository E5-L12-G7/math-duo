/* ---- Flashcards : répétition espacée (SRS, variante de SM-2) ----
   Après avoir vu la réponse, l'élève note sa carte : À revoir (0), Difficile (1), Bien (2), Facile (3).
   Chaque carte garde un intervalle (jours) et un facteur de facilité : une carte bien sue revient de plus en plus tard,
   une carte oubliée revient dans la même séance. État par carte : ST.cards[id] = {r, iv, ef, due, lp, g, last}. */
const DECKS={};
const dayN=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);
const CTAG={definition:'Définition',formule:'Formule',propriete:'Propriété',methode:'Méthode',piege:'Piège',valeur:'Valeur',histoire:'Histoire'};
const GRADES=[['À revoir','again'],['Difficile','hard'],['Bien','good'],['Facile','easy']];
const cardsOf=uid=>(DECKS[uid]||[]).map((c,i)=>Array.isArray(c)?{id:uid+'#'+i,uid,f:c[0],b:c[1]}:{id:c.id,uid,f:c.q,b:c.a,why:c.why,tag:c.tag,lv:c.lv||1});
const LEGI=[0,1,3,7,16];
function cst(id){const t=(ST.cards||{})[id];if(t&&t.ef===undefined&&t.box!==undefined){t.iv=LEGI[t.box]||0;t.ef=2.5;t.r=t.box;t.lp=0;delete t.box}return t}
/* Prochain état d'une carte selon la note g (fonction pure, sert aussi à afficher l'intervalle sur chaque bouton). */
function sched(t,g,today=dayN()){
  const s=t?{...t}:{r:0,iv:0,ef:2.5,lp:0};
  if(!t||!s.r){s.iv=[0,1,2,4][g];if(g)s.r=1;if(g===3)s.ef+=.15}
  else if(g===0){s.iv=0;s.r=0;s.lp=(s.lp||0)+1;s.ef=Math.max(1.3,s.ef-.2)}
  else if(g===1){s.iv=Math.max(1,Math.round(s.iv*1.2));s.ef=Math.max(1.3,s.ef-.15);s.r++}
  else if(g===2){s.iv=Math.max(s.iv+1,Math.round(s.iv*s.ef));s.r++}
  else{s.iv=Math.max(s.iv+2,Math.round(s.iv*s.ef*1.3));s.ef+=.15;s.r++}
  s.iv=Math.min(365,s.iv);s.due=today+s.iv;s.g=g;s.last=Date.now();return s}
const ivTxt=d=>d<1?'< 10 min':d<30?`${d} j`:d<365?`${Math.round(d/30)} mois`:'1 an';
/* Catégories : nouvelle, en apprentissage (intervalle 0), jeune (< 21 j), acquise (≥ 21 j) */
const ccat=t=>!t?'new':!t.iv?'learn':t.iv<21?'young':'mature';
function deckStats(uids,tag){const today=dayN(),o={n:0,known:0,due:0,fresh:0,learn:0,young:0,mature:0,tags:{}};
  uids.forEach(u=>cardsOf(u).forEach(c=>{if(c.tag)o.tags[c.tag]=(o.tags[c.tag]||0)+1;if(tag&&c.tag!==tag)return;o.n++;const t=cst(c.id),k=ccat(t);
    if(k==='new')o.fresh++;else{o[k]++;if(t.due<=today)o.due++;if(t.iv>=7)o.known++}}));return o}
const distBar=st=>{const seg=[['mature','var(--good)','acquises'],['young','var(--t-sq)','jeunes'],['learn','var(--t-c)','en apprentissage']];
  return`<div class="cdist" role="img" aria-label="${seg.map(([k,,l])=>`${st[k]} ${l}`).join(', ')}, ${st.fresh} nouvelles sur ${st.n}">${seg.map(([k,c])=>st[k]?`<i style="width:${st[k]/st.n*100}%;background:${c}"></i>`:'').join('')}</div>
    <div class="clegend">${seg.map(([k,c,l])=>`<span><i style="background:${c}"></i>${st[k]} ${l}</span>`).join('')}<span><i style="background:var(--line)"></i>${st.fresh} nouvelles</span></div>`};
let CARDKEY=null;
function cardSession(uids,title,back,only,tag){
  const today=dayN(),all=uids.flatMap(cardsOf).filter(c=>!tag||c.tag===tag);
  let queue;
  if(only)queue=shuffle([...only]);
  else{const due=all.filter(c=>{const t=cst(c.id);return t&&t.due<=today}).sort((a,b)=>cst(a.id).due-cst(b.id).due||cst(a.id).iv-cst(b.id).iv).slice(0,30);
    const fresh=all.filter(c=>!cst(c.id)).sort((a,b)=>(a.lv||1)-(b.lv||1)).slice(0,Math.max(0,15-due.length));
    queue=[...shuffle(due),...fresh];if(!queue.length)queue=shuffle([...all]).slice(0,10)}
  const S2={queue,i:0,flip:false,cnt:[0,0,0,0],miss:[],again:{},free:!only&&!all.some(c=>!cst(c.id)||cst(c.id).due<=today)};
  L=null;SCREEN='cards';
  const grade=g=>{const c=S2.queue[S2.i];ST.cards=ST.cards||{};
    if(S2.free&&cst(c.id)&&g>0){/* révision libre : on ne bouscule pas le calendrier d'une carte déjà bien planifiée */}
    else ST.cards[c.id]=sched(cst(c.id),g,today);
    S2.cnt[g]++;(g?sfx.ok:sfx.ko)();
    if(g===0){if(!S2.miss.includes(c))S2.miss.push(c);S2.again[c.id]=(S2.again[c.id]||0)+1;if(S2.again[c.id]<=3)S2.queue.splice(Math.min(S2.queue.length,S2.i+4),0,c)}
    save();S2.i++;S2.flip=false;S2.i>=S2.queue.length?end():draw()};
  const end=()=>{CARDKEY=null;const ok=S2.cnt[1]+S2.cnt[2]+S2.cnt[3],gain=ok*2;if(gain){ST.xp+=gain;const d=dkey();if(ST.day.d!==d)ST.day={d,xp:0};ST.day.xp+=gain}save();
    const st=deckStats(uids,tag),next=uids.flatMap(cardsOf).map(c=>cst(c.id)).filter(t=>t&&t.due>today).reduce((m,t)=>Math.min(m,t.due),Infinity);
    app.innerHTML=`<div class="screen"><div class="res">
      <div><p class="eyebrow">${title}</p><h1>Séance terminée</h1></div>
      <div class="stats four">${GRADES.map(([l],g)=>`<div class="stat g${g}"><b>${S2.cnt[g]}</b><span>${l}</span></div>`).join('')}</div>
      <div class="rsk"><p class="eyebrow">État du paquet${tag?' · '+CTAG[tag]:''}</p>${distBar(st)}
        <p class="empty">Une carte est <b>acquise</b> quand son intervalle atteint 21 jours. ${isFinite(next)?`Prochaines révisions : ${next-today<=1?'demain':'dans '+(next-today)+' jours'}.`:''} +${gain} XP.</p></div>
      <div class="btns">${S2.miss.length?`<button class="btn" id="again">Revoir les ${S2.miss.length} carte${S2.miss.length>1?'s':''} oubliée${S2.miss.length>1?'s':''}</button>`:''}<button class="btn ghost" id="back">Retour</button></div>
    </div></div>`;
    if($('#again'))$('#again').onclick=()=>cardSession(uids,title,back,S2.miss);$('#back').onclick=back};
  const draw=()=>{const c=S2.queue[S2.i],t=cst(c.id),n=S2.queue.length,k=ccat(t);
    const status=k==='new'?'Nouvelle carte':k==='learn'?'En apprentissage':`Révision · intervalle ${ivTxt(t.iv)}`;
    app.innerHTML=`<div class="screen">
      <div class="ltop"><button class="iconbtn" id="cq" aria-label="Quitter la séance">${I.x}</button><div class="prog"><i style="width:${S2.i/n*100}%"></i></div><span class="ccount">${S2.i+1} / ${n}</span></div>
      <div class="scroll fcwrap">
        <p class="eyebrow">${title}${S2.free?' · révision libre':''}</p>
        <button class="fcard${S2.flip?' flipped':''}" id="card" aria-label="${S2.flip?'Réponse affichée':'Retourner la carte pour voir la réponse'}">
          <span class="fin"><span class="fface front"><span class="fclab">${c.tag?`<span class="ctag t-${c.tag}">${CTAG[c.tag]||c.tag}</span>`:''}${status}</span><span class="fctext">${c.f}</span><span class="fchint">Réponds dans ta tête, puis touche la carte</span></span>
          <span class="fface back"><span class="fcq">${c.f}</span><span class="fclab">Réponse</span><span class="fctext">${c.b}</span>${c.why?`<span class="fcwhy">${c.why}</span>`:''}</span></span></button>
        <p class="fcnote">${S2.flip?'Note honnêtement ta réponse : c’est elle qui règle quand la carte reviendra.':'Une question, une réponse rapide : vise moins de 5 secondes.'}</p>
      </div>
      <div class="foot">${S2.flip?`<div class="grades">${GRADES.map(([l,cl],g)=>`<button class="gbtn ${cl}" data-g="${g}"><b>${l}</b><small>${ivTxt(sched(t,g,today).iv)}</small></button>`).join('')}</div>`:`<button class="btn" id="show">Voir la réponse</button>`}</div></div>`;
    $('#cq').onclick=()=>{CARDKEY=null;back()};
    const flip=()=>{if(!S2.flip){S2.flip=true;sfx.tap();draw()}};
    $('#card').onclick=flip;if($('#show'))$('#show').onclick=flip;
    app.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>grade(+b.dataset.g));
    CARDKEY=e=>{if(e.key===' '||e.key==='Enter'){if(!S2.flip){e.preventDefault();flip()}}else if(S2.flip&&/^[1-4]$/.test(e.key)){e.preventDefault();grade(+e.key-1)}}};
  draw();
}
/* Panneau « Cartes » d'un chapitre : état du paquet et révision par étiquette */
function cardsPanel(u){const st=deckStats([u.id]),tags=Object.entries(st.tags);
  return`<section class="card"><h2>Cartes de cours</h2>
    <p class="empty">${st.n} questions à réponse rapide pour bâtir ton socle : définitions, formules, réflexes. ${st.due?`<b>${st.due} à revoir aujourd’hui.</b>`:st.fresh?`${st.fresh} nouvelles à découvrir.`:'Rien à revoir aujourd’hui.'}</p>
    ${distBar(st)}
    <button class="btn ghost" id="cards">Réviser les cartes</button>
    ${tags.length>1?`<p class="uh">Réviser par thème</p><div class="tagrow">${tags.map(([t,n])=>`<button class="ctag t-${t}" data-tag="${t}">${CTAG[t]||t} · ${n}</button>`).join('')}</div>`:''}</section>`}
function wireCards(ui){const u=UNITS[ui];if($('#cards'))$('#cards').onclick=()=>{sfx.tap();cardSession([u.id],u.name,()=>chapter(ui))};
  app.querySelectorAll('[data-tag]').forEach(b=>b.onclick=()=>{sfx.tap();const t=b.dataset.tag;cardSession([u.id],u.name+' · '+(CTAG[t]||t),()=>chapter(ui),null,t)})}
