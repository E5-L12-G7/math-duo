/* ---- Rappel de cours : le cours comme un graphe de notions ----
   L'appli propose une notion ; l'élève tape de mémoire tout ce qui s'y rattache (notions, formules, propriétés, méthodes).
   On compare avec les voisins de la notion dans le graphe (graph/<parcours>.json) : liens retrouvés, oubliés
   (avec la phrase qui explique le lien), liens indirects, propositions non reconnues. L'élève peut ensuite rebondir
   sur une notion oubliée et parcourir le cours de proche en proche. Progression : ST.recall[id] = {n, last, r, best}. */
const RNORM=s=>String(s).toLowerCase().replace(/x̄|x̄/g,'xbarre').replace(/([a-z])['’′]+(?![a-z])/g,(m,c)=>c+'′'.repeat(m.length-1)).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[’'`´]/g,' ')
  .replace(/[−–—]/g,'-').replace(/[×·]/g,'*').replace(/²/g,'^2').replace(/³/g,'^3').replace(/\s+/g,' ').trim()
  .replace(/^(le|la|les|l|un|une|des|du|de|d) /,'');
const RCOMP=s=>s.replace(/[\s.,;:?"«»]/g,'');
const GRAPH={};
Object.entries(typeof GRAPH_SRC==='object'?GRAPH_SRC:{}).forEach(([tr,g])=>{
  const nodes=new Map((g.nodes||[]).map(n=>[n.id,n]));if(!nodes.size)return;
  const adj=new Map([...nodes.keys()].map(id=>[id,[]]));
  (g.edges||[]).forEach(e=>{if(nodes.has(e.a)&&nodes.has(e.b)&&e.a!==e.b){adj.get(e.a).push({id:e.b,rel:e.rel});adj.get(e.b).push({id:e.a,rel:e.rel})}});
  const keys=[];nodes.forEach(n=>[n.label,...(n.aliases||[])].forEach(a=>{const k=RCOMP(RNORM(a));if(k)keys.push({k,id:n.id})}));
  keys.sort((a,b)=>b.k.length-a.k.length);
  GRAPH[tr]={nodes,adj,keys,exact:new Map(keys.map(x=>[x.k,x.id]))}});
function lev(a,b,max){if(Math.abs(a.length-b.length)>max)return max+1;let p=Array.from({length:b.length+1},(_,j)=>j);
  for(let i=1;i<=a.length;i++){const c=[i];let lo=i;for(let j=1;j<=b.length;j++){c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));lo=Math.min(lo,c[j])}if(lo>max)return max+1;p=c}return p[b.length]}
/* Reconnaît la notion désignée par une saisie libre (alias, fautes de frappe légères, saisie qui contient la notion) */
function rMatch(G,txt){const e=RCOMP(RNORM(txt));if(!e)return null;
  if(G.exact.has(e))return G.exact.get(e);
  const tol=e.length>=9?2:e.length>=5?1:0;let best=null,bd=9;
  if(tol)for(const{k,id}of G.keys){if(k.length<4||(Math.min(k.length,e.length)<=6&&(k.startsWith(e)||e.startsWith(k))))continue;const d=lev(e,k,tol);if(d<=tol&&d<bd){bd=d;best=id}}
  if(best)return best;
  for(const{k,id}of G.keys)if(k.length>=4&&e.includes(k))return id;
  if(e.length>=8)for(const{k,id}of G.keys)if(k.includes(e)&&k.length<=e.length*1.4)return id;
  return null}
function rPath(G,a,b){const prev=new Map([[a,null]]),q=[a];while(q.length){const v=q.shift();if(v===b)break;for(const{id}of G.adj.get(v))if(!prev.has(id)){prev.set(id,v);q.push(id)}}
  if(!prev.has(b))return null;const p=[];for(let v=b;v!==null;v=prev.get(v))p.unshift(v);return p}
const rRel=(G,a,b)=>(G.adj.get(a).find(x=>x.id===b)||{}).rel||'';
const rMast=id=>{const t=(ST.recall||{})[id];return t?t.r:null};
const rLevel=r=>r===null?0:r<.4?1:r<.75?2:3;
const RLV=[['pas encore vue','var(--line)'],['à retravailler','var(--t-c)'],['en cours','var(--t-sq)'],['maîtrisée','var(--good)']];
const chName=id=>{const u=UNITS.find(x=>x.id===id);return u?u.name:''};
function rPick(tr,ch,avoid){const G=GRAPH[tr],now=Date.now();let c=[...G.nodes.values()].filter(n=>(!ch||n.ch===ch)&&n.id!==avoid);if(!c.length)c=[...G.nodes.values()];
  const TU=UNITS.filter(u=>u.tr===tr),started=u=>(ST.stars[u.id]||0)>0||u.skills.some(k=>ST.skills[k.id]&&ST.skills[k.id].a);
  const cw=new Map(TU.map((u,i)=>[u.id,started(u)?1.4:1/(1+i*.6)]));
  const w=c.map(n=>{const t=(ST.recall||{})[n.id];if(!t)return .2+1.1*(cw.get(n.ch)??.5);return .15+(1-t.r)+Math.min(1,(now-t.last)/(7*864e5))*.6});
  let x=Math.random()*w.reduce((a,b)=>a+b,0);for(let i=0;i<c.length;i++){x-=w[i];if(x<=0)return c[i].id}return c[c.length-1].id}
function graphStats(tr,ch){const G=GRAPH[tr];if(!G)return null;const ns=[...G.nodes.values()].filter(n=>!ch||n.ch===ch),o={n:ns.length,seen:0,mast:0};
  ns.forEach(n=>{const r=rMast(n.id);if(r!==null){o.seen++;if(r>=.75)o.mast++}});return o}

/* ---- Séance de rappel ---- */
function recall(tr,{ch=null,node=null,back=home}={}){const G=GRAPH[tr];if(!G)return;
  L=null;SCREEN='recall';CARDKEY=null;
  const S={id:node||rPick(tr,ch),entries:[],done:false,count:0};
  const draw=()=>{const n=G.nodes.get(S.id),deg=G.adj.get(S.id).length;
    app.innerHTML=`<div class="screen">
      <div class="ltop"><button class="iconbtn" id="rq" aria-label="Quitter le rappel">${I.x}</button><p class="eyebrow rtop">Rappel de cours · ${TRACKS[tr].short||TRACKS[tr].name}${ch?' · '+chName(ch):''}</p><span class="ccount">${S.count+1}</span></div>
      <div class="scroll rbody">
        <section class="rcard"><p class="rkind">${({notion:'Notion',formule:'Formule',propriete:'Propriété',methode:'Méthode',valeur:'Valeur',objet:'Objet'})[n.kind]||'Notion'} · ${chName(n.ch)}</p>
          <h2 class="rlabel">${escH(n.label)}</h2>
          <p class="rask">Cite tout ce qui s’y rattache : notions, formules, propriétés, méthodes. Le cours en relie <b>${deg}</b>.</p></section>
        <form class="rform" id="rform"><input id="rin" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Une notion, une formule…" aria-label="Ajouter un élément"><button class="btn sm" type="submit">Ajouter</button></form>
        <div class="rchips" id="rchips">${S.entries.map((e,i)=>`<span class="rchip">${escH(e)}<button type="button" data-rm="${i}" aria-label="Retirer ${escH(e)}">×</button></span>`).join('')}</div>
        <p class="rhint">${S.entries.length?`${S.entries.length} élément${S.entries.length>1?'s':''}. Continue tant que des idées viennent : chaque lien retrouvé renforce ta mémoire.`:'Une idée par ligne, puis Entrée. Orthographe approximative acceptée.'}</p>
      </div>
      <div class="foot"><div class="trow"><button class="btn ghost" id="rgive">Je sèche</button><button class="btn" id="rok" ${S.entries.length?'':'disabled'}>J’ai fini</button></div></div></div>`;
    const inp=$('#rin');
    const add=()=>{const v=inp.value.trim();if(!v)return;if(!S.entries.some(x=>RNORM(x)===RNORM(v)))S.entries.push(v);sfx.tap();draw();$('#rin').focus()};
    $('#rform').onsubmit=e=>{e.preventDefault();add()};
    inp.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();add()}};
    app.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{S.entries.splice(+b.dataset.rm,1);draw();$('#rin').focus()});
    $('#rq').onclick=back;$('#rok').onclick=()=>result();$('#rgive').onclick=()=>result();
    inp.focus({preventScroll:true})};
  const result=()=>{const nb=G.adj.get(S.id),nbIds=new Set(nb.map(x=>x.id)),found=new Set,indirect=[],unknown=[],self=[];
    S.entries.forEach(t=>{const id=rMatch(G,t);
      if(!id)unknown.push(t);else if(id===S.id)self.push(t);else if(nbIds.has(id))found.add(id);
      else if(!indirect.some(x=>x.id===id)){const p=rPath(G,S.id,id);indirect.push({t,id,p})}});
    const ratio=nb.length?found.size/nb.length:0;
    ST.recall=ST.recall||{};const o=ST.recall[S.id]||{n:0,best:0};ST.recall[S.id]={n:o.n+1,last:Date.now(),r:o.n?+(.4*o.r+.6*ratio).toFixed(3):+ratio.toFixed(3),best:Math.max(o.best||0,ratio)};
    const gain=found.size*2+(indirect.length?1:0);if(gain){ST.xp+=gain;const d=dkey();if(ST.day.d!==d)ST.day={d,xp:0};ST.day.xp+=gain}
    save();(found.size?sfx.ok:sfx.ko)();
    const n=G.nodes.get(S.id),miss=nb.filter(x=>!found.has(x.id)),hit=nb.filter(x=>found.has(x.id));
    const lbl=id=>escH(G.nodes.get(id).label);
    app.innerHTML=`<div class="screen">
      <div class="ltop"><button class="iconbtn" id="rq" aria-label="Quitter le rappel">${I.x}</button><p class="eyebrow rtop">Rappel de cours · ${escH(n.label)}</p><span class="ccount">${S.count+1}</span></div>
      <div class="scroll rbody">
        <section class="rscore"><div><b>${found.size}</b><span> / ${nb.length}</span></div><p>${found.size===nb.length?'Tous les liens retrouvés. Bravo !':found.size?`lien${found.size>1?'s':''} retrouvé${found.size>1?'s':''} sur ${nb.length}. Les oubliés sont en pointillés : touche-les pour rebondir.`:'Aucun lien retrouvé cette fois. Lis les liens ci-dessous, puis rebondis sur l’un d’eux.'}${gain?` +${gain} XP.`:''}</p></section>
        <div class="rego">${egoSVG(G,S.id,found)}</div>
        <p class="rdef"><b>${escH(n.label)}</b> : ${escH(n.def||'')}</p>
        ${hit.length?`<section class="rsec"><h3>Retrouvés</h3><ul class="rlist">${hit.map(x=>`<li class="ok"><b>${lbl(x.id)}</b><span>${escH(x.rel)}</span></li>`).join('')}</ul></section>`:''}
        ${miss.length?`<section class="rsec"><h3>Oubliés</h3><ul class="rlist">${miss.map(x=>`<li class="ko"><button class="rgo" data-go="${x.id}"><b>${lbl(x.id)}</b><span>${escH(x.rel)}</span><small>Rappel sur cette notion →</small></button></li>`).join('')}</ul></section>`:''}
        ${[[2,'Liens indirects',`reliées à « ${escH(n.label)} » par un intermédiaire`],[3,'Plus loin dans le graphe','notions du cours, mais à plusieurs étapes de celle-ci']].map(([dd,tt,ss])=>{const L2=indirect.filter(x=>dd===2?x.p&&x.p.length===3:!(x.p&&x.p.length===3));return L2.length?`<section class="rsec"><h3>${tt}</h3><p class="empty">${ss[0].toUpperCase()+ss.slice(1)} :</p><ul class="rlist">${L2.map(x=>`<li class="ind"><b>${escH(x.t)}</b> → ${lbl(x.id)}<span>${x.p?x.p.map(lbl).join(' — '):'pas de chemin'}</span>${x.p&&x.p.length===3?`<small>${escH(rRel(G,x.p[0],x.p[1]))} ${escH(rRel(G,x.p[1],x.p[2]))}</small>`:''}</li>`).join('')}</ul></section>`:''}).join('')}
        ${unknown.length?`<section class="rsec"><h3>Non reconnus</h3><p class="empty">Vérifie l’orthographe, ou ces idées sortent du graphe de ce parcours : ${unknown.map(t=>`<span class="rchip plain">${escH(t)}</span>`).join(' ')}</p></section>`:''}
      </div>
      <div class="foot"><div class="trow"><button class="btn ghost" id="rmap">Voir le graphe</button><button class="btn" id="rnext">Notion suivante</button></div></div></div>`;
    $('#rq').onclick=back;$('#rmap').onclick=()=>graphMap(tr,{focus:S.id,back});
    $('#rnext').onclick=()=>{S.id=rPick(tr,ch,S.id);S.entries=[];S.count++;draw()};
    app.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{S.id=b.dataset.go;S.entries=[];S.count++;draw()})};
  draw()}
/* Graphe local : la notion au centre, ses voisins autour (retrouvés pleins, oubliés en pointillés) */
function egoSVG(G,id,found){const nb=G.adj.get(id),W=440,H=260,cx=W/2,cy=H/2,R=92,k=nb.length;
  const cut=t=>t.length>17?t.slice(0,16)+'…':t;let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Notion et ses liens">`;
  const P=nb.map((x,i)=>{const a=-Math.PI/2+2*Math.PI*i/k;return{x,a,X:cx+R*Math.cos(a),Y:cy+R*.92*Math.sin(a)}});
  P.forEach(p=>{const f=found.has(p.x.id);s+=`<line x1="${cx}" y1="${cy}" x2="${p.X}" y2="${p.Y}" stroke="${f?'var(--good)':'var(--muted)'}" stroke-width="${f?2:1.2}" ${f?'':'stroke-dasharray="4 4"'}/>`});
  P.forEach(p=>{const f=found.has(p.x.id),lab=escH(cut(G.nodes.get(p.x.id).label)),c=Math.cos(p.a),anc=c>.3?'start':c<-.3?'end':'middle',dx=c>.3?10:c<-.3?-10:0,dy=Math.sin(p.a)>.3?18:Math.sin(p.a)<-.3?-10:4;
    s+=`<g class="rnode" data-go="${p.x.id}"><circle cx="${p.X}" cy="${p.Y}" r="7" fill="${f?'var(--good)':'var(--surface)'}" stroke="${f?'var(--good)':'var(--muted)'}" stroke-width="1.5" ${f?'':'stroke-dasharray="3 2"'}/>
      <text x="${p.X+dx}" y="${p.Y+dy}" text-anchor="${anc}" font-size="11" fill="${f?'var(--ink)':'var(--muted)'}">${lab}</text></g>`});
  s+=`<circle cx="${cx}" cy="${cy}" r="11" fill="var(--t-sq)"/><title>${escH(G.nodes.get(id).label)}</title></svg>`;return s}

/* ---- Carte du graphe : tout le parcours, couleurs selon la maîtrise ---- */
const RLAY={};
function rLayout(tr){if(RLAY[tr])return RLAY[tr];const G=GRAPH[tr],ids=[...G.nodes.keys()],n=ids.length,rnd=mulberry32(7),ix=new Map(ids.map((id,i)=>[id,i]));
  const chs=[...new Set(ids.map(id=>G.nodes.get(id).ch))],pos=ids.map(id=>{const c=chs.indexOf(G.nodes.get(id).ch),a=2*Math.PI*c/chs.length;return{x:Math.cos(a)*300+rnd()*120-60,y:Math.sin(a)*300+rnd()*120-60}});
  const E=[];G.adj.forEach((l,a)=>l.forEach(({id})=>{if(a<id)E.push([ix.get(a),ix.get(id)])}));
  const area=900*900,kk=1.7*Math.sqrt(area/n);let t=120;
  for(let it=0;it<350;it++){const d=pos.map(()=>({x:0,y:0}));
    for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){let dx=pos[i].x-pos[j].x,dy=pos[i].y-pos[j].y,dist=Math.hypot(dx,dy)||.01;const f=kk*kk/dist;dx/=dist;dy/=dist;d[i].x+=dx*f;d[i].y+=dy*f;d[j].x-=dx*f;d[j].y-=dy*f}
    for(const[i,j]of E){let dx=pos[i].x-pos[j].x,dy=pos[i].y-pos[j].y,dist=Math.hypot(dx,dy)||.01;const f=dist*dist/kk;dx/=dist;dy/=dist;d[i].x-=dx*f;d[i].y-=dy*f;d[j].x+=dx*f;d[j].y+=dy*f}
    for(let i=0;i<n;i++){const m=Math.hypot(d[i].x,d[i].y)||1;pos[i].x+=d[i].x/m*Math.min(m,t);pos[i].y+=d[i].y/m*Math.min(m,t);pos[i].x-=pos[i].x*.01;pos[i].y-=pos[i].y*.01}
    t=Math.max(2,t*.985)}
  const xs=pos.map(p=>p.x),ys=pos.map(p=>p.y),x0=Math.min(...xs),y0=Math.min(...ys),sc=1000/Math.max(Math.max(...xs)-x0,Math.max(...ys)-y0,1);
  return RLAY[tr]={ids,ix,E,P:pos.map(p=>({x:40+(p.x-x0)*sc,y:40+(p.y-y0)*sc})),W:1080,H:40+(Math.max(...ys)-y0)*sc+40}}
