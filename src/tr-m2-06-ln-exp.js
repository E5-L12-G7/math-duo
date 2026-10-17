/* ===================== MVA912 · Logarithme et exponentielle ===================== */
Object.assign(ANA_ERR,{
  'm2le-dom':{label:'Domaine du logarithme',tip:'ln u n’existe que si u &gt; 0 : écris le domaine en première ligne, puis élimine les solutions qui n’y sont pas.'},
  'm2le-der':{label:'Dérivée de e<sup>u</sup> ou de ln u',tip:'(e<sup>u</sup>)′ = u′e<sup>u</sup> et (ln u)′ = u′/u : n’oublie pas le facteur u′.'}});
/** a x + b écrit joliment (a ≠ 0) */
const M2LE_lin=(a,b,v='x')=>`${a===1?'':a===-1?MINUS:num(a)}${v}${b?` ${b<0?MINUS:'+'} ${Math.abs(b)}`:''}`;
const M2LE_fr=(p,q)=>{const f=new Fr(p,q);return f.d===1?num(f.n):(f.n<0?MINUS:'')+fr(Math.abs(f.n),f.d)};
const M2LE_E=s=>`e<sup>${s}</sup>`;
/* 1. Lire et placer des points sur les courbes de exp et ln */
const gM2LeGraph=()=>{const E=Math.E,c=R(2,6),k=pick([-1,1,2]);
  const C=pick([
    {t:'Place le point où la courbe de ln coupe l’axe des abscisses.',p:[1,0],f:['ln(x)'],ex:'ln 1 = 0 : la courbe de ln coupe l’axe des abscisses en (1 ; 0).'},
    {t:'Place le point de la courbe de exp d’abscisse 0.',p:[0,1],f:['exp(x)'],ex:'e⁰ = 1 : toutes les exponentielles passent par (0 ; 1).'},
    {t:'Place le point de la courbe de ln d’ordonnée 1.',p:[E,1],f:['ln(x)'],ex:'ln x = 1 ⟺ x = e ≈ 2,72 : le point est (e ; 1).'},
    {t:'Place le point de la courbe de exp d’abscisse 1.',p:[1,E],f:['exp(x)'],ex:'e¹ = e ≈ 2,72 : le point est (1 ; e).'},
    {t:`Résous graphiquement e<sup>x</sup> = ${c} : place le point d’intersection de la courbe et de la droite.`,p:[Math.log(c),c],f:['exp(x)',{f:String(c),c:1,dash:true}],ex:`e<sup>x</sup> = ${c} ⟺ x = ln ${c} ≈ ${dec(Math.log(c))} : le point est (ln ${c} ; ${c}).`},
    {t:`Résous graphiquement ln x = ${num(k)} : place le point d’intersection de la courbe et de la droite.`,p:[Math.exp(k),k],f:['ln(x)',{f:String(k),c:1,dash:true}],ex:`ln x = ${num(k)} ⟺ x = e<sup>${num(k)}</sup> ≈ ${dec(Math.exp(k))} : le point est (e<sup>${num(k)}</sup> ; ${num(k)}).`}]);
  return pointQ({instr:C.t,prompt:'',nom:'P',x:[-3,8],y:[-3,8],snap:.1,tol:.3,cible:C.p,fond:{f:C.f.concat([{f:'x',c:2,dash:true}])},
    explain:C.ex+' Les courbes de exp et de ln sont symétriques par rapport à la droite y = x (en pointillés).',
    hint:'Souviens-toi : e⁰ = 1, ln 1 = 0, e¹ = e ≈ 2,72 et ln e = 1.'})};
