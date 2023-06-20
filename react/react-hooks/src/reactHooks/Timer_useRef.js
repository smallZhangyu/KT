import React, { useState, useRef, useCallback } from 'react';

/**
 * 使用 useRef 保存的数据一般是和 UI 渲染无关的，因此当 ref 的值发生变化时，是不会触发组件的重新渲染
 * @returns
 */

const Timer = () => {
  const [time, setTime] = useState(0);
  const timer = useRef(null);

  const handleStart = useCallback(() => {
    timer.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  }, []);

  const handlePause = useCallback(() => {
    clearInterval(timer.current);
    timer.current = null;
  }, []);

  return (
    <div>
      <h6>Time: {time} seconds</h6>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
};

export default Timer;
