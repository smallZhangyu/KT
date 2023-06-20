import React from 'react';
import { useParams } from 'react-router-dom';

const Foo = () => {
    const {id} = useParams();

    return (
      <div>Foo Param is {id}</div>
    )
}

export default Foo