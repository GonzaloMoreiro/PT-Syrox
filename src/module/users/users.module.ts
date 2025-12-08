import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Users],
})
export class UsersModule {}
