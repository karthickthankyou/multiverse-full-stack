import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AllExceptionsFilter } from './common/filters/allException'
// Use `PORT` provided in environment or default to 3000
const port = process.env.PORT || 3000
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors()
  app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen(port, '0.0.0.0')
}
bootstrap()
