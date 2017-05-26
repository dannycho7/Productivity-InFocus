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
function getStringDay(numday){
	var weekday = ["Sunday","Monday","Tuesday","Wednesday", "Thursday","Friday","Saturday","Sunday"];
	if(numday < 0){
		numday += 7;
	}
	return weekday[numday];
}
function addChart(){
	chrome.storage.sync.get(null,
		function(result){
			//ParseData
			//returns the value at the key 
			//returns 0 if it is not set
			function parseData(key){
				var data = result[key];
				if(data == undefined){
					data = 0;
				}
				return data;
			}
			var date = new Date();
			var numday = date.getDay();
			//chart stuff
			var ctx = document.getElementById("myChart");
			var count = result.videoCount;
			var myChart = new Chart(ctx, {
				type: "line",
				data: {
					labels: [getStringDay(numday-4), getStringDay(numday-3), getStringDay(numday-2), getStringDay(numday-1), getStringDay(numday)],
					datasets: [{
						label: "# of Videos watched",
						data: [parseData(formatToday(4)),parseData(formatToday(3)), parseData(formatToday(2)), parseData(formatToday(1)),parseData(formatToday(0))],
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
						data: [parseData(formatToday(6)), parseData(formatToday(5)), parseData(formatToday(4)), parseData(formatToday(3)), parseData(formatToday(2)), parseData(formatToday(1)), parseData(formatToday(0))]
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
						data: [parseData(formatToday(13)), parseData(formatToday(12)), parseData(formatToday(11)), parseData(formatToday(10)), parseData(formatToday(9)), parseData(formatToday(8)), parseData(formatToday(7))]
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

chrome.tabs.onActivated.addListener(function(){addChart();});
document.addEventListener("DOMContentLoaded", function(){addChart();});
