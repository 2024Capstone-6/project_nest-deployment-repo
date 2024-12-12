import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Activities } from '../entities/activities.entity';
import { Japanese } from '../entities/japanese.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Activities, Japanese],
  migrations: ['src/japan/migrations/*.ts'],
  synchronize: false,
});
