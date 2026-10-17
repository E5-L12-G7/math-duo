const fs=require('fs'),vm=require('vm');
/* Charge equilibre.html dans une machine virtuelle avec un faux DOM et renvoie les objets internes de l'appli. */
module.exports=function load(file){
const html=fs.readFileSync(file,'utf8');
const md=(html.match(/<script type="text\/markdown" id="ana-src">([\s\S]*?)<\/script><!--\/ana-src-->/)||[,''])[1];
const scripts=[...html.matchAll(/<script(?: type="module")?(?: crossorigin)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const main=scripts.sort((a,b)=>b.length-a.length)[0];
const stub=()=>{const f=function(){};return new Proxy(f,{get(t,k){if(k===Symbol.toPrimitive)return()=>'';if(k==='then')return undefined;if(k==='length')return 0;
  if(k==='textContent'||k==='innerHTML'||k==='value')return'';if(k==='style'||k==='dataset'||k==='classList')return stub();return stub()},set(){return true},apply(){return stub()},construct(){return stub()}})};
const store={};
const ctx={console,Math,Date,JSON,Number,String,Array,Object,Set,Map,RegExp,Error,isFinite,isNaN,parseFloat,parseInt,Infinity,NaN,Symbol,Proxy,Promise,setTimeout:()=>0,clearTimeout:()=>0,setInterval:()=>0,
  requestAnimationFrame:()=>0,performance:{now:()=>Date.now()},navigator:{vibrate:()=>{},clipboard:{}},
  localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}},
  matchMedia:()=>({matches:false,addEventListener(){},addListener(){}}),addEventListener(){},removeEventListener(){},
  document:new Proxy({},{get(t,k){if(k==='getElementById')return id=>id==='ana-src'?{textContent:md}:stub();if(k==='querySelector')return()=>stub();if(k==='querySelectorAll')return()=>[];
    if(k==='addEventListener')return()=>{};if(k==='createElement')return()=>stub();return stub()}}),
  AudioContext:function(){return stub()},webkitAudioContext:undefined,innerWidth:400,innerHeight:800,devicePixelRatio:1};
ctx.window=ctx;ctx.globalThis=ctx;ctx.self=ctx;
vm.createContext(ctx);
const expose=';globalThis.__T={ALLSK,UNITS,COURSES,DECKS,ERR,TRACKS,typoQ,typo,parse,lexStr,ev,H,parseTk,autoClose,chainOpts:typeof chainOpts==="function"?chainOpts:null,cardsOf,setDeg:v=>{EVDEG=v},GRAPH:typeof GRAPH==="object"?GRAPH:null,rMatch:typeof rMatch==="function"?rMatch:null,rPath:typeof rPath==="function"?rPath:null,VIZ:typeof VIZ==="object"?VIZ:null};';
try{vm.runInContext(main+'\n'+expose,ctx,{filename:'equilibre.js'})}catch(e){console.error('ERREUR au chargement de l’appli :',e&&e.stack||e);process.exit(2)}
return ctx.__T}
