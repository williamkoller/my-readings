import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { User } from '@/modules/users/schemas/user.schema';

@Injectable()
export class FindAllUsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepo.findAll();

    if (!users) {
      throw new NotFoundException('no record found.');
    }

    return users;
  }
}
