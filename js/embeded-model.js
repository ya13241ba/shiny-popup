"use strict";
class ShipopProduceIdol {
    constructor() {
        this.produceType = "";
        this.seasonNum = "";
        this.remainSeasonWeek = "";
        this.name = "";
        this.vocal = "";
        this.dance = "";
        this.visual = "";
        this.mental = "";
        this.limitVocal = "";
        this.limitDance = "";
        this.limitVisual = "";
        this.limitMental = "";
        this.skillPoint = "";
        this.stamina = "";
        this.fan = "";
        this.tension = "";
        this.memoryAppealLevel = "";
        this.totalMemoryPoint = "";
        this.firstEventText = "";
    }
}
class ShipopProduceInfo {
    constructor() {
        this.c_produceIdol = new ShipopProduceIdol();
    }
    create(psaveProduceAudition, psaveHomePage) {
        this.c_produceIdol = new ShipopProduceIdol();
        var produceType = "";
        if (psaveProduceAudition) {
            produceType = psaveProduceAudition._store.produceType;
        }
        var produceIdol = null;
        if (psaveProduceAudition && psaveProduceAudition._store.produceIdol) {
            produceIdol = psaveProduceAudition._store.produceIdol;
        }
        else if (psaveHomePage && psaveHomePage._myPage.produceIdol) {
            produceIdol = psaveHomePage._myPage.produceIdol;
        }
        var seasonAndWeeks = { "season": "-", "week": "-" };
        if (psaveProduceAudition && psaveProduceAudition._store.seasonNum) {
            seasonAndWeeks.season = String(psaveProduceAudition._store.seasonNum);
            seasonAndWeeks.week = String(shipopConvertRemainSeasonWeek(psaveProduceAudition._store.seasonNum, psaveProduceAudition._store.remainSeasonWeek));
        }
        else if (psaveHomePage && psaveHomePage._myPage.produce) {
            seasonAndWeeks.season = String(Math.ceil(psaveHomePage._myPage.produce.week / 8));
            seasonAndWeeks.week = String((psaveHomePage._myPage.produce.week - 1) % 8 + 1);
        }
        var targetRank = "";
        if (psaveProduceAudition && psaveProduceAudition._store.targetRank) {
            targetRank = psaveProduceAudition._store.targetRank;
        }
        if (produceIdol) {
            this.c_produceIdol.produceType = produceType;
            this.c_produceIdol.seasonNum = seasonAndWeeks.season;
            this.c_produceIdol.remainSeasonWeek = seasonAndWeeks.week;
            this.c_produceIdol.name = produceIdol.userIdol.name;
            this.c_produceIdol.vocal = produceIdol.vocal;
            this.c_produceIdol.dance = produceIdol.dance;
            this.c_produceIdol.visual = produceIdol.visual;
            this.c_produceIdol.mental = produceIdol.mental;
            this.c_produceIdol.limitVocal = produceIdol.limitVocal;
            this.c_produceIdol.limitDance = produceIdol.limitDance;
            this.c_produceIdol.limitVisual = produceIdol.limitVisual;
            this.c_produceIdol.limitMental = produceIdol.limitMental;
            this.c_produceIdol.skillPoint = produceIdol.skillPoint;
            this.c_produceIdol.stamina = produceIdol.stamina;
            this.c_produceIdol.fan = produceIdol.fan;
            this.c_produceIdol.tension = produceIdol.tension;
            this.c_produceIdol.memoryAppealLevel = produceIdol.memoryAppealLevel;
            this.c_produceIdol.totalMemoryPoint = produceIdol.totalMemoryPoint;
        }
        return this.c_produceIdol;
    }
}
class ShipopPlaceItem {
    constructor() {
        this.isPromised = "";
        this.name = "";
        this.level = "";
        this.vocal = "";
        this.dance = "";
        this.visual = "";
        this.mental = "";
        this.skillPoint = "";
        this.stamina = "";
        this.fan = "";
        this.troubleRate = "";
        this.supportIdols = "";
        this.boostedParams = "";
    }
}
class ShipopPlaceInfo {
    constructor() {
        this.c_placeItems = new Array();
    }
    create(psaveProduceAudition) {
        this.c_placeItems.length = 0;
        let tab2places = null;
        if (psaveProduceAudition && psaveProduceAudition._store.places) {
            tab2places = psaveProduceAudition._store.places;
        }
        if (tab2places && tab2places.length > 0) {
            for (let idx = 1; idx <= 7; idx++) {
                // COMPOSE SUPPORT IDOLS
                let psupporIdols = "";
                let supporIdolsCount = 0;
                if (tab2places[(idx - 1)].supportIdols) {
                    supporIdolsCount = tab2places[(idx - 1)].supportIdols.length;
                }
                if (supporIdolsCount <= 0) {
                    // no support
                    psupporIdols = "-";
                }
                else {
                    // exists support
                    for (let idx2 = 0; idx2 < supporIdolsCount; idx2++) {
                        let friendName = tab2places[(idx - 1)].supportIdols[idx2].firstName;
                        let friendshipPoint = tab2places[(idx - 1)].supportIdols[idx2].friendshipPoint;
                        let friendBGColor = "white";
                        if (friendshipPoint >= 75) {
                            friendBGColor = "#ffbcff";
                        }
                        else if (friendshipPoint >= 50) {
                            friendBGColor = "yellow";
                        }
                        if (idx2 != 0) {
                            psupporIdols += "、";
                        }
                        psupporIdols += '<span style="background-color:' + friendBGColor + ';">';
                        psupporIdols += friendName;
                        psupporIdols += "(" + friendshipPoint + ")";
                        psupporIdols += "</span>";
                    }
                }
                let placeItem = new ShipopPlaceItem();
                placeItem.isPromised = (tab2places[(idx - 1)].isPromised ? "◎" : "　");
                placeItem.name = tab2places[(idx - 1)].name;
                placeItem.level = tab2places[(idx - 1)].level;
                placeItem.vocal = tab2places[(idx - 1)].vocal;
                placeItem.dance = tab2places[(idx - 1)].dance;
                placeItem.visual = tab2places[(idx - 1)].visual;
                placeItem.mental = tab2places[(idx - 1)].mental;
                placeItem.skillPoint = tab2places[(idx - 1)].skillPoint;
                placeItem.stamina = tab2places[(idx - 1)].stamina;
                placeItem.fan = tab2places[(idx - 1)].fan;
                placeItem.troubleRate = tab2places[(idx - 1)].troubleRate;
                placeItem.supportIdols = psupporIdols;
                placeItem.boostedParams = tab2places[(idx - 1)].boostedParams;
                this.c_placeItems.push(placeItem);
            }
        }
        return this.c_placeItems;
    }
}
class ShipopSupportSkillItem {
    constructor() {
        this.effectType = "";
        this.producePlaceCategoryId = "";
        this.name = "";
        this.supportSkillLevel = "";
        this.rate = "";
        this.value = "";
        this.characterId = "";
    }
}
class ShipopSupportSkillInfo {
    constructor() {
        this.c_spskItems = new Array();
    }
    create(psaveProduceAudition) {
        this.c_spskItems.length = 0;
        let tab2supportSkills = null;
        if (psaveProduceAudition && psaveProduceAudition._store.supportSkills) {
            tab2supportSkills = psaveProduceAudition._store.supportSkills;
        }
        if (tab2supportSkills) {
            for (let idx = 0; idx < tab2supportSkills.length; idx++) {
                var supportSkill = tab2supportSkills[idx];
                let spSkItem = new ShipopSupportSkillItem();
                spSkItem.effectType = supportSkill.effectType;
                spSkItem.producePlaceCategoryId = supportSkill.supportSkillEffect.producePlaceCategoryId;
                spSkItem.name = supportSkill.name;
                spSkItem.supportSkillLevel = supportSkill.supportSkillLevel;
                spSkItem.rate = supportSkill.supportSkillEffect.rate;
                spSkItem.value = supportSkill.supportSkillEffect.value;
                spSkItem.characterId = supportSkill.characterId;
                this.c_spskItems.push(spSkItem);
            }
        }
        return this.c_spskItems;
    }
}
class ShipopSupportIdolItem {
    constructor() {
        this.supportIdolId = "";
        this.characterId = "";
        this.name = "";
    }
}
class ShipopSupportIdolInfo {
    constructor() {
        this.c_supportIdolItems = new Array();
    }
    create(psaveProduceAudition) {
        this.c_supportIdolItems.length = 0;
        let tab2supportIdols = null;
        if (psaveProduceAudition && psaveProduceAudition._store.supportIdols) {
            tab2supportIdols = psaveProduceAudition._store.supportIdols;
        }
        if (tab2supportIdols) {
            for (let idx = 0; idx < tab2supportIdols.length; idx++) {
                let supportIdolItem = new ShipopSupportIdolItem();
                supportIdolItem.supportIdolId = tab2supportIdols[idx].supportIdolId;
                supportIdolItem.characterId = tab2supportIdols[idx].characterId;
                supportIdolItem.name = tab2supportIdols[idx].name;
                this.c_supportIdolItems.push(supportIdolItem);
            }
        }
        return this.c_supportIdolItems;
    }
}
class ShipopEventSummary {
    constructor() {
        this.actionName = "";
        this.eventCategoryName = "";
        this.title = "";
        this.answers = "";
        this.character_id = "";
        this.produceEventParams = "";
        this.isExists = false;
        this.vocal = "";
        this.dance = "";
        this.visual = "";
        this.mental = "";
        this.skillPoint = "";
        this.stamina = "";
        this.fan = "";
        this.tension = "";
        this.memoryPoint = "";
        this.friendship = "";
        this.firstEventText = "";
    }
}
class ShipopEventTrack {
    constructor() {
        this.label = "";
        this.speaker = "";
        this.text = "";
        this.nextLabel = "";
    }
}
class ShipopEventInfo {
    constructor() {
        this.eventSummary = new ShipopEventSummary();
        this.eventTracks = new Array();
    }
    create(peventPage, peventType) {
        this.eventSummary = new ShipopEventSummary();
        this.eventTracks = new Array();
        var objRet = null;
        switch (peventType) {
            case "1":
                objRet = this.shipopNormalEventPage(peventPage);
                break;
            case "2":
                objRet = this.shipopKishaEventPage(peventPage);
                break;
        }
        return objRet;
    }
    shipopNormalEventPage(peventPage) {
        var esp = peventPage;
        if (esp) {
            // *** Event Info ***
            this.eventSummary.actionName = esp._event.eventCategory.actionName;
            this.eventSummary.eventCategoryName = esp._event.eventCategoryName;
            this.eventSummary.title = esp._event.title;
            this.eventSummary.answers = esp._event.answers;
            this.eventSummary.character_id = esp._event.character_id;
            this.eventSummary.produceEventParams = esp._event.produceEventParams;
            if (esp._event.eventParam) {
                this.eventSummary.isExists = (true);
                this.eventSummary.vocal = (esp._event.eventParam.vocal);
                this.eventSummary.dance = (esp._event.eventParam.dance);
                this.eventSummary.visual = (esp._event.eventParam.visual);
                this.eventSummary.mental = (esp._event.eventParam.mental);
                this.eventSummary.skillPoint = (esp._event.eventParam.skillPoint);
                this.eventSummary.stamina = (esp._event.eventParam.stamina);
                this.eventSummary.fan = (esp._event.eventParam.fan);
                this.eventSummary.tension = (esp._event.eventParam.tension);
                this.eventSummary.memoryPoint = (esp._event.eventParam.memoryPoint);
                this.eventSummary.friendship = (esp._event.eventParam.friendship);
            }
            else if (esp._event.param) {
                this.eventSummary.isExists = (true);
                this.eventSummary.vocal = (esp._event.param.vocal);
                this.eventSummary.dance = (esp._event.param.dance);
                this.eventSummary.visual = (esp._event.param.visual);
                this.eventSummary.mental = (esp._event.param.mental);
                this.eventSummary.skillPoint = (esp._event.param.skillPoint);
                this.eventSummary.stamina = (esp._event.param.stamina);
                this.eventSummary.fan = ("");
                this.eventSummary.tension = (esp._event.param.tension);
                this.eventSummary.memoryPoint = (esp._event.param.memoryPoint);
                this.eventSummary.friendship = ("");
            }
            else {
                this.eventSummary.isExists = (false);
                this.eventSummary.vocal = ("");
                this.eventSummary.dance = ("");
                this.eventSummary.visual = ("");
                this.eventSummary.mental = ("");
                this.eventSummary.skillPoint = ("");
                this.eventSummary.stamina = ("");
                this.eventSummary.fan = ("");
                this.eventSummary.tension = ("");
                this.eventSummary.memoryPoint = ("");
                this.eventSummary.friendship = ("");
            }
            // *** Event Tracks ***
            this.eventSummary.firstEventText = "";
            if (esp._eventTracks) {
                for (let idx = 0; idx < esp._eventTracks.length; idx++) {
                    var eventTrack = esp._eventTracks[idx];
                    let eventTrackItem = new ShipopEventTrack();
                    let existsTrack = false;
                    if (eventTrack.speaker) {
                        existsTrack = true;
                        // Normal Conversation
                        eventTrackItem.label = eventTrack.label;
                        eventTrackItem.speaker = eventTrack.speaker;
                        eventTrackItem.text = eventTrack.text;
                        eventTrackItem.nextLabel = eventTrack.nextLabel;
                    }
                    else if (eventTrack.select) {
                        existsTrack = true;
                        // Selection
                        eventTrackItem.label = "";
                        eventTrackItem.speaker = "";
                        eventTrackItem.text = eventTrack.select;
                        eventTrackItem.nextLabel = eventTrack.nextLabel;
                    }
                    // 空の要素はスキップする
                    if (existsTrack) {
                        // 要素追加
                        this.eventTracks.push(eventTrackItem);
                        // 最初の会話をキャプチャ
                        if (!this.eventSummary.firstEventText) {
                            this.eventSummary.firstEventText = eventTrackItem.text;
                        }
                    }
                }
            }
        }
        return {
            "eventInfo": this.eventSummary,
            "eventTracks": this.eventTracks,
        };
    }
    shipopKishaEventPage(peventPage) {
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
            "eventInfo": shipopEventInfo,
            "eventTracks": shipopEventTracks
        };
    }
}
