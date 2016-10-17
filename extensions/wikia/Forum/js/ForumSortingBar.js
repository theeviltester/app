jsWC=window.jsWC || {}; jsWC["./extensions/wikia/Forum/js/ForumSortingBar.js"]=393;

(function(window, $) {

Forum.SortingBar = $.createClass(Wall.SortingBar, {
	initElements: function() {
		this.sorting = $('#Forum .sorting');
		this.sortingList = this.sorting.find('.menu');
		this.sortingOption = this.sortingList.find('.option');
		this.sortingSelected = this.sorting.find('.selected');
	}
});

Wall.settings.classBindings.sortingBar = Forum.SortingBar;

})(window, jQuery);