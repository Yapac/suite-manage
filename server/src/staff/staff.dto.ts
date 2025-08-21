import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StaffDTO {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  role: string;

  @Field()
  email: string;

  @Field()
  passwordHash: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  hireDate: Date;
}
