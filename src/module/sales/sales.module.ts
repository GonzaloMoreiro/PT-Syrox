import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SalesRepository } from './sales.repository';

@Module({
  providers: [SalesService, SalesRepository],
  controllers: [SalesController],
})
export class SalesModule {}
