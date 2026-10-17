/* ===================== MVA911 · Nombre dérivé ===================== */
Object.assign(ANA_ERR,{
  'm1nd-pente':{label:'Pente et ordonnée',tip:'f(a) est la hauteur du point de contact ; f′(a) est la pente de la tangente : « on avance de 1, on monte de f′(a) ».'},
  'm1nd-def':{label:'Limite du taux d’accroissement',tip:'Développe f(a + h), retire f(a), divise CHAQUE terme par h, puis fais tendre h vers 0.'},
  'm1nd-derivable':{label:'Dérivabilité',tip:'Un coin (pentes différentes à gauche et à droite) ou une tangente verticale empêchent la dérivabilité ; un saut empêche même la continuité.'}});
const M1ND_P=(n)=>`(${n})`;
/** Parabole k(x − s)² + t : formule moteur, valeur et pente */
const M1ND_PAR=(k,s,t)=>({e:`${M1ND_P(k)}*(x-${M1ND_P(s)})^2+${M1ND_P(t)}`,f:x=>k*(x-s)**2+t,d:x=>2*k*(x-s)});
const M1ND_TG=(x0,y0,m)=>({f:`${M1ND_P(y0)}+${M1ND_P(m)}*(x-${M1ND_P(x0)})`,c:2,dash:true});
const M1ND_SG=v=>v<0?MINUS:'+';
/* 1. Signe du nombre dérivé sur une courbe */
const M1ND_FS=[{e:'x^3/3-x',f:x=>x**3/3-x,d:x=>x*x-1},{e:'-x^2/2+x+1',f:x=>-x*x/2+x+1,d:x=>1-x},{e:'x^2/2-1',f:x=>x*x/2-1,d:x=>x},{e:'2-x^3/3+x',f:x=>2-x**3/3+x,d:x=>1-x*x}];
const gM1NdSigne=()=>{const F=pick(M1ND_FS),a=pick([-2,-1.5,-1,-.5,0,.5,1,1.5,2]),y=F.f(a),m=F.d(a),c=Math.abs(m)<1e-9?2:m>0?0:1;
  return mcq('Quel est le signe du nombre dérivé f′(a) au point A ?',FIG.plot({x:[-2.6,2.6],y:[-4,4],f:[F.e,M1ND_TG(a,y,m)],pts:[[a,y,'A']]})+stx(`Le point A a pour abscisse a = ${num(a)} ; la tangente est en pointillés.`),
    [{h:mx('f′(a) &gt; 0'),ok:c===0},{h:mx('f′(a) &lt; 0'),ok:c===1},{h:mx('f′(a) = 0'),ok:c===2}].map(o=>o.ok?o:Object.assign(o,{tag:'m1nd-pente'})),
    `En A, la tangente ${c===0?'monte : la pente est positive':c===1?'descend : la pente est négative':'est horizontale : la pente est nulle'}. Ici f′(${num(a)}) = ${num(m)}.`,
    'Regarde la tangente de gauche à droite : monte-t-elle, descend-elle, ou est-elle à plat ?',true)};
/* 2. Lire f'(a) sur la tangente tracée */
const gM1NdLire=()=>{const k=pick([.5,-.5,1,-1]),s=R(-1,1),t=R(-2,2),a=s+pick([-2,-1,1,2]),P=M1ND_PAR(k,s,t),y=P.f(a),m=P.d(a);if(Math.abs(y)>7||Math.abs(y+m)>7)return gM1NdLire();
  return nq({instr:`Lis le nombre dérivé f′(${num(a)}) sur la figure.`,prompt:FIG.plot({x:[-4,4],y:[-8,8],pasy:2,f:[P.e,M1ND_TG(a,y,m)],pts:[[a,y,'A'],[a+1,y+m,'B']],segs:[[a,y,a+1,y],[a+1,y,a+1,y+m]]})+
      stx(`La droite en pointillés est la tangente à la courbe de f au point A d’abscisse ${num(a)}. Elle passe aussi par B.`),labels:[`f′(${num(a)}) =`],t:[m],
    explain:`Depuis A(${num(a)} ; ${num(y)}), on avance de 1 jusqu’à B(${num(a+1)} ; ${num(y+m)}) : on ${m>=0?'monte':'descend'} de ${num(Math.abs(m))}. La pente de la tangente vaut donc f′(${num(a)}) = ${num(m)}.`,
    hint:'Pars de A, avance de 1 vers la droite : de combien la tangente monte-t-elle (ou descend-elle) ?',diag:([w])=>near(w,y,1e-6)&&y!==m?'m1nd-pente':near(w,-m,1e-6)&&m?'signe':null})};
