/* ---- Manipulations interactives des cours MVA911 / MVA912 ----
   Chaque manipulation est une fonction vXxx(el, params) appelée par le cours (bloc « @nom {params} | consigne »).
   Les formules des paramètres s'écrivent dans la syntaxe du moteur (x, ^, sqrt(, exp(, ln(, sin(…) ;
   les lettres a, b, c, k, m, p, q, r, t, u, v, w y désignent des curseurs. */
const VZ_LET=/(?<![A-Za-z_])([abckmnpqrtuvw])(?![A-Za-z_(])/g;
/** Compile « a*x^2+b » en fonction de x, avec les valeurs courantes des curseurs. */
function vzFn(expr,P={}){try{const s=String(expr).replace(VZ_LET,(m,l)=>l in P?`(${P[l]})`:m),ast=parse(s);return x=>{try{const v=ev(ast,x);return Number.isFinite(v)?v:NaN}catch(e){return NaN}}}catch(e){return()=>NaN}}
/** Écrit une formule du moteur, curseurs remplacés, en HTML lisible. */
/* Simplifie l'écriture après remplacement des curseurs : 1·x → x, 0·x → 0, x + 0 → x, x¹ → x… */
function vzSimp(n){if(!n||typeof n!=='object')return n;const c={...n};if(c.a)c.a=vzSimp(c.a);if(c.b)c.b=vzSimp(c.b);
  const isN=(m,v)=>m&&m.t==='num'&&m.v===v,neg1=m=>m&&m.t==='neg'&&isN(m.a,1),zero=m=>isN(m,0)||(m&&m.t==='neg'&&isN(m.a,0));
  if(c.t==='neg'&&c.a.t==='neg')return c.a.a;
  if(c.t==='mul'){if(zero(c.a)||zero(c.b))return{t:'num',v:0};if(isN(c.a,1))return c.b;if(isN(c.b,1))return c.a;if(neg1(c.a))return{t:'neg',a:c.b};
    if(c.a.t==='neg')return{t:'neg',a:vzSimp({t:'mul',a:c.a.a,b:c.b,ex:c.ex})}}
  if(c.t==='add'){if(zero(c.b))return c.a;if(zero(c.a))return c.b}
  if(c.t==='sub'){if(zero(c.b))return c.a;if(zero(c.a))return{t:'neg',a:c.b};if(c.b.t==='neg')return{t:'add',a:c.a,b:c.b.a}}
  if(c.t==='pow'){if(isN(c.b,1))return c.a;if(zero(c.b))return{t:'num',v:1}}
  if(c.t==='div'&&isN(c.b,1))return c.a;
  return c}
const vzTex=(expr,P={})=>{try{return H(vzSimp(parse(String(expr).replace(VZ_LET,(m,l)=>l in P?`(${P[l]})`:m))))}catch(e){return escH(String(expr))}};
const vzNum=v=>!Number.isFinite(v)?'—':num(+(+v).toFixed(Math.abs(v)<10?3:2));
const vzSliders=(el,P,spec,cb)=>{const ks=Object.keys(spec||{});
  if(!ks.length)return'';return ks.map(k=>{const[mn,mx2,st,v0]=spec[k];P[k]=v0??mn;return rg('p'+k,k,mn,mx2,P[k],st)}).join('')};
const vzWire=(el,P,spec,cb)=>Object.keys(spec||{}).forEach(k=>onR(el,'p'+k,v=>{P[k]=v;cb()}));
/* Intégrale numérique (Simpson) */
const vzInt=(f,a,b,n=400)=>{if(a===b)return 0;const h=(b-a)/n;let s=f(a)+f(b);for(let i=1;i<n;i++)s+=f(a+i*h)*(i%2?4:2);return s*h/3};
const vzD=(f,x,h=1e-4)=>(f(x+h)-f(x-h))/(2*h);

/* 1. Courbe paramétrée : curseurs, tangente, aire, dérivée, asymptotes, points */
function vCurve(el,p={}){const P={},curves=(Array.isArray(p.f)?p.f:[p.f]).map((c,i)=>typeof c==='string'?{f:c}:c);
  const [x0,x1]=p.x||[-5,5],[y0,y1]=p.y||[-4,6],cols=['var(--t-sq)','var(--t-c)','var(--t-x)','var(--good)'];
  const hasT=p.tangente!=null&&p.tangente!==false,lec=p.lecture!=null&&!hasT,tan=hasT||lec,area=p.aire,T={a:area?area[0]:0,b:area?area[1]:1,t:typeof p.tangente==='number'?p.tangente:typeof p.lecture==='number'?p.lecture:(x0+x1)/4};
  const extra={};if(tan)extra.x0=[x0,x1,(x1-x0)/100,T.t];if(area){extra.A=[x0,x1,(x1-x0)/100,T.a];extra.B=[x0,x1,(x1-x0)/100,T.b]}
  el.innerHTML=`<div class="wcard vz">${vzSliders(el,P,p.curseurs)}${tan?rg('tx',lec?'x':'x₀',x0,x1,T.t,(x1-x0)/100):''}${area?rg('ta','borne a',x0,x1,T.a,(x1-x0)/100)+rg('tb','borne b',x0,x1,T.b,(x1-x0)/100):''}
    <div data-v="g"></div><div class="vzout" data-v="o"></div>${curves.length>1||p.derivee?lg(curves.map((c,i)=>[cols[i],c.nom||`f${curves.length>1?i+1:''}`]).concat(p.derivee?[[cols[3],'f ′',1]]:[])):''}</div>`;
  const draw=()=>{const fs=curves.map(c=>vzFn(c.f,P)),g=gp({W:320,H:220,x0,x1,y0,y1});g.axes(p.pas||1,p.pasy||p.pas||1,p.etiq||p.pas||1,p.etiqy||p.pasy||p.pas||1);
    if(area){const a=Math.min(T.a,T.b),b=Math.max(T.a,T.b);g.area(fs[0],()=>0,a,b,'var(--t-sq)',.22)}
    (p.asymptotes||{}).v?.forEach(v=>g.seg(v,y0,v,y1,'var(--bad)',1.5,'5 4'));(p.asymptotes||{}).h?.forEach(h=>g.seg(x0,h,x1,h,'var(--bad)',1.5,'5 4'));
    (p.asymptotes||{}).o?.forEach(([m,q])=>g.fn(x=>m*x+q,'var(--bad)',1.5,'5 4'));
    fs.forEach((f,i)=>g.fn(f,cols[i],2.6));
    if(p.derivee)g.fn(x=>vzD(fs[0],x),cols[3],2,'6 4');
    (p.points||[]).forEach(([x,y,l])=>{g.dot(x,y,'var(--ink)',4);if(l)g.text(x,y,l,'var(--ink)','start',6,-6)});
    let o=curves.length===1?`<span class="m"><i>f</i>(<i>x</i>) = ${vzTex(curves[0].f,P)}</span>`:'';
    if(tan){const f=fs[0],y=f(T.t),m=vzD(f,T.t);if(lec){if(Number.isFinite(y)){g.seg(T.t,0,T.t,y,'var(--muted)',1.2,'3 3');g.dot(T.t,y,'var(--ink)',5)}
        o+=`<span>En <i>x</i> = ${vzNum(T.t)} : <i>f</i>(<i>x</i>) = <b>${Number.isFinite(y)?vzNum(y):'non définie'}</b></span>`}
      else{if(Number.isFinite(y)&&Number.isFinite(m)){g.fn(x=>y+m*(x-T.t),'var(--ink)',1.6,'',x0,x1);g.dot(T.t,y,'var(--ink)',5)}
      o+=`<span>En <i>x</i>₀ = ${vzNum(T.t)} : <i>f</i>(<i>x</i>₀) = ${vzNum(y)}, pente de la tangente <i>f</i> ′(<i>x</i>₀) ≈ <b>${vzNum(m)}</b></span>`}}
    if(area){const a=Math.min(T.a,T.b),b=Math.max(T.a,T.b);o+=`<span>Aire algébrique ∫<sub>${vzNum(a)}</sub><sup>${vzNum(b)}</sup> <i>f</i>(<i>x</i>) d<i>x</i> ≈ <b>${vzNum(vzInt(fs[0],a,b))}</b></span>`}
    wout(el,'g',g.done(p.titre||'Courbe'));wout(el,'o',o)};
  vzWire(el,P,p.curseurs,draw);if(tan)onR(el,'tx',v=>{T.t=v;draw()},vzNum);if(area){onR(el,'ta',v=>{T.a=v;draw()},vzNum);onR(el,'tb',v=>{T.b=v;draw()},vzNum)}
  draw()}

/* 2. Calcul animé pas à pas : chaque étape apparaît avec son explication, lecture automatique possible */
function vSteps(el,p={}){const S=p.etapes||[];let i=0,tm=null;
  el.innerHTML=`<div class="wcard vz vsteps"><div class="vsbar"><span class="vscount" data-v="c"></span><span class="vsdots">${S.map((_,j)=>`<i data-d="${j}"></i>`).join('')}</span></div>
    <div class="vsstage" data-v="s" aria-live="polite"></div><p class="wexp" data-v="e"></p>
    <div class="wnav"><button class="btn ghost" data-k="p">Précédent</button><button class="btn ghost" data-k="a">▶ Lecture</button><button class="btn" data-k="n">Étape suivante</button></div></div>`;
  const draw=()=>{const [m,w]=S[i]||['',''];
    wout(el,'s',S.slice(0,i+1).map(([mm],j)=>`<div class="vsl${j===i?' cur':''}"><span class="m">${cmath(mm)}</span></div>`).join(''));
    wout(el,'e',w?inl(w):'');wout(el,'c',`Étape ${i+1} / ${S.length}`);
    el.querySelectorAll('[data-d]').forEach(d=>d.classList.toggle('on',+d.dataset.d<=i));
    el.querySelector('[data-k="p"]').disabled=!i;el.querySelector('[data-k="n"]').disabled=i>=S.length-1;
    const st=el.querySelector('[data-v="s"]');st.scrollTop=st.scrollHeight};
  const stop=()=>{clearInterval(tm);tm=null;el.querySelector('[data-k="a"]').textContent='▶ Lecture'};
  el.querySelector('[data-k="p"]').onclick=()=>{stop();if(i){i--;sfx.tap();draw()}};
  el.querySelector('[data-k="n"]').onclick=()=>{stop();if(i<S.length-1){i++;sfx.tap();draw()}};
  el.querySelector('[data-k="a"]').onclick=e=>{if(tm){stop();return}if(i>=S.length-1)i=0;draw();e.target.textContent='❚❚ Pause';tm=setInterval(()=>{if(i>=S.length-1||!el.isConnected){stop();return}i++;draw()},2200)};
  draw()}

/* 3. Fractions : barres partagées, fractions égales, somme au même dénominateur */
function vFrac(el,p={}){const mode=p.mode||'parts';
  const bar=(n,d,col,lab)=>{const W=300,w=W/d;let s=`<svg viewBox="0 0 ${W+2} 46" class="vfbar" role="img" aria-label="${lab}">`;
    for(let i=0;i<d;i++)s+=`<rect x="${1+i*w}" y="3" width="${w}" height="34" rx="${d>24?1:4}" fill="${i<n?col:'var(--surface)'}" stroke="var(--ink)" stroke-width="${d>30?.6:1.2}" style="transition:fill .3s ${i*12}ms"/>`;
    return s+'</svg>'};
  if(mode==='somme'){const S={a:p.a||1,b:p.b||4,c:p.c||1,d:p.d||6,step:0};
    el.innerHTML=`<div class="wcard vz">${rg('a','a',1,8,S.a)}${rg('b','b',2,9,S.b)}${rg('c','c',1,8,S.c)}${rg('d','d',2,9,S.d)}<div data-v="g"></div><p class="wexp" data-v="e"></p>
      <div class="wnav"><button class="btn" data-k="go">Même dénominateur</button></div></div>`;
    const draw=()=>{const{a,b,c,d}=S,m=b*d/gcd(b,d),k1=m/b,k2=m/d,f=S.step;
      wout(el,'g',f?`${bar(a*k1,m,'var(--t-sq)',`${a*k1} sur ${m}`)}${bar(c*k2,m,'var(--t-c)',`${c*k2} sur ${m}`)}${bar(a*k1+c*k2>m?m:a*k1+c*k2,m,'var(--t-x)','somme')}`
        :`${bar(Math.min(a,b),b,'var(--t-sq)',`${a} sur ${b}`)}${bar(Math.min(c,d),d,'var(--t-c)',`${c} sur ${d}`)}`);
      const r=new Fr(a*d+c*b,b*d);
      wout(el,'e',f?`Mêmes parts : ${fr(a,b)} = ${fr(a*k1,m)} et ${fr(c,d)} = ${fr(c*k2,m)}. On additionne les parts : ${fr(a*k1+c*k2,m)}${r.d!==m?` = ${frH(r)}`:''}${a*k1+c*k2>m?' (plus d’une barre entière)':''}.`
        :`Les parts n’ont pas la même taille : on ne peut pas encore les additionner. Le plus petit dénominateur commun est ${m}.`)};
    ['a','b','c','d'].forEach(k=>onR(el,k,v=>{S[k]=v;S.step=0;draw()}));el.querySelector('[data-k="go"]').onclick=()=>{S.step=1;sfx.tap();draw()};draw();return}
  const S={n:p.n||3,d:p.d||8,k:1};
  el.innerHTML=`<div class="wcard vz">${rg('n','parts prises',0,12,S.n)}${rg('d','parts en tout',1,12,S.d)}${rg('k','redécouper ×',1,4,1)}<div data-v="g"></div><p class="wexp" data-v="e"></p></div>`;
  const draw=()=>{const n=Math.min(S.n,S.d),d=S.d,k=S.k,g=gcd(n,d);
    wout(el,'g',bar(n,d,'var(--t-sq)',`${n} sur ${d}`)+(k>1?bar(n*k,d*k,'var(--t-c)',`${n*k} sur ${d*k}`):''));
    wout(el,'e',`${fr(n,d)}${k>1?` = ${fr(n*k,d*k)} : même quantité, parts ${k} fois plus petites`:''}${g>1&&n?`. Forme irréductible : ${fr(n/g,d/g)} (on divise par ${g})`:''} ≈ ${dec(n/d,3)}.`)};
  ['n','d','k'].forEach(k=>onR(el,k,v=>{S[k]=v;draw()}));draw()}

/* 4. Pourcentages : évolutions successives et coefficient multiplicateur */
function vPct(el,p={}){const S={v:p.v||200,t:p.t||20,n:p.n||1,t2:p.t2??-20};
  el.innerHTML=`<div class="wcard vz">${rg('v','valeur de départ',10,500,S.v,10)}${rg('t','évolution 1 (%)',-80,100,S.t)}${rg('t2','évolution 2 (%)',-80,100,S.t2)}<div data-v="g"></div><p class="wexp" data-v="e"></p></div>`;
  const draw=()=>{const c1=1+S.t/100,c2=1+S.t2/100,v1=S.v*c1,v2=v1*c2,mx=Math.max(S.v,v1,v2)*1.15,W=300,Hh=150,bw=60;
    const b=(i,v,l,col)=>{const h=v/mx*(Hh-30),x=20+i*100;return`<rect x="${x}" y="${Hh-18-h}" width="${bw}" height="${h}" rx="5" fill="${col}" style="transition:all .4s"/><text x="${x+bw/2}" y="${Hh-22-h}" font-size="11" font-weight="700" text-anchor="middle" fill="var(--ink)">${dec(v,2)}</text><text x="${x+bw/2}" y="${Hh-4}" font-size="10" text-anchor="middle" fill="var(--muted)">${l}</text>`};
    const arr=(i,c)=>`<text x="${20+i*100+bw+20}" y="40" font-size="11" font-weight="700" text-anchor="middle" fill="var(--t-sq)">× ${dec(c,4)}</text>`;
    wout(el,'g',`<svg viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Évolutions successives">${b(0,S.v,'départ','var(--line)')}${b(1,v1,'après 1','var(--t-sq)')}${b(2,v2,'après 2','var(--t-c)')}${arr(0,c1)}${arr(1,c2)}</svg>`);
    const ct=c1*c2,tg=(ct-1)*100;
    wout(el,'e',`Augmenter de ${num(S.t)} %, c’est multiplier par ${dec(c1,4)}. Les deux évolutions font × ${dec(c1,4)} × ${dec(c2,4)} = × ${dec(ct,4)}, soit <b>${tg>=0?'+':''}${dec(tg,2)} %</b> au total${S.t&&S.t===-S.t2?' : une hausse puis une baisse du même pourcentage ne se compensent pas':''}. Pour revenir à la valeur de départ après la 1ʳᵉ évolution, il faudrait ${dec((1/c1-1)*100,2)} %.`)};
  ['v','t','t2'].forEach(k=>onR(el,k,v=>{S[k]=v;draw()}));draw()}

/* 5. Droite par deux points : pente, triangle de pente, équation réduite */
function vLine(el,p={}){const A=p.A?[...p.A]:[-2,-1],B=p.B?[...p.B]:[2,3],x0=-6,x1=6,y0=-5,y1=5;let drag=null;
  el.innerHTML=`<div class="wcard vz"><div data-v="g" class="vzdrag"></div><p class="wexp" data-v="e"></p><p class="whint">Fais glisser les points A et B.</p></div>`;
  const draw=()=>{const g=gp({W:300,H:250,x0,x1,y0,y1});g.axes(1,1,2,2);const dx=B[0]-A[0],dy=B[1]-A[1];
    let eq;if(Math.abs(dx)<1e-9){g.seg(A[0],y0,A[0],y1,'var(--t-sq)',2.6);eq=`Droite verticale : <span class="m"><i>x</i> = ${num(A[0])}</span> (pas de pente)`}
    else{const m=dy/dx,b=A[1]-m*A[0];g.fn(x=>m*x+b,'var(--t-sq)',2.6);g.seg(A[0],A[1],B[0],A[1],'var(--t-c)',2,'5 3');g.seg(B[0],A[1],B[0],B[1],'var(--t-c)',2,'5 3');
      g.text((A[0]+B[0])/2,A[1],`Δx = ${num(+dx.toFixed(2))}`,'var(--t-c)','middle',0,dy>=0?14:-6,10);g.text(B[0],(A[1]+B[1])/2,`Δy = ${num(+dy.toFixed(2))}`,'var(--t-c)','start',5,3,10);g.dot(0,b,'var(--t-x)',4);
      eq=`Pente <span class="m">a = Δy ÷ Δx = ${num(+dy.toFixed(2))} ÷ ${num(+dx.toFixed(2))} = ${dec(m,3)}</span>. Ordonnée à l’origine b = ${dec(b,3)} (le point sur l’axe vertical). Équation : <span class="m"><i>y</i> = ${dec(m,3)}<i>x</i> ${b<0?MINUS:'+'} ${dec(Math.abs(b),3)}</span>.`}
    g.dot(A[0],A[1],'var(--t-sq)',7).text(A[0],A[1],'A','var(--ink)','start',8,-8);g.dot(B[0],B[1],'var(--t-sq)',7).text(B[0],B[1],'B','var(--ink)','start',8,-8);
    wout(el,'g',g.done('Droite passant par A et B'));wout(el,'e',eq);bind()};
  const bind=()=>{const sv=el.querySelector('svg');sv.onpointerdown=e=>{const pt=loc(e);drag=Math.hypot(pt[0]-A[0],pt[1]-A[1])<Math.hypot(pt[0]-B[0],pt[1]-B[1])?A:B;sv.setPointerCapture?.(e.pointerId);move(e)};
    sv.onpointermove=e=>{if(drag)move(e)};sv.onpointerup=sv.onpointercancel=()=>{drag=null}};
  const loc=e=>{const r=el.querySelector('svg').getBoundingClientRect(),X=(e.clientX-r.left)/r.width*300,Y=(e.clientY-r.top)/r.height*250;return[x0+(X-8)/(284)*(x1-x0),y1-(Y-8)/(234)*(y1-y0)]};
  const move=e=>{const[x,y]=loc(e);drag[0]=Math.max(x0,Math.min(x1,Math.round(x*2)/2));drag[1]=Math.max(y0,Math.min(y1,Math.round(y*2)/2));draw()};
  draw()}

/* 6. Triangle : Pythagore (carrés sur les côtés), Thalès (parallèle), rapports trigonométriques */
function vTri(el,p={}){const mode=p.mode||'pythagore',S={a:p.a||3,b:p.b||4,k:.5,al:35};
  el.innerHTML=`<div class="wcard vz">${mode==='thales'?rg('k','position de la parallèle',.1,.9,.5,.05):mode==='trigo'?rg('al','angle α (°)',5,85,35)+rg('b','côté adjacent',1,6,4,.5):rg('a','côté a',1,6,3,.5)+rg('b','côté b',1,6,4,.5)}<div data-v="g"></div><p class="wexp" data-v="e"></p></div>`;
  const draw=()=>{let s='',e='';const W=300,Hh=mode==='pythagore'?300:230;
    if(mode==='pythagore'){const sc=Math.min(22,200/(S.a+2*S.b)),a=S.a*sc,b=S.b*sc,ox=12+a+(300-24-a-b-a)/2,oy=(Hh-b+(a+b))/2+4,c=Math.hypot(S.a,S.b);
      const P=[[ox,oy],[ox+b,oy],[ox,oy-a]];const sq=(p1,p2,col,lab)=>{const dx=p2[0]-p1[0],dy=p2[1]-p1[1],p3=[p2[0]-dy,p2[1]+dx],p4=[p1[0]-dy,p1[1]+dx],cx=(p1[0]+p3[0])/2,cy=(p1[1]+p3[1])/2;
        return`<polygon points="${[p1,p2,p3,p4].map(q=>q.join(',')).join(' ')}" fill="${col}" fill-opacity=".35" stroke="${col}" stroke-width="1.5"/><text x="${cx}" y="${cy+4}" font-size="11" font-weight="700" text-anchor="middle" fill="var(--ink)">${lab}</text>`};
      s+=sq(P[2],P[0],'var(--t-c)',`a² = ${num(S.a*S.a)}`)+sq(P[0],P[1],'var(--t-sq)',`b² = ${num(S.b*S.b)}`)+sq(P[1],P[2],'var(--t-x)',`c² = ${dec(c*c,2)}`);
      s+=`<polygon points="${P.map(q=>q.join(',')).join(' ')}" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><rect x="${ox}" y="${oy-10}" width="10" height="10" fill="none" stroke="var(--ink)"/>`;
      e=`Les aires des deux petits carrés s’ajoutent pour donner celle du grand : ${num(S.a*S.a)} + ${num(S.b*S.b)} = ${dec(c*c,2)}, donc l’hypoténuse vaut c = √${dec(c*c,2)} ≈ <b>${dec(c,3)}</b>.`}
    else if(mode==='thales'){const A=[150,20],B=[40,200],C=[270,200],k=S.k,M=[A[0]+(B[0]-A[0])*k,A[1]+(B[1]-A[1])*k],N=[A[0]+(C[0]-A[0])*k,A[1]+(C[1]-A[1])*k];
      s+=`<polygon points="${[A,B,C].map(q=>q.join(',')).join(' ')}" fill="var(--soft)" stroke="var(--ink)" stroke-width="2"/><line x1="${M[0]}" y1="${M[1]}" x2="${N[0]}" y2="${N[1]}" stroke="var(--t-sq)" stroke-width="3"/>`;
      [[A,'A',0,-6],[B,'B',-10,14],[C,'C',6,14],[M,'M',-14,0],[N,'N',8,0]].forEach(([q,l,dx,dy])=>s+=`<text x="${q[0]+dx}" y="${q[1]+dy}" font-size="12" font-weight="700" fill="var(--ink)">${l}</text>`);
      e=`(MN) est parallèle à (BC). Les rapports sont égaux : AM/AB = AN/AC = MN/BC = <b>${num(+k.toFixed(2))}</b>. Si BC = 10, alors MN = ${num(+(10*k).toFixed(2))}.`}
    else{const r=S.al*Math.PI/180,b=S.b,a=b*Math.tan(r),h=b/Math.cos(r),sc=Math.min(36,160/Math.max(b,a+.01)),ox=60,oy=200;
      const P=[[ox,oy],[ox+b*sc,oy],[ox+b*sc,oy-a*sc]];
      s+=`<polygon points="${P.map(q=>q.join(',')).join(' ')}" fill="var(--soft)" stroke="var(--ink)" stroke-width="2"/><rect x="${P[1][0]-10}" y="${oy-10}" width="10" height="10" fill="none" stroke="var(--ink)"/>
        <path d="M${ox+28},${oy} A28,28 0 0,0 ${ox+28*Math.cos(r)},${oy-28*Math.sin(r)}" fill="none" stroke="var(--t-sq)" stroke-width="2"/><text x="${ox+34}" y="${oy-6}" font-size="11" fill="var(--t-sq)" font-weight="700">α</text>
        <text x="${(P[0][0]+P[1][0])/2}" y="${oy+15}" font-size="11" text-anchor="middle" fill="var(--ink)">adjacent ${dec(b,2)}</text><text x="${P[1][0]+6}" y="${oy-a*sc/2}" font-size="11" fill="var(--ink)">opposé ${dec(a,2)}</text>
        <text x="${(P[0][0]+P[2][0])/2-8}" y="${(P[0][1]+P[2][1])/2-6}" font-size="11" text-anchor="end" fill="var(--ink)">hyp. ${dec(h,2)}</text>`;
      e=`cos α = adj/hyp = ${dec(Math.cos(r),3)}, sin α = opp/hyp = ${dec(Math.sin(r),3)}, tan α = opp/adj = ${dec(Math.tan(r),3)}. Change la taille : les rapports ne bougent pas, seul l’angle compte.`}
    wout(el,'g',`<svg viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Triangle">${s}</svg>`);wout(el,'e',e)};
  ['a','b','k','al'].forEach(k=>{if(el.querySelector(`[data-r="${k}"]`))onR(el,k,v=>{S[k]=v;draw()})});draw()}

/* 7. Vecteurs : somme, coordonnées, produit scalaire et projection */
function vVec(el,p={}){const U=p.u?[...p.u]:[3,1],V=p.v?[...p.v]:[1,2],x0=-5,x1=5,y0=-4,y1=4;let drag=null;
  el.innerHTML=`<div class="wcard vz">${wseg('m',['Somme','Produit scalaire'],p.mode==='scalaire'?1:0)}<div data-v="g" class="vzdrag"></div><p class="wexp" data-v="e"></p><p class="whint">Fais glisser les extrémités des flèches.</p></div>`;let mode=p.mode==='scalaire'?1:0;
  const draw=()=>{const g=gp({W:300,H:240,x0,x1,y0,y1});g.axes(1,1,2,2);let e;
    if(!mode){g.seg(U[0],U[1],U[0]+V[0],U[1]+V[1],'var(--t-c)',1.5,'5 3');g.seg(V[0],V[1],U[0]+V[0],U[1]+V[1],'var(--t-sq)',1.5,'5 3');g.arrow(0,0,U[0]+V[0],U[1]+V[1],'var(--t-x)');
      e=`<span class="m">u (${num(U[0])} ; ${num(U[1])}) + v (${num(V[0])} ; ${num(V[1])}) = (${num(U[0]+V[0])} ; ${num(U[1]+V[1])})</span> : on met les flèches bout à bout (règle du parallélogramme).`}
    else{const d=U[0]*V[0]+U[1]*V[1],nu=Math.hypot(...U),nv=Math.hypot(...V),c=nu&&nv?d/(nu*nv):0,th=Math.acos(Math.max(-1,Math.min(1,c)))*180/Math.PI,k=nu?d/(nu*nu):0;
      g.seg(V[0],V[1],k*U[0],k*U[1],'var(--muted)',1.2,'4 3');g.seg(0,0,k*U[0],k*U[1],'var(--t-x)',5);
      e=`<span class="m">u · v = ${num(U[0])}×${num(V[0])} + ${num(U[1])}×${num(V[1])} = <b>${num(d)}</b></span> = ‖u‖ × ‖v‖ × cos θ, avec θ ≈ ${dec(th,1)}°. ${Math.abs(d)<1e-9?'<b>Produit nul : les vecteurs sont orthogonaux.</b>':d>0?'Positif : angle aigu.':'Négatif : angle obtus.'} La barre violette est la projection de v sur u.`}
    g.arrow(0,0,U[0],U[1],'var(--t-sq)').text(U[0],U[1],'u','var(--t-sq)','start',6,-6,13);g.arrow(0,0,V[0],V[1],'var(--t-c)').text(V[0],V[1],'v','var(--t-c)','start',6,-6,13);
    wout(el,'g',g.done('Vecteurs'));wout(el,'e',e);bind()};
  const loc=e=>{const r=el.querySelector('svg').getBoundingClientRect(),X=(e.clientX-r.left)/r.width*300,Y=(e.clientY-r.top)/r.height*240;return[x0+(X-8)/284*(x1-x0),y1-(Y-8)/224*(y1-y0)]};
  const bind=()=>{const sv=el.querySelector('svg');sv.onpointerdown=e=>{const q=loc(e);drag=Math.hypot(q[0]-U[0],q[1]-U[1])<Math.hypot(q[0]-V[0],q[1]-V[1])?U:V;move(e)};
    sv.onpointermove=e=>{if(drag)move(e)};sv.onpointerup=sv.onpointercancel=()=>{drag=null}};
  const move=e=>{const[x,y]=loc(e);drag[0]=Math.max(x0+.5,Math.min(x1-.5,Math.round(x)));drag[1]=Math.max(y0+.5,Math.min(y1-.5,Math.round(y)));draw()};
  onSeg(el,'m',v=>{mode=v;draw()});draw()}

/* 8. Complexes : forme exponentielle, rotation, produit = rotation + agrandissement */
function vEuler(el,p={}){const S={r:p.r||1.5,t:p.t||45,r2:1.3,t2:30};let mode=p.mode==='produit'?1:0;
  el.innerHTML=`<div class="wcard vz">${wseg('m',['z = r e^(iθ)','Produit z × w'],mode)}${rg('r','module r',.2,2.5,S.r,.1)}${rg('t','argument θ (°)',-180,180,S.t,5)}<div data-v="x">${rg('r2','module de w',.2,2,1.3,.1)}${rg('t2','argument de w (°)',-180,180,30,5)}</div><div data-v="g"></div><p class="wexp" data-v="e"></p></div>`;
  const draw=()=>{el.querySelector('[data-v="x"]').hidden=!mode;const g=gp({W:300,H:260,x0:-3,x1:3,y0:-2.6,y1:2.6});g.axes(1,1,1,1);
    let s='';const R=S.r,T=S.t*Math.PI/180,a=R*Math.cos(T),b=R*Math.sin(T);
    g.raw(`<circle cx="${g.X(0)}" cy="${g.Y(0)}" r="${g.X(1)-g.X(0)}" fill="none" stroke="var(--line)" stroke-dasharray="4 3"/>`);
    g.seg(a,0,a,b,'var(--t-c)',1.5,'4 3').seg(0,b,a,b,'var(--t-c)',1.5,'4 3');g.arrow(0,0,a,b,'var(--t-sq)').text(a,b,'z','var(--t-sq)','start',6,-6,13);
    let e=`<span class="m">z = ${dec(R,2)} e<sup>i·${num(S.t)}°</sup> = ${dec(a,3)} ${b<0?MINUS:'+'} ${dec(Math.abs(b),3)} i</span> : partie réelle r cos θ, partie imaginaire r sin θ (formule d’Euler).`;
    if(mode){const R2=S.r2,T2=S.t2*Math.PI/180,c=R2*Math.cos(T2),d=R2*Math.sin(T2),pr=R*R2,pt=T+T2;g.arrow(0,0,c,d,'var(--t-c)').text(c,d,'w','var(--t-c)','start',6,-6,13);
      g.arrow(0,0,pr*Math.cos(pt),pr*Math.sin(pt),'var(--t-x)').text(pr*Math.cos(pt),pr*Math.sin(pt),'zw','var(--t-x)','start',6,-6,13);
      e=`Multiplier par w, c’est <b>tourner de ${num(S.t2)}°</b> et <b>multiplier la longueur par ${dec(R2,2)}</b> : |zw| = ${dec(R,2)} × ${dec(R2,2)} = ${dec(pr,3)}, arg(zw) = ${num(S.t)}° + ${num(S.t2)}° = ${num(S.t+S.t2)}°.`}
    wout(el,'g',g.done('Plan complexe'));wout(el,'e',e)};
  ['r','t','r2','t2'].forEach(k=>onR(el,k,v=>{S[k]=v;draw()}));onSeg(el,'m',v=>{mode=v;draw()});draw()}

/* Registre : nom utilisable dans les cours (« @nom {…} ») → fonction. Les anciennes manipulations sont reprises sous un nom lisible. */
const VIZ={courbe:vCurve,etapes:vSteps,fractions:vFrac,pourcentages:vPct,droite:vLine,triangle:vTri,vecteurs:vVec,euler:vEuler,
  cercle:wCircle,tangente:wTan,variations:wVar,limite:wLim,riemann:wRiem,champ:wField,oscillateur:wOsc,parabole:wPar,racines:wRoots,
  logarithme:wLog,croissance:wGrow,balance:wBal,inequation:wIneq,puissances:wExp,developper:wDev,factoriser:wFac,'racine-carree':wRad,
  'nombre-i':wI,composition:wFn,intervalle:wInt,'valeur-absolue':wAbs,'inequation-graphique':wIneqG,complexe:wCplx,'reciproque-affine':wInv,
  taylor:wTaylor,'suite-recurrente':wCob,'volume-revolution':wRevol,'symboles':wSym};
