import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
  @ApiProperty()
  readonly username: string

  @ApiProperty()
  readonly name: string

  @ApiProperty()
  readonly password: string

  @ApiProperty()
  readonly passwordConfirmation: string

  @ApiProperty()
  readonly roles: string[]
}
