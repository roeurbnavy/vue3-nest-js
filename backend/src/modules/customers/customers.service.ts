import { Injectable } from '@nestjs/common'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Customers } from './schema/customer.schema'

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel('pos_customers', 'pos')
    private readonly cusotmerModel: Model<Customers>
  ) { }

  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer'
  }

  async findAll(limit: number) {
    const res = await this.cusotmerModel.find({}).limit(limit).lean()
    return res
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`
  }

  remove(id: number) {
    return `This action removes a #${id} customer`
  }
}