/* 2. Règles de calcul : sous la forme ln k */
const gM2LeProp=()=>{const a=R(2,9),b=R(2,9),p=R(2,4),m=Math.random();
  if(m<.4)return nq({instr:'Écris sous la forme ln k. Que vaut k ?',prompt:mx(`ln ${a} + ln ${b}`),labels:['k ='],t:[a*b],
    explain:`Une somme de logarithmes est le logarithme du produit : ln ${a} + ln ${b} = ln(${a} × ${b}) = ln ${a*b}.`,hint:'ln a + ln b = ln(ab).',diag:([v])=>near(v,a+b,1e-6)?'log-prod':null});
  if(m<.7)return nq({instr:'Écris sous la forme ln k. Que vaut k ?',prompt:mx(`ln ${a*b} ${MINUS} ln ${b}`),labels:['k ='],t:[a],
    explain:`Une différence de logarithmes est le logarithme du quotient : ln ${a*b} − ln ${b} = ln(${a*b}/${b}) = ln ${a}.`,hint:'ln a − ln b = ln(a/b).',diag:([v])=>near(v,a*b-b,1e-6)?'log-quot':null});
  return nq({instr:'Écris sous la forme ln k. Que vaut k ?',prompt:mx(`${p} ln ${a}`),labels:['k ='],t:[a**p],
    explain:`Le facteur devant le ln remonte en exposant : ${p} ln ${a} = ln(${a}<sup>${p}</sup>) = ln ${a**p}.`,hint:'n ln a = ln(aⁿ).',diag:([v])=>near(v,p*a,1e-6)?'explog':null})};
/* 3. Simplifier en n ln b */
const gM2LeSimp=()=>{const b=pick([2,3,5]),p=R(1,b===5?3:4),q=R(1,b===5?2:3),r=R(1,3),inv=Math.random()<.5,N=p+q-r,T=x=>String(b**x);
  const sx=`ln ${T(p)} + ln ${T(q)} `+(inv?`+ ln ${fr(1,T(r))}`:`${MINUS} ln ${T(r)}`);
  return nq({instr:`Écris A sous la forme n ln ${b}. Que vaut n ?`,prompt:mx(`A = ${sx}`),labels:['n ='],t:[N],
    explain:`On écrit chaque nombre comme une puissance de ${b} : ln(${b}<sup>k</sup>) = k ln ${b}${inv?` et ln(1/${b}<sup>${r}</sup>) = −${r} ln ${b}`:''}. Donc A = (${p} + ${q} ${MINUS} ${r}) ln ${b} = ${num(N)} ln ${b}.`,
    hint:`${b**2} = ${b}², ${b**3} = ${b}³… et ln(aⁿ) = n ln a.`,diag:([v])=>near(v,p+q+r,1e-6)?'log-quot':null})};
/* 4. Domaine de ln(ax + b) */
const gM2LeDom=()=>{const a=nz(-4,4),b=nz(-6,6),L=M2LE_fr(-b,a),Lw=M2LE_fr(b,a);
  const ok=a>0?`]${L} ; +∞[`:`]−∞ ; ${L}[`,o=[{h:mx(ok),ok:true},{h:mx(a>0?`]−∞ ; ${L}[`:`]${L} ; +∞[`),tag:'ineq-flip'},{h:mx(a>0?`[${L} ; +∞[`:`]−∞ ; ${L}]`),tag:'m2le-dom'},{h:mx(a>0?`]${Lw} ; +∞[`:`]−∞ ; ${Lw}[`),tag:'signe'}];
  return mcq('Sur quel ensemble f est-elle définie ?',mx(`f(x) = ln(${M2LE_lin(a,b)})`),o,
    `Il faut ${M2LE_lin(a,b)} &gt; 0, soit ${M2LE_lin(a,0)} &gt; ${num(-b)}${a<0?', et en divisant par un nombre négatif on change le sens : ':' : '}x ${a>0?'&gt;':'&lt;'} ${L}. Le bord est exclu, car ln 0 n’existe pas.`,
    'Ce qui est dans le ln doit être strictement positif.')};
/* 5. Équation avec une exponentielle (figure) */
const gM2LeEqE=()=>{const a=pick([1,2,3,-1,-2]),b=R(-3,3),c=R(2,9),k=Math.random()<.5?R(2,4):1,x=(Math.log(c)-b)/a,ex=M2LE_lin(a,b);
  return nq({instr:'Résous l’équation (valeur exacte, par exemple (ln 5 − 1)/2).',prompt:mx(`${k>1?k:''}${M2LE_E(ex)} = ${k*c}`)+FIG.plot({x:[-6,6],y:[-1,c+3],pas:1,pasy:2,f:[`exp(${a}*x${sg(b)})`,{f:String(c),c:1,dash:true}]}),labels:['x ='],t:[x],
    explain:`${k>1?`On divise par ${k} : ${M2LE_E(ex)} = ${c}. `:''}${c} &gt; 0, on applique ln : ${ex} = ln ${c}, donc x = ${b?`(ln ${c} ${b<0?'+':MINUS} ${Math.abs(b)})`:`ln ${c}`}${a!==1?`/${a<0?`(${num(a)})`:a}`:''} ≈ ${dec(x,3)}. Sur la figure, c’est l’abscisse du point où la courbe coupe la droite y = ${c}.`,
    hint:'Isole l’exponentielle, puis applique ln aux deux membres.',diag:([v])=>near(v,(c-b)/a,1e-6)||near(v,(k*c-b)/a,1e-6)?'explog':near(v,Math.log(c)/a-b,1e-6)&&b?'calc':null})};
