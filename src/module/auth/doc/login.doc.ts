import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';

export function ApiLogin() {
  return applyDecorators(
    ApiConsumes('application/x-www-form-urlencoded'),

    ApiOperation({
      summary: 'Iniciar sesión',
      description:
        'Autentica un usuario y devuelve un token de acceso si las credenciales son correctas. Este endpoint no requiere autenticación previa.',
    }),

    ApiBody({
      type: LoginDto,
      description: 'Datos necesarios para iniciar sesión',
      examples: {
        validExample: {
          summary: 'Ejemplo válido',
          value: {
            email: 'gonza@example.com',
            password: '123456',
          },
        },
      },
    }),

    ApiResponse({
      status: 200,
      description: 'Inicio de sesión exitoso',
      schema: {
        example: {
          accessToken: 'jwt-token-ejemplo-123',
          user: {
            id: 'uuid-123',
            name: 'Gonzalo',
            email: 'gonza@example.com',
          },
        },
      },
    }),

    ApiResponse({
      status: 401,
      description: 'Credenciales incorrectas',
      schema: {
        example: {
          statusCode: 401,
          message: 'Email o contraseña incorrectos',
          error: 'Unauthorized',
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
