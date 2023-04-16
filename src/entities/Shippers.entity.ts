import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './Orders.entity';

@Entity('shippers', { schema: 'sql_store' })
export class Shippers {
  @PrimaryGeneratedColumn({ type: 'smallint', name: 'shipper_id' })
  shipperId: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @OneToMany(() => Orders, (orders) => orders.shipper)
  orders: Orders[];
}
