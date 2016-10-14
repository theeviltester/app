window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/AdEngine/ghost/gw-12.4.4/t/loose-defer/t0.js');
function test(){ 
	var test= new Y.Test.Case({ 
		name: "Loose Deferscript", 
		"scripts marked with type=text/deferscript should be deferred": function(){ 
			var self= this
			ghostwriter.loadscripts()
			this.wait(function(){
				Y.Assert.areEqual(2, a.length) 
			}, 500);
		}
	});
	Y.Test.Runner.add(test); 
	Y.Test.Runner.run(); 
}

