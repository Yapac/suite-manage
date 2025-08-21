import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GuestDocument = Guest & Document;

@Schema({ timestamps: true })
export class Guest {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  idDocument: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
