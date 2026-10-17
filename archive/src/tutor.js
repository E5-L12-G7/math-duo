/* ---- « Demander au prof » : un modèle de langage local via Ollama (par défaut phi4-mini) ----
   Tout reste sur la machine de l'élève : l'appli parle à Ollama (http://localhost:11434 ou un ordinateur du réseau local).
   Le prof guide sans donner la réponse tant que l'exercice n'est pas validé ; ensuite, il peut tout expliquer.
   Réglages (adresse, modèle) gardés dans ST.tutor. */
const TUT={open:false,key:null,msgs:[],busy:false,ctrl:null,set:false};
const TUT_ICON='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9.7 9.4a2.4 2.4 0 1 1 3.3 2.2c-.6.3-1 .8-1 1.5v.4"/><circle cx="12" cy="16.3" r=".6" fill="currentColor"/></svg>';
const tutCfg=()=>{ST.tutor=ST.tutor||{};return{url:(ST.tutor.url||'http://localhost:11434').replace(/\/+$/,''),model:ST.tutor.model||'phi4-mini'}};
const tutTxt=h=>{const d=document.createElement('div');d.innerHTML=String(h||'').replace(/<sup>/g,'^(').replace(/<\/sup>/g,')').replace(/<sub>/g,'_').replace(/<\/sub>/g,'')
  .replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,'($1)/($2)').replace(/<br\s*\/?>|<\/p>|<\/li>|<\/tr>/g,'\n');return d.textContent.replace(/[ \t]+/g,' ').replace(/\n\s*\n+/g,'\n').trim()};
function tutContext(){const q=E&&E.q;if(!q)return'';const u=UNITS[L.ui]||UNITS[SK[q.skill]?.ui]||{};let t=`Chapitre : ${u.name||''}${SK[q.skill]?` — compétence : ${SK[q.skill].name}`:''}.\nConsigne : ${tutTxt(q.instr)}\n`;
  const pr=$('.prompt');if(pr)t+=`Énoncé : ${tutTxt(pr.innerHTML)}\n`;
  if(q.type==='mcq')t+=`Propositions : ${q.opts.map((o,i)=>`${'ABCDEF'[i]}) ${tutTxt(o.h)}`).join(' ; ')}\n`;
  if(q.type==='chain')t+='Exercice de raisonnement en étapes :\n'+[...app.querySelectorAll('.cstep')].map((s,i)=>`Étape ${i+1} : ${tutTxt(s.querySelector('.cq').innerHTML)} Propositions : ${[...s.querySelectorAll('.copt')].map(b=>tutTxt(b.innerHTML)).join(' | ')}`).join('\n')+'\n';
  if(q.type==='input')t+=`L’élève doit taper : ${q.fields.map(f=>tutTxt(f.label)).join(', ')}\n`;
  if(E.done){t+=`L’élève a déjà validé sa réponse (${$('#sheet')&&$('#sheet').classList.contains('ok')?'juste':'fausse'}).\n`;if(q.explain)t+=`Correction officielle : ${tutTxt(q.explain)}\n`}
  else if(E.hint&&q.hint)t+=`Indice déjà affiché : ${tutTxt(q.hint)}\n`;
  return t}
const TUT_SYS=done=>`Tu es un professeur de mathématiques bienveillant qui aide un élève francophone dans l’appli Équilibre. Tutoie l’élève, sois chaleureux et précis, phrases courtes, au plus 8 lignes.
Écris les formules en texte simple, sans LaTeX ni dollars : x², √2, π, a/b, ≤, ≥, ∞.
${done?'L’élève a déjà validé : tu peux expliquer la solution complète, étape par étape, et dire pourquoi son erreur éventuelle est une erreur.':'L’élève n’a PAS encore validé sa réponse. Ne donne JAMAIS la réponse finale, ni la bonne proposition, ni le résultat numérique. Aide-le à trouver seul : rappelle la définition ou la méthode utile, pointe l’étape à regarder, pose-lui une question qui le met sur la voie. S’il insiste pour avoir la réponse, encourage-le à essayer puis à valider : la correction s’affichera.'}
Si la question de l’élève sort des mathématiques, ramène-le gentiment à l’exercice.`;
/* Petit rendu : retire la réflexion <think>, nettoie le LaTeX courant, gras et retours à la ligne */
function tutRender(s){
  s=s.replace(/<think>[\s\S]*?(<\/think>|$)/g,'').trim();if(!s)return'';
  s=s.replace(/\\\(|\\\)|\\\[|\\\]|\$\$?/g,'').replace(/\\(?:d|t)?frac\{([^{}]*)\}\{([^{}]*)\}/g,'($1)/($2)').replace(/\\sqrt\{([^{}]*)\}/g,'√($1)').replace(/\\text\{([^{}]*)\}/g,'$1')
   .replace(/\\left|\\right/g,'').replace(/\\times/g,'×').replace(/\\cdot/g,'·').replace(/\\pi/g,'π').replace(/\\leq?/g,'≤').replace(/\\geq?/g,'≥').replace(/\\neq/g,'≠').replace(/\\infty/g,'∞')
   .replace(/\\approx/g,'≈').replace(/\\in\b/g,'∈').replace(/\\Rightarrow|\\implies/g,'⇒').replace(/\\Leftrightarrow|\\iff/g,'⟺').replace(/\\forall/g,'∀').replace(/\\exists/g,'∃').replace(/\\(sin|cos|tan|ln|log|exp)\b/g,'$1').replace(/\\boxed\{([^{}]*)\}/g,'$1');
  let h=escH(s).replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/\^\{([^{}]*)\}/g,'<sup>$1</sup>').replace(/\^(−?-?[0-9a-zA-Z]+)/g,'<sup>$1</sup>').replace(/_\{([^{}]*)\}/g,'<sub>$1</sub>');
  return h.split(/\n{2,}/).map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('')}
