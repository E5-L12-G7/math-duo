/* ---- Cours MVA911 / MVA912 : un vrai cours de prof particulier, en trois niveaux ----
   Données : cours/<id>.json (voir docs/COURS-MVA.md). Chaque cours a trois lectures complètes :
   Vulgarisation (l'idée, avec des images du quotidien), Pratique (les méthodes et les calculs), Expert (définitions, preuves, limites).
   Les blocs de texte suivent un petit balisage ; « @nom {…} | consigne » insère une manipulation interactive (VIZ). */
const CLV=[['vulgarisation','Vulgarisation','L’idée, avec des images'],['pratique','Pratique','Les méthodes et les calculs'],['expert','Expert','Le cadre précis et les limites']];
let CWID=0;
/** Formule écrite à la main → HTML : exposants, indices, variables en italique */
const cmath=s=>amath(escH(String(s))).replace(/(?<![A-Za-zÀ-ÿ<\/&#;])([xyztn])(?![A-Za-zÀ-ÿ>;])/g,'<i>$1</i>');
/** Un bloc de cours → HTML. Les manipulations sont rendues comme des emplacements, montés ensuite par mountV2. */
function cBlock(b,W){b=String(b);let m;
  if((m=b.match(/^@([\w-]+)\s*(\{[\s\S]*\})?\s*(?:\|\s*([\s\S]*))?$/))){const id='cw'+(++CWID);let p={};try{p=m[2]?JSON.parse(m[2]):{}}catch(e){p={}}
    W.push([id,m[1],p]);return`<figure class="cviz"><div class="wid" id="${id}"></div>${m[3]?`<figcaption><b>À toi de manipuler.</b> ${inl(m[3])}</figcaption>`:''}</figure>`}
  if((m=b.match(/^##\s+(.*)/)))return`<h3 class="ch3">${inl(m[1])}</h3>`;
  if((m=b.match(/^###\s+(.*)/)))return`<h4 class="ch4">${inl(m[1])}</h4>`;
  if(b.startsWith('> '))return`<p class="cform"><span class="m">${b.slice(2).split('\n').map(l=>cmath(l.replace(/^> ?/,''))).join('<br>')}</span></p>`;
  if(b.startsWith('!! '))return`<p class="ckey">${inl(b.slice(3))}</p>`;
  if((m=b.match(/^prof:\s*([\s\S]*)/)))return`<div class="cprof"><span class="cpav" aria-hidden="true">${I.user}</span><p>${inl(m[1]).replace(/\n/g,'<br>')}</p></div>`;
  if((m=b.match(/^analogie:\s*([\s\S]*)/)))return`<p class="cana"><b>Image mentale.</b> ${inl(m[1])}</p>`;
  if((m=b.match(/^attention:\s*([\s\S]*)/)))return`<p class="catt"><b>Attention.</b> ${inl(m[1])}</p>`;
  if((m=b.match(/^histoire:\s*([\s\S]*)/)))return`<p class="chist"><b>Un peu d’histoire.</b> ${inl(m[1])}</p>`;
  if((m=b.match(/^ex:\s*([\s\S]*)/)))return`<div class="cex"><p class="eyebrow">Exemple</p>${m[1].split('\n').map(l=>`<p><span class="m">${cmath(l)}</span></p>`).join('')}</div>`;
  if((m=b.match(/^\?\s*([\s\S]*?)\s*\|\|\s*([\s\S]*)$/)))return`<div class="cself"><p class="cq2"><b>À toi.</b> ${inl(m[1])}</p><button class="abtn" data-rev>Voir la réponse</button><p class="cans2" hidden>${inl(m[2])}</p></div>`;
  if(/^- /.test(b))return`<ul class="clist">${b.split('\n').map(l=>`<li>${inl(l.replace(/^- /,''))}</li>`).join('')}</ul>`;
  if(/^1\. /.test(b))return`<ol class="clist">${b.split('\n').map(l=>`<li>${inl(l.replace(/^\d+\. /,''))}</li>`).join('')}</ol>`;
  return`<p>${inl(b)}</p>`}
const clv=()=>{const v=ST.clvl;return CLV.some(([k])=>k===v)?v:'vulgarisation'};
/** Corps complet d'un cours : en-tête, choix du niveau, lecture du niveau, puis exemples, pièges, à retenir. */
function coursV2(c){const d=c.d,lv=c.lv||clv(),W=[];c.W=W;
  const body=(d.niveaux[lv]||[]).map(b=>cBlock(b,W)).join('');
  return`<div class="cv2">
    <p class="lead">${inl(d.resume||'')}</p>
    ${d.objectifs?`<div class="cgoal"><p class="eyebrow">À la fin de ce cours, tu sauras</p><ul>${d.objectifs.map(o=>`<li>${inl(o)}</li>`).join('')}</ul></div>`:''}
    ${d.prerequis&&d.prerequis.length?`<p class="prereq"><b>À connaître avant</b> : ${d.prerequis.map(id=>{const u=UNITS.find(x=>x.id===id);return u?escH(u.name):id}).join(', ')}</p>`:''}
    <div class="clvl" role="tablist" aria-label="Niveau de lecture">${CLV.map(([k,l,s],i)=>`<button role="tab" data-lv="${k}" aria-selected="${k===lv}" class="${k===lv?'on':''}"><b><span class="cn">${i+1}. </span>${l}</b><small>${s}</small></button>`).join('')}</div>
    <article class="clevel">${body}</article>
    <div class="clvnext">${CLV.map(([k,l],i)=>k===lv&&i<2?`<button class="btn ghost" data-lv="${CLV[i+1][0]}">Passer au niveau ${CLV[i+1][1]} →</button>`:'').join('')}</div>
    ${(d.exemples||[]).map((x,i)=>`<section class="cpart cex"><p class="eyebrow">Exemple résolu ${i+1}</p><p class="pb">${inl(x.enonce)}</p>
      <ol class="exsteps">${x.etapes.map(([m,w],j)=>`<li${j?' hidden':''}><span class="m">${cmath(m)}</span>${w?`<small>${inl(w)}</small>`:''}</li>`).join('')}</ol>
      ${x.etapes.length>1?`<button class="abtn" data-next>Étape suivante</button>`:''}</section>`).join('')}
    ${d.pieges&&d.pieges.length?`<section class="cpart traps"><h3>Les erreurs que je vois le plus souvent</h3><ul class="cpit">${d.pieges.map(t=>`<li><span class="cwr"><span class="m">${cmath(t.faux)}</span></span><span class="cri"><span class="m">${cmath(t.juste)}</span></span><small>${inl(t.pourquoi)}</small></li>`).join('')}</ul></section>`:''}
    ${d.retenir?`<div class="keys2"><p class="eyebrow">À retenir</p><ul>${d.retenir.map(k=>`<li>${inl(k)}</li>`).join('')}</ul></div>`:''}
  </div>`}
function mountV2(c,root){
  (c.W||[]).forEach(([id,name,p])=>{const el=root.querySelector('#'+id),f=VIZ[name];if(!el)return;if(!f){el.innerHTML=`<p class="empty">Manipulation « ${escH(name)} » indisponible.</p>`;return}try{f(el,p)}catch(e){el.innerHTML='<p class="empty">Manipulation indisponible.</p>'}});
  root.querySelectorAll('[data-rev]').forEach(b=>b.onclick=()=>{b.hidden=true;b.nextElementSibling.hidden=false;sfx.tap()});
  root.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>{const ol=b.previousElementSibling,h=ol.querySelector('li[hidden]');if(h){h.hidden=false;sfx.tap()}if(!ol.querySelector('li[hidden]'))b.hidden=true});
  root.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>{ST.clvl=b.dataset.lv;c.lv=null;save();sfx.tap();const host=root.querySelector('.cv2').parentElement;
    host.innerHTML=coursV2(c);mountV2(c,host);host.querySelector('.clvl').scrollIntoView({block:'start',behavior:'smooth'})})}
/* Création des cours à partir des données et des chapitres */
(typeof COURS_SRC==='object'?COURS_SRC:[]).forEach(d=>{const ui=UIX(d.id);if(ui<0)return;const u=UNITS[ui];
  COURSES.push({id:'c-'+d.id,ui,v2:true,d,title:d.titre||u.name,sum:d.resume||u.sub,skills:u.skills.map(k=>k.id),keys:d.retenir||[],body:''})});
/* Labo des manipulations (contrôle visuel) : ouvrir l'appli avec #vizlab */
function vizLab(){const S={courbe:{f:'a*x^2+b',curseurs:{a:[-2,2,.5,1],b:[-3,3,1,-1]},tangente:1,aire:[-1,1.5]},etapes:{etapes:[['2x + 3 = 11','On enlève 3.'],['2x = 8','On divise par 2.'],['x = 4','Solution.']]},
  fractions:{n:3,d:8},pourcentages:{},droite:{},triangle:{mode:'pythagore'},vecteurs:{mode:'scalaire'},euler:{mode:'produit'},histogramme:{classes:[[0,10,8],[10,20,14],[20,40,12],[40,80,6]]},'loi-discrete':{loi:'comparer',n:50,p:.06},'loi-continue':{loi:'normale'}};
  const names=Object.keys(VIZ);app.innerHTML=`<div class="screen"><div class="scroll"><h1>Labo des manipulations</h1>${names.map(n=>`<section class="card"><h2>${n}</h2><div class="wid" id="lab-${n}"></div></section>`).join('')}</div></div>`;
  names.forEach(n=>{try{VIZ[n](document.getElementById('lab-'+n),S[n]||{})}catch(e){document.getElementById('lab-'+n).textContent='ERREUR : '+e.message}})}
if(typeof location!=='undefined'&&location.hash==='#vizlab')setTimeout(vizLab,50);
/* Figure d'énoncé : un toucher l'agrandit en plein écran, un second la referme */
if(typeof document!=='undefined')document.addEventListener('click',e=>{const t=e.target;if(!(t instanceof Element))return;
  const z=t.closest('.qzoom');if(z){z.remove();return}
  const f=t.closest('.prompt .qfig');if(!f||!f.querySelector('svg'))return;
  const o=document.createElement('div');o.className='qzoom';o.setAttribute('role','dialog');o.setAttribute('aria-label','Figure agrandie');
  o.innerHTML=`<div class="qzin">${f.innerHTML}</div><p>Touche pour fermer</p>`;o.querySelectorAll('svg').forEach(s=>s.removeAttribute('style'));document.body.appendChild(o)});
/* Ajuste les figures d'énoncé à la place disponible : si l'énoncé déborde (pavé de saisie ouvert, petit écran),
   la figure est réduite juste assez pour tenir entière, sans descendre sous 110 px. */
function fitFig(){document.querySelectorAll('.prompt').forEach(p=>{const svgs=[...p.querySelectorAll('.qfig svg')];if(!svgs.length)return;
  svgs.forEach(s=>s.style.maxHeight='');const over=p.scrollHeight-p.clientHeight;if(over<=1)return;
  const per=over/svgs.length;svgs.forEach(s=>{s.style.maxHeight=Math.max(110,s.getBoundingClientRect().height-per)+'px'})})}
if(typeof document!=='undefined'&&typeof MutationObserver!=='undefined'){let fq=0;const sched=()=>{if(fq)return;fq=requestAnimationFrame(()=>{fq=0;fitFig()})};
  const start=()=>{const root=document.getElementById('app')||document.body;new MutationObserver(sched).observe(root,{childList:true,subtree:true});addEventListener('resize',sched)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start()}
