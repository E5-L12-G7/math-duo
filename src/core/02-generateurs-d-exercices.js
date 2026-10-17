/* ================= générateurs d'exercices ================= */
const eqv=(a,str)=>{try{return equiv(a,str)}catch(e){return false}};
const HINT_BAL='Touche un terme puis choisis une action, ou fais-le glisser de l’autre côté du signe. Développe les parenthèses et regroupe les termes semblables avant de diviser.';
const SOLW={'<':'strictement inférieures à','<=':'inférieures ou égales à','>':'strictement supérieures à','>=':'supérieures ou égales à'};
function balQ(L,R,rel,sol,solRel){if(Math.random()<.3){[L,R]=[R,L];rel=FLIP[rel]}
  return{type:'balance',instr:rel==='='?'Résous l’équation':'Résous l’inéquation',S:{L,R,rel},sol,solRel,
    hint:HINT_BAL+(rel==='='?'':' Attention : diviser par un nombre négatif inverse le sens de l’inégalité.'),
    solTxt:`<span class="m"><i>x</i> ${REL[solRel]} ${num(sol)}</span>${solRel==='='?'':` : toutes les valeurs ${SOLW[solRel]} ${num(sol)}.`}`}}
const cT=(A,v)=>{if(v)A.push(T('c',v))};
const gLin1=()=>{const x=R(-9,9),a=nz(2,9)*(Math.random()<.3?-1:1),b=nz(-12,12),tot=a*x+b;let c1;do c1=nz(-15,15);while(c1===tot);
  return balQ([T('x',a),T('c',b)],[T('c',c1),T('c',tot-c1)],'=',x,'=')};
const gLin2=()=>{const x=R(-8,8);let a,c,d;do{a=nz(-6,9);c=nz(-6,6);d=nz(-6,9)}while(a+c-d===0||a+c===0);
  const b=nz(-10,10),R2=[T('x',d)];cT(R2,(a+c-d)*x+b);return balQ([T('x',a),T('c',b),T('x',c)],R2,'=',x,'=')};
const gLin3=()=>{const k=pick([2,3,4,5]),m=pick([1,1,2,3].filter(v=>gcd(v,k)===1&&v!==k)),t=R(-3,5),x=k*t,b=nz(-9,9),rhs=m*t+b;let c1;do c1=nz(-9,9);while(c1===rhs);
  return balQ([T('x',new Fr(m,k)),T('c',b)],[T('c',c1),T('c',rhs-c1)],'=',x,'=')};
const gLin4=()=>{const x=R(-6,6),a=nz(2,5)*(Math.random()<.3?-1:1),p=nz(-6,6),b=nz(-9,9);let c;do c=nz(-4,4);while(c===a);
  const R2=[T('x',c)];cT(R2,a*(x+p)+b-c*x);return balQ([G(a,[['x',1],['c',p]]),T('c',b)],R2,'=',x,'=')};
const gIneq=()=>{const x=R(-7,7),rel=pick(['<','<=','>','>=']);let a,c;do{a=nz(-7,7);c=nz(-5,5)}while(a===c);
  if(Math.random()<.55&&a-c>0)[a,c]=[c,a]; // souvent un coefficient final négatif : il faudra inverser le sens
  const b=R(-9,9),Lq=[T('x',a)],Rq=[T('x',c)];cT(Lq,b);cT(Rq,(a-c)*x+b);
  return balQ(Lq,Rq,rel,x,a-c<0?FLIP[rel]:rel)};

