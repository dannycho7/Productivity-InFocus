chrome.storage.sync.get('key',function(result){
		if(result.key == "true"){
			alert("on");
		}
		else{
			alert("off");
		}
});