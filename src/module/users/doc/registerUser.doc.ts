import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';

export function ApiCreateUser() {
  return applyDecorators(
    ApiConsumes('application/x-www-form-urlencoded'),

    ApiOperation({
      summary: 'Registrar un nuevo usuario',
      description:
        'Crea un nuevo usuario en el sistema. Este endpoint no requiere autenticación.',
    }),

    ApiBody({
      type: CreateUserDto,
      description: 'Datos necesarios para crear un usuario',
      examples: {
        example1: {
          summary: 'Ejemplo válido',
          value: {
            name: 'Gonzalo',
            email: 'gonza@example.com',
            password: '123456',
            address: 'Calle 123',
            phone: '1130456789',
          },
        },
      },
    }),

    ApiResponse({
      status: 201,
      description: 'Usuario creado exitosamente',
      schema: {
        example: {
          id: 'uuid-123',
          name: 'Gonzalo',
          email: 'gonza@example.com',
          address: 'Calle 123',
          phone: '1130456789',
          createdAt: '2025-12-09T13:00:00.000Z',
          updatedAt: '2025-12-09T13:00:00.000Z',
        },
      },
    }),

    ApiResponse({
      status: 400,
      description: 'Datos inválidos o email ya registrado',
      schema: {
        example: {
          statusCode: 400,
          message: 'Email ya registrado',
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
