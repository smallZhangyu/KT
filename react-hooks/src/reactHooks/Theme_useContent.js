import React, { memo, useCallback, useContext, useMemo, useState } from 'react';

const MyContent = React.createContext();

const theme = {
  light: {
    background: '#fff',
    color: '#333',
  },
  dark: {
    background: '#f60',
    color: '#fff',
  },
};

const ChildComponent = memo(() => {
  console.log('%c Child Component render', 'color: orange');
  const { background, color } = useContext(MyContent);

  return (
    <p style={{ background, color }}>
      This is Child Component to display useContent.
    </p>
  );
});

const Theme = () => {
  const [myTheme, setMyTheme] = useState('light');

  const clickHandle = useCallback(() => {
    setMyTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  }, []);

  const revertTheme = useMemo(
    () => (myTheme === 'light' ? 'dark' : 'light'),
    [myTheme]
  );

  return (
    <MyContent.Provider value={theme[revertTheme]}>
      <ChildComponent />
      <button onClick={clickHandle}>Trigger theme to {myTheme}</button>
    </MyContent.Provider>
  );
};

export default Theme;
