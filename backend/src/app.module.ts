import { RolesGuard } from './common/guard/roles.guard'
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor'
import { LoggingInterceptor } from './common/interceptor/logging.interceptor'
import { JwtAuthGuard } from './core/auth/jwt-auth.guard'
import { Module } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { CoreModule } from './core'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { mongoAsyncConfig } from './config/mongo.config'
import { TodoModule } from './modules/todo/todo.module'
import { CustomersModule } from './modules/customers/customers.module'

// const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
// ignoreEnvFile: process.env.NODE_ENV === 'production',
@Module({
  imports: [
    ConfigModule.forRoot({
      // ignoreEnvFile: process.env.NODE_ENV === 'production',
      // envFilePath,
      // isGlobal: true,
    }),
    MongooseModule.forRootAsync(mongoAsyncConfig),
    // connection to pos
    // mongodb://localhost:27017/leang_srun
    MongooseModule.forRoot(
      'mongodb+srv://root:AOiNIlgKQUBPGA41@pos-multi-company.mwod6ws.mongodb.net/nestDB?retryWrites=true&w=majority&appName=pos-multi-company',
      {
        connectionName: 'pos',
      }
    ),
    CoreModule,
    TodoModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule { }
