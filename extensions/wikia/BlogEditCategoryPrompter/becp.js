jsWC=window.jsWC || {}; jsWC["./extensions/wikia/BlogEditCategoryPrompter/becp.js"]=425;

$(document).ready(function() {
	$("#editform").submit(function(event) {
		var categoriesInput = $("#categories").val();

		if (categoriesInput == "") {
			categoriesInput = "[]";
		}

		var categories = JSON.parse(categoriesInput);
		if (categories.length == 0) {
			var message = wgMessages['becp-prompt'];
			if (!confirm(message)) {
				event.stopImmediatePropagation();
				return false;
			}
		}

		return true;
	});
});