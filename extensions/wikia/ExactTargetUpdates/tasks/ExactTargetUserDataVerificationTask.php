<?php
namespace Wikia\ExactTarget;

class ExactTargetUserDataVerificationTask extends ExactTargetTask {

	use ExactTargetDataComparisonHelper;

	private $userIds;

	/**
	 * context key/val pairs that all log messages coming from this class must have
	 * @return array
	 */
	protected function getLoggerContext() {
		return [
			'provided_user_ids_100' => array_slice( $this->userIds, 0, 100 )
		];
	}

	/**
	 * Retrieves data from ExactTarget and compares it with data in Wikia database
	 * @return bool
	 * return true if data is equal (except comparing user_touched)
	 * if data isn't equal throws exception with result diff
	 */
	public function verifyUsersData( array $aUsersIds ) {
		$this->userIds = $aUsersIds;
		$bSummaryResult = true;
		$differentUserData = [];
		// Fetch data from ExactTarget
		$oRetrieveUserTask = $this->getRetrieveUserTask();
		$aExactTargetUsersData = $oRetrieveUserTask->retrieveUsersDataByIds( $this->userIds );
		$aUsersIdsFlipped = array_flip( $this->userIds );
		foreach ( $aExactTargetUsersData as $aExactTargetUserData ) {
			$this->info( __METHOD__ . ' ExactTarget user data record: ' . json_encode( $aExactTargetUserData ) );

			// Fetch data from Wikia DB
			$oWikiaUser = \User::newFromId( $aExactTargetUserData['user_id'] );
			$oUserHooksHelper = $this->getUserHooksHelper();
			$aWikiaUserData = $oUserHooksHelper->prepareUserParams( $oWikiaUser );
			$this->info( __METHOD__ . ' Wikia DB user data record: ' . json_encode( $aWikiaUserData ) );

			// Compare results
			$bResult = $this->compareResults( $aExactTargetUserData, $aWikiaUserData, __METHOD__, 'user_touched' );

			// Mark verification process as failed if any record fails
			if ( $bResult === false ) {
				$differentUserData[] = $aExactTargetUserData['user_id'];
				$bSummaryResult = $bResult;
			}

			// Remove UserId from array to track unchecked users
			unset ( $aUsersIdsFlipped[$aExactTargetUserData['user_id']] );
		}

		if ( count( $aUsersIdsFlipped ) > 0 ) {
			$bSummaryResult = false;
		}
		$missingCount = count( $aUsersIdsFlipped );
		$differentCount = count( $differentUserData );
		$totalCount = count( $this->userIds );

		$context = [
			'missing_user_ids_100' => array_slice( array_keys( $aUsersIdsFlipped ), 0, 100 ),
			'different_user_ids_100' => array_slice( array_keys( $differentUserData ), 0, 100 ),
			'different_user_ids_total_count' => $differentCount,
			'missing_user_ids_total_count' => $missingCount,
			'different_ratio' => $differentCount / $totalCount,
			'missing_ratio' => $missingCount / $totalCount,
		];
		$this->info( 'ExactTarget - User data sync log', $context );

		echo 'ExactTarget - User data sync log';
		print_r( $context );

		return $bSummaryResult;
	}


	/**
	 * Retrieves data from ExactTarget and compares it with data in Wikia database
	 * @return bool
	 * return true if data is equal (except comparing user_touched)
	 * if data isn't equal throws exception with result diff
	 */
	public function verifyUserPropertiesData( $iUserId ) {
		$this->userIds = [ $iUserId ];
		// Fetch data from ExactTarget
		$oRetrieveUserTask = $this->getRetrieveUserTask();
		$aExactTargetUserProperties = $oRetrieveUserTask->retrieveUserPropertiesByUserId( $iUserId );
		$this->info( __METHOD__ . ' ExactTarget user_properties data record: ' . json_encode( $aExactTargetUserProperties ) );

		// Fetch data from Wikia DB
		$oWikiaUser = \User::newFromId( $iUserId );
		$oUserHooksHelper = $this->getUserHooksHelper();
		$aWikiaUserPropertiesData = $oUserHooksHelper->prepareUserPropertiesParams( $oWikiaUser );
		$this->info( __METHOD__ . ' Wikia DB user data record: ' . json_encode( $aWikiaUserPropertiesData ) );

		// Compare results
		$bResult = $this->compareResults( $aExactTargetUserProperties, $aWikiaUserPropertiesData, __METHOD__ );

		return $bResult;
	}

	/**
	 * A simple getter for an object of ExactTargetUserHooksHelper class
	 * @return ExactTargetUserHooksHelper
	 */
	protected function getUserHooksHelper() {
		return new ExactTargetUserHooksHelper();
	}
}
