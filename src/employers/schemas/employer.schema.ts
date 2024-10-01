import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, HydratedDocument } from 'mongoose';
import { Job } from 'src/jobs/schemas/job.schema';
import { Worker } from 'src/workers/schemas/worker.schema';
import { EmployerStatus } from '../enums/employer-status';

@Schema()
export class Employer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: EmployerStatus, required: true })
  status: EmployerStatus;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Job' }] })
  jobs: Job[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Worker' }] })
  workers: Worker[];
}

export const EmployerSchema = SchemaFactory.createForClass(Employer);