import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrdersRepository } from './order.repository';
import { OrderItemsRepository } from './orderItems.repository';
import { EmployeeRepository } from './employee.repository';
import { PaymentsRepository } from './payments.repository';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';
import { Employees } from 'src/entities/Employees.entity';
import { OrderItemNotes } from 'src/entities/OrderItemNotes.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class OrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderItemsRepository: OrderItemsRepository,
    private employeeRepository: EmployeeRepository,
    private paymentsRepository: PaymentsRepository,
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
}
