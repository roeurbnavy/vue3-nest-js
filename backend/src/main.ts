import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { useContainer } from 'class-validator'
import { setupSwagger } from './swagger'

async function bootstrap() {
  // console.log('process.env', process.env)
  const app: NestExpressApplication = await NestFactory.create(AppModule)
  setupSwagger(app)
  const config: ConfigService = app.get(ConfigService)
  const port = config.get('PORT')
  // Enable Cors for development
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    })
  )
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  await app.listen(port, async () => {
    console.log('[WEB]', `${await app.getUrl()}`)
  })
}
bootstrap()
