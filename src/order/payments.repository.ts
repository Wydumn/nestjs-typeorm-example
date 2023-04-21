import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from 'src/entities/Clients.entity';
import { PaymentMethods } from 'src/entities/PaymentMethods.entity';
import { Payments } from 'src/entities/Payments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsRepository extends Repository<Payments> {
  constructor(
    @InjectRepository(Payments, 'invoicing')
    private paymentsRepository: Repository<Payments>,
  ) {
    super(
      paymentsRepository.target,
      paymentsRepository.manager,
      paymentsRepository.queryRunner,
    );
  }

  getMultJoinQuery() {
    return this.createQueryBuilder('p')
      .innerJoinAndSelect(Clients, 'c', 'p.clientId = c.clientId')
      .innerJoinAndSelect(
        PaymentMethods,
        'pm',
        'pm.paymentMethodId = p.paymentMethod2',
      )
      .select([
        'p.date as date',
        'p.invoiceId as invoiceId',
        'p.amount as amount',
        'c.name as clientName',
        'pm.name as pmName',
      ])
      .printSql()
      .getRawMany();
  }
}
