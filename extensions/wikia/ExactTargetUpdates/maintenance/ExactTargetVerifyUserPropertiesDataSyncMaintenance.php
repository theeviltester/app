<?php
/**
 * Maintenance script for comparing state of 2500 recently changed users' properties data
 * from Wikia database to ExactTarget data
 *
 * @package MediaWiki
 * @addtopackage maintenance
 *
 * @author Kamil Koterba <kamil@wikia-inc.com>
 *
 */

require_once( __DIR__ . '/../../../../maintenance/Maintenance.php' );

use Wikia\ExactTarget\ExactTargetUserDataVerificationTask;

class ExactTargetVerifyUserPropertiesDataSyncMaintenance extends Maintenance {

	/**
	 * Maintenance script entry point.
	 */
	public function execute() {
		global $wgExternalSharedDB;
		$differentCount = 0;
		$dbr = wfGetDB( DB_SLAVE, array(), $wgExternalSharedDB );

		$users = $this->getAllUsers( $dbr );

		foreach ( $users as $userId ) {
			$oUserDataVerificationTask = $this->getUserDataVerificationTask();
			if ( !$oUserDataVerificationTask->verifyUserPropertiesData( $userId ) ) {
				$differentCount++;
			}
		}

		$differentRatio = $differentCount / count($users);

		echo "Number of users that have different user properties data in Wikia compared to ExactTarget: $differentCount
Ratio of different to all: $differentRatio\n";

	}

	private function getAllUsers( DatabaseBase $dbr ) {
		$oWikiaSQL = new WikiaSQL();
		$oWikiaSQL->SELECT( 'user_id' )
			->FROM( 'user' )
			->ORDER_BY( 'user_touched' )->DESC()
			->LIMIT( 2500 );

		return $oWikiaSQL->runLoop( $dbr, function( &$users, $res ) {
			$users[] = $res->user_id;
		});
	}

	/**
	 * Returns an instance of ExactTargetUserDataVerification class
	 * @return ExactTargetUserDataVerificationTask
	 */
	protected function getUserDataVerificationTask() {
		return new ExactTargetUserDataVerificationTask();
	}
}

$maintClass = 'ExactTargetVerifyUserPropertiesDataSyncMaintenance';
require_once( RUN_MAINTENANCE_IF_MAIN );
