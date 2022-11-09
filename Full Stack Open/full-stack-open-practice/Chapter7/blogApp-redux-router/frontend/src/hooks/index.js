import { useState } from 'react';

export const useField = (type, name) => {
  const [value, setValue] = useState('');

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    fields: {
      type,
      name,
      value,
      onChange,
    },
    reset,
  };
};
