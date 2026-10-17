/* ===================== MVA911 · Puissances et racines ===================== */
Object.assign(ANA_ERR,{
  'pui-base':{label:'Base modifiée',tip:'Dans un produit de puissances de même base, la base ne change pas : 2³ × 2⁴ = 2⁷ (et non 4⁷).'},
  'pui-somme':{label:'Racine d’une somme',tip:'√(a + b) n’est pas √a + √b : on ne peut regrouper que des racines simplifiées de même radicande.'}});
/** Une rangée de n tuiles portant l'étiquette lab */
const M1PUI_ROW=(lab,n,col,y,x0=10,W=280)=>{let s='';const w=Math.min(34,(W-4*n)/n);
  for(let i=0;i<n;i++){const x=x0+i*(w+4);s+=`<rect x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="28" rx="5" fill="${col}" stroke="var(--ink)" stroke-width="1"/><text x="${(x+w/2).toFixed(1)}" y="${y+19}" font-size="${w<22?10:13}" font-weight="700" font-style="${lab==='x'?'italic':'normal'}" text-anchor="middle" fill="var(--ink)">${lab}</text>`}return s};
const M1PUI_SVG=(s,h,lab)=>`<div class="qfig"><svg viewBox="0 0 300 ${h}" role="img" aria-label="${lab}">${s}</svg></div>`;
/** Fraction de tuiles : n tuiles en haut (en deux couleurs), d en bas */
const M1PUI_FRAC=(lab,top,d)=>{let s='';const T=top.reduce((t,[n])=>t+n,0);
  if(T){const w=Math.min(34,(280-4*T-10*(top.length-1))/T);let x=10;top.forEach(([n,col])=>{s+=M1PUI_ROW(lab,n,col,6,x,n*(w+4));x+=n*(w+4)+10})}
  else s+=`<text x="150" y="28" font-size="16" font-weight="700" text-anchor="middle" fill="var(--ink)">1</text>`;
  if(d===null)return M1PUI_SVG(s,40,'Produit de facteurs');
  s+=`<line x1="6" x2="294" y1="42" y2="42" stroke="var(--ink)" stroke-width="2"/>`+(d?M1PUI_ROW(lab,d,'var(--surface)',48):`<text x="150" y="68" font-size="15" font-weight="700" text-anchor="middle" fill="var(--ink)">1</text>`);
  return M1PUI_SVG(s,82,'Quotient de facteurs')};
const m1sup=(b,e)=>`<span class="m">${b}<sup>${e}</sup></span>`;
const m1xe=e=>mx(`x<sup>${num(e)}</sup>`);
/* 1. Écrire une multiplication répétée */
const gM1PuiEcr=()=>{const b=pick([2,3,5,10,4]),n=R(2,b===2?7:b===10?6:4);
  return nq({instr:'Écris ce produit comme une puissance, puis calcule-le.',prompt:`<span class="m">${Array(n).fill(b).join(' × ')}</span>`+M1PUI_FRAC(String(b),[[n,'var(--t-sq)']],null),
    labels:[`Exposant de ${b} =`,'Valeur ='],t:[n,b**n],
    explain:`Le facteur ${b} apparaît ${n} fois : c’est ${m1sup(b,n)} = ${num(b**n)}.`,hint:'L’exposant compte combien de fois le facteur est répété.',
    diag:([e,v])=>near(v,b*n,1e-9)?'exp-mul':null})};
