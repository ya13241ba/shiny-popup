class ShipopProduceIdol {
    produceType        : string = "";
    seasonNum          : string = "";
    remainSeasonWeek   : string = "";
    name               : string = "";
    vocal              : string = "";
    dance              : string = "";
    visual             : string = "";
    mental             : string = "";
    limitVocal         : string = "";
    limitDance         : string = "";
    limitVisual        : string = "";
    limitMental        : string = "";
    skillPoint         : string = "";
    stamina            : string = "";
    fan                : string = "";
    tension            : string = "";
    memoryAppealLevel  : string = "";
    totalMemoryPoint   : string = "";
    firstEventText     : string = "";
    fesPoint           : ShipopFesPoint = new ShipopFesPoint();
}
class ShipopFesPoint {
    fesDeckRankPointCenter : string = "";
    fesDeckRankPointDance  : string = "";
    fesDeckRankPointLeader : string = "";
    fesDeckRankPointVisual : string = "";
    fesDeckRankPointVocal  : string = "";
    fesIdolRankPoint       : string = "";
}

class ShipopProduceInfo {
    c_produceIdol : ShipopProduceIdol;

    constructor() {
        this.c_produceIdol = new ShipopProduceIdol();
    }

    create( psaveProduceAudition:any, psaveHomePage:any ) {
        
        this.c_produceIdol = new ShipopProduceIdol();

        var produceType = "";
        if ( psaveProduceAudition ) {
            produceType = psaveProduceAudition._store.produceType;
        }

        var produceIdol = null;
        if ( psaveProduceAudition && psaveProduceAudition._store.produceIdol ) {
            produceIdol = psaveProduceAudition._store.produceIdol;
        } else if ( psaveHomePage && psaveHomePage._myPage.produceIdol ) {
            produceIdol = psaveHomePage._myPage.produceIdol;
        }
        
        var seasonAndWeeks = { "season": "-", "week": "-" };
        if ( psaveProduceAudition && psaveProduceAudition._store.seasonNum ) {
            seasonAndWeeks.season = String( psaveProduceAudition._store.seasonNum );
            seasonAndWeeks.week   = String( shipopConvertRemainSeasonWeek(psaveProduceAudition._store.seasonNum, psaveProduceAudition._store.remainSeasonWeek) );
        } else if ( psaveHomePage && psaveHomePage._myPage.produce ) {
            seasonAndWeeks.season = String( Math.ceil(psaveHomePage._myPage.produce.week / 8)  );
            seasonAndWeeks.week   = String( ( psaveHomePage._myPage.produce.week - 1 ) % 8 + 1 );
        }
        
        var targetRank = "";
        if ( psaveProduceAudition && psaveProduceAudition._store.targetRank ) {
            targetRank = psaveProduceAudition._store.targetRank;
        }
        
        if ( produceIdol ) {
            this.c_produceIdol.produceType       = produceType;
            this.c_produceIdol.seasonNum         = seasonAndWeeks.season;
            this.c_produceIdol.remainSeasonWeek  = seasonAndWeeks.week;
            this.c_produceIdol.name              = produceIdol.userIdol.name;
            this.c_produceIdol.vocal             = produceIdol.vocal;
            this.c_produceIdol.dance             = produceIdol.dance;
            this.c_produceIdol.visual            = produceIdol.visual;
            this.c_produceIdol.mental            = produceIdol.mental;
            this.c_produceIdol.limitVocal        = produceIdol.limitVocal;
            this.c_produceIdol.limitDance        = produceIdol.limitDance;
            this.c_produceIdol.limitVisual       = produceIdol.limitVisual;
            this.c_produceIdol.limitMental       = produceIdol.limitMental;
            this.c_produceIdol.skillPoint        = produceIdol.skillPoint;
            this.c_produceIdol.stamina           = produceIdol.stamina;
            this.c_produceIdol.fan               = produceIdol.fan;
            this.c_produceIdol.tension           = produceIdol.tension;
            this.c_produceIdol.memoryAppealLevel = produceIdol.memoryAppealLevel;
            this.c_produceIdol.totalMemoryPoint  = produceIdol.totalMemoryPoint;

            if ( produceIdol.memoryAppeal ) {
                this.c_produceIdol.fesPoint.fesDeckRankPointCenter = produceIdol.memoryAppeal.fesDeckRankPointCenter;
                this.c_produceIdol.fesPoint.fesDeckRankPointDance  = produceIdol.memoryAppeal.fesDeckRankPointDance;
                this.c_produceIdol.fesPoint.fesDeckRankPointLeader = produceIdol.memoryAppeal.fesDeckRankPointLeader;
                this.c_produceIdol.fesPoint.fesDeckRankPointVisual = produceIdol.memoryAppeal.fesDeckRankPointVisual;
                this.c_produceIdol.fesPoint.fesDeckRankPointVocal  = produceIdol.memoryAppeal.fesDeckRankPointVocal;
                this.c_produceIdol.fesPoint.fesIdolRankPoint       = produceIdol.memoryAppeal.fesIdolRankPoint;
            }
            
        }
        
        return this.c_produceIdol;
    }
}

