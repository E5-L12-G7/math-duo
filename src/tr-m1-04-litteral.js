/* ===================== MVA911 · Calcul littéral : développer et factoriser ===================== */
Object.assign(ANA_ERR,{
  'lit-max':{label:'Factorisation incomplète',tip:'Il reste un facteur commun dans une parenthèse : par exemple x(6x + 9) = 3x(2x + 3). Sors le plus grand facteur commun.'},
  'lit-fact':{label:'Forme non factorisée',tip:'Une forme factorisée est un produit : par exemple 3x(2x + 3) ou (x − 5)(x + 5). Une somme de termes n’est pas factorisée.'},
  'lit-moins':{label:'Signe moins devant une parenthèse',tip:'Un signe moins devant une parenthèse change le signe de chaque terme : −(a − b) = −a + b.'}});
/** Rectangle découpé : cols/rows = [[étiquette, largeur relative]], cells[r][c] = texte */
const M1LIT_GRID=(cols,rows,cells)=>{const W=230,H=rows.length>1?130:70,x0=56,y0=26,sw=cols.reduce((s,c)=>s+c[1],0),sh=rows.reduce((s,r)=>s+r[1],0);let s='',x=x0;
  const fills=['var(--t-sq)','var(--t-c)','var(--t-x)','var(--good)'];
  cols.forEach(([l,w],j)=>{const cw=w/sw*W;s+=`<text x="${(x+cw/2).toFixed(1)}" y="${y0-8}" font-size="13" font-weight="700" text-anchor="middle" fill="var(--ink)">${l}</text>`;let y=y0;
    rows.forEach(([lr,h],i)=>{const ch=h/sh*H;s+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${cw.toFixed(1)}" height="${ch.toFixed(1)}" fill="${fills[(i*cols.length+j)%4]}" opacity=".35" stroke="var(--ink)" stroke-width="1.4"/><text x="${(x+cw/2).toFixed(1)}" y="${(y+ch/2+5).toFixed(1)}" font-size="13" font-weight="700" text-anchor="middle" fill="var(--ink)">${cells[i][j]}</text>`;
      if(j===0)s+=`<text x="${x0-8}" y="${(y+ch/2+5).toFixed(1)}" font-size="13" font-weight="700" text-anchor="end" fill="var(--ink)">${lr}</text>`;y+=ch});x+=cw});
  return`<div class="qfig"><svg viewBox="0 0 300 ${y0+H+8}" role="img" aria-label="Rectangle découpé en morceaux">${s}</svg></div>`};
/** Terme ax écrit proprement (3x, −x, x) et constante signée */
const m1ax=(a,v='x')=>`${a<0?MINUS:''}${Math.abs(a)===1?'':Math.abs(a)}<tspan font-style="italic">${v}</tspan>`;
const m1nb=b=>`${b<0?MINUS:''}${Math.abs(b)}`;
/** Forme factorisée : un produit dont tous les facteurs « somme » sont du premier degré */
function m1LitIsFac(n){if(!(n.t==='mul'||n.t==='pow'||n.t==='neg'))return false;const fs=[];
  const go=m=>{if(m.t==='mul'){go(m.a);go(m.b)}else if(m.t==='neg')go(m.a);else if(m.t==='pow')fs.push(m.a);else fs.push(m)};go(n);
  const sums=fs.filter(f=>f.t==='add'||f.t==='sub');if(!sums.length)return false;
  return sums.every(f=>{try{return Math.abs(ev(f,0)-2*ev(f,1)+ev(f,2))<1e-9}catch(e){return false}})}
