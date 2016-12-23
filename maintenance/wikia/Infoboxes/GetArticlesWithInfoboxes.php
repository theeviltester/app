<?php

require_once( dirname( __FILE__ ) . '/../../Maintenance.php' );

class GetArticlesWithInfoboxes extends Maintenance {

	const ARTICLES_PER_TEMPLATE_LIMIT = 1;

	public function execute() {
			$infoboxTemplates = $this->getInfoboxTemplates();

			$articles = [];
			foreach ($infoboxTemplates as $template) {
				$articles = array_merge($articles, $this->getTemplateUsage($template));
			}

			$this->output(implode("\n", $articles));
	}

	public function getInfoboxTemplates() {
		$templates = ( new WikiaSQL() )
			->SELECT( 'qc_title' )
			->FROM( 'querycache' )
			->WHERE( 'qc_type' )->EQUAL_TO( AllinfoboxesQueryPage::ALL_INFOBOXES_TYPE )
			->run( $this->getDB( DB_SLAVE ), function ( ResultWrapper $result ) {
				$out = [ ];
				while ( $row = $result->fetchRow() ) {
					$title = Title::newFromText( $row[ 'qc_title' ], NS_TEMPLATE );
					if ( $title && $title->exists() ) {
						$out[] = $title->getFullText();
					}
				}

				return $out;
			} );
		return $templates;
	}

	private function getTemplateUsage( $template ) {
		$params = [ 'action' => 'query',
			'list' => 'embeddedin',
			'eititle' => $template,
			'eifilterredir' => 'nonredirects',
			'eilimit' => self::ARTICLES_PER_TEMPLATE_LIMIT ];

		$data = $this->callApi( $params );

		$result = array_map( function ( $item ) {
			$title = Title::newFromID($item[ 'pageid' ]);
			return $title->getFullURL();
		}, $data[ 'query' ][ 'embeddedin' ] );

		return $result;
	}

	/**
	 * @param $params
	 *
	 * @return array
	 */
	private function callApi( $params ) {
		$this->output(RequestContext::getMain());

		$api = new ApiMain( new FauxRequest( $params ), true );
		$api->execute();

		return $api->getResult()->getResultData();
	}
}

$maintClass = "GetArticlesWithInfoboxes";
require_once( RUN_MAINTENANCE_IF_MAIN );