function tutDraw(){const t=$('#tutor');if(!t)return;const c=tutCfg(),onClaude=/claude\.ai|claudeusercontent|\.claude\./.test(location.host);
  t.innerHTML=`<div class="chead"><div><h3>Demander au prof</h3><p>Un modèle local (Ollama) t’aide sans donner la réponse avant que tu valides.</p></div>
      <div class="tuthead"><button class="iconbtn" id="tutset" aria-label="Réglages du prof" aria-pressed="${TUT.set}">⚙</button><button class="iconbtn" id="tutx" aria-label="Fermer">${I.x}</button></div></div>
    ${TUT.set||onClaude?`<div class="tutset">${onClaude?'<p class="tutwarn">Cette page est hébergée sur claude.ai, qui bloque toute connexion vers un autre serveur : le prof local ne peut pas fonctionner ici. Ouvre le fichier equilibre.html sur ton ordinateur (ou ta version installée) pour l’utiliser.</p>':''}
      <label>Adresse d’Ollama<input id="tuturl" value="${escH(c.url)}" inputmode="url" autocomplete="off" spellcheck="false"></label>
      <label>Modèle<input id="tutmod" value="${escH(c.model)}" autocomplete="off" spellcheck="false"></label>
      <div class="tutrow"><button class="btn ghost sm" id="tuttest">Tester la connexion</button></div><p class="tutnote" id="tutst"></p></div>`:''}
    <div class="tutlog" id="tutlog" aria-live="polite">${TUT.msgs.length?TUT.msgs.map(m=>`<div class="tm ${m.role==='user'?'me':'bot'}">${m.role==='user'?escH(m.content):m.html?`<p>${m.html}</p>`:(tutRender(m.content)||'<p class="tutthink">Le prof réfléchit…</p>')}</div>`).join('')
      :`<p class="tutnote">${E&&E.done?'Demande une explication de la correction ou de ton erreur.':'Pose ta question sur cet exercice : ce que tu ne comprends pas, l’étape qui te bloque…'}</p>`}</div>
    <div class="tutchips">${(E&&E.done?['Explique-moi la correction','Pourquoi ma réponse est fausse ?','Donne-moi un exercice semblable']:['Par où commencer ?','Quelle formule utiliser ?','Rappelle-moi la méthode']).map(s=>`<button class="tchip2" data-tq="${escH(s)}">${s}</button>`).join('')}</div>
    <form class="tutform" id="tutform"><textarea id="tutin" rows="2" placeholder="Ta question…" aria-label="Ta question"></textarea>
      <button class="btn sm" id="tutgo" type="${TUT.busy?'button':'submit'}">${TUT.busy?'Arrêter':'Envoyer'}</button></form>`;
  t.querySelector('#tutx').onclick=closeTutor;
  t.querySelector('#tutset').onclick=()=>{TUT.set=!TUT.set;tutDraw()};
  const sv=()=>{ST.tutor={url:t.querySelector('#tuturl').value.trim(),model:t.querySelector('#tutmod').value.trim()};save()};
  if(t.querySelector('#tuturl')){t.querySelector('#tuturl').onchange=sv;t.querySelector('#tutmod').onchange=sv;t.querySelector('#tuttest').onclick=()=>{sv();tutTest()}}
  t.querySelectorAll('[data-tq]').forEach(b=>b.onclick=()=>tutAsk(b.dataset.tq));
  const inp=t.querySelector('#tutin');
  inp.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();t.querySelector('#tutform').requestSubmit()}if(e.key==='Escape')closeTutor()};
  t.querySelector('#tutform').onsubmit=e=>{e.preventDefault();const v=inp.value.trim();if(v&&!TUT.busy)tutAsk(v)};
  if(TUT.busy)t.querySelector('#tutgo').onclick=()=>{if(TUT.ctrl)TUT.ctrl.abort()};
  const lg=t.querySelector('#tutlog');lg.scrollTop=lg.scrollHeight}
