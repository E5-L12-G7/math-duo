/* ===================== MVA911 · Équations et inéquations du premier degré ===================== */
Object.assign(ANA_ERR,{
  'm1eq-coef':{label:'Coefficient soustrait',tip:'3x veut dire 3 × x : pour isoler x, on divise par 3, on ne soustrait pas 3.'},
  'm1eq-entier':{label:'Retour à la question',tip:'Relis la question : si l’on compte des objets, la réponse est un entier, et une inégalité stricte exclut la borne.'},
  'm1eq-cas':{label:'Cas particulier',tip:'Si les x disparaissent, regarde l’égalité qui reste : toujours vraie, S = ℝ ; toujours fausse, S = ∅.'}});
/** « kx + b » écrit à la française (k ou b peuvent être nuls) */
const m1EqT=(k,b)=>{let s='';if(k){const a=Math.abs(k);s=(k<0?MINUS:'')+(a===1?'':num(a))+'x'}
  if(b||!k)s+=s?` ${b<0?MINUS:'+'} ${num(Math.abs(b))}`:num(b);return s};
/** p/q exact, simplifié, en HTML */
const m1EqQ=(p,q)=>{if(q<0){p=-p;q=-q}const f=new Fr(p,q);return f.d===1?num(f.n):(f.n<0?MINUS:'')+fr(Math.abs(f.n),f.d)};
const M1EQ_OPP={'<':'>','>':'<','≤':'≥','≥':'≤'};
const m1EqRel=r=>({'<':'&lt;','>':'&gt;'}[r]||r);
/** Balance dont les plateaux portent deux expressions ; « ? » sur le pivot */
const M1EQ_BAL=(L,Rt)=>`<div class="qfig"><svg viewBox="0 0 300 150" role="img" aria-label="Balance : ${L.replace(/<[^>]*>/g,'')} d’un côté, ${Rt.replace(/<[^>]*>/g,'')} de l’autre">
  <polygon points="150,62 132,128 168,128" fill="var(--soft)" stroke="var(--ink)" stroke-width="1.6"/><line x1="40" y1="60" x2="260" y2="60" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
  <line x1="60" y1="60" x2="60" y2="96" stroke="var(--muted)"/><line x1="240" y1="60" x2="240" y2="96" stroke="var(--muted)"/>
  <path d="M18,96 L102,96 L94,106 L26,106 Z" fill="var(--t-sq)" opacity=".35" stroke="var(--t-sq)"/><path d="M198,96 L282,96 L274,106 L206,106 Z" fill="var(--t-c)" opacity=".35" stroke="var(--t-c)"/>
  <text x="60" y="88" font-size="14" font-weight="700" text-anchor="middle" fill="var(--ink)">${L}</text><text x="240" y="88" font-size="14" font-weight="700" text-anchor="middle" fill="var(--ink)">${Rt}</text>
  <text x="150" y="112" font-size="16" font-weight="700" text-anchor="middle" fill="var(--ink)">?</text></svg></div>`;
const m1EqSub=(k,b,x)=>`${k===1?'':k===-1?MINUS:num(k)+' × '}${x<0?`(${num(x)})`:num(x)}${b?` ${b<0?MINUS:'+'} ${num(Math.abs(b))}`:''}`;
/* 1. Vérifier si un nombre est solution (balance) */
const gM1EqVerif=()=>{const x0=R(-5,6);let a,c;do{a=nz(-5,6);c=nz(-4,5)}while(a===c);const b=R(-9,9),sol=Math.random()<.4,off=sol?0:nz(-4,4),d=(a-c)*x0+b-off;
  const L=a*x0+b,Rv=c*x0+d,eq=`${m1EqT(a,b)} = ${m1EqT(c,d)}`;
  return mcq(`Pour x = ${num(x0)}, que fait la balance ?`,mx(eq)+M1EQ_BAL(m1EqT(a,b),m1EqT(c,d)),
    [{h:`Elle est en équilibre : ${num(x0)} est solution`,ok:L===Rv},{h:'Le plateau de gauche est plus lourd',ok:L>Rv},{h:'Le plateau de droite est plus lourd',ok:L<Rv}],
    `On remplace x par ${num(x0)} de chaque côté. Gauche : ${m1EqSub(a,b,x0)} = ${num(L)}. Droite : ${m1EqSub(c,d,x0)} = ${num(Rv)}. ${L===Rv?'Les deux côtés sont égaux : x = '+num(x0)+' est solution.':`${num(L)} ${L>Rv?'&gt;':'&lt;'} ${num(Rv)} : la balance penche, ${num(x0)} n’est pas solution.`}`,
    'Remplace x par la valeur dans chaque membre (entre parenthèses si elle est négative), puis compare.',true)};
