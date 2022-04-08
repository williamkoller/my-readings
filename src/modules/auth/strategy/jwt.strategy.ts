import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPayloadType } from '@/modules/auth/types/auth-payload/auth-payload.type';
import { User } from '@/modules/users/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(JwtStrategy.name);
  constructor(private readonly usersRepo: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(authPayloadType: AuthPayloadType): Promise<User> {
    this.logger.log(`JwtStrategy => ${JSON.stringify(authPayloadType)}`);
    const user = await this.usersRepo.findById(authPayloadType.id);

    const validUser = async (): Promise<boolean> =>
      user._id == authPayloadType.id;

    if (!user && validUser()) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