/* 6. Équation avec un logarithme (figure) */
const gM2LeEqL=()=>{const a=R(1,3),b=R(-5,5),k=pick([-1,0,1,2]),x=(Math.exp(k)-b)/a,u=M2LE_lin(a,b);
  return nq({instr:'Résous l’équation (valeur exacte, par exemple (e² + 3)/2).',prompt:mx(`ln(${u}) = ${num(k)}`)+FIG.plot({x:[-6,14],y:[-3,4],pas:2,pasy:1,f:[`ln(${a}*x${sg(b)})`,{f:String(k),c:1,dash:true}]}),labels:['x ='],t:[x],
    explain:`Domaine : ${u} &gt; 0. On applique exp : ${u} = e<sup>${num(k)}</sup>${k===0?' = 1':''}, donc x = ${k===0?M2LE_fr(1-b,a):b?`(e<sup>${num(k)}</sup> ${b<0?'+':MINUS} ${Math.abs(b)})${a>1?`/${a}`:''}`:`e<sup>${num(k)}</sup>${a>1?`/${a}`:''}`} ≈ ${dec(x,3)}. Cette valeur rend ${u} égal à e<sup>${num(k)}</sup> &gt; 0 : elle est bien dans le domaine.`,
    hint:'ln u = k ⟺ u = eᵏ.',diag:([v])=>near(v,(k-b)/a,1e-6)?'log-def':near(v,(Math.log(Math.abs(k)||1)-b)/a,1e-6)?'log-def':null})};
/* 7. Inéquations (figure) */
const gM2LeIneq=()=>{if(Math.random()<.55){const a=pick([-2,-1,1,2,3]),c=R(2,9),L=a===1?`ln ${c}`:a===-1?`${MINUS}ln ${c}`:a>0?fr(`ln ${c}`,a):`${MINUS}${fr(`ln ${c}`,-a)}`,Lw=M2LE_fr(c,a);
    const ok=a>0?`[${L} ; +∞[`:`]−∞ ; ${L}]`,fl=a>0?`]−∞ ; ${L}]`:`[${L} ; +∞[`,nl=a>0?`[${Lw} ; +∞[`:`]−∞ ; ${Lw}]`;
    return mcq('Résous l’inéquation.',mx(`${M2LE_E(M2LE_lin(a,0))} ≥ ${c}`)+FIG.plot({x:[-4,4],y:[-1,11],pas:1,pasy:2,f:[`exp(${a}*x)`,{f:String(c),c:1,dash:true}]}),
      [{h:mx(ok),ok:true},{h:mx(fl),tag:'ineq-flip'},{h:mx(nl),tag:'explog'}],
      `ln est croissante, on l’applique sans changer le sens : ${M2LE_lin(a,0)} ≥ ln ${c}.${a<0?' On divise par un nombre négatif : le sens change.':''} Donc x ${a>0?'≥':'≤'} ${L}. Sur la figure, ce sont les x où la courbe est au-dessus de la droite.`,
      'Applique ln aux deux membres, puis isole x.')}
  const k=pick([-1,1,2]);
  return mcq('Résous l’inéquation.',mx(`ln x &lt; ${num(k)}`)+FIG.plot({x:[-2,9],y:[-3,3],pas:1,f:['ln(x)',{f:String(k),c:1,dash:true}]}),
    [{h:mx(`]0 ; e<sup>${num(k)}</sup>[`),ok:true},{h:mx(`]−∞ ; e<sup>${num(k)}</sup>[`),tag:'m2le-dom'},{h:mx(`]e<sup>${num(k)}</sup> ; +∞[`),tag:'ineq-flip'},{h:mx(`]0 ; ${num(k)}[`),tag:'log-def'}],
    `Domaine : x &gt; 0. exp est croissante : ln x &lt; ${num(k)} ⟺ x &lt; e<sup>${num(k)}</sup>. Avec le domaine : 0 &lt; x &lt; e<sup>${num(k)}</sup>.`,'N’oublie pas que ln x n’existe que pour x &gt; 0.')};
