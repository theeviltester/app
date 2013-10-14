<?php

class Suggestions {

	/**
	 * @param $out OutputPage
	 * @param $skin Skin
	 * @return bool
	 */
	public static function loadAssets( $out ) {
		foreach( AssetsManager::getInstance()->getGroupFullURL( 'suggestions_js' ) as $file ) {
			$out->addScriptFile( $file );
		}

		foreach( AssetsManager::getInstance()->getGroupFullURL( 'suggestions_scss' ) as $file ) {
			$out->addExtensionStyle( $file );
		}
		return true;
	}
}