/* ===================== MVA911 · Équations et inéquations du second degré ===================== */
Object.assign(ANA_ERR,{
  'm1sd-coef':{label:'Coefficients mal lus',tip:'a est le nombre devant x², b celui devant x, c le nombre seul, chacun avec son signe, quel que soit l’ordre d’écriture.'},
  'm1sd-signe':{label:'Signe du trinôme',tip:'À l’extérieur des racines, le trinôme a le signe de a ; entre les racines, le signe contraire. Fais un croquis : cuvette ou dôme.'},
  'm1sd-2a':{label:'Dénominateur 2a',tip:'Les racines sont (−b ± √Δ) ÷ (2a) : le dénominateur est 2a, pas a.'},
  'm1sd-oubli':{label:'Solution oubliée',tip:'x² = 9 a deux solutions, 3 et −3 ; et dans x(x − 4) = 0, x = 0 est aussi solution.'}});
const m1SdF=cs=>poly(cs);
const m1SdPar=(a,b,c)=>`${a}*x^2${b<0?'-':'+'}${Math.abs(b)}*x${c<0?'-':'+'}${Math.abs(c)}`;
/* 1. Lire a, b, c */
const gM1SdCoef=()=>{const a=nz(-5,5),b=nz(-9,9),c=nz(-9,9),T=shuffle([[a,'x^2'],[b,'x'],[c,'']]);
  const s=T.map(([k,t],i)=>`${k<0?'-':i?'+':''}${Math.abs(k)===1&&t?'':Math.abs(k)}${t}`).join('');
  return nq({instr:'Repère les coefficients a, b et c du trinôme ax² + bx + c.',prompt:M(s),labels:['a =','b =','c ='],t:[a,b,c],
    explain:`On range les termes : ${M(m1SdF([a,b,c]))}. Le nombre devant x² est a = ${num(a)}, celui devant x est b = ${num(b)}, le nombre seul est c = ${num(c)}.`,
    hint:'Ne te fie pas à l’ordre d’écriture : cherche le terme en x², le terme en x et le nombre seul, avec leur signe.',
    diag:vs=>{const ord=T.map(t=>t[0]);return vs.every((v,i)=>near(v,ord[i]))?'m1sd-coef':vs.some((v,i)=>near(v,-[a,b,c][i]))?'signe':null}})};
/* 2. Calculer le discriminant */
const gM1SdDelta=()=>{const a=nz(-3,4),b=nz(-8,8),c=R(-6,6),D=b*b-4*a*c;
  return nq({instr:'Calcule le discriminant Δ.',prompt:M(m1SdF([a,b,c]))+' = 0',labels:['Δ ='],t:[D],
    explain:`a = ${num(a)}, b = ${num(b)}, c = ${num(c)}. Δ = b² − 4ac = ${b<0?`(${num(b)})`:num(b)}² − 4 × ${m1AfP(a)} × ${m1AfP(c)} = ${b*b} ${-4*a*c<0?MINUS:'+'} ${num(Math.abs(4*a*c))} = ${num(D)}.`,
    hint:'Δ = b² − 4ac. Mets b entre parenthèses s’il est négatif : son carré est positif.',diag:([v])=>near(v,b*b+4*a*c)?'delta-formula':near(v,-b*b-4*a*c)?'carre-neg':null})};
/* 3. Lire le signe de Δ sur la parabole */
const gM1SdNb=()=>{const k=R(0,2),a=pick([1,-1,.5,-.5,2,-2]);let f,txt;
  if(k===2){let r1,r2;do{r1=R(-4,4);r2=R(-4,4)}while(Math.abs(r1-r2)<2||Math.abs(a*(r1-r2)**2/4)>9);f=`${a}*(x-(${r1}))*(x-(${r2}))`;txt=`deux points, en ${num(Math.min(r1,r2))} et ${num(Math.max(r1,r2))}`}
  else if(k===1){const r=R(-3,3);f=`${a}*(x-(${r}))^2`;txt=`un seul point, en ${num(r)} : le sommet est posé sur l’axe`}
  else{const h=R(-3,3),kk=Math.sign(a)*R(1,4);f=`${a}*(x-(${h}))^2+(${kk})`;txt=`aucun point : la parabole est entièrement ${a>0?'au-dessus':'au-dessous'} de l’axe`}
  return mcq('Que peut-on dire du discriminant de ce trinôme ?',FIG.plot({x:[-6,6],y:[-6,6],f:[f],pas:1})+stx('La courbe représente un trinôme ax² + bx + c.'),
    [{h:'Δ &gt; 0 : deux solutions',ok:k===2,tag:'delta-sign'},{h:'Δ = 0 : une seule solution',ok:k===1,tag:'delta-sign'},{h:'Δ &lt; 0 : aucune solution réelle',ok:k===0,tag:'delta-sign'}],
    `La parabole coupe l’axe des abscisses en ${txt}. Le nombre de points de contact est le nombre de solutions de ax² + bx + c = 0, que Δ annonce.`,
    'Compte les points où la courbe touche l’axe horizontal.',true)};