/* 2. Produit, quotient, puissance de puissance (tuiles) */
const gM1PuiProd=()=>{if(Math.random()<.35){const m=R(2,4),n=R(2,3);
    return nq({instr:'Écris sous la forme d’une seule puissance de x : donne l’exposant.',prompt:mx(`(x<sup>${m}</sup>)<sup>${n}</sup>`)+M1PUI_FRAC('x',Array.from({length:n},(_,i)=>[m,i%2?'var(--t-c)':'var(--t-sq)']),null),
      labels:['Exposant ='],t:[m*n],explain:`${n} groupes de ${m} facteurs x : ${m} × ${n} = ${m*n}. Donc ${mx(`(x<sup>${m}</sup>)<sup>${n}</sup> = x<sup>${m*n}</sup>`)}.`,
      hint:'Une puissance de puissance : on multiplie les exposants.',diag:([e])=>near(e,m+n,1e-9)?'exp-pow-add':null})}
  const m=R(2,4),n=R(1,3),p=R(1,6),e=m+n-p;
  return nq({instr:'Écris sous la forme d’une seule puissance de x : donne l’exposant.',prompt:`<span class="m">${fr(`<i>x</i><sup>${m}</sup> × <i>x</i><sup>${n}</sup>`,`<i>x</i><sup>${p}</sup>`)}</span>`+M1PUI_FRAC('x',[[m,'var(--t-sq)'],[n,'var(--t-c)']],p),
    labels:['Exposant ='],t:[e],
    explain:`En haut : ${m} + ${n} = ${m+n} facteurs x. En bas : ${p}. Chaque x du bas se simplifie avec un x du haut : exposant ${m+n} − ${p} = ${num(e)}${e<0?`, soit ${mx(`1/x<sup>${-e}</sup>`)}`:e===0?', et x<sup>0</sup> = 1':''}.`,
    hint:'Produit : on additionne les exposants ; quotient : on soustrait celui du bas.',
    diag:([v])=>near(v,m*n-p,1e-9)?'exp-mul':near(v,m+n+p,1e-9)?'exp-quot-add':near(v,-e,1e-9)?'signe':null})};
/* 3. Exposant négatif */
const gM1PuiNeg=()=>{const b=pick([2,3,4,5,10]),n=R(1,b===2?4:b===10?3:2),v=b**-n;
  return nq({instr:'Calcule (valeur exacte : fraction ou décimal).',prompt:m1sup(b,MINUS+n)+M1PUI_FRAC(String(b),[],n),labels:[`${b}<sup>${MINUS}${n}</sup> =`],t:[v],
    explain:`Un exposant négatif donne l’inverse : ${m1sup(b,MINUS+n)} = 1/${m1sup(b,n)} = ${fr(1,b**n)}${b===2||b===4||b===5||b===10?` = ${num(+v.toFixed(6))}`:''}. Ce nombre est petit, mais positif.`,
    hint:`${m1sup('a',`${MINUS}n`)} = 1/${m1sup('a','n')}.`,diag:([x])=>near(x,-(b**n),1e-9)||near(x,-b*n,1e-9)?'exp-neg':null})};
/* 4. Placer une puissance sur la droite graduée */
const M1PUI_PL=[['2<sup>−1</sup>',.5],['2<sup>−2</sup>',.25],['4<sup>−1</sup>',.25],['5<sup>0</sup>',1],['(1/2)<sup>−1</sup>',2],['2<sup>−1</sup> × 2<sup>3</sup>',4],['(2<sup>−1</sup>)<sup>2</sup>',.25],
  ['10<sup>0</sup>',1],['3 × 2<sup>−2</sup>',.75],['2<sup>3</sup> ÷ 2<sup>2</sup>',2],['6 × 4<sup>−1</sup>',1.5],['2<sup>−3</sup> × 2<sup>5</sup>',4],['2<sup>2</sup> × 2<sup>−4</sup>',.25],['(√3)<sup>2</sup>',3],['30 × 10<sup>−1</sup>',3],
  ['(3/2)<sup>2</sup>',2.25],['√9 − 2<sup>−1</sup>',2.5],['5 × 2<sup>−2</sup>',1.25],['2<sup>−1</sup> + 2<sup>−2</sup>',.75],['(2<sup>2</sup>)<sup>0</sup>',1],['7 × 2<sup>−2</sup>',1.75],['√16 × 2<sup>−3</sup>',.5]];
const gM1PuiPlace=()=>{const[h,v]=pick(M1PUI_PL);
  return pointQ({instr:'Place ce nombre sur la droite graduée.',prompt:`<span class="m">${h}</span>`,nom:'P',x:[-.25,4.25],y:[-.6,.6],snap:.25,tol:.1,cible:[v,0],fond:{ligne:true,pas:.25,etiq:1},
    explain:`<span class="m">${h} = ${num(v)}</span>. Rappels : a<sup>0</sup> = 1, a<sup>−n</sup> = 1/a<sup>n</sup>, et pour une même base on additionne les exposants. Chaque graduation vaut 0,25.`,
    hint:'Calcule d’abord la valeur (un exposant négatif donne l’inverse), puis compte les graduations de 0,25.',
    diag:([x])=>x<0?'exp-neg':null})};
