import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductRepository } from './products.repository';
import { ProductController } from './products.controller';

@Module({
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
})
export class ProductsModule {}
