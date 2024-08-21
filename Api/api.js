const btnweather = document.querySelector('#city-input-btn');
const cityname = document.querySelector('#city-name');
const imag = document.querySelector('#weather-icon');
const temp = document.querySelector('#temperature');
const desc = document.querySelector('#description');
const wind = document.querySelector('#wind-speed');
const body = document.body; 
function capitalizeFirstLetter(word) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
}


function setBackgroundImage(weather) {
    let backgroundImage = '';

    if (weather.includes('clear')) {
        backgroundImage = 'url("clear.jpg")';
    } else if (weather.includes('rain')) {
        backgroundImage = 'url("Rain.jpg")';
    } else if (weather.includes('cloud')) {
        backgroundImage = 'url("cloud.jpg")';
    } else if (weather.includes('snow')) {
        backgroundImage = 'url("snow.jpg")';
    } else if(weather.includes('thunderstorm')){
        backgroundImage = 'url("thunderstorm.jpg")'; 
    }
    else if(weather.includes('haze')){
        backgroundImage = 'url("haze.jpg")'; 
    }
    body.style.backgroundImage = backgroundImage;
}

async function display(city) {
    const key = '1fb94657c0fa595a88662f1186d1b02f';
    
    try {
        const a = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
        const b = await a.json();
        console.log(b);
        
        if (b.cod !== 200) {
            throw new Error(b.message);
        }
        
        const capitalizedCity = capitalizeFirstLetter(city);
        
        cityname.innerText = capitalizedCity;
        temp.innerText = b.main.temp + '°C';
        const weatherDescription = capitalizeFirstLetter(b.weather[0].main);
        desc.innerText = weatherDescription;
        wind.innerText = "Wind Speed: " + b.wind.speed + " Kmph";

        
        imag.src = `http://openweathermap.org/img/wn/${b.weather[0].icon}@2x.png`;
        imag.style.display = 'block'; 

        
        setBackgroundImage(weatherDescription.toLowerCase());

    } catch (error) {
        console.error('Error fetching weather data:', error);
        cityname.innerText = 'City not found!';
        imag.style.display = 'none';
        temp.innerText = '';
        desc.innerText = '';
        wind.innerText = '';
        body.style.backgroundImage = 'url(".jpg")'; 
    }
}

btnweather.addEventListener('click', () => {
    const city = document.querySelector('#city-input').value;
    if (city) {
        display(city);
    } else {
        alert('Please enter a city name!');
    }
});
