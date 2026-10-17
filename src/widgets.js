/* ---- Visualisations interactives des cours (les trois parcours) ----
   gp() construit un repère SVG ; chaque widget wXxx(el) dessine dans el et se redessine à chaque réglage. */
let GPID=0;
function gp(o){const W=o.W||300,H=o.H||190,pd=o.pd||8,X=x=>pd+(x-o.x0)/(o.x1-o.x0)*(W-2*pd),Y=y=>H-pd-(y-o.y0)/(o.y1-o.y0)*(H-2*pd),id='gc'+(++GPID);
  const f1=v=>v.toFixed(1);
  return{W,H,X,Y,s:'',
    axes(xs=1,ys=1,xl=xs,yl=ys){let g='';const eps=1e-9;
      for(let x=Math.ceil(o.x0/xs-eps)*xs;x<=o.x1+eps;x+=xs)g+=`<line x1="${f1(X(x))}" x2="${f1(X(x))}" y1="${pd}" y2="${H-pd}" stroke="var(--grid)"/>`;
      for(let y=Math.ceil(o.y0/ys-eps)*ys;y<=o.y1+eps;y+=ys)g+=`<line x1="${pd}" x2="${W-pd}" y1="${f1(Y(y))}" y2="${f1(Y(y))}" stroke="var(--grid)"/>`;
      const ax=Math.min(Math.max(0,o.x0),o.x1),ay=Math.min(Math.max(0,o.y0),o.y1);
      g+=`<line x1="${pd}" x2="${W-pd}" y1="${f1(Y(ay))}" y2="${f1(Y(ay))}" stroke="var(--muted)" stroke-width="1.2"/><line x1="${f1(X(ax))}" x2="${f1(X(ax))}" y1="${pd}" y2="${H-pd}" stroke="var(--muted)" stroke-width="1.2"/>`;
      if(xl)for(let x=Math.ceil(o.x0/xl-eps)*xl;x<=o.x1+eps;x+=xl){if(Math.abs(x)<eps||X(x)<pd+6||X(x)>W-pd-6)continue;g+=`<text x="${f1(X(x))}" y="${f1(Math.min(H-pd-2,Y(ay)+13))}" font-size="10" text-anchor="middle" fill="var(--muted)">${o.xf?o.xf(x):num(+x.toFixed(3))}</text>`}
      if(yl)for(let y=Math.ceil(o.y0/yl-eps)*yl;y<=o.y1+eps;y+=yl){if(Math.abs(y)<eps||Y(y)<pd+6||Y(y)>H-pd-4)continue;g+=`<text x="${f1(Math.max(pd+14,X(ax)-4))}" y="${f1(Y(y)+3.5)}" font-size="10" text-anchor="end" fill="var(--muted)">${num(+y.toFixed(3))}</text>`}
      this.s+=g;return this},
    fn(f,c='var(--t-sq)',w=2.5,dash='',a=o.x0,b=o.x1){let d='',pen=false;const N=o.N||320,lim=(o.y1-o.y0)*3;
      for(let i=0;i<=N;i++){const x=a+(b-a)*i/N,y=f(x);if(!isFinite(y)||y>o.y1+lim||y<o.y0-lim){pen=false;continue}d+=(pen?'L':'M')+f1(X(x))+','+f1(Y(y));pen=true}
      this.s+=`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}"${dash?` stroke-dasharray="${dash}"`:''} stroke-linejoin="round" stroke-linecap="round" clip-path="url(#${id})"/>`;return this},
    area(f,g,a,b,c='var(--soft)',op=1){let d=`M${f1(X(a))},${f1(Y(g(a)))}`;const N=120;
      for(let i=0;i<=N;i++){const x=a+(b-a)*i/N;d+=`L${f1(X(x))},${f1(Y(f(x)))}`}for(let i=N;i>=0;i--){const x=a+(b-a)*i/N;d+=`L${f1(X(x))},${f1(Y(g(x)))}`}
      this.s+=`<path d="${d}Z" fill="${c}" fill-opacity="${op}" stroke="none" clip-path="url(#${id})"/>`;return this},
    rect(x1,y1,x2,y2,c,op=1,st=''){const xa=Math.min(X(x1),X(x2)),ya=Math.min(Y(y1),Y(y2));
      this.s+=`<rect x="${f1(xa)}" y="${f1(ya)}" width="${f1(Math.abs(X(x2)-X(x1)))}" height="${f1(Math.abs(Y(y2)-Y(y1)))}" fill="${c}" fill-opacity="${op}"${st?` stroke="${st}" stroke-width="1"`:''} clip-path="url(#${id})"/>`;return this},
    seg(x1,y1,x2,y2,c='var(--muted)',w=1.5,dash=''){this.s+=`<line x1="${f1(X(x1))}" y1="${f1(Y(y1))}" x2="${f1(X(x2))}" y2="${f1(Y(y2))}" stroke="${c}" stroke-width="${w}"${dash?` stroke-dasharray="${dash}"`:''} stroke-linecap="round" clip-path="url(#${id})"/>`;return this},
    arrow(x1,y1,x2,y2,c){const a=Math.atan2(Y(y2)-Y(y1),X(x2)-X(x1)),L2=9,px=X(x2),py=Y(y2);
      this.seg(x1,y1,x2,y2,c,2.5);this.s+=`<path d="M${f1(px)},${f1(py)}L${f1(px-L2*Math.cos(a-.4))},${f1(py-L2*Math.sin(a-.4))}L${f1(px-L2*Math.cos(a+.4))},${f1(py-L2*Math.sin(a+.4))}Z" fill="${c}"/>`;return this},
    dot(x,y,c='var(--t-sq)',r=5,hollow=false){if(isFinite(x)&&isFinite(y))this.s+=`<circle cx="${f1(X(x))}" cy="${f1(Y(y))}" r="${r}" fill="${hollow?'var(--surface)':c}" stroke="${hollow?c:'var(--surface)'}" stroke-width="2"/>`;return this},
    text(x,y,t,c='var(--ink)',anchor='start',dx=0,dy=0,size=11,bold=true){this.s+=`<text x="${f1(X(x)+dx)}" y="${f1(Y(y)+dy)}" font-size="${size}"${bold?' font-weight="700"':''} text-anchor="${anchor}" fill="${c}">${t}</text>`;return this},
    raw(t){this.s+=t;return this},
    done(label){return`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}"><defs><clipPath id="${id}"><rect x="${pd}" y="${pd}" width="${W-2*pd}" height="${H-2*pd}"/></clipPath></defs>${this.s}</svg>`}}}
const wseg=(k,opts,cur)=>`<div class="seg wseg" data-g="${k}">${opts.map((l,i)=>`<button type="button" data-sv="${i}" class="${i===cur?'on':''}" aria-pressed="${i===cur}">${l}</button>`).join('')}</div>`;
const onSeg=(el,k,fn)=>el.querySelectorAll(`[data-g="${k}"] button`).forEach(b=>b.onclick=()=>{el.querySelectorAll(`[data-g="${k}"] button`).forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});sfx.tap();fn(+b.dataset.sv)});
const wout=(el,k,h)=>{el.querySelector(`[data-v="${k}"]`).innerHTML=h};
const lg=items=>`<div class="wleg">${items.map(([c,t,d])=>`<span><i style="background:${c}${d?';height:0;border-top:2px dashed '+c:''}"></i>${t}</span>`).join('')}</div>`;
const iv=t=>`<i>${t}</i>`;
const piFrac=(k,d=12)=>{if(!k)return'0';const g=(a,b)=>b?g(b,a%b):a,q=g(Math.abs(k),d),n=k/q,m=d/q,s=n<0?MINUS:'',a=Math.abs(n);return s+(a===1?'':a)+'π'+(m===1?'':'/'+m)};
/* Valeurs exactes du cercle trigonométrique (angles en degrés) */
function cosEx(d){d=((d%360)+360)%360;let r,s;if(d<=90){r=d;s=1}else if(d<=180){r=180-d;s=-1}else if(d<=270){r=d-180;s=-1}else{r=360-d;s=1}
  const T={0:'1',30:'√3/2',45:'√2/2',60:'1/2',90:'0'};if(!(r in T))return null;return T[r]==='0'?'0':(s<0?MINUS:'')+T[r]}
