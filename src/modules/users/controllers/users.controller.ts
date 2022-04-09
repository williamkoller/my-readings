import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AddUserDto } from '@/modules/users/dtos/add-user.dto';
import { User } from '@/modules/users/schemas/user.schema';
import { AddUserService } from '@/modules/users/services/add-user/add-user.service';
import { FindAllUsersService } from '../services/find-all-users/find-all-users.service';
import { FindUserByIdService } from '../services/find-user-by-id/find-user-by-id.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadAvatarService } from '../services/upload-avatar/upload-avatar.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly addUSerService: AddUserService,
    private readonly findAllUsersService: FindAllUsersService,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly uploadAvatarService: UploadAvatarService,
  ) {}

  @Post()
  async store(@Body() addUserDto: AddUserDto): Promise<User> {
    return await this.addUSerService.newUser(addUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async index(): Promise<User[]> {
    return await this.findAllUsersService.findAll();
  }

  @Get(':_id')
  @UseGuards(JwtAuthGuard)
  async show(@Param('_id') _id: string): Promise<User> {
    return await this.findUserByIdService.findUserById(_id);
  }

  @Post('/:_id/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: any,
    @Param('_id') _id: string,
  ): Promise<{ avatar: string }> {
    const originalname = file.originalname.substr(-3);
    return await this.uploadAvatarService.upload(file, originalname, _id);
  }
}
