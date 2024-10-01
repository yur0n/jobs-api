import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';

/**
* With IdValidationPipe we're validating that id is valid Mongodb ObjectId.
* We can apply it to the whole Employers Controller scope.
*/
// @UsePipes(IdValidationPipe)
@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Post()
  create(@Body() createEmployerDto: CreateEmployerDto) {
    return this.employersService.create(createEmployerDto);
  }

  @Get()
  findAll() {
    return this.employersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.employersService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateEmployerDto: UpdateEmployerDto
  ) {
    return this.employersService.update(id, updateEmployerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employersService.delete(id);
  }

  @Get(':id/workers')
  findWorkers(@Param('id') id: string) {
    return this.employersService.findWorkers(id);
  }
}