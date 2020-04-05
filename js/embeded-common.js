"use strict";
class ShipopCommon {
    constructor() { }
}
function shipopConvertRemainSeasonWeek(pseason, premainSeasonWeek) {
    if (pseason == 5) {
        return (2 - premainSeasonWeek + 1);
    }
    return (8 - premainSeasonWeek + 1);
}
