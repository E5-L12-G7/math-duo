/* ===================== Parcours Statistiques et probabilités — partie 1 =====================
   Proportionnalité, pourcentages, statistiques à une et deux variables (chapitres sp-prop, sp-pourc, sp-stat1, sp-stat2).
   Préfixes : gSp1… (générateurs), SP1_… / sp1… (outils), étiquettes d'erreur 'sp1-…'. */
Object.assign(ANA_ERR,{
  'sp1-prop':{label:'Proportionnalité à vérifier',tip:'Toutes les colonnes doivent donner le même quotient bas ÷ haut ; une seule exception suffit pour dire non. Deux grandeurs qui augmentent ensemble ne sont pas forcément proportionnelles.'},
  'sp1-croix':{label:'Produit en croix',tip:'On multiplie les deux nombres de la diagonale qui ne contient pas l’inconnue, puis on divise par le troisième.'},
  'sp1-duree':{label:'Conversion de durée',tip:'Une heure a 60 minutes : 1 h 45 min = 1 + 45/60 = 1,75 h, et non 1,45 h.'},
  'sp1-unite':{label:'Unités différentes',tip:'Mets les deux longueurs dans la même unité avant de calculer une échelle ou une distance réelle.'},
  'sp1-ratio':{label:'Partage selon un ratio',tip:'Additionne les nombres du ratio pour compter les parts, calcule la valeur d’une part, puis multiplie par chaque nombre du ratio.'},
  'sp1-ref':{label:'Population de référence',tip:'Le dénominateur est l’effectif de la population de référence : celle qui suit « parmi » ou « sur ».'},
  'sp1-coef':{label:'Coefficient multiplicateur',tip:'Hausse de t % : × (1 + t/100). Baisse de t % : × (1 − t/100). Pour revenir en arrière, on divise par le coefficient.'},
  'sp1-succ':{label:'Évolutions successives',tip:'Les pourcentages d’évolution ne s’additionnent pas : on multiplie les coefficients multiplicateurs.'},
  'sp1-recip':{label:'Évolution réciproque',tip:'Le coefficient réciproque est l’inverse 1/CM : une hausse de t % ne s’annule pas par une baisse de t %.'},
  'sp1-taux':{label:'Taux d’évolution',tip:'t = (V<sub>1</sub> − V<sub>0</sub>) ÷ V<sub>0</sub> : on divise toujours par la valeur de départ.'},
  'sp1-lin':{label:'Linéarité de la moyenne',tip:'Si toutes les valeurs deviennent a·x + b, la moyenne devient a·x̄ + b (dans cet ordre).'},
  'sp1-classe':{label:'Centre de classe',tip:'Le centre de [a ; b[ est (a + b) ÷ 2 ; on pondère les centres par les effectifs.'},
  'sp1-extra':{label:'Interpolation ou extrapolation',tip:'Dans le domaine des x observés : interpolation. En dehors : extrapolation, plus risquée.'},
  'sp1-exp':{label:'Retour de z = ln y à y',tip:'Si z = ln y et z = ax + b, alors y = e<sup>ax + b</sup> = e<sup>b</sup> × e<sup>ax</sup>.'}
});

/* ---- outils ---- */
const SP1_eur=v=>dec(v,2)+' €';
const sp1Distinct=(k,a,b)=>{const s=new Set;while(s.size<k)s.add(R(a,b));return sortA([...s])};
/* Réponse en pourcentage : p est la proportion (0,12 pour 12 %). L'élève peut écrire 12, 12 % ou 0,12. */
function sp1Pct(o){const P=o.p*100,d=o.dp??1,tol=.5*10**-d+1e-9;
  const sfx=d===0?' Arrondis à l’unité.':(RND[d]||'');
  const q=numQ(o.instr+sfx,o.prompt,[o.label],([a])=>{const v=ev(a);return Number.isFinite(v)&&(Math.abs(v-P)<=tol||Math.abs(v*100-P)<=tol)},o.explain,o.hint,
    ([a])=>{let v;try{v=ev(a)}catch(e){return null}if(!Number.isFinite(v))return null;
      for(const w of[v,v*100])if(Math.abs(w-P)<=Math.max(10*tol,.11))return'arrondi';
      if(o.diag)for(const w of[v,v*100]){const t=o.diag(w);if(t)return t}return null});
  q.ans=[String(+P.toFixed(d))+'%'];return q}
const SP1_pctStr=v=>(v>0?'+':v<0?MINUS:'')+dec(Math.abs(v),2)+' %';

/* ===================== Chapitre : Proportionnalité et ratios ===================== */
const gSp1Rec=()=>{const k=pick([1.5,2.5,0.8,1.2,3.5,4,6]),xs=sp1Distinct(3,2,12),prop=Math.random()<.5,ys=xs.map(x=>+(k*x).toFixed(2));
  if(!prop)ys[2]=+(ys[2]+pick([0.3,0.5,-0.4,0.8,1])).toFixed(2);
  const qs=xs.map((x,i)=>ys[i]/x);
  return mcq('Ce tableau est-il un tableau de proportionnalité ?',dtab([['Quantité',...xs.map(num)],['Prix (€)',...ys.map(v=>dec(v,2))]]),[
    {h:'Oui : tous les quotients prix ÷ quantité sont égaux',ok:prop,tag:'sp1-prop'},
    {h:'Non : au moins un quotient prix ÷ quantité est différent',ok:!prop,tag:'sp1-prop'},
    {h:'Oui : les deux lignes augmentent en même temps',tag:'sp1-prop'},
    {h:'Oui : il suffit que les deux premières colonnes aient le même quotient',tag:'sp1-prop'}],
    `Quotients : ${qs.map(v=>dec(v,3)).join(' ; ')}. ${prop?`Ils sont tous égaux à ${dec(k,2)} : c’est un tableau de proportionnalité de coefficient ${dec(k,2)}.`:'Ils ne sont pas tous égaux : ce n’est pas un tableau de proportionnalité (une seule colonne qui ne suit pas suffit).'} Que les deux lignes augmentent ensemble ne prouve rien.`,
    'Calcule le quotient bas ÷ haut pour chaque colonne, sans en oublier.',true)};
const gSp1Coef=()=>{const k=pick([1.5,2.5,0.8,1.2,3.5,7,8.25,0.4,12]),xs=sp1Distinct(3,2,10),ys=xs.map(x=>+(k*x).toFixed(2));
  return nq({instr:'Calcule le coefficient de proportionnalité (on multiplie la 1re ligne par ce nombre pour obtenir la 2e).',prompt:dtab([['Durée (h)',...xs.map(num)],['Prix (€)',...ys.map(v=>dec(v,2))]]),labels:['k ='],t:[k],
    explain:`k = ${dec(ys[0],2)} ÷ ${xs[0]} = ${dec(k,2)}, et on vérifie : ${dec(ys[1],2)} ÷ ${xs[1]} = ${dec(k,2)}.`,hint:'Divise un nombre de la 2e ligne par le nombre de la 1re ligne qui est dans la même colonne.',
    diag:([v])=>near(v,1/k,.01)?'rapport':null})};
const SP1_Q4=[['kg de farine',[2.5,4,1.5,5,3]],['kg de pommes',[2,3,5,4]],['m² de carrelage',[2,5,8,4]],['litres de peinture',[2.5,4,5]]];
const gSp1Q4=()=>{const[ctx,as]=pick(SP1_Q4),a=pick(as),u=pick([1.2,2.4,0.8,3.5,1.5,20,2.6]),b=+(a*u).toFixed(2);let c;do c=pick([1.8,6,2,3.5,10,7,1.5,12]);while(c===a);const x=c*u;
  return nq({instr:'Les prix sont proportionnels aux quantités. Calcule le prix demandé (en €).',prompt:stx(`${num(a)} ${ctx} coûtent ${SP1_eur(b)}. Combien coûtent ${num(c)} ${ctx} ?`),labels:['Prix (€) ='],t:[x],dp:2,
    explain:`Tableau : quantités ${num(a)} et ${num(c)} ; prix ${dec(b,2)} et x. Produit en croix : x = ${num(c)} × ${dec(b,2)} ÷ ${num(a)} = ${dec(x,2)} €.`,
    hint:'Produit en croix : multiplie les deux nombres de la diagonale sans x, puis divise par le troisième.',
    diag:([v])=>near(v,a*b/c)||near(v,c*a/b)?'sp1-croix':null})};
const SP1_OBJ=['effaceurs','cahiers','places de cinéma','stylos','tickets de bus'];
const gSp1Unit=()=>{const o=pick(SP1_OBJ),n=R(3,9),u=pick([0.5,1.5,2.5,1.2,0.8,3,7,4.5]),P=+(n*u).toFixed(2);let m;do m=R(2,15);while(m===n);
  return nq({instr:'Le prix est proportionnel au nombre d’objets. Calcule le prix (en €).',prompt:stx(`${n} ${o} identiques coûtent ${SP1_eur(P)}. Combien coûtent ${m} ${o} ?`),labels:['Prix (€) ='],t:[m*u],dp:2,
    explain:`Passage à l’unité : 1 objet coûte ${dec(P,2)} ÷ ${n} = ${dec(u,2)} €, donc ${m} objets coûtent ${m} × ${dec(u,2)} = ${dec(m*u,2)} €.`,
    hint:'Calcule d’abord le prix d’un seul objet.',diag:([v])=>near(v,P*n/m)?'mult-div':null})};
const SP1_RAT=[[2,3],[5,8],[3,4],[2,5],[3,7],[4,5],[1,3],[5,6]];
const gSp1Ratio=()=>{const[p,q]=pick(SP1_RAT),m=R(2,9),b=q*m,N=p*m;
  return nq({instr:'Détermine N.',prompt:stx(`Les nombres N et ${b} sont dans le ratio ${p} : ${q}.`),labels:['N ='],t:[N],
    explain:`Le ratio ${p} : ${q} signifie N/${p} = ${b}/${q}. Or ${b} ÷ ${q} = ${m} (valeur d’une part), donc N = ${p} × ${m} = ${N}.`,
    hint:`N/${b} doit être égal à ${p}/${q}.`,diag:([v])=>near(v,b*q/p,.01)?'sp1-ratio':null})};
