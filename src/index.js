import './css/styles.scss';
import * as bootstrap from 'bootstrap';
import * as logicManager from './logic-manager';
import * as domManager from './dom-manager';

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


const formSelector = document.querySelector('form');
const cityInput = document.querySelector('input[type=text]');
const unitSelector = document.querySelector('select');
const searchButton = document.querySelector('button');

unitSelector.addEventListener('change', selectHandler);
searchButton.addEventListener('click', clickHandler);


function clickHandler(e) {
    e.preventDefault();
    if (cityInput.value !== '') {
        getWeather(cityInput.value);
        formSelector.reset();
    } else {
        getWeather();
        formSelector.reset();
    }
}


function selectHandler() {
    getWeather();
    formSelector.reset();
}


async function getWeather(location, unit = unitSelector.value) {
    try {
        console.log(location, await logicManager.getWeatherData(location, unitSelector.value));
        domManager.toggleLoading();
        const data = await logicManager.getWeatherData(location, unit);
        domManager.toggleLoading();
        domManager.refreshDom(data.city);
    } catch (error) {
        // if (logicManager.getCurrentCity()) {
        //     console.log(logicManager.getCurrentCity(), await logicManager.getWeatherData(logicManager.getCurrentCity(), unitSelector.value));
        // }
        console.log(error);
    }
}


getWeather();

// (async () => {console.log('bordeaux', await logicManager.getWeatherData('bordeaux', 'metric'));})();
// (async () => {console.log('New York', await logicManager.getWeatherData('new York', 'metric'));})();