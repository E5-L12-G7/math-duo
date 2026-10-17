/* ===================== MVA912 · Complexes : formes trigonométrique et exponentielle ===================== */
Object.assign(ANA_ERR,{
  'm2ct-moivre':{label:'Formule de Moivre',tip:'(r e<sup>iθ</sup>)ⁿ = rⁿ e<sup>inθ</sup> : le module est élevé à la puissance n, l’argument est multiplié par n.'},
  'm2ct-prod':{label:'Produit en forme exponentielle',tip:'On multiplie les modules et on additionne les arguments (on les soustrait pour un quotient), puis on ramène l’angle dans ]−π ; π].'}});
/** angle k·π/12 ramené dans ]−12 ; 12] */
const M2CT_n=k=>{k=((k%24)+24)%24;return k>12?k-24:k};
const M2CT_COS={0:'1',2:'√3/2',3:'√2/2',4:'1/2',6:'0',8:'−1/2',9:'−√2/2',10:'−√3/2',12:'−1'};
const M2CT_cos=k=>M2CT_COS[Math.abs(M2CT_n(k))]??dec(Math.cos(k*Math.PI/12),3);
/** valeur exacte lisible : entier, k√2, k√3, fraction simple, sinon arrondi */
const M2CT_ex=v=>{const I=x=>Math.abs(x-Math.round(x))<1e-9;if(I(v))return num(Math.round(v));
  for(const[s,r]of[['√2',Math.SQRT2],['√3',Math.sqrt(3)]]){const k=v/r;if(I(k)){const n=Math.round(k);return(n<0?MINUS:'')+(Math.abs(n)===1?'':Math.abs(n))+s}
    if(I(2*k)){const n=Math.round(2*k);return(n<0?MINUS:'')+(Math.abs(n)===1?'':Math.abs(n))+s+'/2'}}
  if(I(2*v))return(v<0?MINUS:'')+fr(Math.abs(Math.round(2*v)),2);return'≈ '+dec(v,3)};
const M2CT_z=(a,b)=>{const A=M2CT_ex(a),B=M2CT_ex(Math.abs(b)),I='<i>i</i>';const bi=B==='1'?I:`${B}${I}`;
  if(Math.abs(b)<1e-9)return A;if(Math.abs(a)<1e-9)return(b<0?MINUS:'')+bi;return`${A} ${b<0?MINUS:'+'} ${bi}`};
const M2CT_E=(r,k)=>{const kk=M2CT_n(k);return`${r==='1'?'':r}e<sup>${kk<0?MINUS:''}<i>i</i>${angP(Math.abs(kk))}</sup>`.replace('<sup><i>i</i>0</sup>','<sup>0</sup>')};
const M2CT_p=k=>k<0?`(${angP(k)})`:angP(k);
const M2CT_K=[2,3,4,8,9,10,-2,-3,-4,-8,-9,-10];
/* table : [texte, a, b, module (texte), module, k (×π/12)] */
const M2CT_T=(()=>{const s3=Math.sqrt(3),s2=Math.SQRT2,I='<i>i</i>';return[
  [`1 + ${I}`,1,1,'√2',s2,3],[`−1 + ${I}`,-1,1,'√2',s2,9],[`−1 − ${I}`,-1,-1,'√2',s2,-9],[`1 − ${I}`,1,-1,'√2',s2,-3],
  [`√3 + ${I}`,s3,1,'2',2,2],[`−√3 + ${I}`,-s3,1,'2',2,10],[`−√3 − ${I}`,-s3,-1,'2',2,-10],[`√3 − ${I}`,s3,-1,'2',2,-2],
  [`1 + ${I}√3`,1,s3,'2',2,4],[`−1 + ${I}√3`,-1,s3,'2',2,8],[`−1 − ${I}√3`,-1,-s3,'2',2,-8],[`1 − ${I}√3`,1,-s3,'2',2,-4]]})();
