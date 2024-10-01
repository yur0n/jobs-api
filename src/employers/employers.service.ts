import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employer } from './schemas/employer.schema';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';

@Injectable()
export class EmployersService {
  constructor(
		@InjectModel(Employer.name) private employerModel: Model<Employer>
	) {}

  async create(createEmployerDto: CreateEmployerDto) {
    return this.employerModel.create(createEmployerDto);
  }

  async findAll() {
    return this.employerModel.find().exec();
  }

  async findById(id: string) {
    const employer = await this.employerModel.findById(id).exec();
    if (!employer) throw new NotFoundException(`Employer with id ${id} not found`);
    return employer;
  }

  async update(id: string, updateEmployerDto: UpdateEmployerDto) {
    const updatedEmployer = await this.employerModel.findByIdAndUpdate(id, updateEmployerDto, {
      new: true,
    }).exec();
    if (!updatedEmployer) throw new NotFoundException(`Employer with id ${id} not found`);
    return updatedEmployer;
  }

  async delete(id: string) {
    const deletedEmployer = await this.employerModel.findByIdAndDelete(id).exec();
    if (!deletedEmployer) throw new NotFoundException(`Employer with id ${id} not found`);
    return deletedEmployer;
  }

  /**
   * Utilizing Mongoose populate() functionality to find all workers of the employer.
   */
  async findWorkers(id: string) {
    const { workers } = await (await this.findById(id)).populate({ path: 'workers', model: 'Worker' });
    return workers;
  }
}

/**
 * We can change array of workers based on hired or fired event.
 * 
 * async hireWorker(id: string, workerId: string) {
    const update = {
      $push: { 
        workers: workerId 
      }
    }
    return this.update(id, update)
  }

  async fireWorker(id: string, workerId: string) {
    const update = {
      $pull: { 
        workers: workerId 
      }
    }
    return this.update(id, update)
  }
 */