import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { WorkType } from './entities/workType.entity'

@Injectable()
export class WorkTypeRepo {
  constructor(@InjectRepository(WorkType) private workTypeModel: Repository<WorkType>) {}

  getAllWorkTypes() {
    return this.workTypeModel.find()
  }

  getWorkTypeById(id: number) {
    return this.workTypeModel.findOneBy({ id })
  }
}
