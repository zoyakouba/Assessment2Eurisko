import React, { useState, useEffect } from "react";
import useAuthStore from "../../routes/useAuth";

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!accessToken) return; 
      setLoading(true);

      try {
        const response = await fetch(`/api/users?search=${search}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Error fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [accessToken, search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
        className="p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.firstName} {user.lastName} ({user.email})</li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList
