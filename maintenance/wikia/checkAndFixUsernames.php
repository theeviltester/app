<?php

$optionsWithArgs = array( "db" );

ini_set( "include_path", dirname(__FILE__)."/.." );
require_once( "commandLine.inc" );

$tables = array(
	"revision"      => array( "rev_user_text", "rev_user" ),
	"image"         => array( "img_user_text", "img_user" ),
	"recentchanges" => array( "rc_user_text", "rc_user" ),
	"archive"       => array( "ar_user_text", "ar_user" ),
	"filearchive"   => array( "fa_user_text", "fa_user" ),
	"oldimage"      => array( "oi_user_text", "oi_user" )
);

/**
 * wikicites handler
 */
$dbr = wfGetDB( DB_SLAVE, array(), $wgExternalSharedDB );


/**
 * local database handler
 * @todo do not harcode, use commandline option
 */
$db = isset( $options[ "db" ] ) ? $options[ "db" ] : "lyricwiki";
$dbw = $dbr = wfGetDB( DB_MASTER, array(), $db );

/**
 * not very optimal but we cant use join between db clusters
 *
 * we probably could assume that username which is bad in one table is bad
 * in other as well
 */
$cachedUsers = array();
foreach( $tables as $table => $columns ) {
	Wikia::log( "log", "table", $table );
	$sth = $dbr->select(
		array( $table ),
		$columns,
		false,
		__METHOD__
	);
	while( $row = $dbw->fetchRow( $sth ) ) {
		/**
		 * for this username check user_id in external shared
		 */
		if( empty( $cachedUsers[ $row[ 0 ] ] ) ) {
			$user = $dbr->selectRow(
				array( "user" ),
				array( "user_id", "user_name"),
				array( "user_name" => $row[ 0 ] ),
				__METHOD__
			);
			if( !empty( $user ) ) {
				$cachedUsers[ $user->user_name ] = $user->user_id;
				if( $user->user_id != $row[ 1 ] ) {
					Wikia::log( "log", false, "inconsistency in $table, for {$user->user_name} local = {$row[ 1 ]}, global = {$user->user_id}" );
				}
			}
		}
	}
}