/* 3. Taux d'accroissement : pente d'une sécante */
const gM1NdTaux=()=>{const v=Math.random()<.5,a=R(-2,1),b=a+R(1,3),f=v?x=>x*x:x=>x*x-2*x,e=v?'x^2':'x^2-2x',fa=f(a),fb=f(b),T=(fb-fa)/(b-a);
  return nq({instr:`Calcule le taux d’accroissement de f entre ${num(a)} et ${num(b)}.`,prompt:fsFx(e)+FIG.plot({x:[-3,4],y:[-2,16],pasy:2,f:[e,{f:`${M1ND_P(fa)}+${M1ND_P(T)}*(x-${M1ND_P(a)})`,c:1,dash:true}],pts:[[a,fa,'A'],[b,fb,'B']]})+stx('Ce taux est la pente de la sécante (AB), en pointillés.'),
    labels:['τ ='],t:[T],explain:`f(${num(a)}) = ${num(fa)} et f(${num(b)}) = ${num(fb)}. τ = (${num(fb)} − ${fa<0?`(${num(fa)})`:num(fa)}) ÷ (${num(b)} − ${a<0?`(${num(a)})`:num(a)}) = ${num(fb-fa)} ÷ ${b-a} = ${num(T)}.`,
    hint:'τ = (f(b) − f(a)) ÷ (b − a) : différence des hauteurs divisée par l’écart des abscisses.',diag:([w])=>b-a>1&&near(w,fb-fa,1e-6)?'taux':near(w,-T,1e-6)&&T?'signe':null})};