/* 8. Temps de doublement (figure) */
const gM2LeDoub=()=>{const t=pick([2,3,4,5,6,8]),m=pick([2,2,3]),q=1+t/100,v=Math.log(m)/Math.log(q),n=Math.ceil(v-1e-9);
  return nq({instr:'Résous le problème (nombre entier d’années).',prompt:stx(`Un capital est placé à ${t} % par an : chaque année il est multiplié par ${num(q)}. Au bout de combien d’années pleines aura-t-il été multiplié par ${m} pour la première fois ?`)
      +FIG.plot({x:[0,n+8],y:[0,m+1],pas:5,pasy:1,f:[`${q}^x`,{f:String(m),c:1,dash:true}]}),labels:['n ='],t:[n],
    explain:`On veut ${num(q)}<sup>n</sup> ≥ ${m}. On applique ln (croissante) : n ln ${num(q)} ≥ ln ${m}, et ln ${num(q)} &gt; 0, donc n ≥ ln ${m} / ln ${num(q)} ≈ ${dec(v)}. Le premier entier qui convient est ${n}.`,
    hint:'Écris qⁿ ≥ m, puis applique ln : n ln q ≥ ln m.',diag:([w])=>near(w,Math.floor(v),1e-6)?'arrondi':near(w,Math.ceil(m*100/t),1e-6)||near(w,Math.ceil((m-1)*100/t),1e-6)?'explog':null})};
/* 9. Dériver avec exp et ln */
const gM2LeDer=()=>{const a=nz(-4,4),b=R(1,5),k=R(1,6),c=pick([
  {f:`exp(${a}x${sg(b)})`,d:`${a}*exp(${a}x${sg(b)})`,e:`(e<sup>u</sup>)′ = u′e<sup>u</sup> avec u = ${M2LE_lin(a,b)}, u′ = ${num(a)}.`},
  {f:`x*exp(${a}x)`,d:`exp(${a}x)+${a}x*exp(${a}x)`,e:`Produit : (uv)′ = u′v + uv′ avec u = x et v = e<sup>${M2LE_lin(a,0)}</sup>, v′ = ${num(a)}e<sup>${M2LE_lin(a,0)}</sup>. Donc f ′(x) = (1 ${a<0?MINUS:'+'} ${Math.abs(a)}x)e<sup>${M2LE_lin(a,0)}</sup>.`},
  {f:`ln(${Math.abs(a)}x+${b})`,d:`${Math.abs(a)}/(${Math.abs(a)}x+${b})`,e:`(ln u)′ = u′/u avec u = ${M2LE_lin(Math.abs(a),b)}, u′ = ${Math.abs(a)}.`},
  {f:'x*ln(x)',d:'ln(x)+1',e:'Produit : (x)′ ln x + x × (1/x) = ln x + 1.'},
  {f:`ln(x^2+${k})`,d:`2x/(x^2+${k})`,e:`(ln u)′ = u′/u avec u = x² + ${k}, u′ = 2x.`},
  {f:'exp(x^2)',d:'2x*exp(x^2)',e:'(e<sup>u</sup>)′ = u′e<sup>u</sup> avec u = x², u′ = 2x.'}]);
  return exprQ('Dérive la fonction.',mx('f(x) = ')+M(c.f),'f ′(x) =',c.d,c.e,'(e<sup>u</sup>)′ = u′e<sup>u</sup>, (ln u)′ = u′/u, (uv)′ = u′v + uv′.',false,([u])=>{try{return equiv(u,c.f)?'m2le-der':null}catch(e){return null}})};
