import { IsString, IsNotEmpty, IsArray, IsNumber, Min } from 'class-validator';

export class CreateSaleItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateSaleDto {
  @IsString()
  @IsNotEmpty()
  userId: string; // Cliente al que va el pedido

  @IsArray()
  items: CreateSaleItemDto[];
}
