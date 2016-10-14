window.rhfs=window.rhfs||[];rhfs.push('./extensions/VisualEditor/lib/ve/src/dm/ve.dm.FocusableNode.js');
/*!
 * VisualEditor DataModel Focusable node.
 *
 * @copyright 2011-2014 VisualEditor Team and others; see http://ve.mit-license.org
 */

/**
 * A mixin class for focusable nodes.
 *
 * @class
 * @abstract
 * @constructor
 */
ve.dm.FocusableNode = function VeDmFocusableNode() {};

/* Inheritance */

OO.initClass( ve.dm.FocusableNode );

/* Static Properties */

ve.dm.FocusableNode.static.isFocusable = true;
