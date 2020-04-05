class ShipopCommon {
    constructor() {}
}

function shipopConvertRemainSeasonWeek( pseason:number, premainSeasonWeek:number ) : number {
    if ( pseason == 5 ) {
      return ( 2 - premainSeasonWeek + 1 );
    }
   return ( 8 - premainSeasonWeek + 1 );
}