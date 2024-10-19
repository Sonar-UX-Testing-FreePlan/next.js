(()=>{"use strict";var t={443:(t,e,i)=>{const s=i(401);const n=Symbol("max");const l=Symbol("length");const r=Symbol("lengthCalculator");const h=Symbol("allowStale");const a=Symbol("maxAge");const o=Symbol("dispose");const u=Symbol("noDisposeOnSet");const f=Symbol("lruList");const p=Symbol("cache");const v=Symbol("updateAgeOnGet");const naiveLength=()=>1;class LRUCache{constructor(t){if(typeof t==="number")t={max:t};if(!t)t={};if(t.max&&(typeof t.max!=="number"||t.max<0))throw new TypeError("max must be a non-negative number");const e=this[n]=t.max||Infinity;const i=t.length||naiveLength;this[r]=typeof i!=="function"?naiveLength:i;this[h]=t.stale||false;if(t.maxAge&&typeof t.maxAge!=="number")throw new TypeError("maxAge must be a number");this[a]=t.maxAge||0;this[o]=t.dispose;this[u]=t.noDisposeOnSet||false;this[v]=t.updateAgeOnGet||false;this.reset()}set max(t){if(typeof t!=="number"||t<0)throw new TypeError("max must be a non-negative number");this[n]=t||Infinity;trim(this)}get max(){return this[n]}set allowStale(t){this[h]=!!t}get allowStale(){return this[h]}set maxAge(t){if(typeof t!=="number")throw new TypeError("maxAge must be a non-negative number");this[a]=t;trim(this)}get maxAge(){return this[a]}set lengthCalculator(t){if(typeof t!=="function")t=naiveLength;if(t!==this[r]){this[r]=t;this[l]=0;this[f].forEach((t=>{t.length=this[r](t.value,t.key);this[l]+=t.length}))}trim(this)}get lengthCalculator(){return this[r]}get length(){return this[l]}get itemCount(){return this[f].length}rforEach(t,e){e=e||this;for(let i=this[f].tail;i!==null;){const s=i.prev;forEachStep(this,t,i,e);i=s}}forEach(t,e){e=e||this;for(let i=this[f].head;i!==null;){const s=i.next;forEachStep(this,t,i,e);i=s}}keys(){return this[f].toArray().map((t=>t.key))}values(){return this[f].toArray().map((t=>t.value))}reset(){if(this[o]&&this[f]&&this[f].length){this[f].forEach((t=>this[o](t.key,t.value)))}this[p]=new Map;this[f]=new s;this[l]=0}dump(){return this[f].map((t=>isStale(this,t)?false:{k:t.key,v:t.value,e:t.now+(t.maxAge||0)})).toArray().filter((t=>t))}dumpLru(){return this[f]}set(t,e,i){i=i||this[a];if(i&&typeof i!=="number")throw new TypeError("maxAge must be a number");const s=i?Date.now():0;const h=this[r](e,t);if(this[p].has(t)){if(h>this[n]){del(this,this[p].get(t));return false}const r=this[p].get(t);const a=r.value;if(this[o]){if(!this[u])this[o](t,a.value)}a.now=s;a.maxAge=i;a.value=e;this[l]+=h-a.length;a.length=h;this.get(t);trim(this);return true}const v=new Entry(t,e,h,s,i);if(v.length>this[n]){if(this[o])this[o](t,e);return false}this[l]+=v.length;this[f].unshift(v);this[p].set(t,this[f].head);trim(this);return true}has(t){if(!this[p].has(t))return false;const e=this[p].get(t).value;return!isStale(this,e)}get(t){return get(this,t,true)}peek(t){return get(this,t,false)}pop(){const t=this[f].tail;if(!t)return null;del(this,t);return t.value}del(t){del(this,this[p].get(t))}load(t){this.reset();const e=Date.now();for(let i=t.length-1;i>=0;i--){const s=t[i];const n=s.e||0;if(n===0)this.set(s.k,s.v);else{const t=n-e;if(t>0){this.set(s.k,s.v,t)}}}}prune(){this[p].forEach(((t,e)=>get(this,e,false)))}}const get=(t,e,i)=>{const s=t[p].get(e);if(s){const e=s.value;if(isStale(t,e)){del(t,s);if(!t[h])return undefined}else{if(i){if(t[v])s.value.now=Date.now();t[f].unshiftNode(s)}}return e.value}};const isStale=(t,e)=>{if(!e||!e.maxAge&&!t[a])return false;const i=Date.now()-e.now;return e.maxAge?i>e.maxAge:t[a]&&i>t[a]};const trim=t=>{if(t[l]>t[n]){for(let e=t[f].tail;t[l]>t[n]&&e!==null;){const i=e.prev;del(t,e);e=i}}};const del=(t,e)=>{if(e){const i=e.value;if(t[o])t[o](i.key,i.value);t[l]-=i.length;t[p].delete(i.key);t[f].removeNode(e)}};class Entry{constructor(t,e,i,s,n){this.key=t;this.value=e;this.length=i;this.now=s;this.maxAge=n||0}}const forEachStep=(t,e,i,s)=>{let n=i.value;if(isStale(t,n)){del(t,i);if(!t[h])n=undefined}if(n)e.call(s,n.value,n.key,t)};t.exports=LRUCache},414:t=>{t.exports=function(t){t.prototype[Symbol.iterator]=function*(){for(let t=this.head;t;t=t.next){yield t.value}}}},401:(t,e,i)=>{t.exports=Yallist;Yallist.Node=Node;Yallist.create=Yallist;function Yallist(t){var e=this;if(!(e instanceof Yallist)){e=new Yallist}e.tail=null;e.head=null;e.length=0;if(t&&typeof t.forEach==="function"){t.forEach((function(t){e.push(t)}))}else if(arguments.length>0){for(var i=0,s=arguments.length;i<s;i++){e.push(arguments[i])}}return e}Yallist.prototype.removeNode=function(t){if(t.list!==this){throw new Error("removing node which does not belong to this list")}var e=t.next;var i=t.prev;if(e){e.prev=i}if(i){i.next=e}if(t===this.head){this.head=e}if(t===this.tail){this.tail=i}t.list.length--;t.next=null;t.prev=null;t.list=null;return e};Yallist.prototype.unshiftNode=function(t){if(t===this.head){return}if(t.list){t.list.removeNode(t)}var e=this.head;t.list=this;t.next=e;if(e){e.prev=t}this.head=t;if(!this.tail){this.tail=t}this.length++};Yallist.prototype.pushNode=function(t){if(t===this.tail){return}if(t.list){t.list.removeNode(t)}var e=this.tail;t.list=this;t.prev=e;if(e){e.next=t}this.tail=t;if(!this.head){this.head=t}this.length++};Yallist.prototype.push=function(){for(var t=0,e=arguments.length;t<e;t++){push(this,arguments[t])}return this.length};Yallist.prototype.unshift=function(){for(var t=0,e=arguments.length;t<e;t++){unshift(this,arguments[t])}return this.length};Yallist.prototype.pop=function(){if(!this.tail){return undefined}var t=this.tail.value;this.tail=this.tail.prev;if(this.tail){this.tail.next=null}else{this.head=null}this.length--;return t};Yallist.prototype.shift=function(){if(!this.head){return undefined}var t=this.head.value;this.head=this.head.next;if(this.head){this.head.prev=null}else{this.tail=null}this.length--;return t};Yallist.prototype.forEach=function(t,e){e=e||this;for(var i=this.head,s=0;i!==null;s++){t.call(e,i.value,s,this);i=i.next}};Yallist.prototype.forEachReverse=function(t,e){e=e||this;for(var i=this.tail,s=this.length-1;i!==null;s--){t.call(e,i.value,s,this);i=i.prev}};Yallist.prototype.get=function(t){for(var e=0,i=this.head;i!==null&&e<t;e++){i=i.next}if(e===t&&i!==null){return i.value}};Yallist.prototype.getReverse=function(t){for(var e=0,i=this.tail;i!==null&&e<t;e++){i=i.prev}if(e===t&&i!==null){return i.value}};Yallist.prototype.map=function(t,e){e=e||this;var i=new Yallist;for(var s=this.head;s!==null;){i.push(t.call(e,s.value,this));s=s.next}return i};Yallist.prototype.mapReverse=function(t,e){e=e||this;var i=new Yallist;for(var s=this.tail;s!==null;){i.push(t.call(e,s.value,this));s=s.prev}return i};Yallist.prototype.reduce=function(t,e){var i;var s=this.head;if(arguments.length>1){i=e}else if(this.head){s=this.head.next;i=this.head.value}else{throw new TypeError("Reduce of empty list with no initial value")}for(var n=0;s!==null;n++){i=t(i,s.value,n);s=s.next}return i};Yallist.prototype.reduceReverse=function(t,e){var i;var s=this.tail;if(arguments.length>1){i=e}else if(this.tail){s=this.tail.prev;i=this.tail.value}else{throw new TypeError("Reduce of empty list with no initial value")}for(var n=this.length-1;s!==null;n--){i=t(i,s.value,n);s=s.prev}return i};Yallist.prototype.toArray=function(){var t=new Array(this.length);for(var e=0,i=this.head;i!==null;e++){t[e]=i.value;i=i.next}return t};Yallist.prototype.toArrayReverse=function(){var t=new Array(this.length);for(var e=0,i=this.tail;i!==null;e++){t[e]=i.value;i=i.prev}return t};Yallist.prototype.slice=function(t,e){e=e||this.length;if(e<0){e+=this.length}t=t||0;if(t<0){t+=this.length}var i=new Yallist;if(e<t||e<0){return i}if(t<0){t=0}if(e>this.length){e=this.length}for(var s=0,n=this.head;n!==null&&s<t;s++){n=n.next}for(;n!==null&&s<e;s++,n=n.next){i.push(n.value)}return i};Yallist.prototype.sliceReverse=function(t,e){e=e||this.length;if(e<0){e+=this.length}t=t||0;if(t<0){t+=this.length}var i=new Yallist;if(e<t||e<0){return i}if(t<0){t=0}if(e>this.length){e=this.length}for(var s=this.length,n=this.tail;n!==null&&s>e;s--){n=n.prev}for(;n!==null&&s>t;s--,n=n.prev){i.push(n.value)}return i};Yallist.prototype.splice=function(t,e,...i){if(t>this.length){t=this.length-1}if(t<0){t=this.length+t}for(var s=0,n=this.head;n!==null&&s<t;s++){n=n.next}var l=[];for(var s=0;n&&s<e;s++){l.push(n.value);n=this.removeNode(n)}if(n===null){n=this.tail}if(n!==this.head&&n!==this.tail){n=n.prev}for(var s=0;s<i.length;s++){n=insert(this,n,i[s])}return l};Yallist.prototype.reverse=function(){var t=this.head;var e=this.tail;for(var i=t;i!==null;i=i.prev){var s=i.prev;i.prev=i.next;i.next=s}this.head=e;this.tail=t;return this};function insert(t,e,i){var s=e===t.head?new Node(i,null,e,t):new Node(i,e,e.next,t);if(s.next===null){t.tail=s}if(s.prev===null){t.head=s}t.length++;return s}function push(t,e){t.tail=new Node(e,t.tail,null,t);if(!t.head){t.head=t.tail}t.length++}function unshift(t,e){t.head=new Node(e,null,t.head,t);if(!t.tail){t.tail=t.head}t.length++}function Node(t,e,i,s){if(!(this instanceof Node)){return new Node(t,e,i,s)}this.list=s;this.value=t;if(e){e.next=this;this.prev=e}else{this.prev=null}if(i){i.prev=this;this.next=i}else{this.next=null}}try{i(414)(Yallist)}catch(t){}}};var e={};function __nccwpck_require__(i){var s=e[i];if(s!==undefined){return s.exports}var n=e[i]={exports:{}};var l=true;try{t[i](n,n.exports,__nccwpck_require__);l=false}finally{if(l)delete e[i]}return n.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var i=__nccwpck_require__(443);module.exports=i})();