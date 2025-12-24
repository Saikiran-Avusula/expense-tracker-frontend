import React, { useState } from 'react';
import api from '../services/api';

const CategoryForm = ({ onSuccess, editingCategory, onCancel }) => {
    const [name, setName] = useState('');
    const [monthlyBudget, setMonthlyBudget] = useState('');
    const [color, setColor] = useState('#000000');

    // Populate form when editingCategory changes
    React.useEffect(() => {
        if (editingCategory) {
            setName(editingCategory.name);
            setMonthlyBudget(editingCategory.monthlyBudget || '');
            setColor(editingCategory.color || '#000000');
        } else {
            setName('');
            setMonthlyBudget('');
            setColor('#000000');
        }
    }, [editingCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name,
                monthlyBudget: monthlyBudget ? parseFloat(monthlyBudget) : null,
                color
            };

            if (editingCategory) {
                await api.put(`/categories/${editingCategory.id}`, payload);
            } else {
                await api.post('/categories', payload);
            }

            setName('');
            setMonthlyBudget('');
            setColor('#000000'); // Reset to default
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Failed to create category", error);
            alert("Failed to create category");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h3>
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Budget (Optional)</label>
                <input
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm p-1"
                />
            </div>
            <div className="flex space-x-2">
                <button
                    type="submit"
                    className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                    {editingCategory ? 'Update' : 'Add'}
                </button>
                {editingCategory && (
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

export default CategoryForm;
