import { CoursePart } from '../types';

const Total = ({ parts }: { parts: CoursePart[] }) => {
  return <div>Number of exercises {parts.reduce((total, part) => total + part.exerciseCount, 0)}</div>;
};

export default Total;