/* 1. Placer r e^(iθ) */
const gM2CtArgP=()=>{const r=R(1,3),k=pick(M2CT_K.concat([6,-6,12])),a=r*Math.cos(k*Math.PI/12),b=r*Math.sin(k*Math.PI/12);
  return pointQ({instr:'Place le point qui représente z dans le plan complexe.',prompt:mx(`z = ${M2CT_E(String(r),k)}`),nom:'z',x:[-3.5,3.5],y:[-3.5,3.5],snap:.1,tol:.3,cible:[+a.toFixed(4),+b.toFixed(4)],fond:{cercle:r},
    explain:`Module ${r} : le point est sur le cercle de rayon ${r}. Argument ${angP(k)} : on tourne de cet angle depuis l’axe réel positif. Coordonnées : (${r} cos(${angP(k)}) ; ${r} sin(${angP(k)})) = (${M2CT_ex(a)} ; ${M2CT_ex(b)}).`,
    hint:'Le module donne la distance à l’origine (le cercle), l’argument donne la direction.',diag:([x,y])=>Math.abs(Math.hypot(x,y)-r)<.3?'cx-arg':'cx-module'})};
/* 2. Lire la forme exponentielle sur la figure */
const gM2CtRead=()=>{const r=pick([1,2]),k=pick(M2CT_K),a=r*Math.cos(k*Math.PI/12),b=r*Math.sin(k*Math.PI/12),rs=String(r);
  const o=[{h:mx(M2CT_E(rs,k)),ok:true},{h:mx(M2CT_E(rs,-k)),tag:'cx-arg'},{h:mx(M2CT_E(rs,12-k)),tag:'cx-arg'},{h:mx(M2CT_E(rs,6-k)),tag:'cx-arg'}];
  return mcq('Quelle est la forme exponentielle du complexe représenté ?',FIG.complexe({x:[-3,3],y:[-2.5,2.5],z:[[a,b,'z']],cercle:r}),o,
    `Le point est sur le cercle de rayon ${r} : module ${r}. Il est dans le ${a>0?(b>0?'premier':'quatrième'):(b>0?'deuxième':'troisième')} quart du plan, à l’angle ${angP(k)} de l’axe réel positif : z = ${M2CT_E(rs,k)}.`,
    'Regarde le quart du plan où se trouve le point : il fixe le signe de cos θ et de sin θ.')};
/* 3. De la forme exponentielle à la forme algébrique */
const gM2CtAlg=()=>{const r=R(1,6),k=pick(M2CT_K.concat([6,-6,12])),a=r*Math.cos(k*Math.PI/12),b=r*Math.sin(k*Math.PI/12);
  return nq({instr:'Écris z sous forme algébrique (valeurs exactes, par exemple 2√3).',prompt:mx(`z = ${M2CT_E(String(r),k)}`),labels:['Re =','Im ='],t:[a,b],
    explain:`a = r cos θ = ${r} × ${M2CT_cos(k)} = ${M2CT_ex(a)} et b = r sin θ = ${r} × ${M2CT_cos(k-6)} = ${M2CT_ex(b)}. Donc z = ${M2CT_z(a,b)}.`,
    hint:'a = r cos θ et b = r sin θ.',diag:([u,v])=>near(u,b,1e-6)&&near(v,a,1e-6)?'m2ca-reim':near(Math.abs(u),Math.abs(a),1e-6)&&near(Math.abs(v),Math.abs(b),1e-6)?'cx-arg':null})};
