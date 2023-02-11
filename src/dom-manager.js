import { max } from "date-fns";

const images = importAll(require.context('./weather_icons', false, /\.(png|jpe?g|svg|webp)$/));
const maxImg = 2;

const cityInput = document.querySelector('input[type=text]');
const button = document.querySelector('button');
const buttonIcon = document.querySelector('i');
const imgContainer = document.querySelector('#icon');
const temperatureDisplay = document.querySelector('#temperature');
const descDisplay = document.querySelector('#desc');
const humidityDisplay = document.querySelector('#humidity');
const windDisplay = document.querySelector('#wind');
const locationDisplay = document.querySelector('#location');
const timeDisplay = document.querySelector('#time');
const unitDisplay = document.querySelector('#unit-display');
const imageSpinner = document.querySelector('#icon div');

let isLoading = false;

export function toggleLoading() {
    if (!isLoading) {
        setLoading();
    } 
    // else {
    //     unsetLoading();
    // }

    setTimeout(unsetLoading, 1000);
}


function setLoading() {
    isLoading = true;

    const img = document.querySelector('img');
    if(img) {
        img.classList.add('placeholder');
    }

    cityInput.placeholder = '';
    
    buttonIcon.classList.remove('fa-solid')
    buttonIcon.classList.remove('fa-magnifying-glass')
    buttonIcon.classList.add('spinner-border');
    buttonIcon.classList.add('spinner-border-sm');
    
    button.disabled = true;

    temperatureDisplay.classList.add('placeholder')
    descDisplay.classList.add('placeholder')
    humidityDisplay.classList.add('placeholder')
    windDisplay.classList.add('placeholder')
    timeDisplay.classList.add('placeholder')
    locationDisplay.classList.add('placeholder')
}


function unsetLoading() {
    isLoading = false;
    
    buttonIcon.classList.remove('spinner-border');
    buttonIcon.classList.remove('spinner-border-sm');
    buttonIcon.classList.add('fa-solid')
    buttonIcon.classList.add('fa-magnifying-glass')
    
    button.disabled = false;
    
    temperatureDisplay.classList.remove('placeholder')
    descDisplay.classList.remove('placeholder')
    humidityDisplay.classList.remove('placeholder')
    windDisplay.classList.remove('placeholder')
    timeDisplay.classList.remove('placeholder')
    locationDisplay.classList.remove('placeholder')
} 


export function refreshDom(city, country, time, description, temp, humidity, wind, unit) {
    setTimeout(() => {cityInput.placeholder = city
        temperatureDisplay.textContent = temp;
        descDisplay.textContent = description;
        humidityDisplay.textContent = humidity;
        windDisplay.textContent = wind;
        timeDisplay.textContent = time;
        locationDisplay.textContent = city + ', ' + country;
        unit === 'metric' ? unitDisplay.textContent = '°C' : unitDisplay.textContent = '°F';
        removeImage();
        appendImage(getImage(description));}, 1000);
    // cityInput.placeholder = city
    // temperatureDisplay.textContent = temp;
    // descDisplay.textContent = description;
    // humidityDisplay.textContent = humidity;
    // windDisplay.textContent = wind;
    // timeDisplay.textContent = time;
    // locationDisplay.textContent = city + ', ' + country;
    // unit === 'metric' ? unitDisplay.textContent = '°C' : unitDisplay.textContent = '°F';
    // removeImage();
    // appendImage(getImage(description));
}

function appendImage(img, element = imgContainer, cssClass = 'img-fluid', alt = 'weather') {
    const newImg = new Image();
    newImg.src = img;

    let newEl = element.appendChild(newImg);
    newEl.classList.add(cssClass);
}

function removeImage() {
    const img = document.querySelector('img');
    
    if (img) {
        img.remove();
    }

}


function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}


function toLowerCaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}


function getRandomNumber(max) {
    let result = Math.floor(Math.random() * max);
    if (result < 10) {
        result = '0' + result;   
    }
    return result;
}

function getImage(description) {
    const img = images[`${toLowerCaseFirstLetter(description)}_icon_${getRandomNumber(maxImg)}.webp`];
    if (img) {
        return img;
    } else {
        getImage(description);
    }
}