/* 4. Raisonner : nombre dérivé par la définition */
const gM1NdDef=()=>{const a=nz(-3,3),b=R(-4,4),c=R(-5,5),fa=a*a+b*a+c,k=2*a+b;const fx=poly([1,b,c]);
  const hp=(K,sq=true)=>`${num(fa)} ${M1ND_SG(K)} ${Math.abs(K)}h${sq?' + h²':''}`;
  return chain({instr:`Calcule f′(${num(a)}) par la définition, en construisant ton raisonnement.`,prompt:fsFx(fx)+stx(` On admet que f(${num(a)}) = ${num(fa)}.`),
    steps:[
      {q:`On développe f(${num(a)} + h) :`,o:[{h:mx(`f(${num(a)} + h) = ${hp(k)}`),ok:true,K:k},
        {h:mx(`f(${num(a)} + h) = ${hp(b)}`),K:b,why:`(${num(a)} + h)² = ${a*a} ${M1ND_SG(2*a)} ${Math.abs(2*a)}h + h² : on n’oublie pas le double produit.`,tag:'calc'},
        {h:mx(`f(${num(a)} + h) = ${hp(a+b)}`),K:a+b,why:`Le double produit vaut 2 × ${num(a)} × h = ${num(2*a)}h, pas ${num(a)}h.`,tag:'calc'}].filter((o,i,A)=>A.findIndex(z=>z.h===o.h)===i)},
      {q:`Le taux d’accroissement (f(${num(a)} + h) − f(${num(a)}))/h vaut :`,o:prev=>{const K=prev[0].K;return[
        {h:mx(`${num(K)} + h`),ok:true,ty:'ok'},{h:mx(`${num(K)} + h²`),ty:'sq',why:'On divise chaque terme par h : h²/h = h.',tag:'m1nd-def'},
        {h:mx(`${num(K)}h + h²`),ty:'nd',why:'On a retiré f(a) mais oublié de diviser par h.',tag:'taux'}]}},
      {q:'Quand h tend vers 0, on obtient :',o:prev=>{const K=prev[0].K,v=prev[1].ty==='nd'?0:K,seen=new Set,o=[];
        [K,K+1,0,fa].forEach(w=>{if(seen.has(w))return;seen.add(w);o.push(w===v?{h:mx(`f′(${num(a)}) = ${num(w)}`),ok:true,v:w}:{h:mx(`f′(${num(a)}) = ${num(w)}`),v:w,why:w===fa?'C’est f(a), la hauteur du point, pas la pente.':'Quand h → 0, il ne reste que le terme sans h.',tag:w===fa?'m1nd-pente':'m1nd-def'})});return o}},
      {q:'Interprétation :',o:prev=>{const v=prev[2].v;return[
        {h:`La tangente au point A(${num(a)} ; ${num(fa)}) a pour pente ${num(v)}`,ok:true},
        {h:`Le point (${num(a)} ; ${num(v)}) est sur la courbe de f`,why:'La hauteur du point est f(a) ; f′(a) est une pente.',tag:'m1nd-pente'},
        {h:`La tangente coupe l’axe des ordonnées en ${num(v)}`,why:'f′(a) est la pente (coefficient directeur), pas l’ordonnée à l’origine.',tag:'m1nd-pente'}]}}],
    explain:`f(${num(a)} + h) = ${hp(k)}. Donc (f(${num(a)} + h) − f(${num(a)}))/h = (${num(k)}h + h²)/h = ${num(k)} + h, qui tend vers ${num(k)}. f′(${num(a)}) = ${num(k)} : c’est la pente de la tangente en A(${num(a)} ; ${num(fa)}).`})};
/* 5. Équation de la tangente (expression) */
const gM1NdTan=()=>{const b=R(-4,4),c=R(-4,4),a=R(-2,2),f=x=>x*x+b*x+c,fa=f(a),m=2*a+b,p=fa-m*a,e=poly([1,b,c]);
  return exprQ(`Écris l’équation de la tangente au point d’abscisse ${num(a)}.`,fsFx(e)+stx(` On sait que f′(${num(a)}) = ${num(m)}.`)+FIG.plot({x:[a-3,a+3],y:[fa-6,fa+6],pasy:2,f:[e],pts:[[a,fa,'A']]}),'y =',`${m}x+${M1ND_P(p)}`,
    `f(${num(a)}) = ${num(fa)}. Tangente : y = f(a) + f′(a)(x − a) = ${num(fa)} ${M1ND_SG(m)} ${Math.abs(m)}(x ${M1ND_SG(-a)} ${Math.abs(a)}), soit y = ${m===0?'':`${num(m)}x `}${m===0?num(p):`${M1ND_SG(p)} ${Math.abs(p)}`}.`+FIG.plot({x:[a-3,a+3],y:[fa-6,fa+6],pasy:2,f:[e,M1ND_TG(a,fa,m)],pts:[[a,fa,'A']]}),
    'y = f(a) + f′(a)(x − a) : calcule d’abord f(a), la hauteur du point A.',false,([u])=>eqv(u,`${m}x+${M1ND_P(fa)}`)&&a!==0?'tangente':eqv(u,`${fa}x+${M1ND_P(m)}`)?'m1nd-pente':null)};