const RH='Fais glisser la règle pour choisir l’exposant.';
const rq=(p,target,explain,hint,diag)=>({type:'ruler',instr:'Simplifie en une seule puissance de <i class="mi">x</i>',prompt:M(p),target,explain,hint,diag});
const gE1=()=>{const a=R(2,9),b=R(2,9);return rq(`x^${a}*x^${b}`,a+b,`Même base : on additionne les exposants, ${a} + ${b} = ${a+b}.`,'<span class="m"><i>x</i><sup>a</sup> · <i>x</i><sup>b</sup> = <i>x</i><sup>a+b</sup></span>',v=>v===a*b?'exp-mul':null)};
const gE2=()=>{const a=R(2,5),b=R(2,4);return rq(`(x^${a})^${b}`,a*b,`Puissance d’une puissance : on multiplie, ${a} × ${b} = ${a*b}.`,'<span class="m">(<i>x</i><sup>a</sup>)<sup>b</sup> = <i>x</i><sup>a·b</sup></span>',v=>v===a+b?'exp-pow-add':null)};
const gE3=()=>{const a=R(2,9);let b;do b=R(2,11);while(b===a);return rq(`x^${a}/x^${b}`,a-b,`Quotient : on soustrait, ${a} ${MINUS} ${b} = ${num(a-b)}.`,'<span class="m"><i>x</i><sup>a</sup> ÷ <i>x</i><sup>b</sup> = <i>x</i><sup>a−b</sup></span>',v=>v===b-a?'signe':v===a+b?'exp-quot-add':null)};
const gE4=()=>{const a=R(2,8),b=R(1,9);return rq(`x^-${a}*x^${b}`,b-a,`On additionne : ${MINUS}${a} + ${b} = ${num(b-a)}.`,'Un exposant négatif s’additionne comme les autres.',v=>v===a+b?'exp-neg':v===a-b?'signe':null)};
const gE5=()=>{const a=R(2,4),b=R(2,3),c=R(1,9);return rq(`(x^${a})^${b}/x^${c}`,a*b-c,`D’abord ${a} × ${b} = ${a*b}, puis ${a*b} ${MINUS} ${c} = ${num(a*b-c)}.`,'Commence par la parenthèse, puis le quotient.',v=>v===a+b-c?'exp-pow-add':v===a*b+c?'signe':null)};
const gE6=()=>{const k=R(2,3),a=R(2,4),b=R(2,3);return{type:'input',instr:'Simplifie',prompt:M(`(${k}x^${a})^${b}`)+` <span class="op">=</span> <span class="m">□<i>x</i><sup>□</sup></span>`,
  fields:[{label:'Coefficient',kind:'num'},{label:'Exposant',kind:'num'}],
  check:([c,e])=>close(ev(c),k**b)&&close(ev(e),a*b),
  diag:([c,e])=>close(ev(c),k*b)?'coef-pow':close(ev(e),a+b)?'exp-pow-add':null,
  explain:`Le coefficient et la puissance sont tous deux élevés à la puissance ${b} : ${k}<sup>${b}</sup> = ${k**b} et ${a} × ${b} = ${a*b}, d’où ${M(`${k**b}x^${a*b}`)}.`,
  hint:'<span class="m">(k<i>x</i><sup>a</sup>)<sup>b</sup> = k<sup>b</sup><i>x</i><sup>a·b</sup></span>'}};

const exprQ=(instr,prompt,label,target,explain,hint,noPar=true,diag)=>({type:'input',instr,prompt,fields:[{label,kind:'expr'}],
  check:([a],raw)=>{if(noPar&&raw[0].includes('('))return'nopar';return equiv(a,target)},explain,hint,diag,ans:[target]});
const gDev1=()=>{const p=nz(-9,9),q=nz(-9,9),t=poly([1,p+q,p*q]);return exprQ('Développe et réduis',M(`(x${sg(p)})(x${sg(q)})`),'=',t,
  `${M(`x^2${sg(q)}x${sg(p)}x${sg(p*q)}`)} = ${M(t)}`,'Multiplie chaque terme du premier facteur par chaque terme du second.',true,([u])=>eqv(u,poly([1,0,p*q]))?'dev-middle':(eqv(u,poly([1,p+q,-p*q]))||eqv(u,poly([1,-(p+q),p*q])))?'signe':null)};
const gDev2=()=>{const p=nz(-9,9),t=poly([1,2*p,p*p]);return exprQ('Développe et réduis',M(`(x${sg(p)})^2`),'=',t,
  `Identité remarquable : ${M(`x^2${sg(2*p)}x+${p*p}`)}.`,'<span class="m">(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup></span>',true,([u])=>(eqv(u,poly([1,0,p*p]))||eqv(u,poly([1,p,p*p])))?'id-rem':eqv(u,poly([1,-2*p,p*p]))?'signe':null)};
