(this["webpackJsonphoney-chat"]=this["webpackJsonphoney-chat"]||[]).push([[0],{103:function(e,t,n){"use strict";var u=n(26);t.a=(e,t,n=-1)=>{if(!t)return[];const a={begins:[],contains:[]},r=e.toLowerCase();u.a.bttv.byText(a,t.bttvChannel,r,n)||u.a.ffz.byText(a,t.ffzChannel,r,n)||u.a.twitch.byText(a,t.twitchUser,r,n)||u.a.twitch.byText(a,t.twitchGlobal,r,n)||u.a.bttv.byText(a,t.bttvGlobal,r,n)||u.a.ffz.byText(a,t.ffzGlobal,r,n);return[...a.begins,...a.contains]}},104:function(e,t,n){"use strict";n.d(t,"b",(function(){return A})),n.d(t,"a",(function(){return y}));var u=n(58),a=n(138),r=n(360),o=n(53),s=n(219),i=n(75),c=n(364),l=n(365),d=n(110),m=n(140),b=n(361),g=n(218),f=n(7),h=n(26);const p=()=>{try{const e=localStorage.getItem(f.d);return JSON.parse(e)||{}}catch(e){return{}}},E=u.a(a.a(e=>r.a(o.a("type",e),["twitch-emote","bttv-emote","ffz-emote"])),s.a(o.a("type")),i.a(u.a(s.a(o.a("id")),i.a(e=>({type:e[0].type,id:e[0].id,lastUpdatedAt:Date.now(),uses:e.length}))))),v=(e,t,n)=>"uses"===e?t+n:n,A=e=>{const t=E(e);if(c.a(t))return;const n=p(),u=l.a(v,n,t);localStorage.setItem(f.d,JSON.stringify(u))},C=u.a(d.a,i.a(d.a),m.a,b.a([g.a(o.a("uses")),g.a(o.a("lastUpdatedAt"))])),y=(e,t=27)=>{if(!e)return[];const n=[],a=u.a(p,C)();for(const u of a){if(n.length===t)return n;let a=null;"twitch-emote"===u.type&&(a=h.a.twitch.byId(u.id,e)),"bttv-emote"===u.type&&(a=h.a.bttv.byId(u.id,e)),"ffz-emote"===u.type&&(a=h.a.ffz.byId(u.id,e)),a&&n.push(a)}return n}},107:function(e,t,n){"use strict";n.d(t,"b",(function(){return o}));var u=n(8),a=n(24),r=n(37);const o=Object(u.b)("chat/fetchBlockedUsers",e=>a.a(e)),s=Object(u.c)({name:"blockedUsers",initialState:{status:"idle",error:{},items:[]},reducers:{},extraReducers:e=>{e.addCase(o.pending,e=>{e.status="loading",e.error={}}),e.addCase(o.fulfilled,(e,{payload:t})=>{e.status="success",e.items=Object(r.b)(t)}),e.addCase(o.rejected,(e,{error:t})=>{e.status="error",e.error=t})}});t.a=s.reducer},12:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r})),n.d(t,"e",(function(){return o})),n.d(t,"f",(function(){return s})),n.d(t,"d",(function(){return i}));const u=e=>e.chat.currentChannel,a=e=>e.chat.isConnected,r=e=>{var t,n;return(null===(t=e.chat.params.byChannels[u(e)])||void 0===t||null===(n=t.room)||void 0===n?void 0:n.roomId)||""},o=e=>{var t,n;return(null===(t=e.chat.params.byChannels[u(e)])||void 0===t||null===(n=t.user)||void 0===n?void 0:n.color)||""},s=e=>{var t,n;return(null===(t=e.chat.params.byChannels[u(e)])||void 0===t||null===(n=t.user)||void 0===n?void 0:n.displayName)||""},i=e=>{var t,n;return(null===(t=e.chat.params.byChannels[u(e)])||void 0===t||null===(n=t.user)||void 0===n?void 0:n.badges)||{}}},13:function(e,t,n){"use strict";n.d(t,"g",(function(){return b})),n.d(t,"b",(function(){return g})),n.d(t,"d",(function(){return f})),n.d(t,"c",(function(){return h})),n.d(t,"f",(function(){return p})),n.d(t,"e",(function(){return E})),n.d(t,"a",(function(){return v}));var u=n(58),a=n(367),r=n(75),o=n(373),s=n(138);const i=/^(?:(?:[a-z]+:)?\/\/)/;var c=e=>i.test(e)?e:"//"+e;const l="//static-cdn.jtvnw.net/emoticons/v1",d={"[oO](_|\\.)[oO]":"O_o","\\&gt\\;\\(":">(","\\&lt\\;3":"<3","\\:-?(o|O)":":O","\\:-?(p|P)":":P","\\:-?[\\\\/]":":/","\\:-?[z|Z|\\|]":":Z","\\:-?\\(":":(","\\:-?\\)":":)","\\:-?D":":D","\\;-?(p|P)":";P","\\;-?\\)":";)","R-?\\)":"R)","B-?\\)":"B)"},m=u.a(a.a,r.a(([e,t])=>`${t} ${e}x`),o.a(", ")),b=({id:e,code:t})=>({type:"twitch-emote",id:e,alt:d[t]||t,src:`${l}/${e}/1.0`,srcSet:`${l}/${e}/1.0 1x, ${l}/${e}/2.0 2x, ${l}/${e}/3.0 4x`}),g=({id:e,code:t})=>({type:"bttv-emote",id:e,alt:t,src:`//cdn.betterttv.net/emote/${e}/1x`,srcSet:`//cdn.betterttv.net/emote/${e}/2x 2x, //cdn.betterttv.net/emote/${e}/3x 4x`}),f=({id:e,name:t,urls:n})=>({type:"ffz-emote",id:e,alt:t,src:n[1],srcSet:m(n)}),h=(e,t)=>({type:"emoji",alt:`:${e}:`,src:t}),p=(e,t)=>({type:"mention",text:e,target:t}),E=e=>({type:"link",text:e,href:c(e)}),v=(e,t,n)=>u.a(a.a,r.a(([e,u])=>{var a,r;const o=(null===(a=n[e])||void 0===a?void 0:a.versions[u])||(null===(r=t[e])||void 0===r?void 0:r.versions[u]);return!!o&&(({title:e,description:t,image_url_1x:n,image_url_2x:u,image_url_4x:a})=>({alt:e,label:t,src:n,srcSet:`${n} 1x, ${u} 2x, ${a} 4x`}))(o)}),s.a(Boolean))(e)},16:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return a})),n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return o}));const u=e=>"idle"!==e.auth.status&&"loading"!==e.auth.status,a=e=>"success"===e.auth.status,r=e=>e.auth.userLogin,o=e=>e.auth.userId},210:function(e,t,n){e.exports=n.p+"static/media/ts-tink.4251bf04.ogg"},221:function(e,t,n){e.exports=n(359)},23:function(e,t,n){"use strict";n.d(t,"h",(function(){return E})),n.d(t,"d",(function(){return v})),n.d(t,"c",(function(){return A})),n.d(t,"g",(function(){return C})),n.d(t,"f",(function(){return y})),n.d(t,"e",(function(){return x})),n.d(t,"b",(function(){return B})),n.d(t,"a",(function(){return j}));var u=n(363),a=n(368),r=n(31),o=n(12),s=n(58),i=n(110),c=n(75),l=n(362),d=n(86),m=n(13),b=n(103),g=n(104);const f=s.a(i.a,c.a(e=>({items:c.a(m.g,e)}))),h=Object(r.a)(e=>e,e=>{if(!e)return[];const{twitchGlobal:t,twitchUser:n,bttvGlobal:u,bttvChannel:a,ffzGlobal:r,ffzChannel:o}=e;return[{title:"BetterTTV Channel Emotes",items:a.map(m.b)},{title:"FrankerFaceZ Channel Emotes",items:o.map(m.d)},...f(n),{title:"Twitch",items:c.a(m.g,l.a([],"0",t))},{title:"BetterTTV",items:u.map(m.b)},{title:"FrankerFaceZ",items:r.map(m.d)}].filter(d.a(["items","length"]))});var p=(e,t)=>{if(!e)return[];if(t){const n=Object(b.a)(t,e);return[{title:`${n.length?"":"No "}Search Results for "${t}"`,items:n}]}const n=h(e),u=Object(g.a)(e);if(!u.length)return n;return[{title:"Frequently Used",items:u},...n]};const E=e=>"success"===e.emotes.twitch.status||"error"===e.emotes.twitch.status,v=e=>"success"===e.emotes.bttv.global.status||"error"===e.emotes.bttv.global.status,A=e=>{var t,n;const u=Object(o.b)(e);return"success"===(null===(t=e.emotes.bttv.byChannels[u])||void 0===t?void 0:t.status)||"error"===(null===(n=e.emotes.bttv.byChannels[u])||void 0===n?void 0:n.status)||!1},C=e=>"success"===e.emotes.ffz.global.status||"error"===e.emotes.ffz.global.status,y=e=>{var t,n;const u=Object(o.b)(e);return"success"===(null===(t=e.emotes.ffz.byChannels[u])||void 0===t?void 0:t.status)||"error"===(null===(n=e.emotes.ffz.byChannels[u])||void 0===n?void 0:n.status)||!1},x=e=>E(e)&&v(e)&&A(e)&&C(e)&&y(e),F=e=>e.emotes.twitch.items,D=Object(r.a)(F,u.a(["0"])),O=Object(r.a)(F,a.a(["0"])),B=Object(r.a)(x,D,O,e=>e.emotes.bttv.global.items,e=>{var t;return(null===(t=e.emotes.bttv.byChannels[Object(o.b)(e)])||void 0===t?void 0:t.items)||[]},e=>e.emotes.ffz.global.items,e=>{var t;return(null===(t=e.emotes.ffz.byChannels[Object(o.b)(e)])||void 0===t?void 0:t.items)||[]},(e,t,n,u,a,r,o)=>e?{twitchGlobal:t,twitchUser:n,bttvGlobal:u,bttvChannel:a,ffzGlobal:r,ffzChannel:o}:null),j=(e,t)=>{const n=B(e);return p(n,t)}},24:function(e,t,n){"use strict";n.d(t,"j",(function(){return o})),n.d(t,"i",(function(){return s})),n.d(t,"h",(function(){return i})),n.d(t,"d",(function(){return c})),n.d(t,"a",(function(){return l})),n.d(t,"c",(function(){return d})),n.d(t,"b",(function(){return m})),n.d(t,"g",(function(){return b})),n.d(t,"f",(function(){return g})),n.d(t,"e",(function(){return f}));var u=n(7);var a=async(e,{timeout:t,...n}={})=>{let a={...n};const r=t||u.a;if(r){const e=new AbortController;a={...a,signal:e.signal},setTimeout(()=>e.abort(),r)}const o=await fetch(e,a);if(!o.ok)throw Error(o.statusText);return await o.json()};const r=(e,t)=>a("https://api.twitch.tv/kraken"+e,{...t,headers:{Accept:"application/vnd.twitchtv.v5+json","Client-ID":"4e66w1po1tzf645r9vutn9qus05vg9x",Authorization:"OAuth "+localStorage.getItem(u.c)}}),o=e=>{return a("https://api.twitch.tv/helix"+("/users?id="+e),{...t,headers:{"Client-ID":"4e66w1po1tzf645r9vutn9qus05vg9x",Authorization:"Bearer "+localStorage.getItem(u.c)}});var t},s=e=>r(`/users/${e}/emotes`),i=(e="en")=>a("https://badges.twitch.tv/v1/badges/global/display?language="+e),c=(e,t="en")=>a(`https://badges.twitch.tv/v1/badges/channels/${e}/display?language=${t}`),l=e=>r(`/users/${e}/blocks`),d=()=>a("https://api.betterttv.net/3/cached/emotes/global"),m=e=>a("https://api.betterttv.net/3/cached/users/twitch/"+e),b=()=>a("https://api.frankerfacez.com/v1/set/global"),g=e=>a("https://api.frankerfacez.com/v1/room/id/"+e),f=e=>a(`https://recent-messages.robotty.de/api/v2/recent-messages/${e}?clearchatToNotice=true`)},242:function(e,t){},244:function(e,t){},257:function(e,t){},259:function(e,t){},26:function(e,t,n){"use strict";var u=n(74),a=n(88),r=n(13);const o=(e,t)=>{for(const n of Object.values(t)){const t=u.a(a.a("id",e),n);if(t)return r.g(t)}return null},s={4:">\\(",9:"<3"},i=(e,t)=>{for(const n of Object.values(t)){const t=u.a(({id:t,code:n})=>{if(t>=1&&t<=14){return RegExp(`^${s[t]||n}$`).test(e)}return e===n},n);if(t)return r.g(t)}return null},c={twitch:{byId:(e,{twitchGlobal:t,twitchUser:n})=>o(e,t)||o(e,n),byName:(e,{twitchGlobal:t,twitchUser:n})=>i(e,t)||i(e,n),byText:(e,t,n,u)=>{for(const a of Object.values(t))for(const t of a){if(e.begins.length+e.contains.length===u)return!0;const a=t.code.toLowerCase().indexOf(n);if(-1!==a){e[0===a?"begins":"contains"].push(r.g(t))}}return!1}},bttv:{byId:(e,{bttvGlobal:t,bttvChannel:n})=>{const o=u.a(a.a("id",e)),s=o(t)||o(n);return s?r.b(s):null},byName:(e,{bttvGlobal:t,bttvChannel:n})=>{const o=u.a(a.a("code",e)),s=o(t)||o(n);return s?r.b(s):null},byText:(e,t,n,u)=>{for(const a of t){if(e.begins.length+e.contains.length===u)return!0;const t=a.code.toLowerCase().indexOf(n);if(-1!==t){e[0===t?"begins":"contains"].push(r.b(a))}}return!1}},ffz:{byId:(e,{ffzGlobal:t,ffzChannel:n})=>{const o=u.a(a.a("id",e)),s=o(t)||o(n);return s?r.d(s):null},byName:(e,{ffzGlobal:t,ffzChannel:n})=>{const o=u.a(a.a("name",e)),s=o(t)||o(n);return s?r.d(s):null},byText:(e,t,n,u)=>{for(const a of t){if(e.begins.length+e.contains.length===u)return!0;const t=a.name.toLowerCase().indexOf(n);if(-1!==t){e[0===t?"begins":"contains"].push(r.d(a))}}return!1}}};t.a=c},287:function(e,t){},288:function(e,t){},293:function(e,t){},295:function(e,t){},319:function(e,t){},32:function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"f",(function(){return i})),n.d(t,"e",(function(){return c}));var u=n(8);const a=Object(u.c)({name:"chat",initialState:{isConnected:!1,currentChannel:"",params:{global:null,byChannels:{}}},reducers:{updateIsConnected:(e,{payload:t})=>{e.isConnected=t},updateCurrentChannel:(e,{payload:t})=>{e.currentChannel=t},updateGlobalUserParams:(e,{payload:t})=>{e.params.global=t.tags},updateUserParams:(e,{payload:t})=>{const{channel:n,tags:u}=t;e.params.byChannels[n]||(e.params.byChannels[n]={room:null,user:null}),e.params.byChannels[n].user=u},updateRoomParams:(e,{payload:t})=>{const{channel:n,tags:u}=t;e.params.byChannels[n]||(e.params.byChannels[n]={room:null,user:null}),e.params.byChannels[n].room=u}}}),{updateIsConnected:r,updateCurrentChannel:o,updateGlobalUserParams:s,updateUserParams:i,updateRoomParams:c}=a.actions;t.a=a.reducer},33:function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return c})),n.d(t,"e",(function(){return l}));var u=n(31),a=n(13),r=n(12);const o=e=>"success"===e.badges.global.status||"error"===e.badges.global.status,s=e=>{var t,n;return"success"===(null===(t=e.badges.byChannels[Object(r.b)(e)])||void 0===t?void 0:t.status)||"error"===(null===(n=e.badges.byChannels[Object(r.b)(e)])||void 0===n?void 0:n.status)},i=e=>e.badges.global.items,c=e=>{var t;return(null===(t=e.badges.byChannels[Object(r.b)(e)])||void 0===t?void 0:t.items)||{}},l=Object(u.a)(r.d,i,c,a.a)},358:function(e,t,n){"use strict";n.r(t);var u=n(0),a=n.n(u),r=n(40),o=n(17),s=n(41),i=n(3),c=n(1),l=n(16),d=n(12),m=n(44),b=n(211),g=n.n(b),f=n(36);var h=()=>{const e=Object(i.b)(),t=Object(i.c)(l.a);Object(u.useEffect)(()=>{if(t)return;const{idToken:n}=localStorage,u=Object(s.c)();if(n)if(u){const{id:t,login:n}=u,a={isAuth:!0,userId:t,userLogin:n};e(Object(f.c)(a))}else{const t=g.a.decode(n);e(t?Object(f.b)(t.sub):Object(f.c)({isAuth:!1}))}else e(Object(f.c)({isAuth:!1}))},[e,t])};const p=e=>{var t;return(null===(t=e.messages[Object(d.b)(e)])||void 0===t?void 0:t.items)||[]},E=e=>{var t;return(null===(t=e.messages[Object(d.b)(e)])||void 0===t?void 0:t.users)||[]},v=e=>{var t,n;const u=Object(d.b)(e);return"success"===(null===(t=e.messages[u])||void 0===t?void 0:t.history.status)||"error"===(null===(n=e.messages[u])||void 0===n?void 0:n.history.status)||!1},A=e=>{var t;return(null===(t=e.messages[Object(d.b)(e)])||void 0===t?void 0:t.history.isAdded)||!1},C=e=>{var t;return(null===(t=e.messages[Object(d.b)(e)])||void 0===t?void 0:t.isEven)||!1};var y=n(23),x=n(33),F=n(83),D=n(38),O=n(52),B=n(84),j=n(107);var w=()=>{const e=Object(i.b)(),t=Object(i.c)(l.a),n=Object(i.c)(l.b),a=Object(i.c)(l.c),r=Object(i.c)(d.b),o=Object(i.c)(d.a),s=Object(i.c)(y.h),c=Object(i.c)(y.d),m=Object(i.c)(y.c),b=Object(i.c)(y.g),g=Object(i.c)(y.f),f=Object(i.c)(x.d),h=Object(i.c)(x.c),p=Object(i.c)(v),E=Object(i.c)(F.b),C=Object(i.c)(A),w=t&&r&&!C&&((!n||s)&&c&&m&&b&&g)&&(!n||E)&&f&&h&&p;Object(u.useEffect)(()=>{e(Object(O.c)()),e(Object(O.e)()),e(Object(B.c)())},[e]),Object(u.useEffect)(()=>{w&&e(Object(D.a)(r))},[e,r,w]),Object(u.useEffect)(()=>{!C&&r&&e(Object(D.d)(r))},[e,r,C]),Object(u.useEffect)(()=>{t&&n&&a&&(e(Object(O.f)(a)),e(Object(j.b)(a)))},[e,t,n,a]),Object(u.useEffect)(()=>{if(r&&o){const t={channel:r,channelId:o};e(Object(O.b)(t)),e(Object(O.d)(t)),e(Object(B.b)(t))}},[e,r,o])},k=n(7),S=n(32);var R=()=>{const e=Object(o.f)(),t=Object(i.b)(),{hash:n}=e.location;Object(u.useEffect)(()=>{if(n&&n.length>1){const e=n.slice(1);return t(Object(S.b)(e)),localStorage.setItem(k.f,e),void(document.title=e?`#${e} - Honey Chat `:"Honey Chat")}const u=localStorage.getItem(k.f);u?(e.push({pathname:"/chat/",hash:u}),t(Object(S.b)(u))):t(Object(S.b)(""))},[t,e,n])},I=n(71),_=n(370),T=n(106);var z=e=>e.split(" ").map(e=>{if(":"!==e[0]||":"!==e[e.length-1])return e;const t=e.slice(1,-1),n=T.lib[t];return n&&n.char?n.char:e}).join(" ");var P=()=>{const e=Object(i.b)(),t=Object(i.c)(l.a),n=Object(i.c)(l.b),a=Object(i.c)(l.d),r=Object(i.c)(d.c),o=Object(i.c)(d.b),s=Object(_.a)(o),c=Object(u.useRef)(null),m=Object(u.useCallback)(t=>{if(!t.current)return;t.current.on("register",()=>e(Object(S.d)(!0))),t.current.on("disconnect",()=>e(Object(S.d)(!1))),t.current.on("globaluserstate",t=>e(Object(S.c)(t))),t.current.on("userstate",t=>e(Object(S.f)(t))),t.current.on("roomstate",t=>e(Object(S.e)(t))),t.current.on("message",t=>{e(Object(D.e)({type:"message",message:t}))}),t.current.on("notice",n=>{if(t.current&&"Login authentication failed"===n.message)return e(Object(f.d)()),t.current.disconnect(),void(t.current=null);e(Object(D.e)({type:"notice",message:n}))}),t.current.on("usernotice",t=>e(Object(D.e)({type:"user-notice",message:t}))),t.current.on("clearchat",t=>{t.tags.targetUserId&&e(Object(D.b)(t))})},[e]);Object(u.useEffect)(()=>()=>{c.current&&(c.current.disconnect(),c.current=null)},[c]),Object(u.useEffect)(()=>{if(o&&t)if(c.current)s&&s!==o&&(c.current.part(s),c.current.join(o));else{const e=n?{name:a,auth:localStorage.getItem(k.c)}:null;(async()=>{c.current=new I.a(e),m(c),await c.current.connect(),c.current.join(o)})()}},[e,m,n,t,r,a,o,s]);return Object(u.useMemo)(()=>({say(t,n){if(!c.current||!n.trim())return;const u=z(n.trim());function a(n){if(n.channel===t){const a={message:u,channel:t,tags:n.tags};e(Object(D.e)({type:"own-message",message:a})),o()}}function r(e){e.channel===t&&k.i.includes(e.tags.msgId)&&o()}function o(){c.current&&(c.current.off("notice",r),c.current.off("userstate",a))}c.current.say(t,u),c.current.on("notice",r),c.current.on("userstate",a),setTimeout(()=>o(),1e4)}}),[c,e])},$=n(371);var N=(e,t,n=5)=>{const u=[],a=e.toLowerCase();for(const r of t){if(u.length===n)return u;const e=r.toLowerCase();(""===a||e.startsWith(a))&&u.push(r)}return u},M=n(103);const U={type:"users",isActive:!1,items:[],activeIndex:0,start:0,end:0},L=({activeIndex:e,items:t,...n})=>({activeIndex:0===e?t.length-1:e-1,items:t,...n}),G=({activeIndex:e,items:t,...n})=>({activeIndex:e===t.length-1?0:e+1,items:t,...n}),H=(e,{type:t,items:n,activeIndex:u,start:a,end:r})=>{if(0===n.length)return e;const o=n[u],s="users"===t?"@"+o:o.alt;return`${e.substring(0,a)}${s}${e.substring(r)||" "}`};var W=(e,t,n)=>{const[a,r]=Object($.a)(U),o=Object(i.c)(y.b),s=Object(i.c)(E),c=Object(u.useRef)(s);c.current=s;const l=Object(u.useRef)(o);l.current=o;const d=Object(u.useRef)(a);d.current=a;const m=Object(u.useCallback)(t=>{const{value:n,selectionStart:u}=t.target;e(n);const a=n.lastIndexOf(" ",u-1),o=n.indexOf(" ",u),s=-1===a?0:a+1,i=-1===o?n.length:o,m=n.substring(s,i),b=k.k.users.regex.exec(m);if(b){const[,e]=b,t=N(e,c.current,k.k.users.limit);return void r({type:"users",isActive:!0,items:t,activeIndex:0,start:s,end:i})}const g=k.k.emotes.regex.exec(m);if(g&&l.current){const[,e]=g,t=Object(M.a)(e,l.current,k.k.emotes.limit);r({type:"emotes",isActive:!0,items:t,activeIndex:0,start:s,end:i})}else d.current.isActive&&r(U)},[e,r,d]),b=Object(u.useCallback)(e=>{},[]),g=Object(u.useCallback)(n=>{if(d.current.isActive){if("Enter"===n.key||"Tab"===n.key)return n.preventDefault(),e(e=>H(e,d.current)),void r(U);if("ArrowUp"===n.key)return n.preventDefault(),void r(L);if("ArrowDown"===n.key)return n.preventDefault(),void r(G);if("Escape"===n.key)return void r({isActive:!1})}d.current.isActive||"Enter"===n.key&&(n.preventDefault(),t())},[t,e,r,d]),f=Object(u.useCallback)(e=>r({activeIndex:e}),[r]),h=Object(u.useCallback)(t=>{e(e=>H(e,{...d.current,activeIndex:t})),n.current&&n.current.focus(),r(U)},[e,r,n]);return{suggestions:a,handleChange:m,handleKeyUp:b,handleKeyDown:g,handleBlur:Object(u.useCallback)(()=>{r({isActive:!1})},[r]),handleSuggestionMouseEnter:f,handleSuggestionClick:h}},J=n(217),K=n(85);function V(){return(V=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var u in n)Object.prototype.hasOwnProperty.call(n,u)&&(e[u]=n[u])}return e}).apply(this,arguments)}var Y=a.a.createElement("path",{fill:"currentColor",d:"M8.5 10L4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z"});const Z=({svgRef:e,title:t,...n})=>a.a.createElement("svg",V({viewBox:"0 0 20 20",ref:e},n),t?a.a.createElement("title",null,t):null,Y),q=a.a.forwardRef((e,t)=>a.a.createElement(Z,V({svgRef:t},e)));n.p;const Q={small:c.b`
    width: 24px;
    height: 24px;
  `,medium:c.b`
    width: 30px;
    height: 30px;
  `};var X=c.c.button.attrs({type:"button"})`
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

  ${e=>Q[e.size||"medium"]};

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
`;const ee=c.c.div`
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 4px 8px 0px,
    rgba(0, 0, 0, 0.4) 0px 0px 4px 0px;
  background-color: #18181b;
  white-space: normal;
  color: #fff;
  border-radius: 4px;
`,te=Object(c.c)(X).attrs({size:"small"})`
  position: absolute;
  top: 5px;
  right: 5px;
`,ne=Object(c.c)(q)`
  display: block;
  width: 20px;
  height: 20px;
`;var ue=({children:e,onClose:t})=>a.a.createElement(ee,null,a.a.createElement(te,{onClick:t},a.a.createElement(ne,null)),e);function ae(){return(ae=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var u in n)Object.prototype.hasOwnProperty.call(n,u)&&(e[u]=n[u])}return e}).apply(this,arguments)}var re=a.a.createElement("g",{fill:"currentColor"},a.a.createElement("path",{d:"M7 11a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-4 4a2 2 0 002-2H8a2 2 0 002 2z"}),a.a.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z",clipRule:"evenodd"}));const oe=({svgRef:e,title:t,...n})=>a.a.createElement("svg",ae({viewBox:"0 0 20 20",ref:e},n),t?a.a.createElement("title",null,t):null,re),se=a.a.forwardRef((e,t)=>a.a.createElement(oe,ae({svgRef:t},e)));n.p;var ie=n(215);var ce=Object(c.c)(ie.a).attrs({disableTracksWidthCompensation:!0})`
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
`;function le(){return(le=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var u in n)Object.prototype.hasOwnProperty.call(n,u)&&(e[u]=n[u])}return e}).apply(this,arguments)}var de=a.a.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z",clipRule:"evenodd"});const me=({svgRef:e,title:t,...n})=>a.a.createElement("svg",le({viewBox:"0 0 20 20",ref:e},n),t?a.a.createElement("title",null,t):null,de),be=a.a.forwardRef((e,t)=>a.a.createElement(me,le({svgRef:t},e)));n.p;const ge=c.c.div`
  padding-top: 30px;
  padding-bottom: 16px;
  height: 100%;
`,fe=c.c.div`
  height: calc(100% - 30px);
`,he=c.c.div`
  padding-top: 10px;
  padding-right: 16px;
  padding-left: 16px;

  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
`,pe=c.c.div`
  padding-bottom: 10px;
  font-size: 12px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
`,Ee=c.c.div``,ve=c.c.img`
  padding: 2px;
  width: 32px;
  height: 32px;
  object-fit: contain;

  &:hover {
    background-color: rgba(119, 44, 232, 0.2);
    cursor: pointer;
  }
`,Ae=c.c.div`
  position: relative;
  padding: 0 16px;
  color: #adadb8;
`,Ce=c.c.input`
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
`,ye=Object(c.c)(be)`
  position: absolute;
  top: 50%;
  left: 21px;
  display: block;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
`;var xe=({onEmoteClick:e})=>{const[t,n]=Object(u.useState)(""),r=Object(u.useRef)(null),o=Object(i.c)(e=>Object(y.a)(e,t));Object(u.useEffect)(()=>(r.current&&r.current.focus(),()=>n("")),[]);return a.a.createElement(ge,null,a.a.createElement(Ae,null,a.a.createElement(ye,null),a.a.createElement(Ce,{ref:r,placeholder:"Search for Emotes",value:t,onChange:e=>n(e.target.value)})),a.a.createElement(fe,null,a.a.createElement(ce,null,o.map(({title:t,items:n},u)=>a.a.createElement(he,{key:u},!!t&&a.a.createElement(pe,null,t),a.a.createElement(Ee,null,n.map(({alt:t,src:n,srcSet:u})=>a.a.createElement(ve,{key:t,alt:t,src:n,srcSet:u,onClick:()=>e(t)}))))))))};const Fe=c.c.div`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #18181b;

  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`,De=c.c.div`
  position: relative;
`,Oe=c.c.div`
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
`,Be=c.c.div`
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
`,je=c.c.img`
  margin-right: 8px;
  width: 28px;
  height: 28px;
  object-fit: contain;
`,we=c.c.div`
  position: relative;
`,ke=c.c.div`
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

      & > ${we} {
        margin-left: -1px;
        margin-bottom: -1px;
        margin-right: -1px;
      }
    `};
`,Se=c.c.div`
  position: absolute;
  top: auto;
  right: 0;
  bottom: 100%;
  margin-bottom: 8px;
  width: 320px;
  height: 405px;
  min-width: 0;
  white-space: nowrap;
`,Re=Object(c.c)(J.a)`
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
`,Ie=Object(c.c)(X)`
  position: absolute;
  right: 5px;
  bottom: 5px;
`,_e=Object(c.c)(se)`
  display: block;
  width: 20px;
  height: 20px;
`,Te=a.a.forwardRef(({text:e,suggestions:t,isDisabled:n,onEmoteClick:r,onChange:o,onKeyUp:s,onKeyDown:c,onBlur:l,onSuggestionMouseEnter:d,onSuggestionClick:m},b)=>{const g=Object(u.useRef)(null),f=Object(u.useRef)(null);Object(K.a)([b,f],()=>l());const[h,p]=Object(u.useState)(!1),[E,v]=Object(u.useState)(!1),A=Object(i.c)(y.e),C=()=>v(!1);Object(K.a)(g,C);return a.a.createElement(Fe,{ref:g},a.a.createElement(De,null,t.isActive&&(({type:e,items:t,activeIndex:n})=>{const u=(e,t)=>a.a.createElement(Be,{key:e,isActive:t===n,onMouseEnter:()=>d(t),onClick:()=>m(t)},e),r=({src:e,srcSet:t,alt:u},r)=>a.a.createElement(Be,{key:u,isActive:r===n,onMouseEnter:()=>d(r),onClick:()=>m(r)},a.a.createElement(je,{src:e,srcSet:t,alt:u}),u);return a.a.createElement(Oe,{ref:f},t.length?"users"===e?t.map(u):t.map(r):"No matches")})(t),a.a.createElement(ke,{isSuggestions:t.isActive},a.a.createElement(we,null,a.a.createElement(Re,{inputRef:b,value:e,placeholder:"Send a message",maxLength:500,maxRows:4,disabled:n,$showScroll:h,onChange:o,onKeyUp:s,onKeyDown:c,onHeightChange:e=>p(e>=96)}),A&&a.a.createElement(Ie,{onClick:()=>v(!E)},a.a.createElement(_e,null)))),E&&a.a.createElement(Se,null,a.a.createElement(ue,{onClose:C},a.a.createElement(xe,{onEmoteClick:r})))))});var ze=a.a.memo(Te);function Pe(){return(Pe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var u in n)Object.prototype.hasOwnProperty.call(n,u)&&(e[u]=n[u])}return e}).apply(this,arguments)}var $e=a.a.createElement("g",{fill:"currentColor"},a.a.createElement("path",{d:"M10 8a2 2 0 100 4 2 2 0 000-4z"}),a.a.createElement("path",{fillRule:"evenodd",d:"M9 2h2a2.01 2.01 0 001.235 1.855l.53.22a2.01 2.01 0 002.185-.439l1.414 1.414a2.01 2.01 0 00-.439 2.185l.22.53A2.01 2.01 0 0018 9v2a2.01 2.01 0 00-1.855 1.235l-.22.53a2.01 2.01 0 00.44 2.185l-1.415 1.414a2.01 2.01 0 00-2.184-.439l-.531.22A2.01 2.01 0 0011 18H9a2.01 2.01 0 00-1.235-1.854l-.53-.22a2.009 2.009 0 00-2.185.438L3.636 14.95a2.009 2.009 0 00.438-2.184l-.22-.531A2.01 2.01 0 002 11V9c.809 0 1.545-.487 1.854-1.235l.22-.53a2.009 2.009 0 00-.438-2.185L5.05 3.636a2.01 2.01 0 002.185.438l.53-.22A2.01 2.01 0 009 2zm-4 8l1.464 3.536L10 15l3.535-1.464L15 10l-1.465-3.536L10 5 6.464 6.464 5 10z",clipRule:"evenodd"}));const Ne=({svgRef:e,title:t,...n})=>a.a.createElement("svg",Pe({viewBox:"0 0 20 20",ref:e},n),t?a.a.createElement("title",null,t):null,$e),Me=a.a.forwardRef((e,t)=>a.a.createElement(Ne,Pe({svgRef:t},e)));n.p;function Ue(){return(Ue=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var u in n)Object.prototype.hasOwnProperty.call(n,u)&&(e[u]=n[u])}return e}).apply(this,arguments)}var Le=a.a.createElement("path",{fill:"#fff",d:"M13 8l-5 5v18h6v5l5-5h4l9-9V8z"}),Ge=a.a.createElement("path",{fill:"#9147ff",d:"M26 25l4-4V10H14v15h4v4l4-4z"}),He=a.a.createElement("path",{fill:"#fff",d:"M20 14h2v6h-2v-6zm7 0v6h-2v-6h2z"});const We=({svgRef:e,title:t,...n})=>a.a.createElement("svg",Ue({viewBox:"0 0 40 40",ref:e},n),t?a.a.createElement("title",null,t):null,Le,Ge,He),Je=a.a.forwardRef((e,t)=>a.a.createElement(We,Ue({svgRef:t},e)));n.p;var Ke=c.c.button.attrs({type:"button"})`
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
`;const Ve=c.c.div`
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 20px;
`,Ye=c.c.label`
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
`,Ze=c.c.input.attrs({type:"checkbox"})`
  position: absolute;
  opacity: 0;

  &:checked + ${Ye} {
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
`,qe=({id:e,label:t,checked:n,readOnly:u,onChange:r})=>a.a.createElement(Ve,null,a.a.createElement(Ze,{id:e,"aria-label":t,checked:n,readOnly:u,onChange:r}),a.a.createElement(Ye,{htmlFor:e}));qe.defaultProps={checked:!1,readOnly:!1,onChange:()=>{}};var Qe=qe,Xe=n(87);const et=c.c.div`
  padding: 16px;
  height: 100%;
`,tt=c.c.h2`
  margin: 0;
  padding: 0;
  font-size: 14px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`,nt=Object(c.c)(ce)`
  height: 100%;
`,ut=c.c.div`
  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
`,at=c.c.div`
  padding: 8px 0;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.6);
`,rt=c.c.div``,ot=c.c.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  cursor: pointer;
`,st=c.c.span``,it=c.c.div`
  display: flex;
  align-items: center;
