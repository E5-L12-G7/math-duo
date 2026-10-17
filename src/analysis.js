/* ---- Analyse des réponses : points forts, lacunes, progrès ----
   Tout est calculé à partir des données locales (ST.skills, ST.errors, ST.hist). Filtre par parcours. */
let ANF='all';
function analysis(){
  L=null;SCREEN='analysis';
  const F=ANF,inTr=k=>F==='all'||UNITS[k.ui].tr===F,SKs=ALLSK.filter(inTr),st=id=>ST.skills[id];
  const seen=SKs.filter(k=>st(k.id)&&st(k.id).a),A=seen.reduce((t,k)=>t+st(k.id).a,0),C=seen.reduce((t,k)=>t+st(k.id).c,0);
  const mast=SKs.filter(k=>level(k.id)===3).length,pct=v=>Math.round(v*100)+' %';
  /* journées : volume et réussite, pour tout ou pour le parcours choisi */
  const dayOf=k=>{const h=ST.hist.find(x=>x.d===k);if(!h)return[0,0];if(F==='all')return[h.n,h.ok];const a=h.t&&h.t[F];return a?[a[0],a[1]]:[0,0]};
  const span=(from,to)=>{let n=0,ok=0;for(let o=from;o<=to;o++){const[a,b]=dayOf(dkey(o));n+=a;ok+=b}return[n,ok]};
  const [n7,o7]=span(0,6),[p7,q7]=span(7,13),tr7=n7&&p7?Math.round((o7/n7-q7/p7)*100):null;
  /* semaines */
  const weeks=[];for(let w=7;w>=0;w--){const[n,ok]=span(w*7,w*7+6),d=new Date();d.setDate(d.getDate()-w*7-6);weeks.push({n,ok,d})}
  /* points forts / lacunes */
  const strong=seen.filter(k=>st(k.id).a>=3&&st(k.id).m>=.6).sort((a,b)=>st(b.id).m-st(a.id).m||st(b.id).a-st(a.id).a).slice(0,5);
  const weak=weakList().filter(x=>inTr(x.s)).slice(0,6);
  const why=k=>{const s=st(k.id),r=[];if(s.tagT&&Date.now()-s.tagT<3*864e5&&ERR[s.tag])r.push('erreur récente : '+ERR[s.tag].label.toLowerCase());
    if(s.a)r.push(`${s.c} / ${s.a} réussie${s.c>1?'s':''}`);const d=Math.floor((Date.now()-s.last)/864e5);if(d>4)r.push(`pas pratiquée depuis ${d} jours`);if(s.a<3)r.push('encore peu pratiquée');return r.join(' · ')};
  /* tendances par compétence (12 dernières réponses) */
  const trend=seen.map(k=>{const r=st(k.id).r||'';if(r.length<6)return null;const h=Math.floor(r.length/2),f=s=>[...s].filter(c=>c==='1').length/s.length;return{k,d:f(r.slice(h))-f(r.slice(0,h))}}).filter(Boolean);
  const up=trend.filter(x=>x.d>=.25).sort((a,b)=>b.d-a.d).slice(0,4),down=trend.filter(x=>x.d<=-.25).sort((a,b)=>a.d-b.d).slice(0,4);
  /* chapitres et niveaux */
  const units=UNITS.map((u,ui)=>({u,ui})).filter(({u})=>F==='all'||u.tr===F).map(({u,ui})=>{const ks=u.skills,sn=ks.filter(k=>st(k.id)&&st(k.id).a);
    const a=sn.reduce((t,k)=>t+st(k.id).a,0),c=sn.reduce((t,k)=>t+st(k.id).c,0),m=ks.reduce((t,k)=>t+(st(k.id)&&st(k.id).a?st(k.id).m:0),0)/ks.length;return{u,ui,n:ks.length,sn:sn.length,a,c,m}});
  const tiers=[1,2,3].map(t=>{const ks=seen.filter(k=>(k.t||2)===t);const a=ks.reduce((s,k)=>s+st(k.id).a,0),c=ks.reduce((s,k)=>s+st(k.id).c,0);return{t,a,c}});
  const errs=Object.entries(ST.errors).filter(([t])=>ERR[t]).map(([t,e])=>{const n=Object.entries(e.sk).filter(([id])=>SK[id]&&inTr(SK[id])).reduce((s,[,v])=>s+v,0);return{t,n,sk:Object.keys(e.sk).filter(id=>SK[id]&&inTr(SK[id]))}}).filter(e=>e.n).sort((a,b)=>b.n-a.n).slice(0,6);
  const emax=Math.max(1,...errs.map(e=>e.n));
  /* maîtrise dans le temps (instantanés quotidiens) */
  const snaps=ST.hist.filter(h=>h.ms).map(h=>({d:h.d,v:F==='all'?Object.values(h.ms).reduce((a,b)=>a+b,0):(h.ms[F]||0)}));
  const bar=(v,cls='')=>`<span class="abar ${cls}" role="img" aria-label="${Math.round(v*100)} %"><i style="width:${Math.max(0,Math.min(100,v*100))}%"></i></span>`;
  const lvc=m=>m>=.8?'l3':m>=.5?'l2':'l1';
  const crs=k=>CMAP[k.id]?`<button class="linkbtn sm" data-course="${CMAP[k.id]}">Revoir le cours</button>`:'';
  app.innerHTML=`<div class="screen"><div class="scroll prof anl">
   <header class="ptop"><button class="iconbtn" id="back" aria-label="Retour">${I.l}</button><h1>Mes résultats</h1></header>
   <div class="seg segw" role="tablist" aria-label="Parcours">${[['all','Tout'],...liveTracks().map(([k,t])=>[k,t.short||t.name])].map(([k,l])=>`<button data-f="${k}" class="${F===k?'on':''}" aria-pressed="${F===k}">${l}</button>`).join('')}</div>
   ${A?'':`<p class="empty">Aucune réponse enregistrée${F==='all'?'':' dans ce parcours'}. Fais une leçon : chaque réponse alimente cette analyse.</p>`}
   <div class="stats four"><div class="stat"><b>${A}</b><span>Questions</span></div><div class="stat"><b>${A?pct(C/A):'–'}</b><span>Réussite</span></div>
     <div class="stat"><b>${mast}/${SKs.length}</b><span>Maîtrisées</span></div>
     <div class="stat"><b class="${tr7>0?'up':tr7<0?'down':''}">${tr7===null?'–':(tr7>0?'+':tr7<0?MINUS:'')+Math.abs(tr7)}</b><span>${tr7===null?'Tendance':'pts sur 7 j'}</span></div></div>
   <section class="card"><h2>Progrès</h2>
     <p class="empty">Taux de réussite par semaine, sur les 8 dernières semaines. Touche un point pour le détail.</p>
     <div class="chartwrap" id="wk">${anWeekSVG(weeks)}</div><p class="cinfo" id="wkinfo">${n7?`Cette semaine : ${n7} question${n7>1?'s':''}, ${pct(o7/n7)} de réussite${p7?` (semaine précédente : ${pct(q7/p7)})`:''}.`:'Aucune question cette semaine.'}</p>
     ${snaps.length>=2?`<h3 class="uh">Compétences maîtrisées au fil du temps</h3><div class="chartwrap">${anMastSVG(snaps)}</div>`:''}
     ${up.length||down.length?`<div class="trend">${up.length?`<div><h3 class="uh">En progrès</h3>${up.map(x=>`<p><span class="tag up">▲</span>${x.k.name}</p>`).join('')}</div>`:''}
       ${down.length?`<div><h3 class="uh">En recul</h3>${down.map(x=>`<p><span class="tag down">▼</span>${x.k.name}</p>`).join('')}</div>`:''}</div>
       <p class="empty">Comparaison entre la première et la seconde moitié de tes 12 dernières réponses à chaque compétence.</p>`:''}
   </section>
   <section class="card"><h2>Points forts</h2>
     ${strong.length?`<div class="sklist">${strong.map(k=>`<div class="skrow"><div class="skn"><span>${k.name}</span><small>${UNITS[k.ui].name} · ${st(k.id).c} / ${st(k.id).a} réussies</small></div>${lvPill(level(k.id))}${bar(st(k.id).m,'l3')}</div>`).join('')}</div>`
       :'<p class="empty">Pas encore de point fort établi : une compétence compte ici après au moins 3 réponses et 60 % de maîtrise.</p>'}
   </section>
   <section class="card"><h2>Lacunes</h2>
     ${weak.length?`<div class="sklist">${weak.map(x=>`<div class="skrow"><div class="skn"><span>${x.s.name}</span><small>${why(x.s)}</small>${crs(x.s)}</div>${lvPill(level(x.s.id))}${bar(st(x.s.id).m,lvc(st(x.s.id).m))}</div>`).join('')}</div>
       <button class="btn" id="tgt">S’entraîner sur mes lacunes</button>`:'<p class="empty">Aucune lacune repérée pour l’instant.</p>'}
   </section>
   <section class="card"><h2>Par chapitre</h2><p class="empty">Maîtrise moyenne du chapitre (les compétences jamais vues comptent pour 0).</p>
     <div class="ulist">${units.map(x=>`<button class="urow" data-u="${x.ui}"><span class="un"><b>${x.u.name}</b><small>${TRACKS[x.u.tr].name} · ${x.sn} / ${x.n} compétences vues${x.a?` · ${pct(x.c/x.a)} de réussite`:''}</small></span>${bar(x.m,lvc(x.m))}</button>`).join('')}</div>
   </section>
   <section class="card"><h2>Par niveau de difficulté</h2>
     ${tiers.map(t=>`<div class="trow2"><span>${['','Facile','Moyen','Difficile'][t.t]}</span>${bar(t.a?t.c/t.a:0,t.a?lvc(t.c/t.a):'')}<small>${t.a?`${pct(t.c/t.a)} · ${t.a} q.`:'–'}</small></div>`).join('')}
     <p class="empty">Une forte baisse entre deux niveaux montre où la notion n’est pas encore solide.</p>
   </section>
   <section class="card"><h2>Types d’erreurs</h2>
     ${errs.length?errs.map(e=>`<details class="aerr"><summary><span class="en"><b>${ERR[e.t].label}</b><small>${e.n} fois</small></span><span class="abar l1"><i style="width:${e.n/emax*100}%"></i></span></summary>
       <p>${ERR[e.t].tip}</p><small>Dans : ${e.sk.map(id=>SK[id].name).join(', ')}</small></details>`).join('')
       :'<p class="empty">Aucune erreur classée pour l’instant.</p>'}
   </section>
   <p class="foot-note">Analyse calculée sur cet appareil, à partir de tes réponses. Rien n’est envoyé.</p>
  </div></div>`;
  $('#back').onclick=home;
  app.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{ANF=b.dataset.f;sfx.tap();analysis()});
  if($('#tgt'))$('#tgt').onclick=()=>{sfx.tap();start(-2)};
  app.querySelectorAll('[data-course]').forEach(b=>b.onclick=()=>openCourse(b.dataset.course));
  app.querySelectorAll('.urow').forEach(b=>b.onclick=()=>{sfx.tap();chapter(+b.dataset.u)});
  const info=$('#wkinfo');app.querySelectorAll('#wk .hit').forEach(h=>{const f=()=>{const w=weeks[+h.dataset.i];
    info.innerHTML=`<b>Semaine du ${w.d.toLocaleDateString('fr-FR',{day:'numeric',month:'long'})}</b> : ${w.n?`${w.n} question${w.n>1?'s':''}, ${pct(w.ok/w.n)} de réussite`:'aucune question'}`;
    app.querySelectorAll('#wk .wpt').forEach(p=>p.classList.toggle('on',p.dataset.i===h.dataset.i))};h.addEventListener('pointerenter',f);h.addEventListener('click',f)});
}
function anWeekSVG(weeks){const W=320,H=150,l=38,r=12,t=10,b=22,pw=W-l-r,ph=H-t-b,X=i=>l+i*pw/7,Y=v=>t+ph*(1-v);let g='';
  [0,.5,1].forEach(v=>{g+=`<line x1="${l}" x2="${W-r}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${l-6}" y="${Y(v)+3.5}" font-size="10" text-anchor="end" fill="var(--muted)">${v*100} %</text>`});
  let d='';weeks.forEach((w,i)=>{if(w.n)d+=(d&&weeks[i-1]&&weeks[i-1].n?'L':'M')+X(i).toFixed(1)+','+Y(w.ok/w.n).toFixed(1)});
  g+=`<path d="${d}" fill="none" stroke="var(--t-sq)" stroke-width="2.5" stroke-linejoin="round"/>`;
  weeks.forEach((w,i)=>{g+=`<text x="${i===7?X(i)+8:X(i)}" y="${H-6}" font-size="10" text-anchor="${i===7?'end':'middle'}" fill="var(--muted)"${i===7?' font-weight="700"':''}>${i===7?'Actuelle':w.d.toLocaleDateString('fr-FR',{day:'numeric',month:'numeric'})}</text>`;
    if(w.n)g+=`<circle class="wpt" data-i="${i}" cx="${X(i)}" cy="${Y(w.ok/w.n)}" r="${3+Math.min(5,Math.sqrt(w.n)/2)}" fill="var(--t-sq)" stroke="var(--surface)" stroke-width="2"/>`;
    g+=`<rect class="hit" data-i="${i}" x="${X(i)-pw/14}" y="${t}" width="${pw/7}" height="${ph+b}" fill="transparent"/>`});
  return`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Taux de réussite par semaine">${g}</svg>`}
