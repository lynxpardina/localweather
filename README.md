# Local Weather

A simple project to show the local weather at your actual position.


## Description

The app uses the navigator.geolocation and two api queries to gather local information about your position and display the local weather conditions. If navigator.geolocation is not available it uses an api query to try to locate your position but the api query in a mobile network is not accurate at all due to the incorrect assignment of the location to the ip's provided by the carriers.

Clicking on temperature changes between Celsius and Fahrenheit, saving in localstorage the chosen value for later reference.

Background images and background color of temperature's rectangle changes depending of the value of it. For <10  blue tones, >=10 & <25 green tones, and >25 red tones

## App

You can find this one at this places:
- http://codepen.io/lynxpardina/full/gpVxyp/
- http://s.codepen.io/lynxpardina/debug/gpVxyp

## Resources

- jQuery, http://jquery.com/
- Weather Icons, https://erikflowers.github.io/weather-icons/
- Location api, http://ip-api.com
- Weather api, http://api.openweathermap.org
- Font source, https://www.google.com/fonts
