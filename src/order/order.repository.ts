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
}
