/* ---- Saisie avec clavier mathématique : mêmes touches que la calculatrice (page 123 et page f(x)) ---- */
const DISP={'*':'·','/':'÷','-':MINUS,'.':',','sqrt(':'√(','x':'<i class="mi">x</i>','π':'π','e':'e',';':' ; ','%':' %',
  'asin(':'sin<sup>−1</sup>(','acos(':'cos<sup>−1</sup>(','atan(':'tan<sup>−1</sup>(','sinh(':'sh(','cosh(':'ch(','tanh(':'th(','cbrt(':'∛(','abs(':'abs('};
function supMask(tk){const m=new Array(tk.length).fill(0);let i=0;
  const mark=j=>{while(tk[j]==='-'){m[j]=1;j++}if(j>=tk.length)return j;const t=tk[j];
    if(/^[0-9.]$/.test(t)){while(j<tk.length&&/^[0-9.]$/.test(tk[j])){m[j]=1;j++}}
    else if(t==='x'||t==='π'||t==='e'){m[j]=1;j++}
    else if(isOpen(t)){let d=0;do{if(isOpen(tk[j]))d++;else if(tk[j]===')')d--;m[j]=1;j++}while(j<tk.length&&d>0)}
    return j};
  while(i<tk.length){if(tk[i]==='^'){m[i]=2;i=mark(i+1)}else i++}return m}
const KPAGES=[[['7'],['8'],['9'],['(','('],[')',')'],
    ['4'],['5'],['6'],['*','×'],['/','÷'],
    ['1'],['2'],['3'],['+','+'],['-',MINUS],
    ['0'],['.',','],['x','<i class="mi">x</i>','v'],['x2','<i class="mi">x</i><sup>2</sup>','v'],['^','a<sup>□</sup>'],
    ['sqrt(','√'],['π','π'],['e','e'],['ln(','ln','sm'],['EE','×10<sup>n</sup>','xs']],
  [['sin(','sin','sm'],['cos(','cos','sm'],['tan(','tan','sm'],['ln(','ln','sm'],['log(','log','sm'],
    ['asin(','sin<sup>−1</sup>','sm'],['acos(','cos<sup>−1</sup>','sm'],['atan(','tan<sup>−1</sup>','sm'],['exp(','e<sup>x</sup>','sm'],['p10','10<sup>x</sup>','sm'],
    ['sinh(','sh','sm'],['cosh(','ch','sm'],['tanh(','th','sm'],['cbrt(','∛'],['abs(','|x|','sm'],
    ['!','n!','sm'],['C(','C(n ; k)','xs'],['A(','A(n ; k)','xs'],[';',';'],['inv','1/x','sm'],
    ['π','π'],['e','e'],['%','%'],['sqrt(','√'],['^','a<sup>□</sup>']]];
const KARIA={L:'Curseur à gauche',R:'Curseur à droite',B:'Effacer',x2:'x au carré','^':'Exposant','sqrt(':'Racine carrée',π:'pi',EE:'Fois 10 puissance',p10:'10 puissance',inv:'Inverse',
  '!':'Factorielle','C(':'Combinaisons C(n ; k)','A(':'Arrangements A(n ; k)',';':'Point-virgule, sépare n et k','%':'Pourcentage','asin(':'arcsinus','acos(':'arccosinus','atan(':'arctangente',
  'sinh(':'sinus hyperbolique','cosh(':'cosinus hyperbolique','tanh(':'tangente hyperbolique','abs(':'valeur absolue','cbrt(':'racine cubique','log(':'logarithme décimal','ln(':'logarithme népérien','exp(':'exponentielle'};
