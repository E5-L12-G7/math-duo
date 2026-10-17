/* ---- Figures des exercices (SVG statiques) et exercice « placer un point » ----
   FIG.plot / FIG.cercle / FIG.triangle / FIG.vecteurs / FIG.complexe / FIG.droiteNum renvoient du SVG à mettre dans q.prompt.
   pointQ({…}) : l'élève touche ou fait glisser un point sur une figure ; la réponse est juste si le point est assez près de la cible. */
const FIG={
  /** Courbes : {x:[x0,x1], y:[y0,y1], f:['x^2-1', {f:'2x', c:2, dash:true}], pts:[[x,y,'A']], segs:[[x1,y1,x2,y2]], aire:{f:'x^2', a:0, b:1}, pas, W, H} */
  plot(o={}){const[x0,x1]=o.x||[-5,5],[y0,y1]=o.y||[-4,4],g=gp({W:o.W||300,H:o.H||200,x0,x1,y0,y1}),cols=['var(--t-sq)','var(--t-c)','var(--t-x)','var(--good)'];
    g.axes(o.pas||1,o.pasy||o.pas||1,o.etiq||o.pas||1,o.etiqy||o.pasy||o.pas||1);
    if(o.aire){const f=vzFn(o.aire.f),h=o.aire.g?vzFn(o.aire.g):()=>0;g.area(f,h,o.aire.a,o.aire.b,'var(--t-sq)',.22)}
    (o.f||[]).forEach((c,i)=>{const s=typeof c==='string'?{f:c}:c;g.fn(vzFn(s.f),cols[s.c??i],2.4,s.dash?'6 4':'')});
    (o.segs||[]).forEach(([a,b,c,d,col])=>g.seg(a,b,c,d,col||'var(--muted)',1.6,'5 3'));
    (o.pts||[]).forEach(([x,y,l,h])=>{g.dot(x,y,'var(--ink)',4,!!h);if(l)g.text(x,y,l,'var(--ink)','start',6,-6)});
    return`<div class="qfig">${g.done(o.titre||'Graphique')}</div>`},
  /** Cercle trigonométrique : {deg:[150], rad:[], proj:true, labels:true} */
  cercle(o={}){const g=gp({W:240,H:240,x0:-1.35,x1:1.35,y0:-1.35,y1:1.35});g.axes(1,1,0,0);
    g.raw(`<circle cx="${g.X(0)}" cy="${g.Y(0)}" r="${g.X(1)-g.X(0)}" fill="none" stroke="var(--ink)" stroke-width="1.6"/>`);
    g.text(1,0,'1','var(--muted)','start',4,12,10,false).text(0,1,'1','var(--muted)','start',4,-2,10,false);
    (o.deg||[]).forEach((d,i)=>{const r=d*Math.PI/180,c=Math.cos(r),s=Math.sin(r);g.seg(0,0,c,s,'var(--t-sq)',2);if(o.proj){g.seg(c,0,c,s,'var(--t-c)',1.4,'4 3').seg(0,s,c,s,'var(--t-c)',1.4,'4 3')}
      g.dot(c,s,'var(--t-sq)',5);if(o.noms)g.text(c,s,o.noms[i]||'M','var(--ink)',c<0?'end':'start',c<0?-7:7,s<0?14:-6)});
    return`<div class="qfig qsq">${g.done('Cercle trigonométrique')}</div>`},
  /** Triangle rectangle en C : {A, B, C noms, cotes:{AB:'5', BC:'?'}, angle:'A'} (coordonnées internes fixes) */
  triangle(o={}){const n=o.noms||['A','B','C'],P={[n[0]]:[30,170],[n[1]]:[250,170],[n[2]]:[250,40]};
    const s=[];const L=(a,b)=>P[a]&&P[b];
    s.push(`<polygon points="${Object.values(P).map(p=>p.join(',')).join(' ')}" fill="var(--soft)" stroke="var(--ink)" stroke-width="2"/>`);
    s.push(`<rect x="${P[n[1]][0]-12}" y="${P[n[1]][1]-12}" width="12" height="12" fill="none" stroke="var(--ink)"/>`);
    Object.entries(P).forEach(([k,[x,y]])=>s.push(`<text x="${x+(x<100?-14:8)}" y="${y+(y>100?16:-6)}" font-size="14" font-weight="700" fill="var(--ink)">${k}</text>`));
    Object.entries(o.cotes||{}).forEach(([seg,t])=>{const[a,b]=[seg[0],seg[1]];if(!L(a,b))return;const[x1,y1]=P[a],[x2,y2]=P[b],mx=(x1+x2)/2,my=(y1+y2)/2,dx=y2-y1,dy=x1-x2,l=Math.hypot(dx,dy)||1;
      s.push(`<text x="${mx+dx/l*16}" y="${my+dy/l*16+4}" font-size="13" font-weight="700" text-anchor="middle" fill="${t==='?'?'var(--t-c)':'var(--t-sq)'}">${t}</text>`)});
    if(o.angle&&P[o.angle]){const[x,y]=P[o.angle];s.push(`<path d="M${x+34},${y} A34,34 0 0,0 ${x+34*Math.cos(.535)},${y-34*Math.sin(.535)}" fill="none" stroke="var(--t-c)" stroke-width="2"/><text x="${x+42}" y="${y-8}" font-size="12" font-weight="700" fill="var(--t-c)">${o.angleTxt||''}</text>`)}
    return`<div class="qfig"><svg viewBox="0 0 290 200" role="img" aria-label="Triangle rectangle">${s.join('')}</svg></div>`},
  /** Vecteurs depuis l'origine : {v:[[x,y,'u'],…], x, y} */
  vecteurs(o={}){const[x0,x1]=o.x||[-5,5],[y0,y1]=o.y||[-4,4],g=gp({W:280,H:220,x0,x1,y0,y1}),cols=['var(--t-sq)','var(--t-c)','var(--t-x)'];g.axes(1,1,2,2);
    (o.v||[]).forEach(([x,y,l,ox=0,oy=0],i)=>{g.arrow(ox,oy,ox+x,oy+y,cols[i%3]);if(l)g.text(ox+x,oy+y,l,cols[i%3],'start',6,-6,13)});
    return`<div class="qfig">${g.done('Vecteurs')}</div>`},
  /** Plan complexe : {z:[[re,im,'z']], x, y, cercle:r} */
  complexe(o={}){const[x0,x1]=o.x||[-4,4],[y0,y1]=o.y||[-3,3],g=gp({W:280,H:220,x0,x1,y0,y1});g.axes(1,1,1,1);
    if(o.cercle)g.raw(`<circle cx="${g.X(0)}" cy="${g.Y(0)}" r="${(g.X(o.cercle)-g.X(0)).toFixed(1)}" fill="none" stroke="var(--line)" stroke-dasharray="4 3"/>`);
    g.text(x1,0,'Re','var(--muted)','end',-2,-6,10).text(0,y1,'Im','var(--muted)','start',5,10,10);
    (o.z||[]).forEach(([a,b,l])=>{g.arrow(0,0,a,b,'var(--t-sq)');if(l)g.text(a,b,l,'var(--ink)','start',6,-6,13)});
    return`<div class="qfig">${g.done('Plan complexe')}</div>`},
  /** Droite graduée : {min, max, pts:[[x,'a']], intervalle:[a,b,ouvertA,ouvertB]} */
  droiteNum(o={}){const mn=o.min??-5,mx2=o.max??5,W=300,X=v=>20+(v-mn)/(mx2-mn)*(W-40);let s=`<line x1="12" x2="${W-12}" y1="40" y2="40" stroke="var(--ink)" stroke-width="1.5"/>`;
    for(let v=Math.ceil(mn);v<=mx2;v++)s+=`<line x1="${X(v)}" x2="${X(v)}" y1="35" y2="45" stroke="var(--muted)"/><text x="${X(v)}" y="62" font-size="10" text-anchor="middle" fill="var(--muted)">${num(v)}</text>`;
    if(o.intervalle){const[a,b,oa,ob]=o.intervalle,xa=X(Math.max(mn,a)),xb=X(Math.min(mx2,b));s+=`<line x1="${xa}" x2="${xb}" y1="40" y2="40" stroke="var(--t-sq)" stroke-width="6" stroke-linecap="round" opacity=".7"/>`;
      [[a,oa],[b,ob]].forEach(([v,op])=>{if(v>=mn&&v<=mx2)s+=`<circle cx="${X(v)}" cy="40" r="6" fill="${op?'var(--surface)':'var(--t-sq)'}" stroke="var(--t-sq)" stroke-width="2.5"/>`})}
    (o.pts||[]).forEach(([v,l])=>s+=`<circle cx="${X(v)}" cy="40" r="5" fill="var(--t-c)"/><text x="${X(v)}" y="24" font-size="12" font-weight="700" text-anchor="middle" fill="var(--ink)">${l||''}</text>`);
    return`<div class="qfig"><svg viewBox="0 0 ${W} 72" role="img" aria-label="Droite graduée">${s}</svg></div>`}};

