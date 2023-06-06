/*eslint no-unused-vars: "off"*/
import React, { useState } from 'react';
import useAsync from './hooks/useAsync';

const UserList = () => {
  //   const [users, setUsers] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(null);

  //   const fetchUsers = async function () {
  //     setLoading(true);

  //     try {
  //       const res = await fetch('https://reqres.in/api/users/');
  //       const json = await res.json();
  //       setUsers(json.data);
  //     } catch (error) {
  //       setError(error);
  //     }

  //     setLoading(false);
  //   };
  const {
    execute: fetchUsers,
    data: users,
    loading,
    error,
  } = useAsync(async () => {
    const res = await fetch('https://reqres.in/api/users/');
    const json = await res.json();
    return json.data;
  });

  return (
    <>
      <button onClick={fetchUsers}>
        {loading ? 'Loading...' : 'Get Users'}
      </button>
      {error && <div>Failed: {String(error)}</div>}

      <ul>
        {users &&
          users.length > 0 &&
          users.map((user) => {
            return (
              <li key={user.id}>{`${user.first_name} ${user.last_name}`}</li>
            );
          })}
      </ul>
    </>
  );
};

export default UserList;
