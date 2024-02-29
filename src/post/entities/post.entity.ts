import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import * as mongoose from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: mongoose.Types.ObjectId | string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop()
  tags: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
