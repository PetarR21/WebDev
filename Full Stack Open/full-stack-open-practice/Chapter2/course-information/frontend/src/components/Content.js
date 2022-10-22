import Part from './Part';

const Content = ({ parts }) => {
  return (
    <div>
      <ul>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </ul>
      <div>
        <strong>total of {[...parts].reduce((a, b) => a + b.exercises, 0)} exercises</strong>
      </div>
    </div>
  );
};

export default Content;
