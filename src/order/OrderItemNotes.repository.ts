import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemNotes } from 'src/entities/OrderItemNotes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository extends Repository<OrderItemNotes> {
  constructor(
    @InjectRepository(OrderItemNotes, 'store')
    private orderItemNotesRepository: Repository<OrderItemNotes>,
  ) {
    super(
      orderItemNotesRepository.target,
      orderItemNotesRepository.manager,
      orderItemNotesRepository.queryRunner,
    );
  }

  getJoinQuery() {
    // return this.createQueryBuilder('oi').leftJoinAndSelect()
  }
}
