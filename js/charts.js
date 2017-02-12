var ctx = document.getElementById("myChart");
var x = 6;
var stats = [1,2,3,4,5,x];
var radarOptions = {
  scaleBackdropColor : "rgba(255,255,255,0.75)",
}

var radarData = {
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
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
            data: [65, 59, 90, 81, 56, 55, 40]
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
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
};

var ctx = document.getElementById("radarChart").getContext("2d");

// Create the Radar Chart
var myRadarChart = new Chart(ctx, {
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
// var myChart = new Chart(ctx, {
// 	type: 'line',
// 	data: {
// 			labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
// 			datasets: [{
// 					label: '# of Votes',
// 					data: stats,
// 					backgroundColor: [
// 							'rgba(255, 99, 132, 0.2)',
// 							'rgba(54, 162, 235, 0.2)',
// 							'rgba(255, 206, 86, 0.2)',
// 							'rgba(75, 192, 192, 0.2)',
// 							'rgba(153, 102, 255, 0.2)',
// 							'rgba(255, 159, 64, 0.2)'
// 					],
// 					borderColor: [
// 							'rgba(255,99,132,1)',
// 							'rgba(54, 162, 235, 1)',
// 							'rgba(255, 206, 86, 1)',
// 							'rgba(75, 192, 192, 1)',
// 							'rgba(153, 102, 255, 1)',
// 							'rgba(255, 159, 64, 1)'
// 					],
// 					borderWidth: 1
// 			}]
// 	},
// 	options: {
// 			scales: {
// 					yAxes: [{
// 							ticks: {
// 									beginAtZero:true
// 							}
// 					}]
// 			}
// 	}
// });
