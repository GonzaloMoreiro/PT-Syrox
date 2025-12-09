import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    const existing = await this.usersRepository.findByEmail(data.email);
    if (existing) {
      throw new BadRequestException('Email ya registrado');
    }

    return this.usersRepository.create(data);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  update(id: number, data: UpdateUserDto) {
    return this.usersRepository.update(id, data);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
