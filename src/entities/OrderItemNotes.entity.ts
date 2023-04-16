import { Column, Entity } from 'typeorm';

@Entity('order_item_notes', { schema: 'sql_store' })
export class OrderItemNotes {
  @Column('int', { primary: true, name: 'note_id' })
  noteId: number;

  @Column('int', { name: 'order_Id' })
  orderId: number;

  @Column('int', { name: 'product_id' })
  productId: number;

  @Column('varchar', { name: 'note', length: 255 })
  note: string;
}
