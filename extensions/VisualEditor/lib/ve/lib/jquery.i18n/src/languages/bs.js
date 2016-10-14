window.rhfs=window.rhfs||[];rhfs.push('./extensions/VisualEditor/lib/ve/lib/jquery.i18n/src/languages/bs.js');
/**
 * Bosnian (bosanski) language functions
 */
( function ( $ ) {
	'use strict';

	$.i18n.languages.bs = $.extend( {}, $.i18n.languages['default'], {
		convertGrammar: function ( word, form ) {
			switch ( form ) {
			case 'instrumental': // instrumental
				word = 's ' + word;
				break;
			case 'lokativ': // locative
				word = 'o ' + word;
				break;
			}

			return word;
		}
	} );

}( jQuery ) );
