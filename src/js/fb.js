chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  hideNewsFeed();
});

function includeWarningMessage(){
  var topOfNewsFeed = document.querySelector('[id^="topnews_main_stream"]');
  if(topOfNewsFeed !== null) {
    document.getElementById(topOfNewsFeed.id).style.visibility = "hidden";
    var modal = createModal();
    var contentArea = document.getElementById('stream_pagelet');
    contentArea.insertBefore(modal, document.getElementById(topOfNewsFeed.id));
  }
}


function createModal(){
  //remove any existing modals
  var modals = document.getElementsByClassName('modal');
  for(var i = 0; i < modals.length; i++){
    modals[i].remove();
  }
  // creating the modal div
  var modal = document.createElement('div');
  // setting div attributes
  modal.className = 'modal';
  var facebookFeed = document.getElementById('pagelet_composer');
  var width = parseInt(window.getComputedStyle(facebookFeed).getPropertyValue("width")) - 6;
  modal.style.width = width + 'px';
  // creating the button
  var btn = document.createElement("button");
  btn.addEventListener("click", showContent);
  // creating the header
  var header = document.createElement("h1");
  header.innerHTML = "Do you have time to scroll?";
  modal.appendChild(header);
  var description = document.createElement("p");
  description.className = 'quote';
  description.innerHTML = generateQuote();
  modal.appendChild(description)

  var btn_txt = document.createTextNode("Proceed");
  btn.appendChild(btn_txt);

  // ordering the structure of button and div
  modal.appendChild(btn);
  return modal;
}

function showContent(){
  var modals = document.getElementsByClassName("modal");
  for(var i = modals.length - 1; i >= 0; i--){
    modals[i].remove();
  }
  document.querySelector('[id^="topnews_main_stream"]').style.visibility ="visible";
}

//stops video from playing
function hideNewsFeed() {
    console.log("News feed found and is hiding");
    // creating the modal
    includeWarningMessage();
}
