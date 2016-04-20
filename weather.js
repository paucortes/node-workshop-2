var prompt = require("prompt");
var request = require("request");
var unixTime = require("unix-timestamp");
var colors = require("colors");
var emoji = require('node-emoji');

prompt.start();

function weatherResult(callback) {
prompt.get(["location"], function(err1, result1) {
    var address = "https://maps.googleapis.com/maps/api/geocode/json?address=" + result1.location;
    request((address), function(err1, result2) {
        var parsed = JSON.parse(result2.body);
        var userLat = parsed.results[0].geometry.location.lat.toFixed(2);
        var userLon = parsed.results[0].geometry.location.lng.toFixed(2);
        
        var weatherAddress = "https://api.forecast.io/forecast/349b018e5c85ee5e64b69811152f65c3/" + userLat + "," + userLon;
        request((weatherAddress), function(err2, result3) {
            var parsedWeather = JSON.parse(result3.body);
            var resultingWeather = parsedWeather.daily;
            callback(resultingWeather);
        });
    });
});
}

weatherResult(function(res){
    var weeklyWeather = res;
    var farToCelsius = function(number) {
        return (number-32)*5/9;
    };
    for (var i = 0; i < weeklyWeather.data.length; i++) {
        var j = unixTime.toDate(weeklyWeather.data[i].time);
        console.log("Here is the weather for " + j.toString().substring(0,15).green.bold + ":");
        console.log("Summary of the day: " + weeklyWeather.data[i].summary.blue.bold);
        console.log("The minimum temperature will be " + farToCelsius(weeklyWeather.data[i].temperatureMin).toFixed(1).cyan.bold + "°C");
        console.log("The maximum temperature will be " + farToCelsius(weeklyWeather.data[i].temperatureMax).toFixed(1).bold.red + "°C");
        console.log("---------------------------------".bold.yellow);
    }
});