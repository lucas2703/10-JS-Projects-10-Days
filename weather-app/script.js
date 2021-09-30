const APILOCATIONSEARCH = "https://www.metaweather.com/api/location/search/?query=";
const APIGETWEATHER = "https://www.metaweather.com/api/location/";
const APIWEATHERICONS = "https://www.metaweather.com/static/img/weather/";
const searchBar = document.getElementById('search-bar');
const sunsetUnit = document.getElementById('sunset-unit');
const sunriseUnit = document.getElementById('sunrise-unit');
const windUnit = document.getElementById('wind-unit');
const humidityUnit = document.getElementById('humidity-unit');
const highUnit = document.getElementById('high-unit');
const lowUnit = document.getElementById('low-unit');
const locationLabel = document.getElementById('location');
const dateLabel = document.getElementById('date');
const tempNow = document.getElementById('temp-now');
const weatherNowImg = document.getElementById('weather-now-img');
const weatherForecast = document.getElementById('weather-forecast');
const searchButton = document.getElementById('search-btn');
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

searchButton.addEventListener('click', async function() {
    var location = searchBar.value;
    displayWeatherHUB(location);
})

searchBar.addEventListener('keypress', async function(e) {
    if (e.key != 'Enter')
    {
        return;
    }
    var location = searchBar.value;
    displayWeatherHUB(location);
})

async function getLocationID(location)
{
    var query = APILOCATIONSEARCH + location;
    var resp = await fetch(query);
    var respData = await resp.json();
    return respData[0].woeid;
}

async function getWeatherByLocationID(locationID)
{
    var query = APIGETWEATHER + locationID;
    var resp = await fetch(query);
    var respData = await resp.json();
    return respData;
}

async function getWeather(location)
{   
    try
    {
        var locationID = await getLocationID(location);
    }
    catch (e)
    {
        return 'Invalid'
    }
    var locationWeather = await getWeatherByLocationID(locationID);
    return locationWeather;
}


function displayWeather(weather)
{
    // display all units on RHS of app
    // high temp of the day
    var high = String(weather.consolidated_weather[0].max_temp);
    highUnit.innerHTML = `${Math.round(high)}°`

    // low temp of the day
    var low = String(weather.consolidated_weather[0].min_temp);
    lowUnit.innerHTML = `${Math.round(low)}°`

    // humidity
    var humidity = String(weather.consolidated_weather[0].humidity);
    humidityUnit.innerHTML = `${humidity.split('.')[0]}%`;

    // wind
    var windSpeed = String(weather.consolidated_weather[0].wind_speed);
    windSpeed = windSpeed.split('.')
    windUnit.innerHTML = `${windSpeed[0]}.${windSpeed[1][0]} mph`;

    // sunrise
    var sunrise = String(weather.sun_rise);
    sunrise = filterTime(sunrise);
    sunriseUnit.innerHTML = `${sunrise} am`;

    // sunset 
    var sunset = String(weather.sun_set);
    sunset = filterTime(sunset);
    sunsetUnit.innerHTML = `${sunset} pm`;

    // display weather LHS
    weatherNowImg.src = APIWEATHERICONS + weather.consolidated_weather[0].weather_state_abbr + '.svg';
    weatherForecast.innerHTML = weather.consolidated_weather[0].weather_state_name;
    tempNow.innerHTML = `${Math.round(weather.consolidated_weather[0].the_temp)}°`;
}   

function displayLocationInfo(weather)
{
    locationLabel.innerHTML = weather.title;
    var date = '';
    var today = new Date();
    today = String(today).split(' ');
    for (let i = 0; i < 7; i++)
    {
        if (today[0].substring(0, 2) == daysOfTheWeek[i].substring(0, 2))
        {
            date = date.concat(daysOfTheWeek[i]).concat(' ');
        }
    }

    date = date.concat(today[2]);

    for (let i = 0; i < 12; i++)
    {
        if (today[1].substring(0, 2) == monthsOfTheYear[i].substring(0, 2))
        {
            date = date.concat(` ${monthsOfTheYear[i]}`);
        }
    }

    dateLabel.innerHTML = date;
}

function filterTime(time)
{
    // filtering time from API (e.g."2021-09-30T06:59:43.645113+01:00")
    time = time.split('T')[1].split('+')[0].split('.')[0].substring(0, 5);
    if (parseInt(time.split(':')[0]) > 12)
    {
        var hours = parseInt(time.split(':')[0]) - 12
        time = String(hours).concat(':').concat(time.split(':')[1]);
    }
    // for am
    if (time[0] == '0')
    {
        time = time.substring(1, 5);
    }
    return time
}

function displayFiveDayForecast(weather)
{
    for (let i = 1; i < 6; i++)
    {
        var data =  weather.consolidated_weather[i];
        // which "tomorrow" we are working on e.g. tomorrow3
        var day = "tomorrow".concat(String(i));
        var ele = document.getElementById(day);
        var d = new Date(data.applicable_date);
        var dayOfWeek = d.getDay()
        ele.innerHTML = `
            <span class="day">${daysOfTheWeek[dayOfWeek]}</span>
            <img src="${APIWEATHERICONS + data.weather_state_abbr + '.svg'}">
            ${Math.round(data.the_temp)}°
        `;
    }
}

async function displayWeatherHUB(location)
{
    // initialise values for London
    var weather = await getWeather(location);
    if (weather == 'Invalid')
    {
        alert('Invalid location, please try again.');
        return
    }
    // display weather vals
    displayWeather(weather);
    displayLocationInfo(weather);
    displayFiveDayForecast(weather);
}

// initialise app to London
displayWeatherHUB("London");