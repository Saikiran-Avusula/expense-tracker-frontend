import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ExpenseForm = ({ onSuccess, editingExpense, onCancel }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [categoryId, setCategoryId] = useState('');

    // We need categories for the dropdown
    const [categories, setCategories] = useState([]);

    // Populate form when editingExpense changes
    useEffect(() => {
        if (editingExpense) {
            setDescription(editingExpense.description);
            setAmount(editingExpense.amount);
            setExpenseDate(editingExpense.expenseDate);
            setCategoryId(editingExpense.category?.id || '');
        } else {
            setDescription('');
            setAmount('');
            setExpenseDate('');
            if (categories.length > 0) {
                setCategoryId(categories[0].id);
            }
        }
    }, [editingExpense, categories]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories');
                setCategories(res.data);
                if (res.data.length > 0) {
                    setCategoryId(res.data[0].id); // Default to first category
                }
            } catch (err) {
                console.error("Failed to load categories", err);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                description,
                amount: parseFloat(amount),
                expenseDate // Send as YYYY-MM-DD string
            };

            if (editingExpense) {
                // endpoint: PUT /api/expenses/{id}/category/{categoryId}
                await api.put(`/expenses/${editingExpense.id}/category/${categoryId}`, payload);
            } else {
                // endpoint: POST /api/expenses/{categoryId}
                await api.post(`/expenses/${categoryId}`, payload);
            }

            // Reset form
            setDescription('');
            setAmount('');
            setExpenseDate('');
            // Keep category selection or reset? Keep is better UX.

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Failed to add expense", error);
            alert("Failed to add expense");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">
                {editingExpense ? 'Edit Expense' : 'Add New Expense'}
            </h3>

            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                    required
                >
                    <option value="" disabled>Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                {categories.length === 0 && <p className="text-xs text-red-500">Please create a category first!</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                    type="number"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    required
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="flex space-x-2">
                <button
                    type="submit"
                    disabled={categories.length === 0}
                    className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-gray-400"
                >
                    {editingExpense ? 'Update' : 'Add'}
                </button>
                {editingExpense && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default ExpenseForm;
