import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { EmployerStatus } from '../enums/employer-status';

export class CreateEmployerDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEnum(EmployerStatus)
  readonly status: EmployerStatus;
}