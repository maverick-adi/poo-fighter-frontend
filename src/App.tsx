import { useAuth } from 'context/AuthContext';
import Login from 'pages/Auth/Login';
import PetList from 'pages/Pets/PetList';
import React, { JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

function Protected({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/pets"
        element={
          <Protected>
            <PetList />
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/pets" replace />} />
    </Routes>
  );
}