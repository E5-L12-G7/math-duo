/* ===================== Algèbre 2 : raisonnements à choix =====================
   L'élève choisit chaque étape ; les étapes suivantes découlent de ses choix (une erreur se propage),
   la correction n'arrive qu'à la vérification. */
const acX=(k,first)=>{const a=Math.abs(k),s=k<0?MINUS:first?'':'+';return`${s}${first&&k<0?'':' '}${a===1?'':num(a)}x`.trim()};
const acC=(k,first)=>k===0?'':first?num(k):`${k<0?MINUS:'+'} ${num(Math.abs(k))}`;
const acLin=(k,b)=>[acX(k,true),acC(b,false)].filter(Boolean).join(' ');
const acRat=v=>{if(!Number.isFinite(v))return'impossible';for(let d=1;d<=60;d++){const n=Math.round(v*d);if(Math.abs(n/d-v)<1e-9)return acFr(n,d)}return'≈ '+dec(v,3)};
const acFr=(p,q)=>{if(q===0)return'impossible';const f=new Fr(p,q);return f.d===1?num(f.n):(f.n<0?MINUS:'')+fr(Math.abs(f.n),f.d)};
/* ax + b = cx + d */
const gLinR=()=>{const x0=R(-6,6),a=R(2,9);let c;do c=R(-5,8);while(c===0||c===a||c===-a);const b=nz(-9,9),d=(a-c)*x0+b;
  const T=mx(acX(c,true).replace(/^\+/,''));
  return chain({instr:'Résous l’équation en choisissant chaque étape.',prompt:mx(`${acLin(a,b)} = ${acLin(c,d)}`),
    steps:[
      {q:'Pour rassembler les termes en x à gauche, on…',o:[
        {h:`enlève ${T} aux deux membres`,ok:true,k:a-c},
        {h:`ajoute ${T} aux deux membres`,k:a+c,why:`Pour faire disparaître ${T} à droite, il faut l’enlever (opération contraire), pas l’ajouter.`,tag:'signe'},
        {h:`enlève ${T} seulement à droite`,k:a,why:'Ce qu’on fait d’un côté, on le fait de l’autre : sinon l’égalité n’est plus vraie.'}]},
      {q:'Puis, pour isoler le terme en x, on…',o:prev=>[
        {h:`enlève ${num(b)} aux deux membres`.replace(`enlève ${MINUS}`,'ajoute '),ok:true,r:d-b},
        {h:`ajoute ${num(b)} aux deux membres`.replace(`ajoute ${MINUS}`,'enlève '),r:d+b,why:`Le terme ${num(b)} disparaît si on lui applique l’opération contraire.`,tag:'signe'},
        {h:`divise les deux membres par ${num(prev[0].k)}`,r:null,why:'On divise en dernier, quand il ne reste plus que le terme en x à gauche ; sinon il faut diviser chaque terme.'}]},
      {q:'On obtient :',o:prev=>{const k=prev[0].k,r=prev[1].r;
        if(r===null)return[{h:mx(`x + ${acFr(b,k)} = ${acFr(d,k)}`),ok:true,v:(d-b)/k,why:''},{h:mx(`x + ${num(b)} = ${acFr(d,k)}`),why:'Diviser un membre par un nombre, c’est diviser chacun de ses termes.',v:d/k-b,tag:'distrib'},{h:mx(`x = ${acFr(d,k)}`),why:'Le terme constant a disparu sans raison.',v:d/k}];
        return[{h:mx(`${acX(k,true)} = ${num(r)}`),ok:true,v:k?r/k:NaN},{h:mx(`${acX(k,true)} = ${num(-r)}`),why:'Erreur de signe en reportant le résultat.',v:k?-r/k:NaN,tag:'signe'},{h:mx(`${acX(k,true)} = ${num(r+k)}`),why:'Le terme en x ne s’ajoute pas au nombre de droite.',v:k?(r+k)/k:NaN}]}},
      {q:'Donc la solution est…',o:prev=>{const v=prev[2].v,k=prev[0].k,r=prev[1].r===null?(d-b):prev[1].r;
        return[{h:mx(`x = ${acRat(v)}`),ok:true},{h:mx(`x = ${acRat(r?k/r:NaN)}`),why:'On divise le second membre par le coefficient de x, pas l’inverse.'},
          {h:mx(`x = ${acRat(r-k)}`),why:'Pour enlever un coefficient multiplicateur, on divise : on ne soustrait pas.',tag:'calc'},{h:mx(`x = ${acRat(-v)}`),why:'Erreur de signe dans la division.',tag:'signe'}]}}],
    explain:`On enlève ${T} : ${mx(`${acX(a-c,true)} ${acC(b,false)} = ${num(d)}`)}. On isole : ${mx(`${acX(a-c,true)} = ${num(d-b)}`)}. On divise par ${num(a-c)} : ${mx(`x = ${num(x0)}`)}.`})};
