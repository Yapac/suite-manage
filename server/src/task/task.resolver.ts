import {
  Args,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { TaskDTO, TaskFormDTO, TaskInputDTO } from './task.dto';
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
  async tasks(
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    @Args('offset', { type: () => Int, nullable: true }) offset?: number,
    @Args('sortBy', { type: () => String, nullable: true }) sortBy?: string,
    @Args('order', { type: () => String, nullable: true })
    order?: 'asc' | 'desc',
  ): Promise<Task[]> {
    return this.taskService.findAll({ limit, offset, sortBy, order });
  }

  @Query(() => TaskDTO, { nullable: true })
  async task(@Args('id', { type: () => ID }) id: string): Promise<Task | null> {
    return this.taskService.findOne(id);
  }

  @Mutation(() => TaskDTO)
  async createTask(@Args('input') data: TaskFormDTO): Promise<Task> {
    const task = await this.taskService.create(data.task);
    this.pubSub.publish('taskCreated', { taskCreated: task });
    return task;
  }

  @Mutation(() => TaskDTO)
  async updateTask(@Args('input') input: TaskFormDTO): Promise<Task | null> {
    const { id, update } = input;

    const task = await this.taskService.update(id, update);
    if (task) {
      this.pubSub.publish('taskUpdated', { taskUpdated: task });
    }
    return task;
  }

  @Mutation(() => TaskDTO)
  async deleteTask(@Args('input') input: TaskFormDTO): Promise<Task | null> {
    const task = await this.taskService.remove(input.id);
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
