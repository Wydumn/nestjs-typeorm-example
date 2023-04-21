import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/entities/Orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository extends Repository<Orders> {
  constructor(
    @InjectRepository(Orders, 'store')
    private ordersRepository: Repository<Orders>,
  ) {
    super(
      ordersRepository.target,
      ordersRepository.manager,
      ordersRepository.queryRunner,
    );
  }

  getJoinQuery() {
    /**
     * SELECT orderId, orders.customerId, firstName, lastName
     * FROM orders
     * JOIN customers
     * ON orders.customerId = customers.customerId
     */
    return this.find({
      relations: {
        customer: true,
      },
      select: {
        orderId: true,
        customerId: true,
        customer: {
          firstName: true,
          lastName: true,
        },
      },
    });
  }
}
