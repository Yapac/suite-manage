import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookingFormDTO, BookingDTO, BookingInputDTO } from './booking.dto';
import { BookingService } from './booking.service';
import { Booking } from './booking.schema';
import { GuestInputDTO } from 'src/guest/guest.dto';

@Resolver(() => BookingDTO)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Query(() => [BookingDTO])
  async bookings(
    @Args('pastOnly', { type: () => Boolean, nullable: true })
    pastOnly?: boolean,
  ): Promise<Booking[]> {
    return this.bookingService.findAll(pastOnly);
  }

  @Query(() => BookingDTO)
  async booking(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Booking | null> {
    return this.bookingService.findOne(id);
  }

  @Mutation(() => BookingDTO)
  async createBooking(@Args('input') data: BookingFormDTO): Promise<Booking> {
    return this.bookingService.create(data);
  }

  @Mutation(() => BookingDTO)
  async updateBooking(
    @Args('input') input: BookingFormDTO,
  ): Promise<Booking | null> {
    const { id, update } = input;

    return this.bookingService.update(id, update);
  }

  @Mutation(() => BookingDTO)
  async deleteBooking(
    @Args('input') data: BookingInputDTO,
  ): Promise<Booking | null> {
    return this.bookingService.remove(data);
  }
}
