import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const userName = localStorage.getItem('userName') || 'User';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <nav className="bg-indigo-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="text-xl font-bold tracking-wide">
                            Expense Tracker & Budget Manager
                        </Link>
                        {/* Desktop Links */}
                        <div className="hidden md:flex ml-10 items-baseline space-x-4">
                            <Link to="/dashboard" className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                            <Link to="/expenses" className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">Expenses</Link>
                            <Link to="/categories" className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">Categories</Link>
                        </div>
                    </div>

                    {/* Desktop Logout & Greeting */}
                    <div className="hidden md:flex items-center space-x-4">
                        <span className="text-sm font-medium text-indigo-100">Hi, {userName}!</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-medium transition duration-200"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md hover:bg-indigo-700 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isOpen && (
                <div className="md:hidden bg-indigo-700 px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block hover:bg-indigo-800 px-3 py-2 rounded-md text-base font-medium"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/expenses"
                        onClick={() => setIsOpen(false)}
                        className="block hover:bg-indigo-800 px-3 py-2 rounded-md text-base font-medium"
                    >
                        Expenses
                    </Link>
                    <Link
                        to="/categories"
                        onClick={() => setIsOpen(false)}
                        className="block hover:bg-indigo-800 px-3 py-2 rounded-md text-base font-medium"
                    >
                        Categories
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left block bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-base font-medium mt-4"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
