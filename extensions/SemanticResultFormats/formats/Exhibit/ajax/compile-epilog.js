window.rhfs=window.rhfs||[];rhfs.push('./extensions/SemanticResultFormats/formats/Exhibit/ajax/compile-epilog.js');
(function() {
    var f = null;
    if ("SimileWidgets_onLoad" in window) {
        if (typeof SimileWidgets_onLoad == "string") {
            f = eval(SimileWidgets_onLoad);
            SimileWidgets_onLoad = null;
        } else if (typeof SimileWidgets_onLoad == "function") {
            f = SimileWidgets_onLoad;
            SimileWidgets_onLoad = null;
        }
    }
    
    if (f != null) {
        f();
    }
})();