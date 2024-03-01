import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { JwtModule } from '@nestjs/jwt';
import { CorsModule } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://sonnguyentruong201:rhxe4ooYmRU7g0h9@cluster0.64ay48k.mongodb.net/',
    ),
    UsersModule,
    CommentModule,
    PostModule,
    CorsModule.forRoot({
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // list of allowed HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'], // list of allowed headers
      credentials: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