const gSp1Share=()=>{const r=pick([[3,4,5],[1,2,3],[2,3,5],[1,3,4],[2,5,7],[3,5,8]]),s=sumA(r),f=R(4,25),T=s*f,sh=r.map(x=>x*f);
  return nq({instr:'Partage la quantité selon le ratio.',prompt:stx(`Julie, Luc et Léa se partagent ${T} noix dans le ratio ${r.join(' : ')}.`),labels:['Julie :','Luc :','Léa :'],t:sh,
    explain:`Nombre de parts : ${r.join(' + ')} = ${s}. Une part vaut ${T} ÷ ${s} = ${f}. Julie : ${r[0]} × ${f} = ${sh[0]}, Luc : ${sh[1]}, Léa : ${sh[2]} (total ${T}).`,
    hint:'Additionne les nombres du ratio pour savoir combien de parts il y a.',diag:([u])=>near(u,T/3,.01)||near(u,T*r[0]/r[2],.01)?'sp1-ratio':null})};
const gSp1Ech=()=>{if(Math.random()<.5){const n=pick([1000,25000,50000,100000,250000]),d=pick([2,3.5,4,6.5,8.3,12,15]),km=d*n/100000;
    return nq({instr:'Calcule la distance réelle (en km).',prompt:stx(`Sur une carte à l’échelle 1/${num(n).replace(/(\d)(?=(\d{3})+$)/g,'$1 ')}, deux villages sont à ${num(d)} cm l’un de l’autre.`),labels:['Distance (km) ='],t:[km],
      explain:`1 cm sur la carte représente ${n} cm en réalité. ${num(d)} × ${n} = ${num(+(d*n).toFixed(1))} cm = ${num(+km.toFixed(4))} km (1 km = 100 000 cm).`,
      hint:'Multiplie par le dénominateur de l’échelle, puis convertis des cm en km.',diag:([v])=>near(v,d*n/100,.01)||near(v,d*n/1000,.01)?'sp1-unite':null})}
  const n=pick([50,100,200,250,500]),L=pick([5,8,10,12,20,25]),Rm=L*n/100;
  return nq({instr:'L’échelle de la maquette s’écrit 1/n. Calcule n.',prompt:stx(`Un bateau de ${num(Rm)} m mesure ${L} cm sur sa maquette.`),labels:['n ='],t:[n],
    explain:`Même unité : ${num(Rm)} m = ${num(Rm*100)} cm. Échelle = ${L} ÷ ${num(Rm*100)} = 1/${n}.`,hint:'Convertis d’abord la longueur réelle en cm.',
    diag:([v])=>near(v,Rm/L,.01)?'sp1-unite':null})};
const gSp1Vit=()=>{if(Math.random()<.6){const V=pick([60,72,80,90,96,120,180,240]),h=R(0,3),m=pick([15,20,30,45,12,36,40,48]),T=h+m/60,D=+(V*T).toFixed(1);
    return nq({instr:'Calcule la vitesse moyenne (en km/h).',prompt:stx(`Un véhicule parcourt ${num(D)} km en ${h?h+' h ':''}${m} min.`),labels:['V (km/h) ='],t:[D/T],dp:1,
      explain:`Durée : ${h?h+' h ':''}${m} min = ${h} + ${m}/60 = ${dec(T,4)} h. V = D ÷ T = ${num(D)} ÷ ${dec(T,4)} ≈ ${dec(D/T,1)} km/h.`,
      hint:'Convertis la durée en heures décimales : les minutes se divisent par 60.',diag:([v])=>near(v,D/(h+m/100),.1)?'sp1-duree':near(v,D*T,.1)?'mult-div':null})}
  const V=pick([36,54,72,90,108,126,1224,18]);
  return nq({instr:'Convertis cette vitesse en m/s.',prompt:stx(`V = ${num(V)} km/h`),labels:['V (m/s) ='],t:[V/3.6],dp:1,
    explain:`${num(V)} km/h = ${num(V*1000)} m en 3 600 s, soit ${num(V*1000)} ÷ 3 600 = ${dec(V/3.6,1)} m/s (on divise par 3,6).`,
    hint:'1 km = 1 000 m et 1 h = 3 600 s.',diag:([v])=>near(v,V*3.6,.1)?'mult-div':null})};

/* Raisonner : est-ce proportionnel ? */
const gSp1R1=()=>{const k=pick([1.5,2.5,0.8,1.2,3.5,4.5]),xs=sp1Distinct(3,2,9),prop=Math.random()<.5,ys=xs.map(x=>+(k*x).toFixed(2));
  if(!prop)ys[2]=+(ys[2]+pick([0.3,0.5,-0.4,0.8])).toFixed(2);
  const qs=xs.map((x,i)=>ys[i]/x),q1=qs[0],N=pick([12,15,20]);
  return chain({instr:'Peut-on prévoir le prix par proportionnalité ? Construis ton raisonnement.',
    prompt:stx('Un fleuriste affiche ces prix pour des bouquets de roses :')+dtab([['Roses',...xs.map(num)],['Prix (€)',...ys.map(v=>dec(v,2))]])+stx(`On cherche le prix de ${N} roses.`),
    steps:[
      {q:'Quelle vérification fais-tu d’abord ?',o:[
        {h:'Je calcule le quotient prix ÷ roses pour chaque colonne',ok:true,c:'all'},
        {h:'Je vérifie que les prix augmentent avec le nombre de roses',c:'incr',why:'Deux grandeurs peuvent augmenter ensemble sans être proportionnelles (un forfait plus un prix par rose, par exemple).',tag:'sp1-prop'},
        {h:'Je calcule le quotient prix ÷ roses pour la première colonne',c:'first',why:'Une seule colonne ne prouve rien : il faut que toutes les colonnes donnent le même quotient.',tag:'sp1-prop'}]},
      {q:'Que constates-tu ?',o:prev=>[
        {h:`Les quotients valent tous ${dec(q1,2)}`,ok:prev[0].c==='all'&&prop,c:'A',why:prop?'Ce constat ne découle pas de la vérification que tu as choisie.':`Le dernier quotient vaut ${dec(qs[2],3)}, pas ${dec(q1,2)}.`,tag:'sp1-prop'},
        {h:'Les quotients ne sont pas tous égaux'+(prop?'':` : ${qs.map(v=>dec(v,3)).join(' ; ')}`),ok:prev[0].c==='all'&&!prop,c:'B',why:prop?'Recalcule : tous les quotients sont égaux.':'C’est bien le constat, mais il découle du calcul de tous les quotients.'},
        {h:'Les prix augmentent quand le nombre de roses augmente',ok:prev[0].c==='incr',c:'C',why:'C’est vrai, mais cela ne dit pas si la situation est proportionnelle.',tag:'sp1-prop'},
        {h:`Le premier quotient vaut ${dec(q1,2)}`,ok:prev[0].c==='first',c:'D',why:'C’est vrai, mais il faut comparer les quotients de toutes les colonnes.',tag:'sp1-prop'}]},
      {q:'Quelle est ta conclusion ?',o:prev=>[
        {h:`C’est proportionnel, de coefficient ${dec(q1,2)}`,ok:prev[1].c!=='B',c:'P',why:'Les quotients ne sont pas tous égaux : la situation n’est pas proportionnelle.',tag:'sp1-prop'},
        {h:'Ce n’est pas proportionnel',ok:prev[1].c==='B',c:'N',why:'Tous les quotients sont égaux : la situation est proportionnelle.'},
        {h:`C’est proportionnel, de coefficient ${dec(1/q1,3)}`,ok:false,c:'X',why:'Le coefficient se calcule bas ÷ haut (prix ÷ roses), pas l’inverse.',tag:'rapport'}]},
      {q:`Prix de ${N} roses ?`,o:prev=>[
        {h:`${N} × ${dec(q1,2)} = ${dec(N*q1,2)} €`,ok:prev[2].c==='P',why:prop?'Ta conclusion précédente ne permettait pas ce calcul.':'La situation n’est pas proportionnelle : ce calcul n’est pas justifié.'},
        {h:`${N} ÷ ${dec(q1,2)} ≈ ${dec(N/q1,2)} €`,ok:false,why:'Le prix s’obtient en multipliant le nombre de roses par le coefficient, pas en divisant.',tag:'mult-div'},
        {h:'On ne peut pas le prévoir par proportionnalité',ok:prev[2].c==='N',why:'La situation est proportionnelle : le coefficient permet de prévoir le prix.'},
        {h:`${N} × ${dec(1/q1,3)} ≈ ${dec(N/q1,2)} €`,ok:prev[2].c==='X',why:'Ce calcul utilise le coefficient inversé : roses ÷ prix au lieu de prix ÷ roses.',tag:'rapport'}]}],
    explain:`Quotients prix ÷ roses : ${qs.map(v=>dec(v,3)).join(' ; ')}. ${prop?`Ils sont tous égaux à ${dec(k,2)} : c’est proportionnel, et ${N} roses coûtent ${N} × ${dec(k,2)} = ${dec(N*k,2)} €.`:'Ils ne sont pas tous égaux : la situation n’est pas proportionnelle, on ne peut pas prévoir le prix avec un coefficient.'}`})};

