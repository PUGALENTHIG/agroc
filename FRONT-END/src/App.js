import React from 'react';
import { Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Detector } from 'react-detect-offline';
import './App.css';

import i18n from "i18next";
import { withTranslation } from "react-i18next";
import "./_translations/i18n";

import { submitCollection } from './_services/submit.service';
import { usrRoles } from './_services/common.service';
import { submitSets } from './components/UiComponents/SubmitSets';
import LazyLoading from './components/common_layouts/lazyloading';
import RoleBasedRouting from './components/common_layouts/rolebaserouting';

import SearchComponent from './components/search/search';
import SignInComponent from './components/signin/signin';
import NoMatchComponent from './components/nomatch/nomatch';
import ResetPassword from './components/resetPassword/ResetPassword';
import ConfirmationPassword from './components/resetPassword/ConfirmationPassword';
import DashboardComponent from './components/dashboard/dashboard';
import WorkerPage from './components/workerPage/workerpage';
import AddTaskType from './components/taskType/addTaskType';
import ManageTaskTypes from './components/taskType/managetasktypes';
import ManageWorkers from './components/workerPage/manageworkers';
import SideNavPage from './components/sideNav/SideNavPage';
import Navbar from './components/navBar/navbar';

import { loginAction } from './actions/auth/login_action';
import { languageAction } from './actions/auth/login_action';

import InsertLand  from './components/land/insert_land';
import ManageLands from './components/land/manage_lands';
import InsertLot from './components/lot/insert_lot';
import ManageLots from './components/lot/manage_lot';
import MenuButtons from './components/common_layouts/menubuttons';
import ManageIncome from './components/Income/manage_income';
import InsertIncome from './components/Income/insert_income';
import UpdateIncome from './components/Income/update_income';
import ViewCompletedTasks from './components/Task/view-completed-task';


import Login from './components/login/login';
import Alerts from './components/common_layouts/Alerts';
import AddExpenseType from './components/expenseType/add-expense-type';
import ManageExpenseTypes from './components/expenseType/manage-expense-type';
import Home from './components/home/home';
import AddTask from './components/Task/add-task'
import ManageTask from './components/Task/manage-task';
import ManageOngoingTask from './components/Task/manage-ongoing-task';

import AddSheduledTask from './components/Task/add-shedule-task';
// import ManageTaskSheduled from './components/Task/manage-task-shedule';

import HomeNewTasks from './components/home/home-new-tasks';
import Report from './components/Report/report';
import EmployeeAttendanceReport from './components/Report/employee-attendance-report';
import MonthlyCropReport from './components/Report/monthly-crop-report';
import CostYieldReport from './components/Report/other-cost-yield-report';
import EmployeePerfomnce from './components/Report/employee-perfomnce-report';
import CostBreakdownReport from './components/Report/cost-breakdown-report';
import SummaryReport from './components/Report/summary-report';
import CompletedTask from './components/Task/completed-task';

