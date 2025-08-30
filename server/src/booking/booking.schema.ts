import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Guest } from 'src/guest/guest.schema';
import { Room } from 'src/room/room.schema';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'Room', required: true })
  roomId: Room;

  @Prop({ type: Types.ObjectId, ref: 'Guest', required: true })
  guestId: Guest;

  @Prop({ required: true })
  checkIn: Date;

  @Prop({ required: true })
  checkOut: Date;

  @Prop()
  totalPrice: string;

  @Prop({
    default: 'cash',
    enum: ['credit-card', 'debit-card', 'cash', 'online'],
  })
  paymentType: string;

  @Prop({
    default: 'confirmed',
    enum: ['confirmed', 'checked-in', 'checked-out', 'cancelled'],
  })
  status: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
