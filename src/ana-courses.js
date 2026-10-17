/* ---- Parcours Analyse : cours et flashcards lus dans le Markdown produit par l'agent analyste-cours ----
   Format attendu : « # Chapitre : … », puis les sections « ## Explication pour un novice », « ## Notions… »,
   « ## Méthodes », « ## Exemples résolus », « ## Pièges fréquents », « ## Flashcards ».
   Les formules sont écrites entre accents graves en notation texte (x^2, u_{n+1}…). */
const escH=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const amath=m=>m.replace(/\^\{([^}]*)\}/g,'<sup>$1</sup>').replace(/_\{([^}]*)\}/g,'<sub>$1</sub>')
  .replace(/\^(−?[A-Za-z0-9′∞πα-ωΑ-Ω]+)/g,'<sup>$1</sup>').replace(/_([A-Za-z0-9∞πα-ω]+)/g,'<sub>$1</sub>');
const inl=t=>escH(t).replace(/`([^`]+)`/g,(_,m)=>'<span class="m">'+amath(m)+'</span>').replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>');
function mdHtml(lines){let h='',list=null;const close=()=>{if(list){h+=`</${list}>`;list=null}};
  for(const raw of lines){const l=raw.trim();let m;
    if(!l){close();continue}
    if((m=l.match(/^[-*] (.*)/))){if(list!=='ul'){close();h+='<ul>';list='ul'}h+=`<li>${inl(m[1])}</li>`}
    else if((m=l.match(/^\d+\. (.*)/))){if(list!=='ol'){close();h+='<ol>';list='ol'}h+=`<li>${inl(m[1])}</li>`}
    else{close();h+=`<p>${inl(l)}</p>`}}
  close();return h}
function parseAna(src){const out={};let cur=null,sec=null;
  for(const line of src.split(/\r?\n/)){let m;
    if((m=line.match(/^# Chapitre : (.+)/))){cur={title:m[1].trim(),meta:{},sec:{}};if(!(cur.title in out))out[cur.title]=cur;sec=null;continue} // en cas de doublon, la première version (TD) l’emporte
    if(!cur)continue;
    if(!sec&&(m=line.match(/^(Source|Niveau visé|Prérequis) : (.*)/))){cur.meta[m[1]]=m[2];continue}
    if((m=line.match(/^## (.+)/))){sec=m[1].trim();cur.sec[sec]=[{h:null,lines:[]}];continue}
    if(!sec)continue;
    if((m=line.match(/^### (.+)/))){cur.sec[sec].push({h:m[1].trim(),lines:[]});continue}
    const arr=cur.sec[sec];arr[arr.length-1].lines.push(line)}
  return out}
const tableRows=lines=>lines.map(l=>l.trim()).filter(l=>l.startsWith('|')&&!/^\|\s*-/.test(l)&&!/Recto/.test(l))
  .map(l=>{const parts=l.replace(/^\|\s*/,'').replace(/\s*\|$/,'').split(' | ');return[parts[0],parts.slice(1).join(' | ')]}).filter(r=>r[0]&&r[1]);
/* Widgets utilisables par leur nom dans les chapitres (champ w / w2) */
const WIDGETS={wAbs,wBal,wBayes,wBin,wBox,wCI,wCLT,wCircle,wCob,wCplx,wDev,wExp,wFac,wField,wFn,wGrow,wI,wIneq,wIneqG,wInt,wInv,wLLN,wLim,wLog,wNorm,wOsc,wPar,wPascal,wPos,wRad,wRecip,wRed,wReg,wRevol,wRiem,wRoots,wSer,wSpread,wSym,wTan,wTaylor,wTree,wVar};
function anaCourse(u,ui,ch){
  const sec=k=>{const key=Object.keys(ch.sec).find(x=>x.startsWith(k));return key?ch.sec[key]:[]};
  const deck=tableRows((sec('Flashcards')[0]||{lines:[]}).lines).map(([f,b])=>[inl(f),inl(b)]);
  const notions=((sec('Notions')[0]||{lines:[]}).lines).map(l=>l.trim()).filter(l=>l.startsWith('- ')).map(l=>{
    const t=l.slice(2),[a,b]=t.split(' | '),i=a.indexOf(' : ');
    return i>0?`<li><b>${inl(a.slice(0,i))}</b> : ${inl(a.slice(i+3))}${b?`<small class="formal">En symboles : ${inl(b)}</small>`:''}</li>`:`<li>${inl(t)}</li>`});
  const parts=[];
  if(notions.length)parts.push(['Les notions, dans l’ordre',`<ul class="notions">${notions.join('')}</ul>`]);
  sec('Méthodes').filter(b=>b.h).forEach(b=>parts.push(['Méthode : '+inl(b.h),mdHtml(b.lines)]));
  const ex=sec('Exemples').filter(b=>b.h).map(b=>[inl(b.h),b.lines.map(l=>l.trim()).filter(l=>l.startsWith('- ')).map(l=>{
    const t=l.slice(2),i=t.indexOf(' — ');return i>0?[inl(t.slice(0,i)),inl(t.slice(i+3))]:[inl(t),'']})]).filter(e=>e[1].length);
  const traps=((sec('Pièges')[0]||{lines:[]}).lines).map(l=>l.trim()).filter(l=>l.startsWith('- ')).map(l=>{
    const t=l.slice(2),i=t.indexOf(' → ');return i>0?`${inl(t.slice(0,i))} <span class="fix">→ ${inl(t.slice(i+3))}</span>`:inl(t)});
  const quiz=shuffle(deck.map((c,i)=>i)).slice(0,3).map(i=>{const others=shuffle(deck.filter((_,j)=>j!==i)).slice(0,2);
    return{q:deck[i][0],o:[deck[i][1],...others.map(o=>o[1])],a:0,why:'La bonne réponse est : '+deck[i][1]}});
  const m=ch.meta;
  const body=`${m['Niveau visé']?`<p class="goal"><b>À la fin de ce chapitre</b>, tu sauras ${inl(m['Niveau visé'].replace(/^./,c=>c.toLowerCase()))}</p>`:''}
    ${m['Prérequis']?`<p class="prereq"><b>Ce qu’il faut savoir avant</b> : ${inl(m['Prérequis'])}</p>`:''}
    ${mdHtml((sec('Explication')[0]||{lines:[]}).lines)}
    ${m.Source?`<p class="src">D’après : ${inl(m.Source)}</p>`:''}`;
  if(deck.length)DECKS[u.id]=deck;
  const wf=f=>typeof f==='function'?f:typeof f==='string'&&WIDGETS[f]||null;
  return{id:'fa-'+u.id,ui,title:u.course||u.name,sum:u.sub,skills:u.skills.map(k=>k.id),raw:true,body,parts,ex,traps,
    w:wf(u.w)||undefined,w2:(u.w2||[]).map(([t,f,d])=>[t,wf(f),d]).filter(x=>x[1]),
    keys:deck.slice(0,6).map(([f,b])=>`<b>${f}</b> ${b}`),quiz}
}
{const src=typeof ANA_MD==='string'?ANA_MD:(document.getElementById('ana-src')||{}).textContent;if(src){const chs=parseAna(src);
  ANA_UNITS.forEach(u=>{const ch=chs[u.src];if(ch)COURSES.push(anaCourse(u,UIX(u.id),ch))})}}
Object.assign(ERR,ANA_ERR);
