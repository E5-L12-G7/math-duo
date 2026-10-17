/* ---- Trigonométrie approfondie (d'après analyse/trigo-exos.md, issu des documents Tft, Tct, Ttrigt) ---- */
Object.assign(ANA_ERR,{
  'rapport':{label:'Mauvais rapport trigonométrique',tip:'CAH SOH TOA : Cosinus = Adjacent / Hypoténuse, Sinus = Opposé / Hypoténuse, Tangente = Opposé / Adjacent. Repère d’abord les côtés par rapport à l’angle.'},
  'radian':{label:'Calculatrice en radians',tip:'Avec des angles en degrés, la calculatrice doit être en mode DEG (bouton RAD/DEG de la calculatrice de l’appli).'},
  'complementaire':{label:'Angle complémentaire',tip:'Tu as trouvé l’autre angle aigu : les deux angles aigus d’un triangle rectangle font 90° à eux deux.'},
  'mult-div':{label:'Multiplier au lieu de diviser',tip:'Écris l’égalité, par exemple sin α = opposé / hyp, puis isole l’inconnue : si elle est au dénominateur, on divise.'}});
const dg=a=>a*Math.PI/180;
const gTrChoix=()=>{const v=R(0,2),[d,c]=[['adjacent','hypoténuse'],['opposé','hypoténuse'],['opposé','adjacent']][v],ok=['cos','sin','tan'][v];
  return mcq('Quel rapport relie ces deux côtés à l’angle Â ?',`On connaît le côté <b>${d}</b> et le côté <b>${c}</b> (par rapport à Â).`,
    ['cos','sin','tan'].map(f=>({h:mx(`${f} Â`),ok:f===ok,tag:'rapport'})),
    `${ok==='cos'?'CAH : cos = adjacent / hypoténuse':ok==='sin'?'SOH : sin = opposé / hypoténuse':'TOA : tan = opposé / adjacent'}.`,'Pense à CAH SOH TOA.')};
const TRIP=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]];
const gTrRap=()=>{const [a0,b0,h0]=pick(TRIP),k=R(1,2),[o,a,h]=Math.random()<.5?[a0*k,b0*k,h0*k]:[b0*k,a0*k,h0*k],f=pick(['cos','sin','tan']),t=f==='cos'?a/h:f==='sin'?o/h:o/a;
  return nq({instr:`Calcule ${f} Â (valeur décimale exacte ou arrondie au millième).`,prompt:`Triangle rectangle : côté opposé à Â = ${o}, côté adjacent = ${a}, hypoténuse = ${h}.`,labels:[`${f} Â =`],t:[t],tol:.0006,
    explain:`${f} Â = ${f==='cos'?`adjacent / hypoténuse = ${a}/${h}`:f==='sin'?`opposé / hypoténuse = ${o}/${h}`:`opposé / adjacent = ${o}/${a}`} ≈ ${dec(t,3)}.`,hint:'CAH SOH TOA.',
    diag:([v])=>[a/h,o/h,o/a,a/o,h/a].some(x=>near(v,x,.0006))?'rapport':null})};
const gTrLong=()=>{const al=R(15,75),d=R(2,20),V=R(1,4),r=dg(al);
  const [giv,ask,t,wrong]=[['l’hypoténuse','le côté adjacent',d*Math.cos(r),[d*Math.sin(r)]],['l’hypoténuse','le côté opposé',d*Math.sin(r),[d*Math.cos(r)]],
    ['le côté opposé','l’hypoténuse',d/Math.sin(r),[d*Math.sin(r)]],['le côté opposé','le côté adjacent',d/Math.tan(r),[d*Math.tan(r)]]][V-1];
  const how=['cos α = adj / hyp, donc adj = hyp × cos α','sin α = opp / hyp, donc opp = hyp × sin α','sin α = opp / hyp, donc hyp = opp / sin α','tan α = opp / adj, donc adj = opp / tan α'][V-1];
  const radv=[d*Math.cos(al),d*Math.sin(al),d/Math.sin(al),d/Math.tan(al)][V-1];
  return nq({instr:`Calcule ${ask}, arrondi au centième.`,prompt:`Triangle rectangle, angle aigu α = ${al}°, ${giv} = ${d} cm.`,labels:[ask.replace(/^le |^l’/,'')+' ='],t:[t],dp:2,
    explain:`${how} = ${dec(t,2)} cm. La calculatrice doit être en degrés.`,hint:'Choisis le rapport qui contient la donnée et l’inconnue.',
    diag:([v])=>near(v,radv,.01)?'radian':wrong.some(w=>near(v,w,.01))?(V>2?'mult-div':'rapport'):null})};
