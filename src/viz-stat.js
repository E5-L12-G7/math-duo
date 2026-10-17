/* ---- Manipulations statistiques (STA001) : paramétrables depuis les cours « @nom {…} | consigne » ----
   histogramme, loi-discrete, loi-continue, test, nuage ; et les manipulations statistiques existantes
   (boite, position, dispersion, tlc, grands-nombres, intervalle-confiance, regression, arbre, bayes, pascal, galton). */
const sFact=n=>{let r=1;for(let i=2;i<=n;i++)r*=i;return r};
const sBinP=(n,p,k)=>Cnk(n,k)*p**k*(1-p)**(n-k);
const sPoiP=(l,k)=>Math.exp(-l)*l**k/sFact(k);
/** Quantile de la loi normale centrée réduite (bissection sur Phi) */
const sZq=q=>{let a=-8,b=8;for(let i=0;i<60;i++){const m=(a+b)/2;if(Phi(m)<q)a=m;else b=m}return(a+b)/2};
const sGauss=()=>{const u=Math.random()||1e-9,v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};

/* 1. Histogramme : données brutes, amplitude des classes réglable, moyenne et médiane ; ou classes données (amplitudes inégales → densité) */
function sHist(el,p={}){const data=p.donnees||[12,15,15,17,18,18,19,20,20,21,22,22,23,24,25,26,28,29,31,35,38,44];
  const cls=p.classes;let w=p.amplitude||5,dens=!!p.densite;
  const lo0=p.min!=null?p.min:Math.floor(Math.min(...data)/5)*5;
  el.innerHTML=`<div class="wcard vz">${cls?wseg('m',['Hauteur = effectif','Hauteur = densité'],dens?1:0):rg('w','Amplitude des classes',p.amin||2,p.amax||10,w,1)}
    <div data-v="g"></div><div class="vzout" data-v="o"></div>${lg([['var(--t-sq)','Moyenne'],['var(--t-x)','Médiane']])}</div>`;
  const draw=()=>{let C;
    if(cls)C=cls.map(([a,b,n])=>({a,b,n}));
    else{C=[];const hi=Math.max(...data);for(let a=lo0;a<=hi;a+=w)C.push({a,b:a+w,n:data.filter(x=>x>=a&&x<a+w).length})}
    const N=C.reduce((s,c)=>s+c.n,0),H=c=>dens&&cls?c.n/(c.b-c.a):c.n,top=Math.max(...C.map(H))*1.18||1;
    const x0=C[0].a,x1=C[C.length-1].b,g=gp({W:320,H:200,x0:x0-(x1-x0)*.04,x1:x1+(x1-x0)*.04,y0:-top*.12,y1:top,pd:10});
    C.forEach(c=>{g.rect(c.a,0,c.b,H(c),'var(--t-sq)',.28,'var(--t-sq)');if(c.n)g.text((c.a+c.b)/2,H(c),dens&&cls?dec(H(c),2):c.n,'var(--ink)','middle',0,-4,10)});
    g.seg(x0,0,x1,0,'var(--muted)',1.2);
    const step=cls?null:w;(cls?[...new Set(C.flatMap(c=>[c.a,c.b]))]:C.map(c=>c.a).concat(x1)).forEach(v=>g.text(v,0,num(v),'var(--muted)','middle',0,13,9,false));
    const mean=cls?C.reduce((s,c)=>s+c.n*(c.a+c.b)/2,0)/N:meanA(data);
    let med;if(cls){let cum=0;for(const c of C){if(cum+c.n>=N/2){med=c.a+(N/2-cum)/c.n*(c.b-c.a);break}cum+=c.n}}else med=medA(data);
    g.seg(mean,0,mean,top*.95,'var(--t-sq)',2.5).seg(med,0,med,top*.95,'var(--t-x)',2.5,'5 4');
    wout(el,'g',g.done('Histogramme'));
    const D=c=>c.n/(c.b-c.a),modal=C.reduce((m,c)=>D(c)>D(m)?c:m,C[0]);
    wout(el,'o',`<span>${N} valeurs, ${C.length} classes${step?` d’amplitude ${step}`:''}. Classe modale : [${num(modal.a)} ; ${num(modal.b)}[.</span>
      <span>Moyenne ${cls?'(centres des classes)':''} ≈ <b>${dec(mean,2)}</b> · médiane ≈ <b>${dec(med,2)}</b>${cls?'':` · écart-type ≈ <b>${dec(Math.sqrt(varA(data)),2)}</b>`}</span>
      ${cls&&!dens?'<span>Attention : avec des classes d’amplitudes différentes, la hauteur « effectif » trompe l’œil. Passe en densité.</span>':''}`)};
  if(cls)onSeg(el,'m',v=>{dens=!!v;draw()});else onR(el,'w',v=>{w=v;draw()});draw()}

