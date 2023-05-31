import { useEffect, useRef, useState } from "react";


const Forecast = ({cityChange}) => {

    const weekRef = useRef()

    const ApiKey = "325ae071e5b172e526ea622fdf06ca9d"
    const [weather, setWeather] = useState();
    const [timeDisplay, setTimeDisplay] = useState('')
    const [dateDisplay, setDateDisplay] = useState('')
    const [dayName, setDayName] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    // const cityName = true

    useEffect(() =>{
        const fetchWeather = async () => {
            setLoading(true)
            setError(null)

            try{

                setLoading(true);
                setError(null);

                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityChange}&units=metric&appid=${ApiKey}`)

                const data = await response.json();

                if(response.ok){
                    setWeather(data.list)
                    setLoading(false)
                    setError(null)
                }
                else{
                    setError(data.message)
                }

                
                const timeDisplayArray = [];
                const dateDisplayArray = [];
                const dayNameArray = [];

                // getting date and time information of forecasts
                weather.forEach(forecasts => {
                    const utcTime = (forecasts.dt + 3600) * 1000;

                    const date = new Date(utcTime).toUTCString();
    
                    const current = new Date(date)
    
                    current.setUTCHours(current.getUTCHours() - 1);
    
                    const currentTime = current.toLocaleTimeString()
    
                    const currentDate = current.toLocaleDateString()
                    const currentDay = current.getDay()
    
                    const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
                    const currentWeek = daysOfTheWeek[currentDay]
    
                    timeDisplayArray.push(currentTime);
                    dateDisplayArray.push(currentDate);
                    dayNameArray.push(currentWeek);

                });

                setTimeDisplay(timeDisplayArray)
                setDateDisplay(dateDisplayArray)
                setDayName(dayNameArray)

            }
            catch{
                setError("error")
                setLoading(false)
            }

            
        }
        
        // if(cityChange){
        //     fetchWeather();
        // }
        fetchWeather();
        
    }, [cityChange])
    

    // scroll function for arrow buttons
    const scrollLeft = () => {
        weekRef.current.scrollBy({
            left: -150, 
            behavior: 'smooth',
        })
    }
     
    const scrollRight = () => {
        weekRef.current.scrollBy({
            left: 150, 
            behavior: 'smooth',
        })
    }
     


    return ( 

        <div className="forecast">

            <h1>See Daily Forecasts</h1>

            <i className="fa btnLeft fa-arrow-left-long" onClick= { scrollLeft}  ></i>
            <i className="fa btnRight fa-arrow-right-long" onClick = { scrollRight } ></i>

            {loading && <p style={{fontSize: ".6rem"}}> Loading daily forecasts </p>}
            {error && <p style={{fontSize: ".6rem"}}> Updating time... </p>}
           

            <div className="week" ref={ weekRef } >
                

                {weather && (weather.map( (daily, index) => (

                    <div className="day" key={daily.dt}>

                        <p> { dayName[index] } </p> 

                        <p> { dateDisplay[index] } </p>

                        <p> { timeDisplay [index] } </p>

                        <div className="temp">
                             <h2> { daily.main.temp }°</h2>
                        </div>

                        <h3>Feels like</h3>
                        
                        <span>{ daily.main.feels_like }°</span>

                    </div>)
                ))}

            </div>
           


            
            
        </div>
     );
}
 
export default Forecast;