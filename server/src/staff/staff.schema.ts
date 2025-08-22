import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StaffDocument = Staff & Document;

@Schema()
export class Staff {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    enum: ['admin', 'receptionist', 'housekeeping', 'maintenance'],
  })
  role: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string; // ✅ only stored internally

  @Prop()
  phone: string;

  @Prop({ default: Date.now })
  hireDate: Date;

  @Prop({ nullable: true })
  avatarUrl?: string;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
