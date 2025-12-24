import React from 'react';

const ExpenseTable = ({ expenses, onDelete, onEdit }) => {
    return (
        <div className="flex flex-col mt-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {expenses.map((expense) => (
                                    <tr key={expense.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {expense.expenseDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {expense.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                                                style={{
                                                    backgroundColor: expense.category?.color ? expense.category.color + '20' : '#e0e7ff',
                                                    color: expense.category?.color || '#3730a3'
                                                }}
                                            >
                                                {expense.category ? expense.category.name : 'Unknown'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ₹{expense.amount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => onEdit(expense)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(expense.id)}
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

export default ExpenseTable;
