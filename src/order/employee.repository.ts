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

  getJoinQuery() {
    /**
     * SELECT e.emloyeeId, e.firstName, m.firstName AS manager
     * FROM employees e
     * JOIN employees m
     * ON e.reports_to = m.employee_id
     * because we use alias for join data, so return with getRaw method
     * https://typeorm.io/select-query-builder#getting-raw-results
     *  reeult form
     *  {
     *    "employeeId": ...,
     *    "fistName": ...,
     *    "manager": ...,
     *  }
     * or return data with getMany mehtod for join query result, but nested detail info
     * {
     *    "employeeId": "...",
     *    "fistName": ...,
     *    "manager": {
     *        fistName: "...",
     *        ...
     *      },
     * }
     */
    return this.createQueryBuilder('e')
      .innerJoinAndSelect(Employees, 'm', 'e.reportsTo2 = m.employeeId') // .leftJoinAndSelect(Employees, 'm', 'e.reportsTo2 = m.employeeId')
      .select([
        'e.employeeId as employeeId',
        'e.firstName as firstName',
        'm.firstName as manager',
      ])
      .getRawMany();
  }
}
