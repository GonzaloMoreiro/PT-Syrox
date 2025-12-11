import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({
      include: { products: true },
    });
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  create(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: dto });
  }

  update(id: string, dto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
