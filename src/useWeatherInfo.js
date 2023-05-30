import { useState, useEffect } from "react";




const useWeatherInfo = (url) => {
    
    const [weatherData, setWeatherData] = useState('')
    const [pending, setPending] = useState(null);
    const [error, setError] = useState(null);
    
    const fetchWeather = async () => {
        console.log('custome hook works')
        try{
            setPending(true)
            setError(null)

            

            const response = await fetch(url);
            const data = await response.json()
            
            if(response.ok){
                setWeatherData(data)
            }
            else{
                setError(data.message)
            }
            
            
        

            setPending(false)


        }
        catch{
            setError("Error")
            setPending('false')
        }
    }


    

    return{weatherData, pending, error, fetchWeather}
}

export default useWeatherInfo;