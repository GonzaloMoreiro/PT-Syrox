import { IsOptional, IsEnum } from 'class-validator';
import { SaleStatus, PaymentStatus } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSaleDto {
  @ApiPropertyOptional({
    enum: SaleStatus,
    description: 'Estado de la venta',
    example: SaleStatus.EN_PREPARACION,
  })
  @IsOptional()
  @IsEnum(SaleStatus)
  status?: SaleStatus;

  @ApiPropertyOptional({
    enum: PaymentStatus,
    description: 'Estado del pago',
    example: PaymentStatus.PENDIENTE,
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;
}
