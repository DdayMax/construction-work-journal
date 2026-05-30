import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Employee } from 'src/repos/postgres/entities/employee.entity'
import { WorkLog } from 'src/repos/postgres/entities/workLog.entity'
import { WorkType } from 'src/repos/postgres/entities/workType.entity'
import { DatabaseSeedService } from './databaseSeeds.service'

@Module({
  imports: [TypeOrmModule.forFeature([Employee, WorkType, WorkLog])],
  providers: [DatabaseSeedService]
})
export class DatabaseSeedModule {}