`,ct=c.c.div`
  font-weight: bold;
  color: ${e=>e.color};
`,lt=Object(c.c)(r.b)`
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
`,dt=c.c.img`
  margin-right: 3px;
  max-width: 100%;
  vertical-align: middle;
  border-radius: 3px;
`;var mt=()=>{const e=Object(i.b)(),t=Object(i.c)(m.e),n=Object(i.c)(l.b),r=Object(i.c)(d.f),o=Object(i.c)(d.e),s=Object(i.c)(x.e),c=Object(u.useCallback)(({id:t,name:n,title:u,description:r,value:o})=>a.a.createElement(ot,{key:t,onClick:()=>e(Object(Xe.a)({name:n,value:!o})),title:r},a.a.createElement(st,null,u),a.a.createElement(Qe,{id:t,label:u,checked:o,onChange:()=>e(Object(Xe.a)({name:n,value:o}))})),[e]),b=Object(u.useCallback)(({title:e,items:t},n)=>a.a.createElement(ut,{key:n},!!e&&a.a.createElement(at,null,e),a.a.createElement(rt,null,t.map(c))),[c]);return a.a.createElement(et,null,a.a.createElement(tt,null,"Chat settings"),a.a.createElement(nt,null,n&&a.a.createElement(ut,null,a.a.createElement(at,null,"Profile"),a.a.createElement(rt,null,a.a.createElement(it,null,s.map(({alt:e,label:t,src:n,srcSet:u},r)=>a.a.createElement(dt,{key:r,alt:e,"aria-label":t,src:n,srcSet:u})),a.a.createElement(ct,{color:o},r),a.a.createElement(lt,{to:"/chat/logout"},"Log Out")))),t.map(b)))};const bt=c.c.div`
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
`,gt=c.c.div`
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 8px;
  }
