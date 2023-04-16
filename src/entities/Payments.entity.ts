import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Clients } from './Clients.entity';
import { Invoices } from './Invoices.entity';
import { PaymentMethods } from './PaymentMethods.entity';

@Index('fk_client_id_idx', ['clientId'], {})
@Index('fk_invoice_id_idx', ['invoiceId'], {})
@Index('fk_payment_payment_method_idx', ['paymentMethod'], {})
@Entity('payments', { schema: 'sql_invoicing' })
export class Payments {
  @PrimaryGeneratedColumn({ type: 'int', name: 'payment_id' })
  paymentId: number;

  @Column('int', { name: 'client_id' })
  clientId: number;

  @Column('int', { name: 'invoice_id' })
  invoiceId: number;

  @Column('date', { name: 'date' })
  date: string;

  @Column('decimal', { name: 'amount', precision: 9, scale: 2 })
  amount: string;

  @Column('tinyint', { name: 'payment_method' })
  paymentMethod: number;

  @ManyToOne(() => Clients, (clients) => clients.payments, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'clientId' }])
  client: Clients;

  @ManyToOne(() => Invoices, (invoices) => invoices.payments, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'invoice_id', referencedColumnName: 'invoiceId' }])
  invoice: Invoices;

  @ManyToOne(
    () => PaymentMethods,
    (paymentMethods) => paymentMethods.payments,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([
    { name: 'payment_method', referencedColumnName: 'paymentMethodId' },
  ])
  paymentMethod2: PaymentMethods;
}
