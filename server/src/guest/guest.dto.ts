import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GuestDTO {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  idDocument: string;

  @Field({ nullable: true })
  phone?: number;

  @Field({ nullable: true })
  email?: number;
}
