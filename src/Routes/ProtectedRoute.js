import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) return null; // or a loading spinner

    if (!isAuthenticated) {
        return <Navigate to={`/access?redirect=${encodeURIComponent(location.pathname)}`} />;
    }

    return children;
};

export default ProtectedRoute;