/* −ax + b > c : le sens change quand on divise par un négatif */
const gIneqR=()=>{const a=R(2,6),x0=R(-5,5),b=nz(-9,9),c=-a*x0+b,rel=pick(['<','>','≤','≥']),flip={'<':'>','>':'<','≤':'≥','≥':'≤'};
  const iv=(v,r)=>{const vv=acRat(v);return r==='<'?`]−∞ ; ${vv}[`:r==='≤'?`]−∞ ; ${vv}]`:r==='>'?`]${vv} ; +∞[`:`[${vv} ; +∞[`};
  return chain({instr:'Résous l’inéquation en choisissant chaque étape.',prompt:mx(`${acLin(-a,b)} ${rel} ${num(c)}`),
    steps:[
      {q:'Première étape :',o:[
        {h:`${b<0?'ajouter':'enlever'} ${num(Math.abs(b))} aux deux membres`,ok:true,r:c-b},
        {h:`${b<0?'enlever':'ajouter'} ${num(Math.abs(b))} aux deux membres`,r:c+b,why:'On applique l’opération contraire au terme qu’on veut faire disparaître.',tag:'signe'}]},
      {q:'Ensuite, on isole x :',o:prev=>[
        {h:`diviser par ${MINUS}${a} et changer le sens de l’inégalité`,ok:true,v:prev[0].r/-a,s:flip[rel]},
        {h:`diviser par ${MINUS}${a} en gardant le même sens`,v:prev[0].r/-a,s:rel,why:'Diviser (ou multiplier) par un nombre négatif inverse l’ordre : il faut changer le sens.',tag:'ineq-flip'},
        {h:`diviser par ${a} en gardant le même sens`,v:prev[0].r/a,s:rel,why:`Le coefficient de x est ${MINUS}${a}, pas ${a} : le signe moins fait partie du coefficient.`,tag:'signe'}]},
      {q:'L’ensemble des solutions est…',o:prev=>{const{v,s}=prev[1],br={'<':'≤','≤':'<','>':'≥','≥':'>'},op={'<':'>','>':'<','≤':'≥','≥':'≤'};
        return[{h:mx(`S = ${iv(v,s)}`),ok:true},{h:mx(`S = ${iv(v,br[s])}`),why:'Regarde si la borne est atteinte : inégalité stricte → crochet ouvert, large → crochet fermé.',tag:'bracket'},{h:mx(`S = ${iv(v,op[s])}`),why:'Lis l’inégalité obtenue : x plus petit → vers −∞, x plus grand → vers +∞.',tag:'interval-dir'}]}}],
    explain:`${mx(`${acX(-a,true)} ${rel} ${num(c-b)}`)}, puis on divise par ${MINUS}${a} (négatif) donc le sens change : ${mx(`x ${flip[rel]} ${num(x0)}`)}, soit ${mx(`S = ${iv(x0,flip[rel])}`)}.`})};
