import { EmployeeRole, EmployeeStatus } from 'src/types'

export const employeesSeed = [
  {
    name: 'Иван Петров',
    role: EmployeeRole.Foreman,
    status: EmployeeStatus.Active
  },
  {
    name: 'Алексей Сидоров',
    role: EmployeeRole.Worker,
    status: EmployeeStatus.Active
  },
  {
    name: 'Олег Михайлов',
    role: EmployeeRole.Worker,
    status: EmployeeStatus.Active
  },
  {
    name: 'Илья Стасенко',
    role: EmployeeRole.Worker,
    status: EmployeeStatus.Active
  },
  {
    name: 'Стас Ильенко',
    role: EmployeeRole.Worker,
    status: EmployeeStatus.Fired
  },
  {
    name: 'Сергей Иванов',
    role: EmployeeRole.SiteSupervisor,
    status: EmployeeStatus.Active
  }
]
