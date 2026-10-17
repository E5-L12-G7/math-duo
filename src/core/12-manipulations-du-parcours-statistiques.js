/* ---- Manipulations du parcours Statistiques ---- */
function wPos(el){const base=[8,10,11,12,12,13];let big=15;
  el.innerHTML=`<div class="wcard">${rg('v','Plus grande valeur',15,60,big)}<div data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const a=[...base,big],m=meanA(a),me=medA(a),X=v=>16+(v-5)/57*290;
    let g=`<svg viewBox="0 0 320 104" class="nl" role="img" aria-label="Série sur une droite graduée, moyenne et médiane"><line x1="10" x2="310" y1="80" y2="80" stroke="var(--muted)" stroke-width="1.5"/>`;
    for(let v=10;v<=60;v+=10)g+=`<line x1="${X(v)}" x2="${X(v)}" y1="76" y2="84" stroke="var(--muted)"/><text x="${X(v)}" y="98" font-size="10" text-anchor="middle" fill="var(--muted)">${v}</text>`;
    const cnt={};a.forEach(v=>{cnt[v]=(cnt[v]||0)+1;g+=`<circle cx="${X(v)}" cy="${80-11*cnt[v]}" r="5" fill="var(--muted)"/>`});
    g+=`<line x1="${X(me)}" x2="${X(me)}" y1="22" y2="80" stroke="var(--t-x)" stroke-width="2.5"/><text x="${X(me)}" y="16" font-size="11" font-weight="700" text-anchor="${X(me)<X(m)?'end':'start'}" fill="var(--ink)">Me</text>`;
    g+=`<line x1="${X(m)}" x2="${X(m)}" y1="22" y2="80" stroke="var(--t-sq)" stroke-width="2.5"/><text x="${X(m)}" y="16" font-size="11" font-weight="700" text-anchor="${X(me)<X(m)?'start':'end'}" fill="var(--ink)">x̄</text></svg>`;
    el.querySelector('[data-v="p"]').innerHTML=g+`<div class="legend"><span><i class="sw" style="background:var(--t-sq)"></i>Moyenne x̄ = ${dec(m)}</span><span><i class="sw" style="background:var(--t-x)"></i>Médiane = ${dec(me)}</span></div>`;
    el.querySelector('[data-v="t"]').innerHTML=big>25?'La valeur extrême tire la moyenne vers le haut. La médiane, elle, ne dépend que de l’ordre des valeurs : elle ne bouge pas.':'Sans valeur extrême, moyenne et médiane sont proches.'};
  onR(el,'v',v=>{big=v;draw()});draw()}
function wBox(el){let a;
  const nw=()=>{a=Array.from({length:11},()=>R(2,40));if(Math.random()<.5)a[0]=R(58,70);a=sortA(a);draw()};
  const draw=()=>{const q1=q1A(a),me=medA(a),q3=q3A(a),iqr=q3-q1,hi=q3+1.5*iqr,lo=q1-1.5*iqr,inl=a.filter(v=>v>=lo&&v<=hi),outs=a.filter(v=>v<lo||v>hi),X=v=>16+v/72*290;
    let g=`<svg viewBox="0 0 320 100" class="nl" role="img" aria-label="Boîte à moustaches"><line x1="10" x2="310" y1="78" y2="78" stroke="var(--muted)" stroke-width="1.5"/>`;
    for(let v=0;v<=70;v+=10)g+=`<line x1="${X(v)}" x2="${X(v)}" y1="74" y2="82" stroke="var(--muted)"/><text x="${X(v)}" y="95" font-size="10" text-anchor="middle" fill="var(--muted)">${v}</text>`;
    g+=`<line x1="${X(Math.min(...inl))}" x2="${X(q1)}" y1="38" y2="38" stroke="var(--ink)" stroke-width="2"/><line x1="${X(q3)}" x2="${X(Math.max(...inl))}" y1="38" y2="38" stroke="var(--ink)" stroke-width="2"/>
      <line x1="${X(Math.min(...inl))}" x2="${X(Math.min(...inl))}" y1="30" y2="46" stroke="var(--ink)" stroke-width="2"/><line x1="${X(Math.max(...inl))}" x2="${X(Math.max(...inl))}" y1="30" y2="46" stroke="var(--ink)" stroke-width="2"/>
      <rect x="${X(q1)}" y="22" width="${Math.max(2,X(q3)-X(q1))}" height="32" rx="3" fill="var(--soft)" stroke="var(--t-sq)" stroke-width="2"/>
      <line x1="${X(me)}" x2="${X(me)}" y1="22" y2="54" stroke="var(--t-x)" stroke-width="3"/>`;
    outs.forEach(v=>g+=`<circle cx="${X(v)}" cy="38" r="5" fill="var(--surface)" stroke="var(--bad)" stroke-width="2"/>`);
    el.innerHTML=`<div class="wcard"><div class="sqs">${a.map((v,i)=>`<span class="${i===2||i===8?'best':i===5?'on':''}">${v}</span>`).join('')}</div>${g}</svg>
      <p class="wexp">Q1 = <b>${q1}</b> (rang 3), médiane = <b>${me}</b> (rang 6), Q3 = <b>${q3}</b> (rang 9). Écart interquartile Q3 − Q1 = ${iqr}. Écart-type σ ≈ ${dec(Math.sqrt(varA(a)))}.
      ${outs.length?`<br>Valeur(s) au-delà de Q3 + 1,5 × IQR = ${dec(hi,1)} : <b>${outs.join(', ')}</b>, signalée(s) comme aberrante(s).`:''}</p>
      <button class="btn ghost" data-k="new">Nouvelle série</button></div>`;
    el.querySelector('[data-k="new"]').onclick=nw};
  nw()}
function wReg(el){let slope=1,noise=2,E;
  el.innerHTML=`<div class="wcard">${rg('s','Pente réelle',-2,2,slope,.1)}${rg('n','Bruit',0,5,noise,.5)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p><button class="btn ghost" data-k="new">Nouveau nuage</button></div>`;
  const nw=()=>{E=Array.from({length:12},()=>{const u=Math.random()||1e-9,v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)});draw()};
  const draw=()=>{const xs=Array.from({length:12},(_,i)=>i+1),ys=xs.map((x,i)=>6+slope*(x-6.5)+noise*E[i]),xb=meanA(xs),yb=meanA(ys),vx=varA(xs),vy=varA(ys),cv=meanA(xs.map((x,i)=>x*ys[i]))-xb*yb,a=cv/vx,b=yb-a*xb,r=vy>1e-9?cv/Math.sqrt(vx*vy):NaN;
    const lo=Math.min(...ys,a+b,12*a+b)-2,hi=Math.max(...ys,a+b,12*a+b)+2,W=300,H=190,X=x=>14+x/13*(W-20),Y=y=>H-14-(y-lo)/(hi-lo)*(H-24);
    let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Nuage de points et droite des moindres carrés"><line x1="10" x2="${W-4}" y1="${H-14}" y2="${H-14}" stroke="var(--muted)"/>`;
    xs.forEach((x,i)=>g+=`<line x1="${X(x)}" x2="${X(x)}" y1="${Y(ys[i])}" y2="${Y(a*x+b)}" stroke="var(--muted)" stroke-dasharray="3 3"/>`);
    g+=`<line x1="${X(0.5)}" x2="${X(12.5)}" y1="${Y(a*.5+b)}" y2="${Y(a*12.5+b)}" stroke="var(--t-sq)" stroke-width="2.5"/>`;
    xs.forEach((x,i)=>g+=`<circle cx="${X(x)}" cy="${Y(ys[i])}" r="5" fill="var(--t-c)" stroke="var(--surface)" stroke-width="2"/>`);
    g+=`<circle cx="${X(xb)}" cy="${Y(yb)}" r="6" fill="var(--ink)" stroke="var(--surface)" stroke-width="2"/><text x="${X(xb)+9}" y="${Y(yb)-8}" font-size="11" font-weight="700" fill="var(--ink)">G</text></svg>`;
    el.querySelector('[data-v="p"]').innerHTML=g;
    const f=Number.isFinite(r)?Math.abs(r):0;
    el.querySelector('[data-v="t"]').innerHTML=`Droite des moindres carrés : <span class="m">ŷ = ${dec(a)}<i>x</i> ${b<0?'−':'+'} ${dec(Math.abs(b))}</span>. Coefficient de corrélation : <b>r = ${Number.isFinite(r)?dec(r):'non défini'}</b>${Number.isFinite(r)?` (lien ${f>=.8?'fort':f>=.4?'moyen':'faible'}${f>=.4?r>0?' et croissant':' et décroissant':''})`:''}. Les pointillés sont les résidus ; la droite passe par le point moyen G.`};
  onR(el,'s',v=>{slope=v;draw()});onR(el,'n',v=>{noise=v;draw()});el.querySelector('[data-k="new"]').onclick=nw;nw()}
