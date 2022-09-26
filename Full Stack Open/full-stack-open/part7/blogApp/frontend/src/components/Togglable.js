import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          onClick={() => toggleVisibility()}
          className='my-6 px-6 py-2 text-white bg-brightRed  hover:bg-brightRedLight rounded-md text-lg'
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className='my-5 flex flex-col gap-5'>
        {props.children}
        <div>
          <button
            onClick={() => toggleVisibility()}
            className='text-white bg-brightRed hover:bg-brightRedLight focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