class ShipopSkillPanelItem {
    charaId        : string = "";
    evolutionStage : number = 0;
    idolId         : string = "";
    skillCategory  : string = "";
    isAcquired     : boolean = false;

    panelCategory  : number = 0;
    sequence       : number = 0;
    skillLevel     : number = 0;
    skillPoint     : number = 0;
    isArrival      : boolean = false;
    isLocked       : boolean = false;

    skill_name                   : string = "";
    skill_comment                : string = "";
    skill_rarity                 : number = 0;
    skill_rate                   : number = 0;
    skill_condition              : string = "";
    skill_conditionAttribute     : string = "";
    skill_conditionEffectType    : string = "";
    skill_conditionValue         : number = 0;
    skill_fesDeckRankPointCenter : number = 0;
    skill_fesDeckRankPointDance  : number = 0;
    skill_fesDeckRankPointLeader : number = 0;
    skill_fesDeckRankPointVisual : number = 0;
    skill_fesDeckRankPointVocal  : number = 0;
    skill_fesIdolRankPoint       : number = 0;
    skill_canShare               : boolean = false;
}

class ShipopSkillPanelInfo {
    c_skillPanelItems : Array<ShipopSkillPanelItem>;

    constructor() {
        this.c_skillPanelItems = new Array<ShipopSkillPanelItem>();
    }

    create( psaveSkillPage:any ) {

        this.c_skillPanelItems.length = 0;
        
        let tab1AllSkillPanels : any = null;
        if ( psaveSkillPage && psaveSkillPage._allSkillPanels ) {
            tab1AllSkillPanels = psaveSkillPage._allSkillPanels;
        }
        
        if ( tab1AllSkillPanels ) {
            Object.keys( tab1AllSkillPanels ).forEach( ( charaId ) => {
                let skillpanels = tab1AllSkillPanels[ charaId ];

                Object.keys( skillpanels ).forEach( ( i ) => {

                    let skillpanel = skillpanels[ i ];

                    let skillPanelItem = new ShipopSkillPanelItem();
                    skillPanelItem.charaId        = charaId;
                    skillPanelItem.evolutionStage = skillpanel._data.evolutionStage;
                    skillPanelItem.idolId         = skillpanel._data.idolId        ;
                    skillPanelItem.skillCategory  = skillpanel._data.skillCategory ;
                    skillPanelItem.isAcquired     = skillpanel._data.isAcquired    ;
                
                    skillPanelItem.panelCategory  = skillpanel._data.panelCategory;
                    skillPanelItem.sequence       = skillpanel._data.sequence     ;
                    skillPanelItem.skillLevel     = skillpanel._data.skillLevel   ;
                    skillPanelItem.skillPoint     = skillpanel._data.skillPoint   ;
                    skillPanelItem.isArrival      = skillpanel._data.isArrival    ;
                    skillPanelItem.isLocked       = skillpanel._data.isLocked     ;
                
                    skillPanelItem.skill_name                   = skillpanel._data.skill.name                  ;
                    skillPanelItem.skill_comment                = skillpanel._data.skill.comment               ;
                    skillPanelItem.skill_rarity                 = skillpanel._data.skill.rarity                ;
                    skillPanelItem.skill_rate                   = skillpanel._data.skill.rate                  ;
                    skillPanelItem.skill_condition              = skillpanel._data.skill.condition             ;
                    skillPanelItem.skill_conditionAttribute     = skillpanel._data.skill.conditionAttribute    ;
                    skillPanelItem.skill_conditionEffectType    = skillpanel._data.skill.conditionEffectType   ;
                    skillPanelItem.skill_conditionValue         = skillpanel._data.skill.conditionValue        ;
                    skillPanelItem.skill_fesDeckRankPointCenter = skillpanel._data.skill.fesDeckRankPointCenter;
                    skillPanelItem.skill_fesDeckRankPointDance  = skillpanel._data.skill.fesDeckRankPointDance ;
                    skillPanelItem.skill_fesDeckRankPointLeader = skillpanel._data.skill.fesDeckRankPointLeader;
                    skillPanelItem.skill_fesDeckRankPointVisual = skillpanel._data.skill.fesDeckRankPointVisual;
                    skillPanelItem.skill_fesDeckRankPointVocal  = skillpanel._data.skill.fesDeckRankPointVocal ;
                    skillPanelItem.skill_fesIdolRankPoint       = skillpanel._data.skill.fesIdolRankPoint      ;
                    skillPanelItem.skill_canShare               = skillpanel._data.skill.canShare              ;

                    this.c_skillPanelItems.push( skillPanelItem );
                });
            });
        }
        
        return this.c_skillPanelItems;
    }
}

