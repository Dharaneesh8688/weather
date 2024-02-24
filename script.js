const API_KEY = "4faf2c1ae62ce0ae875b12545ff9ad4c";
const url = "https://api.openweathermap.org/data/2.5/";

var lon, lat;
var cityInput = document.getElementById('city');
var temp = document.getElementById('temp');
var hname = document.getElementById('name');
var wind = document.getElementById('wind');
var pres = document.getElementById('pres');
var hum = document.getElementById('hum');
var img = document.getElementById('img');
function getloc() {
    navigator.geolocation.getCurrentPosition(async (result) => {
        const l = result.coords;
        lon = l.longitude;
        lat = l.latitude;
        console.log({ "lon": lon, "lat": lat });
        const data = await fetch(`${url}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric `);
        console.log(data);
        if (data.status == 200) {
            const info = await data.json();
            console.log(info);
            img.src= `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`;
            hname.innerHTML = info.name;
            temp.innerHTML = info.main.temp;
            wind.innerHTML = info.wind.speed;
            pres.innerHTML = info.main.pressure;
            hum.innerHTML = info.main.humidity;
        
        }
    });
}

async function search() {
    const cityName = cityInput.value;
    const data = await fetch(`${url}weather?q=${cityName}&appid=${API_KEY}&units=metric `);
    console.log(data);
    if (data.status == 200) {
        const info = await data.json();
        console.log(info);
        hname.innerHTML = info.name;
        temp.innerHTML = info.main.temp;
        wind.innerHTML = info.wind.speed;
        img.src= `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`;
        pres.innerHTML = info.main.pressure;
        hum.innerHTML = info.main.humidity;
       
      
    }
}

getloc();
