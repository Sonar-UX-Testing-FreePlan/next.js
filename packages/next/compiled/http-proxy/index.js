(()=>{var e={993:e=>{"use strict";var t=Object.prototype.hasOwnProperty,r="~";function Events(){}if(Object.create){Events.prototype=Object.create(null);if(!(new Events).__proto__)r=false}function EE(e,t,r){this.fn=e;this.context=t;this.once=r||false}function addListener(e,t,o,s,n){if(typeof o!=="function"){throw new TypeError("The listener must be a function")}var i=new EE(o,s||e,n),a=r?r+t:t;if(!e._events[a])e._events[a]=i,e._eventsCount++;else if(!e._events[a].fn)e._events[a].push(i);else e._events[a]=[e._events[a],i];return e}function clearEvent(e,t){if(--e._eventsCount===0)e._events=new Events;else delete e._events[t]}function EventEmitter(){this._events=new Events;this._eventsCount=0}EventEmitter.prototype.eventNames=function eventNames(){var e=[],o,s;if(this._eventsCount===0)return e;for(s in o=this._events){if(t.call(o,s))e.push(r?s.slice(1):s)}if(Object.getOwnPropertySymbols){return e.concat(Object.getOwnPropertySymbols(o))}return e};EventEmitter.prototype.listeners=function listeners(e){var t=r?r+e:e,o=this._events[t];if(!o)return[];if(o.fn)return[o.fn];for(var s=0,n=o.length,i=new Array(n);s<n;s++){i[s]=o[s].fn}return i};EventEmitter.prototype.listenerCount=function listenerCount(e){var t=r?r+e:e,o=this._events[t];if(!o)return 0;if(o.fn)return 1;return o.length};EventEmitter.prototype.emit=function emit(e,t,o,s,n,i){var a=r?r+e:e;if(!this._events[a])return false;var c=this._events[a],u=arguments.length,h,f;if(c.fn){if(c.once)this.removeListener(e,c.fn,undefined,true);switch(u){case 1:return c.fn.call(c.context),true;case 2:return c.fn.call(c.context,t),true;case 3:return c.fn.call(c.context,t,o),true;case 4:return c.fn.call(c.context,t,o,s),true;case 5:return c.fn.call(c.context,t,o,s,n),true;case 6:return c.fn.call(c.context,t,o,s,n,i),true}for(f=1,h=new Array(u-1);f<u;f++){h[f-1]=arguments[f]}c.fn.apply(c.context,h)}else{var p=c.length,d;for(f=0;f<p;f++){if(c[f].once)this.removeListener(e,c[f].fn,undefined,true);switch(u){case 1:c[f].fn.call(c[f].context);break;case 2:c[f].fn.call(c[f].context,t);break;case 3:c[f].fn.call(c[f].context,t,o);break;case 4:c[f].fn.call(c[f].context,t,o,s);break;default:if(!h)for(d=1,h=new Array(u-1);d<u;d++){h[d-1]=arguments[d]}c[f].fn.apply(c[f].context,h)}}}return true};EventEmitter.prototype.on=function on(e,t,r){return addListener(this,e,t,r,false)};EventEmitter.prototype.once=function once(e,t,r){return addListener(this,e,t,r,true)};EventEmitter.prototype.removeListener=function removeListener(e,t,o,s){var n=r?r+e:e;if(!this._events[n])return this;if(!t){clearEvent(this,n);return this}var i=this._events[n];if(i.fn){if(i.fn===t&&(!s||i.once)&&(!o||i.context===o)){clearEvent(this,n)}}else{for(var a=0,c=[],u=i.length;a<u;a++){if(i[a].fn!==t||s&&!i[a].once||o&&i[a].context!==o){c.push(i[a])}}if(c.length)this._events[n]=c.length===1?c[0]:c;else clearEvent(this,n)}return this};EventEmitter.prototype.removeAllListeners=function removeAllListeners(e){var t;if(e){t=r?r+e:e;if(this._events[t])clearEvent(this,t)}else{this._events=new Events;this._eventsCount=0}return this};EventEmitter.prototype.off=EventEmitter.prototype.removeListener;EventEmitter.prototype.addListener=EventEmitter.prototype.on;EventEmitter.prefixed=r;EventEmitter.EventEmitter=EventEmitter;if(true){e.exports=EventEmitter}},504:(e,t,r)=>{var o;e.exports=function(){if(!o){try{o=r(937)("follow-redirects")}catch(e){}if(typeof o!=="function"){o=function(){}}}o.apply(null,arguments)}},733:(e,t,r)=>{var o=r(310);var s=o.URL;var n=r(685);var i=r(687);var a=r(781).Writable;var c=r(491);var u=r(504);var h=["abort","aborted","connect","error","socket","timeout"];var f=Object.create(null);h.forEach((function(e){f[e]=function(t,r,o){this._redirectable.emit(e,t,r,o)}}));var p=createErrorType("ERR_INVALID_URL","Invalid URL",TypeError);var d=createErrorType("ERR_FR_REDIRECTION_FAILURE","Redirected request failed");var l=createErrorType("ERR_FR_TOO_MANY_REDIRECTS","Maximum number of redirects exceeded");var v=createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED","Request body larger than maxBodyLength limit");var m=createErrorType("ERR_STREAM_WRITE_AFTER_END","write after end");function RedirectableRequest(e,t){a.call(this);this._sanitizeOptions(e);this._options=e;this._ended=false;this._ending=false;this._redirectCount=0;this._redirects=[];this._requestBodyLength=0;this._requestBodyBuffers=[];if(t){this.on("response",t)}var r=this;this._onNativeResponse=function(e){r._processResponse(e)};this._performRequest()}RedirectableRequest.prototype=Object.create(a.prototype);RedirectableRequest.prototype.abort=function(){abortRequest(this._currentRequest);this.emit("abort")};RedirectableRequest.prototype.write=function(e,t,r){if(this._ending){throw new m}if(!isString(e)&&!isBuffer(e)){throw new TypeError("data should be a string, Buffer or Uint8Array")}if(isFunction(t)){r=t;t=null}if(e.length===0){if(r){r()}return}if(this._requestBodyLength+e.length<=this._options.maxBodyLength){this._requestBodyLength+=e.length;this._requestBodyBuffers.push({data:e,encoding:t});this._currentRequest.write(e,t,r)}else{this.emit("error",new v);this.abort()}};RedirectableRequest.prototype.end=function(e,t,r){if(isFunction(e)){r=e;e=t=null}else if(isFunction(t)){r=t;t=null}if(!e){this._ended=this._ending=true;this._currentRequest.end(null,null,r)}else{var o=this;var s=this._currentRequest;this.write(e,t,(function(){o._ended=true;s.end(null,null,r)}));this._ending=true}};RedirectableRequest.prototype.setHeader=function(e,t){this._options.headers[e]=t;this._currentRequest.setHeader(e,t)};RedirectableRequest.prototype.removeHeader=function(e){delete this._options.headers[e];this._currentRequest.removeHeader(e)};RedirectableRequest.prototype.setTimeout=function(e,t){var r=this;function destroyOnTimeout(t){t.setTimeout(e);t.removeListener("timeout",t.destroy);t.addListener("timeout",t.destroy)}function startTimer(t){if(r._timeout){clearTimeout(r._timeout)}r._timeout=setTimeout((function(){r.emit("timeout");clearTimer()}),e);destroyOnTimeout(t)}function clearTimer(){if(r._timeout){clearTimeout(r._timeout);r._timeout=null}r.removeListener("abort",clearTimer);r.removeListener("error",clearTimer);r.removeListener("response",clearTimer);if(t){r.removeListener("timeout",t)}if(!r.socket){r._currentRequest.removeListener("socket",startTimer)}}if(t){this.on("timeout",t)}if(this.socket){startTimer(this.socket)}else{this._currentRequest.once("socket",startTimer)}this.on("socket",destroyOnTimeout);this.on("abort",clearTimer);this.on("error",clearTimer);this.on("response",clearTimer);return this};["flushHeaders","getHeader","setNoDelay","setSocketKeepAlive"].forEach((function(e){RedirectableRequest.prototype[e]=function(t,r){return this._currentRequest[e](t,r)}}));["aborted","connection","socket"].forEach((function(e){Object.defineProperty(RedirectableRequest.prototype,e,{get:function(){return this._currentRequest[e]}})}));RedirectableRequest.prototype._sanitizeOptions=function(e){if(!e.headers){e.headers={}}if(e.host){if(!e.hostname){e.hostname=e.host}delete e.host}if(!e.pathname&&e.path){var t=e.path.indexOf("?");if(t<0){e.pathname=e.path}else{e.pathname=e.path.substring(0,t);e.search=e.path.substring(t)}}};RedirectableRequest.prototype._performRequest=function(){var e=this._options.protocol;var t=this._options.nativeProtocols[e];if(!t){this.emit("error",new TypeError("Unsupported protocol "+e));return}if(this._options.agents){var r=e.slice(0,-1);this._options.agent=this._options.agents[r]}var s=this._currentRequest=t.request(this._options,this._onNativeResponse);s._redirectable=this;for(var n of h){s.on(n,f[n])}this._currentUrl=/^\//.test(this._options.path)?o.format(this._options):this._options.path;if(this._isRedirect){var i=0;var a=this;var c=this._requestBodyBuffers;(function writeNext(e){if(s===a._currentRequest){if(e){a.emit("error",e)}else if(i<c.length){var t=c[i++];if(!s.finished){s.write(t.data,t.encoding,writeNext)}}else if(a._ended){s.end()}}})()}};RedirectableRequest.prototype._processResponse=function(e){var t=e.statusCode;if(this._options.trackRedirects){this._redirects.push({url:this._currentUrl,headers:e.headers,statusCode:t})}var r=e.headers.location;if(!r||this._options.followRedirects===false||t<300||t>=400){e.responseUrl=this._currentUrl;e.redirects=this._redirects;this.emit("response",e);this._requestBodyBuffers=[];return}abortRequest(this._currentRequest);e.destroy();if(++this._redirectCount>this._options.maxRedirects){this.emit("error",new l);return}var s;var n=this._options.beforeRedirect;if(n){s=Object.assign({Host:e.req.getHeader("host")},this._options.headers)}var i=this._options.method;if((t===301||t===302)&&this._options.method==="POST"||t===303&&!/^(?:GET|HEAD)$/.test(this._options.method)){this._options.method="GET";this._requestBodyBuffers=[];removeMatchingHeaders(/^content-/i,this._options.headers)}var a=removeMatchingHeaders(/^host$/i,this._options.headers);var c=o.parse(this._currentUrl);var h=a||c.host;var f=/^\w+:/.test(r)?this._currentUrl:o.format(Object.assign(c,{host:h}));var p;try{p=o.resolve(f,r)}catch(e){this.emit("error",new d({cause:e}));return}u("redirecting to",p);this._isRedirect=true;var v=o.parse(p);Object.assign(this._options,v);if(v.protocol!==c.protocol&&v.protocol!=="https:"||v.host!==h&&!isSubdomain(v.host,h)){removeMatchingHeaders(/^(?:authorization|cookie)$/i,this._options.headers)}if(isFunction(n)){var m={headers:e.headers,statusCode:t};var _={url:f,method:i,headers:s};try{n(this._options,m,_)}catch(e){this.emit("error",e);return}this._sanitizeOptions(this._options)}try{this._performRequest()}catch(e){this.emit("error",new d({cause:e}))}};function wrap(e){var t={maxRedirects:21,maxBodyLength:10*1024*1024};var r={};Object.keys(e).forEach((function(n){var i=n+":";var a=r[i]=e[n];var h=t[n]=Object.create(a);function request(e,n,a){if(isString(e)){var h;try{h=urlToOptions(new s(e))}catch(t){h=o.parse(e)}if(!isString(h.protocol)){throw new p({input:e})}e=h}else if(s&&e instanceof s){e=urlToOptions(e)}else{a=n;n=e;e={protocol:i}}if(isFunction(n)){a=n;n=null}n=Object.assign({maxRedirects:t.maxRedirects,maxBodyLength:t.maxBodyLength},e,n);n.nativeProtocols=r;if(!isString(n.host)&&!isString(n.hostname)){n.hostname="::1"}c.equal(n.protocol,i,"protocol mismatch");u("options",n);return new RedirectableRequest(n,a)}function get(e,t,r){var o=h.request(e,t,r);o.end();return o}Object.defineProperties(h,{request:{value:request,configurable:true,enumerable:true,writable:true},get:{value:get,configurable:true,enumerable:true,writable:true}})}));return t}function noop(){}function urlToOptions(e){var t={protocol:e.protocol,hostname:e.hostname.startsWith("[")?e.hostname.slice(1,-1):e.hostname,hash:e.hash,search:e.search,pathname:e.pathname,path:e.pathname+e.search,href:e.href};if(e.port!==""){t.port=Number(e.port)}return t}function removeMatchingHeaders(e,t){var r;for(var o in t){if(e.test(o)){r=t[o];delete t[o]}}return r===null||typeof r==="undefined"?undefined:String(r).trim()}function createErrorType(e,t,r){function CustomError(r){Error.captureStackTrace(this,this.constructor);Object.assign(this,r||{});this.code=e;this.message=this.cause?t+": "+this.cause.message:t}CustomError.prototype=new(r||Error);CustomError.prototype.constructor=CustomError;CustomError.prototype.name="Error ["+e+"]";return CustomError}function abortRequest(e){for(var t of h){e.removeListener(t,f[t])}e.on("error",noop);e.abort()}function isSubdomain(e,t){c(isString(e)&&isString(t));var r=e.length-t.length-1;return r>0&&e[r]==="."&&e.endsWith(t)}function isString(e){return typeof e==="string"||e instanceof String}function isFunction(e){return typeof e==="function"}function isBuffer(e){return typeof e==="object"&&"length"in e}e.exports=wrap({http:n,https:i});e.exports.wrap=wrap},905:(e,t,r)=>{
/*!
 * Caron dimonio, con occhi di bragia
 * loro accennando, tutte le raccoglie;
 * batte col remo qualunque s’adagia 
 *
 * Charon the demon, with the eyes of glede,
 * Beckoning to them, collects them all together,
 * Beats with his oar whoever lags behind
 *          
 *          Dante - The Divine Comedy (Canto III)
 */
e.exports=r(572)},572:(e,t,r)=>{var o=r(526).Server;function createProxyServer(e){return new o(e)}o.createProxyServer=createProxyServer;o.createServer=createProxyServer;o.createProxy=createProxyServer;e.exports=o},482:(e,t,r)=>{var o=t,s=r(310),n=r(837)._extend,i=r(85);var a=/(^|,)\s*upgrade\s*($|,)/i,c=/^https|wss/;o.isSSL=c;o.setupOutgoing=function(e,t,r,u){e.port=t[u||"target"].port||(c.test(t[u||"target"].protocol)?443:80);["host","hostname","socketPath","pfx","key","passphrase","cert","ca","ciphers","secureProtocol"].forEach((function(r){e[r]=t[u||"target"][r]}));e.method=t.method||r.method;e.headers=n({},r.headers);if(t.headers){n(e.headers,t.headers)}if(t.auth){e.auth=t.auth}if(t.ca){e.ca=t.ca}if(c.test(t[u||"target"].protocol)){e.rejectUnauthorized=typeof t.secure==="undefined"?true:t.secure}e.agent=t.agent||false;e.localAddress=t.localAddress;if(!e.agent){e.headers=e.headers||{};if(typeof e.headers.connection!=="string"||!a.test(e.headers.connection)){e.headers.connection="close"}}var h=t[u||"target"];var f=h&&t.prependPath!==false?h.path||"":"";var p=!t.toProxy?s.parse(r.url).path||"":r.url;p=!t.ignorePath?p:"";e.path=o.urlJoin(f,p);if(t.changeOrigin){e.headers.host=i(e.port,t[u||"target"].protocol)&&!hasPort(e.host)?e.host+":"+e.port:e.host}return e};o.setupSocket=function(e){e.setTimeout(0);e.setNoDelay(true);e.setKeepAlive(true,0);return e};o.getPort=function(e){var t=e.headers.host?e.headers.host.match(/:(\d+)/):"";return t?t[1]:o.hasEncryptedConnection(e)?"443":"80"};o.hasEncryptedConnection=function(e){return Boolean(e.connection.encrypted||e.connection.pair)};o.urlJoin=function(){var e=Array.prototype.slice.call(arguments),t=e.length-1,r=e[t],o=r.split("?"),s;e[t]=o.shift();s=[e.filter(Boolean).join("/").replace(/\/+/g,"/").replace("http:/","http://").replace("https:/","https://")];s.push.apply(s,o);return s.join("?")};o.rewriteCookieProperty=function rewriteCookieProperty(e,t,r){if(Array.isArray(e)){return e.map((function(e){return rewriteCookieProperty(e,t,r)}))}return e.replace(new RegExp("(;\\s*"+r+"=)([^;]+)","i"),(function(e,r,o){var s;if(o in t){s=t[o]}else if("*"in t){s=t["*"]}else{return e}if(s){return r+s}else{return""}}))};function hasPort(e){return!!~e.indexOf(":")}},526:(e,t,r)=>{var o=e.exports,s=r(837)._extend,n=r(310).parse,i=r(993),a=r(685),c=r(687),u=r(727),h=r(40);o.Server=ProxyServer;function createRightProxy(e){return function(t){return function(r,o){var i=e==="ws"?this.wsPasses:this.webPasses,a=[].slice.call(arguments),c=a.length-1,u,h;if(typeof a[c]==="function"){h=a[c];c--}var f=t;if(!(a[c]instanceof Buffer)&&a[c]!==o){f=s({},t);s(f,a[c]);c--}if(a[c]instanceof Buffer){u=a[c]}["target","forward"].forEach((function(e){if(typeof f[e]==="string")f[e]=n(f[e])}));if(!f.target&&!f.forward){return this.emit("error",new Error("Must provide a proper URL as target"))}for(var p=0;p<i.length;p++){if(i[p](r,o,f,u,this,h)){break}}}}}o.createRightProxy=createRightProxy;function ProxyServer(e){i.call(this);e=e||{};e.prependPath=e.prependPath===false?false:true;this.web=this.proxyRequest=createRightProxy("web")(e);this.ws=this.proxyWebsocketRequest=createRightProxy("ws")(e);this.options=e;this.webPasses=Object.keys(u).map((function(e){return u[e]}));this.wsPasses=Object.keys(h).map((function(e){return h[e]}));this.on("error",this.onError,this)}r(837).inherits(ProxyServer,i);ProxyServer.prototype.onError=function(e){if(this.listeners("error").length===1){throw e}};ProxyServer.prototype.listen=function(e,t){var r=this,closure=function(e,t){r.web(e,t)};this._server=this.options.ssl?c.createServer(this.options.ssl,closure):a.createServer(closure);if(this.options.ws){this._server.on("upgrade",(function(e,t,o){r.ws(e,t,o)}))}this._server.listen(e,t);return this};ProxyServer.prototype.close=function(e){var t=this;if(this._server){this._server.close(done)}function done(){t._server=null;if(e){e.apply(null,arguments)}}};ProxyServer.prototype.before=function(e,t,r){if(e!=="ws"&&e!=="web"){throw new Error("type must be `web` or `ws`")}var o=e==="ws"?this.wsPasses:this.webPasses,s=false;o.forEach((function(e,r){if(e.name===t)s=r}));if(s===false)throw new Error("No such pass");o.splice(s,0,r)};ProxyServer.prototype.after=function(e,t,r){if(e!=="ws"&&e!=="web"){throw new Error("type must be `web` or `ws`")}var o=e==="ws"?this.wsPasses:this.webPasses,s=false;o.forEach((function(e,r){if(e.name===t)s=r}));if(s===false)throw new Error("No such pass");o.splice(s++,0,r)}},727:(e,t,r)=>{var o=r(685),s=r(687),n=r(867),i=r(482),a=r(733);n=Object.keys(n).map((function(e){return n[e]}));var c={http:o,https:s};
/*!
 * Array of passes.
 *
 * A `pass` is just a function that is executed on `req, res, options`
 * so that you can easily add new checks while still keeping the base
 * flexible.
 */e.exports={deleteLength:function deleteLength(e,t,r){if((e.method==="DELETE"||e.method==="OPTIONS")&&!e.headers["content-length"]){e.headers["content-length"]="0";delete e.headers["transfer-encoding"]}},timeout:function timeout(e,t,r){if(r.timeout){e.socket.setTimeout(r.timeout)}},XHeaders:function XHeaders(e,t,r){if(!r.xfwd)return;var o=e.isSpdy||i.hasEncryptedConnection(e);var s={for:e.connection.remoteAddress||e.socket.remoteAddress,port:i.getPort(e),proto:o?"https":"http"};["for","port","proto"].forEach((function(t){e.headers["x-forwarded-"+t]=(e.headers["x-forwarded-"+t]||"")+(e.headers["x-forwarded-"+t]?",":"")+s[t]}));e.headers["x-forwarded-host"]=e.headers["x-forwarded-host"]||e.headers["host"]||""},stream:function stream(e,t,r,o,s,u){s.emit("start",e,t,r.target||r.forward);var h=r.followRedirects?a:c;var f=h.http;var p=h.https;if(r.forward){var d=(r.forward.protocol==="https:"?p:f).request(i.setupOutgoing(r.ssl||{},r,e,"forward"));var l=createErrorHandler(d,r.forward);e.on("error",l);d.on("error",l);(r.buffer||e).pipe(d);if(!r.target){return t.end()}}var v=(r.target.protocol==="https:"?p:f).request(i.setupOutgoing(r.ssl||{},r,e));v.on("socket",(function(o){if(s&&!v.getHeader("expect")){s.emit("proxyReq",v,e,t,r)}}));if(r.proxyTimeout){v.setTimeout(r.proxyTimeout,(function(){v.abort()}))}e.on("aborted",(function(){v.abort()}));var m=createErrorHandler(v,r.target);e.on("error",m);v.on("error",m);function createErrorHandler(r,o){return function proxyError(n){if(e.socket.destroyed&&n.code==="ECONNRESET"){s.emit("econnreset",n,e,t,o);return r.abort()}if(u){u(n,e,t,o)}else{s.emit("error",n,e,t,o)}}}(r.buffer||e).pipe(v);v.on("response",(function(o){if(s){s.emit("proxyRes",o,e,t)}if(!t.headersSent&&!r.selfHandleResponse){for(var i=0;i<n.length;i++){if(n[i](e,t,o,r)){break}}}if(!t.finished){o.on("end",(function(){if(s)s.emit("end",e,t,o)}));if(!r.selfHandleResponse)o.pipe(t)}else{if(s)s.emit("end",e,t,o)}}))}}},867:(e,t,r)=>{var o=r(310),s=r(482);var n=/^201|30(1|2|7|8)$/;
/*!
 * Array of passes.
 *
 * A `pass` is just a function that is executed on `req, res, options`
 * so that you can easily add new checks while still keeping the base
 * flexible.
 */e.exports={removeChunked:function removeChunked(e,t,r){if(e.httpVersion==="1.0"){delete r.headers["transfer-encoding"]}},setConnection:function setConnection(e,t,r){if(e.httpVersion==="1.0"){r.headers.connection=e.headers.connection||"close"}else if(e.httpVersion!=="2.0"&&!r.headers.connection){r.headers.connection=e.headers.connection||"keep-alive"}},setRedirectHostRewrite:function setRedirectHostRewrite(e,t,r,s){if((s.hostRewrite||s.autoRewrite||s.protocolRewrite)&&r.headers["location"]&&n.test(r.statusCode)){var i=o.parse(s.target);var a=o.parse(r.headers["location"]);if(i.host!=a.host){return}if(s.hostRewrite){a.host=s.hostRewrite}else if(s.autoRewrite){a.host=e.headers["host"]}if(s.protocolRewrite){a.protocol=s.protocolRewrite}r.headers["location"]=a.format()}},writeHeaders:function writeHeaders(e,t,r,o){var n=o.cookieDomainRewrite,i=o.cookiePathRewrite,a=o.preserveHeaderKeyCase,c,setHeader=function(e,r){if(r==undefined)return;if(n&&e.toLowerCase()==="set-cookie"){r=s.rewriteCookieProperty(r,n,"domain")}if(i&&e.toLowerCase()==="set-cookie"){r=s.rewriteCookieProperty(r,i,"path")}t.setHeader(String(e).trim(),r)};if(typeof n==="string"){n={"*":n}}if(typeof i==="string"){i={"*":i}}if(a&&r.rawHeaders!=undefined){c={};for(var u=0;u<r.rawHeaders.length;u+=2){var h=r.rawHeaders[u];c[h.toLowerCase()]=h}}Object.keys(r.headers).forEach((function(e){var t=r.headers[e];if(a&&c){e=c[e]||e}setHeader(e,t)}))},writeStatusCode:function writeStatusCode(e,t,r){if(r.statusMessage){t.statusCode=r.statusCode;t.statusMessage=r.statusMessage}else{t.statusCode=r.statusCode}}}},40:(e,t,r)=>{var o=r(685),s=r(687),n=r(482);
/*!
 * Array of passes.
 *
 * A `pass` is just a function that is executed on `req, socket, options`
 * so that you can easily add new checks while still keeping the base
 * flexible.
 */e.exports={checkMethodAndHeader:function checkMethodAndHeader(e,t){if(e.method!=="GET"||!e.headers.upgrade){t.destroy();return true}if(e.headers.upgrade.toLowerCase()!=="websocket"){t.destroy();return true}},XHeaders:function XHeaders(e,t,r){if(!r.xfwd)return;var o={for:e.connection.remoteAddress||e.socket.remoteAddress,port:n.getPort(e),proto:n.hasEncryptedConnection(e)?"wss":"ws"};["for","port","proto"].forEach((function(t){e.headers["x-forwarded-"+t]=(e.headers["x-forwarded-"+t]||"")+(e.headers["x-forwarded-"+t]?",":"")+o[t]}))},stream:function stream(e,t,r,i,a,c){var createHttpHeader=function(e,t){return Object.keys(t).reduce((function(e,r){var o=t[r];if(!Array.isArray(o)){e.push(r+": "+o);return e}for(var s=0;s<o.length;s++){e.push(r+": "+o[s])}return e}),[e]).join("\r\n")+"\r\n\r\n"};n.setupSocket(t);if(i&&i.length)t.unshift(i);var u=(n.isSSL.test(r.target.protocol)?s:o).request(n.setupOutgoing(r.ssl||{},r,e));if(a){a.emit("proxyReqWs",u,e,t,r,i)}u.on("error",onOutgoingError);u.on("response",(function(e){if(!e.upgrade){t.write(createHttpHeader("HTTP/"+e.httpVersion+" "+e.statusCode+" "+e.statusMessage,e.headers));e.pipe(t)}}));u.on("upgrade",(function(e,r,o){r.on("error",onOutgoingError);r.on("end",(function(){a.emit("close",e,r,o)}));t.on("error",(function(){r.end()}));n.setupSocket(r);if(o&&o.length)r.unshift(o);t.write(createHttpHeader("HTTP/1.1 101 Switching Protocols",e.headers));r.pipe(t).pipe(r);a.emit("open",r);a.emit("proxySocket",r)}));return u.end();function onOutgoingError(r){if(c){c(r,e,t)}else{a.emit("error",r,e,t)}t.end()}}}},85:e=>{"use strict";e.exports=function required(e,t){t=t.split(":")[0];e=+e;if(!e)return false;switch(t){case"http":case"ws":return e!==80;case"https":case"wss":return e!==443;case"ftp":return e!==21;case"gopher":return e!==70;case"file":return false}return e!==0}},491:e=>{"use strict";e.exports=require("assert")},685:e=>{"use strict";e.exports=require("http")},687:e=>{"use strict";e.exports=require("https")},937:e=>{"use strict";e.exports=require("next/dist/compiled/debug")},781:e=>{"use strict";e.exports=require("stream")},310:e=>{"use strict";e.exports=require("url")},837:e=>{"use strict";e.exports=require("util")}};var t={};function __nccwpck_require__(r){var o=t[r];if(o!==undefined){return o.exports}var s=t[r]={exports:{}};var n=true;try{e[r](s,s.exports,__nccwpck_require__);n=false}finally{if(n)delete t[r]}return s.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r=__nccwpck_require__(905);module.exports=r})();