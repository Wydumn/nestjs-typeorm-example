import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './Orders.entity';
import { Products } from './Products.entity';

@Index('fk_order_items_products_idx', ['productId'], {})
@Entity('order_items', { schema: 'sql_store' })
export class OrderItems {
  @PrimaryGeneratedColumn({ type: 'int', name: 'order_id' })
  orderId: number;

  @Column('int', { primary: true, name: 'product_id' })
  productId: number;

  @Column('int', { name: 'quantity' })
  quantity: number;

  @Column('decimal', { name: 'unit_price', precision: 4, scale: 2 })
  unitPrice: string;

  @ManyToOne(() => Orders, (orders) => orders.orderItems, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'orderId' }])
  order: Orders;

  @ManyToOne(() => Products, (products) => products.orderItems, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'productId' }])
  product: Products;
}
