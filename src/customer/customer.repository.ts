import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from 'src/entities/Customers.entity';
import { Repository } from 'typeorm';

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
}
