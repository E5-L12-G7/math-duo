/* ===================== MVA911 · Fractions ===================== */
Object.assign(ANA_ERR,{
  'fr-denom':{label:'Dénominateurs additionnés',tip:'On n’additionne jamais les dénominateurs : on réécrit d’abord les fractions sur un même dénominateur, puis on additionne les numérateurs.'},
  'fr-irr':{label:'Fraction non simplifiée',tip:'Le résultat attendu est irréductible : divise le numérateur et le dénominateur par leur PGCD.'},
  'fr-inv':{label:'Inverse oublié',tip:'Diviser par une fraction, c’est multiplier par son inverse : (a/b) ÷ (c/d) = (a/b) × (d/c).'}});
/** Barre partagée en d parts, n coloriées (plusieurs barres si n > d) */
const M1_BAR=(n,d,col='var(--t-sq)')=>{const k=Math.max(1,Math.ceil(n/d));let s='';for(let j=0;j<k;j++){const w=280/d;
  for(let i=0;i<d;i++)s+=`<rect x="${10+i*w}" y="${6+j*44}" width="${w}" height="34" rx="3" fill="${j*d+i<n?col:'var(--surface)'}" stroke="var(--ink)" stroke-width="1.2"/>`}
  return`<div class="qfig"><svg viewBox="0 0 300 ${k*44+6}" role="img" aria-label="${n} parts coloriées sur des barres de ${d} parts">${s}</svg></div>`};
const m1Fr=(p,q)=>{const f=new Fr(p,q);return f.d===1?num(f.n):(f.n<0?MINUS:'')+fr(Math.abs(f.n),f.d)};
/** Réponse fractionnaire exigée sous forme irréductible (ou entière) */
function m1FracQ(instr,prompt,label,p,q,explain,hint,diag){const F=new Fr(p,q);
  return{type:'input',instr,prompt,fields:[{label,kind:'num'}],explain,hint,ans:[F.d===1?String(F.n):`${F.n}/${F.d}`],
    check:([a],[tk])=>{let v;try{v=ev(a)}catch(e){return false}if(!near(v,F.val(),1e-9))return false;
      const s=tk.join('').replace(/[()]/g,'');const m=s.match(/^(-?)(\d+)(?:\/(\d+))?$/);if(!m)return false;return!m[3]||(gcd(+m[2],+m[3])===1&&+m[3]>1)},
    diag:([a])=>{try{const v=ev(a);if(near(v,F.val(),1e-9))return'fr-irr';return diag?diag(v):null}catch(e){return null}}}}
/* 1. Lire une fraction sur une barre */
const gM1FrLire=()=>{const d=R(3,10),n=R(1,d-1);
  return nq({instr:'Quelle fraction de la barre est coloriée ?',prompt:M1_BAR(n,d),labels:['Fraction ='],t:[n/d],
    explain:`La barre est coupée en ${d} parts égales et ${n} sont coloriées : ${fr(n,d)}.`,hint:'Compte le nombre total de parts (dénominateur), puis les parts coloriées (numérateur).',
    diag:([v])=>near(v,d/n,1e-9)?'rapport':null})};
/* 2. Simplifier */
const gM1FrSimp=()=>{const p0=R(1,9),q0=R(2,12);if(gcd(p0,q0)!==1||p0===q0)return gM1FrSimp();const k=R(2,9),p=p0*k,q=q0*k;
  return m1FracQ('Simplifie la fraction (forme irréductible).',`<span class="m">${fr(p,q)}</span>`,`${fr(p,q)} =`,p,q,
    `PGCD(${p} ; ${q}) = ${k}. On divise le haut et le bas par ${k} : ${fr(p,q)} = ${m1Fr(p,q)}.`,'Cherche le plus grand nombre qui divise à la fois le numérateur et le dénominateur.')};
/* 3. Additionner (avec barres) */
const gM1FrSum=()=>{let b,d;do{b=R(2,8);d=R(2,8)}while(b===d);const a=R(1,b-1),c=R(1,d-1),sub=Math.random()<.35&&a*d>c*b;
  const p=sub?a*d-c*b:a*d+c*b,q=b*d,m=b*d/gcd(b,d);
  return m1FracQ(`Calcule${sub?' la différence':' la somme'} (forme irréductible).`,`<span class="m">${fr(a,b)} ${sub?MINUS:'+'} ${fr(c,d)}</span>`+M1_BAR(a,b)+M1_BAR(c,d,'var(--t-c)'),'Résultat =',p,q,
    `Dénominateur commun : ${m}. ${fr(a,b)} = ${fr(a*m/b,m)} et ${fr(c,d)} = ${fr(c*m/d,m)}, donc le résultat vaut ${fr(sub?a*m/b-c*m/d:a*m/b+c*m/d,m)}${new Fr(p,q).d!==m?` = ${m1Fr(p,q)}`:''}.`,
    'Réécris les deux fractions sur le même dénominateur (le PPCM des dénominateurs).',v=>near(v,(sub?a-c:a+c)/(b+d),1e-9)?'fr-denom':null)};
