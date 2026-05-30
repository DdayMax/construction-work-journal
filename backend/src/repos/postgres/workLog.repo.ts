import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateWorkLogData, GetWorkLogsListDto, SortDirection, UpdateWorkLogDataDto } from 'src/types'
import { Repository } from 'typeorm'
import { WorkLog } from './entities/workLog.entity'

@Injectable()
export class WorkLogRepo {

  constructor(
    @InjectRepository(WorkLog) private workLogModel: Repository<WorkLog>,
  ) {}

  async getWorkLogsList({ page = 1, limit = 10, dateFrom, dateTo, employeeId, workTypeId, sortDirection = SortDirection.DESC }: GetWorkLogsListDto) {
    const query = this.workLogModel
      .createQueryBuilder('workLog')
      .leftJoinAndSelect('workLog.employee', 'employee')
      .leftJoinAndSelect('workLog.workType', 'workType')

    if (dateFrom && dateTo) {
      const nextDay = new Date(dateTo)
      nextDay.setDate(nextDay.getDate() + 1)
      const dateToNextDay = nextDay.toISOString().split('T')[0]
      query.andWhere('workLog.performedAt >= :dateFrom AND workLog.performedAt < :dateToNextDay', {
        dateFrom,
        dateToNextDay
      })
    } else {
      if (dateFrom) {
        query.andWhere('workLog.performedAt >= :dateFrom', { dateFrom })
      }
      if (dateTo) {
        const nextDay = new Date(dateTo)
        nextDay.setDate(nextDay.getDate() + 1)
        const dateToNextDay = nextDay.toISOString().split('T')[0]
        query.andWhere('workLog.performedAt < :dateToNextDay', { dateToNextDay })
      }
    }

    if (employeeId) {
      query.andWhere('employee.id = :employeeId', { employeeId })
    }

    if (workTypeId) {
      query.andWhere('workType.id = :workTypeId', { workTypeId })
    }

    query.orderBy(`workLog.performedAt`, sortDirection)
    query.addOrderBy('workLog.id', 'DESC')

    const skip = (page - 1) * limit
    query.skip(skip).take(limit)

    const [items, total] = await query.getManyAndCount()

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1
      }
    }
  }

  createWorkLog(data: CreateWorkLogData) {
    return this.workLogModel.save(this.workLogModel.create(data))
  }

  updateWorkLog({ id, ...data }: UpdateWorkLogDataDto) {
    return this.workLogModel.update({ id }, data)
  }

  getWorkLogById(id: number) {
    return this.workLogModel.findOneBy({ id })
  }

  deleteWorkLog(id: number) {
    return this.workLogModel.delete({ id })
  }
}
