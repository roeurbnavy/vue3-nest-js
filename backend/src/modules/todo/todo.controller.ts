import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @ApiBearerAuth()
  @Post('create')
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto)
  }

  @ApiBearerAuth()
  @Get('fetchAll')
  findAll() {
    return this.todoService.findAll()
  }

  @ApiBearerAuth()
  @Get('findByUser/:id')
  findByUser(@Param('id') id: string) {
    return this.todoService.findByUser(id)
  }

  @ApiBearerAuth()
  @Get('getById/:id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id)
  }

  @ApiBearerAuth()
  @Patch('updateById/:id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto)
  }

  @ApiBearerAuth()
  @Delete('deleteById')
  deleteById(@Query('id') id: string) {
    console.log('id', id)
    return this.todoService.remove(id)
  }
}
