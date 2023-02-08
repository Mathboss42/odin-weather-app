import './styles.css';
import * as logicManager from './logic-manager';
import * as domManager from './dom-manager';


const cityInput = document.querySelector('input[type=text]');
const unitSelector = document.querySelector('select');
const searchButton = document.querySelector('button');

unitSelector.addEventListener('change', selectHandler);
searchButton.addEventListener('click', clickHandler);


const defaultCity = 'New York';  
let currentCity;


function clickHandler() {
    if (cityInput.value !== '') {
        currentCity = cityInput.value;
        getWeather(cityInput.value);
    } else {
        getWeather();
    }
}


function selectHandler() {
    getWeather(currentCity);
}


async function getWeather(location = defaultCity, unit = unitSelector.value) {
    console.log(location, await logicManager.getWeatherData(location, unitSelector.value));
}


// (async () => {console.log('bordeaux', await logicManager.getWeatherData('bordeaux', 'metric'));})();
// (async () => {console.log('New York', await logicManager.getWeatherData('new York', 'metric'));})();