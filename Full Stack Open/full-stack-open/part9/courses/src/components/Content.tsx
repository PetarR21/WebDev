import { Parts } from '../types';
import CoursePart from './CoursePart';

const Content = (props: Parts) => {
  return (
    <div>
      {props.parts.map((part) => (
        <CoursePart key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