/* Second degré : discriminant, nombre de solutions, solutions */
const gQuadR=()=>{const a=pick([1,1,2]),kind=pick([2,2,2,1,0]);let b,c;
  if(kind===2){let r1=R(-6,6),r2;do r2=R(-6,6);while(r2===r1||r1+r2===0);b=-a*(r1+r2);c=a*r1*r2}
  else if(kind===1){const r=nz(-5,5);b=-2*a*r;c=a*r*r}
  else{b=nz(-4,4);c=Math.floor(b*b/(4*a))+R(1,6)}
  const D=b*b-4*a*c,eq=`<span class="m">${H(parse(poly([a,b,c])))} = 0</span>`;
  const dOpts=[{h:`Δ = b<sup>2</sup> − 4ac = ${num(D)}`,ok:true,v:D},{h:`Δ = b<sup>2</sup> + 4ac = ${num(b*b+4*a*c)}`,v:b*b+4*a*c,why:'Le discriminant est b² − 4ac, avec un moins.',tag:'delta-formula'}];
  if(b<0)dOpts.push({h:`Δ = −${Math.abs(b)}<sup>2</sup> − 4ac = ${num(-b*b-4*a*c)}`,v:-b*b-4*a*c,why:`b = ${num(b)}, donc b² = (${num(b)})² = ${b*b} : le carré d’un négatif est positif.`,tag:'carre-neg'});
  else dOpts.push({h:`Δ = b − 4ac = ${num(b-4*a*c)}`,v:b-4*a*c,why:'b est élevé au carré dans le discriminant.',tag:'delta-formula'});
  const sq=v=>{const r=Math.sqrt(v);return Number.isInteger(r)?num(r):`√${v}`};
  return chain({instr:'Résous l’équation du second degré, étape par étape.',prompt:eq+stx(`Ici a = ${num(a)}, b = ${num(b)}, c = ${num(c)}.`),
    steps:[
      {q:'On calcule le discriminant :',o:dOpts},
      {q:'Combien l’équation a-t-elle de solutions réelles ?',o:prev=>{const v=prev[0].v,s=v>0?2:v===0?1:0;
        return[[2,'Deux solutions'],[1,'Une seule solution'],[0,'Aucune solution réelle']].map(([n,h])=>({h,n,ok:n===s,why:n===2?'Deux solutions seulement si Δ > 0.':n===1?'Une seule solution seulement si Δ = 0.':'Aucune solution réelle seulement si Δ < 0.',tag:'delta-sign'}))}},
      {q:'Les solutions sont…',o:prev=>{const v=prev[0].v,n=prev[1].n;
        if(n===0)return[{h:'S = ∅ : pas de solution réelle',ok:true},{h:mx(`x = ${acFr(-b,2*a)}`),why:'−b/(2a) est l’abscisse du sommet de la parabole, pas une solution quand Δ < 0.'},{h:'S = ℝ : tout réel est solution',why:'Un trinôme non nul ne s’annule pas partout.'}];
        if(n===1)return[{h:mx(`x = ${acFr(-b,2*a)}`),ok:true},{h:mx(`x = ${acFr(b,2*a)}`),why:'La solution double est −b/(2a) : attention au signe.',tag:'signe'},{h:mx(`x = ${acFr(-b,a)}`),why:'Le dénominateur est 2a, pas a.'}];
        const rv=v>=0?sq(v):`√(${num(v)})`;
        return[{h:mx(`x = ${fr(`${num(-b)} − ${rv}`,2*a)} ou x = ${fr(`${num(-b)} + ${rv}`,2*a)}`),ok:true},
          {h:mx(`x = ${fr(`${num(b)} − ${rv}`,2*a)} ou x = ${fr(`${num(b)} + ${rv}`,2*a)}`),why:'La formule commence par −b, pas par b.',tag:'signe'},
          {h:mx(`x = ${fr(`${num(-b)} − ${rv}`,a)} ou x = ${fr(`${num(-b)} + ${rv}`,a)}`),why:'Le dénominateur est 2a.'}]}}],
    explain:`Δ = ${b<0?`(${num(b)})`:num(b)}² − 4 × ${num(a)} × ${c<0?`(${num(c)})`:num(c)} = ${num(D)}. ${D>0?`Δ > 0 : deux solutions, x = (−b ± √Δ) ÷ (2a), soit ${[(-b-Math.sqrt(D))/(2*a),(-b+Math.sqrt(D))/(2*a)].map(v=>num(+v.toFixed(3))).join(' et ')}.`:D===0?`Δ = 0 : une solution, x = −b ÷ (2a) = ${num(-b/(2*a))}.`:'Δ < 0 : aucune solution réelle.'}`})};
