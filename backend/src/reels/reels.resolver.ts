import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReelsService } from './reels.service';
import { Reel } from './entities/reel.entity';
import { CreateReelInput } from './dto/create-reel.input';
import { UpdateReelInput } from './dto/update-reel.input';

@Resolver(() => Reel)
export class ReelsResolver {
  constructor(private readonly reelsService: ReelsService) { }

  @Mutation(() => Reel)
  createReel(@Args('createReelInput') createReelInput: CreateReelInput) {
    return this.reelsService.create(createReelInput);
  }

  @Query(() => [Reel])
  findAll() {
    return this.reelsService.findAll();
  }

  @Query(() => Reel)
  findOne(@Args('id') id: string) {
    return this.reelsService.findOne(id);
  }

  @Mutation(() => Reel)
  updateReel(@Args('updateReelInput') updateReelInput: UpdateReelInput) {
    return this.reelsService.update(updateReelInput.id, updateReelInput);
  }

  @Mutation(() => Reel)
  removeReel(@Args('id') id: string) {
    return this.reelsService.remove(id);
  }
}
