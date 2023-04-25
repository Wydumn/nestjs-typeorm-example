import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './customer.repository';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomersRepository) {}

  async getAll() {
    return await this.customerRepository.query('SELECT * FROM customers');
  }

  async getCustomerById(id: number) {
    return await this.customerRepository.findOne({ where: { customerId: id } });
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

    return this.customerRepository.find({
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

  // "SELECT customer_id, first_name, points, 'Bronze' AS type FROM Customers WHERE points > 3000 ORDER BY first_name"
  // can't use where('c.points < :value', { value: 1000 }) style with union statement
  async getUnionQuery() {
    const bronzeCust = this.customerRepository
      .createQueryBuilder('c')
      .select(['customer_id', 'first_name', 'points', "'Bronze' as type"])
      .where('c.points < 1000')
      .getQuery();

    const silverCust = this.customerRepository
      .createQueryBuilder('c')
      .select(['customer_id', 'first_name', 'points', "'Silver' as type"])
      .where('c.points BETWEEN 1000 AND 3000')
      .getQuery();

    const goldCust = this.customerRepository
      .createQueryBuilder('c')
      .select(['customer_id', 'first_name', 'points', "'Gold' as type"])
      .where('c.points > 3000')
      .getQuery();
    return this.customerRepository.query(
      `${bronzeCust} UNION ${silverCust} UNION ${goldCust} ORDER BY first_name`,
    );
    // return bronzeCust;
  }

  async createCustomer(createCustomerDTOs: CreateCustomerDTO[]) {
    const newCustomers = await createCustomerDTOs.map((createCustomerDTO) =>
      this.customerRepository.create(createCustomerDTO),
    );

    return await this.customerRepository.save(newCustomers);
  }
}