/* ---- Exercice « placer un point » ---- */
function pointQ(o){const box={x:o.x||[-5,5],y:o.y||[-4,4]},snap=o.snap??.5,tol=o.tol??.26;
  const q={type:'point',instr:o.instr,prompt:o.prompt||'',explain:o.explain,hint:o.hint,box,snap,tol,fond:o.fond||{},target:o.cible,ans:o.cible,label:o.nom||'M',
    check:pt=>Array.isArray(pt)&&Math.hypot(pt[0]-o.cible[0],pt[1]-o.cible[1])<=tol,diag:pt=>{try{return o.diag?o.diag(pt):null}catch(e){return null}}};return q}
function mPoint(q){let P=null;const[x0,x1]=q.box.x,[y0,y1]=q.box.y,W=300,Hh=Math.round(300*(y1-y0)/(x1-x0));
  $('#work').innerHTML=`<div class="pwrap"><div class="pfig" id="pfig"></div><p class="pread" id="pread">Touche la figure pour placer le point ${q.label}.</p></div>`;
  $('#foot').innerHTML=checkBtn();const ck=$('#check');
  const draw=(res)=>{const o=q.fond,g=gp({W,H:Hh,x0,x1,y0,y1}),cols=['var(--t-sq)','var(--t-c)','var(--t-x)'];
    if(o.ligne){const ps=o.pas||1,et=o.etiq||1,eps=1e-9;g.seg(x0,0,x1,0,'var(--ink)',1.8);
      for(let i=Math.ceil(x0/ps-eps);i*ps<=x1+eps;i++){const x=i*ps,big=Math.abs(x/et-Math.round(x/et))<1e-6;g.seg(x,big?-.16*(y1-y0):-.08*(y1-y0),x,big?.16*(y1-y0):.08*(y1-y0),big?'var(--ink)':'var(--muted)',big?1.8:1.1);
        if(big)g.text(x,0,num(+x.toFixed(3)),'var(--ink)','middle',0,26,12,false)}}
    else g.axes(o.pas||1,o.pas||1,o.etiq||o.pas||1,o.etiq||o.pas||1);
    if(o.cercle)g.raw(`<circle cx="${g.X(0)}" cy="${g.Y(0)}" r="${(g.X(o.cercle)-g.X(0)).toFixed(1)}" fill="none" stroke="var(--ink)" stroke-width="1.4"/>`);
    (o.f||[]).forEach((c,i)=>{const s=typeof c==='string'?{f:c}:c;g.fn(vzFn(s.f),cols[s.c??i],2.4,s.dash?'6 4':'')});
    (o.pts||[]).forEach(([x,y,l])=>{g.dot(x,y,'var(--muted)',4);if(l)g.text(x,y,l,'var(--muted)','start',6,-6)});
    (o.v||[]).forEach(([x,y,l,ox=0,oy=0],i)=>{g.arrow(ox,oy,ox+x,oy+y,cols[i%3]);if(l)g.text(ox+x,oy+y,l,cols[i%3],'start',6,-6,13)});
    if(res){const[a,b]=q.target;g.dot(a,b,'var(--good)',8);g.raw(`<circle cx="${g.X(a)}" cy="${g.Y(b)}" r="${(g.X(q.tol)-g.X(0)).toFixed(1)}" fill="none" stroke="var(--good)" stroke-dasharray="3 3"/>`)}
    if(P){g.dot(P[0],P[1],res?(res==='ok'?'var(--good)':'var(--bad)'):'var(--t-sq)',8);g.text(P[0],P[1],q.label,'var(--ink)','start',9,-9,13)}
    $('#pfig').innerHTML=g.done('Place le point');bind()};
  const loc=e=>{const r=$('#pfig svg').getBoundingClientRect(),X=(e.clientX-r.left)/r.width*W,Y=(e.clientY-r.top)/r.height*Hh,
    x=x0+(X-8)/(W-16)*(x1-x0),y=y1-(Y-8)/(Hh-16)*(y1-y0),sn=v=>q.snap?Math.round(v/q.snap)*q.snap:v;return[Math.max(x0,Math.min(x1,+sn(x).toFixed(4))),q.fond.ligne?0:Math.max(y0,Math.min(y1,+sn(y).toFixed(4)))]};
  let down=false;const bind=()=>{const sv=$('#pfig svg');if(E.done)return;
    sv.onpointerdown=e=>{down=true;P=loc(e);upd()};sv.onpointermove=e=>{if(down){P=loc(e);upd()}};sv.onpointerup=sv.onpointercancel=()=>{down=false}};
  const upd=()=>{draw();$('#pread').innerHTML=q.fond.ligne?`${q.label} = ${num(P[0])}`:`${q.label} (${num(P[0])} ; ${num(P[1])})`;ck.disabled=false};
  ck.onclick=()=>{if(!P||E.done)return;const ok=!!q.check(P);draw(ok?'ok':'ko');answer(ok,0,P)};
  E.onKey=e=>{if(E.done)return;const st=q.snap||.1;if(!P)P=[0,0];const mv={ArrowLeft:[-st,0],ArrowRight:[st,0],ArrowUp:[0,st],ArrowDown:[0,-st]}[e.key];
    if(mv){e.preventDefault();P=[Math.max(x0,Math.min(x1,+(P[0]+mv[0]).toFixed(4))),Math.max(y0,Math.min(y1,+(P[1]+mv[1]).toFixed(4)))];upd()}else if(e.key==='Enter'&&!ck.disabled){e.preventDefault();ck.click()}};
  draw()}