const gTrAngle=()=>{const f=pick(['cos','sin','tan']),v=R(2,15),u=f==='tan'?R(1,15):R(1,v-1),q=u/v,A=(f==='cos'?Math.acos(q):f==='sin'?Math.asin(q):Math.atan(q))*180/Math.PI;
  const lab=f==='cos'?['côté adjacent','hypoténuse']:f==='sin'?['côté opposé','hypoténuse']:['côté opposé','côté adjacent'];
  return nq({instr:'Calcule l’angle Â en degrés, au dixième près.',prompt:`Triangle rectangle : ${lab[0]} = ${u}, ${lab[1]} = ${v}.`,labels:['Â ='],t:[A],dp:1,
    explain:`${f} Â = ${u}/${v}, donc Â = ${f}<sup>−1</sup>(${u}/${v}) ≈ ${dec(A,1)}°. Un angle aigu est toujours entre 0° et 90°.`,hint:`Utilise la touche ${f}⁻¹ de la calculatrice, en degrés.`,
    diag:([w])=>near(w,90-A,.06)?'complementaire':near(w,A*Math.PI/180,.06)?'radian':null})};
const gTrRadDeg=()=>{const q=pick([2,3,4,5,6,8,9,10,12,18]);let p;do p=R(1,2*q);while(gcd(p,q)!==1);
  return nq({instr:'Convertis en degrés.',prompt:mx(`${p===1?'':p}π/${q} rad`),labels:['angle (°) ='],t:[180*p/q],tol:.01,
    explain:`π rad = 180°, donc ${p}π/${q} = ${p} × 180 / ${q} = ${num(180*p/q)}°.`,hint:'Remplace π par 180°.',diag:([v])=>near(v,p/q*Math.PI,.01)?'calc':null})};
const gTrPrinc=()=>{const q=pick([2,3,4,6]);let n;do n=R(-6*q,6*q);while(gcd(Math.abs(n),q)!==1||Math.abs(n)<=q);
  const r=n-2*q*Math.ceil((n-q)/(2*q));
  return nq({instr:`Donne la mesure principale (dans ]−π ; π]) sous la forme kπ/${q}. Donne k.`,prompt:mx(`${num(n)}π/${q}`),labels:['k ='],t:[r],tol:0,
    explain:`On retire ou on ajoute des tours complets (2π = ${2*q}π/${q}) : ${num(n)}π/${q} ${n>r?'−':'+'} ${Math.abs(n-r)/(2*q)} × 2π = ${num(r)}π/${q}, qui est bien dans ]−π ; π].`,hint:`Un tour vaut 2π = ${2*q}π/${q} : ajoute ou retire ${2*q} au numérateur.`,
    diag:([v])=>near(v,r+2*q)||near(v,r-2*q)?'calc':null})};
const TRA=[[0,'0','1'],[30,'1/2','√3/2'],[45,'√2/2','√2/2'],[60,'√3/2','1/2'],[90,'1','0']];
const gTrValeur=()=>{const k=pick([2,3,4,5,7,8,9,10,11,13,14,15,16,17,19,20,21,22,23].filter(x=>x%2===0||x%3===0)),deg=k*15,f=pick(['cos','sin']),ex=f==='cos'?cosEx(deg):sinEx(deg);
  const all=['0','1/2','−1/2','√2/2','−√2/2','√3/2','−√3/2','1','−1'],H=v=>{const s=v.startsWith('−')?MINUS:'',b=v.replace('−','');return mx(s+(b.includes('/')?fr(...b.split('/')):b))};
  const ok=ex.replace(MINUS,'−'),opp=ok.startsWith('−')?ok.slice(1):'−'+ok,O=[ok,opp==='−0'?'1':opp,...shuffle(all.filter(v=>v!==ok&&v!==opp)).slice(0,2)];
  return mcq('Que vaut cette expression ?',mx(`${f}(${piFrac(k)})`),O.map((v,j)=>({h:H(v),ok:!j,tag:j===1?'signe':'trigo'})),
    `${piFrac(k)} correspond à ${deg}°. On se ramène à l’angle de référence du premier quart de tour, puis on lit le signe sur le cercle : ${f}(${piFrac(k)}) = ${ok}.`,'Place l’angle sur le cercle, puis regarde le signe de l’abscisse (cos) ou de l’ordonnée (sin).')};
