import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from "./baseUrl";

const AdminView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users data
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      // Delete the user
      await axios.delete(`/api/users/${userId}`);

      // Remove the user from the users list
      setUsers(users.filter(user => user.user_id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user.user_id)}>Delete User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminView;
