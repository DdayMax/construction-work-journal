import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { configuration } from 'src/config/configuration'
import { WorkLogModule } from './workLog.module'

async function bootstrap() {
  const config = configuration()

  const app = await NestFactory.create(WorkLogModule)

  app.setGlobalPrefix(config.api.prefix)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Construction Work Journal API')
    .setDescription('API для учета выполненных работ на строительных объектах')
    .setVersion('1.0')
    .addTag('work-logs', 'Операции с журналом работ')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api/docs', app, document) 

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