/* 2. Résoudre et placer la solution sur la droite graduée */
const gM1EqPlace=()=>{const x0=R(-10,10)/2,a=Number.isInteger(x0)?nz(-5,5):pick([2,-2,4,-4,6]),b=nz(-9,9),c=a*x0+b;if(a===1&&b===0)return gM1EqPlace();
  return pointQ({instr:'Résous l’équation, puis place sa solution sur la droite graduée.',prompt:mx(`${m1EqT(a,b)} = ${num(c)}`),nom:'S',
    x:[-6,6],y:[-1.5,1.5],snap:.5,tol:.2,cible:[x0,0],fond:{ligne:true,pas:.5,etiq:1},
    explain:`${mx(`${m1EqT(a,0)} = ${num(c)} ${b<0?'+':MINUS} ${num(Math.abs(b))} = ${num(c-b)}`)}, puis on divise par ${num(a)} : ${mx(`x = ${num(c-b)} ÷ ${a<0?`(${num(a)})`:num(a)} = ${num(x0)}`)}. Vérification : ${m1EqSub(a,b,x0)} = ${num(c)}.`,
    hint:`Enlève d’abord ${num(b)} aux deux membres, puis divise par ${num(a)}. Une graduation vaut 0,5.`,
    diag:pt=>{const v=pt[0];return Math.abs(v-(c+b)/a)<.1?'signe':Math.abs(v-(c-b-a))<.1?'m1eq-coef':null}})};
/* 3. Lire un ensemble de solutions sur la droite graduée */
const gM1EqLire=()=>{const k=R(-4,4),t=R(0,3),lo=t<2,strict=t%2===0,S=lo?(strict?`]−∞ ; ${num(k)}[`:`]−∞ ; ${num(k)}]`):(strict?`]${num(k)} ; +∞[`:`[${num(k)} ; +∞[`);
  const fig=FIG.droiteNum({min:-6,max:6,intervalle:lo?[-99,k,false,strict]:[k,99,strict,false]});
  const all=[`]−∞ ; ${num(k)}[`,`]−∞ ; ${num(k)}]`,`]${num(k)} ; +∞[`,`[${num(k)} ; +∞[`];
  return mcq('Quel ensemble de solutions est colorié sur la droite ?',fig,all.map(h=>({h:mx('S = '+h),ok:h===S,tag:(h.startsWith(']−∞')===lo)?'bracket':'interval-dir'})),
    `La zone part vers ${lo?'la gauche (−∞)':'la droite (+∞)'} et le point en ${num(k)} est ${strict?'creux : '+num(k)+' n’est pas solution, crochet ouvert':'plein : '+num(k)+' est solution, crochet fermé'}. S = ${S}, c’est-à-dire ${mx(`x ${m1EqRel(lo?(strict?'<':'≤'):(strict?'>':'≥'))} ${num(k)}`)}.`,
    'Point plein : borne incluse, crochet tourné vers le nombre. Point creux : crochet ouvert. Vers l’infini, toujours ouvert.',true)};