/* 5. Le piège du signe */
const gM1PuiSigne=()=>{const a=R(2,6),k=pick([0,1,2,3]),E=[[`${MINUS}${a}<sup>2</sup>`,-(a*a),'Sans parenthèses, le carré ne porte que sur '+a+' : on calcule '+a+'² puis on met le signe moins.'],
    [`(${MINUS}${a})<sup>2</sup>`,a*a,'Les parenthèses mettent le signe sous le carré : (−'+a+') × (−'+a+') est positif.'],
    [`(${MINUS}${a})<sup>3</sup>`,-(a**3),'Puissance impaire d’un nombre négatif : le résultat reste négatif.'],
    [`${MINUS}(${MINUS}${a})<sup>2</sup>`,-(a*a),'(−'+a+')² = '+a*a+', puis le signe moins devant donne l’opposé.']][k];
  const vals=[E[1],-E[1],2*a*(E[1]<0?-1:1),k===2?a**3:-2*a];
  return mcq('Calcule.',`<span class="m">${E[0]}</span>`,[{h:num(vals[0]),ok:true},{h:num(vals[1]),tag:'signe'},{h:num(vals[2]),tag:'exp-mul'},{h:num(vals[3]),tag:'signe'}],
    E[2]+` Résultat : ${num(E[1])}.`,'Regarde sur quoi porte l’exposant : le nombre seul, ou le nombre avec son signe ?')};
/* 6. Écriture scientifique */
const m1grp=s=>{const[i,d]=s.split(',');const I=i.replace(/\B(?=(\d{3})+(?!\d))/g,' ');return d?I+','+d.replace(/(\d{3})(?=\d)/g,'$1 '):I};
const gM1PuiSci=()=>{const d1=R(1,9),d2=pick([0,R(1,9),R(1,9)]),md=String(d1)+(d2?String(d2):''),n=pick([-6,-5,-4,-3,-2,-1,2,3,4,5,6,7]);
  const s=n>=0?md+'0'.repeat(n-(md.length-1)):'0,'+'0'.repeat(-n-1)+md,a=d1+d2/10;
  return nq({instr:'Écris ce nombre en écriture scientifique a × 10ⁿ (1 ≤ a < 10).',prompt:`<span class="m">${m1grp(s)}</span>`,labels:['a =','n ='],t:[a,n],
    explain:`On place la virgule après le premier chiffre non nul : a = ${num(a)}. La virgule s’est déplacée de ${Math.abs(n)} rang${Math.abs(n)>1?'s':''} vers la ${n>0?'gauche (grand nombre)':'droite (nombre plus petit que 1)'} : n = ${num(n)}. Donc ${m1grp(s)} = ${num(a)} × 10<sup>${num(n)}</sup>.`,
    hint:'Un nombre plus petit que 1 a un exposant négatif ; un grand nombre, un exposant positif.',diag:([x,e])=>near(e,-n,1e-9)?'signe':null})};
/* 7. Simplifier une racine (carré découpé) */
const M1PUI_GRID=(k,m)=>{const S=150,c=S/k;let s='';for(let i=0;i<k;i++)for(let j=0;j<k;j++)s+=`<rect x="${(75+i*c).toFixed(1)}" y="${(6+j*c).toFixed(1)}" width="${c.toFixed(1)}" height="${c.toFixed(1)}" fill="${(i+j)%2?'var(--t-sq)':'var(--t-c)'}" opacity=".55" stroke="var(--ink)" stroke-width=".8"/><text x="${(75+i*c+c/2).toFixed(1)}" y="${(6+j*c+c/2+4).toFixed(1)}" font-size="${k>4?9:11}" text-anchor="middle" fill="var(--ink)">${m}</text>`;
  s+=`<text x="150" y="${S+22}" font-size="11" text-anchor="middle" fill="var(--muted)">${k} × ${k} carrés d’aire ${m} : aire totale ${k*k*m}</text>`;
  return M1PUI_SVG(s,S+30,`Carré d’aire ${k*k*m} découpé en ${k*k} carrés d’aire ${m}`)};