/* 2. Loi discrète : binomiale, Poisson, ou comparaison binomiale / Poisson ; P(X = k) ou P(X ≤ k) surligné */
function sDisc(el,p={}){const mode=p.loi||'binomiale',S={n:p.n||10,p:p.p!=null?p.p:.3,l:p.lambda||3,k:p.k!=null?p.k:3};let cum=p.cumul?1:0;
  const sl=mode==='poisson'?rg('l','λ',.5,12,S.l,.5):rg('n','n',1,mode==='comparer'?100:60,S.n,1)+rg('p','p',mode==='comparer'?.01:.05,mode==='comparer'?.3:.95,S.p,mode==='comparer'?.01:.05);
  el.innerHTML=`<div class="wcard vz">${sl}${rg('k','k',0,30,S.k,1)}${wseg('c',['P(X = k)','P(X ≤ k)'],cum)}<div data-v="g"></div><div class="vzout" data-v="o"></div>
    ${mode==='comparer'?lg([['var(--t-sq)','Binomiale B(n ; p)'],['var(--t-c)','Poisson P(np)']]):''}</div>`;
  const draw=()=>{const lam=mode==='poisson'?S.l:S.n*S.p,P=mode==='poisson'?k=>sPoiP(S.l,k):k=>k<=S.n?sBinP(S.n,S.p,k):0;
    const E=mode==='poisson'?S.l:S.n*S.p,V=mode==='poisson'?S.l:S.n*S.p*(1-S.p),K=Math.max(8,Math.min(mode==='poisson'?Math.ceil(S.l+4*Math.sqrt(S.l)+2):S.n,mode==='comparer'?Math.ceil(lam+4*Math.sqrt(lam)+3):60));
    const ks=Array.from({length:K+1},(_,i)=>i),top=Math.max(...ks.map(P),...(mode==='comparer'?ks.map(k=>sPoiP(lam,k)):[0]))*1.15;
    const g=gp({W:320,H:200,x0:-.8,x1:K+.8,y0:-top*.1,y1:top,pd:10}),bw=mode==='comparer'?.2:.36;
    ks.forEach(k=>{const hl=cum?k<=S.k:k===S.k;g.rect(k-bw-(mode==='comparer'?.18:0),0,k+bw-(mode==='comparer'?.18:0),P(k),'var(--t-sq)',hl?.9:.3);
      if(mode==='comparer')g.rect(k-bw+.18,0,k+bw+.18,sPoiP(lam,k),'var(--t-c)',.85)});
    g.seg(-.8,0,K+.8,0,'var(--muted)',1.2);const st=K>20?5:K>10?2:1;ks.filter(k=>k%st===0).forEach(k=>g.text(k,0,k,'var(--muted)','middle',0,13,9,false));
    g.seg(E,0,E,top*.98,'var(--t-x)',2,'5 4');
    wout(el,'g',g.done('Diagramme en bâtons de la loi'));
    const pk=cum?ks.filter(k=>k<=S.k).reduce((s,k)=>s+P(k),0):P(S.k);
    wout(el,'o',`<span>${mode==='poisson'?`X suit la loi de Poisson de paramètre λ = ${num(S.l)}`:`X suit la loi binomiale B(${S.n} ; ${num(S.p)})`} : ${cum?`P(X ≤ ${S.k})`:`P(X = ${S.k})`} ≈ <b>${dec(pk,4)}</b></span>
      <span>Espérance E(X) = ${dec(E,3)} (pointillé vert) · variance V(X) = ${dec(V,3)} · écart-type ≈ ${dec(Math.sqrt(V),3)}</span>
      ${mode==='comparer'?`<span>Poisson de paramètre np = ${dec(lam,2)} : P(X ${cum?'≤':'='} ${S.k}) ≈ ${dec(cum?ks.filter(k=>k<=S.k).reduce((s,k)=>s+sPoiP(lam,k),0):sPoiP(lam,S.k),4)}. Plus n est grand et p petit, plus les deux lois se ressemblent.</span>`:''}`)};
  ['n','p','l'].forEach(k=>{if(el.querySelector(`[data-r="${k}"]`))onR(el,k,v=>{S[k]=v;draw()})});onR(el,'k',v=>{S.k=v;draw()});onSeg(el,'c',v=>{cum=v;draw()});draw()}

