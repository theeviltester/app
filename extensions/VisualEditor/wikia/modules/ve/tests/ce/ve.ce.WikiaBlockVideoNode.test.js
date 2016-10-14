window.rhfs=window.rhfs||[];rhfs.push('./extensions/VisualEditor/wikia/modules/ve/tests/ce/ve.ce.WikiaBlockVideoNode.test.js');
/*!
 * VisualEditor ContentEditable WikiaBlockVideoNode tests.
 */

QUnit.module( 've.ce.WikiaBlockVideoNode', ve.wikiaTest.utils.disableDebugModeForTests() );

/* Tests */

QUnit.test( 'Build NodeView from HTMLDOM', function ( assert ) {
	ve.wikiaTest.utils.media.runHtmlDomToNodeViewTests(
		assert,
		'block',
		'mw:Video',
		function ( documentNode ) {
			return documentNode.getChildren()[0];
		}
	);
} );

QUnit.test( 'NodeView Transactions', function ( assert ) {
	ve.wikiaTest.utils.media.runNodeViewTransactionTests(
		assert,
		'block',
		'mw:Video',
		function ( documentNode ) {
			return documentNode.getChildren()[0];
		}
	);
} );
