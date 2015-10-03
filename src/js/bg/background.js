var origConsole = console.log;
var DEBUG = false;
if(!DEBUG){
	var console = {};
	console.log = function(){};
	window.console = console;
}

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request.action == 'updateURL'){
			chrome.tabs.update(sender.tab.id, {url: request.url});
			sendResponse();
		}else{
			if(request.page){
				chrome.pageAction.show(sender.tab.id);
			}
			sendResponse({url: sender.tab.url});
		}
		return true;
	}
);