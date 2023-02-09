import './css/styles.scss';
import * as bootstrap from 'bootstrap';
import * as logicManager from './logic-manager';
import * as domManager from './dom-manager';


const cityInput = document.querySelector('input[type=text]');
const unitSelector = document.querySelector('select');
const searchButton = document.querySelector('button');

unitSelector.addEventListener('change', selectHandler);
searchButton.addEventListener('click', clickHandler);


function clickHandler() {
    if (cityInput.value !== '') {
        getWeather(cityInput.value);
    } else {
        getWeather();
    }
}


function selectHandler() {
    getWeather();
}


async function getWeather(location, unit = unitSelector.value) {
    try {
        console.log(location, await logicManager.getWeatherData(location, unitSelector.value));
    } catch (error) {
        if (logicManager.getCurrentCity()) {
            console.log(logicManager.getCurrentCity(), await logicManager.getWeatherData(logicManager.getCurrentCity(), unitSelector.value));
        }
    }
}


// (async () => {console.log('bordeaux', await logicManager.getWeatherData('bordeaux', 'metric'));})();
// (async () => {console.log('New York', await logicManager.getWeatherData('new York', 'metric'));})();