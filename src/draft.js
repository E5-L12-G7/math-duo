/* ---- Brouillon : un calque transparent posé sur l'écran, sur lequel on écrit au doigt, au stylet ou à la souris ----
   Trois états : fermé (rien n'apparaît), écriture (le calque capte le doigt), lecture (le calque reste visible mais
   les touches passent à l'application en dessous). Les traits sont gardés en mémoire (vecteurs) pour annuler et redessiner. */
const DRAFT={mode:'off',strokes:[],undo:[],col:0,w:1,er:false,grid:false,pen:false};
const DCOLS=['--ink','--t-sq','--neg','--t-x'],DCOLN=['Encre','Bleu','Rouge','Vert'],DW=[1.6,3.2,6];
function draftInit(){
  const root=document.createElement('div');root.id='draft';root.innerHTML=`
    <canvas id="dcv" aria-label="Calque de brouillon" role="img"></canvas>
    <div class="dbar" id="dbar" role="toolbar" aria-label="Outils du brouillon">
      ${DCOLS.map((c,i)=>`<button class="dsw" data-col="${i}" aria-label="${DCOLN[i]}" style="--c:var(${c})"><i></i></button>`).join('')}
      <button class="dtool" id="dw" aria-label="Épaisseur du trait"><svg viewBox="0 0 24 24"><path d="M4 8h16" stroke-width="1.6"/><path d="M4 13h16" stroke-width="3"/><path d="M4 19h16" stroke-width="5"/></svg><span id="dwl"></span></button>
      <button class="dtool" id="der" aria-label="Gomme" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M16.5 3.5l4 4L10 18H5.5l-2-2a1.5 1.5 0 010-2.1z"/><path d="M9.5 7.5l7 7M10 18h10"/></svg></button>
      <button class="dtool" id="dun" aria-label="Annuler le dernier trait"><svg viewBox="0 0 24 24"><path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 010 12h-3"/></svg></button>
      <button class="dtool" id="dgr" aria-label="Quadrillage" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M4 4h16v16H4zM4 10h16M4 15h16M10 4v16M15 4v16"/></svg></button>
      <button class="dtool" id="dcl" aria-label="Tout effacer"><svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg></button>
      <span class="dsp"></span>
      <button class="dtool dtxt" id="dvw" aria-label="Utiliser l’application sous le brouillon">Lire</button>
      <button class="dtool dtxt" id="dhd" aria-label="Fermer le brouillon">Fermer</button>
    </div>
    <div class="dhint" id="dhint" hidden>Brouillon visible. Tu peux répondre en dessous.<button id="dback">Écrire</button><button id="dhide2" aria-label="Fermer le brouillon">${I.x}</button></div>`;
  document.body.appendChild(root);
  const fab=document.createElement('button');fab.id='dfab';fab.className='dfab';fab.setAttribute('aria-label','Ouvrir le brouillon');fab.title='Brouillon';
  fab.innerHTML=`<svg viewBox="0 0 24 24"><path d="M4 20l1-4L16 5a2.1 2.1 0 013 3L8 19z"/><path d="M14 7l3 3"/></svg>`;document.body.appendChild(fab);
  const cv=root.querySelector('#dcv'),cx=cv.getContext('2d');let cur=null,pid=null;
  const size=()=>{const d=devicePixelRatio||1;cv.width=Math.round(innerWidth*d);cv.height=Math.round(innerHeight*d);cv.style.width=innerWidth+'px';cv.style.height=innerHeight+'px';cx.setTransform(d,0,0,d,0,0);redraw()};
  const color=i=>getComputedStyle(document.documentElement).getPropertyValue(DCOLS[i]).trim()||'#16212A';
  const seg=(s,a,b)=>{cx.globalCompositeOperation=s.er?'destination-out':'source-over';cx.strokeStyle=color(s.c);cx.lineCap=cx.lineJoin='round';
    cx.lineWidth=s.er?s.w*6:s.w*(.55+b[2]);cx.beginPath();cx.moveTo(a[0],a[1]);cx.lineTo(b[0],b[1]);cx.stroke()};
  const dot=s=>{const p=s.pts[0];cx.globalCompositeOperation=s.er?'destination-out':'source-over';cx.fillStyle=color(s.c);cx.beginPath();cx.arc(p[0],p[1],(s.er?s.w*6:s.w*(.55+p[2]))/2,0,7);cx.fill()};
  function redraw(){cx.globalCompositeOperation='source-over';cx.clearRect(0,0,innerWidth,innerHeight);
    if(DRAFT.grid){cx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--line').trim();cx.globalAlpha=.55;cx.lineWidth=1;cx.beginPath();
      for(let x=.5;x<innerWidth;x+=22){cx.moveTo(x,0);cx.lineTo(x,innerHeight)}for(let y=.5;y<innerHeight;y+=22){cx.moveTo(0,y);cx.lineTo(innerWidth,y)}cx.stroke();cx.globalAlpha=1}
    DRAFT.strokes.forEach(s=>{if(s.pts.length===1)dot(s);else for(let i=1;i<s.pts.length;i++)seg(s,s.pts[i-1],s.pts[i])});
    cx.globalCompositeOperation='source-over'}
  /* La gomme efface aussi le quadrillage : on le redessine en dessous en fin de trait. */
  const P=e=>{const pr=e.pointerType==='mouse'||!e.pressure?.5:e.pressure;return[e.clientX,e.clientY,pr]};
  cv.addEventListener('pointerdown',e=>{if(DRAFT.mode!=='draw'||pid!==null)return;
    if(e.pointerType==='pen')DRAFT.pen=true;else if(DRAFT.pen&&e.pointerType==='touch')return; // un stylet a servi : on ignore la paume
    pid=e.pointerId;try{cv.setPointerCapture(pid)}catch(_){}cur={c:DRAFT.col,w:DW[DRAFT.w],er:DRAFT.er,pts:[P(e)]};DRAFT.strokes.push(cur);dot(cur);e.preventDefault()});
  cv.addEventListener('pointermove',e=>{if(e.pointerId!==pid||!cur)return;const evs=e.getCoalescedEvents?e.getCoalescedEvents():[e];
    for(const ev of evs.length?evs:[e]){const p=P(ev),q=cur.pts[cur.pts.length-1];if(Math.hypot(p[0]-q[0],p[1]-q[1])<.8)continue;cur.pts.push(p);seg(cur,q,p)}e.preventDefault()});
  const end=e=>{if(e.pointerId!==pid)return;pid=null;if(cur){DRAFT.undo=[];if(cur.er&&DRAFT.grid)redraw()}cur=null};
  cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
  const sync=()=>{const m=DRAFT.mode;root.className=m;fab.hidden=m!=='off';root.querySelector('#dhint').hidden=m!=='view';root.querySelector('#dbar').hidden=m!=='draw';
    root.querySelectorAll('.dsw').forEach(b=>b.classList.toggle('on',!DRAFT.er&&+b.dataset.col===DRAFT.col));
    const er=root.querySelector('#der');er.classList.toggle('on',DRAFT.er);er.setAttribute('aria-pressed',DRAFT.er);
    const gr=root.querySelector('#dgr');gr.classList.toggle('on',DRAFT.grid);gr.setAttribute('aria-pressed',DRAFT.grid);
    root.querySelector('#dwl').textContent=['fin','moyen','épais'][DRAFT.w];
    root.querySelector('#dun').disabled=!DRAFT.strokes.length&&!DRAFT.undo.length;
    fab.classList.toggle('has',DRAFT.strokes.length>0)};
  const set=m=>{DRAFT.mode=m;sync()};
  fab.onclick=()=>{set('draw');size();sfx.tap()};
  root.querySelectorAll('.dsw').forEach(b=>b.onclick=()=>{DRAFT.col=+b.dataset.col;DRAFT.er=false;sync()});
  root.querySelector('#dw').onclick=()=>{DRAFT.w=(DRAFT.w+1)%3;sync()};
  root.querySelector('#der').onclick=()=>{DRAFT.er=!DRAFT.er;sync()};
  root.querySelector('#dgr').onclick=()=>{DRAFT.grid=!DRAFT.grid;redraw();sync()};
  root.querySelector('#dun').onclick=()=>{if(DRAFT.strokes.length)DRAFT.strokes.pop();else if(DRAFT.undo.length)DRAFT.strokes=DRAFT.undo,DRAFT.undo=[];redraw();sync()};
  root.querySelector('#dcl').onclick=()=>{if(!DRAFT.strokes.length)return;DRAFT.undo=DRAFT.strokes;DRAFT.strokes=[];redraw();sync()}; // « Annuler » rétablit tout
  root.querySelector('#dvw').onclick=()=>set('view');
  root.querySelector('#dback').onclick=()=>set('draw');
  root.querySelector('#dhd').onclick=root.querySelector('#dhide2').onclick=()=>set('off');
  addEventListener('resize',()=>{if(DRAFT.mode!=='off')size()});
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',redraw);
  document.addEventListener('keydown',e=>{if(DRAFT.mode==='draw'&&e.key==='Escape'){set('off');e.stopImmediatePropagation()}
    else if(DRAFT.mode==='draw'&&(e.ctrlKey||e.metaKey)&&e.key==='z'){root.querySelector('#dun').click();e.preventDefault()}},true);
  sync()}
draftInit();
