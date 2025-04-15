import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login.tsx";
import Dashboard from "./components/pages/Dashboard.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App
