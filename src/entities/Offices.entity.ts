import { Column, Entity, OneToMany } from 'typeorm';
import { Employees } from './Employees.entity';

@Entity('offices', { schema: 'sql_hr' })
export class Offices {
  @Column('int', { primary: true, name: 'office_id' })
  officeId: number;

  @Column('varchar', { name: 'address', length: 50 })
  address: string;

  @Column('varchar', { name: 'city', length: 50 })
  city: string;

  @Column('varchar', { name: 'state', length: 50 })
  state: string;

  @OneToMany(() => Employees, (employees) => employees.office)
  employees: Employees[];
}
