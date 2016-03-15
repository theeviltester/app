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

			$this->processArticleFromTitle($title);

			$subpages = $title->getSubpages();
			foreach ($subpages as $subpage) {
				$this->communityCount += $this->processArticleFromTitle($subpage);
			}
		}

	}

	private function processArticleFromTitle( $title ) {
		global $wgCityId, $wgServer, $wgRabbitPass, $wgRabbitUser;

		$rabbitCredentials = [
			'host' => 'prod.rabbit.service.sjc.consul',
			'port' => 5672,
			'user' => $wgRabbitUser,
			'pass' => $wgRabbitPass,
			'vhost' => 'events',
			'exchange' => 'events'
		];

		$rabbit = new \Wikia\IndexingPipeline\ConnectionBase($rabbitCredentials);

		$article = Article::newFromTitle( $title, RequestContext::getMain() );
		if ( $article ) {
			$content = $article->getContent();
			preg_match_all( '/\.pi\-image/', $content, $matches );
			if ( !empty( $matches[0] ) ) {
				$rabbit->publish("infoboxes.fixed-width", ['cityId' => $wgCityId, 'match' => $matches[0]]);
				echo sprintf( "%-90s, Lines: %10s\n", $title->getFullUrl(), count( $matches[0] ) );
			}
			return !empty( $matches[0]);
		}
		return false;
	}

	private function isPublic() {
		global $wgCityId;
		$dbr = wfGetDB(DB_SLAVE);

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