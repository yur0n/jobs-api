import { CreateJobDto } from "../dto/create-job.dto";
import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsOptional, IsMongoId, IsArray } from 'class-validator';

export class UpdateJobDto extends PartialType(CreateJobDto) {
	@IsOptional()
	@IsArray()
	@IsMongoId({ each: true, message: (value) => `${value} is not a valid ID` })
	readonly workers?: string[]
}