/* 4. Placer le sommet */
const gM1SdSommet=()=>{const a=pick([1,-1,2,-2]),h=R(-4,4),k=R(-4,4),b=-2*a*h,c=a*h*h+k;
  return pointQ({instr:'Calcule les coordonnées du sommet S de la parabole, puis place-le.',prompt:'<span class="m"><i>y</i> = </span>'+M(m1SdF([a,b,c])),nom:'S',x:[-5,5],y:[-5,5],snap:1,tol:.4,cible:[h,k],fond:{pas:1},
    explain:`Abscisse : −b ÷ (2a) = ${num(-b)} ÷ ${m1AfP(2*a)} = ${num(h)}. Ordonnée : ${num(a)} × ${m1AfP(h)}² ${b<0?MINUS:'+'} ${num(Math.abs(b))} × ${m1AfP(h)} ${c<0?MINUS:'+'} ${num(Math.abs(c))} = ${num(k)}. S(${num(h)} ; ${num(k)}).`,
    hint:'L’abscisse du sommet est −b ÷ (2a) ; son ordonnée s’obtient en remplaçant x par cette valeur.',diag:pt=>h!==0&&Math.abs(pt[0]+h)<.1?'vertex-sign':null})};
/* 5. Calculer les deux racines */
const gM1SdRac=()=>{const a=pick([1,1,2,-1,3]);let r1,s,cs;do{r1=R(-6,6);s=R(-9,9)}while(Math.abs(a)>1&&s%a===0||a*r1===s||s===0&&r1===0);
  cs=[a,-(a*r1+s),r1*s];const r2=s/a,lo=Math.min(r1,r2),hi=Math.max(r1,r2),D=cs[1]**2-4*cs[0]*cs[2];
  return nq({instr:'Résous l’équation. Donne la plus petite solution d’abord (valeurs exactes).',prompt:M(m1SdF(cs))+' = 0',labels:['x₁ =','x₂ ='],t:[lo,hi],
    explain:`Δ = ${cs[1]<0?`(${num(cs[1])})`:num(cs[1])}² − 4 × ${m1AfP(cs[0])} × ${m1AfP(cs[2])} = ${num(D)}, √Δ = ${num(Math.sqrt(D))}. x = (${num(-cs[1])} ± ${num(Math.sqrt(D))}) ÷ ${m1AfP(2*a)}, soit x₁ = ${m1EqQ(Math.round(lo*a),a)} et x₂ = ${m1EqQ(Math.round(hi*a),a)}.`,
    hint:'Calcule Δ = b² − 4ac, puis x = (−b ± √Δ) ÷ (2a).',diag:([u,v])=>(near(u,-hi)&&near(v,-lo))?'roots-sign':(near(u,2*lo)&&near(v,2*hi))||(near(u,2*hi)&&near(v,2*lo))?'m1sd-2a':null})};
/* 6. Racine double sur la droite graduée */
const gM1SdDouble=()=>{const half=Math.random()<.5,s=half?pick([-7,-5,-3,-1,1,3,5,7]):nz(-4,4),sg=pick([1,-1]),r=half?s/2:s,a=sg*(half?4:1),cs=[a,-2*a*r,a*r*r];
  return pointQ({instr:'Calcule Δ et résous l’équation, puis place sa solution sur la droite graduée.',prompt:M(m1SdF(cs))+' = 0',nom:'x₀',x:[-5,5],y:[-1.3,1.3],snap:.5,tol:.2,cible:[r,0],fond:{ligne:true,pas:.5,etiq:1},
    explain:`Δ = ${cs[1]<0?`(${num(cs[1])})`:num(cs[1])}² − 4 × ${m1AfP(a)} × ${m1AfP(cs[2])} = 0 : une seule solution, x₀ = −b ÷ (2a) = ${num(-cs[1])} ÷ ${m1AfP(2*a)} = ${num(r)}. D’ailleurs ${M(m1SdF(cs))} = ${a===1?'':a===-1?MINUS:num(a)}(x ${r<0?'+':MINUS} ${num(Math.abs(r))})².`,
    hint:'Si Δ = 0, la solution unique est −b ÷ (2a).',diag:pt=>r!==0&&Math.abs(pt[0]+r)<.1?'signe':Math.abs(pt[0]-2*r)<.1?'m1sd-2a':null})};
