import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { User } from '@/modules/users/schemas/user.schema';

@Injectable()
export class FindUserByEmailService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async findUserByEmail(email: string): Promise<User> {
    const userFound = await this.usersRepo.findByEmail(email);

    if (!userFound) {
      throw new NotFoundException('user not found');
    }

    return userFound;
  }
}