/* 4. Multiplier / diviser */
const gM1FrMul=()=>{const a=R(1,9),b=R(2,9),c=R(1,9),d=R(2,9),div=Math.random()<.5;const p=div?a*d:a*c,q=div?b*c:b*d;
  return m1FracQ(`Calcule ${div?'le quotient':'le produit'} (forme irréductible).`,`<span class="m">${fr(a,b)} ${div?'÷':'×'} ${fr(c,d)}</span>`,'Résultat =',p,q,
    div?`Diviser, c’est multiplier par l’inverse : ${fr(a,b)} × ${fr(d,c)} = ${fr(a*d,b*c)}${new Fr(p,q).d!==b*c||new Fr(p,q).n!==a*d?` = ${m1Fr(p,q)}`:''}.`
      :`On multiplie haut × haut et bas × bas : ${fr(a*c,b*d)}${new Fr(p,q).d!==b*d||new Fr(p,q).n!==a*c?` = ${m1Fr(p,q)}`:''}.`,
    div?'Retourne la deuxième fraction, puis multiplie.':'Numérateur × numérateur, dénominateur × dénominateur.',v=>div&&near(v,a*c/(b*d),1e-9)?'fr-inv':null)};
/* 5. Placer une fraction sur une droite graduée */
const gM1FrPlace=()=>{const d=pick([2,3,4,5,6,8]),n=R(1,3*d-1);if(n%d===0)return gM1FrPlace();
  return pointQ({instr:`Place le point d’abscisse ${n}/${d} sur la droite graduée.`,prompt:`<span class="m">${fr(n,d)}</span>`,nom:'P',
    x:[-.2,3.2],y:[-.6,.6],snap:1/d,tol:.4/d,cible:[n/d,0],fond:{ligne:true,pas:1/d,etiq:1},
    explain:`Chaque unité est coupée en ${d} : on compte ${n} petits pas depuis 0. ${fr(n,d)} = ${Math.floor(n/d)} + ${fr(n%d,d)}.`,hint:`Une graduation vaut ${fr(1,d)} : compte ${n} graduations depuis 0.`})};
/* 6. Fraction d'une quantité */
const gM1FrQte=()=>{const b=pick([2,3,4,5,6,8,10]),a=R(1,b-1),k=R(2,15),Q=b*k,ctx=pick([['€','d’une somme de',''],['personnes','d’un groupe de',''],['km','d’un trajet de','']]);
  return nq({instr:'Calcule la quantité demandée.',prompt:stx(`Combien font les ${a}/${b} ${ctx[1]} ${Q} ${ctx[0]} ?`)+M1_BAR(a,b),labels:[`Résultat (${ctx[0]}) =`],t:[Q*a/b],
    explain:`On partage ${Q} en ${b} parts : ${Q} ÷ ${b} = ${k}, puis on en prend ${a} : ${k} × ${a} = ${num(Q*a/b)}.`,hint:`Divise par le dénominateur, puis multiplie par le numérateur.`,
    diag:([v])=>near(v,Q*b/a,1e-6)?'rapport':null})};
/* 7. Comparer deux fractions (avec barres) */
const gM1FrComp=()=>{let a,b,c,d;do{b=R(2,9);d=R(2,9);a=R(1,b-1);c=R(1,d-1)}while(b===d);const x=a/b,y=c/d,ok=Math.abs(x-y)<1e-12?2:x>y?0:1;
  return mcq('Compare ces deux fractions.',`<span class="m">${fr(a,b)} et ${fr(c,d)}</span>`+M1_BAR(a,b)+M1_BAR(c,d,'var(--t-c)'),
    [{h:mx(`${fr(a,b)} &gt; ${fr(c,d)}`),ok:ok===0},{h:mx(`${fr(a,b)} &lt; ${fr(c,d)}`),ok:ok===1},{h:mx(`${fr(a,b)} = ${fr(c,d)}`),ok:ok===2}],
    `Même dénominateur ${b*d} : ${fr(a,b)} = ${fr(a*d,b*d)} et ${fr(c,d)} = ${fr(c*b,b*d)}. On compare ${a*d} et ${c*b}.`,'Mets les deux fractions au même dénominateur, ou compare les longueurs coloriées.',true)};
