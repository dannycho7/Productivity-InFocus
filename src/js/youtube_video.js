chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
		console.log("received message");
		removeModal();
		removeCommentBlocker();
		loaded();
});

function loaded(){
	//remove all modals that exist in the beginning of each video request
	removeModal();
	hideContent();
	stopVideo();
}

function includeWarningMessage(category){
	removeModal();
	var modal = createModal(category);
	var node = document.getElementById('movie_player')
	node.insertBefore(modal, node.firstChild);
}

function createModal(category){
	// creating the modal
	var modal = document.createElement('div');
	// setting modal attributes
	modal.className = 'video-modal';
	// creating the button
	var btn = document.createElement("button");
	btn.addEventListener("click", function(){ closeModal(modal) });
	// creating the header
	var header = document.createElement("h1");
	header.innerHTML = "Do you have time to watch this?";
	modal.appendChild(header);
	// Description of modal
	var description = document.createElement("p");
	description.innerHTML = category + " videos will distract you from focusing!"
	modal.appendChild(description)

	var t = document.createTextNode("Proceed");
	btn.appendChild(t);

	// ordering the structure of button and modal
	modal.appendChild(btn);
	return modal;
}

function closeModal(modal) {
	modal.parentNode.removeChild(modal); // removes the modal from the DOM
	document.querySelector('video').play();
	//send storage for # of youtube vids watched here
	chrome.storage.sync.get(null, function(result){
			var total = parseInt(result.allTimeCount);
			var current = parseData(formatToday(0));
			if(total == undefined){
				total = 0;
			}
			else{
				total++;
			}
			if(current == undefined){
				current = 1;
			}
			else{
				current++;
			}
			var obj = {};
			obj[formatToday(0)] = current;
			obj['allTimeCount'] = total;
			chrome.storage.sync.set(obj,function(){ console.log("incremented count"); })
		}
	);
}

function categorySafe(){
	var container = document.getElementById("watch-description-extras");
	if(container != null || container != undefined){
		var container = document.getElementById("watch-description-extras").children[0].children;
		for(var i = 0; i < container.length; i++){
			if(container[i].children[0].innerHTML.includes("Category")){
				container = document.getElementById("watch-description-extras").children[0].children[i].children[1].children[0].children[0].innerHTML;
				if((container.toString().includes("Education")) || (container.toString().includes("Science")) && (container.toString().includes("Tech")))
				{
					return "safe";
				}
				else{
					return container.toString();
				}
			}
		}
	}
	return "YouTube";

}

//stops video from playing
function stopVideo() {
	var videostopper = window.setInterval(function(){
		chrome.storage.sync.get('key', function(result){
			if(result.key != "true"){
				clearInterval(videostopper);
			}
		});
		var video = document.querySelector('video');
		if (video != null) {
			//check for category
			if(categorySafe() != "safe") {
				video.pause();
				// creating the modal
				includeWarningMessage(categorySafe());
			}
			if(video.paused == true) {
				console.log(video, video.paused);
				clearInterval(videostopper);
			}
		}
	}, 1000);

}

//hides comment-section-renderer
function hideContent(){
	var commenthide = window.setInterval(function(){
		chrome.storage.sync.get('key', function(result){
			if(result.key != "true"){
				clearInterval(commenthide);
			}
		});
		var video = document.querySelector('video');
		if(video && categorySafe() != "safe"){
			var comments = document.getElementById("comment-section-renderer");
			var commentsNewContainer = document.getElementById("comments");
			if (commentsNewContainer){
				var commentsNew = commentsNewContainer.children[0];
			}
			var commentContainer = document.getElementById("watch-discussion");
			var commentBlocker = document.createElement('button');

			commentBlocker.addEventListener('click', function(){ showContent(comments, commentsNew, commentBlocker) });
			commentBlocker.className = 'comment-blocker';
			commentBlocker.innerHTML = "Reveal Comments";
			if(comments){
				comments.style.display = "none";
				//removes buttons before adding them
				removeCommentBlocker();
				commentContainer.appendChild(commentBlocker);
				clearInterval(commenthide);
				//append an element that prompts user if they want to continue
			} else if (commentsNew) {
				commentsNew.style.display = "none";
				removeCommentBlocker();
				commentsNewContainer.appendChild(commentBlocker);
				clearInterval(commenthide);
			}
		}
	}, 1000);

}

//removes modals that we have manually added
function removeModal(){
	var amt = document.getElementsByClassName('video-modal').length;
	for(var i = amt - 1; i >= 0 ; i--){
		document.getElementsByClassName('video-modal')[i].remove();
	}
}
//removes comment blockers we have manually added
function removeCommentBlocker(){
	var amt = document.getElementsByClassName('comment-blocker').length;
	for(var i = amt - 1 ; i  >= 0 ; i--){
		document.getElementsByClassName('comment-blocker')[i].remove();
	}
}

function showContent(comments, commentsNew, commentBlocker){
	if(comments) {
		comments.style.display = "block";
	} else if (commentsNew) {
		commentsNew.style.display = "block";
	}
	commentBlocker.remove();
}

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}
//num is a parameter that should be set to 0 if you want today's date
//setting it higher will go back num number of days
//assume that num is less than 15
function formatToday(num){
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate() - num;
	var year = dateObj.getUTCFullYear();
	if(day <= 0){
		if(month == 1){
			//you go back one year
			month = 12;
			year--;
			day = daysInMonth(month,year); //sets the day to number of days in the previous month
		}
		else{
			month--;
			day += daysInMonth(month, year); //sets the day to number of days in the previous month
		}
	}
	return "" + year + month + day;
}

//ParseData function:
//returns the value at the key
//returns 0 if it is not set
//result object is the result from chrome storage
function parseData(result, key){
	var data = result[key];
	if(data == undefined){
		data = 0;
	}
	return data;
}
