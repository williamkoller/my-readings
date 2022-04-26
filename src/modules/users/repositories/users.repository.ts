import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@/modules/users/schemas/user.schema';
import { Model } from 'mongoose';
import { propertyFalseMongo } from '@/utils/property-false-mongo';
import { AddUserDto } from '@/modules/users/dtos/add-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async add(addUserDto: AddUserDto): Promise<User> {
    const userCreated = new this.userModel(addUserDto, propertyFalseMongo);
    return userCreated.save();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne(
      { email: { $eq: email } },
      propertyFalseMongo,
    );
  }

  async findById(_id: string): Promise<User> {
    return await this.userModel.findOne(
      { _id: { $eq: _id } },
      propertyFalseMongo,
    );
  }

  async findAll(): Promise<User[]> {
    return await this.userModel
      .find({}, propertyFalseMongo)
      .select('-password');
  }

  async uploadFile(_id: string, avatar: string): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { _id: { $eq: _id } },
      {
        avatar: { $eq: avatar },
        updatedAt: Date.now(),
      },
      {
        new: true,
        propertyFalseMongo,
      },
    );
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { _id: { $eq: _id } },
      { $regex: `/${updateUserDto}/` },
      {
        new: true,
        propertyFalseMongo,
      },
    );
  }
}
