import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (event) => {
    const value = event.target.value.toLowerCase().trim();
    props.setFilter(value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const ConnectedFilter = connect(null, { setFilter })(Filter);
export default ConnectedFilter;
