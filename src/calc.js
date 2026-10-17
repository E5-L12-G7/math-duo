/* ---- Calculatrice scientifique d'aide (n'interagit jamais avec la réponse) ----
   Jetons : chiffres, « . », opérateurs + - * / ^ ! %, parenthèses, « ; » (séparateur de C(n ; k)),
   constantes π e Ans, fonctions terminées par « ( », et « #valeur » pour un nombre repris de l'historique. */
const CALC={tk:[],hist:[],open:false,page:0,deg:false,ans:0};
const CFN={'sin(':'sin','cos(':'cos','tan(':'tan','asin(':'sin⁻¹','acos(':'cos⁻¹','atan(':'tan⁻¹','sinh(':'sh','cosh(':'ch','tanh(':'th',
  'ln(':'ln','log(':'log','exp(':'exp','sqrt(':'√','cbrt(':'∛','abs(':'abs','C(':'C','A(':'A'};
const cFact=n=>{if(n<0||!Number.isInteger(n))return NaN;if(n>170)return Infinity;let r=1;for(let i=2;i<=n;i++)r*=i;return r};
function cEval(tk){
  const T=[];for(const t of tk){if(/^[0-9.]$/.test(t)&&T.length&&T[T.length-1].n!==undefined&&typeof T[T.length-1].s==='string')T[T.length-1].s+=t;else if(/^[0-9.]$/.test(t))T.push({n:0,s:t});else T.push({t})}
  T.forEach(x=>{if(x.s!==undefined){if((x.s.match(/\./g)||[]).length>1||x.s==='.')throw 0;x.n=parseFloat(x.s)}});
  let i=0;const pk=()=>T[i]&&T[i].t,eat=t=>{if(pk()===t){i++;return true}return false};
  const ang=v=>CALC.deg?v*Math.PI/180:v,dga=v=>CALC.deg?v*180/Math.PI:v;
  const startsPrimary=()=>{const x=T[i];return x&&(x.s!==undefined||['π','e','Ans','('].includes(x.t)||x.t in CFN||/^#/.test(x.t))};
  function expr(){let v=term();for(;;){if(eat('+'))v+=term();else if(eat('-'))v-=term();else return v}}
  function term(){let v=unary();for(;;){if(eat('*'))v*=unary();else if(eat('/'))v/=unary();else if(startsPrimary())v*=power();else return v}}
  function unary(){if(eat('-'))return-unary();if(eat('+'))return unary();return power()}
  function power(){const b=postfix();if(eat('^'))return Math.pow(b,unary());return b}
  function postfix(){let v=primary();for(;;){if(eat('!'))v=cFact(v);else if(eat('%'))v/=100;else return v}}
  function close(){if(i<T.length&&!eat(')'))throw 0}
  function primary(){const x=T[i];if(!x)throw 0;i++;
    if(x.s!==undefined)return x.n;
    if(x.t==='π')return Math.PI;if(x.t==='e')return Math.E;if(x.t==='Ans')return CALC.ans;if(/^#/.test(x.t))return+x.t.slice(1);
    if(x.t==='('){const v=expr();close();return v}
    if(x.t in CFN){const a=expr();let b;if(x.t==='C('||x.t==='A('){if(!eat(';'))throw 0;b=expr()}close();
      switch(x.t){case'sin(':return Math.sin(ang(a));case'cos(':return Math.cos(ang(a));case'tan(':{const c=Math.cos(ang(a));return Math.abs(c)<1e-15?Infinity:Math.tan(ang(a))}
        case'asin(':return dga(Math.asin(a));case'acos(':return dga(Math.acos(a));case'atan(':return dga(Math.atan(a));
        case'sinh(':return Math.sinh(a);case'cosh(':return Math.cosh(a);case'tanh(':return Math.tanh(a);
        case'ln(':return a>0?Math.log(a):a===0?-Infinity:NaN;case'log(':return a>0?Math.log10(a):a===0?-Infinity:NaN;case'exp(':return Math.exp(a);
        case'sqrt(':return Math.sqrt(a);case'cbrt(':return Math.cbrt(a);case'abs(':return Math.abs(a);
        case'C(':return Number.isInteger(a)&&Number.isInteger(b)&&a>=0?Cnk(a,b):NaN;case'A(':return Number.isInteger(a)&&Number.isInteger(b)&&a>=0&&b>=0&&b<=a?cFact(a)/cFact(a-b):NaN}}
    throw 0}
  const v=expr();if(i<T.length)throw 0;return v}
function calcVal(tk){if(!tk.length)return null;try{return cEval(tk)}catch(e){return undefined}}
const clean=v=>Math.abs(v)<1e-12?0:v;
function fmtR(v){v=clean(v);const a=Math.abs(v);
  if(a!==0&&(a>=1e12||a<1e-6)){const [m,e]=v.toExponential(6).split('e');return`${num(+m)} × 10<sup>${num(+e)}</sup>`}
  return num(Number(v.toPrecision(10)))}
function fracOf(v){if(Number.isInteger(v)||Math.abs(v)>1e6)return null;for(let d=2;d<=100;d++){const n=Math.round(v*d);if(Math.abs(n/d-v)<1e-10)return new Fr(n,d)}return null}
function calcRes(v){
  if(v===null)return'<span class="cmuted">Tape un calcul</span>';
  if(v===undefined)return'<span class="cmuted">Calcul incomplet…</span>';
  if(Number.isNaN(v))return'<span class="cerr">Impossible : hors du domaine de la fonction</span>';
  if(!isFinite(v))return'<span class="cerr">Résultat infini (division par zéro ?)</span>';
  v=clean(v);const f=fracOf(v);let pi='';
  if(!f&&!Number.isInteger(v))for(let d=1;d<=12;d++){const n=Math.round(v/Math.PI*d);if(n&&Math.abs(v/Math.PI*d-n)<1e-9){const s2=n<0?MINUS:'',a=Math.abs(n);pi=d===1?`${s2}${a===1?'':a}π`:`${s2}${a===1?'':a}π/${d}`;break}}
  return`= <b>${f?frH(f)+' <span class="cmuted">≈</span> ':''}${pi?`<span class="cmuted">${pi} ≈</span> `:''}${fmtR(v)}</b>`}
const CLAB={'*':'×','/':'÷','-':MINUS,';':' ; ','asin(':'sin⁻¹(','acos(':'cos⁻¹(','atan(':'tan⁻¹(','sinh(':'sh(','cosh(':'ch(','tanh(':'th(','sqrt(':'√(','cbrt(':'∛(','abs(':'|…|(','.':','};
function cTok(t){if(/^#/.test(t))return fmtR(+t.slice(1));return CLAB[t]||t}
function cHtml(tk,a=0,b=tk.length){let h='';for(let j=a;j<b;j++){const t=tk[j];
  if(t==='^'){let k=j+1;const grp=()=>{let d=0;for(;k<b;k++){if(tk[k]==='('||(tk[k]in CFN))d++;else if(tk[k]===')'&&--d===0)break}k=Math.min(k+1,b)};
    if(tk[k]==='-')k++;
    if(tk[k]==='('||(tk[k]in CFN))grp();else if(/^[0-9.]$/.test(tk[k]||''))while(k<b&&/^[0-9.]$/.test(tk[k]))k++;else if(k<b&&(['π','e','Ans'].includes(tk[k])||/^#/.test(tk[k])))k++;
    h+=`<sup class="tk">${k>j+1?cHtml(tk,j+1,k):'<span class="phb"></span>'}</sup>`;j=k-1;continue}
  h+=`<span class="tk">${cTok(t)}</span>`}return h}
const CPAGES=[[['C','C','fn'],['(','(','fn'],[')',')','fn'],['B',null,'fn'],['/','÷','fn'],
    ['7'],['8'],['9'],['sqrt(','√','fn'],['*','×','fn'],
    ['4'],['5'],['6'],['sq','x<sup>2</sup>','fn'],['-',MINUS,'fn'],
    ['1'],['2'],['3'],['^','x<sup>n</sup>','fn'],['+','+','fn'],
    ['0'],['.',','],['π','π','fn'],['Ans','Ans','fn sm'],['=','=','eq']],
  [['sin(','sin','fn sm'],['cos(','cos','fn sm'],['tan(','tan','fn sm'],['ln(','ln','fn sm'],['log(','log','fn sm'],
    ['asin(','sin<sup>−1</sup>','fn sm'],['acos(','cos<sup>−1</sup>','fn sm'],['atan(','tan<sup>−1</sup>','fn sm'],['exp(','e<sup>x</sup>','fn sm'],['p10','10<sup>x</sup>','fn sm'],
    ['sinh(','sh','fn sm'],['cosh(','ch','fn sm'],['tanh(','th','fn sm'],['cbrt(','∛','fn'],['abs(','|x|','fn sm'],
    ['!','n!','fn sm'],['C(','C(n ; k)','fn xs'],['A(','A(n ; k)','fn xs'],[';',';','fn'],['inv','1/x','fn sm'],
    ['e','e','fn'],['%','%','fn'],['EE','×10<sup>n</sup>','fn xs'],['B',null,'fn'],['=','=','eq']]];
const CARIA={C:'Tout effacer',B:'Effacer',sq:'Au carré','^':'Puissance','sqrt(':'Racine carrée','=':'Égal',inv:'Inverse',p10:'Puissance de 10',EE:'Fois 10 puissance','!':'Factorielle',
  'C(':'Combinaisons C(n ; k)','A(':'Arrangements A(n ; k)',';':'Point-virgule, sépare n et k','%':'Pourcentage','asin(':'arcsinus','acos(':'arccosinus','atan(':'arctangente','sinh(':'sinus hyperbolique','cosh(':'cosinus hyperbolique','tanh(':'tangente hyperbolique','abs(':'valeur absolue','cbrt(':'racine cubique','log(':'logarithme décimal','ln(':'logarithme népérien','exp(':'exponentielle'};
function openCalc(){
  CALC.open=true;const c=$('#calc');if(!c)return;c.hidden=false;$('#calcbtn').classList.add('on');
  c.innerHTML=`<div class="chead"><div><h3>Calculatrice</h3><p>Pour t’aider à calculer. Elle ne remplit pas ta réponse.</p></div>
      <button class="iconbtn" id="calcx" aria-label="Fermer la calculatrice">${I.x}</button></div>
    <ul class="chist" id="chist"></ul>
    <div class="cdisp"><div class="cexpr m" id="cexpr"></div><div class="cres m" id="cres"></div></div>
    <div class="cbar"><div class="seg cpg" role="tablist">${['123','f(x)'].map((l,i)=>`<button role="tab" data-pg="${i}" aria-selected="${CALC.page===i}" class="${CALC.page===i?'on':''}">${l}</button>`).join('')}</div>
      <button class="cmode" id="cmode" aria-label="Unité d’angle">${CALC.deg?'DEG':'RAD'}</button></div>
    <div class="keys ckeys" id="ckeys"></div><p class="cnote" id="cnote"></p>`;
  c.querySelector('#calcx').onclick=closeCalc;
  c.querySelectorAll('[data-pg]').forEach(b=>b.onclick=()=>{CALC.page=+b.dataset.pg;c.querySelectorAll('[data-pg]').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});sfx.tap();drawKeys()});
  c.querySelector('#cmode').onclick=()=>{CALC.deg=!CALC.deg;c.querySelector('#cmode').textContent=CALC.deg?'DEG':'RAD';sfx.tap();drawCalc()};
  drawKeys();drawCalc();
}
function drawKeys(){const k=$('#ckeys');
  k.innerHTML=CPAGES[CALC.page].map(([key,l,c])=>`<button class="key ${c||''}" data-ck="${key}" aria-label="${CARIA[key]||key}"><span>${key==='B'?I.bs:l||key}</span></button>`).join('');
  k.querySelectorAll('[data-ck]').forEach(b=>b.onclick=()=>calcKey(b.dataset.ck));
  $('#cnote').innerHTML=CALC.page?`Angles en <b>${CALC.deg?'degrés':'radians'}</b> (bouton ${CALC.deg?'DEG':'RAD'}). C(n ; k) : tape C, puis n, « ; », k. Exemple : C(5 ; 2) = 10.`:''}
function closeCalc(){CALC.open=false;const c=$('#calc');if(c)c.hidden=true;const b=$('#calcbtn');if(b)b.classList.remove('on')}
function drawCalc(){
  $('#cexpr').innerHTML=cHtml(CALC.tk)+'<span class="caret"></span>';
  $('#cres').innerHTML=calcRes(calcVal(CALC.tk));
  const h=$('#chist');h.innerHTML=CALC.hist.map((r,i)=>`<li><button data-h="${i}" aria-label="Réutiliser ${fmtR(r.v).replace(/<[^>]+>/g,'')}"><span class="m">${r.e}</span><span class="m">= <b>${fmtR(r.v)}</b></span></button></li>`).join('');
  h.hidden=!CALC.hist.length;
  h.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{CALC.tk.push('#'+CALC.hist[+b.dataset.h].v);sfx.tap();drawCalc()});
  const ex=$('#cexpr');ex.scrollLeft=ex.scrollWidth;
}
function calcKey(k){
  const tk=CALC.tk,startNew=CALC.fresh&&(/^[0-9.(]$/.test(k)||k in CFN||['π','e','p10'].includes(k));
  if(startNew)tk.length=0;
  CALC.fresh=k==='=';
  if(k==='C')tk.length=0;
  else if(k==='B')tk.pop();
  else if(k==='='){const v=calcVal(tk);if(v===null||v===undefined||!isFinite(v)){CALC.fresh=false;return}
    CALC.hist.unshift({e:cHtml(tk),v:clean(v)});CALC.hist.length=Math.min(CALC.hist.length,3);CALC.ans=clean(v);tk.length=0;tk.push('#'+clean(v))}
  else if(k==='sq'){if(!tk.length)return;tk.push('^','2')}
  else if(k==='inv'){if(!tk.length)return;tk.push('^','-','1')}
  else if(k==='p10')tk.push('1','0','^','(');
  else if(k==='EE'){if(!tk.length)return;tk.push('*','1','0','^','(')}
  else{if(k==='^'&&(!tk.length||tk[tk.length-1]==='^'))return;tk.push(k)}
  sfx.tap();drawCalc();
}
