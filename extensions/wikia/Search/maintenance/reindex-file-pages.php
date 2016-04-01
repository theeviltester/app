<?php
/**
 * SEO-329
 *
 * Reindex file pages created between the specific dates
 *
 * Based on staff-indernal-reindex.php
 *
 * @package MediaWiki
 * @addtopackage maintenance
 */

require_once( "../../../../maintenance/commandLine.inc" );

include("$IP/extensions/wikia/Search/WikiaSearch.setup.php");

global $wgContentNamespaces, $wgExtraNamespaces;
$wgUser = User::newFromName('Owen Davis');
$wgTitle = Title::newMainPage();
$c = RequestContext::getMain();
$c->setUser($wgUser);
$c->setTitle($wgTitle);

$indexer = new Wikia\Search\Indexer();

$dbr = wfGetDB( DB_MASTER );

//$select = $dbr->select(
//		'page',
//		'page_id',
//		array( 'page_namespace' => NS_FILE )
//		);
//
//foreach ( $select as $row ) {
//	if ( $row->page_id ) {
//    	$ids[] = $row->page_id;
//	}
//}

$ids = [ 1352425 ];

$idCount = count($ids);
$sliceCount = 0;
foreach ( array_chunk( $ids, 1000 ) as $idSlice ) {
	$sliceCount += 1000;
	$indexer->reindexBatch( $idSlice );
	echo "Reindexed {$sliceCount}/{$idCount} docs\n";
}

echo "Indexing process complete.\n";
