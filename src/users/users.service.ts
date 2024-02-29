import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Post } from 'src/post/entities/post.entity';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      ...rest,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async find(id: string) {
    const ownerId = new Types.ObjectId(id);
    const userId = new Types.ObjectId(id);
    const posts = await this.postModel.find({ owner: ownerId });

    const user = await this.userModel.findById(userId).exec();
    return { posts, user };
  }

  async login(login: LoginDto) {
    const { username, password } = login;
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({
      id: user._id,
    });
    return {
      message: 'login success',
      token,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