const sinEx=d=>cosEx(90-d);

/* ===================== Analyse ===================== */
/* Bases 1 : valeur absolue = distance */
function wAbs(el){let c=2,r=3,x=4;
  el.innerHTML=`<div class="wcard">${rg('c','Centre c',-5,5,c)}${rg('r','Rayon r',.5,4,r,.5)}${rg('x','Point x',-9,9,x,.5)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const G=gp({x0:-10,x1:10,y0:-1,y1:1.6,H:96});
    G.seg(-10,0,10,0,'var(--muted)',1.2);for(let v=-10;v<=10;v+=2){G.seg(v,-.12,v,.12,'var(--muted)',1);G.text(v,0,num(v),'var(--muted)','middle',0,24,10,false)}
    G.seg(c-r,0,c+r,0,'var(--t-x)',8).dot(c-r,0,'var(--t-x)',5,true).dot(c+r,0,'var(--t-x)',5,true).dot(c,0,'var(--ink)',3);
    const d=Math.abs(x-c),ins=d<=r+1e-9;G.seg(c,.75,x,.75,'var(--t-c)',2.5).seg(c,.6,c,.9,'var(--t-c)',2).seg(x,.6,x,.9,'var(--t-c)',2)
      .text((c+x)/2,.75,`distance ${dec(d,1)}`,'var(--ink)','middle',0,-7,10).dot(x,0,ins?'var(--good)':'var(--bad)',7);
    wout(el,'p',G.done('Droite graduée : intervalle centré et distance'));
    wout(el,'t',`<span class="m">|${iv('x')} − ${num(c)}| ≤ ${num(r)} ⟺ ${num(c-r)} ≤ ${iv('x')} ≤ ${num(c+r)}</span><br>Pour ${iv('x')} = ${num(x)} : la distance à ${num(c)} vaut |${num(x)} − ${num(c)}| = <b>${num(d)}</b>, ${ins?'elle est ≤ '+num(r)+' : le point est <b>dans</b> l’intervalle.':'elle dépasse '+num(r)+' : le point est <b>hors</b> de l’intervalle.'}`)};
  onR(el,'c',v=>{c=v;draw()});onR(el,'r',v=>{r=v;draw()});onR(el,'x',v=>{x=v;draw()});draw()}
/* Bases 2 : cercle trigonométrique et courbe du sinus */
function wCircle(el){let k=4;
  el.innerHTML=`<div class="wcard">${rg('k','Angle',0,24,k,1)}<div class="plot" data-v="p"></div>${lg([['var(--t-sq)','cos'],['var(--t-x)','sin']])}<p class="wexp" data-v="t"></p></div>`;
  el.querySelector('[data-o="k"]').innerHTML=piFrac(k);
  const draw=()=>{const th=k*Math.PI/12,c=Math.cos(th),s=Math.sin(th),W=320,H=160,cx=72,cy=80,R0=58,sx=150,sw=160,SX=t=>sx+t/(2*Math.PI)*sw,SY=v=>cy-v*R0;
    let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Cercle trigonométrique et courbe du sinus"><circle cx="${cx}" cy="${cy}" r="${R0}" fill="none" stroke="var(--line)" stroke-width="2"/>
      <line x1="${cx-R0-6}" x2="${cx+R0+6}" y1="${cy}" y2="${cy}" stroke="var(--muted)"/><line x1="${cx}" x2="${cx}" y1="${cy-R0-6}" y2="${cy+R0+6}" stroke="var(--muted)"/>`;
    const px=cx+c*R0,py=cy-s*R0;let arc='';for(let i=0;i<=40;i++){const t=th*i/40;arc+=(i?'L':'M')+(cx+18*Math.cos(t)).toFixed(1)+','+(cy-18*Math.sin(t)).toFixed(1)}
    g+=`<path d="${arc}" fill="none" stroke="var(--t-c)" stroke-width="2.5"/><line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="var(--ink)" stroke-width="1.5"/>
      <line x1="${cx}" y1="${cy}" x2="${px}" y2="${cy}" stroke="var(--t-sq)" stroke-width="4" stroke-linecap="round"/><line x1="${px}" y1="${cy}" x2="${px}" y2="${py}" stroke="var(--t-x)" stroke-width="4" stroke-linecap="round"/>
      <line x1="${px}" y1="${py}" x2="${SX(th)}" y2="${py}" stroke="var(--t-x)" stroke-dasharray="3 3"/>
      <line x1="${sx}" x2="${sx+sw}" y1="${cy}" y2="${cy}" stroke="var(--muted)"/>`;
    let cur='';for(let i=0;i<=120;i++){const t=2*Math.PI*i/120;cur+=(i?'L':'M')+SX(t).toFixed(1)+','+SY(Math.sin(t)).toFixed(1)}
    let done='';for(let i=0;i<=60;i++){const t=th*i/60;done+=(i?'L':'M')+SX(t).toFixed(1)+','+SY(Math.sin(t)).toFixed(1)}
    g+=`<path d="${cur}" fill="none" stroke="var(--line)" stroke-width="2"/><path d="${done}" fill="none" stroke="var(--t-x)" stroke-width="2.5"/>
      ${[[Math.PI,'π'],[2*Math.PI,'2π']].map(([t,l])=>`<text x="${SX(t)}" y="${cy+14}" font-size="10" text-anchor="middle" fill="var(--muted)">${l}</text>`).join('')}
      <circle cx="${px}" cy="${py}" r="6" fill="var(--ink)" stroke="var(--surface)" stroke-width="2"/><circle cx="${SX(th)}" cy="${py}" r="5" fill="var(--t-x)" stroke="var(--surface)" stroke-width="2"/></svg>`;
    wout(el,'p',g);const d=k*15,ce=cosEx(d),se=sinEx(d);
    wout(el,'t',`Angle : <b>${d}°</b> = <span class="m">${piFrac(k)}</span> rad. <span class="m">cos = ${ce||dec(c,3)}</span>, <span class="m">sin = ${se||dec(s,3)}</span>${ce?'':' (valeurs approchées : cet angle n’est pas remarquable)'}.<br>Le point du cercle a pour coordonnées (cos, sin) ; la courbe de droite « déroule » la hauteur sin quand l’angle avance.`)};
  onR(el,'k',v=>{k=v;draw()},v=>piFrac(v));draw()}
/* Fonctions usuelles : une fonction et sa réciproque, symétriques par rapport à y = x */
function wRecip(el,pairs){let P=0,a;
  pairs=pairs||[{n:'exp et ln',f:Math.exp,g:Math.log,fl:'e<sup>x</sup>',gl:'ln x',lo:-2,hi:1.3,v:.5,fs:x=>'e<sup>'+dec(x,2)+'</sup>'},
    {n:'x² et √x',f:x=>x>=0?x*x:NaN,g:x=>x>=0?Math.sqrt(x):NaN,fl:'x² (x ≥ 0)',gl:'√x',lo:0,hi:2,v:1.5},
    {n:'x³ et ∛x',f:x=>x**3,g:Math.cbrt,fl:'x³',gl:'∛x',lo:-1.5,hi:1.5,v:1.2},
    {n:'sin et arcsin',f:x=>Math.abs(x)<=Math.PI/2+1e-9?Math.sin(x):NaN,g:x=>Math.abs(x)<=1?Math.asin(x):NaN,fl:'sin x (|x| ≤ π/2)',gl:'arcsin x',lo:-1.57,hi:1.57,v:1}];
  const build=()=>{const p=pairs[P];a=p.v;el.innerHTML=`<div class="wcard">${pairs.length>1?wseg('p',pairs.map(q=>q.n),P):''}${rg('a','Point a',p.lo,p.hi,a,.01)}<div class="plot" data-v="p"></div>
    ${lg([['var(--t-sq)','f(x) = '+p.fl],['var(--t-x)','f⁻¹(x) = '+p.gl],['var(--muted)','y = x',1]])}<p class="wexp" data-v="t"></p></div>`;
    if(pairs.length>1)onSeg(el,'p',i=>{P=i;build()});onR(el,'a',v=>{a=v;draw()},v=>dec(v,2));draw()};
  const draw=()=>{const p=pairs[P],b=p.f(a),G=gp({x0:-3,x1:4,y0:-3,y1:4,W:300,H:300});
    G.axes(1,1).fn(x=>x,'var(--muted)',1.5,'5 4').fn(p.f,'var(--t-sq)').fn(p.g,'var(--t-x)')
     .seg(a,b,b,a,'var(--t-c)',1.5,'3 3').seg(a,0,a,b,'var(--t-sq)',1,'2 3').seg(b,0,b,a,'var(--t-x)',1,'2 3')
     .dot(a,b,'var(--t-sq)',6).dot(b,a,'var(--t-x)',6).text(a,b,'A','var(--ink)','end',-8,-6).text(b,a,'B','var(--ink)','start',8,14);
    wout(el,'p',G.done('Courbes d’une fonction et de sa réciproque'));
    wout(el,'t',`A(${dec(a,2)} ; ${dec(b,2)}) est sur la courbe de f, donc B(${dec(b,2)} ; ${dec(a,2)}) est sur celle de f⁻¹ : on a échangé les deux coordonnées. <span class="m">f(${dec(a,2)}) = ${dec(b,2)} ⟺ f⁻¹(${dec(b,2)}) = ${dec(a,2)}</span>. A et B sont symétriques par rapport à la droite y = x.`)};
  build()}
/* Limites : s'approcher d'un point */
function wLim(el){let F=0,i=0;const HS=[1,.5,.2,.1,.05,.01,.001];
  const FS=[{n:'(x² − 1)/(x − 1)',f:x=>(x*x-1)/(x-1),a:1,L:2,w:[-1,3,-.5,4],msg:'La fonction n’est pas définie en 1 (division par 0), mais ses valeurs s’approchent de 2 des deux côtés : lim = 2. Simplifier (x² − 1)/(x − 1) = x + 1 le confirme.'},
    {n:'sin(x)/x',f:x=>Math.sin(x)/x,a:0,L:1,w:[-7,7,-.5,1.4],msg:'Non définie en 0, mais tend vers 1 : c’est une limite remarquable, lim sin(x)/x = 1 en 0.'},
    {n:'1/x',f:x=>1/x,a:0,L:null,w:[-3,3,-12,12],msg:'À droite de 0, 1/x devient très grand (→ +∞) ; à gauche, très négatif (→ −∞). Les deux côtés ne s’accordent pas : pas de limite en 0.'}];
  el.innerHTML=`<div class="wcard">${wseg('f',FS.map(q=>q.n),F)}${rg('h','Écart h',0,6,i)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  el.querySelector('[data-o="h"]').innerHTML=num(HS[i]);
  const draw=()=>{const q=FS[F],h=HS[i],[x0,x1,y0,y1]=q.w,G=gp({x0,x1,y0,y1,H:210});
    G.axes(1,y1>5?4:.5).fn(q.f,'var(--t-sq)');if(q.L!==null)G.seg(x0,q.L,x1,q.L,'var(--t-c)',1.5,'4 4').dot(q.a,q.L,'var(--t-sq)',5,true);
    const xl=q.a-h,xr=q.a+h;G.dot(xl,q.f(xl),'var(--t-x)',6).dot(xr,q.f(xr),'var(--t-x)',6);
    wout(el,'p',G.done('Courbe et points qui s’approchent de a'));
    wout(el,'t',`<table class="ctable vt"><tbody><tr><td>x</td><td>${dec(xl,4)}</td><td>${dec(xr,4)}</td></tr><tr><td>f(x)</td><td>${dec(q.f(xl),4)}</td><td>${dec(q.f(xr),4)}</td></tr></tbody></table>${q.msg}`)};
  onSeg(el,'f',k=>{F=k;draw()});onR(el,'h',v=>{i=v;draw()},v=>num(HS[v]));draw()}
/* Dérivées : la corde devient tangente */
function wTan(el){let F=0,a=1,i=0;const HS=[2,1,.5,.2,.1,.01];
  const FS=[{n:'x²',f:x=>x*x,d:x=>2*x,w:[-3,3,-1,6]},{n:'x³ − 3x',f:x=>x**3-3*x,d:x=>3*x*x-3,w:[-2.6,2.6,-4,4]},{n:'sin x',f:Math.sin,d:Math.cos,w:[-4,4,-2,2]}];
  el.innerHTML=`<div class="wcard">${wseg('f',FS.map(q=>q.n),F)}${rg('a','Point a',-2,2,a,.1)}${rg('h','Écart h',0,5,i)}<div class="plot" data-v="p"></div>${lg([['var(--t-c)','corde'],['var(--t-x)','tangente']])}<p class="wexp" data-v="t"></p></div>`;
  el.querySelector('[data-o="h"]').innerHTML=num(HS[i]);
  const draw=()=>{const q=FS[F],h=HS[i],[x0,x1,y0,y1]=q.w,G=gp({x0,x1,y0,y1,H:220}),fa=q.f(a),fb=q.f(a+h),t=(fb-fa)/h,d=q.d(a);
    G.axes(1,1).fn(q.f,'var(--t-sq)').fn(x=>fa+d*(x-a),'var(--t-x)',2).fn(x=>fa+t*(x-a),'var(--t-c)',2,'6 4').dot(a,fa,'var(--ink)',5).dot(a+h,fb,'var(--t-c)',5);
    wout(el,'p',G.done('Corde et tangente à la courbe'));
    wout(el,'t',`Pente de la corde : <span class="m">(f(${dec(a+h,2)}) − f(${dec(a,1)})) / ${num(h)} ≈ <b>${dec(t,3)}</b></span><br>Pente de la tangente : <span class="m">f ′(${dec(a,1)}) = <b>${dec(d,3)}</b></span>. Fais diminuer h : la corde se colle à la tangente et sa pente tend vers f ′(a). Tangente : <span class="m">y = ${dec(fa,2)} + ${dec(d,2)}(x − ${dec(a,1)})</span>.`)};
  onSeg(el,'f',k=>{F=k;draw()});onR(el,'a',v=>{a=v;draw()},v=>dec(v,1));onR(el,'h',v=>{i=v;draw()},v=>num(HS[v]));draw()}
/* Étude de fonction : signe de f ′ et variations de f */
function wVar(el){let p=3,x=0;
  el.innerHTML=`<div class="wcard"><p class="wres m">f(x) = x³ − p·x &nbsp;&nbsp; f ′(x) = 3x² − p</p>${rg('p','Paramètre p',-3,6,p,.5)}${rg('x','Point x',-2.4,2.4,x,.1)}<div class="plot" data-v="p"></div><div class="plot" data-v="q"></div><div data-v="tab"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const f=t=>t**3-p*t,d=t=>3*t*t-p,G=gp({x0:-2.5,x1:2.5,y0:-6,y1:6,H:170}),D=gp({x0:-2.5,x1:2.5,y0:-4,y1:16,H:120}),s=d(x);
    G.axes(1,2,1,4).fn(f,'var(--t-sq)').fn(t=>f(x)+s*(t-x),s>0?'var(--good)':s<0?'var(--bad)':'var(--t-c)',2,'5 4').dot(x,f(x),'var(--ink)',5).text(-2.4,5.2,'f','var(--t-sq)');
    D.axes(1,4,1,4).area(t=>Math.max(0,d(t)),()=>0,-2.5,2.5,'var(--good)',.25).area(t=>Math.min(0,d(t)),()=>0,-2.5,2.5,'var(--bad)',.25).fn(d,'var(--t-x)').dot(x,s,'var(--ink)',5).text(-2.4,13.5,'f ′','var(--t-x)');
    wout(el,'p',G.done('Courbe de f et tangente au point choisi'));wout(el,'q',D.done('Courbe de la dérivée, en vert là où elle est positive, en rouge là où elle est négative'));
    let tab;if(p>0){const r=Math.sqrt(p/3),M=f(-r),m=f(r);
      tab=`<table class="ctable vt"><tbody><tr><td>x</td><td>−∞</td><td>${dec(-r,2)}</td><td></td><td>${dec(r,2)}</td><td>+∞</td></tr><tr><td>f ′(x)</td><td>+</td><td>0</td><td>−</td><td>0</td><td>+</td></tr><tr><td>f</td><td>↗</td><td>${dec(M,2)}</td><td>↘</td><td>${dec(m,2)}</td><td>↗</td></tr></tbody></table>`}
    else tab=`<table class="ctable vt"><tbody><tr><td>x</td><td>−∞</td><td></td><td>+∞</td></tr><tr><td>f ′(x)</td><td></td><td>${p===0?'+ (0 en x = 0)':'+'}</td><td></td></tr><tr><td>f</td><td></td><td>↗</td><td></td></tr></tbody></table>`;
    wout(el,'tab',tab);
    wout(el,'t',`En x = ${dec(x,1)} : f ′(x) = ${dec(s,2)} ${s>1e-9?'&gt; 0, la tangente monte : f est croissante ici.':s<-1e-9?'&lt; 0, la tangente descend : f est décroissante ici.':'= 0 : tangente horizontale.'} ${p>0?`f ′ s’annule en ±√(p/3) ≈ ±${dec(Math.sqrt(p/3),2)} en changeant de signe : maximum local à gauche, minimum local à droite.`:'f ′ ne devient jamais négative : f est croissante sur ℝ, pas d’extremum.'}`)};
  onR(el,'p',v=>{p=v;draw()});onR(el,'x',v=>{x=v;draw()},v=>dec(v,1));draw()}
