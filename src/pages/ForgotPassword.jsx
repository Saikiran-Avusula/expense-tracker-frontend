import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/reset-password', {
                userEmail: formData.email,
                newPassword: formData.newPassword
            });
            setSuccess("Password reset successfully! Redirecting to login...");
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data || "Failed to reset password. Please check your email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Reset Password</h2>

                {error && <div className="p-3 bg-red-100 text-red-700 rounded text-sm text-center">{error}</div>}
                {success && <div className="p-3 bg-green-100 text-green-700 rounded text-sm text-center">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Enter your registered email"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            required
                            placeholder="••••••••"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            placeholder="••••••••"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 font-bold text-white rounded focus:outline-none transition duration-200 ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <div className="pt-4 text-center border-t border-gray-100">
                    <Link to="/login" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
