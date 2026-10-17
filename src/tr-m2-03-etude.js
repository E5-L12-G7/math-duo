/* ===================== MVA912 · Étude complète d'une fonction ===================== */
Object.assign(ANA_ERR,{
  'm2-et-asy':{label:'Asymptote mal identifiée',tip:'Verticale : là où le dénominateur s’annule (et pas le numérateur). Horizontale : la limite en ±∞, quotient des termes de plus haut degré.'},
  'm2-et-trou':{label:'Trou pris pour une asymptote',tip:'Si le numérateur s’annule aussi en la valeur interdite, factorise : la limite peut être finie, on prolonge par continuité.'},
  'm2-et-interv':{label:'Variations à travers une valeur interdite',tip:'Le lien entre signe de f ′ et variations ne vaut que sur un intervalle : on conclut sur chaque intervalle séparément.'}});
/** (x − k) écrit proprement */
const m2Xk=k=>k===0?'x':`x ${k<0?'+':'−'} ${Math.abs(k)}`;
/* 1. Domaine de définition */
const gM2EtDom=()=>{const a=R(-5,5),t=R(0,3),A=num(a);
  const C=[[`1/(x${sg(-a)})`.replace('x+0','x').replace('x-0','x'),`ℝ \\ {${A}}`,[`ℝ \\ {${num(-a)}}`,`]${A} ; +∞[`,'ℝ'],`Le dénominateur s’annule pour x = ${A} : seule cette valeur est interdite.`],
    [`sqrt(x${sg(-a)})`,`[${A} ; +∞[`,[`]${A} ; +∞[`,`]−∞ ; ${A}]`,`ℝ \\ {${A}}`],`Il faut x ${a<0?'+':'−'} ${Math.abs(a)} ≥ 0, soit x ≥ ${A} : la racine de 0 existe, la borne est incluse.`],
    [`ln(x${sg(-a)})`,`]${A} ; +∞[`,[`[${A} ; +∞[`,`]−∞ ; ${A}[`,`ℝ \\ {${A}}`],`Il faut x ${a<0?'+':'−'} ${Math.abs(a)} > 0, strictement : ln 0 n’existe pas, la borne est exclue.`],
    [`sqrt(${a}-x)`,`]−∞ ; ${A}]`,[`[${A} ; +∞[`,`]−∞ ; ${A}[`,`ℝ \\ {${A}}`],`Il faut ${A} − x ≥ 0, soit x ≤ ${A}.`]][t];
  const src=C[0].replace(/x\+0|x-0/,'x');
  return mcq('Quel est le domaine de définition de f ?',`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(src),[{h:C[1],ok:true},...C[2].map(h=>({h,tag:'domaine'}))],C[3],
    'Repère l’interdit : division par 0, racine d’un négatif, logarithme d’un nombre négatif ou nul.')};
/* 2. Lire les asymptotes sur une courbe */
const gM2EtLire=()=>{const p=nz(-3,3),c=nz(-3,3),r=pick([2,3,4,-2,-3,-4]),f=`${p}+(${r})/(x${sg(-c)})`;
  return nq({instr:'Lis sur la courbe les équations des deux asymptotes.',prompt:FIG.plot({x:[-6,6],y:[-7,7],f:[f]})+stx('Asymptote verticale x = …, asymptote horizontale y = …'),
    labels:['x =','y ='],t:[c,p],explain:`La courbe s’envole près de x = ${num(c)} (asymptote verticale) et s’aplatit vers y = ${num(p)} quand x devient grand (asymptote horizontale).`,
    hint:'Verticale : la valeur de x près de laquelle la courbe file vers l’infini. Horizontale : la hauteur dont elle s’approche tout à gauche et tout à droite.',
    diag:([u,v])=>near(u,p,1e-6)&&near(v,c,1e-6)?'m2-et-asy':null})};
/* 3. Asymptotes d'une fonction homographique */
const gM2EtAsy=()=>{let a,b,c,d;do{a=nz(-6,6);b=R(-6,6);c=pick([1,2,3,-1,-2]);d=nz(-6,6)}while(a*d-b*c===0);const V=new Fr(-d,c),H=new Fr(a,c);
  return nq({instr:'Donne les équations des asymptotes verticale et horizontale.',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`(${poly([a,b])})/(${poly([c,d])})`),
    labels:['Verticale : x =','Horizontale : y ='],t:[V.val(),H.val()],
    explain:`Le dénominateur s’annule en x = ${m2F(V)} (et pas le numérateur) : asymptote verticale x = ${m2F(V)}. En ±∞, f(x) ≈ ${M(poly([a,0]))} / (${M(poly([c,0]))}) = ${m2F(H)} : asymptote horizontale y = ${m2F(H)}.`,
    hint:'Verticale : résous dénominateur = 0. Horizontale : quotient des coefficients de x.',
    diag:([u,v])=>near(u,-V.val(),1e-6)?'signe':near(v,b/(d||1),1e-6)?'m2-et-asy':null})};
/* 4. Limite à droite ou à gauche d'une valeur interdite */
const gM2EtLim=()=>{const a=nz(-4,4),c=R(-4,4);let b;do{b=R(-6,6)}while(a*c+b===0);const r=a*c+b,side=pick([1,-1]),inf=r*side>0;
  return mcq(`Quelle est la limite de f quand x tend vers ${num(c)} par ${side>0?'la droite (x > '+num(c)+')':'la gauche (x < '+num(c)+')'} ?`,`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`(${poly([a,b])})/(${m2Xk(c).replace('−','-')})`),
    [{h:'+∞',ok:inf},{h:'−∞',ok:!inf,tag:'signe'},{h:num(a),tag:'m2-et-asy'},{h:'0'}],
    `En x = ${num(c)}, le numérateur vaut ${num(r)} ≠ 0 et le dénominateur ${m2Xk(c)} est un petit nombre ${side>0?'positif':'négatif'}. ${num(r)} divisé par un petit ${side>0?'positif':'négatif'} : ${inf?'+∞':'−∞'}.`,
    'Calcule le signe du numérateur en ce point, puis le signe du petit dénominateur de ce côté.')};