/* 4. Argument principal (figure) */
const gM2CtArg=()=>{const T=M2CT_T.concat([[`<i>i</i>`,0,1,'1',1,6],[`−<i>i</i>`,0,-1,'1',1,-6],['−1',-1,0,'1',1,12]]),[t,a,b,,,k]=pick(T),m=pick([1,1,2,3]);
  const tx=m===1?t:`${m}(${t})`,A=m*a,B=m*b,at=a?Math.atan(b/a):NaN;
  return nq({instr:'Donne l’argument principal de z, dans ]−π ; π] (valeur exacte, par exemple 2π/3).',prompt:mx(`z = ${tx}`)+FIG.complexe({x:[-6,6],y:[-6,6],z:[[A,B,'z']]}),labels:['arg z ='],t:[k*Math.PI/12],
    explain:`r = |z| = ${M2CT_ex(Math.hypot(A,B))}, cos θ = a/r = ${M2CT_cos(k)} et sin θ = b/r = ${M2CT_cos(k-6)}. Le point est ${!a?'sur l’axe imaginaire':!b?'sur l’axe réel':`dans le ${a>0?(b>0?'premier':'quatrième'):(b>0?'deuxième':'troisième')} quart du plan`} : θ = ${angP(k)}.`,
    hint:'Calcule cos θ = a/r et sin θ = b/r, puis regarde le quart du plan sur la figure.',diag:([v])=>a&&near(v,at,1e-6)?'cx-arg':near(v,-k*Math.PI/12,1e-6)?'cx-arg':null})};
/* 5. Placer un produit z × w */
const gM2CtProdP=()=>{const al=pick(M2CT_K),m=R(-1,2),be=M2CT_n(6*m-al),[r1,r2]=pick([[1,2],[2,1],[1.5,2],[2,1.5],[1,3],[3,1],[1,1],[2,2]]),r=r1*r2;
  if(r>3)return gM2CtProdP();const P=x=>[r1*Math.cos(x*Math.PI/12),r1*Math.sin(x*Math.PI/12)],Z=P(al),Wv=[r2*Math.cos(be*Math.PI/12),r2*Math.sin(be*Math.PI/12)],k=M2CT_n(al+be),T=[Math.round(r*Math.cos(k*Math.PI/12)),Math.round(r*Math.sin(k*Math.PI/12))];
  return pointQ({instr:'Place le point qui représente le produit z × w.',prompt:mx(`z = ${M2CT_E(num(r1),al)}    w = ${M2CT_E(num(r2),be)}`),nom:'P',x:[-3.5,3.5],y:[-3.5,3.5],snap:.5,tol:.24,cible:T,
    fond:{v:[[+Z[0].toFixed(3),+Z[1].toFixed(3),'z'],[+Wv[0].toFixed(3),+Wv[1].toFixed(3),'w']]},
    explain:`On multiplie les modules : ${num(r1)} × ${num(r2)} = ${num(r)}. On additionne les arguments : ${angP(al)} + (${angP(be)}) = ${angP(k)}. Donc z × w = ${M2CT_E(num(r),k)} = ${M2CT_z(T[0],T[1])}.`,
    hint:'Produit : modules multipliés, arguments additionnés.',diag:([x,y])=>near(x,Z[0]+Wv[0],.3)&&near(y,Z[1]+Wv[1],.3)?'m2ct-prod':null})};
/* 6. Module et argument d'un produit ou d'un quotient */
const gM2CtProd=()=>{const al=pick(M2CT_K),be=pick(M2CT_K),q=Math.random()<.4,r1=R(1,6),r2=R(2,4),k=M2CT_n(q?al-be:al+be),r=q?r1/r2:r1*r2;
  return nq({instr:`Donne le module et l’argument principal (dans ]−π ; π]) de ${q?'z / w':'z × w'}.`,prompt:mx(`z = ${M2CT_E(String(r1),al)}    w = ${M2CT_E(String(r2),be)}`),labels:['module =','argument ='],t:[r,k*Math.PI/12],
    explain:`${q?'Quotient : on divise les modules et on soustrait les arguments':'Produit : on multiplie les modules et on additionne les arguments'}. Module ${q?`${r1}/${r2}`:`${r1} × ${r2}`} = ${q?frH(new Fr(r1,r2)):r}. Argument ${angP(al)} ${q?MINUS:'+'} (${angP(be)}) = ${piFrac(q?al-be:al+be,12)}${M2CT_n(q?al-be:al+be)!==(q?al-be:al+be)?`, ramené dans ]−π ; π] : ${angP(k)}`:''}.`,
    hint:'Ramène l’argument dans ]−π ; π] en ajoutant ou retirant 2π.',diag:([m,t])=>near(t,(q?al-be:al+be)*Math.PI/12,1e-6)&&Math.abs(q?al-be:al+be)>12?'cx-arg':near(t,al*be*Math.PI*Math.PI/144,1e-6)||(!q&&near(m,r1+r2,1e-6))?'m2ct-prod':null})};
