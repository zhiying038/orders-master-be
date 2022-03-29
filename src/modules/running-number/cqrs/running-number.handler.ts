import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RunningNumberService } from '../running-number.service';
import {
  GetNewRunningNumberQuery,
  GetNextAvailableNumberQuery,
} from './running-number.query';

@QueryHandler(GetNewRunningNumberQuery)
export class GetNewRunningNumberQueryHandler
  implements IQueryHandler<GetNewRunningNumberQuery>
{
  constructor(private readonly service: RunningNumberService) {}

  async execute(query: GetNewRunningNumberQuery): Promise<number> {
    const { purpose } = query;

    const results = await this.service.generateNextNumber(purpose);
    return results;
  }
}

@QueryHandler(GetNextAvailableNumberQuery)
export class GetNextAvailableNumberQueryHandler
  implements IQueryHandler<GetNextAvailableNumberQuery>
{
  constructor(private readonly service: RunningNumberService) {}

  async execute(query: GetNewRunningNumberQuery): Promise<number> {
    const { purpose } = query;

    const results = await this.service.findNextAvailableNumber(purpose);
    return results;
  }
}
