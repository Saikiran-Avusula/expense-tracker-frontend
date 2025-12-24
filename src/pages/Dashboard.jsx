import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import SpendingChart from '../components/SpendingChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard = () => {
    const [summary, setSummary] = useState({ total: 0, byCategory: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userName = localStorage.getItem('userName') || 'User';

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth() + 1;

                const response = await api.get(`/expenses/month/${year}/${month}`);
                const expenses = response.data;

                const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

                const categoryMap = {};
                expenses.forEach(exp => {
                    const cat = exp.category || { name: 'Uncategorized', color: '#cbd5e1' };
                    if (!categoryMap[cat.name]) {
                        categoryMap[cat.name] = { name: cat.name, amount: 0, color: cat.color };
                    }
                    categoryMap[cat.name].amount += exp.amount;
                });

                setSummary({
                    total,
                    byCategory: Object.values(categoryMap)
                });
                setLoading(false);

            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
                setError("Failed to load dashboard data. Please try again later.");
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back, <span className="font-semibold text-indigo-600">{userName}</span>! Here's your spending summary.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 px-4 bg-white shadow rounded-lg mx-4">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                            Try refreshing
                        </button>
                    </div>
                ) : (
                    <div className="px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Summary Cards */}
                        <div className="space-y-6">
                            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-500">Total Expenses (This Month)</h3>
                                <p className="mt-2 text-4xl font-semibold text-indigo-600">
                                    ₹{summary.total.toFixed(2)}
                                </p>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-500 mb-4">Category Breakdown</h3>
                                {summary.byCategory.length === 0 ? (
                                    <p className="text-gray-400">No data available</p>
                                ) : (
                                    <ul className="divide-y divide-gray-200">
                                        {summary.byCategory.map((item, index) => (
                                            <li key={index} className="py-2 flex justify-between">
                                                <div className="flex items-center">
                                                    <span
                                                        className="w-3 h-3 rounded-full mr-2"
                                                        style={{ backgroundColor: item.color }}
                                                    ></span>
                                                    <span className="text-gray-700">{item.name}</span>
                                                </div>
                                                <span className="font-medium text-gray-900">₹{item.amount.toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div className="space-y-6">
                            <SpendingChart data={summary.byCategory} />

                            <div className="h-64 sm:h-80 w-full bg-white p-6 shadow rounded-lg">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Spending by Category (Bar Chart)</h3>
                                <ResponsiveContainer width="100%" height="90%">
                                    <BarChart data={summary.byCategory}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis tickFormatter={(value) => `₹${value}`} />
                                        <RechartsTooltip
                                            formatter={(value) => `₹${value.toFixed(2)}`}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                                            {summary.byCategory.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color || '#6366f1'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