`,ft=c.c.div`
  position: absolute;
  top: auto;
  right: 10px;
  bottom: 100%;
  margin-bottom: 10px;
  width: 320px;
  height: 405px;
  min-width: 0;
  white-space: nowrap;
`,ht=Object(c.c)(X)`
  margin-left: auto;
`,pt=Object(c.c)(Me)`
  display: block;
  width: 20px;
  height: 20px;
`,Et=Object(c.c)(Je)`
  display: block;
  margin-right: 4px;
  width: 20px;
  height: 20px;
`;var vt=a.a.memo(({isDisabled:e,onSendMessage:t})=>{const[n,o]=Object(u.useState)(!1),s=Object(u.useRef)(null),c=Object(u.useRef)(null),d=Object(i.c)(l.a),m=Object(i.c)(l.b),b=()=>o(!1);Object(K.a)([s,c],b);return a.a.createElement(bt,null,a.a.createElement(gt,null,d&&!m&&a.a.createElement(Ke,{as:r.b,to:"/chat/auth"},a.a.createElement(Et,null),"Sign in with Twitch"),a.a.createElement(ht,{ref:c,onClick:()=>o(e=>!e)},a.a.createElement(pt,null)),a.a.createElement(Ke,{disabled:e,onClick:t},"Chat")),n&&a.a.createElement(ft,{ref:s},a.a.createElement(ue,{onClose:b},a.a.createElement(mt,null))))}),At=n(98),Ct=n(372);const yt=c.c.div`
  padding: 5px 20px;
  color: ${e=>e.isAction?e.color:"#fff"};
  opacity: ${e=>e.isHistory||e.isDeleted?"0.5":"1"};
  line-height: 20px;
  word-wrap: break-word;
  background-color: ${e=>e.isMention?"rgba(255, 0, 0, 0.3)":e.isEven?"#1f1925":"transparent"};