/* 7. Puissance (Moivre) */
const gM2CtPow=()=>{const[t,,,rs,rv,k]=pick(M2CT_T),n=R(2,rs==='2'?6:8),kn=M2CT_n(n*k),Rn=rv**n,a=Rn*Math.cos(kn*Math.PI/12),b=Rn*Math.sin(kn*Math.PI/12);
  return nq({instr:'Calcule la puissance sous forme algébrique (valeurs exactes).',prompt:mx(`(${t})<sup>${n}</sup>`),labels:['Re =','Im ='],t:[a,b],
    explain:`${t} = ${M2CT_E(rs,k)}. Moivre : (${M2CT_E(rs,k)})<sup>${n}</sup> = ${rs}<sup>${n}</sup> e<sup><i>i</i>×${n}×${M2CT_p(k)}</sup> = ${M2CT_ex(Rn)} ${M2CT_E('',kn)} (angle ramené dans ]−π ; π]). Donc ${M2CT_ex(Rn)} × (${M2CT_cos(kn)} + <i>i</i> × ${M2CT_cos(kn-6)}) = ${M2CT_z(a,b)}.`,
    hint:'Passe en forme exponentielle, puis (r e<sup>iθ</sup>)ⁿ = rⁿ e<sup>inθ</sup>.',diag:([u,v])=>near(u,n*rv*Math.cos(kn*Math.PI/12),1e-6)&&near(v,n*rv*Math.sin(kn*Math.PI/12),1e-6)?'m2ct-moivre':near(u,b,1e-6)&&near(v,a,1e-6)&&!near(a,b,1e-6)?'m2ca-reim':null})};
/* 8. Formules d'Euler (figure) */
const gM2CtEuler=()=>{const k=pick([2,3,4,8,9,10]),c=Math.cos(k*Math.PI/12),s=Math.sin(k*Math.PI/12),th='θ',I='<i>i</i>';
  const fig=FIG.complexe({x:[-1.6,1.6],y:[-1.3,1.3],cercle:1,z:[[c,s,`e^(iθ)`],[c,-s,'e^(−iθ)']]});
  const C=pick([
    [`e<sup>${I}${th}</sup> + e<sup>−${I}${th}</sup>`,`2 cos ${th}`,[`2${I} sin ${th}`,`2 sin ${th}`,'0'],'La somme de deux points symétriques par rapport à l’axe réel est horizontale : 2 cos θ.'],
    [`e<sup>${I}${th}</sup> − e<sup>−${I}${th}</sup>`,`2${I} sin ${th}`,[`2 cos ${th}`,`2 sin ${th}`,`−2${I} sin ${th}`],'La différence de deux points symétriques est verticale : 2i sin θ.'],
    [`|e<sup>${I}${th}</sup>|`,'1',[`cos ${th} + sin ${th}`,th,'2'],'e<sup>iθ</sup> est sur le cercle de rayon 1 : son module vaut 1, car cos²θ + sin²θ = 1.'],
    [`conj(e<sup>${I}${th}</sup>)`,`e<sup>−${I}${th}</sup>`,[`−e<sup>${I}${th}</sup>`,`e<sup>${I}(π − ${th})</sup>`,`${I}e<sup>${I}${th}</sup>`],'Le conjugué est le reflet par rapport à l’axe réel : cos θ − i sin θ = e<sup>−iθ</sup>.'],
    [`e<sup>${I}π</sup>`,'−1',['1',I,`−${I}`],'e<sup>iπ</sup> = cos π + i sin π = −1 : le demi-tour.'],
    [`e<sup>${I}π/2</sup>`,I,['1','−1',`−${I}`],'e<sup>iπ/2</sup> = cos(π/2) + i sin(π/2) = i : le quart de tour.']]);
  return mcq('Que vaut cette expression ?',mx(C[0])+fig,[{h:mx(C[1]),ok:true},...C[2].map(h=>({h:mx(h),tag:'cx-arg'}))],
    C[3]+' Formules d’Euler : cos θ = (e<sup>iθ</sup> + e<sup>−iθ</sup>)/2 et sin θ = (e<sup>iθ</sup> − e<sup>−iθ</sup>)/(2i).','Sur la figure, e<sup>iθ</sup> et e<sup>−iθ</sup> sont symétriques par rapport à l’axe réel.')};
