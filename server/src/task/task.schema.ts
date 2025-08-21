import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop()
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Staff', required: true })
  assignedTo: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Room' })
  roomId: Types.ObjectId;

  @Prop({
    default: 'pending',
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
  })
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
