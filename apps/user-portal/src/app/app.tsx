import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from '@frontend/shared';
import { UserRole } from '@frontend/shared';
import './styles/fontawesome.css';

const REQUIRED_ROLES = [UserRole.Admin, UserRole.Dev];

export function App() {
  return <div></div>;
}

export default App;
