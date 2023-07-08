import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AllExceptionsFilter } from './common/filters/allException'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors()
  app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen(3000)
}
bootstrap()
