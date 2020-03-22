
var injectScriptWiki = function(file, node) {
  var sb, tb;

  tb = document.getElementsByTagName("body")[0];

  sb = document.createElement('script');
  sb.setAttribute('type', 'text/javascript');
  sb.setAttribute('src', file);

  tb.appendChild(sb);
};


var injectStyleWiki = function(file, node) {
  var th, sh;
  th = document.getElementsByTagName(node)[0];
  sh = document.createElement('link');
  sh.setAttribute('rel', 'stylesheet');
  sh.setAttribute('type', 'text/css');
  sh.setAttribute('href', file);

  th.appendChild(sh);
};

injectStyleWiki(chrome.extension.getURL('/embeded-style.css'), 'head');
injectScriptWiki(chrome.extension.getURL('/js/shiwiki-emb.js'), 'head');
