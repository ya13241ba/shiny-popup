"use strict";
// 定数宣言
const CTAB_INFO = 0;
const CTAB_PLAC = 1;
const CTAB_EVEN = 2;
const CONST_IDOLTYPE = [
    "fesIdol",
    "userIdol",
    "userSupportIdol",
    "userReserveIdol",
    "userReserveSupportIdol" // Ｓアイドル控室
];
const FLG_NOT_NCAPTURE = false; // デバックスイッチ
// インスタンス生成
let shipopEventHandler = new ShipopEventHandler();
let shipopProduceInfo = new ShipopProduceInfo();
let shipopSkillPanelInfo = new ShipopSkillPanelInfo();
let shipopPlaceInfo = new ShipopPlaceInfo();
let shipopSupportSkillInfo = new ShipopSupportSkillInfo();
let shipopSupportIdolInfo = new ShipopSupportIdolInfo();
let shipopEventPageInfo = new ShipopEventInfo();
let saveEmitFunc = new Function();
let savePrimJsp = window.tw0mmestheetfk;
// content load
window.saveAryNFunc = new Array();
window.tw0mmestheetfk = function (f, n, d) {
    var saveNFunc = null;
    var saveNFuncRet = null;
    var saveNFuncLOCALE = null;
    var saveNFuncLOCALT = null;
    var saveNFuncLOCALN = null;
    let nindex = -1;
    if (n && f[0] == 0) {
        // 引数nに設定された関数群の１番目を取得する
        nindex = Number.parseInt(Object.keys(n)[0]);
    }
    if (nindex && n[nindex]) {
        saveNFunc = n[nindex];
        n[nindex] = function (e, t, n) {
            saveNFuncRet = saveNFunc(e, t, n);
            saveNFuncLOCALE = e;
            saveNFuncLOCALT = t;
            saveNFuncLOCALN = n;
            if (saveNFuncLOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit != ShipopEventHandler.localemit) {
                saveEmitFunc = saveNFuncLOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit;
                saveNFuncLOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit = ShipopEventHandler.localemit;
            }
            return saveNFuncRet;
        };
    }
    // else if ( n[1190] ) {
    //   // EventFirst
    //   saveN1190 = n[1190];
    //   n[1190] = function(e:any, t:any, n:any) {
    //     saveN1190Ret = saveN1190(e, t, n);
    //     saveN1190LOCALE = e;
    //     saveN1190LOCALT = t;
    //     saveN1190LOCALN = n;
    //     if ( saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit != ShipopEventHandler.localemit ) {
    //       saveEmitFunc = saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit;
    //       saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit = ShipopEventHandler.localemit;
    //     }
    //     return saveN1190Ret;
    //   };
    // } else if ( n[1202] ) {
    //   // ProduceTopFirst
    //   saveN1190 = n[1202];
    //   n[1202] = function(e:any, t:any, n:any) {
    //     saveN1190Ret = saveN1190(e, t, n);
    //     saveN1190LOCALE = e;
    //     saveN1190LOCALT = t;
    //     saveN1190LOCALN = n;
    //     if ( saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit != ShipopEventHandler.localemit ) {
    //       saveEmitFunc = saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit;
    //       saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit = ShipopEventHandler.localemit;
    //     }
    //     return saveN1190Ret;
    //   };
    // } else if ( n[1197] ) {
    //   // ProduceInitMorning
    //   saveN1190 = n[1197];
    //   n[1197] = function(e:any, t:any, n:any) {
    //     saveN1190Ret = saveN1190(e, t, n);
    //     saveN1190LOCALE = e;
    //     saveN1190LOCALT = t;
    //     saveN1190LOCALN = n;
    //     if ( saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit != ShipopEventHandler.localemit ) {
    //       saveEmitFunc = saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit;
    //       saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit = ShipopEventHandler.localemit;
    //     }
    //     return saveN1190Ret;
    //   };
    // } else if ( n[1193] ) {
    //   // HomeFirst
    //   saveN1190 = n[1193];
    //   n[1193] = function(e:any, t:any, n:any) {
    //     saveN1190Ret = saveN1190(e, t, n);
    //     saveN1190LOCALE = e;
    //     saveN1190LOCALT = t;
    //     saveN1190LOCALN = n;
    //     if ( saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit != ShipopEventHandler.localemit ) {
    //       saveEmitFunc = saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit;
    //       saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit = ShipopEventHandler.localemit;
    //     }
    //     return saveN1190Ret;
    //   };
    // }
    if (FLG_NOT_NCAPTURE) {
        if (arguments.length == 2) {
            return savePrimJsp(f, n);
        }
        else {
            return savePrimJsp(f, n, d);
        }
    }
    window.saveAryNFunc.push({ "f": f, "n": n, "d": d });
    var nkeys = Object.keys(n);
    var cloneN = new Object();
    for (var ki = 0; ki < nkeys.length; ki++) {
        var execAwait = () => {
            let captureN;
            let captNLen;
            captureN = n[nkeys[ki]];
            captNLen = n[nkeys[ki]].length;
            switch (captNLen) {
                case 2:
                    n[nkeys[ki]] = function (p1, p2) {
                        return captureN(p1, p2);
                    };
                    break;
                case 3:
                    n[nkeys[ki]] = function (p1, p2, p3) {
                        return captureN(p1, p2, p3);
                    };
                    break;
                default:
                    break;
            }
        };
        execAwait();
    }
    return savePrimJsp(f, n, d);
};
window.saveProduceAudition = null;
window.saveHomePage = null;
window.saveEventPage = null;
window.saveAuditionPage = null;
window.saveIdolList = {};
// First Update Schedules
window.setTimeout(shipopTimeoutLoop, 1000);
function shipopTimeoutLoop() {
    // Canvas Loaded Check
    if (!document.getElementsByTagName("canvas")) {
        // Next Update Schedules
        window.setTimeout(shipopTimeoutLoop, 1000);
        return;
    }
    // JSON SAVE OBJECT
    var shipopEventInfo = {};
    var shipopEventTracks = new Array();
    // tab1
    let shipopProduceIdol = shipopProduceInfo.create(window.saveProduceAudition, window.saveHomePage);
    let shipopSkillPanels = shipopSkillPanelInfo.create(window.saveSkillPage);
    // tab2/Places
    let shipopPlaces = shipopPlaceInfo.create(window.saveProduceAudition);
    // tab2/SupportSkills
    let shipopSupportSkills = shipopSupportSkillInfo.create(window.saveProduceAudition);
    // tab2/SupportIdols
    let shipopSupportIdols = shipopSupportIdolInfo.create(window.saveProduceAudition);
    // tab3
    var evPage = shipopEventPageInfo.create(window.saveEventPage, window.saveEventPageType);
    if (evPage) {
        shipopEventInfo = evPage.eventInfo;
        shipopEventTracks = evPage.eventTracks;
    }
    // Save Value
    window.postMessage({
        identify: "shipop",
        direction: "shipop-main",
        message: "",
        shipopProduceIdol: shipopProduceIdol,
        shipopSkillPanels: shipopSkillPanels,
        shipopPlaces: shipopPlaces,
        shipopSupportSkills: shipopSupportSkills,
        shipopSupportIdols: shipopSupportIdols,
        shipopEventInfo: shipopEventInfo,
        shipopEventTracks: shipopEventTracks
    }, "*");
    // Update Idol List
    for (let idx = 0; idx < CONST_IDOLTYPE.length; idx++) {
        let idolType = CONST_IDOLTYPE[idx];
        if (window.saveIdolList[idolType]) {
            window.postMessage({
                identify: "shipop",
                direction: "shipop-idollist",
                message: "",
                shipopIdolList: window.saveIdolList[idolType].idols,
                shipopIdolType: window.saveIdolList[idolType].idolType,
                shipopUpdTime: window.saveIdolList[idolType].updateTime
            }, "*");
        }
    }
    // Next Update Schedules
    window.setTimeout(shipopTimeoutLoop, 3000);
    return;
}
