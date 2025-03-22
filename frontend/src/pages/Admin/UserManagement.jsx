import { useEffect, useState } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend (Replace with actual API)
    setUsers([
      { id: 1, name: "John Doe", role: "consumer" },
      { id: 2, name: "Jane Smith", role: "farmer" },
      { id: 3, name: "Admin User", role: "admin" },
    ]);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} className="border p-2 mb-2 rounded">
            {user.name} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
