/* Banc de test des parcours d'Équilibre (sans navigateur).
   Usage : node tools/check.js [fichier.html] [--track tg,fs] [--n 40] [--skill id] [--verbose]
   Charge l'appli dans une machine virtuelle avec un faux DOM, puis génère n questions par compétence et vérifie :
   - mcq : au moins 2 options, une seule bonne, textes non vides ;
   - input : la réponse attendue (q.ans) est acceptée par q.check ;
   - chain : sur des chemins aléatoires, chaque étape a 2 à 6 options et exactement une bonne ;
   - aucun « undefined », « NaN » ou « [object » dans les textes ; étiquettes d'erreur connues ;
   - chaque chapitre a son cours et ses cartes. */
const fs=require('fs'),vm=require('vm'),path=require('path');
const args=process.argv.slice(2),opt=(k,d)=>{const i=args.indexOf(k);return i>=0?args[i+1]:d};
const file=args.find(a=>a.endsWith('.html'))||path.join(__dirname,'..','equilibre.html');
const tracks=opt('--track',null),N=+opt('--n',40),only=opt('--skill',null),verbose=args.includes('--verbose');
const T=require('./load.cjs')(file);

const want=tracks?new Set(tracks.split(',')):null;
const bad=s=>typeof s==='string'&&/undefined|NaN|\[object /.test(s.replace(/<[^>]*>/g,''));
let fails=0,warns=0,total=0;const unver={};
const fail=(k,msg,q)=>{fails++;if(fails<=80)console.log(`✗ ${k.id} (${k.name}) : ${msg}`+(verbose&&q?`\n   ${JSON.stringify({instr:q.instr,prompt:q.prompt,ans:q.ans}).slice(0,400)}`:''))};
const warn=(k,msg)=>{warns++;if(verbose)console.log(`! ${k.id} : ${msg}`)};
for(const k of T.ALLSK){const u=T.UNITS[k.ui];if(want&&!want.has(u.tr))continue;if(only&&k.id!==only)continue;
  for(let n=0;n<N;n++){total++;let q;
    try{q=k.gen();q.skill=k.id}catch(e){fail(k,'le générateur plante : '+(e&&e.message||e));break}
    if(!q||!['mcq','input','chain','tiles','balance','ruler','point'].includes(q.type)){fail(k,'type de question inconnu : '+(q&&q.type));break}
    for(const f of['instr','prompt','explain','hint'])if(bad(q[f])){fail(k,`texte « ${f} » contient undefined/NaN : ${String(q[f]).replace(/<[^>]*>/g,'').slice(0,140)}`,q);break}
    if(!q.instr){fail(k,'consigne vide');break}
    if(q.type==='mcq'){const o=q.opts||[];
      if(o.length<2){fail(k,'moins de 2 options (doublons ?)',q);continue}
      const ok=o.filter(x=>x.ok).length;if(ok!==1){fail(k,`${ok} bonne(s) réponse(s) au lieu d’une`,q);continue}
      if(o.some(x=>!x.h||bad(x.h))){fail(k,'option vide ou avec undefined/NaN',q);continue}
      o.forEach(x=>{if(x.tag&&!T.ERR[x.tag])warn(k,'étiquette d’erreur inconnue : '+x.tag)})}
    else if(q.type==='input'){
      if(!q.ans){unver[k.id]=(unver[k.id]||0)+1;continue}
      try{const asts=q.ans.map(a=>T.parse(String(a))),r=q.check(asts,q.ans.map(a=>T.lexStr(String(a))));if(!r||r==='nopar')fail(k,`la réponse attendue ${JSON.stringify(q.ans)} est refusée`,q)}
      catch(e){fail(k,`réponse attendue illisible ${JSON.stringify(q.ans)} : ${e&&e.message||e}`,q)}}
    else if(q.type==='point'){const[t0,t1]=q.ans||[],bx=q.box;
      if(!Number.isFinite(t0)||!Number.isFinite(t1)){fail(k,'cible du point invalide',q);continue}
      if(t0<bx.x[0]||t0>bx.x[1]||t1<bx.y[0]||t1>bx.y[1]){fail(k,`cible (${t0} ; ${t1}) hors de la figure`,q);continue}
      if(!q.check([t0,t1])){fail(k,'la cible elle-même est refusée',q);continue}
      if(q.snap&&(Math.abs(t0/q.snap-Math.round(t0/q.snap))>1e-6||Math.abs(t1/q.snap-Math.round(t1/q.snap))>1e-6)&&q.tol<q.snap/2)fail(k,'cible inatteignable avec le pas d’accrochage',q);
      if(q.check([t0+3*q.tol+1,t1]))fail(k,'un point éloigné est accepté',q)}
    else if(q.type==='chain'){
      if(!T.chainOpts){fail(k,'chain indisponible');break}
      if(!q.steps||q.steps.length<2){fail(k,'un raisonnement doit avoir au moins 2 étapes',q);continue}
      for(let w=0;w<12;w++){const prev=[];let good=w===0;
        for(let s=0;s<q.steps.length;s++){let o;try{o=T.chainOpts(q,s,prev.slice())}catch(e){fail(k,`étape ${s+1} plante : ${e&&e.message||e}`,q);break}
          if(!q.steps[s].q||bad(q.steps[s].q)){fail(k,`question de l’étape ${s+1} vide ou avec undefined`,q);break}
          if(o.length<2||o.length>6){fail(k,`étape ${s+1} : ${o.length} option(s)`,q);break}
          const okc=o.filter(x=>x.ok).length;if(okc!==1){fail(k,`étape ${s+1} : ${okc} bonne(s) option(s) au lieu d’une (chemin ${prev.map(p=>p.ok?'✓':'✗').join('')})`,q);break}
          if(o.some(x=>!x.h||bad(x.h))){fail(k,`étape ${s+1} : option vide ou avec undefined/NaN`,q);break}
          o.forEach(x=>{if(x.tag&&!T.ERR[x.tag])warn(k,'étiquette d’erreur inconnue : '+x.tag);if(!x.ok&&!x.why)warn(k,`étape ${s+1} : option fausse sans explication (why)`)});
          prev.push(good?o.find(x=>x.ok):o[Math.floor(Math.random()*o.length)])}}}
  }}
/* Cours v2 : manipulations connues et paramètres lisibles */
for(const co of T.COURSES.filter(c=>c.d)){const u=T.UNITS[co.ui];if(want&&!want.has(u.tr))continue;
  for(const [lv,bl] of Object.entries(co.d.niveaux||{}))for(const b of bl){const m=String(b).match(/^@([\w-]+)\s*(\{[\s\S]*\})?/);if(!m)continue;
    if(!T.VIZ||!T.VIZ[m[1]]){fails++;console.log(`✗ cours ${co.d.id} (${lv}) : manipulation inconnue « ${m[1]} »`)}
    if(m[2]){try{JSON.parse(m[2])}catch(e){fails++;console.log(`✗ cours ${co.d.id} (${lv}) : paramètres JSON invalides pour « ${m[1]} »`)}}}
  for(const lv of ['vulgarisation','pratique','expert'])if(!(co.d.niveaux||{})[lv]||!co.d.niveaux[lv].length){fails++;console.log(`✗ cours ${co.d.id} : niveau « ${lv} » vide`)}}
/* Cours et cartes des chapitres */
for(const u of T.UNITS){if(want&&!want.has(u.tr))continue;if(u.tr==='alg')continue;
  const c=T.COURSES.find(c=>c.ui===T.UNITS.indexOf(u));
  if(!c){console.log(`✗ chapitre ${u.id} (${u.name}) : aucun cours (titre « ${u.src} » introuvable dans analyse/*.md ?)`);fails++}
  const d=T.cardsOf(u.id);if(!d.length){console.log(`! chapitre ${u.id} : aucune flashcard`);warns++}
  if(verbose)console.log(`  ${u.tr} · ${u.id} : ${u.skills.length} exercices, ${d.length} cartes, cours ${c?'ok':'—'}`)}
const uv=Object.entries(unver);
if(uv.length)console.log(`! ${uv.length} compétence(s) sans réponse attendue (q.ans), donc non vérifiées automatiquement : ${uv.map(([k])=>k).join(', ')}`);
const per={};T.UNITS.forEach(u=>{if(!want||want.has(u.tr))per[u.tr]=(per[u.tr]||0)+u.skills.length});
console.log(`${total} questions générées · ${fails} échec(s) · ${warns} avertissement(s) · compétences : ${Object.entries(per).map(([t,n])=>t+' '+n).join(', ')}`);
process.exit(fails?1:0);
