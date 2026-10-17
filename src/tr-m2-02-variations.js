/* ===================== MVA912 · Étude de variations ===================== */
Object.assign(ANA_ERR,{
  'm2-va-sens':{label:'Signe de f ′ mal traduit',tip:'f ′ > 0 : f croît (↗) ; f ′ < 0 : f décroît (↘). Un sommet correspond à f ′ qui passe de + à −.'},
  'm2-va-absc':{label:'Abscisse prise pour la valeur',tip:'Un extremum est une valeur f(x₀) ; x₀ dit seulement où il est atteint.'}});
/* Outils communs aux unités m2 (variations, étude, primitives, intégrale) */
/** Fraction exacte (objet Fr) écrite en HTML, entier si possible */
const m2F=q=>q.d===1?num(q.n):(q.n<0?MINUS:'')+fr(Math.abs(q.n),q.d);
/** Retire les options en double d'une étape de raisonnement (garde la bonne) */
const m2Uniq=o=>{const out=[];o.forEach(x=>{const i=out.findIndex(y=>y.h===x.h);if(i<0)out.push(x);else if(x.ok&&!out[i].ok)out[i]=x});return out};
/** Tableau de signes / de variations : xs = abscisses (texte), sgs = signes entre deux abscisses, vals = valeurs de f sous chaque abscisse ('' si rien) */
const m2Tab=(xs,sgs,vals,o={})=>{const n=xs.length,r1=['<i>x</i>'],r2=[o.der||'<i>f</i> ′(<i>x</i>)'],r3=[o.fn||'<i>f</i>'];
  xs.forEach((x,i)=>{r1.push(x);r2.push(i===0||i===n-1?'':(o.zero?o.zero[i]:'0'));r3.push(vals?vals[i]||'':'');
    if(i<n-1){r1.push('');r2.push(sgs[i]);r3.push(sgs[i]==='+'?'↗':sgs[i]==='−'?'↘':'')}});
  const tr=r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`;
  return`<div class="tscroll"><table class="ctable vt"><tbody>${tr(r1)}${tr(r2)}${vals?tr(r3):''}</tbody></table></div>`};
const m2Iv=(a,b,oa,ob)=>`${oa?']':'['}${a} ; ${b}${ob?'[':']'}`;

/* 1. Lire les variations sur une courbe */
const gM2VaLire=()=>{const a=pick([1,-1,.5,-.5]),h=nz(-2,2);let k;do{k=R(-2,2)}while(k===h);const f=`${a}*(x${sg(-h)})^2${sg(k)}`,up=a>0,ask=R(0,1);
  const prompt=FIG.plot({x:[-5,5],y:[-5,5],f:[f]})+stx('Voici la courbe d’une fonction f.');
  if(!ask)return mcq('Sur quel intervalle f est-elle croissante ?',prompt,
    [{h:up?m2Iv(num(h),'+∞',0,1):m2Iv('−∞',num(h),1,0),ok:true},{h:up?m2Iv('−∞',num(h),1,0):m2Iv(num(h),'+∞',0,1),tag:'m2-va-sens'},
     {h:up?m2Iv(num(k),'+∞',0,1):m2Iv('−∞',num(k),1,0),tag:'m2-va-absc'},{h:']−∞ ; +∞['}],
    `On lit de gauche à droite : la courbe ${up?'descend jusqu’au creux d’abscisse '+num(h)+', puis monte':'monte jusqu’au sommet d’abscisse '+num(h)+', puis descend'}. f est croissante sur ${up?m2Iv(num(h),'+∞',0,1):m2Iv('−∞',num(h),1,0)}. Les intervalles s’écrivent avec des abscisses, pas avec des ordonnées.`,
    'Parcours la courbe de gauche à droite : où monte-t-elle ?');
  return mcq(`Quel est le ${up?'minimum':'maximum'} de f ?`,prompt,
    [{h:`${up?'Minimum':'Maximum'} ${num(k)}, atteint en x = ${num(h)}`,ok:true},{h:`${up?'Minimum':'Maximum'} ${num(h)}, atteint en x = ${num(k)}`,tag:'m2-va-absc'},
     {h:`${up?'Maximum':'Minimum'} ${num(k)}, atteint en x = ${num(h)}`,tag:'m2-va-sens'},{h:`Pas d’extremum`}],
    `Le ${up?'creux':'sommet'} de la courbe a pour coordonnées (${num(h)} ; ${num(k)}). L’extremum est l’ordonnée ${num(k)} ; il est atteint pour x = ${num(h)}.`,'Repère le point le plus haut ou le plus bas, puis lis ses deux coordonnées.')};
/* 2. Nature d'un point critique d'après le signe de f ′ */
const gM2VaNat=()=>{const c=R(-6,6),[s1,s2]=pick([['+','−'],['−','+'],['+','+'],['−','−']]),k=s1==='+'&&s2==='−'?0:s1==='−'&&s2==='+'?1:2;
  return mcq('Que se passe-t-il pour f en x = '+num(c)+' ?',m2Tab(['−∞',num(c),'+∞'],[s1,s2])+stx('Voici le tableau de signes de f ′.'),
    [{h:`Un maximum local en ${num(c)}`,ok:k===0,tag:'m2-va-sens'},{h:`Un minimum local en ${num(c)}`,ok:k===1,tag:'m2-va-sens'},{h:`Pas d’extremum en ${num(c)}`,ok:k===2,tag:'extremum'}],
    k===2?`f ′ s’annule en ${num(c)} mais garde le même signe (${s1}) des deux côtés : f est ${s1==='+'?'croissante':'décroissante'} avant et après. C’est un palier, pas un extremum (comme x³ en 0).`
      :`f ′ passe de ${s1} à ${s2} : f ${s1==='+'?'monte puis descend : sommet, donc maximum local':'descend puis remonte : creux, donc minimum local'}.`,
    'Traduis chaque signe en flèche : + donne ↗, − donne ↘.',true)};
/* 3. Placer l'abscisse de l'extremum à partir de la courbe de f ′ (droite) */
const gM2VaRac=()=>{const m=pick([1,2,-1,-2,.5,-.5]),r=R(-7,7)/2,f=`${m}*(x${r<0?'+':'-'}${Math.abs(r)})`;
  return pointQ({instr:'La droite tracée est la courbe de f ′ (pas celle de f). Place sur l’axe des abscisses le point où f atteint son extremum.',
    prompt:stx('Courbe de la dérivée f ′.'),x:[-5,5],y:[-4,4],snap:.5,tol:.2,cible:[r,0],nom:'E',fond:{f:[f]},
    explain:`f ′ s’annule en x = ${num(r)} (là où sa courbe coupe l’axe) et change de signe : ${m>0?'négative avant, positive après : f descend puis monte, minimum':'positive avant, négative après : f monte puis descend, maximum'} en x = ${num(r)}.`,
    hint:'L’extremum de f est là où f ′ s’annule en changeant de signe : là où la droite traverse l’axe.'})};
/* 4. Lire un maximum de f sur la courbe de f ′ (parabole) */
const gM2VaDerG=()=>{let r1,r2;do{r1=R(-3,2);r2=R(r1+1,3)}while(r2-r1>4);const s=pick([1,-1]),max=R(0,1),f=`${s}*(x${sg(-r1)})*(x${sg(-r2)})`;
  const t=(s>0)===!!max?r1:r2,o=t===r1?r2:r1;
  return nq({instr:`En quelle abscisse f admet-elle un ${max?'maximum':'minimum'} local ?`,prompt:FIG.plot({x:[-5,5],y:[-5,5],f:[{f,c:2}]})+stx('La courbe tracée est celle de la dérivée f ′.'),labels:['x ='],t:[t],
    explain:`f ′ s’annule en ${num(r1)} et ${num(r2)}. Son signe : ${s>0?'+ puis − puis +':'− puis + puis −'}. Donc f ${s>0?'↗ ↘ ↗':'↘ ↗ ↘'} : maximum local en ${num(s>0?r1:r2)}, minimum local en ${num(s>0?r2:r1)}.`,
    hint:'Au-dessus de l’axe, f ′ > 0 et f monte. Un maximum de f, c’est là où f ′ passe de + à −.',diag:([v])=>near(v,o,1e-6)?'m2-va-sens':null})};
/* 5. Calculer puis placer le sommet d'une parabole */
const gM2VaSom=()=>{const a=pick([1,-1]),h=R(-3,3),k=R(-3,3),P=poly([a,-2*a*h,a*h*h+k]);
  return pointQ({instr:'Calcule les coordonnées du point où f atteint son extremum, puis place-le.',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(P),
    x:[-5,5],y:[-5,5],snap:1,tol:.4,cible:[h,k],nom:'S',fond:{},
    explain:`f ′(x) = ${M(poly([2*a,-2*a*h]))} s’annule en x = ${num(h)}. f(${num(h)}) = ${num(k)}. Le ${a>0?'minimum':'maximum'} est le point S(${num(h)} ; ${num(k)}).`,
    hint:'Résous f ′(x) = 0 pour l’abscisse, puis calcule f en ce point pour l’ordonnée.',diag:pt=>near(pt[0],k,.01)&&near(pt[1],h,.01)?'m2-va-absc':null})};
/* 6. Choisir le bon tableau de variations */
const gM2VaTab=()=>{const a=pick([1,-1,2,-2]),h=nz(-3,3),c=R(-5,5),b=-2*a*h,k=a*h*h+b*h+c;
  const T=(x,s,v)=>m2Tab(['−∞',num(x),'+∞'],s,['',num(v),'']),up=a>0?['−','+']:['+','−'],dn=a>0?['+','−']:['−','+'];
  return mcq('Quel est le tableau de variations de f ?',`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(poly([a,b,c])),
    [{h:T(h,up,k),ok:true},{h:T(h,dn,k),tag:'m2-va-sens'},{h:T(-h,up,a*h*h-b*h+c),tag:'signe'},{h:T(h,up,c),tag:'calc'}],
    `f ′(x) = ${M(poly([2*a,b]))}, nulle en x = ${num(h)}, ${a>0?'négative puis positive':'positive puis négative'} (coefficient ${num(2*a)}). f ${a>0?'décroît puis croît':'croît puis décroît'}, ${a>0?'minimum':'maximum'} f(${num(h)}) = ${num(k)}.`,
    'Dérive, cherche où f ′ s’annule, puis regarde son signe de part et d’autre.')};
