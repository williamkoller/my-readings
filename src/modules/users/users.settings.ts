import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { AwsService } from '../aws/services/aws.service';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users.repository';
import { AddUserService } from './services/add-user/add-user.service';
import { FindAllUsersService } from './services/find-all-users/find-all-users.service';
import { FindUserByEmailService } from './services/find-user-by-email/find-user-by-email.service';
import { FindUserByIdService } from './services/find-user-by-id/find-user-by-id.service';
import { UploadAvatarService } from './services/upload-avatar/upload-avatar.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/modules/users/schemas/user.schema';

export const imports = [
  MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema,
    },
  ]),
];
export const providers = [
  UsersRepository,
  AddUserService,
  BcryptAdapter,
  FindAllUsersService,
  FindUserByIdService,
  FindUserByEmailService,
  UploadAvatarService,
  AwsService,
];
export const controllers = [UsersController];
