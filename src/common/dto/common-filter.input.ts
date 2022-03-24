import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsOptional, Max, Min } from 'class-validator';
import { SortOrder } from '../constants/order';

@InputType('CommonFilterOptionInput')
export class CommonFilterOptionInput {
  @Min(1)
  @Field(() => Int, { defaultValue: 1 })
  page: number = 1;

  @Min(1)
  @Max(100)
  @Field(() => Int, { defaultValue: 10 })
  limit: number = 10;

  @IsOptional()
  @Field({ nullable: true })
  sortKey?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  @Field(() => SortOrder, { nullable: true, defaultValue: SortOrder.ASC })
  sortOrder?: SortOrder;
}
