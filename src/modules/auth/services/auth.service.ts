import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter';
import { FindUserByEmailService } from '@/modules/users/services/find-user-by-email/find-user-by-email.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthInputDto } from '../dtos/auth-input/auth-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtAdapter: JwtAdapter,
    private readonly findUserByEmailService: FindUserByEmailService,
  ) {}

  async login(authInputDto: AuthInputDto): Promise<{ accessToken: string }> {
    const user = await this.findUserByEmailService.findUserByEmail(
      authInputDto.email,
    );

    const { password } = user;

    const passwordIsValid = await this.bcryptAdapter.compare(
      authInputDto.password,
      password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const accessToken = await this.jwtAdapter.encrypt(user);

    return {
      accessToken,
    };
  }
}
