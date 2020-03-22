
var elementList = {};
var pageLoadCompleted = false;
var shipopPLogDetail = null;

var FORMAT_TIMESTAMP = "YYYY/MM/DD HH:mm:ss";

function shipopProduceLogColor( plogType ) {
  switch( plogType ) {
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

function shipopLoadProduceLog( plog ) {
  // Load Produce IdolName
  if ( plog.length > 0 ) {
    elementList["shipop-plogdetail-idolname"].html( plog[ 0 ].shipopLessonIdolName );
  } else {
    elementList["shipop-plogdetail-idolname"].html( "" );
  }

  // Load Produce Log Detail
  shipopPidollistAPI.clear();
  for( var i = 0; i < plog.length; i++ ) {

    var strLogBody = "";

    shipopPidollistAPI.row.add([
      plog[ i ].shipopLessonSeasonNum,               // シーズン
      plog[ i ].shipopLessonSeasonWeek,              // 経過週
      plog[ i ].shipopLogType,                       // ログ種別
      shipopLogTypeName( plog[ i ].shipopLogType ),  // ログ種別名
      strLogBody,
      // shipopActiveSkills( idolList[ idx ].activeSkills[ 0 ] ),  // メンタル値
    ] ).draw( false );

  }
}

$( document ).ready( function() {

  elementList["shipop-ploginfo-table"]      = $("#shipop-ploginfo-table");
  elementList["shipop-plogdetail-table"]    = $("#shipop-plogdetail-table");
  elementList["shipop-plogdetail-idolname"] = $("#shipop-plogdetail-idolname");

  shipopPLogDetail = elementList["shipop-ploginfo-table"].DataTable({
      // スクロールバーの設定はあってもなくても大丈夫です。
      scrollX: true,
      scrollY: 300,
      autoWidth: false,

      // 列設定
      columnDefs: [
          { targets:  0, width:   "20" },
          { targets:  1, width:   "20" },
          { targets:  2, width:   "50" },
          { targets:  3, width:   "40" },
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
        $(row).css("background-color", shipopProduceLogColor(data[2]));
      }
  });

  // プロデュースログ表の設定
  shipopPLogDetail = elementList["shipop-plogdetail-table"].DataTable({

    // スクロールバーの設定はあってもなくても大丈夫です。
    scrollX: true,
    scrollY: 400,
    autoWidth: false,

    // 列設定
    columnDefs: [
        { targets:  0, width:   "20" },
        { targets:  1, width:   "20" },
        { targets:  2,                visible: false, searchable: false },
        { targets:  3, width:   "50" },
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
      $(row).css("background-color", shipopProduceLogColor(data[2]));
    }
  });

  // プロデュースログの一覧取得
  var LSKeyNames = []
  for (var i = 0; i < localStorage.length; i++) {
    if ( localStorage.key( i ).substr( 0, 5 ) == "plog_" ) {
      LSKeyNames.push( localStorage.key( i ) );
    }
  }

  var LSProduceLog = JSON.parse( localStorage.getItem( LSKeyNames[ 0 ] ) );
  if ( LSProduceLog ) {
    shipopLoadProduceLog( LSProduceLog );
  }

  pageLoadCompleted = true;
});
