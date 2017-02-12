function loaded(){
	chrome.storage.sync.get('key',function(result){
		//remove all modals that exist in the beginning of each video request
		removeModal();
		function includeWarningMessage(category){
			var div = createModal(category);
			var node = document.getElementById('movie_player')
			node.insertBefore(div, node.firstChild);
		}

		function createModal(category){
			// creating the modal div
			var div = document.createElement('div');
			// setting div attributes
			div.className = 'video-modal';
			// creating the button
			var btn = document.createElement("button");
			btn.addEventListener("click", closeModal);
			// creating the header
			var header = document.createElement("h1");
			header.innerHTML = "Do you have time to watch this?";
			div.appendChild(header);
			var description = document.createElement("p");
			description.innerHTML = category + " videos will distract you from focusing!"
			div.appendChild(description)
			function closeModal() {
				console.log(div);
				div.parentNode.removeChild(div);
				document.querySelector('video').play();
			}
			var t = document.createTextNode("Proceed");
			btn.appendChild(t);

			// ordering the structure of button and div
			div.appendChild(btn);
			return div;
		}
		function categorySafe(){
			var container = document.getElementById("watch-description-extras").children[0].children;
			console.log(container)
			for(var i = 0; i < container.length; i++){
				if(container[i].children[0].innerHTML.includes("Category")){
					container = document.getElementById("watch-description-extras").children[0].children[i].children[1].children[0].children[0].innerHTML;
					break;
				}
			}
			return container;
		}
		//stops video from playing
		function stopVideo() {
			var video = document.querySelector('video');
			if (video !== null && !(video.paused)) {
				console.log("Video found and is pausing");
				//check for category
				if(!(categorySafe().toString().includes("Education"))){
					video.pause();
					// creating the modal
						console.log(categorySafe());
					includeWarningMessage(categorySafe().toString());
				}
				clearInterval(videostopper);
			}
			if(video.paused){
				clearInterval(videostopper);
			}
		}
		//hides comment-section-renderer
		function hideContent(){
			var comments = document.getElementById("comment-section-renderer");
			var commentContainer = document.getElementById("watch-discussion");
			var commentBlocker = document.createElement('button');
			function showContent(){
				comments.style.display = "block";
				commentBlocker.remove();
			}
			commentBlocker.addEventListener('click',showContent);
			commentBlocker.className = 'comment-blocker';
			commentBlocker.innerHTML = "Reveal Comments";
			if(comments){
				comments.style.display = "none";
				//removes buttons before adding them
				removeCommentBlocker();
				commentContainer.appendChild(commentBlocker);
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
//removes modals that we have manually added
function removeModal(){
	for(var i = 0; i < document.getElementsByClassName('video-modal').length;i++){
		console.log("removed");
		document.getElementsByClassName('video-modal')[i].remove();
	}
}
//removes comment blockers we have manually added
function removeCommentBlocker(){
	for(var i = 0; i < document.getElementsByClassName('comment-blocker').length; i++){
		document.getElementsByClassName('comment-blocker')[i].remove();
	}
}


document.addEventListener("spfdone",loaded);
document.addEventListener("DOMContentLoaded", loaded);

