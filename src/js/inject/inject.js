chrome.extension.sendMessage({page: true}, function(response) {
	$(function(){
		var vars = $('embed[type="application/x-shockwave-flash"]').attr('flashvars');
		var idx = vars.indexOf("asf=");
		var idxEnd = vars.indexOf("&", 4);
		var asf = parseInt(vars.substring(idx+4, idxEnd));
		initializeNoAdVideo(asf, "0", "player", 0);
	});
});