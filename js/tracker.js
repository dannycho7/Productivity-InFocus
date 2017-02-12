var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-91833017-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

var dates = [];

function getStartDate(){
  startDate = Date.getTime();
  dates.push(startDate);
}
alert("hi");
// when page is being exited
window.onbeforeunload = function (e) {
  var endDate = Date.getTime();
  var duration = endDate - dates[0];
  ga('send', 'timing', {
    'timingCategory': 'TimeOnPage',
    'timingVar': 'lookup',
    'timingValue': duration, // in milliseconds
    'timingLabel': "www.facebook.com"// insert url here
  });

}

document.addEventListener("DOMContentLoaded", getStartDate);
