import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  GetNewRunningNumberQueryHandler,
  GetNextAvailableNumberQueryHandler,
} from './cqrs/running-number.handler';
import { RunningNumberService } from './running-number.service';
import { RunningNumberEntity } from './runnning-number.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RunningNumberEntity])],
  providers: [
    RunningNumberService,
    GetNewRunningNumberQueryHandler,
    GetNextAvailableNumberQueryHandler,
  ],
  exports: [RunningNumberService],
})
export class RunnningNumberModule {}
