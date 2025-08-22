import { Args, ID, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { StaffDTO, StaffInputDTO, LoginInput, AuthResponse } from './staff.dto';
import { StaffService } from './staff.service';
import { Staff } from './staff.schema';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

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
  async createStaff(@Args('data') data: StaffInputDTO): Promise<Staff> {
    return this.staffService.create(data);
  }

  @Mutation(() => StaffDTO)
  async updateStaff(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: StaffInputDTO,
  ): Promise<Staff | null> {
    return this.staffService.update(id, data);
  }

  @Mutation(() => StaffDTO)
  async deleteStaff(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Staff | null> {
    return this.staffService.remove(id);
  }

  // 🔑 Auth inside Staff
  @Mutation(() => AuthResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    return this.staffService.login(loginInput);
  }

  @Query(() => StaffDTO, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async me(@Context() context): Promise<StaffDTO | null> {
    const user = await this.staffService.me(context.req.user.sub);

    if (!user) {
      return null; // or throw new Error('User not found');
    }

    return {
      id: user.id.toString(), // map _id → id
      name: user.name,
      role: user.role,
      email: user.email,
      phone: user.phone,
      hireDate: user.hireDate,
    };
  }
}
