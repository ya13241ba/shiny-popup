var CTAB_INFO = 0;
var CTAB_PLAC = 1;
var CTAB_EVEN = 2;

var CONST_IDOLTYPE = [
  "fesIdol",         // フェスアイドル
  "userIdol",        // プロデュースアイドル
  "userSupportIdol", // サポートアイドル
  "userReserveIdol",        // Ｐアイドル控室
  "userReserveSupportIdol"  // Ｓアイドル控室
]

// DEBUG SWITCH
var FLG_NOT_NCAPTURE = false;

// shiout element
var shiout = document.getElementById("shipop-out");
var navtop = document.getElementById("shipopul");
var navlist = document.getElementsByClassName("shipopli");
var contentlist = document.getElementsByClassName("shipop-content");
var iframelist = document.getElementsByClassName("shipop-iframe");
var crossframes = document.getElementsByClassName("shipop-crossframe");

function shipopConvertRemainSeasonWeek( pseason, premainSeasonWeek ) {
  if ( pseason == 5 ) {
    return ( 2 - premainSeasonWeek + 1 );
  }
  return ( 8 - premainSeasonWeek + 1 );
}

function shipopIDMapping( ptabno, ptabelem, pidName ){
  ptabelem[pidName] = $(iframelist[ptabno]).find("#" + pidName);
}

function shipopSupportSkillsEdit( pspskills ) {
  var resSkills = new Array(8);
  if ( !pspskills ) {
    return resSkills;
  }

  for ( var i = 0; i < pspskills.length; i++ ) {
    var placeID = pspskills[i].producePlaceCategoryId;
    resSkills[placeID].push(pspskills[i]);
  }
  return resSkills;
}


function shipopProducePage( psaveProduceAudition, psaveHomePage ) {
  var shipopProduceIdol = {};

  var produceIdol = null;
  if ( psaveProduceAudition && psaveProduceAudition._store.produceIdol ) {
    produceIdol = psaveProduceAudition._store.produceIdol;
  } else if ( psaveHomePage && psaveHomePage._myPage.produceIdol ) {
    produceIdol = psaveHomePage._myPage.produceIdol;
  }

  var seasonAndWeeks = { "season": "-", "week": "-" };
  if ( psaveProduceAudition && psaveProduceAudition._store.seasonNum ) {
    seasonAndWeeks.season = psaveProduceAudition._store.seasonNum;
    seasonAndWeeks.week = shipopConvertRemainSeasonWeek(psaveProduceAudition._store.seasonNum, psaveProduceAudition._store.remainSeasonWeek);
  } else if ( psaveHomePage && psaveHomePage._myPage.produce ) {
    seasonAndWeeks.season = Math.ceil(psaveHomePage._myPage.produce.week / 8);
    seasonAndWeeks.week = ( psaveHomePage._myPage.produce.week - 1 ) % 8 + 1;
  }

  var targetRank = "";
  if ( psaveProduceAudition && psaveProduceAudition._store.targetRank ) {
    targetRank = psaveProduceAudition._store.targetRank;
  }

  if ( produceIdol ) {
      shipopProduceIdol.seasonNum         = seasonAndWeeks.season;
      shipopProduceIdol.remainSeasonWeek  = seasonAndWeeks.week;
      shipopProduceIdol.name              = produceIdol.userIdol.name;
      shipopProduceIdol.vocal             = produceIdol.vocal;
      shipopProduceIdol.dance             = produceIdol.dance;
      shipopProduceIdol.visual            = produceIdol.visual;
      shipopProduceIdol.mental            = produceIdol.mental;
      shipopProduceIdol.limitVocal        = produceIdol.limitVocal;
      shipopProduceIdol.limitDance        = produceIdol.limitDance;
      shipopProduceIdol.limitVisual       = produceIdol.limitVisual;
      shipopProduceIdol.limitMental       = produceIdol.limitMental;
      shipopProduceIdol.skillPoint        = produceIdol.skillPoint;
      shipopProduceIdol.stamina           = produceIdol.stamina;
      shipopProduceIdol.fan               = produceIdol.fan;
      shipopProduceIdol.tension           = produceIdol.tension;
      shipopProduceIdol.memoryAppealLevel = produceIdol.memoryAppealLevel;
      shipopProduceIdol.totalMemoryPoint  = produceIdol.totalMemoryPoint;
  }

  return shipopProduceIdol;
}

