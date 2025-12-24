import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CategoryForm from '../components/CategoryForm';
import CategoryTable from '../components/CategoryTable';
import api from '../services/api';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/categories/${id}`);
            fetchCategories(); // Refresh list
        } catch (error) {
            console.error("Failed to delete category", error);
            alert("Could not delete category");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 px-4 mb-6 text-2xl font-bold">Categories</h1>

                <div className="px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <CategoryForm
                            onSuccess={() => { fetchCategories(); setEditingCategory(null); }}
                            editingCategory={editingCategory}
                            onCancel={() => setEditingCategory(null)}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <CategoryTable
                            categories={categories}
                            onDelete={handleDelete}
                            onEdit={(cat) => setEditingCategory(cat)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
