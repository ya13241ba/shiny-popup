
window.addEventListener('load', function() {
  var getResult = null;

  // [HEADER] WIKI-TOP DELETE
  getResult = document.getElementById("header");
  getResult.remove();

  // [HEADER] NAV-FRAMES DELETE
  getResult = document.getElementById("naviframe");
  getResult.remove();

  // [HEADER] TOP-PATH DELETE
  getResult = document.getElementById("topicpathframe");
  if ( getResult ) { 
    getResult.remove();
  }

  // [MAIN] LEFT MENU DELETE
  // var divMain = document.getElementById("body");
  // divMain.parentElement.previousElementSibling.remove();

  // [MAIN] RIGHT CONTENTS TRIM
  // var divChildren = divMain.children;
  // divChildren[ 1 ].remove();  // TOP IMAGE <P>
  // divChildren[ 1 ].remove();  // TOP MENU <div.contents>
  // divChildren[ 1 ].remove();  // TOP MENU JUPN
  // divChildren[ 1 ].remove();  // TOP MENU JUPN
  // divChildren[ 1 ].remove();  // TOP MENU JUPN
  // divChildren[ 1 ].remove();  // TOP MENU JUPN
  // divChildren[ 1 ].remove();  // TOP MENU JUPN
  // divChildren[ 1 ].remove();  // TOP MENU JUPN
  // divChildren[ 1 ].remove();  // TOP MENU JUPN
  // divChildren[ divChildren.length - 1 ].remove();  // FOOT-FORM H2
  // divChildren[ divChildren.length - 1 ].remove();  // FOOT-FORM DIV

  //var divJump = document.getElementsByClassName("jumpmenu");

  $(".jumpmenu").remove();

  // [FOOT] AD DELETE
  getResult = document.getElementById("prframe");
  getResult.remove();
  getResult = document.getElementById("prframe");
  getResult.remove();

})