/* 4. Diviser par un négatif : le sens change */
const gM1EqSens=()=>{const k=nz(-6,6)*(Math.random()<.7?-1:1),v=nz(-5,5),m=k*v,rel=pick(['<','>','≤','≥']),good=k<0?M1EQ_OPP[rel]:rel;
  const o=[[good,v,1],[M1EQ_OPP[good],v,0,'ineq-flip'],[good,-v,0,'signe'],[M1EQ_OPP[good],-v,0,'signe']];
  return mcq('Isole x dans cette inéquation.',mx(`${m1EqT(k,0)} ${m1EqRel(rel)} ${num(m)}`)+FIG.droiteNum({min:-6,max:6,pts:[[v,'?']]}),
    o.map(([r,w,ok,tag])=>({h:mx(`x ${m1EqRel(r)} ${num(w)}`),ok:!!ok,tag})),
    `On divise les deux membres par ${num(k)}, ${k<0?'un nombre <b>négatif</b> : le sens de l’inégalité <b>change</b>':'un nombre positif : le sens est conservé'}. ${num(m)} ÷ ${k<0?`(${num(k)})`:num(k)} = ${num(v)}, donc ${mx(`x ${m1EqRel(good)} ${num(v)}`)}. La borne est le point marqué sur la droite.`,
    'Regarde le signe du nombre par lequel tu divises.')};
/* 5. Résoudre graphiquement ax + b = c */
const gM1EqGraph=()=>{let a,b,x0,c;do{a=pick([-2,-1,1,2,.5,-.5]);x0=R(-4,4)*(Math.abs(a)===.5?1:1);b=R(-3,3);c=a*x0+b}while(!Number.isInteger(c)||Math.abs(c)>5||c===b);
  const f=`${a}*x${b<0?'-':'+'}${Math.abs(b)}`;
  return nq({instr:`Lis sur le graphique la solution de l’équation, puis vérifie-la par le calcul.`,prompt:mx(`${m1EqT(a,b)} = ${num(c)}`)+FIG.plot({x:[-6,6],y:[-6,6],f:[f,{f:String(c),c:1,dash:true}],pas:1}),
    labels:['x ='],t:[x0],explain:`On cherche l’abscisse du point où la droite ${mx('y = '+m1EqT(a,b))} croise la droite horizontale ${mx('y = '+num(c))} : x = ${num(x0)}. Calcul : ${mx(`${m1EqT(a,0)} = ${num(c)} ${b<0?'+':MINUS} ${num(Math.abs(b))} = ${num(c-b)}`)}, donc ${mx(`x = ${num(c-b)} ÷ ${a<0?`(${num(a)})`:num(a)} = ${num(x0)}`)}.`,
    hint:'Repère le croisement des deux droites et lis son abscisse (sur l’axe horizontal).',diag:([v])=>near(v,c)?'rapport':null})};
