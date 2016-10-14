window.rhfs=window.rhfs||[];rhfs.push('./extensions/VisualEditor/lib/ve/tests/ve.LeafNode.test.js');
/*!
 * VisualEditor LeafNode tests.
 *
 * @copyright 2011-2014 VisualEditor Team and others; see http://ve.mit-license.org
 */

QUnit.module( 've.LeafNode' );

/* Stubs */

ve.LeafNodeStub = function VeLeafNodeStub() {
	// Parent constructor
	ve.LeafNode.call( this );
};

OO.inheritClass( ve.LeafNodeStub, ve.LeafNode );

ve.LeafNodeStub.static.name = 'leaf-stub';

/* Tests */
