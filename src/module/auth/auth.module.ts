import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './auth.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, Auth],
})
export class AuthModule {}
