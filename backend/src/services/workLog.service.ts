import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateWorkLogDto, UpdateWorkLogDto } from 'src/dtos/worklog'
import { GetWorkLogsListDto } from 'src/types'
import { WorkLogRepo } from '../repos/postgres/workLog.repo'
import { EmployeeService } from './employee.service'
import { WorkTypeService } from './workType.service'

@Injectable()
export class WorkLogService {
  constructor(
    private readonly workLogRepo: WorkLogRepo,
    private readonly employeeService: EmployeeService,
    private readonly workTypeService: WorkTypeService
  ) {}

  async getWorkLogsList(searchParams: GetWorkLogsListDto) {
    return this.workLogRepo.getWorkLogsList(searchParams)
  }

  async createWorkLog({ employeeId, workTypeId, ...data }: CreateWorkLogDto) {
    const employee = await this.employeeService.getEmployeeById(employeeId)
    const workType = await this.workTypeService.getWorkTypeById(workTypeId)

    return this.workLogRepo.createWorkLog({ employee, workType, ...data })
  }

  async getWorkLogById(id: number) {
    const workLog = await this.workLogRepo.getWorkLogById(id)
    if (!workLog) {
      throw new NotFoundException(`Work log with ID ${id} not found`)
    }

    return workLog
  }

  async updateWorkLog(id: number, { employeeId, workTypeId, ...data }: UpdateWorkLogDto) {
    const updateData: any = { id, ...data }

    await this.getWorkLogById(id)

    if (employeeId !== undefined) {
      const employee = await this.employeeService.getEmployeeById(employeeId)
      updateData.employee = employee
    }

    if (workTypeId !== undefined) {
      const workType = await this.workTypeService.getWorkTypeById(workTypeId)
      updateData.workType = workType
    }

    return this.workLogRepo.updateWorkLog(updateData)
  }

  async deleteWorkLog(id: number) {
    await this.getWorkLogById(id)

    return this.workLogRepo.deleteWorkLog(id)
  }
}
