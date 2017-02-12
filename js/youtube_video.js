function loaded(){
	chrome.storage.sync.get('key',function(result){
		//stops video from playing
		function stopVideo() {
			var video = document.querySelector('video');
			console.log("video", video);
			if (video !== null && !(video.paused)) {
				console.log("Video found and is pausing");
				video.pause();
				clearInterval(videostopper);
			}
			if(video.paused){
				clearInterval(videostopper);
			}
		}
		//hides comments
		function hideContent(){
			var comments = document.getElementById("comment-section-renderer-items");
			if(comments){
				comments.style.display = "none";
				console.log("Display set to none");
				clearInterval(commenthide);
				//append an element that prompts user if they want to continue
			}
		}
		if(result.key == "true"){
			var commenthide = window.setInterval(function(){hideContent();}, 1000);
			var videostopper = window.setInterval(function(){stopVideo();}, 1000); //interval for video stopping function
		}
		else{
			console.log(result.key);
		}
	});
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
