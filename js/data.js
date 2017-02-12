function updateData(){
	chrome.storage.sync.get(
		['allTimeCount','videoCount','expiryTime'],
		function(result){			
			//reset count if a day has passed
			if(result.videoCount == undefined || d > result.expiryTime){
				var expiryTime = new Date();
				expiryTime = parseInt(expiryTime.getTime()) + 86400000;
				console.log(expiryTime);
				var obj = {};
				obj['videoCount'] = 0;
				obj['expiryTime'] = expiryTime;
				chrome.storage.sync.set(obj,function(){ console.log("set vidCount and expiryTime"); })
			}
			var data = document.getElementById('data');
			var d = new Date();
			d = result.expiryTime - d.getTime();
			data.innerHTML = "result all time "+result.allTimeCount + " result video count "+ result.videoCount + " result expiryTime " + result.expiryTime + " MS til expiration " + d;

			//chart stuff
			var ctx = document.getElementById("myChart");
			var count = result.videoCount;
			var myChart = new Chart(ctx, {
			    type: 'line',
			    data: {
			        labels: ["Thursday", "Friday", "Saturday" ,"Sunday"],
			        datasets: [{
			            label: '# of Votes',
			            data: [2,3,5,count],
			            backgroundColor: [
			                'rgba(123, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 159, 64, 0.2)',
			                'rgba(255, 99, 132, 0.2)'
			            ],
			            borderColor: [
			                'rgba(123,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			                'rgba(153, 102, 255, 1)',
			                'rgba(255, 159, 64, 1)',
			                'rgba(255, 99, 132, 1)'
			            ],
			            borderWidth: 1
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
document.addEventListener("DOMContentLoaded", updateData);
