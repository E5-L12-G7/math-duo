/* ---- Cours interactifs : une fiche par notion, avec une manipulation ---- */
const rg=(k,l,min,max,v,step=1)=>`<label class="rg"><span>${l}</span><input type="range" data-r="${k}" min="${min}" max="${max}" step="${step}" value="${v}"><output data-o="${k}">${num(v)}</output></label>`;
const onR=(el,k,fn,fmt=num)=>{const i=el.querySelector(`[data-r="${k}"]`);i.oninput=()=>{const v=+i.value;el.querySelector(`[data-o="${k}"]`).innerHTML=fmt(v);fn(v)}};
const sqH=x=>`<span class="sqrt"><span class="rad">√</span><span class="rc">${x}</span></span>`;
const fmt2=v=>num(Math.round(v*100)/100);
function wBal(el){
  const S=[['3(x-2)+4','x+6','','On part de l’équation de départ. Objectif : <i class="mi">x</i> seul d’un côté.'],
    ['3x-6+4','x+6','Développer','Le 3 multiplie les deux termes de la parenthèse : 3(<i>x</i> − 2) = 3<i>x</i> − 6.'],
    ['3x-2','x+6','Regrouper','On regroupe les nombres du même côté : −6 + 4 = −2.'],
    ['3x-x-2','6','Passer x à gauche','Le terme <i>x</i> change de côté et devient −<i>x</i>.'],
    ['2x-2','6','Regrouper','3<i>x</i> − <i>x</i> = 2<i>x</i>.'],
    ['2x','6+2','Passer −2 à droite','Le terme −2 change de côté et devient +2.'],
    ['2x','8','Regrouper','6 + 2 = 8.'],
    ['x','4','Diviser par 2','On divise les deux côtés par le coefficient de <i>x</i> : 8 ÷ 2 = 4.']];let i=0;
  const draw=()=>{const s=S[i];el.innerHTML=`<div class="wcard"><p class="wstep">Étape ${i+1} sur ${S.length}${s[2]?` · <b>${s[2]}</b>`:''}</p>
    <div class="wbal"><div class="weq">${M(s[0])} <span class="op m">=</span> ${M(s[1])}</div><div class="beam"></div><div class="fulc"></div></div>
    <p class="wexp">${s[3]}</p>
    <div class="wnav"><button class="btn ghost" data-k="p" ${i?'':'disabled'}>Précédent</button><button class="btn" data-k="n" ${i<S.length-1?'':'disabled'}>${i<S.length-1?'Étape suivante':'x = 4'}</button></div></div>`;
    el.querySelector('[data-k="p"]').onclick=()=>{i--;draw()};el.querySelector('[data-k="n"]').onclick=()=>{i++;draw()}};
  draw()}
function wIneq(el){let k=2;const a=2,b=5;
  el.innerHTML=`<div class="wcard"><p class="wres m">2 &lt; 5</p>${rg('k','Multiplier par',-3,3,k)}<div data-v="nl"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const A=a*k,B=b*k,X=v=>20+(v+16)/32*280;let s=`<svg viewBox="0 0 320 76" class="nl" role="img" aria-label="Droite graduée"><line x1="14" x2="306" y1="44" y2="44" stroke="var(--muted)" stroke-width="1.5"/>`;
    for(let v=-16;v<=16;v+=4)s+=`<line x1="${X(v)}" x2="${X(v)}" y1="39" y2="49" stroke="var(--muted)"/><text x="${X(v)}" y="66" font-size="10" text-anchor="middle" fill="var(--muted)">${num(v)}</text>`;
    const pt=(v,lab,col,dy)=>`<circle cx="${X(v)}" cy="44" r="7" fill="${col}" stroke="var(--surface)" stroke-width="2"/><text x="${X(v)}" y="${dy}" font-size="11" font-weight="700" text-anchor="middle" fill="var(--ink)">${lab}</text>`;
    s+=pt(A,`2×(${num(k)})`,'var(--t-sq)',A===B?14:22)+pt(B,`5×(${num(k)})`,'var(--t-x)',A===B?28:22)+'</svg>';
    el.querySelector('[data-v="nl"]').innerHTML=s;const sym=A<B?'&lt;':A>B?'&gt;':'=';
    el.querySelector('[data-v="t"]').innerHTML=k===0?'Multiplier par 0 donne 0 = 0 : on perd l’information, on ne le fait jamais.'
      :`On obtient <span class="m">${num(A)} ${sym} ${num(B)}</span>. ${k<0?'<b>Le sens s’est inversé</b> : multiplier par un négatif retourne la droite graduée.':'Le sens est conservé.'}`};
  onR(el,'k',v=>{k=v;draw()});draw()}
function wExp(el){let mode='prod',a=3,b=2;
  el.innerHTML=`<div class="wcard"><div class="seg">${[['prod','Produit'],['pow','Puissance'],['quot','Quotient']].map(([k,l])=>`<button data-m="${k}">${l}</button>`).join('')}</div>
    ${rg('a','a',1,5,a)}${rg('b','b',1,4,b)}<div class="wtiles" data-v="t"></div><p class="wres" data-v="r"></p></div>`;
  const xt=(c,n,cut=0)=>Array.from({length:n},(_,i)=>`<span class="xt ${c}${i<cut?' cut':''}"><i>x</i></span>`).join('');
  const draw=()=>{el.querySelectorAll('[data-m]').forEach(b2=>b2.classList.toggle('on',b2.dataset.m===mode));let t,r;
    if(mode==='prod'){t=`<span class="wgrp">${xt('A',a)}</span> · <span class="wgrp">${xt('B',b)}</span>`;r=`${M(`x^${a}*x^${b}`)} = ${M(`x^${a+b}`)} : ${a} + ${b} = ${a+b} facteurs.`}
    else if(mode==='pow'){t=Array.from({length:b},()=>`<span class="wgrp">${xt('A',a)}</span>`).join(' ');r=`${M(`(x^${a})^${b}`)} = ${M(`x^${a*b}`)} : ${b} groupes de ${a}, soit ${a*b} facteurs.`}
    else{const m=Math.min(a,b);t=`<div class="wfrac"><div>${xt('A',a,m)}</div><div>${xt('B',b,m)}</div></div>`;r=`${M(`x^${a}/x^${b}`)} = ${M(`x^${a-b}`)} : ${m} paire${m>1?'s':''} de <i>x</i> se simplifie${m>1?'nt':''}${a<b?`, il reste ${b-a} <i>x</i> au dénominateur`:''}.`}
    el.querySelector('[data-v="t"]').innerHTML=t;el.querySelector('[data-v="r"]').innerHTML=r};
  el.querySelectorAll('[data-m]').forEach(b2=>b2.onclick=()=>{mode=b2.dataset.m;draw()});
  onR(el,'a',v=>{a=v;draw()});onR(el,'b',v=>{b=v;draw()});draw()}
function wDev(el){let p=3,q=-2;
  el.innerHTML=`<div class="wcard">${rg('p','p',-6,6,p)}${rg('q','q',-6,6,q)}<p class="wres" data-v="e"></p><div class="area" data-v="g"></div><p class="wres" data-v="r"></p></div>`;
  const cell=(v,kind)=>{if(kind==='x2')return`<span class="x2">${M('x^2')}</span>`;const f=F(v);return`<span class="${kind}${v<0?' neg':''}">${v===0?'0':termI(kind==='x1'?'x':'c',f,true)}</span>`};
  const draw=()=>{el.querySelector('[data-v="e"]').innerHTML=M(`(x${sg(p)})(x${sg(q)})`);
    el.querySelector('[data-v="g"]').innerHTML=`<span class="h">×</span><span class="h m"><i>x</i></span><span class="h m">${num(q)}</span>
      <span class="h m"><i>x</i></span>${cell(0,'x2')}${cell(q,'x1')}<span class="h m">${num(p)}</span>${cell(p,'x1')}${cell(p*q,'c1')}`;
    el.querySelector('[data-v="r"]').innerHTML=`= ${M(poly([1,p+q,p*q]))}<br><small class="wexp">Les deux cases vertes s’additionnent : ${num(p)} + ${num(q)} = ${num(p+q)}.</small>`};
  onR(el,'p',v=>{p=v;draw()});onR(el,'q',v=>{q=v;draw()});draw()}
function wFac(el){let p,q2,b,c;
  const nw=()=>{do{p=nz(-7,7);q2=nz(-7,7)}while(p===q2&&Math.random()<.7);b=p+q2;c=p*q2;draw()};
  const draw=()=>{const pairs=[];for(let m=-Math.abs(c);m<=Math.abs(c);m++){if(!m||c%m)continue;const n=c/m;if(m<=n)pairs.push([m,n])}
    const pn=v=>v<0?`(${num(v)})`:num(v);
    el.innerHTML=`<div class="wcard"><p class="wres">${M(poly([1,b,c]))}</p><p class="wexp">Cherche deux nombres de produit <b>${num(c)}</b> et de somme <b>${num(b)}</b>. Touche une paire pour la tester.</p>
      <div class="pairs">${pairs.map(([m,n])=>`<button data-m="${m}" data-n="${n}"><span class="m">${pn(m)} × ${pn(n)}</span></button>`).join('')}</div><p class="wexp" data-v="fb"></p>
      <button class="btn ghost" data-k="new">Nouvel exemple</button></div>`;
    el.querySelectorAll('.pairs button').forEach(bt=>bt.onclick=()=>{const m=+bt.dataset.m,n=+bt.dataset.n,fb=el.querySelector('[data-v="fb"]');
      if(m+n===b){bt.classList.add('ok');fb.innerHTML=`Somme : ${num(m)} + ${num(n)} = ${num(b)}. C’est la bonne paire, donc ${M(poly([1,b,c]))} = ${M(`(x${sg(m)})(x${sg(n)})`)}.`}
      else{bt.classList.add('no');fb.innerHTML=`Somme : ${num(m)} + ${num(n)} = ${num(m+n)}, pas ${num(b)}. Essaie une autre paire.`}});
    el.querySelector('[data-k="new"]').onclick=nw};
  nw()}
function wPar(el){const AS=[-2,-1,-.5,.5,1,2];let ai=4,b=-2,c=-3;
  el.innerHTML=`<div class="wcard"><p class="wres" data-v="eq"></p>${rg('a','a',0,5,ai)}${rg('b','b',-6,6,b)}${rg('c','c',-6,6,c)}<div class="plot" data-v="p"></div><p class="wexp" data-v="i"></p></div>`;
  el.querySelector('[data-o="a"]').innerHTML=num(AS[ai]);
  const draw=()=>{const a=AS[ai],W=300,H=220,X=v=>(v+8)/16*W,Y=v=>H-(v+10)/20*H,D=b*b-4*a*c,h=-b/(2*a),k=c-b*b/(4*a);
    el.querySelector('[data-v="eq"]').innerHTML=`<span class="m"><i>y</i> = </span>${M(poly([a,b,c]))}`;
    let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Parabole">`;
    for(let v=-8;v<=8;v+=2)s+=`<line x1="${X(v)}" x2="${X(v)}" y1="0" y2="${H}" stroke="var(--grid)"/>`;
    for(let v=-10;v<=10;v+=2)s+=`<line x1="0" x2="${W}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--grid)"/>`;
    s+=`<line x1="0" x2="${W}" y1="${Y(0)}" y2="${Y(0)}" stroke="var(--muted)"/><line x1="${X(0)}" x2="${X(0)}" y1="0" y2="${H}" stroke="var(--muted)"/>`;
    let d='';for(let x=-8;x<=8.001;x+=.1){const y=a*x*x+b*x+c;d+=(d?'L':'M')+X(x).toFixed(1)+','+Math.max(-50,Math.min(H+50,Y(y))).toFixed(1)}
    s+=`<path d="${d}" fill="none" stroke="var(--t-sq)" stroke-width="2.5"/>`;
    const roots=D>0?[(-b-Math.sqrt(D))/(2*a),(-b+Math.sqrt(D))/(2*a)]:D===0?[h]:[];
    roots.forEach(r=>s+=`<circle cx="${X(r)}" cy="${Y(0)}" r="6" fill="var(--good)" stroke="var(--surface)" stroke-width="2"/>`);
    s+=`<circle cx="${X(h)}" cy="${Y(k)}" r="6" fill="var(--t-c)" stroke="var(--surface)" stroke-width="2"/></svg>`;
    el.querySelector('[data-v="p"]').innerHTML=s;
    el.querySelector('[data-v="i"]').innerHTML=`<b>Δ = b² − 4ac = ${fmt2(D)}</b> : ${D>0?`deux solutions, <span class="m"><i>x</i> = ${fmt2(Math.min(...roots))}</span> et <span class="m"><i>x</i> = ${fmt2(Math.max(...roots))}</span>`:D===0?`une solution double, <span class="m"><i>x</i> = ${fmt2(h)}</span>`:'aucune solution réelle, la courbe ne coupe pas l’axe'}.<br>Sommet (point jaune) : S(${fmt2(h)} ; ${fmt2(k)}).`};
  onR(el,'a',v=>{ai=v;draw()},v=>num(AS[v]));onR(el,'b',v=>{b=v;draw()});onR(el,'c',v=>{c=v;draw()});draw()}
