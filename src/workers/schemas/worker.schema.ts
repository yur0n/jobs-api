import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Employer } from 'src/employers/schemas/employer.schema';
import { Job } from 'src/jobs/schemas/job.schema';
import { WorkerEvent } from '../enums/worker-event.enum';

@Schema()
export class Worker extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  salary: number;

  @Prop({ type: Types.ObjectId, ref: 'Employer' })
  owner: Employer;

  @Prop({ type: Types.ObjectId, ref: 'Job' })
  job: Job;

  @Prop({
    type: [
      {
        event: { type: String, enum: WorkerEvent },
        job: { type: Types.ObjectId, ref: 'Job' },
        date: { type: Date, default: Date.now },
      },
    ],
  })
  history: { event: WorkerEvent; job: Job; date: Date }[];
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);