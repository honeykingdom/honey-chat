(this["webpackJsonphoney-chat"]=this["webpackJsonphoney-chat"]||[]).push([[0],{104:function(e,t,n){"use strict";var a=n(27);t.a=(e,t,n=-1)=>{if(!t)return[];const r={begins:[],contains:[]},u=e.toLowerCase();a.a.bttv.byText(r,t.bttvChannel,u,n)||a.a.ffz.byText(r,t.ffzChannel,u,n)||a.a.twitch.byText(r,t.twitchUser,u,n)||a.a.twitch.byText(r,t.twitchGlobal,u,n)||a.a.bttv.byText(r,t.bttvGlobal,u,n)||a.a.ffz.byText(r,t.ffzGlobal,u,n);return[...r.begins,...r.contains]}},105:function(e,t,n){"use strict";n.d(t,"b",(function(){return C})),n.d(t,"a",(function(){return x}));var a=n(58),r=n(140),u=n(364),s=n(53),o=n(222),i=n(77),c=n(368),l=n(369),d=n(112),m=n(142),b=n(365),g=n(220),f=n(4),h=n(27);const p=()=>{try{const e=localStorage.getItem(f.e);return JSON.parse(e)||{}}catch(e){return{}}},E=a.a(r.a(e=>u.a(s.a("type",e),["twitch-emote","bttv-emote","ffz-emote"])),o.a(s.a("type")),i.a(a.a(o.a(s.a("id")),i.a(e=>({type:e[0].type,id:e[0].id,lastUpdatedAt:Date.now(),uses:e.length}))))),v=(e,t,n)=>"uses"===e?t+n:n,C=e=>{const t=E(e);if(c.a(t))return;const n=p(),a=l.a(v,n,t);localStorage.setItem(f.e,JSON.stringify(a))},A=a.a(d.a,i.a(d.a),m.a,b.a([g.a(s.a("uses")),g.a(s.a("lastUpdatedAt"))])),x=(e,t=27)=>{if(!e)return[];const n=[],r=a.a(p,A)();for(const a of r){if(n.length===t)return n;let r=null;"twitch-emote"===a.type&&(r=h.a.twitch.byId(a.id,e)),"bttv-emote"===a.type&&(r=h.a.bttv.byId(a.id,e)),"ffz-emote"===a.type&&(r=h.a.ffz.byId(a.id,e)),r&&n.push(r)}return n}},108:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(67);const r=e=>t=>e?"twitch-clip"===e.type?t.messageCards.twitchClips[e.id]:"twitch-video"===e.type?t.messageCards.twitchVideos[e.id]:"youtube-video"===e.type?t.messageCards.youtubeVideos[e.id]:Object(a.a)(e.type):null},109:function(e,t,n){"use strict";n.d(t,"b",(function(){return s}));var a=n(8),r=n(18),u=n(25);const s=Object(a.b)("chat/fetchBlockedUsers",e=>r.a(e)),o=Object(a.c)({name:"blockedUsers",initialState:{status:"idle",error:{},items:[]},reducers:{},extraReducers:e=>{e.addCase(s.pending,e=>{e.status="loading",e.error={}}),e.addCase(s.fulfilled,(e,{payload:t})=>{e.status="success",e.items=Object(u.b)(t)}),e.addCase(s.rejected,(e,{error:t})=>{e.status="error",e.error=t})}});t.a=o.reducer},12:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return u})),n.d(t,"e",(function(){return s})),n.d(t,"f",(function(){return o})),n.d(t,"d",(function(){return i}));const a=e=>e.chat.currentChannel,r=e=>e.chat.isConnected,u=e=>{var t,n;return(null===(t=e.chat.params.byChannels[a(e)])||void 0===t||null===(n=t.room)||void 0===n?void 0:n.roomId)||""},s=e=>{var t,n;return(null===(t=e.chat.params.byChannels[a(e)])||void 0===t||null===(n=t.user)||void 0===n?void 0:n.color)||""},o=e=>{var t,n;return(null===(t=e.chat.params.byChannels[a(e)])||void 0===t||null===(n=t.user)||void 0===n?void 0:n.displayName)||""},i=e=>{var t,n;return(null===(t=e.chat.params.byChannels[a(e)])||void 0===t||null===(n=t.user)||void 0===n?void 0:n.badges)||{}}},13:function(e,t,n){"use strict";n.d(t,"g",(function(){return b})),n.d(t,"b",(function(){return g})),n.d(t,"d",(function(){return f})),n.d(t,"c",(function(){return h})),n.d(t,"f",(function(){return p})),n.d(t,"e",(function(){return E})),n.d(t,"a",(function(){return v}));var a=n(58),r=n(370),u=n(77),s=n(375),o=n(140);const i=/^(?:(?:[a-z]+:)?\/\/)/;var c=e=>i.test(e)?e:"//"+e,l=n(4);const d={"[oO](_|\\.)[oO]":"O_o","\\&gt\\;\\(":">(","\\&lt\\;3":"<3","\\:-?(o|O)":":O","\\:-?(p|P)":":P","\\:-?[\\\\/]":":/","\\:-?[z|Z|\\|]":":Z","\\:-?\\(":":(","\\:-?\\)":":)","\\:-?D":":D","\\;-?(p|P)":";P","\\;-?\\)":";)","R-?\\)":"R)","B-?\\)":"B)"},m=a.a(r.a,u.a(([e,t])=>`${t} ${e}x`),s.a(", ")),b=({id:e,code:t})=>({type:"twitch-emote",id:e,alt:d[t]||t,src:`${l.p}/${e}/1.0`,srcSet:`${l.p}/${e}/1.0 1x, ${l.p}/${e}/2.0 2x, ${l.p}/${e}/3.0 4x`}),g=({id:e,code:t})=>({type:"bttv-emote",id:e,alt:t,src:`${l.b}/${e}/1x`,srcSet:`${l.b}/${e}/2x 2x, ${l.b}/${e}/3x 4x`}),f=({id:e,name:t,urls:n})=>({type:"ffz-emote",id:e,alt:t,src:n[1],srcSet:m(n)}),h=(e,t)=>({type:"emoji",alt:`:${e}:`,src:t}),p=(e,t)=>({type:"mention",text:e,target:t}),E=e=>({type:"link",text:e,href:c(e)}),v=(e,t,n)=>a.a(r.a,u.a(([e,a])=>{var r,u;const s=(null===(r=n[e])||void 0===r?void 0:r.versions[a])||(null===(u=t[e])||void 0===u?void 0:u.versions[a]);return!!s&&(({title:e,description:t,image_url_1x:n,image_url_2x:a,image_url_4x:r})=>({alt:e,label:t,src:n,srcSet:`${n} 1x, ${a} 2x, ${r} 4x`}))(s)}),o.a(Boolean))(e)},16:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r})),n.d(t,"d",(function(){return u})),n.d(t,"c",(function(){return s}));const a=e=>"idle"!==e.auth.status&&"loading"!==e.auth.status,r=e=>"success"===e.auth.status,u=e=>e.auth.userLogin,s=e=>e.auth.userId},18:function(e,t,n){"use strict";n.d(t,"l",(function(){return o})),n.d(t,"j",(function(){return i})),n.d(t,"h",(function(){return c})),n.d(t,"d",(function(){return l})),n.d(t,"a",(function(){return d})),n.d(t,"i",(function(){return m})),n.d(t,"k",(function(){return b})),n.d(t,"c",(function(){return g})),n.d(t,"b",(function(){return f})),n.d(t,"g",(function(){return h})),n.d(t,"f",(function(){return p})),n.d(t,"e",(function(){return E})),n.d(t,"m",(function(){return v}));var a=n(4);var r=async(e,{timeout:t,...n}={})=>{let r={...n};const u=t||a.a;if(u){const e=new AbortController;r={...r,signal:e.signal},setTimeout(()=>e.abort(),u)}const s=await fetch(e,r);if(!s.ok)throw Error(s.statusText);return await s.json()};const u=(e,t)=>r("https://api.twitch.tv/helix"+e,{...t,headers:{"Client-ID":"4e66w1po1tzf645r9vutn9qus05vg9x",Authorization:"Bearer "+localStorage.getItem(a.d)}}),s=(e,t)=>r("https://api.twitch.tv/kraken"+e,{...t,headers:{Accept:"application/vnd.twitchtv.v5+json","Client-ID":"4e66w1po1tzf645r9vutn9qus05vg9x",Authorization:"OAuth "+localStorage.getItem(a.d)}}),o=e=>u("/users?id="+e),i=e=>s(`/users/${e}/emotes`),c=(e="en")=>r("https://badges.twitch.tv/v1/badges/global/display?language="+e),l=(e,t="en")=>r(`https://badges.twitch.tv/v1/badges/channels/${e}/display?language=${t}`),d=e=>s(`/users/${e}/blocks`),m=e=>u("/clips?id="+e),b=e=>u("/videos?id="+e),g=()=>r("https://api.betterttv.net/3/cached/emotes/global"),f=e=>r("https://api.betterttv.net/3/cached/users/twitch/"+e),h=()=>r("https://api.frankerfacez.com/v1/set/global"),p=e=>r("https://api.frankerfacez.com/v1/room/id/"+e),E=e=>r(`https://recent-messages.robotty.de/api/v2/recent-messages/${e}?clearchatToNotice=true`),v=e=>r(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${e}&key=AIzaSyC26wH3X7dMrr9g6fID4J3o7YhbnYagHW0`)},212:function(e,t,n){e.exports=n.p+"static/media/ts-tink.4251bf04.ogg"},225:function(e,t,n){e.exports=n(363)},24:function(e,t,n){"use strict";n.d(t,"h",(function(){return E})),n.d(t,"d",(function(){return v})),n.d(t,"c",(function(){return C})),n.d(t,"g",(function(){return A})),n.d(t,"f",(function(){return x})),n.d(t,"e",(function(){return y})),n.d(t,"b",(function(){return F})),n.d(t,"a",(function(){return j}));var a=n(367),r=n(371),u=n(32),s=n(12),o=n(58),i=n(112),c=n(77),l=n(366),d=n(88),m=n(13),b=n(104),g=n(105);const f=o.a(i.a,c.a(e=>({items:c.a(m.g,e)}))),h=Object(u.a)(e=>e,e=>{if(!e)return[];const{twitchGlobal:t,twitchUser:n,bttvGlobal:a,bttvChannel:r,ffzGlobal:u,ffzChannel:s}=e;return[{title:"BetterTTV Channel Emotes",items:r.map(m.b)},{title:"FrankerFaceZ Channel Emotes",items:s.map(m.d)},...f(n),{title:"Twitch",items:c.a(m.g,l.a([],"0",t))},{title:"BetterTTV",items:a.map(m.b)},{title:"FrankerFaceZ",items:u.map(m.d)}].filter(d.a(["items","length"]))});var p=(e,t)=>{if(!e)return[];if(t){const n=Object(b.a)(t,e);return[{title:`${n.length?"":"No "}Search Results for "${t}"`,items:n}]}const n=h(e),a=Object(g.a)(e);if(!a.length)return n;return[{title:"Frequently Used",items:a},...n]};const E=e=>"success"===e.emotes.twitch.status||"error"===e.emotes.twitch.status,v=e=>"success"===e.emotes.bttv.global.status||"error"===e.emotes.bttv.global.status,C=e=>{var t,n;const a=Object(s.b)(e);return"success"===(null===(t=e.emotes.bttv.byChannels[a])||void 0===t?void 0:t.status)||"error"===(null===(n=e.emotes.bttv.byChannels[a])||void 0===n?void 0:n.status)||!1},A=e=>"success"===e.emotes.ffz.global.status||"error"===e.emotes.ffz.global.status,x=e=>{var t,n;const a=Object(s.b)(e);return"success"===(null===(t=e.emotes.ffz.byChannels[a])||void 0===t?void 0:t.status)||"error"===(null===(n=e.emotes.ffz.byChannels[a])||void 0===n?void 0:n.status)||!1},y=e=>E(e)&&v(e)&&C(e)&&A(e)&&x(e),w=e=>e.emotes.twitch.items,O=Object(u.a)(w,a.a(["0"])),D=Object(u.a)(w,r.a(["0"])),F=Object(u.a)(y,O,D,e=>e.emotes.bttv.global.items,e=>{var t;return(null===(t=e.emotes.bttv.byChannels[Object(s.b)(e)])||void 0===t?void 0:t.items)||[]},e=>e.emotes.ffz.global.items,e=>{var t;return(null===(t=e.emotes.ffz.byChannels[Object(s.b)(e)])||void 0===t?void 0:t.items)||[]},(e,t,n,a,r,u,s)=>e?{twitchGlobal:t,twitchUser:n,bttvGlobal:a,bttvChannel:r,ffzGlobal:u,ffzChannel:s}:null),j=(e,t)=>{const n=F(e);return p(n,t)}},246:function(e,t){},248:function(e,t){},25:function(e,t,n){"use strict";n.d(t,"h",(function(){return b})),n.d(t,"d",(function(){return g})),n.d(t,"c",(function(){return f})),n.d(t,"f",(function(){return h})),n.d(t,"e",(function(){return p})),n.d(t,"b",(function(){return E})),n.d(t,"a",(function(){return v})),n.d(t,"g",(function(){return A})),n.d(t,"i",(function(){return y})),n.d(t,"j",(function(){return w}));var a=n(53),r=n(58),u=n(367),s=n(112),o=n(77),i=n(366),c=n(142),l=n(111),d=n(88),m=n(221);const b=a.a("emoticon_sets"),g=e=>e,f=e=>[...e.channelEmotes,...e.sharedEmotes],h=({default_sets:e,sets:t})=>r.a(u.a(e),s.a,o.a(i.a([],"emoticons")),c.a)(t),p=r.a(l.a({},["sets"]),s.a,o.a(l.a([],["emoticons"])),c.a),E=r.a(a.a("blocks"),o.a(d.a(["user","name"]))),v=a.a("badge_sets"),C=/(.+-)(86x45|260x147|480x272)(.+)/,A=({data:e})=>{if(0===e.length)return null;const{id:t,url:n,thumbnail_url:a,title:r,creator_name:u}=e[0],s=C.exec(a);let o="",i="";if(s){const e=`${s[1]}86x45${s[3]}`;o=e,i=`${e} 1x, ${`${s[1]}260x147${s[3]}`} 2x`}return{id:t,url:n,src:o,srcSet:i,title:r,description:"Clipped by "+u}},x=/(.+)(%{width})x(%{height})(.+)/,y=({data:e})=>{if(0===e.length)return null;const{id:t,thumbnail_url:n,title:a,user_name:r,published_at:u}=e[0],s=Object(m.a)("PP",new Date(u)),o=x.exec(n);let i="",c="";if(o){const e=`${o[1]}80x45${o[4]}`;i=e,c=`${e} 1x, ${`${o[1]}160x90${o[4]}`} 2x, ${`${o[1]}320x180${o[4]}`} 4x`}return{id:t,src:i,srcSet:c,title:a,description:`${s} \xb7 ${r}`}},w=({items:e})=>{if(0===e.length)return null;const{id:t,snippet:{title:n,publishedAt:a,channelTitle:r,thumbnails:{default:{url:u},medium:{url:s},high:{url:o}}}}=e[0];return{id:t,src:u,srcSet:`${u} 1x, ${s} 2x, ${o} 4x`,title:n,description:`${Object(m.a)("PP",new Date(a))} \xb7 ${r}`}}},261:function(e,t){},263:function(e,t){},27:function(e,t,n){"use strict";var a=n(76),r=n(90),u=n(13);const s=(e,t)=>{for(const n of Object.values(t)){const t=a.a(r.a("id",e),n);if(t)return u.g(t)}return null},o={1:":-?\\)",2:":-?\\(",3:":-?D",4:">\\(",5:":-?[zZ|]",6:"[oO][_.][oO]",7:"B-?\\)",8:":-?[oO]",9:"<3",10:":-?[\\/]",11:";-?\\)",12:":-?[pP]",13:";-?[pP]",14:"R-?\\)"},i=(e,t)=>{for(const n of Object.values(t)){const t=a.a(({id:t,code:n})=>t<=14?RegExp(`^${o[t]}$`).test(e):e===n,n);if(t)return u.g(t)}return null},c={twitch:{byId:(e,{twitchGlobal:t,twitchUser:n})=>s(e,t)||s(e,n),byName:(e,{twitchGlobal:t,twitchUser:n})=>i(e,t)||i(e,n),byText:(e,t,n,a)=>{for(const r of Object.values(t))for(const t of r){if(e.begins.length+e.contains.length===a)return!0;const r=t.code.toLowerCase().indexOf(n);if(-1!==r){e[0===r?"begins":"contains"].push(u.g(t))}}return!1}},bttv:{byId:(e,{bttvGlobal:t,bttvChannel:n})=>{const s=a.a(r.a("id",e)),o=s(t)||s(n);return o?u.b(o):null},byName:(e,{bttvGlobal:t,bttvChannel:n})=>{const s=a.a(r.a("code",e)),o=s(t)||s(n);return o?u.b(o):null},byText:(e,t,n,a)=>{for(const r of t){if(e.begins.length+e.contains.length===a)return!0;const t=r.code.toLowerCase().indexOf(n);if(-1!==t){e[0===t?"begins":"contains"].push(u.b(r))}}return!1}},ffz:{byId:(e,{ffzGlobal:t,ffzChannel:n})=>{const s=a.a(r.a("id",e)),o=s(t)||s(n);return o?u.d(o):null},byName:(e,{ffzGlobal:t,ffzChannel:n})=>{const s=a.a(r.a("name",e)),o=s(t)||s(n);return o?u.d(o):null},byText:(e,t,n,a)=>{for(const r of t){if(e.begins.length+e.contains.length===a)return!0;const t=r.name.toLowerCase().indexOf(n);if(-1!==t){e[0===t?"begins":"contains"].push(u.d(r))}}return!1}}};t.a=c},291:function(e,t){},292:function(e,t){},297:function(e,t){},299:function(e,t){},323:function(e,t){},33:function(e,t,n){"use strict";n.d(t,"d",(function(){return u})),n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return o})),n.d(t,"f",(function(){return i})),n.d(t,"e",(function(){return c}));var a=n(8);const r=Object(a.c)({name:"chat",initialState:{isConnected:!1,currentChannel:"",params:{global:null,byChannels:{}}},reducers:{updateIsConnected:(e,{payload:t})=>{e.isConnected=t},updateCurrentChannel:(e,{payload:t})=>{e.currentChannel=t},updateGlobalUserParams:(e,{payload:t})=>{e.params.global=t.tags},updateUserParams:(e,{payload:t})=>{const{channel:n,tags:a}=t;e.params.byChannels[n]||(e.params.byChannels[n]={room:null,user:null}),e.params.byChannels[n].user=a},updateRoomParams:(e,{payload:t})=>{const{channel:n,tags:a}=t;e.params.byChannels[n]||(e.params.byChannels[n]={room:null,user:null}),e.params.byChannels[n].room=a}}}),{updateIsConnected:u,updateCurrentChannel:s,updateGlobalUserParams:o,updateUserParams:i,updateRoomParams:c}=r.actions;t.a=r.reducer},34:function(e,t,n){"use strict";n.d(t,"d",(function(){return s})),n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return c})),n.d(t,"e",(function(){return l}));var a=n(32),r=n(13),u=n(12);const s=e=>"success"===e.badges.global.status||"error"===e.badges.global.status,o=e=>{var t,n;return"success"===(null===(t=e.badges.byChannels[Object(u.b)(e)])||void 0===t?void 0:t.status)||"error"===(null===(n=e.badges.byChannels[Object(u.b)(e)])||void 0===n?void 0:n.status)},i=e=>e.badges.global.items,c=e=>{var t;return(null===(t=e.badges.byChannels[Object(u.b)(e)])||void 0===t?void 0:t.items)||{}},l=Object(a.a)(u.d,i,c,r.a)},362:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(40),s=n(17),o=n(41),i=n(3),c=n(1),l=n(16),d=n(12),m=n(44),b=n(213),g=n.n(b),f=n(37);var h=()=>{const e=Object(i.b)(),t=Object(i.c)(l.a);Object(a.useEffect)(()=>{if(t)return;const{idToken:n}=localStorage,a=Object(o.c)();if(n)if(a){const{id:t,login:n}=a,r={isAuth:!0,userId:t,userLogin:n};e(Object(f.c)(r))}else{const t=g.a.decode(n);e(t?Object(f.b)(t.sub):Object(f.c)({isAuth:!1}))}else e(Object(f.c)({isAuth:!1}))},[e,t])};const p=e=>{var t;return(null===(t=e.messages[Object(d.b)(e)])||void 0===t?void 0:t.items)||[]},E=e=>{var t;return(null===(t=e.messages[Object(d.b)(e)])||void 0===t?void 0:t.users)||[]},v=e=>{var t,n;const a=Object(d.b)(e);return"success"===(null===(t=e.messages[a])||void 0===t?void 0:t.history.status)||"error"===(null===(n=e.messages[a])||void 0===n?void 0:n.history.status)||!1},C=e=>{var t;return(null===(t=e.messages[Object(d.b)(e)])||void 0===t?void 0:t.history.isAdded)||!1},A=e=>{var t;return(null===(t=e.messages[Object(d.b)(e)])||void 0===t?void 0:t.isEven)||!1};var x=n(24),y=n(34),w=n(85),O=n(38),D=n(52),F=n(86),j=n(109);var B=()=>{const e=Object(i.b)(),t=Object(i.c)(l.a),n=Object(i.c)(l.b),r=Object(i.c)(l.c),u=Object(i.c)(d.b),s=Object(i.c)(d.a),o=Object(i.c)(x.h),c=Object(i.c)(x.d),m=Object(i.c)(x.c),b=Object(i.c)(x.g),g=Object(i.c)(x.f),f=Object(i.c)(y.d),h=Object(i.c)(y.c),p=Object(i.c)(v),E=Object(i.c)(w.b),A=Object(i.c)(C),B=t&&u&&!A&&((!n||o)&&c&&m&&b&&g)&&(!n||E)&&f&&h&&p;Object(a.useEffect)(()=>{e(Object(D.c)()),e(Object(D.e)()),e(Object(F.c)())},[e]),Object(a.useEffect)(()=>{B&&e(Object(O.a)(u))},[e,u,B]),Object(a.useEffect)(()=>{!A&&u&&e(Object(O.d)(u))},[e,u,A]),Object(a.useEffect)(()=>{t&&n&&r&&(e(Object(D.f)(r)),e(Object(j.b)(r)))},[e,t,n,r]),Object(a.useEffect)(()=>{if(u&&s){const t={channel:u,channelId:s};e(Object(D.b)(t)),e(Object(D.d)(t)),e(Object(F.b)(t))}},[e,u,s])},k=n(4),S=n(33);var $=()=>{const e=Object(s.f)(),t=Object(i.b)(),{hash:n}=e.location;Object(a.useEffect)(()=>{if(n&&n.length>1){const e=n.slice(1);return t(Object(S.b)(e)),localStorage.setItem(k.g,e),void(document.title=e?`#${e} - Honey Chat `:"Honey Chat")}const a=localStorage.getItem(k.g);a?(e.push({pathname:"/chat/",hash:a}),t(Object(S.b)(a))):t(Object(S.b)(""))},[t,e,n])},R=n(72),I=n(373),_=n(107);var T=e=>e.split(" ").map(e=>{if(":"!==e[0]||":"!==e[e.length-1])return e;const t=e.slice(1,-1),n=_.lib[t];return n&&n.char?n.char:e}).join(" ");var z=()=>{const e=Object(i.b)(),t=Object(i.c)(l.a),n=Object(i.c)(l.b),r=Object(i.c)(l.d),u=Object(i.c)(d.c),s=Object(i.c)(d.b),o=Object(I.a)(s),c=Object(a.useRef)(null),m=Object(a.useCallback)(t=>{if(!t.current)return;t.current.on("register",()=>e(Object(S.d)(!0))),t.current.on("disconnect",()=>e(Object(S.d)(!1))),t.current.on("globaluserstate",t=>e(Object(S.c)(t))),t.current.on("userstate",t=>e(Object(S.f)(t))),t.current.on("roomstate",t=>e(Object(S.e)(t))),t.current.on("message",t=>{e(Object(O.e)({type:"message",message:t}))}),t.current.on("notice",n=>{if(t.current&&"Login authentication failed"===n.message)return e(Object(f.d)()),t.current.disconnect(),void(t.current=null);e(Object(O.e)({type:"notice",message:n}))}),t.current.on("usernotice",t=>e(Object(O.e)({type:"user-notice",message:t}))),t.current.on("clearchat",t=>{t.tags.targetUserId&&e(Object(O.b)(t))})},[e]);Object(a.useEffect)(()=>()=>{c.current&&(c.current.disconnect(),c.current=null)},[c]),Object(a.useEffect)(()=>{if(s&&t)if(c.current)o&&o!==s&&(c.current.part(o),c.current.join(s));else{const e=n?{name:r,auth:localStorage.getItem(k.d)}:null;(async()=>{c.current=new R.a(e),m(c),await c.current.connect(),c.current.join(s)})()}},[e,m,n,t,u,r,s,o]);return Object(a.useMemo)(()=>({say(t,n){if(!c.current||!n.trim())return;const a=T(n.trim());function r(n){if(n.channel===t){const r={message:a,channel:t,tags:n.tags};e(Object(O.e)({type:"own-message",message:r})),s()}}function u(e){e.channel===t&&k.j.includes(e.tags.msgId)&&s()}function s(){c.current&&(c.current.off("notice",u),c.current.off("userstate",r))}c.current.say(t,a),c.current.on("notice",u),c.current.on("userstate",r),setTimeout(()=>s(),1e4)}}),[c,e])},P=n(374);var M=(e,t,n=5)=>{const a=[],r=e.toLowerCase();for(const u of t){if(a.length===n)return a;const e=u.toLowerCase();(""===r||e.startsWith(r))&&a.push(u)}return a},N=n(104);const U={type:"users",isActive:!1,items:[],activeIndex:0,start:0,end:0},L=({activeIndex:e,items:t,...n})=>({activeIndex:0===e?t.length-1:e-1,items:t,...n}),G=({activeIndex:e,items:t,...n})=>({activeIndex:e===t.length-1?0:e+1,items:t,...n}),H=(e,{type:t,items:n,activeIndex:a,start:r,end:u})=>{if(0===n.length)return e;const s=n[a],o="users"===t?"@"+s:s.alt;return`${e.substring(0,r)}${o}${e.substring(u)||" "}`};var W=(e,t,n)=>{const[r,u]=Object(P.a)(U),s=Object(i.c)(x.b),o=Object(i.c)(E),c=Object(a.useRef)(o);c.current=o;const l=Object(a.useRef)(s);l.current=s;const d=Object(a.useRef)(r);d.current=r;const m=Object(a.useCallback)(t=>{const{value:n,selectionStart:a}=t.target;e(n);const r=n.lastIndexOf(" ",a-1),s=n.indexOf(" ",a),o=-1===r?0:r+1,i=-1===s?n.length:s,m=n.substring(o,i),b=k.l.users.regex.exec(m);if(b){const[,e]=b,t=M(e,c.current,k.l.users.limit);return void u({type:"users",isActive:!0,items:t,activeIndex:0,start:o,end:i})}const g=k.l.emotes.regex.exec(m);if(g&&l.current){const[,e]=g,t=Object(N.a)(e,l.current,k.l.emotes.limit);u({type:"emotes",isActive:!0,items:t,activeIndex:0,start:o,end:i})}else d.current.isActive&&u(U)},[e,u,d]),b=Object(a.useCallback)(e=>{},[]),g=Object(a.useCallback)(n=>{if(d.current.isActive){if("Enter"===n.key||"Tab"===n.key)return n.preventDefault(),e(e=>H(e,d.current)),void u(U);if("ArrowUp"===n.key)return n.preventDefault(),void u(L);if("ArrowDown"===n.key)return n.preventDefault(),void u(G);if("Escape"===n.key)return void u({isActive:!1})}d.current.isActive||"Enter"===n.key&&(n.preventDefault(),t())},[t,e,u,d]),f=Object(a.useCallback)(e=>u({activeIndex:e}),[u]),h=Object(a.useCallback)(t=>{e(e=>H(e,{...d.current,activeIndex:t})),n.current&&n.current.focus(),u(U)},[e,u,n]);return{suggestions:r,handleChange:m,handleKeyUp:b,handleKeyDown:g,handleBlur:Object(a.useCallback)(()=>{u({isActive:!1})},[u]),handleSuggestionMouseEnter:f,handleSuggestionClick:h}},V=n(219),J=n(87);function K(){return(K=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var Y=r.a.createElement("path",{fill:"currentColor",d:"M8.5 10L4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z"});const Z=({svgRef:e,title:t,...n})=>r.a.createElement("svg",K({viewBox:"0 0 20 20",ref:e},n),t?r.a.createElement("title",null,t):null,Y),q=r.a.forwardRef((e,t)=>r.a.createElement(Z,K({svgRef:t},e)));n.p;const X={small:c.b`
    width: 24px;
    height: 24px;
  `,medium:c.b`
    width: 30px;
    height: 30px;
  `};var Q=c.c.button.attrs({type:"button"})`
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

  ${e=>X[e.size||"medium"]};

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
`,te=Object(c.c)(Q).attrs({size:"small"})`
  position: absolute;
  top: 5px;
  right: 5px;
`,ne=Object(c.c)(q)`
  display: block;
  width: 20px;
  height: 20px;
`;var ae=({children:e,onClose:t})=>r.a.createElement(ee,null,r.a.createElement(te,{onClick:t},r.a.createElement(ne,null)),e);function re(){return(re=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var ue=r.a.createElement("g",{fill:"currentColor"},r.a.createElement("path",{d:"M7 11a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-4 4a2 2 0 002-2H8a2 2 0 002 2z"}),r.a.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z",clipRule:"evenodd"}));const se=({svgRef:e,title:t,...n})=>r.a.createElement("svg",re({viewBox:"0 0 20 20",ref:e},n),t?r.a.createElement("title",null,t):null,ue),oe=r.a.forwardRef((e,t)=>r.a.createElement(se,re({svgRef:t},e)));n.p;var ie=n(217);var ce=Object(c.c)(ie.a).attrs({disableTracksWidthCompensation:!0})`
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
`;function le(){return(le=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var de=r.a.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z",clipRule:"evenodd"});const me=({svgRef:e,title:t,...n})=>r.a.createElement("svg",le({viewBox:"0 0 20 20",ref:e},n),t?r.a.createElement("title",null,t):null,de),be=r.a.forwardRef((e,t)=>r.a.createElement(me,le({svgRef:t},e)));n.p;const ge=c.c.div`
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
`,Ce=c.c.div`
  position: relative;
  padding: 0 16px;
  color: #adadb8;
`,Ae=c.c.input`
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
`,xe=Object(c.c)(be)`
  position: absolute;
  top: 50%;
  left: 21px;
  display: block;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
`;var ye=({onEmoteClick:e})=>{const[t,n]=Object(a.useState)(""),u=Object(a.useRef)(null),s=Object(i.c)(e=>Object(x.a)(e,t));Object(a.useEffect)(()=>(u.current&&u.current.focus(),()=>n("")),[]);return r.a.createElement(ge,null,r.a.createElement(Ce,null,r.a.createElement(xe,null),r.a.createElement(Ae,{ref:u,placeholder:"Search for Emotes",value:t,onChange:e=>n(e.target.value)})),r.a.createElement(fe,null,r.a.createElement(ce,null,s.map(({title:t,items:n},a)=>r.a.createElement(he,{key:a},!!t&&r.a.createElement(pe,null,t),r.a.createElement(Ee,null,n.map(({alt:t,src:n,srcSet:a})=>r.a.createElement(ve,{key:t,alt:t,src:n,srcSet:a,onClick:()=>e(t)}))))))))};const we=c.c.div`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #18181b;

  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`,Oe=c.c.div`
  position: relative;
`,De=c.c.div`
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
`,Fe=c.c.div`
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
`,Be=c.c.div`
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

      & > ${Be} {
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
`,$e=Object(c.c)(V.a)`
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
`,Re=Object(c.c)(Q)`
  position: absolute;
  right: 5px;
  bottom: 5px;
`,Ie=Object(c.c)(oe)`
  display: block;
  width: 20px;
  height: 20px;
`,_e=r.a.forwardRef(({text:e,suggestions:t,isDisabled:n,onEmoteClick:u,onChange:s,onKeyUp:o,onKeyDown:c,onBlur:l,onSuggestionMouseEnter:d,onSuggestionClick:m},b)=>{const g=Object(a.useRef)(null),f=Object(a.useRef)(null);Object(J.a)([b,f],()=>l());const[h,p]=Object(a.useState)(!1),[E,v]=Object(a.useState)(!1),C=Object(i.c)(x.e),A=()=>v(!1);Object(J.a)(g,A);return r.a.createElement(we,{ref:g},r.a.createElement(Oe,null,t.isActive&&(({type:e,items:t,activeIndex:n})=>{const a=(e,t)=>r.a.createElement(Fe,{key:e,isActive:t===n,onMouseEnter:()=>d(t),onClick:()=>m(t)},e),u=({src:e,srcSet:t,alt:a},u)=>r.a.createElement(Fe,{key:a,isActive:u===n,onMouseEnter:()=>d(u),onClick:()=>m(u)},r.a.createElement(je,{src:e,srcSet:t,alt:a}),a);return r.a.createElement(De,{ref:f},t.length?"users"===e?t.map(a):t.map(u):"No matches")})(t),r.a.createElement(ke,{isSuggestions:t.isActive},r.a.createElement(Be,null,r.a.createElement($e,{inputRef:b,value:e,placeholder:"Send a message",maxLength:500,maxRows:4,disabled:n,$showScroll:h,onChange:s,onKeyUp:o,onKeyDown:c,onHeightChange:e=>p(e>=96)}),C&&r.a.createElement(Re,{onClick:()=>v(!E)},r.a.createElement(Ie,null)))),E&&r.a.createElement(Se,null,r.a.createElement(ae,{onClose:A},r.a.createElement(ye,{onEmoteClick:u})))))});var Te=r.a.memo(_e);function ze(){return(ze=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var Pe=r.a.createElement("g",{fill:"currentColor"},r.a.createElement("path",{d:"M10 8a2 2 0 100 4 2 2 0 000-4z"}),r.a.createElement("path",{fillRule:"evenodd",d:"M9 2h2a2.01 2.01 0 001.235 1.855l.53.22a2.01 2.01 0 002.185-.439l1.414 1.414a2.01 2.01 0 00-.439 2.185l.22.53A2.01 2.01 0 0018 9v2a2.01 2.01 0 00-1.855 1.235l-.22.53a2.01 2.01 0 00.44 2.185l-1.415 1.414a2.01 2.01 0 00-2.184-.439l-.531.22A2.01 2.01 0 0011 18H9a2.01 2.01 0 00-1.235-1.854l-.53-.22a2.009 2.009 0 00-2.185.438L3.636 14.95a2.009 2.009 0 00.438-2.184l-.22-.531A2.01 2.01 0 002 11V9c.809 0 1.545-.487 1.854-1.235l.22-.53a2.009 2.009 0 00-.438-2.185L5.05 3.636a2.01 2.01 0 002.185.438l.53-.22A2.01 2.01 0 009 2zm-4 8l1.464 3.536L10 15l3.535-1.464L15 10l-1.465-3.536L10 5 6.464 6.464 5 10z",clipRule:"evenodd"}));const Me=({svgRef:e,title:t,...n})=>r.a.createElement("svg",ze({viewBox:"0 0 20 20",ref:e},n),t?r.a.createElement("title",null,t):null,Pe),Ne=r.a.forwardRef((e,t)=>r.a.createElement(Me,ze({svgRef:t},e)));n.p;function Ue(){return(Ue=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var Le=r.a.createElement("path",{fill:"#fff",d:"M13 8l-5 5v18h6v5l5-5h4l9-9V8z"}),Ge=r.a.createElement("path",{fill:"#9147ff",d:"M26 25l4-4V10H14v15h4v4l4-4z"}),He=r.a.createElement("path",{fill:"#fff",d:"M20 14h2v6h-2v-6zm7 0v6h-2v-6h2z"});const We=({svgRef:e,title:t,...n})=>r.a.createElement("svg",Ue({viewBox:"0 0 40 40",ref:e},n),t?r.a.createElement("title",null,t):null,Le,Ge,He),Ve=r.a.forwardRef((e,t)=>r.a.createElement(We,Ue({svgRef:t},e)));n.p;var Je=c.c.button.attrs({type:"button"})`
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
`;const Ke=c.c.div`
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
`,qe=({id:e,label:t,checked:n,readOnly:a,onChange:u})=>r.a.createElement(Ke,null,r.a.createElement(Ze,{id:e,"aria-label":t,checked:n,readOnly:a,onChange:u}),r.a.createElement(Ye,{htmlFor:e}));qe.defaultProps={checked:!1,readOnly:!1,onChange:()=>{}};var Xe=qe,Qe=n(89);const et=c.c.div`
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
`,at=c.c.div`
  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
`,rt=c.c.div`
  padding: 8px 0;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.6);
`,ut=c.c.div``,st=c.c.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  cursor: pointer;
`,ot=c.c.span``,it=c.c.div`
  display: flex;
  align-items: center;
`,ct=c.c.div`
  font-weight: bold;
  color: ${e=>e.color};
`,lt=Object(c.c)(u.b)`
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
`;var mt=()=>{const e=Object(i.b)(),t=Object(i.c)(m.e),n=Object(i.c)(l.b),u=Object(i.c)(d.f),s=Object(i.c)(d.e),o=Object(i.c)(y.e),c=Object(a.useCallback)(({id:t,name:n,title:a,description:u,value:s})=>r.a.createElement(st,{key:t,onClick:()=>e(Object(Qe.a)({name:n,value:!s})),title:u},r.a.createElement(ot,null,a),r.a.createElement(Xe,{id:t,label:a,checked:s,onChange:()=>e(Object(Qe.a)({name:n,value:s}))})),[e]),b=Object(a.useCallback)(({title:e,items:t},n)=>r.a.createElement(at,{key:n},!!e&&r.a.createElement(rt,null,e),r.a.createElement(ut,null,t.map(c))),[c]);return r.a.createElement(et,null,r.a.createElement(tt,null,"Chat settings"),r.a.createElement(nt,null,n&&r.a.createElement(at,null,r.a.createElement(rt,null,"Profile"),r.a.createElement(ut,null,r.a.createElement(it,null,o.map(({alt:e,label:t,src:n,srcSet:a},u)=>r.a.createElement(dt,{key:u,alt:e,"aria-label":t,src:n,srcSet:a})),r.a.createElement(ct,{color:s},u),r.a.createElement(lt,{to:"/chat/logout"},"Log Out")))),t.map(b)))};const bt=c.c.div`
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
`,ht=Object(c.c)(Q)`
  margin-left: auto;
`,pt=Object(c.c)(Ne)`
  display: block;
  width: 20px;
  height: 20px;
`,Et=Object(c.c)(Ve)`
  display: block;
  margin-right: 4px;
  width: 20px;
  height: 20px;
`;var vt=r.a.memo(({isDisabled:e,onSendMessage:t})=>{const[n,s]=Object(a.useState)(!1),o=Object(a.useRef)(null),c=Object(a.useRef)(null),d=Object(i.c)(l.a),m=Object(i.c)(l.b),b=()=>s(!1);Object(J.a)([o,c],b);return r.a.createElement(bt,null,r.a.createElement(gt,null,d&&!m&&r.a.createElement(Je,{as:u.b,to:"/chat/auth"},r.a.createElement(Et,null),"Sign in with Twitch"),r.a.createElement(ht,{ref:c,onClick:()=>s(e=>!e)},r.a.createElement(pt,null)),r.a.createElement(Je,{disabled:e,onClick:t},"Chat")),n&&r.a.createElement(ft,{ref:o},r.a.createElement(ae,{onClose:b},r.a.createElement(mt,null))))}),Ct=n(67),At=n(221);const xt=(e,t,n)=>(n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e),yt=e=>{(e=e.replace(/[^0-9a-f]/gi,"")).length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]);return(299*parseInt(e.substr(0,2),16)+587*parseInt(e.substr(2,2),16)+114*parseInt(e.substr(4,2),16))/1e3>=128?"dark":"light"},wt=(e,t="dark")=>{const n="light"===t,a=n?.1:-.1;(e=e.replace(/[^0-9a-f]/gi,"")).length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]);const r=((e,t,n)=>{e/=255,t/=255,n/=255;const a=Math.max(e,t,n),r=Math.min(e,t,n),u=Math.min(Math.max(0,(a+r)/2),1),s=Math.min(Math.max(0,a-r),1);if(0===s)return[s,s,u];let o=0;switch(a){case e:o=Math.min(Math.max(0,(t-n)/s+(t<n?6:0)),6);break;case t:o=Math.min(Math.max(0,(n-e)/s+2),6);break;case n:o=Math.min(Math.max(0,(e-t)/s+4),6)}o/=6;let i=u>.5?s/(2*(1-u)):s/(2*u);return i=Math.min(Math.max(0,i),1),[o,i,u]})(parseInt(e.substr(0,2),16),parseInt(e.substr(2,2),16),parseInt(e.substr(4,2),16));let u=n?1-(1-a)*(1-r[2]):(1+a)*r[2];u=Math.min(Math.max(0,u),1);const s=((e,t,n)=>{if(0===t){const e=Math.round(Math.min(Math.max(0,255*n),255));return[e,e,e]}const a=n<.5?n*(1+t):n+t-n*t,r=2*n-a;return[Math.round(Math.min(Math.max(0,255*xt(r,a,e+1/3)),255)),Math.round(Math.min(Math.max(0,255*xt(r,a,e)),255)),Math.round(Math.min(Math.max(0,255*xt(r,a,e-1/3)),255))]})(r[0],r[1],u);return`#${s[0].toString(16).padStart(2,"0")}${s[1].toString(16).padStart(2,"0")}${s[2].toString(16).padStart(2,"0")}`},Ot=new Map;var Dt=n(108);const Ft=c.c.a.attrs({target:"_blank",rel:"noreferrer noopener"})`
  display: flex;
  flex-wrap: nowrap;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.9), 0 0 2px rgba(0, 0, 0, 0.9);
  background-color: #18181b;
  text-decoration: none;

  ${e=>e.$clickable&&c.b`
      &:hover {
        background-color: #3a3a3d;
      }

      &:active {
        background-color: #464649;
      }
    `}
`,jt=c.c.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 80px;
  background-color: #26262c;
  overflow: hidden;
