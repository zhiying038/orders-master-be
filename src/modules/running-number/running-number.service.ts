import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RunningNumberEntity } from './runnning-number.entity';

@Injectable()
export class RunningNumberService {
  constructor(
    @InjectRepository(RunningNumberEntity)
    private repository: Repository<RunningNumberEntity>,
  ) {}

  async findOrCreateNumber(purpose: string): Promise<RunningNumberEntity> {
    const found = await this.repository.findOne({ where: { purpose } });
    if (found) {
      return found;
    }

    const newResult = this.repository.create({ autoNumber: 1, purpose });
    return await this.repository.save(newResult);
  }

  async generateNextNumber(purpose: string): Promise<number> {
    const runningNumber = await this.findOrCreateNumber(purpose);
    await this.repository.increment({ id: runningNumber.id }, 'autoNumber', 1);
    return runningNumber.autoNumber;
  }

  async findNextAvailableNumber(purpose: string): Promise<number> {
    const runningNumber = await this.findOrCreateNumber(purpose);
    return runningNumber.autoNumber;
  }

  async resetRunningNumber(purpose: string): Promise<RunningNumberEntity> {
    const runningNumber = await this.findOrCreateNumber(purpose);
    runningNumber.autoNumber = 1;
    return await this.repository.save(runningNumber);
  }
}