class ShipopPlaceItem {
    isPromised    : string = "";
    name          : string = "";
    level         : string = "";
    vocal         : string = "";
    dance         : string = "";
    visual        : string = "";
    mental        : string = "";
    skillPoint    : string = "";
    stamina       : string = "";
    fan           : string = "";
    troubleRate   : string = "";
    supportIdols  : string = "";
    boostedParams : string = "";
}

class ShipopPlaceInfo {
    c_placeItems : Array<ShipopPlaceItem>;

    constructor() {
        this.c_placeItems = new Array<ShipopPlaceItem>();
    }

    create( psaveProduceAudition:any ) {

        this.c_placeItems.length = 0;
        
        let tab2places : (Array<any>|null) = null;
        if ( psaveProduceAudition && psaveProduceAudition._store.places ) {
            tab2places = psaveProduceAudition._store.places;
        }
        
        if ( tab2places && tab2places.length > 0 ) {
            let createSupportIdol = (isHelper:boolean, supportIdol:any) : string => {
                let friendName : string = "";
                if ( isHelper ) {
                    friendName = "はづき";
                } else {
                    friendName = supportIdol.firstName;
                }

                let friendshipPoint : number = supportIdol.friendshipPoint;
                let friendBGColor = "white";
                if ( friendshipPoint >= 75 ) {
                    friendBGColor = "#ffbcff";
                } else if ( friendshipPoint >= 50 ) {
                    friendBGColor = "yellow";
                }

                let friendshipIdeaNote = supportIdol.idea;

                let retVal = '<span style="background-color:' + friendBGColor + ';">';
                retVal += friendName;;
                retVal += "(" + friendshipPoint + "/100)";
                retVal += "</span>";
                if ( friendshipIdeaNote ) {
                    let markString : string = "";
                    switch(friendshipIdeaNote.ideaMark){
                    case "vocal"       : markString = "ボーカル";   break;
                    case "dance"       : markString = "ダンス";     break;
                    case "visual"      : markString = "ビジュアル"; break;
                    case "talk"        : markString = "トーク";     break;
                    case "skill_point" : markString = "アピール";   break;
                    case "special"     : markString = "スペシャル"; break;
                    }
                    retVal += " アイデア：" + markString + "(Lv." + friendshipIdeaNote.level + ")";
                }

                return retVal;
            }

            for (let idx = 1; idx <= 7; idx++) {
                // COMPOSE SUPPORT IDOLS
                let psupporIdols : string = "";
                let supporIdolsCount : number = 0;
                if ( tab2places[(idx - 1)].supportIdols ) {
                    supporIdolsCount = tab2places[(idx - 1)].supportIdols.length;
                }
            
                // COMPOSE NORMAL-SUPPORT IDOLS
                for (let idx2 = 0; idx2 < supporIdolsCount; idx2++) {
                    if (psupporIdols != "") {
                        psupporIdols += "<br>";
                    }
                    psupporIdols += createSupportIdol( false, tab2places[(idx - 1)].supportIdols[ idx2 ] );
                }

                // COMPOSE HELPER(HADUKI)
                if ( tab2places[(idx - 1)].helperStaff ) {
                    if (psupporIdols != "") {
                        psupporIdols += "<br>";
                    }
                    psupporIdols += createSupportIdol( true, tab2places[(idx - 1)].helperStaff );
                }
        
                let placeItem = new ShipopPlaceItem();
                placeItem.isPromised    = ( tab2places[(idx - 1)].isPromised ? "◎" : "　" );
                placeItem.name          = tab2places[(idx - 1)].name;
                placeItem.level         = tab2places[(idx - 1)].level;
                placeItem.vocal         = tab2places[(idx - 1)].vocal;
                placeItem.dance         = tab2places[(idx - 1)].dance;
                placeItem.visual        = tab2places[(idx - 1)].visual;
                placeItem.mental        = tab2places[(idx - 1)].mental;
                placeItem.skillPoint    = tab2places[(idx - 1)].skillPoint;
                placeItem.stamina       = tab2places[(idx - 1)].stamina;
                placeItem.fan           = tab2places[(idx - 1)].fan;
                placeItem.troubleRate   = tab2places[(idx - 1)].troubleRate;
                placeItem.supportIdols  = psupporIdols;
                placeItem.boostedParams = tab2places[(idx - 1)].boostedParams;
                this.c_placeItems.push( placeItem );
            }
        }
        
        return this.c_placeItems;
    }
}

