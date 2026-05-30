import { Employee } from "@/entites/employee/model"
import { WorkType } from "@/entites/workType/model"

export interface Log {
  id: number
  amount: number
  performedAt: string
  workType: WorkType
  employee: Employee
}

export interface MetaData {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface GetWorkLogsListRes {
  items: Log[]
  meta: MetaData
}

export type SortDirection = "ASC" | "DESC"

export interface GetWorkLogsParams {
  limit?: number
  dateFrom?: string
  page?: number
  dateTo?: string
  workTypeId?: number
  employeeId?: number
  sortDirection?: "ASC" | "DESC"
}
