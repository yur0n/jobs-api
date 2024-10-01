import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { Worker, WorkerSchema } from './schemas/worker.schema';
import { JobsModule } from 'src/jobs/jobs.module';
import { EmployersModule } from 'src/employers/employers.module';

@Module({
  imports: [
    EmployersModule,
    JobsModule,
    MongooseModule.forFeature([{ name:  Worker.name, schema:  WorkerSchema }]),
  ],
  providers: [WorkersService],
  controllers: [WorkersController],
  exports: [WorkersService]
})
export class WorkersModule {}