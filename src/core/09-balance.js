function practice(){
  L=null;SCREEN='practice';
  const c=Object.assign({units:UNITS.map((_,i)=>i),diff:2,n:10,lives:3},ST.prac||{});
  c.units=c.units.filter(i=>i<UNITS.length);
  let msg='';
  const draw=()=>{const sc=$('.scroll'),top=sc?sc.scrollTop:0,pool=pPool(c),cv=$('#code')?$('#code').value:'';
    app.innerHTML=`<div class="screen"><div class="scroll prof">
      <header class="ptop"><button class="iconbtn" id="back" aria-label="Retour au parcours">${I.l}</button><h1>Entraînement libre</h1></header>
      <p class="empty">Compose ta série : les questions sont tirées au hasard dans les thèmes choisis, puis corrigées automatiquement.</p>
      <section class="card"><div class="crow"><h2>Thèmes</h2><button class="linkbtn sm" id="all">${c.units.length===UNITS.length?'Tout retirer':'Tout choisir'}</button></div>
        <div class="seg segw">${liveTracks().map(([k,t2])=>`<button data-qt="${k}">${t2.short||t2.name}</button>`).join('')}</div>
        <div class="tchips">${UNITS.map((u,i)=>{const on=c.units.includes(i);return`<button class="tchip${on?' on':''}" data-u="${i}" aria-pressed="${on}"><span class="node ${u.tone} mini"><span>${u.glyph}</span></span><span class="tct"><b>${u.name}</b><small>${TRACKS[u.tr].name} · chapitre ${u.num}</small></span><span class="tck" aria-hidden="true">${on?I.check:''}</span></button>`}).join('')}</div></section>
      <section class="card"><h2>Nombre de questions</h2><div class="seg">${[5,10,15,20,30].map(n=>`<button data-n="${n}" class="${c.n===n?'on':''}" aria-pressed="${c.n===n}">${n}</button>`).join('')}</div></section>
      <section class="card"><h2>Difficulté</h2><div class="seg">${[1,2,3].map(d=>`<button data-d="${d}" class="${c.diff===d?'on':''}" aria-pressed="${c.diff===d}">${DIFFS[d].n}</button>`).join('')}</div><p class="empty">${DIFFS[c.diff].d}</p></section>
      <section class="card"><h2>Vies</h2><div class="seg">${[[3,'3'],[5,'5'],[0,'Sans limite']].map(([v,l])=>`<button data-l="${v}" class="${c.lives===v?'on':''}" aria-pressed="${c.lives===v}">${l}</button>`).join('')}</div></section>
      <p class="psum">${c.units.length?`${pool.length} type${pool.length>1?'s':''} de questions · ${c.n} questions · ${DIFFS[c.diff].n.toLowerCase()}`:'Choisis au moins un thème.'}</p>
      <button class="btn" id="go" ${pool.length?'':'disabled'}>Commencer la série</button>
      <section class="card"><h2>Rejouer une série</h2><p class="empty">Chaque série a un code. Saisis-le pour retrouver exactement les mêmes questions, par exemple pour vérifier une correction ou comparer avec quelqu’un.</p>
        <div class="coderow"><input id="code" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="ex. FF-2-10-K3J9Q" aria-label="Code de série" value="${cv.replace(/"/g,'')}"><button class="btn ghost" id="replay">Rejouer</button></div>
        <p class="msg" id="cmsg">${msg}</p></section>
    </div></div>`;
    $('.scroll').scrollTop=top;
    $('#back').onclick=home;
    $('#all').onclick=()=>{c.units=c.units.length===UNITS.length?[]:UNITS.map((_,i)=>i);sfx.tap();draw()};
    app.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{const i=+b.dataset.u;c.units=c.units.includes(i)?c.units.filter(x=>x!==i):[...c.units,i].sort((a,b2)=>a-b2);sfx.tap();draw()});
    app.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{c.n=+b.dataset.n;sfx.tap();draw()});
    app.querySelectorAll('[data-qt]').forEach(b=>b.onclick=()=>{c.units=UNITS.map((u,i)=>[u,i]).filter(([u])=>u.tr===b.dataset.qt).map(([,i])=>i);sfx.tap();draw()});
    app.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{c.diff=+b.dataset.d;sfx.tap();draw()});
    app.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{c.lives=+b.dataset.l;sfx.tap();draw()});
    $('#go').onclick=()=>{ST.prac={units:c.units,diff:c.diff,n:c.n,lives:c.lives};save();sfx.tap();start(-3,{...ST.prac,seed:newSeed()})};
    const replay=()=>{const r=parseCode($('#code').value);if(!r){msg='Ce code n’est pas valide. Il ressemble à FF-2-10-K3J9Q : quatre parties séparées par des tirets.';draw();return}
      if(!pPool(r).length){msg='Ce code ne correspond à aucune question.';draw();return}
      sfx.tap();start(-3,{...r,lives:c.lives})};
    $('#replay').onclick=replay;$('#code').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();replay()}};
  };
  draw();
}

