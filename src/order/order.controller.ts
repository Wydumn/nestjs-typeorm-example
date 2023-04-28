import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/employees/highly-paid')
  async findHighlyPaidEmployees() {
    return await this.orderService.queryEmplAboveAvg();
  }

  @Get('/order/join')
  async findWithJoinTable() {
    // return await this.orderService.getJoinQuery();
    // return await this.orderService.getJoinAcrossDBQuery();
    // return await this.orderService.getSelfJoinQuery();
    // return await this.orderService.getMultJoinQuery();
    // return await this.orderService.getCompoundJoinCondQuery();
    return await this.orderService.queryWithGroupBy();
  }

  @Get('/products/unorder')
  async findUnorderedProd() {
    // return await this.orderService.findUnorderedProd();
    return await this.orderService.findUnorderedProdWithExists();
  }

  @Post('/order/orderItem')
  async createOrderItem(@Body() createOrderItem: CreateOrderItemDto) {
    return await this.orderService.createOrderItem(createOrderItem);
  }

  @Post('/order')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  @Put('/order/:id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return await this.orderService.updateEmployee(
      Number(id),
      updateEmployeeDto,
    );
  }

  @Delete('/order/:id')
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.deleteOrder(Number(id));
  }

  @Get('/invoices/gtavg')
  async findInvoicesGTAVG() {
    return await this.orderService.correlatedSubQuery();
  }

  @Get('/invoices')
  async findInvoices() {
    // return await this.orderService.queryWithALL();
    return await this.orderService.queryWithSelectSubquery();
  }
}
