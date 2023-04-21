import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';

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
}
