import React, { useCallback, useState } from 'react';
import './style.css';
import Counter from './Counter_state';
import CounterEffect from './Counter_effect';
import CounterMemo from './Counter_useMemo';
import Theme from './Theme_useContent';

const tabList = [
  'State',
  'Effect',
  'useCallback & useMemo',
  'useContent',
  'useRef',
];

const ReactHooks = () => {
  const [curTab, setCurTab] = useState(0);

  const renderBody = useCallback(() => {
    switch (curTab) {
      case 0:
        return <Counter />;
      case 1:
        return <CounterEffect />;
      case 2:
        return <CounterMemo />;
      case 3:
        return <Theme />;
      case 4:
        return <></>;
      default:
        return <></>;
    }
  }, [curTab]);

  return (
    <>
      <ul className="tabList">
        {tabList.map((tab, index) => {
          const actived = index === curTab ? 'actived' : '';
          return (
            <li
              key={`${tab}_${index}`}
              className={actived}
              onClick={() => setCurTab(index)}
            >
              {tab}
            </li>
          );
        })}
      </ul>
      <div className="tabBody">{renderBody()}</div>
    </>
  );
};

export default ReactHooks;
