function formatToday(){
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	return year + "/" + month + "/" + day;
}
//Background script to change the icon based on user settings
chrome.storage.sync.get(null,function(result){
	if(result.key == "true"){
		chrome.browserAction.setIcon({path:"/img/on.png"});
	}
	else{
		chrome.browserAction.setIcon({path:"/img/off.png"});
	}
	//setting default videoCount
	var d = new Date();
	if(result.videoCount == undefined || d > result.expiryTime){
		var expiryTime = new Date();
		expiryTime = parseInt(expiryTime.getTime()) + 86400000;
		console.log(expiryTime);
		var obj = {};
		obj['videoCount'] = 0;
		obj['expiryTime'] = expiryTime;
		chrome.storage.sync.set(obj,function(){ console.log("set vidCount and expiryTime"); });
	}
	var x = "videoCount";
	console.log(formatToday());
});
