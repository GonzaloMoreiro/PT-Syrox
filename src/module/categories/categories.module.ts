import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Categories } from './categories.repository';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, Categories],
})
export class CategoriesModule {}
