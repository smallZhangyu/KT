import React, { useEffect, useState } from 'react';

function getSize() {
  return window.innerWidth > 1000 ? 'large' : 'small';
}

function useWindowSize() {
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}

export default function LargeOrSmallComponent() {
  const size = useWindowSize();

  return (
    <>
      {size === 'small' ? (
        <p>This is Small page.</p>
      ) : (
        <p>This is Large page.</p>
      )}
    </>
  );
}
