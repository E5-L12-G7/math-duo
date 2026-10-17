/* ===================== Parcours Fonctions et suites — partie 2 =====================
   Suites arithmétiques et géométriques (Tsag), suites : récurrence et limites (Tsui),
   primitives et intégrales (Tintfct), équations différentielles (Ted).
   Préfixes : fonctions gFs2…, outils fs2…, étiquettes d’erreur 'fs2-…'. */
Object.assign(ANA_ERR,{
  'fs2-geolim':{label:'Limite de qⁿ',tip:'q &gt; 1 : qⁿ → +∞ ; −1 &lt; q &lt; 1 : qⁿ → 0 ; q = 1 : qⁿ = 1 ; q ≤ −1 : pas de limite. Puis multiplie par le coefficient (règle des signes).'},
  'fs2-fi':{label:'Forme indéterminée',tip:'Seuls ∞ − ∞, 0 × ∞, ∞/∞ et 0/0 sont indéterminés. +∞ + ∞ = +∞, k × ∞ = ∞ (k ≠ 0), k/∞ = 0.'},
  'fs2-aire':{label:'Intégrale ou aire',tip:'Quand la fonction change de signe, l’intégrale compte négativement la partie sous l’axe ; l’aire additionne les morceaux en valeur absolue.'},
  'fs2-moy':{label:'Valeur moyenne',tip:'μ = (1/(b − a)) × ∫ₐᵇ f : n’oublie pas de diviser l’intégrale par la longueur de l’intervalle.'},
  'fs2-rang':{label:'Rang à partir duquel',tip:'Résous u<sub>n+1</sub> − u<sub>n</sub> ≥ 0, puis prends le plus petit entier n qui convient (arrondi au-dessus).'},
  'fs2-rec':{label:'Rédaction d’une récurrence',tip:'Initialisation au premier rang, hypothèse « pour un certain k », hérédité qui utilise l’hypothèse, conclusion.'},
  'fs2-ed-a':{label:'Forme y′ = ay',tip:'Isole y′ : my′ + ny = 0 donne y′ = −(n/m)y. Le nombre a est le coefficient de y une fois y′ seul.'}
});

/* ---------- outils ---------- */
const fs2n='<i>n</i>',fs2x='<i>x</i>';
const fs2Q=v=>v instanceof Fr?v:new Fr(v);
const fs2Fr=f=>{f=fs2Q(f);return f.d===1?num(f.n):(f.n<0?MINUS:'')+fr(Math.abs(f.n),f.d)};          // fraction HTML
const fs2F=(p,q)=>fs2Fr(new Fr(p,q));
const fs2Lin=f=>{f=fs2Q(f);return f.d===1?num(f.n):`${f.n<0?MINUS:''}${Math.abs(f.n)}/${f.d}`};       // fraction sur une ligne (exposants)
const fs2Ex=(f,v='x')=>{f=fs2Q(f);const s=f.n<0?MINUS:'',a=Math.abs(f.n);return f.d===1?`${s}${a===1?'':a}${v}`:`${s}${a===1?'':a}${v}/${f.d}`}; // ax écrit en ligne
const fs2Ply=terms=>{let o='';for(const[c0,s]of terms){const c=fs2Q(c0);if(c.n===0)continue;const neg=c.n<0,a=new Fr(Math.abs(c.n),c.d);
  const co=(a.n===1&&a.d===1&&s)?'':fs2Fr(a);o+=(o?(neg?' − ':' + '):(neg?MINUS:''))+co+s}return o||'0'};   // somme de termes c·s
const fs2Xp=d=>d===0?'':d===1?fs2x:`${fs2x}<sup>${d}</sup>`;
const fs2PH=arr=>fs2Ply(arr.map((c,i)=>[c,fs2Xp(arr.length-1-i)]));                                     // polynôme (Fr) en HTML
const fs2PV=(arr,x)=>arr.reduce((s,c)=>s.mul(new Fr(x)).add(fs2Q(c)),new Fr(0));                           // valeur exacte
const fs2Co=v=>{v=fs2Q(v);return v.n===v.d?'':v.n===-v.d?MINUS:fs2Fr(v)};   // coefficient devant une lettre
const fs2Pl=h=>h.startsWith(MINUS)?' − '+h.slice(1):' + '+h;   // « + terme » ou « − terme »
const fs2Sg=v=>(v<0?'− ':'+ ')+num(Math.abs(v));
const fs2Cst=(a,str)=>{try{const b=parse(str);let n=0,d0=null;for(const x of[-2.3,-1.1,-.4,.6,1.7,2.9,4.2]){const u=ev(a,x),v=ev(b,x);if(!isFinite(v))continue;if(!isFinite(u))return false;
  const d=u-v;if(d0===null)d0=d;else if(Math.abs(d-d0)>1e-7*Math.max(1,Math.abs(v)))return false;n++}return n>=3}catch(e){return false}};
/* Primitive : toute réponse qui diffère de la cible d’une constante est acceptée */
const fs2PQ=(instr,prompt,label,target,explain,hint,diag)=>({type:'input',instr,prompt,fields:[{label,kind:'expr'}],check:([a])=>fs2Cst(a,target),explain,hint,diag,ans:[target]});
const fs2nq=(o,ans)=>{const q=nq(o);if(ans)q.ans=ans;return q};   // nq avec réponse attendue exacte (fraction, e…)
/* Terme général d’une suite : la touche x s’affiche n */
const fs2NQ=(instr,prompt,target,explain,hint,diag)=>({type:'input',instr,prompt,fields:[{label:'u<sub>n</sub> =',kind:'expr',v:'n'}],check:([a])=>eqv(a,target),explain,hint,diag,ans:[target]});

/* ======================= Suites arithmétiques et géométriques ======================= */
const gFs2SagExpr=()=>{const s=pick([0,1]);
  if(Math.random()<.5){const a=R(-9,9),r=nz(-6,6),u0=a-s*r,t=`${a}+(${r})*(x-${s})`;
    return fs2NQ('Exprime u<sub>n</sub> en fonction de n.',stx(`La suite (u<sub>n</sub>) est définie par u<sub>${s}</sub> = ${num(a)} et, pour tout n ≥ ${s}, u<sub>n+1</sub> = u<sub>n</sub> ${fs2Sg(r)}.`),t,
      `On ajoute ${num(r)} à chaque étape : la suite est arithmétique de raison r = ${num(r)}. ${s?`Elle commence à u<sub>1</sub> : u<sub>n</sub> = u<sub>1</sub> + (n − 1)r = ${num(a)} + (n − 1) × (${num(r)}), soit`:'u<sub>n</sub> = u<sub>0</sub> + nr, soit'} u<sub>n</sub> = ${fs2Ply([[r,fs2n],[u0,'']])}.`,
      'On ajoute ou on multiplie ? Arithmétique : u<sub>n</sub> = u<sub>p</sub> + (n − p)r. (La touche x s’affiche n.)',
      ([u])=>s&&eqv(u,`${a}+(${r})*x`)?'suite-indice':eqv(u,`${a}*(${r})^(x-${s})`)?'suite-type':null)}
  const a=nz(-9,9),q=pick([2,3,4,.5,1.5]),t=`${a}*${q}^(x-${s})`;
  return fs2NQ('Exprime u<sub>n</sub> en fonction de n.',stx(`La suite (u<sub>n</sub>) est définie par u<sub>${s}</sub> = ${num(a)} et, pour tout n ≥ ${s}, u<sub>n+1</sub> = ${num(q)}u<sub>n</sub>.`),t,
    `On multiplie par ${num(q)} à chaque étape : la suite est géométrique de raison q = ${num(q)}. ${s?`Elle commence à u<sub>1</sub> : u<sub>n</sub> = u<sub>1</sub> × q<sup>n − 1</sup> = ${num(a)} × ${num(q)}<sup>n − 1</sup> (c’est aussi u<sub>0</sub> × q<sup>n</sup> avec u<sub>0</sub> = ${num(a)} ÷ ${num(q)}).`:`u<sub>n</sub> = u<sub>0</sub> × q<sup>n</sup> = ${num(a)} × ${num(q)}<sup>n</sup>.`}`,
    'On ajoute ou on multiplie ? Géométrique : u<sub>n</sub> = u<sub>p</sub> × q<sup>n − p</sup>. (La touche x s’affiche n.)',
    ([u])=>s&&eqv(u,`${a}*${q}^x`)?'suite-indice':eqv(u,`${a}+${q}*(x-${s})`)?'suite-type':null)};

const gFs2SagRq=()=>{
  if(Math.random()<.55){const p=R(1,6),gap=R(2,5),m=p+gap,r=nz(-7,7),u0=R(-15,15),up=u0+p*r,um=u0+m*r;
    return nq({instr:'Détermine la raison et le premier terme.',prompt:stx(`(u<sub>n</sub>) est une suite arithmétique telle que u<sub>${p}</sub> = ${num(up)} et u<sub>${m}</sub> = ${num(um)}.`),labels:['r =','u<sub>0</sub> ='],t:[r,u0],
      explain:`Entre u<sub>${p}</sub> et u<sub>${m}</sub>, il y a ${gap} pas : ${gap}r = ${num(um)} − ${num(up)} = ${num(um-up)}, donc r = ${num(r)}. Puis u<sub>0</sub> = u<sub>${p}</sub> − ${p}r = ${num(up)} − ${num(p*r)} = ${num(u0)}.`,
      hint:'u<sub>m</sub> = u<sub>p</sub> + (m − p)r : compte les pas entre les deux termes.',diag:([v])=>near(v,(um-up)/m,1e-6)||near(v,(um-up)/(gap+1),1e-6)?'suite-indice':null})}
  const q=pick([2,3]),gap=pick([2,3]),p=R(1,3),c=R(1,6),um=c*q**gap,u0=new Fr(c,q**p);
  return fs2nq({instr:'Détermine la raison et le premier terme.',prompt:stx(`(u<sub>n</sub>) est une suite géométrique de raison positive telle que u<sub>${p}</sub> = ${c} et u<sub>${p+gap}</sub> = ${um}.`),labels:['q =','u<sub>0</sub> ='],t:[q,u0.val()],
    explain:`De u<sub>${p}</sub> à u<sub>${p+gap}</sub>, on multiplie ${gap} fois par q : q<sup>${gap}</sup> = ${um} ÷ ${c} = ${q**gap}, donc q = ${q}. Puis u<sub>0</sub> = u<sub>${p}</sub> ÷ q<sup>${p}</sup> = ${c} ÷ ${q**p} = ${fs2Fr(u0)}.`,
    hint:'Fais le quotient des deux termes : u<sub>m</sub> ÷ u<sub>p</sub> = q<sup>m − p</sup>.',diag:([v])=>near(v,um/c,1e-6)?'suite-indice':near(v,(um-c)/gap,1e-6)?'suite-type':null},[String(q),`${u0.n}/${u0.d}`])};

const gFs2SagSom=()=>{const v=R(0,2);let pr,S,cnt,fi,la,ex;
  if(v===0){const N=R(20,400);S=N*(N+1)/2;cnt=N;fi=1;la=N;pr=`1 + 2 + 3 + … + ${N}`;ex=`Formule de Gauss : 1 + 2 + … + n = n(n + 1)/2, ici ${N} × ${N+1} ÷ 2 = ${S}.`}
  else if(v===1){const m=R(5,30),N=R(m+20,m+120);S=N*(N+1)/2-(m-1)*m/2;cnt=N-m+1;fi=m;la=N;pr=`${m} + ${m+1} + ${m+2} + … + ${N}`;
    ex=`Il y a ${N} − ${m} + 1 = ${cnt} termes, de moyenne (${m} + ${N})/2 : S = ${cnt} × ${m+N} ÷ 2 = ${S}. Autre méthode : (1 + … + ${N}) − (1 + … + ${m-1}) = ${N*(N+1)/2} − ${(m-1)*m/2}.`}
  else{const d=pick([2,3,4,5]),k1=R(3,15),k2=R(k1+10,k1+60);cnt=k2-k1+1;fi=d*k1;la=d*k2;S=cnt*(fi+la)/2;pr=`${fi} + ${fi+d} + ${fi+2*d} + … + ${la}`;
    ex=`Suite arithmétique de raison ${d} : ${fi} = ${d} × ${k1} et ${la} = ${d} × ${k2}, donc il y a ${k2} − ${k1} + 1 = ${cnt} termes. S = ${cnt} × (${fi} + ${la}) ÷ 2 = ${S}.`}
  return nq({instr:'Calcule la somme.',prompt:mx(`S = ${pr}`),labels:['S ='],t:[S],explain:ex,
    hint:'Somme arithmétique : (nombre de termes) × (premier + dernier) ÷ 2. De u<sub>p</sub> à u<sub>m</sub>, il y a m − p + 1 termes.',
    diag:([w])=>near(w,(cnt-1)*(fi+la)/2,1e-6)||near(w,(cnt+1)*(fi+la)/2,1e-6)?'suite-somme':null})};

const gFs2SagLim=()=>{const a=nz(-6,6),b=R(-9,9),q=pick([-3,-2,-.5,.5,.9,1,1.5,2,3]);
  const c=q>1?(a>0?0:1):Math.abs(q)<1?2:q===1?3:4,O=['+∞','−∞',num(b),num(a+b),'Pas de limite'];
  const pr=mx(`lim ${num(a)} × ${q<0?`(${num(q)})`:num(q)}<sup>n</sup>${b?` ${fs2Sg(b)}`:''}`);
  return mcq('Quelle est la limite quand n → +∞ ?',pr,O.map((h,i)=>({h:mx(h),ok:i===c,tag:'fs2-geolim'})),
    `${q>1?`q = ${num(q)} &gt; 1, donc q<sup>n</sup> → +∞ ; multiplié par ${num(a)}, on obtient ${a>0?'+∞':'−∞'}.`:Math.abs(q)<1?`−1 &lt; q = ${num(q)} &lt; 1, donc q<sup>n</sup> → 0 et la limite vaut ${num(b)}.`:q===1?`q = 1 : q<sup>n</sup> = 1 pour tout n, la suite vaut ${num(a+b)}.`:`q = ${num(q)} ≤ −1 : q<sup>n</sup> change de signe et grossit, il n’a pas de limite.`}`,
    'Compare q à −1 et à 1, puis tiens compte du coefficient.',true)};

