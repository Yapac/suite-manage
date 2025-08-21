import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Staff, StaffDocument } from './staff.schema';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name) private staffModel: Model<StaffDocument>,
  ) {}

  async create(data: Partial<Staff>): Promise<Staff> {
    const staff = new this.staffModel(data);
    return staff.save();
  }

  async findAll(): Promise<Staff[]> {
    return this.staffModel.find().exec();
  }

  async findOne(id: string): Promise<Staff | null> {
    return this.staffModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Staff>): Promise<Staff | null> {
    return this.staffModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<Staff | null> {
    return this.staffModel.findByIdAndDelete(id).exec();
  }
}