`,Bt=c.c.img`
  max-height: 100%;
`,kt=c.c.div`
  height: 45px;
  width: 80px;
  background-color: #46464b;
`,St=c.c.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  overflow: hidden;
`,$t=c.b`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
`,Rt=c.c.p`
  ${$t};
  font-weight: bold;
  color: #efeff1;
`,It=c.c.p`
  ${$t};
  color: #adadb8;
`,_t=c.b`
  margin-top: 3px;
  margin-bottom: 4px;

  height: 12px;
  background-color: #232326;
  border-radius: 2px;
`,Tt=c.c.div`
  ${_t};
  width: 180px;
`,zt=c.c.div`
  ${_t};
  width: 120px;
`,Pt=k.p+"/58765/1.0",Mt=`${k.p}/58765/1.0 1x, ${k.p}/58765/2.0 2x, ${k.p}/58765/3.0 4x`,Nt={"twitch-clip":"We couldn't find that Clip","twitch-video":"We couldn't find that Video","youtube-video":"We couldn't find that Video"};var Ut=e=>{const t=Object(i.c)(Object(Dt.a)(e));if(!t||"loading"===t.status)return r.a.createElement(Ft,null,r.a.createElement(kt,null),r.a.createElement(St,null,r.a.createElement(Tt,null),r.a.createElement(zt,null)));if("error"===t.status)return n=e.type,r.a.createElement(Ft,null,r.a.createElement(jt,null,r.a.createElement(Bt,{src:Pt,srcSet:Mt,alt:""})),r.a.createElement(St,null,r.a.createElement(Rt,null,"Something went wrong"),r.a.createElement(It,null,Nt[n])));var n;const{url:a,src:u,srcSet:s,title:o,description:c}=t;return r.a.createElement(Ft,{href:a,$clickable:!0},r.a.createElement(jt,null,r.a.createElement(Bt,{src:u,srcSet:s,alt:o})),r.a.createElement(St,null,r.a.createElement(Rt,null,o),r.a.createElement(It,null,c)))};const Lt=c.c.div`
  padding: 5px 20px;
  color: ${e=>e.isAction?e.color:"#fff"};
  opacity: ${e=>e.isHistory||e.isDeleted?"0.5":"1"};
  line-height: 20px;
  word-wrap: break-word;
  background-color: ${e=>e.isHighlighted?"rgba(255, 0, 0, 0.3)":e.isEven?"#1f1925":"transparent"};
`,Gt=c.c.span`
  font-weight: bold;
  color: ${e=>e.color};
  cursor: pointer;
`,Ht=c.c.img`
  display: inline-block;
  margin-top: -5px;
  margin-bottom: -4px;
  width: 20px;
  height: auto;
  vertical-align: middle;
`,Wt=c.c.img`
  display: inline-block;
  margin: -5px 0;
  vertical-align: middle;
`,Vt=c.c.span`
  display: inline-block;

  /* Prevent stacking of IceCold, SoSnowy */
  &[data-emote-id='5849c9a4f52be01a7ee5f79d'] + &[data-emote-id='5849c9a4f52be01a7ee5f79d'],
  &[data-emote-id='567b5b520e984428652809b6'] + &[data-emote-id='567b5b520e984428652809b6'] {
    display: none;
  }

  /* IceCold */
  &        + &[data-emote-id='5849c9a4f52be01a7ee5f79d'],
  ${Ht} + &[data-emote-id='5849c9a4f52be01a7ee5f79d'] {
    margin-left: -33px;
  }

  /* SoSnowy */
  &        + &[data-emote-id='567b5b520e984428652809b6'],
  ${Ht} + &[data-emote-id='567b5b520e984428652809b6'] {
    margin-left: -32px;
  }

  /* SantaHat */
  &        + &[data-emote-id='58487cc6f52be01a7ee5f205'],
  ${Ht} + &[data-emote-id='58487cc6f52be01a7ee5f205'] {
    margin-left: -34px;
    margin-top: -18px;
  }

  /* TopHat, CandyCane, ReinDeer */
  &        + &[data-emote-id='5849c9c8f52be01a7ee5f79e'],
  ${Ht} + &[data-emote-id='5849c9c8f52be01a7ee5f79e'],
  &        + &[data-emote-id='567b5c080e984428652809ba'],
  ${Ht} + &[data-emote-id='567b5c080e984428652809ba'],
  &        + &[data-emote-id='567b5dc00e984428652809bd'],
  ${Ht} + &[data-emote-id='567b5dc00e984428652809bd'] {
    margin-left: -31px;
    margin-top: -18px;
  }

  /* cvHazmat, cvMask */
  &        + &[data-emote-id='5e76d338d6581c3724c0f0b2'],
  ${Ht} + &[data-emote-id='5e76d338d6581c3724c0f0b2'],
  &        + &[data-emote-id='5e76d399d6581c3724c0f0b8'],
  ${Ht} + &[data-emote-id='5e76d399d6581c3724c0f0b8'] {
    margin-left: -34px;
  }
  &        + &[data-emote-id='5e76d338d6581c3724c0f0b2'] ${Wt},
  ${Ht} + &[data-emote-id='5e76d338d6581c3724c0f0b2'] ${Wt},
  &        + &[data-emote-id='5e76d399d6581c3724c0f0b8'] ${Wt},
  ${Ht} + &[data-emote-id='5e76d399d6581c3724c0f0b8'] ${Wt} {
    height: 34px;
    width: 34px;
  }
`,Jt=c.c.span`
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
`,Kt=c.c.a`
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
`,Yt=c.c.span`
  margin-right: 5px;
  color: rgba(255, 255, 255, 0.6);
`,Zt=c.c.img`
  margin-bottom: 2px;
  margin-right: 3px;
  max-width: 100%;
  vertical-align: middle;
  border-radius: 3px;
`;var qt=r.a.memo(({message:{entities:e,user:{login:t,color:n,displayName:u,badges:s},timestamp:o,card:i,isHistory:c,isAction:l,isDeleted:d,isHighlighted:m},userLogin:b,isEven:g,isShowTimestamps:f,onNameRightClick:h})=>{const[p,E]=Object(a.useState)(!1),v=n?((e,t=!0)=>{const n=`${e}:${t}`;if(Ot.has(n))return Ot.get(n);if(!/^#[0-9a-f]+$/i.test(e))return e;let a;for(let r=20;r>=0&&(a=yt(e),"light"!==a||t)&&("dark"!==a||!t);r-=1)e=wt(e,a);return Ot.set(n,e),Ot.size>1e3&&Ot.delete(Ot.entries().next().value[0]),e})(n):"";return r.a.createElement(Lt,{isHistory:c,isAction:l,isEven:g,isHighlighted:m,isDeleted:d,color:v},f&&r.a.createElement(Yt,null,Object(At.a)("h:mm",new Date(o))),s.length>0&&(e=>e.map(({alt:e,label:t,src:n,srcSet:a},u)=>r.a.createElement(Zt,{key:u,alt:e,"aria-label":t,src:n,srcSet:a})))(s),r.a.createElement(Gt,{color:v,onContextMenu:e=>{h(u),e.preventDefault()}},u),l?" ":": ",d&&!p?r.a.createElement(Kt,{onClick:()=>E(!0)},"<message deleted>"):e.map(((e,t)=>(n,a)=>"object"!==typeof n?n:"twitch-emote"===n.type||"bttv-emote"===n.type||"ffz-emote"===n.type?r.a.createElement(Vt,{key:a,"data-emote-id":n.id},r.a.createElement(Wt,{src:n.src,srcSet:n.srcSet,alt:n.alt})):"emoji"===n.type?r.a.createElement(Vt,{key:a},r.a.createElement(Ht,{src:n.src,alt:n.alt})):"mention"===n.type?r.a.createElement(Jt,{key:a,isActive:n.target===t,isOwnMessage:e===t},n.text):"link"===n.type?r.a.createElement(Kt,{key:a,href:n.href,rel:"noreferrer noopener",target:"_blank"},n.text):null)(t,b)),i&&r.a.createElement(Ut,{type:i.type,id:i.id}))});const Xt=c.c.div`
  padding: 5px 20px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 20px;
  word-wrap: break-word;
  background-color: ${e=>e.isEven?"#1f1925":"transparent"};
`;var Qt=({message:{message:e},isEven:t})=>r.a.createElement(Xt,{isEven:t},e);const en=c.c.div`
  padding: 5px 20px 5px 16px;
  line-height: 20px;
  word-wrap: break-word;
  border-left: 4px solid #9147ff;
  color: #fff;
`;var tn=({message:{systemMessage:e}})=>r.a.createElement(en,null,e);var nn=r.a.memo(({message:e,userLogin:t,isEven:n,isShowTimestamps:a,onNameRightClick:u})=>"message"===e.type?r.a.createElement(qt,{message:e,userLogin:t,isEven:n,isShowTimestamps:a,onNameRightClick:u}):"notice"===e.type?r.a.createElement(Qt,{message:e,isEven:n}):"user-notice"===e.type?r.a.createElement(tn,{message:e}):Object(Ct.a)(e));const an=c.c.div`
  position: relative;
  flex-grow: 1;
`,rn=Object(c.c)(ce)`
  .ScrollbarsCustom-Content {
    padding-bottom: 10px !important;
  }
`,un=c.c.button`
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
`;var sn=({onNameRightClick:e})=>{const[t,n]=Object(a.useState)(!1),u=Object(i.c)(p),s=Object(i.c)(l.d),o=Object(i.c)(A),c=Object(i.c)(m.c),d=Object(i.c)(m.d),b=Object(a.useRef)(null),g=()=>{b.current&&b.current.scrollToBottom()};Object(a.useEffect)(()=>{t||g()},[u]);const f=e=>!!d&&(o?e%2===1:e%2===0);return r.a.createElement(an,null,r.a.createElement(rn,{onUpdate:({clientHeight:e,contentScrollHeight:t,scrollTop:a})=>{n(a+100<t-e)},ref:b},u.map((t,n)=>r.a.createElement(nn,{key:t.id,message:t,userLogin:s,isEven:f(n),isShowTimestamps:c,onNameRightClick:e}))),r.a.createElement(un,{onClick:g,isVisible:t},"More messages below"))};const on=c.c.div`
  padding: 10px;
  flex-grow: 1;
  width: 320px;
`,cn=c.c.h2`
  margin-top: 0;
  margin-bottom: 10px;
  padding: 0;
  color: #fff;
`,ln=c.c.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: 10px;
  }
`,dn=c.c.input`
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
`,mn=Object(c.c)(Je)`
  flex-shrink: none;
`;var bn=()=>{const e=Object(s.f)(),[t,n]=Object(a.useState)(""),u=Object(a.useRef)(null);Object(a.useEffect)(()=>{u.current&&u.current.focus()},[]);const o=()=>{e.push({pathname:"/chat/",hash:t})};return r.a.createElement(on,null,r.a.createElement(cn,null,"Channel to join: "),r.a.createElement(ln,null,r.a.createElement(dn,{ref:u,value:t,onChange:e=>n(e.target.value),onKeyPress:e=>{"Enter"===e.key&&o()}}),r.a.createElement(mn,{onClick:o,disabled:!t},"Join")))};const gn=c.c.div`
  height: 100vh;
  font-size: 12px;
  background-color: #0e0e10;
`,fn=c.c.div`
  display: flex;
  flex-direction: column;
  width: ${e=>e.isFixedWidth?"340px":"auto"};
  height: 100%;
  background-color: #18181b;
`;var hn=()=>{const[e,t]=Object(a.useState)(""),n=z();h(),$(),B();const u=Object(i.c)(d.b),s=Object(i.c)(l.b),o=Object(i.c)(d.c),c=Object(i.c)(m.a),b=Object(a.useRef)(null),g=Object(a.useRef)(e);g.current=e;const f=!s||!o,p=Object(a.useCallback)(()=>{n&&g.current&&(n.say(u,g.current),t(""))},[n,u,g,t]),E=W(t,p,b),v=Object(a.useCallback)(e=>{t(t=>`${t.trim()} @${e} `.trimLeft()),b.current&&b.current.focus()},[t,b]),C=Object(a.useCallback)(e=>{t(t=>`${t.trim()} ${e} `.trimLeft())},[t]);return r.a.createElement(gn,null,r.a.createElement(fn,{isFixedWidth:c},u?r.a.createElement(sn,{onNameRightClick:v}):r.a.createElement(bn,null),r.a.createElement(Te,{ref:b,text:e,suggestions:E.suggestions,isDisabled:f,onEmoteClick:C,onChange:E.handleChange,onKeyUp:E.handleKeyUp,onKeyDown:E.handleKeyDown,onBlur:E.handleBlur,onSuggestionMouseEnter:E.handleSuggestionMouseEnter,onSuggestionClick:E.handleSuggestionClick}),r.a.createElement(vt,{isDisabled:f,onSendMessage:p})))};var pn=()=>(window.location.href=Object(o.a)(),null);var En=()=>{const e=Object(s.f)(),t=Object(i.b)();return localStorage.removeItem(k.d),localStorage.removeItem(k.f),localStorage.removeItem(k.i),t(Object(f.d)()),e.push({pathname:"/chat/",hash:localStorage.getItem(k.g)||""}),null};var vn=()=>{const e=Object(s.f)();if(!window.location.hash)return null;const t=new URLSearchParams(window.location.hash.slice(1)),n=t.get("access_token"),a=t.get("id_token");return n&&a?(localStorage.setItem(k.d,n),localStorage.setItem(k.f,a),e.push({pathname:"/chat/",hash:localStorage.getItem(k.g)||""}),null):null},Cn=c.b`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: Roobert, Helvetica Neue, Helvetica, Arial, sans-serif;
  }
`,An=c.b``,xn=c.b``,yn=c.a`
  :root {
    ${An};
    ${xn};
  }
  ${Cn};
`;const wn=({location:e})=>Object(o.b)(e.hash)?r.a.createElement(vn,null):r.a.createElement(hn,null);t.default=()=>r.a.createElement(r.a.Fragment,null,r.a.createElement(u.a,null,r.a.createElement(s.c,null,r.a.createElement(s.a,{exact:!0,path:"/chat/",render:wn}),r.a.createElement(s.a,{exact:!0,path:"/chat/auth",component:pn}),r.a.createElement(s.a,{exact:!0,path:"/chat/logout",component:En}))),r.a.createElement(yn,null))},363:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(66),s=n.n(u),o=n(3),i=n(139);const c=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)),l=(e,t)=>{navigator.serviceWorker.register(e).then(e=>{e.onupdatefound=()=>{const n=e.installing;null!=n&&(n.onstatechange=()=>{"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(e=>{console.error("Error during service worker registration:",e)})};var d=n(41),m=n(8),b=n(36),g=n(37),f=n(33),h=n(38),p=n(74),E=n(52),v=n(86),C=n(109),A=n(89);var x=Object(b.c)({auth:g.a,chat:f.a,messages:h.c,messageCards:p.a,emotes:E.a,badges:v.a,blockedUsers:C.a,options:A.b});var y=Object(m.a)({reducer:x});if(i.a.initialize("UA-139550930-3"),!Object(d.b)(window.location.hash)){const e=window.location.pathname+window.location.search+window.location.hash;i.a.pageview(e)}(()=>{const e=n(362).default;s.a.render(r.a.createElement(o.a,{store:y},r.a.createElement(e,null)),document.getElementById("root"))})(),(e=>{if("serviceWorker"in navigator){if(new URL("/chat",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",()=>{const t="/chat/service-worker.js";c?(((e,t)=>{fetch(e,{headers:{"Service-Worker":"script"}}).then(n=>{const a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(e=>{e.unregister().then(()=>{window.location.reload()})}):l(e,t)}).catch(()=>{console.log("No internet connection found. App is running in offline mode.")})})(t,e),navigator.serviceWorker.ready.then(()=>{console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):l(t,e)})}})()},37:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return l}));var a=n(8),r=n(18),u=n(41);const s={status:"idle",userId:null,userLogin:null},o=Object(a.b)("auth/fetchUser",async e=>{const t=await r.l(e),{id:n,login:a}=t.data[0];return Object(u.d)({id:n,login:a}),t}),i=Object(a.c)({name:"auth",initialState:s,reducers:{initializeAuth:(e,{payload:t})=>{e.status=t.isAuth?"success":"error",t.userId&&(e.userId=t.userId),t.userLogin&&(e.userLogin=t.userLogin)},invalidateAuth:()=>s},extraReducers:e=>{e.addCase(o.pending,e=>{e.status="loading"}),e.addCase(o.fulfilled,(e,{payload:t})=>{e.status="success",e.userId=t.data[0].id,e.userLogin=t.data[0].login}),e.addCase(o.rejected,e=>{e.status="error"})}}),{initializeAuth:c,invalidateAuth:l}=i.actions;t.a=i.reducer},38:function(e,t,n){"use strict";n.d(t,"d",(function(){return H})),n.d(t,"b",(function(){return V})),n.d(t,"e",(function(){return Y})),n.d(t,"a",(function(){return Z}));var a=n(8),r=n(18),u=n(4),s=n(67),o=n(72),i=n(208),c=n(209),l=n(24),d=n(85),m=n(34),b=n(44),g=n(16),f=n(58),h=n(140),p=n(90),E=n(31),v=n(372),C=n(210),A=n(107),x=n(211),y=n.n(x),w=n(13),O=n(27);const D=/^@([0-9A-Z_a-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10107}-\u{10133}\u{10140}-\u{10178}\u{1018A}\u{1018B}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{102E1}-\u{102FB}\u{10300}-\u{10323}\u{1032D}-\u{1034A}\u{10350}-\u{10375}\u{10380}-\u{1039D}\u{103A0}-\u{103C3}\u{103C8}-\u{103CF}\u{103D1}-\u{103D5}\u{10400}-\u{1049D}\u{104A0}-\u{104A9}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10858}-\u{10876}\u{10879}-\u{1089E}\u{108A7}-\u{108AF}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{108FB}-\u{1091B}\u{10920}-\u{10939}\u{10980}-\u{109B7}\u{109BC}-\u{109CF}\u{109D2}-\u{10A00}\u{10A10}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A40}-\u{10A48}\u{10A60}-\u{10A7E}\u{10A80}-\u{10A9F}\u{10AC0}-\u{10AC7}\u{10AC9}-\u{10AE4}\u{10AEB}-\u{10AEF}\u{10B00}-\u{10B35}\u{10B40}-\u{10B55}\u{10B58}-\u{10B72}\u{10B78}-\u{10B91}\u{10BA9}-\u{10BAF}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10CFA}-\u{10D23}\u{10D30}-\u{10D39}\u{10E60}-\u{10E7E}\u{10E80}-\u{10EA9}\u{10EB0}\u{10EB1}\u{10F00}-\u{10F27}\u{10F30}-\u{10F45}\u{10F51}-\u{10F54}\u{10FB0}-\u{10FCB}\u{10FE0}-\u{10FF6}\u{11003}-\u{11037}\u{11052}-\u{1106F}\u{11083}-\u{110AF}\u{110D0}-\u{110E8}\u{110F0}-\u{110F9}\u{11103}-\u{11126}\u{11136}-\u{1113F}\u{11144}\u{11147}\u{11150}-\u{11172}\u{11176}\u{11183}-\u{111B2}\u{111C1}-\u{111C4}\u{111D0}-\u{111DA}\u{111DC}\u{111E1}-\u{111F4}\u{11200}-\u{11211}\u{11213}-\u{1122B}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A8}\u{112B0}-\u{112DE}\u{112F0}-\u{112F9}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133D}\u{11350}\u{1135D}-\u{11361}\u{11400}-\u{11434}\u{11447}-\u{1144A}\u{11450}-\u{11459}\u{1145F}-\u{11461}\u{11480}-\u{114AF}\u{114C4}\u{114C5}\u{114C7}\u{114D0}-\u{114D9}\u{11580}-\u{115AE}\u{115D8}-\u{115DB}\u{11600}-\u{1162F}\u{11644}\u{11650}-\u{11659}\u{11680}-\u{116AA}\u{116B8}\u{116C0}-\u{116C9}\u{11700}-\u{1171A}\u{11730}-\u{1173B}\u{11800}-\u{1182B}\u{118A0}-\u{118F2}\u{118FF}-\u{11906}\u{11909}\u{1190C}-\u{11913}\u{11915}\u{11916}\u{11918}-\u{1192F}\u{1193F}\u{11941}\u{11950}-\u{11959}\u{119A0}-\u{119A7}\u{119AA}-\u{119D0}\u{119E1}\u{119E3}\u{11A00}\u{11A0B}-\u{11A32}\u{11A3A}\u{11A50}\u{11A5C}-\u{11A89}\u{11A9D}\u{11AC0}-\u{11AF8}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C2E}\u{11C40}\u{11C50}-\u{11C6C}\u{11C72}-\u{11C8F}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D30}\u{11D46}\u{11D50}-\u{11D59}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D89}\u{11D98}\u{11DA0}-\u{11DA9}\u{11EE0}-\u{11EF2}\u{11FB0}\u{11FC0}-\u{11FD4}\u{12000}-\u{12399}\u{12400}-\u{1246E}\u{12480}-\u{12543}\u{13000}-\u{1342E}\u{14400}-\u{14646}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16A60}-\u{16A69}\u{16AD0}-\u{16AED}\u{16B00}-\u{16B2F}\u{16B40}-\u{16B43}\u{16B50}-\u{16B59}\u{16B5B}-\u{16B61}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16E40}-\u{16E96}\u{16F00}-\u{16F4A}\u{16F50}\u{16F93}-\u{16F9F}\u{16FE0}\u{16FE1}\u{16FE3}\u{17000}-\u{187F7}\u{18800}-\u{18CD5}\u{18D00}-\u{18D08}\u{1B000}-\u{1B11E}\u{1B150}-\u{1B152}\u{1B164}-\u{1B167}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1D2E0}-\u{1D2F3}\u{1D360}-\u{1D378}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D6C0}\u{1D6C2}-\u{1D6DA}\u{1D6DC}-\u{1D6FA}\u{1D6FC}-\u{1D714}\u{1D716}-\u{1D734}\u{1D736}-\u{1D74E}\u{1D750}-\u{1D76E}\u{1D770}-\u{1D788}\u{1D78A}-\u{1D7A8}\u{1D7AA}-\u{1D7C2}\u{1D7C4}-\u{1D7CB}\u{1D7CE}-\u{1D7FF}\u{1E100}-\u{1E12C}\u{1E137}-\u{1E13D}\u{1E140}-\u{1E149}\u{1E14E}\u{1E2C0}-\u{1E2EB}\u{1E2F0}-\u{1E2F9}\u{1E800}-\u{1E8C4}\u{1E8C7}-\u{1E8CF}\u{1E900}-\u{1E943}\u{1E94B}\u{1E950}-\u{1E959}\u{1EC71}-\u{1ECAB}\u{1ECAD}-\u{1ECAF}\u{1ECB1}-\u{1ECB4}\u{1ED01}-\u{1ED2D}\u{1ED2F}-\u{1ED3D}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}\u{1F100}-\u{1F10C}\u{1FBF0}-\u{1FBF9}\u{20000}-\u{2A6DD}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2F800}-\u{2FA1D}\u{30000}-\u{3134A}]+)/u,F=y()({strict:!1}),j=e=>Object.entries(e).reduce((e,[t,n])=>{const a=Number.parseInt(t,10);return{...e,...n.reduce((e,{start:t})=>({...e,[t]:a}),{})}},{}),B=(e,t,n)=>{if(!t)return null;if(n){const n=O.a.twitch.byName(e,t);if(n)return n}const a=O.a.bttv.byName(e,t)||O.a.ffz.byName(e,t);if(a)return a;const r=Object(C.parse)(e,{assetType:"png"});if(r&&1===r.length&&r[0].text.length===e.length){const t=(u=e,f.a(h.a(p.a("char",u)),E.a,v.a)(A.lib));if(t){const[{url:e}]=r;return w.c(t,e)}}var u;const s=e.match(D);if(s){const[t,n]=s;return[w.f(t,n.toLowerCase()),e.length-t.length]}const o=e.match(F);return o&&o[0].length===e.length?w.e(e):null};var k=(e,t,n,a=!1)=>{const r=[];let u=0,s=0;do{const o=e.indexOf(" ",u+1),i=0===u?u:u+1,c=-1===o?e.length:o,l=e.substring(i,c);if(l){let u=null;if(!a&&n&&Object.keys(n).length>0){const e=j(n)[i];e&&(u=w.g({id:e,code:l}))}if(u||(u=B(l,t,a)),u){if(s!==i){const t=e.substring(s,i);r.push(t)}if(Array.isArray(u)){const[e,t]=u;r.push(e),s=c-t}else r.push(u),s=c}}if(-1===o&&s!==c){const t=e.substring(s,c);r.push(t)}u=o}while(-1!==u);return r};var S=(e,t,n)=>!!e&&e!==t&&RegExp(e,"gi").test(n);const $=/^(?:https?:)?(?:\/\/)?(?:clips\.twitch\.tv\/|(?:www\.|m\.)?twitch\.tv\/(?:[\d\w]+)\/clip\/)([\d\w]+)/,R=/^(?:https?:)?(?:\/\/)?(?:www\.|m\.)?twitch.tv\/videos\/(\d+)/,I=/^((?:https?:)?\/\/)?((?:www|m)\.)?(?:youtube\.com|youtu.be)(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;var _=e=>{for(const t of e)if("object"===typeof t&&"link"===t.type){let e=$.exec(t.text);if(e)return{type:"twitch-clip",id:e[1],url:t.href};if(e=R.exec(t.text),e)return{type:"twitch-video",id:e[1],url:t.href};if(e=I.exec(t.text),e)return{type:"youtube-video",id:e[4],url:t.href}}return null},T=n(105),z=n(212),P=n.n(z);const M=new c.Howl({src:[P.a]}),N=(e,t)=>{const n=Object(m.b)(t),a=Object(m.a)(t),r=Object(l.b)(t),u=Object(d.a)(t),s=Object(g.d)(t);return e.reduce((e,t)=>{const c=i.parse(t),{command:l,prefix:d}=c;return"PRIVMSG"===l&&d&&!u.includes(d.name)&&e.push((({tags:e,params:[t,n],prefix:a},r,u,s,i)=>{const c=o.b(n),l=c?o.c(n):n,d=o.d(e),m=a?a.name:"",b=S(i,m,l),g=k(l,r,d.emotes),f=w.a(d.badges,u,s);return{type:"message",id:d.id,message:l,channel:t.slice(1),entities:g,user:{id:d.userId,login:m,displayName:d.displayName,color:d.color,badges:f},timestamp:d.tmiSentTs,card:null,isAction:c,isHistory:!0,isDeleted:!1,isHighlighted:b}})(c,r,n,a,s)),e},[])};var U=function({items:e,limit:t,addedItemsCount:n=1,isEven:a=!1}){const r=e.length-t,u=r>0;return[u?e.slice(r):e,u&&n%2?!a:a]},L=n(74),G=n(108);const H=Object(a.b)("chat/fetchChatHistory",e=>r.e(e)),W=Object(a.c)({name:"messages",initialState:{},reducers:{clearChat:(e,{payload:t})=>{const{channel:n,tags:{targetUserId:a}}=t;for(const r of e[n].items)"message"!==r.type||r.user.id!==a||r.isHistory||(r.isDeleted=!0)},recieveMessagesAction:(e,{payload:t})=>{const{messages:n,channel:a,type:r="message"}=t;if(0===n.length)return;const s="message"===r?[...e[a].items,...n]:[...n,...e[a].items],[o,i]=U({items:s,limit:u.c,addedItemsCount:n.length,isEven:e[a].isEven});e[a].isEven=i,e[a].items=o;const{users:c}=e[a];n.forEach(e=>{"message"!==e.type||c.includes(e.user.displayName)||c.push(e.user.displayName)});const[l]=U({items:c,limit:u.k});e[a].users=l,"history"===r&&(e[a].history.items=[],e[a].history.isAdded=!0)}},extraReducers:e=>{e.addCase(H.pending,(e,{meta:{arg:t}})=>{const n=t;e[n]?(e[n].history.status="loading",e[n].history.error={}):e[n]={history:{status:"loading",error:{},items:[],isAdded:!1},isEven:!1,items:[],users:[]}}),e.addCase(H.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const a=n;e[a].history.status="success",e[a].history.items=t.messages}),e.addCase(H.rejected,(e,{error:t,meta:{arg:n}})=>{const a=n;e[a].history.status="error",e[a].history.error=t})}}),{clearChat:V}=W.actions;t.c=W.reducer;const{recieveMessagesAction:J}=W.actions,K=(e,t)=>"message"===e.type?(({message:e,tags:t,user:n,channel:a,isAction:r},u)=>{if(Object(d.a)(u).includes(n))return null;const s=Object(b.b)(u),o=Object(g.d)(u),i=S(o,n,e);i&&s&&M.play();const c=Object(m.b)(u),f=Object(m.a)(u),h=Object(l.b)(u),p=k(e,h,t.emotes),E=w.a(t.badges,c,f),v=_(p);return{type:"message",id:t.id,message:e,channel:a,entities:p,user:{id:t.userId,login:n,displayName:t.displayName,color:t.color,badges:E},timestamp:t.tmiSentTs,card:v,isAction:r,isHistory:!1,isDeleted:!1,isHighlighted:i}})(e.message,t):"notice"===e.type?(({message:e,channel:t,tags:{msgId:n}})=>({type:"notice",id:Object(a.d)(),message:e,channel:t,noticeType:n}))(e.message):"user-notice"===e.type?(({message:e,channel:t,tags:{id:n,msgId:a,login:r,systemMsg:u}})=>({type:"user-notice",id:n,message:e,channel:t,noticeType:a,systemMessage:u,user:{login:r}}))(e.message):"own-message"===e.type?(({message:e,channel:t,tags:n},r)=>{const u=Object(m.b)(r),s=Object(m.a)(r),o=Object(l.b)(r),i=Object(g.d)(r),c=Object(g.c)(r),d=e.startsWith("/me "),b=d?e.slice(4):e,f=k(b,o,null,!0),h=w.a(n.badges,u,s),p=_(f);return Object(T.b)(f),{type:"message",id:Object(a.d)(),message:b,channel:t,entities:f,user:{id:c,login:i,displayName:n.displayName,color:n.color,badges:h},timestamp:Date.now(),card:p,isAction:d,isHistory:!1,isDeleted:!1,isHighlighted:!1}})(e.message,t):Object(s.a)(e),Y=e=>(t,n)=>{const a=n(),r=K(e,a);if(!r)return;if("message"===r.type&&r.card){const e=Object(G.a)(r.card)(a);if(!e||"error"===e.status){const{id:e,url:n}=r.card,a={id:e,url:n};"twitch-clip"===r.card.type&&t(Object(L.b)(a)),"twitch-video"===r.card.type&&t(Object(L.c)(a)),"youtube-video"===r.card.type&&t(Object(L.d)(a))}}const u={messages:[r],channel:r.channel};t(J(u))},Z=e=>(t,n)=>{const a=n(),[r]=U({items:a.messages[e].history.items,limit:u.c}),s=N(r,a);t(J({messages:s,channel:e,type:"history"}))}},4:function(e,t,n){"use strict";n.d(t,"m",(function(){return a})),n.d(t,"n",(function(){return r})),n.d(t,"o",(function(){return u})),n.d(t,"c",(function(){return s})),n.d(t,"k",(function(){return o})),n.d(t,"a",(function(){return i})),n.d(t,"p",(function(){return c})),n.d(t,"b",(function(){return l})),n.d(t,"d",(function(){return d})),n.d(t,"f",(function(){return m})),n.d(t,"g",(function(){return b})),n.d(t,"i",(function(){return g})),n.d(t,"e",(function(){return f})),n.d(t,"h",(function(){return h})),n.d(t,"l",(function(){return p})),n.d(t,"j",(function(){return E}));const a="https://id.twitch.tv/oauth2/authorize",r="4e66w1po1tzf645r9vutn9qus05vg9x",u="https://honeykingdom.github.io/chat/",s=500,o=500,i=1e4,c="//static-cdn.jtvnw.net/emoticons/v1",l="//cdn.betterttv.net/emote",d="accessToken",m="idToken",b="lastChannel",g="user",f="emotesUsageStatistic",h="options",p={users:{name:"users",limit:5,regex:/^@([\w\d_]*)$/},emotes:{name:"emotes",limit:10,regex:/^:([\w\d_]{2,})$/}},E=["msg_banned","msg_bad_characters","msg_channel_blocked","msg_channel_suspended","msg_duplicate","msg_emoteonly","msg_facebook","msg_followersonly","msg_followersonly_followed","msg_followersonly_zero","msg_r9k","msg_ratelimit","msg_rejected","msg_rejected_mandatory","msg_room_not_found","msg_slowmode","msg_subsonly","msg_suspended","msg_timedout","msg_verified_email"]},41:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return s})),n.d(t,"d",(function(){return o})),n.d(t,"c",(function(){return i}));var a=n(4);const r={client_id:a.n,redirect_uri:a.o,response_type:"token+id_token",scope:["openid","channel:moderate","chat:edit","chat:read","whispers:read","whispers:edit","user_blocks_read","user_blocks_edit","user_subscriptions"].join("+"),claims:JSON.stringify({id_token:{email_verified:null,picture:null,preferred_username:null}})},u=()=>{const e=Object.entries(r).map(([e,t])=>`${e}=${t}`).join("&");return`${a.m}?${e}`},s=e=>e.startsWith("#access_token="),o=e=>{localStorage.setItem(a.i,JSON.stringify(e))},i=()=>{let e;try{e=JSON.parse(localStorage.getItem(a.i))}catch(t){e=null}return e&&e.id&&e.login?e:null}},44:function(e,t,n){"use strict";n.d(t,"e",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"d",(function(){return u})),n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return o}));const a=e=>[{title:"My preferences",items:[{type:"switch",id:"show-timestamps",name:"showTimestamps",title:"Show Timestamps",description:"",value:e.options.showTimestamps},{type:"switch",id:"split-chat",name:"splitChat",title:"Split Chat",description:"",value:e.options.splitChat},{type:"switch",id:"fixed-width",name:"fixedWidth",title:"Fixed Width",description:"",value:e.options.fixedWidth},{type:"switch",id:"highlight-notifications",name:"highlightNotifications",title:"Play a sound on highlights",description:"Plays a sound for messages directed at you",value:e.options.highlightNotifications}]}],r=e=>e.options.showTimestamps,u=e=>e.options.splitChat,s=e=>e.options.fixedWidth,o=e=>e.options.highlightNotifications},52:function(e,t,n){"use strict";n.d(t,"f",(function(){return s})),n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return i})),n.d(t,"e",(function(){return c})),n.d(t,"d",(function(){return l}));var a=n(8),r=n(18),u=n(25);const s=Object(a.b)("chat/fetchTwitchEmotes",e=>r.j(e)),o=Object(a.b)("chat/fetchBttvGlobalEmotes",()=>r.c()),i=Object(a.b)("chat/fetchBttvChannelEmotes",({channelId:e})=>r.b(e)),c=Object(a.b)("chat/fetchFfzGlobalEmotes",()=>r.g()),l=Object(a.b)("chat/fetchFfzChannelEmotes",({channelId:e})=>r.f(e)),d=Object(a.c)({name:"emotes",initialState:{twitch:{status:"idle",error:{},items:{}},bttv:{global:{status:"idle",error:{},items:[]},byChannels:{}},ffz:{global:{status:"idle",error:{},items:[]},byChannels:{}}},reducers:{},extraReducers:e=>{e.addCase(s.pending,e=>{e.twitch.status="loading",e.twitch.error={}}),e.addCase(s.fulfilled,(e,{payload:t})=>{e.twitch.status="success",e.twitch.items=Object(u.h)(t)}),e.addCase(s.rejected,(e,{error:t})=>{e.twitch.status="error",e.twitch.error=t}),e.addCase(o.pending,e=>{e.bttv.global.status="loading",e.bttv.global.error={}}),e.addCase(o.fulfilled,(e,{payload:t})=>{e.bttv.global.status="success",e.bttv.global.items=Object(u.d)(t)}),e.addCase(o.rejected,(e,{error:t})=>{e.bttv.global.status="error",e.bttv.global.error=t}),e.addCase(i.pending,(e,{meta:{arg:t}})=>{const{channel:n}=t;e.bttv.byChannels[n]?(e.bttv.byChannels[n].status="loading",e.bttv.byChannels[n].error={}):e.bttv.byChannels[n]={status:"loading",error:{},items:[]}}),e.addCase(i.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const{channel:a}=n;e.bttv.byChannels[a].status="success",e.bttv.byChannels[a].items=Object(u.c)(t)}),e.addCase(i.rejected,(e,{error:t,meta:{arg:n}})=>{const{channel:a}=n;e.bttv.byChannels[a].status="error",e.bttv.byChannels[a].error=t}),e.addCase(c.pending,e=>{e.ffz.global.status="loading",e.ffz.global.error={}}),e.addCase(c.fulfilled,(e,{payload:t})=>{e.ffz.global.status="success",e.ffz.global.items=Object(u.f)(t)}),e.addCase(c.rejected,(e,{error:t})=>{e.ffz.global.status="error",e.ffz.global.error=t}),e.addCase(l.pending,(e,{meta:{arg:t}})=>{const{channel:n}=t;e.ffz.byChannels[n]?(e.ffz.byChannels[n].status="loading",e.ffz.byChannels[n].error={}):e.ffz.byChannels[n]={status:"loading",error:{},items:[]}}),e.addCase(l.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const{channel:a}=n;e.ffz.byChannels[a].status="success",e.ffz.byChannels[a].items=Object(u.e)(t)}),e.addCase(l.rejected,(e,{error:t,meta:{arg:n}})=>{const{channel:a}=n;e.ffz.byChannels[a].status="error",e.ffz.byChannels[a].error=t})}});t.a=d.reducer},67:function(e,t,n){"use strict";t.a=e=>e},72:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return w})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return d})),n.d(t,"d",(function(){return C}));var a=n(100),r=n.n(a),u=n(43),s=n(75);function o(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var c,l=function(e){return e.startsWith("\x01ACTION ")&&e.endsWith("\x01")},d=function(e){return e.slice(8,-1)},m=function(e){return e.middle[0].slice(1)},b=!("undefined"===typeof e||!e.versions||!e.versions.node),g=["mod","emote-only","r9k","rituals","subs-only","msg-param-should-share-streak"],f=["tmi-sent-ts","bits","ban-duration","msg-param-cumulative-months","msg-param-months","msg-param-promo-gift-total","msg-param-streak-months","msg-param-viewerCount","msg-param-threshold"],h={"badge-info":"badgeInfo","display-name":"displayName","emote-sets":"emoteSets","room-id":"roomId","tmi-sent-ts":"tmiSentTs","user-id":"userId","target-msg-id":"targetMsgId","target-user-id":"targetUserId","msg-id":"msgId","system-msg":"systemMsg","emote-only":"emoteOnly","followers-only":"followersOnly","subs-only":"subsOnly","ban-duration":"banDuration","message-id":"messageId","thread-id":"threadId","msg-param-cumulative-months":"msgParamCumulativeMonths","msg-param-displayName":"msgParamDisplayName","msg-param-login":"msgParamLogin","msg-param-months":"msgParamMonths","msg-param-promo-gift-total":"msgParamPromoGiftTotal","msg-param-promo-name":"msgParamPromoName","msg-param-recipient-display-name":"msgParamRecipientDisplayName","msg-param-recipient-id":"msgParamRecipientId","msg-param-recipient-user-name":"msgParamRecipientUserName","msg-param-sender-login":"msgParamSenderLogin","msg-param-sender-name":"msgParamSenderName","msg-param-should-share-streak":"msgParamShouldShareStreak","msg-param-streak-months":"msgParamStreakMonths","msg-param-sub-plan":"msgParamSubPlan","msg-param-sub-plan-name":"msgParamSubPlanName","msg-param-viewerCount":"msgParamViewerCount","msg-param-ritual-name":"msgParamRitualName","msg-param-threshold":"msgParamThreshold"},p=["subscriber","turbo","user-type"],E=function(e){return void 0===e&&(e=""),e?e.split(",").reduce((function(e,t){var n,a=t.split("/"),r=a[0],u=a[1];return i(i({},e),{},((n={})[r]=u,n))}),{}):{}},v=function(e,t){if("emotes"===e)return void 0===(n=t)&&(n=""),n?n.split("/").reduce((function(e,t){var n,a=t.split(":"),r=a[0],u=a[1];return i(i({},e),{},((n={})[r]=u.split(",").map((function(e){var t=e.split("-"),n=t[0],a=t[1];return{start:Number.parseInt(n,10),end:Number.parseInt(a,10)}})),n))}),{}):{};var n;if("badges"===e)return E(t);if("badge-info"===e)return E(t);if("followers-only"===e){var a=!1;return"-1"===t?a=!1:"0"===t?a=!0:"string"===typeof t&&(a=parseInt(t,10)),a}if("slow"===e){var r=!1;return"0"===t?r=!1:"string"===typeof t&&(r=parseInt(t,10)),r}return g.includes(e)?"1"===t:f.includes(e)?parseInt(t,10):"string"===typeof t?t.replace("\\s"," "):t},C=function(e){return e?Object.entries(e).reduce((function(e,t){var n,a=t[0],r=t[1];if(p.includes(a))return e;var u=h[a]||a;return i(i({},e),{},((n={})[u]=v(a,r),n))}),{}):{}},A=function(e){var t=e.raw,n=e.tags;return{raw:t,channel:m(e),get tags(){return C(n)}}},x=function(e){var t=e.raw,n=e.trailing,a=e.tags;return{raw:t,message:n,channel:m(e),get tags(){return C(a)}}};!function(e){e.REPLY001="001",e.PING="PING",e.PONG="PONG",e.JOIN="JOIN",e.PART="PART",e.PRIVMSG="PRIVMSG",e.NOTICE="NOTICE",e.USERNOTICE="USERNOTICE",e.GLOBALUSERSTATE="GLOBALUSERSTATE",e.USERSTATE="USERSTATE",e.ROOMSTATE="ROOMSTATE",e.CLEARCHAT="CLEARCHAT",e.CLEARMSG="CLEARMSG",e.HOSTTARGET="HOSTTARGET",e.WHISPER="WHISPER"}(c||(c={}));var y,w=function(e){var t,n;function u(t){var n;return void 0===t&&(t={}),(n=e.call(this)||this).socket=null,n.globalUserState=null,n.channels={},n._connected=!1,n._connecting=!1,n._registered=!1,n.options=i({secure:!0},t),n}n=e,(t=u).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var g,f,h,p=u.prototype;return p.connect=function(){try{var e=this,t=b?e._connectInNode():e._connectInBrowser();return Promise.resolve(t).then((function(){return e._register()}))}catch(n){return Promise.reject(n)}},p.disconnect=function(){this._connected&&(b?this.socket.destroy():this.socket.close(),this.socket=null,this._connected=!1,this._connecting=!1,this._registered=!1,this.emit("disconnect"))},p.receiveRaw=function(e){var t=this;e.trim().split("\r\n").forEach((function(e){return t._handleMessage(e)}))},p.sendRaw=function(e){return!(null===this.socket||!e)&&(b?this.socket.write(e):this.socket.send(e),!0)},p.say=function(e,t){var n=Object(s.format)({command:c.PRIVMSG,middle:["#"+e],trailing:t});return this.sendRaw(n)},p.sendCommand=function(e,t,n){void 0===n&&(n="");var a=Array.isArray(n)?n.join(" "):n,r=Object(s.format)({command:c.PRIVMSG,middle:["#"+e],trailing:"/"+t+" "+a});return this.sendRaw(r)},p.join=function(e){if(!this._registered)return!1;var t=Object(s.format)({command:c.JOIN,middle:["#"+e]});return this.sendRaw(t)},p.part=function(e){if(!this._registered)return!1;var t=Object(s.format)({command:c.PART,middle:["#"+e]});return this.sendRaw(t)},p._handleMessage=function(e){var t=Object(s.parse)(e);t.raw=e;var n=t.command;if(n===c.PING)return this.sendRaw(c.PONG+" :tmi.twitch.tv"),void this.emit("ping",{raw:e});if(n===c.REPLY001)return this.options.name=t.middle[0],this._registered=!0,void this.emit("register");if(n!==c.PRIVMSG){if(n===c.USERSTATE){var a=m(t),r=A(t);return this._updateUserState(a,r.tags),void this.emit("userstate",r)}if(n!==c.JOIN)if(n!==c.PART){if(n===c.ROOMSTATE){var u=m(t),o=A(t);return this._updateRoomState(u,o.tags),void this.emit("roomstate",o)}if(n!==c.NOTICE)if(n!==c.USERNOTICE)if(n!==c.CLEARCHAT)if(n!==c.CLEARMSG)if(n!==c.HOSTTARGET)if(n!==c.WHISPER){if(n===c.GLOBALUSERSTATE){var i=function(e){var t=e.raw,n=e.tags;return{raw:t,get tags(){return C(n)}}}(t);return this._updateGlobalUserState(i.tags),void this.emit("globaluserstate",i)}}else{var b=function(e){var t=e.raw,n=e.trailing,a=e.tags,r=e.prefix;return{raw:t,message:n,channel:e.middle[0],user:r.name,get tags(){return C(a)}}}(t);this.emit("whisper",b)}else{var g=x(t);this.emit("hosttarget",g)}else{var f=x(t);this.emit("clearmessage",f)}else{var h=x(t);this.emit("clearchat",h)}else{var p=x(t);this.emit("usernotice",p)}else{var E=x(t);this.emit("notice",E)}}else{var v={channel:m(t)};this.emit("part",v)}else{var y={channel:m(t)};this.emit("join",y)}}else{var w=function(e){var t=e.raw,n=e.trailing,a=e.tags,r=e.prefix.name,u=l(n);return{raw:t,message:u?d(n):n,channel:m(e),user:r,get tags(){return C(a)},isAction:u}}(t);this.emit("message",w)}},p._connectInNode=function(){var e=this,t="irc.chat.twitch.tv",n=this.options.secure?6697:6667;return new Promise((function(u,s){e._connecting=!0;var o=function(){e._connecting=!1,e._connected=!0,e.emit("connect"),u()};e.options.secure?e.socket=r.a.connect(n,t,{},o):(e.socket=new a.Socket,e.socket.connect(n,t,o)),e.socket.on("error",(function(t){e._connected=!1,e._connecting=!1,e.emit("disconnect",t),s(t)})),e.socket.on("data",(function(t){e.receiveRaw(t.toString())})),e.socket.on("close",(function(){e._connected=!1,e._connecting=!1,e._registered=!1,e.emit("disconnect")}))}))},p._connectInBrowser=function(){var e=this,t=this.options.secure?"wss://irc-ws.chat.twitch.tv:443":"ws://irc-ws.chat.twitch.tv:80";return new Promise((function(n,a){e._connecting=!0,e.socket=new WebSocket(t),e.socket.onopen=function(){e._connected=!0,e._connecting=!1,e.emit("connect"),n()},e.socket.onmessage=function(t){var n=t.data;return e.receiveRaw(n)},e.socket.onerror=function(){},e.socket.onclose=function(t){var n=t.wasClean,r=t.code,u=t.reason;if(e.socket=null,e._connected=!1,e._connecting=!1,e._registered=!1,n)e.emit("disconnect");else{var s=new Error("["+r+"] "+u);e.emit("disconnect",s),a(s)}}}))},p._register=function(){var e=this;if(!this._connected)return Promise.reject();if(this._registered)return Promise.resolve();var t=this.options,n=t.name,a=t.auth,r=n||"justinfan"+Math.floor(1e5*Math.random()).toString().padStart(5,"0"),u=a?"oauth:"+a:"SCHMOOPIIE";return this.sendRaw("CAP REQ :twitch.tv/tags twitch.tv/commands"),this.sendRaw("PASS "+u),this.sendRaw("NICK "+r),new Promise((function(t,n){var a=function n(){t(),e.off("register",n)};e.on("register",a),setTimeout((function(){n(),e.off("register",a)}),1e4)}))},p._updateGlobalUserState=function(e){this.globalUserState=i(i({},this.globalUserState),e)},p._updateUserState=function(e,t){var n;this.channels=i(i({},this.channels),{},((n={})[e]=i(i({},this.channels[e]),{},{userState:t}),n))},p._updateRoomState=function(e,t){var n;this.channels=i(i({},this.channels),{},((n={})[e]=i(i({},this.channels[e]),{},{roomState:t}),n))},g=u,(f=[{key:"connected",get:function(){return this._connected}},{key:"connecting",get:function(){return this._connecting}},{key:"registered",get:function(){return this._registered}}])&&o(g.prototype,f),h&&o(g,h),u}(u.EventEmitter);!function(e){e.sub="sub",e.resub="resub",e.subgift="subgift",e.anonsubgift="anonsubgift",e.submysterygift="submysterygift",e.giftpaidupgrade="giftpaidupgrade",e.rewardgift="rewardgift",e.anongiftpaidupgrade="anongiftpaidupgrade",e.raid="raid",e.unraid="unraid",e.ritual="ritual",e.bitsbadgetier="bitsbadgetier"}(y||(y={}))}).call(this,n(14))},74:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return o})),n.d(t,"d",(function(){return i}));var a=n(8),r=n(18),u=n(25);const s=Object(a.b)("clips/fetchTwitchClip",({id:e})=>r.i(e)),o=Object(a.b)("clips/fetchTwitchVideo",({id:e})=>r.k(e)),i=Object(a.b)("clips/fetchYoutubeVideo",({id:e})=>r.m(e)),c=Object(a.c)({name:"messageCards",initialState:{twitchClips:{},twitchVideos:{},youtubeVideos:{}},reducers:{},extraReducers:e=>{e.addCase(s.pending,(e,{meta:{arg:t}})=>{const{id:n}=t;e.twitchClips[n]={status:"loading"}}),e.addCase(s.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const{id:a}=n,r=Object(u.g)(t);e.twitchClips[a]=r?{status:"success",...r}:{status:"error"}}),e.addCase(s.rejected,(e,{meta:{arg:t}})=>{const{id:n}=t;e.twitchClips[n]={status:"error"}}),e.addCase(o.pending,(e,{meta:{arg:t}})=>{const{id:n}=t;e.twitchVideos[n]={status:"loading"}}),e.addCase(o.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const{id:a,url:r}=n,s=Object(u.i)(t);e.twitchVideos[a]=s?{status:"success",url:r,...s}:{status:"error"}}),e.addCase(o.rejected,(e,{meta:{arg:t}})=>{const{id:n}=t;e.twitchVideos[n]={status:"error"}}),e.addCase(i.pending,(e,{meta:{arg:t}})=>{const{id:n}=t;e.youtubeVideos[n]={status:"loading"}}),e.addCase(i.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const{id:a,url:r}=n,s=Object(u.j)(t);e.youtubeVideos[a]=s?{status:"success",url:r,...s}:{status:"error"}}),e.addCase(i.rejected,(e,{meta:{arg:t}})=>{const{id:n}=t;e.youtubeVideos[n]={status:"error"}})}});t.a=c.reducer},85:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return r}));const a=e=>"idle"!==e.blockedUsers.status&&"loading"!==e.blockedUsers.status,r=e=>e.blockedUsers.items},86:function(e,t,n){"use strict";n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return o}));var a=n(8),r=n(18),u=n(25);const s=Object(a.b)("chat/fetchGlobalBadges",()=>r.h()),o=Object(a.b)("chat/fetchChannelBadges",({channelId:e})=>r.d(e)),i=Object(a.c)({name:"badges",initialState:{global:{status:"idle",error:{},items:{}},byChannels:{}},reducers:{},extraReducers:e=>{e.addCase(s.pending,e=>{e.global.status="loading",e.global.error={}}),e.addCase(s.fulfilled,(e,{payload:t})=>{e.global.status="success",e.global.items=Object(u.a)(t)}),e.addCase(s.rejected,(e,{error:t})=>{e.global.status="error",e.global.error=t}),e.addCase(o.pending,(e,{meta:{arg:t}})=>{const{channel:n}=t;e.byChannels[n]?(e.byChannels[n].status="loading",e.byChannels[n].error={}):e.byChannels[n]={status:"loading",error:{},items:{}}}),e.addCase(o.fulfilled,(e,{payload:t,meta:{arg:n}})=>{const{channel:a}=n;e.byChannels[a].status="success",e.byChannels[a].items=Object(u.a)(t)}),e.addCase(o.rejected,(e,{error:t,meta:{arg:n}})=>{const{channel:a}=n;e.byChannels[a].status="error",e.byChannels[a].error=t})}});t.a=i.reducer},89:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(8),r=n(4);const u=()=>{try{const e=localStorage.getItem(r.h);return JSON.parse(e)||{}}catch{return{}}},s={showTimestamps:!1,splitChat:!0,blacklistKeywords:"",highlightKeywords:"",fixedWidth:!1,highlightNotifications:!0,...u()},o=Object(a.c)({name:"options",initialState:s,reducers:{changeOption:{reducer:(e,{payload:t})=>{const{name:n,value:a}=t;e[n]=a},prepare:e=>{const{name:t,value:n}=e;var a;return a={[t]:n},localStorage.setItem(r.h,JSON.stringify({...u(),...a})),{payload:e}}}}}),{changeOption:i}=o.actions;t.b=o.reducer}},[[225,1,2]]]);
//# sourceMappingURL=main.7ad89b35.chunk.js.map