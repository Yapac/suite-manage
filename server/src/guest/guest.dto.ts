import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class GuestDTO {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  documentType: string;

  @Field()
  documentId: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;
}

@InputType()
export class GuestInputDTO {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  documentType?: string;

  @Field({ nullable: true })
  documentId?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;
}
