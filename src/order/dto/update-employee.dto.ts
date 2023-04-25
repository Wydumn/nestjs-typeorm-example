import { IsNumber } from 'class-validator';

export class UpdateEmployeeDto {
  @IsNumber()
  employeeId: number;

  @IsNumber()
  salary: number;
}