/* 5. Trou ou asymptote ? */
const gM2EtTrou=()=>{const r=nz(-4,4);let s;do{s=nz(-4,4)}while(s===r);const hole=Math.random()<.5;let t=r;if(!hole)do{t=nz(-4,4)}while(t===r||t===s);
  const N=poly([1,-(r+s),r*s]);
  return mcq(`Que se passe-t-il pour la courbe en x = ${num(t)} ?`,`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`(${N})/(${m2Xk(t).replace('−','-')})`),
    [{h:'Une asymptote verticale',ok:!hole,tag:'m2-et-trou'},{h:'Un trou que l’on peut boucher (prolongement par continuité)',ok:hole,tag:'m2-et-trou'},{h:`Rien de spécial : f est définie en ${num(t)}`,tag:'domaine'}],
    hole?`Le numérateur s’annule aussi en ${num(t)} : ${M(N)} = (${m2Xk(r)})(${m2Xk(s)}). Hors de ${num(t)}, f(x) = ${m2Xk(s)} → ${num(r-s)}. C’est un trou, qu’on bouche en posant f(${num(t)}) = ${num(r-s)}.`
      :`En x = ${num(t)}, le numérateur vaut ${num(t*t-(r+s)*t+r*s)} ≠ 0 et le dénominateur s’annule : f tend vers l’infini, asymptote verticale x = ${num(t)}.`,
    'Calcule le numérateur en cette valeur : nul ou pas ?',true)};
/* 6. Valeur du prolongement par continuité */
const gM2EtProl=()=>{const r=nz(-5,5);let s;do{s=R(-5,5)}while(s===r);const k=pick([1,1,2,-1]);
  return nq({instr:`Quelle valeur faut-il donner à f(${num(r)}) pour prolonger f par continuité ?`,prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(`(${poly([k,-k*(r+s),k*r*s])})/(${m2Xk(r).replace('−','-')})`),
    labels:[`f(${num(r)}) =`],t:[k*(r-s)],explain:`Le numérateur s’annule en ${num(r)} : il se factorise en ${k===1?'':k===-1?MINUS:k}(${m2Xk(r)})(${m2Xk(s)}). Hors de ${num(r)}, f(x) = ${k===1?'':k===-1?MINUS:k}(${m2Xk(s)}), qui tend vers ${num(k*(r-s))}. On pose f(${num(r)}) = ${num(k*(r-s))}.`,
    hint:`Factorise le numérateur par (${m2Xk(r)}), simplifie, puis remplace x par ${num(r)}.`,diag:([v])=>near(v,k*(r+s),1e-6)||near(v,k*(s-r),1e-6)?'signe':null})};
/* 7. Placer le point qui bouche le trou */
const gM2EtPt=()=>{let r,s;do{r=nz(-4,4);s=R(-4,4)}while(s===r||Math.abs(r-s)>5);const N=poly([1,-(r+s),r*s]),f=`(${N})/(${m2Xk(r).replace('−','-')})`;
  return pointQ({instr:'La courbe de f a un trou. Place le point qui le bouche (prolongement par continuité).',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(f),
    x:[-5,5],y:[-6,6],snap:1,tol:.4,cible:[r,r-s],nom:'P',fond:{f:[f]},
    explain:`f n’est pas définie en ${num(r)}, mais ${M(N)} = (${m2Xk(r)})(${m2Xk(s)}), donc f(x) = ${m2Xk(s)} pour x ≠ ${num(r)}. Le trou est en (${num(r)} ; ${num(r-s)}).`,
    hint:'Trouve la valeur interdite (dénominateur nul), puis la limite de f en cette valeur.'})};
/* 8. Asymptote oblique */
const gM2EtObl=()=>{const a=pick([1,1,2,-1]),d=nz(-3,3),b=R(-4,4);let c;do{c=R(-6,6)}while(Math.abs(a*d*d+b*d+c)<2);const p=b+a*d,rest=a*d*d+b*d+c;
  const f=`(${poly([a,b,c])})/(${m2Xk(d).replace('−','-')})`;
  return nq({instr:'Donne l’asymptote oblique y = mx + p.',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(f)+FIG.plot({x:[-8,8],y:[-12,12],pas:2,f:[f]}),labels:['m =','p ='],t:[a,p],
    explain:`Division : ${M(poly([a,b,c]))} = (${m2Xk(d)})(${M(poly([a,p]))}) ${rest<0?'−':'+'} ${Math.abs(rest)}. Donc f(x) = ${M(poly([a,p]))} + ${num(rest)}/(${m2Xk(d)}), et le dernier terme tend vers 0 : asymptote y = ${M(poly([a,p]))}.`,
    hint:'Divise le numérateur par le dénominateur : f(x) = mx + p + reste/(x − d).',diag:([u,v])=>near(u,a,1e-6)&&near(v,b,1e-6)?'m2-et-asy':null})};
/* 9. Variations d'une fonction homographique (sur chaque intervalle) */
const gM2EtVar=()=>{const a=nz(-2,2),c=nz(-3,3),r=pick([2,3,4,-2,-3,-4]),b=r-a*c,f=`(${poly([a,b])})/(${m2Xk(c).replace('−','-')})`,dec_=r>0;
  const I=`]−∞ ; ${num(c)}[ et sur ]${num(c)} ; +∞[`,W=dec_?'décroissante':'croissante',O=dec_?'croissante':'décroissante';
  return mcq('Quel est le sens de variation de f ?',`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(f)+FIG.plot({x:[-6,6],y:[-7,7],f:[f]}),
    [{h:`f est ${W} sur ${I}`,ok:true},{h:`f est ${W} sur ℝ \\ {${num(c)}}`,tag:'m2-et-interv'},{h:`f est ${O} sur ${I}`,tag:'signe'},{h:`f est ${O} puis ${W}`,tag:'m2-va-sens'}],
    `f ′(x) = ${num(-r)}/(${m2Xk(c)})², ${dec_?'négative':'positive'} partout où elle existe. f est ${W} sur chacun des deux intervalles. On ne dit pas « sur ℝ \\ {${num(c)}} » : ce n’est pas un intervalle, et la courbe le montre (un morceau est entièrement au-dessus de l’autre).`,
    'Calcule f ′ avec (u/v)′ = (u′v − uv′)/v², puis regarde son signe.')};