/* 9. Linéariser (figure) */
const gM2CtLin=()=>{const L=[['cos²x','cos(x)^2','(1 + cos 2x)/2'],['sin²x','sin(x)^2','(1 − cos 2x)/2'],['sin x cos x','sin(x)*cos(x)','sin(2x)/2'],['cos³x','cos(x)^3','(3cos x + cos 3x)/4'],['sin³x','sin(x)^3','(3sin x − sin 3x)/4']];
  const i=R(0,4),[f,e,ok]=L[i],pool=L.filter((_,j)=>j!==i).map(x=>x[2]).concat(['(1 + cos x)/2','cos(2x)/2','2sin(2x)']);shuffle(pool);
  return mcq(`Laquelle de ces expressions est égale à ${f} ?`,stx('La courbe tracée est celle de '+mx(`f(x) = ${f}`)+' : tu peux tester chaque proposition en quelques points.')+FIG.plot({x:[-3.2,3.2],y:[-1.2,1.2],pas:1,pasy:.5,f:[e]}),
    [{h:mx(ok),ok:true},...pool.slice(0,3).map(h=>({h:mx(h),tag:'calc'}))],
    `Avec Euler : ${i===0?'cos²x = ((e<sup>ix</sup> + e<sup>−ix</sup>)/2)² = (e<sup>2ix</sup> + 2 + e<sup>−2ix</sup>)/4 = (1 + cos 2x)/2':i===1?'sin²x = ((e<sup>ix</sup> − e<sup>−ix</sup>)/(2i))² = (e<sup>2ix</sup> − 2 + e<sup>−2ix</sup>)/(−4) = (1 − cos 2x)/2':i===2?'sin x cos x = (e<sup>2ix</sup> − e<sup>−2ix</sup>)/(4i) = sin(2x)/2':i===3?'cos³x = (e<sup>3ix</sup> + 3e<sup>ix</sup> + 3e<sup>−ix</sup> + e<sup>−3ix</sup>)/8 = (2cos 3x + 6cos x)/8 = (3cos x + cos 3x)/4':'sin³x = (e<sup>ix</sup> − e<sup>−ix</sup>)³/(2i)³ = (2i sin 3x − 6i sin x)/(−8i) = (3sin x − sin 3x)/4'}. Vérifie en x = 0 sur la courbe.`,
    'Teste chaque proposition en x = 0 et en x = π/2, et compare à la courbe.')};