function anMastSVG(sn){const W=320,H=110,l=30,r=8,t=10,b=20,pw=W-l-r,ph=H-t-b,top=Math.max(4,...sn.map(s=>s.v)),D=s=>{const[y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d).getTime()},
  d0=D(sn[0].d),d1=Math.max(d0+864e5,D(sn[sn.length-1].d)),X=d=>l+(D(d)-d0)/(d1-d0)*pw,Y=v=>t+ph*(1-v/top);
  let p='';sn.forEach((s,i)=>{p+=i?`H${X(s.d).toFixed(1)}V${Y(s.v).toFixed(1)}`:`M${X(s.d).toFixed(1)},${Y(s.v).toFixed(1)}`});p+=`H${W-r}`;
  const fmt=s=>new Date(D(s)).toLocaleDateString('fr-FR',{day:'numeric',month:'numeric'});
  return`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Nombre de compétences maîtrisées au fil du temps">
    <line x1="${l}" x2="${W-r}" y1="${Y(0)}" y2="${Y(0)}" stroke="var(--line)"/><line x1="${l}" x2="${W-r}" y1="${Y(top)}" y2="${Y(top)}" stroke="var(--line)"/>
    <text x="${l-6}" y="${Y(0)+3.5}" font-size="10" text-anchor="end" fill="var(--muted)">0</text><text x="${l-6}" y="${Y(top)+3.5}" font-size="10" text-anchor="end" fill="var(--muted)">${top}</text>
    <path d="${p}" fill="none" stroke="var(--good)" stroke-width="2.5"/><text x="${l}" y="${H-5}" font-size="10" fill="var(--muted)">${fmt(sn[0].d)}</text><text x="${W-r}" y="${H-5}" font-size="10" text-anchor="end" fill="var(--muted)">${fmt(sn[sn.length-1].d)}</text></svg>`}
