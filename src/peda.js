/* ---- Pédagogie progressive (produite par l'agent analyste-cours, fichiers peda/*.json) ----
   Pour chaque cours : accroche, pourquoi, histoire, marches de la découverte à l'expertise, conseils du professeur.
   L'entrée « trigo » (fa-an-b2) ajoute une section approfondie, un formulaire et des flashcards. */
PEDA.forEach(p=>{const c=COURSES.find(x=>x.id===p.id);if(!c)return;
  if(p.formulaire||p.flashcards){
    c.deep=(c.deep||[]).concat([{titre:p.titre||'Pour aller plus loin',accroche:p.accroche,niveaux:p.niveaux||[],formulaire:p.formulaire,prof:p.prof,histoire:p.histoire,source:p.source}]);
    const u=UNITS[c.ui];if(u&&p.flashcards&&p.flashcards.length){const deck=DECKS[u.id]||(DECKS[u.id]=[]);const seen=new Set(deck.map(d=>d[0]));
      p.flashcards.forEach(([f,b])=>{const ff=inl(f),bb=inl(b);if(!seen.has(ff)){deck.push([ff,bb]);seen.add(ff)}})}
    return}
  Object.assign(c,{lead:p.accroche,why:p.pourquoi,hist:p.histoire,steps:p.niveaux||[],prof:p.prof})});
const pedaTop=c=>`${c.lead?`<p class="lead">${c.lead}</p>`:''}`;
const pedaWhy=c=>c.why?`<section class="cpart why"><h3>Pourquoi cette notion ?</h3>${c.why}</section>`:'';
const pedaSteps=(steps,title,sub)=>steps&&steps.length?`<section class="cpart stairs"><h3>${title}</h3>${sub?`<p class="empty">${sub}</p>`:''}
  <ol class="stair">${steps.map((s,i)=>`<li><details${i?'':' open'}><summary><span class="sn">${i+1}</span><span>${s.titre.replace(/^Marche \d+\s*[·:.-]\s*/,'')}</span></summary><div class="sbody">${s.html}</div></details></li>`).join('')}</ol></section>`:'';
const pedaHist=(h,t='Un peu d’histoire')=>h?`<details class="cpart hist"><summary><h3>${t}</h3></summary><div class="sbody">${h}</div></details>`:'';
const pedaProf=p=>p?`<section class="cpart prof"><h3>Le conseil du prof</h3>${p}</section>`:'';
const pedaDeep=c=>(c.deep||[]).map(d=>`<section class="cpart deep"><p class="eyebrow">Approfondissement</p><h3>${d.titre}</h3>${d.accroche?`<p class="lead">${d.accroche}</p>`:''}</section>
  ${pedaSteps(d.niveaux,'Pas à pas','Ouvre les marches dans l’ordre : chacune s’appuie sur la précédente.')}
  ${d.formulaire?`<details class="cpart hist form"><summary><h3>Formulaire</h3></summary><div class="sbody ftab">${d.formulaire}</div></details>`:''}
  ${pedaHist(d.histoire,'Histoire de la trigonométrie')}${pedaProf(d.prof)}${d.source?`<p class="src">D’après : ${escH(d.source)}</p>`:''}`).join('');
