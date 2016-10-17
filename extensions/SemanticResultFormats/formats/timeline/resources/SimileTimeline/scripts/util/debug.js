jsWC=window.jsWC || {}; jsWC["./extensions/SemanticResultFormats/formats/timeline/resources/SimileTimeline/scripts/util/debug.js"]=333;

/*==================================================
 *  Debug Utility Functions
 *==================================================
 */

Timeline.Debug = new Object();

Timeline.Debug.log = function(msg) {
};

Timeline.Debug.exception = function(e) {
    alert("Caught exception: " + (Timeline.Platform.isIE ? e.message : e));
};