/* 6. Placer un point de la tangente (pente = « avance de 1, monte de f'(a) ») */
const gM1NdPlace=()=>{for(let i=0;i<50;i++){const k=pick([.5,-.5,1,-1]),s=R(-2,2),t=R(-3,3),a=s+pick([-2,-1,1,2]),d=pick([1,1,-1,2]),P=M1ND_PAR(k,s,t),y=P.f(a),m=P.d(a),Y=y+m*d;
    if(Math.abs(y)>5.5||Math.abs(Y)>5.5||Math.abs(a+d)>5.5||Math.abs(a)>5.5)continue;
    return pointQ({instr:`Place le point B de la tangente en A d’abscisse ${num(a+d)}.`,prompt:stx(`A(${num(a)} ; ${num(y)}) est sur la courbe de f, et f′(${num(a)}) = ${num(m)}.`),nom:'B',x:[-6,6],y:[-6,6],snap:.5,tol:.24,cible:[a+d,Y],
      fond:{f:[P.e],pts:[[a,y,'A']],pas:1,etiq:2},
      explain:`La tangente a pour pente ${num(m)} : quand on se déplace de ${num(d)} en abscisse, elle ${m*d>=0?'monte':'descend'} de ${num(Math.abs(m*d))}. B(${num(a+d)} ; ${num(y)} ${M1ND_SG(m*d)} ${num(Math.abs(m*d))}) = (${num(a+d)} ; ${num(Y)}).`+FIG.plot({x:[-6,6],y:[-6,6],f:[P.e,M1ND_TG(a,y,m)],pts:[[a,y,'A'],[a+d,Y,'B']],etiq:2}),
      hint:`Pars de A, déplace-toi de ${num(d)} horizontalement, puis de ${num(d)} × ${num(m)} verticalement.`,diag:pt=>Math.abs(pt[1]-P.f(a+d))<.3?'m1nd-pente':null})}
  return gM1NdHoriz()};
/* 7. Placer le point où la tangente est horizontale */
const gM1NdHoriz=()=>{if(Math.random()<.7){const k=pick([.5,-.5,1,-1]),s=R(-3,3),t=R(-3,3),P=M1ND_PAR(k,s,t);
    return pointQ({instr:'Place le point de la courbe où la tangente est horizontale.',prompt:stx('La courbe de f est tracée. Imagine la tangente qui glisse le long de la courbe.'),nom:'S',x:[-6,6],y:[-6,6],snap:.5,tol:.24,cible:[s,t],
      fond:{f:[P.e],pas:1,etiq:2},explain:`La tangente est horizontale (f′ = 0) au ${k>0?'creux':'sommet'} de la parabole : S(${num(s)} ; ${num(t)}). Avant, la courbe ${k>0?'descend':'monte'} ; après, elle ${k>0?'monte':'descend'}.`,
      hint:'Cherche l’endroit où la courbe est « à plat » : au sommet d’une bosse ou au fond d’un creux.'})}
  const t=R(-2,2),sgn=pick([1,-1]);
  return pointQ({instr:'Place le point d’abscisse positive où la tangente est horizontale.',prompt:fsFx(sgn>0?`x^3-3x+${M1ND_P(t)}`:`-x^3+3x+${M1ND_P(t)}`),nom:'S',x:[-3,3],y:[-6,6],snap:.5,tol:.24,cible:[1,t-2*sgn],
    fond:{f:[sgn>0?`x^3-3x+${M1ND_P(t)}`:`-x^3+3x+${M1ND_P(t)}`],pas:1,etiq:1},explain:`La courbe est à plat en x = 1 (un ${sgn>0?'creux':'sommet'} local) : f(1) = ${num(t-2*sgn)}. On le vérifiera au chapitre suivant avec f′(x) = ${sgn>0?'':MINUS}(3x² − 3), nulle en x = 1.`,
    hint:'Repère, à droite de l’axe vertical, le creux ou la bosse de la courbe.'})};
