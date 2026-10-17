COURSES.splice(0,COURSES.length,...COURSES.filter(c=>c.ui>=0&&c.v2));const COURSE={},CMAP={};COURSES.forEach(c=>{COURSE[c.id]=c;c.skills.forEach(k=>CMAP[k]=c.id)});
const courseBody=c=>c.v2?coursV2(c):`${typeof pedaTop==='function'?pedaTop(c):''}<div class="ctext">${c.body}</div>${typeof pedaWhy==='function'?pedaWhy(c):''}${c.intu?`<section class="cpart intu"><h3>L’idée en une image</h3>${c.intu}</section>`:''}<div class="wid" data-w="${c.id}"></div>
  ${typeof pedaSteps==='function'?pedaSteps(c.steps,'Pas à pas : du débutant à l’expert','Ouvre les marches dans l’ordre : chacune s’appuie sur la précédente.')+pedaHist(c.hist):''}
  ${(c.parts||[]).map(([t,h])=>`<section class="cpart"><h3>${t}</h3>${h}</section>`).join('')}
  ${(c.w2||[]).map(([t,f,d],i)=>`<section class="cpart"><h3>${t}</h3><p>${d}</p><div class="wid" data-w2="${i}"></div></section>`).join('')}
  ${c.rig?`<section class="cpart rig"><h3>Le cadre précis</h3>${c.rig.map(([t,h])=>`<h4>${t}</h4>${h}`).join('')}</section>`:''}
  ${(c.ex||[]).map(([pb,st],i)=>`<section class="cpart cex"><p class="eyebrow">Exemple résolu${c.ex.length>1?' '+(i+1):''}</p><p class="pb">${pb}</p>
    <ol class="exsteps">${st.map(([m,w],j)=>`<li${j?' hidden':''}>${c.raw?m:mx(m)}${w?`<small>${w}</small>`:''}</li>`).join('')}</ol>
    ${st.length>1?`<button class="abtn" data-next>Étape suivante</button>`:''}</section>`).join('')}
  ${typeof pedaDeep==='function'?pedaDeep(c):''}
  ${c.traps?`<section class="cpart traps"><h3>Pièges fréquents</h3><ul>${c.traps.map(t=>`<li>${t}</li>`).join('')}</ul></section>`:''}
  ${typeof pedaProf==='function'?pedaProf(c.prof):''}
  <div class="keys2"><p class="eyebrow">À retenir</p><ul>${c.keys.map(k=>`<li>${k}</li>`).join('')}</ul></div>
  ${c.quiz?`<section class="cpart quiz"><h3>Vérifie que tu as compris</h3>${c.quiz.map((z,i)=>`<div class="qz" data-q="${i}"><p>${z.m?mx(z.q):z.q}</p>
    <div class="qopts">${shuffle(z.o.map((o,j)=>[o,j])).map(([o,j])=>`<button class="qopt" data-j="${j}">${z.m?mx(o):o}</button>`).join('')}</div><p class="qfb" aria-live="polite"></p></div>`).join('')}</section>`:''}`;
const mountWidget=(c,root)=>{if(c.v2)return mountV2(c,root);const el=root.querySelector(`.wid[data-w="${c.id}"]`);if(el&&c.w)c.w(el);
  (c.w2||[]).forEach(([,f],i)=>{const e2=root.querySelector(`.wid[data-w2="${i}"]`);if(e2)f(e2)});
  root.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>{const ol=b.previousElementSibling,h=ol.querySelector('li[hidden]');if(h){h.hidden=false;sfx.tap()}if(!ol.querySelector('li[hidden]'))b.hidden=true});
  root.querySelectorAll('.qz').forEach(qz=>{const z=c.quiz[+qz.dataset.q],fb=qz.querySelector('.qfb');
    qz.querySelectorAll('.qopt').forEach(b=>b.onclick=()=>{const ok=+b.dataset.j===z.a;b.classList.add(ok?'ok':'no');
      fb.innerHTML=(ok?'<b>Oui.</b> ':'<b>Non.</b> ')+z.why;fb.className='qfb '+(ok?'ok':'no');
      if(ok){qz.querySelectorAll('.qopt').forEach(x=>x.disabled=true);sfx.ok()}else{b.disabled=true;sfx.ko()}})})};
