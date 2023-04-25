import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemNotes } from 'src/entities/OrderItemNotes.entity';
import { OrderItems } from 'src/entities/OrderItems.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsRepository extends Repository<OrderItems> {
  constructor(
    @InjectRepository(OrderItems, 'store')
    private orderItemsRepository: Repository<OrderItems>,
  ) {
    super(
      orderItemsRepository.target,
      orderItemsRepository.manager,
      orderItemsRepository.queryRunner,
    );
  }
}
