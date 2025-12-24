import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import api from '../services/api';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);

    const fetchExpenses = async () => {
        try {
            const response = await api.get('/expenses');
            // Assuming response.data is List<Expense>
            setExpenses(response.data);
        } catch (error) {
            console.error("Failed to fetch expenses", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this expense?")) return;
        try {
            await api.delete(`/expenses/${id}`);
            fetchExpenses();
        } catch (error) {
            console.error("Failed to delete expense", error);
            alert("Delete failed");
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 px-4 mb-6">My Expenses</h1>

                <div className="px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                        {/* Form Column */}
                        <ExpenseForm
                            onSuccess={() => { fetchExpenses(); setEditingExpense(null); }}
                            editingExpense={editingExpense}
                            onCancel={() => setEditingExpense(null)}
                        />
                    </div>
                    <div className="lg:col-span-3">
                        {/* Table Column */}
                        <ExpenseTable
                            expenses={expenses}
                            onDelete={handleDelete}
                            onEdit={(exp) => setEditingExpense(exp)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expenses;
