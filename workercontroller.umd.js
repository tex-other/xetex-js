!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.workercontroller=e.workercontroller||{})}(this,function(e){"use strict";var t=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),r=function y(e,t,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:y(o,t,n)}if("value"in r)return r.value;var a=r.get;if(void 0!==a)return a.call(n)},o=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},i=function(){function e(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(u){o=!0,a=u}finally{try{!r&&s["return"]&&s["return"]()}finally{if(o)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)},u=function(e){var t=e.lastIndexOf("/"),n=e.lastIndexOf(".");return-1===n?e:n>t?e.slice(0,n):e},l=function(e){var t=e.lastIndexOf("/");if(-1===t)return["",e];var n;for(n=t-1;n>0&&"/"===e.charAt(n);n--);return[e.slice(0,n),e.slice(t+1)]},c=Object.getPrototypeOf(Uint8Array),f=function(e){return e instanceof c?[e.buffer]:[]},d=function(e,t){return new Promise(function(n,r){var o=new XMLHttpRequest;o.open(e,t),o.onreadystatechange=function(){o.readyState===XMLHttpRequest.DONE&&(o.status>=200&&o.status<300?n(o):r(o))},o.send()})},h=function(){function e(n,r,o){t(this,e),this.worker=new Worker(n),this.worker.onmessage=r?r:function(e){var t=e.data;if(t)switch(t.channel){case"stdout":console.log(t.data);break;case"stderr":console.warn(t.data);break;default:console.log(t)}},this.worker.onerror=o?o:function(e){return console.error(e)}}return n(e,[{key:"reload",value:function(){return this.sendMessage("reload")}},{key:"invokeMain",value:function(e){return this.sendMessage({namespace:"Module",command:"callMain",arguments:[e]})}},{key:"sendMessage",value:function(e){var t=this,n=arguments.length<=1||void 0===arguments[1]?[]:arguments[1];return new Promise(function(r,o){var a=new MessageChannel;a.port1.onmessage=function(t){t.data?t.data.error?o(t.data.error):r(t.data):(console.warn("Unexpected falsy reply to request",e,t.data),o(t.data))},t.postMessage(e,[a.port2].concat(n))})}},{key:"postMessage",value:function(){var e;(e=this.worker).postMessage.apply(e,arguments)}},{key:"terminate",value:function(){this.worker.terminate()}},{key:"createDataFile",value:function(e,t,n){for(var r=arguments.length,o=Array(r>4?r-4:0),a=4;r>a;a++)o[a-4]=arguments[a];var i=arguments.length<=3||void 0===arguments[3]?[]:arguments[3];return o=o||[],i.length&&window.chrome&&(i=[]),this.sendMessage({namespace:"FS",command:"createDataFile",arguments:[e,t,n].concat(s(o)),ret:null,retTransfer:!i},i)}},{key:"readFile",value:function(e,t){var n=arguments.length<=2||void 0===arguments[2]?window.chrome:arguments[2];return this.sendMessage({namespace:"FS",command:"readFile",arguments:[e,t],retTransfer:!n})}}]),e}(),v=function(e){return function(e){function r(){var e;t(this,r);for(var n=arguments.length,o=Array(n),i=0;n>i;i++)o[i]=arguments[i];var s=a(this,(e=Object.getPrototypeOf(r)).call.apply(e,[this].concat(o)));return s.texLiveManifestUrl="texlive.lst",s.virtualTexLiveRootDir="texlive",s}return o(r,e),n(r,[{key:"getTexMfCnfContent",value:function(){return"TEXMFDIST = /"+this.virtualTexLiveRootDir+"/texmf-dist\n"+("TEXMFLOCAL = /"+this.virtualTexLiveRootDir+"/texmf-local\n")+("TEXMFCONFIG = /"+this.virtualTexLiveRootDir+"/texmf-config\n")+"TEXMF = {!!$TEXMFDIST,!!$TEXMFLOCAL,!!$TEXMFCONFIG}\n"}},{key:"_prepareTeXLiveFromManifest",value:function(e){var t=e.split("\n"),n=[],r=0;n.push(this.sendMessage({namespace:"FS",command:"createPath",arguments:["/",this.virtualTexLiveRootDir,!0,!0],ret:null}));var o=!0,a=!1,i=void 0;try{for(var s,u=t[Symbol.iterator]();!(o=(s=u.next()).done);o=!0){var l=s.value;if(l){var c,f=l.split(" ",2),d=f[0];c=2===f.length?f[1]:f[0];var h,v=d.lastIndexOf("/"),p=this.virtualTexLiveRootDir+"/";if(-1===v)h=d;else{h=d.slice(v+1);var m=d.slice(0,v);p+=m,this.sendMessage({namespace:"FS",command:"createPath",arguments:["/",p,!0,!0],ret:null})}h?(n.push(this.sendMessage({namespace:"FS",command:"createLazyFile",arguments:[p,h,c,!0,!1],ret:null}).then(function(e){r++})),"texmf-dist/web2c/texmf.cnf"===d&&(n.push(this.sendMessage({namespace:"FS",command:"createPath",arguments:["/","share/texmf-dist/web2c/",!0,!0],ret:null})),n.push(this.sendMessage({namespace:"FS",command:"createLazyFile",arguments:["/share/texmf-dist/web2c/","texmf.cnf",c,!0,!1],ret:null})))):console.error("Not a file: "+d)}}}catch(y){a=!0,i=y}finally{try{!o&&u["return"]&&u["return"]()}finally{if(a)throw i}}return Promise.all(n).then(function(e){return{numFiles:r}})}},{key:"loadTeXLive",value:function(){var e=this,t=this.getTexMfCnfContent();return Promise.all([this.createDataFile("/","texmf.cnf",t,f(t),!0),d("GET",this.texLiveManifestUrl).then(function(t){return e._prepareTeXLiveFromManifest(t.response)},function(e){throw console.error("Cannot retrieve manifest file",e),e})]).then(function(e){var t=i(e,2),n=(t[0],t[1]);return n})}}]),r}(e)},p=function(e){function i(){return t(this,i),a(this,Object.getPrototypeOf(i).apply(this,arguments))}return o(i,e),n(i,[{key:"reload",value:function(){var e=this;return r(Object.getPrototypeOf(i.prototype),"reload",this).call(this).then(function(t){return e.loadTeXLive()})}},{key:"convertXdvToPdf",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?u(e)+".pdf":arguments[1];return this.invokeMain(["-o",t,e])}}]),i}(v(h)),m=function(e){function s(e,n,r,o){t(this,s);var i=a(this,Object.getPrototypeOf(s).call(this,n,r,o));return i.backendController=e,i.xelatexFmtUrl="xelatex.fmt",i}return o(s,e),n(s,[{key:"reload",value:function(){var e=this,t=r(Object.getPrototypeOf(s.prototype),"reload",this).call(this);return Promise.all([this.backendController.reload(),t.then(function(t){return e.sendMessage({namespace:"FS",command:"createLazyFile",arguments:["/","xelatex.fmt",e.xelatexFmtUrl,!0,!1],ret:null})}),t.then(function(t){return e.loadTeXLive()})]).then(function(e){var t=i(e,3),n=(t[0],t[1],t[2]);return n})}},{key:"terminate",value:function(){r(Object.getPrototypeOf(s.prototype),"terminate",this).call(this),this.backendController.terminate()}},{key:"compile",value:function(e){var t,n=arguments.length<=1||void 0===arguments[1]?"source.tex":arguments[1],r=this,o=arguments.length<=2||void 0===arguments[2]?["-interaction=nonstopmode","-no-pdf"]:arguments[2],a=arguments.length<=3||void 0===arguments[3]?u(n)+".xdv":arguments[3],s=l(n),c=i(s,2),d=c[0],h=c[1];"/"===d||"."===d?t=null:this.sendMessage({namespace:"FS",command:"createPath",arguments:["/",d,!0,!0]});var v=[t,this.createDataFile(d,h,e,f(e),!0)];return Promise.all(v).then(function(e){return r.invokeMain(o.concat("--",n))}).then(function(e){return r.readFile(a,{encoding:"binary"})}).then(function(e){return r.backendController.createDataFile("/","source.xdv",e.ret,[e.ret.buffer],!0)}).then(function(e){return r.backendController.convertXdvToPdf("source.xdv","source.pdf")}).then(function(e){return r.backendController.readFile("source.pdf",{encoding:"binary"})}).then(function(e){return e.ret})}}]),s}(v(h));e.WorkerController=h,e.TeXLiveMixin=v,e.XdvipdfmxController=p,e.XeLaTeXController=m,Object.defineProperty(e,"__esModule",{value:!0})});