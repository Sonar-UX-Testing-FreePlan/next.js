module.exports=(()=>{var e={407:e=>{"use strict";e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},523:(e,n,t)=>{"use strict";const r=t(546);const o=t(906);const c=t(888);const s=["",""];const l=e=>`${s[0]}[${e}m`;const a=(e,n,t)=>{let r=[];e=[...e];for(let t of e){const o=t;if(t.includes(";")){t=t.split(";")[0][0]+"0"}const s=c.codes.get(Number.parseInt(t,10));if(s){const t=e.indexOf(s.toString());if(t===-1){r.push(l(n?s:o))}else{e.splice(t,1)}}else if(n){r.push(l(0));break}else{r.push(l(o))}}if(n){r=r.filter((e,n)=>r.indexOf(e)===n);if(t!==undefined){const e=l(c.codes.get(Number.parseInt(t,10)));r=r.reduce((n,t)=>t===e?[t,...n]:[...n,t],[])}}return r.join("")};e.exports=((e,n,t)=>{const c=[...e];const l=[];let i=typeof t==="number"?t:c.length;let u=false;let f;let h=0;let b="";for(const[g,d]of c.entries()){let c=false;if(s.includes(d)){const n=/\d[^m]*/.exec(e.slice(g,g+18));f=n&&n.length>0?n[0]:undefined;if(h<i){u=true;if(f!==undefined){l.push(f)}}}else if(u&&d==="m"){u=false;c=true}if(!u&&!c){h++}if(!o({exact:true}).test(d)&&r(d.codePointAt())){h++;if(typeof t!=="number"){i++}}if(h>n&&h<=i){b+=d}else if(h===n&&!u&&f!==undefined){b=a(l)}else if(h>=i){b+=a(l,true,f);break}}return b})},888:(e,n,t)=>{"use strict";e=t.nmd(e);const r=(e,n)=>(...t)=>{const r=e(...t);return`[${r+n}m`};const o=(e,n)=>(...t)=>{const r=e(...t);return`[${38+n};5;${r}m`};const c=(e,n)=>(...t)=>{const r=e(...t);return`[${38+n};2;${r[0]};${r[1]};${r[2]}m`};const s=e=>e;const l=(e,n,t)=>[e,n,t];const a=(e,n,t)=>{Object.defineProperty(e,n,{get:()=>{const r=t();Object.defineProperty(e,n,{value:r,enumerable:true,configurable:true});return r},enumerable:true,configurable:true})};let i;const u=(e,n,r,o)=>{if(i===undefined){i=t(93)}const c=o?10:0;const s={};for(const[t,o]of Object.entries(i)){const l=t==="ansi16"?"ansi":t;if(t===n){s[l]=e(r,c)}else if(typeof o==="object"){s[l]=e(o[n],c)}}return s};function assembleStyles(){const e=new Map;const n={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};n.color.gray=n.color.blackBright;n.bgColor.bgGray=n.bgColor.bgBlackBright;n.color.grey=n.color.blackBright;n.bgColor.bgGrey=n.bgColor.bgBlackBright;for(const[t,r]of Object.entries(n)){for(const[t,o]of Object.entries(r)){n[t]={open:`[${o[0]}m`,close:`[${o[1]}m`};r[t]=n[t];e.set(o[0],o[1])}Object.defineProperty(n,t,{value:r,enumerable:false})}Object.defineProperty(n,"codes",{value:e,enumerable:false});n.color.close="[39m";n.bgColor.close="[49m";a(n.color,"ansi",()=>u(r,"ansi16",s,false));a(n.color,"ansi256",()=>u(o,"ansi256",s,false));a(n.color,"ansi16m",()=>u(c,"rgb",l,false));a(n.bgColor,"ansi",()=>u(r,"ansi16",s,true));a(n.bgColor,"ansi256",()=>u(o,"ansi256",s,true));a(n.bgColor,"ansi16m",()=>u(c,"rgb",l,true));return n}Object.defineProperty(e,"exports",{enumerable:true,get:assembleStyles})},906:e=>{"use strict";const n="[\ud800-\udbff][\udc00-\udfff]";const t=e=>e&&e.exact?new RegExp(`^${n}$`):new RegExp(n,"g");e.exports=t},624:(e,n,t)=>{const r=t(407);const o={};for(const e of Object.keys(r)){o[r[e]]=e}const c={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};e.exports=c;for(const e of Object.keys(c)){if(!("channels"in c[e])){throw new Error("missing channels property: "+e)}if(!("labels"in c[e])){throw new Error("missing channel labels property: "+e)}if(c[e].labels.length!==c[e].channels){throw new Error("channel and label counts mismatch: "+e)}const{channels:n,labels:t}=c[e];delete c[e].channels;delete c[e].labels;Object.defineProperty(c[e],"channels",{value:n});Object.defineProperty(c[e],"labels",{value:t})}c.rgb.hsl=function(e){const n=e[0]/255;const t=e[1]/255;const r=e[2]/255;const o=Math.min(n,t,r);const c=Math.max(n,t,r);const s=c-o;let l;let a;if(c===o){l=0}else if(n===c){l=(t-r)/s}else if(t===c){l=2+(r-n)/s}else if(r===c){l=4+(n-t)/s}l=Math.min(l*60,360);if(l<0){l+=360}const i=(o+c)/2;if(c===o){a=0}else if(i<=.5){a=s/(c+o)}else{a=s/(2-c-o)}return[l,a*100,i*100]};c.rgb.hsv=function(e){let n;let t;let r;let o;let c;const s=e[0]/255;const l=e[1]/255;const a=e[2]/255;const i=Math.max(s,l,a);const u=i-Math.min(s,l,a);const f=function(e){return(i-e)/6/u+1/2};if(u===0){o=0;c=0}else{c=u/i;n=f(s);t=f(l);r=f(a);if(s===i){o=r-t}else if(l===i){o=1/3+n-r}else if(a===i){o=2/3+t-n}if(o<0){o+=1}else if(o>1){o-=1}}return[o*360,c*100,i*100]};c.rgb.hwb=function(e){const n=e[0];const t=e[1];let r=e[2];const o=c.rgb.hsl(e)[0];const s=1/255*Math.min(n,Math.min(t,r));r=1-1/255*Math.max(n,Math.max(t,r));return[o,s*100,r*100]};c.rgb.cmyk=function(e){const n=e[0]/255;const t=e[1]/255;const r=e[2]/255;const o=Math.min(1-n,1-t,1-r);const c=(1-n-o)/(1-o)||0;const s=(1-t-o)/(1-o)||0;const l=(1-r-o)/(1-o)||0;return[c*100,s*100,l*100,o*100]};function comparativeDistance(e,n){return(e[0]-n[0])**2+(e[1]-n[1])**2+(e[2]-n[2])**2}c.rgb.keyword=function(e){const n=o[e];if(n){return n}let t=Infinity;let c;for(const n of Object.keys(r)){const o=r[n];const s=comparativeDistance(e,o);if(s<t){t=s;c=n}}return c};c.keyword.rgb=function(e){return r[e]};c.rgb.xyz=function(e){let n=e[0]/255;let t=e[1]/255;let r=e[2]/255;n=n>.04045?((n+.055)/1.055)**2.4:n/12.92;t=t>.04045?((t+.055)/1.055)**2.4:t/12.92;r=r>.04045?((r+.055)/1.055)**2.4:r/12.92;const o=n*.4124+t*.3576+r*.1805;const c=n*.2126+t*.7152+r*.0722;const s=n*.0193+t*.1192+r*.9505;return[o*100,c*100,s*100]};c.rgb.lab=function(e){const n=c.rgb.xyz(e);let t=n[0];let r=n[1];let o=n[2];t/=95.047;r/=100;o/=108.883;t=t>.008856?t**(1/3):7.787*t+16/116;r=r>.008856?r**(1/3):7.787*r+16/116;o=o>.008856?o**(1/3):7.787*o+16/116;const s=116*r-16;const l=500*(t-r);const a=200*(r-o);return[s,l,a]};c.hsl.rgb=function(e){const n=e[0]/360;const t=e[1]/100;const r=e[2]/100;let o;let c;let s;if(t===0){s=r*255;return[s,s,s]}if(r<.5){o=r*(1+t)}else{o=r+t-r*t}const l=2*r-o;const a=[0,0,0];for(let e=0;e<3;e++){c=n+1/3*-(e-1);if(c<0){c++}if(c>1){c--}if(6*c<1){s=l+(o-l)*6*c}else if(2*c<1){s=o}else if(3*c<2){s=l+(o-l)*(2/3-c)*6}else{s=l}a[e]=s*255}return a};c.hsl.hsv=function(e){const n=e[0];let t=e[1]/100;let r=e[2]/100;let o=t;const c=Math.max(r,.01);r*=2;t*=r<=1?r:2-r;o*=c<=1?c:2-c;const s=(r+t)/2;const l=r===0?2*o/(c+o):2*t/(r+t);return[n,l*100,s*100]};c.hsv.rgb=function(e){const n=e[0]/60;const t=e[1]/100;let r=e[2]/100;const o=Math.floor(n)%6;const c=n-Math.floor(n);const s=255*r*(1-t);const l=255*r*(1-t*c);const a=255*r*(1-t*(1-c));r*=255;switch(o){case 0:return[r,a,s];case 1:return[l,r,s];case 2:return[s,r,a];case 3:return[s,l,r];case 4:return[a,s,r];case 5:return[r,s,l]}};c.hsv.hsl=function(e){const n=e[0];const t=e[1]/100;const r=e[2]/100;const o=Math.max(r,.01);let c;let s;s=(2-t)*r;const l=(2-t)*o;c=t*o;c/=l<=1?l:2-l;c=c||0;s/=2;return[n,c*100,s*100]};c.hwb.rgb=function(e){const n=e[0]/360;let t=e[1]/100;let r=e[2]/100;const o=t+r;let c;if(o>1){t/=o;r/=o}const s=Math.floor(6*n);const l=1-r;c=6*n-s;if((s&1)!==0){c=1-c}const a=t+c*(l-t);let i;let u;let f;switch(s){default:case 6:case 0:i=l;u=a;f=t;break;case 1:i=a;u=l;f=t;break;case 2:i=t;u=l;f=a;break;case 3:i=t;u=a;f=l;break;case 4:i=a;u=t;f=l;break;case 5:i=l;u=t;f=a;break}return[i*255,u*255,f*255]};c.cmyk.rgb=function(e){const n=e[0]/100;const t=e[1]/100;const r=e[2]/100;const o=e[3]/100;const c=1-Math.min(1,n*(1-o)+o);const s=1-Math.min(1,t*(1-o)+o);const l=1-Math.min(1,r*(1-o)+o);return[c*255,s*255,l*255]};c.xyz.rgb=function(e){const n=e[0]/100;const t=e[1]/100;const r=e[2]/100;let o;let c;let s;o=n*3.2406+t*-1.5372+r*-.4986;c=n*-.9689+t*1.8758+r*.0415;s=n*.0557+t*-.204+r*1.057;o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92;c=c>.0031308?1.055*c**(1/2.4)-.055:c*12.92;s=s>.0031308?1.055*s**(1/2.4)-.055:s*12.92;o=Math.min(Math.max(0,o),1);c=Math.min(Math.max(0,c),1);s=Math.min(Math.max(0,s),1);return[o*255,c*255,s*255]};c.xyz.lab=function(e){let n=e[0];let t=e[1];let r=e[2];n/=95.047;t/=100;r/=108.883;n=n>.008856?n**(1/3):7.787*n+16/116;t=t>.008856?t**(1/3):7.787*t+16/116;r=r>.008856?r**(1/3):7.787*r+16/116;const o=116*t-16;const c=500*(n-t);const s=200*(t-r);return[o,c,s]};c.lab.xyz=function(e){const n=e[0];const t=e[1];const r=e[2];let o;let c;let s;c=(n+16)/116;o=t/500+c;s=c-r/200;const l=c**3;const a=o**3;const i=s**3;c=l>.008856?l:(c-16/116)/7.787;o=a>.008856?a:(o-16/116)/7.787;s=i>.008856?i:(s-16/116)/7.787;o*=95.047;c*=100;s*=108.883;return[o,c,s]};c.lab.lch=function(e){const n=e[0];const t=e[1];const r=e[2];let o;const c=Math.atan2(r,t);o=c*360/2/Math.PI;if(o<0){o+=360}const s=Math.sqrt(t*t+r*r);return[n,s,o]};c.lch.lab=function(e){const n=e[0];const t=e[1];const r=e[2];const o=r/360*2*Math.PI;const c=t*Math.cos(o);const s=t*Math.sin(o);return[n,c,s]};c.rgb.ansi16=function(e,n=null){const[t,r,o]=e;let s=n===null?c.rgb.hsv(e)[2]:n;s=Math.round(s/50);if(s===0){return 30}let l=30+(Math.round(o/255)<<2|Math.round(r/255)<<1|Math.round(t/255));if(s===2){l+=60}return l};c.hsv.ansi16=function(e){return c.rgb.ansi16(c.hsv.rgb(e),e[2])};c.rgb.ansi256=function(e){const n=e[0];const t=e[1];const r=e[2];if(n===t&&t===r){if(n<8){return 16}if(n>248){return 231}return Math.round((n-8)/247*24)+232}const o=16+36*Math.round(n/255*5)+6*Math.round(t/255*5)+Math.round(r/255*5);return o};c.ansi16.rgb=function(e){let n=e%10;if(n===0||n===7){if(e>50){n+=3.5}n=n/10.5*255;return[n,n,n]}const t=(~~(e>50)+1)*.5;const r=(n&1)*t*255;const o=(n>>1&1)*t*255;const c=(n>>2&1)*t*255;return[r,o,c]};c.ansi256.rgb=function(e){if(e>=232){const n=(e-232)*10+8;return[n,n,n]}e-=16;let n;const t=Math.floor(e/36)/5*255;const r=Math.floor((n=e%36)/6)/5*255;const o=n%6/5*255;return[t,r,o]};c.rgb.hex=function(e){const n=((Math.round(e[0])&255)<<16)+((Math.round(e[1])&255)<<8)+(Math.round(e[2])&255);const t=n.toString(16).toUpperCase();return"000000".substring(t.length)+t};c.hex.rgb=function(e){const n=e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!n){return[0,0,0]}let t=n[0];if(n[0].length===3){t=t.split("").map(e=>{return e+e}).join("")}const r=parseInt(t,16);const o=r>>16&255;const c=r>>8&255;const s=r&255;return[o,c,s]};c.rgb.hcg=function(e){const n=e[0]/255;const t=e[1]/255;const r=e[2]/255;const o=Math.max(Math.max(n,t),r);const c=Math.min(Math.min(n,t),r);const s=o-c;let l;let a;if(s<1){l=c/(1-s)}else{l=0}if(s<=0){a=0}else if(o===n){a=(t-r)/s%6}else if(o===t){a=2+(r-n)/s}else{a=4+(n-t)/s}a/=6;a%=1;return[a*360,s*100,l*100]};c.hsl.hcg=function(e){const n=e[1]/100;const t=e[2]/100;const r=t<.5?2*n*t:2*n*(1-t);let o=0;if(r<1){o=(t-.5*r)/(1-r)}return[e[0],r*100,o*100]};c.hsv.hcg=function(e){const n=e[1]/100;const t=e[2]/100;const r=n*t;let o=0;if(r<1){o=(t-r)/(1-r)}return[e[0],r*100,o*100]};c.hcg.rgb=function(e){const n=e[0]/360;const t=e[1]/100;const r=e[2]/100;if(t===0){return[r*255,r*255,r*255]}const o=[0,0,0];const c=n%1*6;const s=c%1;const l=1-s;let a=0;switch(Math.floor(c)){case 0:o[0]=1;o[1]=s;o[2]=0;break;case 1:o[0]=l;o[1]=1;o[2]=0;break;case 2:o[0]=0;o[1]=1;o[2]=s;break;case 3:o[0]=0;o[1]=l;o[2]=1;break;case 4:o[0]=s;o[1]=0;o[2]=1;break;default:o[0]=1;o[1]=0;o[2]=l}a=(1-t)*r;return[(t*o[0]+a)*255,(t*o[1]+a)*255,(t*o[2]+a)*255]};c.hcg.hsv=function(e){const n=e[1]/100;const t=e[2]/100;const r=n+t*(1-n);let o=0;if(r>0){o=n/r}return[e[0],o*100,r*100]};c.hcg.hsl=function(e){const n=e[1]/100;const t=e[2]/100;const r=t*(1-n)+.5*n;let o=0;if(r>0&&r<.5){o=n/(2*r)}else if(r>=.5&&r<1){o=n/(2*(1-r))}return[e[0],o*100,r*100]};c.hcg.hwb=function(e){const n=e[1]/100;const t=e[2]/100;const r=n+t*(1-n);return[e[0],(r-n)*100,(1-r)*100]};c.hwb.hcg=function(e){const n=e[1]/100;const t=e[2]/100;const r=1-t;const o=r-n;let c=0;if(o<1){c=(r-o)/(1-o)}return[e[0],o*100,c*100]};c.apple.rgb=function(e){return[e[0]/65535*255,e[1]/65535*255,e[2]/65535*255]};c.rgb.apple=function(e){return[e[0]/255*65535,e[1]/255*65535,e[2]/255*65535]};c.gray.rgb=function(e){return[e[0]/100*255,e[0]/100*255,e[0]/100*255]};c.gray.hsl=function(e){return[0,0,e[0]]};c.gray.hsv=c.gray.hsl;c.gray.hwb=function(e){return[0,100,e[0]]};c.gray.cmyk=function(e){return[0,0,0,e[0]]};c.gray.lab=function(e){return[e[0],0,0]};c.gray.hex=function(e){const n=Math.round(e[0]/100*255)&255;const t=(n<<16)+(n<<8)+n;const r=t.toString(16).toUpperCase();return"000000".substring(r.length)+r};c.rgb.gray=function(e){const n=(e[0]+e[1]+e[2])/3;return[n/255*100]}},93:(e,n,t)=>{const r=t(624);const o=t(289);const c={};const s=Object.keys(r);function wrapRaw(e){const n=function(...n){const t=n[0];if(t===undefined||t===null){return t}if(t.length>1){n=t}return e(n)};if("conversion"in e){n.conversion=e.conversion}return n}function wrapRounded(e){const n=function(...n){const t=n[0];if(t===undefined||t===null){return t}if(t.length>1){n=t}const r=e(n);if(typeof r==="object"){for(let e=r.length,n=0;n<e;n++){r[n]=Math.round(r[n])}}return r};if("conversion"in e){n.conversion=e.conversion}return n}s.forEach(e=>{c[e]={};Object.defineProperty(c[e],"channels",{value:r[e].channels});Object.defineProperty(c[e],"labels",{value:r[e].labels});const n=o(e);const t=Object.keys(n);t.forEach(t=>{const r=n[t];c[e][t]=wrapRounded(r);c[e][t].raw=wrapRaw(r)})});e.exports=c},289:(e,n,t)=>{const r=t(624);function buildGraph(){const e={};const n=Object.keys(r);for(let t=n.length,r=0;r<t;r++){e[n[r]]={distance:-1,parent:null}}return e}function deriveBFS(e){const n=buildGraph();const t=[e];n[e].distance=0;while(t.length){const e=t.pop();const o=Object.keys(r[e]);for(let r=o.length,c=0;c<r;c++){const r=o[c];const s=n[r];if(s.distance===-1){s.distance=n[e].distance+1;s.parent=e;t.unshift(r)}}}return n}function link(e,n){return function(t){return n(e(t))}}function wrapConversion(e,n){const t=[n[e].parent,e];let o=r[n[e].parent][e];let c=n[e].parent;while(n[c].parent){t.unshift(n[c].parent);o=link(r[n[c].parent][c],o);c=n[c].parent}o.conversion=t;return o}e.exports=function(e){const n=deriveBFS(e);const t={};const r=Object.keys(n);for(let e=r.length,o=0;o<e;o++){const e=r[o];const c=n[e];if(c.parent===null){continue}t[e]=wrapConversion(e,n)}return t}},546:e=>{"use strict";const n=e=>{if(Number.isNaN(e)){return false}if(e>=4352&&(e<=4447||e===9001||e===9002||11904<=e&&e<=12871&&e!==12351||12880<=e&&e<=19903||19968<=e&&e<=42182||43360<=e&&e<=43388||44032<=e&&e<=55203||63744<=e&&e<=64255||65040<=e&&e<=65049||65072<=e&&e<=65131||65281<=e&&e<=65376||65504<=e&&e<=65510||110592<=e&&e<=110593||127488<=e&&e<=127569||131072<=e&&e<=262141)){return true}return false};e.exports=n;e.exports.default=n}};var n={};function __webpack_require__(t){if(n[t]){return n[t].exports}var r=n[t]={id:t,loaded:false,exports:{}};var o=true;try{e[t](r,r.exports,__webpack_require__);o=false}finally{if(o)delete n[t]}r.loaded=true;return r.exports}(()=>{__webpack_require__.nmd=(e=>{e.paths=[];if(!e.children)e.children=[];return e})})();__webpack_require__.ab=__dirname+"/";return __webpack_require__(523)})();