/* 10. Raisonner : forme exponentielle */
const gM2CtR1=()=>{const[t,a0,b0,rs0,rv0,k]=pick(M2CT_T),m=pick([1,1,2,3]),a=m*a0,b=m*b0,rv=m*rv0,rs=m===1?rs0:rs0==='2'?String(2*m):`${m}√2`;
  const tx=m===1?t:`${m}(${t})`,sq=M2CT_ex(a*a+b*b),sm=rs0==='√2'?num(2*m):m===1?'(√3 + 1)':`${m}(√3 + 1)`;
  return chain({instr:'Écris z sous forme exponentielle, en construisant ton raisonnement.',prompt:mx(`z = ${tx}`),
    steps:[
      {q:'Le module de z vaut…',o:[{h:mx(`|z| = ${rs}`),ok:true,r:rs},{h:mx(`|z| = ${sq}`),r:sq,why:'Tu as oublié la racine carrée : |z| = √(a² + b²).',tag:'cx-module'},{h:mx(`|z| = ${sm}`),r:sm,why:'Le module n’est pas |a| + |b| : c’est une distance, on utilise Pythagore.',tag:'cx-module'}]},
      {q:'Pour trouver l’argument θ, on utilise…',o:[{h:'cos θ = a/r et sin θ = b/r',ok:true,K:k},
        {h:'tan θ = b/a, donc θ = arctan(b/a)',K:M2CT_n(a>0?k:k>0?k-12:k+12),why:'arctan donne un angle de ]−π/2 ; π/2[ : il ne voit pas la différence entre deux quarts de plan opposés.',tag:'cx-arg'},
        {h:'cos θ = b/r et sin θ = a/r',K:M2CT_n(6-k),why:'C’est l’inverse : a = r cos θ (horizontal), b = r sin θ (vertical).',tag:'m2ca-reim'}]},
      {q:'L’argument principal est donc…',o:prev=>{const K=prev[1].K;return[{h:mx(`θ = ${angP(K)}`),ok:true,K},...[-K,K+12,6-K].map(M2CT_n).filter(x=>x!==K).map(x=>({h:mx(`θ = ${angP(x)}`),K:x,why:'Vérifie les signes de cos θ et sin θ : cet angle n’est pas dans le bon quart du plan.',tag:'cx-arg'}))]}},
      {q:'Conclusion :',o:prev=>{const r=prev[0].r,K=prev[2].K;return[{h:mx(`z = ${M2CT_E(r,K)}`),ok:true},{h:mx(`z = ${r==='1'?'':r}e<sup>${angP(K)}</sup>`),why:'Il manque le i dans l’exposant : e<sup>iθ</sup> = cos θ + i sin θ.'},
        {h:mx(`z = ${r==='1'?'':r}(cos ${angP(K)} ${MINUS} <i>i</i> sin ${angP(K)})`),why:'La forme trigonométrique est r(cos θ + i sin θ), avec un plus.',tag:'cx-conj'}]}}],
    explain:`r = √(a² + b²) = ${rs}. cos θ = a/r = ${M2CT_cos(k)} et sin θ = b/r = ${M2CT_cos(k-6)}, ce qui place θ dans le ${a>0?(b>0?'premier':'quatrième'):(b>0?'deuxième':'troisième')} quart du plan : θ = ${angP(k)}. Donc z = ${M2CT_E(rs,k)}.`})};
