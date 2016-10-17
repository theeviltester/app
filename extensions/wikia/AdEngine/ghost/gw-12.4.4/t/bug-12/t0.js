jsWC=window.jsWC || {}; jsWC["./extensions/wikia/AdEngine/ghost/gw-12.4.4/t/bug-12/t0.js"]=337;

function test(){ 
	var theTest = new Y.Test.Case({ 
		 name: "Parallel Loading Test"
		,"feature tests should not replace documentElement.firstChild" :testFirstChild 
	});
	Y.Test.Runner.add(theTest)
	Y.Test.Runner.run(); 
}
function testFirstChild(){ 
	Y.Assert.areEqual ( originalFirstChild, document.documentElement.firstChild ) 
}


