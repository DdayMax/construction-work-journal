import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { EmployeeRole, EmployeeStatus } from '../../../types'

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({ type: 'enum', enum: EmployeeRole })
  role!: EmployeeRole

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.Active
  })
  status!: EmployeeStatus

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
