import { CreateEmployerDto } from "../dto/create-employer.dto";
import { PartialType } from '@nestjs/mapped-types'
import { IsOptional, IsMongoId, IsArray } from 'class-validator';

/**
 * Validating that each element of the jobs and workers arrays is MongoDB ObjectId.
 */
export class UpdateEmployerDto extends PartialType(CreateEmployerDto) {
	@IsOptional()
  @IsArray()
	@IsMongoId({ each: true, message: (value) => `${value} is not a valid ID` })
  readonly jobs?: string[];

  @IsOptional()
  @IsArray()
	@IsMongoId({ each: true, message: (value) => `${value} is not a valid ID` })
  readonly workers?: string[];
}