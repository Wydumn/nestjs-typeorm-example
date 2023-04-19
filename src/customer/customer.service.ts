import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './customer.repository';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomersRepository) {}

  async getAll() {
    return await this.customerRepository.findAllCustomers();
  }

  async getCustomerById(id: number) {
    return await this.customerRepository.findCustomerById(id);
  }

  async getWhereQuery() {
    return await this.customerRepository.getWhereQuery();
  }
}
