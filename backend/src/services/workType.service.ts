import { Injectable, NotFoundException } from '@nestjs/common'
import { WorkTypeRepo } from 'src/repos/postgres/workType.repo'

@Injectable()
export class WorkTypeService {
  constructor(private readonly workTypeRepo: WorkTypeRepo) {}

  async getAllWorkTypes() {
    return await this.workTypeRepo.getAllWorkTypes()
  }

  async getWorkTypeById(id: number) {
    const workType = await this.workTypeRepo.getWorkTypeById(id)
    if (!workType) {
      throw new NotFoundException(`WorkType with ID ${id} not found`)
    }
    return workType
  }
}
