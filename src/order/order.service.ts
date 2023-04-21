import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './order.repository';
import { OrderItemsRepository } from './orderItems.repository';
import { EmployeeRepository } from './employee.repository';
import { PaymentsRepository } from './payments.repository';

@Injectable()
export class OrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderItemsRepository: OrderItemsRepository,
    private employeeRepository: EmployeeRepository,
    private paymentsRepository: PaymentsRepository,
  ) {}

  async getJoinQuery() {
    return await this.ordersRepository.getJoinQuery();
  }

  async getJoinAcrossDBQuery() {
    return await this.orderItemsRepository.getJoinQuery();
  }

  async getSelfJoinQuery() {
    return await this.employeeRepository.getJoinQuery();
  }

  async getMultJoinQuery() {
    return await this.paymentsRepository.getMultJoinQuery();
  }

  async getCompoundJoinCondQuery() {
    return await this.orderItemsRepository.getCompoundJoinCondQuery();
  }
}
