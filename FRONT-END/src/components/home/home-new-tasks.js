import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './home.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import { Col, Form } from 'react-bootstrap';
import { FaGlobeAmericas, FaMapMarker } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { MdArrowBackIos } from "react-icons/md";
import { submitCollection } from '../../_services/submit.service';
import { submitSets } from '../UiComponents/SubmitSets';
import { connect } from 'react-redux';
import { setSelectedLandIdAction } from '../../actions/auth/land_action';

function HomeNewTasks({ setSelectedLandId, selectedLandId }) {
    const [t, i18n] = useTranslation();

    const [searchQuery, setSearchQuery] = useState('');

    const [query, setQuery] = useState('');
    const [task, setTask] = useState([]);
    const [taskAssigned, setTaskAssigned] = useState([]);
    const [landNames, setLandNames] = useState([]);
    const [landName, setLandName] = useState([]);

    const history = useHistory();

    useEffect(() => {
        submitSets(submitCollection.taskAssignedFindAll, false).then((response) => {
            setTaskAssigned(response);
            console.log("Task Assigned: ", response);
        });

        submitSets(submitCollection.taskFindAll, false).then((response) => {
            setTask(response.extra);
            console.log("Tasks : ", response.extra);
        });


    }, []);

    console.log("Task : ", task);

    const handleLandChange = (event) => {
        console.log("Land : ", event);
        setSelectedLandId(event);
    };

    useEffect(() => {
        submitSets(submitCollection.getlandbyid, "?landId=" + selectedLandId, true).then((res) => {
            setLandName(res.extra.name);
        });

    }, [submitCollection.manageland, selectedLandId]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredTasks = task.filter((task) =>
        task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCardClick = (taskId) => {
        localStorage.setItem('selectedTaskId', taskId);
        console.log("Selected Task ID: ", taskId);
        history.push(`/addTask`);
    };


    const handleChange = (event) => {
        setQuery(event.target.value);
    };
    const filteredTaskAssigned = Array.isArray(taskAssigned)
        ? taskAssigned.filter((task) => task.taskAssignedId)
        : [];

    return (
        <div className="home-app-screen">
            <Header/>

            <div className="drop-down-container" style={{ marginBottom: "-10px" }}>

                <div className='landsectioncover'>
                    <p className="landsection">
                        <FaMapMarker style={{ marginRight: '5px' }} />
                        Selected Land: {landName}
                    </p>
                </div>
                <div className='home-heading'>
                    <p>{t('newtask')}</p>
                </div>
            </div>

            <div className="task-list">
                {task.map((task) => (
                    <div key={task.id} className="task-card" onClick={() => handleCardClick(task.id)}>
                        <p>{task.taskName}</p>
                    </div>
                ))}
            </div>

            < br />
            <br />
            < br />
            <Footer />
        </div>
    );
}

const mapStateToProps = (state) => ({
    selectedLandId: state.selectedLandId,
});

const mapDispatchToProps = {
    setSelectedLandId: setSelectedLandIdAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeNewTasks);