<?php
require_once( getenv( 'MW_INSTALL_PATH' ) !== false ? getenv( 'MW_INSTALL_PATH' ) . '/maintenance/Maintenance.php' : dirname( __FILE__ ) . '/../../../../maintenance/Maintenance.php' );


class FixedWidthDetector extends Maintenance {
	/**
	 * Set script options
	 */

	public function __construct() {
		parent::__construct();
		$this->mDescription = 'fixed width detector';
		$this->communityCount = 0;
	}

	public function execute() {
		global $wgCityId, $wgSitename, $wgServer;


		$stylesheets = [
			'Wikia.css',
			'Common.css',
			'Monobook.css'
		];

		if ( !$this->isPublic() ) {
			return;
		}

		foreach ($stylesheets as $stylesheet) {
			$title = Title::newFromText($stylesheet, NS_MEDIAWIKI);

			$this->processArticleFromTitle($title, $stylesheet);

			$subpages = $title->getSubpages();
			foreach ($subpages as $subpage) {
				$this->processArticleFromTitle($subpage, $stylesheet);
			}
		}

	}

	private function processArticleFromTitle( $title, $stylesheet ) {
		global $wgCityId, $wgServer, $wgRabbitPass, $wgRabbitUser;

		$rabbitCredentials = [
			'host' => 'dev.rabbit.service.sjc-dev.consul',
			'port' => 5672,
			'user' => $wgRabbitUser,
			'pass' => $wgRabbitPass,
			'vhost' => 'events',
			'exchange' => 'events',
			'deadExchange' => 'zombie.0.1'
		];

		$rabbit = new \Wikia\IndexingPipeline\ConnectionBase($rabbitCredentials);

		$article = Article::newFromTitle( $title, RequestContext::getMain() );
		if ( $article ) {
			$content = $article->getContent();
			preg_match_all( '/\.pi[^}]+}/', $content, $matches );
			if ( !empty( $matches[0] ) ) {
				$rabbit->publish("infoboxes.fixed-width", ['cityId' => $wgCityId, 'file' => $stylesheet, 'match' => $matches[0]]);
			}
		}
	}

	private function isPublic() {
		global $wgCityId;
		global $wgExternalSharedDB;
		$dbr = wfGetDB(DB_SLAVE, array(), $wgExternalSharedDB);

		$sql = 'SELECT city_public FROM city_list
				WHERE city_id='.$wgCityId;

		$res = $dbr->query( $sql );

		while($row = $dbr->fetchObject($res)) {
			if ($row->city_public == 1 ) {
				return true;
			}
		}
		return false;
	}

}

$maintClass = 'FixedWidthDetector';
require_once( RUN_MAINTENANCE_IF_MAIN );