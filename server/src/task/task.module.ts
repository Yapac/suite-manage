import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { Task, TaskSchema } from './task.schema';
import { PubSubModule } from 'src/pubsub.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    PubSubModule,
  ],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
