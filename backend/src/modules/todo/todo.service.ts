import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { Model } from 'mongoose'
import { Todo } from './schema/todo.schema'
import { CurrentUser } from '@/common/decorator/currentUser.decorator'

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('todo', 'auth')
    private readonly todoModel: Model<Todo>
  ) { }

  async create(createTodoDto: CreateTodoDto) {
    const doc = {
      title: createTodoDto.title,
      // des: createTodoDto.des,
      status: 'todo',
      statusDate: {
        todo: new Date(),
      },
      userId: createTodoDto.userId,
    }
    return await this.todoModel.create(doc)
  }

  async findAll() {
    return await this.todoModel.find({}).lean()
  }

  async findByUser(userId: string) {
    return await this.todoModel.find({ userId }).lean()
  }

  async findOne(id: string) {
    return await this.todoModel.findOne({ _id: id }).lean()
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const res = await this.todoModel.findOne({ _id: id }).lean()
    const doc = {
      title: updateTodoDto.title,
      // des: updateTodoDto.des,
      status: res?.status,
      statusDate: {
        todo: new Date()
        // updateTodoDto.date,
      },
    }
    return await this.todoModel.updateOne({ _id: id }, { $set: doc })
  }

  async remove(id: string) {
    return await this.todoModel.deleteOne({ _id: id })
  }
}
