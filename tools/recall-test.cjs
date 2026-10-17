/* Teste la reconnaissance des saisies du « Rappel de cours » sur les graphes intégrés au build.
   Usage : node tools/recall-test.cjs [dist/index.html] [--verbose]
   - chaque libellé et alias doit être reconnu comme son propre nœud ;
   - une faute de frappe (lettre oubliée) sur un mot de 7 lettres ou plus doit encore être reconnue ;
   - des mots vagues ne doivent pas être pris pour une notion. */
const path=require('path'),file=process.argv.find(a=>a.endsWith('.html'))||path.join(__dirname,'..','dist','index.html'),verbose=process.argv.includes('--verbose');
const T=require('./load.cjs')(file);
if(!T.GRAPH||!Object.keys(T.GRAPH).length){console.log('Aucun graphe dans le build.');process.exit(0)}
const VAGUE=['nombre','calcul','math','formule','exemple','truc','oui','non','x','cours','theoreme','égal','courbe'];
let bad=0;
for(const [tr,G] of Object.entries(T.GRAPH)){let n=0,ok=0,ty=0,tyOk=0;const errs=[];
  for(const node of G.nodes.values())for(const a of [node.label,...(node.aliases||[])]){n++;const m=T.rMatch(G,a);if(m===node.id)ok++;else errs.push(`« ${a} » (${node.id}) → ${m||'rien'}`);
    if(a.length>=7){ty++;const k=Math.floor(a.length/2),t=a.slice(0,k)+a.slice(k+1);if(T.rMatch(G,t)===node.id)tyOk++}}
  const vague=VAGUE.map(w=>[w,T.rMatch(G,w)]).filter(([,m])=>m);
  if(errs.length)bad+=errs.length;
  console.log(`${tr} : alias reconnus ${ok}/${n} · fautes de frappe tolérées ${tyOk}/${ty} · mots vagues pris pour une notion : ${vague.length?vague.map(([w,m])=>w+'→'+m).join(', '):'aucun'}`);
  if(errs.length)console.log('   '+errs.slice(0,verbose?999:8).join('\n   '))}
process.exit(bad?1:0);
