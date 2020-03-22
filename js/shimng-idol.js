
var elementList = {};
var pageLoadCompleted = false;
var shipopFidollistAPI = null;
var shipopPidollistAPI = null;
var shipopSidollistAPI = null;
var shipopFidolUpdate = "";
var shipopPidolUpdate = "";
var shipopSidolUpdate = "";

var FORMAT_TIMESTAMP = "YYYY/MM/DD HH:mm:ss";

var CONST_IDOLTYPE = [
  "fesIdol",         // フェスアイドル
  "userIdol",        // プロデュースアイドル
  "userSupportIdol", // サポートアイドル
]

function shipopUnitShortName( punitID, punitName ) {
  switch( punitID ) {
  case "1": return "ｲﾙﾐﾈｰｼｮﾝｽﾀｰｽﾞ";
  case "2": return "ｱﾝﾃｨｰｶ";
  case "3": return "放課後ｸﾗｲﾏｯｸｽｶﾞｰﾙｽﾞ";
  case "4": return "ｱﾙｽﾄﾛﾒﾘｱ";
  default:
    break;
  }
  return punitName;
}

function shipopRarityName( prarity ) {
  switch( prarity ) {
  case 4: return "SSR";
  case 3: return "SR";
  case 2: return "R";
  case 1: return "N";
  default:  break;
  }
  return prarity;
}

function shipopActiveSkills( pactiveSkill ) {
  var skillHtml = "";
  pactiveSkill.name
  pactiveSkill.comment
}

function shipopFesIdolColor( pfesIdolMarkId ) {
  switch(pfesIdolMarkId) {
  case "1003": case "2001":
  return "#ffe7ea";  // VOCAL
  case "1004": case "2002":
  return "#d6eaf1";  // DANCE
  case "1005": case "2003":
  return "#fff1a8";  // VISUAL
  case "1002": case "2008":
  return "#c9f9c9";  // MENTAL
  case "1001": case "2007":
  return "#ffe0ff";  // MEMORY APPEAL
  case "2009":
  return "#ffe0ff";  // ONE SHOT
  }
  return "";
}

$( document ).ready( function() {
  elementList["shipop-Fidol-lastUpdate" ] = $("#shipop-Fidol-lastUpdate");
  elementList["shipop-Fidollist"        ] = $("#shipop-Fidollist");
  elementList["shipop-Pidol-lastUpdate" ] = $("#shipop-Pidol-lastUpdate");
  elementList["shipop-Pidollist"        ] = $("#shipop-Pidollist");
  elementList["shipop-Sidol-lastUpdate" ] = $("#shipop-Sidol-lastUpdate");
  elementList["shipop-Sidollist"        ] = $("#shipop-Sidollist");

  // フェスアイドル表の設定
  shipopFidollistAPI = elementList["shipop-Fidollist"].DataTable({

    // スクロールバーの設定はあってもなくても大丈夫です。
    scrollX: true,
    scrollY: 200,
    autoWidth: false,
    // 列設定
    columnDefs: [
        { targets:  0, width:   "20" },
        { targets:  1, width:  "100" },
        { targets:  2, width:   "40" },
        { targets:  3, width:  "200" },
        { targets:  4, width:   "40" },
        { targets:  5, width:   "20" },
        { targets:  6, width:   "20" },
        { targets:  7, width:   "20" },
        { targets:  8, width:   "20" },
        { targets:  9, width:   "20" },
        { targets: 10, width:  "120" },
        { targets: 11,                visible: false, searchable: false },
        { targets: 12, width:   "40", visible: false, searchable: false },
        // 620px + 11target * 11px = 731px
    ],
    createdRow : function( row, data, dataIndex){
      $(row).css("background-color", shipopFesIdolColor(data[12]));
    }
  });

  // プロデュースアイドル表の設定
  shipopPidollistAPI = elementList["shipop-Pidollist"].DataTable({

    // スクロールバーの設定はあってもなくても大丈夫です。
    scrollX: true,
    scrollY: 200,
    autoWidth: false,
    // 列設定
    columnDefs: [
        { targets:  0, width:  "100" },
        { targets:  1, width:   "40" },
        { targets:  2, width:  "200" },
        { targets:  3, width:   "40" },
        { targets:  4, width:  "120" },
        // 500px + 5target * 11px = 555px
    ]
  });

  // サポートアイドル表の設定
  shipopSidollistAPI = elementList["shipop-Sidollist"].DataTable({

    // スクロールバーの設定はあってもなくても大丈夫です。
    scrollX: true,
    scrollY: 200,
    autoWidth: false,
    // 列設定
    columnDefs: [
        { targets:  0, width:  "100" },
        { targets:  1, width:   "40" },
        { targets:  2, width:  "200" },
        { targets:  3, width:   "40" },
        { targets:  4, width:   "20" },
        { targets:  5, width:   "20" },
        { targets:  6, width:   "20" },
        { targets:  7, width:   "20" },
        { targets:  8, width:   "20" },
        { targets:  9, width:  "120" },
        // 600px + 10target * 11px = 710px
    ]

  });

  for ( var idx = 0; idx < CONST_IDOLTYPE.length; idx++ ) {
    // ローカル保存データの読込み
    var idolType = CONST_IDOLTYPE[idx];
    var jsonKey = "IDOLLIST_" + idolType;
    var localJSON = localStorage.getItem( jsonKey );
    if ( localJSON ) {

      // ローカル保存データが取得出来た場合は表示する
      shipopIdolList( JSON.parse( localJSON ) , null, null, false );
    }
  }

  pageLoadCompleted = true;
});