/** Facteur « somme » encore factorisable par un entier (ex. 6x + 9 = 3(2x + 3)) */
const m1gcd=(a,b)=>b?m1gcd(b,a%b):a;
function m1LitNotMax(n){const fs=[];const go=m=>{if(m.t==='mul'){go(m.a);go(m.b)}else if(m.t==='neg')go(m.a);else if(m.t==='pow')fs.push(m.a);else fs.push(m)};go(n);
  return fs.filter(f=>f.t==='add'||f.t==='sub').some(f=>{try{const b=ev(f,0),a=ev(f,1)-b,I=v=>Math.abs(v-Math.round(v))<1e-9;
    return I(a)&&I(b)&&Math.round(a)&&Math.round(b)&&m1gcd(Math.abs(Math.round(a)),Math.abs(Math.round(b)))>1}catch(e){return false}})}
function m1LitFacQ(instr,prompt,label,target,explain,hint,diag){
  return{type:'input',instr,prompt,fields:[{label,kind:'expr'}],ans:[target],explain,hint,
    check:([a])=>{try{return m1LitIsFac(a)&&!m1LitNotMax(a)&&equiv(a,target)}catch(e){return false}},
    diag:([a])=>{try{if(equiv(a,target))return m1LitIsFac(a)?'lit-max':'lit-fact';return diag?diag(a):null}catch(e){return null}}}}
/* 1. Distribuer k(ax + b) */
const gM1LitDist=()=>{const k=pick([2,3,4,5,6,-2,-3,-4,-5]),a=R(1,6),b=nz(-9,9),t=poly([k*a,k*b]);
  return exprQ('Développe.',M(`${k}(${poly([a,b])})`)+M1LIT_GRID([[m1ax(a),3],[m1nb(b),1.4]],[[m1nb(k),1]],[['?','?']]),'=',t,
    `Le facteur ${num(k)} multiplie chaque terme : ${num(k)} × ${M(poly([a,0]))} = ${M(poly([k*a,0]))} et ${num(k)} × ${b<0?`(${num(b)})`:num(b)} = ${num(k*b)}. Donc ${M(`${k}(${poly([a,b])})`)} = ${M(t)}. Sur la figure : deux rectangles de largeur ${num(k)}, un par terme.`,
    'Multiplie le facteur par chacun des termes de la parenthèse (aire de chaque morceau).',true,([u])=>eqv(u,poly([k*a,b]))?'distrib':eqv(u,poly([k*a,-k*b]))?'signe':null)};
/* 2. Supprimer des parenthèses précédées de − */
const gM1LitMoins=()=>{const c=R(2,9),d=nz(-9,9),b=nz(-9,9);let a;do a=R(1,8);while(a===c);const t=poly([c-a,d-b]);
  return exprQ('Supprime les parenthèses et réduis.',M(`${poly([c,d])}-(${poly([a,b])})`),'=',t,
    `Le signe moins change le signe de chaque terme : ${M(`${poly([c,d])}-(${poly([a,b])})`)} = ${M(`${poly([c,d])}${sg(-a)}x${sg(-b)}`)} = ${M(t)}.`,
    'Un moins devant une parenthèse change le signe de chaque terme qu’elle contient.',true,([u])=>eqv(u,poly([c-a,d+b]))?'lit-moins':null)};
/* 3. Développer (ax + b)(cx + d) */
const gM1LitDev2=()=>{const a=R(1,3),c=R(1,3),b=nz(-7,7),d=nz(-7,7),t=poly([a*c,a*d+b*c,b*d]);
  return exprQ('Développe et réduis.',M(`(${poly([a,b])})(${poly([c,d])})`)+M1LIT_GRID([[m1ax(c),3],[m1nb(d),1.4]],[[m1ax(a),3],[m1nb(b),1.4]],[['?','?'],['?','?']]),'=',t,
    `Quatre produits (les quatre morceaux) : ${M(`${a*c}x^2`)}, ${M(`${a*d}x`)}, ${M(`${b*c}x`)} et ${num(b*d)}. On regroupe : ${M(t)}.`,
    'Chaque terme de la première parenthèse multiplie chaque terme de la seconde : quatre produits.',true,([u])=>eqv(u,poly([a*c,0,b*d]))?'dev-middle':eqv(u,poly([a*c,a*d+b*c,-b*d]))?'signe':null)};