/* Raisonner : partage selon un ratio avec un reste */
const gSp1R2=()=>{let r,s,N;do{r=sp1Distinct(3,2,6);s=sumA(r);N=R(150,400)}while(N%s===0||N%3===0||N%(r[0]*r[1]*r[2])===0);
  const f=Math.floor(N/s),M=f*s;
  return chain({instr:'Partage le plus possible d’objets en parts entières, en construisant ton raisonnement.',
    prompt:stx(`Trois amis se partagent ${N} noix dans le ratio ${r.join(' : ')}. Chacun doit recevoir un nombre entier de noix, en respectant exactement le ratio ; les noix en trop sont données au chien.`),
    steps:[
      {q:'Combien de parts compte ce ratio ?',o:[
        {h:`${r.join(' + ')} = ${s} parts`,ok:true,v:s},
        {h:`${r.join(' × ')} = ${r[0]*r[1]*r[2]} parts`,v:r[0]*r[1]*r[2],why:'Les parts s’additionnent : chacun reçoit un certain nombre de parts.',tag:'sp1-ratio'},
        {h:'3 parts, une par personne',v:3,why:'Le ratio dit combien de parts reçoit chacun : il faut additionner ses nombres.',tag:'sp1-ratio'}]},
      {q:'Combien de noix peut-on partager au maximum ?',o:prev=>{const v=prev[0].v,ff=Math.floor(N/v);return[
        {h:`${ff*v} noix (${v} × ${ff})`,ok:true,f:ff,m:ff*v},
        {h:`${N} noix, toutes`,f:N/v,m:N,why:`${N} n’est pas un multiple de ${v} : les parts ne seraient pas entières.`},
        {h:`${(ff+1)*v} noix (${v} × ${ff+1})`,f:ff+1,m:(ff+1)*v,why:`C’est plus que les ${N} noix disponibles.`}]}},
      {q:'Combien vaut une part ?',o:prev=>{const v=prev[0].v,m=prev[1].m;return[
        {h:`${num(m)} ÷ ${v} = ${dec(m/v,2)} noix`,ok:true,u:m/v},
        {h:`${num(m)} ÷ 3 = ${dec(m/3,2)} noix`,u:m/3,why:'Une part du ratio n’est pas la part d’une personne : on divise par le nombre de parts.',tag:'sp1-ratio'},
        {h:`${N} ÷ ${v} = ${dec(N/v,2)} noix`,u:N/v,why:`On divise la quantité réellement partagée (${num(m)}), pas le total.`},
        {h:`${num(m)} ÷ ${r[2]} = ${dec(m/r[2],2)} noix`,u:m/r[2],why:'On divise par le nombre total de parts, pas par le plus grand nombre du ratio.',tag:'sp1-ratio'}].filter((o,i)=>i===0||(i===1&&v!==3)||(i===2&&m!==N)||i===3)}},
      {q:`Combien reçoit celui qui a ${r[2]} parts ?`,o:prev=>{const u=prev[2].u;return[
        {h:`${r[2]} × ${dec(u,2)} = ${dec(r[2]*u,2)} noix`,ok:true},
        {h:`${r[2]} × ${dec(u,2)} + ${N-M} = ${dec(r[2]*u+N-M,2)} noix`,why:'Les noix en trop ne sont distribuées à personne : elles vont au chien.'},
        {h:`${r[0]} × ${dec(u,2)} = ${dec(r[0]*u,2)} noix`,why:`Celui qui a ${r[2]} parts reçoit ${r[2]} fois la valeur d’une part.`}]}}],
    explain:`Parts : ${r.join(' + ')} = ${s}. Le plus grand multiple de ${s} inférieur ou égal à ${N} est ${M} = ${s} × ${f} (il reste ${N-M} noix pour le chien). Une part vaut ${f} noix : les trois amis reçoivent ${r.map(x=>x*f).join(', ')} noix.`})};

/* Raisonner : vitesse moyenne avec une durée en h et min */
const gSp1R3=()=>{const V=pick([18,24,30,36,42,48]),h=R(1,3),m=pick([15,20,30,40,45]),T=h+m/60,D=+(V*T).toFixed(1),mm=String(m).padStart(2,'0');
  return chain({instr:'Calcule une vitesse moyenne en construisant ton raisonnement.',prompt:stx(`Une cycliste parcourt ${num(D)} km en ${h} h ${mm} min.`),
    steps:[
      {q:`Combien d’heures font ${h} h ${mm} min ?`,o:[
        {h:`${dec(T,4)} h`,ok:true,T},
        {h:`${h},${mm} h`,T:h+m/100,why:`Une heure a 60 minutes, pas 100 : ${m} min = ${m}/60 h = ${dec(m/60,4)} h.`,tag:'sp1-duree'},
        {h:`${h} h (on néglige les minutes)`,T:h,why:`${m} minutes, c’est ${dec(m/60,2)} h : on ne peut pas les négliger.`,tag:'sp1-duree'}]},
      {q:'Quelle formule utilises-tu ?',o:[
        {h:'V = D ÷ T',ok:true,f:'d'},{h:'V = D × T',f:'m',why:'La vitesse est une distance par unité de temps : on divise la distance par la durée.',tag:'mult-div'},
        {h:'V = T ÷ D',f:'i',why:'Ce serait un temps par kilomètre, pas une vitesse en km/h.',tag:'mult-div'}]},
      {q:'La vitesse moyenne vaut donc…',o:prev=>{const t=prev[0].T,F={d:D/t,m:D*t,i:t/D};return[
        {h:`${dec(F.d,2)} km/h`,ok:prev[1].f==='d',why:'Ce n’est pas le résultat de la formule que tu as choisie.'},
        {h:`${dec(F.m,2)} km/h`,ok:prev[1].f==='m',why:'C’est D × T : la formule n’est pas la bonne.',tag:'mult-div'},
        {h:`${dec(F.i,3)} km/h`,ok:prev[1].f==='i',why:'C’est T ÷ D : la formule n’est pas la bonne.',tag:'mult-div'}]}},
      {q:'En m/s, cela donne…',o:prev=>{const v=parseFloat(prev[2].h.replace(',','.'));return[
        {h:`${dec(v/3.6,2)} m/s`,ok:true},{h:`${dec(v*3.6,2)} m/s`,why:'Pour passer des km/h aux m/s, on divise par 3,6 (1 000 m pour 3 600 s).',tag:'mult-div'},
        {h:`${dec(v/60,2)} m/s`,why:'Diviser par 60 donne des km par minute ; il faut des mètres par seconde : ÷ 3,6.'}]}}],
    explain:`${h} h ${mm} min = ${h} + ${m}/60 = ${dec(T,4)} h. V = ${num(D)} ÷ ${dec(T,4)} = ${dec(D/T,2)} km/h, soit ${dec(D/T/3.6,2)} m/s.`})};

/* ===================== Chapitre : Pourcentages et évolutions ===================== */
const SP1_MENT=[[10,'le dixième',10],[25,'le quart',4],[50,'la moitié',2],[75,'les trois quarts',4],[200,'le double',1],[20,'le cinquième',5],[5,'la moitié de 10 %',20]];
const gSp1Mental=()=>{const[p,nom,mul]=pick(SP1_MENT),N=mul*R(2,40),u=pick(['€','km','L','kg','']),v=p*N/100;
  return nq({instr:'Calcule mentalement.',prompt:stx(`${p} % de ${num(N)}${u?' '+u:''}`),labels:['Résultat ='],t:[v],
    explain:`Prendre ${p} %, c’est prendre ${nom} : ${p} % de ${N} = ${num(v)}.`,hint:'10 % : ÷ 10 ; 25 % : ÷ 4 ; 50 % : ÷ 2 ; 75 % : ÷ 4 puis × 3 ; 200 % : × 2.',
    diag:([w])=>near(w,N*p,.01)||near(w,N/p,.01)?'calc':null})};
const gSp1App=()=>{let N,p;do{N=pick([20,25,40,50,80,200,300,400,500,1200]);p=R(5,95)}while(p*N%100);const v=p*N/100,ctx=pick(['des élèves aiment les maths','des clients sont satisfaits','des spectateurs ont moins de 25 ans']);
  return nq({instr:'Applique le pourcentage.',prompt:stx(`${p} % ${ctx}. Combien cela fait-il sur un groupe de ${N} personnes ?`),labels:['Nombre ='],t:[v],
    explain:`${p} % de ${N} = ${p}/100 × ${N} = ${num(p/100)} × ${N} = ${num(v)}.`,hint:'« de » se traduit par « × » : multiplie l’effectif par p/100.',
    diag:([w])=>near(w,p*N,.01)?'calc':null})};
const gSp1Prop=()=>{const N=R(150,700),k=R(Math.round(N*.08),Math.round(N*.7)),ctx=pick([['élèves de seconde','sont externes'],['employés','sont cadres'],['habitants','ont plus de 60 ans'],['adhérents','pratiquent la natation']]);
  return sp1Pct({instr:'Calcule la proportion.',prompt:stx(`Sur ${N} ${ctx[0]}, ${k} ${ctx[1]}. Quelle est leur proportion ?`),label:'Proportion (en %) =',p:k/N,dp:1,
    explain:`Population de référence : les ${N} ${ctx[0]}. p = ${k} ÷ ${N} ≈ ${dec(k/N,4)}, soit environ ${dec(100*k/N,1)} %.`,
    hint:'Effectif de la sous-population ÷ effectif de la population de référence.',diag:w=>near(w,100*(N-k)/N,.06)?'sp1-ref':near(w,100*N/k,.06)?'sp1-ref':null})};
const gSp1Cm=()=>{const t=pick([38,5,45,4,12,2.5,150,0.5,30,8,60,15]),up=Math.random()<.5,c=up?1+t/100:1-t/100;
  if(!up&&t>=100)return gSp1Cm();
  return nq({instr:'Donne le coefficient multiplicateur (un nombre décimal).',prompt:stx(`${up?'Augmenter':'Diminuer'} un nombre de ${num(t)} %.`),labels:['CM ='],t:[c],
    explain:`${up?'Augmenter':'Diminuer'} de ${num(t)} %, c’est multiplier par 1 ${up?'+':'−'} ${num(t/100)} = ${num(+c.toFixed(4))}.`,
    hint:'Hausse : 1 + t/100. Baisse : 1 − t/100.',diag:([v])=>near(v,t/100,1e-4)||near(v,t,1e-4)?'sp1-coef':near(v,up?1-t/100:1+t/100,1e-4)?'signe':null})};
