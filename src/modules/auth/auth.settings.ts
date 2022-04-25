import { AuthController } from '@/modules/auth/controllers/auth.controller';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { FindUserByEmailService } from '@/modules/users/services/find-user-by-email/find-user-by-email.service';
import { AuthService } from '@/modules/auth/services/auth.service';
import { JwtStrategy } from '@/modules/auth/strategy/jwt.strategy';
import { User, UserSchema } from '@/modules/users/schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

export const controllers = [AuthController];

export const imports = [
  MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema,
    },
  ]),
  PassportModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      defaultStrategy: configService.get<string>('defaultStrategy'),
      property: configService.get<string>('property'),
      session: configService.get<string>('session'),
    }),
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('secret'),
      signOptions: {
        expiresIn: configService.get('expiresIn'),
      },
    }),
  }),
];

export const providers = [
  AuthService,
  BcryptAdapter,
  JwtAdapter,
  FindUserByEmailService,
  JwtStrategy,
  UsersRepository,
];
