/* ================= utilitaires ================= */
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const nz=(a,b)=>{let v;do v=R(a,b);while(v===0);return v};
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1};
const sg=n=>n<0?`-${-n}`:`+${n}`;
const MINUS='−';
const num=n=>(n<0?MINUS:'')+String(Math.abs(n)).replace('.',',');

class Fr{
  constructor(n,d=1){if(d<0){n=-n;d=-d}const g=gcd(n,d);this.n=n/g;this.d=d/g}
  add(o){return new Fr(this.n*o.d+o.n*this.d,this.d*o.d)}
  sub(o){return this.add(o.neg())}
  neg(){return new Fr(-this.n,this.d)}
  div(o){return new Fr(this.n*o.d,this.d*o.n)}
  mul(o){return new Fr(this.n*o.n,this.d*o.d)}
  zero(){return this.n===0}
  one(){return this.n===1&&this.d===1}
  val(){return this.n/this.d}
}
const F=v=>v instanceof Fr?v:new Fr(v);
function frH(f,{sign=true}={}){ // HTML d'une fraction
  const s=f.n<0&&sign?MINUS:'',a=Math.abs(f.n);
  return s+(f.d===1?a:`<span class="frac"><span>${a}</span><span>${f.d}</span></span>`)}

/* ================= moteur d'expressions ================= */
const XFN={'sin(':'sin','cos(':'cos','tan(':'tan','asin(':'sin⁻¹','acos(':'cos⁻¹','atan(':'tan⁻¹','sinh(':'sh','cosh(':'ch','tanh(':'th',
  'ln(':'ln','log(':'log','exp(':'exp','sqrt(':'√','cbrt(':'∛','abs(':'abs','C(':'C','A(':'A'};
const XFNK=Object.keys(XFN).sort((a,b)=>b.length-a.length);
const isOpen=t=>t==='('||(typeof t==='string'&&t.length>1&&t.endsWith('('));
let EVDEG=false; // angles en degrés : seulement pour les champs numériques, au choix de l'élève (bouton RAD/DEG)
function lexStr(s){const t=[];for(let i=0;i<s.length;i++){const c=s[i];if(c===' ')continue;
  const f=XFNK.find(n=>s.startsWith(n,i));if(f){t.push(f);i+=f.length-1;continue}
  if(s.startsWith('pi',i)){t.push('π');i++;continue}
  t.push(c==='×'?'*':c==='÷'?'/':c==='−'?'-':c)}return t}
function items(tk){
  const out=[];let i=0;
  while(i<tk.length){const t=tk[i];
    if(/^[0-9.]$/.test(t)){let s='';while(i<tk.length&&/^[0-9.]$/.test(tk[i]))s+=tk[i++];if((s.match(/\./g)||[]).length>1||s==='.')throw 0;out.push({k:'n',v:parseFloat(s)});continue}
    if(t==='x')out.push({k:'x'});else if(t==='(')out.push({k:'('});else if(t===')')out.push({k:')'});
    else if(t in XFN)out.push({k:'fn',f:t});
    else if(t==='π')out.push({k:'c',s:'π',v:Math.PI});else if(t==='e')out.push({k:'c',s:'e',v:Math.E});
    else if(t==='!'||t==='%')out.push({k:'post',v:t});else if(t===';')out.push({k:';'});
    else if('+-*/^'.includes(t))out.push({k:'op',v:t});else throw 0;
    i++}
  return out}
function parseTk(tk){
  const it=items(tk);let i=0;const pk=()=>it[i];
  const isOp=(p,v)=>p&&p.k==='op'&&p.v===v;
  const starts=p=>p&&(p.k==='n'||p.k==='x'||p.k==='('||p.k==='fn'||p.k==='c');
  const shut=()=>{const c=it[i++];if(!c||c.k!==')')throw 0};
  function expr(){let n=term();while(isOp(pk(),'+')||isOp(pk(),'-')){const o=it[i++].v;n={t:o==='+'?'add':'sub',a:n,b:term()}}return n}
  function term(){let n=unary();for(;;){const p=pk();if(!p)break;
      if(isOp(p,'*')||isOp(p,'/')){i++;n={t:p.v==='*'?'mul':'div',a:n,b:unary(),ex:true}}
      else if(starts(p)){n={t:'mul',a:n,b:power()}}
      else break}return n}
  function unary(){const p=pk();if(isOp(p,'-')){i++;return{t:'neg',a:unary()}}if(isOp(p,'+')){i++;return unary()}return power()}
  function power(){const b=postfix();if(isOp(pk(),'^')){i++;return{t:'pow',a:b,b:unary()}}return b}
  function postfix(){let n=primary();while(pk()&&pk().k==='post'){n={t:pk().v==='!'?'fact':'pct',a:n};i++}return n}
  function primary(){const p=it[i++];if(!p)throw 0;
    if(p.k==='n')return{t:'num',v:p.v};if(p.k==='x')return{t:'x'};if(p.k==='c')return{t:'c',s:p.s,v:p.v};
    if(p.k==='('){const e=expr();shut();return e}
    if(p.k==='fn'){const a=expr();if(p.f==='C('||p.f==='A('){const s=it[i++];if(!s||s.k!==';')throw 0;const b=expr();shut();return{t:'fn',f:p.f,a,b}}
      shut();return p.f==='sqrt('?{t:'sqrt',a}:{t:'fn',f:p.f,a}}
    throw 0}
  if(!it.length)throw 0;
  const n=expr();if(i!==it.length)throw 0;return n}
