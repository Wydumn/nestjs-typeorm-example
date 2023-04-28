import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrdersRepository } from './order.repository';
import { OrderItemsRepository } from './orderItems.repository';
import { EmployeeRepository } from './employee.repository';
import { PaymentsRepository } from './payments.repository';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';
import { Employees } from 'src/entities/Employees.entity';
import { OrderItemNotes } from 'src/entities/OrderItemNotes.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaymentMethods } from 'src/entities/PaymentMethods.entity';
import { productRepository } from './product.repository';
import { OrderItems } from 'src/entities/OrderItems.entity';
import { InvoicesRepository } from './invoices.repository';
import { Invoices } from 'src/entities/Invoices.entity';

@Injectable()
export class OrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderItemsRepository: OrderItemsRepository,
    private employeeRepository: EmployeeRepository,
    private paymentsRepository: PaymentsRepository,
    private productsRepository: productRepository,
    private invoicesRepository: InvoicesRepository,
  ) {}

  async getJoinQuery() {
    /**
     * SELECT orderId, orders.customerId, firstName, lastName
     * FROM orders
     * JOIN customers
     * ON orders.customerId = customers.customerId
     */
    return this.ordersRepository.find({
      relations: {
        customer: true,
      },
      select: {
        orderId: true,
        customerId: true,
        customer: {
          firstName: true,
          lastName: true,
        },
      },
    });
  }

  async getJoinAcrossDBQuery() {
    /**
     * SELECT *
     * FROM order_items oi
     * JOIN inventory.products p
     * ON oi.productId = p.productId
     */
    return await this.orderItemsRepository.find({
      relations: {
        product: true,
      },
    });
  }

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
  async getSelfJoinQuery() {
    return await this.employeeRepository
      .createQueryBuilder('e')
      .innerJoinAndSelect(Employees, 'm', 'e.reportsTo2 = m.employeeId') // .leftJoinAndSelect(Employees, 'm', 'e.reportsTo2 = m.employeeId')
      .select([
        'e.employeeId as employeeId',
        'e.firstName as firstName',
        'm.firstName as manager',
      ])
      .getRawMany();
  }

  async getMultJoinQuery() {
    return await this.paymentsRepository.getMultJoinQuery();
  }

  async getCompoundJoinCondQuery() {
    /**
     * SELECT *
     * FROM order_items oi
     * JOIN order_item_notes oin
     * ON oi.order_id = oin.order_id
     *  AND oi.product_id = oin.product_id
     */
    return await this.orderItemsRepository
      .createQueryBuilder('oi')
      .leftJoinAndSelect(
        OrderItemNotes,
        'oin',
        'oi.orderId = oin.orderId AND oi.productId = oin.productId',
      )
      .getMany();
  }

  async createOrderItem(createOrderItemDto: CreateOrderItemDto) {
    const newOrderItem = await this.orderItemsRepository.create(
      createOrderItemDto,
    );
    return await this.orderItemsRepository.save(newOrderItem);
  }

  /**
   * INSERT INTO `orders`(`order_id`, `customer_id`, `order_date`, `status`) VALUES (DEFAULT, 1, "2019-01-02", 1, DEFAULT, DEFAULT, DEFAULT)
   * INSERT INTO `order_items`(LAST_INSERT_ID(), `product_id`, `quantity`, `unit_price`) VALUES (12,1,1,"2.95)
   * INSERT INTO `order_items`(LAST_INSERT_ID(), `product_id`, `quantity`, `unit_price`) VALUES (12,2,1,"2.95")
   * @param createOrderDto
   * @returns order
   */
  async createOrder(createOrderDto: CreateOrderDto) {
    const newOrder = await this.ordersRepository.create(createOrderDto);
    return await this.ordersRepository.save(newOrder);
  }

  /**
   * UPDATE employees
   * SET
   *    salary = xx
   * WHERE employeeId = id
   */
  async updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    await this.employeeRepository.update({ employeeId: id }, updateEmployeeDto);
    const updateEmployee = this.employeeRepository.findOne({
      where: { employeeId: id },
    });
    return updateEmployee;
  }

  async deleteOrder(id: number) {
    const deleteRes = await this.orderItemsRepository.delete({ orderId: id });
    if (!deleteRes.affected) {
      throw new HttpException('OrderItem not found', HttpStatus.NOT_FOUND);
    }
  }

  async queryWithGroupBy() {
    return this.paymentsRepository
      .createQueryBuilder('p')
      .innerJoinAndSelect(
        PaymentMethods,
        'pm',
        'p.paymentMethod2 = pm.paymentMethodId',
      )
      .select([
        'date',
        'pm.name as payment_method',
        'SUM(amount) as total_payments',
      ])
      .groupBy('date')
      .addGroupBy('payment_method')
      .orderBy('date')
      .getRawMany();
  }

  /**
   * WHERE subquery
   * SELECT *
   * FROM employees
   * WHERE salary > (
   *  SELECT AVG(salary)
   *  FROM employees
   * )
   */
  async queryEmplAboveAvg() {
    return await this.employeeRepository
      .createQueryBuilder('e')
      .select()
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('AVG(salary)')
          .from(Employees, 'em')
          .getQuery();
        return 'salary > ' + subQuery;
      })
      .getMany();
  }

  /**
   * SELECT *
   * FROM products
   * WHERE productId NOT IN (
   *  SELECT DISTINCT productId
   *  FROM orderItems
   * )
   */
  async findUnorderedProd() {
    return await this.productsRepository
      .createQueryBuilder('p')
      .select()
      .where(
        (qb) =>
          `p.productId NOT IN ${qb
            .subQuery()
            .select('DISTINCT oi.productId')
            .from(OrderItems, 'oi')
            .getQuery()}`,
      )
      .getMany();
  }

  /**
   * SELECT *
   * FROM products p
   * WHERE NOT EXISTS (
   *  SELECT productId
   *  FROM orderItems
   *  WHERE productId = p.productId
   * )
   */
  async findUnorderedProdWithExists() {
    return await this.productsRepository
      .createQueryBuilder('p')
      .select()
      .where(
        (qb) =>
          `NOT EXISTS (${qb
            .createQueryBuilder()
            .select('oi.productId')
            .from(OrderItems, 'oi')
            .where('oi.productId = p.productId')
            .getQuery()})`,
      )
      .getMany();
  }

  /**
   * SELECT
   *    invoiceId, invoiceTotal,
   *    (SELECT AVG(invoiceTotal) FROM invoices) AS invoiceAverage,
   *    invoiceTotal - (SELECT invoiceAverage) AS difference
   * FROM invoices
   */
  async queryWithSelectSubquery() {
    return await this.invoicesRepository.query(`
      SELECT
        invoice_id, invoice_total,
          (SELECT AVG(invoice_total) FROM invoices) AS invoiceAverage,
          invoice_total - (SELECT invoiceAverage) AS difference
      FROM invoices`);
  }

  /**
   * SELECT *
   * FROM invoices
   * WHERE invoice_total > ALL (
   *  SELECT invoice_total
   *  FROM invoices
   *  WHERE client_id = 3
   * )
   */
  async queryWithALL() {
    return await this.invoicesRepository
      .createQueryBuilder('invoice')
      .select()
      .where(
        (qb) =>
          `invoice_total > ALL(${qb
            .subQuery()
            .select('i.invoiceTotal')
            .from(Invoices, 'i')
            .where('i.clientId = :clientId', { clientId: 3 })
            .getQuery()})`,
      )
      .getMany();
  }

  /**
   * SELECT *
   * FROM invoices i
   * WHERE invoiceTotal > (
   *  SELECT AVG(invoiceTotal)
   *  FROM invoices
   *  WHERE clientId = i.clientId
   * )
   */
  async correlatedSubQuery() {
    return await this.invoicesRepository
      .createQueryBuilder('i')
      .select()
      .where(
        (qb) =>
          `i.invoiceTotal > ${qb
            .subQuery()
            .select('AVG(in.invoiceTotal)')
            .from(Invoices, 'in')
            .where('in.clientId = i.clientId')
            .getQuery()}`,
      )
      .getMany();
  }
}
