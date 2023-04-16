import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'src/entities/Customers.entity';
import { Orders } from 'src/entities/Orders.entity';
import { OrderItems } from 'src/entities/OrderItems.entity';
import { Products } from 'src/entities/Products.entity';
import { OrderStatuses } from 'src/entities/OrderStatuses.entity';
import { Shippers } from 'src/entities/Shippers.entity';
import { Payments } from 'src/entities/Payments.entity';
import { PaymentMethods } from 'src/entities/PaymentMethods.entity';
import { Clients } from 'src/entities/Clients.entity';
import { Employees } from 'src/entities/Employees.entity';
import { Invoices } from 'src/entities/Invoices.entity';
import { Offices } from 'src/entities/Offices.entity';
import { OrderItemNotes } from 'src/entities/OrderItemNotes.entity';
import { CustomersRepository } from './customer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Customers,
        Orders,
        OrderItems,
        Products,
        OrderStatuses,
        Shippers,
        /* Payments,
      PaymentMethods,
      Clients,
      Employees,
      Invoices,
      Offices,
      OrderItemNotes, */
      ],
      'store',
    ),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomersRepository],
})
export class CustomerModule {}