const gM1PuiRac=()=>{const k=R(2,6),m=pick([2,3,5,6,7,10]),N=k*k*m;
  return nq({instr:'Simplifie la racine sous la forme a√b (b le plus petit possible).',prompt:`<span class="m">${sqH(N)} = a${sqH('b')}</span>`+M1PUI_GRID(k,m),labels:['a =','b ='],t:[k,m],
    explain:`${N} = ${k*k} × ${m}, et ${k*k} est le plus grand carré qui divise ${N}. Donc ${sqH(N)} = ${sqH(k*k)} × ${sqH(m)} = ${k}${sqH(m)}. Sur la figure, le côté du grand carré vaut ${k} côtés de petits carrés, chacun de longueur ${sqH(m)}.`,
    hint:'Cherche le plus grand carré parfait (4, 9, 16, 25, 36…) qui divise le nombre.',diag:([a,b])=>near(a,k*k,1e-9)?'rad-root':null})};
/* 8. Somme de racines */
const gM1PuiRacSum=()=>{const m=pick([2,3,5,7]),a=R(2,5);let b;do b=R(1,5);while(b===a);const sub=Math.random()<.35,k=sub?a-b:a+b;
  return nq({instr:`Écris sous la forme k${sqH(m)}.`,prompt:`<span class="m">${sqH(a*a*m)} ${sub?MINUS:'+'} ${sqH(b*b*m)} = k${sqH(m)}</span>`,labels:['k ='],t:[k],
    explain:`${sqH(a*a*m)} = ${sqH(`${a*a} × ${m}`)} = ${a}${sqH(m)} et ${sqH(b*b*m)} = ${b===1?'':b}${sqH(m)}. Donc ${a}${sqH(m)} ${sub?MINUS:'+'} ${b}${sqH(m)} = ${num(k)}${sqH(m)}.`,
    hint:'Simplifie chaque racine, puis regroupe les « √'+m+' » comme des unités.',diag:([v])=>near(v*v*m,(sub?a*a*m-b*b*m:a*a*m+b*b*m),1e-6)?'pui-somme':null})};
/* 9. Comparer a, a², a³ (graphique) */
const gM1PuiComp=()=>{const a=pick([.3,.5,.6,.8,1.2,1.4,1.5]),big=a>1;
  return mcq('Range ces trois nombres dans l’ordre croissant.',`<span class="m"><i>a</i> = ${num(a)} : compare <i>a</i>, <i>a</i><sup>2</sup> et <i>a</i><sup>3</sup>.</span>`
      +FIG.plot({x:[0,2],y:[0,4],f:['x',{f:'x^2',c:1},{f:'x^3',c:2}],segs:[[a,0,a,Math.min(4,a**3)]],pts:[[a,a,'a'],[a,a*a,'a²'],[a,a**3,'a³']].filter(p=>p[1]<=4),pas:.5,etiq:1}),
    [{h:mx('a < a<sup>2</sup> < a<sup>3</sup>'),ok:big},{h:mx('a<sup>3</sup> < a<sup>2</sup> < a'),ok:!big},{h:mx('a<sup>2</sup> < a < a<sup>3</sup>')},{h:mx('a < a<sup>3</sup> < a<sup>2</sup>')}],
    `${big?`Pour a > 1, multiplier par a agrandit : ${num(a)} < ${dec(a*a,4)} < ${dec(a**3,4)}.`:`Pour 0 < a < 1, multiplier par a rapetisse : ${dec(a**3,4)} < ${dec(a*a,4)} < ${num(a)}.`} Sur le graphique, lis les trois courbes y = x, y = x² et y = x³ au-dessus de a.`,
    'Multiplier par un nombre plus grand que 1 agrandit ; par un nombre entre 0 et 1, cela rapetisse.')};