/* Développements limités : polynômes de Taylor en 0 */
function wTaylor(el){let F=0,n=3;const fact=k=>k<2?1:k*fact(k-1);
  const FS=[{n:'e<sup>x</sup>',f:Math.exp,c:k=>1/fact(k)},{n:'sin x',f:Math.sin,c:k=>k%2?(((k-1)/2)%2?-1:1)/fact(k):0},{n:'cos x',f:Math.cos,c:k=>k%2?0:((k/2)%2?-1:1)/fact(k)},
    {n:'ln(1 + x)',f:x=>x>-1?Math.log(1+x):NaN,c:k=>k?(k%2?1:-1)/k:0},{n:'1/(1 − x)',f:x=>x<1?1/(1-x):NaN,c:()=>1}];
  el.innerHTML=`<div class="wcard">${wseg('f',FS.map(q=>q.n),F)}${rg('n','Ordre n',0,8,n)}<div class="plot" data-v="p"></div>${lg([['var(--t-sq)','fonction'],['var(--t-c)','polynôme de Taylor']])}<p class="wexp" data-v="t"></p></div>`;
  const term=(c,k)=>{const s=c<0?' − ':' + ',v=Math.abs(c),den=Math.round(1/v),xs=k===0?'':k===1?'x':`x<sup>${k}</sup>`;
    if(k===0)return(c<0?MINUS:'')+(den===1?'1':'1/'+den);return s+(Math.abs(v-1)<1e-12?xs:Math.abs(1/v-den)<1e-9?xs+'/'+den:dec(v,3)+xs)};
  const draw=()=>{const q=FS[F],T=x=>{let s=0;for(let k=0;k<=n;k++)s+=q.c(k)*x**k;return s},G=gp({x0:-3,x1:3,y0:-2.5,y1:4,H:220});
    G.axes(1,1).fn(q.f,'var(--t-sq)',3).fn(T,'var(--t-c)',2.2).dot(.5,q.f(.5),'var(--t-sq)',4);
    wout(el,'p',G.done('Fonction et son polynôme de Taylor en 0'));
    let poly='';for(let k=0;k<=n;k++){const c=q.c(k);if(c)poly+=poly?term(c,k):term(c,k).replace(/^ \+ /,'').replace(/^ − /,MINUS)}
    const err=Math.abs(q.f(.5)-T(.5));
    wout(el,'t',`<span class="m">${q.n} = ${poly||'0'} + o(x<sup>${n}</sup>)</span><br>En x = 0,5 l’écart vaut ≈ <b>${err<1e-6?err.toExponential(1).replace('.',','):dec(err,6)}</b>. Augmente n : le polynôme colle à la courbe sur une zone de plus en plus large autour de 0, mais pas forcément partout${F>=3?' (ici, il décroche dès |x| ≥ 1)':''}.`)};
  onSeg(el,'f',k=>{F=k;draw()});onR(el,'n',v=>{n=v;draw()});draw()}
/* Suites récurrentes : diagramme en toile d'araignée */
function wCob(el){let a=.5,b=1,u=-3;
  el.innerHTML=`<div class="wcard"><p class="wres m">u<sub>n+1</sub> = a·u<sub>n</sub> + b</p>${rg('a','a',-1.5,1.5,a,.1)}${rg('b','b',-2,2,b,.5)}${rg('u','u₀',-4,4,u,.5)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const f=x=>a*x+b,G=gp({x0:-5,x1:5,y0:-5,y1:5,W:300,H:300});G.axes(1,1,2,2).fn(x=>x,'var(--muted)',1.5,'5 4').fn(f,'var(--t-sq)');
    let x=u;const terms=[u];G.seg(x,0,x,f(x),'var(--t-c)',1.6);
    for(let i=0;i<14;i++){const y=f(x);if(Math.abs(y)>60)break;G.seg(x,y,y,y,'var(--t-c)',1.6);if(i<13)G.seg(y,y,y,f(y),'var(--t-c)',1.6);x=y;terms.push(y)}
    const L=Math.abs(1-a)>1e-9?b/(1-a):null;if(L!==null)G.dot(L,L,'var(--t-x)',6);G.dot(u,0,'var(--ink)',5);
    wout(el,'p',G.done('Diagramme en toile d’araignée de la suite'));
    const nat=Math.abs(1-a)<1e-9?`a = 1 : suite arithmétique de raison ${num(b)}${b?', elle part à '+(b>0?'+∞':'−∞'):', elle est constante'}.`
      :Math.abs(a)<1-1e-9?`|a| &lt; 1 : la toile s’enroule vers le point fixe ℓ = b/(1 − a) = <b>${dec(L,3)}</b> (point vert). La suite converge vers ℓ.`
      :Math.abs(u-L)<1e-9?'u₀ est exactement le point fixe : la suite est constante.':`|a| ≥ 1 : la toile s’éloigne du point fixe ℓ ≈ ${dec(L,2)}. La suite ${Math.abs(Math.abs(a)-1)<1e-9?'ne converge pas (elle oscille)':'diverge'}.`;
    wout(el,'t',`Premiers termes : ${terms.slice(0,6).map((t,i)=>`u<sub>${i}</sub> = ${dec(t,2)}`).join(' ; ')}…<br>${nat}<br>Lecture : on monte jusqu’à la courbe (on calcule f(u<sub>n</sub>)), puis on rejoint la diagonale y = x pour reporter ce résultat en abscisse.`)};
  onR(el,'a',v=>{a=v;draw()},v=>dec(v,1));onR(el,'b',v=>{b=v;draw()});onR(el,'u',v=>{u=v;draw()});draw()}
/* Intégrales : sommes de Riemann */
function wRiem(el){let F=0,n=6,M=1;
  const FS=[{n:'x² sur [0 ; 2]',f:x=>x*x,a:0,b:2,I:8/3,Is:'8/3',w:[-.2,2.2,-.4,4.4]},{n:'sin x sur [0 ; π]',f:Math.sin,a:0,b:Math.PI,I:2,Is:'2',w:[-.2,3.4,-.2,1.2]},{n:'1/x sur [1 ; 3]',f:x=>1/x,a:1,b:3,I:Math.log(3),Is:'ln 3',w:[0,3.3,-.15,1.2]}];
  el.innerHTML=`<div class="wcard">${wseg('f',FS.map(q=>q.n),F)}${wseg('m',['Gauche','Milieu','Droite'],M)}${rg('n','Rectangles',1,40,n)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const q=FS[F],[x0,x1,y0,y1]=q.w,G=gp({x0,x1,y0,y1,H:200}),h=(q.b-q.a)/n;let S=0;
    G.axes(1,y1>2?1:.5);for(let i=0;i<n;i++){const xl=q.a+i*h,xs=xl+h*[0,.5,1][M],y=q.f(xs);S+=y*h;G.rect(xl,0,xl+h,y,'var(--t-c)',.45,'var(--t-c)')}
    G.fn(q.f,'var(--t-sq)',2.5);wout(el,'p',G.done('Rectangles sous la courbe'));
    wout(el,'t',`Somme des ${n} rectangles : <b>${dec(S,4)}</b><br>Valeur exacte : <span class="m">∫ = ${q.Is} ≈ ${dec(q.I,4)}</span> ; écart ${dec(Math.abs(S-q.I),4)}.<br>Chaque rectangle a pour aire « hauteur × largeur » = f(x)·Δx. Quand le nombre de rectangles augmente, la somme tend vers l’intégrale : c’est la définition même de ∫ f(x) dx.`)};
  onSeg(el,'f',k=>{F=k;draw()});onSeg(el,'m',k=>{M=k;draw()});onR(el,'n',v=>{n=v;draw()});draw()}
