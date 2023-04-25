import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from 'src/entities/Employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeRepository extends Repository<Employees> {
  constructor(
    @InjectRepository(Employees, 'hr')
    private employeeRepository: Repository<Employees>,
  ) {
    super(
      employeeRepository.target,
      employeeRepository.manager,
      employeeRepository.queryRunner,
    );
  }
}
