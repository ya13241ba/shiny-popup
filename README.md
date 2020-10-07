# shiny-popup

## アクティブスクリプト

* shipop-main.js
    * 以下のURLにマッチした場合に読み込まれる
    https://shinycolors.enza.fun/*
    * embeded-XXX.jsを上記ページに埋め込む

* embeded-common.js
* embeded-model.js
* embeded-event.js
* embeded-script.js
    * シャニマスの埋め込みスクリプト
    * embeded-script.jsから各種パッシブスクリプトにメッセージ送信する

* shiwiki-main.js
    * 以下のURLにマッチした場合に読み込まれる
    https://wikiwiki.jp/shinycolors/*
    * shiwiki-emb.jsを上記ページに埋め込む
* shiwiki-emb.js
    * シャニマスWIKIの埋め込み用スクリプト

## パッシブスクリプト

* shipop-bg.js
    * 拡張機能クリックでポップアップ画面(shipop-content-base.html)を開くための自動起動スクリプト
    * ログ保存メッセージの受信スクリプトを兼ねる

* shipop-content-base.html
* shimng-main.js
    * ポップアップ画面
    * [shipop-main] のメッセージを受信する

* shipop-idollist.html
* shimng-idol.js
    * アイドルリスト画面
    * [shipop-idollist] のメッセージを受信する

* shipop-option.html
* shimng-option.js
    * 設定画面（作成途中）