const gSp1Evo=()=>{const t=pick([5,8,12,15,20,25,30,35,40]),P=pick([49,160,89,75,120,250,64,39.9,18.5]),up=Math.random()<.5,c=up?1+t/100:1-t/100,v=P*c;
  return nq({instr:'Calcule le nouveau prix (en €).',prompt:stx(`Un article qui coûtait ${SP1_eur(P)} est ${up?'augmenté':'réduit'} de ${t} %.`),labels:['Nouveau prix (€) ='],t:[v],dp:2,
    explain:`Coefficient multiplicateur : 1 ${up?'+':'−'} ${num(t/100)} = ${num(c)}. Nouveau prix : ${dec(P,2)} × ${num(c)} = ${dec(v,2)} €.`,
    hint:'Multiplie le prix de départ par le coefficient multiplicateur.',diag:([w])=>near(w,P*t/100)?'sp1-coef':near(w,P*(up?1-t/100:1+t/100))?'signe':null})};
const gSp1Taux=()=>{const ctx=pick([['La population d’un village','habitants'],['Le prix d’un vélo','€'],['Le nombre d’abonnés d’un club','abonnés']]);let V0,V1;
  do{V0=R(40,900)*(ctx[1]==='€'?1:10);V1=Math.round(V0*(1+R(-40,60)/100))}while(Math.abs(V1-V0)/V0<.03);const t=(V1-V0)/V0;
  return sp1Pct({instr:'Calcule le taux d’évolution, en % (négatif si c’est une baisse).',prompt:stx(`${ctx[0]} passe de ${num(V0)} à ${num(V1)} ${ctx[1]}.`),label:'Taux (en %) =',p:t,dp:1,
    explain:`t = (V₁ − V₀) ÷ V₀ = (${num(V1)} − ${num(V0)}) ÷ ${num(V0)} ≈ ${dec(t,4)}, soit environ ${t>0?'+':MINUS}${dec(Math.abs(100*t),1)} % (${t>0?'hausse':'baisse'}).`,
    hint:'Divise la variation par la valeur de départ.',diag:w=>near(w,100*(V1-V0)/V1,.06)?'sp1-taux':near(w,100*V1/V0,.06)?'sp1-coef':near(w,-100*t,.06)?'signe':null})};
const gSp1Pdp=()=>{const p1=pick([20,30,40,60,70]),p2=pick([15,25,35,45,55,65,75]),c=pick([['d’une ville sont en âge de travailler','des personnes en âge de travailler sont actives','des actifs'],['des passagers d’un bus sont des scolaires','des scolaires sont des filles','des filles scolaires'],['des employés travaillent à l’usine','des employés de l’usine sont des techniciens','des techniciens de l’usine']]);
  return sp1Pct({instr:'Calcule la proportion par rapport à la population totale.',prompt:stx(`${p1} % ${c[0]}, et ${p2} % ${c[1]}. Quelle est la proportion ${c[2]} dans la population totale ?`),label:'Proportion (en %) =',p:p1*p2/10000,dp:1,
    explain:`Pourcentage de pourcentage : on multiplie. ${num(p2/100)} × ${num(p1/100)} = ${num(p1*p2/10000)}, soit ${num(p1*p2/100)} %.`,
    hint:'La proportion d’une partie d’une partie s’obtient en multipliant les deux proportions.',diag:w=>near(w,p1+p2,.06)||near(w,(p1+p2)/2,.06)?'sp1-succ':null})};
const gSp1Succ=()=>{const t1=pick([5,10,20,25,30,50,8]),t2=pick([5,10,20,25,15,40,4]),s1=Math.random()<.6?1:-1,s2=Math.random()<.5?1:-1,c=(1+s1*t1/100)*(1+s2*t2/100),g=c-1;
  return sp1Pct({instr:'Calcule le taux d’évolution global, en % (négatif si c’est une baisse).',prompt:stx(`Un prix ${s1>0?'augmente':'baisse'} de ${t1} %, puis ${s2>0?'augmente':'baisse'} de ${t2} %.`),label:'Taux global (en %) =',p:g,dp:2,
    explain:`Coefficients : ${num(1+s1*t1/100)} et ${num(1+s2*t2/100)}. Coefficient global : ${num(1+s1*t1/100)} × ${num(1+s2*t2/100)} = ${num(+c.toFixed(4))}, soit un taux de ${SP1_pctStr(100*g)}.`,
    hint:'Les taux ne s’additionnent pas : multiplie les coefficients multiplicateurs.',diag:w=>near(w,s1*t1+s2*t2,.01)?'sp1-succ':near(w,100*c,.01)?'sp1-coef':null})};
const gSp1Recip=()=>{const t=pick([8,3,25,20,10,40,50,15,5]),up=Math.random()<.5,c=up?1+t/100:1-t/100,r=1/c-1;
  return sp1Pct({instr:'Calcule le taux de l’évolution réciproque, en % (négatif si c’est une baisse).',prompt:stx(`Une quantité ${up?'augmente':'baisse'} de ${t} %. Quelle évolution la ramène à sa valeur de départ ?`),label:'Taux (en %) =',p:r,dp:1,
    explain:`Coefficient : ${num(c)}. Coefficient réciproque : 1 ÷ ${num(c)} ≈ ${dec(1/c,4)}, soit un taux de ${SP1_pctStr(100*r)} environ.`,
    hint:'Le coefficient de l’évolution réciproque est l’inverse du coefficient multiplicateur.',diag:w=>near(w,up?-t:t,.06)?'sp1-recip':near(w,100/c,.06)?'sp1-coef':null})};

/* Raisonner : retrouver le prix avant une réduction */
const gSp1R4=()=>{const P=pick([54,80,120,45,150,64,250,36,90]),t=pick([10,20,25,30,40,15]),c=1-t/100,S=+(P*c).toFixed(2),u=1+t/100;
  return chain({instr:'Retrouve le prix avant réduction, en construisant ton raisonnement.',prompt:stx(`Après une réduction de ${t} %, un pantalon coûte ${SP1_eur(S)}. On cherche son prix P avant la réduction.`),
    steps:[
      {q:`Quel coefficient multiplicateur correspond à une réduction de ${t} % ?`,o:[
        {h:`${num(c)}`,ok:true,v:c},{h:`${num(u)}`,v:u,why:'Une réduction fait baisser le prix : le coefficient est 1 − t/100, inférieur à 1.',tag:'signe'},
        {h:`${num(t/100)}`,v:t/100,why:`${num(t/100)} est la part retirée ; on garde ${100-t} % du prix, donc le coefficient est ${num(c)}.`,tag:'sp1-coef'}]},
      {q:'Quelle relation lie P et le prix soldé ?',o:prev=>[
        {h:`P × ${num(prev[0].v)} = ${dec(S,2)}`,ok:true,f:'eq'},
        {h:`P = ${dec(S,2)} × ${num(prev[0].v)}`,f:'rev',why:'Le coefficient s’applique au prix de départ P, pas au prix soldé.',tag:'sp1-coef'},
        {h:`P = ${dec(S,2)} × ${num(u)} (on rajoute les ${t} %)`,f:'add',why:`Les ${t} % ont été calculés sur P, pas sur le prix soldé : on ne peut pas les « rajouter » au prix soldé.`,tag:'sp1-coef'}]},
      {q:'Donc P vaut…',o:prev=>{const v=prev[0].v;return[
        {h:`${dec(S,2)} ÷ ${num(v)} = ${SP1_eur(S/v)}`,ok:prev[1].f==='eq',why:'Ce n’est pas ce que donne la relation que tu as choisie.'},
        {h:`${dec(S,2)} × ${num(v)} = ${SP1_eur(S*v)}`,ok:prev[1].f==='rev',why:'Pour isoler P dans P × c = S, on divise par c.',tag:'mult-div'},
        {h:`${dec(S,2)} × ${num(u)} = ${SP1_eur(S*u)}`,ok:prev[1].f==='add',why:'Ajouter les pourcentages au prix soldé ne redonne pas le prix de départ.',tag:'sp1-coef'}]}},
      {q:`Vérification : en appliquant la réduction de ${t} % au prix trouvé, retrouve-t-on ${SP1_eur(S)} ?`,keep:true,o:prev=>{const Pv=parseFloat(prev[2].h.split('=')[1].replace(/\s/g,'').replace(',','.')),okk=Math.abs(Pv*c-S)<.011;return[
        {h:`Oui : ${dec(Pv,2)} × ${num(c)} redonne bien ${dec(S,2)}`,ok:okk,why:`${dec(Pv,2)} × ${num(c)} = ${dec(Pv*c,2)}, pas ${dec(S,2)}.`},
        {h:`Non : ${dec(Pv,2)} × ${num(c)} ne redonne pas ${dec(S,2)}, il faut corriger`,ok:!okk,why:`Recalcule : ${dec(Pv,2)} × ${num(c)} = ${dec(Pv*c,2)}.`}]}}],
    explain:`Réduction de ${t} % : coefficient ${num(c)}. P × ${num(c)} = ${dec(S,2)}, donc P = ${dec(S,2)} ÷ ${num(c)} = ${dec(P,2)} €. Vérification : ${P} × ${num(c)} = ${dec(S,2)}.`})};

