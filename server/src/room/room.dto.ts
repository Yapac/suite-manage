import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class RoomDTO {
  @Field(() => ID)
  id: string;

  @Field()
  number: string;

  @Field()
  type: string;

  @Field()
  pricePerNight: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class RoomInputDTO {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  number?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  pricePerNight?: string;

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class RoomMutationDTO {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  number?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  pricePerNight?: number;

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class RoomFormDTO {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  room: RoomMutationDTO;

  @Field({ nullable: true })
  update: RoomMutationDTO;
}
