import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}
  create(createPostDto: CreatePostDto, token: string) {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    const createPost = new this.postModel({
      ...createPostDto,
      owner: decodedToken.id,
    });
    return createPost.save();
  }

  async findAll() {
    const posts = await this.postModel.find();
    const result = posts.map(async (post) => {
      const postId = post._id;
      const comments = await this.commentModel.find({ postId }).exec();
      return { post, comments };
    });
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
