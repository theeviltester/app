window.rhfs=window.rhfs||[];rhfs.push('./extensions/SemanticResultFormats/formats/timeline/resources/SimileTimeline/scripts/util/debug.js');
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

