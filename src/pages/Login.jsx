import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // POST /api/auth/login
            // Expects: { userEmail, userPassword }
            const response = await api.post('/auth/login', {
                userEmail: formData.email,
                userPassword: formData.password
            });

            // Response: { token: "...", userName: "...", userEmail: "..." }
            const { token, userName, userEmail } = response.data;

            // Store details in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userName', userName);
            localStorage.setItem('userEmail', userEmail);

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <Link to="/forgot-password" title="Coming soon!" className="text-xs text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
