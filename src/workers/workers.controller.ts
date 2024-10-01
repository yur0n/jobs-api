import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { UpdateEmployerWorkerDto } from './dto/update-employer-worker.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';

/**
* With IdValidationPipe we're validating that id is valid Mongodb ObjectId.
*/
@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workersService.create(createWorkerDto);
  }

  @Get()
  findAll() {
    return this.workersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.workersService.findById(id);
  }

  @Put(':id')
  update(
		@Param('id', IdValidationPipe) id: string, 
		@Body() updateWorkerDto: UpdateWorkerDto
	) {
    return this.workersService.update(id, updateWorkerDto);
  }

  @Delete(':id')
  delete(@Param('id', IdValidationPipe) id: string) {
    return this.workersService.delete(id);
  }

  @Get(':id/matched-jobs')
  findMatchedJobs(@Param('id', IdValidationPipe) id: string) {
    return this.workersService.findMatchedJobs(id);
  }

	@Put(':id/new-employer')
	updateEmployer(
		@Param('id', IdValidationPipe) id: string,
		@Query() query: UpdateEmployerWorkerDto
	) {
		return this.workersService.updateEmployer(id, query);
	}
}