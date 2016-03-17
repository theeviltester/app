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

OO.inheritClass( ve.ui.WikiaEditDetailsDialog, OO.ui.ProcessDialog );
//OO.inheritClass( ve.ui.WikiaEditDetailsDialog, OO.ui.PopupWidget );

/*
// fixme: Move these to be buttons inside the dialog
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
*/


/* Static Properties */

ve.ui.WikiaEditDetailsDialog.static.name = 'wikiaEditDetails';

ve.ui.WikiaEditDetailsDialog.static.title = OO.ui.deferMsg( 'visualeditor-editdetailsdialog-title' );

ve.ui.WikiaEditDetailsDialog.static.trackingLabel = 'dialog-edit-details';

/* Methods */

/**
 * @inheritdoc
 */
ve.ui.WikiaEditDetailsDialog.prototype.initialize = function () {
	var editInfoItems, item, i;

	console.log('ve.ui.WikiaEditDetailsDialog.prototype.initialize');

	// Parent method
	ve.ui.WikiaEditDetailsDialog.super.prototype.initialize.call( this );

	// Properties
	this.$items = this.$( '<div>' );

	this.editInfoSelect = new OO.ui.RadioSelectWidget( {
		$: this.$,
	} );

	this.editInfoField = new OO.ui.FieldLayout( this.editInfoSelect, {
		$: this.$,
		align: 'left',
	} );

	editInfoItems = [
		new OO.ui.RadioOptionWidget( {
			$: this.$,
			data: 'minor',
			label: OO.ui.deferMsg( 'visualeditor-editdetailsdialog-option-minor' )
		} ),
		new OO.ui.RadioOptionWidget( {
			$: this.$,
			data: 'fixed',
			label: OO.ui.deferMsg( 'visualeditor-editdetailsdialog-option-fixed' )
		} ),
		new OO.ui.RadioOptionWidget( {
			$: this.$,
			data: 'added',
			label: OO.ui.deferMsg( 'visualeditor-editdetailsdialog-option-info' )
		} ),
		new OO.ui.RadioOptionWidget( {
			$: this.$,
			data: 'other',
			label: OO.ui.deferMsg( 'visualeditor-editdetailsdialog-option-other' )
		} )
	];

	// Remove default box-shadow border around option radio buttons
	for (i = 0; i < editInfoItems.length; i++) {
		editInfoItems[i].$element.children().addClass( 've-ui-wikiaEditInfoFieldOption' );
		editInfoItems[i].$element.children().removeClass( 'oo-ui-inputWidget' );
	}

	//this.$element.addClass( 'oo-ui-inputWidget' ).append( this.$input, $( '<span>' ) );

	this.editInfoSelect.addItems( editInfoItems );

	item = this.editInfoSelect.getFirstSelectableItem();
	this.editInfoSelect.selectItem( item );

	this.editInfoField.$element.addClass( 've-ui-wikiaEditInfoField' );

	this.editInfoTextInput = new OO.ui.TextInputWidget( { $: this.$ } );

	this.editInfoTextInput.connect( this, { click: 'onActivateEditField'});

	/*
	this.popup = new ve.ui.MWCategoryPopupWidget( {
		$: this.$
	} );
	*/

	this.editInfoTextField = new OO.ui.FieldLayout( this.editInfoTextInput, {
		$: this.$,
	} );

	this.$editInfoTextForm = this.$( '<form>' ).addClass( 've-ui-mwCategoryPopupWidget-sortKeyForm' )
		.append( this.editInfoTextField.$element );

	this.saveButton = new OO.ui.ButtonWidget( {
		$: this.$,
		label: OO.ui.deferMsg( 'visualeditor-savedialog-label-save' )
	} );

	this.saveButton.connect( this, { click: 'onSaveButtonClick' } );

	// Initialization
	this.$items
		.addClass( 've-ui-wikiaEditDetails' )
		.append(
		this.$( '<span>' )
			.addClass( 've-ui-wikiaVideoOptionWidget-duration' )
			.text( OO.ui.deferMsg( 'visualeditor-editdetailsdialog-describe' ) )
		)
		.append(
		this.$( '<div>' )
			.append( this.editInfoField.$element )
			.append( this.$editInfoTextForm )
			.append( this.saveButton.$element )
			//.append( this.popup.$element )
	);

	this.$body.append( this.$items );
};

ve.ui.WikiaEditDetailsDialog.prototype.createDialogContent = function ( data ) {
	console.log('ve.ui.WikiaEditDetailsDialog.prototype.createDialogContent');
	console.log(data);
};

// Fixme: not in use any more (?)
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

OO.ui.ProcessDialog.prototype.onSaveButtonClick = function () {
	var selectionText, selected = this.editInfoSelect.getSelectedItem();

	if (selected.getData() === 'other') {
		// fixme: What if other is selected but there is no text in the text box?
		selectionText = this.editInfoTextInput.getValue();
	} else {
		selectionText = selected.getLabel();
	}

	console.log( 'OO.ui.ProcessDialog.prototype.onSaveButtonClick' );
	console.log(selectionText);

	// fixme: figure out how to send the result of the dialog back to ve.init.mwViewPageTarget.js handler
	this.close( { summaryText: selectionText } );
};

OO.ui.ProcessDialog.prototype.onActivateEditField = function () {
	console.log ( 'OO.ui.ProcessDialog.prototype.onActivateEditField' );
};

ve.ui.windowFactory.register( ve.ui.WikiaEditDetailsDialog );