/* 7. Signe du trinôme : lire l'ensemble des solutions */
const gM1SdSigne=()=>{const a=pick([1,-1,2,-1,.5]);let r1,r2;do{r1=R(-4,3);r2=R(-3,4)}while(r2-r1<2||Math.abs(a)*(r2-r1)**2/4>6);
  const cs=[a,-a*(r1+r2),a*r1*r2],rel=pick(['>','<','≥','≤']),pos=rel==='>'||rel==='≥',strict=rel==='>'||rel==='<',ext=(a>0)===pos;
  const I=st=>st?`]${num(r1)} ; ${num(r2)}[`:`[${num(r1)} ; ${num(r2)}]`,E=st=>st?`]−∞ ; ${num(r1)}[ ∪ ]${num(r2)} ; +∞[`:`]−∞ ; ${num(r1)}] ∪ [${num(r2)} ; +∞[`;
  const ok=ext?E(strict):I(strict);
  return mcq('Résous l’inéquation à l’aide de la courbe.',M(m1SdF(cs))+` ${m1EqRel(rel)} 0`+FIG.plot({x:[-6,6],y:[-6,6],f:[`${a}*(x-(${r1}))*(x-(${r2}))`],pts:[[r1,0,''],[r2,0,'']],pas:1}),
    [I(true),I(false),E(true),E(false)].map(h=>({h:mx('S = '+h),ok:h===ok,tag:(h===I(true)||h===I(false))===!ext?'bracket':'m1sd-signe'})),
    `Les racines sont ${num(r1)} et ${num(r2)} (points de contact avec l’axe). a = ${num(a)} ${a>0?'&gt; 0 : cuvette, positive à l’extérieur des racines et négative entre':'&lt; 0 : dôme, positif entre les racines et négatif à l’extérieur'}. On veut ${pos?'positif':'négatif'}${strict?' strictement (racines exclues)':' ou nul (racines incluses)'} : S = ${ok}.`,
    'Regarde où la courbe est au-dessus (positif) ou au-dessous (négatif) de l’axe. Racines incluses si l’inégalité est large.')};
/* 8. Factoriser à l'aide du graphique */
const gM1SdFact=()=>{const a=pick([1,-1,2,-2,.5]);let r1,r2;do{r1=R(-4,3);r2=R(-3,4)}while(r2-r1<2||Math.abs(a)*(r2-r1)**2/4>6||Math.abs(a*r1*r2)>8||r1*r2===0);const cs=[a,-a*(r1+r2),a*r1*r2];
  return nq({instr:'Écris le trinôme sous la forme a(x − x₁)(x − x₂), avec x₁ &lt; x₂ : donne a, x₁ et x₂.',prompt:'<span class="m"><i>f</i>(<i>x</i>) = </span>'+M(m1SdF(cs))+FIG.plot({x:[-6,6],y:[-6,6],f:[`${a}*(x-(${r1}))*(x-(${r2}))`],pas:1}),labels:['a =','x₁ =','x₂ ='],t:[a,r1,r2],
    explain:`Les racines se lisent sur le graphique : ${num(r1)} et ${num(r2)} (contrôle : f(${num(r1)}) = 0). Le coefficient a est celui de x² : ${num(a)}. Donc f(x) = ${a===1?'':a===-1?MINUS:num(a)}(x ${r1<0?'+':MINUS} ${num(Math.abs(r1))})(x ${r2<0?'+':MINUS} ${num(Math.abs(r2))}). Contrôle : somme ${num(r1+r2)} = −b/a et produit ${num(r1*r2)} = c/a.`,
    hint:'Les racines sont les abscisses des points où la courbe coupe l’axe. a est le coefficient de x² dans la forme développée.',diag:([u,v,w])=>near(v,-r2)&&near(w,-r1)?'roots-sign':null})};