/* Applications des intégrales : volume de révolution par disques */
function wRevol(el){let F=0,n=8;
  const FS=[{n:'y = √x',f:Math.sqrt,a:0,b:4,V:8*Math.PI,Vs:'8π'},{n:'cône y = x/2',f:x=>x/2,a:0,b:4,V:16*Math.PI/3,Vs:'16π/3'},{n:'sphère',f:x=>Math.sqrt(Math.max(0,4-x*x)),a:-2,b:2,V:32*Math.PI/3,Vs:'32π/3'}];
  el.innerHTML=`<div class="wcard">${wseg('f',FS.map(q=>q.n),F)}${rg('n','Disques',1,30,n)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const q=FS[F],G=gp({x0:q.a-.5,x1:q.b+.5,y0:-2.6,y1:2.6,H:200}),h=(q.b-q.a)/n;let V=0;G.axes(1,1);
    for(let i=0;i<n;i++){const xm=q.a+(i+.5)*h,r=q.f(xm);V+=Math.PI*r*r*h;G.rect(q.a+i*h,-r,q.a+(i+1)*h,r,'var(--t-c)',.35,'var(--t-c)');
      const ex=G.X(q.a+(i+1)*h),ry=Math.abs(G.Y(r)-G.Y(0));G.raw(`<ellipse cx="${ex.toFixed(1)}" cy="${G.Y(0).toFixed(1)}" rx="${Math.max(1.5,Math.min(6,ry*.18)).toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="var(--t-c)" stroke-width="1"/>`)}
    G.fn(q.f,'var(--t-sq)',2.5,'',q.a,q.b).fn(x=>-q.f(x),'var(--t-sq)',2.5,'',q.a,q.b);
    wout(el,'p',G.done('Solide de révolution découpé en disques'));
    wout(el,'t',`On fait tourner la courbe ${q.n} autour de l’axe des x. Chaque tranche est un disque de rayon y et d’épaisseur Δx : volume <span class="m">π y² Δx</span>.<br>Somme des ${n} disques : <b>${dec(V,3)}</b>. Volume exact : <span class="m">V = π ∫ y² dx = ${q.Vs} ≈ ${dec(q.V,3)}</span>.`)};
  onSeg(el,'f',k=>{F=k;draw()});onR(el,'n',v=>{n=v;draw()});draw()}
/* Séries : sommes partielles */
function wSer(el){let F=0,N=20;
  const FS=[{n:'Σ (1/2)ⁿ',t:k=>.5**(k-1),L:2,Ls:'2',w:2.4,msg:'Série géométrique de raison 1/2 : |q| &lt; 1, elle converge vers 1/(1 − q) = 2.'},
    {n:'Σ 1/n²',t:k=>1/(k*k),L:Math.PI**2/6,Ls:'π²/6',w:2,msg:'Série de Riemann avec α = 2 &gt; 1 : elle converge (vers π²/6, résultat d’Euler).'},
    {n:'Σ 1/n',t:k=>1/k,L:null,w:5,msg:'Série harmonique : les termes tendent vers 0, et pourtant la somme dépasse n’importe quel nombre (elle croît comme ln n). Termes → 0 ne suffit pas !'},
    {n:'Σ (−1)ⁿ⁺¹/n',t:k=>(k%2?1:-1)/k,L:Math.log(2),Ls:'ln 2',w:1.2,msg:'Série alternée : les sommes partielles sautent au-dessus puis en dessous de la limite ln 2 en se resserrant.'}];
  el.innerHTML=`<div class="wcard">${wseg('f',FS.map(q=>q.n),F)}${rg('n','Termes N',1,60,N)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const q=FS[F],G=gp({x0:0,x1:61,y0:0,y1:q.w,H:190});G.axes(10,q.w>3?1:.5);let S=0;const ss=[];for(let k=1;k<=60;k++){S+=q.t(k);ss.push(S)}
    if(q.L!==null)G.seg(0,q.L,61,q.L,'var(--t-c)',1.5,'5 4').text(60,q.L,q.Ls,'var(--ink)','end',0,-5);
    ss.forEach((s,k)=>G.dot(k+1,s,k<N?'var(--t-sq)':'var(--line)',k<N?3:2));
    wout(el,'p',G.done('Sommes partielles de la série'));
    wout(el,'t',`S<sub>${N}</sub> = somme des ${N} premiers termes ≈ <b>${dec(ss[N-1],4)}</b>${q.L!==null?` ; limite ${q.Ls} ≈ ${dec(q.L,4)}`:''}.<br>${q.msg}`)};
  onSeg(el,'f',k=>{F=k;draw()});onR(el,'n',v=>{N=v;draw()});draw()}
/* Complexes : produit = modules multipliés, arguments ajoutés */
function wCplx(el){let r1=1.5,k1=2,r2=1.5,k2=4,O=0;
  el.innerHTML=`<div class="wcard">${wseg('o',['Produit z·w','Somme z + w','Conjugué z̄'],O)}${rg('r1','|z|',.5,2,r1,.25)}${rg('k1','arg z',0,23,k1)}<div data-v="ww">${rg('r2','|w|',.5,2,r2,.25)}${rg('k2','arg w',0,23,k2)}</div><div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  el.querySelector('[data-o="k1"]').innerHTML=piFrac(k1);el.querySelector('[data-o="k2"]').innerHTML=piFrac(k2);
  const alg=(x,y)=>`${dec(x,2)} ${y<0?'−':'+'} ${dec(Math.abs(y),2)}i`;
  const draw=()=>{const a1=k1*Math.PI/12,a2=k2*Math.PI/12,z=[r1*Math.cos(a1),r1*Math.sin(a1)],w=[r2*Math.cos(a2),r2*Math.sin(a2)],G=gp({x0:-4.2,x1:4.2,y0:-4.2,y1:4.2,W:300,H:300});
    el.querySelector('[data-v="ww"]').hidden=O===2;G.axes(1,1,2,2);G.text(4,0,'Re','var(--muted)','end',0,-5,10).text(0,4,'Im','var(--muted)','start',5,6,10);
    G.arrow(0,0,z[0],z[1],'var(--t-sq)').text(z[0],z[1],'z','var(--t-sq)','start',6,-4,13);let t;
    if(O===0){const r=r1*r2,a=a1+a2,p=[r*Math.cos(a),r*Math.sin(a)];G.arrow(0,0,w[0],w[1],'var(--t-x)').text(w[0],w[1],'w','var(--t-x)','start',6,-4,13).arrow(0,0,p[0],p[1],'var(--t-c)').text(p[0],p[1],'zw','var(--ink)','start',6,-4,13);
      t=`<span class="m">|zw| = |z|·|w| = ${num(r1)} × ${num(r2)} = <b>${dec(r,4)}</b></span><br><span class="m">arg(zw) = arg z + arg w = ${piFrac(k1)} + ${piFrac(k2)} = <b>${piFrac(k1+k2)}</b></span><br>Multiplier par w, c’est <b>tourner</b> de arg w et <b>agrandir</b> de |w|. zw ≈ ${alg(p[0],p[1])}.`}
    else if(O===1){const p=[z[0]+w[0],z[1]+w[1]];G.arrow(0,0,w[0],w[1],'var(--t-x)').text(w[0],w[1],'w','var(--t-x)','start',6,-4,13).seg(z[0],z[1],p[0],p[1],'var(--t-x)',1.2,'4 3').seg(w[0],w[1],p[0],p[1],'var(--t-sq)',1.2,'4 3').arrow(0,0,p[0],p[1],'var(--t-c)').text(p[0],p[1],'z + w','var(--ink)','start',6,-4,13);
      t=`La somme se lit comme pour des vecteurs : on met w au bout de z (règle du parallélogramme).<br>z ≈ ${alg(...z)}, w ≈ ${alg(...w)}, <b>z + w ≈ ${alg(...p)}</b> : on ajoute les parties réelles entre elles et les parties imaginaires entre elles.`}
    else{G.arrow(0,0,z[0],-z[1],'var(--t-c)').text(z[0],-z[1],'z̄','var(--ink)','start',6,12,13).seg(z[0],z[1],z[0],-z[1],'var(--muted)',1,'3 3');
      t=`Le conjugué est le symétrique de z par rapport à l’axe réel : z ≈ ${alg(...z)}, <b>z̄ ≈ ${alg(z[0],-z[1])}</b>. Même module, argument opposé (${MINUS}${piFrac(k1)}). <span class="m">z·z̄ = |z|² = ${dec(r1*r1,4)}</span>, un réel positif.`}
    wout(el,'p',G.done('Plan complexe'));wout(el,'t',t)};
  onSeg(el,'o',k=>{O=k;draw()});onR(el,'r1',v=>{r1=v;draw()});onR(el,'r2',v=>{r2=v;draw()});onR(el,'k1',v=>{k1=v;draw()},v=>piFrac(v));onR(el,'k2',v=>{k2=v;draw()},v=>piFrac(v));draw()}
