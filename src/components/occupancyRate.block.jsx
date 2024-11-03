import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Tag, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

export const OccupancyRate = () => {
    // Data for the chart
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Options for the chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Data',
            },
        },
    };

    return (
        <>
            <Box borderWidth={1} borderRadius={5} p={5} h={'420px'}>
                <Text fontSize={'25px'} fontWeight={'bold'} mb={5}>
                    Occupancy Rate
                </Text>
                <>
                    <Bar data={data} options={options} />
                </>
            </Box>
        </>
    )
}
