import AOS from 'aos';
import 'aos/dist/aos.css'
import React, { useEffect } from 'react'

const Home = () => {
// displaying local time
    const date = new Date();

    const currentDate = date.toLocaleDateString();
    const currentTime = date.toLocaleTimeString();
    const currentDay = date.getDay();

    const daysOfWeek = ["SUNDAY","MONDAY","TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

    const currentDayOfWeek = daysOfWeek[currentDay]

    useEffect(()=> {
        AOS.init({
            duration: 1000,
            reset: false
        })
    }, [])




    return (  
        <div className="intro">
            <div className="texts">
                <i className="fa-solid fa-poo-storm" data-aos="zoom-out"></i>
                <div className="date-time" data-aos="fade-right">
                    <div className="today">
                        <h1> { currentDayOfWeek }</h1>
                    </div>
                    <div className="dates">
                        <h2> { currentDate } </h2>
                    </div>
                    <div className="times">
                        <h2> { currentTime } </h2>
                    </div>
                </div>
                <h1 data-aos="fade-up">Stay Ahead Of The Storm.</h1>
                <h2 data-aos="fade-up">Get Your Local And Int'l Weather Forecasts</h2>
                <p data-aos="fade-left">Simplified And Accurate.</p>
            </div>
        </div>
    );
}
 
export default Home;