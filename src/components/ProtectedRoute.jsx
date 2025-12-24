import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * 
 * Friendly Explanation:
 * Think of this as a "Bouncer" for your app's private pages. 
 * 1. It checks if there is a 'token' in the browser's localStorage.
 * 2. If the token exists, it lets the person through to the requested page (children).
 * 3. If no token is found, it automatically kicks them back to the /login page.
 */
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // No token found? Redirect to login!
        return <Navigate to="/login" replace />;
    }

    // Token exists? Render the protected page!
    return children;
};

export default ProtectedRoute;
