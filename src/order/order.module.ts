import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrdersRepository } from './order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entities/Orders.entity';
import { OrderItemsRepository } from './orderItems.repository';
import { Products } from 'src/entities/Products.entity';
import { OrderItems } from 'src/entities/OrderItems.entity';
import { Employees } from 'src/entities/Employees.entity';
import { EmployeeRepository } from './employee.repository';
import { Payments } from 'src/entities/Payments.entity';
import { PaymentMethods } from 'src/entities/PaymentMethods.entity';
import { Clients } from 'src/entities/Clients.entity';
import { PaymentsRepository } from './payments.repository';
import { OrderItemNotes } from 'src/entities/OrderItemNotes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderItems, OrderItemNotes], 'store'),
    TypeOrmModule.forFeature([Products], 'inventory'),
    TypeOrmModule.forFeature([Employees], 'hr'),
    TypeOrmModule.forFeature([Payments, PaymentMethods, Clients], 'invoicing'),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrdersRepository,
    OrderItemsRepository,
    EmployeeRepository,
    PaymentsRepository,
  ],
})
export class OrderModule {}
