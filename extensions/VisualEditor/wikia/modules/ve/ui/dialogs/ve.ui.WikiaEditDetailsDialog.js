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

//OO.inheritClass( ve.ui.WikiaEditDetailsDialog, ve.ui.WikiaMediaInsertDialog );
OO.inheritClass( ve.ui.WikiaEditDetailsDialog, OO.ui.ProcessDialog );
//OO.inheritClass( ve.ui.WikiaEditDetailsDialog, ve.ui.MWSaveDialog );
//OO.inheritClass( ve.ui.WikiaEditDetailsDialog, OO.ui.InputWidget );

ve.ui.WikiaEditDetailsDialog.static.actions = [
	{
		action: 'save',
		//label: OO.ui.deferMsg( 'visualeditor-dialog-action-apply' ),
		label: 'SAVE NOW',
		flags: [ 'primary', 'progressive' ],
		modes: 'save',
		accessKey: 's'
	},
	{
		action: 'cancel',
		//label: OO.ui.deferMsg( 'visualeditor-savedialog-label-resume-editing' ),
		label: 'CANCEL'
	}
];


/* Static Properties */

ve.ui.WikiaEditDetailsDialog.static.name = 'wikiaEditDetails';

//ve.ui.WikiaEditDetailsDialog.static.title = OO.ui.deferMsg( 'visualeditor-dialog-video-insert-title' );
ve.ui.WikiaEditDetailsDialog.static.title = 'Save Details';

ve.ui.WikiaEditDetailsDialog.static.trackingLabel = 'dialog-edit-details';

/* Methods */

/**
 * @inheritdoc
 */
ve.ui.WikiaEditDetailsDialog.prototype.initialize = function () {
	console.log('ve.ui.WikiaEditDetailsDialog.prototype.initialize');

	// Parent method
	ve.ui.WikiaEditDetailsDialog.super.prototype.initialize.call( this );


	// Properties
	this.$items = this.$( '<div>' );
	this.feedback = null;
	this.helpButton = new OO.ui.ButtonWidget( {
		$: this.$,
		framed: false,
		icon: 'help',
		title: ve.msg( 'visualeditor-help-title' ),
		href: new mw.Title( ve.msg( 'visualeditor-help-link' ) ).getUrl(),
		target: '_blank',
		label: ve.msg( 'visualeditor-help-label' )
	} );
	this.keyboardShortcutsButton = new OO.ui.ButtonWidget( {
		$: this.$,
		framed: false,
		icon: 'help',
		label: ve.msg( 'visualeditor-dialog-command-help-title' )
	} );
	this.feedbackButton = new OO.ui.ButtonWidget( {
		$: this.$,
		framed: false,
		icon: 'comment',
		label: ve.msg( 'visualeditor-feedback-tool' )
	} );

	// Events
	//this.feedbackButton.connect( this, { click: 'onFeedbackClick' } );
	//this.keyboardShortcutsButton.connect( this, { click: 'onKeyboardShortcutsClick' } );

	// Initialization
	this.$items
		.addClass( 've-ui-mwHelpPopupTool-items' )
		.append(
		this.$( '<div>' )
			.addClass( 've-ui-mwHelpPopupTool-item' )
			.text( ve.msg( 'visualeditor-beta-warning' ) )
	)
		.append(
		this.$( '<div>' )
			.addClass( 've-ui-mwHelpPopupTool-item' )
			.append( this.helpButton.$element )
			.append( this.keyboardShortcutsButton.$element )
			.append( this.feedbackButton.$element )
	);
	if ( ve.version.id !== false ) {
		this.$items
			.append( this.$( '<div>' )
				.addClass( 've-ui-mwHelpPopupTool-item' )
				.append( this.$( '<span>' )
					.addClass( 've-ui-mwHelpPopupTool-version-label' )
					.text( ve.msg( 'visualeditor-version-label' ) )
			)
				.append( ' ' )
				.append( this.$( '<a>' )
					.addClass( 've-ui-mwHelpPopupTool-version-link' )
					.attr( 'target', '_blank' )
					.attr( 'href', ve.version.url )
					.text( ve.version.id )
			)
				.append( ' ' )
				.append( this.$( '<span>' )
					.addClass( 've-ui-mwHelpPopupTool-version-date' )
					.text( ve.version.dateString )
			)
		);
	}

	//this.$items.find( 'a' ).attr( 'target', '_blank' );

	this.$body.append( this.$items );
};

ve.ui.WikiaEditDetailsDialog.prototype.createDialogContent = function ( data ) {
	console.log('ve.ui.WikiaEditDetailsDialog.prototype.createDialogContent');
	console.log(data);
};

ve.ui.WikiaEditDetailsDialog.prototype.getActionProcess = function ( action ) {
	console.log('ve.ui.WikiaEditDetailsDialog.prototype.getActionProcess');
	console.log(action);

	if ( action === 'save' ) {
		return new OO.ui.Process( function () {
			console.log('Starting OO.ui.Process');

			this.close( { action: action } );
		}, this );
	}
	else {
		this.close( { action: action } );
	}

	return ve.ui.WikiaEditDetailsDialog.super.prototype.getActionProcess.call( this, action );
};

ve.ui.windowFactory.register( ve.ui.WikiaEditDetailsDialog );
