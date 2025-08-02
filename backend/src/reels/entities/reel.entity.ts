import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReelDocument = HydratedDocument<Reel>;

@Schema({ timestamps: true })
@ObjectType()
export class Reel {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field(() => Int)
  @Prop({ required: true })
  year: number;

  @Field({ nullable: true })
  @Prop()
  director?: string;

  @Field(() => Float, { nullable: true })
  @Prop()
  rating?: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const ReelSchema = SchemaFactory.createForClass(Reel);