function wPascal(el){let n=5,k=2;
  el.innerHTML=`<div class="wcard">${rg('n','n',0,10,n)}${rg('k','k',0,10,k)}<div class="pascal" data-v="t"></div><p class="wres" data-v="r"></p></div>`;
  const kin=el.querySelector('[data-r="k"]');
  const draw=()=>{if(k>n){k=n;kin.value=k;el.querySelector('[data-o="k"]').textContent=k}kin.max=n;
    let h='';for(let i=0;i<=n;i++){h+='<div>'+Array.from({length:i+1},(_,j)=>`<span class="${i===n&&j===k?'hit':i===n-1&&(j===k-1||j===k)&&k>0&&k<n?'par':''}">${Cnk(i,j)}</span>`).join('')+'</div>'}
    el.querySelector('[data-v="t"]').innerHTML=h;
    el.querySelector('[data-v="r"]').innerHTML=`<span class="m">C(${n} ; ${k}) = ${fr(`${n}!`,`${k}! × ${n-k}!`)} = ${Cnk(n,k)}</span>${k>0&&k<n?`<br><small class="wexp">Relation de Pascal : C(${n-1} ; ${k-1}) + C(${n-1} ; ${k}) = ${Cnk(n-1,k-1)} + ${Cnk(n-1,k)} = ${Cnk(n,k)}.</small>`:''}`};
  onR(el,'n',v=>{n=v;draw()});onR(el,'k',v=>{k=v;draw()});draw()}
function wTree(el){let a=.3,b=.8,c=.1;
  el.innerHTML=`<div class="wcard">${rg('a','P(A)',.05,.95,a,.05)}${rg('b','P<sub>A</sub>(B)',0,1,b,.05)}${rg('c','P<sub>Ā</sub>(B)',0,1,c,.05)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const P=v=>num(+v.toFixed(4)),pB=a*b+(1-a)*c;
    const br=(x1,y1,x2,y2,lab)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--muted)" stroke-width="1.5"/><text x="${(x1+x2)/2}" y="${(y1+y2)/2-6}" font-size="11" text-anchor="middle" fill="var(--ink)">${lab}</text>`;
    const nd=(x,y,t)=>`<text x="${x}" y="${y+4}" font-size="13" font-weight="700" text-anchor="middle" fill="var(--ink)">${t}</text>`;
    let g=`<svg viewBox="0 0 320 200" role="img" aria-label="Arbre de probabilités">`+br(14,100,96,50,P(a))+br(14,100,96,150,P(1-a))+nd(108,50,'A')+nd(108,150,'Ā')
      +br(120,50,196,25,P(b))+br(120,50,196,75,P(1-b))+br(120,150,196,125,P(c))+br(120,150,196,175,P(1-c))
      +nd(206,25,'B')+nd(206,75,'B̄')+nd(206,125,'B')+nd(206,175,'B̄');
    [[25,a*b,1],[75,a*(1-b)],[125,(1-a)*c,1],[175,(1-a)*(1-c)]].forEach(([y,v,hl])=>g+=`<text x="222" y="${y+4}" font-size="11" fill="${hl?'var(--ink)':'var(--muted)'}" font-weight="${hl?700:400}">${P(v)}</text>`);
    el.querySelector('[data-v="p"]').innerHTML=g+'</svg>';
    el.querySelector('[data-v="t"]').innerHTML=`<b>P(B)</b> = ${P(a)} × ${P(b)} + ${P(1-a)} × ${P(c)} = <b>${P(pB)}</b> (somme des chemins en gras).<br><b>Bayes</b> : P<sub>B</sub>(A) = ${P(a*b)} ÷ ${P(pB)} ≈ <b>${pB>0?dec(a*b/pB,3):'non défini'}</b>.`};
  const f=v=>num(v);onR(el,'a',v=>{a=v;draw()},f);onR(el,'b',v=>{b=v;draw()},f);onR(el,'c',v=>{c=v;draw()},f);draw()}
