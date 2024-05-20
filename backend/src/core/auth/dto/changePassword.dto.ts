import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly currentPassword: string;
  @ApiProperty()
  readonly password: string;
}