/* 10. Continuité et dérivabilité */
const gM2EtDer=()=>{const a=R(-3,3),b=R(-2,2),ab=Math.random()<.6,f=ab?`abs(x${sg(-a)})${sg(b)}`:`(x${sg(-a)})^2${sg(b)}`;
  return mcq(`Que peut-on dire de f en x = ${num(a)} ?`,`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(f.replace(/x\+0|x-0/,'x').replace(/\+0$|-0$/,''))+FIG.plot({x:[-5,5],y:[-3,6],f:[f]}),
    [{h:'f est continue et dérivable en '+num(a),ok:!ab},{h:'f est continue mais pas dérivable en '+num(a),ok:ab},{h:'f n’est pas continue en '+num(a)},{h:'f est dérivable mais pas continue en '+num(a)}],
    ab?`La courbe ne fait pas de saut en ${num(a)} : f est continue. Mais elle y fait un coin : pente −1 à gauche, 1 à droite. Pas de tangente : f n’est pas dérivable en ${num(a)}.`
      :`La courbe est lisse en ${num(a)} : f ′(x) = 2(${m2Xk(a)}) existe et vaut 0 en ${num(a)} (tangente horizontale). Dérivable, donc continue.`,
    'Continue : pas de saut ni de trou. Dérivable : pas de coin, une seule tangente. Et une fonction dérivable est toujours continue.')};
/* 11. Raisonner : étude complète d'une homographique */
const gM2EtR1=()=>{const a=nz(-3,3),c=nz(-4,4);let b;do{b=nz(-6,6)}while(a*c+b===0||b%a===0&&-b/a===c);const N=-(a*c+b),f=`(${poly([a,b])})/(${m2Xk(c).replace('−','-')})`;
  const dir=(n,cc)=>[{h:`f décroissante sur ]−∞ ; ${num(cc)}[ et sur ]${num(cc)} ; +∞[`,ok:n<0,why:'Le numérateur de f ′ est positif : f croît sur chaque intervalle.',tag:'signe'},
    {h:`f croissante sur ]−∞ ; ${num(cc)}[ et sur ]${num(cc)} ; +∞[`,ok:n>0,why:'Le numérateur de f ′ est négatif : f décroît sur chaque intervalle.',tag:'signe'},
    {h:`f ${n<0?'décroissante':'croissante'} sur ℝ \\ {${num(cc)}}`,why:'ℝ privé d’un point n’est pas un intervalle : on conclut sur chaque intervalle séparément.',tag:'m2-et-interv'}];
  return chain({instr:'Étudie f en construisant ton raisonnement.',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(f),
    steps:[
      {q:'Le domaine de définition est…',o:m2Uniq([{h:`ℝ \\ {${num(c)}}`,ok:true,c},{h:`ℝ \\ {${num(-c)}}`,c:-c,why:`x ${c<0?'+':'−'} ${Math.abs(c)} = 0 pour x = ${num(c)}.`,tag:'signe'},
        {h:`ℝ \\ {${m2F(new Fr(-b,a))}}`,c:-b/a,why:'C’est là que le numérateur s’annule : ce n’est pas interdit.',tag:'domaine'}])},
      {q:'En ±∞, la courbe a pour asymptote…',o:m2Uniq([{h:`y = ${num(a)}`,ok:true},{h:`y = ${m2F(new Fr(b,-c))}`,why:'À l’infini, seuls les termes en x comptent : ax/x = a.',tag:'m2-et-asy'},{h:'aucune droite horizontale',why:'Même degré en haut et en bas : la limite est finie.',tag:'m2-et-asy'}])},
      {q:'La dérivée est…',o:[{h:`${M(`${N}/(${m2Xk(c).replace('−','-')})^2`)}`,ok:true,k:'ok'},
        {h:M(`(${poly([2*a,b-a*c])})/(${m2Xk(c).replace('−','-')})^2`),k:'q',why:'La formule est (u′v − uv′)/v² : on soustrait uv′, on ne l’ajoute pas.',tag:'derivee'},
        {h:num(a),k:'t',why:'La dérivée d’un quotient n’est pas le quotient des dérivées.',tag:'derivee'}]},
      {q:'Conclusion :',o:prev=>{const cc=Number.isInteger(prev[0].c)?prev[0].c:c,k=prev[2].k;
        if(k==='ok')return dir(N,cc);
        if(k==='t')return[{h:`f ${a>0?'croissante':'décroissante'} sur ℝ`,ok:true},...dir(N,cc).slice(0,2).map(o=>({...o,ok:false,why:'Ce n’est pas ce que donne ta dérivée.'}))];
        const z=new Fr(a*c-b,2*a);return[{h:`f change de sens de variation en x = ${m2F(z)}`,ok:true},...dir(N,cc).slice(0,2).map(o=>({...o,ok:false,why:'Ta dérivée change de signe : elle ne donne pas ce résultat.'}))]}}],
    explain:`D = ℝ \\ {${num(c)}} ; asymptotes x = ${num(c)} et y = ${num(a)}. f ′(x) = ${num(N)}/(${m2Xk(c)})², ${N<0?'négative':'positive'} : f est ${N<0?'décroissante':'croissante'} sur ]−∞ ; ${num(c)}[ et sur ]${num(c)} ; +∞[.`})};
/* 12. Raisonner : prolonger par continuité */
const gM2EtR2=()=>{let r,s;do{r=nz(-5,5);s=nz(-5,5)}while(Math.abs(r)===Math.abs(s));const N=poly([1,-(r+s),r*s]),Nm=2*r*r+2*r*s,f=`(${N})/(${m2Xk(r).replace('−','-')})`;
  return chain({instr:'Prolonge f par continuité, en construisant ton raisonnement.',prompt:`<span class="m"><i>f</i>(<i>x</i>) = </span>`+M(f)+stx(` n’est pas définie en ${num(r)}.`),
    steps:[
      {q:`En x = ${num(r)}, le numérateur vaut…`,o:[{h:`0, donc il se factorise par (${m2Xk(r)})`,ok:true,k:'t'},{h:`${num(Nm)}, donc asymptote verticale`,k:'a',why:`Tu as remplacé x par ${num(-r)} au lieu de ${num(r)}.`,tag:'calc'},
        {h:'on ne peut pas le calculer, car f n’existe pas en '+num(r),k:'n',why:'Le numérateur, lui, est défini partout : on peut le calculer.',tag:'m2-et-trou'}]},
      {q:'La factorisation du numérateur est…',o:prev=>prev[0].k!=='t'?[{h:'Pas de factorisation utile',ok:true,L:null},{h:`(${m2Xk(r)})(${m2Xk(s)})`,L:r-s,why:'Ton étape précédente ne permettait pas de factoriser.'}]:[
        {h:`(${m2Xk(r)})(${m2Xk(s)})`,ok:true,L:r-s},{h:`(${m2Xk(r)})(${m2Xk(-s)})`,L:r+s,why:'Développe pour vérifier : le terme en x ne correspond pas.',tag:'signe'},{h:`(${m2Xk(r)})(${s} − x)`,L:s-r,why:'Développe pour vérifier : le terme en x² aurait le signe moins.',tag:'signe'}]},
      {q:`Quand x tend vers ${num(r)}, f(x) tend vers…`,o:prev=>{const L=prev[1].L;if(L===null)return[{h:'l’infini',ok:true,L:null},{h:num(r-s),L:r-s,why:'Sans factorisation, on ne peut pas simplifier.'}];
        return m2Uniq([{h:num(L),ok:true,L},{h:'l’infini',L:null,why:'Après simplification par le facteur commun, il n’y a plus de division par 0.',tag:'m2-et-trou'},{h:num(L+2*s),L:L+2*s,why:'Remplace x par la valeur interdite dans la forme simplifiée.',tag:'calc'}])}},
      {q:'Conclusion :',o:prev=>{const L=prev[2].L;if(L===null)return[{h:`Asymptote verticale x = ${num(r)} : pas de prolongement`,ok:true},{h:`On pose f(${num(r)}) = 0`,why:'Un prolongement exige une limite finie.'}];
        return m2Uniq([{h:`On pose f(${num(r)}) = ${num(L)}`,ok:true},{h:`On pose f(${num(r)}) = 0`,why:'On donne à f la valeur de sa limite, pas 0.',tag:'m2-et-trou'},{h:'f ne peut pas être prolongée',why:'La limite est finie : le prolongement existe.',tag:'m2-et-trou'}])}}],
    explain:`Le numérateur s’annule en ${num(r)} : ${M(N)} = (${m2Xk(r)})(${m2Xk(s)}). Donc f(x) = ${m2Xk(s)} pour x ≠ ${num(r)}, qui tend vers ${num(r-s)}. On pose f(${num(r)}) = ${num(r-s)}.`})};
ANA_UNITS.push({id:'m2-etude',tr:'m2',name:'Étude complète',sub:'Domaine, asymptotes, prolongement, tracé',glyph:'⟂',tone:'c',
  skills:[SKA('m2.et.dom','Domaine de définition',gM2EtDom,1),SKA('m2.et.lire','Lire des asymptotes',gM2EtLire,1),SKA('m2.et.asy','Calculer les asymptotes',gM2EtAsy,2),
    SKA('m2.et.lim','Limite près d’une valeur interdite',gM2EtLim,2),SKA('m2.et.trou','Trou ou asymptote ?',gM2EtTrou,2),SKA('m2.et.prol','Prolonger par continuité',gM2EtProl,2),
    SKA('m2.et.pt','Boucher le trou sur la courbe',gM2EtPt,2),SKA('m2.et.var','Variations sur chaque intervalle',gM2EtVar,2),SKA('m2.et.der','Continue ou dérivable ?',gM2EtDer,2),
    SKA('m2.et.obl','Asymptote oblique',gM2EtObl,3),SKA('m2.et.r1','Raisonner : étude complète',gM2EtR1,3),SKA('m2.et.r2','Raisonner : un prolongement',gM2EtR2,3)]});
