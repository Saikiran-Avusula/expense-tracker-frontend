import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

/**
 * SpendingChart Component
 * 
 * Friendly Explanation:
 * This component takes your "By Category" summary data and turns it into a beautiful Pie Chart.
 * 1. It receives a 'data' prop (an array of categories with their total amounts).
 * 2. It uses the 'color' from each category to color the slices.
 * 3. It's fully responsive, so it will look great on screens of all sizes.
 */
const SpendingChart = ({ data }) => {
    // If no data, show a friendly message
    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 italic">No expenses recorded for this month yet.</p>
            </div>
        );
    }

    return (
        <div className="h-64 sm:h-80 w-full bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Category Distribution</h3>
            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="amount"
                        nameKey="name"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color || '#cbd5e1'}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => `₹${value.toFixed(2)}`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingChart;
