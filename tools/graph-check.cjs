/* Contrôle des graphes de notions (graph/*.json).
   Usage : node tools/graph-check.cjs [graph/tg.json …]  (sans argument : tous les graphes)
   Vérifie : JSON, ids uniques et préfixés, liens valides et sans doublon, degrés, connexité, alias ambigus. */
const fs=require('fs'),path=require('path');
const dir=path.join(__dirname,'..','graph');
const files=process.argv.slice(2).length?process.argv.slice(2):fs.readdirSync(dir).filter(f=>f.endsWith('.json')).map(f=>path.join(dir,f));
/* Même normalisation que l'appli (src/recall.js : RNORM puis RCOMP) */
const norm=s=>String(s).toLowerCase().replace(/x̄|x̄/g,'xbarre').replace(/([a-z])['’′]+(?![a-z])/g,(m,c)=>c+'′'.repeat(m.length-1)).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[’'`´]/g,' ').replace(/[−–—]/g,'-').replace(/[×·]/g,'*').replace(/²/g,'^2').replace(/³/g,'^3').replace(/\s+/g,' ').trim().replace(/^(le|la|les|l|un|une|des|du|de|d) /,'').replace(/[\s.,;:?"«»]/g,'');
let bad=0;
for(const f of files){let g;const err=m=>{bad++;console.log(`✗ ${path.basename(f)} : ${m}`)},warn=m=>console.log(`! ${path.basename(f)} : ${m}`);
  try{g=JSON.parse(fs.readFileSync(f,'utf8'))}catch(e){err('JSON invalide : '+e.message);continue}
  const tr=g.track,N=g.nodes||[],Ed=g.edges||[],ids=new Map;
  for(const n of N){if(!n.id||!n.label)err('nœud sans id ou label : '+JSON.stringify(n).slice(0,80));
    else if(ids.has(n.id))err('id en double : '+n.id);else ids.set(n.id,n);
    if(tr&&!String(n.id).startsWith(tr+'-'))err(`id non préfixé par « ${tr}- » : ${n.id}`);
    if(!n.def)warn('nœud sans définition : '+n.id);if(!n.ch)warn('nœud sans chapitre : '+n.id)}
  const adj=new Map(N.map(n=>[n.id,new Set])),seen=new Set;
  for(const e of Ed){if(!ids.has(e.a)||!ids.has(e.b)){err(`lien vers un nœud inconnu : ${e.a} — ${e.b}`);continue}
    if(e.a===e.b){err('boucle : '+e.a);continue}
    const k=[e.a,e.b].sort().join('|');if(seen.has(k)){warn('lien en double : '+k);continue}seen.add(k);
    if(!e.rel)err('lien sans phrase : '+k);adj.get(e.a).add(e.b);adj.get(e.b).add(e.a)}
  for(const [id,s] of adj){if(s.size<2)err(`${id} n’a que ${s.size} lien(s)`);else if(s.size<3)warn(`${id} n’a que 2 liens`);if(s.size>12)warn(`${id} a ${s.size} liens`)}
  if(N.length){const st=[N[0].id],vis=new Set(st);while(st.length){for(const v of adj.get(st.pop())||[])if(!vis.has(v)){vis.add(v);st.push(v)}}
    if(vis.size<N.length)err(`graphe non connexe : ${N.length-vis.size} nœud(s) isolé(s) du reste (${N.filter(n=>!vis.has(n.id)).slice(0,6).map(n=>n.id).join(', ')}…)`)}
  const al=new Map;for(const n of N)for(const a of [n.label,...(n.aliases||[])]){const k=norm(a);if(!k)continue;const o=al.get(k);if(o&&o!==n.id)err(`alias « ${a} » partagé par ${o} et ${n.id}`);else al.set(k,n.id)}
  const deg=[...adj.values()].map(s=>s.size);
  console.log(`${path.basename(f)} : ${N.length} nœuds, ${seen.size} liens, degré moyen ${(deg.reduce((a,b)=>a+b,0)/Math.max(1,deg.length)).toFixed(1)}, alias ${al.size}`)}
process.exit(bad?1:0);
