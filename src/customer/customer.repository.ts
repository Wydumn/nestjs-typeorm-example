import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from 'src/entities/Customers.entity';
import {
  And,
  Between,
  DataSource,
  In,
  IsNull,
  LessThan,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Raw,
  Repository,
} from 'typeorm';

@Injectable()
export class CustomersRepository extends Repository<Customers> {
  constructor(
    @InjectRepository(Customers, 'store')
    private customersRepository: Repository<Customers>,
  ) {
    super(
      customersRepository.target,
      customersRepository.manager,
      customersRepository.queryRunner,
    );
  }

  async findAllCustomers(): Promise<Customers[]> {
    return this.query('SELECT * FROM customers');
  }

  async findCustomerById(id: number): Promise<Customers> {
    return this.findOne({ where: { customerId: id } });
  }

  async getWhereQuery() {
    /**
     * select * from customers where
     *  1. AND OR NOT
     *  2. combine query
     *  3. IN Operator
     *  4. LIKE
     *  5. REGEXP
     *  6. ORDER BY / LIMIT / OFFSET
     */

    // 1. birthdate > '1991-01-01' AND state != 'CA'
    /* return this.find({
      where: {
        birthDate: MoreThan('1991-01-01'),
        state: Not('CA'),
      },
    });

    return await this.findBy({
      // points: MoreThan(200), // 'points' > 200
      // MoreThanOrEqual(200) >= 200
      // points: Not(3000), // != 200
      // birthDate: IsNull(),
      // birthDate: MoreThan('1990-01-01'),
    }); */

    // birthdate < '1991-01-01' OR state != 'CA'
    /* return this.find({
      where: [{ birthDate: LessThan('1991-01-01') }, { state: 'CA' }],
    }); */

    // 2. NOT(birthdate != '1991-01-01' AND points BETWEEN(200, 1000)) !(A && B) = !A | !B
    /* return this.find({
      where: [{ birthDate: '1991-01-01' }, { points: Not(Between(200, 1000)) }],
    }); */

    // 3. IN ('TX', 'CA', 'FL')
    /* return this.findBy({
      state: In(['TX', 'CA', 'FL']),
    }); */

    // 4. LIKE ()
    /* return this.findBy([
      { address: Like('%trail%') },
      { address: Like('%avenue%') },
    ]); */

    // 5. REGEXP()
    /* return this.findBy({
      lastName: Raw((columnAlias) => `${columnAlias} REGEXP 'b[ru]'`),
    }); */

    // 6. SELECT firstname, lastname FROM Customers ORDER BY "lastname" ASC, "firstname" DESC LIMIT 3 OFFSET 2

    return this.find({
      select: {
        lastName: true,
        firstName: true,
      },
      order: {
        lastName: 'ASC',
        firstName: 'DESC',
      },
      skip: 2,
      take: 3,
    });
  }
}
