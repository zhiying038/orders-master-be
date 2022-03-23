import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from './order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity])],
})
export class OrderDetailModule {}
