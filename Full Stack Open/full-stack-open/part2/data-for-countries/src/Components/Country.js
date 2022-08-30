import axios from 'axios';
import { useEffect, useState } from 'react';

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState('');
  const [icon, setIcon] = useState('');
  const [wind, setWind] = useState('');

  /*<div>
        <h2>Weather in {country.capital[0]}</h2>
        <p>temperature {weather.main.temp} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/`}></img>
      </div>*/

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        const weather = response.data;
        console.log(weather);
        setTemperature(weather.main.temp);
        setIcon(weather.weather[0].icon);
        setWind(weather.wind.speed);
      });
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <h3>languages</h3>

      <ul>
        {Object.keys(country.languages)
          .map((key) => {
            return country.languages[key];
          })
          .map((language) => (
            <li key={language}>{language}</li>
          ))}
      </ul>
      <img src={country.flags.png} />
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        <p>temperature {temperature} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${icon}@4x.png`}></img>
        <p>wind {wind} m/s</p>
      </div>
    </div>
  );
};

export default Country;
