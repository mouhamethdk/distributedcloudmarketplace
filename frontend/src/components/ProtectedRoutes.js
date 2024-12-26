import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { token, isLoading } = useAuth();

    if (isLoading) {
        // Optionnel : Affichez un spinner ou un message pendant le chargement
        return <div>Loading...</div>;
    }

    return token ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