/* 10. Raisonner : simplifier une expression (l'erreur se propage) */
const gM1PuiR1=()=>{const m=R(2,3),n=m===2?3:R(2,3),p=R(2,4),q=R(5,12);
  const fin=e=>e>0?m1xe(e):e===0?'<span class="m">1</span>':mx(`1/x<sup>${-e}</sup>`);
  return chain({instr:'Simplifie en construisant ton raisonnement.',prompt:mx(`(x<sup>${m}</sup>)<sup>${n}</sup> × x<sup>${p}</sup> ÷ x<sup>${q}</sup>`),
    steps:[
      {q:mx(`(x<sup>${m}</sup>)<sup>${n}</sup>`)+' vaut…',o:[{h:m1xe(m*n),ok:true,v:m*n},{h:m1xe(m+n),v:m+n,why:`${n} groupes de ${m} facteurs : on multiplie les exposants.`,tag:'exp-pow-add'},
        {h:m1xe(m**n),v:m**n,why:`Ce n’est pas ${m}<sup>${n}</sup> : on multiplie l’exposant ${m} par ${n}.`}]},
      {q:'Puis on multiplie par '+m1xe(p)+' :',o:prev=>{const v=prev[0].v;return[{h:m1xe(v+p),ok:true,v:v+p},{h:m1xe(v*p),v:v*p,why:'Produit de même base : on additionne les exposants.',tag:'exp-mul'},{h:mx(`${p}x<sup>${v}</sup>`),v,why:`L’exposant ${p} n’est pas un coefficient : on additionne les exposants.`}]}},
      {q:'Puis on divise par '+m1xe(q)+' :',o:prev=>{const v=prev[1].v;return[{h:m1xe(v-q),ok:true,v:v-q},{h:m1xe(v+q),v:v+q,why:'Quotient : on soustrait l’exposant du dénominateur.',tag:'exp-quot-add'},{h:m1xe(q-v),v:q-v,why:'On soustrait dans l’ordre : exposant du haut moins exposant du bas.',tag:'signe'}]}},
      {q:'Écriture finale sans exposant négatif :',o:prev=>{const e=prev[2].v;return[{h:fin(e),ok:true},
        e<0?{h:mx(`${MINUS}x<sup>${-e}</sup>`),why:'Un exposant négatif donne l’inverse, pas l’opposé.',tag:'exp-neg'}:{h:mx(`1/x<sup>${e||1}</sup>`),why:e?'L’exposant est positif : rien à retourner.':'x⁰ = 1.'},
        e===0?{h:'<span class="m">0</span>',why:'x⁰ = 1, pas 0.'}:{h:m1xe(-e),why:'On ne change pas le signe de l’exposant sans retourner la fraction.',tag:'signe'}]}}],
    explain:`(x<sup>${m}</sup>)<sup>${n}</sup> = x<sup>${m*n}</sup> ; × x<sup>${p}</sup> donne x<sup>${m*n+p}</sup> ; ÷ x<sup>${q}</sup> donne x<sup>${num(m*n+p-q)}</sup>${m*n+p-q<0?` = 1/x<sup>${q-m*n-p}</sup>`:m*n+p-q===0?' = 1':''}.`})};
/* 11. Raisonner : somme de racines */
const gM1PuiR2=()=>{const m=pick([2,3,5]),a1=pick([2,3,4,6]),a2=pick([2,3,5].filter(v=>v!==a1)),N1=a1*a1*m,N2=a2*a2*m;
  const small=a1===4?4:a1===6?pick([4,9]):null;
  return chain({instr:'Calcule la somme en construisant ton raisonnement.',prompt:`<span class="m">${sqH(N1)} + ${sqH(N2)}</span>`,
    steps:[
      {q:`Pour simplifier ${sqH(N1)}, quel carré parfait faire sortir ?`,o:[{h:`${a1*a1}`,ok:true,S:a1*a1},{h:`${m}`,S:-1,why:`${m} n’est pas un carré parfait : on ne peut pas le sortir de la racine.`,tag:'rad-root'},
        small?{h:`${small}`,S:small,why:`${small} marche, mais ce n’est pas le plus grand : il resterait un carré dans la racine.`}:{h:'Aucun : la racine est déjà simplifiée',S:1,why:`${N1} = ${a1*a1} × ${m} contient le carré ${a1*a1}.`}]},
      {q:`Donc ${sqH(N1)} = …`,o:prev=>{const S=prev[0].S;if(S===-1)return[{h:`${a1}${sqH(m)}`,ok:true,r:m,c:a1},{h:`${m}${sqH(a1*a1)}`,r:a1*a1,c:m,why:`On sort la racine d’un carré : ${m} n’en est pas un.`,tag:'rad-root'}];
        if(S===1)return[{h:sqH(N1),ok:true,r:N1,c:1},{h:`${a1}${sqH(m)}`,r:m,c:a1,why:'C’est juste, mais cela ne découle pas de ton choix précédent.'}];
        const c=Math.round(Math.sqrt(S)),r=N1/S;return[{h:`${c}${sqH(r)}`,ok:true,r,c},{h:`${S}${sqH(r)}`,r,c:S,why:`On sort la racine du carré (${c}), pas le carré lui-même (${S}).`,tag:'rad-root'}]}},
      {q:`Avec ${sqH(N2)} = ${a2===1?'':a2}${sqH(m)}, la somme vaut…`,o:prev=>{const{r,c}=prev[1];
        const opts=r===m?[{h:`${c+a2}${sqH(m)}`,ok:true},{h:`${c*a2}${sqH(m)}`,why:'On additionne les coefficients devant √'+m+', on ne les multiplie pas.'}]
          :[{h:'On ne peut pas regrouper : les radicandes sont différents',ok:true},{h:`${c+a2}${sqH(m)}`,why:'Les deux racines n’ont pas le même radicande : on ne peut pas les additionner ainsi.'}];
        return opts.concat([{h:sqH(N1+N2),why:'La racine d’une somme n’est pas la somme des racines.',tag:'pui-somme'}])}}],
    explain:`${sqH(N1)} = ${sqH(`${a1*a1} × ${m}`)} = ${a1}${sqH(m)} et ${sqH(N2)} = ${a2===1?'':a2}${sqH(m)}. Somme : ${a1+a2}${sqH(m)}.`})};