const gTrNb=()=>{const f=pick(['cos','sin']),c=pick(['0','1/2','−1/2','√2/2','1','−1','2','−3/2','√3/2','3']),v=Math.abs({'0':0,'1/2':.5,'−1/2':-.5,'√2/2':Math.SQRT2/2,'1':1,'−1':-1,'2':2,'−3/2':-1.5,'√3/2':Math.sqrt(3)/2,'3':3}[c]);
  const t=v>1?0:v===1?1:2;
  return nq({instr:'Combien de solutions sur ]−π ; π] ?',prompt:mx(`${f} x = ${c.includes('/')?(c.startsWith('−')?MINUS:'')+fr(...c.replace('−','').split('/')):c.replace('−',MINUS)}`),labels:['nombre ='],t:[t],tol:0,
    explain:t===0?`${f} x reste entre −1 et 1 : aucune solution.`:t===1?`La valeur ${c} n’est atteinte qu’en un seul point du cercle sur un tour.`:`Sur un tour, la droite ${f==='cos'?'verticale x':'horizontale y'} = ${c} coupe le cercle en deux points : deux solutions.`,
    hint:'Trace la droite correspondante sur le cercle trigonométrique et compte les points d’intersection.',diag:()=> 'trigo'})};
const gTrEq=()=>{const f=pick(['cos','sin']),i=R(1,3),neg=Math.random()<.5,d=TRA[i][0],k=d/15; // angle de référence a = kπ/12
  const c=(neg?'−':'')+(f==='cos'?TRA[i][2]:TRA[i][1]);
  let a,S;if(f==='cos'){a=neg?12-k:k;S=[-a,a]}else{a=neg?-k:k;S=neg?[-12-a,a]:[a,12-a]}
  const P=x=>mx(piFrac(x)),Sh=s=>mx(`{${s.map(x=>piFrac(x)).join(' ; ')}}`),cH=mx(`${f} x = ${(neg?MINUS:'')+fr(...c.replace('−','').split('/'))}`);
  const wrong=f==='cos'?[[a,12-a].sort((x,y)=>x-y),[-a,12-a],[a]]:[[a,-a].sort((x,y)=>x-y),[a,12+a],[a]];
  return mcq('Résous sur ]−π ; π].',cH,[{h:Sh(S.sort((x,y)=>x-y)),ok:true},...wrong.map(w=>({h:Sh(w),tag:'trigo'}))],
    f==='cos'?`cos(${piFrac(a)}) = ${c}, et deux angles opposés ont le même cosinus : S = {−${piFrac(a)} ; ${piFrac(a)}}.`
      :`sin(${piFrac(a)}) = ${c}, et deux angles supplémentaires (x et π − x) ont le même sinus. On ramène π − x dans ]−π ; π] si besoin.`,'Trouve une solution, puis la seconde par symétrie sur le cercle.')};
const gTrDer=()=>{const A=pick([1,2,3,-2]),a=pick([2,3,4]),b=pick([0,1,-1]),g=pick(['cos','sin']);
  const arg=`${a}x${b?(b>0?' + ':' − ')+Math.abs(b):''}`,Ast=A===1?'':A===-1?MINUS:num(A),co=n=>n===1?'':n===-1?MINUS:num(n);
  const ok=g==='cos'?`${co(-A*a)}sin(${arg})`:`${co(A*a)}cos(${arg})`;
  const W=g==='cos'?[`${co(A*a)}sin(${arg})`,`${co(-A)}sin(${arg})`,`${co(-A*a)}cos(${arg})`]:[`${co(-A*a)}cos(${arg})`,`${co(A)}cos(${arg})`,`${co(A*a)}sin(${arg})`];
  return mcq('Dérive la fonction f.',mx(`f(x) = ${Ast}${g}(${arg})`),[{h:mx(`f ′(x) = ${ok}`),ok:true},...W.map((w,j)=>({h:mx(`f ′(x) = ${w}`),tag:j===1?'derivee':'signe'}))],
    `(${g}(u))′ = ${g==='cos'?'−u′ sin u':'u′ cos u'} avec u = ${arg}, u′ = ${a} : f ′(x) = ${ok}.`,'Dérivée d’une composée : n’oublie pas de multiplier par la dérivée de l’intérieur.')};
const gTrDup=()=>{const [p0,q0,r]=pick(TRIP),sw=Math.random()<.5,[p,q]=sw?[q0,p0]:[p0,q0],w=pick(['sin','cos']),t=w==='sin'?2*p*q/(r*r):(q*q-p*p)/(r*r);
  return nq({instr:`Calcule ${w} 2x (valeur exacte en décimal).`,prompt:mx(`sin x = ${fr(p,r)}, cos x = ${fr(q,r)}`),labels:[`${w} 2x =`],t:[t],tol:.0005,
    explain:w==='sin'?`sin 2x = 2 sin x cos x = 2 × ${p}/${r} × ${q}/${r} = ${2*p*q}/${r*r} ≈ ${dec(t,4)}.`:`cos 2x = cos²x − sin²x = (${q*q} − ${p*p})/${r*r} = ${q*q-p*p}/${r*r} ≈ ${dec(t,4)}.`,
    hint:w==='sin'?'sin 2x = 2 sin x cos x.':'cos 2x = cos²x − sin²x.',diag:([v])=>near(v,2*p/r,.001)||near(v,2*q/r,.001)?'calc':null})};
