jsWC=window.jsWC || {}; jsWC["./extensions/Cite/modules/ext.cite/ext.cite.js"]=253;

( function($) {
	$( function() {
		$('.biblio-cite-link,sup.reference a').tooltip({
				bodyHandler: function() {
					return $( '#' + this.hash.substr(1) + ' > .reference-text' )
						.html();
				},
				showURL : false
			} );
	} );
	
} )( jQuery );
