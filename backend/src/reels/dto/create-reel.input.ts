import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateReelInput {
  @Field()
  title: string;

  @Field(() => Int)
  year: number;

  @Field({ nullable: true })
  director?: string;

  @Field(() => Float, { nullable: true })
  rating?: number;
}
