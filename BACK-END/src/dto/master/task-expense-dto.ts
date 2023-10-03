import { PaginationDto } from "../pagination-dto";
import { Status } from "../../enum/status";
import { TaskExpenseEntity } from "../../entity/master/task-expense-entity";
import { Double } from "typeorm";

export class TaskExpenseDto extends PaginationDto {
  private taskExpenseId: number;
  private value: Double;
  private createdDate: Date;
  private updatedDate: Date;
  private status: Status;
  private taskId: number;
  private expenseId: number;

  filViaRequest(body) {
    
    if (body.taskExpenseId) {
      this.taskExpenseId = body.taskExpenseId;
    }
    this.value = body.value;
    this.createdDate = body.createdDate;
    this.updatedDate = body.updatedDate;
    this.status= body.status;
    this.taskId = body.taskId;
    this.expenseId = body.expenseId;

    if (body.startIndex && body.maxResult) {
      this.setStartIndex(body.startIndex);
      this.setMaxResult(body.maxResult);
    }
  }

  filViaDbObject(TaskExpenseModel: TaskExpenseEntity) {
    this.taskExpenseId = TaskExpenseModel.taskExpenseId;
    this.value = TaskExpenseModel.value;
    this.createdDate = TaskExpenseModel.createdDate;
    this.updatedDate = TaskExpenseModel.updatedDate;
    this.status = TaskExpenseModel.status;
    this.taskId = TaskExpenseModel.taskId;  
    this.expenseId = TaskExpenseModel.expenseId;
  }

  public getTaskExpenseId(): number {
    return this.taskExpenseId;
  }

  public setTaskExpenseId(taskExpenseId: number): void {
    this.taskExpenseId = taskExpenseId;
  }

  public getValue(): Double {
    return this.value;
  }

  public setValue(value: Double): void {
    this.value = value;
  }

  public getcreatedDate(): Date {
    return this.createdDate;
  }

  public setcreatedDate(createdDate: Date): void {
    this.createdDate = createdDate;
  }

  public getUpdatedDate(): Date {
    return this.updatedDate;
  }

  public setUpdatedDate(updatedDate: Date): void {
    this.updatedDate = updatedDate;
  }

  public getStatus(): Status {
    return this.status;
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

  public getTaskId(): number {
    return this.taskId;
  }

  public setTaskId(taskId: number): void {
    this.taskId = taskId;
  }

  public getExpenseId(): number {
    return this.expenseId;
  }

  public setExpenseId(expenseId: number): void {
    this.expenseId = expenseId;
  }
}