function shipopEventPage( peventPage, peventType ) {
  var objRet = null;
  switch( peventType ) {
  case "1":
    objRet = shipopNormalEventPage( peventPage );
    break;
  case "2":
    objRet = shipopKishaEventPage( peventPage );
    break;  
  }
  return objRet;
}

function shipopNormalEventPage( peventPage ) {
  var shipopEventInfo = {};
  var shipopEventTracks = new Array();

  var esp = peventPage;
  if ( esp ) {
    // *** Event Info ***
    shipopEventInfo.actionName         = esp._event.eventCategory.actionName;
    shipopEventInfo.eventCategoryName  = esp._event.eventCategoryName;
    shipopEventInfo.title              = esp._event.title;
    shipopEventInfo.answers            = esp._event.answers;
    shipopEventInfo.character_id       = esp._event.character_id;
    shipopEventInfo.produceEventParams = esp._event.produceEventParams;

    if ( esp._event.eventParam ) {
      shipopEventInfo.isExists     = ( true                                    );
      shipopEventInfo.vocal        = ( esp._event.eventParam.vocal             );
      shipopEventInfo.dance        = ( esp._event.eventParam.dance             );
      shipopEventInfo.visual       = ( esp._event.eventParam.visual            );
      shipopEventInfo.mental       = ( esp._event.eventParam.mental            );
      shipopEventInfo.skillPoint   = ( esp._event.eventParam.skillPoint        );
      shipopEventInfo.stamina      = ( esp._event.eventParam.stamina           );
      shipopEventInfo.fan          = ( esp._event.eventParam.fan               );
      shipopEventInfo.tension      = ( esp._event.eventParam.tension           );
      shipopEventInfo.memoryPoint  = ( esp._event.eventParam.memoryPoint       );
      shipopEventInfo.friendship   = ( esp._event.eventParam.friendship        );
    } else if ( esp._event.param ) {
      shipopEventInfo.isExists     = ( true                                    );
      shipopEventInfo.vocal        = ( esp._event.param.vocal             );
      shipopEventInfo.dance        = ( esp._event.param.dance             );
      shipopEventInfo.visual       = ( esp._event.param.visual            );
      shipopEventInfo.mental       = ( esp._event.param.mental            );
      shipopEventInfo.skillPoint   = ( esp._event.param.skillPoint        );
      shipopEventInfo.stamina      = ( esp._event.param.stamina           );
      shipopEventInfo.fan          = ( ""                                 );
      shipopEventInfo.tension      = ( esp._event.param.tension           );
      shipopEventInfo.memoryPoint  = ( esp._event.param.memoryPoint       );
      shipopEventInfo.friendship   = ( ""                                 );
    } else {
      shipopEventInfo.isExists     = ( false );
      shipopEventInfo.vocal        = ( "" );
      shipopEventInfo.dance        = ( "" );
      shipopEventInfo.visual       = ( "" );
      shipopEventInfo.mental       = ( "" );
      shipopEventInfo.skillPoint   = ( "" );
      shipopEventInfo.stamina      = ( "" );
      shipopEventInfo.fan          = ( "" );
      shipopEventInfo.tension      = ( "" );
      shipopEventInfo.memoryPoint  = ( "" );
      shipopEventInfo.friendship   = ( "" );
    }

    // *** Event Tracks ***
    shipopEventInfo.firstEventText = "";
    if ( esp._eventTracks ) {
      for ( var idx = 0; idx < esp._eventTracks.length; idx++ ) {
        var eventTrack = esp._eventTracks[ idx ];

        var shipopEventTrackItem = {};
        if ( eventTrack.speaker ) {
          // Normal Conversation
          shipopEventTrackItem.label     = eventTrack.label;
          shipopEventTrackItem.speaker   = eventTrack.speaker;
          shipopEventTrackItem.text      = eventTrack.text;
          shipopEventTrackItem.nextLabel = eventTrack.nextLabel;
        } else if ( eventTrack.select ) {
          // Selection
          shipopEventTrackItem.label     = "";
          shipopEventTrackItem.speaker   = "";
          shipopEventTrackItem.text      = eventTrack.select;
          shipopEventTrackItem.nextLabel = eventTrack.nextLabel;
        }

        // 空の要素はスキップする
        if ( Object.keys(shipopEventTrackItem) != 0 ) {
          // 要素追加
          shipopEventTracks.push( shipopEventTrackItem );
          // 最初お会話をキャプチャ
          if ( !shipopEventInfo.firstEventText ) {
            shipopEventInfo.firstEventText = shipopEventTrackItem.text;
          }
        }
      }
    }
  }

  return {
    "eventInfo"   : shipopEventInfo,
    "eventTracks" : shipopEventTracks
  };
}

