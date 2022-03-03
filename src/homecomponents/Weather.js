import React, { useEffect, useState } from 'react'
import { AxiosContext } from 'react-axios/lib/components/AxiosProvider';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
// import { Loader } from './Loader';
import { BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { FaStreetView } from "react-icons/fa";


export default function Weather() {
    const [weather, setWeather] = useState([]);
    const [query, setQuery] = useState("kolkata");
    const [city, setCity] = useState();
    
    const fetchAPI = async () => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=cf7e3ec47f858381bba83c5c3c16b774`;


        const response = await fetch(url);
        const resJSON = await response.json();
        console.log(resJSON);
        setWeather(resJSON);
        console.log(weather);
        console.log(weather.main.temp);
    }
    
    useEffect(() => {

        fetchAPI();
    }, [city]);
    



    return (
        <>
            <body>
                <div className='weathercontainer'>
                    <div className="weathercard">



                        <div className="weathersearch">
                            <input type="text" className="weatherinputvalue" value={query} placeholder="Enter the city" onChange={(event) => {
                                setQuery(event.target.value);
                            }} />
                            <button type="submit" className="weatherbutton" onClick={() => setCity(query)} >Go</button>
                        </div>


                        {!city ? (
                            <p>No Data Found</p>
                        ) : (
                            <div>
                                <div className="weatherinfo">
                                    <div className="weathername"><FaStreetView />{weather.name}</div>
                                    <div className="weathertemp">
                                        <div className='weathertempnum'>
                                            <div id="weathertnum">{(weather.main.temp - 273.15).toFixed(2)}°C</div>
                                        </div>
                                    </div>
                                    <div className="weatherdesc">{weather.weather[0].description}</div>
                                    <div className="weatherwind"><BsWind />   {weather.wind.speed} km/h</div>
                                    <div className="weatherhumidity"><WiHumidity />   Humidity : {weather.main.humidity} %</div>
                                </div>
                            </div>
                        )}


                    </div>

                </div>

            </body>
        </>
    )
}
