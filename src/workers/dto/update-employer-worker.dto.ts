import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { WorkerEvent } from '../enums/worker-event.enum';

export class UpdateEmployerWorkerDto {
  @IsNotEmpty()
  @IsMongoId({ message: (value) => `${value.property} must be valid ID` })
  employer: string;

  @IsNotEmpty()
  @IsEnum(WorkerEvent)
  event: WorkerEvent;
}

