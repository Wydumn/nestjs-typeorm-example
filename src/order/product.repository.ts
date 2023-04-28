import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/Products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class productRepository extends Repository<Products> {
  constructor(
    @InjectRepository(Products, 'store')
    private productsRepository: Repository<Products>,
  ) {
    super(
      productsRepository.target,
      productsRepository.manager,
      productsRepository.queryRunner,
    );
  }
}