function start(ui,cfg){
  let qs;
  if(ui===-3){qs=practiceQs(cfg)}
  else if(ui===-2)qs=targetedQs()||Array.from({length:6},()=>mk(pick(ALLSK)));
  else if(ui<0){const pool=ALLSK.filter(k=>UNITS[k.ui].tr===curTrack());qs=Array.from({length:6},()=>mk(pick(pool)))}
  else{const sk=UNITS[ui].skills,list=shuffle([...sk]).slice(0,6);
    while(list.length<6){const ws=sk.map(k=>.4+(need(k.id)??.3));let r=Math.random()*ws.reduce((a,b)=>a+b,0),i=0;for(;i<sk.length-1;i++){r-=ws[i];if(r<=0)break}list.push(sk[i])}
    qs=shuffle(list).map(mk)}
  L={ui,qs,i:0,hearts:ui===-3?(cfg.lives||Infinity):3,xp:0,combo:0,maxCombo:0,ok:0,ko:0,touched:{},log:[],cfg:ui===-3?cfg:null,code:ui===-3?codeOf(cfg):''};
  CALC.tk=[];CALC.hist=[];
  lesson();
}

let E=null; // état de l'exercice courant
const HINT_ICON='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V16h5v-.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/></svg>';
function lesson(){
  SCREEN='lesson';CARDKEY=null;
  const q=L.qs[L.i];E={q,hint:false,done:false};
  const uname=lname(L.ui);
  const noHint=L.cfg&&L.cfg.diff===3;
  app.innerHTML=`<div class="screen lesson${q.type==='input'?' lsplit':''}">
   <div class="ltop"><button class="iconbtn" id="quit" aria-label="Quitter la leçon">${I.x}</button>
     <div class="prog" role="progressbar" aria-valuenow="${L.i}" aria-valuemax="${L.qs.length}"><i style="width:${L.i/L.qs.length*100}%"></i></div>
     ${CMAP[q.skill]?`<button class="iconbtn calcbtn" id="coursebtn" aria-label="Ouvrir le cours" title="Cours">${I.book}</button>`:''}
     ${noHint?'':`<button class="iconbtn calcbtn" id="hint" aria-label="Afficher un indice" aria-expanded="false" title="Indice">${HINT_ICON}</button>`}
     <button class="iconbtn calcbtn" id="calcbtn" aria-label="Ouvrir la calculatrice" title="Calculatrice">${I.calc}</button>
     <span class="hearts" aria-label="${hv(L.hearts)} vies">${I.heart}${hv(L.hearts)}</span></div>
   <div class="scroll lbody">
     <div class="meta"><p class="eyebrow">${uname}${L.cfg?` · ${DIFFS[L.cfg.diff].n} · question ${L.i+1} / ${L.qs.length}`:''}</p>${L.combo>=2?`<span class="combo">Série ×${L.combo}</span>`:''}</div>
     <h2 class="instr">${q.instr}</h2>
     ${noHint?'':`<div class="hint" id="hintbox" hidden><b>Indice.</b> ${q.hint}</div>`}
     ${q.prompt?`<div class="prompt m">${q.prompt}</div>`:''}
     <div id="work"></div>
   </div>
   <div class="foot" id="foot"></div>
   <div class="sheet" id="sheet" hidden></div>
   <div class="calc" id="calc" role="dialog" aria-label="Calculatrice" hidden></div></div>`;
  CALC.open=false;
  app.querySelector('#quit').onclick=home;
  app.querySelector('#calcbtn').onclick=()=>CALC.open?closeCalc():openCalc();
  if($('#coursebtn'))$('#coursebtn').onclick=()=>{closeCalc();openCourse(CMAP[q.skill])};
  if($('#hint'))$('#hint').onclick=()=>{const hb=$('#hintbox'),b=$('#hint');E.hint=true;hb.hidden=!hb.hidden;b.classList.toggle('on',!hb.hidden);b.setAttribute('aria-expanded',!hb.hidden);if(!hb.hidden)hb.scrollIntoView({block:'nearest'})};
  ({balance:mBalance,ruler:mRuler,tiles:mTiles,input:mInput,mcq:mMcq,chain:mChain,point:mPoint})[q.type](q);
}
const $=s=>app.querySelector(s);
const checkBtn=()=>`<p class="msg" id="msg"></p><button class="btn" id="check" disabled>Vérifier</button>`;

