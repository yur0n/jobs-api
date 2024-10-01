import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateWorkerDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly salary: number;
}