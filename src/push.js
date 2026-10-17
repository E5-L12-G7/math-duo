/* Ordre pédagogique des chapitres et réglages communs, puis ajout aux parcours */
{const ORD=['fs-ref','fs-d23','fs-der','fs-sag','fs-sui','fs-lim','fs-cvx','fs-exp','fs-ln','fs-int','fs-ed'];
  const rk=u=>{const i=ORD.indexOf(u.id);return i<0?0:i};
  const fsU=ANA_UNITS.filter(u=>u.tr==='fs').sort((a,b)=>rk(a)-rk(b));let j=0;
  ANA_UNITS.forEach((u,i)=>{if(u.tr==='fs')ANA_UNITS[i]=fsU[j++]});
  const W={'sp-stat1':['wPos',[['La boîte à moustaches','wBox','Déplace les valeurs : regarde bouger la médiane, les quartiles et les moustaches.']]],
    'sp-stat2':['wReg',[]]};
  ANA_UNITS.forEach(u=>{const w=W[u.id];if(!w)return;if(!u.w)u.w=w[0];u.w2=(u.w2||[]).concat(w[1].filter(x=>!(u.w2||[]).some(y=>y[1]===x[1])))})}
UNITS.push(...ANA_UNITS);
/* Parcours proposés : MVA911 (m1), MVA912 (m2), STA001 (s1) ; les anciens générateurs restent disponibles pour être réutilisés. */
UNITS.splice(0,UNITS.length,...UNITS.filter(u=>['m1','m2','s1'].includes(u.tr)));
