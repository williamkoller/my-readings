import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { ConflictException, Injectable } from '@nestjs/common';
import { AddUserDto } from '@/modules/users/dtos/add-user.dto';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { User } from '@/modules/users/schemas/user.schema';

@Injectable()
export class AddUserService {
  constructor(
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly usersRepo: UsersRepository,
  ) {}

  async newUser(addUserDto: AddUserDto): Promise<User> {
    const userFound = await this.usersRepo.findByEmail(addUserDto.email);

    if (userFound) {
      throw new ConflictException('there is already a user with this email');
    }

    const newUserData = {
      ...addUserDto,
      password: await this.bcryptAdapter.hash(addUserDto.password),
    };

    return await this.usersRepo.add(newUserData);
  }
}