/* 8. Comparer des nombres dérivés sur une courbe */
const gM1NdGraphe=()=>{for(let i=0;i<80;i++){const F=pick(M1ND_FS),xs=shuffle([-2,-1.5,-1,-.5,0,.5,1,1.5,2].slice()).slice(0,3).sort((p,q)=>p-q),ds=xs.map(F.d),cr=R(0,2);let k=-1;
    if(cr===0){const n=ds.filter(d=>d<-1e-9);if(n.length!==1)continue;k=ds.findIndex(d=>d<-1e-9)}
    else if(cr===1){const n=ds.filter(d=>Math.abs(d)<1e-9);if(n.length!==1)continue;k=ds.findIndex(d=>Math.abs(d)<1e-9)}
    else{const mx2=Math.max(...ds);if(ds.filter(d=>d>mx2-.4).length!==1)continue;k=ds.indexOf(mx2)}
    const N=['A','B','C'],Q=['est négatif','est nul','est le plus grand'][cr];
    return mcq(`En quel point le nombre dérivé ${Q} ?`,FIG.plot({x:[-2.6,2.6],y:[-4,4],f:[F.e],pts:xs.map((x,j)=>[x,F.f(x),N[j]])}),
      N.map((h,j)=>j===k?{h:`Au point ${h}`,ok:true}:{h:`Au point ${h}`,tag:'m1nd-pente'}),
      `Imagine la tangente en chaque point : ${xs.map((x,j)=>`en ${N[j]}, pente ${num(+ds[j].toFixed(2))}`).join(' ; ')}. ${['La seule tangente qui descend est en '+N[k]+'.','La seule tangente horizontale est en '+N[k]+'.','La tangente la plus raide vers le haut est en '+N[k]+'.'][cr]}`,
      'Trace mentalement la tangente en chaque point et compare leurs pentes.',true)}
  return gM1NdSigne()};
/* 9. Raisonner : équation de la tangente */
const gM1NdR2=()=>{const b=R(-4,4),c=R(-4,4),a=nz(-2,2),f=x=>x*x+b*x+c,fa=f(a),m=2*a+b;if(fa===m)return gM1NdR2();
  const red=(M,P)=>`y = ${M===0?'':(M===1?'':M===-1?MINUS:num(M))+'x'}${M===0?num(P):P?` ${M1ND_SG(P)} ${Math.abs(P)}`:''}`;
  return chain({instr:`Écris l’équation de la tangente au point d’abscisse ${num(a)}, en construisant ton raisonnement.`,prompt:fsFx(poly([1,b,c]))+stx(` On admet que f′(x) = ${poly([2,b]).replace(/-/g,MINUS)}.`)+FIG.plot({x:[a-3,a+3],y:[fa-6,fa+6],pasy:2,f:[poly([1,b,c])],pts:[[a,fa,'A']]}),
    steps:[
      {q:'L’ordonnée du point de contact A est :',o:[{h:mx(`f(${num(a)}) = ${num(fa)}`),ok:true,y:fa},{h:mx(`f′(${num(a)}) = ${num(m)}`),y:m,why:'L’ordonnée du point est f(a) ; f′(a) servira de pente.',tag:'m1nd-pente'},
        {h:mx(`f(${num(a)}) = ${num(fa-c)}`),y:fa-c,why:`On n’oublie pas le terme constant ${num(c)}.`,tag:'calc'}].filter((o,i,A)=>A.findIndex(z=>z.h===o.h)===i)},
      {q:'La pente de la tangente est :',o:[{h:mx(`f′(${num(a)}) = ${num(m)}`),ok:true,m},{h:mx(`f(${num(a)}) = ${num(fa)}`),m:fa,why:'La pente de la tangente est f′(a), pas f(a).',tag:'tangente'},
        {h:mx(`f′(${num(a)}) = ${num(2*a)}`),m:2*a,why:`f′(x) = 2x ${M1ND_SG(b)} ${Math.abs(b)} : on n’oublie pas le ${num(b)}.`,tag:'calc'}].filter((o,i,A)=>A.findIndex(z=>z.h===o.h)===i)},
      {q:'On utilise la formule :',o:prev=>{const y=prev[0].y,M=prev[1].m;return[
        {h:mx(`y = ${num(y)} ${M1ND_SG(M)} ${Math.abs(M)}(x ${M1ND_SG(-a)} ${Math.abs(a)})`),ok:true,F:'ok'},
        {h:mx(`y = ${num(M)}x ${M1ND_SG(y)} ${Math.abs(y)}`),F:'naif',why:'Cette droite passe par (0 ; f(a)), pas par A(a ; f(a)) : il faut (x − a).',tag:'tangente'},
        {h:mx(`y = ${num(y)}(x ${M1ND_SG(-a)} ${Math.abs(a)}) ${M1ND_SG(M)} ${Math.abs(M)}`),F:'inv',why:'f(a) et f′(a) sont inversés : la pente multiplie (x − a).',tag:'m1nd-pente'}]}},
      {q:'Forme réduite :',o:prev=>{const y=prev[0].y,M=prev[1].m,F=prev[2].F,cur=F==='ok'?[M,y-M*a]:F==='naif'?[M,y]:[y,M-y*a],seen=new Set,o=[];
        [[cur,1],[[M,y-M*a],0],[[M,y],0],[[M,y+M*a],0],[[-M,y-M*a],0],[[M,M*a-y],0],[[M,y-M*a+2],0],[[y,M],0]].forEach(([[A,B],ok])=>{const h=red(A,B);if(seen.has(h))return;seen.add(h);
          o.push(ok?{h:mx(h),ok:true}:{h:mx(h),why:'Développe avec soin : y = f(a) + f′(a)x − f′(a) × a.',tag:'signe'})});return o.slice(0,4)}}],
    explain:`f(${num(a)}) = ${num(fa)} et f′(${num(a)}) = ${num(m)}. Tangente : y = ${num(fa)} ${M1ND_SG(m)} ${Math.abs(m)}(x ${M1ND_SG(-a)} ${Math.abs(a)}), soit ${red(m,fa-m*a)}.`})};
