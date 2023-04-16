import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Offices } from './Offices.entity';

@Index('fk_employees_offices_idx', ['officeId'], {})
@Index('fk_employees_employees_idx', ['reportsTo'], {})
@Entity('employees', { schema: 'sql_hr' })
export class Employees {
  @Column('int', { primary: true, name: 'employee_id' })
  employeeId: number;

  @Column('varchar', { name: 'first_name', length: 50 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 50 })
  lastName: string;

  @Column('varchar', { name: 'job_title', length: 50 })
  jobTitle: string;

  @Column('int', { name: 'salary' })
  salary: number;

  @Column('int', { name: 'reports_to', nullable: true })
  reportsTo: number | null;

  @Column('int', { name: 'office_id' })
  officeId: number;

  @ManyToOne(() => Employees, (employees) => employees.employees, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'reports_to', referencedColumnName: 'employeeId' }])
  reportsTo2: Employees;

  @OneToMany(() => Employees, (employees) => employees.reportsTo2)
  employees: Employees[];

  @ManyToOne(() => Offices, (offices) => offices.employees, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'office_id', referencedColumnName: 'officeId' }])
  office: Offices;
}