function answer(ok,extra=0,given,meta){
  if(E.done)return;E.done=true;closeCalc();
  const q=E.q;let gain=0,tag=null;
  if(!ok){try{tag=q.diag?q.diag(given):null}catch(e){tag=null}if(!ERR[tag])tag='calc'}
  record(q,ok,tag,meta);
  L.log.push({instr:q.instr,prompt:q.promptH||q.prompt||'',ok,explain:q.explain||q.solTxt||''});
  if(ok){L.combo++;L.maxCombo=Math.max(L.maxCombo,L.combo);L.ok++;gain=10+extra+(L.combo>=3?5:0);if(E.hint)gain=Math.ceil(gain/2);L.xp+=gain;sfx.ok();buzz(15)}
  else{L.combo=0;L.ko++;if(!(meta&&meta.noHeart)){L.hearts--;sfx.ko();buzz([40,40,40])}}
  const praise=pick(['Exact !','Bien joué !','Impeccable !','Parfait !']);
  const sh=$('#sheet');sh.className='sheet '+(ok?'ok':'ko');sh.hidden=false;
  sh.innerHTML=`<h3>${ok?I.check:I.x}${ok?praise:'Pas tout à fait'}</h3>
    ${ok?`<p class="gain">+${gain} XP${L.combo>=3?` · série ×${L.combo}`:''}${E.hint?' · indice utilisé':''}${q.note?` · ${q.note}`:''}</p>`:''}
    ${!ok&&tag!=='calc'?`<p class="errtag"><b>Erreur repérée : ${ERR[tag].label.toLowerCase()}.</b> ${ERR[tag].tip}</p>`:''}
    ${q.explain&&(!ok||q.type!=='balance')?`<p class="ex">${ok?'':'<b>Solution.</b> '}${q.explain}</p>`:''}
    ${!ok&&CMAP[q.skill]?`<button class="btn ghost" id="seecourse">${I.book}Revoir le cours : ${COURSE[CMAP[q.skill]].title}</button>`:''}
    <button class="btn ${ok?'good':'bad'}" id="cont">Continuer</button>`;
  if($('#seecourse'))$('#seecourse').onclick=()=>openCourse(CMAP[q.skill]);
  const c=$("#cont");c.focus({preventScroll:true});c.onclick=()=>{L.i++;if(L.hearts<=0||L.i>=L.qs.length)results();else lesson()};
}

/* ---- Balance : équations et inéquations à manipuler ----
   Chaque opération (passer un terme, regrouper, développer, diviser) demande une décision ;
   une mauvaise décision coûte une vie et est enregistrée comme erreur typique. */
const REL={'=':'=','<':'&lt;','<=':'≤','>':'&gt;','>=':'≥'};
const FLIP={'=':'=','<':'>','<=':'>=','>':'<','>=':'<='};
let UID=0;
const T=(k,v)=>({id:++UID,k,v:F(v)});
const G=(a,inner)=>({id:++UID,k:'g',a:F(a),t:inner.map(([k,v])=>({k,v:F(v)}))});
function termH(kind,v,first){const s=v.n<0?MINUS:(first?'':'+'),a=new Fr(Math.abs(v.n),v.d);
  return s+(kind==='x'?(a.one()?'':frH(a))+'<i class="mi">x</i>':frH(a))}
