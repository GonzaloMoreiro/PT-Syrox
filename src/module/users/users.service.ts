import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async registerUser(data: CreateUserDto) {
    const existing = await this.usersRepository.findByEmail(data.email);
    if (existing) {
      throw new BadRequestException('Email ya registrado');
    }
    const { password, ...rest } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersRepository.registerUser({
      ...rest,
      password: hashedPassword,
    });
  }

  async findAllUser(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.findAllUser();
    return users.map(({ password, ...rest }) => rest);
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const { password, ...rest } = user;
    return rest;
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.usersRepository.update(id, data);
  }

  async remove(id: string) {
    return await this.usersRepository.delete(id);
  }
}
