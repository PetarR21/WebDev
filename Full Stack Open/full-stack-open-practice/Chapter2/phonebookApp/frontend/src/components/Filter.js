const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={({ target }) => setFilter(target.value)} />
    </div>
  );
};

export default Filter;
