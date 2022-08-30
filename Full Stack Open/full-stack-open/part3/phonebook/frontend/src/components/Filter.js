const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with
      <input
        value={filter}
        onChange={({ target }) => {
          setFilter(target.value);
        }}
      ></input>
    </div>
  );
};
export default Filter;
