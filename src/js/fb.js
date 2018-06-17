chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	includeWarningMessage();
});

function includeWarningMessage(){
	var topOfNewsFeed = document.querySelector("[id^=\"topnews_main_stream\"]");
	if(topOfNewsFeed !== null) {
		document.getElementById(topOfNewsFeed.id).style.visibility = "hidden";
		var modal = createModal();
		var contentArea = document.getElementById("stream_pagelet");
		contentArea.insertBefore(modal, document.getElementById(topOfNewsFeed.id));
	}
}

function createModal(){
	var modals = document.getElementsByClassName("modal");
	removeExistingModals(modals);
	var modal = document.createElement("div");

	modal.className = "modal";
	var facebookFeed = document.getElementById("pagelet_composer");
	var width = parseInt(window.getComputedStyle(facebookFeed).getPropertyValue("width")) - 6;
	modal.style.width = width + "px";

	var btn = document.createElement("button");
	btn.addEventListener("click", showContent);

	var header = document.createElement("h1");
	var header_txt = document.createTextNode("Do you have time to scroll?");
	var description = document.createElement("p");
	var quote = document.createTextNode(generateQuote());
	var btn_txt = document.createTextNode("Proceed");

	header.appendChild(header_txt);
	modal.appendChild(header);
	description.className = "quote";
	description.appendChild(quote);
	modal.appendChild(description);
	btn.appendChild(btn_txt);

	modal.appendChild(btn);
	return modal;
}

function showContent(){
	var modals = document.getElementsByClassName("modal");
	removeExistingModals(modals);
	document.querySelector("[id^=\"topnews_main_stream\"]").style.visibility ="visible";
}

// Backwards loop due to how the DOM is structured
function removeExistingModals(modals){
	for(var i = modals.length - 1; i >= 0; i--){
		modals[i].remove();
	}
}