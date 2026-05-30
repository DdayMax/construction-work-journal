import { Injectable, NotFoundException } from '@nestjs/common'
import { EmployeeRepo } from 'src/repos/postgres/employee.repo'

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepo: EmployeeRepo) {}

  async getAllEmployees() {
    return await this.employeeRepo.getAllEmployees()
  }

  async getEmployeeById(id: number) {
    const employee = await this.employeeRepo.getEmployeeById(id)
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`)
    }

    return employee
  }
}
