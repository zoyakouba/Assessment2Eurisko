import React from "react";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dob: string;
};

type UserCardProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const initials = `${user.firstName[0]}${user.lastName[0] || ""}`.toUpperCase();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-[var(--primary-color)] text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">
        {initials}
      </div>
      <h2 className="text-lg font-semibold mb-1">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">Email: {user.email}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">Status: {user.status.toLowerCase()}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Date of Birth: {user.dob}</p>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(user)}
          className="bg-[var(--primary-color)] text-white px-4 py-1 rounded hover:bg-blue-800"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user)}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default UserCard