function wBin(el){let n=10,p=.3;
  el.innerHTML=`<div class="wcard">${rg('n','n',1,30,n)}${rg('p','p',.05,.95,p,.05)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const ps=Array.from({length:n+1},(_,k)=>Cnk(n,k)*p**k*(1-p)**(n-k)),mx2=Math.max(...ps),W=300,H=170,bw=(W-20)/(n+1),Y=v=>H-20-v/mx2*(H-36);
    let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Diagramme de la loi binomiale"><line x1="8" x2="${W-4}" y1="${H-20}" y2="${H-20}" stroke="var(--muted)"/>`;
    ps.forEach((v,k)=>{const x=12+k*bw,w=Math.max(2,bw-2),h=H-20-Y(v);g+=`<rect x="${x}" y="${Y(v)}" width="${w}" height="${Math.max(0,h)}" rx="${Math.min(4,w/2)}" fill="var(--t-sq)"><title>P(X = ${k}) ≈ ${dec(v,4)}</title></rect>`;
      if(n<=12||k%Math.ceil(n/10)===0)g+=`<text x="${x+w/2}" y="${H-6}" font-size="10" text-anchor="middle" fill="var(--muted)">${k}</text>`});
    const ex=12+n*p*bw+bw/2-1;g+=`<line x1="${ex}" x2="${ex}" y1="8" y2="${H-20}" stroke="var(--t-c)" stroke-width="2" stroke-dasharray="4 3"/><text x="${ex+4}" y="16" font-size="11" font-weight="700" fill="var(--ink)">E(X)</text></svg>`;
    el.querySelector('[data-v="p"]').innerHTML=g;
    el.querySelector('[data-v="t"]').innerHTML=`X ~ B(${n} ; ${num(p)}) : E(X) = np = <b>${dec(n*p)}</b>, V(X) = np(1 − p) = <b>${dec(n*p*(1-p))}</b>, σ ≈ ${dec(Math.sqrt(n*p*(1-p)))}. Valeur la plus probable : ${ps.indexOf(mx2)}.`};
  onR(el,'n',v=>{n=v;draw()});onR(el,'p',v=>{p=v;draw()});draw()}
function wNorm(el){let a=-1,b=1;
  el.innerHTML=`<div class="wcard">${rg('a','Borne a',-3,3,a,.1)}${rg('b','Borne b',-3,3,b,.1)}<div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const draw=()=>{const lo=Math.min(a,b),hi=Math.max(a,b),W=300,H=160,X=z=>10+(z+4)/8*(W-20),Y=v=>H-22-v/.42*(H-34),phi=z=>Math.exp(-z*z/2)/Math.sqrt(2*Math.PI);
    let cur='',area=`M${X(lo)},${Y(0)}`;for(let z=-4;z<=4.001;z+=.05)cur+=(cur?'L':'M')+X(z).toFixed(1)+','+Y(phi(z)).toFixed(1);
    for(let z=lo;z<=hi+1e-9;z+=.02)area+='L'+X(z).toFixed(1)+','+Y(phi(z)).toFixed(1);area+=`L${X(hi)},${Y(0)}Z`;
    let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Courbe de la loi normale centrée réduite"><path d="${area}" fill="var(--soft)" stroke="none"/><path d="${cur}" fill="none" stroke="var(--t-sq)" stroke-width="2.5"/>
      <line x1="8" x2="${W-4}" y1="${Y(0)}" y2="${Y(0)}" stroke="var(--muted)"/>`;
    for(let z=-3;z<=3;z++)g+=`<line x1="${X(z)}" x2="${X(z)}" y1="${Y(0)-3}" y2="${Y(0)+3}" stroke="var(--muted)"/><text x="${X(z)}" y="${H-6}" font-size="10" text-anchor="middle" fill="var(--muted)">${num(z)}</text>`;
    el.querySelector('[data-v="p"]').innerHTML=g+'</svg>';const P=Phi(hi)-Phi(lo);
    el.querySelector('[data-v="t"]').innerHTML=`<span class="m">P(${dec(lo,1)} ≤ Z ≤ ${dec(hi,1)}) = Φ(${dec(hi,1)}) − Φ(${dec(lo,1)}) ≈ ${dec(P,4)}</span><br>Pour un QI ~ N(100 ; 15²), cela correspond à ${dec(100+15*lo,1)} ≤ X ≤ ${dec(100+15*hi,1)}.`};
  onR(el,'a',v=>{a=v;draw()},v=>num(v));onR(el,'b',v=>{b=v;draw()},v=>num(v));draw()}
function wCI(el){let n=100;const p=.4;let ivs=[];
  el.innerHTML=`<div class="wcard">${rg('n','Taille n',25,1000,n,25)}<button class="btn" data-k="go">Tirer 20 échantillons</button><div class="plot" data-v="p"></div><p class="wexp" data-v="t"></p></div>`;
  const sim=()=>{ivs=Array.from({length:20},()=>{let k=0;for(let i=0;i<n;i++)if(Math.random()<p)k++;const ph=k/n,m=1.96*Math.sqrt(ph*(1-ph)/n);return[ph-m,ph+m]});draw()};
  const draw=()=>{const W=300,H=20*9+30,X=v=>10+(v-.15)/.5*(W-20);let ok=0;
    let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Vingt intervalles de confiance"><line x1="${X(p)}" x2="${X(p)}" y1="4" y2="${H-18}" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="4 3"/><text x="${X(p)}" y="${H-4}" font-size="10" text-anchor="middle" fill="var(--ink)">p = 0,4</text>`;
    ivs.forEach(([l,u],i)=>{const inn=l<=p&&p<=u;if(inn)ok++;const y=10+i*9,col=inn?'var(--good)':'var(--bad)';g+=`<line x1="${X(Math.max(.15,l))}" x2="${X(Math.min(.65,u))}" y1="${y}" y2="${y}" stroke="${col}" stroke-width="3" stroke-linecap="round"/>`});
    el.querySelector('[data-v="p"]').innerHTML=g+'</svg>';
    el.querySelector('[data-v="t"]').innerHTML=ivs.length?`<b>${ok} intervalles sur 20</b> contiennent la vraie proportion p = 0,4 (en vert). En moyenne, 95 % des intervalles construits ainsi la contiennent. Augmente n : les intervalles se resserrent.`:''};
  onR(el,'n',v=>{n=v});el.querySelector('[data-k="go"]').onclick=sim;sim()}

