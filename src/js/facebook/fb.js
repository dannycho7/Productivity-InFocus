chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    loaded();
    console.log("URL CHANGED: " + request.data.url);
});

function loaded(){
	chrome.storage.sync.get('key',function(result){
		function includeWarningMessage(){
			var topOfNewsFeed = document.querySelector('[id^="topnews_main_stream"]');
			if(topOfNewsFeed !== null) {
		        document.getElementById(topOfNewsFeed.id).style.display = "none";
		        var div = createModal();
		        console.log(div);
		        var contentArea = document.getElementById('stream_pagelet');
		        contentArea.insertBefore(div, document.getElementById(topOfNewsFeed.id));
		    }
		}
		function createModal(){
			//remove any existing modals
			var modals = document.getElementsByClassName('modal');
			for(var i = 0; i < modals.length; i++){
				modals[i].remove();
			}
			// creating the modal div
			var div = document.createElement('div');
			// setting div attributes
			div.className = 'modal';
			var facebookFeed = document.getElementById('pagelet_composer');
			var width = parseInt(window.getComputedStyle(facebookFeed).getPropertyValue("width")) - 6;
			div.style.width = width + 'px';
			// creating the button
			var btn = document.createElement("button");
			function showContent(){
				var modals = document.getElementsByClassName("modal");
				for(var i = modals.length - 1; i >= 0; i--){
					modals[i].remove();
				}
				document.querySelector('[id^="topnews_main_stream"]').style.display ="block";
			}
			btn.addEventListener("click", showContent);
			// creating the header
			var header = document.createElement("h1");
			header.innerHTML = "Do you have time to scroll?";
			div.appendChild(header);
			var description = document.createElement("p");
			description.className = 'quote';
			description.innerHTML = generateQuote();
			div.appendChild(description)
			
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
			hideNewsFeed();
		}
		else{
			console.log(result.key);
		}
	});
}