function termI(kind,v,first){const a=new Fr(Math.abs(v.n),v.d),body=kind==='x'?(a.one()?'':frH(a))+'<i class="mi">x</i>':frH(a);
  return first?(v.n<0?MINUS:'')+body:`<span class="op">${v.n<0?MINUS:'+'}</span>${body}`}
function groupI(g,first){const a=new Fr(Math.abs(g.a.n),g.a.d);
  const sgn=g.a.n<0?(first?MINUS:`<span class="op">${MINUS}</span>`):(first?'':'<span class="op">+</span>');
  return sgn+(a.one()?'':frH(a))+'('+g.t.map((x,i)=>termI(x.k,x.v,i===0)).join('')+')'}
const itemI=(it,first)=>it.k==='g'?groupI(it,first):termI(it.k,it.v,first);
const sideI=S=>S.length?S.map((it,i)=>itemI(it,i===0)).join(''):'0';
const eqI=st=>`<span class="m">${sideI(st.L)} <span class="op">${REL[st.rel]}</span> ${sideI(st.R)}</span>`;
const tileCls=it=>it.k==='g'?'sq':it.v.n<0?'n'+it.k:it.k==='x'?'':'c';
const tileTxt=(it,first)=>it.k==='g'?groupI(it,first):termH(it.k,it.v,first);
function sideTiles(S,sd,live){
  return`<div class="side"${sd?` data-side="${sd}"`:''}>${S.length?S.map((it,i)=>`<button class="tile ${tileCls(it)}" ${live?`data-id="${it.id}"`:'tabindex="-1"'} aria-label="${it.k==='g'?'Parenthèse':'Terme'} ${i+1}">${tileTxt(it,i===0)}</button>`).join(''):'<span class="tile zero">0</span>'}</div>`}
const teaserH=q=>sideTiles(q.S.L)+`<span class="eqs">${REL[q.S.rel]}</span>`+sideTiles(q.S.R);
function parOf(S){let g=0;const cnt={L:{x:0,c:0},R:{x:0,c:0}},co={L:F(0),R:F(0)};
  for(const sd of['L','R'])for(const it of S[sd]){
    if(it.k==='g'){g++;it.t.forEach(t=>{cnt[sd][t.k]++;if(t.k==='x')co[sd]=co[sd].add(it.a.mul(t.v))})}
    else{cnt[sd][it.k]++;if(it.k==='x')co[sd]=co[sd].add(it.v)}}
  let best=99;for(const[K,O]of[['L','R'],['R','L']]){const tot=co[K].sub(co[O]);if(tot.zero())continue;
    const n=cnt[O].x+cnt[K].c+Math.max(0,cnt[K].x+cnt[O].x-1)+Math.max(0,cnt[O].c+cnt[K].c-1)+(tot.one()?0:1);best=Math.min(best,n)}
  return g+best}