/* Équation exponentielle k·bˣ = m */
const gExpEqR=()=>{const base=pick([2,3,5,10]),x0=R(2,base===10?4:base===5?3:5),k=R(2,7),m=k*base**x0;
  const lg=v=>v>0?Math.log10(v):NaN;
  return chain({instr:'Résous l’équation en choisissant chaque étape.',prompt:mx(`${k} × ${base}<sup>x</sup> = ${m}`),
    steps:[
      {q:'D’abord, on isole la puissance :',o:[
        {h:mx(`${base}<sup>x</sup> = ${m} ÷ ${k} = ${m/k}`),ok:true,v:m/k},
        {h:mx(`${base}<sup>x</sup> = ${m} − ${k} = ${m-k}`),v:m-k,why:`${k} multiplie la puissance : on divise par ${k}, on ne soustrait pas.`,tag:'mult-div'},
        {h:mx(`${base*k}<sup>x</sup> = ${m}`),v:null,b2:base*k,why:`${k} × ${base}<sup>x</sup> n’est pas (${k} × ${base})<sup>x</sup> : la puissance ne porte que sur ${base}.`,tag:'coef-pow'}]},
      {q:'Puis on fait passer x de l’exposant au premier plan :',o:prev=>{const v=prev[0].v,B=prev[0].b2||base,V=v??m;
        return[{h:mx(`x = ${fr(`log ${num(V)}`,`log ${B}`)}`),ok:true,x:lg(V)/lg(B)},
          {h:mx(`x = log(${fr(num(V),B)})`),x:lg(V/B),why:'log(a) ÷ log(b) n’est pas log(a ÷ b).',tag:'log-quot'},
          {h:mx(`x = ${fr(num(V),B)}`),x:V/B,why:'L’inconnue est un exposant : il faut un logarithme pour la faire descendre.',tag:'log-def'}]}},
      {q:'Donc…',o:prev=>{const x=prev[1].x,good=Number.isInteger(+x.toFixed(9))?num(+x.toFixed(9)):'≈ '+dec(x,3);
        return[{h:`x ${good.startsWith('≈')?good:'= '+good}`,ok:true},{h:`x = ${num(Math.round(x)+1)}`,why:`Vérifie : ${base}<sup>${Math.round(x)+1}</sup> ne donne pas la bonne valeur.`,tag:'calc'},{h:`x ≈ ${dec(x*Math.LN10,3)}`,why:'Garde le même logarithme en haut et en bas : log ÷ log, ou ln ÷ ln, mais pas un mélange.',tag:'log-def'}]}}],
    explain:`${mx(`${base}<sup>x</sup> = ${m/k}`)}, donc ${mx(`x = log ${m/k} ÷ log ${base} = ${x0}`)} (vérification : ${base}<sup>${x0}</sup> = ${m/k}).`})};
