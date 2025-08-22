import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class BookingDTO {
  @Field(() => ID)
  id: string;

  @Field()
  roomId: string;

  @Field()
  guestId: string;

  @Field()
  checkIn: Date;

  @Field()
  checkOut: Date;

  @Field({ nullable: true })
  totalPrice?: number;

  @Field({ nullable: true })
  paymentType?: string;

  @Field()
  status: string;
}

@InputType()
export class BookingInputDTO {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  roomId?: string;

  @Field({ nullable: true })
  guestId?: string;

  @Field({ nullable: true })
  checkIn?: Date;

  @Field({ nullable: true })
  checkOut?: Date;

  @Field({ nullable: true })
  totalPrice?: number;

  @Field({ nullable: true })
  paymentType?: string;

  @Field({ nullable: true })
  status?: string;
}
