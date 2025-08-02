import { CreateReelInput } from './create-reel.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReelInput extends PartialType(CreateReelInput) {
  @Field(() => Int)
  id: number;
}
