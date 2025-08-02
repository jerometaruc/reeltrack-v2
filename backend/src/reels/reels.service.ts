import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReelInput } from './dto/create-reel.input';
import { UpdateReelInput } from './dto/update-reel.input';
import { Reel, ReelDocument } from './entities/reel.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReelsService {
  constructor(@InjectModel(Reel.name) private reelModel: Model<ReelDocument>) { }

  async create(createReelInput: CreateReelInput): Promise<Reel> {
    const createdReel = new this.reelModel(createReelInput);
    return createdReel.save();
  }

  async findAll(): Promise<Reel[]> {
    return this.reelModel.find().exec();
  }

  async findOne(id: string): Promise<Reel> {
    const reel = await this.reelModel.findById(id).exec();
    if (!reel) {
      throw new NotFoundException(`Reel with ID ${id} not found`);
    }
    return reel;
  }

  async update(id: string, updateReelInput: UpdateReelInput): Promise<Reel> {
    const { id: inputId, ...updateData } = updateReelInput;

    const updatedReel = await this.reelModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedReel) {
      throw new NotFoundException(`Reel with ID ${id} not found`);
    }

    return updatedReel;
  }

  async remove(id: string): Promise<Reel> {
    const deletedReel = await this.reelModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedReel) {
      throw new NotFoundException(`Reel with ID ${id} not found`);
    }

    return deletedReel;
  }
}
