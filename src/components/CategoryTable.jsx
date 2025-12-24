import React from 'react';
import api from '../services/api';

const CategoryTable = ({ categories, onDelete, onEdit }) => {

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure? This might delete related expenses!")) return;
        try {
            await api.delete(`/categories/${id}`);
            if (onSuccess) onSuccess(); // Wait, I need to pass onSuccess or trigger the parent refresh via onDelete
            // Actually, the parent handles the state update.
            // But api.delete returns void/string.
        } catch (error) {
            console.error("Failed to delete", error);
        }
        // Ideally we call onDelete which does the API call + Refresh, OR we do API call here and tell parent to refresh.
        // Let's assume parent passed a handler that refreshes the list OR simply removes it from UI.
        // To be safe, let's let the parent handle the API call or we do it here and call 'onRefresh'.
        // Simplified: Parent passes 'fetchCategories' as 'onRefresh'.
    };

    // Correct pattern: Component purely UI? or Smart?
    // Let's make it Smart enough to call API, but simplest is to pass handler.
    // Let's stick to: Parent passes "onDelete" which is async and handles everything.

    return (
        <div className="flex flex-col mt-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Color
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Budget
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Delete</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: category.color }}></div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {category.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ₹{category.monthlyBudget || 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => onEdit(category)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(category.id)}
                                                className="text-red-600 hover:text-red-900">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryTable;
