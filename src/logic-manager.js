export async function getWeather(location, unit) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=${unit}`;
    console.log(location, 'url', url);

    const data = await fetch(url);
    console.log(location, 'data', data);
    const result = await data.json();
    console.log(location, 'result', result);

    return result;
}