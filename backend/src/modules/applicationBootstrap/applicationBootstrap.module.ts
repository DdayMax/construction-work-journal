import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Employee } from 'src/repos/postgres/entities/employee.entity'
import { WorkLog } from 'src/repos/postgres/entities/workLog.entity'
import { WorkType } from 'src/repos/postgres/entities/workType.entity'
import { configuration } from '../../config/configuration'
import { DatabaseSeedModule } from '../databaseSeeds/databaseSeeds.module'
import { DatabaseSeedService } from '../databaseSeeds/databaseSeeds.service'
import { ApplicationBootstrapService } from './applicationBootstrap.service'

@Module({
  imports: [
    TypeOrmModule.forRoot(configuration().postgres),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Employee, WorkType, WorkLog]),
    DatabaseSeedModule
  ],
  controllers: [],
  providers: [ApplicationBootstrapService, DatabaseSeedService]
})
export class ApplicationBootstrapModule {}
