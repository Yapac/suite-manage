import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoomDTO, RoomInputDTO } from './room.dto';
import { RoomService } from './room.service';
import { Room } from './room.schema';

@Resolver(() => RoomDTO)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Query(() => [RoomDTO])
  async rooms(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Query(() => RoomDTO)
  async room(@Args('id', { type: () => ID }) id: string): Promise<Room | null> {
    return this.roomService.findOne(id);
  }

  @Mutation(() => RoomDTO)
  async createRoom(@Args('data') data: RoomInputDTO): Promise<Room> {
    return this.roomService.create(data);
  }

  @Mutation(() => RoomDTO)
  async updateRoom(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: RoomInputDTO,
  ): Promise<Room | null> {
    return this.roomService.update(id, data);
  }

  @Mutation(() => RoomDTO)
  async deleteRoom(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Room | null> {
    return this.roomService.remove(id);
  }
}
