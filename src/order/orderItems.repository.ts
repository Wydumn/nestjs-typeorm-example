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

  getJoinQuery() {
    /**
     * SELECT *
     * FROM order_items oi
     * JOIN inventory.products p
     * ON oi.productId = p.productId
     */
    return this.find({
      relations: {
        product: true,
      },
    });
  }

  /**
   * SELECT *
   * FROM order_items oi
   * JOIN order_item_notes oin
   * ON oi.order_id = oin.order_id
   *  AND oi.product_id = oin.product_id
   */
  getCompoundJoinCondQuery() {
    return this.createQueryBuilder('oi')
      .leftJoinAndSelect(
        OrderItemNotes,
        'oin',
        'oi.orderId = oin.orderId AND oi.productId = oin.productId',
      )
      .getMany();
  }
}
