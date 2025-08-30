import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';
import { GuestDTO } from 'src/guest/guest.dto';
import { RoomDTO } from 'src/room/room.dto';

@ObjectType()
export class BookingDTO {
  @Field(() => ID)
  id: string;

  @Field(() => RoomDTO)
  roomId: string;

  @Field(() => GuestDTO)
  guestId: string;

  @Field()
  checkIn: Date;

  @Field()
  checkOut: Date;

  @Field({ nullable: true })
  totalPrice?: string;

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
  totalPrice?: string;

  @Field({ nullable: true })
  paymentType?: string;

  @Field({ nullable: true })
  status?: string;
}
