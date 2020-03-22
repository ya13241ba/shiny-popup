var CTAB_INFO = 0;
var CTAB_PLAC = 1;
var CTAB_EVEN = 2;
var pageLoadCompleted = false;

var iframelist;
function shipopIDMapping( ptabno, ptabelem, pidName ){
  ptabelem[pidName] = $(iframelist[ptabno]).find("#" + pidName);
}
function shipopSeasonRankAndRequireFan( pseason ) {
  switch( String( pseason ) ) {
  case "1" : return { "requiredFan" : "1000" ,  "rank" : "E" };
  case "2" : return { "requiredFan" : "10000",  "rank" : "D" };
  case "3" : return { "requiredFan" : "50000",  "rank" : "C" };
  case "4" : return { "requiredFan" : "100000", "rank" : "B" };
  case "5" : return { "requiredFan" : "100000", "rank" : "B" };
  }
  return { "requiredFan" : "-", "rank" : "-" };
}
function shipopEffectType( pEffectType ){
  switch( pEffectType ) {
  case "tag_boost"      : return "ﾏｽﾀﾘｰ";
  case "tag_stamina"    : return "体力ﾏｽﾀﾘｰ";
  case "tension_boost"  : return "Tﾏｽﾀﾘｰ";
  case "promise_recover": return "約束ﾘｶﾊﾞｰ";
  case "rest_boost"     : return "お休みﾌﾞｰｽﾄ"
  case "stamina_support": return "体力ｻﾎﾟｰﾄ";
  case "trouble_guard"  : return "ﾄﾗﾌﾞﾙｶﾞｰﾄﾞ";
  case "friendship"     : return "ﾌﾚﾝﾄﾞ";
  case "perfect_mastery": return "Pﾏｽﾀﾘｰ";
  }
  return pEffectType;
}
function shipopEffectSortOrder( pEffectType, pPlaceCategoryId ){
  switch( pEffectType ) {
  case "tag_boost"      : return Number("1" + pPlaceCategoryId + "0");
  case "tag_stamina"    : return Number("1" + pPlaceCategoryId + "1");
  case "tension_boost"  : return 500;
  case "promise_recover": return 3;
  case "rest_boost"     : return 1;
  case "stamina_support": return 2;
  case "trouble_guard"  : return 4;
  case "friendship"     : return 6;
  case "perfect_mastery": return 5;
  }
  return 999;
}
function shipopPlaceName( placeCategoryId ) {
  switch( placeCategoryId ) {
  case "0" : return "-";
  case "1" : return "ボーカル";
  case "2" : return "ダンス";
  case "3" : return "ビジュアル";
  case "4" : return "ラジオ";
  case "5" : return "トーク";
  case "6" : return "雑誌";
  case "9" : return "休む";
  }
  return placeCategoryId;
}
function shipopEventActionName( pactionName ) {
  switch( pactionName ) {
  case "selectCommunication"           : return "モーニングイベント";
  case "selectCommunicationPromise"    : return "約束イベント";
  case "selectProduceEvent"            : return "プロデュースイベント";
  case "selectCommunicationCheer"      : return "オーディション前イベント";
  case "selectCommunicationAudition"   : return "オーディション後イベント１";
  case "selectCommunicationTelevision" : return "オーディション後イベント２";
  }
  return pactionName;
}
function shipopEventAnswerIdx( panswers, pintAnswerId ){
	var intRet = -1;
	for ( var intIdx = 0; panswers && intIdx < panswers.length; intIdx++ ) {
		if ( panswers[ intIdx ].id == pintAnswerId ) {
			intRet = intIdx;
			break;
		}
	}
	return intRet;
}
function shipopCharaName( pspidolls, pcharacterId ) {
  if ( !pspidolls ) {
    return pcharacterId;
  }

  for ( var i = 0; i < pspidolls.length; i++ ) {
    if ( pspidolls[i].characterId != pcharacterId ) {
      continue;
    }

    // MATCHE
    return pspidolls[i].name;
  }
  // NO MATCHE
  return -1;
}