function wRad(el){let n=72;
  el.innerHTML=`<div class="wcard">${rg('n','Nombre',2,150,n)}<p class="wexp">Carrés parfaits qui divisent ce nombre :</p><div class="sqs" data-v="s"></div><p class="wres" data-v="r"></p></div>`;
  const draw=()=>{let s=1;for(let i=2;i*i<=n;i++)if(n%(i*i)===0)s=i;const r=n/(s*s);
    el.querySelector('[data-v="s"]').innerHTML=[4,9,16,25,36,49,64,81,100,121,144].map(q=>`<span class="${n%q===0?(q===s*s?'best':'on'):''}">${q}</span>`).join('');
    el.querySelector('[data-v="r"]').innerHTML=`<span class="m">${s===1?`${sqH(n)} est déjà simplifiée`:r===1?`${sqH(n)} = ${s}`:`${sqH(n)} = ${sqH(`${s*s} × ${r}`)} = ${s}${sqH(r)}`}</span>`};
  onR(el,'n',v=>{n=v;draw()});draw()}
function wI(el){let n=1;const V=['1','<i>i</i>','−1','−<i>i</i>'];
  el.innerHTML=`<div class="wcard">${rg('n','Puissance n',0,12,n)}<div class="icirc" data-v="c"></div><p class="wres" data-v="r"></p><button class="btn ghost" data-k="m">Multiplier par i</button></div>`;
  const draw=()=>{const r=n%4,P=[[200,110],[110,20],[20,110],[110,200]];
    let s=`<svg viewBox="0 0 220 220" role="img" aria-label="Cycle des puissances de i"><circle cx="110" cy="110" r="90" fill="none" stroke="var(--line)" stroke-width="2"/>
      <line x1="110" y1="110" x2="${P[r][0]}" y2="${P[r][1]}" stroke="var(--t-sq)" stroke-width="3"/>`;
    P.forEach(([x,y],j)=>s+=`<circle cx="${x}" cy="${y}" r="${j===r?14:9}" fill="${j===r?'var(--t-sq)':'var(--surface)'}" stroke="var(--t-sq)" stroke-width="2"/>`);
    s+=`<text x="200" y="140" text-anchor="middle" font-size="13" fill="var(--ink)">1</text><text x="138" y="25" font-size="13" font-style="italic" fill="var(--ink)">i</text>
      <text x="20" y="140" text-anchor="middle" font-size="13" fill="var(--ink)">−1</text><text x="138" y="205" font-size="13" fill="var(--ink)">−i</text></svg>`;
    el.querySelector('[data-v="c"]').innerHTML=s;
    el.querySelector('[data-v="r"]').innerHTML=`<span class="m"><i>i</i><sup>${n}</sup> = <i>i</i><sup>${r}</sup> = ${V[r]}</span><br><small class="wexp">${n} = 4 × ${Math.floor(n/4)} + ${r} : seul le reste compte.</small>`};
  onR(el,'n',v=>{n=v;draw()});
  el.querySelector('[data-k="m"]').onclick=()=>{n=(n+1)%13;el.querySelector('[data-r="n"]').value=n;el.querySelector('[data-o="n"]').textContent=n;draw()};draw()}
function wLog(el){let b=2,k=3;
  el.innerHTML=`<div class="wcard"><div class="seg">${[2,3,10].map(v=>`<button data-b="${v}">Base ${v}</button>`).join('')}</div>${rg('k','Exposant',0,6,k)}<p class="wres" data-v="r"></p><p class="wexp" data-v="e"></p></div>`;
  const draw=()=>{const x=b**k;el.querySelectorAll('[data-b]').forEach(t=>t.classList.toggle('on',+t.dataset.b===b));
    el.querySelector('[data-v="r"]').innerHTML=`<span class="m">${b}<sup>${k}</sup> = ${x}</span> &nbsp;⟺&nbsp; ${LOG(b,x)} = ${k}`;
    el.querySelector('[data-v="e"]').innerHTML=k===0?`Tout nombre non nul élevé à la puissance 0 vaut 1, donc ${LOG(b,1)} = 0.`
      :`${Array(k).fill(b).join(' × ')} = ${x} : on multiplie ${k} fois par ${b}. Le logarithme répond à la question « combien de fois ? ».`};
  el.querySelectorAll('[data-b]').forEach(t=>t.onclick=()=>{b=+t.dataset.b;draw()});onR(el,'k',v=>{k=v;draw()});draw()}
function wFn(el){let x=2,fog=true;
  el.innerHTML=`<div class="wcard"><p class="wexp"><span class="m"><i>f</i>(<i>x</i>) = 2<i>x</i> + 1</span> et <span class="m"><i>g</i>(<i>x</i>) = <i>x</i><sup>2</sup></span></p>
    <div class="seg"><button data-o2="1"><i>f</i>(<i>g</i>(<i>x</i>))</button><button data-o2="0"><i>g</i>(<i>f</i>(<i>x</i>))</button></div>${rg('x','x',-3,3,x)}<div class="mach" data-v="m"></div><p class="wexp" data-v="e"></p></div>`;
  const f=v=>2*v+1,g=v=>v*v;
  const draw=()=>{el.querySelectorAll('[data-o2]').forEach(t=>t.classList.toggle('on',(t.dataset.o2==='1')===fog));
    const n1=fog?'g':'f',n2=fog?'f':'g',v1=fog?g(x):f(x),v2=fog?f(v1):g(v1);
    el.querySelector('[data-v="m"]').innerHTML=`<span class="mv">${num(x)}</span><span>→</span><span class="mbox">${n1}</span><span>→</span><span class="mv">${num(v1)}</span><span>→</span><span class="mbox">${n2}</span><span>→</span><span class="mv out">${num(v2)}</span>`;
    el.querySelector('[data-v="e"]').innerHTML=`On applique d’abord <i class="mi">${n1}</i> : <i>${n1}</i>(${num(x)}) = ${num(v1)}, puis <i class="mi">${n2}</i> : <i>${n2}</i>(${num(v1)}) = ${num(v2)}. En général, ${fog?`<span class="m"><i>f</i>(<i>g</i>(<i>x</i>)) = 2<i>x</i><sup>2</sup> + 1</span>`:`<span class="m"><i>g</i>(<i>f</i>(<i>x</i>)) = (2<i>x</i> + 1)<sup>2</sup></span>`}.`};
  el.querySelectorAll('[data-o2]').forEach(t=>t.onclick=()=>{fog=t.dataset.o2==='1';draw()});onR(el,'x',v=>{x=v;draw()});draw()}

