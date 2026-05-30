import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'
import { UpdateWorkLogDto } from './dtos/worklog'
import { CreateWorkLogDto } from './dtos/worklog/createWorkLog.dto'
import { EmployeeService } from './services/employee.service'
import { WorkLogService } from './services/workLog.service'
import { WorkTypeService } from './services/workType.service'
import { SortDirection } from './types'

@Controller()
export class WorkLogController {
  constructor(
    private readonly workLogService: WorkLogService,
    private readonly workTypeService: WorkTypeService,
    private readonly employeeService: EmployeeService
  ) {}

  @Get('/workLogs')
  getWorkLogsList(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('sortDirection') sortDirection?: SortDirection,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('workTypeId') workTypeId?: number,
    @Query('employeeId') employeeId?: number
  ) {
    return this.workLogService.getWorkLogsList({ limit, sortDirection, dateFrom, dateTo, workTypeId, employeeId, page })
  }

  @Get('/workTypes')
  getAllWorkTypes() {
    return this.workTypeService.getAllWorkTypes()
  }

  @Get('/employees')
  getAllEmployees() {
    return this.employeeService.getAllEmployees()
  }

  @Post('/createWorkLog')
  createLog(@Body() createWorkLogDto: CreateWorkLogDto) {
    return this.workLogService.createWorkLog(createWorkLogDto)
  }

  @Patch('/updateWorkLog/:id')
  updateWorkLog(@Body() updateWorkLogDto: UpdateWorkLogDto, @Param('id', ParseIntPipe) id: number) {
    return this.workLogService.updateWorkLog(id, updateWorkLogDto)
  }

  @Delete('/deleteWorkLog/:id')
  deleteWorkLog(@Param('id', ParseIntPipe) id: number) {
    return this.workLogService.deleteWorkLog(id)
  }
}