/* 4. Identités remarquables */
const gM1LitId=()=>{const a=R(1,4),b=R(1,7),k=R(0,2);
  if(k<2){const s=k?-1:1,t=poly([a*a,2*a*b*s,b*b]);
    return exprQ('Développe avec une identité remarquable.',M(`(${poly([a,s*b])})^2`)+M1LIT_GRID([[m1ax(a),3],[m1nb(s*b),1.5]],[[m1ax(a),3],[m1nb(s*b),1.5]],[['A²','AB'],['AB','B²']]),'=',t,
      `(A ${s>0?'+':MINUS} B)² = A² ${s>0?'+':MINUS} 2AB + B² avec A = ${a===1?'':a}x et B = ${b} : ${M(`${a*a}x^2`)} ${s>0?'+':MINUS} ${M(`${2*a*b}x`)} + ${b*b}. Le carré contient deux rectangles AB : c’est le double produit.`,
      '(a ± b)² = a² ± 2ab + b² : n’oublie pas le double produit.',true,([u])=>eqv(u,poly([a*a,0,b*b]))||eqv(u,poly([a*a,a*b*s,b*b]))?'id-rem':eqv(u,poly([a,2*a*b*s,b*b]))?'coef-pow':eqv(u,poly([a*a,-2*a*b*s,b*b]))?'signe':null)}
  const t=poly([a*a,0,-b*b]);
  return exprQ('Développe avec une identité remarquable.',M(`(${poly([a,b])})(${poly([a,-b])})`)+M1LIT_GRID([[m1ax(a),3],[m1nb(-b),1.5]],[[m1ax(a),3],[m1nb(b),1.5]],[['A²',`${MINUS}AB`],['AB',`${MINUS}B²`]]),'=',t,
    `(A + B)(A − B) = A² − B² avec A = ${a===1?'':a}x et B = ${b} : ${M(t)}. Les deux rectangles AB et −AB s’annulent.`,'(a + b)(a − b) = a² − b².',true,([u])=>eqv(u,poly([a*a,0,b*b]))?'signe':eqv(u,poly([a,0,-b*b]))?'coef-pow':null)};
/* 5. Factoriser par un facteur commun */
const gM1LitFacC=()=>{const k=pick([2,3,4,5]),withX=Math.random()<.6;let a,b;do{a=R(1,5);b=nz(-7,7)}while(gcd(a,Math.abs(b))!==1);
  const ex=withX?poly([k*a,k*b,0]):poly([k*a,k*b]),tg=withX?`${k}x(${poly([a,b])})`:`${k}(${poly([a,b])})`,f=withX?`${k}<tspan font-style="italic">x</tspan>`:`${k}`;
  const t1=withX?`${k*a}<tspan font-style="italic">x</tspan>²`:m1ax(k*a),t2=withX?m1ax(k*b):m1nb(k*b);
  return m1LitFacQ('Factorise au maximum.',`<span class="m">${M(ex)}</span>`+M1LIT_GRID([['?',3],['?',2]],[['?',1]],[[t1,t2]]),'=',tg,
    `Les deux morceaux ont une largeur commune ${withX?k+'x':k} : ${M(ex)} = ${M(tg)}. Contrôle : en redéveloppant, on retrouve ${M(ex)}.`,
    'Cherche le plus grand facteur commun aux deux termes (un nombre, et x s’il est partout).',null)};
