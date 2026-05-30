import { Employee } from 'src/repos/postgres/entities/employee.entity'
import { WorkType } from 'src/repos/postgres/entities/workType.entity'

export enum EmployeeRole {
  Worker = 'Рабочий',
  Foreman = 'Бригадир',
  SiteSupervisor = 'Прораб'
}

export enum MeasurementUnit {
  SquareMeter = 'м²',
  CubicMeter = 'м³',
  LinearMeter = 'м.п.',
  Piece = 'шт',
  Kilogram = 'кг',
  Tonne = 'т'
}

export enum EmployeeStatus {
  Active = 'active',
  Fired = 'fired'
}

export interface CreateWorkLogData {
  employee: Employee
  workType: WorkType
  amount: number
  performedAt: string
}

export interface UpdateWorkLogDataDto extends CreateWorkLogData {
  id: number
}

export interface GetWorkLogsListDto {
  limit?: number
  page?: number
  dateFrom?: string
  dateTo?: string
  employeeId?: number
  workTypeId?: number
  sortDirection?: SortDirection
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}