`,xt=c.c.span`
  font-weight: bold;
  color: ${e=>e.color};
  cursor: pointer;
`,Ft=c.c.img`
  display: inline-block;
  margin-top: -5px;
  margin-bottom: -4px;
  width: 20px;
  height: auto;
  vertical-align: middle;
`,Dt=c.c.img`
  display: inline-block;
  margin: -5px 0;
  vertical-align: middle;
`,Ot=c.c.span`
  display: inline-block;

  /* Prevent stacking of IceCold, SoSnowy */
  &[data-emote-id='5849c9a4f52be01a7ee5f79d'] + &[data-emote-id='5849c9a4f52be01a7ee5f79d'],
  &[data-emote-id='567b5b520e984428652809b6'] + &[data-emote-id='567b5b520e984428652809b6'] {
    display: none;
  }

  /* IceCold */
  &        + &[data-emote-id='5849c9a4f52be01a7ee5f79d'],
  ${Ft} + &[data-emote-id='5849c9a4f52be01a7ee5f79d'] {
    margin-left: -33px;
  }

  /* SoSnowy */
  &        + &[data-emote-id='567b5b520e984428652809b6'],
  ${Ft} + &[data-emote-id='567b5b520e984428652809b6'] {
    margin-left: -32px;
  }

  /* SantaHat */
  &        + &[data-emote-id='58487cc6f52be01a7ee5f205'],
  ${Ft} + &[data-emote-id='58487cc6f52be01a7ee5f205'] {
    margin-left: -34px;
    margin-top: -18px;
  }

  /* TopHat, CandyCane, ReinDeer */
  &        + &[data-emote-id='5849c9c8f52be01a7ee5f79e'],
  ${Ft} + &[data-emote-id='5849c9c8f52be01a7ee5f79e'],
  &        + &[data-emote-id='567b5c080e984428652809ba'],
  ${Ft} + &[data-emote-id='567b5c080e984428652809ba'],
  &        + &[data-emote-id='567b5dc00e984428652809bd'],
  ${Ft} + &[data-emote-id='567b5dc00e984428652809bd'] {
    margin-left: -31px;
    margin-top: -18px;
  }

  /* cvHazmat, cvMask */
  &        + &[data-emote-id='5e76d338d6581c3724c0f0b2'],
  ${Ft} + &[data-emote-id='5e76d338d6581c3724c0f0b2'],
  &        + &[data-emote-id='5e76d399d6581c3724c0f0b8'],
  ${Ft} + &[data-emote-id='5e76d399d6581c3724c0f0b8'] {
    margin-left: -34px;
  }
  &        + &[data-emote-id='5e76d338d6581c3724c0f0b2'] ${Dt},
  ${Ft} + &[data-emote-id='5e76d338d6581c3724c0f0b2'] ${Dt},
  &        + &[data-emote-id='5e76d399d6581c3724c0f0b8'] ${Dt},
  ${Ft} + &[data-emote-id='5e76d399d6581c3724c0f0b8'] ${Dt} {
    height: 34px;
    width: 34px;
  }
`,Bt=c.c.span`
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
`,wt=c.c.span`
  margin-right: 5px;
  color: rgba(255, 255, 255, 0.6);
`,kt=c.c.img`
  margin-bottom: 2px;
  margin-right: 3px;
  max-width: 100%;
  vertical-align: middle;
  border-radius: 3px;
`;var St=a.a.memo(({message:{entities:e,user:{login:t,color:n,displayName:r,badges:o},timestamp:s,isHistory:i,isAction:c,isDeleted:l,isMention:d},userLogin:m,isEven:b,isShowTimestamps:g,onNameRightClick:f})=>{const[h,p]=Object(u.useState)(!1);return a.a.createElement(yt,{isHistory:i,isAction:c,isEven:b,isMention:d,isDeleted:l,color:n},g&&a.a.createElement(wt,null,Object(Ct.a)("h:mm",new Date(s))),o.length>0&&(e=>e.map(({alt:e,label:t,src:n,srcSet:u},r)=>a.a.createElement(kt,{key:r,alt:e,"aria-label":t,src:n,srcSet:u})))(o),a.a.createElement(xt,{color:n,onContextMenu:e=>{f(r),e.preventDefault()}},r),c?" ":": ",l&&!h?a.a.createElement(jt,{onClick:()=>p(!0)},"<message deleted>"):e.map(((e,t)=>(n,u)=>"object"!==typeof n?n:"twitch-emote"===n.type||"bttv-emote"===n.type||"ffz-emote"===n.type?a.a.createElement(Ot,{"data-emote-id":n.id},a.a.createElement(Dt,{key:u,src:n.src,srcSet:n.srcSet,alt:n.alt})):"emoji"===n.type?a.a.createElement(Ot,null,a.a.createElement(Ft,{key:u,src:n.src,alt:n.alt})):"mention"===n.type?a.a.createElement(Bt,{key:u,isActive:n.target===t,isOwnMessage:e===t},n.text):"link"===n.type?a.a.createElement(jt,{key:u,href:n.href,rel:"noreferrer noopener",target:"_blank"},n.text):null)(t,m)))});const Rt=c.c.div`
  padding: 5px 20px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 20px;
  word-wrap: break-word;
  background-color: ${e=>e.isEven?"#1f1925":"transparent"};
