import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RunningNumberService } from '../running-number.service';
import { GetNewRunningNumberQuery } from './running-number.query';

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