function shipopKishaEventPage( peventPage ) {
  var shipopEventInfo = {};
  var shipopEventTracks = new Array();

  // var esp = peventPage;
  // if ( esp ) {
  //   // *** Event Info ***
  //   shipopEventInfo.actionName         = esp._event.eventCategory.actionName;
  //   shipopEventInfo.eventCategoryName  = esp._event.eventCategoryName;
  //   shipopEventInfo.title              = esp._event.title;
  //   shipopEventInfo.answers            = esp._event.answers;
  //   shipopEventInfo.character_id       = esp._event.character_id;
  //   shipopEventInfo.produceEventParams = esp._event.produceEventParams;

  //   if ( esp._event.eventParam ) {
  //     shipopEventInfo.isExists     = ( true                                    );
  //     shipopEventInfo.vocal        = ( esp._event.eventParam.vocal             );
  //     shipopEventInfo.dance        = ( esp._event.eventParam.dance             );
  //     shipopEventInfo.visual       = ( esp._event.eventParam.visual            );
  //     shipopEventInfo.mental       = ( esp._event.eventParam.mental            );
  //     shipopEventInfo.skillPoint   = ( esp._event.eventParam.skillPoint        );
  //     shipopEventInfo.stamina      = ( esp._event.eventParam.stamina           );
  //     shipopEventInfo.fan          = ( esp._event.eventParam.fan               );
  //     shipopEventInfo.tension      = ( esp._event.eventParam.tension           );
  //     shipopEventInfo.memoryPoint  = ( esp._event.eventParam.memoryPoint       );
  //     shipopEventInfo.friendship   = ( esp._event.eventParam.friendship        );
  //   } else if ( esp._event.param ) {
  //     shipopEventInfo.isExists     = ( true                                    );
  //     shipopEventInfo.vocal        = ( esp._event.param.vocal             );
  //     shipopEventInfo.dance        = ( esp._event.param.dance             );
  //     shipopEventInfo.visual       = ( esp._event.param.visual            );
  //     shipopEventInfo.mental       = ( esp._event.param.mental            );
  //     shipopEventInfo.skillPoint   = ( esp._event.param.skillPoint        );
  //     shipopEventInfo.stamina      = ( esp._event.param.stamina           );
  //     shipopEventInfo.fan          = ( ""                                 );
  //     shipopEventInfo.tension      = ( esp._event.param.tension           );
  //     shipopEventInfo.memoryPoint  = ( esp._event.param.memoryPoint       );
  //     shipopEventInfo.friendship   = ( ""                                 );
  //   } else {
  //     shipopEventInfo.isExists     = ( false );
  //     shipopEventInfo.vocal        = ( "" );
  //     shipopEventInfo.dance        = ( "" );
  //     shipopEventInfo.visual       = ( "" );
  //     shipopEventInfo.mental       = ( "" );
  //     shipopEventInfo.skillPoint   = ( "" );
  //     shipopEventInfo.stamina      = ( "" );
  //     shipopEventInfo.fan          = ( "" );
  //     shipopEventInfo.tension      = ( "" );
  //     shipopEventInfo.memoryPoint  = ( "" );
  //     shipopEventInfo.friendship   = ( "" );
  //   }

  //   // *** Event Tracks ***
  //   shipopEventInfo.firstEventText = "";
  //   if ( esp._eventTracks ) {
  //     for ( var idx = 0; idx < esp._eventTracks.length; idx++ ) {
  //       var eventTrack = esp._eventTracks[ idx ];

  //       var shipopEventTrackItem = {};
  //       if ( eventTrack.speaker ) {
  //         // Normal Conversation
  //         shipopEventTrackItem.label     = eventTrack.label;
  //         shipopEventTrackItem.speaker   = eventTrack.speaker;
  //         shipopEventTrackItem.text      = eventTrack.text;
  //         shipopEventTrackItem.nextLabel = eventTrack.nextLabel;
  //       } else if ( eventTrack.select ) {
  //         // Selection
  //         shipopEventTrackItem.label     = "";
  //         shipopEventTrackItem.speaker   = "";
  //         shipopEventTrackItem.text      = eventTrack.select;
  //         shipopEventTrackItem.nextLabel = eventTrack.nextLabel;
  //       }

  //       // 空の要素はスキップする
  //       if ( Object.keys(shipopEventTrackItem) != 0 ) {
  //         // 要素追加
  //         shipopEventTracks.push( shipopEventTrackItem );
  //         // 最初お会話をキャプチャ
  //         if ( !shipopEventInfo.firstEventText ) {
  //           shipopEventInfo.firstEventText = shipopEventTrackItem.text;
  //         }
  //       }
  //     }
  //   }
  // }

  return {
    "eventInfo"   : shipopEventInfo,
    "eventTracks" : shipopEventTracks
  };
}

