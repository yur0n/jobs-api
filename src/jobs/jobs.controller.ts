import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';
import { DateValidationPipe } from 'src/common/pipes/date-validation.pipe';

/**
* With IdValidationPipe we're validating that id is valid Mongodb ObjectId.
*/
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  /**
   * Since query params are always strings, in DateValidationPipe we're validating that 'start' and 'end' are present and can be converted to Date.
   * Additionally, we're transforming these query params to Date.
   */
  @Get('/date-period')
  findByDatePeriod(
    @Query('start', DateValidationPipe) start: Date, 
    @Query('end', DateValidationPipe) end: Date
  ) {
    return this.jobsService.findByDatePeriod(start, end);
  }

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.jobsService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id', IdValidationPipe) id: string, 
    @Body() updateJobDto: UpdateJobDto
  ) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  delete(@Param('id', IdValidationPipe) id: string) {
    return this.jobsService.delete(id);
  }

  @Put(':id/archive')
  archive(@Param('id', IdValidationPipe) id: string) {
    return this.jobsService.archiveJob(id);
  }
}