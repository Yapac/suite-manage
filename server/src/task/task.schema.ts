import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Room } from 'src/room/room.schema';
import { Staff } from 'src/staff/staff.schema';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [Types.ObjectId], ref: 'Staff', required: true })
  assignedTo: Staff[];

  @Prop({  
    required: true, 
    default: 'normal',  
    enum: ['normal', 'urgent', 'immediate'], 
  })
  priority: string;

  @Prop({ type: Types.ObjectId, ref: 'Room' })
  roomId: Room;

  @Prop({
    default: 'pending',
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
  })
  status: string;

  @Prop({ nullable: true })
  description?: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
