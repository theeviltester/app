window.rhfs=window.rhfs||[];rhfs.push('./extensions/Maps/includes/services/OpenLayers/ext.maps.openlayers.js');
/**
 * JavaScript for OpenLayers maps in the Maps extension.
 * @see https://www.mediawiki.org/wiki/Extension:Maps
 *
 * @licence GNU GPL v2+
 * @author Jeroen De Dauw <jeroendedauw at gmail dot com>
 */

(function( $, mw ) {

	$( document ).ready( function() {

		OpenLayers.ImgPath = mw.config.get( 'egMapsScriptPath' ) + '/includes/services/OpenLayers/OpenLayers/img/';
		OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
		OpenLayers.Util.onImageLoadErrorColor = 'transparent';
		OpenLayers.Feature.prototype.popupClass = OpenLayers.Class(
			OpenLayers.Popup.FramedCloud,
			{
				'autoSize': true,
				'minSize': new OpenLayers.Size( 200, 100 )
			}
		);

		// OpenLayers.Lang.setCode( params.langCode );

		$( '.maps-openlayers' ).each( function() {
			var $this = $( this );

			$this.openlayers( $this.attr( 'id' ), $.parseJSON( $this.find( 'div').text() ) );
		} );

	} );

})( window.jQuery, mediaWiki );
