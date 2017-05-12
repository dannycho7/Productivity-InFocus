//Listen for when a Tab changes state
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo && changeInfo.status == "complete"){
      console.log("Tab updated: " + tab.url);
      if(tab.url.includes("facebook") || tab.url.includes("youtube")){
        chrome.tabs.sendMessage(tabId, {data: tab}, function(response) {
         		console.log(response);
     	  });
      }
    }
});

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}
//num is a parameter that should be set to 0 if you want today's date
//setting it higher will go back num number of days
//assume that num is less than 15
function formatToday(num){
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate() - num;
	var year = dateObj.getUTCFullYear();
	if(day <= 0){
		if(month == 1){
			//you go back one year
			month = 12;
			year--;
			day = daysInMonth(month,year); //sets the day to number of days in the previous month
		}
		else{
			month--;
			day += daysInMonth(month, year); //sets the day to number of days in the previous month
		}
	}
	return "" + year + month + day;
}
//Background script to change the icon based on user settings
chrome.storage.sync.get(null,function(result){
	if(result.key == undefined){
		//default option on first download
		chrome.storage.sync.set({ 'key': "true" }, function(){ chrome.browserAction.setIcon({path:"/img/on.png"}); } );
	}
	else if(result.key == "true"){
		chrome.browserAction.setIcon({path:"/img/on.png"});
	}
	else{
		chrome.browserAction.setIcon({path:"/img/off.png"});
	}
	if(result.allTimeCount == undefined){
		chrome.storage.sync.set({'allTimeCount':'0',},function(){ console.log("setallTimeCount"); })
	}
	//setting default videoCountb
	if(result[formatToday(0)] == undefined){
		var obj = {};
		obj[formatToday(0)] = 0;
		console.log(obj[formatToday(0)]);
		chrome.storage.sync.set(obj,function(){ console.log("set vidCount"); });
	}
});
