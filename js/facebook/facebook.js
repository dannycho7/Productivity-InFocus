console.log("hell11o");
function loaded(){
	console.log("hello");
	chrome.storage.sync.get('key',function(result){
		function includeWarningMessage(){
			console.log("hellero");
			var div = createModal();

			var topOfNewsFeed = document.querySelector('[id^="topnews_main_stream"]').id;
			if(topOfNewsFeed !== null) document.getElementById(topOfNewsFeed).style.display = "none";
			// var node = document.getElementById('movie_player')
			// node.insertBefore(div, node.firstChild);
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

loaded();
document.addEventListener("DOMContentLoaded", function(){console.log("finally reacched");});
