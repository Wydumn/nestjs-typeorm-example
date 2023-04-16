import { Column, Entity, OneToMany } from 'typeorm';
import { Orders } from './Orders.entity';

@Entity('order_statuses', { schema: 'sql_store' })
export class OrderStatuses {
  @Column('tinyint', { primary: true, name: 'order_status_id' })
  orderStatusId: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @OneToMany(() => Orders, (orders) => orders.status2)
  orders: Orders[];
}
