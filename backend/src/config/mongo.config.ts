import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  MongooseModuleAsyncOptions,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose'

export const mongoAsyncConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  // connectionName: 'auth',
  connectionName: 'auth',
  useFactory: async (
    config: ConfigService
  ): Promise<MongooseModuleFactoryOptions> => {
    const ENV = process.env.NODE_ENV || 'development'

    // let res = { uri: config.get<string>('MONGO_URI_DEV') }

    // if (ENV === 'production') {
    //   res = {
    //     uri: config.get<string>('MONGO_URI'),
    //   }
    // }

    const res = {
      uri: 'mongodb+srv://root:AOiNIlgKQUBPGA41@pos-multi-company.mwod6ws.mongodb.net/nestDB?retryWrites=true&w=majority&appName=pos-multi-company',
    }

    console.log('mongoAsyncConfig', res, ENV)
    return res
  },
}
