import { Controller, Get, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async findAll() {
    return await this.customerService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.customerService.getCustomerById(id);
  }
}