/* 3. Loi continue : normale, exponentielle, uniforme ; aire P(a ≤ X ≤ b) = probabilité */
function sCont(el,p={}){const mode=p.loi||'normale',S={m:p.mu!=null?p.mu:0,s:p.sigma||1,l:p.lambda||.5,u0:p.ua!=null?p.ua:0,u1:p.ub!=null?p.ub:4};
  const R=mode==='normale'?[S.m-4*S.s,S.m+4*S.s]:mode==='exponentielle'?[0,Math.max(8,6/S.l)]:[Math.min(S.u0,0)-1,S.u1+1];
  let a=p.a!=null?p.a:mode==='normale'?S.m-S.s:R[0]+(R[1]-R[0])*.2,b=p.b!=null?p.b:mode==='normale'?S.m+S.s:R[0]+(R[1]-R[0])*.5;
  const xr=p.x||(mode==='normale'&&p.curseurs!==false?[-8,8]:R),stp=(xr[1]-xr[0])>20?.1:.01;
  const par=mode==='normale'?(p.curseurs!==false?rg('m','μ',-3,3,S.m,.1)+rg('s','σ',.2,3,S.s,.05):''):mode==='exponentielle'?rg('l','λ',.1,2,S.l,.05):'';
  el.innerHTML=`<div class="wcard vz">${par}${rg('a','a',xr[0],xr[1],a,stp)}${rg('b','b',xr[0],xr[1],b,stp)}<div data-v="g"></div><div class="vzout" data-v="o"></div></div>`;
  const draw=()=>{const f=mode==='normale'?x=>Math.exp(-(((x-S.m)/S.s)**2)/2)/(S.s*Math.sqrt(2*Math.PI)):mode==='exponentielle'?x=>x<0?0:S.l*Math.exp(-S.l*x):x=>x>=S.u0&&x<=S.u1?1/(S.u1-S.u0):0;
    const F=mode==='normale'?x=>Phi((x-S.m)/S.s):mode==='exponentielle'?x=>x<0?0:1-Math.exp(-S.l*x):x=>Math.min(1,Math.max(0,(x-S.u0)/(S.u1-S.u0)));
    const lo=Math.min(a,b),hi=Math.max(a,b),top=(mode==='normale'?1/(Math.min(S.s,1)*Math.sqrt(2*Math.PI)):mode==='exponentielle'?Math.max(S.l,.5):1/(S.u1-S.u0))*1.2;
    const g=gp({W:320,H:200,x0:xr[0],x1:xr[1],y0:-top*.08,y1:top,pd:10,N:400});
    g.axes((xr[1]-xr[0])>10?2:1,top>1?.5:top>.4?.1:.05,(xr[1]-xr[0])>10?2:1,0);
    g.area(f,()=>0,lo,hi,'var(--t-sq)',.3).fn(f,'var(--t-sq)',2.6).seg(lo,0,lo,f(lo),'var(--t-sq)',1.5).seg(hi,0,hi,f(hi),'var(--t-sq)',1.5);
    if(mode==='normale')g.seg(S.m,0,S.m,f(S.m),'var(--t-x)',1.5,'4 4');
    wout(el,'g',g.done('Densité et aire entre a et b'));
    const pr=F(hi)-F(lo);
    const law=mode==='normale'?`X suit la loi normale N(${num(S.m)} ; ${num(+S.s.toFixed(2))}²)`:mode==='exponentielle'?`X suit la loi exponentielle de paramètre λ = ${num(+S.l.toFixed(2))}`:`X suit la loi uniforme sur [${num(S.u0)} ; ${num(S.u1)}]`;
    const E=mode==='normale'?S.m:mode==='exponentielle'?1/S.l:(S.u0+S.u1)/2,sd=mode==='normale'?S.s:mode==='exponentielle'?1/S.l:(S.u1-S.u0)/Math.sqrt(12);
    wout(el,'o',`<span>${law}.</span><span>P(${dec(lo,2)} ≤ X ≤ ${dec(hi,2)}) = aire bleue ≈ <b>${dec(pr,4)}</b></span>
      <span>E(X) = ${dec(E,3)} · écart-type σ = ${dec(sd,3)}${mode==='normale'?` · a et b à ${dec((lo-S.m)/S.s,2)} σ et ${dec((hi-S.m)/S.s,2)} σ de la moyenne`:''}</span>`)};
  ['m','s','l'].forEach(k=>{if(el.querySelector(`[data-r="${k}"]`))onR(el,k,v=>{S[k]=v;draw()},v=>num(+v.toFixed(2)))});
  onR(el,'a',v=>{a=v;draw()},v=>dec(v,2));onR(el,'b',v=>{b=v;draw()},v=>dec(v,2));draw()}

