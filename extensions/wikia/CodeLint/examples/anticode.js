/**
 * This is an example of JS code full on antipatterns
 * and other things you should avoid in JavaScript
 */

function foo() {
	bar = 12;

	return
	{
		retVal: bar
	}
}

function theFunction() {
	var foo = 1;
	return foo;

	// unreachable code
	foo++;
	return foo;
}

console.log(bar);

var obj = new Object(),
	arr = new Array(),
	collection = {
		abc: true,
		foo: false,
	}

alert(collection);

var a = new Function(),
	b = setTimeout('foo', 100),
	c = setInterval('foo', 500);

// @see http://www.ibm.com/developerworks/web/library/wa-memleak/
document.write("Circular references between JavaScript and DOM!");
function myFunction(element)
{
	this.elementReference = element;
	// This code forms a circular reference here
	//by DOM-->JS-->DOM
	element.expandoProperty = this;
}
function Leak() {
	//This code will leak
	new myFunction(document.getElementById("myDiv"));
}

var fooObject = {bar: true};

with(fooObject) {
	bar++;
}

// yay for hardcoding
(function() {
	elementText = elementText + '<a data-id="' + value + '" class="delete wikia-button secondary"><img src="http://images1.wikia.nocookie.net/__cb33534/common/skins/common/blank.gif" class="sprite trash"></a> ';
	pageUrl = wgServer + '/wiki/Foo';
	css = '/extensions/wikia/Foo/bar.css';
	js = '/skins/common/jquery/jquery.foo.js';
	sass = $.getSassCommonURL(  '/skins/oasis/css/touchScreen.scss' ); // should not be caught
})();

// $.live
$('#foo').live('click', $.noop);
$('#foo').live( "click", $.noop);

$('#foo').
	live( "click", $.noop);

// $.css
$('ul li').css('color', 'red'); // disallow
$('ul li').css('height', 300); // allow
$('ul li').css('width', 400); // allow
$('ul li').css('display', 'hide'); // use $.hide
$('ul li').css('display'); // allow - it gets a value
$('ul li').css('marginLeft', '50px'); // allow

// skin checks
if (skin == "oasis") {
	var foo = 'oasis';
}

// browser sniffing
if ($.browser.msie &&
	jQuery.browser.version == "9.0") {
	alert('msie');
}

// use of wgStyleVersion (it's a part of stylepath / wgExtensionsPath right now)
$.getScript(stylepath + '/oasis/js/touchScreen.js?' + wgStyleVersion);

// use promise pattern here - avoid "nested" callbacks
var obj = {
	foo: function() {
		$.getScript(wgServer + wgScriptPath + '?action=ajax&rs=CategorySelectGetCategories', function(data){
			$.loadYUI(function() {
				// ...
			});
		});
	}
};

(function() {
	foo(function() {
		// ...
	});
})();

obj.bar = function() {
	foo(function() {
		// ...
	});
}

var a = function(data) {return true},
	b = function(foo) {return foo};


// MW1.19 deprecations
if (mwEditButtons.push({foo: 'bar'})) {
	fixalpha();
}

os_toggle(foo);

// tracking
WET.byId('foo');
WET.byStr('foo');
$('#foo').trackClick('foo');
$.tracker.byId('foo');
$.tracker.byStr('foo');
$.tracker.track('foo');
$.tracker.trackStr('foo');
$.tracker.trackEvent('foo');

// deprecated JSON encoders / decoders
$.toJSON({foo: true});
jQuery.evalJSON('{foo: true}');
$.secureEvalJSON('{foo: 1234}');

// deprecated Nirvana calls
$('.modalContent').load(wgServer + wgScript + '?action=ajax&rs=moduleProxy&moduleName=ChatRail&actionName=AnonLoginSuccess&outputType=html');

// test ignore statement
$.toJSON({foo: true}); /* JSlint ignore */
