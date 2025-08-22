import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskDTO {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  assignedTo: string;

  @Field()
  roomId: string;

  @Field()
  status: string;
}

@InputType()
export class TaskInputDTO {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  assignedTo?: string;

  @Field({ nullable: true })
  roomId?: string;

  @Field({ nullable: true })
  status?: string;
}