/* Équations différentielles : champ de directions de y′ = a·y + b */
function wField(el){let a=-.5,b=1,y0=-2;
  el.innerHTML=`<div class="wcard"><p class="wres m">y′ = a·y + b</p>${rg('a','a',-1.5,1,a,.1)}${rg('b','b',-2,2,b,.5)}${rg('y','y(0)',-3,4,y0,.5)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const G=gp({x0:0,x1:6,y0:-4,y1:5,H:220});G.axes(1,1);
    for(let x=.25;x<6;x+=.5)for(let y=-3.5;y<5;y+=.75){const s=a*y+b,dx=.18/Math.sqrt(1+s*s*(6/9)**2),dy=s*dx;G.seg(x-dx,y-dy,x+dx,y+dy,'var(--muted)',1.2)}
    const eq=Math.abs(a)>1e-9?-b/a:null,sol=x=>Math.abs(a)>1e-9?eq+(y0-eq)*Math.exp(a*x):y0+b*x;
    if(eq!==null&&eq>-4&&eq<5)G.seg(0,eq,6,eq,'var(--t-x)',1.8,'6 4');G.fn(sol,'var(--t-sq)',3).dot(0,y0,'var(--t-sq)',6);
    wout(el,'p',G.done('Champ de directions et courbe solution'));
    wout(el,'t',`Chaque petit trait a la pente y′ = a·y + b imposée par l’équation en ce point. La solution « suit le courant ».<br>${eq!==null?`<span class="m">y(x) = ${dec(eq,2)} + (${dec(y0,1)} − ${dec(eq,2)})·e<sup>${dec(a,1)}x</sup></span><br>Équilibre y = −b/a = ${dec(eq,2)} (en vert pointillé) : ${a<0?'a &lt; 0, toutes les solutions s’en rapprochent (équilibre stable, comme une tasse qui refroidit vers la température ambiante).':'a &gt; 0, les solutions s’en éloignent (équilibre instable).'}`:`a = 0 : y′ = ${num(b)}, la solution est la droite y = ${dec(y0,1)} + ${num(b)}x.`}`)};
  onR(el,'a',v=>{a=v;draw()},v=>dec(v,1));onR(el,'b',v=>{b=v;draw()});onR(el,'y',v=>{y0=v;draw()});draw()}
/* Équations différentielles d'ordre 2 : oscillateur amorti */
function wOsc(el){let l=.3,w=2;
  el.innerHTML=`<div class="wcard"><p class="wres m">y″ + 2λ y′ + ω² y = 0, &nbsp;y(0) = 1, y′(0) = 0</p>${rg('l','Frottement λ',0,3,l,.1)}${rg('w','Pulsation ω',.5,3,w,.1)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const D=l*l-w*w;let y,reg;
    if(D<-1e-9){const O=Math.sqrt(-D);y=t=>Math.exp(-l*t)*(Math.cos(O*t)+l/O*Math.sin(O*t));reg=l?`<b>pseudo-périodique</b> : Δ &lt; 0, racines complexes −λ ± iΩ avec Ω = ${dec(O,3)}. Ça oscille, et l’amplitude décroît comme e<sup>−λt</sup>.`:`<b>périodique</b> : sans frottement, racines ±iω, y = cos(ωt). L’oscillation ne s’arrête jamais.`}
    else if(Math.abs(D)<=1e-9){y=t=>(1+l*t)*Math.exp(-l*t);reg='<b>critique</b> : Δ = 0, racine double −λ. Retour à 0 le plus rapide possible sans osciller.'}
    else{const s=Math.sqrt(D),r1=-l+s,r2=-l-s,A=-r2/(r1-r2),B=r1/(r1-r2);y=t=>A*Math.exp(r1*t)+B*Math.exp(r2*t);reg=`<b>apériodique</b> : Δ &gt; 0, deux racines réelles négatives (${dec(r1,2)} et ${dec(r2,2)}). Le frottement est si fort qu’il n’y a plus d’oscillation.`}
    const G=gp({x0:0,x1:10,y0:-1.15,y1:1.15,H:180});G.axes(1,.5,2,.5);if(l>0&&D<0)G.fn(t=>Math.exp(-l*t),'var(--t-c)',1.5,'4 4').fn(t=>-Math.exp(-l*t),'var(--t-c)',1.5,'4 4');G.fn(y,'var(--t-sq)',2.6);
    wout(el,'p',G.done('Évolution de la solution au cours du temps'));
    wout(el,'t',`Équation caractéristique : <span class="m">r² + 2λ r + ω² = 0</span>, discriminant réduit <span class="m">Δ′ = λ² − ω² = ${dec(D,2)}</span>.<br>Régime ${reg}`)};
  onR(el,'l',v=>{l=v;draw()},v=>dec(v,1));onR(el,'w',v=>{w=v;draw()},v=>dec(v,1));draw()}

