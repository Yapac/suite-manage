import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room, RoomDocument } from './room.schema';
import { RoomFormDTO, RoomInputDTO, RoomMutationDTO } from './room.dto';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async create(data: RoomFormDTO): Promise<Room> {
    const room = new this.roomModel({
      ...data.room,
      pricePerNight: data.room.pricePerNight + ' DH',
    });
    return room.save();
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async findOne(id: string): Promise<Room | null> {
    return this.roomModel.findById(id).exec();
  }

  async update(id: string, data: RoomMutationDTO): Promise<Room | null> {
    return this.roomModel
      .findByIdAndUpdate(
        id,
        { ...data, pricePerNight: data.pricePerNight + ' DH' },
        { new: true },
      )
      .exec();
  }

  async remove(data: RoomInputDTO): Promise<Room | null> {
    return this.roomModel.findByIdAndDelete(data.id).exec();
  }
}
