function loaded(){
	chrome.storage.sync.get('key',function(result){
		if(result.key == "true"){
			function stopVideo() {
				var video = document.querySelector('video');
				console.log("video", video);
				if (video !== null && !(video.paused)) {
					console.log("Video found");
					video.pause();
					clearInterval(videostopper);
				}
			}
			var videostopper = window.setInterval(function(){stopVideo();},1000); //interval for video stopping function
		}
		else{
			console.log(result.key);
		}
	});
}

function hideContent(){
	document.getElementById("comment-section-renderer-items").style.visibility = "hidden";
}

function includeWarningMessage(){
	var html = [
		'<div> A line</div>',
		'<div> Add more lines</div>',
		'<div> To the array as you need.</div>'
	].join('');

	var div = document.createElement('div');
		div.setAttribute('class', 'post block bc2');
		div.innerHTML = html;
		document.getElementById('comment-section-renderer').appendChild(div);
}
document.addEventListener("spfdone",loaded);
document.addEventListener("DOMContentLoaded", loaded);