const gDev3=()=>{const a=R(2,3),p=nz(-6,6),q=nz(-6,6),t=poly([a,a*q+p,p*q]);return exprQ('Développe et réduis',M(`(${a}x${sg(p)})(x${sg(q)})`),'=',t,
  `${M(`${a}x^2${sg(a*q)}x${sg(p)}x${sg(p*q)}`)} = ${M(t)}`,'Distribue les deux termes, puis regroupe les termes en <i class="mi">x</i>.',true,([u])=>eqv(u,poly([a,0,p*q]))?'dev-middle':null)};
const sTile=v=>`${v<0?MINUS:'+'} ${Math.abs(v)}`;
function factorQ(a,p,q,extra){
  const b=a*q+p,c=p*q,set=[p,q],cands=shuffle([-p,-q,p+q,-(p+q),p+1,q-1,p*q,-p*q,...(extra||[])]);
  for(const v of cands){if(set.length>=6)break;if(v===0||Math.abs(v)>81||set.includes(v))continue;set.push(v)}
  return{type:'tiles',instr:'Factorise : place les nombres',prompt:M(poly([a,b,c])),
    tpl:[`(${a>1?a:''}<i class="mi">x</i>`,0,`)(<i class="mi">x</i>`,1,')'],
    tiles:shuffle(set.map(v=>({h:sTile(v),v}))),
    check:([s,t])=>a*t+s===b&&s*t===c,
    diag:([s,t])=>{const sm=a*t+s===b,pr=s*t===c;if(sm&&!pr)return'fac-prod';if(pr&&!sm)return a*t+s===-b?'signe':'fac-sum';return null},
    explain:a===1?`On cherche deux nombres de somme ${num(b)} et de produit ${num(c)} : ${num(p)} et ${num(q)}. Donc ${M(`(x${sg(p)})(x${sg(q)})`)}.`
      :`En développant ${M(`(${a}x${sg(p)})(x${sg(q)})`)} on retrouve ${M(poly([a,b,c]))}.`,
    hint:a===1?`Deux nombres dont la somme vaut ${num(b)} et le produit ${num(c)}.`:'Le produit des deux nombres doit donner le terme constant.'}}
const gFac1=()=>factorQ(1,nz(-9,9),nz(-9,9));
const gFac2=()=>{const k=R(2,9),q=factorQ(1,k,-k,[k*k,-k*k]);q.explain=`Différence de deux carrés : ${M(`x^2-${k*k}`)} = ${M(`(x+${k})(x-${k})`)}.`;q.hint='<span class="m">a<sup>2</sup> − b<sup>2</sup> = (a + b)(a − b)</span>';return q};
const gFac3=()=>factorQ(R(2,3),nz(-6,6),nz(-5,5));

const numQ=(instr,prompt,fields,check,explain,hint,diag)=>({type:'input',instr,prompt,fields:fields.map(l=>({label:l,kind:'num'})),check,explain,hint,diag});
const gQ1=()=>{const r1=R(-7,7);let r2;do r2=R(-7,7);while(r2===r1);const eq=M(poly([1,-(r1+r2),r1*r2]))+' = 0';
  return numQ('Trouve les deux solutions',eq,['<i class="mi">x</i>₁ =','<i class="mi">x</i>₂ ='],([a,b])=>{const u=ev(a),v=ev(b);return(close(u,r1)&&close(v,r2))||(close(u,r2)&&close(v,r1))},
  `${M(poly([1,-(r1+r2),r1*r2]))} = ${M(`(x${sg(-r1)})(x${sg(-r2)})`)}, donc <span class="m"><i>x</i> = ${num(r1)}</span> ou <span class="m"><i>x</i> = ${num(r2)}</span>.`,'Factorise, puis un produit est nul si l’un de ses facteurs est nul.',([a,b])=>{const u=ev(a),v=ev(b);return((close(u,-r1)&&close(v,-r2))||(close(u,-r2)&&close(v,-r1)))?'roots-sign':null})};
const gQ2=()=>{const a=nz(-3,3),b=R(-8,8),c=R(-6,6),d=b*b-4*a*c;
  return numQ('Calcule le discriminant',M(poly([a,b,c]))+' = 0',['Δ ='],([v])=>close(ev(v),d),
  `Δ = b² − 4ac = ${num(b)}² − 4 × ${num(a)} × ${num(c)} = ${num(d)}.`,'<span class="m">Δ = b<sup>2</sup> − 4ac</span>',([v])=>{const x=ev(v);return close(x,b*b+4*a*c)?'delta-formula':close(x,-b*b-4*a*c)?'carre-neg':null})};