COURSES.push(
  {id:'f-pos',ui:UIX('st-pos'),title:'Moyenne, médiane, fréquences',sum:'Résumer une série par une valeur centrale.',skills:['st.mean','st.med','st.freq','st.wmean'],w:wPos,
   body:'<p>Une série statistique décrit une <b>variable</b> (une note, un temps, un prix…) observée sur une <b>population</b> ou un <b>échantillon</b>. Les indicateurs de position résument « autour de quelle valeur » se situent les données.</p><p>Fais grandir la plus grande valeur : la moyenne bouge, la médiane presque pas.</p>',
   parts:[['Vocabulaire','<p><b>Individu</b> : chaque élément observé. <b>Effectif</b> nᵢ : nombre d’individus qui ont la valeur xᵢ. <b>Effectif total</b> N. <b>Fréquence</b> fᵢ = nᵢ ÷ N, entre 0 et 1, ou en pourcentage.</p><p>Une variable est <b>quantitative</b> (un nombre : âge, salaire) ou <b>qualitative</b> (une catégorie : couleur, région). La moyenne n’a de sens que pour une variable quantitative.</p>'],
    ['La moyenne',`<p>${mx('x̄ = '+fr('x<sub>1</sub> + x<sub>2</sub> + … + x<sub>n</sub>','n'))}. Avec des effectifs : ${mx('x̄ = '+fr('Σ n<sub>i</sub>x<sub>i</sub>','N'))}, ou avec les fréquences : ${mx('x̄ = Σ f<sub>i</sub>x<sub>i</sub>')}.</p><p>La moyenne est le point d’équilibre des données : la somme des écarts ${mx('x<sub>i</sub> − x̄')} vaut toujours 0.</p>`],
    ['La médiane',`<p>On <b>range</b> les n valeurs dans l’ordre croissant. Si n est impair, la médiane est la valeur du milieu, de rang ${mx(fr('n + 1',2))}. Si n est pair, c’est la moyenne des deux valeurs centrales, de rangs n/2 et n/2 + 1.</p><p>Au moins la moitié des valeurs sont inférieures ou égales à la médiane, et au moins la moitié lui sont supérieures ou égales.</p>`],
    ['Moyenne ou médiane ?','<p>La moyenne est sensible aux valeurs extrêmes, la médiane est <b>robuste</b>. Pour des salaires ou des prix immobiliers, la médiane décrit mieux le cas typique. En science des données, comparer les deux est un premier indice d’asymétrie : une moyenne nettement au-dessus de la médiane signale une distribution étirée vers la droite.</p>'],
    ['En Python','<p><code>import statistics as st</code> puis <code>st.mean(data)</code> et <code>st.median(data)</code>. Avec pandas : <code>df["col"].mean()</code>, <code>df["col"].median()</code>, et <code>df["col"].value_counts(normalize=True)</code> pour les fréquences.</p>']],
   ex:[['Moyenne pondérée : notes 8, 12 et 15 avec les effectifs 2, 5 et 3.',[['x̄ = '+fr('2 × 8 + 5 × 12 + 3 × 15','2 + 5 + 3'),'Chaque note compte autant de fois que son effectif.'],['x̄ = '+fr('121','10')+' = 12,1','']]],
       ['Médiane de 7 ; 3 ; 9 ; 12 ; 5 ; 10.',[['3 ; 5 ; 7 ; 9 ; 10 ; 12','On range d’abord.'],['n = 6 est pair','Valeurs centrales : rangs 3 et 4.'],['Me = '+fr('7 + 9',2)+' = 8','']]]],
   traps:['Calculer la médiane sans ranger les valeurs.','Oublier les effectifs : la moyenne de 8, 12 et 15 n’est pas la moyenne pondérée.','Confondre fréquence (une part du total) et effectif (un nombre d’individus).'],
   keys:['Moyenne : somme ÷ effectif, ou Σ nᵢxᵢ ÷ N.','Médiane : on range, puis on prend la valeur du milieu.','La médiane résiste aux valeurs extrêmes, pas la moyenne.','Fréquence = effectif ÷ effectif total.'],
   quiz:[{q:'Médiane de 2 ; 9 ; 4 ; 7 ; 5 ?',o:['5','4','5,4'],a:0,m:1,why:'Rangées : 2 ; 4 ; 5 ; 7 ; 9. La valeur du milieu est 5.'},
         {q:'On ajoute à une série une valeur extrême très grande. Quel indicateur change le plus ?',o:['La moyenne','La médiane'],a:0,why:'La moyenne utilise toutes les valeurs ; la médiane seulement leur ordre.'}]},
  {id:'f-disp',ui:UIX('st-disp'),title:'Quartiles, variance, écart-type',sum:'Mesurer l’étalement des données.',skills:['st.range','st.quart','st.var','st.sd','st.svar'],w:wBox,
   body:'<p>Deux séries peuvent avoir la même moyenne et être très différentes : l’une serrée, l’autre étalée. Les indicateurs de dispersion mesurent cet étalement.</p><p>Génère des séries et observe la boîte à moustaches.</p>',
   parts:[['Étendue et quartiles','<p><b>Étendue</b> = max − min : simple mais sensible aux valeurs extrêmes.</p><p><b>Quartiles</b> (convention française) : on range les n valeurs. Q1 est la plus petite valeur telle qu’au moins 25 % des données lui sont inférieures ou égales, soit la valeur de rang n ÷ 4 arrondi à l’entier supérieur. Q3 : rang 3n ÷ 4 arrondi à l’entier supérieur.</p><p>Les logiciels utilisent souvent d’autres conventions, avec interpolation (numpy, pandas) : les résultats peuvent légèrement différer. Précise toujours ta méthode.</p>'],
    ['La boîte à moustaches','<p>Elle représente min, Q1, médiane, Q3 et max. La boîte contient les 50 % de valeurs centrales ; sa largeur est l’<b>écart interquartile</b> IQR = Q3 − Q1. Règle de Tukey : une valeur au-delà de Q3 + 1,5 × IQR ou en dessous de Q1 − 1,5 × IQR est signalée comme <b>aberrante</b>.</p>'],
    ['Variance et écart-type',`<p>${mx('V = '+fr(1,'n')+' Σ (x<sub>i</sub> − x̄)<sup>2</sup>')} : moyenne des carrés des écarts à la moyenne. Formule pratique (König-Huygens) : ${mx('V = '+fr('Σ x<sub>i</sub><sup>2</sup>','n')+' − x̄<sup>2</sup>')}.</p><p>L’<b>écart-type</b> ${mx('σ = √V')} s’exprime dans la même unité que les données. Si on multiplie toutes les valeurs par k, σ est multiplié par |k| ; si on ajoute une constante, σ ne change pas.</p>`],
    ['Variance corrigée',`<p>Pour estimer la variance d’une population à partir d’un échantillon, on divise par n − 1 : ${mx('s<sup>2</sup> = '+fr(1,'n − 1')+' Σ (x<sub>i</sub> − x̄)<sup>2</sup>')}. Attention aux outils : <code>numpy.var(x)</code> divise par n, alors que <code>pandas.Series.var()</code> divise par n − 1 par défaut.</p>`]],
   ex:[['Variance et écart-type de 2 ; 4 ; 4 ; 6.',[['x̄ = 4','16 ÷ 4.'],['écarts : −2 ; 0 ; 0 ; 2','On soustrait la moyenne.'],['V = '+fr('4 + 0 + 0 + 4',4)+' = 2','Moyenne des carrés des écarts.'],['σ = √2 ≈ 1,41','']]],
       ['Quartiles de 3 ; 5 ; 6 ; 8 ; 9 ; 11 ; 14 ; 20.',[['n = 8 : rang de Q1 = 2, rang de Q3 = 6','8 ÷ 4 = 2 et 3 × 8 ÷ 4 = 6.'],['Q1 = 5 et Q3 = 11',''],['IQR = 11 − 5 = 6','']]]],
   traps:['Oublier de mettre les écarts au carré : leur somme vaut toujours 0.','Confondre variance (unité au carré) et écart-type.','Mélanger les conventions de quartiles ou diviser par n au lieu de n − 1 sans le dire.'],
   keys:['Étendue = max − min.','Q1 : rang ⌈n/4⌉, Q3 : rang ⌈3n/4⌉ (convention française).','V = moyenne des carrés − carré de la moyenne ; σ = √V.','Variance corrigée : diviser par n − 1.'],
   quiz:[{q:'On multiplie toutes les valeurs d’une série par 3. L’écart-type est :',o:['multiplié par 3','multiplié par 9','inchangé'],a:0,why:'σ est dans l’unité des données : il est multiplié par 3 (la variance, elle, par 9).'},
         {q:'On ajoute 10 à toutes les valeurs. La variance :',o:['ne change pas','augmente de 10','augmente de 100'],a:0,why:'Un décalage ne change pas les écarts à la moyenne.'}]},
  {id:'f-2var',ui:UIX('st-2var'),title:'Corrélation et régression linéaire',sum:'Mesurer et modéliser un lien entre deux variables.',skills:['st.pred','st.rint','st.cov','st.corr','st.reg'],w:wReg,
   body:'<p>Avec deux variables mesurées sur les mêmes individus (surface et prix d’un logement, heures de révision et note…), on cherche s’il existe un lien et on le modélise par une droite.</p><p>Change la pente et le bruit : observe le coefficient r et la droite des moindres carrés.</p>',
   parts:[['Nuage de points','<p>Chaque individu i est un point (xᵢ ; yᵢ). Le <b>point moyen</b> G(x̄ ; ȳ) est le centre du nuage.</p>'],
    ['Covariance',`<p>${mx('cov(x, y) = '+fr(1,'n')+' Σ (x<sub>i</sub> − x̄)(y<sub>i</sub> − ȳ) = '+fr('Σ x<sub>i</sub>y<sub>i</sub>','n')+' − x̄ȳ')}. Son signe indique le sens du lien : positive si y a tendance à augmenter avec x.</p>`],
    ['Coefficient de corrélation',`<p>${mx('r = '+fr('cov(x, y)','σ<sub>x</sub>σ<sub>y</sub>'))}, toujours entre −1 et 1. Proche de ±1 : les points sont presque alignés. Proche de 0 : pas de lien <b>linéaire</b> (il peut exister un lien courbe).</p><p><b>Corrélation n’est pas causalité</b> : deux variables peuvent varier ensemble à cause d’une troisième.</p>`],
    ['Droite des moindres carrés',`<p>La droite ${mx('ŷ = ax + b')} qui minimise la somme des carrés des résidus ${mx('e<sub>i</sub> = y<sub>i</sub> − ŷ<sub>i</sub>')} a pour coefficients ${mx('a = '+fr('cov(x, y)','V(x)'))} et ${mx('b = ȳ − a x̄')}. Elle passe toujours par G.</p><p>On l’utilise pour prédire, avec prudence hors de l’intervalle des données observées (extrapolation).</p>`],
    ['En Python','<p><code>numpy.corrcoef(x, y)</code> donne r ; <code>numpy.polyfit(x, y, 1)</code> donne a et b ; <code>scipy.stats.linregress(x, y)</code> donne tout à la fois.</p>']],
   ex:[['Droite des moindres carrés pour les points (1 ; 2), (2 ; 3), (3 ; 5), (4 ; 6).',[['x̄ = 2,5 et ȳ = 4',''],['V(x) = '+fr('1 + 4 + 9 + 16',4)+' − 2,5<sup>2</sup> = 1,25','König-Huygens.'],['cov = '+fr('2 + 6 + 15 + 24',4)+' − 2,5 × 4 = 1,75','Moyenne des produits − produit des moyennes.'],['a = 1,75 ÷ 1,25 = 1,4 et b = 4 − 1,4 × 2,5 = 0,5',''],['ŷ = 1,4x + 0,5','']]]],
   traps:['Conclure à une causalité à partir d’une corrélation.','Calculer a = cov ÷ V(y) au lieu de cov ÷ V(x).','Prédire très loin des données observées.','Croire que r ≈ 0 signifie « aucun lien » : le lien peut être non linéaire.'],
   keys:['cov = moyenne des xy − x̄ȳ.','r = cov ÷ (σₓσᵧ), entre −1 et 1.','a = cov ÷ V(x), b = ȳ − a x̄ ; la droite passe par G.','Résidu = observé − prédit.'],
   quiz:[{q:'r = −0,95 signifie :',o:['un lien linéaire fort et décroissant','aucun lien','un lien fort et croissant'],a:0,why:'|r| proche de 1 : lien fort ; signe négatif : décroissant.'},
         {q:'La droite des moindres carrés passe toujours par :',o:['le point moyen G(x̄ ; ȳ)','l’origine','le premier point'],a:0,why:'Car b = ȳ − a x̄.'}]},
  {id:'f-comb',ui:UIX('st-comb'),title:'Dénombrement',sum:'Compter sans tout énumérer.',skills:['cb.fact','cb.mult','cb.pow','cb.arr','cb.comb'],w:wPascal,
   body:'<p>Pour calculer des probabilités, il faut souvent compter : combien de mains de cartes, de codes, de classements possibles ? Le dénombrement donne des formules pour compter sans tout lister.</p><p>Explore le triangle de Pascal : chaque nombre est la somme des deux nombres au-dessus.</p>',
   parts:[['Principe multiplicatif','<p>Si un choix se fait en plusieurs étapes successives avec n₁, n₂, … possibilités, le nombre total est n₁ × n₂ × …</p>'],
    ['Listes avec répétition','<p>Une liste de k éléments pris parmi n, répétitions autorisées (un code, un mot de passe) : chaque position a n choix, d’où <b>nᵏ</b> possibilités.</p>'],
    ['Permutations et arrangements',`<p>Ranger n objets distincts : ${mx('n! = n × (n − 1) × … × 1')} façons, avec 0! = 1.</p><p>Choisir k objets <b>dans l’ordre</b> parmi n, sans répétition : ${mx('A(n ; k) = n(n − 1)…(n − k + 1) = '+fr('n!','(n − k)!'))}.</p>`],
    ['Combinaisons',`<p>Choisir k objets <b>sans ordre</b> parmi n : ${mx('C(n ; k) = '+fr('n!','k!(n − k)!')+' = '+fr('A(n ; k)','k!'))}. On note aussi ce nombre « k parmi n » avec une parenthèse verticale. Propriétés : C(n ; k) = C(n ; n − k) et C(n ; k) = C(n − 1 ; k − 1) + C(n − 1 ; k).</p>`],
    ['Quelle formule choisir ?','<div class="tscroll"><table class="ctable"><thead><tr><th></th><th>Ordre compte</th><th>Ordre ne compte pas</th></tr></thead><tbody><tr><td>Avec répétition</td><td>nᵏ</td><td>(hors programme)</td></tr><tr><td>Sans répétition</td><td>A(n ; k)</td><td>C(n ; k)</td></tr></tbody></table></div>']],
   ex:[['Tiercé : 10 chevaux, on parie sur les 3 premiers dans l’ordre.',[['A(10 ; 3) = 10 × 9 × 8 = 720','L’ordre compte.']]],
       ['On choisit 3 délégués parmi 10 élèves.',[['C(10 ; 3) = '+fr('720','3!')+' = 120','Même choix que le tiercé, mais chaque groupe est compté 3! = 6 fois.']]]],
   traps:['Se demander si l’ordre compte : podium (oui) ou équipe (non).','Utiliser nᵏ alors que les répétitions sont interdites.','Oublier que 0! = 1.'],
   keys:['Choix successifs : on multiplie.','Avec répétition : nᵏ.','Ordre, sans répétition : A(n ; k) = n! ÷ (n − k)!.','Sans ordre : C(n ; k) = n! ÷ (k!(n − k)!).'],
   quiz:[{q:'Choisir 2 délégués parmi 5 élèves :',o:['10','20','25'],a:0,m:1,why:'C(5 ; 2) = 5 × 4 ÷ 2 = 10.'},{q:'5! = ?',o:['120','25','60'],a:0,m:1,why:'5 × 4 × 3 × 2 × 1 = 120.'}]},
  {id:'f-prob',ui:UIX('st-prob'),title:'Probabilités et conditionnement',sum:'De l’arbre à la formule de Bayes.',skills:['pr.compl','pr.union','pr.cond','pr.indep','pr.total','pr.bayes'],w:wTree,
   body:'<p>Une probabilité mesure la chance qu’un événement se réalise, entre 0 (impossible) et 1 (certain). Elle correspond à la fréquence observée quand on répète l’expérience un très grand nombre de fois.</p><p>Règle les branches de l’arbre et observe P(B) et la formule de Bayes.</p>',
   parts:[['Vocabulaire','<p><b>Univers</b> Ω : ensemble des issues. <b>Événement</b> : partie de Ω. <b>Contraire</b> Ā : « A ne se réalise pas ». <b>A ∩ B</b> : A et B. <b>A ∪ B</b> : A ou B (ou les deux). A et B sont <b>incompatibles</b> si A ∩ B = ∅.</p>'],
    ['Règles de calcul',`<ul><li>${mx('P(Ā) = 1 − P(A)')}</li><li>${mx('P(A ∪ B) = P(A) + P(B) − P(A ∩ B)')}</li><li>Équiprobabilité : ${mx('P(A) = '+fr('nombre d’issues favorables','nombre d’issues possibles'))}</li></ul>`],
    ['Probabilité conditionnelle',`<p>${mx('P<sub>A</sub>(B) = '+fr('P(A ∩ B)','P(A)'))} : la probabilité de B <b>sachant</b> que A est réalisé. Dans un tableau croisé, on se restreint à la ligne (ou colonne) de A.</p>`],
    ['Arbre et probabilités totales',`<p>Sur un arbre, on <b>multiplie</b> le long d’un chemin et on <b>additionne</b> les chemins : ${mx('P(B) = P(A)P<sub>A</sub>(B) + P(Ā)P<sub>Ā</sub>(B)')}.</p>`],
    ['Formule de Bayes',`<p>${mx('P<sub>B</sub>(A) = '+fr('P(A) P<sub>A</sub>(B)','P(B)'))} : elle « retourne » le conditionnement. Elle est au cœur des filtres anti-spam et de l’apprentissage automatique (classifieur bayésien naïf).</p>`],
    ['Indépendance',`<p>A et B sont indépendants si ${mx('P(A ∩ B) = P(A) × P(B)')}, c’est-à-dire si ${mx('P<sub>A</sub>(B) = P(B)')} : savoir A ne change rien à B. Ne confonds pas avec incompatibles.</p>`]],
   ex:[['Test médical : 1 % de malades, le test détecte 99 % des malades et donne 5 % de faux positifs. Un test est positif : probabilité d’être malade ?',[['P(T) = 0,01 × 0,99 + 0,99 × 0,05 = 0,0594','Probabilités totales.'],['P<sub>T</sub>(M) = '+fr('0,0099','0,0594')+' ≈ 0,167','Bayes : seulement 17 %, car la maladie est rare.']]],
       ['P(A) = 0,5 ; P(B) = 0,4 ; P(A ∩ B) = 0,2. Calculer P(A ∪ B).',[['P(A ∪ B) = 0,5 + 0,4 − 0,2 = 0,7',''],['P(A) × P(B) = 0,2 = P(A ∩ B)','En plus, A et B sont indépendants.']]]],
   traps:['Confondre P<sub>A</sub>(B) et P<sub>B</sub>(A) : c’est l’erreur classique des tests médicaux.','Additionner P(A) et P(B) sans retirer l’intersection.','Confondre incompatibles (ne peuvent pas arriver ensemble) et indépendants.'],
   keys:['P(Ā) = 1 − P(A).','P(A ∪ B) = P(A) + P(B) − P(A ∩ B).','P<sub>A</sub>(B) = P(A ∩ B) ÷ P(A).','Arbre : multiplier le long d’un chemin, additionner les chemins.','Bayes : P<sub>B</sub>(A) = P(A)P<sub>A</sub>(B) ÷ P(B).'],
   quiz:[{q:'P(A) = 0,3. P(Ā) = ?',o:['0,7','0,3','−0,3'],a:0,m:1,why:'P(Ā) = 1 − 0,3.'},
         {q:'P(A) = 0,4 et P(A ∩ B) = 0,1. P<sub>A</sub>(B) = ?',o:['0,25','0,04','0,5'],a:0,m:1,why:'0,1 ÷ 0,4 = 0,25.'}]},
  {id:'f-va',ui:UIX('st-va'),title:'Variables aléatoires et loi binomiale',sum:'Espérance, variance, succès répétés.',skills:['va.exp','va.var','va.lin','va.binev','va.binp','va.law'],w:wBin,
   body:'<p>Une <b>variable aléatoire</b> X associe un nombre à chaque issue d’une expérience : un gain, un nombre de succès… Sa <b>loi</b> donne la probabilité de chaque valeur.</p><p>Fais varier n et p : observe la forme de la loi binomiale.</p>',
   parts:[['Espérance',`<p>${mx('E(X) = Σ x<sub>i</sub> P(X = x<sub>i</sub>)')} : la valeur moyenne obtenue sur un grand nombre de répétitions. Un jeu est <b>équitable</b> si l’espérance du gain vaut 0.</p>`],
    ['Variance et écart-type',`<p>${mx('V(X) = Σ P(X = x<sub>i</sub>)(x<sub>i</sub> − E(X))<sup>2</sup> = E(X<sup>2</sup>) − E(X)<sup>2</sup>')} et ${mx('σ(X) = √V(X)')}.</p>`],
    ['Transformation affine',`<p>${mx('E(aX + b) = aE(X) + b')} et ${mx('V(aX + b) = a<sup>2</sup>V(X)')}. Ajouter une constante décale les valeurs sans changer leur dispersion.</p>`],
    ['Loi de Bernoulli et loi binomiale',`<p>Une <b>épreuve de Bernoulli</b> a deux issues : succès (probabilité p) ou échec. Si on répète n fois cette épreuve de façon <b>identique et indépendante</b>, le nombre X de succès suit la loi binomiale ${mx('B(n ; p)')} :</p><p class="cmath">${mx('P(X = k) = C(n ; k) p<sup>k</sup>(1 − p)<sup>n − k</sup>')}</p><p>${mx('E(X) = np')} et ${mx('V(X) = np(1 − p)')}.</p>`],
    ['En Python','<p><code>from scipy.stats import binom</code> puis <code>binom.pmf(k, n, p)</code> pour P(X = k), <code>binom.cdf(k, n, p)</code> pour P(X ≤ k), <code>binom.mean(n, p)</code> et <code>binom.var(n, p)</code>.</p>']],
   ex:[['Jeu : on gagne 10 € avec probabilité 0,1, 2 € avec probabilité 0,3, et on perd 3 € sinon. Espérance du gain ?',[['E = 10 × 0,1 + 2 × 0,3 + (−3) × 0,6',''],['E = 1 + 0,6 − 1,8 = −0,2','En moyenne, on perd 20 centimes par partie : le jeu est défavorable.']]],
       ['X ~ B(5 ; 0,3). Calculer P(X = 2).',[['C(5 ; 2) × 0,3<sup>2</sup> × 0,7<sup>3</sup>',''],['= 10 × 0,09 × 0,343 ≈ 0,309','']]]],
   traps:['Oublier le coefficient C(n ; k) dans la formule binomiale.','Écrire V(aX + b) = aV(X) : le coefficient est au carré.','Utiliser la loi binomiale pour des tirages sans remise.'],
   keys:['E(X) = Σ xᵢpᵢ.','V(X) = E(X²) − E(X)².','E(aX + b) = aE(X) + b ; V(aX + b) = a²V(X).','B(n ; p) : P(X = k) = C(n ; k)pᵏ(1 − p)ⁿ⁻ᵏ, E = np, V = np(1 − p).'],
   quiz:[{q:'X ~ B(20 ; 0,25). E(X) = ?',o:['5','0,25','20'],a:0,m:1,why:'np = 20 × 0,25.'},{q:'V(X) = 4. V(3X + 7) = ?',o:['36','19','12'],a:0,m:1,why:'3² × 4 = 36 ; le +7 ne compte pas.'}]},
  {id:'f-cont',ui:UIX('st-cont'),title:'Lois continues et loi normale',sum:'Des probabilités comme des aires.',skills:['ln.unif','ln.z','ln.rule','ln.phi','ln.int'],w:wNorm,
   body:'<p>Une variable <b>continue</b> (une taille, une durée) peut prendre toutes les valeurs d’un intervalle. On ne parle plus de P(X = x), qui vaut 0, mais de probabilités d’intervalles, égales à des <b>aires sous une courbe</b> appelée densité.</p><p>Déplace les bornes : l’aire colorée est la probabilité.</p>',
   parts:[['Loi uniforme',`<p>X ~ U([a ; b]) : toutes les valeurs de [a ; b] sont « également probables ». ${mx('P(c ≤ X ≤ d) = '+fr('d − c','b − a'))} et ${mx('E(X) = '+fr('a + b',2))}.</p>`],
    ['Loi normale',`<p>X ~ N(μ ; σ²) : courbe en cloche, symétrique autour de la moyenne μ ; σ mesure l’étalement. Elle modélise les erreurs de mesure, les tailles, et elle apparaît partout grâce au théorème central limite.</p><p>Attention à la notation : en France, le second paramètre est la <b>variance</b> σ². En Python, <code>scipy.stats.norm(loc=μ, scale=σ)</code> prend l’<b>écart-type</b>.</p>`],
    ['Centrer et réduire',`<p>Si X ~ N(μ ; σ²), alors ${mx('Z = '+fr('X − μ','σ'))} suit la loi normale centrée réduite N(0 ; 1). On note Φ(z) = P(Z ≤ z), donnée par une table ou un logiciel.</p><ul><li>${mx('P(Z &gt; z) = 1 − Φ(z)')}</li><li>${mx('Φ(−z) = 1 − Φ(z)')} (symétrie)</li><li>${mx('P(−z ≤ Z ≤ z) = 2Φ(z) − 1')}</li></ul>`],
    ['Règle 68-95-99,7','<p>Environ 68 % des valeurs sont à moins d’un écart-type de la moyenne, 95 % à moins de deux (plus précisément 1,96σ), et 99,7 % à moins de trois.</p>']],
   ex:[['QI ~ N(100 ; 15²). Probabilité d’un QI supérieur à 130 ?',[['z = '+fr('130 − 100',15)+' = 2','On centre et réduit.'],['P(X &gt; 130) = 1 − Φ(2) ≈ 1 − 0,9772 = 0,0228','Environ 2,3 % de la population.']]]],
   traps:['Confondre σ et σ² dans N(μ ; σ²).','Oublier de centrer-réduire avant d’utiliser Φ.','Écrire P(X &gt; x) = Φ(z) au lieu de 1 − Φ(z).'],
   keys:['Probabilité = aire sous la densité.','Z = (X − μ) ÷ σ ~ N(0 ; 1).','P(Z &gt; z) = 1 − Φ(z) ; Φ(−z) = 1 − Φ(z).','68 % à ±σ, 95 % à ±2σ, 99,7 % à ±3σ.'],
   quiz:[{q:'X ~ N(50 ; 10²). P(X ≤ 50) = ?',o:['0,5','0','1'],a:0,m:1,why:'La moyenne est le centre de symétrie.'},{q:'Φ(1,96) ≈ 0,975. P(−1,96 ≤ Z ≤ 1,96) ≈ ?',o:['0,95','0,975','0,025'],a:0,m:1,why:'2 × 0,975 − 1 = 0,95.'}]},
  {id:'f-est',ui:UIX('st-est'),title:'Échantillonnage, estimation et tests',sum:'Tirer des conclusions à partir d’un échantillon.',skills:['es.se','es.tcl','es.icm','es.icp','es.n','es.test'],w:wCI,
   body:'<p>On observe rarement toute une population : on travaille sur un <b>échantillon</b>, et on veut en déduire quelque chose sur la population avec une marge d’erreur contrôlée. C’est le cœur de la statistique inférentielle.</p><p>Tire 20 échantillons : chacun donne un intervalle de confiance à 95 %.</p>',
   parts:[['Population, échantillon, estimateur','<p>Un <b>paramètre</b> (μ, p) décrit la population ; il est inconnu. Une <b>statistique</b> (x̄, p̂) est calculée sur l’échantillon et sert d’<b>estimation</b>. Elle varie d’un échantillon à l’autre : c’est la <b>fluctuation d’échantillonnage</b>.</p>'],
    ['Loi des grands nombres et théorème central limite',`<p>Plus n est grand, plus x̄ est proche de μ (loi des grands nombres). Plus précisément, pour n assez grand (n ≥ 30 en pratique), ${mx('X̄')} suit approximativement ${mx('N(μ ; σ<sup>2</sup>/n)')} : son écart-type, l’<b>erreur-type</b>, vaut ${mx('σ ÷ √n')}.</p>`],
    ['Intervalle de confiance d’une moyenne',`<p>Au niveau 95 % : ${mx('[x̄ − 1,96 '+fr('σ','√n')+' ; x̄ + 1,96 '+fr('σ','√n')+']')}. Si σ est inconnu, on le remplace par s (et, pour un petit échantillon, 1,96 par un quantile de la loi de Student).</p>`],
    ['Intervalle de confiance d’une proportion',`<p>${mx('[p̂ − 1,96 √('+fr('p̂(1 − p̂)','n')+') ; p̂ + 1,96 √('+fr('p̂(1 − p̂)','n')+')]')}, valable si n ≥ 30, np̂ ≥ 5 et n(1 − p̂) ≥ 5.</p><p><b>Interprétation</b> : si on répétait le sondage, 95 % des intervalles ainsi construits contiendraient la vraie valeur p. Ce n’est pas « 95 % de chances que p soit dans cet intervalle-ci ».</p>`],
    ['Taille d’échantillon',`<p>Pour une marge d’erreur au plus E sur une moyenne : ${mx('n ≥ ('+fr('1,96 σ','E')+')<sup>2</sup>')}, arrondi à l’entier supérieur. Diviser la marge par 2 demande 4 fois plus d’individus.</p>`],
    ['Test d’hypothèse',`<p>On formule une hypothèse nulle H₀ (par exemple μ = μ₀) et une alternative H₁ (μ ≠ μ₀). On calcule ${mx('z = '+fr('x̄ − μ<sub>0</sub>','σ ÷ √n'))}. Au seuil α = 5 %, on <b>rejette H₀</b> si |z| &gt; 1,96. La <b>p-valeur</b> est la probabilité, sous H₀, d’un écart au moins aussi grand que celui observé : on rejette si elle est inférieure à α.</p><p>Rejeter H₀ à tort est une erreur de première espèce (probabilité α) ; ne pas la rejeter alors qu’elle est fausse est une erreur de seconde espèce.</p>`]],
   ex:[['Sondage : 520 « oui » sur 1 000 personnes. La majorité est-elle acquise ?',[['p̂ = 0,52',''],['marge = 1,96 √('+fr('0,52 × 0,48','1000')+') ≈ 0,031',''],['IC = [0,489 ; 0,551]','0,5 est dans l’intervalle : on ne peut pas conclure à une majorité.']]],
       ['Des paquets doivent peser μ₀ = 500 g (σ = 10 g). Sur 25 paquets, x̄ = 496 g. Test au seuil de 5 %.',[['z = '+fr('496 − 500','10 ÷ √25')+' = −2',''],['|z| = 2 &gt; 1,96','On rejette H₀ : les paquets semblent trop légers.']]]],
   traps:['Oublier la racine carrée de n dans l’erreur-type.','Dire « 95 % de chances que p soit dans cet intervalle ».','Conclure « H₀ est vraie » quand on ne la rejette pas : on manque seulement de preuves.'],
   keys:['Erreur-type de la moyenne : σ ÷ √n.','IC 95 % : estimation ± 1,96 × erreur-type.','Proportion : p̂ ± 1,96√(p̂(1 − p̂) ÷ n).','Test au seuil 5 % : rejet si |z| &gt; 1,96, ou si p-valeur &lt; 0,05.'],
   quiz:[{q:'Pour diviser par 2 la largeur d’un intervalle de confiance, il faut multiplier n par :',o:['4','2','√2'],a:0,m:1,why:'La largeur est proportionnelle à 1 ÷ √n.'},
         {q:'On ne rejette pas H₀. Cela signifie :',o:['les données ne permettent pas de rejeter H₀','H₀ est prouvée vraie','H₁ est vraie'],a:0,why:'Un test ne prouve jamais H₀ : il mesure seulement si les données la contredisent.'}]}
);
