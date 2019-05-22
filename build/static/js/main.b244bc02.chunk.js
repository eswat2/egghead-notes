(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{150:function(e,t,a){e.exports=a(376)},375:function(e,t,a){},376:function(e,t,a){"use strict";a.r(t);a(151);var n=a(1),l=a.n(n),r=a(47),c=a.n(r),o=function(e){var t=e.salute,a=e.message;return l.a.createElement("div",{className:"alert alert-danger",role:"alert"},l.a.createElement("strong",null,t,":")," ",a)},u=a(12),s=a(2),i={error:Object(s.l)({value:!1}),username:Object(s.l)({value:null}),bio:Object(s.l)({value:{}}),repos:Object(s.l)({value:[]}),notes:Object(s.l)({value:[]}),tags:Object(s.l)({value:[]}),kounter:Object(s.l)({value:100}),ktype:Object(s.l)({value:"warning"}),keys:Object(s.l)({value:[]}),popState:Object(s.l)({value:null})},m=Object(u.a)(function(){var e=i.error.value;return l.a.createElement("div",{className:"container"},!0===e?l.a.createElement(o,{salute:"Error",message:"user does not exist..."}):null)}),p=a(149),f=null,d=function(){f.send(JSON.stringify({type:"KEYS"}))};(f=new WebSocket("wss://fire-notes.herokuapp.com")).onopen=function(e){console.log("-- wss: Open"),P.initStore(),P.startKlock(),d()},f.onclose=function(e){console.log("-- wss: Close"),P.offline()},f.onmessage=function(e){!function(e){if("ping"===e.data)P.ping();else{console.log("-- wss: "+e.data);var t=JSON.parse(e.data);P.newData(t)}}(e)},f.onerror=function(e){console.log("-- wss: Error")};var v={get:function(e){f.send(JSON.stringify({type:"GET",id:e}))},keys:d,update:function(e,t){f.send(JSON.stringify({type:"POST",id:e,value:t}))}},g=a(77),b=a.n(g);function E(e){return b.a.get("https://api.github.com/users/".concat(e,"/repos"))}function h(e){return b.a.get("https://api.github.com/users/".concat(e))}Object(s.f)({enforceActions:!0});var N=Object(s.d)("-- updateUser",function(e){var t=e.toLowerCase();console.log("-- updateUser:  ".concat(t)),i.username.value=t}),O=Object(s.d)("-- addNote",function(e){v.update(i.username.value,e)}),y=Object(s.d)("-- initStore",function(){var e,t,a=function(e,t){return e?t&&t!==e?t:e:null}(localStorage.getItem("AppStore.username"),(e=location.pathname,t="/profile/",-1!==e.indexOf(t)?e.slice(e.indexOf(t)+t.length):null));console.log("-- initStore:  ".concat(a)),i.username.value=a?a.toLowerCase():null,i.kounter.value=0,i.ktype.value="info"}),j=0,S=0,k=null,w=Object(s.d)("-- ping",function(){var e=i.kounter.value;5===j?(j=0,i.kounter.value=100===e?0:e+1):j++,S++}),R=Object(s.d)("-- offline",function(){i.kounter.value=100,i.ktype.value="danger"}),_=Object(s.d)("-- newData",function(e){"KEYS"===e.type&&(i.keys.value=e.keys),"DATA"===e.type&&e.id===i.username.value&&(i.notes.value=e.values)}),U=Object(s.d)("-- setPopState",function(e){i.popState.value=e}),C=0,L=Object(s.d)("-- verifyWSS",function(){S>0&&S!==C?C=S:(clearInterval(k),R())}),A=Object(s.d)("-- pushState",function(e){null===i.popState.value?history.pushState({username:e},e,"/profile/".concat(e)):i.popState.value=null}),I=Object(s.d)("-- fetchNotes",function(e){console.log("-- fetchNotes:  ".concat(e)),i.notes.value=[],e&&v.get(e)}),x=Object(s.d)("-- newUserInfo",function(e,t){if(i.bio.value=t.bio,i.repos.value=t.repos,i.error.value=t.error,!i.error.value&&(function(e){null!==e&&(console.log("-- saveUser:  ".concat(e)),localStorage.setItem("AppStore.username",e))}(e),A(e),!i.tags.value.includes(e))){var a=[].concat(Object(p.a)(i.tags.value),[e]).sort();i.tags.value=a}}),D=Object(s.d)("-- fetchGithub",function(e){console.log("-- fetchGithub:  ".concat(e)),i.bio.value={},i.repos.value=[],e?function(e){return b.a.all([E(e),h(e)]).then(function(e){return{repos:e[0].data,bio:e[1].data,error:!1}}).catch(function(e){return{repos:[],bio:{},error:!0,fault:e}})}(e).then(function(t){x(e,t)}):i.popState.value=null}),J=Object(s.d)("-- popHandler",function(e){e&&N(e.username)}),P=(Object(s.e)(function(){return D(i.username.value)}),Object(s.e)(function(){return I(i.username.value)}),Object(s.e)(function(){return J(i.popState.value)}),{addNote:O,initStore:y,newData:_,newUserInfo:x,offline:R,ping:w,setPopState:U,startKlock:function(){k=setInterval(function(){L()},1e4)},updateUser:N}),T={marginRight:2,marginTop:2,display:"inline-block",padding:5,paddingRight:6,paddingLeft:6,cursor:"pointer"},G=Object(u.a)(function(){var e=i.keys.value;return l.a.createElement("div",null,e.map(function(e,t){return l.a.createElement("span",{className:"label label-primary",style:T,key:t,onClick:function(){return P.updateUser(e)}},e)}))}),B={marginBottom:10},K=function(){return l.a.createElement("div",{className:"container",style:B},l.a.createElement(G,null))},W={marginRight:2,marginTop:2,display:"inline-block",padding:5,paddingRight:6,paddingLeft:6,cursor:"pointer"},F=Object(u.a)(function(){var e=i.tags.value;return l.a.createElement("div",null,e.map(function(e,t){return l.a.createElement("span",{className:"label label-info",style:W,key:t,onClick:function(){return P.updateUser(e)}},e)}))}),Y=function(e){var t=e.salute,a=e.message;return l.a.createElement("div",{className:"alert alert-success",role:"alert"},l.a.createElement("strong",null,t,":")," ",a)},H=function(){return l.a.createElement("div",{className:"container"},l.a.createElement(Y,{salute:"Welcome",message:"search for a Github user..."}),l.a.createElement(F,null))},q=Object(u.a)(function(){var e=i.repos.value;return l.a.createElement("div",null,l.a.createElement("h3",null,"User Repos"),l.a.createElement("ul",{className:"list-group"},e.map(function(e,t){return l.a.createElement("li",{className:"list-group-item",key:t},e.html_url&&l.a.createElement("h4",null,l.a.createElement("a",{href:e.html_url},e.name)),e.description&&l.a.createElement("p",null,e.description))})))}),z=function(e){return null!==e&&e>0},M=Object(u.a)(function(){var e=i.bio.value;return l.a.createElement("div",null,l.a.createElement("h3",null,"User Profile"),e.avatar_url&&l.a.createElement("li",{className:"list-group-item"}," ",l.a.createElement("img",{alt:"",src:e.avatar_url,className:"img-rounded img-responsive"})),e.name&&l.a.createElement("li",{className:"list-group-item"},"Name: ",e.name),e.login&&l.a.createElement("li",{className:"list-group-item"},"Username: ",e.login),e.email&&l.a.createElement("li",{className:"list-group-item"},"Email: ",e.email),e.location&&l.a.createElement("li",{className:"list-group-item"},"Location: ",e.location),e.company&&l.a.createElement("li",{className:"list-group-item"},"Company: ",e.company),z(e.followers)&&l.a.createElement("li",{className:"list-group-item"},"Followers: ",e.followers),z(e.following)&&l.a.createElement("li",{className:"list-group-item"},"Following: ",e.following),z(e.public_repos)&&l.a.createElement("li",{className:"list-group-item"},"Public Repos: ",e.public_repos),e.blog&&l.a.createElement("li",{className:"list-group-item"},"Blog: ",l.a.createElement("a",{href:e.blog}," ",e.blog)))}),Q=Object(u.a)(function(){var e=i.notes.value;return l.a.createElement("ul",{className:"list-group"},e.map(function(e,t){return l.a.createElement("li",{className:"list-group-item",key:t},e)}))}),V=a(72),X=a(73),Z=a(75),$=a(74),ee=a(76),te=function(e){function t(e){var a;return Object(V.a)(this,t),(a=Object(Z.a)(this,Object($.a)(t).call(this,e))).input=null,a.getRef=function(e){return a._getRef(e)},a.handleSubmit=function(e){return a._handleSubmit(e)},a}return Object(ee.a)(t,e),Object(X.a)(t,[{key:"render",value:function(){return l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement("div",{className:"input-group"},l.a.createElement("div",{className:"input-group-addon"},l.a.createElement("i",{className:"fa fa-chevron-right"})),l.a.createElement("input",{type:"text",className:"form-control",placeholder:"Note...",ref:this.getRef}),l.a.createElement("span",{className:"input-group-btn"},l.a.createElement("button",{className:"btn btn-warning",type:"submit"},"Add ",l.a.createElement("i",{className:"fa fa-sticky-note",style:{paddingLeft:5}})))))}},{key:"_getRef",value:function(e){this.input=e}},{key:"_handleSubmit",value:function(e){e.preventDefault();var t=this.input.value;this.input.value="",P.addNote(t)}}]),t}(l.a.Component),ae=Object(u.a)(function(){var e=i.username.value;return l.a.createElement("div",null,l.a.createElement("h3",null,"Notes for ",e," "),l.a.createElement(te,null),l.a.createElement(Q,null))}),ne=function(){return l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-4"},l.a.createElement(M,null)),l.a.createElement("div",{className:"col-md-4"},l.a.createElement(q,null)),l.a.createElement("div",{className:"col-md-4"},l.a.createElement(ae,null)))},le=Object(u.a)(function(){var e=i.bio.value;return l.a.createElement("div",{className:"container"},Object.keys(e).length>0?l.a.createElement(ne,null):null)}),re=Object(u.a)(function(){var e="progress-bar progress-bar-"+i.ktype.value;return l.a.createElement("div",{className:"progress",style:{height:2,borderRadius:0}},l.a.createElement("div",{className:e,role:"progressbar",style:{width:i.kounter.value+"%"}}))}),ce=function(e){function t(e){var a;return Object(V.a)(this,t),(a=Object(Z.a)(this,Object($.a)(t).call(this,e))).input=null,a.getRef=function(e){return a._getRef(e)},a.handleSubmit=function(e){return a._handleSubmit(e)},a}return Object(ee.a)(t,e),Object(X.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"col-sm-12"},l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement("div",{className:"form-group col-sm-12"},l.a.createElement("div",{className:"input-group"},l.a.createElement("div",{className:"input-group-addon"},l.a.createElement("i",{className:"fa fa-search"})),l.a.createElement("input",{type:"text",className:"form-control",ref:this.getRef,placeholder:"Username..."}),l.a.createElement("span",{className:"input-group-btn"},l.a.createElement("button",{className:"btn btn-primary",type:"submit"},"Search Github ",l.a.createElement("i",{className:"fa fa-github fa-lg",style:{paddingLeft:5}})))))))}},{key:"_getRef",value:function(e){this.input=e}},{key:"_handleSubmit",value:function(e){e.preventDefault();var t=this.input.value;this.input.value="",P.updateUser(t)}}]),t}(l.a.Component),oe=function(){return l.a.createElement("nav",{className:"navbar navbar-default",style:{marginBottom:0,borderRadius:0}},l.a.createElement("div",{className:"col-sm-7 col-sm-offset-2",style:{marginTop:15}},l.a.createElement(ce,null)))},ue=function(){return l.a.createElement("div",{className:"main-container"},l.a.createElement(oe,null),l.a.createElement(re,null),l.a.createElement(K,null),l.a.createElement(m,null),l.a.createElement(H,null),l.a.createElement(le,null))};window.addEventListener("popstate",function(e){var t=e.state&&e.state.username?e.state.username:null;console.log("-- popstate:  ".concat(t)),P.setPopState({username:t})}),console.log("-- App");var se=function(){return l.a.createElement(ue,null)};a(375);c.a.render(l.a.createElement(se,null),document.getElementById("root"))}},[[150,1,2]]]);
//# sourceMappingURL=main.b244bc02.chunk.js.map