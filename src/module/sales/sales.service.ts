import { Injectable, NotFoundException } from '@nestjs/common';
import { SalesRepository } from './sales.repository';
import { Sale } from '@prisma/client';
import { CreateSaleDto } from './dto/createSale.dto';
import { UpdateSaleDto } from './dto/updateSale.dto';

@Injectable()
export class SalesService {
  constructor(private readonly salesRepository: SalesRepository) {}

  async findAll(): Promise<Sale[]> {
    return this.salesRepository.findAll();
  }

  async findById(id: string): Promise<Sale> {
    const sale = await this.salesRepository.findById(id);
    if (!sale) throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    return sale;
  }

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.salesRepository.create(createSaleDto);
  }

  async update(id: string, updateData: UpdateSaleDto): Promise<Sale> {
    const sale = await this.salesRepository.findById(id);
    if (!sale) throw new NotFoundException('Venta no encontrada');

    return this.salesRepository.update(id, updateData);
  }
}
