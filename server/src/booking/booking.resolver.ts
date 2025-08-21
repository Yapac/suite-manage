import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookingDTO } from './booking.dto';
import { BookingService } from './booking.service';
import { Booking } from './booking.schema';

@Resolver(() => BookingDTO)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Query(() => [BookingDTO])
  async bookings(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @Query(() => BookingDTO)
  async booking(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Booking | null> {
    return this.bookingService.findOne(id);
  }

  @Mutation(() => BookingDTO)
  async createBooking(@Args('data') data: Partial<Booking>): Promise<Booking> {
    return this.bookingService.create(data);
  }

  @Mutation(() => BookingDTO)
  async updateBooking(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: Partial<Booking>,
  ): Promise<Booking | null> {
    return this.bookingService.update(id, data);
  }

  @Mutation(() => BookingDTO)
  async deleteBooking(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Booking | null> {
    return this.bookingService.remove(id);
  }
}
