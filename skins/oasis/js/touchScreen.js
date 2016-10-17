jsWC=window.jsWC || {}; jsWC["./skins/oasis/js/touchScreen.js"]=189;

$(function(){
	var captcha = document.getElementById('wpCaptchaWord');
	if(captcha) {
		captcha.setAttribute('autocorrect', 'off');
		captcha.setAttribute('autocapitalize', 'off');
	}
});