/* Raisonner : évolutions successives */
const gSp1R5=()=>{let t1,t2;do{t1=pick([10,20,25,30,50,15]);t2=pick([10,20,25,15,30,40])}while(t1===t2);
  const c1=1+t1/100,c2=1-t2/100,k=c1*c2,g=(k-1)*100;
  return chain({instr:'Calcule l’évolution globale en construisant ton raisonnement.',prompt:stx(`Le prix d’un abonnement augmente de ${t1} %, puis baisse de ${t2} % l’année suivante. Quelle est l’évolution globale ?`),
    steps:[
      {q:'Comment combiner les deux évolutions ?',o:[
        {h:'On multiplie les coefficients multiplicateurs',ok:true,c:'mul'},
        {h:'On additionne les taux d’évolution',c:'add',why:'Les pourcentages ne s’additionnent pas : la 2e évolution s’applique à un prix qui a déjà changé.',tag:'sp1-succ'},
        {h:'On multiplie les deux taux entre eux',c:'mt',why:'Multiplier les taux, c’est la méthode du pourcentage de pourcentage (une partie d’une partie), pas celle des évolutions.',tag:'sp1-succ'}]},
      {q:'Quel calcul fais-tu ?',o:prev=>[
        {h:`${num(c1)} × ${num(c2)} = ${num(+k.toFixed(4))}`,ok:prev[0].c==='mul',why:'Ce n’est pas le calcul de la méthode que tu as choisie.',r:k,kind:'cm'},
        {h:`${num(c1)} × ${num(1+t2/100)} = ${num(+(c1*(1+t2/100)).toFixed(4))}`,ok:false,why:`Une baisse de ${t2} % correspond au coefficient ${num(c2)}, pas ${num(1+t2/100)}.`,tag:'signe',r:c1*(1+t2/100),kind:'cm'},
        {h:`${t1} − ${t2} = ${t1-t2} %`,ok:prev[0].c==='add',why:'Additionner les taux est faux pour des évolutions successives.',tag:'sp1-succ',r:(t1-t2)/100,kind:'t'},
        {h:`${num(t1/100)} × ${num(t2/100)} = ${num(t1*t2/10000)}`,ok:prev[0].c==='mt',why:'Multiplier les taux ne correspond pas à des évolutions successives.',tag:'sp1-succ',r:t1*t2/10000,kind:'t'}]},
      {q:'Quelle est l’évolution globale ?',o:prev=>{const p=prev[1],tt=p.kind==='cm'?p.r-1:p.r;return[
        {h:SP1_pctStr(100*tt),ok:true},
        {h:SP1_pctStr(100*p.r+(p.kind==='cm'?0:100)),why:p.kind==='cm'?`Le coefficient ${num(+p.r.toFixed(4))} correspond à un taux de ${SP1_pctStr(100*(p.r-1))} : on retire 1.`:'Le taux s’obtient en retirant 1 au coefficient, pas en ajoutant 100 %.',tag:'sp1-coef'},
        {h:SP1_pctStr(-100*tt),why:'Attention au sens : un coefficient supérieur à 1 est une hausse, inférieur à 1 une baisse.',tag:'signe'}]}}],
    explain:`Coefficients : ${num(c1)} (hausse de ${t1} %) et ${num(c2)} (baisse de ${t2} %). Global : ${num(c1)} × ${num(c2)} = ${num(+k.toFixed(4))}, soit une évolution de ${SP1_pctStr(g)}, et non ${t1-t2} %.`})};

/* Raisonner : prix hors taxe */
const gSp1R6=()=>{const tau=pick([5.5,10,20]),k=1+tau/100,HT=pick([25,40,55,80,120,150,64,250,18]),TTC=+(HT*k).toFixed(2);
  return chain({instr:'Retrouve le prix hors taxe, en construisant ton raisonnement.',prompt:stx(`Un article coûte ${SP1_eur(TTC)} TTC. La TVA est de ${num(tau)} %.`),
    steps:[
      {q:'Sur quel prix la TVA est-elle calculée ?',o:[
        {h:`${num(tau)} % du prix HT, ajoutés au prix HT`,ok:true,c:'ht'},
        {h:`${num(tau)} % du prix TTC, inclus dans le prix TTC`,c:'ttc',why:'La TVA est un pourcentage du prix hors taxe, pas du prix TTC.',tag:'sp1-ref'},
        {h:`${num(tau)} € ajoutés au prix HT`,c:'eur',why:`La TVA est un pourcentage, pas un montant fixe de ${num(tau)} €.`}]},
      {q:'Quelle relation en découle ?',o:prev=>[
        {h:`TTC = HT × ${num(k)}`,ok:prev[0].c==='ht',c:'A',why:'Ce n’est pas la relation qui découle de ton choix précédent.'},
        {h:`HT = TTC × ${num(1-tau/100)}`,ok:prev[0].c==='ttc',c:'B',why:'Cette relation suppose que la TVA est calculée sur le TTC, ce qui est faux.',tag:'sp1-ref'},
        {h:`TTC = HT + ${num(tau)}`,ok:prev[0].c==='eur',c:'C',why:'La TVA n’est pas un montant fixe.'}]},
      {q:'Donc le prix HT vaut…',o:prev=>[
        {h:`${dec(TTC,2)} ÷ ${num(k)} = ${SP1_eur(TTC/k)}`,ok:prev[1].c==='A',why:'Ce n’est pas ce que donne la relation choisie.'},
        {h:`${dec(TTC,2)} × ${num(1-tau/100)} = ${SP1_eur(TTC*(1-tau/100))}`,ok:prev[1].c==='B',why:`Retirer ${num(tau)} % du TTC ne redonne pas le HT : la TVA a été calculée sur le HT.`,tag:'sp1-coef'},
        {h:`${dec(TTC,2)} − ${num(tau)} = ${SP1_eur(TTC-tau)}`,ok:prev[1].c==='C',why:'On ne soustrait pas un pourcentage comme un montant.'},
        {h:`${dec(TTC,2)} × ${num(k)} = ${SP1_eur(TTC*k)}`,ok:false,why:'Pour isoler HT dans TTC = HT × k, on divise par k.',tag:'mult-div'}]}],
    explain:`La TVA est calculée sur le prix HT : TTC = HT × ${num(k)}. Donc HT = ${dec(TTC,2)} ÷ ${num(k)} = ${dec(HT,2)} €.`})};

/* ===================== Chapitre : Statistiques à une variable ===================== */
const SP1_CAT=[['Groupe sanguin',['O','A','B','AB']],['Jour',['Lundi','Mardi','Mercredi','Jeudi','Vendredi']],['Moyen de transport',['Bus','Vélo','Voiture','À pied']],['Sport',['Football','Tennis','Natation','Judo','Danse']]];
const gSp1Freq=()=>{const[h,cats]=pick(SP1_CAT),eff=cats.map(()=>R(2,60)),N=sumA(eff),i=R(0,cats.length-1);
  return sp1Pct({instr:`Calcule la fréquence de la modalité « ${cats[i]} ».`,prompt:dtab([[h,...cats],['Effectif',...eff.map(num)]]),label:'Fréquence (en %) =',p:eff[i]/N,dp:1,
    explain:`Effectif total : ${eff.join(' + ')} = ${N}. f = ${eff[i]} ÷ ${N} ≈ ${dec(eff[i]/N,4)}, soit environ ${dec(100*eff[i]/N,1)} %.`,
    hint:'Fréquence = effectif ÷ effectif total.',diag:w=>near(w,100*eff[i]/(N-eff[i]),.06)?'sp1-ref':near(w,100/cats.length,.06)?'stat-weight':null})};
const gSp1Angle=()=>{const[h,cats]=pick(SP1_CAT),eff=cats.map(()=>R(1,30)),N=sumA(eff),i=R(0,cats.length-1),a=360*eff[i]/N;
  return nq({instr:`Calcule l’angle du secteur « ${cats[i]} » dans un diagramme circulaire (en degrés). Arrondis au degré.`,prompt:dtab([[h,...cats],['Effectif',...eff.map(num)]]),labels:['Angle (°) ='],t:[a],dp:0,tol:.5,
    explain:`L’effectif total ${N} correspond à 360°. Angle = ${eff[i]} × 360 ÷ ${N} ≈ ${dec(a,1)}°, soit ${Math.round(a)}°.`,
    hint:'L’angle est proportionnel à l’effectif : 360° pour l’effectif total.',diag:([v])=>near(v,100*eff[i]/N,.6)?'sp1-ref':null})};
const gSp1Lin=()=>{const m=pick([12.5,1.53,8,14.2,25,3.6]),v=Math.random()<.5;
  if(v){const a=pick([2,3,1.5,0.5,10]),b=pick([1,2,-3,5,-0.5]),r=a*m+b;
    return nq({instr:'Calcule la nouvelle moyenne.',prompt:stx(`La moyenne d’une série est ${num(m)}. On multiplie toutes les valeurs par ${num(a)}, puis on ajoute ${num(b)} à chacune.`),labels:['Nouvelle moyenne ='],t:[r],dp:2,
      explain:`Linéarité : la moyenne est multipliée par ${num(a)} puis augmentée de ${num(b)} : ${num(a)} × ${num(m)} ${b<0?'−':'+'} ${num(Math.abs(b))} = ${dec(r,2)}.`,
      hint:'Si toutes les valeurs deviennent a·x + b, la moyenne devient a·x̄ + b.',diag:([w])=>near(w,a*(m+b))||near(w,m+b)||near(w,a*m)?'sp1-lin':null})}
  const t=pick([10,20,30,5]),b=pick([0.15,0.5,1,2]),r=m*(1+t/100)-b;
  return nq({instr:'Calcule la nouvelle moyenne.',prompt:stx(`Le prix moyen d’un article dans plusieurs magasins est ${num(m)} €. Tous les prix augmentent de ${t} %, puis on retire ${num(b)} € à chacun.`),labels:['Nouvelle moyenne (€) ='],t:[r],dp:2,
    explain:`Hausse de ${t} % : toutes les valeurs × ${num(1+t/100)}, donc la moyenne aussi : ${num(m)} × ${num(1+t/100)} = ${dec(m*(1+t/100),3)}. Puis − ${num(b)} : ${dec(r,2)} €.`,
    hint:'La moyenne subit les mêmes transformations que les valeurs.',diag:([w])=>near(w,(m-b)*(1+t/100))||near(w,m*(1+t/100))?'sp1-lin':null})};