class ShipopSupportSkillItem {
    effectType             : string = "";
    producePlaceCategoryId : string = "";
    name                   : string = "";
    supportSkillLevel      : string = "";
    rate                   : string = "";
    value                  : string = "";
    characterId            : string = "";
}

class ShipopSupportSkillInfo {
    c_spskItems : Array<ShipopSupportSkillItem>;

    constructor() {
        this.c_spskItems = new Array<ShipopSupportSkillItem>();
    }

    create( psaveProduceAudition:any ) {

        this.c_spskItems.length = 0;
        
        let tab2supportSkills : (Array<any>|null) = null;
        if ( psaveProduceAudition && psaveProduceAudition._store.supportSkills ) {
            tab2supportSkills = psaveProduceAudition._store.supportSkills;
        }
        
        if ( tab2supportSkills ) {
            for ( let idx = 0; idx < tab2supportSkills.length; idx++ ) {
                var supportSkill = tab2supportSkills[ idx ];

                let spSkItem = new ShipopSupportSkillItem();
                spSkItem.effectType             = supportSkill.effectType;
                spSkItem.producePlaceCategoryId = supportSkill.supportSkillEffect.producePlaceCategoryId;
                spSkItem.name                   = supportSkill.name;
                spSkItem.supportSkillLevel      = supportSkill.supportSkillLevel;
                spSkItem.rate                   = supportSkill.supportSkillEffect.rate;
                spSkItem.value                  = supportSkill.supportSkillEffect.value;
                spSkItem.characterId            = supportSkill.characterId;
                this.c_spskItems.push( spSkItem );
            }
        }
        
        return this.c_spskItems;
    }
}


class ShipopSupportIdolItem {
    supportIdolId : string = "";
    characterId   : string = "";
    name          : string = "";
}

class ShipopSupportIdolInfo {
    c_supportIdolItems : Array<ShipopSupportIdolItem>;

    constructor() {
        this.c_supportIdolItems = new Array<ShipopSupportIdolItem>();
    }

    create( psaveProduceAudition:any ) {

        this.c_supportIdolItems.length = 0;

        let tab2supportIdols : (Array<any>|null) = null;
        if ( psaveProduceAudition && psaveProduceAudition._store.supportIdols ) {
          tab2supportIdols = psaveProduceAudition._store.supportIdols;
        }
        
        if ( tab2supportIdols ) {
            for ( let idx = 0; idx < tab2supportIdols.length; idx++ ) {
                let supportIdolItem = new ShipopSupportIdolItem();
                supportIdolItem.supportIdolId = tab2supportIdols[ idx ].supportIdolId;
                supportIdolItem.characterId   = tab2supportIdols[ idx ].characterId;
                supportIdolItem.name          = tab2supportIdols[ idx ].name;
                this.c_supportIdolItems.push( supportIdolItem );
            }
        }
        
        return this.c_supportIdolItems;
    }
}

class ShipopEventSummary {
    actionName         : string  = "";
    eventCategoryName  : string  = "";
    title              : string  = "";
    answers            : string  = "";
    character_id       : string  = "";
    produceEventParams : string  = "";
    isExists           : boolean = false;
    vocal              : string  = "";
    dance              : string  = "";
    visual             : string  = "";
    mental             : string  = "";
    skillPoint         : string  = "";
    stamina            : string  = "";
    fan                : string  = "";
    tension            : string  = "";
    memoryPoint        : string  = "";
    friendship         : string  = "";
    firstEventText     : string  = "";
}
class ShipopEventTrack {
    label     : string  = "";
    speaker   : string  = "";
    text      : string  = "";
    nextLabel : string  = "";
}

class ShipopEventInfo {
    eventSummary : ShipopEventSummary;
    eventTracks  : Array<ShipopEventTrack>;

    constructor() {
        this.eventSummary = new ShipopEventSummary();
        this.eventTracks  = new Array<ShipopEventTrack>();
    }
    
    create( peventPage:any, peventType:any ) {
        this.eventSummary = new ShipopEventSummary();
        this.eventTracks  = new Array<ShipopEventTrack>();

        var objRet = null;
        switch( peventType ) {
        case "1":
            objRet = this.shipopNormalEventPage( peventPage );
            break;
        case "2":
            objRet = this.shipopKishaEventPage( peventPage );
            break;  
        }
        return objRet;
    }
      