const gQ3=()=>{const k=R(0,2);let cs;
  if(k===1){const r=nz(-5,5);cs=[1,-2*r,r*r]}else if(k===2){const r=R(-6,6);let s;do s=R(-6,6);while(s===r);cs=[1,-(r+s),r*s]}else{const b=R(-4,4);cs=[1,b,Math.floor(b*b/4)+R(1,6)]}
  const d=cs[1]**2-4*cs[2];
  return{type:'tiles',instr:'Combien de solutions réelles ?',prompt:M(poly(cs))+' = 0',tpl:['Solutions :',0],
    tiles:[0,1,2].map(v=>({h:String(v),v,cls:'sq'})),check:([v])=>v===k,diag:()=>'delta-sign',
    explain:`Δ = ${num(d)} ${d>0?'> 0 : deux solutions':d===0?'= 0 : une solution double':'< 0 : aucune solution réelle'}.`,hint:'Regarde le signe de Δ = b² − 4ac.'}};
const gQ4=()=>{const h=R(-5,5),k=R(-9,9);return numQ('Trouve le sommet S(h ; k)','<i class="mi">y</i> = '+M(poly([1,-2*h,h*h+k])),['h =','k ='],([a,b])=>close(ev(a),h)&&close(ev(b),k),
  `Forme canonique : <i class="mi">y</i> = ${M(h?`(x${sg(-h)})^2${k?sg(k):''}`:`x^2${k?sg(k):''}`)}, donc S(${num(h)} ; ${num(k)}).`,'<span class="m">h = −b ⁄ 2a</span>, puis k = <i>y</i>(h).',([u])=>h!==0&&close(ev(u),-h)?'vertex-sign':null)};

const cx=(a,b)=>`${num(a)} ${b<0?MINUS:'+'} ${Math.abs(b)===1?'':Math.abs(b)}<i class="mi">i</i>`;
const gC1=()=>{const a=R(2,6),b=pick([2,3,5,6,7]),n=a*a*b;return numQ('Simplifie la racine',`<span class="m"><span class="sqrt"><span class="rad">√</span><span class="rc">${n}</span></span> = a<span class="sqrt"><span class="rad">√</span><span class="rc">b</span></span></span>`,['a =','b ='],
  ([x,y])=>close(ev(x),a)&&close(ev(y),b),`${n} = ${a*a} × ${b}, et √${a*a} = ${a}. Donc √${n} = ${a}√${b}.`,'Cherche le plus grand carré parfait qui divise le nombre.',([x,y])=>(close(ev(x),a*a)||close(ev(y),a*a))?'rad-root':null)};
const gC2=()=>{const n=R(5,40),r=n%4,L=['1','<i class="mi">i</i>',MINUS+'1',MINUS+'<i class="mi">i</i>'];
  return{type:'tiles',instr:'Calcule la puissance',prompt:`<span class="m"><i>i</i><sup>${n}</sup></span>`,tpl:['=',0],tiles:L.map((h,v)=>({h,v,cls:'sq'})),check:([v])=>v===r,diag:()=>'i-cycle',
    explain:`Les puissances de <i class="mi">i</i> se répètent tous les 4. ${n} = 4 × ${Math.floor(n/4)} + ${r}, donc <span class="m"><i>i</i><sup>${n}</sup> = <i>i</i><sup>${r}</sup> = ${L[r]}</span>.`,hint:'<span class="m"><i>i</i><sup>2</sup> = −1</span> et <span class="m"><i>i</i><sup>4</sup> = 1</span>.'}};
const gC3=()=>{const a=nz(-5,5),b=nz(-5,5),c=nz(-5,5),d=nz(-5,5),re=a*c-b*d,im=a*d+b*c;
  return numQ('Multiplie et écris sous la forme a + bi',`<span class="m">(${cx(a,b)})(${cx(c,d)})</span>`,['Partie réelle','Partie imag.'],([x,y])=>close(ev(x),re)&&close(ev(y),im),
  `Réelle : ${num(a)}·${num(c)} − (${num(b)})(${num(d)}) = ${num(re)}. Imaginaire : ${num(a)}·${num(d)} + ${num(b)}·${num(c)} = ${num(im)}. Résultat <span class="m">${cx(re,im)}</span>.`,'Développe, puis remplace <span class="m"><i>i</i><sup>2</sup></span> par −1.',([x])=>close(ev(x),a*c+b*d)?'i2':null)};
