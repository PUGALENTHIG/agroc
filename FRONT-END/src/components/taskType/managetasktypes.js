import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './managetasktypes.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import { FaSearch, FaMapMarker } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { submitCollection } from '../../_services/submit.service';
import { submitSets } from '../UiComponents/SubmitSets';
import { connect } from 'react-redux';
import { setSelectedLandIdAction } from '../../actions/auth/land_action';

function ManageTaskTypes({ setSelectedLandId, selectedLandId }) {

  const { t, i18n } = useTranslation();

  const [lands, setLands] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState([]);
  const [landNames, setLandNames] = useState([]);
  const [landName, setLandName] = useState([]);

  const history = useHistory();

  useEffect(() => {
    
    if (selectedLandId && selectedLandId !== "") {
      submitSets(submitCollection.getlandbyid, `?landId=${selectedLandId}`, true)
        .then((res) => {
          if (res && res.extra) {
            setLandName(res.extra.name || "All Lands");
          } else {
            setLandName("All Lands");
          }
        })
        .catch((error) => {
          console.error("Error fetching land by id:", error);
          setLandName("All Lands");
        });
    } else {
      setLandName("All Lands");
    }
  }, [submitCollection.manageland, selectedLandId]);

  useEffect(() => {

    submitSets(submitCollection.taskFindAll, true)
      .then((response) => {
        setTasks(response.extra);
        console.log("Tasks : ", response.extra);
      });

  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredTasks = tasks.filter((tasks) =>
    tasks.taskName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const AddTaskType = () => {
    history.push('/addTaskType')
  }

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="task-app-screen">
      <Header />
      <br />

      <div className='drop-down-container' style={{ marginTop: "-25px" }}>

        <div className='landsectioncover'>
          <p className="landsection">
            <FaMapMarker style={{ marginRight: '5px' }} />
            Selected Land: {landName}
          </p>
        </div>

        <p className="home-heading">{t('tasktypemanagement')}</p>

        <button className="add-task-type-button" onClick={AddTaskType}>
          {t('addtasktype')}
        </button>
      </div>
      <br />

      <div className="search">
        <div className="search-container">
          <div className="search-wrapper">
            <input
              className='search-field'
              type="text"
              placeholder={t('searchtasktypes')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="search-icon">
              <FaSearch />
            </div>
          </div>
        </div>
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-card">
            <p>{task.taskName}</p>
          </div>
        ))}
      </div>
      <br /><br /><br />
      <div className='footer-alignment'>
        <Footer />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedLandId: state.selectedLandId,
});

const mapDispatchToProps = {
  setSelectedLandId: setSelectedLandIdAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTaskTypes);
