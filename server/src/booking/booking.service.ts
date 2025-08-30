import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking, BookingDocument } from './booking.schema';
import { BookingInputDTO } from './booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async create(data: BookingInputDTO): Promise<Booking> {
    const booking = new this.bookingModel(data);
    return (await (await booking.save()).populate('roomId')).populate(
      'guestId',
    );
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel
      .find()
      .populate('roomId')
      .populate('guestId')
      .exec();
  }

  async findOne(id: string): Promise<Booking | null> {
    return this.bookingModel
      .findById(id)
      .populate('roomId')
      .populate('guestId')
      .exec();
  }

  async update(id: string, data: BookingInputDTO): Promise<Booking | null> {
    return this.bookingModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<Booking | null> {
    return this.bookingModel.findByIdAndDelete(id).exec();
  }
}