const gC4=()=>{const a=nz(-9,9),b=nz(-9,9),c=nz(-9,9),d=nz(-9,9),s=Math.random()<.5?1:-1,re=a+s*c,im=b+s*d;
  return numQ('Calcule et écris sous la forme a + bi',`<span class="m">(${cx(a,b)}) ${s>0?'+':MINUS} (${cx(c,d)})</span>`,['Partie réelle','Partie imag.'],([x,y])=>close(ev(x),re)&&close(ev(y),im),
  `On regroupe : réelles ${num(re)}, imaginaires ${num(im)}. Résultat <span class="m">${cx(re,im)}</span>.`,'Traite les parties réelles et imaginaires séparément.',([x,y])=>s<0&&(close(ev(x),a+c)||close(ev(y),b+d))?'signe':null)};

const LOG=(b,a)=>`<span class="m">log<sub>${b}</sub>(${a})</span>`;
const kmax={2:7,3:5,5:4,10:4};
const gL1=()=>{const b=pick([2,3,5,10]),k=R(0,kmax[b]);return numQ('Calcule',LOG(b,b**k),['='],([v])=>close(ev(v),k),`${b}<sup>${k}</sup> = ${b**k}, donc ${LOG(b,b**k)} = ${k}.`,`À quelle puissance faut-il élever ${b} pour obtenir ${b**k} ?`,([v])=>{const x=ev(v);return(close(x,b**k)||close(x,b*k))?'log-def':null})};
const gL2=()=>{const b=pick([2,3,5,10]),k=R(1,kmax[b]);return numQ('Résous',LOG(b,'<i class="mi">x</i>')+` = ${k}`,['<i class="mi">x</i> ='],([v])=>close(ev(v),b**k),`log<sub>${b}</sub>(<i>x</i>) = ${k} ⟺ <i>x</i> = ${b}<sup>${k}</sup> = ${b**k}.`,'<span class="m">log<sub>b</sub>(<i>x</i>) = k ⟺ <i>x</i> = b<sup>k</sup></span>',([v])=>{const x=ev(v);return(close(x,k**b)||close(x,b*k)||close(x,k))?'log-def':null})};
const gL3=()=>{const b=pick([2,3,5]),m=nz(-3,3),n=R(1,kmax[b]);return numQ('Résous',M(`${b}^(x${sg(m)})`)+` = ${b**n}`,['<i class="mi">x</i> ='],([v])=>close(ev(v),n-m),
  `${b**n} = ${b}<sup>${n}</sup>, donc <i>x</i> ${m<0?MINUS:'+'} ${Math.abs(m)} = ${n}, soit <i>x</i> = ${num(n-m)}.`,`Écris ${b**n} comme une puissance de ${b}.`,([v])=>{const x=ev(v);return close(x,n+m)?'signe':close(x,b**n-m)?'exp-eq':null})};
const gL4=()=>{const b=pick([2,3,10]),m=R(2,9),n=R(2,9);return numQ('Complète',LOG(b,m)+' + '+LOG(b,n)+' = '+LOG(b,'?'),['? ='],([v])=>close(ev(v),m*n),`La somme des logs est le log du produit : ${m} × ${n} = ${m*n}.`,'<span class="m">log(a) + log(b) = log(ab)</span>',([v])=>close(ev(v),m+n)?'log-prod':null)};
const gL5=()=>{const b=pick([2,3,10]),n=R(2,6),k=R(2,8);return numQ('Complète',LOG(b,n*k)+` ${MINUS} `+LOG(b,n)+' = '+LOG(b,'?'),['? ='],([v])=>close(ev(v),k),`La différence des logs est le log du quotient : ${n*k} ÷ ${n} = ${k}.`,'<span class="m">log(a) − log(b) = log(a ⁄ b)</span>',([v])=>close(ev(v),n*k-n)?'log-quot':null)};

