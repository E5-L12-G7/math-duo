/* Moteur d'expressions des réponses : mêmes éléments que la calculatrice (fonctions, constantes, factorielle, %, C(n ; k)). */
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
