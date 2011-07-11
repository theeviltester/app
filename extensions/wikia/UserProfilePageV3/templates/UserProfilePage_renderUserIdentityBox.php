<section id="UserProfileMasthead" class="UserProfileMasthead">
	
	<div class="masthead-avatar">
	<? if( $isUserPageOwner || $isWikiStaff ): ?>
		<a href="#" id="userAvatarEdit">
	<? endif; ?>
			<?= $user['avatar']; ?>
	<? if( $isUserPageOwner || $isWikiStaff ): ?>
		</a>
	<? endif; ?>
	</div>
	
	<div class="masthead-info">
		<hgroup>
			<h1><?= $user['name']; ?></h1>
			<span class="group"><?= $user['group']; ?></span>
			<? if( !empty($user['realName']) ): ?>
				<h2><?= wfMsg('user-identity-box-aka-label', array('$1' => $user['realName']) ); ?></h2>
			<? endif; ?>
		</hgroup>



		<? if( $isUserPageOwner || $isWikiStaff ): ?>
			<a href="#" id="userIdentityBoxEdit">Edit</a>
			<input type="hidden" id="user" value="<?= $user['id']; ?>" />
		<? endif; ?>

		
		<div>
				<div class="tally">
					<? if( !empty($user['registration']) ): ?>
						<? if( !empty($user['edits']) ): ?>
							<em><?= $user['edits'] ?></em>
							<span>
								<?= wfMsg('user-identity-box-edits-since-joining') ?><br>
								<?= $user['registration'] ?>
							</span>
						<? endif; ?>
					<? else: ?>
						<?= wfMsg('user-identity-box-edits', array( '$1' => $user['edits'] ) ); ?>
					<? endif; ?>
				</div>

			<ul class="websiteLinks">
				<? if( !empty($user['twitter']) ): ?>
					<li><?= wfMsg('user-identity-box-my-twitter', array( '$1' => $user['twitter'] )); ?></li>
				<? else: ?>
					<? if( $isUserPageOwner || $isWikiStaff ): ?>
					<li><?= wfMsg('user-identity-box-zero-state-twitter'); ?></li>
					<? endif; ?>
				<? endif; ?>
				
				<? if( !empty($user['website']) ): ?>
					<li><?= wfMsg('user-identity-box-my-website', array( '$1' => $user['website'] )); ?></li>
				<? else: ?>
					<? if( $isUserPageOwner || $isWikiStaff ): ?>
					<li><?= wfMsg('user-identity-box-zero-state-website'); ?></li>
					<? endif; ?>
				<? endif; ?>
				
				<? if( !empty($user['fbPage']) ): ?>
					<li><?= wfMsg('user-identity-box-my-fb-page', array( '$1' => $user['fbPage'] )); ?></li>
				<? else: ?>
					<? if( $isUserPageOwner || $isWikiStaff ): ?>
					<li><?= wfMsg('user-identity-box-zero-state-fb-page'); ?></li>
					<? endif; ?>
				<? endif; ?>
			</ul>

			<? if( !empty($user['topWikis']) && is_array($user['topWikis']) ): ?>
			<ul class="favWikis">
				<span><?= wfMsg('user-identity-box-fav-wikis'); ?></span>
				<? foreach($user['topWikis'] as $wiki): ?>
					<li><a href="<?= $wiki['wikiUrl']; ?>"><?= $wiki['wikiName']; ?></a></li>
				<? endforeach; ?>
			</ul>
			<? endif; ?>			
		</div>
		<div>		
			<ul class="details">
				<? if( !empty($user['location']) ): ?>
					<li><?= wfMsg('user-identity-box-location', array( '$1' => $user['location'] )); ?></li>
				<? else: ?>
					<? if( $isUserPageOwner || $isWikiStaff ): ?>
					<li><?= wfMsg('user-identity-box-zero-state-location'); ?></li>
					<? endif; ?>
				<? endif; ?>
				
				<? if( !empty($user['birthday']) ): ?>
					<li><?= wfMsg('user-identity-box-was-born-on', array( '$1' => wfMsg('user-identity-box-about-date-'.$user['birthday']['month']), '$2' => $user['birthday']['day'] )); ?></li>
				<? else: ?>
					<? if( $isUserPageOwner || $isWikiStaff ): ?>
					<li><?= wfMsg('user-identity-box-zero-state-birthday'); ?></li>
					<? endif; ?>
				<? endif; ?>
				
				<? if( !empty($user['occupation']) ): ?>
					<li><?= wfMsg('user-identity-box-occupation', array( '$1' => $user['occupation'] )); ?></li>
				<? else: ?>
					<? if( $isUserPageOwner || $isWikiStaff ): ?>
					<li><?= wfMsg('user-identity-box-zero-state-occupation'); ?></li>
					<? endif; ?>
				<? endif; ?>
				
				<? if( !empty($user['gender']) ): ?>
					<li><?= wfMsg('user-identity-i-am', array( '$1' => $user['gender'] )); ?></li>
				<? else: ?>
					<? if( $isUserPageOwner || $isWikiStaff ): ?>
					<li><?= wfMsg('user-identity-box-zero-state-gender'); ?></li>
					<? endif; ?>
				<? endif; ?>
			</ul>
		</div>
		
	</div>
</section>