import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { configuration } from 'src/config/configuration'
import { WorkLogModule } from './workLog.module'

async function bootstrap() {
  const config = configuration()

  const app = await NestFactory.create(WorkLogModule)

  app.setGlobalPrefix(config.api.prefix)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
