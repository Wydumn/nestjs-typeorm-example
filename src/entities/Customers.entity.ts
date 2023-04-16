import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './Orders.entity';

@Entity('customers', { schema: 'sql_store' })
export class Customers {
  @PrimaryGeneratedColumn({ type: 'int', name: 'customer_id' })
  customerId: number;

  @Column('varchar', { name: 'first_name', length: 50 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 50 })
  lastName: string;

  @Column('date', { name: 'birth_date', nullable: true })
  birthDate: string | null;

  @Column('varchar', { name: 'phone', nullable: true, length: 50 })
  phone: string | null;

  @Column('varchar', { name: 'address', length: 50 })
  address: string;

  @Column('varchar', { name: 'city', length: 50 })
  city: string;

  @Column('char', { name: 'state', length: 2 })
  state: string;

  @Column('int', { name: 'points', default: () => "'0'" })
  points: number;

  @OneToMany(() => Orders, (orders) => orders.customer)
  orders: Orders[];
}