/* Raisonnement : prouver qu’une suite est arithmétique ou géométrique */
const gFs2SagR1=()=>{const kind=pick(['a','g','q']);let u,un;const al=nz(-7,7),be=nz(-9,9),c=R(2,9),k=pick([2,3,5]);
  if(kind==='a'){u=n=>al*n+be;un=fs2Ply([[al,fs2n],[be,'']])}else if(kind==='g'){u=n=>c*k**n;un=`${c} × ${k}<sup>n</sup>`}else{u=n=>n*n+be;un=fs2Ply([[1,`${fs2n}<sup>2</sup>`],[be,'']])}
  const d1=u(1)-u(0),d2=u(2)-u(1),D='u<sub>n+1</sub> − u<sub>n</sub>',Q='u<sub>n+1</sub> ÷ u<sub>n</sub>';
  const s1=[{h:`Calculer ${D} pour un n quelconque`,c:'d',ok:kind!=='g',why:'Avec une forme c × k<sup>n</sup>, la différence garde un facteur k<sup>n</sup> : pour une puissance de n, on teste le quotient.'},
    {h:`Calculer ${Q} pour un n quelconque`,c:'r',ok:kind==='g',why:'Ici n apparaît dans une somme, pas en exposant : on teste la différence, qui est l’outil des suites arithmétiques.'},
    {h:'Calculer u<sub>1</sub> − u<sub>0</sub> et u<sub>2</sub> − u<sub>1</sub>',c:'v',why:'Deux écarts ne prouvent rien « pour tout n » : il faut un calcul avec n quelconque.',tag:'raisonnement'}];
  const s2=prev=>{const c0=prev[0].c;
    if(c0==='v')return[{h:`u<sub>1</sub> − u<sub>0</sub> = ${num(d1)} et u<sub>2</sub> − u<sub>1</sub> = ${num(d2)}`,ok:true,eq:d1===d2,v:num(d1)},
      {h:`u<sub>1</sub> − u<sub>0</sub> = ${num(-d1)} et u<sub>2</sub> − u<sub>1</sub> = ${num(-d2)}`,eq:d1===d2,v:num(-d1),why:'On calcule le terme suivant moins le précédent, pas l’inverse.',tag:'signe'}];
    if(kind==='a')return c0==='d'?[{h:`${D} = ${num(al)}`,ok:true,cst:true,v:num(al)},{h:`${D} = ${num(al+2*be)}`,cst:true,v:num(al+2*be),why:`Le signe − porte sur toute l’expression : −(${un}) change aussi le signe de ${num(be)}.`,tag:'signe'},
        {h:`${D} = ${fs2Ply([[al,fs2n],[al+be,'']])}`,cst:false,why:'C’est u<sub>n+1</sub> lui-même : il faut encore lui retrancher u<sub>n</sub>.',tag:'calc'}]
      :[{h:`${Q} = ${fr(fs2Ply([[al,fs2n],[al+be,'']]),un)}`,ok:true,cst:false},{h:`${Q} = 1 + ${fr(1,fs2n)}`,cst:false,why:'On ne « simplifie » pas les n dans une somme : on ne peut pas réduire ce quotient ainsi.',tag:'calc'}];
    if(kind==='q')return c0==='d'?[{h:`${D} = ${fs2Ply([[2,fs2n],[1,'']])}`,ok:true,cst:false},{h:`${D} = 1`,cst:true,v:'1',why:'(n + 1)<sup>2</sup> = n<sup>2</sup> + 2n + 1, et non n<sup>2</sup> + 1.',tag:'calc'},
        {h:`${D} = ${fs2Ply([[2,fs2n],[1+2*be,'']])}`,cst:false,why:`Le signe − porte sur toute l’expression : −(${un}) change aussi le signe de ${num(be)}.`,tag:'signe'}]
      :[{h:`${Q} = ${fr(`(${fs2n} + 1)<sup>2</sup> ${fs2Sg(be)}`,un)}`,ok:true,cst:false},{h:`${Q} = 1 + ${fr(1,`${fs2n}<sup>2</sup>`)}`,cst:false,why:'On ne « simplifie » pas les n dans une somme.',tag:'calc'}];
    return c0==='d'?[{h:`${D} = ${num(c*(k-1))} × ${k}<sup>n</sup>`,ok:true,cst:false},{h:`${D} = ${num(c*k)}`,cst:true,v:num(c*k),why:`${k}<sup>n+1</sup> − ${k}<sup>n</sup> = ${k}<sup>n</sup>(${k} − 1) : on factorise, le résultat dépend de n.`,tag:'calc'}]
      :[{h:`${Q} = ${k}`,ok:true,cst:true,v:String(k)},{h:`${Q} = ${num(c*k)}`,cst:true,v:num(c*k),why:`Le facteur ${c} est au numérateur et au dénominateur : il se simplifie.`,tag:'calc'},
        {h:`${Q} = ${fr(1,k)}`,cst:true,v:fr(1,k),why:'On divise u<sub>n+1</sub> par u<sub>n</sub>, pas l’inverse.',tag:'calc'}]};
  const s3=prev=>{const c0=prev[0].c,p=prev[1];
    if(c0==='v')return p.eq?[{h:'On peut seulement conjecturer : il faut un calcul pour tout n',ok:true},{h:`(u<sub>n</sub>) est arithmétique de raison ${p.v}`,why:'Deux écarts égaux ne prouvent pas que tous les écarts sont égaux.',tag:'raisonnement'},{h:'(u<sub>n</sub>) n’est pas arithmétique',why:'Les deux écarts sont égaux : rien ne permet de l’affirmer.'}]
      :[{h:'(u<sub>n</sub>) n’est pas arithmétique : deux écarts sont différents',ok:true},{h:'On ne peut rien conclure avec deux valeurs',why:'Pour prouver qu’une suite n’est PAS arithmétique, un seul contre-exemple suffit : deux écarts différents.',tag:'raisonnement'},{h:'(u<sub>n</sub>) est géométrique',why:'Des écarts différents ne disent rien sur les quotients.',tag:'suite-type'}];
    if(c0==='d')return p.cst?[{h:`(u<sub>n</sub>) est arithmétique de raison ${p.v}`,ok:true},{h:`(u<sub>n</sub>) est géométrique de raison ${p.v}`,why:'Une différence constante caractérise une suite arithmétique.',tag:'suite-type'},{h:'(u<sub>n</sub>) n’est pas arithmétique',why:'La différence obtenue ne dépend pas de n.'}]
      :[{h:'(u<sub>n</sub>) n’est pas arithmétique : la différence dépend de n',ok:true},{h:`(u<sub>n</sub>) est arithmétique de raison ${p.h.split(' = ')[1]}`,why:'Une raison est un nombre fixe : une expression qui dépend de n ne convient pas.',tag:'suite-type'},{h:'(u<sub>n</sub>) est géométrique',why:'On n’a calculé qu’une différence : elle ne dit rien du quotient.',tag:'suite-type'}];
    return p.cst?[{h:`(u<sub>n</sub>) est géométrique de raison ${p.v}`,ok:true},{h:`(u<sub>n</sub>) est arithmétique de raison ${p.v}`,why:'Un quotient constant caractérise une suite géométrique.',tag:'suite-type'},{h:'(u<sub>n</sub>) n’est pas géométrique',why:'Le quotient obtenu ne dépend pas de n.'}]
      :[{h:'(u<sub>n</sub>) n’est pas géométrique : le quotient dépend de n',ok:true},{h:'(u<sub>n</sub>) est géométrique de raison 1',why:'Le quotient dépend de n : ce n’est pas une raison.',tag:'suite-type'},{h:'(u<sub>n</sub>) est arithmétique',why:'Un quotient non constant ne dit rien de la différence : il faudrait la calculer.',tag:'suite-type'}]};
  const ex=kind==='a'?`u<sub>n+1</sub> − u<sub>n</sub> = ${num(al)}(n + 1) ${fs2Sg(be)} − (${un}) = ${num(al)} : constante, donc (u<sub>n</sub>) est arithmétique de raison ${num(al)}.`
    :kind==='q'?`u<sub>n+1</sub> − u<sub>n</sub> = (n + 1)<sup>2</sup> ${fs2Sg(be)} − (${un}) = 2n + 1 : la différence dépend de n, donc (u<sub>n</sub>) n’est pas arithmétique.`
    :`Les termes sont non nuls et u<sub>n+1</sub> ÷ u<sub>n</sub> = (${c} × ${k}<sup>n+1</sup>) ÷ (${c} × ${k}<sup>n</sup>) = ${k} : constant, donc (u<sub>n</sub>) est géométrique de raison ${k} et de premier terme ${c}.`;
  return chain({instr:'Étudie la nature de la suite, en construisant ton raisonnement.',prompt:stx(`Pour tout entier n, u<sub>n</sub> = ${un}. Cette suite est-elle arithmétique ? géométrique ?`),
    steps:[{q:'Quel calcul fais-tu d’abord ?',o:s1},{q:'Le calcul donne…',o:s2},{q:'Que peux-tu conclure ?',o:s3}],explain:ex,
    hint:'n dans une somme : on teste la différence ; n en exposant : on teste le quotient.'})};

/* Raisonnement : suite auxiliaire pour u_{n+1} = a u_n + b */
const gFs2SagR2=()=>{const a=pick([2,3,.5]),l=nz(-6,6)*(a===.5?2:1),b=l*(1-a);let U;do U=R(-9,9);while(U===l);
  const vH=c=>`v<sub>n</sub> = u<sub>n</sub> ${fs2Sg(-c)}`,A=num(a);
  const s1=[{h:vH(l),c:l,ok:true},{h:vH(-l),c:-l,why:`Le point fixe vérifie ℓ = ${A}ℓ ${fs2Sg(b)}, soit ℓ = ${num(b)} ÷ (1 − ${A}) = ${num(l)} : erreur de signe.`,tag:'signe'},
    {h:vH(b),c:b,why:`Le nombre à retrancher est le point fixe ℓ = b ÷ (1 − a) = ${num(l)}, pas le terme constant b.`,tag:'point-fixe'}];
  if(a===2)s1.push({h:vH(l/2),c:l/2,why:'On a divisé b par a : le point fixe est b ÷ (1 − a).',tag:'point-fixe'});
  const vl=k=>`v<sub>n+1</sub> = ${A}v<sub>n</sub>${k?' '+fs2Sg(k):''}`;
  const s2=prev=>{const c=prev[0].c,k1=(a-1)*c+b,kA=b-c,kB=b-(a+1)*c;
    return[{h:vl(k1),ok:true,k:k1},{h:vl(kA),k:kA,why:`u<sub>n</sub> = v<sub>n</sub> ${fs2Sg(c)}, donc ${A}u<sub>n</sub> = ${A}v<sub>n</sub> ${fs2Sg(a*c)} : le coefficient ${A} multiplie aussi la constante.`,tag:'distrib'},
      {h:vl(kB),k:kB,why:`Si v<sub>n</sub> = u<sub>n</sub> ${fs2Sg(-c)}, alors u<sub>n</sub> = v<sub>n</sub> ${fs2Sg(c)} (et non l’inverse).`,tag:'signe'}]};
  const s3=prev=>{const k=prev[1].k;return[{h:`(v<sub>n</sub>) est géométrique de raison ${A}`,ok:k===0,why:k===0?'':'Il reste une constante dans v<sub>n+1</sub> : la suite n’est pas géométrique.',tag:'suite-type'},
    {h:`(v<sub>n</sub>) est arithmétique de raison ${A}`,why:'On multiplie v<sub>n</sub> par un nombre : ce n’est pas une suite arithmétique.',tag:'suite-type'},
    {h:'(v<sub>n</sub>) n’est ni arithmétique ni géométrique',ok:k!==0,why:k!==0?'':`v<sub>n+1</sub> = ${A}v<sub>n</sub> exactement : c’est la définition d’une suite géométrique.`}]};
  const fin=(c0,ad)=>`u<sub>n</sub> = ${num(c0)} × ${A}<sup>n</sup>${ad?' '+fs2Sg(ad):''}`;
  const s4=[{h:fin(U-l,l),ok:true},{h:fin(U-l,0),why:'On a obtenu v<sub>n</sub> : il faut revenir à u<sub>n</sub> = v<sub>n</sub> + ℓ.',tag:'calc'},
    {h:fin(U,l),why:`Le premier terme de (v<sub>n</sub>) est v<sub>0</sub> = u<sub>0</sub> − ℓ = ${num(U-l)}, pas u<sub>0</sub>.`,tag:'suite-indice'},
    {h:fin(U-l,-l),why:'u<sub>n</sub> = v<sub>n</sub> + ℓ : attention au signe en revenant à u<sub>n</sub>.',tag:'signe'}];
  return chain({instr:'Exprime u<sub>n</sub> en fonction de n, en construisant ton raisonnement.',prompt:stx(`u<sub>0</sub> = ${num(U)} et, pour tout n, u<sub>n+1</sub> = ${A}u<sub>n</sub> ${fs2Sg(b)}. On cherche une suite auxiliaire géométrique.`),
    steps:[{q:'Quelle suite auxiliaire poses-tu ?',o:s1},{q:'Exprime v<sub>n+1</sub> en fonction de v<sub>n</sub>.',o:s2},{q:'Que peux-tu dire de (v<sub>n</sub>) ?',o:s3},{q:'Donc, pour tout n…',o:s4}],
    explain:`Le point fixe vérifie ℓ = ${A}ℓ ${fs2Sg(b)}, d’où ℓ = ${num(l)}. On pose v<sub>n</sub> = u<sub>n</sub> ${fs2Sg(-l)} : v<sub>n+1</sub> = ${A}u<sub>n</sub> ${fs2Sg(b)} ${fs2Sg(-l)} = ${A}(v<sub>n</sub> ${fs2Sg(l)}) ${fs2Sg(b-l)} = ${A}v<sub>n</sub>. Donc (v<sub>n</sub>) est géométrique de raison ${A}, de premier terme v<sub>0</sub> = ${num(U-l)}, et u<sub>n</sub> = v<sub>n</sub> + ℓ = ${num(U-l)} × ${A}<sup>n</sup> ${fs2Sg(l)}.`,
    hint:'Cherche ℓ tel que ℓ = aℓ + b, puis pose v<sub>n</sub> = u<sub>n</sub> − ℓ.'})};