`;var It=({message:{message:e},isEven:t})=>a.a.createElement(Rt,{isEven:t},e);const _t=c.c.div`
  padding: 5px 20px 5px 16px;
  line-height: 20px;
  word-wrap: break-word;
  border-left: 4px solid #9147ff;
  color: #fff;
`;var Tt=({message:{systemMessage:e}})=>a.a.createElement(_t,null,e);var zt=a.a.memo(({message:e,userLogin:t,isEven:n,isShowTimestamps:u,onNameRightClick:r})=>"message"===e.type?a.a.createElement(St,{message:e,userLogin:t,isEven:n,isShowTimestamps:u,onNameRightClick:r}):"notice"===e.type?a.a.createElement(It,{message:e,isEven:n}):"user-notice"===e.type?a.a.createElement(Tt,{message:e}):Object(At.a)(e));const Pt=c.c.div`
  position: relative;
  flex-grow: 1;
`,$t=Object(c.c)(ce)`
  .ScrollbarsCustom-Content {
    padding-bottom: 10px !important;
  }
`,Nt=c.c.button`
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
`;var Mt=({onNameRightClick:e})=>{const[t,n]=Object(u.useState)(!1),r=Object(i.c)(p),o=Object(i.c)(l.d),s=Object(i.c)(C),c=Object(i.c)(m.c),d=Object(i.c)(m.d),b=Object(u.useRef)(null),g=()=>{b.current&&b.current.scrollToBottom()};Object(u.useEffect)(()=>{t||g()},[r]);const f=e=>!!d&&(s?e%2===1:e%2===0);return a.a.createElement(Pt,null,a.a.createElement($t,{onUpdate:({clientHeight:e,contentScrollHeight:t,scrollTop:u})=>{n(u+100<t-e)},ref:b},r.map((t,n)=>a.a.createElement(zt,{key:t.id,message:t,userLogin:o,isEven:f(n),isShowTimestamps:c,onNameRightClick:e}))),a.a.createElement(Nt,{onClick:g,isVisible:t},"More messages below"))};const Ut=c.c.div`
  padding: 10px;
  flex-grow: 1;
  width: 320px;
`,Lt=c.c.h2`
  margin-top: 0;
  margin-bottom: 10px;
  padding: 0;
  color: #fff;
