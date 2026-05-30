import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common'
import { Timeout } from '@nestjs/schedule'
import { DataSource } from 'typeorm'
import { DatabaseSeedService } from '../databaseSeeds/databaseSeeds.service'

@Injectable()
export class ApplicationBootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ApplicationBootstrapService.name)

  constructor(
    private readonly dataSource: DataSource,
    private readonly databaseSeedService: DatabaseSeedService
  ) {}

  public async onApplicationBootstrap() {
    try {
      this.logger.debug('Run migration')
      await this.dataSource.runMigrations({ transaction: 'each' })
      this.logger.debug('Migration completed')
    } catch (e) {
      this.logger.error(`[BOOTSTRAP_MIGRATIONS] - ${e}`)
      throw e
    }
  }

  @Timeout(10000)
  public async plantSeeds() {
    try {
      this.logger.debug('Run seeds')
      this.databaseSeedService.runSeeds()
      this.logger.debug('Seeds completed')
    } catch (e) {
      this.logger.error(`[BOOTSTRAP_SEEDS] - ${e}`)
      return
    }
  }
}