/* 10. Croissances comparées (figure) */
const gM2LeLim=()=>{const n=R(2,4),C=pick([
  {e:`x<sup>${n}</sup>e<sup>−x</sup>`,w:'en +∞',f:`x^${n}*exp(-x)`,x:[0,16],y:[-1,8],r:'0',ex:`x<sup>${n}</sup>e<sup>−x</sup> = x<sup>${n}</sup>/e<sup>x</sup> : l’exponentielle l’emporte sur la puissance, la limite est 0.`},
  {e:`e<sup>x</sup>/x<sup>${n}</sup>`,w:'en +∞',f:`exp(x)/x^${n}`,x:[0,16],y:[-2,40],r:'+∞',ex:'L’exponentielle l’emporte sur toute puissance de x : la limite est +∞.'},
  {e:'(ln x)/x',w:'en +∞',f:'ln(x)/x',x:[0,20],y:[-1,1],r:'0',ex:'La puissance x l’emporte sur le logarithme : la limite est 0.'},
  {e:'x ln x',w:'en 0⁺',f:'x*ln(x)',x:[0,2],y:[-1,1],r:'0',ex:'Forme « 0 × (−∞) » levée par croissances comparées : x ln x tend vers 0 en 0⁺.'},
  {e:'x − ln x',w:'en +∞',f:'x-ln(x)',x:[0,20],y:[-2,20],r:'+∞',ex:'x − ln x = x(1 − (ln x)/x) et (ln x)/x → 0 : la limite est +∞.'},
  {e:'x e<sup>x</sup>',w:'en −∞',f:'x*exp(x)',x:[-10,1],y:[-1,1],r:'0',ex:'Avec X = −x → +∞ : x eˣ = −X/e<sup>X</sup>, et l’exponentielle l’emporte : la limite est 0.'},
  {e:`e<sup>x</sup> − x<sup>${n}</sup>`,w:'en +∞',f:`exp(x)-x^${n}`,x:[0,12],y:[-20,60],r:'+∞',ex:`e<sup>x</sup> − x<sup>${n}</sup> = e<sup>x</sup>(1 − x<sup>${n}</sup>/e<sup>x</sup>) et x<sup>${n}</sup>/e<sup>x</sup> → 0 : la limite est +∞.`}]);
  const P=C.x[1]-C.x[0]>10?2:C.x[1]-C.x[0]>5?1:.5;
  return mcq(`Quelle est la limite ${C.w} ?`,mx(C.e)+FIG.plot({x:C.x,y:C.y,pas:P,pasy:(C.y[1]-C.y[0])/8,f:[C.f]}),['0','+∞','−∞','1'].map(h=>({h:mx(h),ok:h===C.r,tag:'limite-fi'})),
    C.ex,'Croissances comparées : exponentielle ≫ puissance ≫ logarithme.',true)};
