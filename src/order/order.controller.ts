import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/join')
  async findWithJoinTable() {
    // return await this.orderService.getJoinQuery();
    // return await this.orderService.getJoinAcrossDBQuery();
    return await this.orderService.getSelfJoinQuery();
    // return await this.orderService.getMultJoinQuery();
    // return await this.orderService.getCompoundJoinCondQuery();
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Post()
  async createOrderItem(@Body() createOrderItem: CreateOrderItemDto) {
    return this.orderService.createOrderItem(createOrderItem);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.orderService.updateEmployee(Number(id), updateEmployeeDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(Number(id));
  }
}
