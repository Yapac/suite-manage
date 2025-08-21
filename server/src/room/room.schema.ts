import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  pricePerNight: number;

  @Prop({
    default: 'available',
    enum: ['available', 'booked', 'maintenance', 'cleaning'],
  })
  status: string;

  @Prop()
  description?: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
