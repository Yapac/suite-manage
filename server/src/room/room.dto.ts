import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoomDTO {
  @Field(() => ID)
  id: string;

  @Field()
  number: string;

  @Field()
  type: string;

  @Field()
  pricePerNight: number;

  @Field()
  status: string;

  @Field({ nullable: true })
  description?: number;
}
