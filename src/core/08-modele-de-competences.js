/* ---- Modèle de compétences ---- */
const LV=['Pas encore vue','Fragile','En progrès','Maîtrisée'];
function level(id){const k=ST.skills[id];if(!k||!k.a)return 0;if(k.m>=.8&&k.a>=3)return 3;if(k.m>=.5)return 2;return 1}
function need(id){const k=ST.skills[id];if(!k||!k.a)return null;
  let w=1-k.m;const now=Date.now();
  if(k.tagT&&now-k.tagT<3*864e5)w+=.25;          // erreur récente
  const days=(now-k.last)/864e5;if(days>4)w+=Math.min(.3,days/40); // à réviser
  if(k.a<3)w+=.1;                                  // pas assez de pratique
  return w}
function weakList(){return ALLSK.map(k=>({s:k,w:need(k.id)})).filter(x=>x.w!==null&&x.w>.25).sort((a,b)=>b.w-a.w)}
function targetedQs(){const w=weakList().slice(0,4);if(!w.length)return null;
  const tot=w.reduce((t,x)=>t+x.w,0),pickW=()=>{let r=Math.random()*tot;for(const x of w){r-=x.w;if(r<=0)return x.s}return w[0].s};
  const list=w.map(x=>x.s),rel=shuffle(ALLSK.filter(k=>w.some(x=>x.s.ui===k.ui)&&!list.includes(k)));
  while(list.length<4&&rel.length)list.push(rel.pop()); // notions voisines du même chapitre
  while(list.length<6)list.push(pickW());return shuffle(list).map(mk)}
const k0ui=id=>SK[id]?SK[id].ui:-1;
function record(q,ok,tag,meta){
  if(!q.skill)return;const now=Date.now();
  const k=ST.skills[q.skill]||(ST.skills[q.skill]={a:0,c:0,e:0,m:0,last:0});
  const score=ok?(E.hint?.6:(meta&&meta.q!=null?meta.q:1)):0;
  k.m=k.a?k.m*.65+score*.35:score;k.a++;if(ok)k.c++;else k.e++;k.last=now;
  if(tag&&!(meta&&meta.noErr)){const e=ST.errors[tag]||(ST.errors[tag]={n:0,last:0,sk:{}});e.n++;e.last=now;e.sk[q.skill]=(e.sk[q.skill]||0)+1;k.tag=tag;k.tagT=now}
  const d=dkey();let h=ST.hist[ST.hist.length-1];
  if(!h||h.d!==d){h={d,n:0,ok:0,xp:0};ST.hist.push(h);if(ST.hist.length>120)ST.hist.shift()}
  h.n++;if(ok)h.ok++;
  const tr=UNITS[k0ui(q.skill)]?.tr;if(tr){h.t=h.t||{};const a=h.t[tr]||(h.t[tr]=[0,0]);a[0]++;if(ok)a[1]++}
  k.r=((k.r||'')+(ok?'1':'0')).slice(-12);
  h.ms={};ALLSK.forEach(s2=>{if(level(s2.id)===3){const t2=UNITS[s2.ui].tr;h.ms[t2]=(h.ms[t2]||0)+1}});
  ST.log.unshift({t:now,s:q.skill,ok,tag:tag||null});if(ST.log.length>40)ST.log.length=40;
  if(L)L.touched[q.skill]=1;
  save();
}
function recordErr(skill,tag){const now=Date.now(),e=ST.errors[tag]||(ST.errors[tag]={n:0,last:0,sk:{}});e.n++;e.last=now;e.sk[skill]=(e.sk[skill]||0)+1;
  const k=ST.skills[skill]||(ST.skills[skill]={a:0,c:0,e:0,m:0,last:0});k.tag=tag;k.tagT=now;save()}
