
window.saveArrayE    = new Array();
window.saveArrayC    = new Array();
window.saveContextE  = new Object();
window.saveContextC  = new Object();

window.saveKishaResponse = null;
window.saveKishaResponseArray = new Array();

window.saveLessonResult = new Array();
window.saveLessonResultBase = new Array();

class ShipopEventHandler {

  constructor() { }

  static fncLocalemitFlash(_tttt:any, _eeee:any, _r:any, _n:any, _o:any, _a:any) {
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
          shipopProduceIdol      : shipopProduceInfo.create( window.saveProduceAudition, null ),
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
  
  static fncLocalemitRemoved(_tttt:any, _eeee:any, _r:any, _n:any, _o:any, _a:any) {
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
          shipopProduceIdol      : shipopProduceInfo.create( window.saveProduceAudition, null ),
          shipopEventId          : window.saveEventPageId,
          shipopAnserResponse    : _eeee._answerResponse,
          shipopUpdateTime       : ( new Date().getTime() )
        }, "*");
      }
    }
  }
  
  static fncLocalemitEndtext(_tttt:any, _eeee:any, _r:any, _n:any, _o:any, _a:any) {
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
  
  static fncLocalemitAdded(_tttt:any, _eeee:any, _r:any, _n:any, _o:any, _a:any) {
    // Get ProduceAudition Items
    if ( _eeee.auditionSceneName == "produceAudition" ) {
      window.saveProduceAudition = _eeee;
      window.saveProduceAudition.updateTime = ( new Date().getTime() );
  
      window.postMessage({
        identify: "shipop",
        direction: "shipop-main",
        message: "",
        shipopProduceIdol   : shipopProduceInfo.create( window.saveProduceAudition, null ),
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
      var evPage = shipopEventPageInfo.create( window.saveEventPage, window.saveEventPageType );
      if( evPage ) {
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
            shipopProduceIdol      : shipopProduceInfo.create( window.saveProduceAudition, null ),
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
  }
  
  static localemit(_tttt:any, _eeee:any, _r:any, _n:any, _o:any, _a:any) {

    if (!window.saveContextE[_tttt]) {
      window.saveContextE[_tttt] = new Array();
      window.saveContextC[_tttt] = new Array();
    }
    window.saveContextE[_tttt].push(_eeee);
    window.saveArrayE.push(_eeee);
  
    window.saveContextC[_tttt].push(this);
    window.saveArrayC.push(this);
    
    switch( _tttt ) {
    case "flash":
      ShipopEventHandler.fncLocalemitFlash(_tttt, _eeee, _r, _n, _o, _a);
      break;
    case "removed":
      // レスポンスイベント
      ShipopEventHandler.fncLocalemitRemoved(_tttt, _eeee, _r, _n, _o, _a);
      break;
    case "endText":
      ShipopEventHandler.fncLocalemitEndtext(_tttt, _eeee, _r, _n, _o, _a);
      break;
    case "added":
      ShipopEventHandler.fncLocalemitAdded(_tttt, _eeee, _r, _n, _o, _a);
      break;
    default:
      break;
    }
  
    if ( _eeee ) {
  
      if ( _eeee._myPage ) {
        window.saveHomePage = _eeee;
        window.saveHomePage.updateTime = ( new Date().getTime() );
  
        // プロデュース側の情報で表示できる場合はそちらでOK
        if ( !window.saveProduceAudition ) {
          window.postMessage({
            identify: "shipop",
            direction: "shipop-main",
            message: "",
            shipopProduceIdol   : shipopProduceInfo.create( null, window.saveHomePage ),
            shipopPlaces        : null,
            shipopSupportSkills : null,
            shipopSupportIdols  : null,
            shipopEventInfo     : null,
            shipopEventTracks   : null
          }, "*");
        }
      }
  
      if ( _eeee.lessonResult ) {
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
          shipopProduceIdol      : shipopProduceInfo.create( window.saveProduceAudition, null ),
  //        shipopPlaceInfo        : this._action,
          shipopPlaceLevelUp     : _eeee.isPlaceLevelUp,
          shipopLessonResult     : _eeee.lessonResult,
          shipopUpdateTime       : ( new Date().getTime() )
        }, "*");
      }
    }
  
    return saveEmitFunc.bind(this)(_tttt, _eeee, _r, _n, _o, _a);
  }
}




