import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './summary.css';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, LinearScale, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, Tooltip, Legend, LinearScale, TimeScale);


const SummaryReport = ({ selectedLand }) => {
    const [landId, setLandId] = useState('');

    useEffect(() => {
        // Update the landId whenever selectedLand changes
        axios.post(`http://localhost:8080/service/master/findLandIdByName?name=${selectedLand}`)
            .then((response) => {
                const landIdTask = response.data.extra;
                const taskLand = JSON.stringify(landIdTask);
                const landData = JSON.parse(taskLand);
                const newLandId = landData.landId;
                console.log('Selected Land Id:', newLandId);
                localStorage.setItem('SelectedLandId', newLandId);
                setLandId(newLandId);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [selectedLand]);


    const [summaryData, setSummaryData] = useState([]);

    useEffect(() => {
        // Fetch summaryData when landId changes
        const fetchSummaryData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/service/master/summary/${landId}`);
                console.log(response.data);
                setSummaryData(response.data);
            } catch (error) {
                console.error('Error fetching employee summary:', error);
            }
        };

        fetchSummaryData();
    }, [landId]);

    return (
        <>
            <div className='report-app-screen'>
                <h2>Employee Summary Report</h2>
                <table className='attendance-table'>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Kg</th>
                            <th>Plucking Expenses</th>
                            <th>Other Expenses</th>
                            <th>Non-crew Expenses</th>
                            <th>Income</th>
                            <th>Profit</th>
                            <th>CIR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summaryData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.year}</td>
                                <td>{item.month}</td>
                                <td>{item.totalQuantity}</td>
                                <td>{item.PluckExpense}</td>
                                <td>{item.OtherExpenses}</td>
                                <td>{item.NonCrewExpenses}</td>
                                <td>{item.TotalIncome}</td>
                                <td>{item.Profit}</td>
                                <td>{item.CIR}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            {/* <div className='report-app-screen'>
                <div className='attendance-chart'>
                    <h2>Employee Summarye Chart</h2>
                    {summaryData.length > 0 ? (
                        <Line data={chartData} options={chartOptions} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div> */}
            <br />
        </>
    );
};

export default SummaryReport;