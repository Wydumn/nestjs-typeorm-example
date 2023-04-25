import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateCustomerDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  birthDate: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsNumber()
  points: number;
}