/* 6 à 9. Balances de l'ancien parcours */
const gM1EqBal=()=>gLin1();
const gM1EqBal2=()=>pick([gLin2,gLin3,gLin4])();
const gM1EqIneq=()=>gIneq();
const gM1EqR1=()=>gLinR();
const gM1EqR2=()=>gIneqR();
/* 10. Raisonner : mettre un problème en inéquation (l'erreur se propage) */
const gM1EqPb=()=>{const[lieu,units,unit,de]=pick([['une salle de sport','séances','séance','de '],['un cinéma','places','place','de '],['une piscine','entrées','entrée','d’'],['un parc de loisirs','visites','visite','de ']]);
  let q,p,d,F;do{q=R(6,12);p=R(2,q-2);d=q-p;F=d*R(4,10)+(Math.random()<.5&&d>1?R(1,d-1):0)}while(F===q||F+p===q||F>90);const v=F/d;
  const X1=Math.ceil(v*1.8),Y1=q*X1,nice=w=>{const e=10**Math.floor(Math.log10(w)),m=w/e;return(m<=1?1:m<=2?2:m<=5?5:10)*e};
  const fig=FIG.plot({x:[0,X1],y:[0,Y1],f:[`${p}x+${F}`,`${q}x`],pas:nice(X1/8),pasy:nice(Y1/6)});
  const nOf=(s,w)=>s==='>'?Math.floor(w+1e-9)+1:s==='≥'?Math.ceil(w-1e-9):s==='<'?Math.ceil(w-1e-9)-1:Math.floor(w+1e-9);
  const phrase=(s,n)=>(s==='>'||s==='≥')?(n<=1?`Dès la 1<sup>re</sup> ${unit}`:`À partir de ${n} ${units}`):(n<1?`Jamais : aucun nombre ${de}${units} ne convient`:`Jusqu’à ${n} ${units} au plus`);
  return chain({instr:'Mets le problème en inéquation et résous-le, étape par étape.',
    prompt:stx(`Dans ${lieu}, l’abonnement coûte ${F} €, puis ${p} € par ${unit}. Sans abonnement, chaque ${unit} coûte ${q} €. À partir de combien ${de}${units} l’abonnement est-il <b>strictement</b> moins cher ? Le graphique montre les deux prix en fonction du nombre ${de}${units}.`)+fig,
    steps:[
      {q:`On note x le nombre ${de}${units}. Avec l’abonnement, on paie…`,o:[
        {h:mx(`${F} + ${p}x`),ok:true,kA:p,cA:F},
        {h:mx(`(${F} + ${p})x = ${F+p}x`),kA:F+p,cA:0,why:'L’abonnement se paie une seule fois : il ne se multiplie pas par x.'},
        {h:mx(`${p} + ${F}x`),kA:F,cA:p,why:`C’est le prix par ${unit} qui se multiplie par le nombre ${de}${units}, pas l’abonnement.`}]},
      {q:'L’abonnement est strictement moins cher quand…',o:prev=>{const A=m1EqT(prev[0].kA,prev[0].cA);return[
        {h:mx(`${A} &lt; ${q}x`),ok:true,rel:'<'},
        {h:mx(`${A} &gt; ${q}x`),rel:'>',why:'« > » signifierait que l’abonnement coûte plus cher.',tag:'interval-dir'},
        {h:mx(`${A} ≤ ${q}x`),rel:'≤',why:'« Strictement moins cher » exclut l’égalité : l’inégalité doit être stricte.',tag:'bracket'}]}},
      {q:'On résout l’inéquation :',o:prev=>{const{kA,cA}=prev[0],rel=prev[1].rel,D=q-kA,r1=D>0?M1EQ_OPP[rel]:rel,w=cA/D,w2=cA/(q+kA);
        return[{h:mx(`${num(cA)} ${m1EqRel(rel)} ${m1EqT(D,0)}, donc x ${m1EqRel(r1)} ${m1EqQ(cA,D)}`),ok:true,s:r1,w,bp:cA,bq:D},
          {h:mx(`${num(cA)} ${m1EqRel(rel)} ${m1EqT(D,0)}, donc x ${m1EqRel(M1EQ_OPP[r1])} ${m1EqQ(cA,D)}`),s:M1EQ_OPP[r1],w,bp:cA,bq:D,why:D>0?`On divise par ${num(D)}, un nombre positif : le sens ne change pas (seul le côté où l’on écrit x change).`:`On divise par ${num(D)}, un nombre négatif : le sens doit changer.`,tag:'ineq-flip'},
          {h:mx(`${num(cA)} ${m1EqRel(rel)} ${m1EqT(q+kA,0)}, donc x ${m1EqRel(r1)} ${m1EqQ(cA,q+kA)}`),s:r1,w:w2,bp:cA,bq:q+kA,why:`Pour regrouper les x à droite, on enlève ${kA}x : ${q}x − ${kA}x = ${m1EqT(D,0)}, on n’additionne pas.`,tag:'signe'}]}},
      {q:'Conclusion :',o:prev=>{const{s,w,bp,bq}=prev[2],n=nOf(s,w),up=s==='>'||s==='≥',vals=[n,n-1,n+1].filter(N=>N>=1);const seen=new Set,o=[];
        const add=(h,ok,why,tag)=>{if(seen.has(h))return;seen.add(h);o.push(ok?{h,ok:true}:{h,why,tag})};
        add(phrase(s,n),true);vals.slice(1).forEach(N=>add(phrase(s,N),false,`Vérifie l’entier : la borne vaut ${m1EqQ(bp,bq)} et l’inégalité est ${s==='<'||s==='>'?'stricte, la borne est exclue':'large, la borne est incluse'}.`,'m1eq-entier'));
        add(phrase(up?'<':'>',Math.max(n,1)),false,'Le sens de l’inégalité dit si l’on cherche les grands nombres (« à partir de ») ou les petits (« jusqu’à »).','interval-dir');
        if(o.length<2)add(phrase(up?'≤':'≥',n+2),false,'Relis le sens de l’inégalité obtenue.','interval-dir');return o}}],
    explain:`Avec l’abonnement : ${mx(`${F} + ${p}x`)} ; sans : ${mx(`${q}x`)}. On veut ${mx(`${F} + ${p}x &lt; ${q}x`)}, soit ${mx(`${F} &lt; ${d}x`)}, donc ${mx(`x &gt; ${m1EqQ(F,d)}`)}${Number.isInteger(v)?'':` ≈ ${dec(v,2)}`}. Comme x est un entier, l’abonnement est strictement moins cher à partir de ${Math.floor(v)+1} ${units}${Number.isInteger(v)?` (avec ${v} ${units}, les deux prix sont égaux)`:''}.`})};