`,Gt=c.c.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: 10px;
  }
`,Ht=c.c.input`
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
`,Wt=Object(c.c)(Ke)`
  flex-shrink: none;
`;var Jt=()=>{const e=Object(o.f)(),[t,n]=Object(u.useState)(""),r=Object(u.useRef)(null);Object(u.useEffect)(()=>{r.current&&r.current.focus()},[]);const s=()=>{e.push({pathname:"/chat/",hash:t})};return a.a.createElement(Ut,null,a.a.createElement(Lt,null,"Channel to join: "),a.a.createElement(Gt,null,a.a.createElement(Ht,{ref:r,value:t,onChange:e=>n(e.target.value),onKeyPress:e=>{"Enter"===e.key&&s()}}),a.a.createElement(Wt,{onClick:s,disabled:!t},"Join")))};const Kt=c.c.div`
  height: 100vh;
  font-size: 12px;
  background-color: #0e0e10;
`,Vt=c.c.div`
  display: flex;
  flex-direction: column;
  width: ${e=>e.isFixedWidth?"340px":"auto"};
  height: 100%;
  background-color: #18181b;
`;var Yt=()=>{const[e,t]=Object(u.useState)(""),n=P();h(),R(),w();const r=Object(i.c)(d.b),o=Object(i.c)(l.b),s=Object(i.c)(d.c),c=Object(i.c)(m.a),b=Object(u.useRef)(null),g=Object(u.useRef)(e);g.current=e;const f=!o||!s,p=Object(u.useCallback)(()=>{n&&g.current&&(n.say(r,g.current),t(""))},[n,r,g,t]),E=W(t,p,b),v=Object(u.useCallback)(e=>{t(t=>`${t.trim()} @${e} `.trimLeft()),b.current&&b.current.focus()},[t,b]),A=Object(u.useCallback)(e=>{t(t=>`${t.trim()} ${e} `.trimLeft())},[t]);return a.a.createElement(Kt,null,a.a.createElement(Vt,{isFixedWidth:c},r?a.a.createElement(Mt,{onNameRightClick:v}):a.a.createElement(Jt,null),a.a.createElement(ze,{ref:b,text:e,suggestions:E.suggestions,isDisabled:f,onEmoteClick:A,onChange:E.handleChange,onKeyUp:E.handleKeyUp,onKeyDown:E.handleKeyDown,onBlur:E.handleBlur,onSuggestionMouseEnter:E.handleSuggestionMouseEnter,onSuggestionClick:E.handleSuggestionClick}),a.a.createElement(vt,{isDisabled:f,onSendMessage:p})))};var Zt=()=>(window.location.href=Object(s.a)(),null);var qt=()=>{const e=Object(o.f)(),t=Object(i.b)();return localStorage.removeItem(k.c),localStorage.removeItem(k.e),localStorage.removeItem(k.h),t(Object(f.d)()),e.push({pathname:"/chat/",hash:localStorage.getItem(k.f)||""}),null};var Qt=()=>{const e=Object(o.f)();if(!window.location.hash)return null;const t=new URLSearchParams(window.location.hash.slice(1)),n=t.get("access_token"),u=t.get("id_token");return n&&u?(localStorage.setItem(k.c,n),localStorage.setItem(k.e,u),e.push({pathname:"/chat/",hash:localStorage.getItem(k.f)||""}),null):null},Xt=c.b`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: Roobert, Helvetica Neue, Helvetica, Arial, sans-serif;
  }
`,en=c.b``,tn=c.b``,nn=c.a`
  :root {
    ${en};
    ${tn};
  }
  ${Xt};
`;const un=({location:e})=>Object(s.b)(e.hash)?a.a.createElement(Qt,null):a.a.createElement(Yt,null);t.default=()=>a.a.createElement(a.a.Fragment,null,a.a.createElement(r.a,null,a.a.createElement(o.c,null,a.a.createElement(o.a,{exact:!0,path:"/chat/",render:un}),a.a.createElement(o.a,{exact:!0,path:"/chat/auth",component:Zt}),a.a.createElement(o.a,{exact:!0,path:"/chat/logout",component:qt}))),a.a.createElement(nn,null))},359:function(e,t,n){"use strict";n.r(t);var u=n(0),a=n.n(u),r=n(66),o=n.n(r),s=n(3),i=n(137);const c=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)),l=(e,t)=>{navigator.serviceWorker.register(e).then(e=>{e.onupdatefound=()=>{const n=e.installing;null!=n&&(n.onstatechange=()=>{"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(e=>{console.error("Error during service worker registration:",e)})};var d=n(41),m=n(8),b=n(35),g=n(36),f=n(32),h=n(38),p=n(52),E=n(84),v=n(107),A=n(87);var C=Object(b.c)({auth:g.a,chat:f.a,messages:h.c,emotes:p.a,badges:E.a,blockedUsers:v.a,options:A.b});var y=Object(m.a)({reducer:C});if(i.a.initialize("UA-139550930-3"),!Object(d.b)(window.location.hash)){const e=window.location.pathname+window.location.search+window.location.hash;i.a.pageview(e)}(()=>{const e=n(358).default;o.a.render(a.a.createElement(s.a,{store:y},a.a.createElement(e,null)),document.getElementById("root"))})(),(e=>{if("serviceWorker"in navigator){if(new URL("/chat",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",()=>{const t="/chat/service-worker.js";c?(((e,t)=>{fetch(e,{headers:{"Service-Worker":"script"}}).then(n=>{const u=n.headers.get("content-type");404===n.status||null!=u&&-1===u.indexOf("javascript")?navigator.serviceWorker.ready.then(e=>{e.unregister().then(()=>{window.location.reload()})}):l(e,t)}).catch(()=>{console.log("No internet connection found. App is running in offline mode.")})})(t,e),navigator.serviceWorker.ready.then(()=>{console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):l(t,e)})}})()},36:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return l}));var u=n(8),a=n(24),r=n(41);const o={status:"idle",userId:null,userLogin:null},s=Object(u.b)("auth/fetchUser",async e=>{const t=await a.j(e),{id:n,login:u}=t.data[0];return Object(r.d)({id:n,login:u}),t}),i=Object(u.c)({name:"auth",initialState:o,reducers:{initializeAuth:(e,{payload:t})=>{e.status=t.isAuth?"success":"error",t.userId&&(e.userId=t.userId),t.userLogin&&(e.userLogin=t.userLogin)},invalidateAuth:()=>o},extraReducers:e=>{e.addCase(s.pending,e=>{e.status="loading"}),e.addCase(s.fulfilled,(e,{payload:t})=>{e.status="success",e.userId=t.data[0].id,e.userLogin=t.data[0].login}),e.addCase(s.rejected,e=>{e.status="error"})}}),{initializeAuth:c,invalidateAuth:l}=i.actions;t.a=i.reducer},37:function(e,t,n){"use strict";n.d(t,"g",(function(){return m})),n.d(t,"d",(function(){return b})),n.d(t,"c",(function(){return g})),n.d(t,"f",(function(){return f})),n.d(t,"e",(function(){return h})),n.d(t,"b",(function(){return p})),n.d(t,"a",(function(){return E}));var u=n(53),a=n(58),r=n(363),o=n(110),s=n(75),i=n(362),c=n(140),l=n(109),d=n(86);const m=u.a("emoticon_sets"),b=e=>e,g=e=>[...e.channelEmotes,...e.sharedEmotes],f=({default_sets:e,sets:t})=>a.a(r.a(e),o.a,s.a(i.a([],"emoticons")),c.a)(t),h=a.a(l.a({},["sets"]),o.a,s.a(l.a([],["emoticons"])),c.a),p=a.a(u.a("blocks"),s.a(d.a(["user","name"]))),E=u.a("badge_sets")},38:function(e,t,n){"use strict";n.d(t,"d",(function(){return $})),n.d(t,"b",(function(){return M})),n.d(t,"e",(function(){return G})),n.d(t,"a",(function(){return H}));var u=n(8),a=n(24),r=n(7),o=n(98),s=n(71),i=n(206),c=n(207),l=n(23),d=n(83),m=n(33),b=n(44),g=n(16),f=n(58),h=n(138),p=n(88),E=n(30),v=n(369),A=n(208),C=n(106),y=n(209),x=n.n(y),F=n(13),D=n(26);const O=/^@([0-9A-Z_a-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10107}-\u{10133}\u{10140}-\u{10178}\u{1018A}\u{1018B}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{102E1}-\u{102FB}\u{10300}-\u{10323}\u{1032D}-\u{1034A}\u{10350}-\u{10375}\u{10380}-\u{1039D}\u{103A0}-\u{103C3}\u{103C8}-\u{103CF}\u{103D1}-\u{103D5}\u{10400}-\u{1049D}\u{104A0}-\u{104A9}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10858}-\u{10876}\u{10879}-\u{1089E}\u{108A7}-\u{108AF}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{108FB}-\u{1091B}\u{10920}-\u{10939}\u{10980}-\u{109B7}\u{109BC}-\u{109CF}\u{109D2}-\u{10A00}\u{10A10}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A40}-\u{10A48}\u{10A60}-\u{10A7E}\u{10A80}-\u{10A9F}\u{10AC0}-\u{10AC7}\u{10AC9}-\u{10AE4}\u{10AEB}-\u{10AEF}\u{10B00}-\u{10B35}\u{10B40}-\u{10B55}\u{10B58}-\u{10B72}\u{10B78}-\u{10B91}\u{10BA9}-\u{10BAF}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10CFA}-\u{10D23}\u{10D30}-\u{10D39}\u{10E60}-\u{10E7E}\u{10E80}-\u{10EA9}\u{10EB0}\u{10EB1}\u{10F00}-\u{10F27}\u{10F30}-\u{10F45}\u{10F51}-\u{10F54}\u{10FB0}-\u{10FCB}\u{10FE0}-\u{10FF6}\u{11003}-\u{11037}\u{11052}-\u{1106F}\u{11083}-\u{110AF}\u{110D0}-\u{110E8}\u{110F0}-\u{110F9}\u{11103}-\u{11126}\u{11136}-\u{1113F}\u{11144}\u{11147}\u{11150}-\u{11172}\u{11176}\u{11183}-\u{111B2}\u{111C1}-\u{111C4}\u{111D0}-\u{111DA}\u{111DC}\u{111E1}-\u{111F4}\u{11200}-\u{11211}\u{11213}-\u{1122B}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A8}\u{112B0}-\u{112DE}\u{112F0}-\u{112F9}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133D}\u{11350}\u{1135D}-\u{11361}\u{11400}-\u{11434}\u{11447}-\u{1144A}\u{11450}-\u{11459}\u{1145F}-\u{11461}\u{11480}-\u{114AF}\u{114C4}\u{114C5}\u{114C7}\u{114D0}-\u{114D9}\u{11580}-\u{115AE}\u{115D8}-\u{115DB}\u{11600}-\u{1162F}\u{11644}\u{11650}-\u{11659}\u{11680}-\u{116AA}\u{116B8}\u{116C0}-\u{116C9}\u{11700}-\u{1171A}\u{11730}-\u{1173B}\u{11800}-\u{1182B}\u{118A0}-\u{118F2}\u{118FF}-\u{11906}\u{11909}\u{1190C}-\u{11913}\u{11915}\u{11916}\u{11918}-\u{1192F}\u{1193F}\u{11941}\u{11950}-\u{11959}\u{119A0}-\u{119A7}\u{119AA}-\u{119D0}\u{119E1}\u{119E3}\u{11A00}\u{11A0B}-\u{11A32}\u{11A3A}\u{11A50}\u{11A5C}-\u{11A89}\u{11A9D}\u{11AC0}-\u{11AF8}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C2E}\u{11C40}\u{11C50}-\u{11C6C}\u{11C72}-\u{11C8F}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D30}\u{11D46}\u{11D50}-\u{11D59}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D89}\u{11D98}\u{11DA0}-\u{11DA9}\u{11EE0}-\u{11EF2}\u{11FB0}\u{11FC0}-\u{11FD4}\u{12000}-\u{12399}\u{12400}-\u{1246E}\u{12480}-\u{12543}\u{13000}-\u{1342E}\u{14400}-\u{14646}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16A60}-\u{16A69}\u{16AD0}-\u{16AED}\u{16B00}-\u{16B2F}\u{16B40}-\u{16B43}\u{16B50}-\u{16B59}\u{16B5B}-\u{16B61}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16E40}-\u{16E96}\u{16F00}-\u{16F4A}\u{16F50}\u{16F93}-\u{16F9F}\u{16FE0}\u{16FE1}\u{16FE3}\u{17000}-\u{187F7}\u{18800}-\u{18CD5}\u{18D00}-\u{18D08}\u{1B000}-\u{1B11E}\u{1B150}-\u{1B152}\u{1B164}-\u{1B167}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1D2E0}-\u{1D2F3}\u{1D360}-\u{1D378}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D6C0}\u{1D6C2}-\u{1D6DA}\u{1D6DC}-\u{1D6FA}\u{1D6FC}-\u{1D714}\u{1D716}-\u{1D734}\u{1D736}-\u{1D74E}\u{1D750}-\u{1D76E}\u{1D770}-\u{1D788}\u{1D78A}-\u{1D7A8}\u{1D7AA}-\u{1D7C2}\u{1D7C4}-\u{1D7CB}\u{1D7CE}-\u{1D7FF}\u{1E100}-\u{1E12C}\u{1E137}-\u{1E13D}\u{1E140}-\u{1E149}\u{1E14E}\u{1E2C0}-\u{1E2EB}\u{1E2F0}-\u{1E2F9}\u{1E800}-\u{1E8C4}\u{1E8C7}-\u{1E8CF}\u{1E900}-\u{1E943}\u{1E94B}\u{1E950}-\u{1E959}\u{1EC71}-\u{1ECAB}\u{1ECAD}-\u{1ECAF}\u{1ECB1}-\u{1ECB4}\u{1ED01}-\u{1ED2D}\u{1ED2F}-\u{1ED3D}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}\u{1F100}-\u{1F10C}\u{1FBF0}-\u{1FBF9}\u{20000}-\u{2A6DD}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2F800}-\u{2FA1D}\u{30000}-\u{3134A}]+)/u,B=x()({strict:!1}),j=e=>Object.entries(e).reduce((e,[t,n])=>{const u=Number.parseInt(t,10);return{...e,...n.reduce((e,{start:t})=>({...e,[t]:u}),{})}},{}),w=(e,t,n)=>{if(!t)return null;if(n){const n=D.a.twitch.byName(e,t);if(n)return n}const u=D.a.bttv.byName(e,t)||D.a.ffz.byName(e,t);if(u)return u;const a=Object(A.parse)(e,{assetType:"png"});if(a&&1===a.length&&a[0].text.length===e.length){const t=(r=e,f.a(h.a(p.a("char",r)),E.a,v.a)(C.lib));if(t){const[{url:e}]=a;return F.c(t,e)}}var r;const o=e.match(O);if(o){const[t,n]=o;return[F.f(t,n.toLowerCase()),e.length-t.length]}const s=e.match(B);return s&&s[0].length===e.length?F.e(e):null};var k=(e,t,n,u=!1)=>{const a=[];let r=0,o=0;do{const s=e.indexOf(" ",r+1),i=0===r?r:r+1,c=-1===s?e.length:s,l=e.substring(i,c);if(l){let r=null;if(!u&&n&&Object.keys(n).length>0){const e=j(n)[i];e&&(r=F.g({id:e,code:l}))}if(r||(r=w(l,t,u)),r){if(o!==i){const t=e.substring(o,i);a.push(t)}if(Array.isArray(r)){const[e,t]=r;a.push(e),o=c-t}else a.push(r),o=c}}if(-1===s&&o!==c){const t=e.substring(o,c);a.push(t)}r=s}while(-1!==r);return a};var S=(e,t,n)=>!!e&&e!==t&&RegExp(e,"gi").test(n),R=n(104),I=n(210),_=n.n(I);const T=new c.Howl({src:[_.a]}),z=(e,t)=>{const n=Object(m.b)(t),u=Object(m.a)(t),a=Object(l.b)(t),r=Object(d.a)(t),o=Object(g.d)(t);return e.reduce((e,t)=>{const c=i.parse(t),{command:l,prefix:d}=c;return"PRIVMSG"===l&&d&&!r.includes(d.name)&&e.push((({tags:e,params:[t,n],prefix:u},a,r,o,i)=>{const c=s.b(n),l=c?s.c(n):n,d=s.d(e),m=u?u.name:"",b=S(i,m,l);return{type:"message",id:d.id,message:l,channel:t.slice(1),entities:k(l,a,d.emotes),user:{id:d.userId,login:m,displayName:d.displayName,color:d.color,badges:F.a(d.badges,r,o)},timestamp:d.tmiSentTs,isAction:c,isHistory:!0,isDeleted:!1,isMention:b}})(c,a,n,u,o)),e},[])};var P=function({items:e,limit:t,addedItemsCount:n=1,isEven:u=!1}){const a=e.length-t,r=a>0;return[r?e.slice(a):e,r&&n%2?!u:u]};const $=Object(u.b)("chat/fetchChatHistory",e=>a.e(e)),N=Object(u.c)({name:"messages",initialState:{},reducers:{clearChat:(e,{payload:t})=>{const{channel:n,tags:{targetUserId:u}}=t;for(const a of e[n].items)"message"!==a.type||a.user.id!==u||a.isHistory||(a.isDeleted=!0)},recieveMessagesAction:(e,{payload:t})=>{const{messages:n,channel:u,type:a="message"}=t;if(0===n.length)return;const o="message"===a?[...e[u].items,...n]:[...n,...e[u].items],[s,i]=P({items:o,limit:r.b,addedItemsCount:n.length,isEven:e[u].isEven});e[u].isEven=i,e[u].items=s;const{users:c}=e[u];n.forEach(e=>{"message"!==e.type||c.includes(e.user.displayName)||c.push(e.user.displayName)});const[l]=P({items:c,limit:r.j});e[u].users=l,"history"===a&&(e[u].history.items=[],e[u].history.isAdded=!0)}},extraReducers:e=>{e.addCase($.pending,(e,{meta:{arg:t}})=>{const n=t;e[n]?(e[n].history.status="loading",e[n].history.error={}):e[n]={history:{status:"loading",error:{},items:[],isAdded:!1},isEven:!1,items:[],users:[]}}),e.addCase($.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const u=n;e[u].history.status="success",e[u].history.items=t.messages}),e.addCase($.rejected,(e,{error:t,meta:{arg:n}})=>{const u=n;e[u].history.status="error",e[u].history.error=t})}}),{clearChat:M}=N.actions;t.c=N.reducer;const{recieveMessagesAction:U}=N.actions,L=(e,t)=>"message"===e.type?(({message:e,tags:t,user:n,channel:u,isAction:a},r)=>{if(Object(d.a)(r).includes(n))return null;const o=Object(b.b)(r),s=Object(g.d)(r),i=S(s,n,e);i&&o&&T.play();const c=Object(m.b)(r),f=Object(m.a)(r),h=Object(l.b)(r);return{type:"message",id:t.id,message:e,channel:u,entities:k(e,h,t.emotes),user:{id:t.userId,login:n,displayName:t.displayName,color:t.color,badges:F.a(t.badges,c,f)},timestamp:t.tmiSentTs,isAction:a,isHistory:!1,isDeleted:!1,isMention:i}})(e.message,t):"notice"===e.type?(({message:e,channel:t,tags:{msgId:n}})=>({type:"notice",id:Object(u.d)(),message:e,channel:t,noticeType:n}))(e.message):"user-notice"===e.type?(({message:e,channel:t,tags:{id:n,msgId:u,login:a,systemMsg:r}})=>({type:"user-notice",id:n,message:e,channel:t,noticeType:u,systemMessage:r,user:{login:a}}))(e.message):"own-message"===e.type?(({message:e,channel:t,tags:n},a)=>{const r=Object(m.b)(a),o=Object(m.a)(a),s=Object(l.b)(a),i=Object(g.d)(a),c=Object(g.c)(a),d=e.startsWith("/me "),b=d?e.slice(4):e,f=k(b,s,null,!0);return Object(R.b)(f),{type:"message",id:Object(u.d)(),message:b,channel:t,entities:f,user:{id:c,login:i,displayName:n.displayName,color:n.color,badges:F.a(n.badges,r,o)},timestamp:Date.now(),isAction:d,isHistory:!1,isDeleted:!1,isMention:!1}})(e.message,t):Object(o.a)(e),G=e=>(t,n)=>{const u=n(),a=L(e,u);if(!a)return;const r={messages:[a],channel:a.channel};t(U(r))},H=e=>(t,n)=>{const u=n(),[a]=P({items:u.messages[e].history.items,limit:r.b}),o=z(a,u);t(U({messages:o,channel:e,type:"history"}))}},41:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return s})),n.d(t,"c",(function(){return i}));var u=n(7);const a={client_id:u.m,redirect_uri:u.n,response_type:"token+id_token",scope:["openid","channel:moderate","chat:edit","chat:read","whispers:read","whispers:edit","user_blocks_read","user_blocks_edit","user_subscriptions"].join("+"),claims:JSON.stringify({id_token:{email_verified:null,picture:null,preferred_username:null}})},r=()=>{const e=Object.entries(a).map(([e,t])=>`${e}=${t}`).join("&");return`${u.l}?${e}`},o=e=>e.startsWith("#access_token="),s=e=>{localStorage.setItem(u.h,JSON.stringify(e))},i=()=>{let e;try{e=JSON.parse(localStorage.getItem(u.h))}catch(t){e=null}return e&&e.id&&e.login?e:null}},44:function(e,t,n){"use strict";n.d(t,"e",(function(){return u})),n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return r})),n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return s}));const u=e=>[{title:"My preferences",items:[{type:"switch",id:"show-timestamps",name:"showTimestamps",title:"Show Timestamps",description:"",value:e.options.showTimestamps},{type:"switch",id:"split-chat",name:"splitChat",title:"Split Chat",description:"",value:e.options.splitChat},{type:"switch",id:"fixed-width",name:"fixedWidth",title:"Fixed Width",description:"",value:e.options.fixedWidth},{type:"switch",id:"highlight-notifications",name:"highlightNotifications",title:"Highlight Notifications",description:"Plays a sound for messages directed at you",value:e.options.highlightNotifications}]}],a=e=>e.options.showTimestamps,r=e=>e.options.splitChat,o=e=>e.options.fixedWidth,s=e=>e.options.highlightNotifications},52:function(e,t,n){"use strict";n.d(t,"f",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return i})),n.d(t,"e",(function(){return c})),n.d(t,"d",(function(){return l}));var u=n(8),a=n(24),r=n(37);const o=Object(u.b)("chat/fetchTwitchEmotes",e=>a.i(e)),s=Object(u.b)("chat/fetchBttvGlobalEmotes",()=>a.c()),i=Object(u.b)("chat/fetchBttvChannelEmotes",({channelId:e})=>a.b(e)),c=Object(u.b)("chat/fetchFfzGlobalEmotes",()=>a.g()),l=Object(u.b)("chat/fetchFfzChannelEmotes",({channelId:e})=>a.f(e)),d=Object(u.c)({name:"emotes",initialState:{twitch:{status:"idle",error:{},items:{}},bttv:{global:{status:"idle",error:{},items:[]},byChannels:{}},ffz:{global:{status:"idle",error:{},items:[]},byChannels:{}}},reducers:{},extraReducers:e=>{e.addCase(o.pending,e=>{e.twitch.status="loading",e.twitch.error={}}),e.addCase(o.fulfilled,(e,{payload:t})=>{e.twitch.status="success",e.twitch.items=Object(r.g)(t)}),e.addCase(o.rejected,(e,{error:t})=>{e.twitch.status="error",e.twitch.error=t}),e.addCase(s.pending,e=>{e.bttv.global.status="loading",e.bttv.global.error={}}),e.addCase(s.fulfilled,(e,{payload:t})=>{e.bttv.global.status="success",e.bttv.global.items=Object(r.d)(t)}),e.addCase(s.rejected,(e,{error:t})=>{e.bttv.global.status="error",e.bttv.global.error=t}),e.addCase(i.pending,(e,{meta:{arg:t}})=>{const{channel:n}=t;e.bttv.byChannels[n]?(e.bttv.byChannels[n].status="loading",e.bttv.byChannels[n].error={}):e.bttv.byChannels[n]={status:"loading",error:{},items:[]}}),e.addCase(i.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const{channel:u}=n;e.bttv.byChannels[u].status="success",e.bttv.byChannels[u].items=Object(r.c)(t)}),e.addCase(i.rejected,(e,{error:t,meta:{arg:n}})=>{const{channel:u}=n;e.bttv.byChannels[u].status="error",e.bttv.byChannels[u].error=t}),e.addCase(c.pending,e=>{e.ffz.global.status="loading",e.ffz.global.error={}}),e.addCase(c.fulfilled,(e,{payload:t})=>{e.ffz.global.status="success",e.ffz.global.items=Object(r.f)(t)}),e.addCase(c.rejected,(e,{error:t})=>{e.ffz.global.status="error",e.ffz.global.error=t}),e.addCase(l.pending,(e,{meta:{arg:t}})=>{const{channel:n}=t;e.ffz.byChannels[n]?(e.ffz.byChannels[n].status="loading",e.ffz.byChannels[n].error={}):e.ffz.byChannels[n]={status:"loading",error:{},items:[]}}),e.addCase(l.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const{channel:u}=n;e.ffz.byChannels[u].status="success",e.ffz.byChannels[u].items=Object(r.e)(t)}),e.addCase(l.rejected,(e,{error:t,meta:{arg:n}})=>{const{channel:u}=n;e.ffz.byChannels[u].status="error",e.ffz.byChannels[u].error=t})}});t.a=d.reducer},7:function(e,t,n){"use strict";n.d(t,"l",(function(){return u})),n.d(t,"m",(function(){return a})),n.d(t,"n",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"j",(function(){return s})),n.d(t,"a",(function(){return i})),n.d(t,"c",(function(){return c})),n.d(t,"e",(function(){return l})),n.d(t,"f",(function(){return d})),n.d(t,"h",(function(){return m})),n.d(t,"d",(function(){return b})),n.d(t,"g",(function(){return g})),n.d(t,"k",(function(){return f})),n.d(t,"i",(function(){return h}));const u="https://id.twitch.tv/oauth2/authorize",a="4e66w1po1tzf645r9vutn9qus05vg9x",r="https://honeykingdom.github.io/chat/",o=500,s=500,i=1e4,c="accessToken",l="idToken",d="lastChannel",m="user",b="emotesUsageStatistic",g="options",f={users:{name:"users",limit:5,regex:/^@([\w\d_]*)$/},emotes:{name:"emotes",limit:10,regex:/^:([\w\d_]{2,})$/}},h=["msg_banned","msg_bad_characters","msg_channel_blocked","msg_channel_suspended","msg_duplicate","msg_emoteonly","msg_facebook","msg_followersonly","msg_followersonly_followed","msg_followersonly_zero","msg_r9k","msg_ratelimit","msg_rejected","msg_rejected_mandatory","msg_room_not_found","msg_slowmode","msg_subsonly","msg_suspended","msg_timedout","msg_verified_email"]},71:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return F})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return d})),n.d(t,"d",(function(){return A}));var u=n(99),a=n.n(u),r=n(43),o=n(73);function s(e,t){for(var n=0;n<t.length;n++){var u=t[n];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(e,u.key,u)}}function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var u in n)Object.prototype.hasOwnProperty.call(n,u)&&(e[u]=n[u])}return e}).apply(this,arguments)}var c,l=function(e){return e.startsWith("\x01ACTION ")&&e.endsWith("\x01")},d=function(e){return e.slice(8,-1)},m=function(e){return e.middle[0].slice(1)},b=!("undefined"===typeof e||!e.versions||!e.versions.node),g=["mod","emote-only","r9k","rituals","subs-only","msg-param-should-share-streak"],f=["tmi-sent-ts","bits","ban-duration","msg-param-cumulative-months","msg-param-months","msg-param-promo-gift-total","msg-param-streak-months","msg-param-viewerCount","msg-param-threshold"],h={"badge-info":"badgeInfo","display-name":"displayName","emote-sets":"emoteSets","room-id":"roomId","tmi-sent-ts":"tmiSentTs","user-id":"userId","target-msg-id":"targetMsgId","target-user-id":"targetUserId","msg-id":"msgId","system-msg":"systemMsg","emote-only":"emoteOnly","followers-only":"followersOnly","subs-only":"subsOnly","ban-duration":"banDuration","message-id":"messageId","thread-id":"threadId","msg-param-cumulative-months":"msgParamCumulativeMonths","msg-param-displayName":"msgParamDisplayName","msg-param-login":"msgParamLogin","msg-param-months":"msgParamMonths","msg-param-promo-gift-total":"msgParamPromoGiftTotal","msg-param-promo-name":"msgParamPromoName","msg-param-recipient-display-name":"msgParamRecipientDisplayName","msg-param-recipient-id":"msgParamRecipientId","msg-param-recipient-user-name":"msgParamRecipientUserName","msg-param-sender-login":"msgParamSenderLogin","msg-param-sender-name":"msgParamSenderName","msg-param-should-share-streak":"msgParamShouldShareStreak","msg-param-streak-months":"msgParamStreakMonths","msg-param-sub-plan":"msgParamSubPlan","msg-param-sub-plan-name":"msgParamSubPlanName","msg-param-viewerCount":"msgParamViewerCount","msg-param-ritual-name":"msgParamRitualName","msg-param-threshold":"msgParamThreshold"},p=["subscriber","turbo","user-type"],E=function(e){return void 0===e&&(e=""),e?e.split(",").reduce((function(e,t){var n,u=t.split("/"),a=u[0],r=u[1];return i(i({},e),{},((n={})[a]=r,n))}),{}):{}},v=function(e,t){if("emotes"===e)return void 0===(n=t)&&(n=""),n?n.split("/").reduce((function(e,t){var n,u=t.split(":"),a=u[0],r=u[1];return i(i({},e),{},((n={})[a]=r.split(",").map((function(e){var t=e.split("-"),n=t[0],u=t[1];return{start:Number.parseInt(n,10),end:Number.parseInt(u,10)}})),n))}),{}):{};var n;if("badges"===e)return E(t);if("badge-info"===e)return E(t);if("followers-only"===e){var u=!1;return"-1"===t?u=!1:"0"===t?u=!0:"string"===typeof t&&(u=parseInt(t,10)),u}if("slow"===e){var a=!1;return"0"===t?a=!1:"string"===typeof t&&(a=parseInt(t,10)),a}return g.includes(e)?"1"===t:f.includes(e)?parseInt(t,10):"string"===typeof t?t.replace("\\s"," "):t},A=function(e){return e?Object.entries(e).reduce((function(e,t){var n,u=t[0],a=t[1];if(p.includes(u))return e;var r=h[u]||u;return i(i({},e),{},((n={})[r]=v(u,a),n))}),{}):{}},C=function(e){var t=e.raw,n=e.tags;return{raw:t,channel:m(e),get tags(){return A(n)}}},y=function(e){var t=e.raw,n=e.trailing,u=e.tags;return{raw:t,message:n,channel:m(e),get tags(){return A(u)}}};!function(e){e.REPLY001="001",e.PING="PING",e.PONG="PONG",e.JOIN="JOIN",e.PART="PART",e.PRIVMSG="PRIVMSG",e.NOTICE="NOTICE",e.USERNOTICE="USERNOTICE",e.GLOBALUSERSTATE="GLOBALUSERSTATE",e.USERSTATE="USERSTATE",e.ROOMSTATE="ROOMSTATE",e.CLEARCHAT="CLEARCHAT",e.CLEARMSG="CLEARMSG",e.HOSTTARGET="HOSTTARGET",e.WHISPER="WHISPER"}(c||(c={}));var x,F=function(e){var t,n;function r(t){var n;return void 0===t&&(t={}),(n=e.call(this)||this).socket=null,n.globalUserState=null,n.channels={},n._connected=!1,n._connecting=!1,n._registered=!1,n.options=i({secure:!0},t),n}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var g,f,h,p=r.prototype;return p.connect=function(){try{var e=this,t=b?e._connectInNode():e._connectInBrowser();return Promise.resolve(t).then((function(){return e._register()}))}catch(n){return Promise.reject(n)}},p.disconnect=function(){this._connected&&(b?this.socket.destroy():this.socket.close(),this.socket=null,this._connected=!1,this._connecting=!1,this._registered=!1,this.emit("disconnect"))},p.receiveRaw=function(e){var t=this;e.trim().split("\r\n").forEach((function(e){return t._handleMessage(e)}))},p.sendRaw=function(e){return!(null===this.socket||!e)&&(b?this.socket.write(e):this.socket.send(e),!0)},p.say=function(e,t){var n=Object(o.format)({command:c.PRIVMSG,middle:["#"+e],trailing:t});return this.sendRaw(n)},p.sendCommand=function(e,t,n){void 0===n&&(n="");var u=Array.isArray(n)?n.join(" "):n,a=Object(o.format)({command:c.PRIVMSG,middle:["#"+e],trailing:"/"+t+" "+u});return this.sendRaw(a)},p.join=function(e){if(!this._registered)return!1;var t=Object(o.format)({command:c.JOIN,middle:["#"+e]});return this.sendRaw(t)},p.part=function(e){if(!this._registered)return!1;var t=Object(o.format)({command:c.PART,middle:["#"+e]});return this.sendRaw(t)},p._handleMessage=function(e){var t=Object(o.parse)(e);t.raw=e;var n=t.command;if(n===c.PING)return this.sendRaw(c.PONG+" :tmi.twitch.tv"),void this.emit("ping",{raw:e});if(n===c.REPLY001)return this.options.name=t.middle[0],this._registered=!0,void this.emit("register");if(n!==c.PRIVMSG){if(n===c.USERSTATE){var u=m(t),a=C(t);return this._updateUserState(u,a.tags),void this.emit("userstate",a)}if(n!==c.JOIN)if(n!==c.PART){if(n===c.ROOMSTATE){var r=m(t),s=C(t);return this._updateRoomState(r,s.tags),void this.emit("roomstate",s)}if(n!==c.NOTICE)if(n!==c.USERNOTICE)if(n!==c.CLEARCHAT)if(n!==c.CLEARMSG)if(n!==c.HOSTTARGET)if(n!==c.WHISPER){if(n===c.GLOBALUSERSTATE){var i=function(e){var t=e.raw,n=e.tags;return{raw:t,get tags(){return A(n)}}}(t);return this._updateGlobalUserState(i.tags),void this.emit("globaluserstate",i)}}else{var b=function(e){var t=e.raw,n=e.trailing,u=e.tags,a=e.prefix;return{raw:t,message:n,channel:e.middle[0],user:a.name,get tags(){return A(u)}}}(t);this.emit("whisper",b)}else{var g=y(t);this.emit("hosttarget",g)}else{var f=y(t);this.emit("clearmessage",f)}else{var h=y(t);this.emit("clearchat",h)}else{var p=y(t);this.emit("usernotice",p)}else{var E=y(t);this.emit("notice",E)}}else{var v={channel:m(t)};this.emit("part",v)}else{var x={channel:m(t)};this.emit("join",x)}}else{var F=function(e){var t=e.raw,n=e.trailing,u=e.tags,a=e.prefix.name,r=l(n);return{raw:t,message:r?d(n):n,channel:m(e),user:a,get tags(){return A(u)},isAction:r}}(t);this.emit("message",F)}},p._connectInNode=function(){var e=this,t="irc.chat.twitch.tv",n=this.options.secure?6697:6667;return new Promise((function(r,o){e._connecting=!0;var s=function(){e._connecting=!1,e._connected=!0,e.emit("connect"),r()};e.options.secure?e.socket=a.a.connect(n,t,{},s):(e.socket=new u.Socket,e.socket.connect(n,t,s)),e.socket.on("error",(function(t){e._connected=!1,e._connecting=!1,e.emit("disconnect",t),o(t)})),e.socket.on("data",(function(t){e.receiveRaw(t.toString())})),e.socket.on("close",(function(){e._connected=!1,e._connecting=!1,e._registered=!1,e.emit("disconnect")}))}))},p._connectInBrowser=function(){var e=this,t=this.options.secure?"wss://irc-ws.chat.twitch.tv:443":"ws://irc-ws.chat.twitch.tv:80";return new Promise((function(n,u){e._connecting=!0,e.socket=new WebSocket(t),e.socket.onopen=function(){e._connected=!0,e._connecting=!1,e.emit("connect"),n()},e.socket.onmessage=function(t){var n=t.data;return e.receiveRaw(n)},e.socket.onerror=function(){},e.socket.onclose=function(t){var n=t.wasClean,a=t.code,r=t.reason;if(e.socket=null,e._connected=!1,e._connecting=!1,e._registered=!1,n)e.emit("disconnect");else{var o=new Error("["+a+"] "+r);e.emit("disconnect",o),u(o)}}}))},p._register=function(){var e=this;if(!this._connected)return Promise.reject();if(this._registered)return Promise.resolve();var t=this.options,n=t.name,u=t.auth,a=n||"justinfan"+Math.floor(1e5*Math.random()).toString().padStart(5,"0"),r=u?"oauth:"+u:"SCHMOOPIIE";return this.sendRaw("CAP REQ :twitch.tv/tags twitch.tv/commands"),this.sendRaw("PASS "+r),this.sendRaw("NICK "+a),new Promise((function(t,n){var u=function n(){t(),e.off("register",n)};e.on("register",u),setTimeout((function(){n(),e.off("register",u)}),1e4)}))},p._updateGlobalUserState=function(e){this.globalUserState=i(i({},this.globalUserState),e)},p._updateUserState=function(e,t){var n;this.channels=i(i({},this.channels),{},((n={})[e]=i(i({},this.channels[e]),{},{userState:t}),n))},p._updateRoomState=function(e,t){var n;this.channels=i(i({},this.channels),{},((n={})[e]=i(i({},this.channels[e]),{},{roomState:t}),n))},g=r,(f=[{key:"connected",get:function(){return this._connected}},{key:"connecting",get:function(){return this._connecting}},{key:"registered",get:function(){return this._registered}}])&&s(g.prototype,f),h&&s(g,h),r}(r.EventEmitter);!function(e){e.sub="sub",e.resub="resub",e.subgift="subgift",e.anonsubgift="anonsubgift",e.submysterygift="submysterygift",e.giftpaidupgrade="giftpaidupgrade",e.rewardgift="rewardgift",e.anongiftpaidupgrade="anongiftpaidupgrade",e.raid="raid",e.unraid="unraid",e.ritual="ritual",e.bitsbadgetier="bitsbadgetier"}(x||(x={}))}).call(this,n(14))},83:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return a}));const u=e=>"idle"!==e.blockedUsers.status&&"loading"!==e.blockedUsers.status,a=e=>e.blockedUsers.items},84:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return s}));var u=n(8),a=n(24),r=n(37);const o=Object(u.b)("chat/fetchGlobalBadges",()=>a.h()),s=Object(u.b)("chat/fetchChannelBadges",({channelId:e})=>a.d(e)),i=Object(u.c)({name:"badges",initialState:{global:{status:"idle",error:{},items:{}},byChannels:{}},reducers:{},extraReducers:e=>{e.addCase(o.pending,e=>{e.global.status="loading",e.global.error={}}),e.addCase(o.fulfilled,(e,{payload:t})=>{e.global.status="success",e.global.items=Object(r.a)(t)}),e.addCase(o.rejected,(e,{error:t})=>{e.global.status="error",e.global.error=t}),e.addCase(s.pending,(e,{meta:{arg:t}})=>{const{channel:n}=t;e.byChannels[n]?(e.byChannels[n].status="loading",e.byChannels[n].error={}):e.byChannels[n]={status:"loading",error:{},items:{}}}),e.addCase(s.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const{channel:u}=n;e.byChannels[u].status="success",e.byChannels[u].items=Object(r.a)(t)}),e.addCase(s.rejected,(e,{error:t,meta:{arg:n}})=>{const{channel:u}=n;e.byChannels[u].status="error",e.byChannels[u].error=t})}});t.a=i.reducer},87:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var u=n(8),a=n(7);const r=()=>{try{const e=localStorage.getItem(a.g);return JSON.parse(e)||{}}catch{return{}}},o={showTimestamps:!1,splitChat:!0,blacklistKeywords:"",highlightKeywords:"",fixedWidth:!1,highlightNotifications:!0,...r()},s=Object(u.c)({name:"options",initialState:o,reducers:{changeOption:{reducer:(e,{payload:t})=>{const{name:n,value:u}=t;e[n]=u},prepare:e=>{const{name:t,value:n}=e;var u;return u={[t]:n},localStorage.setItem(a.g,JSON.stringify({...r(),...u})),{payload:e}}}}}),{changeOption:i}=s.actions;t.b=s.reducer},98:function(e,t,n){"use strict";t.a=e=>e}},[[221,1,2]]]);
//# sourceMappingURL=main.de2f8b7d.chunk.js.map