// content load

var saveEmitFunc = null;

window.saveAryNFunc = new Array();

var savePrimJsp = primJsp;
primJsp = function(f,n,d) {

  var saveN1190 = null;
  var saveN1190Ret = null;
  var saveN1190LOCALE = null;
  var saveN1190LOCALT = null;
  var saveN1190LOCALN = null;

  if ( n[1190] ) {
    // EventFirst
    saveN1190 = n[1190];
    n[1190] = function(e, t, n) {
      saveN1190Ret = saveN1190(e, t, n);
      saveN1190LOCALE = e;
      saveN1190LOCALT = t;
      saveN1190LOCALN = n;
      if ( saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit != localemit ) {
        saveEmitFunc = saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit;
        saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit = localemit;
      }
      return saveN1190Ret;
    };
  } else if ( n[1195] ) {
    // ProduceTopFirst
    saveN1190 = n[1195];
    n[1195] = function(e, t, n) {
      saveN1190Ret = saveN1190(e, t, n);
      saveN1190LOCALE = e;
      saveN1190LOCALT = t;
      saveN1190LOCALN = n;
      if ( saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit != localemit ) {
        saveEmitFunc = saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit;
        saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit = localemit;
      }
      return saveN1190Ret;
    };
  } else if ( n[1193] ) {
    // HomeFirst
    saveN1190 = n[1193];
    n[1193] = function(e, t, n) {
      saveN1190Ret = saveN1190(e, t, n);
      saveN1190LOCALE = e;
      saveN1190LOCALT = t;
      saveN1190LOCALN = n;
      if ( saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit != localemit ) {
        saveEmitFunc = saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit;
        saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit = localemit;
      }
      return saveN1190Ret;
    };
  }

  if ( FLG_NOT_NCAPTURE ) {
    if ( arguments.length == 2 ) {
      return savePrimJsp(f,n);
    } else {
      return savePrimJsp(f,n,d);
    }
  }

  window.saveAryNFunc.push( { "f": f, "n" : n, "d" : d } );
  var nkeys = Object.keys(n);

  var cloneN = new Object();
  for ( var ki = 0; ki < nkeys.length; ki++ ) {
    var execAwait = () => {
      var captureN;
      var captNLen;

      captureN = n[nkeys[ki]];
      captNLen = n[nkeys[ki]].length;

      switch( captNLen ) {
      case 2:
        n[nkeys[ki]] = function(p1, p2) {
          return captureN(p1, p2);
        };
        break;
      case 3:
        n[nkeys[ki]] = function(p1, p2, p3) {
          return captureN(p1, p2, p3);
        };
        break;
      default:
        break;
      }
    }
    execAwait();
  }

  return savePrimJsp(f,n,d);
};

window.saveArrayE    = new Array();
window.saveArrayC    = new Array();
window.saveContextE  = new Object();
window.saveContextC  = new Object();
window.saveProduceAudition = null;
window.saveHomePage = null;
window.saveEventPage = null;
window.saveKishaResponse = null;
window.saveKishaResponseArray = new Array();
window.saveAuditionPage = null;
window.saveIdolList = {};
window.saveEvent  = null;
window.saveLessonResult = new Array();
window.saveLessonResultBase = new Array();