/* Raisonnement : somme de termes géométriques dans un problème */
const gFs2SagR3=()=>{const I0=pick([1000,2000,5000,20000]),t=pick([10,20,25,30,40]),N=pick([6,8,10,12]),q=1-t/100,rr=-I0*t/100;
  const s1=[{h:`multiplier par ${num(q)}`,ok:true,ty:'g',q},{h:`multiplier par ${num(t/100)}`,ty:'g',q:t/100,why:`Multiplier par ${num(t/100)} garde ${t} % du montant ; baisser de ${t} %, c’est en garder ${100-t} %.`,tag:'pourcent'},
    {h:`multiplier par ${num(1+t/100)}`,ty:'g',q:1+t/100,why:'Multiplier par 1 + t/100 correspond à une hausse, pas à une baisse.',tag:'pourcent'},
    {h:`soustraire ${num(-rr)} €`,ty:'a',r:rr,why:'Le pourcentage s’applique au montant du mois précédent : la baisse en euros change chaque mois.',tag:'pourcent'}];
  const s2=[{h:`${N} termes`,ok:true,m:N},{h:`${N-1} termes`,m:N-1,why:`De u<sub>0</sub> à u<sub>${N-1}</sub>, il y a ${N-1} − 0 + 1 = ${N} termes.`,tag:'suite-somme'},{h:`${N+1} termes`,m:N+1,why:`Le premier mois est u<sub>0</sub> et le dernier u<sub>${N-1}</sub> : cela fait ${N} termes.`,tag:'suite-somme'}];
  const s3=prev=>{const o=prev[0],m=prev[1].m;
    if(o.ty==='g'){const Q=o.q,Qs=num(Q);return[{h:`S = ${I0} × ${fr(`1 − ${Qs}<sup>${m}</sup>`,`1 − ${Qs}`)}`,ok:true,v:I0*(1-Q**m)/(1-Q)},
      {h:`S = ${I0} × ${Qs}<sup>${m}</sup>`,v:I0*Q**m,why:'C’est un seul terme de la suite, pas la somme.',tag:'suite-somme'},
      {h:`S = ${m} × ${fr(`${I0} + ${I0} × ${Qs}<sup>${m-1}</sup>`,2)}`,v:m*(I0+I0*Q**(m-1))/2,why:'« Nombre de termes × moyenne des extrêmes » ne vaut que pour une suite arithmétique.',tag:'suite-type'}]}
    const last=I0+(m-1)*o.r;return[{h:`S = ${m} × ${fr(`${I0} + ${num(last)}`,2)}`,ok:true,v:m*(I0+last)/2},{h:`S = ${num(last)}`,v:last,why:'C’est le dernier terme, pas la somme.',tag:'suite-somme'},
      {h:`S = ${I0} × ${fr(`1 − ${num(q)}<sup>${m}</sup>`,`1 − ${num(q)}`)}`,v:I0*(1-q**m)/(1-q),why:'Avec ton modèle, la suite est arithmétique : la formule géométrique ne s’applique pas.',tag:'suite-type'}]};
  const s4=prev=>{const v=prev[2].v;return[{h:`S ≈ ${num(Math.round(v))} €`,ok:true},{h:`S ≈ ${num(Math.round(I0/(1-q)))} €`,why:'I<sub>0</sub> ÷ (1 − q) est la limite de la somme quand le nombre de mois devient infini.',tag:'calc'},
    {h:`S ≈ ${num(Math.round(v-I0))} €`,why:'Le premier mois (u<sub>0</sub>) fait partie de la somme.',tag:'suite-somme'}]};
  const S=I0*(1-q**N)/(1-q);
  return chain({instr:'Calcule le total investi, en construisant ton raisonnement.',prompt:stx(`Une entreprise investit ${I0} € le premier mois, puis chaque mois un montant inférieur de ${t} % à celui du mois précédent. On note u<sub>0</sub> = ${I0} le montant du premier mois. Quel est le total investi sur ${N} mois ?`),
    steps:[{q:'Pour passer d’un mois au suivant, on doit…',o:s1},{q:`Combien de termes compte la somme u<sub>0</sub> + … + u<sub>${N-1}</sub> ?`,o:s2},{q:'Quelle formule donne le total ?',o:s3},{q:'Le total vaut…',o:s4}],
    explain:`Baisser de ${t} %, c’est multiplier par ${num(q)} : (u<sub>n</sub>) est géométrique de raison ${num(q)}. Les ${N} mois vont de u<sub>0</sub> à u<sub>${N-1}</sub>. S = ${I0} × (1 − ${num(q)}<sup>${N}</sup>) ÷ (1 − ${num(q)}) ≈ ${num(Math.round(S))} €.`,
    hint:'Traduis le pourcentage en coefficient multiplicateur, puis compte les termes.'})};

/* ======================= Suites : récurrence et limites ======================= */
const gFs2SuiExp=()=>{const v=R(0,2),k=R(2,10);let f,pr;
  if(v===0){const a=nz(-3,4),b=R(-6,6),c=R(-9,9);f=n=>a*n*n+b*n+c;pr=nPoly([a,b,c])}
  else if(v===1){const a=nz(-4,5),b=R(-9,9),c=R(1,5);f=n=>new Fr(a*n+b,n+c);pr=fr(nPoly([a,b]),nPoly([1,c]))}
  else{const a=nz(-3,5),b=R(-9,9);f=n=>a*2**n+b;pr=`${a===1?'':a===-1?MINUS:num(a)+' × '}2<sup>n</sup>${b?' '+fs2Sg(b):''}`}
  const val=n=>{const r=f(n);return r instanceof Fr?r.val():r},t=val(k),th=f(k) instanceof Fr?fs2Fr(f(k)):num(t);
  const fk=f(k);return fs2nq({instr:`Calcule u<sub>${k}</sub>.`,prompt:mx(`u<sub>n</sub> = ${pr}`),labels:[`u<sub>${k}</sub> =`],t:[t],
    explain:`On remplace n par ${k} dans la formule : u<sub>${k}</sub> = ${th}.`,hint:'Forme explicite : remplace n par le rang demandé, avec des parenthèses.',
    diag:([w])=>near(w,val(k+1),1e-6)||near(w,val(k-1),1e-6)?'suite-indice':null},fk instanceof Fr?[`${fk.n}/${fk.d}`]:null)};

const gFs2SuiVar=()=>{const b=R(-11,-3),c=R(-5,9),z=(-1-b)/2,n0=Math.max(0,Math.ceil(z));
  return nq({instr:'À partir de quel rang la suite est-elle croissante ?',prompt:mx(`u<sub>n</sub> = ${nPoly([1,b,c])}`)+stx(' Donne le plus petit entier n<sub>0</sub> tel que u<sub>n+1</sub> ≥ u<sub>n</sub> pour tout n ≥ n<sub>0</sub>.'),labels:['n<sub>0</sub> ='],t:[n0],
    explain:`u<sub>n+1</sub> − u<sub>n</sub> = (n + 1)<sup>2</sup> ${fs2Sg(b)}(n + 1) ${fs2Sg(c)} − (${nPoly([1,b,c])}) = 2n ${fs2Sg(1+b)}. Cette différence est positive ou nulle pour n ≥ ${num(z)}, donc à partir du rang ${n0} (n est entier).`,
    hint:'Calcule u<sub>n+1</sub> − u<sub>n</sub>, puis résous « ≥ 0 ».',diag:([w])=>near(w,z,1e-6)&&z!==n0||near(w,n0-1,1e-6)||near(w,n0+1,1e-6)?'fs2-rang':null})};

/* Raisonnement : démonstration par récurrence */
const gFs2SuiR1=()=>{let Fk,Fk1,F0,u0,rec,calc,bad1,bad2,w1,w2;
  if(Math.random()<.5){const p=R(1,4);u0=p*p;F0=`(0 + ${p})<sup>2</sup> = ${p*p}`;Fk=`(k + ${p})<sup>2</sup>`;Fk1=`(k + ${p+1})<sup>2</sup>`;rec=`u<sub>n+1</sub> = u<sub>n</sub> + 2n + ${2*p+1}`;
    calc=`u<sub>k+1</sub> = ${Fk} + 2k + ${2*p+1} = k<sup>2</sup> + ${2*p+2}k + ${(p+1)**2} = ${Fk1}`;
    bad1=`u<sub>k+1</sub> = ${Fk} + 2k + ${2*p+1} = k<sup>2</sup> + 2k + ${p*p+2*p+1}`;w1=`(k + ${p})<sup>2</sup> = k<sup>2</sup> + ${2*p}k + ${p*p} : le double produit a été oublié.`;
    bad2=`u<sub>k+1</sub> = ${Fk} + 1 = ${Fk1}`;w2=`(k + ${p+1})<sup>2</sup> n’est pas (k + ${p})<sup>2</sup> + 1, et le terme 2k + ${2*p+1} a disparu.`}
  else{const c=nz(-5,5);u0=1+c;F0=`2<sup>0</sup> ${fs2Sg(c)} = ${num(1+c)}`;Fk=`2<sup>k</sup> ${fs2Sg(c)}`;Fk1=`2<sup>k+1</sup> ${fs2Sg(c)}`;rec=`u<sub>n+1</sub> = 2u<sub>n</sub> ${fs2Sg(-c)}`;
    calc=`u<sub>k+1</sub> = 2(${Fk}) ${fs2Sg(-c)} = 2<sup>k+1</sup> ${fs2Sg(2*c)} ${fs2Sg(-c)} = ${Fk1}`;
    bad1=`u<sub>k+1</sub> = 2(${Fk}) ${fs2Sg(-c)} = 2<sup>k+1</sup> ${fs2Sg(c)} ${fs2Sg(-c)} = 2<sup>k+1</sup>`;w1=`Le 2 multiplie aussi ${num(c)} : 2 × (${num(c)}) = ${num(2*c)}.`;
    bad2=`u<sub>k+1</sub> = 2(${Fk}) ${fs2Sg(-c)} = 4<sup>k</sup> ${fs2Sg(c)}`;w2='2 × 2<sup>k</sup> = 2<sup>k+1</sup>, pas 4<sup>k</sup>.'}
  const steps=[
    {q:'Initialisation : que fais-tu ?',o:[{h:`Je vérifie que u<sub>0</sub> = ${num(u0)} et que la formule donne ${F0} pour n = 0`,ok:true},
      {h:'Je vérifie la formule pour n = 0, 1 et 2, puis je conclus directement',why:'Quelques valeurs ne prouvent rien pour tout n : il faut aussi l’hérédité.',tag:'fs2-rec'},
      {h:'Je suppose la formule vraie pour tout n',why:'C’est exactement ce qu’on veut démontrer : on tournerait en rond.',tag:'fs2-rec'}]},
    {q:'Hérédité : quelle est l’hypothèse de récurrence ?',o:[{h:`Pour un certain entier k ≥ 0, u<sub>k</sub> = ${Fk}`,ok:true},
      {h:`Pour tout entier k ≥ 0, u<sub>k</sub> = ${Fk}`,why:'Supposer la propriété pour tout k, c’est admettre le résultat. On la suppose pour un certain k.',tag:'fs2-rec'},
      {h:`u<sub>k+1</sub> = ${Fk1}`,why:'C’est ce qu’il faut démontrer à l’étape d’hérédité, pas ce qu’on suppose.',tag:'fs2-rec'}]},
    {q:'Comment utilises-tu cette hypothèse ?',o:[{h:`J’écris u<sub>k+1</sub> avec la relation ${rec} et je remplace u<sub>k</sub> par ${Fk}`,ok:true},
      {h:`Je remplace k par k + 1 dans ${Fk}`,why:'Cela écrit le résultat voulu sans le démontrer : il faut partir de la définition de u<sub>k+1</sub>.',tag:'fs2-rec'},
      {h:'Je calcule u<sub>1</sub>, u<sub>2</sub> et u<sub>3</sub> pour voir si ça marche',why:'Des exemples ne démontrent pas l’hérédité pour un k quelconque.',tag:'fs2-rec'}]},
    {q:'Le calcul donne…',o:[{h:calc,ok:true},{h:bad1,why:w1,tag:'calc'},{h:bad2,why:w2,tag:'calc'}]}];
  return chain({instr:'Construis la démonstration par récurrence.',prompt:stx(`u<sub>0</sub> = ${num(u0)} et, pour tout n, ${rec}. Démontrer que, pour tout entier n ≥ 0, u<sub>n</sub> = ${Fk.replace(/k/g,'n')}.`),steps,
    explain:`Initialisation : u<sub>0</sub> = ${num(u0)} et ${F0}. Hérédité : on suppose u<sub>k</sub> = ${Fk} pour un certain k ≥ 0 ; alors ${calc}. Conclusion : la propriété est vraie au rang 0 et héréditaire, donc vraie pour tout n ≥ 0.`,
    hint:'Initialisation, hypothèse « pour un certain k », hérédité en partant de la définition de u<sub>k+1</sub>.'})};

