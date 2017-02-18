//Listen for when a Tab changes state
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo && changeInfo.status == "complete"){
        console.log("Tab updated: " + tab.url);
        if(tab.url.includes("facebook")){
	        chrome.tabs.sendMessage(tabId, {data: tab}, function(response) {
           		console.log(response);
       		});
        }

    }
});