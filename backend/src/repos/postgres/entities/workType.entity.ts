import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { MeasurementUnit } from '../../../types'

@Entity()
export class WorkType {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({ type: 'enum', enum: MeasurementUnit })
  unit!: MeasurementUnit

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    transformer: {
      to: (value: string) => value,
      from: (value: Date) => value?.toISOString()
    }
  })
  createdAt!: Date
}