/* 6. Factoriser avec une identité */
const gM1LitFacId=()=>{let a,b;do{a=R(1,4);b=R(1,9)}while(gcd(a,b)!==1);const k=R(0,2);let ex,tg,ex2;
  if(k===0){ex=poly([a*a,0,-b*b]);tg=`(${poly([a,-b])})(${poly([a,b])})`;ex2=`On reconnaît A² − B² avec A = ${a===1?'':a}x et B = ${b}`}
  else{const s=k===1?1:-1;ex=poly([a*a,2*a*b*s,b*b]);tg=`(${poly([a,s*b])})^2`;ex2=`On reconnaît A² ${s>0?'+':MINUS} 2AB + B² avec A = ${a===1?'':a}x et B = ${b} (le terme du milieu vaut bien 2 × ${a===1?'':a}x × ${b})`}
  return m1LitFacQ('Factorise avec une identité remarquable.',M(ex),'=',tg,`${ex2} : ${M(ex)} = ${M(tg)}.`,
    'Deux carrés séparés par un moins : (a − b)(a + b). Trois termes dont deux carrés : (a ± b)².',a2=>eqv(a2,`(${poly([a,b])})^2`)&&k===0?'id-rem':null)};
/* 7. Reconnaître le bon développement */
const gM1LitReco=()=>{const b=R(2,9),k=R(0,2),s=k===1?-1:1;let opts,e,ex;
  if(k<2){e=`(x${sg(s*b)})^2`;opts=[{h:M(poly([1,2*s*b,b*b])),ok:true},{h:M(poly([1,0,b*b])),tag:'id-rem'},{h:M(poly([1,s*b,b*b])),tag:'id-rem'},{h:M(poly([1,-2*s*b,b*b])),tag:'signe'}];
    ex=`(x ${s>0?'+':MINUS} ${b})² = x² ${s>0?'+':MINUS} 2 × ${b} × x + ${b}² : ${M(poly([1,2*s*b,b*b]))}.`}
  else{e=`(x+${b})(x-${b})`;opts=[{h:M(poly([1,0,-b*b])),ok:true},{h:M(poly([1,0,b*b])),tag:'signe'},{h:M(poly([1,-2*b,-b*b])),tag:'dev-middle'},{h:M(poly([1,0,-2*b])),tag:'coef-pow'}];
    ex=`(a + b)(a − b) = a² − b² : ${M(poly([1,0,-b*b]))}.`}
  return mcq('Quel est le développement correct ?',M(e),opts,ex,'Pense aux identités remarquables et au double produit.')};
/* 8. Produit nul : placer une solution */
const gM1LitNul=()=>{const a=pick([1,2]),s1=a===2?R(-9,9)/2:R(-5,5);let s2;do s2=R(-5,5);while(s2===s1);const b=-a*s1,c=-s2,big=Math.max(s1,s2),small=Math.min(s1,s2);
  const f1=poly([a,b]),f2=poly([1,c]);
  return pointQ({instr:'Place sur la droite la plus grande des deux solutions.',prompt:`<span class="m">${M(`(${f1})(${f2})`)} = 0</span>`,nom:'S',x:[-5.5,5.5],y:[-.6,.6],snap:.5,tol:.24,cible:[big,0],fond:{ligne:true,pas:.5,etiq:1},
    explain:`Un produit est nul si l’un de ses facteurs est nul : ${M(f1)} = 0 donne x = ${num(s1)} ; ${M(f2)} = 0 donne x = ${num(s2)}. La plus grande solution est ${num(big)} (l’autre est ${num(small)}).`,
    hint:'Annule chaque facteur séparément, puis compare les deux solutions.',diag:([x])=>Math.abs(x+big)<.01||Math.abs(x+small)<.01?'roots-sign':null})};
