chrome.storage.sync.get('key',function(result){
		if(result.key == "true"){
			//add the code to execute here.
		}
});


document.addEventListener("spfdone", stopVideo);
document.addEventListener("DOMContentLoaded", stopVideo);
// document.addEventListener("spfdone", hideContent);
document.addEventListener("DOMContentLoaded", hideContent, false);
// var video = document.getElementsByClassName('player-api')[0];
//
// function pauseVid() {
//     video.pause();
// }
// var myPlayer = document.getElementById('player');
// function pauseVid() {
//     myPlayer.pause();
//     console.log("hi");
// }
// pauseVid();
// myPlayer.stopVideo();

function stopVideo() {
	var iframe = document.querySelector('iframe');
	var video = document.querySelector('video');
  console.log("video", video);
  console.log("iframe", iframe);
	if (iframe){
		var iframeSrc = iframe.src;
		iframe.src = iframeSrc;
	}
	if (video !== null) {
    console.log("reached11");
		video.pause();
    // fix it later.
	}
};
//
// document.querySelector('')
//
// stopVideo();
// document.querySelector('video').pause();
console.log("youtube_video.js");
function hideContent(){

  document.getElementById("comment-section-renderer-items").style.visibility = "hidden";
  // document.getElementById("comment-section-renderer-items").style.visibility = "hidden";
  // if(content !== null){
  //     content.style.visibility = "hidden";
  // }

}


var html = [
    '<div> A line</div>',
    '<div> Add more lines</div>',
    '<div> To the array as you need.</div>'
].join('');

var div = document.createElement('div');
    div.setAttribute('class', 'post block bc2');
    div.innerHTML = html;
    document.getElementById('comment-section-renderer')[0].appendChild(div);

// setTimeout(hideContent, 5000);
// .style.visibility = "hidden";
