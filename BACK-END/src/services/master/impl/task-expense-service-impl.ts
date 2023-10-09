import { CommonResponse } from "../../../common/dto/common-response";
import { TaskExpenseDao } from "../../../dao/task-expense-dao";
import { TaskExpenseDaoImpl } from "../../../dao/impl/task-expense-dao-impl";
import { TaskExpenseDto } from "../../../dto/master/task-expense-dto";
import { CommonResSupport } from "../../../support/common-res-sup";
import { ErrorHandlerSup } from "../../../support/error-handler-sup";
import { TaskExpenseService } from "../task-expense-service";

/**
 * taskExpense service layer
 *
 */
export class TaskExpenseServiceImpl implements TaskExpenseService {
  taskExpenseDao: TaskExpenseDao = new TaskExpenseDaoImpl();

  /**
   * save new taskExpense
   * @param taskExpenseDto
   * @returns
   */
  async save(taskExpenseDto: TaskExpenseDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // validation
      if (taskExpenseDto.getTaskExpenseId()) {
        // check name already have
        let nameTaskExpenseMode = await this.taskExpenseDao.findByName(taskExpenseDto.getTaskExpenseId());
        if (nameTaskExpenseMode) {
          return CommonResSupport.getValidationException("taskExpense Name Already In Use !");
        }
      } else {
        return CommonResSupport.getValidationException("taskExpense Name Cannot Be null !");
      }

      // save new taskExpense
      let newtaskExpense = await this.taskExpenseDao.save(taskExpenseDto);
      cr.setStatus(true);
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
  /**
   * update taskExpense
   * @param taskExpenseDto
   * @returns
   */
  async update(taskExpenseDto: TaskExpenseDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // validation
      if (taskExpenseDto.getValue()) {
        // check name already have
        let nameTaskExpenseMode = await this.taskExpenseDao.findByName(taskExpenseDto.getValue());
        if (nameTaskExpenseMode && nameTaskExpenseMode.id != taskExpenseDto.getTaskExpenseId()) {
          return CommonResSupport.getValidationException("taskExpense Name Already In Use !");
        }
      } else {
        return CommonResSupport.getValidationException("taskExpense Name Cannot Be null !");
      }

      // update taskExpense
      let updateTaskExpense = await this.taskExpenseDao.update(taskExpenseDto);
      if (updateTaskExpense) {
        cr.setStatus(true);
      } else {
        cr.setStatus(false);
        cr.setExtra("taskExpense Not Found !");
      }
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
  /**
   * delete taskExpense
   * not delete from db.just update its status as offline
   * @param taskExpenseDto
   * @returns
   */
  async delete(taskExpenseDto: TaskExpenseDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // delete taskExpense
      let deleteTaskExpense = await this.taskExpenseDao.delete(taskExpenseDto);
      if (deleteTaskExpense) {
        cr.setStatus(true);
      } else {
        cr.setStatus(false);
        cr.setExtra("taskExpense Not Found !");
      }
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
  /**
   * find all taskExpenses
   * @returns
   */
  async find(taskExpenseDto: TaskExpenseDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // find taskExpense
      let taskExpenses = await this.taskExpenseDao.findAll(taskExpenseDto);
      let taskExpenseDtoList = new Array();
      for (const taskExpenseModel of taskExpenses) {
        let taskExpenseDto = new TaskExpenseDto();
        taskExpenseDto.filViaDbObject(taskExpenseModel);
        taskExpenseDtoList.push(taskExpenseDto);
      }
      if (taskExpenseDto.getStartIndex() == 0) {
        let count = await this.taskExpenseDao.findCount(taskExpenseDto);
        cr.setCount(count);
      }
      cr.setStatus(true);
      cr.setExtra(taskExpenseDtoList);
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
  /**
   * find taskExpense by id
   * @param taskExpenseId
   * @returns
   */
  async findById(taskExpenseId: number): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // find taskExpense
      let taskExpense = await this.taskExpenseDao.findById(taskExpenseId);

      let taskExpenseDto = new TaskExpenseDto();
      taskExpenseDto.filViaDbObject(taskExpense);

      cr.setStatus(true);
      cr.setExtra(taskExpenseDto);
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
}