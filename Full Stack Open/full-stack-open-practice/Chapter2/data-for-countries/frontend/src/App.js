import { useEffect, useState } from 'react';
import axios from 'axios';
import Content from './Content';

const baseUrl = 'https://restcountries.com/v3.1/all';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((country) => country.name.common.trim().toLowerCase().includes(filter));

  return (
    <div>
      <div>
        find countries
        <input value={filter} onChange={({ target }) => setFilter(target.value.trim().toLowerCase())} />
        <div>
          {filter == '' ? (
            ''
          ) : filteredCountries.length > 10 ? (
            'too many matches,specify another filter'
          ) : (
            <Content countries={filteredCountries} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