/* Raisonnement : majorée + croissante ⇒ convergente */
const gFs2SuiR2=()=>{const m=pick([2,3,4]),j=R(1,4),l=m*j,b=(m-1)*j,U=R(l-8,l-1),f1=fr(1,m),fm=fr(m-1,m);
  const steps=[
    {q:`Hérédité de « u<sub>k</sub> &lt; ${l} » : de u<sub>k</sub> &lt; ${l}, on déduit…`,o:[
      {h:`${f1}u<sub>k</sub> + ${b} &lt; ${f1} × ${l} + ${b} = ${l}, donc u<sub>k+1</sub> &lt; ${l}`,ok:true},
      {h:`${f1}u<sub>k</sub> + ${b} &gt; ${f1} × ${l} + ${b} = ${l}, donc u<sub>k+1</sub> &gt; ${l}`,why:`Multiplier par ${f1} &gt; 0 conserve le sens de l’inégalité.`,tag:'ineq-flip'},
      {h:`u<sub>k+1</sub> &lt; u<sub>k</sub> &lt; ${l}`,why:'On ne sait pas que la suite décroît (elle croît, en fait) : on doit partir de la relation de récurrence.',tag:'raisonnement'}]},
    {q:'Sens de variation : u<sub>n+1</sub> − u<sub>n</sub> = …',o:[
      {h:`${b} − ${fm}u<sub>n</sub> = ${fm}(${l} − u<sub>n</sub>) &gt; 0 : la suite est croissante`,ok:true},
      {h:`${b} − ${fm}u<sub>n</sub> = ${fm}(${l} − u<sub>n</sub>) &lt; 0 : la suite est décroissante`,why:`D’après la première étape, u<sub>n</sub> &lt; ${l}, donc ${l} − u<sub>n</sub> &gt; 0.`,tag:'signe'},
      {h:`${b} &gt; 0 : la suite est croissante`,why:`u<sub>n+1</sub> − u<sub>n</sub> = ${f1}u<sub>n</sub> + ${b} − u<sub>n</sub> : on ne peut pas oublier les termes en u<sub>n</sub>.`,tag:'calc'}]},
    {q:'Que peux-tu conclure ?',o:[
      {h:'Croissante et majorée : la suite converge (convergence monotone)',ok:true},
      {h:'Croissante : la suite tend vers +∞',why:'Une suite croissante et majorée ne peut pas tendre vers +∞ : elle converge.',tag:'suite-thm'},
      {h:`Majorée par ${l} : la suite converge vers ${l}`,why:'« Majorée » seule ne suffit pas à converger, et le majorant n’est pas forcément la limite.',tag:'suite-thm'}]},
    {q:'Sa limite ℓ vérifie…',o:[
      {h:`ℓ = ${f1}ℓ + ${b}, donc ℓ = ${l}`,ok:true},{h:`ℓ = ${b}`,why:'Le terme constant de la relation n’est pas la limite : la limite vérifie ℓ = f(ℓ).',tag:'point-fixe'},
      {h:`ℓ = ${num(U)}`,why:'La limite ne dépend pas du premier terme : elle vérifie ℓ = f(ℓ).',tag:'point-fixe'},{h:'ℓ = 0',why:`(${f1})<sup>n</sup> → 0, mais la suite n’est pas (${f1})<sup>n</sup> : résous ℓ = f(ℓ).`,tag:'point-fixe'}]}];
  return chain({instr:'Montre que la suite converge et trouve sa limite.',prompt:stx(`u<sub>0</sub> = ${num(U)} et, pour tout n, u<sub>n+1</sub> = `)+mx(`${f1}u<sub>n</sub> + ${b}`)+stx(`. On veut montrer par récurrence que u<sub>n</sub> &lt; ${l} pour tout n, puis conclure.`),steps,
    explain:`Initialisation : u<sub>0</sub> = ${num(U)} &lt; ${l}. Hérédité : si u<sub>k</sub> &lt; ${l}, alors ${f1}u<sub>k</sub> + ${b} &lt; ${j} + ${b} = ${l}. Puis u<sub>n+1</sub> − u<sub>n</sub> = ${fm}(${l} − u<sub>n</sub>) &gt; 0 : la suite est croissante. Croissante et majorée, elle converge ; sa limite vérifie ℓ = ℓ/${m} + ${b}, d’où ℓ = ${l}.`,
    hint:'Majorée par récurrence, puis signe de u<sub>n+1</sub> − u<sub>n</sub>, puis théorème de convergence monotone.'})};

const gFs2SuiOps=()=>{const a=R(2,9),b=R(2,9),n=fs2n;
  const L=[[`${n}<sup>2</sup> + ${a}${n}`,0,`${n}<sup>2</sup> → +∞ et ${a}${n} → +∞ : la somme tend vers +∞.`],
    [`(${fr(1,`√${n}`)} + ${a})(${n}<sup>2</sup> + ${b})`,0,`Le premier facteur tend vers ${a} &gt; 0, le second vers +∞ : le produit tend vers +∞.`],
    [fr(a,`−${n}<sup>2</sup> − ${b}`),2,`Le dénominateur tend vers −∞ : un nombre divisé par l’infini tend vers 0.`],
    [`−${n}<sup>3</sup> + ${fr(a,n)}`,1,`−${n}<sup>3</sup> → −∞ et ${a}/n → 0 : la somme tend vers −∞.`],
    [`(${a} − ${fr(1,n)}) × (−${n})`,1,`Le premier facteur tend vers ${a} &gt; 0, le second vers −∞ : règle des signes, −∞.`],
    [`${n} − ${a}√${n}`,3,`${n} → +∞ et −${a}√${n} → −∞ : forme « ∞ − ∞ ». (En factorisant par n, on trouve +∞.)`],
    [`${n}<sup>2</sup> − ${a}${n} + ${b}`,3,`${n}<sup>2</sup> → +∞ et −${a}${n} → −∞ : forme « ∞ − ∞ ». (En factorisant par n<sup>2</sup>, on trouve +∞.)`],
    [fr(`${a}${n}<sup>2</sup> + ${b}`,`${n}<sup>2</sup> + ${n}`),3,`Numérateur et dénominateur tendent vers +∞ : forme « ∞/∞ ». (En factorisant, la limite vaut ${a}.)`],
    [`${fr(1,n)} × (${n}<sup>2</sup> + ${a})`,3,`1/n → 0 et n<sup>2</sup> + ${a} → +∞ : forme « 0 × ∞ ». (En développant, on trouve +∞.)`]];
  const[e,c,why]=pick(L),O=['+∞','−∞','0','Forme indéterminée'];
  return mcq('Que donnent directement les règles d’opérations sur les limites ?',mx(`lim ${e}`)+stx(' quand n → +∞'),O.map((h,i)=>({h,ok:i===c,tag:'fs2-fi'})),why,
    'Écris la limite de chaque morceau, puis applique la règle (somme, produit ou quotient).',true)};

/* Raisonnement : comparaison ou gendarmes */
const gFs2SuiR3=()=>{const fin=Math.random()<.5,n=fs2n;
  if(fin){const a=R(-5,5),tr=pick(['sin','cos']),T=`${tr}(${n})`,ex=`${a?num(a)+' + ':''}${fr(T,n)}`;
    return chain({instr:'Détermine la limite, en construisant ton raisonnement.',prompt:mx(`lim ${ex}`)+stx(' quand n → +∞'),steps:[
      {q:'Quel outil utiliser ?',o:[{h:'Le théorème des gendarmes (encadrement)',ok:true},{h:'Le théorème de comparaison',why:'La comparaison sert à montrer une limite infinie ; ici on attend une limite finie.',tag:'suite-thm'},
        {h:`Aucun : ${tr}(n) n’a pas de limite, donc la suite non plus`,why:`${tr}(n) n’a pas de limite, mais il est divisé par n qui tend vers +∞ : on peut encadrer.`,tag:'suite-thm'}]},
      {q:'Quel encadrement, pour n ≥ 1 ?',o:[{h:`−${fr(1,n)} ≤ ${fr(T,n)} ≤ ${fr(1,n)}`,ok:true},{h:`0 ≤ ${fr(T,n)} ≤ ${fr(1,n)}`,why:`${tr}(n) peut être négatif : la borne inférieure est −1/n.`,tag:'signe'},
        {h:`−1 ≤ ${fr(T,n)} ≤ 1`,why:'Encadrement juste mais inutile : −1 et 1 n’ont pas la même limite.',tag:'suite-thm'}]},
      {q:'Donc la limite vaut…',o:[{h:num(a),ok:true},{h:num(a+1),why:`${fr(T,n)} tend vers 0, pas vers 1 (ne confonds pas avec sin(x)/x quand x → 0).`,tag:'calc'},
        {h:'Pas de limite',why:'Les deux gendarmes tendent vers 0 : la suite est coincée et converge.',tag:'suite-thm'}]}],
      explain:`Pour n ≥ 1, −1 ≤ ${tr}(n) ≤ 1, donc −1/n ≤ ${tr}(n)/n ≤ 1/n. Comme −1/n → 0 et 1/n → 0, le théorème des gendarmes donne ${tr}(n)/n → 0, et la limite vaut ${num(a)}.`,
      hint:'Encadre le terme qui oscille, puis vérifie que les deux bornes ont la même limite.'})}
  const sq=Math.random()<.5,k=R(1,5),E=sq?`${n}<sup>2</sup> + (−1)<sup>n</sup>`:`${k===1?'':k}${n} + cos(${n})`,lo=sq?`${n}<sup>2</sup> − 1`:`${k===1?'':k}${n} − 1`,hi=sq?`${n}<sup>2</sup> + 1`:`${k===1?'':k}${n} + 1`,mid=sq?`${n}<sup>2</sup>`:`${k===1?'':k}${n}`,osc=sq?'(−1)<sup>n</sup>':'cos(n)';
  return chain({instr:'Détermine la limite, en construisant ton raisonnement.',prompt:mx(`lim ${E}`)+stx(' quand n → +∞'),steps:[
    {q:'Quel outil utiliser ?',o:[{h:'Le théorème de comparaison (minoration)',ok:true},{h:'Le théorème des gendarmes',why:'Les gendarmes servent pour une limite finie ; pour +∞, une minoration suffit.',tag:'suite-thm'},
      {h:`Aucun : ${osc} n’a pas de limite, donc la suite non plus`,why:`${osc} reste entre −1 et 1, alors que l’autre terme tend vers +∞ : on peut comparer.`,tag:'suite-thm'}]},
    {q:'Quelle inégalité ?',o:[{h:`${E} ≥ ${lo}`,ok:true},{h:`${E} ≤ ${hi}`,why:'Majorer par une suite qui tend vers +∞ ne permet rien de conclure.',tag:'suite-thm'},
      {h:`${E} ≥ ${mid}`,why:`Faux quand ${osc} est négatif.`,tag:'signe'}]},
    {q:'Donc la limite est…',o:[{h:'+∞',ok:true},{h:'Pas de limite',why:'La suite est minorée par une suite qui tend vers +∞ : elle tend vers +∞.',tag:'suite-thm'},
      {h:`finie, car ${osc} est bornée`,why:`${osc} est bornée, mais l’autre terme tend vers +∞.`,tag:'suite-thm'}]}],
    explain:`On a ${osc} ≥ −1, donc ${E} ≥ ${lo}. Or ${lo} → +∞ ; par comparaison, la suite tend vers +∞.`,hint:'Minore le terme qui oscille par −1.'})};

const gFs2SuiSeuil=()=>{if(Math.random()<.5){const u0=pick([1,2,3,5]),k=pick([2,3,4]),A=pick([100,500,1000,5000]);let n=0,u=u0;const L=[u0];while(u<A){n++;u*=k;L.push(u)}
    return nq({instr:'Détermine le rang demandé.',prompt:stx(`u<sub>0</sub> = ${u0} et u<sub>n+1</sub> = ${k}u<sub>n</sub>. L’algorithme « n ← 0 ; u ← ${u0} ; tant que u &lt; ${A} : n ← n + 1, u ← ${k}u » affiche n. Quelle valeur ?`),labels:['n ='],t:[n],
      explain:`Termes successifs : ${L.join(', ')}. Le premier terme ≥ ${A} est u<sub>${n}</sub> = ${u} : l’algorithme affiche ${n}.`,hint:'Calcule les termes un par un jusqu’à dépasser le seuil.',diag:([w])=>near(w,n-1,1e-6)||near(w,n+1,1e-6)?'suite-indice':null})}
  const[q,bb]=pick([[.9,1],[.8,2],[.5,5]]),l=bb/(1-q),u0=pick([0,1,2]),A=pick([6,7,8,9]);let n=0,u=u0;while(u<A){n++;u=q*u+bb}
  let prv=u0;for(let i=0;i<n-1;i++)prv=q*prv+bb;
  return nq({instr:'Détermine le rang demandé.',prompt:stx(`u<sub>0</sub> = ${u0} et u<sub>n+1</sub> = ${num(q)}u<sub>n</sub> + ${bb}. Quel est le plus petit n tel que u<sub>n</sub> ≥ ${A} ?`),labels:['n ='],t:[n],
    explain:`On calcule pas à pas (comme le ferait un programme « tant que u &lt; ${A} ») : u<sub>${n-1}</sub> ≈ ${dec(prv,3)} &lt; ${A} et u<sub>${n}</sub> ≈ ${dec(u,3)} ≥ ${A}. La suite croît vers ${Math.round(l)}, et le premier rang est ${n}.`,
    hint:'Calcule les termes un par un (à la calculatrice), jusqu’à dépasser le seuil.',diag:([w])=>near(w,n-1,1e-6)||near(w,n+1,1e-6)?'suite-indice':null})};