/* 11. Raisonner : équation en e^x (changement de variable) */
const gM2LeR1=()=>{let p,q;do{p=R(1,6);q=pick([R(1,7),-R(1,5)])}while(q===p||q===-p);const s=p+q,P=p*q;
  const eq=`e<sup>2x</sup> ${s<0?'+':MINUS} ${Math.abs(s)===1?'':Math.abs(s)}e<sup>x</sup> ${P<0?MINUS:'+'} ${Math.abs(P)} = 0`;
  const L=r=>r===1?'0':`ln ${r}`,setT=a=>a.length?`x = ${a.map(L).join(' ou x = ')}`:'Aucune solution';
  return chain({instr:'Résous l’équation en construisant ton raisonnement.',prompt:mx(eq)+FIG.plot({x:[-3,2.5],y:[-12,12],pas:1,pasy:4,f:[`exp(2x)-(${s})*exp(x)+(${P})`]}),
    steps:[
      {q:'Quelle idée mène à la solution ?',o:[
        {h:mx(`Poser X = e<sup>x</sup> : X² ${s<0?'+':MINUS} ${Math.abs(s)===1?'':Math.abs(s)}X ${P<0?MINUS:'+'} ${Math.abs(P)} = 0`),ok:true},
        {h:mx(`Appliquer ln à chaque terme : 2x ${s<0?'+':MINUS} ${Math.abs(s)===1?'':Math.abs(s)}x ${P<0?MINUS:'+'} ln ${Math.abs(P)} = 0`),why:'ln ne se distribue pas sur une somme : ln(A + B) n’est pas ln A + ln B.',tag:'log-prod'},
        {h:mx(`Diviser par e<sup>x</sup> : e<sup>x</sup> ${s<0?'+':MINUS} ${Math.abs(s)} ${P<0?MINUS:'+'} ${Math.abs(P)} = 0`),why:`Diviser ${Math.abs(P)} par e<sup>x</sup> donne ${Math.abs(P)}e<sup>−x</sup>, pas ${Math.abs(P)} : l’équation obtenue est fausse.`}]},
      {q:'Les solutions en X sont…',o:[
        {h:`X = ${num(Math.min(p,q))} ou X = ${num(Math.max(p,q))}`,ok:true,r:[p,q]},
        {h:`X = ${num(-Math.max(p,q))} ou X = ${num(-Math.min(p,q))}`,r:[-p,-q],why:`Vérifie : leur somme doit être ${num(s)} et leur produit ${num(P)}. Erreur de signe.`,tag:'signe'},
        {h:'Aucune : le discriminant est négatif',r:[],why:`Δ = ${s*s} ${P<0?'+':MINUS} ${Math.abs(4*P)} = ${s*s-4*P} &gt; 0 : il y a deux solutions.`,tag:'calc'}]},
      {q:'On revient à x. Conclusion :',o:prev=>{const r=prev[1].r,pos=r.filter(v=>v>0).sort((a,b)=>a-b),neg=r.some(v=>v<=0);
        const O=[{h:setT(pos),ok:true}];
        if(r.length){O.push({h:`x = ${r.slice().sort((a,b)=>a-b).map(num).join(' ou x = ')}`,why:'On a trouvé X = eˣ, pas x : il faut encore appliquer ln.',tag:'log-def'});
          if(neg)O.push({h:setT(r.map(Math.abs).sort((a,b)=>a-b)),why:'eˣ = X est impossible si X ≤ 0 : une exponentielle est toujours positive. On ne change pas le signe.',tag:'explog'});
          else O.push({h:`x = ${r.slice().sort((a,b)=>a-b).map(v=>`e<sup>${v}</sup>`).join(' ou x = ')}`,why:'eˣ = X ⟺ x = ln X : c’est ln qu’on applique, pas exp.',tag:'log-def'})}
        else O.push({h:setT([Math.max(p,q)]),why:'Cela ne découle pas de ton étape précédente.'});
        return O}}],
    explain:`On pose X = eˣ &gt; 0 : X² ${s<0?'+':MINUS} ${Math.abs(s)===1?'':Math.abs(s)}X ${P<0?MINUS:'+'} ${Math.abs(P)} = 0 a pour solutions ${num(p)} et ${num(q)} (somme ${num(s)}, produit ${num(P)}). ${q<0?`eˣ = ${num(q)} est impossible ; e<sup>x</sup> = ${p} donne x = ${L(p)}.`:`eˣ = ${p} et eˣ = ${q} donnent x = ${L(p)} et x = ${L(q)}.`} La courbe coupe l’axe des abscisses en ${q<0?'un seul point':'deux points'}.`})};
