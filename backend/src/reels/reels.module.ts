import { Module } from '@nestjs/common';
import { ReelsService } from './reels.service';
import { ReelsResolver } from './reels.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Reel, ReelSchema } from './entities/reel.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reel.name, schema: ReelSchema }])],
  providers: [ReelsResolver, ReelsService],
})
export class ReelsModule {}
