import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { AddUserService } from '@/modules/users/services/add-user/add-user.service';
import { FindAllUsersService } from '@/modules/users/services/find-all-users/find-all-users.service';
import { FindUserByIdService } from '@/modules/users/services/find-user-by-id/find-user-by-id.service';

export const providers = [
  UsersRepository,
  AddUserService,
  BcryptAdapter,
  FindAllUsersService,
  FindUserByIdService,
];