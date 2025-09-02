import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GuestDTO, GuestInputDTO, GuestFormDTO } from './guest.dto';
import { GuestService } from './guest.service';
import { Guest } from './guest.schema';

@Resolver(() => GuestDTO)
export class GuestResolver {
  constructor(private readonly guestService: GuestService) {}

  @Query(() => [GuestDTO])
  async guests(): Promise<Guest[]> {
    return this.guestService.findAll();
  }

  @Query(() => GuestDTO)
  async guest(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Guest | null> {
    return this.guestService.findOne(id);
  }

  @Mutation(() => GuestDTO)
  async createGuest(@Args('input') data: GuestFormDTO): Promise<Guest> {
    return this.guestService.create(data);
  }

  @Mutation(() => GuestDTO)
  async updateGuest(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: GuestInputDTO,
  ): Promise<Guest | null> {
    return this.guestService.update(id, data);
  }

  @Mutation(() => GuestDTO)
  async deleteGuest(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Guest | null> {
    return this.guestService.remove(id);
  }
}
