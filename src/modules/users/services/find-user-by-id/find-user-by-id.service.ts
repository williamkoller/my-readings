import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { User } from '@/modules/users/schemas/user.schema';

@Injectable()
export class FindUserByIdService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async findUserById(_id: string): Promise<User> {
    const userFound = await this.usersRepo.findById(_id);

    if (!userFound) {
      throw new NotFoundException('user not found');
    }

    return userFound;
  }
}
