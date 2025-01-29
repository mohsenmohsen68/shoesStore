"use client"
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function GrowthRate() {
    const data = [
        {
            name: '02/01/01',
            "میزان فروش": 4000,
           
        },
        {
            name: '02/02/01',
            "میزان فروش": 3000,
            
        },
        {
            name: '02/03/01',
            "میزان فروش": 2000,
            
        },
        {
            name: '02/04/01',
            "میزان فروش": 2780,
           
        },
        {
            name: '02/05/01',
            "میزان فروش": 1890,
           
        },
        {
            name: '02/06/01',
            "میزان فروش": 2390,
            
        },
        {
            name: '02/07/01',
            "میزان فروش": 3490,
            
        },
    ]
    return (
        <ResponsiveContainer width="100%" height="92.7%">
            <AreaChart
                width={500}
                height={200}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="میزان فروش" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default GrowthRate


