/* ===================== STA001 · Tests du khi-deux et d’adéquation ===================== */
Object.assign(ANA_ERR,{
  's1kh-formule':{label:'Formule du χ²',tip:'χ² = Σ (Oᵢ − Tᵢ)²/Tᵢ : on divise par l’effectif THÉORIQUE, et on élève l’écart au carré.'},
  's1kh-eff':{label:'Effectif ou probabilité ?',tip:'L’effectif théorique est Tᵢ = n × pᵢ : on multiplie la probabilité par l’effectif total.'},
  's1kh-ddl':{label:'Degrés de liberté',tip:'ν = (nombre de classes après regroupement) − 1 − (nombre de paramètres estimés sur l’échantillon).'},
  's1kh-cond':{label:'Condition Tᵢ ≥ 5',tip:'Chaque effectif THÉORIQUE doit valoir au moins 5 ; sinon on regroupe des classes voisines.'},
  's1kh-dec':{label:'Décision du χ²',tip:'Le test du χ² est unilatéral à droite : on rejette l’ajustement si χ²obs dépasse le quantile χ²₁₋α(ν).'}});
const S1KH_Q95=[0,3.841,5.991,7.815,9.488,11.07,12.592,14.067,15.507,16.919,18.307];
const S1KH_Q99=[0,6.635,9.21,11.345,13.277,15.086,16.812,18.475,20.09,21.666,23.209];
/** Γ(h) pour h entier ou demi-entier */
const S1KH_gam=h=>h===1?1:Math.abs(h-.5)<1e-9?Math.sqrt(Math.PI):(h-1)*S1KH_gam(h-1);
const S1KH_dens=nu=>{const c=1/(2**(nu/2)*S1KH_gam(nu/2));return x=>x<=0?(nu===2?.5:0):c*x**(nu/2-1)*Math.exp(-x/2)};
const S1KH_g=()=>{const u=Math.random()||1e-9,v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
/** Effectifs observés simulés autour des théoriques, de total n */
const S1KH_obs=(T,sc)=>{const n=Math.round(T.reduce((a,b)=>a+b,0));for(let it=0;it<50;it++){const O=T.map(t=>Math.max(0,Math.round(t+sc*Math.sqrt(t)*S1KH_g())));const d=n-O.reduce((a,b)=>a+b,0),i=O.indexOf(Math.max(...O));O[i]+=d;if(O[i]>=0)return O}return T.map(Math.round)};
const S1KH_chi=(O,T)=>O.reduce((s,o,i)=>s+(o-T[i])**2/T[i],0);
/** Diagramme en barres : observés (pleins) et théoriques (contour pointillé) */
const S1KH_bars=(lab,O,T,seuil)=>{const k=lab.length,top=Math.max(...(O||[0]),...(T||[0]),seuil||0)*1.18,g=gp({W:300,H:150,x0:-.6,x1:k-.4,y0:-top*.14,y1:top,pd:8});
  g.seg(-.6,0,k-.4,0,'var(--muted)',1.2);
  lab.forEach((l,i)=>{if(O)g.rect(i-(T?.36:.3),0,i+(T?0:.3),O[i],'var(--t-sq)',.75);if(T)g.raw('').rect(i+(O?0:-.3),0,i+(O?.36:.3),T[i],'var(--t-c)',.25,'var(--t-c)');
    g.text(i,0,l,'var(--ink)','middle',0,13,10,false);if(O)g.text(i-(T?.18:0),O[i],num(O[i]),'var(--t-sq)','middle',0,-3,9)});
  if(seuil)g.seg(-.6,seuil,k-.4,seuil,'var(--bad)',1.6,'5 4').text(k-.45,seuil,'T = 5','var(--bad)','end',0,-4,10);
  return`<div class="qfig">${g.done(O&&T?'Effectifs observés (pleins) et théoriques (clairs)':O?'Effectifs observés':'Effectifs théoriques')}</div>`};
/** Densité du χ² à ν ddl, région critique et χ² observé */
const S1KH_fig=(nu,c,obs)=>{const f=S1KH_dens(nu),x1=Math.max(c*1.7,(obs||0)*1.15,10),top=(nu===1?.5:nu===2?.5:f(Math.max(nu-2,.01))*1.25)+.02,g=gp({W:300,H:140,x0:0,x1,y0:-top*.12,y1:top,pd:8});
  g.area(f,()=>0,c,x1,'var(--bad)',.3).seg(0,0,x1,0,'var(--muted)',1.2).fn(f,'var(--ink)',2,'',nu===1?.05:0,x1).text(c,0,num(c),'var(--bad)','middle',0,13,10);
  if(obs!=null)g.seg(obs,0,obs,top*.9,'var(--t-sq)',2.4).text(obs,top*.9,'χ²obs','var(--t-sq)','middle',0,-2,10);
  g.text(x1*.97,top*.85,`χ² à ${nu} ddl`,'var(--muted)','end',0,0,10,false);
  return`<div class="qfig">${g.done('Densité du khi-deux et région critique')}</div>`};
const S1KH_DIST=[
  {t:'On lance un dé {n} fois pour vérifier qu’il est équilibré.',l:['1','2','3','4','5','6'],p:[1,1,1,1,1,1].map(x=>x/6),n:[60,120,180,240,300],h:'chaque face a la probabilité 1/6'},
  {t:'Un service relève {n} absences selon le jour de la semaine. On se demande si elles sont équiréparties.',l:['Lun','Mar','Mer','Jeu','Ven'],p:[.2,.2,.2,.2,.2],n:[100,150,200,250],h:'chaque jour a la probabilité 1/5'},
  {t:'Croisement de pois de Mendel : la théorie prévoit les proportions 9/16, 3/16, 3/16, 1/16. On observe {n} plants.',l:['JL','JR','VL','VR'],p:[9,3,3,1].map(x=>x/16),n:[160,320,480],h:'proportions 9/16, 3/16, 3/16, 1/16'},
  {t:'Un fabricant annonce 30 % de bonbons rouges, 20 % de jaunes, 20 % de verts et 30 % d’oranges. On compte {n} bonbons.',l:['Rouge','Jaune','Vert','Orange'],p:[.3,.2,.2,.3],n:[100,150,200,250],h:'proportions 0,3 ; 0,2 ; 0,2 ; 0,3'},
  {t:'On suppose que les naissances se répartissent uniformément entre les quatre saisons. On relève {n} naissances.',l:['Hiver','Print.','Été','Aut.'],p:[.25,.25,.25,.25],n:[200,240,400],h:'chaque saison a la probabilité 1/4'}];
const S1KH_draw=(sc)=>{const d=pick(S1KH_DIST),n=pick(d.n),T=d.p.map(p=>n*p),O=S1KH_obs(T,sc??pick([.5,1,1.8]));return{d,n,T,O,chi:S1KH_chi(O,T)}};
const S1KH_tab=(d,O,T)=>dtab([['Classe',...d.l],['Observé Oᵢ',...O.map(num)]].concat(T?[['Théorique Tᵢ',...T.map(t=>dec(t,2))]]:[]));
/* 1. Effectif théorique */
const gS1KhTheo=()=>{const{d,n,T,O}=S1KH_draw(),i=R(0,d.l.length-1);
  return nq({instr:`Calcule l’effectif théorique de la classe « ${d.l[i]} ».`,prompt:stx(d.t.replace('{n}',n)+` Sous H₀ : ${d.h}.`)+S1KH_tab(d,O)+S1KH_bars(d.l,O),labels:[`T(${d.l[i]}) =`],t:[T[i]],dp:2,
    explain:`Tᵢ = n × pᵢ = ${n} × ${dec(d.p[i],4)} = ${dec(T[i],2)}. C’est l’effectif qu’on attendrait « en moyenne » si H₀ était vraie ; on le compare à l’observé ${O[i]}.`,
    hint:'Effectif théorique = effectif total × probabilité de la classe sous H₀.',diag:([v])=>near(v,d.p[i],.006)?'s1kh-eff':null})};
/* 2. Contribution d’une classe */
const gS1KhContrib=()=>{const{d,n,T,O}=S1KH_draw(),i=R(0,d.l.length-1),c=(O[i]-T[i])**2/T[i];
  return nq({instr:`Calcule la contribution de la classe « ${d.l[i]} » au χ².`,prompt:stx(d.t.replace('{n}',n))+S1KH_tab(d,O,T)+S1KH_bars(d.l,O,T)+mx('contribution = (Oᵢ − Tᵢ)²/Tᵢ'),labels:['(Oᵢ − Tᵢ)²/Tᵢ ='],t:[c],dp:2,
    explain:`Écart : ${O[i]} − ${dec(T[i],2)} = ${dec(O[i]-T[i],2)}. Au carré : ${dec((O[i]-T[i])**2,3)}. Divisé par Tᵢ = ${dec(T[i],2)} : ${dec(c,2)}. Une classe contribue d’autant plus que l’écart est grand par rapport à l’effectif attendu.`,
    hint:'Écart, puis carré, puis division par l’effectif théorique.',diag:([v])=>O[i]>0&&near(v,(O[i]-T[i])**2/O[i],.006)?'s1kh-formule':near(v,(O[i]-T[i])/T[i],.006)?'s1kh-formule':null})};
/* 3. Degrés de liberté */
const S1KH_DDL=[[k=>`Test d’équirépartition d’un dé : ${k} classes, aucun paramètre estimé.`,0,[6,6]],[k=>`Ajustement à une loi de Poisson dont λ est estimé par la moyenne observée ; après regroupement, il reste ${k} classes.`,1,[4,7]],
  [k=>`Ajustement à une loi normale dont μ et σ sont estimés sur l’échantillon ; ${k} classes.`,2,[5,9]],[k=>`Ajustement à une loi binomiale B(4 ; 0,5) entièrement connue ; ${k} classes.`,0,[5,5]],
  [k=>`Ajustement à une loi binomiale B(5 ; p), p étant estimé par la fréquence observée ; ${k} classes après regroupement.`,1,[4,6]],[k=>`Vérifier des proportions annoncées par un fabricant (aucun paramètre estimé) ; ${k} couleurs.`,0,[3,7]]];
const gS1KhDdl=()=>{const[f,r,[a,b]]=pick(S1KH_DDL),k=R(a,b),nu=k-1-r;
  return nq({instr:'Combien de degrés de liberté pour ce test du χ² ?',prompt:stx(f(k))+mx('ν = k − 1 − r'),labels:['ν ='],t:[nu],
    explain:`ν = k − 1 − r = ${k} − 1 − ${r} = ${nu}. Le « − 1 » vient de la contrainte Σ Oᵢ = Σ Tᵢ = n ; chaque paramètre estimé sur les données (${r}) coûte un degré de plus.`,
    hint:'Nombre de classes, moins 1, moins le nombre de paramètres estimés.',diag:([v])=>near(v,k,1e-6)||near(v,k-1,1e-6)&&r>0?'s1kh-ddl':null})};
/* 4. Calcul du χ² */
const gS1KhStat=()=>{const{d,n,T,O,chi}=S1KH_draw();
  return nq({instr:'Calcule la valeur observée du χ².',prompt:stx(d.t.replace('{n}',n))+S1KH_tab(d,O,T)+S1KH_bars(d.l,O,T)+mx('χ² = Σ (Oᵢ − Tᵢ)²/Tᵢ'),labels:['χ² ='],t:[chi],dp:2,tol:.02,
    explain:`Contributions : ${O.map((o,i)=>dec((o-T[i])**2/T[i],3)).join(' + ')} = ${dec(chi,2)}.`,
    hint:'Calcule (Oᵢ − Tᵢ)²/Tᵢ pour chaque classe, puis additionne.',diag:([v])=>O.every(o=>o>0)&&near(v,O.reduce((s,o,i)=>s+(o-T[i])**2/o,0),.02)?'s1kh-formule':null})};
/* 5. Décision */
const gS1KhDec=()=>{const k=R(4,9),r=pick([0,0,1,2]),nu=k-1-r;if(nu<2||nu>9)return gS1KhDec();const al=pick([.05,.01]),Q=al===.05?S1KH_Q95:S1KH_Q99,c=Q[nu],obs=+(c*pick([.35,.6,.85,.95,1.08,1.3,1.7])).toFixed(2),rej=obs>c;
  return mcq('Quelle décision prendre ?',stx(`Test d’ajustement du χ² à ${k} classes, ${r?`${r} paramètre${r>1?'s':''} estimé${r>1?'s':''} sur l’échantillon`:'aucun paramètre estimé'}, au risque ${num(al*100)} %. Toutes les classes ont Tᵢ ≥ 5. On obtient χ²obs = ${num(obs)}.`)+
      dtab([['ν',nu-1,nu,nu+1],['χ²₀,₉₅(ν)',...[nu-1,nu,nu+1].map(v=>num(S1KH_Q95[v]))],['χ²₀,₉₉(ν)',...[nu-1,nu,nu+1].map(v=>num(S1KH_Q99[v]))]])+S1KH_fig(nu,c),
    [{h:'On rejette H₀ : la loi proposée ne convient pas',ok:rej,tag:'s1kh-dec'},{h:'On ne rejette pas H₀ : l’ajustement est acceptable',ok:!rej,tag:'s1kh-dec'},{h:'H₀ est démontrée : les données suivent exactement la loi',tag:'s1te-h0'}],
    `ν = ${k} − 1 − ${r} = ${nu}. Valeur critique χ²${al===.05?'₀,₉₅':'₀,₉₉'}(${nu}) = ${num(c)}. χ²obs = ${num(obs)} ${rej?'>':'≤'} ${num(c)} : ${rej?'on rejette l’ajustement':'on ne rejette pas l’ajustement (sans le démontrer)'}.`,'Calcule ν, lis la valeur critique, puis compare.')};
/* 6. Placer χ²obs */
const gS1KhPlace=()=>{const k=pick([3,4]),n=pick(k===3?[60,90,120,150]:[80,100,120,200]),T=Array(k).fill(n/k),O=S1KH_obs(T,pick([.6,1.2,1.8])),chi=S1KH_chi(O,T),nu=k-1;
  if(chi>14.5||chi<.3)return gS1KhPlace();const lab=k===3?['A','B','C']:['A','B','C','D'];
  return pointQ({instr:'Calcule χ²obs et place-le sur l’axe (à 0,3 près).',prompt:stx(`Trois${k===4?' (ici quatre)':''} modèles d’un produit devraient se vendre autant les uns que les autres. Sur ${n} ventes :`)+dtab([['Modèle',...lab],['Observé',...O]])+stx(`Valeur critique à 5 % : χ²₀,₉₅(${nu}) = ${num(S1KH_Q95[nu])}.`),
    nom:'χ²',x:[0,16],y:[-1.2,4.6],snap:.25,tol:.3,cible:[chi,0],fond:{ligne:true,pas:.5,etiq:2,f:[nu===2?'4*exp(-x/2)':'16*sqrt(x)*exp(-x/2)/2.5066']},
    explain:`Tᵢ = ${n}/${k} = ${dec(n/k,2)}. χ² = ${O.map(o=>`(${o} − ${dec(n/k,2)})²/${dec(n/k,2)}`).join(' + ')} ≈ ${dec(chi,2)}. ν = ${k} − 1 = ${nu}. ${chi>S1KH_Q95[nu]?`χ²obs dépasse ${num(S1KH_Q95[nu])} : on rejette l’équirépartition.`:`χ²obs est sous ${num(S1KH_Q95[nu])} : on ne rejette pas l’équirépartition.`}`,
    hint:'Tᵢ = n/k pour chaque modèle, puis Σ (Oᵢ − Tᵢ)²/Tᵢ.'})};
/* 7. Condition Tᵢ ≥ 5 */
const gS1KhCond=()=>{const lam=pick([1,1.5,2,2.5]),N=pick([40,60,100,300,500]),lab=['0','1','2','3','4','≥ 5'],T=[0,1,2,3,4].map(k=>N*sPoiP(lam,k));T.push(N-T.reduce((a,b)=>a+b,0));const O=S1KH_obs(T,.8),low=T.some(t=>t<5);
  return mcq('Que faire avant de calculer le χ² ?',stx(`Ajustement à une loi de Poisson de paramètre λ = ${num(lam)} sur ${N} observations. Effectifs :`)+dtab([['k',...lab],['Observé',...O],['Théorique',...T.map(t=>dec(t,2))]])+S1KH_bars(lab,null,T,5),
    [{h:'Regrouper les classes voisines dont l’effectif théorique est inférieur à 5',ok:low,tag:'s1kh-cond'},{h:'Rien : le test s’applique tel quel',ok:!low,tag:'s1kh-cond'},
      {h:'Supprimer les classes dont l’effectif théorique est inférieur à 5',tag:'s1kh-cond'},{h:'Regrouper les classes dont l’effectif observé est inférieur à 5',tag:'s1kh-cond'}],
    low?`Certains Tᵢ sont inférieurs à 5 (sous la ligne rouge) : l’approximation par la loi du χ² n’est pas fiable. On les fusionne avec leurs voisines (en général la queue de distribution), sans rien supprimer. Les degrés de liberté se comptent après regroupement.`:'Tous les effectifs théoriques valent au moins 5 : la condition porte sur les Tᵢ, pas sur les Oᵢ. Le test s’applique.','La condition porte sur les effectifs théoriques.')};
/* 8. Effectif théorique pour une loi binomiale ou de Poisson */
const gS1KhLoi=()=>{if(Math.random()<.5){const lam=pick([.8,1.2,1.5,2,2.5,3]),N=pick([100,120,150,200,250]),k=R(0,4),T=N*sPoiP(lam,k),Ts=[0,1,2,3,4].map(j=>N*sPoiP(lam,j));
    return nq({instr:`Calcule l’effectif théorique pour k = ${k}.`,prompt:stx(`On compte les pannes par jour d’un réseau pendant ${N} jours. On ajuste une loi de Poisson de paramètre λ = ${num(lam)} (moyenne observée).`)+S1KH_bars(['0','1','2','3','4'],null,Ts.map(t=>+t.toFixed(1)))+mx(`T<sub>k</sub> = N × e<sup>−λ</sup> λ<sup>k</sup>/k!`),
      labels:[`T(${k}) =`],t:[T],dp:2,tol:.02,explain:`P(X = ${k}) = e<sup>−${num(lam)}</sup> × ${num(lam)}<sup>${k}</sup>/${k}! ≈ ${dec(sPoiP(lam,k),4)}. T = ${N} × ${dec(sPoiP(lam,k),4)} ≈ ${dec(T,2)}.`,
      hint:'Calcule P(X = k) avec la loi de Poisson, puis multiplie par N.',diag:([v])=>near(v,sPoiP(lam,k),.006)?'s1kh-eff':null})}
  const m=pick([3,4,5]),p=pick([.3,.4,.5,.6]),N=pick([80,100,160,200]),k=R(0,m),P=Cnk(m,k)*p**k*(1-p)**(m-k),T=N*P;
  return nq({instr:`Calcule l’effectif théorique pour k = ${k}.`,prompt:stx(`On observe ${N} lots de ${m} pièces et on compte les pièces conformes par lot. On ajuste une loi binomiale B(${m} ; ${num(p)}).`)+S1KH_bars(Array.from({length:m+1},(_,j)=>String(j)),null,Array.from({length:m+1},(_,j)=>+(N*Cnk(m,j)*p**j*(1-p)**(m-j)).toFixed(1)))+mx(`T<sub>k</sub> = N × C(${m} ; k) p<sup>k</sup>(1 − p)<sup>${m}−k</sup>`),
    labels:[`T(${k}) =`],t:[T],dp:2,tol:.02,explain:`P(X = ${k}) = C(${m} ; ${k}) × ${num(p)}<sup>${k}</sup> × ${num(+(1-p).toFixed(1))}<sup>${m-k}</sup> = ${Cnk(m,k)} × … ≈ ${dec(P,4)}. T = ${N} × ${dec(P,4)} ≈ ${dec(T,2)}.`,
    hint:'Probabilité binomiale de k succès, puis multiplie par N.',diag:([v])=>near(v,P,.006)?'s1kh-eff':null})};
/* 9. Droite de Henry */
const gS1KhHenry=()=>{const s=pick([2,4,5,10]),mu=pick([20,30,40,50,60,80,100])+pick([0,s/2]),xs=[-1.5,-1,-.5,0,.5,1,1.5].map(d=>mu+d*s),zs=xs.map(x=>+((x-mu)/s+R(-6,6)/100).toFixed(2));
  const xm=meanA(xs),zm=meanA(zs),b1=xs.reduce((a,x,i)=>a+(x-xm)*(zs[i]-zm),0)/xs.reduce((a,x)=>a+(x-xm)**2,0),b0=zm-b1*xm,muh=-b0/b1,sh=1/b1;
  return nq({instr:'Estime μ et σ à partir de la droite de Henry.',prompt:stx('Pour chaque borne de classe xᵢ, on a calculé la fréquence cumulée Fᵢ puis zᵢ = Φ⁻¹(Fᵢ). Les points sont presque alignés : la loi normale est plausible. La droite tracée a pour équation z = (x − μ)/σ.')+
      dtab([['xᵢ',...xs.map(num)],['zᵢ',...zs.map(num)]])+FIG.plot({x:[mu-2*s,mu+2*s],y:[-2.2,2.2],pas:s/2,pasy:.5,etiq:s,etiqy:1,f:[`(x-${muh.toFixed(4)})/${sh.toFixed(4)}`],pts:xs.map((x,i)=>[x,zs[i]]),titre:'Droite de Henry'}),
    labels:['μ ≈','σ ≈'],t:[muh,sh],dp:1,tol:Math.max(.25,.08*s),explain:`La droite coupe l’axe z = 0 en x ≈ ${dec(muh,1)} : c’est μ (la médiane d’une loi normale). Quand x augmente de σ, z augmente de 1 : la pente vaut 1/σ ≈ ${dec(b1,3)}, donc σ ≈ ${dec(sh,1)}.`,
    hint:'μ : abscisse du point où z = 0. σ : déplacement en x pour que z passe de 0 à 1.',diag:([a,b])=>near(b,b1,.05)?'calc':null})};
/* 10. Raisonner : test d’équirépartition */
const gS1KhR1=()=>{const d=pick(S1KH_DIST.filter(x=>x.p.every(p=>p===x.p[0]))),n=pick(d.n),k=d.l.length,T=n/k,O=S1KH_obs(Array(k).fill(T),pick([.6,1.2,2]));
  const nus=[k-2,k-1,k];
  return chain({instr:'Teste l’équirépartition au risque 5 %, étape par étape.',prompt:stx(d.t.replace('{n}',n))+dtab([['Classe',...d.l],['Observé',...O]])+dtab([['ν',...nus],['χ²₀,₉₅(ν)',...nus.map(v=>num(S1KH_Q95[v]))]])+S1KH_bars(d.l,O),
    steps:[
      {q:'Effectif théorique de chaque classe :',o:[
        {h:`Tᵢ = ${n}/${k} = ${dec(T,2)}`,ok:true,T,why:''},
        {h:`Tᵢ = 1/${k} ≈ ${dec(1/k,3)}`,T:1/k,why:'1/k est la probabilité de la classe ; l’effectif théorique est n × 1/k.',tag:'s1kh-eff'},
        {h:`Tᵢ = ${n}/${k-1} ≈ ${dec(n/(k-1),2)}`,T:n/(k-1),why:`On répartit ${n} observations entre ${k} classes, pas ${k-1}.`,tag:'s1kh-eff'}]},
      {q:'Valeur observée de la statistique :',o:prev=>{const t=prev[0].T,a=O.reduce((s,o)=>s+(o-t)**2/t,0),b=O.reduce((s,o)=>s+(o-t)**2/Math.max(o,1),0),c=O.reduce((s,o)=>s+(o-t)/t,0);return[
        {h:`Σ (Oᵢ − Tᵢ)²/Tᵢ ≈ ${dec(a,2)}`,ok:true,v:a,why:''},
        {h:`Σ (Oᵢ − Tᵢ)²/Oᵢ ≈ ${dec(b,2)}`,v:b,why:'On divise par l’effectif théorique Tᵢ, pas par l’observé.',tag:'s1kh-formule'},
        {h:`Σ (Oᵢ − Tᵢ)/Tᵢ ≈ ${dec(c,2)}`,v:c,why:'Sans le carré, les écarts positifs et négatifs se compensent.',tag:'s1kh-formule'}]}},
      {q:'Nombre de degrés de liberté :',o:[
        {h:`ν = ${k} − 1 = ${k-1}`,ok:true,q:S1KH_Q95[k-1],why:''},
        {h:`ν = ${k}`,q:S1KH_Q95[k],why:'Les effectifs sont liés par Σ Oᵢ = n : on retire 1.',tag:'s1kh-ddl'},
        {h:`ν = ${k} − 2 = ${k-2}`,q:S1KH_Q95[k-2],why:'Aucun paramètre n’est estimé ici : on ne retire que 1.',tag:'s1kh-ddl'}]},
      {q:'Décision :',o:prev=>{const v=prev[1].v,q=prev[2].q,rej=v>q;return[
        {h:`χ²obs ${rej?'>':'≤'} ${num(q)} : on rejette l’équirépartition`,ok:rej,why:'La statistique ne dépasse pas la valeur critique : on ne rejette pas.',tag:'s1kh-dec'},
        {h:`χ²obs ${rej?'>':'≤'} ${num(q)} : on ne rejette pas l’équirépartition`,ok:!rej,why:'La statistique dépasse la valeur critique : on rejette.',tag:'s1kh-dec'},
        {h:'L’équirépartition est démontrée',why:'Un test ne démontre jamais H₀.',tag:'s1te-h0'}]}}],
    explain:`Tᵢ = ${dec(T,2)} ; χ²obs = Σ (Oᵢ − Tᵢ)²/Tᵢ ≈ ${dec(S1KH_chi(O,Array(k).fill(T)),2)} ; ν = ${k-1} ; χ²₀,₉₅(${k-1}) = ${num(S1KH_Q95[k-1])}. ${S1KH_chi(O,Array(k).fill(T))>S1KH_Q95[k-1]?'On rejette l’équirépartition au risque 5 %.':'On ne rejette pas l’équirépartition.'}`})};
/* 11. Raisonner : ajustement à une loi de Poisson */
const gS1KhR2=()=>{const lam=pick([1,1.2,1.5]),N=pick([100,120,150]),T0=[0,1,2,3,4].map(k=>N*sPoiP(lam,k));T0.push(N-T0.reduce((a,b)=>a+b,0));const O0=S1KH_obs(T0,pick([.6,1.2,2.2]));
  const T=T0.slice(),O=O0.slice();while(T[T.length-1]<5&&T.length>2){const t=T.pop(),o=O.pop();T[T.length-1]+=t;O[O.length-1]+=o}
  const kk=T.length,chi=S1KH_chi(O,T),lab=['0','1','2','3','4','≥ 5'];if(kk<4)return gS1KhR2();
  return chain({instr:'Teste l’ajustement à une loi de Poisson au risque 5 %, étape par étape.',
    prompt:stx(`On compte des appels par minute sur ${N} minutes. La moyenne observée vaut x̄ = ${num(lam)}.`)+dtab([['k',...lab],['Observé',...O0]])+S1KH_bars(lab,O0)+
      stx(`Après regroupement éventuel, on obtient χ²obs ≈ ${dec(chi,2)}.`)+dtab([['ν',1,2,3,4,5],['χ²₀,₉₅(ν)',...[1,2,3,4,5].map(v=>num(S1KH_Q95[v]))]]),
    steps:[
      {q:'Quel paramètre λ choisir ?',o:[
        {h:`λ = x̄ = ${num(lam)}`,ok:true,l:lam,why:''},
        {h:`λ = 1/x̄ ≈ ${dec(1/lam,3)}`,l:1/lam,why:'Pour la loi de Poisson, E(X) = λ : on estime λ par la moyenne. 1/x̄ servirait pour une loi exponentielle.'},
        {h:`λ = ${N}/6 ≈ ${dec(N/6,2)}`,l:N/6,why:'λ est le nombre moyen d’appels par minute, pas un effectif moyen par classe.'}]},
      {q:'Effectif théorique de la classe k = 0 :',o:prev=>{const l=prev[0].l;return[
        {h:`T₀ = ${N} × e<sup>−${dec(l,3)}</sup> ≈ ${dec(N*Math.exp(-l),2)}`,ok:true,why:''},
        {h:`T₀ = e<sup>−${dec(l,3)}</sup> ≈ ${dec(Math.exp(-l),4)}`,why:'C’est la probabilité P(X = 0) : il faut la multiplier par N.',tag:'s1kh-eff'},
        {h:`T₀ = ${N} × ${dec(l,3)} × e<sup>−${dec(l,3)}</sup> ≈ ${dec(N*l*Math.exp(-l),2)}`,why:'Pour k = 0, λ⁰/0! = 1 : il n’y a pas de facteur λ.',tag:'s1kh-eff'}]}},
      {q:'Classes et degrés de liberté :',o:[
        {h:`On regroupe la queue (Tᵢ < 5) : ${kk} classes, ν = ${kk} − 2 = ${kk-2}`,ok:true,nu:kk-2,why:''},
        {h:`On regroupe la queue (Tᵢ < 5) : ${kk} classes, ν = ${kk} − 1 = ${kk-1}`,nu:kk-1,why:'λ a été estimé sur les données : un degré de liberté de moins.',tag:'s1kh-ddl'},
        {h:'On garde les 6 classes : ν = 6 − 2 = 4',nu:4,why:'Certains effectifs théoriques de la queue sont inférieurs à 5 : il faut regrouper.',tag:'s1kh-cond'}]},
      {q:'Décision :',o:prev=>{const q=S1KH_Q95[prev[2].nu],rej=chi>q;return[
        {h:`${dec(chi,2)} ${rej?'>':'≤'} ${num(q)} : on rejette la loi de Poisson`,ok:rej,why:'χ²obs ne dépasse pas la valeur critique.',tag:'s1kh-dec'},
        {h:`${dec(chi,2)} ${rej?'>':'≤'} ${num(q)} : on ne rejette pas la loi de Poisson`,ok:!rej,why:'χ²obs dépasse la valeur critique.',tag:'s1kh-dec'},
        {h:'Les données suivent exactement une loi de Poisson',why:'Ne pas rejeter n’est pas démontrer.',tag:'s1te-h0'}]}}],
    explain:`λ = ${num(lam)} (moyenne observée). T₀ = ${N}e<sup>−${num(lam)}</sup> ≈ ${dec(N*Math.exp(-lam),2)}. Effectifs théoriques : ${T0.map(t=>dec(t,1)).join(' ; ')} : on regroupe la queue, il reste ${kk} classes. ν = ${kk} − 1 − 1 = ${kk-2} ; χ²₀,₉₅(${kk-2}) = ${num(S1KH_Q95[kk-2])}. χ²obs ≈ ${dec(chi,2)} : ${chi>S1KH_Q95[kk-2]?'on rejette l’ajustement.':'on ne rejette pas l’ajustement.'}`})};
ANA_UNITS.push({id:'s1-khi2',tr:'s1',name:'Khi-deux',sub:'Ajustement à une loi, équirépartition, normalité',glyph:'χ²',tone:'sq',
  skills:[SKA('s1.kh.theo','Effectifs théoriques',gS1KhTheo,1),SKA('s1.kh.contrib','Contribution d’une classe',gS1KhContrib,1),SKA('s1.kh.ddl','Degrés de liberté',gS1KhDdl,1),
    SKA('s1.kh.stat','Calculer le χ²',gS1KhStat,2),SKA('s1.kh.place','Placer χ²obs',gS1KhPlace,2),SKA('s1.kh.dec','Décider',gS1KhDec,2),SKA('s1.kh.cond','Condition Tᵢ ≥ 5',gS1KhCond,2),
    SKA('s1.kh.r1','Raisonner : équirépartition',gS1KhR1,2),SKA('s1.kh.loi','Effectifs binomiaux ou de Poisson',gS1KhLoi,3),SKA('s1.kh.henry','Droite de Henry',gS1KhHenry,3),SKA('s1.kh.r2','Raisonner : ajustement de Poisson',gS1KhR2,3)]});
