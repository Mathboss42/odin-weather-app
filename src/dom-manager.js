const cityInput = document.querySelector('input[type=text]');
const button = document.querySelector('button');
const buttonIcon = document.querySelector('i');

let isLoading = false;

export function toggleLoading() {
    if (!isLoading) {
        setLoading();
    }

    setTimeout(unsetLoading, 1000);
}


function setLoading() {
    isLoading = true;
    
    cityInput.placeholder = '';
    
    buttonIcon.classList.remove('fa-solid')
    buttonIcon.classList.remove('fa-magnifying-glass')
    buttonIcon.classList.add('spinner-border');
    buttonIcon.classList.add('spinner-border-sm');

    button.disabled = true;
}


function unsetLoading() {
    isLoading = false;
    
    buttonIcon.classList.remove('spinner-border');
    buttonIcon.classList.remove('spinner-border-sm');
    buttonIcon.classList.add('fa-solid')
    buttonIcon.classList.add('fa-magnifying-glass')
    
    button.disabled = false;
} 


export function refreshDom(city, country, time, description, temp, humidity, wind) {
    setTimeout(() => {cityInput.placeholder = city}, 1000);
}