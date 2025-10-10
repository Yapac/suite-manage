import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class StaffDTO {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  role: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  hireDate: Date;

  @Field({ nullable: true })
  avatar?: string; // new Base64 avatar
}

@InputType()
export class StaffInputDTO {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string; // ✅ raw password from client

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  hireDate?: Date;

  @Field({ nullable: true })
  avatar?: string; // new Base64 avatar
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field()
  role: string;
}

@InputType()
export class UpdateStaffInput {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => StaffInputDTO, { nullable: true })
  update?: StaffInputDTO;

  @Field(() => StaffInputDTO, { nullable: true })
  staff?: StaffInputDTO;
}