function graphMap(tr,{focus=null,ch=null,back=home}={}){const G=GRAPH[tr];if(!G)return;L=null;SCREEN='graph';CARDKEY=null;
  const Ly=rLayout(tr),st=graphStats(tr);let sel=focus,vb=null;
  const chs=[...new Set(Ly.ids.map(id=>G.nodes.get(id).ch))];
  app.innerHTML=`<div class="screen">
    <div class="ltop"><button class="iconbtn" id="gq" aria-label="Retour">${I.l}</button><p class="eyebrow rtop">Graphe · ${TRACKS[tr].short||TRACKS[tr].name}</p><span class="ccount">${st.mast} / ${st.n}</span></div>
    <div class="gwrap"><div class="gbar"><select id="gch" aria-label="Chapitre mis en évidence"><option value="">Tous les chapitres</option>${chs.map(c=>`<option value="${c}"${c===ch?' selected':''}>${escH(chName(c)||c)}</option>`).join('')}</select>
      <button class="iconbtn" id="gzi" aria-label="Zoomer">+</button><button class="iconbtn" id="gzo" aria-label="Dézoomer">−</button><button class="iconbtn" id="gz0" aria-label="Vue d’ensemble">⤢</button></div>
      <div class="gsvg" id="gsvg"></div>
      <div class="clegend">${RLV.map(([l,c])=>`<span><i style="background:${c}"></i>${l}</span>`).join('')}</div></div>
    <div class="gsheet" id="gsheet" hidden></div></div>`;
  const svgBox=$('#gsvg');
  const draw=()=>{const hl=$('#gch').value,nbS=sel?new Set(G.adj.get(sel).map(x=>x.id)):null;
    let s=`<svg id="gs" viewBox="${vb||`0 0 ${Ly.W} ${Ly.H}`}" role="img" aria-label="Graphe des notions du parcours">`;
    Ly.E.forEach(([i,j])=>{const a=Ly.ids[i],b=Ly.ids[j],on=sel&&(a===sel||b===sel),dim=hl&&G.nodes.get(a).ch!==hl&&G.nodes.get(b).ch!==hl;
      s+=`<line x1="${Ly.P[i].x}" y1="${Ly.P[i].y}" x2="${Ly.P[j].x}" y2="${Ly.P[j].y}" stroke="${on?'var(--t-sq)':'var(--line)'}" stroke-width="${on?3:1.4}" opacity="${dim?.25:1}"/>`});
    Ly.ids.forEach((id,i)=>{const n=G.nodes.get(id),lv=rLevel(rMast(id)),p=Ly.P[i],dim=(hl&&n.ch!==hl)||(sel&&id!==sel&&!nbS.has(id)),deg=G.adj.get(id).length,r=7+Math.min(8,deg);
      s+=`<g class="gnode" data-n="${id}" opacity="${dim?.3:1}"><circle cx="${p.x}" cy="${p.y}" r="${r}" fill="${RLV[lv][1]}" stroke="${id===sel?'var(--ink)':'var(--surface)'}" stroke-width="${id===sel?4:2}"/>
        <text x="${p.x}" y="${p.y+r+15}" text-anchor="middle" font-size="17" fill="var(--ink)">${escH(n.label.length>22?n.label.slice(0,21)+'…':n.label)}</text></g>`});
    svgBox.innerHTML=s+'</svg>';
    svgBox.querySelectorAll('.gnode').forEach(g=>g.onclick=e=>{e.stopPropagation();sel=g.dataset.n;sfx.tap();draw();sheet()});
    bindPan()};
  const sheet=()=>{const sh=$('#gsheet');if(!sel){sh.hidden=true;return}const n=G.nodes.get(sel),r=rMast(sel),t=(ST.recall||{})[sel];
    sh.hidden=false;sh.innerHTML=`<div class="chead"><div><p class="eyebrow">${escH(chName(n.ch))}</p><h3>${escH(n.label)}</h3></div><button class="iconbtn" id="gsx" aria-label="Fermer">${I.x}</button></div>
      <p>${escH(n.def||'')}</p><p class="empty">${t?`Rappelée ${t.n} fois · ${Math.round(r*100)} % des liens (meilleur : ${Math.round(t.best*100)} %)`:'Pas encore travaillée en rappel.'} · ${G.adj.get(sel).length} liens dans le cours.</p>
      <button class="btn" id="gtest">Me tester sur cette notion</button>`;
    $('#gsx').onclick=()=>{sel=null;draw();sheet()};$('#gtest').onclick=()=>recall(tr,{node:sel,back:()=>graphMap(tr,{focus:sel,back})})};
  const cur=()=>(vb||`0 0 ${Ly.W} ${Ly.H}`).split(' ').map(Number);
  const zoom=f=>{const[x,y,w,h]=cur(),nw=Math.min(Ly.W*1.2,Math.max(150,w*f)),nh=h*nw/w;vb=`${x+(w-nw)/2} ${y+(h-nh)/2} ${nw} ${nh}`;draw()};
  function bindPan(){const g=$('#gs');let pts=new Map,start=null;
    g.onpointerdown=e=>{pts.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pts.size===1)start={v:cur(),x:e.clientX,y:e.clientY,moved:false};else if(pts.size===2){const[a,b]=[...pts.values()];start={v:cur(),d:Math.hypot(a.x-b.x,a.y-b.y),pinch:true}}};
    g.onpointermove=e=>{if(!pts.has(e.pointerId)||!start)return;pts.set(e.pointerId,{x:e.clientX,y:e.clientY});const r=g.getBoundingClientRect(),[x,y,w,h]=start.v;
      if(start.pinch&&pts.size===2){const[a,b]=[...pts.values()],f=start.d/Math.max(20,Math.hypot(a.x-b.x,a.y-b.y)),nw=Math.min(Ly.W*1.2,Math.max(150,w*f)),nh=h*nw/w;vb=`${x+(w-nw)/2} ${y+(h-nh)/2} ${nw} ${nh}`;g.setAttribute('viewBox',vb);return}
      const dx=(e.clientX-start.x)*w/r.width,dy=(e.clientY-start.y)*h/r.height;if(Math.abs(dx)+Math.abs(dy)>3)start.moved=true;vb=`${x-dx} ${y-dy} ${w} ${h}`;g.setAttribute('viewBox',vb)};
    const up=e=>{pts.delete(e.pointerId);if(!pts.size)start=null};g.onpointerup=up;g.onpointercancel=up;
    g.onclick=e=>{if(e.target.closest('.gnode'))return;if(sel){sel=null;draw();sheet()}}}
  $('#gq').onclick=back;$('#gch').onchange=()=>{sel=null;draw();sheet()};
  $('#gzi').onclick=()=>zoom(.7);$('#gzo').onclick=()=>zoom(1/.7);$('#gz0').onclick=()=>{vb=null;draw()};
  {const r=svgBox.getBoundingClientRect(),asp=r.width&&r.height?r.height/r.width:1.4,w=Ly.W*(focus?.45:.6),h=w*asp,c=focus?Ly.P[Ly.ix.get(focus)]:{x:Ly.W/2,y:Ly.H/2};vb=`${c.x-w/2} ${c.y-h/2} ${w} ${h}`}
  draw();sheet()}
