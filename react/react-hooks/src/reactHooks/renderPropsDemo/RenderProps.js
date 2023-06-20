import React, { useCallback } from 'react';
import { Popover } from 'antd';

export default function RenderProps({ renderItem, data, max }) {
  const elements = data.map((item) => renderItem(item));
  const showElements = elements.slice(0, max);
  const hideElements = elements.slice(max);

  const moreElementsUI = useCallback(() => {
    return (
      <Popover content={<div style={{ maxWidth: 500 }}>{hideElements}</div>}>
        <span>and {hideElements.length} more ...</span>
      </Popover>
    );
  }, []);

  return (
    <div>
      {showElements.length > 0 && showElements}
      {hideElements.length > 0 && moreElementsUI()}
    </div>
  );
}
