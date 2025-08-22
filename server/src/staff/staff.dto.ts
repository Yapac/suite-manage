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
  avatarUrl?: string;
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
  avatarUrl?: string;
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
}
