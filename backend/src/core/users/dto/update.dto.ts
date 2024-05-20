import { ApiProperty } from '@nestjs/swagger';

// @InputType()
// export class UserUpdateDto {
//   @IsNotEmpty()
//   @Field()
//   username: string;

//   @IsNotEmpty()
//   @Field()
//   name: string;

//   @IsEmail()
//   @Field()
//   email: string;
// }

export class UserUpdateDto {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly name: string;
}
