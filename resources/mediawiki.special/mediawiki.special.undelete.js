jsWC=window.jsWC || {}; jsWC["./resources/mediawiki.special/mediawiki.special.undelete.js"]=273;

/*
 * JavaScript for Specical:Undelete
 */
jQuery( document ).ready( function( $ ) {
	$( '#mw-undelete-invert' ).click( function( e ) {
		e.preventDefault();
		$( '#undelete' ).find( 'input:checkbox' )
			.prop( 'checked', function( i, val ) { return !val; } );
	} );
} );