/* 9. Trouver la seconde racine (Viète) */
const gM1SdViete=()=>{const a=pick([1,1,2,-1]);let r1,r2;do{r1=nz(-6,6);r2=nz(-6,6)}while(r1===r2);const cs=[a,-a*(r1+r2),a*r1*r2];
  return nq({instr:`${num(r1)} est solution de l’équation. Trouve l’autre solution sans calculer Δ.`,prompt:M(m1SdF(cs))+' = 0',labels:['x₂ ='],t:[r2],
    explain:`Le produit des racines vaut c/a = ${num(cs[2])} ÷ ${m1AfP(a)} = ${num(r1*r2)}, donc x₂ = ${num(r1*r2)} ÷ ${m1AfP(r1)} = ${num(r2)}. Contrôle avec la somme : ${num(r1)} + ${m1AfP(r2)} = ${num(r1+r2)} = −b/a.`,
    hint:'x₁ × x₂ = c/a (ou x₁ + x₂ = −b/a).',diag:([v])=>near(v,-r2)?'signe':near(v,cs[2]/r1)&&a!==1?'m1sd-2a':null})};
/* 10. Cas particuliers b = 0 ou c = 0 */
const gM1SdCas=()=>{const t=R(0,2);let pr,f,o,ex;
  if(t===0){const k=pick([2,3,5,6,7,10]);pr=`x^2-${k}`;f=`x^2-${k}`;o=[[`S = {−√${k} ; √${k}}`,1],[`S = {√${k}}`,0,'m1sd-oubli'],[`S = {−${k} ; ${k}}`],['S = ∅']];ex=`x² = ${k}, et deux nombres opposés ont pour carré ${k} : x = −√${k} ou x = √${k}.`}
  else if(t===1){const k=nz(-4,4);pr=`x^2${k<0?'+':'-'}${Math.abs(k)}x`;f=pr;o=[[`S = {0 ; ${num(k)}}`,1],[`S = {${num(k)}}`,0,'m1sd-oubli'],[`S = {0 ; ${num(-k)}}`,0,'signe'],['S = {0}']];ex=`On factorise par x : x(x ${k<0?'+':MINUS} ${num(Math.abs(k))}) = 0. Un produit est nul si l’un des facteurs est nul : x = 0 ou x = ${num(k)}. Diviser par x aurait fait perdre la solution 0.`}
  else{const k=pick([1,2,3,4]);pr=`x^2+${k*k}`;f=pr;o=[['S = ∅',1],[`S = {−${k} ; ${k}}`],[`S = {${k}}`],['S = ℝ']];ex=`x² = −${k*k} : un carré n’est jamais négatif, il n’y a aucune solution réelle. La parabole est entièrement au-dessus de l’axe.`}
  return mcq('Résous l’équation (sans discriminant).',M(pr)+' = 0'+FIG.plot({x:[-5,5],y:[-6,8],f:[f],pas:1,pasy:2}),o.map(([h,ok,tag])=>({h:mx(h),ok:!!ok,tag})),ex,
    t===1?'Factorise par x.':'Isole x² : combien de nombres ont ce carré ?')};
