import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { TaskInputDTO, TaskMutationDTO } from './task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(data: TaskInputDTO): Promise<Task> {
    const task = new this.taskModel(data);
    return task.save();
  }

  async findAll({
    limit,
    offset,
    sortBy,
    order,
  }: {
    limit?: number;
    offset?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<Task[]> {
    return this.taskModel
      .find()
      .populate('assignedTo')
      .sort(sortBy ? { [sortBy]: order === 'desc' ? -1 : 1 } : {})
      .skip(offset || 0)
      .limit(limit || 0)
      .exec();
  }

  async findOne(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).populate('assignedTo').exec();
  }

  async update(id: string, data: TaskMutationDTO): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<Task | null> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
