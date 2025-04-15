import React from "react";
import { useState, ChangeEvent, useEffect } from "react";
import Navbar from "../molecules/Navbar";
import UserCard from "../molecules/UserCard";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dob: string;
};
const dummyUsers: User[] = [
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com", status: "Active", dob: "1990-05-15" },
  { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", status: "Locked", dob: "1988-10-22" },
  { firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", status: "Active", dob: "1995-02-10" },
  { firstName: "Bob", lastName: "Martin", email: "bob.martin@example.com", status: "Locked", dob: "1980-08-05" },
  { firstName: "Charlie", lastName: "Brown", email: "charlie.brown@example.com", status: "Active", dob: "1992-11-30" },
  { firstName: "David", lastName: "Lee", email: "david.lee@example.com", status: "Locked", dob: "1987-07-14" },
  { firstName: "Eve", lastName: "Green", email: "eve.green@example.com", status: "Active", dob: "1993-09-21" },
  { firstName: "Frank", lastName: "White", email: "frank.white@example.com", status: "Active", dob: "1994-01-25" },
  { firstName: "Grace", lastName: "Black", email: "grace.black@example.com", status: "Locked", dob: "1985-03-17" },
  { firstName: "Hannah", lastName: "", email: "hannah.purple@example.com", status: "Active", dob: "1996-12-03" },
];

const Dashboard = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const handleCreateUser = () => console.log("Create user clicked");
  const handleLogout = () => console.log("Logout clicked");
  const handleEdit = (user: User) => console.log("Edit user:", user);
  const handleDelete = (user: User) => console.log("Delete user:", user);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
        <Navbar
          onCreateUser={handleCreateUser}
          onLogout={handleLogout}
        />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-3 mb-8 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={handleSearchChange}
          />

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredUsers.map((user, index) => (
              <UserCard
                key={index}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard

