import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Worker } from './schemas/worker.schema';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { UpdateEmployerWorkerDto } from './dto/update-employer-worker.dto';
import { JobsService } from '../jobs/jobs.service';
import { EmployersService } from 'src/employers/employers.service';
import { WorkerEvent } from './enums/worker-event.enum';


@Injectable()
export class WorkersService {
  constructor(
    @InjectModel(Worker.name) private workerModel: Model<Worker>,
    private readonly jobsService: JobsService,
		private readonly employersService: EmployersService,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    return this.workerModel.create(createWorkerDto);
  }

  async findAll() {
    return this.workerModel.find().exec();
  }

  async findById(id: string) {
    const worker = await this.workerModel.findById(id).exec();
    if (!worker) throw new NotFoundException(`Worker with id ${id} not found`);
    return worker;
  }

  async update(id: string, updateWorkerDto: UpdateWorkerDto) {
    const updatedWorker = await this.workerModel.findByIdAndUpdate(id, updateWorkerDto, { new: true }).exec();
    if (!updatedWorker) throw new NotFoundException(`Worker with id ${id} not found`);
    return updatedWorker;
  }

  async delete(id: string) {
    const result = await this.workerModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Worker with id ${id} not found`);
  }

	/**
	 * Using imported Jobs Service to find all jobs that match the salary condition.
	 */
  async findMatchedJobs(id: string) {
    const worker = await this.findById(id);
    return this.jobsService.matchedJobs(worker.salary);
  }

  /**
   * Utilizing Mongodb '$push' operator to append new object to the worker's history array.
   */
  async updateEmployer(id: string, query: UpdateEmployerWorkerDto) {
		const { event, employer } = query;
		const { job } = await this.findById(id);
		const workerUpdate = {
			owner: employer,
			$push: {
				history: { event, job },
			},
		};
		return this.update(id, workerUpdate);
  }
}

/**
 * Additionally, we can implement hireWorker and fireWorker methods with Mongodb '$pull' and '$push' operators in the Employers Service
 * for workers array of the Empolyer model. And use it in the updateEmployer method
 * this.employersService.hireWorker(employerId, workerId);
 * this.employersService.fireWorker(employerId, workerId);
 */