let KPAGE=0;
function mInput(q){
  const F=q.fields.map(f=>({...f,tk:[],c:0}));let act=0;
  $('#work').innerHTML=`<div class="fields">${F.map((f,i)=>`<div><div class="field"><label for="b${i}">${f.label}</label><div class="box" id="b${i}" data-f="${i}" tabindex="0" role="textbox" aria-label="Réponse ${i+1}"></div></div>${f.kind==='expr'?`<div class="pv" id="pv${i}"></div>`:''}</div>`).join('')}</div>`;
  $('#foot').innerHTML=checkBtn()+`<div class="kbar"><div class="seg cpg" role="tablist">${['123','f(x)'].map((l,i)=>`<button role="tab" data-kp="${i}">${l}</button>`).join('')}</div>
    <button class="cmode" id="kmode" aria-label="Unité d’angle pour les réponses numériques" title="Unité d’angle (réponses numériques)"></button>
    <span class="kcur"><button class="key fn" data-k="L" aria-label="${KARIA.L}"><span>${I.l}</span></button><button class="key fn" data-k="R" aria-label="${KARIA.R}"><span>${I.r}</span></button><button class="key fn" data-k="B" aria-label="${KARIA.B}"><span>${I.bs}</span></button></span></div>
    <div class="keys" id="keys"></div>`;
  const ck=$('#check'),msg=$('#msg');
  const vname=f=>f.v?`<i class="mi">${f.v}</i>`:DISP.x;
  function drawBox(i){const f=F[i],tk=f.tk,m=supMask(tk),on=i===act,car=s=>`<span class="caret${s?' sup':''}"></span>`;let h='';
    for(let j=0;j<tk.length;j++){if(on&&f.c===j)h+=car(m[j-1]===1&&m[j]===1);
      if(tk[j]==='^'){const empty=j===tk.length-1||m[j+1]!==1;h+=`<span class="tk sup" data-i="${j}">${empty?'<span class="phb"></span>':''}</span>`;continue}
      h+=`<span class="tk${m[j]===1?' sup':''}" data-i="${j}">${tk[j]==='x'?vname(f):DISP[tk[j]]||tk[j]}</span>`}
    if(on&&f.c===tk.length)h+=car(m[tk.length-1]===1);
    if(!tk.length&&!on)h=`<span class="ph0">Touche pour écrire</span>`;
    const b=$('#b'+i);b.innerHTML=h;b.classList.toggle('on',on);
    const pv=$('#pv'+i);if(pv){let s='';try{if(tk.length){let hh=H(parseTk(autoClose(tk)));if(f.v)hh=hh.replace(/<i class="mi">x<\/i>/g,vname(f));s=`<span>Aperçu</span><span class="m">${hh}</span>`}}catch(e){s=tk.length?'<span>Expression incomplète</span>':''}pv.innerHTML=s}
    const cr=b.querySelector('.caret');if(cr)cr.scrollIntoView({block:'nearest',inline:'nearest'})}
  function drawKeys(){
    $('#keys').innerHTML=KPAGES[KPAGE].map(([k,l,f])=>`<button class="key${/^[0-9.]$/.test(k)?'':' fn'}${f==='sm'||f==='xs'?' '+f:''}" data-k="${k}" ${f==='v'?'data-var="1"':''} aria-label="${KARIA[k]||k}"><span>${k==='x'?vname(F[act]):k==='x2'?vname(F[act])+'<sup>2</sup>':l||k}</span></button>`).join('');
    $('#keys').querySelectorAll('.key').forEach(b=>b.onclick=()=>key(b.dataset.k));
    app.querySelectorAll('[data-kp]').forEach(b=>{const on=+b.dataset.kp===KPAGE;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
    const isNum=F[act].kind==='num';$('#keys').querySelectorAll('[data-var]').forEach(k=>k.disabled=isNum);
    const km=$('#kmode');km.textContent=CALC.deg?'DEG':'RAD';km.hidden=!F.some(f=>f.kind==='num')}
  const drawAll=()=>{F.forEach((_,i)=>drawBox(i));ck.disabled=F.some(f=>!f.tk.length);drawKeys()};
  function key(k){if(E.done)return;const f=F[act];msg.textContent='';const prev=f.tk[f.c-1];
    if(k==='B'){if(f.c>0){f.tk.splice(f.c-1,1);f.c--}}
    else if(k==='L')f.c=Math.max(0,f.c-1);
    else if(k==='R')f.c=Math.min(f.tk.length,f.c+1);
    else{if(f.kind==='num'&&(k==='x'||k==='x2'))return;
      const needPrev=['^','x2','inv','EE','!','%'].includes(k)&&k!=='x2';
      if(needPrev&&(f.c===0||prev==='^'||isOpen(prev)))return;
      const ins=k==='x2'?['x','^','2']:k==='inv'?['^','-','1']:k==='EE'?['*','1','0','^','(']:k==='p10'?['1','0','^','(']:[k];
      f.tk.splice(f.c,0,...ins);f.c+=ins.length}
    sfx.tap();drawAll()}
  app.querySelectorAll('.kbar [data-k]').forEach(b=>b.onclick=()=>key(b.dataset.k));
  app.querySelectorAll('[data-kp]').forEach(b=>b.onclick=()=>{KPAGE=+b.dataset.kp;sfx.tap();drawKeys()});
  $('#kmode').onclick=()=>{CALC.deg=!CALC.deg;sfx.tap();drawKeys();msg.innerHTML=`Angles en <b>${CALC.deg?'degrés':'radians'}</b> pour sin, cos, tan et leurs réciproques.`};
  F.forEach((_,i)=>{const b=$('#b'+i);b.onclick=e=>{act=i;const t=e.target.closest('.tk');F[i].c=t?+t.dataset.i+1:F[i].tk.length;drawAll()};b.onfocus=()=>{if(act!==i){act=i;drawAll()}}});
  E.onKey=e=>{if(E.done)return;const k=e.key,map={'Backspace':'B','ArrowLeft':'L','ArrowRight':'R','X':'x','²':'x2',',':'.','p':'π','e':'e','s':'sin(','c':'cos(','t':'tan(','l':'ln(','r':'sqrt(','E':'EE'};
    if(k==='Enter'){if(!ck.disabled)ck.click();e.preventDefault();return}
    if(k==='Tab'&&F.length>1){e.preventDefault();act=(act+1)%F.length;drawAll();return}
    if(e.ctrlKey||e.metaKey||e.altKey)return;
    const kk=map[k]||k;if(/^[0-9.x+\-*/^()!%;π]$/.test(kk)||['B','L','R','x2','e','EE'].includes(kk)||(kk.endsWith('(')&&kk.length>1)){e.preventDefault();key(kk)}};
  ck.onclick=()=>{
    let asts;try{asts=F.map(f=>parseTk(autoClose(f.tk)))}catch(e){msg.textContent='Une expression est incomplète. Vérifie les parenthèses, les opérateurs et le « ; » de C(n ; k).';return}
    EVDEG=CALC.deg&&F.every(f=>f.kind==='num');
    try{const r=q.check(asts.map(a=>a),F.map(f=>f.tk));
      if(r==='nopar'){msg.textContent='Développe complètement : ta réponse ne doit plus contenir de parenthèses.';return}
      answer(!!r,0,asts)}finally{EVDEG=false}};
  drawAll();
}
