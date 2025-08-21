import { Field, ID, ObjectType } from '@nestjs/graphql';

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
