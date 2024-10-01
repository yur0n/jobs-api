import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobStatus } from './enums/job-status';

@Injectable()
export class JobsService {
  constructor(
		@InjectModel(Job.name) private jobModel: Model<Job>
	) {}

  async create(createJobDto: CreateJobDto) {
    return this.jobModel.create(createJobDto);
  }

  async findAll() {
    return this.jobModel.find().exec();
  }

  async findById(id: string) {
    const job = await this.jobModel.findById(id).exec();
    if (!job) throw new NotFoundException(`Job with id ${id} not found`);
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const updatedJob = await this.jobModel.findByIdAndUpdate(id, updateJobDto, { new: true }).exec();
    if (!updatedJob) throw new NotFoundException(`Job with id ${id} not found`);
    return updatedJob;
  }

  async delete(id: string) {
    const result = await this.jobModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Job with id ${id} not found`);
  }

  /**
   * Utilizing Mongodb '$gte' and '$lte' operators to select all jobs that meet the condition.
   */
  async findByDatePeriod(start: Date, end: Date) {
    return this.jobModel.find({
      creationDate: { $gte: start, $lte: end },
    }).exec();
  }

  async archiveJob(id: string) {
    return this.update(id, { status: JobStatus.ARCHIVE });
  }

  /**
   * Creating new method to search for jobs. Used by Workers Service.
   * Utilizing Mongodb '$gte' operator to select all active jobs that meet the condition.
  */
	async matchedJobs(workerSalary: number) {
		return this.jobModel.find({
			salary: { $gte: workerSalary },
			status: JobStatus.ACTIVE,
		}).exec();
	}
}