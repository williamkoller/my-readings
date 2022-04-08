import { Decrypter, Encrypter } from '@/data/protocols/criptography';
import { VerifyTokenType } from '@/modules/auth/types/verify-token/verify-token.type';
import { User } from '@/modules/users/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type JwtPayloadType = {
  id: string;
  name: string;
  surname: string;
  email: string;
};

@Injectable()
export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly jwtService: JwtService) {}
  public async encrypt(user: User): Promise<string> {
    const jwtPayloadType: JwtPayloadType = {
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    };
    return this.jwtService.signAsync(jwtPayloadType);
  }

  public async decrypt(token: string): Promise<VerifyTokenType> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
