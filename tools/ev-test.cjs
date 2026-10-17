const T=require('./load.cjs')(require('path').join(__dirname,'..','equilibre.html'));
const cases=[['2π/3',2*Math.PI/3],['2pi/3',2*Math.PI/3],['ln(2)',Math.log(2)],['log(1000)',3],['3.2*10^(-4)',3.2e-4],['C(5;2)',10],['A(5;2)',20],['5!',120],['sin(π/6)',.5],['e^2',Math.E**2],['exp(1)',Math.E],['2e',2*Math.E],['50%',.5],['abs(-3)',3],['cbrt(27)',3],['sqrt(16)',4],['asin(1)',Math.PI/2],['cosh(0)',1],['πe',Math.PI*Math.E],['2ln(3)',2*Math.log(3)],['ln(3)^2',Math.log(3)**2],['10^(-3)',1e-3]];
let bad=0;for(const[s,v]of cases){let r;try{r=T.ev(T.parse(s),0)}catch(e){r='ERR'}const ok=typeof r==='number'&&Math.abs(r-v)<1e-9*Math.max(1,Math.abs(v));if(!ok)bad++;console.log(ok?'✓':'✗',s,'→',r,'|',ok?'':v, T.H(T.parse(s)).replace(/<[^>]+>/g,'·').slice(0,60))}
const tk=['3','.','2','*','1','0','^','(','-','4'];console.log('jetons ×10ⁿ :',T.ev(T.parseTk(T.autoClose(tk)),0));
T.setDeg(true);console.log('DEG cos(60) =',T.ev(T.parse('cos(60)'),0),' acos(0.5) =',T.ev(T.parse('acos(0.5)'),0));T.setDeg(false);
console.log(bad?bad+' échec(s)':'tout est bon');
