import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StaffDocument = Staff & Document;

@Schema()
export class Staff {
  @Prop({ required: true })
  firstName: String;

  @Prop({ required: true })
  lastName: String;

  @Prop({
    required: true,
    enum: ['admin', 'receptionist', 'housekeeping', 'maintenance'],
  })
  role: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop()
  phone: string;

  @Prop({ default: Date.now })
  hireDate: Date;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
