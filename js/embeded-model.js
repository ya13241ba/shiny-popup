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
        this.fesPoint = new ShipopFesPoint();
    }
}
class ShipopFesPoint {
    constructor() {
        this.fesDeckRankPointCenter = "";
        this.fesDeckRankPointDance = "";
        this.fesDeckRankPointLeader = "";
        this.fesDeckRankPointVisual = "";
        this.fesDeckRankPointVocal = "";
        this.fesIdolRankPoint = "";
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
            if (produceIdol.memoryAppeal) {
                this.c_produceIdol.fesPoint.fesDeckRankPointCenter = produceIdol.memoryAppeal.fesDeckRankPointCenter;
                this.c_produceIdol.fesPoint.fesDeckRankPointDance = produceIdol.memoryAppeal.fesDeckRankPointDance;
                this.c_produceIdol.fesPoint.fesDeckRankPointLeader = produceIdol.memoryAppeal.fesDeckRankPointLeader;
                this.c_produceIdol.fesPoint.fesDeckRankPointVisual = produceIdol.memoryAppeal.fesDeckRankPointVisual;
                this.c_produceIdol.fesPoint.fesDeckRankPointVocal = produceIdol.memoryAppeal.fesDeckRankPointVocal;
                this.c_produceIdol.fesPoint.fesIdolRankPoint = produceIdol.memoryAppeal.fesIdolRankPoint;
            }
        }
        return this.c_produceIdol;
    }
}
class ShipopSkillPanelItem {
    constructor() {
        this.charaId = "";
        this.evolutionStage = 0;
        this.idolId = "";
        this.skillCategory = "";
        this.isAcquired = false;
        this.panelCategory = 0;
        this.sequence = 0;
        this.skillLevel = 0;
        this.skillPoint = 0;
        this.isArrival = false;
        this.isLocked = false;
        this.skill_name = "";
        this.skill_comment = "";
        this.skill_rarity = 0;
        this.skill_rate = 0;
        this.skill_condition = "";
        this.skill_conditionAttribute = "";
        this.skill_conditionEffectType = "";
        this.skill_conditionValue = 0;
        this.skill_fesDeckRankPointCenter = 0;
        this.skill_fesDeckRankPointDance = 0;
        this.skill_fesDeckRankPointLeader = 0;
        this.skill_fesDeckRankPointVisual = 0;
        this.skill_fesDeckRankPointVocal = 0;
        this.skill_fesIdolRankPoint = 0;
        this.skill_canShare = false;
    }
}
class ShipopSkillPanelInfo {
    constructor() {
        this.c_skillPanelItems = new Array();
    }
    create(psaveSkillPage) {
        this.c_skillPanelItems.length = 0;
        let tab1AllSkillPanels = null;
        if (psaveSkillPage && psaveSkillPage._allSkillPanels) {
            tab1AllSkillPanels = psaveSkillPage._allSkillPanels;
        }
        if (tab1AllSkillPanels) {
            Object.keys(tab1AllSkillPanels).forEach((charaId) => {
                let skillpanels = tab1AllSkillPanels[charaId];
                Object.keys(skillpanels).forEach((i) => {
                    let skillpanel = skillpanels[i];
                    let skillPanelItem = new ShipopSkillPanelItem();
                    skillPanelItem.charaId = charaId;
                    skillPanelItem.evolutionStage = skillpanel._data.evolutionStage;
                    skillPanelItem.idolId = skillpanel._data.idolId;
                    skillPanelItem.skillCategory = skillpanel._data.skillCategory;
                    skillPanelItem.isAcquired = skillpanel._data.isAcquired;
                    skillPanelItem.panelCategory = skillpanel._data.panelCategory;
                    skillPanelItem.sequence = skillpanel._data.sequence;
                    skillPanelItem.skillLevel = skillpanel._data.skillLevel;
                    skillPanelItem.skillPoint = skillpanel._data.skillPoint;
                    skillPanelItem.isArrival = skillpanel._data.isArrival;
                    skillPanelItem.isLocked = skillpanel._data.isLocked;
                    skillPanelItem.skill_name = skillpanel._data.skill.name;
                    skillPanelItem.skill_comment = skillpanel._data.skill.comment;
                    skillPanelItem.skill_rarity = skillpanel._data.skill.rarity;
                    skillPanelItem.skill_rate = skillpanel._data.skill.rate;
                    skillPanelItem.skill_condition = skillpanel._data.skill.condition;
                    skillPanelItem.skill_conditionAttribute = skillpanel._data.skill.conditionAttribute;
                    skillPanelItem.skill_conditionEffectType = skillpanel._data.skill.conditionEffectType;
                    skillPanelItem.skill_conditionValue = skillpanel._data.skill.conditionValue;
                    skillPanelItem.skill_fesDeckRankPointCenter = skillpanel._data.skill.fesDeckRankPointCenter;
                    skillPanelItem.skill_fesDeckRankPointDance = skillpanel._data.skill.fesDeckRankPointDance;
                    skillPanelItem.skill_fesDeckRankPointLeader = skillpanel._data.skill.fesDeckRankPointLeader;
                    skillPanelItem.skill_fesDeckRankPointVisual = skillpanel._data.skill.fesDeckRankPointVisual;
                    skillPanelItem.skill_fesDeckRankPointVocal = skillpanel._data.skill.fesDeckRankPointVocal;
                    skillPanelItem.skill_fesIdolRankPoint = skillpanel._data.skill.fesIdolRankPoint;
                    skillPanelItem.skill_canShare = skillpanel._data.skill.canShare;
                    this.c_skillPanelItems.push(skillPanelItem);
                });
            });
        }
        return this.c_skillPanelItems;
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
            let createSupportIdol = (isHelper, supportIdol) => {
                let friendName = "";
                if (isHelper) {
                    friendName = "はづき";
                }
                else {
                    friendName = supportIdol.firstName;
                }
                let friendshipPoint = supportIdol.friendshipPoint;
                let friendBGColor = "white";
                if (friendshipPoint >= 75) {
                    friendBGColor = "#ffbcff";
                }
                else if (friendshipPoint >= 50) {
                    friendBGColor = "yellow";
                }
                let friendshipIdeaNote = supportIdol.idea;
                let retVal = '<span style="background-color:' + friendBGColor + ';">';
                retVal += friendName;
                ;
                retVal += "(" + friendshipPoint + "/100)";
                retVal += "</span>";
                if (friendshipIdeaNote) {
                    let markString = "";
                    switch (friendshipIdeaNote.ideaMark) {
                        case "vocal":
                            markString = "ボーカル";
                            break;
                        case "dance":
                            markString = "ダンス";
                            break;
                        case "visual":
                            markString = "ビジュアル";
                            break;
                        case "talk":
                            markString = "トーク";
                            break;
                        case "skill_point":
                            markString = "アピール";
                            break;
                        case "special":
                            markString = "スペシャル";
                            break;
                    }
                    retVal += " アイデア：" + markString + "(Lv." + friendshipIdeaNote.level + ")";
                }
                return retVal;
            };
            for (let idx = 1; idx <= 7; idx++) {
                // COMPOSE SUPPORT IDOLS
                let psupporIdols = "";
                let supporIdolsCount = 0;
                if (tab2places[(idx - 1)].supportIdols) {
                    supporIdolsCount = tab2places[(idx - 1)].supportIdols.length;
                }
                // COMPOSE NORMAL-SUPPORT IDOLS
                for (let idx2 = 0; idx2 < supporIdolsCount; idx2++) {
                    if (psupporIdols != "") {
                        psupporIdols += "<br>";
                    }
                    psupporIdols += createSupportIdol(false, tab2places[(idx - 1)].supportIdols[idx2]);
                }
                // COMPOSE HELPER(HADUKI)
                if (tab2places[(idx - 1)].helperStaff) {
                    if (psupporIdols != "") {
                        psupporIdols += "<br>";
                    }
                    psupporIdols += createSupportIdol(true, tab2places[(idx - 1)].helperStaff);
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
