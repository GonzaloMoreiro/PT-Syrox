import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { CreateSaleDto } from '../dto/createSale.dto';

export function ApiCreateSale() {
  return applyDecorators(
    ApiConsumes('application/json'),

    ApiOperation({
      summary: 'Crear una nueva venta',
      description:
        'Crea un pedido para un cliente con productos y cantidades específicas',
    }),

    ApiBody({
      type: CreateSaleDto,
      description: 'Datos necesarios para crear una venta',
      examples: {
        example1: {
          summary: 'Ejemplo válido',
          value: {
            userId: 'uuid-cliente-123',
            items: [
              { productId: 'uuid-producto-1', quantity: 2 },
              { productId: 'uuid-producto-2', quantity: 1 },
            ],
          },
        },
      },
    }),

    ApiResponse({
      status: 201,
      description: 'Venta creada exitosamente',
      schema: {
        example: {
          id: 'uuid-venta-123',
          userId: 'uuid-cliente-123',
          orderNumber: 'uuid-orden-456',
          total: 450.0,
          status: 'EN_PREPARACION',
          paymentStatus: 'PENDIENTE',
          items: [
            { productId: 'uuid-producto-1', quantity: 2, price: 100.0 },
            { productId: 'uuid-producto-2', quantity: 1, price: 250.0 },
          ],
          client: {
            id: 'uuid-cliente-123',
            name: 'Juan Perez',
          },
          createdAt: '2025-12-11T12:00:00.000Z',
          updatedAt: '2025-12-11T12:00:00.000Z',
        },
      },
    }),

    ApiResponse({
      status: 400,
      description: 'Datos inválidos',
      schema: {
        example: {
          statusCode: 400,
          message:
            'El userId es obligatorio o producto no encontrado / stock insuficiente',
          error: 'Bad Request',
        },
      },
    }),

    ApiResponse({
      status: 500,
      description: 'Error interno del servidor',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal server error',
        },
      },
    }),
  );
}
