window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/InstantGlobals/js/instantGlobalsOverride.js');
/**
 * Method for overriding boolean InstantGlobals
 * based on querystring params
 */
location.search.replace(
	/InstantGlobals\.(\w+)=(\d)/g,
	//Applying all the InstantGlobals.*=[0|1] params
	function (a, b, c) {
		Wikia.InstantGlobals[b] = c > 0;
	}
);

location.search.replace(
	/InstantGlobals\.(\w+)=\[(.*?)]/g,
	//Applying all the InstantGlobals.*=Array params
	//example: ?InstantGlobals.wgAdDriverOpenXBidderCountries=[DE,PL,XX]
	function (a, b, c) {
		Wikia.InstantGlobals[b] = c.split(',');
	}
);
