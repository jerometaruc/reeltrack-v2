import { Injectable } from '@nestjs/common';
import { CreateReelInput } from './dto/create-reel.input';
import { UpdateReelInput } from './dto/update-reel.input';
import { Reel } from './entities/reel.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReelsService {
  constructor(@InjectModel(Reel.name) private reelModel: Model<Reel>) { }

  async create(createReelInput: CreateReelInput): Promise<Reel> {
    const createdReel = new this.reelModel(createReelInput);
    return createdReel.save();
  }

  async findAll(): Promise<Reel[]> {
    return this.reelModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} reel`;
  }

  update(id: number, updateReelInput: UpdateReelInput) {
    return `This action updates a #${id} reel`;
  }

  remove(id: number) {
    return `This action removes a #${id} reel`;
  }
}