const fdef=(n,s)=>`<span class="row"><i class="mi">${n}</i>(<i class="mi">x</i>) = ${M(s)}</span>`;
const gF1=()=>{const a=nz(-5,5),b=nz(-9,9),quad=Math.random()<.6,c=nz(-9,9),d=nz(-4,4),f=poly([a,b]),g=quad?poly([1,0,c]):poly([d,c]),fog=Math.random()<.5;
  const t=fog?`${a}*(${g})${sg(b)}`:(quad?`(${f})^2${sg(c)}`:`${d}*(${f})${sg(c)}`);
  const exp=fog?(quad?poly([a,0,a*c+b]):poly([a*d,a*c+b])):(quad?poly([a*a,2*a*b,b*b+c]):poly([d*a,d*b+c]));
  const nm=fog?'<i class="mi">f</i>(<i class="mi">g</i>(<i class="mi">x</i>))':'<i class="mi">g</i>(<i class="mi">f</i>(<i class="mi">x</i>))';
  return exprQ(`Calcule ${nm}`,fdef('f',f)+fdef('g',g),nm+' =',exp,`On remplace <i class="mi">x</i> par ${fog?'<i class="mi">g</i>(<i class="mi">x</i>)':'<i class="mi">f</i>(<i class="mi">x</i>)'} : ${M(t)} = ${M(exp)}.`,'Écris la fonction extérieure, puis remplace chaque <i class="mi">x</i> par la fonction intérieure.',false,([u])=>eqv(u,fog?(quad?`(${f})^2${sg(c)}`:`${d}*(${f})${sg(c)}`):`${a}*(${g})${sg(b)}`)?'comp-order':eqv(u,`(${f})*(${g})`)?'comp-prod':null)};
const gF2=()=>{const a=nz(2,5)*(Math.random()<.35?-1:1),b=nz(-9,9),inv=a>0?`(x${sg(-b)})/${a}`:`(${b}-x)/${-a}`;
  return exprQ('Trouve la fonction réciproque',fdef('f',poly([a,b])),'<i class="mi">f</i><sup>−1</sup>(<i class="mi">x</i>) =',inv,
  `On résout <i class="mi">y</i> = ${M(poly([a,b]))} pour <i class="mi">x</i>, puis on échange : <i class="mi">f</i><sup>−1</sup>(<i class="mi">x</i>) = ${M(inv)}.`,'Pose <i class="mi">y</i> = <i class="mi">f</i>(<i class="mi">x</i>) et isole <i class="mi">x</i>. La touche ÷ crée une fraction.',false,([u])=>eqv(u,`(x${sg(b)})/(${a})`)?'signe':eqv(u,`1/(${poly([a,b])})`)?'inv-recip':null)};
const gF3=()=>{const a=nz(-3,3),b=R(-6,6),c=R(-9,9),k=R(-4,4),v=a*k*k+b*k+c;
  return numQ(`Calcule <i class="mi">f</i>(${num(k)})`,fdef('f',poly([a,b,c])),['<i class="mi">f</i>('+num(k)+') ='],([x])=>close(ev(x),v),
  `${num(a)}·(${num(k)})² ${b<0?MINUS:'+'} ${Math.abs(b)}·(${num(k)}) ${c<0?MINUS:'+'} ${Math.abs(c)} = ${num(v)}.`,'Remplace chaque <i class="mi">x</i> par la valeur, entre parenthèses.',([x])=>k!==0&&close(ev(x),-a*k*k+b*k+c)?'carre-neg':null)};

