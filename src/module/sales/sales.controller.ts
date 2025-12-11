import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from '@prisma/client';
import { CreateSaleDto } from './dto/createSale.dto';
import { ApiCreateSale } from './doc/createSale.doc';
import { UpdateSaleDto } from './dto/updateSale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  async findAll(): Promise<Sale[]> {
    return this.salesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Sale> {
    return this.salesService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateSaleDto) {
    return this.salesService.update(id, updateData);
  }

  @Post()
  @ApiCreateSale()
  async create(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.salesService.create(createSaleDto);
  }
}