/* 7. Points critiques d'une fonction de degré 3 */
const gM2VaCrit=()=>{let r1,r2;do{r1=R(-4,3);r2=R(r1+1,4)}while((r1+r2)%2);const p=-3*(r1+r2)/2,q=3*r1*r2,d=R(-5,5);
  return nq({instr:'Trouve les deux valeurs où f ′ s’annule (la plus petite d’abord).',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(poly([1,p,q,d])),labels:['x₁ =','x₂ ='],t:[r1,r2],
    explain:`f ′(x) = ${M(poly([3,2*p,q]))} = 3(${M(poly([1,-(r1+r2),r1*r2]))}) = 3(x ${r1<0?'+':'−'} ${Math.abs(r1)})(x ${r2<0?'+':'−'} ${Math.abs(r2)}). Elle s’annule en ${num(r1)} et ${num(r2)}.`,
    hint:'Dérive, mets 3 en facteur, puis résous le trinôme (somme et produit des racines, ou discriminant).',
    diag:([u,v])=>near(u,r2,1e-6)&&near(v,r1,1e-6)?'calc':null})};
/* 8. Raisonner : variations d'un trinôme */
const gM2VaR1=()=>{const a=pick([1,-1,2,-2,3]),h=nz(-4,4),c=R(-5,5),b=-2*a*h,f=x=>new Fr(a).mul(x).mul(x).add(new Fr(b).mul(x)).add(new Fr(c));
  return chain({instr:'Étudie les variations de f en construisant ton raisonnement.',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(poly([a,b,c])),
    steps:[
      {q:'La dérivée est…',o:m2Uniq([{h:M(poly([2*a,b])),ok:true,d:[2*a,b]},{h:M(poly([a,b])),d:[a,b],why:'(x²)′ = 2x : le coefficient de x² doit être multiplié par 2.',tag:'derivee'},
        {h:M(poly([2*a,b+c])),d:[2*a,b+c],why:'La dérivée de la constante est nulle : elle disparaît.',tag:'derivee'}])},
      {q:'f ′(x) = 0 pour…',o:prev=>{const[d0,d1]=prev[0].d,x0=new Fr(-d1,d0),xb=new Fr(d1,d0);
        return m2Uniq([{h:'x = '+m2F(x0),ok:true,x:x0},{h:'x = '+m2F(xb),x:xb,why:`On isole x : ${num(d0)}x = ${num(-d1)}, attention au signe.`,tag:'signe'},
          {h:'x = '+m2F(new Fr(-d0,d1||1)),x:new Fr(-d0,d1||1),why:'On divise par le coefficient de x, pas par la constante.',tag:'calc'}])}},
      {q:'Le signe de f ′ est…',o:prev=>{const d0=prev[0].d[0],x=m2F(prev[1].x);return[
        {h:`négatif avant ${x}, positif après`,ok:d0>0,k:'-+',why:`f ′ est affine de coefficient ${num(d0)} : elle est d’abord ${d0>0?'négative':'positive'}.`,tag:'signe'},
        {h:`positif avant ${x}, négatif après`,ok:d0<0,k:'+-',why:`f ′ est affine de coefficient ${num(d0)} : elle est d’abord ${d0>0?'négative':'positive'}.`,tag:'signe'},
        {h:`positif partout`,k:'+',why:'Une fonction affine non constante change de signe en sa racine.'}]}},
      {q:'Conclusion :',o:prev=>{const x0=prev[1].x,k=prev[2].k,v=m2F(f(x0)),xs=m2F(x0);
        if(k==='+')return[{h:'f est croissante sur ℝ, sans extremum',ok:true},{h:`Minimum : f(${xs}) = ${v}`,why:'Ton étude du signe ne donnait pas de changement de signe.'}];
        return m2Uniq([{h:`Minimum : f(${xs}) = ${v}`,ok:k==='-+',why:'f ′ passe de + à − : f monte puis descend, c’est un maximum.',tag:'m2-va-sens'},
          {h:`Maximum : f(${xs}) = ${v}`,ok:k==='+-',why:'f ′ passe de − à + : f descend puis monte, c’est un minimum.',tag:'m2-va-sens'},
          {h:`${k==='-+'?'Minimum':'Maximum'} égal à ${xs}`,why:'C’est l’abscisse où l’extremum est atteint, pas sa valeur.',tag:'m2-va-absc'}])}}],
    explain:`f ′(x) = ${M(poly([2*a,b]))}, nulle en x = ${num(h)} ; ${a>0?'− puis +':'+ puis −'}. f ${a>0?'décroît puis croît : minimum':'croît puis décroît : maximum'} f(${num(h)}) = ${num(a*h*h+b*h+c)}.`})};
