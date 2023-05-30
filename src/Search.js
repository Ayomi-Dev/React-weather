import { useState } from "react";
import {Link} from "react-router-dom"
import Counter from "./Counter";

const Search = ({onCityChange}) => {
    const [cityName, setCityName] = useState('')

    const handleChange = (e) => {
        setCityName(e.target.value);
    }

    const handleSearch = () => {
        onCityChange(cityName)
    }

    return ( 
        <div className="search">
            <div className="search-bar">
                <input type="text"
                    placeholder ="Please enter a city"
                    value={cityName}
                    onChange={handleChange}
                />

                <Link to='/weather'>
                    <i className="fa fa-search" onClick={handleSearch}></i>
                </Link>
                
            </div>
        </div>
     );
}
 
export default Search;