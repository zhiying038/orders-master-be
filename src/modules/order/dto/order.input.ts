import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('FilterOrderInput')
export class FilterOrderInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  createdAt?: Date;
}
