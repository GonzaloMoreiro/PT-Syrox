import { IsString, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUUID()
  categoryId: string;
}
