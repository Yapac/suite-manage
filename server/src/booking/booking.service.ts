import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking, BookingDocument } from './booking.schema';
import {
  BookingFormDTO,
  BookingInputDTO,
  BookingMutationDTO,
} from './booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async create(data: BookingFormDTO): Promise<Booking> {
    const [checkIn, checkOut]: any = data.booking.checkDates;

    const booking = new this.bookingModel({
      ...data.booking,
      totalPrice: data.booking.totalPrice + ' DH',
      checkIn,
      checkOut,
    });
    return (await (await booking.save()).populate('roomId')).populate(
      'guestId',
    );
  }
  async update(id: string, data: BookingMutationDTO): Promise<Booking | null> {
    const [checkIn, checkOut]: any = data.checkDates;

    const bookingS: any = {
      ...data,
      totalPrice: data.totalPrice + ' DH',
      checkIn,
      checkOut,
    };

    return this.bookingModel
      .findByIdAndUpdate(id, bookingS, { new: true })
      .populate('roomId')
      .populate('guestId')
      .exec();
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

  async remove(data: BookingInputDTO): Promise<Booking | null> {
    return this.bookingModel.findByIdAndDelete(data.id).exec();
  }
}