async function tutTest(){const st=$('#tutst'),c=tutCfg();st.textContent='Connexion…';
  try{const r=await fetch(c.url+'/api/tags');if(!r.ok)throw new Error('HTTP '+r.status);const j=await r.json(),names=(j.models||[]).map(m=>m.name);
    const has=names.some(n=>n===c.model||n.split(':')[0]===c.model.split(':')[0]);
    st.innerHTML=has?`Connecté. Le modèle <b>${escH(c.model)}</b> est installé.`:`Connecté, mais le modèle <b>${escH(c.model)}</b> n’est pas installé. Sur l’ordinateur : <code>ollama pull ${escH(c.model)}</code>${names.length?`. Modèles présents : ${names.map(escH).join(', ')}`:''}.`}
  catch(e){st.innerHTML=tutHelp(c)}}
const tutHelp=c=>`Impossible de joindre Ollama à <b>${escH(c.url)}</b>. Vérifie : 1) Ollama est lancé sur l’ordinateur ; 2) le modèle est installé (<code>ollama pull ${escH(c.model)}</code>) ; 3) Ollama accepte cette page : définis la variable <code>OLLAMA_ORIGINS=*</code> puis relance Ollama ; 4) depuis un téléphone, mets l’adresse IP de l’ordinateur (ex. http://192.168.1.20:11434) et lance Ollama avec <code>OLLAMA_HOST=0.0.0.0</code>.`;
async function tutAsk(text){if(TUT.busy)return;const c=tutCfg(),ctx=tutContext();
  TUT.msgs.push({role:'user',content:text});const bot={role:'assistant',content:''};TUT.msgs.push(bot);TUT.busy=true;tutDraw();
  const hist=TUT.msgs.slice(0,-1).filter(m=>!m.err).slice(-8).map(m=>({role:m.role,content:m.content.replace(/<think>[\s\S]*?(<\/think>|$)/g,'').trim()}));
  hist[hist.length-1]={role:'user',content:`Exercice en cours :\n${ctx}\nQuestion de l’élève : ${text}`};
  TUT.ctrl=new AbortController();let last=0;
  try{const r=await fetch(c.url+'/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},signal:TUT.ctrl.signal,
      body:JSON.stringify({model:c.model,stream:true,options:{temperature:.3},messages:[{role:'system',content:TUT_SYS(E&&E.done)},...hist]})});
    if(!r.ok){let m='';try{m=(await r.json()).error||''}catch(_){}throw new Error(m||'HTTP '+r.status)}
    const rd=r.body.getReader(),dec=new TextDecoder();let buf='';
    for(;;){const{value,done}=await rd.read();if(done)break;buf+=dec.decode(value,{stream:true});const lines=buf.split('\n');buf=lines.pop();
      for(const l of lines){if(!l.trim())continue;const j=JSON.parse(l);if(j.error)throw new Error(j.error);if(j.message&&j.message.content)bot.content+=j.message.content}
      const now=Date.now();if(now-last>120){last=now;const lg=$('#tutlog');if(lg&&lg.lastElementChild){lg.lastElementChild.innerHTML=tutRender(bot.content)||'<p class="tutthink">Le prof réfléchit…</p>';lg.scrollTop=lg.scrollHeight}}}
    if(!tutRender(bot.content))bot.content+='\n(Le prof n’a rien répondu : reformule ta question.)'}
  catch(e){if(e.name==='AbortError')bot.content+=bot.content?'\n…(arrêté)':'(arrêté)';
    else{bot.err=true;bot.html=/model.*not found|not found.*model|pull/i.test(e.message)?`Le modèle « ${escH(c.model)} » n’est pas installé. Sur l’ordinateur, tape : <code>ollama pull ${escH(c.model)}</code>`:tutHelp(c)}}
  TUT.busy=false;TUT.ctrl=null;if(TUT.open)tutDraw()}
function openTutor(){const t=$('#tutor');if(!t)return;closeCalc();const key=L?L.code+'|'+L.i+'|'+(E&&E.q&&E.q.instr):'';if(key!==TUT.key){TUT.key=key;TUT.msgs=[];if(TUT.ctrl)TUT.ctrl.abort()}
  TUT.open=true;t.hidden=false;const b=$('#askbtn');if(b)b.classList.add('on');tutDraw();const i=t.querySelector('#tutin');if(i)i.focus({preventScroll:true})}
function closeTutor(){TUT.open=false;const t=$('#tutor');if(t)t.hidden=true;const b=$('#askbtn');if(b)b.classList.remove('on')}
