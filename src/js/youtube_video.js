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
			div.parentNode.removeChild(div);
			document.querySelector('video').play();
			//send storage for # of youtube vids watched here
			chrome.storage.sync.get(null,
				function(result){
					//ParseData function:
					//returns the value at the key 
					//returns 0 if it is not set
					function parseData(key){
						var data = result[key];
						if(data == undefined){
							data = 0;
						}
						return data;
					}
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
		var t = document.createTextNode("Proceed");
		btn.appendChild(t);

		// ordering the structure of button and div
		div.appendChild(btn);
		return div;
	}
	function categorySafe(){
		var container = document.getElementById("watch-description-extras").children[0].children;
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
			if(!(categorySafe().toString().includes("Education")) && !(categorySafe().toString().includes("Science & Technology"))){
				video.pause();
				// creating the modal
				console.log(categorySafe());
				includeWarningMessage(categorySafe().toString());
			}
			clearInterval(videostopper);
		}
		if(video !== null && video.paused){
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

