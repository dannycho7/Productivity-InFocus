chrome.storage.sync.get('key',function(result){
		if(result.key == "true"){
			console.log("result key is true");
			//add the code to execute here.
		}
});

function stopVideo() {
	var iframe = document.querySelector('iframe');
	var video = document.querySelector('video');
	console.log("video", video);
	if (video !== null) {
		console.log("reached11");
		video.pause();
	}
};

function hideContent(){
  document.getElementById("comment-section-renderer-items").style.visibility = "hidden";
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
