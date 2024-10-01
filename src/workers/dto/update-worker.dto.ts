import { CreateWorkerDto } from "../dto/create-worker.dto";
import { PartialType } from '@nestjs/mapped-types'
import { IsString, IsOptional } from 'class-validator';

export class UpdateWorkerDto extends PartialType(CreateWorkerDto) {	
	@IsOptional()
	@IsString()
	readonly owner?: string;

	@IsOptional()
	@IsString()
	readonly job?: string;
}