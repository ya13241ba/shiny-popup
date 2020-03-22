chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({"url": "html/shipop-content-base.html" });
});

var shipopProduceIdolName = "";
var shipopSupportIdolNames = null;
function shipopSupporName( pspidolls, pcharacterId, pintkbn ) {
  if ( !pspidolls ) {
    return pcharacterId;
  }

  for ( var i = 0; i < pspidolls.length; i++ ) {
    if ( pintkbn == 1 && pspidolls[i].supportIdolId != pcharacterId ) {
      continue;
    }
    if ( pintkbn == 2 && pspidolls[i].characterId != pcharacterId ) {
      continue;
    }

    // MATCHE
    return pspidolls[i].name;
  }
  // NO MATCHE
  return -1;
}

var shipopLocalProduceLog = {};
function shipopSaveProduceLog( reqJSON, sender, sendResponse ) {
  if ( !reqJSON.shipopLessonIdolId ) {
    // If not saveProduceAudition, Get LastUpdate Data
    var lastUpdateItem = localStorage.getItem( "plog_lastUpdateInfo" );
    if ( lastUpdateItem ) {
      var lastUpdateJSON = JSON.parse( lastUpdateItem );
      reqJSON.shipopLessonIdolId     = lastUpdateJSON.shipopLessonIdolId;
      reqJSON.shipopLessonSeasonNum  = lastUpdateJSON.shipopLessonSeasonNum;
      reqJSON.shipopLessonSeasonWeek = lastUpdateJSON.shipopLessonSeasonWeek;
      reqJSON.shipopProduceIdol      = lastUpdateJSON.shipopProduceIdol;
    }
  }

  var jsonKey = "plog_" + reqJSON.shipopLessonIdolId;

  // Initialize Logs from LocalStorage
  if ( !shipopLocalProduceLog[ jsonKey ] ){
    var getLSjson = localStorage.getItem( jsonKey );
    if ( getLSjson ) {
      shipopLocalProduceLog[ jsonKey ] = JSON.parse( getLSjson );
    } else {
      shipopLocalProduceLog[ jsonKey ] = new Array();
    }
  }

  // Set Produce IdolName
  reqJSON.shipopSupportIdolName = shipopSupportIdolNames;

  // Set SkillPanel IdolName
  if ( reqJSON.shipopLogTYpe == "SelectPanel" ) {
    reqJSON.shipopPanelIdolName = "";
    if ( shipopSupportIdolNames ) {
      // SkillPanel Support IdolName Get
      var getSpIdolName = shipopSupporName( shipopSupportIdolNames, reqJSON.shipopPanelIdolId, 1 );

      if ( getSpIdolName != -1 ) {
        // Support Idol Name
        reqJSON.shipopPanelIdolName = getSpIdolName;
      } else {
        // Produce Idol Name
        reqJSON.shipopPanelIdolName = shipopProduceIdolName;
      }
    }
  }

  // Add OnMemory Log
  shipopLocalProduceLog[ jsonKey ].push( reqJSON );

  // Update LocalStrage Logs
  localStorage.setItem( jsonKey, JSON.stringify( shipopLocalProduceLog[ jsonKey ] ) );
  localStorage.setItem( "plog_lastUpdateInfo", JSON.stringify( reqJSON ) );
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    var reqJSON = JSON.parse( request );

    // Get Select Produce Idol Name
    var produceIdol = reqJSON.shipopProduceIdol;
    if ( produceIdol && Object.keys( produceIdol ).length !== 0 ) {
      shipopProduceIdolName = produceIdol.name;
    }

    // Get Select Support Idol Names
    if ( reqJSON.shipopSupportIdols ) {
      shipopSupportIdolNames = reqJSON.shipopSupportIdols;
    }

    // saving localStorage
    if ( reqJSON.direction == "shipop-producelog" ) {
      shipopSaveProduceLog(reqJSON, sender, sendResponse);
    }

    // Send Query for all tabs
    chrome.tabs.query( {url: "*://jbndimdpjmpkoalhjebohbdbadjchimm/*"}, function (tabs) {
      if ( tabs[0] ) {
        // contents -> mng-contents
        chrome.tabs.sendMessage( tabs[0].id, "めっせぇじ", function (response){

        } );

      } else {
        // no tabs
      }
  	});
  }
);
