import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configuration } from './config/configuration'
import { ApplicationBootstrapModule } from './modules/applicationBootstrap/applicationBootstrap.module'
import { EmployeeRepo } from './repos/postgres/employee.repo'
import { Employee } from './repos/postgres/entities/employee.entity'
import { WorkLog } from './repos/postgres/entities/workLog.entity'
import { WorkType } from './repos/postgres/entities/workType.entity'
import { WorkLogRepo } from './repos/postgres/workLog.repo'
import { WorkTypeRepo } from './repos/postgres/workType.repo'
import { EmployeeService } from './services/employee.service'
import { WorkLogService } from './services/workLog.service'
import { WorkTypeService } from './services/workType.service'
import { WorkLogController } from './workLog.controller'

const config = configuration()

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    TypeOrmModule.forFeature([Employee, WorkType, WorkLog]),
    TypeOrmModule.forRoot(config.postgres),
    ApplicationBootstrapModule
  ],

  controllers: [WorkLogController],
  providers: [WorkLogService, WorkLogRepo, WorkTypeRepo, WorkTypeService, EmployeeRepo, EmployeeService]
})
export class WorkLogModule {}
