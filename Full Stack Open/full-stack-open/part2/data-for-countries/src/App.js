import axios from 'axios';
import { useEffect, useState } from 'react';
import Countries from './Components/Countries';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  console.log(filteredCountries);
  return (
    <div>
      <div>
        find countries
        <input
          value={filter}
          onChange={({ target }) => {
            setFilter(target.value);
          }}
        />
      </div>

      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
