import { Field, ID, ObjectType } from '@nestjs/graphql';

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
