import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddUserDto } from '@/modules/users/dtos/add-user.dto';
import { User } from '@/modules/users/schemas/user.schema';
import { AddUserService } from '@/modules/users/services/add-user/add-user.service';
import { FindAllUsersService } from '../services/find-all-users/find-all-users.service';
import { FindUserByIdService } from '../services/find-user-by-id/find-user-by-id.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly addUSerService: AddUserService,
    private readonly findAllUsersService: FindAllUsersService,
    private readonly findUserByIdService: FindUserByIdService,
  ) {}

  @Post()
  async store(@Body() addUserDto: AddUserDto): Promise<User> {
    return await this.addUSerService.newUser(addUserDto);
  }

  @Get()
  async index(): Promise<User[]> {
    return await this.findAllUsersService.findAll();
  }

  @Get(':_id')
  async show(@Param('_id') _id: string): Promise<User> {
    return await this.findUserByIdService.findUserById(_id);
  }
}
