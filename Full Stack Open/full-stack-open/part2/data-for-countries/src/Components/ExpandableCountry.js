import { useState } from 'react';
import Country from './Country';

const ExpandableCountry = ({ country }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? '' : 'none' };

  return (
    <li>
      <div>
        {country.name.common}{' '}
        <button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {visible ? 'hide' : 'show'}
        </button>
        <div style={hideWhenVisible}>
          <Country country={country} />
        </div>
      </div>
    </li>
  );
};

export default ExpandableCountry;