/* 9. Raisonner : développer un carré (l'erreur se propage) */
const gM1LitR1=()=>{const a=R(2,5),b=nz(-6,6),B=Math.abs(b),sg2=b>0?'+':MINUS;
  const val=c=>4*c[0]+2*c[1]+c[2];
  return chain({instr:'Développe en construisant ton raisonnement.',prompt:M(`(${poly([a,b])})^2`)+M1LIT_GRID([[m1ax(a),3],[m1nb(b),1.5]],[[m1ax(a),3],[m1nb(b),1.5]],[['?','?'],['?','?']]),
    steps:[
      {q:'Quelle formule utiliser ?',o:[
        {h:`(A ${sg2} B)² = A² ${sg2} 2AB + B²`,ok:true,r:'id'},
        {h:`(A ${sg2} B)² = A² ${sg2} B²`,r:'naif',why:'Il manque le double produit : le grand carré contient aussi deux rectangles AB.',tag:'id-rem'},
        {h:`(A ${sg2} B)² = A² ${sg2} AB + B²`,r:'simple',why:'Il y a deux rectangles AB, pas un seul : c’est 2AB.',tag:'id-rem'}]},
      {q:`Avec A = ${a}x, le carré A² vaut…`,o:[{h:mx(`${a*a}x<sup>2</sup>`),ok:true,A:[a*a,0]},{h:mx(`${a}x<sup>2</sup>`),A:[a,0],why:`(${a}x)² = ${a}² × x² = ${a*a}x² : le carré porte aussi sur ${a}.`,tag:'coef-pow'},
        {h:mx(`${2*a}x`),A:[0,2*a],why:`(${a}x)² = ${a}x × ${a}x, pas 2 × ${a}x.`,tag:'exp-mul'}]},
      {q:'Le développement est donc…',o:prev=>{const r=prev[0].r,A=prev[1].A,mid=r==='id'?2*a*b:r==='simple'?a*b:0,cst=r==='naif'?(b>0?b*b:-b*b):b*b,c=[A[0],A[1]+mid,cst];
        const alt=mid?[c[0],c[1]-2*mid,c[2]]:[c[0],c[1],-c[2]];
        return[{h:M(poly(c)),ok:true,c},{h:M(poly(alt)),c:alt,why:mid?'Le signe du terme en x est celui de B : relis la formule.':'Le signe de B² dépend de la formule choisie : relis-la.',tag:'signe'},
          {h:M(poly([c[0],c[1],2*c[2]])),c:[c[0],c[1],2*c[2]],why:`B² = ${b}² = ${b*b}, pas 2 × ${B}.`,tag:'exp-mul'}]}},
      {q:'Contrôle avec x = 2 : on compare au calcul direct.',o:prev=>{const v=val(prev[2].c),d=(2*a+b)**2,okk=v===d;
        return[{h:okk?`Les deux valent ${num(d)} : le résultat est cohérent`:`On trouve ${num(v)} au lieu de ${num(d)} : il y a une erreur`,ok:true},
          {h:okk?`On trouve ${num(v+2)} au lieu de ${num(d)} : il y a une erreur`:`Les deux valent ${num(d)} : le résultat est cohérent`,why:`Avec x = 2 : (${2*a} ${sg2} ${B})² = ${num(d)}, et ton développement donne ${num(v)}.`}]}}],
    explain:`(${a}x ${sg2} ${B})² = (${a}x)² ${sg2} 2 × ${a}x × ${B} + ${B}² = ${M(poly([a*a,2*a*b,b*b]))}. Contrôle avec x = 2 : (${2*a} ${sg2} ${B})² = ${num((2*a+b)**2)}, comme le développement.`})};