    private shipopNormalEventPage( peventPage:any ) {
        
        var esp = peventPage;

        if ( esp ) {
            // *** Event Info ***
            this.eventSummary.actionName         = esp._event.eventCategory.actionName;
            this.eventSummary.eventCategoryName  = esp._event.eventCategoryName;
            this.eventSummary.title              = esp._event.title;
            this.eventSummary.answers            = esp._event.answers;
            this.eventSummary.character_id       = esp._event.character_id;
            this.eventSummary.produceEventParams = esp._event.produceEventParams;
        
            if ( esp._event.eventParam ) {
                this.eventSummary.isExists     = ( true                                    );
                this.eventSummary.vocal        = ( esp._event.eventParam.vocal             );
                this.eventSummary.dance        = ( esp._event.eventParam.dance             );
                this.eventSummary.visual       = ( esp._event.eventParam.visual            );
                this.eventSummary.mental       = ( esp._event.eventParam.mental            );
                this.eventSummary.skillPoint   = ( esp._event.eventParam.skillPoint        );
                this.eventSummary.stamina      = ( esp._event.eventParam.stamina           );
                this.eventSummary.fan          = ( esp._event.eventParam.fan               );
                this.eventSummary.tension      = ( esp._event.eventParam.tension           );
                this.eventSummary.memoryPoint  = ( esp._event.eventParam.memoryPoint       );
                this.eventSummary.friendship   = ( esp._event.eventParam.friendship        );
            } else if ( esp._event.param ) {
                this.eventSummary.isExists     = ( true                                    );
                this.eventSummary.vocal        = ( esp._event.param.vocal             );
                this.eventSummary.dance        = ( esp._event.param.dance             );
                this.eventSummary.visual       = ( esp._event.param.visual            );
                this.eventSummary.mental       = ( esp._event.param.mental            );
                this.eventSummary.skillPoint   = ( esp._event.param.skillPoint        );
                this.eventSummary.stamina      = ( esp._event.param.stamina           );
                this.eventSummary.fan          = ( ""                                 );
                this.eventSummary.tension      = ( esp._event.param.tension           );
                this.eventSummary.memoryPoint  = ( esp._event.param.memoryPoint       );
                this.eventSummary.friendship   = ( ""                                 );
            } else {
                this.eventSummary.isExists     = ( false );
                this.eventSummary.vocal        = ( "" );
                this.eventSummary.dance        = ( "" );
                this.eventSummary.visual       = ( "" );
                this.eventSummary.mental       = ( "" );
                this.eventSummary.skillPoint   = ( "" );
                this.eventSummary.stamina      = ( "" );
                this.eventSummary.fan          = ( "" );
                this.eventSummary.tension      = ( "" );
                this.eventSummary.memoryPoint  = ( "" );
                this.eventSummary.friendship   = ( "" );
            }
        
            // *** Event Tracks ***
            this.eventSummary.firstEventText = "";
            if ( esp._eventTracks ) {
                for ( let idx = 0; idx < esp._eventTracks.length; idx++ ) {
                    var eventTrack = esp._eventTracks[ idx ];

                    let eventTrackItem = new ShipopEventTrack();
                    
                    let existsTrack = false;
                    if ( eventTrack.speaker ) {
                        existsTrack = true;
                        // Normal Conversation
                        eventTrackItem.label     = eventTrack.label;
                        eventTrackItem.speaker   = eventTrack.speaker;
                        eventTrackItem.text      = eventTrack.text;
                        eventTrackItem.nextLabel = eventTrack.nextLabel;
                    } else if ( eventTrack.select ) {
                        existsTrack = true;
                        // Selection
                        eventTrackItem.label     = "";
                        eventTrackItem.speaker   = "";
                        eventTrackItem.text      = eventTrack.select;
                        eventTrackItem.nextLabel = eventTrack.nextLabel;
                    }
            
                    // 空の要素はスキップする
                    if ( existsTrack ) {
                        // 要素追加
                        this.eventTracks.push( eventTrackItem );
                        // 最初の会話をキャプチャ
                        if ( !this.eventSummary.firstEventText ) {
                            this.eventSummary.firstEventText = eventTrackItem.text;
                        }
                    }
                }
            }
        }
        
        return {
            "eventInfo"   : this.eventSummary,
            "eventTracks" : this.eventTracks,
        };
    }
    
    private shipopKishaEventPage( peventPage:any ) {
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
            "eventInfo"   : shipopEventInfo,
            "eventTracks" : shipopEventTracks
        };
    }
}