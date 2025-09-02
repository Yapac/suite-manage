import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Guest, GuestDocument } from './guest.schema';
import { GuestInputDTO, GuestFormDTO } from './guest.dto';

@Injectable()
export class GuestService {
  constructor(
    @InjectModel(Guest.name) private GuestModel: Model<GuestDocument>,
  ) {}

  async create(data: GuestFormDTO): Promise<Guest> {
    const Guest = new this.GuestModel(data.guest);
    return Guest.save();
  }

  async findAll(): Promise<Guest[]> {
    return this.GuestModel.find().exec();
  }

  async findOne(id: string): Promise<Guest | null> {
    return this.GuestModel.findById(id).exec();
  }

  async update(id: string, data: GuestInputDTO): Promise<Guest | null> {
    return this.GuestModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<Guest | null> {
    return this.GuestModel.findByIdAndDelete(id).exec();
  }
}
