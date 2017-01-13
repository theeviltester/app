<?php
/**
 * Checks existing of Wiki Description and its length for top WAM wikis.
 *
 * @author Weronika Rudnicka <wrudnicka@wikia-inc.com>
 */

// Enable the WAM API extension so that the controller is loaded
$wgEnableWAMApiExt = true;
ini_set( 'include_path', dirname(__FILE__).'/../' );
require_once( 'commandLine.inc' );

function getVEForcedValue( $wikiId ) {
	$wikiFactoryVar = WikiFactory::getVarByName( 'wgForceVisualEditor', $wikiId );
	return ( is_object( $wikiFactoryVar ) && $wikiFactoryVar->cv_value ) ?
		unserialize( $wikiFactoryVar->cv_value ) : false;
}

if ( !isset( $options['limit'] ) ) {
	exit( "No limit specified. Please specify an integer limit using the --limit option.\n" );
} elseif ( ( $limit = (int)$options['limit'] ) < 1 ) {
	exit( "Invalid limit specified. Please specify an integer limit greater than 0.\n" );
}

// First get the WAM index
$wamWikisIds = array();
$app = F::app();
$apiOffset = 0;
$apiLimit = WAMApiController::DEFAULT_PAGE_SIZE;

printf( "Gathering WAM rankings for %d top WAM wikis", $limit );

while ( $apiOffset < $limit ) {
	echo '.';
	$wamData = $app->sendRequest( 'WAMApi', 'getWAMIndex', array( 'offset' => $apiOffset, 'limit' => min( $limit - $apiOffset, $apiLimit ) ) )->getData();

	if ( empty( $wamData ) || !is_array( $wamData['wam_index'] ) ) {
		// Unexpected return values -- is something broken?
		echo "\nWarning: Invalid or missing data returned from WAM API.\n";
		break;
	}
	elseif ( empty( $wamData['wam_index'] ) ) {
		// Unexpectedly reached end of list
		printf("\nWarning: Unexpectedly reached end of WAM list (less than %d wikis indexed).\n", $limit);
		break;
	}

	foreach ( $wamData['wam_index'] as $wikiId => $data ) {
		$wamWikisIds[] = $wikiId;
	}

	$apiOffset += $apiLimit;
}

echo "\n";

$dbr = wfGetDB( DB_SLAVE, array(), $wgExternalSharedDB );
echo "Fetching wikis from database...\n";

$result = $dbr->select(
	'city_list',
	'city_id, city_title, city_url',
	'city_id IN (' . join(',', $wamWikisIds) . ')',
	'DatabaseMysql::select',
	array( 'ORDER BY' => 'city_id' ) );

$wikis = array();
while ( $row = $dbr->fetchObject( $result ) ) {
	$wikis[ $row->city_id ] = $row->city_title;
}

$noDescrWikiCount = 0;
$descrWikiCount = 0;
$summaryLength = 0;
$maxDescrLength = 0;
foreach ( $wikis as $wikiId => $wikiTitle ) {
	$descr = (new CommunityDataService( $wikiId ))->getCommunityDescription();
	$descrLength = strlen( $descr );

	printf( "%d;%s;%d\n", $wikiId, $wikiTitle, $descrLength ) ;

	if ( $descrLength ) {
		$descrWikiCount++;
		$summaryLength += $descrLength;
		if ( $descrLength > $maxDescrLength ) {
			$maxDescrLength = $descrLength;
			$maxDescrLengthWiki = $wikiTitle;
		}
	}
	else {
		$noDescrWikiCount++;
	}
}

printf( "\nDone.\n%d from %d wikis found\nWikis with description: %d\nWikis without description: %d\nAverage description length: %.2f\nMaximum description length: %d [%s]\n\n",
	count( $wikis ),
	count( $wamWikisIds ),
	$descrWikiCount,
	$noDescrWikiCount,
	$descrWikiCount ? ($summaryLength / $descrWikiCount) : '-',
	$maxDescrLength,
	$maxDescrLengthWiki
);
