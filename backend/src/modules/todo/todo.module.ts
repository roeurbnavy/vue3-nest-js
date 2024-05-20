import { Module } from '@nestjs/common'
import { TodoService } from './todo.service'
import { TodoController } from './todo.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { TodoSchema } from './schema/todo.schema'
import mongoose from 'mongoose'

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: 'todo',
          useFactory: () => {
            const schema = TodoSchema
            // Hook generate _id
            schema.pre('save', function () {
              this._id = new mongoose.Types.ObjectId().toString()
            })
            return schema
          },
        },
      ],
      'auth'
    ),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule { }
