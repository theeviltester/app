window.rhfs=window.rhfs||[];rhfs.push('./resources/mediawiki.special/mediawiki.special.preferences.js');
/*
 * JavaScript for Special:Preferences
 */
( function( $, mw ) {
$( '#prefsubmit' ).attr( 'id', 'prefcontrol' );
var $preftoc = $('<ul id="preftoc"></ul>');
/* Wikia change begin - @author: Marcin, #BugId: 27193 */
$preftoc.addClass('tabs');
/* Wikia change end */
var $preferences = $( '#preferences' )
	.addClass( 'jsprefs' )
	.before( $preftoc );

var $fieldsets = $preferences.children( 'fieldset' )
	.hide()
	.addClass( 'prefsection' );

var $legends = $fieldsets.children( 'legend' )
	.addClass( 'mainLegend' );

/**
 * Wikia Function - @see UC-206
 * Normalize given class name using the prefix
 * @param {string} prefix
 * @param {string} tabClass
 * @returns {string}
 */
var normalizeTabClass = function (prefix, tabClass) {
	'use strict';
	return tabClass.replace('mw-prefsection', prefix);
};

/**
 * Wikia Function - @see UC-145
 * Make tabs distinguishable based on provided id
 * @param {Element} element
 * @param {string} selectedTabId
 */
var makeTabsTargetable = function (element, selectedTabId) {
	'use strict';
	var prefix = 'container',
		classes = element[0].className.split(' ').filter(function (className) {
			return className.lastIndexOf(prefix, 0) !== 0;
		});
	element[0].className = $.trim(classes.join(' '));
	$preferences.addClass(normalizeTabClass(prefix, selectedTabId));
};

// Populate the prefToc
$legends.each( function( i, legend ) {
	var $legend = $(legend);
	if ( i === 0 ) {
		$legend.parent().show();
	}
	var ident = $legend.parent().attr( 'id' );

	/** Wikia Change start - Add a class - @see UC-206 */
	var $tabName = normalizeTabClass('tab', ident),
		$li = $( '<li/>', {
		'class' : $tabName + (( i === 0 ) ? ' selected' : '')
		/** Wikia Change end */
	});
	var $a = $( '<a/>', {
		text : $legend.text(),
		id : ident.replace( 'mw-prefsection', 'preftab' ),
		href : '#' + ident
	}).click( function( e ) {
		e.preventDefault();
		// Handle hash manually to prevent jumping
		// Therefore save and restore scrollTop to prevent jumping
		var scrollTop = $(window).scrollTop();
		window.location.hash = $(this).attr('href');
		$(window).scrollTop(scrollTop);

		$preftoc.find( 'li' ).removeClass( 'selected' );
		$(this).parent().addClass( 'selected' );

		/** Wikia change begin */
		// Make elements outside tabs targetable based on selected tab - @see UC-145
		makeTabsTargetable($preferences, ident);

		// Add a custom event per tab - @see UC-206
		$(document).trigger($tabName + '-click');
		/** Wikia change end */

		$( '#preferences > fieldset' ).hide();
		$( '#' + ident ).show();
	});
	$li.append( $a );
	$preftoc.append( $li );
} );

// If we've reloaded the page or followed an open-in-new-window,
// make the selected tab visible.
// On document ready:
$( function() {
	var hash = window.location.hash;
	if( hash.match( /^#mw-prefsection-[\w-]+/ ) ) {
		var $tab = $( hash.replace( 'mw-prefsection', 'preftab' ) );
		$tab.click();
	}
} );


/**
* Timezone functions.
* Guesses Timezone from browser and updates fields onchange
*/

var $tzSelect = $( '#mw-input-wptimecorrection' );
var $tzTextbox = $( '#mw-input-wptimecorrection-other' );

var $localtimeHolder = $( '#wpLocalTime' );
var servertime = parseInt( $( 'input[name=wpServerTime]' ).val(), 10 );
var minuteDiff = 0;

var minutesToHours = function( min ) {
	var tzHour = Math.floor( Math.abs( min ) / 60 );
	var tzMin = Math.abs( min ) % 60;
	var tzString = ( ( min >= 0 ) ? '' : '-' ) + ( ( tzHour < 10 ) ? '0' : '' ) + tzHour +
		':' + ( ( tzMin < 10 ) ? '0' : '' ) + tzMin;
	return tzString;
};

var hoursToMinutes = function( hour ) {
	var arr = hour.split( ':' );
	arr[0] = parseInt( arr[0], 10 );

	var minutes;
	if ( arr.length == 1 ) {
		// Specification is of the form [-]XX
		minutes = arr[0] * 60;
	} else {
		// Specification is of the form [-]XX:XX
		minutes = Math.abs( arr[0] ) * 60 + parseInt( arr[1], 10 );
		if ( arr[0] < 0 ) {
			minutes *= -1;
		}
	}
	// Gracefully handle non-numbers.
	if ( isNaN( minutes ) ) {
		return 0;
	} else {
		return minutes;
	}
};

var updateTimezoneSelection = function() {
	var type = $tzSelect.val();
	if ( type == 'guess' ) {
		// Get browser timezone & fill it in
		minuteDiff = -new Date().getTimezoneOffset();
		$tzTextbox.val( minutesToHours( minuteDiff ) );
		$tzSelect.val( 'other' );
		$tzTextbox.get( 0 ).disabled = false;
	} else if ( type == 'other' ) {
		// Grab data from the textbox, parse it.
		minuteDiff = hoursToMinutes( $tzTextbox.val() );
	} else {
		// Grab data from the $tzSelect value
		minuteDiff = parseInt( type.split( '|' )[1], 10 ) || 0;
		$tzTextbox.val( minutesToHours( minuteDiff ) );
	}

	// Determine local time from server time and minutes difference, for display.
	var localTime = servertime + minuteDiff;

	// Bring time within the [0,1440) range.
	while ( localTime < 0 ) {
		localTime += 1440;
	}
	while ( localTime >= 1440 ) {
		localTime -= 1440;
	}
	$localtimeHolder.text( minutesToHours( localTime ) );
};

if ( $tzSelect.length && $tzTextbox.length ) {
	$tzSelect.change( function() { updateTimezoneSelection(); } );
	$tzTextbox.blur( function() { updateTimezoneSelection(); } );
	updateTimezoneSelection();
}
} )( jQuery, mediaWiki );
