// // https://www.oneclickitsolution.com/blog/migrations-with-typeorm/
// const dotenv = require('dotenv');
// dotenv.config();

// const {
//   DB_TYPE,
//   DB_HOST,
//   DB_USERNAME,
//   DB_PASSWORD,
//   DB_PORT,
//   DB_DATABASE,
//   DB_SYNC,
// } = process.env;

// module.exports = {
//   type: DB_TYPE,
//   host: DB_HOST,
//   port: DB_PORT,
//   username: DB_USERNAME,
//   password: DB_PASSWORD,
//   database: DB_DATABASE,
//   migrations: [__dirname + '/src/db/migrations/*{.ts,.js}'],
//   entities: [__dirname + '**/**/*.entity.{ts,js}'],
//   subscribers: [__dirname + '**/**/*.subscriber.{ts,js}'],
//   // synchronize: DB_SYNC,
// };

import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig, typeOrmAsyncConfig } from './typeorm.config';
const datasource = new DataSource(typeOrmConfig as DataSourceOptions);
datasource.initialize();
export default datasource;
