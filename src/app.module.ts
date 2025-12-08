import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { CategoriesModule } from './module/categories/categories.module';
import { UsersModule } from './module/users/users.module';
import { UsersController } from './module/users/users.controller';
import { UsersService } from './module/users/users.service';
import { Users } from './module/users/users.repository';
import { UsersModule } from './module/users/users.module';

@Module({
  imports: [AuthModule, CategoriesModule, UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, Users],
})
export class AppModule {}