/* 10. Raisonner : factoriser (choisir la méthode) */
const gM1LitR2=()=>{const T=pick(['com','dif','car']);let a,b,k=pick([2,3,5]);do{a=R(1,3);b=R(1,7)}while(gcd(a,b)!==1||a===b);
  const sb=pick([1,-1]);
  const E={com:poly([k*a,k*b*sb,0]),dif:poly([a*a,0,-b*b]),car:poly([a*a,2*a*b*sb,b*b])}[T];
  const GOOD={com:`${k}x(${poly([a,sb*b])})`,dif:`(${poly([a,-b])})(${poly([a,b])})`,car:`(${poly([a,sb*b])})^2`}[T];
  const MET={com:'Mettre en facteur un facteur commun',dif:'Utiliser a² − b² = (a − b)(a + b)',car:'Utiliser a² ± 2ab + b² = (a ± b)²'};
  const why1={com:'Il y a bien un facteur commun à tous les termes : c’est la première chose à chercher.',
    dif:T==='car'?'Il y a trois termes : ce n’est pas une différence de deux carrés.':'Ce n’est pas une différence de deux carrés.',
    car:T==='dif'?'Il n’y a que deux termes : il manque le double produit.':'Ce n’est pas un carré développé : le terme constant manque ou n’est pas un carré.'};
  const m1o=(c,r)=>({h:c,r});
  return chain({instr:'Factorise en construisant ton raisonnement.',prompt:M(E),
    steps:[
      {q:'Quelle méthode choisir ?',o:['com','dif','car'].map(m=>m===T?{h:MET[m],ok:true,m}:{h:MET[m],m,why:why1[m]})},
      {q:'On identifie…',o:prev=>{const m=prev[0].m;
        if(m===T){if(T==='com')return[{h:`le facteur ${k}x ; il reste ${M(poly([a,sb*b]))}`,ok:true,r:GOOD},{h:`le facteur ${k}x ; il reste ${M(poly([a,k*sb*b]))}`,r:`${k}x(${poly([a,k*sb*b])})`,why:'On divise chaque terme par le facteur commun, y compris le second.'},{h:`le facteur x ; il reste ${M(poly([k*a,sb*b]))}`,r:`x(${poly([k*a,sb*b])})`,why:`Le second terme se divise par x mais aussi par ${k} : il reste ${num(k*b*sb)}, pas ${num(sb*b)}.`}];
          if(T==='dif')return[{h:`A = ${a===1?'':a}x et B = ${b}`,ok:true,r:GOOD},{h:`A = ${a*a}x et B = ${b*b}`,r:`(${poly([a*a,-b*b])})(${poly([a*a,b*b])})`,why:'A et B sont les nombres dont les carrés apparaissent : on prend les racines.',tag:'rad-root'}];
          return[{h:`A = ${a===1?'':a}x et B = ${b}, signe ${sb>0?'+':MINUS}`,ok:true,r:GOOD},{h:`A = ${a===1?'':a}x et B = ${b}, signe ${sb>0?MINUS:'+'}`,r:`(${poly([a,-sb*b])})^2`,why:'Le signe dans la parenthèse est celui du terme du milieu.',tag:'signe'},{h:`A = ${a*a}x et B = ${b*b}`,r:`(${poly([a*a,sb*b*b])})^2`,why:'A et B sont les racines des carrés, pas les carrés eux-mêmes.',tag:'rad-root'}]}
        if(m==='com')return[{h:'Aucun facteur commun à tous les termes',ok:true,stop:true},{h:`le facteur x ; il reste ${M(poly([a*a,T==='car'?2*a*b*sb:0]))} + …`,stop:true,why:'Le terme constant ne contient pas x : x n’est pas un facteur commun.'}];
        if(T==='com')return[{h:'Cette forme ne s’applique pas ici',ok:true,stop:true},{h:`A = x et B = ${k}`,r:`(x-${k})(x+${k})`,why:'L’expression n’est pas une différence de deux carrés.'}];
        if(m==='dif')return[{h:'Cette forme ne s’applique pas ici',ok:true,stop:true},{h:`A = ${a===1?'':a}x et B = ${b}`,r:`(${poly([a,-b])})(${poly([a,b])})`,why:'Avec trois termes, ce n’est pas une différence de deux carrés.'}];
        return[{h:'Cette forme ne s’applique pas ici',ok:true,stop:true},{h:`A = ${a===1?'':a}x et B = ${b}`,r:`(${poly([a,b])})^2`,why:'Il n’y a pas de terme du milieu 2AB : ce n’est pas un carré développé.'}]}},
      {q:'La forme factorisée est…',o:prev=>{const p=prev[1];if(p.stop)return[{h:'Il faut revenir à l’étape 1 et changer de méthode',ok:true,r:null},{h:M(GOOD),r:GOOD,why:'C’est la bonne réponse, mais elle ne découle pas de ta méthode.'}];
        const r=p.r;if(r===GOOD){const bad=T==='dif'?`(${poly([a,-b])})^2`:T==='car'?`(${poly([a,-sb*b])})^2`:`${k}(${poly([a,sb*b])})`;
          return[{h:M(r),ok:true,r},{h:M(bad),r:bad,why:T==='com'?`Le x commun a disparu : ${k}(${poly([a,sb*b]).replace('-',MINUS)}) n’est pas égal à l’expression.`:'Relis les signes : redéveloppe pour vérifier.',tag:'signe'}]}
        return[{h:M(r),ok:true,r},{h:M(GOOD),r:GOOD,why:'C’est la bonne réponse, mais elle ne découle pas de ton identification.'}]}},
      {q:'Contrôle en redéveloppant :',o:prev=>{const r=prev[2].r;if(!r)return[{h:'Rien à contrôler : la méthode ne convenait pas',ok:true},{h:'On retrouve l’expression de départ',why:'Aucune forme factorisée n’a été obtenue.'}];
        const same=equiv(parse(r),E);return[{h:same?'On retrouve l’expression de départ':'On ne retrouve pas l’expression de départ : erreur',ok:true},{h:same?'On ne retrouve pas l’expression de départ : erreur':'On retrouve l’expression de départ',why:`En redéveloppant ${M(r)}, on ${same?'retrouve':'ne retrouve pas'} ${M(E)}.`}]}}],
    explain:`Méthode : ${MET[T].toLowerCase()}. ${M(E)} = ${M(GOOD)}. Contrôle : en redéveloppant, on retrouve l’expression de départ.`})};
