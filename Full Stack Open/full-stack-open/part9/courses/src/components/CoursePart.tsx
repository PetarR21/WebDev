import { Part } from '../types';

const CoursePart = ({ part }: { part: Part }) => {
  return (
    <p>
      {part.name} {part.exerciseCount}
    </p>
  );
};

export default CoursePart;
