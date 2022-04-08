import { User, UserSchema } from '@/modules/users/schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

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
