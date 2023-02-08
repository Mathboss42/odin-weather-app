import './styles.css';
import * as logicManager from './logic-manager';
import * as domManager from './dom-manager';

(async () => {console.log('Rome', await logicManager.getWeather('RoMe', 'metric'));})();
(async () => {console.log('San Marino', await logicManager.getWeather('New York', 'metric'));})();