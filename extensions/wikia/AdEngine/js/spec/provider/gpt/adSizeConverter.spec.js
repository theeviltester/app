window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/AdEngine/js/spec/provider/gpt/adSizeConverter.spec.js');
/*global describe, it, expect, modules*/
describe('ext.wikia.adEngine.provider.gpt.adSizeConverter', function () {
	'use strict';

	function noop() { return; }

	var mocks = {
			log: noop
		};

	function getModule() {
		return modules['ext.wikia.adEngine.provider.gpt.adSizeConverter'](mocks.log);
	}

	it('Converts two sizes to array with two elements', function () {
		var sizes = getModule().convert('300x250,300x600');

		expect(sizes).toEqual([[300, 250], [300, 600]]);
	});
});
