import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './module/categories/categories.module';
import { UsersModule } from './module/users/users.module';
import { UsersController } from './module/users/users.controller';
import { UsersService } from './module/users/users.service';
import { UsersRepository } from './module/users/users.repository';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './module/products/products.module';

@Module({
  imports: [CategoriesModule, UsersModule, PrismaModule, ProductsModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, UsersRepository],
})
export class AppModule {}