const lvPill=lv=>`<span class="lv l${lv}">${LV[lv]}</span>`;
function skRow(k,why){const st=ST.skills[k.id],lv=level(k.id),m=st&&st.a?Math.round(st.m*100):0;
  const sub=st&&st.a?`${st.c} / ${st.a} réussie${st.c>1?'s':''}${why&&st.tag&&ERR[st.tag]?' · '+ERR[st.tag].label:''}`:'Jamais pratiquée';
  return`<div class="skrow"><div class="skn"><span>${k.name}</span><small>${sub}</small>${why&&CMAP[k.id]?`<button class="linkbtn sm" data-course="${CMAP[k.id]}">Revoir le cours</button>`:''}</div>${lvPill(lv)}
    <span class="mbar l${lv}" role="img" aria-label="Maîtrise ${m} %"><i style="width:${m}%"></i></span></div>`}
const lname=ui=>ui===-3?'Entraînement libre':ui===-2?'Entraînement ciblé':ui<0?'Révision mixte':UNITS[ui].name;
const hv=n=>Number.isFinite(n)?Math.max(0,n):'∞';

function home(){
  L=null;SCREEN='home';
  const lvl=Math.floor(ST.xp/100)+1,pr=ST.xp%100,dxp=ST.day.d===dkey()?ST.day.xp:0,goal=50,C=2*Math.PI*30,frac=Math.min(1,dxp/goal);
  const TR=curTrack(),TU=UNITS.filter(u=>u.tr===TR),next=UNITS.findIndex(u=>u.tr===TR&&(ST.stars[u.id]||0)<3);
  const t=gLin1(),wk=weakList().slice(0,3);
  app.innerHTML=`<div class="screen home"><div class="scroll">
  <header class="top"><div class="brand">${I.logo}<span>Équilibre</span></div>
    <div class="chips"><span class="chip streak" title="Série de jours">${I.flame}${streakNow()}</span><span class="chip xp" title="XP total">${I.bolt}${ST.xp}</span>
    <button class="iconbtn" id="prof" aria-label="Mon profil" title="Mon profil">${I.user}</button>
    <button class="iconbtn" id="mute" aria-label="${ST.muted?'Activer':'Couper'} le son">${ST.muted?I.mute:I.sound}</button></div></header>
  <div class="hgrid"><div class="hcol">
  <section class="hero">
    <div class="ring"><svg viewBox="0 0 72 72"><circle cx="36" cy="36" r="30" fill="none" stroke="var(--line)" stroke-width="8"/><circle cx="36" cy="36" r="30" fill="none" stroke="var(--t-x)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-frac)}"/></svg><b>${Math.round(frac*100)}%</b></div>
    <div style="flex:1;min-width:0"><p class="eyebrow">Objectif du jour</p><h1>${dxp} / ${goal} XP</h1>
    <p class="lvl">Niveau ${lvl} · encore ${100-pr} XP pour le niveau ${lvl+1}</p><div class="bar"><i style="width:${pr}%"></i></div></div>
  </section>
  <section class="target">
    <div><p class="eyebrow">Recommandé pour toi</p><h3>Entraînement ciblé</h3>
    <p>${wk.length?'6 questions choisies d’après tes erreurs et les notions à revoir :':'Fais une ou deux leçons : l’appli repérera tes lacunes et te proposera des exercices adaptés.'}</p></div>
    ${wk.length?`<div class="skchips">${wk.map(x=>`<span class="skchip">${x.s.name}</span>`).join('')}</div>`:''}
    <div class="trow"><button class="btn" id="tgt" ${wk.length?'':'disabled'}>S’entraîner</button><button class="btn ghost" id="anl">Mes résultats</button></div>
  </section>
  ${(()=>{const ids=UNITS.filter(u=>u.tr===TR&&DECKS[u.id]).map(u=>u.id);if(!ids.length)return'';const st=deckStats(ids);
    return`<section class="free fcmini"><div><p class="eyebrow">Mémoriser</p><h3>Cartes de cours</h3><p>${st.due?`${st.due} carte${st.due>1?'s':''} à revoir aujourd’hui`:'Aucune carte à revoir aujourd’hui'}${st.fresh?` · ${st.fresh} nouvelle${st.fresh>1?'s':''}`:''} · ${st.known} / ${st.n} maîtrisées</p></div>
      <div class="fcbar" role="img" aria-label="${st.known} cartes maîtrisées sur ${st.n}"><i style="width:${st.n?st.known/st.n*100:0}%"></i></div>
      <button class="btn ghost" id="fcday">Réviser les cartes</button></section>`})()}
  ${recallHome(TR)}
  <section class="free">
    <div><p class="eyebrow">Sur mesure</p><h3>Entraînement libre</h3><p>Choisis les thèmes, le nombre de questions et la difficulté. Chaque série est corrigée et rejouable avec son code.</p></div>
    <button class="btn ghost" id="free">Composer ma série</button>
  </section>
  <section class="daily">
    <div><p class="eyebrow">Défi du jour</p><h3>Révision mixte</h3><p>6 questions tirées de tout le parcours ${TRACKS[TR].name}.</p></div>
    <div class="teaser" aria-hidden="true">${TR==='alg'?teaserH(t):TEASE[TR]?TEASE[TR]():''}</div>
    <button class="btn" id="mix">Lancer le défi</button>
  </section>
  </div><div class="hcol">
  <div class="tracks" role="tablist" aria-label="Parcours">${liveTracks().map(([k,t2])=>`<button role="tab" aria-selected="${k===TR}" class="${k===TR?'on':''}" data-tr="${k}">${t2.short||t2.name}</button>`).join('')}</div>
  <h2 class="sect">Parcours ${TRACKS[TR].name} <small>${TU.reduce((s2,u)=>s2+(ST.stars[u.id]||0),0)} / ${TU.length*3} étoiles</small></h2>
  <ol class="path">${UNITS.map((u,i)=>u.tr!==TR?'':`<li><button class="unit" data-u="${i}">
    <span class="node ${u.tone}"><span>${u.glyph}</span></span>
    <span class="txt"><span class="num">Chapitre ${u.num}</span><span class="ut">${u.name}</span><span class="sub">${u.sub}</span>${starsH(ST.stars[u.id]||0)}</span>
    ${i===next?'<span class="pill">Suivant</span>':`<span style="color:var(--muted)">${I.chev}</span>`}</button></li>`).join('')}</ol></div></div>
  <p class="foot-note">Ta progression est enregistrée sur cet appareil, sans compte ni connexion.</p>
  </div></div>`;
  app.querySelectorAll('.unit').forEach(b=>b.onclick=()=>{sfx.tap();chapter(+b.dataset.u)});
  $('#mix').onclick=()=>{sfx.tap();start(-1)};
  $('#tgt').onclick=()=>{sfx.tap();start(-2)};
  $('#free').onclick=()=>{sfx.tap();practice()};
  if($('#fcday'))$('#fcday').onclick=()=>{sfx.tap();cardSession(UNITS.filter(u=>u.tr===TR&&DECKS[u.id]).map(u=>u.id),'Cartes du jour · '+TRACKS[TR].name,home)};
  $('#prof').onclick=()=>{sfx.tap();profile()};$('#anl').onclick=()=>{sfx.tap();analysis()};
  $('#mute').onclick=()=>{ST.muted=!ST.muted;save();home()};
  app.querySelectorAll('[data-tr]').forEach(b=>b.onclick=()=>{ST.track=b.dataset.tr;save();sfx.tap();home()});
  wireRecallHome(TR);
  {const tb=app.querySelector('.tracks'),on=tb&&tb.querySelector('.on');if(on)tb.scrollLeft=on.offsetLeft-(tb.clientWidth-on.offsetWidth)/2}
}

