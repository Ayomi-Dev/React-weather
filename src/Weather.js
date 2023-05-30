import { useEffect, useState } from "react";
import Forecast from './Forecast'
import AOS from 'aos';
import 'aos/dist/aos.css'

const Weather = ({city}) => {
    const [weatherData, setWeatherData] = useState('')
    const [pending, setPending] = useState(true);
    const [error, setError] = useState(null);
    const [timeDisplay, setTimeDisplay] = useState('')
    const [dateDisplay, setDateDisplay] = useState('')
    const [dayName, setDayName] = useState('')

    const [dayRise, setDayRise] = useState('')
    const [daySet, setDaySet] = useState('')


     
    
     useEffect(() => {

        AOS.init({
            duration: 2000
        })
        const fetchWeather = async () => {
            try{
                setPending(true)
                setError(null)
    
                const apiKey = '325ae071e5b172e526ea622fdf06ca9d';
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    
    
                const response = await fetch(url);
                const data = await response.json()
                
                if(response.ok){
                    setWeatherData(data)
                    setPending(false)
                    setError(null)
                }
                else{
                    setError(data.message)
                }
                
                // Getting location local date and time
                const utcSec = parseInt(data.dt, 10) + parseInt(data.timezone, 10) //converting dt and timezone values to integers
        
                const utcMilSec = (utcSec * 1000) //converting to milliseconds

                const date = new Date(utcMilSec).toUTCString();// getting exact UTC time value of user input
        
                const currentDate = new Date(date);
                currentDate.setUTCHours(currentDate.getUTCHours() - 1) //reducing the hour of the UTC date value by 1hr

                const fullDate = currentDate.toLocaleDateString(); //getting current date
                const timeOfDay = currentDate.toLocaleTimeString(); //getting exact time of location
                const currentDay = currentDate.getDay()
    
                const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
                const currentDayOfWeek = daysOfTheWeek[currentDay] //getting name of current day
        

                // Getting sunrise and sunset time

                const utcSunrise = (data.sys.sunrise + 3600) * 1000

                const sunriseDate = new Date(utcSunrise).toUTCString();
                const citySunriseTime = new Date(sunriseDate)
                citySunriseTime.setUTCHours(citySunriseTime.getUTCHours() - 1)

                const sunriseTime = citySunriseTime.toLocaleTimeString();


                //calculating sunset time
                const utcSunset = (data.sys.sunset + 3600) * 1000;

                const sunsetDate = new Date(utcSunset).toUTCString();
                const citySunsetTime = new Date(sunsetDate);
                citySunsetTime.setUTCHours(citySunsetTime.getUTCHours() - 1);

                const sunsetTime = citySunsetTime.toLocaleTimeString();


                setTimeDisplay(timeOfDay)
                setDateDisplay(fullDate)
                setDayName(currentDayOfWeek)
                setDayRise(sunriseTime)
                setDaySet(sunsetTime)

                setPending(false)


            }
            catch{
                setError("Error")
                setPending('false')
            }
        }

        if(city){
            fetchWeather();
        }
    }, [city])
 

    return ( 

        <div className="weather">
            
            { pending && <p style={{fontSize: ".7rem"}}>Loading...Please Wait</p> }

            { error && <p style={{fontSize: ".7rem"}}>Ooop! Something Went wrong</p> }

            {weatherData && (<div className="display">
                
                <div className="weather-info" data-aos="zoom-in">

                    <div className="column one">
                
                    <div className="city">
                        <h1> { weatherData.name }, <span> {weatherData.sys.country }</span> </h1>
                        <p>Low: { weatherData.main.temp_min }° </p>
                        <p>High: { weatherData.main.temp_max }° </p>
                    </div>

                    <div className="temp">
                        <h1> { weatherData.main.temp }°C </h1>
                        <p>Sunrise: { dayRise } </p>
                        <p>Sunset: { daySet } </p>
                    </div>

                    </div>
                
                    <div className="column two">

                    <div className="icon">
                        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                    </div>

                    <div className="cloud">
                        <h2> { weatherData.weather[0].main } </h2>
                        <span> { weatherData.weather[0].description } </span>
                    </div>

                    <div className="date">
                        <h2> { dayName } </h2>
                        <p>{ dateDisplay }</p>
                    </div>

                    <div className="time">
                        <h2>{ timeDisplay }</h2>
                    </div>
                    </div> 

                    <div className="column three">
                    <div className="main">
                        <i className="fa-solid fa-smog"></i>
                        <p>Humidity </p>
                        <h3 className="value"> { weatherData.main.humidity }%</h3>
                    </div>

                    <div className="main">
                        <i className="fa-solid fa-wind"></i>
                        <p> Wind Speed</p>
                        <h3 className="value">{weatherData.wind.speed}km/h</h3>
                    </div>

                    <div className="main">
                        <i className="fa-solid fa-cloud-rain"></i>
                        <p>Cloudiness</p>
                        <h3 className="value">{weatherData.clouds.all}%</h3>
                    </div>
                    <div className="main">
                        <i className="fa-solid fa-cloud-showers-heavy"></i>
                        <p> Pressure</p>
                        <h3 className="value">{weatherData.main.pressure} hPa</h3>
                    </div>
                    <div className="main">
                        <i className="fa-solid fa-compass-drafting"></i>
                        <p>Coordinates</p>
                        <div className="range">
                            <p>Lat: <span>{ weatherData.coord.lat }</span></p>
                            <p>Lon: <span>{ weatherData.coord.lon }</span></p>
                        </div>
                    </div>
                    </div>

                </div>

                { <Forecast cityChange = {city} />}
            </div>)}
            
            
            
        </div>
     );
}
 
export default Weather;