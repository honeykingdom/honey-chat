(this["webpackJsonphoney-chat"]=this["webpackJsonphoney-chat"]||[]).push([[0],{178:function(e,t,n){e.exports=n(317)},219:function(e,t){},221:function(e,t){},260:function(e,t){},261:function(e,t){},317:function(e,t,n){"use strict";n.r(t);var r,a=n(0),c=n.n(a),o=n(63),i=n.n(o),s=n(31),u=n(157),l=n(2),f=n(15),b=n.n(f),d=n(25),h=n(108),p=n(325),O=function(e){return fetch(e).then((function(e){return e.json()}))},m=function(e){return t="/users?id=".concat(e),fetch("".concat("https://api.twitch.tv/helix").concat(t),{headers:{Authorization:"Bearer ".concat(localStorage.accessToken)}}).then((function(e){return e.json()}));var t},g=function(e){return t="/users/".concat(e,"/emotes"),fetch("".concat("https://api.twitch.tv/kraken").concat(t),{headers:{Accept:"application/vnd.twitchtv.v5+json","Client-ID":"4e66w1po1tzf645r9vutn9qus05vg9x",Authorization:"OAuth ".concat(localStorage.accessToken)}}).then((function(e){return e.json()}));var t},v=function(e){return O("https://api.betterttv.net/3/cached/users/twitch/".concat(e))},j=function(e){return O("https://api.frankerfacez.com/v1/room/id/".concat(e))},E=function(e){return O("https://recent-messages.robotty.de/api/v2/recent-messages/".concat(e,"?clearchatToNotice=true"))};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var _,w=Object(h.a)("SET_IS_AUTH"),T=Object(h.a)("FETCH_USER_REQUEST"),k=Object(h.a)("FETCH_USER_SUCCESS"),x=Object(h.a)("FETCH_USER_FAILURE"),C=Object(p.a)((r={},Object(l.a)(r,w,(function(e,t){var n=t.payload,r=n.isAuth,a=n.user;return S({},e,{isAuth:void 0===r?e.isAuth:r,user:S({},e.user,{},a)})})),Object(l.a)(r,T,(function(e){return S({},e,{isLoading:!0})})),Object(l.a)(r,k,(function(e,t){return S({},e,{isAuth:!0,isLoading:!1,user:t.payload})})),Object(l.a)(r,x,(function(e,t){return S({},e,{isAuth:!1,isLoading:!1,error:t.payload})})),r),{isAuth:!1,isLoading:!1,user:{id:null,login:null,displayName:null}}),L=n(323),R=n(318);function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var D=Object(L.a)("SET_CURRENT_CHANNEL","SET_IS_CONNECTED","UPDATE_GLOBAL_USER_STATE","UPDATE_USER_STATE","UPDATE_ROOM_STATE","REMOVE_CHANNEL"),F=D.setCurrentChannel,I=D.setIsConnected,N=D.updateGlobalUserState,H=D.updateUserState,U=D.updateRoomState,q=D.removeChannel,M=Object(p.a)((_={},Object(l.a)(_,F,(function(e,t){return A({},e,{currentChannel:t.payload})})),Object(l.a)(_,I,(function(e,t){return A({},e,{isConnected:t.payload})})),Object(l.a)(_,N,(function(e,t){var n=t.payload.tags;return A({},e,{globalState:A({},e.globalState,{},n)})})),Object(l.a)(_,H,(function(e,t){var n=t.payload,r=n.channel,a=n.tags;return A({},e,{channels:A({},e.channels,Object(l.a)({},r,A({},e.channels[r],{userState:a})))})})),Object(l.a)(_,U,(function(e,t){var n=t.payload,r=n.channel,a=n.tags;return A({},e,{channels:A({},e.channels,Object(l.a)({},r,A({},e.channels[r],{roomState:a})))})})),Object(l.a)(_,q,(function(e,t){var n=t.payload;return A({},e,{channels:Object(R.a)([n],e.channels)})})),_),{currentChannel:null,isConnected:!1,globalState:{},channels:{}}),z=n(331);function G(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function B(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?G(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var V,Q=Object(L.a)("FETCH_TWITCH_EMOTES_REQUEST","FETCH_TWITCH_EMOTES_SUCCESS","FETCH_TWITCH_EMOTES_FAILURE"),W=Q.fetchTwitchEmotesRequest,J=Q.fetchTwitchEmotesSuccess,Z=Q.fetchTwitchEmotesFailure,X=Object(p.a)(Object(l.a)({},Object(z.a)(W,J,Z),(function(e,t){var n=t.type,r=t.payload;return n===W.toString()?B({},e,{isLoading:!0,isLoaded:!1,isError:!1,error:null}):n===J.toString()?B({},e,{isLoading:!1,isLoaded:!0,isError:!1},r):n===Z.toString()?B({},e,{isLoading:!1,isLoaded:!1,isError:!0,error:r}):e})),{isLoading:!1,isLoaded:!1,isError:!1,error:null,items:{}}),Y=n(22);function K(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function $(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?K(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):K(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ee,te=Object(L.a)("FETCH_BTTV_GLOBAL_EMOTES_REQUEST","FETCH_BTTV_GLOBAL_EMOTES_SUCCESS","FETCH_BTTV_GLOBAL_EMOTES_FAILURE","FETCH_BTTV_CHANNEL_EMOTES_REQUEST","FETCH_BTTV_CHANNEL_EMOTES_SUCCESS","FETCH_BTTV_CHANNEL_EMOTES_FAILURE"),ne=te.fetchBttvGlobalEmotesRequest,re=te.fetchBttvGlobalEmotesSuccess,ae=te.fetchBttvGlobalEmotesFailure,ce=te.fetchBttvChannelEmotesRequest,oe=te.fetchBttvChannelEmotesSuccess,ie=te.fetchBttvChannelEmotesFailure,se=function(e){var t=e.channelEmotes,n=e.sharedEmotes;return[].concat(Object(Y.a)(t),Object(Y.a)(n))},ue=Object(p.a)((V={},Object(l.a)(V,Object(z.a)(ne,re,ae),(function(e,t){var n=t.type,r=t.payload;return n===ne.toString()?$({},e,{global:$({},e.global,{isLoading:!0,isLoaded:!1,isError:!1,error:null})}):n===re.toString()?$({},e,{global:$({},e.global,{isLoading:!1,isLoaded:!0,isError:!1,error:null},r)}):n===ae.toString()?$({},e,{global:$({},e.global,{isLoading:!1,isLoaded:!1,isError:!0},r)}):e})),Object(l.a)(V,Object(z.a)(ce,oe,ie),(function(e,t){var n=t.type,r=t.payload,a=r.channel;return n===ce.toString()?$({},e,{channels:$({},e.channels,Object(l.a)({},a,{isLoading:!0,isLoaded:!1,isError:!1,error:null}))}):n===oe.toString()?$({},e,{channels:$({},e.channels,Object(l.a)({},a,{isLoading:!1,isLoaded:!0,isError:!1,error:null,items:r.items}))}):n===ie.toString()?$({},e,{channels:$({},e.channels,Object(l.a)({},a,{isLoading:!1,isLoaded:!1,isError:!0,error:r.error}))}):e})),V),{global:{isLoading:!1,isLoaded:!1,isError:!1,error:null,items:[]},channels:{}}),le=n(324),fe=n(326),be=n(319),de=n(328),he=n(329);function pe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Oe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?pe(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):pe(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var me=Object(L.a)("FETCH_FFZ_GLOBAL_EMOTES_REQUEST","FETCH_FFZ_GLOBAL_EMOTES_SUCCESS","FETCH_FFZ_GLOBAL_EMOTES_FAILURE","FETCH_FFZ_CHANNEL_EMOTES_REQUEST","FETCH_FFZ_CHANNEL_EMOTES_SUCCESS","FETCH_FFZ_CHANNEL_EMOTES_FAILURE"),ge=me.fetchFfzGlobalEmotesRequest,ve=me.fetchFfzGlobalEmotesSuccess,je=me.fetchFfzGlobalEmotesFailure,Ee=me.fetchFfzChannelEmotesRequest,ye=me.fetchFfzChannelEmotesSuccess,Se=me.fetchFfzChannelEmotesFailure,_e=Object(le.a)(Object(fe.a)({},["sets"]),be.a,Object(de.a)(Object(fe.a)([],["emoticons"])),he.a),we=_e,Te=Object(p.a)((ee={},Object(l.a)(ee,Object(z.a)(ge,ve,je),(function(e,t){var n=t.type,r=t.payload;return n===ge.toString()?Oe({},e,{global:Oe({},e.global,{isLoading:!0,isLoaded:!1,isError:!1,error:null})}):n===ve.toString()?Oe({},e,{global:Oe({},e.global,{isLoading:!1,isLoaded:!0,isError:!1,error:null},r)}):n===je.toString()?Oe({},e,{global:Oe({},e.global,{isLoading:!1,isLoaded:!1,isError:!0},r)}):e})),Object(l.a)(ee,Object(z.a)(Ee,ye,Se),(function(e,t){var n=t.type,r=t.payload,a=r.channel;return n===Ee.toString()?Oe({},e,{channels:Oe({},e.channels,Object(l.a)({},a,{isLoading:!0,isLoaded:!1,isError:!1,error:null}))}):n===ye.toString()?Oe({},e,{channels:Oe({},e.channels,Object(l.a)({},a,{isLoading:!1,isLoaded:!0,isError:!1,error:null,items:r.items}))}):n===Se.toString()?Oe({},e,{channels:Oe({},e.channels,Object(l.a)({},a,{isLoading:!1,isLoaded:!1,isError:!0,error:r.error}))}):e})),ee),{global:{isLoading:!1,isLoaded:!1,isError:!1,error:null,items:[]},channels:{}}),ke=Object(s.c)({twitch:X,bttv:ue,ffz:Te}),xe=n(175),Ce=n(11),Le=n(42),Re=n(46),Pe=Object(fe.a)("",["chat","currentChannel"]),Ae=Object(Re.a)(Object(fe.a)([],["emotes","twitch","items"]),Object(le.a)(be.a,he.a)),De=Object(Re.a)(Object(fe.a)({},["emotes","bttv","channels"]),Pe,(function(e,t){return Object(fe.a)([],[t,"items"],e)})),Fe=Object(Re.a)(Object(fe.a)([],["emotes","bttv","global","items"]),De,(function(e,t){return[].concat(Object(Y.a)(e),Object(Y.a)(t))})),Ie=Object(Re.a)(Object(fe.a)({},["emotes","ffz","channels"]),Pe,(function(e,t){return Object(fe.a)([],[t,"items"],e)})),Ne=Object(Re.a)(Object(fe.a)([],["emotes","ffz","global","items"]),Ie,(function(e,t){return[].concat(Object(Y.a)(e),Object(Y.a)(t))})),He=Object(Re.a)(Object(fe.a)(!1,["emotes","twitch","isLoaded"]),Object(fe.a)(!1,["emotes","bttv","global","isLoaded"]),(function(e){return Object(fe.a)(!1,["emotes","bttv","channels",Pe(e),"isLoaded"])(e)}),Object(fe.a)(!1,["emotes","ffz","global","isLoaded"]),(function(e){return Object(fe.a)(!1,["emotes","ffz","channels",Pe(e),"isLoaded"])(e)}),(function(e,t,n,r,a){return e&&t&&n&&r&&a})),Ue=n(159),qe=n(160),Me=n(174),ze=n(161),Ge=n(176),Be=n(64),Ve=n(162),Qe=n.n(Ve),We=n(163),Je=n.n(We);function Ze(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Xe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ze(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ze(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Ye=["CAP","002","003","004","353","366","375","372","376"],Ke=["mod","emote-only","r9k","rituals","subs-only","msg-param-should-share-streak"],$e=["ban-duration","bits","msg-param-cumulative-months","msg-param-months","msg-param-promo-gift-total","msg-param-streak-months","msg-param-viewerCount","msg-param-threshold"],et=["subscriber","turbo","user-type"],tt=["msg_banned","msg_bad_characters","msg_channel_blocked","msg_channel_suspended","msg_duplicate","msg_emoteonly","msg_facebook","msg_followersonly","msg_followersonly_followed","msg_followersonly_zero","msg_r9k","msg_ratelimit","msg_rejected","msg_rejected_mandatory","msg_room_not_found","msg_slowmode","msg_subsonly","msg_suspended","msg_timedout","msg_verified_email"],nt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e?e.split(",").reduce((function(e,t){var n=t.split("/"),r=Object(Ce.a)(n,2),a=r[0],c=r[1];return Xe({},e,Object(l.a)({},a,c))}),{}):{}},rt=function(e,t){if("emotes"===e)return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e?e.split("/").reduce((function(e,t){var n=t.split(":"),r=Object(Ce.a)(n,2),a=r[0],c=r[1];return Xe({},e,Object(l.a)({},a,c.split(",").map((function(e){var t=e.split("-"),n=Object(Ce.a)(t,2),r=n[0],a=n[1];return{start:Number.parseInt(r,10),end:Number.parseInt(a,10)}}))))}),{}):{}}(t);if("badges"===e)return nt(t);if("badge-info"===e)return nt(t);if("followers-only"===e){var n=!1;return"-1"===t?n=!1:"0"===t?n=!0:"string"===typeof t&&(n=parseInt(t,10)),n}if("slow"===e){var r=!1;return"0"===t?r=!1:"string"===typeof t&&(r=parseInt(t,10)),r}return Ke.includes(e)?"1"===t:$e.includes(e)?parseInt(t,10):t},at=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.entries(e).filter((function(e){var t=Object(Ce.a)(e,1)[0];return!et.includes(t)})).reduce((function(e,t){var n=Object(Ce.a)(t,2),r=n[0],a=n[1];return Xe({},e,Object(l.a)({},Qe()(r),rt(r,a)))}),{})},ct=function(e){return e.startsWith("\x01ACTION ")&&e.endsWith("\x01")},ot=function(e){return e.slice(8,-1)},it=function(e){return{tags:e.tags,channel:Object(Ce.a)(e.params,1)[0].slice(1)}},st=it,ut=function(e){function t(){var e,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(Ue.a)(this,t),(e=Object(Me.a)(this,Object(ze.a)(t).call(this))).socket=null,e.channels={},e.options=n,e.user=null,e._queue=[],e._messagesQueue=[],e}return Object(Ge.a)(t,e),Object(qe.a)(t,[{key:"_onConnect",value:function(){var e=this.options.identity,t=e.name,n=e.auth;this.sendRaw(["CAP REQ :twitch.tv/tags twitch.tv/commands","PASS oauth:".concat(n),"NICK ".concat(t)]),this.emit("connected")}},{key:"_onClose",value:function(e){this.emit("disconnected",{willReconnect:!1,hadError:e})}},{key:"_onError",value:function(e){this.emit("error",e)}},{key:"_onData",value:function(e){var t=this;e.trim().split("\r\n").forEach((function(e){return t._handleMessage(e)}))}},{key:"_handleMessage",value:function(e){var t=Object(Le.parse)(e);t.raw=e;var n=t.command;if("PING"===n)return this.sendRaw("PONG :tmi.twitch.tv"),void this.emit("ping");if(!t.prefix||"jtv"!==t.prefix.user)if("001"!==n){if(!Ye.includes(n)){var r=function(e){var t=e.raw,n=e.command,r=e.tags,a=e.middle,c=e.trailing,o=e.prefix;return{raw:t,command:n,tags:at(r),params:a,message:c,prefix:o}}(t),a=Object(fe.a)("",["params",0],r).slice(1);if("PRIVMSG"!==n)if("USERSTATE"!==n){if("JOIN"===n){var c={channel:a};return this.channels=Xe({},this.channels,Object(l.a)({},a,{})),void this.emit("join",c)}if("PART"===n){var o={channel:a};return this.channels=Object(R.a)([a],this.channels),void this.emit("part",o)}if("ROOMSTATE"===n){var i=st(r);return this.channels[a].roomState=i.tags,void this.emit("roomstate",i)}if("NOTICE"===n){var s=r;return tt.includes(r.tags.msgId)&&this._messagesQueue.shift(),void this.emit("notice",s)}if("GLOBALUSERSTATE"!==n){this.emit("unhandled-command",r)}else{var u={tags:r.tags};for(this.user=u.tags;this._queue.length;){var f=this._queue.shift();this.sendRaw(f)}this.emit("globaluserstate",u)}}else{var b=it(r);if(this.channels[a].userState=b.tags,"SEND_PRIVMSG"===(0===this._messagesQueue.length?"JOIN_CHANNEL":"SEND_PRIVMSG")){var d=this._messagesQueue.shift(),h=d.startsWith("/me "),p={message:h?d.slice(4):d,tags:Xe({},b.tags,{id:Je()(),tmiSentTs:(new Date).getTime(),userId:this.user.userId}),user:this.options.identity.name,channel:a,isAction:h};this.emit("own-message",p)}this.emit("userstate",b)}else{var O=function(e){var t=e.message,n=e.tags,r=e.params,a=e.prefix.user,c=ct(t);return{message:c?ot(t):t,tags:n,user:a,channel:r[0].slice(1),isAction:c}}(r);this.emit("message",O)}}}else{var m=t.params[0];this.options.identity.name=m}}},{key:"sendRaw",value:function(e){var t=this,n=function(e){e&&t.emit("error",e)};Array.isArray(e)?e.forEach((function(e){return t.socket.send("".concat(e,"\r\n"),n)})):this.socket.send("".concat(e,"\r\n"),n)}},{key:"connect",value:function(){var e=this;this.socket=new WebSocket("wss://irc-ws.chat.twitch.tv:443");var t=this.socket;t.addEventListener("open",(function(){return e._onConnect()})),t.addEventListener("close",(function(t){return e._onClose(t)})),t.addEventListener("error",(function(t){return e._onError(t)})),t.addEventListener("message",(function(t){return e._onData(t.data)}))}},{key:"say",value:function(e,t){if(t){var n=Object(Le.format)({command:"PRIVMSG",middle:["#".concat(e)],trailing:t});this.sendRaw(n),this._messagesQueue.push(t)}}},{key:"sendCommand",value:function(e,t,n){var r=Array.isArray(n)?n.join(" "):n,a=Object(Le.format)({command:"PRIVMSG",middle:["#".concat(e)],trailing:"/".concat(t," ").concat(r)});this.sendRaw(a)}},{key:"join",value:function(e){var t=Object(Le.format)({command:"JOIN",middle:["#".concat(e)]});this.user?this.sendRaw(t):this._queue.push(t)}},{key:"part",value:function(e){var t=Object(Le.format)({command:"PART",middle:["#".concat(e)]});this.user?this.sendRaw(t):this._queue.push(t)}}]),t}(Be.EventEmitter),lt=n(1),ft=n.n(lt),bt=n(164),dt=n(81),ht=n(165),pt=n.n(ht),Ot=n(320),mt=n(322),gt=n(327),vt=n(321),jt=n(173),Et=n(26),yt=n(330);function St(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var _t,wt=/^@([\w_]+)/,Tt=pt()({strict:!1}),kt=Object(le.a)(Ot.a,Object(de.a)((function(e){var t=Object(Ce.a)(e,2),n=t[0],r=t[1];return Object(de.a)((function(e){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?St(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):St(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({id:n},e)}),r)})),he.a),xt=Object(le.a)(Ot.a,Object(de.a)((function(e){var t=Object(Ce.a)(e,2),n=t[0],r=t[1];return"".concat(r," ").concat(n,"x")})),Object(mt.a)(", ")),Ct="//static-cdn.jtvnw.net/emoticons/v1",Lt=function(e,t){return{type:"twitch-emote",alt:e,src:"".concat(Ct,"/").concat(t,"/1.0"),srcSet:"".concat(Ct,"/").concat(t,"/1.0 1x, ").concat(Ct,"/").concat(t,"/2.0 2x, ").concat(Ct,"/").concat(t,"/3.0 4x")}},Rt=function(e,t){return{type:"mention",text:e,target:t}},Pt=(ft.a.shape({type:ft.a.oneOf(["twitch-emote"]).isRequired,alt:ft.a.string.isRequired,src:ft.a.string.isRequired,srcSet:ft.a.string.isRequired}),ft.a.shape({type:ft.a.oneOf(["bttv-emote"]).isRequired,alt:ft.a.string.isRequired,src:ft.a.string.isRequired,srcSet:ft.a.string.isRequired}),ft.a.shape({type:ft.a.oneOf(["ffz-emote"]).isRequired,alt:ft.a.string.isRequired,src:ft.a.string.isRequired,srcSet:ft.a.string.isRequired}),ft.a.shape({type:ft.a.oneOf(["emoji"]).isRequired,alt:ft.a.string.isRequired,src:ft.a.string.isRequired,srcSet:ft.a.string.isRequired}),ft.a.shape({type:ft.a.oneOf(["mention"]).isRequired,text:ft.a.string.isRequired,target:ft.a.string.isRequired}),ft.a.shape({type:ft.a.oneOf(["link"]).isRequired,text:ft.a.string.isRequired,href:ft.a.string.isRequired}),function(e,t,n){var r=t.twitch,a=t.bttv,c=t.ffz,o=n.parseTwitch;if(void 0!==o&&o){var i=function(e,t){return Object(gt.a)(Object(vt.a)("code",e),t)}(e,r);if(i)return Lt(e,i.id)}var s=function(e,t){return Object(gt.a)(Object(vt.a)("code",e),t)}(e,a);if(s)return function(e,t){var n=t.id;return{type:"bttv-emote",alt:e,src:"".concat("//cdn.betterttv.net/emote").concat(n,"/1x"),srcSet:"".concat("//cdn.betterttv.net/emote","/").concat(n,"/2x 2x, ").concat("//cdn.betterttv.net/emote","/").concat(n,"/3x 4x")}}(e,s);var u=function(e,t){return Object(gt.a)(Object(vt.a)("name",e),t)}(e,c);if(u)return function(e,t){var n=t.urls;return{type:"ffz-emote",alt:e,src:n[1],srcSet:xt(n)}}(e,u);var l,f=Object(bt.parse)(e,{assetType:"png"});if(f&&1===f.length&&f[0].text.length===e.length){var b=(l=e,Object(le.a)(Object(jt.a)(Object(vt.a)("char",l)),Et.a,yt.a)(dt));if(b){var d=Object(Ce.a)(f,1)[0].url;return{type:"emoji",alt:b,src:d,srcSet:null}}}var h=e.match(wt);if(h){var p=Object(Ce.a)(h,2),O=p[0],m=p[1];return[Rt(O,m.toLowerCase()),e.length-O.length]}var g,v=e.match(Tt);return v&&v[0].length===e.length?{type:"link",text:g=e,href:g}:null}),At=function(e,t,n){var r=void 0===t||null===t,a=t&&Object.keys(t).length>0,c=kt(t),o=[],i=0,s=0;do{var u=e.indexOf(" ",i+1),l=0===i?i:i+1,f=-1===u?e.length:u,b=e.substring(l,f);if(b){var d=null;if(a){var h=Object(gt.a)(Object(vt.a)("start",l),c);h&&(d=Lt(b,h.id))}if(d||(d=Pt(b,n,{parseTwitch:r})),d){if(s!==l){var p=e.substring(s,l);o.push(p)}if(Array.isArray(d)){var O=d,m=Object(Ce.a)(O,2),g=m[0],v=m[1];o.push(g),s=f-v}else o.push(d),s=f}}if(-1===u&&s!==f){var j=e.substring(s,f);o.push(j)}i=u}while(-1!==i);return o};function Dt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Ft(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Dt(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Dt(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var It=function(e){var t=e.length-500;return t>0?e.slice(t):e},Nt=function(e){return{twitch:Ae(e),bttv:Fe(e),ffz:Ne(e)}},Ht=Object(L.a)("ADD_MESSAGES","FETCH_RECENT_MESSAGES_REQUEST","FETCH_RECENT_MESSAGES_SUCCESS","FETCH_RECENT_MESSAGES_FAILURE"),Ut=Ht.addMessages,qt=Ht.fetchRecentMessagesRequest,Mt=Ht.fetchRecentMessagesSuccess,zt=Ht.fetchRecentMessagesFailure,Gt=function(e,t){return e.map((function(e){return Object(Le.parse)(e)})).filter((function(e){return"PRIVMSG"===e.command})).map((function(e){var n=e.tags,r=Object(Ce.a)(e.params,2),a=r[0],c=r[1],o=e.prefix.user,i=ct(c),s=i?ot(c):c,u=at(n);return{message:s,messageArray:At(s,u.emotes,Nt(t)),tags:u,user:o,channel:a.slice(1),isAction:i,isHistory:!0}}))},Bt=Object(p.a)((_t={},Object(l.a)(_t,Ut,(function(e,t){var n=t.payload,r=n.channel,a=Object(fe.a)([],[r,"items"],e);return Ft({},e,Object(l.a)({},r,Ft({},e[r],{items:It([].concat(Object(Y.a)(a),Object(Y.a)(n.items)))})))})),Object(l.a)(_t,Object(z.a)(qt,Mt,zt),(function(e,t){var n=t.type,r=t.payload,a=r.channel;if(n===qt.toString()){var c=Object(fe.a)([],[a,"items"],e);return Ft({},e,Object(l.a)({},a,Ft({},e[a],{history:{isLoading:!0,isLoaded:!1,isError:!1,error:null},items:c})))}return n===Mt.toString()?Ft({},e,Object(l.a)({},a,Ft({},e[a],{history:{isLoading:!1,isLoaded:!0,isError:!1,error:null},items:It([].concat(Object(Y.a)(r.items),Object(Y.a)(e[a].items)))}))):n===zt.toString()?Ft({},e,Object(l.a)({},a,Ft({},e[a],{history:{isLoading:!1,isLoaded:!1,isError:!0,error:r.error}}))):e})),_t),{}),Vt=Object(s.c)({auth:C,chat:M,emotes:ke,messages:Bt}),Qt=Object(s.e)(Vt,{},Object(s.d)(Object(s.a)(u.a),window.__REDUX_DEVTOOLS_EXTENSION__?window.__REDUX_DEVTOOLS_EXTENSION__():function(e){return e})),Wt=n(16),Jt=n(65),Zt=n(41),Xt=function(){var e=Object(a.useState)(window.location.hash),t=Object(Ce.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){var e=function(){return r(window.location.hash)};return window.addEventListener("hashchange",e),function(){return window.removeEventListener("hashchange",e)}}),[]),n},Yt=function(e){return e.split(" ").map((function(e){if(":"!==e[0]||":"!==e[e.length-1])return e;var t=e.slice(1,-1),n=dt[t];return n&&n.char?n.char:e})).join(" ")},Kt=n(9),$t=n(10),en=n(166);function tn(){var e=Object(Kt.a)(["\n  display: block;\n  padding: 10px;\n  width: 100%;\n  height: 38px;\n  max-height: 91px;\n  min-height: 40px;\n  overflow: hidden;\n  border: 2px solid transparent;\n  background-color: #262626;\n  font-family: inherit;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 4px;\n  outline: none;\n  color: #fff;\n  resize: none;\n  transition-duration: 0.1s;\n  transition-timing-function: ease-in;\n  transition-property: box-shadow, border, background-color;\n\n  &:focus {\n    background-color: #000;\n    border-color: #9147ff;\n  }\n\n  &[disabled] {\n    opacity: 0.5;\n    pointer-events: none;\n  }\n"]);return tn=function(){return e},e}function nn(){var e=Object(Kt.a)(["\n  padding: 0 10px;\n  height: 30px;\n  border: none;\n  color: #fff;\n  background-color: #9147ff;\n  outline: none;\n  font-size: 12px;\n  border-radius: 4px;\n  cursor: pointer;\n\n  &:hover {\n    background-color: #772ce8;\n  }\n\n  &:active {\n    background-color: #5c16c5;\n  }\n\n  &:focus {\n    box-shadow: 0 0 6px 0 #772ce8;\n  }\n\n  &[disabled] {\n    background-color: rgba(255, 255, 255, 0.26);\n    color: rgba(255, 255, 255, 0.8);\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n"]);return nn=function(){return e},e}function rn(){var e=Object(Kt.a)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: center;\n\n  & > :not(:last-child) {\n    margin-right: 20px;\n  }\n\n  a {\n    color: #bf94ff;\n    text-decoration: none;\n\n    &:focus,\n    &:hover {\n      color: #a970ff;\n      text-decoration: underline;\n    }\n\n    &:visited {\n      color: #a970ff;\n    }\n  }\n"]);return rn=function(){return e},e}function an(){var e=Object(Kt.a)(["\n  padding-left: 10px;\n  padding-right: 10px;\n  padding-bottom: 10px;\n  background-color: #000;\n\n  & > :not(:last-child) {\n    margin-bottom: 10px;\n  }\n"]);return an=function(){return e},e}var cn=$t.c.form(an()),on=$t.c.div(rn()),sn=$t.c.button(nn()),un=$t.c.textarea(tn()),ln=function(e){var t=e.isAuth,n=e.isDisabled,r=e.onSubmit,o=Object(a.useRef)(null),i=Object(a.useState)(""),s=Object(Ce.a)(i,2),u=s[0],l=s[1],f=Object(a.useCallback)((function(e){if("Enter"===e.key){e.preventDefault();var t=u.trim();t&&(r(t),l(""))}}),[r,l,u]);return Object(a.useEffect)((function(){var e=o.current;return e.addEventListener("keydown",f,!1),function(){e.removeEventListener("keydown",f,!1)}}),[f]),c.a.createElement(cn,{onSubmit:function(e){e.preventDefault(),r(u),l("")}},c.a.createElement(un,{placeholder:"Send a message",ref:o,maxLength:500,disabled:n,onChange:function(e){return l(e.target.value)},value:u}),c.a.createElement(on,null,!t&&c.a.createElement(Jt.b,{to:"/chat/auth"},"Sign in with Twitch"),c.a.createElement(sn,{disabled:n,type:"submit"},"Chat")))};ln.defaultProps={isDisabled:!1};var fn=ln;function bn(){var e=Object(Kt.a)(["\n  color: #bf94ff;\n  text-decoration: none;\n\n  &:focus,\n  &:hover {\n    color: #a970ff;\n    text-decoration: underline;\n  }\n\n  &:visited {\n    color: #a970ff;\n  }\n"]);return bn=function(){return e},e}function dn(){var e=Object(Kt.a)([""]);return dn=function(){return e},e}function hn(){var e=Object(Kt.a)(["\n  display: inline-block;\n  margin-top: -5px;\n  margin-bottom: -4px;\n  width: 20px;\n  height: auto;\n  vertical-align: middle;\n"]);return hn=function(){return e},e}function pn(){var e=Object(Kt.a)(["\n  display: inline-block;\n  margin: -5px 0;\n  vertical-align: middle;\n"]);return pn=function(){return e},e}function On(){var e=Object(Kt.a)(["\n  font-weight: bold;\n  color: ",";\n"]);return On=function(){return e},e}function mn(){var e=Object(Kt.a)(["\n  padding: 5px 20px;\n  color: ",";\n  opacity: ",";\n  line-height: 20px;\n  word-wrap: break-word;\n\n  &:nth-child(even) {\n    background-color: #1f1925;\n  }\n"]);return mn=function(){return e},e}var gn=$t.c.div(mn(),(function(e){return e.isAction?e.color:"#fff"}),(function(e){return e.isHistory?"0.5":"1"})),vn=$t.c.span(On(),(function(e){return e.color})),jn=$t.c.img(pn()),En=$t.c.img(hn()),yn=$t.c.span(dn()),Sn=$t.c.a.attrs({rel:"noreferrer noopener",target:"_blank"})(bn()),_n=(ft.a.shape({badgeInfo:ft.a.shape({subscriber:ft.a.number}),badges:ft.a.shape({}),color:ft.a.string.isRequired,displayName:ft.a.string.isRequired,emotes:ft.a.shape({}),flags:ft.a.string,id:ft.a.string,mod:ft.a.bool,roomId:ft.a.string,tmiSentId:ft.a.oneOfType([ft.a.string,ft.a.number]),userId:ft.a.string}),function(e,t){return"object"!==typeof e?e:"twitch-emote"===e.type||"bttv-emote"===e.type||"ffz-emote"===e.type?c.a.createElement(jn,{key:t,src:e.src,srcSet:e.srcSet,alt:e.alt}):"emoji"===e.type?c.a.createElement(En,{key:t,src:e.src,srcSet:e.srcSet,alt:e.alt}):"mention"===e.type?c.a.createElement(yn,{key:t},e.text):"link"===e.type?c.a.createElement(Sn,{key:t,href:e.href},e.text):null}),wn=function(e){var t=e.messageArray,n=e.tags,r=n.color,a=n.displayName,o=e.isHistory,i=e.isAction;return c.a.createElement(gn,{isHistory:o,isAction:i,color:r},c.a.createElement(vn,{color:r},a),!i&&":"," ",t.map(_n))};wn.defaultProps={isHistory:!1,isAction:!1};var Tn=wn;function kn(){var e=Object(Kt.a)(["\n  position: absolute;\n  left: 50%;\n  bottom: 10px;\n  display: ",";\n  padding: 5px 20px;\n  background: rgba(0, 0, 0, 0.6);\n  color: #fff;\n  border-radius: 4px;\n  border: none;\n  outline: none;\n  cursor: pointer;\n  transform: translateX(-50%);\n"]);return kn=function(){return e},e}function xn(){var e=Object(Kt.a)(["\n  overflow-y: auto;\n\n  .ScrollbarsCustom-TrackY {\n    background: none !important;\n  }\n\n  .ScrollbarsCustom-ThumbY {\n    margin-left: auto;\n    margin-right: auto;\n    width: 6px !important;\n  }\n\n  .ScrollbarsCustom-Content {\n    padding-bottom: 10px !important;\n  }\n"]);return xn=function(){return e},e}function Cn(){var e=Object(Kt.a)(["\n  position: relative;\n  flex-grow: 1;\n"]);return Cn=function(){return e},e}function Ln(){var e=Object(Kt.a)(["\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background-color: #000;\n"]);return Ln=function(){return e},e}function Rn(){var e=Object(Kt.a)(["\n  height: 100vh;\n  background-color: #222;\n  font-size: 12px;\n"]);return Rn=function(){return e},e}var Pn=$t.c.div(Rn()),An=$t.c.div(Ln()),Dn=$t.c.div(Cn()),Fn=Object($t.c)(en.a).attrs({disableTracksWidthCompensation:!0})(xn()),In=$t.c.button(kn(),(function(e){return e.visible?"block":"none"})),Nn=function(e){return Object(fe.a)([],["messages",e.chat.currentChannel,"items"],e)},Hn=function(e){var t=e.onSendMessage,n=Object(Wt.c)((function(e){return e.auth.isAuth})),r=Object(Wt.c)(Nn),o=Object(Wt.c)((function(e){return e.chat.isConnected})),i=Object(a.useState)(!1),s=Object(Ce.a)(i,2),u=s[0],l=s[1],f=Object(a.useRef)(null),b=function(){f.current&&f.current.scrollToBottom&&f.current.scrollToBottom()};Object(a.useEffect)((function(){u||b()}),[r]);return c.a.createElement(Pn,null,c.a.createElement(An,null,c.a.createElement(Dn,null,c.a.createElement(Fn,{onUpdate:function(e){var t=e.clientHeight,n=e.contentScrollHeight,r=e.scrollTop;l(r+100<n-t)},ref:f},r.map((function(e){var t=e.message,n=e.messageArray,r=e.tags,a=e.isAction,o=e.isHistory;return c.a.createElement(Tn,{key:r.id,message:t,messageArray:n,tags:r,isAction:a,isHistory:o})}))),c.a.createElement(In,{onClick:b,visible:u},"More messages below")),c.a.createElement(fn,{onSubmit:t,isDisabled:!n||!o,isAuth:n})))},Un=null,qn=function(e){return Object(fe.a)(null,["chat","channels",e.chat.currentChannel,"roomState","roomId"],e)},Mn=function(){var e=Object(Wt.b)(),t=Object(Wt.c)((function(e){return e.auth.isAuth})),n=Object(Wt.c)((function(e){return e.auth.user.login})),r=Object(Wt.c)((function(e){return e.chat.currentChannel})),o=Object(Wt.c)(qn),i=Object(Wt.c)(He),s=Object(Wt.c)((function(e){return e.auth.user.id})),u=Xt();Object(a.useEffect)((function(){var t=localStorage.getItem("user");if(t){var n=JSON.parse(t);e(w({isAuth:!0,user:n}))}}),[e]),Object(a.useEffect)((function(){if(u&&u.length>1){var t=u.slice(1);e(F(t)),localStorage.setItem("lastChannel",t)}}),[e,u]),Object(a.useEffect)((function(){document.title=r?"#".concat(r," - ").concat("Honey Chat"," "):"Honey Chat"}),[r]),Object(a.useEffect)((function(){if(r&&t){var a=function(t){var n,r={channel:t.channel,items:[t]};e((n=r,function(e,t){var r=n.items.map((function(e){var n=e.message,r=e.tags,a=Object(xe.a)(e,["message","tags"]);return Ft({message:n,messageArray:At(n,r.emotes,Nt(t())),tags:r},a)}));e(Ut(Ft({},n,{items:r})))}))},c={identity:{name:n,auth:localStorage.accessToken}};Un||(Un=new ut(c)).connect(),Un.join(r),Un.on("connected",(function(){return e(I(!0))})),Un.on("disconnected",(function(){return e(I(!1))})),Un.on("globaluserstate",(function(t){return e(N(t))})),Un.on("userstate",(function(t){return e(H(t))})),Un.on("roomstate",(function(t){return e(U(t))})),Un.on("part",(function(t){return e(q(t))})),Un.on("message",a),Un.on("own-message",a)}}),[e,n,r,t]),Object(a.useEffect)((function(){e(function(){var e=Object(d.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(ne()),e.prev=1,e.next=4,O("https://api.betterttv.net/3/cached/emotes/global");case 4:n=e.sent,t(re({items:n})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),t(ae({error:e.t0}));case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}()),e(function(){var e=Object(d.a)(b.a.mark((function e(t){var n,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(ge()),e.prev=1,e.next=4,O("https://api.frankerfacez.com/v1/set/global");case 4:n=e.sent,r={items:_e(n)},t(ve(r)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),t(je({error:e.t0}));case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}())}),[e]),Object(a.useEffect)((function(){var t;r&&i&&e((t=r,function(){var e=Object(d.a)(b.a.mark((function e(n,r){var a,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(qt({channel:t})),e.prev=1,e.next=4,E(t);case 4:a=e.sent,c={channel:t,items:Gt(a.messages,r())},n(Mt(c)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),n(zt({channel:t,error:e.t0}));case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t,n){return e.apply(this,arguments)}}()))}),[e,r,i]),Object(a.useEffect)((function(){s&&e(function(e){return function(){var t=Object(d.a)(b.a.mark((function t(n){var r,a;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(W),t.prev=1,t.next=4,g(e);case 4:r=t.sent,a={items:r.emoticon_sets},n(J(a)),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),n(Z(t.t0));case 12:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}()}(s))}),[e,s]),Object(a.useEffect)((function(){var t,n;r&&o&&(e((t=o,n=r,function(){var e=Object(d.a)(b.a.mark((function e(r){var a,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(ce({channel:n})),e.prev=1,e.next=4,v(t);case 4:a=e.sent,c={channel:n,items:se(a)},r(oe(c)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),r(ie({channel:n,error:e.t0}));case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}())),e(function(e,t){return function(){var n=Object(d.a)(b.a.mark((function n(r){var a,c;return b.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r(Ee({channel:t})),n.prev=1,n.next=4,j(e);case 4:a=n.sent,c={channel:t,items:we(a)},r(ye(c)),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(1),r(Se({channel:t,error:n.t0}));case 12:case"end":return n.stop()}}),n,null,[[1,9]])})));return function(e){return n.apply(this,arguments)}}()}(o,r)))}),[e,r,o]);return c.a.createElement(Hn,{onSendMessage:function(e){var t=Yt(e.trim());Un.say(r,t)}})},zn={client_id:"4e66w1po1tzf645r9vutn9qus05vg9x",redirect_uri:"https://honeykingdom.github.io/chat/",response_type:"token+id_token",scope:["openid","chat:edit","chat:read","user_blocks_read","user_blocks_edit","user_subscriptions"].join("+"),claims:JSON.stringify({id_token:{email_verified:null,picture:null,preferred_username:null}})},Gn=function(){var e=Object.entries(zn).map((function(e){var t=Object(Ce.a)(e,2),n=t[0],r=t[1];return"".concat(n,"=").concat(r)})).join("&");return"".concat("https://id.twitch.tv/oauth2/authorize","?").concat(e)},Bn=function(){return window.location.href=Gn(),null},Vn=n(172),Qn=n.n(Vn),Wn=function(){var e=Object(Wt.b)(),t=Object(Zt.f)();if(!window.location.hash)return null;var n=new URLSearchParams(window.location.hash.slice(1)),r=n.get("access_token"),a=n.get("id_token");if(!r||!a)return null;localStorage.setItem("accessToken",r),localStorage.setItem("idToken",a),e(function(e){return function(){var t=Object(d.a)(b.a.mark((function t(n){var r,a,c,o,i;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(T()),t.prev=1,t.next=4,m(e);case 4:r=t.sent,a=r.data[0],c=a.login,o=a.display_name,i={id:e,login:c,displayName:o},localStorage.setItem("user",JSON.stringify(i)),n(k(i)),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(1),n(x(t.t0));case 14:case"end":return t.stop()}}),t,null,[[1,11]])})));return function(e){return t.apply(this,arguments)}}()}(Qn.a.decode(a).sub));var c=localStorage.getItem("lastChannel");return t.push(c?"/chat/#".concat(c):"/chat/"),null};function Jn(){var e=Object(Kt.a)(["\n  * {\n    box-sizing: border-box;\n  }\n  body {\n    margin: 0;\n    font-family: Roobert, Helvetica Neue, Helvetica, Arial, sans-serif;\n  }\n"]);return Jn=function(){return e},e}var Zn=Object($t.b)(Jn());function Xn(){var e=Object(Kt.a)([""]);return Xn=function(){return e},e}var Yn=Object($t.b)(Xn());function Kn(){var e=Object(Kt.a)([""]);return Kn=function(){return e},e}var $n=Object($t.b)(Kn());function er(){var e=Object(Kt.a)(["\n  :root {\n    ",";\n    ",";\n  }\n  ",";\n"]);return er=function(){return e},e}var tr=Object($t.a)(er(),Yn,$n,Zn),nr=function(e){var t=e.store;return c.a.createElement(c.a.Fragment,null,c.a.createElement(Wt.a,{store:t},c.a.createElement(Jt.a,null,c.a.createElement(Zt.c,null,c.a.createElement(Zt.a,{exact:!0,path:"/chat/",component:window.location.hash.startsWith("#access_token=")?Wn:Mn}),c.a.createElement(Zt.a,{exact:!0,path:"/chat/auth",component:Bn})))),c.a.createElement(tr,null))};i.a.render(c.a.createElement(nr,{store:Qt}),document.getElementById("root"))}},[[178,1,2]]]);
//# sourceMappingURL=main.cc395caf.chunk.js.map