import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItems } from './OrderItems.entity';

@Entity('products', { schema: 'sql_store' })
export class Products {
  @PrimaryGeneratedColumn({ type: 'int', name: 'product_id' })
  productId: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('int', { name: 'quantity_in_stock' })
  quantityInStock: number;

  @Column('decimal', { name: 'unit_price', precision: 4, scale: 2 })
  unitPrice: string;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.product)
  orderItems: OrderItems[];
}
