import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CounterRedux = () => {
  const count = useSelector((state) => state.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'counter/incremented' })}>
        Add
      </button>
      <button onClick={() => dispatch({ type: 'counter/decremented' })}>
        Subs
      </button>
    </div>
  );
};

export default CounterRedux;
