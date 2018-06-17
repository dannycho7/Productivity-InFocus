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
function getStringDay(dayIndex){
	var weekday = ["Sunday","Monday","Tuesday","Wednesday", "Thursday","Friday","Saturday"];
	if(dayIndex < 0){
		dayIndex += 7;
	}
	return weekday[dayIndex];
}
function drawChart() {
	chrome.storage.sync.get(null, function(result) {
		var dayIndex = (new Date()).getDay();
		new Chart(document.getElementById("myChart"), {
			type: "line",
			data: {
				labels: (new Array(5)).fill(0).map((v, i) => getStringDay(dayIndex - 4 + i)),
				datasets: [{
					label: "# of Videos watched",
					data: (new Array(5)).fill(0).map((v, i) => result[formatToday(4 - i)] || 0),
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

		var radarData = {
			labels: (new Array(7)).fill(0).map((v, i) => getStringDay(dayIndex - 6 + i)),
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
					data: (new Array(7)).fill(0).map((v, i) => result[formatToday(6 - i)] || 0)
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
					data: (new Array(7)).fill(0).map((v, i) => result[formatToday(13 - i)] || 0)
				}
			]
		};

		new Chart(document.getElementById("radarChart"), {
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
	});
}

chrome.tabs.onActivated.addListener(drawChart);
document.addEventListener("DOMContentLoaded", drawChart);
