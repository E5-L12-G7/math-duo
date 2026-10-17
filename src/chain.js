/* ---- Raisonnement à choix : l'élève construit sa démarche étape par étape ----
   Chaque étape propose plusieurs choix plausibles. Rien n'est corrigé avant « Vérifier » : on peut se tromper,
   continuer sur sa lancée (les étapes suivantes peuvent dépendre des choix précédents) et changer d'avis.
   chain({instr, prompt, steps:[{q, o}], explain, hint, keep})
     o : tableau d'options, ou fonction (choix précédents) => tableau d'options.
     option : {h: HTML, ok: true si c'est la bonne suite compte tenu des choix précédents, why: pourquoi ce choix est faux, tag: erreur typique}. */
function chain(o){const q={type:'chain',instr:o.instr,prompt:o.prompt,steps:o.steps,explain:o.explain,hint:o.hint||'Avance une étape à la fois : chaque choix doit découler du précédent.',keep:o.keep};
  q.diag=sel=>{const w=(sel||[]).find(s=>s&&!s.ok);return w?w.tag||'raisonnement':null};return q}
function chainOpts(q,k,prev){const st=q.steps[k],raw=typeof st.o==='function'?st.o(prev):st.o,seen=new Map;
  raw.forEach(o=>{o.h=typo(o.h);if(o.why)o.why=typo(o.why)});
  raw.forEach(o=>{const p=seen.get(o.h);if(!p||(!p.ok&&o.ok))seen.set(o.h,o)});const arr=[...seen.values()];
  return q.keep||st.keep?arr:shuffle(arr)}
function mChain(q){
  const n=q.steps.length,sel=Array(n).fill(undefined),opts=Array(n).fill(null);let open=0,all=false;
  const plain=h=>h.replace(/<[^>]+>/g,'').trim();
  $('#foot').innerHTML=checkBtn();const ck=$('#check');
  const draw=scrollTo=>{let h='<ol class="chain">';
    for(let k=0;k<n;k++){if(k>0&&sel[k-1]===undefined)break;
      if(!opts[k])opts[k]=chainOpts(q,k,sel.slice(0,k));
      if(sel[k]&&k!==open&&!all){h+=`<li class="cstep cdone" id="cs${k}"><button class="crow" data-open="${k}" aria-label="Modifier l’étape ${k+1}"><span class="csn">${k+1}</span><span class="cans">${sel[k].h}</span><span class="cmod">Modifier</span></button></li>`;continue}
      const short=opts[k].every(o=>plain(o.h).length<=14);
      h+=`<li class="cstep" id="cs${k}"><p class="cq"><span class="csn">${k+1}</span><span>${q.steps[k].q}</span></p>
        <div class="copts${short?' cshort':''}">${opts[k].map((o,i)=>`<button class="mopt copt${sel[k]===o?' sel':''}" data-k="${k}" data-i="${i}" aria-pressed="${sel[k]===o}"><span>${o.h}</span></button>`).join('')}</div><div class="cfb" id="cfb${k}"></div></li>`}
    h+=`</ol>${sel.every(s=>s!==undefined)?'':`<p class="cnext">${sel[0]===undefined?'Choisis la première étape.':'Choisis l’étape suivante. Tu peux revenir sur un choix à tout moment.'}</p>`}`;
    $('#work').innerHTML=h;
    app.querySelectorAll('.copt').forEach(b=>b.onclick=()=>pickO(+b.dataset.k,+b.dataset.i));
    app.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{if(E.done)return;open=+b.dataset.open;sfx.tap();draw(open)});
    ck.disabled=sel.some(s=>s===undefined);
    if(scrollTo!==undefined){const el=$('#cs'+scrollTo)||$('#check');if(el)el.scrollIntoView({block:'nearest',behavior:'smooth'})}};
  const pickO=(k,i)=>{if(E.done)return;const o=opts[k][i];if(sel[k]===o)return;sel[k]=o;
    for(let j=k+1;j<n;j++)if(typeof q.steps[j].o==='function'){opts[j]=null;sel[j]=undefined;for(let m=j+1;m<n;m++)sel[m]=undefined;break}
    const nx=sel.findIndex(x=>x===undefined);open=nx<0?k:nx;msgClear();sfx.tap();draw(nx<0?k:nx)};
  const msgClear=()=>{const m=$('#msg');if(m)m.textContent=''};
  ck.onclick=()=>{if(E.done||sel.some(s=>s===undefined))return;
    const bad=sel.findIndex(s=>!s.ok);all=true;draw();
    app.querySelectorAll('.copt').forEach(b=>{b.disabled=true;const k=+b.dataset.k,o=opts[k][+b.dataset.i];
      if(o===sel[k])b.classList.add(o.ok?'right':'wrongc');else if(!sel[k].ok&&o.ok)b.classList.add('right','hint2')});
    sel.forEach((s,k)=>{const fb=$('#cfb'+k);if(!fb)return;
      if(!s.ok)fb.innerHTML=`<b>${k===bad?'Ici, le raisonnement déraille.':'Encore une erreur.'}</b> ${s.why||'Ce choix ne découle pas correctement de l’étape précédente.'}`;
      else if(bad>=0&&k>bad&&typeof q.steps[k].o==='function')fb.innerHTML='Cohérent avec tes choix précédents, mais bâti sur l’erreur de l’étape '+(bad+1)+'.'});
    answer(bad<0,sel.length>3?4:2,sel)};
  draw();
}
ERR.raisonnement={label:'Étape de raisonnement',tip:'Relis l’étape signalée : chaque choix doit découler du précédent et respecter les règles du cours.'};
