window.rhfs=window.rhfs||[];rhfs.push('./skins/oasis/js/touchScreen.js');
$(function(){
	var captcha = document.getElementById('wpCaptchaWord');
	if(captcha) {
		captcha.setAttribute('autocorrect', 'off');
		captcha.setAttribute('autocapitalize', 'off');
	}
});

