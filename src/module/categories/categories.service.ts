import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(private repo: CategoriesRepository) {}

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  create(dto: CreateCategoryDto) {
    return this.repo.create(dto);
  }

  update(id: string, dto: UpdateCategoryDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.remove(id);
  }
}
