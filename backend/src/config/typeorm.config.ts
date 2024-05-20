import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';

// Ref: https://github.com/roeurbnavy/nest-js-quiz-manager/tree/master/server

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    config: ConfigService,
  ): Promise<TypeOrmModuleAsyncOptions> => {
    // if (process.env.NODE_ENV === 'development') {
    const ENV = process.env.NODE_ENV || 'development';

    let res = {
      type: config.get<string>('DB_TYPE'),
      host: config.get<string>('DB_HOST'),
      port: config.get<string>('DB_PORT'),
      username: config.get<string>('DB_USERNAME'),
      password: config.get<string>('DB_PASSWORD'),
      database: config.get<string>('DB_DATABASE'),
      entities: [join(__dirname, '/../**/', '*.entity.{ts,js}')],
      // [join(__dirname, '**', '*.entity.{ts,js}')],
      subscribers: [__dirname + '/../**/*.subscriber.{ts,js}'],
      synchronize: config.get<string>('DB_SYNC'),
      // migrations: [__dirname + '/src/db/migrations/*{.ts,.js}'],
      retryAttempts: 20,
    } as TypeOrmModuleAsyncOptions;
    // } else
    if (ENV === 'production') {
      /**
       * Use database url in production instead
       */
      res = {
        type: config.get<string>('DB_TYPE'),
        url: config.get<string>('DATABASE_URL'),
        entities: [join(__dirname, '/../**/', '*.entity.{ts,js}')],
        // [join(__dirname, '**', '*.entity.{ts,js}')],
        subscribers: [__dirname + '/../**/*.subscriber.{ts,js}'],
        synchronize: config.get<string>('DB_SYNC'),
        // migrations: [__dirname + 'src/db/migrations/*{.ts,.js}'],
        ssl: true,
        retryAttempts: 20,
        cli: {
          migrationsDir: 'src/db/migrations',
        },
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      } as TypeOrmModuleAsyncOptions;
    }

    return res;
  },
};

const {
  DB_TYPE,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  DB_DATABASE,
  DB_SYNC,
} = process.env;

// // module.exports = {
// //   type: DB_TYPE,
// //   host: DB_HOST,
// //   port: DB_PORT,
// //   username: DB_USERNAME,
// //   password: DB_PASSWORD,
// //   database: DB_DATABASE,
// //   migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
// //   entities: [__dirname + '**/**/*.entity.{ts,js}'],
// //   subscribers: [__dirname + '**/**/*.subscriber.{ts,js}'],
// //   synchronize: DB_SYNC,
// // };

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  // process.env.DB_HOST,
  port: 5432,
  username: 'nest',
  password: 'nest',
  database: 'nest',
  migrations: [__dirname + 'src/db/migrations/*{.ts,.js}'],
  entities: [__dirname + '**/**/*.entity.{ts,js}'],
  subscribers: [__dirname + '**/**/*.subscriber.{ts,js}'],
  logging: true,
  // cli: {
  //   migrationsDir: 'src/db/migrations',
  // },
  // synchronize: DB_SYNC,
};