const uniqBy=(arr,key)=>{const seen=new Set;return arr.filter(o=>{const k=key(o);if(seen.has(k))return false;seen.add(k);return true})};
function mBalance(q){
  q.promptH=q.promptH||eqI(q.S);
  const st={L:q.S.L,R:q.S.R,rel:q.S.rel,hist:[],sel:null,choice:false,mist:0,par:parOf(q.S)};
  $('#work').innerHTML=`<div class="bal"><div class="baltop" id="bt"><div class="eq" id="eq"></div><div class="beam"></div></div><div class="fulc"></div></div>
    <div class="act" id="act" aria-live="polite"></div><ol class="steps" id="steps"></ol>`;
  $('#foot').innerHTML=`<div class="balfoot"><button class="btn ghost" id="undo">${I.undo}Annuler</button><span class="moves" id="moves"></span></div>`;
  const other=sd=>sd==='L'?'R':'L';
  const find=id=>{for(const sd of['L','R']){const i=st[sd].findIndex(x=>x.id===id);if(i>=0)return{sd,i,it:st[sd][i]}}return null};
  const movesTxt=()=>{$('#moves').innerHTML=`Étapes <b>${st.hist.length}</b> · objectif <b>${st.par}</b>${st.mist?` · <span class="mist">${st.mist} erreur${st.mist>1?'s':''}</span>`:''}`};
  const flash=t=>{const f=document.createElement('div');f.className='flash';f.innerHTML=t;$('.bal').appendChild(f);setTimeout(()=>f.remove(),1100)};
  function draw(anim){
    if(st.sel&&!find(st.sel))st.sel=null;
    $('#eq').innerHTML=sideTiles(st.L,'L',true)+`<span class="eqs">${REL[st.rel]}</span>`+sideTiles(st.R,'R',true);
    movesTxt();$('#undo').disabled=!st.hist.length||E.done;
    $('#steps').innerHTML=st.hist.map(h=>`<li><span class="opc">${h.op}</span><span class="se">${eqI(h.after)}</span></li>`).join('');
    if(anim){$('#bt').classList.remove('wob');void $('#bt').offsetWidth;$('#bt').classList.add('wob');app.querySelectorAll('.side').forEach(s=>s.classList.add('pop'))}
    $('#eq').querySelectorAll('.tile[data-id]').forEach(bindTile);
    mark();if(!st.choice)drawAct();
  }
  const mark=()=>app.querySelectorAll('#eq .tile[data-id]').forEach(b=>b.classList.toggle('picked',+b.dataset.id===st.sel));
  function actionsFor(f){const{sd,i,it}=f,S=st[sd],O=st[other(sd)],acts=[];
    if(it.k==='g')acts.push(['dev','Développer']);
    else{acts.push(['move','Passer de l’autre côté']);
      if(S.some((x,j)=>j!==i&&x.k===it.k))acts.push(['comb',it.k==='x'?'Regrouper les termes en x':'Regrouper les nombres']);
      if(it.k==='x'&&S.length===1&&!it.v.one()&&O.length<=1&&O.every(x=>x.k==='c')){const a=it.v;
        acts.push(['div',a.d===1?`Diviser les deux côtés par ${a.n<0?'('+MINUS+Math.abs(a.n)+')':a.n}`:`Multiplier les deux côtés par ${frH(new Fr(a.d,a.n))}`])}}
    return acts}
  function drawAct(){const a=$('#act');
    if(E.done){a.innerHTML='';return}
    if(!st.sel){a.innerHTML=`<p class="ahint">Touche un terme pour voir ce que tu peux faire, ou fais-le glisser de l’autre côté du signe <span class="m">${REL[st.rel]}</span>.</p>`;return}
    const f=find(st.sel),acts=actionsFor(f);
    a.innerHTML=`<p class="ahint">Terme choisi : <span class="m">${itemI(f.it,true)}</span></p><div class="abtns">${acts.map(([k,l])=>`<button class="abtn" data-a="${k}">${l}</button>`).join('')}<button class="abtn ghost" data-a="none">Désélectionner</button></div>`;
    a.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const k=b.dataset.a;if(k==='none'){st.sel=null;draw()}else doAction(k,find(st.sel))});
  }
  function doAction(k,f,tid){
    if(!f||E.done)return;const{sd,i,it}=f,os=other(sd);let qn,opts,apply,op;st.sel=it.id;mark();
    if(k==='move'){const nv=it.v.neg();
      qn=`En passant de l’autre côté du signe <span class="m">${REL[st.rel]}</span>, le terme <span class="m">${itemI(it,true)}</span> devient :`;
      opts=[{h:termI(it.k,nv,true),ok:1},{h:termI(it.k,it.v,true),tag:'signe'}];
      op=`${termI(it.k,it.v,true)} ⇄`;
      apply=()=>({[sd]:st[sd].filter((_,j)=>j!==i),[os]:[...st[os],T(it.k,nv)]})}
    else if(k==='comb'){const S=st[sd],j=tid!=null?S.findIndex(x=>x.id===tid):S.findIndex((x,jj)=>jj!==i&&x.k===it.k),b=S[j],sum=it.v.add(b.v);
      qn=`Regroupe : <span class="m">${termI(it.k,it.v,true)}${termI(b.k,b.v,false)}</span> = ?`;
      const cands=uniqBy([{v:sum,ok:1},{v:it.v.sub(b.v),tag:'signe'},{v:sum.neg(),tag:'signe'},{v:sum.add(F(1)),tag:'calc'},{v:sum.sub(F(1)),tag:'calc'}],o=>o.v.n+'/'+o.v.d).slice(0,3);
      opts=cands.map(o=>({h:o.v.zero()?'0':termI(it.k,o.v,true),ok:o.ok,tag:o.tag}));
      op='Regrouper';
      apply=()=>{const S2=S.filter((_,jj)=>jj!==i&&jj!==j);if(!sum.zero())S2.splice(Math.min(i,j),0,T(it.k,sum));return{[sd]:S2}}}
    else if(k==='dev'){const a=it.a,[t1,t2]=it.t,r1=a.mul(t1.v),r2=a.mul(t2.v),ex=(u,v)=>termI(t1.k,u,true)+termI(t2.k,v,false);
      qn=`Développe : <span class="m">${groupI(it,true)}</span> = ?`;
      opts=uniqBy([{h:ex(r1,r2),ok:1},{h:ex(r1,t2.v),tag:'distrib'},{h:ex(r1,r2.neg()),tag:'signe'}],o=>o.h);
      op='Développer';
      apply=()=>{const S2=[...st[sd]];S2.splice(i,1,T(t1.k,r1),T(t2.k,r2));return{[sd]:S2}}}
    else if(k==='div'){const a=it.v,O=st[os],c=O.length?O[0].v:F(0),r=c.div(a),xl=sd==='L',nrel=a.n<0?FLIP[st.rel]:st.rel;
      const stmt=(rel,v)=>`<span class="m">${xl?`<i>x</i> <span class="op">${REL[rel]}</span> ${frH(v)}`:`${frH(v)} <span class="op">${REL[rel]}</span> <i>x</i>`}</span>`;
      const by=a.d===1?a:new Fr(a.d,a.n);
      qn=`On ${a.d===1?'divise':'multiplie'} les deux côtés par <span class="m">${by.n<0?'('+frH(by)+')':frH(by)}</span>. On obtient :`;
      const c2=[{h:stmt(nrel,r),ok:1}];
      if(st.rel!=='=')c2.push({h:stmt(a.n<0?st.rel:FLIP[st.rel],r),tag:'ineq-flip'});
      if(!r.zero())c2.push({h:stmt(nrel,r.neg()),tag:'signe'});
      if(st.rel==='=')c2.push({h:stmt(nrel,c.mul(a)),tag:'calc'});
      opts=uniqBy(c2,o=>o.h);
      op=a.d===1?`÷ ${a.n<0?'('+frH(a)+')':frH(a)}`:`× ${by.n<0?'('+frH(by)+')':frH(by)}`;
      apply=()=>({[sd]:[T('x',1)],[os]:[T('c',r)],rel:nrel})}
    ask(qn,shuffle(opts),apply,op);
  }
  function ask(qn,opts,apply,op){
    st.choice=true;const a=$('#act');
    a.innerHTML=`<div class="choice"><p class="cq">${qn}</p><div class="opts">${opts.map((o,i)=>`<button class="opt" data-i="${i}">${o.h}</button>`).join('')}</div>
      <p class="cfb" id="cfb"></p><button class="abtn ghost" id="cback">Changer d’action</button></div>`;
    $('#cback').onclick=()=>{st.choice=false;st.sel=null;draw()};
    a.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(E.done)return;const o=opts[+b.dataset.i];
      if(o.ok){const before={L:st.L,R:st.R,rel:st.rel};Object.assign(st,apply());st.hist.push({op,before,after:{L:st.L,R:st.R,rel:st.rel}});
        st.sel=null;st.choice=false;sfx.tap();flash(op);draw(true);checkWin()}
      else{b.classList.add('wrong');b.disabled=true;$('#cfb').innerHTML=`<b>${ERR[o.tag].label}.</b> ${ERR[o.tag].tip}`;mistake(o.tag)}});
    a.scrollIntoView({block:'nearest'});
  }
  function mistake(tag){st.mist++;L.hearts--;L.combo=0;sfx.ko();buzz([40,40,40]);recordErr(q.skill,tag);movesTxt();
    const h=$('.hearts');if(h){h.innerHTML=I.heart+hv(L.hearts);h.setAttribute('aria-label',hv(L.hearts)+' vies');h.classList.remove('hit');void h.offsetWidth;h.classList.add('hit')}
    if(L.hearts<=0){q.explain=q.solTxt;setTimeout(()=>answer(false,0,null,{noHeart:true,noErr:true}),900)}}
  function checkWin(){for(const[K,O]of[['L','R'],['R','L']]){const a=st[K],b=st[O];
    if(a.length===1&&a[0].k==='x'&&a[0].v.one()&&b.length<=1&&b.every(x=>x.k==='c')){
      const n=st.hist.length,good=n<=st.par&&!st.mist;
      q.note=`résolu en ${n} étape${n>1?'s':''}${st.mist?`, ${st.mist} erreur${st.mist>1?'s':''}`:n<=st.par?', objectif atteint':` (objectif ${st.par})`}`;
      q.explain=q.solTxt;$('#act').innerHTML=`<p class="ahint win">Résolu : ${q.solTxt}</p>`;
      setTimeout(()=>answer(true,good?5:0,null,{q:st.mist?Math.max(.3,1-.35*st.mist):n<=st.par?1:.8}),700);return}}}
  // Glisser-déposer : sur l'autre côté = passer le terme ; sur un terme semblable du même côté = regrouper
  function targetAt(ev){const el=document.elementFromPoint(ev.clientX,ev.clientY);if(!el)return null;
    const t=el.closest('#eq .tile[data-id]');if(t&&+t.dataset.id!==st.sel)return{tile:+t.dataset.id,el:t};
    const s=el.closest('#eq .side[data-side]');if(s)return{side:s.dataset.side,el:s};
    const er=$('#eq').getBoundingClientRect();
    if(ev.clientY>er.top-50&&ev.clientY<er.bottom+50&&ev.clientX>er.left-20&&ev.clientX<er.right+20){const g=$('#eq .eqs').getBoundingClientRect(),sd=ev.clientX<g.left+g.width/2?'L':'R';return{side:sd,el:$(`#eq .side[data-side="${sd}"]`)}}
    return null}
  const clearDrop=()=>app.querySelectorAll('#eq .drop').forEach(x=>x.classList.remove('drop'));
  function bindTile(b){const id=+b.dataset.id;
    b.addEventListener('pointerdown',e=>{if(E.done||st.choice||e.button>0)return;
      const sx=e.clientX,sy=e.clientY;let gh=null;try{b.setPointerCapture(e.pointerId)}catch(_){}
      const mv=ev=>{if(!gh&&Math.hypot(ev.clientX-sx,ev.clientY-sy)>8){gh=b.cloneNode(true);gh.classList.add('ghost');gh.removeAttribute('data-id');document.body.appendChild(gh);b.classList.add('dragging');st.sel=id;mark()}
        if(gh){gh.style.left=ev.clientX+'px';gh.style.top=ev.clientY+'px';clearDrop();const t=targetAt(ev);if(t&&t.el)t.el.classList.add('drop')}};
      const end=ev=>{b.removeEventListener('pointermove',mv);b.removeEventListener('pointerup',end);b.removeEventListener('pointercancel',end);
        if(gh){gh.remove();b.classList.remove('dragging');clearDrop();if(ev.type==='pointerup')drop(id,ev);else draw()}
        else if(ev.type==='pointerup')tapTile(id)};
      b.addEventListener('pointermove',mv);b.addEventListener('pointerup',end);b.addEventListener('pointercancel',end)});
    b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tapTile(id)}});
  }
  function tapTile(id){if(st.choice||E.done)return;st.sel=st.sel===id?null:id;sfx.tap();draw()}
  function drop(id,ev){const f=find(id),t=targetAt(ev);if(!f||!t){draw();return}
    if(t.tile!=null){const g=find(t.tile);if(g&&g.sd===f.sd&&g.it.k===f.it.k&&f.it.k!=='g'){draw();doAction('comb',find(id),t.tile);return}
      if(g&&g.sd!==f.sd&&f.it.k!=='g'){draw();doAction('move',find(id));return}}
    else if(t.side&&t.side!==f.sd){if(f.it.k==='g'){draw();$('#act').insertAdjacentHTML('afterbegin','<p class="ahint warn">Développe d’abord la parenthèse.</p>');return}
      draw();doAction('move',find(id));return}
    draw()}
  $('#undo').onclick=()=>{const h=st.hist.pop();if(h&&!E.done){Object.assign(st,{L:h.before.L,R:h.before.R,rel:h.before.rel,sel:null,choice:false});draw()}};
  draw(false);
}
