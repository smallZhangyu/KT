import React, { useState, useEffect } from 'react';

// function Example() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (count < 5) {
//       setCount(count + 1);
//     }
//     console.log('error loop');
//   }, [count]);

//   return <div>{count}</div>;
// }

function Example() {
  const [count, setCount] = useState(0);
  //   let intervalId;

  useEffect(() => {
    let intervalId = setInterval(() => {
      console.log(count); // 始终输出 0，即使 count 改变
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment - {count}</button>
    </div>
  );
}

export default Example;
