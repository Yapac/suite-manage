import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { RoomDTO } from 'src/room/room.dto';
import { StaffDTO } from 'src/staff/staff.dto';

@ObjectType()
export class TaskDTO {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => [StaffDTO])
  assignedTo: string[];

  @Field(() => RoomDTO, { nullable: true })
  roomId: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  createdAt: Date;
}

@InputType()
export class TaskInputDTO {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field(() => ID, { nullable: true })
  assignedTo?: string;

  @Field(() => ID, { nullable: true })
  roomId?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class TaskMutationDTO {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field(() => [ID], { nullable: true })
  assignedTo?: string[];

  @Field(() => ID, { nullable: true })
  roomId?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class TaskFormDTO {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  task: TaskMutationDTO;

  @Field({ nullable: true })
  update: TaskMutationDTO;
}
