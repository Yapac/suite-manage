import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StaffService } from './staff.service';
import { StaffResolver } from './staff.resolver';
import { Staff, StaffSchema } from './staff.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }]),
  ],
  providers: [StaffService, StaffResolver],
})
export class StaffModule {}