// saveEmitFunc = window.aoba.event.__proto__.emit;
function localemit(_tttt, _eeee, _r, _n, _o, _a) {
  if (!window.saveContextE[_tttt]) {
    window.saveContextE[_tttt] = new Array();
    window.saveContextC[_tttt] = new Array();
  }
  window.saveContextE[_tttt].push(_eeee);
  window.saveArrayE.push(_eeee);

  window.saveContextC[_tttt].push(this);
  window.saveArrayC.push(this);

  if ( _tttt == "flash" ) {
    if ( _eeee && _eeee._data && _eeee._data.skillCategory ) {
      window.saveSelectPanel = _eeee;

      // Save Produce Log
      if ( window.saveProduceAudition ) {
        window.postMessage({
          identify: "shipop",
          direction: "shipop-producelog",
          message: "",
          shipopLogTYpe          : "SelectPanel",
          shipopLessonIdolId     : window.saveProduceAudition._store.produceIdol.id,
          shipopLessonSeasonNum  : window.saveProduceAudition._store.seasonNum,
          shipopLessonSeasonWeek : shipopConvertRemainSeasonWeek(window.saveProduceAudition._store.seasonNum, window.saveProduceAudition._store.remainSeasonWeek),
          shipopProduceIdol      : shipopProducePage( window.saveProduceAudition, null ),
          shipopPanelIdolId      : _eeee._data.idolId,
          shipopPanelCategory    : _eeee._data.skillCategory,
          shipopPanelDetail      : _eeee._data.skill,
          shipopUpdateTime       : ( new Date().getTime() )
        }, "*");
      } else {
        window.postMessage({
          identify: "shipop",
          direction: "shipop-producelog",
          message: "",
          shipopLogTYpe          : "SelectPanel",
          shipopLessonIdolId     : "",
          shipopLessonSeasonNum  : "",
          shipopLessonSeasonWeek : "",
          shipopProduceIdol      : "",
          shipopPanelIdolId      : _eeee._data.idolId,
          shipopPanelCategory    : _eeee._data.skillCategory,
          shipopPanelDetail      : _eeee._data.skill,
          shipopUpdateTime       : ( new Date().getTime() )
        }, "*");
      }
    }
  }

  if ( _tttt == "removed" ) {
    // レスポンスイベント
    if ( _eeee &&  _eeee._answerResponse ) {
      if ( window.saveAnswerResponseId != window.saveEventPageId ) {
        window.saveAnswerResponseId = window.saveEventPageId;
        window.saveAnswerResponse  = _eeee;

        // Save Produce Log
        window.postMessage({
          identify: "shipop",
          direction: "shipop-producelog",
          message: "",
          shipopLogTYpe          : "AnswerResult",
          shipopLessonIdolId     : window.saveProduceAudition._store.produceIdol.id,
          shipopLessonSeasonNum  : window.saveProduceAudition._store.seasonNum,
          shipopLessonSeasonWeek : shipopConvertRemainSeasonWeek(window.saveProduceAudition._store.seasonNum, window.saveProduceAudition._store.remainSeasonWeek),
          shipopProduceIdol      : shipopProducePage( window.saveProduceAudition, null ),
          shipopEventId          : window.saveEventPageId,
          shipopAnserResponse    : _eeee._answerResponse,
          shipopUpdateTime       : ( new Date().getTime() )
        }, "*");
      }
    }

  }

  if (  _tttt == "endText" ) {
    // window.saveKishaResponseArray.push( this );
    // endText1
    // this._event._producerCommentUI._name._text
    // プロデューサー
    // this._event._producerCommentUI._content._text
    // ○○様の～
    // endText2
    // this._event._producerCommentUI._name._text
    // プロデューサー
    // this._event._producerCommentUI._content._text
    // 密着取材の以来だ
    // this._event._answersLayer.children[0]._answerItems[0].children[1]._text
    // this._event._answersLayer.children[0]._answerItems[1].children[1]._text
    // endText3
    // this._event._producerCommentUI._name._text
    // プロデューサー
    // this._event._producerCommentUI._content._text
    // よしそれじゃあ
    // this._event._eventAnswers[0-2]
    // endText4
    // this._event._producerCommentUI._name._text
    // プロデューサー
    // this._event._producerCommentUI._content._text
    // 良い記事を
    // this._event._answersLayer.children[0]._answerItems[0].children[1]._text
    // this._event._answersLayer.children[0]._answerItems[1].children[1]._text
    // 判定
    // endText6
    // this._event._producerCommentUI._name._text
    // 敏腕記者
    // this._event._producerCommentUI._content._text
    // 努めます

    // this._event._eventAnswers[0-2].
    // 0: comment1: "プライベートの様子"comment2: "いい記事を書いてもらえそうだ！?これでお願いしようかな？"id: "110100"produceReporterEventId: "1"selectNum: 2__proto__: Object
    // 1: comment1: "レッスンの様子"comment2: "ちょっと心配だけど……?これでお願いしようかな？"id: "110200"produceReporterEventId: "1"selectNum: 1__proto__: Object
    // 2: comment1: "仕事の様子"comment2: "たぶん大丈夫だろう?これでお願いしようかな？"id: "110300"produceReporterEventId: "1"selectNum: 3__proto__: Objectlength: 3__proto__: Array(0)

  }

  if ( _tttt == "added" ) {
    // Get ProduceAudition Items
    if ( _eeee.auditionSceneName == "produceAudition" ) {
      window.saveProduceAudition = _eeee;
      window.saveProduceAudition.updateTime = ( new Date().getTime() );

      window.postMessage({
        identify: "shipop",
        direction: "shipop-main",
        message: "",
        shipopProduceIdol   : shipopProducePage( window.saveProduceAudition, null ),
        shipopPlaces        : null,
        shipopSupportSkills : null,
        shipopSupportIdols  : null,
        shipopEventInfo     : null,
        shipopEventTracks   : null
      }, "*");
    }

    if ( _eeee.name == "skillSelectLayer" && _eeee.parent ) {
      window.saveAuditionPage = _eeee.parent;
      window.saveAuditionPage.updateTime = ( new Date().getTime() );
    }

    if ( _eeee.name == "idolListContainer" ) {
      // 特訓モード判定（はづきさん選択可の場合は特訓モード）
      var evolutionItemMode = false;
      if ( _eeee.parent && _eeee.parent._evolutionItemCheckbox ) {
        evolutionItemMode = true;
      }

      // 特訓モード以外の場合、一覧情報を更新する
      if ( !evolutionItemMode ) {
        var idolType = _eeee._idolType.name;
        window.saveIdolList[idolType] = {};
        window.saveIdolList[idolType].idols    = [].concat(_eeee.idols);
        window.saveIdolList[idolType].idolType = idolType;
        window.saveIdolList[idolType].updateTime = ( new Date().getTime() );

        window.postMessage({
          identify: "shipop",
          direction: "shipop-idollist",
          message: "",
          shipopIdolList : window.saveIdolList[idolType].idols,
          shipopIdolType : window.saveIdolList[idolType].idolType,
          shipopUpdTime  : window.saveIdolList[idolType].updateTime
        }, "*");
      }
    }

    var blnEventUpdate = false;
    // 通常イベント
    if ( _eeee && _eeee._event &&  _eeee._event.eventCategory ) {
      if ( window.saveEventPageId != _eeee._event.id ) {
        blnEventUpdate = true;
        window.saveEventPageId = _eeee._event.id;
        window.saveEventPage   = _eeee;
        window.saveEventPageType = "1";
      }
    // 記者イベント
    } else if ( _eeee && _eeee._reporterAppearance && _eeee._eventAnswers ) {
      if ( window.saveEventPageId != _eeee._reporterAppearance.name ) {
        blnEventUpdate = true;
        window.saveEventPageId = _eeee._reporterAppearance.name;
        window.saveEventPage   = _eeee;
        window.saveEventPageType = "2";
      }
    }
    if ( blnEventUpdate ) {
      var evPage = shipopEventPage( window.saveEventPage, window.saveEventPageType );
      window.postMessage({
        identify: "shipop",
        direction: "shipop-main",
        message: "",
        shipopProduceIdol   : null,
        shipopPlaces        : null,
        shipopSupportSkills : null,
        shipopSupportIdols  : null,
        shipopEventInfo     : evPage.eventInfo,
        shipopEventTracks   : evPage.eventTracks
      }, "*");

      // Save Produce Log
      if ( window.saveProduceAudition ) {
        window.postMessage({
          identify: "shipop",
          direction: "shipop-producelog",
          message: "",
          shipopLogTYpe          : "EventResult",
          shipopLessonIdolId     : window.saveProduceAudition._store.produceIdol.id,
          shipopLessonSeasonNum  : window.saveProduceAudition._store.seasonNum,
          shipopLessonSeasonWeek : shipopConvertRemainSeasonWeek(window.saveProduceAudition._store.seasonNum, window.saveProduceAudition._store.remainSeasonWeek),
          shipopProduceIdol      : shipopProducePage( window.saveProduceAudition, null ),
          shipopEventId          : window.saveEventPageId,
          shipopEventResult      : evPage.eventInfo,
          shipopUpdateTime       : ( new Date().getTime() )
        }, "*");
      } else {
        window.postMessage({
          identify: "shipop",
          direction: "shipop-producelog",
          message: "",
          shipopLogTYpe          : "EventResult",
          shipopLessonIdolId     : "",
          shipopLessonSeasonNum  : "",
          shipopLessonSeasonWeek : "",
          shipopProduceIdol      : "",
          shipopEventId          : window.saveEventPageId,
          shipopEventResult      : evPage.eventInfo,
          shipopUpdateTime       : ( new Date().getTime() )
        }, "*");
      }
    }    
  }

  if ( _eeee && _eeee._myPage ) {
    window.saveHomePage = _eeee;
    window.saveHomePage.updateTime = ( new Date().getTime() );

    // プロデュース側の情報で表示できる場合はそちらでOK
    if ( !window.saveProduceAudition ) {
      window.postMessage({
        identify: "shipop",
        direction: "shipop-main",
        message: "",
        shipopProduceIdol   : shipopProducePage( null, window.saveHomePage ),
        shipopPlaces        : null,
        shipopSupportSkills : null,
        shipopSupportIdols  : null,
        shipopEventInfo     : null,
        shipopEventTracks   : null
      }, "*");
    }
  }


  if ( _eeee && _eeee.lessonResult ) {
    window.saveLessonResult.push( _eeee.lessonResult );
    window.saveLessonResultBase.push( { "_tttt":_tttt, "this":this, "_eeee":_eeee } );

    // Save Produce Log
    window.postMessage({
      identify: "shipop",
      direction: "shipop-producelog",
      message: "",
      shipopLogTYpe          : "ProduceResult",
      shipopLessonIdolId     : window.saveProduceAudition._store.produceIdol.id,
      shipopLessonSeasonNum  : window.saveProduceAudition._store.seasonNum,
      shipopLessonSeasonWeek : shipopConvertRemainSeasonWeek(window.saveProduceAudition._store.seasonNum, window.saveProduceAudition._store.remainSeasonWeek),
      shipopProduceIdol      : shipopProducePage( window.saveProduceAudition, null ),
      shipopPlaceInfo        : this._action,
      shipopPlaceLevelUp     : _eeee.isPlaceLevelUp,
      shipopLessonResult     : _eeee.lessonResult,
      shipopUpdateTime       : ( new Date().getTime() )
    }, "*");

  }


  return saveEmitFunc.bind(this)(_tttt, _eeee, _r, _n, _o, _a);
}

