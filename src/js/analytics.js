function getStringDay(numday){
	var weekday = ["Sunday","Monday","Tuesday","Wednesday", "Thursday","Friday","Saturday","Sunday"];
	if(numday < 0){
		numday += 7;
	}
	return weekday[numday];
}
function addChart(){
	chrome.storage.sync.get(
		['allTimeCount','videoCount','expiryTime'],
		function(result){
			var date = new Date();
			console.log(getStringDay(date.getDay()));
			var numday = date.getDay();
			//chart stuff
			var ctx = document.getElementById("myChart");
			var count = result.videoCount;
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
				labels: [getStringDay(numday-4), getStringDay(numday-3), getStringDay(numday-2), getStringDay(numday-1), getStringDay(numday)],
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
				labels: [getStringDay(numday-6), getStringDay(numday-5), getStringDay(numday-4), getStringDay(numday-3), getStringDay(numday-2), getStringDay(numday-1), getStringDay(numday)],
				datasets: [
				{
				label: "Current week ",
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				backgroundColor: "rgba(80, 244, 66, 0.4)",
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
	);
}

chrome.tabs.onActivated.addListener(function(){addChart();})
document.addEventListener("DOMContentLoaded", function(){addChart();});
