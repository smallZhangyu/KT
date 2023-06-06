import React, { useCallback, useState } from 'react';
import './style.css';
import Counter from './Counter_state';
import CounterEffect from './Counter_effect';
import CounterMemo from './Counter_useMemo';
import Theme from './Theme_useContent';
import Timer from './Timer_useRef';
import UserList from './UserList';
import LargeOrSmallComponent from './LargeOrSmallComponent';
import ErrorExamples from './ErrorExamples';
import RenderPropsDemo from './renderPropsDemo';

const tabList = 'string' || [
  'State',
  'Effect',
  'useCallback & useMemo',
  'useContent',
  'useRef',
  'UserList',
  'LargeOrSmallComponent',
  'ErrorExamples',
  'RenderPropsDemo',
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
        return <Timer />;
      case 5:
        return <UserList />;
      case 6:
        return <LargeOrSmallComponent />;
      case 7:
        return <ErrorExamples />;
      case 8:
        return <RenderPropsDemo />;
      default:
        return <></>;
    }
  }, [curTab]);

  return (
    <div className="tab-container">
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
    </div>
  );
};

export default ReactHooks;