/* 11. Factoriser x² + bx + c (somme et produit) */
const gM1LitFacT=()=>{const r1=nz(-7,7);let r2;do r2=nz(-7,7);while(r2===r1||r2===-r1);const ex=poly([1,-(r1+r2),r1*r2]),tg=`(x${sg(-r1)})(x${sg(-r2)})`;
  return m1LitFacQ('Factorise sous la forme (x + p)(x + q).',M(ex),'=',tg,
    `On cherche deux nombres p et q de produit ${num(r1*r2)} et de somme ${num(-(r1+r2))} : ${num(-r1)} et ${num(-r2)}. Donc ${M(ex)} = ${M(tg)}. Contrôle : en redéveloppant, on retrouve ${M(ex)}.`,
    'En développant (x + p)(x + q), on obtient x² + (p + q)x + pq : cherche p et q.',a2=>eqv(a2,`(x${sg(r1)})(x${sg(r2)})`)?'roots-sign':null)};
ANA_UNITS.push({id:'m1-litteral',tr:'m1',name:'Calcul littéral',sub:'Développer, factoriser, identités remarquables',glyph:'(a+b)²',tone:'x',
  skills:[SKA('m1.lt.dist','Distribuer un facteur',gM1LitDist,1),SKA('m1.lt.moins','Moins devant une parenthèse',gM1LitMoins,1),SKA('m1.lt.reco','Reconnaître une identité',gM1LitReco,1),
    SKA('m1.lt.dev2','Développer deux parenthèses',gM1LitDev2,2),SKA('m1.lt.id','Identités remarquables',gM1LitId,2),SKA('m1.lt.facc','Facteur commun',gM1LitFacC,2),
    SKA('m1.lt.r1','Raisonner : développer un carré',gM1LitR1,2),SKA('m1.lt.nul','Produit nul',gM1LitNul,2),SKA('m1.lt.facid','Factoriser avec une identité',gM1LitFacId,3),
    SKA('m1.lt.r2','Raisonner : factoriser',gM1LitR2,3),SKA('m1.lt.fact','Factoriser un trinôme',gM1LitFacT,3)]});
