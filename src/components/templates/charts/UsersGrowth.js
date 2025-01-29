"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




function UsersGrowth() {
    const data = [
        {
            name: '02/01/01',
            1402: 4000,
            1403: 2400,
            
        },
        {
            name: '02/02/01',
            1402: 3000,
            1403: 1398,
            
        },
        {
            name: '02/03/01',
            1402: 2000,
            1403: 9800,
            
        },
        {
            name: '02/04/01',
            1402: 2780,
            1403: 3908,
            
        },
        {
            name: '02/05/01',
            1402: 1890,
            1403: 4800,
            
        },
        {
            name: '02/06/01',
            1402: 2390,
            1403: 3800,
            
        },
        {
            name: '02/07/01',
            1402: 3490,
            1403: 4300,
            
        },
    ];
    return (
        <ResponsiveContainer width="100%" height="92%">
            <LineChart
                width={500}
                height={200}
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left:10,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="1403" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="left"ef type="monotone" dataKey="1402" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default UsersGrowth