function shipopMain( reqJSON, sender, sendResponse ) {
  // ### プロデュース ###
  var produceIdol = reqJSON.shipopProduceIdol;
  if ( produceIdol && Object.keys( produceIdol ).length !== 0 ) {

    // シーズン目標ランク/ファン人数の算出
    var seasonRank = shipopSeasonRankAndRequireFan( produceIdol.seasonNum );

    if ( produceIdol.seasonNum == 5 ) {
      window.tab1elem["seasonNum"       ].html( "W.I.N.G" );
      switch ( produceIdol.remainSeasonWeek ) {
      case 1:
        window.tab1elem["remainSeasonWeek"].html( "準決勝" );
        break;
      case 2:
        window.tab1elem["remainSeasonWeek"].html( "決勝" );
        break;
      default:
        window.tab1elem["remainSeasonWeek"].html( "-" );
        break;
      }
    } else {
      window.tab1elem["seasonNum"       ].html( "シーズン" + produceIdol.seasonNum  );
      window.tab1elem["remainSeasonWeek"].html( "第" + produceIdol.remainSeasonWeek + "週"      );
    }
    window.tab1elem["seasonRank"  ].html( "【目標ランク】" + seasonRank.rank                    );
    window.tab1elem["seasonFan"   ].html( "【目標ﾌｧﾝ人数】" + seasonRank.requiredFan+ "人"      );
    window.tab1elem["name"        ].html( produceIdol.name                                    );
    window.tab1elem["vocal"       ].html( produceIdol.vocal   + "/" + produceIdol.limitVocal  );
    window.tab1elem["dance"       ].html( produceIdol.dance   + "/" + produceIdol.limitDance  );
    window.tab1elem["visual"      ].html( produceIdol.visual  + "/" + produceIdol.limitVisual );
    window.tab1elem["mental"      ].html( produceIdol.mental  + "/" + produceIdol.limitMental );
    window.tab1elem["skillPoint"  ].html( produceIdol.skillPoint       );
    window.tab1elem["stamina"     ].html( produceIdol.stamina + "/100" );
    window.tab1elem["fan"         ].html( produceIdol.fan     + "人"   );
    window.tab1elem["tension"     ].html( produceIdol.tension + "/100" );
    var memAppLevel = produceIdol.memoryAppealLevel;
    var memAppPoint = produceIdol.totalMemoryPoint;
    if ( memAppLevel == 0 && produceIdol.totalMemoryPoint > 0 ) {
      if ( memAppPoint >= 100 ) {
        memAppLevel = 5;
      } else if ( memAppPoint >= 75 ) {
        memAppLevel = 4;
      } else if ( memAppPoint >= 50 ) {
        memAppLevel = 3;
      } else if ( memAppPoint >= 25 ) {
        memAppLevel = 2;
      } else {
        memAppLevel = 1;
      }
    }
    window.tab1elem["memoryAppeal"].html( "Lv." + memAppLevel + " (" + memAppPoint + "/100)" );

    // WIKI Loading
    var strUserIdolName = produceIdol.name.replace(" ", "");
    if ( window.tab1elem["SaveProduceIdolName"] !== strUserIdolName ) {

      // Display Wiki 1
      $( "#shipop-crossframe-1" ).attr("src", 'https://wikiwiki.jp/shinycolors/' + strUserIdolName );

      // Save Display P-Idol Name
      window.tab1elem["SaveProduceIdolName"] = strUserIdolName;
    }

  }

  // ### 場所 ###
  var tab2places = reqJSON.shipopPlaces;
  if ( tab2places ) {
    for ( var idx = 1; idx <= tab2places.length; idx++ ) {
      window.tab1elem2["places_isPromised"    + idx ].html( tab2places[(idx - 1)].isPromised         );
      window.tab1elem2["places_name"          + idx ].html( tab2places[(idx - 1)].name               );
      window.tab1elem2["places_level"         + idx ].html( tab2places[(idx - 1)].level              );
      window.tab1elem2["places_vocal"         + idx ].html( tab2places[(idx - 1)].vocal              )
                                                     .css("background-color", tab2places[(idx - 1)].vocal == 0 ? "gray" : "#ffe7ea" );
      window.tab1elem2["places_dance"         + idx ].html( tab2places[(idx - 1)].dance              )
                                                     .css("background-color", tab2places[(idx - 1)].dance == 0 ? "gray" : "#d6eaf1" );
      window.tab1elem2["places_visual"        + idx ].html( tab2places[(idx - 1)].visual             )
                                                     .css("background-color", tab2places[(idx - 1)].visual == 0 ? "gray" : "#fff1a8" );
      window.tab1elem2["places_mental"        + idx ].html( tab2places[(idx - 1)].mental             )
                                                     .css("background-color", tab2places[(idx - 1)].mental == 0 ? "gray" : "#ffe0ff" );
      window.tab1elem2["places_skillPoint"    + idx ].html( tab2places[(idx - 1)].skillPoint         )
                                                     .css("background-color", tab2places[(idx - 1)].skillPoint == 0 ? "gray" : "#ffd4c3" );
      window.tab1elem2["places_stamina"       + idx ].html( tab2places[(idx - 1)].stamina            )
                                                     .css("background-color", tab2places[(idx - 1)].stamina == 0 ? "gray" : "#c9f9c9" );
      window.tab1elem2["places_fan"           + idx ].html( tab2places[(idx - 1)].fan         + "人" );
      window.tab1elem2["places_troubleRate"   + idx ].html( tab2places[(idx - 1)].troubleRate + "%"  );
      window.tab1elem2["places_supportIdols"  + idx ].html( tab2places[(idx - 1)].supportIdols       );
      window.tab1elem2["places_boostedParams" + idx ].html( tab2places[(idx - 1)].boostedParams      );

    }
  }

  // ### サポートスキル ###
  var tab2supportSkills = reqJSON.shipopSupportSkills;
  var tab2supportIdols = reqJSON.shipopSupportIdols;
  if ( tab2supportIdols ) {
    window.supportIdolNames = tab2supportIdols;
  }

  if ( tab2supportSkills ) {
    window.tab1elem2["shipop-spskills"].find(".shipop-spskills-rows").remove();

    // タイプの昇順ソート
    tab2supportSkills = tab2supportSkills.sort( function(a, b) {
      // trueの場合に入れ替え（a⇔bになる）
      return shipopEffectSortOrder(a.effectType, a.producePlaceCategoryId) - shipopEffectSortOrder(b.effectType, b.producePlaceCategoryId);
    } );

    // Create Row & Settings
    var sprows = new Array();
    for ( var idx = 0; idx < tab2supportSkills.length; idx++ ) {
      var supportSkill = tab2supportSkills[ idx ];

      var cloneTr = window.tab1elem2["shipop-spskills-base"].clone(false).addClass("shipop-spskills-rows").css("display", "");
      var currentTrChildren = cloneTr.children();
      currentTrChildren[0].innerHTML = ( shipopEffectType( supportSkill.effectType ) );
      currentTrChildren[1].innerHTML = ( shipopPlaceName( supportSkill.producePlaceCategoryId ) );
      currentTrChildren[2].innerHTML = ( supportSkill.name + "(Lv." + supportSkill.supportSkillLevel + ")" );
      currentTrChildren[3].innerHTML = ( supportSkill.rate + "％" );
      currentTrChildren[4].innerHTML = ( supportSkill.value );
      currentTrChildren[5].innerHTML = ( shipopCharaName( window.supportIdolNames, supportSkill.characterId ) );
      sprows.push( cloneTr );
    }

    // Push Rows
    window.tab1elem2["shipop-spskills"].append( sprows );
  }


  var eventInfo = reqJSON.shipopEventInfo;
  if ( eventInfo && Object.keys( eventInfo ).length !== 0 ) {

    window.tab1elem3["event_actionName"       ].html( shipopEventActionName( eventInfo.actionName ) );
    if ( eventInfo.eventCategoryName ) {
      window.tab1elem3["event_eventCategoryName"].html( "【" + ( eventInfo.eventCategoryName ) + "】" );
    } else {
      window.tab1elem3["event_eventCategoryName"].html( "" );
    }

    if ( eventInfo.title ) {
      window.tab1elem3["event_title"            ].html( eventInfo.title );
    } else if ( eventInfo.firstEventText ) {
      window.tab1elem3["event_title"            ].html( "「" + ( eventInfo.firstEventText ) + "」" );
    } else {
      window.tab1elem3["event_title"            ].html( " " );
    }

    if ( eventInfo.isExists ) {
      window.tab1elem3["eventparam_vocal"       ].html( eventInfo.vocal             )
                                                 .css("background-color", !( eventInfo.vocal       ) ? "gray" : "white" );
      window.tab1elem3["eventparam_dance"       ].html( eventInfo.dance             )
                                                 .css("background-color", !( eventInfo.dance       ) ? "gray" : "white" );
      window.tab1elem3["eventparam_visual"      ].html( eventInfo.visual            )
                                                 .css("background-color", !( eventInfo.visual      ) ? "gray" : "white" );
      window.tab1elem3["eventparam_mental"      ].html( eventInfo.mental            )
                                                 .css("background-color", !( eventInfo.mental      ) ? "gray" : "white" );
      window.tab1elem3["eventparam_skillPoint"  ].html( eventInfo.skillPoint        )
                                                 .css("background-color", !( eventInfo.skillPoint  ) ? "gray" : "white" );
      window.tab1elem3["eventparam_stamina"     ].html( eventInfo.stamina           )
                                                 .css("background-color", !( eventInfo.stamina     ) ? "gray" : "white" );
      window.tab1elem3["eventparam_fan"         ].html( eventInfo.fan     + "人"    )
                                                 .css("background-color", !( eventInfo.fan         ) ? "gray" : "white" );
      window.tab1elem3["eventparam_tension"     ].html( eventInfo.tension           )
                                                 .css("background-color", !( eventInfo.tension     ) ? "gray" : "white" );
      window.tab1elem3["eventparam_memoryAppeal"].html( eventInfo.memoryPoint       )
                                                 .css("background-color", !( eventInfo.memoryPoint ) ? "gray" : "white" );
      window.tab1elem3["eventparam_friendship"  ].html( eventInfo.friendship        )
                                                 .css("background-color", !( eventInfo.friendship  ) ? "gray" : "white" );
    } else {
      window.tab1elem3["eventparam_vocal"       ].html( "-" ).css("background-color", "white" );
      window.tab1elem3["eventparam_dance"       ].html( "-" ).css("background-color", "white" );
      window.tab1elem3["eventparam_visual"      ].html( "-" ).css("background-color", "white" );
      window.tab1elem3["eventparam_mental"      ].html( "-" ).css("background-color", "white" );
      window.tab1elem3["eventparam_skillPoint"  ].html( "-" ).css("background-color", "white" );
      window.tab1elem3["eventparam_stamina"     ].html( "-" ).css("background-color", "white" );
      window.tab1elem3["eventparam_fan"         ].html( "-" ).css("background-color", "white" );
      window.tab1elem3["eventparam_tension"     ].html( "-" ).css("background-color", "white" );
      window.tab1elem3["eventparam_memoryAppeal"].html( "-" ).css("background-color", "white" );
      window.tab1elem3["eventparam_friendship"  ].html( "-" ).css("background-color", "white" );
    }
  }

  // *** Event Tracks ***
  var eventTracks = reqJSON.shipopEventTracks;
  if ( eventTracks ) {
    window.tab1elem3["shipop-eventtracks"].find(".shipop-eventtracks-rows").remove();
    window.tab1elem3["shipop-eventselects"].find(".shipop-eventtracks-rows").remove();

    // Create Row & Settings
    var ev_select_rows = new Array();
    var ev_track_rows = new Array();
    var SelectLoopCount = 0;
    for ( var idx = 0; idx < eventTracks.length; idx++ ) {
      var cloneTr = window.tab1elem3["shipop-eventtracks-base"].clone(false).addClass("shipop-eventtracks-rows").css("display", "");
      var eventTrack = eventTracks[ idx ];

      if ( eventTrack.speaker ) {
        // Normal Conversation
        var currentTrChildren = cloneTr.children();
        currentTrChildren[0].innerHTML = ( eventTrack.label ? eventTrack.label : "-" );
        currentTrChildren[1].innerHTML = ( eventTrack.speaker  );
        if ( eventTrack.text ) {
          currentTrChildren[2].innerHTML = ( eventTrack.text.replace("\r\n", "<BR>") );
        } else {
          currentTrChildren[2].innerHTML = ( "-" );
        }
        currentTrChildren[3].innerHTML = ( eventTrack.nextLabel ? eventTrack.nextLabel : "-" );
        ev_track_rows.push( cloneTr );
      } else if ( eventTrack.text ) {
        // Selection
        var currentTrChildren = cloneTr.children();
        currentTrChildren[0].innerHTML = ( "-" );
        currentTrChildren[1].innerHTML = ( "-" );

        cloneTr.css("height","30px");
        if ( eventInfo.actionName == "selectCommunication" ) {
          // モーニングイベントの場合
          switch( SelectLoopCount ) {
          case 0:
            cloneTr.css("background-color", "lightpink");
            currentTrChildren[1].innerHTML = ( 'パーフェクト' );
            break;
          case 1:
            cloneTr.css("background-color", "lightyellow");
            currentTrChildren[1].innerHTML = ( 'グッド' );
            break;
          case 2:
            cloneTr.css("background-color", "lightblue");
            currentTrChildren[1].innerHTML = ( 'ノーマル' );
            break;
          }
          SelectLoopCount++;
        } else if ( eventInfo.actionName == "selectCommunicationCheer" ) {
          // オーディション前イベントの場合
          if ( eventInfo.answers && eventInfo.answers.length == 3 ) {
            switch( eventTrack.nextLabel ) {
            case ( eventInfo.answers[0].id ):
              cloneTr.css("background-color", "lightpink");
              currentTrChildren[1].innerHTML = ( 'テンションUP' );
              break;
            case ( eventInfo.answers[1].id ):
              cloneTr.css("background-color", "lightyellow");
              currentTrChildren[1].innerHTML = ( '変化なし' );
              break;
            case ( eventInfo.answers[2].id ):
              cloneTr.css("background-color", "lightblue");
              currentTrChildren[1].innerHTML = ( 'テンションDOWN' );
              break;
            }
          }
        } else if ( eventInfo.actionName == "selectProduceEvent" ) {
          if ( eventInfo.answers ) {

            // Answerのインデックス取得
            var answerIndex = shipopEventAnswerIdx( eventInfo.answers, eventTrack.nextLabel );

            // Answerのパラメータ取得
            var answerParam = eventInfo.produceEventParams[ answerIndex ];

            // 名前欄に表示
            var strParamStr = "Vo:"  + answerParam.vocal;
            strParamStr += " Da:"    + answerParam.dance  + " Vi:" + answerParam.visual;
            strParamStr += "<BR>Me:" + answerParam.mental + " Sp:" + answerParam.skillPoint;
            currentTrChildren[1].innerHTML = strParamStr;

            // 色判定
            if ( answerParam.vocal > 0 || answerParam.dance > 0 || answerParam.visual > 0 ) {

              var blnIsVo = ( answerParam.vocal  > 0 );
              var blnIsDa = ( answerParam.dance  > 0 );
              var blnIsVi = ( answerParam.visual > 0 );
              if ( blnIsVo && !blnIsDa && !blnIsVi ) {
                // Vo単独
                $(currentTrChildren[1]).css("background-color", "lightpink");
              } else if (  blnIsVo &&  blnIsDa && !blnIsVi ) {
                // Vo+Da
                $(currentTrChildren[1]).css("background", "linear-gradient(to right,lightpink 50%, lightblue 50%)");
              } else if (  blnIsVo && !blnIsDa &&  blnIsVi ) {
                // Vo+Vi
                $(currentTrChildren[1]).css("background", "linear-gradient(to right,lightpink 50%, lightyellow 50%)");
              } else if (  blnIsVo &&  blnIsDa &&  blnIsVi ) {
                // Vo+Da+Vi
                $(currentTrChildren[1]).css("background", "linear-gradient(to right,lightpink 33%, lightblue 33% 66%, lightyellow 66%)");
              } else if ( !blnIsVo &&  blnIsDa && !blnIsVi ) {
                // Da単独
                $(currentTrChildren[1]).css("background-color", "lightblue");
              } else if ( !blnIsVo &&  blnIsDa &&  blnIsVi ) {
                // Da+Vi
                $(currentTrChildren[1]).css("background", "linear-gradient(to right,lightblue 50%, lightyellow 50%)");
              } else if ( !blnIsVo && !blnIsDa &&  blnIsVi ) {
                // Vi単独
                $(currentTrChildren[1]).css("background-color", "lightyellow");
              }
            }

            // switch( eventTrack.nextLabel ) {
            // case ( eventInfo.answers[0].id ):
            //   cloneTr.css("background-color", "lightpink");
            //   currentTrChildren[1].innerHTML = ( 'テンションUP' );
            //   break;
            // case ( eventInfo.answers[1].id ):
            //   cloneTr.css("background-color", "lightyellow");
            //   currentTrChildren[1].innerHTML = ( '変化なし' );
            //   break;
            // case ( eventInfo.answers[2].id ):
            //   cloneTr.css("background-color", "lightblue");
            //   currentTrChildren[1].innerHTML = ( 'テンションDOWN' );
            //   break;
            // }
          }
        }

        currentTrChildren[2].innerHTML = ( eventTrack.text.replace("\r\n", "") );
        currentTrChildren[3].innerHTML = ( eventTrack.nextLabel ? eventTrack.nextLabel : "-" );
        ev_track_rows.push( cloneTr );
        ev_select_rows.push( cloneTr.clone(false) );
      }
    }

    // Refresh EvSelect Table
    if ( ev_select_rows.length > 0 ) {
      window.tab1elem3["shipop-eventselects"].show();
      window.tab1elem3["shipop-eventselects"].append(ev_select_rows);
    } else {
      window.tab1elem3["shipop-eventselects"].hide();
    }

    // Refresh EvDetail Table
    window.tab1elem3["shipop-eventtracks"].append(ev_track_rows);
  }
}