/* 12. Exposants fractionnaires */
const M1PUI_FR=[[8,2,3,4],[27,1,3,3],[16,3,4,8],[4,3,2,8],[9,-1,2,1/3],[16,-1,2,.25],[32,2,5,4],[25,3,2,125],[8,-2,3,.25],[100,3,2,1000],[81,3,4,27],[64,2,3,16],[1000,2,3,100],[49,1,2,7],[4,-3,2,.125]];
const gM1PuiFrac=()=>{const[a,p,q,v]=pick(M1PUI_FR),r=Math.round(a**(1/q));
  return nq({instr:'Calcule la valeur exacte.',prompt:`<span class="m">${a}<sup>${p<0?MINUS:''}${fr(Math.abs(p),q)}</sup></span>`,labels:['='],t:[v],
    explain:`${a}<sup>1/${q}</sup> est la racine ${q===2?'carrée':q===3?'cubique':q+'-ième'} de ${a} : ${r}, car ${r}<sup>${q}</sup> = ${a}. Puis on élève à la puissance ${num(p)} : ${r}<sup>${num(p)}</sup> = ${p<0?fr(1,r**-p):num(v)}.`,
    hint:'a^(p/q) = (racine q-ième de a)^p ; un exposant négatif donne l’inverse.',diag:([x])=>near(x,a*p/q,1e-9)?'exp-mul':near(x,-v,1e-9)?'exp-neg':null})};
ANA_UNITS.push({id:'m1-puissances',tr:'m1',name:'Puissances et racines',sub:'Exposants, écriture scientifique, racines carrées',glyph:'x<sup>n</sup>',tone:'sq',
  skills:[SKA('m1.pw.ecr','Écrire une puissance',gM1PuiEcr,1),SKA('m1.pw.prod','Règles des exposants',gM1PuiProd,1),SKA('m1.pw.neg','Exposant négatif',gM1PuiNeg,1),
    SKA('m1.pw.signe','Le piège du signe',gM1PuiSigne,1),SKA('m1.pw.place','Placer une puissance',gM1PuiPlace,2),SKA('m1.pw.rac','Simplifier une racine',gM1PuiRac,2),
    SKA('m1.pw.sci','Écriture scientifique',gM1PuiSci,2),SKA('m1.pw.comp','Comparer a, a², a³',gM1PuiComp,2),SKA('m1.pw.r1','Raisonner : réduire une expression',gM1PuiR1,2),
    SKA('m1.pw.racsum','Somme de racines',gM1PuiRacSum,2),SKA('m1.pw.r2','Raisonner : somme de racines',gM1PuiR2,3),SKA('m1.pw.frac','Exposants fractionnaires',gM1PuiFrac,3)]});
