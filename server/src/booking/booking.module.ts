import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { Booking, BookingSchema } from './booking.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }])],
  providers: [BookingService, BookingResolver],
})
export class BookingModule {}