/* 11. Expert : cas particuliers (aucune solution, tous les réels) */
const gM1EqCas=()=>{const t=R(0,2),a=R(2,5),b=nz(-6,6);let c;do c=nz(-4,4);while(a+c===0);const s=a+c;
  let e=0,k;if(t===2){do e=nz(-2,2);while(s+e===0);k=e*nz(-4,4)}else k=t===0?nz(-5,5):0;
  const Lt=`${a}(${m1EqT(1,b)}) ${c<0?MINUS:'+'} ${Math.abs(c)===1?'':Math.abs(c)}x`,Rt=m1EqT(s+e,a*b+k),v=t===2?-k/e:null;
  const opts=[{h:'S = ∅',ok:t===0,tag:'m1eq-cas'},{h:'S = ℝ',ok:t===1,tag:'m1eq-cas'},{h:'S = {0}',ok:false}];
  opts.push(t===2?{h:`S = {${num(v)}}`,ok:true}:{h:`S = {${num(a*b)}}`,ok:false});
  return mcq('Quel est l’ensemble des solutions ?',mx(`${Lt} = ${Rt}`),opts.map(o=>({...o,h:mx(o.h)})),
    `On développe le membre de gauche : ${mx(`${a}x ${a*b<0?MINUS:'+'} ${num(Math.abs(a*b))} ${c<0?MINUS:'+'} ${Math.abs(c)===1?'':Math.abs(c)}x = ${m1EqT(s,a*b)}`)}. `+
    (t===2?`L’équation devient ${mx(`${m1EqT(s,a*b)} = ${Rt}`)}, soit ${mx(`${m1EqT(-e,0)} = ${num(k)}`)}, donc x = ${num(v)}.`
      :`L’équation devient ${mx(`${m1EqT(s,a*b)} = ${Rt}`)} : les x s’éliminent et il reste ${mx(`${num(a*b)} = ${num(a*b+k)}`)}, ${t===0?'toujours faux : aucune solution, S = ∅.':'toujours vrai : tous les réels sont solutions, S = ℝ.'}`),
    'Développe et réduis chaque membre, puis regroupe les x. Si les x disparaissent, regarde ce qui reste.')};
ANA_UNITS.push({id:'m1-equations',tr:'m1',name:'Équations',sub:'Balance, inéquations, mise en équation',glyph:'x = ?',tone:'sq',
  skills:[SKA('m1.eq.verif','Vérifier une solution',gM1EqVerif,1),SKA('m1.eq.bal','Isoler x sur la balance',gM1EqBal,1),SKA('m1.eq.lire','Lire un ensemble de solutions',gM1EqLire,1),
    SKA('m1.eq.sens','Diviser par un négatif',gM1EqSens,1),SKA('m1.eq.place','Résoudre et placer la solution',gM1EqPlace,1),SKA('m1.eq.bal2','Parenthèses et fractions',gM1EqBal2,2),
    SKA('m1.eq.graph','Résoudre graphiquement',gM1EqGraph,2),SKA('m1.eq.ineq','Résoudre une inéquation',gM1EqIneq,2),SKA('m1.eq.r1','Raisonner : une équation',gM1EqR1,2),
    SKA('m1.eq.r2','Raisonner : une inéquation',gM1EqR2,2),SKA('m1.eq.pb','Raisonner : mettre en inéquation',gM1EqPb,3),SKA('m1.eq.cas','Aucune solution ou une infinité',gM1EqCas,3)]});