function openCourse(id){const c=COURSE[id],scr=app.querySelector('.screen');if(!c||!scr)return;
  const old=document.getElementById('courseov');if(old)old.remove();
  const ov=document.createElement('div');ov.id='courseov';ov.className='course';ov.setAttribute('role','dialog');ov.setAttribute('aria-label','Cours : '+c.title);
  ov.innerHTML=`<div class="cohead"><button class="iconbtn" id="coclose" aria-label="Fermer le cours">${I.x}</button><div><p class="eyebrow">Cours · ${UNITS[c.ui].name}</p><h2>${c.title}</h2></div></div><div class="cobody">${courseBody(c)}</div>`;
  scr.appendChild(ov);ov.querySelector('#coclose').onclick=()=>ov.remove();mountWidget(c,ov);ov.querySelector('#coclose').focus({preventScroll:true})}
function chapter(ui){
  L=null;SCREEN='chapter';const u=UNITS[ui],cs=COURSES.filter(c=>c.ui===ui);
  app.innerHTML=`<div class="screen chap"><div class="scroll prof">
    <header class="ptop"><button class="iconbtn" id="back" aria-label="Retour au parcours">${I.l}</button><h1>${u.name}</h1></header>
    <section class="chhero"><span class="node ${u.tone}"><span>${u.glyph}</span></span><div><p class="eyebrow">${TRACKS[u.tr].name} · chapitre ${u.num}</p><p>${u.sub}</p>${starsH(ST.stars[u.id]||0)}</div></section>
    <div class="cgrid"><div class="ccol">
    <section class="card"><h2>Le cours</h2><p class="empty">${cs.some(c=>c.v2)?'Trois lectures du même cours : commence par la vulgarisation, puis passe à la pratique et à l’expert.':'Ouvre une fiche et manipule l’exemple avant de t’entraîner.'}</p>
      ${cs.map(c=>c.v2?`<div class="cstart"><p>${inl(c.d.resume||'')}</p><div class="clvl">${CLV.map(([k,l,sub],i)=>`<button data-copen="${c.id}" data-lv="${k}"><b><span class="cn">${i+1}. </span>${l}</b><small>${sub}</small></button>`).join('')}</div></div>`:`<details class="fiche" data-c="${c.id}"><summary><span class="fico">${I.book}</span><span class="fst"><b>${c.title}</b><small>${c.sum}</small></span></summary><div class="fbody">${courseBody(c)}</div></details>`).join('')}</section>
    ${DECKS[u.id]&&DECKS[u.id].length?cardsPanel(u):''}
    ${recallChapter(u)}
    </div><div class="ccol">
    <section class="card"><h2>Exercices</h2><div class="sklist">${u.skills.map(k=>skRow(k)).join('')}</div></section></div></div>
  </div><div class="foot chfoot"><button class="btn" id="go">Commencer la leçon · ${u.skills.length} exercices</button></div></div>`;
  $('#back').onclick=home;$('#go').onclick=()=>{sfx.tap();start(ui)};
  wireCards(ui);wireRecallChapter(ui);
  app.querySelectorAll('[data-copen]').forEach(btn=>btn.onclick=()=>{const c=COURSE[btn.dataset.copen];c.lv=btn.dataset.lv;ST.clvl=c.lv;save();sfx.tap();openCourse(c.id)});
  app.querySelectorAll('details.fiche').forEach(d=>d.addEventListener('toggle',()=>{if(d.open&&!d.dataset.m){d.dataset.m='1';mountWidget(COURSE[d.dataset.c],d)}}));
}
