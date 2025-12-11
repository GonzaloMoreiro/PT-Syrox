import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiLogin } from './doc/login.doc';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiLogin()
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto);
  }
}
