import Country from './Country';

const CountriesList = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <Country key={country.name.common} country={country} full={false}/>
      ))}
    </div>
  );
};

export default CountriesList;
