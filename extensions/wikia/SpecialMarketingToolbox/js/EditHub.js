var EditHub = function() {};

var vet_back,vet_close; //hack for VET, please remove this line after VET refactoring

EditHub.prototype = {
	form: undefined,
	wmuReady: undefined,
	vetReady: undefined,
	wmuDeffered: undefined,
	vetDeffered: undefined,
	placeholderDimensions: 138,

	init: function () {
		$('.MarketingToolboxMain .wmu-show').click($.proxy(this.wmuInit, this));
		$('.MarketingToolboxMain .vet-show').click($.proxy(this.vetInit, this));

		this.form = $('#marketing-toolbox-form');

		$('#marketing-toolbox-clearall').click($.proxy(function(){
			if (confirm($.msg('marketing-toolbox-edithub-clearall-confirmation',this.form.data('module-name'))) == true) {
				this.formReset();
			}
		}, this));

		$.validator.addMethod("wikiaUrl", function(value, element) {
			var reg = new RegExp(window.wgMarketingToolboxUrlRegex, 'i');
			return this.optional(element) || reg.test(value);
		}, $.validator.messages.url);

		this.form.validate({
			errorElement: 'p',
			onkeyup: false,
			onfocusout: function(element, event) {
				if ( $.proxy(this.settings.isValidatable, this)(element) ) {
					this.element(element);
				}
			},
			isValidatable: function(element) {
				return !this.checkable(element) && (element.name in this.submitted || !this.optional(element) || element === this.lastActive);
			}
		});

		this.wmuReady = false;
		this.vetReady = false;
	},

	wmuInit: function(event) {
		event.preventDefault();
		if (!this.wmuReady) {
			var $input = $(this).prev();
			this.wmuDeffered = $.when(
				$.loadYUI(),
				$.getResources([
					wgExtensionsPath + '/wikia/WikiaMiniUpload/js/WMU.js',
					wgExtensionsPath + '/wikia/WikiaMiniUpload/css/WMU.css'
				])
			).then($.proxy(function() {
				WMU_skipDetails = true;
				WMU_show();
				this.wmuReady = true;
			}, this));
			$(window).bind('WMU_addFromSpecialPage', $.proxy(function(event, wmuData) {
				this.addImage(wmuData);
			}, this));
		}
		else {
			WMU_show();
		}
	},

	vetInit: function(event) {
		if (!this.vetReady) {
			this.vetDeffered = $.when(
				$.loadYUI(),
				$.loadMustache(),
				$.getResources([
					wgExtensionsPath + '/wikia/WikiaStyleGuide/js/Dropdown.js',
					wgExtensionsPath + '/wikia/VideoEmbedTool/js/VET.js',
					$.getSassCommonURL('/extensions/wikia/VideoEmbedTool/css/VET.scss'),
					$.getSassCommonURL('/extensions/wikia/WikiaStyleGuide/css/Dropdown.scss')
				])
			).then(function() {
				VET_show();
			});
			$(window).bind('VET_addFromSpecialPage', $.proxy(this.addVideo, this));
			this.vetReady = true;
		}
		else {
			VET_show();
		}
	},

	addImage: function(wmuData) {
		$.nirvana.sendRequest({
			controller: 'MarketingToolbox',
			method: 'getImageDetails',
			type: 'get',
			data: {
				'fileHandler': wmuData.imageTitle
			},
			callback: $.proxy(function(response) {
				var tempImg = new Image();
				tempImg.src = response.fileUrl;
				tempImg.height = this.placeholderDimensions;
				tempImg.width = this.placeholderDimensions;
				$('.MarketingToolboxMain .placeholder').append(tempImg);
			}, this)
		});
	},

	addVideo: function(event, vetData) {
		$.nirvana.sendRequest({
			controller: 'MarketingToolbox',
			method: 'getVideoDetails',
			type: 'get',
			data: {
				'wikiText': vetData.videoWikiText
			},
			callback: function(response) {
				$('.MarketingToolboxMain').append(response.fileName);
			}
		});
	},

	formReset: function() {
		this.form.find('input:text, input:password, input:file, select, textarea').val('');
		this.form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
	}
}

var EditHub = new EditHub();
$(function () {
	EditHub.init();
});