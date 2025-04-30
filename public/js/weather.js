async function getLocation() {
    await navigator.geolocation.getCurrentPosition(async (position)=>{
        await console.log(position);
        await getData(position.coords.latitude,position.coords.longitude);
    },
    ()=>{
    console.log("error");
    });
}
getLocation();

async function getData(lat,lon)
{
    console.log('weather data');
    try{
        let res1=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eae77e55c0189bda40e626ed44f440cd`);
        let data1=await res1.json();
        console.log(data1);
        let date=new Date(data1.dt*1000+(data1.timezone*1000)).toString().split(" ");

        document.querySelector('.date-dayname').innerText=date[0];
        document.querySelector('.date-day').innerText=date[1]+" "+date[2]+" , "+date[3];
        document.querySelector('.location').innerText=data1.name;
        let temp=(data1.main.temp-273.15).toFixed(0);
        document.querySelector('.weather-temp').innerText=`${temp}°C`;
        document.querySelector('.weather-desc').innerText=data1.weather[0].description;
        document.querySelector('.humidity .value').innerText=data1.main.humidity+"%";
        document.querySelector('.wind .value').innerText=data1.wind.speed.toFixed(0)+"km/hr";




        let res2=await fetch('https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=eae77e55c0189bda40e626ed44f440cd');
        let data2=res2.json();
        console.log(data2);


    }
    catch(err){
        console.log("error");
    }
}


