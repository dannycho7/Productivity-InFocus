function getStringDay(numday){
	var weekday = ["Sunday","Monday","Tuesday","Thursday","Friday","Saturday","Sunday"];
	return weekday[numday];
}
function addChart(result,date){
	console.log(getStringDay(date.getDay()));
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
	}); // end myChart

	var radarCtx = document.getElementById("radarChart");
	var radarData = {
	    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
	    datasets: [
	        {
	            label: "Current week ",
	            fillColor : "rgba(220,220,220,0.5)",
	            strokeColor : "rgba(220,220,220,1)",
	            backgroundColor: "rgba(80, 244, 66, 0.4)",
	            // borderColor: "rgba(179,181,198,1)",
	            pointBackgroundColor: "rgba(66, 244, 95, 0.8)",
	            borderColor: "rgba(80, 244, 66, 0.6)",
	            pointHoverBackgroundColor: "rgba(66, 244, 95, 0.8)",
	            pointHoverBorderColor: "rgba(255, 255, 255, 1)",
	            data: [65, 59, 90, 81, 56, 55, count]
	        },
	        {
	            label: "Last week",
	            fillColor : "rgba(151,187,205,0.5)",
				      strokeColor : "rgba(151,187,205,1)",
	            backgroundColor: "rgba(66, 122, 244 , 0.4)",
	            // borderColor: "rgba(255,99,132,1)",
	            pointBackgroundColor: "rgba(66, 134, 244, 0.8)",
	            borderColor: "rgba(66, 122, 244 , 0.6)",
	            pointHoverBackgroundColor: "rgba(66, 134, 244, 0.8)",
	            pointHoverBorderColor: "rgba(255, 255, 255, 1)",
	            data: [28, 48, 40, 19, 96, 27, 60]
	        }
	    ]
	}; // end data
	var myRadarChart = new Chart(radarCtx, {
	    type: "radar",
	    data: radarData,
	    options: {
	            scale: {
	                reverse: true,
	                ticks: {
	                    beginAtZero: true
	                }
	            }
	    }
	});
}

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
				chrome.storage.sync.set(obj,function(){ console.log("set vidCount and expiryTime");})
				chrome.storage.sync.get(['videoCount'],function(result){ addChart(result,d); })
			}
			else{
				addChart(result,d);
			}
		}
	);
}
chrome.tabs.onActivated.addListener(function(){updateData();})
document.addEventListener("DOMContentLoaded", function(){updateData();});
