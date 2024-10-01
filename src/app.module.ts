import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModule } from './jobs/jobs.module';
import { WorkersModule } from './workers/workers.module';
import { EmployersModule } from './employers/employers.module';

/**
 * Initializing Mongoose and other modules
 */
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL || 'mongodb://localhost:27017/mama'),
    JobsModule, 
    WorkersModule, 
    EmployersModule
  ]
})
export class AppModule {}
