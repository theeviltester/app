window.rhfs=window.rhfs||[];rhfs.push('./skins/oasis/js/AnonTOC.js');
/*
 * This script simply hides the Table of Contents by default.
 * Loaded only for Oasis Anons in AssetsManager.
 * It replaces the TOCimprovements extension.
 *
 * @author Christian Williams
 */
$(function() {
	mw.util.toggleToc($('#togglelink'));
});
