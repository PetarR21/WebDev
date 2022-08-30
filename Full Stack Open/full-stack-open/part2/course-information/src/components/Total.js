const Total = ({ parts }) => {
  console.log(parts);
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0);
  return <div style={{ fontWeight: 'bold' }}>total of {total} exercises</div>;
};

export default Total;
