/*!
 * VisualEditor user interface WikiaEditDetailsDialog class.
 */

/**
 * Dialog for inserting videos.
 *
 * @class
 * @extends ve.ui.WikiaMediaInsertDialog
 *
 * @constructor
 * @param {Object} [config] Config options
 */
ve.ui.WikiaEditDetailsDialog = function VeUiMWEditDetailsPopupDialog( config ) {
	// Parent constructor
	ve.ui.WikiaEditDetailsDialog.super.call( this, config );
};

/* Inheritance */

OO.inheritClass( ve.ui.WikiaEditDetailsDialog, ve.ui.WikiaMediaInsertDialog );

/* Static Properties */

ve.ui.WikiaEditDetailsDialog.static.name = 'wikiaEditDetails';

ve.ui.WikiaEditDetailsDialog.static.title = OO.ui.deferMsg( 'visualeditor-dialog-video-insert-title' );

ve.ui.WikiaEditDetailsDialog.static.trackingLabel = 'dialog-edit-details';

/* Methods */

/**
 * @inheritdoc
 */
ve.ui.WikiaEditDetailsDialog.prototype.initialize = function () {
	var uploadWidget;

	// Parent method
	ve.ui.WikiaEditDetailsDialog.super.prototype.initialize.call( this );

	this.pages.removePages( [ this.mainPage ] );

	uploadWidget = this.query.getUpload();
	uploadWidget.getUploadButton().toggle();
};

ve.ui.windowFactory.register( ve.ui.WikiaEditDetailsDialog );
