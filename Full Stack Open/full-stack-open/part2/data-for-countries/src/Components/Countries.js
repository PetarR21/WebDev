import Country from './Country';
import ExpandableCountry from './ExpandableCountry';

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches,specify anoter filter</p>;
  } else if (countries.length > 1) {
    return (
      <ul style={({ listStyle: 'none' }, { padding: '0px' })}>
        {countries.map((country) => (
          <ExpandableCountry key={country.name.common} country={country} />
        ))}
      </ul>
    );
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return <p>No match</p>;
  }
};

export default Countries;