function autoClose(tk){let d=0;for(const t of tk){if(isOpen(t))d++;else if(t===')')d--}return d>0?tk.concat(Array(d).fill(')')):tk}
const parse=s=>parseTk(lexStr(s));
const xFact=n=>{if(n<0||!Number.isInteger(n))return NaN;if(n>170)return Infinity;let r=1;for(let i=2;i<=n;i++)r*=i;return r};
function evFn(f,a,b){const ang=v=>EVDEG?v*Math.PI/180:v,dga=v=>EVDEG?v*180/Math.PI:v;
  switch(f){case'sin(':return Math.sin(ang(a));case'cos(':return Math.cos(ang(a));case'tan(':return Math.tan(ang(a));
    case'asin(':return dga(Math.asin(a));case'acos(':return dga(Math.acos(a));case'atan(':return dga(Math.atan(a));
    case'sinh(':return Math.sinh(a);case'cosh(':return Math.cosh(a);case'tanh(':return Math.tanh(a);
    case'ln(':return Math.log(a);case'log(':return Math.log10(a);case'exp(':return Math.exp(a);
    case'cbrt(':return Math.cbrt(a);case'abs(':return Math.abs(a);
    case'C(':return Number.isInteger(a)&&Number.isInteger(b)&&a>=0?(b<0||b>a?0:Math.round(xFact(a)/(xFact(b)*xFact(a-b)))):NaN;
    case'A(':return Number.isInteger(a)&&Number.isInteger(b)&&a>=0&&b>=0&&b<=a?xFact(a)/xFact(a-b):NaN}return NaN}
function ev(n,x){switch(n.t){
  case'num':return n.v;case'x':return x;case'c':return n.v;case'add':return ev(n.a,x)+ev(n.b,x);case'sub':return ev(n.a,x)-ev(n.b,x);
  case'mul':return ev(n.a,x)*ev(n.b,x);case'div':return ev(n.a,x)/ev(n.b,x);case'pow':return Math.pow(ev(n.a,x),ev(n.b,x));
  case'neg':return-ev(n.a,x);case'sqrt':return Math.sqrt(ev(n.a,x));
  case'fact':return xFact(ev(n.a,x));case'pct':return ev(n.a,x)/100;
  case'fn':return evFn(n.f,ev(n.a,x),n.b?ev(n.b,x):undefined)}}
const ADD=n=>n.t==='add'||n.t==='sub';
const par=h=>`(${h})`;
const FNH={'asin(':'sin<sup>−1</sup>','acos(':'cos<sup>−1</sup>','atan(':'tan<sup>−1</sup>','sinh(':'sh','cosh(':'ch','tanh(':'th'};
const ATOM=n=>n.t==='num'&&n.v>=0||n.t==='x'||n.t==='c'||n.t==='sqrt'||(n.t==='fn'&&n.f!=='exp(');
function H(n){switch(n.t){
  case'num':return num(n.v);
  case'x':return'<i class="mi">x</i>';
  case'c':return n.s==='e'?'e':'π';
  case'add':return n.b.t==='neg'?H(n.a)+`<span class="op">${MINUS}</span>`+wrapIf(n.b.a,ADD(n.b.a)):H(n.a)+'<span class="op">+</span>'+H(n.b);
  case'sub':return H(n.a)+`<span class="op">${MINUS}</span>`+wrapIf(n.b,ADD(n.b)||n.b.t==='neg');
  case'neg':return MINUS+wrapIf(n.a,ADD(n.a)||n.a.t==='neg');
  case'mul':{const a=wrapIf(n.a,ADD(n.a)),b=wrapIf(n.b,ADD(n.b)||n.b.t==='neg');
    const dot=n.ex&&!(n.a.t==='num'&&(n.b.t==='x'||n.b.t==='c'||n.b.t==='fn'||n.b.t==='sqrt'||(n.b.t==='pow'&&n.b.a.t==='x')))||n.b.t==='num'||n.b.t==='div';
    return a+(dot?'<span class="op">·</span>':'')+b}
  case'div':return`<span class="frac"><span>${H(n.a)}</span><span>${H(n.b)}</span></span>`;
  case'pow':return wrapIf(n.a,!ATOM(n.a))+`<sup>${H(n.b)}</sup>`;
  case'sqrt':return`<span class="sqrt"><span class="rad">√</span><span class="rc">${H(n.a)}</span></span>`;
  case'fact':return wrapIf(n.a,!(n.a.t==='num'||n.a.t==='x'))+'!';
  case'pct':return wrapIf(n.a,!ATOM(n.a))+' %';
  case'fn':{const f=n.f;
    if(f==='exp(')return`e<sup>${H(n.a)}</sup>`;
    if(f==='abs(')return`|${H(n.a)}|`;
    if(f==='cbrt(')return`<span class="sqrt"><span class="rad"><sup>3</sup>√</span><span class="rc">${H(n.a)}</span></span>`;
    if(f==='C('||f==='A(')return`${f[0]}(${H(n.a)} ; ${H(n.b)})`;
    return`${FNH[f]||XFN[f]}(${H(n.a)})`}}}