function shipopIdolList( reqJSON, sender, sendResponse, isSave ) {
  var idolList = reqJSON.shipopIdolList;
  var idolType = reqJSON.shipopIdolType;
  var updateTime = moment( reqJSON.shipopUpdTime ).format( FORMAT_TIMESTAMP );

  // リストをストレージに保存
  if ( isSave ) {
    var jsonKey = "IDOLLIST_" + reqJSON.shipopIdolType;
    localStorage.setItem( jsonKey, JSON.stringify( reqJSON ) );
  }

  if ( idolType == "fesIdol" ) {
    // ☆☆☆フェスアイドル一覧
    if ( shipopFidolUpdate != updateTime ) {
      // 最終更新日時
      shipopFidolUpdate = updateTime;
      elementList["shipop-Fidol-lastUpdate"].html( "最終更新日時：" + updateTime );
      // データ
      shipopFidollistAPI.clear();
      for ( var idx = 0; idx < idolList.length; idx++ ) {
        var createdAtString = moment( parseInt( idolList[ idx ].createdAt + "000" ) ).format( FORMAT_TIMESTAMP );
        var unitShortName = shipopUnitShortName(
          idolList[ idx ].idol.character.unit.id, idolList[ idx ].idol.character.unit.name );

        for ( var skloop = 0; skloop < idolList[ idx ].activeSkills.length; skloop++ ) {
          idolList[ idx ].activeSkills
        }

        shipopFidollistAPI.row.add([
          ( idolList[ idx ].isLocked ? "☆" : "-" ) ,  // ロック状態
          unitShortName, 　　　　　　　　　　 // ユニット名
          shipopRarityName( idolList[ idx ].idol.rarity ),    // レアリティ
          idolList[ idx ].idol.name,        // 名前
          idolList[ idx ].evolutionStage,   // 特訓回数
          idolList[ idx ].memoryAppeal.level,  // 思い出レベル
          idolList[ idx ].vocal,               // ボーカル値
          idolList[ idx ].dance,               // ダンス値
          idolList[ idx ].visual,              // ビジュアル値
          idolList[ idx ].mental,              // メンタル値
          createdAtString,                     // 加入日時
          "",                                  // スキル
          idolList[ idx ].fesIdolMarkId,       // マークＩＤ
          // shipopActiveSkills( idolList[ idx ].activeSkills[ 0 ] ),  // メンタル値
        ] ).draw( false );
      }
    }

  } else if ( idolType == "userIdol" ) {
    // ☆☆☆プロデュースアイドル一覧
    if ( shipopPidolUpdate != updateTime ) {
      // 最終更新日時
      shipopPidolUpdate = updateTime;
      elementList["shipop-Pidol-lastUpdate"].html( "最終更新日時：" + updateTime );
      // データ
      shipopPidollistAPI.clear();
      for ( var idx = 0; idx < idolList.length; idx++ ) {
        var createdAtString = moment( parseInt( idolList[ idx ].createdAt + "000" ) ).format( FORMAT_TIMESTAMP );
        var unitShortName = shipopUnitShortName(
          idolList[ idx ].idol.character.unit.id, idolList[ idx ].idol.character.unit.name );
        shipopPidollistAPI.row.add([
          unitShortName, 　　　　　　　　　　 // ユニット名
          shipopRarityName( idolList[ idx ].idol.rarity ),   // レアリティ
          idolList[ idx ].idol.name,        // 名前
          idolList[ idx ].evolutionStage,   // 特訓回数
          createdAtString                   // 加入日時
        ] ).draw( false );
      }
    }
  } else if ( idolType == "userSupportIdol" ) {
    // ☆☆☆サポートアイドル一覧
    if ( shipopSidolUpdate != updateTime ) {
      // 最終更新日時
      shipopSidolUpdate = updateTime;
      elementList["shipop-Sidol-lastUpdate"].html( "最終更新日時：" + updateTime );
      // データ
      shipopSidollistAPI.clear();
      for ( var idx = 0; idx < idolList.length; idx++ ) {
        var createdAtString = moment( parseInt( idolList[ idx ].createdAt + "000" ) ).format( FORMAT_TIMESTAMP );
        var unitShortName = shipopUnitShortName(
          idolList[ idx ].supportIdol.character.unit.id, idolList[ idx ].supportIdol.character.unit.name );

        shipopSidollistAPI.row.add([
          unitShortName,                             // ユニット名
          shipopRarityName( idolList[ idx ].supportIdol.rarity ),     // レアリティ
          idolList[ idx ].supportIdol.name,          // 名前
          idolList[ idx ].evolutionStage,            // 特訓回数
          idolList[ idx ].level,                     // レベル
          idolList[ idx ].vocalBonus,                // ボーカル値
          idolList[ idx ].danceBonus,                // ダンス値
          idolList[ idx ].visualBonus,               // ビジュアル値
          idolList[ idx ].mentalBonus,               // メンタル値
          createdAtString                            // 加入日時
        ] ).draw( false );
      }
    }
  } else if ( idolType == "" ) {

  }

}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // Decompose JSON Request
    window.reqJSON = JSON.parse( request );

    // Produce Info
    if ( !pageLoadCompleted ){
      return true;
    }

    // Process direction method
    if ( window.reqJSON.direction == "shipop-idollist" ) {
      shipopIdolList( window.reqJSON, sender, sendResponse, true );
    }
  }
);
