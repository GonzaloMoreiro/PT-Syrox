import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { CreateProductDto } from '../dto/create-product.dto';

export function ApiCreateProduct() {
  return applyDecorators(
    ApiConsumes('application/json'),

    ApiOperation({
      summary: 'Crear un nuevo producto',
      description: 'Crea un producto nuevo en el sistema',
    }),

    ApiBody({
      type: CreateProductDto,
      description: 'Datos necesarios para crear un producto',
      examples: {
        example1: {
          summary: 'Ejemplo válido',
          value: {
            name: 'Producto A',
            price: 150.0,
            stock: 10,
            description: 'Descripción del producto A',
            categoryId: 'uuid-categoria-123',
          },
        },
      },
    }),

    ApiResponse({
      status: 201,
      description: 'Producto creado exitosamente',
      schema: {
        example: {
          id: 'uuid-producto-123',
          name: 'Producto A',
          price: 150.0,
          stock: 10,
          description: 'Descripción del producto A',
          categoryId: 'uuid-categoria-123',
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
          message: 'El nombre, precio, stock y categoryId son obligatorios',
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
