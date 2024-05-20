import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  title: string

  @ApiProperty({ required: false })
  userId: string

  // @ApiProperty({ required: false })
  // des: string;

  // @ApiProperty()
  // date: Date;
}
