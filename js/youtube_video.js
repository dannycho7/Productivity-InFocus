function loaded(){
	chrome.storage.sync.get('key',function(result){
		function includeWarningMessage(){
			console.log("hello");
			var div = createModal();
			var node = document.getElementById('movie_player')
			node.insertBefore(div, node.firstChild);
		}

		function createModal(){
			// creating the modal div
			var html = [
				'<div> A wild modal has appeared</div>'
			].join('');
			var div = document.createElement('div');
			// setting div attributes
			div.setAttribute('id', 'modal');
			div.style.width = "100%";
			div.style.height = "100%";
			div.style.position = "absolute";
			div.style.backgroundColor = "black";
			div.style.color = "red";
			div.style.fontSize = "40px";
			div.style.zIndex = 11;
			div.style.textAlign = "center";
			div.innerHTML = html;
			// creating the button
			var btn = document.createElement("BUTTON");
			btn.addEventListener("click", closeModal);


			function closeModal() {
				console.log(div);
				div.parentNode.removeChild(div);
			}
			btn.style.zIndex = 12;
			btn.style.color = "red";
			var t = document.createTextNode("CLOSE ME");
			btn.appendChild(t);

			// ordering the structure of button and div
			div.appendChild(btn);
			return div;
		}
		//stops video from playing
		function stopVideo() {
			var video = document.querySelector('video');
			console.log("video", video);
			if (video !== null && !(video.paused)) {
				console.log("Video found and is pausing");
				video.pause();
				// creating the modal
				includeWarningMessage();
				clearInterval(videostopper);
			}
			if(video.paused){
				clearInterval(videostopper);
			}
		}
		//hides comments
		function hideContent(){
			var comments = document.getElementById("comment-section-renderer");
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
document.addEventListener("spfdone",loaded);
document.addEventListener("DOMContentLoaded", loaded);
