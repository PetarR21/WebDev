import axios from 'axios';
import { useEffect, useState } from 'react';

const Country = ({ country, full }) => {
  const [show, setShow] = useState(false);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0] || country.capital}&appid=${
          process.env.REACT_APP_API_KEY
        }&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      });
  }, []);

  const hideWhenFull = { display: full ? 'none' : 'block' };
  const showWhenShow = { display: show ? 'block' : 'none' };

  if (!weather) {
    return null;
  }

  return (
    <div style={{ marginTop: 35 }}>
      <div style={hideWhenFull}>
        {country.name.common} <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
      </div>
      <div style={full ? { display: 'block' } : showWhenShow}>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital[0] || country.capital}</div>
        <div>area {country.area}</div>
        <h4>languages:</h4>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <div>
          <img id='flag' src={country.flags.png} alt='flag' />
        </div>
        <div>
          <h3>Weather in {country.capital[0] || country.capital}</h3>
          <div>temperature {weather.main.temp} Celsius</div>
          <img alt='weather' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      </div>
    </div>
  );
};

export default Country;
