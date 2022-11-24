import { Parts } from '../types';

const Total = (props: Parts) => {
  return <div>Number of exercises {props.parts.reduce((total, part) => total + part.exerciseCount, 0)}</div>;
};

export default Total;