window.addEventListener("load", function(event) {
  iframelist = document.getElementsByClassName("shipop-iframe");

  window.tab1elem = new Object();
  shipopIDMapping(CTAB_INFO, window.tab1elem, "messageArea"          );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "seasonNum"            );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "remainSeasonWeek"     );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "seasonRank"           );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "seasonFan"            );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "name"                 );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "vocal"                );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "dance"                );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "visual"               );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "mental"               );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "skillPoint"           );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "stamina"              );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "fan"                  );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "tension"              );
  shipopIDMapping(CTAB_INFO, window.tab1elem, "memoryAppeal"         );

  window.tab1elem2 = new Object();
  for (var idx = 1; idx <= 7; idx++) {
    shipopIDMapping(CTAB_PLAC, window.tab1elem2, "places_isPromised"    + idx );
    shipopIDMapping(CTAB_PLAC, window.tab1elem2, "places_name"          + idx );
    shipopIDMapping(CTAB_PLAC, window.tab1elem2, "places_level"         + idx );
    shipopIDMapping(CTAB_PLAC, window.tab1elem2, "places_vocal"         + idx );
    shipopIDMapping(CTAB_PLAC, window.tab1elem2, "places_dance"         + idx );
    shipopIDMapping(CTAB_PLAC, window.tab1elem2, "places_visual"        + idx );
    shipopIDMapping(CTAB_PLAC, window.tab1elem2, "places_mental"        + idx );
    shipopIDMapping(CTAB_PLAC, window.tab1elem2, "places_skillPoint"    + idx );
    shipopIDMapping(CTAB_PLAC, window.tab1elem2, "places_stamina"       + idx );
    shipopIDMapping(CTAB_PLAC, window.tab1elem2, "places_fan"           + idx );
    shipopIDMapping(CTAB_PLAC, window.tab1elem2, "places_troubleRate"   + idx );
    shipopIDMapping(CTAB_PLAC, window.tab1elem2, "places_supportIdols"  + idx );
    shipopIDMapping(CTAB_PLAC, window.tab1elem2, "places_boostedParams" + idx );
  }
  shipopIDMapping(CTAB_PLAC, window.tab1elem2, "shipop-spskills");
  shipopIDMapping(CTAB_PLAC, window.tab1elem2, "shipop-spskills-base");

  window.tab1elem3 = new Object();
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "event_eventCategoryName"   );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "event_title"               );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "event_actionName"          );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "eventparam_vocal"          );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "eventparam_dance"          );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "eventparam_visual"         );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "eventparam_mental"         );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "eventparam_skillPoint"     );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "eventparam_stamina"        );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "eventparam_fan"            );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "eventparam_tension"        );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "eventparam_memoryAppeal"   );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "eventparam_friendship"     );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "shipop-eventtracks"        );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "shipop-eventtracks-base"   );
  shipopIDMapping(CTAB_EVEN, window.tab1elem3, "shipop-eventselects"        );

  pageLoadCompleted = true;
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // Decompose JSON Request
    window.reqJSON = JSON.parse( request );

    // Produce Info
    if ( !pageLoadCompleted ){
      return true;
    }

    // Process direction method
    if ( window.reqJSON.direction == "shipop-main" ) {
      shipopMain( window.reqJSON, sender, sendResponse );
    }
  }
);