const gSp1Cls=()=>{const a0=pick([150,0,10,20,100]),w=pick([5,10,20]),k=R(4,6),eff=Array.from({length:k},()=>R(1,12)),N=sumA(eff),cs=eff.map((_,i)=>a0+w*i+w/2),m=sumA(cs.map((c,i)=>c*eff[i]))/N;
  return nq({instr:'Estime la moyenne en remplaçant chaque classe par son centre.',prompt:dtab([['Classe',...eff.map((_,i)=>`[${a0+w*i} ; ${a0+w*(i+1)}[`)],['Effectif',...eff.map(num)]]),labels:['Moyenne ≈'],t:[m],dp:1,
    explain:`Centres : ${cs.map(num).join(' ; ')}. Moyenne pondérée : (${cs.map((c,i)=>`${eff[i]} × ${num(c)}`).join(' + ')}) ÷ ${N} ≈ ${dec(m,1)}.`,
    hint:'Le centre de [a ; b[ est (a + b) ÷ 2 ; puis moyenne pondérée par les effectifs.',
    diag:([v])=>near(v,m-w/2,.06)||near(v,m+w/2,.06)?'sp1-classe':near(v,meanA(cs),.06)?'stat-weight':null})};
const gSp1Var=()=>{const k=R(3,5),xs=sp1Distinct(k,0,8),eff=xs.map(()=>R(1,9)),N=sumA(eff),m=sumA(xs.map((x,i)=>x*eff[i]))/N,V=sumA(xs.map((x,i)=>eff[i]*(x-m)**2))/N,s=Math.sqrt(V);
  return nq({instr:'Calcule la variance V et l’écart-type σ de la série.',prompt:dtab([['xᵢ',...xs.map(num)],['nᵢ',...eff.map(num)]]),labels:['V =','σ ='],t:[V,s],dp:2,
    explain:`N = ${N}, x̄ = ${dec(m,4)}. V = (${xs.map((x,i)=>`${eff[i]} × (${x} − ${dec(m,2)})²`).join(' + ')}) ÷ ${N} ≈ ${dec(V,2)}. σ = √V ≈ ${dec(s,2)}.`,
    hint:'V = moyenne pondérée des carrés des écarts à la moyenne ; σ = √V.',diag:([u,v])=>near(u,s)||near(v,V)?'stat-var':near(u,V*N/(N-1))?'stat-var':null})};

/* Raisonner : médiane et premier quartile */
const gSp1R7=()=>{const n=R(8,11);let a;do a=Array.from({length:n},()=>R(2,20));while(medA(a)===a[Math.floor(n/2)]||new Set(a).size<n-2);
  const t=sortA(a),r1=Math.ceil(n/4),medAt=arr=>n%2?arr[(n-1)/2]:(arr[n/2-1]+arr[n/2])/2;
  return chain({instr:'Détermine la médiane et le premier quartile en construisant ton raisonnement.',prompt:stx('Notes d’un élève :')+serie(a),
    steps:[
      {q:'Par quoi commences-tu ?',o:[
        {h:'Je range les notes dans l’ordre croissant',ok:true,c:'sort'},
        {h:'Je prends les notes dans l’ordre où elles sont données',c:'raw',why:'La médiane et les quartiles se lisent sur la série rangée.',tag:'stat-median'},
        {h:'Je calcule la moyenne des notes',c:'mean',why:'La moyenne n’est pas la médiane : la médiane partage la série rangée en deux moitiés.',tag:'stat-median'}]},
      {q:'La médiane vaut…',o:prev=>{const arr=prev[0].c==='raw'?a:t;return[
        {h:`Me = ${dec(medAt(t),2)}`,ok:prev[0].c==='sort',why:'Ce n’est pas cohérent avec la méthode que tu as choisie.'},
        {h:`Me = ${dec(medAt(a),2)}`,ok:prev[0].c==='raw',why:'C’est la valeur du milieu de la série non rangée.',tag:'stat-median'},
        {h:`Me = ${dec(meanA(a),2)}`,ok:prev[0].c==='mean',why:'C’est la moyenne, pas la médiane.',tag:'stat-median'},
        {h:`Me = ${dec(n%2?arr[(n-3)/2]:arr[n/2-1],2)}`,ok:false,why:n%2?`n = ${n} est impair : la médiane est la valeur de rang ${(n+1)/2}.`:`n = ${n} est pair : la médiane est la moyenne des valeurs de rangs ${n/2} et ${n/2+1}.`,tag:'stat-median'}]}},
      {q:'Quel est le rang de Q1 ?',o:[
        {h:`${n} ÷ 4 = ${dec(n/4,2)}, donc rang ${r1}`,ok:true,r:r1},
        {h:`${n} ÷ 4 = ${dec(n/4,2)}, donc rang ${r1+1}`,r:r1+1,why:`On prend le premier entier supérieur ou égal à ${dec(n/4,2)}, soit ${r1}.`,tag:'stat-quart'},
        {h:`${n} ÷ 4 = ${dec(n/4,2)}, donc rang ${r1-1}`,r:r1-1,why:`Arrondir à l’entier inférieur ne garantit pas qu’un quart des valeurs soient inférieures ou égales à Q1 : on arrondit au-dessus (${r1}).`,tag:'stat-quart'}]},
      {q:'Donc Q1 vaut…',o:prev=>{const arr=prev[0].c==='raw'?a:t,r=prev[2].r;return[r1-1,r1,r1+1].map(j=>({h:`Q1 = ${num(arr[j-1])} (valeur de rang ${j})`,ok:j===r,why:`On lit la valeur de rang ${r} choisi à l’étape précédente.`,tag:'stat-quart'}))}}],
    explain:`Série rangée : ${t.map(num).join(' ; ')}. n = ${n} : Me = ${dec(medAt(t),2)}. ${n} ÷ 4 = ${dec(n/4,2)} → rang ${r1}, donc Q1 = ${num(t[r1-1])}.`})};

/* Raisonner : moyenne pondérée et contrôle */
const gSp1R8=()=>{const k=R(4,5),xs=sp1Distinct(k,0,6),eff=xs.map(()=>R(1,12)),N=sumA(eff),S=sumA(xs.map((x,i)=>x*eff[i])),SX=sumA(xs),lo=xs[0],hi=xs[k-1];
  return chain({instr:'Calcule le nombre moyen de livres lus, en construisant ton raisonnement.',prompt:stx('Enquête sur le nombre de livres lus par mois :')+dtab([['Livres lus',...xs.map(num)],['Effectif',...eff.map(num)]]),
    steps:[
      {q:'Quel est l’effectif total ?',o:[
        {h:`${eff.join(' + ')} = ${N}`,ok:true,v:N},
        {h:`${k} (le nombre de colonnes)`,v:k,why:'L’effectif total est le nombre de personnes interrogées : la somme des effectifs.',tag:'stat-weight'},
        {h:`${xs.join(' + ')} = ${SX}`,v:SX,why:'On additionne les effectifs, pas les valeurs.',tag:'stat-weight'}]},
      {q:'Que mets-tu au numérateur ?',o:[
        {h:`Σ nᵢxᵢ = ${xs.map((x,i)=>`${x} × ${eff[i]}`).join(' + ')} = ${S}`,ok:true,v:S},
        {h:`Σ xᵢ = ${SX}`,v:SX,why:'Chaque valeur doit compter autant de fois que son effectif : on multiplie par nᵢ.',tag:'stat-weight'},
        {h:`Σ nᵢ = ${N}`,v:N,why:'La somme des effectifs est le dénominateur, pas le numérateur.',tag:'stat-weight'}]},
      {q:'La moyenne vaut donc…',o:prev=>{const p=prev[1].v,d=prev[0].v,alt=d===k?N:k;return[
        {h:`${p} ÷ ${d} ≈ ${dec(p/d,2)}`,ok:true,m:p/d},
        {h:`${d} ÷ ${p} ≈ ${dec(d/p,2)}`,m:d/p,why:'Numérateur et dénominateur sont inversés.'},
        {h:`${p} ÷ ${alt} ≈ ${dec(p/alt,2)}`,m:p/alt,why:'On divise par l’effectif total retenu à la première étape.',tag:'stat-weight'}]}},
      {q:'Contrôle : ce résultat est-il plausible ?',keep:true,o:prev=>{const m=prev[2].m,inr=m>=lo&&m<=hi;return[
        {h:`Oui : il est compris entre la plus petite valeur (${lo}) et la plus grande (${hi})`,ok:inr,why:`${dec(m,2)} n’est pas entre ${lo} et ${hi}.`},
        {h:`Non : il sort de l’intervalle [${lo} ; ${hi}], il y a une erreur`,ok:!inr,why:`${dec(m,2)} est bien entre ${lo} et ${hi}.`}]}}],
    explain:`N = ${N}, Σ nᵢxᵢ = ${S}, donc x̄ = ${S} ÷ ${N} ≈ ${dec(S/N,2)} livre(s), bien compris entre ${lo} et ${hi}.`})};

/* ===================== Chapitre : Statistiques à deux variables ===================== */
const sp1Cloud=(n=6)=>{const x0=pick([0,2,5,8,10]),h=pick([1,2,5]),a=pick([1.5,2,3,5,-2,-1.5,0.8]),b=R(5,40),xs=Array.from({length:n},(_,i)=>x0+i*h),ys=xs.map(x=>Math.round(a*x+b+R(-4,4))+(a<0?60:0));return{xs,ys}};
const gSp1G=()=>{const n=R(5,6),{xs,ys}=sp1Cloud(n),mx2=meanA(xs),my=meanA(ys);
  return nq({instr:'Calcule les coordonnées du point moyen G.',prompt:dtab([['xᵢ',...xs.map(num)],['yᵢ',...ys.map(num)]]),labels:['x̄ =','ȳ ='],t:[mx2,my],dp:2,
    explain:`x̄ = ${sumA(xs)} ÷ ${n} ≈ ${dec(mx2,2)} et ȳ = ${sumA(ys)} ÷ ${n} ≈ ${dec(my,2)} : G(${dec(mx2,2)} ; ${dec(my,2)}).`,
    hint:'G a pour coordonnées la moyenne des x et la moyenne des y.',diag:([u,v])=>near(u,my)&&near(v,mx2)?'stat-2var':null})};
