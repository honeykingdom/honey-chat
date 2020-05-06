(this["webpackJsonphoney-chat"]=this["webpackJsonphoney-chat"]||[]).push([[0],{12:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return l})),n.d(t,"e",(function(){return d})),n.d(t,"f",(function(){return m})),n.d(t,"h",(function(){return g})),n.d(t,"g",(function(){return b}));var a=n(10),u=n(20),r=n(27);const s={status:"idle",userId:null,userLogin:null},o=Object(a.b)("auth/fetchUser",async e=>{const t=await u.j(e),{id:n,login:a}=t.data[0];return Object(r.d)({id:n,login:a}),t}),i=Object(a.c)({name:"auth",initialState:s,reducers:{initializeAuth:(e,{payload:t})=>{e.status=t.isAuth?"success":"error",t.userId&&(e.userId=t.userId),t.userLogin&&(e.userLogin=t.userLogin)},invalidateAuth:()=>s},extraReducers:e=>{e.addCase(o.pending,e=>{e.status="loading"}),e.addCase(o.fulfilled,(e,{payload:t})=>{e.status="success",e.userId=t.data[0].id,e.userLogin=t.data[0].login}),e.addCase(o.rejected,e=>{e.status="error"})}}),{initializeAuth:c,invalidateAuth:l}=i.actions;t.a=i.reducer;const d=e=>"idle"!==e.auth.status&&"loading"!==e.auth.status,m=e=>"success"===e.auth.status,g=e=>e.auth.userLogin,b=e=>e.auth.userId},14:function(e,t,n){"use strict";n.d(t,"g",(function(){return g})),n.d(t,"b",(function(){return b})),n.d(t,"d",(function(){return f})),n.d(t,"c",(function(){return h})),n.d(t,"f",(function(){return p})),n.d(t,"e",(function(){return E})),n.d(t,"a",(function(){return v}));var a=n(96),u=n(350),r=n(125),s=n(356),o=n(123);const i=/^(?:(?:[a-z]+:)?\/\/)/;var c=e=>i.test(e)?e:"//"+e;const l="//static-cdn.jtvnw.net/emoticons/v1",d={"[oO](_|\\.)[oO]":"O_o","\\&gt\\;\\(":">(","\\&lt\\;3":"<3","\\:-?(o|O)":":O","\\:-?(p|P)":":P","\\:-?[\\\\/]":":/","\\:-?[z|Z|\\|]":":Z","\\:-?\\(":":(","\\:-?\\)":":)","\\:-?D":":D","\\;-?(p|P)":";P","\\;-?\\)":";)","R-?\\)":"R)","B-?\\)":"B)"},m=a.a(u.a,r.a(([e,t])=>`${t} ${e}x`),s.a(", ")),g=({id:e,code:t})=>({type:"twitch-emote",id:e,alt:d[t]||t,src:`${l}/${e}/1.0`,srcSet:`${l}/${e}/1.0 1x, ${l}/${e}/2.0 2x, ${l}/${e}/3.0 4x`}),b=({id:e,code:t})=>({type:"bttv-emote",id:e,alt:t,src:`//cdn.betterttv.net/emote/${e}/1x`,srcSet:`//cdn.betterttv.net/emote/${e}/2x 2x, //cdn.betterttv.net/emote/${e}/3x 4x`}),f=({id:e,name:t,urls:n})=>({type:"ffz-emote",id:e,alt:t,src:n[1],srcSet:m(n)}),h=(e,t)=>({type:"emoji",alt:`:${e}:`,src:t}),p=(e,t)=>({type:"mention",text:e,target:t}),E=e=>({type:"link",text:e,href:c(e)}),v=(e,t,n)=>a.a(u.a,r.a(([e,a])=>{var u,r;const s=(null===(u=n[e])||void 0===u?void 0:u.versions[a])||(null===(r=t[e])||void 0===r?void 0:r.versions[a]);return!!s&&(({title:e,description:t,image_url_1x:n,image_url_2x:a,image_url_4x:u})=>({alt:e,label:t,src:n,srcSet:`${n} 1x, ${a} 2x, ${u} 4x`}))(s)}),o.a(Boolean))(e)},195:function(e,t,n){e.exports=n.p+"static/media/ts-tink.4251bf04.ogg"},20:function(e,t,n){"use strict";n.d(t,"j",(function(){return s})),n.d(t,"i",(function(){return o})),n.d(t,"h",(function(){return i})),n.d(t,"d",(function(){return c})),n.d(t,"a",(function(){return l})),n.d(t,"c",(function(){return d})),n.d(t,"b",(function(){return m})),n.d(t,"g",(function(){return g})),n.d(t,"f",(function(){return b})),n.d(t,"e",(function(){return f}));var a=n(8);var u=async(e,{timeout:t,...n}={})=>{let u={...n};const r=t||a.a;if(r){const e=new AbortController;u={...u,signal:e.signal},setTimeout(()=>e.abort(),r)}const s=await fetch(e,u);if(!s.ok)throw Error(s.statusText);return await s.json()};const r=(e,t)=>u("https://api.twitch.tv/kraken"+e,{...t,headers:{Accept:"application/vnd.twitchtv.v5+json","Client-ID":"4e66w1po1tzf645r9vutn9qus05vg9x",Authorization:"OAuth "+localStorage.getItem(a.c)}}),s=e=>{return u("https://api.twitch.tv/helix"+("/users?id="+e),{...t,headers:{Authorization:"Bearer "+localStorage.getItem(a.c)}});var t},o=e=>r(`/users/${e}/emotes`),i=(e="en")=>u("https://badges.twitch.tv/v1/badges/global/display?language="+e),c=(e,t="en")=>u(`https://badges.twitch.tv/v1/badges/channels/${e}/display?language=${t}`),l=e=>r(`/users/${e}/blocks`),d=()=>u("https://api.betterttv.net/3/cached/emotes/global"),m=e=>u("https://api.betterttv.net/3/cached/users/twitch/"+e),g=()=>u("https://api.frankerfacez.com/v1/set/global"),b=e=>u("https://api.frankerfacez.com/v1/room/id/"+e),f=e=>u(`https://recent-messages.robotty.de/api/v2/recent-messages/${e}?clearchatToNotice=true`)},208:function(e,t,n){e.exports=n(342)},229:function(e,t){},23:function(e,t,n){"use strict";var a=n(64),u=n(74),r=n(14);const s=(e,t)=>{for(const n of Object.values(t)){const t=a.a(u.a("id",e),n);if(t)return r.g(t)}return null},o={4:">\\(",9:"<3"},i=(e,t)=>{for(const n of Object.values(t)){const t=a.a(({id:t,code:n})=>{if(t>=1&&t<=14){return RegExp(`^${o[t]||n}$`).test(e)}return e===n},n);if(t)return r.g(t)}return null},c={twitch:{byId:(e,{twitchGlobal:t,twitchUser:n})=>s(e,t)||s(e,n),byName:(e,{twitchGlobal:t,twitchUser:n})=>i(e,t)||i(e,n),byText:(e,t,n,a)=>{for(const u of Object.values(t))for(const t of u){if(e.begins.length+e.contains.length===a)return!0;const u=t.code.toLowerCase().indexOf(n);if(-1!==u){e[0===u?"begins":"contains"].push(r.g(t))}}return!1}},bttv:{byId:(e,{bttvGlobal:t,bttvChannel:n})=>{const s=a.a(u.a("id",e)),o=s(t)||s(n);return o?r.b(o):null},byName:(e,{bttvGlobal:t,bttvChannel:n})=>{const s=a.a(u.a("code",e)),o=s(t)||s(n);return o?r.b(o):null},byText:(e,t,n,a)=>{for(const u of t){if(e.begins.length+e.contains.length===a)return!0;const t=u.code.toLowerCase().indexOf(n);if(-1!==t){e[0===t?"begins":"contains"].push(r.b(u))}}return!1}},ffz:{byId:(e,{ffzGlobal:t,ffzChannel:n})=>{const s=a.a(u.a("id",e)),o=s(t)||s(n);return o?r.d(o):null},byName:(e,{ffzGlobal:t,ffzChannel:n})=>{const s=a.a(u.a("name",e)),o=s(t)||s(n);return o?r.d(o):null},byText:(e,t,n,a)=>{for(const u of t){if(e.begins.length+e.contains.length===a)return!0;const t=u.name.toLowerCase().indexOf(n);if(-1!==t){e[0===t?"begins":"contains"].push(r.d(u))}}return!1}}};t.a=c},231:function(e,t){},244:function(e,t){},246:function(e,t){},27:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return s})),n.d(t,"d",(function(){return o})),n.d(t,"c",(function(){return i}));var a=n(8);const u={client_id:a.m,redirect_uri:a.n,response_type:"token+id_token",scope:["openid","channel:moderate","chat:edit","chat:read","whispers:read","whispers:edit","user_blocks_read","user_blocks_edit","user_subscriptions"].join("+"),claims:JSON.stringify({id_token:{email_verified:null,picture:null,preferred_username:null}})},r=()=>{const e=Object.entries(u).map(([e,t])=>`${e}=${t}`).join("&");return`${a.l}?${e}`},s=e=>e.startsWith("#access_token="),o=e=>{localStorage.setItem(a.h,JSON.stringify(e))},i=()=>{let e;try{e=JSON.parse(localStorage.getItem(a.h))}catch(t){e=null}return e&&e.id&&e.login?e:null}},274:function(e,t){},275:function(e,t){},280:function(e,t){},282:function(e,t){},306:function(e,t){},341:function(e,t,n){"use strict";n.r(t);var a=n(0),u=n.n(a),r=n(34),s=n(44),o=n(27),i=n(3),c=n(1),l=n(12);const d=e=>[{title:"My preferences",items:[{type:"switch",id:"show-timestamps",name:"showTimestamps",title:"Show Timestamps",description:"",value:e.options.showTimestamps},{type:"switch",id:"split-chat",name:"splitChat",title:"Split Chat",description:"",value:e.options.splitChat},{type:"switch",id:"fixed-width",name:"fixedWidth",title:"Fixed Width",description:"",value:e.options.fixedWidth},{type:"switch",id:"highlight-notifications",name:"highlightNotifications",title:"Highlight Notifications",description:"Plays a sound for messages directed at you",value:e.options.highlightNotifications}]}],m=e=>e.options.showTimestamps,g=e=>e.options.splitChat,b=e=>e.options.fixedWidth,f=e=>e.options.highlightNotifications;var h=n(192),p=n.n(h);var E=()=>{const e=Object(i.b)(),t=Object(i.c)(l.e);Object(a.useEffect)(()=>{if(t)return;const{idToken:n}=localStorage,a=Object(o.c)();if(n)if(a){const{id:t,login:n}=a,u={isAuth:!0,userId:t,userLogin:n};e(Object(l.c)(u))}else{const t=p.a.decode(n);e(t?Object(l.b)(t.sub):Object(l.c)({isAuth:!1}))}else e(Object(l.c)({isAuth:!1}))},[e,t])},v=n(6),A=n(56);var C=()=>{const e=Object(i.b)(),t=Object(i.c)(l.e),n=Object(i.c)(l.f),u=Object(i.c)(l.g),r=Object(i.c)(l.h),s=Object(i.c)(v.d),o=Object(i.c)(v.c),c=Object(i.c)(v.t),d=Object(i.c)(v.j),m=Object(i.c)(v.i),g=Object(i.c)(v.p),b=Object(i.c)(v.o),f=Object(i.c)(v.q),h=Object(i.c)(v.k),p=Object(i.c)(v.s),E=Object(i.c)(v.h),C=Object(i.c)(v.r),y=t&&s&&!C&&(!n||c)&&(!n||E)&&(!n||!!r)&&d&&m&&g&&b&&f&&h&&p;Object(a.useEffect)(()=>{e(Object(A.g)()),e(Object(A.k)()),e(Object(A.l)())},[e]),Object(a.useEffect)(()=>{y&&e(Object(A.a)({channel:s,userLogin:r}))},[e,s,y,r]),Object(a.useEffect)(()=>{!C&&s&&e(Object(A.i)(s))},[e,s,C]),Object(a.useEffect)(()=>{t&&n&&u&&(e(Object(A.m)(u)),e(Object(A.e)(u)))},[e,t,n,u]),Object(a.useEffect)(()=>{if(s&&o){const t={channel:s,channelId:o};e(Object(A.f)(t)),e(Object(A.j)(t)),e(Object(A.h)(t))}},[e,s,o])},y=n(8);var x=()=>{const e=Object(s.f)(),t=Object(i.b)(),{hash:n}=e.location;Object(a.useEffect)(()=>{if(n&&n.length>1){const e=n.slice(1);return t(Object(A.n)(e)),localStorage.setItem(y.f,e),void(document.title=e?`#${e} - Honey Chat `:"Honey Chat")}const a=localStorage.getItem(y.f);a?(e.push({pathname:"/chat/",hash:a}),t(Object(A.n)(a))):t(Object(A.n)(""))},[t,e,n])},F=n(10),D=n(61),O=n(194);var B=e=>{const t=Object(a.useRef)();return Object(a.useEffect)(()=>{t.current=e}),t.current},w=n(92);var j=e=>e.split(" ").map(e=>{if(":"!==e[0]||":"!==e[e.length-1])return e;const t=e.slice(1,-1),n=w.lib[t];return n&&n.char?n.char:e}).join(" "),k=n(93),S=n(195),R=n.n(S);var I=()=>{const e=Object(i.b)(),[t]=Object(O.a)(R.a),n=Object(i.c)(l.e),u=Object(i.c)(l.f),r=Object(i.c)(l.h),s=Object(i.c)(v.l),c=Object(i.c)(v.d),d=B(c),m=Object(a.useRef)(null),g=Object(i.c)(v.a),b=Object(i.c)(f),h=Object(a.useRef)({userLogin:r,isHighlightNotifications:b,playTink:t,blockedUsers:g});h.current={userLogin:r,isHighlightNotifications:b,playTink:t,blockedUsers:g};const p=Object(a.useCallback)(t=>{if(!t.current)return;t.current.on("register",()=>e(Object(A.p)(!0))),t.current.on("disconnect",()=>e(Object(A.p)(!1))),t.current.on("globaluserstate",t=>e(Object(A.o)(t))),t.current.on("userstate",t=>e(Object(A.r)(t))),t.current.on("roomstate",t=>e(Object(A.q)(t))),t.current.on("message",t=>{if(h.current.blockedUsers.includes(t.user))return;const n=Object(k.a)(h.current.userLogin,t.user,t.message);h.current.isHighlightNotifications&&n&&h.current.playTink(),e(Object(A.b)({type:"message",message:t,isMention:n}))}),t.current.on("notice",n=>{if(t.current&&"Login authentication failed"===n.message)return e(Object(l.d)()),t.current.disconnect(),void(t.current=null);e(Object(A.b)({type:"notice",message:n,id:Object(F.d)()}))}),t.current.on("usernotice",t=>e(Object(A.b)({type:"user-notice",message:t}))),t.current.on("clearchat",t=>{t.tags.targetUserId&&e(Object(A.c)(t))})},[e]);Object(a.useEffect)(()=>()=>{m.current&&(m.current.disconnect(),m.current=null)},[m]),Object(a.useEffect)(()=>{if(c&&n)if(m.current)d&&d!==c&&(m.current.part(d),m.current.join(c));else{const e=u?{name:r,auth:localStorage.getItem(y.c)}:null;(async()=>{m.current=new D.a(e),p(m),await m.current.connect(),m.current.join(c)})()}},[e,p,u,n,s,r,c,d]);return Object(a.useMemo)(()=>({say(t,n){if(!m.current||!n.trim())return;const a=j(n.trim());function u(n){if(n.channel===t){const u=Object(o.c)(),r={message:a,channel:t,tags:n.tags,userId:null===u||void 0===u?void 0:u.id,userLogin:null===u||void 0===u?void 0:u.login};e(Object(A.b)({type:"own-message",message:r})),s()}}function r(e){e.channel===t&&y.i.includes(e.tags.msgId)&&s()}function s(){m.current&&(m.current.off("notice",r),m.current.off("userstate",u))}m.current.say(t,a),m.current.on("notice",r),m.current.on("userstate",u),setTimeout(()=>s(),1e4)}}),[m,e])};var _=(e={})=>{const[t,n]=Object(a.useState)(e);return[t,Object(a.useCallback)(e=>{n(t=>({...t,...e instanceof Function?e(t):e}))},[n])]};var T=(e,t,n=5)=>{const a=[],u=e.toLowerCase();for(const r of t){if(a.length===n)return a;const e=r.toLowerCase();(""===u||e.startsWith(u))&&a.push(r)}return a},z=n(89);const P={type:"users",isActive:!1,items:[],activeIndex:0,start:0,end:0},N=({activeIndex:e,items:t,...n})=>({activeIndex:0===e?t.length-1:e-1,items:t,...n}),$=({activeIndex:e,items:t,...n})=>({activeIndex:e===t.length-1?0:e+1,items:t,...n}),M=(e,{type:t,items:n,activeIndex:a,start:u,end:r})=>{if(0===n.length)return e;const s=n[a],o="users"===t?"@"+s:s.alt;return`${e.substring(0,u)}${o}${e.substring(r)||" "}`};var U=(e,t,n)=>{const[u,r]=_(P),s=Object(i.c)(v.f),o=Object(i.c)(v.y),c=Object(a.useRef)(o);c.current=o;const l=Object(a.useRef)(s);l.current=s;const d=Object(a.useRef)(u);d.current=u;const m=Object(a.useCallback)(t=>{const{value:n,selectionStart:a}=t.target;e(n);const u=n.lastIndexOf(" ",a-1),s=n.indexOf(" ",a),o=-1===u?0:u+1,i=-1===s?n.length:s,m=n.substring(o,i),g=y.k.users.regex.exec(m);if(g){const[,e]=g,t=T(e,c.current,y.k.users.limit);return void r({type:"users",isActive:!0,items:t,activeIndex:0,start:o,end:i})}const b=y.k.emotes.regex.exec(m);if(b&&l.current){const[,e]=b,t=Object(z.a)(e,l.current,y.k.emotes.limit);r({type:"emotes",isActive:!0,items:t,activeIndex:0,start:o,end:i})}else d.current.isActive&&r(P)},[e,r,d]),g=Object(a.useCallback)(e=>{},[]),b=Object(a.useCallback)(n=>{if(d.current.isActive){if("Enter"===n.key||"Tab"===n.key)return n.preventDefault(),e(e=>M(e,d.current)),void r(P);if("ArrowUp"===n.key)return n.preventDefault(),void r(N);if("ArrowDown"===n.key)return n.preventDefault(),void r($);if("Escape"===n.key)return void r({isActive:!1})}d.current.isActive||"Enter"===n.key&&(n.preventDefault(),t())},[t,e,r,d]),f=Object(a.useCallback)(e=>r({activeIndex:e}),[r]),h=Object(a.useCallback)(t=>{e(e=>M(e,{...d.current,activeIndex:t})),n.current&&n.current.focus(),r(P)},[e,r,n]);return{suggestions:u,handleChange:m,handleKeyUp:g,handleKeyDown:b,handleBlur:Object(a.useCallback)(()=>{r({isActive:!1})},[r]),handleSuggestionMouseEnter:f,handleSuggestionClick:h}},L=n(203),G=n(196),H=n(197);const W=["mousedown","touchstart"],J=Object(G.a)(),K=e=>"mousedown"===e&&J?{passive:!0}:void 0,V=(e,t)=>e&&e.contains(t);var q=(e,t)=>{const n=Object(H.a)(t);Object(a.useEffect)(()=>{if(!t)return;const a=t=>{if(!e.current||!n.current)return;(Array.isArray(e.current)?e.current.some(e=>V(e.current,t.target)):V(e.current,t.target))||n.current(t)};return W.forEach(e=>{document.addEventListener(e,a,K(e))}),()=>{W.forEach(e=>{document.removeEventListener(e,a,K(e))})}},[!t])};function Y(){return(Y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var Z=u.a.createElement("path",{fill:"currentColor",d:"M8.5 10L4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z"});const Q=({svgRef:e,title:t,...n})=>u.a.createElement("svg",Y({viewBox:"0 0 20 20",ref:e},n),t?u.a.createElement("title",null,t):null,Z),X=u.a.forwardRef((e,t)=>u.a.createElement(Q,Y({svgRef:t},e)));n.p;const ee={small:c.b`
    width: 24px;
    height: 24px;
  `,medium:c.b`
    width: 30px;
    height: 30px;
  `};var te=c.c.button.attrs({type:"button"})`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;

  ${e=>ee[e.size||"medium"]};

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.15);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    box-shadow: 0 0 6px 0 #772ce8;
  }
`;const ne=c.c.div`
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 4px 8px 0px,
    rgba(0, 0, 0, 0.4) 0px 0px 4px 0px;
  background-color: #18181b;
  white-space: normal;
  color: #fff;
  border-radius: 4px;
`,ae=Object(c.c)(te).attrs({size:"small"})`
  position: absolute;
  top: 5px;
  right: 5px;
`,ue=Object(c.c)(X)`
  display: block;
  width: 20px;
  height: 20px;
`;var re=({children:e,onClose:t})=>u.a.createElement(ne,null,u.a.createElement(ae,{onClick:t},u.a.createElement(ue,null)),e);function se(){return(se=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var oe=u.a.createElement("g",{fill:"currentColor"},u.a.createElement("path",{d:"M7 11a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-4 4a2 2 0 002-2H8a2 2 0 002 2z"}),u.a.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z",clipRule:"evenodd"}));const ie=({svgRef:e,title:t,...n})=>u.a.createElement("svg",se({viewBox:"0 0 20 20",ref:e},n),t?u.a.createElement("title",null,t):null,oe),ce=u.a.forwardRef((e,t)=>u.a.createElement(ie,se({svgRef:t},e)));n.p;var le=n(201);var de=Object(c.c)(le.a).attrs({disableTracksWidthCompensation:!0})`
  overflow-y: auto;

  .ScrollbarsCustom-Content {
    padding: 0 !important;
  }

  .ScrollbarsCustom-TrackY {
    background: none !important;
  }

  .ScrollbarsCustom-ThumbY {
    margin-left: auto;
    margin-right: auto;
    width: 6px !important;
  }
`;function me(){return(me=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var ge=u.a.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z",clipRule:"evenodd"});const be=({svgRef:e,title:t,...n})=>u.a.createElement("svg",me({viewBox:"0 0 20 20",ref:e},n),t?u.a.createElement("title",null,t):null,ge),fe=u.a.forwardRef((e,t)=>u.a.createElement(be,me({svgRef:t},e)));n.p;const he=c.c.div`
  padding-top: 30px;
  padding-bottom: 16px;
  height: 100%;
`,pe=c.c.div`
  height: calc(100% - 30px);
`,Ee=c.c.div`
  padding-top: 10px;
  padding-right: 16px;
  padding-left: 16px;

  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
`,ve=c.c.div`
  padding-bottom: 10px;
  font-size: 12px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
`,Ae=c.c.div``,Ce=c.c.img`
  padding: 2px;
  width: 32px;
  height: 32px;
  object-fit: contain;

  &:hover {
    background-color: rgba(119, 44, 232, 0.2);
    cursor: pointer;
  }
`,ye=c.c.div`
  position: relative;
  padding: 0 16px;
  color: #adadb8;
`,xe=c.c.input`
  padding-left: 30px;
  padding-right: 10px;
  width: 100%;
  height: 30px;
  color: #efeff1;
  font-family: inherit;
  line-height: 1.5;
  background-clip: padding-box;
  background-color: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.15);
  outline: 0;
  border-radius: 4px;
  appearance: none;
  transition: box-shadow 0.1s ease-in, border 0.1s ease-in,
    background-color 0.1s ease-in;

  &:focus {
    background-color: #000;
    border-color: #9147ff;
  }
`,Fe=Object(c.c)(fe)`
  position: absolute;
  top: 50%;
  left: 21px;
  display: block;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
`;var De=({onEmoteClick:e})=>{const[t,n]=Object(a.useState)(""),r=Object(a.useRef)(null),s=Object(i.c)(e=>Object(v.e)(e,t));Object(a.useEffect)(()=>(r.current&&r.current.focus(),()=>n("")),[]);return u.a.createElement(he,null,u.a.createElement(ye,null,u.a.createElement(Fe,null),u.a.createElement(xe,{ref:r,placeholder:"Search for Emotes",value:t,onChange:e=>n(e.target.value)})),u.a.createElement(pe,null,u.a.createElement(de,null,s.map(({title:t,items:n},a)=>u.a.createElement(Ee,{key:a},!!t&&u.a.createElement(ve,null,t),u.a.createElement(Ae,null,n.map(({alt:t,src:n,srcSet:a})=>u.a.createElement(Ce,{key:t,alt:t,src:n,srcSet:a,onClick:()=>e(t)}))))))))};const Oe=c.c.div`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #18181b;

  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`,Be=c.c.div`
  position: relative;
`,we=c.c.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  margin-left: -5px;
  margin-bottom: -5px;
  margin-right: -5px;
  margin-bottom: 0;
  padding-top: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: none;
  background-color: #18181b;
  color: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  /* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 0px 2px rgba(0, 0, 0, 0.1); */
`,je=c.c.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 2px;
  background-color: ${e=>e.isActive?"rgba(255, 255, 255, 0.15)":"transparent"};
  cursor: pointer;
`,ke=c.c.img`
  margin-right: 8px;
  width: 28px;
  height: 28px;
  object-fit: contain;
`,Se=c.c.div`
  position: relative;
`,Re=c.c.div`
  ${e=>e.isSuggestions&&c.b`
      margin-left: -5px;
      margin-bottom: -5px;
      margin-right: -5px;
      padding: 5px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-top: none;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      /* box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1),
        0 2px 2px -2px rgba(0, 0, 0, 0.02); */

      & > ${Se} {
        margin-left: -1px;
        margin-bottom: -1px;
        margin-right: -1px;
      }
    `};
`,Ie=c.c.div`
  position: absolute;
  top: auto;
  right: 0;
  bottom: 100%;
  margin-bottom: 8px;
  width: 320px;
  height: 405px;
  min-width: 0;
  white-space: nowrap;
`,_e=Object(c.c)(L.a)`
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 32px;
  width: 100%;
  height: 38px;
  max-height: 91px;
  min-height: 40px;
  overflow-x: hidden;
  overflow-y: ${e=>e.$showScroll?"auto":"hidden"};
  border: 2px solid transparent;
  background-color: rgba(255, 255, 255, 0.15);
  font-family: inherit;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 4px;
  outline: none;
  color: #fff;
  resize: none;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
  transition-property: box-shadow, border, background-color;

  &:focus {
    background-color: #000;
    border-color: #9147ff;
  }

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`,Te=Object(c.c)(te)`
  position: absolute;
  right: 5px;
  bottom: 5px;
`,ze=Object(c.c)(ce)`
  display: block;
  width: 20px;
  height: 20px;
`,Pe=u.a.forwardRef(({text:e,suggestions:t,isDisabled:n,onEmoteClick:r,onChange:s,onKeyUp:o,onKeyDown:c,onBlur:l,onSuggestionMouseEnter:d,onSuggestionClick:m},g)=>{const b=Object(a.useRef)(null),f=Object(a.useRef)(null),h=Object(a.useRef)([g,f]);q(h,()=>l());const[p,E]=Object(a.useState)(!1),[A,C]=Object(a.useState)(!1),y=Object(i.c)(v.m),x=()=>C(!1);q(b,x);return u.a.createElement(Oe,{ref:b},u.a.createElement(Be,null,t.isActive&&(({type:e,items:t,activeIndex:n})=>{const a=(e,t)=>u.a.createElement(je,{key:e,isActive:t===n,onMouseEnter:()=>d(t),onClick:()=>m(t)},e),r=({src:e,srcSet:t,alt:a},r)=>u.a.createElement(je,{key:a,isActive:r===n,onMouseEnter:()=>d(r),onClick:()=>m(r)},u.a.createElement(ke,{src:e,srcSet:t,alt:a}),a);return u.a.createElement(we,{ref:f},t.length?"users"===e?t.map(a):t.map(r):"No matches")})(t),u.a.createElement(Re,{isSuggestions:t.isActive},u.a.createElement(Se,null,u.a.createElement(_e,{inputRef:g,value:e,placeholder:"Send a message",maxLength:500,maxRows:4,disabled:n,$showScroll:p,onChange:s,onKeyUp:o,onKeyDown:c,onHeightChange:e=>E(e>=96)}),y&&u.a.createElement(Te,{onClick:()=>C(!A)},u.a.createElement(ze,null)))),A&&u.a.createElement(Ie,null,u.a.createElement(re,{onClose:x},u.a.createElement(De,{onEmoteClick:r})))))});var Ne=u.a.memo(Pe);function $e(){return($e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var Me=u.a.createElement("g",{fill:"currentColor"},u.a.createElement("path",{d:"M10 8a2 2 0 100 4 2 2 0 000-4z"}),u.a.createElement("path",{fillRule:"evenodd",d:"M9 2h2a2.01 2.01 0 001.235 1.855l.53.22a2.01 2.01 0 002.185-.439l1.414 1.414a2.01 2.01 0 00-.439 2.185l.22.53A2.01 2.01 0 0018 9v2a2.01 2.01 0 00-1.855 1.235l-.22.53a2.01 2.01 0 00.44 2.185l-1.415 1.414a2.01 2.01 0 00-2.184-.439l-.531.22A2.01 2.01 0 0011 18H9a2.01 2.01 0 00-1.235-1.854l-.53-.22a2.009 2.009 0 00-2.185.438L3.636 14.95a2.009 2.009 0 00.438-2.184l-.22-.531A2.01 2.01 0 002 11V9c.809 0 1.545-.487 1.854-1.235l.22-.53a2.009 2.009 0 00-.438-2.185L5.05 3.636a2.01 2.01 0 002.185.438l.53-.22A2.01 2.01 0 009 2zm-4 8l1.464 3.536L10 15l3.535-1.464L15 10l-1.465-3.536L10 5 6.464 6.464 5 10z",clipRule:"evenodd"}));const Ue=({svgRef:e,title:t,...n})=>u.a.createElement("svg",$e({viewBox:"0 0 20 20",ref:e},n),t?u.a.createElement("title",null,t):null,Me),Le=u.a.forwardRef((e,t)=>u.a.createElement(Ue,$e({svgRef:t},e)));n.p;function Ge(){return(Ge=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var He=u.a.createElement("path",{fill:"#fff",d:"M13 8l-5 5v18h6v5l5-5h4l9-9V8z"}),We=u.a.createElement("path",{fill:"#9147ff",d:"M26 25l4-4V10H14v15h4v4l4-4z"}),Je=u.a.createElement("path",{fill:"#fff",d:"M20 14h2v6h-2v-6zm7 0v6h-2v-6h2z"});const Ke=({svgRef:e,title:t,...n})=>u.a.createElement("svg",Ge({viewBox:"0 0 40 40",ref:e},n),t?u.a.createElement("title",null,t):null,He,We,Je),Ve=u.a.forwardRef((e,t)=>u.a.createElement(Ke,Ge({svgRef:t},e)));n.p;var qe=c.c.button.attrs({type:"button"})`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  height: 30px;
  border: none;
  color: #fff;
  background-color: #9147ff;
  outline: none;
  font-size: 12px;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #772ce8;
  }

  &:active {
    background-color: #5c16c5;
  }

  &:focus {
    box-shadow: 0 0 6px 0 #772ce8;
  }

  &[disabled] {
    background-color: rgba(255, 255, 255, 0.26);
    color: rgba(255, 255, 255, 0.8);
    opacity: 0.5;
    cursor: not-allowed;
  }
`;const Ye=c.c.div`
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 20px;
`,Ze=c.c.label`
  content: '';
  position: relative;
  display: inline-block;
  order: 0;
  width: 35px;
  height: 20px;
  vertical-align: bottom;
  border-radius: 10px/50%;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 0 2px rgba(0, 0, 0, 0.1);
  transition: background-color 0.1s ease;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    bottom: 2px;
    display: block;
    width: 16px;
    border-radius: 50%;
    background-color: #fff;
    transition: left 0.1s ease;
  }
`,Qe=c.c.input.attrs({type:"checkbox"})`
  position: absolute;
  opacity: 0;

  &:checked + ${Ze} {
    background-color: #9147ff;

    &:after {
      content: '';
      top: 2px;
      left: calc(100% - 18px);
    }

    &:before {
      content: '';
      position: absolute;
      top: 9px;
      left: 10px;
      display: block;
      height: 3px;
      width: 7px;
      border-bottom: 2px solid #fff;
      border-left: 2px solid #fff;
      transform: translate3d(-50%, -50%, 0) rotate(-45deg);
    }
  }
`,Xe=({id:e,label:t,checked:n,readOnly:a,onChange:r})=>u.a.createElement(Ye,null,u.a.createElement(Qe,{id:e,"aria-label":t,checked:n,readOnly:a,onChange:r}),u.a.createElement(Ze,{htmlFor:e}));Xe.defaultProps={checked:!1,readOnly:!1,onChange:()=>{}};var et=Xe,tt=n(73);const nt=c.c.div`
  padding: 16px;
  height: 100%;
`,at=c.c.h2`
  margin: 0;
  padding: 0;
  font-size: 14px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`,ut=Object(c.c)(de)`
  height: 100%;
`,rt=c.c.div`
  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
`,st=c.c.div`
  padding: 8px 0;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.6);
`,ot=c.c.div``,it=c.c.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  cursor: pointer;
`,ct=c.c.span``,lt=c.c.div`
  display: flex;
  align-items: center;
`,dt=c.c.div`
  font-weight: bold;
  color: ${e=>e.color};
`,mt=Object(c.c)(r.b)`
  margin-left: auto;
  color: #bf94ff;
  text-decoration: none;
  cursor: pointer;

  &:focus,
  &:hover {
    color: #a970ff;
    text-decoration: underline;
  }

  &:visited {
    color: #a970ff;
  }
`,gt=c.c.img`
  margin-right: 3px;
  max-width: 100%;
  vertical-align: middle;
  border-radius: 3px;
`;var bt=()=>{const e=Object(i.b)(),t=Object(i.c)(d),n=Object(i.c)(l.f),r=Object(i.c)(v.x),s=Object(i.c)(v.w),o=Object(i.c)(v.v),c=Object(a.useCallback)(({id:t,name:n,title:a,description:r,value:s})=>u.a.createElement(it,{key:t,onClick:()=>e(Object(tt.a)({name:n,value:!s})),title:r},u.a.createElement(ct,null,a),u.a.createElement(et,{id:t,label:a,checked:s,onChange:()=>e(Object(tt.a)({name:n,value:s}))})),[e]),m=Object(a.useCallback)(({title:e,items:t},n)=>u.a.createElement(rt,{key:n},!!e&&u.a.createElement(st,null,e),u.a.createElement(ot,null,t.map(c))),[c]);return u.a.createElement(nt,null,u.a.createElement(at,null,"Chat settings"),u.a.createElement(ut,null,n&&u.a.createElement(rt,null,u.a.createElement(st,null,"Profile"),u.a.createElement(ot,null,u.a.createElement(lt,null,o.map(({alt:e,label:t,src:n,srcSet:a},r)=>u.a.createElement(gt,{key:r,alt:e,"aria-label":t,src:n,srcSet:a})),u.a.createElement(dt,{color:s},r),u.a.createElement(mt,{to:"/chat/logout"},"Log Out")))),t.map(m)))};const ft=c.c.div`
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
`,ht=c.c.div`
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 8px;
  }
`,pt=c.c.div`
  position: absolute;
  top: auto;
  right: 10px;
  bottom: 100%;
  margin-bottom: 10px;
  width: 320px;
  height: 405px;
  min-width: 0;
  white-space: nowrap;
`,Et=(c.b`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  height: 30px;
  border: none;
  color: #fff;
  background-color: #9147ff;
  outline: none;
  font-size: 12px;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #772ce8;
  }

  &:active {
    background-color: #5c16c5;
  }

  &:focus {
    box-shadow: 0 0 6px 0 #772ce8;
  }

  &[disabled] {
    background-color: rgba(255, 255, 255, 0.26);
    color: rgba(255, 255, 255, 0.8);
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Object(c.c)(te)`
  margin-left: auto;
`),vt=Object(c.c)(Le)`
  display: block;
  width: 20px;
  height: 20px;
`,At=Object(c.c)(Ve)`
  display: block;
  margin-right: 4px;
  width: 20px;
  height: 20px;
`;var Ct=u.a.memo(({isDisabled:e,onSendMessage:t})=>{const[n,s]=Object(a.useState)(!1),o=Object(a.useRef)(null),c=Object(a.useRef)(null),d=Object(a.useRef)([o,c]),m=Object(i.c)(l.e),g=Object(i.c)(l.f),b=()=>s(!1);q(d,b);return u.a.createElement(ft,null,u.a.createElement(ht,null,m&&!g&&u.a.createElement(qe,{as:r.b,to:"/chat/auth"},u.a.createElement(At,null),"Sign in with Twitch"),u.a.createElement(Et,{ref:c,onClick:()=>s(e=>!e)},u.a.createElement(vt,null)),u.a.createElement(qe,{disabled:e,onClick:t},"Chat")),n&&u.a.createElement(pt,{ref:o},u.a.createElement(re,{onClose:b},u.a.createElement(bt,null))))}),yt=n(84),xt=n(355);const Ft=c.c.div`
  padding: 5px 20px;
  color: ${e=>e.isAction?e.color:"#fff"};
  opacity: ${e=>e.isHistory||e.isDeleted?"0.5":"1"};
  line-height: 20px;
  word-wrap: break-word;
  background-color: ${e=>e.isMention?"rgba(255, 0, 0, 0.3)":e.isEven?"#1f1925":"transparent"};
`,Dt=c.c.span`
  font-weight: bold;
  color: ${e=>e.color};
  cursor: pointer;
`,Ot=c.c.img`
  display: inline-block;
  margin-top: -5px;
  margin-bottom: -4px;
  width: 20px;
  height: auto;
  vertical-align: middle;
`,Bt=c.c.img`
  display: inline-block;
  margin: -5px 0;
  vertical-align: middle;

  /* Prevent stacking of IceCold, SoSnowy */
  &[data-emote-id='5849c9a4f52be01a7ee5f79d'] + &[data-emote-id='5849c9a4f52be01a7ee5f79d'],
  &[data-emote-id='567b5b520e984428652809b6'] + &[data-emote-id='567b5b520e984428652809b6'] {
    display: none;
  }

  /* IceCold */
  &        + &[data-emote-id='5849c9a4f52be01a7ee5f79d'],
  ${Ot} + &[data-emote-id='5849c9a4f52be01a7ee5f79d'] {
    margin-left: -33px;
  }

  /* SoSnowy */
  &        + &[data-emote-id='567b5b520e984428652809b6'],
  ${Ot} + &[data-emote-id='567b5b520e984428652809b6'] {
    margin-left: -32px;
  }

  /* SantaHat */
  &        + &[data-emote-id='58487cc6f52be01a7ee5f205'],
  ${Ot} + &[data-emote-id='58487cc6f52be01a7ee5f205'] {
    margin-left: -34px;
    margin-top: -18px;
  }

  /* TopHat, CandyCane, ReinDeer */
  &        + &[data-emote-id='5849c9c8f52be01a7ee5f79e'],
  ${Ot} + &[data-emote-id='5849c9c8f52be01a7ee5f79e'],
  &        + &[data-emote-id='567b5c080e984428652809ba'],
  ${Ot} + &[data-emote-id='567b5c080e984428652809ba'],
  &        + &[data-emote-id='567b5dc00e984428652809bd'],
  ${Ot} + &[data-emote-id='567b5dc00e984428652809bd'] {
    margin-left: -31px;
    margin-top: -18px;
  }

  /* cvHazmat, cvMask */
  &        + &[data-emote-id='5e76d338d6581c3724c0f0b2'],
  ${Ot} + &[data-emote-id='5e76d338d6581c3724c0f0b2'],
  &        + &[data-emote-id='5e76d399d6581c3724c0f0b8'],
  ${Ot} + &[data-emote-id='5e76d399d6581c3724c0f0b8'] {
    margin-left: -34px;
    height: 34px;
    width: 34px;
  }
`,wt=c.c.span`
  ${e=>(e.isActive||e.isOwnMessage)&&c.b`
      padding: 2px 4px;
    `};
  ${e=>e.isOwnMessage&&c.b`
      background-color: #40404a;
      color: #fff;
    `};
  ${e=>e.isActive&&c.b`
      background-color: #fafafa;
      color: #18181b;
    `};
`,jt=c.c.a`
  color: #bf94ff;
  text-decoration: none;
  cursor: pointer;

  &:focus,
  &:hover {
    color: #a970ff;
    text-decoration: underline;
  }

  &:visited {
    color: #a970ff;
  }
`,kt=c.c.span`
  margin-right: 5px;
  color: rgba(255, 255, 255, 0.6);
`,St=c.c.img`
  margin-bottom: 2px;
  margin-right: 3px;
  max-width: 100%;
  vertical-align: middle;
  border-radius: 3px;
`;var Rt=u.a.memo(({message:{entities:e,user:{login:t,color:n,displayName:r,badges:s},timestamp:o,isHistory:i,isAction:c,isDeleted:l,isMention:d},userLogin:m,isEven:g,isShowTimestamps:b,onNameRightClick:f})=>{const[h,p]=Object(a.useState)(!1);return u.a.createElement(Ft,{isHistory:i,isAction:c,isEven:g,isMention:d,isDeleted:l,color:n},b&&u.a.createElement(kt,null,Object(xt.a)("h:mm",new Date(o))),s.length>0&&(e=>e.map(({alt:e,label:t,src:n,srcSet:a},r)=>u.a.createElement(St,{key:r,alt:e,"aria-label":t,src:n,srcSet:a})))(s),u.a.createElement(Dt,{color:n,onContextMenu:e=>{f(r),e.preventDefault()}},r),c?" ":": ",l&&!h?u.a.createElement(jt,{onClick:()=>p(!0)},"<message deleted>"):e.map(((e,t)=>(n,a)=>"object"!==typeof n?n:"twitch-emote"===n.type||"bttv-emote"===n.type||"ffz-emote"===n.type?u.a.createElement(Bt,{key:a,src:n.src,srcSet:n.srcSet,alt:n.alt,"data-emote-id":n.id}):"emoji"===n.type?u.a.createElement(Ot,{key:a,src:n.src,alt:n.alt}):"mention"===n.type?u.a.createElement(wt,{key:a,isActive:n.target===t,isOwnMessage:e===t},n.text):"link"===n.type?u.a.createElement(jt,{key:a,href:n.href,rel:"noreferrer noopener",target:"_blank"},n.text):null)(t,m)))});const It=c.c.div`
  padding: 5px 20px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 20px;
  word-wrap: break-word;
  background-color: ${e=>e.isEven?"#1f1925":"transparent"};
`;var _t=({message:{message:e},isEven:t})=>u.a.createElement(It,{isEven:t},e);const Tt=c.c.div`
  padding: 5px 20px 5px 16px;
  line-height: 20px;
  word-wrap: break-word;
  border-left: 4px solid #9147ff;
  color: #fff;
`;var zt=({message:{systemMessage:e}})=>u.a.createElement(Tt,null,e);var Pt=u.a.memo(({message:e,userLogin:t,isEven:n,isShowTimestamps:a,onNameRightClick:r})=>"message"===e.type?u.a.createElement(Rt,{message:e,userLogin:t,isEven:n,isShowTimestamps:a,onNameRightClick:r}):"notice"===e.type?u.a.createElement(_t,{message:e,isEven:n}):"user-notice"===e.type?u.a.createElement(zt,{message:e}):Object(yt.a)(e));const Nt=c.c.div`
  position: relative;
  flex-grow: 1;
`,$t=Object(c.c)(de)`
  .ScrollbarsCustom-Content {
    padding-bottom: 10px !important;
  }
`,Mt=c.c.button`
  position: absolute;
  left: 50%;
  bottom: 10px;
  display: ${e=>e.isVisible?"block":"none"};
  padding: 5px 20px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 4px;
  border: none;
  outline: none;
  cursor: pointer;
  transform: translateX(-50%);
`;var Ut=({onNameRightClick:e})=>{const[t,n]=Object(a.useState)(!1),r=Object(i.c)(v.u),s=Object(i.c)(l.h),o=Object(i.c)(v.n),c=Object(i.c)(m),d=Object(i.c)(g),b=Object(a.useRef)(null),f=()=>{b.current&&b.current.scrollToBottom()};Object(a.useEffect)(()=>{t||f()},[r]);const h=e=>!!d&&(o?e%2===1:e%2===0);return u.a.createElement(Nt,null,u.a.createElement($t,{onUpdate:({clientHeight:e,contentScrollHeight:t,scrollTop:a})=>{n(a+100<t-e)},ref:b},r.map((t,n)=>u.a.createElement(Pt,{key:t.id,message:t,userLogin:s,isEven:h(n),isShowTimestamps:c,onNameRightClick:e}))),u.a.createElement(Mt,{onClick:f,isVisible:t},"More messages below"))};const Lt=c.c.div`
  padding: 10px;
  flex-grow: 1;
  width: 320px;
`,Gt=c.c.h2`
  margin-top: 0;
  margin-bottom: 10px;
  padding: 0;
  color: #fff;
`,Ht=c.c.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: 10px;
  }
`,Wt=c.c.input`
  display: block;
  padding: 4px 10px;
  width: 100%;
  border: 2px solid transparent;
  background-color: rgba(255, 255, 255, 0.15);
  font-family: inherit;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 4px;
  outline: none;
  color: #fff;
  resize: none;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
  transition-property: box-shadow, border, background-color;

  &:focus {
    background-color: #000;
    border-color: #9147ff;
  }

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`,Jt=Object(c.c)(qe)`
  flex-shrink: none;
`;var Kt=()=>{const e=Object(s.f)(),[t,n]=Object(a.useState)(""),r=Object(a.useRef)(null);Object(a.useEffect)(()=>{r.current&&r.current.focus()},[]);const o=()=>{e.push({pathname:"/chat/",hash:t})};return u.a.createElement(Lt,null,u.a.createElement(Gt,null,"Channel to join: "),u.a.createElement(Ht,null,u.a.createElement(Wt,{ref:r,value:t,onChange:e=>n(e.target.value),onKeyPress:e=>{"Enter"===e.key&&o()}}),u.a.createElement(Jt,{onClick:o,disabled:!t},"Join")))};const Vt=c.c.div`
  height: 100vh;
  font-size: 12px;
  background-color: #0e0e10;
`,qt=c.c.div`
  display: flex;
  flex-direction: column;
  width: ${e=>e.isFixedWidth?"340px":"auto"};
  height: 100%;
  background-color: #18181b;
`;var Yt=()=>{const[e,t]=Object(a.useState)(""),n=I();E(),x(),C();const r=Object(i.c)(v.d),s=Object(i.c)(l.f),o=Object(i.c)(v.l),c=Object(i.c)(b),d=Object(a.useRef)(null),m=Object(a.useRef)(e);m.current=e;const g=!s||!o,f=Object(a.useCallback)(()=>{n&&m.current&&(n.say(r,m.current),t(""))},[n,r,m,t]),h=U(t,f,d),p=Object(a.useCallback)(e=>{t(t=>`${t.trim()} @${e} `.trimLeft()),d.current&&d.current.focus()},[t,d]),A=Object(a.useCallback)(e=>{t(t=>`${t.trim()} ${e} `.trimLeft())},[t]);return u.a.createElement(Vt,null,u.a.createElement(qt,{isFixedWidth:c},r?u.a.createElement(Ut,{onNameRightClick:p}):u.a.createElement(Kt,null),u.a.createElement(Ne,{ref:d,text:e,suggestions:h.suggestions,isDisabled:g,onEmoteClick:A,onChange:h.handleChange,onKeyUp:h.handleKeyUp,onKeyDown:h.handleKeyDown,onBlur:h.handleBlur,onSuggestionMouseEnter:h.handleSuggestionMouseEnter,onSuggestionClick:h.handleSuggestionClick}),u.a.createElement(Ct,{isDisabled:g,onSendMessage:f})))};var Zt=()=>(window.location.href=Object(o.a)(),null);var Qt=()=>{const e=Object(s.f)(),t=Object(i.b)();return localStorage.removeItem(y.c),localStorage.removeItem(y.e),localStorage.removeItem(y.h),t(Object(l.d)()),e.push({pathname:"/chat/",hash:localStorage.getItem(y.f)||""}),null};var Xt=()=>{const e=Object(s.f)();if(!window.location.hash)return null;const t=new URLSearchParams(window.location.hash.slice(1)),n=t.get("access_token"),a=t.get("id_token");return n&&a?(localStorage.setItem(y.c,n),localStorage.setItem(y.e,a),e.push({pathname:"/chat/",hash:localStorage.getItem(y.f)||""}),null):null},en=c.b`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: Roobert, Helvetica Neue, Helvetica, Arial, sans-serif;
  }
`,tn=c.b``,nn=c.b``,an=c.a`
  :root {
    ${tn};
    ${nn};
  }
  ${en};
`;const un=({location:e})=>Object(o.b)(e.hash)?u.a.createElement(Xt,null):u.a.createElement(Yt,null);t.default=()=>u.a.createElement(u.a.Fragment,null,u.a.createElement(r.a,null,u.a.createElement(s.c,null,u.a.createElement(s.a,{exact:!0,path:"/chat/",render:un}),u.a.createElement(s.a,{exact:!0,path:"/chat/auth",component:Zt}),u.a.createElement(s.a,{exact:!0,path:"/chat/logout",component:Qt}))),u.a.createElement(an,null))},342:function(e,t,n){"use strict";n.r(t);var a=n(0),u=n.n(a),r=n(71),s=n.n(r),o=n(3),i=n(122);const c=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)),l=(e,t)=>{navigator.serviceWorker.register(e).then(e=>{e.onupdatefound=()=>{const n=e.installing;null!=n&&(n.onstatechange=()=>{"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(e=>{console.error("Error during service worker registration:",e)})};var d=n(27),m=n(10),g=n(31),b=n(12),f=n(56),h=n(73);var p=Object(g.c)({auth:b.a,chat:f.d,options:h.b});var E=Object(m.a)({reducer:p});if(i.a.initialize("UA-139550930-3"),!Object(d.b)(window.location.hash)){const e=window.location.pathname+window.location.search+window.location.hash;i.a.pageview(e)}(()=>{const e=n(341).default;s.a.render(u.a.createElement(o.a,{store:E},u.a.createElement(e,null)),document.getElementById("root"))})(),(e=>{if("serviceWorker"in navigator){if(new URL("/chat",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",()=>{const t="/chat/service-worker.js";c?(((e,t)=>{fetch(e,{headers:{"Service-Worker":"script"}}).then(n=>{const a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(e=>{e.unregister().then(()=>{window.location.reload()})}):l(e,t)}).catch(()=>{console.log("No internet connection found. App is running in offline mode.")})})(t,e),navigator.serviceWorker.ready.then(()=>{console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):l(t,e)})}})()},56:function(e,t,n){"use strict";n.d(t,"i",(function(){return I})),n.d(t,"m",(function(){return J})),n.d(t,"g",(function(){return K})),n.d(t,"f",(function(){return V})),n.d(t,"k",(function(){return q})),n.d(t,"j",(function(){return Y})),n.d(t,"l",(function(){return Q})),n.d(t,"h",(function(){return X})),n.d(t,"e",(function(){return ee})),n.d(t,"p",(function(){return ae})),n.d(t,"n",(function(){return ue})),n.d(t,"c",(function(){return re})),n.d(t,"b",(function(){return se})),n.d(t,"a",(function(){return oe})),n.d(t,"o",(function(){return ie})),n.d(t,"r",(function(){return ce})),n.d(t,"q",(function(){return le}));var a=n(10),u=n(20),r=n(8),s=n(84),o=n(61),i=n(189),c=n(6),l=n(96),d=n(123),m=n(74),g=n(28),b=n(354),f=n(190),h=n(92),p=n(191),E=n.n(p),v=n(14),A=n(23);const C=/^@([0-9A-Z_a-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10107}-\u{10133}\u{10140}-\u{10178}\u{1018A}\u{1018B}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{102E1}-\u{102FB}\u{10300}-\u{10323}\u{1032D}-\u{1034A}\u{10350}-\u{10375}\u{10380}-\u{1039D}\u{103A0}-\u{103C3}\u{103C8}-\u{103CF}\u{103D1}-\u{103D5}\u{10400}-\u{1049D}\u{104A0}-\u{104A9}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10858}-\u{10876}\u{10879}-\u{1089E}\u{108A7}-\u{108AF}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{108FB}-\u{1091B}\u{10920}-\u{10939}\u{10980}-\u{109B7}\u{109BC}-\u{109CF}\u{109D2}-\u{10A00}\u{10A10}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A40}-\u{10A48}\u{10A60}-\u{10A7E}\u{10A80}-\u{10A9F}\u{10AC0}-\u{10AC7}\u{10AC9}-\u{10AE4}\u{10AEB}-\u{10AEF}\u{10B00}-\u{10B35}\u{10B40}-\u{10B55}\u{10B58}-\u{10B72}\u{10B78}-\u{10B91}\u{10BA9}-\u{10BAF}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10CFA}-\u{10D23}\u{10D30}-\u{10D39}\u{10E60}-\u{10E7E}\u{10E80}-\u{10EA9}\u{10EB0}\u{10EB1}\u{10F00}-\u{10F27}\u{10F30}-\u{10F45}\u{10F51}-\u{10F54}\u{10FB0}-\u{10FCB}\u{10FE0}-\u{10FF6}\u{11003}-\u{11037}\u{11052}-\u{1106F}\u{11083}-\u{110AF}\u{110D0}-\u{110E8}\u{110F0}-\u{110F9}\u{11103}-\u{11126}\u{11136}-\u{1113F}\u{11144}\u{11147}\u{11150}-\u{11172}\u{11176}\u{11183}-\u{111B2}\u{111C1}-\u{111C4}\u{111D0}-\u{111DA}\u{111DC}\u{111E1}-\u{111F4}\u{11200}-\u{11211}\u{11213}-\u{1122B}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A8}\u{112B0}-\u{112DE}\u{112F0}-\u{112F9}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133D}\u{11350}\u{1135D}-\u{11361}\u{11400}-\u{11434}\u{11447}-\u{1144A}\u{11450}-\u{11459}\u{1145F}-\u{11461}\u{11480}-\u{114AF}\u{114C4}\u{114C5}\u{114C7}\u{114D0}-\u{114D9}\u{11580}-\u{115AE}\u{115D8}-\u{115DB}\u{11600}-\u{1162F}\u{11644}\u{11650}-\u{11659}\u{11680}-\u{116AA}\u{116B8}\u{116C0}-\u{116C9}\u{11700}-\u{1171A}\u{11730}-\u{1173B}\u{11800}-\u{1182B}\u{118A0}-\u{118F2}\u{118FF}-\u{11906}\u{11909}\u{1190C}-\u{11913}\u{11915}\u{11916}\u{11918}-\u{1192F}\u{1193F}\u{11941}\u{11950}-\u{11959}\u{119A0}-\u{119A7}\u{119AA}-\u{119D0}\u{119E1}\u{119E3}\u{11A00}\u{11A0B}-\u{11A32}\u{11A3A}\u{11A50}\u{11A5C}-\u{11A89}\u{11A9D}\u{11AC0}-\u{11AF8}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C2E}\u{11C40}\u{11C50}-\u{11C6C}\u{11C72}-\u{11C8F}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D30}\u{11D46}\u{11D50}-\u{11D59}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D89}\u{11D98}\u{11DA0}-\u{11DA9}\u{11EE0}-\u{11EF2}\u{11FB0}\u{11FC0}-\u{11FD4}\u{12000}-\u{12399}\u{12400}-\u{1246E}\u{12480}-\u{12543}\u{13000}-\u{1342E}\u{14400}-\u{14646}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16A60}-\u{16A69}\u{16AD0}-\u{16AED}\u{16B00}-\u{16B2F}\u{16B40}-\u{16B43}\u{16B50}-\u{16B59}\u{16B5B}-\u{16B61}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16E40}-\u{16E96}\u{16F00}-\u{16F4A}\u{16F50}\u{16F93}-\u{16F9F}\u{16FE0}\u{16FE1}\u{16FE3}\u{17000}-\u{187F7}\u{18800}-\u{18CD5}\u{18D00}-\u{18D08}\u{1B000}-\u{1B11E}\u{1B150}-\u{1B152}\u{1B164}-\u{1B167}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1D2E0}-\u{1D2F3}\u{1D360}-\u{1D378}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D6C0}\u{1D6C2}-\u{1D6DA}\u{1D6DC}-\u{1D6FA}\u{1D6FC}-\u{1D714}\u{1D716}-\u{1D734}\u{1D736}-\u{1D74E}\u{1D750}-\u{1D76E}\u{1D770}-\u{1D788}\u{1D78A}-\u{1D7A8}\u{1D7AA}-\u{1D7C2}\u{1D7C4}-\u{1D7CB}\u{1D7CE}-\u{1D7FF}\u{1E100}-\u{1E12C}\u{1E137}-\u{1E13D}\u{1E140}-\u{1E149}\u{1E14E}\u{1E2C0}-\u{1E2EB}\u{1E2F0}-\u{1E2F9}\u{1E800}-\u{1E8C4}\u{1E8C7}-\u{1E8CF}\u{1E900}-\u{1E943}\u{1E94B}\u{1E950}-\u{1E959}\u{1EC71}-\u{1ECAB}\u{1ECAD}-\u{1ECAF}\u{1ECB1}-\u{1ECB4}\u{1ED01}-\u{1ED2D}\u{1ED2F}-\u{1ED3D}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}\u{1F100}-\u{1F10C}\u{1FBF0}-\u{1FBF9}\u{20000}-\u{2A6DD}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2F800}-\u{2FA1D}\u{30000}-\u{3134A}]+)/u,y=E()({strict:!1}),x=e=>Object.entries(e).reduce((e,[t,n])=>{const a=Number.parseInt(t,10);return{...e,...n.reduce((e,{start:t})=>({...e,[t]:a}),{})}},{}),F=(e,t,n)=>{if(!t)return null;if(n){const n=A.a.twitch.byName(e,t);if(n)return n}const a=A.a.bttv.byName(e,t)||A.a.ffz.byName(e,t);if(a)return a;const u=Object(f.parse)(e,{assetType:"png"});if(u&&1===u.length&&u[0].text.length===e.length){const t=(r=e,l.a(d.a(m.a("char",r)),g.a,b.a)(h.lib));if(t){const[{url:e}]=u;return v.c(t,e)}}var r;const s=e.match(C);if(s){const[t,n]=s;return[v.f(t,n.toLowerCase()),e.length-t.length]}const o=e.match(y);return o&&o[0].length===e.length?v.e(e):null};var D=(e,t,n,a=!1)=>{const u=[];let r=0,s=0;do{const o=e.indexOf(" ",r+1),i=0===r?r:r+1,c=-1===o?e.length:o,l=e.substring(i,c);if(l){let r=null;if(!a&&n&&Object.keys(n).length>0){const e=x(n)[i];e&&(r=v.g({id:e,code:l}))}if(r||(r=F(l,t,a)),r){if(s!==i){const t=e.substring(s,i);u.push(t)}if(Array.isArray(r)){const[e,t]=r;u.push(e),s=c-t}else u.push(r),s=c}}if(-1===o&&s!==c){const t=e.substring(s,c);u.push(t)}r=o}while(-1!==r);return u},O=n(93),B=n(90);const w=(e,t,n)=>{const a={chat:t},u=Object(c.g)(a),r=Object(c.b)(a),s=Object(c.f)(a),l=Object(c.a)(a);return e.reduce((e,t)=>{const a=i.parse(t),{command:c,prefix:d}=a;return"PRIVMSG"===c&&d&&!l.includes(d.name)&&e.push((({tags:e,params:[t,n],prefix:a},u,r,s,i)=>{const c=o.b(n),l=c?o.c(n):n,d=o.d(e),m=a?a.name:"",g=Object(O.a)(i,m,l);return{type:"message",id:d.id,message:l,channel:t.slice(1),entities:D(l,u,d.emotes),user:{id:d.userId,login:m,displayName:d.displayName,color:d.color,badges:v.a(d.badges,r,s)},timestamp:d.tmiSentTs,isAction:c,isHistory:!0,isDeleted:!1,isMention:g}})(a,s,u,r,n)),e},[])};function j(e){const t=e.length-r.b;return t>0?e.slice(t):e}const k=(e,t,n)=>n&&t%2?!e:e,S=(e,t)=>"message"===e.type?(({message:e,tags:t,user:n,channel:a,isAction:u},r,s)=>{const o={chat:r},i=Object(c.g)(o),l=Object(c.b)(o),d=Object(c.f)(o);return{type:"message",id:t.id,message:e,channel:a,entities:D(e,d,t.emotes),user:{id:t.userId,login:n,displayName:t.displayName,color:t.color,badges:v.a(t.badges,i,l)},timestamp:t.tmiSentTs,isAction:u,isHistory:!1,isDeleted:!1,isMention:s}})(e.message,t,e.isMention):"notice"===e.type?(({message:e,channel:t,tags:{msgId:n}},a)=>({type:"notice",id:a,message:e,channel:t,noticeType:n}))(e.message,e.id):"user-notice"===e.type?(({message:e,channel:t,tags:{id:n,msgId:a,login:u,systemMsg:r}})=>({type:"user-notice",id:n,message:e,channel:t,noticeType:a,systemMessage:r,user:{login:u}}))(e.message):"own-message"===e.type?(({message:e,channel:t,tags:n,userId:u,userLogin:r},s)=>{const o={chat:s},i=Object(c.g)(o),l=Object(c.b)(o),d=Object(c.f)(o),m=e.startsWith("/me "),g=m?e.slice(4):e,b=D(g,d,null,!0);return Object(B.b)(b),{type:"message",id:Object(a.d)(),message:g,channel:t,entities:b,user:{id:u,login:r,displayName:n.displayName,color:n.color,badges:v.a(n.badges,i,l)},timestamp:Date.now(),isAction:m,isHistory:!1,isDeleted:!1,isMention:!1}})(e.message,t):Object(s.a)(e),R={clearChat:(e,{payload:t})=>{const{channel:n,tags:{targetUserId:a}}=t;for(const u of e.messages[n].items)"message"!==u.type||u.user.id!==a||u.isHistory||(u.isDeleted=!0)},addMessage:(e,{payload:t})=>{const n=S(t,e);if(!n)return;const{channel:a}=n,u=[...e.messages[a].items,n],s=j(u),o=u.length>s.length,i=e.messages[a].isEven;e.messages[a].isEven=k(i,1,o),e.messages[a].items=s;const{users:c}=e.messages[a];"message"!==n.type||c.includes(n.user.displayName)||c.push(n.user.displayName),e.messages[a].users=function(e){const t=e.length-r.j;return t>0?e.slice(t):e}(c)},addChatHistory:(e,{payload:t})=>{const{channel:n,userLogin:a}=t,u=e.messages[n].history.items,r=w(j(u),e,a),s=e.messages[n].items,o=[...r,...s],i=j(o),c=o.length>i.length,l=e.messages[n].isEven;e.messages[n].isEven=k(l,r.length,c),e.messages[n].items=i;const{users:d}=e.messages[n];r.forEach(e=>{"message"!==e.type||d.includes(e.user.displayName)||d.push(e.user.displayName)}),e.messages[n].history.items=[],e.messages[n].history.isAdded=!0}},I=Object(a.b)("chat/fetchChatHistory",e=>u.e(e));var _=n(75),T=n(352),z=n(205),P=n(125),N=n(351),$=n(347),M=n(204),U=n(94);const L=_.a("emoticon_sets"),G=l.a(M.a({},["sets"]),z.a,P.a(M.a([],["emoticons"])),$.a),H=l.a(_.a("blocks"),P.a(U.a(["user","name"]))),W=_.a("badge_sets"),J=Object(a.b)("chat/fetchTwitchEmotes",e=>u.i(e)),K=Object(a.b)("chat/fetchBttvGlobalEmotes",()=>u.c()),V=Object(a.b)("chat/fetchBttvChannelEmotes",({channelId:e})=>u.b(e)),q=Object(a.b)("chat/fetchFfzGlobalEmotes",()=>u.g()),Y=Object(a.b)("chat/fetchFfzChannelEmotes",({channelId:e})=>u.f(e)),Z=e=>{e.addCase(q.pending,e=>{e.ffzEmotes.global.status="loading",e.ffzEmotes.global.error={}}),e.addCase(q.fulfilled,(e,{payload:t})=>{e.ffzEmotes.global.status="success",e.ffzEmotes.global.items=(({default_sets:e,sets:t})=>l.a(T.a(e),z.a,P.a(N.a([],"emoticons")),$.a)(t))(t)}),e.addCase(q.rejected,(e,{error:t})=>{e.ffzEmotes.global.status="error",e.ffzEmotes.global.error=t}),e.addCase(Y.pending,(e,{meta:{arg:t}})=>{const{channel:n}=t;e.ffzEmotes.byChannels[n]?(e.ffzEmotes.byChannels[n].status="loading",e.ffzEmotes.byChannels[n].error={}):e.ffzEmotes.byChannels[n]={status:"loading",error:{},items:[]}}),e.addCase(Y.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const{channel:a}=n;e.ffzEmotes.byChannels[a].status="success",e.ffzEmotes.byChannels[a].items=G(t)}),e.addCase(Y.rejected,(e,{error:t,meta:{arg:n}})=>{const{channel:a}=n;e.ffzEmotes.byChannels[a].status="error",e.ffzEmotes.byChannels[a].error=t})},Q=Object(a.b)("chat/fetchGlobalBadges",()=>u.h()),X=Object(a.b)("chat/fetchChannelBadges",({channelId:e})=>u.d(e)),ee=Object(a.b)("chat/fetchBlockedUsers",e=>u.a(e)),te={isConnected:!1,currentChannel:"",messages:{},twitchEmotes:{status:"idle",error:{},items:{}},bttvEmotes:{global:{status:"idle",error:{},items:[]},byChannels:{}},ffzEmotes:{global:{status:"idle",error:{},items:[]},byChannels:{}},badges:{global:{status:"idle",error:{},items:{}},byChannels:{}},params:{global:null,byChannels:{}},blockedUsers:{status:"idle",error:{},items:[]}},ne=Object(a.c)({name:"chat",initialState:te,reducers:{updateIsConnected:(e,{payload:t})=>{e.isConnected=t},updateCurrentChannel:(e,{payload:t})=>{e.currentChannel=t},...R,updateGlobalUserParams:(e,{payload:t})=>{e.params.global=t.tags},updateUserParams:(e,{payload:t})=>{const{channel:n,tags:a}=t;e.params.byChannels[n]||(e.params.byChannels[n]={room:null,user:null}),e.params.byChannels[n].user=a},updateRoomParams:(e,{payload:t})=>{const{channel:n,tags:a}=t;e.params.byChannels[n]||(e.params.byChannels[n]={room:null,user:null}),e.params.byChannels[n].room=a}},extraReducers:e=>{(e=>{e.addCase(I.pending,(e,{meta:{arg:t}})=>{const n=t;e.messages[n]?(e.messages[n].history.status="loading",e.messages[n].history.error={}):e.messages[n]={history:{status:"loading",error:{},items:[],isAdded:!1},isEven:!1,items:[],users:[]}}),e.addCase(I.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const a=n;e.messages[a].history.status="success",e.messages[a].history.items=t.messages}),e.addCase(I.rejected,(e,{error:t,meta:{arg:n}})=>{const a=n;e.messages[a].history.status="error",e.messages[a].history.error=t})})(e),(e=>{e.addCase(J.pending,e=>{e.twitchEmotes.status="loading",e.twitchEmotes.error={}}),e.addCase(J.fulfilled,(e,{payload:t})=>{e.twitchEmotes.status="success",e.twitchEmotes.items=L(t)}),e.addCase(J.rejected,(e,{error:t})=>{e.twitchEmotes.status="error",e.twitchEmotes.error=t})})(e),(e=>{e.addCase(K.pending,e=>{e.bttvEmotes.global.status="loading",e.bttvEmotes.global.error={}}),e.addCase(K.fulfilled,(e,{payload:t})=>{e.bttvEmotes.global.status="success",e.bttvEmotes.global.items=t}),e.addCase(K.rejected,(e,{error:t})=>{e.bttvEmotes.global.status="error",e.bttvEmotes.global.error=t}),e.addCase(V.pending,(e,{meta:{arg:t}})=>{const{channel:n}=t;e.bttvEmotes.byChannels[n]?(e.bttvEmotes.byChannels[n].status="loading",e.bttvEmotes.byChannels[n].error={}):e.bttvEmotes.byChannels[n]={status:"loading",error:{},items:[]}}),e.addCase(V.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const{channel:a}=n;var u;e.bttvEmotes.byChannels[a].status="success",e.bttvEmotes.byChannels[a].items=[...(u=t).channelEmotes,...u.sharedEmotes]}),e.addCase(V.rejected,(e,{error:t,meta:{arg:n}})=>{const{channel:a}=n;e.bttvEmotes.byChannels[a].status="error",e.bttvEmotes.byChannels[a].error=t})})(e),Z(e),(e=>{e.addCase(Q.pending,e=>{e.badges.global.status="loading",e.badges.global.error={}}),e.addCase(Q.fulfilled,(e,{payload:t})=>{e.badges.global.status="success",e.badges.global.items=W(t)}),e.addCase(Q.rejected,(e,{error:t})=>{e.badges.global.status="error",e.badges.global.error=t}),e.addCase(X.pending,(e,{meta:{arg:t}})=>{const{channel:n}=t;e.badges.byChannels[n]?(e.badges.byChannels[n].status="loading",e.badges.byChannels[n].error={}):e.badges.byChannels[n]={status:"loading",error:{},items:{}}}),e.addCase(X.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const{channel:a}=n;e.badges.byChannels[a].status="success",e.badges.byChannels[a].items=W(t)}),e.addCase(X.rejected,(e,{error:t,meta:{arg:n}})=>{const{channel:a}=n;e.badges.byChannels[a].status="error",e.badges.byChannels[a].error=t})})(e),(e=>{e.addCase(ee.pending,e=>{e.blockedUsers.status="loading",e.blockedUsers.error={}}),e.addCase(ee.fulfilled,(e,{payload:t})=>{e.blockedUsers.status="success",e.blockedUsers.items=H(t)}),e.addCase(ee.rejected,(e,{error:t})=>{e.blockedUsers.status="error",e.blockedUsers.error=t})})(e)}}),{updateIsConnected:ae,updateCurrentChannel:ue,clearChat:re,addMessage:se,addChatHistory:oe,updateGlobalUserParams:ie,updateUserParams:ce,updateRoomParams:le}=ne.actions;t.d=ne.reducer},6:function(e,t,n){"use strict";n.d(t,"d",(function(){return p})),n.d(t,"l",(function(){return E})),n.d(t,"u",(function(){return v})),n.d(t,"y",(function(){return A})),n.d(t,"s",(function(){return C})),n.d(t,"r",(function(){return y})),n.d(t,"n",(function(){return x})),n.d(t,"t",(function(){return F})),n.d(t,"j",(function(){return D})),n.d(t,"i",(function(){return O})),n.d(t,"p",(function(){return B})),n.d(t,"o",(function(){return w})),n.d(t,"m",(function(){return j})),n.d(t,"f",(function(){return I})),n.d(t,"e",(function(){return _})),n.d(t,"q",(function(){return T})),n.d(t,"k",(function(){return z})),n.d(t,"g",(function(){return P})),n.d(t,"b",(function(){return N})),n.d(t,"v",(function(){return $})),n.d(t,"c",(function(){return M})),n.d(t,"w",(function(){return U})),n.d(t,"x",(function(){return L})),n.d(t,"h",(function(){return G})),n.d(t,"a",(function(){return H}));var a=n(352),u=n(353),r=n(32),s=n(14),o=n(96),i=n(205),c=n(125),l=n(351),d=n(94),m=n(89),g=n(90);const b=o.a(i.a,c.a(e=>({items:c.a(s.g,e)}))),f=Object(r.a)(e=>e,e=>{if(!e)return[];const{twitchGlobal:t,twitchUser:n,bttvGlobal:a,bttvChannel:u,ffzGlobal:r,ffzChannel:o}=e;return[{title:"BetterTTV Channel Emotes",items:u.map(s.b)},{title:"FrankerFaceZ Channel Emotes",items:o.map(s.d)},...b(n),{title:"Twitch",items:c.a(s.g,l.a([],"0",t))},{title:"BetterTTV",items:a.map(s.b)},{title:"FrankerFaceZ",items:r.map(s.d)}].filter(d.a(["items","length"]))});var h=(e,t)=>{if(!e)return[];if(t){const n=Object(m.a)(t,e);return[{title:`${n.length?"":"No "}Search Results for "${t}"`,items:n}]}const n=f(e),a=Object(g.a)(e);return a.length?[{title:"Frequently Used",items:a},...n]:n};const p=e=>e.chat.currentChannel,E=e=>e.chat.isConnected,v=e=>{var t;return(null===(t=e.chat.messages[p(e)])||void 0===t?void 0:t.items)||[]},A=e=>{var t;return(null===(t=e.chat.messages[p(e)])||void 0===t?void 0:t.users)||[]},C=e=>{var t,n;const a=p(e);return"success"===(null===(t=e.chat.messages[a])||void 0===t?void 0:t.history.status)||"error"===(null===(n=e.chat.messages[a])||void 0===n?void 0:n.history.status)||!1},y=e=>{var t;return(null===(t=e.chat.messages[p(e)])||void 0===t?void 0:t.history.isAdded)||!1},x=e=>{var t;return(null===(t=e.chat.messages[p(e)])||void 0===t?void 0:t.isEven)||!1},F=e=>"success"===e.chat.twitchEmotes.status||"error"===e.chat.twitchEmotes.status,D=e=>"success"===e.chat.bttvEmotes.global.status||"error"===e.chat.bttvEmotes.global.status,O=e=>{var t,n;const a=p(e);return"success"===(null===(t=e.chat.bttvEmotes.byChannels[a])||void 0===t?void 0:t.status)||"error"===(null===(n=e.chat.bttvEmotes.byChannels[a])||void 0===n?void 0:n.status)||!1},B=e=>"success"===e.chat.ffzEmotes.global.status||"error"===e.chat.ffzEmotes.global.status,w=e=>{var t,n;const a=p(e);return"success"===(null===(t=e.chat.ffzEmotes.byChannels[a])||void 0===t?void 0:t.status)||"error"===(null===(n=e.chat.ffzEmotes.byChannels[a])||void 0===n?void 0:n.status)||!1},j=e=>F(e)&&D(e)&&O(e)&&B(e)&&w(e),k=e=>e.chat.twitchEmotes.items,S=Object(r.a)(k,a.a(["0"])),R=Object(r.a)(k,u.a(["0"])),I=Object(r.a)(j,S,R,e=>e.chat.bttvEmotes.global.items,e=>{var t;return(null===(t=e.chat.bttvEmotes.byChannels[p(e)])||void 0===t?void 0:t.items)||[]},e=>e.chat.ffzEmotes.global.items,e=>{var t;return(null===(t=e.chat.ffzEmotes.byChannels[p(e)])||void 0===t?void 0:t.items)||[]},(e,t,n,a,u,r,s)=>e?{twitchGlobal:t,twitchUser:n,bttvGlobal:a,bttvChannel:u,ffzGlobal:r,ffzChannel:s}:null),_=(e,t)=>{const n=I(e);return h(n,t)},T=e=>"success"===e.chat.badges.global.status||"error"===e.chat.badges.global.status,z=e=>{var t,n;return"success"===(null===(t=e.chat.badges.byChannels[p(e)])||void 0===t?void 0:t.status)||"error"===(null===(n=e.chat.badges.byChannels[p(e)])||void 0===n?void 0:n.status)},P=e=>e.chat.badges.global.items,N=e=>{var t;return(null===(t=e.chat.badges.byChannels[p(e)])||void 0===t?void 0:t.items)||{}},$=Object(r.a)(e=>{var t,n;return(null===(t=e.chat.params.byChannels[p(e)])||void 0===t||null===(n=t.user)||void 0===n?void 0:n.badges)||{}},P,N,s.a),M=e=>{var t,n;return(null===(t=e.chat.params.byChannels[p(e)])||void 0===t||null===(n=t.room)||void 0===n?void 0:n.roomId)||""},U=e=>{var t,n;return(null===(t=e.chat.params.byChannels[p(e)])||void 0===t||null===(n=t.user)||void 0===n?void 0:n.color)||""},L=e=>{var t,n;return(null===(t=e.chat.params.byChannels[p(e)])||void 0===t||null===(n=t.user)||void 0===n?void 0:n.displayName)||""},G=e=>"idle"!==e.chat.blockedUsers.status&&"loading"!==e.chat.blockedUsers.status,H=e=>e.chat.blockedUsers.items},61:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return F})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return d})),n.d(t,"d",(function(){return A}));var a=n(85),u=n.n(a),r=n(36),s=n(63);function o(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var c,l=function(e){return e.startsWith("\x01ACTION ")&&e.endsWith("\x01")},d=function(e){return e.slice(8,-1)},m=function(e){return e.middle[0].slice(1)},g=!("undefined"===typeof e||!e.versions||!e.versions.node),b=["mod","emote-only","r9k","rituals","subs-only","msg-param-should-share-streak"],f=["tmi-sent-ts","bits","ban-duration","msg-param-cumulative-months","msg-param-months","msg-param-promo-gift-total","msg-param-streak-months","msg-param-viewerCount","msg-param-threshold"],h={"badge-info":"badgeInfo","display-name":"displayName","emote-sets":"emoteSets","room-id":"roomId","tmi-sent-ts":"tmiSentTs","user-id":"userId","target-msg-id":"targetMsgId","target-user-id":"targetUserId","msg-id":"msgId","system-msg":"systemMsg","emote-only":"emoteOnly","followers-only":"followersOnly","subs-only":"subsOnly","ban-duration":"banDuration","message-id":"messageId","thread-id":"threadId","msg-param-cumulative-months":"msgParamCumulativeMonths","msg-param-displayName":"msgParamDisplayName","msg-param-login":"msgParamLogin","msg-param-months":"msgParamMonths","msg-param-promo-gift-total":"msgParamPromoGiftTotal","msg-param-promo-name":"msgParamPromoName","msg-param-recipient-display-name":"msgParamRecipientDisplayName","msg-param-recipient-id":"msgParamRecipientId","msg-param-recipient-user-name":"msgParamRecipientUserName","msg-param-sender-login":"msgParamSenderLogin","msg-param-sender-name":"msgParamSenderName","msg-param-should-share-streak":"msgParamShouldShareStreak","msg-param-streak-months":"msgParamStreakMonths","msg-param-sub-plan":"msgParamSubPlan","msg-param-sub-plan-name":"msgParamSubPlanName","msg-param-viewerCount":"msgParamViewerCount","msg-param-ritual-name":"msgParamRitualName","msg-param-threshold":"msgParamThreshold"},p=["subscriber","turbo","user-type"],E=function(e){return void 0===e&&(e=""),e?e.split(",").reduce((function(e,t){var n,a=t.split("/"),u=a[0],r=a[1];return i(i({},e),{},((n={})[u]=r,n))}),{}):{}},v=function(e,t){if("emotes"===e)return void 0===(n=t)&&(n=""),n?n.split("/").reduce((function(e,t){var n,a=t.split(":"),u=a[0],r=a[1];return i(i({},e),{},((n={})[u]=r.split(",").map((function(e){var t=e.split("-"),n=t[0],a=t[1];return{start:Number.parseInt(n,10),end:Number.parseInt(a,10)}})),n))}),{}):{};var n;if("badges"===e)return E(t);if("badge-info"===e)return E(t);if("followers-only"===e){var a=!1;return"-1"===t?a=!1:"0"===t?a=!0:"string"===typeof t&&(a=parseInt(t,10)),a}if("slow"===e){var u=!1;return"0"===t?u=!1:"string"===typeof t&&(u=parseInt(t,10)),u}return b.includes(e)?"1"===t:f.includes(e)?parseInt(t,10):"string"===typeof t?t.replace("\\s"," "):t},A=function(e){return e?Object.entries(e).reduce((function(e,t){var n,a=t[0],u=t[1];if(p.includes(a))return e;var r=h[a]||a;return i(i({},e),{},((n={})[r]=v(a,u),n))}),{}):{}},C=function(e){var t=e.raw,n=e.tags;return{raw:t,channel:m(e),get tags(){return A(n)}}},y=function(e){var t=e.raw,n=e.trailing,a=e.tags;return{raw:t,message:n,channel:m(e),get tags(){return A(a)}}};!function(e){e.REPLY001="001",e.PING="PING",e.PONG="PONG",e.JOIN="JOIN",e.PART="PART",e.PRIVMSG="PRIVMSG",e.NOTICE="NOTICE",e.USERNOTICE="USERNOTICE",e.GLOBALUSERSTATE="GLOBALUSERSTATE",e.USERSTATE="USERSTATE",e.ROOMSTATE="ROOMSTATE",e.CLEARCHAT="CLEARCHAT",e.CLEARMSG="CLEARMSG",e.HOSTTARGET="HOSTTARGET",e.WHISPER="WHISPER"}(c||(c={}));var x,F=function(e){var t,n;function r(t){var n;return void 0===t&&(t={}),(n=e.call(this)||this).socket=null,n.globalUserState=null,n.channels={},n._connected=!1,n._connecting=!1,n._registered=!1,n.options=i({secure:!0},t),n}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var b,f,h,p=r.prototype;return p.connect=function(){try{var e=this,t=g?e._connectInNode():e._connectInBrowser();return Promise.resolve(t).then((function(){return e._register()}))}catch(n){return Promise.reject(n)}},p.disconnect=function(){this._connected&&(g?this.socket.destroy():this.socket.close(),this.socket=null,this._connected=!1,this._connecting=!1,this._registered=!1,this.emit("disconnect"))},p.receiveRaw=function(e){var t=this;e.trim().split("\r\n").forEach((function(e){return t._handleMessage(e)}))},p.sendRaw=function(e){return!(null===this.socket||!e)&&(g?this.socket.write(e):this.socket.send(e),!0)},p.say=function(e,t){var n=Object(s.format)({command:c.PRIVMSG,middle:["#"+e],trailing:t});return this.sendRaw(n)},p.sendCommand=function(e,t,n){void 0===n&&(n="");var a=Array.isArray(n)?n.join(" "):n,u=Object(s.format)({command:c.PRIVMSG,middle:["#"+e],trailing:"/"+t+" "+a});return this.sendRaw(u)},p.join=function(e){if(!this._registered)return!1;var t=Object(s.format)({command:c.JOIN,middle:["#"+e]});return this.sendRaw(t)},p.part=function(e){if(!this._registered)return!1;var t=Object(s.format)({command:c.PART,middle:["#"+e]});return this.sendRaw(t)},p._handleMessage=function(e){var t=Object(s.parse)(e);t.raw=e;var n=t.command;if(n===c.PING)return this.sendRaw(c.PONG+" :tmi.twitch.tv"),void this.emit("ping",{raw:e});if(n===c.REPLY001)return this.options.name=t.middle[0],this._registered=!0,void this.emit("register");if(n!==c.PRIVMSG){if(n===c.USERSTATE){var a=m(t),u=C(t);return this._updateUserState(a,u.tags),void this.emit("userstate",u)}if(n!==c.JOIN)if(n!==c.PART){if(n===c.ROOMSTATE){var r=m(t),o=C(t);return this._updateRoomState(r,o.tags),void this.emit("roomstate",o)}if(n!==c.NOTICE)if(n!==c.USERNOTICE)if(n!==c.CLEARCHAT)if(n!==c.CLEARMSG)if(n!==c.HOSTTARGET)if(n!==c.WHISPER){if(n===c.GLOBALUSERSTATE){var i=function(e){var t=e.raw,n=e.tags;return{raw:t,get tags(){return A(n)}}}(t);return this._updateGlobalUserState(i.tags),void this.emit("globaluserstate",i)}}else{var g=function(e){var t=e.raw,n=e.trailing,a=e.tags,u=e.prefix;return{raw:t,message:n,channel:e.middle[0],user:u.name,get tags(){return A(a)}}}(t);this.emit("whisper",g)}else{var b=y(t);this.emit("hosttarget",b)}else{var f=y(t);this.emit("clearmessage",f)}else{var h=y(t);this.emit("clearchat",h)}else{var p=y(t);this.emit("usernotice",p)}else{var E=y(t);this.emit("notice",E)}}else{var v={channel:m(t)};this.emit("part",v)}else{var x={channel:m(t)};this.emit("join",x)}}else{var F=function(e){var t=e.raw,n=e.trailing,a=e.tags,u=e.prefix.name,r=l(n);return{raw:t,message:r?d(n):n,channel:m(e),user:u,get tags(){return A(a)},isAction:r}}(t);this.emit("message",F)}},p._connectInNode=function(){var e=this,t="irc.chat.twitch.tv",n=this.options.secure?6697:6667;return new Promise((function(r,s){e._connecting=!0;var o=function(){e._connecting=!1,e._connected=!0,e.emit("connect"),r()};e.options.secure?e.socket=u.a.connect(n,t,{},o):(e.socket=new a.Socket,e.socket.connect(n,t,o)),e.socket.on("error",(function(t){e._connected=!1,e._connecting=!1,e.emit("disconnect",t),s(t)})),e.socket.on("data",(function(t){e.receiveRaw(t.toString())})),e.socket.on("close",(function(){e._connected=!1,e._connecting=!1,e._registered=!1,e.emit("disconnect")}))}))},p._connectInBrowser=function(){var e=this,t=this.options.secure?"wss://irc-ws.chat.twitch.tv:443":"ws://irc-ws.chat.twitch.tv:80";return new Promise((function(n,a){e._connecting=!0,e.socket=new WebSocket(t),e.socket.onopen=function(){e._connected=!0,e._connecting=!1,e.emit("connect"),n()},e.socket.onmessage=function(t){var n=t.data;return e.receiveRaw(n)},e.socket.onerror=function(){},e.socket.onclose=function(t){var n=t.wasClean,u=t.code,r=t.reason;if(e.socket=null,e._connected=!1,e._connecting=!1,e._registered=!1,n)e.emit("disconnect");else{var s=new Error("["+u+"] "+r);e.emit("disconnect",s),a(s)}}}))},p._register=function(){var e=this;if(!this._connected)return Promise.reject();if(this._registered)return Promise.resolve();var t=this.options,n=t.name,a=t.auth,u=n||"justinfan"+Math.floor(1e5*Math.random()).toString().padStart(5,"0"),r=a?"oauth:"+a:"SCHMOOPIIE";return this.sendRaw("CAP REQ :twitch.tv/tags twitch.tv/commands"),this.sendRaw("PASS "+r),this.sendRaw("NICK "+u),new Promise((function(t,n){var a=function n(){t(),e.off("register",n)};e.on("register",a),setTimeout((function(){n(),e.off("register",a)}),1e4)}))},p._updateGlobalUserState=function(e){this.globalUserState=i(i({},this.globalUserState),e)},p._updateUserState=function(e,t){var n;this.channels=i(i({},this.channels),{},((n={})[e]=i(i({},this.channels[e]),{},{userState:t}),n))},p._updateRoomState=function(e,t){var n;this.channels=i(i({},this.channels),{},((n={})[e]=i(i({},this.channels[e]),{},{roomState:t}),n))},b=r,(f=[{key:"connected",get:function(){return this._connected}},{key:"connecting",get:function(){return this._connecting}},{key:"registered",get:function(){return this._registered}}])&&o(b.prototype,f),h&&o(b,h),r}(r.EventEmitter);!function(e){e.sub="sub",e.resub="resub",e.subgift="subgift",e.anonsubgift="anonsubgift",e.submysterygift="submysterygift",e.giftpaidupgrade="giftpaidupgrade",e.rewardgift="rewardgift",e.anongiftpaidupgrade="anongiftpaidupgrade",e.raid="raid",e.unraid="unraid",e.ritual="ritual",e.bitsbadgetier="bitsbadgetier"}(x||(x={}))}).call(this,n(16))},73:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(10),u=n(8);const r=()=>{try{const e=localStorage.getItem(u.g);return JSON.parse(e)||{}}catch{return{}}},s={showTimestamps:!1,splitChat:!0,blacklistKeywords:"",highlightKeywords:"",fixedWidth:!1,highlightNotifications:!0,...r()},o=Object(a.c)({name:"options",initialState:s,reducers:{changeOption:(e,{payload:t})=>{const{name:n,value:a}=t;e[n]=a}}}),{changeOption:i}=o.actions;t.b=o.reducer;const c=({name:e,value:t})=>async n=>{var a;a={[e]:t},localStorage.setItem(u.g,JSON.stringify({...r(),...a})),n(i({name:e,value:t}))}},8:function(e,t,n){"use strict";n.d(t,"l",(function(){return a})),n.d(t,"m",(function(){return u})),n.d(t,"n",(function(){return r})),n.d(t,"b",(function(){return s})),n.d(t,"j",(function(){return o})),n.d(t,"a",(function(){return i})),n.d(t,"c",(function(){return c})),n.d(t,"e",(function(){return l})),n.d(t,"f",(function(){return d})),n.d(t,"h",(function(){return m})),n.d(t,"d",(function(){return g})),n.d(t,"g",(function(){return b})),n.d(t,"k",(function(){return f})),n.d(t,"i",(function(){return h}));const a="https://id.twitch.tv/oauth2/authorize",u="4e66w1po1tzf645r9vutn9qus05vg9x",r="https://honeykingdom.github.io/chat/",s=500,o=500,i=1e4,c="accessToken",l="idToken",d="lastChannel",m="user",g="emotesUsageStatistic",b="options",f={users:{name:"users",limit:5,regex:/^@([\w\d_]*)$/},emotes:{name:"emotes",limit:10,regex:/^:([\w\d_]{2,})$/}},h=["msg_banned","msg_bad_characters","msg_channel_blocked","msg_channel_suspended","msg_duplicate","msg_emoteonly","msg_facebook","msg_followersonly","msg_followersonly_followed","msg_followersonly_zero","msg_r9k","msg_ratelimit","msg_rejected","msg_rejected_mandatory","msg_room_not_found","msg_slowmode","msg_subsonly","msg_suspended","msg_timedout","msg_verified_email"]},84:function(e,t,n){"use strict";t.a=e=>e},89:function(e,t,n){"use strict";var a=n(23);t.a=(e,t,n=-1)=>{if(!t)return[];const u={begins:[],contains:[]},r=e.toLowerCase();a.a.bttv.byText(u,t.bttvChannel,r,n)||a.a.ffz.byText(u,t.ffzChannel,r,n)||a.a.twitch.byText(u,t.twitchUser,r,n)||a.a.twitch.byText(u,t.twitchGlobal,r,n)||a.a.bttv.byText(u,t.bttvGlobal,r,n)||a.a.ffz.byText(u,t.ffzGlobal,r,n);return[...u.begins,...u.contains]}},90:function(e,t,n){"use strict";n.d(t,"b",(function(){return A})),n.d(t,"a",(function(){return y}));var a=n(96),u=n(123),r=n(343),s=n(75),o=n(207),i=n(125),c=n(345),l=n(346),d=n(205),m=n(347),g=n(344),b=n(206),f=n(8),h=n(23);const p=()=>{try{const e=localStorage.getItem(f.d);return JSON.parse(e)||{}}catch(e){return{}}},E=a.a(u.a(e=>r.a(s.a("type",e),["twitch-emote","bttv-emote","ffz-emote"])),o.a(s.a("type")),i.a(a.a(o.a(s.a("id")),i.a(e=>({type:e[0].type,id:e[0].id,lastUpdatedAt:Date.now(),uses:e.length}))))),v=(e,t,n)=>"uses"===e?t+n:n,A=e=>{const t=E(e);if(c.a(t))return;const n=p(),a=l.a(v,n,t);localStorage.setItem(f.d,JSON.stringify(a))},C=a.a(d.a,i.a(d.a),m.a,g.a([b.a(s.a("uses")),b.a(s.a("lastUpdatedAt"))])),y=(e,t=27)=>{if(!e)return[];const n=[],u=a.a(p,C)();for(const a of u){if(n.length===t)return n;let u=null;"twitch-emote"===a.type&&(u=h.a.twitch.byId(a.id,e)),"bttv-emote"===a.type&&(u=h.a.bttv.byId(a.id,e)),"ffz-emote"===a.type&&(u=h.a.ffz.byId(a.id,e)),u&&n.push(u)}return n}},93:function(e,t,n){"use strict";t.a=(e,t,n)=>!!e&&e!==t&&RegExp(e,"gi").test(n)}},[[208,1,2]]]);
//# sourceMappingURL=main.1bb5d71e.chunk.js.map