/* ---- Graphique d'évolution : questions par jour, justes / erreurs empilées ---- */
const DOW=['D','L','M','M','J','V','S'];
function chartData(){const out=[];for(let o=13;o>=0;o--){const k=dkey(o),h=ST.hist.find(x=>x.d===k)||{n:0,ok:0},[y,m,d]=k.split('-').map(Number);out.push({k,n:h.n,ok:h.ok,date:new Date(y,m-1,d)})}return out}
function chartSVG(days){
  const W=320,Hc=150,l=24,r=4,t=8,b=22,pw=W-l-r,ph=Hc-t-b,sw=pw/14,bw=Math.min(14,sw-6);
  const top=Math.max(5,Math.ceil(Math.max(...days.map(d=>d.n))/5)*5),Y=v=>t+ph-v/top*ph;
  const topR=(x,y0,w,h)=>{const rr=Math.min(4,h/2,w/2);return`M${x},${y0+h}V${y0+rr}Q${x},${y0} ${x+rr},${y0}H${x+w-rr}Q${x+w},${y0} ${x+w},${y0+rr}V${y0+h}Z`};
  let g='';
  [0,top/2,top].forEach(v=>{g+=`<line x1="${l}" x2="${W-r}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)" stroke-width="1"/><text x="${l-6}" y="${Y(v)+3.5}" text-anchor="end" font-size="10" fill="var(--muted)">${num(v)}</text>`});
  days.forEach((d,i)=>{const x=l+i*sw+(sw-bw)/2,ko=d.n-d.ok;let bars='';
    if(d.ok){const h=ph*d.ok/top;bars+=ko?`<rect x="${x}" y="${Y(d.ok)}" width="${bw}" height="${h}" fill="var(--good)"/>`:`<path d="${topR(x,Y(d.ok),bw,h)}" fill="var(--good)"/>`}
    if(ko){const y1=Y(d.n),h=Math.max(1,ph*ko/top-(d.ok?2:0));bars+=`<path d="${topR(x,y1,bw,h)}" fill="var(--bad)"/>`}
    g+=`<g class="bg" data-i="${i}">${bars}<text x="${l+i*sw+sw/2}" y="${Hc-6}" text-anchor="middle" font-size="10" fill="var(--muted)" ${i===13?'font-weight="700"':''}>${DOW[d.date.getDay()]}</text>
      <rect class="hit" data-i="${i}" x="${l+i*sw}" y="${t}" width="${sw}" height="${ph+b}" fill="transparent"/></g>`});
  return`<svg class="chart" viewBox="0 0 ${W} ${Hc}" role="img" aria-label="Questions par jour sur les 14 derniers jours, justes et erreurs">${g}</svg>`}
