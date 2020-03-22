const FORMAT_TIMESTAMP = "YYYYMMDDHHmmss";

// *** 公開プロパティ ***
// shipopLastUpdateFlg：最終更新分をバックアップ対象に含めるか？
//  true:含める、false:除外する
let shipopLastUpdateFlg = true;

let shipopOutputPath = "";

// *** 変数 ***
let shipopLastUpdateKey = "";

// *** 非公開メソッド ***
function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
}

// https://gist.github.com/gaelbillon/3781122
function shipopCalcLocalStorageSize () {

  let lsTotalSizeProduceLog = 0;
  let lsTotalSizeSystemInfo = 0;

  for ( let i = 0; i < localStorage.length; i++ ) {
    let lskey = localStorage.key(i);
    if ( !lskey.startsWith("plog_") ) {
      // Not plog data
      lsTotalSizeSystemInfo += localStorage.getItem( lskey ).length;
    } else if ( lskey == "plog_lastUpdateInfo" ) {
      // lastupdate plog info
      lsTotalSizeSystemInfo += localStorage.getItem( lskey ).length;
      // get LastUpdate Plog Key
      shipopLastUpdateKey = "plog_" + shipopGetLastUpdateLogID();
    } else {
      // plog data
      lsTotalSizeProduceLog += localStorage.getItem( lskey ).length;
    }
  }

  $("#lsTotalSizeProduceLog").html( bytesToSize(lsTotalSizeProduceLog) );
  $("#lsTotalSizeTotal"     ).html( bytesToSize(lsTotalSizeProduceLog + lsTotalSizeSystemInfo) );

}

function shipopBackupProduceLog() {

  let bkarray = new Array();
  for ( let i = 0; i < localStorage.length; i++ ) {
    let lskey = localStorage.key(i);
    if ( !lskey.startsWith("plog_") ) {
      // Not plog data
    } else if ( lskey == "plog_lastUpdateInfo" ) {
      // lastupdate plog info
    } else if ( lskey == shipopLastUpdateKey ) {
      // Last Update Log
    } else {
      // Produce Log
      // (1) push log
      bkarray.push( localStorage.getItem( lskey ) );
      // (2) remove log
      localStorage.removeItem( lskey );
      // (3) move current index
      i--;
    }
  }

  if ( bkarray.length < 0 ) {
    aleart( "出力対象のプロデュースログはありませんでした。#plog" );
    return;
  }

  // Create BLOB file
  let bdata = JSON.stringify( bkarray );
  let blob = new Blob( [ bdata ] , { type: "text/plain" } );

  // Generate A-Link for hidden download
  let alink = document.createElement("a");
  alink.href = URL.createObjectURL(blob);
  alink.target = '_blank';
  alink.download = 'plog_bk_' + moment().format( FORMAT_TIMESTAMP ) + '.json';
  alink.click();

}

function shipopGetLastUpdateLogID() {

  let lastUpdateID = "";
  let lastUpdateItem = localStorage.getItem( "plog_lastUpdateInfo" );

  if ( lastUpdateItem ) {
    var lastUpdateJSON = JSON.parse( lastUpdateItem );
    lastUpdateID = lastUpdateJSON.shipopLessonIdolId;
  }

  return lastUpdateID;
}

// *** イベント ***
function bkbtn_onclick() {
  // let backupDir = $("#lsBackupOutputPath").val();
  // if ( backupDir ) {
  //
  // }

  // バックアップ実施
  shipopBackupProduceLog();

  // LSサイズ計算
  shipopCalcLocalStorageSize();
}

$( document ).ready( function() {

  // イベント設定
  $("#lsBackupOutputButton").click( bkbtn_onclick );

  // LSサイズ計算
  shipopCalcLocalStorageSize();
}
