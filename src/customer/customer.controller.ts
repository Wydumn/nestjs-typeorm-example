import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async findAll() {
    return await this.customerService.getAll();
  }

  @Get('/having')
  async queryWithHaving() {
    return await this.customerService.queryWithHaving();
  }

  @Get('/union')
  async findWithUnion() {
    return await this.customerService.getUnionQuery();
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

  @Post()
  async createOne(@Body() createCustomerDTOs: CreateCustomerDTO[]) {
    return await this.customerService.createCustomer(createCustomerDTOs);
  }
}