/* Encadrés d'accès : accueil (parcours) et chapitre */
function recallHome(tr){const st=graphStats(tr);if(!st)return'';
  return`<section class="free rmini"><div><p class="eyebrow">Graphe de notions</p><h3>Rappel de cours</h3><p>L’appli propose une notion, tu cites tout ce qui s’y rattache. ${st.mast} / ${st.n} notions maîtrisées${st.seen<st.n?` · ${st.n-st.seen} jamais travaillées`:''}.</p></div>
    <div class="fcbar" role="img" aria-label="${st.mast} notions maîtrisées sur ${st.n}"><i style="width:${st.n?st.mast/st.n*100:0}%"></i></div>
    <div class="trow"><button class="btn" id="rgo">Lancer un rappel</button><button class="btn ghost" id="rmap0">Voir le graphe</button></div></section>`}
function wireRecallHome(tr){if($('#rgo'))$('#rgo').onclick=()=>{sfx.tap();recall(tr)};if($('#rmap0'))$('#rmap0').onclick=()=>{sfx.tap();graphMap(tr)}}
function recallChapter(u){const st=graphStats(u.tr,u.id);if(!st||!st.n)return'';
  return`<section class="card"><h2>Rappel de cours</h2><p class="empty">${st.n} notions de ce chapitre dans le graphe du parcours · ${st.mast} maîtrisées. Cite de mémoire tout ce qui se rattache à chacune.</p>
    <div class="trow"><button class="btn ghost" id="rch">Rappel sur ce chapitre</button><button class="btn ghost" id="rchmap">Voir le graphe</button></div></section>`}
function wireRecallChapter(ui){const u=UNITS[ui],back=()=>chapter(ui);if($('#rch'))$('#rch').onclick=()=>{sfx.tap();recall(u.tr,{ch:u.id,back})};if($('#rchmap'))$('#rchmap').onclick=()=>{sfx.tap();graphMap(u.tr,{ch:u.id,back})}}
