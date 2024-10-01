import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Worker } from 'src/workers/schemas/worker.schema';
import { Employer } from 'src/employers/schemas/employer.schema';
import { JobStatus } from '../enums/job-status';

@Schema()
export class Job extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: JobStatus.DRAFT })
  status: JobStatus;

  @Prop({ default: Date.now })
  creationDate: Date;

  @Prop({ required: true })
  salary: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Worker' }] })
  workers: Worker[];

  @Prop({ type: Types.ObjectId, ref: 'Employer', required: true })
  owner: Employer;
}

export const JobSchema = SchemaFactory.createForClass(Job);