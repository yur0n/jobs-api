import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsEnum, IsMongoId } from 'class-validator';
import { JobStatus } from '../enums/job-status';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(JobStatus)
  readonly status?: JobStatus;

	@IsOptional()
  @IsNotEmpty()
  @IsDate()
  readonly creationDate?: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly salary: number;
  
  @IsNotEmpty()
  @IsMongoId({ message: (value) => `${value.property} must be valid ID` })
  readonly owner: string;
}