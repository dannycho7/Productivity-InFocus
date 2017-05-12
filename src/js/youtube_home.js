function changeImage(thumb){
	for(var i = 0; i < thumb.length; i++){
		if(thumb[i].children[0] != undefined && thumb[i].children[0].src != undefined) {
			thumb[i].children[0].src = chrome.extension.getURL("img/black.png");
		}
	}
}

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
			var thumbnailNew = document.getElementsByClassName('ytd-thumbnail');
			if(thumbnailNew.length > 0){
				changeImage(thumbnailNew);
			}
		}
	});
}

document.addEventListener("DOMContentLoaded", function(){
	thumbnail();
	setInterval(thumbnail,2000);
});
