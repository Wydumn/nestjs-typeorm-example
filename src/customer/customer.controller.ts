import { Controller, Get, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async findAll() {
    return await this.customerService.getAll();
  }

  /**
   * /vip route should be above the /:id route for params access reason
   * WHERE clause route
   */
  @Get('/where')
  async findWithWhereClause() {
    return await this.customerService.getWhereQuery();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.customerService.getCustomerById(id);
  }
}
