import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export function PaginatedResponseDto<T>(type: () => [Type<T>]) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(type)
    items: T[];

    @Field(() => Int)
    total: number;

    @Field()
    hasMore: boolean;

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    pages: number;

    constructor(items: T[], total: number, page: number, size: number) {
      this.items = items;
      this.total = total;
      this.page = page;
      const count = total / size;
      const prime = count % 1;
      this.pages =
        prime < 0.5 && prime !== 0 ? Math.round(count + 1) : Math.round(count);
      this.hasMore = page < this.pages;
    }
  }
  return PaginatedResponseClass;
}
