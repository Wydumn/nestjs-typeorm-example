import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoices } from 'src/entities/Invoices.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesRepository extends Repository<Invoices> {
  constructor(
    @InjectRepository(Invoices, 'invoicing')
    private invoicesRepository: Repository<Invoices>,
  ) {
    super(
      invoicesRepository.target,
      invoicesRepository.manager,
      invoicesRepository.queryRunner,
    );
  }
}
