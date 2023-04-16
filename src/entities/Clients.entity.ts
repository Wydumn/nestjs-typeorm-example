import { Column, Entity, OneToMany } from 'typeorm';
import { Invoices } from './Invoices.entity';
import { Payments } from './Payments.entity';

@Entity('clients', { schema: 'sql_invoicing' })
export class Clients {
  @Column('int', { primary: true, name: 'client_id' })
  clientId: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'address', length: 50 })
  address: string;

  @Column('varchar', { name: 'city', length: 50 })
  city: string;

  @Column('char', { name: 'state', length: 2 })
  state: string;

  @Column('varchar', { name: 'phone', nullable: true, length: 50 })
  phone: string | null;

  @OneToMany(() => Invoices, (invoices) => invoices.client)
  invoices: Invoices[];

  @OneToMany(() => Payments, (payments) => payments.client)
  payments: Payments[];
}
