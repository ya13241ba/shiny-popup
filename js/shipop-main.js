var injectScript;
var divout;

// JQUERY埋め込み
injectJQuery = function(file, node) {
  var th, sh, sb, tb;

  th = document.getElementsByTagName("head")[0];
  tb = document.getElementsByTagName("body")[0];

  sh = document.createElement('link');
  sh.setAttribute('rel', 'preload');
  sh.setAttribute('as', 'script');
  sh.setAttribute('href', file);
  th.appendChild(sh);

  sb = document.createElement('script');
  sb.setAttribute('type', 'text/javascript');
  sb.setAttribute('src', file);

  tb.appendChild(sb);
};

// 独自スクリプト埋め込み
injectScript = function(file, node) {
  var s, th, tb;
  th = document.getElementsByTagName("head")[0];
  tb = document.getElementsByTagName("body")[0];

  sh = document.createElement('link');
  sh.setAttribute('rel', 'preload');
  sh.setAttribute('as', 'script');
  sh.setAttribute('href', file);

  var thlink = th.getElementsByTagName("link");
  var thchunk = {};
  for(var i = 0; i < thlink.length; i++){
      var linkref = thlink[i].href;
      // console.log(linkref + " : " + linkref.indexOf("commons.chunk"));
      if ( linkref.indexOf("enza-platform-") > 0 ) {
      //      if ( linkref.indexOf("commons.chunk") > 0 ) {
        thchunk = thlink[i];
        break;
      }
  }
  th.insertBefore(sh, thchunk);

  sb = document.createElement('script');
  sb.setAttribute('type', 'text/javascript');
  sb.setAttribute('src', file);

  var tbscript = tb.getElementsByTagName("script");
  var tbchunk = {};
  for(var i = 0; i < tbscript.length; i++){
      var scriptsrc = tbscript[i].src;
      // console.log(linkref + " : " + linkref.indexOf("commons.chunk"));
      if ( scriptsrc.indexOf("raven.min.js") > 0 ) {
        //      if ( scriptsrc.indexOf("commons.chunk") > 0 ) {
        tbchunk = tbscript[i];
        break;
      }
  }

  tb.insertBefore(sb, tbchunk.nextSibling);

};

injectJQuery(chrome.extension.getURL('/js/jquery.min.js'), 'head');
injectScript(chrome.extension.getURL('/js/embeded-script.js'), 'head');

window.addEventListener("message", function(event) {
  // 埋め込みスクリプトから送られたリクエストを管理画面に渡す
  if (event.source == window &&
      event.data && event.data.identify == "shipop" ) {

    // contents -> mng-contents
    chrome.runtime.sendMessage( JSON.stringify( event.data ) , function ( response ){
    	// console.log("受け取ったデータ：", response)
    });
  }
}, false);
