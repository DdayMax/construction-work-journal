import { PartialType } from '@nestjs/swagger'
import { CreateWorkLogDto } from './createWorkLog.dto'

export class UpdateWorkLogDto extends PartialType(CreateWorkLogDto) {}
