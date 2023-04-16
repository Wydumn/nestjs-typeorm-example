import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Clients } from './Clients.entity';
import { Payments } from './Payments.entity';

@Index('FK_client_id', ['clientId'], {})
@Entity('invoices', { schema: 'sql_invoicing' })
export class Invoices {
  @Column('int', { primary: true, name: 'invoice_id' })
  invoiceId: number;

  @Column('varchar', { name: 'number', length: 50 })
  number: string;

  @Column('int', { name: 'client_id' })
  clientId: number;

  @Column('decimal', { name: 'invoice_total', precision: 9, scale: 2 })
  invoiceTotal: string;

  @Column('decimal', {
    name: 'payment_total',
    precision: 9,
    scale: 2,
    default: () => "'0.00'",
  })
  paymentTotal: string;

  @Column('date', { name: 'invoice_date' })
  invoiceDate: string;

  @Column('date', { name: 'due_date' })
  dueDate: string;

  @Column('date', { name: 'payment_date', nullable: true })
  paymentDate: string | null;

  @ManyToOne(() => Clients, (clients) => clients.invoices, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'clientId' }])
  client: Clients;

  @OneToMany(() => Payments, (payments) => payments.invoice)
  payments: Payments[];
}
