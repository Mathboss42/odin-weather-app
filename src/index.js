import './styles.css';
import * as logicManager from './logic-manager';
import * as domManager from './dom-manager';


const cityInput = document.querySelector('input[type=text]');
const unitSelector = document.querySelector('select');
const searchButton = document.querySelector('button');


(async () => {console.log('bordeaux', await logicManager.getWeatherData('bordeaux', 'metric'));})();
(async () => {console.log('New York', await logicManager.getWeatherData('new York', 'metric'));})();