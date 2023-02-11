import { format } from "date-fns";



let currentCity;
let defaultCity = 'New York';


export function getCurrentCity() {
    return currentCity;
}


export async function getWeatherData(location, unit) {
    try {
        checkLocation(location);
        const rawData = await hitAPI(location, unit);
        console.log(rawData);
        const processedData = processWeatherData(rawData);
        currentCity = processedData.city;
        return processedData;
    } catch {
        return Promise.reject();
    }
}


function checkLocation(location) {
    if (location == undefined && !currentCity) {
        currentCity = defaultCity;
    }
}


async function hitAPI(location = currentCity, unit) {
    try {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=${unit}`;
        
        const data = await fetch(url).then(function (response) {
            if (!response.ok) {
                alert(`Could not find ${location}`);
                throw new Error("Not 2xx response", {cause: response});
            } else {
                return response;
            }
        }).catch(function(err) {
            console.log(err);
        });
        const result = await data.json();
        return result;       
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
}


function processWeatherData(dataObject) {
    const processedData = {
        city: dataObject.name,
        country: convertCountry(dataObject.sys.country),
        time: convertTime(dataObject.timezone),
        weather: {
            description: matchWeatherDesc(dataObject.weather[0].main),
            temperature: Math.floor(dataObject.main.temp),
            humidity: Math.floor(dataObject.main.humidity),
            wind: Math.floor(convertSpeed(dataObject.wind.speed)),
        }
    };
    
    return processedData;
}


function convertTime(offset) {
    const localTime = new Date((new Date().getTime())+offset*1000);
    return format(localTime, 'eeee p');
}


function convertCountry(countryCode) {
    const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    return regionNames.of(countryCode); 
}


function convertSpeed(speed) {
    return speed * 3.6;
}


function matchWeatherDesc(desc) {
    switch (desc) {
        case 'clear sky':
        case 'Clear':
        case 'few clouds':
            return 'Sunny';
        case 'scattered clouds':
        case 'Clouds':
        case 'broken clouds':
            return 'Cloudy';
        case 'light rain':
        case 'shower rain':
        case 'rain':
        case 'Rain':
            return 'Rainy';
        case 'thunderstorm':
        case 'Thunderstorm':
        case 'Storm':
            return 'Thunderstorm';
        case 'snow':
        case 'Snow':
            return 'Snowy';
        case 'mist':
        case 'Mist':
            return 'Misty';
    }
}