// First Update Schedules
window.setTimeout(shipopTimeoutLoop, 1000);
function shipopTimeoutLoop() {

  // Canvas Loaded Check
  if ( !document.getElementsByTagName("canvas") ) {
    // Next Update Schedules
    window.setTimeout(shipopTimeoutLoop, 1000);
    return;
  }

  // JSON SAVE OBJECT
  var shipopProduceIdol = {};
  var shipopPlaces = new Array();
  var shipopSupportSkills = new Array();
  var shipopSupportIdols = new Array();
  var shipopEventInfo = {};
  var shipopEventTracks = new Array();

  // tab1
  shipopProduceIdol = shipopProducePage( window.saveProduceAudition, window.saveHomePage );

  // tab2
  var tab2places = null;
  if ( window.saveProduceAudition && window.saveProduceAudition._store.places ) {
    tab2places = window.saveProduceAudition._store.places;
  }
  var tab2supportSkills = null;
  if ( window.saveProduceAudition && window.saveProduceAudition._store.supportSkills ) {
    tab2supportSkills = window.saveProduceAudition._store.supportSkills;
  }
  var tab2supportIdols = null;
  if ( window.saveProduceAudition && window.saveProduceAudition._store.supportIdols ) {
    tab2supportIdols = window.saveProduceAudition._store.supportIdols;
  }

  if ( tab2places && tab2places.length > 0 ) {
    for (var idx = 1; idx <= 7; idx++) {
      // COMPOSE SUPPORT IDOLS
      var psupporIdols = "";
      var supporIdolsCount = 0;
      if ( tab2places[(idx - 1)].supportIdols ) {
        supporIdolsCount = tab2places[(idx - 1)].supportIdols.length;
      }

      if ( supporIdolsCount <= 0 ) {
        // no support
        psupporIdols = "-";
      } else {
        // exists support
        for (var idx2 = 0; idx2 < supporIdolsCount; idx2++) {
          var friendName      = tab2places[(idx - 1)].supportIdols[ idx2 ].firstName;
          var friendshipPoint = tab2places[(idx - 1)].supportIdols[ idx2 ].friendshipPoint;
          var friendBGColor = "white";
          if ( friendshipPoint >= 75 ) {
            friendBGColor = "#ffbcff";
          } else if ( friendshipPoint >= 50 ) {
            friendBGColor = "yellow";
          }

          if ( idx2 != 0 ) {
            psupporIdols += "、";
          }

          psupporIdols += '<span style="background-color:' + friendBGColor + ';">';
          psupporIdols += friendName;
          psupporIdols += "(" + friendshipPoint + ")";
          psupporIdols += "</span>";
        }
      }

      var shipopPlaceItem = {};
      shipopPlaceItem.isPromised    = ( tab2places[(idx - 1)].isPromised ? "◎" : "　" );
      shipopPlaceItem.name          = tab2places[(idx - 1)].name;
      shipopPlaceItem.level         = tab2places[(idx - 1)].level;
      shipopPlaceItem.vocal         = tab2places[(idx - 1)].vocal;
      shipopPlaceItem.dance         = tab2places[(idx - 1)].dance;
      shipopPlaceItem.visual        = tab2places[(idx - 1)].visual;
      shipopPlaceItem.mental        = tab2places[(idx - 1)].mental;
      shipopPlaceItem.skillPoint    = tab2places[(idx - 1)].skillPoint;
      shipopPlaceItem.stamina       = tab2places[(idx - 1)].stamina;
      shipopPlaceItem.fan           = tab2places[(idx - 1)].fan;
      shipopPlaceItem.troubleRate   = tab2places[(idx - 1)].troubleRate;
      shipopPlaceItem.supportIdols  = psupporIdols;
      shipopPlaceItem.boostedParams = tab2places[(idx - 1)].boostedParams;
      shipopPlaces.push( shipopPlaceItem );
    }
  }

  // Create/Remove Rows
  if ( tab2supportSkills ) {
    var sprows = new Array();
    for ( var idx = 0; idx < tab2supportSkills.length; idx++ ) {
      var supportSkill = tab2supportSkills[ idx ];

      var shipopSpSkItem = {};
      shipopSpSkItem.effectType             = supportSkill.effectType;
      shipopSpSkItem.producePlaceCategoryId = supportSkill.supportSkillEffect.producePlaceCategoryId;
      shipopSpSkItem.name                   = supportSkill.name;
      shipopSpSkItem.supportSkillLevel      = supportSkill.supportSkillLevel;
      shipopSpSkItem.rate                   = supportSkill.supportSkillEffect.rate;
      shipopSpSkItem.value                  = supportSkill.supportSkillEffect.value;
      shipopSpSkItem.characterId            = supportSkill.characterId;
      shipopSupportSkills.push( shipopSpSkItem );
    }
  }

  if ( tab2supportIdols ) {
    for ( var idx = 0; idx < tab2supportIdols.length; idx++ ) {
      var shipopSpIdolsItem = {};
      shipopSpIdolsItem.supportIdolId = tab2supportIdols[ idx ].supportIdolId;
      shipopSpIdolsItem.characterId   = tab2supportIdols[ idx ].characterId;
      shipopSpIdolsItem.name          = tab2supportIdols[ idx ].name;
      shipopSupportIdols.push( shipopSpIdolsItem );
    }
  }

  // tab3
  var evPage = shipopEventPage( window.saveEventPage, window.saveEventPageType );
  if( evPage ) {
    shipopEventInfo   = evPage.eventInfo;
    shipopEventTracks = evPage.eventTracks;
  }

  // Save Value
  window.postMessage({
    identify: "shipop",
    direction: "shipop-main",
    message: "",
    shipopProduceIdol   : shipopProduceIdol,
    shipopPlaces        : shipopPlaces,
    shipopSupportSkills : shipopSupportSkills,
    shipopSupportIdols  : shipopSupportIdols,
    shipopEventInfo     : shipopEventInfo,
    shipopEventTracks   : shipopEventTracks
  }, "*");

  // Update Idol List
  for ( var idx = 0; idx < CONST_IDOLTYPE.length; idx++ ) {
    var idolType = CONST_IDOLTYPE[idx];
    if ( window.saveIdolList[idolType] ) {
      window.postMessage({
        identify: "shipop",
        direction: "shipop-idollist",
        message: "",
        shipopIdolList : window.saveIdolList[idolType].idols,
        shipopIdolType : window.saveIdolList[idolType].idolType,
        shipopUpdTime  : window.saveIdolList[idolType].updateTime
      }, "*");
    }
  }

  // Next Update Schedules
  window.setTimeout(shipopTimeoutLoop, 3000);
  return;
}
