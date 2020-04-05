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
let shipopPlaceInfo = new ShipopPlaceInfo();
let shipopSupportSkillInfo = new ShipopSupportSkillInfo();
let shipopSupportIdolInfo = new ShipopSupportIdolInfo();
let shipopEventPageInfo = new ShipopEventInfo();
let saveEmitFunc = new Function();
let savePrimJsp = window.primJsp;
// content load
window.saveAryNFunc = new Array();
window.primJsp = function (f, n, d) {
    var saveN1190 = null;
    var saveN1190Ret = null;
    var saveN1190LOCALE = null;
    var saveN1190LOCALT = null;
    var saveN1190LOCALN = null;
    if (n[1190]) {
        // EventFirst
        saveN1190 = n[1190];
        n[1190] = function (e, t, n) {
            saveN1190Ret = saveN1190(e, t, n);
            saveN1190LOCALE = e;
            saveN1190LOCALT = t;
            saveN1190LOCALN = n;
            if (saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit != ShipopEventHandler.localemit) {
                saveEmitFunc = saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit;
                saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit = ShipopEventHandler.localemit;
            }
            return saveN1190Ret;
        };
    }
    else if (n[1195]) {
        // ProduceTopFirst
        saveN1190 = n[1195];
        n[1195] = function (e, t, n) {
            saveN1190Ret = saveN1190(e, t, n);
            saveN1190LOCALE = e;
            saveN1190LOCALT = t;
            saveN1190LOCALN = n;
            if (saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit != ShipopEventHandler.localemit) {
                saveEmitFunc = saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit;
                saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit = ShipopEventHandler.localemit;
            }
            return saveN1190Ret;
        };
    }
    else if (n[1193]) {
        // HomeFirst
        saveN1190 = n[1193];
        n[1193] = function (e, t, n) {
            saveN1190Ret = saveN1190(e, t, n);
            saveN1190LOCALE = e;
            saveN1190LOCALT = t;
            saveN1190LOCALN = n;
            if (saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit != ShipopEventHandler.localemit) {
                saveEmitFunc = saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit;
                saveN1190LOCALE.exports.default.prototype.__proto__.__proto__.__proto__.__proto__.__proto__.emit = ShipopEventHandler.localemit;
            }
            return saveN1190Ret;
        };
    }
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
    //  var shipopProduceIdol = {};
    // var shipopPlaces = new Array();
    // var shipopSupportSkills = new Array();
    // var shipopSupportIdols = new Array();
    var shipopEventInfo = {};
    var shipopEventTracks = new Array();
    // tab1
    let shipopProduceIdol = shipopProduceInfo.create(window.saveProduceAudition, window.saveHomePage);
    // tab2
    // var tab2places = null;
    // if ( window.saveProduceAudition && window.saveProduceAudition._store.places ) {
    //   tab2places = window.saveProduceAudition._store.places;
    // }
    // var tab2supportSkills = null;
    // if ( window.saveProduceAudition && window.saveProduceAudition._store.supportSkills ) {
    //   tab2supportSkills = window.saveProduceAudition._store.supportSkills;
    // }
    // var tab2supportIdols = null;
    // if ( window.saveProduceAudition && window.saveProduceAudition._store.supportIdols ) {
    //   tab2supportIdols = window.saveProduceAudition._store.supportIdols;
    // }
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