/* ===================== Algèbre 2 ===================== */
/* Forme factorisée : les racines se lisent sur la courbe */
function wRoots(el){let A=1,p=-1,q=3;const AS=[-2,-1,-.5,.5,1,2];let ai=4;
  el.innerHTML=`<div class="wcard"><p class="wres m" data-v="f"></p>${rg('a','a',0,5,ai)}${rg('p','Racine p',-4,4,p)}${rg('q','Racine q',-4,4,q)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  el.querySelector('[data-o="a"]').innerHTML=num(AS[ai]);
  const par=v=>v<0?`(x + ${num(-v)})`:v?`(x − ${num(v)})`:'x';
  const draw=()=>{A=AS[ai];const f=x=>A*(x-p)*(x-q),G=gp({x0:-6,x1:6,y0:-9,y1:9,H:220}),s=p+q,P=p*q,xs=s/2;
    G.axes(1,1,2,3).fn(f,'var(--t-sq)').dot(p,0,'var(--t-x)',6).dot(q,0,'var(--t-x)',6).seg(xs,-9,xs,9,'var(--t-c)',1.2,'4 4').dot(xs,f(xs),'var(--t-c)',5);
    wout(el,'p',G.done('Parabole et ses racines'));
    const co=(c,x,first)=>{if(!c)return'';const sg=c<0?(first?MINUS:' − '):(first?'':' + '),v=Math.abs(c);return sg+(v===1&&x?'':num(v))+x};
    const k=A===1?'':A===-1?MINUS:num(A);wout(el,'f',`${k}${par(p)}${par(q)} = ${co(A,'x²',true)}${co(-A*s,'x')}${co(A*P,'')}`);
    wout(el,'t',`Un produit est nul si et seulement si l’un des facteurs est nul : la courbe coupe l’axe en x = ${num(p)} et x = ${num(q)}${p===q?' (racine double : la parabole touche l’axe sans le traverser)':''}.<br>Somme des racines = ${num(s)}, produit = ${num(P)}. Le sommet est au milieu des racines, en x = ${dec(xs,1)}. Le signe de a (${num(A)}) dit si la parabole est tournée vers le haut ou vers le bas.`)};
  onR(el,'a',v=>{ai=v;draw()},v=>num(AS[v]));onR(el,'p',v=>{p=v;draw()});onR(el,'q',v=>{q=v;draw()});draw()}
/* Inéquation résolue graphiquement : ax + b > −x/2 + 2 */
function wIneqG(el){let a=1,b=-1;
  el.innerHTML=`<div class="wcard"><p class="wres m" data-v="e"></p>${rg('a','Pente a',-3,3,a,.5)}${rg('b','b',-4,4,b,.5)}<div class="plot" data-v="p"></div>${lg([['var(--t-sq)','y = ax + b'],['var(--t-x)','y = −x/2 + 2']])}<p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const f=x=>a*x+b,g=x=>-x/2+2,k=a+.5,c=2-b,G=gp({x0:-6,x1:6,y0:-6,y1:6,H:240});let sol,lo=-6,hi=6;
    if(Math.abs(k)<1e-9){sol=c<0?'tous les réels : ℝ':'aucun réel : ∅';if(c>=0){lo=hi=0}}else{const r=c/k;if(k>0){sol=`x &gt; ${dec(r,2)}, soit ]${dec(r,2)} ; +∞[`;lo=r}else{sol=`x &lt; ${dec(r,2)}, soit ]−∞ ; ${dec(r,2)}[`;hi=r}}
    G.axes(1,1,2,2);if(hi>lo)G.rect(Math.max(-6,lo),-6,Math.min(6,hi),6,'var(--good)',.12).seg(Math.max(-6,lo),0,Math.min(6,hi),0,'var(--good)',5);
    G.fn(f,'var(--t-sq)').fn(g,'var(--t-x)');if(Math.abs(k)>1e-9){const r=c/k;G.dot(r,g(r),'var(--ink)',5).seg(r,-6,r,6,'var(--ink)',1,'3 3')}
    wout(el,'p',G.done('Deux droites et la zone où la première est au-dessus'));
    wout(el,'e',`${num(a)}x ${b<0?'−':'+'} ${num(Math.abs(b))} &gt; −x/2 + 2`);
    wout(el,'t',`On regroupe : <span class="m">(${num(a)} + 0,5)x &gt; 2 ${b<0?'+':'−'} ${num(Math.abs(b))}</span>, soit <span class="m">${dec(k,1)}x &gt; ${dec(c,1)}</span>.<br>${Math.abs(k)<1e-9?'Le coefficient de x est nul : on ne peut pas diviser.':k<0?`On divise par ${dec(k,1)}, un nombre <b>négatif</b> : le sens de l’inégalité <b>s’inverse</b>.`:`On divise par ${dec(k,1)}, positif : le sens est conservé.`}<br>Solutions : <b>${sol}</b>. Sur le dessin, c’est la zone verte, là où la droite bleue est au-dessus de la verte.`)};
  onR(el,'a',v=>{a=v;draw()},v=>dec(v,1));onR(el,'b',v=>{b=v;draw()},v=>dec(v,1));draw()}
/* Puissances : la courbe de bˣ */
function wGrow(el){let b=2,x=2;
  el.innerHTML=`<div class="wcard">${rg('b','Base b',.25,3,b,.25)}${rg('x','Exposant x',-3,3,x,1)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const f=t=>b**t,G=gp({x0:-3.3,x1:3.3,y0:-.5,y1:8.5,H:220});G.axes(1,1,1,2).fn(f,'var(--t-sq)').dot(0,1,'var(--t-c)',5).dot(x,f(x),'var(--ink)',6).seg(x,0,x,f(x),'var(--muted)',1,'3 3');
    if(x)G.dot(-x,f(-x),'var(--t-x)',5);
    wout(el,'p',G.done('Courbe de la fonction b puissance x'));
    const v=f(x),fr2=Number.isInteger(1/v)&&v<1?`1/${1/v}`:dec(v,4);
    wout(el,'t',`<span class="m">${num(b)}<sup>${num(x)}</sup> = ${x>=0?(x?Array(x).fill(num(b)).join(' × '):'1'):`1 / ${num(b)}<sup>${-x}</sup>`} = <b>${fr2}</b></span><br>La courbe passe toujours par (0 ; 1) car b<sup>0</sup> = 1. ${x?`Le point vert est b<sup>${MINUS}${Math.abs(x)}</sup> : un exposant négatif donne l’<b>inverse</b>, ${num(b)}<sup>${num(-x)}</sup> = 1/${num(b)}<sup>${Math.abs(x)}</sup>.`:''} ${b>1?'Base &gt; 1 : chaque pas de 1 vers la droite multiplie par '+num(b)+'.':b<1?'Base &lt; 1 : la courbe décroît.':'Base 1 : toujours 1.'}`)};
  onR(el,'b',v=>{b=v;draw()});onR(el,'x',v=>{x=v;draw()});draw()}
/* Réciproque d'une fonction affine */
function wInv(el){let m=2,p=1,a=1;
  el.innerHTML=`<div class="wcard">${rg('m','Pente m',-3,3,m,.5)}${rg('p','Ordonnée p',-3,3,p,.5)}${rg('a','Point a',-2,2,a,.5)}<div class="plot" data-v="p"></div>${lg([['var(--t-sq)','f'],['var(--t-x)','f⁻¹'],['var(--muted)','y = x',1]])}<p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const G=gp({x0:-5,x1:5,y0:-5,y1:5,W:300,H:300}),f=x=>m*x+p,b=f(a);G.axes(1,1,2,2).fn(x=>x,'var(--muted)',1.5,'5 4').fn(f,'var(--t-sq)');
    if(m)G.fn(x=>(x-p)/m,'var(--t-x)').seg(a,b,b,a,'var(--t-c)',1.5,'3 3').dot(b,a,'var(--t-x)',6);G.dot(a,b,'var(--t-sq)',6);
    wout(el,'p',G.done('Une fonction affine et sa réciproque'));
    wout(el,'t',m?`f(x) = ${dec(m,1)}x ${p<0?'−':'+'} ${dec(Math.abs(p),1)} : f multiplie par ${dec(m,1)} puis ajoute ${dec(p,1)}. Pour défaire, on fait l’inverse dans l’ordre inverse : on retire ${dec(p,1)}, puis on divise par ${dec(m,1)}.<br><span class="m"><b>f⁻¹(x) = (x ${p<0?'+':'−'} ${dec(Math.abs(p),1)}) / ${dec(m,1)}</b></span>. Vérification : f(${num(a)}) = ${dec(b,2)} et f⁻¹(${dec(b,2)}) = ${num(a)}.`:'Avec m = 0, f est constante : plusieurs x donnent la même image, il n’y a pas de réciproque.')};
  onR(el,'m',v=>{m=v;draw()},v=>dec(v,1));onR(el,'p',v=>{p=v;draw()},v=>dec(v,1));onR(el,'a',v=>{a=v;draw()},v=>dec(v,1));draw()}

