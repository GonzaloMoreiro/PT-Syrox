import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