function dayInfo(d){const ds=d.date.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'});
  return d.n?`<b>${ds}</b> : ${d.n} question${d.n>1?'s':''}, ${d.ok} juste${d.ok>1?'s':''} (${Math.round(d.ok/d.n*100)} %)`:`<b>${ds}</b> : aucune question`}

function profile(){
  L=null;SCREEN='profile';
  const vals=Object.values(ST.skills),A=vals.reduce((t,k)=>t+k.a,0),Cc=vals.reduce((t,k)=>t+k.c,0);
  const mast=ALLSK.filter(k=>level(k.id)===3).length,wk=weakList().slice(0,3);
  const errs=Object.entries(ST.errors).filter(([t])=>ERR[t]).sort((a,b)=>b[1].n-a[1].n).slice(0,5);
  const days=chartData(),n14=days.reduce((t,d)=>t+d.n,0),ok14=days.reduce((t,d)=>t+d.ok,0);
  const sum14=n14?`<b>14 derniers jours</b> : ${n14} question${n14>1?'s':''}, ${Math.round(ok14/n14*100)} % de réussite. Touche une barre pour le détail.`:'Aucune question ces 14 derniers jours.';
  app.innerHTML=`<div class="screen"><div class="scroll prof">
   <header class="ptop"><button class="iconbtn" id="back" aria-label="Retour au parcours">${I.l}</button><h1>Mon profil</h1>
     <span class="sync">Sur cet appareil</span></header>
   <div class="stats"><div class="stat"><b>${A}</b><span>Questions</span></div><div class="stat"><b>${A?Math.round(Cc/A*100)+' %':'–'}</b><span>Réussite</span></div><div class="stat"><b>${mast}/${ALLSK.length}</b><span>Maîtrisées</span></div></div>
   <button class="btn ghost" id="anl">Analyse détaillée de mes réponses</button>
   <section class="card"><h2>À retravailler en priorité</h2>
     ${wk.length?`<div class="sklist">${wk.map(x=>skRow(x.s,true)).join('')}</div><button class="btn" id="tgt">Lancer l’entraînement ciblé</button>`
       :`<p class="empty">${A?'Aucune lacune repérée pour l’instant. Continue sur le parcours pour découvrir de nouvelles notions.':'Ton profil est vide. Fais une première leçon : chaque réponse met à jour tes compétences.'}</p>`}
   </section>
   <section class="card"><h2>Évolution</h2>
     <div class="legend"><span><i class="sw okc"></i>Justes</span><span><i class="sw koc"></i>Erreurs</span></div>
     <div class="chartwrap">${chartSVG(days)}</div><p class="cinfo" id="cinfo">${sum14}</p>
   </section>
   <section class="card"><h2>Erreurs fréquentes</h2>
     ${errs.length?errs.map(([t,e])=>`<div class="err"><div class="errh"><b>${ERR[t].label}</b><span class="cnt">${e.n} fois</span></div><p>${ERR[t].tip}</p>
       <small>Dans : ${Object.keys(e.sk).filter(id=>SK[id]).map(id=>SK[id].name).join(', ')}</small></div>`).join('')
       :'<p class="empty">Aucune erreur enregistrée. Les erreurs repérées dans tes réponses apparaîtront ici avec un conseil.</p>'}
   </section>
   <section class="card"><h2>Compétences</h2>
     ${UNITS.map(u=>`<h3 class="uh">${u.name}</h3><div class="sklist">${u.skills.map(k=>skRow(k)).join('')}</div>`).join('')}
   </section>
   <div class="reset" id="reset"><button class="linkbtn" id="rst">Réinitialiser mon profil</button></div>
   <p class="foot-note">Ton profil est enregistré uniquement dans ce navigateur, sur cet appareil. Il n’est envoyé nulle part.</p>
  </div></div>`;
  $('#back').onclick=home;$('#anl').onclick=()=>{sfx.tap();analysis()};
  if($('#tgt'))$('#tgt').onclick=()=>start(-2);
  app.querySelectorAll('[data-course]').forEach(b=>b.onclick=()=>openCourse(b.dataset.course));
  const svg=$('.chart'),info=$('#cinfo');
  const sel=i=>{svg.classList.add('sel');svg.querySelectorAll('.bg').forEach(gg=>gg.classList.toggle('on',+gg.dataset.i===i));info.innerHTML=dayInfo(days[i])};
  svg.querySelectorAll('.hit').forEach(h=>{h.addEventListener('pointerenter',()=>sel(+h.dataset.i));h.addEventListener('click',()=>sel(+h.dataset.i))});
  svg.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'){svg.classList.remove('sel');info.innerHTML=sum14}});
  $('#rst').onclick=()=>{$('#reset').innerHTML=`<div class="confirm"><p>Effacer ta progression, tes compétences et l’historique de tes erreurs ? C’est définitif.</p>
    <div class="trow"><button class="btn bad" id="rsty">Tout effacer</button><button class="btn ghost" id="rstn">Annuler</button></div></div>`;
    $('#rstn').onclick=profile;$('#rsty').onclick=()=>{ST=Object.assign(defST(),{muted:ST.muted});save();profile()}};
}