/* Formalisme : associer symboles et sens */
function wSym(el){const ALL=[['∈','appartient à'],['∉','n’appartient pas à'],['⊂','est inclus dans'],['⇒','implique'],['⟺','équivaut à'],['∀','pour tout'],['∃','il existe'],['∅','l’ensemble vide'],['≠','est différent de'],['≈','est environ égal à'],['∪','union : « ou »'],['∩','intersection : « et »'],['ℝ','l’ensemble des réels'],['ℤ','les entiers relatifs']];
  let set,means,sel=null,msg='';
  const nw=()=>{set=shuffle([...ALL]).slice(0,5).map(([s0,m])=>({s:s0,m,ok:false}));means=shuffle(set.map(x=>x.m));sel=null;msg='';draw()};
  const draw=()=>{const done=set.filter(x=>x.ok).length;
    el.innerHTML=`<div class="wcard"><p class="wexp">Touche un symbole, puis sa signification.</p>
      <div class="match"><div class="mcol">${set.map((x,i)=>`<button class="mcard sym${x.ok?' ok':''}${sel===i?' sel':''}" data-s="${i}" ${x.ok?'disabled':''}>${x.s}</button>`).join('')}</div>
      <div class="mcol">${means.map(m=>{const ok=set.some(x=>x.ok&&x.m===m);return`<button class="mcard mean${ok?' ok':''}" data-m="${m}" ${ok?'disabled':''}>${m}</button>`}).join('')}</div></div>
      <p class="wexp" aria-live="polite"><b>${done} / ${set.length}</b> paires. ${done===set.length?'Bravo, tout est juste.':msg}</p>
      <button class="btn ghost" data-k="new">Nouvelle série</button></div>`;
    el.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{sel=+b.dataset.s;msg='';sfx.tap();draw()});
    el.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{if(sel===null){msg='Choisis d’abord un symbole.';draw();return}
      if(set[sel].m===b.dataset.m){set[sel].ok=true;msg='';sfx.ok()}else{msg=`Non : ce n’est pas le sens de ${set[sel].s}. Essaie encore.`;sfx.ko()}sel=null;draw()});
    el.querySelector('[data-k="new"]').onclick=nw};
  nw()}
/* Formalisme : construire un intervalle */
function wInt(el){let a=-2,b=5,lo='[',hi='[';
  el.innerHTML=`<div class="wcard">${rg('a','Borne a',-9,9,a)}${rg('b','Borne b',-9,9,b)}
    <div class="seg2"><span>À gauche</span><div class="seg">${[['[','[ inclus'],[']','] exclu'],['inf','−∞']].map(([k,l])=>`<button data-lo="${k}">${l}</button>`).join('')}</div></div>
    <div class="seg2"><span>À droite</span><div class="seg">${[[']','] inclus'],['[','[ exclu'],['inf','+∞']].map(([k,l])=>`<button data-hi="${k}">${l}</button>`).join('')}</div></div>
    <div data-v="nl"></div><p class="wres" data-v="r"></p></div>`;
  const draw=()=>{el.querySelectorAll('[data-lo]').forEach(t=>t.classList.toggle('on',t.dataset.lo===lo));el.querySelectorAll('[data-hi]').forEach(t=>t.classList.toggle('on',t.dataset.hi===hi));
    const r=el.querySelector('[data-v="r"]');
    if(lo!=='inf'&&hi!=='inf'&&a>=b){r.innerHTML='La borne de gauche doit être plus petite que celle de droite.';el.querySelector('[data-v="nl"]').innerHTML='';return}
    const X=v=>20+(v+10)/20*280,x1=lo==='inf'?8:X(a),x2=hi==='inf'?312:X(b);
    let s0=`<svg viewBox="0 0 320 70" class="nl" role="img" aria-label="Intervalle sur la droite graduée"><line x1="6" x2="314" y1="34" y2="34" stroke="var(--muted)" stroke-width="1.5"/>`;
    for(let v=-10;v<=10;v+=2)s0+=`<line x1="${X(v)}" x2="${X(v)}" y1="29" y2="39" stroke="var(--muted)"/><text x="${X(v)}" y="58" font-size="10" text-anchor="middle" fill="var(--muted)">${num(v)}</text>`;
    s0+=`<line x1="${x1}" x2="${x2}" y1="34" y2="34" stroke="var(--t-sq)" stroke-width="6" stroke-linecap="butt"/>`;
    if(lo==='inf')s0+=`<path d="M4 34l10-7v14z" fill="var(--t-sq)"/>`;else s0+=`<circle cx="${x1}" cy="34" r="7" fill="${lo==='['?'var(--t-sq)':'var(--surface)'}" stroke="var(--t-sq)" stroke-width="3"/>`;
    if(hi==='inf')s0+=`<path d="M316 34l-10-7v14z" fill="var(--t-sq)"/>`;else s0+=`<circle cx="${x2}" cy="34" r="7" fill="${hi===']'?'var(--t-sq)':'var(--surface)'}" stroke="var(--t-sq)" stroke-width="3"/>`;
    el.querySelector('[data-v="nl"]').innerHTML=s0+'</svg>';
    r.innerHTML=`<span class="m"><i>x</i> ∈ </span>${IV(lo,a,b,hi)} &nbsp;⟺&nbsp; ${INQ(lo,a,b,hi)}<br><small class="wexp">Point plein : borne incluse. Point creux : borne exclue.</small>`};
  el.querySelectorAll('[data-lo]').forEach(t=>t.onclick=()=>{lo=t.dataset.lo;draw()});el.querySelectorAll('[data-hi]').forEach(t=>t.onclick=()=>{hi=t.dataset.hi;draw()});
  onR(el,'a',v=>{a=v;draw()});onR(el,'b',v=>{b=v;draw()});draw()}
/* Formalisme : remettre une rédaction dans l'ordre */
function wRed(el){const LINES=['On résout l’équation 2(x − 3) = x + 1.','2(x − 3) = x + 1 ⟺ 2x − 6 = x + 1','⟺ 2x − x = 1 + 6','⟺ x = 7','Vérification : 2(7 − 3) = 8 et 7 + 1 = 8.','Conclusion : S = {7}.'];
  let pool,built,msg;
  const nw=()=>{pool=shuffle(LINES.map((_,i)=>i));built=[];msg='';draw()};
  const draw=()=>{const done=built.length===LINES.length;
    el.innerHTML=`<div class="wcard"><p class="wexp">Touche les lignes dans l’ordre pour reconstituer une rédaction complète.</p>
      <ol class="redac">${built.map(i=>`<li>${mx(LINES[i])}</li>`).join('')}${done?'':'<li class="next">…</li>'}</ol>
      ${done?'':`<div class="rpool">${pool.filter(i=>!built.includes(i)).map(i=>`<button data-l="${i}">${mx(LINES[i])}</button>`).join('')}</div>`}
      <p class="wexp" aria-live="polite">${done?'<b>Bravo.</b> On annonce ce qu’on fait, chaque ligne est équivalente à la précédente (⟺), on vérifie, puis on conclut avec l’ensemble des solutions.':msg}</p>
      <button class="btn ghost" data-k="new">${done?'Recommencer':'Mélanger à nouveau'}</button></div>`;
    el.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{const i=+b.dataset.l;if(i===built.length){built.push(i);msg='';sfx.tap()}else{msg='Pas encore : quelle ligne vient juste après ?';sfx.ko();b.classList.add('shake')}draw()});
    el.querySelector('[data-k="new"]').onclick=nw};
  nw()}

