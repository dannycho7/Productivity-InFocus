function thumbnail(){
	chrome.storage.sync.get('key',function(result){
		if(result.key == "true"){
			console.log("running");
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
					thumb[i].children[0].src = "https://i.imgflip.com/r2rlu.jpg";
				}
			}
		}
	});
}
window.addEventListener('load',function(){thumbnail(); setInterval(thumbnail,3000);});
