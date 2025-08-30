import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GuestDocument = Guest & Document;

@Schema({ timestamps: true })
export class Guest {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  documentId: string;

  @Prop({
    default: 'id-card',
    enum: ['passport', 'id-card', 'driver-license'],
    required: true,
  })
  documentType: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