/* ===================== Statistiques ===================== */
/* Écart-type : dispersion, décalage et changement d'échelle */
function wSpread(el){let s=1,t=0;const Z=[-1.6,-1.1,-.8,-.5,-.3,-.1,.1,.3,.5,.8,1.1,1.6];
  el.innerHTML=`<div class="wcard">${rg('s','Étalement ×',0,2.5,s,.25)}${rg('t','Décalage +',-4,4,t,1)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const xs=Z.map(z=>10+t+s*2*z),m=xs.reduce((a,b)=>a+b,0)/xs.length,V=xs.reduce((a,x)=>a+(x-m)**2,0)/xs.length,sd=Math.sqrt(V),G=gp({x0:0,x1:20,y0:-1,y1:2,H:110});
    G.seg(0,0,20,0,'var(--muted)',1.2);for(let v=0;v<=20;v+=2)G.text(v,0,num(v),'var(--muted)','middle',0,14,10,false);
    G.rect(m-sd,-.35,m+sd,1.6,'var(--t-c)',.2).seg(m,-.35,m,1.6,'var(--t-c)',2).text(m,1.6,'x̄','var(--ink)','middle',0,-2,12);
    xs.forEach((x,i)=>G.dot(x,.35+(i%3)*.4,'var(--t-sq)',5));
    wout(el,'p',G.done('Nuage de valeurs, moyenne et bande d’un écart-type'));
    wout(el,'t',`Moyenne x̄ = <b>${dec(m,2)}</b>, variance V = <b>${dec(V,2)}</b>, écart-type σ = √V = <b>${dec(sd,2)}</b>. La bande jaune va de x̄ − σ à x̄ + σ.<br>Décaler toutes les valeurs déplace la moyenne mais ne change pas σ. Multiplier l’étalement par k multiplie σ par k (et V par k²).`)};
  onR(el,'s',v=>{s=v;draw()},v=>dec(v,2));onR(el,'t',v=>{t=v;draw()});draw()}
/* Bayes avec 1000 personnes : fréquences naturelles */
function wBayes(el){let pv=5,se=90,sp=90;
  el.innerHTML=`<div class="wcard">${rg('pv','Malades (%)',1,30,pv)}${rg('se','Sensibilité (%)',50,99,se)}${rg('sp','Spécificité (%)',50,99,sp)}<div class="plot" data-v="p"></div>
    ${lg([['var(--t-sq)','malade, test +'],['var(--t-x)','malade, test −'],['var(--t-c)','sain, test + (faux positif)'],['var(--line)','sain, test −']])}<p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const M=Math.round(1000*pv/100),VP=Math.round(M*se/100),FN=M-VP,S=1000-M,FP=Math.round(S*(100-sp)/100),cols=40,sz=7.5;
    const cells=[...Array(VP).fill('var(--t-sq)'),...Array(FN).fill('var(--t-x)'),...Array(FP).fill('var(--t-c)'),...Array(S-FP).fill('var(--line)')];
    let g=`<svg viewBox="0 0 ${cols*sz} ${25*sz}" role="img" aria-label="1000 personnes classées selon la maladie et le test">`;cells.forEach((c,i)=>{g+=`<rect x="${(i%cols)*sz+.6}" y="${Math.floor(i/cols)*sz+.6}" width="${sz-1.2}" height="${sz-1.2}" rx="1.5" fill="${c}"/>`});
    wout(el,'p',g+'</svg>');const P=VP/(VP+FP);
    wout(el,'t',`Sur 1000 personnes : ${M} malades, dont <b>${VP}</b> testés positifs ; ${S} sains, dont <b>${FP}</b> testés positifs à tort.<br>Si ton test est positif, tu fais partie des ${VP+FP} cases bleues ou jaunes. La probabilité d’être vraiment malade est donc <span class="m">P(M | +) = ${VP} / (${VP} + ${FP}) ≈ <b>${dec(P*100,1)} %</b></span>.<br>${P<.5?'Surprenant mais vrai : quand la maladie est rare, la plupart des positifs sont des faux positifs.':'Ici la maladie est assez fréquente pour qu’un test positif soit fiable.'}`)};
  onR(el,'pv',v=>{pv=v;draw()});onR(el,'se',v=>{se=v;draw()});onR(el,'sp',v=>{sp=v;draw()});draw()}
/* Loi des grands nombres : fréquence du 6 */
function wLLN(el){let T=[];
  el.innerHTML=`<div class="wcard"><div class="trow">${[10,100,1000].map(n=>`<button class="btn ghost" data-k="${n}">+${n} lancers</button>`).join('')}</div><button class="linkbtn sm" data-k="0">Recommencer</button><div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const n=T.length,G=gp({x0:0,x1:Math.max(10,n),y0:0,y1:.6,H:180,xf:v=>num(Math.round(v))});const st=Math.max(1,Math.ceil(n/300));
    G.axes(Math.max(1,Math.pow(10,Math.floor(Math.log10(Math.max(10,n))))),.1);G.seg(0,1/6,Math.max(10,n),1/6,'var(--t-c)',1.5,'5 4');
    let c=0,d='';T.forEach((v,i)=>{if(v===6)c++;if(i%st===0||i===n-1)d+=(d?'L':'M')+G.X(i+1).toFixed(1)+','+G.Y(c/(i+1)).toFixed(1)});G.raw(`<path d="${d}" fill="none" stroke="var(--t-sq)" stroke-width="2.2"/>`);
    wout(el,'p',G.done('Fréquence du 6 en fonction du nombre de lancers'));
    wout(el,'t',n?`${n} lancers, ${c} fois le 6 : fréquence <b>${dec(c/n,3)}</b>, contre une probabilité de 1/6 ≈ 0,167 (pointillés). Plus on lance, plus la fréquence se stabilise près de 1/6 : c’est la <b>loi des grands nombres</b>. L’espérance est la moyenne « à long terme ».`:'Lance le dé pour voir la fréquence du 6 évoluer.')};
  el.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const k=+b.dataset.k;if(!k)T=[];else for(let i=0;i<k&&T.length<5000;i++)T.push(1+Math.floor(Math.random()*6));sfx.tap();draw()});
  for(let i=0;i<30;i++)T.push(1+Math.floor(Math.random()*6));draw()}
/* Théorème central limite : moyennes de n dés */
function wCLT(el){let n=1,means=[];const NI=[1,2,5,10,30];let ni=0;
  el.innerHTML=`<div class="wcard">${rg('n','Dés par moyenne',0,4,ni)}<button class="btn ghost" data-k="go">Nouveau tirage</button><div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  el.querySelector('[data-o="n"]').innerHTML=num(NI[ni]);
  const sim=()=>{n=NI[ni];means=Array.from({length:600},()=>{let s=0;for(let i=0;i<n;i++)s+=1+Math.floor(Math.random()*6);return s/n});draw()};
  const draw=()=>{const B=25,lo=1,hi=6,w=(hi-lo)/B,cnt=Array(B).fill(0);means.forEach(m=>cnt[Math.min(B-1,Math.floor((m-lo)/w))]++);
    const sd=Math.sqrt(35/12/n),dens=x=>Math.exp(-((x-3.5)**2)/(2*sd*sd))/(sd*Math.sqrt(2*Math.PI)),mxv=Math.max(...cnt.map(c=>c/(600*w)),dens(3.5)),G=gp({x0:.8,x1:6.2,y0:0,y1:mxv*1.08,H:180});
    G.axes(1,99,1,0);cnt.forEach((c,i)=>G.rect(lo+i*w+.01,0,lo+(i+1)*w-.01,c/(600*w),'var(--t-sq)',.75));if(n>1)G.fn(dens,'var(--t-c)',2.2);
    wout(el,'p',G.done('Histogramme des moyennes et courbe normale'));
    wout(el,'t',`600 moyennes de ${n} dé${n>1?'s':''}. ${n===1?'Avec un seul dé, les 6 valeurs sont également probables : histogramme plat.':`La moyenne reste centrée sur 3,5, et son écart-type vaut σ/√n ≈ ${dec(sd,3)}. Plus n est grand, plus l’histogramme se resserre et prend la forme d’une cloche (courbe jaune) : c’est le <b>théorème central limite</b>.`}`)};
  onR(el,'n',v=>{ni=v;sim()},v=>num(NI[v]));el.querySelector('[data-k="go"]').onclick=()=>{sfx.tap();sim()};sim()}