/* 10. Approximation affine */
const gM1NdApprox=()=>{if(Math.random()<.5){const r=pick([2,3,4,5]),A=r*r,h=pick([.1,.2,.3,-.1,-.2,.05]),v=r+h/(2*r);
    return nq({instr:`Donne une valeur approchée de √${num(+(A+h).toFixed(2))} grâce à la tangente en ${A}.`,dp:4,prompt:stx(`f(x) = √x, f(${A}) = ${r} et f′(${A}) = ${fr(1,2*r)}.`)+FIG.plot({x:[A-3,A+3],y:[r-1,r+1],pas:1,pasy:.5,f:['sqrt(x)',M1ND_TG(A,r,1/(2*r))],pts:[[A,r,'A']]}),labels:['Valeur approchée ='],t:[v],
      explain:`f(a + h) ≈ f(a) + f′(a) × h avec a = ${A} et h = ${num(h)} : ${r} ${M1ND_SG(h)} ${num(Math.abs(h))}/${2*r} ≈ ${dec(v,4)}. (La calculatrice donne √${num(+(A+h).toFixed(2))} ≈ ${dec(Math.sqrt(A+h),4)} : l’écart est minuscule.)`,
      hint:'f(a + h) ≈ f(a) + f′(a) × h : remplace la courbe par sa tangente.',diag:([w])=>near(w,Math.sqrt(A+h),2e-4)?'arrondi':null})}
  const a=pick([1,2,3]),h=pick([.01,.02,-.01,.03]),v=a**3+3*a*a*h;
  return nq({instr:`Donne une valeur approchée de ${num(+(a+h).toFixed(2))}³ grâce à la tangente en ${a}.`,prompt:stx(`f(x) = x³, f(${a}) = ${a**3} et f′(${a}) = ${3*a*a}.`)+FIG.plot({x:[a-1.5,a+1.5],y:[0,a**3*2.5],pas:.5,pasy:a===1?.5:a===2?4:10,f:['x^3',M1ND_TG(a,a**3,3*a*a)],pts:[[a,a**3,'A']]}),labels:['Valeur approchée ='],t:[v],tol:1e-6,
    explain:`f(${a} ${M1ND_SG(h)} ${num(Math.abs(h))}) ≈ ${a**3} + ${3*a*a} × ${h<0?`(${num(h)})`:num(h)} = ${num(+v.toFixed(4))}. (Valeur exacte : ${num(+((a+h)**3).toFixed(6))}.)`,
    hint:'f(a + h) ≈ f(a) + f′(a) × h.',diag:([w])=>near(w,(a+h)**3,1e-4)?'arrondi':null})};