const gSp1Interp=()=>{const x0=pick([0,2,5,1990,2010]),h=pick([1,2,5]),n=R(5,8),x1=x0+(n-1)*h,ins=Math.random()<.5,X=ins?x0+h*R(1,n-2)+(h>1?1:0):pick([x0-h*R(1,3),x1+h*R(1,4)]);
  return mcq('Cette estimation est-elle une interpolation ou une extrapolation ?',stx(`Une série a été relevée pour x allant de ${x0} à ${x1}. On utilise la droite d’ajustement pour estimer y quand x = ${X}.`),
    [{h:'Interpolation',ok:ins,tag:'sp1-extra'},{h:'Extrapolation',ok:!ins,tag:'sp1-extra'}],
    `Le domaine d’étude est [${x0} ; ${x1}]. ${X} ${ins?'est dans':'est en dehors de'} ce domaine : c’est une ${ins?'interpolation':'extrapolation'}${ins?'':', à utiliser avec prudence'}.`,
    'Interpolation : à l’intérieur du domaine des x observés. Extrapolation : en dehors.',true)};
const gSp1Mayer=()=>{const{xs,ys}=sp1Cloud(6),g1x=meanA(xs.slice(0,3)),g1y=meanA(ys.slice(0,3)),g2x=meanA(xs.slice(3)),g2y=meanA(ys.slice(3)),a=(g2y-g1y)/(g2x-g1x),b=g1y-a*g1x;
  return nq({instr:'Méthode de Mayer : G₁ est le point moyen des 3 premiers points, G₂ celui des 3 derniers. Donne l’équation y = ax + b de la droite (G₁G₂).',prompt:dtab([['xᵢ',...xs.map(num)],['yᵢ',...ys.map(num)]]),labels:['a =','b ='],t:[a,b],dp:2,
    explain:`G₁(${dec(g1x,2)} ; ${dec(g1y,2)}) et G₂(${dec(g2x,2)} ; ${dec(g2y,2)}). a = (${dec(g2y,2)} − ${dec(g1y,2)}) ÷ (${dec(g2x,2)} − ${dec(g1x,2)}) ≈ ${dec(a,2)}. b = ȳ₁ − a x̄₁ ≈ ${dec(b,2)}.`,
    hint:'Calcule G₁ et G₂, puis la pente (Δy ÷ Δx) et b avec l’un des deux points.',diag:([u])=>near(u,1/a)?'stat-2var':null})};
const gSp1Inv=()=>{const a=pick([2.1,1.5,0.8,3.2,-1.2,2.5]),b=pick([1.1,5,-3,12.5,20]),x=R(5,30),y=Math.round(a*x+b),X=(y-b)/a;
  return nq({instr:'Utilise la droite d’ajustement pour estimer x.',prompt:stx('Droite d’ajustement :')+lineStr(a,b)+stx(`Pour quelle valeur de x obtient-on y = ${y} ?`),labels:['x ≈'],t:[X],dp:1,
    explain:`On résout ${num(a)}x ${b<0?'−':'+'} ${num(Math.abs(b))} = ${y} : ${num(a)}x = ${y} ${b<0?'+':'−'} ${num(Math.abs(b))} = ${num(+(y-b).toFixed(2))}, donc x = ${num(+(y-b).toFixed(2))} ÷ ${num(a)} ≈ ${dec(X,1)}.`,
    hint:'Remplace y par sa valeur, puis isole x.',diag:([v])=>near(v,a*y+b,.06)?'stat-2var':near(v,(y+b)/a,.06)?'signe':null})};
const gSp1Exp=()=>{const a=pick([0.03,0.05,0.08,0.12,0.04]),b=pick([2.5,2.87,3.2,1.6,4.1]),X=pick([10,20,25,40,55]),y=Math.exp(a*X+b);
  return nq({instr:'Estime y.',prompt:stx(`On a posé z = ln y et ajusté le nuage (x ; z) par la droite z = ${num(a)}x + ${num(b)}. Estime y pour x = ${X}.`),labels:['y ≈'],t:[y],dp:1,
    explain:`z = ${num(a)} × ${X} + ${num(b)} = ${num(+(a*X+b).toFixed(4))}. Comme z = ln y, y = e<sup>z</sup> = e<sup>${num(+(a*X+b).toFixed(4))}</sup> ≈ ${dec(y,1)}. Autre écriture : y = e<sup>${num(b)}</sup> × e<sup>${num(a)}x</sup> ≈ ${dec(Math.exp(b),2)} e<sup>${num(a)}x</sup>.`,
    hint:'Calcule z avec la droite, puis reviens à y avec l’exponentielle.',diag:([v])=>near(v,Math.exp(a*X)+b,.06)||near(v,b*Math.exp(a*X),.06)?'sp1-exp':near(v,a*X+b,.06)?'sp1-exp':null})};

/* Raisonner : droite de Mayer et prévision */
const gSp1R10=()=>{let xs,ys;do({xs,ys}=sp1Cloud(6));while([[0,1,2,3,4,5],[0,2,4,1,3,5],[0,1,2,0,1,2,3,4,5]].some(g=>{const k=g.length-3,y1=meanA(g.slice(0,3).map(i=>ys[i])),y2=meanA(g.slice(3).map(i=>ys[i]));return Math.abs(y2-y1)<.5}));const x0=xs[0],x5=xs[5],step=xs[1]-xs[0],X=Math.random()<.5?x0+step*R(1,4)+(step>1?1:0):x5+step*R(1,3),ins=X>=x0&&X<=x5;
  const grp=c=>c==='alt'?[[0,2,4],[1,3,5]]:[[0,1,2],[3,4,5]],G=idx=>[meanA(idx.map(i=>xs[i])),meanA(idx.map(i=>ys[i]))],P=g=>`(${dec(g[0],2)} ; ${dec(g[1],2)})`;
  return chain({instr:'Construis une droite d’ajustement par la méthode de Mayer et fais une estimation.',prompt:dtab([['xᵢ',...xs.map(num)],['yᵢ',...ys.map(num)]])+stx(`On veut estimer y pour x = ${X}.`),
    steps:[
      {q:'Comment formes-tu les deux groupes de points ?',o:[
        {h:'Les 3 premiers et les 3 derniers points (x rangés)',ok:true,c:'half'},
        {h:'Un point sur deux : rangs 1, 3, 5 et rangs 2, 4, 6',c:'alt',why:'Chaque groupe doit réunir des x voisins, sinon G₁ et G₂ sont presque confondus et la droite n’a pas de sens.'},
        {h:'Tous les points ensemble, avec le seul point moyen G',c:'all',why:'Un seul point ne suffit pas à définir une droite : il en faut deux.'}]},
      {q:'Les points moyens des deux groupes sont…',o:prev=>{const c=prev[0].c,h=[G([0,1,2]),G([3,4,5])],al=[G([0,2,4]),G([1,3,5])],gl=G([0,1,2,3,4,5]);return[
        {h:`G₁${P(h[0])} et G₂${P(h[1])}`,ok:c!=='alt',g:h,why:'Ces points correspondent aux 3 premiers et aux 3 derniers points, pas à ton choix de groupes.'},
        {h:`G₁${P(al[0])} et G₂${P(al[1])}`,ok:c==='alt',g:al,why:'Ces points correspondent aux groupes « un point sur deux ».'},
        {h:`G₁${P(h[0])} et G${P(gl)}`,ok:false,g:[h[0],gl],why:'G est le point moyen de tout le nuage, pas de la seconde moitié.',tag:'stat-2var'}]}},
      {q:'Le coefficient directeur a de la droite (G₁G₂) vaut…',o:prev=>{const[g1,g2]=prev[1].g,dx=g2[0]-g1[0],dy=g2[1]-g1[1];return[
        {h:`(${dec(g2[1],2)} − ${dec(g1[1],2)}) ÷ (${dec(g2[0],2)} − ${dec(g1[0],2)}) ≈ ${dec(dy/dx,3)}`,ok:true,a:dy/dx,b:g1[1]-dy/dx*g1[0]},
        {h:`(${dec(g2[0],2)} − ${dec(g1[0],2)}) ÷ (${dec(g2[1],2)} − ${dec(g1[1],2)}) ≈ ${dec(dx/dy,3)}`,a:dx/dy,b:g1[1]-dx/dy*g1[0],why:'La pente est Δy ÷ Δx, pas Δx ÷ Δy.',tag:'stat-2var'},
        {h:`${dec(g2[1],2)} − ${dec(g1[1],2)} = ${dec(dy,3)}`,a:dy,b:g1[1]-dy*g1[0],why:'Il faut diviser la variation de y par la variation de x.',tag:'stat-2var'}]}},
      {q:`L’estimation pour x = ${X} est…`,o:prev=>{const{a,b}=prev[2];return[
        {h:`y ≈ ${dec(a,3)} × ${X} ${b<0?'−':'+'} ${dec(Math.abs(b),2)} ≈ ${dec(a*X+b,2)}`,ok:true},
        {h:`y ≈ ${dec(a,3)} × ${X} ≈ ${dec(a*X,2)}`,why:'Il ne faut pas oublier l’ordonnée à l’origine b de la droite.'},
        {h:`x ≈ (${X} ${b<0?'+':'−'} ${dec(Math.abs(b),2)}) ÷ ${dec(a,3)} ≈ ${dec((X-b)/a,2)}`,why:`On connaît x = ${X} et on cherche y : on remplace x dans l’équation, on ne résout pas.`}]}},
      {q:'Cette estimation est…',keep:true,o:[
        {h:`une interpolation : ${X} est dans le domaine [${x0} ; ${x5}]`,ok:ins,why:`${X} est en dehors de [${x0} ; ${x5}].`,tag:'sp1-extra'},
        {h:`une extrapolation : ${X} est hors du domaine [${x0} ; ${x5}]`,ok:!ins,why:`${X} est bien dans [${x0} ; ${x5}].`,tag:'sp1-extra'}]}],
    explain:(()=>{const g1=G([0,1,2]),g2=G([3,4,5]),a=(g2[1]-g1[1])/(g2[0]-g1[0]),b=g1[1]-a*g1[0];return`G₁${P(g1)} (3 premiers points) et G₂${P(g2)} (3 derniers). a = Δy ÷ Δx ≈ ${dec(a,3)}, b = ȳ₁ − a x̄₁ ≈ ${dec(b,2)}. Pour x = ${X} : y ≈ ${dec(a*X+b,2)}. ${ins?'Interpolation':'Extrapolation'}, car ${X} est ${ins?'dans':'hors de'} [${x0} ; ${x5}].`})()})};

