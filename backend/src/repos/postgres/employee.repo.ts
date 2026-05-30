import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Employee } from './entities/employee.entity'

@Injectable()
export class EmployeeRepo {
  constructor(@InjectRepository(Employee) private employeeModel: Repository<Employee>) {}

  getAllEmployees() {
    return this.employeeModel.find()
  }

  getEmployeeById(id: number) {
    return this.employeeModel.findOneBy({ id })
  }
}
