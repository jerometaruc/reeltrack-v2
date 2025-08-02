import { Test, TestingModule } from '@nestjs/testing';
import { ReelsResolver } from './reels.resolver';
import { ReelsService } from './reels.service';

describe('ReelsResolver', () => {
  let resolver: ReelsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReelsResolver, ReelsService],
    }).compile();

    resolver = module.get<ReelsResolver>(ReelsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
