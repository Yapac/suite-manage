import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Staff, StaffDocument } from './staff.schema';
import { StaffInputDTO, LoginInput } from './staff.dto';

type StaffUpdate = Partial<Omit<Staff, 'passwordHash'>> & { password?: string };

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name) private staffModel: Model<StaffDocument>,
    private jwtService: JwtService,
  ) {}

  async create(data: StaffInputDTO): Promise<Staff> {
    const passwordHash = data.password
      ? await bcrypt.hash(data.password, 10)
      : '';

    const staff = new this.staffModel({
      ...data,
      passwordHash,
    });
    return staff.save();
  }

  async findAll(): Promise<Staff[]> {
    return this.staffModel.find().exec();
  }

  async findOne(id: string): Promise<Staff | null> {
    return this.staffModel.findById(id).exec();
  }

  async update(id: string, data: StaffUpdate): Promise<Staff | null> {
    const updateData: Partial<Staff> = { ...data } as any;

    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    return this.staffModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Staff | null> {
    return this.staffModel.findByIdAndDelete(id).exec();
  }

  async login(loginInput: LoginInput) {
    const staff = await this.staffModel
      .findOne({ email: loginInput.email })
      .exec();

    if (!staff) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(
      loginInput.password,
      staff.passwordHash,
    );
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: staff.id, email: staff.email, role: staff.role };
    return {
      accessToken: this.jwtService.sign(payload),
      role: staff.role,
    };
  }

  async me(userId: string): Promise<StaffDocument | null> {
    return this.staffModel.findById(userId).exec();
  }
}
