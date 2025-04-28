import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import NewUser from './components/pages/NewUser';
import EditUser from './components/pages/EditUser';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './components/molecules/Layout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/new" element={<NewUser />} />
          <Route path="/dashboard/edit/:id" element={<EditUser />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
