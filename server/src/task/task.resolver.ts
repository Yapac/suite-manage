import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskDTO } from './task.dto';
import { TaskService } from './task.service';
import { Task } from './task.schema';

@Resolver(() => TaskDTO)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [TaskDTO])
  async tasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Query(() => TaskDTO)
  async task(@Args('id', { type: () => ID }) id: string): Promise<Task | null> {
    return this.taskService.findOne(id);
  }

  @Mutation(() => TaskDTO)
  async createTask(@Args('data') data: Partial<Task>): Promise<Task> {
    return this.taskService.create(data);
  }

  @Mutation(() => TaskDTO)
  async updateTask(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: Partial<Task>,
  ): Promise<Task | null> {
    return this.taskService.update(id, data);
  }

  @Mutation(() => TaskDTO)
  async deleteTask(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Task | null> {
    return this.taskService.remove(id);
  }
}