/* ======================= Primitives et intégrales ======================= */
const gFs2IntVerif=()=>{const a=R(1,5),b=nz(-6,6),k=R(2,5),c=R(1,9);
  const L=[[mx(`F(x) = ${fs2Ply([[a,fs2Xp(3)],[b,fs2x]])}`),mx(`f(x) = ${fs2Ply([[3*a,fs2Xp(2)],[b,'']])}`),1,`F′(x) = ${fs2Ply([[3*a,fs2Xp(2)],[b,'']])} = f(x).`],
    [mx(`F(x) = ${fs2Ply([[a,fs2Xp(3)],[b,fs2x]])}`),mx(`f(x) = ${fs2Ply([[a,fs2Xp(2)],[b,'']])}`),0,`F′(x) = ${fs2Ply([[3*a,fs2Xp(2)],[b,'']])} ≠ f(x) : l’exposant 3 descend en facteur.`],
    [mx(`F(x) = e<sup>${k}x</sup>`),mx(`f(x) = ${k}e<sup>${k}x</sup>`),1,`F′(x) = ${k}e<sup>${k}x</sup> = f(x).`],
    [mx(`F(x) = e<sup>${k}x</sup>`),mx(`f(x) = ${fr(`e<sup>${k}x</sup>`,k)}`),0,`F′(x) = ${k}e<sup>${k}x</sup> ≠ f(x). (C’est f qui serait une primitive de F/${k * k}… on vérifie toujours en dérivant F.)`],
    [mx('F(x) = x e<sup>x</sup>'),mx('f(x) = e<sup>x</sup>(x + 1)'),1,'F′(x) = 1 × e<sup>x</sup> + x e<sup>x</sup> = e<sup>x</sup>(x + 1) = f(x).'],
    [mx(`F(x) = ${fr('ln x','x')}`),mx(`f(x) = −${fr('ln x',`x<sup>2</sup>`)}`),0,`F′(x) = ${fr('(1/x) × x − ln x','x<sup>2</sup>')} = ${fr('1 − ln x','x<sup>2</sup>')} ≠ f(x).`],
    [mx(`F(x) = ln(x<sup>2</sup> + ${c})`),mx(`f(x) = ${fr('2x',`x<sup>2</sup> + ${c}`)}`),1,`Forme ln u avec u = x<sup>2</sup> + ${c} &gt; 0 : F′ = u′/u = 2x/(x<sup>2</sup> + ${c}) = f(x).`],
    [mx(`F(x) = ln(x<sup>2</sup> + ${c})`),mx(`f(x) = ${fr(1,`x<sup>2</sup> + ${c}`)}`),0,`F′ = u′/u = 2x/(x<sup>2</sup> + ${c}) ≠ f(x) : il manque u′ = 2x au numérateur.`],
    [mx(`F(x) = sin(${k}x)`),mx(`f(x) = ${k}cos(${k}x)`),1,`F′(x) = ${k}cos(${k}x) = f(x).`],
    [mx(`F(x) = sin(${k}x)`),mx(`f(x) = −${k}cos(${k}x)`),0,`F′(x) = ${k}cos(${k}x) ≠ f(x) : la dérivée de sin est cos, sans signe moins.`]];
  const[Fh,fh,yes,why]=pick(L);
  return mcq('F est-elle une primitive de f ?',`${Fh}<br>${fh}`,[{h:'Oui, car F′ = f',ok:!!yes,tag:'prim'},{h:'Non, car F′ ≠ f',ok:!yes,tag:'prim'},{h:'Oui, car f′ = F',tag:'prim'}],
    why.replace(/ \(C’est f.*$/,''),'Dérive F et compare avec f (et non l’inverse).',true)};

const gFs2IntPrim=()=>{const v=pick(['p','l','i','r','e','c','s']);let fh,t,ex,der=null,dom='';
  if(v==='p'){const a=3*nz(-2,2),b=2*R(-4,4),c=R(-6,6);fh=M(poly([a,b,c]));t=poly([a/3,b/2,c,0]);der=poly([2*a,b]);ex=`On monte chaque puissance de 1 et on divise par la nouvelle puissance : F(x) = ${M(t)} (+ une constante).`}
  else if(v==='l'){const k=R(2,9);fh=mx(`f(x) = ${fr(k,'x')}`);t=`${k}*ln(x)`;der=`-${k}/x^2`;dom=' sur ]0 ; +∞[';ex=`Une primitive de 1/x sur ]0 ; +∞[ est ln x, donc F(x) = ${k} ln x.`}
  else if(v==='i'){const k=R(2,9);fh=mx(`f(x) = ${fr(k,'x<sup>2</sup>')}`);t=`-${k}/x`;der=`-${2*k}/x^3`;dom=' sur ]0 ; +∞[';ex=`${k}/x<sup>2</sup> = ${k}x<sup>−2</sup> : on monte à x<sup>−1</sup> et on divise par −1, donc F(x) = −${k}/x.`}
  else if(v==='r'){const k=R(1,6);fh=mx(`f(x) = ${fr(k,'√x')}`);t=`${2*k}*sqrt(x)`;dom=' sur ]0 ; +∞[';ex=`Une primitive de 1/√x est 2√x, donc F(x) = ${2*k}√x.`}
  else if(v==='e'){const a=pick([-3,-2,2,3,4]),k=R(1,6);fh=mx(`f(x) = ${k===1?'':k}e<sup>${num(a)}x</sup>`);t=`(${k}/(${a}))*exp(${a}*x)`;der=`${k*a}*exp(${a}*x)`;
    ex=`Une primitive de e<sup>${num(a)}x</sup> est e<sup>${num(a)}x</sup>/${a<0?`(${num(a)})`:a} (en dérivant, le ${num(a)} ressort). Donc F(x) = ${fs2Co(new Fr(k,a))}e<sup>${num(a)}x</sup>.`}
  else if(v==='c'){const a=R(2,5),k=R(1,6);fh=mx(`f(x) = ${k===1?'':k}cos(${a}x)`);t=`(${k}/${a})*sin(${a}*x)`;der=`${-k*a}*sin(${a}*x)`;ex=`Une primitive de cos(${a}x) est sin(${a}x)/${a}. Donc F(x) = ${fs2Co(new Fr(k,a))}sin(${a}x).`}
  else{const a=R(2,5),k=R(1,6);fh=mx(`f(x) = ${k===1?'':k}sin(${a}x)`);t=`-(${k}/${a})*cos(${a}*x)`;der=`${k*a}*cos(${a}*x)`;ex=`Une primitive de sin(${a}x) est −cos(${a}x)/${a}. Donc F(x) = ${fs2Co(new Fr(-k,a))}cos(${a}x).`}
  return fs2PQ(`Donne une primitive de f${dom}.`,v==='p'?mx('f(x) = ')+fh:fh,'F(x) =',t,ex+' Vérifie en dérivant.','Lis le tableau des dérivées à l’envers, puis ajuste le coefficient.',
    ([u])=>der&&fs2Cst(u,der)?'prim':null)};

const gFs2IntComp=()=>{const v=R(0,3);let fh,t,ex,bad=null;
  if(v===0){const p=2*R(-3,3),q=R(-5,5),n=R(1,3),U=poly([1,p,q]);fh=M(`(${poly([2,p])})(${U})^${n}`);t=`(${U})^${n+1}/${n+1}`;bad=`(${U})^${n+1}`;
    ex=`Avec u(x) = ${M(U)}, on a u′(x) = ${M(poly([2,p]))} : f = u′u<sup>${n}</sup>, de primitive u<sup>${n+1}</sup>/${n+1}. Donc F(x) = (1/${n+1})(${M(U)})<sup>${n+1}</sup>.`}
  else if(v===1){const k=R(1,5),c=R(1,9);fh=mx(`f(x) = ${fr(`${k===1?'':k}x`,`√(x<sup>2</sup> + ${c})`)}`);t=`${k}*sqrt(x^2+${c})`;bad=`${2*k}*sqrt(x^2+${c})`;
    ex=`Avec u = x<sup>2</sup> + ${c}, u′ = 2x : f = ${fs2F(k,2)} × u′/√u, et une primitive de u′/√u est 2√u. Donc F(x) = ${k===1?'':k}√(x<sup>2</sup> + ${c}).`}
  else if(v===2){if(Math.random()<.5){const k=2*R(1,4);fh=mx(`f(x) = ${k}x e<sup>x<sup>2</sup></sup>`);t=`${k/2}*exp(x^2)`;bad=`${k}*exp(x^2)`;ex=`Avec u = x<sup>2</sup>, u′ = 2x : f = ${k/2} × u′e<sup>u</sup>, de primitive ${k/2}e<sup>u</sup>. Donc F(x) = ${k/2===1?'':k/2}e<sup>x<sup>2</sup></sup>.`}
    else{fh=mx('f(x) = x<sup>2</sup>e<sup>x<sup>3</sup></sup>');t='exp(x^3)/3';bad='exp(x^3)';ex='Avec u = x<sup>3</sup>, u′ = 3x<sup>2</sup> : f = (1/3) × u′e<sup>u</sup>, de primitive e<sup>u</sup>/3. Donc F(x) = (1/3)e<sup>x<sup>3</sup></sup>.'}}
  else{let p,q;do{p=R(-4,4);q=R(1,9)}while(p*p-4*q>=0);const U=poly([1,p,q]);fh=M(`(${poly([2,p])})/(${U})`);t=`ln(${U})`;bad=null;
    ex=`Avec u(x) = ${M(U)} &gt; 0 (discriminant négatif), u′(x) = ${M(poly([2,p]))} : f = u′/u, de primitive ln u. Donc F(x) = ln(${M(U)}).`}
  return fs2PQ('Donne une primitive de f.',v===0||v===3?mx('f(x) = ')+fh:fh,'F(x) =',t,ex+' Vérifie en dérivant.','Cherche u tel que f contienne u′ : formes u′u<sup>n</sup>, u′/√u, u′e<sup>u</sup>, u′/u.',
    ([u])=>bad&&fs2Cst(u,bad)?'prim':null)};

const gFs2IntPart=()=>{const v=R(0,3),y0=R(-6,6);let fh,t,cond,ex,G;
  if(v===0){const a=3*nz(-2,2),b=R(-6,6);fh=M(poly([a,b]).replace('x','x^2'));G=`${a/3}*x^3+(${b})*x`;t=`${G}+(${y0})`;cond='F(0)';ex=`Les primitives sont ${M(poly([a/3,0,b,0]))} + C. F(0) = C = ${num(y0)}.`}
  else if(v===1){const a=pick([-2,2,3]),k=a*R(1,3);fh=mx(`f(x) = ${num(k)}e<sup>${num(a)}x</sup>`);G=`${k/a}*exp(${a}*x)`;t=`${G}+(${y0-k/a})`;cond='F(0)';
    ex=`Les primitives sont ${fs2Co(k/a)}e<sup>${num(a)}x</sup> + C. F(0) = ${num(k/a)} + C = ${num(y0)}, donc C = ${num(y0-k/a)}.`}
  else if(v===2){const k=R(2,9);fh=mx(`f(x) = ${fr(k,'x')}`);G=`${k}*ln(x)`;t=`${G}+(${y0})`;cond='F(1)';ex=`Sur ]0 ; +∞[, les primitives sont ${k} ln x + C. F(1) = ${k} ln 1 + C = C = ${num(y0)}.`}
  else{const p=R(-6,6);fh=M(poly([2,p]));G=`x^2+(${p})*x`;t=`${G}+(${y0-1-p})`;cond='F(1)';ex=`Les primitives sont ${M(poly([1,p,0]))} + C. F(1) = ${num(1+p)} + C = ${num(y0)}, donc C = ${num(y0-1-p)}.`}
  return exprQ(`Donne la primitive F de f telle que ${cond} = ${num(y0)}.`,(v===0||v===3?mx('f(x) = '):'')+fh,'F(x) =',t,ex,'Écris une primitive + C, puis utilise la condition pour trouver C.',false,
    ([u])=>fs2Cst(u,G)?'ed-ci':null)};

const gFs2IntExact=()=>{const v=R(0,3);let pr,t,ex,an=null;
  if(v===0){const k=R(1,9),b=R(2,6);t=k*(1-1/b);an=[`${k*(b-1)}/${b}`];pr=mx(`∫<sub>1</sub><sup>${b}</sup> ${fr(k,'x<sup>2</sup>')} dx`);ex=`Une primitive de ${k}/x<sup>2</sup> est −${k}/x. [−${k}/x]<sub>1</sub><sup>${b}</sup> = −${fs2F(k,b)} − (−${k}) = ${fs2F(k*(b-1),b)}.`}
  else if(v===1){const a=pick([-2,-1,2,3]);t=(Math.exp(a)-1)/a;an=[`(exp(${a})-1)/(${a})`];pr=mx(`∫<sub>0</sub><sup>1</sup> e<sup>${a===-1?'−':a}x</sup> dx`.replace('<sup>-2x','<sup>−2x'));
    ex=`Une primitive de e<sup>${a}x</sup> est e<sup>${a}x</sup>/${a}. F(1) − F(0) = (e<sup>${a}</sup> − 1)/${a} ≈ ${dec(t,4)}. Valeur exacte : (e<sup>${a}</sup> − 1)/${a}.`}
  else if(v===2){const k=R(1,9),n=R(1,4);t=k*n;pr=mx(`∫<sub>1</sub><sup>e<sup>${n===1?'':n}</sup></sup> ${fr(k,'x')} dx`);ex=`Une primitive de ${k}/x est ${k} ln x : ${k} ln(e<sup>${n}</sup>) − ${k} ln 1 = ${k} × ${n} = ${t}.`}
  else{const a=R(1,4);t=2/a;an=[`2/${a}`];pr=mx(`∫<sub>0</sub><sup>π${a>1?'/'+a:''}</sup> sin(${a===1?'':a}x) dx`);ex=`Une primitive de sin(${a}x) est −cos(${a}x)/${a}. F(π/${a}) − F(0) = (−cos π + cos 0)/${a} = 2/${a} = ${fs2F(2,a)}.`}
  return fs2nq({instr:'Calcule la valeur exacte de l’intégrale.',prompt:pr,labels:['I ='],t:[t],explain:ex,hint:'Trouve une primitive F, puis calcule F(borne du haut) − F(borne du bas). Tu peux écrire e, ln, π…',
    diag:([w])=>near(w,-t,1e-6)?'int-bornes':null},an)};

const gFs2IntAire=()=>{const c=R(1,6),a=R(c-4,c-1),b=R(c+1,c+4),I1=(c-a)**2/2,I2=(b-c)**2/2,ai=Math.random()<.5,t=ai?I1+I2:I1-I2;
  return nq({instr:ai?'Calcule l’aire du domaine (en u.a.).':'Calcule l’intégrale à l’aide d’aires.',prompt:ai?stx(`Domaine compris entre la droite y = ${c} − x, l’axe des abscisses et les droites x = ${num(a)} et x = ${b}.`):mx(`∫<sub>${num(a)}</sub><sup>${b}</sup> (${c} − x) dx`),labels:[ai?'Aire =':'I ='],t:[t],
    explain:`La droite coupe l’axe en x = ${c}. Sur [${num(a)} ; ${c}], elle est au-dessus de l’axe : triangle d’aire ${c-a} × ${c-a} ÷ 2 = ${num(I1)}. Sur [${c} ; ${b}], elle est en dessous : triangle d’aire ${b-c} × ${b-c} ÷ 2 = ${num(I2)}. ${ai?`L’aire totale est ${num(I1)} + ${num(I2)} = ${num(t)} u.a.`:`L’intégrale compte la partie sous l’axe négativement : ${num(I1)} − ${num(I2)} = ${num(t)}.`}`,
    hint:'Cherche où la droite coupe l’axe, puis découpe en deux triangles (relation de Chasles).',diag:([w])=>near(w,ai?I1-I2:I1+I2,1e-6)?'fs2-aire':null})};

const gFs2IntMoy=()=>{const al=nz(-2,2),be=R(-3,3),ga=R(-5,5),a=R(0,3),b=a+R(1,4),Fx=x=>al*x**3+be*x*x+ga*x,I=Fx(b)-Fx(a),mu=new Fr(I,b-a);
  return fs2nq({instr:'Calcule la valeur moyenne de f sur l’intervalle.',prompt:mx('f(x) = ')+M(poly([3*al,2*be,ga]))+stx(` sur [${a} ; ${b}]`),labels:['μ ='],t:[mu.val()],
    explain:`Une primitive est F(x) = ${M(poly([al,be,ga,0]))}. ∫<sub>${a}</sub><sup>${b}</sup> f = F(${b}) − F(${a}) = ${Fx(b)} − (${Fx(a)}) = ${I}. On divise par ${b} − ${a} = ${b-a} : μ = ${fs2Fr(mu)}.`,
    hint:'μ = (1/(b − a)) × ∫ₐᵇ f(x) dx.',diag:([w])=>near(w,I,1e-6)&&b-a>1?'fs2-moy':near(w,-mu.val(),1e-6)&&I?'int-bornes':null},[`${mu.n}/${mu.d}`])};

/* Raisonnement : aire entre deux courbes */
const gFs2IntR1=()=>{const r1=R(-3,-1);let r2;do r2=R(1,3);while(r2===-r1);const c=R(1,4),f=[1,0,c].map(v=>new Fr(v)),g=[-1,2*(r1+r2),c-2*r1*r2].map(v=>new Fr(v));
  const sub=(A,B)=>A.map((x,i)=>x.sub(B[i])),add=(A,B)=>A.map((x,i)=>x.add(B[i]));
  const s1=[{h:`∫<sub>${r1}</sub><sup>${r2}</sup> (g(x) − f(x)) dx`,ok:true,e:sub(g,f)},{h:`∫<sub>${r1}</sub><sup>${r2}</sup> (f(x) − g(x)) dx`,e:sub(f,g),why:'g est au-dessus : on intègre « haut moins bas », sinon on obtient l’opposé de l’aire.',tag:'signe'},
    {h:`∫<sub>${r1}</sub><sup>${r2}</sup> (f(x) + g(x)) dx`,e:add(f,g),why:'L’aire entre les courbes est l’intégrale de la différence, pas de la somme.',tag:'fs2-aire'}];
  const s2=prev=>{const E=prev[0].e;return[{h:fs2PH(E),ok:true,p:E},{h:fs2PH([E[0],E[1],E[2].add(new Fr(2*c))]),p:[E[0],E[1],E[2].add(new Fr(2*c))],why:'Le signe − porte sur tous les termes de f(x), constante comprise.',tag:'signe'},
    {h:fs2PH([new Fr(0),E[1],E[2]]),p:[new Fr(0),E[1],E[2]],why:'−x<sup>2</sup> − x<sup>2</sup> = −2x<sup>2</sup> : les termes en x<sup>2</sup> ne s’annulent pas.',tag:'calc'}]};
  const s3=prev=>{const[A,B,C]=prev[1].p,P=[A.div(new Fr(3)),B.div(new Fr(2)),C,new Fr(0)],D=[new Fr(0),new Fr(0),A.mul(new Fr(2)),B],W=[A.div(new Fr(2)),B,C,new Fr(0)];
    return[{h:fs2PH(P),ok:true,F:P},{h:fs2PH(D),F:D,why:'Tu as dérivé au lieu d’intégrer.',tag:'prim'},{h:fs2PH(W),F:W,why:'On divise par la NOUVELLE puissance : x<sup>2</sup> → x<sup>3</sup>/3, x → x<sup>2</sup>/2.',tag:'prim'}]};
  const s4=prev=>{const P=prev[2].F,b=fs2PV(P,r2),a=fs2PV(P,r1),v=b.sub(a);
    return[{h:`${fs2Fr(v)} u.a.`,ok:true},{h:`${fs2Fr(a.sub(b))} u.a.`,why:'C’est F(borne du haut) − F(borne du bas).',tag:'int-bornes'},{h:`${fs2Fr(b)} u.a.`,why:`Il faut retrancher F(${num(r1)}).`,tag:'int-bornes'},{h:`${fs2Fr(b.add(a))} u.a.`,why:'On soustrait les deux valeurs, on ne les additionne pas.',tag:'int-bornes'}]};
  const A=(r2-r1)**3/3;
  return chain({instr:'Calcule l’aire entre les deux courbes, en construisant ton raisonnement.',prompt:mx('f(x) = ')+M(poly([1,0,c]))+stx(' et ')+mx('g(x) = ')+M(poly([-1,2*(r1+r2),c-2*r1*r2]))+stx(`. On admet que f(x) ≤ g(x) sur [${num(r1)} ; ${r2}].`),
    steps:[{q:'L’aire est donnée par…',o:s1},{q:'La fonction à intégrer se simplifie en…',o:s2},{q:'Une primitive est…',o:s3},{q:'L’aire vaut…',o:s4}],
    explain:`g est au-dessus, donc l’aire vaut ∫ (g − f). g(x) − f(x) = ${fs2PH(sub(g,f))}, de primitive ${fs2PH([new Fr(-2,3),new Fr(r1+r2),new Fr(-2*r1*r2),new Fr(0)])}. En calculant F(${r2}) − F(${num(r1)}), on trouve ${fs2Fr(new Fr((r2-r1)**3,3))} u.a.`,
    hint:'Aire = ∫ (courbe du haut − courbe du bas). Simplifie avant d’intégrer.'})};

/* Raisonnement : intégration par parties */
const gFs2IntR2=()=>{const v=R(0,2);let pr,s1,s3,s4,ex;
  const s2=[{h:'∫ u v′ = [u v] − ∫ u′ v',ok:true},{h:'∫ u v′ = [u v] + ∫ u′ v',why:'La formule vient de (uv)′ = u′v + uv′ : le terme qui reste est retranché.',tag:'ipp'},{h:'∫ u v′ = u′ v − ∫ u v′',why:'Le crochet contient le produit u v, pas u′ v.',tag:'ipp'}];
  const I=(a,b,f)=>`∫<sub>${a}</sub><sup>${b}</sup> ${f} dx`;
  if(v===0){const a=R(1,3),A=a===1?'':a;pr=mx(`I = ${I(0,a,'x e<sup>x</sup>')}`);
    s1=[{h:'u = x (on le dérive) et v′ = e<sup>x</sup>',ok:true,c:0},{h:'u = e<sup>x</sup> et v′ = x',c:1,why:'En intégrant x on obtient x<sup>2</sup>/2 : l’intégrale restante est plus compliquée.',tag:'ipp'},{h:'u = x e<sup>x</sup> et v′ = 1',c:2,why:'Dériver x e<sup>x</sup> redonne un produit : on n’a rien simplifié.',tag:'ipp'}];
    s3=prev=>{const c=prev[0].c,T=[`[x e<sup>x</sup>]<sub>0</sub><sup>${a}</sup> − ${I(0,a,'e<sup>x</sup>')}`,`[(x<sup>2</sup>/2) e<sup>x</sup>]<sub>0</sub><sup>${a}</sup> − ${I(0,a,'(x<sup>2</sup>/2) e<sup>x</sup>')}`,`[x · x e<sup>x</sup>]<sub>0</sub><sup>${a}</sup> − ${I(0,a,'x (x + 1) e<sup>x</sup>')}`];
      return[{h:mx(T[c]),ok:true},{h:mx(T[(c+1)%3]),why:'Ce n’est pas cohérent avec le choix de u et v′ fait à la première étape.',tag:'ipp'},{h:mx(`[x e<sup>x</sup>]<sub>0</sub><sup>${a}</sup> − ${I(0,a,'x e<sup>x</sup>')}`),why:'u′ = 1 : l’intégrale restante est ∫ v u′ = ∫ e<sup>x</sup>.',tag:'ipp'}]};
    const ok=a===1?'1':`${a-1===1?'':a-1}e<sup>${a}</sup> + 1`,w1=a===1?'0':`${a-1===1?'':a-1}e<sup>${a}</sup>`;
    s4=[{h:mx(`I = ${ok}`),ok:true},{h:mx(`I = ${w1}`),why:`[e<sup>x</sup>]<sub>0</sub><sup>${a}</sup> = e<sup>${a}</sup> − 1 : n’oublie pas la borne 0 (e<sup>0</sup> = 1).`,tag:'int-bornes'},{h:mx(`I = ${a+1}e<sup>${a}</sup> − 1`),why:'On retranche l’intégrale restante, on ne l’ajoute pas.',tag:'ipp'}];
    ex=`u = x, u′ = 1 ; v′ = e<sup>x</sup>, v = e<sup>x</sup>. I = [x e<sup>x</sup>]<sub>0</sub><sup>${a}</sup> − ∫<sub>0</sub><sup>${a}</sup> e<sup>x</sup> dx = ${A}e<sup>${a}</sup> − (e<sup>${a}</sup> − 1) = ${ok}.`}
  else if(v===1){const pi=Math.random()<.5,B=pi?'π':'π/2';pr=mx(`I = ${I(0,B,'x sin x')}`);
    s1=[{h:'u = x (on le dérive) et v′ = sin x',ok:true,c:0},{h:'u = sin x et v′ = x',c:1,why:'En intégrant x on obtient x<sup>2</sup>/2 : l’intégrale restante est plus compliquée.',tag:'ipp'},{h:'u = x sin x et v′ = 1',c:2,why:'Dériver x sin x redonne un produit : on n’a rien simplifié.',tag:'ipp'}];
    s3=prev=>{const c=prev[0].c,T=[`[−x cos x]<sub>0</sub><sup>${B}</sup> + ${I(0,B,'cos x')}`,`[(x<sup>2</sup>/2) sin x]<sub>0</sub><sup>${B}</sup> − ${I(0,B,'(x<sup>2</sup>/2) cos x')}`,`[x · x sin x]<sub>0</sub><sup>${B}</sup> − ${I(0,B,'x (sin x + x cos x)')}`];
      return[{h:mx(T[c]),ok:true},{h:mx(T[(c+1)%3]),why:'Ce n’est pas cohérent avec le choix de u et v′ fait à la première étape.',tag:'ipp'},{h:mx(`[x cos x]<sub>0</sub><sup>${B}</sup> − ${I(0,B,'cos x')}`),why:'Une primitive de sin x est −cos x, pas cos x.',tag:'prim'}]};
    s4=pi?[{h:mx('I = π'),ok:true},{h:mx('I = −π'),why:'−π cos π = π : attention au signe de cos π = −1.',tag:'signe'},{h:mx('I = π + 2'),why:'∫<sub>0</sub><sup>π</sup> cos x dx = sin π − sin 0 = 0.',tag:'calc'}]
      :[{h:mx('I = 1'),ok:true},{h:mx('I = −1'),why:'[sin x]<sub>0</sub><sup>π/2</sup> = 1 − 0 = 1, et le crochet [−x cos x] vaut 0.',tag:'signe'},{h:mx('I = π/2'),why:'cos(π/2) = 0 : le crochet [−x cos x] vaut 0, il reste ∫ cos x = 1.',tag:'calc'}];
    ex=`u = x, u′ = 1 ; v′ = sin x, v = −cos x. I = [−x cos x]<sub>0</sub><sup>${B}</sup> + ∫ cos x dx = ${pi?'π + 0 = π':'0 + [sin x]<sub>0</sub><sup>π/2</sup> = 1'}.`}
  else{const m=R(1,2),E=m===1?'e':'e<sup>2</sup>';pr=mx(`I = ${I(1,E,'ln x')}`);
    s1=[{h:'u = ln x (on le dérive) et v′ = 1',ok:true,c:0},{h:'u = 1 et v′ = ln x',c:1,why:'Il faudrait connaître une primitive de ln x : c’est justement ce qu’on cherche.',tag:'ipp'},{h:'Pas besoin : une primitive de ln x est 1/x',c:2,why:'1/x est la DÉRIVÉE de ln x, pas une primitive.',tag:'prim'}];
    s3=prev=>{const c=prev[0].c,T=[`[x ln x]<sub>1</sub><sup>${E}</sup> − ${I(1,E,'x × (1/x)')}`,'On est bloqué : il faut une primitive de ln x',`[ln x]<sub>1</sub><sup>${E}</sup>`];
      return[{h:mx(T[c]),ok:true},{h:mx(T[(c+1)%3]),why:'Ce n’est pas cohérent avec le choix fait à la première étape.',tag:'ipp'},{h:mx(`[x ln x]<sub>1</sub><sup>${E}</sup> − ${I(1,E,'ln x')}`),why:'u′ = 1/x et v = x : l’intégrale restante est ∫ x × (1/x) dx.',tag:'ipp'}]};
    s4=m===1?[{h:mx('I = 1'),ok:true},{h:mx('I = 0'),why:'[x]<sub>1</sub><sup>e</sup> = e − 1 : n’oublie pas la borne 1.',tag:'int-bornes'},{h:mx('I = e'),why:'Il faut retrancher ∫ 1 dx = e − 1.',tag:'ipp'}]
      :[{h:mx('I = e<sup>2</sup> + 1'),ok:true},{h:mx('I = e<sup>2</sup>'),why:'[x]<sub>1</sub><sup>e²</sup> = e<sup>2</sup> − 1 : n’oublie pas la borne 1.',tag:'int-bornes'},{h:mx('I = 2e<sup>2</sup>'),why:'Il faut retrancher ∫ 1 dx = e<sup>2</sup> − 1.',tag:'ipp'}];
    ex=`u = ln x, u′ = 1/x ; v′ = 1, v = x. I = [x ln x]<sub>1</sub><sup>${E}</sup> − ∫ 1 dx = ${m}${E} − (${E} − 1) = ${m===1?'1':'e<sup>2</sup> + 1'}.`}
  return chain({instr:'Calcule l’intégrale par parties, en construisant ton raisonnement.',prompt:pr,steps:[{q:'Quel choix fais-tu ?',o:s1},{q:'Quelle formule appliques-tu ?',o:s2},{q:'On obtient…',o:s3},{q:'Résultat :',o:s4}],
    explain:ex,hint:'On dérive le facteur qui se simplifie (x, ln x) et on intègre l’autre.'})};

/* Raisonnement : fonction définie par une intégrale */
const gFs2IntR3=()=>{const al=R(1,3),r=R(1,4),L=2*r+R(0,2),fH=fs2Ply([[al,'<i>t</i>'],[-al*r,'']]),fx=fs2Ply([[al,fs2x],[-al*r,'']]),mn=-al*r*r/2;
  const s1=[{h:`F′(x) = f(x) = ${fx}`,ok:true,c:'f'},{h:`F′(x) = f′(x) = ${al}`,c:'d',why:'La dérivée de x ↦ ∫<sub>0</sub><sup>x</sup> f(t) dt est f(x) elle-même, pas f′(x).',tag:'prim'},
    {h:`F′(x) = f(x) − f(0) = ${fs2Ply([[al,fs2x]])}`,c:'z',why:'La borne fixe 0 ne laisse rien en dérivant : F′(x) = f(x).',tag:'prim'}];
  const s2=prev=>{const c=prev[0].c;return[{h:`F décroissante sur [0 ; ${r}], croissante sur [${r} ; ${L}]`,ok:c==='f',why:c==='f'?'':'Avec ta dérivée, qui reste positive, F serait croissante partout.'},
    {h:`F croissante sur [0 ; ${L}]`,ok:c!=='f',why:c!=='f'?'':`Les variations de F suivent le SIGNE de f, qui est négatif sur [0 ; ${r}].`,tag:'signe'},
    {h:`F croissante sur [0 ; ${r}], décroissante sur [${r} ; ${L}]`,why:`f est négative avant ${r} et positive après : c’est l’inverse.`,tag:'signe'}]};
  const s3=[{h:`F(${r}) = ${num(mn)}`,ok:true},{h:`F(${r}) = ${num(-mn)}`,why:`f est négative sur [0 ; ${r}] : l’intégrale est l’opposé de l’aire du triangle.`,tag:'fs2-aire'},{h:`F(${r}) = ${num(2*mn)}`,why:'L’aire d’un triangle est base × hauteur ÷ 2.',tag:'calc'}];
  return chain({instr:'Étudie F, en construisant ton raisonnement.',prompt:stx(`Pour x dans [0 ; ${L}], F(x) = ∫<sub>0</sub><sup>x</sup> f(t) dt avec f(t) = ${fH}.`),
    steps:[{q:'F est dérivable et…',o:s1},{q:'Les variations de F :',o:s2},{q:`Le minimum de F, atteint en x = ${r}, vaut…`,o:s3}],
    explain:`f est continue, donc F est la primitive de f qui s’annule en 0 : F′(x) = f(x) = ${fx}, négative sur [0 ; ${r}] et positive sur [${r} ; ${L}]. F décroît puis croît ; son minimum F(${r}) = ∫<sub>0</sub><sup>${r}</sup> f est l’opposé de l’aire du triangle de base ${r} et de hauteur ${al*r} : ${num(mn)}.`,
    hint:'F′ = f : le signe de f donne les variations de F.'})};

/* ======================= Équations différentielles ======================= */
const gFs2EdVerif=()=>{if(Math.random()<.5){const a=R(1,5),k=R(1,6);
    return mcq('Laquelle est solution de l’équation sur ]0 ; +∞[ ?',mx(`y′ = ${2*a}x + ${fr(k,'x')}`),[{h:mx(`y = ${a===1?'':a}x<sup>2</sup> + ${k===1?'':k}ln x`),ok:true},{h:mx(`y = ${2*a} − ${fr(k,'x<sup>2</sup>')}`),tag:'prim'},{h:mx(`y = ${2*a}x<sup>2</sup> + ${k===1?'':k}ln x`),tag:'prim'},{h:mx(`y = ${a===1?'':a}x<sup>2</sup> − ${fr(k,'x<sup>2</sup>')}`),tag:'prim'}],
      `Les solutions de y′ = f sont les primitives de f. Si y = ${a}x<sup>2</sup> + ${k} ln x, alors y′ = ${2*a}x + ${k}/x.`,'Dérive chaque proposition et compare avec le second membre.')}
  const a=pick([-3,-2,-1,1,2,3]),q=nz(-5,5),b=-a*q,E=s=>mx(`y = 3e<sup>${s}</sup> ${fs2Sg(q)}`);
  return mcq('Laquelle est solution de l’équation ?',mx(`y′ = ${fs2Ply([[a,'y'],[b,'']])}`),[{h:E(fs2Ex(a)),ok:true},{h:mx(`y = 3e<sup>${fs2Ex(a)}</sup> ${fs2Sg(-q)}`),tag:'signe'},{h:E(fs2Ex(-a)),tag:'signe'},{h:mx(`y = 3e<sup>${fs2Ex(a)}</sup> ${fs2Sg(b)}`),tag:'ed-ci'}],
    `Si y = 3e<sup>${fs2Ex(a)}</sup> ${fs2Sg(q)}, alors y′ = ${3*a}e<sup>${fs2Ex(a)}</sup> et ${fs2Co(a)}y ${fs2Sg(b)} = ${3*a}e<sup>${fs2Ex(a)}</sup> ${fs2Sg(a*q)} ${fs2Sg(b)} = ${3*a}e<sup>${fs2Ex(a)}</sup>. La constante ${num(q)} = −b/a est la solution d’équilibre.`,
    'Dérive, puis remplace y et y′ dans l’équation.')};

const gFs2EdPrim=()=>{const v=R(0,2),c=R(-6,6);let fh,t,G,ex;
  if(v===0){const m=R(1,4),p=R(-5,5);fh=M(poly([2*m,p]));G=poly([m,p,0]);t=`${G}+(${c})`;ex=`y est une primitive : y = ${M(G)} + C, et y(0) = C = ${num(c)}.`}
  else if(v===1){const a=pick([-2,2,3]),k=a*R(1,3);fh=mx(`${num(k)}e<sup>${num(a)}x</sup>`);G=`${k/a}*exp(${a}*x)`;t=`${G}+(${c-k/a})`;ex=`y = ${fs2Co(k/a)}e<sup>${num(a)}x</sup> + C ; y(0) = ${num(k/a)} + C = ${num(c)}, donc C = ${num(c-k/a)}.`}
  else{const a=R(2,4),k=a*R(1,3);fh=mx(`${k}cos(${a}x)`);G=`${k/a}*sin(${a}*x)`;t=`${G}+(${c})`;ex=`y = ${fs2Co(k/a)}sin(${a}x) + C ; y(0) = C = ${num(c)}.`}
  return exprQ('Résous l’équation avec la condition initiale.',mx('y′ = ')+fh+stx(` et y(0) = ${num(c)}`),'y =',t,ex,'Les solutions de y′ = f sont les primitives de f : trouve C avec y(0).',false,([u])=>fs2Cst(u,G)?'ed-ci':null)};

const gFs2EdSol=()=>{const m=R(1,4),n=nz(-6,6),x0=pick([0,1]),y0=nz(-5,5),a=new Fr(-n,m);
  const eq=`${m===1?'':m}y′ ${fs2Sg(n).replace(/(\d+)$/,d=>d==='1'?'':d)}y = 0`,t=`${y0}*exp((${-n}/${m})*(x-${x0}))`;
  return exprQ('Résous l’équation avec la condition initiale.',mx(eq)+stx(` et y(${x0}) = ${num(y0)}`),'y =',t,
    `${m>1?`On divise par ${m} : `:''}y′ = ${fs2Fr(a)}y. Les solutions sont y = Ce<sup>${fs2Ex(a)}</sup>. ${x0?`y(1) = Ce<sup>${fs2Lin(a)}</sup> = ${num(y0)}, donc C = ${num(y0)}e<sup>${fs2Lin(a.neg())}</sup> et y = ${num(y0)}e<sup>${fs2Lin(a)}(x − 1)</sup>.`:`y(0) = C = ${num(y0)}, donc y = ${num(y0)}e<sup>${fs2Ex(a)}</sup>.`}`,
    'Isole y′ pour lire a, écris Ce<sup>ax</sup>, puis utilise la condition.',false,
    ([u])=>eqv(u,`${y0}*exp((${n}/${m})*(x-${x0}))`)?'signe':x0&&eqv(u,`${y0}*exp((${-n}/${m})*x)`)?'ed-ci':m!==Math.abs(n)&&eqv(u,`${y0}*exp((${-m}/${n})*(x-${x0}))`)?'fs2-ed-a':null)};

const gFs2EdSol2=()=>{if(Math.random()<.5){const a=pick([-3,-2,-1,1,2,3]),q=nz(-6,6),b=-a*q;let y0;do y0=R(-8,8);while(y0===q);const t=`${y0-q}*exp(${a}*x)+(${q})`;
    return exprQ('Résous l’équation avec la condition initiale.',mx(`y′ = ${fs2Ply([[a,'y'],[b,'']])}`)+stx(` et y(0) = ${num(y0)}`),'y =',t,
      `Solution constante : −b/a = ${num(q)}. Solutions : y = Ce<sup>${fs2Ex(a)}</sup> ${fs2Sg(q)}. y(0) = C ${fs2Sg(q)} = ${num(y0)}, donc C = ${num(y0-q)}.`,'y = Ce<sup>ax</sup> − b/a, puis y(0) donne C.',false,
      ([u])=>eqv(u,`${y0+q}*exp(${a}*x)-(${q})`)?'signe':eqv(u,`${y0}*exp(${a}*x)+(${q})`)?'ed-ci':null)}
  const m=pick([2,3]),d=nz(-6,6);let y0;do y0=R(-8,8);while(y0===-d);const t=`${y0+d}*exp(x/${m})-(${d})`;
  return exprQ('Résous l’équation avec la condition initiale.',mx(`${m}y′ − y = ${num(d)}`)+stx(` et y(0) = ${num(y0)}`),'y =',t,
    `On divise par ${m} : y′ = (1/${m})y + ${fs2F(d,m)}. Solution constante : −b/a = −(${fs2F(d,m)}) ÷ (1/${m}) = ${num(-d)}. Solutions : y = Ce<sup>x/${m}</sup> ${fs2Sg(-d)}. y(0) = C ${fs2Sg(-d)} = ${num(y0)}, donc C = ${num(y0+d)}.`,
    'Divise par le coefficient de y′, puis y = Ce<sup>ax</sup> − b/a.',false,([u])=>eqv(u,`${y0-d}*exp(x/${m})+(${d})`)?'signe':eqv(u,`${y0}*exp(x/${m})-(${d})`)?'ed-ci':null)};

/* Raisonnement : my′ + ny = 0 avec y(1) = y0 */
const gFs2EdR1=()=>{const m=R(2,4);let n;do n=nz(-6,6);while(Math.abs(n)===m);const y0=nz(-4,5),Y=num(y0),Yc=fs2Co(y0);
  const s1=[{h:`y′ = ${fs2Fr(new Fr(-n,m))}y`,ok:true,a:new Fr(-n,m)},{h:`y′ = ${fs2Fr(new Fr(-m,n))}y`,a:new Fr(-m,n),why:`On divise par le coefficient de y′, qui est ${m} : a = −${n<0?`(${n})`:n}/${m}.`,tag:'fs2-ed-a'},
    {h:`y′ = ${fs2Fr(new Fr(n,m))}y`,a:new Fr(n,m),why:`En passant ${n<0?'':'+'}${num(n)}y de l’autre côté, il change de signe.`,tag:'signe'},{h:`y′ = ${num(-n)}y`,a:new Fr(-n),why:`Il faut aussi diviser par ${m}, le coefficient de y′.`,tag:'fs2-ed-a'}];
  const s2=prev=>{const a=prev[0].a;return[{h:`y = Ce<sup>${fs2Ex(a)}</sup>`,ok:true,fm:'mul'},{h:`y = e<sup>${fs2Ex(a)}</sup> + C`,fm:'add',why:'La constante multiplie l’exponentielle : (Ce<sup>ax</sup>)′ = a × Ce<sup>ax</sup>.',tag:'ed-ci'},
    {h:`y = Ce<sup>${fs2Ex(a.neg())}</sup>`,fm:'neg',why:'Les solutions de y′ = ay sont Ce<sup>ax</sup>, avec le même a.',tag:'signe'}]};
  const s3=prev=>{const a=prev[0].a,fm=prev[1].fm,P=`C = ${Yc}e<sup>${fs2Lin(a.neg())}</sup>`,Nn=`C = ${Yc}e<sup>${fs2Lin(a)}</sup>`,Ad=`C = ${Y} − e<sup>${fs2Lin(a)}</sup>`;
    const okh=fm==='mul'?P:fm==='neg'?Nn:Ad;
    return[{h:okh,ok:true},...[P,Nn,Ad].filter(h=>h!==okh).map(h=>({h,why:h===Ad?'La constante multiplie l’exponentielle : on divise, on ne soustrait pas.':'Résous Ce<sup>…</sup> = y<sub>0</sub> : on divise par l’exponentielle, ce qui change le signe de l’exposant.',tag:'ed-ci'})),
      {h:`C = ${Y}`,why:'La condition est donnée en x = 1, pas en x = 0 : e<sup>a × 1</sup> ≠ 1.',tag:'ed-ci'}]};
  const s4=prev=>{const a=prev[0].a,fm=prev[1].fm,L=fs2Lin(a),Ln=fs2Lin(a.neg());
    const okh=fm==='mul'?`f(x) = ${Yc}e<sup>${L}(x − 1)</sup>`:fm==='neg'?`f(x) = ${Yc}e<sup>${Ln}(x − 1)</sup>`:`f(x) = e<sup>${fs2Ex(a)}</sup> + ${Y} − e<sup>${L}</sup>`;
    return[{h:okh,ok:true},{h:`f(x) = ${Yc}e<sup>${fs2Ex(fm==='neg'?a.neg():a)}</sup>`,why:'Il manque le facteur e<sup>−a</sup> venu de la condition en x = 1.',tag:'ed-ci'},
      {h:`f(x) = ${Yc}e<sup>${fm==='neg'?Ln:L}(x + 1)</sup>`,why:'e<sup>ax</sup> × e<sup>−a</sup> = e<sup>a(x − 1)</sup>.',tag:'signe'}]};
  const a=new Fr(-n,m);
  return chain({instr:'Résous l’équation, en construisant ton raisonnement.',prompt:mx(`${m}y′ ${fs2Sg(n).replace(/ 1$/,' ')}y = 0`)+stx(` avec y(1) = ${Y}.`),
    steps:[{q:'Sous la forme y′ = ay :',o:s1},{q:'Les solutions sont…',o:s2},{q:'La condition y(1) = '+Y+' donne…',o:s3},{q:'Donc la solution est…',o:s4}],
    explain:`${m}y′ ${fs2Sg(n)}y = 0 donne y′ = ${fs2Fr(a)}y. Solutions : y = Ce<sup>${fs2Ex(a)}</sup>. y(1) = Ce<sup>${fs2Lin(a)}</sup> = ${Y}, donc C = ${Yc}e<sup>${fs2Lin(a.neg())}</sup>, et f(x) = ${Yc}e<sup>${fs2Lin(a)}(x − 1)</sup>.`,
    hint:'Isole y′, écris Ce<sup>ax</sup>, puis la condition en x = 1.'})};

/* Raisonnement : my′ + ny = d avec y(0) = y0 */
const gFs2EdR2=()=>{const m=pick([2,3]),n=nz(-3,3),q=pick([-5,-4,-3,-2,2,3,4,5]),d=n*q;let y0;do y0=R(-6,6);while(y0===q);
  const A=new Fr(-n,m),B=new Fr(d,m),sol=(C,a,p)=>{const t=[];if(C.n)t.push(`${C.n===C.d?'':C.n===-C.d?MINUS:fs2Fr(C)}e<sup>${fs2Ex(a)}</sup>`);let s=t.join('');if(p.n)s+=s?` ${p.n<0?'−':'+'} ${fs2Fr(new Fr(Math.abs(p.n),p.d))}`:fs2Fr(p);return s||'0'};
  const s1=[{h:`y′ = ${fs2Ply([[A,'y'],[B,'']])}`,ok:true,a:A,b:B},{h:`y′ = ${fs2Ply([[A.neg(),'y'],[B,'']])}`,a:A.neg(),b:B,why:'En passant le terme en y de l’autre côté, il change de signe.',tag:'signe'},
    {h:`y′ = ${fs2Ply([[A,'y'],[d,'']])}`,a:A,b:new Fr(d),why:`On divise TOUT par ${m}, y compris le second membre.`,tag:'fs2-ed-a'}];
  const s2=prev=>{const{a,b}=prev[0];return[{h:`y = ${fs2Fr(b.div(a).neg())}`,ok:true,p:b.div(a).neg()},{h:`y = ${fs2Fr(b.div(a))}`,p:b.div(a),why:'Une constante k vérifie 0 = ak + b, donc k = −b/a.',tag:'signe'},
    {h:`y = ${fs2Fr(a.div(b).neg())}`,p:a.div(b).neg(),why:'C’est −b/a, pas −a/b.',tag:'calc'}]};
  const s3=prev=>{const a=prev[0].a,p=prev[1].p;return[{h:`y = Ce<sup>${fs2Ex(a)}</sup> ${p.n<0?'−':'+'} ${fs2Fr(new Fr(Math.abs(p.n),p.d))}`,ok:true,fm:'ok'},
    {h:`y = Ce<sup>${fs2Ex(a)}</sup>`,fm:'nop',why:'Ce sont les solutions de y′ = ay : il faut ajouter la solution particulière.',tag:'ed-ci'},
    {h:`y = Ce<sup>${fs2Ex(a.neg())}</sup> ${p.n<0?'−':'+'} ${fs2Fr(new Fr(Math.abs(p.n),p.d))}`,fm:'neg',why:'L’exposant est ax, avec le même a que dans y′ = ay + b.',tag:'signe'}]};
  const s4=prev=>{const a0=prev[0].a,p=prev[1].p,fm=prev[2].fm,a=fm==='neg'?a0.neg():a0,Y=new Fr(y0),P=fm==='nop'?new Fr(0):p;
    const okC=Y.sub(P),o=[{h:`f(x) = ${sol(okC,a,P)}`,ok:true}];
    if(fm!=='nop')o.push({h:`f(x) = ${sol(Y,a,P)}`,why:`y(0) = C ${P.n<0?'−':'+'} ${fs2Fr(new Fr(Math.abs(P.n),P.d))}, pas C : la constante ne vaut pas directement y(0).`,tag:'ed-ci'},{h:`f(x) = ${sol(Y.add(P),a,P)}`,why:'Erreur de signe en isolant C.',tag:'signe'});
    else o.push({h:`f(x) = ${sol(Y.sub(p),a,new Fr(0))}`,why:'Avec ta forme sans solution particulière, y(0) = C directement.',tag:'ed-ci'},{h:`f(x) = ${sol(Y.add(p),a,new Fr(0))}`,why:'Avec ta forme, y(0) = C.',tag:'ed-ci'});
    return o};
  const pr=mx(`${m}y′ ${fs2Sg(n).replace(/ 1$/,' ')}y = ${num(d)}`)+stx(` avec y(0) = ${num(y0)}.`);
  return chain({instr:'Résous l’équation, en construisant ton raisonnement.',prompt:pr,
    steps:[{q:'Sous la forme y′ = ay + b :',o:s1},{q:'La solution constante est…',o:s2},{q:'Les solutions sont…',o:s3},{q:'Avec y(0) = '+num(y0)+' :',o:s4}],
    explain:`On divise par ${m} : y′ = ${fs2Ply([[A,'y'],[B,'']])}. Solution constante : −b/a = ${num(q)}. Solutions : y = Ce<sup>${fs2Ex(A)}</sup> ${fs2Sg(q)}. y(0) = C ${fs2Sg(q)} = ${num(y0)}, donc C = ${num(y0-q)} et f(x) = ${sol(new Fr(y0-q),A,new Fr(q))}.`,
    hint:'Forme y′ = ay + b, équilibre −b/a, solutions Ce<sup>ax</sup> − b/a, puis la condition.'})};

/* Raisonnement : y′ − ay = mx + p avec une solution particulière affine */
const gFs2EdR3=()=>{const a=pick([-2,-1,1,2,3]),al=nz(-3,3),be=nz(-3,3),m=-a*al,p=al-a*be;let y0;do y0=R(-5,5);while(y0===be);
  const yp=fs2Ply([[al,fs2x],[be,'']]),rhs=fs2Ply([[m,fs2x],[p,'']]),ax=fs2Ex(a),aff=fs2Ply([[al,fs2x],[be,'']]),Ah=a===1?'':a===-1?MINUS:num(a);
  const lhs=`y<sub>p</sub>′(x) ${a<0?'+':'−'} ${Math.abs(a)===1?'':Math.abs(a)}y<sub>p</sub>(x)`;
  const s1=[{h:`${lhs} = ${rhs} : y<sub>p</sub> est solution`,ok:true},{h:`${lhs} = ${fs2Ply([[m,fs2x],[al+a*be,'']])} : y<sub>p</sub> n’est pas solution`,why:`${-a<0?'−':''}${Math.abs(a)} multiplie aussi la constante ${num(be)} de y<sub>p</sub> : attention au signe.`,tag:'signe'},
    {h:`${lhs} = ${fs2Ply([[m,fs2x],[-a*be,'']])} : y<sub>p</sub> n’est pas solution`,why:`Tu as oublié y<sub>p</sub>′(x) = ${num(al)}.`,tag:'calc'}];
  const s2=[{h:`y = Ce<sup>${ax}</sup>`,ok:true},{h:`y = Ce<sup>${fs2Ex(-a)}</sup>`,why:`L’équation homogène est y′ = ${Ah}y : l’exposant est ${ax}.`,tag:'signe'},{h:`y = e<sup>${ax}</sup> + C`,why:'La constante multiplie l’exponentielle.',tag:'ed-ci'}];
  const s3=[{h:`y = Ce<sup>${ax}</sup>${fs2Pl(aff)}`,ok:true},{h:`y = C(e<sup>${ax}</sup>${fs2Pl(aff)})`,why:'C ne multiplie que la solution de l’homogène : on ajoute la solution particulière telle quelle.',tag:'ed-ci'},
    {h:`y = ${aff} seulement`,why:'y<sub>p</sub> est UNE solution ; il y en a une infinité : homogène + particulière.',tag:'raisonnement'}];
  const fin=C=>`f(x) = ${C===0?aff:`${fs2Co(C)}e<sup>${ax}</sup>${fs2Pl(aff)}`}`;
  const s4=[{h:fin(y0-be),ok:true},{h:fin(y0),why:`y(0) = C ${fs2Sg(be)}, donc C = ${num(y0)} ${fs2Sg(-be)}.`,tag:'ed-ci'},{h:fin(y0+be),why:'Erreur de signe en isolant C.',tag:'signe'}];
  return chain({instr:'Résous l’équation, en construisant ton raisonnement.',prompt:mx(`y′ ${a<0?'+':'−'} ${Math.abs(a)===1?'':Math.abs(a)}y = ${rhs}`)+stx(` avec y(0) = ${num(y0)}. On propose y`)+mx(`<sub>p</sub>(x) = ${yp}`)+stx(' comme solution particulière.'),
    steps:[{q:'Vérification de la solution particulière :',o:s1},{q:'Les solutions de l’équation homogène sont…',o:s2},{q:'Toutes les solutions de l’équation sont…',o:s3},{q:`Avec y(0) = ${num(y0)} :`,o:s4}],
    explain:`y<sub>p</sub>′ = ${num(al)}, donc ${lhs} = ${num(al)} ${fs2Sg(-a*al)}x ${fs2Sg(-a*be)} = ${rhs} : y<sub>p</sub> est solution. Les solutions de y′ = ${Ah}y sont Ce<sup>${ax}</sup>, donc y = Ce<sup>${ax}</sup>${fs2Pl(aff)}. y(0) = C ${fs2Sg(be)} = ${num(y0)} donne C = ${num(y0-be)}.`,
    hint:'Solution générale = solutions de l’homogène + une solution particulière.'})};

/* ======================= Chapitres ======================= */
ANA_UNITS.push(
  {id:'fs-sag',tr:'fs',src:'Suites arithmétiques et géométriques',name:'Suites arithmétiques et géométriques',sub:'Ajouter ou multiplier : terme général, sommes, limite de qⁿ',glyph:'uₙ',tone:'c',
   w:'wGrow',
   skills:[SKA('fs.sag.ta','Terme d’une suite arithmétique',gSuA,1),SKA('fs.sag.tg','Terme d’une suite géométrique',gSuG,1),SKA('fs.sag.var','Sens de variation',gSuVar,1),
     SKA('fs.sag.expr','Écrire le terme général',gFs2SagExpr,2),SKA('fs.sag.rq','Raison à partir de deux termes',gFs2SagRq,2),SKA('fs.sag.r1','Raisonner : arithmétique ou géométrique ?',gFs2SagR1,2),
     SKA('fs.sag.som','Somme de termes arithmétiques',gFs2SagSom,2),SKA('fs.sag.somg','Somme géométrique',gSuSomG,2),SKA('fs.sag.lim','Limite de qⁿ',gFs2SagLim,2),
     SKA('fs.sag.r3','Raisonner : total d’un investissement',gFs2SagR3,3),SKA('fs.sag.r2','Raisonner : suite auxiliaire',gFs2SagR2,3)]},
  {id:'fs-sui',tr:'fs',src:'Suites : récurrence et limites',name:'Récurrence et limites',sub:'Variations, raisonnement par récurrence, limites et convergence',glyph:'lim',tone:'x',
   w:'wCob',
   skills:[SKA('fs.sui.exp','Calculer un terme (forme explicite)',gFs2SuiExp,1),SKA('fs.sui.rec','Suite récurrente : premiers termes',gSuRec,1),SKA('fs.sui.var','Croissante à partir de quel rang ?',gFs2SuiVar,2),
     SKA('fs.sui.r1','Raisonner : démonstration par récurrence',gFs2SuiR1,2),SKA('fs.sui.ops','Opérations et formes indéterminées',gFs2SuiOps,2),SKA('fs.sui.lim','Limite d’un quotient en n',gSuLimR,2),
     SKA('fs.sui.seuil','Algorithme de seuil',gFs2SuiSeuil,2),SKA('fs.sui.vf','Vrai ou faux : théorèmes',gSuVF,2),
     SKA('fs.sui.r3','Raisonner : comparaison ou gendarmes',gFs2SuiR3,3),SKA('fs.sui.r2','Raisonner : convergence monotone',gFs2SuiR2,3)]},
  {id:'fs-int',tr:'fs',src:'Primitives et intégrales',name:'Primitives et intégrales',sub:'Dériver à l’envers, aires, intégration par parties',glyph:'∫',tone:'sq',
   w:'wRiem',
   skills:[SKA('fs.int.verif','Reconnaître une primitive',gFs2IntVerif,1),SKA('fs.int.pow','Primitive d’une puissance',gIPow,1),SKA('fs.int.prim','Primitives usuelles',gFs2IntPrim,1),
     SKA('fs.int.comp','Primitives de formes composées',gFs2IntComp,2),SKA('fs.int.part','Primitive avec une condition',gFs2IntPart,2),SKA('fs.int.calc','Intégrale d’un polynôme',gIPoly,2),
     SKA('fs.int.exact','Intégrale exacte (exp, ln, sin)',gFs2IntExact,2),SKA('fs.int.aire','Intégrale et aires (Chasles)',gFs2IntAire,2),SKA('fs.int.moy','Valeur moyenne',gFs2IntMoy,2),
     SKA('fs.int.r3','Raisonner : fonction définie par une intégrale',gFs2IntR3,3),SKA('fs.int.r1','Raisonner : aire entre deux courbes',gFs2IntR1,3),SKA('fs.int.r2','Raisonner : intégration par parties',gFs2IntR2,3)]},
  {id:'fs-ed',tr:'fs',src:'Équations différentielles',name:'Équations différentielles',sub:'y′ = f, y′ = ay, y′ = ay + b et conditions initiales',glyph:'y′',tone:'c',
   w:'wField',
   skills:[SKA('fs.ed.verif','Reconnaître une solution',gFs2EdVerif,1),SKA('fs.ed.exp','Solutions de y′ = ay',gEdExp,1),SKA('fs.ed.eq','Solution d’équilibre',gEdEq,1),
     SKA('fs.ed.prim','y′ = f(x) avec condition initiale',gFs2EdPrim,1),SKA('fs.ed.sol','Résoudre y′ = ay avec condition',gFs2EdSol,2),SKA('fs.ed.sol2','Résoudre y′ = ay + b avec condition',gFs2EdSol2,2),
     SKA('fs.ed.ci','Trouver les constantes',gEdCi,2),SKA('fs.ed.newton','Refroidissement de Newton',gEdNewton,2),SKA('fs.ed.r1','Raisonner : y′ = ay et condition en 1',gFs2EdR1,2),
     SKA('fs.ed.r2','Raisonner : y′ = ay + b',gFs2EdR2,3),SKA('fs.ed.r3','Raisonner : solution particulière donnée',gFs2EdR3,3)]});
