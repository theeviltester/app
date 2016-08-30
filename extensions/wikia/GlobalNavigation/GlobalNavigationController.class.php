<?php

class GlobalNavigationController extends WikiaController {

	// how many hubs should be displayed in the menu
	// if we do not get enough, use transparent background
	// to fill the space (CON-1820)
	const HUBS_COUNT = 7;

	/**
	 * @var GlobalNavigationHelper
	 */
	private $helper;

	/**
	 * @var GlobalNavigationHelper
	 */
	private $wikiaLogoHelper;

	public function __construct() {
		parent::__construct();
		$this->helper = new GlobalNavigationHelper();
		$this->wikiaLogoHelper = new WikiaLogoHelper();
	}

	public function index() {
		$this->skipRendering();
	}

	public function searchIndex() {
		global $wgRequest, $wgSitename, $wgUser;

		$lang = $this->helper->getLangForSearchResults();

		$centralUrl = $this->helper->getCentralUrlFromGlobalTitle( $lang );
		$globalSearchUrl = $this->helper->getGlobalSearchUrl( $centralUrl );
		$localSearchUrl = SpecialPage::getTitleFor( 'Search' )->getFullUrl();
		$fulltext = $wgUser->getGlobalPreference( 'enableGoSearch' ) ? 0 : 'Search';
		$query = $wgRequest->getVal( 'search', $wgRequest->getVal( 'query', '' ) );
		$localSearchPlaceholder = html_entity_decode(
			wfMessage( 'global-navigation-search-wikia', $wgSitename )->parse()
		);
		if ( WikiaPageType::isCorporatePage() && !WikiaPageType::isWikiaHub() ) {
			$this->response->setVal( 'disableLocalSearchOptions', true );
			$this->response->setVal( 'defaultSearchPlaceholder', wfMessage( 'global-navigation-global-search' )->escaped() );
			$this->response->setVal( 'defaultSearchUrl', $globalSearchUrl );
		} else {
			$this->response->setVal( 'globalSearchUrl', $globalSearchUrl );
			$this->response->setVal( 'localSearchUrl', $localSearchUrl );
			$this->response->setVal( 'localSearchPlaceholder', $localSearchPlaceholder );
			$this->response->setVal( 'defaultSearchPlaceholder',  $localSearchPlaceholder );
			$this->response->setVal( 'defaultSearchUrl', $localSearchUrl );
		}

		$this->response->setVal( 'fulltext', $fulltext );
		$this->response->setVal( 'query', $query );
		$this->response->setVal( 'lang', $lang );
	}
}
