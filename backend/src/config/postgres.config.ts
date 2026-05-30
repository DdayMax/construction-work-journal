import { DataSourceOptions } from 'typeorm'

export const getPostgresConfig = (serviceName: string) => {
  return {
    url: process.env.POSTGRES_URL || 'postgresql://postgres:postgres@localhost:5432/construct-test',
    type: 'postgres',
    applicationName: serviceName,
    autoLoadEntities: true,
    migrationsTableName: `${serviceName}Migrations`,
    migrations: ['dist/migrations/*.js'],
    logging: ['warn'],
    maxQueryExecutionTime: 1000
  } as DataSourceOptions
}