/* 11. Raisonner : une puissance avec Moivre */
const gM2CtR2=()=>{const[t,,,rs,rv,k]=pick(M2CT_T),n=R(3,rs==='2'?6:8),pw=(rv0,nn)=>M2CT_ex(rv0**nn);
  return chain({instr:'Calcule la puissance, en construisant ton raisonnement.',prompt:mx(`(${t})<sup>${n}</sup>`),
    steps:[
      {q:'D’abord, la forme exponentielle :',o:[{h:mx(`${t} = ${M2CT_E(rs,k)}`),ok:true,R:rv,K:k},{h:mx(`${t} = ${M2CT_E(rs,-k)}`),R:rv,K:-k,why:'Le signe de la partie imaginaire donne le signe de l’argument.',tag:'cx-arg'},
        {h:mx(`${t} = ${M2CT_E(M2CT_ex(rv*rv),k)}`),R:rv*rv,K:k,why:'Le module est √(a² + b²) : n’oublie pas la racine.',tag:'cx-module'}]},
      {q:'On applique la formule de Moivre :',o:prev=>{const{R:r,K}=prev[0];return[
        {h:mx(`(${M2CT_ex(r)} e<sup><i>i</i>${M2CT_p(K)}</sup>)<sup>${n}</sup> = ${pw(r,n)} e<sup><i>i</i>×${n}×${M2CT_p(K)}</sup>`),ok:true,M:r**n,A:n*K},
        {h:mx(`(${M2CT_ex(r)} e<sup><i>i</i>${M2CT_p(K)}</sup>)<sup>${n}</sup> = ${M2CT_ex(n*r)} e<sup><i>i</i>×${n}×${M2CT_p(K)}</sup>`),M:n*r,A:n*K,why:'Le module est élevé à la puissance n, pas multiplié par n.',tag:'m2ct-moivre'},
        {h:mx(`(${M2CT_ex(r)} e<sup><i>i</i>${M2CT_p(K)}</sup>)<sup>${n}</sup> = ${pw(r,n)} e<sup><i>i</i>${M2CT_p(K)}</sup>`),M:r**n,A:K,why:'L’argument est multiplié par n : (e<sup>iθ</sup>)ⁿ = e<sup>inθ</sup>.',tag:'m2ct-moivre'}]}},
      {q:'Sous forme algébrique, on obtient…',o:prev=>{const{M:Mo,A}=prev[1],a=Mo*Math.cos(A*Math.PI/12),b=Mo*Math.sin(A*Math.PI/12);return[
        {h:mx(M2CT_z(a,b)),ok:true},{h:mx(M2CT_z(b,a)),why:'Partie réelle = r cos θ, partie imaginaire = r sin θ : tu les as inversées.',tag:'m2ca-reim'},{h:mx(M2CT_z(a,-b)),why:'Erreur de signe sur sin θ : place l’angle sur le cercle.',tag:'cx-arg'},
        {h:mx(M2CT_z(-a,b)),why:'Erreur de signe sur cos θ : place l’angle sur le cercle.',tag:'cx-arg'}]}}],
    explain:`${t} = ${M2CT_E(rs,k)}, donc (${t})<sup>${n}</sup> = ${pw(rv,n)} ${M2CT_E('',n*k)} (angle ${n} × ${M2CT_p(k)} ramené dans ]−π ; π]) = ${M2CT_z(rv**n*Math.cos(n*k*Math.PI/12),rv**n*Math.sin(n*k*Math.PI/12))}.`})};
ANA_UNITS.push({id:'m2-complexes-trigo',tr:'m2',name:'Complexes : forme exponentielle',sub:'Module, argument, Euler, Moivre',glyph:'e<sup>iθ</sup>',tone:'sq',
  skills:[SKA('m2.ct.argp','Placer r e^(iθ)',gM2CtArgP,1),SKA('m2.ct.read','Lire module et argument',gM2CtRead,1),SKA('m2.ct.alg','Forme exponentielle → algébrique',gM2CtAlg,1),
    SKA('m2.ct.arg','Argument principal',gM2CtArg,2),SKA('m2.ct.exp','Forme exponentielle',gCxExp,2),SKA('m2.ct.prodp','Placer un produit z × w',gM2CtProdP,2),
    SKA('m2.ct.prod','Produit et quotient',gM2CtProd,2),SKA('m2.ct.euler','Formules d’Euler',gM2CtEuler,2),SKA('m2.ct.pow','Puissance (Moivre)',gM2CtPow,2),
    SKA('m2.ct.r1','Raisonner : forme exponentielle',gM2CtR1,2),SKA('m2.ct.r2','Raisonner : Moivre',gM2CtR2,3),SKA('m2.ct.lin','Linéariser avec Euler',gM2CtLin,3)]});
