<header id="WikiHeader" class="WikiHeader">
	<?= $app->renderView( 'WikiHeader', 'Wordmark' ) ?>
	<form class="wds-global-navigation__search" action="" style="flex: 2 1 auto;">
		<div id="searchInputWrapperTest" class="wds-dropdown wds-global-navigation__search-input-wrapper">
			<label class="wds-global-navigation__search-label">
				<?= DesignSystemHelper::renderSvg(
					'wds-icons-magnifying-glass',
					'wds-icon wds-icon-small wds-global-navigation__search-label-icon'
				) ?>
				<input id="searchInputTest"
					type="search"
					class="wds-global-navigation__search-input"
					name="query"
					data-suggestions-url="index.php?action=ajax&rs=getLinkSuggest&format=json"
					data-suggestions-param-name="query" data-suggestions-tracking-label="search-suggestion"
					data-active-placeholder=""
					placeholder="Search <?= F::app()->wg->Sitename; ?>"
					autocomplete="off"
				/>
			</label>
			<button class="wds-button wds-is-text wds-global-navigation__search-close" type="reset">
				<?= DesignSystemHelper::renderSvg(
					'wds-icons-cross',
					'wds-icon wds-icon-small wds-global-navigation__search-close-icon',
					wfMessage( 'global-navigation-search-cancel' )->escaped()
				) ?>
			</button>
			<button class="wds-button wds-global-navigation__search-submit" type="submit" data-tracking-label="">
				<?= DesignSystemHelper::renderSvg(
					'wds-icons-arrow',
					'wds-icon wds-icon-small wds-global-navigation__search-submit-icon'
				) ?>
			</button>
		</div>
	</form>
	<div class="hiddenLinks">
		<a href="<?= Sanitizer::encodeAttribute( $hiddenLinks['watchlist'] ); ?>" accesskey="l"><?= wfMessage( 'watchlist' )->escaped(); ?></a>
		<a href="<?= Sanitizer::encodeAttribute( $hiddenLinks['random'] ); ?>" accesskey="x"><?= wfMessage( 'randompage' )->escaped(); ?></a>
		<a href="<?= Sanitizer::encodeAttribute( $hiddenLinks['recentchanges'] ); ?>" accesskey="r"><?= wfMessage( 'recentchanges' )->escaped(); ?></a>
	</div>
</header>
