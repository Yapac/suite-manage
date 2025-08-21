import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'Room', required: true })
  roomId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Guest', required: true })
  guestId: Types.ObjectId;

  @Prop({ required: true })
  checkIn: Date;

  @Prop({ required: true })
  checkOut: Date;

  @Prop()
  totalPrice: number;

  @Prop()
  paymentType: string;

  @Prop({
    default: 'confirmed',
    enum: ['confirmed', 'checked-in', 'checked-out', 'cancelled'],
  })
  status: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
