function togglenav(){
    const activelistul = document.getElementById("navlinker").classList;
    activelistul.toggle("active");
}

async function showPosition(position){
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const apiUrl = `https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&forecast_days=1&latitude=${lat}&longitude=${long}`;
    const apiMapUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en&latitude=${lat}&longitude=${long}";
    const rep = await fetch(apiUrl);
    var data = await rep.json();
    console.log(data);
    const response = await fetch(apiMapUrl);
    var mapData = await response.json();
    console.log(mapData);
    document.querySelector(".cityname").innerHTML = mapData.city;
    document.querySelector(".humidity").innerHTML = (data.current.relative_humidity_2m+"%");
    document.querySelector(".wind").innerHTML = (data.current.wind_speed_10m+" km/h");
    document.querySelector(".temp").innerHTML = (data.current.temperature_2m+"°C");

}
async function checkWeather(){
    navigator.geolocation.getCurrentPosition(showPosition);
    const weatherIcon = document.querySelector(".weather-icon");
    if (data.current.weather_code == "0"){
        weatherIcon.src="img/weatherappimg/clear.png";
        document.querySelector(".weather-description").innerHTML = ("Clear");
    }
    else if(data.current.weather_code == (1||2||3)){
        weatherIcon.src="img/weatherappimg/mist.png";
        document.querySelector(".weather-description").innerHTML = ("Partly Cloudy");
    }
    else if(data.current.weather_code == (45||48)){
        weatherIcon.src="img/weatherappimg/clouds.png";
        document.querySelector(".weather-description").innerHTML = ("Cloudy");
    }
    else if(data.current.weather_code == (51||53||55||56||57)){
        weatherIcon.src="img/weatherappimg/drizzle.png";
        document.querySelector(".weather-description").innerHTML = ("Slight Rain/Drizzle");
    }
    else if(data.current.weather_code == (61||63||65||66||67||80||81||82||95||96||99)){
        weatherIcon.src="img/weatherappimg/rain.png";
        document.querySelector(".weather-description").innerHTML = ("Rain");
    }
    else if(data.current.weather_code == (71||73||75||77||85||86)){
        weatherIcon.src="img/weatherappimg/snow.png";
        document.querySelector(".weather-description").innerHTML = ("Snowy");
    }
}

