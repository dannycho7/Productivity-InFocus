function updateData(){
	chrome.storage.sync.get(
		['allTimeCount','videoCount','expiryTime'],
		function(result){			
			//reset count if a day has passed
			var d = new Date();
			if(result.videoCount == undefined || d > result.expiryTime){
				var expiryTime = new Date();
				expiryTime = parseInt(expiryTime.getTime()) + 86400000;
				console.log(expiryTime);
				var obj = {};
				obj['videoCount'] = 0;
				obj['expiryTime'] = expiryTime;
				chrome.storage.sync.set(obj,function(){ console.log("set vidCount and expiryTime"); })
			}
			//chart stuff
			var ctx = document.getElementById("myChart");
			var count = result.videoCount;
			var myChart = new Chart(ctx, {
			    type: 'line',
			    data: {
			        labels: ["Wednesday","Thursday", "Friday", "Saturday" ,"Sunday"],
			        datasets: [{
			            label: '# of Videos watched',
			            data: [21,15,13,11,count],
			            backgroundColor: "rgba(218,127,127,0.4)",
			            borderColor: "rgba(138,28,28,0.5)",
			            pointBackgroundColor: "rgb(138,28,28)"
			        }]
			    },
			    options: {
			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                }
			            }]
			        }
			    }
			});
		}
	);
}
document.addEventListener("DOMContentLoaded", function(){updateData(); setInterval(updateData,5000);});
