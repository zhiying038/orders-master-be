import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ItemModule } from './modules/item/item.module';
import { OrderDetailModule } from './modules/order-detail/order-detail.module';
import { OrderModule } from './modules/order/order.module';
import { RunnningNumberModule } from './modules/running-number/runnning-number.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      entities: ['dist/src/modules/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
      migrationsRun: true,
      migrationsTableName: 'MIGRATIONS',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ItemModule,
    OrderModule,
    OrderDetailModule,
    RunnningNumberModule,
    UploadModule,
  ],
})
export class AppModule {}