/* 11. Dérivable ou pas ? */
const gM1NdDerv=()=>{const a=R(-1,2),A=num(a),t=R(0,3),X=M1ND_P(a);
  const T=[[`|${M1LIM_X(a)}|`,`abs(x-${X})`,1],[`√(${M1LIM_X(a)})`,`sqrt(x-${X})`,2],[`(${M1LIM_X(a)})<sup>2</sup>`,`(x-${X})^2`,0],[`${fr(`|${M1LIM_X(a)}|`,M1LIM_X(a))} + 1`,`abs(x-${X})/(x-${X})+1`,3]][t];
  const O=['Oui, et f′(a) = 0','Non : la courbe a un coin en a','Non : la tangente en a est verticale','Non : f n’est même pas continue en a'];
  return mcq(`f est-elle dérivable en a = ${A} ?`,`<span class="m"><i>f</i>(<i>x</i>) = </span>`+mx(T[0])+FIG.plot({x:[a-3,a+3],y:[-2,3],f:[T[1]]}),O.map((h,i)=>i===T[2]?{h,ok:true}:{h,tag:'m1nd-derivable'}),
    [`(x − a)² a une tangente horizontale en a : le taux ((h)² − 0)/h = h tend vers 0, donc f′(a) = 0.`,`Le taux vaut 1 à droite de a et −1 à gauche : pas de limite commune. La courbe fait un coin : f est continue mais pas dérivable en a.`,
      `Le taux √h / h = 1/√h tend vers +∞ : la tangente est verticale, il n’y a pas de nombre dérivé.`,`f vaut 0 juste avant a et 2 juste après : elle saute, donc elle n’est pas continue en a, et encore moins dérivable.`][T[2]],
    'Regarde la courbe en a : est-elle lisse, fait-elle un coin, devient-elle verticale, ou saute-t-elle ?',true)};
ANA_UNITS.push({id:'m1-nombre-derive',tr:'m1',name:'Nombre dérivé',sub:'La pente d’une courbe en un point, la tangente',glyph:'f′(a)',tone:'x',
  skills:[SKA('m1.nd.signe','Signe du nombre dérivé',gM1NdSigne,1),SKA('m1.nd.horiz','Tangente horizontale',gM1NdHoriz,1),SKA('m1.nd.lire','Lire f′(a) sur la tangente',gM1NdLire,1),
    SKA('m1.nd.taux','Taux d’accroissement',gM1NdTaux,1),SKA('m1.nd.graphe','Comparer des pentes',gM1NdGraphe,2),SKA('m1.nd.place','Placer un point de la tangente',gM1NdPlace,2),
    SKA('m1.nd.def','Raisonner : f′(a) par la définition',gM1NdDef,2),SKA('m1.nd.tan','Équation de la tangente',gM1NdTan,2),SKA('m1.nd.r2','Raisonner : construire la tangente',gM1NdR2,2),
    SKA('m1.nd.approx','Approximation affine',gM1NdApprox,3),SKA('m1.nd.derv','Dérivable ou pas ?',gM1NdDerv,3)]});
