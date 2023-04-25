import { IsInt, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsNumber()
  @IsInt()
  productId: number;

  @IsNumber()
  quantity: number;

  @IsString()
  unitPrice: string;
}

export class CreateOrderDto {
  @IsNumber()
  customerId: number;

  @IsString()
  orderDate: string;

  @IsNumber()
  status: number;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}
