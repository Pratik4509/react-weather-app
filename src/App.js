import React, { useState } from "react";
import "./App.css";
import { fetchweather } from "./Api/FetchApiData";

const App = () => {
  const [query, setQuery] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({});
  const [weatherData, setWeatherData] = useState({});

  // const [errorMessage, setErrorMessage] = useState();

  // const dateBuild = (d) => {
  //   let date = String(new window.Date());
  //   date = date.slice(3, 15);
  //   return date;
  // };

  // const handleClick = () => {
  //   setErrorMessage("Please enter the correct city name!");
  // };

  const search = async (event) => {
    if (event.key === "Enter") {
      const data = await fetchweather(query);
      console.log(data);
      setWeatherInfo(data);
      setWeatherData(data.list);
      setQuery("");
    }
    // else {
    //   const err = handleClick();
    // }
  };

  function convertTime (d) {    
    const dateObject = new Date(d)
    const humanDateFormat = dateObject.toString();
    return humanDateFormat; 
  }

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Enter the city name in here"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyPress={search}
      />
      {/* {errorMessage && <div className="error"> {errorMessage} </div>} */}
      {weatherInfo.cod === '200' && (
        <>
          <div className="today-weather">
            <div className="temp">
              <div className="today">
                <h2>Today</h2>
                <div className="date"> {new Date().toDateString("en-US")}</div>
              </div>
              <div className="temp-num">
                <h2>
                  <span>{weatherData['0'].main.temp}</span>
                  <span>&#176;</span>
                  <span>C</span>
                </h2>
                
                <div className="weather-info"> 
                  <img
                    className="icon"
                    src={`https://openweathermap.org/img/wn/${weatherData['0'].weather['0'].icon}@2x.png`}
                    // alt={weatherInfo.weather[0].description}
                  />
                  <span>{weatherData['0'].weather['0'].description}</span>
                </div>
              </div>

              
              {/* <div className="date"> {new Date().toDateString("en-us")}</div> */}
              <div className="city-name">
              <i class="ri-map-pin-line"></i>
                <span>{weatherInfo.city['name']}</span>
              </div>
            </div>
            <div className="temp-details">
              <h2>Details</h2>
              <div className="details">
                <span>Max Temp</span>
                <span>{weatherData['0'].main.temp_max} &#176;C</span>
              </div>
              <div className="details">
                <span>Min Temp</span>
                <span>{weatherData['0'].main.temp_min} &#176;C</span>
              </div>
              <div className="details">
                <span>Pressure</span>
                <span>{weatherData['0'].main.pressure} p</span>
              </div>
              <div className="details">
                <span>Humidity</span>
                <span>{weatherData['0'].main.humidity} %</span>
              </div>
              <div className="details">
                <span>Wind Speed</span>
                <span>{weatherData['0'].wind.speed} kts</span>
              </div>
            </div>
            
          </div>
          <div className="future-tiles-container wrap">
            {weatherData.map((weatherData, index) => {
              let indexArr = [4,12,20,28];
              let currentDate = new Date(new Date(weatherData.dt_txt));
              let date = currentDate.getDate();
              let month = currentDate.getMonth()+1;
              let day = currentDate.getDay()+1;
              const dayArray = {
                1 : 'Sun',
                2 : 'Mon',
                3 : 'Tue',
                4 : 'Wed',
                5 : 'Thu',
                6 : 'Fri',
                7 : 'Sat',
              };
              if (indexArr.includes(index)){
                return (
                  <div className="future-tiles resp fixed">
                    <div className="date-div">
                      <h3>{date}/{month}</h3>
                      <p>{dayArray[day]}</p>
                    </div>
                    <div className="icon-div">
                      <img
                          className="icon"
                          src={`https://openweathermap.org/img/wn/${weatherData.weather['0'].icon}@2x.png`}
                          alt={weatherData.weather['0'].description}
                        />
                        <p>{weatherData.weather['0'].description}</p>
                    </div>
                    
                </div>
                )
              }
              
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
