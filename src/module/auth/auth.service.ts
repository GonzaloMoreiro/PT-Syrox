import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userRepo: UsersRepository) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.userRepo.findByEmail(loginDto.email);

    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatches)
      throw new UnauthorizedException('Usuarion no encontrado');

    return { id: user.id, email: user.email };
  }
}