/* 4. Test d'hypothèse : statistique z observée, risque α, zone de rejet, p-valeur, décision */
function sTest(el,p={}){let z=p.z!=null?p.z:1.5,al=p.alpha||.05,side=p.cote==='droite'?1:p.cote==='gauche'?2:0;
  el.innerHTML=`<div class="wcard vz">${rg('z','z observé',-4,4,z,.01)}${rg('al','α (%)',1,20,al*100,1)}${wseg('s',['Bilatéral','Unilatéral à droite','Unilatéral à gauche'],side)}
    <div data-v="g"></div><div class="vzout" data-v="o"></div>${lg([['var(--bad)','Zone de rejet'],['var(--t-sq)','p-valeur']])}</div>`;
  const draw=()=>{const f=x=>Math.exp(-x*x/2)/Math.sqrt(2*Math.PI),g=gp({W:320,H:190,x0:-4,x1:4,y0:-.04,y1:.45,pd:10,N:400});g.axes(1,.1,1,0);
    const c=side===0?sZq(1-al/2):sZq(1-al);
    if(side!==1)g.area(f,()=>0,-4,side===0?-c:-c,'var(--bad)',.35);if(side!==2)g.area(f,()=>0,c,4,'var(--bad)',.35);
    const pv=side===0?2*(1-Phi(Math.abs(z))):side===1?1-Phi(z):Phi(z);
    if(side===0){g.area(f,()=>0,Math.abs(z),4,'var(--t-sq)',.45).area(f,()=>0,-4,-Math.abs(z),'var(--t-sq)',.45)}else if(side===1)g.area(f,()=>0,z,4,'var(--t-sq)',.45);else g.area(f,()=>0,-4,z,'var(--t-sq)',.45);
    g.fn(f,'var(--ink)',2).seg(z,0,z,.42,'var(--t-sq)',2.5).text(z,.42,'z',`var(--t-sq)`,'middle',0,-3);
    wout(el,'g',g.done('Loi normale centrée réduite sous H0, zone de rejet et p-valeur'));
    const rej=pv<al;
    wout(el,'o',`<span>Seuil${side===0?'s':''} critique${side===0?'s':''} : ${side===0?`± ${dec(c,3)}`:side===1?dec(c,3):dec(-c,3)} · p-valeur ≈ <b>${dec(pv,4)}</b></span>
      <span>${rej?`<b>On rejette H0</b> au risque ${num(+(al*100).toFixed(0))} % : z tombe dans la zone rouge (p-valeur < α).`:`<b>On ne rejette pas H0</b> au risque ${num(+(al*100).toFixed(0))} % : z reste hors de la zone rouge (p-valeur ≥ α). Cela ne prouve pas que H0 est vraie.`}</span>`)};
  onR(el,'z',v=>{z=v;draw()},v=>dec(v,2));onR(el,'al',v=>{al=v/100;draw()});onSeg(el,'s',v=>{side=v;draw()});draw()}

/* 5. Nuage de points : corrélation réglable, droite des moindres carrés, point aberrant */
function sNuage(el,p={}){let r=p.r!=null?p.r:.8,n=p.n||20,out=false,E,F;
  el.innerHTML=`<div class="wcard vz">${rg('r','Lien voulu',-1,1,r,.05)}${rg('n','Nombre de points',5,60,n,1)}
    <div class="wnav"><button class="btn ghost" data-k="new">Nouvel échantillon</button><button class="btn ghost" data-k="out" aria-pressed="false">Ajouter un point aberrant</button></div>
    <div data-v="g"></div><div class="vzout" data-v="o"></div></div>`;
  const nw=()=>{E=Array.from({length:60},sGauss);F=Array.from({length:60},sGauss);draw()};
  const draw=()=>{const xs=[],ys=[];for(let i=0;i<n;i++){const x=E[i],y=r*x+Math.sqrt(Math.max(0,1-r*r))*F[i];xs.push(5+1.6*x);ys.push(5+1.6*y)}
    if(out){xs.push(9.4);ys.push(r>=0?.6:9.4)}
    const xb=meanA(xs),yb=meanA(ys),vx=varA(xs),vy=varA(ys),cv=meanA(xs.map((x,i)=>x*ys[i]))-xb*yb,a=cv/vx,b=yb-a*xb,rr=cv/Math.sqrt(vx*vy);
    const g=gp({W:320,H:220,x0:0,x1:10,y0:0,y1:10,pd:10});g.axes(1,1,2,2);
    g.fn(x=>a*x+b,'var(--t-sq)',2.5);xs.forEach((x,i)=>g.dot(x,ys[i],out&&i===xs.length-1?'var(--bad)':'var(--t-c)',4.5));g.dot(xb,yb,'var(--ink)',6).text(xb,yb,'G','var(--ink)','start',8,-8);
    wout(el,'g',g.done('Nuage de points et droite de régression'));
    wout(el,'o',`<span>Coefficient de corrélation <b>r ≈ ${dec(rr,3)}</b> · r² ≈ ${dec(rr*rr,3)} (part de la variation de y « expliquée » par x)</span>
      <span>Droite des moindres carrés : <span class="m">ŷ = ${dec(a,3)}<i>x</i> ${b<0?'−':'+'} ${dec(Math.abs(b),3)}</span>, elle passe par le point moyen G(${dec(xb,2)} ; ${dec(yb,2)}).</span>
      ${out?'<span>Un seul point aberrant suffit à faire bouger r et la droite : regarde toujours le nuage avant de calculer.</span>':''}`)};
  onR(el,'r',v=>{r=v;draw()},v=>dec(v,2));onR(el,'n',v=>{n=v;draw()});el.querySelector('[data-k="new"]').onclick=()=>{sfx.tap();nw()};
  const ob=el.querySelector('[data-k="out"]');ob.onclick=()=>{out=!out;ob.setAttribute('aria-pressed',out);ob.textContent=out?'Retirer le point aberrant':'Ajouter un point aberrant';sfx.tap();draw()};nw()}

Object.assign(VIZ,{histogramme:sHist,'loi-discrete':sDisc,'loi-continue':sCont,test:sTest,nuage:sNuage,
  boite:wBox,position:wPos,dispersion:wSpread,tlc:wCLT,'grands-nombres':wLLN,'intervalle-confiance':wCI,regression:wReg,arbre:wTree,bayes:wBayes,pascal:wPascal,galton:wBin,'normale-simple':wNorm});