/* 8. Raisonner : additionner deux fractions (l'erreur se propage) */
const gM1FrR1=()=>{const[b,d]=shuffle(pick([[4,6],[6,8],[6,9],[4,10],[8,12],[6,10],[9,12],[10,15],[6,15]]).slice());const a=R(1,b-1),c=R(1,d-1),m=b*d/gcd(b,d);
  return chain({instr:'Additionne les deux fractions en construisant ton raisonnement.',prompt:`<span class="m">${fr(a,b)} + ${fr(c,d)}</span>`,
    steps:[
      {q:'Première étape :',o:[
        {h:`Chercher un dénominateur commun aux deux fractions`,ok:true,k:'com'},
        {h:`Additionner les numérateurs et les dénominateurs : ${fr(a+c,b+d)}`,k:'naif',why:'On ne peut additionner que des parts de même taille : il faut d’abord un dénominateur commun.',tag:'fr-denom'},
        {h:`Multiplier les deux fractions`,k:'mul',why:'Une somme n’est pas un produit : multiplier ne répond pas à la question.'}]},
      {q:'Quel dénominateur commun choisir ?',o:prev=>prev[0].k!=='com'?[{h:`Aucun : le calcul est déjà fini`,ok:true,D:null},{h:`${m}`,D:m,why:'Ton choix précédent ne passait pas par un dénominateur commun.'}]:[
        {h:`${m}, le plus petit multiple commun de ${b} et ${d}`,ok:true,D:m},{h:`${b+d}, la somme des dénominateurs`,D:b+d,why:`${b+d} n’est pas un multiple de ${b} et de ${d} : on ne peut pas y ramener les fractions.`,tag:'fr-denom'},
        {h:`${b*d}, le produit des dénominateurs`,ok:false,D:b*d,why:`${b*d} marche aussi, mais ${m} est plus petit : le calcul sera plus simple. Ici on demande le plus petit.`}].filter((o,i,arr)=>arr.findIndex(x=>x.h===o.h)===i)},
      {q:'Le résultat est…',o:prev=>{const D=prev[1].D,r=new Fr(a*d+c*b,b*d);
        if(!D)return[{h:mx(fr(a+c,b+d)),ok:true},{h:mx(m1Fr(a*d+c*b,b*d)),why:'C’est la bonne somme, mais elle ne découle pas de ton premier choix.'}];
        const A=D%b===0?a*D/b:NaN,C=D%d===0?c*D/d:NaN;
        if(!Number.isFinite(A)||!Number.isFinite(C))return[{h:'Impossible d’écrire les deux fractions sur ce dénominateur',ok:true},{h:mx(m1Fr(a*d+c*b,b*d)),why:'Avec ce dénominateur, on ne peut pas réécrire les fractions.'}];
        return[{h:mx(`${fr(A,D)} + ${fr(C,D)} = ${fr(A+C,D)}${new Fr(A+C,D).d!==D?` = ${m1Fr(A+C,D)}`:''}`),ok:true},
          {h:mx(`${fr(A,D)} + ${fr(C,D)} = ${fr(A+C,2*D)}`),why:'Une fois au même dénominateur, on additionne les numérateurs et on garde le dénominateur.',tag:'fr-denom'},
          {h:mx(`${fr(a,D)} + ${fr(c,D)} = ${fr(a+c,D)}`),why:'En changeant le dénominateur, il faut aussi multiplier le numérateur par le même nombre.'}]}}],
    explain:`Dénominateur commun ${m} : ${fr(a,b)} = ${fr(a*m/b,m)} et ${fr(c,d)} = ${fr(c*m/d,m)}. Somme : ${fr(a*m/b+c*m/d,m)}${new Fr(a*d+c*b,b*d).d!==m?` = ${m1Fr(a*d+c*b,b*d)}`:''}.`})};