/* Factoriser avec une identité remarquable */
const gFacR=()=>{const t=pick(['carre+','carre-','diff']),k=R(2,9),a=pick([1,1,2,3]),A=a===1?'x':`${a}x`;
  const expr=t==='diff'?`${a===1?'':a*a}x<sup>2</sup> − ${k*k}`:`${a===1?'':a*a}x<sup>2</sup> ${t==='carre+'?'+':'−'} ${2*a*k}x + ${k*k}`;
  const ID={'carre+':'a<sup>2</sup> + 2ab + b<sup>2</sup> = (a + b)<sup>2</sup>','carre-':'a<sup>2</sup> − 2ab + b<sup>2</sup> = (a − b)<sup>2</sup>','diff':'a<sup>2</sup> − b<sup>2</sup> = (a − b)(a + b)'};
  const form=(id,aa,bb)=>id==='carre+'?`(${aa} + ${bb})<sup>2</sup>`:id==='carre-'?`(${aa} − ${bb})<sup>2</sup>`:`(${aa} − ${bb})(${aa} + ${bb})`;
  return chain({instr:'Factorise en choisissant chaque étape.',prompt:mx(expr),
    steps:[
      {q:'Quelle identité remarquable reconnais-tu ?',o:Object.keys(ID).map(id=>({h:mx(ID[id]),id,ok:id===t,why:id==='diff'?'Il y a trois termes : ce n’est pas une différence de deux carrés.':t==='diff'?'Il n’y a que deux termes, séparés par un moins : c’est une différence de deux carrés.':'Regarde le signe du terme en x : il donne le signe dans la parenthèse.',tag:'id-rem'}))},
      {q:'Que valent a et b ?',o:[
        {h:mx(`a = ${A} et b = ${k}`),ok:true,aa:A,bb:k},
        {h:mx(`a = ${a===1?'x':a*a+'x'} et b = ${k*k}`),aa:a===1?'x':`${a*a}x`,bb:k*k,why:`a et b sont les nombres dont les carrés apparaissent : b<sup>2</sup> = ${k*k} donc b = ${k}.`,tag:'id-rem'},
        {h:mx(`a = ${A} et b = ${2*k}`),aa:A,bb:2*k,why:`2ab est le double produit : b se lit sur le dernier terme, b<sup>2</sup> = ${k*k}.`,tag:'id-rem'}]},
      {q:'La forme factorisée est…',o:prev=>{const id=prev[0].id,{aa,bb}=prev[1],other=Object.keys(ID).filter(x=>x!==id);
        return[{h:mx(form(id,aa,bb)),ok:true},...other.map(o=>({h:mx(form(o,aa,bb)),why:'Applique l’identité que tu as reconnue, sans changer de signe en route.',tag:'id-rem'}))]}}],
    explain:`On reconnaît ${mx(ID[t])} avec a = ${A} et b = ${k} : ${mx(expr)} = ${mx(form(t,A,k))}.`})};
/* Règles des puissances enchaînées */
const gPowR=()=>{const a=R(2,5);let b;do b=R(2,4);while(a===2&&b===2);const c=R(1,6),d=R(1,9);
  const X=e=>mx(`x<sup>${num(e)}</sup>`);
  return chain({instr:'Simplifie en choisissant chaque étape.',prompt:mx(`${fr(`(x<sup>${a}</sup>)<sup>${b}</sup> · x<sup>${c}</sup>`,`x<sup>${d}</sup>`)}`),
    steps:[
      {q:mx(`(x<sup>${a}</sup>)<sup>${b}</sup> = ?`),o:[{h:X(a*b),ok:true,e:a*b},{h:X(a+b),e:a+b,why:'Puissance d’une puissance : on multiplie les exposants.',tag:'exp-pow-add'},{h:X(a**b),e:a**b,why:`On multiplie les exposants : ${a} × ${b}, pas ${a}<sup>${b}</sup>.`,tag:'exp-pow-add'}]},
      {q:'On multiplie par '+mx(`x<sup>${c}</sup>`)+' :',o:prev=>{const e=prev[0].e;return[{h:X(e+c),ok:true,e:e+c},{h:X(e*c),e:e*c,why:'Produit de puissances de même base : on additionne les exposants.',tag:'exp-mul'},{h:X(e-c),e:e-c,why:'On multiplie : les exposants s’additionnent, ils ne se soustraient pas.',tag:'exp-quot-add'}]}},
      {q:'On divise par '+mx(`x<sup>${d}</sup>`)+' :',o:prev=>{const e=prev[1].e;return[{h:X(e-d),ok:true},{h:X(e+d),why:'Quotient : on soustrait l’exposant du dénominateur.',tag:'exp-quot-add'},{h:X(+(e/d).toFixed(2)),why:'On soustrait les exposants, on ne les divise pas.',tag:'exp-quot-add'}]}}],
    explain:`(x<sup>${a}</sup>)<sup>${b}</sup> = x<sup>${a*b}</sup> ; × x<sup>${c}</sup> donne x<sup>${a*b+c}</sup> ; ÷ x<sup>${d}</sup> donne ${X(a*b+c-d)}.`})};
