<?php

require_once( dirname( __FILE__ ) . '/../../Maintenance.php' );

class LoopOverTopWikis extends Maintenance {

	const ARTICLES_PER_TEMPLATE_LIMIT = 1;

	public function execute() {
		$wikiIds = $this->getTopWikis(10);
		foreach ( $wikiIds as $wikiId ) {
			$command = "/usr/wikia/backend/bin/run_maintenance --id=" . $wikiId . " --script='wikia/Infoboxes/GetArticlesWithInfoboxes.php'";

			$this->output(shell_exec($command));
		}
	}

	public function getTopWikis( $limit = 5000 ) {
		return (new DataMartService()) -> getWikisOrderByWam( $limit );
	}

}

$maintClass = "LoopOverTopWikis";
require_once( RUN_MAINTENANCE_IF_MAIN );