import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Post, PostSchema } from 'src/post/entities/post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET} `,
      signOptions: { expiresIn: 36000 },
    }),
  ],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
