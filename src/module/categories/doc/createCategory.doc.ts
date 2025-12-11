import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { CreateCategoryDto } from '../dto/createCategory.dto';

export function ApiCreateCategory() {
  return applyDecorators(
    ApiConsumes('application/json'),

    ApiOperation({
      summary: 'Crear una nueva categoría',
      description:
        'Este endpoint permite crear una nueva categoría en el sistema.',
    }),

    ApiBody({
      type: CreateCategoryDto,
      description: 'Datos necesarios para crear una categoría',
      examples: {
        example1: {
          summary: 'Ejemplo válido',
          value: {
            name: 'Electrónica',
          },
        },
      },
    }),

    ApiResponse({
      status: 201,
      description: 'Categoría creada exitosamente',
      schema: {
        example: {
          id: 'uuid-categoria-123',
          name: 'Electrónica',
        },
      },
    }),

    ApiResponse({
      status: 400,
      description: 'Datos inválidos o categoría ya existente',
      schema: {
        example: {
          statusCode: 400,
          message: 'El nombre de la categoría ya existe',
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
