import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UUIDType {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  // @IsUUID()
  id: string;
}