/* 9. Raisonner : diviser par une fraction */
const gM1FrR2=()=>{const a=R(1,9),b=R(2,9),c=R(1,9),d=R(2,9);
  return chain({instr:'Calcule le quotient en construisant ton raisonnement.',prompt:`<span class="m">${fr(a,b)} ÷ ${fr(c,d)}</span>`,
    steps:[
      {q:'Diviser par une fraction, c’est…',o:[{h:`multiplier par son inverse ${fr(d,c)}`,ok:true,i:1},{h:`multiplier par ${fr(c,d)}`,i:0,why:'Il faut retourner la fraction par laquelle on divise.',tag:'fr-inv'},{h:`diviser haut par haut et bas par bas`,i:2,why:'Cette règle n’existe pas pour la division : on multiplie par l’inverse.'}]},
      {q:'On obtient…',o:prev=>{const i=prev[0].i,[p,q]=i===1?[a*d,b*c]:i===0?[a*c,b*d]:[a/c,b/d];
        const h=i===2?mx(`${fr(num(+(a/c).toFixed(3)),num(+(b/d).toFixed(3)))}`):mx(`${fr(p,q)}`);
        return[{h,ok:true,p,q},{h:mx(fr(a*c+1,b*d)),p:a*c+1,q:b*d,why:'Erreur de calcul dans le produit.'}].filter((o,j,arr)=>arr.findIndex(x=>x.h===o.h)===j)}},
      {q:'Forme irréductible :',o:prev=>{const{p,q}=prev[1];if(!Number.isInteger(p)||!Number.isInteger(q))return[{h:'Le calcul n’aboutit pas à une fraction simple',ok:true},{h:mx(m1Fr(a*d,b*c)),why:'C’est le bon résultat, mais il ne découle pas de ta méthode.'}];
        const r=new Fr(p,q),irr=r.d===q&&r.n===p;
        return[{h:mx(m1Fr(p,q)),ok:true},{h:mx(fr(r.n+1,r.d)),why:'Vérifie la simplification : on divise le haut et le bas par le même nombre.'},
          irr?{h:mx(fr(2*p,2*q)),why:'Multiplier le haut et le bas par 2 ne simplifie pas : la fraction était déjà irréductible.'}:{h:mx(fr(p,q)),why:`Ce n’est pas fini : on peut encore diviser le haut et le bas par ${q/r.d}.`,tag:'fr-irr'}]}}],
    explain:`${fr(a,b)} ÷ ${fr(c,d)} = ${fr(a,b)} × ${fr(d,c)} = ${fr(a*d,b*c)}${new Fr(a*d,b*c).d!==b*c||new Fr(a*d,b*c).n!==a*d?` = ${m1Fr(a*d,b*c)}`:''}.`})};
/* 10. Expert : somme de fractions rationnelles */
const gM1FrLet=()=>{const a=R(1,5),k=nz(-4,4);
  return exprQ('Réduis au même dénominateur.',mx(`${fr(1,'x')} + ${fr(a,`x ${k<0?MINUS:'+'} ${Math.abs(k)}`)}`),'=',`(${1+a}x+${k})/(x*(x+${k}))`.replace('+-','-').replace('+-','-'),
    `Dénominateur commun x(x ${k<0?MINUS:'+'} ${Math.abs(k)}) : ${fr(`x ${k<0?MINUS:'+'} ${Math.abs(k)} + ${a}x`,`x(x ${k<0?MINUS:'+'} ${Math.abs(k)})`)} = ${fr(`${1+a}x ${k<0?MINUS:'+'} ${Math.abs(k)}`,`x(x ${k<0?MINUS:'+'} ${Math.abs(k)})`)}, pour x ≠ 0 et x ≠ ${num(-k)}.`,
    'Multiplie chaque fraction par ce qui manque à son dénominateur.',false)};
ANA_UNITS.push({id:'m1-fractions',tr:'m1',name:'Fractions',sub:'Partager, simplifier, additionner, diviser',glyph:'<span class="frac"><span>a</span><span>b</span></span>',tone:'x',
  skills:[SKA('m1.fr.lire','Lire une fraction',gM1FrLire,1),SKA('m1.fr.place','Placer une fraction',gM1FrPlace,1),SKA('m1.fr.qte','Fraction d’une quantité',gM1FrQte,1),
    SKA('m1.fr.simp','Simplifier',gM1FrSimp,1),SKA('m1.fr.comp','Comparer deux fractions',gM1FrComp,2),SKA('m1.fr.sum','Additionner, soustraire',gM1FrSum,2),
    SKA('m1.fr.mul','Multiplier, diviser',gM1FrMul,2),SKA('m1.fr.r1','Raisonner : une somme',gM1FrR1,2),SKA('m1.fr.r2','Raisonner : un quotient',gM1FrR2,3),SKA('m1.fr.let','Fractions avec des lettres',gM1FrLet,3)]});
