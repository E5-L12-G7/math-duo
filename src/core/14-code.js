document.addEventListener('keydown',e=>{
  if(e.target&&e.target.closest&&e.target.closest('input,textarea,select'))return;
  if(SCREEN==='cards'&&CARDKEY&&!e.target.closest('button:not(#card)')){CARDKEY(e);return}
  const co=document.getElementById('courseov');if(co){if(e.key==='Escape')co.remove();return}
  if(CALC.open&&$('#calc')&&!$('#calc').hidden){const k=e.key,map={Enter:'=','=':'=',Backspace:'B',Escape:'X',Delete:'C',',':'.'};const kk=map[k]||k;
    if(kk==='X'){closeCalc();e.preventDefault();return}
    if(/^[0-9.+\-*\/^()=BC!%;]$/.test(kk)){e.preventDefault();calcKey(kk)}return}
  if(E&&E.onKey&&L&&!e.target.closest('button'))E.onKey(e);
  else if(e.key==='Enter'&&$('#cont')&&document.activeElement!==$('#cont'))$('#cont').click()});
