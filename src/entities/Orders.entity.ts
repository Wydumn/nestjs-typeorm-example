import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItems } from './OrderItems.entity';
import { Customers } from './Customers.entity';
import { OrderStatuses } from './OrderStatuses.entity';
import { Shippers } from './Shippers.entity';

@Index('fk_orders_customers_idx', ['customerId'], {})
@Index('fk_orders_shippers_idx', ['shipperId'], {})
@Index('fk_orders_order_statuses_idx', ['status'], {})
@Entity('orders', { schema: 'sql_store' })
export class Orders {
  @PrimaryGeneratedColumn({ type: 'int', name: 'order_id' })
  orderId: number;

  @Column('int', { name: 'customer_id' })
  customerId: number;

  @Column('date', { name: 'order_date' })
  orderDate: string;

  @Column('tinyint', { name: 'status', default: () => "'1'" })
  status: number;

  @Column('varchar', { name: 'comments', nullable: true, length: 2000 })
  comments: string | null;

  @Column('date', { name: 'shipped_date', nullable: true })
  shippedDate: string | null;

  @Column('smallint', { name: 'shipper_id', nullable: true })
  shipperId: number | null;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order, {
    cascade: ['insert'],
    onDelete: 'NO ACTION',
  })
  orderItems: OrderItems[];

  @ManyToOne(() => Customers, (customers) => customers.orders, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'customerId' }])
  customer: Customers;

  @ManyToOne(() => OrderStatuses, (orderStatuses) => orderStatuses.orders, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'status', referencedColumnName: 'orderStatusId' }])
  status2: OrderStatuses;

  @ManyToOne(() => Shippers, (shippers) => shippers.orders, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'shipper_id', referencedColumnName: 'shipperId' }])
  shipper: Shippers;
}
