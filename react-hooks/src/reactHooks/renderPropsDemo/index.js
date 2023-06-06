import mockData from './mockData';
import React, { useCallback } from 'react';
import RenderPropsComp from './RenderProps';

const RenderPropsDemo = () => {
  const usesList = useCallback(
    (item) => <span key={item.id}>{item.name}, </span>,
    []
  );
  const usersTable = useCallback((item) => {
    return (
      <div key={item.id}>
        <span>{item.name} </span>
        <span>{item.age} </span>
        <span>{item.city} </span>
      </div>
    );
  }, []);

  return (
    <div>
      <h2>User Names</h2>
      <div>
        Liked by:{' '}
        <RenderPropsComp renderItem={usesList} data={mockData} max={3} />
      </div>

      <h2>User List</h2>
      <RenderPropsComp renderItem={usersTable} data={mockData} max={5} />
    </div>
  );
};

export default RenderPropsDemo;
