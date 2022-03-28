import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetNewRunningNumberQueryHandler } from './cqrs/running-number.handler';
import { RunningNumberService } from './running-number.service';
import { RunningNumberEntity } from './runnning-number.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RunningNumberEntity])],
  providers: [RunningNumberService, GetNewRunningNumberQueryHandler],
  exports: [RunningNumberService],
})
export class RunnningNumberModule {}
