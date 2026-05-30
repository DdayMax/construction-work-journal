import { DataSource } from 'typeorm'
import { configuration } from './configuration'

const AppDataSource = new DataSource({
  ...configuration().postgres,
  migrations: ['src/migrations/*.ts'],
  entities: ['src/**/postgres/entities/*.entity.ts']
})

export default AppDataSource
