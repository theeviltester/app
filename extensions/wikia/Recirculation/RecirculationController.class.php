<?php

class RecirculationController extends WikiaController {
	const DEFAULT_TEMPLATE_ENGINE = WikiaResponse::TEMPLATE_ENGINE_MUSTACHE;
	const ALLOWED_TYPES = ['popular', 'shares'];
	const DEFAULT_TYPE = 'popular';
	const CACHE_DURATION = 900; // 15 minutes

	public function init() {
		$type = $this->getVal( 'type' );
		if ( in_array( $type, self::ALLOWED_TYPES ) ) {
			$this->type = $type;
		} else {
			$this->type = self::DEFAULT_TYPE;
		}
	}

	public function index() {
		$fandomDataService = new FandomDataService();

		$posts = $fandomDataService->getPosts( $this->type );

		if ( count( $posts ) > 0 ) {
			$this->response->setCacheValidity( self::CACHE_DURATION );
			$this->response->setData( [
				'title'	=> wfMessage( 'recirculation-fandom-title' )->plain(),
				'posts' => $posts
			] );
			return true;
		} else {
			return false;
		}
	}
}
