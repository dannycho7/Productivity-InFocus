chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    loaded();
    console.log("URL CHANGED: " + request.data.url);
});

console.log("hell11o");
function loaded(){
	console.log("hello");
	chrome.storage.sync.get('key',function(result){
		function includeWarningMessage(){
			console.log("hellero");
			var topOfNewsFeed = document.querySelector('[id^="topnews_main_stream"]');
      console.log("parent node is ", document.getElementById(topOfNewsFeed.id).parentNode);
			if(topOfNewsFeed !== null) {
        document.getElementById(topOfNewsFeed.id).style.display = "none";
        var div = createModal();
        console.log(div);
        var contentArea = document.getElementById('stream_pagelet');
        // var beforeTopOfNewsFeed = document.getElementById('pagelet_composer')
  			// beforeTopOfNewsFeed.insertBefore(div, beforeTopOfNewsFeed.firstChild);
        contentArea.insertBefore(div, document.getElementById(topOfNewsFeed.id));
      }
			// var node = document.getElementById('movie_player')
			// node.insertBefore(div, node.firstChild);
		}

    function createModal(){
			// creating the modal div
			var div = document.createElement('div');
			// setting div attributes
			div.className = 'video-modal';
      var facebookFeed = document.getElementById('pagelet_composer');
      console.log("feed", facebookFeed);
      var width = window.getComputedStyle(facebookFeed).getPropertyValue("width");
      div.style.width = width;
			// creating the button
			var btn = document.createElement("button");
			btn.addEventListener("click", closeModal);
			// creating the header
			var header = document.createElement("h1");
			header.innerHTML = "Do you have time to scroll?";
			div.appendChild(header);
			var description = document.createElement("p");
			description.innerHTML = "Facebook feed will distract you from focusing!"
			div.appendChild(description)
			function closeModal() {
				console.log(div);
				div.parentNode.removeChild(div);
			}
			var t = document.createTextNode("Proceed");
			btn.appendChild(t);

			// ordering the structure of button and div
			div.appendChild(btn);
			return div;
		}
		//stops video from playing
		function hideNewsFeed() {
				console.log("News feed found and is hiding");
				// creating the modal
				includeWarningMessage();
		}
		if(result.key == "true"){
			console.log("reached result key=true");
			hideNewsFeed();
		}
		else{
			console.log(result.key);
		}
	});
}