/* 11. Raisonner : discriminant et racines (ancien parcours) */
const gM1SdR1=()=>gQuadR();
/* 12. Raisonner : inéquation du second degré (l'erreur se propage) */
const gM1SdR2=()=>{const a=pick([1,-1,2,-2]);let r1,r2;do{r1=R(-5,4);r2=R(-4,5)}while(r2<=r1||r1+r2===0);
  const cs=[a,-a*(r1+r2),a*r1*r2],rel=pick(['>','<','≥','≤']),pos=rel==='>'||rel==='≥',strict=rel==='>'||rel==='<',D=cs[1]**2-4*a*cs[2];
  const SET=(u,v,z,st)=>z==='tout'?'ℝ':z==='int'?(st?`]${num(u)} ; ${num(v)}[`:`[${num(u)} ; ${num(v)}]`):(st?`]−∞ ; ${num(u)}[ ∪ ]${num(v)} ; +∞[`:`]−∞ ; ${num(u)}] ∪ [${num(v)} ; +∞[`);
  return chain({instr:'Résous l’inéquation en construisant ton raisonnement.',prompt:M(m1SdF(cs))+` ${m1EqRel(rel)} 0`,
    steps:[
      {q:`Δ = ${num(D)}. Les racines du trinôme sont…`,o:[
        {h:mx(`x₁ = ${num(r1)} et x₂ = ${num(r2)}`),ok:true,u:r1,v:r2},
        {h:mx(`x₁ = ${num(-r2)} et x₂ = ${num(-r1)}`),u:-r2,v:-r1,why:'La formule commence par −b : attention au signe de b.',tag:'roots-sign'},
        {h:'il n’y a pas de racine réelle',u:null,why:`Δ = ${num(D)} &gt; 0 : il y a deux racines.`,tag:'delta-sign'}]},
      {q:`a = ${num(a)}, donc le trinôme est…`,o:[
        {h:'positif à l’extérieur des racines, négatif entre elles',ok:a>0,p:'ext',why:a<0?'a est négatif : c’est un dôme, positif entre les racines.':''},
        {h:'négatif à l’extérieur des racines, positif entre elles',ok:a<0,p:'int',why:a>0?'a est positif : c’est une cuvette, négative entre les racines.':''},
        {h:`${a>0?'positif':'négatif'} partout, comme a`,p:'tout',why:'Le trinôme garde le signe de a partout seulement s’il n’a pas de racine (Δ < 0).',tag:'m1sd-signe'}].map(o=>o.ok?o:{...o,tag:o.tag||'m1sd-signe'})},
      {q:`On cherche où il est ${pos?'positif':'négatif'}${strict?' (strictement)':' ou nul'} : …`,o:prev=>{const p=prev[1].p,want=p==='tout'?(pos===(a>0)?'tout':'rien'):((p==='ext')===pos?'ext':'int');
        if(prev[0].u===null)return[{h:'Partout, ou nulle part, selon le signe de a',ok:true,z:pos===(a>0)?'tout':'rien'},{h:'entre les racines',z:'int',why:'Sans racine, il n’y a pas de « entre les racines ».'}];
        return[{h:'entre les racines',ok:want==='int',z:'int',why:'Regarde ta réponse précédente : le signe voulu est à l’extérieur.',tag:'m1sd-signe'},
          {h:'à l’extérieur des racines',ok:want==='ext',z:'ext',why:'Regarde ta réponse précédente : le signe voulu est entre les racines.',tag:'m1sd-signe'},
          {h:want==='rien'?'nulle part':'partout',ok:want==='tout'||want==='rien',z:want==='rien'?'rien':'tout',why:'Le trinôme change de signe en ses racines : il ne peut pas avoir le même signe partout.',tag:'m1sd-signe'}]}},
      {q:'Donc l’ensemble des solutions est…',o:prev=>{const{u,v}=prev[0],z=prev[2].z;
        if(z==='tout'||z==='rien')return[{h:mx(z==='tout'?'S = ℝ':'S = ∅'),ok:true},{h:mx(z==='tout'?'S = ∅':'S = ℝ'),why:'Relis le signe voulu.',tag:'m1sd-signe'}];
        if(u===null)return[{h:mx('S = ℝ'),ok:true},{h:mx('S = ∅'),why:'Relis le signe voulu.'}];
        const other=z==='int'?'ext':'int';return[
          {h:mx('S = '+SET(u,v,z,strict)),ok:true},
          {h:mx('S = '+SET(u,v,z,!strict)),why:strict?'Inégalité stricte : les racines (où le trinôme vaut 0) sont exclues, crochets ouverts.':'Inégalité large : les racines (où le trinôme vaut 0) sont solutions, crochets fermés.',tag:'bracket'},
          {h:mx('S = '+SET(u,v,other,strict)),why:'Ce n’est pas la zone choisie à l’étape précédente.',tag:'m1sd-signe'}]}}],
    explain:`Δ = ${num(D)}, racines ${num(r1)} et ${num(r2)}. a = ${num(a)} ${a>0?'&gt; 0 : positif à l’extérieur des racines, négatif entre':'&lt; 0 : négatif à l’extérieur des racines, positif entre'}. On veut ${pos?'positif':'négatif'} : ${mx('S = '+SET(r1,r2,(a>0)===pos?'ext':'int',strict))}.`})};
ANA_UNITS.push({id:'m1-second-degre',tr:'m1',name:'Second degré',sub:'Parabole, discriminant, signe du trinôme',glyph:'x²',tone:'x',
  skills:[SKA('m1.sd.coef','Repérer a, b, c',gM1SdCoef,1),SKA('m1.sd.delta','Calculer le discriminant',gM1SdDelta,1),SKA('m1.sd.nb','Lire le signe de Δ',gM1SdNb,1),
    SKA('m1.sd.cas','Sans discriminant',gM1SdCas,1),SKA('m1.sd.sommet','Placer le sommet',gM1SdSommet,2),SKA('m1.sd.rac','Calculer les racines',gM1SdRac,2),
    SKA('m1.sd.double','Racine double',gM1SdDouble,2),SKA('m1.sd.signe','Inéquation par le graphique',gM1SdSigne,2),SKA('m1.sd.r1','Raisonner : résoudre',gM1SdR1,2),
    SKA('m1.sd.fact','Factoriser',gM1SdFact,3),SKA('m1.sd.viete','Somme et produit des racines',gM1SdViete,3),SKA('m1.sd.r2','Raisonner : une inéquation',gM1SdR2,3)]});
