import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { TaskDTO, TaskInputDTO } from './task.dto';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { Inject } from '@nestjs/common';

import type { TypedPubSub } from 'src/pubsub.module';

@Resolver(() => TaskDTO)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    @Inject('PUB_SUB') private pubSub: TypedPubSub, // ✅ strongly typed
  ) {}

  @Query(() => [TaskDTO])
  async tasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Query(() => TaskDTO)
  async task(@Args('id', { type: () => ID }) id: string): Promise<Task | null> {
    return this.taskService.findOne(id);
  }

  @Mutation(() => TaskDTO)
  async createTask(@Args('data') data: TaskInputDTO): Promise<Task> {
    const task = await this.taskService.create(data);
    this.pubSub.publish('taskCreated', { taskCreated: task });
    return task;
  }

  @Mutation(() => TaskDTO)
  async updateTask(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: TaskInputDTO,
  ): Promise<Task | null> {
    const task = await this.taskService.update(id, data);
    if (task) {
      this.pubSub.publish('taskUpdated', { taskUpdated: task });
    }
    return task;
  }

  @Mutation(() => TaskDTO)
  async deleteTask(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Task | null> {
    const task = await this.taskService.remove(id);
    if (task) {
      this.pubSub.publish('taskDeleted', { taskDeleted: task });
    }
    return task;
  }

  // 🔥 Subscriptions
  @Subscription(() => TaskDTO)
  taskCreated() {
    return this.pubSub.asyncIterator<Task>('taskCreated'); // ✅ add generic type
  }

  @Subscription(() => TaskDTO)
  taskUpdated() {
    return this.pubSub.asyncIterator<Task>('taskUpdated');
  }

  @Subscription(() => TaskDTO)
  taskDeleted() {
    return this.pubSub.asyncIterator<Task>('taskDeleted');
  }
}