/* 9. Raisonner : variations d'une fonction de degré 3 */
const gM2VaR2=()=>{const p=R(1,3),q=R(-5,5),a=pick([1,-1]),f=x=>a*(x**3-3*p*p*x)+q,Fs=poly([a,0,-3*a*p*p,q]);
  return chain({instr:'Étudie les variations de f en construisant ton raisonnement.',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(Fs),
    steps:[
      {q:'La dérivée est…',o:[{h:M(poly([3*a,0,-3*a*p*p])),ok:true,r:[-p,p],rs:[num(-p),num(p)]},
        {h:M(poly([3*a,-3*a*p*p,0])),r:[0,p*p].sort((u,v)=>u-v),rs:[0,p*p].sort((u,v)=>u-v).map(num),why:`La dérivée de ${num(-3*a*p*p)}x est ${num(-3*a*p*p)} : le x disparaît.`,tag:'derivee'},
        {h:M(poly([a,0,-3*a*p*p])),r:[-p*Math.sqrt(3),p*Math.sqrt(3)],rs:[`${MINUS}${p>1?p:''}√3`,`${p>1?p:''}√3`],why:'(x³)′ = 3x² : il manque le facteur 3.',tag:'derivee'}]},
      {q:'f ′ s’annule en…',o:prev=>{const{rs}=prev[0];return m2Uniq([{h:`${rs[0]} et ${rs[1]}`,ok:true},{h:`${num(-p*p)} et ${num(p*p)}`,why:`On résout x² = ${p*p} : les solutions sont ${num(-p)} et ${p}, pas ±${p*p}.`,tag:'calc'},{h:`0 seulement`,why:'Un trinôme peut s’annuler deux fois : factorise-le.',tag:'calc'}])}},
      {q:'Le signe de f ′ est…',o:prev=>{const rs=prev[0].rs;return[
        {h:`+ avant ${rs[0]}, − entre, + après ${rs[1]}`,ok:a>0,k:1,why:`Le coefficient de x² dans f ′ est ${a>0?'positif':'négatif'} : signe ${a>0?'+':'−'} à l’extérieur des racines.`,tag:'signe'},
        {h:`− avant ${rs[0]}, + entre, − après ${rs[1]}`,ok:a<0,k:-1,why:`Le coefficient de x² dans f ′ est ${a>0?'positif':'négatif'} : signe ${a>0?'+':'−'} à l’extérieur des racines.`,tag:'signe'},
        {h:`+ partout`,k:0,why:'f ′ s’annule en changeant de signe : elle ne peut pas rester positive.',tag:'signe'}]}},
      {q:'Le maximum local de f vaut…',o:prev=>{const{r,rs}=prev[0],k=prev[2].k;if(!k)return[{h:'Il n’y a pas de maximum local',ok:true},{h:dec(f(r[0]),2),why:'Avec f ′ positive partout, f n’a pas de sommet.'}];
        const iM=k>0?0:1,iN=1-iM,ex=Number.isInteger(r[iM]),val=v=>ex?num(f(v)):'≈ '+dec(f(v),2);
        return m2Uniq([{h:`f(${rs[iM]}) = ${val(r[iM])}`,ok:true},{h:`f(${rs[iN]}) = ${val(r[iN])}`,why:'Là, f ′ passe de − à + : c’est le minimum local.',tag:'m2-va-sens'},{h:`${rs[iM]}`,why:'C’est l’abscisse du sommet, pas sa valeur.',tag:'m2-va-absc'}])}}],
    explain:`f ′(x) = ${M(poly([3*a,0,-3*a*p*p]))} = ${num(3*a)}(x − ${p})(x + ${p}). Signe ${a>0?'+ − +':'− + −'} : maximum local f(${num(a>0?-p:p)}) = ${num(f(a>0?-p:p))}, minimum local f(${num(a>0?p:-p)}) = ${num(f(a>0?p:-p))}.`})};
ANA_UNITS.push({id:'m2-variations',tr:'m2',name:'Variations',sub:'Signe de f ′, tableau, extremums, optimisation',glyph:'↗↘',tone:'sq',
  skills:[SKA('m2.va.lire','Lire les variations sur une courbe',gM2VaLire,1),SKA('m2.va.nat','Sommet, creux ou palier ?',gM2VaNat,1),SKA('m2.va.rac','Extremum lu sur la courbe de f ′',gM2VaRac,1),
    SKA('m2.va.derg','Maximum à partir de f ′',gM2VaDerG,2),SKA('m2.va.som','Calculer et placer un sommet',gM2VaSom,2),SKA('m2.va.tab','Choisir le tableau de variations',gM2VaTab,2),
    SKA('m2.va.crit','Points critiques d’un degré 3',gM2VaCrit,2),SKA('m2.va.cub','Valeur d’un minimum local',gEtCub,2),SKA('m2.va.r1','Raisonner : un trinôme',gM2VaR1,2),
    SKA('m2.va.r2','Raisonner : un degré 3',gM2VaR2,3),SKA('m2.va.opt','Optimiser un volume',gEtBox,3)]});
