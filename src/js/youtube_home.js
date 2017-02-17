function thumbnail(){
	chrome.storage.sync.get('key',function(result){
		if(result.key == "true"){
			var thumbnail = document.getElementsByClassName('yt-thumb-simple');
			if(thumbnail.length > 0){
				changeImage(thumbnail);
			}
			var thumbVid = document.getElementsByClassName('yt-uix-simple-thumb-wrap');
			if(thumbVid.length > 0){
				changeImage(thumbVid);
			}
			function changeImage(thumb){
				for(var i = 0; i < thumb.length; i++){
					//thumb[i].children[0].src = "https://i.stack.imgur.com/poVgz.png";
					thumb[i].children[0].src = chrome.extension.getURL("img/black.png");
				}
			}
		}
	});
}

document.addEventListener("spfdone",thumbnail);
document.addEventListener("DOMContentLoaded", function(){thumbnail(); setInterval(thumbnail,2000);});
