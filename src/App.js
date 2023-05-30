import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './Search';
import './App.css';
import './Search.css'
import Weather from './Weather';
import { useState } from 'react';
import Home from './Home';

function App() {

  const [cityName, setCityName] = useState('');

  const handleSubmit = (city) => {
    setCityName(city)
  } 


  return (
    <Router>
      <div className="App">
        <Search onCityChange = {handleSubmit} />
        
        <div className="content">

          <Routes>

            <Route path='/' element= {<Home /> }></Route>

            <Route path='/weather' element= {<Weather city={cityName} />}></Route>

          </Routes>

        </div>
      
      

      </div>
    </Router>
    
  );
}

export default App;
