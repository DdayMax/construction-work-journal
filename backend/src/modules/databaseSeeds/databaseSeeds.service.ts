import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Employee } from 'src/repos/postgres/entities/employee.entity'
import { WorkLog } from 'src/repos/postgres/entities/workLog.entity'
import { WorkType } from 'src/repos/postgres/entities/workType.entity'
import { employeesSeed } from 'src/repos/postgres/seeds/employees.seeds'
import { workLogSeed } from 'src/repos/postgres/seeds/workLog.seeds'
import { workTypesSeed } from 'src/repos/postgres/seeds/workTypes.seed'

@Injectable()
export class DatabaseSeedService {
  private readonly logger = new Logger(DatabaseSeedService.name)

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(WorkType)
    private readonly workTypeRepository: Repository<WorkType>,

    @InjectRepository(WorkLog)
    private readonly workLogRepository: Repository<WorkLog>
  ) {}

  async runSeeds() {
    await this.seedEmployees()
    await this.seedWorkTypes()
    await this.seedWorkLog()
  }

  private async seedEmployees() {
    const employeesCount = await this.employeeRepository.count()

    if (employeesCount > 0) {
      this.logger.debug('Employees already seeded')
      return
    }

    await this.employeeRepository.save(employeesSeed)

    this.logger.debug('Employees seeded')
  }

  private async seedWorkTypes() {
    const workTypesCount = await this.workTypeRepository.count()

    if (workTypesCount > 0) {
      this.logger.debug('Work types already seeded')
      return
    }

    await this.workTypeRepository.save(workTypesSeed)

    this.logger.debug('Work types seeded')
  }

  private async seedWorkLog() {
    const completedWorkCount = await this.workLogRepository.count()

    if (completedWorkCount > 0) {
      this.logger.debug('Work log already seeded')
      return
    }

    await this.workLogRepository.save(workLogSeed)

    this.logger.debug('Work log seeded')
  }
}