/* ---- Chapitre 0 : formalisme (questions à choix) ---- */
function mcq(instr,prompt,opts,explain,hint,keep){const seen=new Map;opts.forEach(o=>{const p=seen.get(o.h);if(!p||(!p.ok&&o.ok))seen.set(o.h,o)});opts=[...seen.values()];const q={type:'mcq',instr,prompt,opts:keep?opts:shuffle(opts),explain,hint};q.diag=i=>q.opts[i]&&q.opts[i].tag;return q}
const SETS=[['7','ℕ','7 est un entier positif : il est dans ℕ, donc aussi dans ℤ, ℚ et ℝ.'],
  ['−3','ℤ','−3 est un entier négatif : il est dans ℤ mais pas dans ℕ.'],
  [fr(2,5),'ℚ','2/5 est un quotient d’entiers qui n’est pas un entier : il est dans ℚ.'],
  ['−0,75','ℚ','−0,75 = −3/4 : c’est un quotient d’entiers, donc un rationnel.'],
  ['√2','ℝ','√2 ne peut pas s’écrire comme une fraction d’entiers : il est réel mais pas rationnel.'],
  ['π','ℝ','π n’est pas un quotient d’entiers : il est réel mais pas rationnel.'],
  ['√16','ℕ','√16 = 4, un entier positif.'],
  [fr('−12',4),'ℤ','−12/4 = −3, un entier négatif.'],
  ['0','ℕ','0 est un entier naturel.'],
  ['1,5','ℚ','1,5 = 3/2 : rationnel, mais pas entier.']];
const SETN={'ℕ':'entiers naturels','ℤ':'entiers relatifs','ℚ':'rationnels','ℝ':'réels'};
const gSet=()=>{const[v,set,why]=pick(SETS);
  return mcq('Quel est le plus petit ensemble qui contient ce nombre ?',`<span class="m">${v}</span>`,
    ['ℕ','ℤ','ℚ','ℝ'].map(k=>({h:`<span class="m">${k}</span> <small>${SETN[k]}</small>`,ok:k===set,tag:'ensemble'})),why,
    '<span class="m">ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</span> : pars de ℕ et prends le premier ensemble qui contient le nombre.',true)};
const IV=(lo,a,b,hi)=>`<span class="m">${lo==='inf'?']−∞':lo+num(a)} ; ${hi==='inf'?'+∞[':num(b)+hi}</span>`;
function INQ(lo,a,b,hi){
  if(lo==='inf'&&hi==='inf')return mx('x ∈ ℝ');
  if(hi==='inf')return mx(`x ${lo==='['?'≥':'&gt;'} ${num(a)}`);
  if(lo==='inf')return mx(`x ${hi===']'?'≤':'&lt;'} ${num(b)}`);
  return mx(`${num(a)} ${lo==='['?'≤':'&lt;'} x ${hi===']'?'≤':'&lt;'} ${num(b)}`)}
function ivCase(){const a=R(-9,6),b=a+R(1,8),t=R(0,2);
  if(t===0){const lo=pick(['[',']']),hi=pick([']','[']),c=[lo,a,b,hi];
    const v=[];for(const L2 of['[',']'])for(const H2 of[']','['])if(L2!==lo||H2!==hi)v.push({c:[L2,a,b,H2],tag:'bracket'});return{c,v}}
  if(t===1){const lo=pick(['[',']']),c=[lo,a,0,'inf'];
    return{c,v:[{c:[lo==='['?']':'[',a,0,'inf'],tag:'bracket'},{c:['inf',0,a,lo==='['?']':'['],tag:'interval-dir'}],inf:`<span class="m">${lo}${num(a)} ; +∞]</span>`}}
  const hi=pick([']','[']),c=['inf',0,b,hi];
  return{c,v:[{c:['inf',0,b,hi===']'?'[':']'],tag:'bracket'},{c:[hi===']'?'[':']',b,0,'inf'],tag:'interval-dir'}],inf:`<span class="m">[−∞ ; ${num(b)}${hi}</span>`}}
const IVHINT='Crochet tourné vers le nombre s’il est inclus (≤ ou ≥), tourné vers l’extérieur s’il est exclu (&lt; ou &gt;). Du côté de l’infini, le crochet est toujours ouvert.';
const gIntv=()=>{const{c,v,inf}=ivCase(),o=[{h:IV(...c),ok:true},...v.map(x=>({h:IV(...x.c),tag:x.tag}))];if(inf)o.push({h:inf,tag:'bracket'});
  return mcq('Écris sous forme d’intervalle',INQ(...c),o,`${INQ(...c)} s’écrit <span class="m"><i>x</i> ∈ </span>${IV(...c)}.`,IVHINT)};
const gIntv2=()=>{const{c,v}=ivCase();
  return mcq('Traduis par une inégalité',`<span class="m"><i>x</i> ∈ </span>${IV(...c)}`,[{h:INQ(...c),ok:true},...v.map(x=>({h:INQ(...x.c),tag:x.tag}))],
    `${IV(...c)} correspond à ${INQ(...c)}.`,IVHINT)};
