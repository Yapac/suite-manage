import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StaffDTO } from './staff.dto';
import { StaffService } from './staff.service';
import { Staff } from './staff.schema';

@Resolver(() => StaffDTO)
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  @Query(() => [StaffDTO])
  async staffs(): Promise<Staff[]> {
    return this.staffService.findAll();
  }

  @Query(() => StaffDTO)
  async staff(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Staff | null> {
    return this.staffService.findOne(id);
  }

  @Mutation(() => StaffDTO)
  async createStaff(@Args('data') data: Partial<Staff>): Promise<Staff> {
    return this.staffService.create(data);
  }

  @Mutation(() => StaffDTO)
  async updateStaff(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: Partial<Staff>,
  ): Promise<Staff | null> {
    return this.staffService.update(id, data);
  }

  @Mutation(() => StaffDTO)
  async deleteStaff(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Staff | null> {
    return this.staffService.remove(id);
  }
}
