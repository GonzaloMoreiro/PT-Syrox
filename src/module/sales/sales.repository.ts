import { Injectable } from '@nestjs/common';

import { Sale } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto } from './dto/createSale.dto';
import { UpdateSaleDto } from './dto/updateSale.dto';

@Injectable()
export class SalesRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener todas las ventas
  async findAll(): Promise<Sale[]> {
    return this.prisma.sale.findMany({
      include: {
        client: true,
        items: {
          include: { product: true },
        },
      },
    });
  }

  // Obtener venta por ID
  async findById(id: string): Promise<Sale | null> {
    return this.prisma.sale.findUnique({
      where: { id },
      include: {
        client: true,
        items: {
          include: { product: true },
        },
      },
    });
  }

  async create(data: CreateSaleDto): Promise<Sale> {
    // Validar que el cliente exista
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!user) throw new Error(`Cliente ${data.userId} no existe`);

    // Validar stock y obtener precios
    const itemsWithPrice = await Promise.all(
      data.items.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) throw new Error(`Producto ${item.productId} no existe`);
        if (product.stock < item.quantity)
          throw new Error(`Stock insuficiente para ${product.name}`);
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      }),
    );

    // Calcular total
    const total = itemsWithPrice.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Crear venta con items
    const sale = await this.prisma.sale.create({
      data: {
        userId: data.userId,
        total,
        items: {
          create: itemsWithPrice,
        },
      },
      include: {
        items: { include: { product: true } },
        client: true,
      },
    });

    // Descontar stock
    await Promise.all(
      itemsWithPrice.map((item) =>
        this.prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        }),
      ),
    );

    return sale;
  }

  async update(id: string, updateData: UpdateSaleDto): Promise<Sale> {
    return this.prisma.sale.update({
      where: { id },
      data: updateData,
      include: { client: true, items: true },
    });
  }
}
