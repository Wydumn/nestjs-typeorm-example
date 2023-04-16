import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Payments } from './Payments.entity';

@Entity('payment_methods', { schema: 'sql_invoicing' })
export class PaymentMethods {
  @PrimaryGeneratedColumn({ type: 'tinyint', name: 'payment_method_id' })
  paymentMethodId: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @OneToMany(() => Payments, (payments) => payments.paymentMethod2)
  payments: Payments[];
}