/* 12. Raisonner : équation avec deux logarithmes */
const gM2LeR2=()=>{let r,a;do{r=R(1,6);a=nz(-5,6)}while(r+a<1);const c=r*(r+a),M0=Math.max(0,-a),A=x=>`x ${a<0?MINUS:'+'} ${Math.abs(a)}`;
  const sq=k=>{const s=Math.sqrt(k);return Number.isInteger(s)?[s,num(s)]:[s,`√${k}`]};
  const ST=a=>a.length?`S = {${a.map(z=>z[1]).join(' ; ')}}`:'S = ∅ : aucune solution';
  return chain({instr:'Résous l’équation en construisant ton raisonnement.',prompt:mx(`ln x + ln(${A('x')}) = ln ${c}`),
    steps:[
      {q:'Domaine de l’équation :',o:[
        {h:mx(`x &gt; ${M0}`),ok:true,lo:M0,st:1},
        {h:mx(`x ≥ ${M0}`),lo:M0,st:0,why:`ln 0 n’existe pas : il faut une inégalité stricte.`,tag:'m2le-dom'},
        {h:'Aucune condition : tous les réels',lo:-Infinity,st:0,why:'Ce qui est dans un ln doit être strictement positif : il y a des conditions.',tag:'m2le-dom'},
        a<0?{h:mx('x &gt; 0'),lo:0,st:1,why:`Il faut aussi ${A('x')} &gt; 0, soit x &gt; ${-a}.`,tag:'m2le-dom'}:{h:mx(`x &gt; ${num(-a)}`),lo:-a,st:1,why:'Il faut aussi x &gt; 0 pour que ln x existe.',tag:'m2le-dom'}]},
      {q:'On regroupe les logarithmes :',o:[
        {h:mx(`ln(x(${A('x')})) = ln ${c}`),ok:true,k:'p'},
        {h:mx(`ln(2x ${a<0?MINUS:'+'} ${Math.abs(a)}) = ln ${c}`),k:'s',why:'ln A + ln B = ln(A × B), pas ln(A + B).',tag:'log-prod'},
        {h:mx(`ln(x² ${a<0?MINUS:'+'} ${Math.abs(a)}) = ln ${c}`),k:'b',why:`x(${A('x')}) = x² ${a<0?MINUS:'+'} ${Math.abs(a)}x : le facteur x se distribue sur les deux termes.`,tag:'distrib'}]},
      {q:'L’équation obtenue a pour solutions…',o:prev=>{const k=prev[1].k;
        if(k==='p')return[{h:`x = ${num(r)} ou x = ${num(-(r+a))}`,ok:true,R:[[r,num(r)],[-(r+a),num(-(r+a))]]},
          {h:`x = ${num(-r)} ou x = ${num(r+a)}`,R:[[-r,num(-r)],[r+a,num(r+a)]],why:`Vérifie dans x² ${a<0?MINUS:'+'} ${Math.abs(a)}x ${MINUS} ${c} = 0 : erreur de signe.`,tag:'signe'},
          {h:'Aucune : le discriminant est négatif',R:[],why:`Δ = ${a*a} + ${4*c} = ${a*a+4*c} &gt; 0.`,tag:'calc'}];
        if(k==='s'){const v=(c-a)/2,w=(c+a)/2;return[{h:`x = ${num(v)}`,ok:true,R:[[v,num(v)]]},{h:`x = ${num(w)}`,R:[[w,num(w)]],why:'Erreur de signe en isolant x.',tag:'signe'}]}
        const s=sq(c-a);return[{h:`x = ${s[1]} ou x = ${MINUS}${s[1]}`,ok:true,R:[[s[0],s[1]],[-s[0],MINUS+s[1]]]},{h:`x = ${s[1]}`,R:[[s[0],s[1]]],why:'x² = k a deux solutions, √k et −√k.'}]}},
      {q:'Conclusion :',o:prev=>{const d=prev[0],Rs=prev[2].R,inD=Rs.filter(z=>d.st?z[0]>d.lo+1e-9:z[0]>=d.lo-1e-9);
        return[{h:ST(inD),ok:true},{h:ST(Rs),why:'Une solution doit appartenir au domaine trouvé à l’étape 1.',tag:'m2le-dom'},{h:ST([]),why:'Au moins une valeur est dans le domaine : ne l’élimine pas.'},{h:ST([[r,num(r)]]),why:'Cette conclusion ne découle pas de tes étapes précédentes.'}]}}],
    explain:`Domaine : x &gt; 0 et ${A('x')} &gt; 0, soit x &gt; ${M0}. ln x + ln(${A('x')}) = ln(x(${A('x')})), donc x² ${a<0?MINUS:'+'} ${Math.abs(a)}x ${MINUS} ${c} = 0, de solutions ${num(r)} et ${num(-(r+a))}. Seul ${num(r)} est dans le domaine : S = {${num(r)}}.`})};
ANA_UNITS.push({id:'m2-ln-exp',tr:'m2',name:'Logarithme et exponentielle',sub:'Croissance, équations, croissances comparées',glyph:'e<sup>x</sup>',tone:'c',
  skills:[SKA('m2.le.graph','Lire les courbes de exp et ln',gM2LeGraph,1),SKA('m2.le.prop','Règles de calcul des ln',gM2LeProp,1),SKA('m2.le.dom','Domaine d’un logarithme',gM2LeDom,1),
    SKA('m2.le.simp','Simplifier une somme de ln',gM2LeSimp,2),SKA('m2.le.eqe','Équation avec une exponentielle',gM2LeEqE,2),SKA('m2.le.eql','Équation avec un logarithme',gM2LeEqL,2),
    SKA('m2.le.ineq','Inéquations avec exp et ln',gM2LeIneq,2),SKA('m2.le.doub','Temps de doublement',gM2LeDoub,2),SKA('m2.le.der','Dériver avec exp et ln',gM2LeDer,2),
    SKA('m2.le.r1','Raisonner : poser X = eˣ',gM2LeR1,2),SKA('m2.le.lim','Croissances comparées',gM2LeLim,3),SKA('m2.le.r2','Raisonner : équation avec deux ln',gM2LeR2,3)]});