const gSol=()=>{const t=R(0,3),k=R(2,9);let pr,o,why;
  if(t===0){pr=`x<sup>2</sup> = ${k*k}`;o=[[`S = {−${k} ; ${k}}`,1],[`S = {${k}}`],[`S = [−${k} ; ${k}]`],[`S = ${k}`]];why=`Deux nombres ont pour carré ${k*k} : ${k} et −${k}. Une liste de solutions s’écrit entre accolades : S = {−${k} ; ${k}}.`}
  else if(t===1){pr=`x<sup>2</sup> = −${k*k}`;o=[['S = ∅',1],['S = {0}'],[`S = {−${k}}`],['S = 0']];why='Un carré n’est jamais négatif : il n’y a aucune solution réelle. On écrit S = ∅ (l’ensemble vide).'}
  else if(t===2){pr=`2(x + ${k}) = 2x + ${2*k}`;o=[['S = ℝ',1],['S = ∅'],['S = {0}'],[`S = {${k}}`]];why=`En développant, on obtient 2x + ${2*k} = 2x + ${2*k}, vrai pour tout x. Tous les réels sont solutions : S = ℝ.`}
  else{const a=R(2,5),x0=nz(-6,6);pr=`${a}x = ${num(a*x0)}`;o=[[`S = {${num(x0)}}`,1],[`S = ${num(x0)}`],[`S = [0 ; ${num(x0)}]`],[`S = {${num(a*x0)}}`]];why=`L’unique solution est ${num(x0)}. Un ensemble s’écrit entre accolades : S = {${num(x0)}}.`}
  return mcq('Écris l’ensemble des solutions',mx(pr),o.map(([h,ok])=>({h:mx(h),ok:!!ok,tag:'notation-sol'})),why,
    'Accolades { } pour une liste de valeurs, ∅ s’il n’y en a aucune, ℝ si tous les réels conviennent.')};
const LOGIC=[['x = 2 ⇒ x<sup>2</sup> = 4',1,'Si x vaut 2, son carré vaut forcément 4.'],
  ['x<sup>2</sup> = 4 ⇒ x = 2',0,'Contre-exemple : x = −2 donne aussi x² = 4.'],
  ['x<sup>2</sup> = 4 ⟺ x = 2',0,'Il manque la solution x = −2 : le sens « ⇒ » est faux.'],
  ['x<sup>2</sup> = 4 ⟺ (x = 2 ou x = −2)',1,'Les deux sens sont vrais : c’est une équivalence.'],
  ['∀ x ∈ ℝ, x<sup>2</sup> ≥ 0',1,'Un carré est toujours positif ou nul.'],
  ['∀ x ∈ ℝ, x<sup>2</sup> &gt; 0',0,'Contre-exemple : pour x = 0, x² = 0, qui n’est pas strictement positif.'],
  ['∃ x ∈ ℝ, x<sup>2</sup> = −1',0,'Aucun réel n’a un carré négatif. Il faut les nombres complexes.'],
  ['∃ x ∈ ℤ, 2x = 1',0,'La seule solution est x = 1/2, qui n’est pas un entier.'],
  ['3x = 12 ⟺ x = 4',1,'Diviser par 3 est réversible : les deux égalités sont équivalentes.'],
  ['x &gt; 2 ⇒ x &gt; 1',1,'Tout nombre plus grand que 2 est plus grand que 1.'],
  ['x &gt; 1 ⇒ x &gt; 2',0,'Contre-exemple : 1,5 est plus grand que 1 mais pas que 2.'],
  ['∃ x ∈ ℕ, x + 3 = 1',0,'Il faudrait x = −2, qui n’est pas un entier naturel.']];
const gLogic=()=>{const[st0,v,why]=pick(LOGIC);
  return mcq('Cette affirmation est-elle vraie ?',mx(st0),[{h:'Vraie',ok:!!v,tag:'implication'},{h:'Fausse',ok:!v,tag:'implication'}],why,
    'Pour montrer qu’une implication ou une affirmation « pour tout » est fausse, un seul contre-exemple suffit.',true)};
