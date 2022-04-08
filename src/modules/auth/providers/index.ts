import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { FindUserByEmailService } from '@/modules/users/services/find-user-by-email/find-user-by-email.service';
import { AuthService } from '@/modules/auth/services/auth.service';
import { JwtStrategy } from '@/modules/auth/strategy/jwt.strategy';

export const providers = [
  AuthService,
  BcryptAdapter,
  JwtAdapter,
  FindUserByEmailService,
  JwtStrategy,
  UsersRepository,
];
