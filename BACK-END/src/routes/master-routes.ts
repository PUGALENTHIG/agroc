import express, { Router } from "express";
import { authenticateToken } from "../middleware/auth-middleware";

var landController = require("../controllers/land-controller");
var workerController = require("../controllers/worker-controller");
var lotController = require("../controllers/lot-controller");
var cropController = require("../controllers/crop-controller");
var expenseController = require("../controllers/expense-controller");
var incomeController = require("../controllers/income-controller");
var taskTypeController = require("../controllers/task-type-controller");
var paymentController = require("../controllers/payment-controller")
var userController = require("../controllers/user-controller");
var taskAssignedController = require('../controllers/task-assigned-controller')
var taskExpenseController = require('../controllers/task-expense-controller')
var workAssignedController = require('../controllers/work-assigned-controller')
var taskCardController = require('../controllers/task-card-controller')
var reportController = require('../controllers/report-controller')

const router: Router = express.Router();

router.post("/login", userController.login);

//crop routes
router.post("/cropSave", cropController.save);
router.get('/cropNameFindByLandId/:landId', cropController.findCropNameByLandId);
/* router.post("/cropUpdate", cropController.update);
router.post("/cropDelete", cropController.delete);
router.post("/cropFindAll", cropController.findAll);
router.get("/cropFindById", cropController.findById); */

//expense routes
router.post("/expenseSave", expenseController.save);
//router.post("/expenseUpdate", expenseController.update);
//router.post("/expenseDelete", expenseController.delete);
router.get("/expenseFindAll", expenseController.findAll);
//router.get("/expenseFindById", expenseController.findById);
router.get('/find-by-type', expenseController.findIdByType);

//income routes
router.post("/incomeSave", incomeController.save);
router.put("/updatePrice/:incomeId", incomeController.updatePrice);
router.get("/incomeFindAll", incomeController.findAll);
router.get("/incomeFindById/:incomeId", incomeController.findById);
router.get("/incomeFindByLandId/:landId", incomeController.findByLandId);

//land routes
router.post("/landSave", landController.save);
router.get("/landFindAll", landController.findAll);
router.get("/landFind", landController.findById);
router.post('/findLandIdByName', landController.findLandIdByName);
router.get('/cropFindByLandId/:landId', landController.findCropIdByLandId);

//lot routes
router.post("/lotSave", lotController.save);
router.get("/lotFindAll", lotController.findAll);
router.get("/lotFindByLandId/:landId", lotController.findByLandId);
router.get("/findLotByLandId", lotController.findLotByLandID);

// worker routes
router.post("/workerSave", workerController.save);
router.post("/workerUpdate", workerController.update);
router.post("/workerDelete", workerController.delete);
router.post("/workerFindAll", workerController.findAll);
router.get("/workerFindById", workerController.findById);
router.post('/findWorkByLandId', workerController.findWorkByLandId);
router.post('/findWorkerIdByName', workerController.findWorkerIdByName);
router.get('/findWorkersByLandId', workerController.findByLandId);

// task-type routes
router.post("/taskSave", taskTypeController.save);
router.post("/taskUpdate", taskTypeController.update);
router.post("/taskDelete", taskTypeController.delete);
router.post("/taskFindAll", taskTypeController.findAll);
router.get("/taskFindById", taskTypeController.findById);
router.get('/findTaskNameById', taskTypeController.findTaskNameById);

// payment routes
router.post("/paymentSave", paymentController.save);
router.get('/findPaymentByWorkerId', paymentController.findByWorkerId);
router.post("/paymentUpdate", paymentController.update);
// router.post("/taskDelete", taskTypeController.delete);
// router.post("/taskFindAll", taskTypeController.findAll);
router.get("/paymentFindById", paymentController.findById);

// task-assigned routes
router.post("/task-assigned-save", taskAssignedController.save);
// router.post("/taskUpdate", taskTypeController.update);
// router.post("/taskDelete", taskTypeController.delete);
router.post("/taskAssignedFindAll", taskAssignedController.findAll);
router.get('/task-assigned', taskAssignedController.findByTaskId);
router.get("/taskAssignedFindById", taskAssignedController.findById);
router.get("/ongoing-tasks-with-names", taskAssignedController.getOngoingTasksWithTaskNames);
router.get("/completed-tasks-with-names", taskAssignedController.getCompletedTasksWithTaskNames);
router.post("/updateEndDate/:taskAssignedId", taskAssignedController.updateEndDate);
router.post("/updateSchedulStatus/:taskAssignedId", taskAssignedController.updateStatus);


// task-expense routes
router.post("/task-expense-save", taskExpenseController.save);
// router.post("/taskUpdate", taskTypeController.update);
// router.post("/taskDelete", taskTypeController.delete);
router.post("/taskexpenseFindAll", taskExpenseController.findAll);
router.get('/findByTaskAssignedId', taskExpenseController.findByTaskAssignedId);
// router.get("/taskFindById", taskTypeController.findById);

// work-assigned routes
router.post("/work-assigned-save", workAssignedController.save);
router.post("/work-assigned-update", workAssignedController.update);
router.delete("/work-assigned-delete/:workAssignedId", workAssignedController.delete);
router.post("/work-assigned-findAll", workAssignedController.findAll);
router.get("/work-assigned-details/:taskAssignedId", workAssignedController.getDetailsByTaskAssignedId);
router.delete('/work-assigned-delete/:workerId/:taskCardId', workAssignedController.deleteByWorkerAndTaskCardId);
router.post('/work-assigned-saveWorkDates', workAssignedController.saveWorkDates);


// task-card routes
router.post("/task-card-save", taskCardController.save);
router.post("/task-card-update", taskCardController.update);
router.get("/task-card-findAll", taskCardController.findAll);
router.get("/task-card-findById", taskCardController.findById);
router.get("/taskCardFindById", taskCardController.findTaskCardByTaskId);
router.post("/updateStatus", taskCardController.updateStatus);

//report routes
//employee-attendance report
router.get('/employee-attendance', reportController.getEmployeeAttendance);
//monthly-crop report
router.get('/monthly-crop-report', reportController.getMonthlyCropReport);
//other-cost-yield report
router.get('/other-cost-yield', reportController.getOtherCostYieldReport);
//employee-perfomance report
router.get('/employee-perfomance', reportController.getEmployeePerfomanceReport);
//cost-breakdown-linechart report
router.get('/cost-breakdown-line', reportController.getCostBreakdownLineReport);
//cost-breakdown-pie report
router.get('/cost-breakdown-pie', reportController.getgetCostBreakdownPieReport);
//daily weekly monthly summary report
router.get('/summary', reportController.getSummaryReport);
router.get('/summary-weekly', reportController.getWeeklySummaryReport);
router.get('/summary-daily', reportController.getDailySummaryReport);

module.exports = router;