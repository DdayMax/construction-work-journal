import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Employee } from './employee.entity'
import { WorkType } from './workType.entity'

@Entity()
export class WorkLog {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => WorkType, {
    eager: true,
    onDelete: 'RESTRICT',
    nullable: false
  })
  @JoinColumn({ name: 'workTypeId' })
  workType!: WorkType

  @Column({
    type: 'decimal',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value)
    }
  })
  amount!: number

  @ManyToOne(() => Employee, {
    eager: true,
    onDelete: 'RESTRICT',
    nullable: false
  })
  @JoinColumn({ name: 'employeeId' })
  employee!: Employee

  @Column({
    type: 'date',
    name: 'performedAt'
  })
  performedAt!: string

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

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    transformer: {
      to: (value: string) => value,
      from: (value: Date) => value?.toISOString()
    }
  })
  updatedAt!: Date
}
