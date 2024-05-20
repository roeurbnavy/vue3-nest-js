import { Module } from '@nestjs/common'
import { CustomersService } from './customers.service'
import { CustomersController } from './customers.controller'
import { CustomerSchema } from './schema/customer.schema'
import { MongooseModule } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: 'pos_customers',
          useFactory: () => {
            const schema = CustomerSchema
            // Hook generate _id
            schema.pre('save', function () {
              this._id = new mongoose.Types.ObjectId().toString()
            })
            return schema
          },
        },
      ],
      'pos'
    ),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule { }
