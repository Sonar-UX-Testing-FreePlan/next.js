(()=>{var t={180:t=>{function n(t,i){for(var _ in i)t[_]=i[_];return t}t.exports=function(t){var i=[];function u(t){for(var _=[],a=0;a<i.length;a++)i[a]===t?t=null:_.push(i[a]);i=_}function e(_,a,f){t=a?_:n(n({},t),_);for(var o=i,c=0;c<o.length;c++)o[c](t,f)}return t=t||{},{action:function(i){function r(t){e(t,!1,i)}return function(){for(var _=arguments,a=[t],f=0;f<arguments.length;f++)a.push(_[f]);var o=i.apply(this,a);if(null!=o)return o.then?o.then(r):r(o)}},setState:e,subscribe:function(t){return i.push(t),function(){u(t)}},unsubscribe:u,getState:function(){return t}}}}};var i={};function __nccwpck_require__(_){var a=i[_];if(a!==undefined){return a.exports}var f=i[_]={exports:{}};var o=true;try{t[_](f,f.exports,__nccwpck_require__);o=false}finally{if(o)delete i[_]}return f.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var _=__nccwpck_require__(180);module.exports=_})();