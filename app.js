let long = "",
lat = "",
Celcius = false,
btn = document.getElementById('btn'),
forecast = document.getElementById('forecast'),
city = document.getElementById('city'),
state = document.getElementById('state'),
zipcode = document.getElementById('zipcode'),
icon = document.getElementById('icon'),
temp = document.getElementById('currentTemp'),
toggle = document.getElementById('toggle'),
weather = "",
temperature = "";



window.addEventListener("load", function() {
let geoUrl = "https://freegeoip.net/json/";
fetch(geoUrl)
.then(handleErrors)
.then(function(geoRequest){
    return geoRequest.json();
}).then(function(geoRequest){
    console.log(geoRequest) 
    long = geoRequest.longitude;
    lat = geoRequest.latitude;
    city.innerHTML = (geoRequest.city);
    state.innerHTML = (geoRequest.region_name);
    zipcode.innerHTML = (geoRequest.zip_code);
    //console.log(long + " " + lat);
}).then(function(){
  fetch("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long)
  .then(function(temperatureRequest){
  return temperatureRequest.json()
}).then(function(temperaturedata){
    console.log(temperaturedata);
    temperature = temperaturedata.main.temp;
    weather = temperaturedata.weather[0].main;
    temp.innerHTML = ((temperature * 1.8 + 32).toFixed(0) + " F&deg;");
    forecast.innerHTML = (temperaturedata.weather[0].description);
    icon.src = (temperaturedata.weather[0].icon);
    setBackground(temperaturedata.weather[0].main);

}).catch(function(error){
    console.log(error);
     }) 
  })
})

function handleErrors(request){
if(!request.ok){
  throw Error(request.status);
}
return request;
}

toggle.addEventListener("click", function(){
  Celcius=!Celcius;
  if(Celcius===false) {
    currentTemp.innerHTML = (Math.round(temperature * 1.8 + 32)  + " F&deg;");
    } else {
    currentTemp.innerHTML = temperature.toFixed(2) + " C&deg;";
    }
})

function setBackground(weather) {
    switch (weather) {
        case 'Clouds':
        case 'Mostly Cloudy':  
        case 'Partly Cloudy':
        document.body.style.backgroundImage = "url('https://images.pexels.com/photos/5230/road-fog-foggy-mist.jpg?w=1260&h=750&auto=compress&cs=tinysrgb')";
        break;
        case 'Rain':
        case 'Mist':
        case 'Cloudy with Light Rain':
        document.body.style.backgroundImage = "url('https://images.pexels.com/photos/17739/pexels-photo.jpg?w=1260&h=750&auto=compress&cs=tinysrgb')";
        break;
        case 'Sunny':
        document.body.style.backgroundImage = "url('https://images.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg?w=1260&h=750&auto=compress&cs=tinysrgb')";
        break;
        case 'Mostly Sunny':
        document.body.style.backgroundImage = "url('https://images.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg?w=1260&h=750&auto=compress&cs=tinysrgb')";
        break;
        case 'Clear':
        document.body.style.backgroundImage = "url('https://images.pexels.com/photos/57645/pexels-photo-57645.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb')";
        break;
        }
     };