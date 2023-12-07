import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './report.css';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, LinearScale, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, Tooltip, Legend, LinearScale, TimeScale);


const EmployeePerfomnceReport = ({ dateRange }) => {
    const [perfomnceData, setPerfomnceData] = useState([]);

    useEffect(() => {
        const fetchPerfomnceData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/service/master/employee-perfomance', {
                    params: {
                        fromDate: dateRange.fromDate,
                        toDate: dateRange.toDate,
                    },
                });
                console.log(response.data);
                setPerfomnceData(response.data);
            } catch (error) {
                console.error('Error fetching employee perfomnce:', error);
            }
        };

        // Ensure fromDate is earlier than or equal to toDate
        if (dateRange.fromDate <= dateRange.toDate) {
            fetchPerfomnceData();
        }
    }, [dateRange]);


    const chartData = {
        labels: perfomnceData.map((item) => item.workDate),
        datasets: [...new Set(perfomnceData.map((item) => item.workerName))].map((workerName, index) => ({
            label: workerName,
            data: perfomnceData
                .filter((item) => item.workerName === workerName)
                .map((item) => ({ x: item.workDate, y: item.quantity })),
            fill: false,
            borderColor: `rgba(${index * 100}, 0, 0, 1)`, // Adjust color as needed
            borderWidth: 2,
            lineTension: 0.1,
        })),
    };

    const chartOptions = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'yyyy-MM-dd',
                    displayFormats: {
                        day: 'yyyy-MM-dd',
                    },
                },
                title: {
                    display: true,
                    text: 'Day',
                },
            },
            y: {
                type: 'linear',
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Quantity',
                },
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <>
            <div className='report-app-screen'>
                <h2>Employee Perfomnce Report</h2>
                <table className='attendance-table'>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Quantity</th>
                            <th>Worker</th>
                        </tr>
                    </thead>
                    <tbody>
                        {perfomnceData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.workDate}</td>
                                <td>{item.quantity}</td>
                                <td>{item.workerName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <div className='report-app-screen'>
                <div className='attendance-chart'>
                    <h2>Employee Perfomnce Chart</h2>
                    {perfomnceData.length > 0 ? (
                        <Line data={chartData} options={chartOptions} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            <br />
        </>
    );
};

export default EmployeePerfomnceReport;