/* ---- Résultats ---- */
function results(){
  const win=L.hearts>0,acc=Math.round(L.ok/Math.max(1,L.ok+L.ko)*100),stars=!win?0:L.ui===-3?(acc>=90?3:acc>=70?2:acc>=50?1:0):L.hearts;
  const d=dkey();
  if(win){
    ST.xp+=L.xp;if(ST.day.d!==d)ST.day={d,xp:0};ST.day.xp+=L.xp;
    const h=ST.hist[ST.hist.length-1];if(h&&h.d===d)h.xp=(h.xp||0)+L.xp;
    if(ST.streak.last!==d){ST.streak.n=ST.streak.last===dkey(1)?ST.streak.n+1:1;ST.streak.last=d}
    if(L.ui>=0){const id=UNITS[L.ui].id;ST.stars[id]=Math.max(ST.stars[id]||0,stars)}
    save();sfx.win();confetti();
  }
  const ui=L.ui,tl=Object.keys(L.touched).map(id=>SK[id]).filter(Boolean);
  app.innerHTML=`<div class="screen"><div class="res">
    <div class="bigstars">${[0,1,2].map(i=>I.star.replace('class="i"',`class="i${i<stars?' on':''}"`)).join('')}</div>
    <div><p class="eyebrow">${lname(ui)}</p><h1>${win?(L.ok===L.log.length&&L.log.length?'Sans faute !':L.cfg?'Série terminée':'Leçon terminée'):'Plus de vies'}</h1></div>
    <p style="color:var(--muted);max-width:32ch">${win?`Ta série passe à ${ST.streak.n} jour${ST.streak.n>1?'s':''}.`:'Relis les solutions et retente la leçon : les questions changent à chaque fois.'}</p>
    <div class="stats"><div class="stat"><b>+${win?L.xp:0}</b><span>XP</span></div><div class="stat"><b>${acc} %</b><span>Précision</span></div><div class="stat"><b>×${L.maxCombo}</b><span>Meilleure série</span></div></div>
    ${tl.length?`<div class="rsk"><p class="eyebrow">Compétences travaillées</p>${tl.map(k=>`<div class="rrow"><span>${k.name}</span>${lvPill(level(k.id))}</div>`).join('')}</div>`:''}
    ${L.code?`<div class="codebox"><span>Code de la série</span><b id="scode">${L.code}</b><button class="abtn" id="copy">Copier</button></div>`:''}
    ${L.log.length?`<details class="review"><summary>Voir le corrigé · ${L.log.filter(r=>r.ok).length} / ${L.log.length} juste${L.log.filter(r=>r.ok).length>1?'s':''}</summary>
      <ol>${L.log.map((r,i)=>`<li><div class="rvh"><span class="rvn">${i+1}</span><span class="pillk ${r.ok?'ok':'ko'}">${r.ok?'Juste':'Faux'}</span><span class="rvi">${r.instr}</span></div>
        ${r.prompt?`<div class="rvp m">${r.prompt}</div>`:''}${r.explain?`<p class="rve"><b>Solution.</b> ${r.explain}</p>`:''}</li>`).join('')}</ol></details>`:''}
    <div class="btns">${L.cfg?`<button class="btn" id="newser">Nouvelle série</button><button class="btn ghost" id="same">Rejouer la même série</button><button class="btn ghost" id="sets">Modifier les réglages</button>`
      :`<button class="btn" id="again">${win?'Rejouer':'Réessayer'}</button><button class="btn ghost" id="seep">Voir mon profil</button>`}<button class="btn ghost" id="back">Retour au parcours</button></div>
  </div></div>`;
  const cfg=L.cfg;
  if(cfg){$('#newser').onclick=()=>start(-3,{...cfg,seed:newSeed()});$('#same').onclick=()=>start(-3,{...cfg});$('#sets').onclick=practice;
    $('#copy').onclick=()=>{const t=$('#scode').textContent,b=$('#copy');
      const sel=()=>{const r=document.createRange();r.selectNodeContents($('#scode'));const w=getSelection();w.removeAllRanges();w.addRange(r);b.textContent='Sélectionné'};
      try{navigator.clipboard.writeText(t).then(()=>{b.textContent='Copié'},sel)}catch(e){sel()}}}
  else{$('#again').onclick=()=>start(ui);$('#seep').onclick=profile}
  $('#back').onclick=home;
}

/* ---- Confettis en forme de tuiles ---- */
function confetti(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const cv=document.getElementById('fx'),cx=cv.getContext('2d'),cs=getComputedStyle(document.documentElement);
  const cols=['--t-sq','--t-x','--t-c','--neg'].map(v=>cs.getPropertyValue(v).trim());
  cv.hidden=false;const W=cv.width=innerWidth,Hh=cv.height=innerHeight;
  const P=Array.from({length:70},()=>{const s=pick([[10,10],[10,26],[20,20]]);return{x:W/2+R(-60,60),y:Hh*.35,vx:(Math.random()-.5)*9,vy:-Math.random()*11-4,w:s[0],h:s[1],r:Math.random()*6,vr:(Math.random()-.5)*.3,c:pick(cols)}});
  let t=0;(function f(){cx.clearRect(0,0,W,Hh);P.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore()});
    if(++t<110)requestAnimationFrame(f);else{cx.clearRect(0,0,W,Hh);cv.hidden=true}})();
}

home();
