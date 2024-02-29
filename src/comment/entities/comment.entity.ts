import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import * as mongoose from 'mongoose';

@Schema()
export class Comment extends Document {
  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  postId: Post;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
