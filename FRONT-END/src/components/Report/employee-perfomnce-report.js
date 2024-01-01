import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './report.css';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, LinearScale, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, Tooltip, Legend, LinearScale, TimeScale);


const EmployeePerfomnceReport = ({ dateRange: { fromDate, toDate }, selectedLand }) => {

    // const fromDate = dateRange.fromDate
    // const toDate = dateRange.toDate

    const [perfomnceData, setPerfomnceData] = useState([]);
    console.log("emp-per-rep : ", fromDate, toDate);


    useEffect(() => {

        const fetchPerfomnceData = async () => {
            try {
                const baseURL = 'http://localhost:8080/service/master/employee-perfomance';

                if (selectedLand) {
                    if (fromDate && toDate) {
                        const fetchURL = `${baseURL}?landId=${selectedLand}&fromDate=${fromDate}&toDate=${toDate}`
                        const response = await axios.get(fetchURL);
                        setPerfomnceData(response.data);

                    } else {
                        const fetchURL = `${baseURL}?landId=${selectedLand}`
                        const response = await axios.get(fetchURL);
                        setPerfomnceData(response.data);

                    }

                } else {
                    const fetchURL = fromDate && toDate ? `${baseURL}?fromDate=${fromDate}&toDate=${toDate}` : baseURL;
                    const response = await axios.get(fetchURL);
                    setPerfomnceData(response.data);
                }

            } catch (error) {
                console.error('Error fetching employee perfomnce:', error);
            }
        };

        fetchPerfomnceData();
    }, [fromDate, toDate, selectedLand]);

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
                    text: 'Quantity (Kg)',
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
                <div className='info-card'>
                    {fromDate && toDate && (
                        <p>Date Range : {fromDate} - {toDate}</p>
                    )}
                </div>
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
            
            <div className='report-app-screen'>
                <div className='attendance-chart'>
                    {perfomnceData.length > 0 ? (
                        <>
                            <h2>Employee Perfomnce Chart</h2> <br />

                            <Line data={chartData} options={chartOptions} />
                        </>
                    ) : (
                        <p className='reportnotfound'>
                            Data Not Found !
                        </p>
                    )}
                </div>
            </div >
            <br />
        </>
    );
};

export default EmployeePerfomnceReport;