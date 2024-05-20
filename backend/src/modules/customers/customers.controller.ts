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
import { CustomersService } from './customers.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Customers From Pos')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @ApiBearerAuth()
  @Post('create')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto)
  }

  @ApiBearerAuth()
  @Get('getAll')
  findAll(@Query('limit') limit?: number) {
    limit = limit || 50
    return this.customersService.findAll(limit)
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id)
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customersService.update(+id, updateCustomerDto)
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id)
  }
}