const COURSES=[
  /* ===== Chapitre 0 : le langage des maths ===== */
  {id:'f-not',ui:0,title:'Symboles et vocabulaire',sum:'Lire et écrire la langue des mathématiques.',skills:['lang.ens','lang.logic'],w:wSym,
   body:'<p>Les mathématiques ont leur propre langue : des symboles courts remplacent des phrases entières. Les lire correctement évite beaucoup d’erreurs, et les écrire correctement rend une solution claire pour tout le monde.</p><p>Commence par associer les symboles à leur sens.</p>',
   parts:[['Les ensembles de nombres',`<p>On range les nombres dans des « boîtes » emboîtées : chaque ensemble contient le précédent.</p>
     <div class="nest"><div class="n4"><b>ℝ</b> réels : tous les nombres de la droite graduée, comme ${mx('√2')} ou π
       <div class="n3"><b>ℚ</b> rationnels : les quotients d’entiers, comme ${mx(fr(2,3))} ou −0,5
       <div class="n2"><b>ℤ</b> entiers relatifs : …, −2, −1, 0, 1, 2, …
       <div class="n1"><b>ℕ</b> entiers naturels : 0, 1, 2, 3, …</div></div></div></div></div>
     <p>On écrit ${mx('ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ')} : « ℕ est inclus dans ℤ, qui est inclus dans ℚ… ». Le chapitre sur les complexes ajoute un ensemble encore plus grand, ℂ.</p>`],
    ['Appartenance ∈ et inclusion ⊂',`<p><b>∈</b> relie un <b>nombre</b> à un ensemble : ${mx('3 ∈ ℕ')} se lit « 3 appartient à ℕ », ${mx('−2 ∉ ℕ')} « −2 n’appartient pas à ℕ ».</p>
     <p><b>⊂</b> relie deux <b>ensembles</b> : ${mx('ℕ ⊂ ℤ')} se lit « ℕ est inclus dans ℤ ». On n’écrit jamais « 3 ⊂ ℕ ».</p>`],
    ['Les quantificateurs ∀ et ∃',`<p><b>∀</b> se lit « pour tout » : ${mx('∀ x ∈ ℝ, x<sup>2</sup> ≥ 0')} signifie « pour tout réel x, x² est positif ou nul ». C’est vrai.</p>
     <p><b>∃</b> se lit « il existe » : ${mx('∃ x ∈ ℝ, x<sup>2</sup> = 4')} signifie « il existe au moins un réel dont le carré vaut 4 ». C’est vrai (2 et −2 conviennent).</p>
     <p>Pour prouver qu’une phrase « pour tout » est fausse, un seul <b>contre-exemple</b> suffit.</p>`],
    ['Implication ⇒ et équivalence ⟺',`<p>${mx('A ⇒ B')} : « si A est vrai, alors B est vrai ». Exemple : ${mx('x = 2 ⇒ x<sup>2</sup> = 4')}.</p>
     <p>La <b>réciproque</b> ${mx('B ⇒ A')} n’est pas toujours vraie : ${mx('x<sup>2</sup> = 4')} n’entraîne pas ${mx('x = 2')}, car x peut valoir −2.</p>
     <p>${mx('A ⟺ B')} : les deux sens sont vrais, A et B disent la même chose. Quand on résout une équation, chaque étape doit être une <b>équivalence</b> : c’est pour cela qu’on fait des opérations réversibles (ajouter, soustraire, multiplier ou diviser par un nombre non nul).</p>`],
    ['Les mots de la rédaction',`<table class="ctable"><tbody>
     <tr><td><b>donc</b>, <b>d’où</b></td><td>introduit une conséquence</td></tr>
     <tr><td><b>car</b>, <b>puisque</b></td><td>donne une justification</td></tr>
     <tr><td><b>soit</b>, <b>on pose</b></td><td>introduit une notation : « soit x le prix »</td></tr>
     <tr><td><b>on suppose que</b></td><td>fixe une hypothèse</td></tr>
     <tr><td><b>par conséquent</b></td><td>conclut un raisonnement</td></tr></tbody></table>`]],
   ex:[['Traduire en symboles : « Pour tout réel x, x² + 1 est strictement positif. »',[['∀ x ∈ ℝ','« Pour tout réel x »'],['∀ x ∈ ℝ, x<sup>2</sup> + 1 &gt; 0','« strictement positif » se traduit par &gt; 0.']]],
       ['La phrase « x² = 9 ⟺ x = 3 » est-elle juste ?',[['x = 3 ⇒ x<sup>2</sup> = 9','Ce sens est vrai.'],['x<sup>2</sup> = 9 ⇒ x = 3 ?','Faux : x = −3 donne aussi 9.'],['x<sup>2</sup> = 9 ⟺ (x = 3 ou x = −3)','Voici l’équivalence correcte.']]]],
   traps:['Confondre ∈ (un nombre dans un ensemble) et ⊂ (un ensemble dans un autre).','Écrire ⟺ alors qu’un seul sens est vrai.','Écrire une chaîne d’égalités fausse, comme « 3x = 12 = 4 » : 12 n’est pas égal à 4.','Croire qu’un exemple suffit à prouver une phrase « pour tout ».'],
   keys:['<span class="m">ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</span>.','∈ pour un élément, ⊂ pour un ensemble.','∀ « pour tout », ∃ « il existe ».','⇒ va dans un seul sens, ⟺ dans les deux.','Un contre-exemple suffit à réfuter un « pour tout ».'],
   quiz:[{q:'Que vaut l’affirmation « −4 ∈ ℕ » ?',o:['Fausse','Vraie'],a:0,why:'ℕ ne contient que les entiers positifs ou nuls. −4 est dans ℤ.'},
         {q:'« x = 3 ⇒ x² = 9 » est vraie. Sa réciproque « x² = 9 ⇒ x = 3 » l’est-elle ?',o:['Non','Oui'],a:0,why:'x = −3 est un contre-exemple : (−3)² = 9.'},
         {q:'Comment lire « ∃ x ∈ ℤ, x + 5 = 2 » ?',o:['Il existe un entier x tel que x + 5 = 2','Pour tout entier x, x + 5 = 2','x + 5 = 2 implique que x est entier'],a:0,why:'∃ se lit « il existe ». Ici c’est vrai : x = −3.'}]},
  {id:'f-int',ui:0,title:'Intervalles et inégalités',sum:'Écrire une infinité de solutions en une ligne.',skills:['lang.int','lang.int2'],w:wInt,
   body:'<p>Les solutions d’une inéquation forment souvent une infinité de nombres. On ne peut pas les énumérer : on les décrit par un <b>intervalle</b>, c’est-à-dire un morceau de la droite graduée.</p><p>Construis un intervalle : choisis les bornes et le type de crochet.</p>',
   parts:[['Lire un crochet',`<p>Le crochet est <b>tourné vers le nombre</b> quand celui-ci est <b>inclus</b>, et <b>tourné vers l’extérieur</b> quand il est <b>exclu</b>.</p>
     <div class="tscroll"><table class="ctable"><thead><tr><th>Inégalité</th><th>Intervalle</th><th>Lecture</th></tr></thead><tbody>
     <tr><td>${mx('2 ≤ x ≤ 5')}</td><td>${mx('[2 ; 5]')}</td><td>2 et 5 inclus</td></tr>
     <tr><td>${mx('2 &lt; x &lt; 5')}</td><td>${mx(']2 ; 5[')}</td><td>2 et 5 exclus</td></tr>
     <tr><td>${mx('2 ≤ x &lt; 5')}</td><td>${mx('[2 ; 5[')}</td><td>2 inclus, 5 exclu</td></tr>
     <tr><td>${mx('x ≥ 2')}</td><td>${mx('[2 ; +∞[')}</td><td>de 2 à l’infini</td></tr>
     <tr><td>${mx('x &lt; 5')}</td><td>${mx(']−∞ ; 5[')}</td><td>tout ce qui est avant 5</td></tr></tbody></table></div>
     <p>L’infini n’est pas un nombre qu’on atteint : son crochet est <b>toujours ouvert</b>.</p>`],
    ['Réunion ∪ et intersection ∩',`<p>${mx('∪')} (« union ») correspond à <b>ou</b> : ${mx('x ≤ −1 ou x ≥ 3')} s’écrit ${mx(']−∞ ; −1] ∪ [3 ; +∞[')}.</p>
     <p>${mx('∩')} (« intersection ») correspond à <b>et</b> : ${mx('[0 ; 5] ∩ [3 ; 8] = [3 ; 5]')}, la partie commune.</p>`],
    ['Notation française',`<p>En France, on sépare les bornes par un point-virgule et on utilise des crochets inversés pour exclure : ${mx(']2 ; 5[')}. Dans les livres anglophones, on écrit souvent (2, 5) : c’est le même intervalle.</p>`]],
   ex:[['Écrire « −2 &lt; x ≤ 5 » sous forme d’intervalle.',[['−2 exclu','Inégalité stricte : crochet ouvert, tourné vers l’extérieur : ]'],['5 inclus','Inégalité large : crochet fermé, tourné vers 5 : ]'],['x ∈ ]−2 ; 5]','']]],
       ['Résoudre 3 − x &gt; 1 et écrire les solutions.',[['−x &gt; −2','On retire 3 des deux côtés.'],['x &lt; 2','On multiplie par −1 : le sens s’inverse.'],['S = ]−∞ ; 2[','2 est exclu car l’inégalité est stricte.']]]],
   traps:['Fermer le crochet du côté de l’infini : [3 ; +∞] n’a pas de sens.','Écrire les bornes dans le désordre : [5 ; 2] est vide.','Oublier qu’une inégalité stricte exclut la borne.','Utiliser une virgule entre les bornes, ce qui se confond avec la virgule décimale.'],
   keys:['Crochet vers le nombre : inclus. Crochet vers l’extérieur : exclu.','≤ et ≥ donnent des crochets fermés, &lt; et &gt; des crochets ouverts.','Du côté de ±∞, le crochet est toujours ouvert.','∪ veut dire « ou », ∩ veut dire « et ».'],
   quiz:[{q:'« x ≥ 4 » s’écrit :',o:['[4 ; +∞[',']4 ; +∞[','[4 ; +∞]'],a:0,m:1,why:'4 est inclus (≥) et l’infini est toujours exclu.'},
         {q:'x ∈ ]−1 ; 3]. Le nombre 3 est-il solution ?',o:['Oui','Non'],a:0,why:'Le crochet ] est tourné vers 3 : 3 est inclus.'},
         {q:'Quelle écriture correspond à « x &lt; 0 ou x &gt; 2 » ?',o:[']−∞ ; 0[ ∪ ]2 ; +∞[',']0 ; 2[',']−∞ ; 0[ ∩ ]2 ; +∞['],a:0,m:1,why:'« ou » se traduit par la réunion ∪.'}]},
  {id:'f-red',ui:0,title:'Rédiger une solution',sum:'Annoncer, enchaîner, vérifier, conclure.',skills:['lang.sol'],w:wRed,
   body:'<p>Une bonne réponse ne se limite pas au résultat : elle montre comment on y arrive. Une rédaction claire permet de retrouver ses erreurs et convainc celui qui la lit.</p><p>Remets dans l’ordre les lignes d’une rédaction modèle.</p>',
   parts:[['La structure d’une rédaction',`<ol><li><b>Annoncer</b> : « On résout l’équation… » ou « Soit x le nombre cherché. »</li>
     <li><b>Enchaîner</b> les étapes, une par ligne, reliées par ⟺ (ou par « donc »).</li>
     <li><b>Vérifier</b> en remplaçant x par la valeur trouvée.</li>
     <li><b>Conclure</b> par une phrase ou l’ensemble des solutions S.</li></ol>`],
    ['Écrire l’ensemble des solutions',`<div class="tscroll"><table class="ctable"><tbody>
     <tr><td>Une seule solution</td><td>${mx('S = {4}')}</td></tr>
     <tr><td>Plusieurs solutions</td><td>${mx('S = {−3 ; 3}')}</td></tr>
     <tr><td>Aucune solution</td><td>${mx('S = ∅')}</td></tr>
     <tr><td>Tous les réels</td><td>${mx('S = ℝ')}</td></tr>
     <tr><td>Une inéquation</td><td>${mx('S = [2 ; +∞[')}</td></tr></tbody></table></div>
     <p>Les accolades { } listent des valeurs isolées. Les crochets [ ] désignent un intervalle : tous les nombres entre les bornes.</p>`],
    ['Le signe « = » a un sens précis',`<p>On n’écrit ${mx('a = b = c')} que si les trois quantités sont réellement égales. Pour passer d’une équation à la suivante, on change de ligne ou on utilise ⟺, jamais =.</p>`]],
   ex:[['Rédiger la résolution de x² − 16 = 0.',[['On résout l’équation x<sup>2</sup> − 16 = 0.','On annonce.'],['x<sup>2</sup> − 16 = 0 ⟺ (x − 4)(x + 4) = 0','Différence de deux carrés.'],['⟺ x − 4 = 0 ou x + 4 = 0','Un produit est nul si l’un des facteurs est nul.'],['⟺ x = 4 ou x = −4',''],['S = {−4 ; 4}','On conclut avec les deux solutions.']]]],
   traps:['Donner « x = 4 » sans conclure, ou oublier une solution (x² = 16 en a deux).','Écrire « S = 4 » au lieu de S = {4}.','Confondre S = ∅ (aucune solution) et S = {0} (la solution 0).','Relier deux équations différentes par le signe =.'],
   keys:['Annoncer, enchaîner, vérifier, conclure.','{ } pour des valeurs, [ ] pour un intervalle.','∅ : aucune solution. ℝ : tous les réels.','Entre deux équations : ⟺ ou un retour à la ligne, jamais =.'],
   quiz:[{q:'L’équation x² = −1 n’a aucune solution réelle. On écrit :',o:['S = ∅','S = {0}','S = 0'],a:0,m:1,why:'∅ est l’ensemble vide : il ne contient aucun nombre.'},
         {q:'Quelle écriture est correcte ?',o:['3x = 12 ⟺ x = 4','3x = 12 = 4'],a:0,m:1,why:'12 n’est pas égal à 4 : on relie deux équations par ⟺.'}]},

  /* ===== Chapitre 1 ===== */
  {id:'f-bal',ui:1,title:'Équilibrer une équation',sum:'Ce qu’on fait d’un côté, on le fait de l’autre.',skills:['lin.simple','lin.both','lin.paren','lin.frac'],w:wBal,
   body:'<p>Une équation est une balance en équilibre : ses deux membres ont la même valeur. Pour trouver x, on garde l’équilibre en faisant <b>la même opération des deux côtés</b>.</p><p>Avance dans l’exemple étape par étape.</p>',
   parts:[['Vocabulaire',`<p>Dans ${mx('3x + 5 = 11')} : ${mx('3x + 5')} est le <b>membre de gauche</b>, 11 le <b>membre de droite</b>, x l’<b>inconnue</b> et 3 le <b>coefficient</b> de x.</p>
     <p>Une <b>solution</b> est une valeur de x qui rend l’égalité vraie. Ici, 2 est solution car ${mx('3 × 2 + 5 = 11')}. <b>Résoudre</b>, c’est trouver toutes les solutions.</p>`],
    ['La méthode en quatre étapes',`<ol><li><b>Développer</b> les parenthèses.</li><li><b>Réduire</b> chaque membre en regroupant les termes semblables.</li>
     <li><b>Rassembler</b> les termes en x d’un côté et les nombres de l’autre.</li><li><b>Diviser</b> par le coefficient de x.</li></ol><p>Puis <b>vérifier</b> en remplaçant x par la valeur trouvée.</p>`],
    ['Pourquoi un terme change de signe ?',`<p>« Passer +5 de l’autre côté » est un raccourci. En réalité, on <b>soustrait 5 aux deux membres</b> :</p>
     <p class="cmath">${mx('3x + 5 − 5 = 11 − 5')}</p><p>À gauche, +5 − 5 s’annule. À droite, il reste −5 : le 5 semble avoir « traversé » en changeant de signe.</p>`]],
   ex:[['Résoudre 5x − 7 = 2x + 8.',[['5x − 2x − 7 = 8','On retire 2x des deux côtés.'],['3x − 7 = 8','5x − 2x = 3x.'],['3x = 15','On ajoute 7 des deux côtés.'],['x = 5','On divise par 3.'],['5 × 5 − 7 = 18 et 2 × 5 + 8 = 18','Vérification : les deux membres valent 18.']]],
       ['Résoudre '+fr(2,3)+'x + 1 = 5.',[[fr(2,3)+'x = 4','On retire 1.'],['x = 4 × '+fr(3,2),'Diviser par 2/3 revient à multiplier par son inverse 3/2.'],['x = 6','']]]],
   traps:['Oublier de multiplier le second terme de la parenthèse : 3(x − 2) n’est pas 3x − 2.','Diviser un seul terme : de 2x + 4 = 10, on ne peut pas écrire x + 4 = 5.','Se tromper de signe quand un terme change de côté.','Ne pas vérifier la solution trouvée.'],
   keys:['Développer d’abord : <span class="m">a(<i>x</i> + b) = a<i>x</i> + ab</span>.','Un terme qui change de côté change de signe.','Regrouper les termes semblables : <span class="m">3<i>x</i> − <i>x</i> = 2<i>x</i></span>.','Diviser à la fin par le coefficient de <i class="mi">x</i>, puis vérifier.'],
   quiz:[{q:'Dans 4x − 3 = 9, que fait-on en premier ?',o:['Ajouter 3 aux deux membres','Diviser 9 par 4','Retirer 4 aux deux membres'],a:0,why:'On isole d’abord le terme en x : 4x = 12, puis on divise par 4.'},
         {q:'Quelle est la solution de 2(x + 1) = 10 ?',o:['x = 4','x = 9/2','x = 5'],a:0,m:1,why:'2x + 2 = 10, donc 2x = 8 et x = 4.'}]},
  {id:'f-ineq',ui:1,title:'Les inéquations',sum:'Quand le sens de l’inégalité s’inverse.',skills:['ineq.lin'],w:wIneq,
   body:'<p>Une inéquation compare deux expressions avec &lt;, ≤, &gt; ou ≥. On la résout comme une équation, avec <b>une règle en plus</b>.</p><p>Fais varier le multiplicateur : avec un nombre négatif, les deux points échangent leur ordre.</p>',
   parts:[['Vocabulaire',`<div class="tscroll"><table class="ctable"><tbody>
     <tr><td>${mx('&lt;')}</td><td>strictement inférieur à</td></tr><tr><td>${mx('≤')}</td><td>inférieur ou égal à</td></tr>
     <tr><td>${mx('&gt;')}</td><td>strictement supérieur à</td></tr><tr><td>${mx('≥')}</td><td>supérieur ou égal à</td></tr></tbody></table></div>
     <p>Les solutions forment en général un intervalle : voir le cours « Intervalles et inégalités » du chapitre 0.</p>`],
    ['Ce qui garde le sens, ce qui l’inverse',`<ul><li>Ajouter ou soustraire le même nombre aux deux membres : <b>le sens est conservé</b>.</li>
     <li>Multiplier ou diviser par un nombre <b>positif</b> : <b>le sens est conservé</b>.</li>
     <li>Multiplier ou diviser par un nombre <b>négatif</b> : <b>le sens s’inverse</b>.</li></ul>`],
    ['Pourquoi le sens s’inverse ?',`<p>${mx('2 &lt; 5')}, mais ${mx('−2 &gt; −5')}. Multiplier par −1 revient à prendre le symétrique par rapport à 0 sur la droite graduée : ce qui était à gauche passe à droite, donc l’ordre s’inverse.</p>`]],
   ex:[['Résoudre −3x + 4 ≤ 10.',[['−3x ≤ 6','On retire 4 des deux côtés : le sens ne change pas.'],['x ≥ −2','On divise par −3, un nombre négatif : ≤ devient ≥.'],['S = [−2 ; +∞[','−2 est inclus.']]],
       ['Résoudre 2x − 1 &gt; 5x + 8.',[['2x − 5x &gt; 8 + 1','Les x à gauche, les nombres à droite.'],['−3x &gt; 9',''],['x &lt; −3','Division par −3 : &gt; devient &lt;.'],['S = ]−∞ ; −3[','−3 est exclu (inégalité stricte).']]]],
   traps:['Oublier d’inverser le sens en divisant par un négatif.','Inverser le sens en ajoutant ou en soustrayant : c’est inutile.','Fermer le crochet alors que l’inégalité est stricte.'],
   keys:['Ajouter ou retirer un terme des deux côtés ne change pas le sens.','Multiplier ou diviser par un nombre <b>positif</b> garde le sens.','Multiplier ou diviser par un nombre <b>négatif</b> inverse le sens : &lt; devient &gt;.','La solution est un ensemble de valeurs, par exemple <span class="m"><i>x</i> ≥ 3</span>.'],
   quiz:[{q:'On divise les deux membres de −2x &lt; 8 par −2. On obtient :',o:['x &gt; −4','x &lt; −4','x &gt; 4'],a:0,m:1,why:'On divise par un négatif : le sens s’inverse, et 8 ÷ (−2) = −4.'},
         {q:'Faut-il inverser le sens pour passer de x − 5 ≥ 1 à x ≥ 6 ?',o:['Non','Oui'],a:0,why:'On ajoute 5 aux deux membres : une addition ne change jamais le sens.'}]},

  /* ===== Chapitre 2 ===== */
  {id:'f-exp',ui:2,title:'Les règles des puissances',sum:'Compter les facteurs pour retrouver chaque règle.',skills:['exp.prod','exp.pow','exp.quot','exp.neg','exp.mix','exp.coef'],w:wExp,
   body:'<p>Une puissance compte des facteurs : <span class="m"><i>x</i><sup>3</sup> = <i>x</i> · <i>x</i> · <i>x</i></span>. Compte les tuiles pour retrouver chaque règle au lieu de l’apprendre par cœur.</p>',
   parts:[['Définition',`<p>Pour un entier n ≥ 1, ${mx('x<sup>n</sup>')} est le produit de n facteurs égaux à x. Dans ${mx('x<sup>n</sup>')}, x est la <b>base</b> et n l’<b>exposant</b>.</p>
     <p>Par convention ${mx('x<sup>1</sup> = x')} et ${mx('x<sup>0</sup> = 1')} (pour x ≠ 0). Pourquoi 1 ? Parce que ${mx('x<sup>3</sup> ÷ x<sup>3</sup> = 1')}, et la règle du quotient donne ${mx('x<sup>3 − 3</sup> = x<sup>0</sup>')}.</p>`],
    ['Exposants négatifs',`<p>${mx('x<sup>2</sup> ÷ x<sup>5</sup>')} : trois x restent au dénominateur, donc le résultat vaut ${mx(fr(1,'x<sup>3</sup>'))}. La règle du quotient donne ${mx('x<sup>2 − 5</sup> = x<sup>−3</sup>')}.</p>
     <p>D’où ${mx('x<sup>−n</sup> = '+fr(1,'x<sup>n</sup>'))}. Un exposant négatif ne rend pas le nombre négatif : ${mx('2<sup>−1</sup> = 0,5')}.</p>`],
    ['Méthode pour simplifier',`<ol><li>Traiter les parenthèses : ${mx('(kx<sup>a</sup>)<sup>b</sup> = k<sup>b</sup>x<sup>ab</sup>')}.</li><li>Regrouper les coefficients d’un côté, les puissances de x de l’autre.</li><li>Additionner les exposants des produits, soustraire ceux des quotients.</li></ol>`]],
   ex:[['Simplifier (2x³)² · x⁻⁴.',[['2<sup>2</sup> · (x<sup>3</sup>)<sup>2</sup> · x<sup>−4</sup>','La puissance s’applique au coefficient et à x.'],['4x<sup>6</sup> · x<sup>−4</sup>','2² = 4 et 3 × 2 = 6.'],['4x<sup>2</sup>','6 + (−4) = 2.']]],
       ['Simplifier x⁵ · x² ÷ x⁹.',[['x<sup>7</sup> ÷ x<sup>9</sup>','5 + 2 = 7.'],['x<sup>−2</sup>','7 − 9 = −2.'],[fr(1,'x<sup>2</sup>'),'Un exposant négatif correspond à un inverse.']]]],
   traps:['x² · x³ n’est pas x⁶ : on additionne les exposants, x⁵.','(x²)³ n’est pas x⁵ : on multiplie, x⁶.','(2x)² n’est pas 2x² : c’est 4x².','x⁰ vaut 1, pas 0.'],
   keys:['Produit : <span class="m"><i>x</i><sup>a</sup> · <i>x</i><sup>b</sup> = <i>x</i><sup>a+b</sup></span>.','Puissance de puissance : <span class="m">(<i>x</i><sup>a</sup>)<sup>b</sup> = <i>x</i><sup>ab</sup></span>.','Quotient : <span class="m"><i>x</i><sup>a</sup> ÷ <i>x</i><sup>b</sup> = <i>x</i><sup>a−b</sup></span>.','<span class="m"><i>x</i><sup>0</sup> = 1</span> et <span class="m"><i>x</i><sup>−n</sup> = 1 ⁄ <i>x</i><sup>n</sup></span>.','<span class="m">(k<i>x</i><sup>a</sup>)<sup>b</sup> = k<sup>b</sup><i>x</i><sup>ab</sup></span>.'],
   quiz:[{q:'x⁴ · x³ = ?',o:['x<sup>7</sup>','x<sup>12</sup>','2x<sup>7</sup>'],a:0,m:1,why:'Même base : on additionne les exposants, 4 + 3 = 7.'},
         {q:'(3x²)² = ?',o:['9x<sup>4</sup>','3x<sup>4</sup>','6x<sup>4</sup>'],a:0,m:1,why:'3² = 9 et 2 × 2 = 4.'},
         {q:'5⁰ = ?',o:['1','0','5'],a:0,m:1,why:'Tout nombre non nul à la puissance 0 vaut 1.'}]},

  /* ===== Chapitre 3 ===== */
  {id:'f-dev',ui:3,title:'Développer avec le modèle des aires',sum:'Chaque terme multiplie chaque terme.',skills:['dev.prod','dev.sq','dev.coef'],w:wDev,
   body:'<p>Développer, c’est transformer un produit en somme. Développer <span class="m">(<i>x</i> + p)(<i>x</i> + q)</span>, c’est calculer l’aire d’un rectangle découpé en quatre morceaux.</p>',
   parts:[['Distributivité simple',`<p>${mx('k(a + b) = ka + kb')} : le facteur k multiplie <b>chaque</b> terme de la parenthèse. Avec un signe moins : ${mx('−(x − 2) = −x + 2')}.</p>`],
    ['Double distributivité',`<p>${mx('(a + b)(c + d) = ac + ad + bc + bd')} : chaque terme du premier facteur multiplie chaque terme du second, soit <b>quatre produits</b>. On <b>réduit</b> ensuite en regroupant les termes de même degré.</p>`],
    ['Les identités remarquables',`<p>Ce sont des développements qui reviennent si souvent qu’on les connaît par cœur :</p>
     <ul><li>${mx('(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup>')}</li><li>${mx('(a − b)<sup>2</sup> = a<sup>2</sup> − 2ab + b<sup>2</sup>')}</li><li>${mx('(a + b)(a − b) = a<sup>2</sup> − b<sup>2</sup>')}</li></ul>
     <p>Le terme ${mx('2ab')} vient des deux rectangles du modèle des aires : ab et ba.</p>`]],
   ex:[['Développer et réduire (2x − 3)(x + 4).',[['2x · x + 2x · 4 − 3 · x − 3 · 4','Les quatre produits.'],['2x<sup>2</sup> + 8x − 3x − 12',''],['2x<sup>2</sup> + 5x − 12','8x − 3x = 5x.']]],
       ['Développer (x − 5)².',[['x<sup>2</sup> − 2 · x · 5 + 5<sup>2</sup>','Identité (a − b)² avec a = x et b = 5.'],['x<sup>2</sup> − 10x + 25','']]]],
   traps:['(x + 5)² n’est pas x² + 25 : il manque 10x.','Oublier le signe : −3 × 4 = −12.','Ne multiplier que le premier terme de la parenthèse.'],
   keys:['<span class="m">(<i>x</i> + p)(<i>x</i> + q) = <i>x</i><sup>2</sup> + (p + q)<i>x</i> + pq</span>.','<span class="m">(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup></span>.','<span class="m">(a − b)<sup>2</sup> = a<sup>2</sup> − 2ab + b<sup>2</sup></span>.','<span class="m">(a + b)(a − b) = a<sup>2</sup> − b<sup>2</sup></span>.'],
   quiz:[{q:'(x + 3)² = ?',o:['x<sup>2</sup> + 6x + 9','x<sup>2</sup> + 9','x<sup>2</sup> + 3x + 9'],a:0,m:1,why:'2 × x × 3 = 6x.'},
         {q:'−2(x − 4) = ?',o:['−2x + 8','−2x − 8','−2x − 4'],a:0,m:1,why:'−2 × (−4) = +8.'}]},
  {id:'f-fac',ui:3,title:'Factoriser un trinôme',sum:'Trouver deux nombres : un produit, une somme.',skills:['fac.tri','fac.diff','fac.coef'],w:wFac,
   body:'<p>Factoriser, c’est faire le chemin inverse du développement : transformer une somme en produit. C’est l’outil clé pour résoudre une équation du second degré.</p>',
   parts:[['Étape 1 : chercher un facteur commun',`<p>Toujours en premier : ${mx('3x<sup>2</sup> + 6x = 3x(x + 2)')}. On met en facteur ce qui apparaît dans tous les termes.</p>`],
    ['Étape 2 : le trinôme x² + bx + c',`<p>On cherche deux nombres p et q tels que ${mx('p × q = c')} et ${mx('p + q = b')}. Alors ${mx('x<sup>2</sup> + bx + c = (x + p)(x + q)')}.</p>
     <p>Astuce : si c est positif, p et q ont le même signe (celui de b). Si c est négatif, ils sont de signes contraires.</p>`],
    ['Étape 3 : reconnaître une identité',`<p>${mx('a<sup>2</sup> − b<sup>2</sup> = (a + b)(a − b)')} et ${mx('a<sup>2</sup> + 2ab + b<sup>2</sup> = (a + b)<sup>2</sup>')}.</p>`],
    ['Le lien avec les solutions',`<p>Si ${mx('x<sup>2</sup> + bx + c = (x − r)(x − s)')}, alors les solutions de l’équation = 0 sont r et s, car un produit est nul si l’un de ses facteurs est nul.</p>`]],
   ex:[['Factoriser x² − x − 12.',[['p × q = −12 et p + q = −1','On cherche deux nombres.'],['(1 ; −12), (2 ; −6), (3 ; −4)…','Produit négatif : signes contraires.'],['3 + (−4) = −1','C’est la bonne paire.'],['(x + 3)(x − 4)','Vérification : x² − 4x + 3x − 12 = x² − x − 12.']]],
       ['Factoriser 4x² − 25.',[['(2x)<sup>2</sup> − 5<sup>2</sup>','On reconnaît deux carrés.'],['(2x + 5)(2x − 5)','a² − b² = (a + b)(a − b).']]]],
   traps:['Oublier de chercher d’abord un facteur commun.','Se tromper de signe : vérifie toujours en redéveloppant.','x² + 25 ne se factorise pas en (x + 5)(x − 5), qui vaut x² − 25.'],
   keys:['Si c &gt; 0, les deux nombres ont le même signe que b.','Si c &lt; 0, ils sont de signes contraires.','Différence de deux carrés : <span class="m">a<sup>2</sup> − b<sup>2</sup> = (a + b)(a − b)</span>.','Vérifie toujours en redéveloppant.'],
   quiz:[{q:'x² + 7x + 10 = ?',o:['(x + 2)(x + 5)','(x + 3)(x + 4)','(x − 2)(x − 5)'],a:0,m:1,why:'2 × 5 = 10 et 2 + 5 = 7.'},
         {q:'x² − 49 = ?',o:['(x − 7)(x + 7)','(x − 7)<sup>2</sup>','(x − 49)(x + 1)'],a:0,m:1,why:'Différence de deux carrés : x² − 7².'}]},

  /* ===== Chapitre 4 ===== */
  {id:'f-par',ui:4,title:'La parabole et le discriminant',sum:'Voir les solutions sur la courbe.',skills:['q.roots','q.delta','q.count','q.vertex'],w:wPar,
   body:'<p>La courbe de <span class="m"><i>y</i> = a<i>x</i><sup>2</sup> + b<i>x</i> + c</span> est une parabole. Les solutions de l’équation « = 0 » sont les points où elle coupe l’axe horizontal (en vert). Le discriminant Δ dit combien il y en a.</p>',
   parts:[['Trois formes pour un même trinôme',`<ul><li><b>Développée</b> : ${mx('2x<sup>2</sup> − 4x − 6')}, pour lire a, b, c.</li><li><b>Factorisée</b> : ${mx('2(x + 1)(x − 3)')}, pour lire les solutions −1 et 3.</li><li><b>Canonique</b> : ${mx('2(x − 1)<sup>2</sup> − 8')}, pour lire le sommet S(1 ; −8).</li></ul>`],
    ['Le discriminant',`<p>${mx('Δ = b<sup>2</sup> − 4ac')}.</p><ul><li>Δ &gt; 0 : deux solutions ${mx('x = '+fr('−b − √Δ','2a'))} et ${mx('x = '+fr('−b + √Δ','2a'))}.</li><li>Δ = 0 : une solution double ${mx('x = '+fr('−b','2a'))}.</li><li>Δ &lt; 0 : aucune solution réelle, la parabole ne coupe pas l’axe.</li></ul>`],
    ['Le sommet et l’orientation',`<p>Le sommet a pour abscisse ${mx('h = '+fr('−b','2a'))}, et pour ordonnée k = y(h). Si a &gt; 0, la parabole est tournée vers le haut et le sommet est un minimum. Si a &lt; 0, elle est tournée vers le bas et le sommet est un maximum.</p>`],
    ['Méthode pour résoudre ax² + bx + c = 0',`<ol><li>Si une factorisation est évidente (facteur commun, identité), l’utiliser.</li><li>Sinon, identifier a, b, c avec leurs signes.</li><li>Calculer Δ, puis les solutions selon son signe.</li><li>Conclure avec S.</li></ol>`]],
   ex:[['Résoudre 2x² − 3x − 2 = 0.',[['a = 2, b = −3, c = −2','On identifie les coefficients avec leur signe.'],['Δ = (−3)<sup>2</sup> − 4 × 2 × (−2) = 9 + 16 = 25','Attention aux parenthèses autour des négatifs.'],['x = '+fr('3 − 5',4)+' = −'+fr(1,2)+' ou x = '+fr('3 + 5',4)+' = 2','Δ &gt; 0 : deux solutions, √25 = 5.'],['S = {−'+fr(1,2)+' ; 2}','']]],
       ['Trouver le sommet de y = x² + 6x + 5.',[['h = '+fr('−6','2 × 1')+' = −3',''],['k = (−3)<sup>2</sup> + 6 × (−3) + 5 = −4','On remplace x par −3.'],['S(−3 ; −4)','a &gt; 0 : c’est un minimum.']]]],
   traps:['Oublier le signe de b : pour x² − 5x, b = −5.','Écrire −3² au lieu de (−3)² : le premier vaut −9, le second 9.','Diviser par 2 au lieu de 2a dans la formule.'],
   keys:['<span class="m">Δ = b<sup>2</sup> − 4ac</span>.','Δ &gt; 0 : deux solutions. Δ = 0 : une. Δ &lt; 0 : aucune solution réelle.','Solutions : <span class="m"><i>x</i> = (−b ± √Δ) ⁄ 2a</span>.','Sommet : <span class="m">h = −b ⁄ 2a</span>, puis k = <i>y</i>(h).'],
   quiz:[{q:'Pour x² + 2x + 5 = 0, Δ vaut :',o:['−16','24','16'],a:0,m:1,why:'Δ = 4 − 20 = −16 : aucune solution réelle.'},
         {q:'Si a &lt; 0, la parabole est tournée :',o:['vers le bas','vers le haut'],a:0,why:'Le coefficient de x² négatif « retourne » la courbe.'}]},

  /* ===== Chapitre 5 ===== */
  {id:'f-rad',ui:5,title:'Simplifier une racine carrée',sum:'Sortir le plus grand carré parfait.',skills:['rad.simp'],w:wRad,
   body:'<p>Pour simplifier une racine carrée, on cherche le plus grand carré parfait qui divise le nombre, puis on le sort de la racine.</p>',
   parts:[['Définition',`<p>Pour a ≥ 0, ${mx('√a')} est le nombre <b>positif</b> dont le carré vaut a. Ainsi ${mx('√9 = 3')} et non −3, même si (−3)² = 9.</p>`],
    ['Règles de calcul',`<ul><li>${mx('√(ab) = √a × √b')} pour a, b ≥ 0.</li><li>${mx('√('+fr('a','b')+') = '+fr('√a','√b'))} pour b &gt; 0.</li><li>${mx('a√c + b√c = (a + b)√c')} : on additionne les racines identiques comme des termes semblables.</li></ul>
     <p>Mais ${mx('√(a + b)')} n’est <b>pas</b> ${mx('√a + √b')}.</p>`]],
   ex:[['Simplifier √72.',[['72 = 36 × 2','36 est le plus grand carré qui divise 72.'],['√72 = √36 × √2',''],['= 6√2','']]],
       ['Calculer √50 + √18.',[['5√2 + 3√2','√50 = √25 × √2 et √18 = √9 × √2.'],['8√2','Même racine : on additionne les coefficients.']]]],
   traps:['√(9 + 16) = √25 = 5, et non 3 + 4 = 7.','S’arrêter trop tôt : √72 = 2√18 n’est pas simplifié au maximum.','Additionner des racines différentes : √2 + √3 ne se simplifie pas.'],
   keys:['<span class="m">√(ab) = √a × √b</span> pour a, b positifs.','<span class="m">√(a<sup>2</sup>b) = a√b</span>.','Carrés parfaits utiles : 4, 9, 16, 25, 36, 49, 64, 81, 100.'],
   quiz:[{q:'√48 = ?',o:['4√3','2√12','16√3'],a:0,m:1,why:'48 = 16 × 3 et √16 = 4. 2√12 est juste mais pas complètement simplifié.'},
         {q:'√(25 + 144) = ?',o:['13','17'],a:0,m:1,why:'25 + 144 = 169 et √169 = 13.'}]},
  {id:'f-i',ui:5,title:'Le nombre i',sum:'Un quart de tour à chaque multiplication.',skills:['i.pow','c.mul','c.add'],w:wI,
   body:'<p>Le nombre <i class="mi">i</i> est défini par <span class="m"><i>i</i><sup>2</sup> = −1</span>. Multiplier par <i class="mi">i</i> fait tourner d’un quart de tour : les puissances de <i class="mi">i</i> reviennent tous les 4.</p>',
   parts:[['Pourquoi inventer i ?',`<p>L’équation ${mx('x<sup>2</sup> = −1')} n’a pas de solution réelle, car un carré n’est jamais négatif. On crée un nouveau nombre, <i class="mi">i</i>, dont le carré vaut −1. Les nombres ${mx('a + b<i>i</i>')} forment l’ensemble ℂ des <b>complexes</b>, qui contient ℝ.</p>`],
    ['Forme algébrique',`<p>Dans ${mx('z = 3 − 2<i>i</i>')} : 3 est la <b>partie réelle</b>, −2 la <b>partie imaginaire</b>. Deux complexes sont égaux si leurs parties réelles et imaginaires sont égales.</p>`],
    ['Opérations',`<ul><li><b>Somme</b> : on additionne séparément ${mx('(a + b<i>i</i>) + (c + d<i>i</i>) = (a + c) + (b + d)<i>i</i>')}.</li>
     <li><b>Produit</b> : on développe, puis on remplace ${mx('<i>i</i><sup>2</sup>')} par −1.</li>
     <li><b>Conjugué</b> de ${mx('a + b<i>i</i>')} : ${mx('a − b<i>i</i>')}. Leur produit vaut ${mx('a<sup>2</sup> + b<sup>2</sup>')}, un réel.</li></ul>`],
    ['Lien avec le second degré',`<p>Quand Δ &lt; 0, l’équation a deux solutions complexes : ${mx('x = '+fr('−b ± <i>i</i>√(−Δ)','2a'))}.</p>`]],
   ex:[['Calculer (2 + 3i)(1 − 4i).',[['2 − 8<i>i</i> + 3<i>i</i> − 12<i>i</i><sup>2</sup>','On développe comme d’habitude.'],['2 − 5<i>i</i> + 12','<i>i</i>² = −1, donc −12<i>i</i>² = +12.'],['14 − 5<i>i</i>','']]],
       ['Résoudre x² + 4 = 0.',[['x<sup>2</sup> = −4',''],['x = 2<i>i</i> ou x = −2<i>i</i>','(2<i>i</i>)² = 4<i>i</i>² = −4.']]]],
   traps:['Écrire i² = 1 au lieu de −1.','Mélanger parties réelles et imaginaires en additionnant.','Calculer i<sup>n</sup> sans utiliser le reste de la division par 4.'],
   keys:['<span class="m"><i>i</i><sup>1</sup> = <i>i</i>, <i>i</i><sup>2</sup> = −1, <i>i</i><sup>3</sup> = −<i>i</i>, <i>i</i><sup>4</sup> = 1</span>.','Somme : on additionne séparément les parties réelles et imaginaires.','Produit : <span class="m">(a + b<i>i</i>)(c + d<i>i</i>) = (ac − bd) + (ad + bc)<i>i</i></span>.'],
   quiz:[{q:'i² = ?',o:['−1','1','<i>i</i>'],a:0,m:1,why:'C’est la définition de i.'},
         {q:'(1 + i) + (2 − 3i) = ?',o:['3 − 2<i>i</i>','3 + 4<i>i</i>','−2<i>i</i>'],a:0,m:1,why:'1 + 2 = 3 et 1 − 3 = −2.'}]},

  /* ===== Chapitre 6 ===== */
  {id:'f-log',ui:6,title:'Le logarithme',sum:'Combien de fois faut-il multiplier ?',skills:['log.eval','log.solve','exp.eq','log.sum','log.diff'],w:wLog,
   body:'<p>Le logarithme répond à la question : « à quelle puissance faut-il élever la base pour obtenir ce nombre ? » C’est l’opération inverse de la puissance.</p>',
   parts:[['Définition',`<p>Pour b &gt; 0, b ≠ 1 et x &gt; 0 : ${mx('log<sub>b</sub>(x) = k ⟺ b<sup>k</sup> = x')}.</p>
     <p>Exemple : ${mx('log<sub>2</sub>(8) = 3')} car ${mx('2<sup>3</sup> = 8')}. Le logarithme n’existe que pour des nombres strictement positifs.</p>
     <p>Valeurs à connaître : ${mx('log<sub>b</sub>(1) = 0')}, ${mx('log<sub>b</sub>(b) = 1')}, ${mx('log<sub>b</sub>(b<sup>k</sup>) = k')}. Sur la calculatrice, « log » est en base 10 et « ln » en base e ≈ 2,718.</p>`],
    ['Propriétés',`<p>Elles viennent des règles des puissances : multiplier des puissances revient à additionner leurs exposants.</p>
     <ul><li>${mx('log(ab) = log(a) + log(b)')}</li><li>${mx('log('+fr('a','b')+') = log(a) − log(b)')}</li><li>${mx('log(a<sup>n</sup>) = n log(a)')}</li></ul>`],
    ['Résoudre une équation exponentielle',`<ol><li>Si possible, écrire les deux membres comme puissances de la même base, puis égaler les exposants.</li><li>Sinon, appliquer le logarithme aux deux membres et utiliser ${mx('log(a<sup>n</sup>) = n log(a)')}.</li></ol>`]],
   ex:[['Calculer log₂(8) + log₂(4).',[['log<sub>2</sub>(8 × 4) = log<sub>2</sub>(32)','La somme des logs est le log du produit.'],['= 5','2⁵ = 32.']]],
       ['Résoudre 3^(x − 1) = 81.',[['3<sup>x − 1</sup> = 3<sup>4</sup>','81 = 3⁴.'],['x − 1 = 4','Même base : on égale les exposants.'],['x = 5','']]],
       ['Résoudre 2^x = 10.',[['log(2<sup>x</sup>) = log(10)','On applique log aux deux membres.'],['x log(2) = 1','log(aⁿ) = n log(a) et log(10) = 1.'],['x = '+fr(1,'log(2)')+' ≈ 3,32','']]]],
   traps:['log(a + b) n’est pas log(a) + log(b).','log(a) ÷ log(b) n’est pas log(a ÷ b) : c’est log(a) − log(b) qui vaut log(a ÷ b).','Chercher le logarithme d’un nombre négatif ou nul : il n’existe pas.'],
   keys:['<span class="m">log<sub>b</sub>(<i>x</i>) = k ⟺ b<sup>k</sup> = <i>x</i></span>.','<span class="m">log(a) + log(b) = log(ab)</span>.','<span class="m">log(a) − log(b) = log(a ⁄ b)</span>.','<span class="m">log(a<sup>n</sup>) = n log(a)</span>.','Pour <span class="m">b<sup><i>x</i>+m</sup> = b<sup>n</sup></span>, on égale les exposants : <i>x</i> + m = n.'],
   quiz:[{q:'log₃(27) = ?',o:['3','9',fr(1,3)],a:0,m:1,why:'3³ = 27.'},
         {q:'log(5) + log(2) = ?',o:['log(10)','log(7)','log(5) × log(2)'],a:0,m:1,why:'La somme des logs est le log du produit : 5 × 2 = 10, donc cela vaut 1.'}]},

  /* ===== Chapitre 7 ===== */
  {id:'f-fn',ui:7,title:'Composer et inverser des fonctions',sum:'Brancher deux machines à la suite.',skills:['f.comp','f.inv','f.eval'],w:wFn,
   body:'<p>Une fonction est une machine : on entre un nombre, elle en ressort un autre. Composer, c’est brancher deux machines à la suite. L’ordre compte.</p>',
   parts:[['Notation et vocabulaire',`<p>${mx('f : x ↦ 2x + 1')} se lit « f associe à x le nombre 2x + 1 ». On écrit aussi ${mx('f(x) = 2x + 1')}.</p>
     <p>Si ${mx('f(3) = 7')}, 7 est l’<b>image</b> de 3, et 3 est un <b>antécédent</b> de 7. L’<b>ensemble de définition</b> contient les valeurs de x autorisées : on exclut celles qui annulent un dénominateur ou rendent négatif le nombre sous une racine.</p>`],
    ['La composition',`<p>${mx('(f ∘ g)(x) = f(g(x))')} : on applique d’abord g, puis f. En général ${mx('f(g(x)) ≠ g(f(x))')}.</p>`],
    ['La fonction réciproque',`<p>${mx('f<sup>−1</sup>')} « défait » ce que fait f : si ${mx('f(3) = 7')}, alors ${mx('f<sup>−1</sup>(7) = 3')}. Méthode :</p>
     <ol><li>Poser ${mx('y = f(x)')}.</li><li>Isoler x en fonction de y.</li><li>Échanger les lettres x et y.</li></ol><p>Les courbes de f et ${mx('f<sup>−1</sup>')} sont symétriques par rapport à la droite ${mx('y = x')}.</p>`]],
   ex:[['Avec f(x) = 3x − 1 et g(x) = x² + 2, calculer f(g(x)) et g(f(x)).',[['f(g(x)) = 3(x<sup>2</sup> + 2) − 1','On remplace x par g(x) dans f.'],['= 3x<sup>2</sup> + 5',''],['g(f(x)) = (3x − 1)<sup>2</sup> + 2','On remplace x par f(x) dans g.'],['= 9x<sup>2</sup> − 6x + 3','Les deux résultats diffèrent : l’ordre compte.']]],
       ['Trouver la réciproque de f(x) = (x + 4) ÷ 2.',[['y = '+fr('x + 4',2),''],['2y = x + 4','On isole x.'],['x = 2y − 4',''],['f<sup>−1</sup>(x) = 2x − 4','On échange les lettres.']]]],
   traps:['Confondre f(g(x)) avec le produit f(x) × g(x).','Calculer f(−2) pour f(x) = x² sans parenthèses : (−2)² = 4, pas −4.','Confondre f<sup>−1</sup>(x) et 1 ÷ f(x).'],
   keys:['<i class="mi">f</i>(<i class="mi">g</i>(<i class="mi">x</i>)) : on applique <i class="mi">g</i> d’abord, puis <i class="mi">f</i>.','Réciproque : on pose <i class="mi">y</i> = <i class="mi">f</i>(<i class="mi">x</i>), on isole <i class="mi">x</i>, puis on échange <i class="mi">x</i> et <i class="mi">y</i>.','Image de a : on remplace chaque <i class="mi">x</i> par a, entre parenthèses.'],
   quiz:[{q:'Si f(x) = x², f(−3) = ?',o:['9','−9','−6'],a:0,m:1,why:'(−3)² = 9.'},
         {q:'f(x) = x + 5. f⁻¹(x) = ?',o:['x − 5',fr(1,'x + 5'),'5 − x'],a:0,m:1,why:'f ajoute 5, donc f⁻¹ retire 5.'}]},
];
