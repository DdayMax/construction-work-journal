import * as process from 'process'
import { getPostgresConfig } from './postgres.config'

const serviceName = 'constructionJournal'

const postgres = getPostgresConfig(serviceName)

export const configuration = () => ({
  api: {
    prefix: '/api'
  },
  port: process.env.SERVER_PORT || 3000,
  postgres
})

export type Config = ReturnType<typeof configuration>
