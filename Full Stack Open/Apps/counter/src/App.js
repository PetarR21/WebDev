import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};
const store = createStore(counterReducer);

store.subscribe(() => {
  console.log(store.getState());
});



const App = () => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default App;