class App extends React.Component {
  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      dmode: (localStorage.getItem("pgdmode")?true:false), //dark mode
      cstat: null,
      signedobj: null,
    }
  }
  
  componentDidMount(){
    this._isMounted = true;

    if(this._isMounted){
      //add class d-mode if darkmode activated
      if(this.state.dmode){
        document.body.classList.add("d-mode");
      } else{
        document.body.classList.remove("d-mode");
      }
    }
    //this.getComStat(); //get online stat
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  //dark mode toggle
  dmodeToggle = () => {
    if(this.state.dmode){
      document.body.classList.remove("d-mode");
      localStorage.removeItem("pgdmode",true);
    } else{
      document.body.classList.add("d-mode");
      localStorage.setItem("pgdmode",true);
    }
    
    this.setState({
      dmode: !this.state.dmode
    });
  }
  //get b-end commiunication stat
  getComStat = () => {
    submitSets(submitCollection.checkstat, null).then(resp => {
      //console.log(resp);
      this.setState({cstat:resp});
    });
  }

  handleSignObj = (cobj) => {
    this.props.setSigninObj(cobj);
    console.log("test : ", cobj)
  }

  handleLangObj = (cobj) => {
    console.log(cobj);
    this.props.setLangObj(cobj);
  }
  
  render(){
    const isRTL = i18n.dir((this.props.langState?this.props.langState.languageDetails.code:"en"));
    //console.log(isRTL);
    return (
      <div className="App" dir={isRTL}>
        <Alerts/>
        <Detector  polling={{interval: 10000}} render={({ online }) => (
          <div className="netdown-main"><div className={"alert alert-dark netdown-warning "+(online ? "d-none" : "show-warning")}>
            You are currently {online ? "online" : "offline"}
          </div></div>
        )} />

        <LazyLoading setProdList={this.props.setProdList}/>
        <Switch>
          <RoleBasedRouting path="/resetPassword"><ResetPassword /></RoleBasedRouting>
          <RoleBasedRouting path="/confirmation"><ConfirmationPassword /></RoleBasedRouting>
          <RoleBasedRouting path="/add"><ConfirmationPassword /></RoleBasedRouting>

          <RoleBasedRouting path="/insertlot"><InsertLot /></RoleBasedRouting>
          <RoleBasedRouting path="/managelands"><ManageLands /></RoleBasedRouting>
          <RoleBasedRouting path="/managelots"><ManageLots /></RoleBasedRouting>
          <RoleBasedRouting path="/insertland"><InsertLand /></RoleBasedRouting>
          <RoleBasedRouting path="/manageIncome"><ManageIncome /></RoleBasedRouting>
          <RoleBasedRouting path="/insertIncome"><InsertIncome /></RoleBasedRouting>
          <RoleBasedRouting path="/updateIncome/:incomeId"><UpdateIncome /></RoleBasedRouting>
          <RoleBasedRouting path="navbar"><Navbar /></RoleBasedRouting>
          <RoleBasedRouting path="/signin"><SignInComponent /></RoleBasedRouting>

          <RoleBasedRouting path="/menubuttons"> <MenuButtons signedobj={this.props.signState} handleSignObj={this.handleSignObj}/></RoleBasedRouting>
          <RoleBasedRouting path="/addWorker"><WorkerPage /></RoleBasedRouting>
          <RoleBasedRouting path="/manageWorkers"><ManageWorkers /></RoleBasedRouting>
          <RoleBasedRouting path="/addTaskType"><AddTaskType /></RoleBasedRouting>
          <RoleBasedRouting path="/manageTaskType"><ManageTaskTypes /></RoleBasedRouting>
          <RoleBasedRouting path="/sideNavPage"><SideNavPage /></RoleBasedRouting>
          <RoleBasedRouting path="/addExpenseType"><AddExpenseType /></RoleBasedRouting>
          <RoleBasedRouting path="/manageExpenseType"><ManageExpenseTypes /></RoleBasedRouting>
          <RoleBasedRouting path="/home"><Home /></RoleBasedRouting>
          <RoleBasedRouting path="/addTask"><AddTask /></RoleBasedRouting>
          <RoleBasedRouting path="/manageTask"><ManageTask /></RoleBasedRouting>
          <RoleBasedRouting path="/manageOngoingTask/:taskAssignedid/:taskId"><ManageOngoingTask /></RoleBasedRouting> 
          <RoleBasedRouting path="/viewcompltedtasks"><ViewCompletedTasks /></RoleBasedRouting>
          <RoleBasedRouting path="/report"><Report /></RoleBasedRouting>

          <RoleBasedRouting path="/addsheduledtask"><AddSheduledTask /></RoleBasedRouting>
          {/* <RoleBasedRouting path="/manageTaskSheduled"><ManageTaskSheduled /></RoleBasedRouting> */}
          <RoleBasedRouting path="/completedTask/:taskAssignedid"><CompletedTask /></RoleBasedRouting>

          <RoleBasedRouting path="/homeNewTasks"><HomeNewTasks /></RoleBasedRouting>
          
          <RoleBasedRouting path="/employee-attendance-report"><EmployeeAttendanceReport /></RoleBasedRouting>
          <RoleBasedRouting path="/monthly-crop-report"><MonthlyCropReport /></RoleBasedRouting>
          <RoleBasedRouting path="/other-cost-yield-report"><CostYieldReport /></RoleBasedRouting>
          <RoleBasedRouting path="/employee-perfomnce-report"><EmployeePerfomnce /></RoleBasedRouting>
          <RoleBasedRouting path="/cost-breakdown-report"><CostBreakdownReport /></RoleBasedRouting>
          <RoleBasedRouting path="/summary-report"><SummaryReport /></RoleBasedRouting>

          <RoleBasedRouting path="/dashboard" exact roles={[usrRoles.CM]}><DashboardComponent/></RoleBasedRouting>

          <RoleBasedRouting exact path="/"><Login langobj={this.props.langState} handleSignObj={this.handleSignObj}/></RoleBasedRouting>


          <RoleBasedRouting><NoMatchComponent signedobj={this.props.signState} /></RoleBasedRouting>
        </Switch>
      </div> 
    );  
  }
  
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setSigninObj: (payload) => dispatch(loginAction(payload)),
  setLangObj: (payload) => dispatch(languageAction(payload))
});

export default withTranslation()(withRouter(connect(mapStateToProps,mapDispatchToProps)(App)));
