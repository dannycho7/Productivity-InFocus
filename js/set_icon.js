chrome.storage.sync.get('key',function(result){
		if(result.key == "true"){
			chrome.browserAction.setIcon({path:"/img/on.png"});
		}
		else{
			chrome.browserAction.setIcon({path:"/img/off.png"});
		}
});