/* Raisonner : ajustement exponentiel par changement de variable */
const gSp1R11=()=>{const a=pick([0.03,0.05,0.04,0.06]),b=pick([2.5,2.87,3.2,1.6]),X=pick([20,30,45,55,60,70]),ins=X<=50,F={A:Math.exp(a*X+b),B:Math.exp(a*X)+b,C:b*Math.exp(a*X),D:Math.log(a*X+b),E:10**(a*X+b)};
  return chain({instr:'Estime la population en construisant ton raisonnement.',prompt:stx(`La population y (en milliers) d’une ville a été relevée pendant 50 ans (x de 0 à 50). On a posé z = ln y et obtenu la droite d’ajustement z = ${num(a)}x + ${num(b)}. On cherche y pour x = ${X}.`),
    steps:[
      {q:'Comment revient-on de z à y ?',o:[
        {h:'y = e<sup>z</sup>',ok:true,c:'A'},{h:'y = ln z',c:'D',why:'La réciproque de ln est l’exponentielle : si z = ln y, alors y = e<sup>z</sup>.',tag:'sp1-exp'},
        {h:'y = 10<sup>z</sup>',c:'E',why:'ln est le logarithme népérien, de base e, pas le logarithme décimal : y = e<sup>z</sup>.',tag:'sp1-exp'}]},
      {q:'Donc y en fonction de x s’écrit…',o:prev=>[
        {h:mx(`y = e<sup>${num(a)}x + ${num(b)}</sup> = e<sup>${num(b)}</sup> × e<sup>${num(a)}x</sup>`),ok:prev[0].c==='A',c:'A',why:'Ce n’est pas cohérent avec ton choix précédent.'},
        {h:mx(`y = e<sup>${num(a)}x</sup> + ${num(b)}`),c:'B',why:'e<sup>ax + b</sup> n’est pas e<sup>ax</sup> + b : c’est e<sup>b</sup> × e<sup>ax</sup>.',tag:'sp1-exp'},
        {h:mx(`y = ${num(b)} × e<sup>${num(a)}x</sup>`),c:'C',why:'Le facteur devant l’exponentielle est e<sup>b</sup>, pas b.',tag:'sp1-exp'},
        {h:mx(`y = ln(${num(a)}x + ${num(b)})`),ok:prev[0].c==='D',c:'D',why:'Cette écriture vient d’une erreur sur la réciproque de ln.',tag:'sp1-exp'},
        {h:mx(`y = 10<sup>${num(a)}x + ${num(b)}</sup>`),ok:prev[0].c==='E',c:'E',why:'Cette écriture vient d’une confusion entre ln et log.',tag:'sp1-exp'}]},
      {q:`Pour x = ${X}, on obtient…`,o:prev=>['A','B','C','D','E'].map(c=>({h:`y ≈ ${dec(F[c],c==='E'?0:2)}`,ok:c===prev[1].c,why:'Ce n’est pas la valeur donnée par la formule choisie à l’étape précédente.'}))},
      {q:'Que penser de cette estimation ?',keep:true,o:[
        {h:`Interpolation : ${X} est dans le domaine étudié, elle est assez fiable`,ok:ins,why:`${X} dépasse 50 : on sort du domaine étudié.`,tag:'sp1-extra'},
        {h:`Extrapolation : ${X} est hors du domaine étudié, prudence`,ok:!ins,why:`${X} est entre 0 et 50 : c’est une interpolation.`,tag:'sp1-extra'}]}],
    explain:`z = ln y donne y = e<sup>z</sup> = e<sup>${num(a)}x + ${num(b)}</sup> = e<sup>${num(b)}</sup> × e<sup>${num(a)}x</sup> ≈ ${dec(Math.exp(b),2)} e<sup>${num(a)}x</sup>. Pour x = ${X} : y ≈ ${dec(F.A,2)} milliers. ${ins?'Interpolation':'Extrapolation, à prendre avec prudence'}.`})};

/* ===================== Déclaration des chapitres ===================== */
ANA_UNITS.push(
  {id:'sp-prop',tr:'sp',src:'Proportionnalité et ratios',name:'Proportionnalité',sub:'Coefficient, produit en croix, ratios, échelles, vitesses',glyph:'×<i>k</i>',tone:'c',skills:[
    SKA('sp.prop.rec','Reconnaître la proportionnalité',gSp1Rec,1),SKA('sp.prop.coef','Coefficient de proportionnalité',gSp1Coef,1),
    SKA('sp.prop.unit','Passage à l’unité',gSp1Unit,1),SKA('sp.prop.q4','Quatrième proportionnelle',gSp1Q4,1),
    SKA('sp.prop.ratio','Utiliser un ratio',gSp1Ratio,1),SKA('sp.prop.share','Partager selon un ratio',gSp1Share,2),
    SKA('sp.prop.ech','Échelles',gSp1Ech,2),SKA('sp.prop.vit','Vitesse moyenne',gSp1Vit,2),
    SKA('sp.prop.r1','Raisonner : est-ce proportionnel ?',gSp1R1,2),SKA('sp.prop.r3','Raisonner : vitesse et durée en h min',gSp1R3,2),
    SKA('sp.prop.r2','Raisonner : partage avec un reste',gSp1R2,3)]},
  {id:'sp-pourc',tr:'sp',src:'Pourcentages et évolutions',name:'Pourcentages',sub:'Proportions, coefficients multiplicateurs, évolutions',glyph:'%',tone:'x',skills:[
    SKA('sp.pourc.mental','Pourcentages de tête',gSp1Mental,1),SKA('sp.pourc.app','Appliquer un pourcentage',gSp1App,1),
    SKA('sp.pourc.prop','Calculer une proportion',gSp1Prop,1),SKA('sp.pourc.cm','Coefficient multiplicateur',gSp1Cm,1),
    SKA('sp.pourc.evo','Appliquer une évolution',gSp1Evo,1),SKA('sp.pourc.taux','Taux d’évolution',gSp1Taux,2),
    SKA('sp.pourc.pdp','Pourcentage de pourcentage',gSp1Pdp,2),SKA('sp.pourc.succ','Évolutions successives',gSp1Succ,2),
    SKA('sp.pourc.recip','Évolution réciproque',gSp1Recip,3),SKA('sp.pourc.r4','Raisonner : prix avant réduction',gSp1R4,2),
    SKA('sp.pourc.r6','Raisonner : prix hors taxe',gSp1R6,2),SKA('sp.pourc.r5','Raisonner : évolution globale',gSp1R5,3)]},
  {id:'sp-stat1',tr:'sp',src:'Statistiques à une variable',name:'Statistiques à une variable',sub:'Fréquences, moyenne, médiane, quartiles, écart-type',glyph:'<i>x̄</i>',tone:'sq',
   w2:[['Étaler, décaler','wSpread','Étire la série ou décale-la : regarde ce qui arrive à la moyenne et à l’écart-type (linéarité de la moyenne).']],skills:[
    SKA('sp.st1.freq','Fréquence',gSp1Freq,1),SKA('sp.st1.mean','Moyenne',gStMean,1),SKA('sp.st1.wmean','Moyenne pondérée',gStWMean,1),
    SKA('sp.st1.med','Médiane',gStMed,1),SKA('sp.st1.range','Étendue',gStRange,1),SKA('sp.st1.angle','Diagramme circulaire',gSp1Angle,1),
    SKA('sp.st1.quart','Quartiles',gStQuart,2),SKA('sp.st1.lin','Linéarité de la moyenne',gSp1Lin,2),SKA('sp.st1.cls','Moyenne d’une série en classes',gSp1Cls,2),
    SKA('sp.st1.r8','Raisonner : moyenne pondérée',gSp1R8,2),SKA('sp.st1.r7','Raisonner : médiane et quartile',gSp1R7,2),SKA('sp.st1.var','Variance et écart-type',gSp1Var,3)]},
  {id:'sp-stat2',tr:'sp',src:'Statistiques à deux variables',name:'Deux variables',sub:'Nuage de points, ajustement affine, corrélation',glyph:'<i>r</i>',tone:'c',skills:[
    SKA('sp.st2.g','Point moyen',gSp1G,1),SKA('sp.st2.interp','Interpolation ou extrapolation',gSp1Interp,1),SKA('sp.st2.pred','Prédiction et résidu',gStPred,1),
    SKA('sp.st2.rint','Interpréter r',gStRint,1),SKA('sp.st2.mayer','Méthode de Mayer',gSp1Mayer,2),SKA('sp.st2.inv','Estimer x sur la droite',gSp1Inv,2),
    SKA('sp.st2.cov','Covariance',gStCov,2),SKA('sp.st2.reg','Droite des moindres carrés',gStReg,2),SKA('sp.st2.corr','Coefficient de corrélation',gStCorr,2),
    SKA('sp.st2.r10','Raisonner : droite de Mayer et prévision',gSp1R10,3),SKA('sp.st2.exp','Ajustement exponentiel',gSp1Exp,3),SKA('sp.st2.r11','Raisonner : changement de variable',gSp1R11,3)]});
