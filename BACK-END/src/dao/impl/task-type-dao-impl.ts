import { getConnection, Like } from "typeorm";
import { TaskTypeDto } from "../../dto/master/task-type-dto";
import { Status } from "../../enum/Status";
import { TaskTypeEntity } from "../../entity/master/task-type-entity";
import { TaskTypeDao } from "../task-type-dao";
import { CropEntity } from "../../entity/master/crop-entity";

/**
 * task data access layer
 * contain crud method
 */
export class TaskTypeDaoImpl implements TaskTypeDao {
  async save(taskDto: TaskTypeDto, cropModel: CropEntity): Promise<TaskTypeEntity> {
    let taskRepo = getConnection().getRepository(TaskTypeEntity);
    let taskModel = new TaskTypeEntity();

    taskModel.crop = cropModel;
    this.prepareTaskModel(taskModel, taskDto);
    let savedTask = await taskRepo.save(taskModel);
    return savedTask;
  }
  async update(taskDto: TaskTypeDto): Promise<TaskTypeEntity> {
    let taskRepo = getConnection().getRepository(TaskTypeEntity);
    let taskModel = await taskRepo.findOne(taskDto.getTaskTypeId());
    if (taskModel) {
      this.prepareTaskModel(taskModel, taskDto);
      let updatedModel = await taskRepo.save(taskModel);
      return updatedModel;
    } else {
      return null;
    }
  }
  async delete(taskDto: TaskTypeDto): Promise<TaskTypeEntity> {
    let taskRepo = getConnection().getRepository(TaskTypeEntity);
    let taskModel = await taskRepo.findOne(taskDto.getTaskTypeId());
    if (taskModel) {
      taskModel.status = Status.Offline;
      let updatedModel = await taskRepo.save(taskModel);
      return updatedModel;
    } else {
      return null;
    }
  }

  async findAll(taskDto: TaskTypeDto): Promise<TaskTypeEntity[]> {
    let taskRepo = getConnection().getRepository(TaskTypeEntity);
    let searchObject: any = this.prepareSearchObject(taskDto);
    let taskModel = await taskRepo.find({
      where: searchObject,
      skip: taskDto.getStartIndex(),
      take: taskDto.getMaxResult(),
      order:{id:"DESC"}
    });
    return taskModel;
  }

  async findCount(taskDto: TaskTypeDto): Promise<number> {
    let taskRepo = getConnection().getRepository(TaskTypeEntity);
    let searchObject: any = this.prepareSearchObject(taskDto);
    let taskModel = await taskRepo.count({ where: searchObject });
    return taskModel;
  }
  
  async findById(taskId: number): Promise<TaskTypeEntity> {
    let taskRepo = getConnection().getRepository(TaskTypeEntity);
    let taskModel = await taskRepo.findOne(taskId);
    return taskModel;
  }

  async findByName(taskName: String): Promise<TaskTypeEntity> {
    let taskRepo = getConnection().getRepository(TaskTypeEntity);
    let taskModel = await taskRepo.findOne({ where: { taskName: taskName, status: Status.Online } });
    return taskModel;
  }
  
  async prepareTaskModel(taskModel: TaskTypeEntity, taskDto: TaskTypeDto) {
    taskModel.taskName = taskDto.getTaskName();
    taskModel.createdDate = new Date();
    taskModel.updatedDate = new Date();
    taskModel.status = Status.Online;
  }
  prepareSearchObject(taskDto: TaskTypeDto): any {
    let searchObject: any = {};
    if (taskDto.getTaskName()) {
      searchObject.taskName = Like("%" + taskDto.getTaskName() + "%");
    }
    if (taskDto.getcreatedDate()) {
        searchObject.createdDate = Like("%" + taskDto.getcreatedDate() + "%");
    }
    if (taskDto.getUpdatedDate()) {
        searchObject.updatedDate = Like("%" + taskDto.getUpdatedDate() + "%");
    }
    searchObject.status = Status.Online;
    if (taskDto.getCropId()) {
        searchObject.cropId = Like("%" + taskDto.getCropId() + "%");
      }
    return searchObject;
  }
}
