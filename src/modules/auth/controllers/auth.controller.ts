import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthInputDto } from '@/modules/auth/dtos/auth-input/auth-input.dto';
import { AuthService } from '@/modules/auth/services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'sign In',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'user unauthorized.',
  })
  public async login(
    @Body() authInputDto: AuthInputDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.login(authInputDto);
  }
}
