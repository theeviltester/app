<?php
/**
 * Class definition for \Wikia\Search\IndexService\ArticleQuality
 */
namespace Wikia\Search\IndexService;
/**
 * Allows us to access article quality service
 * @package Search
 * @subpackage IndexService
 */
class ArticleQuality extends AbstractService {
	/**
	 * Queries the API for article quality
	 * @see \Wikia\Search\IndexService\AbstractService::execute()
	 * @return array
	 */
	public function execute() {
		$result = array();

		$aqService = new \ArticleQualityService();
		$pageId = $this->currentPageId;
		if ( $pageId === null ) {
			throw new \WikiaException( 'A pageId-dependent indexer service was executed without a page ID queued' );
		}

		$aqService->setArticleById( $pageId );
		$result['article_quality_i'] = $aqService->getArticleQuality()['output']['aq'];
		$result['aq_params_outbound_i'] = $aqService->getArticleQuality()['input']['outbound'];
		$result['aq_params_inbound_i'] = $aqService->getArticleQuality()['input']['inbound'];
		$result['aq_params_length_i'] = $aqService->getArticleQuality()['input']['length'];
		$result['aq_params_sections_i'] = $aqService->getArticleQuality()['input']['sections'];
		$result['aq_params_images_i'] = $aqService->getArticleQuality()['input']['images'];

		return $result;
	}

}