const wrapIf=(n,c)=>c?par(H(n)):H(n);
/** Toilette d'affichage des formules générées : 1·x → x, (−1)·x → −x */
function tidy(n){if(!n||typeof n!=='object')return n;const o={...n};if(o.a)o.a=tidy(o.a);if(o.b)o.b=tidy(o.b);
  if(o.t==='mul'&&o.a.t==='num'&&o.b.t!=='num'&&o.b.t!=='div'){if(o.a.v===1)return o.b;if(o.a.v===-1)return{t:'neg',a:o.b}}
  if(o.t==='mul'&&o.a.t==='neg'&&o.a.a.t==='num'&&o.a.a.v===1&&o.b.t!=='num')return{t:'neg',a:o.b};
  return o}
const M=s=>`<span class="m">${H(tidy(parse(s)))}</span>`;
/** Toilette typographique des textes générés (hors SVG et balises) :
    -3 → −3, « + −3 » → « − 3 », coefficient 1 devant une lettre (1x → x, −1x → −x, ±1i → ±i). */
function typo(s){if(typeof s!=='string'||!s)return s;
  return s.split(/(<svg[\s\S]*?<\/svg>)/).map((p,i)=>i%2?p:p
    .replace(/(^|[\s(=:;,±\[{]|<(?:sup|span|b|i|p|li|small)[^>]*>)-(?=\d)/g,`$1${MINUS}`)
    .replace(/((?:\d|[)²³′π]|(?<![a-zA-Zà-ÿ])[a-zA-Zα-ω])(?:<\/[a-z]+>)*\s*)\+(\s*)((?:<[^>]+>)*)\s*[−-](?=\s*[\w(√<])/g,`$1${MINUS}$2$3`)
    .replace(/(^|[\s(=+−:;±\[]|<(?:sup|span|b)[^>]*>)1((?:<i[^>]*>)?)(?=[a-zA-Zα-ωπ](?![a-zA-Zà-ÿ'’]))/g,'$1$2')).join('')}
function typoQ(q){['instr','prompt','explain','hint'].forEach(k=>{if(typeof q[k]==='string')q[k]=typo(q[k])});
  if(typeof q.prompt==='string'&&q.prompt.includes('<svg'))q.prompt=q.prompt.replace(/(<div class="qfig[^"]*">)?(<svg[\s\S]*?<\/svg>)/g,(m,w,svg)=>w?m:`<div class="qfig">${svg}</div>`);
  (q.opts||[]).forEach(o=>{o.h=typo(o.h);if(o.why)o.why=typo(o.why)});
  (q.steps||[]).forEach(st=>{st.q=typo(st.q)});return q}
/* mx : texte mathématique écrit à la main ; chaque x isolé passe en italique */
const mx=s=>'<span class="m">'+s.replace(/(?<![A-Za-zÀ-ÿ])x(?![A-Za-zÀ-ÿ̀-ͯ])/g,'<i>x</i>')+'</span>';
const fr=(a,b)=>`<span class="frac"><span>${a}</span><span>${b}</span></span>`;
function poly(cs){const t=[],deg=cs.length-1;cs.forEach((c,i)=>{const p=deg-i;if(!c)return;const m=Math.abs(c);
  t.push((c<0?'-':(t.length?'+':''))+(m===1&&p>0?'':m)+(p===0?'':p===1?'x':'x^'+p))});return t.join('')||'0'}
function equiv(a,bStr){const b=parse(bStr);let n=0;for(const x of[-2.3,-1.1,-.4,.6,1.7,2.9,4.2]){const u=ev(a,x),v=ev(b,x);if(!isFinite(v))continue;if(!isFinite(u))return false;if(Math.abs(u-v)>1e-7*Math.max(1,Math.abs(v)))return false;n++}return n>=3}
const close=(u,v)=>isFinite(u)&&Math.abs(u-v)<1e-9*Math.max(1,Math.abs(v));
