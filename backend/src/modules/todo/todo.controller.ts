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
import { CurrentUser } from '@/common/decorator/currentUser.decorator'
import { clone } from 'lodash'

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @ApiBearerAuth()
  @Post('create')
  create(@Body() createTodoDto: CreateTodoDto, @CurrentUser() user: any) {
    const doc = clone(createTodoDto)
    doc.userId = user._id
    return this.todoService.create(doc)
  }

  @ApiBearerAuth()
  @Get('fetchAll')
  findAll() {
    return this.todoService.findAll()
  }

  @ApiBearerAuth()
  @Get('findByUser')
  findByUser(@CurrentUser() user: any) {
    return this.todoService.findByUser(user._id)
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
