import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './completed-task.css';
import Footer from '../footer/footer';
import { FaGlobeAmericas } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function Home() {
    const [t, i18n] = useTranslation();

    const [lands, setLands] = useState([]);
    const [selectedLand, setSelectedLand] = useState('');

    const [searchQuery, setSearchQuery] = useState('');

    const [query, setQuery] = useState('');
    const [task, setTask] = useState([]);
    const [taskAssigned, setTaskAssigned] = useState([]);
    const [OngoingTasks, setOngoingTasks] = useState([]);


    const history = useHistory();

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    };


    useEffect(() => {

        axios.get('http://localhost:8080/service/master/landFindAll').then((response) => {
            setLands(response.data.extra);
            console.log("Lands : ", response.data.extra);
        });

        axios.get('http://localhost:8080/service/master/completed-tasks-with-names').then((response) => {
            setOngoingTasks(response.data.extra);
            console.log("Ongoing tasks : ", response.data.extra);

        });
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredTasks = task.filter((task) =>
        task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectedLand = (eventkey) => {
        setSelectedLand(eventkey);

        axios.post(`http://localhost:8080/service/master/findLandIdByName?name=${eventkey}`)
            .then((response) => {
                const landIdTask = response.data.extra;
                const taskLand = JSON.stringify(landIdTask);
                const landData = JSON.parse(taskLand);
                const landId = landData.landId;
                console.log('Selected Land Id :', landId);
                localStorage.setItem('SelectedLandId', landId);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    const handleChange = (event) => {
        setQuery(event.target.value);
    };
    const filteredTaskAssigned = Array.isArray(taskAssigned)
        ? taskAssigned.filter((task) => task.taskAssignedId)
        : [];

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
    };
    const handleTaskClick = (taskAssignedid) => {
        history.push(`/manageOngoingTask/${taskAssignedid}`);
        console.log("task assigned : ", taskAssignedid);
    };

    return (
        <div className="home-app-screen">
            <p className='main-heading'>{t('completedtasks')}</p>
            <div className="position-absolute top-0 end-0 mt-2 me-2">
                <Dropdown alignRight onSelect={handleLanguageChange}>
                    <Dropdown.Toggle variant="secondary" style={{ background: 'none', border: 'none' }}>
                        <FaGlobeAmericas style={{ color: 'white' }} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="en">English</Dropdown.Item>
                        <Dropdown.Item eventKey="sl">Sinhala</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className='drop-down-container'>
                <Dropdown onSelect={handleSelectedLand} className='custom-dropdown'>
                    <Dropdown.Toggle className='drop-down' id="dropdown-land">
                        {selectedLand || t('selectland')}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='drop-down-menu'>
                        {lands.map((land) => (
                            <div key={land.id}>
                                <Dropdown.Item eventKey={land.name}>{land.name}</Dropdown.Item>
                            </div>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <br />
            </div>

            <div className="task-list">
                {OngoingTasks.map((taskAssigned) => (
                    <div key={taskAssigned.id} className="task-card" onClick={() => handleTaskClick(taskAssigned.taskAssignedId)}>
                        <p>{taskAssigned.taskName} - {getFormattedDate(taskAssigned.taskStartDate)} - land {taskAssigned.landId}</p>
                    </div>
                ))}
            </div>

            <br />
            <br />
            <br />

            <Footer />
        </div>
    );
}

export default Home;