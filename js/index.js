$(document).ready(function () {

var lat,
    lon,
    city,
    firefoxTimeLimit;
    // geo_options = {
    //   maximumAge: 300000,
    //   timeout: 7000,
    //   enableHighAccuracy: true
    // };

// This timeout solves the error of Firefox not calling the callback function when the user denies access to navigator.geolocation

var firefoxTimeLimit=setTimeout(getLocationByApi, 5000);

getLocation();

$("#temp").click(function(){
  var t = $(".temp").html();

  if (localStorage["userDegrees"] === "F"){
     localStorage["userDegrees"]="C";
     $(".temp").html(Math.round((t-32)/1.8)); // conversion F to C
     $(".tempIcon").html(" <i class='wi wi-celsius'></i>");
  } else{
    localStorage["userDegrees"]="F";
    $(".temp").html(Math.round(t*1.8+32)); // conversion C to F
    $(".tempIcon").html(" <i class='wi wi-fahrenheit'></i>");
  }
})

function getLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      clearTimeout(firefoxTimeLimit);
      lat=position.coords.latitude;
      lon=position.coords.longitude;
      getWeather(lat,lon);
  //   },getLocationByApi,geo_options);
    },getLocationByApi);
  }else{
    getLocationByApi();
  }
}

function getLocationByApi(){
  clearTimeout(firefoxTimeLimit);
    //using ip-api.com (at least in Spain, returns city)
    $.get("http://ip-api.com/json", function (location){

    lat=location.lat;
    lon=location.lon;
    if (location.city !== undefined){
      city=location.city;
    }
    getWeather(lat, lon);

    },"jsonp"); //end $.get
}

function getWeather(lat, lon){
  //using openweathermap.org
  var url= "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=23488743c00ea56f5e6b5c302fa3cdc7";
  $.get(url, function(weather){

     console.log(weather);

     var userDegrees = localStorage["userDegrees"] || "C";

     if (weather.name !== undefined){
       $(".city").html(weather.name);
     } else if (city !==undefined){
       $(".city").html(city);
     }else {
       $(".city").html("Latitude: "+lat+" Longitude: "+ lon);
     }

     var actualTemperature=Math.round(weather.main.temp);

     if (actualTemperature>25){
       var red=Math.round((actualTemperature-25)*5.7+50);
       if (red > 255) red=255;
        $("#temp").css("background", "rgba("+red+",0,0,0.5)");
        $("#container").css("background-image", "url('https://dl.dropboxusercontent.com/u/49268757/1024_hot.jpg')");
     }else if (actualTemperature<10){
       var blue=Math.round((40+actualTemperature)*2+50);
        $("#temp").css("background", "rgba(0,0,"+blue+",0.5)");
        $("#container").css("background-image", "url('https://dl.dropboxusercontent.com/u/49268757/1024_cold.jpg')");
     }else{
       var green=Math.round((actualTemperature-10)*13.333+50);
       console.log(green);
        $("#temp").css("background", "rgba(0,"+green+",0,0.5)");
        $("#container").css("background-image", 'url("https://dl.dropboxusercontent.com/u/49268757/1024_normal.jpg")');
     }

     if (userDegrees==="C"){
       $(".temp").html(actualTemperature);
       $(".tempIcon").html(" <i class='wi wi-celsius'></i>");
     }else{
       $(".temp").html(Math.round(weather.main.temp*1.8+32));
       $(".tempIcon").html(" <i class='wi wi-fahrenheit'></i>");
     }

     if (weather.weather[0].icon !== undefined){
       $(".weatherIcon").html("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");
     }

     $(".weather").html(weather.weather[0].description);
     $(".humidity").html(weather.main.humidity);
     if (weather.wind.speed !== undefined){
       $(".wind").html(weather.wind.speed);
     } else{
       $(".wind").html(weather.wind.speed+" Unknown");
     }
     $(".windDirection").html(windDirection(weather.wind.deg));

  }, "jsonp");
};

function windDirection(deg) {
    var rose = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE','SE', 'SSE', 'S', 'SSW','SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    if (deg !== undefined){
      var direction = Math.floor(deg/22.5);
      return rose[direction];
    }else return " ";
}



}); //end document


/*
current weather:

"http://api.openweathermap.org/data/2.5/weather?lat=40.9688&lon=-5.6639&units=metric"

returns:

{"coord":{"lon":-5.65,"lat":40.97},
 "weather":[{"id":800,
              "main":"Clear",
              "description":"Sky is Clear",
              "icon":"01n"}],
 "base":"stations",
 "main":{"temp":21.51,"pressure":1019,"humidity":68,"temp_min":19,"temp_max":22.78},
 "visibility":10000,
 "wind":{"speed":0.5},
 "clouds":{"all":0},
 "dt":1440535612,
 "sys":{"type":1,
        "id":5498,"message":0.0083,"country":"ES",
        "sunrise":1440481368,"sunset":1440529532},
        "id":3111108,"name":"Salamanca","cod":200}


*/

/*
// api ipinfo.io

  $.get("http://ipinfo.io", function(response) {
    //doesn't return city for my location in Spain, nor the correct lat, lon
  $('.uno').html("ip: "+response.ip +
                 "<br>city: "+ response.city +
                 "<br>loc: "+ response.loc+
                 "<br>Country: "+response.country+
                 "<br>Region: "+response.region);
  }, "jsonp");
*/
