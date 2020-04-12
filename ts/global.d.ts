interface Window {
    // shiny-defined
    primJsp: Function,

    // global
    saveProduceAudition: any,
    saveSkillPage: any,
    saveHomePage: any,
    saveEventPage: any,
    saveEventPageType:any,
    saveAuditionPage: any,
    saveIdolList: any,

    // event
    saveEventPageId: any,
    saveAnswerResponseId: any,

    // only log used
    saveAryNFunc: Array<any>,               // PrimJsp上に定義されたイベント関数
    saveArrayE: Array<any>,                 // emit時の引数e（発生順）
    saveArrayC: Array<any>,                 // emit時のthis（発生順）
    saveContextE: any,                      // emit時の引数e（イベント種類別）
    saveContextC: any,                      // emit時のthis（イベント種類別）
    saveKishaResponse: any,                 // 記者イベント
    saveKishaResponseArray: Array<any>,     // 記者イベント（全件）
    saveLessonResult: Array<any>,           // レッスン結果
    saveLessonResultBase: Array<any>,       // レッスン結果の引数
    saveAnswerResponse:any,                 // コミュの選択結果の引数e
    saveSelectPanel:any,                    // パネル選択時の引数e

}

