import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, deleteUser } from '../../services/api';
import { Link } from 'react-router-dom';
import { successToast, errorToast } from '../../utils/toast';

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', search],
    queryFn: () => getUsers(search),
  });

  const mutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      successToast('User deleted successfully');
    },
    onError: () => errorToast('Error deleting user'),
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete?')) {
      mutation.mutate(id);
    }
  };

  const getInitials = (firstName: string, lastName?: string) => {
    return `${firstName[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search users..."
          className="input w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--primary-color)] text-white text-2xl font-bold mb-4">
                {getInitials(user.firstName, user.lastName)}
              </div>
              <h2 className="text-xl font-bold mb-2 text-center">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-1 text-center">{user.email}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-1 text-center capitalize">Status: {user.status}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">DOB: {user.dateOfBirth}</p>
              <div className="flex gap-2">
                <Link
                  to={`/dashboard/edit/${user.id}`}
                  className="btn-secondary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
