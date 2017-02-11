var toggler = document.getElementById("toggler");
var ontxt = "Pause LookFWD"
var offtxt = "Unpause LookFWD"
function toggle(){
	chrome.storage.sync.get('key',function(result){
		console.log("toggle function key val is " + result.key);
		if(result.key == "false"){
			chrome.storage.sync.set({
				'key': "true"
				},function(){
					toggler.innerHTML = ontxt; //Text to displayed after LookFWD has been turned on
				}
			);
		}
		else{
			chrome.storage.sync.set({
				'key': "false"
				},function(){
					toggler.innerHTML = offtxt;//Text to be displayed after LookFWD has been turned off
				}
			);
		}
	});
}

function restore_options(){
	chrome.storage.sync.get('key',function(result){
		if(result.key == "true"){
			toggler.innerHTML = ontxt; //Text to displayed after LookFWD has been turned on
		}
		else{
			toggler.innerHTML = offtxt;//Text to be displayed after LookFWD has been turned off

		}
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
toggler.addEventListener('click',function(){
	toggle();
});