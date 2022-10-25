import CountriesList from './CountriesList';
import Country from './Country';

const Content = ({ countries }) => {
  if (!countries || countries.length == 0) {
    return null;
  }

  return (
    <div>
      {countries.length > 1 ? <CountriesList countries={countries} /> : <Country country={countries[0]} full={true} />}
    </div>
  );
};

export default Content;
